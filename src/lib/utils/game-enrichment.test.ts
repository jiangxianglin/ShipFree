import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  normalizeTitle,
  calculateSimilarity,
  DuplicateDetector,
  generateSlug,
  ensureUniqueSlug,
  generateUniqueSlug,
  SlugGenerator,
} from './game-enrichment';

/**
 * Property-Based Tests for Game Enrichment
 * Feature: enrich-icebreaker-games
 */

describe('Game Enrichment - Property-Based Tests', () => {
  /**
   * Feature: enrich-icebreaker-games, Property 1: 标题唯一性
   * Validates: Requirements 2.2, 2.3
   * 
   * For any new game title, if its normalized similarity with an existing game title
   * exceeds 90%, it should be detected as a duplicate.
   */
  describe('Property 1: Title Uniqueness', () => {
    it('should detect identical titles as duplicates (100% similarity)', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (title) => {
            const detector = new DuplicateDetector(90);
            const existingTitles = [title];
            
            // Same title should be detected as duplicate
            const isDup = detector.isDuplicate(title, existingTitles);
            expect(isDup).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should detect titles with only case differences as duplicates', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
          (title) => {
            const detector = new DuplicateDetector(90);
            const upperTitle = title.toUpperCase();
            const lowerTitle = title.toLowerCase();
            const existingTitles = [upperTitle];
            
            // Case variations should be detected as duplicates
            const isDup = detector.isDuplicate(lowerTitle, existingTitles);
            expect(isDup).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should detect titles with punctuation differences as duplicates', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 5, maxLength: 50 }).filter(s => s.trim().length > 0),
          (baseTitle) => {
            const detector = new DuplicateDetector(90);
            // Add punctuation to create variations
            const withPunctuation = `${baseTitle}!!!`;
            const withDots = `${baseTitle}...`;
            const existingTitles = [withPunctuation];
            
            // Punctuation variations should be detected as duplicates
            const isDup = detector.isDuplicate(withDots, existingTitles);
            expect(isDup).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should detect titles with whitespace differences as duplicates', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 2, maxLength: 5 }),
          (words) => {
            const detector = new DuplicateDetector(90);
            const normalSpacing = words.join(' ');
            const extraSpacing = words.join('   '); // Multiple spaces
            const existingTitles = [normalSpacing];
            
            // Whitespace variations should be detected as duplicates
            const isDup = detector.isDuplicate(extraSpacing, existingTitles);
            expect(isDup).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not detect completely different titles as duplicates', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 10, maxLength: 50 }),
          fc.string({ minLength: 10, maxLength: 50 }),
          (title1, title2) => {
            // Only test if titles are sufficiently different
            const similarity = calculateSimilarity(title1, title2);
            fc.pre(similarity < 50); // Pre-condition: titles must be quite different
            
            const detector = new DuplicateDetector(90);
            const existingTitles = [title1];
            
            // Very different titles should not be detected as duplicates
            const isDup = detector.isDuplicate(title2, existingTitles);
            expect(isDup).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should correctly identify duplicates when similarity is exactly at threshold', () => {
      const detector = new DuplicateDetector(90);
      
      // Test with known similar titles
      const existingTitles = ['Two Truths and a Lie'];
      
      // Very similar title (should be duplicate)
      const similarTitle = 'Two Truths and Lie';
      const isDup1 = detector.isDuplicate(similarTitle, existingTitles);
      
      // Calculate actual similarity to verify
      const similarity = calculateSimilarity(similarTitle, existingTitles[0]);
      
      if (similarity >= 90) {
        expect(isDup1).toBe(true);
      } else {
        expect(isDup1).toBe(false);
      }
    });

    it('should handle empty existing titles list', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (title) => {
            const detector = new DuplicateDetector(90);
            const existingTitles: string[] = [];
            
            // No existing titles means no duplicates
            const isDup = detector.isDuplicate(title, existingTitles);
            expect(isDup).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should detect duplicates in a list of multiple existing titles', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 5, maxLength: 50 }).filter(s => s.trim().length > 0),
          fc.array(fc.string({ minLength: 5, maxLength: 50 }), { minLength: 1, maxLength: 10 }),
          (duplicateTitle, otherTitles) => {
            const detector = new DuplicateDetector(90);
            // Insert the duplicate title somewhere in the list
            const existingTitles = [...otherTitles, duplicateTitle];
            
            // Should detect the duplicate
            const isDup = detector.isDuplicate(duplicateTitle, existingTitles);
            expect(isDup).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('String Normalization Properties', () => {
    it('should produce consistent normalized output for the same input', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (title) => {
            const normalized1 = normalizeTitle(title);
            const normalized2 = normalizeTitle(title);
            
            // Normalization should be idempotent
            expect(normalized1).toBe(normalized2);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should produce the same normalized output for case variations', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (title) => {
            const normalizedOriginal = normalizeTitle(title);
            const normalizedUpper = normalizeTitle(title.toUpperCase());
            const normalizedLower = normalizeTitle(title.toLowerCase());
            
            // All case variations should normalize to the same value
            expect(normalizedOriginal).toBe(normalizedUpper);
            expect(normalizedOriginal).toBe(normalizedLower);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should remove all punctuation from titles', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (title) => {
            const normalized = normalizeTitle(title);
            
            // Normalized title should not contain punctuation
            const hasPunctuation = /[^\w\s]/.test(normalized);
            expect(hasPunctuation).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should normalize whitespace to single spaces', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (title) => {
            const normalized = normalizeTitle(title);
            
            // Should not have multiple consecutive spaces
            const hasMultipleSpaces = /\s{2,}/.test(normalized);
            expect(hasMultipleSpaces).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Similarity Calculation Properties', () => {
    it('should return 100% similarity for identical strings', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (title) => {
            const similarity = calculateSimilarity(title, title);
            expect(similarity).toBe(100);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should be symmetric (similarity(A,B) = similarity(B,A))', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          fc.string({ minLength: 1, maxLength: 100 }),
          (title1, title2) => {
            const sim1 = calculateSimilarity(title1, title2);
            const sim2 = calculateSimilarity(title2, title1);
            
            // Similarity should be symmetric
            expect(sim1).toBe(sim2);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return a value between 0 and 100', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 0, maxLength: 100 }),
          fc.string({ minLength: 0, maxLength: 100 }),
          (title1, title2) => {
            const similarity = calculateSimilarity(title1, title2);
            
            // Similarity should be in valid range
            expect(similarity).toBeGreaterThanOrEqual(0);
            expect(similarity).toBeLessThanOrEqual(100);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 100% for empty strings', () => {
      const similarity = calculateSimilarity('', '');
      expect(similarity).toBe(100);
    });
  });
});

describe('Slug Generation', () => {
  describe('generateSlug', () => {
    it('should convert title to lowercase', () => {
      const slug = generateSlug('Two Truths and a Lie');
      expect(slug).toBe('two-truths-and-a-lie');
    });

    it('should replace spaces with hyphens', () => {
      const slug = generateSlug('Human Bingo');
      expect(slug).toBe('human-bingo');
    });

    it('should remove special characters', () => {
      const slug = generateSlug('Game: Fun & Easy!');
      expect(slug).toBe('game-fun-easy');
    });

    it('should handle empty strings', () => {
      const slug = generateSlug('');
      expect(slug).toBe('');
    });
  });

  describe('ensureUniqueSlug', () => {
    it('should return original slug if unique', () => {
      const slug = ensureUniqueSlug('human-bingo', ['two-truths', 'icebreaker']);
      expect(slug).toBe('human-bingo');
    });

    it('should add -2 suffix for first conflict', () => {
      const slug = ensureUniqueSlug('human-bingo', ['human-bingo']);
      expect(slug).toBe('human-bingo-2');
    });

    it('should increment suffix for multiple conflicts', () => {
      const slug = ensureUniqueSlug('human-bingo', ['human-bingo', 'human-bingo-2', 'human-bingo-3']);
      expect(slug).toBe('human-bingo-4');
    });

    it('should handle empty existing slugs array', () => {
      const slug = ensureUniqueSlug('human-bingo', []);
      expect(slug).toBe('human-bingo');
    });
  });

  describe('generateUniqueSlug', () => {
    it('should generate unique slug from title', () => {
      const slug = generateUniqueSlug('Two Truths and a Lie', ['human-bingo']);
      expect(slug).toBe('two-truths-and-a-lie');
    });

    it('should add suffix if slug already exists', () => {
      const slug = generateUniqueSlug('Human Bingo', ['human-bingo']);
      expect(slug).toBe('human-bingo-2');
    });
  });

  describe('SlugGenerator class', () => {
    it('should generate unique slugs and track them', () => {
      const generator = new SlugGenerator();
      
      const slug1 = generator.generateUniqueSlug('Human Bingo');
      const slug2 = generator.generateUniqueSlug('Human Bingo');
      
      expect(slug1).toBe('human-bingo');
      expect(slug2).toBe('human-bingo-2');
    });

    it('should initialize with existing slugs', () => {
      const generator = new SlugGenerator(['human-bingo', 'two-truths']);
      
      const slug = generator.generateUniqueSlug('Human Bingo');
      expect(slug).toBe('human-bingo-2');
    });

    it('should check if slug exists', () => {
      const generator = new SlugGenerator(['human-bingo']);
      
      expect(generator.hasSlug('human-bingo')).toBe(true);
      expect(generator.hasSlug('two-truths')).toBe(false);
    });

    it('should add slugs manually', () => {
      const generator = new SlugGenerator();
      
      generator.addSlug('human-bingo');
      expect(generator.hasSlug('human-bingo')).toBe(true);
    });
  });
});

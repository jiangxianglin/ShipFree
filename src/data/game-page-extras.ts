export type GameFaqItem = {
  q: string;
  a: string;
};

export type GamePageExtrasContent = {
  howToSteps?: { title: string; body: string }[];
  variations?: { title: string; body: string }[];
  rulesTiming?: { label: string; body: string }[];
  adultsWork?: string;
  faqs: GameFaqItem[];
};

/**
 * Editorial blocks for high-opportunity / page-2 game pages.
 * Single source for on-page FAQ UI (+ optional JSON-LD consumers).
 */
export const GAME_PAGE_EXTRAS: Record<string, GamePageExtrasContent> = {
  "name-that-movie-quote": {
    howToSteps: [
      {
        title: "Set the tone and theme",
        body: "Tell the group this is a playful quoting game, not a trivia exam. Optionally pick a theme (90s comedies, Pixar, workplace movies) so quieter players are not stuck searching for obscure lines.",
      },
      {
        title: "Take turns quoting a line",
        body: "One person delivers a short movie line—no titles, actors, or year hints. Keep quotes under one sentence so the pace stays quick.",
      },
      {
        title: "Group guesses, then reveal",
        body: "Anyone can shout a guess, or go around the circle once. After a correct answer (or 10–15 seconds), the quoter confirms the film and the next person goes.",
      },
      {
        title: "Optional scoring or team mode",
        body: "Award one point for a correct film title, or split into two teams that alternate quotes. Stop while energy is high—usually 8–12 minutes.",
      },
    ],
    variations: [
      {
        title: "TV quote round",
        body: "Allow TV shows and streaming series. Great for mixed-age groups who share fewer classic films.",
      },
      {
        title: "Decade challenge",
        body: "Restrict quotes to one decade (or rotate decades each round) to level the playing field.",
      },
      {
        title: "Silent / chat version",
        body: "For virtual meetings, players type the quote in chat; others reply with the movie title. Use reactions to vote when multiple guesses appear.",
      },
    ],
    rulesTiming: [
      {
        label: "Players",
        body: "4–30 people. Above 15, split into two quoting circles or use team mode.",
      },
      {
        label: "Time",
        body: "8–12 minutes. Aim for ~30–45 seconds per quote including guesses.",
      },
      {
        label: "House rules",
        body: "No humming the soundtrack, no actor names, and skip quotes that rely on spoilers for recent releases if anyone asks.",
      },
    ],
    adultsWork:
      "For work meetings, pick PG workplace-friendly films (Office Space lines can get spicy—set a clean-quote rule). Use it after a long agenda block when you want laughs without personal disclosure. Remote teams can run the chat variation in 5 minutes.",
    faqs: [
      {
        q: "How do you play Name That Movie Quote?",
        a: "Players take turns saying a short movie line without naming the film. The group guesses the title, then the next person quotes. Optional scoring or themed rounds keep it competitive without needing materials.",
      },
      {
        q: "What are good starter movie quotes for icebreakers?",
        a: "Use widely known lines such as “Here’s looking at you, kid,” “I am your father,” “To infinity and beyond,” or “May the Force be with you.” Prefer quotes your audience is likely to know over niche deep cuts.",
      },
      {
        q: "How long does Name That Movie Quote take?",
        a: "Most groups finish in 8–12 minutes. Cap each quote at about 45 seconds of guessing so everyone gets a turn.",
      },
      {
        q: "Can you play it virtually?",
        a: "Yes. Have the quoter unmute or type the line in chat. Others reply with the movie title in chat or with a reaction. Breakout rooms work well for groups larger than 12.",
      },
      {
        q: "How do you keep it inclusive?",
        a: "Offer themed rounds (animated films, sports movies) and allow a “pass” if someone cannot think of a quote. Avoid spoilers and quotes that need cultural knowledge only a few people share.",
      },
    ],
  },

  "find-your-match": {
    howToSteps: [
      {
        title: "Prepare even pairs",
        body: "Print or write famous pairs on separate cards—one half per card. Count attendees and make sure you have an even number of cards (a facilitator can sit out if needed).",
      },
      {
        title: "Hand out cards face-down",
        body: "Each person gets one half. Explain the rule: you may ask only yes/no questions and may not say the text on your card out loud.",
      },
      {
        title: "Mingle and match",
        body: "People move around asking questions like “Am I a food?” or “Are we from a comic book?” When two people believe they match, they confirm cards and sit or stand together.",
      },
      {
        title: "Pair introductions",
        body: "Each pair shares their famous duo and a 10-second personal intro (name + role). Total run time is usually 15–20 minutes.",
      },
    ],
    variations: [
      {
        title: "Themed decks",
        body: "Use company-product pairs, book characters, or local landmarks so the set matches your audience.",
      },
      {
        title: "Odd-number fix",
        body: "Add a “wildcard” card that can pair with anyone, or let the facilitator join so every card has a match.",
      },
      {
        title: "Virtual breakouts",
        body: "DM each person their half, then open random breakout rooms of 4–6 for yes/no questioning. Rematch rooms every 2 minutes until pairs reunite in the main session.",
      },
    ],
    rulesTiming: [
      {
        label: "Players",
        body: "Best with 10–50 people and an even headcount.",
      },
      {
        label: "Time",
        body: "15–20 minutes: ~5–10 minutes mingling, then pair intros.",
      },
      {
        label: "Core rule",
        body: "Yes/no questions only—no reading your card aloud and no “Are you Juliet?” style giveaways if the card says Romeo.",
      },
    ],
    adultsWork:
      "At networking events and conferences, Find Your Match creates movement and a built-in conversation partner. For corporate offsites, use work-safe pairs (calendar + meeting, coffee + Monday) so nobody needs pop-culture fluency.",
    faqs: [
      {
        q: "How do you play Find Your Match?",
        a: "Participants receive cards with one half of a famous pair. They find their matching partner by asking yes/no questions without saying what is on their card. Once pairs reunite, they introduce themselves to the group.",
      },
      {
        q: "How many people can play Find Your Match?",
        a: "It works best with 10–50 people. You need an even number of participants (or a wildcard/facilitator card). Larger groups can run with more prepared pairs.",
      },
      {
        q: "What materials do you need?",
        a: "Cards with famous pairs split across two halves—for example peanut butter / jelly, Sherlock Holmes / Watson, Batman / Robin. Print or handwrite them before the session.",
      },
      {
        q: "How long does Find Your Match take?",
        a: "Typically 15–20 minutes including setup and pair introductions. Mingling usually lasts 5–10 minutes.",
      },
      {
        q: "What are some example famous pairs?",
        a: "Classics: PB & jelly, Batman & Robin, Romeo & Juliet, salt & pepper. Corporate: email & inbox, slides & presenter. Student-friendly: Wi‑Fi & password, coffee & monday.",
      },
      {
        q: "Can Find Your Match be played virtually?",
        a: "Yes. Send each person their half via chat or email, then use breakout rooms for questioning. Reconvene so pairs announce themselves in the main room.",
      },
    ],
  },

  chainlink: {
    howToSteps: [
      {
        title: "Start with one clear fact",
        body: "Person A shares a short, positive fact (“I run on weekends”). Keep it specific enough that someone else can link to it.",
      },
      {
        title: "Link, then add",
        body: "Person B names a shared trait with A (“I also run”) and adds a new fact (“…and I have a dog”). The spoken link is what makes the chain stick.",
      },
      {
        title: "Continue around the circle",
        body: "Each next person links to the previous speaker’s newest fact, then adds their own. For groups over ~15, split into sub-circles so the chain stays memorable.",
      },
      {
        title: "Debrief in one minute",
        body: "Ask what made linking easy or hard. That short reflection turns a mixer into a listening warm-up.",
      },
    ],
    variations: [
      {
        title: "Work-safe prompts",
        body: "Limit facts to hobbies, tools, or “one thing that helps me focus” so the chain stays professional.",
      },
      {
        title: "Small-circle mode",
        body: "For 20–40 people, run 3–4 simultaneous chains of 8–10, then share one highlight from each circle.",
      },
      {
        title: "Memory stretch",
        body: "Advanced groups may optionally recite the last two links before adding theirs—use only if the group is small and game for it.",
      },
    ],
    rulesTiming: [
      {
        label: "Players",
        body: "8–40 people (split above 15).",
      },
      {
        label: "Time",
        body: "10–15 minutes; about one minute per person in a small circle.",
      },
      {
        label: "Linking rule",
        body: "Every turn must include an explicit shared trait with the previous person before adding a new fact.",
      },
    ],
    adultsWork:
      "Chainlink works well as a meeting opener when you want names plus common ground without a long icebreaker. Follow it with how to play the name game if the group still needs name recall.",
    faqs: [
      {
        q: "How do you play Chainlink?",
        a: "Person A shares a fact. Person B states a shared trait with A, then adds a new fact. Each next person links to the previous speaker and adds theirs, building a chain of commonalities around the group.",
      },
      {
        q: "What facts work for Chainlink?",
        a: "Short, linkable facts work best: hobbies, pets, tools you use, places you have lived, or foods you love. Avoid sensitive topics and one-word answers that are hard to link.",
      },
      {
        q: "How long does Chainlink take?",
        a: "With 8–15 people, a full round takes about 10–15 minutes. Larger groups should split into sub-circles.",
      },
      {
        q: "Can it work for large groups?",
        a: "Yes. Split into circles of 8–12. Each circle builds its own chain, then optionally shares one funny link with the full room.",
      },
      {
        q: "What does Chainlink reveal?",
        a: "It shows how people listen for overlap and build on each other’s contributions—useful before collaboration or brainstorming.",
      },
    ],
  },

  "emoji-introduction": {
    rulesTiming: [
      {
        label: "Players",
        body: "5–30 people. Above 12, use chat-first sharing or breakout rooms.",
      },
      {
        label: "Time",
        body: "10–15 minutes. Budget 30–90 seconds per person depending on group size.",
      },
      {
        label: "Setup",
        body: "Need a shared chat (Zoom/Teams/Slack) or paper/sticky notes for in-person groups.",
      },
    ],
    adultsWork:
      "For work meetings, ask for 2–3 work-safe emojis (role, energy, weekend plan) so the activity stays professional. Remote teams can post in chat first, then unmute only if they want to explain—ideal for mixed introvert/extrovert groups.",
    faqs: [], // on-page FAQ already exists in GameDetail
  },
};

export function getGamePageExtras(slug: string): GamePageExtrasContent | null {
  return GAME_PAGE_EXTRAS[slug] ?? null;
}

export function getGamePageFaqs(slug: string): GameFaqItem[] {
  return GAME_PAGE_EXTRAS[slug]?.faqs ?? [];
}

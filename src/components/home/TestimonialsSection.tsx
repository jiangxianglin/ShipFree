import Image from "next/image";
import styles from "./testimonials.module.css";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Team Lead",
    company: "Microsoft",
    content:
      "These ice breaker games completely transformed our virtual team meetings. Our team engagement increased by 40% and everyone looks forward to our sessions now!",
    rating: 5,
    avatar: "SM",
    image: "/SarahMitchell.png",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "HR Director",
    company: "Google",
    content:
      "As someone who facilitates workshops regularly, this collection of ice breaker games has been invaluable. The variety and quality are outstanding.",
    rating: 4,
    avatar: "MR",
    image: "/MichaelRodriguez.png",
  },
  {
    id: 3,
    name: "Emily Clarke",
    role: "Training Manager",
    company: "Amazon",
    content:
      "I've used dozens of ice breaker games from this site. They're well-structured, easy to follow, and always get great results with our new hire orientations.",
    rating: 5,
    avatar: "EC",
    image: "/EmilyClarke.png",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Scrum Master",
    company: "Netflix",
    content:
      "The virtual ice breaker games section saved our remote team culture. These activities help us maintain that personal connection despite being distributed globally.",
    rating: 4,
    avatar: "DK",
    image: "/DavidKim.png",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Professor",
    company: "Stanford University",
    content:
      "My students love starting each class with these ice breaker games. It creates such a positive learning environment and helps shy students participate more.",
    rating: 5,
    avatar: "LT",
    image: "/LisaThompson.png",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Event Coordinator",
    company: "TED Conferences",
    content:
      "We use these ice breaker games at our conferences worldwide. They consistently help attendees network and create meaningful connections.",
    rating: 4,
    avatar: "JW",
    image: "/JamesWilson.png",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 20 20"
          className={i < rating ? styles.starOn : styles.starOff}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Community</p>
          <h2 id="testimonials-heading">What facilitators say</h2>
          <p>
            Notes from team leads, trainers, and teachers who use these ice breaker
            games in meetings, classrooms, and events.
          </p>
        </div>

        <div className={styles.list}>
          {testimonials.map((t) => (
            <article key={t.id} className={styles.item}>
              <blockquote className={styles.quote}>“{t.content}”</blockquote>
              <div className={styles.meta}>
                <div className={styles.avatar}>
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt=""
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className={styles.avatarFallback}>{t.avatar}</div>
                  )}
                </div>
                <div className={styles.who}>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.role}>
                    {t.role}, {t.company}
                  </p>
                </div>
                <StarRating rating={t.rating} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

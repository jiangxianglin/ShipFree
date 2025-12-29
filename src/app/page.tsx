import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllGames } from "@/db/queries/games";
import { GameCard } from "@/components/games/GameCard";
import { HomeFilterSection } from "@/components/home/HomeFilterSection";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Ice Breaker Games - Find the Perfect Activity for Your Team",
  description:
    "Discover engaging ice breaker games for team building, virtual meetings, classrooms, and conferences. Browse our curated collection of activities.",
  alternates: {
    canonical: "https://www.icebreakergames.site",
  },
  openGraph: {
    type: "website",
    url: "https://www.icebreakergames.site",
    title: "Ice Breaker Games - Find the Perfect Activity for Your Team",
    description:
      "Discover engaging ice breaker games for team building, virtual meetings, classrooms, and conferences. Browse our curated collection of activities.",
    images: [
      {
        url: "/img/Hero.png",
        width: 1200,
        height: 630,
        alt: "Ice Breaker Games - Team Building Activities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ice Breaker Games - Find the Perfect Activity for Your Team",
    description:
      "Discover engaging ice breaker games for team building, virtual meetings, classrooms, and conferences. Browse our curated collection of activities.",
    images: ["/img/Hero.png"],
  },
};

export default async function Home() {
  const allGames = await getAllGames();
  const featuredGames = allGames.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ice Breaker Games",
    url: "https://www.icebreakergames.site",
    description:
      "Discover engaging ice breaker games for team building, virtual meetings, classrooms, and conferences. Browse our curated collection of activities.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.icebreakergames.site/games?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Image
            src="/img/Hero.png"
            alt="Ice breaker games - diverse team members engaging in fun team building activities"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
            style={{ objectPosition: '50% 40%' }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-purple-900/70 dark:from-gray-900/80 dark:via-gray-900/70 dark:to-gray-900/80"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg max-w-4xl mx-auto">
            Unlock the Power of Connection with the Best Ice Breaker Games
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Transform your gatherings with our curated collection of <strong>ice breaker games</strong>. Whether you're leading a corporate team, a classroom, or a social event, our <strong>ice breaker games</strong> are designed to spark conversation, build trust, and energize any group. Discover why thousands of facilitators trust our <strong>ice breaker games</strong> to create memorable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/games"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse All Games
            </Link>
            <a
              href="#featured"
              className="px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              See Featured Games
            </a>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <HomeFilterSection games={allGames} />

      {/* Stats Section */}
      <section className="py-16 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                {allGames.length}+
              </div>
              <div className="text-muted-foreground">Ice Breaker Games</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">6</div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Diverse Ice Breaker Games for Every Occasion and Group Size
            </h2>
            <div className="text-lg text-muted-foreground max-w-4xl mx-auto mb-6 space-y-4">
              <p>
                Finding the right activity is crucial for success. Our comprehensive library of <strong>ice breaker games</strong> covers every scenario imaginable. Whether you're hosting virtual meetings, planning intensive team building sessions, or organizing fun classroom activities, we have <strong>ice breaker games</strong> to fit your needs.
              </p>
              <p>
                Our collection includes quick 5-minute energizers for tight schedules and in-depth exercises for deeper bonding. Each of our <strong>ice breaker games</strong> is carefully selected and tested to ensure maximum engagement. From small groups to large conferences, our <strong>ice breaker games</strong> help you create meaningful connections and warm up your audience effectively.
              </p>
            </div>
            <div className="mb-8 -mx-4 md:mx-0">
              <div className="relative w-full h-32 md:h-40">
                <Image
                  src="/img/Categories.png"
                  alt="Ice breaker games for team building, virtual meetings, classrooms, training, conferences and social events"
                  fill
                  className="object-cover scale-x-110"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Team Building",
                icon: "👥",
                description: "Strengthen bonds and improve collaboration with specialized ice breaker games",
                color: "bg-blue-100 dark:bg-blue-900/20",
              },
              {
                name: "Virtual Meeting",
                icon: "💻",
                description: "Engage remote teams and break the distance with digital ice breaker games",
                color: "bg-purple-100 dark:bg-purple-900/20",
              },
              {
                name: "Classroom",
                icon: "📚",
                description: "Create a fun learning environment with educational ice breaker games",
                color: "bg-green-100 dark:bg-green-900/20",
              },
              {
                name: "Training",
                icon: "🎯",
                description: "Energize workshops and training sessions with active ice breaker games",
                color: "bg-orange-100 dark:bg-orange-900/20",
              },
              {
                name: "Conference",
                icon: "🎤",
                description: "Network and connect at events using large-group ice breaker games",
                color: "bg-red-100 dark:bg-red-900/20",
              },
              {
                name: "Social Event",
                icon: "🎉",
                description: "Make parties and gatherings memorable with fun ice breaker games",
                color: "bg-pink-100 dark:bg-pink-900/20",
              },
            ].map((category) => (
              <div
                key={category.name}
                className={`${category.color} p-6 rounded-lg hover:shadow-lg transition-shadow`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section id="featured" className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top-Rated Featured Ice Breaker Games
            </h2>
            <div className="text-lg text-muted-foreground max-w-4xl mx-auto space-y-4">
              <p>
                Explore our selection of featured <strong>ice breaker games</strong>, loved by facilitators and participants alike. These popular <strong>ice breaker games</strong> have been proven to break down barriers and foster positive group dynamics.
              </p>
              <p>
                Each of our featured <strong>ice breaker games</strong> comes with detailed step-by-step instructions, making them easy to facilitate even for beginners. Choose from our top <strong>ice breaker games</strong> to guarantee a successful start to your meeting or event. These <strong>ice breaker games</strong> are versatile and adaptable to various settings.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/games"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View All {allGames.length} Games
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How to Successfully Implement Ice Breaker Games
          </h2>
          <div className="text-lg text-muted-foreground text-center max-w-4xl mx-auto mb-12 space-y-4">
            <p>
              Integrating <strong>ice breaker games</strong> into your meetings and events is a seamless and rewarding process with our comprehensive platform. We have designed our resources to assist facilitators, teachers, and team leaders in finding and implementing the perfect <strong>ice breaker games</strong> with ease.
            </p>
            <p>
              Whether you are a seasoned pro or new to facilitating, our guide to <strong>ice breaker games</strong> ensures you have everything you need. Each of our <strong>ice breaker games</strong> includes clear objectives, material lists, and facilitation tips. Mastering <strong>ice breaker games</strong> has never been simpler.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6">
                <img
                  src="/img/How It Works.png"
                  alt="Browse ice breaker games - step 1 of finding the perfect team building activity"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Games</h3>
              <p className="text-muted-foreground">
                Explore our extensive collection of <strong>ice breaker games</strong> organized by category, difficulty level, group size, and duration. Use filters to narrow down options that match your specific needs for the perfect <strong>ice breaker game</strong>.
              </p>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6">
                <img
                  src="/img/How It Works2.png"
                  alt="Choose your ice breaker game - step 2 of selecting team building activities"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Game</h3>
              <p className="text-muted-foreground">
                Select the perfect activity from our <strong>ice breaker games</strong> based on your group size, available time, setting (in-person or virtual), and desired outcomes. Read reviews to see which <strong>ice breaker games</strong> work best.
              </p>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6">
                <img
                  src="/img/How It Works3.png"
                  alt="Play and connect with ice breaker games - step 3 of engaging your team"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Play & Connect</h3>
              <p className="text-muted-foreground">
                Follow our clear, step-by-step instructions to facilitate your chosen <strong>ice breaker games</strong>. Watch as participants engage, laugh, and build meaningful connections through these <strong>ice breaker games</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            The Transformative Benefits of Ice Breaker Games
          </h2>
          <div className="text-lg text-muted-foreground text-center max-w-4xl mx-auto mb-12 space-y-4">
            <p>
              <strong>Ice breaker games</strong> are powerful tools that go far beyond simple introductions. They are essential components of effective group management and team building. One of the primary benefits of <strong>ice breaker games</strong> is their ability to transform awkward silences into engaging, meaningful conversations. By providing a structured way to interact, <strong>ice breaker games</strong> help participants feel comfortable and safe.
            </p>
            <p>
              Research consistently shows that groups who start their sessions with <strong>ice breaker games</strong> demonstrate higher levels of participation, creativity, and overall team cohesion. <strong>Ice breaker games</strong> also play a vital role in humanizing interactions, especially in remote or hybrid settings. Whether you are leading a corporate training, teaching a classroom of students, or hosting a large conference, incorporating <strong>ice breaker games</strong> into your routine sets the foundation for productive outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold mb-2">Build Connections</h3>
              <p className="text-sm text-muted-foreground">
                Help team members get to know each other and form meaningful relationships through fun <strong>ice breaker games</strong>.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Boost Energy</h3>
              <p className="text-sm text-muted-foreground">
                Energize your group and create an enthusiastic atmosphere with active <strong>ice breaker games</strong>.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-semibold mb-2">Encourage Communication</h3>
              <p className="text-sm text-muted-foreground">
                Break down barriers and help participants feel comfortable sharing ideas using <strong>ice breaker games</strong>.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Set the Tone</h3>
              <p className="text-sm text-muted-foreground">
                Create a positive, inclusive environment that sets the stage for success with <strong>ice breaker games</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Tips Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Expert Tips for Facilitating Ice Breaker Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-2xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Know Your Audience</h3>
                  <p className="text-muted-foreground">
                    Choose <strong>ice breaker games</strong> that are appropriate for the group's size, familiarity, and professional level. What works for a student group might not work for executives, so select your <strong>ice breaker games</strong> wisely.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-2xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Explain the 'Why'</h3>
                  <p className="text-muted-foreground">
                    Briefly explain the purpose of the <strong>ice breaker game</strong> before starting. When participants understand the value of <strong>ice breaker games</strong>, they are more likely to engage fully.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-2xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Be Enthusiastic</h3>
                  <p className="text-muted-foreground">
                    Your energy sets the tone for the <strong>ice breaker games</strong>. If you are excited about the <strong>ice breaker game</strong>, your group will be too.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-2xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Participate When Appropriate</h3>
                  <p className="text-muted-foreground">
                    Joining in the <strong>ice breaker games</strong> can help break down hierarchy and show that you are part of the team. However, for some <strong>ice breaker games</strong>, it's better to observe.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-2xl">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Adapt on the Fly</h3>
                  <p className="text-muted-foreground">
                    Be prepared to modify <strong>ice breaker games</strong> if they aren't working as expected. Flexibility is key to successful <strong>ice breaker games</strong>.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center text-2xl">
                  6
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Time Management</h3>
                  <p className="text-muted-foreground">
                    Keep an eye on the clock. <strong>ice breaker games</strong> should energize the group, not drag on. Efficient <strong>ice breaker games</strong> are the most effective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions About Ice Breaker Games
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-3">What are the best ice breaker games for large groups?</h3>
              <p className="text-muted-foreground">
                For large groups, <strong>ice breaker games</strong> that allow for mingling or small sub-group interactions are best. Games like 'Human Bingo' or 'Rock Paper Scissors Tournament' are excellent <strong>ice breaker games</strong> for crowds because they scale well and keep energy high.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-3">Can ice breaker games be played virtually?</h3>
              <p className="text-muted-foreground">
                Absolutely! We offer a wide range of virtual <strong>ice breaker games</strong> designed specifically for platforms like Zoom or Teams. Virtual <strong>ice breaker games</strong> are crucial for maintaining remote team culture and ensuring that digital meetings are engaging.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-3">How long should ice breaker games last?</h3>
              <p className="text-muted-foreground">
                The duration of <strong>ice breaker games</strong> depends on your agenda. We have quick <strong>ice breaker games</strong> that take 5 minutes and longer <strong>ice breaker games</strong> that can last 30 minutes or more. It's best to choose <strong>ice breaker games</strong> that fit comfortably within your allotted time.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-3">Do I need equipment for ice breaker games?</h3>
              <p className="text-muted-foreground">
                Many of our <strong>ice breaker games</strong> require no equipment at all. We also have <strong>ice breaker games</strong> that use simple materials like pen and paper. Each of our <strong>ice breaker games</strong> lists the required materials clearly.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-3">Are ice breaker games suitable for professional settings?</h3>
              <p className="text-muted-foreground">
                Yes, <strong>ice breaker games</strong> are widely used in professional settings to improve team cohesion and communication. Professional <strong>ice breaker games</strong> are designed to be respectful, inclusive, and goal-oriented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Meetings with Ice Breaker Games?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Don't let another meeting fall flat. Start exploring our extensive collection of engaging <strong>ice breaker games</strong> today. Join the community of thousands of facilitators who rely on our <strong>ice breaker games</strong> to create unforgettable experiences. Whether you need <strong>ice breaker games</strong> for a quick huddle or a full-day workshop, we have you covered.
          </p>
          <Link
            href="/games"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started with Ice Breaker Games
          </Link>
        </div>
      </section>
    </div>
  );
}

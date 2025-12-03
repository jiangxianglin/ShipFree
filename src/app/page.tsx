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
      <section className="relative py-16 md:py-20 overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Break the Ice with Confidence
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Discover the perfect ice breaker games for your team, classroom, or event.
            Engage, connect, and energize your group.
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
              Ice Breaker Games for Every Occasion
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Whether you're hosting virtual meetings, planning team building sessions, or organizing classroom activities,
              our comprehensive library helps you create memorable experiences. Our diverse collection of ice breaker games
              is designed to fit any setting, group size, or time constraint. From quick 5-minute energizers to in-depth
              exercises, find the perfect activity to warm up your audience and create meaningful connections. Each game is
              carefully selected and tested by facilitators to ensure maximum engagement and fun for all participants.
            </p>
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
                description: "Strengthen bonds and improve collaboration",
                color: "bg-blue-100 dark:bg-blue-900/20",
              },
              {
                name: "Virtual Meeting",
                icon: "💻",
                description: "Engage remote teams and break the distance",
                color: "bg-purple-100 dark:bg-purple-900/20",
              },
              {
                name: "Classroom",
                icon: "📚",
                description: "Create a fun learning environment",
                color: "bg-green-100 dark:bg-green-900/20",
              },
              {
                name: "Training",
                icon: "🎯",
                description: "Energize workshops and training sessions",
                color: "bg-orange-100 dark:bg-orange-900/20",
              },
              {
                name: "Conference",
                icon: "🎤",
                description: "Network and connect at events",
                color: "bg-red-100 dark:bg-red-900/20",
              },
              {
                name: "Social Event",
                icon: "🎉",
                description: "Make parties and gatherings memorable",
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
              Featured Ice Breakers
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Start with our most popular ice breaker games, trusted by thousands of facilitators worldwide.
              These activities have been proven to break down barriers, spark conversations, and create positive
              group dynamics. Each game includes step-by-step instructions, recommended group sizes, and helpful
              facilitation tips to ensure your success.
            </p>
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
            How to Use Our Ice Breaker Games
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Getting started has never been easier. Our platform is designed to help facilitators, teachers, and team
            leaders quickly find and implement the perfect activities. Each game comes with detailed instructions,
            materials lists, and helpful tips to ensure success. Whether you're a seasoned facilitator or trying
            ice breaker games for the first time, our step-by-step approach makes it simple.
          </p>
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
                Explore our extensive collection organized by category, difficulty level, group size,
                and duration. Use filters to narrow down options that match your specific needs.
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
                Select the perfect activity based on your group size, available time, setting
                (in-person or virtual), and desired outcomes. Read reviews and see what works best.
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
                Follow our clear, step-by-step instructions to facilitate your chosen activity.
                Watch as participants engage, laugh, and build meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Use Ice Breaker Games?
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Ice breaker games are powerful tools that transform awkward silences into engaging conversations.
            They help participants feel comfortable, build trust, and create a positive atmosphere for collaboration.
            Research shows that groups who start with ice breaker games demonstrate higher levels of participation,
            creativity, and team cohesion throughout their sessions. Whether you're leading a corporate training,
            teaching a class, or hosting a conference, these activities set the foundation for meaningful interactions
            and productive outcomes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold mb-2">Build Connections</h3>
              <p className="text-sm text-muted-foreground">
                Help team members get to know each other and form meaningful relationships through fun activities.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Boost Energy</h3>
              <p className="text-sm text-muted-foreground">
                Energize your group and create an enthusiastic atmosphere that enhances productivity and creativity.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-semibold mb-2">Encourage Communication</h3>
              <p className="text-sm text-muted-foreground">
                Break down barriers and help participants feel comfortable sharing ideas and opinions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Set the Tone</h3>
              <p className="text-sm text-muted-foreground">
                Create a positive, inclusive environment that sets the stage for successful meetings and events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Break the Ice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start exploring our collection of engaging ice breaker games today and transform your next meeting,
            training session, or event into an unforgettable experience. Join thousands of facilitators who trust
            our platform to find the best activities for their groups.
          </p>
          <Link
            href="/games"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

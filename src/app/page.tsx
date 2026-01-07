import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllGames } from "@/db/queries/games";
import { GameCard } from "@/components/games/GameCard";
import { HomeFilterSection } from "@/components/home/HomeFilterSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import SessionLabCategories from "@/components/SessionLabCategories";

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
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
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
          {/* Modern gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/90"></div>
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white drop-shadow-2xl max-w-5xl mx-auto leading-tight">
              Unlock the Power of Connection with the Best 
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"> Ice Breaker Games</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-12 max-w-4xl mx-auto drop-shadow-lg leading-relaxed">
              Transform your gatherings with our curated collection of <strong className="text-blue-200">ice breaker games</strong>. Whether you're leading a corporate team, a classroom, or a social event, our activities are designed to spark conversation, build trust, and energize any group.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/games"
                className="group px-10 py-5 bg-white text-blue-600 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
              >
                <span className="flex items-center gap-3">
                  Browse All Games
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              <a
                href="#featured"
                className="px-10 py-5 border-2 border-white/80 text-white rounded-2xl text-xl font-bold hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-md hover:scale-105 transform"
              >
                See Featured Games
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <HomeFilterSection games={allGames} />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-y border-blue-100 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {allGames.length}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-lg font-medium">Ice Breaker Games</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">6</div>
              <div className="text-gray-600 dark:text-gray-300 text-lg font-medium">Categories</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">100%</div>
              <div className="text-gray-600 dark:text-gray-300 text-lg font-medium">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Diverse Ice Breaker Games for Every Occasion and Group Size
            </h2>
            <div className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 space-y-6 leading-relaxed">
              <p>
                Finding the right activity is crucial for success. Our comprehensive library of <strong className="text-blue-600">ice breaker games</strong> covers every scenario imaginable. Whether you're hosting virtual meetings, planning intensive team building sessions, or organizing fun classroom activities, we have the perfect activities to fit your needs.
              </p>
              <p>
                Our collection includes quick 5-minute energizers for tight schedules and in-depth exercises for deeper bonding. Each activity is carefully selected and tested to ensure maximum engagement and meaningful connections.
              </p>
            </div>
            <div className="mb-12 -mx-4 md:mx-0">
              <div className="relative w-full h-40 md:h-48 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/img/Categories.png"
                  alt="Ice breaker games for team building, virtual meetings, classrooms, training, conferences and social events"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Team Building",
                icon: "👥",
                description: "Strengthen bonds and improve collaboration with specialized ice breaker games",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
              },
              {
                name: "Virtual Meeting",
                icon: "💻",
                description: "Engage remote teams and break the distance with digital ice breaker games",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
              },
              {
                name: "Classroom",
                icon: "📚",
                description: "Create a fun learning environment with educational ice breaker games",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
              },
              {
                name: "Training",
                icon: "🎯",
                description: "Energize workshops and training sessions with active ice breaker games",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
              },
              {
                name: "Conference",
                icon: "🎤",
                description: "Network and connect at events using large-group ice breaker games",
                gradient: "from-indigo-500 to-purple-500",
                bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
              },
              {
                name: "Social Event",
                icon: "🎉",
                description: "Make parties and gatherings memorable with fun ice breaker games",
                gradient: "from-pink-500 to-rose-500",
                bgGradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
              },
            ].map((category) => (
              <div
                key={category.name}
                className={`group bg-gradient-to-br ${category.bgGradient} p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform border border-white/50 dark:border-gray-700/50 backdrop-blur-sm`}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SessionLab Categories Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <SessionLabCategories />
      </section>

      {/* Featured Games Section */}
      <section id="featured" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Top-Rated Featured Ice Breaker Games
            </h2>
            <div className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto space-y-6 leading-relaxed">
              <p>
                Explore our selection of featured <strong className="text-blue-600">ice breaker games</strong>, loved by facilitators and participants alike. These popular activities have been proven to break down barriers and foster positive group dynamics.
              </p>
              <p>
                Each featured game comes with detailed step-by-step instructions, making them easy to facilitate even for beginners. Choose from our top activities to guarantee a successful start to your meeting or event.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredGames.map((game) => (
              <div key={game.id} className="transform hover:scale-105 transition-all duration-300">
                <GameCard game={game} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/games"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
            >
              View All {allGames.length} Games
              <svg
                className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
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

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-purple-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Ready to Transform Your Meetings with 
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Ice Breaker Games?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-4xl mx-auto leading-relaxed">
            Don't let another meeting fall flat. Start exploring our extensive collection of engaging <strong className="text-blue-200">ice breaker games</strong> today. Join the community of thousands of facilitators who rely on our activities to create unforgettable experiences.
          </p>
          <Link
            href="/games"
            className="group inline-block px-12 py-6 bg-white text-blue-600 rounded-3xl text-2xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-110 transform"
          >
            <span className="flex items-center gap-4">
              Get Started with Ice Breaker Games
              <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

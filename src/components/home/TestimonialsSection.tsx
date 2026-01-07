import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

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
    content: "These ice breaker games completely transformed our virtual team meetings. Our team engagement increased by 40% and everyone looks forward to our sessions now!",
    rating: 5,
    avatar: "SM",
    image: "/SarahMitchell.png"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "HR Director",
    company: "Google",
    content: "As someone who facilitates workshops regularly, this collection of ice breaker games has been invaluable. The variety and quality are outstanding.",
    rating: 4,
    avatar: "MR"
  },
  {
    id: 3,
    name: "Emily Clarke",
    role: "Training Manager",
    company: "Amazon",
    content: "I've used dozens of ice breaker games from this site. They're well-structured, easy to follow, and always get great results with our new hire orientations.",
    rating: 5,
    avatar: "EC",
    image: "/EmilyClarke.png"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Scrum Master",
    company: "Netflix",
    content: "The virtual ice breaker games section saved our remote team culture. These activities help us maintain that personal connection despite being distributed globally.",
    rating: 4,
    avatar: "DK"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Professor",
    company: "Stanford University",
    content: "My students love starting each class with these ice breaker games. It creates such a positive learning environment and helps shy students participate more.",
    rating: 5,
    avatar: "LT"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Event Coordinator",
    company: "TED Conferences",
    content: "We use these ice breaker games at our conferences worldwide. They consistently help attendees network and create meaningful connections.",
    rating: 4,
    avatar: "JW",
    image: "/JamesWilson.png"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Trusted by Thousands of Facilitators Worldwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the community of professionals who have transformed their meetings, workshops, and events with our ice breaker games. Here's what they have to say about their experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className={`modern-card p-8 hover:shadow-2xl transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="w-14 h-14 ring-4 ring-blue-100 dark:ring-blue-900/30">
                  {testimonial.image ? (
                    <AvatarImage 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    {testimonial.role} at {testimonial.company}
                  </p>
                  <div className="mt-2">
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">
                "{testimonial.content}"
              </blockquote>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center gap-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-8 py-6 rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 4).map((testimonial) => (
                <Avatar key={testimonial.id} className="w-12 h-12 border-4 border-white dark:border-gray-800 hover:scale-110 transition-transform">
                  {testimonial.image ? (
                    <AvatarImage 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-3">
                <StarRating rating={4} />
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4.5</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Trusted by 10,000+ facilitators worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
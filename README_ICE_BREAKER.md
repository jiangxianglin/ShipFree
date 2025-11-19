# 🎮 Ice Breaker Games

A comprehensive web platform for discovering and sharing ice breaker games and team building activities.

## 🌟 Features

- **Extensive Game Library**: Browse 15+ curated ice breaker games for various settings
- **Smart Categorization**: Filter games by category (Team Building, Virtual Meeting, Classroom, Training, Conference, Social Event)
- **Detailed Instructions**: Each game includes step-by-step instructions, materials needed, player counts, and duration
- **SEO Optimized**: Full metadata, Open Graph tags, and structured data for excellent search visibility
- **Responsive Design**: Beautiful UI that works seamlessly on mobile, tablet, and desktop
- **Fast Performance**: Built with Next.js 15 and Turbopack for lightning-fast page loads

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + Shadcn UI
- **Language**: TypeScript
- **Deployment**: Vercel
- **Analytics**: Google Analytics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ShipFree
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Seed the database:
```bash
pnpm run db:seed:supabase
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
ShipFree/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── games/             # Games listing and detail pages
│   │   ├── tos/               # Terms of Service
│   │   └── privacy-policy/    # Privacy Policy
│   ├── components/            # React components
│   │   ├── games/            # Game-specific components
│   │   ├── Navigation.tsx    # Site navigation
│   │   └── Footer.tsx        # Site footer
│   ├── db/                   # Database layer
│   │   ├── queries/          # Database query functions
│   │   └── seed/             # Seed scripts
│   └── types/                # TypeScript type definitions
├── public/
│   └── img/                  # Images and assets
└── .env.local               # Environment variables
```

## 🎯 Key Features

### Game Library
- Browse all ice breaker games with rich filtering options
- View detailed game information including instructions, materials, and tips
- Responsive grid layout that adapts to screen size

### SEO & Performance
- Dynamic metadata generation for each game
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for search engines
- Optimized images with Next.js Image component

### User Experience
- Clean, modern UI with dark mode support
- Loading states and skeleton screens
- 404 pages for invalid routes
- Mobile-friendly navigation

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm db:seed:supabase` - Seed database with games

## 🌐 Deployment

The site is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy!

## 📄 License

This project is built on top of ShipFree template. See LICENSE.md for details.

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details.

## 📧 Contact

For questions or feedback, please visit our website.

---

Built with ❤️ using Next.js and Supabase

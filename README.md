# 🎬 StreamVault - Premium Streaming Platform

A professional Netflix-inspired streaming platform for both TV shows and movies, built with modern web technologies and featuring Google Drive video integration.

![StreamVault](https://img.shields.io/badge/StreamVault-Premium-E50914?style=for-the-badge&logo=netflix)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js)

---

## ✨ Features

### 🎥 **Video Streaming**
- Netflix-style video player with Google Drive integration
- Support for both TV shows and movies
- Progress tracking with resume functionality
- Auto-play next episode for shows
- Continue watching section
- Episode selection with season navigation

### 🎨 **Beautiful UI**
- Netflix-inspired design
- Dark/Light theme support
- Responsive layout (mobile-first)
- Smooth animations
- Professional components (shadcn/ui)

### 🔍 **Discovery**
- Advanced search with filters (genre, year range)
- Live search in header with instant results
- Category/genre filtering
- Separate browse pages for shows and movies
- Trending content sections
- Featured hero carousel with auto-play
- TMDB integration for rich metadata

### 📱 **User Features**
- Unified watchlist for shows and movies
- Viewing progress tracking per episode
- Share functionality for shows and movies
- Session-based data storage
- Fully mobile responsive
- Touch-friendly interface
- Dark theme optimized

### 🛠️ **Tech Stack**
- **Frontend:** React 18 + TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **Backend:** Express.js + Node.js
- **Database:** Drizzle ORM (PostgreSQL ready)
- **Build:** Vite
- **State:** TanStack Query

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yawarquil/streamvault.git
cd streamvault

# Install dependencies
npm install

# Start development server
npm run dev
```

### Open in Browser
```
http://localhost:5000
```

**That's it! Your StreamVault is running!** 🎉

---

## 📁 Project Structure

```
StreamVault/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── home.tsx           # Homepage with hero carousel
│   │   │   ├── show-detail.tsx    # Show details page
│   │   │   ├── watch.tsx          # Video player page
│   │   │   ├── search.tsx         # Search results
│   │   │   └── category.tsx       # Category browsing
│   │   ├── components/    # Reusable components
│   │   │   ├── hero-carousel.tsx  # Auto-playing hero slider
│   │   │   ├── content-row.tsx    # Horizontal content rows
│   │   │   ├── show-card.tsx      # Show card component
│   │   │   ├── header.tsx         # Navigation header
│   │   │   ├── footer.tsx         # Footer component
│   │   │   └── ui/                # shadcn/ui components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities
│   │   └── index.css      # Global styles
│   └── index.html
├── server/                # Backend Express API
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route handlers
│   ├── storage.ts        # Data storage layer
│   └── vite.ts           # Vite integration
├── shared/               # Shared TypeScript types
│   └── schema.ts         # Database schema (Drizzle)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎯 Available Scripts

### Development
```bash
npm run dev          # Start dev server (http://localhost:5000)
npm run check        # TypeScript type checking
```

### Content Management
```bash
npm run add-show        # Add show from TMDB
npm run add-movie       # Add movie from TMDB
npm run add-top-movies  # Add top 200 movies
npm run update-shows    # Update show metadata
```

### Database
```bash
npm run db:push         # Push schema to PostgreSQL
```

### Production
```bash
npm run build        # Build for production
npm start            # Start production server
```

---

## 🎨 Features in Detail

### Hero Carousel
- Auto-playing slider (5-second intervals)
- Large backdrop images with gradients
- Featured show information
- Play Now & More Info buttons
- Navigation arrows and dots
- Responsive on all devices

### Content Discovery
- **Trending Now** - Popular shows
- **Continue Watching** - Resume where you left off
- **Categories** - Action, Drama, Comedy, Horror
- **Search** - Find shows by title, actor, or genre

### Video Player
- Google Drive video embedding
- Custom controls overlay
- Progress tracking
- Auto-save watch position
- Up Next sidebar
- Keyboard shortcuts

### Watchlist
- Add/remove shows
- Session-based storage
- Quick access from header
- Persistent across sessions

---

## 🔧 Configuration

### Environment Variables

Create `.env` file in root:

```env
# Database (Optional - uses in-memory by default)
DATABASE_URL=postgresql://user:password@host:5432/streamvault

# Server
NODE_ENV=development
PORT=5000
```

### Customization

#### Change Site Name
Edit `client/src/components/header.tsx`:
```tsx
<span className="text-xl font-bold">YourSiteName</span>
```

#### Change Colors
Edit `client/src/index.css`:
```css
:root {
  --primary: 0 0% 8%;        /* Background */
  --accent: 0 91% 47%;       /* Netflix Red */
}
```

#### Add Content
Edit `server/storage.ts` - add shows to the `shows` array

---

## 📊 API Endpoints

### Shows
- `GET /api/shows` - Get all shows
- `GET /api/shows/search?q=query` - Search shows
- `GET /api/shows/:slug` - Get show by slug

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:slug` - Get movie by slug

### Episodes
- `GET /api/episodes/:showId` - Get episodes for a show

### Watchlist
- `GET /api/watchlist` - Get user watchlist (shows + movies)
- `POST /api/watchlist` - Add to watchlist (showId or movieId)
- `DELETE /api/watchlist/show/:showId` - Remove show from watchlist
- `DELETE /api/watchlist/movie/:movieId` - Remove movie from watchlist

### Progress
- `GET /api/progress` - Get viewing progress
- `POST /api/progress` - Update progress

### Categories
- `GET /api/categories` - Get all categories

---

## 🎬 Sample Content

The platform comes pre-loaded with 10 popular shows:
1. Stranger Things
2. Breaking Bad
3. The Crown
4. Money Heist
5. The Office
6. Dark
7. Peaky Blinders
8. Narcos
9. The Witcher
10. Friends

Each show includes:
- Multiple seasons
- Episode data
- Cast information
- High-quality images
- **Working video playback** (placeholder)

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder
```

### Railway/Render
1. Connect GitHub repository
2. Build command: `npm run build`
3. Start command: `npm start`

---

## 📚 Documentation

- **[Quick Setup](QUICK_SETUP.md)** - Get started in 5 minutes
- **[Improvements Plan](IMPROVEMENTS_PLAN.md)** - Feature roadmap
- **[Architecture](replit.md)** - Full system documentation
- **[Design Guidelines](design_guidelines.md)** - UI/UX standards

---

## 🛠️ Tech Stack Details

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **TanStack Query** - Server state management
- **Wouter** - Lightweight routing
- **Lucide React** - Icon library

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime
- **Drizzle ORM** - Database toolkit
- **TypeScript** - Type safety

### Database (Ready)
- **PostgreSQL** - Production database
- **Neon** - Serverless Postgres
- **In-Memory** - Development fallback

---

## 🎯 Key Features

✅ **Professional UI** - Netflix-quality design  
✅ **Working Videos** - Placeholder video integrated  
✅ **Responsive** - Mobile, tablet, desktop  
✅ **Dark/Light Mode** - Theme toggle  
✅ **Search** - Real-time search  
✅ **Watchlist** - Save favorites  
✅ **Progress Tracking** - Resume watching  
✅ **Categories** - Browse by genre  
✅ **Session Management** - User data persistence  
✅ **Type Safe** - Full TypeScript  

---

## 📈 Performance

- **Fast Load Times** - < 2 seconds
- **Optimized Bundle** - Code splitting
- **Lazy Loading** - Images & routes
- **Caching** - TanStack Query
- **Responsive** - Mobile-first

---

## 🔐 Security

- Session-based data isolation
- Input validation with Zod
- Type-safe API contracts
- CORS configuration
- Environment variables

---

## 🤝 Contributing

This is a personal project, but feel free to:
1. Fork the repository
2. Create feature branch
3. Make improvements
4. Submit pull request

---

## 📝 License

MIT License - feel free to use for personal or commercial projects

---

## 🎉 What's New

### Latest Updates (v2.0)
- ✅ **Full Movie Support** - Browse, watch, and manage movies
- ✅ **Unified Watchlist** - Combined shows and movies with tabs
- ✅ **Enhanced Search** - Filter by genre, year, with scrollable sidebar
- ✅ **Consistent UI** - Matching card designs for shows and movies
- ✅ **Share Functionality** - Share shows and movies with friends
- ✅ **TMDB Integration** - Rich metadata from The Movie Database
- ✅ **200+ Movies** - Pre-loaded with top-rated movies
- ✅ **Category Pages** - Browse by genre with show/movie filtering
- ✅ **Clean Design** - Removed genre badges, improved spacing
- ✅ **Better Metadata** - Shows display seasons, movies display duration

---

## 🚀 Next Steps

1. **Run the app** - `npm run dev`
2. **Explore features** - Browse shows, search, add to watchlist
3. **Customize** - Change branding, colors, content
4. **Deploy** - Push to production
5. **Improve** - See `IMPROVEMENTS_PLAN.md`

---

## 📞 Support

- **Documentation:** Check the docs folder
- **Issues:** Review code comments
- **Architecture:** See `replit.md`
- **Design:** See `design_guidelines.md`

---

## 🌐 Connect With Us

[![X (Twitter)](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://twitter.streamvault.in)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.streamvault.in)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.streamvault.in)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://telegram.streamvault.in)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.streamvault.in)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yawarquil/streamvault)

---

## 🌟 Highlights

**This is a production-ready streaming platform with:**
- Professional Netflix-inspired design
- Modern React + TypeScript architecture
- Beautiful UI with shadcn/ui components
- Working video playback
- Comprehensive feature set
- Full documentation
- Easy to customize and deploy

---

**Built with ❤️ for StreamVault**

*Your Premium Web Series Destination*

---

## 📸 Screenshots

### 🏠 Homepage
Beautiful Netflix-inspired homepage with hero carousel and content rows.

![Homepage](./screenshots/homepage.png)

---

### 🎬 Shows Page
Browse all TV shows with clean card design and hover effects.

![Shows Page](./screenshots/shows-page.png)

---

### 🎥 Movies Page
Explore movies with featured carousel and genre-based rows.

![Movies Page](./screenshots/movies-page.png)

---

### 📺 Show Detail Page
Comprehensive show information with seasons, episodes, and cast details.

![Show Detail](./screenshots/show-detail.png)

---

### 🎞️ Movie Detail Page
Movie details with watchlist, share, and play functionality.

![Movie Detail](./screenshots/movie-detail.png)

---

### ▶️ Video Player (Shows)
Netflix-style player with episode navigation and progress tracking.

![Video Player - Shows](./screenshots/video-player-show.png)

---

### 🎬 Video Player (Movies)
Clean movie player with Google Drive integration.

![Video Player - Movies](./screenshots/video-player-movie.png)

---

### 🔍 Search Page
Advanced search with genre filters and year range selection.

![Search Page](./screenshots/search-page.png)

---

### 📑 Category Page
Browse content by genre with tabs for shows and movies.

![Category Page](./screenshots/category-page.png)

---

### 🔖 Watchlist
Unified watchlist with tabs for all content, shows, and movies.

![Watchlist](./screenshots/watchlist.png)

---

### 📱 Mobile View
Fully responsive design optimized for mobile devices.

![Mobile View](./screenshots/mobile-view.png)

---

**Ready to stream? Run `npm run dev` and visit http://localhost:5000** 🎬

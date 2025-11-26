# 🎬 StreamVault - Complete AI Clone Prompt

## Project Overview
Create a **professional Netflix-inspired streaming platform** called **StreamVault** that supports both TV shows and movies with custom video player integration. This is a full-stack TypeScript application with a modern React frontend and Express.js backend. Videos are hosted on **Archive.org** (Internet Archive), a free and reliable platform for hosting media files, and played through a custom-built video player.

---

## Tech Stack Requirements

### Frontend
- **React 18** with TypeScript
- **Vite** as build tool and dev server
- **TailwindCSS** for styling (v3.4+)
- **shadcn/ui** component library (Radix UI primitives)
- **Wouter** for lightweight routing
- **TanStack Query** (React Query) for server state management
- **Lucide React** for icons
- **Framer Motion** for animations
- **next-themes** for dark/light mode
- **Video.js** or **Plyr.js** for custom video player (recommended: Video.js)
- **hls.js** for HLS streaming support (optional)
- **dash.js** for DASH streaming support (optional)

### Backend
- **Node.js 20+** runtime
- **Express.js** web framework
- **TypeScript** throughout
- **Drizzle ORM** for database (PostgreSQL ready)
- **express-session** with memorystore for session management
- **Zod** for validation

### Build & Dev Tools
- **tsx** for running TypeScript
- **esbuild** for production builds
- **cross-env** for environment variables
- **drizzle-kit** for database migrations

---

## Project Structure

```
StreamVault/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── pages/                   # Page components (23 pages)
│   │   │   ├── home.tsx             # Homepage with hero carousel
│   │   │   ├── show-detail.tsx      # Show details with seasons/episodes
│   │   │   ├── movie-detail.tsx     # Movie details page
│   │   │   ├── watch.tsx            # TV show video player
│   │   │   ├── watch-movie.tsx      # Movie video player
│   │   │   ├── search.tsx           # Advanced search with filters
│   │   │   ├── category.tsx         # Browse by genre
│   │   │   ├── browse-shows.tsx     # All TV shows grid
│   │   │   ├── browse-movies.tsx    # All movies grid
│   │   │   ├── movies.tsx           # Movies homepage
│   │   │   ├── watchlist.tsx        # User watchlist (shows + movies)
│   │   │   ├── admin.tsx            # Admin panel (64KB - comprehensive)
│   │   │   ├── admin-login.tsx      # Admin authentication
│   │   │   ├── about.tsx            # About page
│   │   │   ├── contact.tsx          # Contact form
│   │   │   ├── help.tsx             # Help center
│   │   │   ├── faq.tsx              # FAQ page
│   │   │   ├── request.tsx          # Content request form
│   │   │   ├── report.tsx           # Report issues
│   │   │   ├── privacy.tsx          # Privacy policy
│   │   │   ├── terms.tsx            # Terms of service
│   │   │   ├── dmca.tsx             # DMCA policy
│   │   │   └── not-found.tsx        # 404 page
│   │   ├── components/              # Reusable components
│   │   │   ├── header.tsx           # Navigation with search
│   │   │   ├── footer.tsx           # Footer with links
│   │   │   ├── hero-carousel.tsx    # Auto-playing hero slider (shows)
│   │   │   ├── movie-hero-carousel.tsx  # Movie hero carousel
│   │   │   ├── content-row.tsx      # Horizontal scrolling row (shows)
│   │   │   ├── movie-content-row.tsx    # Movie content row
│   │   │   ├── show-card.tsx        # Show card component
│   │   │   ├── movie-card.tsx       # Movie card component
│   │   │   ├── chatbot.tsx          # AI assistant chatbot (586 lines)
│   │   │   ├── ad-placeholder.tsx   # Ad placeholder component
│   │   │   ├── theme-provider.tsx   # Dark/light theme provider
│   │   │   └── ui/                  # shadcn/ui components (50+ components)
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── input.tsx
│   │   │       ├── select.tsx
│   │   │       ├── tabs.tsx
│   │   │       ├── scroll-area.tsx
│   │   │       └── ... (47+ more shadcn components)
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utility functions
│   │   │   └── utils.ts             # cn() helper, etc.
│   │   ├── index.css                # Global styles with CSS variables
│   │   ├── App.tsx                  # Main app component with routing
│   │   └── main.tsx                 # React entry point
│   └── index.html                   # HTML template
├── server/                          # Backend Express API
│   ├── index.ts                     # Server entry point
│   ├── routes.ts                    # API route handlers (1029 lines)
│   ├── storage.ts                   # In-memory data storage layer
│   ├── sitemap.ts                   # Dynamic sitemap generation
│   └── vite.ts                      # Vite SSR integration
├── shared/                          # Shared TypeScript types
│   └── schema.ts                    # Drizzle ORM schema & Zod types
├── scripts/                         # Utility scripts (11 files)
│   ├── add-show-from-tmdb.ts        # Add shows from TMDB API
│   ├── add-movie-from-tmdb.ts       # Add movies from TMDB API
│   ├── add-top-200-movies.ts        # Bulk import top movies
│   ├── update-shows-from-tmdb.ts    # Update show metadata
│   ├── update-images-from-tmdb.ts   # Update poster/backdrop images
│   ├── update-episode-thumbnails.ts # Update episode thumbnails
│   └── ... (5+ more scripts)
├── bulk-imports/                    # JSON data for bulk imports (64 files)
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Vite configuration
├── tailwind.config.ts               # TailwindCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── drizzle.config.ts                # Drizzle ORM configuration
├── components.json                  # shadcn/ui configuration
├── postcss.config.js                # PostCSS configuration
└── README.md                        # Comprehensive documentation
```

---

## Database Schema (Drizzle ORM)

### Shows Table
```typescript
{
  id: varchar (UUID primary key)
  title: text (not null)
  slug: text (unique, not null)
  description: text (not null)
  posterUrl: text (not null)
  backdropUrl: text (not null)
  year: integer (not null)
  rating: text (e.g., "TV-MA", "PG-13")
  imdbRating: text (e.g., "8.5")
  genres: text (comma-separated string)
  language: text (not null)
  totalSeasons: integer (not null)
  cast: text (comma-separated string)
  creators: text (comma-separated string)
  featured: boolean (default false)
  trending: boolean (default false)
  category: text (e.g., "action", "drama")
}
```

### Episodes Table
```typescript
{
  id: varchar (UUID primary key)
  showId: varchar (foreign key to shows)
  season: integer (not null)
  episodeNumber: integer (not null)
  title: text (not null)
  description: text (not null)
  thumbnailUrl: text (not null)
  duration: integer (minutes, not null)
  videoUrl: text (not null) // Primary video source from Archive.org
  archiveIdentifier: text // Archive.org item identifier
  videoSources: text // JSON array of alternative sources/qualities
  subtitles: text // JSON array of subtitle tracks
  airDate: text
}
```

### Movies Table
```typescript
{
  id: varchar (UUID primary key)
  title: text (not null)
  slug: text (unique, not null)
  description: text (not null)
  posterUrl: text (not null)
  backdropUrl: text (not null)
  year: integer (not null)
  rating: text (e.g., "PG-13", "R")
  imdbRating: text (e.g., "8.5")
  genres: text (comma-separated string)
  language: text (not null)
  duration: integer (minutes, not null)
  cast: text (comma-separated string)
  directors: text (comma-separated string)
  videoUrl: text (not null) // Primary video source from Archive.org
  archiveIdentifier: text // Archive.org item identifier
  videoSources: text // JSON array of alternative sources/qualities
  subtitles: text // JSON array of subtitle tracks
  featured: boolean (default false)
  trending: boolean (default false)
  category: text (e.g., "action", "drama")
}
```

### Client-Side Storage (localStorage)
- **Watchlist**: Array of `{ showId?, movieId?, addedAt }`
- **Viewing Progress**: Array of `{ showId, episodeId, season, episodeNumber, progress, lastWatched }`

---

## API Endpoints

### Shows
- `GET /api/shows` - Get all shows
- `GET /api/shows/search?q=query` - Search shows
- `GET /api/shows/:slug` - Get show by slug
- `GET /api/episodes/:showId` - Get episodes for a show

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/search?q=query` - Search movies
- `GET /api/movies/:slug` - Get movie by slug

### Watchlist (Session-based)
- `GET /api/watchlist` - Get user watchlist (shows + movies)
- `POST /api/watchlist` - Add to watchlist (body: `{ showId? | movieId? }`)
- `DELETE /api/watchlist/show/:showId` - Remove show from watchlist
- `DELETE /api/watchlist/movie/:movieId` - Remove movie from watchlist

### Progress (Session-based)
- `GET /api/progress` - Get viewing progress
- `POST /api/progress` - Update progress (body: `{ showId, episodeId, season, episodeNumber, progress }`)

### Categories
- `GET /api/categories` - Get all categories/genres

### Admin (Protected)
- `POST /api/admin/login` - Admin login (username: "admin", password: "streamvault2024")
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/stats` - Get platform statistics
- `POST /api/admin/shows` - Add new show
- `PUT /api/admin/shows/:id` - Update show
- `DELETE /api/admin/shows/:id` - Delete show
- `POST /api/admin/episodes` - Add episode
- `PUT /api/admin/episodes/:id` - Update episode
- `DELETE /api/admin/episodes/:id` - Delete episode
- `POST /api/admin/movies` - Add movie
- `PUT /api/admin/movies/:id` - Update movie
- `DELETE /api/admin/movies/:id` - Delete movie

### SEO
- `GET /sitemap.xml` - Main sitemap index
- `GET /sitemap-shows.xml` - Shows sitemap
- `GET /sitemap-movies.xml` - Movies sitemap
- `GET /sitemap-pages.xml` - Static pages sitemap

---

## Key Features to Implement

### 1. Hero Carousel (Auto-playing)
- 5-second interval auto-play
- Large backdrop images with gradient overlays
- Featured content information overlay
- "Play Now" and "More Info" buttons
- Navigation arrows and indicator dots
- Pause on hover
- Responsive design

### 2. Content Rows (Horizontal Scrolling)
- Smooth scroll behavior
- Hover effects on cards (scale + shadow)
- Left/right navigation arrows
- Lazy loading images
- Separate rows for: Trending, Continue Watching, By Genre
- Support both shows and movies

### 3. Custom Video Player
- Built with HTML5 video element or Video.js/Plyr.js
- Integrated with Archive.org's video streaming API
- Support for Archive.org's multiple quality formats (MP4, OGV, WebM)
- Custom controls overlay with Netflix-style UI
- Progress tracking (save to session)
- Auto-save watch position every 10 seconds
- "Up Next" sidebar for shows
- Auto-play next episode
- Keyboard shortcuts (Space = play/pause, Arrow keys = seek, F = fullscreen)
- Fullscreen support
- Quality selector (if supported by host)
- Volume control with mute
- Playback speed control (0.5x to 2x)
- Picture-in-Picture mode
- Subtitles/CC support (VTT format)
- Loading states and buffering indicators
- Error handling with retry mechanism

### 4. Search Functionality
- Live search in header (instant results dropdown)
- Advanced search page with filters:
  - Genre multi-select
  - Year range slider
  - Content type (shows/movies/all)
  - Sort by (relevance, year, rating)
- Scrollable sidebar with filters
- Real-time results update

### 5. Chatbot Assistant
- Floating chat button (bottom-right)
- Intelligent responses for:
  - Finding shows/movies by genre
  - Playing specific episodes (e.g., "Stranger Things s1e1")
  - Browsing categories
  - Trending content
  - Fixing playback issues
- Clickable show/movie links in responses
- Suggestion chips
- Type-based icons (🎬 for movies, 📺 for shows)
- Support for episode links with query params

### 6. Admin Panel (Comprehensive)
- Dashboard with statistics:
  - Total shows, movies, episodes
  - Storage usage
  - Recent activity
- Content management:
  - Add/Edit/Delete shows
  - Add/Edit/Delete movies
  - Add/Edit/Delete episodes
  - Bulk operations
- TMDB integration:
  - Search and import from TMDB
  - Auto-fetch metadata
  - Update posters/backdrops
- User management (future)
- Analytics (future)

### 7. Watchlist
- Unified watchlist for shows and movies
- Tabs: All, Shows, Movies
- Add/remove functionality
- Session-based storage
- Visual indicators on cards
- Quick access from header

### 8. Theme System
- Dark mode (default)
- Light mode
- System preference detection
- Smooth transitions
- CSS variables for all colors
- Persistent preference (localStorage)

### 9. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface
- Hamburger menu on mobile
- Optimized layouts for all screen sizes

### 10. SEO Optimization
- Dynamic sitemaps (shows, movies, pages)
- Meta tags for all pages
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Semantic HTML
- Fast loading times

---

## Styling Guidelines

### Color Scheme (Dark Mode)
```css
--background: 0 0% 8%;           /* Dark gray background */
--foreground: 0 0% 98%;          /* White text */
--accent: 0 91% 47%;             /* Netflix red (#E50914) */
--card: 0 0% 12%;                /* Card background */
--border: 0 0% 20%;              /* Borders */
--muted: 0 0% 25%;               /* Muted elements */
```

### Typography
- **Font Family**: Inter, Helvetica Neue, sans-serif
- **Headings**: Bold, larger sizes
- **Body**: Regular weight, 14-16px
- **Small Text**: 12-14px for metadata

### Component Patterns
- **Cards**: Rounded corners (0.375rem), hover scale (1.05), shadow on hover
- **Buttons**: Primary (red accent), Secondary (gray), Ghost (transparent)
- **Inputs**: Dark background, light border, focus ring
- **Modals**: Backdrop blur, centered, smooth animations

### Animations
- **Transitions**: 200-300ms ease-in-out
- **Hover Effects**: Scale, shadow, opacity changes
- **Page Transitions**: Fade in/out
- **Skeleton Loaders**: Pulse animation while loading

---

## Sample Data Structure

### Sample Show
```typescript
{
  id: "1",
  title: "Stranger Things",
  slug: "stranger-things",
  description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
  posterUrl: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
  backdropUrl: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
  year: 2016,
  rating: "TV-14",
  imdbRating: "8.7",
  genres: "Sci-Fi, Horror, Drama",
  language: "English",
  totalSeasons: 4,
  cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder",
  creators: "The Duffer Brothers",
  featured: true,
  trending: true,
  category: "sci-fi"
}
```

### Sample Episode
```typescript
{
  id: "ep1",
  showId: "1",
  season: 1,
  episodeNumber: 1,
  title: "Chapter One: The Vanishing of Will Byers",
  description: "On his way home from a friend's house, young Will sees something terrifying.",
  thumbnailUrl: "https://image.tmdb.org/t/p/w500/episodeThumbnail.jpg",
  duration: 48,
  videoUrl: "https://archive.org/download/stranger-things-s1e1/stranger-things-s1e1.mp4",
  archiveIdentifier: "stranger-things-s1e1",
  videoSources: JSON.stringify([
    { format: "mp4", quality: "1080p", url: "https://archive.org/download/stranger-things-s1e1/stranger-things-s1e1.mp4" },
    { format: "mp4", quality: "720p", url: "https://archive.org/download/stranger-things-s1e1/stranger-things-s1e1_720p.mp4" },
    { format: "mp4", quality: "480p", url: "https://archive.org/download/stranger-things-s1e1/stranger-things-s1e1_480p.mp4" }
  ]),
  subtitles: JSON.stringify([
    { language: "en", label: "English", url: "/subtitles/st-s1e1-en.vtt" }
  ]),
  airDate: "2016-07-15"
}
```

### Sample Movie
```typescript
{
  id: "m1",
  title: "The Shawshank Redemption",
  slug: "the-shawshank-redemption",
  description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  backdropUrl: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
  year: 1994,
  rating: "R",
  imdbRating: "9.3",
  genres: "Drama, Crime",
  language: "English",
  duration: 142,
  cast: "Tim Robbins, Morgan Freeman",
  directors: "Frank Darabont",
  videoUrl: "https://archive.org/download/shawshank-redemption-1994/shawshank-redemption.mp4",
  archiveIdentifier: "shawshank-redemption-1994",
  videoSources: JSON.stringify([
    { format: "mp4", quality: "1080p", url: "https://archive.org/download/shawshank-redemption-1994/shawshank-redemption.mp4" },
    { format: "mp4", quality: "720p", url: "https://archive.org/download/shawshank-redemption-1994/shawshank-redemption_720p.mp4" },
    { format: "mp4", quality: "480p", url: "https://archive.org/download/shawshank-redemption-1994/shawshank-redemption_480p.mp4" }
  ]),
  subtitles: JSON.stringify([
    { language: "en", label: "English", url: "/subtitles/shawshank-en.vtt" }
  ]),
  featured: true,
  trending: false,
  category: "drama"
}
```

---

## Package.json Scripts

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "cross-env NODE_ENV=production node dist/index.js",
    "vercel-build": "vite build",
    "check": "tsc",
    "db:push": "drizzle-kit push",
    "update-shows": "tsx scripts/update-shows-from-tmdb.ts",
    "update-images": "tsx scripts/update-images-from-tmdb.ts",
    "update-episodes": "tsx scripts/update-episode-thumbnails.ts",
    "add-show": "tsx scripts/add-show-from-tmdb.ts",
    "add-movie": "tsx scripts/add-movie-from-tmdb.ts",
    "add-top-movies": "tsx scripts/add-top-200-movies.ts"
  }
}
```

---

## Environment Variables

Create `.env` file:
```env
# Database (Optional - uses in-memory by default)
DATABASE_URL=postgresql://user:password@host:5432/streamvault

# Server
NODE_ENV=development
PORT=5000

# TMDB API (for metadata fetching)
TMDB_API_KEY=your_tmdb_api_key_here

# Archive.org API (for video hosting)
# Get credentials from: https://archive.org/account/s3.php
ARCHIVE_ACCESS_KEY=your_archive_access_key
ARCHIVE_SECRET_KEY=your_archive_secret_key

# Admin Credentials (change in production)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=streamvault2024
```

---

## Vite Configuration

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          'router': ['wouter'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'query': ['@tanstack/react-query'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

---

## TailwindCSS Configuration

```typescript
export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        // ... more colors
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
```

---

## Implementation Steps

### Phase 1: Project Setup
1. Initialize Node.js project with TypeScript
2. Install all dependencies (React, Express, Vite, TailwindCSS, etc.)
3. Setup project structure (client, server, shared folders)
4. Configure Vite, TypeScript, TailwindCSS
5. Setup shadcn/ui with components.json

### Phase 2: Database & Schema
1. Create Drizzle schema (shows, episodes, movies tables)
2. Setup in-memory storage layer
3. Create sample data (10 shows, 200+ movies)
4. Implement CRUD operations

### Phase 3: Backend API
1. Setup Express server with TypeScript
2. Implement all API routes (shows, movies, episodes, watchlist, progress)
3. Add session management
4. Create admin authentication
5. Setup sitemap generation

### Phase 4: Frontend Core
1. Create App.tsx with routing (Wouter)
2. Setup TanStack Query provider
3. Create theme provider (dark/light mode)
4. Build header with navigation and search
5. Build footer with links

### Phase 5: UI Components
1. Install and configure all shadcn/ui components
2. Create show-card and movie-card components
3. Build hero-carousel with auto-play
4. Create content-row with horizontal scroll
5. Implement theme toggle

### Phase 6: Pages
1. **Home page**: Hero carousel + content rows
2. **Show detail**: Seasons, episodes, cast, metadata
3. **Movie detail**: Movie info, cast, metadata
4. **Watch page**: Video player for shows
5. **Watch movie page**: Video player for movies
6. **Search page**: Advanced search with filters
7. **Category page**: Browse by genre
8. **Browse shows/movies**: Grid view of all content
9. **Watchlist page**: User's saved content
10. **Admin panel**: Full content management
11. **Static pages**: About, Contact, Help, FAQ, Privacy, Terms, DMCA

### Phase 7: Advanced Features
1. Implement chatbot with intelligent responses
2. Add viewing progress tracking
3. Create watchlist functionality
4. Build admin panel with TMDB integration
5. Add SEO optimization (meta tags, sitemaps)

### Phase 8: Polish
1. Add loading states and skeletons
2. Implement error handling
3. Add animations and transitions
4. Optimize images (lazy loading)
5. Test responsive design
6. Performance optimization

### Phase 9: Scripts & Tools
1. Create TMDB import scripts
2. Build bulk import tools
3. Add metadata update scripts
4. Create deployment scripts

### Phase 10: Documentation
1. Write comprehensive README.md
2. Create QUICK_SETUP.md
3. Document API endpoints
4. Add deployment guides
5. Create admin guide

---

## Critical Implementation Details

### Custom Video Player Implementation
```typescript
// Video player component using Video.js or custom HTML5
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Initialize player
const player = videojs('video-player', {
  controls: true,
  autoplay: false,
  preload: 'auto',
  fluid: true,
  sources: [
    {
      src: videoUrl,
      type: 'video/mp4'
    },
    // Alternative sources for fallback
    ...alternativeSources
  ],
  tracks: [
    {
      kind: 'subtitles',
      src: subtitleUrl,
      srclang: 'en',
      label: 'English'
    }
  ]
});

// Custom controls overlay
<div className="custom-controls">
  <button onClick={togglePlay}>Play/Pause</button>
  <input type="range" onChange={handleSeek} />
  <button onClick={toggleFullscreen}>Fullscreen</button>
  <select onChange={changeQuality}>Quality</select>
</div>
```

### Archive.org Video Hosting

**Why Archive.org?**
- ✅ **100% Free** - No storage limits or bandwidth costs
- ✅ **Reliable** - Non-profit organization with 25+ years of uptime
- ✅ **Fast CDN** - Global content delivery network
- ✅ **Multiple Formats** - Automatic transcoding to MP4, OGV, WebM
- ✅ **Multiple Qualities** - 240p, 360p, 480p, 720p, 1080p
- ✅ **Direct Links** - No ads or redirects
- ✅ **Permanent Storage** - Files never expire
- ✅ **API Access** - Full metadata and streaming API

**Archive.org Features:**
1. Upload videos via web interface or API
2. Automatic video transcoding to multiple formats
3. Thumbnail generation
4. Metadata management (title, description, tags)
5. Collections and organization
6. Public or unlisted visibility options

### Archive.org Video URL Structure
```typescript
// Archive.org provides multiple format URLs automatically
interface ArchiveVideoSource {
  format: 'mp4' | 'ogv' | 'webm';
  quality: '240p' | '360p' | '480p' | '720p' | '1080p' | 'original';
  url: string;
  size: number; // File size in bytes
}

// Archive.org video metadata
interface ArchiveVideo {
  identifier: string; // Archive.org item identifier
  title: string;
  description: string;
  files: ArchiveVideoSource[];
}

// Episode/Movie with Archive.org hosting
{
  videoUrl: "https://archive.org/download/stranger-things-s1e1/stranger-things-s1e1.mp4",
  archiveIdentifier: "stranger-things-s1e1", // Archive.org item ID
  videoSources: JSON.stringify([
    {
      format: "mp4",
      quality: "1080p",
      url: "https://archive.org/download/stranger-things-s1e1/stranger-things-s1e1.mp4",
      size: 1500000000
    },
    {
      format: "mp4",
      quality: "720p",
      url: "https://archive.org/download/stranger-things-s1e1/stranger-things-s1e1_720p.mp4",
      size: 800000000
    },
    {
      format: "mp4",
      quality: "480p",
      url: "https://archive.org/download/stranger-things-s1e1/stranger-things-s1e1_480p.mp4",
      size: 400000000
    }
  ])
}

// Fetch video metadata from Archive.org API
const fetchArchiveMetadata = async (identifier: string) => {
  const response = await fetch(`https://archive.org/metadata/${identifier}`);
  const data = await response.json();
  
  // Extract video files
  const videoFiles = data.files.filter(f => 
    f.format === 'MPEG4' || f.format === 'h.264'
  );
  
  return videoFiles;
};
```

### Uploading Videos to Archive.org

#### Method 1: Web Interface (Manual)
1. Go to https://archive.org/create
2. Sign in or create a free account
3. Click "Upload Files"
4. Fill in metadata:
   - **Title**: "Show Name - S01E01 - Episode Title"
   - **Description**: Episode or movie description
   - **Subject Tags**: genre, show name, season
   - **Collection**: Choose "Community Video" or create custom collection
5. Upload video file (supports MP4, AVI, MOV, etc.)
6. Archive.org automatically transcodes to multiple formats
7. Get the identifier from the URL: `https://archive.org/details/[identifier]`

#### Method 2: API Upload (Automated)
```typescript
// Upload video to Archive.org via API
import FormData from 'form-data';
import fs from 'fs';

const uploadToArchive = async (
  videoPath: string,
  metadata: {
    identifier: string; // Unique ID (e.g., "stranger-things-s1e1")
    title: string;
    description: string;
    subject: string[]; // Tags
    collection: string; // e.g., "opensource_movies"
  },
  credentials: {
    accessKey: string;
    secretKey: string;
  }
) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(videoPath));
  
  // Add metadata headers
  const headers = {
    'authorization': `LOW ${credentials.accessKey}:${credentials.secretKey}`,
    'x-archive-meta-title': metadata.title,
    'x-archive-meta-description': metadata.description,
    'x-archive-meta-subject': metadata.subject.join(';'),
    'x-archive-meta-collection': metadata.collection,
    'x-archive-meta-mediatype': 'movies',
  };
  
  const response = await fetch(
    `https://s3.us.archive.org/${metadata.identifier}/${path.basename(videoPath)}`,
    {
      method: 'PUT',
      headers,
      body: fs.createReadStream(videoPath)
    }
  );
  
  return {
    identifier: metadata.identifier,
    url: `https://archive.org/download/${metadata.identifier}/${path.basename(videoPath)}`
  };
};

// Example usage
const result = await uploadToArchive(
  './videos/stranger-things-s1e1.mp4',
  {
    identifier: 'stranger-things-s1e1',
    title: 'Stranger Things - S01E01 - The Vanishing of Will Byers',
    description: 'First episode of Stranger Things Season 1',
    subject: ['sci-fi', 'horror', 'stranger-things', 'season-1'],
    collection: 'opensource_movies'
  },
  {
    accessKey: process.env.ARCHIVE_ACCESS_KEY!,
    secretKey: process.env.ARCHIVE_SECRET_KEY!
  }
);
```

#### Method 3: Bulk Upload Script
```typescript
// Bulk upload script for multiple episodes
import { glob } from 'glob';

const bulkUploadEpisodes = async (showName: string, season: number) => {
  const videoFiles = await glob(`./videos/${showName}/season-${season}/*.mp4`);
  
  for (const videoPath of videoFiles) {
    const episodeMatch = path.basename(videoPath).match(/e(\d+)/i);
    const episodeNumber = episodeMatch ? parseInt(episodeMatch[1]) : 0;
    
    const identifier = `${showName.toLowerCase()}-s${season}e${episodeNumber}`;
    
    await uploadToArchive(videoPath, {
      identifier,
      title: `${showName} - S${season.toString().padStart(2, '0')}E${episodeNumber.toString().padStart(2, '0')}`,
      description: `Episode ${episodeNumber} of ${showName} Season ${season}`,
      subject: [showName.toLowerCase(), `season-${season}`, 'tv-show'],
      collection: 'opensource_movies'
    }, credentials);
    
    console.log(`✅ Uploaded: ${identifier}`);
    
    // Wait 5 seconds between uploads to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
};
```

### Archive.org API Integration in Admin Panel

```typescript
// Admin panel: Search Archive.org for existing videos
const searchArchiveVideos = async (query: string) => {
  const response = await fetch(
    `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl[]=identifier,title,description&output=json`
  );
  const data = await response.json();
  return data.response.docs;
};

// Admin panel: Import video from Archive.org
const importFromArchive = async (identifier: string) => {
  // Fetch metadata
  const metadata = await fetchArchiveMetadata(identifier);
  
  // Get video files
  const videoFiles = metadata.files.filter(f => 
    f.name.endsWith('.mp4') || f.name.endsWith('.ogv')
  );
  
  // Create episode/movie entry
  const episode = {
    title: metadata.metadata.title,
    description: metadata.metadata.description,
    videoUrl: `https://archive.org/download/${identifier}/${videoFiles[0].name}`,
    archiveIdentifier: identifier,
    videoSources: JSON.stringify(
      videoFiles.map(f => ({
        format: f.format,
        quality: f.name.includes('1080p') ? '1080p' : 
                 f.name.includes('720p') ? '720p' : 
                 f.name.includes('480p') ? '480p' : 'original',
        url: `https://archive.org/download/${identifier}/${f.name}`,
        size: f.size
      }))
    )
  };
  
  return episode;
};
```

### Video Player Features Implementation

#### 1. **Multi-Source Support with Fallback**
```typescript
// Automatically switch to alternative source if primary fails
const handleVideoError = () => {
  const currentSourceIndex = sources.findIndex(s => s.url === currentSource);
  if (currentSourceIndex < sources.length - 1) {
    setCurrentSource(sources[currentSourceIndex + 1].url);
    toast.info(`Switching to alternative source...`);
  } else {
    toast.error('All video sources failed. Please try again later.');
  }
};
```

#### 2. **Quality Selector**
```typescript
// Allow users to switch between quality options
const qualities = ['360p', '480p', '720p', '1080p'];
const handleQualityChange = (quality: string) => {
  const source = videoSources.find(s => s.quality === quality);
  if (source) {
    const currentTime = player.currentTime();
    player.src({ src: source.url, type: 'video/mp4' });
    player.currentTime(currentTime); // Resume from same position
    player.play();
  }
};
```

#### 3. **Subtitle/Caption Support**
```typescript
// Load VTT subtitle files
const subtitleTracks = [
  { src: '/subtitles/en.vtt', srclang: 'en', label: 'English' },
  { src: '/subtitles/es.vtt', srclang: 'es', label: 'Spanish' },
  { src: '/subtitles/fr.vtt', srclang: 'fr', label: 'French' }
];

player.addRemoteTextTrack({
  kind: 'subtitles',
  src: subtitleTracks[0].src,
  srclang: subtitleTracks[0].srclang,
  label: subtitleTracks[0].label
}, false);
```

#### 4. **Custom Controls Overlay**
```typescript
// Netflix-style custom controls
<div className="video-controls">
  <div className="progress-bar">
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={progress}
      onChange={handleSeek}
    />
  </div>
  <div className="control-buttons">
    <button onClick={togglePlay}>
      {isPlaying ? <Pause /> : <Play />}
    </button>
    <button onClick={skipBackward}>
      <SkipBack /> 10s
    </button>
    <button onClick={skipForward}>
      <SkipForward /> 10s
    </button>
    <div className="volume-control">
      <button onClick={toggleMute}>
        {isMuted ? <VolumeX /> : <Volume2 />}
      </button>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
    <select onChange={handleSpeedChange}>
      <option value="0.5">0.5x</option>
      <option value="1" selected>1x</option>
      <option value="1.5">1.5x</option>
      <option value="2">2x</option>
    </select>
    <button onClick={toggleSubtitles}>CC</button>
    <button onClick={togglePiP}>PiP</button>
    <button onClick={toggleFullscreen}>
      {isFullscreen ? <Minimize /> : <Maximize />}
    </button>
  </div>
</div>
```

#### 5. **Keyboard Shortcuts**
```typescript
// Implement keyboard controls
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    switch(e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowLeft':
        player.currentTime(player.currentTime() - 10);
        break;
      case 'ArrowRight':
        player.currentTime(player.currentTime() + 10);
        break;
      case 'ArrowUp':
        player.volume(Math.min(player.volume() + 0.1, 1));
        break;
      case 'ArrowDown':
        player.volume(Math.max(player.volume() - 0.1, 0));
        break;
      case 'f':
        toggleFullscreen();
        break;
      case 'm':
        toggleMute();
        break;
      case 'c':
        toggleSubtitles();
        break;
    }
  };
  
  document.addEventListener('keydown', handleKeyPress);
  return () => document.removeEventListener('keydown', handleKeyPress);
}, []);
```

#### 6. **Auto-Play Next Episode**
```typescript
// Automatically play next episode when current ends
player.on('ended', () => {
  if (nextEpisode) {
    // Show countdown overlay
    setShowNextEpisodeCountdown(true);
    
    const countdown = setTimeout(() => {
      navigate(`/watch/${showSlug}?season=${nextEpisode.season}&episode=${nextEpisode.episodeNumber}`);
    }, 10000); // 10 second countdown
    
    // Allow user to cancel
    setCountdownTimer(countdown);
  }
});
```

#### 7. **Loading & Buffering States**
```typescript
// Show loading spinner during buffering
player.on('waiting', () => {
  setIsBuffering(true);
});

player.on('canplay', () => {
  setIsBuffering(false);
});

// Display buffering indicator
{isBuffering && (
  <div className="buffering-overlay">
    <Loader2 className="animate-spin" size={48} />
    <p>Buffering...</p>
  </div>
)}
```

### Progress Tracking
```typescript
// Save progress every 10 seconds
useEffect(() => {
  const interval = setInterval(() => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      saveProgress({ showId, episodeId, progress });
    }
  }, 10000);
  return () => clearInterval(interval);
}, []);
```

### Session Management
```typescript
// Express session setup
app.use(session({
  secret: 'streamvault-secret-key',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // 24 hours
  }),
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}));
```

### TMDB Integration
```typescript
// Fetch show metadata from TMDB
const response = await fetch(
  `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${TMDB_API_KEY}`
);
const data = await response.json();
```

### Responsive Hero Carousel
```typescript
// Auto-play with 5-second interval
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000);
  return () => clearInterval(timer);
}, [slides.length]);
```

---

## Performance Optimizations

1. **Code Splitting**: Manual chunks for React, router, UI, query
2. **Lazy Loading**: Images with loading="lazy"
3. **Caching**: TanStack Query with staleTime
4. **Minification**: Terser with console.log removal
5. **Bundle Size**: Chunk size warnings at 1000KB
6. **Tree Shaking**: ES modules throughout
7. **CDN**: Use TMDB image CDN for posters/backdrops

---

## Deployment Configurations

### Vercel (vercel.json)
```json
{
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "dist/public",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Railway (railway.json)
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

## Testing Checklist

- [ ] Homepage loads with hero carousel
- [ ] Shows and movies display correctly
- [ ] Search functionality works (header + advanced)
- [ ] Video player plays content
- [ ] Progress tracking saves and resumes
- [ ] Watchlist add/remove works
- [ ] Admin panel authentication
- [ ] Admin CRUD operations
- [ ] Chatbot responds intelligently
- [ ] Theme toggle works
- [ ] Responsive on mobile/tablet/desktop
- [ ] SEO meta tags present
- [ ] Sitemaps generate correctly
- [ ] All pages accessible
- [ ] No console errors
- [ ] Fast loading times (<2s)

---

## Additional Features Implemented

1. **Ad Placeholder Component**: For future monetization
2. **Share Functionality**: Share shows/movies via URL
3. **Continue Watching**: Resume from last position
4. **Trending Section**: Popular content
5. **Featured Content**: Highlighted in carousel
6. **Category Filtering**: Browse by genre
7. **Year Range Filter**: Search by release year
8. **Multi-language Support**: Ready for i18n
9. **Keyboard Shortcuts**: Video player controls
10. **Touch Gestures**: Mobile-friendly interactions

---

## Documentation Files to Create

1. **README.md** (516 lines) - Complete project overview
2. **START_HERE.md** (351 lines) - Quick start guide
3. **QUICK_SETUP.md** - 5-minute setup
4. **ADMIN_GUIDE.md** - Admin panel documentation
5. **CHATBOT_FEATURES.md** - Chatbot capabilities
6. **DEPLOYMENT.md** - Deployment instructions
7. **SEO_GUIDE.md** - SEO best practices
8. **PERFORMANCE_OPTIMIZATIONS.md** - Performance tips
9. **WATCHLIST_FEATURE.md** - Watchlist documentation
10. **METADATA_ENRICHMENT.md** - TMDB integration guide

---

## Final Notes

This is a **production-ready streaming platform** with:
- ✅ Professional Netflix-quality UI/UX
- ✅ Full TypeScript type safety
- ✅ Custom video player with advanced features (Video.js/Plyr.js)
- ✅ Multi-source video support with automatic fallback
- ✅ Archive.org integration for free, reliable video hosting
- ✅ Quality selector and playback speed control
- ✅ Subtitle/CC support (VTT format)
- ✅ Picture-in-Picture mode
- ✅ Comprehensive keyboard shortcuts
- ✅ Comprehensive admin panel
- ✅ TMDB integration for metadata
- ✅ Session-based user data
- ✅ SEO optimized
- ✅ Fully responsive
- ✅ Dark/light themes
- ✅ 200+ movies and 10+ shows pre-loaded
- ✅ Intelligent chatbot assistant
- ✅ Advanced search and filtering
- ✅ Complete documentation

**Total Lines of Code**: ~15,000+ lines
**Total Components**: 60+ React components
**Total Pages**: 23 pages
**Total API Endpoints**: 30+ endpoints
**Total Scripts**: 11 utility scripts
**Video Player Features**: 15+ advanced features

This platform is ready to deploy and can handle real users with Archive.org's free, reliable video hosting. The custom video player provides a professional viewing experience with automatic quality selection based on Archive.org's transcoded formats, subtitles, and all modern playback features. Archive.org provides unlimited storage and bandwidth at no cost, making it ideal for a streaming platform.

import { useQuery } from "@tanstack/react-query";
import { HeroCarousel } from "@/components/hero-carousel";
import { ContentRow } from "@/components/content-row";
import { Skeleton } from "@/components/ui/skeleton";
import { AdPlaceholder } from "@/components/ad-placeholder";
import type { Show, ViewingProgress } from "@shared/schema";
import { useMemo } from "react";

export default function Home() {
  const { data: shows, isLoading } = useQuery<Show[]>({
    queryKey: ["/api/shows"],
  });

  const { data: progressData = [] } = useQuery<ViewingProgress[]>({
    queryKey: ["/api/progress"],
  });

  const { continueWatching, progressMap } = useMemo(() => {
    if (!shows || !progressData.length) {
      return { continueWatching: [], progressMap: new Map<string, number>() };
    }

    const progressShows = progressData
      .map((progress) => {
        const show = shows.find((s) => s.id === progress.showId);
        return show ? { show, progress: progress.progress, lastWatched: progress.lastWatched } : null;
      })
      .filter((item): item is { show: Show; progress: number; lastWatched: string } => item !== null)
      .sort(
        (a, b) =>
          new Date(b.lastWatched).getTime() -
          new Date(a.lastWatched).getTime()
      );

    return {
      continueWatching: progressShows.map((item) => item.show),
      progressMap: new Map(progressShows.map((item) => [item.show.id, item.progress])),
    };
  }, [shows, progressData]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="w-full h-[70vh]" />
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-48 aspect-[2/3] flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const featured = shows?.filter((show) => show.featured) || [];
  const trending = shows?.filter((show) => show.trending) || [];
  const action = shows?.filter((show) => show.genres.includes("Action")) || [];
  const drama = shows?.filter((show) => show.genres.includes("Drama")) || [];
  const comedy = shows?.filter((show) => show.genres.includes("Comedy")) || [];
  const horror = shows?.filter((show) => show.genres.includes("Horror")) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      {featured.length > 0 && <HeroCarousel shows={featured} />}

      {/* SEO Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Watch Free Movies Online & Stream TV Shows Instantly
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Best free streaming movies website with HD quality. Watch Game of Thrones, The Boys, and latest web series online free. No subscription required.
          </p>
          <p className="text-sm text-muted-foreground">
            Stream thousands of movies and TV shows online free in HD. Watch popular series like Game of Thrones, The Witcher, Breaking Bad, and more without ads or subscription.
          </p>
        </div>
        <AdPlaceholder type="leaderboard" />
      </div>

      {/* Content Rows */}
      <div className="container mx-auto py-8 space-y-12">
        {trending.length > 0 && (
          <ContentRow
            title="🔥 Trending Web Series & Movies to Watch Online Free"
            shows={trending}
            orientation="landscape"
          />
        )}

        {continueWatching.length > 0 && (
          <ContentRow
            title="Continue Watching Your Favorite Shows"
            shows={continueWatching}
            orientation="landscape"
            showProgress={progressMap}
          />
        )}

        {action.length > 0 && (
          <ContentRow title="Watch Action Movies & Thriller Series Online" shows={action} />
        )}

        {drama.length > 0 && <ContentRow title="Stream Drama & Romance Series Free" shows={drama} />}

        {/* Sidebar Ad - In-feed placement */}
        <div className="px-4 md:px-6">
          <AdPlaceholder type="rectangle" />
        </div>

        {comedy.length > 0 && <ContentRow title="Watch Comedy Shows & Movies Online Free" shows={comedy} />}

        {horror.length > 0 && (
          <ContentRow title="Stream Horror & Mystery Series in HD" shows={horror} />
        )}

        {shows && shows.length > 0 && (
          <ContentRow
            title="Latest Movies & Web Series Added - Watch Now"
            shows={shows.slice(0, 12)}
            orientation="landscape"
          />
        )}
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { HeroCarousel } from "@/components/hero-carousel";
import { ContentRow } from "@/components/content-row";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/seo";
import type { Show, Movie, ViewingProgress } from "@shared/schema";
import { useMemo } from "react";
import { NativeBanner, Banner300x250, Banner468x60, SmartlinkCard, SmartlinkWinPromo, SmartlinkPremiumBanner, SmartlinkReferral } from "@/components/AdsterraAds";

export default function Home() {
  const { data: shows, isLoading: showsLoading } = useQuery<Show[]>({
    queryKey: ["/api/shows"],
  });

  const { data: movies, isLoading: moviesLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  const isLoading = showsLoading || moviesLoading;

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

  // Combine shows and movies
  const allContent: (Show | Movie)[] = [...(shows || []), ...(movies || [])];

  const featured = allContent.filter((item) => item.featured) || [];
  const trending = allContent.filter((item) => item.trending) || [];
  const action = allContent.filter((item) => item.genres?.toLowerCase().includes("action")) || [];
  const drama = allContent.filter((item) => item.genres?.toLowerCase().includes("drama")) || [];
  const comedy = allContent.filter((item) => item.genres?.toLowerCase().includes("comedy")) || [];
  const horror = allContent.filter((item) => item.genres?.toLowerCase().includes("horror")) || [];

  return (
    <div className="min-h-screen">
      <SEO
        title="Free Movies Online | Watch TV Shows Free | HD Streaming"
        description="Watch 200+ movies & TV shows free in HD. No registration required. Stream Hollywood, Bollywood & international content instantly on any device."
        canonical="https://streamvault.live"
      />

      {/* Hero Carousel */}
      {featured.length > 0 && <HeroCarousel shows={featured} />}

      {/* Content Rows */}
      <div className="container mx-auto py-8 space-y-12">
        {/* Native Ad after Hero */}
        <NativeBanner />

        {trending.length > 0 && (
          <ContentRow
            title="Trending Now"
            shows={trending}
            orientation="landscape"
          />
        )}

        {/* Ad after Trending */}
        <div className="flex justify-center">
          <Banner300x250 />
        </div>

        {continueWatching.length > 0 && (
          <ContentRow
            title="Continue Watching"
            shows={continueWatching}
            orientation="landscape"
            showProgress={progressMap}
          />
        )}

        {action.length > 0 && (
          <ContentRow title="Action & Thriller" shows={action} />
        )}

        {/* Mid-page Ad */}
        <Banner468x60 />

        {drama.length > 0 && <ContentRow title="Drama & Romance" shows={drama} />}

        {comedy.length > 0 && <ContentRow title="Comedy" shows={comedy} />}

        {/* Native Ad */}
        <NativeBanner />

        {horror.length > 0 && (
          <ContentRow title="Horror & Mystery" shows={horror} />
        )}

        {/* Win Promo - High visibility */}
        <div className="max-w-lg mx-auto">
          <SmartlinkWinPromo />
        </div>

        {allContent.length > 0 && (
          <ContentRow
            title="Recently Added"
            shows={allContent.slice(0, 12)}
            orientation="landscape"
          />
        )}

        {/* Premium Banner - Full width */}
        <SmartlinkPremiumBanner />

        {/* Referral and Special Offer side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <SmartlinkReferral />
          <SmartlinkCard />
        </div>

        {/* Bottom Ad */}
        <Banner300x250 />
      </div>
    </div>
  );
}

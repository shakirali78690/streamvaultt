import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentsSection } from "@/components/comments-section";
import type { Movie } from "@shared/schema";

export default function WatchMovie() {
  const [, params] = useRoute("/watch-movie/:slug");
  const slug = params?.slug;

  const { data: movie } = useQuery<Movie>({
    queryKey: [`/api/movies/${slug}`],
    enabled: !!slug,
  });

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="w-full max-w-5xl aspect-video" />
      </div>
    );
  }

  const extractDriveId = (url: string) => {
    const match = url.match(/\/d\/([^/]+)/);
    return match ? match[1] : null;
  };

  const driveId = extractDriveId(movie.googleDriveUrl);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link href={`/movie/${slug}`}>
          <Button
            variant="ghost"
            className="mb-4 gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to {movie.title}
          </Button>
        </Link>

        <div className="grid grid-cols-1 gap-6">
          {/* Video Player */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video bg-black">
              {driveId ? (
                <iframe
                  src={`https://drive.google.com/file/d/${driveId}/preview?autoplay=0&controls=1&modestbranding=1`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={movie.title}
                  style={{ border: 'none' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p>Invalid video URL</p>
                </div>
              )}
            </div>

            {/* Movie Info Below Player */}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
              <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.duration} min</span>
                <span>•</span>
                <span>{movie.rating}</span>
                {movie.imdbRating && (
                  <>
                    <span>•</span>
                    <span>⭐ {movie.imdbRating}</span>
                  </>
                )}
              </div>
              <p className="text-muted-foreground">{movie.description}</p>
              
              {/* Comments Section */}
              <div className="mt-8">
                <CommentsSection movieId={movie.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

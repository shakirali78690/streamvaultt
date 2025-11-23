import { Card, CardContent } from "@/components/ui/card";
import { Film } from "lucide-react";

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Movies</h1>
          <p className="text-gray-400">Browse our collection of movies</p>
        </div>

        {/* Empty State */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-gray-700/50 p-6 mb-6">
              <Film className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-200">
              No Movies Available Yet
            </h2>
            <p className="text-gray-400 text-center max-w-md">
              We're working on adding movies to our collection. Check back soon for exciting new content!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

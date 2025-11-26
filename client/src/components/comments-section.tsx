import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import type { Comment } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface CommentsSectionProps {
  episodeId?: string;
  movieId?: string;
}

export function CommentsSection({ episodeId, movieId }: CommentsSectionProps) {
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  // Load saved username from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("streamvault_username");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Fetch comments
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: episodeId 
      ? [`/api/comments/episode/${episodeId}`]
      : [`/api/comments/movie/${movieId}`],
    enabled: !!(episodeId || movieId),
  });

  // Post comment mutation
  const postComment = useMutation({
    mutationFn: async (data: { userName: string; comment: string }) => {
      console.log("Posting comment:", { episodeId, movieId, userName: data.userName, comment: data.comment });
      
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          episodeId,
          movieId,
          userName: data.userName,
          comment: data.comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Failed to post comment:", response.status, errorData);
        throw new Error(`Failed to post comment: ${response.status}`);
      }

      const result = await response.json();
      console.log("Comment posted successfully:", result);
      return result;
    },
    onSuccess: () => {
      console.log("Comment posted, refreshing list...");
      // Refresh comments
      queryClient.invalidateQueries({
        queryKey: episodeId 
          ? [`/api/comments/episode/${episodeId}`]
          : [`/api/comments/movie/${movieId}`],
      });
      // Clear comment field
      setComment("");
      // Save username to localStorage
      localStorage.setItem("streamvault_username", userName);
    },
    onError: (error) => {
      console.error("Error posting comment:", error);
      alert(`Failed to post comment: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;
    
    postComment.mutate({ userName: userName.trim(), comment: comment.trim() });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        <h2 className="text-2xl font-bold">
          Comments {comments && comments.length > 0 && `(${comments.length})`}
        </h2>
      </div>

      {/* Comment Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <Input
              id="userName"
              type="text"
              placeholder="Enter your name (can be anything)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              maxLength={50}
              required
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Comment
            </label>
            <Textarea
              id="comment"
              placeholder="Share your thoughts... (emojis welcome! 😊)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={1000}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              {comment.length}/1000 characters
            </p>
          </div>

          <Button
            type="submit"
            disabled={postComment.isPending || !userName.trim() || !comment.trim()}
            className="w-full sm:w-auto"
          >
            <Send className="w-4 h-4 mr-2" />
            {postComment.isPending ? "Posting..." : "Post Comment"}
          </Button>

          {postComment.isError && (
            <p className="text-sm text-red-500 mt-2">
              Failed to post comment. Please try again.
            </p>
          )}
        </form>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading comments...
          </div>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{comment.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <p className="text-sm whitespace-pre-wrap break-words">{comment.comment}</p>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

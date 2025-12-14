import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, ThumbsUp, ThumbsDown, ChevronDown, MoreVertical } from "lucide-react";
import type { Comment } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface CommentsSectionProps {
  episodeId?: string;
  movieId?: string;
}

interface CommentWithReplies extends Comment {
  replies?: CommentWithReplies[];
  likes?: number;
}

// Generate avatar color based on username
function getAvatarColor(name: string): string {
  const colors = [
    'bg-red-500', 'bg-pink-500', 'bg-purple-500', 'bg-indigo-500',
    'bg-blue-500', 'bg-cyan-500', 'bg-teal-500', 'bg-green-500',
    'bg-yellow-500', 'bg-orange-500'
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

// YouTube-style comment component
function CommentItem({ 
  comment, 
  episodeId, 
  movieId, 
  userName, 
  setUserName,
  depth = 0 
}: { 
  comment: CommentWithReplies; 
  episodeId?: string; 
  movieId?: string;
  userName: string;
  setUserName: (name: string) => void;
  depth?: number;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [likes, setLikes] = useState(comment.likes || Math.floor(Math.random() * 50));
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const queryClient = useQueryClient();

  const postReply = useMutation({
    mutationFn: async (data: { userName: string; comment: string; parentId: string }) => {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          episodeId,
          movieId,
          parentId: data.parentId,
          userName: data.userName,
          comment: data.comment,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to post reply: ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: episodeId 
          ? [`/api/comments/episode/${episodeId}`]
          : [`/api/comments/movie/${movieId}`],
      });
      setReplyText("");
      setShowReplyForm(false);
      localStorage.setItem("streamvault_username", userName);
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !replyText.trim()) return;
    postReply.mutate({ 
      userName: userName.trim(), 
      comment: replyText.trim(), 
      parentId: comment.id 
    });
  };

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + (disliked ? 1 : 1));
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
      setDisliked(true);
    }
  };

  const hasReplies = comment.replies && comment.replies.length > 0;
  const avatarColor = getAvatarColor(comment.userName);
  const firstLetter = comment.userName.charAt(0).toUpperCase();

  return (
    <div className={depth > 0 ? "ml-12" : ""}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}>
          {firstLetter}
        </div>
        
        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header: Username and timestamp */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm text-foreground">@{comment.userName.toLowerCase().replace(/\s+/g, '')}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
            <button className="ml-auto p-1 hover:bg-muted rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          {/* Comment Text */}
          <p className="text-sm whitespace-pre-wrap break-words mb-2 text-foreground">{comment.comment}</p>
          
          {/* Actions: Like, Dislike, Reply */}
          <div className="flex items-center gap-1">
            <button 
              onClick={handleLike}
              className={`p-2 hover:bg-muted rounded-full transition-colors ${liked ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            </button>
            <span className="text-xs text-muted-foreground min-w-[20px]">
              {likes > 0 ? (likes >= 1000 ? `${(likes/1000).toFixed(1)}K` : likes) : ''}
            </span>
            <button 
              onClick={handleDislike}
              className={`p-2 hover:bg-muted rounded-full transition-colors ${disliked ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <ThumbsDown className={`w-4 h-4 ${disliked ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted rounded-full transition-colors ml-2"
            >
              Reply
            </button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-3 flex gap-3">
              <div className={`w-8 h-8 rounded-full ${userName ? getAvatarColor(userName) : 'bg-muted'} flex items-center justify-center text-white font-medium text-xs flex-shrink-0`}>
                {userName ? userName.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="flex-1">
                {!userName && (
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={50}
                    className="mb-2 bg-transparent border-0 border-b border-muted rounded-none focus:border-primary px-0"
                  />
                )}
                <form onSubmit={handleReplySubmit}>
                  <Input
                    type="text"
                    placeholder={`Reply to @${comment.userName.toLowerCase().replace(/\s+/g, '')}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    maxLength={1000}
                    className="bg-transparent border-0 border-b border-muted rounded-none focus:border-primary px-0"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowReplyForm(false);
                        setReplyText("");
                      }}
                      className="rounded-full"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={postReply.isPending || !userName.trim() || !replyText.trim()}
                      className="rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                    >
                      {postReply.isPending ? "..." : "Reply"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Replies Toggle */}
          {hasReplies && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 mt-2 text-primary text-sm font-medium hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showReplies ? 'rotate-180' : ''}`} />
              {showReplies ? 'Hide' : ''} {comment.replies!.length} {comment.replies!.length === 1 ? 'reply' : 'replies'}
            </button>
          )}

          {/* Nested Replies */}
          {hasReplies && showReplies && (
            <div className="mt-3 space-y-4">
              {comment.replies!.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  episodeId={episodeId}
                  movieId={movieId}
                  userName={userName}
                  setUserName={setUserName}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
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

  // Organize comments into tree structure
  const organizeComments = (flatComments: Comment[]): CommentWithReplies[] => {
    const commentMap = new Map<string, CommentWithReplies>();
    const rootComments: CommentWithReplies[] = [];

    // First pass: create map of all comments
    flatComments.forEach(c => {
      commentMap.set(c.id, { ...c, replies: [] });
    });

    // Second pass: organize into tree
    flatComments.forEach(c => {
      const comment = commentMap.get(c.id)!;
      const parentId = (c as any).parentId; // Handle old comments without parentId
      if (parentId && commentMap.has(parentId)) {
        commentMap.get(parentId)!.replies!.push(comment);
      } else {
        rootComments.push(comment);
      }
    });

    // Sort: newest first for root comments, oldest first for replies
    rootComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return rootComments;
  };

  const organizedComments = comments ? organizeComments(comments) : [];
  const totalComments = comments?.length || 0;

  // Post comment mutation
  const postComment = useMutation({
    mutationFn: async (data: { userName: string; comment: string }) => {
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
        throw new Error(`Failed to post comment: ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: episodeId 
          ? [`/api/comments/episode/${episodeId}`]
          : [`/api/comments/movie/${movieId}`],
      });
      setComment("");
      localStorage.setItem("streamvault_username", userName);
    },
    onError: (error) => {
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
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold">
          {totalComments} Comments
        </h2>
      </div>

      {/* Comment Form - YouTube Style */}
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full ${userName ? getAvatarColor(userName) : 'bg-muted'} flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}>
          {userName ? userName.charAt(0).toUpperCase() : '?'}
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            {!userName && (
              <Input
                type="text"
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={50}
                className="mb-2 bg-transparent border-0 border-b border-muted rounded-none focus:border-primary px-0 focus-visible:ring-0"
              />
            )}
            <Input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              className="bg-transparent border-0 border-b border-muted rounded-none focus:border-primary px-0 focus-visible:ring-0"
            />
            {comment && (
              <div className="flex justify-end gap-2 mt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setComment("")}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={postComment.isPending || !userName.trim() || !comment.trim()}
                  className="rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                >
                  {postComment.isPending ? "..." : "Comment"}
                </Button>
              </div>
            )}
          </form>
          {postComment.isError && (
            <p className="text-sm text-red-500 mt-2">
              Failed to post comment. Please try again.
            </p>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-5 mt-6">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading comments...
          </div>
        ) : organizedComments.length > 0 ? (
          organizedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              episodeId={episodeId}
              movieId={movieId}
              userName={userName}
              setUserName={setUserName}
            />
          ))
        ) : (
          <div className="py-12 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

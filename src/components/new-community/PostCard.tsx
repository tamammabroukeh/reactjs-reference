import React, { useState } from 'react';
import { Post } from '@/types/community-types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { CommentSection } from './CommentSection';

interface PostCardProps {
    post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const [reactions, setReactions] = useState(post.reactions);

    const handleReaction = (emoji: string) => {
        setReactions((prev: any) => ({
            ...prev,
            [emoji]: (prev[emoji] || 0) + 1
        }));
    };

    return (
        <Card className="overflow-hidden">
            {/* Post Header */}
            <div className="p-4 pb-3">
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author.avatar} alt={post.author.username} />
                        <AvatarFallback>
                            {post.author.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-card-foreground">{post.author.name}</span>
                            <span className="text-sm text-muted-foreground">@{post.author.username}</span>
                        </div>
                        {/* <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </span> */}
                    </div>
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-card-foreground leading-relaxed">{post.content}</p>
                </div>
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReaction('❤️')}
                            className="gap-2 hover:text-red-500 hover:bg-red-50"
                        >
                            <Heart className="h-4 w-4" />
                            <span>{reactions['❤️'] || 0}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowComments(!showComments)}
                            className={cn(
                                "gap-2 hover:text-primary hover:bg-primary/10",
                                showComments && "text-primary bg-primary/10"
                            )}
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments.length}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 hover:text-blue-500 hover:bg-blue-50"
                        >
                            <Share className="h-4 w-4" />
                            Share
                        </Button>
                    </div>

                    {/* Reaction buttons */}
                    <div className="flex items-center gap-1">
                        {['👍', '😄', '😮', '😢', '😡'].map(emoji => (
                            <Button
                                key={emoji}
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReaction(emoji)}
                                className="h-8 w-8 p-0 hover:bg-accent text-lg"
                            >
                                {emoji}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="p-4 border-t border-border bg-muted/20">
                    <CommentSection postId={post.id} comments={post.comments} />
                </div>
            )}
        </Card>
    );
};
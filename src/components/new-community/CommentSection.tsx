import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { Comment, Mention } from '@/types/community-types';
import { MentionInput } from './MentionInput';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { formatDistanceToNow } from 'date-fns';
import { Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CommentFormData {
    content: string;
    mentions: Mention[];
}

interface CommentSectionProps {
    postId: string;
    comments: Comment[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({
    postId,
    comments
}) => {
    console.log("postId", postId)
    const queryClient = useQueryClient();

    const { handleSubmit, setValue, watch, reset } = useForm<CommentFormData>({
        defaultValues: {
            content: '',
            mentions: []
        }
    });

    const content = watch('content');
    const mentions = watch('mentions');

    // Mock mutation for adding comment - replace with your actual API
    const addCommentMutation = useMutation({
        mutationFn: async (data: CommentFormData) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newComment: Comment = {
                id: Math.random().toString(36).substr(2, 9),
                content: data.content,
                mentions: data.mentions,
                author: {
                    id: 'current-user',
                    username: 'currentuser',
                    name: 'Current User',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser'
                },
                createdAt: new Date().toISOString()
            };

            return newComment;
        },
        onSuccess: (newComment) => {
            console.log("newComment", newComment)
            // Update the cache with the new comment
            queryClient.setQueryData(['posts'], (oldData: any) => {
                // Update your posts cache here
                return oldData;
            });

            reset();
            toast({
                title: "Comment added!",
                description: "Your comment has been posted successfully.",
            });
        },
        onError: (error) => {
            console.error('Error adding comment:', error);
            toast({
                title: "Error",
                description: "Failed to add comment. Please try again.",
                variant: "destructive",
            });
        }
    });

    const onSubmit = (data: CommentFormData) => {
        if (!data.content.trim()) return;
        addCommentMutation.mutate(data);
    };

    const handleMentionChange = (value: string, newMentions: Mention[]) => {
        setValue('content', value);
        setValue('mentions', newMentions);
    };

    // Render comment content with highlighted mentions
    const renderCommentContent = (comment: Comment) => {
        if (!comment.content || comment.mentions.length === 0) {
            return comment.content;
        }

        let result = [];
        let lastIndex = 0;

        comment.mentions.forEach((mention, index) => {
            // Add text before mention
            if (mention.startIndex > lastIndex) {
                result.push(comment.content.substring(lastIndex, mention.startIndex));
            }

            // Add highlighted mention
            result.push(
                <span
                    key={`mention-${index}`}
                    className="bg-mention-bg text-mention font-medium px-1 rounded cursor-pointer hover:bg-mention-hover/10"
                    title={`@${mention.username}`}
                >
                    @{mention.username}
                </span>
            );

            lastIndex = mention.endIndex;
        });

        // Add remaining text
        if (lastIndex < comment.content.length) {
            result.push(comment.content.substring(lastIndex));
        }

        return result;
    };

    return (
        <div className="space-y-4">
            {/* Comments List */}
            <div className="space-y-3">
                {comments.map((comment) => (
                    <Card key={comment.id} className="p-4">
                        <div className="flex gap-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={comment.author.avatar} alt={comment.author.username} />
                                <AvatarFallback className="text-xs">
                                    {comment.author.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{comment.author.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        @{comment.author.username}
                                    </span>
                                    {/* <span className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                    </span> */}
                                </div>

                                <div className="text-sm leading-relaxed">
                                    {renderCommentContent(comment)}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Comment Form */}
            <Card className="p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <MentionInput
                        value={content}
                        onChange={handleMentionChange}
                        placeholder="Write a comment... Use @ to mention someone"
                        className="min-h-[100px]"
                    />

                    <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                            {mentions.length > 0 && (
                                <span>Mentioning: {mentions.map(m => `@${m.username}`).join(', ')}</span>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={!content.trim() || addCommentMutation.isPending}
                            size="sm"
                            className="gap-2"
                        >
                            <Send className="h-4 w-4" />
                            {addCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
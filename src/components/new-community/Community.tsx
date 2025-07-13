import React from 'react';
import { useQuery } from 'react-query';
import { getPosts } from '@/lib/api';
import { Post } from '@/types/community-types';
import { PostCard } from './PostCard';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for demonstration
const mockPosts: Post[] = [
    {
        id: '1',
        title: 'Welcome to our Community!',
        content: 'This is our first post in the community. Feel free to share your thoughts and mention other users using @ symbol. Let\'s build something amazing together! 🚀',
        author: {
            id: '1',
            username: 'johnsmith',
            name: 'John Smith',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johnsmith'
        },
        comments: [
            {
                id: '1',
                content: 'Great to see the community growing! @janedoe what do you think about this?',
                mentions: [
                    {
                        id: '1',
                        username: 'janedoe',
                        startIndex: 42,
                        endIndex: 50
                    }
                ],
                author: {
                    id: '2',
                    username: 'mikejohnson',
                    name: 'Mike Johnson',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mikejohnson'
                },
                createdAt: '2024-01-15T10:30:00Z'
            }
        ],
        reactions: {
            '❤️': 5,
            '👍': 3,
            '🚀': 2
        },
        createdAt: '2024-01-15T09:00:00Z'
    },
    {
        id: '2',
        title: 'Exciting Updates Coming Soon',
        content: 'We\'re working on some amazing new features that will make our community even better. Stay tuned for updates! What features would you like to see?',
        author: {
            id: '3',
            username: 'sarahwilson',
            name: 'Sarah Wilson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahwilson'
        },
        comments: [],
        reactions: {
            '❤️': 8,
            '😮': 4,
            '👍': 6
        },
        createdAt: '2024-01-16T14:20:00Z'
    }
];

export const Community: React.FC = () => {
    // In a real app, you'd fetch posts from your API
    const { data: posts = mockPosts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        initialData: mockPosts, // Using mock data for demonstration
    });
    console.log("posts", posts)
    if (isLoading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Card className="p-8 text-center">
                <p className="text-muted-foreground">Failed to load posts. Please try again later.</p>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    Community Hub
                </h1>
                <p className="text-muted-foreground">
                    Share your thoughts, engage with others, and mention users with @
                </p>
            </div>

            <div className="space-y-6">
                {mockPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {mockPosts.length === 0 && (
                <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
                </Card>
            )}
        </div>
    );
};
// src/app/community/[id]/page.tsx
import { CommentForm } from './comment-form';

const CommunityPage = () => {
    const handleSubmit = (data: { content: string }) => {
        // Handle comment submission
        console.log('Comment content:', data.content);
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Post content here */}

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Comments</h3>
                <CommentForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};
export default CommunityPage
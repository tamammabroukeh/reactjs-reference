import CommentInput from './CommentInput';

const PostCard = ({ post }) => {
    const handleCommentSubmit = (content: string) => {
        // Submit comment to your backend
        console.log('Posting comment:', content);
        // Reset UI state
    };

    return (
        <div className="border rounded-lg p-4 mb-4">
            {/* Post content */}
            <div className="mt-4">
                <CommentInput onCommentSubmit={handleCommentSubmit} />
            </div>
        </div>
    );
};
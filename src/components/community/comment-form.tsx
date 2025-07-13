import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMention } from '@/hooks/use-mention';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/api/users';
import { MentionPopover } from '@/components/ui/mention-popover';
import { User } from '@/api/users';

interface CommentFormProps {
    onSubmit: (data: { content: string }) => void;
}

export const CommentForm = ({ onSubmit }: CommentFormProps) => {
    const form = useForm({ defaultValues: { content: '' } });
    const {
        inputRef,
        mentionQuery,
        mentionPosition,
        handleInputChange,
        insertMention,
        handleKeyDown,
        checkForMentionTrigger,
        resetMention
    } = useMention();

    const { data: users = [] } = useQuery({
        queryKey: ['users', mentionQuery],
        queryFn: () => fetchUsers(mentionQuery),
        enabled: mentionPosition !== null && mentionQuery.length > 0,
        staleTime: 1000 * 60 * 5 // 5 minutes
    });

    const handleSubmit = form.handleSubmit((data) => {
        onSubmit(data);
        form.reset();
        resetMention();
    });

    const handleSelectUser = (user: User) => {
        const newValue = insertMention(user.username);
        form.setValue('content', newValue);
        setTimeout(() => {
            inputRef.current?.focus();
            const cursorPos = newValue.length;
            inputRef.current?.setSelectionRange(cursorPos, cursorPos);
        }, 0);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="relative space-y-4">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <MentionPopover
                                users={users}
                                selectedUser={null}
                                onSelect={handleSelectUser}
                                open={mentionPosition !== null}
                                onOpenChange={(open) => !open && resetMention()}
                            >
                                <div>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            ref={(e) => {
                                                field.ref(e);
                                                inputRef.current = e;
                                            }}
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleInputChange(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                handleKeyDown(e);
                                                checkForMentionTrigger(e);
                                            }}
                                            placeholder="Write a comment..."
                                            className="min-h-[100px]"
                                        />
                                    </FormControl>
                                </div>
                            </MentionPopover>
                        </FormItem>
                    )}
                />
                <Button type="submit">Post Comment</Button>
            </form>
        </Form>
    );
};
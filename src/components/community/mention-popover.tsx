import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { User } from '@/api/users';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MentionPopoverProps {
    users: User[];
    selectedUser: User | null;
    onSelect: (user: User) => void;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const MentionPopover = ({
    users,
    selectedUser,
    onSelect,
    children,
    open,
    onOpenChange,
}: MentionPopoverProps) => {
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start" side="top">
                <Command>
                    <CommandInput placeholder="Search users..." />
                    <CommandList>
                        <CommandEmpty>No users found</CommandEmpty>
                        {users.map((user) => (
                            <CommandItem
                                key={user.id}
                                value={user.username}
                                onSelect={() => onSelect(user)}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src={user.avatar}
                                    alt={user.username}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span>{user.username}</span>
                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        selectedUser?.id === user.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
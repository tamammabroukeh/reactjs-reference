import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { searchUsers } from '@/lib/api';
import { User, Mention } from '@/types/community-types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MentionInputProps {
    value: string;
    onChange: (value: string, mentions: Mention[]) => void;
    placeholder?: string;
    className?: string;
}

export const MentionInput: React.FC<MentionInputProps> = ({
    value,
    onChange,
    placeholder = "Write a comment...",
    className
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [mentionQuery, setMentionQuery] = useState('');
    const [mentionStartIndex, setMentionStartIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mentions, setMentions] = useState<Mention[]>([]);

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Query users when mention is triggered
    const { data: users = [] } = useQuery({
        queryKey: ['users', mentionQuery],
        queryFn: () => searchUsers(mentionQuery),
        enabled: showDropdown && mentionQuery.length > 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Parse mentions from text
    const parseMentions = useCallback((text: string): Mention[] => {
        const mentionRegex = /@(\w+)/g;
        const foundMentions: Mention[] = [];
        let match;

        while ((match = mentionRegex.exec(text)) !== null) {
            foundMentions.push({
                id: Math.random().toString(36).substr(2, 9),
                username: match[1],
                startIndex: match.index,
                endIndex: match.index + match[0].length,
            });
        }

        return foundMentions;
    }, []);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        const cursorPosition = e.target.selectionStart;

        // Check if user is typing a mention
        const beforeCursor = newValue.substring(0, cursorPosition);
        const mentionMatch = beforeCursor.match(/@(\w*)$/);

        if (mentionMatch) {
            setShowDropdown(true);
            setMentionQuery(mentionMatch[1]);
            setMentionStartIndex(cursorPosition - mentionMatch[0].length);
            setSelectedIndex(0);
        } else {
            setShowDropdown(false);
            setMentionQuery('');
        }

        const newMentions = parseMentions(newValue);
        setMentions(newMentions);
        onChange(newValue, newMentions);
    };

    // Handle user selection from dropdown
    const selectUser = (user: User) => {
        if (!inputRef.current) return;

        const beforeMention = value.substring(0, mentionStartIndex);
        const afterMention = value.substring(inputRef.current.selectionStart);
        const newValue = `${beforeMention}@${user.username} ${afterMention}`;

        const newMentions = parseMentions(newValue);
        setMentions(newMentions);
        onChange(newValue, newMentions);

        setShowDropdown(false);
        setMentionQuery('');

        // Focus back to input and set cursor position
        setTimeout(() => {
            if (inputRef.current) {
                const newPosition = mentionStartIndex + user.username.length + 2;
                inputRef.current.focus();
                inputRef.current.setSelectionRange(newPosition, newPosition);
            }
        }, 0);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showDropdown || users.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % users.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + users.length) % users.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (users[selectedIndex]) {
                    selectUser(users[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setMentionQuery('');
                break;
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Render text with highlighted mentions
    const renderTextWithMentions = () => {
        if (!value || mentions.length === 0) return value;

        let result = [];
        let lastIndex = 0;

        mentions.forEach((mention, index) => {
            // Add text before mention
            if (mention.startIndex > lastIndex) {
                result.push(value.substring(lastIndex, mention.startIndex));
            }

            // Add highlighted mention
            result.push(
                <span
                    key={`mention-${index}`}
                    className="bg-mention-bg text-mention font-medium px-1 rounded"
                >
                    @{mention.username}
                </span>
            );

            lastIndex = mention.endIndex;
        });

        // Add remaining text
        if (lastIndex < value.length) {
            result.push(value.substring(lastIndex));
        }

        return result;
    };

    return (
        <div className="relative">
            <div className="relative">
                {renderTextWithMentions()}
                <textarea
                    ref={inputRef}
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={cn(
                        "w-full min-h-[80px] p-3 border border-border rounded-lg resize-none",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                        "placeholder:text-muted-foreground bg-card text-card-foreground",
                        className
                    )}
                />
            </div>

            {showDropdown && users.length > 0 && (
                <Card
                    ref={dropdownRef}
                    className="absolute bottom-full left-0 right-0 mb-2 max-h-48 overflow-y-auto z-50 bg-popover border border-border shadow-lg"
                >
                    {users.map((user, index) => (
                        <div
                            key={user.id}
                            onClick={() => selectUser(user)}
                            className={cn(
                                "flex items-center gap-3 p-3 cursor-pointer transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                index === selectedIndex && "bg-accent text-accent-foreground"
                            )}
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.username} />
                                <AvatarFallback className="text-xs">
                                    {user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-medium text-sm">{user.name}</span>
                                <span className="text-xs text-muted-foreground">@{user.username}</span>
                            </div>
                        </div>
                    ))}
                </Card>
            )}
        </div>
    );
};
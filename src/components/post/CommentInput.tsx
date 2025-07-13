import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from '@/components/ui/command';
import { User } from '@/types';

interface CommentInputProps {
  onCommentSubmit: (content: string) => void;
}

const CommentInput = ({ onCommentSubmit }: CommentInputProps) => {
  const [comment, setComment] = useState('');
  const [mentionQuery, setMentionQuery] = useState('');
  const [isMentioning, setIsMentioning] = useState(false);
  const [mentionPosition, setMentionPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch users with react-query
  const { data: users = [], isFetching } = useQuery({
    queryKey: ['users', mentionQuery],
    queryFn: async () => {
      if (!mentionQuery) return [];
      const response = await axios.get<User[]>('/api/users', {
        params: { query: mentionQuery }
      });
      return response.data;
    },
    enabled: isMentioning && mentionQuery.length > 0,
    staleTime: 60000
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);

    // Check for @ mentions
    const cursorPosition = e.target.selectionStart || 0;
    const textBeforeCursor = value.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex > -1 && /@\w*$/.test(textBeforeCursor)) {
      setIsMentioning(true);
      setMentionPosition(lastAtIndex);
      setMentionQuery(textBeforeCursor.substring(lastAtIndex + 1));
    } else {
      setIsMentioning(false);
    }
  };

  const handleSelectUser = (user: User) => {
    if (!textareaRef.current) return;
    
    const beforeMention = comment.substring(0, mentionPosition);
    const afterMention = comment.substring(mentionPosition + mentionQuery.length + 1);
    const newComment = `${beforeMention}@${user.username} ${afterMention}`;
    
    setComment(newComment);
    setIsMentioning(false);
    
    // Focus back on textarea after selection
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = mentionPosition + user.username.length + 2;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMentioning(false);
    }
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={comment}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a comment..."
        className="w-full min-h-[100px] p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
      />

      {isMentioning && (
        <Popover open={isMentioning}>
          <PopoverTrigger asChild />
          <PopoverContent 
            align="start"
            className="w-[300px] p-0 shadow-lg"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command>
              <CommandInput placeholder="Search users..." value={mentionQuery} />
              <CommandList>
                <CommandEmpty>
                  {isFetching ? 'Searching...' : 'No users found'}
                </CommandEmpty>
                
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => handleSelectUser(user)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img 
                      src={user.image} 
                      alt={user.username} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{user.username}</span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
      
      <button
        onClick={() => onCommentSubmit(comment)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Post Comment
      </button>
    </div>
  );
};

export default CommentInput;
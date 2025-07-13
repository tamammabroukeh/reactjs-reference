import { useState, useRef, useEffect } from 'react';

export const useMention = () => {
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionPosition, setMentionPosition] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (value: string) => {
    if (mentionPosition !== null) {
      const currentText = value.slice(mentionPosition + 1);
      const nextSpace = currentText.indexOf(' ');
      const query = nextSpace === -1 ? currentText : currentText.slice(0, nextSpace);
      setMentionQuery(query);
    }
  };

  const insertMention = (username: string) => {
    if (mentionPosition === null || !inputRef.current) return '';

    const currentValue = inputRef.current.value;
    const prefix = currentValue.slice(0, mentionPosition);
    const suffix = currentValue.slice(mentionPosition + 1 + mentionQuery.length);
    
    setMentionQuery('');
    setMentionPosition(null);
    
    return `${prefix}@${username}${suffix}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mentionPosition !== null && e.key === 'Escape') {
      setMentionPosition(null);
      setMentionQuery('');
    }
  };

  const checkForMentionTrigger = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '@') {
      setMentionPosition(e.currentTarget.selectionStart);
      setMentionQuery('');
    }
  };

  return {
    inputRef,
    mentionQuery,
    mentionPosition,
    handleInputChange,
    insertMention,
    handleKeyDown,
    checkForMentionTrigger,
    resetMention: () => {
      setMentionPosition(null);
      setMentionQuery('');
    }
  };
};
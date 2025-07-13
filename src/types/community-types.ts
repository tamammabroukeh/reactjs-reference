export interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
}

export interface Mention {
  id: string;
  username: string;
  startIndex: number;
  endIndex: number;
}

export interface Comment {
  id: string;
  content: string;
  mentions: Mention[];
  author: User;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
  reactions: Record<string, number>;
  createdAt: string;
}
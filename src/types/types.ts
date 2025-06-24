import type { ReactNode } from "react";

export interface PostType {
  id: number;
  auther: string;
  avatar: string;
  postImage: string;
  comment?: CommentType[];
}
export interface CommentType {
  id: number;
  auther: string;
  text: string;
  avatar: string;
  like: number;
  reply?: CommentType[];
}
export interface CommentItemProps {
  comment: CommentType;
  postId: number | null;
  onReply: (id: number, name: string, avatar: string) => void;
  isReply?: boolean;
  children?: ReactNode;
}

export interface ReplyComponentProps {
  postId: number | null;
  replyComment: CommentType;
  onReply: (id: number, name: string, avatar: string) => void;
}

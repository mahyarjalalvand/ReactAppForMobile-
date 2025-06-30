import type { ReactNode } from "react";

export interface PostType {
  id: number;
  auther: string;
  avatar: string;
  postImage: string;
  comment?: CommentType[];
}
export interface CommentType extends Pick<PostType, "id" | "auther" | "avatar"> {
  text: string;
  like: number;
  reply?: CommentType[];
}

export interface CommentModalProp {
  postId: number | null;
  setPostId: React.Dispatch<React.SetStateAction<number | null>>;
}
export interface CommentComponentProps extends Pick<CommentModalProp , "postId"> {
  setSubmitContainerHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface ReplyComponentProps extends Pick<CommentModalProp , "postId"> {
  replyComment: CommentType;
  onReply: (id: number, name: string, avatar: string) => void;
}

export interface CommentCardTypeProps {
  comment: CommentType;
  postId: number | null;
  onReply: (id: number, name: string, avatar: string) => void;
  textareaHandler: () => void;
}
export interface CommentItemProps extends Pick<CommentCardTypeProps, "comment" | "postId" | "onReply"> {
  isReply?: boolean;
  textareaHandler: () => void;
  children?: ReactNode;
}

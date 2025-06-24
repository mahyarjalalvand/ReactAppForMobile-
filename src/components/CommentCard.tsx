import type { CommentType } from "../types/types";
// import { motion, AnimatePresence } from "framer-motion";

import ReplyComment from "./ReplyComment";
import CommentItem from "./CommentItem";

function CommentCard({
  comment,
  postId,
  onReply,
}: {
  comment: CommentType;
  postId: number | null;
  onReply: (id: number, name: string, avatar: string) => void;
}) {
  return (
    <CommentItem comment={comment} postId={postId} onReply={onReply}>
      {comment.reply?.map((reply) => (
        <ReplyComment key={reply.id} replyComment={reply} postId={postId} onReply={onReply} />
      ))}
    </CommentItem>
  );
}

export default CommentCard;

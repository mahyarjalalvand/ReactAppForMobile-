import type { CommentType } from "../types/types";
// import { motion, AnimatePresence } from "framer-motion";
import CommentItem from "./CommentItem";

function ReplyComment({
  postId,
  replyComment,
  onReply,
}: {
  postId: number | null;
  replyComment: CommentType;
  onReply: (id: number, name: string, avatar: string) => void;
}) {
  return (
    <div className="flex gap-5">
      <CommentItem comment={replyComment} postId={postId} onReply={onReply} isReply />
    </div>
  );
}

export default ReplyComment;

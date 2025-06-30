import { memo } from "react";
import type { CommentCardTypeProps } from "../types/types";
// import { motion, AnimatePresence } from "framer-motion";

import ReplyComment from "./ReplyComment";
import CommentItem from "./CommentItem";

function CommentCard({ comment, postId, onReply, textareaHandler }: CommentCardTypeProps) {
  return (
    <CommentItem comment={comment} postId={postId} onReply={onReply} textareaHandler={textareaHandler}>
      {comment.reply?.map((reply) => (
        <ReplyComment key={reply.id} replyComment={reply} postId={postId} onReply={onReply} />
      ))}
    </CommentItem>
  );
}

export default memo(CommentCard);

import type {  ReplyComponentProps } from "../types/types";
// import { motion, AnimatePresence } from "framer-motion";
import CommentItem from "./CommentItem";

function ReplyComment({ postId, replyComment, onReply }: ReplyComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      <CommentItem comment={replyComment} postId={postId} onReply={onReply} isReply>
        {replyComment.reply &&
          replyComment.reply?.length > 0 &&
          replyComment.reply?.map((childReply) => (
            <ReplyComment key={childReply.id} postId={postId} replyComment={childReply} onReply={onReply} />
          ))}
      </CommentItem>
    </div>
  );
}

export default ReplyComment;

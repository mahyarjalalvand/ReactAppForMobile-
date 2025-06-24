import { useState } from "react";
import type { CommentItemProps } from "../types/types";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function CommentItem({ comment, onReply, isReply = false, children }: CommentItemProps) {
  const [likedComment, setLikeComment] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(comment.like ?? 0);
  const [replyComponentIsRender, setReplyComponentIsRender] = useState<boolean>(false);

  const likeToggleHandler = (): void => {
    setLikeCount((prev) => (likedComment ? Math.max(prev - 1, 0) : prev + 1));
    setLikeComment((likedCommentId) => !likedCommentId);
  };

  const toggleReply = (): void => {
    setReplyComponentIsRender((prev) => !prev);
    console.log(replyComponentIsRender);
  };

  return (
    <div
      className={`flex flex-col items-center gap-5 justify-between px-2 sm:px-4 py-3 w-full rounded-xl text-black ${
        isReply ? "bg-white" : "bg-primary"
      }`}>
      <div className="w-full flex items-center">
        <div className="cursor-pointer ">
          <button onClick={likeToggleHandler} className="flex gap-2 cursor-pointer">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={likedComment ? "liked" : "unliked"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 800, damping: 30 }}>
                {likedComment ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} />}
              </motion.div>
            </AnimatePresence>
            {likeCount > 0 && <span>{likeCount}</span>}
          </button>
        </div>
        <div className="flex flex-col items-end gap-3 w-full">
          <div className="flex justify-between">
            <div className=" flex flex-col items-end gap-2 px-3">
              <span className="font-bold text-xl">{comment.auther}</span>
              <p dir="auto">{comment.text}</p>
            </div>
            <div className="min-w-12">
              <img src={comment.avatar} alt="" />
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="w-2/3">
              {!!comment.reply && comment.reply?.length > 0 && (
                <button
                  onClick={toggleReply}
                  className="text-primary2 cursor-pointer hover:text-secondary2 transition-all duration-300 ">
                  مشاهده پاسخ های قبلی
                </button>
              )}
            </div>

            <div className="flex justify-end w-1/3">
              <button
                onClick={() => onReply(comment.id, comment.auther, comment.avatar)}
                className="text-blue-600 cursor-pointer font-bold flex self-end hover:-translate-x-1 transition-all duration-200">
                پاسخ
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">{replyComponentIsRender && children}</div>
    </div>
  );
}

export default CommentItem;

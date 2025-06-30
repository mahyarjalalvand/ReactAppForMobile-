import { useEffect, useState } from "react";
import type { CommentItemProps } from "../types/types";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function CommentItem({ comment, onReply, isReply = false, textareaHandler, children }: CommentItemProps) {
  const [likedComment, setLikeComment] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(comment.like ?? 0);
  const [replyComponentIsRender, setReplyComponentIsRender] = useState<boolean>(false);

  const likeToggleHandler = (): void => {
    setLikeCount((prev) => (likedComment ? Math.max(prev - 1, 0) : prev + 1));
    setLikeComment((likedCommentId) => !likedCommentId);
  };

  const toggleReply = (): void => {
    setReplyComponentIsRender((prev) => !prev);
  };
  useEffect(() => {
    // console.log(comment.text);
  }, [comment]);

  return (
    <motion.div
      layout
      className={`flex flex-col overflow-hidden items-center gap-5 justify-between transition-all duration-200  py-3 w-full rounded-3xl text-black ${
        isReply ? "bg-white px-2" : "bg-primary px-2 sm:px-4"
      }`}>
      <div className="w-full flex items-center">
        <div className="cursor-pointer min-w-10 ">
          <button onClick={likeToggleHandler} className="flex gap-2 cursor-pointer">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={likedComment ? "liked" : "unliked"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 800, damping: 30 }}
                className="z-20">
                {likedComment ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} />}
              </motion.div>
            </AnimatePresence>
            {likeCount > 0 && (
              <motion.span className="z-10" initial={{ x: -20 }} animate={{ x: 0 }} exit={{ x: -20 }}>
                {likeCount}
              </motion.span>
            )}
          </button>
        </div>
        <div className="flex flex-col items-end gap-3 w-full">
          <div className="flex justify-end w-full">
            <div className=" flex flex-col items-end gap-2 px-3 justify-end  max-w-[calc(100%-2rem)]">
              <span className="font-bold text-xl">{comment.auther}</span>
              <p dir="auto" className="">
                {comment.text}
              </p>
            </div>
            <div className="min-w-12 size-12">
              <img src={comment.avatar} alt="" />
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="w-2/3">
              {!!comment.reply && comment.reply?.length > 0 && (
                <button
                  onClick={toggleReply}
                  className="text-primary2 cursor-pointer hover:text-secondary2 transition-all duration-300 ">
                  {toggleReply ? "مشاهده پاسخ های قبلی" : "بستن پاسخ ها"}
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 justify-end w-1/3">
              <div
                className="flex items-center gap-1 hover:-translate-x-1 transition-all duration-200"
                onClick={() => {
                  onReply(comment.id, comment.auther, comment.avatar);
                  textareaHandler();
                }}>
                <button className="text-primaryBlue cursor-pointer font-bold flex self-end">پاسخ</button>
                <span className=" text-primaryBlue">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.44332 9.17036C6.94958 9.05404 7.44359 8.97244 7.91709 8.82605C9.46251 8.34753 10.6698 7.42949 11.4069 5.98067C12.2469 4.33035 12.1663 2.6675 11.345 1.03042C11.1656 0.673228 10.932 0.342877 10.7231 -9.36101e-07C10.7087 0.00536825 10.6947 0.0110941 10.6803 0.0164633C10.6777 0.0307799 10.6723 0.0458126 10.6734 0.0597706C10.8178 1.835 10.111 3.22477 8.72508 4.30494C8.05715 4.82606 7.30137 5.18826 6.51641 5.49571C6.49625 5.50358 6.47393 5.50573 6.4408 5.51324C6.4408 5.45633 6.4408 5.40802 6.4408 5.35934C6.4408 4.57194 6.44008 3.78454 6.44152 2.99714C6.44152 2.84216 6.40083 2.7058 6.28849 2.5952C6.09801 2.40694 5.86829 2.39477 5.65981 2.56228C4.60696 3.40909 3.55448 4.25626 2.50163 5.10308C1.81606 5.65462 1.13012 6.20544 0.444909 6.75698C0.389098 6.80208 0.332927 6.84753 0.284318 6.90014C0.0952808 7.10451 0.0927603 7.34789 0.288278 7.54724C0.394499 7.65569 0.518363 7.74696 0.637187 7.84252C2.30251 9.18182 3.96856 10.5193 5.63208 11.8604C5.78979 11.9875 5.94822 12.048 6.13906 11.9549C6.33926 11.8576 6.44332 11.6968 6.44332 11.4728C6.44332 10.748 6.44332 10.0233 6.44332 9.2985C6.44332 9.24946 6.44332 9.20079 6.44332 9.17036Z"
                      fill="#1D6AFF"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {replyComponentIsRender && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col gap-3">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CommentItem;

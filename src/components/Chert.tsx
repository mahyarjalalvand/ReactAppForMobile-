import { useState } from "react";
import { usePostValue } from "../context/PostContext";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CommentsList from "./CommentsList";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

function Post() {
  const { posts } = usePostValue();
  const [showCommentById, setShowCommentById] = useState<number | null>(null);
  const [height , setHeight] = useState<number>(400)
  const y = useMotionValue(0);

  const handleDragEnd = (_:unknown, info: { offset: { y: number } }) => {
    const newHeight = height - info.offset.y;
    if (newHeight < 200) return setHeight(200);
    if (newHeight > window.innerHeight * 0.8) return setHeight(window.innerHeight * 0.8);
    setHeight(newHeight);
  };
  return (
    <div className="w-full relative flex flex-wrap justify-end gap-3 rounded-2xl ">
      {posts.map((p) => (
        <div
          key={p.id}
          className="bg-primary p-2 rounded-2xl flex flex-col items-end gap-2 w-full sm:w-[49%] transition-all duration-300">
          <div className="flex gap-3 cursor-pointer">
            <div className="flex flex-col items-end ">
              <p>{p.auther}</p>
              <p className="text-sm text-primary2">38روز قبل</p>
            </div>
            <div>
              <img src={p.avatar} alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <img className="rounded-xl " src={p.postImage} alt="" />
            <div className="flex justify-end gap-3">
              <TfiCommentAlt
                size={20}
                className="rotate-y-180 cursor-pointer"
                onClick={() => setShowCommentById(p.id === showCommentById ? null : p.id)}
              />
            </div>
          </div>
        </div>
      ))}
      <AnimatePresence>
        {showCommentById !== null && (
          <motion.div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center ">
            <div className="relative z-50 flex flex-col gap-5 items-end bg-secondary2 rounded-2xl max-w-3xl h-2/3 w-full p-4">
              <div className="cursor-pointer">
                <IoMdCloseCircleOutline size={35} onClick={() => setShowCommentById(null)} />
              </div>
              <div className="w-full">
                <CommentsList postId={showCommentById} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Post;

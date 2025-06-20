import { useState } from "react";
import { usePostValue } from "../context/PostContext";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CommentsList from "./CommentsList";
import { motion, AnimatePresence, useMotionValue, type PanInfo } from "framer-motion";

function Post() {
  const { posts } = usePostValue();
  const [showCommentById, setShowCommentById] = useState<number | null>(null);
  const [height, setHeight] = useState<number>(400);
  const y = useMotionValue(0);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const offsetY = info.offset.y;

    if (offsetY > 100) {
      setShowCommentById(null);
      return;
    }

    const newHeight = height - offsetY;

    const min = 200;
    const max = window.innerHeight * 0.8;

    const clampedHeight = Math.max(min, Math.min(newHeight, max));
    setHeight(clampedHeight);
    y.set(0); 
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
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <motion.div
              key="modal"
              drag="y"
              style={{ y, height }}
              onDragEnd={handleDragEnd}
              dragConstraints={{ top: -100, bottom: 0 }}
              initial={{ y: 300 }}
              animate={{ y: 0 }}  
              exit={{ y: 500 }}
              transition={{ type: "spring", damping: 35, stiffness: 900 }}
              className="fixed bottom-0 z-50 flex flex-col gap-3 items-end bg-secondary2 rounded-t-2xl max-w-3xl w-full p-4">
              <div className="w-full flex justify-center">
                <div className="w-12 h-1.5 bg-white/50 rounded-full mb-2" />
              </div>

              <div className="cursor-pointer" onClick={() => setShowCommentById(null)}>
                <IoMdCloseCircleOutline size={35} />
              </div>
              <div className="w-full overflow-y-auto">
                <CommentsList postId={showCommentById} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Post;

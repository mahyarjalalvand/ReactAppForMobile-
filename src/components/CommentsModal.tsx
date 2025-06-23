import { useState } from "react";
import { GrNext } from "react-icons/gr";

import { motion, AnimatePresence, useMotionValue, type PanInfo } from "framer-motion";
import Comments from "./Comments";

type Prop = {
  postId: number | null;
  setPostId: React.Dispatch<React.SetStateAction<number | null>>;
};

function CommentsList({ postId, setPostId }: Prop) {
  const [height, setHeight] = useState<number>(500);
  const y = useMotionValue(0);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const offsetY = info.offset.y;

    if (offsetY > 200) {
      setPostId(null);
      setHeight(500);
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
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => !e && setPostId(null)}>
        <motion.div
          key="modal"
          drag="y"
          style={{ y, height }}
          onDragEnd={handleDragEnd}
          dragConstraints={{ top: -100, bottom: 100 }}
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 35, stiffness: 800 }}
          className="fixed bottom-0 z-50 flex flex-col items-end bg-white rounded-t-2xl max-w-3xl w-full p-2 sm:p-4">
          <div className="w-full flex justify-center">
            <div className="w-12 h-1.5 bg-primary rounded-full mb-2" />
          </div>
          <div className="flex items-center gap-3 mb-2 cursor-pointer" onClick={() => setPostId(null)}>
            <span className="font-bold">بازگشت</span>
            <div className="bg-primary rounded-full p-2 w-fit hover:translate-x-2 hover:rotate-90 transition-all duration-200">
              <GrNext size={"20px"} />
            </div>
          </div>
          <div className="w-full overflow-y-auto ">
            <Comments postId={postId} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CommentsList;

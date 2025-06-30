import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence, useMotionValue, type PanInfo } from "framer-motion";
import type { CommentModalProp } from "../types/types";
import { GrNext } from "react-icons/gr";

import Comments from "./Comments";
import { modalVariants } from "../variants/variants";

function CommentsModal({ postId, setPostId }: CommentModalProp) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(window.innerHeight * 0.9);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [submitContainerHeight, setSubmitContainerHeight] = useState<number | undefined>(undefined);

  const modalHeight = useMotionValue(400);
  const baseHeight = useRef(400);
  const minHeight = 300;

  useEffect(() => {
    const resizeHandler = () => {
      const newMaxHeight = window.innerHeight * 0.9;
      setMaxHeight(newMaxHeight);

      if (modalHeight.get() > newMaxHeight) {
        modalHeight.set(newMaxHeight);
        baseHeight.current = newMaxHeight;
      }
    };

    window.addEventListener("resize", resizeHandler);
  }, []);

  const handleDrag = (_: unknown, info: PanInfo) => {
    const newHeight = baseHeight.current - info.offset.y;

    if (newHeight >= minHeight && newHeight <= maxHeight) {
      modalHeight.set(newHeight);
    }
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    const currentHeight = modalHeight.get();
    if (currentHeight < 305) {
      closeModal();
      return;
    }

    baseHeight.current = modalHeight.get();
    if (modalHeight.get() > maxHeight) {
      modalHeight.set(maxHeight);
    }
    setIsDragging(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setPostId(null);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (postId) {
      modalHeight.set(400);
    }
  }, [postId]);
  // console.log(baseHeight)
  // useEffect(() => {
  //   console.log("Updated height:", submitContainerHeight);
  // }, [submitContainerHeight]);
  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            if (!isDragging) closeModal();
          }}>
          <motion.div
            variants={modalVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ height: modalHeight }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 z-50 flex flex-col items-end bg-white rounded-t-2xl max-w-3xl w-full p-2 sm:px-4">
            <motion.div
              className="w-full flex justify-center py-3"
              drag="y"
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0}>
              <div className="w-12 h-1.5 bg-primary rounded-full mb-2" />
            </motion.div>
            <div
              className="flex items-center gap-3 mb-2 cursor-pointer  hover:[&_div]:translate-x-2 hover:[&_div]:rotate-90"
              onClick={closeModal}>
              <span className="font-bold">بازگشت</span>
              <div className="bg-primary rounded-full p-2 w-fit transition-all duration-200">
                <GrNext size={"20px"} />
              </div>
            </div>
            <div
              className="w-full overflow-y-auto noScrollbar"
              style={{ paddingBottom: `${submitContainerHeight ?? 0}px` }}>
              <Comments postId={postId} setSubmitContainerHeight={setSubmitContainerHeight} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommentsModal;

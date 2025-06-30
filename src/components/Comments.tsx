import { useEffect, useRef, useState } from "react";
import { usePostValue } from "../context/PostContext";
import CommentCard from "./CommentCard";
import { AnimatePresence, motion } from "framer-motion";

import { RiTelegram2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

import avatar1 from "../assets/images/Frame 24.png";
import type { CommentComponentProps, CommentType } from "../types/types";

function Comments({ postId, setSubmitContainerHeight }: CommentComponentProps) {
  const { posts, setPosts } = usePostValue();
  const [inputValue, setInputValue] = useState<string>("");
  const [replyTo, setReplyTo] = useState<{ id: number; name: string; avatar: string } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitContainerRef = useRef<HTMLDivElement>(null);

  const post = posts.find((p) => p.id === postId);

  const addReplyToCommentTree = (comments: CommentType[], targetId: number, reply: CommentType): CommentType[] => {
    return comments.map((comment) => {
      if (comment.id === targetId) {
        return {
          ...comment,
          reply: [reply, ...(comment.reply || [])],
        };
      }
      if (comment.reply && comment.reply?.length > 0) {
        const updatedReply = addReplyToCommentTree(comment.reply, targetId, reply);
        if (updatedReply !== comment.reply) {
          return {
            ...comment,
            reply: updatedReply,
          };
        }
      }
      return comment;
    });
  };

  const addCommentHandler = (): void => {
    // const newReplyId =
    //   comment.reply && comment.reply?.length > 0 ? Math.max(...comment.reply.map((r) => r.id)) + 1 : 1;
    if (!inputValue.trim() || !postId) return;

    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        const currentComments = p.comment || [];
        if (replyTo) {
          const newReply: CommentType = {
            id: Date.now() + Math.floor(Math.random() * 100),
            auther: "رضا رضایی",
            avatar: avatar1,
            text: inputValue,
            like: 0,
            reply: [],
          };
          const updatedComments = addReplyToCommentTree(currentComments, replyTo.id, newReply);

          return {
            ...p,
            comment: updatedComments,
          };
        }
        // const newId = currentComments.length > 0 ? Math.max(...currentComments.map((c) => c.id)) + 1 : 1;
        const newComment: CommentType = {
          id: Date.now() + Math.floor(Math.random() * 100),
          auther: "احمد رضایی",
          avatar: avatar1,
          text: inputValue,
          like: 0,
          reply: [],
        };
        return {
          ...p,
          comment: [newComment, ...currentComments],
        };
      }
      return p;
    });
    setPosts(updatedPosts);
    setInputValue("");
    setReplyTo(null);
  };

  const replyHandler = (id: number, name: string, avatar: string): void => setReplyTo({ id, name, avatar });

  const closeReplyValue = (): void => {
    setReplyTo(null);
    if (submitContainerRef.current) {
      setTimeout(() => {
        setSubmitContainerHeight(submitContainerRef?.current?.offsetHeight);
      }, 350);
    }
  };

  const textareaFocusHandler = () => textareaRef?.current?.focus();
  useEffect(() => {
    if (submitContainerRef.current) {
      setSubmitContainerHeight(submitContainerRef?.current?.offsetHeight);
    }
    // console.log(submitContainerRef.current.offsetHeight)
  }, [replyTo]);

  return (
    <div className=" flex flex-col ">
      <div className="flex flex-1 flex-col items-end gap-3 transition-all ">
        {post ? (
          post.comment && post.comment.length > 0 ? (
            post.comment.map((comment: CommentType) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                key={comment.id}
                className="w-full">
                <CommentCard
                  comment={comment}
                  postId={postId}
                  onReply={replyHandler}
                  textareaHandler={textareaFocusHandler}
                />
              </motion.div>
            ))
          ) : (
            <div className="w-full flex justify-center bg-primary p-2 rounded-2xl">
              <p className="font-bold ">کامنتی وجود ندارد</p>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center bg-primary p-2 rounded-2xl">
            <p>پست پیدا نشد</p>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          transition={{ layout: { duration: 0.25, ease: "easeOut" } }}
          ref={submitContainerRef}
          className="absolute z-50 left-0 bottom-0 bg-white flex items-center gap-2 w-full p-2">
          <button
            onClick={addCommentHandler}
            className="bg-primaryBlue p-1.5 rounded-full text-white cursor-pointer hover:scale-125 transition-all duration-200">
            <RiTelegram2Line size={25} />
          </button>
          <motion.div
            layout
            transition={{ layout: { duration: 0.25, ease: "easeInOut" } }}
            className="bg-primary p-2 rounded-3xl w-full flex flex-col items-end gap-3">
            {replyTo && (
              <motion.div
                layout
                key={replyTo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="bg-white  w-full p-2 rounded-3xl flex gap-2 justify-between items-center">
                <button className="cursor-pointer" onClick={closeReplyValue}>
                  <IoClose size={20} />
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base">{replyTo.name}</span>
                  <span>
                    <img src={replyTo.avatar} alt="" className="size-10 sm:size-8" />
                  </span>
                </div>
              </motion.div>
            )}

            <textarea
              ref={textareaRef}
              className="w-full outline-none text-end"
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e?.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  addCommentHandler();
                }
              }}></textarea>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Comments;

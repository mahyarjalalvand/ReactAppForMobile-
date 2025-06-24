import { useState } from "react";
import { usePostValue } from "../context/PostContext";
import CommentCard from "./CommentCard";
import { AnimatePresence, motion } from "framer-motion";

import { RiTelegram2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

import avatar1 from "../assets/images/Frame 24.png";
import type { CommentType } from "../types/types";

function Comments({ postId }: { postId: number | null }) {
  const { posts, setPosts } = usePostValue();

  const [inputValue, setInputValue] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: number; name: string; avatar: string } | null>(null);

  const post = posts.find((p) => p.id === postId);

  const addReplyToCommentTree = (comments: CommentType[], targetId: number, reply: CommentType): CommentType[] => {
    return comments.map((comment) => {
      if (comment.id === targetId) {
        return {
          ...comment,
          reply: [...(comment.reply || []), reply],
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

  const addCommentHandler = () => {
    // const newReplyId =
    //   comment.reply && comment.reply?.length > 0 ? Math.max(...comment.reply.map((r) => r.id)) + 1 : 1;
    if (!inputValue.trim() || !postId) return;

    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        const currentComments = p.comment || [];
        if (replyTo) {
          const newReply = {
            id: Date.now() + Math.floor(Math.random() * 1000),
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
        const newComment = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          auther: "احمد رضایی",
          avatar: avatar1,
          text: inputValue,
          like: 0,
          reply: [],
        };
        return {
          ...p,
          comment: [...currentComments, newComment],
        };
      }
      return p;
    });
    setPosts(updatedPosts);
    setInputValue("");
    setReplyTo(null);
  };

  const replyHandler = (id: number, name: string, avatar: string) => setReplyTo({ id, name, avatar });
  return (
    <div className="flex flex-col items-end justify-between min-h-screen gap-3 ">
      {post ? (
        post.comment && post.comment.length > 0 ? (
          post.comment.map((comment) => (
            <CommentCard key={comment.id} comment={comment} postId={postId} onReply={replyHandler} />
          ))
        ) : (
          <div className="size-full flex justify-center bg-primary p-2 rounded-2xl">
            <p className="font-bold ">کامنتی وجود ندارد</p>
          </div>
        )
      ) : (
        <div className="size-full flex justify-center bg-primary p-2 rounded-2xl">
          <p>پست پیدا نشد</p>
        </div>
      )}

      <motion.div
        layout
        transition={{ layout: { duration: 0.25, ease: "easeOut" } }}
        className="sticky bottom-0 bg-white flex items-center gap-2 w-full p-2">
        <button
          onClick={addCommentHandler}
          className="bg-blue-600 p-1 rounded-full text-white cursor-pointer hover:scale-125 transition-all duration-200">
          <RiTelegram2Line size={25} />
        </button>
        <motion.div
          layout
          transition={{ layout: { duration: 0.25, ease: "easeInOut" } }}
          className="bg-primary p-2 rounded-3xl w-full flex flex-col items-end gap-3">
          <AnimatePresence mode="wait">
            {replyTo && (
              <motion.div
                layout
                key={replyTo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                className="bg-white  w-full p-2 rounded-3xl flex gap-2 justify-between items-center">
                <button className="cursor-pointer" onClick={() => setReplyTo(null)}>
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
          </AnimatePresence>
          <input
            type="text"
            className="outline-0 text-end w-full"
            placeholder="دیدگاه خود را بنویسید"
            value={inputValue}
            onChange={(e) => setInputValue(e?.target.value)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Comments;

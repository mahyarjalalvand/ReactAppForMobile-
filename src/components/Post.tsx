import { useState } from "react";
import { usePostValue } from "../context/PostContext";
import { TfiCommentAlt } from "react-icons/tfi";
import CommentsList from "./CommentsList";

function Post() {
  const { posts } = usePostValue();
  const [showCommentById, setShowCommentById] = useState<number | null>(null);
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
          {showCommentById === p.id && <CommentsList postId={p.id} />}
        </div>
      ))}
    </div>
  );
}

export default Post;

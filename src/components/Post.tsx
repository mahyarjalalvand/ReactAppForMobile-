import { useState } from "react";
import { usePostValue } from "../context/PostContext";
import { TfiCommentAlt } from "react-icons/tfi";
import CommentsList from "./CommentsModal";
// import PostCard from "./PostCard";

function Post() {
  const { posts } = usePostValue();
  const [postId, setPostId] = useState<number | null>(null);

  return (
    <div className="w-full relative flex flex-wrap justify-end gap-3 rounded-2xl ">
      {posts.map((p) => (
        // <PostCard key={p.id} post={p} />
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
                onClick={() => setPostId(p.id === postId ? null : p.id)}
              />
            </div>
          </div>
        </div>
      ))}

      {postId !== null && (
        <CommentsList postId={postId} setPostId={setPostId} />
      )}
    </div>
  );
}
export default Post;

import { useState } from "react";
import { usePostValue } from "../context/PostContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function CommentsList({ postId }: { postId: number }) {
  const { posts } = usePostValue();
  const [likedComment, setLikeComment] = useState(false);
  const post = posts.find((p) => p.id === postId);

  const toggleHandler = () => {
    setLikeComment((likedComment) => !likedComment);
  };

  return (
    <div className="size-full bg-black/10">
      <div className="absolute z-50 left-0 w-full h-full rounded-2xl p-2 bg-secondary2 text-white flex flex-col items-end">
        {post ? (
          post.comment && post.comment.length > 0 ? (
            post.comment.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center justify-between px-4 py-3 bg-primary2 w-full rounded-xl">
                <div className="cursor-pointer ">
                  <button onClick={toggleHandler}></button>
                </div>
                <div className="flex flex-col items-end  gap-3 ">
                  <div className="flex justify-between gap-3">
                    <div className="flex flex-col items-end">
                      <span>{comment.auther}</span>
                      <span className="text-xs text-primary">روز قبل 10</span>
                    </div>
                    <div>
                      <img src={comment.avatar} alt="" />
                    </div>
                  </div>

                  <div>
                    <p>{comment.text}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>هیچ کامنتی وجود ندارد</p>
          )
        ) : (
          <p>پست پیدا نشد</p>
        )}
      </div>
    </div>
  );
}

export default CommentsList;

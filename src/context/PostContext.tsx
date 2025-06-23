import { createContext, useContext, useState, type ReactNode } from "react";
import postDatas from "../constant/post";
import type { PostType } from "../types/types";

interface PostContextType {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}


const PostContext = createContext<PostContextType | null>(null);

function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<PostType[]>(postDatas);
  // console.log(posts)
  return <PostContext.Provider value={{ posts, setPosts }}>{children}</PostContext.Provider>;
}
export const usePostValue = () => {
  const context = useContext(PostContext);
  if(!context){
    throw new Error("استیت مقدار دهی نشده")
  }
  return context
}
export default PostProvider;

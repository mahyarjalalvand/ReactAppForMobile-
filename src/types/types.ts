export interface CommentType {
  id: number;
  auther: string;
  text:string;
  avatar: string;
  like?:number;
  reply?: CommentType[];
}
export interface PostType {
  id: number;
  auther: string;
  avatar: string;
  postImage: string;
  comment?: CommentType[];
}

interface Comment {
  id: number;
  auther: string;
  text:string;
  avatar: string;
  like:number;
  replay?: Comment[];
}
export interface PostType {
  id: number;
  auther: string;
  avatar: string;
  postImage: string;
  comment?: Comment[];
}

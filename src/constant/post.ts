import avatar1 from "../assets/images/Frame 24.png";
import postImage1 from "../assets/images/postImage1.jpg";
import type { PostType } from "../types/types";

const postDatas: PostType[] = [
  {
    id: 1,
    auther: "علیرضا محمدی",
    avatar: avatar1,
    postImage: postImage1,
    comment: [
      {
        id: 1,
        auther: "ممد",
        text: "سلام کافه خیلی خوبی بود",
        avatar: avatar1,
        like: 5,
      },
    ],
  },
  {
    id: 2,
    auther: "علیرضا محمدی",
    avatar: avatar1,
    postImage: postImage1,
    comment: [],
  },
  {
    id: 3,
    auther: "علیرضا محمدی",
    avatar: avatar1,
    postImage: postImage1,
    comment: [],
  },
  {
    id: 4,
    auther: "علیرضا محمدی",
    avatar: avatar1,
    postImage: postImage1,
    comment: [],
  },
  {
    id: 5,
    auther: "علیرضا محمدی",
    avatar: avatar1,
    postImage: postImage1,
    comment: [],
  },
];
export default postDatas;

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
        auther: "رضا حسینی",
        text: "سلام کافه خیلی خوبی بود سلام کافه خیلی خوبی بود  سلام کافه خیلی خوبی بود  سلام کافه خیلی خوبی بود ",
        avatar: avatar1,
        like: 5,
        reply: [
          {
            id: 1,
            auther: "پویا رضوی",
            text: "موافقم",
            avatar: avatar1,
            like: 0,
            reply:[]
          },
        ],
      },
      {
        id: 2,
        auther: "امیر رحیمی",
        text: "سلام کافه خیلی خوبی بود سلام کافه خیلی خوبی بود  سلام کافه خیلی خوبی بود  ",
        avatar: avatar1,
        like: 5,
        reply: [],
      },
      {
        id: 3,
        auther: "لیلا احمدی",
        text: "سلام کافه خیلی خوبی بود   ",
        avatar: avatar1,
        like: 5,
        reply: [],
      },
      {
        id: 4,
        auther: "میلاد کریمی",
        text: "سلام کافه خیلی خوبی بود سلام کافه خیلی خوبی بود  سلام کافه خیلی خوبی بود  سلام کافه خیلی خوبی بود ",
        avatar: avatar1,
        like: 5,
        reply: [
           {
            id: 1,
            auther: "حسن حسنی ",
            text: "موافقم",
            avatar: avatar1,
            like: 1,
          },
        ],
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
    auther: "علیرضا احمدی",
    avatar: avatar1,
    postImage: postImage1,
    comment: [
      {
        id: 1,
        auther: "جواد جوادی",
        text: "سلام کافه خیلی خوبی بود سلام کافه خیلی خوبی بود  سلام کافه خیلی خوبی بود  سلام کافه خیلی خوبی بود ",
        avatar: avatar1,
        like: 5,
        reply: [],
      },
    ],
  },
];
export default postDatas;

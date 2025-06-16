import { FiSearch } from "react-icons/fi";
import { GrNext } from "react-icons/gr";

function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="border w-6/7 border-black/30 rounded-full h-12 pr-2 flex justify-end items-center gap-1 focus-within:border-black transition-colors duration-300">
        <input type="text" placeholder="جستجو کنید" className="text-right size-full  outline-0" />
        <button>
          <FiSearch size={"25px"} color="black" />
        </button>
      </div>
      <div className="flex w-1/7 justify-end items-center  ">
        <div className="bg-primary rounded-full p-2 w-fit cursor-pointer">
          <GrNext size={"20px"} />
        </div>
      </div>
    </div>
  );
}

export default Header;

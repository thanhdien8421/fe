import { FcSearch } from "react-icons/fc";
import { IoSearchSharp } from "react-icons/io5";

function SearchInput() {
  return (
    <div className=" w-[500px] h-10 mt-[50px] m-auto relative">
      <input
        placeholder="Tìm theo Vị trí"
        className="flex  w-full rounded-md border focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
      />
      <div className="absolute top-0 right-0 h-10 w-[35px] group  flex  items-center cursor-pointer peer-hover:">
        <IoSearchSharp size={20} className="group-hover:hidden" />
        <FcSearch
          size={20}
          color="black"
          className="hidden group-hover:block"
        />
      </div>
    </div>
  );
}

export default SearchInput;

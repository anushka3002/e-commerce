import { Link } from "react-router-dom";

const Navbar = () => {

    return(
        <>
        <div className="w-full h-[80px] text-[white] bg-[black]">
            <p className="pt-4 font-semibold pl-6 text-[30px]">e-Commerce</p>
            <div className="flex justify-between align-left absolute right-10 top-7 flex px-2 rounded-[10px]">
            <Link to={"/searchpage"}><p className="text-[white] bg-[black]">Search</p></Link>
            </div>   
        </div>
        </>
    )
}

export default Navbar;
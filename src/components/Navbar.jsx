import { Link } from "react-router-dom";


const Navbar = () => {
    return(
        <>
        <div className="w-full h-[80px] text-[white] bg-[black]">
            <p className="pt-4 font-semibold pl-6 text-[30px]">Masai Mart</p>
            <div className="w-[200px] flex justify-between align-left absolute right-10 top-6">
            <Link to={"/products"}><p className="font-semibold">Products</p></Link>
            <Link to={"/wishlist"}><p className="font-semibold">Wishlist</p></Link>
            </div>   
        </div>
        </>
    )
}

export default Navbar;
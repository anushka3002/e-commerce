import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Products from "./Products";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [mainData, setMainData] = useState([]);
  const [categoryName, setCategoryName] = useState("")
  const [wishListData, setWishListData] = useState([]);
  const [count, setCount] = useState(12);
  let listData = JSON.parse(localStorage.getItem("categoryName")) || "";

  useEffect(() => {
    axios
      .get(
        `https://dummyjson.com/products/categories`
      )
      .then((res) => {
        setData(res.data);
        setMainData(res.data);
        console.log(res.data,"res")
      });
  }, [count]);

  const handleClick = (x) => {
    const filterData = mainData.filter((el) =>
      el.category.toLowerCase() == x.toLowerCase()
    );
    setData(filterData);
  };

  const sortData = (value) => {
    var sortedData = [...data];
    if (value == "lowToHigh") {
      sortedData.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (value == "highToLow") {
      sortedData.sort((a, b) => {
        return b.price - a.price;
      });
    }
    setData(sortedData);
  };

  const filterData = ["kids", "men", "women", "homedecor"];

  const pageNext = () => {
    if (count <= data.length) {
      setCount((count) => count + 12);
    }
  };
  const appendData = (e) => {
    listData = ""
    listData = e;
    localStorage.setItem("categoryName", JSON.stringify(listData));
  };

  console.log(listData,"listdata")
  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <div className="grid grid-cols-3 mx-auto items-center px-3 pt-10 gap-[70px]">
            {data.map((e, i) => {
              return (
               <div onClick={()=>appendData(e)} key={e.id}>
                   <Link to={"/products"}><div class="cursor-pointer max-w-sm rounded shadow-lg border rounded-[10px]">
                    <div className="px-10 py-6">
                      <div className="font-bold text-xl mb-2">{e}</div>
                    </div>
                    <div class="px-6 pt-0 pb-2 flex justify-between">
                    </div>
                  </div></Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [mainData, setMainData] = useState([]);
  const [wishListData, setWishListData] = useState([]);
  const [count, setCount] = useState(12);
  let listData = JSON.parse(localStorage.getItem("wishlistData")) || [];

  useEffect(() => {
    axios
      .get(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=${data.length}`
      )
      .then((res) => {
        setData(res.data.data);
        setMainData(res.data.data);
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
  const handleWishlist = (e) => {
    listData.push(e);
    localStorage.setItem("wishlistData", JSON.stringify(listData));
  };

  const pageNext = () => {
    if (count <= data.length) {
      setCount((count) => count + 12);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <div className="border bg-[#f3f7fd] mt-10 rounded-[10px] px-3">
            <div className="w-[200px]">
              <p className="font-bold mb-5">Filter</p>
              <div className="text-semibold text-center">
                <p onClick={()=>setData(mainData)} className="cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  All
                </p>
                {filterData.map((x) => (
                  <p
                    key={x}
                    onClick={() =>{ handleClick(x)}}
                    className="cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {x}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold mt-5">Sort</p>
              <select onChange={(e) => sortData(e.target.value)}>
                <option value="lowToHigh">Low to high</option>
                <option value="highToLow">High to low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 mx-auto items-center px-10 pt-10 gap-8">
            {data.map((e, i) => {
              return (
                <div key={e.id}>
                  <div class="max-w-sm rounded shadow-lg border rounded-[10px]">
                    <img className="w-full" src={e.image} alt="Product" />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{e.brand}</div>
                      <p class="text-gray-700 text-base">{e.title}</p>
                    </div>
                    <div class="px-6 pt-0 pb-2 flex justify-between">
                      <div>
                        <span class="inline-block rounded-full py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          ${e.price}.00
                        </span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {e.category}
                        </span>
                      </div>
                      <div>
                        <span class="inline-block rounded-full cursor-pointer px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          <img
                            className=""
                            onClick={() => handleWishlist(e)}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoBhKAylRmoKm3M9zHkHnGqlWpTZuxsoVf4QVutNnt1aMQGgm8ul69pIlhncZ2lbG0cDk&usqp=CAU"
                            width="25px"
                            height="25px"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="items-end justify-end absolute right-10 my-4">
          <button
            onClick={pageNext}
            className="border px-4 py-2 bg-[black] text-[white] rounded-[7px]"
          >
            Show more
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Products = () => {
  const [data, setData] = useState([])
  let categoryName = JSON.parse(localStorage.getItem("categoryName")) || "";
  console.log(categoryName,"pri")
  useEffect(() => {
    axios
      .get(
        `https://dummyjson.com/products/category/${categoryName}`
      )
      .then((res) => {
        setData(res.data.products);
        console.log(res.data.products,"product data");
      });
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <div className="grid grid-cols-3 mx-auto items-center px-2 pt-10 gap-[70px]">
            {data?.map((e, i) => {
              return (
                <div key={e.id}>
                  <div class="max-w-sm rounded shadow-lg border rounded-[10px]">
                    <img className="w-full w-[250px] h-[250px]" src={e.images[0]} alt="Product"/>
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

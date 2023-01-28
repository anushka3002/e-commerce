import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const SearchPage = () =>{

    const [data,setData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    let flag = false;

      const handleChange = (e) => {
        setSearchValue(e)
        };
  
      const onSubmit = () =>{
        if(searchValue.length!=0){
            axios
            .get(
              `https://dummyjson.com/products/search?q=${searchValue}`
            )
            .then((res) => {
              setData(res.data.products);
            });
        }
      }

      useEffect(()=>{
        if(data.length>0){
            flag = true;
        }  
      },[])

    return(
    <>
    <div>
        <Navbar /> 
        <div className=" mt-4 w-[250px] flex justify-between align-center mx-auto border bg-white flex px-2 rounded-[10px]">
            <input
            className="text-[black] focus:none outline:none"
            type="text"
            placeholder="Search here"
            onChange={(e)=>handleChange(e.target.value)
            }
            />
            <div className="flex px-5 bg-[grey] hover:bg-[grey] py-3 rounded-[10px] ml-20">
            <button onClick={onSubmit} className="text-[black] font-bold">Search</button>
            </div>
            </div>   
        <div className="flex">
        {flag==true && searchValue.length!=0 && data.length==0? <div className="text-center mx-auto mt-[200px] text-[23px]">Oops! No Result available</div> :
          <div className="grid grid-cols-3 mx-auto items-center px-2 pt-10 gap-[70px]">
            { data?.map((e, i) => {
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
          </div>}
        </div>
      </div>
    </>
      )
}

export default SearchPage
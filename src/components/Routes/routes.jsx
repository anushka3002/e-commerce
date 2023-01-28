import {Routes,Route} from "react-router"
import Homepage from "../Homepage"
import Products from "../Products"
import SearchPage from "../SearchPage"

export const Router=()=>{
    return(
    <>
    <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route exact path="/searchpage" element={<SearchPage/>}/>
    </Routes>
    </>
    )
}

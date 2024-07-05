import { Route , Routes } from "react-router-dom";
import CommonAuth from "./Pages/auth-pages/CommonAuth";
import Home from "./Pages/product-management-pages/Home";
import Product from "./Pages/product-management-pages/Product";

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<CommonAuth isLogin={false}/>}/>
          <Route path="/login" element={<CommonAuth isLogin={true}/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/product" element={<Product/>}/>
        </Routes>
    </>
  )
}

export default App

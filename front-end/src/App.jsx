import { Route , Routes } from "react-router-dom";
import CommonAuth from "./Pages/auth-pages/CommonAuth";
import Home from "./Pages/product-management-pages/Home";
import Product from "./Pages/product-management-pages/Product";
import PrivatePageWrapper from "./components/PrivatePageWrapper";

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<CommonAuth isLogin={false}/>}/>
          <Route path="/login" element={<CommonAuth isLogin={true}/>}/>
          <Route element={<PrivatePageWrapper/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/product" element={<Product/>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App

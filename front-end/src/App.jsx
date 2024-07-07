import { Route , Routes } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import CommonAuth from "./Pages/auth-pages/CommonAuth";
import Home from "./Pages/product-management-pages/Home";
import Product from "./Pages/product-management-pages/Product";
import PrivatePageWrapper from './components/wrappers/PrivatePageWrapper'

function App() {

  return (
    <>
      <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<CommonAuth isLogin={false}/>}/>
          <Route path="/login" element={<CommonAuth isLogin={true}/>}/>
          <Route element={<PrivatePageWrapper/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/product/:id" element={<Product/>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App

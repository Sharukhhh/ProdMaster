import { Route , Routes } from "react-router-dom";
import CommonAuth from "./Pages/auth-pages/CommonAuth";

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<CommonAuth isLogin={false}/>}/>
          <Route path="/login" element={<CommonAuth isLogin={true}/>}/>
        </Routes>
    </>
  )
}

export default App

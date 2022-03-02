import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ContextProvider } from "../context/BaseContext";
import Home from "../pages";
import MyBook from "../pages/MyBook";
import { getRequest } from "../utils/GlobalFunc";

export default function Router() {
  const context = useContext(ContextProvider)

  async function getCategory() {
    const res = await getRequest('fee-assessment-categories')
    context.setCategory(res.data)
    localStorage.setItem('category',JSON.stringify(res.data))
  }

  useEffect(()=>{
    getCategory()
  },[])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mybook" element={<MyBook />} />
    </Routes>
  );
}
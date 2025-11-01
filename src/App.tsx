 import { Routes, Route } from "react-router-dom";
 import Home from "@/pages/Home";
 import ModuleDetail from "@/pages/ModuleDetail";
 import { useState } from "react";
 import { AuthContext } from '@/contexts/authContext';
 import CustomCursor from "@/components/CustomCursor";
 
 export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

   return (
     <AuthContext.Provider
       value={{ isAuthenticated, setIsAuthenticated, logout }}
     >
       {/* 全局自定义光标 */}

       
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/module/:id" element={<ModuleDetail />} />
         <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
       </Routes>
     </AuthContext.Provider>
   );
}

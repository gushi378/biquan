import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 监听滚动事件，改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滚动到指定区域
  const scrollToSection = (id: string) => {
    // 先导航到首页，然后滚动到指定区域
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        // 确保页面加载完成后再滚动
        window.scrollTo({
          top: section.offsetTop - 80, // 考虑导航栏高度
          behavior: 'smooth'
        });
        setIsMobileMenuOpen(false);
      }
    }, 300); // 增加延迟确保页面加载完成
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
   <div className="flex items-center w-full">
           {/* Logo/标题 */}
   <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
     <i className="fa-brands fa-binance text-blue-500 text-2xl"></i>
   </div>
   
            {/* 返回按钮 - 仅在模块详情页显示 */}
            {location.pathname.startsWith('/module/') && (
              <button 
                onClick={() => navigate('/')}
                className="hidden md:flex items-center text-gray-300 hover:text-white transition-colors mr-6"
              >
                <i className="fa-solid fa-arrow-left mr-1"></i>
                <span>返回</span>
              </button>
            )}
            
   <div className="flex items-center justify-center flex-1 cursor-pointer" onClick={() => scrollToSection('hero')}>
      <span className="hidden text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">币圈萌新之旅</span>
   </div>

           {/* 桌面导航 */}
           <nav className="hidden md:flex items-center space-x-8">
             <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-blue-400 font-medium transition-colors">首页</button>
   <button onClick={() => scrollToSection('modules')} className="text-gray-300 hover:text-blue-400 font-medium transition-colors">知识点</button>
   <button onClick={() => scrollToSection('resources')} className="text-gray-300 hover:text-blue-400 font-medium transition-colors">工具资源</button>
            </nav>

            {/* 移动端菜单按钮 */}
            <button 
              className="md:hidden text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
         </div>

        {/* 移动端导航菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800 animate-in slide-in-from-top bg-gray-900 rounded-b-xl">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-blue-400 font-medium transition-colors py-2 px-4">首页</button>
  <button onClick={() => scrollToSection('modules')} className="text-gray-300 hover:text-blue-400 font-medium transition-colors py-2 px-4">知识点</button>
  <button onClick={() => scrollToSection('resources')} className="text-gray-300 hover:text-blue-400 font-medium transition-colors py-2 px-4">工具资源</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
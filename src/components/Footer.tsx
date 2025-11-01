import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* 主要内容区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* 品牌信息 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
        <i className="fa-brands fa-binance text-blue-500 text-2xl"></i>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">币圈萌新之旅</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              专为币圈新手打造的一站式学习平台，从基础概念到高级技巧，助你快速掌握加密货币投资与技术知识。
            </p>
             <div className="flex space-x-4">
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                 <i className="fa-brands fa-twitter"></i>
               </a>
               <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                 <i className="fa-brands fa-telegram"></i>
               </a>
               <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                 <i className="fa-brands fa-discord"></i>
               </a>
               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                 <i className="fa-brands fa-github"></i>
               </a>
             </div>


          </div>

          {/* 快速导航 */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => {
                window.location.href = '/#hero';
                window.scrollTo({top: 0, behavior: 'smooth'});
              }} className="text-gray-400 hover:text-blue-400 transition-colors">首页</button></li>
               <li><button onClick={() => {
                 window.location.href = '/#modules';
                 window.scrollTo({top: 0, behavior: 'smooth'});
               }} className="text-gray-400 hover:text-blue-400 transition-colors">学习点</button></li>
              <li><button onClick={() => {
                window.location.href = '/#resources';
                window.scrollTo({top: 0, behavior: 'smooth'});
              }} className="text-gray-400 hover:text-blue-400 transition-colors">工具资源</button></li>
            </ul>
          </div>

          {/* 风险提示 */}
          <div>
            <h4 className="text-white font-semibold mb-4">风险提示</h4>
            <p className="text-gray-400 text-sm mb-4">
              加密货币投资存在高风险，本网站内容仅供学习参考，不构成任何投资建议。请谨慎评估风险，理性决策。
            </p>
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <p className="text-xs text-gray-500">
               © {currentYear} 币圈萌新之旅. 所有内容仅供学习参考.
              </p>
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
               &copy; {currentYear} 币圈萌新之旅. 保留所有权利.
            </p>
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-500 hover:text-gray-300 transition-colors">隐私政策</button>
              <button className="text-gray-500 hover:text-gray-300 transition-colors">使用条款</button>
              <button className="text-gray-500 hover:text-gray-300 transition-colors">风险提示</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
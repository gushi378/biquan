import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gray-900 text-white">
      {/* 背景渐变和装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.15),transparent_40%)] z-0"></div>
      
      {/* 装饰性图形 */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* 标题和副标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
  币圈萌新之旅<br className="md:hidden" />从入门到精通
</h1>
             <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              专为币圈新手打造的系统化学习平台，从基础概念到高级技巧，助你快速掌握加密货币投资与技术知识，开启区块链世界之旅。
            </p>
          </motion.div>
          
          {/* 行动号召按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => {
                const modulesSection = document.getElementById('modules');
                if (modulesSection) {
                  modulesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              开始学习之旅
              <i className="fa-solid fa-rocket ml-2"></i>
            </button>
            <button 
              className="px-8 py-3 rounded-full bg-gray-800 text-white font-medium shadow-md hover:shadow-lg transition-all border border-gray-700 transform hover:-translate-y-0.5"
              onClick={() => {
                const resourcesSection = document.getElementById('resources');
                if (resourcesSection) {
                  resourcesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              币圈工具资源
              <i className="fa-solid fa-wrench ml-2"></i>
            </button>
          </motion.div>
          
          {/* 统计数据 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-4 md:gap-8"
          >
            <div className="text-center">
               <p className="text-3xl md:text-4xl font-bold text-blue-400">12+</p>
              <p className="text-sm text-gray-400 mt-1">学习模块</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-indigo-400">30+</p>
              <p className="text-sm text-gray-400 mt-1">推荐平台</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-purple-400">6+</p>
              <p className="text-sm text-gray-400 mt-1">空投类型</p>
            </div>
           </motion.div>
             
              {/* ChatGPT提示区域 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-8"
              >
                 <p className="text-gray-400 text-3xl">
                   所有的知识点都可以通过ChatGPT搜索
                 </p>
              </motion.div>
              
              {/* 作者链接区域 */}
              <div 
                className="mt-6 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 border border-blue-500/50"
              >
                <div className="text-white font-bold text-base mr-4">Intel星</div>
                <div className="flex gap-4">
                  <a href="https://x.com/henmiggg" target="_blank" rel="noopener noreferrer" className="flex items-center text-white text-sm hover:underline transition-colors">
                    <i className="fa-brands fa-twitter mr-1.5"></i>
                    <span>推特</span>
                  </a>
                  <a href="https://t.me/henmigg" target="_blank" rel="noopener noreferrer" className="flex items-center text-white text-sm hover:underline transition-colors">
                    <i className="fa-brands fa-telegram mr-1.5"></i>
                    <span>电报</span>
                  </a>
                </div>
              </div>
        </div>
      </div>
    </section>
  );
}
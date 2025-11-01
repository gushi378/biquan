import { motion } from 'framer-motion';
import { CryptoModule } from '@/lib/learningData';
import { useNavigate } from 'react-router-dom';

interface CryptoModuleCardProps {
  module: CryptoModule;
}

export default function CryptoModuleCard({ module }: CryptoModuleCardProps) {
  const navigate = useNavigate();
  // 获取难度级别对应的样式
  const getDifficultyBadge = () => {
    switch(module.difficulty) {
      case 'beginner':
        return <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">入门</span>;
      case 'intermediate':
        return <span className="bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">中级</span>;
      case 'advanced':
        return <span className="bg-red-500/20 text-red-400 text-xs font-semibold px-2 py-1 rounded-full">高级</span>;
      default:
        return <span className="bg-gray-500/20 text-gray-400 text-xs font-semibold px-2 py-1 rounded-full">未知</span>;
    }
  };

  // 获取分类对应的图标
  const getCategoryIcon = () => {
    switch(module.category) {
      case 'blockchain':
        return <i className="fa-solid fa-link text-blue-400"></i>;
      case 'tools':
        return <i className="fa-solid fa-wrench text-cyan-400"></i>;
      case 'airdrops':
        return <i className="fa-solid fa-gift text-purple-400"></i>;
      case 'mining':
        return <i className="fa-solid fa-server text-green-400"></i>;
      case 'exchange':
        return <i className="fa-solid fa-chart-line text-orange-400"></i>;
      case 'nft':
        return <i className="fa-solid fa-image text-pink-400"></i>;
      case 'development':
        return <i className="fa-solid fa-code text-blue-400"></i>;
      case 'community':
        return <i className="fa-solid fa-users text-indigo-400"></i>;
      case 'design':
        return <i className="fa-solid fa-palette text-purple-400"></i>;
      case 'marketing':
        return <i className="fa-solid fa-bullhorn text-yellow-400"></i>;
      default:
        return <i className="fa-solid fa-question text-gray-400"></i>;
    }
  };

  return (
    <motion.div
      className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-blue-900/50 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* 卡片图片 */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={module.imageUrl} 
          alt={module.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">

          {getDifficultyBadge()}
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-gray-900/80 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
            <i className="fa-solid fa-fire mr-1 text-orange-400"></i>{module.popularity}% 热度
          </span>
        </div>
      </div>

      {/* 卡片内容 */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center">
            {getCategoryIcon()}
            <span className="ml-2">{module.title}</span>
          </h3>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {module.learningContent}
        </p>

        {/* 推荐网站 */}
        <div className="mb-4">
          <h4 className="text-xs text-gray-400 mb-2 flex items-center">
            <i className="fa-solid fa-link mr-1"></i>推荐网站
          </h4>
          <div className="space-y-2">
            {module.recommendedWebsites.map((site, index) => (
              <a 
                key={index}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors group/link"
              >
                <i className="fa-solid fa-external-link text-xs mr-2 opacity-70"></i>
                <span className="truncate">{site.name}</span>
                <span className="ml-auto text-gray-500 text-xs group-hover/link:text-gray-400 transition-colors">
                  {site.description}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 搜索关键词 */}
        <div className="mb-4">
          <h4 className="text-xs text-gray-400 mb-2 flex items-center">
            <i className="fa-solid fa-search mr-1"></i>搜索关键词
          </h4>
          <div className="flex flex-wrap gap-2">
            {module.searchKeywords.map((keyword, index) => (
              <span 
                key={index}
                className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 进入学习按钮 */}
           <div className="mt-auto pt-4">
           <button 
  className="w-3/4 mx-auto py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm font-medium flex items-center justify-center"
  onClick={() => {
    navigate(`/module/${module.id}`);
  }}
>
  开始学习
  <i className="fa-solid fa-arrow-right ml-1"></i>
</button>
           </div>
      </div>
    </motion.div>
  );
}
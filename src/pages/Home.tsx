import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CryptoModuleCard from '@/components/LearningPathCard';
import Footer from '@/components/Footer';
import { cryptoModulesData, airdropTypesData } from '@/lib/learningData';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  // 监听滚动事件，控制回到顶部按钮显示/隐藏
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 回到顶部函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 分类工具资源数据
  const toolCategories = [
    {
      id: 'data-analysis',
      title: '数据分析 & 区块链信息',
      icon: 'fa-chart-line',
      description: '提供链上数据监控、行情分析、交易追踪等工具，帮助用户获取加密货币和区块链项目的实时与历史数据。',
      tools: [
        { name: 'Messari', description: '全面加密市场数据分析平台，支持项目研究、代币经济分析、链上数据可视化。', url: 'https://messari.io' },
        { name: 'RootData', description: '加密领域投融资数据库，追踪机构投资、项目融资动态。', url: 'https://www.rootdata.com' },
        { name: 'L2Beat', description: '二层网络数据分析平台，追踪 L2 生态 TVL、交易数据与安全状况。', url: 'https://l2beat.com' },
        { name: 'Dune', description: '链上数据可视化工具，可自定义 SQL 查询生成实时看板。', url: 'https://dune.com' },
        { name: 'DeFiLlama', description: '全球 DeFi 数据汇总平台，覆盖多链 TVL、收益率、协议数据。', url: 'https://defillama.com' },
        { name: 'Arkham Intelligence', description: '链上地址分析与情报平台。', url: 'https://arkhamintelligence.com' },
        { name: 'Santiment', description: '链上情绪、社交热度与链上数据追踪。', url: 'https://santiment.net' },
        { name: 'TokenTerminal', description: 'Web3 项目财务与链上数据研究工具。', url: 'https://tokenterminal.com' },
        { name: '非小号', description: '中文加密货币行情与项目数据平台。', url: 'https://www.feixiaohao.com' },
        { name: '律动 Odaily', description: '中文 Web3 行业资讯与市场数据。', url: 'https://www.odaily.news' },
        { name: 'Dextools', description: '实时 DEX 交易数据与图表分析工具。', url: 'https://www.dextools.io' },
        { name: 'Dexscreener', description: '多链 DEX 行情追踪与分析。', url: 'https://dexscreener.com' },
        { name: 'GMGN.ai', description: '实时链上交易数据、热榜监控与钱包追踪。', url: 'https://gmgn.ai' },
        { name: 'Birdeye', description: 'Solana 生态实时交易与链上情报工具。', url: 'https://birdeye.so' },
        { name: 'Nansen', description: '高级链上数据分析平台，专注于钱包地址分析和资金追踪。', url: 'https://nansen.ai' },
      ]
    },
    {
      id: 'airdrop-platforms',
      title: '空投信息 & 任务平台',
      icon: 'fa-bullseye',
      description: '聚合各类空投活动、任务奖励信息的平台，让用户发现并参与免费的代币获取活动。',
      tools: [
        { name: 'Airdrops.io', description: '空投信息聚合，追踪各类加密项目空投活动。', url: 'https://airdrops.io' },
        { name: 'Galxe', description: 'Web3 任务与身份平台，支持链上任务与活动奖励。', url: 'https://galxe.com' },
        { name: 'Airdrop Alert', description: '早期空投信息与项目活动聚合。', url: 'https://airdropalert.com' },
        { name: 'QuestN', description: '多链 Web3 任务与活动平台。', url: 'https://questn.com' },
        { name: 'Zealy', description: '前身为Crew3，专注社区建设和任务管理的平台。', url: 'https://zealy.io' },
      ]
    },
    {
      id: 'dev-tools',
      title: '技术 & 开发工具',
      icon: 'fa-code',
      description: '提供开发者使用的区块链 SDK、API、合约部署、调试等技术支持工具。',
      tools: [
        { name: 'CryptoZombies', description: 'Solidity 编程游戏化教学平台。', url: 'https://cryptozombies.io' },
        { name: 'Remix Ethereum IDE', description: '智能合约开发与调试工具。', url: 'https://remix.ethereum.org' },
        { name: 'Covalent', description: '链上数据 API 服务。', url: 'https://www.covalenthq.com' },
        { name: 'Etherscan', description: '以太坊区块链浏览器。', url: 'https://etherscan.io' },
        { name: 'freeCodeCamp', description: '免费编程学习平台，提供从基础到高级的编程课程。', url: 'https://www.freecodecamp.org' },
        { name: 'GitHub', description: '全球最大的代码托管平台，可搜索和学习Web3开源项目。', url: 'https://github.com' },
        { name: 'Hardhat', description: '以太坊开发环境和测试框架。', url: 'https://hardhat.org' },
      ]
    },
    {
      id: 'depin-projects',
      title: 'DePIN & 硬件项目',
      icon: 'fa-server',
      description: '去中心化物理基础设施（DePIN）相关项目与硬件设备的信息平台，涉及分布式网络、物联网、节点硬件等。',
      tools: [
        { name: 'Helium', description: '去中心化无线网络代表项目。', url: 'https://helium.com' },
        { name: 'UBI Network', description: 'DePIN 硬件生态，支持闲置算力共享与积分市场。', url: 'https://ubinetwork.ai' },
        { name: 'io.net', description: '分布式GPU计算网络，为AI和机器学习提供算力。', url: 'https://io.net' },
        { name: 'NOS', description: '去中心化存储服务平台。', url: 'https://nos.io' },
      ]
    },
    {
      id: 'nft-platforms',
      title: 'NFT & 创作平台',
      icon: 'fa-palette',
      description: '提供 NFT 铸造、交易、展示，以及数字艺术创作的相关平台和工具。',
      tools: [
        { name: 'Mint.fun', description: 'NFT 铸造平台，支持快速创作与上链。', url: 'https://mint.fun' },
        { name: 'Magic Eden', description: '多链 NFT 交易市场。', url: 'https://magiceden.io' },
        { name: 'NFTGo', description: 'NFT 数据分析与市场情报平台。', url: 'https://nftgo.io' },
        { name: 'Rarity Tools', description: 'NFT 稀有度与价值分析工具。', url: 'https://rarity.tools' },
        { name: 'OpenSea', description: '最大的NFT交易市场，支持多链NFT交易。', url: 'https://opensea.io' },
        { name: 'Blur', description: '高性能NFT交易市场，专注于专业交易者。', url: 'https://blur.io' },
        { name: 'Tensor', description: 'Solana NFT交易市场，提供聚合交易功能。', url: 'https://tensor.trade' },
      ]
    },
    {
      id: 'exchange-learning',
      title: '交易所学习 & Dapp 排行',
      icon: 'fa-graduation-cap',
      description: '提供交易所功能学习、加密交易教学，以及去中心化应用（Dapp）的排行榜与推荐。',
      tools: [
        { name: 'Binance Academy', description: '币安官方学习平台。', url: 'https://academy.binance.com/en' },
        { name: 'OKX 学院', description: 'OKX 官方学习与交易指南。', url: 'https://www.okx.com/academy/zh-cn' },
        { name: 'DappRadar', description: 'Dapp 数据聚合与排名平台。', url: 'https://dappradar.com' },
        { name: 'Zapper', description: '多链资产管理和可视化工具，支持投资组合分析。', url: 'https://zapper.xyz' },
      ]
    },
    {
      id: 'meme-platforms',
      title: '热门 Meme 币发行平台',
      icon: 'fa-rocket',
      description: '专门为 Meme 币发行、交易提供的工具和平台，便于快速创建与参与热门模因项目。',
      tools: [
        { name: 'Bonk.fun (Solana)', description: 'BONK 社区支持的 Meme 币发行平台，集成 Raydium。', url: 'https://bonk.fun' },
        { name: 'Pump.fun (Solana)', description: 'Solana 链 Meme 币快速发行与交易平台。', url: 'https://pump.fun' },
        { name: 'Odin.Fun (Bitcoin Runes)', description: 'Bitcoin Runes 协议 Meme 币发行与交易平台。', url: 'https://odin.fun' },
        { name: 'Four.meme', description: 'Meme 币发行平台，支持链上公平发行模式。', url: 'https://four.meme' },
      ]
    },
    {
      id: 'blockchain-explorers',
      title: '区块链浏览器 & 链上工具',
      icon: 'fa-search',
      description: '区块链浏览器、交易查询、地址监控等基础链上操作工具。',
      tools: [
        { name: 'Blockscout', description: '多链浏览器，支持 EVM 兼容链。', url: 'https://blockscout.com' },
        { name: 'Solscan', description: 'Solana 区块浏览器。', url: 'https://solscan.io' },
        { name: 'BscScan', description: 'BNB Chain 区块浏览器。', url: 'https://bscscan.com' },
        { name: 'Arbiscan', description: 'Arbitrum网络区块浏览器。', url: 'https://arbiscan.io' },
        { name: 'Optimistic Etherscan', description: 'Optimism网络区块浏览器。', url: 'https://optimistic.etherscan.io' },
        { name: 'Polygonscan', description: 'Polygon网络区块浏览器。', url: 'https://polygonscan.com' },
      ]
    },
    {
      id: 'bot-tools',
      title: 'Bot 工具 & 交易辅助',
      icon: 'fa-robot',
      description: '用于自动化交易、行情监控、社群管理的机器人工具，以及相关交易辅助功能。',
      tools: [
        { name: 'Debot.ai', description: '去中心化 AI Bot 创建与交易工具。', url: 'https://debot.ai' },
        { name: 'Slerf.tools', description: 'Meme 币链上监控与数据分析工具。', url: 'https://slerf.tools' },
      ]
    },
    {
      id: 'marketing-design',
      title: '流量营销 & 设计工具',
      icon: 'fa-bullhorn',
      description: '用于Web3内容创作、视觉设计、社交媒体营销和流量获取的工具与平台。',
      tools: [
        { name: 'Canva', description: '在线设计工具，提供丰富的模板和设计元素。', url: 'https://www.canva.com' },
        { name: 'PromptHub', description: 'Midjourney提示词案例库，帮助生成优质AI图像。', url: 'https://prompthub.com' },
        { name: 'Hootsuite', description: '多平台社交媒体管理和分析工具。', url: 'https://hootsuite.com' },
        { name: 'Buffer', description: '社交媒体内容调度和分析平台。', url: 'https://buffer.com' },
      ]
    },
    {
      id: 'wallet-security',
      title: '钱包安全 & 资产管理',
      icon: 'fa-shield-alt',
      description: '提供加密货币钱包、安全存储、资产管理和安全防护的工具与服务。',
      tools: [
        { name: 'MetaMask', description: '最流行的以太坊钱包浏览器扩展。', url: 'https://metamask.io' },
        { name: 'Phantom', description: 'Solana生态系统中最受欢迎的钱包之一。', url: 'https://phantom.app' },
        { name: 'Ledger', description: '领先的硬件钱包品牌，提供冷存储解决方案。', url: 'https://www.ledger.com' },
        { name: 'Revoke.cash', description: '用于撤销不必要的代币授权，增强资产安全。', url: 'https://revoke.cash' },
        { name: 'Wallet Guard', description: '检测恶意合约和钓鱼链接的安全工具。', url: 'https://walletguard.app' },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* 导航栏 */}
      <Navbar />
      
      <main className="flex-grow">
        {/* 英雄区域 - 添加ID用于导航 */}
        <section id="hero">
          <Hero />
        </section>
        
        {/* 学习模块展示 */}
        <section id="modules" className="py-16 md:py-24 bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                 <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">知识点</h2>
                <p className="text-gray-300">
                  从基础到进阶，系统化学习币圈知识，每个模块包含详细知识点和推荐学习资源
                </p>
              </motion.div>
            </div>
            
            {/* 学习模块卡片网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {cryptoModulesData.map((module) => (
                <CryptoModuleCard 
                  key={module.id} 
                  module={module} 
                />
              ))}
            </div>
          </div>
        </section>

        
        {/* 工具资源汇总 */}
        <section id="resources" className="py-16 md:py-24 bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">币圈工具资源</h2>
                <p className="text-gray-300">
                  精选币圈必备工具和学习资源，助你快速入门并精通各种操作技巧
                </p>
              </motion.div>
            </div>
            
              <div className="space-y-4">
                {toolCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                      {/* 分类标题栏 - 可点击展开/折叠 */}
                      <button
                        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                        onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                      >
                        <div className="flex items-center">
                          <i className={`fa-solid ${category.icon} text-blue-400 mr-3 text-xl`}></i>
                          <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                          <span className="ml-3 bg-gray-700 text-gray-400 text-xs px-2 py-1 rounded-full">
                            {category.tools.length} 个工具
                          </span>
                        </div>
                        <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${openCategory === category.id ? 'rotate-180' : ''}`}></i>
                      </button>
                      
                       {/* 分类描述 - 始终可见 */}
                      <div className="px-4 pb-2">
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      </div>
                      
                      {/* 工具列表 - 展开/折叠动画 */}
                      <motion.div
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ 
                          maxHeight: openCategory === category.id ? '1000px' : 0,
                          opacity: openCategory === category.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                         <div className="px-4 pb-4 pt-2 space-y-2">
                          {category.tools.map((tool, toolIndex) => (
                            <a
                              key={toolIndex}
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-900/50 transition-all group"
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                  {tool.name}
                                </span>
                                <i className="fa-solid fa-external-link text-gray-500 group-hover:text-blue-400 transition-colors"></i>
                              </div>
                              <span className="text-gray-400 text-sm mt-1 line-clamp-2">{tool.description}</span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
          </div>
        </section>
        



      </main>

      
      {/* 页脚 */}
       <Footer />
       
       {/* 回到顶部按钮 */}
       <button
         onClick={scrollToTop}
  className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110 focus:outline-none z-50 ${
    showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
  }`}
         aria-label="回到顶部"
       >
         <i className="fa-solid fa-arrow-up"></i>
       </button>
     </div>
  );
}
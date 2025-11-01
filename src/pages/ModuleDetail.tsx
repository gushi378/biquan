import { useParams, useNavigate } from 'react-router-dom';
import { cryptoModulesData } from '@/lib/learningData';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { useEffect } from 'react';

export default function ModuleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 页面加载或模块ID变化时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // 查找当前模块数据
  const module = cryptoModulesData.find(item => item.id === id);
  
  if (!module) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">模块未找到</h2>
            <p className="text-gray-400 mb-6">抱歉，请求的学习模块不存在或已被移除</p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              返回首页
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // 获取难度级别对应的样式和文本
  const getDifficultyInfo = () => {
    switch(module.difficulty) {
      case 'beginner':
        return { 
          badge: <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">入门</span>,
          text: '适合币圈新手，无需 prior knowledge'
        };
      case 'intermediate':
        return { 
          badge: <span className="bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">中级</span>,
          text: '需要基础区块链知识，适合有一定经验的用户'
        };
      case 'advanced':
        return { 
          badge: <span className="bg-red-500/20 text-red-400 text-xs font-semibold px-2 py-1 rounded-full">高级</span>,
          text: '适合有丰富经验的用户，涉及复杂概念和技术'
        };
      default:
        return { 
          badge: <span className="bg-gray-500/20 text-gray-400 text-xs font-semibold px-2 py-1 rounded-full">未知</span>,
          text: '难度级别未指定'
        };
    }
  };
  
  const difficultyInfo = getDifficultyInfo();
  
  // 获取分类对应的图标和颜色
  const getCategoryInfo = () => {
    const categories = {
      blockchain: { icon: 'fa-link', color: 'text-blue-400', bg: 'bg-blue-900/20' },
      tools: { icon: 'fa-wrench', color: 'text-cyan-400', bg: 'bg-cyan-900/20' },
      airdrops: { icon: 'fa-gift', color: 'text-purple-400', bg: 'bg-purple-900/20' },
      mining: { icon: 'fa-server', color: 'text-green-400', bg: 'bg-green-900/20' },
      exchange: { icon: 'fa-chart-line', color: 'text-orange-400', bg: 'bg-orange-900/20' },
      nft: { icon: 'fa-image', color: 'text-pink-400', bg: 'bg-pink-900/20' },
      development: { icon: 'fa-code', color: 'text-blue-400', bg: 'bg-blue-900/20' },
      community: { icon: 'fa-users', color: 'text-indigo-400', bg: 'bg-indigo-900/20' },
      design: { icon: 'fa-palette', color: 'text-purple-400', bg: 'bg-purple-900/20' },
      marketing: { icon: 'fa-bullhorn', color: 'text-yellow-400', bg: 'bg-yellow-900/20' },
    };
    
    const category = categories[module.category as keyof typeof categories] || 
                     { icon: 'fa-question', color: 'text-gray-400', bg: 'bg-gray-900/20' };
                     
    return (
      <div className={`${category.bg} w-12 h-12 rounded-full flex items-center justify-center`}>
        <i className={`fa-solid ${category.icon} ${category.color} text-xl`}></i>
      </div>
    );
  };
  
  // 模块详细内容 - 根据模块ID返回对应详细信息
  const getModuleDetails = () => {
    // 这里根据不同模块返回不同的详细内容
    switch(module.id) {
      case 'module-1':
         return {
          introduction: "Layer 1 (L1) 区块链是区块链网络的基础层，负责处理和确认交易，并维护网络的安全性。本模块将深入探讨主流公链的结构、共识机制和代币模型。",
          learningContent: [
            "公链基本概念与工作原理",
            "公链的核心组成部分（节点、区块、共识机制、智能合约、原生代币）",
            "主流共识机制对比 (PoW, PoS, DPoS等)",
            "公链的工作原理（以ETH为例）",
            "公链的关键特征（去中心化、可扩展性、安全性、生态繁荣度）",
            "代币经济学 (Tokenomics) 核心要素",
            "主流公链项目对比（Bitcoin、Ethereum、Solana、BNB Chain、Base等）"
          ],
          learningSuggestions: [
            "先理解区块链基本概念，再深入特定公链",
            "通过Messari等平台研究各公链的数据分析报告",
            "关注公链重大升级和生态发展",
            "尝试在测试网上部署简单合约，加深理解"
          ]
        };
      case 'module-2':
        return {
          introduction: "Layer 2 (L2) 是建立在Layer 1区块链之上的扩容解决方案，旨在解决主链拥堵和高Gas费问题。本模块将学习各种扩容方案、Rollup原理及跨链桥接交互。",
          learningContent: [
            "区块链扩容挑战与解决方案概述",
            "Rollup技术原理 (Optimistic Rollup vs ZK-Rollup)",
            "状态通道与侧链技术对比",
            "主流L2项目详解 (Arbitrum, Optimism, zkSync等)",
            "跨链桥接原理与安全考量",
            "L2生态系统与应用场景",
            "L2未来发展趋势与挑战"
          ],
          learningSuggestions: [
            "先理解L1的局限性，再学习L2解决方案的必要性",
            "通过L2Beat等平台比较不同L2项目的性能和安全性",
            "实际体验不同L2的交互流程，感受速度和费用差异",
            "关注以太坊官方对L2的规划和支持"
          ]
        };
      case 'module-3':
        return {
          introduction: "钱包是进入Web3世界的门户，掌握钱包使用和链上操作是币圈入门的基础技能。本模块将学习主流钱包的使用方法、RPC配置和跨链桥操作。",
          learningContent: [
            "加密货币钱包类型与原理 (热钱包、冷钱包、多签钱包)",
            "MetaMask安装、配置与高级功能",
            "Phantom钱包与Solana生态交互",
            "钱包安全最佳实践 (助记词管理、私钥保护)",
            "RPC节点配置与自定义网络添加",
            "主流跨链桥使用方法与风险防范",
            "链上交易查询与故障排查"
          ],
          learningSuggestions: [
            "先使用测试网熟悉钱包操作，再处理真实资产",
            "建立钱包安全意识，不轻易泄露助记词和私钥",
            "学习识别钓鱼网站和恶意链接",
            "尝试不同类型的钱包，了解各自优缺点"
          ]
        };
            case 'module-4':
          return {
            introduction: "空投任务平台是连接加密货币项目与潜在用户的桥梁，通过完成简单任务获取项目代币奖励。本模块将介绍主流空投任务平台的使用方法和安全策略。",
            learningContent: [
              "空投任务平台的基本概念与作用 - 帮助项目获取早期用户，用户获得免费代币",
              "Galxe平台详解 - 最大的Web3凭证网络，支持多链任务和空投",
              "Zealy平台使用指南 - 前身为Crew3，专注社区建设和任务管理",
              "TaskOn平台介绍 - 一站式任务聚合，提供丰富的项目任务",
              "空投任务的常见类型 - 社交媒体任务、链上交互任务、邀请任务等",
              "判别空投任务真伪的实用方法 - 避免钓鱼和诈骗风险"
            ],
            learningSuggestions: [
              "创建专门的空投任务钱包，与主资产钱包分离以保障安全",
              "先从一个平台（如Galxe）开始熟悉操作流程",
              "定期记录已完成任务，建立自己的空投日历",
              "关注项目官方社交媒体，获取第一手空投信息",
              "设置任务提醒，避免错过重要空投机会"
            ]
          };
        case 'module-5':
          return {
            introduction: "DePIN (Decentralized Physical Infrastructure Networks) 是通过区块链激励构建的物理基础设施网络。本模块将学习DePIN的硬件设备、挖矿机制和UBI等典型项目。",
            learningContent: [
              "什么是DePIN？ - 去中心化物理基础设施网络的概念和特点",
              "DePIN的核心价值 - 将物理世界资产与区块链经济模型结合",
              "DePIN硬件设备类型 - 不同项目所需的专用和通用硬件设备",
              "DePIN挖矿机制 - 贡献物理资源获取代币奖励的工作原理",
              "什么是UBI项目？ - 全民基本收入模式的DePIN平台解析",
              "Helium网络详解 - 去中心化无线网络的先驱项目",
              "DePIN经济模型 - 代币分配、激励机制和可持续性设计",
              "DePIN与传统云服务的区别 - 去中心化vs中心化的优劣对比",
              "常见DePIN应用场景 - 网络覆盖、数据存储、计算资源共享等",
              "参与DePIN的基本流程 - 从设备选择到获取收益的完整指南"
            ],
            learningSuggestions: [
              "从了解典型DePIN项目开始，掌握基本概念",
              "关注硬件成本与收益比，避免盲目投入",
              "研究项目白皮书，理解代币经济和长期价值",
              "参与DePIN社区，交流设备配置和优化经验",
              "从小规模试点开始，逐步扩大参与规模",
              "关注监管政策变化，确保合规参与"
            ]
          };
       case 'module-6':
         return {
           introduction: "空投是加密货币项目分发代币的重要方式，本模块将学习活跃度空投、白名单空投、NFT空投等不同类型空投的特点和参与方法。",
           learningContent: [
             "什么是活跃度空投？ - 通过日常使用和交互获得的空投类型",
             "什么是白名单空投？ - 满足特定条件并通过审核的空投资格",
             "什么是NFT空投？ - 以非同质化代币形式发放的空投",
             "NFT参与空投策略 - 如何通过持有NFT获得更多空投机会",
             "Twitter关键词追踪技巧 - 及时发现空投信息的方法",
             "Mint.fun平台使用 - NFT空投和铸造平台的操作指南"
           ],
           learningSuggestions: [
             "建立空投信息收集渠道，及时获取最新空投机会",
             "了解不同类型空投的参与成本和潜在收益",
             "注意空投诈骗防范，不泄露私钥和个人信息",
             "记录参与的空投项目，建立自己的空投日历"
           ]
         };
        case 'module-7':
          return {
            introduction: "交易所是加密货币交易和投资的核心平台，也是新手进入币圈的重要入口。本模块将全面讲解现货/合约交易、杠杆机制、量化策略、Launchpad打新、流动性挖矿和理财产品等各种交易所玩法，帮助你掌握加密货币交易的核心技能。",
            learningContent: [
              "交易所的基本概念与类型 - 中心化交易所(CEX)与去中心化交易所(DEX)的区别",
              "现货交易详解 - 直接买卖实际加密货币的交易方式与操作流程",
              "合约交易原理 - 基于加密货币价格的衍生品交易，允许做空和杠杆操作",
              "杠杆交易机制 - 借入资金放大交易头寸的原理与风险控制",
              "量化交易策略 - 使用算法和自动化程序执行交易的基本概念与实践方法",
              "Launchpad打新 - 参与加密货币项目首次发行代币的平台与流程",
              "流动性池与做市 - 提供交易对流动性并获得收益的机制",
              "理财产品介绍 - 加密货币的储蓄、质押和增值服务对比",
              "交易安全与风险管理 - 保护资产安全的实用技巧与风险控制策略",
              "不同交易所对比 - 主流交易所的特点、优势与选择建议"
            ],
            learningSuggestions: [
              "先从现货交易开始，熟悉基本操作后再尝试合约和杠杆",
              "使用模拟交易功能练习交易策略，再投入真实资金",
              "了解不同交易所的优缺点，根据自身需求选择合适平台",
              "学习技术分析和基本面分析，建立自己的交易系统",
              "从小额交易开始，逐步积累经验，控制风险敞口",
              "关注市场动态和新闻，及时调整交易策略",
              "定期总结交易经验，分析成功与失败案例，持续优化交易方法"
            ]
          };
         case 'module-8':
           return {
             introduction: "链游与NFT生态是Web3中最具创新性和娱乐性的领域，将游戏、数字艺术与金融经济模型相结合。本模块将深入学习NFT的基本概念、技术原理、交易市场、链游模式、投资策略以及未来发展趋势。",
             learningContent: [
               "NFT的基本概念与核心特性 - 非同质化代币的定义、唯一性和不可分割性",
               "NFT的技术原理 - ERC-721、ERC-1155等标准详解",
               "链游与GameFi的发展历程 - 从Play-to-Earn到Free-to-Own的演变",
               "主流NFT交易市场分析 - OpenSea、Blur、Magic Eden等平台特性对比",
               "NFT铸造技术 - 智能合约实现与Gas优化技巧",
               "链游经济模型 - 双代币系统、奖励机制与可持续性设计",
               "NFT的应用场景 - 数字艺术、收藏品、游戏资产、身份认证等",
               "NFT收藏与投资策略 - 价值评估方法与风险管理",
               "链游开发与发行 - 游戏引擎、分发平台与运营模式",
               "NFT与链游的未来趋势 - AI集成、元宇宙、跨链互操作性"
             ],
             learningSuggestions: [
               "从免费或低成本链游开始体验，了解基本玩法和经济模型",
               "关注NFT社区和艺术家，培养审美和市场判断力",
               "学习使用DappRadar等数据平台分析链游和NFT市场动态",
               "参与NFT铸造和交易实践，熟悉钱包操作和Gas费管理",
               "注意链游和NFT的高风险性，控制投资比例和资金管理",
               "研究成功的NFT项目案例，分析其价值主张和社区建设",
               "了解NFT的技术实现原理，提升对项目质量的判断力"
             ]
           };
        case 'module-9':
          return {
            introduction: "链上数据分析工具是理解加密货币市场和项目的重要手段，通过这些工具可以追踪资金流向、分析项目活跃度、识别市场趋势和大户行为，为投资决策提供数据支持。本模块将详细介绍Dune、DeFiLlama、Zapper和Nansen等主流链上数据分析工具的使用方法和实用技巧。",
            learningContent: [
              "链上数据分析的基本概念与重要性 - 为什么链上数据分析是加密投资的核心技能",
              "Dune Analytics详解 - 如何使用SQL查询语言创建自定义链上数据看板",
              "DeFiLlama功能解析 - 如何追踪TVL、交易量、收益率等关键DeFi指标",
              "Zapper多链资产管理 - 如何通过仪表盘可视化追踪个人投资组合表现",
              "Nansen钱包追踪工具 - 如何利用标签系统识别鲸鱼地址和机构资金动向",
              "链上指标体系 - TVL、交易量、活跃地址、手续费等核心指标的解读",
              "资金流向分析 - 如何追踪资金在不同协议、链和资产间的流动路径",
              "智能合约交互分析 - 如何监控合约调用、持有者变化和代币分配",
              "NFT数据分析 - 如何评估NFT项目的交易量、持有分布和地板价趋势",
              "链上数据分析实战 - 通过实际案例学习如何将数据转化为投资洞见"
            ],
            learningSuggestions: [
              "从Dune的社区看板开始，学习他人如何构建数据分析模型",
              "使用DeFiLlama的API获取历史数据，进行项目对比分析",
              "为自己的投资组合创建Zapper仪表盘，定期跟踪表现",
              "关注Nansen的鲸鱼预警和机构持仓变化，把握市场动向",
              "学习基础的SQL语法，能够自定义简单的数据查询",
              "结合市场新闻和链上数据，提高分析准确性和前瞻性",
              "加入数据分析社区，分享见解并学习他人经验"
            ]
          };
                        case 'module-10':
                          return {
                            introduction: "技术能力是深入参与Web3的重要基础。本模块将提供一个完整的Web3技术学习路径，从编程基础到高级开发技能，帮助你系统性地掌握区块链开发和数据分析能力。",
                            learningContent: [
                              "编程基础准备 - 选择合适的编程语言",
                              "区块链基础知识 - 理解核心概念",
                              "Web3.js/Ethers.js入门 - 与区块链交互",
                              "智能合约开发基础 - Solidity语言",
                              "链上数据获取与分析 - Python实战",
                              "钱包集成与交易监控 - 实用工具开发",
                              "Node.js与后端服务 - 搭建基础设施",
                              "前端DApp开发 - 用户界面实现"
                            ],
                            learningSuggestions: [
                              "先掌握基础编程知识，再学习Web3特定技术",
                              "在GitHub上研究开源项目，学习实际代码",
                              "使用测试网进行开发测试，避免资产风险",
                              "参与开发者社区，分享经验解决问题",
                              "选择一个方向深入研究，成为领域专家"
                            ]
                          };
case 'module-11':
          return {
            introduction: "在Web3世界中，社群传播与PR是项目成功的关键因素。一个活跃、忠诚的社区可以为项目提供早期用户、口碑传播和持续发展动力。本模块将系统讲解从0到1的社群运营策略、各平台PR技巧、内容创作方法论和危机管理策略，帮助你掌握Web3特有的传播方式。",
            learningContent: [
              "Web3社群基础 - 理解去中心化社区的特征与运作逻辑",
              "社区建设五步走 - 从冷启动到规模化运营的完整流程",
              "Twitter运营策略 - 掌握加密社区的内容创作与传播规律",
              "Telegram群组管理 - 打造活跃高效的社区交流空间",
              "Shill语言体系 - 学习加密社区特有的沟通话术和文化符号",
              "多账号运营 - 小号矩阵的建立、管理与风险控制",
              "社群数据监测 - 如何通过数据分析优化运营策略",
              "危机公关处理 - 应对社区负面事件的实战指南",
              "KOL合作 - 找到并建立有效的意见领袖合作关系",
              "跨平台传播 - 不同社交媒体平台的特性与运营技巧"
            ],
            learningSuggestions: [
              "从观察知名Web3项目的社群运营开始，分析其成功经验",
              "参与多个社区，从不同角度了解社区运作机制",
              "创建自己的测试账号，实践内容创作和社区互动",
              "学习基础的数据分析技能，通过数据优化运营效果",
              "建立个人品牌，逐步在社区中建立影响力",
              "关注行业趋势，及时调整运营策略以适应市场变化"
            ]
          };
        case 'module-12':
          return {
            introduction: "理解各平台机制是Web3内容传播的关键。本模块将学习Telegram限流、X(原Twitter)推文推荐机制、小红书限流和抖音标签等平台特性。",
            learningContent: [
              "TG限流原因与解决方法 - Telegram账号和内容限制的应对策略",
              "X推文推荐机制 - 影响内容曝光的算法因素和优化方法",
              "小红书限流规则 - 加密内容在小红书的发布注意事项",
              "抖音标签优化 - 提高加密相关内容可见度的标签策略",
              "平台热门机制分析 - 不同平台内容走红的共同特征",
              "多平台内容适配 - 同一内容在不同平台的调整技巧"
            ],
            learningSuggestions: [
              "建立平台测试账号，小规模测试内容和发布策略",
              "记录和分析自己内容的表现数据，总结规律",
              "关注平台政策变化，及时调整运营策略",
              "学习优秀创作者的内容形式和发布节奏"
            ]
          };
       default:
         // 为未定义的模块提供默认详细内容结构
         return {
           introduction: `${module.title} 是币圈生态中的重要组成部分。本模块将深入学习${module.learningContent}。`,
           learningContent: [
             `${module.title}基础概念`,
             `${module.title}核心技术原理`,
             `${module.title}实际应用场景`,
             `${module.title}主流平台使用`,
             `${module.title}风险防范策略`,
             `${module.title}未来发展趋势`
           ],
           learningSuggestions: [
             "从基础概念开始，逐步深入技术细节",
             "结合推荐网站的教程进行实践操作",
             "参与相关社区讨论，解决学习疑问",
             "定期回顾和总结，巩固所学知识"
           ]
         };
    }
  };
  
  const moduleDetails = getModuleDetails();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      
      <main className="flex-grow">

        
        {/* 模块头部 */}
        <section className="relative py-16 overflow-hidden bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.15),transparent_40%)] z-0"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
                  {getCategoryInfo()}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                     <h1 className="text-3xl md:text-4xl font-bold text-white">{module.title}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                      {difficultyInfo.badge}
                      <span className="text-gray-400 text-sm">{difficultyInfo.text}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xl text-gray-300 mb-6">
                  {module.learningContent}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {module.searchKeywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800/50 text-gray-300 text-sm px-3 py-1.5 rounded-full border border-gray-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* 模块详情内容 */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* 模块介绍 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <i className="fa-solid fa-info-circle text-blue-400 mr-2"></i>
板块介绍
                </h2>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                    <div className="text-gray-300 leading-relaxed">
                     <p className="mb-6">{moduleDetails.introduction}</p>
                   </div>
                </div>
              </motion.div>
              
              {/* 学习内容方向 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <i className="fa-solid fa-book text-blue-400 mr-2"></i>
                  学习内容方向
                </h2>
                <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
                  <ul className="divide-y divide-gray-800">
                    {moduleDetails.learningContent.map((item, index) => (
                      <li key={index} className="p-4 hover:bg-gray-850 transition-colors">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-blue-400 text-sm font-medium">{index + 1}</span>
                          </div>
                          <span className="text-gray-300">{item}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
               </motion.div>
               
                {/* 公链详细内容 */}
                {module.id === 'module-1' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-link text-blue-400 mr-2"></i>
                      公链（Public Blockchain）详解
                    </h2>
                    
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                        <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                        定义
                      </h3>
                      <p className="text-gray-300 mb-4">
                        公链是一种任何人都能参与、验证和使用的区块链网络。它不属于任何单一机构或公司，而是由全球节点共同维护。
                      </p>
                      <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                        <p className="text-gray-300 italic">
                          你可以把它理解为：一个公开透明的分布式数据库系统，所有人都能查看数据、发起交易、执行合约。
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                        <i className="fa-solid fa-cogs text-yellow-400 mr-2"></i>
                        公链的核心组成部分
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">模块</th>
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">说明</th>
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">举例</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">节点（Node）</td>
                              <td className="px-4 py-3 text-gray-300">运行区块链软件的计算机，负责验证交易、打包区块。</td>
                              <td className="px-4 py-3 text-gray-300">全球成千上万个 ETH 节点</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">区块（Block）</td>
                              <td className="px-4 py-3 text-gray-300">储存一批交易信息的数据单元。每个区块连接前一个区块形成"链"。</td>
                              <td className="px-4 py-3 text-gray-300">BTC 的区块大小为 1MB</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">共识机制（Consensus）</td>
                              <td className="px-4 py-3 text-gray-300">决定谁来记账的规则，确保全网达成统一状态。</td>
                              <td className="px-4 py-3 text-gray-300">PoW、PoS、DPoS 等</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">智能合约（Smart Contract）</td>
                              <td className="px-4 py-3 text-gray-300">可自动执行的代码逻辑，让区块链具备可编程性。</td>
                              <td className="px-4 py-3 text-gray-300">ETH 的智能合约创建了 DeFi 世界</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-white font-medium">原生代币（Native Token）</td>
                              <td className="px-4 py-3 text-gray-300">维护网络运作的激励资产。</td>
                              <td className="px-4 py-3 text-gray-300">ETH、SOL、BNB、BTC</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                        <i className="fa-solid fa-sync-alt text-blue-400 mr-2"></i>
                        公链的工作原理（以 ETH 为例）
                      </h3>
                      
                      <div className="space-y-6 mt-4">
                        <div className="flex">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-blue-400 text-sm font-medium">1</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">用户发起交易</h4>
                            <p className="text-gray-300 text-sm">例如：你用钱包（MetaMask）发一笔交易。</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-blue-400 text-sm font-medium">2</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">节点验证交易</h4>
                            <p className="text-gray-300 text-sm">网络节点检查交易是否合法（签名正确、余额足够）。</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-blue-400 text-sm font-medium">3</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">交易打包成区块</h4>
                            <p className="text-gray-300 text-sm">验证通过的交易会被矿工（或验证者）打包成新区块。</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-blue-400 text-sm font-medium">4</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">共识确认</h4>
                            <p className="text-gray-300 text-sm">其他节点对新区块进行验证 → 达成共识 → 链上状态更新。</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-blue-400 text-sm font-medium">5</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">区块广播 + 链接前一区块</h4>
                            <p className="text-gray-300 text-sm">区块被广播，全网更新账本，形成不可篡改的链。</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-6">
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <i className="fa-solid fa-puzzle-piece text-yellow-400 mr-2"></i>
                          简化比喻：
                        </h4>
                        <p className="text-gray-300">
                          比特币是一个"公开记账的银行系统"，<br/>
                          以太坊则是一个"能写程序的银行系统"。
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                        <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                        公链的关键特征（投资/投研视角）
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">特征</th>
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">含义</th>
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">投研关注点</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">去中心化</td>
                              <td className="px-4 py-3 text-gray-300">不依赖单一实体控制网络</td>
                              <td className="px-4 py-3 text-gray-300">节点分布广度、安全性</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">可扩展性</td>
                              <td className="px-4 py-3 text-gray-300">能否承载更多交易</td>
                              <td className="px-4 py-3 text-gray-300">TPS、Gas 成本、扩容方案</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">安全性</td>
                              <td className="px-4 py-3 text-gray-300">防止篡改、双花攻击</td>
                              <td className="px-4 py-3 text-gray-300">共识机制、经济激励</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-white font-medium">生态繁荣度</td>
                              <td className="px-4 py-3 text-gray-300">是否有应用、资金、开发者</td>
                              <td className="px-4 py-3 text-gray-300">项目数量、TVL、用户量</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                        <i className="fa-solid fa-brain text-purple-400 mr-2"></i>
                        公链的代表性项目对比
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">共识机制</th>
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                              <th className="px-4 py-3 text-left text-gray-400 font-medium">生态方向</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">Bitcoin</td>
                              <td className="px-4 py-3 text-gray-300">PoW</td>
                              <td className="px-4 py-3 text-gray-300">最安全、最去中心化</td>
                              <td className="px-4 py-3 text-gray-300">价值储藏（数字黄金）</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">Ethereum</td>
                              <td className="px-4 py-3 text-gray-300">PoS</td>
                              <td className="px-4 py-3 text-gray-300">智能合约生态最强</td>
                              <td className="px-4 py-3 text-gray-300">DeFi、NFT、Layer2</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">Solana</td>
                              <td className="px-4 py-3 text-gray-300">PoH + PoS</td>
                              <td className="px-4 py-3 text-gray-300">高速低费</td>
                              <td className="px-4 py-3 text-gray-300">链游、Memecoin 活跃</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="px-4 py-3 text-white font-medium">BNB Chain</td>
                              <td className="px-4 py-3 text-gray-300">PoSA</td>
                              <td className="px-4 py-3 text-gray-300">兼容EVM、用户多</td>
                              <td className="px-4 py-3 text-gray-300">DeFi、GameFi、CeFi接入</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-white font-medium">Base</td>
                              <td className="px-4 py-3 text-gray-300">Optimistic Rollup</td>
                              <td className="px-4 py-3 text-gray-300">Coinbase生态支持</td>
                              <td className="px-4 py-3 text-gray-300">美系合规 + 应用层繁荣</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 共识机制详细内容 */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                        <i className="fa-solid fa-cogs text-yellow-400 mr-2"></i>
                        共识机制（Consensus Mechanism）
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">1、什么是共识机制？</h4>
                          <p className="text-gray-300 mb-3">
                            共识机制是一套"让分布在全球的节点在没有信任的情况下达成一致"的规则。换句话说，它决定了：
                          </p>
                          <ul className="list-disc pl-6 text-gray-300 space-y-1">
                            <li>谁来负责"记账"（打包区块）；</li>
                            <li>如何防止恶意节点作恶；</li>
                            <li>怎样奖励诚实节点。</li>
                          </ul>
                          <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-3">
                            <p className="text-gray-300 italic font-medium">
                              一句话总结：<br />
                              共识机制 = 区块链的"社会契约 + 奖惩系统"。
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">2、为什么需要共识机制？</h4>
                          <p className="text-gray-300 mb-3">
                            想象你有一个全世界共享的电子账本。每个人都能写入数据，那谁说的算？
                          </p>
                          <p className="text-gray-300 mb-2">没有共识机制，就会出现：</p>
                          <ul className="list-disc pl-6 text-gray-300 space-y-1 mb-3">
                            <li>多个账本版本（分叉）</li>
                            <li>恶意节点篡改数据</li>
                            <li>双重支付（double spend）问题</li>
                          </ul>
                          <p className="text-gray-300">共识机制的作用，就是：</p>
                          <p className="text-gray-300 font-medium mt-1">
                            让全网节点自动决定"哪个账本是真实的"。
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">3、主流共识机制类型及比较</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">类型</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">名称全称</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">核心逻辑</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">优点</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">缺点</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">代表公链</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">PoW</td>
                                  <td className="px-4 py-3 text-gray-300">Proof of Work（工作量证明）</td>
                                  <td className="px-4 py-3 text-gray-300">计算算力竞争打包区块</td>
                                  <td className="px-4 py-3 text-gray-300">安全性高、完全去中心化</td>
                                  <td className="px-4 py-3 text-gray-300">能耗高、速度慢</td>
                                  <td className="px-4 py-3 text-gray-300">Bitcoin</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">PoS</td>
                                  <td className="px-4 py-3 text-gray-300">Proof of Stake（权益证明）</td>
                                  <td className="px-4 py-3 text-gray-300">质押代币作为验证权</td>
                                  <td className="px-4 py-3 text-gray-300">节能高效、可扩展性强</td>
                                  <td className="px-4 py-3 text-gray-300">资本集中风险</td>
                                  <td className="px-4 py-3 text-gray-300">Ethereum（合并后）</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">DPoS</td>
                                  <td className="px-4 py-3 text-gray-300">Delegated Proof of Stake（委托权益证明）</td>
                                  <td className="px-4 py-3 text-gray-300">投票选出验证节点代表记账</td>
                                  <td className="px-4 py-3 text-gray-300">速度快、社区参与</td>
                                  <td className="px-4 py-3 text-gray-300">中心化倾向明显</td>
                                  <td className="px-4 py-3 text-gray-300">EOS / Tron</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">PoH + PoS</td>
                                  <td className="px-4 py-3 text-gray-300">Proof of History（历史证明）</td>
                                  <td className="px-4 py-3 text-gray-300">用时间戳保证顺序 + PoS记账</td>
                                  <td className="px-4 py-3 text-gray-300">高速低延迟</td>
                                  <td className="px-4 py-3 text-gray-300">相对中心化</td>
                                  <td className="px-4 py-3 text-gray-300">Solana</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">Rollup</td>
                                  <td className="px-4 py-3 text-gray-300">Optimistic / ZK Rollup</td>
                                  <td className="px-4 py-3 text-gray-300">链下计算、链上验证</td>
                                  <td className="px-4 py-3 text-gray-300">交易快、成本低</td>
                                  <td className="px-4 py-3 text-gray-300">依赖主链安全</td>
                                  <td className="px-4 py-3 text-gray-300">Arbitrum / zkSync</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">4、运行机制简化说明（以 PoW 和 PoS 为例）</h4>
                          
                          <div className="bg-gray-800 rounded-lg p-4 mb-4">
                            <h5 className="text-white font-medium mb-2 flex items-center">
                              <i className="fa-solid fa-bolt text-yellow-400 mr-2"></i>
                              PoW（工作量证明）
                            </h5>
                            <ul className="list-disc pl-6 text-gray-300 space-y-1">
                              <li>矿工使用算力解数学难题；</li>
                              <li>谁先解出，谁获得记账权；</li>
                              <li>生成新区块并获得奖励（BTC）；</li>
                              <li>难题难度动态调整以保持出块时间稳定。</li>
                            </ul>
                            <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-3 mt-3">
                              <p className="text-gray-300 italic">
                                形象比喻：<br />
                                所有人同时在"拼题"，第一个答对的获得奖励。
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-4">
                            <h5 className="text-white font-medium mb-2 flex items-center">
                              <i className="fa-solid fa-leaf text-green-400 mr-2"></i>
                              PoS（权益证明）
                            </h5>
                            <ul className="list-disc pl-6 text-gray-300 space-y-1">
                              <li>节点抵押代币（Stake）获得验证资格；</li>
                              <li>系统随机选出一个验证者打包区块；</li>
                              <li>如果作恶，会被"罚没质押"（Slashing）；</li>
                              <li>奖励发给诚实验证者。</li>
                            </ul>
                            <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-3 mt-3">
                              <p className="text-gray-300 italic">
                                形象比喻：<br />
                                谁押更多的保证金、行为更好，谁更容易被信任来记账。
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">5、进阶概念：混合与创新机制</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">新机制</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">原理</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">代表项目</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">PoS+BFT（拜占庭容错）</td>
                                  <td className="px-4 py-3 text-gray-300">多节点同时验证并投票</td>
                                  <td className="px-4 py-3 text-gray-300">Cosmos / Tendermint</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">PoA（权威证明）</td>
                                  <td className="px-4 py-3 text-gray-300">授权节点固定记账</td>
                                  <td className="px-4 py-3 text-gray-300">BNB Chain（部分）</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">PoS + ZK</td>
                                  <td className="px-4 py-3 text-gray-300">引入零知识证明提升安全性</td>
                                  <td className="px-4 py-3 text-gray-300">zkSync / Scroll</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">EigenLayer 的再质押机制</td>
                                  <td className="px-4 py-3 text-gray-300">利用已有质押资产参与新验证</td>
                                  <td className="px-4 py-3 text-gray-300">EigenLayer（以太坊再质押）</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">6、投研角度该怎么看共识机制？</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">维度</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">关键点</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">关注问题</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">安全性</td>
                                  <td className="px-4 py-3 text-gray-300">是否容易被攻击？</td>
                                  <td className="px-4 py-3 text-gray-300">验证节点分布、攻击成本</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">去中心化</td>
                                  <td className="px-4 py-3 text-gray-300">权力是否集中？</td>
                                  <td className="px-4 py-3 text-gray-300">验证者数量、门槛、治理模式</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">效率</td>
                                  <td className="px-4 py-3 text-gray-300">TPS 与交易延迟</td>
                                  <td className="px-4 py-3 text-gray-300">链上生态是否能规模化</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">经济模型</td>
                                  <td className="px-4 py-3 text-gray-300">奖励 / 罚没设计是否合理</td>
                                  <td className="px-4 py-3 text-gray-300">是否能长期激励参与者</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 区块与交易打包原理 */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                        <i className="fa-solid fa-link text-blue-400 mr-2"></i>
                        区块与交易打包原理
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">1、什么是区块（Block）？</h4>
                          <p className="text-gray-300 mb-3">
                            区块（Block）是记录一批交易信息的数据容器，每一个区块都连接前一个区块，从而形成"区块链"。
                          </p>
                          <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                            <p className="text-gray-300 italic font-medium">
                              一句话解释：<br />
                              区块就像银行的账本页，每一页写满交易记录后就装订起来，永远不可篡改。
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">2、区块的结构（以比特币为例）</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">组成部分</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">内容</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">作用</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">区块头（Block Header）</td>
                                  <td className="px-4 py-3 text-gray-300">上一区块哈希、时间戳、随机数（Nonce）、Merkle Root</td>
                                  <td className="px-4 py-3 text-gray-300">确保链的连接性与防篡改</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">区块体（Block Body）</td>
                                  <td className="px-4 py-3 text-gray-300">本区块包含的交易数据</td>
                                  <td className="px-4 py-3 text-gray-300">存储所有交易详情</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">区块哈希（Block Hash）</td>
                                  <td className="px-4 py-3 text-gray-300">区块头经过哈希函数生成的唯一指纹</td>
                                  <td className="px-4 py-3 text-gray-300">确保唯一性与溯源性</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-3">
                            <p className="text-gray-300 italic">
                              举个例子：<br />
                              区块 = "账本页"，<br />
                              区块头 = "页眉（记录上页编号）"，<br />
                              区块体 = "交易明细"，<br />
                              哈希 = "防伪编号"。
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">3、交易（Transaction）是怎么进入区块的？</h4>
                          
                          <div className="space-y-4">
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-blue-400 text-sm font-medium">1️⃣</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-1">用户发起交易</h5>
                                <p className="text-gray-300 text-sm">
                                  用户通过钱包（如 MetaMask）发出一笔交易（如转账、Swap、Mint NFT）。<br />
                                  交易被广播到网络，进入 交易池（Mempool）。
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-blue-400 text-sm font-medium">2️⃣</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-1">矿工 / 验证者从交易池中挑选交易</h5>
                                <p className="text-gray-300 text-sm">
                                  节点根据 Gas 费优先级选择交易；<br />
                                  出价高的交易通常会被优先打包。
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-blue-400 text-sm font-medium">3️⃣</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-1">节点打包交易并生成新区块</h5>
                                <p className="text-gray-300 text-sm">
                                  验证者将选中的交易组成区块；<br />
                                  添加区块头信息并进行签名；<br />
                                  通过共识机制验证（PoW 解题 / PoS 投票）。
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-blue-400 text-sm font-medium">4️⃣</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-1">广播新区块，全网确认</h5>
                                <p className="text-gray-300 text-sm">
                                  新区块被全网节点接收、验证；<br />
                                  链状态更新；<br />
                                  用户钱包显示"交易已确认"。
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">4、交易确认机制</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">状态</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">含义</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">举例</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">Pending</td>
                                  <td className="px-4 py-3 text-gray-300">交易进入 Mempool 等待打包</td>
                                  <td className="px-4 py-3 text-gray-300">等待矿工选中</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">Confirmed</td>
                                  <td className="px-4 py-3 text-gray-300">被打包进区块并广播成功</td>
                                  <td className="px-4 py-3 text-gray-300">出现在区块浏览器上</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">Finalized</td>
                                  <td className="px-4 py-3 text-gray-300">多个区块后交易被视为"不可逆"</td>
                                  <td className="px-4 py-3 text-gray-300">ETH 通常需 12 个确认</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p className="text-gray-300 mt-3 text-sm">
                            <i className="fa-lightbulb-o text-yellow-400 mr-1"></i>
                            在 PoW 中，确认越多代表越难被回滚。<br />
                            在 PoS 中，"Finality（最终性）"由投票机制确定。
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">5、Gas费与优先级原理</h4>
                          <div className="bg-gray-800 rounded-lg p-4">
                            <h5 className="text-white font-medium mb-2 flex items-center">
                              <i className="fa-solid fa-money-bill-wave text-green-400 mr-2"></i>
                              什么是 Gas？
                            </h5>
                            <p className="text-gray-300 mb-3">
                              Gas = 你支付给网络的手续费，用来补偿验证者执行计算和存储的成本。
                            </p>
                            <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-3 mb-3">
                              <p className="text-gray-300 font-medium">
                                公式（以以太坊为例）：<br />
                                Gas Fee = Gas Limit × Gas Price
                              </p>
                            </div>
                            <ul className="list-disc pl-6 text-gray-300 space-y-1 mb-3">
                              <li>Gas Limit：你愿意给的最大计算量（例如一次转账是 21,000 Gas）</li>
                              <li>Gas Price：你愿意为每单位 Gas 支付的价格（单位：gwei）</li>
                              <li>Priority Fee：小费（给验证者的额外奖励）</li>
                            </ul>
                            <h5 className="text-white font-medium mb-2 mt-4">⚙️ Gas的意义：</h5>
                            <ul className="list-disc pl-6 text-gray-300 space-y-1">
                              <li>防止恶意无限计算；</li>
                              <li>作为网络拥堵调节器；</li>
                              <li>影响交易打包速度。</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">6、区块链如何"链"在一起？</h4>
                          <p className="text-gray-300 mb-3">
                            每个区块的Header中包含上一个区块的哈希值，形成如下结构：
                          </p>
                          <div className="bg-gray-800 rounded-lg p-4 text-center mb-3">
                            <p className="text-gray-300">
                              区块 #1 → 区块 #2 → 区块 #3 → ...
                            </p>
                          </div>
                          <p className="text-gray-300 mb-2">这意味着：</p>
                          <ul className="list-disc pl-6 text-gray-300 space-y-1 mb-3">
                            <li>如果任何区块被篡改，它的哈希会改变；</li>
                            <li>所有后续区块都会失效；</li>
                            <li>所以历史记录不可修改。</li>
                          </ul>
                          <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-3">
                            <p className="text-gray-300 italic font-medium">
                              这就是「不可篡改性」的数学来源。
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">7、投研角度如何分析"区块机制"</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">维度</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">说明</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">研究意义</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">出块时间</td>
                                  <td className="px-4 py-3 text-gray-300">区块生成的间隔</td>
                                  <td className="px-4 py-3 text-gray-300">决定交易确认速度</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">区块大小</td>
                                  <td className="px-4 py-3 text-gray-300">容纳交易数量</td>
                                  <td className="px-4 py-3 text-gray-300">影响吞吐量（TPS）</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">Gas成本</td>
                                  <td className="px-4 py-3 text-gray-300">网络费用</td>
                                  <td className="px-4 py-3 text-gray-300">影响用户体验</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">区块奖励</td>
                                  <td className="px-4 py-3 text-gray-300">给矿工/验证者的激励</td>
                                  <td className="px-4 py-3 text-gray-300">影响安全性与通胀</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">Finality机制</td>
                                  <td className="px-4 py-3 text-gray-300">最终性确认方式</td>
                                  <td className="px-4 py-3 text-gray-300">影响DeFi安全与套利策略</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-3">
                            <p className="text-gray-300 mb-1">举例：</p>
                            <ul className="list-disc pl-6 text-gray-300 space-y-1">
                              <li>Bitcoin 出块时间 10分钟 → 安全但慢</li>
                              <li>Solana 出块时间 &lt;1秒 → 快但易拥堵</li>
                              <li>Ethereum 平衡两者，通过 Layer2 提速</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">8、形象总结</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">层级</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">角色</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">类比</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">用户</td>
                                  <td className="px-4 py-3 text-gray-300">发送交易</td>
                                  <td className="px-4 py-3 text-gray-300">填写银行转账单</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">节点</td>
                                  <td className="px-4 py-3 text-gray-300">验证交易</td>
                                  <td className="px-4 py-3 text-gray-300">银行柜员核对信息</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">区块</td>
                                  <td className="px-4 py-3 text-gray-300">记录账本页</td>
                                  <td className="px-4 py-3 text-gray-300">每日结账记录</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">区块链</td>
                                  <td className="px-4 py-3 text-gray-300">所有账本页连在一起</td>
                                  <td className="px-4 py-3 text-gray-300">完整交易历史档案</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">共识机制</td>
                                  <td className="px-4 py-3 text-gray-300">确保所有分行账本一致</td>
                                  <td className="px-4 py-3 text-gray-300">总行审计规则</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 智能合约与应用层逻辑 */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                        <i className="fa-solid fa-puzzle-piece text-purple-400 mr-2"></i>
                        智能合约（Smart Contract）与应用层逻辑
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">1、什么是智能合约？</h4>
                          <p className="text-gray-300 mb-3">
                            智能合约是部署在区块链上的一段自动执行的代码逻辑，它在满足条件时会自动触发交易、转账或状态变更，无需人工干预。
                          </p>
                          <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                            <p className="text-gray-300 italic font-medium">
                              一句话解释：<br />
                              智能合约 = "自动运行的区块链程序"<br />
                              （既不需要中介，也不依赖信任）
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">2、智能合约的核心特性</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">特性</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">含义</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">投研角度意义</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">自动执行</td><td className="px-4 py-3 text-gray-300">达到条件后代码立即执行</td>
                                  <td className="px-4 py-3 text-gray-300">无需信任中介，降低成本</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">公开透明</td>
                                  <td className="px-4 py-3 text-gray-300">所有逻辑都可在链上查看</td>
                                  <td className="px-4 py-3 text-gray-300">防止欺诈，可审计</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">不可篡改</td>
                                  <td className="px-4 py-3 text-gray-300">部署后不能随意更改代码</td>
                                  <td className="px-4 py-3 text-gray-300">保证规则稳定性</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">可组合性</td>
                                  <td className="px-4 py-3 text-gray-300">不同合约可互相调用</td>
                                  <td className="px-4 py-3 text-gray-300">DeFi "乐高式"创新基础</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-3">
                            <p className="text-gray-300 italic">
                              比喻：<br />
                              智能合约就像自动售货机——<br />
                              投币（触发条件） → 自动出货（执行交易） → 全程无人为干预。
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">3、智能合约的运行机制（以以太坊为例）</h4>
                          
                          <div className="space-y-4">
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-blue-400 text-sm font-medium">1️⃣</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-1">编写</h5>
                                <p className="text-gray-300 text-sm">
                                  开发者用 Solidity（以太坊编程语言）编写智能合约代码。
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-blue-400 text-sm font-medium">2️⃣</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-1">编译</h5>
                                <p className="text-gray-300 text-sm">
                                  编译为 EVM（Ethereum Virtual Machine，以太坊虚拟机）可识别的字节码。
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-blue-400 text-sm font-medium">3️⃣</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-1">部署</h5>
                                <p className="text-gray-300 text-sm">
                                  开发者通过钱包或工具（Remix、Hardhat）将合约部署到链上，生成合约地址。
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-blue-400 text-sm font-medium">4️⃣</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-1">调用</h5>
                                <p className="text-gray-300 text-sm">
                                  用户或其他合约可向该地址发交易（如存入资金、领取奖励、购买NFT）。
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-blue-400 text-sm font-medium">5️⃣</span>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-1">执行</h5>
                                <p className="text-gray-300 text-sm">
                                  节点运行合约逻辑 → 改变链上状态 → 产生交易记录。
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-3 mt-3 text-sm">
                            <p className="text-gray-300">
                              <i className="fa-info-circle text-blue-400 mr-1"></i>
                              小贴士：<br />
                              所有合约交互记录都能在区块浏览器上查看（例如 Etherscan → "Contract" 标签页）。
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">4、智能合约与应用层的关系</h4>
                          <p className="text-gray-300 mb-3">
                            智能合约是应用层的"底层引擎"，每一种主流应用都是由一个或多个智能合约构建而成：
                          </p>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">应用类型</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">功能逻辑</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">代表项目</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">DeFi（去中心化金融）</td>
                                  <td className="px-4 py-3 text-gray-300">代币交换、借贷、收益聚合</td>
                                  <td className="px-4 py-3 text-gray-300">Uniswap / Aave / Curve</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">GameFi（链游）</td>
                                  <td className="px-4 py-3 text-gray-300">NFT资产化、游戏代币分发</td>
                                  <td className="px-4 py-3 text-gray-300">Axie Infinity / Pixels / RONIN</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">NFT（非同质化资产）</td>
                                  <td className="px-4 py-3 text-gray-300">发行、交易、拍卖</td>
                                  <td className="px-4 py-3 text-gray-300">OpenSea / Blur</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">DAO（去中心化自治组织）</td>
                                  <td className="px-4 py-3 text-gray-300">投票、治理、资金管理</td>
                                  <td className="px-4 py-3 text-gray-300">MakerDAO / Aragon</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">SocialFi</td>
                                  <td className="px-4 py-3 text-gray-300">社交+收益模型</td>
                                  <td className="px-4 py-3 text-gray-300">Friend.tech / Lens</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">DePIN / AIFi</td>
                                  <td className="px-4 py-3 text-gray-300">设备上链、数据上链</td>
                                  <td className="px-4 py-3 text-gray-300">Hivemapper / Bittensor</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-3">
                            <p className="text-gray-300 italic">
                              你可以这样理解：<br /><br />
                              智能合约是"发动机"，<br />
                              应用层是"整辆车"，<br />
                              用户界面（DApp前端）是"驾驶舱"。
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">5、投研视角下的智能合约要点</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">关注维度</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">核心问题</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">研究重点</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">安全性</td>
                                  <td className="px-4 py-3 text-gray-300">是否经过审计？有无漏洞？</td>
                                  <td className="px-4 py-3 text-gray-300">Certik / PeckShield 审计报告</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">可升级性</td>
                                  <td className="px-4 py-3 text-gray-300">是否支持升级代理（Proxy）？</td>
                                  <td className="px-4 py-3 text-gray-300">影响治理与风控</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">Gas效率</td>
                                  <td className="px-4 py-3 text-gray-300">执行合约消耗高不高？</td>
                                  <td className="px-4 py-3 text-gray-300">影响用户体验与成本</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">开放接口</td>
                                  <td className="px-4 py-3 text-gray-300">是否可被其他合约调用？</td>
                                  <td className="px-4 py-3 text-gray-300">决定生态"可组合性"</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">治理机制</td>
                                  <td className="px-4 py-3 text-gray-300">权限由谁控制？</td>
                                  <td className="px-4 py-3 text-gray-300">是否真正去中心化</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">6、智能合约安全事件案例</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">时间</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">问题类型</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">损失</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">The DAO</td>
                                  <td className="px-4 py-3 text-gray-300">2016</td>
                                  <td className="px-4 py-3 text-gray-300">重入攻击（Reentrancy）</td>
                                  <td className="px-4 py-3 text-gray-300">约 6000 万美元</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">Wormhole</td>
                                  <td className="px-4 py-3 text-gray-300">2022</td>
                                  <td className="px-4 py-3 text-gray-300">合约验证漏洞</td>
                                  <td className="px-4 py-3 text-gray-300">3.2 亿美元</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">Curve</td>
                                  <td className="px-4 py-3 text-gray-300">2023</td>
                                  <td className="px-4 py-3 text-gray-300">Vyper 编译器漏洞</td>
                                  <td className="px-4 py-3 text-gray-300">7000 万美元</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4 mt-3">
                            <p className="text-gray-300 italic font-medium">
                              结论：<br /><br />
                              智能合约越强大，安全风险越高。<br />
                              投研时必须查审计报告和合约交互权限。
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">7、智能合约与"DApp"的关系</h4>
                          <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center space-y-3 mb-3">
                            <div className="bg-gray-700/50 p-3 rounded-lg w-full text-center">
                              <p className="text-white">用户界面（前端）</p>
                            </div>
                            <i className="fa-solid fa-chevron-down text-gray-400"></i>
                            <div className="bg-gray-700/50 p-3 rounded-lg w-full text-center">
                              <p className="text-white">Web3.js / ethers.js 调用</p>
                            </div>
                            <i className="fa-solid fa-chevron-down text-gray-400"></i>
                            <div className="bg-gray-700/50 p-3 rounded-lg w-full text-center">
                              <p className="text-white">智能合约（逻辑层）</p>
                            </div>
                            <i className="fa-solid fa-chevron-down text-gray-400"></i>
                            <div className="bg-gray-700/50 p-3 rounded-lg w-full text-center">
                              <p className="text-white">区块链（数据层）</p>
                            </div>
                          </div>
                          <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
                            <p className="text-gray-300 italic">
                              所以当你在使用 Uniswap 时：<br /><br />
                              前端网页只是展示；<br /><br />
                              真正的资金交换逻辑在合约里执行；<br /><br />
                              每次 Swap 都是一笔链上交易。
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">8、知识点串联总结</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-3">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">层级</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">内容</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">类比</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">Layer1</td>
                                  <td className="px-4 py-3 text-gray-300">公链基础设施</td>
                                  <td className="px-4 py-3 text-gray-300">操作系统</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">Layer2</td>
                                  <td className="px-4 py-3 text-gray-300">扩展层（提高性能）</td>
                                  <td className="px-4 py-3 text-gray-300">加速模块</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">Smart Contract</td>
                                  <td className="px-4 py-3 text-gray-300">编程逻辑层</td>
                                  <td className="px-4 py-3 text-gray-300">App 后端代码</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">DApp（去中心化应用）</td>
                                  <td className="px-4 py-3 text-gray-300">用户界面层</td>
                                  <td className="px-4 py-3 text-gray-300">手机App本体</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">用户行为</td>
                                  <td className="px-4 py-3 text-gray-300">交易、交互、质押</td>
                                  <td className="px-4 py-3 text-gray-300">用户操作</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      </div>
                    </motion.div>
                        )}
                        
                        {/* 技术学习路径详细内容 */}
                        {module.id === 'module-11' && (
                           <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.5, delay: 0.15 }}
                             className="mb-12"
                           >
                             <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                               <i className="fa-solid fa-users text-indigo-400 mr-2"></i>
                               社群传播与PR全解析
                             </h2>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                                 为什么Web3社群如此重要？
                               </h3>
                               <p className="text-gray-300 mb-4">
                                 在Web3领域，社群不仅仅是项目的用户基础，更是项目的核心资产和价值共创者。与传统互联网产品不同，Web3项目的成功高度依赖于社区的参与、支持和传播。一个活跃、忠诚的社区可以为项目提供早期用户、反馈、内容创作、市场推广和治理参与等多方面的支持。
                               </p>
                               
                               <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                                 <p className="text-gray-300 italic font-medium">
                                   一句话总结：<br/>
                                   Web3社群 = 用户 + 共建者 + 推广者 + 投资者 + 治理参与者
                                 </p>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-sitemap text-yellow-400 mr-2"></i>
                                 Web3社群的结构与特征
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">Web3社群的层级结构</h4>
                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                     <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                       <h5 className="text-white font-medium mb-2 text-center">核心团队</h5>
                                       <p className="text-gray-400 text-sm text-center">项目方、创始人、核心开发者</p>
                                     </div>
                                     <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                       <h5 className="text-white font-medium mb-2 text-center">核心社区</h5>
                                       <p className="text-gray-400 text-sm text-center">KOL、早期支持者、重度参与者</p>
                                     </div>
                                     <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                       <h5 className="text-white font-medium mb-2 text-center">普通社区成员</h5>
                                       <p className="text-gray-400 text-sm text-center">一般用户、投资者、关注者</p>
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">Web3社群的核心特征</h4>
                                   <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                     <li><strong>去中心化治理：</strong>社区成员通过代币持有或参与贡献拥有治理权</li>
                                     <li><strong>价值共创：</strong>社区成员不仅是用户，也是产品和内容的共创者</li>
                                     <li><strong>激励机制：</strong>通过代币、NFT或其他奖励激励社区参与和贡献</li>
                                     <li><strong>全球协作：</strong>不受地域限制的全球社区协作模式</li>
                                     <li><strong>透明开放：</strong>决策过程和项目进展对社区透明</li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-route text-blue-400 mr-2"></i>
                                 社群建设五步走：从0到1
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <ol className="list-decimal pl-6 text-gray-300 space-y-3">
                                     <li>
                                       <strong>明确社群定位与目标：</strong>
                                       <p className="text-sm mt-1">定义你的社群是技术讨论、投资交流还是产品用户群，设定短期和长期目标</p>
                                     </li>
                                     <li>
                                       <strong>搭建基础社区平台：</strong>
                                       <p className="text-sm mt-1">创建Telegram/Discord群组、Twitter账号、Medium博客等基础沟通渠道</p>
                                     </li>
                                     <li>
                                       <strong>吸引首批核心成员：</strong>
                                       <p className="text-sm mt-1">通过邀请制、早期奖励、内容吸引等方式获取第一批高质量成员</p>
                                     </li>
                                     <li>
                                       <strong>建立社区文化与规则：</strong>
                                       <p className="text-sm mt-1">制定社区行为规范，培养独特的社区文化和语言体系</p>
                                     </li>
                                     <li>
                                       <strong>设计激励与增长机制：</strong>
                                       <p className="text-sm mt-1">通过代币激励、活动参与、贡献奖励等方式促进社区活跃和增长</p>
                                     </li>
                                   </ol>
                                 </div>
                                 
                                 <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
                                   <h4 className="text-white font-medium mb-2 flex items-center">
                                     <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                     新手提示：
                                   </h4>
                                   <p className="text-gray-300">
                                     不要追求社区规模的快速增长，而是专注于建立高质量的核心社区。一个100人的活跃、专业社区比1000人的僵尸社区更有价值。
                                   </p>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-brands fa-twitter text-blue-400 mr-2"></i>
                                 Twitter运营策略：加密社区的核心战场
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">Twitter在Web3传播中的重要性</h4>
                                   <p className="text-gray-300 mb-4">
                                     Twitter是Web3项目和社区传播的核心平台，80%以上的加密货币新闻、讨论和市场情绪都在Twitter上产生。掌握Twitter运营技巧是Web3社群传播的必备技能。
                                   </p>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">内容创作策略</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li><strong>保持专业形象：</strong>统一的头像、简介和内容风格</li>
                                       <li><strong>内容多元化：</strong>新闻解读、技术分析、项目更新、市场观点</li>
                                       <li><strong>使用加密梗和语言：</strong>融入社区文化，提高认同感</li>
                                       <li><strong>视觉吸引力：</strong>精心设计的图片、图表和动图</li>
                                       <li><strong>利用标签：</strong>合理使用#Crypto、#Web3等热门标签</li>
                                     </ul>
                                   </div>
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">最佳发布时间</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li>根据目标受众所在时区调整发布时间</li>
                                       <li>通常在工作日的9:00-11:00和15:00-17:00活跃度较高</li>
                                       <li>周末活跃度相对较低，但竞争也较小</li>
                                       <li>利用Twitter Analytics分析最佳发布时间</li>
                                     </ul>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                   <h4 className="text-white font-medium mb-2">增长与互动技巧</h4>
                                   <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                     <li><strong>主动互动：</strong>回复、转发和点赞行业KOL的内容</li>
                                     <li><strong>参与Twitter Spaces：</strong>参与或主持语音讨论，提高曝光度</li>
                                     <li><strong>举办Giveaway：</strong>通过抽奖活动增加关注和互动</li>
                                     <li><strong>建立关系网络：</strong>与行业内相关账号互相关注和互动</li>
                                     <li><strong>利用Twitter广告：</strong>针对目标受众进行精准推广</li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-brands fa-telegram text-blue-400 mr-2"></i>
                                 Telegram群组管理：打造活跃高效的社区空间
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">Telegram群组的特点与优势</h4>
                                   <p className="text-gray-300 mb-4">
                                     Telegram是Web3项目社区交流的主要平台，其私密、高效、功能丰富的特点使其成为社区建设的首选工具。Telegram支持群公告、投票、机器人、频道等多种功能，能够满足不同类型的社区需求。
                                   </p>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">群组设置与管理</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li>设置清晰的群组规则和公告</li>
                                       <li>配置合适的权限设置，防止垃圾信息</li>
                                       <li>使用机器人自动管理群组（如@GroupHelpBot）</li>
                                       <li>建立不同功能的子群组（技术、投资、公告等）</li>
                                     </ul>
                                   </div>
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">提高群组活跃度</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li>定期组织AMA（Ask Me Anything）活动</li>
                                       <li>发起投票和讨论话题</li>
                                       <li>分享独家内容和更新</li>
                                       <li>建立社区贡献激励机制</li>
                                     </ul>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                   <h4 className="text-white font-medium mb-2">TG群发言规律与技巧</h4>
                                   <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                     <li><strong>保持积极态度：</strong>避免消极抱怨，传播正面信息</li>
                                     <li><strong>提供价值：</strong>分享有见解的观点和有用的信息</li>
                                     <li><strong>尊重他人：</strong>避免争论和攻击，保持礼貌</li>
                                     <li><strong>适度发言：</strong>避免刷屏，保持信息密度</li>
                                     <li><strong>使用表情和标签：</strong>适当使用emoji和标签增加互动性</li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-comments text-green-400 mr-2"></i>
                                 Shill语言体系：Web3特有的沟通话术
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">什么是Shill语言？</h4>
                                   <p className="text-gray-300 mb-4">
                                     Shill语言是加密社区特有的沟通方式和话术体系，包括特定的词汇、缩写、表情包和文化符号。掌握Shill语言可以帮助你更好地融入社区，提高传播效果。
                                   </p>
                                 </div>
                                 
                                 <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                   <h4 className="text-white font-medium mb-2">常用Shill语言词汇表</h4>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                       <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                         <li><strong>NGMI：</strong>Not Gonna Make It，不看好某人/项目</li>
                                         <li><strong>GM/WAGMI：</strong>Good Morning/We're All Gonna Make It，乐观表达</li>
                                         <li><strong>FOMO：</strong>Fear Of Missing Out，害怕错过</li>
                                         <li><strong>FUD：</strong>Fear, Uncertainty, Doubt，制造恐慌</li>
                                         <li><strong>HODL：</strong>Hold On For Dear Life，长期持有</li>
                                         <li><strong>DD：</strong>Due Diligence，尽职调查</li>
                                         <li><strong>Alpha：</strong>内部消息/优质信息</li>
                                         <li><strong>Whale：</strong>持有大量资产的大户</li>
                                       </ul>
                                     </div>
                                     <div>
                                       <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                         <li><strong>Diamond Hands：</strong>坚定持有者，不卖币</li>
                                         <li><strong>Paper Hands：</strong>意志薄弱者，轻易卖出</li>
                                         <li><strong>Airdrop：</strong>免费发放代币</li>
                                         <li><strong>Mint：</strong>铸造NFT或代币</li>
                                         <li><strong>Rug Pull：</strong>项目方卷款跑路</li>
                                         <li><strong>Shitcoin：</strong>没有价值的代币</li>
                                         <li><strong>Blue Chip：</strong>蓝筹项目，价值稳定</li>
                                         <li><strong>Wen Lambo：</strong>什么时候财务自由</li>
                                       </ul>
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                   <h4 className="text-white font-medium mb-2 flex items-center">
                                     <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                     使用提示：
                                   </h4>
                                   <p className="text-gray-300">
                                     虽然Shill语言能提高社区认同感，但也要适度使用，避免过度使用导致沟通障碍。在正式场合和面对新用户时，应适当解释这些术语。
                                   </p>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-user-secret text-purple-400 mr-2"></i>
                                 小号设置与多账号运营
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">为什么需要多账号运营？</h4>
                                   <p className="text-gray-300 mb-4">
                                     在Web3社区运营中，多账号策略可以帮助你从不同角度参与社区、扩大影响力、测试不同内容策略，同时降低单一账号的风险。但需要注意的是，多账号运营需要遵守平台规则，避免滥用。
                                   </p>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">小号类型与定位</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li><strong>专业领域号：</strong>专注于特定技术或投资领域</li>
                                       <li><strong>社区活跃号：</strong>在多个社区活跃互动</li>
                                       <li><strong>内容创作号：</strong>专注于图文、视频创作</li>
                                       <li><strong>数据监测号：</strong>专注于收集和分享数据</li>
                                     </ul>
                                   </div>
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">账号安全与管理</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li>使用不同的邮箱和密码注册</li>
                                       <li>使用虚拟手机号或短信验证服务</li>
                                       <li>避免在同一设备上登录过多账号</li>
                                       <li>使用密码管理器管理账号信息</li>
                                     </ul>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                   <h4 className="text-white font-medium mb-2 flex items-center">
                                     <i className="fa-solid fa-exclamation-triangle text-red-400 mr-2"></i>
                                     风险提示：
                                   </h4>
                                   <p className="text-gray-300">
                                     多账号运营存在一定风险，可能违反平台规则。使用前请务必阅读各平台的服务条款，避免账号被封禁。同时，不要使用多账号进行恶意操作或操控市场。
                                   </p>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-chart-line text-yellow-400 mr-2"></i>
                                 社群数据监测与分析
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">为什么需要监测社群数据？</h4>
                                   <p className="text-gray-300 mb-4">
                                     通过监测和分析社群数据，你可以了解社区的活跃度、用户增长趋势、内容效果和用户需求，从而优化运营策略，提高社区质量和影响力。
                                   </p>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">核心监测指标</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li><strong>用户增长：</strong>新增用户数、增长率、留存率</li>
                                       <li><strong>活跃度：</strong>发言数、互动数、活跃用户比例</li>
                                       <li><strong>内容效果：</strong>转发数、点赞数、评论数</li>
                                       <li><strong>参与度：</strong>活动参与人数、投票参与率</li>
                                       <li><strong>情绪分析：</strong>正面/负面评论比例</li>
                                     </ul>
                                   </div>
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">数据分析工具</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li><strong>Twitter Analytics：</strong>官方数据分析工具</li>
                                       <li><strong>Telegram Insights：</strong>群组数据分析</li>
                                       <li><strong>Social Blade：</strong>社交媒体数据统计</li>
                                       <li><strong>Dune Analytics：</strong>链上数据结合社群数据</li>
                                       <li><strong>自定义机器人：</strong>收集特定数据</li>
                                     </ul>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                   <h4 className="text-white font-medium mb-2">数据分析与策略优化</h4>
                                   <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                     <li>定期生成数据报告，分析趋势和变化</li>
                                     <li>通过A/B测试优化内容和发布时间</li>
                                     <li>根据用户反馈和数据调整社区规则</li>
                                     <li>识别高价值用户，加强与其的沟通和合作</li>
                                     <li>预测社区发展趋势，提前调整策略</li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-shield-alt text-red-400 mr-2"></i>
                                 危机公关处理：应对社区负面事件
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">Web3社区常见危机类型</h4>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                     <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                       <h5 className="text-white font-medium mb-2">技术问题</h5>
                                       <p className="text-gray-300 text-sm">合约漏洞、安全攻击、系统故障</p>
                                     </div>
                                     <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                       <h5 className="text-white font-medium mb-2">运营问题</h5>
                                       <p className="text-gray-300 text-sm">团队决策失误、沟通不畅、激励不公</p>
                                     </div>
                                     <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                       <h5 className="text-white font-medium mb-2">市场问题</h5>
                                       <p className="text-gray-300 text-sm">代币大幅下跌、竞争对手攻击、政策风险</p>
                                     </div>
                                     <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                       <h5 className="text-white font-medium mb-2">社区问题</h5>
                                       <p className="text-gray-300 text-sm">社区分裂、意见领袖反对、用户大规模流失</p>
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                   <h4 className="text-white font-medium mb-2">危机处理五步法</h4>
                                   <ol className="list-decimal pl-6 text-gray-300 space-y-2 text-sm">
                                     <li><strong>快速响应：</strong>第一时间在所有渠道发布声明，避免信息真空</li>
                                     <li><strong>透明沟通：</strong>如实披露问题原因和影响，不隐瞒、不推卸责任</li>
                                     <li><strong>提供解决方案：</strong>提出具体的解决措施和时间表</li>
                                     <li><strong>积极补偿：</strong>对受影响的用户提供合理补偿</li>
                                     <li><strong>后续跟进：</strong>定期更新进展，重建信任</li>
                                   </ol>
                                 </div>
                                 
                                 <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                   <h4 className="text-white font-medium mb-2 flex items-center">
                                     <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                     危机公关原则：
                                   </h4>
                                   <p className="text-gray-300">
                                     在处理社区危机时，要保持诚实、透明和同理心，尊重社区成员的感受，避免与社区成员争论或对抗。记住，危机也是机会，如果处理得当，可以增强社区凝聚力和信任度。
                                   </p>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-handshake text-green-400 mr-2"></i>
                                 KOL合作：撬动更大影响力
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">KOL在Web3传播中的作用</h4>
                                   <p className="text-gray-300 mb-4">
                                     关键意见领袖（KOL）在Web3社区中拥有强大的影响力和公信力，与合适的KOL合作可以快速扩大项目知名度、获取优质用户和建立市场信任。
                                   </p>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">如何选择合适的KOL</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li><strong>相关性：</strong>内容与你的项目领域高度相关</li>
                                       <li><strong>真实性：</strong>有真实的粉丝基础和互动率</li>
                                       <li><strong>公信力：</strong>在行业内有良好的口碑和信任度</li>
                                       <li><strong>受众匹配：</strong>粉丝与你的目标用户高度重叠</li>
                                       <li><strong>合作态度：</strong>愿意深入了解项目，而非仅为报酬</li>
                                     </ul>
                                   </div>
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">KOL合作方式</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li><strong>内容创作：</strong>请KOL创作关于项目的文章、视频或直播</li>
                                       <li><strong>AMA参与：</strong>邀请KOL作为嘉宾参与AMA活动</li>
                                       <li><strong>社区分享：</strong>请KOL在其社区分享项目信息</li>
                                       <li><strong>长期合作：</strong>聘请KOL作为项目顾问或大使</li>
                                       <li><strong>激励计划：</strong>设计基于绩效的奖励机制</li>
                                     </ul>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                   <h4 className="text-white font-medium mb-2">KOL合作管理与优化</h4>
                                   <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                     <li>建立KOL数据库，记录合作历史和效果</li>
                                     <li>为KOL提供充分的项目信息和资源支持</li>
                                     <li>设定明确的合作目标和指标</li>
                                     <li>定期评估合作效果，优化合作策略</li>
                                     <li>建立长期合作关系，培养KOL成为项目支持者</li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-globe text-blue-400 mr-2"></i>
                                 跨平台传播策略
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">不同平台的特性与运营重点</h4>
                                   <p className="text-gray-300 mb-4">
                                     每个社交媒体平台都有其独特的用户群体、内容形式和互动方式，了解这些特性并制定相应的运营策略，可以最大化传播效果。
                                   </p>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                   <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                     <h5 className="text-white font-medium mb-2">Twitter</h5>
                                     <p className="text-gray-400 text-sm mb-2">实时信息传播、新闻发布、观点分享</p>
                                     <p className="text-blue-400 text-xs">适合：快速传播、建立品牌、与KOL互动</p>
                                   </div>
                                   <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                     <h5 className="text-white font-medium mb-2">Telegram</h5>
                                     <p className="text-gray-400 text-sm mb-2">社区交流、用户服务、深度讨论</p>
                                     <p className="text-blue-400 text-xs">适合：建立核心社区、提供支持、收集反馈</p>
                                   </div>
                                   <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                     <h5 className="text-white font-medium mb-2">Discord</h5>
                                     <p className="text-gray-400 text-sm mb-2">技术社区、游戏社区、多功能互动</p>
                                     <p className="text-blue-400 text-xs">适合：技术讨论、活动组织、社群运营</p>
                                   </div>
                                   <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                     <h5 className="text-white font-medium mb-2">Medium</h5>
                                     <p className="text-gray-400 text-sm mb-2">深度文章、技术教程、项目分析</p>
                                     <p className="text-blue-400 text-xs">适合：建立专业形象、内容沉淀、SEO优化</p>
                                   </div>
                                   <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                     <h5 className="text-white font-medium mb-2">YouTube</h5>
                                     <p className="text-gray-400 text-sm mb-2">视频教程、项目演示、访谈内容</p>
                                     <p className="text-blue-400 text-xs">适合：视觉化内容、教育用户、扩大受众</p>
                                     </div>
                                     <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                     <h5 className="text-white font-medium mb-2">Reddit</h5>
                                     <p className="text-gray-400 text-sm mb-2">论坛讨论、AMA活动、社区自治</p>
                                     <p className="text-blue-400 text-xs">适合：深度讨论、收集意见、社区投票</p>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                   <h4 className="text-white font-medium mb-2">跨平台内容策略</h4>
                                   <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                     <li><strong>内容适配：</strong>根据平台特性调整内容形式和风格</li>
                                     <li><strong>统一声音：</strong>保持品牌形象和核心信息的一致性</li>
                                     <li><strong>内容联动：</strong>在不同平台间引导用户互动，扩大影响力</li>
                                     <li><strong>数据共享：</strong>利用一个平台的优质内容引流到其他平台</li>
                                     <li><strong>节奏协调：</strong>协调不同平台的内容发布时间，形成传播矩阵</li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-bullhorn text-orange-400 mr-2"></i>
                                 PR发布与媒体关系管理
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">Web3项目PR的重要性</h4>
                                   <p className="text-gray-300 mb-4">
                                     公共关系（PR）是Web3项目建立品牌形象、获取媒体报道、吸引投资者和用户的重要手段。有效的PR策略可以帮助项目在竞争激烈的市场中脱颖而出。
                                   </p>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">PR发布时机与内容规划</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li><strong>项目里程碑：</strong>白皮书发布、测试网上线、主网上线</li>
                                       <li><strong>重要合作：</strong>与其他项目、机构的合作消息</li>
                                       <li><strong>产品更新：</strong>功能迭代、用户体验优化</li>
                                       <li><strong>融资消息：</strong>获得投资、战略融资</li>
                                       <li><strong>社区活动：</strong>大型线上/线下活动、AMA</li>
                                     </ul>
                                   </div>
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">媒体关系建立与维护</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li>建立媒体清单，分类管理不同类型的媒体</li>
                                       <li>主动联系记者，建立长期合作关系</li>
                                       <li>定期发送项目更新和新闻稿</li>
                                       <li>邀请媒体参加项目活动和AMA</li>
                                       <li>提供独家新闻和专访机会</li>
                                     </ul>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                   <h4 className="text-white font-medium mb-2">新闻稿撰写技巧</h4>
                                   <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                     <li><strong>标题吸引人：</strong>简洁明了，突出核心信息</li>
                                     <li><strong>导语清晰：</strong>第一段概括最重要的信息</li>
                                     <li><strong>内容客观：</strong>用事实说话，避免过度宣传</li>
                                     <li><strong>数据支撑：</strong>使用具体数据增强说服力</li>
                                     <li><strong>包含联系方式：</strong>提供媒体联系人信息</li>
                                     <li><strong>多媒体元素：</strong>附带图片、视频等素材</li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-rocket text-purple-400 mr-2"></i>
                                 社群传播案例分析
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">成功案例：Axie Infinity社群建设</h4>
                                   <div className="space-y-3">
                                     <div>
                                       <h5 className="text-white font-medium">背景与挑战：</h5>
                                       <p className="text-gray-300 text-sm">Axie Infinity是一款基于以太坊的链游，在上线初期面临用户增长缓慢、市场认知度低的问题。</p>
                                     </div>
                                     <div>
                                       <h5 className="text-white font-medium">策略与执行：</h5>
                                       <p className="text-gray-300 text-sm">
                                         1. 创建了专门的Discord社区，提供游戏攻略和支持<br/>
                                         2. 设计了创新的Play-to-Earn经济模型，激励用户推广<br/>
                                         3. 与东南亚地区KOL合作，快速获取用户<br/>
                                         4. 鼓励用户创作内容，形成UGC生态<br/>
                                         5. 建立了完善的社区治理机制
                                       </p>
                                     </div>
                                     <div>
                                       <h5 className="text-white font-medium">成果：</h5>
                                       <p className="text-gray-300 text-sm">社区规模从几千人迅速增长到数百万，成为链游领域的标杆项目，最高日活用户超过200万。</p>
                                     </div>
                                     <div>
                                       <h5 className="text-white font-medium">启示：</h5>
                                       <p className="text-gray-300 text-sm">将经济激励与社群建设相结合，提供有价值的内容和服务，鼓励用户参与和创作，是社群快速增长的关键。</p>
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-gray-800 rounded-lg p-5">
                                   <h4 className="text-white font-medium mb-3">失败案例：某DeFi项目的社区危机</h4>
                                   <div className="space-y-3">
                                     <div>
                                       <h5 className="text-white font-medium">背景与问题：</h5>
                                       <p className="text-gray-300 text-sm">某DeFi项目因合约漏洞导致用户资金损失，但团队初期选择隐瞒问题，导致社区信任崩溃。</p>
                                     </div>
                                     <div>
                                       <h5 className="text-white font-medium">错误应对：</h5>
                                       <p className="text-gray-300 text-sm">
                                         1. 延迟回应，试图掩盖问题<br/>
                                         2. 与社区成员争论，态度傲慢<br/>
                                         3. 没有提供明确的解决方案和时间表<br/>
                                         4. 团队内部出现分歧，信息不一致
                                       </p>
                                     </div>
                                     <div>
                                       <h5 className="text-white font-medium">后果：</h5>
                                       <p className="text-gray-300 text-sm">用户大规模流失，TVL（总锁仓价值）下降90%以上，项目一蹶不振。</p>
                                     </div>
                                     <div>
                                       <h5 className="text-white font-medium">教训：</h5>
                                       <p className="text-gray-300 text-sm">在社区危机面前，诚实、透明和快速响应至关重要，任何隐瞒或拖延都会加剧危机，损害项目长期发展。</p>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                               <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                 <i className="fa-solid fa-compass text-yellow-400 mr-2"></i>
                                 社群传播未来趋势
                               </h3>
                               
                               <div className="space-y-6">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">技术发展趋势</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li><strong>AI驱动的社群管理：</strong>自动化内容生成、用户互动和数据分析</li>
                                       <li><strong>去中心化社交平台：</strong>基于区块链的社交网络，保护用户数据和隐私</li>
                                       <li><strong>元宇宙社区：</strong>3D虚拟空间中的社区互动和活动</li>
                                       <li><strong>跨链社区工具：</strong>支持多链生态的社区管理工具</li>
                                     </ul>
                                   </div>
                                   <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                     <h4 className="text-white font-medium mb-2">运营模式趋势</h4>
                                     <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                       <li><strong>社区自治深化：</strong>更多的决策权力下放给社区</li>
                                       <li><strong>贡献者经济：</strong>更加完善的贡献激励和价值分配机制</li>
                                       <li><strong>跨社区协作：</strong>不同项目社区之间的合作和资源共享</li>
                                       <li><strong>线下线上融合：</strong>线上社区与线下活动的深度融合</li>
                                     </ul>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                   <h4 className="text-white font-medium mb-2 flex items-center">
                                     <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                     未来机会：
                                   </h4>
                                   <p className="text-gray-300">
                                     随着Web3的发展，社群传播将变得越来越重要，也将越来越专业化。未来，能够将技术创新、经济激励和社区建设有效结合的项目，将在竞争中占据优势地位。掌握社群传播与PR技能，将成为Web3从业者的核心竞争力之一。
                                   </p>
                                 </div>
                               </div>
                             </div>
                           </motion.div>
                         )}
                        {module.id === 'module-10' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="mb-12"
                          >
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                              <i className="fa-solid fa-code text-blue-400 mr-2"></i>
                              Web3技术学习路径详解
                            </h2>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                                为什么学习Web3技术？
                              </h3>
                              <p className="text-gray-300 mb-4">
                                掌握Web3技术不仅可以让你更深入地理解区块链生态系统，还能为你创造更多的职业机会。随着区块链技术的普及，对具备相关开发技能的人才需求正在快速增长。无论是构建DApp、开发智能合约、分析链上数据还是创建工具，Web3技术都能为你提供广阔的发展空间。
                              </p>
                              
                              <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                                <p className="text-gray-300 italic font-medium">
                                  一句话总结：<br/>
                                  技术能力 = 深入参与Web3的"万能钥匙" + 职业发展的"加速器"
                                </p>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-sitemap text-yellow-400 mr-2"></i>
                                学习路径总览
                              </h3>
                              
                              <div className="space-y-6">
                                <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                  <ol className="list-decimal pl-6 text-gray-300 space-y-3">
                                    <li>
                                      <strong>阶段一：编程基础与区块链概念</strong>
                                      <p className="text-sm mt-1">学习基础编程语言，理解区块链核心概念</p>
                                    </li>
                                    <li>
                                      <strong>阶段二：Web3基础开发</strong>
                                      <p className="text-sm mt-1">学习使用Web3.js/Ethers.js与区块链交互</p>
                                    </li>
                                    <li>
                                      <strong>阶段三：智能合约开发</strong>
                                      <p className="text-sm mt-1">掌握Solidity语言和智能合约开发</p>
                                    </li>
                                    <li>
                                      <strong>阶段四：链上数据分析</strong>
                                      <p className="text-sm mt-1">使用Python进行链上数据获取和分析</p>
                                    </li>
                                    <li>
                                      <strong>阶段五：全栈DApp开发</strong>
                                      <p className="text-sm mt-1">结合前后端技术构建完整的去中心化应用</p>
                                    </li>
                                    <li>
                                      <strong>阶段六：专题深化</strong>
                                      <p className="text-sm mt-1">选择特定领域（如DeFi、NFT、GameFi等）深入研究</p>
                                    </li>
                                  </ol>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-laptop-code text-blue-400 mr-2"></i>
                                阶段一：编程基础与区块链概念
                              </h3>
                              
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                    <h4 className="text-white font-medium mb-2">编程语言选择</h4>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li><strong>Python：</strong>适合数据分析和脚本开发，学习曲线平缓</li>
                                      <li><strong>JavaScript/TypeScript：</strong>适合前端DApp开发和区块链交互</li>
                                      <li><strong>Solidity：</strong>以太坊智能合约开发的主要语言</li>
                                    </ul>
                                    <div className="mt-3 text-sm text-blue-400">
                                      <p><strong>推荐学习资源：</strong></p>
                                      <p>Python：Codecademy、freeCodeCamp</p>
                                      <p>JavaScript：MDN Web Docs、The Odin Project</p>
                                    </div>
                                  </div>
                                  <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                    <h4 className="text-white font-medium mb-2">区块链核心概念</h4>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li>理解区块链的基本工作原理</li>
                                      <li>掌握交易、区块、共识机制等概念</li>
                                      <li>了解以太坊虚拟机(EVM)工作原理</li>
                                      <li>学习钱包、私钥、公钥等安全概念</li>
                                    </ul>
                                    <div className="mt-3 text-sm text-blue-400">
                                      <p><strong>推荐学习资源：</strong></p>
                                      <p>《区块链原理与技术》课程、以太坊官方文档</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-link text-green-400 mr-2"></i>
                                阶段二：Web3基础开发
                              </h3>
                              
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-lg font-medium text-white mb-3">Web3.js与Ethers.js入门</h4>
                                  <div className="bg-gray-800 rounded-lg p-5">
                                    <p className="text-gray-300 text-sm mb-3">
                                      Web3.js和Ethers.js是与以太坊区块链交互的核心JavaScript库，学习这些库可以帮助你构建能够与区块链通信的应用。
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                      <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                        <h5 className="text-white font-medium mb-2">Web3.js核心功能</h5>
                                        <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                          <li>连接以太坊网络</li>
                                          <li>读取区块链数据</li>
                                          <li>发送交易</li>
                                          <li>与智能合约交互</li>
                                        </ul>
                                      </div>
                                      <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                        <h5 className="text-white font-medium mb-2">Ethers.js优势</h5>
                                        <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                          <li>API设计更现代简洁</li>
                                          <li>性能更好</li>
                                          <li>更完善的TypeScript支持</li>
                                          <li>开发社区更活跃</li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="text-sm text-blue-400">
                                      <p><strong>推荐学习资源：</strong></p>
                                      <p>Web3.js官方文档、Ethers.js文档、Buildspace教程</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-puzzle-piece text-purple-400 mr-2"></i>
                                阶段三：智能合约开发
                              </h3>
                              
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-lg font-medium text-white mb-3">Solidity语言基础</h4>
                                  <div className="bg-gray-800 rounded-lg p-5">
                                    <p className="text-gray-300 text-sm mb-3">
                                      Solidity是开发以太坊智能合约的主要编程语言，掌握Solidity是成为区块链开发者的关键一步。
                                    </p>
                                    <div className="mb-4">
                                      <h5 className="text-white font-medium mb-2">Solidity核心概念</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>合约结构和语法</li>
                                        <li>数据类型和变量</li>
                                        <li>函数和修饰器</li>
                                        <li>事件和日志</li>
                                        <li>继承和接口</li>
                                      </ul>
                                    </div>
                                    <div className="text-sm text-blue-400">
                                      <p><strong>推荐学习资源：</strong></p>
                                      <p>CryptoZombies、Solidity官方文档、Chainshot课程</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-database text-orange-400 mr-2"></i>
                                阶段四：链上数据分析
                              </h3>
                              
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-lg font-medium text-white mb-3">Python链上数据分析实战</h4>
                                  <div className="bg-gray-800 rounded-lg p-5">
                                    <p className="text-gray-300 text-sm mb-3">
                                      使用Python获取和分析链上数据，可以帮助你深入了解区块链生态系统的运行状况，发现有价值的洞见。
                                    </p>
                                    <div className="mb-4">
                                      <h5 className="text-white font-medium mb-2">常用Python库</h5>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">数据获取</h6>
                                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                            <li>web3.py：与以太坊交互</li>
                                            <li>requests：调用API</li>
                                            <li>etherscan-python：访问Etherscan API</li>
                                          </ul>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">数据分析与可视化</h6>
                                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                            <li>pandas：数据处理</li>
                                            <li>matplotlib/seaborn：数据可视化</li>
                                            <li>numpy：数值计算</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-sm text-blue-400">
                                      <p><strong>推荐学习资源：</strong></p>
                                      <p>DataCamp Python课程、Dune Analytics社区教程、Chainlink Data Feeds文档</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-laptop text-pink-400 mr-2"></i>
                                阶段五：全栈DApp开发
                              </h3>
                              
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-lg font-medium text-white mb-3">构建完整的去中心化应用</h4>
                                  <div className="bg-gray-800 rounded-lg p-5">
                                    <p className="text-gray-300 text-sm mb-3">
                                      学习全栈DApp开发，可以让你构建完整的区块链应用，从前端界面到后端服务，再到智能合约，实现端到端的用户体验。
                                    </p>
                                    <div className="mb-4">
                                      <h5 className="text-white font-medium mb-2">DApp开发技术栈</h5>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">前端</h6>
                                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                            <li>React.js/Vue.js</li>
                                            <li>Next.js框架</li>
                                            <li>Web3Modal</li>
                                            <li>Chakra UI/MUI</li>
                                          </ul>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">后端</h6>
                                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                            <li>Node.js/Express</li>
                                            <li>GraphQL/REST API</li>
                                            <li>MongoDB/PostgreSQL</li>
                                          </ul>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">区块链</h6>
                                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                            <li>Solidity/WASM</li>
                                            <li>Hardhat/Truffle</li>
                                            <li>Infura/Alchemy</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-sm text-blue-400">
                                      <p><strong>推荐学习资源：</strong></p>
                                      <p>Buildspace、Alchemy University、Eth.build</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-microscope text-blue-400 mr-2"></i>
                                阶段六：专题深化
                              </h3>
                              
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-lg font-medium text-white mb-3">选择特定领域深入研究</h4>
                                  <div className="bg-gray-800 rounded-lg p-5">
                                    <p className="text-gray-300 text-sm mb-3">
                                      在掌握了Web3的基础知识后，选择一个特定领域深入研究，可以让你成为该领域的专家，提升自己的竞争力。
                                    </p>
                                    <div className="mb-4">
                                      <h5 className="text-white font-medium mb-2">热门研究方向</h5>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">DeFi开发</h6>
                                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                            <li>AMM算法实现</li>
                                            <li>借贷协议开发</li>
                                            <li>稳定币机制</li>
                                            <li>跨链桥技术</li>
                                          </ul>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">NFT生态</h6>
                                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                            <li>ERC-721/1155标准</li>
                                            <li>NFT市场开发</li>
                                            <li>动态NFT技术</li>
                                            <li>元宇宙资产集成</li>
                                          </ul>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">Layer 2解决方案</h6>
                                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                            <li>Rollup技术</li>
                                            <li>状态通道</li>
                                            <li>Validium/Volition</li>
                                            <li>扩容性能优化</li>
                                          </ul>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">链上治理</h6>
                                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                            <li>DAO智能合约</li>
                                            <li>投票机制</li>
                                            <li>委托治理</li>
                                            <li>二次方投票</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-toolbox text-yellow-400 mr-2"></i>
                                实用开发工具与环境搭建
                              </h3>
                              
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                    <h4 className="text-white font-medium mb-2">开发环境配置</h4>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                      <li><strong>Node.js环境：</strong>安装Node.js和npm/yarn/pnpm</li>
                                      <li><strong>钱包配置：</strong>安装MetaMask并配置测试网络</li>
                                      <li><strong>开发框架：</strong>Hardhat/Truffle/Foundry安装与配置</li>
                                      <li><strong>API密钥：</strong>申请Infura/Alchemy/Moralis API密钥</li>
                                      <li><strong>代码编辑器：</strong>VSCode + Solidity插件</li>
                                    </ul>
                                  </div>
                                  <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                    <h4 className="text-white font-medium mb-2">必备开发工具</h4>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                      <li><strong>Hardhat：</strong>以太坊开发环境和测试框架</li>
                                      <li><strong>Truffle：</strong>智能合约开发和部署工具</li>
                                      <li><strong>Foundry：</strong>高性能Solidity开发工具链</li>
                                      <li><strong>Ganache：</strong>本地区块链测试环境</li>
                                      <li><strong>Waffle：</strong>智能合约测试库</li>
                                      <li><strong>Slither：</strong>智能合约静态分析工具</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-rocket text-purple-400 mr-2"></i>
                                技术实战项目建议
                              </h3>
                              
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-lg font-medium text-white mb-3">从简单到复杂的项目实践</h4>
                                  <div className="bg-gray-800 rounded-lg p-5">
                                    <p className="text-gray-300 text-sm mb-3">
                                      通过实际项目练习，可以巩固所学知识，提升技术能力，同时也能为你的作品集增添亮点。
                                    </p>
                                    <div className="mb-4">
                                      <h5 className="text-white font-medium mb-2">入门级项目</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                        <li>创建一个简单的ERC-20代币</li>
                                        <li>开发基本的NFT铸造DApp</li>
                                        <li>构建一个链上数据查询工具</li>
                                        <li>实现一个简单的投票DApp</li>
                                      </ul>
                                    </div>
                                    <div className="mb-4">
                                      <h5 className="text-white font-medium mb-2">中级项目</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                        <li>开发一个简单的DEX协议</li>
                                        <li>构建多签钱包应用</li>
                                        <li>实现一个DAO治理系统</li>
                                        <li>创建跨链NFT桥梁</li>
                                      </ul>
                                    </div>
                                    <div className="mb-4">
                                      <h5 className="text-white font-medium mb-2">高级项目</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                        <li>开发借贷协议</li>
                                        <li>构建Layer 2兼容DApp</li>
                                        <li>实现AMM算法和流动性池</li>
                                        <li>创建复杂的GameFi智能合约系统</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-graduation-cap text-green-400 mr-2"></i>
                                学习资源与社区
                              </h3>
                              
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                    <h4 className="text-white font-medium mb-2">优质学习资源</h4>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                      <li><strong>在线课程：</strong>coursera、Udemy、Buildspace、Alchemy University</li>
                                      <li><strong>文档与指南：</strong>以太坊官方文档、Solidity文档、Web3.js文档</li>
                                      <li><strong>教程网站：</strong>freeCodeCamp、CryptoZombies、Chainshot</li>
                                      <li><strong>YouTube频道：</strong>Dapp University、 EatTheBlocks、 Ivan on Tech</li>
                                      <li><strong>书籍：</strong>《精通以太坊》、《区块链开发指南》</li>
                                    </ul>
                                  </div>
                                  <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                    <h4 className="text-white font-medium mb-2">开发者社区</h4>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                      <li><strong>Discord社区：</strong>Ethereum、Solidity、Web3.js、Hardhat</li>
                                      <li><strong>GitHub：</strong>参与开源项目、学习代码</li>
                                      <li><strong>Twitter：</strong>关注开发者、项目和趋势</li>
                                      <li><strong>线下活动：</strong>Meetup、Hackathon、Devcon</li>
                                      <li><strong>论坛：</strong>Ethereum Stack Exchange、Reddit</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <i className="fa-solid fa-briefcase text-blue-400 mr-2"></i>
                                Web3技术职业发展
                              </h3>
                              
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-lg font-medium text-white mb-3">职业方向与技能要求</h4>
                                  <div className="bg-gray-800 rounded-lg p-5">
                                    <p className="text-gray-300 text-sm mb-3">
                                      掌握Web3技术可以开启多种职业发展路径，从开发到研究，从技术到产品，有广阔的发展空间。
                                    </p>
                                    <div className="mb-4">
                                      <h5 className="text-white font-medium mb-2">主要职业方向</h5>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">智能合约开发者</h6>
                                          <p className="text-gray-300 text-sm mb-2">负责开发和审计智能合约代码</p>
                                          <p className="text-gray-400 text-xs">技能要求：Solidity、Vyper、安全审计</p>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">前端DApp开发者</h6>
                                          <p className="text-gray-300 text-sm mb-2">构建区块链应用的用户界面</p>
                                          <p className="text-gray-400 text-xs">技能要求：React、Web3.js、UX设计</p>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">区块链后端工程师</h6>
                                          <p className="text-gray-300 text-sm mb-2">开发区块链基础设施和API服务</p>
                                          <p className="text-gray-400 text-xs">技能要求：Node.js、Go、区块链协议</p>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">链上数据分析师</h6>
                                          <p className="text-gray-300 text-sm mb-2">分析区块链数据并提取洞见</p>
                                          <p className="text-gray-400 text-xs">技能要求：Python、SQL、数据可视化</p>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">区块链安全专家</h6>
                                          <p className="text-gray-300 text-sm mb-2">审计合约和系统安全</p>
                                          <p className="text-gray-400 text-xs">技能要求：安全审计、渗透测试、密码学</p>
                                        </div>
                                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                          <h6 className="text-white font-medium mb-2">区块链产品经理</h6>
                                          <p className="text-gray-300 text-sm mb-2">设计和管理区块链产品</p>
                                          <p className="text-gray-400 text-xs">技能要求：产品设计、区块链知识、市场分析</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                  {/* 交易所玩法详细内容 */}
                  {module.id === 'module-7' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className="mb-12"
                    >
                      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                        <i className="fa-solid fa-chart-line text-orange-400 mr-2"></i>
                        交易所玩法详解
                      </h2>
                      
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                          什么是交易所？
                        </h3>
                        <p className="text-gray-300 mb-4">
                          加密货币交易所是允许用户买卖、交易加密货币的平台，是进入加密货币市场的主要入口。交易所提供了价格发现、流动性提供、交易执行等核心功能，让用户能够方便地进行加密资产的兑换和管理。
                        </p>
                        
                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                          <p className="text-gray-300 italic font-medium">
                            一句话总结：<br/>
                            交易所 = 加密货币的"股票市场" + "银行柜台" + "资产管理中心"
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <i className="fa-solid fa-sitemap text-yellow-400 mr-2"></i>
                          交易所类型与特点
                        </h3>
                        
                        <div className="overflow-x-auto mb-6">
                          <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                            <thead>
                              <tr className="border-b border-gray-800">
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">类型</th>
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">定义</th>
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">优点</th>
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">缺点</th>
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">代表</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="px-4 py-3 text-white font-medium">中心化交易所 (CEX)</td>
                                <td className="px-4 py-3 text-gray-300">由中心化机构运营的交易平台</td>
                                <td className="px-4 py-3 text-gray-300">高流动性、易用、安全</td>
                                <td className="px-4 py-3 text-gray-300">需KYC、存在信任风险</td>
                                <td className="px-4 py-3 text-gray-300">Binance、OKX、Coinbase</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-white font-medium">去中心化交易所 (DEX)</td>
                                <td className="px-4 py-3 text-gray-300">基于智能合约的交易平台</td>
                                <td className="px-4 py-3 text-gray-300">无需KYC、用户掌控私钥</td>
                                <td className="px-4 py-3 text-gray-300">流动性较低、操作复杂</td>
                                <td className="px-4 py-3 text-gray-300">Uniswap、Curve、PancakeSwap</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                            新手建议：
                          </h4>
                          <p className="text-gray-300">
                            新手建议从中心化交易所（CEX）开始，熟悉基本交易操作后再尝试去中心化交易所（DEX）。
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <i className="fa-solid fa-exchange-alt text-blue-400 mr-2"></i>
                          现货交易详解
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">什么是现货交易？</h4>
                            <p className="text-gray-300 mb-3">
                              现货交易是指直接买卖实际加密货币的交易方式，类似于传统股票市场的"实盘交易"。在现货交易中，你用一种加密货币（如USDT）购买另一种加密货币（如BTC），并实际拥有这些资产。
                            </p>
                            
                            <h4 className="text-white font-medium mb-3 mt-4">现货交易基本流程</h4>
                            <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                              <li>在交易所注册并完成KYC认证</li>
                              <li>充值法币或加密货币到交易所账户</li>
                              <li>进入现货交易区，选择交易对（如BTC/USDT）</li>
                              <li>选择交易类型（市价单/限价单/止损单）</li>
                              <li>输入买入/卖出价格和数量</li>
                              <li>确认交易并等待成交</li>
                              <li>交易完成后，资产会显示在你的账户余额中</li>
                            </ol>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">现货交易类型</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">市价单</h5>
                                <p className="text-gray-300 text-sm">以当前市场价格立即成交的订单</p>
                                <p className="text-blue-400 text-xs mt-1">适合需要快速成交的情况</p>
                              </div>
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">限价单</h5>
                                <p className="text-gray-300 text-sm">设置特定价格买入或卖出的订单</p>
                                <p className="text-blue-400 text-xs mt-1">适合有特定价格目标的交易</p>
                              </div>
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">止损单</h5>
                                <p className="text-gray-300 text-sm">设置止损价格的订单，用于风险控制</p>
                                <p className="text-blue-400 text-xs mt-1">适合控制亏损幅度</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">现货交易费用</h4>
                            <p className="text-gray-300 mb-3">
                              交易所通常收取以下几种费用：
                            </p>
                            <ul className="list-disc pl-6 text-gray-300 space-y-1">
                              <li><strong>交易手续费：</strong>根据交易量和会员等级收取，通常为0.1%-0.2%</li>
                              <li><strong>提现手续费：</strong>提币到外部钱包时收取的费用</li>
                              <li><strong>充值手续费：</strong>部分交易所可能收取充值费用</li>
                            </ul>
                            <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-3">
                              <p className="text-gray-300 italic">
                                <i className="fa-info-circle text-blue-400 mr-1"></i>
                                提示：交易量越大，手续费率通常越低。很多交易所提供VIP等级制度，降低高频交易者的手续费。
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <i className="fa-solid fa-chart-line text-purple-400 mr-2"></i>
                          合约交易原理与风险
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">什么是合约交易？</h4>
                            <p className="text-gray-300 mb-3">
                              合约交易是一种衍生品交易，允许用户通过保证金（Margin）交易来放大收益（或亏损）。与现货交易不同，合约交易并不实际持有加密货币，而是基于加密货币价格的变化进行投机交易。
                            </p>
                            <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                              <h5 className="text-white font-medium mb-2 flex items-center">
                                <i className="fa-solid fa-exclamation-triangle text-red-400 mr-2"></i>
                                风险警告：
                              </h5>
                              <p className="text-gray-300">
                                合约交易具有高杠杆、高风险特性，可能导致本金全部损失，不建议新手轻易尝试。
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">合约交易类型</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">永续合约</h5>
                                <p className="text-gray-300 text-sm">没有到期日的合约，可以长期持有</p>
                                <p className="text-blue-400 text-xs mt-1">通过资金费率机制锚定现货价格</p>
                              </div>
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">交割合约</h5>
                                <p className="text-gray-300 text-sm">有固定到期日的合约，到期自动结算</p>
                                <p className="text-blue-400 text-xs mt-1">分为当周、次周、季度合约等</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">杠杆机制详解</h4>
                            <p className="text-gray-300 mb-3">
                              杠杆是合约交易的核心特性，允许用户用较少的资金控制较大的交易头寸：
                            </p>
                            <div className="overflow-x-auto mb-4">
                              <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                <thead>
                                  <tr className="border-b border-gray-800">
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">杠杆倍数</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">保证金比例</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">价格波动1%的影响</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-gray-800">
                                    <td className="px-4 py-3 text-white font-medium">1x</td>
                                    <td className="px-4 py-3 text-gray-300">100%</td>
                                    <td className="px-4 py-3 text-gray-300">资产变动±1%</td>
                                  </tr>
                                  <tr className="border-b border-gray-800">
                                    <td className="px-4 py-3 text-white font-medium">10x</td>
                                    <td className="px-4 py-3 text-gray-300">10%</td>
                                    <td className="px-4 py-3 text-gray-300">资产变动±10%</td>
                                  </tr>
                                  <tr className="border-b border-gray-800">
                                    <td className="px-4 py-3 text-white font-medium">50x</td>
                                    <td className="px-4 py-3 text-gray-300">2%</td>
                                    <td className="px-4 py-3 text-gray-300">资产变动±50%</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-white font-medium">100x</td>
                                    <td className="px-4 py-3 text-gray-300">1%</td>
                                    <td className="px-4 py-3 text-gray-300">资产变动±100%</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
                              <h5 className="text-white font-medium mb-2 flex items-center">
                                <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                重要公式：
                              </h5>
                              <p className="text-gray-300">
                                杠杆倍数 = 交易金额 ÷ 保证金金额<br/>
                                维持保证金 = 开仓保证金 × 维持保证金率<br/>
                                强平价格 = 开仓价格 × (1 ± 维持保证金率 ÷ 杠杆倍数)
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">合约交易风险控制</h4>
                            <ul className="list-disc pl-6 text-gray-300 space-y-1">
                              <li>从低杠杆开始（建议新手使用1-5倍杠杆）</li>
                              <li>设置合理的止盈止损</li>
                              <li>不要把所有资金投入单一交易</li>
                              <li>控制仓位，避免过度交易</li>
                              <li>密切关注市场动态和新闻</li>
                              <li>避免在高波动时段进行大额交易</li>
                              <li>保持冷静，避免情绪化交易</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <i className="fa-solid fa-robot text-green-400 mr-2"></i>
                          量化交易策略基础
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">什么是量化交易？</h4>
                            <p className="text-gray-300 mb-3">
                              量化交易是利用计算机程序和数学模型来执行交易策略的方法。通过回测历史数据、识别市场模式并自动执行交易，量化交易可以帮助减少人为情绪的影响，提高交易效率和一致性。
                            </p>
                            <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                              <p className="text-gray-300 italic">
                                <i className="fa-info-circle text-blue-400 mr-1"></i>
                                提示：量化交易并不保证盈利，但可以帮助系统地执行交易计划。
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">常见量化交易策略</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">趋势跟踪</h5>
                                <p className="text-gray-300 text-sm">基于价格趋势进行交易，追涨杀跌</p>
                                <p className="text-blue-400 text-xs mt-1">适合有明显趋势的市场</p>
                              </div>
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">均值回归</h5>
                                <p className="text-gray-300 text-sm">基于价格回归平均值的策略</p>
                                <p className="text-blue-400 text-xs mt-1">适合震荡行情</p>
                              </div>
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">套利策略</h5>
                                <p className="text-gray-300 text-sm">利用不同市场间的价格差异获利</p>
                                <p className="text-blue-400 text-xs mt-1">需要快速执行能力</p>
                              </div>
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">做市策略</h5>
                                <p className="text-gray-300 text-sm">在买卖双方提供流动性获利</p>
                                <p className="text-blue-400 text-xs mt-1">适合高流动性市场</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">量化交易工具与平台</h4>
                            <div className="overflow-x-auto mb-4">
                              <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                <thead>
                                  <tr className="border-b border-gray-800">
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">平台/工具</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">适合人群</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-gray-800">
                                    <td className="px-4 py-3 text-white font-medium">TradingView</td>
                                    <td className="px-4 py-3 text-gray-300">图表分析和策略回测</td>
                                    <td className="px-4 py-3 text-gray-300">入门到进阶</td>
                                  </tr>
                                  <tr className="border-b border-gray-800">
                                    <td className="px-4 py-3 text-white font-medium">Freqtrade</td>
                                    <td className="px-4 py-3 text-gray-300">开源加密货币交易机器人</td>
                                    <td className="px-4 py-3 text-gray-300">有编程基础</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-white font-medium">3Commas</td>
                                    <td className="px-4 py-3 text-gray-300">无需编程的交易机器人平台</td>
                                    <td className="px-4 py-3 text-gray-300">初学者</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
                              <h5 className="text-white font-medium mb-2 flex items-center">
                                <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                新手建议：
                              </h5>
                              <p className="text-gray-300">
                                新手可以从使用TradingView进行策略回测开始，了解量化交易的基本概念，再逐步尝试简单的自动化交易。
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <i className="fa-solid fa-rocket text-orange-400 mr-2"></i>
                          Launchpad打新详解
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">什么是Launchpad？</h4>
                            <p className="text-gray-300 mb-3">
                              Launchpad是交易所或平台为新项目提供的代币发行平台，允许用户以较低价格参与新项目的代币预售。通过Launchpad，项目方可以快速获得初始资金，投资者则有机会以较低价格获得潜在的高增长代币。
                            </p>
                            <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-4">
                              <h5 className="text-white font-medium mb-2 flex items-center">
                                <i className="fa-solid fa-lightbulb text-green-400 mr-2"></i>
                                成功案例：
                              </h5>
                              <p className="text-gray-300">
                                Binance Launchpad曾推出多个成功项目，如BNB、DOT、SOL等，早期参与者获得了可观的回报。
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">参与Launchpad的条件与流程</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h5 className="text-white font-medium mb-2">常见参与条件</h5>
                                <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                  <li>持有交易所平台币（如BNB、HT、OKB）</li>
                                  <li>满足一定的交易或持仓量要求</li>
                                  <li>完成KYC认证</li>
                                  <li>抽签或采用阶梯分配机制</li>
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-white font-medium mb-2">参与基本流程</h5>
                                <ol className="list-decimal pl-6 text-gray-300 space-y-1 text-sm">
                                  <li>关注交易所公告，了解新项目信息</li>
                                  <li>准备所需的平台币或满足参与条件</li>
                                  <li>在规定时间内参与认购</li>
                                  <li>等待分配结果</li>
                                  <li>代币发放并可在二级市场交易</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">主流Launchpad平台</h4>
                            <div className="overflow-x-auto mb-4">
                              <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                <thead>
                                  <tr className="border-b border-gray-800">
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">平台</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">所属交易所</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">参与要求</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-gray-800">
                                    <td className="px-4 py-3 text-white font-medium">Binance Launchpad</td>
                                    <td className="px-4 py-3 text-gray-300">Binance</td>
                                    <td className="px-4 py-3 text-gray-300">持有BNB</td>
                                    <td className="px-4 py-3 text-gray-300">项目质量高、历史收益好</td>
                                  </tr>
                                  <tr className="border-b border-gray-800">
                                    <td className="px-4 py-3 text-white font-medium">OKX Jumpstart</td>
                                    <td className="px-4 py-3 text-gray-300">OKX</td>
                                    <td className="px-4 py-3 text-gray-300">持有OKB或满足交易量</td>
                                    <td className="px-4 py-3 text-gray-300">多类型项目、参与门槛低</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-white font-medium">Huobi Prime</td>
                                    <td className="px-4 py-3 text-gray-300">Huobi</td>
                                    <td className="px-4 py-3 text-gray-300">持有HT或满足交易量</td>
                                    <td className="px-4 py-3 text-gray-300">早期项目较多</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">Launchpad投资策略与风险</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-4">
                                <h5 className="text-white font-medium mb-2">投资策略</h5>
                                <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                  <li>研究项目基本面和团队背景</li>
                                  <li>关注项目的市场需求和竞争优势</li>
                                  <li>合理配置资金，不要全仓参与</li>
                                  <li>设定止盈目标，及时锁定利润</li>
                                </ul>
                              </div>
                              <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                <h5 className="text-white font-medium mb-2">主要风险</h5>
                                <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                  <li>项目破发风险</li>
                                  <li>资金占用风险（锁定平台币）</li>
                                  <li>分配不公风险（中签率低）</li>
                                  <li>市场系统性风险</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <i className="fa-solid fa-piggy-bank text-pink-400 mr-2"></i>
                          加密货币理财产品
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">什么是加密理财产品？</h4>
                            <p className="text-gray-300 mb-3">
                              加密理财产品是交易所或平台提供的让用户通过持有或锁定加密货币获得额外收益的金融产品。这些产品类似于传统金融中的储蓄、理财和基金，但基于加密货币资产。
                            </p>
                            <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                              <p className="text-gray-300 italic">
                                <i className="fa-info-circle text-blue-400 mr-1"></i>
                                提示：加密理财产品的收益通常高于传统金融产品，但也伴随着更高的风险。
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">常见理财产品类型</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">活期理财</h5>
                                <p className="text-gray-300 text-sm">灵活存取，收益相对较低</p>
                                <p className="text-blue-400 text-xs mt-1">适合短期闲置资金</p>
                              </div>
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">定期理财</h5>
                                <p className="text-gray-300 text-sm">固定期限，收益相对较高</p>
                                <p className="text-blue-400 text-xs mt-1">适合中长期闲置资金</p>
                              </div>
                              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <h5 className="text-white font-medium mb-2">DeFi挖矿</h5>
                                <p className="text-gray-300 text-sm">通过锁定资产获得治理代币</p>
                                <p className="text-blue-400 text-xs mt-1">高风险高收益</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">理财产品风险评估</h4>
                            <div className="overflow-x-auto mb-4">
                              <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                <thead>
                                  <tr className="border-b border-gray-800">
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">产品类型</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">风险等级</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">预期年化收益</th>
                                    <th className="px-4 py-3 text-left text-gray-400 font-medium">适合人群</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-gray-800">
                                    <td className="px-4 py-3 text-white font-medium">平台活期</td>
                                    <td className="px-4 py-3 text-gray-300">低</td>
                                    <td className="px-4 py-3 text-gray-300">1%-5%</td>
                                    <td className="px-4 py-3 text-gray-300">保守型投资者</td>
                                  </tr>
                                  <tr className="border-b border-gray-800">
                                    <td className="px-4 py-3 text-white font-medium">平台定期</td>
                                    <td className="px-4 py-3 text-gray-300">中低</td>
                                    <td className="px-4 py-3 text-gray-300">5%-15%</td>
                                    <td className="px-4 py-3 text-gray-300">稳健型投资者</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-white font-medium">DeFi挖矿</td>
                                    <td className="px-4 py-3 text-gray-300">高</td>
                                    <td className="px-4 py-3 text-gray-300">15%+</td>
                                    <td className="px-4 py-3 text-gray-300">激进型投资者</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                              <h5 className="text-white font-medium mb-2 flex items-center">
                                <i className="fa-solid fa-exclamation-triangle text-red-400 mr-2"></i>
                                风险提示：
                              </h5>
                              <p className="text-gray-300">
                                任何投资都有风险，加密货币理财产品也不例外。请确保了解产品底层机制，不要投资超过自己能够承受损失的金额。
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <i className="fa-solid fa-shield-alt text-red-400 mr-2"></i>
                          交易所安全与风险管理
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">账户安全最佳实践</h4>
                            <ul className="list-disc pl-6 text-gray-300 space-y-1">
                              <li>使用强密码并定期更换</li>
                              <li>启用两步验证（2FA），优先使用硬件令牌</li>
                              <li>不要在公共网络或设备上登录交易所</li>
                              <li>定期检查账户登录记录和交易历史</li>
                              <li>设置交易密码和提现白名单</li>
                              <li>不要点击可疑链接或下载未知软件</li>
                            </ul>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">资产安全管理</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-4">
                                <h5 className="text-white font-medium mb-2">安全存储建议</h5>
                                <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                  <li>大额资产存储在硬件钱包中</li>
                                  <li>交易所仅保留用于交易的资金</li>
                                  <li>使用多重签名钱包保护团队资产</li>
                                  <li>备份钱包助记词并妥善保管</li>
                                </ul>
                              </div>
                              <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                <h5 className="text-white font-medium mb-2">常见安全威胁</h5>
                                <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                  <li>钓鱼攻击和网络钓鱼</li>
                                  <li>恶意软件和键盘记录器</li>
                                  <li>交易所被黑客攻击</li>
                                  <li>社交工程和诈骗</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-5">
                            <h4 className="text-white font-medium mb-3">交易风险管理策略</h4>
                            <ul className="list-disc pl-6 text-gray-300 space-y-1">
                              <li>设置明确的投资目标和风险承受能力</li>
                              <li>分散投资，不要把所有资金放在单一资产上</li>
                              <li>使用止损订单控制损失</li>
                              <li>不要过度交易，避免情绪化决策</li>
                              <li>保持学习，了解市场动态和新的风险管理工具</li>
                              <li>定期回顾和评估投资组合表现</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <i className="fa-solid fa-globe text-blue-400 mr-2"></i>
                          主流交易所对比与选择
                        </h3>
                        
                        <div className="overflow-x-auto mb-6">
                          <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                            <thead>
                              <tr className="border-b border-gray-800">
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">交易所</th>
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">成立时间</th>
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">特色</th>
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">适合人群</th>
                                <th className="px-4 py-3 text-left text-gray-400 font-medium">官网</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="px-4 py-3 text-white font-medium">Binance</td>
                                <td className="px-4 py-3 text-gray-300">2017</td>
                                <td className="px-4 py-3 text-gray-300">全球最大、品种最全、交易深度好</td>
                                <td className="px-4 py-3 text-gray-300">所有类型投资者</td>
                                <td className="px-4 py-3 text-blue-400">binance.com</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="px-4 py-3 text-white font-medium">OKX</td>
                                <td className="px-4 py-3 text-gray-300">2017</td>
                                <td className="px-4 py-3 text-gray-300">合约交易、创新产品丰富</td>
                                <td className="px-4 py-3 text-gray-300">合约交易者、高级用户</td>
                                <td className="px-4 py-3 text-blue-400">okx.com</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="px-4 py-3 text-white font-medium">Coinbase</td>
                                <td className="px-4 py-3 text-gray-300">2012</td>
                                <td className="px-4 py-3 text-gray-300">合规、用户友好、上市早</td>
                                <td className="px-4 py-3 text-gray-300">新手、机构投资者</td>
                                <td className="px-4 py-3 text-blue-400">coinbase.com</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="px-4 py-3 text-white font-medium">KuCoin</td>
                                <td className="px-4 py-3 text-gray-300">2017</td>
                                <td className="px-4 py-3 text-gray-300">新币上线快、交易费用低</td>
                                <td className="px-4 py-3 text-gray-300">寻求新币的投资者</td>
                                <td className="px-4 py-3 text-blue-400">kucoin.com</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-white font-medium">Gate.io</td>
                                <td className="px-4 py-3 text-gray-300">2013</td>
                                <td className="px-4 py-3 text-gray-300">丰富的山寨币、Launchpad</td>
                                <td className="px-4 py-3 text-gray-300">多元化投资者</td>
                                <td className="px-4 py-3 text-blue-400">gate.io</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                          <h5 className="text-white font-medium mb-2 flex items-center">
                            <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                            选择交易所的关键因素：
                          </h5>
                          <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                            <li>交易所的安全性和历史信誉</li>
                            <li>交易品种和流动性</li>
                            <li>交易费用和提现费用</li>
                            <li>用户界面和交易体验</li>
                            <li>客户支持质量</li>
                            <li>所在地区的合规性</li>
                            <li>平台提供的额外服务（如理财产品、Launchpad等）</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                {/* L2详细内容 */}
                 {module.id === 'module-2' && (
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.15 }}
                     className="mb-12"
                   >
                     <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                       <i className="fa-solid fa-link text-blue-400 mr-2"></i>
                       二链生态（L2）详解
                     </h2>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                         为什么需要 Layer2？
                       </h3>
                       <p className="text-gray-300 mb-4">
                         区块链技术面临着著名的"三难困境"（Blockchain Trilemma），无法同时完美实现以下三点：
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                         <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                           <h4 className="text-white font-medium mb-2 text-center">去中心化</h4>
                           <p className="text-gray-400 text-sm text-center">Decentralization</p>
                         </div>
                         <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                           <h4 className="text-white font-medium mb-2 text-center">安全性</h4>
                           <p className="text-gray-400 text-sm text-center">Security</p>
                         </div>
                         <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                           <h4 className="text-white font-medium mb-2 text-center">可扩展性</h4>
                           <p className="text-gray-400 text-sm text-center">Scalability</p>
                         </div>
                       </div>
                       <p className="text-gray-300 mb-4">
                         以太坊选择了安全 + 去中心化 → 性能变慢、Gas 高。因此 Layer2 出现，用来解决"扩容问题"。
                       </p>
                       <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                         <p className="text-gray-300 italic">
                           一句话总结：Layer1 负责安全与共识，Layer2 负责速度与成本。
                         </p>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-cogs text-yellow-400 mr-2"></i>
                         Layer2 的工作原理（通俗理解）
                       </h3>
                       <p className="text-gray-300 mb-4">
                         想象以太坊是一条高速公路，但车太多，堵车严重。Layer2 就像"高架桥"或"收费快速路"，把交易先在链下处理，再把结果一次性上传主链结算。
                       </p>
                       <div className="bg-gray-800 rounded-lg p-5 mb-4">
                         <h4 className="text-white font-medium mb-3">🪜 基本流程：</h4>
                         <ol className="space-y-4">
                           <li className="flex">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                               <span className="text-blue-400 text-sm font-medium">1️⃣</span>
                             </div>
                             <div>
                               <p className="text-gray-300">用户把资产从 Layer1 存入 Layer2（桥接）</p>
                             </div>
                           </li>
                           <li className="flex">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                               <span className="text-blue-400 text-sm font-medium">2️⃣</span>
                             </div>
                             <div>
                               <p className="text-gray-300">Layer2 上的交易在链下执行（更快更便宜）</p>
                             </div>
                           </li>
                           <li className="flex">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                               <span className="text-blue-400 text-sm font-medium">3️⃣</span>
                             </div>
                             <div>
                               <p className="text-gray-300">定期将打包好的数据上传 Layer1（结算层）</p>
                             </div>
                           </li>
                           <li className="flex">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                               <span className="text-blue-400 text-sm font-medium">4️⃣</span>
                             </div>
                             <div>
                               <p className="text-gray-300">Layer1 验证数据正确性，确保安全性不被破坏</p>
                             </div>
                           </li>
                         </ol>
                       </div>
                       <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
                         <h4 className="text-white font-medium mb-2 flex items-center">
                           <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                           比喻：
                         </h4>
                         <p className="text-gray-300">
                           Layer2 是一个"批量收银机"，<br/>
                           它先帮你结账，然后把总账交给以太坊做审计。
                         </p>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-sitemap text-blue-400 mr-2"></i>
                         扩容方案分类（Scaling Solutions）
                       </h3>
                       <div className="overflow-x-auto">
                         <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                           <thead>
                             <tr className="border-b border-gray-800">
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">类型</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">原理</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">优点</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">缺点</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">代表</th>
                             </tr>
                           </thead>
                           <tbody>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">Rollup（汇总）</td>
                               <td className="px-4 py-3 text-gray-300">把多笔交易打包后提交至主链</td>
                               <td className="px-4 py-3 text-gray-300">安全性高、EVM兼容</td>
                               <td className="px-4 py-3 text-gray-300">数据回传延迟</td>
                               <td className="px-4 py-3 text-gray-300">Arbitrum / zkSync</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">侧链（Sidechain）</td>
                               <td className="px-4 py-3 text-gray-300">独立运行但与主链连接</td>
                               <td className="px-4 py-3 text-gray-300">成本低、自由度高</td>
                               <td className="px-4 py-3 text-gray-300">安全性依赖自身</td>
                               <td className="px-4 py-3 text-gray-300">Polygon PoS / Ronin</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">状态通道（State Channel）</td>
                               <td className="px-4 py-3 text-gray-300">双方在链下反复交互，最终一次上链</td>
                               <td className="px-4 py-3 text-gray-300">即时、私密</td>
                               <td className="px-4 py-3 text-gray-300">仅适用于固定参与方</td>
                               <td className="px-4 py-3 text-gray-300">Raiden / Lightning Network</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">Plasma</td>
                               <td className="px-4 py-3 text-gray-300">子链批量处理交易再提交主链</td>
                               <td className="px-4 py-3 text-gray-300">早期扩容方案</td>
                               <td className="px-4 py-3 text-gray-300">用户体验复杂</td>
                               <td className="px-4 py-3 text-gray-300">OMG Network</td>
                             </tr>
                             <tr>
                               <td className="px-4 py-3 text-white font-medium">Validium</td>
                               <td className="px-4 py-3 text-gray-300">数据存储在链下，仅提交有效性证明</td>
                               <td className="px-4 py-3 text-gray-300">成本更低</td>
                               <td className="px-4 py-3 text-gray-300">需要信任数据提供方</td>
                               <td className="px-4 py-3 text-gray-300">StarkEx（dYdX）</td>
                             </tr>
                           </tbody>
                         </table>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-scroll text-purple-400 mr-2"></i>
                         Rollup 核心原理（重点掌握）
                       </h3>
                       <p className="text-gray-300 mb-4">
                         Rollup 是目前最成熟、最主流的 L2 技术路线。核心逻辑是：链下执行、链上结算。
                       </p>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">Rollup 两种主要类型：</h4>
                         <div className="overflow-x-auto">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">类型</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">原理</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">安全模型</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">优点</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">代表项目</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Optimistic Rollup</td>
                                 <td className="px-4 py-3 text-gray-300">假设所有提交的数据都正确，若有人质疑再验证</td>
                                 <td className="px-4 py-3 text-gray-300">通过"挑战期"防止欺诈</td>
                                 <td className="px-4 py-3 text-gray-300">兼容EVM、生态成熟</td>
                                 <td className="px-4 py-3 text-gray-300">Arbitrum / Optimism / Base</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">ZK Rollup（零知识汇总）</td>
                                 <td className="px-4 py-3 text-gray-300">用数学证明每笔交易都是正确的</td>
                                 <td className="px-4 py-3 text-gray-300">通过加密证明验证</td>
                                 <td className="px-4 py-3 text-gray-300">安全性高、即时确认</td>
                                 <td className="px-4 py-3 text-gray-300">zkSync / Scroll / Starknet</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                       </div>
                       
                       <div className="bg-gray-800 rounded-lg p-5 mb-4">
                         <h4 className="text-white font-medium mb-3">🌿 Rollup 运作流程简化图</h4>
                         <div className="flex flex-col items-center space-y-4">
                           <div className="bg-gray-700/50 p-3 rounded-lg w-4/5 text-center">
                             <p className="text-white">用户交易</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-700/50 p-3 rounded-lg w-4/5 text-center">
                             <p className="text-white">Layer2 节点执行交易</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i><div className="bg-gray-700/50 p-3 rounded-lg w-4/5 text-center">
                             <p className="text-white">生成 Rollup 区块（链下）</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-700/50 p-3 rounded-lg w-4/5 text-center">
                             <p className="text-white">生成证明（Optimistic or ZK）</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-700/50 p-3 rounded-lg w-4/5 text-center">
                             <p className="text-white">上传到 Layer1 验证并结算</p>
                           </div>
                         </div>
                       </div>
                       
                       <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                         <p className="text-gray-300 italic">
                           <i className="fa-info-circle text-blue-400 mr-1"></i>
                           比喻：Layer2 是一个"批量收银机"，它先帮你结账，然后把总账交给以太坊做审计。
                         </p>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-exchange-alt text-orange-400 mr-2"></i>
                         桥接（Bridge）与资产交互机制
                       </h3>
                       <p className="text-gray-300 mb-4">
                         Layer1 与 Layer2 之间需要通过"桥"（Bridge）实现资产流动。
                       </p>
                       
                       <div className="bg-gray-800 rounded-lg p-5 mb-4">
                         <h4 className="text-white font-medium mb-3">⚙️ 桥的基本流程：</h4>
                         <ol className="space-y-4">
                           <li className="flex">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                               <span className="text-blue-400 text-sm font-medium">1️⃣</span>
                             </div>
                             <div>
                               <p className="text-gray-300">用户在 L1 上将资产锁定（Lock）</p>
                             </div>
                           </li>
                           <li className="flex">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                               <span className="text-blue-400 text-sm font-medium">2️⃣</span>
                             </div>
                             <div>
                               <p className="text-gray-300">桥在 L2 上铸造等值代币（Mint）</p>
                             </div>
                           </li>
                           <li className="flex">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                               <span className="text-blue-400 text-sm font-medium">3️⃣</span>
                             </div>
                             <div>
                               <p className="text-gray-300">用户在 L2 上自由交易</p>
                             </div>
                           </li>
                           <li className="flex">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                               <span className="text-blue-400 text-sm font-medium">4️⃣</span>
                             </div>
                             <div>
                               <p className="text-gray-300">当用户提现时：销毁 L2 代币 → 释放 L1 资产（Unlock）</p>
                             </div>
                           </li>
                         </ol>
                       </div>
                       
                       <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mb-4">
                         <h4 className="text-white font-medium mb-2 flex items-center">
                           <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                           举例：
                         </h4>
                         <p className="text-gray-300">
                           把 ETH 从主网桥到 Arbitrum → 变成 "ArbETH"<br/><br/>
                           桥的智能合约在两条链上都存在<br/><br/>
                           跨链时必须等待安全确认（Optimistic有挑战期）
                         </p>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-shield-alt text-red-400 mr-2"></i>
                         桥接的安全性与风险点
                       </h3>
                       <div className="overflow-x-auto">
                         <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                           <thead>
                             <tr className="border-b border-gray-800">
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">风险类型</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">描述</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">案例</th>
                             </tr>
                           </thead>
                           <tbody>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">智能合约漏洞</td>
                               <td className="px-4 py-3 text-gray-300">桥的锁仓合约被攻击</td>
                               <td className="px-4 py-3 text-gray-300">Wormhole（2022）损失 3.2 亿美元</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">签名机制被盗</td>
                               <td className="px-4 py-3 text-gray-300">多签密钥泄漏</td>
                               <td className="px-4 py-3 text-gray-300">Ronin Bridge（2022）损失 6 亿美元</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">验证者作恶</td>
                               <td className="px-4 py-3 text-gray-300">少数节点篡改数据</td>
                               <td className="px-4 py-3 text-gray-300">小型侧链桥</td>
                             </tr>
                             <tr>
                               <td className="px-4 py-3 text-white font-medium">数据延迟</td>
                               <td className="px-4 py-3 text-gray-300">Rollup 挑战期未完成前提现失败</td>
                               <td className="px-4 py-3 text-gray-300">Arbitrum / Optimism 挑战期约 7 天</td>
                             </tr>
                           </tbody>
                         </table>
                       </div>
                       <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                         <p className="text-gray-300">
                           <i className="fa-info-circle text-blue-400 mr-1"></i>
                           <strong>投研角度：</strong>评估桥项目时，安全模型 &gt; 速度 &gt; 手续费。（桥被黑是整个 L2 生态最常见的高风险点）
                         </p>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-globe text-green-400 mr-2"></i>
                         L2 生态代表项目与特征对比
                       </h3>
                       <div className="overflow-x-auto">
                         <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                           <thead>
                             <tr className="border-b border-gray-800">
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">技术路线</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">TPS</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">Gas成本</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">生态特点</th>
                             </tr>
                           </thead>
                           <tbody>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">Arbitrum</td>
                               <td className="px-4 py-3 text-gray-300">Optimistic Rollup</td>
                               <td className="px-4 py-3 text-gray-300">~4000</td>
                               <td className="px-4 py-3 text-gray-300">低</td>
                               <td className="px-4 py-3 text-gray-300">DeFi 生态最大、兼容EVM</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">Optimism</td>
                               <td className="px-4 py-3 text-gray-300">Optimistic Rollup</td>
                               <td className="px-4 py-3 text-gray-300">~2000</td>
                               <td className="px-4 py-3 text-gray-300">低</td>
                               <td className="px-4 py-3 text-gray-300">与Base共享OP Stack</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">Base</td>
                               <td className="px-4 py-3 text-gray-300">Optimistic Rollup</td>
                               <td className="px-4 py-3 text-gray-300">~2000</td>
                               <td className="px-4 py-3 text-gray-300">低</td>
                               <td className="px-4 py-3 text-gray-300">Coinbase生态、合规友好</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">zkSync</td>
                               <td className="px-4 py-3 text-gray-300">ZK Rollup</td>
                               <td className="px-4 py-3 text-gray-300">~3000</td>
                               <td className="px-4 py-3 text-gray-300">极低</td>
                               <td className="px-4 py-3 text-gray-300">快速、即时确认</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">Starknet</td>
                               <td className="px-4 py-3 text-gray-300">ZK Rollup</td>
                               <td className="px-4 py-3 text-gray-300">~5000</td>
                               <td className="px-4 py-3 text-gray-300">极低</td>
                               <td className="px-4 py-3 text-gray-300">零知识证明性能强</td>
                             </tr>
                             <tr>
                               <td className="px-4 py-3 text-white font-medium">Scroll</td>
                               <td className="px-4 py-3 text-gray-300">ZK Rollup</td>
                               <td className="px-4 py-3 text-gray-300">~3000</td>
                               <td className="px-4 py-3 text-gray-300">低</td>
                               <td className="px-4 py-3 text-gray-300">高兼容性EVM</td>
                             </tr>
                           </tbody>
                         </table>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-project-diagram text-blue-400 mr-2"></i>
                         L2 与 L1 的关系总结
                       </h3>
                       <div className="overflow-x-auto">
                         <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                           <thead>
                             <tr className="border-b border-gray-800">
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">层级</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">职责</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">比喻</th>
                             </tr>
                           </thead>
                           <tbody>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">Layer1</td>
                               <td className="px-4 py-3 text-gray-300">安全与结算层（Ethereum）</td>
                               <td className="px-4 py-3 text-gray-300">"银行总账本"</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">Layer2</td>
                               <td className="px-4 py-3 text-gray-300">执行与扩容层</td>
                               <td className="px-4 py-3 text-gray-300">"分行子账本"</td>
                             </tr>
                             <tr>
                               <td className="px-4 py-3 text-white font-medium">Bridge</td>
                               <td className="px-4 py-3 text-gray-300">资产传输层</td>
                               <td className="px-4 py-3 text-gray-300">"银行间转账通道"</td>
                             </tr>
                           </tbody>
                         </table>
                       </div>
                       <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                         <p className="text-gray-300 italic">
                           简而言之：L1 保安全，L2 提速度，Bridge 负责沟通。
                         </p>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-rocket text-purple-400 mr-2"></i>
                         未来趋势（L2 的新方向）
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                           <h4 className="text-white font-medium mb-2">模块化区块链（Modular Blockchain）</h4>
                           <p className="text-gray-300 text-sm mb-2">分离执行、结算、数据可用性层</p>
                           <p className="text-blue-400 text-sm">代表项目：Celestia / EigenLayer</p>
                         </div>
                         <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                           <h4 className="text-white font-medium mb-2">L3（Layer3）应用链</h4>
                           <p className="text-gray-300 text-sm mb-2">在 L2 上再叠应用专用层</p>
                           <p className="text-blue-400 text-sm">代表项目：zkSync Hyperchains</p>
                         </div>
                         <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                           <h4 className="text-white font-medium mb-2">Rollup-as-a-Service</h4>
                           <p className="text-gray-300 text-sm mb-2">无代码创建专属 Rollup</p>
                           <p className="text-blue-400 text-sm">代表项目：Caldera / AltLayer</p>
                         </div>
                         <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                           <h4 className="text-white font-medium mb-2">跨Rollup互操作性</h4>
                           <p className="text-gray-300 text-sm mb-2">不同 L2 之间无缝互通</p>
                           <p className="text-blue-400 text-sm">代表项目：LayerZero / Connext / zkBridge</p>
                         </div>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-search text-green-400 mr-2"></i>
                         投研重点总结
                       </h3>
                       <div className="overflow-x-auto">
                         <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                           <thead>
                             <tr className="border-b border-gray-800">
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">维度</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">研究点</th>
                               <th className="px-4 py-3 text-left text-gray-400 font-medium">判断逻辑</th>
                             </tr>
                           </thead>
                           <tbody>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">技术</td>
                               <td className="px-4 py-3 text-gray-300">Rollup 路线成熟度</td>
                               <td className="px-4 py-3 text-gray-300">ZK 技术壁垒更高</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">安全</td>
                               <td className="px-4 py-3 text-gray-300">桥与验证机制</td>
                               <td className="px-4 py-3 text-gray-300">是否去信任化</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">生态</td>
                               <td className="px-4 py-3 text-gray-300">项目数量 / 用户量</td>
                               <td className="px-4 py-3 text-gray-300">DeFi / NFT 活跃度</td>
                             </tr>
                             <tr className="border-b border-gray-800">
                               <td className="px-4 py-3 text-white font-medium">资金</td>
                               <td className="px-4 py-3 text-gray-300">融资机构 / 锁仓量</td>
                               <td className="px-4 py-3 text-gray-300">Arbitrum、Base 领先</td>
                             </tr>
                             <tr>
                               <td className="px-4 py-3 text-white font-medium">催化剂</td>
                               <td className="px-4 py-3 text-gray-300">空投 / 扩容升级 / L3 计划</td>
                               <td className="px-4 py-3 text-gray-300">短期机会来源</td>
                             </tr>
                           </tbody>
                         </table>
                       </div>
                     </div>
                     
                     <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                       <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                         <i className="fa-solid fa-money-bill-wave text-green-400 mr-2"></i>
                         DeFi 基础与主流协议逻辑
                       </h3>
                       <p className="text-gray-300 mb-4">
                         理解"链上银行系统"的核心原理
                       </p>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">一、什么是 DeFi？</h4>
                         <div className="bg-gray-800 rounded-lg p-5 mb-4">
                           <p className="text-gray-300 mb-3">
                             DeFi（Decentralized Finance）= 去中心化金融<br/>
                             是一种不依赖银行、券商等中介机构的金融系统，<br/>
                             由 智能合约自动执行交易、借贷、理财、资产发行等功能。
                           </p>
                           <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                             <p className="text-gray-300 italic">
                               一句话总结：<br/>
                               DeFi 就是"链上的金融乐高"，<br/>
                               所有规则由代码执行，所有资产由用户自持。
                             </p>
                           </div>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">二、DeFi 的四大核心支柱</h4>
                         <div className="overflow-x-auto">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">模块</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">功能</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">代表项目</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">AMM 交易（Swap）</td>
                                 <td className="px-4 py-3 text-gray-300">用户间自动兑换代币（DEX）</td>
                                 <td className="px-4 py-3 text-gray-300">Uniswap / PancakeSwap / Curve</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">借贷（Lending）</td>
                                 <td className="px-4 py-3 text-gray-300">抵押资产、借出或赚利息</td>
                                 <td className="px-4 py-3 text-gray-300">Aave / Compound / Venus</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">稳定币（Stablecoin）</td>
                                 <td className="px-4 py-3 text-gray-300">稳定币资产发行与锚定机制</td>
                                 <td className="px-4 py-3 text-gray-300">DAI / USDC / USDT / FRAX</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">收益聚合（Yield）</td>
                                 <td className="px-4 py-3 text-gray-300">聚合挖矿策略、收益优化</td>
                                 <td className="px-4 py-3 text-gray-300">Yearn / Pendle / Beefy</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">三、DeFi 的基础结构：资金流图</h4>
                         <div className="bg-gray-800 rounded-lg p-5 flex flex-col items-center space-y-4">
                           <div className="bg-gray-700/50 p-3 rounded-lg w-4/5 text-center">
                             <p className="text-white">用户钱包</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-700/50 p-3 rounded-lg w-4/5 text-center">
                             <p className="text-white">智能合约池（AMM / Lending）</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-700/50 p-3 rounded-lg w-4/5 text-center">
                             <p className="text-white">生成交易 / 借贷 / 利息记录</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-700/50 p-3 rounded-lg w-4/5 text-center">
                             <p className="text-white">区块链账本结算（透明可查）</p>
                           </div>
                         </div>
                         <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                           <p className="text-gray-300 italic">
                             💡 一切金融行为都变成链上调用智能合约的操作。
                           </p>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">四、AMM 自动做市商机制（最基础）</h4>
                         <p className="text-gray-300 mb-4">
                           AMM（Automated Market Maker）取代了传统交易撮合机制。
                         </p>
                         <div className="bg-gray-800 rounded-lg p-5 mb-4">
                           <h5 className="text-white font-medium mb-2">⚙️ 原理</h5>
                           <ul className="list-disc pl-6 text-gray-300 space-y-1 mb-4">
                             <li>用户将两种代币注入流动池（Liquidity Pool）；</li>
                             <li>交易者通过合约直接兑换；</li>
                             <li>价格由算法决定（而不是订单簿）。</li>
                           </ul>
                           <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mb-4">
                             <h5 className="text-white font-medium mb-2">📘 Uniswap 定价公式：</h5>
                             <p className="text-gray-300 text-center font-medium">x * y = k</p>
                             <p className="text-gray-300 mt-2">
                               x, y 为池中两种代币数量<br/><br/>
                               k 为常数<br/>
                               → 每次交易都会调整 x/y，从而自动生成新价格。
                             </p>
                           </div>
                           <h5 className="text-white font-medium mb-2">💰 LP 收益来源</h5>
                           <ol className="list-decimal pl-6 text-gray-300 space-y-1">
                             <li>交易手续费（Swap Fee）</li>
                             <li>激励代币（如 UNI）</li>
                             <li>有时还有挖矿奖励（Liquidity Mining）</li>
                           </ol>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">五、Lending 借贷协议（去中心化银行）</h4>
                         <div className="bg-gray-800 rounded-lg p-5 mb-4">
                           <h5 className="text-white font-medium mb-2">🧱 基本逻辑</h5>
                           <ol className="list-decimal pl-6 text-gray-300 space-y-1 mb-4">
                             <li>用户抵押加密资产（如 ETH）获得借贷额度；</li>
                             <li>合约自动计算抵押率（如 75%）；</li>
                             <li>若价格下跌、抵押不足则强制清算；</li>
                             <li>借贷双方的利率由供需算法决定。</li>
                           </ol>
                           <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mb-4">
                             <h5 className="text-white font-medium mb-2">💡 举例：Aave</h5>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1">
                               <li>存款人获得利息（aToken）</li>
                               <li>借款人支付利息</li>
                               <li>所有利率、清算阈值由智能合约自动执行</li>
                             </ul>
                           </div>
                           <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                             <h5 className="text-white font-medium mb-2">📘 投研视角：</h5>
                             <p className="text-gray-300">
                               Aave、Compound 是链上"无中介银行"，<br/>
                               其安全性取决于抵押模型 + 清算机制 + 预言机价格。
                             </p>
                           </div>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">六、稳定币（Stablecoin）机制</h4>
                         <div className="overflow-x-auto">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">类型</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">锚定方式</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">代表项目</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">法币抵押型</td>
                                 <td className="px-4 py-3 text-gray-300">银行储备支撑</td>
                                 <td className="px-4 py-3 text-gray-300">稳定、中心化</td>
                                 <td className="px-4 py-3 text-gray-300">USDT / USDC</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">加密抵押型</td>
                                 <td className="px-4 py-3 text-gray-300">超额抵押加密资产</td>
                                 <td className="px-4 py-3 text-gray-300">去中心化、安全性高</td>
                                 <td className="px-4 py-3 text-gray-300">DAI / FRAX</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">算法稳定币</td>
                                 <td className="px-4 py-3 text-gray-300">算法调节供需</td>
                                 <td className="px-4 py-3 text-gray-300">高风险、易崩溃</td>
                                 <td className="px-4 py-3 text-gray-300">UST（已崩） / USDD</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                         <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                           <p className="text-gray-300 italic">
                             💡 稳定币是 DeFi 生态的"流动性血液"。<br/>
                             其安全性直接影响整个链上经济系统。
                           </p>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">七、收益聚合与策略协议（Yield Farming）</h4>
                         <p className="text-gray-300 mb-4">
                           让资金自动"在多个协议之间轮动"，追求最大收益。
                         </p>
                         <div className="bg-gray-800 rounded-lg p-5 mb-4">
                           <h5 className="text-white font-medium mb-2">⚙️ 基本逻辑：</h5>
                           <ul className="list-disc pl-6 text-gray-300 space-y-1 mb-4">
                             <li>用户存入资金；</li>
                             <li>策略合约自动分配至多个池；</li>
                             <li>实时复利收益；</li>
                             <li>部分协议发放治理代币作为激励。</li>
                           </ul>
                           <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mb-4">
                             <h5 className="text-white font-medium mb-2">💡 举例：</h5>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1">
                               <li>Yearn：收益聚合器</li>
                               <li>Pendle：收益分拆（YT/PT）机制</li>
                               <li>Convex：Curve生态收益放大器</li>
                             </ul>
                           </div>
                           <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                             <h5 className="text-white font-medium mb-2">📘 投研重点：</h5>
                             <p className="text-gray-300">
                               看清项目是否真的"创造收益"还是"搬砖套利"。
                             </p>
                           </div>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">八、DeFi 的数据指标体系（投研工具）</h4>
                         <div className="overflow-x-auto">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">指标</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">含义</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">观察价值</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">TVL（Total Value Locked）</td>
                                 <td className="px-4 py-3 text-gray-300">协议锁仓总价值</td>
                                 <td className="px-4 py-3 text-gray-300">衡量生态规模</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Volume（交易量）</td>
                                 <td className="px-4 py-3 text-gray-300">一定周期内交易量</td>
                                 <td className="px-4 py-3 text-gray-300">衡量活跃度</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Revenue（协议收入）</td>
                                 <td className="px-4 py-3 text-gray-300">手续费收入总额</td>
                                 <td className="px-4 py-3 text-gray-300">衡量盈利能力</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">APY（年化收益）</td>
                                 <td className="px-4 py-3 text-gray-300">用户资金年化回报</td>
                                 <td className="px-4 py-3 text-gray-300">衡量吸引力</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">FDV（Fully Diluted Valuation）</td>
                                 <td className="px-4 py-3 text-gray-300">代币完全稀释估值</td>
                                 <td className="px-4 py-3 text-gray-300">判断估值泡沫</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                         <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                           <h5 className="text-white font-medium mb-2">🧩 推荐工具：</h5>
                           <p className="text-gray-300">
                             DeFiLlama、Token Terminal、Dune、DefiWars、DeBank
                           </p>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">九、投研分析的三大维度</h4>
                         <div className="overflow-x-auto">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">维度</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">关键问题</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">研究重点</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">结构安全</td>
                                 <td className="px-4 py-3 text-gray-300">合约是否安全、机制是否稳健</td>
                                 <td className="px-4 py-3 text-gray-300">是否审计、是否有风控机制</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">经济模型</td>
                                 <td className="px-4 py-3 text-gray-300">收益来源是否可持续</td>
                                 <td className="px-4 py-3 text-gray-300">是否依赖通胀激励</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">生态竞争</td>
                                 <td className="px-4 py-3 text-gray-300">同赛道对手有哪些</td>
                                 <td className="px-4 py-3 text-gray-300">是否有护城河或独特功能</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <h4 className="text-lg font-medium text-white mb-3">十、DeFi 生态的分层</h4>
                         <div className="overflow-x-auto">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">层级</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">模块</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">代表项目</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">DEX 层</td>
                                 <td className="px-4 py-3 text-gray-300">Swap、聚合器</td>
                                 <td className="px-4 py-3 text-gray-300">Uniswap / Curve / 1inch</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Lending 层</td>
                                 <td className="px-4 py-3 text-gray-300">抵押借贷</td>
                                 <td className="px-4 py-3 text-gray-300">Aave / Compound / Morpho</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Derivatives 层</td>
                                 <td className="px-4 py-3 text-gray-300">永续合约、期权</td>
                                 <td className="px-4 py-3 text-gray-300">GMX / dYdX / Synthetix</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Stablecoin 层</td>
                                 <td className="px-4 py-3 text-gray-300">DAI / FRAX / USDC / USDT</td>
                                 <td className="px-4 py-3 text-gray-300">链上支付与结算核心</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">Aggregator 层</td>
                                 <td className="px-4 py-3 text-gray-300">收益优化 / 自动策略</td>
                                 <td className="px-4 py-3 text-gray-300">Yearn / Pendle / Convex</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                  )}
                    {/* 钱包与链上操作详细内容 */}
                    {module.id === 'module-3' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mb-12"
                      >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                          <i className="fa-solid fa-wallet text-blue-400 mr-2"></i>
                          钱包与链上操作详解
                        </h2>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                            什么是加密货币钱包？
                          </h3>
                          <p className="text-gray-300 mb-4">
                            加密货币钱包并不是"存储"你的资产，而是存储访问资产所需的密钥（私钥/助记词），并允许你与区块链网络交互的工具。
                          </p>
                          
                          <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                            <p className="text-gray-300 italic font-medium">
                              一句话总结：<br/>
                              钱包 = 你的"数字钥匙串" + "区块链浏览器"
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-sitemap text-yellow-400 mr-2"></i>
                            钱包的核心组成部分
                          </h3>
                          
                          <div className="overflow-x-auto mb-6">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">组成部分</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">作用</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">类比</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">公钥 (Public Key)</td>
                                  <td className="px-4 py-3 text-gray-300">生成你的钱包地址，可公开分享</td>
                                  <td className="px-4 py-3 text-gray-300">银行账号</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">私钥 (Private Key)</td>
                                  <td className="px-4 py-3 text-gray-300">唯一控制资产的密钥，必须保密</td>
                                  <td className="px-4 py-3 text-gray-300">银行卡密码 + U盾</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">助记词 (Mnemonic Phrase)</td>
                                  <td className="px-4 py-3 text-gray-300">12-24个单词，用于恢复钱包</td>
                                  <td className="px-4 py-3 text-gray-300">保险箱备用钥匙</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">钱包地址 (Wallet Address)</td>
                                  <td className="px-4 py-3 text-gray-300">基于公钥生成的字符串，用于接收资金</td>
                                  <td className="px-4 py-3 text-gray-300">具体的银行卡号</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2 flex items-center">
                              <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                              重要概念：
                            </h4>
                            <p className="text-gray-300">
                              记住：谁掌握了私钥/助记词，谁就真正拥有这些资产。平台、交易所或钱包服务商都不应保管你的私钥。
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-layer-group text-blue-400 mr-2"></i>
                            钱包类型与比较
                          </h3>
                          
                          <div className="overflow-x-auto mb-6">
                            <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">类型</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">定义</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">优点</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">缺点</th>
                                  <th className="px-4 py-3 text-left text-gray-400 font-medium">代表产品</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">热钱包 (Hot Wallet)</td>
                                  <td className="px-4 py-3 text-gray-300">连接互联网的钱包</td>
                                  <td className="px-4 py-3 text-gray-300">方便快捷、易于使用</td>
                                  <td className="px-4 py-3 text-gray-300">有被黑客攻击风险</td>
                                  <td className="px-4 py-3 text-gray-300">MetaMask、Phantom</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">冷钱包 (Cold Wallet)</td>
                                  <td className="px-4 py-3 text-gray-300">离线存储的硬件设备</td>
                                  <td className="px-4 py-3 text-gray-300">安全性极高</td>
                                  <td className="px-4 py-3 text-gray-300">价格较高、使用不便</td>
                                  <td className="px-4 py-3 text-gray-300">Ledger、Trezor</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">多签钱包 (Multisig Wallet)</td>
                                  <td className="px-4 py-3 text-gray-300">需要多个私钥共同签名交易</td>
                                  <td className="px-4 py-3 text-gray-300">增强安全性、适合团队</td>
                                  <td className="px-4 py-3 text-gray-300">设置复杂、交易流程繁琐</td>
                                  <td className="px-4 py-3 text-gray-300">Gnosis Safe、Argent</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="px-4 py-3 text-white font-medium">浏览器钱包 (Browser Wallet)</td>
                                  <td className="px-4 py-3 text-gray-300">浏览器插件形式的钱包</td>
                                  <td className="px-4 py-3 text-gray-300">无缝衔接DApp、使用便捷</td>
                                  <td className="px-4 py-3 text-gray-300">依赖浏览器安全</td>
                                  <td className="px-4 py-3 text-gray-300">MetaMask、Coinbase Wallet</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-white font-medium">移动钱包 (Mobile Wallet)</td>
                                  <td className="px-4 py-3 text-gray-300">智能手机应用钱包</td>
                                  <td className="px-4 py-3 text-gray-300">便携、支持扫码支付</td>
                                  <td className="px-4 py-3 text-gray-300">手机丢失风险</td>
                                  <td className="px-4 py-3 text-gray-300">Trust Wallet、Coinbase Wallet</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2 flex items-center">
                              <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                              选择建议：
                            </h4>
                            <p className="text-gray-300">
                              小额资金适合使用热钱包（如MetaMask）用于日常交易和交互；<br/>
                              大额资金建议使用冷钱包（如Ledger）进行长期存储；<br/>
                              团队资金或项目资金推荐使用多签钱包。
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-wallet text-green-400 mr-2"></i>
                            MetaMask钱包使用详解
                          </h3>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">1. 安装MetaMask</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                  <li>访问 <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">metamask.io</a> 官方网站</li>
                                  <li>点击"下载"，选择适合你的浏览器（Chrome、Firefox、Edge等）</li>
                                  <li>添加MetaMask扩展到浏览器</li>
                                  <li>点击扩展图标，开始设置</li>
                                </ol>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">2. 创建新钱包</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                  <li>点击"开始使用"</li>
                                  <li>选择"创建钱包"</li>
                                  <li>设置并确认你的密码（请使用强密码）</li>
                                  <li>阅读并同意隐私政策</li>
                                  <li>点击"显示助记词"，<strong className="text-yellow-400">这是你恢复钱包的唯一方式</strong></li>
                                  <li>将助记词按顺序抄写在纸上，妥善保管</li>
                                  <li>按照顺序确认助记词，完成设置</li>
                                </ol>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4 mt-4">
                                  <p className="text-gray-300 flex items-center">
                                    <i className="fa-solid fa-exclamation-triangle text-red-400 mr-2"></i>
                                    警告：永远不要将助记词保存在手机、电脑等联网设备上，不要拍照，不要告诉任何人！
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">3. 接收和发送加密货币</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <h5 className="text-white font-medium mb-2">接收资金：</h5>
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-4">
                                  <li>点击MetaMask扩展图标</li>
                                  <li>点击"接收"按钮</li>
                                  <li>复制地址或扫描二维码</li>
                                  <li>将此地址提供给发送方</li>
                                </ol>
                                
                                <h5 className="text-white font-medium mb-2">发送资金：</h5>
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                  <li>点击MetaMask扩展图标</li>
                                  <li>点击"发送"按钮</li>
                                  <li>粘贴接收地址</li>
                                  <li>输入金额</li>
                                  <li>调整Gas费（通常选择"中等"或"市场"）</li>
                                  <li>点击"确认"发送</li>
                                </ol>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">4. 添加自定义网络</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                  <li>点击MetaMask扩展图标</li>
                                  <li>点击顶部网络选择下拉菜单</li>
                                  <li>选择"添加网络"</li>
                                  <li>手动输入网络信息（网络名称、RPC URL、链ID、符号、区块浏览器URL）</li>
                                  <li>点击"保存"</li>
                                </ol>
                                
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                                  <h5 className="text-white font-medium mb-2">常用网络配置：</h5>
                                  <p className="text-gray-300 mb-2"><strong>Arbitrum One：</strong></p>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 mb-3 text-sm">
                                    <li>RPC URL: https://arb1.arbitrum.io/rpc</li>
                                    <li>链ID: 42161</li>
                                    <li>符号: ETH</li>
                                    <li>区块浏览器: https://arbiscan.io</li>
                                  </ul>
                                  
                                  <p className="text-gray-300 mb-2"><strong>Optimism：</strong></p>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>RPC URL: https://mainnet.optimism.io</li>
                                    <li>链ID: 10</li>
                                    <li>符号: ETH</li>
                                    <li>区块浏览器: https://optimistic.etherscan.io</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">5. 导入已有钱包</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                  <li>点击MetaMask扩展图标</li>
                                  <li>点击"开始使用"</li>
                                  <li>选择"导入钱包"</li>
                                  <li>输入你的助记词</li>
                                  <li>设置并确认新密码</li>
                                  <li>点击"导入"</li>
                                </ol>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">6. MetaMask高级功能</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">多账户管理</h5>
                                  <p className="text-gray-300 text-sm">可以在一个MetaMask钱包中创建多个账户，使用同一个助记词恢复</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">硬件钱包集成</h5>
                                  <p className="text-gray-300 text-sm">支持连接Ledger、Trezor等硬件钱包，增强安全性</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Gas费调整</h5>
                                  <p className="text-gray-300 text-sm">可以手动设置Gas价格和Gas限制，控制交易速度和成本</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Token批准管理</h5>
                                  <p className="text-gray-300 text-sm">可以查看和撤销已批准的Token授权，防止资金风险</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-wallet text-purple-400 mr-2"></i>
                            Phantom钱包与Solana生态交互
                          </h3>
                          
                          <p className="text-gray-300 mb-4">
                            Phantom是Solana生态系统中最受欢迎的钱包之一，提供了与Solana网络交互的便捷方式。
                          </p>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">1. 安装Phantom</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                  <li>访问 <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">phantom.app</a> 官方网站</li>
                                  <li>点击"下载"，选择适合你的浏览器或移动设备</li>
                                  <li>添加Phantom扩展到浏览器</li>
                                  <li>点击扩展图标，开始设置</li>
                                </ol>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">2. 创建或导入钱包</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <p className="text-gray-300 mb-3">Phantom的创建和导入流程与MetaMask类似，同样需要妥善保管助记词。</p>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <p className="text-gray-300 flex items-center">
                                    <i className="fa-solid fa-exclamation-triangle text-red-400 mr-2"></i>
                                    警告：Solana钱包的助记词和以太坊钱包的助记词不通用，需要分别管理。
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">3. Solana生态交互</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <h5 className="text-white font-medium mb-2">与Solana DApp交互：</h5>
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-4">
                                  <li>访问Solana生态DApp（如Raydium、Magic Eden等）</li>
                                  <li>点击页面上的"连接钱包"按钮</li>
                                  <li>选择"Phantom"</li>
                                  <li>在Phantom弹窗中确认连接</li>
                                </ol>
                                
                                <h5 className="text-white font-medium mb-2">Solana特有的操作：</h5>
                                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                  <li><strong>Solana程序ID：</strong>相当于以太坊的合约地址</li>
                                  <li><strong>SPL代币：</strong>Solana链上的代币标准</li>
                                  <li><strong>交易确认速度：</strong>Solana交易通常只需几秒钟即可确认</li>
                                  <li><strong>Gas费：</strong>Solana交易费用固定且非常低</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">4. Solana生态常用DApp</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Raydium</h5>
                                  <p className="text-gray-300 text-sm">Solana上最大的AMM去中心化交易所</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Magic Eden</h5>
                                  <p className="text-gray-300 text-sm">Solana生态主要的NFT交易市场</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Solend</h5>
                                  <p className="text-gray-300 text-sm">Solana上的主要借贷平台</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Jupiter</h5>
                                  <p className="text-gray-300 text-sm">Solana生态的交易聚合器，提供最优价格</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-shield-alt text-red-400 mr-2"></i>
                            钱包安全最佳实践
                          </h3>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">1. 助记词与私钥安全</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                  <li><strong>物理备份：</strong>将助记词和私钥抄写在纸上，存放在安全的地方（如保险箱）</li>
                                  <li><strong>多重备份：</strong>在不同地点保存多份备份，防止单一备份损坏或丢失</li>
                                  <li><strong>离线存储：</strong>永远不要将助记词或私钥存储在联网设备上</li>
                                  <li><strong>保密：</strong>永远不要与任何人分享你的助记词或私钥，包括声称是客服的人</li>
                                  <li><strong>验证来源：</strong>确保你下载的钱包应用来自官方网站，避免使用第三方应用商店</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">2. 日常使用安全</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                  <li><strong>使用强密码：</strong>为钱包设置复杂、独特的密码</li>
                                  <li><strong>启用双重验证：</strong>如果钱包支持，启用2FA（双因素认证）</li>
                                  <li><strong>定期更新：</strong>保持钱包软件和设备操作系统更新到最新版本</li>
                                  <li><strong>警惕钓鱼链接：</strong>不要点击可疑链接，检查网址是否正确</li>
                                  <li><strong>控制授权：</strong>谨慎批准Token权限，定期检查和撤销不必要的授权</li>
                                  <li><strong>隔离环境：</strong>考虑使用专门的设备或浏览器用于加密货币操作</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">3. 交易安全</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                  <li><strong>双重检查地址：</strong>每次转账前仔细核对接收地址</li>
                                  <li><strong>小额测试：</strong>大额转账前先发送小额资金进行测试</li>
                                  <li><strong>使用硬件钱包：</strong>大额资金建议使用硬件钱包进行交易签名</li>
                                  <li><strong>注意Gas费：</strong>过低的Gas费可能导致交易长时间未确认</li>
                                  <li><strong>核对交易详情：</strong>确认交易金额、地址和手续费无误后再确认</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">4. 如何识别钓鱼攻击</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">钓鱼网站特征</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>网址与官方网站相似但不完全相同</li>
                                    <li>页面设计粗糙，与官方有差异</li>
                                    <li>要求你输入助记词或私钥</li>
                                    <li>通过邮件、社交媒体等非官方渠道发送</li>
                                  </ul>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">钓鱼邮件特征</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>声称你的账户有问题需要立即处理</li>
                                    <li>包含紧急、威胁性的语言</li>
                                    <li>提供可疑的链接或附件</li>
                                    <li>发件人地址与官方不符</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-6">
                              <h4 className="text-white font-medium mb-3 flex items-center">
                                <i className="fa-solid fa-exclamation-circle text-red-400 mr-2"></i>
                                常见诈骗手段及防范
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <h5 className="text-white font-medium">1. 假钱包应用</h5>
                                  <p className="text-gray-300 text-sm">防范：只从官方网站或应用商店下载钱包应用，核对应用开发者信息</p>
                                </div>
                                <div>
                                  <h5 className="text-white font-medium">2. 助记词钓鱼</h5>
                                  <p className="text-gray-300 text-sm">防范：记住任何索要助记词的行为都是诈骗，官方永远不会要求你提供助记词</p>
                                </div>
                                <div>
                                  <h5 className="text-white font-medium">3. 假DApp和假合约</h5>
                                  <p className="text-gray-300 text-sm">防范：使用信誉良好的DApp，检查合约地址，查阅社区反馈</p>
                                </div>
                                <div>
                                  <h5 className="text-white font-medium">4. 空投诈骗</h5>
                                  <p className="text-gray-300 text-sm">防范：验证空投真实性，不要在非官方平台连接钱包领取可疑空投</p>
                                </div>
                                <div>
                                  <h5 className="text-white font-medium">5. 社交媒体冒充</h5>
                                  <p className="text-gray-300 text-sm">防范：验证社交媒体账号真实性，警惕私信中的投资建议</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-cogs text-blue-400 mr-2"></i>
                            RPC节点配置与自定义网络添加
                          </h3>
                          
                          <p className="text-gray-300 mb-4">
                            RPC（Remote Procedure Call）节点是连接你与区块链网络的桥梁，良好的RPC配置可以提高交易速度和成功率。
                          </p>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">1. 什么是RPC节点？</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <p className="text-gray-300 mb-3">
                                  RPC节点是运行在区块链网络上的服务器，允许你通过钱包或其他应用与区块链交互。当你发送交易、查询余额或与智能合约交互时，这些请求都是通过RPC节点处理的。
                                </p>
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <p className="text-gray-300 italic">
                                    想象RPC节点是：连接你（钱包）和区块链网络的"通信卫星"。
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">2. 为什么需要自定义RPC？</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                  <li><strong>缓解拥堵：</strong>公共RPC节点可能在网络拥堵时变慢或不可用</li>
                                  <li><strong>提高性能：</strong>优质的RPC节点可以提供更快的交易确认速度</li>
                                  <li><strong>增强隐私：</strong>使用私有RPC节点可以减少交易信息暴露</li>
                                  <li><strong>访问特定网络：</strong>连接到未在钱包默认列表中的区块链网络</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">3. 如何在MetaMask中配置自定义RPC？</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                  <li>打开MetaMask扩展</li>
                                  <li>点击顶部网络选择下拉菜单</li>
                                  <li>选择"添加网络"或"自定义RPC"</li>
                                  <li>填写网络信息：
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 mt-2">
                                      <li><strong>网络名称：</strong>自定义名称（如"Fast Ethereum"）</li>
                                      <li><strong>新RPC URL：</strong>RPC节点地址</li>
                                      <li><strong>链ID：</strong>区块链网络的唯一标识</li>
                                      <li><strong>符号：</strong>网络的原生代币符号</li>
                                      <li><strong>区块浏览器URL：</strong>可选，区块浏览器地址</li>
                                    </ul>
                                  </li>
                                  <li>点击"保存"完成配置</li>
                                </ol>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">4. 常用RPC节点服务提供商</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Infura</h5>
                                  <p className="text-gray-300 text-sm">支持以太坊、Polygon、 Arbitrum等多链，有免费额度</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Alchemy</h5>
                                  <p className="text-gray-300 text-sm">高性能RPC服务，支持多个区块链网络</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">QuickNode</h5>
                                  <p className="text-gray-300 text-sm">提供专用节点和API，适合高频交易者</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Chainstack</h5>
                                  <p className="text-gray-300 text-sm">企业级区块链基础设施服务</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">5. 常用区块链网络配置参数</h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">网络</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">链ID</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">RPC URL</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">符号</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Ethereum Mainnet</td>
                                      <td className="px-4 py-3 text-gray-300">1</td>
                                      <td className="px-4 py-3 text-gray-300">https://mainnet.infura.io/v3/YOUR_PROJECT_ID</td>
                                      <td className="px-4 py-3 text-gray-300">ETH</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Arbitrum One</td>
                                      <td className="px-4 py-3 text-gray-300">42161</td>
                                      <td className="px-4 py-3 text-gray-300">https://arb1.arbitrum.io/rpc</td>
                                      <td className="px-4 py-3 text-gray-300">ETH</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Optimism</td>
                                      <td className="px-4 py-3 text-gray-300">10</td>
                                      <td className="px-4 py-3 text-gray-300">https://mainnet.optimism.io</td>
                                      <td className="px-4 py-3 text-gray-300">ETH</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Polygon Mainnet</td>
                                      <td className="px-4 py-3 text-gray-300">137</td>
                                      <td className="px-4 py-3 text-gray-300">https://polygon-rpc.com</td>
                                      <td className="px-4 py-3 text-gray-300">MATIC</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">BSC Mainnet</td>
                                      <td className="px-4 py-3 text-gray-300">56</td>
                                      <td className="px-4 py-3 text-gray-300">https://bsc-dataseed.binance.org</td>
                                      <td className="px-4 py-3 text-gray-300">BNB</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                                <p className="text-gray-300 text-sm">
                                  <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                  提示：使用第三方RPC服务时，通常需要注册账户获取API密钥，替换URL中的YOUR_PROJECT_ID部分。
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-exchange-alt text-green-400 mr-2"></i>
                            主流跨链桥使用方法与风险防范
                          </h3>
                          
                          <p className="text-gray-300 mb-4">
                            跨链桥是连接不同区块链网络的工具，允许用户将资产从一条链转移到另一条链。
                          </p>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">1. 跨链桥的基本原理</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <p className="text-gray-300 mb-3">
                                  大多数跨链桥的工作流程如下：
                                </p>
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-3">
                                  <li>用户在源链上将资产锁定到桥合约</li>
                                  <li>桥合约确认锁定后，在目标链上铸造等值的资产</li>
                                  <li>当用户想要将资产转回时，在目标链上销毁资产</li>
                                  <li>桥合约确认销毁后，在源链上释放原始资产</li>
                                </ol>
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <p className="text-gray-300 italic">
                                    简单来说：跨链桥就像是国际汇款服务，将你的"美元"兑换成"欧元"，让你在不同的"国家"(区块链)使用。
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">2. 常用跨链桥使用教程</h4>
                              
                              <div className="space-y-4">
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <h5 className="text-white font-medium mb-3">a. MetaMask Bridge</h5>
                                  <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                    <li>打开MetaMask扩展</li>
                                    <li>点击"桥接"按钮</li>
                                    <li>选择源网络和目标网络</li>
                                    <li>输入要桥接的金额</li>
                                    <li>查看预估费用和到账时间</li>
                                    <li>点击"确认"并授权交易</li>
                                    <li>等待交易确认和跨链完成</li>
                                  </ol>
                                </div>
                                
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <h5 className="text-white font-medium mb-3">b. Hop Protocol</h5>
                                  <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                    <li>访问 <a href="https://hop.exchange" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">hop.exchange</a></li>
                                    <li>连接你的钱包</li>
                                    <li>选择源网络和目标网络</li>
                                    <li>选择要转移的代币</li>
                                    <li>输入金额</li>
                                    <li>点击"Send"并确认交易</li>
                                  </ol>
                                  <p className="text-gray-300 text-sm mt-2">
                                    特点：支持以太坊、Arbitrum、Optimism、Polygon等网络间的快速转移
                                  </p>
                                </div>
                                
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <h5 className="text-white font-medium mb-3">c. Celer Bridge</h5>
                                  <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                    <li>访问 <a href="https://cbridge.celer.network" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">cbridge.celer.network</a></li>
                                    <li>连接你的钱包</li>
                                    <li>选择出发链和目标链</li>
                                    <li>输入要转移的金额</li>
                                    <li>点击"Transfer"并确认交易</li>
                                  </ol>
                                  <p className="text-gray-300 text-sm mt-2">
                                    特点：支持超过20条区块链网络，提供低费率和快速转移
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">3. 跨链桥的主要风险</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <div className="space-y-3">
                                  <div className="flex">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                                      <i className="fa-solid fa-exclamation-triangle text-red-400 text-sm"></i>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-1">智能合约风险</h5>
                                      <p className="text-gray-300 text-sm">跨链桥合约可能存在漏洞，被黑客利用导致资金损失</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                                      <i className="fa-solid fa-exclamation-triangle text-red-400 text-sm"></i>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-1">中心化风险</h5>
                                      <p className="text-gray-300 text-sm">许多跨链桥依赖于多签机制或中心化组件，存在单点故障</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                                      <i className="fa-solid fa-exclamation-triangle text-red-400 text-sm"></i>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-1">流动性风险</h5>
                                      <p className="text-gray-300 text-sm">跨链桥可能因流动性不足导致高滑点或无法完成大额转账</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                                      <i className="fa-solid fa-exclamation-triangle text-red-400 text-sm"></i>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-1">时间风险</h5>
                                      <p className="text-gray-300 text-sm">跨链交易可能需要较长时间确认，期间价格波动可能导致损失</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">4. 跨链桥安全使用指南</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">选择可信的跨链桥</h5>
                                  <p className="text-gray-300 text-sm">使用市值高、审计完善、社区认可的跨链桥</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">小额测试</h5>
                                  <p className="text-gray-300 text-sm">首次使用时先尝试小额转账，确认流程和安全性</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">核对地址</h5>
                                  <p className="text-gray-300 text-sm">确认目标地址无误，避免转错网络导致资金永久丢失</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">注意费用</h5>
                                  <p className="text-gray-300 text-sm">了解跨链桥的费用结构，避免高成本转账</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">关注更新</h5>
                                  <p className="text-gray-300 text-sm">留意跨链桥官方社交媒体，了解最新安全公告和更新</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">分散风险</h5>
                                  <p className="text-gray-300 text-sm">大额资金可考虑分散使用多个跨链桥，降低单一风险</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-6">
                              <h4 className="text-white font-medium mb-3 flex items-center">
                                <i className="fa-solid fa-exclamation-circle text-red-400 mr-2"></i>
                                重大跨链桥安全事件回顾
                              </h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">跨链桥</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">时间</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">损失金额</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">原因</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Ronin Bridge</td>
                                      <td className="px-4 py-3 text-gray-300">2022年3月</td>
                                      <td className="px-4 py-3 text-gray-300">约6亿美元</td>
                                      <td className="px-4 py-3 text-gray-300">私钥泄露、多签机制被绕过</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Wormhole</td>
                                      <td className="px-4 py-3 text-gray-300">2022年2月</td>
                                      <td className="px-4 py-3 text-gray-300">约3.2亿美元</td>
                                      <td className="px-4 py-3 text-gray-300">智能合约漏洞</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">Poly Network</td>
                                      <td className="px-4 py-3 text-gray-300">2021年8月</td>
                                      <td className="px-4 py-3 text-gray-300">约6亿美元</td>
                                      <td className="px-4 py-3 text-gray-300">智能合约漏洞（后全额归还）</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                                <p className="text-gray-300 text-sm">
                                  <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                  教训：跨链桥是DeFi生态中风险较高的环节，使用时务必谨慎，做好安全措施。
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-search text-purple-400 mr-2"></i>
                            链上交易查询与故障排查
                          </h3>
                          
                          <p className="text-gray-300 mb-4">
                            区块链浏览器是查询和验证链上交易的重要工具，掌握其使用方法可以帮助你解决交易过程中遇到的问题。
                          </p>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">1. 区块链浏览器的基本功能</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                  <li><strong>交易查询：</strong>输入交易哈希（Tx Hash）查看交易详情</li>
                                  <li><strong>地址查询：</strong>输入钱包地址查看余额和交易历史</li>
                                  <li><strong>区块查询：</strong>输入区块号查看区块内容和包含的交易</li>
                                  <li><strong>合约查询：</strong>输入合约地址查看代码、ABI和交易</li>
                                  <li><strong>代币查询：</strong>查询代币信息、持有者和交易记录</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">2. 主流区块链浏览器</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Etherscan</h5>
                                  <p className="text-gray-300 text-sm">以太坊主网和测试网的区块浏览器</p>
                                  <p className="text-blue-400 text-xs mt-1">https://etherscan.io</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Arbiscan</h5>
                                  <p className="text-gray-300 text-sm">Arbitrum One的区块浏览器</p>
                                  <p className="text-blue-400 text-xs mt-1">https://arbiscan.io</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Optimistic Etherscan</h5>
                                  <p className="text-gray-300 text-sm">Optimism的区块浏览器</p>
                                  <p className="text-blue-400 text-xs mt-1">https://optimistic.etherscan.io</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Solscan</h5>
                                  <p className="text-gray-300 text-sm">Solana的区块浏览器</p>
                                  <p className="text-blue-400 text-xs mt-1">https://solscan.io</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">Polygonscan</h5>
                                  <p className="text-gray-300 text-sm">Polygon的区块浏览器</p>
                                  <p className="text-blue-400 text-xs mt-1">https://polygonscan.com</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">BscScan</h5>
                                  <p className="text-gray-300 text-sm">BNB Chain的区块浏览器</p>
                                  <p className="text-blue-400 text-xs mt-1">https://bscscan.com</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">3. 如何查询交易状态</h4>
                              <div className="bg-gray-800 rounded-lg p-5 mb-4">
                                <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                                  <li>在钱包中找到交易记录，复制交易哈希（Tx Hash）</li>
                                  <li>打开对应网络的区块浏览器</li>
                                  <li>在搜索框中粘贴交易哈希</li>
                                  <li>查看交易状态和详细信息</li>
                                </ol>
                                
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                                  <h5 className="text-white font-medium mb-2">交易状态解释：</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li><strong>成功（Success）：</strong>交易已确认并写入区块链</li>
                                    <li><strong>失败（Failed）：</strong>交易未成功执行，资金已退回</li>
                                    <li><strong>待处理（Pending）：</strong>交易正在等待确认</li>
                                    <li><strong>被替换（Replaced）：</strong>交易被更高Gas费的新交易替换</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">4. 常见交易问题及解决方案</h4>
                              
                              <div className="space-y-4">
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <h5 className="text-white font-medium mb-2">a. 交易一直处于Pending状态</h5>
                                  <div className="space-y-2">
                                    <p className="text-gray-300">可能原因：Gas费设置过低，网络拥堵</p>
                                    <p className="text-gray-300 font-medium">解决方案：</p>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li>使用钱包的"加速"功能提高Gas费</li>
                                      <li>发送一笔相同Nonce、更高Gas费的新交易替换原交易</li>
                                      <li>耐心等待网络拥堵缓解</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <h5 className="text-white font-medium mb-2">b. 交易失败（Failed）</h5>
                                  <div className="space-y-2">
                                    <p className="text-gray-300">可能原因：Gas不足、合约执行失败、余额不足等</p>
                                    <p className="text-gray-300 font-medium">解决方案：</p>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li>检查区块浏览器中的失败原因</li>
                                      <li>增加Gas限制和Gas价格后重新发送</li>
                                      <li>确保有足够的余额支付Gas费和交易金额</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <h5 className="text-white font-medium mb-2">c. 资金已发送但未到账</h5>
                                  <div className="space-y-2">
                                    <p className="text-gray-300">可能原因：网络延迟、错误的接收地址、跨链桥处理中</p>
                                    <p className="text-gray-300 font-medium">解决方案：</p>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li>检查交易哈希确认资金是否已从发送地址转出</li>
                                      <li>确认接收地址是否正确无误</li>
                                      <li>对于跨链交易，查看桥的处理状态</li>
                                      <li>如地址错误且资金已确认，通常无法找回</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <h5 className="text-white font-medium mb-2">d. Token未显示在钱包中</h5>
                                  <div className="space-y-2">
                                    <p className="text-gray-300">可能原因：钱包未自动添加Token、网络切换错误</p>
                                    <p className="text-gray-300 font-medium">解决方案：</p>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li>在钱包中手动添加Token（需要合约地址）</li>
                                      <li>确认已切换到正确的网络</li>
                                      <li>刷新钱包或重新连接钱包</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">5. 高级故障排查技巧</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">检查Gas Tracker</h5>
                                  <p className="text-gray-300 text-sm">使用Etherscan的Gas Tracker等工具了解当前网络Gas价格情况</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">查看合约交互</h5>
                                  <p className="text-gray-300 text-sm">对于合约交互失败，检查合约ABI和调用参数是否正确</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">检查Nonce值</h5><p className="text-gray-300 text-sm">如果交易卡住，可能需要重置或指定Nonce值重新发送</p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">使用Wallet Diagnostics</h5>
                                  <p className="text-gray-300 text-sm">一些钱包提供诊断工具，帮助识别和解决常见问题</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                            钱包与链上操作进阶技巧
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                              <h4 className="text-white font-medium mb-3">1. 多钱包策略</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                <li>创建专用的空投/交互钱包，与主钱包分离</li>
                                <li>对不同类型的资产使用不同钱包管理</li>
                                <li>使用硬件钱包存储大额长期持有的资产</li>
                                <li>定期轮换使用的钱包地址，增强隐私性</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                              <h4 className="text-white font-medium mb-3">2. 批量操作与自动化</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                <li>使用批量转账工具节省时间和Gas费</li>
                                <li>利用钱包插件和脚本自动化重复任务</li>
                                <li>设置价格提醒和交易条件</li>
                                <li>考虑使用DeFi组合器优化交易路径</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                              <h4 className="text-white font-medium mb-3">3. 隐私保护技巧</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                <li>使用隐私币和混币服务增强交易隐私</li>
                                <li>为不同目的使用不同的地址</li>
                                <li>考虑使用隐私增强的钱包和浏览器</li>
                                <li>注意避免在社交媒体上泄露钱包关联信息</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                              <h4 className="text-white font-medium mb-3">4. 测试网使用</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                <li>使用测试网熟悉新功能和交互流程</li>
                                <li>通过水龙头（Faucet）获取测试代币</li>
                                <li>测试网交互可以获得主网空投资格</li>
                                <li>常用测试网：Goerli、Sepolia、Arbitrum Goerli等</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-6 mt-6">
                            <h4 className="text-white font-medium mb-3 flex items-center">
                              <i className="fa-solid fa-info-circle text-blue-400 mr-2"></i>
                              实用工具推荐
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                                <h5 className="text-white font-medium text-sm mb-1">DeBank</h5>
                                <p className="text-gray-300 text-xs">多链资产管理与追踪</p>
                              </div>
                              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                                <h5 className="text-white font-medium text-sm mb-1">Zapper</h5>
                                <p className="text-gray-300 text-xs">跨链DeFi资产仪表盘</p>
                              </div>
                              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                                <h5 className="text-white font-medium text-sm mb-1">1inch</h5>
                                <p className="text-gray-300 text-xs">交易路由聚合器</p>
                              </div>
                              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                                <h5 className="text-white font-medium text-sm mb-1">Chainlist</h5>
                                <p className="text-gray-300 text-xs">一键添加区块链网络</p>
                              </div>
                              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                                <h5 className="text-white font-medium text-sm mb-1">GasNow</h5>
                                <p className="text-gray-300 text-xs">实时Gas价格监控</p>
                              </div>
                              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                                <h5 className="text-white font-medium text-sm mb-1">ENS Domains</h5>
                                <p className="text-gray-300 text-xs">以太坊域名服务</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* 链游与NFT生态详细内容 */}
                    {module.id === 'module-8' && (
                     <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.5, delay: 0.15 }}
                       className="mb-12"
                     >
                       <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                         <i className="fa-solid fa-gamepad text-pink-400 mr-2"></i>
                         链游（GameFi）与 NFT 经济逻辑全解析
                       </h2>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                           什么是 GameFi？
                         </h3>
                         <p className="text-gray-300 mb-4">
                           GameFi（Game + Finance）是一种将游戏机制与区块链金融模型结合的新型生态。核心是让玩家在参与游戏的同时，拥有资产所有权与经济回报。
                         </p>
                         
                         <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                           <p className="text-gray-300 italic font-medium">
                             一句话总结：<br/>
                             GameFi = 玩的不是游戏，是「链上经济系统」。
                           </p>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-sitemap text-yellow-400 mr-2"></i>
                           GameFi 的核心结构（四层模型）
                         </h3>
                         
                         <div className="overflow-x-auto mb-6">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">层级</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">功能</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">举例</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">游戏体验层</td>
                                 <td className="px-4 py-3 text-gray-300">前端玩法、界面、互动</td>
                                 <td className="px-4 py-3 text-gray-300">Pixels、BigTime、Illuvium</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">资产层（NFT）</td>
                                 <td className="px-4 py-3 text-gray-300">道具、角色、土地等数字资产</td>
                                 <td className="px-4 py-3 text-gray-300">Axie、Sandbox、Portal</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">金融层（Tokenomics）</td>
                                 <td className="px-4 py-3 text-gray-300">双代币模型、质押、奖励</td>
                                 <td className="px-4 py-3 text-gray-300">AXS + SLP、RON + PIXEL</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">基础设施层</td>
                                 <td className="px-4 py-3 text-gray-300">游戏链 / SDK / 钱包 / 桥</td>
                                 <td className="px-4 py-3 text-gray-300">Ronin / Immutable X / XPLA</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                         
                         <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
                           <h4 className="text-white font-medium mb-2 flex items-center">
                             <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                             理解：
                           </h4>
                           <p className="text-gray-300">
                             传统游戏 → 玩家是"租户"<br/>
                             链游 → 玩家是"股东 + 创作者"。
                           </p>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-coins text-green-400 mr-2"></i>
                           GameFi 的双代币模型（Tokenomics）
                         </h3>
                         <p className="text-gray-300 mb-4">
                           多数链游采用 双代币体系：一种治理代币（Governance Token）和一种游戏代币（Utility / Reward Token）。
                         </p>
                         
                         <div className="overflow-x-auto mb-6">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">类型</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">功能</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">类比</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">举例</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">治理代币（主币）</td>
                                 <td className="px-4 py-3 text-gray-300">决策、质押、长期价值</td>
                                 <td className="px-4 py-3 text-gray-300">股东权益</td>
                                 <td className="px-4 py-3 text-gray-300">AXS / PIXEL / ILV</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">游戏代币（副币）</td>
                                 <td className="px-4 py-3 text-gray-300">奖励、流通、消耗</td>
                                 <td className="px-4 py-3 text-gray-300">游戏金币</td>
                                 <td className="px-4 py-3 text-gray-300">SLP / GOLD / RON</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                         
                         <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                           <h4 className="text-white font-medium mb-2 flex items-center">
                             <i className="fa-solid fa-exclamation-triangle text-red-400 mr-2"></i>
                             问题在于：
                           </h4>
                           <p className="text-gray-300">
                             如果副币产出 &gt; 消耗 → 经济系统崩盘（典型例：Axie 2021）。
                           </p>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-recycle text-blue-400 mr-2"></i>
                           链游经济系统的循环逻辑
                         </h3>
                         
                         <div className="flex flex-col items-center space-y-4 mb-6">
                           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                             <p className="text-white">玩家参与游戏</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                             <p className="text-white">投入资金（NFT/代币）</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                             <p className="text-white">完成任务 / PvP / 打金</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                             <p className="text-white">获得奖励代币</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                             <p className="text-white">代币在DEX或NFT市场出售</p>
                           </div>
                           <i className="fa-solid fa-chevron-down text-gray-400"></i>
                           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                             <p className="text-white">新玩家接盘 → 形成循环</p>
                           </div>
                         </div>
                         
                         <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                           <h4 className="text-white font-medium mb-2 flex items-center">
                             <i className="fa-solid fa-exclamation-triangle text-red-400 mr-2"></i>
                             警告：
                           </h4>
                           <p className="text-gray-300">
                             当「新玩家增速 &lt; 老玩家抛压」时 → 系统崩塌。<br/>
                             所以优质 GameFi 必须靠玩法深度 + 内部消耗机制维持经济平衡。
                           </p>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-image text-pink-400 mr-2"></i>
                           NFT 在 GameFi 中的角色
                         </h3>
                         <p className="text-gray-300 mb-4">
                           NFT 是链游的资产凭证与经济锚点。通过 NFT，游戏资产可以真正"归玩家所有"。
                         </p>
                         
                         <div className="overflow-x-auto mb-6">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">NFT 类型</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">功能</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">价值体现</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">角色类（Avatar）</td>
                                 <td className="px-4 py-3 text-gray-300">玩家身份、战斗单位</td>
                                 <td className="px-4 py-3 text-gray-300">稀缺性、等级成长</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">装备类（Item）</td>
                                 <td className="px-4 py-3 text-gray-300">提升战力、参与限制</td>
                                 <td className="px-4 py-3 text-gray-300">游戏内消耗 / 升级价值</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">土地类（Land）</td>
                                 <td className="px-4 py-3 text-gray-300">资源产出 / 税收分红</td>
                                 <td className="px-4 py-3 text-gray-300">资产性强，可出租</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">通行证类（Pass）</td>
                                 <td className="px-4 py-3 text-gray-300">活动、节点、早期权益</td>
                                 <td className="px-4 py-3 text-gray-300">门票属性、限量稀缺</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                         
                         <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                           <h4 className="text-white font-medium mb-2 flex items-center">
                             <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                             关键点：
                           </h4>
                           <p className="text-gray-300">
                             优质项目不只是"发NFT"，而是让 NFT 在玩法循环中具备功能性与经济回收机制。
                           </p>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-chess text-purple-400 mr-2"></i>
                           GameFi 的常见经济模型
                         </h3>
                         
                         <div className="overflow-x-auto mb-6">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">模型</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">特征</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">风险</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">案例</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Play to Earn（玩赚）</td>
                                 <td className="px-4 py-3 text-gray-300">打游戏赚钱</td>
                                 <td className="px-4 py-3 text-gray-300">高通胀，依赖新玩家</td>
                                 <td className="px-4 py-3 text-gray-300">Axie Infinity</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Move to Earn（动赚）</td>
                                 <td className="px-4 py-3 text-gray-300">运动获得奖励</td>
                                 <td className="px-4 py-3 text-gray-300">高门槛，短周期</td>
                                 <td className="px-4 py-3 text-gray-300">StepN</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Play and Own（玩即拥有）</td>
                                 <td className="px-4 py-3 text-gray-300">强调NFT资产价值与玩法结合</td>
                                 <td className="px-4 py-3 text-gray-300">相对健康</td>
                                 <td className="px-4 py-3 text-gray-300">Pixels / BigTime</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Create to Earn（创作赚）</td>
                                 <td className="px-4 py-3 text-gray-300">UGC内容经济</td>
                                 <td className="px-4 py-3 text-gray-300">增强社区活力</td>
                                 <td className="px-4 py-3 text-gray-300">Sandbox / Roblox链改</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">AI + GameFi（智能交互）</td>
                                 <td className="px-4 py-3 text-gray-300">NPC自主交易、AI资产</td>
                                 <td className="px-4 py-3 text-gray-300">新兴叙事</td>
                                 <td className="px-4 py-3 text-gray-300">Parallel / AI Arena</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                         
                         <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                           <h4 className="text-white font-medium mb-2 flex items-center">
                             <i className="fa-solid fa-compass text-yellow-400 mr-2"></i>
                             未来趋势：
                           </h4>
                           <p className="text-gray-300">
                             "从Play to Earn → Play and Own → Play and Create"<br/>
                             （从短期激励转向长期生态）
                           </p>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-globe text-green-400 mr-2"></i>
                           NFT 市场与链游生态联动
                         </h3>
                         
                         <div className="overflow-x-auto mb-6">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">生态</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">主打方向</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">市场特点</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Ethereum</td>
                                 <td className="px-4 py-3 text-gray-300">高端收藏 / 蓝筹NFT</td>
                                 <td className="px-4 py-3 text-gray-300">BAYC / Otherside / Azuki</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Solana</td>
                                 <td className="px-4 py-3 text-gray-300">轻量游戏 / 社交NFT</td>
                                 <td className="px-4 py-3 text-gray-300">MadLads / Tensor</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">RONIN</td>
                                 <td className="px-4 py-3 text-gray-300">GameFi专用链</td>
                                 <td className="px-4 py-3 text-gray-300">Axie / Pixels / Portal</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">Immutable X</td>
                                 <td className="px-4 py-3 text-gray-300">NFT + 游戏SDK</td>
                                 <td className="px-4 py-3 text-gray-300">Illuvium / Gods Unchained</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">BASE / Polygon</td>
                                 <td className="px-4 py-3 text-gray-300">社交+娱乐NFT</td>
                                 <td className="px-4 py-3 text-gray-300">Lens / Galxe / Pudgy World</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                         
                         <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
                           <h4 className="text-white font-medium mb-2 flex items-center">
                             <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                             核心关系：
                           </h4>
                           <p className="text-gray-300">
                             NFT 是链游"资产层"，<br/>
                             而公链是"结算层"，L2（如 Ronin、Immutable）让它真正可用。
                           </p>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-search text-blue-400 mr-2"></i>
                           链游项目投研核心要素
                         </h3>
                         
                         <div className="overflow-x-auto mb-6">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">模块</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">关键问题</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">评估维度</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">玩法逻辑</td>
                                 <td className="px-4 py-3 text-gray-300">好玩还是打金？</td>
                                 <td className="px-4 py-3 text-gray-300">游戏深度 / 可玩性</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">经济模型</td>
                                 <td className="px-4 py-3 text-gray-300">是否通缩可持续？</td>
                                 <td className="px-4 py-3 text-gray-300">代币消耗 / NFT回收</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">团队背景</td>
                                 <td className="px-4 py-3 text-gray-300">是否具备游戏开发经验？</td>
                                 <td className="px-4 py-3 text-gray-300">是否来自传统游戏公司</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">用户增长</td>
                                 <td className="px-4 py-3 text-gray-300">新玩家来源 / 复购率</td>
                                 <td className="px-4 py-3 text-gray-300">是否超越"打金循环"</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">NFT流动性</td>
                                 <td className="px-4 py-3 text-gray-300">市场交易活跃度</td>
                                 <td className="px-4 py-3 text-gray-300">地板价 / Volume / 持有人结构</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">链上活跃度</td>
                                 <td className="px-4 py-3 text-gray-300">日活 / 交互笔数</td>
                                 <td className="px-4 py-3 text-gray-300">Dune / DappRadar 数据</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">合作生态</td>
                                 <td className="px-4 py-3 text-gray-300">是否有主链支持 / 联运</td>
                                 <td className="px-4 py-3 text-gray-300">Ronin、Immutable、Base等支持</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-heartbeat text-red-400 mr-2"></i>
                           GameFi 经济健康度模型（简单判断）
                         </h3>
                         
                         <div className="overflow-x-auto mb-6">
                           <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg mt-4">
                             <thead>
                               <tr className="border-b border-gray-800">
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">维度</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">健康信号 ✅</th>
                                 <th className="px-4 py-3 text-left text-gray-400 font-medium">危险信号 ⚠️</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">玩家行为</td>
                                 <td className="px-4 py-3 text-gray-300">自发留存、社交增长</td>
                                 <td className="px-4 py-3 text-gray-300">打金机器人为主</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">NFT流通</td>
                                 <td className="px-4 py-3 text-gray-300">有二级市场流动</td>
                                 <td className="px-4 py-3 text-gray-300">地板价持续下跌</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">代币模型</td>
                                 <td className="px-4 py-3 text-gray-300">有真实消耗场景</td>
                                 <td className="px-4 py-3 text-gray-300">产出远超消耗</td>
                               </tr>
                               <tr className="border-b border-gray-800">
                                 <td className="px-4 py-3 text-white font-medium">资金来源</td>
                                 <td className="px-4 py-3 text-gray-300">游戏内经济循环</td><td className="px-4 py-3 text-gray-300">持续依赖新玩家</td>
                               </tr>
                               <tr>
                                 <td className="px-4 py-3 text-white font-medium">团队动作</td>
                                 <td className="px-4 py-3 text-gray-300">更新频繁、有活动</td>
                                 <td className="px-4 py-3 text-gray-300">长期停更 / 缺乏策划</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-rocket text-purple-400 mr-2"></i>
                           GameFi + NFT 的未来趋势
                         </h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">AI GameFi</h4>
                             <p className="text-gray-300 text-sm mb-2">智能NPC、AI训练资产</p>
                             <p className="text-blue-400 text-sm">代表项目：AI Arena / Fable / Parallel</p>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">RPG链游生态</h4>
                             <p className="text-gray-300 text-sm mb-2">高质量Unity 3D链游</p>
                             <p className="text-blue-400 text-sm">代表项目：BigTime / Illuvium</p>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">跨链游戏资产标准</h4>
                             <p className="text-gray-300 text-sm mb-2">NFT跨链互操作</p>
                             <p className="text-blue-400 text-sm">代表项目：LayerZero / zkBridge</p>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">UGC + Mod平台化</h4>
                             <p className="text-gray-300 text-sm mb-2">玩家共创经济系统</p>
                             <p className="text-blue-400 text-sm">代表项目：Portal / Hytopia</p>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 md:col-span-2">
                             <h4 className="text-white font-medium mb-2">链游发行平台</h4>
                             <p className="text-gray-300 text-sm mb-2">Launchpad + SDK</p>
                             <p className="text-blue-400 text-sm">代表项目：Ronin / XPLA / Gala Games</p>
                           </div>
                         </div>
                         
                         <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-6">
                           <h4 className="text-white font-medium mb-2 flex items-center">
                             <i className="fa-solid fa-info-circle text-blue-400 mr-2"></i>
                             关键洞察：
                           </h4>
                           <p className="text-gray-300">
                             新的叙事焦点将不再是"打金"，而是"资产互通 + 玩家自治 + 长线经济"。
                           </p>
                         </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-crown text-yellow-400 mr-2"></i>
                            热门链游分类与代表项目
                          </h3>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">一、角色扮演类链游（RPG）</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">链</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">经济模型</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Illuvium</td>
                                      <td className="px-4 py-3 text-gray-300">开放世界RPG，高品质3D画面</td>
                                      <td className="px-4 py-3 text-gray-300">Immutable X</td>
                                      <td className="px-4 py-3 text-gray-300">ILV + 游戏内资源</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">BigTime</td>
                                      <td className="px-4 py-3 text-gray-300">多人在线ARPG，时间晶体机制</td>
                                      <td className="px-4 py-3 text-gray-300">Polygon</td>
                                      <td className="px-4 py-3 text-gray-300">TIME + 装备NFT</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">Parallel</td>
                                      <td className="px-4 py-3 text-gray-300">科幻卡牌RPG，AI对战系统</td>
                                      <td className="px-4 py-3 text-gray-300">Ethereum</td>
                                      <td className="px-4 py-3 text-gray-300">PRIME + 卡牌NFT</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">二、策略与模拟经营类</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">链</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">经济模型</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">The Sandbox</td>
                                      <td className="px-4 py-3 text-gray-300">元宇宙土地建设，UGC内容平台</td>
                                      <td className="px-4 py-3 text-gray-300">Polygon</td>
                                      <td className="px-4 py-3 text-gray-300">SAND + 土地NFT</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Decentraland</td>
                                      <td className="px-4 py-3 text-gray-300">虚拟世界，社交与商业活动</td>
                                      <td className="px-4 py-3 text-gray-300">Ethereum</td>
                                      <td className="px-4 py-3 text-gray-300">MANA + 地产NFT</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">Axie Infinity</td>
                                      <td className="px-4 py-3 text-gray-300">精灵对战+繁殖，Play-to-Earn开创者</td>
                                      <td className="px-4 py-3 text-gray-300">Ronin</td>
                                      <td className="px-4 py-3 text-gray-300">AXS + SLP</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">三、动作与竞技类</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">链</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">经济模型</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Gods Unchained</td>
                                      <td className="px-4 py-3 text-gray-300">TCG卡牌对战，eSports赛事</td>
                                      <td className="px-4 py-3 text-gray-300">Immutable X</td>
                                      <td className="px-4 py-3 text-gray-300">GODS + 卡牌NFT</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Aavegotchi</td>
                                      <td className="px-4 py-3 text-gray-300">像素风格幽灵养成与PvP</td>
                                      <td className="px-4 py-3 text-gray-300">Polygon</td>
                                      <td className="px-4 py-3 text-gray-300">GHST + Aavegotchi NFT</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">CryptoBlades</td>
                                      <td className="px-4 py-3 text-gray-300">像素RPG战斗，简单上手</td>
                                      <td className="px-4 py-3 text-gray-300">BSC</td>
                                      <td className="px-4 py-3 text-gray-300">SKILL + 武器NFT</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-medium text-white mb-3">四、休闲与创新玩法类</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">链</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">经济模型</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">StepN</td>
                                      <td className="px-4 py-3 text-gray-300">Move-to-Earn，边运动边赚钱</td>
                                      <td className="px-4 py-3 text-gray-300">Solana</td>
                                      <td className="px-4 py-3 text-gray-300">GMT + GST</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Pixels</td>
                                      <td className="px-4 py-3 text-gray-300">农场模拟，Web3版星露谷物语</td>
                                      <td className="px-4 py-3 text-gray-300">Ronin</td>
                                      <td className="px-4 py-3 text-gray-300">PIXEL + 游戏内资产</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">AI Arena</td>
                                      <td className="px-4 py-3 text-gray-300">AI训练与对战，策略卡牌</td>
                                      <td className="px-4 py-3 text-gray-300">Arbitrum</td>
                                      <td className="px-4 py-3 text-gray-300">AINC + AI模型NFT</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            
                            <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                              <h4 className="text-white font-medium mb-2 flex items-center">
                                <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                玩家选择建议：
                              </h4>
                              <p className="text-gray-300">
                                根据个人偏好选择链游类型，并注意以下几点：<br/>
                                1. 前期投入成本与潜在回报的平衡<br/>
                                2. 游戏的长期更新与社区活跃度<br/>
                                3. 经济模型的可持续性<br/>
                                4. 团队背景与项目资金支持
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {/* 空投类型详解详细内容 */}
                    {module.id === 'module-6' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mb-12"
                      >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                          <i className="fa-solid fa-gift text-purple-400 mr-2"></i>
                          空投类型详解
                        </h2>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                            什么是空投？
                          </h3>
                          <p className="text-gray-300 mb-4">
                            空投（Airdrop）是加密货币项目方为了推广项目、扩大用户群体、提高代币流通性，向特定用户群体免费分发代币的一种营销策略。用户通常需要完成一些简单任务或满足特定条件才能获得这些免费代币。
                          </p>
                          
                          <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                            <p className="text-gray-300 italic font-medium">
                              一句话总结：<br/>
                              空投 = 项目方的"免费样品" + 用户的"潜在投资机会"
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-sitemap text-yellow-400 mr-2"></i>
                            空投的发展历程
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 w-full md:w-1/4 text-center">
                                  <p className="text-white font-medium">早期阶段（2013-2017）</p>
                                  <p className="text-gray-400 text-sm mt-1">简单分发，主要用于推广</p>
                                </div>
                                <i className="fa-solid fa-chevron-right text-gray-400 hidden md:block"></i>
                                <i className="fa-solid fa-chevron-down text-gray-400 block md:hidden"></i>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 w-full md:w-1/4 text-center">
                                  <p className="text-white font-medium">发展阶段（2018-2020）</p>
                                  <p className="text-gray-400 text-sm mt-1">任务化、社区化、价值化</p>
                                </div>
                                <i className="fa-solid fa-chevron-right text-gray-400 hidden md:block"></i>
                                <i className="fa-solid fa-chevron-down text-gray-400 block md:hidden"></i>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 w-full md:w-1/4 text-center">
                                  <p className="text-white font-medium">成熟阶段（2021-至今）</p>
                                  <p className="text-gray-400 text-sm mt-1">专业化、系统化、多类型化</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-list text-blue-400 mr-2"></i>
                            链上交互空投详解
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <h4 className="text-white font-medium mb-3">定义与特点</h4>
                              <p className="text-gray-300 mb-4">
                                链上交互空投是指用户通过在特定区块链上与项目智能合约进行交互（如转账、Swap、质押、提供流动性等操作），从而获得项目方后续代币分发的资格。
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">优点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>空投价值通常较高</li>
                                    <li>有实际链上行为证明</li>
                                    <li>参与过程学习链上操作</li>
                                  </ul>
                                </div>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">缺点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>需要支付Gas费</li>
                                    <li>可能需要持有特定资产</li>
                                    <li>结果不确定性高</li>
                                  </ul>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">成功案例</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">空投类型</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">交互要求</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">空投价值</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Uniswap</td>
                                      <td className="px-4 py-3 text-gray-300">早期用户空投</td>
                                      <td className="px-4 py-3 text-gray-300">在特定时间前进行过交易</td>
                                      <td className="px-4 py-3 text-gray-300">最高达数万美元</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">Optimism</td>
                                      <td className="px-4 py-3 text-gray-300">多次分批空投</td>
                                      <td className="px-4 py-3 text-gray-300">在OP链上进行交互</td>
                                      <td className="px-4 py-3 text-gray-300">数百至数千美元</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">参与策略</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                <li>关注新公链和L2网络的上线</li>
                                <li>参与早期DeFi项目的基础交互</li>
                                <li>记录所有交互地址和交易哈希</li>
                                <li>保持适度的交互频率和金额</li>
                                <li>关注项目官方公告和社区动态</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-users text-green-400 mr-2"></i>
                            社群活跃空投详解
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <h4 className="text-white font-medium mb-3">定义与特点</h4>
                              <p className="text-gray-300 mb-4">
                                社群活跃空投是项目方为了建立和活跃社区，通过要求用户完成社交媒体任务、参与社区讨论、贡献内容等方式来筛选和奖励活跃用户的空投类型。
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">优点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>参与成本低，无需Gas费</li>
                                    <li>可以同时参与多个项目</li>
                                    <li>了解项目动态和行业信息</li>
                                  </ul>
                                </div>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">缺点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>竞争激烈，获奖概率低</li>
                                    <li>需要投入时间和精力</li>
                                    <li>奖励通常较小</li>
                                  </ul>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">常见任务类型</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">社交媒体任务</h5>
                                  <p className="text-gray-400 text-sm">关注Twitter、转发推文、添加标签</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">社区参与任务</h5>
                                  <p className="text-gray-400 text-sm">加入Telegram/Discord、参与讨论</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">内容创作任务</h5>
                                  <p className="text-gray-400 text-sm">撰写评测、制作视频、设计海报</p>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">参与平台</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">平台</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">URL</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Galxe</td>
                                      <td className="px-4 py-3 text-gray-300">最大的Web3凭证网络</td>
                                      <td className="px-4 py-3 text-gray-300">https://galxe.com</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Zealy</td>
                                      <td className="px-4 py-3 text-gray-300">社区任务与排行榜</td>
                                      <td className="px-4 py-3 text-gray-300">https://zealy.io</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">TaskOn</td>
                                      <td className="px-4 py-3 text-gray-300">一站式任务聚合平台</td>
                                      <td className="px-4 py-3 text-gray-300">https://taskon.xyz</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">参与策略</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                <li>创建专用的社交媒体账号</li>
                                <li>优先完成知名项目的社群任务</li>
                                <li>设置任务提醒，避免错过截止日期</li>
                                <li>在多个平台同时参与以提高成功率</li>
                                <li>保持真实活跃，避免被判定为机器人</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-user-plus text-purple-400 mr-2"></i>
                            邀请空投详解
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <h4 className="text-white font-medium mb-3">定义与特点</h4>
                              <p className="text-gray-300 mb-4">
                                邀请空投是项目方通过激励现有用户邀请新用户加入的方式来快速扩大用户群体的空投类型。邀请者和被邀请者通常都能获得奖励，邀请人数越多、邀请质量越高，获得的奖励也就越多。
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">优点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>奖励潜力大，可无限放大</li>
                                    <li>可利用社交网络快速获取</li>
                                    <li>通常有明确的奖励机制</li>
                                  </ul>
                                </div>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">缺点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>需要一定的社交影响力</li>
                                    <li>可能被认定为传销行为</li>
                                    <li>存在邀请欺诈风险</li>
                                  </ul>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">常见邀请模式</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">直接邀请</h5>
                                  <p className="text-gray-400 text-sm">每邀请一人获得固定奖励</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">多级邀请</h5>
                                  <p className="text-gray-400 text-sm">邀请者可获得被邀请者的部分收益</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">排名邀请</h5>
                                  <p className="text-gray-400 text-sm">邀请人数排名前列获得额外奖励</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">任务邀请</h5>
                                  <p className="text-gray-400 text-sm">被邀请者完成特定任务后双方获得奖励</p>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">成功案例</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">邀请模式</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">奖励机制</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Lingo</td>
                                      <td className="px-4 py-3 text-gray-300">多级邀请</td>
                                      <td className="px-4 py-3 text-gray-300">直接邀请奖励+团队收益</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">Zealy任务</td>
                                      <td className="px-4 py-3 text-gray-300">排行榜+直接邀请</td>
                                      <td className="px-4 py-3 text-gray-300">邀请积分+排名奖励</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">参与策略</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                <li>利用个人社交媒体影响力进行推广</li>
                                <li>创建教程内容帮助新用户快速上手</li>
                                <li>建立社区群组提高邀请用户的留存率</li>
                                <li>关注邀请活动的有效期限和规则变化</li>
                                <li>合理评估投入产出比，避免过度推广</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-image text-pink-400 mr-2"></i>
                            NFT空投详解
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <h4 className="text-white font-medium mb-3">定义与特点</h4>
                              <p className="text-gray-300 mb-4">
                                NFT空投是项目方向特定用户发放非同质化代币（NFT）的一种方式。这些NFT可能具有收藏价值、实用功能或未来的经济价值，常见于新项目启动、社区活动或特殊纪念。
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">优点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>具有唯一性和稀缺性</li>
                                    <li>可能成为未来项目的通行证</li>
                                    <li>收藏和转售价值潜力大</li>
                                  </ul>
                                </div>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">缺点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>部分NFT流动性较差</li>
                                    <li>市场波动较大</li>
                                    <li>需要了解NFT市场和价值判断</li>
                                  </ul>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">NFT空投类型</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">项目纪念NFT</h5>
                                  <p className="text-gray-400 text-sm">项目里程碑或特殊事件纪念</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">功能型NFT</h5>
                                  <p className="text-gray-400 text-sm">具有游戏内功能或治理权利</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">白名单NFT</h5>
                                  <p className="text-gray-400 text-sm">作为后续项目的访问资格</p>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">获取平台</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">平台</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">特点</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">URL</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Mint.fun</td>
                                      <td className="px-4 py-3 text-gray-300">以太坊NFT铸造平台</td>
                                      <td className="px-4 py-3 text-gray-300">https://mint.fun</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Blur</td>
                                      <td className="px-4 py-3 text-gray-300">NFT交易市场</td>
                                      <td className="px-4 py-3 text-gray-300">https://blur.io</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">Tensor</td>
                                      <td className="px-4 py-3 text-gray-300">Solana NFT交易市场</td>
                                      <td className="px-4 py-3 text-gray-300">https://tensor.trade</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">参与策略</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                <li>关注知名NFT项目的社交媒体和Discord</li>
                                <li>参与NFT社区讨论，获取一手信息</li>
                                <li>了解NFT的稀缺性和潜在价值</li>
                                <li>合理配置资金，不要盲目参与</li>
                                <li>注意Gas费优化，避免高成本铸造</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-user-shield text-blue-400 mr-2"></i>
                            白名单空投详解
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <h4 className="text-white font-medium mb-3">定义与特点</h4>
                              <p className="text-gray-300 mb-4">
                                白名单空投是项目方预先设定一系列条件，符合条件的用户被列入白名单后，可以在项目上线或特定时间获得代币分配的空投类型。白名单通常代表着项目方对用户的认可，也是控制初始流通量的一种方式。
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">优点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>获得确定性的空投资格</li>
                                    <li>通常分配数量较多</li>
                                    <li>代表项目方的认可</li>
                                  </ul>
                                </div>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">缺点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>申请流程复杂且竞争激烈</li>
                                    <li>需要满足严格的条件</li>
                                    <li>等待时间较长</li>
                                  </ul>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">白名单筛选标准</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">社区贡献</h5>
                                  <p className="text-gray-400 text-sm">活跃度、内容创作、社区管理</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">链上行为</h5>
                                  <p className="text-gray-400 text-sm">持有特定资产、交易历史、交互频率</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">特殊身份</h5>
                                  <p className="text-gray-400 text-sm">KOL、早期支持者、机构投资者</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">随机性</h5>
                                  <p className="text-gray-400 text-sm">公平抽签、快照随机选取</p>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">白名单获取渠道</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                <li>项目官方社交媒体（Twitter、Discord）</li>
                                <li>合作伙伴和投资机构的社区渠道</li>
                                <li>专业白名单聚合平台</li>
                                <li>社区AMA和活动</li>
                                <li>早期参与测试网和beta版本</li>
                              </ul>
                              
                              <h4 className="text-white font-medium mb-3">参与策略</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                <li>提前研究项目，了解白名单申请条件</li>
                                <li>建立专业的白名单申请档案</li>
                                <li>关注项目关键时间节点和公告</li>
                                <li>积极参与项目社区建设和贡献</li>
                                <li>保持耐心，不要因为申请失败而气馁</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-server text-green-400 mr-2"></i>
                            DePIN类空投详解
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <h4 className="text-white font-medium mb-3">定义与特点</h4>
                              <p className="text-gray-300 mb-4">
                                DePIN（去中心化物理基础设施网络）类空投是指用户通过提供物理硬件设备、网络资源或计算能力等方式参与去中心化网络建设，从而获得代币奖励的空投类型。这类空投通常需要一定的硬件投资和技术知识。
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">优点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>长期稳定的被动收入</li>
                                    <li>参与实体基础设施建设</li>
                                    <li>技术门槛形成护城河</li>
                                  </ul>
                                </div>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">缺点</h5>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>需要前期硬件投资</li>
                                    <li>存在设备维护成本</li>
                                    <li>受网络覆盖和竞争影响</li>
                                  </ul>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">常见DePIN项目类型</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">网络覆盖</h5>
                                  <p className="text-gray-400 text-sm">提供Wi-Fi、5G、IoT网络覆盖</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">存储服务</h5>
                                  <p className="text-gray-400 text-sm">提供分布式存储空间</p>
                                </div>
                                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                  <h5 className="text-white font-medium mb-2">计算资源</h5>
                                  <p className="text-gray-400 text-sm">提供闲置CPU/GPU算力</p>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">代表性项目</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">项目</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">类型</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">硬件需求</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">URL</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Helium</td>
                                      <td className="px-4 py-3 text-gray-300">网络覆盖</td>
                                      <td className="px-4 py-3 text-gray-300">专用热点设备</td>
                                      <td className="px-4 py-3 text-gray-300">https://helium.com</td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">io.net</td>
                                      <td className="px-4 py-3 text-gray-300">计算资源</td>
                                      <td className="px-4 py-3 text-gray-300">GPU设备</td>
                                      <td className="px-4 py-3 text-gray-300">https://io.net</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">NOS</td>
                                      <td className="px-4 py-3 text-gray-300">存储服务</td>
                                      <td className="px-4 py-3 text-gray-300">NAS设备</td>
                                      <td className="px-4 py-3 text-gray-300">https://nos.io</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">参与策略</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                <li>评估硬件成本和预期收益</li>
                                <li>选择适合自己技术水平的项目</li>
                                <li>关注项目的市场前景和团队背景</li>
                                <li>了解设备的放置位置和网络要求</li>
                                <li>计算长期运营成本和回报周期</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-shield-alt text-red-400 mr-2"></i>
                            空投风险与防范措施
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <h4 className="text-white font-medium mb-3">常见风险类型</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">钓鱼诈骗</h5>
                                  <p className="text-gray-300 text-sm">虚假空投网站骗取私钥和资产</p>
                                </div>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">Gas费陷阱</h5>
                                  <p className="text-gray-300 text-sm">高额Gas费远超预期空投价值</p>
                                </div>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">项目跑路</h5>
                                  <p className="text-gray-300 text-sm">项目方收集用户数据后消失</p>
                                </div>
                                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">智能合约风险</h5>
                                  <p className="text-gray-300 text-sm">存在漏洞的合约可能导致资产损失</p>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">防范措施</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                <li>使用专用空投钱包，避免使用主钱包</li>
                                <li>永远不要向任何人透露私钥或助记词</li>
                                <li>仔细检查项目官方网站URL</li>
                                <li>核实项目团队和背景信息</li>
                                <li>控制Gas费支出，避免过度投资</li>
                                <li>使用钱包安全插件检测潜在风险</li>
                                <li>关注社区反馈和警告信息</li>
                              </ul>
                              
                              <h4 className="text-white font-medium mb-3">安全工具推荐</h4>
                              <div className="overflow-x-auto mb-4">
                                <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                  <thead>
                                    <tr className="border-b border-gray-800">
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">工具</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">功能</th>
                                      <th className="px-4 py-3 text-left text-gray-400 font-medium">URL</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-gray-800">
                                      <td className="px-4 py-3 text-white font-medium">Wallet Guard</td>
                                      <td className="px-4 py-3 text-gray-300">检测恶意合约和钓鱼链接</td>
                                      <td className="px-4 py-3 text-gray-300">https://walletguard.app</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-3 text-white font-medium">Revoke.cash</td>
                                      <td className="px-4 py-3 text-gray-300">撤销不必要的代币授权</td>
                                      <td className="px-4 py-3 text-gray-300">https://revoke.cash</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-trophy text-yellow-400 mr-2"></i>
                            成功获取空投的实用技巧
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="text-white font-medium mb-3">信息收集与筛选</h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>建立多元化的信息收集渠道</li>
                                    <li>使用工具聚合和筛选空投信息</li>
                                    <li>验证信息来源的真实性</li>
                                    <li>关注优质项目的早期信号</li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-white font-medium mb-3">效率提升策略</h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>创建标准化的空投参与流程</li>
                                    <li>使用自动化工具辅助完成简单任务</li>
                                    <li>批量管理社交媒体账号</li>
                                    <li>建立空投日历和提醒系统</li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-white font-medium mb-3">价值判断方法</h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>分析项目团队和投资方背景</li>
                                    <li>评估项目的技术创新性和市场需求</li>
                                    <li>关注社区活跃度和发展潜力</li>
                                    <li>对比同类项目的历史表现</li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-white font-medium mb-3">长期布局策略</h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li>重点关注新兴公链和生态系统</li>
                                    <li>建立长期的项目跟踪和参与记录</li>
                                    <li>参与项目的治理和社区建设</li>
                                    <li>形成个人的投资和风险评估体系</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <i className="fa-solid fa-chart-line text-purple-400 mr-2"></i>
                            空投趋势与未来展望
                          </h3>
                          
                          <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-5">
                              <h4 className="text-white font-medium mb-3">当前空投市场趋势</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">专业化和复杂化</h5>
                                  <p className="text-gray-300 text-sm">空投不再是简单分发，而是成为项目生态建设的重要组成部分</p>
                                </div>
                                <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                  <h5 className="text-white font-medium mb-2">多维度筛选</h5>
                                  <p className="text-gray-300 text-sm">从单一维度向用户活跃度、贡献度等多维度评估转变</p>
                                </div>
                              </div>
                              
                              <h4 className="text-white font-medium mb-3">未来空投发展方向</h4>
                              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                <li>与DeFi、NFT、GameFi等生态深度融合</li>
                                <li>更智能的用户筛选和奖励机制</li>
                                <li>隐私保护和用户数据安全的增强</li>
                                <li>跨链和多链空投的普及</li>
                                <li>更注重社区贡献和长期价值创造</li>
                              </ul>
                              
                              <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                                <h5 className="text-white font-medium mb-2 flex items-center">
                                  <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                  未来机会提示：
                                </h5>
                                <p className="text-gray-300">
                                  关注Layer 2扩展解决方案、模块化区块链、AI与区块链结合项目的空投机会，这些领域可能成为未来空投价值的集中地。
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* 空投任务平台详细内容 */}
                    {module.id === 'module-4' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mb-12"
                      >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                          <i className="fa-solid fa-gift text-purple-400 mr-2"></i>
                          空投任务平台详解
                       </h2>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                           什么是DePIN？
                         </h3>
                         <p className="text-gray-300 mb-4">
                           DePIN（Decentralized Physical Infrastructure Networks）即去中心化物理基础设施网络，是一种通过区块链技术将物理世界的基础设施（如网络设备、计算资源、存储设备等）连接起来，并通过代币激励机制鼓励用户参与和维护这些基础设施的新型网络模式。
                         </p>
                         
                         <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                           <p className="text-gray-300 italic font-medium">
                             一句话总结：<br/>
                             DePIN = 区块链 + 物理设备 + 共享经济
                           </p>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-sitemap text-yellow-400 mr-2"></i>
                           DePIN的核心价值与特点
                         </h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">核心价值</h4>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                               <li>将闲置物理资源转化为数字资产</li>
                               <li>降低基础设施建设和维护成本</li>
                               <li>提高资源利用效率和覆盖范围</li>
                               <li>通过代币激励促进社区参与和网络扩展</li>
                             </ul>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">主要特点</h4>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                               <li>去中心化：不依赖中心化机构运营</li>
                               <li>开放参与：任何人都可以贡献资源并获得奖励</li>
                               <li>透明治理：通过区块链技术实现透明的网络治理</li>
                               <li>弹性扩展：网络可以根据需求灵活扩展</li>
                             </ul>
                           </div>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-microchip text-blue-400 mr-2"></i>
                           DePIN硬件设备类型
                         </h3>
                         
                         <div className="space-y-6">
                           <div>
                             <h4 className="text-lg font-medium text-white mb-3">常见设备类型</h4>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                               <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                 <h5 className="text-white font-medium mb-2">网络设备</h5>
                                 <p className="text-gray-300 text-sm">Wi-Fi路由器、移动通信设备、LoRa网关等</p>
                                 <p className="text-blue-400 text-xs mt-1">代表项目：Helium、IoTeX</p>
                               </div>
                               <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                 <h5 className="text-white font-medium mb-2">存储设备</h5>
                                 <p className="text-gray-300 text-sm">硬盘、服务器、分布式存储节点等</p>
                                 <p className="text-blue-400 text-xs mt-1">代表项目：Filecoin、Storj</p>
                               </div>
                               <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                 <h5 className="text-white font-medium mb-2">计算设备</h5>
                                 <p className="text-gray-300 text-sm">CPU/GPU矿机、边缘计算设备等</p>
                                 <p className="text-blue-400 text-xs mt-1">代表项目：Render Network、Akash Network</p>
                               </div>
                               <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                 <h5 className="text-white font-medium mb-2">传感器设备</h5>
                                 <p className="text-gray-300 text-sm">环境监测、物联网传感器等</p>
                                 <p className="text-blue-400 text-xs mt-1">代表项目：Hivemapper、DIMO</p>
                               </div>
                               <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                 <h5 className="text-white font-medium mb-2">混合设备</h5>
                                 <p className="text-gray-300 text-sm">集成多种功能的综合设备</p>
                                 <p className="text-blue-400 text-xs mt-1">代表项目：UBI Network、Io.net</p>
                               </div>
                               <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                 <h5 className="text-white font-medium mb-2">专用设备</h5>
                                 <p className="text-gray-300 text-sm">为特定DePIN项目设计的专用硬件</p>
                                 <p className="text-blue-400 text-xs mt-1">代表项目：Helium热点、SenseCAP设备</p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-coins text-yellow-400 mr-2"></i>
                           DePIN挖矿机制详解
                         </h3>
                         
                         <div className="space-y-6">
                           <div>
                             <h4 className="text-lg font-medium text-white mb-3">基础原理</h4>
                             <div className="bg-gray-800 rounded-lg p-5">
                               <ol className="list-decimal pl-6 text-gray-300 space-y-3">
                                 <li>用户购买或部署符合项目要求的硬件设备</li>
                                 <li>设备连接到DePIN网络，提供特定服务（如网络覆盖、存储、计算等）</li>
                                 <li>网络通过智能合约自动记录设备贡献的工作量</li>
                                 <li>根据贡献量，网络定期向用户发放代币奖励</li>
                                 <li>用户可以在交易所出售代币或继续持有参与治理</li>
                               </ol>
                             </div>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                               <h4 className="text-white font-medium mb-2">常见奖励机制</h4>
                               <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                 <li><strong>工作量证明（PoW）：</strong>根据设备实际提供的服务量计算奖励</li>
                                 <li><strong>空间证明（PoSpace）：</strong>根据提供的存储空间大小和时间计算奖励</li>
                                 <li><strong>带宽证明（PoB）：</strong>根据提供的网络带宽计算奖励</li>
                                 <li><strong>有用工作证明（PoUW）：</strong>根据完成的实际有用工作计算奖励</li>
                               </ul>
                             </div>
                             <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                               <h4 className="text-white font-medium mb-2">影响收益的因素</h4>
                               <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                 <li>设备性能和规格</li>
                                 <li>网络覆盖范围和密度</li>
                                 <li>提供服务的质量和稳定性</li>
                                 <li>代币市场价格波动</li>
                                 <li>网络难度调整和奖励衰减</li>
                               </ul>
                             </div>
                           </div>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-globe text-purple-400 mr-2"></i>
                           UBI Network项目解析
                         </h3>
                         
                         <div className="bg-gray-800 rounded-lg p-5 mb-6">
                           <div className="flex items-center mb-3">
                             <i className="fa-solid fa-globe text-blue-400 mr-2"></i>
                             <a href="https://ubinetwork.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://ubinetwork.ai</a>
                           </div>
                           <p className="text-gray-300 mb-3">
                             UBI Network是一个创新的DePIN平台，旨在通过整合闲置计算资源，为用户提供一种简单的"盒子挖矿"方式参与Web3生态。用户只需购买UBI的硬件盒子，连接网络电源，即可自动参与网络并获得代币奖励。
                           </p>
                           <div className="text-sm text-gray-400 space-y-1">
                             <p><strong className="text-white">核心特点：</strong>托管式挖矿、低门槛参与、多维度收益</p>
                             <p><strong className="text-white">适合人群：</strong>希望简单参与DePIN而不需要专业技术知识的普通用户</p>
                           </div>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">UBI盒子工作原理</h4>
                             <ol className="list-decimal pl-6 text-gray-300 space-y-1 text-sm">
                               <li>用户购买并激活UBI硬件盒子</li>
                               <li>盒子自动连接到UBI网络</li>
                               <li>根据网络需求，盒子自动参与各种计算任务</li>
                               <li>系统自动记录贡献并计算收益</li>
                               <li>定期将收益发放到用户钱包</li>
                             </ol>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">UBI代币经济模型</h4>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                               <li>总量有限，通过挖矿逐步释放</li>
                               <li>收益与盒子性能、在线时间相关</li>
                               <li>代币可用于支付网络服务或在交易所交易</li>
                               <li>持有代币可参与网络治理</li>
                             </ul>
                           </div>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-wifi text-green-400 mr-2"></i>
                           Helium网络详解
                         </h3>
                         
                         <div className="bg-gray-800 rounded-lg p-5 mb-6">
                           <div className="flex items-center mb-3">
                             <i className="fa-solid fa-globe text-blue-400 mr-2"></i>
                             <a href="https://helium.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://helium.com</a>
                           </div>
                           <p className="text-gray-300 mb-3">
                             Helium是DePIN领域的先驱项目，最初专注于构建去中心化的物联网（IoT）无线网络。用户通过部署Helium热点设备，提供网络覆盖，获得HNT代币奖励。后来，Helium扩展到5G网络和移动网络领域，成为多网络DePIN生态系统。
                           </p>
                           <div className="text-sm text-gray-400 space-y-1">
                             <p><strong className="text-white">核心价值：</strong>去中心化无线网络覆盖、低功耗物联网连接</p>
                             <p><strong className="text-white">技术特点：</strong>LoRaWAN技术、Proof of Coverage共识机制</p>
                           </div>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">Helium热点类型</h4>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                               <li><strong>全功能热点：</strong>提供网络覆盖和挖矿功能</li>
                               <li><strong>轻量级热点：</strong>成本更低，功能相对简化</li>
                               <li><strong>移动热点：</strong>支持5G网络覆盖</li>
                             </ul>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">Proof of Coverage机制</h4>
                             <ol className="list-decimal pl-6 text-gray-300 space-y-1 text-sm">
                               <li>热点通过发送测试信号验证彼此的覆盖范围</li>
                               <li>系统根据信号强度和距离计算覆盖效果</li>
                               <li>根据覆盖质量和范围发放HNT代币奖励</li>
                               <li>防止作弊机制确保网络的真实覆盖</li>
                             </ol>
                           </div>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                           如何开始参与DePIN？
                         </h3>
                         
                         <div className="bg-gray-800 rounded-lg p-5">
                           <ol className="list-decimal pl-6 text-gray-300 space-y-3">
                             <li>
                               <strong>选择适合的DePIN项目：</strong>
                               <p className="text-sm mt-1">根据个人兴趣、预算和技术能力选择合适的DePIN项目，研究其白皮书、团队背景和社区活跃度</p>
                             </li>
                             <li>
                               <strong>准备必要设备：</strong>
                               <p className="text-sm mt-1">根据项目要求购买或准备相应的硬件设备，注意设备的兼容性和性价比</p>
                             </li>
                             <li>
                               <strong>设置并连接设备：</strong>
                               <p className="text-sm mt-1">按照项目指南设置设备，连接网络和电源，确保设备正常运行</p>
                             </li>
                             <li>
                               <strong>创建并配置钱包：</strong>
                               <p className="text-sm mt-1">创建项目支持的加密货币钱包，用于接收和管理奖励代币</p>
                             </li>
                             <li>
                               <strong>激活设备并开始挖矿：</strong>
                               <p className="text-sm mt-1">通过项目的官方平台激活设备，开始参与网络并获取奖励</p>
                             </li>
                             <li>
                               <strong>监控和维护：</strong>
                               <p className="text-sm mt-1">定期检查设备运行状态，及时处理问题，确保持续获得奖励</p>
                             </li>
                             <li>
                               <strong>管理收益：</strong>
                               <p className="text-sm mt-1">根据市场情况决定是持有还是出售代币，考虑税收和风险因素</p>
                             </li>
                           </ol>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-shield-alt text-red-400 mr-2"></i>
                           DePIN参与的风险与注意事项
                         </h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">主要风险</h4>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                               <li><strong>设备成本风险：</strong>硬件投资可能无法通过奖励收回</li>
                               <li><strong>代币价格波动：</strong>奖励代币价格可能大幅下跌</li>
                               <li><strong>技术风险：</strong>设备故障、网络问题或项目技术缺陷</li>
                               <li><strong>监管风险：</strong>相关法律法规可能发生变化</li>
                               <li><strong>项目风险：</strong>项目可能失败或被淘汰</li>
                             </ul>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">注意事项</h4>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                               <li>分散投资，避免将所有资金投入单一项目</li>
                               <li>研究项目的经济模型和可持续性</li>
                               <li>注意设备的能耗和维护成本</li>
                               <li>选择信誉良好的设备供应商</li>
                               <li>定期备份钱包和重要数据</li>
                               <li>关注项目社区和官方更新</li>
                             </ul>
                           </div>
                         </div>
                       </div>
                       
                       <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                         <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                           <i className="fa-solid fa-rocket text-purple-400 mr-2"></i>
                           DePIN的未来发展趋势
                         </h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">技术趋势</h4>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                               <li>更高效的共识机制和激励模型</li>
                               <li>更低功耗、更智能的设备设计</li>
                               <li>跨链互操作性增强</li>
                               <li>AI与DePIN的结合</li>
                             </ul>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                             <h4 className="text-white font-medium mb-2">应用趋势</h4>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                               <li>5G和6G网络的去中心化部署</li>
                               <li>边缘计算的广泛应用</li>
                               <li>物联网设备的大规模连接</li>
                               <li>去中心化存储和CDN服务</li>
                             </ul>
                           </div>
                           <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 md:col-span-2">
                             <h4 className="text-white font-medium mb-2">市场趋势</h4>
                             <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                               <li>机构资本的持续流入</li>
                               <li>传统科技公司的参与度增加</li>
                               <li>监管框架的逐渐完善</li>
                               <li>与传统基建的融合发展</li>
                             </ul>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   )}
                     {/* 链上数据分析工具详细内容 */}
                      {module.id === 'module-12' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.15 }}
                          className="mb-12"
                        >
                          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <i className="fa-solid fa-bullhorn text-yellow-400 mr-2"></i>
                            流量合集：Web3内容传播与流量获取全解析
                          </h2>
                          
                          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                              为什么流量在Web3如此重要？
                            </h3>
                            <p className="text-gray-300 mb-4">
                              在竞争激烈的Web3生态中，即使拥有出色的产品和技术，如果没有有效的流量获取策略，也很难获得用户关注和社区增长。流量不仅意味着用户数量，更是项目价值和市场认可度的直接体现。掌握Web3特有的流量获取方法，将成为项目成功的关键因素。
                            </p>
                            
                            <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                              <p className="text-gray-300 italic font-medium">
                                一句话总结：<br/>
                                Web3流量 = 社区基础 + 项目曝光 + 市场信任 + 增长动力
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <i className="fa-solid fa-sitemap text-yellow-400 mr-2"></i>
                              Web3流量获取的核心路径
                            </h3>
                            
                            <div className="flex flex-col items-center space-y-4 mb-6">
                              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                                <p className="text-white">内容创作</p>
                              </div>
                              <i className="fa-solid fa-chevron-down text-gray-400"></i>
                              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                                <p className="text-white">平台分发</p>
                              </div>
                              <i className="fa-solid fa-chevron-down text-gray-400"></i>
                              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                                <p className="text-white">用户互动</p>
                              </div>
                              <i className="fa-solid fa-chevron-down text-gray-400"></i>
                              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                                <p className="text-white">社区转化</p>
                              </div>
                              <i className="fa-solid fa-chevron-down text-gray-400"></i>
                              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-4/5 text-center">
                                <p className="text-white">价值沉淀</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <i className="fa-solid fa-palette text-blue-400 mr-2"></i>
                              内容设计基础：从视觉到用户体验
                            </h3>
                            
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">1. 封面设计原则</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                    <li><strong>视觉冲击力：</strong>使用对比鲜明的颜色和清晰的主体元素，在信息流中脱颖而出</li>
                                    <li><strong>主题明确：</strong>通过图像和文字清晰传达内容主题，避免过于抽象的设计</li>
                                    <li><strong>品牌一致性：</strong>保持与项目品牌风格的统一，建立视觉识别度</li>
                                    <li><strong>排版清晰：</strong>确保文字易于阅读，合理使用字体大小和粗细</li>
                                    <li><strong>移动端适配：</strong>考虑不同设备上的显示效果，确保在小屏幕上也能清晰展示</li>
                                  </ul>
                                  <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                      实用技巧：
                                    </h5>
                                    <p className="text-gray-300 text-sm">
                                      使用Canva等工具的模板快速创建专业封面，注意添加项目Logo和相关标签，但不要过度拥挤。
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">2. 信息图表制作方法</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                    <li><strong>简化复杂概念：</strong>将区块链技术术语和复杂数据转化为易于理解的图表</li>
                                    <li><strong>色彩编码：</strong>使用一致的色彩系统区分不同类型的数据和概念</li>
                                    <li><strong>空间布局：</strong>合理安排元素位置，引导读者视线按照逻辑顺序流动</li>
                                    <li><strong>数据可视化：</strong>使用饼图、柱状图、折线图等图表类型直观展示数据</li>
                                    <li><strong>添加注释：</strong>在关键位置添加简洁的文字说明，帮助理解</li>
                                  </ul>
                                  <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-check-circle text-blue-400 mr-2"></i>
                                      推荐工具：
                                    </h5>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li>Canva：适合基础信息图表制作，模板丰富</li>
                                      <li>Piktochart：专业信息图表设计工具</li>
                                      <li>Infogram：数据可视化功能强大</li>
                                      <li>Tableau Public：高级数据分析和可视化</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">3. 推文卡片与社交媒体素材优化</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">推文卡片优化</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>最佳尺寸：1200×675像素，比例16:9</li>
                                        <li>文字清晰：避免过小的字体，确保在预览中可见</li>
                                        <li>CTA元素：添加简单明了的行动号召</li>
                                        <li>加载速度：优化图片大小，避免过大文件</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">社交媒体素材规范</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>Twitter：1200×675px，文字占比不超过20%</li>
                                        <li>Telegram：1280×720px，支持动图和视频</li>
                                        <li>Discord：1920×1080px，可使用横幅和图标组合</li>
                                        <li>微信/公众号：900×383px，封面图尺寸</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">4. Midjourney提示词设计技巧</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    使用AI工具生成加密相关图像可以极大提升内容制作效率，掌握提示词设计技巧是关键：
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">基础提示词结构</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>主体描述：加密货币、区块链、NFT等</li>
                                        <li>风格指定：赛博朋克、未来主义、极简等</li>
                                        <li>构图要求：远景、近景、特写等</li>
                                        <li>灯光效果：自然光、霓虹灯、暗色调等</li>
                                        <li>质量参数：超高细节、8K、高清等</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">实用提示词案例</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>"区块链技术可视化，蓝色数据流，未来科技感，高清8K"</li>
                                        <li>"赛博朋克风格加密货币插画，霓虹色彩，城市背景"</li>
                                        <li>"极简主义NFT艺术品展示，柔和色彩，干净背景"</li>
                                        <li>"加密钱包界面设计，UI元素，科技感，暗色调"</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                      高级技巧：
                                    </h5>
                                    <p className="text-gray-300 text-sm">
                                      使用PromptHub等平台学习优秀提示词，尝试使用"--ar 16:9"控制比例，"--v 5"使用最新模型版本。
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">5. 图文格式与排版优化</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                    <li><strong>字体选择：</strong>使用易读的无衬线字体，正文和标题使用不同字重区分</li>
                                    <li><strong>段落间距：</strong>保持适当的行间距和段落间距，提高可读性</li>
                                    <li><strong>色彩对比：</strong>确保文字与背景有足够的对比度，遵循WCAG标准</li>
                                    <li><strong>重点突出：</strong>使用粗体、颜色或背景色突出重要信息</li>
                                    <li><strong>结构清晰：</strong>使用标题、小标题和列表组织内容，便于快速浏览</li>
                                  </ul>
                                  <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-check-circle text-blue-400 mr-2"></i>
                                      加密内容排版要点：
                                    </h5>
                                    <p className="text-gray-300 text-sm">
                                      加密内容通常包含大量专业术语，排版时应特别注意术语解释、概念分隔和关键信息突出，帮助读者更好地理解复杂内容。
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <i className="fa-solid fa-globe text-purple-400 mr-2"></i>
                              社交媒体平台机制研究
                            </h3>
                            
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">1. X (Twitter) 推文推荐机制</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    X (原Twitter) 的算法推荐系统基于多个因素决定内容的可见度：
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">关键影响因素</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>互动率：</strong>点赞、转发、评论、引用的数量和速度</li>
                                        <li><strong>内容质量：</strong>原创性、信息价值、媒体丰富度</li>
                                        <li><strong>用户关系：</strong>关注者与发布者的互动频率</li>
                                        <li><strong>时效性：</strong>内容的新鲜程度，热门话题参与</li>
                                        <li><strong>账号权重：</strong>账号活跃度、历史表现、认证状态</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">优化策略</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>在黄金时段发布（工作日9-11点，15-17点）</li>
                                        <li>使用2-3个相关标签，避免过多</li>
                                        <li>添加高质量图片或短视频</li>
                                        <li>鼓励互动，提出问题或征求意见</li>
                                        <li>参与热门话题和趋势标签</li>
                                        <li>保持一致的发布频率</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">2. Telegram限流与内容传播</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    Telegram对垃圾信息和过度营销有严格限制，了解其限流机制有助于更有效地传播内容：
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">限流原因与表现</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>短时间内发送过多消息</li>
                                        <li>向多个群组发送相同内容</li>
                                        <li>大量添加好友或邀请成员</li>
                                        <li>账号新注册或活跃度低</li>
                                        <li>表现：消息延迟、无法发送、账号限制</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">解决与预防策略</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>避免短时间内发送大量相同内容</li>
                                        <li>使用多个账号分散发布</li>
                                        <li>逐步增加活动量，培养账号权重</li>
                                        <li>使用官方机器人API进行自动化操作</li>
                                        <li>创建优质内容，获得自然传播</li>
                                        <li>建立群组层级，从私有到公开逐步推广</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">3. 小红书与抖音平台的加密内容发布</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">小红书限流规则与应对</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>关键词限制：</strong>避免使用敏感词汇如"比特币""投资""暴富"</li>
                                        <li><strong>内容规范：</strong>保持积极导向，避免过度营销</li>
                                        <li><strong>平台生态：</strong>理解社区文化，创作符合平台调性的内容</li>
                                        <li><strong>优化策略：</strong>使用替代词汇、多使用图片、增加互动元素</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">抖音标签与算法优化</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>标签策略：</strong>使用1-2个主标签+3-5个相关标签</li>
                                        <li><strong>完播率：</strong>前3秒吸引注意力，保持视频节奏紧凑</li>
                                        <li><strong>互动指标：</strong>引导点赞、评论、收藏和分享</li>
                                        <li><strong>内容质量：</strong>高清画面、清晰音质、有价值的内容</li>
                                        <li><strong>垂直领域：</strong>专注特定加密细分领域，建立专业形象</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-exclamation-triangle text-yellow-400 mr-2"></i>
                                      重要提示：
                                    </h5>
                                    <p className="text-gray-300 text-sm">
                                      在中国内地，加密货币相关内容受到严格监管，发布时应特别注意合规性，避免涉及敏感话题和违法内容。建议以区块链技术科普和教育为主要方向。
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">4. 跨平台内容适配策略</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    同一内容在不同平台发布时，需要根据平台特性进行适当调整，以获得最佳效果：
                                  </p>
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                      <thead>
                                        <tr className="border-b border-gray-800">
                                          <th className="px-4 py-3 text-left text-gray-400 font-medium">平台</th>
                                          <th className="px-4 py-3 text-left text-gray-400 font-medium">内容特点</th>
                                          <th className="px-4 py-3 text-left text-gray-400 font-medium">最佳实践</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="border-b border-gray-800">
                                          <td className="px-4 py-3 text-white font-medium">X (Twitter)</td>
                                          <td className="px-4 py-3 text-gray-300">短平快、实时性强、互动频繁</td>
                                          <td className="px-4 py-3 text-gray-300">简洁标题、1-2张图片、相关标签</td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                          <td className="px-4 py-3 text-white font-medium">Telegram</td>
                                          <td className="px-4 py-3 text-gray-300">社群深度交流、信息聚合</td>
                                          <td className="px-4 py-3 text-gray-300">详细解释、图文并茂、互动引导</td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                          <td className="px-4 py-3 text-white font-medium">小红书</td>
                                          <td className="px-4 py-3 text-gray-300">视觉导向、种草属性、用户分享</td>
                                          <td className="px-4 py-3 text-gray-300">高质量图片、个人体验、教程性质</td>
                                        </tr>
                                        <tr>
                                          <td className="px-4 py-3 text-white font-medium">抖音</td>
                                          <td className="px-4 py-3 text-gray-300">短视频为主、算法推荐、娱乐属性强</td>
                                          <td className="px-4 py-3 text-gray-300">前3秒抓眼球、口语化表达、标签优化</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <i className="fa-solid fa-pencil-alt text-green-400 mr-2"></i>
                              文案撰写与传播技巧
                            </h3>
                            
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">1. 币圈内容的语言风格</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    币圈内容有其独特的语言风格和表达方式，了解这些特点有助于更好地与目标受众沟通：
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">常用语汇与表达</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>使用社区常用术语，但注意解释专业概念</li>
                                        <li>简洁明了的标题，突出核心价值</li>
                                        <li>使用数据和案例增强说服力</li>
                                        <li>融入社区文化元素，如"BTC突破XX美元""WAGMI"</li>
                                        <li>避免过度夸张和虚假承诺</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">不同类型内容的语言风格</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>教程类：</strong>清晰、步骤化、实用</li>
                                        <li><strong>分析类：</strong>客观、数据驱动、逻辑性强</li>
                                        <li><strong>新闻类：</strong>及时、准确、重点突出</li>
                                        <li><strong>推广类：</strong>突出价值、呼吁行动、建立信任</li>
                                        <li><strong>社区类：</strong>亲和、互动性强、鼓励参与</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">2. 标题与开头的吸引力设计</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    好的标题和开头是吸引读者继续阅读的关键，以下是一些实用技巧：
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">标题设计技巧</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>提出问题：</strong>"如何在熊市中保护你的加密资产？"</li>
                                        <li><strong>数据吸引：</strong>"这10个NFT项目回报率超过1000%"</li>
                                        <li><strong>提供价值：</strong>"3分钟学会使用DeFi赚取被动收入"</li>
                                        <li><strong>制造悬念：</strong>"这个鲜为人知的Layer2项目可能改变一切"</li>
                                        <li><strong>热点结合：</strong>"以太坊合并后，这些变化你必须知道"</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">开头吸引策略</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>直接痛点：</strong>"你是否也在为高Gas费而烦恼？"</li>
                                        <li><strong>故事引入：</strong>"去年这个时候，我用1000美元买了这些币..."</li>
                                        <li><strong>惊人事实：</strong>"超过60%的加密投资者没有正确使用钱包安全功能"</li>
                                        <li><strong>解决方案：</strong>"今天我将分享一个简单策略，帮你安全参与空投"</li>
                                        <li><strong>互动提问：</strong>"你更看好Layer1还是Layer2的未来发展？"</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">3. 呼吁行动（CTA）的有效设计</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    每个内容都应有明确的目标和行动号召，以下是设计有效CTA的方法：
                                  </p>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                    <li><strong>明确性：</strong>清晰告诉读者你希望他们做什么，避免模糊表达</li>
                                    <li><strong>紧迫感：</strong>使用时间限制或稀缺性创造行动动力，如"限时优惠"或"名额有限"</li>
                                    <li><strong>价值匹配：</strong>确保CTA与内容提供的价值一致，避免误导</li>
                                    <li><strong>简化流程：</strong>减少用户采取行动的步骤，提供直接链接或按钮</li>
                                    <li><strong>视觉突出：</strong>使用颜色、大小或位置突出CTA元素</li>
                                  </ul>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                      <h5 className="text-white font-medium mb-2">有效CTA示例</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>"点击链接加入我们的Telegram社区获取最新空投信息"</li>
                                        <li>"关注@CryptoInsights获取每日市场分析"</li>
                                        <li>"分享这篇文章给3个朋友，截图发送至后台参与抽奖"</li>
                                        <li>"使用我的推荐码注册，双方均可获得10%交易手续费折扣"</li>
                                      </ul>
                                    </div>
                                    <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                                      <h5 className="text-white font-medium mb-2">避免的CTA错误</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>多个不相关的CTA分散注意力</li>
                                        <li>使用强硬或命令式语气</li>
                                        <li>承诺不切实际的结果</li>
                                        <li>隐藏重要条件或费用</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">4. 故事化内容创作</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    故事是最有力的沟通工具之一，在加密内容中融入故事元素可以显著提高吸引力和记忆度：
                                  </p>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                    <li><strong>个人经历：</strong>分享你在加密世界的真实故事和教训</li>
                                    <li><strong>项目背后：</strong>挖掘区块链项目的创立背景和愿景</li>
                                    <li><strong>社区案例：</strong>讲述社区成员的成功故事或挑战</li>
                                    <li><strong>技术演进：</strong>将复杂的技术发展历程转化为叙事</li>
                                    <li><strong>对比故事：</strong>通过过去与现在的对比展示行业进步</li>
                                  </ul>
                                  <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                      故事结构建议：
                                    </h5>
                                    <p className="text-gray-300 text-sm">
                                      设置背景 → 引入冲突/挑战 → 探索解决方案 → 展示结果 → 分享启示或教训
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <i className="fa-solid fa-chart-line text-purple-400 mr-2"></i>
                              数据分析与优化
                            </h3>
                            
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">1. 关键数据指标追踪</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    跟踪和分析关键数据指标是优化内容策略的基础，以下是需要关注的核心指标：
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">内容表现指标</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>曝光量：</strong>内容被展示的次数</li>
                                        <li><strong>点击率：</strong>点击量/曝光量，反映标题和封面吸引力</li>
                                        <li><strong>阅读量/观看量：</strong>实际消费内容的用户数量</li>
                                        <li><strong>互动率：</strong>(点赞+评论+分享)/阅读量，衡量内容质量</li>
                                        <li><strong>完读率/完播率：</strong>衡量内容吸引力和节奏</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">用户行为指标</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>新增关注：</strong>内容带来的新粉丝数量</li>
                                        <li><strong>转化率：</strong>采取目标行动的用户比例</li>
                                        <li><strong>分享率：</strong>内容被分享的比例</li>
                                        <li><strong>停留时长：</strong>用户在内容上花费的时间</li>
                                        <li><strong>跳出率：</strong>浏览一页后离开的比例</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">2. 数据分析工具与方法</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    利用专业工具和科学方法分析数据，可以更准确地了解内容表现和用户需求：
                                  </p>
                                  <div className="overflow-x-auto mb-4">
                                    <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
                                      <thead>
                                        <tr className="border-b border-gray-800">
                                          <th className="px-4 py-3 text-left text-gray-400 font-medium">平台</th>
                                          <th className="px-4 py-3 text-left text-gray-400 font-medium">内置分析工具</th>
                                          <th className="px-4 py-3 text-left text-gray-400 font-medium">第三方工具</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="border-b border-gray-800">
                                          <td className="px-4 py-3 text-white font-medium">X (Twitter)</td>
                                          <td className="px-4 py-3 text-gray-300">Twitter Analytics</td>
                                          <td className="px-4 py-3 text-gray-300">Hootsuite, Buffer, Sprout Social</td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                          <td className="px-4 py-3 text-white font-medium">Telegram</td>
                                          <td className="px-4 py-3 text-gray-300">群组统计功能</td>
                                          <td className="px-4 py-3 text-gray-300">Telemetrio, BotAnalytics</td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                          <td className="px-4 py-3 text-white font-medium">小红书</td>
                                          <td className="px-4 py-3 text-gray-300">创作者中心</td>
                                          <td className="px-4 py-3 text-gray-300">新抖, 灰豚数据</td>
                                        </tr>
                                        <tr>
                                          <td className="px-4 py-3 text-white font-medium">抖音</td>
                                          <td className="px-4 py-3 text-gray-300">抖音创作者服务中心</td>
                                          <td className="px-4 py-3 text-gray-300">新抖, 飞瓜数据</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-check-circle text-blue-400 mr-2"></i>
                                      数据分析方法：
                                    </h5>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li>对比分析：比较不同时间段或不同内容的表现</li>
                                      <li>细分分析：按受众、地域、设备等维度细分数据</li>
                                      <li>趋势分析：识别长期数据变化趋势</li>
                                      <li>A/B测试：对比不同版本内容的效果</li>
                                      <li>漏斗分析：追踪用户从接触到转化的完整路径</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">3. 基于数据的内容优化策略</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    数据分析的最终目的是优化内容策略，提高传播效果，以下是基于数据的优化方法：
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">内容形式优化</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>根据表现数据调整内容类型（图文、视频、直播等）</li>
                                        <li>优化内容长度，找到最佳平衡点</li>
                                        <li>调整视觉元素，提高点击率和互动率</li>
                                        <li>根据完读率优化内容节奏和结构</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">发布策略优化</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>根据受众活跃时间调整发布时间</li>
                                        <li>优化发布频率，避免过度或不足</li>
                                        <li>调整标签策略，提高内容可见度</li>
                                        <li>优化跨平台发布策略，提高整体效果</li>
                                      </ul>
                                    </div>
                                    <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 md:col-span-2">
                                      <h5 className="text-white font-medium mb-2 flex items-center">
                                        <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                        优化循环流程：
                                      </h5>
                                      <p className="text-gray-300 text-sm">
                                        数据收集 → 分析洞察 → 策略调整 → 内容优化 → 效果测试 → 数据收集
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <i className="fa-solid fa-rocket text-orange-400 mr-2"></i>
                              流量增长高级策略
                            </h3>
                            
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">1. 杠杆KOL与社区影响者</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    与KOL和社区影响者合作是快速扩大内容影响力的有效方法：
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">KOL合作策略</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>类型匹配：</strong>选择与项目定位和目标受众匹配的KOL</li>
                                        <li><strong>多层次合作：</strong>从微型KOL到头部KOL形成合作矩阵</li>
                                        <li><strong>价值交换：</strong>提供独家内容、早期访问、奖励等激励</li>
                                        <li><strong>长期关系：</strong>建立持续合作，而非一次性推广</li>
                                        <li><strong>内容共创：</strong>让KOL参与内容创作，保持真实性</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">社区影响者识别与培养</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li>在社区中识别活跃用户和意见领袖</li>
                                        <li>提供特殊权限和早期参与机会</li>
                                        <li>建立专属沟通渠道和反馈机制</li>
                                        <li>提供素材和支持，帮助他们创作内容</li>
                                        <li>公开认可和奖励他们的贡献</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">2. 内容矩阵与主题系列</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    构建内容矩阵和主题系列可以提高内容的系统性和连贯性，增强用户粘性：
                                  </p>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                    <li><strong>主题系列：</strong>围绕特定主题创建连续内容，如"每周空投解析""DeFi基础教程"等</li>
                                    <li><strong>内容形式矩阵：</strong>同一主题通过不同形式呈现（图文、视频、直播、问答等）</li>
                                    <li><strong>难度梯度：</strong>从入门到进阶的内容体系，满足不同用户需求</li>
                                    <li><strong>系列标识：</strong>统一的视觉标识和命名方式，增强识别度</li>
                                    <li><strong>互动引导：</strong>在内容结尾预告下一期，鼓励持续关注</li>
                                  </ul>
                                  <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-check-circle text-blue-400 mr-2"></i>
                                      案例参考：
                                    </h5>
                                    <p className="text-gray-300 text-sm">
                                      "30天DeFi入门挑战"系列：每天发布一个简单易懂的DeFi概念讲解，结合实际操作指导，吸引了大量新手用户关注和参与。
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">3. 互动活动与裂变营销</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    设计互动活动和裂变机制可以有效激发用户参与和分享，扩大内容覆盖面：
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="text-white font-medium mb-2">互动活动类型</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>问答活动：</strong>知识问答赢取奖励，提高参与度</li>
                                        <li><strong>内容创作比赛：</strong>鼓励用户创作相关内容，评选优秀作品</li>
                                        <li><strong>投票评选：</strong>发起话题投票，增加互动和讨论</li>
                                        <li><strong>挑战活动：</strong>如"7天完成7个DeFi交互任务"</li>
                                        <li><strong>直播互动：</strong>通过直播问答、抽奖等形式增强互动</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-white font-medium mb-2">裂变营销设计</h5>
                                      <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                        <li><strong>邀请机制：</strong>邀请好友获得奖励，多级分销结构</li>
                                        <li><strong>分享激励：</strong>分享内容获得积分或抽奖机会</li>
                                        <li><strong>专属福利：</strong>创建专属链接，追踪推荐效果</li>
                                        <li><strong>社交证明：</strong>展示成功邀请案例，激发参与</li>
                                        <li><strong>限时机制：</strong>设定时间限制，增加紧迫感</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-exclamation-triangle text-yellow-400 mr-2"></i>
                                      合规提示：
                                    </h5>
                                    <p className="text-gray-300 text-sm">
                                      设计裂变营销时，应注意遵守相关法律法规，避免涉及传销等违法行为。确保激励机制透明、合理，不误导用户。
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium text-white mb-3">4. 媒体合作与PR策略</h4>
                                <div className="bg-gray-800 rounded-lg p-5">
                                  <p className="text-gray-300 mb-3">
                                    与媒体建立良好合作关系，制定专业的PR策略，可以获得更广泛的曝光和更权威的背书：
                                  </p>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                    <li><strong>媒体库建设：</strong>建立包含各类区块链媒体、科技媒体的联系方式库</li>
                                    <li><strong>新闻稿撰写：</strong>专业、客观的新闻稿，突出项目价值和亮点</li>
                                    <li><strong>媒体专访：</strong>安排项目核心成员接受媒体专访，传递深度观点</li>
                                    <li><strong>行业报告：</strong>参与或发布行业研究报告，建立专业形象</li>
                                    <li><strong>活动合作：</strong>赞助或参与行业会议、线上活动，增加曝光</li>
                                    <li><strong>危机公关：</strong>制定危机应对预案，及时处理负面信息</li>
                                  </ul>
                                  <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                                    <h5 className="text-white font-medium mb-2 flex items-center">
                                      <i className="fa-solid fa-check-circle text-blue-400 mr-2"></i>
                                      媒体分类与合作重点：
                                    </h5>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li><strong>头部媒体：</strong>重点合作，获取品牌曝光和权威背书</li>
                                      <li><strong>垂直媒体：</strong>深度合作，触达精准目标用户</li>
                                      <li><strong>社区媒体：</strong>持续互动，保持社区热度</li>
                                      <li><strong>海外媒体：</strong>选择性合作，拓展国际影响力</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <i className="fa-solid fa-toolbox text-blue-400 mr-2"></i>
                              实用工具与资源推荐
                            </h3>
                            
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h4 className="text-white font-medium mb-2 flex items-center">
                                    <i className="fa-solid fa-palette text-pink-400 mr-2"></i>
                                    设计工具
                                  </h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li><strong>Canva：</strong>简单易用的在线设计平台</li>
                                    <li><strong>PicMonkey：</strong>强大的图片编辑和设计工具</li>
                                    <li><strong>Stencil：</strong>社交媒体图片快速制作工具</li>
                                    <li><strong>Visme：</strong>专业信息图表和演示文稿工具</li>
                                  </ul>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h4 className="text-white font-medium mb-2 flex items-center">
                                    <i className="fa-solid fa-robot text-purple-400 mr-2"></i>
                                    AI内容创作工具
                                  </h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li><strong>ChatGPT：</strong>文案撰写和内容生成</li>
                                    <li><strong>Midjourney：</strong>AI图像生成工具</li>
                                    <li><strong>DALL-E 2：</strong>文本到图像生成模型</li>
                                    <li><strong>Copy.ai：</strong>专业AI文案写作工具</li>
                                  </ul>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h4 className="text-white font-medium mb-2 flex items-center">
                                    <i className="fa-solid fa-chart-bar text-green-400 mr-2"></i>
                                    数据分析工具
                                  </h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li><strong>Google Analytics：</strong>网站流量和用户行为分析</li>
                                    <li><strong>Social Blade：</strong>社交媒体数据分析</li>
                                    <li><strong>Hotjar：</strong>用户行为热图和转化分析</li>
                                    <li><strong>Bitly：</strong>链接跟踪和点击数据分析</li>
                                  </ul>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h4 className="text-white font-medium mb-2 flex items-center">
                                    <i className="fa-solid fa-bullhorn text-yellow-400 mr-2"></i>
                                    社交媒体管理工具
                                  </h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li><strong>Hootsuite：</strong>多平台社交媒体管理</li>
                                    <li><strong>Buffer：</strong>内容调度和分析工具</li>
                                    <li><strong>Sprout Social：</strong>社交媒体营销和分析平台</li>
                                    <li><strong>Later：</strong>视觉内容规划和发布工具</li>
                                  </ul>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h4 className="text-white font-medium mb-2 flex items-center">
                                    <i className="fa-solid fa-link text-blue-400 mr-2"></i>
                                    链接管理工具
                                  </h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li><strong>Bitly：</strong>链接缩短和跟踪</li>
                                    <li><strong>Linktree：</strong>聚合多个链接的着陆页</li>
                                    <li><strong>ClickMeter：</strong>链接跟踪和转化率优化</li>
                                    <li><strong>Rebrandly：</strong>品牌链接定制和管理</li>
                                  </ul>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                  <h4 className="text-white font-medium mb-2 flex items-center">
                                    <i className="fa-solid fa-users text-indigo-400 mr-2"></i>
                                    社区管理工具
                                  </h4>
                                  <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                    <li><strong>Discord Bot：</strong>Discord社区自动化管理</li>
                                    <li><strong>Telegram Bot：</strong>Telegram群组管理机器人</li>
                                    <li><strong>Discourse：</strong>专业社区论坛平台</li>
                                    <li><strong>Zapier：</strong>自动化工作流和集成工具</li>
                                  </ul>
                                </div>
                              </div>
                              
                              <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-6">
                                <h4 className="text-white font-medium mb-3 flex items-center">
                                  <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                  资源获取渠道
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h5 className="text-white font-medium mb-2">学习资源</h5>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li>Canva Design School：设计基础和技巧</li>
                                      <li>Google Analytics Academy：数据分析课程</li>
                                      <li>HubSpot Academy：内容营销和SEO课程</li>
                                      <li>Copyblogger：文案写作和内容创作指导</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="text-white font-medium mb-2">素材资源</h5>
                                    <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                      <li>Unsplash：高质量免费图片素材</li>
                                      <li>Pexels：免费库存照片和视频</li>
                                      <li>Freepik：免费矢量图和设计素材</li>
                                      <li>GIPHY：动画GIF素材库</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                              <i className="fa-solid fa-calendar-alt text-green-400 mr-2"></i>
                              内容规划与执行流程
                            </h3>
                            
                            <div className="bg-gray-800 rounded-lg p-5">
                              <p className="text-gray-300 mb-4">
                                建立系统化的内容规划和执行流程，可以确保内容策略的有效实施和持续优化：
                              </p>
                              <div className="space-y-4">
                                <div className="flex">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-blue-400 text-sm font-medium">1</span>
                                  </div>
                                  <div>
                                    <h5 className="text-white font-medium mb-1">目标设定与受众分析</h5>
                                    <p className="text-gray-300 text-sm">明确内容目标，分析目标受众需求和偏好，制定内容策略</p>
                                  </div>
                                </div>
                                
                                <div className="flex">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-blue-400 text-sm font-medium">2</span>
                                  </div>
                                  <div>
                                    <h5 className="text-white font-medium mb-1">内容主题与形式规划</h5>
                                    <p className="text-gray-300 text-sm">确定内容主题、形式和发布频率，创建内容日历</p>
                                  </div>
                                </div>
                                
                                <div className="flex">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-blue-400 text-sm font-medium">3</span>
                                  </div>
                                  <div>
                                    <h5 className="text-white font-medium mb-1">内容创作与制作</h5>
                                    <p className="text-gray-300 text-sm">组织团队或个人创作内容，确保质量和一致性</p>
                                  </div>
                                </div>
                                
                                <div className="flex">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-blue-400 text-sm font-medium">4</span>
                                  </div>
                                  <div>
                                    <h5 className="text-white font-medium mb-1">多平台分发与优化</h5>
                                    <p className="text-gray-300 text-sm">根据平台特性适配内容，选择最佳发布时间和标签</p>
                                  </div>
                                </div>
                                
                                <div className="flex">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-blue-400 text-sm font-medium">5</span>
                                  </div>
                                  <div>
                                    <h5 className="text-white font-medium mb-1">数据收集与分析</h5>
                                    <p className="text-gray-300 text-sm">跟踪内容表现数据，分析用户反馈和互动情况</p>
                                  </div>
                                </div>
                                
                                <div className="flex">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-blue-400 text-sm font-medium">6</span>
                                  </div>
                                  <div>
                                    <h5 className="text-white font-medium mb-1">策略优化与迭代</h5>
                                    <p className="text-gray-300 text-sm">基于数据洞察优化内容策略，持续改进内容质量和效果</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4 mt-4">
                                <h5 className="text-white font-medium mb-2 flex items-center">
                                  <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                                  执行提示：
                                </h5>
                                <p className="text-gray-300 text-sm">
                                  使用项目管理工具（如Trello、Asana）跟踪内容进度，建立团队协作流程，定期召开内容评审会议，确保内容策略的有效执行和持续优化。
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {module.id === 'module-9' && (
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5, delay: 0.15 }}
                         className="mb-12"
                       >
                         <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                           <i className="fa-solid fa-chart-line text-blue-400 mr-2"></i>
                           链上数据分析工具详解
                         </h2>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                             什么是链上数据分析？
                           </h3>
                           <p className="text-gray-300 mb-4">
                             链上数据分析是通过分析区块链上的交易记录、智能合约交互和钱包地址活动等公开数据，来理解加密货币市场动态、项目表现和用户行为的过程。区块链的透明性使得这些数据对所有人开放，通过专业工具可以将这些原始数据转化为有价值的投资洞见。
                           </p>
                           
                           <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4 mt-4">
                             <p className="text-gray-300 italic font-medium">
                               一句话总结：<br/>
                               链上数据分析 = 加密市场的"监控雷达" + "决策支持系统"
                             </p>
                           </div>
                         </div>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-sitemap text-yellow-400 mr-2"></i>
                             链上数据分析的核心价值
                           </h3>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                               <h4 className="text-white font-medium mb-2">投资决策支持</h4>
                               <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                 <li>发现早期投资机会</li>
                                 <li>验证项目基本面和人气</li>
                                 <li>识别市场趋势和转折点</li>
                                 <li>评估项目风险和潜力</li>
                               </ul>
                             </div>
                             <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                               <h4 className="text-white font-medium mb-2">市场监控与预警</h4>
                               <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                 <li>追踪资金流向和大额交易</li>
                                 <li>监控鲸鱼钱包活动</li>
                                 <li>识别异常市场行为</li>
                                 <li>预测市场情绪变化</li>
                               </ul>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-database text-blue-400 mr-2"></i>
                             Dune Analytics详解
                           </h3>
                           
                           <div className="space-y-6">
                             <div>
                               <h4 className="text-lg font-medium text-white mb-3">平台概述</h4>
                               <div className="bg-gray-800 rounded-lg p-5">
                                 <div className="flex items-center mb-3">
                                   <i className="fa-solid fa-globe text-blue-400 mr-2"></i>
                                   <a href="https://dune.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://dune.com</a>
                                 </div>
                                 <p className="text-gray-300 mb-3">
                                   Dune Analytics是最流行的链上数据可视化平台，允许用户通过SQL查询语言分析区块链数据并创建自定义仪表盘。它支持以太坊、BSC、Polygon、Avalanche等多条主流区块链，拥有庞大的社区贡献的数据分析模板。
                                 </p>
                                 <div className="text-sm text-gray-400 space-y-1">
                                   <p><strong className="text-white">核心功能：</strong>自定义SQL查询、数据可视化、社区共享仪表盘</p>
                                   <p><strong className="text-white">适合人群：</strong>投资者、分析师、开发者、研究人员</p>
                                 </div>
                               </div>
                             </div>
                             
                             <div>
                               <h4 className="text-lg font-medium text-white mb-3">基本使用流程</h4>
                               <div className="bg-gray-800 rounded-lg p-5">
                                 <ol className="list-decimal pl-6 text-gray-300 space-y-3">
                                   <li>
                                     <strong>注册账号：</strong>
                                     <p className="text-sm mt-1">访问Dune官网注册账号，免费用户有查询次数限制</p>
                                   </li>
                                   <li>
                                     <strong>浏览现有仪表盘：</strong>
                                     <p className="text-sm mt-1">在"Explore"页面浏览热门和推荐的仪表盘，学习他人的分析思路</p>
                                   </li>
                                   <li>
                                     <strong>创建新查询：</strong>
                                     <p className="text-sm mt-1">点击"New Query"开始编写SQL查询语句</p>
                                   </li>
                                   <li>
                                     <strong>运行查询并可视化：</strong>
                                     <p className="text-sm mt-1">运行查询后，使用图表工具将结果可视化</p>
                                   </li>
                                   <li>
                                     <strong>保存和分享：</strong>
                                     <p className="text-sm mt-1">保存查询和仪表盘，并可以选择公开分享给社区</p>
                                   </li>
                                 </ol>
                               </div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">常用查询示例</h4>
                                 <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                   <li>查询特定代币的每日交易量</li>
                                   <li>分析某DEX的总交易量和用户增长</li>
                                   <li>追踪某NFT系列的销售数据和持有分布</li>
                                   <li>监控智能合约的调用情况和Gas使用</li>
                                 </ul>
                               </div>
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">实用技巧</h4>
                                 <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                   <li>利用模板快速创建自己的分析</li>
                                   <li>使用参数化查询实现交互式分析</li>
                                   <li>关注热门分析师，学习专业分析方法</li>
                                   <li>利用Dune API将数据集成到其他系统</li>
                                 </ul>
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-landmark text-green-400 mr-2"></i>
                             DeFiLlama详解
                           </h3>
                           
                           <div className="space-y-6">
                             <div>
                               <h4 className="text-lg font-medium text-white mb-3">平台概述</h4>
                               <div className="bg-gray-800 rounded-lg p-5">
                                 <div className="flex items-center mb-3">
                                   <i className="fa-solid fa-globe text-blue-400 mr-2"></i>
                                   <a href="https://defillama.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://defillama.com</a>
                                 </div>
                                 <p className="text-gray-300 mb-3">
                                   DeFiLlama是领先的DeFi数据聚合平台，专注于追踪DeFi协议的总锁仓价值(TVL)、交易量、收益率等核心指标。它支持超过100条区块链和数千个DeFi协议，提供全面的市场概览和深入的协议分析。
                                 </p>
                                 <div className="text-sm text-gray-400 space-y-1">
                                   <p><strong className="text-white">核心功能：</strong>TVL追踪、收益率比较、协议排名、链上数据分析</p>
                                   <p><strong className="text-white">适合人群：</strong>DeFi投资者、流动性提供者、协议开发者</p>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">主要数据指标</h4>
                                 <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                   <li><strong>TVL (总锁仓价值)：</strong>协议中锁定的加密资产总价值</li>
                                   <li><strong>Volume (交易量)：</strong>一定时期内的总交易金额</li>
                                   <li><strong>APY (年化收益率)：</strong>提供流动性或质押资产的年化收益</li>
                                   <li><strong>Fees (手续费)：</strong>协议产生的手续费收入</li>
                                   <li><strong>Market Cap (市值)：</strong>协议治理代币的总市值</li>
                                 </ul>
                               </div>
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">使用方法</h4>
                                 <ol className="list-decimal pl-6 text-gray-300 space-y-2 text-sm">
                                   <li>在首页查看不同链和协议的TVL排名</li>
                                   <li>点击具体协议查看详细数据和历史趋势</li>
                                   <li>使用"Compare"功能对比多个协议的表现</li>
                                   <li>利用"Yields"页面发现高收益机会</li>
                                   <li>关注"News"栏目获取最新DeFi动态</li>
                                 </ol>
                               </div>
                             </div>
                             
                             <div>
                               <h4 className="text-lg font-medium text-white mb-3">高级功能</h4>
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                 <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                   <h5 className="text-white font-medium mb-2">Protocol API</h5>
                                   <p className="text-gray-400 text-sm">通过API获取实时和历史数据，集成到自己的系统</p>
                                 </div>
                                 <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                   <h5 className="text-white font-medium mb-2">Governance</h5>
                                   <p className="text-gray-400 text-sm">追踪DeFi协议的治理提案和投票情况</p>
                                 </div>
                                 <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                   <h5 className="text-white font-medium mb-2">Bridge Tracking</h5>
                                   <p className="text-gray-400 text-sm">监控跨链桥的资金流动和安全状况</p>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-pie-chart text-purple-400 mr-2"></i>
                             Zapper详解
                           </h3>
                           
                           <div className="space-y-6">
                             <div>
                               <h4 className="text-lg font-medium text-white mb-3">平台概述</h4>
                               <div className="bg-gray-800 rounded-lg p-5">
                                 <div className="flex items-center mb-3">
                                   <i className="fa-solid fa-globe text-blue-400 mr-2"></i>
                                   <a href="https://zapper.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://zapper.xyz</a>
                                 </div>
                                 <p className="text-gray-300 mb-3">
                                   Zapper是一款多链资产管理和可视化工具，允许用户在一个界面中查看和管理分布在不同链上的所有资产。它支持以太坊、BSC、Polygon等20多条链，提供投资组合分析、收益追踪和DeFi协议交互等功能。
                                 </p>
                                 <div className="text-sm text-gray-400 space-y-1">
                                   <p><strong className="text-white">核心功能：</strong>投资组合追踪、收益分析、多链资产管理、DeFi协议交互</p>
                                   <p><strong className="text-white">适合人群：</strong>拥有多链资产的投资者、DeFi用户、 yield farmer</p>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">使用方法</h4>
                                 <ol className="list-decimal pl-6 text-gray-300 space-y-2 text-sm">
                                   <li>连接钱包（MetaMask、WalletConnect等）</li>
                                   <li>在仪表盘查看所有链上资产的汇总视图</li>
                                   <li>点击具体资产查看详细信息和历史表现</li>
                                   <li>使用"Yield"功能发现收益机会</li>
                                   <li>通过Zapper直接与支持的DeFi协议交互</li>
                                 </ol>
                               </div>
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">高级功能</h4>
                                 <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                   <li><strong>投资组合分析：</strong>资产分配、历史表现、收益计算</li>
                                   <li><strong>收益聚合：</strong>追踪所有DeFi活动的收益情况</li>
                                   <li><strong>Gas优化：</strong>提供交易Gas费优化建议</li>
                                   <li><strong>协议比较：</strong>比较不同协议的收益率和风险</li>
                                   <li><strong>定制告警：</strong>设置价格变动和收益变化的告警</li>
                                 </ul>
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-search text-orange-400 mr-2"></i>
                             Nansen详解
                           </h3>
                           
                           <div className="space-y-6">
                             <div>
                               <h4 className="text-lg font-medium text-white mb-3">平台概述</h4>
                               <div className="bg-gray-800 rounded-lg p-5">
                                 <div className="flex items-center mb-3">
                                   <i className="fa-solid fa-globe text-blue-400 mr-2"></i>
                                   <a href="https://nansen.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://nansen.ai</a>
                                 </div>
                                 <p className="text-gray-300 mb-3">
                                   Nansen是一款高级链上数据分析平台，专注于钱包地址分析和资金追踪。它通过标签系统识别鲸鱼地址、机构投资者和项目团队钱包，帮助用户洞察市场动向和资金流向。
                                 </p>
                                 <div className="text-sm text-gray-400 space-y-1">
                                   <p><strong className="text-white">核心功能：</strong>钱包地址标签、资金流向追踪、鲸鱼监控、NFT分析</p>
                                   <p><strong className="text-white">适合人群：</strong>专业投资者、交易员、机构投资者</p>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">主要功能模块</h4>
                                 <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                   <li><strong>Portfolio Tracker：</strong>追踪投资组合表现和资产分布</li>
                                   <li><strong>Whale Alert：</strong>监控大额交易和鲸鱼动向</li>
                                   <li><strong>Token God Mode：</strong>深入分析代币持有者结构和变化</li>
                                   <li><strong>NFT Analytics：</strong>分析NFT项目的交易数据和持有者</li>
                                   <li><strong>Address Profiler：</strong>分析任意地址的交易历史和行为模式</li>
                                 </ul>
                               </div>
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">标签系统</h4>
                                 <p className="text-gray-300 text-sm mb-2">
                                   Nansen的核心竞争力在于其庞大的地址标签系统，包括：
                                 </p>
                                 <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                                   <li>交易所钱包（Binance、Coinbase等）</li>
                                   <li>机构投资者（Grayscale、a16z等）</li>
                                   <li>项目团队和基金会地址</li>
                                   <li>DeFi协议金库</li>
                                   <li>智能合约部署者</li>
                                   <li>鲸鱼地址（大额持有者）</li>
                                 </ul>
                               </div>
                             </div>
                             
                             <div>
                               <h4 className="text-lg font-medium text-white mb-3">实际应用案例</h4>
                               <div className="bg-gray-800 rounded-lg p-5">
                                 <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                   <li><strong>预售监控：</strong>通过追踪项目团队地址，发现新项目预售和代币分配</li>
                                   <li><strong>机构持仓跟踪：</strong>了解专业机构的持仓变化和投资策略</li>
                                   <li><strong>资金流向分析：</strong>追踪资金从中心化交易所流向DeFi协议的趋势</li>
                                   <li><strong>市场情绪判断：</strong>通过鲸鱼活动判断市场顶部和底部</li>
                                   <li><strong>NFT热度监测：</strong>发现热门NFT项目的早期购买活动</li>
                                 </ul>
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-chart-pie text-green-400 mr-2"></i>
                             链上核心指标解析
                           </h3>
                           
                           <div className="space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">TVL (Total Value Locked)</h4>
                                 <p className="text-gray-300 text-sm mb-2">
                                   总锁仓价值，衡量DeFi协议中锁定的加密资产总价值。
                                 </p>
                                 <div className="text-sm text-gray-400 space-y-1">
                                   <p><strong className="text-white">计算方式：</strong>协议中所有资产数量 × 对应价格</p>
                                   <p><strong className="text-white">意义：</strong>反映协议的规模和用户信任度</p>
                                   <p><strong className="text-white">注意：</strong>需考虑资产重复质押和洗TVL等情况</p>
                                 </div>
                               </div>
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">交易量 (Trading Volume)</h4>
                                 <p className="text-gray-300 text-sm mb-2">
                                   一定时期内（通常为24小时）的总交易金额。
                                 </p>
                                 <div className="text-sm text-gray-400 space-y-1">
                                   <p><strong className="text-white">计算方式：</strong>所有交易金额的总和</p>
                                   <p><strong className="text-white">意义：</strong>反映市场活跃度和流动性</p>
                                   <p><strong className="text-white">注意：</strong>需警惕虚假交易和洗盘交易</p>
                                 </div>
                               </div>
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">活跃地址数 (Active Addresses)</h4>
                                 <p className="text-gray-300 text-sm mb-2">
                                   一定时期内参与交易或交互的唯一地址数量。
                                 </p>
                                 <div className="text-sm text-gray-400 space-y-1">
                                   <p><strong className="text-white">计算方式：</strong>统计唯一活跃地址数量</p>
                                   <p><strong className="text-white">意义：</strong>反映用户基础和网络效应</p>
                                   <p><strong className="text-white">注意：</strong>需区分真实用户和机器人地址</p>
                                 </div>
                               </div>
                               <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                                 <h4 className="text-white font-medium mb-2">Gas费用 (Gas Fees)</h4>
                                 <p className="text-gray-300 text-sm mb-2">
                                   用户为执行交易和智能合约支付的费用。
                                 </p>
                                 <div className="text-sm text-gray-400 space-y-1">
                                   <p><strong className="text-white">计算方式：</strong>Gas价格 × Gas用量</p>
                                   <p><strong className="text-white">意义：</strong>反映网络拥堵程度和使用成本</p>
                                   <p><strong className="text-white">注意：</strong>高Gas费可能抑制用户活动</p>
                                 </div>
                               </div>
                             </div>
                             
                             <div>
                               <h4 className="text-lg font-medium text-white mb-3">高级分析指标</h4>
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                 <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                   <h5 className="text-white font-medium mb-2">MVRV比率</h5>
                                   <p className="text-gray-400 text-sm">市场价值与实现价值的比率，用于判断市场估值水平</p>
                                 </div>
                                 <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                   <h5 className="text-white font-medium mb-2">NUPL指标</h5>
                                   <p className="text-gray-400 text-sm">未实现利润与损失，用于判断市场顶部和底部</p>
                                 </div>
                                 <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                   <h5 className="text-white font-medium mb-2">实体调整难度</h5>
                                   <p className="text-gray-400 text-sm">比特币网络难度调整，反映矿工参与度</p>
                                 </div>
                                 <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                   <h5 className="text-white font-medium mb-2">稳定币供应比率</h5>
                                   <p className="text-gray-400 text-sm">稳定币占总市值比例，反映市场购买压力</p>
                                 </div>
                                 <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                   <h5 className="text-white font-medium mb-2">交易所净流量</h5>
                                   <p className="text-gray-400 text-sm">资金流入流出交易所的净额，用于判断市场情绪</p>
                                 </div>
                                 <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                   <h5 className="text-white font-medium mb-2">持有时间分布</h5>
                                   <p className="text-gray-400 text-sm">不同持有期地址的代币分布，反映长期持有者行为</p>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-brain text-purple-400 mr-2"></i>
                             链上数据分析实战案例
                           </h3>
                           
                           <div className="space-y-6">
                             <div className="bg-gray-800 rounded-lg p-5">
                               <h4 className="text-white font-medium mb-3">案例一：追踪新协议的早期用户增长</h4>
                               <p className="text-gray-300 text-sm mb-3">
                                 使用Dune Analytics分析一个新上线DeFi协议的早期用户增长和资金流入情况，可以帮助判断项目的潜力和社区活跃度。
                               </p>
                               <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                 <h5 className="text-white font-medium mb-2">分析步骤：</h5>
                                 <ol className="list-decimal pl-6 text-gray-300 space-y-1 text-sm">
                                   <li>在Dune上搜索该协议的智能合约地址</li>
                                   <li>创建查询分析每日新增用户数和交易笔数</li>
                                   <li>分析TVL增长趋势和资金来源</li>
                                   <li>比较同期其他同类协议的表现</li>
                                   <li>结合社交媒体热度综合判断</li>
                                 </ol>
                               </div>
                             </div>
                             
                             <div className="bg-gray-800 rounded-lg p-5">
                               <h4 className="text-white font-medium mb-3">案例二：监控鲸鱼钱包对某代币的持仓变化</h4>
                               <p className="text-gray-300 text-sm mb-3">
                                 使用Nansen跟踪持有某代币的鲸鱼地址持仓变化，可以提前发现潜在的市场动向和价格波动。
                               </p>
                               <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                 <h5 className="text-white font-medium mb-2">分析步骤：</h5>
                                 <ol className="list-decimal pl-6 text-gray-300 space-y-1 text-sm">
                                   <li>在Nansen上搜索该代币，查看持有者排名</li>
                                   <li>监控Top 100持有者的余额变化</li>
                                   <li>关注大额转账和交易所充值/提现活动</li>
                                   <li>分析鲸鱼钱包的历史交易模式和偏好</li>
                                   <li>结合价格走势判断市场影响</li>
                                 </ol>
                               </div>
                             </div>
                             
                             <div className="bg-gray-800 rounded-lg p-5">
                               <h4 className="text-white font-medium mb-3">案例三：评估NFT项目的真实活跃度</h4>
                               <p className="text-gray-300 text-sm mb-3">
                                 结合多个工具分析NFT项目的交易量、持有者分布和交易频率，可以判断项目的真实价值和社区活跃度。
                               </p>
                               <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
                                 <h5 className="text-white font-medium mb-2">分析步骤：</h5>
                                 <ol className="list-decimal pl-6 text-gray-300 space-y-1 text-sm">
                                   <li>使用Dune查询NFT合约的交易数据和持有者分布</li>
                                   <li>使用Nansen分析鲸鱼持有者和机构持仓</li>
                                   <li>计算平均持有时间和换手率</li>
                                   <li>分析底价走势和交易量相关性</li>
                                   <li>调查项目社区活跃度和开发进展</li>
                                 </ol>
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-shield-alt text-red-400 mr-2"></i>
                             链上数据分析的局限性与注意事项
                           </h3>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                               <h4 className="text-white font-medium mb-2">主要局限性</h4>
                               <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                 <li>地址匿名性：无法完全确定地址背后的真实身份</li>
                                 <li>数据滞后性：链上数据需要时间上链和处理</li>
                                 <li>清洗交易：存在人为操纵交易量和TVL的情况</li>
                                 <li>隐私解决方案：隐私币和Layer2增加了追踪难度</li>
                                 <li>多地址策略：大户可能使用多个地址分散持有</li>
                               </ul>
                             </div>
                             <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                               <h4 className="text-white font-medium mb-2">注意事项</h4>
                               <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                 <li>综合多个数据源，避免单一指标判断</li>
                                 <li>结合基本面分析，不要只依赖链上数据</li>
                                 <li>关注长期趋势，而非短期波动</li>
                                 <li>警惕数据操纵和虚假繁荣</li>
                                 <li>持续学习和更新分析方法</li>
                               </ul>
                             </div>
                           </div>
                         </div>
                         
                         <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                           <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                             <i className="fa-solid fa-rocket text-yellow-400 mr-2"></i>
                             链上数据分析的未来趋势
                           </h3>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                               <h4 className="text-white font-medium mb-2">技术发展趋势</h4>
                               <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                 <li>AI与机器学习在数据分析中的应用</li>
                                 <li>多链数据分析工具的整合</li>
                                 <li>实时数据分析和预警系统</li>
                                 <li>隐私保护与数据分析的平衡</li>
                                 <li>更友好的用户界面和可视化工具</li>
                               </ul>
                             </div>
                             <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                               <h4 className="text-white font-medium mb-2">应用拓展方向</h4>
                               <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
                                 <li>监管合规与反洗钱分析</li>
                                 <li>DeFi协议风险管理</li>
                                 <li>NFT金融化和估值模型</li>
                                 <li>链上信用评分和身份验证</li>
                                 <li>智能投顾和自动化交易策略</li>
                               </ul>
                             </div>
                           </div>
                         </div>
                       </motion.div>
                     )}
                {/* 学习资源与建议 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>
                    学习资源与建议
                  </h2>
                  
                  {/* 推荐网站部分 */}
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-link text-blue-400 mr-2"></i>
                      推荐学习网站
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {module.recommendedWebsites.map((site, index) => (
                        <a
                          key={index}
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-900/50 transition-all group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {site.name}
                            </h4>
                            <i className="fa-solid fa-external-link text-gray-500 group-hover:text-blue-400 transition-colors"></i>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {site.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  {/* 学习建议部分 */}
                  <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <i className="fa-solid fa-graduation-cap text-green-400 mr-2"></i>
                      学习方向建议
                    </h3>
                    <ul className="space-y-3">
                      {moduleDetails.learningSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                            <i className="fa-solid fa-check text-blue-400 text-xs"></i>
                          </div>
                          <span className="text-gray-300">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                  </div>
                </div>
              </section>
              
              {/* 下一步学习 */}
              <section className="py-12 bg-gray-900 border-t border-gray-800">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold text-white mb-6 text-center">下一步学习</h2>
                    
                    <div className="flex justify-between items-center">
                      {module.moduleNumber > 1 ? (
                        <button
                          onClick={() => {
                            const prevModule = cryptoModulesData.find(m => m.moduleNumber === module.moduleNumber - 1);
                            if (prevModule) navigate(`/module/${prevModule.id}`);
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-750 text-white rounded-lg transition-colors"
                        >
                          <i className="fa-solid fa-arrow-left"></i>
                           <span>上一板块</span>
                        </button>
                      ) : (
                        <div className="w-32"></div> // 占位元素保持居中
                      )}
                      
                      <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                   返回列表
                      </button>
                      
                      {module.moduleNumber < cryptoModulesData.length ? (
                        <button
                          onClick={() => {
                            const nextModule = cryptoModulesData.find(m => m.moduleNumber === module.moduleNumber + 1);
                            if (nextModule) navigate(`/module/${nextModule.id}`);
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-750 text-white rounded-lg transition-colors"
                        >
                           <span>下一板块</span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      ) : (
                        <div className="w-32"></div> // 占位元素保持居中
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </main>
            
            <Footer />
          </div>
        );
      }
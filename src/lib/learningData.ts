import { z } from 'zod';

// 定义币圈学习模块类型
export const CryptoModuleSchema = z.object({
  id: z.string(),
  moduleNumber: z.number(),
  title: z.string(),
  learningContent: z.string(),
  recommendedWebsites: z.array(z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url()
  })),
  searchKeywords: z.array(z.string()),
  category: z.string(),
  imageUrl: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  popularity: z.number().min(1).max(100),
});

export type CryptoModule = z.infer<typeof CryptoModuleSchema>;

// 定义空投类型
export const AirdropTypeSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  platforms: z.array(z.string()),
});

export type AirdropType = z.infer<typeof AirdropTypeSchema>;

// 币圈学习模块数据
export const cryptoModulesData: CryptoModule[] = [
  {
    id: 'module-1',
    moduleNumber: 1,
    title: '一链生态（L1）',
    learningContent: '公链结构、共识机制、代币模型、工作原理与关键特征详解',
    recommendedWebsites: [
      {
        name: 'Messari',
        description: '链上数据与研报平台',
        url: 'https://messari.io'
      },
      {
        name: 'RootData',
        description: '项目跟踪库',
        url: 'https://www.rootdata.com'
      },
      {
        name: 'Etherscan',
        description: '以太坊区块链浏览器',
        url: 'https://etherscan.io'
      }
    ],
    searchKeywords: ['Layer1', 'Tokenomics', 'ETH/Solana', 'Bitcoin', '共识机制', '智能合约'],
    category: 'blockchain',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&image_size=landscape_16_9&prompt=Blockchain%20technology%20illustration%20with%20cryptocurrency%20icons&sign=9440b7ee4fe4ad090f348b33cfc376ce',
    difficulty: 'beginner',
    popularity: 90,
  },
  {
    id: 'module-2',
    moduleNumber: 2,
    title: '二链生态（L2）',
    learningContent: '扩容方案、Rollup原理、桥接交互与DeFi基础协议',
    recommendedWebsites: [
      {
        name: 'L2Beat',
        description: 'L2项目排行',
        url: 'https://l2beat.com'
      },
      {
        name: 'LearnWeb3',
        description: '交互教学库',
        url: 'https://learnweb3.io'
      }
    ],
    searchKeywords: ['Arbitrum', 'Optimism', 'L2交互', 'DeFi基础', 'AMM', '借贷协议'],
    category: 'blockchain',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&image_size=landscape_16_9&prompt=Layer%202%20blockchain%20scaling%20solutions%20illustration&sign=2f2f8143a8601e8f7eac9e878861d92e',
    difficulty: 'intermediate',
    popularity: 85,
  },
  {
    id: 'module-3',
    moduleNumber: 3,
    title: '钱包与链上操作',
    learningContent: 'MetaMask、Phantom、RPC、跨链桥',
    recommendedWebsites: [
      {
        name: 'CryptoZombies',
        description: '钱包交互小游戏',
        url: 'https://cryptozombies.io'
      },
      {
        name: 'B站教程',
        description: '中文视频教程平台',
        url: 'https://www.bilibili.com'
      }
    ],
    searchKeywords: ['钱包注册', '跨链桥教程', 'RPC配置'],
    category: 'tools',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&image_size=landscape_16_9&prompt=Cryptocurrency%20wallet%20interface%20with%20blockchain%20transactions&sign=4c66305988ac0e26afde8240572952d4',
    difficulty: 'beginner',
    popularity: 95,
  },
  {
    id: 'module-4',
    moduleNumber: 4,
    title: '空投任务平台',
    learningContent: 'Galxe、Zealy、TaskOn 平台使用与判别真伪',
    recommendedWebsites: [
      {
        name: 'Airdrops.io',
        description: '空投收集平台',
        url: 'https://airdrops.io'
      },
      {
        name: 'Galxe',
        description: '任务平台',
        url: 'https://galxe.com'
      }
    ],
    searchKeywords: ['空投时间线', '交互项目', 'Galxe教程'],
    category: 'airdrops',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&image_size=landscape_16_9&prompt=Cryptocurrency%20airdrop%20platform%20interface%20with%20tasks&sign=ee00a38368e93df5c6ba5a152b9188fe',
    difficulty: 'beginner',
    popularity: 92,
  },
  {
    id: 'module-5',
    moduleNumber: 5,
    title: 'DePIN参与逻辑',
    learningContent: '硬件设备、挖矿机制、UBI项目等',
    recommendedWebsites: [
      {
        name: 'Helium官网',
        description: 'DePIN鼻祖项目',
        url: 'https://helium.com'
      },
      {
        name: 'UBI官网',
        description: '托管式DePIN平台',
        url: 'https://ubinetwork.ai'
      }
    ],
    searchKeywords: ['DePIN是什么', 'UBI Network', '盒子挖矿'],
    category: 'mining',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&image_size=landscape_16_9&prompt=DePIN%20network%20illustration%20with%20mining%20devices&sign=46556b658b23819f4fab1478446ca8e8',
    difficulty: 'advanced',
    popularity: 75,
  },
  {
    id: 'module-6',
    moduleNumber: 6,
    title: '空投类型详解',
    learningContent: '链上交互空投、社群活跃空投、邀请空投、NFT空投、白名单空投、DePIN类空投等各类空投原理与参与策略',
    recommendedWebsites: [
      {
        name: 'Galxe',
        description: '多链任务与空投平台',
        url: 'https://galxe.com'
      },
      {
        name: 'Airdrops.io',
        description: '空投信息聚合平台',
        url: 'https://airdrops.io'
      }
    ],
    searchKeywords: ['链上交互空投', '社群活跃空投', 'NFT空投', 'DePIN空投', '白名单机制'],
    category: 'airdrops',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Cryptocurrency%20airdrop%20types%20illustration%20with%20various%20participation%20strategies&sign=67d347256179092a867821ad3638a9d9',
    difficulty: 'intermediate',
    popularity: 92,
  },
  {
    id: 'module-7',
    moduleNumber: 7,
    title: '交易所玩法',
    learningContent: '现货/合约、杠杆、量化策略、Launchpad、流动性池、理财产品',
    recommendedWebsites: [
      {
        name: 'Binance Learn',
        description: '交易所教程',
        url: 'https://academy.binance.com/en'
      },
      {
        name: 'OKX学院',
        description: '结构清晰的课程体系',
        url: 'https://www.okx.com/academy/zh-cn'
      }
    ],
    searchKeywords: ['现货合约区别', 'Launchpad', '流动性挖矿'],
    category: 'exchange',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&cryptocurrency%20exchange%20interface%20with%20trading%20charts&image_size=landscape_16_9',
    difficulty: 'intermediate',
    popularity: 90,
  },
  {
    id: 'module-8',
    moduleNumber: 8,
    title: '链游与NFT生态',
    learningContent: 'GameFi模式、链游分发平台、NFT收藏、铸造/转售/交易机制',
    recommendedWebsites: [
      {
        name: 'DappRadar',
        description: '游戏/NFT数据平台',
        url: 'https://dappradar.com'
      },
      {
        name: 'Magic Eden',
        description: 'Solana NFT交易平台',
        url: 'https://magiceden.io'
      }
    ],
    searchKeywords: ['热门链游', 'GameFi玩法', 'NFT交易教学'],
    category: 'nft',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&image_size=landscape_16_9&prompt=NFT%20marketplace%20with%20digital%20art%20collectibles&sign=be254639b29270cac51693d6d24ef4c1',
    difficulty: 'intermediate',
    popularity: 87,
  },
  {
    id: 'module-9',
    moduleNumber: 9,
    title: '链上数据分析工具',
    learningContent: 'Dune/DeFiLlama/Zapper/Nansen 的基础用法',
    recommendedWebsites: [
      {
        name: 'Dune',
        description: '链上数据SQL平台',
        url: 'https://dune.com'
      },
      {
        name: 'DeFiLlama',
        description: 'TVL数据与协议排行',
        url: 'https://defillama.com'
      }
    ],
    searchKeywords: ['TVL', 'Airdrop Tracking', '钱包地址分析'],
    category: 'tools',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&image_size=landscape_16_9&prompt=Blockchain%20analytics%20dashboard%20with%20data%20visualizations&sign=20d052c8da2849011e202c681b84eba8',
    difficulty: 'advanced',
    popularity: 80,
  },
  {
    id: 'module-10',
    moduleNumber: 10,
    title: '技术学习路径',
    learningContent: 'Python脚本、Web3.js、钱包监听、Node运行、RPC监控',
  recommendedWebsites: [
    {
      name: 'freeCodeCamp',
      description: '免费编程学习平台，提供从基础到高级的编程课程',
      url: 'https://www.freecodecamp.org'
    },
    {
      name: 'GitHub',
      description: '全球最大的代码托管平台，可搜索和学习Web3开源项目',
      url: 'https://github.com'
    }
  ],
  searchKeywords: ['Web3 script', 'Python RPC', '钱包监听', 'Node.js', 'Solidity', '智能合约开发', '区块链API'],
    category: 'development',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&image_size=landscape_16_9&prompt=Cryptocurrency%20development%20tools%20and%20code%20editor&sign=a670a324a980addf914450d5334450db',
    difficulty: 'advanced',
    popularity: 78,
  },
  {
    id: 'module-11',
    moduleNumber: 11,
    title: '社群传播与PR',
    learningContent: 'Shill语言、Twitter社区节奏、TG发言规律、小号设置',
    recommendedWebsites: [
      {
        name: 'Telegram',
        description: '社群交流平台',
        url: 'https://telegram.org'
      },
      {
        name: 'Twitter',
        description: '社交媒体平台',
        url: 'https://twitter.com'
      }
    ],
    searchKeywords: ['推文节奏', 'PR配图', 'TG群置顶语言'],
    category: 'community',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&image_size=landscape_16_9&prompt=Cryptocurrency%20community%20engagement%20on%20social%20media&sign=6fe1b3f3332c25c5ff2a54308446d431',
    difficulty: 'intermediate',
    popularity: 75,
  },
  {
    id: 'module-12',
    moduleNumber: 12,
    title: '流量合集',
    learningContent: '封面设计、信息图表、推文卡片、图文格式优化、平台机制研究、TG限流/X推文推荐机制/小红书限流/抖音标签',
    recommendedWebsites: [
      {
        name: 'Canva',
        description: '在线设计工具',
        url: 'https://www.canva.com'
      },
      {
        name: 'PromptHub',
        description: 'MJ提示词案例库',
        url: 'https://prompthub.com'
      },
      {
        name: 'B站',
        description: '视频内容平台',
        url: 'https://www.bilibili.com'
      },
      {
        name: '知乎',
        description: '问答社区',
        url: 'https://www.zhihu.com'
      }
    ],
    searchKeywords: ['币圈图文风格', '封面模版', 'Midjourney提示词', '推文限流', '热门机制', '标签权重'],
    category: 'marketing',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Social%20media%20marketing%20strategy%20with%20analytics%20and%20content%20creation&sign=d7aceba3bfc3a0017695dee5eb8658c4',
    difficulty: 'intermediate',
    popularity: 75,
  },

];

// 空投类型数据
export const airdropTypesData: AirdropType[] = [
  {
    id: 'airdrop-1',
    type: '链上交互空投',
    description: '通过完成任务/调用合约/与项目交互，获得后续代币分发资格',
    platforms: ['Arbitrum', 'StarkNet', 'zkSync', 'LayerZero']
  },
  {
    id: 'airdrop-2',
    type: '社群活跃空投',
    description: '通过积分/贡献/留言/传播等社区行为，获取空投资格',
    platforms: ['Galxe', 'Zealy', 'TaskOn']
  },
  {
    id: 'airdrop-3',
    type: '邀请空投',
    description: '通过邀请其他人参与任务获得排名及代币奖励',
    platforms: ['Lingo', 'Zealy']
  },
  {
    id: 'airdrop-4',
    type: 'NFT空投',
    description: '持有NFT或参与某系列项目获得Token/NFT奖励',
    platforms: ['Mint.fun', 'Blur', 'Tensor']
  },
  {
    id: 'airdrop-5',
    type: '白名单空投',
    description: '加入特定条件白名单后，等待项目上所或TGE自动获得空投',
    platforms: ['项目TG群', '推特预告空投', '早期Mint用户']
  },
  {
    id: 'airdrop-6',
    type: 'DePIN类空投',
    description: '通过运行硬件设备、持续在线、提供算力/流量等参与网络获得奖励',
    platforms: ['Helium', 'io.net', 'NOS']
  }
];
// 按难度排序：入门 -> 中级 -> 高级
cryptoModulesData.sort((a, b) => a.moduleNumber - b.moduleNumber);
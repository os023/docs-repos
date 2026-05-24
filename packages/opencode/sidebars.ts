import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: '概览',
      collapsed: false,
      items: ['overview/index'],
    },
    {
      type: 'category',
      label: '安装',
      collapsed: false,
      items: ['setup/index', 'setup/install'],
    },
    {
      type: 'category',
      label: '配置',
      collapsed: false,
      items: ['config/index', 'config/providers'],
    },
    {
      type: 'category',
      label: '初始化',
      collapsed: false,
      items: ['init/index'],
    },
    {
      type: 'category',
      label: '使用指南',
      collapsed: false,
      items: ['usage/index'],
    },
    {
      type: 'category',
      label: '分享',
      collapsed: false,
      items: ['share/index'],
    },
    {
      type: 'category',
      label: '定制',
      collapsed: false,
      items: [
        'customize/index',
        'customize/config',
        'customize/themes',
        'customize/keybinds',
        'customize/formatters',
        'customize/commands',
      ],
    },
  ],
};

export default sidebars;

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
      items: ['setup/index'],
    },
    {
      type: 'category',
      label: '概念',
      collapsed: false,
      items: [
        'concepts/index',
        'concepts/architecture',
        'concepts/proxy-types',
        'concepts/ports-domains',
        'concepts/security',
      ],
    },
    {
      type: 'category',
      label: '示例',
      collapsed: false,
      items: ['examples/index'],
    },
    {
      type: 'category',
      label: '常用配置',
      collapsed: false,
      items: ['config/index'],
    },
    {
      type: 'category',
      label: 'FAQ',
      collapsed: false,
      items: ['faq/index'],
    },
  ],
};

export default sidebars;

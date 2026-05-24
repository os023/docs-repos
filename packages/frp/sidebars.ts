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
      items: ['setup/index', 'setup/install', 'setup/quickstart'],
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
      items: [
        'examples/index',
        'examples/ssh',
        'examples/http',
        'examples/https-domains',
      ],
    },
    {
      type: 'category',
      label: '常用配置',
      collapsed: false,
      items: ['config/index', 'config/fields'],
    },
    {
      type: 'category',
      label: 'FAQ',
      collapsed: false,
      items: ['faq/index', 'faq/troubleshooting'],
    },
  ],
};

export default sidebars;

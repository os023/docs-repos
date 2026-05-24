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
      items: ['setup/index', 'setup/quickstart', 'setup/scaffold'],
    },
    {
      type: 'category',
      label: '核心概念',
      collapsed: false,
      items: [
        'concepts/index',
        'concepts/ioc',
        'concepts/controller',
        'concepts/service',
        'concepts/configuration',
      ],
    },
    {
      type: 'category',
      label: '函数式',
      collapsed: false,
      items: ['functional/index', 'functional/workspace'],
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

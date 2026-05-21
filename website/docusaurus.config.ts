import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/** 各文档子包：id 对应路由前缀，path 指向 packages 下的 docs 目录 */
const docPackages = [
  {id: 'prisma', label: 'Prisma', dir: 'prisma'},
  {id: 'pgrest', label: 'PostgREST', dir: 'pgrest'},
  {id: 'docusaurus', label: 'Docusaurus', dir: 'docusaurus'},
  {id: 'opencode', label: 'OpenCode', dir: 'opencode'},
  {id: 'midscene', label: 'Midscene', dir: 'midscene'},
] as const;

const config: Config = {
  title: '中文技术文档',
  tagline: '常用库、组件与开源系统的中文文档集',
  url: 'https://example.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: docPackages.map(({id, dir}) => [
    '@docusaurus/plugin-content-docs',
    {
      id,
      path: `../packages/${dir}/docs`,
      routeBasePath: id,
      sidebarPath: require.resolve(`../packages/${dir}/sidebars.ts`),
      editUrl: undefined,
    },
  ]),

  themeConfig: {
    navbar: {
      title: '中文技术文档',
      items: [
        {to: '/', label: '首页', position: 'left'},
        ...docPackages.map(({id, label}) => ({
          type: 'docSidebar' as const,
          sidebarId: 'docsSidebar',
          docsPluginId: id,
          position: 'left' as const,
          label,
        })),
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Chinese Docs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

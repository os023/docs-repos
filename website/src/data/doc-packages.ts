/**
 * 与 packages/<name>/package.json 中的 officialLinks 保持同步。
 * 运行 pnpm validate 可校验各子包 package.json。
 */
export type OfficialLinks = {
  website: string;
  documentation: string;
  repository: string;
};

export type DocPackageMeta = {
  id: string;
  title: string;
  description: string;
  officialLinks: OfficialLinks;
};

export const docPackagesMeta: DocPackageMeta[] = [
  {
    id: 'prisma',
    title: 'Prisma',
    description: '现代 TypeScript ORM，数据库建模与迁移。',
    officialLinks: {
      website: 'https://www.prisma.io',
      documentation: 'https://www.prisma.io/docs',
      repository: 'https://github.com/prisma/prisma',
    },
  },
  {
    id: 'pgrest',
    title: 'PostgREST',
    description: '将 PostgreSQL 自动暴露为 RESTful API。',
    officialLinks: {
      website: 'https://postgrest.org',
      documentation: 'https://postgrest.org/en/stable/',
      repository: 'https://github.com/PostgREST/postgrest',
    },
  },
  {
    id: 'docusaurus',
    title: 'Docusaurus',
    description: '静态站点生成器，适合技术文档站。',
    officialLinks: {
      website: 'https://docusaurus.io',
      documentation: 'https://docusaurus.io/docs',
      repository: 'https://github.com/facebook/docusaurus',
    },
  },
  {
    id: 'opencode',
    title: 'OpenCode',
    description: '开源 AI 编程助手与 CLI 工具链。',
    officialLinks: {
      website: 'https://opencode.ai',
      documentation: 'https://opencode.ai/docs',
      repository: 'https://github.com/anomalyco/opencode',
    },
  },
  {
    id: 'midscene',
    title: 'Midscene',
    description: 'AI 驱动的 UI 自动化与视觉测试。',
    officialLinks: {
      website: 'https://midscenejs.com',
      documentation: 'https://midscenejs.com/zh/intro',
      repository: 'https://github.com/web-infra-dev/midscene',
    },
  },
  {
    id: 'frp',
    title: 'frp',
    description: '高性能反向代理，将内网服务暴露到公网。',
    officialLinks: {
      website: 'https://gofrp.org',
      documentation: 'https://gofrp.org/docs/',
      repository: 'https://github.com/fatedier/frp',
    },
  },
];

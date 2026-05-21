import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const docSections = [
  {
    id: 'prisma',
    title: 'Prisma',
    description: '现代 TypeScript ORM，数据库建模与迁移。',
  },
  {
    id: 'pgrest',
    title: 'PostgREST',
    description: '将 PostgreSQL 自动暴露为 RESTful API。',
  },
  {
    id: 'docusaurus',
    title: 'Docusaurus',
    description: '静态站点生成器，适合技术文档站。',
  },
  {
    id: 'opencode',
    title: 'OpenCode',
    description: '开源 AI 编程助手与 CLI 工具链。',
  },
  {
    id: 'midscene',
    title: 'Midscene',
    description: 'AI 驱动的 UI 自动化与视觉测试。',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero hero--primary">
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="首页" description="常用库与开源系统的中文文档">
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <Heading as="h2">文档库</Heading>
        <p>
          每个库对应 <code>packages/</code> 下的独立子包，由主站统一聚合展示。
        </p>
        <div className="doc-card-grid">
          {docSections.map(({id, title, description}) => (
            <Link key={id} className="doc-card" to={`/${id}`}>
              <Heading as="h3">{title}</Heading>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {docPackagesMeta} from '../data/doc-packages';

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

function OfficialLinksList({
  links,
}: {
  links: (typeof docPackagesMeta)[number]['officialLinks'];
}) {
  return (
    <ul className="official-links">
      <li>
        <a href={links.website} target="_blank" rel="noopener noreferrer">
          官网
        </a>
      </li>
      <li>
        <a
          href={links.documentation}
          target="_blank"
          rel="noopener noreferrer">
          文档
        </a>
      </li>
      <li>
        <a href={links.repository} target="_blank" rel="noopener noreferrer">
          仓库
        </a>
      </li>
    </ul>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="首页" description="常用库与开源系统的中文文档">
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <Heading as="h2">文档库</Heading>
        <p>
          每个库对应 <code>packages/</code> 下的独立子包，须声明
          <strong> 官方网站、官方文档与代码仓库 </strong>
          地址（见 <code>docs/package-convention.md</code>）。
        </p>
        <div className="doc-card-grid">
          {docPackagesMeta.map(({id, title, description, officialLinks}) => (
            <div key={id} className="doc-card">
              <Link to={`/${id}`}>
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
              </Link>
              <OfficialLinksList links={officialLinks} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          🐳 {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            🚀 Get Started - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Complete Docker documentation from basics to advanced orchestration. Master containers, images, Dockerfiles, Compose, and production deployment.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className="container margin-vert--xl">
          <div className="row">
            <div className="col col--8 col--offset--2">
              <div className="text--center">
                <h2>🎯 What You'll Learn</h2>
                <p className="text--left">
                  This comprehensive guide covers everything you need to know about Docker, 
                  organized into 12 logical sections that build upon each other. Whether you're 
                  a beginner or an experienced developer, you'll find valuable insights and 
                  practical examples to enhance your Docker skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
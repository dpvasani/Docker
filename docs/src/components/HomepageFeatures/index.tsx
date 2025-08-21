import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🐳 Docker Fundamentals',
    Svg: require('@site/static/img/feature-1.svg').default,
    description: (
      <>
        Learn the core concepts of Docker, including containers vs VMs, 
        Docker architecture, and how containers work under the hood.
      </>
    ),
  },
  {
    title: '⚡ CLI Commands',
    Svg: require('@site/static/img/feature-2.svg').default,
    description: (
      <>
        Master Docker command-line interface with our comprehensive cheat sheet. 
        From basic image management to advanced container operations.
      </>
    ),
  },
  {
    title: '📝 Dockerfiles',
    Svg: require('@site/static/img/feature-3.svg').default,
    description: (
      <>
        Create custom Docker images with Dockerfiles. Learn best practices, 
        multi-stage builds, and optimization techniques.
      </>
    ),
  },
  {
    title: '🧩 Docker Compose',
    Svg: require('@site/static/img/feature-4.svg').default,
    description: (
      <>
        Orchestrate multi-container applications with Docker Compose. 
        Manage complex deployments with simple YAML files.
      </>
    ),
  },
  {
    title: '🌐 Networking & Volumes',
    Svg: require('@site/static/img/feature-5.svg').default,
    description: (
      <>
        Understand Docker networking, custom networks, port mapping, 
        and persistent data storage with volumes.
      </>
    ),
  },
  {
    title: '🚀 Production Deployment',
    Svg: require('@site/static/img/feature-6.svg').default,
    description: (
      <>
        Deploy Docker applications to production with orchestration tools, 
        monitoring, security best practices, and troubleshooting.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
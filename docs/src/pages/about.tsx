import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function About(): JSX.Element {
  return (
    <Layout
      title="About"
      description="About FastAPI Documentation">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <Heading as="h1">About FastAPI Documentation</Heading>
            <p>
              This documentation site provides comprehensive guides and tutorials for FastAPI,
              covering everything from basic setup to advanced production deployment strategies.
            </p>
            
            <Heading as="h2">What You'll Learn</Heading>
            <ul>
              <li>🚀 FastAPI fundamentals and setup</li>
              <li>📊 Database integration with SQLAlchemy</li>
              <li>🔐 Authentication and security</li>
              <li>🧪 Testing strategies</li>
              <li>🌐 Production deployment</li>
              <li>📝 Best practices and patterns</li>
            </ul>
            
            <Heading as="h2">Contributing</Heading>
            <p>
              This documentation is open source and contributions are welcome!
              If you find any issues or have suggestions for improvements,
              please feel free to open an issue or submit a pull request.
            </p>
            
            <Heading as="h2">Contact</Heading>
            <p>
              Have questions or feedback? Reach out through:
            </p>
            <ul>
              <li>📧 Email: your.email@example.com</li>
              <li>🐙 GitHub: <a href="https://github.com/dpvasani">@dpvasani</a></li>
              <li>💼 LinkedIn: <a href="https://www.linkedin.com/in/dpvasani56/">@dpvasani</a></li>
              <li>🐦 Twitter: <a href="https://twitter.com/vasanidarshan56">@vasanidarshan56</a></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
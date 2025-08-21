import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '🐳 Docker Complete Guide',
  tagline: 'Master Docker from basics to advanced orchestration',
  favicon: 'img/docker-favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docker-docs.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'docker-docs', // Usually your GitHub org/user name.
  projectName: 'docker-complete-guide', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docker-social-card.jpg',
    navbar: {
      title: '🐳 Docker Guide',
      logo: {
        alt: 'Docker Logo',
        src: 'img/docker-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '📚 Documentation',
        },
        {to: '/blog', label: '📝 Blog', position: 'left'},
        {
          href: 'https://github.com/dpvasani/docker',
          label: '🐙 GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '📚 Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'CLI Commands',
              to: '/docs/category/docker-cli',
            },
            {
              label: 'Docker Compose',
              to: '/docs/category/docker-compose',
            },
          ],
        },
        {
          title: '🐳 Docker',
          items: [
            {
              label: 'Docker Hub',
              href: 'https://hub.docker.com',
            },
            {
              label: 'Official Docs',
              href: 'https://docs.docker.com',
            },
            {
              label: 'Community',
              href: 'https://community.docker.com',
            },
          ],
        },
        {
          title: '🔗 More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/dpvasani/docker',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Docker Complete Guide. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['yaml', 'bash'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
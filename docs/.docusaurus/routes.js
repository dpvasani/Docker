import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/about',
    component: ComponentCreator('/about', 'ca4'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '3c4'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/docker-guide-launch',
    component: ComponentCreator('/blog/docker-guide-launch', '2a1'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/containers',
    component: ComponentCreator('/blog/tags/containers', '5d3'),
    exact: true
  },
  {
    path: '/blog/tags/docker',
    component: ComponentCreator('/blog/tags/docker', 'b0e'),
    exact: true
  },
  {
    path: '/blog/tags/documentation',
    component: ComponentCreator('/blog/tags/documentation', '4ab'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'e01'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '3f8'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'ee8'),
            routes: [
              {
                path: '/docs/docker-basics/docker-architecture',
                component: ComponentCreator('/docs/docker-basics/docker-architecture', '868'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-basics/what-is-docker',
                component: ComponentCreator('/docs/docker-basics/what-is-docker', 'ca3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-cli/cli-cheat-sheet',
                component: ComponentCreator('/docs/docker-cli/cli-cheat-sheet', '2f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-cli/docker-cli-cheat-sheet',
                component: ComponentCreator('/docs/docker-cli/docker-cli-cheat-sheet', 'e6b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-cli/docker-run',
                component: ComponentCreator('/docs/docker-cli/docker-run', '750'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-cli/docker-run',
                component: ComponentCreator('/docs/docker-cli/docker-run', '007'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-compose/compose-basics',
                component: ComponentCreator('/docs/docker-compose/compose-basics', '55c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-compose/docker-compose',
                component: ComponentCreator('/docs/docker-compose/docker-compose', 'e20'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/auto-port-mapping',
                component: ComponentCreator('/docs/docker-custom-images/auto-port-mapping', '595'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/complete-docker-image-publishing-cheatsheet',
                component: ComponentCreator('/docs/docker-custom-images/complete-docker-image-publishing-cheatsheet', '5c3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/docker-custom-images',
                component: ComponentCreator('/docs/docker-custom-images/docker-custom-images', 'a80'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/docker-custom-images',
                component: ComponentCreator('/docs/docker-custom-images/docker-custom-images', '1d7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/docker-image-optimization-guide',
                component: ComponentCreator('/docs/docker-custom-images/docker-image-optimization-guide', 'fcf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/dockerfile-command-reference',
                component: ComponentCreator('/docs/docker-custom-images/dockerfile-command-reference', '280'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/dockerfile-command-reference',
                component: ComponentCreator('/docs/docker-custom-images/dockerfile-command-reference', 'd44'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/layer',
                component: ComponentCreator('/docs/docker-custom-images/layer', '847'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/multi-stage-build',
                component: ComponentCreator('/docs/docker-custom-images/multi-stage-build', '633'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/nodejs-app-cheatsheet',
                component: ComponentCreator('/docs/docker-custom-images/nodejs-app-cheatsheet', 'bb3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/port-mapping',
                component: ComponentCreator('/docs/docker-custom-images/port-mapping', 'dfd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-custom-images/user-management',
                component: ComponentCreator('/docs/docker-custom-images/user-management', 'ca9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-for-developers/docker-for-developer',
                component: ComponentCreator('/docs/docker-for-developers/docker-for-developer', '9d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-for-developers/docker-limitation',
                component: ComponentCreator('/docs/docker-for-developers/docker-limitation', '8c0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-networking/docker-networking',
                component: ComponentCreator('/docs/docker-networking/docker-networking', '997'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-networking/docker-networking-basics',
                component: ComponentCreator('/docs/docker-networking/docker-networking-basics', '04d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-orchestration/docker-orchestration-with-aws-ecs',
                component: ComponentCreator('/docs/docker-orchestration/docker-orchestration-with-aws-ecs', '745'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-volumes/docker-volumes',
                component: ComponentCreator('/docs/docker-volumes/docker-volumes', '9a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/docker-volumes/docker-volumes-basics',
                component: ComponentCreator('/docs/docker-volumes/docker-volumes-basics', 'a99'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/dockerfiles/dockerfile-basics',
                component: ComponentCreator('/docs/dockerfiles/dockerfile-basics', '060'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/dockerfiles/dockerfile-commands',
                component: ComponentCreator('/docs/dockerfiles/dockerfile-commands', '599'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

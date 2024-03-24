// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer'
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn'
import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs'
import type { Options as BlogOptions } from '@docusaurus/plugin-content-blog'
import PrismLight from './src/utils/prismLight'
import PrismDark from './src/utils/prismDark'
import {
  BlogContent,
  BlogPostMetadata,
  BlogSidebar
} from '@docusaurus/plugin-content-blog'

const defaultLocale = 'en'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yana',
  tagline: 'Just Do It',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://yanadev.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'yanadev', // Usually your GitHub org/user name.
  projectName: 'yanadev.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: './sidebars.js'
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
        },
        blog: {
          routeBasePath: '/', // Serve the blog at the site's root
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '最近博客',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          postsPerPage: 10
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
        },

        theme: {
          customCss: './src/css/custom.css'
        }
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // Replace with your project's social card
      image: 'img/logo.svg',
      liveCodeBlock: {
        playgroundPosition: 'bottom'
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true
        }
      },
      // announcementBar: {
      //   id: 'feature_release', // Any value that will identify this message.
      //   content: `something`,
      //   backgroundColor: '#fafbfc', // Defaults to `#fff`.
      //   textColor: '#091E42' // Defaults to `#000`.
      // },
      navbar: {
        title: 'Yana',
        hideOnScroll: false,
        logo: {
          alt: 'Yana Logo',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'search',
            position: 'right'
          },
          {
            type: 'doc',
            position: 'left',
            docId: 'intro',
            label: '关于我/Skills'
          },

          {
            to: '/',
            label: '最近博客',
            position: 'left'
          },
          {
            to: '/algorithm',
            label: '算法',
            position: 'right'
          },
          {
            to: '/frontend',
            label: '前端',
            position: 'left',
            activeBaseRegex: `/frontend/`,
            items: [
              {
                to: '/vue',
                label: 'Vue',
                activeBaseRegex: `/vue`
              },
              {
                to: '/react/react',
                label: 'React',
                activeBaseRegex: `/react`
              },
              {
                to: '/frontend',
                label: 'TS/JS',
                activeBaseRegex: `/frontend`
              }
            ]
          },

          {
            to: '/chore/webpack',
            label: '构建',
            position: 'left',
            activeBaseRegex: `/chore`
          },

          // {
          //   type: 'docSidebar',
          //   sidebarId: 'docSidebar',
          //   position: 'left',
          //   label: '后端'
          // },

          {
            label: 'Community',
            position: 'right',
            items: [
              { label: 'CSDN', href: 'https://blog.csdn.net/VOID_Pointer_G' },
              { label: '掘金', href: 'https://juejin.cn/user/3263006244083678' }
            ]
          },
          {
            href: 'https://yanadev.github.io/',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '关于我',
                to: '/docs/intro'
              }
            ]
          },

          {
            title: 'Frontend',
            items: [
              {
                label: 'CSDN',
                href: 'https://blog.csdn.net/VOID_Pointer_G'
              },
              {
                label: '掘金',
                href: 'https://juejin.cn/user/3263006244083678'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'yana的自建博客',
                to: '/blog'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`
      },
      prism: {
        additionalLanguages: [
          'java',
          'latex',
          'haskell',
          'matlab',
          'PHp',
          'bash',
          'diff',
          'json',
          'scss'
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' }
          },
          {
            className: 'code-block-error-line',
            line: 'This will error'
          }
        ],
        theme: PrismLight,
        darkTheme: PrismDark
      },
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    },
  plugins: [
    // [
    //   'content-docs',
    //   {
    //     id: 'backend',
    //     path: 'backend',
    //     routeBasePath: 'backend',
    //     editUrl: ({ locale, versionDocsDirPath, docPath }) => {
    //       if (locale !== defaultLocale) {
    //         return `https://crowdin.com/project/docusaurus-v2/${locale}`
    //       }
    //       return `https://github.com/facebook/docusaurus/edit/main/website/${versionDocsDirPath}/${docPath}`
    //     },
    //     remarkPlugins: [npm2yarn],
    //     editCurrentVersion: true,
    //     sidebarPath: './sidebarsBackend.js',
    //     showLastUpdateAuthor: true,
    //     showLastUpdateTime: true
    //   } satisfies DocsOptions
    // ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'frontend',
        path: './frontend',
        routeBasePath: 'frontend',
        showReadingTime: true,
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'TS/JS',
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        postsPerPage: 10
      } satisfies BlogOptions
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'vue',
        path: './vue',
        routeBasePath: 'vue',
        showReadingTime: true,
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'Vue',
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        postsPerPage: 10
      } satisfies BlogOptions
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'react',
        path: './react',
        routeBasePath: 'react',
        showReadingTime: true,
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'React',
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        postsPerPage: 10
      } satisfies BlogOptions
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'chore',
        path: './chore',
        routeBasePath: 'chore',
        showReadingTime: true,
        blogSidebarCount: 'ALL',
        blogSidebarTitle: '项目构建',
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        postsPerPage: 10
      } satisfies BlogOptions
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'backend',
        path: './backend',
        routeBasePath: 'backend',
        showReadingTime: true,
        blogSidebarCount: 'ALL',
        blogSidebarTitle: '后端',
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        postsPerPage: 10
      } satisfies BlogOptions
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'algorithm',
        path: './algorithm',
        routeBasePath: 'algorithm',
        showReadingTime: true,
        blogSidebarCount: 'ALL',
        blogSidebarTitle: '算法',
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        postsPerPage: 10
      } satisfies BlogOptions
    ]
  ]
}

export default config

import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import Heading from '@theme/Heading'
import styles from './index.module.css'
import { usePluginData } from '@docusaurus/useGlobalData'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1>Blog</h1>

        <Heading as="h1" className="hero__title">
          Hello, {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            About Me - 5min ⏱️
          </Link>
        </div>
        <div className={styles.bg}>
          5555
          <div className={styles.pink}></div>
          <div className={styles.orange}></div>
          <div className={styles.blue}></div>
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  const myPluginData = usePluginData('docusaurus-plugin-content-blog')
  // const myPluginData = allPluginInstancesData['default']
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <div>{myPluginData}</div>
      </main>
    </Layout>
  )
}

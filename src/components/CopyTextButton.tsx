import Link from '@docusaurus/Link'
import React, { useState } from 'react'

export const CopyTextButton = ({ text, title }) => {
  const [copied, setCopied] = useState(false) // 跟踪复制状态

  const copyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('文本已成功复制到剪贴板：', text)
        setCopied(true) // 设置复制成功状态
        setTimeout(() => setCopied(false), 1000) // 2秒后重置状态
      })
      .catch((err) => {
        console.error('文本复制失败：', err)
      })
  }
  const ClickIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M7.5 2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5M3.61 3.61a.5.5 0 0 1 .708 0l1.414 1.415a.5.5 0 1 1-.707.707L3.611 4.318a.5.5 0 0 1 0-.707m7.78 0a.5.5 0 0 1 0 .708L9.974 5.732a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M2 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m5.5.532v9.26a.5.5 0 0 0 .854.354l2.56-2.56a2 2 0 0 1 1.414-.586h3.232a.5.5 0 0 0 .31-.892L8.31 7.639a.5.5 0 0 0-.81.393"
      />
    </svg>
  )
  const CopySuccessIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="#059669"
        d="M18.333 6A3.667 3.667 0 0 1 22 9.667v8.666A3.667 3.667 0 0 1 18.333 22H9.667A3.667 3.667 0 0 1 6 18.333V9.667A3.667 3.667 0 0 1 9.667 6zM15 2c1.094 0 1.828.533 2.374 1.514a1 1 0 1 1-1.748.972C15.405 4.088 15.284 4 15 4H5c-.548 0-1 .452-1 1v9.998c0 .32.154.618.407.805l.1.065a1 1 0 1 1-.99 1.738A3 3 0 0 1 2 15V5c0-1.652 1.348-3 3-3zm1.293 9.293L13 14.585l-1.293-1.292a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414"
      />
    </svg>
  )
  return (
    <>
      <Link
        className="button button--secondary button--lg"
        onClick={copyText}
        title={`Copy ${title}`}
        style={{ margin: '4px' }}
      >
        {text}
        {copied ? (
          <span style={{ display: 'inline-block', margin: 'auto 0.5em' }}>
            <CopySuccessIcon />
          </span>
        ) : (
          <span style={{ display: 'inline-block', margin: 'auto 0.5em' }}>
            <ClickIcon />
          </span>
        )}
      </Link>

      {copied}
    </>
  )
}

export default CopyTextButton

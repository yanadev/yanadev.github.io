import React from 'react'

const CopyTextButton = ({ text }) => {
  const copyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('文本已成功复制到剪贴板：', text)
        alert('文本已成功复制到剪贴板：' + text)
      })
      .catch((err) => {
        console.error('文本复制失败：', err)
        alert('文本复制失败，请手动复制：' + text)
      })
  }

  return <button onClick={copyText}>复制文本</button>
}

export default CopyTextButton

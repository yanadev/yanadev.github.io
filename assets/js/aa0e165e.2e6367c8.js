"use strict";(self.webpackChunkyana_github_io=self.webpackChunkyana_github_io||[]).push([[2755],{90770:n=>{n.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"intro","metadata":{"permalink":"/algorithm/intro","source":"@site/algorithm/2024-10-09-intro.md","title":"intro","description":"\u6211\u7684\u7b97\u6cd5\u7ec3\u4e60\u5c0f\u8bb0","date":"2024-10-09T00:00:00.000Z","tags":[],"readingTime":0.045,"hasTruncateMarker":false,"authors":[{"name":"Yana Ching","title":"Front End Engineer","url":"https://yamadev.github.io/","imageURL":"https://github.com/yanadev.png","key":"yana","page":null}],"frontMatter":{"slug":"intro","title":"intro","authors":"yana","tags":[]},"unlisted":false,"nextItem":{"title":"\u529b\u626334-\u5728\u6392\u5e8f\u6570\u7ec4\u4e2d\u67e5\u627e\u5143\u7d20\u7684\u7b2c\u4e00\u4e2a\u548c\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e[\u4e8c\u5206\u6cd5]","permalink":"/algorithm/binary-search-34"}},"content":"## \u6211\u7684\u7b97\u6cd5\u7ec3\u4e60\u5c0f\u8bb0"},{"id":"binary-search-34","metadata":{"permalink":"/algorithm/binary-search-34","source":"@site/algorithm/2024-10-08-\u529b\u626334-\u5728\u6392\u5e8f\u6570\u7ec4\u4e2d\u67e5\u627e\u5143\u7d20\u7684\u7b2c\u4e00\u4e2a\u548c\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e.md","title":"\u529b\u626334-\u5728\u6392\u5e8f\u6570\u7ec4\u4e2d\u67e5\u627e\u5143\u7d20\u7684\u7b2c\u4e00\u4e2a\u548c\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e[\u4e8c\u5206\u6cd5]","description":"\u539f\u9898","date":"2024-10-08T00:00:00.000Z","tags":[{"inline":true,"label":"algorithm","permalink":"/algorithm/tags/algorithm"},{"inline":true,"label":"leetcode","permalink":"/algorithm/tags/leetcode"},{"inline":true,"label":"BinarySearch","permalink":"/algorithm/tags/binary-search"},{"inline":true,"label":"BS","permalink":"/algorithm/tags/bs"}],"readingTime":4.74,"hasTruncateMarker":false,"authors":[{"name":"Yana Ching","title":"Front End Engineer","url":"https://yamadev.github.io/","imageURL":"https://github.com/yanadev.png","key":"yana","page":null}],"frontMatter":{"slug":"binary-search-34","title":"\u529b\u626334-\u5728\u6392\u5e8f\u6570\u7ec4\u4e2d\u67e5\u627e\u5143\u7d20\u7684\u7b2c\u4e00\u4e2a\u548c\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e[\u4e8c\u5206\u6cd5]","authors":"yana","tags":["algorithm","leetcode","BinarySearch","BS"]},"unlisted":false,"prevItem":{"title":"intro","permalink":"/algorithm/intro"},"nextItem":{"title":"\u529b\u6263704-\u4e8c\u5206\u67e5\u627e","permalink":"/algorithm/binary-search"}},"content":"## \u539f\u9898\\n\\n```text\\n\u7ed9\u4f60\u4e00\u4e2a\u6309\u7167\u975e\u9012\u51cf\u987a\u5e8f\u6392\u5217\u7684\u6574\u6570\u6570\u7ec4 nums\uff0c\u548c\u4e00\u4e2a\u76ee\u6807\u503c target\u3002\\n\\n\u8bf7\u4f60\u627e\u51fa\u7ed9\u5b9a\u76ee\u6807\u503c\u5728\u6570\u7ec4\u4e2d\u7684\u5f00\u59cb\u4f4d\u7f6e\u548c\u7ed3\u675f\u4f4d\u7f6e\u3002\\n\\n\u5982\u679c\u6570\u7ec4\u4e2d\u4e0d\u5b58\u5728\u76ee\u6807\u503c target\uff0c\u8fd4\u56de [-1, -1]\u3002\\n\\n\u4f60\u5fc5\u987b\u8bbe\u8ba1\u5e76\u5b9e\u73b0\u65f6\u95f4\u590d\u6742\u5ea6\u4e3a O(log n) \u7684\u7b97\u6cd5\u89e3\u51b3\u6b64\u95ee\u9898\u3002\\n\\n\\n\u793a\u4f8b 1\uff1a\\n\\n> \u8f93\u5165\uff1anums = [5,7,7,8,8,10], target = 8\\n> \u8f93\u51fa\uff1a[3,4]\\n\\n\u793a\u4f8b 2\uff1a\\n\\n> \u8f93\u5165\uff1anums = [5,7,7,8,8,10], target = 6\\n> \u8f93\u51fa\uff1a[-1,-1]\\n\\n\u793a\u4f8b 3\uff1a\\n\\n> \u8f93\u5165\uff1anums = [], target = 0\\n> \u8f93\u51fa\uff1a[-1,-1] :::tip\\n```\\n\\n:::tip\\n\\n- `0 <= nums.length <= 10\u2075`\\n\\n- `-10\u2079 <= nums[i] <= 10\u2079`\\n\\n- nums \u662f\u4e00\u4e2a\u975e\u9012\u51cf\u6570\u7ec4\\n\\n- `-10\u2079 <= target <= 10\u2079`\\n\\n:::\\n\\n## \u89e3\u9898\u601d\u8def\\n\\n**\u5df2\u77e5\uff1a**\\n\\n1. \u6570\u7ec4**\u6709\u5e8f** - \u5b9a\u4f4d `\u4e8c\u5206\u6cd5`\\n2. nums\\n3. target \u503c\\n4. \u6709\u53ef\u80fd\u6709**\u91cd\u590d\u5143\u7d20**\\n\\n**\u6c42\uff1a**\\n\\n1. target \u51fa\u73b0\u7684**\u7b2c\u4e00\u4e2a**\u51fa\u73b0\u7684\u4f4d\u7f6e\\n2. target \u51fa\u73b0\u7684**\u6700\u540e\u4e00\u4e2a**\u51fa\u73b0\u4f4d\u7f6e\\n\\n**\u5bfb\u627e\u6700\u5de6\uff1a**\\n\\n1.  \u627e\u5230 mid \u7b26\u5408 target \u4e4b\u540e\uff0c\u66f4\u65b0 LBoder \u4e3a mid\\n2.  \u5c06 **r \u79fb\u52a8\u5230 mid \u5de6\u8fb9\uff0c\u5bfb\u627e\u66f4\u5de6\u4fa7\u7684 target**\\n3.  \u6709\u5c31\u7ee7\u7eed\u6536\u7f29\uff0c\u6ca1\u6709\u76f4\u63a5\u8fd4\u56de -1\\n\\n**\u5bfb\u627e\u6700\u53f3\uff1a**\\n\\n1.  \u627e\u5230 mid \u7b26\u5408 target \u4e4b\u540e\uff0c\u66f4\u65b0 RBoder \u4e3a mid\\n2.  \u5c06 **l \u79fb\u52a8\u5230 mid \u53f3\u8fb9\uff0c\u5bfb\u627e\u66f4\u53f3\u4fa7\u7684 target**\\n3.  \u6709\u5c31\u7ee7\u7eed\u6536\u7f29\uff0c\u6ca1\u6709\u76f4\u63a5\u8fd4\u56de -1\\n\\n**\u660e\u786e\u9690\u85cf\u6761\u4ef6\uff1a**\\n\\n1. \u82e5\u627e\u4e0d\u5230 first\uff0c\u90a3\u4e48 last \u4e5f\u662f\u4e0d\u5b58\u5728\uff0c\u56e0\u6b64**\u9996\u6b21\u5224\u65ad first \u5b58\u5728\u4e0e\u5426\u518d\u51b3\u5b9a\u662f\u5426\u5bfb\u627e last**\\n2. \u5f53\u80fd\u627e\u5230 first \u65f6\uff0clast \u6700\u5c0f\u4e5f\u53ea\u80fd\u662f first\uff0c\u4e0d\u4f1a\u51fa\u73b0 -1\\n3. \u68c0\u67e5\u7a7a\u6570\u7ec4\uff0c\u7a7a\u6570\u7ec4\u76f4\u63a5\u8fd4\u56de [-1, -1]\\n\\n## \u89e3\u9898\u8fc7\u7a0b\\n\\n1. \u521d\u59cb\u5316\u5de6\u53f3\u6307\u9488\uff1aleft = 0, right = len(nums) - 1\\n2. \u4e8c\u5206\u67e5\u627e\u7b2c\u4e00\u4e2a\u4f4d\u7f6e\\n   - \u5982\u679c\u627e\u5230\u5339\u914d\u7684 target\uff0c\u5c06 right \u6307\u9488\u79fb\u5230\u4e2d\u70b9\u7684\u5de6\u4fa7\u7ee7\u7eed\u67e5\u627e\uff0c\u76f4\u5230\u9501\u5b9a\u7b2c\u4e00\u4e2a\u51fa\u73b0\u7684 target\u3002\\n3. \u4e8c\u5206\u67e5\u627e\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e\\n   - \u5982\u679c\u627e\u5230\u5339\u914d\u7684 target\uff0c\u5c06 left \u6307\u9488\u79fb\u5230\u4e2d\u70b9\u7684\u53f3\u4fa7\u7ee7\u7eed\u67e5\u627e\uff0c\u76f4\u5230\u9501\u5b9a\u6700\u540e\u4e00\u4e2a\u51fa\u73b0\u7684 target\u3002\\n4. \u8fd4\u56de\u7ed3\u679c\uff1a\u5982\u679c\u6ca1\u6709\u627e\u5230\u76ee\u6807\u503c\uff0c\u8fd4\u56de [-1, -1]\\n\\n## \u590d\u6742\u5ea6\\n\\n- \u65f6\u95f4\u590d\u6742\u5ea6: O(logN)\\n\\n- \u7a7a\u95f4\u590d\u6742\u5ea6: O(1)\\n\\n## \u4ee3\u7801\\n\\n```js\\n/**\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number[]}\\n */\\nvar searchRange = function (nums, target) {\\n  // \u76f4\u63a5\u68c0\u67e5\u7a7a\u6570\u7ec4\\n  const n = nums.length\\n  if (n === 0) return [-1, -1]\\n\\n  function getFirst(nums, target, n) {\\n    // [l, r]\\n    let l = 0\\n    let r = n - 1\\n    let first = -1\\n    while (l <= r) {\\n      const mid = (l + r) >>> 1\\n      // \u627e\u5230 target \u4f4d\u7f6e\u540e\u66f4\u65b0 first \u4f4d\u7f6e\uff0c\u6536\u7f29\u53f3\u8fb9\u754c\uff0c\u7ee7\u7eed\u5411mid\u5de6\u8fb9\u5bfb\u627e\u662f\u5426\u6709\u66f4\u5de6\u503c\\n      if (target === nums[mid]) {\\n        first = mid\\n        r = mid - 1\\n      } else if (target > nums[mid]) {\\n        l = mid + 1\\n      } else {\\n        r = mid - 1\\n      }\\n    }\\n    return first\\n  }\\n\\n  function getLast(nums, target, n) {\\n    // [l, r]\\n    let l = 0\\n    let r = n - 1\\n    let last = -1\\n    while (l <= r) {\\n      const mid = (l + r) >>> 1\\n      // \u627e\u5230 target \u4f4d\u7f6e\u540e\u66f4\u65b0 last \u4f4d\u7f6e\uff0c\u6536\u7f29\u5de6\u8fb9\u754c\uff0c\u7ee7\u7eed\u5411mid\u53f3\u8fb9\u5bfb\u627e\u662f\u5426\u6709\u66f4\u53f3\u503c\\n      if (target === nums[mid]) {\\n        last = mid\\n        l = mid + 1\\n      } else if (target > nums[mid]) {\\n        l = mid + 1\\n      } else {\\n        r = mid - 1\\n      }\\n    }\\n    return last\\n  }\\n  let first = getFirst(nums, target, n)\\n  // \u5982\u679c\u627e\u4e0d\u5230\u7b2c\u4e00\u4e2a\u4f4d\u7f6e\uff0c\u8bf4\u660e\u6570\u7ec4\u4e2d\u6ca1\u6709\u8fd9\u4e2a\u5143\u7d20\uff0c\u90a3\u4e48\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e\u4e5f\u662f\u627e\u4e0d\u5230\u7684\\n  // \u5faa\u73af\u6761\u4ef6\u4e0a\u7406\u89e3\u5219\u662f \u4e00\u65e6 left \u4e3a -1\u4e86\uff0c\u5728\u5faa\u73af\u6761\u4ef6 left <= right\u8fd9\u4e2a\u4e0a\uff0c right\u4e5f\u53ea\u80fd\u662f -1 \u4e86\\n  if (first === -1) return [-1, -1]\\n  // \u4e00\u65e6\u80fd\u591f\u627e\u5230\u7b2c\u4e00\u4e2a\u4f4d\u7f6e\uff0c\u90a3\u4e48 last \u6700\u5c0f\u4e5f\u53ea\u80fd\u662f first\\n  // \u5faa\u73af\u6761\u4ef6\u4e0a\u7406\u89e3\u5219\u662f \u4e00\u65e6 left > 0 \u4e86\uff0c\u5728\u5faa\u73af\u6761\u4ef6 left <= right\u8fd9\u4e2a\u4e0a\uff0c right\u4e5f\u53ea\u80fd\u662f > 0 \u4e86\\n  let last = getLast(nums, target, n)\\n  return [first, last]\\n}\\n```"},{"id":"binary-search","metadata":{"permalink":"/algorithm/binary-search","source":"@site/algorithm/2024-10-08-\u529b\u6263704-\u4e8c\u5206\u67e5\u627e.md","title":"\u529b\u6263704-\u4e8c\u5206\u67e5\u627e","description":"\u4e8c\u5206\u6cd5","date":"2024-10-08T00:00:00.000Z","tags":[{"inline":true,"label":"algorithm","permalink":"/algorithm/tags/algorithm"},{"inline":true,"label":"leetcode","permalink":"/algorithm/tags/leetcode"},{"inline":true,"label":"BinarySearch","permalink":"/algorithm/tags/binary-search"},{"inline":true,"label":"BS","permalink":"/algorithm/tags/bs"}],"readingTime":8.485,"hasTruncateMarker":true,"authors":[{"name":"Yana Ching","title":"Front End Engineer","url":"https://yamadev.github.io/","imageURL":"https://github.com/yanadev.png","key":"yana","page":null}],"frontMatter":{"slug":"binary-search","title":"\u529b\u6263704-\u4e8c\u5206\u67e5\u627e","authors":"yana","tags":["algorithm","leetcode","BinarySearch","BS"]},"unlisted":false,"prevItem":{"title":"\u529b\u626334-\u5728\u6392\u5e8f\u6570\u7ec4\u4e2d\u67e5\u627e\u5143\u7d20\u7684\u7b2c\u4e00\u4e2a\u548c\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e[\u4e8c\u5206\u6cd5]","permalink":"/algorithm/binary-search-34"},"nextItem":{"title":"\u529b\u6263209 - \u957f\u5ea6\u6700\u5c0f\u5b50\u6570\u7ec4[\u6ed1\u52a8\u7a97\u53e3]","permalink":"/algorithm/minimun-size-subarray-sum"}},"content":"## \u4e8c\u5206\u6cd5\\n\\n1. \u9002\u7528\u4e8e**\u6709\u5e8f**\u6570\u636e\u96c6\u5408\u6216\u8005**\u5355\u8c03**\u95ee\u9898\uff0c\u7528\u4e8e\u5feb\u901f\u67e5\u627e target\u3001min\u3001max\\n2. **\u4e0d\u9002\u5408**\u52a8\u6001\u6570\u636e\u7ed3\u6784\uff08\u94fe\u8868\u3001\u6811\uff09\u3001\u5c0f\u89c4\u6a21\u6570\u636e\\n\\n[\u529b\u6263 704-\u4e8c\u5206\u6cd5 \ud83d\udd17](https://leetcode.cn/problems/binary-search/)\\n\\n\x3c!-- truncate --\x3e\\n\\n## \u4f7f\u7528\u8303\u56f4\\n\\n1. \u5728\u5df2\u6392\u5e8f\u7684\u6570\u7ec4\u6216\u94fe\u8868\u4e2d\u67e5\u627e **\u76ee\u6807\u503c\u7684\u4f4d\u7f6e** \u6216 **\u9a8c\u8bc1\u8be5\u503c\u662f\u5426\u5b58\u5728**\\n2. \u533a\u95f4\u5185\u5bfb\u627e\u6700\u5927/\u5c0f\u503c\uff08max/min\uff09\\n\\n## \u9650\u5236\\n\\n1. \u5fc5\u987b\u6709\u5e8f\uff0c\u82e5\u6570\u636e\u65e0\u5e8f\uff0c\u9700\u8981\u5148\u6392\u5e8f\u4f1a\u589e\u52a0\u65f6\u95f4\u590d\u6742\u5ea6\\n2. \u4e0d\u662f\u52a8\u6001\u6570\u636e\u7ed3\u6784\uff08\u94fe\u8868\u3001\u6811\u7b49\uff09\uff0c**\u4e8c\u5206\u6cd5\u8981\u6c42\u76f4\u63a5\u8bbf\u95ee\u4e2d\u95f4\u5143\u7d20**\\n3. \u4e0d\u9002\u5408\u89c4\u6a21\u5c0f\u7684\u96c6\u5408\uff0c**\u5c11\u91cf\u6570\u636e\u7ebf\u6027\u67e5\u627e\u66f4\u52a0\u7b80\u5355\u76f4\u63a5**\\n\\n## \u624b\u5199\u4ee3\u7801\u6ce8\u610f\\n\\n### 1. \u786e\u4fdd\u4e2d\u95f4\u5143\u7d20\u4e0b\u6807\u4e3a\u6574\u578b\uff08integer\uff09\\n\\n### 2. \u660e\u786e\u533a\u95f4\u7684\u5b9a\u4e49\uff0c\u4fdd\u8bc1\u4ee3\u7801\u6574\u4f53\u4fdd\u6301\u8fd9\u4e2a\u533a\u95f4\u539f\u5219\\n\\n### 3. \u5916\u90e8 while \u5faa\u73af\u6761\u4ef6\u6ce8\u610f\u4e0d\u80fd\u8fdd\u53cd\u533a\u95f4\u5b9a\u4e49\\n\\n\u5982\u679c\u5047\u8bbe\u533a\u95f4\u4e3a`[left, right]`\uff0c \u5de6\u53f3\u5747\u95ed\u5408\u7684\u533a\u95f4\u5b58\u5728\u76f8\u7b49\u7684\u60c5\u51b5\uff0c\u56e0\u6b64 while \u6761\u4ef6\u53ef\u4ee5\u6709\u76f8\u7b49\u7684\u60c5\u51b5\\n\\n\u5982\u679c\u5047\u8bbe\u533a\u95f4\u4e3a `[left, right)`\u3001`\uff08left, right]`\uff0c \u5219\u5de6\u53f3\u76f8\u7b49\u7684\u60c5\u51b5\u662f\u76f8\u6096\u4e8e\u8fd9\u4e2a\u5047\u8bbe\u7684\u533a\u95f4\u5b9a\u4e49\u7684\uff0c\u4e0d\u5b58\u5728\u76f8\u7b49\u7684\u60c5\u51b5\\n\\n### 4. \u5185\u90e8\u5faa\u73af\u5224\u65ad nums[mid] \u4e0e target \u7684\u5927\u5c0f\u5173\u7cfb\u65f6\uff0c\u660e\u786e nums[mid] \u53ef\u5426\u52a0\u5165\u4e0b\u4e00\u6b21\u5faa\u73af\\n\\n\u5982\u679c\u5c06\u5df2\u7ecf\u6392\u9664\u7684 nums[mid] \u91cd\u65b0\u7f6e\u5165\u5faa\u73af\u4e2d\uff0c\u6709\u5bfc\u81f4\u6574\u4e2a\u7b97\u6cd5\u6b7b\u5faa\u73af\u7684\u98ce\u9669\uff0c\u56e0\u6b64\u66f4\u65b0 left\u3001right \u8303\u56f4\u7684\u65f6\u5019\uff0c\u9700\u8981\u660e\u786e\\nnums[mid] \u672c\u8eab\u662f\u5426\u53ef\u4ee5\u7ee7\u7eed\u52a0\u5165\u4e0b\u4e00\u4e2a\u5faa\u73af\\n\\n## \u4f18\u5316\u70b9\uff1a\u786e\u4fdd\u4e2d\u95f4\u5143\u7d20\u7684\u4e0b\u6807 mid \u4e3a\u6574\u578b\uff08int\uff09\\n\\n- \u4f7f\u7528 Math.floor() \u5411\u4e0b\u53d6\u6574 ---- \u6700\u5e38\u89c1\u3001\u53ef\u8bfb\u6027\u9ad8\\n\\n- \u4f7f\u7528\u4f4d\u64cd\u4f5c\u7684\u53f3\u79fb\u8fd0\u7b97\u7b26 `>>1` ---- \u6027\u80fd\u6700\u4f18\\n\\n  - (left + right) >> 1 \u76f8\u5f53\u4e8e (left + right) / 2 \u5e76\u53d6\u6574\uff0c\u540c\u65f6\u6027\u80fd\u66f4\u4f18\\n\\n- left + Math.floor((right - left) / 2) ---- \u907f\u514d left\u3001right \u975e\u5e38\u5927\u7684\u65f6\u5019\u6574\u6570\u6ea2\u51fa\\n\\n- parseInt((left + right) / 2) ---- \u76f8\u6bd4 Math.floor\u3001\u4f4d\u64cd\u4f5c\u7b26\u6027\u80fd\u7a0d\u5dee\\n\\n- Math.trunc((left + right) / 2) ---- \u65e0\u8bba\u6b63\u6570\u8d1f\u6570\uff0c\u76f4\u63a5\u53bb\u9664\u5c0f\u6570\u90e8\u5206\uff0c\u76f8\u6bd4\u4f4d\u64cd\u4f5c\u6027\u80fd\u7a0d\u5dee\\n\\n> \u5982\u679c\u9700\u8981\u6700\u7b80\u5355\u3001\u76f4\u89c2\u7684\u6574\u6570\u622a\u65ad\uff08\u7279\u522b\u662f\u8d1f\u6570\u65f6\uff09\uff0cMath.trunc() \u662f\u7406\u60f3\u9009\u62e9\u3002\\n>\\n> \u5982\u679c\u4e3b\u8981\u5904\u7406\u6b63\u6570\u4e14\u6027\u80fd\u8981\u6c42\u4e0d\u9ad8\uff0cMath.floor() \u4e5f\u662f\u5e38\u7528\u7684\u9009\u62e9\u3002\\n>\\n> \u5982\u679c\u9700\u8981\u6781\u9ad8\u7684\u6027\u80fd\u6216\u5bf9\u4f4d\u8fd0\u7b97\u6709\u7279\u6b8a\u9700\u6c42\uff0c\u4f4d\u79fb\u64cd\u4f5c\u7b26 >> \u66f4\u9ad8\u6548\u3002\\n\\n## \u4e3a\u4ec0\u4e48\u91c7\u53d6 Math.floor() \u5411\u4e0b\u53d6\u6574\uff0c\u800c\u975e\u5411\u4e0a\u53d6\u6574 Math.ceil()\\n\\n1. \u907f\u514d\u6b7b\u5faa\u73af\\n\\n\u4e00\u4e9b\u60c5\u51b5\u4e0b\u5411\u4e0a\u53d6\u6574\u5bfc\u81f4 **\u6c38\u8fdc\u65e0\u6cd5\u7f29\u5c0f** \u5de6\u53f3\u533a\u95f4\\n\\n\uff08\u5c24\u5176\u662f\u6570\u7ec4\u957f\u5ea6\u4e3a **\u5947\u6570** \u65f6\uff0c\u5411\u4e0a\u53d6\u6574\u4f1a\u5bfc\u81f4\u989d\u5916\u7684\u590d\u6742\u6027\uff09\\n\\n2. \u5e73\u8861\u6027\uff08\u7a33\u5b9a\u6027\u4e0e\u53ef\u9884\u6d4b\u6027\uff09\\n\\nMath.floor() \u4fdd\u8bc1\u5de6\u53f3\u533a\u95f4\u5212\u5206\u5747\u8861\\n\\nMath.floor()\uff1a\u6bcf\u6b21\u8fed\u4ee3\u4e2d\u5de6\u533a\u95f4\u53ef\u80fd\u6bd4\u53f3\u533a\u95f4\u7a0d\u5927\uff0c\u4f46\u53d8\u5316\u662f\u4e00\u81f4\u7684\uff0c\u5212\u5206\u7684\u8fc7\u7a0b\u662f\u53ef\u9884\u6d4b\u548c\u7a33\u5b9a\u7684\u3002\\n\\nMath.ceil()\uff1a\u5de6\u53f3\u533a\u95f4\u7684\u5212\u5206\u6709\u65f6\u5de6\u5927\uff0c\u6709\u65f6\u53f3\u5927\uff0c\u53d8\u5316\u662f\u4e0d\u7a33\u5b9a\u7684\uff0c\u5c24\u5176\u5728\u5947\u6570\u957f\u5ea6\u7684\u533a\u95f4\u91cc\uff0c\u53f3\u4fa7\u4f1a\u6bd4\u5de6\u4fa7\u66f4\u5c0f\u3002\\n\\n3. \u5b9e\u8df5\u9a8c\u8bc1\\n\\n\u957f\u671f\u65f6\u95f4\u9a8c\u8bc1\uff0cMath.floor() \u76f8\u5bf9\u4e8e Math.ceil() \u5728\u5904\u7406\u8fb9\u754c\u503c\u548c\u66f4\u65b0\u5de6\u53f3\u6307\u9488\u65f6\u7684\u590d\u6742\u5ea6\u660e\u663e\u4e0b\u964d\\n\\n## `>>` \u4e0e `>>>` \u6709\u4ec0\u4e48\u533a\u522b\uff1f\\n\\n1. `>>` \u6709\u7b26\u53f7\u53f3\u79fb\uff0c\u4f1a\u6839\u636e\u7b26\u53f7\u4f4d\u586b\u5145\u9ad8\u4f4d\uff0c\u4fdd\u7559\u8d1f\u6570\u7684\u7b26\u53f7\u3010\u9ad8\u4f4d\u6b63\u6570\u8865 0\u3001\u8d1f\u6570\u8865 1\u3011\\n2. `>>>` \u65e0\u7b26\u53f7\u53f3\u79fb\uff0c\u4e0d\u7ba1\u7b26\u53f7\uff0c\u603b\u662f\u7528 0 \u586b\u5145\u9ad8\u4f4d\uff0c\u56e0\u6b64\u8d1f\u6570\u4f1a\u53d8\u6210\u8f83\u5927\u7684\u6b63\u6570\\n\\n## \u4ee3\u7801\\n\\n### `[l, r]` \u5de6\u53f3\u95ed\u5408\u5199\u6cd5\\n\\n```javascript\\n/**\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number}\\n */\\nvar search = function (nums, target) {\\n  const n = nums.length\\n  let l = 0\\n  let mid = 0\\n  let r = n - 1 // \u95ed\u5408\u533a\u95f4\u4e2d r \u662f\u5305\u542b\uff0c\u6b64\u65f6 nums.length \u4e0b\u6807\u8d85\u51fa\u4e86\u6570\u7ec4\u7684\u957f\u5ea6\uff0c\u9700\u8981-1\\n\\n  // \u5047\u8bbe\u533a\u95f4\u4e3a [l, r],\u5de6\u53f3\u533a\u95f4\u90fd\u662f\u95ed\u5408\u7684\uff0c\u56e0\u6b64\u6709\u53ef\u80fd\u51fa\u73b0 l==r \u8fd9\u79cd\u60c5\u51b5\\n  while (l <= r) {\\n    mid = (l + r) >>> 1 // \u8fd9\u91cc\u76f8\u5f53\u4e8e ( l + r ) / 2 \u4e4b\u540e\u53d6\u6574\uff0c\u786e\u4fdd\u6700\u7ec8 mid \u8fd8\u662f\u6574\u578b\\n\\n    if (nums[mid] === target) return mid\\n\\n    if (nums[mid] > target) {\\n      // \u4e0d\u80fd\u8bbe\u7f6e r = mid\uff0c\u5df2\u7ecf\u660e\u786e nums[mid] > target \u5373 \u6b64\u65f6\u7684 mid \u7edd\u5bf9\u4e0d\u5305\u542b target\\n      // \u82e5\u91cd\u65b0\u5c06\u8fd9\u4e2a\u4e0d\u7b26\u5408\u7684\u8303\u56f4\u7eb3\u5165\u5faa\u73af\uff0c\u6709\u53ef\u80fd\u5f15\u8d77\u6b7b\u5faa\u73af\\n      r = mid - 1\\n    } else {\\n      l = mid + 1\\n    }\\n  }\\n  return -1\\n}\\n```\\n\\n### `[l, r)` \u5de6\u95ed\u53f3\u5f00\u5199\u6cd5\\n\\n```javascript\\n/**\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number}\\n */\\nvar search = function (nums, target) {\\n  // \u5047\u8bbe\u533a\u95f4\u4e3a [l, r)\\n  let mid = 0\\n  let l = 0\\n  let r = nums.length // \u6b64\u65f6\u53f3\u533a\u95f4\u662f\u4e0d\u5305\u542b\u7684\uff0c\u6240\u4ee5\u4e0d\u9700\u8981\u51cf 1\\n\\n  // \u5347\u5e8f\u6570\u7ec4\uff0c[l, r) \u533a\u95f4\uff0cl == r \u8fd9\u79cd\u60c5\u51b5\u4e0e\u533a\u95f4\u5b9a\u4e49\u76f8\u6096\uff0c\u56e0\u6b64\u5faa\u73af\u6761\u4ef6\u4e3a l < r\\n  while (l < r) {\\n    mid = (l + r) >>> 1\\n    if (nums[mid] === target) return mid\\n    // \u4e2d\u4f4d\u6570\u4e0e target \u7684\u5173\u7cfb\u753b\u56fe\u4f1a\u66f4\u52a0\u6e05\u6670\\n    if (nums[mid] > target) {\\n      r = mid // \u53f3\u533a\u95f4\u662f\u5f00\u5408\u7684\uff0c\u56e0\u6b64 mid \u672c\u8eab\u662f\u4e0d\u5305\u542b\u7684\uff0c\u4e0d\u9700\u8981\u51cf\u4e00\u6392\u9664\\n    } else {\\n      l = mid + 1\\n    }\\n  }\\n  return -1\\n}\\n```\\n\\n### \u53d6\u4e2d\u4f4d\u6570\u7684\u5199\u6cd5\\n\\n```javascript\\nlet mid = (l + r) >>> 1\\n\\n/**\\n * \u6cd5\u4e00\uff1a\u65e0\u7b26\u53f7\u53f3\u79fb\u64cd\u4f5c\u7b26\uff0c\u76f8\u5f53\u4e8e l + r \u9664\u4ee5 2 \u4e4b\u540e\u53d6\u6574\\n *\\n * \u4f18\uff1a\u907f\u514d\u6ea2\u51fa\uff1b\u6548\u7387\u4e0a\u6bd4\u6570\u5b66\u8fd0\u7b97\u66f4\u5feb\uff08\u73b0\u4ee3JS\u5f15\u64ce\u5dee\u5f02\u5fae\u4e4e\u5176\u5fae\uff09\\n *\\n * \u52a3\uff1a\u53ef\u8bfb\u6027\u5dee\uff0c\u5bf9\u4e8e\u4e0d\u719f\u6089\u4f4d\u8fd0\u7b97\u7684\u5f00\u53d1\u8005\u800c\u8a00\uff0c\u4e0d\u5982\u6570\u5b66\u8fd0\u7b97\u76f4\u89c2\\n */\\n```\\n\\n```javascript\\nlet mid = Math.floor((l + r) / 2)\\n\\n/**\\n * \u6cd5\u4e8c\uff1a\u8ba1\u7b97\u5e73\u5747\u503c\u4e4b\u540e\u5411\u4e0b\u53d6\u6574\\n *\\n * \u4f18\uff1a\u53ef\u8bfb\u6027\u9ad8\uff0c\u76f4\u89c2\u6613\u7406\u89e3\\n *\\n * \u52a3\uff1al\u3001r\u8fc7\u5927\u65f6\u6709\u6574\u6570\u6ea2\u51fa\u98ce\u9669\uff1b\u6027\u80fd\u76f8\u5bf9\u4e8e\u4f4d\u64cd\u4f5c\u7b26\u7565\u900a\u4e00\u7b79\uff08\u5927\u591a\u6570\u60c5\u51b5\u4e0b\u5f71\u54cd\u5fae\u4e4e\u5176\u5fae\uff09\\n */\\n```\\n\\n```javascript\\nlet mid = l + Math.floor((r - l) / 2)\\n\\n/**\\n * \u6cd5\u4e09\uff1a\u8ba1\u7b97 r-l \u4e2d\u4f4d\u6570\uff0c\u518d\u52a0\u4e0a\u5de6\u533a\u95f4\\n *\\n * \u4f18\uff1a\u907f\u514d\u6574\u6570\u6ea2\u51fa\uff1b\u6e05\u6670\uff1a\u8ba1\u7b97\u533a\u95f4\u4e2d\u4f4d\u6570\uff0c\u518d\u52a0\u4e0a\u5de6\u533a\u95f4\\n *\\n * \u52a3\uff1a\u5bf9\u6bd4\u76f4\u63a5\u76f8\u52a0\u53d6\u4e2d\u4f4d\u6570\uff0c\u7a0d\u663e\u590d\u6742\\n */\\n```\\n\\n### \u603b\u7ed3\\n\\n\u9009\u62e9\u4f7f\u7528\u54ea\u79cd\u5199\u6cd5\u4e3b\u8981\u53d6\u51b3\u4e8e\u4ee5\u4e0b\u51e0\u4e2a\u56e0\u7d20\uff1a\\n\\n- \u53ef\u8bfb\u6027\uff1a\u5728\u56e2\u961f\u4e2d\uff0c\u9009\u62e9\u66f4\u6613\u8bfb\u7684\u5199\u6cd5\u53ef\u80fd\u66f4\u53d7\u6b22\u8fce\uff0c\u5c24\u5176\u662f\u65b0\u624b\u5f00\u53d1\u8005\u3002\\n- \u6027\u80fd\uff1a\u5728\u6027\u80fd\u8981\u6c42\u9ad8\u7684\u573a\u666f\u4e0b\uff0c\u53ef\u80fd\u4f1a\u503e\u5411\u4e8e\u4f7f\u7528\u4f4d\u8fd0\u7b97\u3002\\n- \u907f\u514d\u6ea2\u51fa\uff1a\u5982\u679c\u62c5\u5fc3 l + r \u4f1a\u5bfc\u81f4\u6ea2\u51fa\uff0c\u4f7f\u7528 l + Math.floor((r - l) / 2) \u662f\u66f4\u5b89\u5168\u7684\u9009\u62e9\u3002\\n\\n## \u76f8\u5173\u9898\u76ee\\n\\n- [\u529b\u6263 34-\u5728\u6392\u5e8f\u6570\u7ec4\u4e2d\u67e5\u627e\u5143\u7d20\u7684\u7b2c\u4e00\u4e2a\u548c\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e \ud83d\udd17](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/)\\n- [\u529b\u6263 35-\u641c\u7d22\u63d2\u5165\u4f4d\u7f6e \ud83d\udd17](https://leetcode.cn/problems/search-insert-position/description/)\\n- [\u529b\u6263 69-x \u7684\u5e73\u65b9\u6839 \ud83d\udd17](https://leetcode.cn/problems/sqrtx/description/)\\n- [\u529b\u6263 367-\u6709\u6548\u7684\u5b8c\u5168\u5e73\u65b9\u6570 \ud83d\udd17](https://leetcode.cn/problems/valid-perfect-square/description/)"},{"id":"minimun-size-subarray-sum","metadata":{"permalink":"/algorithm/minimun-size-subarray-sum","source":"@site/algorithm/2024-03-18-\u529b\u6263209-\u957f\u5ea6\u6700\u5c0f\u5b50\u6570\u7ec4.md","title":"\u529b\u6263209 - \u957f\u5ea6\u6700\u5c0f\u5b50\u6570\u7ec4[\u6ed1\u52a8\u7a97\u53e3]","description":"\u539f\u9898\u63cf\u8ff0","date":"2024-03-18T00:00:00.000Z","tags":[{"inline":true,"label":"\u6ed1\u52a8\u7a97\u53e3","permalink":"/algorithm/tags/\u6ed1\u52a8\u7a97\u53e3"},{"inline":true,"label":"algorithm","permalink":"/algorithm/tags/algorithm"},{"inline":true,"label":"leetcode","permalink":"/algorithm/tags/leetcode"}],"readingTime":3.21,"hasTruncateMarker":false,"authors":[{"name":"Yana Ching","title":"Front End Engineer","url":"https://yamadev.github.io/","imageURL":"https://github.com/yanadev.png","key":"yana","page":null}],"frontMatter":{"slug":"minimun-size-subarray-sum","title":"\u529b\u6263209 - \u957f\u5ea6\u6700\u5c0f\u5b50\u6570\u7ec4[\u6ed1\u52a8\u7a97\u53e3]","authors":"yana","tags":["\u6ed1\u52a8\u7a97\u53e3","algorithm","leetcode"]},"unlisted":false,"prevItem":{"title":"\u529b\u6263704-\u4e8c\u5206\u67e5\u627e","permalink":"/algorithm/binary-search"}},"content":"## \u539f\u9898\u63cf\u8ff0\\n\\n:::tip\\n\\n\u7ed9\u5b9a\u4e00\u4e2a\u542b\u6709 n \u4e2a\u6b63\u6574\u6570\u7684\u6570\u7ec4\u548c\u4e00\u4e2a\u6b63\u6574\u6570 target \u3002\\n\\n\u627e\u51fa\u8be5\u6570\u7ec4\u4e2d\u6ee1\u8db3\u5176\u603b\u548c\u5927\u4e8e\u7b49\u4e8e target \u7684\u957f\u5ea6\u6700\u5c0f\u7684 \u8fde\u7eed\u5b50\u6570\u7ec4 [numsl, numsl+1, ..., numsr-1, numsr] \uff0c\u5e76\u8fd4\u56de\u5176\u957f\u5ea6\u3002\u5982\u679c\\n\u4e0d\u5b58\u5728\u7b26\u5408\u6761\u4ef6\u7684\u5b50\u6570\u7ec4\uff0c\u8fd4\u56de 0 \u3002\\n\\n:::\\n\\n```js\\n\\n\u793a\u4f8b 1\uff1a\\n\\n\u8f93\u5165\uff1atarget = 7, nums = [2,3,1,2,4,3]\\n\u8f93\u51fa\uff1a2\\n\u89e3\u91ca\uff1a\u5b50\u6570\u7ec4 [4,3] \u662f\u8be5\u6761\u4ef6\u4e0b\u7684\u957f\u5ea6\u6700\u5c0f\u7684\u5b50\u6570\u7ec4\u3002\\n\u793a\u4f8b 2\uff1a\\n\\n\u8f93\u5165\uff1atarget = 4, nums = [1,4,4]\\n\u8f93\u51fa\uff1a1\\n\u793a\u4f8b 3\uff1a\\n\\n\u8f93\u5165\uff1atarget = 11, nums = [1,1,1,1,1,1,1,1]\\n\u8f93\u51fa\uff1a0\\n\\n\u63d0\u793a\uff1a\\n\\n* 1 <= target <= 109\\n* 1 <= nums.length <= 105\\n* 1 <= nums[i] <= 105\\n\\n```\\n\\n## \u6ed1\u52a8\u7a97\u53e3\u89e3\u6cd5\\n\\n\u6574\u4f53\u7684\u89e3\u9898\u601d\u8def\u662f\\n\\n1. \u904d\u5386 t \u4e2d\u6240\u6709\u5b57\u7b26\uff0c\u8bb0\u5f55\u6240\u6709\u5b57\u7b26\u7684\u51fa\u73b0\u6b21\u6570\\n2. \u5224\u65ad left-right \u533a\u95f4\u5185\u7684\u503c\u662f\u5426\u5305\u542b t \u4e2d\u6240\u6709\u7684\u5143\u7d20\\n3. \u5982\u679c\u5305\u542b\u4e86\uff0c\u5224\u65ad\u5f53\u524d\u5b57\u4e32\u4e0e\u5df2\u8bb0\u5f55\u7684\u6700\u5c0f\u5b57\u4e32\uff0c\u7b26\u5408\u66f4\u5c0f\u6807\u51c6\u5219\u66f4\u65b0 minL \u548c minStart\\n4. \u5728\u5df2\u7ecf\u5305\u542b\u6240\u6709 t \u4e2d\u5143\u7d20\u7684\u57fa\u7840\u4e0a\uff0c\u79fb\u52a8\u5de6\u6307\u9488\uff0c\u79fb\u52a8\u5de6\u6307\u9488\u4e4b\u524d\u5c06\u5de6\u6307\u9488\u5143\u7d20\u52a0\u5230\u539f\u6765\u7684\u54c8\u5e0c\u8868\u4e2d\uff08\u4e0d\u5f71\u54cd\uff0c\u56e0\u4e3a\u4e0d\u5728 t \u4e2d\u5143\u7d20\\n   \u5728\u54c8\u5e0c\u8868\u4e2d\u67e5\u8be2\u7684\u7ed3\u679c\u662f undefined\uff0c\u6b64\u65f6\u76f4\u63a5\u52a0 1\uff0c\u7ed3\u679c\u5c31\u662f NaN\uff0c\u4e0d\u5f71\u54cd\u7b97\u6cd5\u7ed3\u679c\uff09\\n\\n\u4f18\u5316\u70b9\uff1a\\n\\n1. \u53ea\u7528\u4e86\u4e00\u4e2a\u54c8\u5e0c\u8868\uff08\u7a7a\u95f4\u590d\u6742\u5ea6\u4e0a\u51cf\u5c0f\u4e86\uff09\\n2. \u6bcf\u6b21\u53ea\u66f4\u65b0\u5b50\u4e32\u7684\u5934\u8282\u70b9\u548c\u957f\u5ea6\uff0c\u4ec5\u5728\u6700\u540e\u7ed3\u679c\u65f6\u5019\u505a\u5b57\u7b26\u4e32\u622a\u53d6\\n\\n```js\\n/**\\n * @param {string} s\\n * @param {string} t\\n * @return {string}\\n */\\nfunction minWindow(s, t) {\\n  let left = 0\\n  let right = 0\\n  let required = t.length\\n  let minL = Infinity\\n  let minStart = 0\\n  const ht = {}\\n  for (let ct of t) {\\n    ht[ct] = (ht[ct] || 0) + 1\\n  }\\n\\n  let n = s.length\\n  while (right < n) {\\n    // right \u6307\u9488\u8d70\u5b8c s \u7684\u957f\u5ea6\u4e3a\u6b62\\n    let retR = s[right]\\n    if (ht[retR] > 0) {\\n      // \u5982\u679c\u662ft\u4e2d\u5143\u7d20\u7684\u8bdd\uff0c\u503c\u4e3a\u6570\u503c\uff0c\u800c\u4e0d\u662f undefined\\n      required--\\n    }\\n    ht[retR]-- // \u65e0\u8bba\u662f\u5426\u4e3a t \u4e2d\u5143\u7d20\uff0c\u76f4\u63a5\u81ea\u51cf\u53bb\u54c8\u5e0c\u503c undefined - 1 = NaN\\n    right++\\n\\n    while (required === 0) {\\n      // \u5224\u65ad\u533a\u95f4\u957f\u5ea6\u662f\u5426\u5c0f\u4e8e minL\uff0c\u5982\u679c\u5c0f\u4e8e\u5219\u66f4\u65b0 minL\u3001minStart\\n      if (right - left < minL) {\\n        minL = right - left\\n        minStart = left\\n      }\\n      // \u53f3\u79fb\u5de6\u6307\u9488\uff0c\u6bcf\u6b21\u79fb\u52a8\u90fd\u76f4\u63a5\u589e\u52a0\u54c8\u5e0c\u8868\u4e2d\u8be5\u5143\u7d20\u503c\uff08undefined + 1 = NaN \u4e0d\u5f71\u54cd\u7b97\u6cd5\uff09\\n      let retL = s[left]\\n      ht[retL]++\\n      // \u82e5\u662f\u8be5\u54c8\u5e0c\u503c\u5927\u4e8e\u96f6\uff0c\u5219 left \u6240\u6307\u7684\u5143\u7d20\u662f t \u4e2d\u503c\\n      if (ht[retL] > 0) required++\\n      left++\\n    }\\n  }\\n  return minL === Infinity ? \'\' : s.substring(minStart, minStart + minL)\\n}\\n```"}]}}')}}]);
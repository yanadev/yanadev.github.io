"use strict";(self.webpackChunkyana_github_io=self.webpackChunkyana_github_io||[]).push([[3764],{43772:(n,r,t)=>{t.r(r),t.d(r,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>m});var e=t(74848),i=t(28453);const s={slug:"minimun-size-subarray-sum",title:"\u529b\u6263209 - \u957f\u5ea6\u6700\u5c0f\u5b50\u6570\u7ec4",authors:"yana",tags:["\u6ed1\u52a8\u7a97\u53e3","\u7b97\u6cd5"]},a=void 0,l={permalink:"/algorithm/minimun-size-subarray-sum",source:"@site/algorithm/2024-03-18-\u529b\u6263209-\u957f\u5ea6\u6700\u5c0f\u5b50\u6570\u7ec4.md",title:"\u529b\u6263209 - \u957f\u5ea6\u6700\u5c0f\u5b50\u6570\u7ec4",description:"\u539f\u9898\u63cf\u8ff0",date:"2024-03-18T00:00:00.000Z",formattedDate:"2024\u5e743\u670818\u65e5",tags:[{label:"\u6ed1\u52a8\u7a97\u53e3",permalink:"/algorithm/tags/\u6ed1\u52a8\u7a97\u53e3"},{label:"\u7b97\u6cd5",permalink:"/algorithm/tags/\u7b97\u6cd5"}],readingTime:3.155,hasTruncateMarker:!1,authors:[{name:"Yana Ching",title:"Front End Engineer",url:"https://yamadev.github.io/",imageURL:"https://github.com/yanadev.png",key:"yana"}],frontMatter:{slug:"minimun-size-subarray-sum",title:"\u529b\u6263209 - \u957f\u5ea6\u6700\u5c0f\u5b50\u6570\u7ec4",authors:"yana",tags:["\u6ed1\u52a8\u7a97\u53e3","\u7b97\u6cd5"]},unlisted:!1,prevItem:{title:"intro",permalink:"/algorithm/intro"}},o={authorsImageUrls:[void 0]},m=[{value:"\u539f\u9898\u63cf\u8ff0",id:"\u539f\u9898\u63cf\u8ff0",level:2},{value:"\u6ed1\u52a8\u7a97\u53e3\u89e3\u6cd5",id:"\u6ed1\u52a8\u7a97\u53e3\u89e3\u6cd5",level:2}];function u(n){const r={admonition:"admonition",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.R)(),...n.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(r.h2,{id:"\u539f\u9898\u63cf\u8ff0",children:"\u539f\u9898\u63cf\u8ff0"}),"\n",(0,e.jsxs)(r.admonition,{type:"tip",children:[(0,e.jsx)(r.p,{children:"\u7ed9\u5b9a\u4e00\u4e2a\u542b\u6709 n \u4e2a\u6b63\u6574\u6570\u7684\u6570\u7ec4\u548c\u4e00\u4e2a\u6b63\u6574\u6570 target \u3002"}),(0,e.jsx)(r.p,{children:"\u627e\u51fa\u8be5\u6570\u7ec4\u4e2d\u6ee1\u8db3\u5176\u603b\u548c\u5927\u4e8e\u7b49\u4e8e target \u7684\u957f\u5ea6\u6700\u5c0f\u7684 \u8fde\u7eed\u5b50\u6570\u7ec4\r\n[numsl, numsl+1, ..., numsr-1, numsr] \uff0c\u5e76\u8fd4\u56de\u5176\u957f\u5ea6\u3002\u5982\u679c\u4e0d\u5b58\u5728\u7b26\u5408\u6761\u4ef6\u7684\u5b50\u6570\u7ec4\uff0c\u8fd4\u56de 0 \u3002"})]}),"\n",(0,e.jsx)(r.pre,{children:(0,e.jsx)(r.code,{className:"language-js",children:"\r\n\u793a\u4f8b 1\uff1a\r\n\r\n\u8f93\u5165\uff1atarget = 7, nums = [2,3,1,2,4,3]\r\n\u8f93\u51fa\uff1a2\r\n\u89e3\u91ca\uff1a\u5b50\u6570\u7ec4 [4,3] \u662f\u8be5\u6761\u4ef6\u4e0b\u7684\u957f\u5ea6\u6700\u5c0f\u7684\u5b50\u6570\u7ec4\u3002\r\n\u793a\u4f8b 2\uff1a\r\n\r\n\u8f93\u5165\uff1atarget = 4, nums = [1,4,4]\r\n\u8f93\u51fa\uff1a1\r\n\u793a\u4f8b 3\uff1a\r\n\r\n\u8f93\u5165\uff1atarget = 11, nums = [1,1,1,1,1,1,1,1]\r\n\u8f93\u51fa\uff1a0\r\n\r\n\u63d0\u793a\uff1a\r\n\r\n* 1 <= target <= 109\r\n* 1 <= nums.length <= 105\r\n* 1 <= nums[i] <= 105\r\n\n"})}),"\n",(0,e.jsx)(r.h2,{id:"\u6ed1\u52a8\u7a97\u53e3\u89e3\u6cd5",children:"\u6ed1\u52a8\u7a97\u53e3\u89e3\u6cd5"}),"\n",(0,e.jsx)(r.p,{children:"\u6574\u4f53\u7684\u89e3\u9898\u601d\u8def\u662f"}),"\n",(0,e.jsxs)(r.ol,{children:["\n",(0,e.jsx)(r.li,{children:"\u904d\u5386 t \u4e2d\u6240\u6709\u5b57\u7b26\uff0c\u8bb0\u5f55\u6240\u6709\u5b57\u7b26\u7684\u51fa\u73b0\u6b21\u6570"}),"\n",(0,e.jsx)(r.li,{children:"\u5224\u65ad left-right \u533a\u95f4\u5185\u7684\u503c\u662f\u5426\u5305\u542b t \u4e2d\u6240\u6709\u7684\u5143\u7d20"}),"\n",(0,e.jsx)(r.li,{children:"\u5982\u679c\u5305\u542b\u4e86\uff0c\u5224\u65ad\u5f53\u524d\u5b57\u4e32\u4e0e\u5df2\u8bb0\u5f55\u7684\u6700\u5c0f\u5b57\u4e32\uff0c\u7b26\u5408\u66f4\u5c0f\u6807\u51c6\u5219\u66f4\u65b0 minL \u548c minStart"}),"\n",(0,e.jsx)(r.li,{children:"\u5728\u5df2\u7ecf\u5305\u542b\u6240\u6709 t \u4e2d\u5143\u7d20\u7684\u57fa\u7840\u4e0a\uff0c\u79fb\u52a8\u5de6\u6307\u9488\uff0c\u79fb\u52a8\u5de6\u6307\u9488\u4e4b\u524d\u5c06\u5de6\u6307\u9488\u5143\u7d20\u52a0\u5230\u539f\u6765\u7684\u54c8\u5e0c\u8868\u4e2d\uff08\u4e0d\u5f71\u54cd\uff0c\u56e0\u4e3a\u4e0d\u5728 t \u4e2d\u5143\u7d20\u5728\u54c8\u5e0c\u8868\u4e2d\u67e5\u8be2\u7684\u7ed3\u679c\u662f undefined\uff0c\u6b64\u65f6\u76f4\u63a5\u52a01\uff0c\u7ed3\u679c\u5c31\u662f NaN\uff0c\u4e0d\u5f71\u54cd\u7b97\u6cd5\u7ed3\u679c\uff09"}),"\n"]}),"\n",(0,e.jsx)(r.p,{children:"\u4f18\u5316\u70b9\uff1a"}),"\n",(0,e.jsxs)(r.ol,{children:["\n",(0,e.jsx)(r.li,{children:"\u53ea\u7528\u4e86\u4e00\u4e2a\u54c8\u5e0c\u8868\uff08\u7a7a\u95f4\u590d\u6742\u5ea6\u4e0a\u51cf\u5c0f\u4e86\uff09"}),"\n",(0,e.jsx)(r.li,{children:"\u6bcf\u6b21\u53ea\u66f4\u65b0\u5b50\u4e32\u7684\u5934\u8282\u70b9\u548c\u957f\u5ea6\uff0c\u4ec5\u5728\u6700\u540e\u7ed3\u679c\u65f6\u5019\u505a\u5b57\u7b26\u4e32\u622a\u53d6"}),"\n"]}),"\n",(0,e.jsx)(r.pre,{children:(0,e.jsx)(r.code,{className:"language-js",children:"/**\r\n * @param {string} s\r\n * @param {string} t\r\n * @return {string}\r\n */\r\nfunction minWindow(s, t) {\r\n   let left = 0\r\n   let right = 0 \r\n   let required = t.length\r\n   let minL = Infinity\r\n   let minStart = 0\r\n   const ht = {}\r\n   for(let ct of t){\r\n        ht[ct] = (ht[ct] || 0) + 1\r\n   }\r\n\r\n   let n = s.length\r\n   while(right < n){\r\n        // right \u6307\u9488\u8d70\u5b8c s \u7684\u957f\u5ea6\u4e3a\u6b62\r\n        let retR = s[right]\r\n        if(ht[retR] > 0){\r\n            // \u5982\u679c\u662ft\u4e2d\u5143\u7d20\u7684\u8bdd\uff0c\u503c\u4e3a\u6570\u503c\uff0c\u800c\u4e0d\u662f undefined\r\n            required--\r\n        }\r\n        ht[retR]-- // \u65e0\u8bba\u662f\u5426\u4e3a t \u4e2d\u5143\u7d20\uff0c\u76f4\u63a5\u81ea\u51cf\u53bb\u54c8\u5e0c\u503c undefined - 1 = NaN\r\n        right++\r\n\r\n        while(required === 0){\r\n            // \u5224\u65ad\u533a\u95f4\u957f\u5ea6\u662f\u5426\u5c0f\u4e8e minL\uff0c\u5982\u679c\u5c0f\u4e8e\u5219\u66f4\u65b0 minL\u3001minStart\r\n            if(right - left < minL){\r\n                minL = right - left\r\n                minStart = left\r\n            }\r\n            // \u53f3\u79fb\u5de6\u6307\u9488\uff0c\u6bcf\u6b21\u79fb\u52a8\u90fd\u76f4\u63a5\u589e\u52a0\u54c8\u5e0c\u8868\u4e2d\u8be5\u5143\u7d20\u503c\uff08undefined + 1 = NaN \u4e0d\u5f71\u54cd\u7b97\u6cd5\uff09\r\n            let retL = s[left]\r\n            ht[retL]++\r\n            // \u82e5\u662f\u8be5\u54c8\u5e0c\u503c\u5927\u4e8e\u96f6\uff0c\u5219 left \u6240\u6307\u7684\u5143\u7d20\u662f t \u4e2d\u503c\r\n            if(ht[retL] > 0) required++\r\n            left++\r\n        }\r\n        \r\n   }\r\n   return minL === Infinity ? '' : s.substring(minStart, minStart + minL)\r\n}\r\n\r\n\n"})})]})}function h(n={}){const{wrapper:r}={...(0,i.R)(),...n.components};return r?(0,e.jsx)(r,{...n,children:(0,e.jsx)(u,{...n})}):u(n)}},28453:(n,r,t)=>{t.d(r,{R:()=>a,x:()=>l});var e=t(96540);const i={},s=e.createContext(i);function a(n){const r=e.useContext(s);return e.useMemo((function(){return"function"==typeof n?n(r):{...r,...n}}),[r,n])}function l(n){let r;return r=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:a(n.components),e.createElement(s.Provider,{value:r},n.children)}}}]);
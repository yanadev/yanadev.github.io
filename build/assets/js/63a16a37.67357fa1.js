"use strict";(self.webpackChunkyana_github_io=self.webpackChunkyana_github_io||[]).push([[6122],{14909:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>o,frontMatter:()=>i,metadata:()=>t,toc:()=>a});var s=r(74848),d=r(28453);const i={slug:"ajax-dynamic",title:"AJAX \u52a8\u6001\u52a0\u8f7d",authors:"yana",tags:["AJAX","JS"]},l=void 0,t={permalink:"/frontend/ajax-dynamic",source:"@site/frontend/2020-03-31-AJAX-\u52a8\u6001\u52a0\u8f7d.md",title:"AJAX \u52a8\u6001\u52a0\u8f7d",description:"\u524d\u60c5",date:"2020-03-31T00:00:00.000Z",tags:[{inline:!0,label:"AJAX",permalink:"/frontend/tags/ajax"},{inline:!0,label:"JS",permalink:"/frontend/tags/js"}],readingTime:4.1,hasTruncateMarker:!1,authors:[{name:"Yana Ching",title:"Front End Engineer",url:"https://yamadev.github.io/",imageURL:"https://github.com/yanadev.png",key:"yana",page:null}],frontMatter:{slug:"ajax-dynamic",title:"AJAX \u52a8\u6001\u52a0\u8f7d",authors:"yana",tags:["AJAX","JS"]},unlisted:!1,prevItem:{title:"TypeScript",permalink:"/frontend/typescript"},nextItem:{title:"JS \u539f\u751f\u521b\u5efa\u5bf9\u8c61",permalink:"/frontend/JS-origin"}},c={authorsImageUrls:[void 0]},a=[{value:"\u524d\u60c5",id:"\u524d\u60c5",level:2},{value:"AJAX \uff08 Asynchronous JavaScript and XML \uff09",id:"ajax--asynchronous-javascript-and-xml-",level:2},{value:"AJAX \u57fa\u672c\u4f7f\u7528",id:"ajax-\u57fa\u672c\u4f7f\u7528",level:2},{value:"readyState \u6709\u4e94\u79cd\u72b6\u6001\uff0c\u56db\u4e2a\u9636\u6bb5\uff080~1\u3001...\uff09",id:"readystate-\u6709\u4e94\u79cd\u72b6\u6001\u56db\u4e2a\u9636\u6bb501",level:2},{value:"\u7ebf\u7a0b\u4e0e\u8fdb\u7a0b",id:"\u7ebf\u7a0b\u4e0e\u8fdb\u7a0b",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}];function h(e){const n={admonition:"admonition",code:"code",h2:"h2",li:"li",mdxAdmonitionTitle:"mdxAdmonitionTitle",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"\u524d\u60c5",children:"\u524d\u60c5"}),"\n",(0,s.jsx)(n.p,{children:"Web \u7a0b\u5e8f\u6700\u521d\u7684\u76ee\u7684\u662f\uff1a\u5171\u4eab\u6570\u636e\uff08\u4fe1\u606f\uff09"}),"\n",(0,s.jsx)(n.p,{children:"\u4ee5\u524d\u901a\u8fc7\u4ee5\u4e0b\u51e0\u79cd\u65b9\u5f0f\u5bf9\u670d\u52a1\u7aef\u53d1\u8d77\u8bf7\u6c42\uff0c\u83b7\u5f97\u670d\u52a1\u7aef\u7684\u6570\u636e\uff1a"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5730\u5740\u680f\u8f93\u5165\u5730\u5740\uff0c\u56de\u8f66\uff0c\u5237\u65b0"}),"\n",(0,s.jsx)(n.li,{children:"\u7279\u5b9a\u5143\u7d20\u7684 href \u6216 src \u5c5e\u6027"}),"\n",(0,s.jsx)(n.li,{children:"\u8868\u5355\u63d0\u4ea4"}),"\n"]}),"\n",(0,s.jsxs)(n.admonition,{title:"\u901a\u8fc7\u4ee5\u4e0a\u83b7\u53d6\u6570\u636e\u5fc5\u987b\u5237\u65b0\u7f51\u9875\uff0c\u5f00\u9500\u5927 :::",type:"info",children:[(0,s.jsx)(n.h2,{id:"ajax--asynchronous-javascript-and-xml-",children:"AJAX \uff08 Asynchronous JavaScript and XML \uff09"}),(0,s.jsx)(n.p,{children:"\u901a\u8fc7 JavaScript \u53d1\u9001\u8bf7\u6c42\u3001\u63a5\u6536\u54cd\u5e94\uff0c\u4e0d\u5fc5\u5237\u65b0\u9875\u9762\u83b7\u53d6\u6700\u65b0\u6570\u636e"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"AJAX \u5c31\u662f\u6d4f\u89c8\u5668\u63d0\u4f9b\u7684\u4e00\u5957 API \uff0c\u53ef\u4ee5\u901a\u8fc7 JS \u8c03\u7528\uff0c\u4ece\u800c\u5b9e\u73b0\u63a7\u5236\u8bf7\u6c42\u4e0e\u54cd\u5e94"}),"\n",(0,s.jsx)(n.li,{children:"XML \u662f\u63cf\u8ff0\u6570\u636e\u7684\u4e00\u79cd\u624b\u6bb5\uff0c\u73b0\u4eca\u5e38\u7528 JSON \u6765\u63cf\u8ff0\uff0c\u56e0\u4e3a XML \u76f8\u6bd4 JSON \u5197\u4f59\u592a\u591a\u4e86"}),"\n"]}),(0,s.jsx)(n.h2,{id:"ajax-\u57fa\u672c\u4f7f\u7528",children:"AJAX \u57fa\u672c\u4f7f\u7528"}),(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"\u521b\u5efa XMLHttpRequest \u7c7b\u578b\u7684\u5bf9\u8c61"}),"\n",(0,s.jsxs)(n.li,{children:["\u8bbe\u7f6e\u8bf7\u6c42\u884c\uff0c\u4e0e\u670d\u52a1\u7aef\u7279\u5b9a\u7aef\u53e3\u521b\u5efa",(0,s.jsx)(n.code,{children:"\u8fde\u63a5"})," ",(0,s.jsx)(n.code,{children:"open\u51fd\u6570"})]}),"\n",(0,s.jsxs)(n.li,{children:["\u8bbe\u7f6e\u8bf7\u6c42\u5934 setRequestHeader( )","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4f7f\u7528\u4ec0\u4e48\u683c\u5f0f\u7684\u8bf7\u6c42\u4f53\u5c31\u8981\u8bbe\u7f6e\u76f8\u5e94\u7684 Content-Type \u544a\u77e5\u670d\u52a1\u5668\u7aef"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"\u8bbe\u7f6e\u8bf7\u6c42\u4f53 send( )"}),"\n"]}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"var xhr = new XMLHttpRequest()\r\nconsole.log(xhr.readyState)\r\n// => 0 \u521d\u59cb\u5316 \u8bf7\u6c42\u4ee3\u7406\u5bf9\u8c61\r\n\r\nxhr.open(method, url, boolean)\r\nconsole.log(xhr.readyState)\r\n// => 1 open \u5df2\u7ecf\u8c03\u7528\uff0c\u5efa\u7acb\u4e00\u4e2a\u4e0e\u670d\u52a1\u7aef\u7279\u5b9a\u7aef\u53e3\u7684\u8fde\u63a5\uff08\u5df2\u7ecf\u5efa\u7acb\uff09\r\nxhr.send()\r\nxhr.addEventListener('readystatechange', function () {\r\n  switch (this.readyState) {\r\n    case 2:\r\n      console.log(this.readyState)\r\n      // => 2 \u5df2\u7ecf\u63a5\u6536\u5230\u54cd\u5e94\u62a5\u6587\u7684\u54cd\u5e94\u5934\r\n      break\r\n    case 3:\r\n      console.log(this.readyState)\r\n      // => 3 \u6b63\u5728\u4e0b\u8f7d\u54cd\u5e94\u62a5\u6587\u7684\u54cd\u5e94\u4f53\r\n      // \u53ef\u80fd\u4e3a\u7a7a \u4e5f\u53ef\u80fd\u4e0d\u5b8c\u6574 \u5728\u6b64\u5904\u5904\u7406\u54cd\u5e94\u4f53\u4e0d\u4fdd\u9669 \uff08\u4e0d\u53ef\u9760\uff09\r\n      break\r\n    case 4:\r\n      console.log(this.readyState)\r\n      // => 4 \u4e00\u5207OK\r\n      // \u6574\u4e2a\u62a5\u6587\u5df2\u7ecf\u4e0b\u8f7d\u4e0b\u6765\u4e86\r\n      break\r\n  }\r\n})\n"})}),(0,s.jsx)(n.h2,{id:"readystate-\u6709\u4e94\u79cd\u72b6\u6001\u56db\u4e2a\u9636\u6bb501",children:"readyState \u6709\u4e94\u79cd\u72b6\u6001\uff0c\u56db\u4e2a\u9636\u6bb5\uff080~1\u3001...\uff09"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"0 => \u521d\u59cb\u5316\uff0c\u8bf7\u6c42\u4ee3\u7406\u5bf9\u8c61 new XMLHttpRequest()"}),"\n",(0,s.jsx)(n.li,{children:"1 => \u5efa\u7acb\u8fde\u63a5\uff08\u5df2\u7ecf\u5efa\u7acb\uff09 open"}),"\n",(0,s.jsx)(n.li,{children:"2 => \u5df2\u7ecf\u63a5\u6536\u5230\u54cd\u5e94\u62a5\u6587\u7684\u54cd\u5e94\u5934 send \u4e4b\u540e"}),"\n",(0,s.jsx)(n.li,{children:"3 => \u6b63\u5728\u4e0b\u8f7d\u54cd\u5e94\u62a5\u6587\u7684\u54cd\u5e94\u4f53"}),"\n",(0,s.jsx)(n.li,{children:"4 => \u6574\u4e2a\u62a5\u6587\u5df2\u7ecf\u4e0b\u8f7d\u4e0b\u6765\u4e86"}),"\n"]}),(0,s.jsxs)(n.admonition,{type:"tip",children:[(0,s.jsxs)(n.mdxAdmonitionTitle,{children:["\u5e94\u5f53\u8bbe\u7f6e\u8bf7\u6c42\u4f53\u76f8\u5e94\u7684 ",(0,s.jsx)(n.code,{children:"Content-Type"})," \u544a\u77e5\u670d\u52a1\u5668 :::"]}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["onreadystatechange \u51fd\u6570\u53ea\u5728\u72b6\u6001\u6539\u53d8\u7684\u65f6\u5019\u624d\u54cd\u5e94\uff0c\u56e0\u6b64\uff0c\u5982\u679c ",(0,s.jsx)(n.code,{children:"xhr.send(method, url, async)"})," \u4e2d\u7b2c\u4e09\u4e2a\u53c2\u6570 ",(0,s.jsx)(n.code,{children:"async"})," \u5f02\u6b65\u4e3a\r\n",(0,s.jsx)(n.code,{children:"false"})," \u65f6\uff0c\u53ef\u80fd\u4f1a\u51fa\u73b0\u6765\u4e0d\u53ca\u7684\u73b0\u8c61"]}),"\n"]}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\r\n * \u540c\u6b65\u4e0e\u5f02\u6b65\u6a21\u5f0f\u7684\u533a\u522b\u5728\u4e8e\r\n * \u540c\u6b65\u6a21\u5f0f\u4e0b send \u65b9\u6cd5\u4f1a\u51fa\u73b0\u7b49\u5f85\u7684\u60c5\u51b5\r\n */\r\nconsole.time('async')\r\nvar xhrAsync = new XMLHttpRequest() // \u521b\u5efa xhr \u5bf9\u8c61\r\nxhrAsync.open('GET', './time.php', 'true') // \u4e0e\u670d\u52a1\u7aef\u521b\u5efa\u8fde\u63a5\r\nxhrAsync.send() // \u8bbe\u7f6e\u8bf7\u6c42\u4f53\u683c\u5f0f\r\nconsole.timeEnd('async')\r\n// async: 0.645751953125ms\r\n\r\nconsole.time('sync')\r\nvar xhrSync = new XMLHttpRequest()\r\nxhrSync.open('GET', './time.php', 'false')\r\nxhrSync.send()\r\nconsole.timeEnd('sync')\r\n// sync: 0.340087890625ms\n"})}),(0,s.jsx)(n.h2,{id:"\u7ebf\u7a0b\u4e0e\u8fdb\u7a0b",children:"\u7ebf\u7a0b\u4e0e\u8fdb\u7a0b"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u8fdb\u7a0b\uff1a\u8fdb\u884c\u4e2d\u7684\u7a0b\u5e8f"}),"\n",(0,s.jsx)(n.li,{children:"\u7ebf\u7a0b\uff1aCPU \u7684\u6700\u5c0f\u6267\u884c\u5355\u5143"}),"\n"]}),(0,s.jsx)(n.h2,{id:"\u603b\u7ed3",children:"\u603b\u7ed3"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"AJAX"}),"\u662f\u6d4f\u89c8\u5668\u63d0\u4f9b\u7684",(0,s.jsx)(n.code,{children:"API"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"XMLHttpRequest"})," \u7c7b\u578b"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"onreadystatechange"})," \u4e8b\u4ef6 \uff1a\u53ea\u5728\u72b6\u6001\u6539\u53d8\u7684\u65f6\u5019\u54cd\u5e94"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"readyState"}),"\uff1a"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"0\uff1a\u8bf7\u6c42\u672a\u521d\u59cb\u5316"}),"\n",(0,s.jsx)(n.li,{children:"1\uff1a\u670d\u52a1\u5668\u8fde\u63a5\u5df2\u5efa\u7acb"}),"\n",(0,s.jsx)(n.li,{children:"2\uff1a\u8bf7\u6c42\u5df2\u63a5\u6536\uff08\u54cd\u5e94\u5934\uff09"}),"\n",(0,s.jsx)(n.li,{children:"3\uff1a\u8bf7\u6c42\u5904\u7406\u4e2d\uff08\u6709\u53ef\u80fd\u62ff\u5230\u4e5f\u6709\u53ef\u80fd\u62ff\u4e0d\u5230\uff09"}),"\n",(0,s.jsx)(n.li,{children:"4\uff1a\u8bf7\u6c42\u5df2\u5b8c\u6210\uff0c\u4e14\u54cd\u5e94\u5df2\u5c31\u7eea"}),"\n"]}),"\n"]}),"\n"]}),(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Value"}),(0,s.jsx)(n.th,{children:"State"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"0"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"UNSENT"})}),(0,s.jsxs)(n.td,{children:["Client has been created. ",(0,s.jsx)(n.code,{children:"open()"})," not called yet."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"1"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"OPENED"})}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.code,{children:"open()"})," has been called."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"2"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"HEADERS_RECEIVED"})}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.code,{children:"send()"})," has been called, and headers and status are available."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"3"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"LOADING"})}),(0,s.jsxs)(n.td,{children:["Downloading; ",(0,s.jsx)(n.code,{children:"responseText"})," holds partial data."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"4"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"DONE"})}),(0,s.jsx)(n.td,{children:"The operation is complete."})]})]})]}),(0,s.jsx)(n.p,{children:"2\uff1aheaderreceive \u63a5\u6536\u5230\u54cd\u5e94\u5934"})]})]})]})}function o(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>l,x:()=>t});var s=r(96540);const d={},i=s.createContext(d);function l(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:l(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);
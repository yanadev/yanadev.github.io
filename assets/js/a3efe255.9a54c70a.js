"use strict";(self.webpackChunkyana_github_io=self.webpackChunkyana_github_io||[]).push([[2693],{42190:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var t=a(74848),r=a(28453);const s={slug:"Vue\u5355\u6587\u4ef6\u7ec4\u4ef6",title:"Vue\u5355\u6587\u4ef6\u7ec4\u4ef6",tags:["Vue","\u5355\u6587\u4ef6\u7ec4\u4ef6"],authors:"yana"},l=void 0,i={permalink:"/vue/Vue\u5355\u6587\u4ef6\u7ec4\u4ef6",source:"@site/vue/2020-03-31-Vue\u5355\u6587\u4ef6\u7ec4\u4ef6.md",title:"Vue\u5355\u6587\u4ef6\u7ec4\u4ef6",description:"Vue \u5355\u6587\u4ef6\u7ec4\u4ef6\u7684\u57fa\u672c\u7528\u6cd5",date:"2020-03-31T00:00:00.000Z",tags:[{inline:!0,label:"Vue",permalink:"/vue/tags/vue"},{inline:!0,label:"\u5355\u6587\u4ef6\u7ec4\u4ef6",permalink:"/vue/tags/\u5355\u6587\u4ef6\u7ec4\u4ef6"}],readingTime:2.4,hasTruncateMarker:!1,authors:[{name:"Yana Ching",title:"Front End Engineer",url:"https://yamadev.github.io/",imageURL:"https://github.com/yanadev.png",key:"yana",page:null}],frontMatter:{slug:"Vue\u5355\u6587\u4ef6\u7ec4\u4ef6",title:"Vue\u5355\u6587\u4ef6\u7ec4\u4ef6",tags:["Vue","\u5355\u6587\u4ef6\u7ec4\u4ef6"],authors:"yana"},unlisted:!1,prevItem:{title:"Vue\u4e0eaxios",permalink:"/vue/Vue\u4e0eaxios"},nextItem:{title:"Vue\u5e38\u7528\u7279\u6027\u5e94\u7528\u573a\u666f",permalink:"/vue/Vue\u5e38\u7528\u7279\u6027\u5e94\u7528\u573a\u666f"}},u={authorsImageUrls:[void 0]},c=[{value:"Vue \u5355\u6587\u4ef6\u7ec4\u4ef6\u7684\u57fa\u672c\u7528\u6cd5",id:"vue-\u5355\u6587\u4ef6\u7ec4\u4ef6\u7684\u57fa\u672c\u7528\u6cd5",level:2},{value:"\u5355\u6587\u4ef6\u7ec4\u4ef6\u7684\u7ec4\u6210\u7ed3\u6784",id:"\u5355\u6587\u4ef6\u7ec4\u4ef6\u7684\u7ec4\u6210\u7ed3\u6784",level:3},{value:"webpack\u4e2d\u914d\u7f6evue\u7ec4\u4ef6\u7684\u52a0\u8f7d\u5668",id:"webpack\u4e2d\u914d\u7f6evue\u7ec4\u4ef6\u7684\u52a0\u8f7d\u5668",level:3},{value:"\u8fd0\u884c\u7684\u65f6\u5019\u9047\u5230\u9519\u8bef",id:"\u8fd0\u884c\u7684\u65f6\u5019\u9047\u5230\u9519\u8bef",level:2},{value:"\u5728 webpack \u9879\u76ee\u4e2d\u4f7f\u7528 vue",id:"\u5728-webpack-\u9879\u76ee\u4e2d\u4f7f\u7528-vue",level:2},{value:"webpack \u6253\u5305\u53d1\u5e03",id:"webpack-\u6253\u5305\u53d1\u5e03",level:2}];function o(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"vue-\u5355\u6587\u4ef6\u7ec4\u4ef6\u7684\u57fa\u672c\u7528\u6cd5",children:"Vue \u5355\u6587\u4ef6\u7ec4\u4ef6\u7684\u57fa\u672c\u7528\u6cd5"}),"\n",(0,t.jsx)(n.h3,{id:"\u5355\u6587\u4ef6\u7ec4\u4ef6\u7684\u7ec4\u6210\u7ed3\u6784",children:"\u5355\u6587\u4ef6\u7ec4\u4ef6\u7684\u7ec4\u6210\u7ed3\u6784"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"template \u7ec4\u4ef6\u6a21\u677f\u533a\u57df"}),"\n",(0,t.jsx)(n.li,{children:"script \u4e1a\u52a1\u903b\u8f91\u533a\u57df"}),"\n",(0,t.jsx)(n.li,{children:"style \u6837\u5f0f\u533a\u57df"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"webpack\u4e2d\u914d\u7f6evue\u7ec4\u4ef6\u7684\u52a0\u8f7d\u5668",children:"webpack\u4e2d\u914d\u7f6evue\u7ec4\u4ef6\u7684\u52a0\u8f7d\u5668"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"- \u8fd0\u884c npm i vue-loader vue-template-compiler -D \u547d\u4ee4 \n- \u5728 webpack.config.js \u914d\u7f6e\u6587\u4ef6\u4e2d\uff0c\u6dfb\u52a0 vue-loader \u7684\u914d\u7f6e\u9879\u5982\u4e0b\uff1a \nconst VueLoaderPlugin = require('vue-loader/lib/plugin') \nmodule.exports = { \n  module: { \n    rules: [       // ... \u5176\u5b83\u89c4\u5219       \n        { test: /\\.vue$/, loader: 'vue-loader' } \n    ] \n  }, \n  plugins: [     // ... \u5176\u5b83\u63d2\u4ef6     \n      new VueLoaderPlugin() // \u8bf7\u786e\u4fdd\u5f15\u5165\u8fd9\u4e2a\u63d2\u4ef6\uff01   ] \n} \n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u8fd0\u884c\u7684\u65f6\u5019\u9047\u5230\u9519\u8bef",children:"\u8fd0\u884c\u7684\u65f6\u5019\u9047\u5230\u9519\u8bef"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"Module not found: Error: Can't resolve 'vue' in 'D:\\Z-work space\\DOC\\reading_IT\\webpack-study\\src\\components'\n"})}),"\n",(0,t.jsx)(n.admonition,{title:"\u89e3\u51b3\u65b9\u6cd5",type:"tip"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"npm i vue\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u5728-webpack-\u9879\u76ee\u4e2d\u4f7f\u7528-vue",children:"\u5728 webpack \u9879\u76ee\u4e2d\u4f7f\u7528 vue"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"- \u8fd0\u884c npm i vue -S \u5b89\u88c5vue\n- \u5728 src -> index.js \u5165\u53e3\u6587\u4ef6\u4e2d\uff0c\u901a\u8fc7 import Vue from 'vue' \u6765\u5bfc\u5165 vue \u6784\u9020\u51fd\u6570\n- \u521b\u5efa vue \u7684\u5b9e\u4f8b\u5bf9\u8c61\uff0c\u5e76\u5236\u8ba2\u8981\u63a7\u5236\u7684 el \u533a\u57df\n- \u901a\u8fc7 render \u51fd\u6570\u6e32\u67d3 App \u6839\u7ec4\u4ef6\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"// 1. \u5bfc\u5165 Vue \u6784\u9020\u51fd\u6570 import Vue from 'vue' \n// 2. \u5bfc\u5165 App \u6839\u7ec4\u4ef6 import App from './components/App.vue' \n\nconst vm = new Vue({   \n    // 3. \u6307\u5b9a vm \u5b9e\u4f8b\u8981\u63a7\u5236\u7684\u9875\u9762\u533a\u57df   \n    el: '#app',   \n    // 4. \u901a\u8fc7 render \u51fd\u6570\uff0c\u628a\u6307\u5b9a\u7684\u7ec4\u4ef6\u6e32\u67d3\u5230 el \u533a\u57df\u4e2d   \n    render: h => h(App) \n}\n// render: function(createElements) {\n//  var html = createElements(App) // \u8fd4\u56de\u6e32\u67d3\u51fa\u6765\u7684 HTML\u7ed3\u6784\n//      return html\n// }   \n// ========== \u76f8\u5f53\u4e8e =================\n// render: createElements => {\n//   return createElements(App)                     \n// } \n// ========== \u4f7f\u7528\u65f6 =================\n// render: h => h(App)                   \n"})}),"\n",(0,t.jsx)(n.h2,{id:"webpack-\u6253\u5305\u53d1\u5e03",children:"webpack \u6253\u5305\u53d1\u5e03"}),"\n",(0,t.jsxs)(n.p,{children:["\u901a\u8fc7",(0,t.jsx)(n.code,{children:"package.json"}),"\u6587\u4ef6\u914d\u7f6e\u6253\u5305"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'"scripts" {\n    // \u7528\u4e8e\u6253\u5305\u7684\u547d\u4ee4\n    "build": "webpack -p",\n    // \u7528\u4e8e\u5f00\u53d1\u8c03\u8bd5\u7684\u547d\u4ee4\n    "dev": "webpack-dev-server --open --host 127.0.0.1 --port 3000"\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"\u6253\u5305\u62a5\u9519\uff1a"}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:'npm ERR! file D:\\Z-work space\\DOC\\reading_IT\\webpack-study\\package.json\nnpm ERR! code EJSONPARSE\nnpm ERR! JSON.parse Failed to parse json\nnpm ERR! JSON.parse Unexpected token / in JSON at position 223 while parsing near \'...entBase src --hot", // \u8c03\u8bd5\u5f00\u53d1\u547d\u4ee4\nnpm ERR! JSON.parse     "dev1"...\'\nnpm ERR! JSON.parse Failed to parse package.json data.\nnpm ERR! JSON.parse package.json must be actual JSON, not just JavaScript.'}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"\u539f\u56e0\uff1apackage.json \u6587\u4ef6\u4e2d\u4e0d\u80fd\u6dfb\u52a0 \u6ce8\u91ca ' // '"})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},28453:(e,n,a)=>{a.d(n,{R:()=>l,x:()=>i});var t=a(96540);const r={},s=t.createContext(r);function l(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);
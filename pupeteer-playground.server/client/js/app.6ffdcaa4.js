(function(t){function e(e){for(var s,o,r=e[0],i=e[1],l=e[2],u=0,d=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&d.push(c[o][0]),c[o]=0;for(s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s]);p&&p(e);while(d.length)d.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,o=1;o<a.length;o++){var r=a[o];0!==c[r]&&(s=!1)}s&&(n.splice(e--,1),t=i(i.s=a[0]))}return t}var s={},o={app:0},c={app:0},n=[];function r(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-2d0c19e3":"f8c5b11b","chunk-2d0dee4b":"932d57cc","chunk-74a9f4f0":"172d642d","chunk-c0c8687a":"ba0a7bd1"}[t]+".js"}function i(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.e=function(t){var e=[],a={"chunk-74a9f4f0":1,"chunk-c0c8687a":1};o[t]?e.push(o[t]):0!==o[t]&&a[t]&&e.push(o[t]=new Promise((function(e,a){for(var s="css/"+({}[t]||t)+"."+{"chunk-2d0c19e3":"31d6cfe0","chunk-2d0dee4b":"31d6cfe0","chunk-74a9f4f0":"ead8d67a","chunk-c0c8687a":"c40e790a"}[t]+".css",c=i.p+s,n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var l=n[r],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===s||u===c))return e()}var d=document.getElementsByTagName("style");for(r=0;r<d.length;r++){l=d[r],u=l.getAttribute("data-href");if(u===s||u===c)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var s=e&&e.target&&e.target.src||c,n=new Error("Loading CSS chunk "+t+" failed.\n("+s+")");n.code="CSS_CHUNK_LOAD_FAILED",n.request=s,delete o[t],p.parentNode.removeChild(p),a(n)},p.href=c;var b=document.getElementsByTagName("head")[0];b.appendChild(p)})).then((function(){o[t]=0})));var s=c[t];if(0!==s)if(s)e.push(s[2]);else{var n=new Promise((function(e,a){s=c[t]=[e,a]}));e.push(s[2]=n);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=r(t);var d=new Error;l=function(e){u.onerror=u.onload=null,clearTimeout(p);var a=c[t];if(0!==a){if(a){var s=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+s+": "+o+")",d.name="ChunkLoadError",d.type=s,d.request=o,a[1](d)}c[t]=void 0}};var p=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},i.m=t,i.c=s,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(a,s,function(e){return t[e]}.bind(null,s));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var p=u;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"045f":function(t,e,a){"use strict";a.d(e,"a",(function(){return p}));var s=a("21a6"),o=a.n(s),c=a("260b"),n=(a("e71f"),a("588e"),a("c4e3")),r=a.n(n),i=a("83fc"),l=a("8a4e");c["a"].initializeApp({apiKey:"AIzaSyDEvPcGuUQZ6LQY6cRWhUumIVJps0zx5UQ",authDomain:"puppeteer-playground-2bec8.firebaseapp.com",projectId:"puppeteer-playground-2bec8",storageBucket:"puppeteer-playground-2bec8.appspot.com",messagingSenderId:"895362677537",appId:"1:895362677537:web:812c1aa1ce590cc67a1c60"});const u=c["a"].storage();class d{addToFireBase(t,e){const a=e.split("/");a.shift();const s=a.join("_"),o=u.ref().child("/tests/"+i["a"].socketUser+"/"+s),c=new Uint8Array(t);o.put(c).then(t=>{i["a"].loading--,l["a"].log("uploaded picture "+s[s.length-1])}).catch(t=>l["a"].error(t))}async downloadFireBase(){const t="/tests/"+i["a"].socketUser,e=new r.a,a=c["a"].storage().ref(t),s=(await a.listAll()).items,n=[];await Promise.all(s.map(async({name:t})=>a.child(t).getDownloadURL().then(t=>n.push(t)))),l["a"].log("urls",n);const u=[];await Promise.all(n.map(t=>fetch(t).then(async t=>{u.push(await t.blob())}).catch(t=>l["a"].error(t)))),l["a"].warn("blobs",u),u.forEach((t,a)=>e.file(s[a].name,t));const d=await e.generateAsync({type:"blob"});o()(d,"test")}}const p=new d},"07fd":function(t,e,a){"use strict";a("3fb2")},1:function(t,e){},"2b20":function(t,e,a){"use strict";a.d(e,"b",(function(){return c})),a.d(e,"a",(function(){return n})),a.d(e,"c",(function(){return r}));var s=a("bc3a"),o=a.n(s);const c=window.location.origin.includes("localhost")?"http://localhost:3000":"",n=o.a.create({baseURL:c,timeout:36e5}),r=function(t){n.defaults.headers.authorization=t}},"2da3":function(t,e,a){},"2f1c":function(t,e,a){"use strict";a.r(e);var s=a("7a23");const o=Object(s["J"])("data-v-6db0d957");Object(s["v"])("data-v-6db0d957");const c={class:"col-12 d-flex justify-content-center rounded w-100 p-0 checkerboard"};Object(s["t"])();const n=o((t,e,a,o,n,r)=>{const i=Object(s["B"])("tooltip");return Object(s["s"])(),Object(s["f"])("div",c,[(Object(s["s"])(!0),Object(s["f"])(s["a"],null,Object(s["y"])(o.colorSort(o.state.colors),t=>Object(s["I"])((Object(s["s"])(),Object(s["f"])("div",{id:"col:"+t.color,key:t.color,class:"color-block shadow-sm",style:`background:${t.color};width:${Math.ceil(t.percent)}%;`,onClick:e=>o.copyColor(t.color)},null,12,["id","onClick"])),[[i,`<div>\n           ${t.color}\n           <i class='bi-clipboard pl-1'></i>\n           </div>`,"top"]])),128))])});var r=a("83fc"),i=(a("8a4e"),a("3d20")),l=a.n(i);class u{static async confirmAction(t="Are you sure?",e="You won't be able to revert this!",a="warning",s="Yes, delete it!"){try{const o=await l.a.fire({title:t,text:e,icon:a,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:s,background:"#1e1e1e80"});return!!o.isConfirmed}catch(o){return!1}}static toast(t="Warning!",e="warning",a="top-end",s=3e3,o=!0){l.a.fire({title:t,icon:e,position:a,timer:s,timerProgressBar:o,toast:!0,showConfirmButton:!1,background:"#1e1e1eff",customClass:{title:"sweet-alert"}})}}var d=a("1157"),p=a.n(d),b={name:"StyleResults",setup(){const t=Object(s["w"])({colors:Object(s["d"])(()=>r["a"].styleResults.colors),message:Object(s["d"])(()=>r["a"].imageResults.message),error:Object(s["d"])(()=>r["a"].imageResults.error),loading:Object(s["d"])(()=>r["a"].loading)});function e(t){const e=[];for(const a in t){const s=t[a];e.push({color:a,percent:s})}return e.sort((t,e)=>e.percent-t.percent),e}return{state:t,colorSort:e,copyColor(t){navigator.clipboard.writeText(t),u.toast("color copied","success","top-right",2e3,!1)}}},directives:{tooltip:function(t,e){p()(t).tooltip({title:e.value,placement:e.arg,trigger:"hover",html:!0})}}};a("9c34");b.render=n,b.__scopeId="data-v-6db0d957";e["default"]=b},3015:function(t,e,a){"use strict";a("87af")},"3fb2":function(t,e,a){},"41cb":function(t,e,a){"use strict";var s=a("8816"),o=a("6c02");function c(t){return()=>a("a2f9")(`./${t}.vue`)}const n=[{path:"/",name:"ImageStealer",component:c("ImageStealer")},{path:"/stylethief",name:"StyleThief",component:c("StyleThief")},{path:"/account",name:"Account",component:c("AccountPage"),beforeEnter:s["a"]}],r=Object(o["a"])({linkActiveClass:"router-link-active",linkExactActiveClass:"router-link-exact-active",history:Object(o["b"])(),routes:n});e["a"]=r},"4d89":function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var s=a("83fc"),o=a("8a4e"),c=a("2b20"),n=a("045f");const r={smallest:[{url:"https://thiscatdoesnotexist.com"},{url:"https://source.unsplash.com/800x900/?animals,cat"},{url:"https://source.unsplash.com/800x800/?animals,cat"}],small:[{url:"https://thiscatdoesnotexist.com"},{url:"https://source.unsplash.com/800x900/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/900x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/800x900/?animals,cat"},{url:"https://source.unsplash.com/600x1200/?animals,cat"},{url:"https://source.unsplash.com/600x1200/?animals,cat"},{url:"https://source.unsplash.com/500x500/?animals,cat"},{url:"https://source.unsplash.com/800x800/?animals,cat"}],big:[{url:"https://thiscatdoesnotexist.com"},{url:"https://source.unsplash.com/800x900/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/900x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/800x900/?animals,cat"},{url:"https://source.unsplash.com/600x1200/?animals,cat"},{url:"https://source.unsplash.com/600x1200/?animals,cat"},{url:"https://source.unsplash.com/500x500/?animals,cat"},{url:"https://source.unsplash.com/1000x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/900x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/550x700/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/900x2000/?animals,cat"},{url:"https://source.unsplash.com/900x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/800x1000/?animals,cat"},{url:"https://source.unsplash.com/800x800/?animals,cat"}]};class i{scrapeHandler(t){this.scrapeImages(t),this.scrapeBackgrounds(t),this.scrapeThumbnails(t)}async getScreenshot(t){try{const e=await c["a"].put("/api/puppet",t);o["a"].log(e.data)}catch(e){o["a"].error("HAVE YOU STARTED YOUR SERVER YET???",e)}}testData(t){s["a"].imageResults.downloadedImages=r[t]}async getScrape(t){try{s["a"].imageResults.downloadedImages=[],s["a"].imageResults.failedImages=[],t.socketRoom=s["a"].socketRoom,o["a"].log("Getting images",t);const e=await c["a"].put("/api/puppet/scrape",t);o["a"].log(e.data),s["a"].imageResults.message=e.data.message}catch(e){if(o["a"].error("HAVE YOU STARTED YOUR SERVER YET???",e),e.message){const t=e.message.split(":");s["a"].imageResults.error={error:t[t.length-1]}}else s["a"].imageResults.error={error:"unknown error, please try again"}}}async scrapeImages(t){try{const e=await c["a"].put("api/puppet/scrape/images",t);s["a"].imageResults.message=e.data.message,s["a"].imageResults.found+=e.data.count}catch(e){if(o["a"].error(e),e.message){const t=e.message.split(":");s["a"].error={error:t[t.length-1]}}else s["a"].error={error:"unknown error, please try again"}}}async scrapeBackgrounds(t){try{const e=await c["a"].put("api/puppet/scrape/backgrounds",t);s["a"].imageResults.message=e.data.message,s["a"].imageResults.found+=e.data.count}catch(e){if(o["a"].error(e),e.message){const t=e.message.split(":");s["a"].error={error:t[t.length-1]}}else s["a"].error={error:"unknown error, please try again"}}}async scrapeThumbnails(t){try{const e=await c["a"].put("api/puppet/scrape/thumbnails",t);s["a"].imageResults.message=e.data.message,s["a"].imageResults.found+=e.data.count}catch(e){if(o["a"].error(e),e.message){const t=e.message.split(":");s["a"].error={error:t[t.length-1]}}else s["a"].error={error:"unknown error, please try again"}}}foundImage(t){o["a"].log(t),s["a"].imageResults.foundImages.push(t)}downloadImage(t){switch(t.status){case"ok":s["a"].imageResults.downloadedImages.push(t),s["a"].loading++,n["a"].addToFireBase(t.data,t.url);break;case"bad":s["a"].imageResults.downloadedImages.push(t);break}s["a"].imageResults.found--}clearResults(){s["a"].imageResults={downloadedImages:[],failedImages:[],message:null,error:null,found:0}}}const l=new i},"56d7":function(t,e,a){"use strict";a.r(e);var s=a("4989"),o=a.n(s),c=a("1157"),n=a.n(c),r=a("f0bd"),i=a("7a23");const l=Object(i["i"])("div",{class:"background1 paralax-layer paralax-layer-back"},null,-1),u={class:"paralax"},d={class:"container-fluid pt-5 home text-light"},p={class:"row justify-content-center h-100 align-content-center p-1"},b={class:"col-md-8"},m={class:"row justify-content-start"},f=Object(i["i"])("small",{class:" text-info rounded-top-8 p-1 text-center "}," Image Lifter ",-1),h=Object(i["i"])("small",{class:" text-info rounded-top-8 p-1 text-center "}," Style Thief ",-1),g={class:"col-md-8 bg-fade-dark content1 rounded-8 rounded-top-left-0"},O={class:"row justify-content-center px-4 pt-4 pb-2 my-1 window"},j=Object(i["i"])("footer",null,[Object(i["i"])("div",{class:"bg-transparent text-light text-center p-4"}," Made with 💖 by CodeWorks ")],-1);function v(t,e,a,s,o,c){const n=Object(i["A"])("Navbar"),r=Object(i["A"])("router-link"),v=Object(i["A"])("router-view"),y=Object(i["A"])("Results");return Object(i["s"])(),Object(i["f"])(i["a"],null,[l,Object(i["i"])("header",null,[Object(i["i"])(n)]),Object(i["i"])("main",u,[Object(i["i"])("div",d,[Object(i["i"])("div",p,[Object(i["i"])("div",b,[Object(i["i"])("div",m,[Object(i["i"])(r,{to:{name:"ImageStealer"},class:["col-3 rounded-top-8","ImageStealer"==s.mode?"bg-fade-dark":"bg-fade-light"]},{default:Object(i["H"])(()=>[f]),_:1},8,["class"]),Object(i["i"])(r,{to:{name:"StyleThief"},class:["col-3 rounded-top-8","StyleThief"==s.mode?"bg-fade-dark":"bg-fade-light"]},{default:Object(i["H"])(()=>[h]),_:1},8,["class"])])]),Object(i["i"])("div",g,[Object(i["i"])("div",O,[Object(i["i"])(v)])]),Object(i["i"])(i["b"],{name:"results",tag:"div",class:"col-md-8"},{default:Object(i["H"])(()=>[null!==s.loading?(Object(i["s"])(),Object(i["f"])(y,{key:0})):Object(i["g"])("",!0)]),_:1})])])]),j],64)}var y=a("83fc"),w=a("ff1e"),k=a("6c02"),x={name:"App",setup(){const t=Object(k["c"])();return Object(i["q"])(async()=>{await w["a"].getSocketRoom()}),{appState:Object(i["d"])(()=>y["a"]),mode:Object(i["d"])(()=>t.name),loading:Object(i["d"])(()=>y["a"].loading)}}};a("ed66");x.render=v;var R=x;function A(t){const e=a("ccc2");e.keys().forEach(a=>{const s=e(a),o=s.default||s,c=o.name||a.substr(a.lastIndexOf("/")+1).replace(/\.\w+$/,"");t.component(c,o)})}var S=a("41cb");const T=Object(i["e"])(R);A(T),T.use(S["a"],o.a,n.a,r["default"]).mount("#app")},"6c32":function(t,e,a){},"80d8":function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var s=a("83fc"),o=a("8a4e"),c=a("4d89"),n=a("cb30");const r={puppetService:c["a"],styleService:n["a"]};class i{addAction(t){o["a"].log("[Action added to Queue]",t),null==s["a"].loading&&(s["a"].loading=0),s["a"].actionQue=[...s["a"].actionQue,t],!1===s["a"].working&&this.nextAction()}nextAction(){if(s["a"].actionQue.length>0){s["a"].working=!0;const t=s["a"].actionQue.shift();o["a"].log("[Performing Action]",t),r[t.service][t.action](t.search)}else s["a"].working=!1,o["a"].log("[All Acitons Complete]")}}const l=new i},8169:function(t,e,a){"use strict";a.r(e);var s=a("7a23");const o=Object(s["J"])("data-v-4130380b");Object(s["v"])("data-v-4130380b");const c={class:"Results row rounded-8 justify-content-center p-5 bg-fade-dark my-1 window"},n={key:0,class:"error"},r={key:1,class:"col-12"},i=Object(s["h"])(" working on it... "),l=Object(s["i"])("div",{class:"loader triangle"},[Object(s["i"])("svg",{viewBox:"0 0 86 80"},[Object(s["i"])("polygon",{points:"43 8 79 72 7 72"})])],-1),u={class:"col-12 text-light"},d={key:0,class:"row justify-content-center"},p=Object(s["h"])(" all done ");Object(s["t"])();const b=o((t,e,a,o,b,m)=>{const f=Object(s["A"])("PictureResults"),h=Object(s["A"])("StyleResults");return Object(s["s"])(),Object(s["f"])("div",c,[o.state.error?Object(s["g"])("",!0):(Object(s["s"])(),Object(s["f"])("div",n,Object(s["D"])(o.state.error),1)),o.state.loading>0||1==o.state.working?(Object(s["s"])(),Object(s["f"])("div",r,[i,l])):Object(s["g"])("",!0),"ImageStealer"==o.state.mode?(Object(s["s"])(),Object(s["f"])(f,{key:2})):Object(s["g"])("",!0),"StyleThief"==o.state.mode?(Object(s["s"])(),Object(s["f"])(h,{key:3})):Object(s["g"])("",!0),Object(s["i"])("div",u,[0!==o.state.loading||o.state.working?Object(s["g"])("",!0):(Object(s["s"])(),Object(s["f"])("div",d,[p,Object(s["i"])("button",{class:"btn btn-block mbtn-light mt-2",onClick:e[1]||(e[1]=(...t)=>o.downloadResults&&o.downloadResults(...t))}," download results ")]))])])});var m=a("83fc"),f=a("045f"),h=(a("8a4e"),a("6c02")),g={name:"Results",setup(){const t=Object(h["c"])(),e=Object(s["w"])({mode:Object(s["d"])(()=>t.name),loading:Object(s["d"])(()=>m["a"].loading),working:Object(s["d"])(()=>m["a"].working),error:Object(s["d"])(()=>m["a"].error)});return{state:e,async downloadResults(){await f["a"].downloadFireBase()}}}};a("3015");g.render=b,g.__scopeId="data-v-4130380b";e["default"]=g},"83fc":function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var s=a("7a23");const o=Object(s["w"])({user:{},account:{},imageResults:{downloadedImages:[],failedImages:[],message:null,found:0},styleResults:{colors:[]},error:null,loading:null,working:!1,actionQue:[],socketUser:"",socketRoom:""})},"86a4":function(t,e,a){"use strict";a.r(e);var s=a("7a23");const o=Object(s["J"])("data-v-5cdd199d");Object(s["v"])("data-v-5cdd199d");const c={class:"pictureComponent  p-2 border-light"};Object(s["t"])();const n=o((t,e,a,o,n,r)=>(Object(s["s"])(),Object(s["f"])("div",c,[Object(s["i"])("img",{src:o.state.picture.url,class:" rounded img-fluid img-hover"},null,8,["src"])])));a("83fc");var r={name:"PictureComponent",props:{pictureData:{type:Object}},setup(t){const e=Object(s["w"])({picture:Object(s["d"])(()=>t.pictureData)});return{state:e}}};a("dd44");r.render=n,r.__scopeId="data-v-5cdd199d";e["default"]=r},"87af":function(t,e,a){},"8a28":function(t,e,a){},"8a4e":function(t,e,a){"use strict";function s(t,e){window.location.origin.includes("localhost")&&console[t](...e)}a.d(e,"a",(function(){return o}));const o={log(){s("log",arguments)},error(){s("error",arguments)},warn(){s("warn",arguments)},assert(){s("assert",arguments)},trace(){s("trace",arguments)}}},"9b33":function(t,e,a){"use strict";a.r(e);var s=a("7a23");const o=Object(s["J"])("data-v-74f7825a");Object(s["v"])("data-v-74f7825a");const c={class:" text-light row p-3"},n={class:" border-primary"},r={class:" col-12 text-light justify-content-center"},i={class:"row"};Object(s["t"])();const l=o((t,e,a,l,u,d)=>{const p=Object(s["A"])("PictureComponent"),b=Object(s["A"])("Masonry"),m=Object(s["A"])("Picture-component");return Object(s["s"])(),Object(s["f"])("div",c,[Object(s["i"])("div",n,[Object(s["i"])(b,{items:l.state.goodPictures},{item:o(({item:t})=>[Object(s["i"])(p,{"picture-data":t},null,8,["picture-data"])]),_:1},8,["items"])]),Object(s["i"])("div",r,[Object(s["i"])("div",i,[(Object(s["s"])(!0),Object(s["f"])(s["a"],null,Object(s["y"])(l.state.badPictures,t=>(Object(s["s"])(),Object(s["f"])(m,{key:t.url,"picture-data":t},null,8,["picture-data"]))),128))])])])});var u=a("83fc"),d=(a("8a4e"),{name:"PictureResults",setup(){const t=Object(s["w"])({goodPictures:Object(s["d"])(()=>u["a"].imageResults.downloadedImages),badPictures:Object(s["d"])(()=>u["a"].imageResults.failedImages),message:Object(s["d"])(()=>u["a"].imageResults.message),error:Object(s["d"])(()=>u["a"].imageResults.error),loading:Object(s["d"])(()=>u["a"].loading),imgsFound:Object(s["d"])(()=>u["a"].imageResults.found)});return{state:t}}});a("b6a2");d.render=l,d.__scopeId="data-v-74f7825a";e["default"]=d},"9c34":function(t,e,a){"use strict";a("c453")},"9d8d":function(t,e,a){"use strict";a.r(e);var s=a("7a23");const o=Object(s["J"])("data-v-19a5ea9b");Object(s["v"])("data-v-19a5ea9b");const c={class:"navbar navbar-expand-lg "},n=Object(s["i"])("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[Object(s["i"])("span",{class:"navbar-toggler-icon"})],-1),r={class:"collapse navbar-collapse",id:"navbarText"},i={class:"navbar-text d-flex justify-content-end fixed-top p-3"},l={key:1,class:"dropdown"},u=Object(s["i"])("span",{class:"mx-1"},null,-1);Object(s["t"])();const d=o((t,e,a,o,d,p)=>(Object(s["s"])(),Object(s["f"])("nav",c,[n,Object(s["i"])("div",r,[Object(s["i"])("span",i,[o.user.isAuthenticated?(Object(s["s"])(),Object(s["f"])("div",l,[Object(s["i"])("div",{class:"btn btn-outline-secondary rounded-pill dropdown-toggle w-100",onClick:e[2]||(e[2]=t=>o.state.dropOpen=!o.state.dropOpen)},[Object(s["i"])("img",{src:o.user.picture,alt:"user photo",height:"40",class:"rounded-circle"},null,8,["src"]),u]),Object(s["i"])("div",{class:["dropdown-menu p-0 bg-transparent w-25 justify-self-end",{show:o.state.dropOpen}],onClick:e[4]||(e[4]=t=>o.state.dropOpen=!1)},[Object(s["i"])("div",{class:"p-2 pl-4 mt-1 rounded-pill bg-transparent text-secondary border border-secondary hoverable",onClick:e[3]||(e[3]=(...t)=>o.logout&&o.logout(...t))},"logout")],2)])):(Object(s["s"])(),Object(s["f"])("button",{key:0,class:"btn btn-outline-dark rounded-pill",onClick:e[1]||(e[1]=(...t)=>o.login&&o.login(...t))},"Login"))])])])));var p=a("83fc"),b=a("8816");const m="mickshanny.us.auth0.com",f="yd3pAi9hhaEUZnxWxi4gmaEbbI1BJPeY",h="https://crawler.com";var g=a("41cb"),O=a("8a4e"),j=a("2b20");class v{async getAccount(){try{const t=await j["a"].get("/account");return p["a"].account=t.data,t.data}catch(t){O["a"].error("HAVE YOU STARTED YOUR SERVER YET???",t)}}}const y=new v;var w=a("ff1e");const k=Object(b["b"])({domain:m,clientId:f,audience:h,onRedirectCallback:t=>{g["a"].push(t&&t.targetUrl?t.targetUrl:window.location.pathname)}});k.on(k.AUTH_EVENTS.AUTHENTICATED,(async function(){Object(j["c"])(k.bearer);const t=await y.getAccount();O["a"].log(t),p["a"].user=k.user,w["a"].authenticate(k.bearer)}));var x={name:"Navbar",setup(){const t=Object(s["w"])({dropOpen:!1});return{state:t,user:Object(s["d"])(()=>p["a"].user),async login(){k.loginWithPopup()},async logout(){await k.logout({returnTo:window.location.origin})}}}};a("e552");x.render=d,x.__scopeId="data-v-19a5ea9b";e["default"]=x},a2f9:function(t,e,a){var s={"./AboutPage.vue":["478b","chunk-2d0c19e3"],"./AccountPage.vue":["e542","chunk-74a9f4f0"],"./ImageStealer.vue":["5b25","chunk-c0c8687a"],"./StyleThief.vue":["881f","chunk-2d0dee4b"]};function o(t){if(!a.o(s,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=s[t],o=e[0];return a.e(e[1]).then((function(){return a(o)}))}o.keys=function(){return Object.keys(s)},o.id="a2f9",t.exports=o},aaef:function(t,e,a){},b14e:function(t,e,a){},b6a2:function(t,e,a){"use strict";a("b14e")},c453:function(t,e,a){},c4e5:function(t,e,a){"use strict";a.r(e);var s=a("7a23");const o=Object(s["J"])("data-v-34fe9edc");Object(s["v"])("data-v-34fe9edc");const c={class:"switch-container"};Object(s["t"])();const n=o((t,e,a,o,n,r)=>(Object(s["s"])(),Object(s["f"])("div",c,[Object(s["i"])("div",{class:["switch",a.bool?"switchOn":"switchOff"]},null,2)])));a("83fc");var r={props:{bool:{type:Boolean,required:!0},options:{size:{type:Number,default:20}}},name:"Toggle",setup(t){const e=Object(s["w"])({});return{state:e}}};a("f646");r.render=n,r.__scopeId="data-v-34fe9edc";e["default"]=r},c624:function(t,e,a){"use strict";a.r(e);var s=a("7a23");const o=Object(s["J"])("data-v-eca54cd8"),c=o((t,e,a,c,n,r)=>(Object(s["s"])(),Object(s["f"])(s["c"],{name:"masonry",class:"masonry-with-columns",tag:"div"},{default:o(()=>[(Object(s["s"])(!0),Object(s["f"])(s["a"],null,Object(s["y"])(a.items,(e,a)=>(Object(s["s"])(),Object(s["f"])("div",{key:a,class:""},[Object(s["z"])(t.$slots,"item",{i:a,item:e})]))),128))]),_:1})));a("83fc");var n={name:"Masonry",props:{items:{type:Array,default:()=>[]}},setup(){const t=Object(s["w"])({});return{state:t}}};a("07fd");n.render=c,n.__scopeId="data-v-eca54cd8";e["default"]=n},cb30:function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var s=a("83fc"),o=a("8a4e"),c=a("2b20");class n{async stealStyleSheets(t){try{const e=await c["a"].put("api/style/sheet",t);o["a"].log(e.data)}catch(e){o["a"].error(e)}}async stealSiteStyle(t){try{const e=await c["a"].put("api/style/site",t);o["a"].log(e.data)}catch(e){o["a"].error(e)}}foundColors(t){s["a"].styleResults.colors=t}}const r=new n},ccc2:function(t,e,a){var s={"./Masonry.vue":"c624","./PictureComponent.vue":"86a4","./PictureResults.vue":"9b33","./Results.vue":"8169","./StyleResults.vue":"2f1c","./navbar.vue":"9d8d","./toggle.vue":"c4e5"};function o(t){var e=c(t);return a(e)}function c(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}o.keys=function(){return Object.keys(s)},o.resolve=c,t.exports=o,o.id="ccc2"},dd44:function(t,e,a){"use strict";a("aaef")},e552:function(t,e,a){"use strict";a("6c32")},ed66:function(t,e,a){"use strict";a("2da3")},f646:function(t,e,a){"use strict";a("8a28")},ff1e:function(t,e,a){"use strict";a.d(e,"a",(function(){return j}));var s=a("83fc");const o=["Mr ","Lady ","Sir ","Big ","Professor ","Capitan ","Mayor ","Mc ","Master ","Prime Meowster ","Gran-","Madam ","Her Royal Highness ","Duchess ","Baroness ","Countess ","Mistress ","Vice Chancellor ","Elder ","The Venerable ",""],c=["Fizz","Wiggle","Fuzz","Mouse","Frisk","Scruf","Hairy","Klaus","Mocha","Mert","Poppy","Butter","Caramel","","Potato","Nip","Bean","Vanilla","Snibbly","Filtch","Norris","Grumpy","Whisker","Simba","Teddy","Abraham","Taco","Bert","Bern","Tiger"],n=["s","bum","-buttons","ington"," esquire","mellow","wumps","worth"," Blackwell"," O,neal"," jr","butt","smith","bottom","paws","loaf","ordinal","buzz","-shakur"];function r(){const t=Math.ceil(3*Math.random());let e="";t>1&&(e=o[Math.floor(Math.random()*o.length)]);const a=c[Math.floor(Math.random()*c.length)];let s=n[Math.floor(Math.random()*n.length)];return s="ordinal"===s?i():s,e+a+s}function i(){let t=Math.ceil(2*Math.random());if(1===t){let t=Math.floor(50*Math.random()),e="";switch(0===t&&(e=String(t)),t%10){case 1:if(11===t){e=t+"th";break}e=t+"st";break;case 2:if(12===t){e=t+"th";break}e=t+"nd";break;case 3:if(13===t){e=t+"th";break}e=t+"rd";break;default:e=t+"th";break}return" the "+e}return""}function l(){const t=[],e="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";for(let a=1;a<=10;a++){const a=Math.floor(Math.random()*e.length);t.push(e[a])}return t.join("")}var u=a("8a4e"),d=a("8055"),p=a.n(d),b=a("2b20");class m{constructor(t){this.socket=p()(t||b["b"]),this.authenticated=!1,this.queue=[],this.on("connected",this.onConnected).on("authenticated",this.onAuthenticated).on("error",this.onError)}on(t,e){return this.socket.on(t,e.bind(this)),this}onConnected(t){u["a"].log("[SOCKET_CONNECTION]",t)}onAuthenticated(t){u["a"].log("[SOCKET_AUTHENTICATED]",t),this.authenticated=!0;const e=[...this.queue];this.queue=[],e.forEach(t=>{this.emit(t.action,t.payload)})}onError(t){u["a"].error("[SOCKET_ERROR]",t)}emit(t,e){if(!this.authenticated)return u["a"].log("[ENQUEING_ACTION]",{action:t,payload:e}),this.queue.push({action:t,payload:e});this.socket.emit(t,e)}}var f=a("4d89"),h=a("80d8"),g=a("cb30");class O extends m{constructor(){super(),this.on("joined:room",this.joinedRoom).on("download:image",this.downloadImage).on("found:image",this.foundImage).on("action:done",this.nextAction).on("style:sheet",this.styleSheets).on("style:colors",this.foundColors)}getSocketRoom(){s["a"].socketUser=r(),s["a"].socketRoom=s["a"].socketUser+":"+l(),this.authenticate(s["a"].socketRoom),this.emit("join:room",s["a"].socketRoom)}downloadImage(t){f["a"].downloadImage(t)}foundImage(t){f["a"].foundImage(t)}styleSheets(t){u["a"].warn(t)}foundColors(t){u["a"].warn(t),g["a"].foundColors(t)}nextAction(){s["a"].working=!1,h["a"].nextAction()}authenticate(t){this.socket.emit("authenticate",t)}connect(){this.socket.emit("connection")}joinedRoom(t){u["a"].log("your socket room is ",t)}connected(t){u["a"].log(t.message)}}const j=new O}});
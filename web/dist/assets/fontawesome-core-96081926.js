import{P as d}from"./mui-550bf900.js";import{c as Ie}from"./vendor-29cc5582.js";const te=()=>{};let Gt={},Ne={},Ce=null,Te={mark:te,measure:te};try{typeof window<"u"&&(Gt=window),typeof document<"u"&&(Ne=document),typeof MutationObserver<"u"&&(Ce=MutationObserver),typeof performance<"u"&&(Te=performance)}catch{}const{userAgent:ee=""}=Gt.navigator||{},D=Gt,g=Ne,ne=Ce,ft=Te;D.document;const F=!!g.documentElement&&!!g.head&&typeof g.addEventListener=="function"&&typeof g.createElement=="function",_e=~ee.indexOf("MSIE")||~ee.indexOf("Trident/");var h="classic",Fe="duotone",O="sharp",P="sharp-duotone",mn=[h,Fe,O,P],dn={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},ae={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},pn=["kit"],gn=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,hn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,bn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},yn={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},vn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},xn={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},An={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},kn={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},Me={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},wn=["solid","regular","light","thin","duotone","brands"],Le=[1,2,3,4,5,6,7,8,9,10],On=Le.concat([11,12,13,14,15,16,17,18,19,20]),tt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Pn=[...Object.keys(xn),...wn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",tt.GROUP,tt.SWAP_OPACITY,tt.PRIMARY,tt.SECONDARY].concat(Le.map(t=>"".concat(t,"x"))).concat(On.map(t=>"w-".concat(t))),Sn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},En={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},In={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},re={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const T="___FONT_AWESOME___",Pt=16,Re="fa",je="svg-inline--fa",X="data-fa-i2svg",St="data-fa-pseudo-element",Nn="data-fa-pseudo-element-pending",Ht="data-prefix",Xt="data-icon",ie="fontawesome-i2svg",Cn="async",Tn=["HTML","HEAD","STYLE","SCRIPT"],ze=(()=>{try{return!0}catch{return!1}})(),De=[h,O,P];function ot(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[h]}})}const Ye={...Me};Ye[h]={...Me[h],...ae.kit,...ae["kit-duotone"]};const G=ot(Ye),Et={...kn};Et[h]={...Et[h],...re.kit,...re["kit-duotone"]};const rt=ot(Et),It={...An};It[h]={...It[h],...In.kit};const H=ot(It),Nt={...vn};Nt[h]={...Nt[h],...En.kit};const _n=ot(Nt),Fn=gn,Ue="fa-layers-text",Mn=hn,Ln={...dn};ot(Ln);const Rn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],vt=tt,Q=new Set;Object.keys(rt[h]).map(Q.add.bind(Q));Object.keys(rt[O]).map(Q.add.bind(Q));Object.keys(rt[P]).map(Q.add.bind(Q));const jn=[...pn,...Pn],nt=D.FontAwesomeConfig||{};function zn(t){var e=g.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function Dn(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}g&&typeof g.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=Dn(zn(n));r!=null&&(nt[a]=r)});const We={styleDefault:"solid",familyDefault:"classic",cssPrefix:Re,replacementClass:je,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};nt.familyPrefix&&(nt.cssPrefix=nt.familyPrefix);const J={...We,...nt};J.autoReplaceSvg||(J.observeMutations=!1);const c={};Object.keys(We).forEach(t=>{Object.defineProperty(c,t,{enumerable:!0,set:function(e){J[t]=e,at.forEach(n=>n(c))},get:function(){return J[t]}})});Object.defineProperty(c,"familyPrefix",{enumerable:!0,set:function(t){J.cssPrefix=t,at.forEach(e=>e(c))},get:function(){return J.cssPrefix}});D.FontAwesomeConfig=c;const at=[];function Yn(t){return at.push(t),()=>{at.splice(at.indexOf(t),1)}}const R=Pt,I={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Un(t){if(!t||!F)return;const e=g.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=g.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const i=n[r],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=i)}return g.head.insertBefore(e,a),t}const Wn="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function it(){let t=12,e="";for(;t-- >0;)e+=Wn[Math.random()*62|0];return e}function Z(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Bt(t){return t.classList?Z(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function Ge(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Gn(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(Ge(t[n]),'" '),"").trim()}function gt(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function $t(t){return t.size!==I.size||t.x!==I.x||t.y!==I.y||t.rotate!==I.rotate||t.flipX||t.flipY}function Hn(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},f={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:f}}function Xn(t){let{transform:e,width:n=Pt,height:a=Pt,startCentered:r=!1}=t,i="";return r&&_e?i+="translate(".concat(e.x/R-n/2,"em, ").concat(e.y/R-a/2,"em) "):r?i+="translate(calc(-50% + ".concat(e.x/R,"em), calc(-50% + ").concat(e.y/R,"em)) "):i+="translate(".concat(e.x/R,"em, ").concat(e.y/R,"em) "),i+="scale(".concat(e.size/R*(e.flipX?-1:1),", ").concat(e.size/R*(e.flipY?-1:1),") "),i+="rotate(".concat(e.rotate,"deg) "),i}var Bn=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function He(){const t=Re,e=je,n=c.cssPrefix,a=c.replacementClass;let r=Bn;if(n!==t||a!==e){const i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");r=r.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(a))}return r}let oe=!1;function xt(){c.autoAddCss&&!oe&&(Un(He()),oe=!0)}var $n={mixout(){return{dom:{css:He,insertCss:xt}}},hooks(){return{beforeDOMElementCreation(){xt()},beforeI2svg(){xt()}}}};const _=D||{};_[T]||(_[T]={});_[T].styles||(_[T].styles={});_[T].hooks||(_[T].hooks={});_[T].shims||(_[T].shims=[]);var N=_[T];const Xe=[],Be=function(){g.removeEventListener("DOMContentLoaded",Be),mt=1,Xe.map(t=>t())};let mt=!1;F&&(mt=(g.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(g.readyState),mt||g.addEventListener("DOMContentLoaded",Be));function Vn(t){F&&(mt?setTimeout(t,0):Xe.push(t))}function st(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?Ge(t):"<".concat(e," ").concat(Gn(n),">").concat(a.map(st).join(""),"</").concat(e,">")}function se(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var Kn=function(e,n){return function(a,r,i,o){return e.call(n,a,r,i,o)}},At=function(e,n,a,r){var i=Object.keys(e),o=i.length,s=r!==void 0?Kn(n,r):n,l,f,u;for(a===void 0?(l=1,u=e[i[0]]):(l=0,u=a);l<o;l++)f=i[l],u=s(u,e[f],f,e);return u};function qn(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const i=t.charCodeAt(n++);(i&64512)==56320?e.push(((r&1023)<<10)+(i&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Ct(t){const e=qn(t);return e.length===1?e[0].toString(16):null}function Qn(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function le(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function Tt(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=le(e);typeof N.hooks.addPack=="function"&&!a?N.hooks.addPack(t,le(e)):N.styles[t]={...N.styles[t]||{},...r},t==="fas"&&Tt("fa",e)}const{styles:W,shims:Jn}=N,Zn={[h]:Object.values(H[h]),[O]:Object.values(H[O]),[P]:Object.values(H[P])};let Vt=null,$e={},Ve={},Ke={},qe={},Qe={};const ta={[h]:Object.keys(G[h]),[O]:Object.keys(G[O]),[P]:Object.keys(G[P])};function ea(t){return~jn.indexOf(t)}function na(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!ea(r)?r:null}const Je=()=>{const t=a=>At(W,(r,i,o)=>(r[o]=At(i,a,{}),r),{});$e=t((a,r,i)=>(r[3]&&(a[r[3]]=i),r[2]&&r[2].filter(s=>typeof s=="number").forEach(s=>{a[s.toString(16)]=i}),a)),Ve=t((a,r,i)=>(a[i]=i,r[2]&&r[2].filter(s=>typeof s=="string").forEach(s=>{a[s]=i}),a)),Qe=t((a,r,i)=>{const o=r[2];return a[i]=i,o.forEach(s=>{a[s]=i}),a});const e="far"in W||c.autoFetchSvg,n=At(Jn,(a,r)=>{const i=r[0];let o=r[1];const s=r[2];return o==="far"&&!e&&(o="fas"),typeof i=="string"&&(a.names[i]={prefix:o,iconName:s}),typeof i=="number"&&(a.unicodes[i.toString(16)]={prefix:o,iconName:s}),a},{names:{},unicodes:{}});Ke=n.names,qe=n.unicodes,Vt=ht(c.styleDefault,{family:c.familyDefault})};Yn(t=>{Vt=ht(t.styleDefault,{family:c.familyDefault})});Je();function Kt(t,e){return($e[t]||{})[e]}function aa(t,e){return(Ve[t]||{})[e]}function z(t,e){return(Qe[t]||{})[e]}function Ze(t){return Ke[t]||{prefix:null,iconName:null}}function ra(t){const e=qe[t],n=Kt("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function Y(){return Vt}const qt=()=>({prefix:null,iconName:null,rest:[]});function ht(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=h}=e,a=G[n][t],r=rt[n][t]||rt[n][a],i=t in N.styles?t:null;return r||i||null}const ia={[h]:Object.keys(H[h]),[O]:Object.keys(H[O]),[P]:Object.keys(H[P])};function bt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e,a={[h]:"".concat(c.cssPrefix,"-").concat(h),[O]:"".concat(c.cssPrefix,"-").concat(O),[P]:"".concat(c.cssPrefix,"-").concat(P)};let r=null,i=h;const o=mn.filter(l=>l!==Fe);o.forEach(l=>{(t.includes(a[l])||t.some(f=>ia[l].includes(f)))&&(i=l)});const s=t.reduce((l,f)=>{const u=na(c.cssPrefix,f);if(W[f]?(f=Zn[i].includes(f)?_n[i][f]:f,r=f,l.prefix=f):ta[i].indexOf(f)>-1?(r=f,l.prefix=ht(f,{family:i})):u?l.iconName=u:f!==c.replacementClass&&!o.some(p=>f===a[p])&&l.rest.push(f),!n&&l.prefix&&l.iconName){const p=r==="fa"?Ze(l.iconName):{},m=z(l.prefix,l.iconName);p.prefix&&(r=null),l.iconName=p.iconName||m||l.iconName,l.prefix=p.prefix||l.prefix,l.prefix==="far"&&!W.far&&W.fas&&!c.autoFetchSvg&&(l.prefix="fas")}return l},qt());return(t.includes("fa-brands")||t.includes("fab"))&&(s.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(s.prefix="fad"),!s.prefix&&i===O&&(W.fass||c.autoFetchSvg)&&(s.prefix="fass",s.iconName=z(s.prefix,s.iconName)||s.iconName),!s.prefix&&i===P&&(W.fasds||c.autoFetchSvg)&&(s.prefix="fasds",s.iconName=z(s.prefix,s.iconName)||s.iconName),(s.prefix==="fa"||r==="fa")&&(s.prefix=Y()||"fas"),s}class oa{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(i=>{this.definitions[i]={...this.definitions[i]||{},...r[i]},Tt(i,r[i]);const o=H[h][i];o&&Tt(o,r[i]),Je()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:i,iconName:o,icon:s}=a[r],l=s[2];e[i]||(e[i]={}),l.length>0&&l.forEach(f=>{typeof f=="string"&&(e[i][f]=s)}),e[i][o]=s}),e}}let fe=[],K={};const q={},sa=Object.keys(q);function la(t,e){let{mixoutsTo:n}=e;return fe=t,K={},Object.keys(q).forEach(a=>{sa.indexOf(a)===-1&&delete q[a]}),fe.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(i=>{typeof r[i]=="function"&&(n[i]=r[i]),typeof r[i]=="object"&&Object.keys(r[i]).forEach(o=>{n[i]||(n[i]={}),n[i][o]=r[i][o]})}),a.hooks){const i=a.hooks();Object.keys(i).forEach(o=>{K[o]||(K[o]=[]),K[o].push(i[o])})}a.provides&&a.provides(q)}),n}function _t(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(K[t]||[]).forEach(o=>{e=o.apply(null,[e,...a])}),e}function B(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(K[t]||[]).forEach(i=>{i.apply(null,n)})}function U(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return q[t]?q[t].apply(null,e):void 0}function Ft(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||Y();if(e)return e=z(n,e)||e,se(tn.definitions,n,e)||se(N.styles,n,e)}const tn=new oa,fa=()=>{c.autoReplaceSvg=!1,c.observeMutations=!1,B("noAuto")},ca={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return F?(B("beforeI2svg",t),U("pseudoElements2svg",t),U("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;c.autoReplaceSvg===!1&&(c.autoReplaceSvg=!0),c.observeMutations=!0,Vn(()=>{ma({autoReplaceSvgRoot:e}),B("watch",t)})}},ua={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:z(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=ht(t[0]);return{prefix:n,iconName:z(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(c.cssPrefix,"-"))>-1||t.match(Fn))){const e=bt(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||Y(),iconName:z(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=Y();return{prefix:e,iconName:z(e,t)||t}}}},S={noAuto:fa,config:c,dom:ca,parse:ua,library:tn,findIconDefinition:Ft,toHtml:st},ma=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=g}=t;(Object.keys(N.styles).length>0||c.autoFetchSvg)&&F&&c.autoReplaceSvg&&S.dom.i2svg({node:e})};function yt(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>st(n))}}),Object.defineProperty(t,"node",{get:function(){if(!F)return;const n=g.createElement("div");return n.innerHTML=t.html,n.children}}),t}function da(t){let{children:e,main:n,mask:a,attributes:r,styles:i,transform:o}=t;if($t(o)&&n.found&&!a.found){const{width:s,height:l}=n,f={x:s/l/2,y:.5};r.style=gt({...i,"transform-origin":"".concat(f.x+o.x/16,"em ").concat(f.y+o.y/16,"em")})}return[{tag:"svg",attributes:r,children:e}]}function pa(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:i}=t;const o=i===!0?"".concat(e,"-").concat(c.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...r,id:o},children:a}]}]}function Qt(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:i,symbol:o,title:s,maskId:l,titleId:f,extra:u,watchable:p=!1}=t,{width:m,height:x}=n.found?n:e,w=a==="fak",A=[c.replacementClass,r?"".concat(c.cssPrefix,"-").concat(r):""].filter(L=>u.classes.indexOf(L)===-1).filter(L=>L!==""||!!L).concat(u.classes).join(" ");let y={children:[],attributes:{...u.attributes,"data-prefix":a,"data-icon":r,class:A,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(m," ").concat(x)}};const b=w&&!~u.classes.indexOf("fa-fw")?{width:"".concat(m/x*16*.0625,"em")}:{};p&&(y.attributes[X]=""),s&&(y.children.push({tag:"title",attributes:{id:y.attributes["aria-labelledby"]||"title-".concat(f||it())},children:[s]}),delete y.attributes.title);const v={...y,prefix:a,iconName:r,main:e,mask:n,maskId:l,transform:i,symbol:o,styles:{...b,...u.styles}},{children:k,attributes:M}=n.found&&e.found?U("generateAbstractMask",v)||{children:[],attributes:{}}:U("generateAbstractIcon",v)||{children:[],attributes:{}};return v.children=k,v.attributes=M,o?pa(v):da(v)}function ce(t){const{content:e,width:n,height:a,transform:r,title:i,extra:o,watchable:s=!1}=t,l={...o.attributes,...i?{title:i}:{},class:o.classes.join(" ")};s&&(l[X]="");const f={...o.styles};$t(r)&&(f.transform=Xn({transform:r,startCentered:!0,width:n,height:a}),f["-webkit-transform"]=f.transform);const u=gt(f);u.length>0&&(l.style=u);const p=[];return p.push({tag:"span",attributes:l,children:[e]}),i&&p.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),p}function ga(t){const{content:e,title:n,extra:a}=t,r={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},i=gt(a.styles);i.length>0&&(r.style=i);const o=[];return o.push({tag:"span",attributes:r,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}const{styles:kt}=N;function Mt(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(c.cssPrefix,"-").concat(vt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(c.cssPrefix,"-").concat(vt.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(c.cssPrefix,"-").concat(vt.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const ha={found:!1,width:512,height:512};function ba(t,e){!ze&&!c.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Lt(t,e){let n=e;return e==="fa"&&c.styleDefault!==null&&(e=Y()),new Promise((a,r)=>{if(n==="fa"){const i=Ze(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&kt[e]&&kt[e][t]){const i=kt[e][t];return a(Mt(i))}ba(t,e),a({...ha,icon:c.showMissingIcons&&t?U("missingIconAbstract")||{}:{}})})}const ue=()=>{},Rt=c.measurePerformance&&ft&&ft.mark&&ft.measure?ft:{mark:ue,measure:ue},et='FA "6.6.0"',ya=t=>(Rt.mark("".concat(et," ").concat(t," begins")),()=>en(t)),en=t=>{Rt.mark("".concat(et," ").concat(t," ends")),Rt.measure("".concat(et," ").concat(t),"".concat(et," ").concat(t," begins"),"".concat(et," ").concat(t," ends"))};var Jt={begin:ya,end:en};const ct=()=>{};function me(t){return typeof(t.getAttribute?t.getAttribute(X):null)=="string"}function va(t){const e=t.getAttribute?t.getAttribute(Ht):null,n=t.getAttribute?t.getAttribute(Xt):null;return e&&n}function xa(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(c.replacementClass)}function Aa(){return c.autoReplaceSvg===!0?ut.replace:ut[c.autoReplaceSvg]||ut.replace}function ka(t){return g.createElementNS("http://www.w3.org/2000/svg",t)}function wa(t){return g.createElement(t)}function nn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?ka:wa}=e;if(typeof t=="string")return g.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(i){a.setAttribute(i,t.attributes[i])}),(t.children||[]).forEach(function(i){a.appendChild(nn(i,{ceFn:n}))}),a}function Oa(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const ut={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(nn(n),e)}),e.getAttribute(X)===null&&c.keepOriginalSource){let n=g.createComment(Oa(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~Bt(e).indexOf(c.replacementClass))return ut.replace(t);const a=new RegExp("".concat(c.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const i=n[0].attributes.class.split(" ").reduce((o,s)=>(s===c.replacementClass||s.match(a)?o.toSvg.push(s):o.toNode.push(s),o),{toNode:[],toSvg:[]});n[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",i.toNode.join(" "))}const r=n.map(i=>st(i)).join(`
`);e.setAttribute(X,""),e.innerHTML=r}};function de(t){t()}function an(t,e){const n=typeof e=="function"?e:ct;if(t.length===0)n();else{let a=de;c.mutateApproach===Cn&&(a=D.requestAnimationFrame||de),a(()=>{const r=Aa(),i=Jt.begin("mutate");t.map(r),i(),n()})}}let Zt=!1;function rn(){Zt=!0}function jt(){Zt=!1}let dt=null;function pe(t){if(!ne||!c.observeMutations)return;const{treeCallback:e=ct,nodeCallback:n=ct,pseudoElementsCallback:a=ct,observeMutationsRoot:r=g}=t;dt=new ne(i=>{if(Zt)return;const o=Y();Z(i).forEach(s=>{if(s.type==="childList"&&s.addedNodes.length>0&&!me(s.addedNodes[0])&&(c.searchPseudoElements&&a(s.target),e(s.target)),s.type==="attributes"&&s.target.parentNode&&c.searchPseudoElements&&a(s.target.parentNode),s.type==="attributes"&&me(s.target)&&~Rn.indexOf(s.attributeName))if(s.attributeName==="class"&&va(s.target)){const{prefix:l,iconName:f}=bt(Bt(s.target));s.target.setAttribute(Ht,l||o),f&&s.target.setAttribute(Xt,f)}else xa(s.target)&&n(s.target)})}),F&&dt.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Pa(){dt&&dt.disconnect()}function Sa(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const i=r.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(a[o]=s.join(":").trim()),a},{})),n}function Ea(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=bt(Bt(t));return r.prefix||(r.prefix=Y()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=aa(r.prefix,t.innerText)||Kt(r.prefix,Ct(t.innerText))),!r.iconName&&c.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function Ia(t){const e=Z(t.attributes).reduce((r,i)=>(r.name!=="class"&&r.name!=="style"&&(r[i.name]=i.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return c.autoA11y&&(n?e["aria-labelledby"]="".concat(c.replacementClass,"-title-").concat(a||it()):(e["aria-hidden"]="true",e.focusable="false")),e}function Na(){return{iconName:null,title:null,titleId:null,prefix:null,transform:I,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function ge(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=Ea(t),i=Ia(t),o=_t("parseNodeAttributes",{},t);let s=e.styleParser?Sa(t):[];return{iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:I,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:s,attributes:i},...o}}const{styles:Ca}=N;function on(t){const e=c.autoReplaceSvg==="nest"?ge(t,{styleParser:!1}):ge(t);return~e.extra.classes.indexOf(Ue)?U("generateLayersText",t,e):U("generateSvgReplacementMutation",t,e)}let C=new Set;De.map(t=>{C.add("fa-".concat(t))});Object.keys(G[h]).map(C.add.bind(C));Object.keys(G[O]).map(C.add.bind(C));Object.keys(G[P]).map(C.add.bind(C));C=[...C];function he(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!F)return Promise.resolve();const n=g.documentElement.classList,a=u=>n.add("".concat(ie,"-").concat(u)),r=u=>n.remove("".concat(ie,"-").concat(u)),i=c.autoFetchSvg?C:De.map(u=>"fa-".concat(u)).concat(Object.keys(Ca));i.includes("fa")||i.push("fa");const o=[".".concat(Ue,":not([").concat(X,"])")].concat(i.map(u=>".".concat(u,":not([").concat(X,"])"))).join(", ");if(o.length===0)return Promise.resolve();let s=[];try{s=Z(t.querySelectorAll(o))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();const l=Jt.begin("onTree"),f=s.reduce((u,p)=>{try{const m=on(p);m&&u.push(m)}catch(m){ze||m.name==="MissingIcon"&&console.error(m)}return u},[]);return new Promise((u,p)=>{Promise.all(f).then(m=>{an(m,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),l(),u()})}).catch(m=>{l(),p(m)})})}function Ta(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;on(t).then(n=>{n&&an([n],e)})}function _a(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:Ft(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:Ft(r||{})),t(a,{...n,mask:r})}}const Fa=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=I,symbol:a=!1,mask:r=null,maskId:i=null,title:o=null,titleId:s=null,classes:l=[],attributes:f={},styles:u={}}=e;if(!t)return;const{prefix:p,iconName:m,icon:x}=t;return yt({type:"icon",...t},()=>(B("beforeDOMElementCreation",{iconDefinition:t,params:e}),c.autoA11y&&(o?f["aria-labelledby"]="".concat(c.replacementClass,"-title-").concat(s||it()):(f["aria-hidden"]="true",f.focusable="false")),Qt({icons:{main:Mt(x),mask:r?Mt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:p,iconName:m,transform:{...I,...n},symbol:a,title:o,maskId:i,titleId:s,extra:{attributes:f,styles:u,classes:l}})))};var Ma={mixout(){return{icon:_a(Fa)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=he,t.nodeCallback=Ta,t}}},provides(t){t.i2svg=function(e){const{node:n=g,callback:a=()=>{}}=e;return he(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:i,prefix:o,transform:s,symbol:l,mask:f,maskId:u,extra:p}=n;return new Promise((m,x)=>{Promise.all([Lt(a,o),f.iconName?Lt(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(w=>{let[A,y]=w;m([e,Qt({icons:{main:A,mask:y},prefix:o,iconName:a,transform:s,symbol:l,maskId:u,title:r,titleId:i,extra:p,watchable:!0})])}).catch(x)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:i,styles:o}=e;const s=gt(o);s.length>0&&(a.style=s);let l;return $t(i)&&(l=U("generateAbstractTransformGrouping",{main:r,transform:i,containerWidth:r.width,iconWidth:r.width})),n.push(l||r.icon),{children:n,attributes:a}}}},La={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return yt({type:"layer"},()=>{B("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(i=>{a=a.concat(i.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(c.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},Ra={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:i={}}=e;return yt({type:"counter",content:t},()=>(B("beforeDOMElementCreation",{content:t,params:e}),ga({content:t.toString(),title:n,extra:{attributes:r,styles:i,classes:["".concat(c.cssPrefix,"-layers-counter"),...a]}})))}}}},ja={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=I,title:a=null,classes:r=[],attributes:i={},styles:o={}}=e;return yt({type:"text",content:t},()=>(B("beforeDOMElementCreation",{content:t,params:e}),ce({content:t,transform:{...I,...n},title:a,extra:{attributes:i,styles:o,classes:["".concat(c.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:i}=n;let o=null,s=null;if(_e){const l=parseInt(getComputedStyle(e).fontSize,10),f=e.getBoundingClientRect();o=f.width/l,s=f.height/l}return c.autoA11y&&!a&&(i.attributes["aria-hidden"]="true"),Promise.resolve([e,ce({content:e.innerHTML,width:o,height:s,transform:r,title:a,extra:i,watchable:!0})])}}};const za=new RegExp('"',"ug"),be=[1105920,1112319],ye={FontAwesome:{normal:"fas",400:"fas"},...yn,...bn,...Sn},zt=Object.keys(ye).reduce((t,e)=>(t[e.toLowerCase()]=ye[e],t),{}),Da=Object.keys(zt).reduce((t,e)=>{const n=zt[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function Ya(t){const e=t.replace(za,""),n=Qn(e,0),a=n>=be[0]&&n<=be[1],r=e.length===2?e[0]===e[1]:!1;return{value:Ct(r?e[0]:e),isSecondary:a||r}}function Ua(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(zt[n]||{})[r]||Da[n]}function ve(t,e){const n="".concat(Nn).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const o=Z(t.children).filter(m=>m.getAttribute(St)===e)[0],s=D.getComputedStyle(t,e),l=s.getPropertyValue("font-family"),f=l.match(Mn),u=s.getPropertyValue("font-weight"),p=s.getPropertyValue("content");if(o&&!f)return t.removeChild(o),a();if(f&&p!=="none"&&p!==""){const m=s.getPropertyValue("content");let x=Ua(l,u);const{value:w,isSecondary:A}=Ya(m),y=f[0].startsWith("FontAwesome");let b=Kt(x,w),v=b;if(y){const k=ra(w);k.iconName&&k.prefix&&(b=k.iconName,x=k.prefix)}if(b&&!A&&(!o||o.getAttribute(Ht)!==x||o.getAttribute(Xt)!==v)){t.setAttribute(n,v),o&&t.removeChild(o);const k=Na(),{extra:M}=k;M.attributes[St]=e,Lt(b,x).then(L=>{const lt=Qt({...k,icons:{main:L,mask:qt()},prefix:x,iconName:v,extra:M,watchable:!0}),$=g.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore($,t.firstChild):t.appendChild($),$.outerHTML=lt.map(V=>st(V)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function Wa(t){return Promise.all([ve(t,"::before"),ve(t,"::after")])}function Ga(t){return t.parentNode!==document.head&&!~Tn.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(St)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function xe(t){if(F)return new Promise((e,n)=>{const a=Z(t.querySelectorAll("*")).filter(Ga).map(Wa),r=Jt.begin("searchPseudoElements");rn(),Promise.all(a).then(()=>{r(),jt(),e()}).catch(()=>{r(),jt(),n()})})}var Ha={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=xe,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=g}=e;c.searchPseudoElements&&xe(n)}}};let Ae=!1;var Xa={mixout(){return{dom:{unwatch(){rn(),Ae=!0}}}},hooks(){return{bootstrap(){pe(_t("mutationObserverCallbacks",{}))},noAuto(){Pa()},watch(t){const{observeMutationsRoot:e}=t;Ae?jt():pe(_t("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const ke=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),i=r[0];let o=r.slice(1).join("-");if(i&&o==="h")return n.flipX=!0,n;if(i&&o==="v")return n.flipY=!0,n;if(o=parseFloat(o),isNaN(o))return n;switch(i){case"grow":n.size=n.size+o;break;case"shrink":n.size=n.size-o;break;case"left":n.x=n.x-o;break;case"right":n.x=n.x+o;break;case"up":n.y=n.y-o;break;case"down":n.y=n.y+o;break;case"rotate":n.rotate=n.rotate+o;break}return n},e)};var Ba={mixout(){return{parse:{transform:t=>ke(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=ke(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:i}=e;const o={transform:"translate(".concat(r/2," 256)")},s="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),f="rotate(".concat(a.rotate," 0 0)"),u={transform:"".concat(s," ").concat(l," ").concat(f)},p={transform:"translate(".concat(i/2*-1," -256)")},m={outer:o,inner:u,path:p};return{tag:"g",attributes:{...m.outer},children:[{tag:"g",attributes:{...m.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...m.path}}]}]}}}};const wt={x:0,y:0,width:"100%",height:"100%"};function we(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function $a(t){return t.tag==="g"?t.children:[t]}var Va={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?bt(n.split(" ").map(r=>r.trim())):qt();return a.prefix||(a.prefix=Y()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:i,maskId:o,transform:s}=e;const{width:l,icon:f}=r,{width:u,icon:p}=i,m=Hn({transform:s,containerWidth:u,iconWidth:l}),x={tag:"rect",attributes:{...wt,fill:"white"}},w=f.children?{children:f.children.map(we)}:{},A={tag:"g",attributes:{...m.inner},children:[we({tag:f.tag,attributes:{...f.attributes,...m.path},...w})]},y={tag:"g",attributes:{...m.outer},children:[A]},b="mask-".concat(o||it()),v="clip-".concat(o||it()),k={tag:"mask",attributes:{...wt,id:b,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[x,y]},M={tag:"defs",children:[{tag:"clipPath",attributes:{id:v},children:$a(p)},k]};return n.push(M,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(v,")"),mask:"url(#".concat(b,")"),...wt}}),{children:n,attributes:a}}}},Ka={provides(t){let e=!1;D.matchMedia&&(e=D.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const i={...r,attributeName:"opacity"},o={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return e||o.children.push({tag:"animate",attributes:{...r,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...i,values:"1;0;1;1;0;1;"}}),n.push(o),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:e?[]:[{tag:"animate",attributes:{...i,values:"1;0;0;0;0;1;"}}]}),e||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...i,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},qa={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},Qa=[$n,Ma,La,Ra,ja,Ha,Xa,Ba,Va,Ka,qa];la(Qa,{mixoutsTo:S});S.noAuto;S.config;const Ar=S.library;S.dom;const Dt=S.parse;S.findIconDefinition;S.toHtml;const Ja=S.icon;S.layer;S.text;S.counter;function Yt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=Array(e);n<e;n++)a[n]=t[n];return a}function Za(t){if(Array.isArray(t))return t}function tr(t){if(Array.isArray(t))return Yt(t)}function j(t,e,n){return(e=lr(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function er(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function nr(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var a,r,i,o,s=[],l=!0,f=!1;try{if(i=(n=n.call(t)).next,e===0){if(Object(n)!==n)return;l=!1}else for(;!(l=(a=i.call(n)).done)&&(s.push(a.value),s.length!==e);l=!0);}catch(u){f=!0,r=u}finally{try{if(!l&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(f)throw r}}return s}}function ar(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function rr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Oe(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function E(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Oe(Object(n),!0).forEach(function(a){j(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Oe(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function ir(t,e){if(t==null)return{};var n,a,r=or(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)===-1&&{}.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}function or(t,e){if(t==null)return{};var n={};for(var a in t)if({}.hasOwnProperty.call(t,a)){if(e.indexOf(a)!==-1)continue;n[a]=t[a]}return n}function Pe(t,e){return Za(t)||nr(t,e)||sn(t,e)||ar()}function Ut(t){return tr(t)||er(t)||sn(t)||rr()}function sr(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function lr(t){var e=sr(t,"string");return typeof e=="symbol"?e:e+""}function pt(t){"@babel/helpers - typeof";return pt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},pt(t)}function sn(t,e){if(t){if(typeof t=="string")return Yt(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Yt(t,e):void 0}}var fr="7.0.0",Wt;try{var cr=require("@fortawesome/fontawesome-svg-core/package.json");Wt=cr.version}catch{Wt=typeof process<"u"&&{}.FA_VERSION||"7.0.0"}function ur(t){var e=t.beat,n=t.fade,a=t.beatFade,r=t.bounce,i=t.shake,o=t.flash,s=t.spin,l=t.spinPulse,f=t.spinReverse,u=t.pulse,p=t.fixedWidth,m=t.inverse,x=t.border,w=t.listItem,A=t.flip,y=t.size,b=t.rotation,v=t.pull,k=t.swapOpacity,M=t.rotateBy,L=t.widthAuto,lt=mr(Wt,fr),$=j(j(j(j(j(j({"fa-beat":e,"fa-fade":n,"fa-beat-fade":a,"fa-bounce":r,"fa-shake":i,"fa-flash":o,"fa-spin":s,"fa-spin-reverse":f,"fa-spin-pulse":l,"fa-pulse":u,"fa-fw":p,"fa-inverse":m,"fa-border":x,"fa-li":w,"fa-flip":A===!0,"fa-flip-horizontal":A==="horizontal"||A==="both","fa-flip-vertical":A==="vertical"||A==="both"},"fa-".concat(y),typeof y<"u"&&y!==null),"fa-rotate-".concat(b),typeof b<"u"&&b!==null&&b!==0),"fa-pull-".concat(v),typeof v<"u"&&v!==null),"fa-swap-opacity",k),"fa-rotate-by",lt&&M),"fa-width-auto",lt&&L);return Object.keys($).map(function(V){return $[V]?V:null}).filter(function(V){return V})}function mr(t,e){for(var n=t.split("-"),a=Pe(n,2),r=a[0],i=a[1],o=e.split("-"),s=Pe(o,2),l=s[0],f=s[1],u=r.split("."),p=l.split("."),m=0;m<Math.max(u.length,p.length);m++){var x=u[m]||"0",w=p[m]||"0",A=parseInt(x,10),y=parseInt(w,10);if(A!==y)return A>y}for(var b=0;b<Math.max(u.length,p.length);b++){var v=u[b]||"0",k=p[b]||"0";if(v!==k&&v.length!==k.length)return v.length<k.length}return!(i&&!f)}function dr(t){return t=t-0,t===t}function ln(t){return dr(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var pr=["style"];function gr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function hr(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=ln(n.slice(0,a)),i=n.slice(a+1).trim();return r.startsWith("webkit")?e[gr(r)]=i:e[r]=i,e},{})}function fn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(l){return fn(t,l)}),r=Object.keys(e.attributes||{}).reduce(function(l,f){var u=e.attributes[f];switch(f){case"class":l.attrs.className=u,delete e.attributes.class;break;case"style":l.attrs.style=hr(u);break;default:f.indexOf("aria-")===0||f.indexOf("data-")===0?l.attrs[f.toLowerCase()]=u:l.attrs[ln(f)]=u}return l},{attrs:{}}),i=n.style,o=i===void 0?{}:i,s=ir(n,pr);return r.attrs.style=E(E({},r.attrs.style),o),t.apply(void 0,[e.tag,E(E({},r.attrs),s)].concat(Ut(a)))}var cn=!1;try{cn=!0}catch{}function br(){if(!cn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function Se(t){if(t&&pt(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Dt.icon)return Dt.icon(t);if(t===null)return null;if(t&&pt(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function Ot(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?j({},t,e):{}}var Ee={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,rotateBy:!1,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1,widthAuto:!1},un=Ie.forwardRef(function(t,e){var n=E(E({},Ee),t),a=n.icon,r=n.mask,i=n.symbol,o=n.className,s=n.title,l=n.titleId,f=n.maskId,u=Se(a),p=Ot("classes",[].concat(Ut(ur(n)),Ut((o||"").split(" ")))),m=Ot("transform",typeof n.transform=="string"?Dt.transform(n.transform):n.transform),x=Ot("mask",Se(r)),w=Ja(u,E(E(E(E({},p),m),x),{},{symbol:i,title:s,titleId:l,maskId:f}));if(!w)return br("Could not find icon",u),null;var A=w.abstract,y={ref:e};return Object.keys(n).forEach(function(b){Ee.hasOwnProperty(b)||(y[b]=n[b])}),yr(A[0],y)});un.displayName="FontAwesomeIcon";un.propTypes={beat:d.bool,border:d.bool,beatFade:d.bool,bounce:d.bool,className:d.string,fade:d.bool,flash:d.bool,mask:d.oneOfType([d.object,d.array,d.string]),maskId:d.string,fixedWidth:d.bool,inverse:d.bool,flip:d.oneOf([!0,!1,"horizontal","vertical","both"]),icon:d.oneOfType([d.object,d.array,d.string]),listItem:d.bool,pull:d.oneOf(["right","left"]),pulse:d.bool,rotation:d.oneOf([0,90,180,270]),rotateBy:d.bool,shake:d.bool,size:d.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:d.bool,spinPulse:d.bool,spinReverse:d.bool,symbol:d.oneOfType([d.bool,d.string]),title:d.string,titleId:d.string,transform:d.oneOfType([d.string,d.object]),swapOpacity:d.bool,widthAuto:d.bool};var yr=fn.bind(null,Ie.createElement);export{un as F,Ar as l};

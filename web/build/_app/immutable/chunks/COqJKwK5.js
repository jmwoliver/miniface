import"./CWj6FrbW.js";import{i as Mo}from"./DqIR9biK.js";import{i as pn,a as hn,c as mn,d as So,n as gn,b as bn,o as $n,e as yn,s as m,f as ar}from"./BMyLExu4.js";import{l as da,D as Jr,ai as Eo,G as Js,A as hs,i as ms,g as e,B as wn,H as kn,C as lo,F as tr,m as Gt,af as xn,al as zn,j as gr,J as Nn,az as gs,aA as bs,I as mr,aB as Ao,a1 as ps,aa as Co,ap as To,aC as vo,K as Ws,L as Po,av as C,a4 as co,aD as As,O as Mn,k as br,aE as Sn,aF as En,aG as An,ao as Cn,aH as Tn,X as Io,ah as Pn,aI as In,E as Rn,aJ as Ln,ar as Fn,M as Ks,aK as Hn,aL as Dn,ac as On,aM as Ro,aN as Un,aO as qn,aP as Bn,aQ as Vn,aR as Jn,aS as Wn,aT as Kn,aU as Gn,aV as Xn,U as Zn,at as Yn,b as v,N as Qn,aW as jn,s as Lo,x as s,z as n,y as r,q as c,v as Fo,aX as Ho,e as de,o as I,p as w,ay as ei,aY as Do,t as A,V as u,aZ as ht,a_ as ai,a$ as Ya,b0 as ti,w as p,b1 as W,b2 as Cs,b3 as ri,ax as si}from"./CpheMIdG.js";import{l as oe,p as Ht,s as ue,i as k,b as oi}from"./C6_A25Sp.js";function Xa(t,a){return a}function ni(t,a,o){for(var i=t.items,l=[],f=a.length,d=0;d<f;d++)An(a[d].e,l,!0);var _=f>0&&l.length===0&&o!==null;if(_){var G=o.parentNode;Cn(G),G.append(o),i.clear(),At(t,a[0].prev,a[f-1].next)}Tn(l,()=>{for(var b=0;b<f;b++){var pe=a[b];_||(i.delete(pe.k),At(t,pe.prev,pe.next)),br(pe.e,!_)}})}function Za(t,a,o,i,l,f=null){var d=t,_={flags:a,items:new Map,first:null},G=(a&Ao)!==0;if(G){var b=t;d=da?Jr(Eo(b)):b.appendChild(Js())}da&&hs();var pe=null,he=!1,K=new Map,aa=ps(()=>{var ae=o();return Co(ae)?ae:ae==null?[]:To(ae)}),H,X;function be(){ii(X,H,_,K,d,l,a,i,o),f!==null&&(H.length===0?pe?Ws(pe):pe=gr(()=>f(d)):pe!==null&&Po(pe,()=>{pe=null}))}ms(()=>{X??(X=Io),H=e(aa);var ae=H.length;if(he&&ae===0)return;he=ae===0;let Je=!1;if(da){var ce=wn(d)===kn;ce!==(ae===0)&&(d=lo(),Jr(d),tr(!1),Je=!0)}if(da){for(var ne=null,ie,q=0;q<ae;q++){if(Gt.nodeType===xn&&Gt.data===zn){d=Gt,Je=!0,tr(!1);break}var B=H[q],$=i(B,q);ie=Bs(Gt,_,ne,null,B,$,q,l,a,o),_.items.set($,ie),ne=ie}ae>0&&Jr(lo())}if(da)ae===0&&f&&(pe=gr(()=>f(d)));else if(Nn()){var Ta=new Set,ct=mr;for(q=0;q<ae;q+=1){B=H[q],$=i(B,q);var qa=_.items.get($)??K.get($);qa?a&(gs|bs)&&Oo(qa,B,q,a):(ie=Bs(null,_,null,null,B,$,q,l,a,o,!0),K.set($,ie)),Ta.add($)}for(const[ka,Te]of _.items)Ta.has(ka)||ct.skipped_effects.add(Te.e);ct.add_callback(be)}else be();Je&&tr(!0),e(aa)}),da&&(d=Gt)}function ii(t,a,o,i,l,f,d,_,G){var Qa,Pa,re,Dt;var b=(d&En)!==0,pe=(d&(gs|bs))!==0,he=a.length,K=o.items,aa=o.first,H=aa,X,be=null,ae,Je=[],ce=[],ne,ie,q,B;if(b)for(B=0;B<he;B+=1)ne=a[B],ie=_(ne,B),q=K.get(ie),q!==void 0&&((Qa=q.a)==null||Qa.measure(),(ae??(ae=new Set)).add(q));for(B=0;B<he;B+=1){if(ne=a[B],ie=_(ne,B),q=K.get(ie),q===void 0){var $=i.get(ie);if($!==void 0){i.delete(ie),K.set(ie,$);var Ta=be?be.next:H;At(o,be,$),At(o,$,Ta),Ts($,Ta,l),be=$}else{var ct=H?H.e.nodes_start:l;be=Bs(ct,o,be,be===null?o.first:be.next,ne,ie,B,f,d,G)}K.set(ie,be),Je=[],ce=[],H=be.next;continue}if(pe&&Oo(q,ne,B,d),q.e.f&As&&(Ws(q.e),b&&((Pa=q.a)==null||Pa.unfix(),(ae??(ae=new Set)).delete(q))),q!==H){if(X!==void 0&&X.has(q)){if(Je.length<ce.length){var qa=ce[0],ka;be=qa.prev;var Te=Je[0],Xt=Je[Je.length-1];for(ka=0;ka<Je.length;ka+=1)Ts(Je[ka],qa,l);for(ka=0;ka<ce.length;ka+=1)X.delete(ce[ka]);At(o,Te.prev,Xt.next),At(o,be,Te),At(o,Xt,qa),H=qa,be=Xt,B-=1,Je=[],ce=[]}else X.delete(q),Ts(q,H,l),At(o,q.prev,q.next),At(o,q,be===null?o.first:be.next),At(o,be,q),be=q;continue}for(Je=[],ce=[];H!==null&&H.k!==ie;)H.e.f&As||(X??(X=new Set)).add(H),ce.push(H),H=H.next;if(H===null)continue;q=H}Je.push(q),be=q,H=q.next}if(H!==null||X!==void 0){for(var yt=X===void 0?[]:To(X);H!==null;)H.e.f&As||yt.push(H),H=H.next;var Zt=yt.length;if(Zt>0){var rr=d&Ao&&he===0?l:null;if(b){for(B=0;B<Zt;B+=1)(re=yt[B].a)==null||re.measure();for(B=0;B<Zt;B+=1)(Dt=yt[B].a)==null||Dt.fix()}ni(o,yt,rr)}}b&&Mn(()=>{var Ot;if(ae!==void 0)for(q of ae)(Ot=q.a)==null||Ot.apply()}),t.first=o.first&&o.first.e,t.last=be&&be.e;for(var Gr of i.values())br(Gr.e);i.clear()}function Oo(t,a,o,i){i&gs&&vo(t.v,a),i&bs?vo(t.i,o):t.i=o}function Bs(t,a,o,i,l,f,d,_,G,b,pe){var he=(G&gs)!==0,K=(G&Sn)===0,aa=he?K?C(l,!1,!1):co(l):l,H=G&bs?co(d):d,X={i:H,v:aa,k:f,a:null,e:null,prev:o,next:i};try{if(t===null){var be=document.createDocumentFragment();be.append(t=Js())}return X.e=gr(()=>_(t,aa,H,b),da),X.e.prev=o&&o.e,X.e.next=i&&i.e,o===null?pe||(a.first=X):(o.next=X,o.e.next=X.e),i!==null&&(i.prev=X,i.e.prev=X.e),X}finally{}}function Ts(t,a,o){for(var i=t.next?t.next.e.nodes_start:o,l=a?a.e.nodes_start:o,f=t.e.nodes_start;f!==null&&f!==i;){var d=Pn(f);l.before(f),f=d}}function At(t,a,o){a===null?t.first=o:(a.next=o,a.e.next=o&&o.e),o!==null&&(o.prev=a,o.e.prev=a&&a.e)}function ve(t,a,o,i,l){var _;da&&hs();var f=(_=a.$$slots)==null?void 0:_[o],d=!1;f===!0&&(f=a.children,d=!0),f===void 0||f(t,d?()=>i:i)}function li(t,a,o,i,l,f){let d=da;da&&hs();var _,G,b=null;da&&Gt.nodeType===In&&(b=Gt,hs());var pe=da?Gt:t,he;ms(()=>{const K=a()||null;var aa=Ln;K!==_&&(he&&(K===null?Po(he,()=>{he=null,G=null}):K===G?Ws(he):br(he)),K&&K!==G&&(he=gr(()=>{if(b=da?b:document.createElementNS(aa,K),Fn(b,b),i){da&&pn(K)&&b.append(document.createComment(""));var H=da?Eo(b):b.appendChild(Js());da&&(H===null?tr(!1):Jr(H)),i(b,H)}Io.nodes_end=b,pe.before(b)})),_=K,_&&(G=_))},Rn),d&&(tr(!0),Jr(pe))}function di(t,a){var o=void 0,i;ms(()=>{o!==(o=a())&&(i&&(br(i),i=null),o&&(i=gr(()=>{Ks(()=>o(t))})))})}function Uo(t){var a,o,i="";if(typeof t=="string"||typeof t=="number")i+=t;else if(typeof t=="object")if(Array.isArray(t)){var l=t.length;for(a=0;a<l;a++)t[a]&&(o=Uo(t[a]))&&(i&&(i+=" "),i+=o)}else for(o in t)t[o]&&(i&&(i+=" "),i+=o);return i}function vi(){for(var t,a,o=0,i="",l=arguments.length;o<l;o++)(t=arguments[o])&&(a=Uo(t))&&(i&&(i+=" "),i+=a);return i}function qo(t){return typeof t=="object"?vi(t):t??""}const _o=[...` 	
\r\f \v\uFEFF`];function ci(t,a,o){var i=t==null?"":""+t;if(a&&(i=i?i+" "+a:a),o){for(var l in o)if(o[l])i=i?i+" "+l:l;else if(i.length)for(var f=l.length,d=0;(d=i.indexOf(l,d))>=0;){var _=d+f;(d===0||_o.includes(i[d-1]))&&(_===i.length||_o.includes(i[_]))?i=(d===0?"":i.substring(0,d))+i.substring(_+1):d=_}}return i===""?null:i}function uo(t,a=!1){var o=a?" !important;":";",i="";for(var l in t){var f=t[l];f!=null&&f!==""&&(i+=" "+l+": "+f+o)}return i}function Ps(t){return t[0]!=="-"||t[1]!=="-"?t.toLowerCase():t}function _i(t,a){if(a){var o="",i,l;if(Array.isArray(a)?(i=a[0],l=a[1]):i=a,t){t=String(t).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var f=!1,d=0,_=!1,G=[];i&&G.push(...Object.keys(i).map(Ps)),l&&G.push(...Object.keys(l).map(Ps));var b=0,pe=-1;const X=t.length;for(var he=0;he<X;he++){var K=t[he];if(_?K==="/"&&t[he-1]==="*"&&(_=!1):f?f===K&&(f=!1):K==="/"&&t[he+1]==="*"?_=!0:K==='"'||K==="'"?f=K:K==="("?d++:K===")"&&d--,!_&&f===!1&&d===0){if(K===":"&&pe===-1)pe=he;else if(K===";"||he===X-1){if(pe!==-1){var aa=Ps(t.substring(b,pe).trim());if(!G.includes(aa)){K!==";"&&he++;var H=t.substring(b,he).trim();o+=" "+H+";"}}b=he+1,pe=-1}}}}return i&&(o+=uo(i)),l&&(o+=uo(l,!0)),o=o.trim(),o===""?null:o}return t==null?null:String(t)}function sa(t,a,o,i,l,f){var d=t.__className;if(da||d!==o||d===void 0){var _=ci(o,i,f);(!da||_!==t.getAttribute("class"))&&(_==null?t.removeAttribute("class"):a?t.className=_:t.setAttribute("class",_)),t.__className=o}else if(f&&l!==f)for(var G in f){var b=!!f[G];(l==null||b!==!!l[G])&&t.classList.toggle(G,b)}return f}function Is(t,a={},o,i){for(var l in o){var f=o[l];a[l]!==f&&(o[l]==null?t.style.removeProperty(l):t.style.setProperty(l,f,i))}}function Vs(t,a,o,i){var l=t.__style;if(da||l!==a){var f=_i(a,i);(!da||f!==t.getAttribute("style"))&&(f==null?t.removeAttribute("style"):t.style.cssText=f),t.__style=a}else i&&(Array.isArray(i)?(Is(t,o==null?void 0:o[0],i[0]),Is(t,o==null?void 0:o[1],i[1],"important")):Is(t,o,i));return i}function Kr(t,a,o=!1){if(t.multiple){if(a==null)return;if(!Co(a))return Hn();for(var i of t.options)i.selected=a.includes(Wr(i));return}for(i of t.options){var l=Wr(i);if(Dn(l,a)){i.selected=!0;return}}(!o||a!==void 0)&&(t.selectedIndex=-1)}function Gs(t){var a=new MutationObserver(()=>{Kr(t,t.__value)});a.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),On(()=>{a.disconnect()})}function Rs(t,a,o=a){var i=!0;Ro(t,"change",l=>{var f=l?"[selected]":":checked",d;if(t.multiple)d=[].map.call(t.querySelectorAll(f),Wr);else{var _=t.querySelector(f)??t.querySelector("option:not([disabled])");d=_&&Wr(_)}o(d)}),Ks(()=>{var l=a();if(Kr(t,l,i),i&&l===void 0){var f=t.querySelector(":checked");f!==null&&(l=Wr(f),o(l))}t.__value=l,i=!1}),Gs(t)}function Wr(t){return"__value"in t?t.__value:t.value}const Hr=Symbol("class"),Dr=Symbol("style"),Bo=Symbol("is custom element"),Vo=Symbol("is html");function Oa(t){if(da){var a=!1,o=()=>{if(!a){if(a=!0,t.hasAttribute("value")){var i=t.value;Ce(t,"value",null),t.value=i}if(t.hasAttribute("checked")){var l=t.checked;Ce(t,"checked",null),t.checked=l}}};t.__on_r=o,Kn(o),Gn()}}function ui(t,a){var o=Xs(t);o.value===(o.value=a??void 0)||t.value===a&&(a!==0||t.nodeName!=="PROGRESS")||(t.value=a??"")}function fi(t,a){a?t.hasAttribute("selected")||t.setAttribute("selected",""):t.removeAttribute("selected")}function Ce(t,a,o,i){var l=Xs(t);da&&(l[a]=t.getAttribute(a),a==="src"||a==="srcset"||a==="href"&&t.nodeName==="LINK")||l[a]!==(l[a]=o)&&(a==="loading"&&(t[Un]=o),o==null?t.removeAttribute(a):typeof o!="string"&&Jo(t).includes(a)?t[a]=o:t.setAttribute(a,o))}function pi(t,a,o,i,l=!1){var f=Xs(t),d=f[Bo],_=!f[Vo];let G=da&&d;G&&tr(!1);var b=a||{},pe=t.tagName==="OPTION";for(var he in a)he in o||(o[he]=null);o.class?o.class=qo(o.class):o[Hr]&&(o.class=null),o[Dr]&&(o.style??(o.style=null));var K=Jo(t);for(const ce in o){let ne=o[ce];if(pe&&ce==="value"&&ne==null){t.value=t.__value="",b[ce]=ne;continue}if(ce==="class"){var aa=t.namespaceURI==="http://www.w3.org/1999/xhtml";sa(t,aa,ne,i,a==null?void 0:a[Hr],o[Hr]),b[ce]=ne,b[Hr]=o[Hr];continue}if(ce==="style"){Vs(t,ne,a==null?void 0:a[Dr],o[Dr]),b[ce]=ne,b[Dr]=o[Dr];continue}var H=b[ce];if(!(ne===H&&!(ne===void 0&&t.hasAttribute(ce)))){b[ce]=ne;var X=ce[0]+ce[1];if(X!=="$$")if(X==="on"){const ie={},q="$$"+ce;let B=ce.slice(2);var be=bn(B);if(hn(B)&&(B=B.slice(0,-7),ie.capture=!0),!be&&H){if(ne!=null)continue;t.removeEventListener(B,b[q],ie),b[q]=null}if(ne!=null)if(be)t[`__${B}`]=ne,So([B]);else{let $=function(Ta){b[ce].call(this,Ta)};b[q]=mn(B,t,$,ie)}else be&&(t[`__${B}`]=void 0)}else if(ce==="style")Ce(t,ce,ne);else if(ce==="autofocus")Xn(t,!!ne);else if(!d&&(ce==="__value"||ce==="value"&&ne!=null))t.value=t.__value=ne;else if(ce==="selected"&&pe)fi(t,ne);else{var ae=ce;_||(ae=gn(ae));var Je=ae==="defaultValue"||ae==="defaultChecked";if(ne==null&&!d&&!Je)if(f[ce]=null,ae==="value"||ae==="checked"){let ie=t;const q=a===void 0;if(ae==="value"){let B=ie.defaultValue;ie.removeAttribute(ae),ie.defaultValue=B,ie.value=ie.__value=q?B:null}else{let B=ie.defaultChecked;ie.removeAttribute(ae),ie.defaultChecked=B,ie.checked=q?B:!1}}else t.removeAttribute(ce);else Je||K.includes(ae)&&(d||typeof ne!="string")?(t[ae]=ne,ae in f&&(f[ae]=Zn)):typeof ne!="function"&&Ce(t,ae,ne)}}}return G&&tr(!0),b}function fo(t,a,o=[],i=[],l,f=!1){Jn(o,i,d=>{var _=void 0,G={},b=t.nodeName==="SELECT",pe=!1;if(ms(()=>{var K=a(...d.map(e)),aa=pi(t,_,K,l,f);pe&&b&&"value"in K&&Kr(t,K.value);for(let X of Object.getOwnPropertySymbols(G))K[X]||br(G[X]);for(let X of Object.getOwnPropertySymbols(K)){var H=K[X];X.description===Wn&&(!_||H!==_[X])&&(G[X]&&br(G[X]),G[X]=gr(()=>di(t,()=>H))),aa[X]=H}_=aa}),b){var he=t;Ks(()=>{Kr(he,_.value,!0),Gs(he)})}pe=!0})}function Xs(t){return t.__attributes??(t.__attributes={[Bo]:t.nodeName.includes("-"),[Vo]:t.namespaceURI===qn})}var po=new Map;function Jo(t){var a=t.getAttribute("is")||t.nodeName,o=po.get(a);if(o)return o;po.set(a,o=[]);for(var i,l=t,f=Element.prototype;f!==l;){i=Vn(l);for(var d in i)i[d].set&&o.push(d);l=Bn(l)}return o}function Ua(t,a,o=a){var i=new WeakSet;Ro(t,"input",async l=>{var f=l?t.defaultValue:t.value;if(f=Ls(t)?Fs(f):f,o(f),mr!==null&&i.add(mr),await Yn(),f!==(f=a())){var d=t.selectionStart,_=t.selectionEnd;t.value=f??"",_!==null&&(t.selectionStart=d,t.selectionEnd=Math.min(_,t.value.length))}}),(da&&t.defaultValue!==t.value||v(a)==null&&t.value)&&(o(Ls(t)?Fs(t.value):t.value),mr!==null&&i.add(mr)),Qn(()=>{var l=a();if(t===document.activeElement){var f=jn??mr;if(i.has(f))return}Ls(t)&&l===Fs(t.value)||t.type==="date"&&!l&&!t.value||l!==t.value&&(t.value=l??"")})}function Ls(t){var a=t.type;return a==="number"||a==="range"}function Fs(t){return t===""?null:+t}/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const hi={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const mi=t=>{for(const a in t)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 * 
 * Copyright (c) 2026 Lucide Icons and Contributors
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The following Lucide icons are derived from the Feather project:
 * 
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 * 
 * The MIT License (MIT) (for the icons listed above)
 * 
 * Copyright (c) 2013-present Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const ho=(...t)=>t.filter((a,o,i)=>!!a&&a.trim()!==""&&i.indexOf(a)===o).join(" ").trim();var gi=Ho("<svg><!><!></svg>");function fe(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]),i=oe(o,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);Lo(a,!1);let l=Ht(a,"name",8,void 0),f=Ht(a,"color",8,"currentColor"),d=Ht(a,"size",8,24),_=Ht(a,"strokeWidth",8,2),G=Ht(a,"absoluteStrokeWidth",8,!1),b=Ht(a,"iconNode",24,()=>[]);Mo();var pe=gi();fo(pe,(aa,H,X)=>({...hi,...aa,...i,width:d(),height:d(),stroke:f(),"stroke-width":H,class:X}),[()=>mi(i)?void 0:{"aria-hidden":"true"},()=>(de(G()),de(_()),de(d()),v(()=>G()?Number(_())*24/Number(d()):_())),()=>(de(ho),de(l()),de(o),v(()=>ho("lucide-icon","lucide",l()?`lucide-${l()}`:"",o.class)))]);var he=s(pe);Za(he,1,b,Xa,(aa,H)=>{var X=ei(()=>Do(e(H),2));let be=()=>e(X)[0],ae=()=>e(X)[1];var Je=I(),ce=w(Je);li(ce,be,!0,(ne,ie)=>{fo(ne,()=>({...ae()}))}),c(aa,Je)});var K=n(he);ve(K,a,"default",{}),r(pe),c(t,pe),Fo()}function mo(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];fe(t,ue({name:"activity"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function bi(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];fe(t,ue({name:"arrow-left"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Or(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];fe(t,ue({name:"arrow-right"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Ur(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M20 6 9 17l-5-5"}]];fe(t,ue({name:"check"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function $i(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"m9 18 6-6-6-6"}]];fe(t,ue({name:"chevron-right"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function qr(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];fe(t,ue({name:"circle-alert"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Br(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];fe(t,ue({name:"circle-check"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Vr(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];fe(t,ue({name:"circle-x"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function yi(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6h4"}]];fe(t,ue({name:"clock-3"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function go(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M12 13v8l-4-4"}],["path",{d:"m12 21 4-4"}],["path",{d:"M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"}]];fe(t,ue({name:"cloud-download"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function wi(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"m16 18 6-6-6-6"}],["path",{d:"m8 6-6 6 6 6"}]];fe(t,ue({name:"code"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function hr(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];fe(t,ue({name:"copy"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function ki(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];fe(t,ue({name:"database"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function xi(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];fe(t,ue({name:"download"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function bo(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];fe(t,ue({name:"eye-off"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function $o(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];fe(t,ue({name:"eye"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Hs(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M14.5 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.8"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M11.7 14.2 7 17l-4.7-2.8"}],["path",{d:"M3 13.1a2 2 0 0 0-.999 1.76v3.24a2 2 0 0 0 .969 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01z"}],["path",{d:"M7 17v5"}]];fe(t,ue({name:"file-box"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Ds(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];fe(t,ue({name:"file-text"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function zi(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{d:"M2 13h10"}],["path",{d:"m9 16 3-3-3-3"}]];fe(t,ue({name:"folder-input"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Ni(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];fe(t,ue({name:"folder"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Mi(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];fe(t,ue({name:"gauge"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function yo(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["circle",{cx:"12",cy:"12",r:"3"}],["line",{x1:"3",x2:"9",y1:"12",y2:"12"}],["line",{x1:"15",x2:"21",y1:"12",y2:"12"}]];fe(t,ue({name:"git-commit-horizontal"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function wo(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M10 16h.01"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}],["path",{d:"M21.946 12.013H2.054"}],["path",{d:"M6 16h.01"}]];fe(t,ue({name:"hard-drive"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function ko(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];fe(t,ue({name:"info"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Os(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor"}]];fe(t,ue({name:"key-round"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Si(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];fe(t,ue({name:"layers"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Ei(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];fe(t,ue({name:"layout-grid"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Ai(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];fe(t,ue({name:"list"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function mt(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56"}]];fe(t,ue({name:"loader-circle"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Ci(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"m16 17 5-5-5-5"}],["path",{d:"M21 12H9"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]];fe(t,ue({name:"log-out"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function us(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];fe(t,ue({name:"plus"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Ti(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];fe(t,ue({name:"refresh-cw"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Us(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];fe(t,ue({name:"search"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Pi(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18"}]];fe(t,ue({name:"server"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Ii(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M14 17H5"}],["path",{d:"M19 7h-9"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]];fe(t,ue({name:"settings-2"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Ri(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];fe(t,ue({name:"shield-check"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Li(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["path",{d:"M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["rect",{width:"8",height:"8",x:"14",y:"14",rx:"2"}]];fe(t,ue({name:"square-stack"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function Fi(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];fe(t,ue({name:"trash-2"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function xo(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];fe(t,ue({name:"triangle-alert"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function zo(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];fe(t,ue({name:"upload"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}function qs(t,a){const o=oe(a,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const i=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];fe(t,ue({name:"x"},()=>o,{get iconNode(){return i},children:(l,f)=>{var d=I(),_=w(d);ve(_,a,"default",{}),c(l,d)},$$slots:{default:!0}}))}const Wo="/api/miniface/v1";class Hi extends Error{constructor(a,o){super(a),this.status=o}}async function wa(t,a={},o){const i=new Headers(a.headers);i.set("Accept","application/json"),a.body&&i.set("Content-Type","application/json"),o&&i.set("X-CSRF-Token",o);let l;try{l=await fetch(`${Wo}${t}`,{...a,headers:i,credentials:"same-origin"}),typeof window<"u"&&window.dispatchEvent(new CustomEvent("miniface:connection",{detail:!0}))}catch(f){throw typeof window<"u"&&window.dispatchEvent(new CustomEvent("miniface:connection",{detail:!1})),f}if(!l.ok){let f=`Request failed (${l.status})`;try{const d=await l.json();f=d.error??d.message??f}catch{}throw new Hi(f,l.status)}return l.json()}const pa={session:()=>wa("/session"),setup:(t,a)=>wa("/setup",{method:"POST",body:JSON.stringify({setup_secret:t,password:a})}),login:t=>wa("/session",{method:"POST",body:JSON.stringify({password:t})}),logout:t=>wa("/session",{method:"DELETE"},t),models:async()=>(await wa("/models")).models,model:(t,a,o="")=>wa(`/models/${encodeURIComponent(t)}/${encodeURIComponent(a)}${o?`?revision=${encodeURIComponent(o)}`:""}`),filePreview:(t,a,o,i)=>wa(`/models/${encodeURIComponent(t)}/${encodeURIComponent(a)}/file?path=${encodeURIComponent(o)}&revision=${encodeURIComponent(i)}`),fileDownloadURL:(t,a,o,i)=>`${Wo}/models/${encodeURIComponent(t)}/${encodeURIComponent(a)}/download?path=${encodeURIComponent(o)}&revision=${encodeURIComponent(i)}`,jobs:async()=>(await wa("/jobs")).jobs,job:async t=>(await wa(`/jobs/${encodeURIComponent(t)}`)).job,cancelJob:async(t,a)=>(await wa(`/jobs/${encodeURIComponent(t)}/cancel`,{method:"POST"},a)).job,storage:()=>wa("/storage"),server:()=>wa("/server"),tokens:async()=>(await wa("/settings/tokens")).tokens,createToken:(t,a)=>wa("/settings/tokens",{method:"POST",body:JSON.stringify(t)},a),revokeToken:(t,a)=>wa(`/settings/tokens/${encodeURIComponent(t)}`,{method:"DELETE"},a),changePassword:(t,a,o)=>wa("/settings/password",{method:"PUT",body:JSON.stringify({current_password:t,new_password:a})},o),searchHuggingFace:async t=>(await wa(`/huggingface/models?search=${encodeURIComponent(t)}`)).models,importLocal:(t,a)=>wa("/imports",{method:"POST",body:JSON.stringify(t)},a),importHuggingFace:(t,a)=>wa("/imports/huggingface",{method:"POST",body:JSON.stringify(t)},a),saveCard:(t,a,o,i,l)=>wa(`/models/${encodeURIComponent(t)}/${encodeURIComponent(a)}/card`,{method:"PUT",body:JSON.stringify({content:o,message:i})},l)};var Di=Ho('<svg viewBox="0 0 180 180"><circle cx="90" cy="59" r="56.5" fill="var(--mark-foreground)"></circle><circle cx="90" cy="59" r="47.5" fill="var(--mark-background)"></circle><path d="M61 51c4-9 12-9 16 0l-4 3c-3-6-7-6-10 0Z" fill="var(--mark-foreground)"></path><path d="M103 51c4-9 12-9 16 0l-4 3c-3-6-7-6-10 0Z" fill="var(--mark-foreground)"></path><path d="M74 65c8 7 24 7 32 0-1 14-7 21-16 21S75 79 74 65Z" fill="var(--mark-foreground)"></path><path d="M15 86h150v50c0 20-14 33-35 33H50c-21 0-35-13-35-33Z" fill="var(--mark-foreground)"></path><circle cx="57" cy="88" r="15" fill="var(--mark-background)"></circle><circle cx="123" cy="88" r="15" fill="var(--mark-background)"></circle><circle cx="143" cy="147" r="9" fill="#F06A47"></circle></svg>');function fs(t,a){let o=Ht(a,"size",3,36),i=Ht(a,"title",3,""),l=Ht(a,"reversed",3,!1);var f=Di();let d;A(_=>{d=sa(f,0,"mark svelte-1iorax8",null,d,_),Ce(f,"width",o()),Ce(f,"height",o()),Ce(f,"role",i()?"img":void 0),Ce(f,"aria-hidden",i()?void 0:"true"),Ce(f,"aria-label",i()||void 0)},[()=>({reversed:l()})]),c(t,f)}function Le(t){if(!Number.isFinite(t)||t<0)return"—";if(t===0)return"0 B";const a=["B","KiB","MiB","GiB","TiB"],o=Math.min(Math.floor(Math.log(t)/Math.log(1024)),a.length-1),i=t/1024**o;return`${i.toFixed(o===0||i>=10?0:1)} ${a[o]}`}function Ca(t){return t?t.slice(0,8):"—"}function St(t){const a=new Date(t);return Number.isNaN(a.valueOf())?"Unknown":new Intl.DateTimeFormat(void 0,{dateStyle:"medium",timeStyle:"short"}).format(a)}function No(t){return Math.max(0,Math.min(100,t<=1?t*100:t))}function Et(t,a=Date.now()){const o=new Date(t).valueOf();if(!Number.isFinite(o))return"Unknown";const i=o-a,l=Math.abs(i);if(l<6e4)return"just now";const f=[["year",365*24*60*6e4],["month",30*24*60*6e4],["day",24*60*6e4],["hour",60*6e4],["minute",6e4]],[d,_]=f.find(([,G])=>l>=G)??f.at(-1);return new Intl.RelativeTimeFormat(void 0,{numeric:"auto"}).format(Math.round(i/_),d)}async function Oi(t,a,o,i,l,f,d,_,G){var b;(b=e(a))!=null&&b.csrf_token&&(await pa.logout(e(a).csrf_token),u(a,{authenticated:!1,setup_required:!1}),u(o,null),u(i,null),u(l,null),u(f,""),u(d,""),u(_,""),Ya(G,e(G).accessToken=""))}function Ui(t,a){localStorage.setItem("miniface:model-sort",e(a))}function qi(t,a,o,i,l,f,d){t.key==="ArrowDown"&&e(a).length?(t.preventDefault(),u(o,!0),i(e(l)<0?0:e(l)+1)):t.key==="ArrowUp"&&e(a).length?(t.preventDefault(),u(o,!0),i(e(l)<0?0:e(l)-1)):t.key==="Enter"&&e(o)&&e(l)>=0?(t.preventDefault(),f(e(a)[e(l)])):t.key==="Escape"&&e(o)&&(t.preventDefault(),d())}async function Bi(t,a,o,i,l,f,d,_){var G;if(!(!((G=e(a))!=null&&G.csrf_token)||!e(o))){u(i,!0),u(l,"");try{const b=await pa.saveCard(e(o).model.owner,e(o).model.name,e(f),e(d),e(a).csrf_token);"model"in b&&u(o,b),u(l,"Model card saved as a new immutable revision."),u(_,"success")}catch(b){u(l,b instanceof Error?b.message:"Save failed"),u(_,"error")}finally{u(i,!1)}}}var Vi=p('<meta name="description" content="A private, local-first model registry"/>'),Ji=()=>location.reload(),Wi=p('<!> <p> </p> <button class="button secondary">Try again</button>',1),Ki=p("<!> <p>Opening your registry…</p>",1),Gi=p('<main class="boot-screen"><div class="boot-brand"><!><span>miniface</span></div> <!></main>'),Xi=(t,a)=>u(a,!e(a)),Zi=p('<label for="credential">Setup secret</label> <div class="password-field"><!> <input id="credential" required autocomplete="one-time-code" placeholder="mf_setup_••••••••"/> <button type="button" class="field-button"><!></button></div>',1),Yi=p('<label for="password-confirmation">Confirm password</label> <input id="password-confirmation" type="password" required minlength="12" autocomplete="new-password"/>',1),Qi=p('<p class="inline-alert danger"><!> </p>'),ji=p("<!> Working…",1),el=p(" <!>",1),al=p('<main class="auth-shell"><section class="login-wrap"><div class="login-card"><div class="login-brand"><!><span>miniface</span></div> <h2> </h2> <p class="subtle"> </p> <form><!> <label for="password"> </label> <div class="password-field"><!> <input id="password" type="password" required/></div> <!> <!> <button class="button primary wide"><!></button></form></div></section></main>'),tl=(t,a)=>a("/models"),rl=(t,a,o)=>a(e(o).path),sl=p("<button><!> <span> </span></button>"),ol=(t,a)=>a("/models"),nl=(t,a)=>a("/imports"),il=p('<div class="connection-banner" role="alert"><!> Connection lost — retrying</div>'),ll=(t,a,o)=>a(e(o)),dl=p('<div class="page-alert" role="alert"><!> <div><strong>Something went wrong</strong><span> </span></div> <button class="button secondary small">Retry</button></div>'),vl=(t,a)=>a("/imports"),cl=(t,a)=>u(a,""),_l=p('<button type="button" aria-label="Clear search"><!></button>'),ul=(t,a)=>a("grid"),fl=(t,a)=>a("list"),pl=p('<div class="empty-state compact"><!><h2>Loading your library</h2></div>'),hl=(t,a)=>u(a,""),ml=p('<button class="button secondary">Clear search</button>'),gl=(t,a)=>a("/imports"),bl=p('<button class="button primary"><!> Import your first model</button>'),$l=p('<div class="empty-state"><div class="empty-illustration"><!></div> <h2> </h2> <p> </p> <!></div>'),yl=(t,a,o)=>a(`/models/${e(o).owner}/${e(o).name}`),wl=p('<span class="badge"> </span>'),kl=p('<p class="base-model"><!> </p>'),xl=p('<button class="model-card"><div class="model-card-top"><div class="model-glyph"><!><i></i></div> <span></span></div> <div class="model-title"><span> </span> <h2> </h2></div> <p class="architecture"> </p> <div class="badges"><span class="badge brand"> </span> <!> <span> </span></div> <!> <dl class="model-facts"><div><dt>Size</dt><dd> </dd></div> <div><dt>Files</dt><dd> </dd></div> <div><dt>Revision</dt><dd><code> </code></dd></div></dl> <div class="model-card-foot"><span> </span><!></div></button>'),zl=p('<div class="model-grid"></div>'),Nl=(t,a,o)=>a(`/models/${e(o).owner}/${e(o).name}`),Ml=p('<button class="model-row"><span class="model-row-name"><i><!></i><span><strong> </strong><small> <code> </code></small></span></span> <span><span class="badge brand"> </span></span> <span class="row-value"> </span> <span class="row-value"> </span> <span class="row-arrow"><!></span></button>'),Sl=p('<section class="model-list surface"><div class="model-list-head" aria-hidden="true"><span>Model</span><span>Type</span><span>Size</span><span>Updated</span><span></span></div> <!></section>'),El=p('<header class="page-header"><div><h1>Models</h1></div> <button class="button primary"><!> Import model</button></header> <section class="library-toolbar" aria-label="Model filters"><label class="search-field"><!> <input aria-label="Search models" placeholder="Search your library"/> <!></label> <div class="toolbar-end"><span class="result-count"> </span> <label class="select-wrap" aria-label="Sort models"><select><option>Recently updated</option><option>Name</option><option>Largest first</option></select></label> <div class="view-switch" aria-label="Model view"><button aria-label="Grid view"><!></button> <button aria-label="List view"><!></button></div></div></section> <!>',1),Al=p('<div class="empty-state compact"><!><h2>Opening repository</h2></div>'),Cl=(t,a)=>a("/models"),Tl=(t,a,o)=>{var i;return a(((i=e(o))==null?void 0:i.model.sha)||"","revision")},Pl=p("<!> Copied",1),Il=p("<!> <code> </code>",1),Rl=(t,a,o)=>a(`/models/${e(o)[1]}/${e(o)[2]}/usage`,!1),Ll=p('<button class="button primary"><!> Get code</button>'),Fl=(t,a,o,i)=>a(`/models/${e(o)[1]}/${e(o)[2]}${e(i).slug==="overview"?"":`/${e(i).slug}`}`,!1),Hl=p('<button role="tab"> </button>'),Dl=p('<div class="callout warning"><!><div><strong>Base revision is not pinned</strong><span>Pin an immutable base revision before using this adapter for reproducible loads.</span></div></div>'),Ol=(t,a,o)=>a(`/models/${e(o)[1]}/${e(o)[2]}/model-card`,!1),Ul=p("<h4> </h4>"),ql=p("<h3> </h3>"),Bl=p("<h2> </h2>"),Vl=p('<p class="card-list-item"> </p>'),Jl=p("<p> </p>"),Wl=p('<span class="card-space"></span>'),Kl=p('<div class="card-text"></div>'),Gl=p('<div class="inline-empty"><!><div><strong>No model card yet</strong><span>Add notes, limitations, and usage guidance for this model.</span></div></div>'),Xl=p("<code> </code>"),Zl=p('<div><dt>Base model</dt><dd class="metadata-reference"> <!></dd></div>'),Yl=p('<div><dt>Source</dt><dd class="metadata-reference"> <code> </code></dd></div>'),Ql=p('<!> <div class="overview-grid"><section class="surface model-card-content"><div class="section-heading"><div><span class="kicker">README.md</span><h2>Model card</h2></div><button class="button ghost small">Edit <!></button></div> <!></section> <aside class="overview-side"><section class="surface metadata-card"><div class="section-heading"><div><h2>Model details</h2></div></div> <dl class="metadata-list"><div><dt>Architecture</dt><dd> </dd></div> <div><dt>Quantization</dt><dd> </dd></div> <div><dt>Last updated</dt><dd> </dd></div> <div><dt>Current revision</dt><dd><code> </code></dd></div> <!> <!></dl></section></aside></div>',1),jl=(t,a)=>u(a,""),ed=p('<button type="button" aria-label="Clear file search"><!></button>'),ad=(t,a)=>a(t.currentTarget.value),td=p("<option> </option>"),rd=(t,a)=>a(""),sd=p("<!><button> </button>",1),od=p('<nav class="file-breadcrumbs panel-padding" aria-label="File path"><button>Files</button> <!></nav>'),nd=p('<div class="inline-empty file-empty"><!><div><strong>No files found</strong></div></div>'),id=(t,a,o,i)=>e(a).type==="directory"?o(e(a).path):i(e(a)),ld=p('<span class="badge"> </span>'),dd=p('<button><span class="file-name"><!> </span> <span><!></span> <span> </span></button>'),vd=p('<div class="file-details surface"><!> Opening file…</div>'),cd=p("<div><dt>SHA-256</dt><dd><code> </code></dd></div>"),_d=p("<div><dt>Xet hash</dt><dd><code> </code></dd></div>"),ud=p('<pre class="file-preview"><code> </code></pre>'),fd=p('<p class="section-description">Preview is not available for this file type.</p>'),pd=p('<p class="section-description">Preview limited to the first 64 KiB.</p>'),hd=p('<section class="file-details surface"><div class="section-heading"><div><h2> </h2><span class="section-meta"> </span></div><a class="button secondary"><!> Download</a></div> <dl class="file-hashes"><!> <!></dl> <!> <!></section>'),md=p('<section class="surface data-panel file-browser"><div class="file-browser-toolbar panel-padding"><label class="search-field"><!><input aria-label="Search repository paths" placeholder="Search paths"/><!></label> <label class="select-wrap revision-select"><span>Revision</span><select></select></label></div> <!> <div class="file-table"><div class="file-row file-head" aria-hidden="true"><span>Path</span><span>Storage</span><span>Size</span></div> <!> <!></div></section> <!> <!>',1),gd=p('<span class="badge brand">current</span>'),bd=(t,a,o)=>a(e(o).oid,`revision-${e(o).oid}`),$d=p('<article><div class="timeline-marker"><!></div> <div class="revision-body"><div><h3> </h3><!></div> <p> </p> <button class="commit-copy"><code> </code><!></button></div></article>'),yd=p('<section class="surface revision-panel"><div class="section-heading"><div><h2>Revisions</h2></div><span class="section-meta"> </span></div> <div class="timeline"></div></section>'),wd=(t,a,o,i)=>a(o(e(i).key),`usage-${e(i).key}`),kd=p("<!> Copied",1),xd=p("<!> Copy",1),zd=p('<article><div><span><strong> </strong><small> </small></span><button class="copy-button"><!></button></div> <pre><code> </code></pre></article>'),Nd=p('<div class="callout info"><!><div><strong>Pinned revision</strong><span>Set <code>HF_ENDPOINT</code> before importing Hugging Face libraries. These examples use <code> </code>.</span></div></div> <section class="usage-grid"></section>',1),Md=p("<p><!> </p>"),Sd=p("<!> Saving…",1),Ed=p('<section class="editor-layout"><div class="surface editor-panel"><div class="section-heading"><div><span class="kicker">README.md</span><h2>Edit model card</h2></div><span class="badge">Markdown</span></div> <label for="card">Markdown content</label> <textarea id="card" rows="20" placeholder="# Model name  Describe this model…"></textarea> <label for="card-message">Revision message</label> <input id="card-message"/> <!> <div class="form-actions"><span>Saving creates a new immutable revision.</span><button class="button primary"><!></button></div></div></section>'),Ad=p('<button class="text-button breadcrumb"><!> Model library</button> <header class="repository-header"><div class="repository-identity"><div class="repository-glyph"><!></div> <div><div class="badges compact-badges"><span class="badge brand"> </span> <span> </span></div> <h1><span> </span> </h1> <p> </p></div></div> <div class="repository-actions"><button class="button secondary"><!></button> <!></div></header> <div class="detail-tabs" role="tablist" aria-label="Repository sections"></div> <!>',1),Cd=(t,a)=>a("local"),Td=(t,a)=>a("huggingface"),Pd=p('<div class="field-group"><label for="path">Directory path</label> <input id="path" required placeholder="/home/me/models/llama-adapter"/> <small>The path is read by the Miniface server. Symlinks and unsafe files are rejected.</small></div>'),Id=(t,a,o)=>{Ya(a,e(a).sourceRepository=t.currentTarget.value),o()},Rd=t=>t.preventDefault(),Ld=(t,a,o)=>a(e(o)),Fd=p('<button type="button" role="option" tabindex="-1"><span><strong> </strong><small> </small></span> <span><strong> </strong><small> </small></span></button>'),Hd=p('<div id="hub-results" class="hub-results" role="listbox"></div>'),Dd=p('<div class="access-note warning"><!><div><strong>Hugging Face access required</strong><span>Accept this model’s terms, then provide a read token below.</span></div></div>'),Od=p('<p class="inline-alert danger"><!> </p>'),Ud=(t,a)=>u(a,!e(a)),qd=p('<div class="field-group"><label for="hub-repo">Repository</label> <div class="hub-picker"><div class="input-with-icon"><!><input id="hub-repo" role="combobox" aria-autocomplete="list" aria-controls="hub-results" required pattern="[^/]+/[^/]+" autocomplete="off" placeholder="google/gemma-3-1b-it" aria-describedby="hub-help"/><!></div> <!></div> <small id="hub-help">Search public models or enter an exact public, private, or gated repository ID.</small></div> <!> <!> <div class="field-row"><div class="field-group"><label for="hub-revision">Source revision</label> <input id="hub-revision" required placeholder="main"/> <small>Branch, tag, or commit.</small></div> <div class="field-group"><label for="hub-token">Access token <span> </span></label> <div class="password-field light"><input id="hub-token" autocomplete="off" placeholder="hf_••••••••••••"/><button type="button" class="field-button"><!></button></div> <small>Held only for the active job.</small></div></div>',1),Bd=p('<input id="repo" required pattern="[^/]+/[^/]+" placeholder="team/model-name"/>'),Vd=p('<input id="repo" required pattern="[^/]+/[^/]+" placeholder="team/model-name"/>'),Jd=p('<input id="message" required/>'),Wd=p('<input id="message" required/>'),Kd=p('<div role="status"><!><div><strong>Couldn’t start import</strong><span> </span></div></div>'),Gd=p("<!> Queueing…",1),Xd=p("Import model <!>",1),Zd=p('<header class="page-header"><div><h1>Import model</h1></div></header> <div class="import-layout"><section class="import-main"><div class="source-options" role="radiogroup" aria-label="Import source"><button role="radio"><span class="source-icon"><!></span> <span><strong>Local folder</strong></span> <i></i></button> <button role="radio"><span class="source-icon"><!></span> <span><strong>Hugging Face</strong></span> <i></i></button></div> <section class="surface import-form-card"><div class="section-heading"><div><h2> </h2></div></div> <form><!> <div class="field-group"><label for="repo">Miniface repository</label> <!></div> <div class="field-group"><label for="message">Revision message</label> <!></div> <!> <div class="form-actions import-actions"><span></span><button class="button primary"><!></button></div></form></section></section></div>',1),Yd=(t,a)=>a(),Qd=p('<p class="inline-alert danger page-inline-alert"><!> </p>'),jd=p('<div class="empty-state compact"><!><h2>Loading activity</h2></div>'),ev=(t,a)=>a("/imports"),av=p('<div class="empty-state"><div class="empty-illustration"><!></div><h2>Nothing running yet</h2><p>Imports and other background work will appear here.</p><button class="button primary"><!> Start an import</button></div>'),tv=(t,a)=>u(a,"all"),rv=(t,a)=>u(a,"active"),sv=(t,a)=>u(a,"completed"),ov=p('<span class="polling-note"><i></i> Updates automatically</span>'),nv=p('<div class="empty-state compact"><!><h2>No jobs in this view</h2></div>'),iv=p("<small> </small>"),lv=p('<div class="progress"><i></i></div>'),dv=(t,a,o)=>a(e(o)),vv=p('<button class="button danger small"> </button>'),cv=(t,a)=>a("/imports"),_v=p('<button class="button secondary small">Import another</button>'),uv=(t,a,o)=>u(a,e(a)===e(o).id?"":e(o).id),fv=p("<strong>Error</strong><code> </code>",1),pv=p("@ <code> </code>",1),hv=p("<span> <!></span>"),mv=p("<span> </span>"),gv=p("<div><!> <!> <!> <span> </span> <span>Job ID: <code> </code></span></div>"),bv=p('<article><div class="job-main-row"><span><!></span> <div class="job-name"><strong> </strong><span> </span></div> <div class="job-progress-cell"><div><span> </span><!></div> <!></div> <time> </time> <div class="job-actions"><!> <!> <button><!> Details</button></div></div> <!></article>'),$v=p('<section class="jobs-list surface"></section>'),yv=p('<div class="activity-summary"><div><span class="activity-icon active"><!></span><span><strong> </strong><small>Active</small></span></div> <div><span class="activity-icon done"><!></span><span><strong> </strong><small>Completed</small></span></div></div> <div class="activity-toolbar"><div class="filter-tabs" aria-label="Filter activity"><button>All <span> </span></button> <button>Active <span> </span></button> <button>History <span> </span></button></div> <!></div> <!>',1),wv=p('<header class="page-header"><div><h1>Activity</h1></div> <button class="button secondary"><!> Refresh</button></header> <!> <!>',1),kv=p('<div class="empty-state compact"><!><h2>Reading storage</h2></div>'),xv=(t,a,o)=>a(`/models/${e(o).owner}/${e(o).name}/files`),zv=p('<button class="storage-repository-row"><strong> </strong><span> </span><span> </span><span> </span><span> </span></button>'),Nv=p('<div class="storage-stats"><article class="surface stat-card"><span class="stat-icon pine"><!></span><div><span>Logical usage</span><strong> </strong></div></article> <article class="surface stat-card"><span class="stat-icon ink"><!></span><div><span>Physical usage</span><strong> </strong></div></article> <article class="surface stat-card"><span class="stat-icon sage"><!></span><div><span>Deduplication</span><strong> </strong></div></article></div> <section class="surface efficiency-card storage-comparison"><div class="section-heading"><div><h2>Logical and physical usage</h2></div></div> <div class="storage-bars"><div><span><strong>Logical</strong><small> </small></span><i><b style="width:100%"></b></i></div> <div><span><strong>Physical</strong><small> </small></span><i><b class="physical"></b></i></div></div></section> <section class="surface repository-storage"><div class="section-heading panel-padding"><div><h2>Repositories</h2></div><span class="section-meta"> </span></div> <div class="storage-repository-row storage-repository-head" aria-hidden="true"><span>Repository</span><span>Logical size</span><span>Files</span><span>Revisions</span><span>Updated</span></div> <!></section>',1),Mv=p('<header class="page-header"><div><h1>Storage</h1></div></header> <!>',1),Sv=(t,a,o)=>a(o(),"endpoint"),Ev=p("<!> Copied",1),Av=p("<!> Copy endpoint",1),Cv=p('<div class="mini-warning"><!><span><strong>Use a fresh uploader process.</strong> The client reads <code>HF_HUB_DISABLE_XET</code> at import time.</span></div>'),Tv=(t,a,o,i)=>a(o(e(i).key),`setting-${e(i).key}`),Pv=p("<!> Copied",1),Iv=p("<!> Copy",1),Rv=p('<article class="surface setup-card"><div class="setup-heading"><span><!></span><div><h2> </h2></div></div> <!> <div class="code-block"><button class="copy-button"><!></button><pre><code> </code></pre></div></article>'),Lv=(t,a,o)=>a(e(o),"new-token"),Fv=p('<div class="created-token"><code> </code><button class="button secondary small"><!> Copy</button></div>'),Hv=p('<p class="section-description"> </p>'),Dv=p('<span class="badge status-muted">Revoked</span>'),Ov=p('<span class="badge status-muted">Expired</span>'),Uv=(t,a,o)=>a(e(o).id),qv=p('<button class="button danger small"><!> Revoke</button>'),Bv=p("<div><span><strong> </strong><small> </small></span><!></div>"),Vv=p('<p class="section-description"> </p>'),Jv=p('<details class="surface server-details"><summary>Server details</summary><dl><div><dt>Version</dt><dd> </dd></div><div><dt>Storage backend</dt><dd>Local filesystem</dd></div><div><dt>Metadata database</dt><dd> </dd></div><div><dt>Data directory</dt><dd><code> </code></dd></div><div><dt>Available disk</dt><dd> </dd></div><div><dt>Garbage collection</dt><dd>Not available</dd></div><div><dt>Runtime</dt><dd> </dd></div></dl></details>'),Wv=p('<header class="page-header"><div><h1>Settings</h1></div></header> <section class="endpoint-hero"><div><span class="endpoint-icon"><!></span><span><small>Server endpoint</small><strong> </strong></span></div> <button class="button inverse"><!></button></section> <div class="settings-sections"><section class="settings-main settings-section"><h2>Client setup</h2> <!></section> <section class="settings-section"><h2>Tokens</h2> <div class="surface token-manager"><form class="token-form"><label>Name<input required maxlength="100"/></label> <label>Access<select><option>Read</option><option>Read and write</option></select></label> <label>Expiration<select><option>No expiration</option><option>30 days</option><option>90 days</option><option>1 year</option></select></label> <button class="button primary">Create token</button></form> <!> <!> <div class="token-list"></div></div></section> <section class="settings-section"><h2>Administrator</h2> <form class="surface password-settings"><label>Current password<input type="password" required autocomplete="current-password"/></label><label>New password<input type="password" required minlength="12" autocomplete="new-password"/></label><button class="button secondary">Change password</button><!></form></section> <!></div>',1),Kv=(t,a)=>a("/models"),Gv=p('<div class="empty-state"><div class="empty-illustration"><!></div><h2>Page not found</h2><p>This part of Miniface doesn’t exist.</p><button class="button primary">Back to models</button></div>'),Xv=p('<div class="toast" role="status"><!> </div>'),Zv=p('<a class="skip-link" href="#main-content">Skip to content</a> <div class="app-shell"><aside class="sidebar"><button class="sidebar-brand" aria-label="Miniface models"><!> <span>miniface</span></button> <nav aria-label="Main navigation"></nav> <div class="sidebar-foot"><div class="account-row"><div class="avatar"> </div> <div><strong> </strong><small>Administrator</small></div> <button class="icon-button dark" title="Sign out" aria-label="Sign out"><!></button></div></div></aside> <div class="mobile-bar"><button class="mobile-brand" aria-label="Miniface models"><!><span>miniface</span></button> <button class="icon-button" aria-label="Import a model"><!></button></div> <main id="main-content" class="content"><!> <!> <!></main></div> <!>',1);function tc(t,a){Lo(a,!1);const o=C(),i=C(),l=C(),f=C(),d=C(),_=C(),G=C();let b=C(null),pe=C(""),he=C(""),K=C(""),aa=C(""),H=C(!1),X=C(""),be=C(!1),ae=C("/"),Je=C(""),ce=C(!1),ne=C(null),ie=C(""),q=C("grid"),B=C("updated"),$=C(null),Ta=C("overview"),ct=C(""),qa=C(""),ka=C(""),Te=C(null),Xt=C(!1),yt=C(""),Zt=C("Update model card"),rr=C(""),Gr=C("success"),Qa=C("local"),Pa=C({path:"",repository:"",message:"Import local model"}),re=C({sourceRepository:"",sourceRevision:"main",accessToken:"",destinationRepository:"",message:"Import from Hugging Face"}),Dt=C(!1),Ot=C(""),Zs=C("success"),Xr=C(!1),Ut=C([]),wt=C(null),Zr=C(!1),Yr=C(""),$r,yr=0,Qr="",kt=C(-1),qt=C(!1),wr=C(),Ma=C(null),Ct=C("all"),sr=C(""),jr=C(""),es=C(!1),Yt=C(""),ba=C(null),Ba=C(null),or=C(null),as=C("Local CLI"),ts=C("write"),rs=C(0),Tt=C(""),kr=C(""),ss=C(!1),Pt=C(""),It=C(""),xr=C(""),gt=C(""),os=C(""),zr;const Ko=[{path:"/models",label:"Models",icon:Si},{path:"/imports",label:"Import",icon:zo},{path:"/jobs",label:"Activity",icon:mo},{path:"/storage",label:"Storage",icon:wo},{path:"/settings",label:"Settings",icon:Ii}],Ys=[{label:"Overview",slug:"overview"},{label:"Files",slug:"files"},{label:"Revisions",slug:"revisions"},{label:"Usage",slug:"usage"},{label:"Model card",slug:"model-card"}];$n(()=>{u(ae,location.pathname);const h=localStorage.getItem("miniface:model-view"),M=localStorage.getItem("miniface:model-sort");(h==="grid"||h==="list")&&u(q,h),(M==="updated"||M==="name"||M==="size")&&u(B,M);const V=()=>u(ae,location.pathname),ze=Ie=>u(ce,!Ie.detail),Ra=Ie=>{e(wr)&&!e(wr).contains(Ie.target)&&Nr()};addEventListener("popstate",V),addEventListener("miniface:connection",ze),document.addEventListener("pointerdown",Ra),pa.session().then(Ie=>u(b,Ie)).catch(Ie=>u(pe,Ie.message));const xa=window.setInterval(()=>{var Ie;e(ce)?pa.session().then(va=>{va.authenticated||u(b,va)}).catch(()=>{}):(Ie=e(b))!=null&&Ie.authenticated&&e(i)==="jobs"&&e(f)>0&&$s(!1)},4e3);return()=>{removeEventListener("popstate",V),removeEventListener("miniface:connection",ze),document.removeEventListener("pointerdown",Ra),clearInterval(xa),$r&&clearTimeout($r),zr&&clearTimeout(zr)}});function Ia(h,M=!0){e(i)==="imports"&&!h.startsWith("/imports")&&Ya(re,e(re).accessToken=""),e(i)==="settings"&&!h.startsWith("/settings")&&(u(Tt,""),u(Pt,""),u(It,"")),location.pathname!==h&&history.pushState({},"",h),u(ae,h),M&&requestAnimationFrame(()=>window.scrollTo({top:0,behavior:"smooth"}))}async function Qs(h){var M;u(Je,"");try{const V=h.split("/").filter(Boolean);if(!V.length||V[0]==="models"&&V.length===1)e(ne)||u(ne,await pa.models());else if(V[0]==="models"&&V.length>=3){const ze=Ys.find(xa=>xa.slug===(V[3]||"overview"));u(Ta,(ze==null?void 0:ze.slug)||"overview");const Ra=`${V[1]}/${V[2]}`;if(((M=e($))==null?void 0:M.model.id)!==Ra){u($,null);const xa=await pa.model(V[1],V[2]);e(ae)===h&&(u($,xa),u(ct,xa.model.sha),u(qa,""),u(ka,""),u(Te,null),u(yt,xa.card),u(rr,""))}}else V[0]==="jobs"?(await $s(!1),V[1]&&(u(Yt,V[1]),requestAnimationFrame(()=>{var ze;return(ze=document.getElementById(`job-${V[1]}`))==null?void 0:ze.scrollIntoView({block:"center"})}))):V[0]==="storage"?u(ba,await pa.storage()):V[0]==="settings"&&await(async ze=>{var Ra=Do(ze,2);u(Ba,Ra[0]),u(or,Ra[1])})(await Promise.all([pa.server(),pa.tokens()]))}catch(V){u(Je,V instanceof Error?V.message:"Unable to load this page")}}async function Go(){var h;u(be,!0),u(X,"");try{if((h=e(b))!=null&&h.setup_required){if(e(K)!==e(aa))throw new Error("Passwords do not match");u(b,await pa.setup(e(he),e(K)))}else u(b,await pa.login(e(K)));u(he,""),u(K,""),u(aa,"")}catch(M){u(X,M instanceof Error?M.message:"Sign in failed")}finally{u(be,!1)}}function js(h){u(q,h),localStorage.setItem("miniface:model-view",h)}function eo(h){h!==e(Qa)&&(u(Qa,h),u(Ot,""),Nr())}function Xo(){$r&&clearTimeout($r);const h=e(re).sourceRepository.trim(),M=++yr;if(u(Zr,!1),u(Ut,[]),u(kt,-1),u(qt,!1),u(wt,null),u(Yr,""),!e(re).destinationRepository||e(re).destinationRepository===Qr){const V=h.includes("/")?h:"";Ya(re,e(re).destinationRepository=V),Qr=V}h.length<2||($r=setTimeout(async()=>{u(Zr,!0);try{const V=await pa.searchHuggingFace(h);M===yr&&(u(Ut,V),u(qt,V.length>0))}catch(V){M===yr&&u(Yr,V instanceof Error?V.message:"Search failed")}finally{M===yr&&u(Zr,!1)}},250))}function ao(h){const M=Qr;Ya(re,e(re).sourceRepository=h.id),u(wt,h),Nr(),yr++,(!e(re).destinationRepository||e(re).destinationRepository===M)&&(Ya(re,e(re).destinationRepository=h.id),Qr=h.id)}function Nr(){u(qt,!1),u(kt,-1)}function Zo(h){u(kt,Math.max(0,Math.min(e(Ut).length-1,h))),requestAnimationFrame(()=>{var M;return(M=document.getElementById(`hub-option-${e(kt)}`))==null?void 0:M.scrollIntoView({block:"nearest"})})}async function Yo(){var h;if(!(!((h=e(b))!=null&&h.csrf_token)||e(Dt))){u(Dt,!0),u(Ot,"");try{const M=e(Qa)==="local"?await pa.importLocal({path:e(Pa).path,repo_id:e(Pa).repository,message:e(Pa).message},e(b).csrf_token):await pa.importHuggingFace({source_repo_id:e(re).sourceRepository,source_revision:e(re).sourceRevision,destination_repo_id:e(re).destinationRepository,message:e(re).message,token:e(re).accessToken},e(b).csrf_token);e(Qa)==="local"?Ya(Pa,e(Pa).path=""):Ya(re,e(re).accessToken=""),u(ne,null),u(Ma,[M.job]),Ia(`/jobs/${M.job.id}`)}catch(M){u(Ot,M instanceof Error?M.message:"Import failed"),u(Zs,"error")}finally{u(Dt,!1)}}}async function $s(h=!0){h&&u(es,!0);try{u(Ma,await pa.jobs())}finally{u(es,!1)}}async function Qo(h){var M,V;if((M=e(b))!=null&&M.csrf_token){u(sr,h.id),u(jr,"");try{const ze=await pa.cancelJob(h.id,e(b).csrf_token);u(Ma,((V=e(Ma))==null?void 0:V.map(Ra=>Ra.id===ze.id?ze:Ra))??null)}catch(ze){u(jr,ze instanceof Error?ze.message:"Unable to cancel job")}finally{u(sr,"")}}}function jo(h,M,V){const ze=V.trim().toLowerCase();if(ze)return h.filter(Ie=>Ie.path.toLowerCase().includes(ze)).map(Ie=>({...Ie,type:"file",name:Ie.path}));const Ra=new Map,xa=[];for(const Ie of h){if(!Ie.path.startsWith(M))continue;const va=Ie.path.slice(M.length),ja=va.indexOf("/");if(ja>=0){const Va=va.slice(0,ja),xt=`${M}${Va}/`;Ra.set(xt,{type:"directory",name:Va,path:xt})}else xa.push({...Ie,type:"file",name:va})}return[...Ra.values(),...xa].sort((Ie,va)=>Ie.type!==va.type?Ie.type==="directory"?-1:1:Ie.name.localeCompare(va.name))}function ys(h){u(qa,h),u(Te,null)}async function en(h){if(e($)){u(Xt,!0);try{u(Te,await pa.filePreview(e($).model.owner,e($).model.name,h.path,e(ct)))}catch(M){u(Je,M instanceof Error?M.message:"Unable to open file")}finally{u(Xt,!1)}}}async function an(h){if(!e($)||h===e(ct))return;const{owner:M,name:V}=e($).model;u(Je,"");try{u($,await pa.model(M,V,h)),u(ct,e($).model.sha),u(qa,""),u(Te,null)}catch(ze){u(Je,ze instanceof Error?ze.message:"Unable to load revision")}}function tn(h){return e($)?pa.fileDownloadURL(e($).model.owner,e($).model.name,h,e(ct)):""}async function rn(){var h;if(!(!((h=e(b))!=null&&h.csrf_token)||!e(as).trim())){u(kr,"");try{const M=await pa.createToken({name:e(as),scopes:[e(ts)],expires_in_days:e(rs)},e(b).csrf_token);u(Tt,M.token),u(or,[M.token_details,...e(or)??[]]),u(kr,"Copy this token now. It will not be shown again.")}catch(M){u(kr,M instanceof Error?M.message:"Unable to create token")}}}async function sn(h){var M,V;(M=e(b))!=null&&M.csrf_token&&(await pa.revokeToken(h,e(b).csrf_token),u(or,((V=e(or))==null?void 0:V.map(ze=>ze.id===h?{...ze,revoked_at:new Date().toISOString()}:ze))??null))}async function on(){var h;if(!(!((h=e(b))!=null&&h.csrf_token)||e(ss))){u(ss,!0),u(xr,"");try{u(b,await pa.changePassword(e(Pt),e(It),e(b).csrf_token)),u(Pt,""),u(It,""),u(xr,"Password updated. Other browser sessions were signed out.")}catch(M){u(xr,M instanceof Error?M.message:"Unable to change password")}finally{u(ss,!1)}}}async function nr(h,M){try{await navigator.clipboard.writeText(h),u(gt,M),to("Copied to clipboard"),window.setTimeout(()=>{e(gt)===M&&u(gt,"")},1800)}catch{to("Clipboard access is unavailable")}}function to(h){u(os,h),zr&&clearTimeout(zr),zr=setTimeout(()=>u(os,""),2200)}function ir(){return location.origin}function ro(h){return h==="env"?`export HF_ENDPOINT=${ir()}
export HF_TOKEN=mf_pat_your_token`:h==="download"?`export HF_ENDPOINT=${ir()}
export HF_TOKEN=mf_pat_your_token

hf download owner/model`:`export HF_ENDPOINT=${ir()}
export HF_TOKEN=mf_pat_your_token
export HF_HUB_DISABLE_XET=1

hf upload owner/model ./output --exclude README.md`}function so(h){if(!e($))return"";const M=`${e($).model.owner}/${e($).model.name}`,V=e($).model.sha,ze=ir();return h==="env"?`export HF_ENDPOINT=${ze}
export HF_TOKEN=mf_pat_your_token`:h==="hf"?`HF_ENDPOINT=${ze} HF_TOKEN=mf_pat_your_token hf download ${M} --revision ${V}`:h==="transformers"?`import os
os.environ["HF_ENDPOINT"] = "${ze}"
os.environ["HF_TOKEN"] = "mf_pat_your_token"
from transformers import AutoModelForCausalLM, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("${M}", revision="${V}")
model = AutoModelForCausalLM.from_pretrained("${M}", revision="${V}", trust_remote_code=False)`:h==="unsloth"&&e($).model.kind==="adapter"&&e($).model.base_model&&e($).model.base_revision?`import os
os.environ["HF_ENDPOINT"] = "${ze}"
os.environ["HF_TOKEN"] = "mf_pat_your_token"
from unsloth import FastLanguageModel
from peft import PeftModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="${e($).model.base_model}", revision="${e($).model.base_revision}",
    use_exact_model_name=True, fast_inference=False,
)
model = PeftModel.from_pretrained(model, "${M}", revision="${V}")`:h==="unsloth"?`import os
os.environ["HF_ENDPOINT"] = "${ze}"
os.environ["HF_TOKEN"] = "mf_pat_your_token"
from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="${M}", revision="${V}",
    use_exact_model_name=True, fast_inference=False,
)`:""}function lr(h){return h.state==="queued"||h.state==="running"}function nn(h){return h==="completed"?"success":h==="failed"?"danger":h==="canceled"?"muted":"info"}function ws(h){return h.replaceAll("_"," ").replaceAll("-"," ").replace(/\b\w/g,M=>M.toUpperCase())}function ln(h){return h==="huggingface-import"?"Hugging Face":h==="import"?"Local folder":ws(h)}function dn(h){return new Intl.NumberFormat(void 0,{notation:"compact",maximumFractionDigits:1}).format(h)}ht(()=>e(ae),()=>{u(o,e(ae).split("/").filter(Boolean))}),ht(()=>e(o),()=>{u(i,e(o)[0]||"models")}),ht(()=>(e(ne),e(ie),e(B)),()=>{u(l,(e(ne)??[]).filter(h=>`${h.owner}/${h.name} ${h.kind} ${h.architecture} ${h.quantization}`.toLowerCase().includes(e(ie).trim().toLowerCase())).sort((h,M)=>e(B)==="name"?`${h.owner}/${h.name}`.localeCompare(`${M.owner}/${M.name}`):e(B)==="size"?M.logical_bytes-h.logical_bytes:new Date(M.updated_at).valueOf()-new Date(h.updated_at).valueOf()))}),ht(()=>e(Ma),()=>{u(f,(e(Ma)??[]).filter(lr).length)}),ht(()=>e(Ma),()=>{u(d,(e(Ma)??[]).filter(h=>h.state==="completed").length)}),ht(()=>(e(Ma),e(Ct)),()=>{u(_,(e(Ma)??[]).filter(h=>e(Ct)==="active"?lr(h):e(Ct)==="completed"?!lr(h):!0))}),ht(()=>(e($),e(qa),e(ka)),()=>{var h;u(G,jo(((h=e($))==null?void 0:h.files)??[],e(qa),e(ka)))}),ht(()=>(e(b),e(ae)),()=>{var h;(h=e(b))!=null&&h.authenticated&&Qs(e(ae))}),ht(()=>(e(i),e(re)),()=>{e(i)!=="imports"&&e(re).accessToken&&Ya(re,e(re).accessToken="")}),ht(()=>(e(i),e(Tt)),()=>{e(i)!=="settings"&&e(Tt)&&u(Tt,"")}),ht(()=>(e(i),e(Pt)),()=>{e(i)!=="settings"&&e(Pt)&&u(Pt,"")}),ht(()=>(e(i),e(It)),()=>{e(i)!=="settings"&&e(It)&&u(It,"")}),ai(),Mo();var oo=I();yn(h=>{var M=Vi();ti.title="Miniface",c(h,M)});var vn=w(oo);{var cn=h=>{var M=Gi(),V=s(M),ze=s(V);fs(ze,{size:44,reversed:!0}),W(),r(V);var Ra=n(V,2);{var xa=va=>{var ja=Wi(),Va=w(ja);qr(Va,{size:24});var xt=n(Va,2),Rt=s(xt,!0);r(xt);var dr=n(xt,2);dr.__click=[Ji],A(()=>m(Rt,e(pe))),c(va,ja)},Ie=va=>{var ja=Ki(),Va=w(ja);mt(Va,{class:"spin",size:22}),W(2),c(va,ja)};k(Ra,va=>{e(pe)?va(xa):va(Ie,!1)})}r(M),c(h,M)},_n=h=>{var M=I(),V=w(M);{var ze=xa=>{var Ie=al(),va=s(Ie),ja=s(va),Va=s(ja),xt=s(Va);fs(xt,{size:42}),W(),r(Va);var Rt=n(Va,2),dr=s(Rt,!0);r(Rt);var vr=n(Rt,2),Mr=s(vr,!0);r(vr);var Sr=n(vr,2),cr=s(Sr);{var ns=oa=>{var La=Zi(),et=n(w(La),2),zt=s(et);Os(zt,{size:17});var fr=n(zt,2);Oa(fr);var De=n(fr,2);De.__click=[Xi,H];var We=s(De);{var Fa=Sa=>{bo(Sa,{size:17})},$a=Sa=>{$o(Sa,{size:17})};k(We,Sa=>{e(H)?Sa(Fa):Sa($a,!1)})}r(De),r(et),A(()=>{Ce(fr,"type",e(H)?"text":"password"),Ce(De,"aria-label",e(H)?"Hide secret":"Show secret")}),Ua(fr,()=>e(he),Sa=>u(he,Sa)),c(oa,La)};k(cr,oa=>{e(b),v(()=>e(b).setup_required)&&oa(ns)})}var Er=n(cr,2),Ar=s(Er,!0);r(Er);var Cr=n(Er,2),_r=s(Cr);Os(_r,{size:17});var Lt=n(_r,2);Oa(Lt),r(Cr);var is=n(Cr,2);{var Tr=oa=>{var La=Yi(),et=n(w(La),2);Oa(et),Ua(et,()=>e(aa),zt=>u(aa,zt)),c(oa,La)};k(is,oa=>{e(b),v(()=>e(b).setup_required)&&oa(Tr)})}var ls=n(is,2);{var ds=oa=>{var La=Qi(),et=s(La);Vr(et,{size:16});var zt=n(et,1,!0);r(La),A(()=>m(zt,e(X))),c(oa,La)};k(ls,oa=>{e(X)&&oa(ds)})}var ur=n(ls,2),ks=s(ur);{var vs=oa=>{var La=ji(),et=w(La);mt(et,{class:"spin",size:16}),W(),c(oa,La)},xs=oa=>{var La=el(),et=w(La),zt=n(et);Or(zt,{size:16}),A(()=>m(et,`${e(b),v(()=>e(b).setup_required?"Create administrator":"Sign in")??""} `)),c(oa,La)};k(ks,oa=>{e(be)?oa(vs):oa(xs,!1)})}r(ur),r(Sr),r(ja),r(va),r(Ie),A(()=>{m(dr,(e(b),v(()=>e(b).setup_required?"Set up administrator":"Sign in"))),m(Mr,(e(b),v(()=>e(b).setup_required?"Enter the one-time setup secret, then create your browser password.":"Sign in with your administrator password."))),m(Ar,(e(b),v(()=>e(b).setup_required?"New password":"Password"))),Ce(Lt,"minlength",(e(b),v(()=>e(b).setup_required?12:void 0))),Ce(Lt,"autocomplete",(e(b),v(()=>e(b).setup_required?"new-password":"current-password"))),ur.disabled=e(be)}),ar("submit",Sr,oa=>{oa.preventDefault(),Go()}),Ua(Lt,()=>e(K),oa=>u(K,oa)),c(xa,Ie)},Ra=xa=>{var Ie=Zv(),va=n(w(Ie),2),ja=s(va),Va=s(ja);Va.__click=[tl,Ia];var xt=s(Va);fs(xt,{size:36,reversed:!0}),W(2),r(Va);var Rt=n(Va,2);Za(Rt,5,()=>Ko,Xa,(De,We)=>{const Fa=ps(()=>(e(We),v(()=>e(We).icon)));var $a=sl();$a.__click=[rl,Ia,We];let Sa;var at=s($a);e(Fa)(at,{size:18,strokeWidth:1.9});var lt=n(at,2),Bt=s(lt,!0);r(lt),r($a),A((Ft,Qt)=>{Ce($a,"aria-current",Ft),Sa=sa($a,1,"",null,Sa,Qt),m(Bt,(e(We),v(()=>e(We).label)))},[()=>(e(i),e(We),v(()=>e(i)===e(We).path.slice(1)?"page":void 0)),()=>({active:e(i)===e(We).path.slice(1)})]),c(De,$a)}),r(Rt);var dr=n(Rt,2),vr=s(dr),Mr=s(vr),Sr=s(Mr,!0);r(Mr);var cr=n(Mr,2),ns=s(cr),Er=s(ns,!0);r(ns),W(),r(cr);var Ar=n(cr,2);Ar.__click=[Oi,b,ne,$,Ma,Tt,Pt,It,re];var Cr=s(Ar);Ci(Cr,{size:17}),r(Ar),r(vr),r(dr),r(ja);var _r=n(ja,2),Lt=s(_r);Lt.__click=[ol,Ia];var is=s(Lt);fs(is,{size:30}),W(),r(Lt);var Tr=n(Lt,2);Tr.__click=[nl,Ia];var ls=s(Tr);us(ls,{size:18}),r(Tr),r(_r);var ds=n(_r,2),ur=s(ds);{var ks=De=>{var We=il(),Fa=s(We);qr(Fa,{size:16}),W(),r(We),c(De,We)};k(ur,De=>{e(ce)&&De(ks)})}var vs=n(ur,2);{var xs=De=>{var We=dl(),Fa=s(We);qr(Fa,{size:19});var $a=n(Fa,2),Sa=n(s($a)),at=s(Sa,!0);r(Sa),r($a);var lt=n($a,2);lt.__click=[ll,Qs,ae],r(We),A(()=>m(at,e(Je))),c(De,We)};k(vs,De=>{e(Je)&&De(xs)})}var oa=n(vs,2);{var La=De=>{var We=El(),Fa=w(We),$a=n(s(Fa),2);$a.__click=[vl,Ia];var Sa=s($a);us(Sa,{size:17}),W(),r($a),r(Fa);var at=n(Fa,2),lt=s(at),Bt=s(lt);Us(Bt,{size:18});var Ft=n(Bt,2);Oa(Ft);var Qt=n(Ft,2);{var tt=Pe=>{var Ue=_l();Ue.__click=[cl,ie];var ta=s(Ue);qs(ta,{size:15}),r(Ue),c(Pe,Ue)};k(Qt,Pe=>{e(ie)&&Pe(tt)})}r(lt);var rt=n(lt,2),st=s(rt),Vt=s(st);r(st);var _t=n(st,2),_a=s(_t);A(()=>{e(B),Cs(()=>{})}),_a.__change=[Ui,B];var Ja=s(_a);Ja.value=Ja.__value="updated";var dt=n(Ja);dt.value=dt.__value="name";var vt=n(dt);vt.value=vt.__value="size",r(_a),r(_t);var Wa=n(_t,2),ca=s(Wa);ca.__click=[ul,js];let ot;var ut=s(ca);Ei(ut,{size:16}),r(ca);var Ka=n(ca,2);Ka.__click=[fl,js];let Ga;var Se=s(Ka);Ai(Se,{size:17}),r(Ka),r(Wa),r(rt),r(at);var Fe=n(at,2);{var je=Pe=>{var Ue=pl(),ta=s(Ue);mt(ta,{class:"spin",size:24}),W(),r(Ue),c(Pe,Ue)},ua=Pe=>{var Ue=I(),ta=w(Ue);{var ha=ea=>{var ya=$l(),Ea=s(ya),Ha=s(Ea);Li(Ha,{size:29}),r(Ea);var Da=n(Ea,2),ma=s(Da,!0);r(Da);var ra=n(Da,2),$e=s(ra,!0);r(ra);var E=n(ra,2);{var F=Ae=>{var le=ml();le.__click=[hl,ie],c(Ae,le)},He=Ae=>{var le=bl();le.__click=[gl,Ia];var P=s(le);us(P,{size:16}),W(),r(le),c(Ae,le)};k(E,Ae=>{e(ie)?Ae(F):Ae(He,!1)})}r(ya),A(()=>{m(ma,e(ie)?"No models found":"No models yet"),m($e,e(ie)?"Try a model name, owner, type, or architecture.":"Import a folder from this machine or mirror a repository from Hugging Face.")}),c(ea,ya)},nt=ea=>{var ya=I(),Ea=w(ya);{var Ha=ma=>{var ra=zl();Za(ra,5,()=>e(l),Xa,($e,E)=>{var F=xl();F.__click=[yl,Ia,E];var He=s(F),Ae=s(He),le=s(Ae);Hs(le,{size:20}),W(),r(Ae);var P=n(Ae,2);r(He);var R=n(He,2),Q=s(R),Ke=s(Q,!0);r(Q);var Ne=n(Q,2),Re=s(Ne,!0);r(Ne),r(R);var ke=n(R,2),na=s(ke,!0);r(ke);var qe=n(ke,2),ye=s(qe),Ze=s(ye,!0);r(ye);var se=n(ye,2);{var Ge=me=>{var te=wl(),Me=s(te,!0);r(te),A(()=>m(Me,(e(E),v(()=>e(E).quantization)))),c(me,te)};k(se,me=>{e(E),v(()=>e(E).quantization)&&me(Ge)})}var Ee=n(se,2),Xe=s(Ee,!0);r(Ee),r(qe);var Be=n(qe,2);{var Oe=me=>{var te=kl(),Me=s(te);yo(Me,{size:14});var J=n(Me);r(te),A(()=>m(J,` Based on ${e(E),v(()=>e(E).base_model)??""}`)),c(me,te)};k(Be,me=>{e(E),v(()=>e(E).base_model)&&me(Oe)})}var D=n(Be,2),Z=s(D),j=n(s(Z)),g=s(j,!0);r(j),r(Z);var T=n(Z,2),N=n(s(T)),O=s(N,!0);r(N),r(T);var we=n(T,2),S=n(s(we)),y=s(S),L=s(y,!0);r(y),r(S),r(we),r(D);var x=n(D,2),z=s(x),U=s(z);r(z);var Y=n(z);Or(Y,{size:16}),r(x),r(F),A((me,te,Me)=>{sa(P,1,(e(E),v(()=>`status-dot ${e(E).validation_status==="valid"?"success":"warning"}`))),Ce(P,"title",(e(E),v(()=>e(E).validation_status))),m(Ke,(e(E),v(()=>e(E).owner))),m(Re,(e(E),v(()=>e(E).name))),m(na,(e(E),v(()=>e(E).architecture||"Architecture not detected"))),m(Ze,(e(E),v(()=>e(E).kind||"unknown"))),sa(Ee,1,(e(E),v(()=>`badge status-${e(E).validation_status==="valid"?"success":"warning"}`))),m(Xe,(e(E),v(()=>e(E).validation_status))),m(g,me),m(O,(e(E),v(()=>e(E).file_count))),m(L,te),m(U,`Updated ${Me??""}`)},[()=>(de(Le),e(E),v(()=>Le(e(E).logical_bytes))),()=>(de(Ca),e(E),v(()=>Ca(e(E).sha))),()=>(de(Et),e(E),v(()=>Et(e(E).updated_at)))]),c($e,F)}),r(ra),c(ma,ra)},Da=ma=>{var ra=Sl(),$e=n(s(ra),2);Za($e,1,()=>e(l),Xa,(E,F)=>{var He=Ml();He.__click=[Nl,Ia,F];var Ae=s(He),le=s(Ae),P=s(le);Hs(P,{size:18}),r(le);var R=n(le),Q=s(R),Ke=s(Q);r(Q);var Ne=n(Q),Re=s(Ne),ke=n(Re),na=s(ke,!0);r(ke),r(Ne),r(R),r(Ae);var qe=n(Ae,2),ye=s(qe),Ze=s(ye,!0);r(ye),r(qe);var se=n(qe,2),Ge=s(se,!0);r(se);var Ee=n(se,2),Xe=s(Ee,!0);r(Ee);var Be=n(Ee,2),Oe=s(Be);Or(Oe,{size:16}),r(Be),r(He),A((D,Z,j)=>{m(Ke,`${e(F),v(()=>e(F).owner)??""}/${e(F),v(()=>e(F).name)??""}`),m(Re,`${e(F),v(()=>e(F).architecture||"Architecture not detected")??""} · `),m(na,D),m(Ze,(e(F),v(()=>e(F).kind||"unknown"))),m(Ge,Z),m(Xe,j)},[()=>(de(Ca),e(F),v(()=>Ca(e(F).sha))),()=>(de(Le),e(F),v(()=>Le(e(F).logical_bytes))),()=>(de(Et),e(F),v(()=>Et(e(F).updated_at)))]),c(E,He)}),r(ra),c(ma,ra)};k(Ea,ma=>{e(q)==="grid"?ma(Ha):ma(Da,!1)},!0)}c(ea,ya)};k(ta,ea=>{e(l),v(()=>!e(l).length)?ea(ha):ea(nt,!1)},!0)}c(Pe,Ue)};k(Fe,Pe=>{e(ne)?Pe(ua,!1):Pe(je)})}A((Pe,Ue)=>{m(Vt,`${e(l),v(()=>e(l).length)??""} ${e(l),v(()=>e(l).length===1?"model":"models")??""}`),Ce(ca,"aria-pressed",e(q)==="grid"),ot=sa(ca,1,"",null,ot,Pe),Ce(Ka,"aria-pressed",e(q)==="list"),Ga=sa(Ka,1,"",null,Ga,Ue)},[()=>({active:e(q)==="grid"}),()=>({active:e(q)==="list"})]),Ua(Ft,()=>e(ie),Pe=>u(ie,Pe)),Rs(_a,()=>e(B),Pe=>u(B,Pe)),c(De,We)},et=De=>{var We=I(),Fa=w(We);{var $a=at=>{var lt=I(),Bt=w(lt);{var Ft=tt=>{var rt=Al(),st=s(rt);mt(st,{class:"spin",size:24}),W(),r(rt),c(tt,rt)},Qt=tt=>{var rt=Ad(),st=w(rt);st.__click=[Cl,Ia];var Vt=s(st);bi(Vt,{size:15}),W(),r(st);var _t=n(st,2),_a=s(_t),Ja=s(_a),dt=s(Ja);Hs(dt,{size:24}),r(Ja);var vt=n(Ja,2),Wa=s(vt),ca=s(Wa),ot=s(ca,!0);r(ca);var ut=n(ca,2),Ka=s(ut,!0);r(ut),r(Wa);var Ga=n(Wa,2),Se=s(Ga),Fe=s(Se);r(Se);var je=n(Se,1,!0);r(Ga);var ua=n(Ga,2),Pe=s(ua);r(ua),r(vt),r(_a);var Ue=n(_a,2),ta=s(Ue);ta.__click=[Tl,nr,$];var ha=s(ta);{var nt=$e=>{var E=Pl(),F=w(E);Ur(F,{size:15}),W(),c($e,E)},ea=$e=>{var E=Il(),F=w(E);hr(F,{size:15});var He=n(F,2),Ae=s(He,!0);r(He),A(le=>m(Ae,le),[()=>(de(Ca),e($),v(()=>Ca(e($).model.sha)))]),c($e,E)};k(ha,$e=>{e(gt)==="revision"?$e(nt):$e(ea,!1)})}r(ta);var ya=n(ta,2);{var Ea=$e=>{var E=Ll();E.__click=[Rl,Ia,o];var F=s(E);wi(F,{size:16}),W(),r(E),c($e,E)};k(ya,$e=>{e(Ta)!=="usage"&&$e(Ea)})}r(Ue),r(_t);var Ha=n(_t,2);Za(Ha,5,()=>Ys,Xa,($e,E)=>{var F=Hl();F.__click=[Fl,Ia,o,E];let He;var Ae=s(F,!0);r(F),A(le=>{Ce(F,"aria-selected",(e(Ta),e(E),v(()=>e(Ta)===e(E).slug))),He=sa(F,1,"",null,He,le),m(Ae,(e(E),v(()=>e(E).label)))},[()=>({active:e(Ta)===e(E).slug})]),c($e,F)}),r(Ha);var Da=n(Ha,2);{var ma=$e=>{var E=Ql(),F=w(E);{var He=y=>{var L=Dl(),x=s(L);xo(x,{size:18}),W(),r(L),c(y,L)};k(F,y=>{e($),v(()=>e($).model.kind==="adapter"&&e($).model.base_model&&!e($).model.base_revision)&&y(He)})}var Ae=n(F,2),le=s(Ae),P=s(le),R=n(s(P));R.__click=[Ol,Ia,o];var Q=n(s(R));Or(Q,{size:14}),r(R),r(P);var Ke=n(P,2);{var Ne=y=>{var L=Kl();Za(L,5,()=>(e($),v(()=>e($).card.split(`
`))),Xa,(x,z)=>{var U=I(),Y=w(U);{var me=Me=>{var J=Ul(),ge=s(J,!0);r(J),A(Ye=>m(ge,Ye),[()=>(e(z),v(()=>e(z).slice(4)))]),c(Me,J)},te=Me=>{var J=I(),ge=w(J);{var Ye=ga=>{var za=ql(),ee=s(za,!0);r(za),A(xe=>m(ee,xe),[()=>(e(z),v(()=>e(z).slice(3)))]),c(ga,za)},fa=ga=>{var za=I(),ee=w(za);{var xe=la=>{var Qe=Bl(),Aa=s(Qe,!0);r(Qe),A(ft=>m(Aa,ft),[()=>(e(z),v(()=>e(z).slice(2)))]),c(la,Qe)},ia=la=>{var Qe=I(),Aa=w(Qe);{var ft=bt=>{var Jt=Vl(),Pr=s(Jt,!0);r(Jt),A(Ir=>m(Pr,Ir),[()=>(e(z),v(()=>e(z).slice(2)))]),c(bt,Jt)},Nt=bt=>{var Jt=I(),Pr=w(Jt);{var Ir=Wt=>{var _e=Jl(),Ve=s(_e,!0);r(_e),A(()=>m(Ve,e(z))),c(Wt,_e)},zs=Wt=>{var _e=Wl();c(Wt,_e)};k(Pr,Wt=>{e(z),v(()=>e(z).trim())?Wt(Ir):Wt(zs,!1)},!0)}c(bt,Jt)};k(Aa,bt=>{e(z),v(()=>e(z).startsWith("- "))?bt(ft):bt(Nt,!1)},!0)}c(la,Qe)};k(ee,la=>{e(z),v(()=>e(z).startsWith("# "))?la(xe):la(ia,!1)},!0)}c(ga,za)};k(ge,ga=>{e(z),v(()=>e(z).startsWith("## "))?ga(Ye):ga(fa,!1)},!0)}c(Me,J)};k(Y,Me=>{e(z),v(()=>e(z).startsWith("### "))?Me(me):Me(te,!1)})}c(x,U)}),r(L),c(y,L)},Re=y=>{var L=Gl(),x=s(L);Ds(x,{size:22}),W(),r(L),c(y,L)};k(Ke,y=>{e($),v(()=>e($).card)?y(Ne):y(Re,!1)})}r(le);var ke=n(le,2),na=s(ke),qe=n(s(na),2),ye=s(qe),Ze=n(s(ye)),se=s(Ze,!0);r(Ze),r(ye);var Ge=n(ye,2),Ee=n(s(Ge)),Xe=s(Ee,!0);r(Ee),r(Ge);var Be=n(Ge,2),Oe=n(s(Be)),D=s(Oe,!0);r(Oe),r(Be);var Z=n(Be,2),j=n(s(Z)),g=s(j),T=s(g,!0);r(g),r(j),r(Z);var N=n(Z,2);{var O=y=>{var L=Zl(),x=n(s(L)),z=s(x,!0),U=n(z);{var Y=me=>{var te=Xl(),Me=s(te);r(te),A(J=>m(Me,`@${J??""}`),[()=>(de(Ca),e($),v(()=>Ca(e($).model.base_revision)))]),c(me,te)};k(U,me=>{e($),v(()=>e($).model.base_revision)&&me(Y)})}r(x),r(L),A(()=>m(z,(e($),v(()=>e($).model.base_model)))),c(y,L)};k(N,y=>{e($),v(()=>e($).model.base_model)&&y(O)})}var we=n(N,2);{var S=y=>{var L=Yl(),x=n(s(L)),z=s(x),U=n(z),Y=s(U);r(U),r(x),r(L),A(me=>{m(z,`Hugging Face · ${e($),v(()=>e($).model.source_repository)??""} `),m(Y,`@${me??""}`)},[()=>(de(Ca),e($),v(()=>Ca(e($).model.source_revision)))]),c(y,L)};k(we,y=>{e($),v(()=>e($).model.source_repository)&&y(S)})}r(qe),r(na),r(ke),r(Ae),A((y,L)=>{m(se,(e($),v(()=>e($).model.architecture||"Unknown"))),m(Xe,(e($),v(()=>e($).model.quantization||"None detected"))),m(D,y),m(T,L)},[()=>(de(St),e($),v(()=>St(e($).model.updated_at))),()=>(de(Ca),e($),v(()=>Ca(e($).model.sha)))]),c($e,E)},ra=$e=>{var E=I(),F=w(E);{var He=le=>{var P=md(),R=w(P),Q=s(R),Ke=s(Q),Ne=s(Ke);Us(Ne,{size:16});var Re=n(Ne);Oa(Re);var ke=n(Re);{var na=T=>{var N=ed();N.__click=[jl,ka];var O=s(N);qs(O,{size:14}),r(N),c(T,N)};k(ke,T=>{e(ka)&&T(na)})}r(Ke);var qe=n(Ke,2),ye=n(s(qe));ye.__change=[ad,an],Za(ye,5,()=>(e($),v(()=>e($).revisions)),Xa,(T,N)=>{var O=td(),we=s(O);r(O);var S={};A(y=>{m(we,`${y??""} · ${e(N),v(()=>e(N).message||"Untitled revision")??""}`),S!==(S=(e(N),v(()=>e(N).oid)))&&(O.value=(O.__value=(e(N),v(()=>e(N).oid)))??"")},[()=>(de(Ca),e(N),v(()=>Ca(e(N).oid)))]),c(T,O)}),r(ye);var Ze;Gs(ye),r(qe),r(Q);var se=n(Q,2);{var Ge=T=>{var N=od(),O=s(N);O.__click=[rd,ys];var we=n(O,2);Za(we,1,()=>(e(qa),v(()=>e(qa).split("/").filter(Boolean))),Xa,(S,y,L)=>{var x=sd(),z=w(x);$i(z,{size:13});var U=n(z);U.__click=()=>ys(`${e(qa).split("/").filter(Boolean).slice(0,L+1).join("/")}/`);var Y=s(U,!0);r(U),A(()=>m(Y,e(y))),c(S,x)}),r(N),c(T,N)};k(se,T=>{e(ka)||T(Ge)})}var Ee=n(se,2),Xe=n(s(Ee),2);{var Be=T=>{var N=nd(),O=s(N);Ds(O,{size:20}),W(),r(N),c(T,N)};k(Xe,T=>{e(G),v(()=>!e(G).length)&&T(Be)})}var Oe=n(Xe,2);Za(Oe,1,()=>e(G),Xa,(T,N)=>{var O=dd();let we;O.__click=[id,N,ys,en];var S=s(O),y=s(S);{var L=J=>{Ni(J,{size:16})},x=J=>{Ds(J,{size:16})};k(y,J=>{e(N),v(()=>e(N).type==="directory")?J(L):J(x,!1)})}var z=n(y,1,!0);r(S);var U=n(S,2),Y=s(U);{var me=J=>{var ge=ld(),Ye=s(ge,!0);r(ge),A(()=>m(Ye,(e(N),v(()=>e(N).xet_hash?"Xet":"Blob")))),c(J,ge)};k(Y,J=>{e(N),v(()=>e(N).type==="file")&&J(me)})}r(U);var te=n(U,2),Me=s(te,!0);r(te),r(O),A((J,ge)=>{we=sa(O,1,"file-row file-button",null,we,J),m(z,(e(N),v(()=>e(N).name))),m(Me,ge)},[()=>{var J;return{selected:((J=e(Te))==null?void 0:J.path)===e(N).path}},()=>(e(N),de(Le),v(()=>e(N).type==="file"?Le(e(N).size):""))]),c(T,O)}),r(Ee),r(R);var D=n(R,2);{var Z=T=>{var N=vd(),O=s(N);mt(O,{class:"spin",size:18}),W(),r(N),c(T,N)};k(D,T=>{e(Xt)&&T(Z)})}var j=n(D,2);{var g=T=>{var N=hd(),O=s(N),we=s(O),S=s(we),y=s(S,!0);r(S);var L=n(S),x=s(L);r(L),r(we);var z=n(we),U=s(z);xi(U,{size:15}),W(),r(z),r(O);var Y=n(O,2),me=s(Y);{var te=ee=>{var xe=cd(),ia=n(s(xe)),la=s(ia),Qe=s(la,!0);r(la),r(ia),r(xe),A(()=>m(Qe,(e(Te),v(()=>e(Te).sha256)))),c(ee,xe)};k(me,ee=>{e(Te),v(()=>e(Te).sha256)&&ee(te)})}var Me=n(me,2);{var J=ee=>{var xe=_d(),ia=n(s(xe)),la=s(ia),Qe=s(la,!0);r(la),r(ia),r(xe),A(()=>m(Qe,(e(Te),v(()=>e(Te).xet_hash)))),c(ee,xe)};k(Me,ee=>{e(Te),v(()=>e(Te).xet_hash)&&ee(J)})}r(Y);var ge=n(Y,2);{var Ye=ee=>{var xe=ud(),ia=s(xe),la=s(ia,!0);r(ia),r(xe),A(()=>m(la,(e(Te),v(()=>e(Te).text)))),c(ee,xe)},fa=ee=>{var xe=fd();c(ee,xe)};k(ge,ee=>{e(Te),v(()=>e(Te).previewable)?ee(Ye):ee(fa,!1)})}var ga=n(ge,2);{var za=ee=>{var xe=pd();c(ee,xe)};k(ga,ee=>{e(Te),v(()=>e(Te).truncated)&&ee(za)})}r(N),A((ee,xe)=>{m(y,(e(Te),v(()=>e(Te).path))),m(x,`${ee??""} · ${e(Te),v(()=>e(Te).xet_hash?"Xet":"Blob")??""}`),Ce(z,"href",xe)},[()=>(de(Le),e(Te),v(()=>Le(e(Te).size))),()=>(e(Te),v(()=>tn(e(Te).path)))]),c(T,N)};k(j,T=>{e(Te)&&T(g)})}A(()=>{Ze!==(Ze=e(ct))&&(ye.value=(ye.__value=e(ct))??"",Kr(ye,e(ct)))}),Ua(Re,()=>e(ka),T=>u(ka,T)),c(le,P)},Ae=le=>{var P=I(),R=w(P);{var Q=Ne=>{var Re=yd(),ke=s(Re),na=n(s(ke)),qe=s(na);r(na),r(ke);var ye=n(ke,2);Za(ye,5,()=>(e($),v(()=>e($).revisions)),Xa,(Ze,se,Ge)=>{var Ee=$d(),Xe=s(Ee),Be=s(Xe);yo(Be,{size:16}),r(Xe);var Oe=n(Xe,2),D=s(Oe),Z=s(D),j=s(Z,!0);r(Z);var g=n(Z);{var T=U=>{var Y=gd();c(U,Y)};k(g,U=>{Ge===0&&U(T)})}r(D);var N=n(D,2),O=s(N);r(N);var we=n(N,2);we.__click=[bd,nr,se];var S=s(we),y=s(S,!0);r(S);var L=n(S);{var x=U=>{Ur(U,{size:14})},z=U=>{hr(U,{size:14})};k(L,U=>{e(gt),e(se),v(()=>e(gt)===`revision-${e(se).oid}`)?U(x):U(z,!1)})}r(we),r(Oe),r(Ee),A(U=>{m(j,(e(se),v(()=>e(se).message||"Untitled revision"))),m(O,`${e(se),v(()=>e(se).author)??""} · ${U??""} · ${e(se),v(()=>e(se).file_count)??""} files`),m(y,(e(se),v(()=>e(se).oid)))},[()=>(de(St),e(se),v(()=>St(e(se).created_at)))]),c(Ze,Ee)}),r(ye),r(Re),A(()=>m(qe,`${e($),v(()=>e($).revisions.length)??""} total`)),c(Ne,Re)},Ke=Ne=>{var Re=I(),ke=w(Re);{var na=ye=>{var Ze=Nd(),se=w(Ze),Ge=s(se);ko(Ge,{size:18});var Ee=n(Ge),Xe=n(s(Ee)),Be=n(s(Xe),3),Oe=s(Be,!0);r(Be),W(),r(Xe),r(Ee),r(se);var D=n(se,2);Za(D,5,()=>(e($),v(()=>[{title:"HF CLI",description:"Download the pinned snapshot",key:"hf"},{title:"Environment",description:"Use once per shell",key:"env"},{title:"Transformers",description:"Load with the Python client",key:"transformers"},{title:"Unsloth",description:e($).model.kind==="adapter"?"Load base and adapter together":"Load for local training",key:"unsloth"}])),Xa,(Z,j)=>{var g=zd();let T;var N=s(g),O=s(N),we=s(O),S=s(we,!0);r(we);var y=n(we),L=s(y,!0);r(y),r(O);var x=n(O);x.__click=[wd,nr,so,j];var z=s(x);{var U=J=>{var ge=kd(),Ye=w(ge);Ur(Ye,{size:14}),W(),c(J,ge)},Y=J=>{var ge=xd(),Ye=w(ge);hr(Ye,{size:14}),W(),c(J,ge)};k(z,J=>{e(gt),e(j),v(()=>e(gt)===`usage-${e(j).key}`)?J(U):J(Y,!1)})}r(x),r(N);var me=n(N,2),te=s(me),Me=s(te,!0);r(te),r(me),r(g),A((J,ge)=>{T=sa(g,1,"code-card",null,T,J),m(S,(e(j),v(()=>e(j).title))),m(L,(e(j),v(()=>e(j).description))),Ce(x,"aria-label",(e(j),v(()=>`Copy ${e(j).title} example`))),m(Me,ge)},[()=>({"wide-code":e(j).key==="transformers"||e(j).key==="unsloth"}),()=>(e(j),v(()=>so(e(j).key)))]),c(Z,g)}),r(D),A(Z=>m(Oe,Z),[()=>(de(Ca),e($),v(()=>Ca(e($).model.sha)))]),c(ye,Ze)},qe=ye=>{var Ze=Ed(),se=s(Ze),Ge=n(s(se),4);ri(Ge);var Ee=n(Ge,4);Oa(Ee);var Xe=n(Ee,2);{var Be=T=>{var N=Md(),O=s(N);Br(O,{size:16});var we=n(O,1,!0);r(N),A(()=>{sa(N,1,`inline-alert ${e(Gr)}`),m(we,e(rr))}),c(T,N)};k(Xe,T=>{e(rr)&&T(Be)})}var Oe=n(Xe,2),D=n(s(Oe));D.__click=[Bi,b,$,be,rr,yt,Zt,Gr];var Z=s(D);{var j=T=>{var N=Sd(),O=w(N);mt(O,{class:"spin",size:16}),W(),c(T,N)},g=T=>{var N=si("Save model card");c(T,N)};k(Z,T=>{e(be)?T(j):T(g,!1)})}r(D),r(Oe),r(se),r(Ze),A(()=>D.disabled=e(be)),Ua(Ge,()=>e(yt),T=>u(yt,T)),Ua(Ee,()=>e(Zt),T=>u(Zt,T)),c(ye,Ze)};k(ke,ye=>{e(Ta)==="usage"?ye(na):ye(qe,!1)},!0)}c(Ne,Re)};k(R,Ne=>{e(Ta)==="revisions"?Ne(Q):Ne(Ke,!1)},!0)}c(le,P)};k(F,le=>{e(Ta)==="files"?le(He):le(Ae,!1)},!0)}c($e,E)};k(Da,$e=>{e(Ta)==="overview"?$e(ma):$e(ra,!1)})}A($e=>{m(ot,(e($),v(()=>e($).model.kind||"unknown"))),sa(ut,1,(e($),v(()=>`badge status-${e($).model.validation_status==="valid"?"success":"warning"}`))),m(Ka,(e($),v(()=>e($).model.validation_status))),m(Fe,`${e($),v(()=>e($).model.owner)??""}/`),m(je,(e($),v(()=>e($).model.name))),m(Pe,`${e($),v(()=>e($).model.architecture||"Unknown architecture")??""} · ${$e??""} · ${e($),v(()=>e($).model.file_count)??""} files`)},[()=>(de(Le),e($),v(()=>Le(e($).model.logical_bytes)))]),c(tt,rt)};k(Bt,tt=>{e($)?tt(Qt,!1):tt(Ft)})}c(at,lt)},Sa=at=>{var lt=I(),Bt=w(lt);{var Ft=tt=>{var rt=Zd(),st=n(w(rt),2),Vt=s(st),_t=s(Vt),_a=s(_t);_a.__click=[Cd,eo];let Ja;var dt=s(_a),vt=s(dt);zi(vt,{size:21}),r(dt),W(4),r(_a);var Wa=n(_a,2);Wa.__click=[Td,eo];let ca;var ot=s(Wa),ut=s(ot);go(ut,{size:21}),r(ot),W(4),r(Wa),r(_t);var Ka=n(_t,2),Ga=s(Ka),Se=s(Ga),Fe=s(Se),je=s(Fe,!0);r(Fe),r(Se),r(Ga);var ua=n(Ga,2),Pe=s(ua);{var Ue=P=>{var R=Pd(),Q=n(s(R),2);Oa(Q),W(2),r(R),Ua(Q,()=>e(Pa).path,Ke=>Ya(Pa,e(Pa).path=Ke)),c(P,R)},ta=P=>{var R=qd(),Q=w(R),Ke=n(s(Q),2),Ne=s(Ke),Re=s(Ne);Us(Re,{size:17});var ke=n(Re);Oa(ke),ke.__input=[Id,re,Xo],ke.__keydown=[qi,Ut,qt,Zo,kt,ao,Nr];var na=n(ke);{var qe=x=>{mt(x,{class:"spin field-loader",size:16})};k(na,x=>{e(Zr)&&x(qe)})}r(Ne);var ye=n(Ne,2);{var Ze=x=>{var z=Hd();Za(z,5,()=>e(Ut),Xa,(U,Y,me)=>{var te=Fd();Ce(te,"id",`hub-option-${me}`),te.__mousedown=[Rd],te.__click=[Ld,ao,Y];let Me;var J=s(te),ge=s(J),Ye=s(ge,!0);r(ge);var fa=n(ge),ga=s(fa);r(fa),r(J);var za=n(J,2),ee=s(za),xe=s(ee,!0);r(ee);var ia=n(ee);let la;var Qe=s(ia,!0);r(ia),r(za),r(te),A((Aa,ft,Nt,bt)=>{Ce(te,"aria-selected",e(kt)===me),Me=sa(te,1,"",null,Me,Aa),m(Ye,(e(Y),v(()=>e(Y).id))),m(ga,`${e(Y),v(()=>e(Y).pipeline_tag||"Model")??""} · ${ft??""} downloads`),m(xe,Nt),la=sa(ia,1,"",null,la,bt),m(Qe,(e(Y),v(()=>e(Y).gated?"Token required":"Public")))},[()=>({active:e(kt)===me}),()=>(e(Y),v(()=>dn(e(Y).downloads))),()=>(e(Y),de(Le),v(()=>e(Y).size_bytes===void 0?"Size unavailable":`≈ ${Le(e(Y).size_bytes)}`)),()=>({restricted:e(Y).gated})]),ar("mouseenter",te,()=>u(kt,me)),c(U,te)}),r(z),c(x,z)};k(ye,x=>{e(qt),e(Ut),v(()=>e(qt)&&e(Ut).length)&&x(Ze)})}r(Ke),oi(Ke,x=>u(wr,x),()=>e(wr)),W(2),r(Q);var se=n(Q,2);{var Ge=x=>{var z=Dd(),U=s(z);Ri(U,{size:17}),W(),r(z),c(x,z)};k(se,x=>{e(wt),v(()=>{var z;return(z=e(wt))==null?void 0:z.gated})&&x(Ge)})}var Ee=n(se,2);{var Xe=x=>{var z=Od(),U=s(z);Vr(U,{size:16});var Y=n(U,1,!0);r(z),A(()=>m(Y,e(Yr))),c(x,z)};k(Ee,x=>{e(Yr)&&x(Xe)})}var Be=n(Ee,2),Oe=s(Be),D=n(s(Oe),2);Oa(D),W(2),r(Oe);var Z=n(Oe,2),j=s(Z),g=n(s(j)),T=s(g,!0);r(g),r(j);var N=n(j,2),O=s(N);Oa(O);var we=n(O);we.__click=[Ud,Xr];var S=s(we);{var y=x=>{bo(x,{size:17})},L=x=>{$o(x,{size:17})};k(S,x=>{e(Xr)?x(y):x(L,!1)})}r(we),r(N),W(2),r(Z),r(Be),A(()=>{Ce(ke,"aria-expanded",e(qt)),Ce(ke,"aria-activedescendant",e(kt)>=0?`hub-option-${e(kt)}`:void 0),ui(ke,(e(re),v(()=>e(re).sourceRepository))),sa(g,1,qo((e(wt),v(()=>{var x;return(x=e(wt))!=null&&x.gated?"required-label":"optional-label"})))),m(T,(e(wt),v(()=>{var x;return(x=e(wt))!=null&&x.gated?"required":"optional"}))),Ce(O,"type",e(Xr)?"text":"password"),O.required=(e(wt),v(()=>{var x;return((x=e(wt))==null?void 0:x.gated)===!0})),Ce(we,"aria-label",e(Xr)?"Hide token":"Show token")}),ar("focus",ke,()=>{e(Ut).length&&u(qt,!0)}),ar("blur",ke,()=>setTimeout(()=>{var x;(x=e(wr))!=null&&x.contains(document.activeElement)||Nr()})),Ua(D,()=>e(re).sourceRevision,x=>Ya(re,e(re).sourceRevision=x)),Ua(O,()=>e(re).accessToken,x=>Ya(re,e(re).accessToken=x)),c(P,R)};k(Pe,P=>{e(Qa)==="local"?P(Ue):P(ta,!1)})}var ha=n(Pe,2),nt=n(s(ha),2);{var ea=P=>{var R=Bd();Oa(R),Ua(R,()=>e(Pa).repository,Q=>Ya(Pa,e(Pa).repository=Q)),c(P,R)},ya=P=>{var R=Vd();Oa(R),Ua(R,()=>e(re).destinationRepository,Q=>Ya(re,e(re).destinationRepository=Q)),c(P,R)};k(nt,P=>{e(Qa)==="local"?P(ea):P(ya,!1)})}r(ha);var Ea=n(ha,2),Ha=n(s(Ea),2);{var Da=P=>{var R=Jd();Oa(R),Ua(R,()=>e(Pa).message,Q=>Ya(Pa,e(Pa).message=Q)),c(P,R)},ma=P=>{var R=Wd();Oa(R),Ua(R,()=>e(re).message,Q=>Ya(re,e(re).message=Q)),c(P,R)};k(Ha,P=>{e(Qa)==="local"?P(Da):P(ma,!1)})}r(Ea);var ra=n(Ea,2);{var $e=P=>{var R=Kd(),Q=s(R);Vr(Q,{size:19});var Ke=n(Q),Ne=n(s(Ke)),Re=s(Ne,!0);r(Ne),r(Ke),r(R),A(()=>{sa(R,1,`import-feedback ${e(Zs)}`),m(Re,e(Ot))}),c(P,R)};k(ra,P=>{e(Ot)&&P($e)})}var E=n(ra,2),F=n(s(E)),He=s(F);{var Ae=P=>{var R=Gd(),Q=w(R);mt(Q,{class:"spin",size:16}),W(),c(P,R)},le=P=>{var R=Xd(),Q=n(w(R));Or(Q,{size:16}),c(P,R)};k(He,P=>{e(Dt)?P(Ae):P(le,!1)})}r(F),r(E),r(ua),r(Ka),r(Vt),r(st),A((P,R)=>{Ce(_a,"aria-checked",e(Qa)==="local"),Ja=sa(_a,1,"",null,Ja,P),Ce(Wa,"aria-checked",e(Qa)==="huggingface"),ca=sa(Wa,1,"",null,ca,R),m(je,e(Qa)==="local"?"Local folder":"Hugging Face repository"),F.disabled=e(Dt)},[()=>({active:e(Qa)==="local"}),()=>({active:e(Qa)==="huggingface"})]),ar("submit",ua,P=>{P.preventDefault(),Yo()}),c(tt,rt)},Qt=tt=>{var rt=I(),st=w(rt);{var Vt=_a=>{var Ja=wv(),dt=w(Ja),vt=n(s(dt),2);vt.__click=[Yd,$s];var Wa=s(vt);{let Se=ps(()=>e(es)?"spin":"");Ti(Wa,{get class(){return e(Se)},size:16})}W(),r(vt),r(dt);var ca=n(dt,2);{var ot=Se=>{var Fe=Qd(),je=s(Fe);Vr(je,{size:16});var ua=n(je,1,!0);r(Fe),A(()=>m(ua,e(jr))),c(Se,Fe)};k(ca,Se=>{e(jr)&&Se(ot)})}var ut=n(ca,2);{var Ka=Se=>{var Fe=jd(),je=s(Fe);mt(je,{class:"spin",size:24}),W(),r(Fe),c(Se,Fe)},Ga=Se=>{var Fe=I(),je=w(Fe);{var ua=Ue=>{var ta=av(),ha=s(ta),nt=s(ha);mo(nt,{size:28}),r(ha);var ea=n(ha,3);ea.__click=[ev,Ia];var ya=s(ea);us(ya,{size:16}),W(),r(ea),r(ta),c(Ue,ta)},Pe=Ue=>{var ta=yv(),ha=w(ta),nt=s(ha),ea=s(nt),ya=s(ea);mt(ya,{size:18}),r(ea);var Ea=n(ea),Ha=s(Ea),Da=s(Ha,!0);r(Ha),W(),r(Ea),r(nt);var ma=n(nt,2),ra=s(ma),$e=s(ra);Br($e,{size:18}),r(ra);var E=n(ra),F=s(E),He=s(F,!0);r(F),W(),r(E),r(ma),r(ha);var Ae=n(ha,2),le=s(Ae),P=s(le);P.__click=[tv,Ct];let R;var Q=n(s(P)),Ke=s(Q,!0);r(Q),r(P);var Ne=n(P,2);Ne.__click=[rv,Ct];let Re;var ke=n(s(Ne)),na=s(ke,!0);r(ke),r(Ne);var qe=n(Ne,2);qe.__click=[sv,Ct];let ye;var Ze=n(s(qe)),se=s(Ze,!0);r(Ze),r(qe),r(le);var Ge=n(le,2);{var Ee=D=>{var Z=ov();c(D,Z)};k(Ge,D=>{e(f)&&D(Ee)})}r(Ae);var Xe=n(Ae,2);{var Be=D=>{var Z=nv(),j=s(Z);Br(j,{size:24}),W(),r(Z),c(D,Z)},Oe=D=>{var Z=$v();Za(Z,5,()=>e(_),Xa,(j,g)=>{var T=bv();let N;var O=s(T),we=s(O),S=s(we);{var y=_e=>{Br(_e,{size:17})},L=_e=>{var Ve=I(),pt=w(Ve);{var Mt=$t=>{Vr($t,{size:17})},jt=$t=>{var pr=I(),cs=w(pr);{var Ns=Kt=>{qs(Kt,{size:17})},Rr=Kt=>{var Lr=I(),_s=w(Lr);{var Ms=Na=>{yi(Na,{size:17})},it=Na=>{mt(Na,{class:"spin",size:17})};k(_s,Na=>{e(g),v(()=>e(g).state==="queued")?Na(Ms):Na(it,!1)},!0)}c(Kt,Lr)};k(cs,Kt=>{e(g),v(()=>e(g).state==="canceled")?Kt(Ns):Kt(Rr,!1)},!0)}c($t,pr)};k(pt,$t=>{e(g),v(()=>e(g).state==="failed")?$t(Mt):$t(jt,!1)},!0)}c(_e,Ve)};k(S,_e=>{e(g),v(()=>e(g).state==="completed")?_e(y):_e(L,!1)})}r(we);var x=n(we,2),z=s(x),U=s(z,!0);r(z);var Y=n(z),me=s(Y);r(Y),r(x);var te=n(x,2),Me=s(te),J=s(Me),ge=s(J,!0);r(J);var Ye=n(J);{var fa=_e=>{var Ve=iv(),pt=s(Ve);r(Ve),A((Mt,jt)=>m(pt,`${Mt??""} / ${jt??""}`),[()=>(de(Le),e(g),v(()=>Le(e(g).current_bytes||0))),()=>(de(Le),e(g),v(()=>Le(e(g).total_bytes)))]),c(_e,Ve)};k(Ye,_e=>{e(g),v(()=>e(g).total_bytes)&&_e(fa)})}r(Me);var ga=n(Me,2);{var za=_e=>{var Ve=lv(),pt=s(Ve);r(Ve),A(Mt=>Vs(pt,Mt),[()=>(de(No),e(g),v(()=>`width:${No(e(g).progress)}%`))]),c(_e,Ve)};k(ga,_e=>{e(g),v(()=>lr(e(g))&&e(g).total_bytes)&&_e(za)})}r(te);var ee=n(te,2),xe=s(ee,!0);r(ee);var ia=n(ee,2),la=s(ia);{var Qe=_e=>{var Ve=vv();Ve.__click=[dv,Qo,g];var pt=s(Ve,!0);r(Ve),A(()=>{Ve.disabled=(e(sr),e(g),v(()=>e(sr)===e(g).id)),m(pt,(e(sr),e(g),v(()=>e(sr)===e(g).id?"Canceling…":"Cancel")))}),c(_e,Ve)};k(la,_e=>{e(g),v(()=>lr(e(g)))&&_e(Qe)})}var Aa=n(la,2);{var ft=_e=>{var Ve=_v();Ve.__click=[cv,Ia],c(_e,Ve)};k(Aa,_e=>{e(g),v(()=>!lr(e(g)))&&_e(ft)})}var Nt=n(Aa,2);let bt;Nt.__click=[uv,Yt,g];var Jt=s(Nt);{var Pr=_e=>{qr(_e,{size:15})},Ir=_e=>{ko(_e,{size:15})};k(Jt,_e=>{e(g),v(()=>e(g).error)?_e(Pr):_e(Ir,!1)})}W(),r(Nt),r(ia),r(O);var zs=n(O,2);{var Wt=_e=>{var Ve=gv();let pt;var Mt=s(Ve);{var jt=it=>{var Na=fv(),er=n(w(Na)),Fr=s(er,!0);r(er),A(()=>m(Fr,(e(g),v(()=>e(g).error)))),c(it,Na)};k(Mt,it=>{e(g),v(()=>e(g).error)&&it(jt)})}var $t=n(Mt,2);{var pr=it=>{var Na=hv(),er=s(Na),Fr=n(er);{var Ss=Es=>{var no=pv(),io=n(w(no)),un=s(io,!0);r(io),A(fn=>m(un,fn),[()=>(de(Ca),e(g),v(()=>Ca(e(g).source_revision)))]),c(Es,no)};k(Fr,Es=>{e(g),v(()=>e(g).source_revision)&&Es(Ss)})}r(Na),A(()=>m(er,`Source: ${e(g),v(()=>e(g).source_repository)??""}`)),c(it,Na)};k($t,it=>{e(g),v(()=>e(g).source_repository)&&it(pr)})}var cs=n($t,2);{var Ns=it=>{var Na=mv(),er=s(Na);r(Na),A((Fr,Ss)=>m(er,`Transferred: ${Fr??""} / ${Ss??""}`),[()=>(de(Le),e(g),v(()=>Le(e(g).current_bytes||0))),()=>(de(Le),e(g),v(()=>Le(e(g).total_bytes)))]),c(it,Na)};k(cs,it=>{e(g),v(()=>e(g).total_bytes)&&it(Ns)})}var Rr=n(cs,2),Kt=s(Rr);r(Rr);var Lr=n(Rr,2),_s=n(s(Lr)),Ms=s(_s,!0);r(_s),r(Lr),r(Ve),A((it,Na)=>{Ce(Ve,"id",(e(g),v(()=>`job-detail-${e(g).id}`))),pt=sa(Ve,1,"job-detail",null,pt,it),m(Kt,`Created: ${Na??""}`),m(Ms,(e(g),v(()=>e(g).id)))},[()=>({error:!!e(g).error}),()=>(de(St),e(g),v(()=>St(e(g).created_at)))]),c(_e,Ve)};k(zs,_e=>{e(Yt),e(g),v(()=>e(Yt)===e(g).id)&&_e(Wt)})}r(T),A((_e,Ve,pt,Mt,jt,$t,pr)=>{Ce(T,"id",(e(g),v(()=>`job-${e(g).id}`))),N=sa(T,1,"job-item",null,N,_e),sa(we,1,Ve),m(U,(e(g),v(()=>e(g).repo_id||e(g).id))),m(me,`${pt??""} · ${Mt??""}`),m(ge,jt),Ce(ee,"datetime",(e(g),v(()=>e(g).updated_at))),m(xe,$t),bt=sa(Nt,1,"details-button",null,bt,pr),Ce(Nt,"aria-expanded",(e(Yt),e(g),v(()=>e(Yt)===e(g).id))),Ce(Nt,"aria-controls",(e(g),v(()=>`job-detail-${e(g).id}`)))},[()=>({expanded:e(Yt)===e(g).id,highlighted:e(o)[1]===e(g).id}),()=>(e(g),v(()=>`job-state status-${nn(e(g).state)}`)),()=>(e(g),v(()=>ln(e(g).type))),()=>(e(g),v(()=>e(g).phase||ws(e(g).state))),()=>(e(g),v(()=>e(g).phase||ws(e(g).state))),()=>(de(Et),e(g),v(()=>Et(e(g).updated_at))),()=>({error:!!e(g).error})]),c(j,T)}),r(Z),c(D,Z)};k(Xe,D=>{e(_),v(()=>!e(_).length)?D(Be):D(Oe,!1)})}A((D,Z,j)=>{m(Da,e(f)),m(He,e(d)),R=sa(P,1,"",null,R,D),m(Ke,(e(Ma),v(()=>e(Ma).length))),Re=sa(Ne,1,"",null,Re,Z),m(na,e(f)),ye=sa(qe,1,"",null,ye,j),m(se,(e(Ma),e(f),v(()=>e(Ma).length-e(f))))},[()=>({active:e(Ct)==="all"}),()=>({active:e(Ct)==="active"}),()=>({active:e(Ct)==="completed"})]),c(Ue,ta)};k(je,Ue=>{e(Ma),v(()=>!e(Ma).length)?Ue(ua):Ue(Pe,!1)},!0)}c(Se,Fe)};k(ut,Se=>{e(Ma)?Se(Ga,!1):Se(Ka)})}A(()=>vt.disabled=e(es)),c(_a,Ja)},_t=_a=>{var Ja=I(),dt=w(Ja);{var vt=ca=>{var ot=Mv(),ut=n(w(ot),2);{var Ka=Se=>{var Fe=kv(),je=s(Fe);mt(je,{class:"spin",size:24}),W(),r(Fe),c(Se,Fe)},Ga=Se=>{var Fe=Nv(),je=w(Fe),ua=s(je),Pe=s(ua),Ue=s(Pe);ki(Ue,{size:19}),r(Pe);var ta=n(Pe),ha=n(s(ta)),nt=s(ha,!0);r(ha),r(ta),r(ua);var ea=n(ua,2),ya=s(ea),Ea=s(ya);wo(Ea,{size:19}),r(ya);var Ha=n(ya),Da=n(s(Ha)),ma=s(Da,!0);r(Da),r(Ha),r(ea);var ra=n(ea,2),$e=s(ra),E=s($e);Mi(E,{size:19}),r($e);var F=n($e),He=n(s(F)),Ae=s(He);r(He),r(F),r(ra),r(je);var le=n(je,2),P=n(s(le),2),R=s(P),Q=s(R),Ke=n(s(Q)),Ne=s(Ke,!0);r(Ke),r(Q),W(),r(R);var Re=n(R,2),ke=s(Re),na=n(s(ke)),qe=s(na,!0);r(na),r(ke);var ye=n(ke),Ze=s(ye);r(ye),r(Re),r(P),r(le);var se=n(le,2),Ge=s(se),Ee=n(s(Ge)),Xe=s(Ee,!0);r(Ee),r(Ge);var Be=n(Ge,4);Za(Be,1,()=>(e(ba),v(()=>e(ba).repository_breakdown)),Xa,(Oe,D)=>{var Z=zv();Z.__click=[xv,Ia,D];var j=s(Z),g=s(j,!0);r(j);var T=n(j),N=s(T,!0);r(T);var O=n(T),we=s(O,!0);r(O);var S=n(O),y=s(S,!0);r(S);var L=n(S),x=s(L,!0);r(L),r(Z),A((z,U)=>{m(g,(e(D),v(()=>e(D).id))),m(N,z),m(we,(e(D),v(()=>e(D).file_count))),m(y,(e(D),v(()=>e(D).revisions))),m(x,U)},[()=>(de(Le),e(D),v(()=>Le(e(D).logical_bytes))),()=>(de(Et),e(D),v(()=>Et(e(D).updated_at)))]),c(Oe,Z)}),r(se),A((Oe,D,Z,j,g,T)=>{m(nt,Oe),m(ma,D),m(Ae,`${Z??""}×`),m(Ne,j),m(qe,g),Vs(Ze,T),m(Xe,(e(ba),v(()=>e(ba).repositories)))},[()=>(de(Le),e(ba),v(()=>Le(e(ba).logical_bytes))),()=>(de(Le),e(ba),v(()=>Le(e(ba).physical_bytes))),()=>(e(ba),v(()=>e(ba).dedup_ratio.toFixed(2))),()=>(de(Le),e(ba),v(()=>Le(e(ba).logical_bytes))),()=>(de(Le),e(ba),v(()=>Le(e(ba).physical_bytes))),()=>(e(ba),v(()=>`width:${Math.max(4,Math.min(100,e(ba).logical_bytes?e(ba).physical_bytes/e(ba).logical_bytes*100:0))}%`))]),c(Se,Fe)};k(ut,Se=>{e(ba)?Se(Ga,!1):Se(Ka)})}c(ca,ot)},Wa=ca=>{var ot=I(),ut=w(ot);{var Ka=Se=>{var Fe=Wv(),je=n(w(Fe),2),ua=s(je),Pe=s(ua),Ue=s(Pe);Pi(Ue,{size:21}),r(Pe);var ta=n(Pe),ha=n(s(ta)),nt=s(ha,!0);r(ha),r(ta),r(ua);var ea=n(ua,2);ea.__click=[Sv,nr,ir];var ya=s(ea);{var Ea=S=>{var y=Ev(),L=w(y);Ur(L,{size:15}),W(),c(S,y)},Ha=S=>{var y=Av(),L=w(y);hr(L,{size:15}),W(),c(S,y)};k(ya,S=>{e(gt)==="endpoint"?S(Ea):S(Ha,!1)})}r(ea),r(je);var Da=n(je,2),ma=s(Da),ra=n(s(ma),2);Za(ra,1,()=>[{key:"env",title:"Environment",icon:Os},{key:"download",title:"Download",icon:go},{key:"upload",title:"Upload",icon:zo}],Xa,(S,y)=>{const L=ps(()=>(e(y),v(()=>e(y).icon)));var x=Rv(),z=s(x),U=s(z),Y=s(U);e(L)(Y,{size:19}),r(U);var me=n(U),te=s(me),Me=s(te,!0);r(te),r(me),r(z);var J=n(z,2);{var ge=Qe=>{var Aa=Cv(),ft=s(Aa);xo(ft,{size:16}),W(),r(Aa),c(Qe,Aa)};k(J,Qe=>{e(y),v(()=>e(y).key==="upload")&&Qe(ge)})}var Ye=n(J,2),fa=s(Ye);fa.__click=[Tv,nr,ro,y];var ga=s(fa);{var za=Qe=>{var Aa=Pv(),ft=w(Aa);Ur(ft,{size:14}),W(),c(Qe,Aa)},ee=Qe=>{var Aa=Iv(),ft=w(Aa);hr(ft,{size:14}),W(),c(Qe,Aa)};k(ga,Qe=>{e(gt),e(y),v(()=>e(gt)===`setting-${e(y).key}`)?Qe(za):Qe(ee,!1)})}r(fa);var xe=n(fa),ia=s(xe),la=s(ia,!0);r(ia),r(xe),r(Ye),r(x),A(Qe=>{m(Me,(e(y),v(()=>e(y).title))),Ce(fa,"aria-label",(e(y),v(()=>`Copy ${e(y).title} commands`))),m(la,Qe)},[()=>(e(y),v(()=>ro(e(y).key)))]),c(S,x)}),r(ma);var $e=n(ma,2),E=n(s($e),2),F=s(E),He=s(F),Ae=n(s(He));Oa(Ae),r(He);var le=n(He,2),P=n(s(le));A(()=>{e(ts),Cs(()=>{})});var R=s(P);R.value=R.__value="read";var Q=n(R);Q.value=Q.__value="write",r(P),r(le);var Ke=n(le,2),Ne=n(s(Ke));A(()=>{e(rs),Cs(()=>{})});var Re=s(Ne);Re.value=Re.__value=0;var ke=n(Re);ke.value=ke.__value=30;var na=n(ke);na.value=na.__value=90;var qe=n(na);qe.value=qe.__value=365,r(Ne),r(Ke),W(2),r(F);var ye=n(F,2);{var Ze=S=>{var y=Fv(),L=s(y),x=s(L,!0);r(L);var z=n(L);z.__click=[Lv,nr,Tt];var U=s(z);hr(U,{size:14}),W(),r(z),r(y),A(()=>m(x,e(Tt))),c(S,y)};k(ye,S=>{e(Tt)&&S(Ze)})}var se=n(ye,2);{var Ge=S=>{var y=Hv(),L=s(y,!0);r(y),A(()=>m(L,e(kr))),c(S,y)};k(se,S=>{e(kr)&&S(Ge)})}var Ee=n(se,2);Za(Ee,5,()=>e(or)??[],Xa,(S,y)=>{var L=Bv(),x=s(L),z=s(x),U=s(z,!0);r(z);var Y=n(z),me=s(Y);r(Y),r(x);var te=n(x);{var Me=ge=>{var Ye=Dv();c(ge,Ye)},J=ge=>{var Ye=I(),fa=w(Ye);{var ga=ee=>{var xe=Ov();c(ee,xe)},za=ee=>{var xe=qv();xe.__click=[Uv,sn,y];var ia=s(xe);Fi(ia,{size:13}),W(),r(xe),c(ee,xe)};k(fa,ee=>{e(y),v(()=>e(y).expires_at&&new Date(e(y).expires_at)<=new Date)?ee(ga):ee(za,!1)},!0)}c(ge,Ye)};k(te,ge=>{e(y),v(()=>e(y).revoked_at)?ge(Me):ge(J,!1)})}r(L),A((ge,Ye,fa,ga)=>{m(U,(e(y),v(()=>e(y).name))),m(me,`${e(y),v(()=>e(y).prefix)??""} · ${ge??""} · created ${Ye??""} · ${fa??""}${ga??""}`)},[()=>(e(y),v(()=>e(y).scopes.join(", "))),()=>(de(St),e(y),v(()=>St(e(y).created_at))),()=>(e(y),de(St),v(()=>e(y).expires_at?`expires ${St(e(y).expires_at)}`:"no expiration")),()=>(e(y),de(Et),v(()=>e(y).last_used_at?` · used ${Et(e(y).last_used_at)}`:""))]),c(S,L)}),r(Ee),r(E),r($e);var Xe=n($e,2),Be=n(s(Xe),2),Oe=s(Be),D=n(s(Oe));Oa(D),r(Oe);var Z=n(Oe),j=n(s(Z));Oa(j),r(Z);var g=n(Z),T=n(g);{var N=S=>{var y=Vv(),L=s(y,!0);r(y),A(()=>m(L,e(xr))),c(S,y)};k(T,S=>{e(xr)&&S(N)})}r(Be),r(Xe);var O=n(Xe,2);{var we=S=>{var y=Jv(),L=n(s(y)),x=s(L),z=n(s(x)),U=s(z,!0);r(z),r(x);var Y=n(x,2),me=n(s(Y)),te=s(me,!0);r(me),r(Y);var Me=n(Y),J=n(s(Me)),ge=s(J),Ye=s(ge,!0);r(ge),r(J),r(Me);var fa=n(Me),ga=n(s(fa)),za=s(ga,!0);r(ga),r(fa);var ee=n(fa,2),xe=n(s(ee)),ia=s(xe);r(xe),r(ee),r(L),r(y),A(la=>{m(U,(e(Ba),v(()=>e(Ba).runtime.miniface_version))),m(te,(e(Ba),v(()=>e(Ba).storage.metadata_database))),m(Ye,(e(Ba),v(()=>e(Ba).storage.data_directory))),m(za,la),m(ia,`${e(Ba),v(()=>e(Ba).runtime.go_version)??""} · ${e(Ba),v(()=>e(Ba).runtime.os)??""}/${e(Ba),v(()=>e(Ba).runtime.arch)??""}`)},[()=>(de(Le),e(Ba),v(()=>Le(e(Ba).storage.available_bytes)))]),c(S,y)};k(O,S=>{e(Ba)&&S(we)})}r(Da),A(S=>{m(nt,S),g.disabled=e(ss)},[()=>v(ir)]),ar("submit",F,S=>{S.preventDefault(),rn()}),Ua(Ae,()=>e(as),S=>u(as,S)),Rs(P,()=>e(ts),S=>u(ts,S)),Rs(Ne,()=>e(rs),S=>u(rs,S)),ar("submit",Be,S=>{S.preventDefault(),on()}),Ua(D,()=>e(Pt),S=>u(Pt,S)),Ua(j,()=>e(It),S=>u(It,S)),c(Se,Fe)},Ga=Se=>{var Fe=Gv(),je=s(Fe),ua=s(je);qr(ua,{size:28}),r(je);var Pe=n(je,3);Pe.__click=[Kv,Ia],r(Fe),c(Se,Fe)};k(ut,Se=>{e(i)==="settings"?Se(Ka):Se(Ga,!1)},!0)}c(ca,ot)};k(dt,ca=>{e(i)==="storage"?ca(vt):ca(Wa,!1)},!0)}c(_a,Ja)};k(st,_a=>{e(i)==="jobs"?_a(Vt):_a(_t,!1)},!0)}c(tt,rt)};k(Bt,tt=>{e(i)==="imports"?tt(Ft):tt(Qt,!1)},!0)}c(at,lt)};k(Fa,at=>{e(i),e(o),v(()=>e(i)==="models"&&e(o).length>=3)?at($a):at(Sa,!1)},!0)}c(De,We)};k(oa,De=>{e(o),e(i),v(()=>!e(o).length||e(i)==="models"&&e(o).length===1)?De(La):De(et,!1)})}r(ds),r(va);var zt=n(va,2);{var fr=De=>{var We=Xv(),Fa=s(We);Br(Fa,{size:16});var $a=n(Fa,1,!0);r(We),A(()=>m($a,e(os))),c(De,We)};k(zt,De=>{e(os)&&De(fr)})}A(De=>{m(Sr,De),m(Er,(e(b),v(()=>e(b).username||"Administrator")))},[()=>(e(b),v(()=>{var De;return((De=e(b).username)==null?void 0:De.slice(0,1).toUpperCase())||"A"}))]),c(xa,Ie)};k(V,xa=>{e(b),v(()=>!e(b).authenticated)?xa(ze):xa(Ra,!1)},!0)}c(h,M)};k(vn,h=>{e(b)?h(_n,!1):h(cn)})}c(t,oo),Fo()}So(["click","change","input","keydown","mousedown"]);export{tc as A};

import"./CWj6FrbW.js";import{i as Js}from"./CCxBGv2h.js";import{i as Mi,a as Si,c as Ai,d as Ks,n as Ei,b as Ti,o as Ci,e as Ii,s as h,f as ys}from"./Bwd_2EOQ.js";import{l as Wa,D as br,ag as Ws,G as ls,A as Ur,i as Br,g as a,B as Pi,H as Fi,C as ks,F as qt,m as It,ad as Hi,aj as Li,j as er,J as Oi,az as Vr,aA as Jr,I as ar,aB as Xs,Z as Rr,a7 as Gs,an as Ys,aC as ws,K as ds,L as Zs,at as L,a1 as xs,aD as Qr,aa as Di,k as tr,aE as Ri,aF as Ui,aG as qi,am as Bi,aH as Vi,S as Qs,af as Ji,aI as Ki,E as Wi,aJ as Xi,ap as Gi,au as vs,aK as Yi,aL as Zi,a9 as Qi,aM as js,aN as ji,aO as an,aP as en,aQ as tn,aR as rn,aS as sn,aT as nn,aU as on,aV as ln,U as dn,ar as vn,b as c,av as cn,aW as _n,s as ai,x as s,z as o,y as r,q as v,v as ei,aX as ti,e as ma,o as z,p as $,ay as un,aY as fn,t as T,Q as m,aZ as Dt,a_ as pn,a$ as hn,w as b,b0 as w,b1 as mn,b2 as gn,ax as zs}from"./45n9HE6r.js";import{l as aa,p as Ct,s as sa,i as y}from"./BctG3pV1.js";function et(e,t){return t}function bn(e,t,i){for(var n=e.items,l=[],u=t.length,d=0;d<u;d++)qi(t[d].e,l,!0);var _=u>0&&l.length===0&&i!==null;if(_){var N=i.parentNode;Bi(N),N.append(i),n.clear(),ut(e,t[0].prev,t[u-1].next)}Vi(l,()=>{for(var M=0;M<u;M++){var W=t[M];_||(n.delete(W.k),ut(e,W.prev,W.next)),tr(W.e,!_)}})}function tt(e,t,i,n,l,u=null){var d=e,_={flags:t,items:new Map,first:null},N=(t&Xs)!==0;if(N){var M=e;d=Wa?br(Ws(M)):M.appendChild(ls())}Wa&&Ur();var W=null,G=!1,q=new Map,$a=Rr(()=>{var V=i();return Gs(V)?V:V==null?[]:Ys(V)}),S,O;function ea(){$n(O,S,_,q,d,l,t,n,i),u!==null&&(S.length===0?W?ds(W):W=er(()=>u(d)):W!==null&&Zs(W,()=>{W=null}))}Br(()=>{O??(O=Qs),S=a($a);var V=S.length;if(G&&V===0)return;G=V===0;let Ia=!1;if(Wa){var B=Pi(d)===Fi;B!==(V===0)&&(d=ks(),br(d),qt(!1),Ia=!0)}if(Wa){for(var f=null,Y,I=0;I<V;I++){if(It.nodeType===Hi&&It.data===Li){d=It,Ia=!0,qt(!1);break}var D=S[I],Za=n(D,I);Y=ns(It,_,f,null,D,Za,I,l,t,i),_.items.set(Za,Y),f=Y}V>0&&br(ks())}if(Wa)V===0&&u&&(W=er(()=>u(d)));else if(Oi()){var ct=new Set,le=ar;for(I=0;I<V;I+=1){D=S[I],Za=n(D,I);var je=_.items.get(Za)??q.get(Za);je?t&(Vr|Jr)&&ri(je,D,I,t):(Y=ns(null,_,null,null,D,Za,I,l,t,i,!0),q.set(Za,Y)),ct.add(Za)}for(const[Qa,st]of _.items)ct.has(Qa)||le.skipped_effects.add(st.e);le.add_callback(ea)}else ea();Ia&&qt(!0),a($a)}),Wa&&(d=It)}function $n(e,t,i,n,l,u,d,_,N){var Ft,Ht,ft,Ue;var M=(d&Ui)!==0,W=(d&(Vr|Jr))!==0,G=t.length,q=i.items,$a=i.first,S=$a,O,ea=null,V,Ia=[],B=[],f,Y,I,D;if(M)for(D=0;D<G;D+=1)f=t[D],Y=_(f,D),I=q.get(Y),I!==void 0&&((Ft=I.a)==null||Ft.measure(),(V??(V=new Set)).add(I));for(D=0;D<G;D+=1){if(f=t[D],Y=_(f,D),I=q.get(Y),I===void 0){var Za=n.get(Y);if(Za!==void 0){n.delete(Y),q.set(Y,Za);var ct=ea?ea.next:S;ut(i,ea,Za),ut(i,Za,ct),jr(Za,ct,l),ea=Za}else{var le=S?S.e.nodes_start:l;ea=ns(le,i,ea,ea===null?i.first:ea.next,f,Y,D,u,d,N)}q.set(Y,ea),Ia=[],B=[],S=ea.next;continue}if(W&&ri(I,f,D,d),I.e.f&Qr&&(ds(I.e),M&&((Ht=I.a)==null||Ht.unfix(),(V??(V=new Set)).delete(I))),I!==S){if(O!==void 0&&O.has(I)){if(Ia.length<B.length){var je=B[0],Qa;ea=je.prev;var st=Ia[0],_t=Ia[Ia.length-1];for(Qa=0;Qa<Ia.length;Qa+=1)jr(Ia[Qa],je,l);for(Qa=0;Qa<B.length;Qa+=1)O.delete(B[Qa]);ut(i,st.prev,_t.next),ut(i,ea,st),ut(i,_t,je),S=je,ea=_t,D-=1,Ia=[],B=[]}else O.delete(I),jr(I,S,l),ut(i,I.prev,I.next),ut(i,I,ea===null?i.first:ea.next),ut(i,ea,I),ea=I;continue}for(Ia=[],B=[];S!==null&&S.k!==Y;)S.e.f&Qr||(O??(O=new Set)).add(S),B.push(S),S=S.next;if(S===null)continue;I=S}Ia.push(I),ea=I,S=I.next}if(S!==null||O!==void 0){for(var it=O===void 0?[]:Ys(O);S!==null;)S.e.f&Qr||it.push(S),S=S.next;var zt=it.length;if(zt>0){var Pt=d&Xs&&G===0?l:null;if(M){for(D=0;D<zt;D+=1)(ft=it[D].a)==null||ft.measure();for(D=0;D<zt;D+=1)(Ue=it[D].a)==null||Ue.fix()}bn(i,it,Pt)}}M&&Di(()=>{var Bt;if(V!==void 0)for(I of V)(Bt=I.a)==null||Bt.apply()}),e.first=i.first&&i.first.e,e.last=ea&&ea.e;for(var rr of n.values())tr(rr.e);n.clear()}function ri(e,t,i,n){n&Vr&&ws(e.v,t),n&Jr?ws(e.i,i):e.i=i}function ns(e,t,i,n,l,u,d,_,N,M,W){var G=(N&Vr)!==0,q=(N&Ri)===0,$a=G?q?L(l,!1,!1):xs(l):l,S=N&Jr?xs(d):d,O={i:S,v:$a,k:u,a:null,e:null,prev:i,next:n};try{if(e===null){var ea=document.createDocumentFragment();ea.append(e=ls())}return O.e=er(()=>_(e,$a,S,M),Wa),O.e.prev=i&&i.e,O.e.next=n&&n.e,i===null?W||(t.first=O):(i.next=O,i.e.next=O.e),n!==null&&(n.prev=O,n.e.prev=O.e),O}finally{}}function jr(e,t,i){for(var n=e.next?e.next.e.nodes_start:i,l=t?t.e.nodes_start:i,u=e.e.nodes_start;u!==null&&u!==n;){var d=Ji(u);l.before(u),u=d}}function ut(e,t,i){t===null?e.first=i:(t.next=i,t.e.next=i&&i.e),i!==null&&(i.prev=t,i.e.prev=t&&t.e)}function ta(e,t,i,n,l){var _;Wa&&Ur();var u=(_=t.$$slots)==null?void 0:_[i],d=!1;u===!0&&(u=t.children,d=!0),u===void 0||u(e,d?()=>n:n)}function yn(e,t,i,n,l,u){let d=Wa;Wa&&Ur();var _,N,M=null;Wa&&It.nodeType===Ki&&(M=It,Ur());var W=Wa?It:e,G;Br(()=>{const q=t()||null;var $a=Xi;q!==_&&(G&&(q===null?Zs(G,()=>{G=null,N=null}):q===N?ds(G):tr(G)),q&&q!==N&&(G=er(()=>{if(M=Wa?M:document.createElementNS($a,q),Gi(M,M),n){Wa&&Mi(q)&&M.append(document.createComment(""));var S=Wa?Ws(M):M.appendChild(ls());Wa&&(S===null?qt(!1):br(S)),n(M,S)}Qs.nodes_end=M,W.before(M)})),_=q,_&&(N=_))},Wi),d&&(qt(!0),br(W))}function kn(e,t){var i=void 0,n;Br(()=>{i!==(i=t())&&(n&&(tr(n),n=null),i&&(n=er(()=>{vs(()=>i(e))})))})}function si(e){var t,i,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var l=e.length;for(t=0;t<l;t++)e[t]&&(i=si(e[t]))&&(n&&(n+=" "),n+=i)}else for(i in e)e[i]&&(n&&(n+=" "),n+=i);return n}function wn(){for(var e,t,i=0,n="",l=arguments.length;i<l;i++)(e=arguments[i])&&(t=si(e))&&(n&&(n+=" "),n+=t);return n}function ii(e){return typeof e=="object"?wn(e):e??""}const Ns=[...` 	
\r\f \v\uFEFF`];function xn(e,t,i){var n=e==null?"":""+e;if(t&&(n=n?n+" "+t:t),i){for(var l in i)if(i[l])n=n?n+" "+l:l;else if(n.length)for(var u=l.length,d=0;(d=n.indexOf(l,d))>=0;){var _=d+u;(d===0||Ns.includes(n[d-1]))&&(_===n.length||Ns.includes(n[_]))?n=(d===0?"":n.substring(0,d))+n.substring(_+1):d=_}}return n===""?null:n}function Ms(e,t=!1){var i=t?" !important;":";",n="";for(var l in e){var u=e[l];u!=null&&u!==""&&(n+=" "+l+": "+u+i)}return n}function as(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function zn(e,t){if(t){var i="",n,l;if(Array.isArray(t)?(n=t[0],l=t[1]):n=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var u=!1,d=0,_=!1,N=[];n&&N.push(...Object.keys(n).map(as)),l&&N.push(...Object.keys(l).map(as));var M=0,W=-1;const O=e.length;for(var G=0;G<O;G++){var q=e[G];if(_?q==="/"&&e[G-1]==="*"&&(_=!1):u?u===q&&(u=!1):q==="/"&&e[G+1]==="*"?_=!0:q==='"'||q==="'"?u=q:q==="("?d++:q===")"&&d--,!_&&u===!1&&d===0){if(q===":"&&W===-1)W=G;else if(q===";"||G===O-1){if(W!==-1){var $a=as(e.substring(M,W).trim());if(!N.includes($a)){q!==";"&&G++;var S=e.substring(M,G).trim();i+=" "+S+";"}}M=G+1,W=-1}}}}return n&&(i+=Ms(n)),l&&(i+=Ms(l,!0)),i=i.trim(),i===""?null:i}return e==null?null:String(e)}function oe(e,t,i,n,l,u){var d=e.__className;if(Wa||d!==i||d===void 0){var _=xn(i,n,u);(!Wa||_!==e.getAttribute("class"))&&(_==null?e.removeAttribute("class"):t?e.className=_:e.setAttribute("class",_)),e.__className=i}else if(u&&l!==u)for(var N in u){var M=!!u[N];(l==null||M!==!!l[N])&&e.classList.toggle(N,M)}return u}function es(e,t={},i,n){for(var l in i){var u=i[l];t[l]!==u&&(i[l]==null?e.style.removeProperty(l):e.style.setProperty(l,u,n))}}function os(e,t,i,n){var l=e.__style;if(Wa||l!==t){var u=zn(t,n);(!Wa||u!==e.getAttribute("style"))&&(u==null?e.removeAttribute("style"):e.style.cssText=u),e.__style=t}else n&&(Array.isArray(n)?(es(e,i==null?void 0:i[0],n[0]),es(e,i==null?void 0:i[1],n[1],"important")):es(e,i,n));return n}function qr(e,t,i=!1){if(e.multiple){if(t==null)return;if(!Gs(t))return Yi();for(var n of e.options)n.selected=t.includes($r(n));return}for(n of e.options){var l=$r(n);if(Zi(l,t)){n.selected=!0;return}}(!i||t!==void 0)&&(e.selectedIndex=-1)}function ni(e){var t=new MutationObserver(()=>{qr(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Qi(()=>{t.disconnect()})}function Nn(e,t,i=t){var n=!0;js(e,"change",l=>{var u=l?"[selected]":":checked",d;if(e.multiple)d=[].map.call(e.querySelectorAll(u),$r);else{var _=e.querySelector(u)??e.querySelector("option:not([disabled])");d=_&&$r(_)}i(d)}),vs(()=>{var l=t();if(qr(e,l,n),n&&l===void 0){var u=e.querySelector(":checked");u!==null&&(l=$r(u),i(l))}e.__value=l,n=!1}),ni(e)}function $r(e){return"__value"in e?e.__value:e.value}const _r=Symbol("class"),ur=Symbol("style"),oi=Symbol("is custom element"),li=Symbol("is html");function wt(e){if(Wa){var t=!1,i=()=>{if(!t){if(t=!0,e.hasAttribute("value")){var n=e.value;Ka(e,"value",null),e.value=n}if(e.hasAttribute("checked")){var l=e.checked;Ka(e,"checked",null),e.checked=l}}};e.__on_r=i,nn(i),on()}}function Mn(e,t){var i=cs(e);i.value===(i.value=t??void 0)||e.value===t&&(t!==0||e.nodeName!=="PROGRESS")||(e.value=t??"")}function Sn(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function Ka(e,t,i,n){var l=cs(e);Wa&&(l[t]=e.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&e.nodeName==="LINK")||l[t]!==(l[t]=i)&&(t==="loading"&&(e[ji]=i),i==null?e.removeAttribute(t):typeof i!="string"&&di(e).includes(t)?e[t]=i:e.setAttribute(t,i))}function An(e,t,i,n,l=!1){var u=cs(e),d=u[oi],_=!u[li];let N=Wa&&d;N&&qt(!1);var M=t||{},W=e.tagName==="OPTION";for(var G in t)G in i||(i[G]=null);i.class?i.class=ii(i.class):i[_r]&&(i.class=null),i[ur]&&(i.style??(i.style=null));var q=di(e);for(const B in i){let f=i[B];if(W&&B==="value"&&f==null){e.value=e.__value="",M[B]=f;continue}if(B==="class"){var $a=e.namespaceURI==="http://www.w3.org/1999/xhtml";oe(e,$a,f,n,t==null?void 0:t[_r],i[_r]),M[B]=f,M[_r]=i[_r];continue}if(B==="style"){os(e,f,t==null?void 0:t[ur],i[ur]),M[B]=f,M[ur]=i[ur];continue}var S=M[B];if(!(f===S&&!(f===void 0&&e.hasAttribute(B)))){M[B]=f;var O=B[0]+B[1];if(O!=="$$")if(O==="on"){const Y={},I="$$"+B;let D=B.slice(2);var ea=Ti(D);if(Si(D)&&(D=D.slice(0,-7),Y.capture=!0),!ea&&S){if(f!=null)continue;e.removeEventListener(D,M[I],Y),M[I]=null}if(f!=null)if(ea)e[`__${D}`]=f,Ks([D]);else{let Za=function(ct){M[B].call(this,ct)};M[I]=Ai(D,e,Za,Y)}else ea&&(e[`__${D}`]=void 0)}else if(B==="style")Ka(e,B,f);else if(B==="autofocus")ln(e,!!f);else if(!d&&(B==="__value"||B==="value"&&f!=null))e.value=e.__value=f;else if(B==="selected"&&W)Sn(e,f);else{var V=B;_||(V=Ei(V));var Ia=V==="defaultValue"||V==="defaultChecked";if(f==null&&!d&&!Ia)if(u[B]=null,V==="value"||V==="checked"){let Y=e;const I=t===void 0;if(V==="value"){let D=Y.defaultValue;Y.removeAttribute(V),Y.defaultValue=D,Y.value=Y.__value=I?D:null}else{let D=Y.defaultChecked;Y.removeAttribute(V),Y.defaultChecked=D,Y.checked=I?D:!1}}else e.removeAttribute(B);else Ia||q.includes(V)&&(d||typeof f!="string")?(e[V]=f,V in u&&(u[V]=dn)):typeof f!="function"&&Ka(e,V,f)}}}return N&&qt(!0),M}function Ss(e,t,i=[],n=[],l,u=!1){rn(i,n,d=>{var _=void 0,N={},M=e.nodeName==="SELECT",W=!1;if(Br(()=>{var q=t(...d.map(a)),$a=An(e,_,q,l,u);W&&M&&"value"in q&&qr(e,q.value);for(let O of Object.getOwnPropertySymbols(N))q[O]||tr(N[O]);for(let O of Object.getOwnPropertySymbols(q)){var S=q[O];O.description===sn&&(!_||S!==_[O])&&(N[O]&&tr(N[O]),N[O]=er(()=>kn(e,()=>S))),$a[O]=S}_=$a}),M){var G=e;vs(()=>{qr(G,_.value,!0),ni(G)})}W=!0})}function cs(e){return e.__attributes??(e.__attributes={[oi]:e.nodeName.includes("-"),[li]:e.namespaceURI===an})}var As=new Map;function di(e){var t=e.getAttribute("is")||e.nodeName,i=As.get(t);if(i)return i;As.set(t,i=[]);for(var n,l=e,u=Element.prototype;u!==l;){n=tn(l);for(var d in n)n[d].set&&i.push(d);l=en(l)}return i}function xt(e,t,i=t){var n=new WeakSet;js(e,"input",async l=>{var u=l?e.defaultValue:e.value;if(u=ts(e)?rs(u):u,i(u),ar!==null&&n.add(ar),await vn(),u!==(u=t())){var d=e.selectionStart,_=e.selectionEnd;e.value=u??"",_!==null&&(e.selectionStart=d,e.selectionEnd=Math.min(_,e.value.length))}}),(Wa&&e.defaultValue!==e.value||c(t)==null&&e.value)&&(i(ts(e)?rs(e.value):e.value),ar!==null&&n.add(ar)),cn(()=>{var l=t();if(e===document.activeElement){var u=_n??ar;if(n.has(u))return}ts(e)&&l===rs(e.value)||e.type==="date"&&!l&&!e.value||l!==e.value&&(e.value=l??"")})}function ts(e){var t=e.type;return t==="number"||t==="range"}function rs(e){return e===""?null:+e}/**
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
 */const En={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
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
 */const Tn=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
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
 */const Es=(...e)=>e.filter((t,i,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===i).join(" ").trim();var Cn=ti("<svg><!><!></svg>");function ia(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]),n=aa(i,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);ai(t,!1);let l=Ct(t,"name",8,void 0),u=Ct(t,"color",8,"currentColor"),d=Ct(t,"size",8,24),_=Ct(t,"strokeWidth",8,2),N=Ct(t,"absoluteStrokeWidth",8,!1),M=Ct(t,"iconNode",24,()=>[]);Js();var W=Cn();Ss(W,($a,S,O)=>({...En,...$a,...n,width:d(),height:d(),stroke:u(),"stroke-width":S,class:O}),[()=>Tn(n)?void 0:{"aria-hidden":"true"},()=>(ma(N()),ma(_()),ma(d()),c(()=>N()?Number(_())*24/Number(d()):_())),()=>(ma(Es),ma(l()),ma(i),c(()=>Es("lucide-icon","lucide",l()?`lucide-${l()}`:"",i.class)))]);var G=s(W);tt(G,1,M,et,($a,S)=>{var O=un(()=>fn(a(S),2));let ea=()=>a(O)[0],V=()=>a(O)[1];var Ia=z(),B=$(Ia);yn(B,ea,!0,(f,Y)=>{Ss(f,()=>({...V()}))}),v($a,Ia)});var q=o(G);ta(q,t,"default",{}),r(W),v(e,W),ei()}function Ts(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];ia(e,sa({name:"activity"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function In(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];ia(e,sa({name:"arrow-left"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Rt(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];ia(e,sa({name:"arrow-right"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function fr(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M20 6 9 17l-5-5"}]];ia(e,sa({name:"check"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Pr(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];ia(e,sa({name:"circle-alert"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Ut(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];ia(e,sa({name:"circle-check"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function pr(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];ia(e,sa({name:"circle-x"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Pn(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6h4"}]];ia(e,sa({name:"clock-3"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Cs(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M12 13v8l-4-4"}],["path",{d:"m12 21 4-4"}],["path",{d:"M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"}]];ia(e,sa({name:"cloud-download"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Fn(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m16 18 6-6-6-6"}],["path",{d:"m8 6-6 6 6 6"}]];ia(e,sa({name:"code"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function hr(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];ia(e,sa({name:"copy"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Is(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];ia(e,sa({name:"database"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Ps(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];ia(e,sa({name:"eye-off"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Fs(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];ia(e,sa({name:"eye"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function ss(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M14.5 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.8"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M11.7 14.2 7 17l-4.7-2.8"}],["path",{d:"M3 13.1a2 2 0 0 0-.999 1.76v3.24a2 2 0 0 0 .969 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01z"}],["path",{d:"M7 17v5"}]];ia(e,sa({name:"file-box"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Fr(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];ia(e,sa({name:"file-text"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Hn(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{d:"M2 13h10"}],["path",{d:"m9 16 3-3-3-3"}]];ia(e,sa({name:"folder-input"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Ln(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];ia(e,sa({name:"gauge"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function is(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"3"}],["line",{x1:"3",x2:"9",y1:"12",y2:"12"}],["line",{x1:"15",x2:"21",y1:"12",y2:"12"}]];ia(e,sa({name:"git-commit-horizontal"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Hs(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M10 16h.01"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}],["path",{d:"M21.946 12.013H2.054"}],["path",{d:"M6 16h.01"}]];ia(e,sa({name:"hard-drive"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function On(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];ia(e,sa({name:"info"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Ls(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor"}]];ia(e,sa({name:"key-round"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Os(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];ia(e,sa({name:"layers"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Dn(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];ia(e,sa({name:"layout-grid"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Rn(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];ia(e,sa({name:"list"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function vt(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56"}]];ia(e,sa({name:"loader-circle"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Un(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m16 17 5-5-5-5"}],["path",{d:"M21 12H9"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]];ia(e,sa({name:"log-out"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Hr(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];ia(e,sa({name:"plus"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function qn(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];ia(e,sa({name:"refresh-cw"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Ds(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];ia(e,sa({name:"search"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Rs(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18"}]];ia(e,sa({name:"server"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Bn(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M14 17H5"}],["path",{d:"M19 7h-9"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]];ia(e,sa({name:"settings-2"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function mr(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];ia(e,sa({name:"shield-check"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Us(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["path",{d:"M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["rect",{width:"8",height:"8",x:"14",y:"14",rx:"2"}]];ia(e,sa({name:"square-stack"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Vn(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m7 11 2-2-2-2"}],["path",{d:"M11 13h4"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}]];ia(e,sa({name:"square-terminal"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function qs(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];ia(e,sa({name:"triangle-alert"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Bs(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];ia(e,sa({name:"upload"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}function Vs(e,t){const i=aa(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];ia(e,sa({name:"x"},()=>i,{get iconNode(){return n},children:(l,u)=>{var d=z(),_=$(d);ta(_,t,"default",{}),v(l,d)},$$slots:{default:!0}}))}const Jn="/api/miniface/v1";class Kn extends Error{constructor(t,i){super(t),this.status=i}}async function at(e,t={},i){const n=new Headers(t.headers);n.set("Accept","application/json"),t.body&&n.set("Content-Type","application/json"),i&&n.set("X-CSRF-Token",i);const l=await fetch(`${Jn}${e}`,{...t,headers:n,credentials:"same-origin"});if(!l.ok){let u=`Request failed (${l.status})`;try{const d=await l.json();u=d.error??d.message??u}catch{}throw new Kn(u,l.status)}return l.json()}const rt={session:()=>at("/session"),login:e=>at("/session",{method:"POST",body:JSON.stringify({token:e})}),logout:e=>at("/session",{method:"DELETE"},e),models:async()=>(await at("/models")).models,model:(e,t)=>at(`/models/${encodeURIComponent(e)}/${encodeURIComponent(t)}`),jobs:async()=>(await at("/jobs")).jobs,cancelJob:async(e,t)=>(await at(`/jobs/${encodeURIComponent(e)}/cancel`,{method:"POST"},t)).job,storage:()=>at("/storage"),searchHuggingFace:async e=>(await at(`/huggingface/models?search=${encodeURIComponent(e)}`)).models,importLocal:(e,t)=>at("/imports",{method:"POST",body:JSON.stringify(e)},t),importHuggingFace:(e,t)=>at("/imports/huggingface",{method:"POST",body:JSON.stringify(e)},t),saveCard:(e,t,i,n,l)=>at(`/models/${encodeURIComponent(e)}/${encodeURIComponent(t)}/card`,{method:"PUT",body:JSON.stringify({content:i,message:n})},l)};var Wn=ti('<svg class="mark svelte-hzs9fv" viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="#6758F3"></rect><path d="M9 9.5h22a3 3 0 0 1 3 3v9.25a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V12.5a3 3 0 0 1 3-3Z" fill="#F7F7F2"></path><circle cx="14" cy="16.5" r="1.65" fill="#202026"></circle><circle cx="26" cy="16.5" r="1.65" fill="#202026"></circle><path d="M15.5 20c1.1 1.25 2.6 1.9 4.5 1.9s3.4-.65 4.5-1.9" fill="none" stroke="#202026" stroke-linecap="round" stroke-width="1.8"></path><path d="M7.5 27.5h25v1.75a4 4 0 0 1-4 4h-17a4 4 0 0 1-4-4V27.5Z" fill="#202026"></path><path d="M12 30.25h7" stroke="#F7F7F2" stroke-linecap="round" stroke-width="1.5"></path><circle cx="28.75" cy="30.25" r="1.75" fill="#C7F36B"></circle></svg>');function gr(e,t){let i=Ct(t,"size",3,36),n=Ct(t,"title",3,"");var l=Wn();T(()=>{Ka(l,"width",i()),Ka(l,"height",i()),Ka(l,"role",n()?"img":void 0),Ka(l,"aria-hidden",n()?void 0:"true"),Ka(l,"aria-label",n()||void 0)}),v(e,l)}function Ja(e){if(!Number.isFinite(e)||e<0)return"—";if(e===0)return"0 B";const t=["B","KiB","MiB","GiB","TiB"],i=Math.min(Math.floor(Math.log(e)/Math.log(1024)),t.length-1),n=e/1024**i;return`${n.toFixed(i===0||n>=10?0:1)} ${t[i]}`}function Je(e){return e?e.slice(0,8):"—"}function Lr(e){const t=new Date(e);return Number.isNaN(t.valueOf())?"Unknown":new Intl.DateTimeFormat(void 0,{dateStyle:"medium",timeStyle:"short"}).format(t)}function Or(e){return Math.max(0,Math.min(100,e<=1?e*100:e))}function jt(e,t=Date.now()){const i=new Date(e).valueOf();if(!Number.isFinite(i))return"Unknown";const n=i-t,l=Math.abs(n);if(l<6e4)return"just now";const u=[["year",365*24*60*6e4],["month",30*24*60*6e4],["day",24*60*6e4],["hour",60*6e4],["minute",6e4]],[d,_]=u.find(([,N])=>l>=N)??u.at(-1);return new Intl.RelativeTimeFormat(void 0,{numeric:"auto"}).format(Math.round(n/_),d)}function Dr(e){return!Number.isFinite(e)||e<=1?0:Math.min(100,Math.max(0,100-100/e))}async function Xn(e,t,i,n,l){var u;(u=a(t))!=null&&u.csrf_token&&(await rt.logout(a(t).csrf_token),m(t,{authenticated:!1}),m(i,null),m(n,null),m(l,null))}function Gn(e,t){localStorage.setItem("miniface:model-sort",a(t))}async function Yn(e,t,i,n,l,u,d,_){var N;if(!(!((N=a(t))!=null&&N.csrf_token)||!a(i))){m(n,!0),m(l,"");try{const M=await rt.saveCard(a(i).model.owner,a(i).model.name,a(u),a(d),a(t).csrf_token);"model"in M&&m(i,M),m(l,"Model card saved as a new immutable revision."),m(_,"success")}catch(M){m(l,M instanceof Error?M.message:"Save failed"),m(_,"error")}finally{m(n,!1)}}}var Zn=b('<meta name="description" content="A private, local-first model registry"/>'),Qn=()=>location.reload(),jn=b('<!> <p> </p> <button class="button secondary">Try again</button>',1),ao=b("<!> <p>Opening your registry…</p>",1),eo=b('<main class="boot-screen"><div class="boot-brand"><!><span>miniface</span></div> <!></main>'),to=(e,t)=>m(t,!a(t)),ro=b('<p class="inline-alert danger"><!> </p>'),so=b("<!> Signing in…",1),io=b("Continue <!>",1),no=b('<main class="auth-shell"><section class="auth-story" aria-label="About Miniface"><div class="brand-lockup"><!><span>miniface</span></div> <div class="auth-message"><span class="kicker inverse">Local model registry</span> <h1>Keep your models<br/>close at hand.</h1> <p>A quiet, private home for model versions, adapters, and artifacts—built to stay on your machine.</p></div> <div class="auth-points"><span><!> Private by default</span> <span><!> Deduplicated storage</span> <span><!> Immutable revisions</span></div></section> <section class="login-wrap"><div class="login-card"><div class="login-mark"><!></div> <span class="kicker">Welcome back</span> <h2>Open Miniface</h2> <p class="subtle">Use the administrator token created when this server started.</p> <form><label for="token">Administrator token</label> <div class="password-field"><!> <input id="token" required autocomplete="current-password" placeholder="mf_••••••••••••"/> <button type="button" class="field-button"><!></button></div> <!> <button class="button primary wide"><!></button></form> <p class="privacy-note"><!> Exchanged for a secure session. Never stored in your browser.</p></div></section></main>'),oo=(e,t)=>t("/models"),lo=(e,t,i)=>t(a(i).path),vo=b("<button><!> <span> </span></button>"),co=(e,t)=>t("/models"),_o=(e,t)=>t("/imports"),uo=(e,t,i)=>t(a(i)),fo=b('<div class="page-alert" role="alert"><!> <div><strong>Something went wrong</strong><span> </span></div> <button class="button secondary small">Retry</button></div>'),po=(e,t)=>t("/imports"),ho=(e,t)=>m(t,""),mo=b('<button type="button" aria-label="Clear search"><!></button>'),go=(e,t)=>t("grid"),bo=(e,t)=>t("list"),$o=b('<div class="empty-state compact"><!><h2>Loading your library</h2></div>'),yo=(e,t)=>m(t,""),ko=b('<button class="button secondary">Clear search</button>'),wo=(e,t)=>t("/imports"),xo=b('<button class="button primary"><!> Import your first model</button>'),zo=b('<div class="empty-state"><div class="empty-illustration"><!></div> <h2> </h2> <p> </p> <!></div>'),No=(e,t,i)=>t(`/models/${a(i).owner}/${a(i).name}`),Mo=b('<span class="badge"> </span>'),So=b('<p class="base-model"><!> </p>'),Ao=b('<button class="model-card"><div class="model-card-top"><div class="model-glyph"><!><i></i></div> <span></span></div> <div class="model-title"><span> </span> <h2> </h2></div> <p class="architecture"> </p> <div class="badges"><span class="badge violet"> </span> <!> <span> </span></div> <!> <dl class="model-facts"><div><dt>Size</dt><dd> </dd></div> <div><dt>Files</dt><dd> </dd></div> <div><dt>Revision</dt><dd><code> </code></dd></div></dl> <div class="model-card-foot"><span> </span><!></div></button>'),Eo=b('<div class="model-grid"></div>'),To=(e,t,i)=>t(`/models/${a(i).owner}/${a(i).name}`),Co=b('<button class="model-row"><span class="model-row-name"><i><!></i><span><strong> </strong><small> <code> </code></small></span></span> <span><span class="badge violet"> </span></span> <span class="row-value"> </span> <span class="row-value"> </span> <span class="row-arrow"><!></span></button>'),Io=b('<section class="model-list surface"><div class="model-list-head" aria-hidden="true"><span>Model</span><span>Type</span><span>Size</span><span>Updated</span><span></span></div> <!></section>'),Po=b('<header class="page-header"><div><span class="kicker">Model library</span> <h1>Your models</h1> <p>Browse every model, adapter, and immutable revision stored on this server.</p></div> <button class="button primary"><!> Import model</button></header> <section class="library-toolbar" aria-label="Model filters"><label class="search-field"><!> <input aria-label="Search models" placeholder="Search your library"/> <!></label> <div class="toolbar-end"><span class="result-count"> </span> <label class="select-wrap" aria-label="Sort models"><select><option>Recently updated</option><option>Name</option><option>Largest first</option></select></label> <div class="view-switch" aria-label="Model view"><button aria-label="Grid view"><!></button> <button aria-label="List view"><!></button></div></div></section> <!>',1),Fo=b('<div class="empty-state compact"><!><h2>Opening repository</h2></div>'),Ho=(e,t)=>t("/models"),Lo=(e,t,i)=>{var n;return t(((n=a(i))==null?void 0:n.model.sha)||"","revision")},Oo=b("<!> Copied",1),Do=b("<!> <code> </code>",1),Ro=(e,t,i)=>t(`/models/${a(i)[1]}/${a(i)[2]}/usage`,!1),Uo=(e,t,i,n)=>t(`/models/${a(i)[1]}/${a(i)[2]}${a(n).slug==="overview"?"":`/${a(n).slug}`}`,!1),qo=b('<button role="tab"> </button>'),Bo=b('<div class="callout warning"><!><div><strong>Base revision is not pinned</strong><span>Pin an immutable base revision before using this adapter for reproducible loads.</span></div></div>'),Vo=(e,t,i)=>t(`/models/${a(i)[1]}/${a(i)[2]}/model-card`,!1),Jo=b("<h4> </h4>"),Ko=b("<h3> </h3>"),Wo=b("<h2> </h2>"),Xo=b('<p class="card-list-item"> </p>'),Go=b("<p> </p>"),Yo=b('<span class="card-space"></span>'),Zo=b('<div class="card-text"></div>'),Qo=b('<div class="inline-empty"><!><div><strong>No model card yet</strong><span>Add notes, limitations, and usage guidance for this model.</span></div></div>'),jo=b("<code> </code>"),al=b('<div><dt>Base model</dt><dd class="metadata-reference"> <!></dd></div>'),el=b('<div><dt>Imported from</dt><dd class="metadata-reference"> <code> </code></dd></div>'),tl=(e,t,i)=>t(`/models/${a(i)[1]}/${a(i)[2]}/usage`,!1),rl=b('<!> <div class="overview-grid"><section class="surface model-card-content"><div class="section-heading"><div><span class="kicker">README.md</span><h2>Model card</h2></div><button class="button ghost small">Edit <!></button></div> <!></section> <aside class="overview-side"><section class="surface metadata-card"><div class="section-heading"><div><span class="kicker">At a glance</span><h2>Model details</h2></div></div> <dl class="metadata-list"><div><dt>Architecture</dt><dd> </dd></div> <div><dt>Quantization</dt><dd> </dd></div> <div><dt>Last updated</dt><dd> </dd></div> <div><dt>Current revision</dt><dd><code> </code></dd></div> <!> <!></dl></section> <button class="usage-shortcut"><div><!><span><strong>Ready to use</strong><small>Copy a pinned CLI or Python snippet</small></span></div><!></button></aside></div>',1),sl=b('<div class="file-row"><span class="file-name"><!> </span><span><span class="badge"> </span></span><span> </span></div>'),il=b('<section class="surface data-panel"><div class="section-heading panel-padding"><div><span class="kicker">Repository contents</span><h2>Files</h2></div><span class="section-meta"> </span></div> <div class="file-table"><div class="file-row file-head" aria-hidden="true"><span>Path</span><span>Storage</span><span>Size</span></div> <!></div></section>'),nl=b('<span class="badge violet">current</span>'),ol=(e,t,i)=>t(a(i).oid,`revision-${a(i).oid}`),ll=b('<article><div class="timeline-marker"><!></div> <div class="revision-body"><div><h3> </h3><!></div> <p> </p> <button class="commit-copy"><code> </code><!></button></div></article>'),dl=b('<section class="surface revision-panel"><div class="section-heading"><div><span class="kicker">Immutable history</span><h2>Revisions</h2></div><span class="section-meta"> </span></div> <div class="timeline"></div></section>'),vl=(e,t,i,n)=>t(i(a(n).key),`usage-${a(n).key}`),cl=b("<!> Copied",1),_l=b("<!> Copy",1),ul=b('<article><div><span><strong> </strong><small> </small></span><button class="copy-button"><!></button></div> <pre><code> </code></pre></article>'),fl=b('<div class="callout info"><!><div><strong>Reproducible by default</strong><span>Set <code>HF_ENDPOINT</code> before importing Hugging Face libraries. Every example pins revision <code> </code>.</span></div></div> <section class="usage-grid"></section>',1),pl=b("<p><!> </p>"),hl=b("<!> Saving…",1),ml=b('<section class="editor-layout"><div class="surface editor-panel"><div class="section-heading"><div><span class="kicker">README.md</span><h2>Edit model card</h2></div><span class="badge">Markdown</span></div> <p class="section-description">Document intended use, training details, and limitations. Content stays on this Miniface server.</p> <label for="card">Markdown content</label> <textarea id="card" rows="20" placeholder="# Model name  Describe this model…"></textarea> <label for="card-message">Revision message</label> <input id="card-message"/> <!> <div class="form-actions"><span>Saving creates a new immutable revision.</span><button class="button primary"><!></button></div></div></section>'),gl=b('<button class="text-button breadcrumb"><!> Model library</button> <header class="repository-header"><div class="repository-identity"><div class="repository-glyph"><!></div> <div><div class="badges compact-badges"><span class="badge violet"> </span> <span> </span></div> <h1><span> </span> </h1> <p> </p></div></div> <div class="repository-actions"><button class="button secondary"><!></button> <button class="button primary"><!> Use model</button></div></header> <div class="detail-tabs" role="tablist" aria-label="Repository sections"></div> <!>',1),bl=(e,t)=>t("local"),$l=(e,t)=>t("huggingface"),yl=b('<div class="field-group"><label for="path">Directory path</label> <input id="path" required placeholder="/home/me/models/llama-adapter"/> <small>The path is read by the Miniface server. Symlinks and unsafe files are rejected.</small></div>'),kl=(e,t,i)=>{m(t,e.currentTarget.value),i()},wl=(e,t,i)=>t(a(i)),xl=b('<button type="button"><span><strong> </strong><small> </small></span> <span><strong> </strong><small> </small></span></button>'),zl=b('<div class="hub-results"></div>'),Nl=b('<div class="access-note warning"><!><div><strong>Hugging Face access required</strong><span>Accept this model’s terms, then provide a read token below.</span></div></div>'),Ml=b('<div class="access-note success"><!><div><strong>Public repository</strong><span>No Hugging Face token is required.</span></div></div>'),Sl=b('<p class="inline-alert danger"><!> </p>'),Al=(e,t)=>m(t,!a(t)),El=b('<div class="field-group"><label for="hub-repo">Repository</label> <div class="hub-picker"><div class="input-with-icon"><!><input id="hub-repo" required pattern="[^/]+/[^/]+" autocomplete="off" placeholder="google/gemma-3-1b-it" aria-describedby="hub-help"/><!></div> <!></div> <small id="hub-help">Search public models or enter an exact public, private, or gated repository ID.</small></div> <!> <!> <div class="field-row"><div class="field-group"><label for="hub-revision">Source revision</label> <input id="hub-revision" required placeholder="main"/> <small>Branch, tag, or commit.</small></div> <div class="field-group"><label for="hub-token">Access token <span> </span></label> <div class="password-field light"><input id="hub-token" autocomplete="off" placeholder="hf_••••••••••••"/><button type="button" class="field-button"><!></button></div> <small>Held only for the active job.</small></div></div>',1),Tl=(e,t)=>t("/jobs"),Cl=b('<button type="button" class="button secondary small">View activity <!></button>'),Il=b('<div role="status"><!> <div><strong> </strong><span> </span></div> <!></div>'),Pl=b("<!> Queueing…",1),Fl=b(" <!>",1),Hl=b('<header class="page-header narrow-header"><div><span class="kicker">Add to your library</span><h1>Import a model</h1><p>Bring in a folder from this machine or mirror a pinned Hugging Face snapshot.</p></div></header> <div class="import-layout"><section class="import-main"><div class="source-options" role="radiogroup" aria-label="Import source"><button role="radio"><span class="source-icon"><!></span> <span><strong>Local folder</strong><small>Copy a directory from this server</small></span> <i></i></button> <button role="radio"><span class="source-icon"><!></span> <span><strong>Hugging Face</strong><small>Mirror an immutable snapshot</small></span> <i></i></button></div> <section class="surface import-form-card"><div class="section-heading"><div><span class="step-label">1</span><div><span class="kicker">Source</span><h2> </h2></div></div></div> <form><!> <div class="form-divider"></div> <div class="section-heading inline-section"><div><span class="step-label">2</span><div><span class="kicker">Destination</span><h2>Name the repository</h2></div></div></div> <div class="field-group"><label for="repo">Miniface repository</label> <input id="repo" required pattern="[^/]+/[^/]+" placeholder="team/model-name"/> <small>Use an owner/name pair. This becomes the model’s permanent local ID.</small></div> <div class="field-group"><label for="message">Revision message</label> <input id="message" required/></div> <!> <div class="form-actions import-actions"><span> </span> <button class="button primary"><!></button></div></form></section></section> <aside class="import-aside"><section class="surface flow-card"><span class="kicker">What happens next</span> <ol><li><span>1</span><div><strong> </strong><small> </small></div></li> <li><span>2</span><div><strong>Store efficiently</strong><small>Existing Xet content is reused whenever possible.</small></div></li> <li><span>3</span><div><strong>Publish atomically</strong><small>The model appears only after every file is durable.</small></div></li></ol></section> <div class="privacy-card"><!><div><strong>Private by design</strong><span>Imports stay between this browser, your Miniface server, and the source you choose.</span></div></div></aside></div>',1),Ll=(e,t)=>t(),Ol=b('<p class="inline-alert danger page-inline-alert"><!> </p>'),Dl=b('<div class="empty-state compact"><!><h2>Loading activity</h2></div>'),Rl=(e,t)=>t("/imports"),Ul=b('<div class="empty-state"><div class="empty-illustration"><!></div><h2>Nothing running yet</h2><p>Imports and other background work will appear here.</p><button class="button primary"><!> Start an import</button></div>'),ql=(e,t)=>m(t,"all"),Bl=(e,t)=>m(t,"active"),Vl=(e,t)=>m(t,"completed"),Jl=b("<i></i> Updates automatically",1),Kl=b('<div class="empty-state compact"><!><h2>No jobs in this view</h2></div>'),Wl=b("<small> </small>"),Xl=b('<div class="progress"><i></i></div>'),Gl=(e,t,i)=>t(a(i)),Yl=b('<button class="button danger small"> </button>'),Zl=(e,t,i)=>m(t,a(t)===a(i).id?"":a(i).id),Ql=b('<button class="details-button"><!> Details</button>'),jl=b('<div class="job-detail"><strong>Error details</strong><code> </code><span> </span></div>'),ad=b('<article><div class="job-main-row"><span><!></span> <div class="job-name"><strong> </strong><span><span class="badge"> </span> </span></div> <div class="job-progress-cell"><div><span> </span><!></div> <!></div> <time> </time> <div class="job-actions"><!> <!></div></div> <!></article>'),ed=b('<section class="jobs-list surface"></section>'),td=b('<div class="activity-summary"><div><span class="activity-icon active"><!></span><span><strong> </strong><small>Active</small></span></div> <div><span class="activity-icon done"><!></span><span><strong> </strong><small>Completed</small></span></div> <p>Job history is kept as a lightweight audit log; finished work stays collapsed to a single row.</p></div> <div class="activity-toolbar"><div class="filter-tabs" aria-label="Filter activity"><button>All <span> </span></button> <button>Active <span> </span></button> <button>History <span> </span></button></div> <span class="polling-note"><!></span></div> <!>',1),rd=b('<header class="page-header"><div><span class="kicker">Background work</span><h1>Activity</h1><p>Imports, indexing, and maintenance in one compact history.</p></div> <button class="button secondary"><!> Refresh</button></header> <!> <!>',1),sd=b('<div class="empty-state compact"><!><h2>Reading storage</h2></div>'),id=b('<div class="storage-stats"><article class="surface stat-card"><span class="stat-icon violet"><!></span><div><span>Logical library</span><strong> </strong><small>Visible repository content</small></div></article> <article class="surface stat-card"><span class="stat-icon graphite"><!></span><div><span>On disk</span><strong> </strong><small>Physical bytes stored</small></div></article> <article class="surface stat-card"><span class="stat-icon lime"><!></span><div><span>Deduplication</span><strong> </strong><small> </small></div></article></div> <div class="storage-grid"><section class="surface efficiency-card"><div class="section-heading"><div><span class="kicker">Xet efficiency</span><h2>Same library, less disk</h2></div><span> </span></div> <p>Miniface reuses matching content across files and revisions instead of storing it twice.</p> <div class="storage-bars"><div><span><strong>Logical</strong><small> </small></span><i><b style="width:100%"></b></i></div> <div><span><strong>Physical</strong><small> </small></span><i><b class="physical"></b></i></div></div> <div class="savings-note"><span> </span><p><strong>less disk used</strong><small>Compared with storing all logical bytes independently.</small></p></div></section> <section class="surface inventory-card"><div class="section-heading"><div><span class="kicker">Inventory</span><h2>Storage profile</h2></div></div> <dl><div><dt><!>Repositories</dt><dd> </dd></div> <div><dt><!>Ordinary objects</dt><dd> </dd></div> <div><dt><!>Xet objects</dt><dd> </dd></div> <div><dt><!>Profile</dt><dd> </dd></div></dl></section></div>',1),nd=b('<header class="page-header narrow-header"><div><span class="kicker">Local infrastructure</span><h1>Storage</h1><p>Understand what your library contains and how efficiently it fits on disk.</p></div></header> <!>',1),od=(e,t,i)=>t(i(),"endpoint"),ld=b("<!> Copied",1),dd=b("<!> Copy endpoint",1),vd=b('<div class="mini-warning"><!><span><strong>Use a fresh uploader process.</strong> The client reads <code>HF_HUB_DISABLE_XET</code> at import time.</span></div>'),cd=(e,t,i,n)=>t(i(a(n).key),`setting-${a(n).key}`),_d=b("<!> Copied",1),ud=b("<!> Copy",1),fd=b('<article class="surface setup-card"><div class="setup-heading"><span><!></span><div><small> </small><h2> </h2><p> </p></div></div> <!> <div class="code-block"><button class="copy-button"><!></button><pre><code> </code></pre></div></article>'),pd=b('<header class="page-header narrow-header"><div><span class="kicker">Client setup</span><h1>Connect your tools</h1><p>Point Hugging Face clients, Transformers, and training tools at this Miniface server.</p></div></header> <section class="endpoint-hero"><div><span class="endpoint-icon"><!></span><span><small>Server endpoint</small><strong> </strong></span></div> <button class="button inverse"><!></button></section> <div class="settings-layout"><section class="settings-main"></section> <aside class="settings-aside"><section class="surface token-note"><!><h2>Your token stays private</h2><p>Use the administrator token printed on first startup as <code>HF_TOKEN</code>. Miniface never sends it back to this page after sign-in.</p></section> <section class="surface docs-note"><!><h2>Model cards</h2><p>Edit root model cards inside Miniface to avoid public Hugging Face YAML validation.</p></section></aside></div>',1),hd=(e,t)=>t("/models"),md=b('<div class="empty-state"><div class="empty-illustration"><!></div><h2>Page not found</h2><p>This part of Miniface doesn’t exist.</p><button class="button primary">Back to models</button></div>'),gd=b('<div class="toast" role="status"><!> </div>'),bd=b('<a class="skip-link" href="#main-content">Skip to content</a> <div class="app-shell"><aside class="sidebar"><button class="sidebar-brand" aria-label="Miniface models"><!> <span>miniface</span> <small>local</small></button> <nav aria-label="Main navigation"></nav> <div class="sidebar-foot"><div class="server-state"><i></i><span>Local server</span><small>Connected</small></div> <div class="account-row"><div class="avatar"> </div> <div><strong> </strong><small>Administrator</small></div> <button class="icon-button dark" title="Sign out" aria-label="Sign out"><!></button></div></div></aside> <div class="mobile-bar"><button class="mobile-brand" aria-label="Miniface models"><!><span>miniface</span></button> <button class="icon-button" aria-label="Import a model"><!></button></div> <main id="main-content" class="content"><!> <!></main></div> <!>',1);function zd(e,t){ai(t,!1);const i=L(),n=L(),l=L(),u=L(),d=L(),_=L();let N=L(null),M=L(""),W=L(""),G=L(!1),q=L(""),$a=L(!1),S=L("/"),O=L(""),ea=L(null),V=L(""),Ia=L("grid"),B=L("updated"),f=L(null),Y=L("overview"),I=L(""),D=L("Update model card"),Za=L(""),ct=L("success"),le=L("local"),je=L(""),Qa=L(""),st=L("Import local model"),_t=L(""),it=L("success"),zt=L(""),Pt=L(""),rr=L("main"),Ft=L(""),Ht=L(!1),ft=L([]),Ue=L(null),Bt=L(!1),yr=L(""),sr,ir=0,kr="",he=L(null),pt=L("all"),Vt=L(""),wr=L(""),xr=L(!1),Jt=L(""),ya=L(null),nt=L(""),zr=L(""),nr;const vi=[{path:"/models",label:"Models",icon:Os},{path:"/imports",label:"Import",icon:Bs},{path:"/jobs",label:"Activity",icon:Ts},{path:"/storage",label:"Storage",icon:Hs},{path:"/settings",label:"Settings",icon:Bn}],_s=[{label:"Overview",slug:"overview"},{label:"Files",slug:"files"},{label:"Revisions",slug:"revisions"},{label:"Use model",slug:"usage"},{label:"Model card",slug:"model-card"}];Ci(()=>{m(S,location.pathname);const g=localStorage.getItem("miniface:model-view"),P=localStorage.getItem("miniface:model-sort");(g==="grid"||g==="list")&&m(Ia,g),(P==="updated"||P==="name"||P==="size")&&m(B,P);const ra=()=>m(S,location.pathname);addEventListener("popstate",ra),rt.session().then(Pe=>m(N,Pe)).catch(Pe=>m(M,Pe.message));const re=window.setInterval(()=>{var Pe;(Pe=a(N))!=null&&Pe.authenticated&&a(n)==="jobs"&&a(u)>0&&Kr(!1)},4e3);return()=>{removeEventListener("popstate",ra),clearInterval(re),sr&&clearTimeout(sr),nr&&clearTimeout(nr)}});function xe(g,P=!0){location.pathname!==g&&history.pushState({},"",g),m(S,g),P&&requestAnimationFrame(()=>window.scrollTo({top:0,behavior:"smooth"}))}async function us(g){var P;m(O,"");try{const ra=g.split("/").filter(Boolean);if(!ra.length||ra[0]==="models"&&ra.length===1)a(ea)||m(ea,await rt.models());else if(ra[0]==="models"&&ra.length>=3){const re=_s.find(Ke=>Ke.slug===(ra[3]||"overview"));m(Y,(re==null?void 0:re.slug)||"overview");const Pe=`${ra[1]}/${ra[2]}`;if(((P=a(f))==null?void 0:P.model.id)!==Pe){m(f,null);const Ke=await rt.model(ra[1],ra[2]);a(S)===g&&(m(f,Ke),m(I,Ke.card),m(Za,""))}}else ra[0]==="jobs"?await Kr(!1):ra[0]==="storage"&&m(ya,await rt.storage())}catch(ra){m(O,ra instanceof Error?ra.message:"Unable to load this page")}}async function ci(){m($a,!0),m(q,"");try{m(N,await rt.login(a(W))),m(W,"")}catch(g){m(q,g instanceof Error?g.message:"Sign in failed")}finally{m($a,!1)}}function fs(g){m(Ia,g),localStorage.setItem("miniface:model-view",g)}function ps(g){if(g===a(le))return;const P=a(le)==="local"?"Import local model":"Import from Hugging Face";a(st)===P&&m(st,g==="local"?"Import local model":"Import from Hugging Face"),m(le,g),m(_t,""),m(zt,"")}function _i(){sr&&clearTimeout(sr);const g=a(Pt).trim(),P=++ir;m(ft,[]),m(Ue,null),m(yr,""),g.includes("/")&&(!a(Qa)||a(Qa)===kr)&&(m(Qa,g),kr=g),!(g.length<2)&&(sr=setTimeout(async()=>{m(Bt,!0);try{const ra=await rt.searchHuggingFace(g);P===ir&&m(ft,ra)}catch(ra){P===ir&&m(yr,ra instanceof Error?ra.message:"Search failed")}finally{P===ir&&m(Bt,!1)}},250))}function ui(g){const P=kr;m(Pt,g.id),m(Ue,g),m(ft,[]),ir++,(!a(Qa)||a(Qa)===P)&&(m(Qa,g.id),kr=g.id)}async function fi(){var g;if((g=a(N))!=null&&g.csrf_token){m($a,!0),m(_t,""),m(zt,"");try{const P=a(le)==="local"?await rt.importLocal({path:a(je),repo_id:a(Qa),message:a(st)},a(N).csrf_token):await rt.importHuggingFace({source_repo_id:a(Pt),source_revision:a(rr),destination_repo_id:a(Qa),message:a(st),token:a(Ft)},a(N).csrf_token);m(zt,P.job.id),m(_t,`${a(Qa)} is queued and ready to track.`),m(it,"success"),a(le)==="local"?m(je,""):m(Ft,""),m(ea,null),m(he,null)}catch(P){m(_t,P instanceof Error?P.message:"Import failed"),m(it,"error")}finally{m($a,!1)}}}async function Kr(g=!0){g&&m(xr,!0);try{m(he,await rt.jobs())}finally{m(xr,!1)}}async function pi(g){var P,ra;if((P=a(N))!=null&&P.csrf_token){m(Vt,g.id),m(wr,"");try{const re=await rt.cancelJob(g.id,a(N).csrf_token);m(he,((ra=a(he))==null?void 0:ra.map(Pe=>Pe.id===re.id?re:Pe))??null)}catch(re){m(wr,re instanceof Error?re.message:"Unable to cancel job")}finally{m(Vt,"")}}}async function or(g,P){try{await navigator.clipboard.writeText(g),m(nt,P),hs("Copied to clipboard"),window.setTimeout(()=>{a(nt)===P&&m(nt,"")},1800)}catch{hs("Clipboard access is unavailable")}}function hs(g){m(zr,g),nr&&clearTimeout(nr),nr=setTimeout(()=>m(zr,""),2200)}function Kt(){return location.origin}function ms(g){return g==="env"?`export HF_ENDPOINT=${Kt()}
export HF_TOKEN=mf_your_administrator_token`:g==="download"?`export HF_ENDPOINT=${Kt()}
export HF_TOKEN=mf_your_administrator_token

hf download owner/model`:`export HF_ENDPOINT=${Kt()}
export HF_TOKEN=mf_your_administrator_token
export HF_HUB_DISABLE_XET=1

hf upload owner/model ./output --exclude README.md`}function gs(g){if(!a(f))return"";const P=`${a(f).model.owner}/${a(f).model.name}`,ra=a(f).model.sha,re=Kt();return g==="env"?`export HF_ENDPOINT=${re}
export HF_TOKEN=mf_your_administrator_token`:g==="hf"?`HF_ENDPOINT=${re} HF_TOKEN=mf_your_administrator_token hf download ${P} --revision ${ra}`:g==="transformers"?`import os
os.environ["HF_ENDPOINT"] = "${re}"
os.environ["HF_TOKEN"] = "mf_your_administrator_token"
from transformers import AutoModelForCausalLM, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("${P}", revision="${ra}")
model = AutoModelForCausalLM.from_pretrained("${P}", revision="${ra}", trust_remote_code=False)`:g==="unsloth"&&a(f).model.kind==="adapter"&&a(f).model.base_model&&a(f).model.base_revision?`import os
os.environ["HF_ENDPOINT"] = "${re}"
os.environ["HF_TOKEN"] = "mf_your_administrator_token"
from unsloth import FastLanguageModel
from peft import PeftModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="${a(f).model.base_model}", revision="${a(f).model.base_revision}",
    use_exact_model_name=True, fast_inference=False,
)
model = PeftModel.from_pretrained(model, "${P}", revision="${ra}")`:g==="unsloth"?`import os
os.environ["HF_ENDPOINT"] = "${re}"
os.environ["HF_TOKEN"] = "mf_your_administrator_token"
from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="${P}", revision="${ra}",
    use_exact_model_name=True, fast_inference=False,
)`:""}function Wt(g){return g.state==="queued"||g.state==="running"}function hi(g){return g==="completed"?"success":g==="failed"?"danger":g==="canceled"?"muted":"info"}function Nr(g){return g.replaceAll("_"," ").replace(/\b\w/g,P=>P.toUpperCase())}function mi(g){return new Intl.NumberFormat(void 0,{notation:"compact",maximumFractionDigits:1}).format(g)}Dt(()=>a(S),()=>{m(i,a(S).split("/").filter(Boolean))}),Dt(()=>a(i),()=>{m(n,a(i)[0]||"models")}),Dt(()=>(a(ea),a(V),a(B)),()=>{m(l,(a(ea)??[]).filter(g=>`${g.owner}/${g.name} ${g.kind} ${g.architecture} ${g.quantization}`.toLowerCase().includes(a(V).trim().toLowerCase())).sort((g,P)=>a(B)==="name"?`${g.owner}/${g.name}`.localeCompare(`${P.owner}/${P.name}`):a(B)==="size"?P.logical_bytes-g.logical_bytes:new Date(P.updated_at).valueOf()-new Date(g.updated_at).valueOf()))}),Dt(()=>a(he),()=>{m(u,(a(he)??[]).filter(Wt).length)}),Dt(()=>a(he),()=>{m(d,(a(he)??[]).filter(g=>g.state==="completed").length)}),Dt(()=>(a(he),a(pt)),()=>{m(_,(a(he)??[]).filter(g=>a(pt)==="active"?Wt(g):a(pt)==="completed"?!Wt(g):!0))}),Dt(()=>(a(N),a(S)),()=>{var g;(g=a(N))!=null&&g.authenticated&&us(a(S))}),pn(),Js();var bs=z();Ii(g=>{var P=Zn();hn.title="Miniface · Your models, close at hand",v(g,P)});var gi=$(bs);{var bi=g=>{var P=eo(),ra=s(P),re=s(ra);gr(re,{size:44}),w(),r(ra);var Pe=o(ra,2);{var Ke=qe=>{var We=jn(),ot=$(We);Pr(ot,{size:24});var Mt=o(ot,2),ht=s(Mt,!0);r(Mt);var Xt=o(Mt,2);Xt.__click=[Qn],T(()=>h(ht,a(M))),v(qe,We)},Nt=qe=>{var We=ao(),ot=$(We);vt(ot,{class:"spin",size:22}),w(2),v(qe,We)};y(Pe,qe=>{a(M)?qe(Ke):qe(Nt,!1)})}r(P),v(g,P)},$i=g=>{var P=z(),ra=$(P);{var re=Ke=>{var Nt=no(),qe=s(Nt),We=s(qe),ot=s(We);gr(ot,{size:44}),w(),r(We);var Mt=o(We,4),ht=s(Mt),Xt=s(ht);mr(Xt,{size:17}),w(),r(ht);var Gt=o(ht,2),lr=s(Gt);Is(lr,{size:17}),w(),r(Gt);var Mr=o(Gt,2),dr=s(Mr);is(dr,{size:17}),w(),r(Mr),r(Mt),r(qe);var vr=o(qe,2),Sr=s(vr),Lt=s(Sr),Wr=s(Lt);gr(Wr,{size:42}),r(Lt);var St=o(Lt,8),At=o(s(St),2),Ar=s(At);Ls(Ar,{size:17});var Et=o(Ar,2);wt(Et);var Yt=o(Et,2);Yt.__click=[to,G];var Er=s(Yt);{var Tr=Z=>{Ps(Z,{size:17})},Xr=Z=>{Fs(Z,{size:17})};y(Er,Z=>{a(G)?Z(Tr):Z(Xr,!1)})}r(Yt),r(At);var Cr=o(At,2);{var Gr=Z=>{var ce=ro(),ja=s(ce);pr(ja,{size:16});var ze=o(ja,1,!0);r(ce),T(()=>h(ze,a(q))),v(Z,ce)};y(Cr,Z=>{a(q)&&Z(Gr)})}var cr=o(Cr,2),Yr=s(cr);{var Zr=Z=>{var ce=so(),ja=$(ce);vt(ja,{class:"spin",size:16}),w(),v(Z,ce)},Xa=Z=>{var ce=io(),ja=o($(ce));Rt(ja,{size:16}),v(Z,ce)};y(Yr,Z=>{a($a)?Z(Zr):Z(Xa,!1)})}r(cr),r(St);var Ua=o(St,2),Fe=s(Ua);mr(Fe,{size:14}),w(),r(Ua),r(Sr),r(vr),r(Nt),T(()=>{Ka(Et,"type",a(G)?"text":"password"),Ka(Yt,"aria-label",a(G)?"Hide token":"Show token"),cr.disabled=a($a)}),ys("submit",St,Z=>{Z.preventDefault(),ci()}),xt(Et,()=>a(W),Z=>m(W,Z)),v(Ke,Nt)},Pe=Ke=>{var Nt=bd(),qe=o($(Nt),2),We=s(qe),ot=s(We);ot.__click=[oo,xe];var Mt=s(ot);gr(Mt,{size:36}),w(4),r(ot);var ht=o(ot,2);tt(ht,5,()=>vi,et,(Xa,Ua)=>{const Fe=Rr(()=>(a(Ua),c(()=>a(Ua).icon)));var Z=vo();Z.__click=[lo,xe,Ua];let ce;var ja=s(Z);a(Fe)(ja,{size:18,strokeWidth:1.9});var ze=o(ja,2),Tt=s(ze,!0);r(ze),r(Z),T((mt,Ot)=>{Ka(Z,"aria-current",mt),ce=oe(Z,1,"",null,ce,Ot),h(Tt,(a(Ua),c(()=>a(Ua).label)))},[()=>(a(n),a(Ua),c(()=>a(n)===a(Ua).path.slice(1)?"page":void 0)),()=>({active:a(n)===a(Ua).path.slice(1)})]),v(Xa,Z)}),r(ht);var Xt=o(ht,2),Gt=o(s(Xt),2),lr=s(Gt),Mr=s(lr,!0);r(lr);var dr=o(lr,2),vr=s(dr),Sr=s(vr,!0);r(vr),w(),r(dr);var Lt=o(dr,2);Lt.__click=[Xn,N,ea,f,he];var Wr=s(Lt);Un(Wr,{size:17}),r(Lt),r(Gt),r(Xt),r(We);var St=o(We,2),At=s(St);At.__click=[co,xe];var Ar=s(At);gr(Ar,{size:30}),w(),r(At);var Et=o(At,2);Et.__click=[_o,xe];var Yt=s(Et);Hr(Yt,{size:18}),r(Et),r(St);var Er=o(St,2),Tr=s(Er);{var Xr=Xa=>{var Ua=fo(),Fe=s(Ua);Pr(Fe,{size:19});var Z=o(Fe,2),ce=o(s(Z)),ja=s(ce,!0);r(ce),r(Z);var ze=o(Z,2);ze.__click=[uo,us,S],r(Ua),T(()=>h(ja,a(O))),v(Xa,Ua)};y(Tr,Xa=>{a(O)&&Xa(Xr)})}var Cr=o(Tr,2);{var Gr=Xa=>{var Ua=Po(),Fe=$(Ua),Z=o(s(Fe),2);Z.__click=[po,xe];var ce=s(Z);Hr(ce,{size:17}),w(),r(Z),r(Fe);var ja=o(Fe,2),ze=s(ja),Tt=s(ze);Ds(Tt,{size:18});var mt=o(Tt,2);wt(mt);var Ot=o(mt,2);{var He=fa=>{var Sa=mo();Sa.__click=[ho,V];var qa=s(Sa);Vs(qa,{size:15}),r(Sa),v(fa,Sa)};y(Ot,fa=>{a(V)&&fa(He)})}r(ze);var Le=o(ze,2),Oe=s(Le),gt=s(Oe);r(Oe);var Xe=o(Oe,2),ae=s(Xe);T(()=>{a(B),mn(()=>{})}),ae.__change=[Gn,B];var Ne=s(ae);Ne.value=Ne.__value="updated";var Be=o(Ne);Be.value=Be.__value="name";var Ve=o(Be);Ve.value=Ve.__value="size",r(ae),r(Xe);var Me=o(Xe,2),Ga=s(Me);Ga.__click=[go,fs];let De;var Ge=s(Ga);Dn(Ge,{size:16}),r(Ga);var Se=o(Ga,2);Se.__click=[bo,fs];let Ae;var va=s(Se);Rn(va,{size:17}),r(Se),r(Me),r(Le),r(ja);var za=o(ja,2);{var Ha=fa=>{var Sa=$o(),qa=s(Sa);vt(qa,{class:"spin",size:24}),w(),r(Sa),v(fa,Sa)},de=fa=>{var Sa=z(),qa=$(Sa);{var _e=La=>{var Va=zo(),ke=s(Va),me=s(ke);Us(me,{size:29}),r(ke);var we=o(ke,2),ee=s(we,!0);r(we);var Oa=o(we,2),ca=s(Oa,!0);r(Oa);var k=o(Oa,2);{var F=K=>{var x=ko();x.__click=[yo,V],v(K,x)},Aa=K=>{var x=xo();x.__click=[wo,xe];var _a=s(x);Hr(_a,{size:16}),w(),r(x),v(K,x)};y(k,K=>{a(V)?K(F):K(Aa,!1)})}r(Va),T(()=>{h(ee,a(V)?"No models found":"A fresh place for your models"),h(ca,a(V)?"Try a model name, owner, type, or architecture.":"Import a folder from this machine or mirror a repository from Hugging Face.")}),v(La,Va)},ye=La=>{var Va=z(),ke=$(Va);{var me=ee=>{var Oa=Eo();tt(Oa,5,()=>a(l),et,(ca,k)=>{var F=Ao();F.__click=[No,xe,k];var Aa=s(F),K=s(Aa),x=s(K);ss(x,{size:20}),w(),r(K);var _a=o(K,2);r(Aa);var Ca=o(Aa,2),Pa=s(Ca),te=s(Pa,!0);r(Pa);var ga=o(Pa,2),Ba=s(ga,!0);r(ga),r(Ca);var ua=o(Ca,2),ka=s(ua,!0);r(ua);var ba=o(ua,2),pa=s(ba),C=s(pa,!0);r(pa);var A=o(pa,2);{var J=xa=>{var U=Mo(),Fa=s(U,!0);r(U),T(()=>h(Fa,(a(k),c(()=>a(k).quantization)))),v(xa,U)};y(A,xa=>{a(k),c(()=>a(k).quantization)&&xa(J)})}var Q=o(A,2),Ea=s(Q,!0);r(Q),r(ba);var na=o(ba,2);{var Na=xa=>{var U=So(),Fa=s(U);is(Fa,{size:14});var Da=o(Fa);r(U),T(()=>h(Da,` Based on ${a(k),c(()=>a(k).base_model)??""}`)),v(xa,U)};y(na,xa=>{a(k),c(()=>a(k).base_model)&&xa(Na)})}var wa=o(na,2),Ma=s(wa),H=o(s(Ma)),oa=s(H,!0);r(H),r(Ma);var X=o(Ma,2),p=o(s(X)),j=s(p,!0);r(p),r(X);var Ta=o(X,2),ue=o(s(Ta)),se=s(ue),fe=s(se,!0);r(se),r(ue),r(Ta),r(wa);var ve=o(wa,2),Ee=s(ve),R=s(Ee);r(Ee);var la=o(Ee);Rt(la,{size:16}),r(ve),r(F),T((xa,U,Fa)=>{oe(_a,1,(a(k),c(()=>`status-dot ${a(k).validation_status==="valid"?"success":"warning"}`))),Ka(_a,"title",(a(k),c(()=>a(k).validation_status))),h(te,(a(k),c(()=>a(k).owner))),h(Ba,(a(k),c(()=>a(k).name))),h(ka,(a(k),c(()=>a(k).architecture||"Architecture not detected"))),h(C,(a(k),c(()=>a(k).kind||"unknown"))),oe(Q,1,(a(k),c(()=>`badge status-${a(k).validation_status==="valid"?"success":"warning"}`))),h(Ea,(a(k),c(()=>a(k).validation_status))),h(oa,xa),h(j,(a(k),c(()=>a(k).file_count))),h(fe,U),h(R,`Updated ${Fa??""}`)},[()=>(ma(Ja),a(k),c(()=>Ja(a(k).logical_bytes))),()=>(ma(Je),a(k),c(()=>Je(a(k).sha))),()=>(ma(jt),a(k),c(()=>jt(a(k).updated_at)))]),v(ca,F)}),r(Oa),v(ee,Oa)},we=ee=>{var Oa=Io(),ca=o(s(Oa),2);tt(ca,1,()=>a(l),et,(k,F)=>{var Aa=Co();Aa.__click=[To,xe,F];var K=s(Aa),x=s(K),_a=s(x);ss(_a,{size:18}),r(x);var Ca=o(x),Pa=s(Ca),te=s(Pa);r(Pa);var ga=o(Pa),Ba=s(ga),ua=o(Ba),ka=s(ua,!0);r(ua),r(ga),r(Ca),r(K);var ba=o(K,2),pa=s(ba),C=s(pa,!0);r(pa),r(ba);var A=o(ba,2),J=s(A,!0);r(A);var Q=o(A,2),Ea=s(Q,!0);r(Q);var na=o(Q,2),Na=s(na);Rt(Na,{size:16}),r(na),r(Aa),T((wa,Ma,H)=>{h(te,`${a(F),c(()=>a(F).owner)??""}/${a(F),c(()=>a(F).name)??""}`),h(Ba,`${a(F),c(()=>a(F).architecture||"Architecture not detected")??""} · `),h(ka,wa),h(C,(a(F),c(()=>a(F).kind||"unknown"))),h(J,Ma),h(Ea,H)},[()=>(ma(Je),a(F),c(()=>Je(a(F).sha))),()=>(ma(Ja),a(F),c(()=>Ja(a(F).logical_bytes))),()=>(ma(jt),a(F),c(()=>jt(a(F).updated_at)))]),v(k,Aa)}),r(Oa),v(ee,Oa)};y(ke,ee=>{a(Ia)==="grid"?ee(me):ee(we,!1)},!0)}v(La,Va)};y(qa,La=>{a(l),c(()=>!a(l).length)?La(_e):La(ye,!1)},!0)}v(fa,Sa)};y(za,fa=>{a(ea)?fa(de,!1):fa(Ha)})}T((fa,Sa)=>{h(gt,`${a(l),c(()=>a(l).length)??""} ${a(l),c(()=>a(l).length===1?"model":"models")??""}`),Ka(Ga,"aria-pressed",a(Ia)==="grid"),De=oe(Ga,1,"",null,De,fa),Ka(Se,"aria-pressed",a(Ia)==="list"),Ae=oe(Se,1,"",null,Ae,Sa)},[()=>({active:a(Ia)==="grid"}),()=>({active:a(Ia)==="list"})]),xt(mt,()=>a(V),fa=>m(V,fa)),Nn(ae,()=>a(B),fa=>m(B,fa)),v(Xa,Ua)},cr=Xa=>{var Ua=z(),Fe=$(Ua);{var Z=ja=>{var ze=z(),Tt=$(ze);{var mt=He=>{var Le=Fo(),Oe=s(Le);vt(Oe,{class:"spin",size:24}),w(),r(Le),v(He,Le)},Ot=He=>{var Le=gl(),Oe=$(Le);Oe.__click=[Ho,xe];var gt=s(Oe);In(gt,{size:15}),w(),r(Oe);var Xe=o(Oe,2),ae=s(Xe),Ne=s(ae),Be=s(Ne);ss(Be,{size:24}),r(Ne);var Ve=o(Ne,2),Me=s(Ve),Ga=s(Me),De=s(Ga,!0);r(Ga);var Ge=o(Ga,2),Se=s(Ge,!0);r(Ge),r(Me);var Ae=o(Me,2),va=s(Ae),za=s(va);r(va);var Ha=o(va,1,!0);r(Ae);var de=o(Ae,2),fa=s(de);r(de),r(Ve),r(ae);var Sa=o(ae,2),qa=s(Sa);qa.__click=[Lo,or,f];var _e=s(qa);{var ye=ca=>{var k=Oo(),F=$(k);fr(F,{size:15}),w(),v(ca,k)},La=ca=>{var k=Do(),F=$(k);hr(F,{size:15});var Aa=o(F,2),K=s(Aa,!0);r(Aa),T(x=>h(K,x),[()=>(ma(Je),a(f),c(()=>Je(a(f).model.sha)))]),v(ca,k)};y(_e,ca=>{a(nt)==="revision"?ca(ye):ca(La,!1)})}r(qa);var Va=o(qa,2);Va.__click=[Ro,xe,i];var ke=s(Va);Fn(ke,{size:16}),w(),r(Va),r(Sa),r(Xe);var me=o(Xe,2);tt(me,5,()=>_s,et,(ca,k)=>{var F=qo();F.__click=[Uo,xe,i,k];let Aa;var K=s(F,!0);r(F),T(x=>{Ka(F,"aria-selected",(a(Y),a(k),c(()=>a(Y)===a(k).slug))),Aa=oe(F,1,"",null,Aa,x),h(K,(a(k),c(()=>a(k).label)))},[()=>({active:a(Y)===a(k).slug})]),v(ca,F)}),r(me);var we=o(me,2);{var ee=ca=>{var k=rl(),F=$(k);{var Aa=R=>{var la=Bo(),xa=s(la);qs(xa,{size:18}),w(),r(la),v(R,la)};y(F,R=>{a(f),c(()=>a(f).model.kind==="adapter"&&a(f).model.base_model&&!a(f).model.base_revision)&&R(Aa)})}var K=o(F,2),x=s(K),_a=s(x),Ca=o(s(_a));Ca.__click=[Vo,xe,i];var Pa=o(s(Ca));Rt(Pa,{size:14}),r(Ca),r(_a);var te=o(_a,2);{var ga=R=>{var la=Zo();tt(la,5,()=>(a(f),c(()=>a(f).card.split(`
`))),et,(xa,U)=>{var Fa=z(),Da=$(Fa);{var ie=be=>{var E=Jo(),Ra=s(E,!0);r(E),T(Te=>h(Ra,Te),[()=>(a(U),c(()=>a(U).slice(4)))]),v(be,E)},ge=be=>{var E=z(),Ra=$(E);{var Te=pe=>{var $e=Ko(),Ce=s($e,!0);r($e),T(bt=>h(Ce,bt),[()=>(a(U),c(()=>a(U).slice(3)))]),v(pe,$e)},Ya=pe=>{var $e=z(),Ce=$($e);{var bt=Ye=>{var Ze=Wo(),lt=s(Ze,!0);r(Ze),T(yt=>h(lt,yt),[()=>(a(U),c(()=>a(U).slice(2)))]),v(Ye,Ze)},$t=Ye=>{var Ze=z(),lt=$(Ze);{var yt=dt=>{var da=Xo(),ha=s(da,!0);r(da),T(ne=>h(ha,ne),[()=>(a(U),c(()=>a(U).slice(2)))]),v(dt,da)},kt=dt=>{var da=z(),ha=$(da);{var ne=Re=>{var Ie=Go(),Ir=s(Ie,!0);r(Ie),T(()=>h(Ir,a(U))),v(Re,Ie)},Qe=Re=>{var Ie=Yo();v(Re,Ie)};y(ha,Re=>{a(U),c(()=>a(U).trim())?Re(ne):Re(Qe,!1)},!0)}v(dt,da)};y(lt,dt=>{a(U),c(()=>a(U).startsWith("- "))?dt(yt):dt(kt,!1)},!0)}v(Ye,Ze)};y(Ce,Ye=>{a(U),c(()=>a(U).startsWith("# "))?Ye(bt):Ye($t,!1)},!0)}v(pe,$e)};y(Ra,pe=>{a(U),c(()=>a(U).startsWith("## "))?pe(Te):pe(Ya,!1)},!0)}v(be,E)};y(Da,be=>{a(U),c(()=>a(U).startsWith("### "))?be(ie):be(ge,!1)})}v(xa,Fa)}),r(la),v(R,la)},Ba=R=>{var la=Qo(),xa=s(la);Fr(xa,{size:22}),w(),r(la),v(R,la)};y(te,R=>{a(f),c(()=>a(f).card)?R(ga):R(Ba,!1)})}r(x);var ua=o(x,2),ka=s(ua),ba=o(s(ka),2),pa=s(ba),C=o(s(pa)),A=s(C,!0);r(C),r(pa);var J=o(pa,2),Q=o(s(J)),Ea=s(Q,!0);r(Q),r(J);var na=o(J,2),Na=o(s(na)),wa=s(Na,!0);r(Na),r(na);var Ma=o(na,2),H=o(s(Ma)),oa=s(H),X=s(oa,!0);r(oa),r(H),r(Ma);var p=o(Ma,2);{var j=R=>{var la=al(),xa=o(s(la)),U=s(xa,!0),Fa=o(U);{var Da=ie=>{var ge=jo(),be=s(ge);r(ge),T(E=>h(be,`@${E??""}`),[()=>(ma(Je),a(f),c(()=>Je(a(f).model.base_revision)))]),v(ie,ge)};y(Fa,ie=>{a(f),c(()=>a(f).model.base_revision)&&ie(Da)})}r(xa),r(la),T(()=>h(U,(a(f),c(()=>a(f).model.base_model)))),v(R,la)};y(p,R=>{a(f),c(()=>a(f).model.base_model)&&R(j)})}var Ta=o(p,2);{var ue=R=>{var la=el(),xa=o(s(la)),U=s(xa),Fa=o(U),Da=s(Fa);r(Fa),r(xa),r(la),T(ie=>{h(U,`${a(f),c(()=>a(f).model.source_repository)??""} `),h(Da,`@${ie??""}`)},[()=>(ma(Je),a(f),c(()=>Je(a(f).model.source_revision)))]),v(R,la)};y(Ta,R=>{a(f),c(()=>a(f).model.source_repository)&&R(ue)})}r(ba),r(ka);var se=o(ka,2);se.__click=[tl,xe,i];var fe=s(se),ve=s(fe);Vn(ve,{size:20}),w(),r(fe);var Ee=o(fe);Rt(Ee,{size:17}),r(se),r(ua),r(K),T((R,la)=>{h(A,(a(f),c(()=>a(f).model.architecture||"Unknown"))),h(Ea,(a(f),c(()=>a(f).model.quantization||"None detected"))),h(wa,R),h(X,la)},[()=>(ma(Lr),a(f),c(()=>Lr(a(f).model.updated_at))),()=>(ma(Je),a(f),c(()=>Je(a(f).model.sha)))]),v(ca,k)},Oa=ca=>{var k=z(),F=$(k);{var Aa=x=>{var _a=il(),Ca=s(_a),Pa=o(s(Ca)),te=s(Pa);r(Pa),r(Ca);var ga=o(Ca,2),Ba=o(s(ga),2);tt(Ba,1,()=>(a(f),c(()=>a(f).files)),et,(ua,ka)=>{var ba=sl(),pa=s(ba),C=s(pa);Fr(C,{size:16});var A=o(C,1,!0);r(pa);var J=o(pa),Q=s(J),Ea=s(Q,!0);r(Q),r(J);var na=o(J),Na=s(na,!0);r(na),r(ba),T(wa=>{h(A,(a(ka),c(()=>a(ka).path))),h(Ea,(a(ka),c(()=>a(ka).xet_hash?"Xet":a(ka).kind))),h(Na,wa)},[()=>(ma(Ja),a(ka),c(()=>Ja(a(ka).size)))]),v(ua,ba)}),r(ga),r(_a),T(ua=>h(te,`${a(f),c(()=>a(f).files.length)??""} entries · ${ua??""}`),[()=>(ma(Ja),a(f),c(()=>Ja(a(f).files.reduce((ua,ka)=>ua+ka.size,0))))]),v(x,_a)},K=x=>{var _a=z(),Ca=$(_a);{var Pa=ga=>{var Ba=dl(),ua=s(Ba),ka=o(s(ua)),ba=s(ka);r(ka),r(ua);var pa=o(ua,2);tt(pa,5,()=>(a(f),c(()=>a(f).revisions)),et,(C,A,J)=>{var Q=ll(),Ea=s(Q),na=s(Ea);is(na,{size:16}),r(Ea);var Na=o(Ea,2),wa=s(Na),Ma=s(wa),H=s(Ma,!0);r(Ma);var oa=o(Ma);{var X=R=>{var la=nl();v(R,la)};y(oa,R=>{J===0&&R(X)})}r(wa);var p=o(wa,2),j=s(p);r(p);var Ta=o(p,2);Ta.__click=[ol,or,A];var ue=s(Ta),se=s(ue,!0);r(ue);var fe=o(ue);{var ve=R=>{fr(R,{size:14})},Ee=R=>{hr(R,{size:14})};y(fe,R=>{a(nt),a(A),c(()=>a(nt)===`revision-${a(A).oid}`)?R(ve):R(Ee,!1)})}r(Ta),r(Na),r(Q),T(R=>{h(H,(a(A),c(()=>a(A).message||"Untitled revision"))),h(j,`${a(A),c(()=>a(A).author)??""} · ${R??""} · ${a(A),c(()=>a(A).file_count)??""} files`),h(se,(a(A),c(()=>a(A).oid)))},[()=>(ma(Lr),a(A),c(()=>Lr(a(A).created_at)))]),v(C,Q)}),r(pa),r(Ba),T(()=>h(ba,`${a(f),c(()=>a(f).revisions.length)??""} total`)),v(ga,Ba)},te=ga=>{var Ba=z(),ua=$(Ba);{var ka=pa=>{var C=fl(),A=$(C),J=s(A);On(J,{size:18});var Q=o(J),Ea=o(s(Q)),na=o(s(Ea),3),Na=s(na,!0);r(na),w(),r(Ea),r(Q),r(A);var wa=o(A,2);tt(wa,5,()=>(a(f),c(()=>[{title:"Environment",description:"Use once per shell",key:"env"},{title:"HF CLI",description:"Download the pinned snapshot",key:"hf"},{title:"Transformers",description:"Load with the Python client",key:"transformers"},{title:"Unsloth",description:a(f).model.kind==="adapter"?"Load base and adapter together":"Load for local training",key:"unsloth"}])),et,(Ma,H)=>{var oa=ul();let X;var p=s(oa),j=s(p),Ta=s(j),ue=s(Ta,!0);r(Ta);var se=o(Ta),fe=s(se,!0);r(se),r(j);var ve=o(j);ve.__click=[vl,or,gs,H];var Ee=s(ve);{var R=Da=>{var ie=cl(),ge=$(ie);fr(ge,{size:14}),w(),v(Da,ie)},la=Da=>{var ie=_l(),ge=$(ie);hr(ge,{size:14}),w(),v(Da,ie)};y(Ee,Da=>{a(nt),a(H),c(()=>a(nt)===`usage-${a(H).key}`)?Da(R):Da(la,!1)})}r(ve),r(p);var xa=o(p,2),U=s(xa),Fa=s(U,!0);r(U),r(xa),r(oa),T((Da,ie)=>{X=oe(oa,1,"code-card",null,X,Da),h(ue,(a(H),c(()=>a(H).title))),h(fe,(a(H),c(()=>a(H).description))),Ka(ve,"aria-label",(a(H),c(()=>`Copy ${a(H).title} example`))),h(Fa,ie)},[()=>({"wide-code":a(H).key==="transformers"||a(H).key==="unsloth"}),()=>(a(H),c(()=>gs(a(H).key)))]),v(Ma,oa)}),r(wa),T(Ma=>h(Na,Ma),[()=>(ma(Je),a(f),c(()=>Je(a(f).model.sha)))]),v(pa,C)},ba=pa=>{var C=ml(),A=s(C),J=o(s(A),6);gn(J);var Q=o(J,4);wt(Q);var Ea=o(Q,2);{var na=X=>{var p=pl(),j=s(p);Ut(j,{size:16});var Ta=o(j,1,!0);r(p),T(()=>{oe(p,1,`inline-alert ${a(ct)}`),h(Ta,a(Za))}),v(X,p)};y(Ea,X=>{a(Za)&&X(na)})}var Na=o(Ea,2),wa=o(s(Na));wa.__click=[Yn,N,f,$a,Za,I,D,ct];var Ma=s(wa);{var H=X=>{var p=hl(),j=$(p);vt(j,{class:"spin",size:16}),w(),v(X,p)},oa=X=>{var p=zs("Save model card");v(X,p)};y(Ma,X=>{a($a)?X(H):X(oa,!1)})}r(wa),r(Na),r(A),r(C),T(()=>wa.disabled=a($a)),xt(J,()=>a(I),X=>m(I,X)),xt(Q,()=>a(D),X=>m(D,X)),v(pa,C)};y(ua,pa=>{a(Y)==="usage"?pa(ka):pa(ba,!1)},!0)}v(ga,Ba)};y(Ca,ga=>{a(Y)==="revisions"?ga(Pa):ga(te,!1)},!0)}v(x,_a)};y(F,x=>{a(Y)==="files"?x(Aa):x(K,!1)},!0)}v(ca,k)};y(we,ca=>{a(Y)==="overview"?ca(ee):ca(Oa,!1)})}T(ca=>{h(De,(a(f),c(()=>a(f).model.kind||"unknown"))),oe(Ge,1,(a(f),c(()=>`badge status-${a(f).model.validation_status==="valid"?"success":"warning"}`))),h(Se,(a(f),c(()=>a(f).model.validation_status))),h(za,`${a(f),c(()=>a(f).model.owner)??""}/`),h(Ha,(a(f),c(()=>a(f).model.name))),h(fa,`${a(f),c(()=>a(f).model.architecture||"Unknown architecture")??""} · ${ca??""} · ${a(f),c(()=>a(f).model.file_count)??""} files`)},[()=>(ma(Ja),a(f),c(()=>Ja(a(f).model.logical_bytes)))]),v(He,Le)};y(Tt,He=>{a(f)?He(Ot,!1):He(mt)})}v(ja,ze)},ce=ja=>{var ze=z(),Tt=$(ze);{var mt=He=>{var Le=Hl(),Oe=o($(Le),2),gt=s(Oe),Xe=s(gt),ae=s(Xe);ae.__click=[bl,ps];let Ne;var Be=s(ae),Ve=s(Be);Hn(Ve,{size:21}),r(Be),w(4),r(ae);var Me=o(ae,2);Me.__click=[$l,ps];let Ga;var De=s(Me),Ge=s(De);Cs(Ge,{size:21}),r(De),w(4),r(Me),r(Xe);var Se=o(Xe,2),Ae=s(Se),va=s(Ae),za=o(s(va)),Ha=o(s(za)),de=s(Ha,!0);r(Ha),r(za),r(va),r(Ae);var fa=o(Ae,2),Sa=s(fa);{var qa=C=>{var A=yl(),J=o(s(A),2);wt(J),w(2),r(A),xt(J,()=>a(je),Q=>m(je,Q)),v(C,A)},_e=C=>{var A=El(),J=$(A),Q=o(s(J),2),Ea=s(Q),na=s(Ea);Ds(na,{size:17});var Na=o(na);wt(Na),Na.__input=[kl,Pt,_i];var wa=o(Na);{var Ma=E=>{vt(E,{class:"spin field-loader",size:16})};y(wa,E=>{a(Bt)&&E(Ma)})}r(Ea);var H=o(Ea,2);{var oa=E=>{var Ra=zl();tt(Ra,5,()=>a(ft),et,(Te,Ya)=>{var pe=xl();pe.__click=[wl,ui,Ya];var $e=s(pe),Ce=s($e),bt=s(Ce,!0);r(Ce);var $t=o(Ce),Ye=s($t);r($t),r($e);var Ze=o($e,2),lt=s(Ze),yt=s(lt,!0);r(lt);var kt=o(lt);let dt;var da=s(kt,!0);r(kt),r(Ze),r(pe),T((ha,ne,Qe)=>{h(bt,(a(Ya),c(()=>a(Ya).id))),h(Ye,`${a(Ya),c(()=>a(Ya).pipeline_tag||"Model")??""} · ${ha??""} downloads`),h(yt,ne),dt=oe(kt,1,"",null,dt,Qe),h(da,(a(Ya),c(()=>a(Ya).gated?"Token required":"Public")))},[()=>(a(Ya),c(()=>mi(a(Ya).downloads))),()=>(a(Ya),ma(Ja),c(()=>a(Ya).size_bytes===void 0?"Size unavailable":`≈ ${Ja(a(Ya).size_bytes)}`)),()=>({restricted:a(Ya).gated})]),v(Te,pe)}),r(Ra),v(E,Ra)};y(H,E=>{a(ft),c(()=>a(ft).length)&&E(oa)})}r(Q),w(2),r(J);var X=o(J,2);{var p=E=>{var Ra=Nl(),Te=s(Ra);mr(Te,{size:17}),w(),r(Ra),v(E,Ra)},j=E=>{var Ra=z(),Te=$(Ra);{var Ya=pe=>{var $e=Ml(),Ce=s($e);Ut(Ce,{size:17}),w(),r($e),v(pe,$e)};y(Te,pe=>{a(Ue)&&pe(Ya)},!0)}v(E,Ra)};y(X,E=>{a(Ue),c(()=>{var Ra;return(Ra=a(Ue))==null?void 0:Ra.gated})?E(p):E(j,!1)})}var Ta=o(X,2);{var ue=E=>{var Ra=Sl(),Te=s(Ra);pr(Te,{size:16});var Ya=o(Te,1,!0);r(Ra),T(()=>h(Ya,a(yr))),v(E,Ra)};y(Ta,E=>{a(yr)&&E(ue)})}var se=o(Ta,2),fe=s(se),ve=o(s(fe),2);wt(ve),w(2),r(fe);var Ee=o(fe,2),R=s(Ee),la=o(s(R)),xa=s(la,!0);r(la),r(R);var U=o(R,2),Fa=s(U);wt(Fa);var Da=o(Fa);Da.__click=[Al,Ht];var ie=s(Da);{var ge=E=>{Ps(E,{size:17})},be=E=>{Fs(E,{size:17})};y(ie,E=>{a(Ht)?E(ge):E(be,!1)})}r(Da),r(U),w(2),r(Ee),r(se),T(()=>{Mn(Na,a(Pt)),oe(la,1,ii((a(Ue),c(()=>{var E;return(E=a(Ue))!=null&&E.gated?"required-label":"optional-label"})))),h(xa,(a(Ue),c(()=>{var E;return(E=a(Ue))!=null&&E.gated?"required":"optional"}))),Ka(Fa,"type",a(Ht)?"text":"password"),Fa.required=(a(Ue),c(()=>{var E;return((E=a(Ue))==null?void 0:E.gated)===!0})),Ka(Da,"aria-label",a(Ht)?"Hide token":"Show token")}),xt(ve,()=>a(rr),E=>m(rr,E)),xt(Fa,()=>a(Ft),E=>m(Ft,E)),v(C,A)};y(Sa,C=>{a(le)==="local"?C(qa):C(_e,!1)})}var ye=o(Sa,6),La=o(s(ye),2);wt(La),w(2),r(ye);var Va=o(ye,2),ke=o(s(Va),2);wt(ke),r(Va);var me=o(Va,2);{var we=C=>{var A=Il(),J=s(A);{var Q=p=>{Ut(p,{size:19})},Ea=p=>{pr(p,{size:19})};y(J,p=>{a(it)==="success"?p(Q):p(Ea,!1)})}var na=o(J,2),Na=s(na),wa=s(Na,!0);r(Na);var Ma=o(Na),H=s(Ma,!0);r(Ma),r(na);var oa=o(na,2);{var X=p=>{var j=Cl();j.__click=[Tl,xe];var Ta=o(s(j));Rt(Ta,{size:14}),r(j),v(p,j)};y(oa,p=>{a(zt)&&p(X)})}r(A),T(()=>{oe(A,1,`import-feedback ${a(it)}`),h(wa,a(it)==="success"?"Import queued":"Couldn’t start import"),h(H,a(_t))}),v(C,A)};y(me,C=>{a(_t)&&C(we)})}var ee=o(me,2),Oa=s(ee),ca=s(Oa,!0);r(Oa);var k=o(Oa,2),F=s(k);{var Aa=C=>{var A=Pl(),J=$(A);vt(J,{class:"spin",size:16}),w(),v(C,A)},K=C=>{var A=Fl(),J=$(A),Q=o(J);Rt(Q,{size:16}),T(()=>h(J,`${a(le)==="local"?"Import local folder":"Import from Hugging Face"} `)),v(C,A)};y(F,C=>{a($a)?C(Aa):C(K,!1)})}r(k),r(ee),r(fa),r(Se),r(gt);var x=o(gt,2),_a=s(x),Ca=o(s(_a),2),Pa=s(Ca),te=o(s(Pa)),ga=s(te),Ba=s(ga,!0);r(ga);var ua=o(ga),ka=s(ua,!0);r(ua),r(te),r(Pa),w(4),r(Ca),r(_a);var ba=o(_a,2),pa=s(ba);mr(pa,{size:18}),w(),r(ba),r(x),r(Oe),T((C,A)=>{Ka(ae,"aria-checked",a(le)==="local"),Ne=oe(ae,1,"",null,Ne,C),Ka(Me,"aria-checked",a(le)==="huggingface"),Ga=oe(Me,1,"",null,Ga,A),h(de,a(le)==="local"?"Choose a local folder":"Choose a Hugging Face model"),h(ca,a(le)==="local"?"Files are copied into managed storage.":"The source revision is resolved once before transfer."),k.disabled=a($a),h(Ba,a(le)==="local"?"Validate files":"Resolve snapshot"),h(ka,a(le)==="local"?"Unsafe files and symlinks are rejected.":"The requested revision is pinned to one commit.")},[()=>({active:a(le)==="local"}),()=>({active:a(le)==="huggingface"})]),ys("submit",fa,C=>{C.preventDefault(),fi()}),xt(La,()=>a(Qa),C=>m(Qa,C)),xt(ke,()=>a(st),C=>m(st,C)),v(He,Le)},Ot=He=>{var Le=z(),Oe=$(Le);{var gt=ae=>{var Ne=rd(),Be=$(Ne),Ve=o(s(Be),2);Ve.__click=[Ll,Kr];var Me=s(Ve);{let va=Rr(()=>a(xr)?"spin":"");qn(Me,{get class(){return a(va)},size:16})}w(),r(Ve),r(Be);var Ga=o(Be,2);{var De=va=>{var za=Ol(),Ha=s(za);pr(Ha,{size:16});var de=o(Ha,1,!0);r(za),T(()=>h(de,a(wr))),v(va,za)};y(Ga,va=>{a(wr)&&va(De)})}var Ge=o(Ga,2);{var Se=va=>{var za=Dl(),Ha=s(za);vt(Ha,{class:"spin",size:24}),w(),r(za),v(va,za)},Ae=va=>{var za=z(),Ha=$(za);{var de=Sa=>{var qa=Ul(),_e=s(qa),ye=s(_e);Ts(ye,{size:28}),r(_e);var La=o(_e,3);La.__click=[Rl,xe];var Va=s(La);Hr(Va,{size:16}),w(),r(La),r(qa),v(Sa,qa)},fa=Sa=>{var qa=td(),_e=$(qa),ye=s(_e),La=s(ye),Va=s(La);vt(Va,{size:18}),r(La);var ke=o(La),me=s(ke),we=s(me,!0);r(me),w(),r(ke),r(ye);var ee=o(ye,2),Oa=s(ee),ca=s(Oa);Ut(ca,{size:18}),r(Oa);var k=o(Oa),F=s(k),Aa=s(F,!0);r(F),w(),r(k),r(ee),w(2),r(_e);var K=o(_e,2),x=s(K),_a=s(x);_a.__click=[ql,pt];let Ca;var Pa=o(s(_a)),te=s(Pa,!0);r(Pa),r(_a);var ga=o(_a,2);ga.__click=[Bl,pt];let Ba;var ua=o(s(ga)),ka=s(ua,!0);r(ua),r(ga);var ba=o(ga,2);ba.__click=[Vl,pt];let pa;var C=o(s(ba)),A=s(C,!0);r(C),r(ba),r(x);var J=o(x,2),Q=s(J);{var Ea=H=>{var oa=Jl();w(),v(H,oa)},na=H=>{var oa=zs("All caught up");v(H,oa)};y(Q,H=>{a(u)?H(Ea):H(na,!1)})}r(J),r(K);var Na=o(K,2);{var wa=H=>{var oa=Kl(),X=s(oa);Ut(X,{size:24}),w(),r(oa),v(H,oa)},Ma=H=>{var oa=ed();tt(oa,5,()=>a(_),et,(X,p)=>{var j=ad();let Ta;var ue=s(j),se=s(ue),fe=s(se);{var ve=da=>{Ut(da,{size:17})},Ee=da=>{var ha=z(),ne=$(ha);{var Qe=Ie=>{pr(Ie,{size:17})},Re=Ie=>{var Ir=z(),yi=$(Ir);{var ki=Zt=>{Vs(Zt,{size:17})},wi=Zt=>{var $s=z(),xi=$($s);{var zi=Qt=>{Pn(Qt,{size:17})},Ni=Qt=>{vt(Qt,{class:"spin",size:17})};y(xi,Qt=>{a(p),c(()=>a(p).state==="queued")?Qt(zi):Qt(Ni,!1)},!0)}v(Zt,$s)};y(yi,Zt=>{a(p),c(()=>a(p).state==="canceled")?Zt(ki):Zt(wi,!1)},!0)}v(Ie,Ir)};y(ne,Ie=>{a(p),c(()=>a(p).state==="failed")?Ie(Qe):Ie(Re,!1)},!0)}v(da,ha)};y(fe,da=>{a(p),c(()=>a(p).state==="completed")?da(ve):da(Ee,!1)})}r(se);var R=o(se,2),la=s(R),xa=s(la,!0);r(la);var U=o(la),Fa=s(U),Da=s(Fa,!0);r(Fa);var ie=o(Fa);r(U),r(R);var ge=o(R,2),be=s(ge),E=s(be),Ra=s(E,!0);r(E);var Te=o(E);{var Ya=da=>{var ha=Wl(),ne=s(ha);r(ha),T((Qe,Re)=>h(ne,`${Qe??""} / ${Re??""}`),[()=>(ma(Ja),a(p),c(()=>Ja(a(p).current_bytes||0))),()=>(ma(Ja),a(p),c(()=>Ja(a(p).total_bytes)))]),v(da,ha)};y(Te,da=>{a(p),c(()=>a(p).total_bytes)&&da(Ya)})}r(be);var pe=o(be,2);{var $e=da=>{var ha=Xl(),ne=s(ha);r(ha),T(Qe=>os(ne,Qe),[()=>(ma(Or),a(p),c(()=>`width:${Or(a(p).progress)}%`))]),v(da,ha)};y(pe,da=>{a(p),c(()=>Wt(a(p)))&&da($e)})}r(ge);var Ce=o(ge,2),bt=s(Ce,!0);r(Ce);var $t=o(Ce,2),Ye=s($t);{var Ze=da=>{var ha=Yl();ha.__click=[Gl,pi,p];var ne=s(ha,!0);r(ha),T(()=>{ha.disabled=(a(Vt),a(p),c(()=>a(Vt)===a(p).id)),h(ne,(a(Vt),a(p),c(()=>a(Vt)===a(p).id?"Canceling…":"Cancel")))}),v(da,ha)};y(Ye,da=>{a(p),c(()=>Wt(a(p)))&&da(Ze)})}var lt=o(Ye,2);{var yt=da=>{var ha=Ql();ha.__click=[Zl,Jt,p];var ne=s(ha);Pr(ne,{size:15}),w(),r(ha),T(()=>Ka(ha,"aria-label",(a(Jt),a(p),c(()=>a(Jt)===a(p).id?"Hide error details":"Show error details")))),v(da,ha)};y(lt,da=>{a(p),c(()=>a(p).error)&&da(yt)})}r($t),r(ue);var kt=o(ue,2);{var dt=da=>{var ha=jl(),ne=o(s(ha)),Qe=s(ne,!0);r(ne);var Re=o(ne),Ie=s(Re);r(Re),r(ha),T(()=>{h(Qe,(a(p),c(()=>a(p).error))),h(Ie,`Job ID: ${a(p),c(()=>a(p).id)??""}`)}),v(da,ha)};y(kt,da=>{a(p),a(Jt),c(()=>a(p).error&&a(Jt)===a(p).id)&&da(dt)})}r(j),T((da,ha,ne,Qe,Re,Ie)=>{Ta=oe(j,1,"job-item",null,Ta,da),oe(se,1,ha),h(xa,(a(p),c(()=>a(p).repo_id||a(p).id))),h(Da,ne),h(ie,` ${Qe??""}`),h(Ra,Re),Ka(Ce,"datetime",(a(p),c(()=>a(p).updated_at))),h(bt,Ie)},[()=>({expanded:a(Jt)===a(p).id}),()=>(a(p),c(()=>`job-state status-${hi(a(p).state)}`)),()=>(a(p),c(()=>Nr(a(p).type))),()=>(a(p),c(()=>Nr(a(p).state))),()=>(a(p),ma(Or),c(()=>Wt(a(p))?`${Math.round(Or(a(p).progress))}%`:Nr(a(p).state))),()=>(ma(jt),a(p),c(()=>jt(a(p).updated_at)))]),v(X,j)}),r(oa),v(H,oa)};y(Na,H=>{a(_),c(()=>!a(_).length)?H(wa):H(Ma,!1)})}T((H,oa,X)=>{h(we,a(u)),h(Aa,a(d)),Ca=oe(_a,1,"",null,Ca,H),h(te,(a(he),c(()=>a(he).length))),Ba=oe(ga,1,"",null,Ba,oa),h(ka,a(u)),pa=oe(ba,1,"",null,pa,X),h(A,(a(he),a(u),c(()=>a(he).length-a(u))))},[()=>({active:a(pt)==="all"}),()=>({active:a(pt)==="active"}),()=>({active:a(pt)==="completed"})]),v(Sa,qa)};y(Ha,Sa=>{a(he),c(()=>!a(he).length)?Sa(de):Sa(fa,!1)},!0)}v(va,za)};y(Ge,va=>{a(he)?va(Ae,!1):va(Se)})}T(()=>Ve.disabled=a(xr)),v(ae,Ne)},Xe=ae=>{var Ne=z(),Be=$(Ne);{var Ve=Ga=>{var De=nd(),Ge=o($(De),2);{var Se=va=>{var za=sd(),Ha=s(za);vt(Ha,{class:"spin",size:24}),w(),r(za),v(va,za)},Ae=va=>{var za=id(),Ha=$(za),de=s(Ha),fa=s(de),Sa=s(fa);Is(Sa,{size:19}),r(fa);var qa=o(fa),_e=o(s(qa)),ye=s(_e,!0);r(_e),w(),r(qa),r(de);var La=o(de,2),Va=s(La),ke=s(Va);Hs(ke,{size:19}),r(Va);var me=o(Va),we=o(s(me)),ee=s(we,!0);r(we),w(),r(me),r(La);var Oa=o(La,2),ca=s(Oa),k=s(ca);Ln(k,{size:19}),r(ca);var F=o(ca),Aa=o(s(F)),K=s(Aa);r(Aa);var x=o(Aa),_a=s(x);r(x),r(F),r(Oa),r(Ha);var Ca=o(Ha,2),Pa=s(Ca),te=s(Pa),ga=o(s(te)),Ba=s(ga,!0);r(ga),r(te);var ua=o(te,4),ka=s(ua),ba=s(ka),pa=o(s(ba)),C=s(pa,!0);r(pa),r(ba),w(),r(ka);var A=o(ka,2),J=s(A),Q=o(s(J)),Ea=s(Q,!0);r(Q),r(J);var na=o(J),Na=s(na);r(na),r(A),r(ua);var wa=o(ua,2),Ma=s(wa),H=s(Ma);r(Ma),w(),r(wa),r(Pa);var oa=o(Pa,2),X=o(s(oa),2),p=s(X),j=s(p),Ta=s(j);Os(Ta,{size:16}),w(),r(j);var ue=o(j),se=s(ue,!0);r(ue),r(p);var fe=o(p,2),ve=s(fe),Ee=s(ve);Fr(Ee,{size:16}),w(),r(ve);var R=o(ve),la=s(R,!0);r(R),r(fe);var xa=o(fe,2),U=s(xa),Fa=s(U);Us(Fa,{size:16}),w(),r(U);var Da=o(U),ie=s(Da,!0);r(Da),r(xa);var ge=o(xa,2),be=s(ge),E=s(be);Rs(E,{size:16}),w(),r(be);var Ra=o(be),Te=s(Ra,!0);r(Ra),r(ge),r(X),r(oa),r(Ca),T((Ya,pe,$e,Ce,bt,$t,Ye,Ze,lt,yt,kt)=>{h(ye,Ya),h(ee,pe),h(K,`${$e??""}×`),h(_a,`${Ce??""}% physical savings`),oe(ga,1,(a(ya),c(()=>`badge status-${a(ya).dedup_ratio>1?"success":"muted"}`))),h(Ba,(a(ya),c(()=>a(ya).profile))),h(C,bt),h(Ea,$t),os(Na,Ye),h(H,`${Ze??""}%`),h(se,(a(ya),c(()=>a(ya).repositories))),h(la,lt),h(ie,yt),h(Te,kt)},[()=>(ma(Ja),a(ya),c(()=>Ja(a(ya).logical_bytes))),()=>(ma(Ja),a(ya),c(()=>Ja(a(ya).physical_bytes))),()=>(a(ya),c(()=>a(ya).dedup_ratio.toFixed(2))),()=>(ma(Dr),a(ya),c(()=>Dr(a(ya).dedup_ratio).toFixed(0))),()=>(ma(Ja),a(ya),c(()=>Ja(a(ya).logical_bytes))),()=>(ma(Ja),a(ya),c(()=>Ja(a(ya).physical_bytes))),()=>(a(ya),c(()=>`width:${Math.max(4,Math.min(100,a(ya).logical_bytes?a(ya).physical_bytes/a(ya).logical_bytes*100:0))}%`)),()=>(ma(Dr),a(ya),c(()=>Dr(a(ya).dedup_ratio).toFixed(0))),()=>(a(ya),c(()=>a(ya).ordinary_objects.toLocaleString())),()=>(a(ya),c(()=>a(ya).xet_objects.toLocaleString())),()=>(a(ya),c(()=>Nr(a(ya).profile)))]),v(va,za)};y(Ge,va=>{a(ya)?va(Ae,!1):va(Se)})}v(Ga,De)},Me=Ga=>{var De=z(),Ge=$(De);{var Se=va=>{var za=pd(),Ha=o($(za),2),de=s(Ha),fa=s(de),Sa=s(fa);Rs(Sa,{size:21}),r(fa);var qa=o(fa),_e=o(s(qa)),ye=s(_e,!0);r(_e),r(qa),r(de);var La=o(de,2);La.__click=[od,or,Kt];var Va=s(La);{var ke=K=>{var x=ld(),_a=$(x);fr(_a,{size:15}),w(),v(K,x)},me=K=>{var x=dd(),_a=$(x);hr(_a,{size:15}),w(),v(K,x)};y(Va,K=>{a(nt)==="endpoint"?K(ke):K(me,!1)})}r(La),r(Ha);var we=o(Ha,2),ee=s(we);tt(ee,5,()=>[{key:"env",eyebrow:"Start here",title:"Set your environment",description:"Run this before starting Python or the hf CLI.",icon:Ls},{key:"download",eyebrow:"Xet-enabled reads",title:"Download a model",description:"Miniface uses Xet for efficient, deduplicated transfers.",icon:Cs},{key:"upload",eyebrow:"Basic LFS writes",title:"Upload training output",description:"Use a fresh process with native Xet writes disabled.",icon:Bs}],et,(K,x)=>{const _a=Rr(()=>(a(x),c(()=>a(x).icon)));var Ca=fd(),Pa=s(Ca),te=s(Pa),ga=s(te);a(_a)(ga,{size:19}),r(te);var Ba=o(te),ua=s(Ba),ka=s(ua,!0);r(ua);var ba=o(ua),pa=s(ba,!0);r(ba);var C=o(ba),A=s(C,!0);r(C),r(Ba),r(Pa);var J=o(Pa,2);{var Q=p=>{var j=vd(),Ta=s(j);qs(Ta,{size:16}),w(),r(j),v(p,j)};y(J,p=>{a(x),c(()=>a(x).key==="upload")&&p(Q)})}var Ea=o(J,2),na=s(Ea);na.__click=[cd,or,ms,x];var Na=s(na);{var wa=p=>{var j=_d(),Ta=$(j);fr(Ta,{size:14}),w(),v(p,j)},Ma=p=>{var j=ud(),Ta=$(j);hr(Ta,{size:14}),w(),v(p,j)};y(Na,p=>{a(nt),a(x),c(()=>a(nt)===`setting-${a(x).key}`)?p(wa):p(Ma,!1)})}r(na);var H=o(na),oa=s(H),X=s(oa,!0);r(oa),r(H),r(Ea),r(Ca),T(p=>{h(ka,(a(x),c(()=>a(x).eyebrow))),h(pa,(a(x),c(()=>a(x).title))),h(A,(a(x),c(()=>a(x).description))),Ka(na,"aria-label",(a(x),c(()=>`Copy ${a(x).title} commands`))),h(X,p)},[()=>(a(x),c(()=>ms(a(x).key)))]),v(K,Ca)}),r(ee);var Oa=o(ee,2),ca=s(Oa),k=s(ca);mr(k,{size:20}),w(2),r(ca);var F=o(ca,2),Aa=s(F);Fr(Aa,{size:20}),w(2),r(F),r(Oa),r(we),T(K=>h(ye,K),[()=>c(Kt)]),v(va,za)},Ae=va=>{var za=md(),Ha=s(za),de=s(Ha);Pr(de,{size:28}),r(Ha);var fa=o(Ha,3);fa.__click=[hd,xe],r(za),v(va,za)};y(Ge,va=>{a(n)==="settings"?va(Se):va(Ae,!1)},!0)}v(Ga,De)};y(Be,Ga=>{a(n)==="storage"?Ga(Ve):Ga(Me,!1)},!0)}v(ae,Ne)};y(Oe,ae=>{a(n)==="jobs"?ae(gt):ae(Xe,!1)},!0)}v(He,Le)};y(Tt,He=>{a(n)==="imports"?He(mt):He(Ot,!1)},!0)}v(ja,ze)};y(Fe,ja=>{a(n),a(i),c(()=>a(n)==="models"&&a(i).length>=3)?ja(Z):ja(ce,!1)},!0)}v(Xa,Ua)};y(Cr,Xa=>{a(i),a(n),c(()=>!a(i).length||a(n)==="models"&&a(i).length===1)?Xa(Gr):Xa(cr,!1)})}r(Er),r(qe);var Yr=o(qe,2);{var Zr=Xa=>{var Ua=gd(),Fe=s(Ua);Ut(Fe,{size:16});var Z=o(Fe,1,!0);r(Ua),T(()=>h(Z,a(zr))),v(Xa,Ua)};y(Yr,Xa=>{a(zr)&&Xa(Zr)})}T(Xa=>{h(Mr,Xa),h(Sr,(a(N),c(()=>a(N).username||"Administrator")))},[()=>(a(N),c(()=>{var Xa;return((Xa=a(N).username)==null?void 0:Xa.slice(0,1).toUpperCase())||"A"}))]),v(Ke,Nt)};y(ra,Ke=>{a(N),c(()=>!a(N).authenticated)?Ke(re):Ke(Pe,!1)},!0)}v(g,P)};y(gi,g=>{a(N)?g($i,!1):g(bi)})}v(e,bs),ei()}Ks(["click","change","input"]);export{zd as A};

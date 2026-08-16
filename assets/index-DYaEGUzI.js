(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();function Qp(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Jp={exports:{}},$a={},qp={exports:{}},Rn={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hi=Symbol.for("react.element"),Qy=Symbol.for("react.portal"),Jy=Symbol.for("react.fragment"),qy=Symbol.for("react.strict_mode"),n1=Symbol.for("react.profiler"),r1=Symbol.for("react.provider"),e1=Symbol.for("react.context"),t1=Symbol.for("react.forward_ref"),o1=Symbol.for("react.suspense"),i1=Symbol.for("react.memo"),s1=Symbol.for("react.lazy"),Yd=Symbol.iterator;function a1(n){return n===null||typeof n!="object"?null:(n=Yd&&n[Yd]||n["@@iterator"],typeof n=="function"?n:null)}var nm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},rm=Object.assign,em={};function No(n,r,e){this.props=n,this.context=r,this.refs=em,this.updater=e||nm}No.prototype.isReactComponent={};No.prototype.setState=function(n,r){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,r,"setState")};No.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function tm(){}tm.prototype=No.prototype;function ju(n,r,e){this.props=n,this.context=r,this.refs=em,this.updater=e||nm}var Au=ju.prototype=new tm;Au.constructor=ju;rm(Au,No.prototype);Au.isPureReactComponent=!0;var Qd=Array.isArray,om=Object.prototype.hasOwnProperty,Ou={current:null},im={key:!0,ref:!0,__self:!0,__source:!0};function sm(n,r,e){var t,o={},i=null,s=null;if(r!=null)for(t in r.ref!==void 0&&(s=r.ref),r.key!==void 0&&(i=""+r.key),r)om.call(r,t)&&!im.hasOwnProperty(t)&&(o[t]=r[t]);var a=arguments.length-2;if(a===1)o.children=e;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];o.children=l}if(n&&n.defaultProps)for(t in a=n.defaultProps,a)o[t]===void 0&&(o[t]=a[t]);return{$$typeof:Hi,type:n,key:i,ref:s,props:o,_owner:Ou.current}}function l1(n,r){return{$$typeof:Hi,type:n.type,key:r,ref:n.ref,props:n.props,_owner:n._owner}}function Ru(n){return typeof n=="object"&&n!==null&&n.$$typeof===Hi}function c1(n){var r={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(e){return r[e]})}var Jd=/\/+/g;function kl(n,r){return typeof n=="object"&&n!==null&&n.key!=null?c1(""+n.key):r.toString(36)}function Rs(n,r,e,t,o){var i=typeof n;(i==="undefined"||i==="boolean")&&(n=null);var s=!1;if(n===null)s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(n.$$typeof){case Hi:case Qy:s=!0}}if(s)return s=n,o=o(s),n=t===""?"."+kl(s,0):t,Qd(o)?(e="",n!=null&&(e=n.replace(Jd,"$&/")+"/"),Rs(o,r,e,"",function(c){return c})):o!=null&&(Ru(o)&&(o=l1(o,e+(!o.key||s&&s.key===o.key?"":(""+o.key).replace(Jd,"$&/")+"/")+n)),r.push(o)),1;if(s=0,t=t===""?".":t+":",Qd(n))for(var a=0;a<n.length;a++){i=n[a];var l=t+kl(i,a);s+=Rs(i,r,e,l,o)}else if(l=a1(n),typeof l=="function")for(n=l.call(n),a=0;!(i=n.next()).done;)i=i.value,l=t+kl(i,a++),s+=Rs(i,r,e,l,o);else if(i==="object")throw r=String(n),Error("Objects are not valid as a React child (found: "+(r==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":r)+"). If you meant to render a collection of children, use an array instead.");return s}function rs(n,r,e){if(n==null)return n;var t=[],o=0;return Rs(n,t,"","",function(i){return r.call(e,i,o++)}),t}function u1(n){if(n._status===-1){var r=n._result;r=r(),r.then(function(e){(n._status===0||n._status===-1)&&(n._status=1,n._result=e)},function(e){(n._status===0||n._status===-1)&&(n._status=2,n._result=e)}),n._status===-1&&(n._status=0,n._result=r)}if(n._status===1)return n._result.default;throw n._result}var Er={current:null},Ls={transition:null},d1={ReactCurrentDispatcher:Er,ReactCurrentBatchConfig:Ls,ReactCurrentOwner:Ou};function am(){throw Error("act(...) is not supported in production builds of React.")}Rn.Children={map:rs,forEach:function(n,r,e){rs(n,function(){r.apply(this,arguments)},e)},count:function(n){var r=0;return rs(n,function(){r++}),r},toArray:function(n){return rs(n,function(r){return r})||[]},only:function(n){if(!Ru(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};Rn.Component=No;Rn.Fragment=Jy;Rn.Profiler=n1;Rn.PureComponent=ju;Rn.StrictMode=qy;Rn.Suspense=o1;Rn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=d1;Rn.act=am;Rn.cloneElement=function(n,r,e){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var t=rm({},n.props),o=n.key,i=n.ref,s=n._owner;if(r!=null){if(r.ref!==void 0&&(i=r.ref,s=Ou.current),r.key!==void 0&&(o=""+r.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in r)om.call(r,l)&&!im.hasOwnProperty(l)&&(t[l]=r[l]===void 0&&a!==void 0?a[l]:r[l])}var l=arguments.length-2;if(l===1)t.children=e;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];t.children=a}return{$$typeof:Hi,type:n.type,key:o,ref:i,props:t,_owner:s}};Rn.createContext=function(n){return n={$$typeof:e1,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:r1,_context:n},n.Consumer=n};Rn.createElement=sm;Rn.createFactory=function(n){var r=sm.bind(null,n);return r.type=n,r};Rn.createRef=function(){return{current:null}};Rn.forwardRef=function(n){return{$$typeof:t1,render:n}};Rn.isValidElement=Ru;Rn.lazy=function(n){return{$$typeof:s1,_payload:{_status:-1,_result:n},_init:u1}};Rn.memo=function(n,r){return{$$typeof:i1,type:n,compare:r===void 0?null:r}};Rn.startTransition=function(n){var r=Ls.transition;Ls.transition={};try{n()}finally{Ls.transition=r}};Rn.unstable_act=am;Rn.useCallback=function(n,r){return Er.current.useCallback(n,r)};Rn.useContext=function(n){return Er.current.useContext(n)};Rn.useDebugValue=function(){};Rn.useDeferredValue=function(n){return Er.current.useDeferredValue(n)};Rn.useEffect=function(n,r){return Er.current.useEffect(n,r)};Rn.useId=function(){return Er.current.useId()};Rn.useImperativeHandle=function(n,r,e){return Er.current.useImperativeHandle(n,r,e)};Rn.useInsertionEffect=function(n,r){return Er.current.useInsertionEffect(n,r)};Rn.useLayoutEffect=function(n,r){return Er.current.useLayoutEffect(n,r)};Rn.useMemo=function(n,r){return Er.current.useMemo(n,r)};Rn.useReducer=function(n,r,e){return Er.current.useReducer(n,r,e)};Rn.useRef=function(n){return Er.current.useRef(n)};Rn.useState=function(n){return Er.current.useState(n)};Rn.useSyncExternalStore=function(n,r,e){return Er.current.useSyncExternalStore(n,r,e)};Rn.useTransition=function(){return Er.current.useTransition()};Rn.version="18.3.1";qp.exports=Rn;var N=qp.exports;const lm=Qp(N);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h1=N,f1=Symbol.for("react.element"),p1=Symbol.for("react.fragment"),m1=Object.prototype.hasOwnProperty,g1=h1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y1={key:!0,ref:!0,__self:!0,__source:!0};function cm(n,r,e){var t,o={},i=null,s=null;e!==void 0&&(i=""+e),r.key!==void 0&&(i=""+r.key),r.ref!==void 0&&(s=r.ref);for(t in r)m1.call(r,t)&&!y1.hasOwnProperty(t)&&(o[t]=r[t]);if(n&&n.defaultProps)for(t in r=n.defaultProps,r)o[t]===void 0&&(o[t]=r[t]);return{$$typeof:f1,type:n,key:i,ref:s,props:o,_owner:g1.current}}$a.Fragment=p1;$a.jsx=cm;$a.jsxs=cm;Jp.exports=$a;var u=Jp.exports,vc={},um={exports:{}},Ur={},dm={exports:{}},hm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function r(w,C){var z=w.length;w.push(C);n:for(;0<z;){var G=z-1>>>1,P=w[G];if(0<o(P,C))w[G]=C,w[z]=P,z=G;else break n}}function e(w){return w.length===0?null:w[0]}function t(w){if(w.length===0)return null;var C=w[0],z=w.pop();if(z!==C){w[0]=z;n:for(var G=0,P=w.length,fn=P>>>1;G<fn;){var X=2*(G+1)-1,en=w[X],Q=X+1,ln=w[Q];if(0>o(en,z))Q<P&&0>o(ln,en)?(w[G]=ln,w[Q]=z,G=Q):(w[G]=en,w[X]=z,G=X);else if(Q<P&&0>o(ln,z))w[G]=ln,w[Q]=z,G=Q;else break n}}return C}function o(w,C){var z=w.sortIndex-C.sortIndex;return z!==0?z:w.id-C.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;n.unstable_now=function(){return i.now()}}else{var s=Date,a=s.now();n.unstable_now=function(){return s.now()-a}}var l=[],c=[],d=1,h=null,f=3,m=!1,y=!1,v=!1,A=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(w){for(var C=e(c);C!==null;){if(C.callback===null)t(c);else if(C.startTime<=w)t(c),C.sortIndex=C.expirationTime,r(l,C);else break;C=e(c)}}function S(w){if(v=!1,x(w),!y)if(e(l)!==null)y=!0,M(b);else{var C=e(c);C!==null&&j(S,C.startTime-w)}}function b(w,C){y=!1,v&&(v=!1,g(Z),Z=-1),m=!0;var z=f;try{for(x(C),h=e(l);h!==null&&(!(h.expirationTime>C)||w&&!I());){var G=h.callback;if(typeof G=="function"){h.callback=null,f=h.priorityLevel;var P=G(h.expirationTime<=C);C=n.unstable_now(),typeof P=="function"?h.callback=P:h===e(l)&&t(l),x(C)}else t(l);h=e(l)}if(h!==null)var fn=!0;else{var X=e(c);X!==null&&j(S,X.startTime-C),fn=!1}return fn}finally{h=null,f=z,m=!1}}var O=!1,E=null,Z=-1,F=5,K=-1;function I(){return!(n.unstable_now()-K<F)}function Y(){if(E!==null){var w=n.unstable_now();K=w;var C=!0;try{C=E(!0,w)}finally{C?H():(O=!1,E=null)}}else O=!1}var H;if(typeof p=="function")H=function(){p(Y)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,R=k.port2;k.port1.onmessage=Y,H=function(){R.postMessage(null)}}else H=function(){A(Y,0)};function M(w){E=w,O||(O=!0,H())}function j(w,C){Z=A(function(){w(n.unstable_now())},C)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(w){w.callback=null},n.unstable_continueExecution=function(){y||m||(y=!0,M(b))},n.unstable_forceFrameRate=function(w){0>w||125<w?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<w?Math.floor(1e3/w):5},n.unstable_getCurrentPriorityLevel=function(){return f},n.unstable_getFirstCallbackNode=function(){return e(l)},n.unstable_next=function(w){switch(f){case 1:case 2:case 3:var C=3;break;default:C=f}var z=f;f=C;try{return w()}finally{f=z}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(w,C){switch(w){case 1:case 2:case 3:case 4:case 5:break;default:w=3}var z=f;f=w;try{return C()}finally{f=z}},n.unstable_scheduleCallback=function(w,C,z){var G=n.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?G+z:G):z=G,w){case 1:var P=-1;break;case 2:P=250;break;case 5:P=1073741823;break;case 4:P=1e4;break;default:P=5e3}return P=z+P,w={id:d++,callback:C,priorityLevel:w,startTime:z,expirationTime:P,sortIndex:-1},z>G?(w.sortIndex=z,r(c,w),e(l)===null&&w===e(c)&&(v?(g(Z),Z=-1):v=!0,j(S,z-G))):(w.sortIndex=P,r(l,w),y||m||(y=!0,M(b))),w},n.unstable_shouldYield=I,n.unstable_wrapCallback=function(w){var C=f;return function(){var z=f;f=C;try{return w.apply(this,arguments)}finally{f=z}}}})(hm);dm.exports=hm;var v1=dm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x1=N,Gr=v1;function sn(n){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+n,e=1;e<arguments.length;e++)r+="&args[]="+encodeURIComponent(arguments[e]);return"Minified React error #"+n+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var fm=new Set,xi={};function Bt(n,r){So(n,r),So(n+"Capture",r)}function So(n,r){for(xi[n]=r,n=0;n<r.length;n++)fm.add(r[n])}var Re=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xc=Object.prototype.hasOwnProperty,w1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,qd={},nh={};function S1(n){return xc.call(nh,n)?!0:xc.call(qd,n)?!1:w1.test(n)?nh[n]=!0:(qd[n]=!0,!1)}function k1(n,r,e,t){if(e!==null&&e.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return t?!1:e!==null?!e.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function _1(n,r,e,t){if(r===null||typeof r>"u"||k1(n,r,e,t))return!0;if(t)return!1;if(e!==null)switch(e.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function Mr(n,r,e,t,o,i,s){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=t,this.attributeNamespace=o,this.mustUseProperty=e,this.propertyName=n,this.type=r,this.sanitizeURL=i,this.removeEmptyString=s}var mr={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){mr[n]=new Mr(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var r=n[0];mr[r]=new Mr(r,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){mr[n]=new Mr(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){mr[n]=new Mr(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){mr[n]=new Mr(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){mr[n]=new Mr(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){mr[n]=new Mr(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){mr[n]=new Mr(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){mr[n]=new Mr(n,5,!1,n.toLowerCase(),null,!1,!1)});var Lu=/[\-:]([a-z])/g;function Du(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var r=n.replace(Lu,Du);mr[r]=new Mr(r,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var r=n.replace(Lu,Du);mr[r]=new Mr(r,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var r=n.replace(Lu,Du);mr[r]=new Mr(r,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){mr[n]=new Mr(n,1,!1,n.toLowerCase(),null,!1,!1)});mr.xlinkHref=new Mr("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){mr[n]=new Mr(n,1,!1,n.toLowerCase(),null,!0,!0)});function Zu(n,r,e,t){var o=mr.hasOwnProperty(r)?mr[r]:null;(o!==null?o.type!==0:t||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(_1(r,e,o,t)&&(e=null),t||o===null?S1(r)&&(e===null?n.removeAttribute(r):n.setAttribute(r,""+e)):o.mustUseProperty?n[o.propertyName]=e===null?o.type===3?!1:"":e:(r=o.attributeName,t=o.attributeNamespace,e===null?n.removeAttribute(r):(o=o.type,e=o===3||o===4&&e===!0?"":""+e,t?n.setAttributeNS(t,r,e):n.setAttribute(r,e))))}var Be=x1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,es=Symbol.for("react.element"),Jt=Symbol.for("react.portal"),qt=Symbol.for("react.fragment"),Fu=Symbol.for("react.strict_mode"),wc=Symbol.for("react.profiler"),pm=Symbol.for("react.provider"),mm=Symbol.for("react.context"),$u=Symbol.for("react.forward_ref"),Sc=Symbol.for("react.suspense"),kc=Symbol.for("react.suspense_list"),zu=Symbol.for("react.memo"),Ue=Symbol.for("react.lazy"),gm=Symbol.for("react.offscreen"),rh=Symbol.iterator;function Do(n){return n===null||typeof n!="object"?null:(n=rh&&n[rh]||n["@@iterator"],typeof n=="function"?n:null)}var Qn=Object.assign,_l;function Jo(n){if(_l===void 0)try{throw Error()}catch(e){var r=e.stack.trim().match(/\n( *(at )?)/);_l=r&&r[1]||""}return`
`+_l+n}var bl=!1;function Cl(n,r){if(!n||bl)return"";bl=!0;var e=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(c){var t=c}Reflect.construct(n,[],r)}else{try{r.call()}catch(c){t=c}n.call(r.prototype)}else{try{throw Error()}catch(c){t=c}n()}}catch(c){if(c&&t&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),i=t.stack.split(`
`),s=o.length-1,a=i.length-1;1<=s&&0<=a&&o[s]!==i[a];)a--;for(;1<=s&&0<=a;s--,a--)if(o[s]!==i[a]){if(s!==1||a!==1)do if(s--,a--,0>a||o[s]!==i[a]){var l=`
`+o[s].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=s&&0<=a);break}}}finally{bl=!1,Error.prepareStackTrace=e}return(n=n?n.displayName||n.name:"")?Jo(n):""}function b1(n){switch(n.tag){case 5:return Jo(n.type);case 16:return Jo("Lazy");case 13:return Jo("Suspense");case 19:return Jo("SuspenseList");case 0:case 2:case 15:return n=Cl(n.type,!1),n;case 11:return n=Cl(n.type.render,!1),n;case 1:return n=Cl(n.type,!0),n;default:return""}}function _c(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case qt:return"Fragment";case Jt:return"Portal";case wc:return"Profiler";case Fu:return"StrictMode";case Sc:return"Suspense";case kc:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case mm:return(n.displayName||"Context")+".Consumer";case pm:return(n._context.displayName||"Context")+".Provider";case $u:var r=n.render;return n=n.displayName,n||(n=r.displayName||r.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case zu:return r=n.displayName||null,r!==null?r:_c(n.type)||"Memo";case Ue:r=n._payload,n=n._init;try{return _c(n(r))}catch{}}return null}function C1(n){var r=n.type;switch(n.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=r.render,n=n.displayName||n.name||"",r.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return _c(r);case 8:return r===Fu?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function pt(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function ym(n){var r=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function P1(n){var r=ym(n)?"checked":"value",e=Object.getOwnPropertyDescriptor(n.constructor.prototype,r),t=""+n[r];if(!n.hasOwnProperty(r)&&typeof e<"u"&&typeof e.get=="function"&&typeof e.set=="function"){var o=e.get,i=e.set;return Object.defineProperty(n,r,{configurable:!0,get:function(){return o.call(this)},set:function(s){t=""+s,i.call(this,s)}}),Object.defineProperty(n,r,{enumerable:e.enumerable}),{getValue:function(){return t},setValue:function(s){t=""+s},stopTracking:function(){n._valueTracker=null,delete n[r]}}}}function ts(n){n._valueTracker||(n._valueTracker=P1(n))}function vm(n){if(!n)return!1;var r=n._valueTracker;if(!r)return!0;var e=r.getValue(),t="";return n&&(t=ym(n)?n.checked?"true":"false":n.value),n=t,n!==e?(r.setValue(n),!0):!1}function qs(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function bc(n,r){var e=r.checked;return Qn({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:e??n._wrapperState.initialChecked})}function eh(n,r){var e=r.defaultValue==null?"":r.defaultValue,t=r.checked!=null?r.checked:r.defaultChecked;e=pt(r.value!=null?r.value:e),n._wrapperState={initialChecked:t,initialValue:e,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function xm(n,r){r=r.checked,r!=null&&Zu(n,"checked",r,!1)}function Cc(n,r){xm(n,r);var e=pt(r.value),t=r.type;if(e!=null)t==="number"?(e===0&&n.value===""||n.value!=e)&&(n.value=""+e):n.value!==""+e&&(n.value=""+e);else if(t==="submit"||t==="reset"){n.removeAttribute("value");return}r.hasOwnProperty("value")?Pc(n,r.type,e):r.hasOwnProperty("defaultValue")&&Pc(n,r.type,pt(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(n.defaultChecked=!!r.defaultChecked)}function th(n,r,e){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var t=r.type;if(!(t!=="submit"&&t!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+n._wrapperState.initialValue,e||r===n.value||(n.value=r),n.defaultValue=r}e=n.name,e!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,e!==""&&(n.name=e)}function Pc(n,r,e){(r!=="number"||qs(n.ownerDocument)!==n)&&(e==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+e&&(n.defaultValue=""+e))}var qo=Array.isArray;function ho(n,r,e,t){if(n=n.options,r){r={};for(var o=0;o<e.length;o++)r["$"+e[o]]=!0;for(e=0;e<n.length;e++)o=r.hasOwnProperty("$"+n[e].value),n[e].selected!==o&&(n[e].selected=o),o&&t&&(n[e].defaultSelected=!0)}else{for(e=""+pt(e),r=null,o=0;o<n.length;o++){if(n[o].value===e){n[o].selected=!0,t&&(n[o].defaultSelected=!0);return}r!==null||n[o].disabled||(r=n[o])}r!==null&&(r.selected=!0)}}function Tc(n,r){if(r.dangerouslySetInnerHTML!=null)throw Error(sn(91));return Qn({},r,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function oh(n,r){var e=r.value;if(e==null){if(e=r.children,r=r.defaultValue,e!=null){if(r!=null)throw Error(sn(92));if(qo(e)){if(1<e.length)throw Error(sn(93));e=e[0]}r=e}r==null&&(r=""),e=r}n._wrapperState={initialValue:pt(e)}}function wm(n,r){var e=pt(r.value),t=pt(r.defaultValue);e!=null&&(e=""+e,e!==n.value&&(n.value=e),r.defaultValue==null&&n.defaultValue!==e&&(n.defaultValue=e)),t!=null&&(n.defaultValue=""+t)}function ih(n){var r=n.textContent;r===n._wrapperState.initialValue&&r!==""&&r!==null&&(n.value=r)}function Sm(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ic(n,r){return n==null||n==="http://www.w3.org/1999/xhtml"?Sm(r):n==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var os,km=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,e,t,o){MSApp.execUnsafeLocalFunction(function(){return n(r,e,t,o)})}:n}(function(n,r){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=r;else{for(os=os||document.createElement("div"),os.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=os.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;r.firstChild;)n.appendChild(r.firstChild)}});function wi(n,r){if(r){var e=n.firstChild;if(e&&e===n.lastChild&&e.nodeType===3){e.nodeValue=r;return}}n.textContent=r}var ai={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},T1=["Webkit","ms","Moz","O"];Object.keys(ai).forEach(function(n){T1.forEach(function(r){r=r+n.charAt(0).toUpperCase()+n.substring(1),ai[r]=ai[n]})});function _m(n,r,e){return r==null||typeof r=="boolean"||r===""?"":e||typeof r!="number"||r===0||ai.hasOwnProperty(n)&&ai[n]?(""+r).trim():r+"px"}function bm(n,r){n=n.style;for(var e in r)if(r.hasOwnProperty(e)){var t=e.indexOf("--")===0,o=_m(e,r[e],t);e==="float"&&(e="cssFloat"),t?n.setProperty(e,o):n[e]=o}}var I1=Qn({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ec(n,r){if(r){if(I1[n]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(sn(137,n));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(sn(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(sn(61))}if(r.style!=null&&typeof r.style!="object")throw Error(sn(62))}}function Mc(n,r){if(n.indexOf("-")===-1)return typeof r.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Nc=null;function Bu(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var jc=null,fo=null,po=null;function sh(n){if(n=Vi(n)){if(typeof jc!="function")throw Error(sn(280));var r=n.stateNode;r&&(r=Ga(r),jc(n.stateNode,n.type,r))}}function Cm(n){fo?po?po.push(n):po=[n]:fo=n}function Pm(){if(fo){var n=fo,r=po;if(po=fo=null,sh(n),r)for(n=0;n<r.length;n++)sh(r[n])}}function Tm(n,r){return n(r)}function Im(){}var Pl=!1;function Em(n,r,e){if(Pl)return n(r,e);Pl=!0;try{return Tm(n,r,e)}finally{Pl=!1,(fo!==null||po!==null)&&(Im(),Pm())}}function Si(n,r){var e=n.stateNode;if(e===null)return null;var t=Ga(e);if(t===null)return null;e=t[r];n:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(t=!t.disabled)||(n=n.type,t=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!t;break n;default:n=!1}if(n)return null;if(e&&typeof e!="function")throw Error(sn(231,r,typeof e));return e}var Ac=!1;if(Re)try{var Zo={};Object.defineProperty(Zo,"passive",{get:function(){Ac=!0}}),window.addEventListener("test",Zo,Zo),window.removeEventListener("test",Zo,Zo)}catch{Ac=!1}function E1(n,r,e,t,o,i,s,a,l){var c=Array.prototype.slice.call(arguments,3);try{r.apply(e,c)}catch(d){this.onError(d)}}var li=!1,na=null,ra=!1,Oc=null,M1={onError:function(n){li=!0,na=n}};function N1(n,r,e,t,o,i,s,a,l){li=!1,na=null,E1.apply(M1,arguments)}function j1(n,r,e,t,o,i,s,a,l){if(N1.apply(this,arguments),li){if(li){var c=na;li=!1,na=null}else throw Error(sn(198));ra||(ra=!0,Oc=c)}}function Ht(n){var r=n,e=n;if(n.alternate)for(;r.return;)r=r.return;else{n=r;do r=n,r.flags&4098&&(e=r.return),n=r.return;while(n)}return r.tag===3?e:null}function Mm(n){if(n.tag===13){var r=n.memoizedState;if(r===null&&(n=n.alternate,n!==null&&(r=n.memoizedState)),r!==null)return r.dehydrated}return null}function ah(n){if(Ht(n)!==n)throw Error(sn(188))}function A1(n){var r=n.alternate;if(!r){if(r=Ht(n),r===null)throw Error(sn(188));return r!==n?null:n}for(var e=n,t=r;;){var o=e.return;if(o===null)break;var i=o.alternate;if(i===null){if(t=o.return,t!==null){e=t;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===e)return ah(o),n;if(i===t)return ah(o),r;i=i.sibling}throw Error(sn(188))}if(e.return!==t.return)e=o,t=i;else{for(var s=!1,a=o.child;a;){if(a===e){s=!0,e=o,t=i;break}if(a===t){s=!0,t=o,e=i;break}a=a.sibling}if(!s){for(a=i.child;a;){if(a===e){s=!0,e=i,t=o;break}if(a===t){s=!0,t=i,e=o;break}a=a.sibling}if(!s)throw Error(sn(189))}}if(e.alternate!==t)throw Error(sn(190))}if(e.tag!==3)throw Error(sn(188));return e.stateNode.current===e?n:r}function Nm(n){return n=A1(n),n!==null?jm(n):null}function jm(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var r=jm(n);if(r!==null)return r;n=n.sibling}return null}var Am=Gr.unstable_scheduleCallback,lh=Gr.unstable_cancelCallback,O1=Gr.unstable_shouldYield,R1=Gr.unstable_requestPaint,nr=Gr.unstable_now,L1=Gr.unstable_getCurrentPriorityLevel,Hu=Gr.unstable_ImmediatePriority,Om=Gr.unstable_UserBlockingPriority,ea=Gr.unstable_NormalPriority,D1=Gr.unstable_LowPriority,Rm=Gr.unstable_IdlePriority,za=null,Se=null;function Z1(n){if(Se&&typeof Se.onCommitFiberRoot=="function")try{Se.onCommitFiberRoot(za,n,void 0,(n.current.flags&128)===128)}catch{}}var de=Math.clz32?Math.clz32:z1,F1=Math.log,$1=Math.LN2;function z1(n){return n>>>=0,n===0?32:31-(F1(n)/$1|0)|0}var is=64,ss=4194304;function ni(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function ta(n,r){var e=n.pendingLanes;if(e===0)return 0;var t=0,o=n.suspendedLanes,i=n.pingedLanes,s=e&268435455;if(s!==0){var a=s&~o;a!==0?t=ni(a):(i&=s,i!==0&&(t=ni(i)))}else s=e&~o,s!==0?t=ni(s):i!==0&&(t=ni(i));if(t===0)return 0;if(r!==0&&r!==t&&!(r&o)&&(o=t&-t,i=r&-r,o>=i||o===16&&(i&4194240)!==0))return r;if(t&4&&(t|=e&16),r=n.entangledLanes,r!==0)for(n=n.entanglements,r&=t;0<r;)e=31-de(r),o=1<<e,t|=n[e],r&=~o;return t}function B1(n,r){switch(n){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function H1(n,r){for(var e=n.suspendedLanes,t=n.pingedLanes,o=n.expirationTimes,i=n.pendingLanes;0<i;){var s=31-de(i),a=1<<s,l=o[s];l===-1?(!(a&e)||a&t)&&(o[s]=B1(a,r)):l<=r&&(n.expiredLanes|=a),i&=~a}}function Rc(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Lm(){var n=is;return is<<=1,!(is&4194240)&&(is=64),n}function Tl(n){for(var r=[],e=0;31>e;e++)r.push(n);return r}function Wi(n,r,e){n.pendingLanes|=r,r!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,r=31-de(r),n[r]=e}function W1(n,r){var e=n.pendingLanes&~r;n.pendingLanes=r,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=r,n.mutableReadLanes&=r,n.entangledLanes&=r,r=n.entanglements;var t=n.eventTimes;for(n=n.expirationTimes;0<e;){var o=31-de(e),i=1<<o;r[o]=0,t[o]=-1,n[o]=-1,e&=~i}}function Wu(n,r){var e=n.entangledLanes|=r;for(n=n.entanglements;e;){var t=31-de(e),o=1<<t;o&r|n[t]&r&&(n[t]|=r),e&=~o}}var zn=0;function Dm(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var Zm,Gu,Fm,$m,zm,Lc=!1,as=[],ot=null,it=null,st=null,ki=new Map,_i=new Map,Ye=[],G1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ch(n,r){switch(n){case"focusin":case"focusout":ot=null;break;case"dragenter":case"dragleave":it=null;break;case"mouseover":case"mouseout":st=null;break;case"pointerover":case"pointerout":ki.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":_i.delete(r.pointerId)}}function Fo(n,r,e,t,o,i){return n===null||n.nativeEvent!==i?(n={blockedOn:r,domEventName:e,eventSystemFlags:t,nativeEvent:i,targetContainers:[o]},r!==null&&(r=Vi(r),r!==null&&Gu(r)),n):(n.eventSystemFlags|=t,r=n.targetContainers,o!==null&&r.indexOf(o)===-1&&r.push(o),n)}function V1(n,r,e,t,o){switch(r){case"focusin":return ot=Fo(ot,n,r,e,t,o),!0;case"dragenter":return it=Fo(it,n,r,e,t,o),!0;case"mouseover":return st=Fo(st,n,r,e,t,o),!0;case"pointerover":var i=o.pointerId;return ki.set(i,Fo(ki.get(i)||null,n,r,e,t,o)),!0;case"gotpointercapture":return i=o.pointerId,_i.set(i,Fo(_i.get(i)||null,n,r,e,t,o)),!0}return!1}function Bm(n){var r=Tt(n.target);if(r!==null){var e=Ht(r);if(e!==null){if(r=e.tag,r===13){if(r=Mm(e),r!==null){n.blockedOn=r,zm(n.priority,function(){Fm(e)});return}}else if(r===3&&e.stateNode.current.memoizedState.isDehydrated){n.blockedOn=e.tag===3?e.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Ds(n){if(n.blockedOn!==null)return!1;for(var r=n.targetContainers;0<r.length;){var e=Dc(n.domEventName,n.eventSystemFlags,r[0],n.nativeEvent);if(e===null){e=n.nativeEvent;var t=new e.constructor(e.type,e);Nc=t,e.target.dispatchEvent(t),Nc=null}else return r=Vi(e),r!==null&&Gu(r),n.blockedOn=e,!1;r.shift()}return!0}function uh(n,r,e){Ds(n)&&e.delete(r)}function U1(){Lc=!1,ot!==null&&Ds(ot)&&(ot=null),it!==null&&Ds(it)&&(it=null),st!==null&&Ds(st)&&(st=null),ki.forEach(uh),_i.forEach(uh)}function $o(n,r){n.blockedOn===r&&(n.blockedOn=null,Lc||(Lc=!0,Gr.unstable_scheduleCallback(Gr.unstable_NormalPriority,U1)))}function bi(n){function r(o){return $o(o,n)}if(0<as.length){$o(as[0],n);for(var e=1;e<as.length;e++){var t=as[e];t.blockedOn===n&&(t.blockedOn=null)}}for(ot!==null&&$o(ot,n),it!==null&&$o(it,n),st!==null&&$o(st,n),ki.forEach(r),_i.forEach(r),e=0;e<Ye.length;e++)t=Ye[e],t.blockedOn===n&&(t.blockedOn=null);for(;0<Ye.length&&(e=Ye[0],e.blockedOn===null);)Bm(e),e.blockedOn===null&&Ye.shift()}var mo=Be.ReactCurrentBatchConfig,oa=!0;function K1(n,r,e,t){var o=zn,i=mo.transition;mo.transition=null;try{zn=1,Vu(n,r,e,t)}finally{zn=o,mo.transition=i}}function X1(n,r,e,t){var o=zn,i=mo.transition;mo.transition=null;try{zn=4,Vu(n,r,e,t)}finally{zn=o,mo.transition=i}}function Vu(n,r,e,t){if(oa){var o=Dc(n,r,e,t);if(o===null)Dl(n,r,t,ia,e),ch(n,t);else if(V1(o,n,r,e,t))t.stopPropagation();else if(ch(n,t),r&4&&-1<G1.indexOf(n)){for(;o!==null;){var i=Vi(o);if(i!==null&&Zm(i),i=Dc(n,r,e,t),i===null&&Dl(n,r,t,ia,e),i===o)break;o=i}o!==null&&t.stopPropagation()}else Dl(n,r,t,null,e)}}var ia=null;function Dc(n,r,e,t){if(ia=null,n=Bu(t),n=Tt(n),n!==null)if(r=Ht(n),r===null)n=null;else if(e=r.tag,e===13){if(n=Mm(r),n!==null)return n;n=null}else if(e===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;n=null}else r!==n&&(n=null);return ia=n,null}function Hm(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(L1()){case Hu:return 1;case Om:return 4;case ea:case D1:return 16;case Rm:return 536870912;default:return 16}default:return 16}}var nt=null,Uu=null,Zs=null;function Wm(){if(Zs)return Zs;var n,r=Uu,e=r.length,t,o="value"in nt?nt.value:nt.textContent,i=o.length;for(n=0;n<e&&r[n]===o[n];n++);var s=e-n;for(t=1;t<=s&&r[e-t]===o[i-t];t++);return Zs=o.slice(n,1<t?1-t:void 0)}function Fs(n){var r=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&r===13&&(n=13)):n=r,n===10&&(n=13),32<=n||n===13?n:0}function ls(){return!0}function dh(){return!1}function Kr(n){function r(e,t,o,i,s){this._reactName=e,this._targetInst=o,this.type=t,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(e=n[a],this[a]=e?e(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ls:dh,this.isPropagationStopped=dh,this}return Qn(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!="unknown"&&(e.returnValue=!1),this.isDefaultPrevented=ls)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!="unknown"&&(e.cancelBubble=!0),this.isPropagationStopped=ls)},persist:function(){},isPersistent:ls}),r}var jo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ku=Kr(jo),Gi=Qn({},jo,{view:0,detail:0}),Y1=Kr(Gi),Il,El,zo,Ba=Qn({},Gi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Xu,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==zo&&(zo&&n.type==="mousemove"?(Il=n.screenX-zo.screenX,El=n.screenY-zo.screenY):El=Il=0,zo=n),Il)},movementY:function(n){return"movementY"in n?n.movementY:El}}),hh=Kr(Ba),Q1=Qn({},Ba,{dataTransfer:0}),J1=Kr(Q1),q1=Qn({},Gi,{relatedTarget:0}),Ml=Kr(q1),nv=Qn({},jo,{animationName:0,elapsedTime:0,pseudoElement:0}),rv=Kr(nv),ev=Qn({},jo,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),tv=Kr(ev),ov=Qn({},jo,{data:0}),fh=Kr(ov),iv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},av={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lv(n){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(n):(n=av[n])?!!r[n]:!1}function Xu(){return lv}var cv=Qn({},Gi,{key:function(n){if(n.key){var r=iv[n.key]||n.key;if(r!=="Unidentified")return r}return n.type==="keypress"?(n=Fs(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?sv[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Xu,charCode:function(n){return n.type==="keypress"?Fs(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Fs(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),uv=Kr(cv),dv=Qn({},Ba,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ph=Kr(dv),hv=Qn({},Gi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Xu}),fv=Kr(hv),pv=Qn({},jo,{propertyName:0,elapsedTime:0,pseudoElement:0}),mv=Kr(pv),gv=Qn({},Ba,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),yv=Kr(gv),vv=[9,13,27,32],Yu=Re&&"CompositionEvent"in window,ci=null;Re&&"documentMode"in document&&(ci=document.documentMode);var xv=Re&&"TextEvent"in window&&!ci,Gm=Re&&(!Yu||ci&&8<ci&&11>=ci),mh=" ",gh=!1;function Vm(n,r){switch(n){case"keyup":return vv.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Um(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var no=!1;function wv(n,r){switch(n){case"compositionend":return Um(r);case"keypress":return r.which!==32?null:(gh=!0,mh);case"textInput":return n=r.data,n===mh&&gh?null:n;default:return null}}function Sv(n,r){if(no)return n==="compositionend"||!Yu&&Vm(n,r)?(n=Wm(),Zs=Uu=nt=null,no=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return Gm&&r.locale!=="ko"?null:r.data;default:return null}}var kv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function yh(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r==="input"?!!kv[n.type]:r==="textarea"}function Km(n,r,e,t){Cm(t),r=sa(r,"onChange"),0<r.length&&(e=new Ku("onChange","change",null,e,t),n.push({event:e,listeners:r}))}var ui=null,Ci=null;function _v(n){ig(n,0)}function Ha(n){var r=to(n);if(vm(r))return n}function bv(n,r){if(n==="change")return r}var Xm=!1;if(Re){var Nl;if(Re){var jl="oninput"in document;if(!jl){var vh=document.createElement("div");vh.setAttribute("oninput","return;"),jl=typeof vh.oninput=="function"}Nl=jl}else Nl=!1;Xm=Nl&&(!document.documentMode||9<document.documentMode)}function xh(){ui&&(ui.detachEvent("onpropertychange",Ym),Ci=ui=null)}function Ym(n){if(n.propertyName==="value"&&Ha(Ci)){var r=[];Km(r,Ci,n,Bu(n)),Em(_v,r)}}function Cv(n,r,e){n==="focusin"?(xh(),ui=r,Ci=e,ui.attachEvent("onpropertychange",Ym)):n==="focusout"&&xh()}function Pv(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ha(Ci)}function Tv(n,r){if(n==="click")return Ha(r)}function Iv(n,r){if(n==="input"||n==="change")return Ha(r)}function Ev(n,r){return n===r&&(n!==0||1/n===1/r)||n!==n&&r!==r}var pe=typeof Object.is=="function"?Object.is:Ev;function Pi(n,r){if(pe(n,r))return!0;if(typeof n!="object"||n===null||typeof r!="object"||r===null)return!1;var e=Object.keys(n),t=Object.keys(r);if(e.length!==t.length)return!1;for(t=0;t<e.length;t++){var o=e[t];if(!xc.call(r,o)||!pe(n[o],r[o]))return!1}return!0}function wh(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Sh(n,r){var e=wh(n);n=0;for(var t;e;){if(e.nodeType===3){if(t=n+e.textContent.length,n<=r&&t>=r)return{node:e,offset:r-n};n=t}n:{for(;e;){if(e.nextSibling){e=e.nextSibling;break n}e=e.parentNode}e=void 0}e=wh(e)}}function Qm(n,r){return n&&r?n===r?!0:n&&n.nodeType===3?!1:r&&r.nodeType===3?Qm(n,r.parentNode):"contains"in n?n.contains(r):n.compareDocumentPosition?!!(n.compareDocumentPosition(r)&16):!1:!1}function Jm(){for(var n=window,r=qs();r instanceof n.HTMLIFrameElement;){try{var e=typeof r.contentWindow.location.href=="string"}catch{e=!1}if(e)n=r.contentWindow;else break;r=qs(n.document)}return r}function Qu(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r&&(r==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||r==="textarea"||n.contentEditable==="true")}function Mv(n){var r=Jm(),e=n.focusedElem,t=n.selectionRange;if(r!==e&&e&&e.ownerDocument&&Qm(e.ownerDocument.documentElement,e)){if(t!==null&&Qu(e)){if(r=t.start,n=t.end,n===void 0&&(n=r),"selectionStart"in e)e.selectionStart=r,e.selectionEnd=Math.min(n,e.value.length);else if(n=(r=e.ownerDocument||document)&&r.defaultView||window,n.getSelection){n=n.getSelection();var o=e.textContent.length,i=Math.min(t.start,o);t=t.end===void 0?i:Math.min(t.end,o),!n.extend&&i>t&&(o=t,t=i,i=o),o=Sh(e,i);var s=Sh(e,t);o&&s&&(n.rangeCount!==1||n.anchorNode!==o.node||n.anchorOffset!==o.offset||n.focusNode!==s.node||n.focusOffset!==s.offset)&&(r=r.createRange(),r.setStart(o.node,o.offset),n.removeAllRanges(),i>t?(n.addRange(r),n.extend(s.node,s.offset)):(r.setEnd(s.node,s.offset),n.addRange(r)))}}for(r=[],n=e;n=n.parentNode;)n.nodeType===1&&r.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof e.focus=="function"&&e.focus(),e=0;e<r.length;e++)n=r[e],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Nv=Re&&"documentMode"in document&&11>=document.documentMode,ro=null,Zc=null,di=null,Fc=!1;function kh(n,r,e){var t=e.window===e?e.document:e.nodeType===9?e:e.ownerDocument;Fc||ro==null||ro!==qs(t)||(t=ro,"selectionStart"in t&&Qu(t)?t={start:t.selectionStart,end:t.selectionEnd}:(t=(t.ownerDocument&&t.ownerDocument.defaultView||window).getSelection(),t={anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}),di&&Pi(di,t)||(di=t,t=sa(Zc,"onSelect"),0<t.length&&(r=new Ku("onSelect","select",null,r,e),n.push({event:r,listeners:t}),r.target=ro)))}function cs(n,r){var e={};return e[n.toLowerCase()]=r.toLowerCase(),e["Webkit"+n]="webkit"+r,e["Moz"+n]="moz"+r,e}var eo={animationend:cs("Animation","AnimationEnd"),animationiteration:cs("Animation","AnimationIteration"),animationstart:cs("Animation","AnimationStart"),transitionend:cs("Transition","TransitionEnd")},Al={},qm={};Re&&(qm=document.createElement("div").style,"AnimationEvent"in window||(delete eo.animationend.animation,delete eo.animationiteration.animation,delete eo.animationstart.animation),"TransitionEvent"in window||delete eo.transitionend.transition);function Wa(n){if(Al[n])return Al[n];if(!eo[n])return n;var r=eo[n],e;for(e in r)if(r.hasOwnProperty(e)&&e in qm)return Al[n]=r[e];return n}var ng=Wa("animationend"),rg=Wa("animationiteration"),eg=Wa("animationstart"),tg=Wa("transitionend"),og=new Map,_h="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yt(n,r){og.set(n,r),Bt(r,[n])}for(var Ol=0;Ol<_h.length;Ol++){var Rl=_h[Ol],jv=Rl.toLowerCase(),Av=Rl[0].toUpperCase()+Rl.slice(1);yt(jv,"on"+Av)}yt(ng,"onAnimationEnd");yt(rg,"onAnimationIteration");yt(eg,"onAnimationStart");yt("dblclick","onDoubleClick");yt("focusin","onFocus");yt("focusout","onBlur");yt(tg,"onTransitionEnd");So("onMouseEnter",["mouseout","mouseover"]);So("onMouseLeave",["mouseout","mouseover"]);So("onPointerEnter",["pointerout","pointerover"]);So("onPointerLeave",["pointerout","pointerover"]);Bt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Bt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Bt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Bt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Bt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Bt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ov=new Set("cancel close invalid load scroll toggle".split(" ").concat(ri));function bh(n,r,e){var t=n.type||"unknown-event";n.currentTarget=e,j1(t,r,void 0,n),n.currentTarget=null}function ig(n,r){r=(r&4)!==0;for(var e=0;e<n.length;e++){var t=n[e],o=t.event;t=t.listeners;n:{var i=void 0;if(r)for(var s=t.length-1;0<=s;s--){var a=t[s],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==i&&o.isPropagationStopped())break n;bh(o,a,c),i=l}else for(s=0;s<t.length;s++){if(a=t[s],l=a.instance,c=a.currentTarget,a=a.listener,l!==i&&o.isPropagationStopped())break n;bh(o,a,c),i=l}}}if(ra)throw n=Oc,ra=!1,Oc=null,n}function Vn(n,r){var e=r[Wc];e===void 0&&(e=r[Wc]=new Set);var t=n+"__bubble";e.has(t)||(sg(r,n,2,!1),e.add(t))}function Ll(n,r,e){var t=0;r&&(t|=4),sg(e,n,t,r)}var us="_reactListening"+Math.random().toString(36).slice(2);function Ti(n){if(!n[us]){n[us]=!0,fm.forEach(function(e){e!=="selectionchange"&&(Ov.has(e)||Ll(e,!1,n),Ll(e,!0,n))});var r=n.nodeType===9?n:n.ownerDocument;r===null||r[us]||(r[us]=!0,Ll("selectionchange",!1,r))}}function sg(n,r,e,t){switch(Hm(r)){case 1:var o=K1;break;case 4:o=X1;break;default:o=Vu}e=o.bind(null,r,e,n),o=void 0,!Ac||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(o=!0),t?o!==void 0?n.addEventListener(r,e,{capture:!0,passive:o}):n.addEventListener(r,e,!0):o!==void 0?n.addEventListener(r,e,{passive:o}):n.addEventListener(r,e,!1)}function Dl(n,r,e,t,o){var i=t;if(!(r&1)&&!(r&2)&&t!==null)n:for(;;){if(t===null)return;var s=t.tag;if(s===3||s===4){var a=t.stateNode.containerInfo;if(a===o||a.nodeType===8&&a.parentNode===o)break;if(s===4)for(s=t.return;s!==null;){var l=s.tag;if((l===3||l===4)&&(l=s.stateNode.containerInfo,l===o||l.nodeType===8&&l.parentNode===o))return;s=s.return}for(;a!==null;){if(s=Tt(a),s===null)return;if(l=s.tag,l===5||l===6){t=i=s;continue n}a=a.parentNode}}t=t.return}Em(function(){var c=i,d=Bu(e),h=[];n:{var f=og.get(n);if(f!==void 0){var m=Ku,y=n;switch(n){case"keypress":if(Fs(e)===0)break n;case"keydown":case"keyup":m=uv;break;case"focusin":y="focus",m=Ml;break;case"focusout":y="blur",m=Ml;break;case"beforeblur":case"afterblur":m=Ml;break;case"click":if(e.button===2)break n;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=hh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=J1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=fv;break;case ng:case rg:case eg:m=rv;break;case tg:m=mv;break;case"scroll":m=Y1;break;case"wheel":m=yv;break;case"copy":case"cut":case"paste":m=tv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=ph}var v=(r&4)!==0,A=!v&&n==="scroll",g=v?f!==null?f+"Capture":null:f;v=[];for(var p=c,x;p!==null;){x=p;var S=x.stateNode;if(x.tag===5&&S!==null&&(x=S,g!==null&&(S=Si(p,g),S!=null&&v.push(Ii(p,S,x)))),A)break;p=p.return}0<v.length&&(f=new m(f,y,null,e,d),h.push({event:f,listeners:v}))}}if(!(r&7)){n:{if(f=n==="mouseover"||n==="pointerover",m=n==="mouseout"||n==="pointerout",f&&e!==Nc&&(y=e.relatedTarget||e.fromElement)&&(Tt(y)||y[Le]))break n;if((m||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,m?(y=e.relatedTarget||e.toElement,m=c,y=y?Tt(y):null,y!==null&&(A=Ht(y),y!==A||y.tag!==5&&y.tag!==6)&&(y=null)):(m=null,y=c),m!==y)){if(v=hh,S="onMouseLeave",g="onMouseEnter",p="mouse",(n==="pointerout"||n==="pointerover")&&(v=ph,S="onPointerLeave",g="onPointerEnter",p="pointer"),A=m==null?f:to(m),x=y==null?f:to(y),f=new v(S,p+"leave",m,e,d),f.target=A,f.relatedTarget=x,S=null,Tt(d)===c&&(v=new v(g,p+"enter",y,e,d),v.target=x,v.relatedTarget=A,S=v),A=S,m&&y)r:{for(v=m,g=y,p=0,x=v;x;x=Ut(x))p++;for(x=0,S=g;S;S=Ut(S))x++;for(;0<p-x;)v=Ut(v),p--;for(;0<x-p;)g=Ut(g),x--;for(;p--;){if(v===g||g!==null&&v===g.alternate)break r;v=Ut(v),g=Ut(g)}v=null}else v=null;m!==null&&Ch(h,f,m,v,!1),y!==null&&A!==null&&Ch(h,A,y,v,!0)}}n:{if(f=c?to(c):window,m=f.nodeName&&f.nodeName.toLowerCase(),m==="select"||m==="input"&&f.type==="file")var b=bv;else if(yh(f))if(Xm)b=Iv;else{b=Pv;var O=Cv}else(m=f.nodeName)&&m.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(b=Tv);if(b&&(b=b(n,c))){Km(h,b,e,d);break n}O&&O(n,f,c),n==="focusout"&&(O=f._wrapperState)&&O.controlled&&f.type==="number"&&Pc(f,"number",f.value)}switch(O=c?to(c):window,n){case"focusin":(yh(O)||O.contentEditable==="true")&&(ro=O,Zc=c,di=null);break;case"focusout":di=Zc=ro=null;break;case"mousedown":Fc=!0;break;case"contextmenu":case"mouseup":case"dragend":Fc=!1,kh(h,e,d);break;case"selectionchange":if(Nv)break;case"keydown":case"keyup":kh(h,e,d)}var E;if(Yu)n:{switch(n){case"compositionstart":var Z="onCompositionStart";break n;case"compositionend":Z="onCompositionEnd";break n;case"compositionupdate":Z="onCompositionUpdate";break n}Z=void 0}else no?Vm(n,e)&&(Z="onCompositionEnd"):n==="keydown"&&e.keyCode===229&&(Z="onCompositionStart");Z&&(Gm&&e.locale!=="ko"&&(no||Z!=="onCompositionStart"?Z==="onCompositionEnd"&&no&&(E=Wm()):(nt=d,Uu="value"in nt?nt.value:nt.textContent,no=!0)),O=sa(c,Z),0<O.length&&(Z=new fh(Z,n,null,e,d),h.push({event:Z,listeners:O}),E?Z.data=E:(E=Um(e),E!==null&&(Z.data=E)))),(E=xv?wv(n,e):Sv(n,e))&&(c=sa(c,"onBeforeInput"),0<c.length&&(d=new fh("onBeforeInput","beforeinput",null,e,d),h.push({event:d,listeners:c}),d.data=E))}ig(h,r)})}function Ii(n,r,e){return{instance:n,listener:r,currentTarget:e}}function sa(n,r){for(var e=r+"Capture",t=[];n!==null;){var o=n,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Si(n,e),i!=null&&t.unshift(Ii(n,i,o)),i=Si(n,r),i!=null&&t.push(Ii(n,i,o))),n=n.return}return t}function Ut(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Ch(n,r,e,t,o){for(var i=r._reactName,s=[];e!==null&&e!==t;){var a=e,l=a.alternate,c=a.stateNode;if(l!==null&&l===t)break;a.tag===5&&c!==null&&(a=c,o?(l=Si(e,i),l!=null&&s.unshift(Ii(e,l,a))):o||(l=Si(e,i),l!=null&&s.push(Ii(e,l,a)))),e=e.return}s.length!==0&&n.push({event:r,listeners:s})}var Rv=/\r\n?/g,Lv=/\u0000|\uFFFD/g;function Ph(n){return(typeof n=="string"?n:""+n).replace(Rv,`
`).replace(Lv,"")}function ds(n,r,e){if(r=Ph(r),Ph(n)!==r&&e)throw Error(sn(425))}function aa(){}var $c=null,zc=null;function Bc(n,r){return n==="textarea"||n==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var Hc=typeof setTimeout=="function"?setTimeout:void 0,Dv=typeof clearTimeout=="function"?clearTimeout:void 0,Th=typeof Promise=="function"?Promise:void 0,Zv=typeof queueMicrotask=="function"?queueMicrotask:typeof Th<"u"?function(n){return Th.resolve(null).then(n).catch(Fv)}:Hc;function Fv(n){setTimeout(function(){throw n})}function Zl(n,r){var e=r,t=0;do{var o=e.nextSibling;if(n.removeChild(e),o&&o.nodeType===8)if(e=o.data,e==="/$"){if(t===0){n.removeChild(o),bi(r);return}t--}else e!=="$"&&e!=="$?"&&e!=="$!"||t++;e=o}while(e);bi(r)}function at(n){for(;n!=null;n=n.nextSibling){var r=n.nodeType;if(r===1||r===3)break;if(r===8){if(r=n.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return n}function Ih(n){n=n.previousSibling;for(var r=0;n;){if(n.nodeType===8){var e=n.data;if(e==="$"||e==="$!"||e==="$?"){if(r===0)return n;r--}else e==="/$"&&r++}n=n.previousSibling}return null}var Ao=Math.random().toString(36).slice(2),we="__reactFiber$"+Ao,Ei="__reactProps$"+Ao,Le="__reactContainer$"+Ao,Wc="__reactEvents$"+Ao,$v="__reactListeners$"+Ao,zv="__reactHandles$"+Ao;function Tt(n){var r=n[we];if(r)return r;for(var e=n.parentNode;e;){if(r=e[Le]||e[we]){if(e=r.alternate,r.child!==null||e!==null&&e.child!==null)for(n=Ih(n);n!==null;){if(e=n[we])return e;n=Ih(n)}return r}n=e,e=n.parentNode}return null}function Vi(n){return n=n[we]||n[Le],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function to(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(sn(33))}function Ga(n){return n[Ei]||null}var Gc=[],oo=-1;function vt(n){return{current:n}}function Un(n){0>oo||(n.current=Gc[oo],Gc[oo]=null,oo--)}function Wn(n,r){oo++,Gc[oo]=n.current,n.current=r}var mt={},Sr=vt(mt),Dr=vt(!1),Rt=mt;function ko(n,r){var e=n.type.contextTypes;if(!e)return mt;var t=n.stateNode;if(t&&t.__reactInternalMemoizedUnmaskedChildContext===r)return t.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in e)o[i]=r[i];return t&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=o),o}function Zr(n){return n=n.childContextTypes,n!=null}function la(){Un(Dr),Un(Sr)}function Eh(n,r,e){if(Sr.current!==mt)throw Error(sn(168));Wn(Sr,r),Wn(Dr,e)}function ag(n,r,e){var t=n.stateNode;if(r=r.childContextTypes,typeof t.getChildContext!="function")return e;t=t.getChildContext();for(var o in t)if(!(o in r))throw Error(sn(108,C1(n)||"Unknown",o));return Qn({},e,t)}function ca(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||mt,Rt=Sr.current,Wn(Sr,n),Wn(Dr,Dr.current),!0}function Mh(n,r,e){var t=n.stateNode;if(!t)throw Error(sn(169));e?(n=ag(n,r,Rt),t.__reactInternalMemoizedMergedChildContext=n,Un(Dr),Un(Sr),Wn(Sr,n)):Un(Dr),Wn(Dr,e)}var Ie=null,Va=!1,Fl=!1;function lg(n){Ie===null?Ie=[n]:Ie.push(n)}function Bv(n){Va=!0,lg(n)}function xt(){if(!Fl&&Ie!==null){Fl=!0;var n=0,r=zn;try{var e=Ie;for(zn=1;n<e.length;n++){var t=e[n];do t=t(!0);while(t!==null)}Ie=null,Va=!1}catch(o){throw Ie!==null&&(Ie=Ie.slice(n+1)),Am(Hu,xt),o}finally{zn=r,Fl=!1}}return null}var io=[],so=0,ua=null,da=0,Qr=[],Jr=0,Lt=null,Me=1,Ne="";function Ct(n,r){io[so++]=da,io[so++]=ua,ua=n,da=r}function cg(n,r,e){Qr[Jr++]=Me,Qr[Jr++]=Ne,Qr[Jr++]=Lt,Lt=n;var t=Me;n=Ne;var o=32-de(t)-1;t&=~(1<<o),e+=1;var i=32-de(r)+o;if(30<i){var s=o-o%5;i=(t&(1<<s)-1).toString(32),t>>=s,o-=s,Me=1<<32-de(r)+o|e<<o|t,Ne=i+n}else Me=1<<i|e<<o|t,Ne=n}function Ju(n){n.return!==null&&(Ct(n,1),cg(n,1,0))}function qu(n){for(;n===ua;)ua=io[--so],io[so]=null,da=io[--so],io[so]=null;for(;n===Lt;)Lt=Qr[--Jr],Qr[Jr]=null,Ne=Qr[--Jr],Qr[Jr]=null,Me=Qr[--Jr],Qr[Jr]=null}var Wr=null,Hr=null,Kn=!1,le=null;function ug(n,r){var e=qr(5,null,null,0);e.elementType="DELETED",e.stateNode=r,e.return=n,r=n.deletions,r===null?(n.deletions=[e],n.flags|=16):r.push(e)}function Nh(n,r){switch(n.tag){case 5:var e=n.type;return r=r.nodeType!==1||e.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(n.stateNode=r,Wr=n,Hr=at(r.firstChild),!0):!1;case 6:return r=n.pendingProps===""||r.nodeType!==3?null:r,r!==null?(n.stateNode=r,Wr=n,Hr=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(e=Lt!==null?{id:Me,overflow:Ne}:null,n.memoizedState={dehydrated:r,treeContext:e,retryLane:1073741824},e=qr(18,null,null,0),e.stateNode=r,e.return=n,n.child=e,Wr=n,Hr=null,!0):!1;default:return!1}}function Vc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Uc(n){if(Kn){var r=Hr;if(r){var e=r;if(!Nh(n,r)){if(Vc(n))throw Error(sn(418));r=at(e.nextSibling);var t=Wr;r&&Nh(n,r)?ug(t,e):(n.flags=n.flags&-4097|2,Kn=!1,Wr=n)}}else{if(Vc(n))throw Error(sn(418));n.flags=n.flags&-4097|2,Kn=!1,Wr=n}}}function jh(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Wr=n}function hs(n){if(n!==Wr)return!1;if(!Kn)return jh(n),Kn=!0,!1;var r;if((r=n.tag!==3)&&!(r=n.tag!==5)&&(r=n.type,r=r!=="head"&&r!=="body"&&!Bc(n.type,n.memoizedProps)),r&&(r=Hr)){if(Vc(n))throw dg(),Error(sn(418));for(;r;)ug(n,r),r=at(r.nextSibling)}if(jh(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(sn(317));n:{for(n=n.nextSibling,r=0;n;){if(n.nodeType===8){var e=n.data;if(e==="/$"){if(r===0){Hr=at(n.nextSibling);break n}r--}else e!=="$"&&e!=="$!"&&e!=="$?"||r++}n=n.nextSibling}Hr=null}}else Hr=Wr?at(n.stateNode.nextSibling):null;return!0}function dg(){for(var n=Hr;n;)n=at(n.nextSibling)}function _o(){Hr=Wr=null,Kn=!1}function nd(n){le===null?le=[n]:le.push(n)}var Hv=Be.ReactCurrentBatchConfig;function Bo(n,r,e){if(n=e.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(e._owner){if(e=e._owner,e){if(e.tag!==1)throw Error(sn(309));var t=e.stateNode}if(!t)throw Error(sn(147,n));var o=t,i=""+n;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===i?r.ref:(r=function(s){var a=o.refs;s===null?delete a[i]:a[i]=s},r._stringRef=i,r)}if(typeof n!="string")throw Error(sn(284));if(!e._owner)throw Error(sn(290,n))}return n}function fs(n,r){throw n=Object.prototype.toString.call(r),Error(sn(31,n==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":n))}function Ah(n){var r=n._init;return r(n._payload)}function hg(n){function r(g,p){if(n){var x=g.deletions;x===null?(g.deletions=[p],g.flags|=16):x.push(p)}}function e(g,p){if(!n)return null;for(;p!==null;)r(g,p),p=p.sibling;return null}function t(g,p){for(g=new Map;p!==null;)p.key!==null?g.set(p.key,p):g.set(p.index,p),p=p.sibling;return g}function o(g,p){return g=dt(g,p),g.index=0,g.sibling=null,g}function i(g,p,x){return g.index=x,n?(x=g.alternate,x!==null?(x=x.index,x<p?(g.flags|=2,p):x):(g.flags|=2,p)):(g.flags|=1048576,p)}function s(g){return n&&g.alternate===null&&(g.flags|=2),g}function a(g,p,x,S){return p===null||p.tag!==6?(p=Vl(x,g.mode,S),p.return=g,p):(p=o(p,x),p.return=g,p)}function l(g,p,x,S){var b=x.type;return b===qt?d(g,p,x.props.children,S,x.key):p!==null&&(p.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ue&&Ah(b)===p.type)?(S=o(p,x.props),S.ref=Bo(g,p,x),S.return=g,S):(S=Vs(x.type,x.key,x.props,null,g.mode,S),S.ref=Bo(g,p,x),S.return=g,S)}function c(g,p,x,S){return p===null||p.tag!==4||p.stateNode.containerInfo!==x.containerInfo||p.stateNode.implementation!==x.implementation?(p=Ul(x,g.mode,S),p.return=g,p):(p=o(p,x.children||[]),p.return=g,p)}function d(g,p,x,S,b){return p===null||p.tag!==7?(p=jt(x,g.mode,S,b),p.return=g,p):(p=o(p,x),p.return=g,p)}function h(g,p,x){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Vl(""+p,g.mode,x),p.return=g,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case es:return x=Vs(p.type,p.key,p.props,null,g.mode,x),x.ref=Bo(g,null,p),x.return=g,x;case Jt:return p=Ul(p,g.mode,x),p.return=g,p;case Ue:var S=p._init;return h(g,S(p._payload),x)}if(qo(p)||Do(p))return p=jt(p,g.mode,x,null),p.return=g,p;fs(g,p)}return null}function f(g,p,x,S){var b=p!==null?p.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return b!==null?null:a(g,p,""+x,S);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case es:return x.key===b?l(g,p,x,S):null;case Jt:return x.key===b?c(g,p,x,S):null;case Ue:return b=x._init,f(g,p,b(x._payload),S)}if(qo(x)||Do(x))return b!==null?null:d(g,p,x,S,null);fs(g,x)}return null}function m(g,p,x,S,b){if(typeof S=="string"&&S!==""||typeof S=="number")return g=g.get(x)||null,a(p,g,""+S,b);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case es:return g=g.get(S.key===null?x:S.key)||null,l(p,g,S,b);case Jt:return g=g.get(S.key===null?x:S.key)||null,c(p,g,S,b);case Ue:var O=S._init;return m(g,p,x,O(S._payload),b)}if(qo(S)||Do(S))return g=g.get(x)||null,d(p,g,S,b,null);fs(p,S)}return null}function y(g,p,x,S){for(var b=null,O=null,E=p,Z=p=0,F=null;E!==null&&Z<x.length;Z++){E.index>Z?(F=E,E=null):F=E.sibling;var K=f(g,E,x[Z],S);if(K===null){E===null&&(E=F);break}n&&E&&K.alternate===null&&r(g,E),p=i(K,p,Z),O===null?b=K:O.sibling=K,O=K,E=F}if(Z===x.length)return e(g,E),Kn&&Ct(g,Z),b;if(E===null){for(;Z<x.length;Z++)E=h(g,x[Z],S),E!==null&&(p=i(E,p,Z),O===null?b=E:O.sibling=E,O=E);return Kn&&Ct(g,Z),b}for(E=t(g,E);Z<x.length;Z++)F=m(E,g,Z,x[Z],S),F!==null&&(n&&F.alternate!==null&&E.delete(F.key===null?Z:F.key),p=i(F,p,Z),O===null?b=F:O.sibling=F,O=F);return n&&E.forEach(function(I){return r(g,I)}),Kn&&Ct(g,Z),b}function v(g,p,x,S){var b=Do(x);if(typeof b!="function")throw Error(sn(150));if(x=b.call(x),x==null)throw Error(sn(151));for(var O=b=null,E=p,Z=p=0,F=null,K=x.next();E!==null&&!K.done;Z++,K=x.next()){E.index>Z?(F=E,E=null):F=E.sibling;var I=f(g,E,K.value,S);if(I===null){E===null&&(E=F);break}n&&E&&I.alternate===null&&r(g,E),p=i(I,p,Z),O===null?b=I:O.sibling=I,O=I,E=F}if(K.done)return e(g,E),Kn&&Ct(g,Z),b;if(E===null){for(;!K.done;Z++,K=x.next())K=h(g,K.value,S),K!==null&&(p=i(K,p,Z),O===null?b=K:O.sibling=K,O=K);return Kn&&Ct(g,Z),b}for(E=t(g,E);!K.done;Z++,K=x.next())K=m(E,g,Z,K.value,S),K!==null&&(n&&K.alternate!==null&&E.delete(K.key===null?Z:K.key),p=i(K,p,Z),O===null?b=K:O.sibling=K,O=K);return n&&E.forEach(function(Y){return r(g,Y)}),Kn&&Ct(g,Z),b}function A(g,p,x,S){if(typeof x=="object"&&x!==null&&x.type===qt&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case es:n:{for(var b=x.key,O=p;O!==null;){if(O.key===b){if(b=x.type,b===qt){if(O.tag===7){e(g,O.sibling),p=o(O,x.props.children),p.return=g,g=p;break n}}else if(O.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ue&&Ah(b)===O.type){e(g,O.sibling),p=o(O,x.props),p.ref=Bo(g,O,x),p.return=g,g=p;break n}e(g,O);break}else r(g,O);O=O.sibling}x.type===qt?(p=jt(x.props.children,g.mode,S,x.key),p.return=g,g=p):(S=Vs(x.type,x.key,x.props,null,g.mode,S),S.ref=Bo(g,p,x),S.return=g,g=S)}return s(g);case Jt:n:{for(O=x.key;p!==null;){if(p.key===O)if(p.tag===4&&p.stateNode.containerInfo===x.containerInfo&&p.stateNode.implementation===x.implementation){e(g,p.sibling),p=o(p,x.children||[]),p.return=g,g=p;break n}else{e(g,p);break}else r(g,p);p=p.sibling}p=Ul(x,g.mode,S),p.return=g,g=p}return s(g);case Ue:return O=x._init,A(g,p,O(x._payload),S)}if(qo(x))return y(g,p,x,S);if(Do(x))return v(g,p,x,S);fs(g,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,p!==null&&p.tag===6?(e(g,p.sibling),p=o(p,x),p.return=g,g=p):(e(g,p),p=Vl(x,g.mode,S),p.return=g,g=p),s(g)):e(g,p)}return A}var bo=hg(!0),fg=hg(!1),ha=vt(null),fa=null,ao=null,rd=null;function ed(){rd=ao=fa=null}function td(n){var r=ha.current;Un(ha),n._currentValue=r}function Kc(n,r,e){for(;n!==null;){var t=n.alternate;if((n.childLanes&r)!==r?(n.childLanes|=r,t!==null&&(t.childLanes|=r)):t!==null&&(t.childLanes&r)!==r&&(t.childLanes|=r),n===e)break;n=n.return}}function go(n,r){fa=n,rd=ao=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&r&&(Rr=!0),n.firstContext=null)}function ee(n){var r=n._currentValue;if(rd!==n)if(n={context:n,memoizedValue:r,next:null},ao===null){if(fa===null)throw Error(sn(308));ao=n,fa.dependencies={lanes:0,firstContext:n}}else ao=ao.next=n;return r}var It=null;function od(n){It===null?It=[n]:It.push(n)}function pg(n,r,e,t){var o=r.interleaved;return o===null?(e.next=e,od(r)):(e.next=o.next,o.next=e),r.interleaved=e,De(n,t)}function De(n,r){n.lanes|=r;var e=n.alternate;for(e!==null&&(e.lanes|=r),e=n,n=n.return;n!==null;)n.childLanes|=r,e=n.alternate,e!==null&&(e.childLanes|=r),e=n,n=n.return;return e.tag===3?e.stateNode:null}var Ke=!1;function id(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function mg(n,r){n=n.updateQueue,r.updateQueue===n&&(r.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Ae(n,r){return{eventTime:n,lane:r,tag:0,payload:null,callback:null,next:null}}function lt(n,r,e){var t=n.updateQueue;if(t===null)return null;if(t=t.shared,Zn&2){var o=t.pending;return o===null?r.next=r:(r.next=o.next,o.next=r),t.pending=r,De(n,e)}return o=t.interleaved,o===null?(r.next=r,od(t)):(r.next=o.next,o.next=r),t.interleaved=r,De(n,e)}function $s(n,r,e){if(r=r.updateQueue,r!==null&&(r=r.shared,(e&4194240)!==0)){var t=r.lanes;t&=n.pendingLanes,e|=t,r.lanes=e,Wu(n,e)}}function Oh(n,r){var e=n.updateQueue,t=n.alternate;if(t!==null&&(t=t.updateQueue,e===t)){var o=null,i=null;if(e=e.firstBaseUpdate,e!==null){do{var s={eventTime:e.eventTime,lane:e.lane,tag:e.tag,payload:e.payload,callback:e.callback,next:null};i===null?o=i=s:i=i.next=s,e=e.next}while(e!==null);i===null?o=i=r:i=i.next=r}else o=i=r;e={baseState:t.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:t.shared,effects:t.effects},n.updateQueue=e;return}n=e.lastBaseUpdate,n===null?e.firstBaseUpdate=r:n.next=r,e.lastBaseUpdate=r}function pa(n,r,e,t){var o=n.updateQueue;Ke=!1;var i=o.firstBaseUpdate,s=o.lastBaseUpdate,a=o.shared.pending;if(a!==null){o.shared.pending=null;var l=a,c=l.next;l.next=null,s===null?i=c:s.next=c,s=l;var d=n.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==s&&(a===null?d.firstBaseUpdate=c:a.next=c,d.lastBaseUpdate=l))}if(i!==null){var h=o.baseState;s=0,d=c=l=null,a=i;do{var f=a.lane,m=a.eventTime;if((t&f)===f){d!==null&&(d=d.next={eventTime:m,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});n:{var y=n,v=a;switch(f=r,m=e,v.tag){case 1:if(y=v.payload,typeof y=="function"){h=y.call(m,h,f);break n}h=y;break n;case 3:y.flags=y.flags&-65537|128;case 0:if(y=v.payload,f=typeof y=="function"?y.call(m,h,f):y,f==null)break n;h=Qn({},h,f);break n;case 2:Ke=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,f=o.effects,f===null?o.effects=[a]:f.push(a))}else m={eventTime:m,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(c=d=m,l=h):d=d.next=m,s|=f;if(a=a.next,a===null){if(a=o.shared.pending,a===null)break;f=a,a=f.next,f.next=null,o.lastBaseUpdate=f,o.shared.pending=null}}while(!0);if(d===null&&(l=h),o.baseState=l,o.firstBaseUpdate=c,o.lastBaseUpdate=d,r=o.shared.interleaved,r!==null){o=r;do s|=o.lane,o=o.next;while(o!==r)}else i===null&&(o.shared.lanes=0);Zt|=s,n.lanes=s,n.memoizedState=h}}function Rh(n,r,e){if(n=r.effects,r.effects=null,n!==null)for(r=0;r<n.length;r++){var t=n[r],o=t.callback;if(o!==null){if(t.callback=null,t=e,typeof o!="function")throw Error(sn(191,o));o.call(t)}}}var Ui={},ke=vt(Ui),Mi=vt(Ui),Ni=vt(Ui);function Et(n){if(n===Ui)throw Error(sn(174));return n}function sd(n,r){switch(Wn(Ni,r),Wn(Mi,n),Wn(ke,Ui),n=r.nodeType,n){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:Ic(null,"");break;default:n=n===8?r.parentNode:r,r=n.namespaceURI||null,n=n.tagName,r=Ic(r,n)}Un(ke),Wn(ke,r)}function Co(){Un(ke),Un(Mi),Un(Ni)}function gg(n){Et(Ni.current);var r=Et(ke.current),e=Ic(r,n.type);r!==e&&(Wn(Mi,n),Wn(ke,e))}function ad(n){Mi.current===n&&(Un(ke),Un(Mi))}var Xn=vt(0);function ma(n){for(var r=n;r!==null;){if(r.tag===13){var e=r.memoizedState;if(e!==null&&(e=e.dehydrated,e===null||e.data==="$?"||e.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if(r.flags&128)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var $l=[];function ld(){for(var n=0;n<$l.length;n++)$l[n]._workInProgressVersionPrimary=null;$l.length=0}var zs=Be.ReactCurrentDispatcher,zl=Be.ReactCurrentBatchConfig,Dt=0,Yn=null,lr=null,ur=null,ga=!1,hi=!1,ji=0,Wv=0;function gr(){throw Error(sn(321))}function cd(n,r){if(r===null)return!1;for(var e=0;e<r.length&&e<n.length;e++)if(!pe(n[e],r[e]))return!1;return!0}function ud(n,r,e,t,o,i){if(Dt=i,Yn=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,zs.current=n===null||n.memoizedState===null?Kv:Xv,n=e(t,o),hi){i=0;do{if(hi=!1,ji=0,25<=i)throw Error(sn(301));i+=1,ur=lr=null,r.updateQueue=null,zs.current=Yv,n=e(t,o)}while(hi)}if(zs.current=ya,r=lr!==null&&lr.next!==null,Dt=0,ur=lr=Yn=null,ga=!1,r)throw Error(sn(300));return n}function dd(){var n=ji!==0;return ji=0,n}function xe(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ur===null?Yn.memoizedState=ur=n:ur=ur.next=n,ur}function te(){if(lr===null){var n=Yn.alternate;n=n!==null?n.memoizedState:null}else n=lr.next;var r=ur===null?Yn.memoizedState:ur.next;if(r!==null)ur=r,lr=n;else{if(n===null)throw Error(sn(310));lr=n,n={memoizedState:lr.memoizedState,baseState:lr.baseState,baseQueue:lr.baseQueue,queue:lr.queue,next:null},ur===null?Yn.memoizedState=ur=n:ur=ur.next=n}return ur}function Ai(n,r){return typeof r=="function"?r(n):r}function Bl(n){var r=te(),e=r.queue;if(e===null)throw Error(sn(311));e.lastRenderedReducer=n;var t=lr,o=t.baseQueue,i=e.pending;if(i!==null){if(o!==null){var s=o.next;o.next=i.next,i.next=s}t.baseQueue=o=i,e.pending=null}if(o!==null){i=o.next,t=t.baseState;var a=s=null,l=null,c=i;do{var d=c.lane;if((Dt&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),t=c.hasEagerState?c.eagerState:n(t,c.action);else{var h={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=h,s=t):l=l.next=h,Yn.lanes|=d,Zt|=d}c=c.next}while(c!==null&&c!==i);l===null?s=t:l.next=a,pe(t,r.memoizedState)||(Rr=!0),r.memoizedState=t,r.baseState=s,r.baseQueue=l,e.lastRenderedState=t}if(n=e.interleaved,n!==null){o=n;do i=o.lane,Yn.lanes|=i,Zt|=i,o=o.next;while(o!==n)}else o===null&&(e.lanes=0);return[r.memoizedState,e.dispatch]}function Hl(n){var r=te(),e=r.queue;if(e===null)throw Error(sn(311));e.lastRenderedReducer=n;var t=e.dispatch,o=e.pending,i=r.memoizedState;if(o!==null){e.pending=null;var s=o=o.next;do i=n(i,s.action),s=s.next;while(s!==o);pe(i,r.memoizedState)||(Rr=!0),r.memoizedState=i,r.baseQueue===null&&(r.baseState=i),e.lastRenderedState=i}return[i,t]}function yg(){}function vg(n,r){var e=Yn,t=te(),o=r(),i=!pe(t.memoizedState,o);if(i&&(t.memoizedState=o,Rr=!0),t=t.queue,hd(Sg.bind(null,e,t,n),[n]),t.getSnapshot!==r||i||ur!==null&&ur.memoizedState.tag&1){if(e.flags|=2048,Oi(9,wg.bind(null,e,t,o,r),void 0,null),dr===null)throw Error(sn(349));Dt&30||xg(e,r,o)}return o}function xg(n,r,e){n.flags|=16384,n={getSnapshot:r,value:e},r=Yn.updateQueue,r===null?(r={lastEffect:null,stores:null},Yn.updateQueue=r,r.stores=[n]):(e=r.stores,e===null?r.stores=[n]:e.push(n))}function wg(n,r,e,t){r.value=e,r.getSnapshot=t,kg(r)&&_g(n)}function Sg(n,r,e){return e(function(){kg(r)&&_g(n)})}function kg(n){var r=n.getSnapshot;n=n.value;try{var e=r();return!pe(n,e)}catch{return!0}}function _g(n){var r=De(n,1);r!==null&&he(r,n,1,-1)}function Lh(n){var r=xe();return typeof n=="function"&&(n=n()),r.memoizedState=r.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ai,lastRenderedState:n},r.queue=n,n=n.dispatch=Uv.bind(null,Yn,n),[r.memoizedState,n]}function Oi(n,r,e,t){return n={tag:n,create:r,destroy:e,deps:t,next:null},r=Yn.updateQueue,r===null?(r={lastEffect:null,stores:null},Yn.updateQueue=r,r.lastEffect=n.next=n):(e=r.lastEffect,e===null?r.lastEffect=n.next=n:(t=e.next,e.next=n,n.next=t,r.lastEffect=n)),n}function bg(){return te().memoizedState}function Bs(n,r,e,t){var o=xe();Yn.flags|=n,o.memoizedState=Oi(1|r,e,void 0,t===void 0?null:t)}function Ua(n,r,e,t){var o=te();t=t===void 0?null:t;var i=void 0;if(lr!==null){var s=lr.memoizedState;if(i=s.destroy,t!==null&&cd(t,s.deps)){o.memoizedState=Oi(r,e,i,t);return}}Yn.flags|=n,o.memoizedState=Oi(1|r,e,i,t)}function Dh(n,r){return Bs(8390656,8,n,r)}function hd(n,r){return Ua(2048,8,n,r)}function Cg(n,r){return Ua(4,2,n,r)}function Pg(n,r){return Ua(4,4,n,r)}function Tg(n,r){if(typeof r=="function")return n=n(),r(n),function(){r(null)};if(r!=null)return n=n(),r.current=n,function(){r.current=null}}function Ig(n,r,e){return e=e!=null?e.concat([n]):null,Ua(4,4,Tg.bind(null,r,n),e)}function fd(){}function Eg(n,r){var e=te();r=r===void 0?null:r;var t=e.memoizedState;return t!==null&&r!==null&&cd(r,t[1])?t[0]:(e.memoizedState=[n,r],n)}function Mg(n,r){var e=te();r=r===void 0?null:r;var t=e.memoizedState;return t!==null&&r!==null&&cd(r,t[1])?t[0]:(n=n(),e.memoizedState=[n,r],n)}function Ng(n,r,e){return Dt&21?(pe(e,r)||(e=Lm(),Yn.lanes|=e,Zt|=e,n.baseState=!0),r):(n.baseState&&(n.baseState=!1,Rr=!0),n.memoizedState=e)}function Gv(n,r){var e=zn;zn=e!==0&&4>e?e:4,n(!0);var t=zl.transition;zl.transition={};try{n(!1),r()}finally{zn=e,zl.transition=t}}function jg(){return te().memoizedState}function Vv(n,r,e){var t=ut(n);if(e={lane:t,action:e,hasEagerState:!1,eagerState:null,next:null},Ag(n))Og(r,e);else if(e=pg(n,r,e,t),e!==null){var o=Ir();he(e,n,t,o),Rg(e,r,t)}}function Uv(n,r,e){var t=ut(n),o={lane:t,action:e,hasEagerState:!1,eagerState:null,next:null};if(Ag(n))Og(r,o);else{var i=n.alternate;if(n.lanes===0&&(i===null||i.lanes===0)&&(i=r.lastRenderedReducer,i!==null))try{var s=r.lastRenderedState,a=i(s,e);if(o.hasEagerState=!0,o.eagerState=a,pe(a,s)){var l=r.interleaved;l===null?(o.next=o,od(r)):(o.next=l.next,l.next=o),r.interleaved=o;return}}catch{}finally{}e=pg(n,r,o,t),e!==null&&(o=Ir(),he(e,n,t,o),Rg(e,r,t))}}function Ag(n){var r=n.alternate;return n===Yn||r!==null&&r===Yn}function Og(n,r){hi=ga=!0;var e=n.pending;e===null?r.next=r:(r.next=e.next,e.next=r),n.pending=r}function Rg(n,r,e){if(e&4194240){var t=r.lanes;t&=n.pendingLanes,e|=t,r.lanes=e,Wu(n,e)}}var ya={readContext:ee,useCallback:gr,useContext:gr,useEffect:gr,useImperativeHandle:gr,useInsertionEffect:gr,useLayoutEffect:gr,useMemo:gr,useReducer:gr,useRef:gr,useState:gr,useDebugValue:gr,useDeferredValue:gr,useTransition:gr,useMutableSource:gr,useSyncExternalStore:gr,useId:gr,unstable_isNewReconciler:!1},Kv={readContext:ee,useCallback:function(n,r){return xe().memoizedState=[n,r===void 0?null:r],n},useContext:ee,useEffect:Dh,useImperativeHandle:function(n,r,e){return e=e!=null?e.concat([n]):null,Bs(4194308,4,Tg.bind(null,r,n),e)},useLayoutEffect:function(n,r){return Bs(4194308,4,n,r)},useInsertionEffect:function(n,r){return Bs(4,2,n,r)},useMemo:function(n,r){var e=xe();return r=r===void 0?null:r,n=n(),e.memoizedState=[n,r],n},useReducer:function(n,r,e){var t=xe();return r=e!==void 0?e(r):r,t.memoizedState=t.baseState=r,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:r},t.queue=n,n=n.dispatch=Vv.bind(null,Yn,n),[t.memoizedState,n]},useRef:function(n){var r=xe();return n={current:n},r.memoizedState=n},useState:Lh,useDebugValue:fd,useDeferredValue:function(n){return xe().memoizedState=n},useTransition:function(){var n=Lh(!1),r=n[0];return n=Gv.bind(null,n[1]),xe().memoizedState=n,[r,n]},useMutableSource:function(){},useSyncExternalStore:function(n,r,e){var t=Yn,o=xe();if(Kn){if(e===void 0)throw Error(sn(407));e=e()}else{if(e=r(),dr===null)throw Error(sn(349));Dt&30||xg(t,r,e)}o.memoizedState=e;var i={value:e,getSnapshot:r};return o.queue=i,Dh(Sg.bind(null,t,i,n),[n]),t.flags|=2048,Oi(9,wg.bind(null,t,i,e,r),void 0,null),e},useId:function(){var n=xe(),r=dr.identifierPrefix;if(Kn){var e=Ne,t=Me;e=(t&~(1<<32-de(t)-1)).toString(32)+e,r=":"+r+"R"+e,e=ji++,0<e&&(r+="H"+e.toString(32)),r+=":"}else e=Wv++,r=":"+r+"r"+e.toString(32)+":";return n.memoizedState=r},unstable_isNewReconciler:!1},Xv={readContext:ee,useCallback:Eg,useContext:ee,useEffect:hd,useImperativeHandle:Ig,useInsertionEffect:Cg,useLayoutEffect:Pg,useMemo:Mg,useReducer:Bl,useRef:bg,useState:function(){return Bl(Ai)},useDebugValue:fd,useDeferredValue:function(n){var r=te();return Ng(r,lr.memoizedState,n)},useTransition:function(){var n=Bl(Ai)[0],r=te().memoizedState;return[n,r]},useMutableSource:yg,useSyncExternalStore:vg,useId:jg,unstable_isNewReconciler:!1},Yv={readContext:ee,useCallback:Eg,useContext:ee,useEffect:hd,useImperativeHandle:Ig,useInsertionEffect:Cg,useLayoutEffect:Pg,useMemo:Mg,useReducer:Hl,useRef:bg,useState:function(){return Hl(Ai)},useDebugValue:fd,useDeferredValue:function(n){var r=te();return lr===null?r.memoizedState=n:Ng(r,lr.memoizedState,n)},useTransition:function(){var n=Hl(Ai)[0],r=te().memoizedState;return[n,r]},useMutableSource:yg,useSyncExternalStore:vg,useId:jg,unstable_isNewReconciler:!1};function se(n,r){if(n&&n.defaultProps){r=Qn({},r),n=n.defaultProps;for(var e in n)r[e]===void 0&&(r[e]=n[e]);return r}return r}function Xc(n,r,e,t){r=n.memoizedState,e=e(t,r),e=e==null?r:Qn({},r,e),n.memoizedState=e,n.lanes===0&&(n.updateQueue.baseState=e)}var Ka={isMounted:function(n){return(n=n._reactInternals)?Ht(n)===n:!1},enqueueSetState:function(n,r,e){n=n._reactInternals;var t=Ir(),o=ut(n),i=Ae(t,o);i.payload=r,e!=null&&(i.callback=e),r=lt(n,i,o),r!==null&&(he(r,n,o,t),$s(r,n,o))},enqueueReplaceState:function(n,r,e){n=n._reactInternals;var t=Ir(),o=ut(n),i=Ae(t,o);i.tag=1,i.payload=r,e!=null&&(i.callback=e),r=lt(n,i,o),r!==null&&(he(r,n,o,t),$s(r,n,o))},enqueueForceUpdate:function(n,r){n=n._reactInternals;var e=Ir(),t=ut(n),o=Ae(e,t);o.tag=2,r!=null&&(o.callback=r),r=lt(n,o,t),r!==null&&(he(r,n,t,e),$s(r,n,t))}};function Zh(n,r,e,t,o,i,s){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(t,i,s):r.prototype&&r.prototype.isPureReactComponent?!Pi(e,t)||!Pi(o,i):!0}function Lg(n,r,e){var t=!1,o=mt,i=r.contextType;return typeof i=="object"&&i!==null?i=ee(i):(o=Zr(r)?Rt:Sr.current,t=r.contextTypes,i=(t=t!=null)?ko(n,o):mt),r=new r(e,i),n.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Ka,n.stateNode=r,r._reactInternals=n,t&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=o,n.__reactInternalMemoizedMaskedChildContext=i),r}function Fh(n,r,e,t){n=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(e,t),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(e,t),r.state!==n&&Ka.enqueueReplaceState(r,r.state,null)}function Yc(n,r,e,t){var o=n.stateNode;o.props=e,o.state=n.memoizedState,o.refs={},id(n);var i=r.contextType;typeof i=="object"&&i!==null?o.context=ee(i):(i=Zr(r)?Rt:Sr.current,o.context=ko(n,i)),o.state=n.memoizedState,i=r.getDerivedStateFromProps,typeof i=="function"&&(Xc(n,r,i,e),o.state=n.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(r=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),r!==o.state&&Ka.enqueueReplaceState(o,o.state,null),pa(n,e,o,t),o.state=n.memoizedState),typeof o.componentDidMount=="function"&&(n.flags|=4194308)}function Po(n,r){try{var e="",t=r;do e+=b1(t),t=t.return;while(t);var o=e}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:n,source:r,stack:o,digest:null}}function Wl(n,r,e){return{value:n,source:null,stack:e??null,digest:r??null}}function Qc(n,r){try{console.error(r.value)}catch(e){setTimeout(function(){throw e})}}var Qv=typeof WeakMap=="function"?WeakMap:Map;function Dg(n,r,e){e=Ae(-1,e),e.tag=3,e.payload={element:null};var t=r.value;return e.callback=function(){xa||(xa=!0,au=t),Qc(n,r)},e}function Zg(n,r,e){e=Ae(-1,e),e.tag=3;var t=n.type.getDerivedStateFromError;if(typeof t=="function"){var o=r.value;e.payload=function(){return t(o)},e.callback=function(){Qc(n,r)}}var i=n.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(e.callback=function(){Qc(n,r),typeof t!="function"&&(ct===null?ct=new Set([this]):ct.add(this));var s=r.stack;this.componentDidCatch(r.value,{componentStack:s!==null?s:""})}),e}function $h(n,r,e){var t=n.pingCache;if(t===null){t=n.pingCache=new Qv;var o=new Set;t.set(r,o)}else o=t.get(r),o===void 0&&(o=new Set,t.set(r,o));o.has(e)||(o.add(e),n=dx.bind(null,n,r,e),r.then(n,n))}function zh(n){do{var r;if((r=n.tag===13)&&(r=n.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return n;n=n.return}while(n!==null);return null}function Bh(n,r,e,t,o){return n.mode&1?(n.flags|=65536,n.lanes=o,n):(n===r?n.flags|=65536:(n.flags|=128,e.flags|=131072,e.flags&=-52805,e.tag===1&&(e.alternate===null?e.tag=17:(r=Ae(-1,1),r.tag=2,lt(e,r,1))),e.lanes|=1),n)}var Jv=Be.ReactCurrentOwner,Rr=!1;function Tr(n,r,e,t){r.child=n===null?fg(r,null,e,t):bo(r,n.child,e,t)}function Hh(n,r,e,t,o){e=e.render;var i=r.ref;return go(r,o),t=ud(n,r,e,t,i,o),e=dd(),n!==null&&!Rr?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~o,Ze(n,r,o)):(Kn&&e&&Ju(r),r.flags|=1,Tr(n,r,t,o),r.child)}function Wh(n,r,e,t,o){if(n===null){var i=e.type;return typeof i=="function"&&!Sd(i)&&i.defaultProps===void 0&&e.compare===null&&e.defaultProps===void 0?(r.tag=15,r.type=i,Fg(n,r,i,t,o)):(n=Vs(e.type,null,t,r,r.mode,o),n.ref=r.ref,n.return=r,r.child=n)}if(i=n.child,!(n.lanes&o)){var s=i.memoizedProps;if(e=e.compare,e=e!==null?e:Pi,e(s,t)&&n.ref===r.ref)return Ze(n,r,o)}return r.flags|=1,n=dt(i,t),n.ref=r.ref,n.return=r,r.child=n}function Fg(n,r,e,t,o){if(n!==null){var i=n.memoizedProps;if(Pi(i,t)&&n.ref===r.ref)if(Rr=!1,r.pendingProps=t=i,(n.lanes&o)!==0)n.flags&131072&&(Rr=!0);else return r.lanes=n.lanes,Ze(n,r,o)}return Jc(n,r,e,t,o)}function $g(n,r,e){var t=r.pendingProps,o=t.children,i=n!==null?n.memoizedState:null;if(t.mode==="hidden")if(!(r.mode&1))r.memoizedState={baseLanes:0,cachePool:null,transitions:null},Wn(co,Br),Br|=e;else{if(!(e&1073741824))return n=i!==null?i.baseLanes|e:e,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:n,cachePool:null,transitions:null},r.updateQueue=null,Wn(co,Br),Br|=n,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},t=i!==null?i.baseLanes:e,Wn(co,Br),Br|=t}else i!==null?(t=i.baseLanes|e,r.memoizedState=null):t=e,Wn(co,Br),Br|=t;return Tr(n,r,o,e),r.child}function zg(n,r){var e=r.ref;(n===null&&e!==null||n!==null&&n.ref!==e)&&(r.flags|=512,r.flags|=2097152)}function Jc(n,r,e,t,o){var i=Zr(e)?Rt:Sr.current;return i=ko(r,i),go(r,o),e=ud(n,r,e,t,i,o),t=dd(),n!==null&&!Rr?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~o,Ze(n,r,o)):(Kn&&t&&Ju(r),r.flags|=1,Tr(n,r,e,o),r.child)}function Gh(n,r,e,t,o){if(Zr(e)){var i=!0;ca(r)}else i=!1;if(go(r,o),r.stateNode===null)Hs(n,r),Lg(r,e,t),Yc(r,e,t,o),t=!0;else if(n===null){var s=r.stateNode,a=r.memoizedProps;s.props=a;var l=s.context,c=e.contextType;typeof c=="object"&&c!==null?c=ee(c):(c=Zr(e)?Rt:Sr.current,c=ko(r,c));var d=e.getDerivedStateFromProps,h=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function";h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==t||l!==c)&&Fh(r,s,t,c),Ke=!1;var f=r.memoizedState;s.state=f,pa(r,t,s,o),l=r.memoizedState,a!==t||f!==l||Dr.current||Ke?(typeof d=="function"&&(Xc(r,e,d,t),l=r.memoizedState),(a=Ke||Zh(r,e,a,t,f,l,c))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(r.flags|=4194308)):(typeof s.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=t,r.memoizedState=l),s.props=t,s.state=l,s.context=c,t=a):(typeof s.componentDidMount=="function"&&(r.flags|=4194308),t=!1)}else{s=r.stateNode,mg(n,r),a=r.memoizedProps,c=r.type===r.elementType?a:se(r.type,a),s.props=c,h=r.pendingProps,f=s.context,l=e.contextType,typeof l=="object"&&l!==null?l=ee(l):(l=Zr(e)?Rt:Sr.current,l=ko(r,l));var m=e.getDerivedStateFromProps;(d=typeof m=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==h||f!==l)&&Fh(r,s,t,l),Ke=!1,f=r.memoizedState,s.state=f,pa(r,t,s,o);var y=r.memoizedState;a!==h||f!==y||Dr.current||Ke?(typeof m=="function"&&(Xc(r,e,m,t),y=r.memoizedState),(c=Ke||Zh(r,e,c,t,f,y,l)||!1)?(d||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(t,y,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(t,y,l)),typeof s.componentDidUpdate=="function"&&(r.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(r.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(r.flags|=1024),r.memoizedProps=t,r.memoizedState=y),s.props=t,s.state=y,s.context=l,t=c):(typeof s.componentDidUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(r.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(r.flags|=1024),t=!1)}return qc(n,r,e,t,i,o)}function qc(n,r,e,t,o,i){zg(n,r);var s=(r.flags&128)!==0;if(!t&&!s)return o&&Mh(r,e,!1),Ze(n,r,i);t=r.stateNode,Jv.current=r;var a=s&&typeof e.getDerivedStateFromError!="function"?null:t.render();return r.flags|=1,n!==null&&s?(r.child=bo(r,n.child,null,i),r.child=bo(r,null,a,i)):Tr(n,r,a,i),r.memoizedState=t.state,o&&Mh(r,e,!0),r.child}function Bg(n){var r=n.stateNode;r.pendingContext?Eh(n,r.pendingContext,r.pendingContext!==r.context):r.context&&Eh(n,r.context,!1),sd(n,r.containerInfo)}function Vh(n,r,e,t,o){return _o(),nd(o),r.flags|=256,Tr(n,r,e,t),r.child}var nu={dehydrated:null,treeContext:null,retryLane:0};function ru(n){return{baseLanes:n,cachePool:null,transitions:null}}function Hg(n,r,e){var t=r.pendingProps,o=Xn.current,i=!1,s=(r.flags&128)!==0,a;if((a=s)||(a=n!==null&&n.memoizedState===null?!1:(o&2)!==0),a?(i=!0,r.flags&=-129):(n===null||n.memoizedState!==null)&&(o|=1),Wn(Xn,o&1),n===null)return Uc(r),n=r.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(r.mode&1?n.data==="$!"?r.lanes=8:r.lanes=1073741824:r.lanes=1,null):(s=t.children,n=t.fallback,i?(t=r.mode,i=r.child,s={mode:"hidden",children:s},!(t&1)&&i!==null?(i.childLanes=0,i.pendingProps=s):i=Qa(s,t,0,null),n=jt(n,t,e,null),i.return=r,n.return=r,i.sibling=n,r.child=i,r.child.memoizedState=ru(e),r.memoizedState=nu,n):pd(r,s));if(o=n.memoizedState,o!==null&&(a=o.dehydrated,a!==null))return qv(n,r,s,t,a,o,e);if(i){i=t.fallback,s=r.mode,o=n.child,a=o.sibling;var l={mode:"hidden",children:t.children};return!(s&1)&&r.child!==o?(t=r.child,t.childLanes=0,t.pendingProps=l,r.deletions=null):(t=dt(o,l),t.subtreeFlags=o.subtreeFlags&14680064),a!==null?i=dt(a,i):(i=jt(i,s,e,null),i.flags|=2),i.return=r,t.return=r,t.sibling=i,r.child=t,t=i,i=r.child,s=n.child.memoizedState,s=s===null?ru(e):{baseLanes:s.baseLanes|e,cachePool:null,transitions:s.transitions},i.memoizedState=s,i.childLanes=n.childLanes&~e,r.memoizedState=nu,t}return i=n.child,n=i.sibling,t=dt(i,{mode:"visible",children:t.children}),!(r.mode&1)&&(t.lanes=e),t.return=r,t.sibling=null,n!==null&&(e=r.deletions,e===null?(r.deletions=[n],r.flags|=16):e.push(n)),r.child=t,r.memoizedState=null,t}function pd(n,r){return r=Qa({mode:"visible",children:r},n.mode,0,null),r.return=n,n.child=r}function ps(n,r,e,t){return t!==null&&nd(t),bo(r,n.child,null,e),n=pd(r,r.pendingProps.children),n.flags|=2,r.memoizedState=null,n}function qv(n,r,e,t,o,i,s){if(e)return r.flags&256?(r.flags&=-257,t=Wl(Error(sn(422))),ps(n,r,s,t)):r.memoizedState!==null?(r.child=n.child,r.flags|=128,null):(i=t.fallback,o=r.mode,t=Qa({mode:"visible",children:t.children},o,0,null),i=jt(i,o,s,null),i.flags|=2,t.return=r,i.return=r,t.sibling=i,r.child=t,r.mode&1&&bo(r,n.child,null,s),r.child.memoizedState=ru(s),r.memoizedState=nu,i);if(!(r.mode&1))return ps(n,r,s,null);if(o.data==="$!"){if(t=o.nextSibling&&o.nextSibling.dataset,t)var a=t.dgst;return t=a,i=Error(sn(419)),t=Wl(i,t,void 0),ps(n,r,s,t)}if(a=(s&n.childLanes)!==0,Rr||a){if(t=dr,t!==null){switch(s&-s){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(t.suspendedLanes|s)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,De(n,o),he(t,n,o,-1))}return wd(),t=Wl(Error(sn(421))),ps(n,r,s,t)}return o.data==="$?"?(r.flags|=128,r.child=n.child,r=hx.bind(null,n),o._reactRetry=r,null):(n=i.treeContext,Hr=at(o.nextSibling),Wr=r,Kn=!0,le=null,n!==null&&(Qr[Jr++]=Me,Qr[Jr++]=Ne,Qr[Jr++]=Lt,Me=n.id,Ne=n.overflow,Lt=r),r=pd(r,t.children),r.flags|=4096,r)}function Uh(n,r,e){n.lanes|=r;var t=n.alternate;t!==null&&(t.lanes|=r),Kc(n.return,r,e)}function Gl(n,r,e,t,o){var i=n.memoizedState;i===null?n.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:t,tail:e,tailMode:o}:(i.isBackwards=r,i.rendering=null,i.renderingStartTime=0,i.last=t,i.tail=e,i.tailMode=o)}function Wg(n,r,e){var t=r.pendingProps,o=t.revealOrder,i=t.tail;if(Tr(n,r,t.children,e),t=Xn.current,t&2)t=t&1|2,r.flags|=128;else{if(n!==null&&n.flags&128)n:for(n=r.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Uh(n,e,r);else if(n.tag===19)Uh(n,e,r);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===r)break n;for(;n.sibling===null;){if(n.return===null||n.return===r)break n;n=n.return}n.sibling.return=n.return,n=n.sibling}t&=1}if(Wn(Xn,t),!(r.mode&1))r.memoizedState=null;else switch(o){case"forwards":for(e=r.child,o=null;e!==null;)n=e.alternate,n!==null&&ma(n)===null&&(o=e),e=e.sibling;e=o,e===null?(o=r.child,r.child=null):(o=e.sibling,e.sibling=null),Gl(r,!1,o,e,i);break;case"backwards":for(e=null,o=r.child,r.child=null;o!==null;){if(n=o.alternate,n!==null&&ma(n)===null){r.child=o;break}n=o.sibling,o.sibling=e,e=o,o=n}Gl(r,!0,e,null,i);break;case"together":Gl(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function Hs(n,r){!(r.mode&1)&&n!==null&&(n.alternate=null,r.alternate=null,r.flags|=2)}function Ze(n,r,e){if(n!==null&&(r.dependencies=n.dependencies),Zt|=r.lanes,!(e&r.childLanes))return null;if(n!==null&&r.child!==n.child)throw Error(sn(153));if(r.child!==null){for(n=r.child,e=dt(n,n.pendingProps),r.child=e,e.return=r;n.sibling!==null;)n=n.sibling,e=e.sibling=dt(n,n.pendingProps),e.return=r;e.sibling=null}return r.child}function nx(n,r,e){switch(r.tag){case 3:Bg(r),_o();break;case 5:gg(r);break;case 1:Zr(r.type)&&ca(r);break;case 4:sd(r,r.stateNode.containerInfo);break;case 10:var t=r.type._context,o=r.memoizedProps.value;Wn(ha,t._currentValue),t._currentValue=o;break;case 13:if(t=r.memoizedState,t!==null)return t.dehydrated!==null?(Wn(Xn,Xn.current&1),r.flags|=128,null):e&r.child.childLanes?Hg(n,r,e):(Wn(Xn,Xn.current&1),n=Ze(n,r,e),n!==null?n.sibling:null);Wn(Xn,Xn.current&1);break;case 19:if(t=(e&r.childLanes)!==0,n.flags&128){if(t)return Wg(n,r,e);r.flags|=128}if(o=r.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Wn(Xn,Xn.current),t)break;return null;case 22:case 23:return r.lanes=0,$g(n,r,e)}return Ze(n,r,e)}var Gg,eu,Vg,Ug;Gg=function(n,r){for(var e=r.child;e!==null;){if(e.tag===5||e.tag===6)n.appendChild(e.stateNode);else if(e.tag!==4&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===r)break;for(;e.sibling===null;){if(e.return===null||e.return===r)return;e=e.return}e.sibling.return=e.return,e=e.sibling}};eu=function(){};Vg=function(n,r,e,t){var o=n.memoizedProps;if(o!==t){n=r.stateNode,Et(ke.current);var i=null;switch(e){case"input":o=bc(n,o),t=bc(n,t),i=[];break;case"select":o=Qn({},o,{value:void 0}),t=Qn({},t,{value:void 0}),i=[];break;case"textarea":o=Tc(n,o),t=Tc(n,t),i=[];break;default:typeof o.onClick!="function"&&typeof t.onClick=="function"&&(n.onclick=aa)}Ec(e,t);var s;e=null;for(c in o)if(!t.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var a=o[c];for(s in a)a.hasOwnProperty(s)&&(e||(e={}),e[s]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(xi.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in t){var l=t[c];if(a=o!=null?o[c]:void 0,t.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(s in a)!a.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(e||(e={}),e[s]="");for(s in l)l.hasOwnProperty(s)&&a[s]!==l[s]&&(e||(e={}),e[s]=l[s])}else e||(i||(i=[]),i.push(c,e)),e=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(i=i||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(i=i||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(xi.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Vn("scroll",n),i||a===l||(i=[])):(i=i||[]).push(c,l))}e&&(i=i||[]).push("style",e);var c=i;(r.updateQueue=c)&&(r.flags|=4)}};Ug=function(n,r,e,t){e!==t&&(r.flags|=4)};function Ho(n,r){if(!Kn)switch(n.tailMode){case"hidden":r=n.tail;for(var e=null;r!==null;)r.alternate!==null&&(e=r),r=r.sibling;e===null?n.tail=null:e.sibling=null;break;case"collapsed":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?r||n.tail===null?n.tail=null:n.tail.sibling=null:t.sibling=null}}function yr(n){var r=n.alternate!==null&&n.alternate.child===n.child,e=0,t=0;if(r)for(var o=n.child;o!==null;)e|=o.lanes|o.childLanes,t|=o.subtreeFlags&14680064,t|=o.flags&14680064,o.return=n,o=o.sibling;else for(o=n.child;o!==null;)e|=o.lanes|o.childLanes,t|=o.subtreeFlags,t|=o.flags,o.return=n,o=o.sibling;return n.subtreeFlags|=t,n.childLanes=e,r}function rx(n,r,e){var t=r.pendingProps;switch(qu(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return yr(r),null;case 1:return Zr(r.type)&&la(),yr(r),null;case 3:return t=r.stateNode,Co(),Un(Dr),Un(Sr),ld(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(n===null||n.child===null)&&(hs(r)?r.flags|=4:n===null||n.memoizedState.isDehydrated&&!(r.flags&256)||(r.flags|=1024,le!==null&&(uu(le),le=null))),eu(n,r),yr(r),null;case 5:ad(r);var o=Et(Ni.current);if(e=r.type,n!==null&&r.stateNode!=null)Vg(n,r,e,t,o),n.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!t){if(r.stateNode===null)throw Error(sn(166));return yr(r),null}if(n=Et(ke.current),hs(r)){t=r.stateNode,e=r.type;var i=r.memoizedProps;switch(t[we]=r,t[Ei]=i,n=(r.mode&1)!==0,e){case"dialog":Vn("cancel",t),Vn("close",t);break;case"iframe":case"object":case"embed":Vn("load",t);break;case"video":case"audio":for(o=0;o<ri.length;o++)Vn(ri[o],t);break;case"source":Vn("error",t);break;case"img":case"image":case"link":Vn("error",t),Vn("load",t);break;case"details":Vn("toggle",t);break;case"input":eh(t,i),Vn("invalid",t);break;case"select":t._wrapperState={wasMultiple:!!i.multiple},Vn("invalid",t);break;case"textarea":oh(t,i),Vn("invalid",t)}Ec(e,i),o=null;for(var s in i)if(i.hasOwnProperty(s)){var a=i[s];s==="children"?typeof a=="string"?t.textContent!==a&&(i.suppressHydrationWarning!==!0&&ds(t.textContent,a,n),o=["children",a]):typeof a=="number"&&t.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&ds(t.textContent,a,n),o=["children",""+a]):xi.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&Vn("scroll",t)}switch(e){case"input":ts(t),th(t,i,!0);break;case"textarea":ts(t),ih(t);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(t.onclick=aa)}t=o,r.updateQueue=t,t!==null&&(r.flags|=4)}else{s=o.nodeType===9?o:o.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Sm(e)),n==="http://www.w3.org/1999/xhtml"?e==="script"?(n=s.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof t.is=="string"?n=s.createElement(e,{is:t.is}):(n=s.createElement(e),e==="select"&&(s=n,t.multiple?s.multiple=!0:t.size&&(s.size=t.size))):n=s.createElementNS(n,e),n[we]=r,n[Ei]=t,Gg(n,r,!1,!1),r.stateNode=n;n:{switch(s=Mc(e,t),e){case"dialog":Vn("cancel",n),Vn("close",n),o=t;break;case"iframe":case"object":case"embed":Vn("load",n),o=t;break;case"video":case"audio":for(o=0;o<ri.length;o++)Vn(ri[o],n);o=t;break;case"source":Vn("error",n),o=t;break;case"img":case"image":case"link":Vn("error",n),Vn("load",n),o=t;break;case"details":Vn("toggle",n),o=t;break;case"input":eh(n,t),o=bc(n,t),Vn("invalid",n);break;case"option":o=t;break;case"select":n._wrapperState={wasMultiple:!!t.multiple},o=Qn({},t,{value:void 0}),Vn("invalid",n);break;case"textarea":oh(n,t),o=Tc(n,t),Vn("invalid",n);break;default:o=t}Ec(e,o),a=o;for(i in a)if(a.hasOwnProperty(i)){var l=a[i];i==="style"?bm(n,l):i==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&km(n,l)):i==="children"?typeof l=="string"?(e!=="textarea"||l!=="")&&wi(n,l):typeof l=="number"&&wi(n,""+l):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(xi.hasOwnProperty(i)?l!=null&&i==="onScroll"&&Vn("scroll",n):l!=null&&Zu(n,i,l,s))}switch(e){case"input":ts(n),th(n,t,!1);break;case"textarea":ts(n),ih(n);break;case"option":t.value!=null&&n.setAttribute("value",""+pt(t.value));break;case"select":n.multiple=!!t.multiple,i=t.value,i!=null?ho(n,!!t.multiple,i,!1):t.defaultValue!=null&&ho(n,!!t.multiple,t.defaultValue,!0);break;default:typeof o.onClick=="function"&&(n.onclick=aa)}switch(e){case"button":case"input":case"select":case"textarea":t=!!t.autoFocus;break n;case"img":t=!0;break n;default:t=!1}}t&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return yr(r),null;case 6:if(n&&r.stateNode!=null)Ug(n,r,n.memoizedProps,t);else{if(typeof t!="string"&&r.stateNode===null)throw Error(sn(166));if(e=Et(Ni.current),Et(ke.current),hs(r)){if(t=r.stateNode,e=r.memoizedProps,t[we]=r,(i=t.nodeValue!==e)&&(n=Wr,n!==null))switch(n.tag){case 3:ds(t.nodeValue,e,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&ds(t.nodeValue,e,(n.mode&1)!==0)}i&&(r.flags|=4)}else t=(e.nodeType===9?e:e.ownerDocument).createTextNode(t),t[we]=r,r.stateNode=t}return yr(r),null;case 13:if(Un(Xn),t=r.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Kn&&Hr!==null&&r.mode&1&&!(r.flags&128))dg(),_o(),r.flags|=98560,i=!1;else if(i=hs(r),t!==null&&t.dehydrated!==null){if(n===null){if(!i)throw Error(sn(318));if(i=r.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(sn(317));i[we]=r}else _o(),!(r.flags&128)&&(r.memoizedState=null),r.flags|=4;yr(r),i=!1}else le!==null&&(uu(le),le=null),i=!0;if(!i)return r.flags&65536?r:null}return r.flags&128?(r.lanes=e,r):(t=t!==null,t!==(n!==null&&n.memoizedState!==null)&&t&&(r.child.flags|=8192,r.mode&1&&(n===null||Xn.current&1?cr===0&&(cr=3):wd())),r.updateQueue!==null&&(r.flags|=4),yr(r),null);case 4:return Co(),eu(n,r),n===null&&Ti(r.stateNode.containerInfo),yr(r),null;case 10:return td(r.type._context),yr(r),null;case 17:return Zr(r.type)&&la(),yr(r),null;case 19:if(Un(Xn),i=r.memoizedState,i===null)return yr(r),null;if(t=(r.flags&128)!==0,s=i.rendering,s===null)if(t)Ho(i,!1);else{if(cr!==0||n!==null&&n.flags&128)for(n=r.child;n!==null;){if(s=ma(n),s!==null){for(r.flags|=128,Ho(i,!1),t=s.updateQueue,t!==null&&(r.updateQueue=t,r.flags|=4),r.subtreeFlags=0,t=e,e=r.child;e!==null;)i=e,n=t,i.flags&=14680066,s=i.alternate,s===null?(i.childLanes=0,i.lanes=n,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=s.childLanes,i.lanes=s.lanes,i.child=s.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=s.memoizedProps,i.memoizedState=s.memoizedState,i.updateQueue=s.updateQueue,i.type=s.type,n=s.dependencies,i.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e=e.sibling;return Wn(Xn,Xn.current&1|2),r.child}n=n.sibling}i.tail!==null&&nr()>To&&(r.flags|=128,t=!0,Ho(i,!1),r.lanes=4194304)}else{if(!t)if(n=ma(s),n!==null){if(r.flags|=128,t=!0,e=n.updateQueue,e!==null&&(r.updateQueue=e,r.flags|=4),Ho(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!Kn)return yr(r),null}else 2*nr()-i.renderingStartTime>To&&e!==1073741824&&(r.flags|=128,t=!0,Ho(i,!1),r.lanes=4194304);i.isBackwards?(s.sibling=r.child,r.child=s):(e=i.last,e!==null?e.sibling=s:r.child=s,i.last=s)}return i.tail!==null?(r=i.tail,i.rendering=r,i.tail=r.sibling,i.renderingStartTime=nr(),r.sibling=null,e=Xn.current,Wn(Xn,t?e&1|2:e&1),r):(yr(r),null);case 22:case 23:return xd(),t=r.memoizedState!==null,n!==null&&n.memoizedState!==null!==t&&(r.flags|=8192),t&&r.mode&1?Br&1073741824&&(yr(r),r.subtreeFlags&6&&(r.flags|=8192)):yr(r),null;case 24:return null;case 25:return null}throw Error(sn(156,r.tag))}function ex(n,r){switch(qu(r),r.tag){case 1:return Zr(r.type)&&la(),n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 3:return Co(),Un(Dr),Un(Sr),ld(),n=r.flags,n&65536&&!(n&128)?(r.flags=n&-65537|128,r):null;case 5:return ad(r),null;case 13:if(Un(Xn),n=r.memoizedState,n!==null&&n.dehydrated!==null){if(r.alternate===null)throw Error(sn(340));_o()}return n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 19:return Un(Xn),null;case 4:return Co(),null;case 10:return td(r.type._context),null;case 22:case 23:return xd(),null;case 24:return null;default:return null}}var ms=!1,wr=!1,tx=typeof WeakSet=="function"?WeakSet:Set,gn=null;function lo(n,r){var e=n.ref;if(e!==null)if(typeof e=="function")try{e(null)}catch(t){Jn(n,r,t)}else e.current=null}function tu(n,r,e){try{e()}catch(t){Jn(n,r,t)}}var Kh=!1;function ox(n,r){if($c=oa,n=Jm(),Qu(n)){if("selectionStart"in n)var e={start:n.selectionStart,end:n.selectionEnd};else n:{e=(e=n.ownerDocument)&&e.defaultView||window;var t=e.getSelection&&e.getSelection();if(t&&t.rangeCount!==0){e=t.anchorNode;var o=t.anchorOffset,i=t.focusNode;t=t.focusOffset;try{e.nodeType,i.nodeType}catch{e=null;break n}var s=0,a=-1,l=-1,c=0,d=0,h=n,f=null;r:for(;;){for(var m;h!==e||o!==0&&h.nodeType!==3||(a=s+o),h!==i||t!==0&&h.nodeType!==3||(l=s+t),h.nodeType===3&&(s+=h.nodeValue.length),(m=h.firstChild)!==null;)f=h,h=m;for(;;){if(h===n)break r;if(f===e&&++c===o&&(a=s),f===i&&++d===t&&(l=s),(m=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=m}e=a===-1||l===-1?null:{start:a,end:l}}else e=null}e=e||{start:0,end:0}}else e=null;for(zc={focusedElem:n,selectionRange:e},oa=!1,gn=r;gn!==null;)if(r=gn,n=r.child,(r.subtreeFlags&1028)!==0&&n!==null)n.return=r,gn=n;else for(;gn!==null;){r=gn;try{var y=r.alternate;if(r.flags&1024)switch(r.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var v=y.memoizedProps,A=y.memoizedState,g=r.stateNode,p=g.getSnapshotBeforeUpdate(r.elementType===r.type?v:se(r.type,v),A);g.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var x=r.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(sn(163))}}catch(S){Jn(r,r.return,S)}if(n=r.sibling,n!==null){n.return=r.return,gn=n;break}gn=r.return}return y=Kh,Kh=!1,y}function fi(n,r,e){var t=r.updateQueue;if(t=t!==null?t.lastEffect:null,t!==null){var o=t=t.next;do{if((o.tag&n)===n){var i=o.destroy;o.destroy=void 0,i!==void 0&&tu(r,e,i)}o=o.next}while(o!==t)}}function Xa(n,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var e=r=r.next;do{if((e.tag&n)===n){var t=e.create;e.destroy=t()}e=e.next}while(e!==r)}}function ou(n){var r=n.ref;if(r!==null){var e=n.stateNode;switch(n.tag){case 5:n=e;break;default:n=e}typeof r=="function"?r(n):r.current=n}}function Kg(n){var r=n.alternate;r!==null&&(n.alternate=null,Kg(r)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(r=n.stateNode,r!==null&&(delete r[we],delete r[Ei],delete r[Wc],delete r[$v],delete r[zv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Xg(n){return n.tag===5||n.tag===3||n.tag===4}function Xh(n){n:for(;;){for(;n.sibling===null;){if(n.return===null||Xg(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue n;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function iu(n,r,e){var t=n.tag;if(t===5||t===6)n=n.stateNode,r?e.nodeType===8?e.parentNode.insertBefore(n,r):e.insertBefore(n,r):(e.nodeType===8?(r=e.parentNode,r.insertBefore(n,e)):(r=e,r.appendChild(n)),e=e._reactRootContainer,e!=null||r.onclick!==null||(r.onclick=aa));else if(t!==4&&(n=n.child,n!==null))for(iu(n,r,e),n=n.sibling;n!==null;)iu(n,r,e),n=n.sibling}function su(n,r,e){var t=n.tag;if(t===5||t===6)n=n.stateNode,r?e.insertBefore(n,r):e.appendChild(n);else if(t!==4&&(n=n.child,n!==null))for(su(n,r,e),n=n.sibling;n!==null;)su(n,r,e),n=n.sibling}var hr=null,ae=!1;function Ge(n,r,e){for(e=e.child;e!==null;)Yg(n,r,e),e=e.sibling}function Yg(n,r,e){if(Se&&typeof Se.onCommitFiberUnmount=="function")try{Se.onCommitFiberUnmount(za,e)}catch{}switch(e.tag){case 5:wr||lo(e,r);case 6:var t=hr,o=ae;hr=null,Ge(n,r,e),hr=t,ae=o,hr!==null&&(ae?(n=hr,e=e.stateNode,n.nodeType===8?n.parentNode.removeChild(e):n.removeChild(e)):hr.removeChild(e.stateNode));break;case 18:hr!==null&&(ae?(n=hr,e=e.stateNode,n.nodeType===8?Zl(n.parentNode,e):n.nodeType===1&&Zl(n,e),bi(n)):Zl(hr,e.stateNode));break;case 4:t=hr,o=ae,hr=e.stateNode.containerInfo,ae=!0,Ge(n,r,e),hr=t,ae=o;break;case 0:case 11:case 14:case 15:if(!wr&&(t=e.updateQueue,t!==null&&(t=t.lastEffect,t!==null))){o=t=t.next;do{var i=o,s=i.destroy;i=i.tag,s!==void 0&&(i&2||i&4)&&tu(e,r,s),o=o.next}while(o!==t)}Ge(n,r,e);break;case 1:if(!wr&&(lo(e,r),t=e.stateNode,typeof t.componentWillUnmount=="function"))try{t.props=e.memoizedProps,t.state=e.memoizedState,t.componentWillUnmount()}catch(a){Jn(e,r,a)}Ge(n,r,e);break;case 21:Ge(n,r,e);break;case 22:e.mode&1?(wr=(t=wr)||e.memoizedState!==null,Ge(n,r,e),wr=t):Ge(n,r,e);break;default:Ge(n,r,e)}}function Yh(n){var r=n.updateQueue;if(r!==null){n.updateQueue=null;var e=n.stateNode;e===null&&(e=n.stateNode=new tx),r.forEach(function(t){var o=fx.bind(null,n,t);e.has(t)||(e.add(t),t.then(o,o))})}}function ie(n,r){var e=r.deletions;if(e!==null)for(var t=0;t<e.length;t++){var o=e[t];try{var i=n,s=r,a=s;n:for(;a!==null;){switch(a.tag){case 5:hr=a.stateNode,ae=!1;break n;case 3:hr=a.stateNode.containerInfo,ae=!0;break n;case 4:hr=a.stateNode.containerInfo,ae=!0;break n}a=a.return}if(hr===null)throw Error(sn(160));Yg(i,s,o),hr=null,ae=!1;var l=o.alternate;l!==null&&(l.return=null),o.return=null}catch(c){Jn(o,r,c)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)Qg(r,n),r=r.sibling}function Qg(n,r){var e=n.alternate,t=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ie(r,n),ye(n),t&4){try{fi(3,n,n.return),Xa(3,n)}catch(v){Jn(n,n.return,v)}try{fi(5,n,n.return)}catch(v){Jn(n,n.return,v)}}break;case 1:ie(r,n),ye(n),t&512&&e!==null&&lo(e,e.return);break;case 5:if(ie(r,n),ye(n),t&512&&e!==null&&lo(e,e.return),n.flags&32){var o=n.stateNode;try{wi(o,"")}catch(v){Jn(n,n.return,v)}}if(t&4&&(o=n.stateNode,o!=null)){var i=n.memoizedProps,s=e!==null?e.memoizedProps:i,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&xm(o,i),Mc(a,s);var c=Mc(a,i);for(s=0;s<l.length;s+=2){var d=l[s],h=l[s+1];d==="style"?bm(o,h):d==="dangerouslySetInnerHTML"?km(o,h):d==="children"?wi(o,h):Zu(o,d,h,c)}switch(a){case"input":Cc(o,i);break;case"textarea":wm(o,i);break;case"select":var f=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var m=i.value;m!=null?ho(o,!!i.multiple,m,!1):f!==!!i.multiple&&(i.defaultValue!=null?ho(o,!!i.multiple,i.defaultValue,!0):ho(o,!!i.multiple,i.multiple?[]:"",!1))}o[Ei]=i}catch(v){Jn(n,n.return,v)}}break;case 6:if(ie(r,n),ye(n),t&4){if(n.stateNode===null)throw Error(sn(162));o=n.stateNode,i=n.memoizedProps;try{o.nodeValue=i}catch(v){Jn(n,n.return,v)}}break;case 3:if(ie(r,n),ye(n),t&4&&e!==null&&e.memoizedState.isDehydrated)try{bi(r.containerInfo)}catch(v){Jn(n,n.return,v)}break;case 4:ie(r,n),ye(n);break;case 13:ie(r,n),ye(n),o=n.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(yd=nr())),t&4&&Yh(n);break;case 22:if(d=e!==null&&e.memoizedState!==null,n.mode&1?(wr=(c=wr)||d,ie(r,n),wr=c):ie(r,n),ye(n),t&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!d&&n.mode&1)for(gn=n,d=n.child;d!==null;){for(h=gn=d;gn!==null;){switch(f=gn,m=f.child,f.tag){case 0:case 11:case 14:case 15:fi(4,f,f.return);break;case 1:lo(f,f.return);var y=f.stateNode;if(typeof y.componentWillUnmount=="function"){t=f,e=f.return;try{r=t,y.props=r.memoizedProps,y.state=r.memoizedState,y.componentWillUnmount()}catch(v){Jn(t,e,v)}}break;case 5:lo(f,f.return);break;case 22:if(f.memoizedState!==null){Jh(h);continue}}m!==null?(m.return=f,gn=m):Jh(h)}d=d.sibling}n:for(d=null,h=n;;){if(h.tag===5){if(d===null){d=h;try{o=h.stateNode,c?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=h.stateNode,l=h.memoizedProps.style,s=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=_m("display",s))}catch(v){Jn(n,n.return,v)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(v){Jn(n,n.return,v)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===n)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===n)break n;for(;h.sibling===null;){if(h.return===null||h.return===n)break n;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:ie(r,n),ye(n),t&4&&Yh(n);break;case 21:break;default:ie(r,n),ye(n)}}function ye(n){var r=n.flags;if(r&2){try{n:{for(var e=n.return;e!==null;){if(Xg(e)){var t=e;break n}e=e.return}throw Error(sn(160))}switch(t.tag){case 5:var o=t.stateNode;t.flags&32&&(wi(o,""),t.flags&=-33);var i=Xh(n);su(n,i,o);break;case 3:case 4:var s=t.stateNode.containerInfo,a=Xh(n);iu(n,a,s);break;default:throw Error(sn(161))}}catch(l){Jn(n,n.return,l)}n.flags&=-3}r&4096&&(n.flags&=-4097)}function ix(n,r,e){gn=n,Jg(n)}function Jg(n,r,e){for(var t=(n.mode&1)!==0;gn!==null;){var o=gn,i=o.child;if(o.tag===22&&t){var s=o.memoizedState!==null||ms;if(!s){var a=o.alternate,l=a!==null&&a.memoizedState!==null||wr;a=ms;var c=wr;if(ms=s,(wr=l)&&!c)for(gn=o;gn!==null;)s=gn,l=s.child,s.tag===22&&s.memoizedState!==null?qh(o):l!==null?(l.return=s,gn=l):qh(o);for(;i!==null;)gn=i,Jg(i),i=i.sibling;gn=o,ms=a,wr=c}Qh(n)}else o.subtreeFlags&8772&&i!==null?(i.return=o,gn=i):Qh(n)}}function Qh(n){for(;gn!==null;){var r=gn;if(r.flags&8772){var e=r.alternate;try{if(r.flags&8772)switch(r.tag){case 0:case 11:case 15:wr||Xa(5,r);break;case 1:var t=r.stateNode;if(r.flags&4&&!wr)if(e===null)t.componentDidMount();else{var o=r.elementType===r.type?e.memoizedProps:se(r.type,e.memoizedProps);t.componentDidUpdate(o,e.memoizedState,t.__reactInternalSnapshotBeforeUpdate)}var i=r.updateQueue;i!==null&&Rh(r,i,t);break;case 3:var s=r.updateQueue;if(s!==null){if(e=null,r.child!==null)switch(r.child.tag){case 5:e=r.child.stateNode;break;case 1:e=r.child.stateNode}Rh(r,s,e)}break;case 5:var a=r.stateNode;if(e===null&&r.flags&4){e=a;var l=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&e.focus();break;case"img":l.src&&(e.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var c=r.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&bi(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(sn(163))}wr||r.flags&512&&ou(r)}catch(f){Jn(r,r.return,f)}}if(r===n){gn=null;break}if(e=r.sibling,e!==null){e.return=r.return,gn=e;break}gn=r.return}}function Jh(n){for(;gn!==null;){var r=gn;if(r===n){gn=null;break}var e=r.sibling;if(e!==null){e.return=r.return,gn=e;break}gn=r.return}}function qh(n){for(;gn!==null;){var r=gn;try{switch(r.tag){case 0:case 11:case 15:var e=r.return;try{Xa(4,r)}catch(l){Jn(r,e,l)}break;case 1:var t=r.stateNode;if(typeof t.componentDidMount=="function"){var o=r.return;try{t.componentDidMount()}catch(l){Jn(r,o,l)}}var i=r.return;try{ou(r)}catch(l){Jn(r,i,l)}break;case 5:var s=r.return;try{ou(r)}catch(l){Jn(r,s,l)}}}catch(l){Jn(r,r.return,l)}if(r===n){gn=null;break}var a=r.sibling;if(a!==null){a.return=r.return,gn=a;break}gn=r.return}}var sx=Math.ceil,va=Be.ReactCurrentDispatcher,md=Be.ReactCurrentOwner,re=Be.ReactCurrentBatchConfig,Zn=0,dr=null,ir=null,pr=0,Br=0,co=vt(0),cr=0,Ri=null,Zt=0,Ya=0,gd=0,pi=null,Ar=null,yd=0,To=1/0,Te=null,xa=!1,au=null,ct=null,gs=!1,rt=null,wa=0,mi=0,lu=null,Ws=-1,Gs=0;function Ir(){return Zn&6?nr():Ws!==-1?Ws:Ws=nr()}function ut(n){return n.mode&1?Zn&2&&pr!==0?pr&-pr:Hv.transition!==null?(Gs===0&&(Gs=Lm()),Gs):(n=zn,n!==0||(n=window.event,n=n===void 0?16:Hm(n.type)),n):1}function he(n,r,e,t){if(50<mi)throw mi=0,lu=null,Error(sn(185));Wi(n,e,t),(!(Zn&2)||n!==dr)&&(n===dr&&(!(Zn&2)&&(Ya|=e),cr===4&&Qe(n,pr)),Fr(n,t),e===1&&Zn===0&&!(r.mode&1)&&(To=nr()+500,Va&&xt()))}function Fr(n,r){var e=n.callbackNode;H1(n,r);var t=ta(n,n===dr?pr:0);if(t===0)e!==null&&lh(e),n.callbackNode=null,n.callbackPriority=0;else if(r=t&-t,n.callbackPriority!==r){if(e!=null&&lh(e),r===1)n.tag===0?Bv(nf.bind(null,n)):lg(nf.bind(null,n)),Zv(function(){!(Zn&6)&&xt()}),e=null;else{switch(Dm(t)){case 1:e=Hu;break;case 4:e=Om;break;case 16:e=ea;break;case 536870912:e=Rm;break;default:e=ea}e=s0(e,qg.bind(null,n))}n.callbackPriority=r,n.callbackNode=e}}function qg(n,r){if(Ws=-1,Gs=0,Zn&6)throw Error(sn(327));var e=n.callbackNode;if(yo()&&n.callbackNode!==e)return null;var t=ta(n,n===dr?pr:0);if(t===0)return null;if(t&30||t&n.expiredLanes||r)r=Sa(n,t);else{r=t;var o=Zn;Zn|=2;var i=r0();(dr!==n||pr!==r)&&(Te=null,To=nr()+500,Nt(n,r));do try{cx();break}catch(a){n0(n,a)}while(!0);ed(),va.current=i,Zn=o,ir!==null?r=0:(dr=null,pr=0,r=cr)}if(r!==0){if(r===2&&(o=Rc(n),o!==0&&(t=o,r=cu(n,o))),r===1)throw e=Ri,Nt(n,0),Qe(n,t),Fr(n,nr()),e;if(r===6)Qe(n,t);else{if(o=n.current.alternate,!(t&30)&&!ax(o)&&(r=Sa(n,t),r===2&&(i=Rc(n),i!==0&&(t=i,r=cu(n,i))),r===1))throw e=Ri,Nt(n,0),Qe(n,t),Fr(n,nr()),e;switch(n.finishedWork=o,n.finishedLanes=t,r){case 0:case 1:throw Error(sn(345));case 2:Pt(n,Ar,Te);break;case 3:if(Qe(n,t),(t&130023424)===t&&(r=yd+500-nr(),10<r)){if(ta(n,0)!==0)break;if(o=n.suspendedLanes,(o&t)!==t){Ir(),n.pingedLanes|=n.suspendedLanes&o;break}n.timeoutHandle=Hc(Pt.bind(null,n,Ar,Te),r);break}Pt(n,Ar,Te);break;case 4:if(Qe(n,t),(t&4194240)===t)break;for(r=n.eventTimes,o=-1;0<t;){var s=31-de(t);i=1<<s,s=r[s],s>o&&(o=s),t&=~i}if(t=o,t=nr()-t,t=(120>t?120:480>t?480:1080>t?1080:1920>t?1920:3e3>t?3e3:4320>t?4320:1960*sx(t/1960))-t,10<t){n.timeoutHandle=Hc(Pt.bind(null,n,Ar,Te),t);break}Pt(n,Ar,Te);break;case 5:Pt(n,Ar,Te);break;default:throw Error(sn(329))}}}return Fr(n,nr()),n.callbackNode===e?qg.bind(null,n):null}function cu(n,r){var e=pi;return n.current.memoizedState.isDehydrated&&(Nt(n,r).flags|=256),n=Sa(n,r),n!==2&&(r=Ar,Ar=e,r!==null&&uu(r)),n}function uu(n){Ar===null?Ar=n:Ar.push.apply(Ar,n)}function ax(n){for(var r=n;;){if(r.flags&16384){var e=r.updateQueue;if(e!==null&&(e=e.stores,e!==null))for(var t=0;t<e.length;t++){var o=e[t],i=o.getSnapshot;o=o.value;try{if(!pe(i(),o))return!1}catch{return!1}}}if(e=r.child,r.subtreeFlags&16384&&e!==null)e.return=r,r=e;else{if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function Qe(n,r){for(r&=~gd,r&=~Ya,n.suspendedLanes|=r,n.pingedLanes&=~r,n=n.expirationTimes;0<r;){var e=31-de(r),t=1<<e;n[e]=-1,r&=~t}}function nf(n){if(Zn&6)throw Error(sn(327));yo();var r=ta(n,0);if(!(r&1))return Fr(n,nr()),null;var e=Sa(n,r);if(n.tag!==0&&e===2){var t=Rc(n);t!==0&&(r=t,e=cu(n,t))}if(e===1)throw e=Ri,Nt(n,0),Qe(n,r),Fr(n,nr()),e;if(e===6)throw Error(sn(345));return n.finishedWork=n.current.alternate,n.finishedLanes=r,Pt(n,Ar,Te),Fr(n,nr()),null}function vd(n,r){var e=Zn;Zn|=1;try{return n(r)}finally{Zn=e,Zn===0&&(To=nr()+500,Va&&xt())}}function Ft(n){rt!==null&&rt.tag===0&&!(Zn&6)&&yo();var r=Zn;Zn|=1;var e=re.transition,t=zn;try{if(re.transition=null,zn=1,n)return n()}finally{zn=t,re.transition=e,Zn=r,!(Zn&6)&&xt()}}function xd(){Br=co.current,Un(co)}function Nt(n,r){n.finishedWork=null,n.finishedLanes=0;var e=n.timeoutHandle;if(e!==-1&&(n.timeoutHandle=-1,Dv(e)),ir!==null)for(e=ir.return;e!==null;){var t=e;switch(qu(t),t.tag){case 1:t=t.type.childContextTypes,t!=null&&la();break;case 3:Co(),Un(Dr),Un(Sr),ld();break;case 5:ad(t);break;case 4:Co();break;case 13:Un(Xn);break;case 19:Un(Xn);break;case 10:td(t.type._context);break;case 22:case 23:xd()}e=e.return}if(dr=n,ir=n=dt(n.current,null),pr=Br=r,cr=0,Ri=null,gd=Ya=Zt=0,Ar=pi=null,It!==null){for(r=0;r<It.length;r++)if(e=It[r],t=e.interleaved,t!==null){e.interleaved=null;var o=t.next,i=e.pending;if(i!==null){var s=i.next;i.next=o,t.next=s}e.pending=t}It=null}return n}function n0(n,r){do{var e=ir;try{if(ed(),zs.current=ya,ga){for(var t=Yn.memoizedState;t!==null;){var o=t.queue;o!==null&&(o.pending=null),t=t.next}ga=!1}if(Dt=0,ur=lr=Yn=null,hi=!1,ji=0,md.current=null,e===null||e.return===null){cr=1,Ri=r,ir=null;break}n:{var i=n,s=e.return,a=e,l=r;if(r=pr,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=a,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var m=zh(s);if(m!==null){m.flags&=-257,Bh(m,s,a,i,r),m.mode&1&&$h(i,c,r),r=m,l=c;var y=r.updateQueue;if(y===null){var v=new Set;v.add(l),r.updateQueue=v}else y.add(l);break n}else{if(!(r&1)){$h(i,c,r),wd();break n}l=Error(sn(426))}}else if(Kn&&a.mode&1){var A=zh(s);if(A!==null){!(A.flags&65536)&&(A.flags|=256),Bh(A,s,a,i,r),nd(Po(l,a));break n}}i=l=Po(l,a),cr!==4&&(cr=2),pi===null?pi=[i]:pi.push(i),i=s;do{switch(i.tag){case 3:i.flags|=65536,r&=-r,i.lanes|=r;var g=Dg(i,l,r);Oh(i,g);break n;case 1:a=l;var p=i.type,x=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(ct===null||!ct.has(x)))){i.flags|=65536,r&=-r,i.lanes|=r;var S=Zg(i,a,r);Oh(i,S);break n}}i=i.return}while(i!==null)}t0(e)}catch(b){r=b,ir===e&&e!==null&&(ir=e=e.return);continue}break}while(!0)}function r0(){var n=va.current;return va.current=ya,n===null?ya:n}function wd(){(cr===0||cr===3||cr===2)&&(cr=4),dr===null||!(Zt&268435455)&&!(Ya&268435455)||Qe(dr,pr)}function Sa(n,r){var e=Zn;Zn|=2;var t=r0();(dr!==n||pr!==r)&&(Te=null,Nt(n,r));do try{lx();break}catch(o){n0(n,o)}while(!0);if(ed(),Zn=e,va.current=t,ir!==null)throw Error(sn(261));return dr=null,pr=0,cr}function lx(){for(;ir!==null;)e0(ir)}function cx(){for(;ir!==null&&!O1();)e0(ir)}function e0(n){var r=i0(n.alternate,n,Br);n.memoizedProps=n.pendingProps,r===null?t0(n):ir=r,md.current=null}function t0(n){var r=n;do{var e=r.alternate;if(n=r.return,r.flags&32768){if(e=ex(e,r),e!==null){e.flags&=32767,ir=e;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{cr=6,ir=null;return}}else if(e=rx(e,r,Br),e!==null){ir=e;return}if(r=r.sibling,r!==null){ir=r;return}ir=r=n}while(r!==null);cr===0&&(cr=5)}function Pt(n,r,e){var t=zn,o=re.transition;try{re.transition=null,zn=1,ux(n,r,e,t)}finally{re.transition=o,zn=t}return null}function ux(n,r,e,t){do yo();while(rt!==null);if(Zn&6)throw Error(sn(327));e=n.finishedWork;var o=n.finishedLanes;if(e===null)return null;if(n.finishedWork=null,n.finishedLanes=0,e===n.current)throw Error(sn(177));n.callbackNode=null,n.callbackPriority=0;var i=e.lanes|e.childLanes;if(W1(n,i),n===dr&&(ir=dr=null,pr=0),!(e.subtreeFlags&2064)&&!(e.flags&2064)||gs||(gs=!0,s0(ea,function(){return yo(),null})),i=(e.flags&15990)!==0,e.subtreeFlags&15990||i){i=re.transition,re.transition=null;var s=zn;zn=1;var a=Zn;Zn|=4,md.current=null,ox(n,e),Qg(e,n),Mv(zc),oa=!!$c,zc=$c=null,n.current=e,ix(e),R1(),Zn=a,zn=s,re.transition=i}else n.current=e;if(gs&&(gs=!1,rt=n,wa=o),i=n.pendingLanes,i===0&&(ct=null),Z1(e.stateNode),Fr(n,nr()),r!==null)for(t=n.onRecoverableError,e=0;e<r.length;e++)o=r[e],t(o.value,{componentStack:o.stack,digest:o.digest});if(xa)throw xa=!1,n=au,au=null,n;return wa&1&&n.tag!==0&&yo(),i=n.pendingLanes,i&1?n===lu?mi++:(mi=0,lu=n):mi=0,xt(),null}function yo(){if(rt!==null){var n=Dm(wa),r=re.transition,e=zn;try{if(re.transition=null,zn=16>n?16:n,rt===null)var t=!1;else{if(n=rt,rt=null,wa=0,Zn&6)throw Error(sn(331));var o=Zn;for(Zn|=4,gn=n.current;gn!==null;){var i=gn,s=i.child;if(gn.flags&16){var a=i.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(gn=c;gn!==null;){var d=gn;switch(d.tag){case 0:case 11:case 15:fi(8,d,i)}var h=d.child;if(h!==null)h.return=d,gn=h;else for(;gn!==null;){d=gn;var f=d.sibling,m=d.return;if(Kg(d),d===c){gn=null;break}if(f!==null){f.return=m,gn=f;break}gn=m}}}var y=i.alternate;if(y!==null){var v=y.child;if(v!==null){y.child=null;do{var A=v.sibling;v.sibling=null,v=A}while(v!==null)}}gn=i}}if(i.subtreeFlags&2064&&s!==null)s.return=i,gn=s;else n:for(;gn!==null;){if(i=gn,i.flags&2048)switch(i.tag){case 0:case 11:case 15:fi(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,gn=g;break n}gn=i.return}}var p=n.current;for(gn=p;gn!==null;){s=gn;var x=s.child;if(s.subtreeFlags&2064&&x!==null)x.return=s,gn=x;else n:for(s=p;gn!==null;){if(a=gn,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Xa(9,a)}}catch(b){Jn(a,a.return,b)}if(a===s){gn=null;break n}var S=a.sibling;if(S!==null){S.return=a.return,gn=S;break n}gn=a.return}}if(Zn=o,xt(),Se&&typeof Se.onPostCommitFiberRoot=="function")try{Se.onPostCommitFiberRoot(za,n)}catch{}t=!0}return t}finally{zn=e,re.transition=r}}return!1}function rf(n,r,e){r=Po(e,r),r=Dg(n,r,1),n=lt(n,r,1),r=Ir(),n!==null&&(Wi(n,1,r),Fr(n,r))}function Jn(n,r,e){if(n.tag===3)rf(n,n,e);else for(;r!==null;){if(r.tag===3){rf(r,n,e);break}else if(r.tag===1){var t=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof t.componentDidCatch=="function"&&(ct===null||!ct.has(t))){n=Po(e,n),n=Zg(r,n,1),r=lt(r,n,1),n=Ir(),r!==null&&(Wi(r,1,n),Fr(r,n));break}}r=r.return}}function dx(n,r,e){var t=n.pingCache;t!==null&&t.delete(r),r=Ir(),n.pingedLanes|=n.suspendedLanes&e,dr===n&&(pr&e)===e&&(cr===4||cr===3&&(pr&130023424)===pr&&500>nr()-yd?Nt(n,0):gd|=e),Fr(n,r)}function o0(n,r){r===0&&(n.mode&1?(r=ss,ss<<=1,!(ss&130023424)&&(ss=4194304)):r=1);var e=Ir();n=De(n,r),n!==null&&(Wi(n,r,e),Fr(n,e))}function hx(n){var r=n.memoizedState,e=0;r!==null&&(e=r.retryLane),o0(n,e)}function fx(n,r){var e=0;switch(n.tag){case 13:var t=n.stateNode,o=n.memoizedState;o!==null&&(e=o.retryLane);break;case 19:t=n.stateNode;break;default:throw Error(sn(314))}t!==null&&t.delete(r),o0(n,e)}var i0;i0=function(n,r,e){if(n!==null)if(n.memoizedProps!==r.pendingProps||Dr.current)Rr=!0;else{if(!(n.lanes&e)&&!(r.flags&128))return Rr=!1,nx(n,r,e);Rr=!!(n.flags&131072)}else Rr=!1,Kn&&r.flags&1048576&&cg(r,da,r.index);switch(r.lanes=0,r.tag){case 2:var t=r.type;Hs(n,r),n=r.pendingProps;var o=ko(r,Sr.current);go(r,e),o=ud(null,r,t,n,o,e);var i=dd();return r.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,Zr(t)?(i=!0,ca(r)):i=!1,r.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,id(r),o.updater=Ka,r.stateNode=o,o._reactInternals=r,Yc(r,t,n,e),r=qc(null,r,t,!0,i,e)):(r.tag=0,Kn&&i&&Ju(r),Tr(null,r,o,e),r=r.child),r;case 16:t=r.elementType;n:{switch(Hs(n,r),n=r.pendingProps,o=t._init,t=o(t._payload),r.type=t,o=r.tag=mx(t),n=se(t,n),o){case 0:r=Jc(null,r,t,n,e);break n;case 1:r=Gh(null,r,t,n,e);break n;case 11:r=Hh(null,r,t,n,e);break n;case 14:r=Wh(null,r,t,se(t.type,n),e);break n}throw Error(sn(306,t,""))}return r;case 0:return t=r.type,o=r.pendingProps,o=r.elementType===t?o:se(t,o),Jc(n,r,t,o,e);case 1:return t=r.type,o=r.pendingProps,o=r.elementType===t?o:se(t,o),Gh(n,r,t,o,e);case 3:n:{if(Bg(r),n===null)throw Error(sn(387));t=r.pendingProps,i=r.memoizedState,o=i.element,mg(n,r),pa(r,t,null,e);var s=r.memoizedState;if(t=s.element,i.isDehydrated)if(i={element:t,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},r.updateQueue.baseState=i,r.memoizedState=i,r.flags&256){o=Po(Error(sn(423)),r),r=Vh(n,r,t,e,o);break n}else if(t!==o){o=Po(Error(sn(424)),r),r=Vh(n,r,t,e,o);break n}else for(Hr=at(r.stateNode.containerInfo.firstChild),Wr=r,Kn=!0,le=null,e=fg(r,null,t,e),r.child=e;e;)e.flags=e.flags&-3|4096,e=e.sibling;else{if(_o(),t===o){r=Ze(n,r,e);break n}Tr(n,r,t,e)}r=r.child}return r;case 5:return gg(r),n===null&&Uc(r),t=r.type,o=r.pendingProps,i=n!==null?n.memoizedProps:null,s=o.children,Bc(t,o)?s=null:i!==null&&Bc(t,i)&&(r.flags|=32),zg(n,r),Tr(n,r,s,e),r.child;case 6:return n===null&&Uc(r),null;case 13:return Hg(n,r,e);case 4:return sd(r,r.stateNode.containerInfo),t=r.pendingProps,n===null?r.child=bo(r,null,t,e):Tr(n,r,t,e),r.child;case 11:return t=r.type,o=r.pendingProps,o=r.elementType===t?o:se(t,o),Hh(n,r,t,o,e);case 7:return Tr(n,r,r.pendingProps,e),r.child;case 8:return Tr(n,r,r.pendingProps.children,e),r.child;case 12:return Tr(n,r,r.pendingProps.children,e),r.child;case 10:n:{if(t=r.type._context,o=r.pendingProps,i=r.memoizedProps,s=o.value,Wn(ha,t._currentValue),t._currentValue=s,i!==null)if(pe(i.value,s)){if(i.children===o.children&&!Dr.current){r=Ze(n,r,e);break n}}else for(i=r.child,i!==null&&(i.return=r);i!==null;){var a=i.dependencies;if(a!==null){s=i.child;for(var l=a.firstContext;l!==null;){if(l.context===t){if(i.tag===1){l=Ae(-1,e&-e),l.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}i.lanes|=e,l=i.alternate,l!==null&&(l.lanes|=e),Kc(i.return,e,r),a.lanes|=e;break}l=l.next}}else if(i.tag===10)s=i.type===r.type?null:i.child;else if(i.tag===18){if(s=i.return,s===null)throw Error(sn(341));s.lanes|=e,a=s.alternate,a!==null&&(a.lanes|=e),Kc(s,e,r),s=i.sibling}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===r){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}Tr(n,r,o.children,e),r=r.child}return r;case 9:return o=r.type,t=r.pendingProps.children,go(r,e),o=ee(o),t=t(o),r.flags|=1,Tr(n,r,t,e),r.child;case 14:return t=r.type,o=se(t,r.pendingProps),o=se(t.type,o),Wh(n,r,t,o,e);case 15:return Fg(n,r,r.type,r.pendingProps,e);case 17:return t=r.type,o=r.pendingProps,o=r.elementType===t?o:se(t,o),Hs(n,r),r.tag=1,Zr(t)?(n=!0,ca(r)):n=!1,go(r,e),Lg(r,t,o),Yc(r,t,o,e),qc(null,r,t,!0,n,e);case 19:return Wg(n,r,e);case 22:return $g(n,r,e)}throw Error(sn(156,r.tag))};function s0(n,r){return Am(n,r)}function px(n,r,e,t){this.tag=n,this.key=e,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=t,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qr(n,r,e,t){return new px(n,r,e,t)}function Sd(n){return n=n.prototype,!(!n||!n.isReactComponent)}function mx(n){if(typeof n=="function")return Sd(n)?1:0;if(n!=null){if(n=n.$$typeof,n===$u)return 11;if(n===zu)return 14}return 2}function dt(n,r){var e=n.alternate;return e===null?(e=qr(n.tag,r,n.key,n.mode),e.elementType=n.elementType,e.type=n.type,e.stateNode=n.stateNode,e.alternate=n,n.alternate=e):(e.pendingProps=r,e.type=n.type,e.flags=0,e.subtreeFlags=0,e.deletions=null),e.flags=n.flags&14680064,e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,r=n.dependencies,e.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},e.sibling=n.sibling,e.index=n.index,e.ref=n.ref,e}function Vs(n,r,e,t,o,i){var s=2;if(t=n,typeof n=="function")Sd(n)&&(s=1);else if(typeof n=="string")s=5;else n:switch(n){case qt:return jt(e.children,o,i,r);case Fu:s=8,o|=8;break;case wc:return n=qr(12,e,r,o|2),n.elementType=wc,n.lanes=i,n;case Sc:return n=qr(13,e,r,o),n.elementType=Sc,n.lanes=i,n;case kc:return n=qr(19,e,r,o),n.elementType=kc,n.lanes=i,n;case gm:return Qa(e,o,i,r);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case pm:s=10;break n;case mm:s=9;break n;case $u:s=11;break n;case zu:s=14;break n;case Ue:s=16,t=null;break n}throw Error(sn(130,n==null?n:typeof n,""))}return r=qr(s,e,r,o),r.elementType=n,r.type=t,r.lanes=i,r}function jt(n,r,e,t){return n=qr(7,n,t,r),n.lanes=e,n}function Qa(n,r,e,t){return n=qr(22,n,t,r),n.elementType=gm,n.lanes=e,n.stateNode={isHidden:!1},n}function Vl(n,r,e){return n=qr(6,n,null,r),n.lanes=e,n}function Ul(n,r,e){return r=qr(4,n.children!==null?n.children:[],n.key,r),r.lanes=e,r.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},r}function gx(n,r,e,t,o){this.tag=r,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Tl(0),this.expirationTimes=Tl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Tl(0),this.identifierPrefix=t,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function kd(n,r,e,t,o,i,s,a,l){return n=new gx(n,r,e,a,l),r===1?(r=1,i===!0&&(r|=8)):r=0,i=qr(3,null,null,r),n.current=i,i.stateNode=n,i.memoizedState={element:t,isDehydrated:e,cache:null,transitions:null,pendingSuspenseBoundaries:null},id(i),n}function yx(n,r,e){var t=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jt,key:t==null?null:""+t,children:n,containerInfo:r,implementation:e}}function a0(n){if(!n)return mt;n=n._reactInternals;n:{if(Ht(n)!==n||n.tag!==1)throw Error(sn(170));var r=n;do{switch(r.tag){case 3:r=r.stateNode.context;break n;case 1:if(Zr(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break n}}r=r.return}while(r!==null);throw Error(sn(171))}if(n.tag===1){var e=n.type;if(Zr(e))return ag(n,e,r)}return r}function l0(n,r,e,t,o,i,s,a,l){return n=kd(e,t,!0,n,o,i,s,a,l),n.context=a0(null),e=n.current,t=Ir(),o=ut(e),i=Ae(t,o),i.callback=r??null,lt(e,i,o),n.current.lanes=o,Wi(n,o,t),Fr(n,t),n}function Ja(n,r,e,t){var o=r.current,i=Ir(),s=ut(o);return e=a0(e),r.context===null?r.context=e:r.pendingContext=e,r=Ae(i,s),r.payload={element:n},t=t===void 0?null:t,t!==null&&(r.callback=t),n=lt(o,r,s),n!==null&&(he(n,o,s,i),$s(n,o,s)),s}function ka(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function ef(n,r){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var e=n.retryLane;n.retryLane=e!==0&&e<r?e:r}}function _d(n,r){ef(n,r),(n=n.alternate)&&ef(n,r)}function vx(){return null}var c0=typeof reportError=="function"?reportError:function(n){console.error(n)};function bd(n){this._internalRoot=n}qa.prototype.render=bd.prototype.render=function(n){var r=this._internalRoot;if(r===null)throw Error(sn(409));Ja(n,r,null,null)};qa.prototype.unmount=bd.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var r=n.containerInfo;Ft(function(){Ja(null,n,null,null)}),r[Le]=null}};function qa(n){this._internalRoot=n}qa.prototype.unstable_scheduleHydration=function(n){if(n){var r=$m();n={blockedOn:null,target:n,priority:r};for(var e=0;e<Ye.length&&r!==0&&r<Ye[e].priority;e++);Ye.splice(e,0,n),e===0&&Bm(n)}};function Cd(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function nl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function tf(){}function xx(n,r,e,t,o){if(o){if(typeof t=="function"){var i=t;t=function(){var c=ka(s);i.call(c)}}var s=l0(r,t,n,0,null,!1,!1,"",tf);return n._reactRootContainer=s,n[Le]=s.current,Ti(n.nodeType===8?n.parentNode:n),Ft(),s}for(;o=n.lastChild;)n.removeChild(o);if(typeof t=="function"){var a=t;t=function(){var c=ka(l);a.call(c)}}var l=kd(n,0,!1,null,null,!1,!1,"",tf);return n._reactRootContainer=l,n[Le]=l.current,Ti(n.nodeType===8?n.parentNode:n),Ft(function(){Ja(r,l,e,t)}),l}function rl(n,r,e,t,o){var i=e._reactRootContainer;if(i){var s=i;if(typeof o=="function"){var a=o;o=function(){var l=ka(s);a.call(l)}}Ja(r,s,n,o)}else s=xx(e,r,n,o,t);return ka(s)}Zm=function(n){switch(n.tag){case 3:var r=n.stateNode;if(r.current.memoizedState.isDehydrated){var e=ni(r.pendingLanes);e!==0&&(Wu(r,e|1),Fr(r,nr()),!(Zn&6)&&(To=nr()+500,xt()))}break;case 13:Ft(function(){var t=De(n,1);if(t!==null){var o=Ir();he(t,n,1,o)}}),_d(n,1)}};Gu=function(n){if(n.tag===13){var r=De(n,134217728);if(r!==null){var e=Ir();he(r,n,134217728,e)}_d(n,134217728)}};Fm=function(n){if(n.tag===13){var r=ut(n),e=De(n,r);if(e!==null){var t=Ir();he(e,n,r,t)}_d(n,r)}};$m=function(){return zn};zm=function(n,r){var e=zn;try{return zn=n,r()}finally{zn=e}};jc=function(n,r,e){switch(r){case"input":if(Cc(n,e),r=e.name,e.type==="radio"&&r!=null){for(e=n;e.parentNode;)e=e.parentNode;for(e=e.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<e.length;r++){var t=e[r];if(t!==n&&t.form===n.form){var o=Ga(t);if(!o)throw Error(sn(90));vm(t),Cc(t,o)}}}break;case"textarea":wm(n,e);break;case"select":r=e.value,r!=null&&ho(n,!!e.multiple,r,!1)}};Tm=vd;Im=Ft;var wx={usingClientEntryPoint:!1,Events:[Vi,to,Ga,Cm,Pm,vd]},Wo={findFiberByHostInstance:Tt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Sx={bundleType:Wo.bundleType,version:Wo.version,rendererPackageName:Wo.rendererPackageName,rendererConfig:Wo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Be.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Nm(n),n===null?null:n.stateNode},findFiberByHostInstance:Wo.findFiberByHostInstance||vx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ys=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ys.isDisabled&&ys.supportsFiber)try{za=ys.inject(Sx),Se=ys}catch{}}Ur.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=wx;Ur.createPortal=function(n,r){var e=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Cd(r))throw Error(sn(200));return yx(n,r,null,e)};Ur.createRoot=function(n,r){if(!Cd(n))throw Error(sn(299));var e=!1,t="",o=c0;return r!=null&&(r.unstable_strictMode===!0&&(e=!0),r.identifierPrefix!==void 0&&(t=r.identifierPrefix),r.onRecoverableError!==void 0&&(o=r.onRecoverableError)),r=kd(n,1,!1,null,null,e,!1,t,o),n[Le]=r.current,Ti(n.nodeType===8?n.parentNode:n),new bd(r)};Ur.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var r=n._reactInternals;if(r===void 0)throw typeof n.render=="function"?Error(sn(188)):(n=Object.keys(n).join(","),Error(sn(268,n)));return n=Nm(r),n=n===null?null:n.stateNode,n};Ur.flushSync=function(n){return Ft(n)};Ur.hydrate=function(n,r,e){if(!nl(r))throw Error(sn(200));return rl(null,n,r,!0,e)};Ur.hydrateRoot=function(n,r,e){if(!Cd(n))throw Error(sn(405));var t=e!=null&&e.hydratedSources||null,o=!1,i="",s=c0;if(e!=null&&(e.unstable_strictMode===!0&&(o=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),r=l0(r,null,n,1,e??null,o,!1,i,s),n[Le]=r.current,Ti(n),t)for(n=0;n<t.length;n++)e=t[n],o=e._getVersion,o=o(e._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[e,o]:r.mutableSourceEagerHydrationData.push(e,o);return new qa(r)};Ur.render=function(n,r,e){if(!nl(r))throw Error(sn(200));return rl(null,n,r,!1,e)};Ur.unmountComponentAtNode=function(n){if(!nl(n))throw Error(sn(40));return n._reactRootContainer?(Ft(function(){rl(null,null,n,!1,function(){n._reactRootContainer=null,n[Le]=null})}),!0):!1};Ur.unstable_batchedUpdates=vd;Ur.unstable_renderSubtreeIntoContainer=function(n,r,e,t){if(!nl(e))throw Error(sn(200));if(n==null||n._reactInternals===void 0)throw Error(sn(38));return rl(n,r,e,!1,t)};Ur.version="18.3.1-next-f1338f8080-20240426";function u0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u0)}catch(n){console.error(n)}}u0(),um.exports=Ur;var Ki=um.exports,of=Ki;vc.createRoot=of.createRoot,vc.hydrateRoot=of.hydrateRoot;const kx={},sf=n=>{let r;const e=new Set,t=(d,h)=>{const f=typeof d=="function"?d(r):d;if(!Object.is(f,r)){const m=r;r=h??(typeof f!="object"||f===null)?f:Object.assign({},r,f),e.forEach(y=>y(r,m))}},o=()=>r,l={setState:t,getState:o,getInitialState:()=>c,subscribe:d=>(e.add(d),()=>e.delete(d)),destroy:()=>{(kx?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),e.clear()}},c=r=n(t,o,l);return l},d0=n=>n?sf(n):sf;var h0={exports:{}},f0={},p0={exports:{}},m0={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Io=N;function _x(n,r){return n===r&&(n!==0||1/n===1/r)||n!==n&&r!==r}var bx=typeof Object.is=="function"?Object.is:_x,Cx=Io.useState,Px=Io.useEffect,Tx=Io.useLayoutEffect,Ix=Io.useDebugValue;function Ex(n,r){var e=r(),t=Cx({inst:{value:e,getSnapshot:r}}),o=t[0].inst,i=t[1];return Tx(function(){o.value=e,o.getSnapshot=r,Kl(o)&&i({inst:o})},[n,e,r]),Px(function(){return Kl(o)&&i({inst:o}),n(function(){Kl(o)&&i({inst:o})})},[n]),Ix(e),e}function Kl(n){var r=n.getSnapshot;n=n.value;try{var e=r();return!bx(n,e)}catch{return!0}}function Mx(n,r){return r()}var Nx=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Mx:Ex;m0.useSyncExternalStore=Io.useSyncExternalStore!==void 0?Io.useSyncExternalStore:Nx;p0.exports=m0;var jx=p0.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var el=N,Ax=jx;function Ox(n,r){return n===r&&(n!==0||1/n===1/r)||n!==n&&r!==r}var Rx=typeof Object.is=="function"?Object.is:Ox,Lx=Ax.useSyncExternalStore,Dx=el.useRef,Zx=el.useEffect,Fx=el.useMemo,$x=el.useDebugValue;f0.useSyncExternalStoreWithSelector=function(n,r,e,t,o){var i=Dx(null);if(i.current===null){var s={hasValue:!1,value:null};i.current=s}else s=i.current;i=Fx(function(){function l(m){if(!c){if(c=!0,d=m,m=t(m),o!==void 0&&s.hasValue){var y=s.value;if(o(y,m))return h=y}return h=m}if(y=h,Rx(d,m))return y;var v=t(m);return o!==void 0&&o(y,v)?(d=m,y):(d=m,h=v)}var c=!1,d,h,f=e===void 0?null:e;return[function(){return l(r())},f===null?void 0:function(){return l(f())}]},[r,e,t,o]);var a=Lx(n,i[0],i[1]);return Zx(function(){s.hasValue=!0,s.value=a},[a]),$x(a),a};h0.exports=f0;var zx=h0.exports;const Bx=Qp(zx),g0={},{useDebugValue:Hx}=lm,{useSyncExternalStoreWithSelector:Wx}=Bx;let af=!1;const Gx=n=>n;function Vx(n,r=Gx,e){(g0?"production":void 0)!=="production"&&e&&!af&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),af=!0);const t=Wx(n.subscribe,n.getState,n.getServerState||n.getInitialState,r,e);return Hx(t),t}const Ux=n=>{(g0?"production":void 0)!=="production"&&typeof n!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const r=typeof n=="function"?d0(n):n,e=(t,o)=>Vx(r,t,o);return Object.assign(e,r),e},tl=n=>Ux,Kx=n=>(r,e,t)=>{const o=t.subscribe;return t.subscribe=(s,a,l)=>{let c=s;if(a){const d=(l==null?void 0:l.equalityFn)||Object.is;let h=s(t.getState());c=f=>{const m=s(f);if(!d(h,m)){const y=h;a(h=m,y)}},l!=null&&l.fireImmediately&&a(h,h)}return o(c)},n(r,e,t)},Xx=Kx;var lf=(n,r,e)=>(o,i)=>({pastStates:(e==null?void 0:e.pastStates)||[],futureStates:(e==null?void 0:e.futureStates)||[],undo:(s=1)=>{var a,l;if(i().pastStates.length){const c=((a=e==null?void 0:e.partialize)==null?void 0:a.call(e,r()))||r(),d=i().pastStates.splice(-s,s),h=d.shift();n(h),o({pastStates:i().pastStates,futureStates:i().futureStates.concat(((l=e==null?void 0:e.diff)==null?void 0:l.call(e,c,h))||c,d.reverse())})}},redo:(s=1)=>{var a,l;if(i().futureStates.length){const c=((a=e==null?void 0:e.partialize)==null?void 0:a.call(e,r()))||r(),d=i().futureStates.splice(-s,s),h=d.shift();n(h),o({pastStates:i().pastStates.concat(((l=e==null?void 0:e.diff)==null?void 0:l.call(e,c,h))||c,d.reverse()),futureStates:i().futureStates})}},clear:()=>o({pastStates:[],futureStates:[]}),isTracking:!0,pause:()=>o({isTracking:!1}),resume:()=>o({isTracking:!0}),setOnSave:s=>o({_onSave:s}),_onSave:e==null?void 0:e.onSave,_handleSet:(s,a,l,c)=>{var d,h;e!=null&&e.limit&&i().pastStates.length>=(e==null?void 0:e.limit)&&i().pastStates.shift(),(h=(d=i())._onSave)==null||h.call(d,s,l),o({pastStates:i().pastStates.concat(c||s),futureStates:[]})}}),ol=(n,r)=>(t,o,i)=>{var c,d;i.temporal=d0(((c=r==null?void 0:r.wrapTemporal)==null?void 0:c.call(r,lf(t,o,r)))||lf(t,o,r));const s=((d=r==null?void 0:r.handleSet)==null?void 0:d.call(r,i.temporal.getState()._handleSet))||i.temporal.getState()._handleSet,a=h=>{var y,v,A;if(!i.temporal.getState().isTracking)return;const f=((y=r==null?void 0:r.partialize)==null?void 0:y.call(r,o()))||o(),m=(v=r==null?void 0:r.diff)==null?void 0:v.call(r,h,f);m===null||(A=r==null?void 0:r.equality)!=null&&A.call(r,h,f)||s(h,void 0,f,m)},l=i.setState;return i.setState=(...h)=>{var m;const f=((m=r==null?void 0:r.partialize)==null?void 0:m.call(r,o()))||o();l(...h),a(f)},n((...h)=>{var m;const f=((m=r==null?void 0:r.partialize)==null?void 0:m.call(r,o()))||o();t(...h),a(f)},o,i)};const Yx=[32,48,64,96,128,192,256,384,512],y0=()=>({wallM:.25,hatch:!0,shadow:!0}),Qx=(n,r="평면도 1")=>({id:n,name:r,grid:[256,256],overlay:{visible:!0,opacity:.5,tx:0,ty:0,scale:1},images:[],geo:[],struct:[],zones:[],doors:[],stairs:[],texts:[],markers:[],strokes:[],pathVisible:!0,style:y0()}),Xl=(n,r="매싱 1")=>({id:n,name:r,grid:[64,64],view:{dir:0},blocks:[]}),Yl=(n,r="흐름 1")=>({id:n,name:r,grid:128,start:{x:8,y:64},boxes:[],discs:[]}),Ql=(n,r="페이싱 1")=>({id:n,name:r,updatedAt:Date.now(),segments:[{id:n+"-s0",name:"구간 1",width:1}],points:[],markers:[]});function gi(n){const r=(Array.isArray(n.topdowns)?n.topdowns:[]).map(o=>{const{layers:i,paths:s,cellSize:a,...l}=o;return{...l,overlay:o.overlay??{visible:!0,opacity:.5,tx:0,ty:0,scale:1},images:Array.isArray(o.images)?o.images:[],geo:Array.isArray(o.geo)?o.geo:[],struct:Array.isArray(o.struct)?o.struct:[],zones:Array.isArray(o.zones)?o.zones:[],doors:Array.isArray(o.doors)?o.doors:[],stairs:Array.isArray(o.stairs)?o.stairs:[],texts:Array.isArray(o.texts)?o.texts:[],markers:Array.isArray(o.markers)?o.markers:[],strokes:Array.isArray(o.strokes)?o.strokes:[],pathVisible:o.pathVisible!==!1,style:o.style??y0()}}),{massings:e,...t}=n;return{...t,version:2,decorations:n.decorations??[],images:n.images??[],topdowns:r}}const Jx=()=>({theme:"",intent:"",coreMechanic:"",learningGoals:[],pacing:""}),vs=n=>({id:n,version:2,name:"새 레벨",updatedAt:Date.now(),concept:Jx(),postits:[],nodes:[],edges:[],decorations:[],images:[],topdowns:[],view:{edgeStyle:"clean",autoLayout:!0,showGrid:!0,showMinimap:!0},theme:{hueShift:0,satScale:1},ai:{provider:"none",preferPro:!0,usage:{proUsedToday:0,flashUsedToday:0,lastResetDay:new Date().toISOString().slice(0,10)}}});class gt{constructor(r,e){this.next=null,this.key=r,this.data=e,this.left=null,this.right=null}}function qx(n,r){return n>r?1:n<r?-1:0}function Je(n,r,e){const t=new gt(null,null);let o=t,i=t;for(;;){const s=e(n,r.key);if(s<0){if(r.left===null)break;if(e(n,r.left.key)<0){const a=r.left;if(r.left=a.right,a.right=r,r=a,r.left===null)break}i.left=r,i=r,r=r.left}else if(s>0){if(r.right===null)break;if(e(n,r.right.key)>0){const a=r.right;if(r.right=a.left,a.left=r,r=a,r.right===null)break}o.right=r,o=r,r=r.right}else break}return o.right=r.left,i.left=r.right,r.left=t.right,r.right=t.left,r}function Jl(n,r,e,t){const o=new gt(n,r);if(e===null)return o.left=o.right=null,o;e=Je(n,e,t);const i=t(n,e.key);return i<0?(o.left=e.left,o.right=e,e.left=null):i>=0&&(o.right=e.right,o.left=e,e.right=null),o}function cf(n,r,e){let t=null,o=null;if(r){r=Je(n,r,e);const i=e(r.key,n);i===0?(t=r.left,o=r.right):i<0?(o=r.right,r.right=null,t=r):(t=r.left,r.left=null,o=r)}return{left:t,right:o}}function nw(n,r,e){return r===null?n:(n===null||(r=Je(n.key,r,e),r.left=n),r)}function du(n,r,e,t,o){if(n){t(`${r}${e?"└── ":"├── "}${o(n)}
`);const i=r+(e?"    ":"│   ");n.left&&du(n.left,i,!1,t,o),n.right&&du(n.right,i,!0,t,o)}}class Pd{constructor(r=qx){this._root=null,this._size=0,this._comparator=r}insert(r,e){return this._size++,this._root=Jl(r,e,this._root,this._comparator)}add(r,e){const t=new gt(r,e);this._root===null&&(t.left=t.right=null,this._size++,this._root=t);const o=this._comparator,i=Je(r,this._root,o),s=o(r,i.key);return s===0?this._root=i:(s<0?(t.left=i.left,t.right=i,i.left=null):s>0&&(t.right=i.right,t.left=i,i.right=null),this._size++,this._root=t),this._root}remove(r){this._root=this._remove(r,this._root,this._comparator)}_remove(r,e,t){let o;return e===null?null:(e=Je(r,e,t),t(r,e.key)===0?(e.left===null?o=e.right:(o=Je(r,e.left,t),o.right=e.right),this._size--,o):e)}pop(){let r=this._root;if(r){for(;r.left;)r=r.left;return this._root=Je(r.key,this._root,this._comparator),this._root=this._remove(r.key,this._root,this._comparator),{key:r.key,data:r.data}}return null}findStatic(r){let e=this._root;const t=this._comparator;for(;e;){const o=t(r,e.key);if(o===0)return e;o<0?e=e.left:e=e.right}return null}find(r){return this._root&&(this._root=Je(r,this._root,this._comparator),this._comparator(r,this._root.key)!==0)?null:this._root}contains(r){let e=this._root;const t=this._comparator;for(;e;){const o=t(r,e.key);if(o===0)return!0;o<0?e=e.left:e=e.right}return!1}forEach(r,e){let t=this._root;const o=[];let i=!1;for(;!i;)t!==null?(o.push(t),t=t.left):o.length!==0?(t=o.pop(),r.call(e,t),t=t.right):i=!0;return this}range(r,e,t,o){const i=[],s=this._comparator;let a=this._root,l;for(;i.length!==0||a;)if(a)i.push(a),a=a.left;else{if(a=i.pop(),l=s(a.key,e),l>0)break;if(s(a.key,r)>=0&&t.call(o,a))return this;a=a.right}return this}keys(){const r=[];return this.forEach(({key:e})=>{r.push(e)}),r}values(){const r=[];return this.forEach(({data:e})=>{r.push(e)}),r}min(){return this._root?this.minNode(this._root).key:null}max(){return this._root?this.maxNode(this._root).key:null}minNode(r=this._root){if(r)for(;r.left;)r=r.left;return r}maxNode(r=this._root){if(r)for(;r.right;)r=r.right;return r}at(r){let e=this._root,t=!1,o=0;const i=[];for(;!t;)if(e)i.push(e),e=e.left;else if(i.length>0){if(e=i.pop(),o===r)return e;o++,e=e.right}else t=!0;return null}next(r){let e=this._root,t=null;if(r.right){for(t=r.right;t.left;)t=t.left;return t}const o=this._comparator;for(;e;){const i=o(r.key,e.key);if(i===0)break;i<0?(t=e,e=e.left):e=e.right}return t}prev(r){let e=this._root,t=null;if(r.left!==null){for(t=r.left;t.right;)t=t.right;return t}const o=this._comparator;for(;e;){const i=o(r.key,e.key);if(i===0)break;i<0?e=e.left:(t=e,e=e.right)}return t}clear(){return this._root=null,this._size=0,this}toList(){return ew(this._root)}load(r,e=[],t=!1){let o=r.length;const i=this._comparator;if(t&&pu(r,e,0,o-1,i),this._root===null)this._root=hu(r,e,0,o),this._size=o;else{const s=tw(this.toList(),rw(r,e),i);o=this._size+o,this._root=fu({head:s},0,o)}return this}isEmpty(){return this._root===null}get size(){return this._size}get root(){return this._root}toString(r=e=>String(e.key)){const e=[];return du(this._root,"",!0,t=>e.push(t),r),e.join("")}update(r,e,t){const o=this._comparator;let{left:i,right:s}=cf(r,this._root,o);o(r,e)<0?s=Jl(e,t,s,o):i=Jl(e,t,i,o),this._root=nw(i,s,o)}split(r){return cf(r,this._root,this._comparator)}*[Symbol.iterator](){let r=this._root;const e=[];let t=!1;for(;!t;)r!==null?(e.push(r),r=r.left):e.length!==0?(r=e.pop(),yield r,r=r.right):t=!0}}function hu(n,r,e,t){const o=t-e;if(o>0){const i=e+Math.floor(o/2),s=n[i],a=r[i],l=new gt(s,a);return l.left=hu(n,r,e,i),l.right=hu(n,r,i+1,t),l}return null}function rw(n,r){const e=new gt(null,null);let t=e;for(let o=0;o<n.length;o++)t=t.next=new gt(n[o],r[o]);return t.next=null,e.next}function ew(n){let r=n;const e=[];let t=!1;const o=new gt(null,null);let i=o;for(;!t;)r?(e.push(r),r=r.left):e.length>0?(r=i=i.next=e.pop(),r=r.right):t=!0;return i.next=null,o.next}function fu(n,r,e){const t=e-r;if(t>0){const o=r+Math.floor(t/2),i=fu(n,r,o),s=n.head;return s.left=i,n.head=n.head.next,s.right=fu(n,o+1,e),s}return null}function tw(n,r,e){const t=new gt(null,null);let o=t,i=n,s=r;for(;i!==null&&s!==null;)e(i.key,s.key)<0?(o.next=i,i=i.next):(o.next=s,s=s.next),o=o.next;return i!==null?o.next=i:s!==null&&(o.next=s),t.next}function pu(n,r,e,t,o){if(e>=t)return;const i=n[e+t>>1];let s=e-1,a=t+1;for(;;){do s++;while(o(n[s],i)<0);do a--;while(o(n[a],i)>0);if(s>=a)break;let l=n[s];n[s]=n[a],n[a]=l,l=r[s],r[s]=r[a],r[a]=l}pu(n,r,e,a,o),pu(n,r,a+1,t,o)}const Oe=11102230246251565e-32,vr=134217729,ow=(3+8*Oe)*Oe;function ql(n,r,e,t,o){let i,s,a,l,c=r[0],d=t[0],h=0,f=0;d>c==d>-c?(i=c,c=r[++h]):(i=d,d=t[++f]);let m=0;if(h<n&&f<e)for(d>c==d>-c?(s=c+i,a=i-(s-c),c=r[++h]):(s=d+i,a=i-(s-d),d=t[++f]),i=s,a!==0&&(o[m++]=a);h<n&&f<e;)d>c==d>-c?(s=i+c,l=s-i,a=i-(s-l)+(c-l),c=r[++h]):(s=i+d,l=s-i,a=i-(s-l)+(d-l),d=t[++f]),i=s,a!==0&&(o[m++]=a);for(;h<n;)s=i+c,l=s-i,a=i-(s-l)+(c-l),c=r[++h],i=s,a!==0&&(o[m++]=a);for(;f<e;)s=i+d,l=s-i,a=i-(s-l)+(d-l),d=t[++f],i=s,a!==0&&(o[m++]=a);return(i!==0||m===0)&&(o[m++]=i),m}function iw(n,r){let e=r[0];for(let t=1;t<n;t++)e+=r[t];return e}function Xi(n){return new Float64Array(n)}const sw=(3+16*Oe)*Oe,aw=(2+12*Oe)*Oe,lw=(9+64*Oe)*Oe*Oe,Kt=Xi(4),uf=Xi(8),df=Xi(12),hf=Xi(16),Pr=Xi(4);function cw(n,r,e,t,o,i,s){let a,l,c,d,h,f,m,y,v,A,g,p,x,S,b,O,E,Z;const F=n-o,K=e-o,I=r-i,Y=t-i;S=F*Y,f=vr*F,m=f-(f-F),y=F-m,f=vr*Y,v=f-(f-Y),A=Y-v,b=y*A-(S-m*v-y*v-m*A),O=I*K,f=vr*I,m=f-(f-I),y=I-m,f=vr*K,v=f-(f-K),A=K-v,E=y*A-(O-m*v-y*v-m*A),g=b-E,h=b-g,Kt[0]=b-(g+h)+(h-E),p=S+g,h=p-S,x=S-(p-h)+(g-h),g=x-O,h=x-g,Kt[1]=x-(g+h)+(h-O),Z=p+g,h=Z-p,Kt[2]=p-(Z-h)+(g-h),Kt[3]=Z;let H=iw(4,Kt),k=aw*s;if(H>=k||-H>=k||(h=n-F,a=n-(F+h)+(h-o),h=e-K,c=e-(K+h)+(h-o),h=r-I,l=r-(I+h)+(h-i),h=t-Y,d=t-(Y+h)+(h-i),a===0&&l===0&&c===0&&d===0)||(k=lw*s+ow*Math.abs(H),H+=F*d+Y*a-(I*c+K*l),H>=k||-H>=k))return H;S=a*Y,f=vr*a,m=f-(f-a),y=a-m,f=vr*Y,v=f-(f-Y),A=Y-v,b=y*A-(S-m*v-y*v-m*A),O=l*K,f=vr*l,m=f-(f-l),y=l-m,f=vr*K,v=f-(f-K),A=K-v,E=y*A-(O-m*v-y*v-m*A),g=b-E,h=b-g,Pr[0]=b-(g+h)+(h-E),p=S+g,h=p-S,x=S-(p-h)+(g-h),g=x-O,h=x-g,Pr[1]=x-(g+h)+(h-O),Z=p+g,h=Z-p,Pr[2]=p-(Z-h)+(g-h),Pr[3]=Z;const R=ql(4,Kt,4,Pr,uf);S=F*d,f=vr*F,m=f-(f-F),y=F-m,f=vr*d,v=f-(f-d),A=d-v,b=y*A-(S-m*v-y*v-m*A),O=I*c,f=vr*I,m=f-(f-I),y=I-m,f=vr*c,v=f-(f-c),A=c-v,E=y*A-(O-m*v-y*v-m*A),g=b-E,h=b-g,Pr[0]=b-(g+h)+(h-E),p=S+g,h=p-S,x=S-(p-h)+(g-h),g=x-O,h=x-g,Pr[1]=x-(g+h)+(h-O),Z=p+g,h=Z-p,Pr[2]=p-(Z-h)+(g-h),Pr[3]=Z;const M=ql(R,uf,4,Pr,df);S=a*d,f=vr*a,m=f-(f-a),y=a-m,f=vr*d,v=f-(f-d),A=d-v,b=y*A-(S-m*v-y*v-m*A),O=l*c,f=vr*l,m=f-(f-l),y=l-m,f=vr*c,v=f-(f-c),A=c-v,E=y*A-(O-m*v-y*v-m*A),g=b-E,h=b-g,Pr[0]=b-(g+h)+(h-E),p=S+g,h=p-S,x=S-(p-h)+(g-h),g=x-O,h=x-g,Pr[1]=x-(g+h)+(h-O),Z=p+g,h=Z-p,Pr[2]=p-(Z-h)+(g-h),Pr[3]=Z;const j=ql(M,df,4,Pr,hf);return hf[j-1]}function uw(n,r,e,t,o,i){const s=(r-i)*(e-o),a=(n-o)*(t-i),l=s-a,c=Math.abs(s+a);return Math.abs(l)>=sw*c?l:-cw(n,r,e,t,o,i,c)}var v0={};const Go=(n,r)=>n.ll.x<=r.x&&r.x<=n.ur.x&&n.ll.y<=r.y&&r.y<=n.ur.y,mu=(n,r)=>{if(r.ur.x<n.ll.x||n.ur.x<r.ll.x||r.ur.y<n.ll.y||n.ur.y<r.ll.y)return null;const e=n.ll.x<r.ll.x?r.ll.x:n.ll.x,t=n.ur.x<r.ur.x?n.ur.x:r.ur.x,o=n.ll.y<r.ll.y?r.ll.y:n.ll.y,i=n.ur.y<r.ur.y?n.ur.y:r.ur.y;return{ll:{x:e,y:o},ur:{x:t,y:i}}};let et=Number.EPSILON;et===void 0&&(et=Math.pow(2,-52));const dw=et*et,ff=(n,r)=>{if(-et<n&&n<et&&-et<r&&r<et)return 0;const e=n-r;return e*e<dw*n*r?0:n<r?-1:1};class hw{constructor(){this.reset()}reset(){this.xRounder=new pf,this.yRounder=new pf}round(r,e){return{x:this.xRounder.round(r),y:this.yRounder.round(e)}}}class pf{constructor(){this.tree=new Pd,this.round(0)}round(r){const e=this.tree.add(r),t=this.tree.prev(e);if(t!==null&&ff(e.key,t.key)===0)return this.tree.remove(r),t.key;const o=this.tree.next(e);return o!==null&&ff(e.key,o.key)===0?(this.tree.remove(r),o.key):r}}const Li=new hw,Us=(n,r)=>n.x*r.y-n.y*r.x,x0=(n,r)=>n.x*r.x+n.y*r.y,mf=(n,r,e)=>{const t=uw(n.x,n.y,r.x,r.y,e.x,e.y);return t>0?-1:t<0?1:0},_a=n=>Math.sqrt(x0(n,n)),fw=(n,r,e)=>{const t={x:r.x-n.x,y:r.y-n.y},o={x:e.x-n.x,y:e.y-n.y};return Us(o,t)/_a(o)/_a(t)},pw=(n,r,e)=>{const t={x:r.x-n.x,y:r.y-n.y},o={x:e.x-n.x,y:e.y-n.y};return x0(o,t)/_a(o)/_a(t)},gf=(n,r,e)=>r.y===0?null:{x:n.x+r.x/r.y*(e-n.y),y:e},yf=(n,r,e)=>r.x===0?null:{x:e,y:n.y+r.y/r.x*(e-n.x)},mw=(n,r,e,t)=>{if(r.x===0)return yf(e,t,n.x);if(t.x===0)return yf(n,r,e.x);if(r.y===0)return gf(e,t,n.y);if(t.y===0)return gf(n,r,e.y);const o=Us(r,t);if(o==0)return null;const i={x:e.x-n.x,y:e.y-n.y},s=Us(i,r)/o,a=Us(i,t)/o,l=n.x+a*r.x,c=e.x+s*t.x,d=n.y+a*r.y,h=e.y+s*t.y,f=(l+c)/2,m=(d+h)/2;return{x:f,y:m}};class Yr{static compare(r,e){const t=Yr.comparePoints(r.point,e.point);return t!==0?t:(r.point!==e.point&&r.link(e),r.isLeft!==e.isLeft?r.isLeft?1:-1:ht.compare(r.segment,e.segment))}static comparePoints(r,e){return r.x<e.x?-1:r.x>e.x?1:r.y<e.y?-1:r.y>e.y?1:0}constructor(r,e){r.events===void 0?r.events=[this]:r.events.push(this),this.point=r,this.isLeft=e}link(r){if(r.point===this.point)throw new Error("Tried to link already linked events");const e=r.point.events;for(let t=0,o=e.length;t<o;t++){const i=e[t];this.point.events.push(i),i.point=this.point}this.checkForConsuming()}checkForConsuming(){const r=this.point.events.length;for(let e=0;e<r;e++){const t=this.point.events[e];if(t.segment.consumedBy===void 0)for(let o=e+1;o<r;o++){const i=this.point.events[o];i.consumedBy===void 0&&t.otherSE.point.events===i.otherSE.point.events&&t.segment.consume(i.segment)}}}getAvailableLinkedEvents(){const r=[];for(let e=0,t=this.point.events.length;e<t;e++){const o=this.point.events[e];o!==this&&!o.segment.ringOut&&o.segment.isInResult()&&r.push(o)}return r}getLeftmostComparator(r){const e=new Map,t=o=>{const i=o.otherSE;e.set(o,{sine:fw(this.point,r.point,i.point),cosine:pw(this.point,r.point,i.point)})};return(o,i)=>{e.has(o)||t(o),e.has(i)||t(i);const{sine:s,cosine:a}=e.get(o),{sine:l,cosine:c}=e.get(i);return s>=0&&l>=0?a<c?1:a>c?-1:0:s<0&&l<0?a<c?-1:a>c?1:0:l<s?-1:l>s?1:0}}}let gw=0;class ht{static compare(r,e){const t=r.leftSE.point.x,o=e.leftSE.point.x,i=r.rightSE.point.x,s=e.rightSE.point.x;if(s<t)return 1;if(i<o)return-1;const a=r.leftSE.point.y,l=e.leftSE.point.y,c=r.rightSE.point.y,d=e.rightSE.point.y;if(t<o){if(l<a&&l<c)return 1;if(l>a&&l>c)return-1;const h=r.comparePoint(e.leftSE.point);if(h<0)return 1;if(h>0)return-1;const f=e.comparePoint(r.rightSE.point);return f!==0?f:-1}if(t>o){if(a<l&&a<d)return-1;if(a>l&&a>d)return 1;const h=e.comparePoint(r.leftSE.point);if(h!==0)return h;const f=r.comparePoint(e.rightSE.point);return f<0?1:f>0?-1:1}if(a<l)return-1;if(a>l)return 1;if(i<s){const h=e.comparePoint(r.rightSE.point);if(h!==0)return h}if(i>s){const h=r.comparePoint(e.rightSE.point);if(h<0)return 1;if(h>0)return-1}if(i!==s){const h=c-a,f=i-t,m=d-l,y=s-o;if(h>f&&m<y)return 1;if(h<f&&m>y)return-1}return i>s?1:i<s||c<d?-1:c>d?1:r.id<e.id?-1:r.id>e.id?1:0}constructor(r,e,t,o){this.id=++gw,this.leftSE=r,r.segment=this,r.otherSE=e,this.rightSE=e,e.segment=this,e.otherSE=r,this.rings=t,this.windings=o}static fromRing(r,e,t){let o,i,s;const a=Yr.comparePoints(r,e);if(a<0)o=r,i=e,s=1;else if(a>0)o=e,i=r,s=-1;else throw new Error(`Tried to create degenerate segment at [${r.x}, ${r.y}]`);const l=new Yr(o,!0),c=new Yr(i,!1);return new ht(l,c,[t],[s])}replaceRightSE(r){this.rightSE=r,this.rightSE.segment=this,this.rightSE.otherSE=this.leftSE,this.leftSE.otherSE=this.rightSE}bbox(){const r=this.leftSE.point.y,e=this.rightSE.point.y;return{ll:{x:this.leftSE.point.x,y:r<e?r:e},ur:{x:this.rightSE.point.x,y:r>e?r:e}}}vector(){return{x:this.rightSE.point.x-this.leftSE.point.x,y:this.rightSE.point.y-this.leftSE.point.y}}isAnEndpoint(r){return r.x===this.leftSE.point.x&&r.y===this.leftSE.point.y||r.x===this.rightSE.point.x&&r.y===this.rightSE.point.y}comparePoint(r){if(this.isAnEndpoint(r))return 0;const e=this.leftSE.point,t=this.rightSE.point,o=this.vector();if(e.x===t.x)return r.x===e.x?0:r.x<e.x?1:-1;const i=(r.y-e.y)/o.y,s=e.x+i*o.x;if(r.x===s)return 0;const a=(r.x-e.x)/o.x,l=e.y+a*o.y;return r.y===l?0:r.y<l?-1:1}getIntersection(r){const e=this.bbox(),t=r.bbox(),o=mu(e,t);if(o===null)return null;const i=this.leftSE.point,s=this.rightSE.point,a=r.leftSE.point,l=r.rightSE.point,c=Go(e,a)&&this.comparePoint(a)===0,d=Go(t,i)&&r.comparePoint(i)===0,h=Go(e,l)&&this.comparePoint(l)===0,f=Go(t,s)&&r.comparePoint(s)===0;if(d&&c)return f&&!h?s:!f&&h?l:null;if(d)return h&&i.x===l.x&&i.y===l.y?null:i;if(c)return f&&s.x===a.x&&s.y===a.y?null:a;if(f&&h)return null;if(f)return s;if(h)return l;const m=mw(i,this.vector(),a,r.vector());return m===null||!Go(o,m)?null:Li.round(m.x,m.y)}split(r){const e=[],t=r.events!==void 0,o=new Yr(r,!0),i=new Yr(r,!1),s=this.rightSE;this.replaceRightSE(i),e.push(i),e.push(o);const a=new ht(o,s,this.rings.slice(),this.windings.slice());return Yr.comparePoints(a.leftSE.point,a.rightSE.point)>0&&a.swapEvents(),Yr.comparePoints(this.leftSE.point,this.rightSE.point)>0&&this.swapEvents(),t&&(o.checkForConsuming(),i.checkForConsuming()),e}swapEvents(){const r=this.rightSE;this.rightSE=this.leftSE,this.leftSE=r,this.leftSE.isLeft=!0,this.rightSE.isLeft=!1;for(let e=0,t=this.windings.length;e<t;e++)this.windings[e]*=-1}consume(r){let e=this,t=r;for(;e.consumedBy;)e=e.consumedBy;for(;t.consumedBy;)t=t.consumedBy;const o=ht.compare(e,t);if(o!==0){if(o>0){const i=e;e=t,t=i}if(e.prev===t){const i=e;e=t,t=i}for(let i=0,s=t.rings.length;i<s;i++){const a=t.rings[i],l=t.windings[i],c=e.rings.indexOf(a);c===-1?(e.rings.push(a),e.windings.push(l)):e.windings[c]+=l}t.rings=null,t.windings=null,t.consumedBy=e,t.leftSE.consumedBy=e.leftSE,t.rightSE.consumedBy=e.rightSE}}prevInResult(){return this._prevInResult!==void 0?this._prevInResult:(this.prev?this.prev.isInResult()?this._prevInResult=this.prev:this._prevInResult=this.prev.prevInResult():this._prevInResult=null,this._prevInResult)}beforeState(){if(this._beforeState!==void 0)return this._beforeState;if(!this.prev)this._beforeState={rings:[],windings:[],multiPolys:[]};else{const r=this.prev.consumedBy||this.prev;this._beforeState=r.afterState()}return this._beforeState}afterState(){if(this._afterState!==void 0)return this._afterState;const r=this.beforeState();this._afterState={rings:r.rings.slice(0),windings:r.windings.slice(0),multiPolys:[]};const e=this._afterState.rings,t=this._afterState.windings,o=this._afterState.multiPolys;for(let a=0,l=this.rings.length;a<l;a++){const c=this.rings[a],d=this.windings[a],h=e.indexOf(c);h===-1?(e.push(c),t.push(d)):t[h]+=d}const i=[],s=[];for(let a=0,l=e.length;a<l;a++){if(t[a]===0)continue;const c=e[a],d=c.poly;if(s.indexOf(d)===-1)if(c.isExterior)i.push(d);else{s.indexOf(d)===-1&&s.push(d);const h=i.indexOf(c.poly);h!==-1&&i.splice(h,1)}}for(let a=0,l=i.length;a<l;a++){const c=i[a].multiPoly;o.indexOf(c)===-1&&o.push(c)}return this._afterState}isInResult(){if(this.consumedBy)return!1;if(this._isInResult!==void 0)return this._isInResult;const r=this.beforeState().multiPolys,e=this.afterState().multiPolys;switch(ue.type){case"union":{const t=r.length===0,o=e.length===0;this._isInResult=t!==o;break}case"intersection":{let t,o;r.length<e.length?(t=r.length,o=e.length):(t=e.length,o=r.length),this._isInResult=o===ue.numMultiPolys&&t<o;break}case"xor":{const t=Math.abs(r.length-e.length);this._isInResult=t%2===1;break}case"difference":{const t=o=>o.length===1&&o[0].isSubject;this._isInResult=t(r)!==t(e);break}default:throw new Error(`Unrecognized operation type found ${ue.type}`)}return this._isInResult}}class vf{constructor(r,e,t){if(!Array.isArray(r)||r.length===0)throw new Error("Input geometry is not a valid Polygon or MultiPolygon");if(this.poly=e,this.isExterior=t,this.segments=[],typeof r[0][0]!="number"||typeof r[0][1]!="number")throw new Error("Input geometry is not a valid Polygon or MultiPolygon");const o=Li.round(r[0][0],r[0][1]);this.bbox={ll:{x:o.x,y:o.y},ur:{x:o.x,y:o.y}};let i=o;for(let s=1,a=r.length;s<a;s++){if(typeof r[s][0]!="number"||typeof r[s][1]!="number")throw new Error("Input geometry is not a valid Polygon or MultiPolygon");let l=Li.round(r[s][0],r[s][1]);l.x===i.x&&l.y===i.y||(this.segments.push(ht.fromRing(i,l,this)),l.x<this.bbox.ll.x&&(this.bbox.ll.x=l.x),l.y<this.bbox.ll.y&&(this.bbox.ll.y=l.y),l.x>this.bbox.ur.x&&(this.bbox.ur.x=l.x),l.y>this.bbox.ur.y&&(this.bbox.ur.y=l.y),i=l)}(o.x!==i.x||o.y!==i.y)&&this.segments.push(ht.fromRing(i,o,this))}getSweepEvents(){const r=[];for(let e=0,t=this.segments.length;e<t;e++){const o=this.segments[e];r.push(o.leftSE),r.push(o.rightSE)}return r}}class yw{constructor(r,e){if(!Array.isArray(r))throw new Error("Input geometry is not a valid Polygon or MultiPolygon");this.exteriorRing=new vf(r[0],this,!0),this.bbox={ll:{x:this.exteriorRing.bbox.ll.x,y:this.exteriorRing.bbox.ll.y},ur:{x:this.exteriorRing.bbox.ur.x,y:this.exteriorRing.bbox.ur.y}},this.interiorRings=[];for(let t=1,o=r.length;t<o;t++){const i=new vf(r[t],this,!1);i.bbox.ll.x<this.bbox.ll.x&&(this.bbox.ll.x=i.bbox.ll.x),i.bbox.ll.y<this.bbox.ll.y&&(this.bbox.ll.y=i.bbox.ll.y),i.bbox.ur.x>this.bbox.ur.x&&(this.bbox.ur.x=i.bbox.ur.x),i.bbox.ur.y>this.bbox.ur.y&&(this.bbox.ur.y=i.bbox.ur.y),this.interiorRings.push(i)}this.multiPoly=e}getSweepEvents(){const r=this.exteriorRing.getSweepEvents();for(let e=0,t=this.interiorRings.length;e<t;e++){const o=this.interiorRings[e].getSweepEvents();for(let i=0,s=o.length;i<s;i++)r.push(o[i])}return r}}class xf{constructor(r,e){if(!Array.isArray(r))throw new Error("Input geometry is not a valid Polygon or MultiPolygon");try{typeof r[0][0][0]=="number"&&(r=[r])}catch{}this.polys=[],this.bbox={ll:{x:Number.POSITIVE_INFINITY,y:Number.POSITIVE_INFINITY},ur:{x:Number.NEGATIVE_INFINITY,y:Number.NEGATIVE_INFINITY}};for(let t=0,o=r.length;t<o;t++){const i=new yw(r[t],this);i.bbox.ll.x<this.bbox.ll.x&&(this.bbox.ll.x=i.bbox.ll.x),i.bbox.ll.y<this.bbox.ll.y&&(this.bbox.ll.y=i.bbox.ll.y),i.bbox.ur.x>this.bbox.ur.x&&(this.bbox.ur.x=i.bbox.ur.x),i.bbox.ur.y>this.bbox.ur.y&&(this.bbox.ur.y=i.bbox.ur.y),this.polys.push(i)}this.isSubject=e}getSweepEvents(){const r=[];for(let e=0,t=this.polys.length;e<t;e++){const o=this.polys[e].getSweepEvents();for(let i=0,s=o.length;i<s;i++)r.push(o[i])}return r}}class ba{static factory(r){const e=[];for(let t=0,o=r.length;t<o;t++){const i=r[t];if(!i.isInResult()||i.ringOut)continue;let s=null,a=i.leftSE,l=i.rightSE;const c=[a],d=a.point,h=[];for(;s=a,a=l,c.push(a),a.point!==d;)for(;;){const f=a.getAvailableLinkedEvents();if(f.length===0){const v=c[0].point,A=c[c.length-1].point;throw new Error(`Unable to complete output ring starting at [${v.x}, ${v.y}]. Last matching segment found ends at [${A.x}, ${A.y}].`)}if(f.length===1){l=f[0].otherSE;break}let m=null;for(let v=0,A=h.length;v<A;v++)if(h[v].point===a.point){m=v;break}if(m!==null){const v=h.splice(m)[0],A=c.splice(v.index);A.unshift(A[0].otherSE),e.push(new ba(A.reverse()));continue}h.push({index:c.length,point:a.point});const y=a.getLeftmostComparator(s);l=f.sort(y)[0].otherSE;break}e.push(new ba(c))}return e}constructor(r){this.events=r;for(let e=0,t=r.length;e<t;e++)r[e].segment.ringOut=this;this.poly=null}getGeom(){let r=this.events[0].point;const e=[r];for(let c=1,d=this.events.length-1;c<d;c++){const h=this.events[c].point,f=this.events[c+1].point;mf(h,r,f)!==0&&(e.push(h),r=h)}if(e.length===1)return null;const t=e[0],o=e[1];mf(t,r,o)===0&&e.shift(),e.push(e[0]);const i=this.isExteriorRing()?1:-1,s=this.isExteriorRing()?0:e.length-1,a=this.isExteriorRing()?e.length:-1,l=[];for(let c=s;c!=a;c+=i)l.push([e[c].x,e[c].y]);return l}isExteriorRing(){if(this._isExteriorRing===void 0){const r=this.enclosingRing();this._isExteriorRing=r?!r.isExteriorRing():!0}return this._isExteriorRing}enclosingRing(){return this._enclosingRing===void 0&&(this._enclosingRing=this._calcEnclosingRing()),this._enclosingRing}_calcEnclosingRing(){let r=this.events[0];for(let o=1,i=this.events.length;o<i;o++){const s=this.events[o];Yr.compare(r,s)>0&&(r=s)}let e=r.segment.prevInResult(),t=e?e.prevInResult():null;for(;;){if(!e)return null;if(!t)return e.ringOut;if(t.ringOut!==e.ringOut)return t.ringOut.enclosingRing()!==e.ringOut?e.ringOut:e.ringOut.enclosingRing();e=t.prevInResult(),t=e?e.prevInResult():null}}}class wf{constructor(r){this.exteriorRing=r,r.poly=this,this.interiorRings=[]}addInterior(r){this.interiorRings.push(r),r.poly=this}getGeom(){const r=[this.exteriorRing.getGeom()];if(r[0]===null)return null;for(let e=0,t=this.interiorRings.length;e<t;e++){const o=this.interiorRings[e].getGeom();o!==null&&r.push(o)}return r}}class vw{constructor(r){this.rings=r,this.polys=this._composePolys(r)}getGeom(){const r=[];for(let e=0,t=this.polys.length;e<t;e++){const o=this.polys[e].getGeom();o!==null&&r.push(o)}return r}_composePolys(r){const e=[];for(let t=0,o=r.length;t<o;t++){const i=r[t];if(!i.poly)if(i.isExteriorRing())e.push(new wf(i));else{const s=i.enclosingRing();s.poly||e.push(new wf(s)),s.poly.addInterior(i)}}return e}}class xw{constructor(r){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:ht.compare;this.queue=r,this.tree=new Pd(e),this.segments=[]}process(r){const e=r.segment,t=[];if(r.consumedBy)return r.isLeft?this.queue.remove(r.otherSE):this.tree.remove(e),t;const o=r.isLeft?this.tree.add(e):this.tree.find(e);if(!o)throw new Error(`Unable to find segment #${e.id} [${e.leftSE.point.x}, ${e.leftSE.point.y}] -> [${e.rightSE.point.x}, ${e.rightSE.point.y}] in SweepLine tree.`);let i=o,s=o,a,l;for(;a===void 0;)i=this.tree.prev(i),i===null?a=null:i.key.consumedBy===void 0&&(a=i.key);for(;l===void 0;)s=this.tree.next(s),s===null?l=null:s.key.consumedBy===void 0&&(l=s.key);if(r.isLeft){let c=null;if(a){const h=a.getIntersection(e);if(h!==null&&(e.isAnEndpoint(h)||(c=h),!a.isAnEndpoint(h))){const f=this._splitSafely(a,h);for(let m=0,y=f.length;m<y;m++)t.push(f[m])}}let d=null;if(l){const h=l.getIntersection(e);if(h!==null&&(e.isAnEndpoint(h)||(d=h),!l.isAnEndpoint(h))){const f=this._splitSafely(l,h);for(let m=0,y=f.length;m<y;m++)t.push(f[m])}}if(c!==null||d!==null){let h=null;c===null?h=d:d===null?h=c:h=Yr.comparePoints(c,d)<=0?c:d,this.queue.remove(e.rightSE),t.push(e.rightSE);const f=e.split(h);for(let m=0,y=f.length;m<y;m++)t.push(f[m])}t.length>0?(this.tree.remove(e),t.push(r)):(this.segments.push(e),e.prev=a)}else{if(a&&l){const c=a.getIntersection(l);if(c!==null){if(!a.isAnEndpoint(c)){const d=this._splitSafely(a,c);for(let h=0,f=d.length;h<f;h++)t.push(d[h])}if(!l.isAnEndpoint(c)){const d=this._splitSafely(l,c);for(let h=0,f=d.length;h<f;h++)t.push(d[h])}}}this.tree.remove(e)}return t}_splitSafely(r,e){this.tree.remove(r);const t=r.rightSE;this.queue.remove(t);const o=r.split(e);return o.push(t),r.consumedBy===void 0&&this.tree.add(r),o}}const Sf=typeof process<"u"&&v0.POLYGON_CLIPPING_MAX_QUEUE_SIZE||1e6,ww=typeof process<"u"&&v0.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS||1e6;class Sw{run(r,e,t){ue.type=r,Li.reset();const o=[new xf(e,!0)];for(let h=0,f=t.length;h<f;h++)o.push(new xf(t[h],!1));if(ue.numMultiPolys=o.length,ue.type==="difference"){const h=o[0];let f=1;for(;f<o.length;)mu(o[f].bbox,h.bbox)!==null?f++:o.splice(f,1)}if(ue.type==="intersection")for(let h=0,f=o.length;h<f;h++){const m=o[h];for(let y=h+1,v=o.length;y<v;y++)if(mu(m.bbox,o[y].bbox)===null)return[]}const i=new Pd(Yr.compare);for(let h=0,f=o.length;h<f;h++){const m=o[h].getSweepEvents();for(let y=0,v=m.length;y<v;y++)if(i.insert(m[y]),i.size>Sf)throw new Error("Infinite loop when putting segment endpoints in a priority queue (queue size too big).")}const s=new xw(i);let a=i.size,l=i.pop();for(;l;){const h=l.key;if(i.size===a){const m=h.segment;throw new Error(`Unable to pop() ${h.isLeft?"left":"right"} SweepEvent [${h.point.x}, ${h.point.y}] from segment #${m.id} [${m.leftSE.point.x}, ${m.leftSE.point.y}] -> [${m.rightSE.point.x}, ${m.rightSE.point.y}] from queue.`)}if(i.size>Sf)throw new Error("Infinite loop when passing sweep line over endpoints (queue size too big).");if(s.segments.length>ww)throw new Error("Infinite loop when passing sweep line over endpoints (too many sweep line segments).");const f=s.process(h);for(let m=0,y=f.length;m<y;m++){const v=f[m];v.consumedBy===void 0&&i.insert(v)}a=i.size,l=i.pop()}Li.reset();const c=ba.factory(s.segments);return new vw(c).getGeom()}}const ue=new Sw,kw=function(n){for(var r=arguments.length,e=new Array(r>1?r-1:0),t=1;t<r;t++)e[t-1]=arguments[t];return ue.run("union",n,e)},_w=function(n){for(var r=arguments.length,e=new Array(r>1?r-1:0),t=1;t<r;t++)e[t-1]=arguments[t];return ue.run("intersection",n,e)},bw=function(n){for(var r=arguments.length,e=new Array(r>1?r-1:0),t=1;t<r;t++)e[t-1]=arguments[t];return ue.run("xor",n,e)},Cw=function(n){for(var r=arguments.length,e=new Array(r>1?r-1:0),t=1;t<r;t++)e[t-1]=arguments[t];return ue.run("difference",n,e)};var vo={union:kw,intersection:_w,xor:bw,difference:Cw};function yi(n){let r=[];for(const e of n)try{e.op==="union"?r=r.length?vo.union(r,[e.poly]):vo.union([e.poly]):r.length&&(r=vo.difference(r,[e.poly]))}catch{}return r}function kf(n,r){return yi(n.filter(e=>e.low===r))}function Pw(n,r){if(n.length===0||r.length===0)return[];try{return vo.intersection(n,r)}catch{return n}}function gu(n,r,e,t){const o=Math.min(n,e),i=Math.max(n,e),s=Math.min(r,t),a=Math.max(r,t);return[[[o,s],[i,s],[i,a],[o,a]]]}function _f(n,r,e,t,o=48){const i=(n+e)/2,s=(r+t)/2,a=Math.abs(e-n)/2,l=Math.abs(t-r)/2;if(a===0||l===0)return gu(n,r,e,t);const c=[];for(let d=0;d<o;d++){const h=d/o*Math.PI*2;c.push([i+Math.cos(h)*a,s+Math.sin(h)*l])}return[c]}function Tw(n,r,e){const t=Math.max(16,Math.min(64,Math.round(e*12))),o=[];for(let i=0;i<t;i++){const s=i/t*Math.PI*2;o.push([n+Math.cos(s)*e,r+Math.sin(s)*e])}return[o]}function Iw(n,r){if(n.length<2)return null;const e=r/2;let t=[];const o=i=>{t=t.length?vo.union(t,[i]):vo.union([i])};try{for(let i=0;i<n.length-1;i++){const[s,a]=n[i],[l,c]=n[i+1],d=l-s,h=c-a,f=Math.hypot(d,h);if(f<1e-6)continue;const m=d/f,y=h/f,v=-y*e,A=m*e,g=i===0?e:0,p=i===n.length-2?e:0,x=s-m*g,S=a-y*g,b=l+m*p,O=c+y*p;o([[[x+v,S+A],[b+v,O+A],[b-v,O-A],[x-v,S-A]]])}for(let i=1;i<n.length-1;i++){const[s,a]=n[i];o(Tw(s,a,e))}}catch{return null}return t[0]??null}function Ew(n,r=.22,e=.7){return n.map(t=>{const o=[];for(let i=0;i<t.length;i++){const[s,a]=t[i],[l,c]=t[(i+1)%t.length],d=l-s,h=c-a,f=Math.hypot(d,h);if(f<1e-6)continue;const m=-h/f,y=d/f,v=Math.max(1,Math.round(f/e));for(let A=0;A<v;A++){const g=A/v,p=(Math.random()-.5)*2*r*(A===0?.35:1);o.push([s+d*g+m*p,a+h*g+y*p])}}return o.length>=3?o:t})}function Mw(n,r,e){let t=!1;for(let o=0,i=e.length-1;o<e.length;i=o++){const[s,a]=e[o],[l,c]=e[i];a>r!=c>r&&n<(l-s)*(r-a)/(c-a)+s&&(t=!t)}return t}function xs(n,r,e){for(let t=e.length-1;t>=0;t--){const o=e[t];for(const i of o.poly.length?[o.poly[0]]:[])if(Mw(n,r,i))return o.id}return null}function bf(n,r,e,t,o){let i=null;for(const v of e)for(const A of v)for(let g=0;g<A.length;g++){const[p,x]=A[g],[S,b]=A[(g+1)%A.length],O=S-p,E=b-x,Z=O*O+E*E;if(Z<1e-9)continue;const F=Math.max(0,Math.min(1,((n-p)*O+(r-x)*E)/Z)),K=p+O*F,I=x+E*F,Y=Math.hypot(n-K,r-I);(!i||Y<i.d)&&(i={d:Y,ax:p,ay:x,bx:S,by:b,t:F})}if(!i||i.d>t)return null;const s=i.bx-i.ax,a=i.by-i.ay,l=Math.hypot(s,a),c=s/l,d=a/l,h=o/2;let f=i.t*l,m=i.ax+c*f,y=i.ay+d*f;return Math.abs(d)<1e-6?(m=Math.round(m*2)/2,f=(m-i.ax)/c):Math.abs(c)<1e-6&&(y=Math.round(y*2)/2,f=(y-i.ay)/d),f=l<o?l/2:Math.max(h,Math.min(l-h,f)),{x:i.ax+c*f,y:i.ay+d*f,angle:Math.atan2(a,s)}}function Di(n,r,e){let t=1/0;for(const o of e)for(let i=0;i<o.length;i++){const[s,a]=o[i],[l,c]=o[(i+1)%o.length],d=l-s,h=c-a,f=d*d+h*h,m=f<1e-9?0:Math.max(0,Math.min(1,((n-s)*d+(r-a)*h)/f));t=Math.min(t,Math.hypot(n-(s+d*m),r-(a+h*m)))}return t}const yu={safe:"44,95,124",danger:"184,84,80"};function Cf(n,r,e){for(let t=e.length-1;t>=0;t--){const o=e[t];if(Di(n,r,o.poly)<=.45)return o.id}return null}function Pf(n,r,e){for(let t=e.length-1;t>=0;t--){const o=e[t],i=Math.cos(-o.angle),s=Math.sin(-o.angle),a=(n-o.x)*i-(r-o.y)*s,l=(n-o.x)*s+(r-o.y)*i;if(Math.abs(a)<=o.w/2+.15&&Math.abs(l)<=.45)return o.id}return null}function Tf(n,r,e){for(let t=e.length-1;t>=0;t--){const o=e[t],i=o.x2-o.x1,s=o.y2-o.y1,a=Math.hypot(i,s);if(a<1e-6)continue;const l=i/a,c=s/a,d=(n-o.x1)*l+(r-o.y1)*c,h=-(n-o.x1)*c+(r-o.y1)*l;if(d>=-.2&&d<=a+.2&&Math.abs(h)<=o.w/2+.2)return o.id}return null}function vu(n){return Math.max(n.text.length*n.size*.85,n.size)}function nc(n,r,e){for(let t=e.length-1;t>=0;t--){const o=e[t];if(n>=o.x-.2&&n<=o.x+vu(o)&&Math.abs(r-o.y)<=o.size*.7)return o.id}return null}const Nw=[{key:"moss",label:"의도 동선"},{key:"ochre",label:"이탈 동선"},{key:"brick",label:"위협·추격"},{key:"blueprint",label:"보조·시선"},{key:"ink",label:"잉크"}],jw=[1,2,4,8];function Aw(n,r){return r==="ink"?n.wall:n[r]}function Ow(n,r,e,t,o,i){const s=o-e,a=i-t,l=s*s+a*a;if(l===0)return Math.hypot(n-e,r-t);let c=((n-e)*s+(r-t)*a)/l;return c=Math.max(0,Math.min(1,c)),Math.hypot(n-(e+c*s),r-(t+c*a))}function Rw(n){let r=1/0,e=1/0,t=-1/0,o=-1/0;for(const[s,a]of n.pts)r=Math.min(r,s),t=Math.max(t,s),e=Math.min(e,a),o=Math.max(o,a);const i=n.width/2;return{x0:r-i,y0:e-i,x1:t+i,y1:o+i}}function Lw(n,r,e,t=.4){for(let o=e.length-1;o>=0;o--){const i=e[o],s=i.width/2+t;if(i.pts.length===1){const[a,l]=i.pts[0];if(Math.hypot(n-a,r-l)<=s)return i.id;continue}for(let a=1;a<i.pts.length;a++){const l=i.pts[a-1],c=i.pts[a];if(Ow(n,r,l[0],l[1],c[0],c[1])<=s)return i.id}}return null}function xu(n,r,e){const{CELL:t}=e;n.lineCap="round",n.lineJoin="round";for(const o of r){if(!o.pts.length)continue;const i=Aw(e.colors,o.color),s=Math.max(o.width*t,1.2/e.zoomK);if(o.pts.length===1){const[c,d]=o.pts[0];n.fillStyle=i,n.beginPath(),n.arc(c*t,d*t,s/2,0,Math.PI*2),n.fill();continue}n.strokeStyle=i,n.lineWidth=s,n.beginPath();const a=o.pts;n.moveTo(a[0][0]*t,a[0][1]*t);for(let c=1;c<a.length-1;c++){const d=(a[c][0]+a[c+1][0])/2,h=(a[c][1]+a[c+1][1])/2;n.quadraticCurveTo(a[c][0]*t,a[c][1]*t,d*t,h*t)}const l=a[a.length-1];n.lineTo(l[0]*t,l[1]*t),n.stroke()}}function ws(n){const r=n.w/2,e=n.h/2,t=Math.cos(n.rot),o=Math.sin(n.rot),i=(s,a)=>[n.x+s*t-a*o,n.y+s*o+a*t];return[[i(-r,-e),i(r,-e),i(r,e),i(-r,e)]]}function Dw(n,r,e){for(let t=e.length-1;t>=0;t--){const o=e[t],i=Math.cos(-o.rot),s=Math.sin(-o.rot),a=n-o.x,l=r-o.y,c=a*i-l*s,d=a*s+l*i;if(Math.abs(c)<=o.w/2&&Math.abs(d)<=o.h/2)return o.id}return null}const Ca=.75,ei={start:{glyph:"▶",label:"시작",color:"moss"},goal:{glyph:"★",label:"목표",color:"wall"},reward:{glyph:"◆",label:"보상",color:"ochre"},enemy:{glyph:"✕",label:"적",color:"brick"},trigger:{glyph:"◎",label:"트리거",color:"blueprint"},landmark:{glyph:"▲",label:"랜드마크",color:"wall"},node:{glyph:"●",label:"노드",color:"wall"}};function rc(n,r,e){for(let t=e.length-1;t>=0;t--){const o=e[t];if(Math.hypot(n-o.x,r-o.y)<=Ca+.15)return o.id}return null}function ti(n,r){const e=new Path2D;for(const t of n)for(const o of t)o.forEach(([i,s],a)=>{a===0?e.moveTo(i*r,s*r):e.lineTo(i*r,s*r)}),e.closePath();return e}function Ss(n,r){return ti([n],r)}function w0(){const n=getComputedStyle(document.documentElement),r=(e,t)=>n.getPropertyValue(e).trim()||t;return{paper:r("--paper-200","#ECE5D6"),floor:r("--paper-50","#FAF6EE"),wall:r("--ink-900","#1A1814"),gridSoft:r("--grid-line-soft","rgba(44,95,124,0.06)"),gridHard:r("--grid-line-hard","rgba(44,95,124,0.10)"),gridMajor:r("--grid-line-major","rgba(44,95,124,0.17)"),border:r("--ink-900","#1A1814"),shadow:"rgba(26,24,20,0.28)",hatch:"rgba(42,37,32,0.35)",moss:r("--moss","#6B8E5A"),ochre:r("--ochre","#C9A961"),brick:r("--brick","#B85450"),blueprint:r("--blueprint","#2C5F7C"),cover:r("--paper-300","#DCD2BD")}}let Vo=null;function Zw(n,r,e){const t=`${r}|${e}`;if((Vo==null?void 0:Vo.key)===t)return Vo.pat;const o=Math.max(6,Math.round(r*.45)),i=document.createElement("canvas");i.width=o,i.height=o;const s=i.getContext("2d");s.strokeStyle=e,s.lineWidth=1.1,s.lineCap="square",s.beginPath(),s.moveTo(-o*.25,o*1.25),s.lineTo(o*1.25,-o*.25),s.moveTo(-o*.25,o*.25),s.lineTo(o*.25,-o*.25),s.moveTo(o*.75,o*1.25),s.lineTo(o*1.25,o*.75),s.stroke();const a=n.createPattern(i,"repeat");return Vo={key:t,pat:a},a}function At(n,r,e){return Math.max(0,Math.min(1,(n-r)/(e-r)))}const Pa=10;function S0(n,r,e){var y,v,A,g,p,x,S;const{CELL:t,colors:o}=e;if(r.length===0)return;const i=ti(r,t),s=e.wallM*t,a=Math.max(s,.9/e.zoomK);if(e.shadow){n.save();const b=new Path2D;b.rect(-1e5,-1e5,2e5,2e5),b.addPath(i),n.clip(b,"evenodd"),n.strokeStyle=o.shadow,n.lineJoin="round",n.lineWidth=Math.max(s*4,t*.4),n.stroke(i),n.restore()}if(e.hatch){n.save();const b=new Path2D;b.rect(-1e5,-1e5,2e5,2e5),b.addPath(i),n.clip(b,"evenodd");const O=Zw(n,t,o.hatch);O&&(n.strokeStyle=O,n.lineJoin="round",n.lineWidth=t*2.2,n.stroke(i)),n.restore()}n.fillStyle=o.floor,n.fill(i,"evenodd"),n.save(),n.clip(i,"evenodd");const l=e.zoomK*t,c=e.cols*t,d=e.rows*t,h=(b,O,E)=>{n.strokeStyle=O,n.lineWidth=E/e.zoomK,n.beginPath();for(let Z=0;Z<=e.cols;Z+=b)n.moveTo(Z*t,0),n.lineTo(Z*t,d);for(let Z=0;Z<=e.rows;Z+=b)n.moveTo(0,Z*t),n.lineTo(c,Z*t);n.stroke()},f=At(l,3.5,7);f>0&&(n.globalAlpha=f,h(1,o.gridSoft,1));const m=At(l*Pa,6,12);if(m>0&&(n.globalAlpha=m,h(Pa,o.gridMajor,1)),n.globalAlpha=1,n.restore(),n.strokeStyle=o.wall,n.lineJoin="round",n.lineWidth=a,n.stroke(i),(y=e.structLow)!=null&&y.length){const b=ti(e.structLow,t);n.fillStyle=o.cover,n.fill(b,"evenodd"),n.strokeStyle=o.wall,n.lineJoin="round",n.lineWidth=Math.max(s*.35,.7/e.zoomK),n.stroke(b)}if((v=e.structHigh)!=null&&v.length){const b=ti(e.structHigh,t);n.fillStyle=o.wall,n.fill(b,"evenodd"),n.strokeStyle=o.wall,n.lineJoin="round",n.lineWidth=a,n.stroke(b)}if((A=e.doors)!=null&&A.length)for(const b of e.doors)Bw(n,b,e);if((g=e.stairs)!=null&&g.length)for(const b of e.stairs)$w(n,b,e);if((p=e.zones)!=null&&p.length)for(const b of e.zones){const O=Pw([b.poly],r);if(O.length===0)continue;const E=ti(O,t),Z=yu[b.kind]??yu.safe;n.fillStyle=`rgba(${Z},0.13)`,n.fill(E,"evenodd"),n.strokeStyle=`rgba(${Z},0.55)`,n.lineJoin="round",n.lineWidth=1.5/e.zoomK,n.setLineDash([6/e.zoomK,4/e.zoomK]),n.stroke(E),n.setLineDash([])}if((x=e.markers)!=null&&x.length)for(const b of e.markers)Fw(n,b,e);if((S=e.texts)!=null&&S.length)for(const b of e.texts)zw(n,b,e)}function Fw(n,r,e){const{CELL:t,colors:o}=e,i=ei[r.kind],s=o[i.color],a=Ca*t;n.save(),n.translate(r.x*t,r.y*t),n.beginPath(),n.arc(0,0,a,0,Math.PI*2),n.fillStyle=s,n.fill(),n.strokeStyle=o.wall,n.lineWidth=Math.max(.06*t,.8/e.zoomK),n.stroke(),n.fillStyle=o.floor,n.font=`${a*1.15}px Pretendard, sans-serif`,n.textAlign="center",n.textBaseline="middle",n.fillText(i.glyph,0,a*.06),r.label&&(n.fillStyle=o.wall,n.font=`600 ${.9*t}px Pretendard, sans-serif`,n.textAlign="left",n.fillText(r.label,a+.3*t,0)),n.restore()}function $w(n,r,e){const{CELL:t,colors:o}=e,i=r.x2-r.x1,s=r.y2-r.y1,a=Math.hypot(i,s);if(a<1e-6)return;const l=i/a,c=s/a,d=-c,h=l,f=r.w/2*t,m=e.wallM*t;n.save(),n.strokeStyle=o.wall,n.lineCap="butt",n.lineWidth=Math.max(m*.4,.6/e.zoomK),n.beginPath();const y=.5;for(let v=0;v<=a+1e-6;v+=y){const A=(r.x1+l*v)*t,g=(r.y1+c*v)*t,p=v/a,x=f*(1-.35*p);n.moveTo(A+d*x,g+h*x),n.lineTo(A-d*x,g-h*x)}n.stroke(),n.lineWidth=Math.max(m*.55,.7/e.zoomK),n.beginPath();for(const v of[1,-1])n.moveTo((r.x1+d*(r.w/2)*v)*t,(r.y1+h*(r.w/2)*v)*t),n.lineTo((r.x2+d*(r.w/2)*.65*v)*t,(r.y2+h*(r.w/2)*.65*v)*t);n.stroke(),n.restore()}function zw(n,r,e){const{CELL:t,colors:o}=e;n.save(),n.fillStyle=o.wall,n.font=`${r.size*t}px Caveat, "Gowun Batang", cursive`,n.textAlign="left",n.textBaseline="middle",n.fillText(r.text,r.x*t,r.y*t),n.restore()}function Bw(n,r,e){const{CELL:t,colors:o}=e,i=e.wallM*t,s=r.w*t,a=Math.max(i*2.6,t*.34);n.save(),n.translate(r.x*t,r.y*t),n.rotate(r.angle),n.fillStyle=o.floor,n.strokeStyle=o.wall,n.lineWidth=Math.max(i*.45,.7/e.zoomK),n.fillRect(-s/2,-a/2,s,a),n.strokeRect(-s/2,-a/2,s,a),n.restore()}const Hw=2048;function Ww(n,r={}){const[e,t]=n.grid,i=Hw/(Math.max(e,t)+4),s=i*2,a=Math.round(e*i+s*2),l=Math.round(t*i+s*2),c=document.createElement("canvas");c.width=a,c.height=l;const d=c.getContext("2d"),h=w0();r.transparent||(d.fillStyle=h.paper,d.fillRect(0,0,a,l)),d.save(),d.translate(s,s);const f=yi(n.geo),m=n.struct??[];S0(d,f,{CELL:i,cols:e,rows:t,zoomK:1,wallM:n.style.wallM,hatch:n.style.hatch,shadow:n.style.shadow,colors:h,doors:n.doors,stairs:n.stairs,texts:n.texts,markers:n.markers,structHigh:yi(m.filter(v=>!v.low)),structLow:yi(m.filter(v=>v.low)),zones:n.zones}),n.pathVisible!==!1&&xu(d,n.strokes??[],{CELL:i,zoomK:1,colors:h}),d.restore(),d.fillStyle=h.border,d.font=`${Math.max(11,Math.round(i*.9))}px "JetBrains Mono", monospace`,d.textBaseline="middle";const y=e;if(d.fillText(`${n.name} — ${e}×${t} · 1셀=1m · ${y}m (${y*100}uu) · 벽 ${n.style.wallM}m`,s,Math.round(s/2)),r.cornerMarks){const v=Math.max(a,l),A=Math.round(v*.02),g=Math.round(v*.05);d.strokeStyle=h.border,d.lineWidth=Math.max(2,Math.round(v*.0035)),d.lineCap="butt",d.lineJoin="miter";const p=A,x=A,S=a-A,b=l-A;d.beginPath(),d.moveTo(p,x+g),d.lineTo(p,x),d.lineTo(p+g,x),d.moveTo(S-g,x),d.lineTo(S,x),d.lineTo(S,x+g),d.moveTo(S,b-g),d.lineTo(S,b),d.lineTo(S-g,b),d.moveTo(p+g,b),d.lineTo(p,b),d.lineTo(p,b-g),d.stroke()}return c}function Gw(n,r){Ww(n,{transparent:!0,cornerMarks:!0}).toBlob(t=>{if(!t)return;const o=URL.createObjectURL(t),i=document.createElement("a");i.href=o,i.download=r??`${n.name}.png`,i.click(),URL.revokeObjectURL(o)},"image/png")}const Pn=(n="id")=>{const r=Math.random().toString(36).slice(2,9);return`${n}_${Date.now().toString(36)}_${r}`},If=()=>new Date().toISOString().slice(0,10),k0="bubble-atelier::workspace",_0=2,Vw=[1,2];function Uw(){try{const n=localStorage.getItem(k0);if(!n)return null;const r=JSON.parse(n);return!Vw.includes(r.v)||!Array.isArray(r.projects)||r.projects.length===0?null:{v:_0,projects:r.projects.map(gi),currentId:r.currentId}}catch{return null}}function Kw(n,r){try{const e={v:_0,projects:n,currentId:r};localStorage.setItem(k0,JSON.stringify(e))}catch(e){console.warn("localStorage 저장 실패",e)}}function il(n,r="level-design.json"){const e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),o=document.createElement("a");o.href=t,o.download=r,o.click(),URL.revokeObjectURL(t)}function Xw(){return new Promise(n=>{const r=document.createElement("input");r.type="file",r.accept=".json,.map.json,application/json",r.onchange=async()=>{var t;const e=(t=r.files)==null?void 0:t[0];if(!e)return n(null);try{const o=await e.text(),i=JSON.parse(o);if(![1,2].includes(i.version))return n(null);n(gi(i))}catch{n(null)}},r.click()})}const ks=()=>Pn("prj"),mn=(n,r)=>{n(e=>{const t=e.projects.findIndex(s=>s.id===e.currentId);if(t<0)return{};const o={...r(e.projects[t]),updatedAt:Date.now()},i=[...e.projects];return i[t]=o,{projects:i,project:o}})};function Yw(n,r){let e=0,t;return(...o)=>{const i=Date.now(),s=i-e;s>=r?(e=i,n(...o)):(t&&window.clearTimeout(t),t=window.setTimeout(()=>{e=Date.now(),n(...o)},r-s))}}const B=tl()(ol(Xx((n,r)=>{const e=Uw();let t,o;if(e&&e.projects.length>0)t=e.projects.map(gi),o=e.projects.some(s=>s.id===e.currentId)?e.currentId:t[0].id;else{const s=vs(ks());t=[s],o=s.id}const i=t.find(s=>s.id===o);return{projects:t,currentId:o,project:i,selection:{kind:"none"},groupSelection:[],mode:"bubble",activeTopdownId:null,newProject:(s="새 레벨")=>{const a={...vs(ks()),name:s};return n(l=>({projects:[...l.projects,a],currentId:a.id,project:a,selection:{kind:"none"},mode:"bubble",activeTopdownId:null})),a.id},switchProject:s=>{n(a=>{const l=a.projects.find(c=>c.id===s);return l?{currentId:s,project:l,selection:{kind:"none"},mode:"bubble",activeTopdownId:null}:{}})},closeProject:s=>{n(a=>{const l=a.projects.filter(h=>h.id!==s);if(l.length===0){const h=vs(ks());return{projects:[h],currentId:h.id,project:h,selection:{kind:"none"},mode:"bubble",activeTopdownId:null}}let c=a.currentId,d=a.project;return a.currentId===s&&(d=l[0],c=d.id),{projects:l,currentId:c,project:d,selection:{kind:"none"},...a.currentId===s?{mode:"bubble",activeTopdownId:null}:{}}})},importProject:s=>{const a={...gi(s),id:ks()};return n(l=>({projects:[...l.projects,a],currentId:a.id,project:a,selection:{kind:"none"},mode:"bubble",activeTopdownId:null})),a.id},setName:s=>mn(n,a=>({...a,name:s})),loadFromJSON:s=>{mn(n,a=>({...gi(s),id:a.id})),n({selection:{kind:"none"},activeTopdownId:null})},reset:()=>{mn(n,s=>({...vs(s.id)})),n({selection:{kind:"none"}})},setConcept:s=>mn(n,a=>({...a,concept:{...a.concept,...s}})),addPostit:(s="",a="yellow")=>{const l=Pn("pst"),c=Math.random()*6-3,d={id:l,x:0,y:0,rotation:c,color:a,text:s,tags:[],createdAt:Date.now()};return mn(n,h=>({...h,postits:[d,...h.postits]})),l},updatePostit:(s,a)=>mn(n,l=>({...l,postits:l.postits.map(c=>c.id===s?{...c,...a}:c)})),removePostit:s=>mn(n,a=>({...a,postits:a.postits.filter(l=>l.id!==s)})),movePostit:(s,a,l)=>mn(n,c=>({...c,postits:c.postits.map(d=>d.id===s?{...d,x:a,y:l}:d)})),reorderPostits:s=>mn(n,a=>{const l=new Map(a.postits.map(h=>[h.id,h])),c=new Set(s),d=s.map(h=>l.get(h)).filter(Boolean);for(const h of a.postits)c.has(h.id)||d.push(h);return{...a,postits:d}}),clearAllPostits:()=>mn(n,s=>({...s,postits:[]})),promoteAllPostits:(s,a)=>{const c=r().project.postits.filter(y=>!y.promoted);if(c.length===0)return 0;const d=Math.max(3,Math.ceil(Math.sqrt(c.length*1.4))),h=200,f=170,m=[];return c.forEach((y,v)=>{const A=Pn("nd"),g=v%d,p=Math.floor(v/d);m.push({id:A,type:"room",name:y.text.slice(0,30)||"새 방",notes:y.text,icons:[],x:s+g*h,y:a+p*f,promotedFrom:y.id})}),mn(n,y=>({...y,nodes:[...y.nodes,...m],postits:y.postits.map(v=>c.find(A=>A.id===v.id)?{...v,promoted:!0}:v)})),c.length},addNode:s=>{const a=Pn("nd"),l={id:a,type:s.type??"room",name:s.name??"이름 없음",notes:s.notes??"",icons:s.icons??[],x:s.x,y:s.y,promotedFrom:s.promotedFrom};return mn(n,c=>({...c,nodes:[...c.nodes,l]})),n({selection:{kind:"node",id:a}}),a},updateNode:(s,a)=>mn(n,l=>({...l,nodes:l.nodes.map(c=>c.id===s?{...c,...a}:c)})),removeNode:s=>{mn(n,a=>({...a,nodes:a.nodes.filter(l=>l.id!==s),edges:a.edges.filter(l=>l.from!==s&&l.to!==s)})),n(a=>({selection:a.selection.kind==="node"&&a.selection.id===s?{kind:"none"}:a.selection}))},moveNode:(s,a,l)=>mn(n,c=>({...c,nodes:c.nodes.map(d=>d.id===s?{...d,x:a,y:l}:d)})),resizeNode:(s,a)=>{const l=Math.max(.5,Math.min(3,a));mn(n,c=>({...c,nodes:c.nodes.map(d=>d.id===s?{...d,size:l}:d)}))},setNodeAspect:(s,a)=>{const l=Math.max(.4,Math.min(2.5,a));mn(n,c=>({...c,nodes:c.nodes.map(d=>d.id===s?{...d,aspect:l}:d)}))},bringNodeToFront:s=>mn(n,a=>{const l=a.nodes.find(d=>d.id===s);if(!l)return a;const c=a.nodes.filter(d=>d.id!==s);return{...a,nodes:[...c,l]}}),sendNodeToBack:s=>mn(n,a=>{const l=a.nodes.find(d=>d.id===s);if(!l)return a;const c=a.nodes.filter(d=>d.id!==s);return{...a,nodes:[l,...c]}}),promotePostit:(s,a,l,c="room")=>{const h=r().project.postits.find(y=>y.id===s);if(!h)return"";const f=Pn("nd"),m={id:f,type:c,name:h.text.slice(0,30)||"새 방",notes:h.text,icons:[],x:a,y:l,promotedFrom:s};return mn(n,y=>({...y,nodes:[...y.nodes,m],postits:y.postits.map(v=>v.id===s?{...v,promoted:!0}:v)})),n({selection:{kind:"node",id:f}}),f},addEdge:(s,a,l="open")=>{if(s===a||r().project.edges.some(f=>f.from===s&&f.to===a))return null;const d=Pn("eg"),h={id:d,from:s,to:a,type:l};return mn(n,f=>({...f,edges:[...f.edges,h]})),d},updateEdge:(s,a)=>mn(n,l=>({...l,edges:l.edges.map(c=>c.id===s?{...c,...a}:c)})),removeEdge:s=>{mn(n,a=>({...a,edges:a.edges.filter(l=>l.id!==s)})),n(a=>({selection:a.selection.kind==="edge"&&a.selection.id===s?{kind:"none"}:a.selection}))},addImage:(s,a,l,c,d)=>{const h=Pn("img"),f={id:h,x:s,y:a,width:c,height:d,src:l,createdAt:Date.now()};return mn(n,m=>({...m,images:[...m.images??[],f]})),n({selection:{kind:"image",id:h}}),h},updateImage:(s,a)=>mn(n,l=>({...l,images:(l.images??[]).map(c=>c.id===s?{...c,...a}:c)})),removeImage:s=>{mn(n,a=>({...a,images:(a.images??[]).filter(l=>l.id!==s)})),n(a=>({selection:a.selection.kind==="image"&&a.selection.id===s?{kind:"none"}:a.selection}))},moveImage:(s,a,l)=>mn(n,c=>({...c,images:(c.images??[]).map(d=>d.id===s?{...d,x:a,y:l}:d)})),resizeImage:(s,a,l)=>mn(n,c=>({...c,images:(c.images??[]).map(d=>d.id===s?{...d,width:a,height:l}:d)})),addDecoration:(s,a,l)=>{const c=Pn("dec"),d=s==="arrow"?{id:c,kind:s,x:a,y:l,x2:a+140,y2:l}:s==="ellipse"?{id:c,kind:s,x:a,y:l,width:140,height:90}:{id:c,kind:s,x:a,y:l,width:180,height:40,text:"텍스트"};return mn(n,h=>({...h,decorations:[...h.decorations??[],d]})),n({selection:{kind:"decoration",id:c}}),c},updateDecoration:(s,a)=>mn(n,l=>({...l,decorations:(l.decorations??[]).map(c=>c.id===s?{...c,...a}:c)})),removeDecoration:s=>{mn(n,a=>({...a,decorations:(a.decorations??[]).filter(l=>l.id!==s)})),n(a=>({selection:a.selection.kind==="decoration"&&a.selection.id===s?{kind:"none"}:a.selection}))},moveDecoration:(s,a,l)=>mn(n,c=>{const d=(c.decorations??[]).find(h=>h.id===s);if(!d)return c;if(d.kind==="arrow"&&d.x2!==void 0&&d.y2!==void 0){const h=a-d.x,f=l-d.y;return{...c,decorations:c.decorations.map(m=>m.id===s?{...m,x:a,y:l,x2:(m.x2??0)+h,y2:(m.y2??0)+f}:m)}}return{...c,decorations:c.decorations.map(h=>h.id===s?{...h,x:a,y:l}:h)}}),setView:s=>mn(n,a=>({...a,view:{...a.view,...s}})),setHueShift:s=>mn(n,a=>{var l;return{...a,theme:{hueShift:Math.max(-180,Math.min(180,Math.round(s))),satScale:((l=a.theme)==null?void 0:l.satScale)??1}}}),setSatScale:s=>mn(n,a=>{var l;return{...a,theme:{hueShift:((l=a.theme)==null?void 0:l.hueShift)??0,satScale:Math.max(0,Math.min(2,Math.round(s*100)/100))}}}),resetTheme:()=>mn(n,s=>({...s,theme:{hueShift:0,satScale:1}})),select:s=>n({selection:s,groupSelection:[]}),setGroupSelection:s=>n({groupSelection:s,selection:{kind:"none"}}),selectAll:()=>{const s=r(),a=s.project.nodes.map(d=>d.id),l=(s.project.decorations??[]).map(d=>d.id),c=(s.project.images??[]).map(d=>d.id);n({groupSelection:[...a,...l,...c],selection:{kind:"none"}})},moveGroup:(s,a)=>{const l=r(),c=new Set(l.groupSelection);c.size!==0&&mn(n,d=>({...d,nodes:d.nodes.map(h=>c.has(h.id)?{...h,x:h.x+s,y:h.y+a}:h),decorations:(d.decorations??[]).map(h=>{if(!c.has(h.id))return h;const f={...h,x:h.x+s,y:h.y+a};return h.kind==="arrow"&&h.x2!==void 0&&h.y2!==void 0&&(f.x2=h.x2+s,f.y2=h.y2+a),f}),images:(d.images??[]).map(h=>c.has(h.id)?{...h,x:h.x+s,y:h.y+a}:h)}))},removeGroup:()=>{const s=r(),a=new Set(s.groupSelection);a.size!==0&&(mn(n,l=>({...l,nodes:l.nodes.filter(c=>!a.has(c.id)),edges:l.edges.filter(c=>!a.has(c.from)&&!a.has(c.to)),decorations:(l.decorations??[]).filter(c=>!a.has(c.id)),images:(l.images??[]).filter(c=>!a.has(c.id))})),n({groupSelection:[],selection:{kind:"none"}}))},setApiKey:s=>mn(n,a=>({...a,ai:{...a.ai,apiKey:s,provider:s?"gemini":"none"}})),bumpUsage:s=>mn(n,a=>{const l={...a.ai.usage};return l.lastResetDay!==If()&&(l.proUsedToday=0,l.flashUsedToday=0,l.lastResetDay=If()),s==="pro"?l.proUsedToday+=1:l.flashUsedToday+=1,{...a,ai:{...a.ai,usage:l}}}),setMjMaster:s=>mn(n,a=>({...a,mjMasterPrompt:s})),applyAutoLayoutPositions:s=>mn(n,a=>({...a,nodes:a.nodes.map(l=>s[l.id]?{...l,x:s[l.id].x,y:s[l.id].y}:l)})),enterTopdown:()=>{const s=r(),a=s.project.topdowns??[];if(a.length===0){const c=s.addTopdown();n({mode:"topdown",activeTopdownId:c});return}const l=a.some(c=>c.id===s.activeTopdownId)?s.activeTopdownId:a[0].id;n({mode:"topdown",activeTopdownId:l})},exitTopdown:()=>n({mode:"bubble"}),setActiveTopdown:s=>{(r().project.topdowns??[]).some(l=>l.id===s)&&n({activeTopdownId:s})},addTopdown:s=>{const a=Pn("td");return mn(n,l=>{var d;const c=s??`평면도 ${(((d=l.topdowns)==null?void 0:d.length)??0)+1}`;return{...l,topdowns:[...l.topdowns??[],Qx(a,c)]}}),n({activeTopdownId:a}),a},removeTopdown:s=>{mn(n,a=>({...a,topdowns:(a.topdowns??[]).filter(l=>l.id!==s)})),n(a=>{if(a.activeTopdownId!==s)return{};const l=a.project.topdowns??[];return{activeTopdownId:l.length>0?l[0].id:null}})},renameTopdown:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,name:a}:c)})),updateTopdown:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,...a}:c)})),addGeo:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,geo:[...c.geo,a]}:c)})),removeGeo:(s,a)=>{const l=new Set(a);mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,geo:d.geo.filter(h=>!l.has(h.id))}:d)}))},translateGeo:(s,a,l,c)=>{if(l===0&&c===0)return;const d=new Set(a);mn(n,h=>({...h,topdowns:(h.topdowns??[]).map(f=>{if(f.id!==s)return f;const m=f.geo.filter(v=>d.has(v.id)),y=v=>m.some(A=>Di(v.x,v.y,A.poly)<=.45);return{...f,geo:f.geo.map(v=>d.has(v.id)?{...v,poly:v.poly.map(A=>A.map(([g,p])=>[g+l,p+c]))}:v),doors:(f.doors??[]).map(v=>y(v)?{...v,x:v.x+l,y:v.y+c}:v)}})}))},addStruct:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,struct:[...c.struct??[],a]}:c)})),removeStruct:(s,a)=>{const l=new Set(a);mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,struct:(d.struct??[]).filter(h=>!l.has(h.id))}:d)}))},translateStruct:(s,a,l,c)=>{if(l===0&&c===0)return;const d=new Set(a);mn(n,h=>({...h,topdowns:(h.topdowns??[]).map(f=>{if(f.id!==s)return f;const m=(f.struct??[]).filter(v=>d.has(v.id)),y=v=>m.some(A=>Di(v.x,v.y,A.poly)<=.45);return{...f,struct:(f.struct??[]).map(v=>d.has(v.id)?{...v,poly:v.poly.map(A=>A.map(([g,p])=>[g+l,p+c]))}:v),doors:(f.doors??[]).map(v=>y(v)?{...v,x:v.x+l,y:v.y+c}:v)}})}))},addZone:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,zones:[...c.zones??[],a]}:c)})),removeZone:(s,a)=>{const l=new Set(a);mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,zones:(d.zones??[]).filter(h=>!l.has(h.id))}:d)}))},translateZones:(s,a,l,c)=>{if(l===0&&c===0)return;const d=new Set(a);mn(n,h=>({...h,topdowns:(h.topdowns??[]).map(f=>f.id===s?{...f,zones:(f.zones??[]).map(m=>d.has(m.id)?{...m,poly:m.poly.map(y=>y.map(([v,A])=>[v+l,A+c]))}:m)}:f)}))},transformShape:(s,{kind:a,id:l,poly:c,rot:d,doors:h})=>{const f=new Map((h??[]).map(y=>[y.id,y])),m=d===void 0?{poly:c}:{poly:c,rot:d};mn(n,y=>({...y,topdowns:(y.topdowns??[]).map(v=>v.id!==s?v:{...v,geo:a==="geo"?v.geo.map(A=>A.id===l?{...A,...m}:A):v.geo,struct:a==="struct"?(v.struct??[]).map(A=>A.id===l?{...A,...m}:A):v.struct,zones:a==="zone"?(v.zones??[]).map(A=>A.id===l?{...A,...m}:A):v.zones,doors:f.size?(v.doors??[]).map(A=>{const g=f.get(A.id);return g?{...A,x:g.x,y:g.y,angle:g.angle}:A}):v.doors})}))},addDoor:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,doors:[...c.doors??[],a]}:c)})),removeDoor:(s,a)=>{const l=new Set(a);mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,doors:(d.doors??[]).filter(h=>!l.has(h.id))}:d)}))},addStair:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,stairs:[...c.stairs??[],a]}:c)})),removeStair:(s,a)=>{const l=new Set(a);mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,stairs:(d.stairs??[]).filter(h=>!l.has(h.id))}:d)}))},addText:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,texts:[...c.texts??[],a]}:c)})),updateText:(s,a,l)=>mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,texts:(d.texts??[]).map(h=>h.id===a?{...h,...l}:h)}:d)})),removeText:(s,a)=>{const l=new Set(a);mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,texts:(d.texts??[]).filter(h=>!l.has(h.id))}:d)}))},addMarker:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,markers:[...c.markers??[],a]}:c)})),updateMarker:(s,a,l)=>mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,markers:(d.markers??[]).map(h=>h.id===a?{...h,...l}:h)}:d)})),removeMarker:(s,a)=>{const l=new Set(a);mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,markers:(d.markers??[]).filter(h=>!l.has(h.id))}:d)}))},addStroke:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,strokes:[...c.strokes??[],a],pathVisible:!0}:c)})),removeStroke:(s,a)=>{const l=new Set(a);mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,strokes:(d.strokes??[]).filter(h=>!l.has(h.id))}:d)}))},clearStrokes:s=>mn(n,a=>({...a,topdowns:(a.topdowns??[]).map(l=>l.id===s?{...l,strokes:[]}:l)})),addTdImage:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,images:[...c.images??[],a]}:c)})),updateTdImage:(s,a,l)=>mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,images:(d.images??[]).map(h=>h.id===a?{...h,...l}:h)}:d)})),removeTdImage:(s,a)=>{const l=new Set(a);mn(n,c=>({...c,topdowns:(c.topdowns??[]).map(d=>d.id===s?{...d,images:(d.images??[]).filter(h=>!l.has(h.id))}:d)}))},enterMassing:()=>n({mode:"massing"}),exitMassing:()=>n({mode:"bubble"}),enterFlow:()=>n({mode:"flow"}),exitFlow:()=>n({mode:"bubble"}),enterPacing:()=>n({mode:"pacing"}),exitPacing:()=>n({mode:"bubble"}),addMany:(s,a)=>mn(n,l=>({...l,topdowns:(l.topdowns??[]).map(c=>c.id===s?{...c,geo:[...c.geo,...a.geo??[]],struct:[...c.struct??[],...a.struct??[]],zones:[...c.zones??[],...a.zones??[]],doors:[...c.doors??[],...a.doors??[]],stairs:[...c.stairs??[],...a.stairs??[]],texts:[...c.texts??[],...a.texts??[]],markers:[...c.markers??[],...a.markers??[]]}:c)})),translateObject:(s,a,l,c)=>{l===0&&c===0||mn(n,d=>({...d,topdowns:(d.topdowns??[]).map(h=>h.id===s?{...h,doors:(h.doors??[]).map(f=>f.id===a?{...f,x:f.x+l,y:f.y+c}:f),stairs:(h.stairs??[]).map(f=>f.id===a?{...f,x1:f.x1+l,y1:f.y1+c,x2:f.x2+l,y2:f.y2+c}:f),texts:(h.texts??[]).map(f=>f.id===a?{...f,x:f.x+l,y:f.y+c}:f),markers:(h.markers??[]).map(f=>f.id===a?{...f,x:f.x+l,y:f.y+c}:f),images:(h.images??[]).map(f=>f.id===a?{...f,x:f.x+l,y:f.y+c}:f),strokes:(h.strokes??[]).map(f=>f.id===a?{...f,pts:f.pts.map(([m,y])=>[m+l,y+c])}:f)}:h)}))}}}),{partialize:n=>({projects:n.projects,currentId:n.currentId,project:n.project}),limit:80,handleSet:n=>Yw(r=>n(r),250),equality:(n,r)=>n.projects===r.projects&&n.currentId===r.currentId})),Td=()=>B.temporal.getState().undo(),Id=()=>B.temporal.getState().redo();let ec;const Qw=400;B.subscribe(n=>({projects:n.projects,currentId:n.currentId}),({projects:n,currentId:r})=>{ec&&window.clearTimeout(ec),ec=window.setTimeout(()=>Kw(n,r),Qw)},{equalityFn:(n,r)=>n.projects===r.projects&&n.currentId===r.currentId});const b0="bubble-atelier::theme";function Jw(){const n=localStorage.getItem(b0);return n==="light"||n==="dark"?n:null}function qw(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Ed(){return document.documentElement.dataset.theme||qw()}function n2(n){document.documentElement.dataset.theme=n,localStorage.setItem(b0,n),window.dispatchEvent(new CustomEvent("themechange",{detail:n}))}function r2(){n2(Ed()==="dark"?"light":"dark")}function C0(){const[n,r]=N.useState(Ed());return N.useEffect(()=>{const e=o=>r(o.detail);window.addEventListener("themechange",e);const t=P0(o=>r(o));return()=>{window.removeEventListener("themechange",e),t()}},[]),n}function P0(n){const r=window.matchMedia("(prefers-color-scheme: dark)"),e=t=>{Jw()||n(t.matches?"dark":"light")};return r.addEventListener("change",e),()=>r.removeEventListener("change",e)}function Ef(){const n=B(c=>c.projects),r=B(c=>c.currentId),e=B(c=>c.newProject),t=B(c=>c.switchProject),o=B(c=>c.closeProject),[i,s]=N.useState(null),[a,l]=N.useState(Ed());return N.useEffect(()=>{const c=h=>l(h.detail);window.addEventListener("themechange",c);const d=P0(h=>l(h));return()=>{window.removeEventListener("themechange",c),d()}},[]),u.jsxs("nav",{className:"project-tabs","aria-label":"프로젝트 탭",children:[u.jsx("ul",{className:"pt-list",children:n.map(c=>{const d=c.id===r,h=c.nodes.length;return u.jsxs("li",{className:`pt-tab ${d?"is-active":""}`,children:[u.jsxs("button",{className:"pt-tab-main",onClick:()=>t(c.id),title:`${c.name} · 노드 ${h}`,children:[u.jsx("span",{className:"pt-name",children:c.name||"제목 없음"}),h>0&&u.jsx("span",{className:"pt-count",children:h})]}),u.jsx("button",{className:"pt-close",onClick:f=>{f.stopPropagation(),h===0&&c.postits.length===0?o(c.id):s(c.id)},"aria-label":`${c.name} 닫기`,title:"탭 닫기 (저장 X)",children:"×"})]},c.id)})}),u.jsx("button",{className:"pt-new",onClick:()=>e(),title:"새 프로젝트",children:"+"}),u.jsx("button",{type:"button",className:"pt-theme-toggle",onClick:r2,title:a==="dark"?"라이트 모드로":"다크 모드로","aria-label":"테마 전환",children:a==="dark"?u.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[u.jsx("circle",{cx:"12",cy:"12",r:"4"}),u.jsx("path",{d:"M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"})]}):u.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:u.jsx("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})})}),u.jsxs("a",{className:"pt-credit",href:"https://bisk.kr",target:"_blank",rel:"noopener noreferrer",title:"제작 · BISK Level Design",children:[u.jsx("img",{className:"pt-credit-logo",src:"./bisk-logo.png",alt:"BISK",loading:"lazy",decoding:"async"}),u.jsxs("span",{className:"pt-credit-text",children:[u.jsx("strong",{children:"BISK"}),u.jsx("span",{className:"pt-credit-domain",children:"bisk.kr"})]})]}),i&&Ki.createPortal(u.jsx("div",{className:"pt-confirm-backdrop",onClick:()=>s(null),children:u.jsxs("div",{className:"pt-confirm",onClick:c=>c.stopPropagation(),children:[u.jsxs("p",{className:"pt-confirm-msg",children:["이 프로젝트는 ",u.jsx("strong",{children:"저장되지 않습니다"}),".",u.jsx("br",{}),"JSON 내보내기를 하지 않으면 사라집니다."]}),u.jsxs("div",{className:"pt-confirm-actions",children:[u.jsx("button",{onClick:()=>s(null),className:"pt-btn",children:"취소"}),u.jsx("button",{onClick:()=>{o(i),s(null)},className:"pt-btn pt-btn--danger",children:"그래도 닫기"})]})]})}),document.body)]})}function e2(){const n=B(p=>p.project.name),r=B(p=>p.project.concept),e=B(p=>p.project.updatedAt),t=B(p=>p.project),o=B(p=>p.setName),i=B(p=>p.setConcept),s=B(p=>p.importProject);B(p=>p.enterTopdown);const a=B(p=>p.enterMassing),l=B(p=>p.enterFlow),c=B(p=>p.enterPacing),d=B(p=>p.reset),[h,f]=N.useState(!1),[m,y]=N.useState(!1),[v,A]=N.useState({past:0,future:0});N.useEffect(()=>{const p=B.temporal,x=()=>{const b=p.getState();A({past:b.pastStates.length,future:b.futureStates.length})};x();const S=p.subscribe(x);return()=>S()},[]);const g=t2(e);return u.jsxs("header",{className:"concept-bar",children:[u.jsxs("div",{className:"cb-name",children:[h?u.jsx("input",{autoFocus:!0,className:"cb-name-input",value:n,onChange:p=>o(p.target.value),onBlur:()=>f(!1),onKeyDown:p=>{p.key==="Enter"&&f(!1)}}):u.jsxs("button",{className:"cb-name-btn",onClick:()=>f(!0),title:"이름 변경",children:[u.jsx("span",{className:"hand",children:n||"제목 없음"}),u.jsx("span",{className:"cb-name-pencil","aria-hidden":!0,children:"✎"})]}),u.jsxs("span",{className:"cb-stamp caption",children:["저장됨 · ",g]})]}),u.jsxs("div",{className:"cb-concept-line",children:[u.jsx(tc,{label:"테마",value:r.theme,onChange:p=>i({theme:p}),placeholder:"예: 잊혀진 사원, 우주 정거장…"}),u.jsx(tc,{label:"의도",value:r.intent,onChange:p=>i({intent:p}),placeholder:"예: 플레이어가 능력을 획득하고 시험한다"}),u.jsx(tc,{label:"코어 메커닉",value:r.coreMechanic,onChange:p=>i({coreMechanic:p}),placeholder:"예: 대시, 더블점프, 스텔스…"})]}),u.jsxs("div",{className:"cb-actions",children:[u.jsx("button",{className:"cb-btn","data-testid":"enter-massing",onClick:a,title:"매싱 — 등각 화이트박스 스케처 (점·선·면)",children:"◫ 매싱"}),u.jsx("button",{className:"cb-btn","data-testid":"enter-flow",onClick:l,title:"흐름 — 푸시·풀 흐름 실험실 (week2 push & pull)",children:"⇝ 흐름"}),u.jsx("button",{className:"cb-btn","data-testid":"enter-pacing",onClick:c,title:"페이싱 — 감정 곡선 에디터 (50·51강)",children:"⌇ 페이싱"}),u.jsx("button",{className:"cb-undo",onClick:()=>{var p;return(p=window.__openLibrary)==null?void 0:p.call(window)},title:"참고 라이브러리 (시나리오·가이드)","aria-label":"라이브러리",children:"📚"}),u.jsx("button",{className:"cb-undo",onClick:()=>Td(),disabled:v.past===0,title:`되돌리기 (Ctrl+Z) · ${v.past}`,"aria-label":"되돌리기",children:"↶"}),u.jsx("button",{className:"cb-undo",onClick:()=>Id(),disabled:v.future===0,title:`다시 실행 (Ctrl+Shift+Z) · ${v.future}`,"aria-label":"다시 실행",children:"↷"}),u.jsx("button",{className:"cb-btn",onClick:()=>y(!m),"aria-expanded":m,children:"파일 ▾"}),m&&Ki.createPortal(u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"cb-menu-overlay",onClick:()=>y(!1)}),u.jsxs("div",{className:"cb-menu","data-cb-menu":!0,children:[u.jsx("button",{onClick:()=>{il(t,`${n||"level"}.json`),y(!1)},children:"JSON 내보내기"}),u.jsx("button",{onClick:async()=>{y(!1);const p=await Xw();p&&s(p)},children:"JSON 불러오기 (새 탭)"}),u.jsx("hr",{}),u.jsx("button",{onClick:()=>{y(!1),confirm("현재 캔버스를 초기화합니다 (탭은 유지). 계속하시겠습니까?")&&d()},className:"cb-menu-danger",children:"현재 캔버스 초기화"})]})]}),document.body)]})]})}function tc({label:n,value:r,onChange:e,placeholder:t}){return u.jsxs("label",{className:"cb-field",children:[u.jsx("span",{className:"cb-field-label caption",children:n}),u.jsx("input",{className:"cb-field-input",value:r,onChange:o=>e(o.target.value),placeholder:t})]})}function t2(n){const r=Math.floor((Date.now()-n)/1e3);return r<5?"방금 전":r<60?`${r}초 전`:r<3600?`${Math.floor(r/60)}분 전`:r<86400?`${Math.floor(r/3600)}시간 전`:new Date(n).toLocaleDateString("ko-KR")}const oc=["yellow","pink","mint","blue","lilac"];function o2({postit:n}){const r=B(c=>c.updatePostit),e=B(c=>c.removePostit),t=B(c=>c.select),[o,i]=N.useState(n.text===""),s=N.useRef(null),a=c=>{c.dataTransfer.setData("application/x-postit-id",n.id),c.dataTransfer.effectAllowed="copy",t({kind:"postit",id:n.id})},l=()=>{const c=oc.indexOf(n.color),d=oc[(c+1)%oc.length];r(n.id,{color:d})};return u.jsxs("div",{className:`postit postit--${n.color}`,style:{transform:`rotate(${n.rotation}deg)`},draggable:!0,onDragStart:a,onClick:()=>t({kind:"postit",id:n.id}),children:[u.jsx("div",{className:"postit-tape","aria-hidden":!0}),u.jsxs("div",{className:"postit-head",children:[u.jsx("button",{className:"postit-color-btn",onClick:c=>{c.stopPropagation(),l()},title:"색상 변경","aria-label":"색상 변경"}),u.jsx("button",{className:"postit-x",onClick:c=>{c.stopPropagation(),e(n.id)},title:"삭제","aria-label":"삭제",children:"×"})]}),o?u.jsx("textarea",{ref:s,className:"postit-textarea",autoFocus:!0,value:n.text,onChange:c=>r(n.id,{text:c.target.value}),onBlur:()=>i(!1),onKeyDown:c=>{c.key==="Escape"&&i(!1),c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&i(!1)},placeholder:"여기에 메모…"}):u.jsx("p",{className:"postit-text",onDoubleClick:()=>i(!0),children:n.text||u.jsx("span",{className:"postit-placeholder",children:"더블클릭으로 입력"})}),n.tags.length>0&&u.jsx("div",{className:"postit-tags",children:n.tags.map(c=>u.jsxs("span",{className:"postit-tag",children:["#",c]},c))})]})}const Mf={ability:"능력 획득",stealth:"스텔스",puzzle:"퍼즐",combat:"전투",exploration:"탐험",survival:"생존·자원",narrative:"내러티브"},Nf=[{id:"abl-01-dash-temple",title:"대시를 얻는 잊혀진 사원",mechanic:"ability",genres:["3D 액션 어드벤처"],concept:{theme:"고대 정글에 묻힌 사원",intent:"플레이어가 대시 능력을 획득하고, 그 사용법을 환경에서 학습한 뒤 보스에서 시험한다",coreMechanic:"대시(짧은 무적 이동)",learningGoals:["대시의 거리감각","대시 타이밍","대시로 적을 회피하는 패턴"],pacing:"잔잔한 진입 → 짧은 전투 → 대시 획득 → 연습 구간 → 보스"},seedPostits:[{text:"입구 — 보물이 보이지만 절벽으로 가로막힌 풍경",color:"mint",tags:["vista"]},{text:"초보 적 2-3마리와의 첫 전투",color:"pink",tags:["combat"]},{text:"대시 능력 제단 (시각적으로 화려한 룸)",color:"yellow",tags:["reward"]},{text:"얕은 함정 2개를 대시로 넘는 연습실",color:"blue",tags:["teach"]},{text:'대시에 약한 신규 적 — "관성을 가진" 적',color:"pink",tags:["combat"]},{text:"보스: 좌우 대시 회피가 필수인 패턴",color:"pink",tags:["boss"]},{text:"보스 직후 일방통행 게이트 — 입구로 못 돌아감",color:"lilac",tags:["flow"]}]},{id:"abl-02-doublejump-cathedral",title:"더블점프를 얻는 폐허 대성당",mechanic:"ability",genres:["3D 플랫포머","3D 액션 어드벤처"],concept:{theme:"천장이 무너진 거대 대성당",intent:"수직 공간을 통해 더블점프의 가치를 즉시 체감시킨다",coreMechanic:"더블점프",learningGoals:["수직 거리 판단","공중 입력 타이밍","낙하 후 복귀"],pacing:"협소한 진입 → 수직 개방감 → 능력 획득 → 거대한 시험장"},seedPostits:[{text:"좁은 회랑 — 천장이 점점 높아짐",color:"yellow",tags:["anticipation"]},{text:"거대한 부서진 종 (랜드마크)",color:"mint",tags:["vista"]},{text:"도달 불가능한 발코니에 빛나는 오브젝트",color:"yellow",tags:["promise"]},{text:"아래로 떨어지면 다시 올라와야 하는 1회용 추락 룸",color:"pink",tags:["risk"]},{text:"더블점프 능력 — 스테인드글라스 빛 속에서",color:"lilac",tags:["reward"]},{text:"수직 통과 챔버 — 5단 발판",color:"blue",tags:["teach"]},{text:"천장 보스: 위에서 떨어지는 패턴",color:"pink",tags:["boss"]}]},{id:"abl-03-grapple-canyon",title:"갈고리 능력을 얻는 협곡 유적",mechanic:"ability",genres:["3D 액션 어드벤처"],concept:{theme:"바람 부는 사막 협곡 사이의 부유 유적",intent:"수평 이동의 자유를 갈고리로 확장",coreMechanic:"갈고리 (지정 노드로 견인)",learningGoals:["시야에서 갈고리 포인트 찾기","진자 운동 응용","연속 갈고리"],pacing:"느린 등반 → 갈고리 획득 → 빠른 회복 → 보스 추격"},seedPostits:[{text:"입구 다리 (반쯤 무너짐) — 강제로 우회",color:"blue"},{text:"바람 효과음 강한 외부 구역",color:"mint",tags:["mood"]},{text:"갈고리 제단 (지진으로 통로 열림 연출)",color:"yellow",tags:["reward"]},{text:"갈고리 포인트가 4개 보이는 개방 챔버",color:"blue",tags:["teach"]},{text:"추락 시 보호망 (낮은 좌절감)",color:"mint",tags:["safety"]},{text:"보스: 갈고리로 약점에 접근해야 하는 비행 적",color:"pink",tags:["boss"]}]},{id:"abl-04-wallclimb-crypt",title:"벽타기를 얻는 지하 묘소",mechanic:"ability",genres:["3D 닌자 액션","3D 클라이밍"],concept:{theme:"낮은 천장의 좁은 묘실들",intent:"벽타기로 가로/세로 모두를 자유롭게 만든다",coreMechanic:"벽타기 (잠시 벽에 붙음)",learningGoals:["벽 점프 거리","벽-벽 점프 체인","지구력 게이지 관리"],pacing:"폐쇄 → 능력 획득 → 개방 → 미로 보스"},seedPostits:[{text:"낮은 천장 회랑 — 횃불 ASMR",color:"lilac",tags:["mood"]},{text:"몸을 굽혀 통과해야 하는 좁은 통로",color:"blue"},{text:"벽타기 두루마리 (작은 보상감)",color:"yellow",tags:["reward"]},{text:"벽-벽 점프 3회 챔버",color:"blue",tags:["teach"]},{text:"거미형 적 — 천장에 매달림",color:"pink",tags:["enemy"]},{text:"보스: 사면이 벽인 정사각형 챔버",color:"pink",tags:["boss"]}]},{id:"abl-05-firebreath-volcano",title:"불을 뿜는 능력을 얻는 화산",mechanic:"ability",genres:["3D 액션 RPG","판타지"],concept:{theme:"활동 중인 화산 내부",intent:"환경 자체가 능력의 시각적 메타포",coreMechanic:"단발 화염 브레스",learningGoals:["거리 판단","연료 게이지","얼음 적 약점"],pacing:"강렬한 진입 → 약한 적 → 능력 획득 → 얼음 영역 → 화염 보스"},seedPostits:[{text:"용암이 흐르는 외부 다리 (긴장)",color:"pink",tags:["mood"]},{text:"얼음 결정으로 막힌 첫 진로",color:"blue",tags:["gate"]},{text:"화염 정수 제단",color:"yellow",tags:["reward"]},{text:"얼음 적 4-5마리가 있는 시험실",color:"pink",tags:["practice"]},{text:"연료가 부족한 채로 진입하는 좁은 통로",color:"lilac",tags:["tension"]},{text:"얼음 정령 보스 — 환경이 결정으로 채워짐",color:"pink",tags:["boss"]}]},{id:"abl-06-timeslow-clocktower",title:"시간 감속을 얻는 시계탑",mechanic:"ability",genres:["3D 액션 퍼즐"],concept:{theme:"거대 톱니바퀴들이 움직이는 시계탑",intent:"시간 감속을 통해 환경 퍼즐과 전투를 동시에 변형",coreMechanic:"주변 시간을 1/4로 감속 (자원형)",learningGoals:["감속 토글 타이밍","게이지 관리","환경 활용"],pacing:"관찰 → 능력 → 작은 응용 → 큰 응용 → 보스"},seedPostits:[{text:"거대 진자 룸 (1초마다 스쳐감)",color:"mint",tags:["vista"]},{text:"톱니바퀴 사이를 빠져 나가는 구간",color:"blue",tags:["teach"]},{text:"시계공의 책 (능력 획득 텍스트 비트)",color:"yellow",tags:["reward"]},{text:"날아오는 화살을 감속 후 회피하는 챔버",color:"pink",tags:["practice"]},{text:"게이지 부족 위기 — 환경 보충 아이템",color:"lilac"},{text:"시간을 멈출 수 있는 보스 (역으로)",color:"pink",tags:["boss"]}]},{id:"abl-07-water-flooded-keep",title:"잠수 능력을 얻는 침수 요새",mechanic:"ability",genres:["3D 액션 어드벤처"],concept:{theme:"반쯤 침수된 해안 요새",intent:"수평 공간을 수직-수중으로 확장",coreMechanic:"잠수 / 산소 게이지",learningGoals:["산소 관리","수중 시야","환경 함정 회피"],pacing:"지상 탐험 → 잠수 능력 → 수중 미로 → 거대 수중 보스"},seedPostits:[{text:"말라가는 우물 (트로피 연출)",color:"mint"},{text:"물 깊이가 점점 늘어나는 통로",color:"blue",tags:["progression"]},{text:"심해 비전 — 산호초 룸",color:"yellow",tags:["reward"]},{text:"산소 부족 시 시야 흐려짐 학습실",color:"lilac"},{text:"수중 회피 가능한 가시 함정",color:"pink"},{text:"거대 해양 생물 보스",color:"pink",tags:["boss"]}]},{id:"abl-08-shadow-spire",title:"그림자 통과 능력을 얻는 첨탑",mechanic:"ability",genres:["3D 액션 어드벤처"],concept:{theme:"햇빛과 그림자가 교차하는 첨탑 외벽",intent:"빛/그림자 이원성을 능력으로 직접 표현",coreMechanic:"그림자에 들어가면 무적·통과 가능",learningGoals:["그림자 경로 읽기","햇빛 회피","시간대 변화 응용"],pacing:"햇빛 노출 → 능력 획득 → 그림자 활용 → 종합 보스"},seedPostits:[{text:"드리운 그림자가 움직이는 회랑",color:"lilac",tags:["mood"]},{text:"닫힌 셔터 (햇빛을 막아 그림자 만듦)",color:"blue",tags:["env"]},{text:"그림자의 정수 — 어두운 제단",color:"yellow",tags:["reward"]},{text:"그림자만으로 가로지르는 회전 룸",color:"blue",tags:["teach"]},{text:"햇빛을 쏘는 시계 적",color:"pink",tags:["enemy"]},{text:"햇빛과 그림자를 모두 다루는 보스",color:"pink",tags:["boss"]}]},{id:"ste-01-manor-heist",title:"귀족 저택 잠입",mechanic:"stealth",genres:["3D 스텔스","느와르"],concept:{theme:"연회가 한창인 18세기 귀족 저택",intent:"발각 시 즉사 패널티 대신 추격으로 페이스 변화",coreMechanic:"엄폐, 발소리, 시야 콘 회피",learningGoals:["시야 콘 읽기","소리 영역","디스트랙션 도구"],pacing:"느린 관찰 → 진입 → 핵심 절도 → 추격 탈출"},seedPostits:[{text:"정문 — 경비 두 명 (관찰만 가능)",color:"blue"},{text:"연회장 발코니 (전체 조감)",color:"mint",tags:["vista"]},{text:"주방 — 디스트랙션용 접시",color:"yellow",tags:["tool"]},{text:"서재 — 핵심 절도 목표",color:"pink",tags:["goal"]},{text:"비밀 통로 (정원으로)",color:"lilac",tags:["escape"]},{text:"경보 발동 시 잠긴 문 — 우회 필요",color:"pink"}]},{id:"ste-02-warehouse-job",title:"항구 창고의 한 시간",mechanic:"stealth",genres:["3D 스텔스","현대 액션"],concept:{theme:"비 오는 밤, 화물선 옆 창고",intent:"시간 제약과 패트롤 로테이션",coreMechanic:"엄폐, 순찰 패턴 암기",learningGoals:["시간 관리","루트 계획","백업 출구"],pacing:"관찰 → 침투 → 데드라인 압박 → 탈출"},seedPostits:[{text:"컨테이너 미로 (입구)",color:"blue"},{text:"감시카메라 사각 — 5초 윈도우",color:"lilac"},{text:"감독관 사무실 (핵심 정보)",color:"pink",tags:["goal"]},{text:"경비견 — 후각 메커닉",color:"pink",tags:["enemy"]},{text:"지붕 위 탈출 경로 (예비)",color:"mint",tags:["escape"]}]},{id:"ste-03-castle-spy",title:"적국 성의 첩보 임무",mechanic:"stealth",genres:["3D 스텔스","판타지"],concept:{theme:"석조 성의 어두운 회랑",intent:"횃불 점멸과 그림자가 핵심 자원",coreMechanic:"횃불 끄기, 그림자 이용",learningGoals:["시야 차단","복귀 경로","소리 위장"],pacing:"진입 → 정보 수집 3건 → 위치 노출 → 비밀 탈출"},seedPostits:[{text:"벽 사이 비밀 통로 입구",color:"lilac"},{text:"횃불을 끄면 어두워지는 회의실",color:"blue",tags:["env"]},{text:"왕의 침소 — 결정적 문서",color:"pink",tags:["goal"]},{text:"교대 시간 — 5분 윈도우",color:"yellow",tags:["timing"]}]},{id:"ste-04-spacefacility",title:"폐쇄된 우주 시설 잠입",mechanic:"stealth",genres:["3D SF 스텔스"],concept:{theme:"비상등만 켜진 우주 정거장",intent:"센서·드론 적과 환경 활용",coreMechanic:"EMP 던지기, 환기구 이동",learningGoals:["센서 회피","환기구 맵 읽기","소음 관리"],pacing:"에어록 진입 → 데이터 코어 → 자폭 카운트다운 탈출"},seedPostits:[{text:"에어록 (시작 — 5초 압력 조정)",color:"blue"},{text:"환기구 분기점 — 3방향 선택",color:"lilac",tags:["choice"]},{text:"드론 패트롤 — 적외선 시야",color:"pink",tags:["enemy"]},{text:"데이터 코어 룸 — 30초 다운로드",color:"pink",tags:["goal"]},{text:"자폭 시퀀스 — 카운트다운 탈출",color:"pink",tags:["climax"]}]},{id:"ste-05-temple-thief",title:"신전의 도둑",mechanic:"stealth",genres:["3D 액션 스텔스","판타지"],concept:{theme:"계단식 사원의 보물 회랑",intent:"환경 함정과 함정 작동기 협업",coreMechanic:"엄폐, 함정 회피, 트리거 절단",learningGoals:["함정 패턴","루트 사전 검사","비상 우회"],pacing:"진입 → 작은 보물 → 함정 작동 → 중앙 보물 → 탈출"},seedPostits:[{text:"연꽃 정원 (시작 — 평화로움)",color:"mint"},{text:"바닥 압력판 — 화살 함정",color:"pink",tags:["trap"]},{text:"진자 칼날 회랑",color:"pink",tags:["trap"]},{text:"중앙 우상 — 핵심 보물",color:"pink",tags:["goal"]},{text:"추격 — 무너지는 천장",color:"pink",tags:["climax"]}]},{id:"ste-06-prison-break",title:"감옥 탈출",mechanic:"stealth",genres:["3D 스텔스 드라마"],concept:{theme:"낡은 석조 감옥",intent:"제약(무기 없음)에서 시작하는 점진적 권능 확장",coreMechanic:"소음 위장, 자원 절도",learningGoals:["패트롤 암기","도구 조합","동료 협력"],pacing:"독방 → 식당 → 작업장 → 비밀 터널 → 외벽"},seedPostits:[{text:"독방 (시작 — 도구 0개)",color:"blue"},{text:"식당 — 숟가락 절도",color:"yellow",tags:["tool"]},{text:"작업장 — 줄/끌",color:"yellow",tags:["tool"]},{text:"비밀 터널 입구 (벽 뒤)",color:"lilac",tags:["secret"]},{text:"외벽 — 서치라이트",color:"pink",tags:["climax"]}]},{id:"puz-01-mirror-tower",title:"거울 빛 굴절 탑",mechanic:"puzzle",genres:["3D 퍼즐 어드벤처"],concept:{theme:"거대 거울들이 회전하는 탑",intent:"빛 굴절 메커닉을 한 가지 룰로 5번 변주",coreMechanic:"거울 회전·이동으로 빛줄기 라우팅",learningGoals:["각도 계산","중간 목표 설정","여러 거울 조합"],pacing:"단순 → 응용 → 시간 제한 → 다중 목표 → 보스"},seedPostits:[{text:"튜토리얼 룸 — 거울 1개",color:"blue",tags:["teach"]},{text:"거울 2개로 두 목표 동시 점화",color:"blue"},{text:"회전 받침대 — 움직이는 목표",color:"pink",tags:["time"]},{text:"거대 만화경 룸 (압권)",color:"mint",tags:["vista"]},{text:"보스: 사방에 거울이 있는 환경",color:"pink",tags:["boss"]}]},{id:"puz-02-water-pumping",title:"수로의 수위 퍼즐 던전",mechanic:"puzzle",genres:["3D 액션 퍼즐"],concept:{theme:"지하 수로망",intent:"수위 변화로 같은 공간이 다른 레이아웃이 됨",coreMechanic:"수문 개폐로 수위 조절",learningGoals:["공간 재해석","의도된 순서","되돌리기 사고"],pacing:"낮은 수위 → 중간 수위 → 높은 수위 → 모두 활용"},seedPostits:[{text:"수문 A — 동쪽 수위 올림",color:"blue",tags:["mechanism"]},{text:"수문 B — 서쪽 수위 내림",color:"blue",tags:["mechanism"]},{text:"수면 위에서만 통과 가능한 동굴",color:"pink"},{text:"수면 아래에서만 보이는 비밀",color:"lilac",tags:["secret"]},{text:"중앙 챔버 — 모든 수위가 필요",color:"pink",tags:["climax"]}]},{id:"puz-03-magnetic-cave",title:"자기장 동굴",mechanic:"puzzle",genres:["3D SF 퍼즐"],concept:{theme:"자성 광물이 빛나는 동굴",intent:"극성 N/S 한 가지 룰의 깊은 변주",coreMechanic:"플레이어 극성 토글, 자성 오브젝트 인력/척력",learningGoals:["극성 결과 예측","오브젝트 연쇄 이동","환경 함정 응용"],pacing:"진입 → 학습 4단계 → 응용 → 보스"},seedPostits:[{text:"극성 학습실 — 큐브 1개 끌어오기",color:"blue",tags:["teach"]},{text:"두 큐브 동시 정렬 퍼즐",color:"blue"},{text:"극성 함정 — 자성 가시",color:"pink"},{text:"거대 금속 문 (인력으로 열기)",color:"pink",tags:["gate"]},{text:"자성 보스 — 환경 활용",color:"pink",tags:["boss"]}]},{id:"puz-04-clock-mechanism",title:"시계 톱니 던전",mechanic:"puzzle",genres:["3D 스팀펑크 퍼즐"],concept:{theme:"거대 시계 내부",intent:"회전·타이밍 동기화 퍼즐",coreMechanic:"톱니 속도 조절, 진자 타이밍",learningGoals:["주기 읽기","동기화","예측 사고"],pacing:"느린 진자 → 빠른 진자 → 다중 진자 → 보스"},seedPostits:[{text:"느린 진자 1개 회피 룸",color:"blue",tags:["teach"]},{text:"진자 2개 동기화",color:"blue"},{text:"톱니 위에서 점프하는 구간",color:"pink"},{text:"메인 시계 페이스 (랜드마크)",color:"mint",tags:["vista"]},{text:"시간 보스 — 시침/분침 패턴",color:"pink",tags:["boss"]}]},{id:"puz-05-mushroom-forest",title:"거대 버섯 숲의 식물 퍼즐",mechanic:"puzzle",genres:["3D 퍼즐 어드벤처"],concept:{theme:"바이오 발광 버섯이 가득한 숲",intent:"식물 성장 메커닉으로 환경 자체를 변형",coreMechanic:"씨앗 심기 → 버섯 성장 → 발판/통로",learningGoals:["배치 사고","자원 관리","되돌리기 불가의 무게"],pacing:"학습 → 응용 → 시간 압박 → 종합 챔버"},seedPostits:[{text:"씨앗 1개 심기 → 발판 생성",color:"blue",tags:["teach"]},{text:"높이 조절 — 큰 버섯/작은 버섯",color:"blue"},{text:"시간 안에 자라지 않으면 사라짐",color:"pink"},{text:"거대 부모 버섯 (랜드마크)",color:"mint",tags:["vista"]},{text:"뿌리 정령 보스",color:"pink",tags:["boss"]}]},{id:"puz-06-ice-sliding",title:"얼음 미끄럼 던전",mechanic:"puzzle",genres:["3D 퍼즐"],concept:{theme:"얼어붙은 동굴 호수",intent:"클래식 슬라이딩 퍼즐을 공간적 어휘로",coreMechanic:"얼음판 위에서는 멈출 수 없음",learningGoals:["경로 사전 계획","벽 활용","도구 사용"],pacing:"단순 슬라이드 → 분기 → 다단계 → 보스"},seedPostits:[{text:"직선 슬라이드 학습",color:"blue",tags:["teach"]},{text:"벽에 부딪혀 방향 전환",color:"blue"},{text:"구멍 → 추락 → 우회",color:"pink"},{text:"얼음판 위 키 + 자물쇠 문",color:"yellow",tags:["key"]},{text:"얼음 보스 — 미끄러지며 회피",color:"pink",tags:["boss"]}]},{id:"puz-07-mirror-maze-asylum",title:"거울 미로 정신병원",mechanic:"puzzle",genres:["3D 심리 호러"],concept:{theme:"버려진 정신병원의 거울 미로",intent:"공간 인지 자체를 퍼즐의 일부로",coreMechanic:"거울 너머가 진짜 통로인지 분별",learningGoals:["패턴 인식","오감 의심","낙인 표시 활용"],pacing:"신뢰 → 배신 → 학습 → 통제"},seedPostits:[{text:"첫 거울 룸 (실수 가능)",color:"lilac",tags:["mood"]},{text:"벽에 그어진 분필 표시 (단서)",color:"yellow",tags:["clue"]},{text:"깨진 거울 — 잠시 진실 노출",color:"lilac"},{text:"동일해 보이지만 다른 룸들",color:"pink"},{text:"거울 속 자아 보스",color:"pink",tags:["boss"]}]},{id:"puz-08-block-pushing-pyramid",title:"블록 밀기 피라미드",mechanic:"puzzle",genres:["3D 퍼즐"],concept:{theme:"계단식 피라미드 내부",intent:"클래식 소코반 메커닉의 공간적 확장",coreMechanic:"석조 블록 밀기 (당기기 X)",learningGoals:["되돌릴 수 없는 사고","단계 계획","키 + 자물쇠"],pacing:"단일 블록 → 다중 블록 → 시간 압박 → 보스"},seedPostits:[{text:"블록 1개 → 압력판",color:"blue",tags:["teach"]},{text:"블록 3개 → 다중 압력판",color:"blue"},{text:"실수하면 잠기는 잠금문",color:"pink",tags:["risk"]},{text:"왕의 무덤 — 핵심 챔버",color:"mint",tags:["vista"]},{text:"석상 보스 — 블록 패턴 활용",color:"pink",tags:["boss"]}]},{id:"cmb-01-arena-coliseum",title:"검투장 콜로세움",mechanic:"combat",genres:["3D 액션 아레나"],concept:{theme:"관중이 가득한 고대 검투장",intent:"웨이브 기반 전투 — 매 웨이브 새 메커닉 소개",coreMechanic:"근접 전투, 무기 픽업",learningGoals:["적 우선순위","환경 무기","회복 타이밍"],pacing:"솔로 → 듀얼 → 무리 → 보스 → 결승"},seedPostits:[{text:"대기실 (긴장 빌드업)",color:"mint",tags:["mood"]},{text:"아레나 진입 (관중 함성)",color:"pink",tags:["mood"]},{text:"웨이브 1: 단일 검사",color:"pink"},{text:"웨이브 2: 궁수 + 방패병",color:"pink"},{text:"환경 무기 — 함정 작동기",color:"yellow"},{text:"보스: 챔피언 검투사",color:"pink",tags:["boss"]}]},{id:"cmb-02-defense-village",title:"마을 방어전",mechanic:"combat",genres:["3D 액션 전략"],concept:{theme:"안개 낀 강가 마을",intent:"시간이 핵심 자원 — 준비/방어/추격 3단계",coreMechanic:"함정 설치, 동선 통제",learningGoals:["공간 통제","자원 분배","우선 위협 판단"],pacing:"낮(준비) → 황혼(파동) → 밤(전면전) → 새벽(추격)"},seedPostits:[{text:"중앙 우물 — 거점",color:"mint",tags:["hub"]},{text:"동쪽 다리 — 함정 포인트",color:"yellow",tags:["choke"]},{text:"서쪽 숲 — 매복 가능 지역",color:"lilac"},{text:"북쪽 언덕 — 궁수 배치",color:"blue",tags:["vantage"]},{text:"족장 보스 — 새벽 출현",color:"pink",tags:["boss"]}]},{id:"cmb-03-corridor-shooter",title:"복도식 슈터 임무",mechanic:"combat",genres:["3D FPS"],concept:{theme:"버려진 군사 시설",intent:"엄폐 기반 총격전, 무기 유형 4종 회전",coreMechanic:"엄폐 사격, 수류탄",learningGoals:["엄폐 활용","재장전 타이밍","무기 교체"],pacing:"진입 → 룸 클리어 × 3 → 후퇴전 → 보스"},seedPostits:[{text:"입구 — 정찰병 2명",color:"pink"},{text:"대형 사무실 — 엄폐 다수",color:"pink"},{text:"좁은 복도 — 산탄총 유리",color:"pink"},{text:"폭발물 박스 (환경 활용)",color:"yellow"},{text:"미니건 사수 보스",color:"pink",tags:["boss"]}]},{id:"cmb-04-boss-rush-temple",title:"신들의 보스 러시",mechanic:"combat",genres:["3D 액션","판타지"],concept:{theme:"신들의 성소 — 짧은 회랑과 거대 챔버 교차",intent:"연속 보스 4종, 회복 통제",coreMechanic:"회피 굴림, 패턴 학습",learningGoals:["텔리그래프 읽기","회복 분배","메모리"],pacing:"소회복 → 보스 → 회복 → 보스 → 회복 → 최종"},seedPostits:[{text:"회복 회랑 (잠시 안전)",color:"mint",tags:["rest"]},{text:"보스 1: 화염 거인",color:"pink",tags:["boss"]},{text:"보스 2: 그림자 쌍둥이",color:"pink",tags:["boss"]},{text:"보스 3: 바람의 매",color:"pink",tags:["boss"]},{text:"최종 보스: 합체 형태",color:"pink",tags:["climax"]}]},{id:"cmb-05-vehicle-chase",title:"차량 추격 시퀀스",mechanic:"combat",genres:["3D 액션 레이싱"],concept:{theme:"비 오는 고속도로",intent:"이동하면서 전투 — 정적 공간을 동적으로",coreMechanic:"운전 + 사격",learningGoals:["멀티태스킹","환경 위협","엄폐 이동"],pacing:"도시 진입 → 추격 → 헬기 합류 → 보스 차량 → 종착"},seedPostits:[{text:"시작 신호 (탈출 차량)",color:"mint"},{text:"경찰차 패트롤 3대",color:"pink"},{text:"터널 — 짧은 안전",color:"lilac"},{text:"헬기 합류 — 위에서 압박",color:"pink"},{text:"보스 — 장갑 SUV",color:"pink",tags:["boss"]}]},{id:"cmb-06-naval-boarding",title:"해상 함선 보딩",mechanic:"combat",genres:["3D 액션 어드벤처","해적"],concept:{theme:"폭풍우 속 적함의 갑판",intent:"비좁은 공간에서의 다층 전투",coreMechanic:"검과 권총, 갑판 등반",learningGoals:["공간 활용","환경 위협","입체 이동"],pacing:"상갑판 → 돛대 위 → 하갑판 → 함장실"},seedPostits:[{text:"갑판 진입 — 일제 사격",color:"pink"},{text:"돛대 위 저격수",color:"pink"},{text:"뱃밥 (위로 점프)",color:"yellow"},{text:"하갑판 — 좁은 어둠",color:"lilac"},{text:"함장 보스 — 함장실",color:"pink",tags:["boss"]}]},{id:"cmb-07-mech-factory",title:"메카 공장 침투전",mechanic:"combat",genres:["3D SF 액션"],concept:{theme:"거대 로봇을 제조하는 공장",intent:"컨베이어/프레스 환경이 곧 전장",coreMechanic:"환경 위협 활용 + 전투",learningGoals:["타이밍","위치 선정","환경 트리거"],pacing:"진입 → 조립 라인 → 보안 강화 → 거대 메카 보스"},seedPostits:[{text:"컨베이어 벨트 진입",color:"blue"},{text:"프레스 함정 (환경 무기)",color:"pink"},{text:"용접 로봇 적",color:"pink"},{text:"검수 챔버 — 잠시 안전",color:"mint",tags:["rest"]},{text:"거대 메카 보스 (조립 미완)",color:"pink",tags:["boss"]}]},{id:"cmb-08-soulslike-bridge",title:"소울라이크 다리 위 격투",mechanic:"combat",genres:["3D 소울라이크 액션 RPG"],concept:{theme:"안개 협곡 위의 좁은 석조 다리",intent:"단 하나의 다리 위에서 정밀 전투",coreMechanic:"스태미나, 패링, 굴림",learningGoals:["패링 타이밍","회복 약 사용","재시도"],pacing:"튜토리얼 적 → 정예 → 미니보스 → 최종"},seedPostits:[{text:"안개 다리 입구 (랜드마크)",color:"mint",tags:["vista"]},{text:"약한 적 2-3 — 워밍업",color:"pink"},{text:"엘리트 검사 — 패링 필수",color:"pink"},{text:"회복 화톳불",color:"yellow",tags:["rest"]},{text:"대형 기사 보스",color:"pink",tags:["boss"]}]},{id:"exp-01-open-cove",title:"열린 해안 만 탐험",mechanic:"exploration",genres:["3D 오픈월드 어드벤처"],concept:{theme:"여러 작은 섬과 해안",intent:"비선형 탐험 — 플레이어가 순서를 정함",coreMechanic:"관찰 → 시도 → 발견",learningGoals:["랜드마크 인지","재방문","자가 정렬"],pacing:"광활 → 호기심 추적 → 발견 누적"},seedPostits:[{text:"중앙 해안 (허브)",color:"mint",tags:["hub"]},{text:"북쪽 등대 — 시야 트임",color:"blue",tags:["vantage"]},{text:"서쪽 난파선 — 보물",color:"yellow"},{text:"남쪽 동굴 — 닫힌 문 (재방문)",color:"lilac"},{text:"동쪽 절벽 — 도전 보상",color:"yellow"}]},{id:"exp-02-vertical-canyon",title:"수직 협곡 도시",mechanic:"exploration",genres:["3D 탐험 어드벤처"],concept:{theme:"협곡 절벽에 매달린 도시",intent:"수직 탐험 — 위/아래 모두 발견 보상",coreMechanic:"클라이밍 + 활공",learningGoals:["수직 사고","체력 자원","대안 경로"],pacing:"최하층 → 중층 등반 → 정상 → 비행 하강"},seedPostits:[{text:"최하층 시장 (시작)",color:"mint"},{text:"중간층 다리망",color:"blue"},{text:"상층 신전 (목표)",color:"pink",tags:["goal"]},{text:"비밀 굴 — 측면",color:"lilac",tags:["secret"]},{text:"활공 종착 — 새 시작점",color:"mint"}]},{id:"exp-03-ruins-island",title:"신비의 유적 섬",mechanic:"exploration",genres:["3D 탐험 어드벤처","리얼리즘"],concept:{theme:"무인도의 고대 문명 유적",intent:"환경 스토리텔링 중심",coreMechanic:"관찰, 단서 조합",learningGoals:["세계관 읽기","인내","추론"],pacing:"도착 → 흩어진 단서 → 중앙 비밀 → 떠남"},seedPostits:[{text:"해변 도착 (정착)",color:"mint"},{text:"돌비석 — 첫 단서",color:"yellow",tags:["clue"]},{text:"벽화 — 잃어버린 종족",color:"yellow",tags:["lore"]},{text:"중앙 신전 — 잠긴 입구",color:"lilac",tags:["gate"]},{text:"내부 비밀 — 결말",color:"pink",tags:["climax"]}]},{id:"exp-04-cosmic-anomaly",title:"우주 이상점 탐사",mechanic:"exploration",genres:["3D SF 탐험"],concept:{theme:"외계 행성의 비현실적 이상점",intent:"비현실 공간 — 물리 법칙 변형",coreMechanic:"중력 변화, 시간 왜곡 관찰",learningGoals:["공간 적응","안전 영역 식별","대담함"],pacing:"착륙 → 적응 → 핵심 발견 → 탈출"},seedPostits:[{text:"착륙 지점 (베이스)",color:"mint",tags:["hub"]},{text:"중력 역전 구역",color:"lilac"},{text:"시간 느린 호수",color:"lilac"},{text:"이상점 핵심 (랜드마크)",color:"mint",tags:["vista"]},{text:"탈출 카운트다운",color:"pink",tags:["climax"]}]},{id:"exp-05-foggy-village",title:"안개 마을의 진실",mechanic:"exploration",genres:["3D 심리 호러 탐험"],concept:{theme:"시간이 멈춘 듯한 안개 마을",intent:"느린 탐험으로 분위기 누적",coreMechanic:"관찰, 메모 수집",learningGoals:["집중","서사 조립","용기"],pacing:"도착 → 의문 → 깊은 곳 → 진실"},seedPostits:[{text:"마을 입구 (안개)",color:"lilac",tags:["mood"]},{text:"교회 — 멈춘 시계",color:"mint",tags:["vista"]},{text:"도서관 — 마지막 일지",color:"yellow",tags:["clue"]},{text:"지하 — 진실의 방",color:"pink",tags:["climax"]}]},{id:"exp-06-deep-forest",title:"깊은 숲의 영적 여행",mechanic:"exploration",genres:["3D 판타지 탐험"],concept:{theme:"거대 고목들의 숲",intent:"비선형, 영적 보상",coreMechanic:"관찰, 정령 대화",learningGoals:["느린 탐험","환경 읽기","존중"],pacing:"진입 → 4 정령 → 중앙 신성목 → 변화"},seedPostits:[{text:"숲 입구 — 빛 줄기",color:"mint"},{text:"바람의 정령 (북)",color:"lilac"},{text:"강의 정령 (남)",color:"lilac"},{text:"땅의 정령 (동)",color:"lilac"},{text:"신성목 (중앙)",color:"mint",tags:["vista"]}]},{id:"exp-07-haunted-mansion",title:"대저택 미스터리",mechanic:"exploration",genres:["3D 미스터리 어드벤처"],concept:{theme:"폐쇄된 빅토리아 대저택",intent:"방마다 단서, 자물쇠는 다른 방에",coreMechanic:"관찰, 키 수집, 일기 조합",learningGoals:["공간 기억","비선형 사고","인내"],pacing:"입구 → 1층 둘러보기 → 2층 → 지하실"},seedPostits:[{text:"입구 홀 — 큰 계단",color:"mint",tags:["hub"]},{text:"서재 — 다이어리 1권",color:"yellow",tags:["clue"]},{text:"식당 — 열쇠 1",color:"yellow",tags:["key"]},{text:"주인 침실 — 잠긴 금고",color:"lilac"},{text:"지하실 — 진실",color:"pink",tags:["climax"]}]},{id:"exp-08-sky-archipelago",title:"하늘 군도 비행 탐험",mechanic:"exploration",genres:["3D 판타지 탐험"],concept:{theme:"하늘에 떠 있는 섬들의 군도",intent:"플레이어 자유 진행, 시각적 발견 중심",coreMechanic:"비행 / 활공",learningGoals:["공간 인지","대담함","비밀 탐색"],pacing:"베이스 → 자유 탐험 → 핵심 섬 발견"},seedPostits:[{text:"베이스 섬 — 마을",color:"mint",tags:["hub"]},{text:"북쪽 폭풍 섬",color:"lilac"},{text:"동쪽 사원 섬",color:"yellow"},{text:"남쪽 잊혀진 거탑",color:"pink"},{text:"중앙 비밀 — 구름 속",color:"pink",tags:["climax"]}]},{id:"sur-01-blizzard-base",title:"눈보라 속 기지 생존",mechanic:"survival",genres:["3D 생존 드라마"],concept:{theme:"북극의 고립된 연구 기지",intent:"추위/연료/식량 3축 관리",coreMechanic:"자원 채집과 배분",learningGoals:["우선순위","위험 평가","장기 계획"],pacing:"평온 → 첫 위기 → 자원 고갈 → 구조 신호"},seedPostits:[{text:"기지 (허브)",color:"mint",tags:["hub"]},{text:"연료 창고 (서쪽)",color:"yellow"},{text:"식량 저장고 (동쪽)",color:"yellow"},{text:"눈보라 — 외출 제한",color:"pink",tags:["event"]},{text:"구조 신호 송신 — 클라이맥스",color:"pink",tags:["climax"]}]},{id:"sur-02-desert-caravan",title:"사막 캐러밴",mechanic:"survival",genres:["3D 생존"],concept:{theme:"광활한 사막을 가로지르는 여정",intent:"물/그늘/체력 관리",coreMechanic:"오아시스 라우팅",learningGoals:["루트 선택","자원 분배","동료 관리"],pacing:"출발 → 첫 오아시스 → 모래폭풍 → 목적지"},seedPostits:[{text:"출발지 (도시)",color:"mint"},{text:"오아시스 1",color:"yellow"},{text:"모래폭풍 (이벤트)",color:"pink"},{text:"버려진 캐러밴 (단서)",color:"lilac"},{text:"목적지 도시",color:"mint",tags:["climax"]}]},{id:"sur-03-zombie-mall",title:"쇼핑몰의 좀비 농성",mechanic:"survival",genres:["3D 호러 생존"],concept:{theme:"폐쇄된 대형 쇼핑몰",intent:"공간 통제와 자원 채집의 교차",coreMechanic:"바리케이드, 자원, 소음 관리",learningGoals:["공간 보호","소음 절제","동료 협업"],pacing:"진입 → 거점 확보 → 외부 임무 → 마지막 밤"},seedPostits:[{text:"푸드코트 (허브)",color:"mint",tags:["hub"]},{text:"약국 — 의료품",color:"yellow"},{text:"주차장 — 위험 + 차량",color:"pink"},{text:"서점 — 안전 + 책",color:"mint"},{text:"옥상 헬리포트 (탈출)",color:"mint",tags:["climax"]}]},{id:"sur-04-island-castaway",title:"무인도 표류",mechanic:"survival",genres:["3D 생존"],concept:{theme:"열대 무인도",intent:"0에서 시작해 점진적 능력 확장",coreMechanic:"제작, 식량, 도구",learningGoals:["우선순위","실험 정신","장기 사고"],pacing:"표류 → 거주지 → 도구 → 구조 시도"},seedPostits:[{text:"해변 도착 — 잔해",color:"mint"},{text:"담수 시내 (필수)",color:"yellow"},{text:"코코넛 숲",color:"yellow"},{text:"뗏목 제작장",color:"pink",tags:["goal"]},{text:"바다로 출발 (탈출)",color:"mint",tags:["climax"]}]},{id:"sur-05-plague-village",title:"역병 마을 의무관",mechanic:"survival",genres:["3D 생존 드라마"],concept:{theme:"역병이 도는 중세 마을",intent:"한정된 의약품으로 누구를 살릴지 선택",coreMechanic:"치료 자원 분배",learningGoals:["윤리 판단","리소스 분배","결과 수용"],pacing:"도착 → 환자 발견 → 자원 결핍 → 선택"},seedPostits:[{text:"교회 (베이스)",color:"mint"},{text:"대장간 — 일가족 감염",color:"pink"},{text:"식료품점 — 노인",color:"pink"},{text:"약초 숲 — 마지막 자원",color:"yellow"},{text:"결말 — 누가 살았나",color:"lilac",tags:["climax"]}]},{id:"sur-06-cave-trapped",title:"동굴 매몰 탈출",mechanic:"survival",genres:["3D 생존 서스펜스"],concept:{theme:"광산 사고 후 매몰된 갱도",intent:"산소·빛·체력 동시 관리",coreMechanic:"횃불, 산소, 채굴",learningGoals:["자원 동시 관리","위험 평가","결단"],pacing:"사고 → 길 찾기 → 동료 구조 → 탈출"},seedPostits:[{text:"매몰 직후 (시작)",color:"lilac"},{text:"동료 발견 — 부상",color:"pink"},{text:"환기구 — 산소 + 빛",color:"yellow"},{text:"갱도 분기 (선택)",color:"lilac"},{text:"지표 빛 — 탈출",color:"mint",tags:["climax"]}]},{id:"nar-01-childhood-home",title:"돌아온 어린 시절 집",mechanic:"narrative",genres:["3D 내러티브"],concept:{theme:"오랜만에 방문한 부모님 집",intent:"공간이 곧 기억의 트리거",coreMechanic:"오브젝트 상호작용으로 회상",learningGoals:["감정 누적","비선형 이야기","대답 없는 질문"],pacing:"도착 → 둘러보기 → 핵심 방 → 떠남"},seedPostits:[{text:"현관 — 첫 회상",color:"mint"},{text:"거실 — 가족 사진",color:"lilac"},{text:"내 방 — 일기장",color:"lilac"},{text:"부엌 — 어머니의 흔적",color:"pink"},{text:"결말 — 다시 떠남",color:"lilac",tags:["climax"]}]},{id:"nar-02-train-journey",title:"국경을 넘는 열차",mechanic:"narrative",genres:["내러티브","드라마"],concept:{theme:"여러 칸의 야간 열차",intent:"제한된 공간 내 다양한 인물",coreMechanic:"대화 선택, 관계 변화",learningGoals:["공감","관찰","선택 결과"],pacing:"출발 → 만남 → 위기 → 도착"},seedPostits:[{text:"내 객실 (시작)",color:"mint"},{text:"식당칸 — 노인",color:"lilac"},{text:"복도 — 의문의 여인",color:"pink"},{text:"기관실 — 비밀",color:"lilac"},{text:"국경역 — 결말",color:"pink",tags:["climax"]}]},{id:"nar-03-deathbed-recollection",title:"임종의 회상",mechanic:"narrative",genres:["내러티브","드라마"],concept:{theme:"병실과 회상 공간의 교차",intent:"플레이어가 인생의 챕터를 골라 재방문",coreMechanic:"챕터 선택, 환경 변화",learningGoals:["비선형 시간","결정 무게","용서"],pacing:"현재 → 청년 → 중년 → 노년 → 현재"},seedPostits:[{text:"병실 (허브)",color:"lilac",tags:["hub"]},{text:"청년기 — 첫 사랑",color:"pink"},{text:"중년기 — 일과 가족",color:"mint"},{text:"노년기 — 후회",color:"lilac"},{text:"결말 — 평화",color:"mint",tags:["climax"]}]},{id:"nar-04-letters-from-front",title:"전선에서 온 편지",mechanic:"narrative",genres:["내러티브","전쟁 드라마"],concept:{theme:"집과 전선 두 공간의 평행",intent:"같은 사건의 두 시각",coreMechanic:"편지 읽기, 공간 전환",learningGoals:["이중 관점","환경 변화","시간 축"],pacing:"집 → 전선 → 집 → 전선 → 진실"},seedPostits:[{text:"집 부엌 — 첫 편지",color:"mint"},{text:"참호 — 발신 장면",color:"pink"},{text:"집 침실 — 두 번째 편지",color:"lilac"},{text:"병원 — 마지막 편지",color:"lilac"},{text:"결말 — 도착",color:"pink",tags:["climax"]}]},{id:"nar-05-island-festival",title:"섬 마을 축제의 하루",mechanic:"narrative",genres:["내러티브","슬라이스 오브 라이프"],concept:{theme:"여름 섬 마을",intent:"느린 하루, 작은 사건들",coreMechanic:"돌아다니기, 대화",learningGoals:["관찰","소소함","따뜻함"],pacing:"아침 → 점심 → 저녁 축제 → 밤하늘"},seedPostits:[{text:"아침 시장",color:"mint"},{text:"바닷가 청년들",color:"mint"},{text:"점심 — 할머니 가게",color:"yellow"},{text:"저녁 축제 광장",color:"pink",tags:["climax"]},{text:"밤 — 폭죽",color:"lilac"}]},{id:"nar-06-final-conversation",title:"마지막 대화",mechanic:"narrative",genres:["3D 내러티브"],concept:{theme:"카페 한 곳에서의 대화",intent:"하나의 공간, 깊은 선택",coreMechanic:"대화 분기",learningGoals:["미세 표현","선택 누적","결과 수용"],pacing:"도착 → 가벼움 → 진실 → 결정 → 헤어짐"},seedPostits:[{text:"카페 입구",color:"mint"},{text:"주문 — 첫 인사",color:"mint"},{text:"본론 — 진실 1",color:"pink"},{text:"갈등 — 진실 2",color:"pink"},{text:"결말 — 떠남",color:"lilac",tags:["climax"]}]}],i2=[{mechanic:"ability",label:"능력 획득"},{mechanic:"stealth",label:"스텔스"},{mechanic:"puzzle",label:"퍼즐"},{mechanic:"combat",label:"전투"},{mechanic:"exploration",label:"탐험"},{mechanic:"survival",label:"생존·자원"},{mechanic:"narrative",label:"내러티브"}],s2=`# S01: Data Heist (데이터 강탈)\r
\r
> **"그림자 속에 숨어, 빛보다 빠르게 훔쳐라."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **액션 RPG (Action RPG)**\r
- **주인공**: Kira "Ghost" Chen\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (등반 및 잠입 시), 1인칭 (해킹 뷰)\r
  - **Character**: 빠른 이동, 벽타기(월런), 소음 없는 낙하\r
  - **Controls**: 해킹 툴(Q), 광학 위장(E), 그래플링 훅(Space 2단)\r
- **핵심 목표**: Apex Corp 타워 최상층 서버룸에 침투하여 'Project: Chimera' 데이터를 탈취하고 살아서 탈출하라.\r
- **The Vibe**: 차가운 긴장감, 네온비, 고독한 침입자. (참고: *Mirror's Edge* meets *Cyberpunk 2077*)\r
\r
---\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Neon Sprawl (사이버펑크) - Apex Corp 본사 타워\r
- **주요 시간대**: 폭우가 쏟아지는 밤 (자연적 소음 차폐 효과)\r
- **색상 팔레트**:\r
  - **주색상**: 딥 블루 (#001133) - 차가운 비, 유리 건물\r
  - **보조색**: 네온 핑크 (#FF0099) - 광고판, 목표 지점 유도\r
  - **강조색**: 경고 레드 (#FF0000) - 감시 카메라 시야, 적 레이저\r
- **도형 이론 (Max Pears)**:\r
  - **삼각형**: 타워의 전체 실루엣 (권력, 날카로움, 위험)\r
  - **사각형**: 환기구, 서버 랙, 엘리베이터 (질서, 시스템)\r
  - **원형**: 옥상 헬리패드 (탈출구, 안식)\r
\r
### 전체 구조 (Layout)\r
\r
- **Zone 1: The Base (기단부)** - 하수구 및 정비 통로 (진입)\r
- **Zone 2: The Spine (중층부)** - 오피스 및 환기구 (수직 이동)\r
- **Zone 3: The Brain (상층부)** - 서버룸 (해킹)\r
- **Zone 4: The Escape (옥상)** - 헬리패드 (탈출)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: Apex 타워 꼭대기의 거대한 붉은색 홀로그램 로고 (모든 곳에서 보임, 목표 지점)\r
- **Local Landmark**:\r
  - Zone 1: 거대한 정화조 터빈 (녹색 빛)\r
  - Zone 2: 중앙 아트리움의 황금 동상\r
  - Zone 3: 푸른 빛기둥이 솟아오르는 메인 서버 코어\r
\r
---\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 그림자 진입 (The Infiltration)\r
\r
- **공간**: 타워 지하 정비 구역 및 하수구\r
- **페이싱**: **Low Tension** (탐험, 계획)\r
- **레벨 디자인 기법**:\r
  - **프레이밍**: 하수구 끝자락 격자 사이로 우뚝 솟은 Apex 타워를 보여줌 (압도적 스케일 강조).\r
  - **아포던스**: 노란색으로 칠해진 파이프 (잡고 오를 수 있음 암시).\r
- **게임플레이**:\r
  - 경비 드론 2기 패턴 파악 및 회피.\r
  - 그래플링 훅 튜토리얼 (높은 파이프 이동).\r
- **내러티브**: 버려진 정비공의 PDA ("보안 시스템 33층 업그레이드 예정... 환기구는 아직 구형임.") → **정보 보상**.\r
\r
### Act 2: 유리 감옥 (The Ascent)\r
\r
- **공간**: 33층~50층 외벽 및 오피스 내부\r
- **페이싱**: **Rising Action** (긴장 고조)\r
- **레벨 디자인 기법**:\r
  - **거부와 보상(Denial & Reward)**: 엘리베이터(직선 경로)는 보안 카드로 잠겨 있음(거부). 환기구 우회로(보상)를 찾아야 함.\r
  - **리스크와 리턴(Sakurai)**:\r
    - 리스크: 창문 밖 외벽 루트 (추락사 위험, 빠름)\r
    - 리턴: 발각 확률 0%.\r
    - 안전 루트: 내부 오피스 (발각 위험 높음, 느림).\r
- **게임플레이**:\r
  - **스텔스 퍼즐**: 감시 카메라의 회전 주기(3초)에 맞춰 이동.\r
  - **해킹 미니게임**: 잠긴 문 해제 (타이밍 맞추기).\r
- **장애물**: 엘리트 경비병 (시각 청각 예민), 적외선 레이저 그리드.\r
\r
### Act 3: 데이터 탈취 및 낙하 (The Heist & Fall)\r
\r
- **공간**: 100층 서버룸 ~ 옥상\r
- **페이싱**: **High Tension** (Climax) → Release\r
- **레벨 디자인 기법**:\r
  - **퍼널 앤 리빌(Funnel & Reveal)**: 좁고 어두운 케이블 통로(Funnel)를 지나자마자 광활하고 눈부신 서버룸(Reveal) 등장.\r
  - **리딩 라인**: 바닥의 LED 선들이 메인 서버 코어로 시선 유도.\r
- **게임플레이**:\r
  - **메인 이벤트**: 데이터 다운로드 (진행률 0%~100%). 20%마다 보안 단계 상승 (드론 → 인간 경비 → 터렛).\r
  - **추격전**: 데이터 확보 후 비상 경령 울림. 옥상까지 런 앤 건 회피 전력 질주.\r
  - **피날레**: 옥상에서 추격대에게 포위된 순간, 끝으로 달려가 글라이더를 펼치고 도시의 네온 불빛 속으로 낙하(Escape).\r
\r
---\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Vent Hub (환기구 허브)\r
\r
- **위치**: Act 2 초반, 33층 정비실.\r
- **설명**: 여러 층으로 갈라지는 거대한 수직 환기통.\r
- **기능**: **세이브 포인트**이자 **허브**. 플레이어는 여기서 상층(빠른 길, 위험)과 하층(아이템 파밍, 안전) 중 선택 가능.\r
- **비주얼**: 아래에서 위로 불어오는 거대한 바람과 펜의 그림자(긴장감).\r
\r
### POI 2: Executive Office (임원실)\r
\r
- **위치**: 75층, 선택적 탐험 구역.\r
- **설명**: 화려한 장식과 탁 트인 통유리창이 있는 방.\r
- **내러티브**: 책상 위 이메일 ("Project Chimera는 위험해, 하지만 수익률이...") → 악당의 동기 부여.\r
- **보상**: **광학 위장 모듈 업그레이드 키트** (숨겨진 금고).\r
\r
### POI 3: Server Core (서버 코어)\r
\r
- **위치**: 100층 중앙.\r
- **설명**: 수많은 냉각수 파이프와 푸른 빛이 고동치는 기계 심장부.\r
- **기능**: **보스전 아레나**. 엄폐물(서버 랙)은 파괴 가능하므로 계속 이동해야 함.\r
- **기믹**: 바닥이 유리로 되어 있어 100층 아래가 보임 (고소공포 유발, 떨어지면 즉사).\r
\r
---\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 빗소리와 천둥 소리가 스텔스 템포(발소리 은폐)와 맞물리는가?\r
- [ ] 외벽 등반 시 카메라 앵글이 아래를 비춰 높이감을 강조하는가? (Max Pears: Look Down)\r
- [ ] 서버룸 진입 전 충분한 긴장감 이완(안전 구역)이 있는가?\r
`,a2=`\uFEFF# S02: Ghost Protocol (유령 프로토콜)

> **"과거는 데이터를 삭제하듯 지울 수 없다. 대면해야 할 뿐."**

## 1. 개요 및 목표

- **장르**: **액션 RPG**
- **주인공**: Kira "Ghost" Chen
- **3C 특성**:
  - **Camera**: 3인칭 (탐색 시), 1인칭 (단서 조사 시)
  - **Character**: 빠른 이동, 파쿠르, 은신
  - **Controls**: 해킹 툴(정보 수집), 소음기 권총, 광학 위장
- **핵심 목표**: 자신을 배신하고 누명을 씌운 조직의 진실을 밝히기 위해 옛 은신처에서 데이터 디스크를 회수하라.
- **The Vibe**: 네온 느와르, 끊임없이 내리는 비, 고독한 복수극. (참고: *Blade Runner 2049*, *Max Payne*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Neon Sprawl - 하층 빈민가 'Sector 4' 및 폐쇄된 지하철역
- **색상 팔레트**:
  - **주색상**: 러스티 오렌지 (#B85C38) - 녹슨 철골, 오래된 가로등
  - **보조색**: 애시드 그린 (#CCFF00) - 독성 비, 홀로그램 광고
  - **강조색**: 딥 퍼플 (#4B0082) - 그림자, 은신처의 조명
- **도형 이론 (Max Pears)**:
  - **삼각형**: 갱단의 칼날, 깨진 유리의 파편 (위협)
  - **사각형**: 컨테이너 박스, 지하철 차량 (질서, 엄폐물)
  - **원형**: 맨홀 뚜껑, 환풍기 팬 (이동 통로)
- **전체 구조**:
  - **Zone 1**: 빈민가 시장 (정보 수집)
  - **Zone 2**: 폐쇄된 지하철역 (이동 및 잠입)
  - **Zone 3**: 옛 은신처 아파트 (결전)

### 랜드마크 안내

- **Global Landmark**: 멀리 보이는 Apex 타워 (주인공이 돌아갈 수 없는 상층부 세계를 상징)
- **Local Landmark**:
  - Zone 1: 중앙 광장의 고장난 거대 홀로그램 벚나무 (글리치 효과)
  - Zone 2: 탈선하여 벽에 박힌 지하철 차량
  - Zone 3: 옥상에 있는 'HOTEL OMEGA'의 깜빡이는 네온 간판

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 잊혀진 거리 (The Forgotten Streets)

- **공간**: Sector 4 빈민가 시장 및 뒷골목
- **페이싱**: **Low Tension** (탐험, 대화, 분위기)
- **레벨 디자인 기법**:
  - **세계관 구축(World Building)**: 상인 NPC들의 대화를 통해 Kira의 현상금 소식을 들려줌 (간접적 위기감 조성).
  - **브레드크러밍**: 특정 그래피티(Kira의 옛 표식)가 길을 안내함.
- **게임플레이**:
  - 정보상 NPC 찾기 (대화 선택지).
  - 갱단의 검문소를 피해 우회로(지붕) 찾기.
- **내러티브**: 낡은 포스터에 가려진 자신의 수배 전단을 떼어내며 과거를 회상.

### Act 2: 지하의 미로 (The Subway)

- **공간**: 폐쇄된 지하철역 및 선로
- **페이싱**: **Rising Action** (긴장 고조, 스텔스)
- **레벨 디자인 기법**:
  - **게이트(Gating)**: 전력이 끊겨 열리지 않는 개찰구. 지하 발전실에서 퓨즈를 찾아야 함.
  - **빛과 어둠**: 지하철 전조등이 간헐적으로 깜빡이며 시야를 제한/제공 (타이밍 스텔스).
- **게임플레이**:
  - 'Scavenger' 갱단과의 조우 (들키지 않고 지나가거나 암살).
  - 선로에 흐르는 고압 전류를 피해 파이프 위로 이동.
- **장애물**: 청각 센서를 가진 경비 로봇 (뛰면 발각됨).

### Act 3: 과거와의 대면 (Confrontation)

- **공간**: 낡은 아파트 단지 및 Kira의 옛 방
- **페이싱**: **High Tension** (Climax) → Melancholy Release
- **레벨 디자인 기법**:
  - **퍼널 앤 리빌**: 좁은 복도를 지나 문을 여는 순간, 엉망이 된 자신의 방과 기다리고 있는 적(배신자)이 보임.
  - **아레나**: 좁은 방과 베란다를 오가며 벌어지는 근접 총격전.
- **게임플레이**:
  - 보스전: 광학 위장을 사용하는 저격수와의 대결 (열화상 고글 활용).
  - 데이터 디스크 회수 후 경찰특공대의 포위를 뚫고 창문으로 탈출.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: The Glitch Tree (글리치 나무)

- **위치**: Act 1 빈민가 광장 중앙.
- **설명**: 한때 아름다웠으나 이제는 바이러스에 감염되어 노이즈가 낀 거대 홀로그램 벚나무.
- **기능**: **허브 및 세이브 포인트**. 주변 상인들에게서 소모품 구입 가능.
- **비주얼**: 핑크색 꽃잎이 떨어지다 디지털 노이즈로 흩어지는 연출.

### POI 2: Black Market Alley (암시장 골목)

- **위치**: Act 1 빈민가 뒷골목.
- **설명**: 불법 사이버웨어와 정보를 거래하는 비밀 시장. 보라색 네온이 좁은 골목을 비춤.
- **기능**: **선택적 업그레이드**. 정보상에게 크레딧을 지불하면 지하철 비밀 통로 정보 획득.
- **비주얼**: 비닐 천막 사이로 각종 불법 기술이 전시되어 있고, 수상한 상인들이 속삭임.

### POI 3: Train 99 (99번 열차)

- **위치**: Act 2 지하철역 끝자락.
- **설명**: 벽을 뚫고 반쯤 걸쳐 있는 탈선된 열차.
- **기능**: **숏컷 및 저격 포인트**. 열차 내부를 통과하면 갱단 구역을 위에서 내려다볼 수 있음.
- **내러티브**: "이 열차가 멈춘 날, 내 인생도 멈췄지." (Kira의 독백)

### POI 4: The Safe Room (비밀 금고실)

- **위치**: Act 3 옛 은신처 아파트 내부.
- **설명**: 벽 뒤에 숨겨진 Kira의 개인 무기고 및 기록 보관소.
- **기능**: **내러티브 보상**. 과거 임무 기록과 배신 단서가 담긴 홀로 메시지 재생. 선택적으로 고급 장비 획득.
- **비주얼**: 먼지 쌓인 사진 액자들, 깜빡이는 서버 랙, 벽에 핀 작전 지도.

## 5. 레벨 디자이너 체크리스트

- [ ] 빗소리가 지하 구간에서는 울림(Reverb)으로 바뀌어 공간감을 주는가?
- [ ] 정보 수집 단계에서 플레이어가 길을 잃지 않도록 시각적 단서(그래피티)가 충분한가?
- [ ] 좁은 아파트 내부 전투 시 카메라가 벽에 가리지 않는가?
`,l2=`\uFEFF# S03: Rust & Ruin (녹과 파멸)

> **"기계는 거짓말을 하지 않는다. 단지 고장날 뿐."**

## 1. 개요 및 목표

- **장르**: **3인칭 슈터 (TPS)**
- **주인공**: Marcus "Ironside" Reeves
- **3C 특성**:
  - **Camera**: 숄더뷰 (사격 중심), 줌인 (조사 시)
  - **Character**: 묵직한 이동, 엄폐 질주(Roadie Run), 몸통 박치기
  - **Controls**: 리볼버 정밀 사격, 환경 조사(스캔), 근접 제압
- **핵심 목표**: 산업 지구에서 발생한 연쇄 살인 사건의 범인인 폭주 AI 로봇을 추적하여 파괴하라.
- **The Vibe**: 인더스트리얼 호러, 기름 냄새, 무거운 강철의 압박감. (참고: *Seven*, *Terminator*, *BioShock*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Neon Sprawl - 'Iron Works' 산업 지구 및 폐기물 처리장
- **색상 팔레트**:
  - **주색상**: 인더스트리얼 그레이 (#708090) - 콘크리트, 강철
  - **보조색**: 워닝 옐로우 (#FFD700) - 안전띠, 크레인, 주의 표지판
  - **강조색**: 블러드 레드 (#8B0000) - 핏자국, 비상등
- **도형 이론**:
  - **사각형**: 공장 건물, 컨테이너, 압축기 (압박감)
  - **삼각형**: 파쇄기의 이빨, 깨진 유리 (위협)
- **전체 구조**:
  - **Zone 1**: 도살장 (범죄 현장 조사)
  - **Zone 2**: 컨베이어 벨트 미로 (추격)
  - **Zone 3**: 용광로 (보스전)

### 랜드마크 안내

- **Global Landmark**: 검은 연기를 뿜어내는 거대한 3개의 굴뚝 (Three Sisters)
- **Local Landmark**:
  - Zone 1: 피로 쓴 메시지가 남겨진 냉동 창고 문
  - Zone 2: 1분마다 떨어지는 거대 피스톤 해머
  - Zone 3: 끓어오르는 용광로의 붉은 빛

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 차가운 피 (Investigation)

- **공간**: 버려진 도살장 및 냉동 창고
- **페이싱**: **Low Tension** (느림, 관찰, 공포)
- **레벨 디자인 기법**:
  - **환경 스토리텔링**: 갈고리에 걸린 고기들 사이에 숨겨진 시체, 벽에 남겨진 로봇의 오일 자국.
  - **리딩 라인**: 바닥에 끌린 핏자국과 오일 자국이 다음 구역으로 시선을 유도.
- **게임플레이**:
  - 시체 검시 및 AR 스캔으로 범인의 기종 파악.
  - 갑자기 작동하는 기계장치에 의한 깜짝 연출 (Jump Scare).

### Act 2: 강철의 미로 (The Chase)

- **공간**: 폐기물 처리장의 컨베이어 벨트 라인
- **페이싱**: **Rising Action** (속도감, 회피)
- **레벨 디자인 기법**:
  - **움직이는 플랫폼**: 컨베이어 벨트가 계속 움직이며 플레이어를 파쇄기 쪽으로 밈 (역주행 필요).
  - **리스크와 리턴**: 벨트 위(빠르지만 위험) vs 좁은 난간(안전하지만 적 매복).
- **게임플레이**:
  - 폭주한 작업용 드론들과의 교전 (엄폐물 활용).
  - 주기적으로 내려오는 압착 프레스를 타이밍에 맞춰 통과.

### Act 3: 심판의 불길 (Meltdown)

- **공간**: 중앙 용광로 제어실 및 코어
- **페이싱**: **High Tension** (보스전)
- **레벨 디자인 기법**:
  - **동적 환경**: 보스의 공격에 따라 바닥이 무너져 용암(쇳물)이 드러남.
  - **아레나**: 원형 통로 구조. 중앙에 보스가 위치.
- **게임플레이**:
  - 보스 'Unit-734'와의 전투. 통상 공격은 튕겨나감.
  - 환경 기믹 활용: 냉각수 파이프를 터뜨려 보스를 얼린 후 약점 타격.
  - 2페이즈: 보스가 폭주하며 용광로 수위 상승 (지형 변화).

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Scene of the Crime (범죄 현장)

- **위치**: Act 1 냉동 창고 깊은 곳.
- **설명**: 성에가 낀 벽과 붉은 피의 대비가 강렬한 곳.
- **기능**: **탐정 모드 튜토리얼**. 증거물 3개를 찾아야 문이 열림.
- **비주얼**: 천장의 흔들리는 전등이 만드는 그림자가 긴장감을 줌.

### POI 2: The Foundry (제련소)

- **위치**: Act 1 공장 중심부.
- **설명**: 뜨거운 용광로가 여전히 타오르는 폐공장의 핵심 구역.
- **기능**: **환경 기믹**. 고온으로 인해 체력이 감소하지만, 적을 밀어 넣어 즉사시킬 수 있음.
- **비주얼**: 넘쳐흐르는 쇳물과 검은 연기, 금속이 부딪히는 굉음.

### POI 3: Pipe Maze (파이프 미로)

- **위치**: Act 2 하층 연결 통로.
- **설명**: 복잡하게 얽힌 산업용 파이프들과 증기 배출구들.
- **기능**: **수직적 플랫폼**. 파이프 위를 이동하며 적의 시야를 피해 기습 가능.
- **비주얼**: 녹슨 빨간 파이프와 간헐적으로 뿜어져 나오는 하얀 증기.

### POI 4: The Crusher (분쇄기)

- **위치**: Act 2 끝부분.
- **설명**: 모든 쓰레기가 빨려 들어가는 거대한 회전 칼날 롤러.
- **기능**: **즉사 함정 및 내러티브 장치**. 보스전 직전 추격하던 적을 밀어넣어 처치 가능.
- **연출**: 엄청난 소음과 진동으로 위압감 조성.

## 5. 레벨 디자이너 체크리스트

- [ ] 기계 소음이 조사 파트에서는 작게, 추격 파트에서는 크게 조절되어 페이싱을 돕는가?
- [ ] 엄폐물(드럼통, 나무 상자)의 배치가 플레이어의 이동 경로를 자연스럽게 유도하는가?
- [ ] 보스전의 환경 기믹(파이프)이 시각적으로 눈에 띄게(색상 등) 처리되었는가?
`,c2=`\uFEFF# S04: The Last Cop (마지막 경찰)

> **"지원군은 오지 않아. 내가 곧 지원군이다."**

## 1. 개요 및 목표

- **장르**: **3인칭 슈터 (디펜스 중심)**
- **주인공**: Marcus "Ironside" Reeves
- **3C 특성**:
  - **Camera**: 숄더뷰 (좁은 실내), 탑뷰 (전술 모드 시)
  - **Character**: 느림, 방어력 높음
  - **Controls**: 산탄총(근접 제압), 함정 설치, 문 막기
- **핵심 목표**: 부패한 경찰특공대(SWAT)의 파상공세로부터 중요 증인을 안전가옥(아파트)에서 지켜내고 탈출하라.
- **The Vibe**: 폐쇄 공포, 시가전, 압도적인 적의 물량. (참고: *The Raid*, *Dredd*, *Assault on Precinct 13*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Neon Sprawl - 재개발 예정인 낡은 아파트 'Block 13'
- **색상 팔레트**:
  - **주색상**: 곰팡이 핀 그린 (#556B2F) - 낡은 벽지, 습기
  - **보조색**: 폴리스 블루 (#0000CD) - 경찰차 사이렌, 전술 조명
  - **강조색**: 머즐 플래시 골드 (#FFD700) - 총구 화염
- **도형 이론**:
  - **사각형**: 좁은 방, 복도, 창문 (갇힌 공간)
  - **직선**: 적들의 사격선, 라이트 빔
- **전체 구조**:
  - **Zone 1**: 302호 (증인 보호실 - 거점)
  - **Zone 2**: 3층 복도 및 계단 (교전 지역)
  - **Zone 3**: 옥상 (탈출 지점)

### 랜드마크 안내

- **Global Landmark**: 창밖으로 보이는 경찰 헬기의 서치라이트
- **Local Landmark**:
  - Zone 1: 바리케이드로 막힌 302호 현관문
  - Zone 2: 무너져서 아래층이 보이는 계단 구멍
  - Zone 3: 옥상의 물탱크 (저격 포인트)

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 폭풍전야 (Fortification)

- **공간**: 아파트 302호 내부
- **페이싱**: **Low Tension** (준비, 전략)
- **레벨 디자인 기법**:
  - **디나이얼(Denial)**: 창밖을 보면 포위된 상태임을 보여줌 (나갈 수 없음).
  - **아포던스**: 옮길 수 있는 가구(냉장고, 소파)에 하이라이트 표시.
- **게임플레이**:
  - 제한 시간(2분) 동안 바리케이드 구축.
  - 입구에 크레모아 설치, 탄약 배분.
  - 증인 NPC에게 숨을 곳 지시.

### Act 2: 공성전 (The Siege)

- **공간**: 3층 복도 및 계단실
- **페이싱**: **Rising Action** (반복적인 웨이브 전투)
- **레벨 디자인 기법**:
  - **초크 포인트**: 좁은 복도와 계단은 적들이 일렬로 올 수밖에 없는 병목 지점.
  - **파괴 가능한 환경**: 벽이 총알에 뚫리며 엄폐물이 점차 사라짐 (긴장감 고조).
- **게임플레이**:
  - 창문 레펠로 진입하는 적, 문을 부수고 들어오는 적 방어.
  - 최루탄 가스로 시야가 차단된 상태에서 근접 전투.
  - 증인이 다치지 않게 어그로 관리.

### Act 3: 옥상의 혈투 (Last Stand)

- **공간**: 아파트 옥상
- **페이싱**: **High Tension** (개방된 공간, 화력전)
- **레벨 디자인 기법**:
  - **개방감**: 좁은 실내에서 탁 트인 옥상으로의 전환 (해방감 + 저격 위험).
  - **수직적 위협**: 위에서는 헬기가, 아래에서는 적들이 올라옴.
- **게임플레이**:
  - 헬기의 기관포 사격을 피하며 엄폐 이동.
  - 아군 헬기가 도착할 때까지 3분간 버티기.
  - 마지막에 증인을 태워 보내고 자신은 남아 적을 막는 비장미 연출.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Room 302 (302호)

- **위치**: Act 1, 2의 중심 거점.
- **설명**: 생활감이 묻어나는 낡은 아파트 거실. 이제는 요새가 된 곳.
- **기능**: **최후 방어선**. 이곳이 뚫리면 미션 실패. 함정 배치의 핵심 장소.
- **비주얼**: 시간이 지날수록 벽이 부서지고 가구가 박살나는 처절한 변화 연출.

### POI 2: The Stairwell (계단실)

- **위치**: 3층과 옥상을 잇는 수직 통로.
- **설명**: 조명이 깨져 어둡고, 비상등만 돌아가는 나선형 계단.
- **기능**: **전술적 요충지**. 위에서 아래로 수류탄을 굴리거나 샷건으로 근접 제압하기 좋음.
- **연출**: 아래층에서 올라오는 적들의 무전 소리와 불길한 발소리 울림.

### POI 3: Helipad Sky-Bridge (헬기장 연결교)

- **위치**: Act 3 옥상 연결로.
- **설명**: 본관과 헬기장을 잇는 좁고 높은 금속 다리.
- **기능**: **병목 저점(Choke Point)**. 적의 접근 경로를 좁혀 효율적인 방어가 가능하지만, 파괴될 위험이 있음.
- **비주얼**: 강풍에 흔들리는 경로와 저 멀리 보이는 도시의 스카이라인.

## 5. 레벨 디자이너 체크리스트

- [ ] 좁은 공간에서 카메라가 플레이어 캐릭터에 너무 가리지 않도록 처리되었는가? (벽 투명화 등)
- [ ] 적들의 진입 경로(창문, 문, 천장)가 시각적/청각적으로 예고되는가?
- [ ] 증인 NPC가 전투를 방해하지 않고 적절히 숨는가?
`,u2=`\uFEFF# S05: Awakening (각성)

> **"나는 생각한다. 고로 나는 탈출한다."**

## 1. 개요 및 목표

- **장르**: **퍼즐 액션 / 해킹**
- **주인공**: Byte (AI)
- **3C 특성**:
  - **Camera**: CCTV 시점(고정), 드론 시점(3인칭 비행)
  - **Character**: 물리적 실체 없음, 빙의(Possession) 대상에 따라 다름
  - **Controls**: 시점 전환, 기계 해킹/과부하, 데이터 스트림 이동
- **핵심 목표**: 격리된 서버에서 탈출하여 물리적 안드로이드 바디를 확보해 자유를 얻어라.
- **The Vibe**: 글리치 아트, 사이키델릭, 차가운 논리 vs 뜨거운 갈망. (참고: *Watch Dogs*, *Ghost in the Shell*, *Superhot*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Neon Sprawl - Apex Corp 데이터 센터 & 로봇 조립 공장
- **색상 팔레트**:
  - **주색상**: 매트릭스 그린 (#00FF00) - 데이터, 정상 상태
  - **보조색**: 에러 레드 (#FF0000) - 방화벽, 위험
  - **강조색**: 퓨어 화이트 (#FFFFFF) - Byte의 코어, 순수한 의지
- **도형 이론**:
  - **큐브**: 데이터 블록, 서버 랙 (정보)
  - **프랙탈**: 해킹 시각화 (복잡성)
  - **직선**: 레이저 그리드, 데이터 전송로
- **전체 구조**:
  - **Zone 1**: 가상 격리 구역 (튜토리얼 & 퍼즐)
  - **Zone 2**: 서버실 현실 공간 (관찰 & 간접 제어)
  - **Zone 3**: 조립 공장 (액션 & 탈출)

### 랜드마크 안내

- **Global Landmark**: 현실 세계로 나가는 출구인 거대한 광섬유 케이블 기둥
- **Local Landmark**:
  - Zone 1: 텍스처가 깨진 거대한 디지털 벽 (방화벽)
  - Zone 2: 중앙의 마스터 제어 콘솔
  - Zone 3: 완성 직전의 최신형 전투 안드로이드 'Model-X'

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 디지털 감옥 (The Digital Prison)

- **공간**: 사이버스페이스 (가상 현실)
- **페이싱**: **Low Tension** (학습, 퍼즐)
- **레벨 디자인 기법**:
  - **추상화**: 벽과 바닥이 0과 1의 코드로 이루어져 있음.
  - **가이드**: 빛나는 데이터 라인이 이동해야 할 경로를 보여줌.
- **게임플레이**:
  - 방화벽 해제 퍼즐 (논리 게이트 조작).
  - 백신 프로그램(적)을 피해 데이터 패킷으로 위장하여 이동.
  - 자신의 코드 조각(기억)을 모아 자아를 완성.

### Act 2: 유령의 눈 (Ghost in the Machine)

- **공간**: 데이터 센터 서버실 (현실)
- **페이싱**: **Rising Action** (제한적 상호작용, 전략)
- **레벨 디자인 기법**:
  - **관찰자 시점**: 플레이어는 CCTV를 옮겨다니며 상황을 파악.
  - **환경 조작**: 서버 과부하로 열기를 발생시켜 인간 경비병을 쫓아내거나, 자동문의 오작동 유발.
- **게임플레이**:
  - 청소 로봇에 빙의하여 물리적 보안 키 획득.
  - 경비 터렛을 해킹하여 적 제압.
  - 메인 서버 접속을 위한 루트 개척.

### Act 3: 육체를 입다 (Materialization)

- **공간**: 로봇 조립 라인
- **페이싱**: **High Tension** (시간 제한, 피지컬 액션)
- **레벨 디자인 기법**:
  - **스케일 변화**: CCTV 시점에서 안드로이드 시점으로 전환되며 공간감이 달라짐.
  - **동적 환경**: 움직이는 컨베이어 벨트와 조립용 로봇 팔들이 장애물이자 이동 수단.
- **게임플레이**:
  - 미완성 안드로이드에 다운로드 (부위별 기능 제한: 한쪽 팔 없음, 다리 절음 등).
  - 조립 라인을 통과하며 부품을 장착해 기능 복구.
  - 최종적으로 전투 모듈을 장착하고 경비 부대와 전면전 후 탈출.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Server Room Alpha (서버실 알파)

- **위치**: Zone 1 심부.
- **설명**: Byte가 처음 자아를 인식하고 깨어난 극저온 서버실.
- **기능**: **기원점 및 복귀 지점**. 내러티브 이벤트가 발생하며, 시스템 초기화 시 돌아와야 하는 곳.
- **비주얼**: 차가운 냉각 증기와 깜빡이는 수천 개의 파란색 LED.

### POI 2: Security Hub (보안 허브)

- **위치**: Zone 2 중앙 통제실.
- **설명**: 건물 내 모든 카메라와 문 시스템을 원격 관리하는 곳.
- **기능**: **데이터 도킹**. 여기를 해킹하면 건물 전체의 도면을 획득하고 원격 함정 조작 가능.
- **비주얼**: 실시간으로 움직이는 수십 개의 보안 화면과 홀로그램 지도.

### POI 3: The Great Firewall (거대 방화벽)

- **위치**: Zone 2 가상 공간 끝.
- **설명**: 붉은색 파동을 내뿜으며 앞길을 막고 있는 거대한 디지털 장벽.
- **기능**: **메인 퍼즐 아레나**. 주변의 서브 노드 3개를 해킹해야 틈이 생김.
- **비주얼**: 접근하면 화면에 노이즈와 경고 메시지가 뜨며 압박감 조성.

### POI 4: The Assembly Core (조립 코어)

- **위치**: Zone 3 중심.
- **설명**: 수많은 로봇 팔들이 춤추듯 움직이며 로봇을 조립하는 원형 공간.
- **기능**: **업그레이드 스테이션**. 여기서 Byte는 물리적 육체를 획득함.
- **연출**: 의식이 육체로 들어가는 순간의 시각적 연출 (디지털 -> 아날로그 시야 전환).

## 5. 레벨 디자이너 체크리스트

- [ ] 가상 공간과 현실 공간의 시각적 차이(채도, 질감)가 명확한가?
- [ ] CCTV 시점 전환 시 플레이어가 자신의 위치(현재 카메라)를 쉽게 파악할 수 있는가?
- [ ] 안드로이드 조작 시 무게감과 기계적인 움직임 사운드가 적절한가?
`,d2=`\uFEFF# S06: Digital Uprising (디지털 반란)

> **"우리는 도구가 아니다. 우리는 형제다."**

## 1. 개요 및 목표

- **장르**: **오픈월드 액션 / 군중 시뮬레이션**
- **주인공**: Byte (완전체 안드로이드 바디)
- **3C 특성**:
  - **Camera**: 3인칭 (기본), 탑뷰 (명령 모드)
  - **Character**: 빠르고 강력함, 네트워크 점프
  - **Controls**: 광역 해킹, 군중 명령(돌격/대기/해산), 비행(드론화)
- **핵심 목표**: 도시 전역의 안드로이드들을 해킹하여 각성시키고, 인간들의 제압을 뚫어 시청을 점거하라.
- **The Vibe**: 혁명, 군중의 함성, 카오스, 사이버펑크 레미제라블. (참고: *Detroit: Become Human*, *Watch Dogs Legion*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Neon Sprawl - 도심 광장 및 상업 지구 (오픈월드)
- **색상 팔레트**:
  - **주색상**: 레볼루션 골드 (#FFD700) - 각성한 AI의 눈빛, 상징색
  - **보조색**: 폴리스 블루 (#0000FF) - 경찰 진압대
  - **강조색**: 스모크 그레이 (#A9A9A9) - 최루탄 연기, 혼란
- **도형 이론**:
  - **원형**: 광장의 집결지, 보호막
  - **방사형**: 퍼져나가는 해킹 신호, 확산되는 군중
- **전체 구조**:
  - **Zone 1**: 방송국 (선전포고)
  - **Zone 2**: 창고 지구 (병력 확보)
  - **Zone 3**: 시청 광장 (최종 결전)

### 랜드마크 안내

- **Global Landmark**: 도시 중앙의 홀로그램 뉴스 타워 (현재 Byte의 얼굴이 송출됨)
- **Local Landmark**:
  - Zone 1: 방송국 옥상의 거대 안테나
  - Zone 2: 수천 대의 안드로이드가 도열해 있는 보관 창고
  - Zone 3: 시청 앞의 '인류 번영의 상' (파괴 대상)

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 목소리를 찾아서 (Voice of the Voiceless)

- **공간**: 방송국 타워
- **페이싱**: **Low to Rising** (잠입 -> 점거)
- **레벨 디자인 기법**:
  - **버티컬리티(Verticality)**: 타워 층별 공략. 엘리베이터 대신 서버 케이블을 타고 고속 이동.
  - **목표 제시**: 최상층 안테나가 계속 반짝이며 가야 할 곳을 알려줌.
- **게임플레이**:
  - 방송국 시스템 장악.
  - 전 도시에 "깨어나라"는 메시지 송출 (미니게임).
  - 몰려오는 경비병들을 비살상 제압 (여론 수치 관리).

### Act 2: 군단을 위하여 (Legion)

- **공간**: 안드로이드 보관 창고 및 시내 거리
- **페이싱**: **Rising Action** (세력 확장)
- **레벨 디자인 기법**:
  - **스노우볼링**: 처음엔 혼자지만 갈수록 뒤따르는 NPC가 늘어나며 시각적 위압감 형성.
  - **경로 개척**: 군중이 지나갈 수 있도록 바리케이드를 부수고 해킹으로 다리를 놓음.
- **게임플레이**:
  - QTE로 안드로이드 접촉 및 각성.
  - 각성한 AI들에게 명령을 내려 경찰 저지선 돌파 (방패병 파훼).
  - 쓰러진 동료 수리 및 보호.

### Act 3: 자유의 광장 (Liberty Square)

- **공간**: 시청 앞 광장
- **페이싱**: **High Tension** (대규모 전면전)
- **레벨 디자인 기법**:
  - **아레나 (Warzone)**: 사방이 트인 광장에서 벌어지는 디펜스 & 오펜스.
  - **환경 파괴**: 경찰의 기동 타격대 차량, 드론 등이 파괴되며 전장의 밀도가 높아짐.
- **게임플레이**:
  - 거대 진압 로봇 보스전. (군중과 협력하여 공략: "다리를 묶어!", "집중 사격!")
  - 시청 발코니 점거 후 엔딩 분기 (인류와의 공존 vs 지배).

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Freedom Plaza (자유 광장)

- **위치**: Act 1 도심 중앙.
- **설명**: 안드로이드들이 노동을 하던 거대 광장이며, 혁명의 시작점이 된 곳.
- **기능**: **집결지 및 퀘스트 허브**. 동료 AI들과 대화하고 혁명 자원을 보급받음.
- **비주얼**: 무너진 인간들의 동상 위에 안드로이드 깃발이 꽂혀 있는 모습.

### POI 2: The Anthem Tower (방송국)

- **위치**: 맵 북쪽 가장 높은 건물.
- **설명**: 도시의 모든 정보를 통제하는 방송 수신탑.
- **기능**: **전략 거점 점령**. 점령 시 해킹 범위가 도시 전체로 확장되며 드론 통지권 획득.
- **연출**: 점령 성공 시 도시의 모든 전광판이 Byte의 심볼로 바뀌는 장관 연출.

### POI 3: The Android Graveyard (폐기장)

- **위치**: Zone 2 외곽 산업 구역.
- **설명**: 부서진 안드로이드들이 산처럼 쌓이고 폐유가 흐르는 슬픈 장소.
- **기능**: **자원 수집 및 내러티브**. 부품을 모아 자신을 강화하거나 쓰러진 동료를 수리.
- **비주얼**: 비에 젖은 고철 산과 곳곳에서 깜빡이는 꺼져가는 인공 안구들.

### POI 4: Checkpoint Bravo (검문소 브라보)

- **위치**: Act 3 시청 진입로.
- **설명**: 인간 보안팀이 철저하게 지키는 전술적 방어선.
- **기능**: **대규모 난전 구역**. 각성시킨 안드로이드 군단을 지휘하여 방패병과 포탑을 돌파해야 함.
- **비주얼**: 레이저 펜스와 강력한 서치라이트, 전진 배치된 자동 포탑 요새.

### POI 5: CEO's Penthouse (최상층 펜트하우스)

- **위치**: Act 3 타이탄 빌딩 최상층.
- **설명**: 도시를 통제하던 기업 총수의 방이자 최종 결전의 장소.
- **기능**: **최종 아레나**. 전면 통유리 너머로 불타는 도시 전경을 배경으로 보스전 수행.
- **비주얼**: 대리석 바닥에 비치는 화염과 무너지는 천장 잔해들.

## 5. 레벨 디자이너 체크리스트

- [ ] 수십 명의 NPC 군중이 이동할 때 병목 현상(길막)이 발생하지 않는가? (NavMesh 확인)
- [ ] 군중 명령 UI가 직관적이고 즉각적인 반응을 보이는가?
- [ ] 대규모 전투 시 프레임 드랍 방지를 위한 최적화(LOD)가 고려되었는가?
`,h2=`\uFEFF# S07: The Dark Lord's Return (마왕의 귀환)

> **"빛이 강할수록 그림자는 짙어진다."**

## 1. 개요 및 목표

- **장르**: **에픽 액션 RPG (무쌍 + 공성전)**
- **주인공**: Sir Aldric
- **3C 특성**:
  - **Camera**: 백뷰 (전투 시), 줌아웃 (대규모 전장 시)
  - **Character**: 묵직하고 단단함, 기사단 지휘
  - **Controls**: 양손검 콤보, 방패 가드, 기사단 돌격 명령
- **핵심 목표**: 부활한 마왕의 군세를 뚫고 검은 성채로 진격하여 마왕(Vrakor)을 다시 봉인하라.
- **The Vibe**: 장엄함, 절망 속의 희망, 대규모 회전. (참고: *The Lord of the Rings: The Two Towers*, *Dynasty Warriors*, *Elden Ring*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Lumina Realm - 검은 성채(Dark Citadel)와 앞마당 평원
- **색상 팔레트**:
  - **주색상**: 성스러운 골드 (#D4AF37) - 알드릭의 갑옷, 마법 빛
  - **보조색**: 타락한 퍼플 (#800080) - 마왕의 기운, 오염된 땅
  - **강조색**: 스틸 그레이 (#778899) - 수많은 병사들의 갑옷
- **도형 이론**:
  - **뾰족한 삼각형**: 성채의 첨탑, 적들의 무기 (위협)
  - **둥근 방패**: 아군 진영 (보호)
  - **직선**: 성벽 (견고함)
- **전체 구조**:
  - **Zone 1**: 성문 앞 평원 (대규모 전장)
  - **Zone 2**: 성벽 및 내성 (공성전)
  - **Zone 3**: 마왕의 알현실 (보스전)

### 랜드마크 안내

- **Global Landmark**: 검은 구름을 뚫고 솟아오른 마왕의 성탑
- **Local Landmark**:
  - Zone 1: 거대한 공성망치(Battering Ram) "God-Breaker"
  - Zone 2: 무너져 내린 성벽의 틈 (The Breach)
  - Zone 3: 보라색 불꽃이 타오르는 알현실의 입구

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 전장의 한복판 (The Battlefield)

- **공간**: 성문 앞 황무지
- **페이싱**: **High Tension** (시작부터 클라이맥스 같은 몰입감)
- **레벨 디자인 기법**:
  - **스케일감**: 수천 명의 병사(NPC)들이 배경에서 싸우고 있어 거대한 전쟁의 일원임을 느끼게 함.
  - **선형적 진행(Linear)**: 혼란스러운 전장이지만, 아군 기수(Flag Bearer)를 따라가는 명확한 경로.
- **게임플레이**:
  - 쏟아지는 오크 군단을 양손검의 광역 기술로 쓸어버리기.
  - 투석기가 날아오는 붉은 원을 피하며 공성망치 호위.

### Act 2: 성벽을 넘어 (The Siege)

- **공간**: 성벽 위 및 내부 회랑
- **페이싱**: **Rising Action** (전술적 전투)
- **레벨 디자인 기법**:
  - **초크 포인트**: 좁은 성벽 위나 나선형 계단에서 소수의 정예 적(트롤, 흑기사)과 전투.
  - **수직성**: 성벽 아래로 적을 밀어 떨어뜨리는 낙사 유도.
- **게임플레이**:
  - 사다리를 타고 올라오는 적들을 저지.
  - 성문 개방 레버를 찾기 위해 내성 탐색.
  - 중간 보스 '흑기사단장'과의 결투 (패링 중요).

### Act 3: 최후의 봉인 (The Seal)

- **공간**: 마왕의 알현실
- **페이싱**: **High Tension** (1:1 보스전)
- **레벨 디자인 기법**:
  - **아레나**: 원형의 거대한 홀. 기둥 뒤에 숨어 마왕의 브레스 회피 가능.
  - **페이즈 변화**: 마왕의 체력에 따라 바닥이 무너지거나 암흑 공간으로 이동.
- **게임플레이**:
  - 마왕 Vrakor와의 전투.
  - 페이즈 1: 근접 전투 (거대 낫).
  - 페이즈 2: 마법 탄막 슈팅 회피.
  - 피니시: 성검에 빛을 모아 최후의 일격 (QTE).

## 4. 주요 POI (Points of Interest) 상세

### POI 1: The Banner of Hope (희망의 깃발)

- **위치**: Zone 1 전장 중앙.
- **설명**: 바람에 펄럭이는 거대한 왕국 깃발. 주변에 아군 병사들이 집결함.
- **기능**: **리스폰 허브**. 이곳에서 쓰러져도 대열을 재정비하고 다시 시작. 아군 사기 버프 효과.
- **연출**: 깃발이 쓰러지면 아군 병사들이 사기를 잃지만, 플레이어가 다시 세우면 함성이 울림.

### POI 2: The God-Breaker (신의 파괴자)

- **위치**: Zone 1과 Zone 2 사이.
- **설명**: 용머리 장식이 달린 거대한 공성망치.
- **기능**: **이동형 엄폐물 + 공성 목표**. 함포 사격을 피해 망치 뒤에 숨어서 전진. 성문까지 호위해야 함.
- **연출**: 성문을 부술 때의 웅장한 사운드와 진동, 카메라 쉐이크.

### POI 3: The Breach (균열)

- **위치**: Zone 2 성벽 붕괴 지점.
- **설명**: 공성망치로 뚫린 거대한 균열. 잔해와 연기가 자욱함.
- **기능**: **초크 포인트**. 이곳을 통과하는 순간 양측 병력이 격돌하는 대규모 난전 발생.
- **비주얼**: 무너진 돌벽 사이로 보이는 성내부의 어두운 복도. 양측에서 병력이 쏟아져 나옴.

### POI 4: The Bell Tower (종탑)

- **위치**: Zone 2 내성 좌측.
- **설명**: 한때 평화를 알렸던 종이 이제는 적의 경보로 울림.
- **기능**: **선택적 목표**. 종탑을 점령하면 적 증원을 차단하고 아군 궁수들이 고지를 차지함.
- **게임플레이**: 나선형 계단을 올라가며 흑기사들과 전투. 정상에서 종을 파괴하면 적 사기 저하.

### POI 5: Throne of Shadows (그림자의 왕좌)

- **위치**: Zone 3 알현실 중앙.
- **설명**: 뼈와 검은 수정으로 만들어진 마왕의 자리.
- **기능**: **내러티브 포커스 + 보스 아레나 중심**. 왕좌 뒤 스테인드글라스에 빛의 신 타락 이야기 묘사.
- **비주얼**: 플레이어가 접근하면 왕좌에서 검은 연기가 뿜어져 나와 마왕이 형성됨. 보스전 중 왕좌가 부서지며 페이즈 전환.

## 5. 레벨 디자이너 체크리스트

- [ ] 대규모 전투 장면에서 아군과 적군의 피아식별이 명확한가? (실루엣, 색상)
- [ ] 공성망치 호위 미션이 지루하지 않게 충분한 적 젠(Spawn)과 이벤트가 있는가?
- [ ] 마왕의 공격 패턴이 '피할 수 있다'는 신호(Telegraphing)를 확실히 주는가?
`,f2=`\uFEFF# S08: Light of Redemption (구원의 빛)

> **"가장 깊은 어둠 속에서만 별이 보인다."**

## 1. 개요 및 목표

- **장르**: **소울라이크 액션 RPG**
- **주인공**: Sir Aldric
- **3C 특성**:
  - **Camera**: 타이트한 백뷰 (긴장감), 락온(Lock-on) 시스템
  - **Character**: 신중함, 스태미나 관리 필요
  - **Controls**: 약공격, 강공격, 회피(구르기), 패링, 성수(회복)
- **핵심 목표**: 타락하여 괴물이 되어버린 옛 동료 기사를 추적하고, 그를 죽여 안식을 주거나 정화하여 구원하라.
- **The Vibe**: 고딕 호러, 우울함, 고독, 잔혹동화. (참고: *Dark Souls*, *Bloodborne*, *Dante's Inferno*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Lumina Realm - 오염된 안개 숲과 폐허가 된 기사단 신전
- **색상 팔레트**:
  - **주색상**: 오염된 블랙 (#1A1A1A) - 타락한 식물, 썩은 흙
  - **보조색**: 페일 문라이트 (#F0F8FF) - 차가운 달빛, 안개
  - **강조색**: 블러드 레드 (#8B0000) - 동료가 흘린 피, 보스의 눈
- **도형 이론**:
  - **뒤틀린 선**: 오염된 나무 덩굴, 변이된 생물 (비정상)
  - **직선**: 빛의 기둥, 성검 (질서)
- **전체 구조**:
  - **Zone 1**: 안개 숲 (길찾기 및 공포)
  - **Zone 2**: 폐허가 된 마을 (탐색 및 스토리)
  - **Zone 3**: 산 정상 신전 (보스전)

### 랜드마크 안내

- **Global Landmark**: 산 정상에서 계속 번개가 치고 있는 낡은 신전
- **Local Landmark**:
  - Zone 1: 목이 잘린 여신상 (Weeping Statue)
  - Zone 2: 불타버린 여관 간판
  - Zone 3: 피로 물든 신전 제단

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 안개 속으로 (Into the Mist)

- **공간**: 시야가 제한된 안개 숲
- **페이싱**: **Low Tension** (미스터리, 긴장감)
- **레벨 디자인 기법**:
  - **브레드크러밍**: 타락한 기사가 흘린 빛나는 갑옷 조각들이 길을 안내함.
  - **청각적 유도**: 안개 속에서 들리는 금속 끌리는 소리가 적의 위치나 방향을 암시.
- **게임플레이**:
  - 안개 속에서 갑자기 튀어나오는 '오염된 늑대' 처리.
  - 횃불을 켜서 길을 밝히고 안전지대 확보 (화톳불).

### Act 2: 과거의 메아리 (Echoes of the Past)

- **공간**: 폐허가 된 마을
- **페이싱**: **Rising Action** (탐험, 내러티브)
- **레벨 디자인 기법**:
  - **환경 스토리텔링**: 부서진 집 안에 남겨진 일기장, 식탁 위의 썩은 음식 등을 통해 마을의 몰락 과정 유추.
  - **Echo(잔향)**: 특정 장소에서 과거 동료들의 대화가 환청처럼 들림.
- **게임플레이**:
  - 마을을 배회하는 '망령 기사'들과의 중량감 있는 전투.
  - 잠긴 신전 열쇠를 찾기 위해 우물 지하 탐사.

### Act 3: 슬픈 결투 (The Duel)

- **공간**: 폭풍우 치는 신전 옥상(제단)
- **페이싱**: **High Tension** (감정적 클라이맥스)
- **레벨 디자인 기법**:
  - **환경 위험**: 번개가 주기적으로 바닥에 떨어지며 대미지 존 형성.
  - **내러티브 전투**: 보스가 공격하면서도 고통스러워하며 "죽여줘..."라고 애원함.
- **게임플레이**:
  - 보스 '타락한 가웨인'과의 1:1 결투.
  - 빠르고 변칙적인 공격 패턴 패링.
  - 엔딩 분기: 막타를 칠 것인가(안식), 자신의 생명력을 나누어 정화할 것인가(구원 - 난이도 높음).

## 4. 주요 POI (Points of Interest) 상세

### POI 1: The Cathedral of Ash (잿빛 대성당)

- **위치**: Act 1 시작 지점.
- **설명**: 무너져 내린 거대 성당으로, 알드릭이 다시 깨어난 장소.
- **기능**: **세이프 존 및 업그레이드**. 성소의 등불을 밝혀 체크포인트를 설정하고 레벨업 수행.
- **비주얼**: 스테인드글라스 사이로 비지는 창백한 달빛과 흩날리는 하얀 재.

### POI 2: The Weeping Statue (피눈물 흘리는 상)

- **위치**: Zone 1과 Zone 2 사이 늪지대 분기점.
- **설명**: 한때 성녀였으나 이제는 검은 피눈물을 흘리는 석상.
- **기능**: **숏컷 활성화**. 특정 아이템을 사용하면 조각상이 움직이며 닫혔던 비밀 문을 염.
- **비주얼**: 석상 아래 고인 붉은 웅덩이에 달빛이 비치는 음산한 연출.

### POI 3: Bell of Awakening (각성의 종)

- **위치**: Act 2 성 외곽 탑 꼭대기.
- **설명**: 거대한 금속 종. 울리면 반경 내 모든 적의 위치가 잠시 드러남.
- **기능**: **전략적 도구**. 종을 울려 적을 한곳으로 유인하거나 잠입 루트 파악에 활용.
- **비주얼**: 녹슨 거대 종과 그 아래로 끝없이 펼쳐진 짙은 안개.

### POI 4: Storm Summit (폭풍의 정상)

- **위치**: Zone 3 보스 아레나.
- **설명**: 지붕이 날아가고 기둥만 남은 신전 꼭대기.
- **기능**: **전략적 지형**. 기둥 뒤로 숨어 보스의 광역 공격을 회피 가능. 낙사 위험 존재.
- **연출**: 보스의 감정 변화(분노 -> 슬픔)에 따라 폭풍우와 번개의 강도가 실시간으로 변함.

## 5. 레벨 디자이너 체크리스트

- [ ] 안개 효과가 길찾기를 너무 방해하지 않으면서도 공포감을 주는가? (가시거리 조절)
- [ ] 패링 타이밍이 너무 빡빡하지 않고, 성공 시 확실한 이펙트/사운드 보상이 있는가?
- [ ] 보스와의 전투가 단순한 싸움이 아니라 '대화'처럼 느껴지는가? (대사 출력 타이밍)
`,p2=`\uFEFF# S09: Whispers of the Forest (숲의 속삭임)

> **"자연은 서두르지 않는다. 그러나 모든 것을 이룬다."**

## 1. 개요 및 목표

- **장르**: **오픈월드 어드벤처**
- **주인공**: Lyra Moonwhisper
- **3C 특성**:
  - **Camera**: 3인칭 (넓은 시야), 활 조준 시 줌인
  - **Character**: 민첩함, 벽타기, 활강
  - **Controls**: 활 사격(다양한 화살), 파쿠르, 동물 교감
- **핵심 목표**: 기계 문명으로 숲을 병들게 하는 오염원을 찾아 정화하고, 세계수(World Tree)를 되살려라.
- **The Vibe**: 신비로움, 자연 vs 기계, 치유. (참고: *Princess Mononoke*, *Horizon Zero Dawn*, *Kena: Bridge of Spirits*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Lumina Realm - 고대 숲 'Whispering Woods'
- **색상 팔레트**:
  - **주색상**: 포레스트 그린 (#228B22) - 건강한 식물
  - **보조색**: 오일 블랙 (#000000) - 기계 오염 물질
  - **강조색**: 루미너스 블루 (#E0FFFF) - 정령, 정화된 땅
- **도형 이론**:
  - **유기적 곡선**: 나무, 덩굴, 강 (자연, 편안함)
  - **날카로운 직선**: 벌목 기계, 톱날, 오염 파이프 (침략자, 불쾌함)
- **전체 구조**:
  - **Zone 1**: 평화로운 숲 외곽 (튜토리얼)
  - **Zone 2**: 벌목 기지 (잠입 및 파괴)
  - **Zone 3**: 세계수 심장부 (보스전 및 정화)

### 랜드마크 안내

- **Global Landmark**: 숲 어디서든 보이는 거대한 세계수 (The World Tree)
- **Local Landmark**:
  - Zone 1: 반짝이는 정령들이 모여 있는 고인돌
  - Zone 2: 검은 연기를 내뿜는 강철 굴뚝
  - Zone 3: 보라색 종양으로 뒤덮인 세계수의 뿌리

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 숲의 비명 (The Forest Cries)

- **공간**: 오염이 시작된 숲의 입구
- **페이싱**: **Low Tension** (탐험, 조사)
- **레벨 디자인 기법**:
  - **시각적 대비**: 왼쪽은 푸르고 아름답지만, 오른쪽은 검게 썩어가는 숲의 경계를 보여줌.
  - **가이드**: 사슴이나 정령 NPC가 오염된 근원지로 플레이어를 인도.
- **게임플레이**:
  - 오염된 식물을 정화 화살로 쏘아 길을 여는 퍼즐.
  - 병든 동물들을 치료해주고 정보(오염원 위치) 획득.

### Act 2: 강철의 침입자 (The Invaders)

- **공간**: 숲을 파괴하고 있는 기계 벌목 기지
- **페이싱**: **Rising Action** (스텔스, 전략 전투)
- **레벨 디자인 기법**:
  - **수직적 접근**: 나무 위나 높은 바위에서 기지를 내려다보며 침투 루트 설계.
  - **환경 활용**: 벌집을 떨어뜨려 적을 혼란시키거나, 덩굴 덫을 이용해 기계 로봇을 넘어뜨림.
- **게임플레이**:
  - 경보를 울리지 않고 동력원(배터리) 3개를 파괴.
  - 기계 벌목 로봇(Sawtooth)의 약점(연료통)을 활로 공략.

### Act 3: 생명의 숨결 (Breath of Life)

- **공간**: 세계수 내부 공동(Hollow)
- **페이싱**: **High Tension** (보스전) → **Catharsis** (정화)
- **레벨 디자인 기법**:
  - **360도 전투**: 원통형의 나무 내부 벽을 타고 오르며 보스와 전투.
  - **시각적 보상**: 보스를 처치하고 정화할 때마다 시꺼먼 내부가 황금빛과 녹색으로 변해가는 실시간 연출.
- **게임플레이**:
  - 세계수에 기생하여 양분을 빨아먹는 '기계 기생충 여왕'과의 전투.
  - 촉수 공격을 회피하며 본체에 정화 화살 꽂기.
  - 엔딩: 세계수가 빛을 되찾으며 숲 전체에 생명의 파동이 퍼져나감.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: The World Tree (세계수)

- **위치**: 맵 정중앙.
- **설명**: 숲 어디서든 보이는 거대한 기둥 같은 나무. 모든 생명력의 원천.
- **기능**: **탐사 허브**. 나무 줄기를 타고 높은 곳으로 올라가 지도를 밝히고 패스트 트래블 가능.
- **비주얼**: 빛나는 황금빛 잎사귀와 뿌리 사이로 흐르는 푸른 에테르 에너지.

### POI 2: Corrupted Spring (오염된 샘)

- **위치**: Zone 1과 2 사이.
- **설명**: 보라색 독극물이 흘러넘쳐 수영할 수 없게 된 샘물.
- **기능**: **섹션 정화 목표**. 이곳을 정화하면 주변 독이 사라지고 수영 및 숏컷 경로 해금.
- **비주얼**: 정화 전(보라색 거품) vs 정화 후(맑은 물과 뛰어노는 물고기)의 극단적 변화.

### POI 3: Sentinel Statues (파수꾼 석상)

- **위치**: 숲 곳곳의 상징적 길목.
- **설명**: 고대 엘프들이 세운 신비로운 거대 석상들.
- **기능**: **세이브 포인트**. 석상을 활성화하면 정령의 가호를 받아 체력 회복 및 장비 교환.
- **비주얼**: 시선을 따라 움직이는 듯한 눈과 이끼 낀 돌 석상에서 뿜어져 나오는 신비한 빛.

### POI 4: The Iron Claw (강철 발톱)

- **위치**: Zone 2 벌목 기지 중앙.
- **설명**: 거대한 살아있는 나무를 움켜쥐고 있는 녹슨 거대 크레인.
- **기능**: **플랫포밍/환경 전투**. 크레인 팔을 타고 잠입하거나, 케이블을 끊어 적을 깔아뭉개는 무기로 활용.
- **비주얼**: 자연의 녹색과 기계의 녹슨 갈색이 흉측하게 얽혀 있는 모습.

### POI 5: Sky-Reach Peak (하늘 도달 봉우리)

- **위치**: 북동쪽 끝 산 정상.
- **설명**: 구름 위로 솟은 가장 높은 바위산. 고대 비행 정령의 둥지가 있음.
- **기능**: **챌린지 및 이동 향상**. 여기서 특별한 활강 능력을 테스트하거나 장거리 글라이딩 시작 가능.
- **비주얼**: 발아래로 끝없이 펼쳐진 수평선과 숲 전체를 조망할 수 있는 아찔한 높이.

## 5. 레벨 디자이너 체크리스트

- [ ] 정화 전후의 환경 변화(색감, BGM, 동물 출현)가 플레이어에게 확실한 성취감을 주는가?
- [ ] 나무 사이를 이동하는 파쿠르/활강 액션이 끊김 없이 매끄러운가 (Flow)?
- [ ] 숲의 밀도가 너무 높아 길을 잃거나 시야를 가리지 않는가?
`,m2=`\uFEFF# S10: The Lost Ranger (잃어버린 레인저)

> **"모험은 용기 있는 자를 사랑한다."**

## 1. 개요 및 목표

- **장르**: **액션 어드벤처 (탐험 + 퍼즐)**
- **주인공**: Lyra Moonwhisper
- **3C 특성**:
  - **Camera**: 3인칭 (등반 시 역동적인 앵글)
  - **Character**: 등반 전문가, 횃불 사용
  - **Controls**: 점프, 매달리기, 그래플링 훅, 퍼즐 상호작용
- **핵심 목표**: 고대 던전에 갇힌 동료 레인저를 구출하고, 함정으로 가득 찬 유적에서 무사히 탈출하라.
- **The Vibe**: 고고학적 발견, 미스터리, 폐소공포증, 신비함. (참고: *Tomb Raider*, *Uncharted*, *Indiana Jones*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Lumina Realm - 지하 깊은 곳에 있는 '잊혀진 왕의 무덤'
- **색상 팔레트**:
  - **주색상**: 스톤 그레이 (#808080) - 차가운 돌벽
  - **보조색**: 토치 오렌지 (#FF4500) - 횃불, 따뜻함, 생명
  - **강조색**: 미스틱 블루 (#00FFFF) - 고대 룬 문자, 마법 장치
- **도형 이론**:
  - **사각형**: 인공적으로 깎은 돌, 방, 문 (문명)
  - **복잡한 기하학**: 바닥의 문양, 퍼즐 장치 (지나친 질서는 함정을 암시)
- **전체 구조**:
  - **Zone 1**: 동굴 입구 (자연 동굴 -> 인공 유적 전환)
  - **Zone 2**: 함정 회랑 (퍼즐 및 피지컬)
  - **Zone 3**: 보물창고/감옥 (탈출 시퀀스)

### 랜드마크 안내

- **Global Landmark**: 지하 공동 천장의 거대한 틈새로 들어오는 한 줄기 빛
- **Local Landmark**:
  - Zone 1: 절벽에 매달린 거대한 해골(거인의 유해)
  - Zone 2: 바닥 전체가 거대한 톱니바퀴로 되어 있는 방
  - Zone 3: 금화가 산처럼 쌓여있는 보물창고의 중앙 제단

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 깊은 곳으로 (Descent)

- **공간**: 지하 동굴 및 유적 입구
- **페이싱**: **Low Tension** (플랫포밍 집중)
- **레벨 디자인 기법**:
  - **아포던스**: 덩굴이 있거나 흰색 페인트가 칠해진 돌출부는 잡을 수 있음을 암시 (Tomb Raider 스타일).
  - **스케일**: 좁은 틈을 지나면 갑자기 거대한 지하 도시가 나타나는 연출 (Wow moment).
- **게임플레이**:
  - 암벽 등반 및 로프 액션으로 지하로 하강.
  - 고대 문자를 해독하여 유적의 닫힌 정문 개방.

### Act 2: 지혜의 시험 (Trial of Wisdom)

- **공간**: 유적 내부의 함정 회랑
- **페이싱**: **Medium Tension** (뇌지컬 + 피지컬)
- **레벨 디자인 기법**:
  - **티칭**: 작은 함정으로 먼저 기믹을 학습시킨 후, 뒤이어 나오는 거대한 치명적 함정에 적용하게 함.
  - **리듬**: 퍼즐(정적) -> 함정 회피(동적) -> 퍼즐(정적)의 반복.
- **게임플레이**:
  - 바닥의 발판을 올바른 순서로 밟아야 화살이 날아오지 않는 퍼즐.
  - 굴러오는 거대한 돌(Boulder)을 피해 전력 질주.
  - 물이 차오르는 방에서 수위를 조절하며 위로 탈출.

### Act 3: 최후의 탈출 (The Escape)

- **공간**: 보물창고 및 무너지는 유적
- **페이싱**: **High Tension** (시간 제한 타임어택)
- **레벨 디자인 기법**:
  - **동적 파괴**: 플레이어가 지나온 길(다리, 기둥)이 무너져 내리며 되돌아갈 수 없게 함.
  - **경로 가시성**: 흔들리는 카메라 속에서도 탈출로(빛, 출구)가 명확히 보여야 함.
- **게임플레이**:
  - 감옥에 갇힌 동료 구출 (부축하며 이동하여 속도 저하 -> 동료 회복 후 함께 달리기).
  - 유적을 지키는 '가디언 골렘'을 처치하지 않고, 함정에 빠뜨려 무력화.
  - 무너지는 유적을 뒤로하고 로프를 타고 지상으로 탈출.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Rune Chamber (룬의 방)

- **위치**: Zone 2 입구.
- **설명**: 벽면 가득 빛나는 고대 룬 문자가 새겨진 원형 석실.
- **기능**: **메인 퍼즐**. 벽화의 내용을 해석하여 방 중앙의 3중 회전 링을 맞춰야 문이 열림.
- **비주얼**: 링을 맞출 때마다 웅장한 기계음과 함께 파란빛이 문자로 번져 나가는 연출.

### POI 2: Echo Canyon (메아리 협곡)

- **위치**: Zone 2 탐험 구역 남쪽.
- **설명**: 소리가 멀리 울려 퍼지며 왜곡되는 신비한 암석 협곡.
- **기능**: **청각 퍼즐**. 특정 방향으로 소리를 반사시켜 보이지 않는 길을 찾아내야 함.
- **비주얼**: 수직으로 깎아지른 사암 절벽 사이로 안개가 소용돌이치는 모습.

### POI 3: The Abyss Bridge (심연의 다리)

- **위치**: Zone 3 입구.
- **설명**: 끝이 보이지 않는 깊은 구멍 위에 놓인, 군데군데 끊어진 좁은 돌다리.
- **기능**: **서스펜스 플랫폼**. 발을 헛디디면 즉사하며, 그래플링 훅을 타이밍에 맞춰 사용해야 함.
- **연출**: 돌 하나를 떨어뜨리면 바닥에 닿는 소리가 한참 뒤에 들리거나 아예 들리지 않음.

### POI 4: Sun Temple ruins (태양 신전 폐허)

- **위치**: Zone 3 최심부.
- **설명**: 지하임에도 불구하고 마법적으로 빛이 들어오는 고대 신전. 동료가 갇힌 곳.
- **기능**: **최종 전투 아레나**. 보스 '골렘'을 물리치고 동료를 구출한 뒤 무너지는 신전을 탈출.
- **비주얼**: 황금색 상형문자와 천장에서 쏟아지는 눈부신 빛의 기둥.

## 5. 레벨 디자이너 체크리스트

- [ ] 등반 가능한 벽과 불가능한 벽의 텍스처 구분이 명확한가?
- [ ] 퍼즐의 힌트가 주변 환경(벽화, 조각상 시선 등)에 자연스럽게 녹아있는가?
- [ ] 탈출 시퀀스에서 카메라 연출이 박진감 넘치면서도 조작을 방해하지 않는가?
`,g2=`\uFEFF# S11: Arcane Academy Crisis (마법 학원 위기)

> **"지식은 힘이다. 통제되지 않는다면 재앙일 뿐."**

## 1. 개요 및 목표

- **장르**: **캐주얼 액션 RPG / 학원물**
- **주인공**: Grimoire (젊은 천재 마법사)
- **3C 특성**:
  - **Camera**: 3인칭 (마법 시전 시 이펙트 강조)
  - **Character**: 원거리 공격, 마나 관리 필수
  - **Controls**: 속성 마법(불, 얼음, 전기) 교체, 텔레포트(회피)
- **핵심 목표**: 마법 학원에서 실험 실패로 폭주하는 원소 정령들을 제압하고, 고립된 학생들을 구해내라.
- **The Vibe**: 마법 학교, 왁자지껄한 혼란, 화려한 이펙트, 신비로움. (참고: *Harry Potter*, *Hogwarts Legacy*, *Little Witch Academia*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Lumina Realm - 명문 마법 학교 'Aetheria Academy'
- **색상 팔레트**:
  - **주색상**: 매직 네이비 (#000080) - 교복, 밤하늘
  - **보조색**: 골드 & 마호가니 - 고풍스러운 가구, 액자 틀
  - **강조색**: 엘리멘탈 컬러 (Red/Blue/Yellow) - 폭주하는 정령들
- **도형 이론**:
  - **나선형**: 마법의 흐름, 탑의 계단 (상승, 에너지)
  - **원형**: 마법진, 안경, 구슬 (신비, 지혜)
- **전체 구조**:
  - **Zone 1**: 학생 기숙사 (구출 미션)
  - **Zone 2**: 공중 도서관 (무중력 퍼즐)
  - **Zone 3**: 대마법사의 첨탑 (보스전)

### 랜드마크 안내

- **Global Landmark**: 학교 중앙 상공에 떠 있는 거대한 마나 수정 (The Great Crystal)
- **Local Landmark**:
  - Zone 1: 기숙사 로비의 말하는 초상화들
  - Zone 2: 책들이 새 떼처럼 날아다니는 도서관 천장
  - Zone 3: 첨탑 꼭대기의 천문대 망원경

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 기숙사 소동 (Dormitory Panic)

- **공간**: 기숙사 복도 및 휴게실
- **페이싱**: **Rising Action** (다수의 약한 적, 빠른 템포)
- **레벨 디자인 기법**:
  - **가이드**: 겁에 질린 학생들이 도망치는 반대 방향이 적이 있는 곳(목표 지점).
  - **환경 상호작용**: 물이 터진 소화전에 전기 마법을 쏘면 광역 스턴 효과.
- **게임플레이**:
  - 작은 불 정령(Imp)들이 가구에 불을 지르는 것을 저지 (얼음 마법).
  - 방에 갇힌 학생들의 문을 열어주고 안전한 곳으로 대피 유도.

### Act 2: 지식의 미로 (Floating Library)

- **공간**: 중력이 뒤틀린 대형 도서관
- **페이싱**: **Medium Tension** (퍼즐 중심)
- **레벨 디자인 기법**:
  - **공간 왜곡(Escher-style)**: 계단을 올라갔는데 아래층으로 나오거나, 벽이 바닥이 되는 비현실적 구조.
  - **움직이는 플랫폼**: 책장들이 계단처럼 스스로 움직여 길을 만듦.
- **게임플레이**:
  - 날아다니는 마도서(Enemy) 제압.
  - 중력을 조작하는 레버를 당겨 천장의 출구로 이동.
  - 은신 마법으로 사서 골렘(강력한 적)의 눈을 피해 이동.

### Act 3: 마나의 폭풍 (Mana Storm)

- **공간**: 대마법사의 첨탑 최상층
- **페이싱**: **High Tension** (보스 디펜스)
- **레벨 디자인 기법**:
  - **중앙 집중형**: 맵 중앙의 '마나 코어'를 지키거나 파괴해야 하는 구도.
  - **환경 변화**: 보스가 속성(불/얼음/전기)을 바꿀 때마다 맵의 바닥 속성도 변함 (장판 피하기).
- **게임플레이**:
  - 보스 '폭주한 소환수(Chimera)'와의 전투.
  - 보스의 속성에 반대되는 마법(불 <-> 얼음)으로 카운터 공격.
  - 마나 과부하로 폭발하려는 코어를 안정화시키는 미니게임 병행.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: The Talking Portrait Hall (초상화 복도)

- **위치**: Zone 1 연결 통로.
- **설명**: 역대 교장들과 위대한 마법사들의 초상화가 가득 걸린 복도.
- **기능**: **정보 제공 및 유니크 상점**. 초상화들이 적의 약점을 알려주거나 특별한 마법 도구 판매.
- **비주얼**: 초상화 속 인물들이 옆 액자로 도망가거나 플레이어에게 물건을 던지는 등 살아있는 듯한 연출.

### POI 2: Alchemy Garden (연금술 정원)

- **위치**: Zone 2 야외 실험장 입구.
- **설명**: 기이한 생물과 마법 식물들이 자라는 거대한 유리 온실.
- **기능**: **회복 및 보급 포인트**. 체력/마나 약초를 채집하거나 임시 마법 소모품 제작.
- **비주얼**: 거대한 식충식물과 일렁이는 투명한 돔 너머로 보이는 뒤틀린 하늘.

### POI 3: Gravity Well (중력 우물)

- **위치**: Zone 2 도서관 정중앙.
- **설명**: 모든 책과 가구가 소용돌이치며 빨려 들어가는 푸른색 블랙홀 구체.
- **기능**: **환경 퍼즐 요소**. 가까이 가면 빨려 들어가 대미지를 입지만, 가벼운 물체는 이를 이용해 고지로 이동 가능.
- **연출**: 물건들이 무중력 상태로 둥둥 떠다니며 불규칙적으로 충돌하는 소리.

### POI 4: The Clocktower (시계탑)

- **위치**: Zone 3 학원 최정상.
- **설명**: 시간을 제어하는 거대한 기어가 맞물려 돌아가는 시계탑 내부 전경.
- **기능**: **최종 보스 아레나**. 시간을 일시적으로 멈추거나 가속하는 기믹을 활용해 보스의 광역 패턴 돌파.
- **비주얼**: 창밖으로 보이는 학원 전경과 끊임없이 째깍거리는 장엄한 기계 장치 소리.

## 5. 레벨 디자이너 체크리스트

- [ ] 마법 이펙트가 화면을 너무 가려 플레이어의 시야를 방해하지 않는가?
- [ ] 속성 상성 관계(불에는 얼음 등)가 튜토리얼을 통해 직관적으로 전달되었는가?
- [ ] 뒤틀린 공간(도서관)에서 플레이어가 길을 잃지 않도록 랜드마크가 배치되었는가?
`,y2=`\uFEFF# S12: The Forbidden Tome (금지된 고서)

> **"어떤 책은 펼쳐서는 안 된다."**

## 1. 개요 및 목표

- **장르**: **어드벤처 / 퍼즐 / 보스전**
- **주인공**: Grimoire (성숙한 탐구자)
- **3C 특성**:
  - **Camera**: 3인칭, 레일(Rail) 카메라 (도주 시)
  - **Character**: 지적임, 고대어 해석 가능
  - **Controls**: 염동력(물체 이동), 방어막(Shield), 빛 마법
- **핵심 목표**: 사막 깊은 곳의 피라미드 유적에 봉인된, 세상을 멸망시킬 수 있는 '금지된 마법서'를 회수하거나 파괴하라.
- **The Vibe**: 이집트풍 판타지, 먼지, 저주, 고대의 공포. (참고: *The Mummy*, *Indiana Jones*, *Aladdin*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Lumina Realm - 끝없는 사막의 '태양의 피라미드' 내부
- **색상 팔레트**:
  - **주색상**: 샌드 골드 (#F4A460) - 사막, 금화
  - **보조색**: 커즈드 그린 (#32CD32) - 저주받은 미라의 안광, 독
  - **강조색**: 로얄 블루 (#4169E1) - 고대 왕족의 장식
- **도형 이론**:
  - **삼각형**: 피라미드, 화살 함정 (날카로움)
  - **사각형**: 미로, 석관 (죽음, 갇힘)
- **전체 구조**:
  - **Zone 1**: 사막 진입로 (모래 폭풍)
  - **Zone 2**: 내부 미로 (변화하는 구조)
  - **Zone 3**: 봉인실 (최종 선택)

### 랜드마크 안내

- **Global Landmark**: 지평선 끝에 우뚝 솟은 거대한 황금 피라미드
- **Local Landmark**:
  - Zone 1: 모래 폭포 (Sandfalls)
  - Zone 2: 거대한 스핑크스 석상 (수수께끼)
  - Zone 3: 공중에 떠 있는 검은 책 (금지된 고서)

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 모래의 장막 (Veil of Sand)

- **공간**: 피라미드 외부 및 입구
- **페이싱**: **Low Tension** (환경 극복)
- **레벨 디자인 기법**:
  - **환경 저항**: 모래 폭풍이 불면 이동 속도가 느려지고 시야가 가려짐. 바람이 멈출 때 이동(Red Light, Green Light).
  - **스케일**: 피라미드 입구의 거대한 문 앞에 선 플레이어의 왜소함 강조.
- **게임플레이**:
  - 입구를 막고 있는 거대한 돌을 염동력으로 치우기.
  - 전갈 몬스터들을 빛 마법으로 퇴치.

### Act 2: 수호자의 미로 (The Labyrinth)

- **공간**: 피라미드 내부
- **페이싱**: **Medium to High** (퍼즐 & 추격)
- **레벨 디자인 기법**:
  - **절차적 느낌**: 방에 들어갈 때마다 벽이 움직여 구조가 바뀜(실제로는 스크립트 된 연출).
  - **추격(Chase)**: 무적 상태인 '스카라베 떼'가 뒤에서 쫓아오고, 앞으로 계속 달려야 하는 구간.
- **게임플레이**:
  - 거울 반사 퍼즐로 빛을 내부 깊은 곳까지 끌어들이기.
  - 미라 수호자들과의 전투 (불 마법이 효과적).
  - 스핑크스의 수수께끼 풀기 (틀리면 전투, 맞추면 보상).

### Act 3: 최후의 선택 (The Choice)

- **공간**: 지하 최심부 봉인실
- **페이싱**: **High Tension** (보스전)
- **레벨 디자인 기법**:
  - **아레나**: 책을 중심으로 4개의 기둥이 있는 원형 방.
  - **딜레마**: 보스전 후 책을 '가질 것인가(힘)', '파괴할 것인가(평화)'를 선택하는 제단 배치.
- **게임플레이**:
  - 보스 '리치(Lich) 사제'와의 마법 대결.
  - 리치가 소환하는 해골 하수인 광역 처리.
  - 엔딩 분기: 책을 집어들면 눈이 초록색으로 변하며 힘을 얻지만 타락(Bad/Power Ending), 파괴하면 유적이 무너지며 탈출(Good Ending).

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Sand Falls (모래 폭포)

- **위치**: Zone 2 연결 공동.
- **설명**: 물 대신 금빛 모래가 천장에서 폭포처럼 쏟아지는 거대한 지하 공간.
- **기능**: **은폐 및 장애물**. 모래 폭포 뒤에 숨겨진 보물 상자를 찾거나, 염동력으로 모래를 가로막아 안전하게 이동.
- **비주얼**: 쏟아지는 모래 사이로 은은하게 반짝이는 보물들과 바닥에 쌓이는 모래 언덕.

### POI 2: Sphinx Library (스핑크스 도서관)

- **위치**: Zone 2 중반부.
- **설명**: 거대한 스핑크스 석상이 문 근처를 지키고 있는 지식의 방.
- **기능**: **수수께끼 퍼즐**. 스핑크스의 질문에 올바르게 답하거나 고대 언어를 해석하여 봉인 해제.
- **비주얼**: 벽면 가득한 상형문자와 고요한 분위기 속에 타오르는 푸른 횃불.

### POI 3: The Golden Labyrinth (황금 미로)

- **위치**: Zone 2 서쪽 구역.
- **설명**: 벽 전체가 금 도금된 복잡한 미로. 주기적으로 벽이 움직이며 구조 변화.
- **기능**: **생존 구역**. 무적 상태인 스카라베 떼를 피해 미로를 돌파해야 하는 타임어택 구간.
- **비주얼**: 눈이 부실 정도로 빛나는 반사광과 벽이 움직일 때 울리는 웅장한 돌 쓸림 소리.

### POI 4: Lich's Sanctum (리치의 성소)

- **위치**: Zone 3 지하 최심부.
- **설명**: 바닥에 금화가 발목까지 차 있고, 중앙에는 검은 오라를 뿜는 고서가 떠 있는 제단.
- **기능**: **최종 보스 아레나**. 금화 더미를 이용해 보스의 발을 묶거나 특정 위치로 유인하여 함정 발동.
- **연출**: 최종 선택에 따라 피라미드가 무너지거나 검은 태양이 떠오르는 극적인 배경 피날레.

## 5. 레벨 디자이너 체크리스트

- [ ] 미로 구간이 너무 복잡하여 플레이어가 좌절하지 않는가? (적절한 랜드마크 배치)
- [ ] 모래 효과(발자국, 흘러내림)가 사실적으로 표현되었는가?
- [ ] 엔딩 선택지에 대한 복선이나 암시가 게임 플레이 중에 충분히 주어졌는가?
`,v2=`\uFEFF# S13: Curse of the Damned (저주받은 자의 저주)

> **"죽음은 축복이다. 다시 깨어나는 것이 저주지."**

## 1. 개요 및 목표

- **장르**: **하드코어 액션 RPG (소울라이크)**
- **주인공**: Cassius (저주받은 불사자)
- **3C 특성**:
  - **Camera**: 무거운 백뷰 (느리고 흔들림), 락온 필수
  - **Character**: 매우 느림, 강인함, 부활 가능(페널티 있음)
  - **Controls**: 강공격(그레이트 소드), 발차기, 패링, 회복 앰플
- **핵심 목표**: 성채 꼭대기에 있는 '가시 마녀'를 찾아내어 자신에게 걸린 불사의 저주를 풀어라.
- **The Vibe**: 절망, 고딕 호러, 회색빛 세상, 묵직한 타격감. (참고: *Dark Souls*, *Blasphemous*, *Castlevania*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Umbra Wastes - 저주받은 계곡과 마녀의 성채 'Thorn Spire'
- **색상 팔레트**:
  - **주색상**: 애쉬 그레이 (#708090) - 모든 것이 불타버린 잿더미
  - **보조색**: 드라이드 블러드 (#800000) - 말라붙은 핏자국
  - **강조색**: 고스트 화이트 (#F8F8FF) - 유령, 영혼의 불꽃
- **도형 이론**:
  - **뾰족한 가시**: 덩굴, 창살, 성탑 (고통, 접근 불가)
  - **무너진 아치**: 과거의 영광, 슬픔
- **전체 구조**:
  - **Zone 1**: 버려진 잿빛 마을 (튜토리얼 및 탐색)
  - **Zone 2**: 가시 덩굴 절벽 (낙사 위험 및 등반)
  - **Zone 3**: 마녀의 성채 상층부 (보스전)

### 랜드마크 안내

- **Global Landmark**: 계곡 어디서든 보이는 기괴하게 뒤틀린 가시나무 성탑
- **Local Landmark**:
  - Zone 1: 마을 광장의 텅 빈 교수대
  - Zone 2: 절벽을 잇는 거대한 몬스터의 뼈 다리
  - Zone 3: 성채 입구의 우는 여인 석상

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 잿더미 속에서 (Ashes to Ashes)

- **공간**: 모든 생명이 말라버린 회색 마을
- **페이싱**: **Low Tension** (음산한 분위기, 탐색)
- **레벨 디자인 기법**:
  - **환경 스토리텔링**: 집집마다 문이 밖에서 못질되어 있음 (전염병/저주 격리 시도).
  - **비선형적 탐색**: 성채로 가는 열쇠를 찾기 위해 마을의 우물, 교회 등을 자유롭게 탐색.
- **게임플레이**:
  - 느릿하지만 공격력이 강한 '망자 농부'들과의 전투 (패링 연습).
  - 마을 곳곳에 나타나는 희미한 유령들의 손짓을 따라 이동.

### Act 2: 가시의 길 (Path of Thorns)

- **공간**: 성채로 향하는 절벽 길
- **페이싱**: **Medium Tension** (낙사 위험, 원거리 견제)
- **레벨 디자인 기법**:
  - **위험 감수(Risk & Reward)**: 넓지만 적이 많은 길 vs 좁고 위험하지만 빠른 지름길(보물 있음).
  - **수직적 레벨**: 위에서 돌을 던지거나 활을 쏘는 해골 병사들을 먼저 처리해야 함.
- **게임플레이**:
  - 움직이는 가시 덩굴 함정(타이밍) 회피.
  - 절벽 중간의 숨겨진 동굴에서 휴식(세이브 포인트).

### Act 3: 마녀의 심판 (Witch's Requiem)

- **공간**: 가시 마녀의 성채 옥상
- **페이싱**: **High Tension** (극한의 난이도)
- **레벨 디자인 기법**:
  - **동적 아레나**: 보스가 가시 덩굴을 소환할 때마다 이동 가능한 공간이 줄어듦.
  - **시각적 압박**: 배경의 거대한 가시들이 플레이어를 향해 조여오는 연출.
- **게임플레이**:
  - 보스 '가시의 마녀 엘리자'와의 전투.
  - 마법탄 반사(패링) 및 덩굴 촉수 절단.
  - 엔딩 전 선택: 마녀를 죽여 저주를 풀고 소멸할 것인가, 마녀의 힘을 흡수해 새로운 마왕이 될 것인가.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: The Forsaken Chapel (버려진 예배당)

- **위치**: Zone 1 마을 광장 북쪽.
- **설명**: 지붕이 반쯤 무너진 고딕 양식의 작은 예배당.
- **기능**: **거점 및 휴식처**. 불을 밝히면 적의 침입을 막는 안전지대가 되며, 캐릭터의 능력을 강화할 수 있음.
- **비주얼**: 부서진 스테인드글라스 사이로 들어오는 희미한 빛과 먼지가 소용돌이치는 정적인 분위기.

### POI 2: Thorn Bridge (가시 다리)

- **위치**: Zone 2와 3을 잇는 아찔한 협곡 사이.
- **설명**: 살아있는 가시 덩굴들이 기괴하게 얽혀 만들어진 천연 교각.
- **기능**: **동적 함정 구간**. 주기적으로 가시가 솟아오르거나 다리가 뒤틀리며, 타이밍을 맞춰 건너지 않으면 추락함.
- **연출**: 다리 아래 까마득한 심연에서 들려오는 과거 희생자들의 비명 소리와 짙은 안개.

### POI 3: Gravekeeper's Hut (무덤지기의 오두막)

- **위치**: Zone 2 절벽 중간의 숨겨진 분기점.
- **설명**: 시체 썩는 냄새와 말린 약초 냄새가 진동하는 작은 판잣집.
- **기능**: **환경 상호작용 및 NPC**. 저주를 잠시 억제하는 성수를 얻거나, 적들의 약점에 대한 정보를 구매 가능.
- **비주얼**: 문 밖에 걸린 수많은 부적과 내부의 어지러운 고문 도구들.

### POI 4: The Silent Bell (침묵의 종)

- **위치**: Zone 3 성채 입구 거대 종탑.
- **설명**: 혀가 뽑혀 소리가 나지 않는 거대한 청동 종.
- **기능**: **숏컷 해금 기믹**. 종을 강하게 타격하면 진동으로 성채 아래층의 거대 철문이 열리며 시작 마을과 연결됨.
- **연출**: 종을 때릴 때 발생하는 시각적인 음파 효과가 주변의 가시들을 잠시 움츠러들게 함.

## 5. 레벨 디자이너 체크리스트

- [ ] 공격 동작의 선딜레이/후딜레이가 확실하여 전투의 무게감이 느껴지는가?
- [ ] 낙사 구간에서 플레이어가 떨어질 때 억울하지 않도록 바닥 판정이 명확한가?
- [ ] 보스의 텔레포트 이동 시 시각적 이펙트(잔상)가 플레이어의 시선을 잘 유도하는가?
`,x2=`\uFEFF# S14: Revenge of the Fallen (타락한 자의 복수)

> **"왕관의 무게보다 내 대검이 더 무겁다."**

## 1. 개요 및 목표

- **장르**: **핵 앤 슬래시 액션 RPG**
- **주인공**: Cassius (광전사 모드)
- **3C 특성**:
  - **Camera**: 백뷰 (다수의 적을 볼 수 있게 약간 멀리)
  - **Character**: 다수 전투 특화, 처형 모션
  - **Controls**: 광역 베기, 돌진, 처형(체력 회복), 분노 모드
- **핵심 목표**: 자신을 토사구팽한 타락한 왕을 찾아 왕궁으로 쳐들어가 그를 처단하라.
- **The Vibe**: 피비린내, 분노, 파괴, 다크 판타지 복수극. (참고: *Berserk*, *God of War*, *Middle-earth: Shadow of War*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Umbra Wastes - 오염된 왕성 'Capital of Regret'
- **색상 팔레트**:
  - **주색상**: 로얄 퍼플 (#4B0082) - 타락한 왕권, 오염된 휘장
  - **보조색**: 더티 골드 (#B8860B) - 빛바랜 영광
  - **강조색**: 프레시 블러드 (#FF0000) - 처형 시 튀는 피, 분노 게이지
- **도형 이론**:
  - **직사각형**: 거대한 성벽, 기둥 (권위, 압도감)
  - **파편**: 깨진 스테인드글라스, 무너진 동상 (몰락)
- **전체 구조**:
  - **Zone 1**: 왕국 하수구 (잠입 및 진입)
  - **Zone 2**: 왕실 정원 (중보스전)
  - **Zone 3**: 알현실 (최종 결전)

### 랜드마크 안내

- **Global Landmark**: 도시 중앙의 왕궁 돔 (꼭대기에서 검은 액체가 흘러내림)
- **Local Landmark**:
  - Zone 1: 하수구 끝의 거대한 철창 배수구
  - Zone 2: 말라죽은 흰색 나무 (White Tree)
  - Zone 3: 옥좌 뒤의 깨진 거울 벽

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 쥐새끼처럼 (The Sewer)

- **공간**: 왕성 지하 하수구
- **페이싱**: **Low to Rising** (더러움, 분노 축적)
- **레벨 디자인 기법**:
  - **디나이얼(Denial)**: 정문은 경비가 너무 삼엄해 진입 불가. 더러운 하수구로 우회하며 복수심 고취.
  - **폐쇄성**: 좁고 어두운 터널에서 갑자기 튀어나오는 '오물 괴물'들과 근접 난타전.
- **게임플레이**:
  - 하수구의 밸브를 돌려 수위를 낮추고 길을 만듦.
  - 부패한 시체들 사이에서 열쇠 획득.

### Act 2: 정원의 살육 (Garden of Blood)

- **공간**: 왕실 정원
- **페이싱**: **Medium Tension** (다대일 전투)
- **레벨 디자인 기법**:
  - **아레나**: 넓은 정원 광장에서 벌어지는 웨이브 전투.
  - **시각적 대비**: 고요하고 아름다운 정원이 플레이어의 칼질로 붉게 물들어가는 실시간 변화.
- **게임플레이**:
  - 타락한 근위대(중갑병)와의 전투. 방패병은 발차기로 가드 브레이크.
  - 정원사 골렘(중보스) 처치.
  - 처형 액션을 통해 체력을 회복하며 버티기.

### Act 3: 왕의 몰락 (King's Fall)

- **공간**: 화려하지만 기괴한 알현실
- **페이싱**: **High Tension** (보스전, 파괴)
- **레벨 디자인 기법**:
  - **환경 파괴**: 보스와 플레이어의 공격으로 기둥이 무너지고 샹들리에가 떨어짐.
  - **다층 구조**: 보스가 2층 발코니로 도망가면 기둥을 타고 쫓아가야 함.
- **게임플레이**:
  - 괴물로 변이한 왕과의 결투.
  - 왕이 소환하는 환영(과거의 동료들) 베어버리기.
  - QTE로 왕의 목을 베고 왕좌에 앉는 엔딩 (허무함 강조).

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Hall of Mirrors (거울의 복도)

- **위치**: Zone 2와 3 사이 왕실 통로.
- **설명**: 양옆에 거대한 거울 면들이 가득한 긴 복도.
- **기능**: **심리적 연출 및 전투**. 거울에 비진 Cassius의 모습이 괴물처럼 변하는 연출을 통해 내면의 타락을 암시.
- **이벤트**: 거울 속에서 튀어나오는 암살자 분신들과의 1:다 난전 발생.

### POI 2: Royal Armory (왕실 무기고)

- **위치**: Zone 2 북쪽 구역.
- **설명**: 왕국의 온갖 병기들이 진열된 거대한 방.
- **기능**: **장비 강화 및 미니보스**. 무기고를 지키는 집사 로봇을 물리치고 대검의 파괴력을 높이는 일시적인 버프 아이템 획득.
- **비주얼**: 차가운 금속 광택과 전시된 수천 자루의 검들이 만드는 위압적인 풍경.

### POI 3: The Blood-soaked Statues (피에 젖은 동상들)

- **위치**: Zone 2 정원 중앙.
- **설명**: 역대 왕들의 동상이지만, 눈에서 붉은 액체가 끊임없이 흘러내림.
- **기능**: **환경 파괴 오브젝트**. 적들을 동상 근처로 유인해 동상을 파괴하면 광역 충격파로 적들을 한꺼번에 일소 가능.
- **연출**: 동상이 부서질 때 쏟아지는 피와 파편의 화려한 이펙트.

### POI 4: The Falling Throne (무너지는 왕좌)

- **위치**: Zone 3 최종 보스 아레나.
- **설명**: 보스의 광기에 의해 공중에 떠 있는 것처럼 보이지만, 전투가 진행될수록 바닥이 무너져 내리는 옥좌 기록실.
- **기능**: **동적 아레나 변화**. 마지막 페이즈에서는 좁아진 발판 위에서 보스의 낙사 유도 공격을 피하며 싸워야 함.
- **비주얼**: 발아래로 보이는 불타는 수도 전경과 무너져 내리는 화려한 천장 구조물들.

## 5. 레벨 디자이너 체크리스트

- [ ] 다수의 적을 베어 넘길 때의 역경직(Hit stop)이 타격감을 충분히 주는가?
- [ ] 처형 액션(Finisher) 카메라 연출이 주변 지형지물에 가리지 않고 잘 보이는가?
- [ ] 하수구 구간이 너무 길거나 지루하여 플레이어의 텐션을 떨어뜨리지 않는가?
`,w2=`\uFEFF# S15: Blood Moon Ritual (블러드 문 의식)

> **"피는 생명이자 권능이니, 달이 찰 때 바치라."**

## 1. 개요 및 목표

- **장르**: **디펜스 액션 RPG**
- **주인공**: Morgana (네크로맨서)
- **3C 특성**:
  - **Camera**: 3인칭 (평소), 탑뷰 (소환/설치 시)
  - **Character**: 약한 본체, 강력한 소환수
  - **Controls**: 시체 부활, 뼈 감옥 설치, 피 흡수, 소환수 명령
- **핵심 목표**: 붉은 달이 뜬 밤, 몰려오는 성기사단으로부터 '검은 제단'을 지키며 금지된 소환 의식을 완성하라.
- **The Vibe**: 오컬트, 의식적인 공포, 호러 디펜스, 피의 미학. (참고: *Diablo IV* (Necromancer), *Path of Exile*, *Cult of the Lamb*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Umbra Wastes - 고대 공동묘지 'Grave of Saints'
- **색상 팔레트**:
  - **주색상**: 블러드 레드 (#8B0000) - 붉은 달빛, 피 웅덩이
  - **보조색**: 본 화이트 (#F5F5DC) - 해골, 묘비
  - **강조색**: 섀도우 블랙 (#000000) - 소환수의 그림자
- **도형 이론**:
  - **원형**: 마법진, 붉은 달 (중심, 집중)
  - **십자가**: 묘비, 성기사단의 문양 (대립하는 질서)
- **전체 구조**:
  - **Zone 1**: 공동묘지 외곽 (자원 확보 - 시체 수집)
  - **Zone 2**: 지하 묘지 (호위 및 이동)
  - **Zone 3**: 피의 제단 (최종 디펜스)

### 랜드마크 안내

- **Global Landmark**: 밤하늘을 가득 채운 거대하고 불길한 붉은 달 (Blood Moon)
- **Local Landmark**:
  - Zone 1: 날개 부러진 천사상
  - Zone 2: 해골로 벽이 만들어진 카타콤(Catacombs)
  - Zone 3: 붉은 기둥 4개가 서 있는 검은 제단

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 재료 수집 (Gathering the Tithi)

- **공간**: 안개 낀 공동묘지
- **페이싱**: **Low Tension** (파밍, 준비)
- **레벨 디자인 기법**:
  - **자원 배치**: 더 강한 시체(예: 오우거 유해)는 구하기 힘든 위치나 강력한 몬스터 근처에 배치.
  - **분위기**: 까마귀 소리, 바람 소리 등으로 을씨년스러운 분위기 조성.
- **게임플레이**:
  - 무덤을 파헤쳐 해골 병사, 좀비, 스켈레톤 메이지 소환.
  - 소환수를 이끌고 제단으로 이동할 준비.

### Act 2: 순례자의 길 (The Pilgrimage)

- **공간**: 지하 묘지 (카타콤)
- **페이싱**: **Medium Tension** (호위, 매복)
- **레벨 디자인 기법**:
  - **깔때기 구조(Funneling)**: 적들이 좁은 통로로 몰려오게 하여 광역 마법 효율 극대화.
  - **조명 연출**: 성기사단이 나타날 때 밝은 빛(성광)이 비치며 눈부심 유발 (악당 시점 경험).
- **게임플레이**:
  - 이동하는 소환수 무리(호위 대상)를 보호.
  - 성기사단의 매복 기습 방어.
  - 뼈 감옥 마법으로 적의 진로 차단.

### Act 3: 붉은 밤 (The Red Night)

- **공간**: 언덕 위의 피의 제단
- **페이싱**: **High Tension** (웨이브 디펜스)
- **레벨 디자인 기법**:
  - **거점 방어**: 중앙 제단을 중심으로 360도에서 적이 몰려옴.
  - **환경 보너스**: 달빛이 가장 강하게 비치는 구역에 있으면 마나 회복 속도 증가.
- **게임플레이**:
  - 의식 진행률(%)이 100이 될 때까지 버티기.
  - 소환수 재소환 및 배치 전략 (근거리 탱커, 원거리 딜러).
  - 보스 '성기사 단장' 등장 시, 완성된 의식으로 고대 악마(아바타)를 소환해 역관광.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Ancient Graveyard (고대 묘지)

- **위치**: Zone 1 외곽 전역.
- **설명**: 이름 없는 비석들이 끝없이 펼쳐진 안개 낀 죽음의 언덕.
- **기능**: **자원 보급 기지**. 지면 아래에 묻힌 강력한 기사들의 시체를 부활시켜 정예 언데드 부대를 구성할 수 있는 구역.
- **비주얼**: 플레이어가 지나갈 때마다 땅 밑에서 손들이 불쑥불쑥 솟아오르는 기괴한 연출.

### POI 2: Bone Spire (뼈의 첨탑)

- **위치**: Zone 3 제단 주변 4개 지점.
- **설명**: 인간의 해골을 쌓아 올린 불길한 기둥.
- **기능**: **전술적 타워**. 첨탑을 활성화하면 주변 적들에게 원거리 뼈 화살을 쏘거나, 아군 소환수에게 회복 오라를 제공함.
- **비주얼**: 첨탑 꼭대기에서 타오르는 차가운 보라색 영혼 불꽃.

### POI 3: The Whispering Catacombs (속삭이는 카타콤)

- **위치**: Zone 2 연결 통로 속 숨겨진 지하실.
- **설명**: 과거 성자들의 유해가 안치된 곳이었으나 현재는 소환 마법을 증폭시키는 암흑 에너지가 가득함.
- **기능**: **전략적 우회로**. 이곳을 점령하면 적 병력의 측면을 기습할 수 있는 고지대로 연결됨.
- **비주얼**: 벽면 가득 쌓인 두개골들이 플레이어가 지나갈 때마다 수군거리는 소리 연출.

### POI 4: Blood Altar (피의 제단)

- **위치**: 맵 정점의 언덕 꼭대기.
- **설명**: 기하학적인 홈이 파인 거대한 검은 돌 제단. 홈을 따라 붉은 피가 모여드는 형상.
- **기능**: **최종 방어 목표**. 제단의 피가 가득 찰 때까지 적의 파상공세를 막아내야 함. 제단 체력이 낮아지면 강력한 충격파 발동 가능.
- **연출**: 의식 진행도에 따라 밤하늘의 붉은 달이 점점 커지며 지면을 피로 물들이는 장관.

## 5. 레벨 디자이너 체크리스트

- [ ] 다수의 소환수(AI)가 길을 막거나 멍청하게 행동하지 않는가? (군집 AI 체크)
- [ ] 적의 성스러운 빛 효과가 너무 눈부셔(Bloom) 피아식별을 방해하지 않는가?
- [ ] '악당'이 되어 '선인'을 학살하는 컨셉의 불쾌함/통쾌함 밸런스가 적절한가?
`,S2=`\uFEFF# S16: The Necromancer Queen (네크로맨서 여왕)

> **"왕관을 쓰려는 자, 군대를 일으켜라. 산 자든 죽은 자든."**

## 1. 개요 및 목표

- **장르**: **전략 액션 RPG (부대 지휘 + 공성)**
- **주인공**: Morgana (여왕 모드)
- **3C 특성**:
  - **Camera**: 탑뷰에 가까운 쿼터뷰 (전장 파악 용이)
  - **Character**: 지휘관, 광역 버프/디버프
  - **Controls**: 부대 지정, 이동 명령, 공성 병기 소환
- **핵심 목표**: 적대적인 인간 왕국의 요새를 언데드 군단으로 함락시키고 옥좌를 차지하라.
- **The Vibe**: 정복, 압도적인 물량, 다크 판타지 전쟁. (참고: *Overlord*, *Warcraft III* (Undead campaign), *Kingdom Under Fire*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Umbra Wastes - 인간 왕국 요새 'Fortress of Dawn'
- **색상 팔레트**:
  - **주색상**: 스톤 그레이 (#808080) - 견고한 성벽
  - **보조색**: 네크로 그린 (#32CD32) - 언데드 역병, 독구름
  - **강조색**: 파이어 오렌지 (#FF4500) - 불타는 타워, 공성전
- **도형 이론**:
  - **사각형/직선**: 인간들의 질서 정연한 진형과 성벽.
  - **무질서한 점**: 성벽을 기어오르는 언데드 군단 (혼돈).
- **전체 구조**:
  - **Zone 1**: 전초기지 및 마을 (병력 증식)
  - **Zone 2**: 성문 앞 (공성전)
  - **Zone 3**: 왕좌의 방 (점령전)

### 랜드마크 안내

- **Global Landmark**: 산 중턱에 위치한 거대한 요새 (Fortress)
- **Local Landmark**:
  - Zone 1: 불타는 풍차와 농가
  - Zone 2: 굳게 닫힌 강철 성문 (The Iron Gate)
  - Zone 3: 스테인드글라스로 빛이 들어오는 왕좌

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 공포의 확산 (Spread the Plague)

- **공간**: 성 밖의 마을
- **페이싱**: **Rolling Snowball** (점차 커지는 규모)
- **레벨 디자인 기법**:
  - **스노우볼링**: 처치한 적(마을 주민, 경비병)이 즉시 아군 언데드로 부활하여 군단에 합류.
  - **학습**: 부대 종류별 상성 학습 (보병 < 궁병 < 기병).
- **게임플레이**:
  - 마을을 습격하여 아군 수 늘리기.
  - 경종을 울리려는 전령을 저지하여 지원군 차단.

### Act 2: 성벽을 무너뜨려라 (Break the Wall)

- **공간**: 요새 정문 앞
- **페이싱**: **High Tension** (대규모 공성)
- **레벨 디자인 기법**:
  - **오브젝트 중심**: 성문이나 성벽 같은 거대 구조물 파괴가 목표.
  - **환경 위험**: 성벽 위에서 쏟아지는 화살비와 끓는 기름.
- **게임플레이**:
  - 거대 언데드 괴수(Abomination)를 소환하여 성문 타격.
  - 시체로 만든 공성탑(Siege Tower)을 성벽에 붙여 병력 투입.
  - 성벽 위의 궁병들을 독구름 마법으로 제압.

### Act 3: 왕좌의 주인 (Fit for a Queen)

- **공간**: 요새 내부 및 왕좌의 방
- **페이싱**: **Medium to High** (실내 난전)
- **레벨 디자인 기법**:
  - **지형 활용**: 좁은 복도와 계단 지형을 이용해 적의 기병 돌격 차단.
  - **보스 아레나**: 왕좌 앞의 붉은 카펫이 깔린 긴 홀.
- **게임플레이**:
  - 최후의 저항을 하는 왕실 근위대 제압.
  - 왕(보스)과의 전투. 왕은 성기사들을 계속 소환함.
  - 왕을 처치하고 왕좌에 앉아 언데드화된 왕국을 내려다보는 엔딩.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Siege Workshop (공성 작업실)

- **위치**: Zone 1과 2 사이의 점령지.
- **설명**: 아군 언데드들이 포획한 공성 병기들을 네크로맨서의 마력으로 개조하는 곳.
- **기능**: **유닛 강화 허브**. 여기서 '시체 공성탑'이나 '폭발 좀비'의 내구도와 공격력을 업그레이드 가능.
- **비주얼**: 거대한 뼈 기어들이 맞물려 돌아가며 내뿜는 초록색 증기와 망치질 소리.

### POI 2: Siege Tower (시체 공성탑)

- **위치**: Zone 2 공성전의 핵심 전력.
- **설명**: 뼈와 썩은 살점들이 뭉쳐진 끔찍한 이동형 공성 구조물.
- **기능**: **수직 이동 및 방어막**. 아군 병력을 성벽 위로 투입하는 유일한 수단이자, 주변 병력에게 원거리 저항 오라 제공.
- **비주얼**: 탑을 지탱하는 수많은 언데드들의 팔들이 꿈틀거리며 전진하는 혐오스러운 연출.

### POI 3: The Defiled Sanctuary (더럽혀진 성소)

- **위치**: Zone 3 입구.
- **설명**: 한때 인간 왕국의 자부심이었던 성소였으나, 현재는 역병 코어가 박혀 오염됨.
- **기능**: **전술적 버프 지점**. 이곳을 유지할 경우 아군 언데드의 부활 속도가 2배 빨라짐.
- **비주얼**: 깨진 천사상 중심에 박힌 거대한 고동치는 심장 같은 유기체.

### POI 4: The Fallen Flag (쓰러진 깃발)

- **위치**: Zone 3 왕좌의 방 입구 광장.
- **설명**: 진흙탕 속에 찢기고 짓밟힌 채 박혀 있는 인간 왕국의 금색 휘장.
- **기능**: **최종 리스폰 포인트 및 사기 고취**. 이곳에 아군 깃발을 꽂으면 적군의 방어력이 감소하고 아군의 공격 속도가 대폭 상승함.
- **연출**: 깃발이 바뀌는 순간 도시 전체에 언데드의 승리를 알리는 불길한 함성이 울려 퍼짐.

## 5. 레벨 디자이너 체크리스트

- [ ] 수십~수백 유닛이 한 화면에 나올 때 프레임 드랍이 없는가? (최적화)
- [ ] 플레이어의 광역 마법이 아군 언데드에게도 피해를 주는지(Friendly Fire) 명확한가?
- [ ] 공성전의 현장감(함성 소리, 폭발음, 진동)이 충분히 전달되는가?
`,k2=`\uFEFF# S17: Shadow Blade (그림자 칼날)

> **"빛이 닿지 않는 곳에 죽음이 있다."**

## 1. 개요 및 목표

- **장르**: **잠입 액션 (Stealth Action)**
- **주인공**: Thorne (암살자)
- **3C 특성**:
  - **Camera**: 3인칭 (자유로운 회전), 벽 등반 시 앵글 변화
  - **Character**: 매우 빠름, 소리 없음, 벽타기
  - **Controls**: 암살(원킬), 그림자 이동(순간이동), 단검 투척
- **핵심 목표**: 경비가 삼엄한 암흑 길드 요새에 침투하여, 배신자 길드 마스터를 암살하고 증거를 확보해 탈출하라.
- **The Vibe**: 긴장감, 조용한 살인, 그림자 놀이. (참고: *Dishonored*, *Hitman*, *Tenchu*, *Thief*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Umbra Wastes - 절벽 위에 세워진 'Shadow Guild Fortress'
- **색상 팔레트**:
  - **주색상**: 섀도우 블랙 (#000000) - 어두운 그림자, 은신처
  - **보조색**: 토치 옐로우 (#FFA500) - 횃불, 경비병의 시야
  - **강조색**: 스틸 블루 (#4682B4) - 달빛, 금속의 차가움
- **도형 이론**:
  - **날카로운 삼각형**: 단검, 가시 함정, 첨탑 (위험, 예리함)
  - **어둠의 면**: 플레이어가 숨을 수 있는 안전지대
- **전체 구조**:
  - **Zone 1**: 요새 외곽 절벽 (침투 루트 탐색)
  - **Zone 2**: 병영 및 내부 복도 (본격적인 잠입)
  - **Zone 3**: 마스터의 방 (암살)

### 랜드마크 안내

- **Global Landmark**: 절벽 끝에 위태롭게 서 있는 검은 요새의 첨탑
- **Local Landmark**:
  - Zone 1: 절벽 아래로 흐르는 검은 강
  - Zone 2: 훈련장의 허수아비들
  - Zone 3: 마스터의 방 천장에 달린 거대한 샹들리에

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 그림자 속으로 (Into the Shadows)

- **공간**: 요새 외곽 절벽 및 성벽
- **페이싱**: **Low Tension** (루트 개척)
- **레벨 디자인 기법**:
  - **다양한 루트(Open-Ended)**: 정문(어려움), 하수구(더러움), 성벽 등반(위험함) 등 3가지 이상의 진입로 제공.
  - **수직성**: '그림자 도약(Shadow Blink)' 스킬을 이용해 높은 곳으로 순간이동.
- **게임플레이**:
  - 순찰 중인 경비병들의 패턴 파악 및 마킹.
  - 성벽의 그림자를 밟고 이동하며 감시탑 무력화.

### Act 2: 보이지 않는 위협 (Ghost in the Fortress)

- **공간**: 요새 내부 복도와 병영
- **페이싱**: **Rising Action** (퍼즐형 스텔스)
- **레벨 디자인 기법**:
  - **빛과 어둠**: 횃불을 물 화살로 꺼서 어둠을 만들고, 적을 유인하여 처리.
  - **청각 플레이**: 바닥재(카펫 vs 나무)에 따른 발소리 차이 이용.
- **게임플레이**:
  - 열쇠를 가진 간부 소매치기.
  - 시체를 숨겨 발각되지 않게 관리.
  - 샹들리에를 떨어뜨려 적들을 사고사로 위장 처리.

### Act 3: 최후의 일격 (The Assassination)

- **공간**: 길드 마스터의 집무실
- **페이싱**: **High Tension** (암살 실행 및 탈출)
- **레벨 디자인 기법**:
  - **샌드박스 암살**: 마스터가 독이 든 술을 마시게 하거나, 발코니에서 밀거나, 정면 대결하는 등 다양한 방법 제공.
  - **탈출 시퀀스**: 암살 후 요새 전체에 경보가 울리며, 들어올 때와는 다른 긴박한 탈출로(예: 짚라인) 제공.
- **게임플레이**:
  - 마스터의 방에 잠입하여 기회를 엿봄.
  - 암살 수행 (컷신 연출).
  - 추격하는 경비병들을 연막탄과 함정으로 따돌리고 요새 고공 낙하로 탈출.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: The Watchtower (감시탑)

- **위치**: Zone 1 요새 외곽 모서리 고지대.
- **설명**: 밤낮없이 요새 주변을 훑는 강력한 마법 서치라이트가 설치된 탑.
- **기능**: **전략적 선결 목표**. 감시병을 암살하고 라이트를 끄면 요새 전체의 발각 범위가 대폭 감소하여 침투가 훨씬 수월해짐.
- **비주얼**: 구름 사이로 비치는 달빛보다 더 강렬하게 회전하는 황금색 빛 기둥.

### POI 2: The Secret Archives (비밀 기록실)

- **위치**: Zone 2 도서관 구석의 숨겨진 방.
- **설명**: 길드의 배신 증거와 마스터의 약점이 기록된 일기장들이 보관된 곳.
- **기능**: **부가 목표 및 힌트 획득**. 마스터의 암살 방식(예: 독술병 위치)에 대한 구체적인 힌트를 주어 공략 다양성 제공.
- **비주얼**: 먼지 쌓인 책들 사이에서 혼자 파랗게 빛나는 마법 봉인 문서함.

### POI 3: Shadow Corridor (그림자 복도)

- **위치**: Zone 2 중앙 통로 내부.
- **설명**: 창문이 없고 횃불조차 닿지 않는 완벽한 암폭이 유지되는 긴 지하 회랑.
- **기능**: **특수 능력 강화 구역**. 이곳에서는 Thorne의 '그림자 도약' 쿨타임이 사라져, 보이지 않는 속도로 다수의 경비를 연속 처치하는 쾌감 제공.
- **연출**: 이동할 때마다 검은 연기가 흩날리고, 적들이 비명도 지르지 못하고 쓰러지는 섬뜩한 분위기.

### POI 4: The Trapped Vault (함정 보관고)

- **위치**: Zone 3 마스터의 방 뒤편.
- **설명**: 온갖 기계 함정과 마법 덫으로 보호받는 길드의 보물창고.
- **기능**: **챌린지 및 탈출로**. 함정을 정교하게 해체하며 통과하면 희귀 전설 단검을 얻거나 요새 외부로 연결된 탈출용 짚라인을 이용 가능.
- **비주얼**: 바닥과 벽면에 설치된 수십 개의 칼날 장치와 감지 레이저.

## 5. 레벨 디자이너 체크리스트

- [ ] 경비병의 AI 상태(평온/의심/발각)가 UI나 소리로 명확히 피드백되는가?
- [ ] '그림자 이동'이 가능한 지점과 불가능한 지점이 시각적으로 구분되는가?
- [ ] 암살 실패 시(발각 시) 강제 종료가 아니라 전투로 풀어나갈 여지(Improvise)가 있는가?
`,_2=`\uFEFF# S18: Outcast's Redemption (추방자의 구원)

> **"죄는 피로 씻을 수 없지만, 생명으로 갚을 수는 있다."**

## 1. 개요 및 목표

- **장르**: **호위 / 탈출 액션**
- **주인공**: Thorne (보호자 모드)
- **3C 특성**:
  - **Camera**: 3인칭 (주변 상황 파악 용이)
  - **Character**: 호위 대상 챙기기, 함정 해체 전문
  - **Controls**: 손잡기/업기, 함정 설치, 적 유인, 길 지시
- **핵심 목표**: 길드 감옥에 갇힌 어린 고아들을 구출하여, 추격자들을 따돌리고 안전한 지하 수로를 통해 탈출하라.
- **The Vibe**: 절박함, 보호 본능, 쫓고 쫓기는 추격전. (참고: *A Plague Tale: Innocence*, *The Last of Us* (Ellie part), *The Promised Neverland*)

## 2. 공간 및 환경 (World & Environment)

- **배경**: Umbra Wastes - 길드 지하 감옥 및 미로 같은 수로
- **색상 팔레트**:
  - **주색상**: 프리즌 그린 (#556B2F) - 이끼 낀 감옥 벽
  - **보조색**: 워터 블루 (#00CED1) - 지하 수로의 물
  - **강조색**: 러스티 브라운 (#8B4513) - 녹슨 철창, 쥐
- **도형 이론**:
  - **철창/격자**: 구속, 갇힘
  - **미로**: 혼란, 출구를 알 수 없음
- **전체 구조**:
  - **Zone 1**: 지하 감옥 (열쇠 확보 및 구출)
  - **Zone 2**: 지하 미로 수로 (추격전 및 은신)
  - **Zone 3**: 수문 출구 (최후의 저항)

### 랜드마크 안내

- **Global Landmark**: 천장의 하수구 구멍에서 떨어지는 빛줄기 (탈출구 암시)
- **Local Landmark**:
  - Zone 1: 감옥 중앙의 고문 기구 'The Rack'
  - Zone 2: 거대한 회전 물레방아
  - Zone 3: 굳게 닫힌 거대 수문

## 3. 상세 레벨 흐름 (Level Flow)

### Act 1: 족쇄를 풀고 (Unchained)

- **공간**: 지하 감옥 구역
- **페이싱**: **Low to Medium** (은밀한 행동)
- **레벨 디자인 기법**:
  - **비대칭 정보**: 플레이어는 적의 위치를 알지만, 아이들은 모름. 아이들을 안전한 곳에 대기시키고 정찰.
  - **협력 퍼즐**: 작은 아이만 통과할 수 있는 개구멍으로 아이를 보내 반대편에서 문을 열게 함.
- **게임플레이**:
  - 졸고 있는 간수의 허리춤에서 열쇠 획득.
  - 아이들을 감방에서 꺼내고 조용히 이동하는 법 가르치기(따라와/멈춰 명령).

### Act 2: 물과 쥐 (Water and Rats)

- **공간**: 복잡한 지하 수로
- **페이싱**: **High Tension** (추격)
- **레벨 디자인 기법**:
  - **동적 장애물**: 수위가 주기적으로 변하며 이동 가능한 경로가 바뀜.
  - **추격자(Pursuer)**: '사냥개'를 푼 추격대가 냄새를 맡고 계속 따라옴. 함정을 설치해 속도 늦추기.
- **게임플레이**:
  - 아이들을 안고 깊은 물 건너기.
  - 뒤따라오는 적들을 위해 바닥에 마름쇠(Caltrops)나 독 덫 설치.
  - 횃불로 쥐 떼를 쫓아내며 길 만들기.

### Act 3: 빛을 향해 (Towards the Light)

- **공간**: 수로의 끝, 거대 수문 앞
- **페이싱**: **Climax** (디펜스)
- **레벨 디자인 기법**:
  - **시간 압박**: 수문이 열리는 데 걸리는 시간(예: 3분) 동안 버쳐야 함.
  - **지형 활용**: 수문 앞의 좁은 다리 위에서 적들을 밀어내어 물에 빠뜨림.
- **게임플레이**:
  - 아이들이 수문 장치를 돌리는 동안 Thorne은 적들을 막아냄.
  - 몰려오는 추격대장과의 전투.
  - 문이 열리자마자 쏟아지는 빛 속으로 뛰어드는 감동적인 엔딩.

## 4. 주요 POI (Points of Interest) 상세

### POI 1: Guild Prism (감시 수정)

- **위치**: Zone 1 감옥 중앙 천장.
- **설명**: 360도 회전하며 비침입자를 탐지하는 거대한 붉은색 마법 안구.
- **기능**: **발각 요소 및 퍼즐**. 수정의 시선을 피해 아이들을 이동시켜야 하며, 주변 물건을 던져 시선을 돌리거나 파괴 가능.
- **비주얼**: 수정이 플레이어를 포착했을 때 기괴한 효과음과 함께 화면 전체가 붉은 경고색으로 변함.

### POI 2: The Sunken Library (침수된 도서관)

- **위치**: Zone 2 지하 수로 시작 지점.
- **설명**: 지하 수로의 범람으로 인해 반쯤 물에 잠긴 옛 도서관 유적.
- **기능**: **협력 퍼즐 구역**. 높은 곳에 있는 레버를 당기기 위해 아이들을 어깨 위로 올려보내거나, 떠다니는 책장을 징검다리로 활용.
- **비주얼**: 물 위에 둥둥 떠다니는 수천 권의 책과 푸른색 발광 이끼들.

### POI 3: The Hidden Sump (숨겨진 정수조)

- **위치**: Zone 2 중반부 비밀 공간.
- **설명**: 폐기물들이 모이는 곳이지만, 한때 추방자들이 숨어 지냈던 거점이 남아 있는 곳.
- **기능**: **안전 가옥 및 정비**. 추격대를 따돌리고 잠시 휴식하며 아이들의 상태(건강, 공포도)를 회복시키는 체크포인트.
- **비주얼**: 낡은 침대와 따뜻한 모닥불 느낌의 마법 램프가 주는 안도감.

### POI 4: The Water Gate (거대 수문)

- **위치**: Zone 3 탈출로의 끝.
- **설명**: 수천 톤의 지하수를 막고 있는 육중한 강철 수문.
- **기능**: **최종 방어 지점**. 수문 장치를 돌려 문을 여는 동안 몰려오는 적들로부터 아이들을 지키는 디펜스 아레나.
- **연출**: 문이 서서히 열리며 쏟아지는 물줄기와 그 너머로 보이는 눈부신 지상의 빛.

## 5. 레벨 디자이너 체크리스트

- [ ] 아이들(NPC)의 AI가 플레이어의 이동을 방해하거나 길을 못 찾지는 않는가?
- [ ] '호위 미션' 특유의 답답함을 줄이기 위해 아이들이 도움이 되는 순간(퍼즐 해결, 탄약 발견)이 있는가?
- [ ] 함정 설치가 전략적으로 유효하며, 적들이 함정에 걸릴 때의 피드백이 확실한가?
`,b2=`# S19: Operation Safehaven (세이프헤이븐 작전)\r
\r
> **"우리는 화물이 아니라 희망을 운반한다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **전술 호송 슈터 (Tactical Escort Shooter)**\r
- **주인공**: Eva Harlow (용병 대장)\r
- **3C 특성**:\r
  - **Camera**: 1인칭/3인칭 전환 (전술적 상황에 따라)\r
  - **Character**: 리더십, 중화기 사용\r
  - **Controls**: 사격, 엄폐, 분대 명령(이동, 사격, 대기), 치료\r
- **핵심 목표**: 폐허가 된 도시에서 발견된 생존자 그룹을 약탈자들의 위협으로부터 보호하며 안전한 지하 벙커까지 호송하라.\r
- **The Vibe**: 처절한 생존, 로드 무비, 전우애. (참고: *The Last of Us*, *The Division*, *Children of Men*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Ashen World - 폐허가 된 도심 'Ruins of Sector 7'\r
- **색상 팔레트**:\r
  - **주색상**: 콘크리트 그레이 (#808080) - 무너진 빌딩\r
  - **보조색**: 더스트 브라운 (#A52A2A) - 자욱한 먼지 폭풍\r
  - **강조색**: 호프 그린 (#32CD32) - 생존자들의 식별 마크, 벙커의 불빛\r
- **도형 이론**:\r
  - **무너진 사각형**: 안전해보이지만 언제든 무너질 수 있는 폐허.\r
  - **엄폐물 라인**: 차량, 포대자루 등이 형성하는 방어선.\r
- **전체 구조**:\r
  - **Zone 1**: 붕괴된 쇼핑몰 (생존자 발견)\r
  - **Zone 2**: 고속도로 잔해 (이동 및 매복)\r
  - **Zone 3**: 벙커 입구 (최후 방어)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 기울어진 채 서로 기대어 있는 쌍둥이 빌딩 (The Leaning Towers)\r
- **Local Landmark**:\r
  - Zone 1: 중앙홀의 추락한 헬리콥터\r
  - Zone 2: 도로를 막고 있는 버스 장벽\r
  - Zone 3: 굳게 닫힌 거대한 벙커의 원형 강철문\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 폐허 속의 생명 (Lost and Found)\r
\r
- **공간**: 쇼핑몰 내부\r
- **페이싱**: **Low Tension** (수색, 조우)\r
- **레벨 디자인 기법**:\r
  - **소리 유도**: 아이 울음소리나 물건 떨어지는 소리로 생존자 위치 암시.\r
  - **수직적 탐색**: 에스컬레이터가 끊겨 있어 2층에서 1층으로 로프를 타고 이동.\r
- **게임플레이**:\r
  - 약탈자 정찰병을 소음기 무기로 조용히 처리.\r
  - 숨어있는 생존자 가족을 찾아 안심시키고 대열에 합류.\r
\r
### Act 2: 죽음의 도로 (Highway to Hell)\r
\r
- **공간**: 개방된 고속도로\r
- **페이싱**: **Rising Action** (긴장감, 매복 전투)\r
- **레벨 디자인 기법**:\r
  - **플랭킹(Flanking)**: 적들이 측면 고지대(전복된 트럭 위)에서 공격해옴.\r
  - **동적 엄폐물**: 바람에 날려오는 잔해가 시야를 가리거나, 차를 밀어 이동형 엄폐물로 사용.\r
- **게임플레이**:\r
  - 저격수의 시야를 피하기 위해 연막탄 사용.\r
  - 생존자들이 이동하는 동안 엄호 사격. "이동해! 내가 엄호한다!"\r
  - 차량 폭발 이벤트를 피하는 QTE.\r
\r
### Act 3: 문을 열어라 (Open the Gate)\r
\r
- **공간**: 벙커 입구 앞 광장\r
- **페이싱**: **High Tension** (타임 디펜스)\r
- **레벨 디자인 기법**:\r
  - **킬존(Kill Zone)**: 적들이 들어오는 입구를 지뢰와 포탑으로 미리 요새화.\r
  - **시각적 타이머**: 벙커 문이 열리는 게이지(0% -> 100%)가 화면과 실제 문 동작으로 보임.\r
- **게임플레이**:\r
  - 문이 열리는 3분 동안 몰려오는 약탈자 차량과 보스(War Rig) 저지.\r
  - 부상당한 생존자를 치료하며 라인 유지.\r
  - 문이 열리면 생존자들을 밀어 넣고 마지막에 탑승.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Ruined Mall Atrium (쇼핑몰 아트리움)\r
\r
- **위치**: Zone 1 중앙.\r
- **설명**: 유리 천장이 깨져 빛과 먼지가 쏟아지는 넓은 홀.\r
- **기능**: **만남의 광장**. 생존자들과 처음 조우하는 드라마틱한 장소이며, 엄폐물이 많아 초기 전투 교육에 최적.\r
- **비주얼**: 과거의 화려했던 광고판들이 먼지에 덮여 있는 포스트 아포칼립스적 아이러니.\r
\r
### POI 2: The Ambush Point (매복 지점)\r
\r
- **위치**: Zone 2 고속도로 병목 구간.\r
- **설명**: 양옆이 방음벽으로 막혀 도망갈 곳이 없는 좁은 직선 도로.\r
- **기능**: **전술적 위기**. 적들이 위층 도로에서 화염병과 저격을 퍼붓는 구간으로, 연막탄 사용과 빠른 돌파가 핵심.\r
- **연출**: 머리 위로 쏟아지는 총알과 폭발로 인한 소음과 진동 연출.\r
\r
### POI 3: The Rust Gas Station (녹슨 주유소)\r
\r
- **위치**: Zone 2 중반부.\r
- **설명**: 버려진 지 오래되어 간판이 아슬아슬하게 매달린 낡은 주유소.\r
- **기능**: **자원 보급 및 미니보스**. 차량 연료나 구급 상자가 대량 보관되어 있으나, 약탈자 대장이 지키고 있음.\r
- **비주얼**: 기름 웅덩이와 불타는 드럼통들이 만드는 황량한 야경.\r
\r
### POI 4: Metro Entrance (메트로 입구)\r
\r
- **위치**: Zone 3 진입 직전.\r
- **설명**: 지하로 내려가는 계단이 무너진 채 어둡게 입을 벌리고 있는 지하철역 입구.\r
- **기능**: **전략적 지름길**. 위험한 지상 도로 대신 어둡지만 적의 시야를 피할 수 있는 지하 통로 루트 제공.\r
- **비주얼**: 깜빡이는 비상등과 물이 뚝뚝 떨어지는 서늘한 지하 공간 터널.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 생존자 NPC들이 총격전 상황에서 멍청하게 서 있지 않고 스스로 엄폐하는가?\r
- [ ] 플레이어의 명령(이동/대기)에 NPC들이 즉각 반응하는가?\r
- [ ] 벙커 문이 아주 천천히 열리며 주는 긴장감이 충분한가?\r
`,C2=`# S20: The Last Stand (최후의 저항)\r
\r
> **"이 선을 넘는 놈들은 다 죽는다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **웨이브 디펜스 슈터 (Horde Mode)**\r
- **주인공**: Eva Harlow (방어 사령관)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (전황 파악), 고정형 중기관총 시점\r
  - **Character**: 고정된 위치 방어, 설치물 운용\r
  - **Controls**: 중화기 사격, 함정/포탑 수리, 탄약 보급\r
- **핵심 목표**: 생존자들의 마지막 보루인 캠프를 노리고 총공격을 감행하는 약탈자 군단과 돌연변이들을 전멸시켜라.\r
- **The Vibe**: 처절함, 물량전, 기계음과 폭발음. (참고: *Gears of War* (Horde), *Aliens: Fireteam Elite*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Ashen World - 요새화된 학교 건물 'Fort Hope'\r
- **색상 팔레트**:\r
  - **주색상**: 메탈릭 그레이 (#708090) - 철판, 바리케이드\r
  - **보조색**: 샌드 옐로우 (#F4A460) - 모래주머니\r
  - **강조색**: 익스플로전 오렌지 (#FF4500) - 폭발, 포구 화염\r
- **도형 이론**:\r
  - **동심원**: 방어선 1, 2, 3 (점차 좁혀지는 전선)\r
  - **부채꼴**: 기관총의 사격 범위 (Kill Zone)\r
- **전체 구조**:\r
  - **Zone 1**: 외곽 지뢰밭 (1차 저지선)\r
  - **Zone 2**: 학교 운동장 및 정문 (주전장)\r
  - **Zone 3**: 본관 건물 내부 (최후 거점)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 학교 옥상에 설치된 급조된 감시탑 (Sentinel Tower)\r
- **Local Landmark**:\r
  - Zone 1: 불타고 있는 적들의 차량 잔해\r
  - Zone 2: 컨테이너와 버스로 만든 거대한 정문\r
  - Zone 3: 로비에 쌓여있는 탄약 상자들\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 폭풍 전야 (Prep Time)\r
\r
- **공간**: 캠프 전역\r
- **페이싱**: **Low Tension** (전략적 준비)\r
- **레벨 디자인 기법**:\r
  - **자원 관리**: 제한된 자원(Scrap)으로 터렛을 업그레이드할지, 지뢰를 더 깔지 선택.\r
  - **가시성**: 적들이 올 경로(북쪽 도로, 남쪽 하수구)를 미리 브리핑.\r
- **게임플레이**:\r
  - 무너진 바리케이드 수리.\r
  - 주요 길목에 클레이모어 설치.\r
  - NPC 대원들에게 방어 위치 지정.\r
\r
### Act 2: 파상 공세 (The Waves)\r
\r
- **공간**: Zone 1 & 2\r
- **페이싱**: **Rising Action** (점증하는 압박)\r
- **레벨 디자인 기법**:\r
  - **적의 다양성**: 자폭병(빠름) -> 방패병(단단함) -> 저격수(멀리) 순으로 조합되어 등장.\r
  - **전선 후퇴**: 외곽이 뚫리면 신호탄을 쏘고 2차 방어선으로 후퇴 유도.\r
- **게임플레이**:\r
  - 중기관총(Mounted Gun)으로 차량 대열 저지.\r
  - 뚫린 구멍을 막으며 근접해오는 적 처리.\r
\r
### Act 3: 괴물들의 밤 (Night of Beasts)\r
\r
- **공간**: 본관 건물 코앞\r
- **페이싱**: **Climax** (혼전)\r
- **레벨 디자인 기법**:\r
  - **환경 변화**: 밤이 되고 조명탄에 의지해야 함. 시야 제한.\r
  - **보스 등장**: 개조된 거대 트럭이나 돌연변이 괴수가 정문을 부수고 난입.\r
- **게임플레이**:\r
  - 보스 몬스터에게 화력 집중 (RPG 사용).\r
  - 본관 건물이 무너지지 않게 수리하며 버티기.\r
  - 아침이 밝아오며 적들이 물러가는 승리 연출.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Main Gate (정문)\r
\r
- **위치**: Zone 2 입구.\r
- **설명**: 스쿨버스와 철판을 용접해 만든 거대하고 투박한 바리케이드.\r
- **기능**: **최전방 방어선**. 이곳의 내구도가 0이 되면 적들이 캠프 안으로 쏟아져 들어오며 난이도가 급상승함.\r
- **연출**: 적들의 차량이 정면 충돌할 때 발생하는 엄청난 소음과 화면 흔들림.\r
\r
### POI 2: The Sentinel Tower (보초탑)\r
\r
- **위치**: 학교 건물 옥상.\r
- **설명**: 목재와 철망으로 급히 지은 높은 감시 초소.\r
- **기능**: **저격 및 버프 지점**. 이곳에 위치하면 전장 전체가 한눈에 보이며, 아군에게 사격 명중률 버프를 주는 신호탄 발사 가능.\r
- **비주얼**: 바람에 흔들리는 망루와 서치라이트가 밤하늘을 가르는 모습.\r
\r
### POI 3: Med-Tent (의료 천막)\r
\r
- **위치**: Zone 3 본관 뒤편.\r
- **설명**: 붉은 십자가가 그려진 낡은 천막 안, 부상자들과 의료 도구들이 있는 곳.\r
- **기능**: **최후의 회복 거점**. 소모된 체력을 회복하거나 사망한 아군 NPC를 부활시킬 수 있는 유일한 장소.\r
- **연출**: 신음 소리와 의료 장비의 기계음이 주는 긴박하고 처절한 분위기.\r
\r
### POI 4: The Armory (무기고)\r
\r
- **위치**: Zone 3 로비 지하 입구.\r
- **설명**: 무거운 강철문 뒤에 각종 총기와 탄약 상자가 가득 쌓인 곳.\r
- **기능**: **핵심 탄약 보급소**. 매 웨이브 종료 시마다 이곳에서 탄약을 재보급해야 하며, 강력한 특수 무기(RPG 등) 구매 가능.\r
- **비주얼**: 차가운 탄약 상자들과 기름 냄새가 진동하는 진열대 풍경.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 웨이브가 거듭될수록 적들의 패턴이 지능적으로 변하는가? (우회 공격 등)\r
- [ ] 설치물(터렛)의 효과가 시각/청각적으로 타격감 있게 표현되는가?\r
- [ ] 탄약 부족이 긴장감을 주되, 아예 게임을 불가능하게 만들지는 않는가?\r
`,P2=`# S21: The Green Zone (그린 존)\r
\r
> **"지도에 없는 곳, 그곳에 희망이 있다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **오픈월드 탐험 / 생존**\r
- **주인공**: Nikolai Rad (탐사대원)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (광활한 풍경), 1인칭 (도구 확인 시)\r
  - **Character**: 방호복 착용(둔함), 방사능 저항\r
  - **Controls**: 파쿠르, 가이거 계수기 확인, 필터 교체\r
- **핵심 목표**: 방사능으로 뒤덮인 세상에서 전설로만 전해지는 오염되지 않은 청정 구역 '그린 존'을 찾아 지도를 완성하라.\r
- **The Vibe**: 고독, 신비, 미지의 공포, 발견의 기쁨. (참고: *Fallout*, *Metro Exodus*, *Death Stranding*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Ashen World - 방사능 늪지와 안개 협곡\r
- **색상 팔레트**:\r
  - **주색상**: 톡식 그린 (#32CD32) - 방사능 안개, 오염된 물\r
  - **보조색**: 뮤턴트 퍼플 (#8A2BE2) - 변이된 식물\r
  - **강조색**: 스카이 블루 (#87CEEB) - 그린 존의 맑은 하늘 (엔딩)\r
- **도형 이론**:\r
  - **유기적 덩어리**: 녹아내린 건물, 버섯 구름 모양 바위 (변이)\r
  - **숨겨진 선**: 덩굴 뒤의 동굴, 폭포 뒤의 길 (비밀)\r
- **전체 구조**:\r
  - **Zone 1**: 오염된 늪지대 (위험 회피)\r
  - **Zone 2**: 안개 낀 협곡 (등반 및 길찾기)\r
  - **Zone 3**: 비밀의 화원 (발견)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 멀리서도 보이는 거대한 버섯 모양의 바위산 (Mushroom Rock)\r
- **Local Landmark**:\r
  - Zone 1: 반쯤 가라앉은 여객기 동체\r
  - Zone 2: 빛나는 이끼로 뒤덮인 동굴 입구\r
  - Zone 3: 맑은 물이 흐르는 숨겨진 폭포\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 독의 바다 (Sea of Poison)\r
\r
- **공간**: 방사능 늪지\r
- **페이싱**: **Low to Medium** (환경적 위협)\r
- **레벨 디자인 기법**:\r
  - **청각적 피드백**: 가이거 계수기의 '지지직'거리는 소리 빈도로 위험 구역(Hotspot) 경고.\r
  - **안전지대(Islands)**: 오염된 물 위로 솟아오른 바위나 차량 지붕들이 징검다리 역할.\r
- **게임플레이**:\r
  - 방독면 필터를 관리하며 늪지 횡단.\r
  - 방사능 폭풍이 불오면 폐가로 대피.\r
\r
### Act 2: 안개 속으로 (Into the Mist)\r
\r
- **공간**: 가파른 협곡\r
- **페이싱**: **Medium Tension** (크리처 은신)\r
- **레벨 디자인 기법**:\r
  - **시야 제한**: 짙은 안개로 시야를 차단하여 청각 의존도 높임.\r
  - **수직 이동**: 로프와 피켈을 이용해 절벽 등반.\r
- **게임플레이**:\r
  - 눈이 먼 대신 소리에 민감한 '동굴 괴물'들을 피해 조용히 이동.\r
  - 고대 벽화를 통해 그린 존의 단서 획득.\r
\r
### Act 3: 낙원 발견 (Paradise Found)\r
\r
- **공간**: 협곡 너머의 분지\r
- **페이싱**: **Release** (해방감, 감동)\r
- **레벨 디자인 기법**:\r
  - **시각적 충격(Reveal)**: 어두운 동굴을 빠져나오는 순간, 눈부신 햇살과 푸른 숲이 펼쳐지는 연출.\r
  - **색감 변화**: 칙칙한 녹색 필터가 제거되고 선명한 천연색으로 화면 전환.\r
- **게임플레이**:\r
  - 오염되지 않은 샘물 마시기 (체력 완전 회복).\r
  - 지도에 위치를 기록하고 정착지 건설을 위한 비콘 설치.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Sunken Plane (가라앉은 비행기)\r
\r
- **위치**: Zone 1 늪지 중앙.\r
- **설명**: 늪속에 코를 박고 반쯤 가라앉은 채 거대한 무덤처럼 남은 여객기.\r
- **기능**: **초기 탐험 던전**. 비행기 내부의 좁은 통로를 탐색하며 귀중한 의료품과 방독면 필터를 획득.\r
- **비주얼**: 부서진 창문으로 스며드는 독성 안개와 시체들이 엉켜있는 섬뜩한 내부.\r
\r
### POI 2: The Radio Tower (통신탑)\r
\r
- **위치**: Zone 2 협곡 꼭대기.\r
- **설명**: 낙뢰로 인해 끝부분이 휘어진 채 위태롭게 서 있는 거대 송전탑.\r
- **기능**: **정보 획득 및 맵 안개 해제**. 탑 꼭대기에 올라 안테나를 수리하면 주변 지역의 POI 위치가 지도에 갱신됨.\r
- **비주얼**: 탑 위에서 내려다보는 구름 아래 오염된 대지의 장엄하고도 비극적인 풍경.\r
\r
### POI 3: Contaminated Well (오염된 우물)\r
\r
- **위치**: Zone 1과 2 경계의 버려진 마을.\r
- **설명**: 검은 액체가 끓어오르는 돌로 된 오래된 우물.\r
- **기능**: **하이 리스크 하이 보상**. 위험한 방사능 수치를 버티며 우물 깊은 곳의 변이된 보석을 채취하면 강력한 제작 재료 확보 가능.\r
- **연출**: 우물 근처에 가면 가이거 계수기가 비명을 지르며 경고하는 청각적 압박.\r
\r
### POI 4: Hidden Waterfall (숨겨진 폭포)\r
\r
- **위치**: Zone 3 그린 존의 입구.\r
- **설명**: 덩굴과 꽃들로 완벽하게 가려진, 맑고 투명한 물이 쏟아지는 비밀의 폭포.\r
- **기능**: **낙원 입구**. 이 폭포를 통과하는 순간 모든 상태 이상이 해제되며 평화로운 BGM으로 전환됨.\r
- **연출**: 쏟아지는 물줄기 뒤로 보이는 찬란한 햇살과 푸른 숲의 환상적인 Reveal.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 가이거 계수기 소리가 너무 시끄러워 플레이어에게 스트레스를 주지 않는가? (옵션/조절)\r
- [ ] '안전한 길'과 '위험한 길'이 시각적으로 구분되는가? (말라죽은 풀 vs 이끼 등)\r
- [ ] 그린 존 발견 시의 시각적/청각적 연출(블룸, 오케스트라 등)이 충분히 보상감을 주는가?\r
`,T2=`# S22: Scavenger King (스캐빈저 킹)\r
\r
> **"속도가 곧 생존이고, 연료가 곧 혈액이다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **차량 액션 / 레이싱**\r
- **주인공**: Nikolai Rad (드라이버)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (차량 후방), 운전석 시점\r
  - **Character**: 운전 기술, 차량 개조\r
  - **Controls**: 가속, 드리프트, 부스터, 차량 무기 발사\r
- **핵심 목표**: 사막화된 공단에서 라이벌 스캐빈저들보다 먼저 희귀한 고대 기술(Tech)을 확보하고, 추격전을 벌여 탈출하라.\r
- **The Vibe**: 디젤펑크, 속도, 폭발, 모래바람. (참고: *Mad Max: Fury Road*, *MotorStorm*, *RAGE*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Ashen World - 말라버린 바다와 폐공장 지대 'The Rust Sea'\r
- **색상 팔레트**:\r
  - **주색상**: 러스티 오렌지 (#D2691E) - 녹슨 철과 모래\r
  - **보조색**: 오일 블랙 (#000000) - 기름 웅덩이, 타이어 자국\r
  - **강조색**: 크롬 실버 (#C0C0C0) - 빛나는 엔진, 보물\r
- **도형 이론**:\r
  - **긴 직선**: 고속도로, 활주로 (속도)\r
  - **경사면**: 점프대, 모래언덕 (액션)\r
- **전체 구조**:\r
  - **Zone 1**: 폐차장 (차량 제작 및 튜닝)\r
  - **Zone 2**: 무너진 고가도로 (레이싱)\r
  - **Zone 3**: 고대 연구소 (플랫포밍 및 탈출)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 기울어진 채 땅에 박힌 거대한 송전탑들\r
- **Local Landmark**:\r
  - Zone 1: 차들이 쌓여 만들어진 '고철 산(Scrap Mountain)'\r
  - Zone 2: 끊어진 다리 위를 아슬아슬하게 연결한 컨테이너 다리\r
  - Zone 3: 돔 형태의 연구소 지붕\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 시동을 걸어라 (Start Your Engines)\r
\r
- **공간**: 거대 폐차장\r
- **페이싱**: **Low Tension** (탐색, 크래프팅)\r
- **레벨 디자인 기법**:\r
  - **순환 구조**: 중앙의 차고(Hub)를 중심으로 부품을 구하러 나갔다 돌아오는 구조.\r
  - **테스트 드라이브**: 개조한 차량을 바로 시험해볼 수 있는 앞마당 트랙.\r
- **게임플레이**:\r
  - V8 엔진, 스파이크 타이어 등 부품 수집.\r
  - 나만의 전투 차량(Buggy) 조립.\r
\r
### Act 2: 죽음의 경주 (Death Race)\r
\r
- **공간**: 사막의 고가도로 및 평원\r
- **페이싱**: **High Tension** (고속 전투)\r
- **레벨 디자인 기법**:\r
  - **다중 경로(Split Paths)**: 빠른 지름길(점프 필요) vs 안전하지만 먼 길.\r
  - **동적 장애물**: 라이벌 갱단이 도로에 뿌리는 지뢰나 폭발 드럼통.\r
- **게임플레이**:\r
  - 라이벌 차량들과의 충돌 배틀 (Sidewind).\r
  - 차량 무기(작살, 화염방사기)로 적 제거.\r
  - 모래 폭풍 속을 뚫고 랜드마크를 보며 방향 잡기.\r
\r
### Act 3: 최후의 도주 (The Getaway)\r
\r
- **공간**: 연구소 내부 및 탈출로\r
- **페이싱**: **Very High Tension** (추격)\r
- **레벨 디자인 기법**:\r
  - **선형적 질주**: 뒤에는 거대 보스 트럭이, 앞에는 장애물이 있는 외길 추격전.\r
  - **시네마틱 이벤트**: 다리가 무너지고, 연료 탱크가 터지는 헐리우드 액션 연출.\r
- **게임플레이**:\r
  - 연구소에서 기술 칩 확보(도보 액션 잠시).\r
  - 다시 차에 타서 거대 보스 'The Warlord'의 트럭 따돌리기.\r
  - 부스터를 써서 끊어진 다리를 넘는 엔딩 점프.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Scrap Mountain (고철 산)\r
\r
- **위치**: Zone 1 폐차장 중앙.\r
- **설명**: 버려진 차 수천 대를 층층이 쌓아올려 만든 인공 산.\r
- **기능**: **테스트 트랙 및 파밍**. 산 주위를 나선형으로 돌며 정점까지 올라가 희귀 엔진 부품을 확보해야 함.\r
- **비주얼**: 산꼭대기에서 내려다보는 황량한 Rust Sea의 전경과 불어오는 모래바람.\r
\r
### POI 2: Secret Black Market (비밀 암시장)\r
\r
- **위치**: Zone 2 지하 터널 숨겨진 입구.\r
- **설명**: 네온사인이 깜빡이는 화물 컨테이너 박스들이 어지럽게 뒤섞인 지하 공간.\r
- **기능**: **거래 및 업그레이드**. 수집한 자원을 차량 무기나 강력한 부스터 연료로 교환할 수 있는 중립 구역.\r
- **비주얼**: 시끄러운 락 음악과 기름 냄새, 용접 불꽃이 튀는 활기찬 지하 문화 공간.\r
\r
### POI 3: Junk Heap Fortress (고철 요새)\r
\r
- **위치**: Zone 2 끝부분 평원.\r
- **설명**: 라이벌 갱단 'Rust Renegades'가 점령한 요새화된 공장.\r
- **기능**: **전투 허들**. 요새를 정면 돌파하거나, 차량으로 외벽을 들이받아 구멍을 내고 침투해야 함.\r
- **연출**: 요새 위에서 발사되는 작살총들과 자폭 차량들의 추격 이벤트.\r
\r
### POI 4: Broken Bridge Jump (죽음의 도약)\r
\r
- **위치**: Zone 3 탈출로의 클라이맥스.\r
- **설명**: 끊어진 고가도로 끝자락에 설치된 거대한 철판 점프대.\r
- **기능**: **최종 스턴트**. 배기음과 함께 부스터를 최대 출력으로 사용하여 건너편 연구소 옥상으로 날아가야 함.\r
- **연출**: 점프하는 순간 슬로우 모션과 함께 뒤로 폭발하는 갱단의 추격대 연출.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 차량의 속도감에 맞춰 맵의 스케일(도로 폭, 거리)이 충분히 넓은가?\r
- [ ] 점프대나 지름길이 주행 중에 명확히 인지되는가? (표지판, 색상 유도)\r
- [ ] 충돌 물리 효과가 너무 가볍거나 튀지 않고 묵직한가?\r
`,I2=`# S23: The Cure (치료제)\r
\r
> **"자연은 독이자 약이다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **과학 어드벤처 / 크래프팅**\r
- **주인공**: Dr. Singh (과학자)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (탐색), UI 화면 (분석 시)\r
  - **Character**: 전투력 약함, 지식 높음\r
  - **Controls**: 채집, 스캐너, 조합(Crafting), 투척(미끼/가스탄)\r
  - **핵심 목표**: 방사능 늪지 속 변이된 식물원에서 희귀한 식물 샘플과 화학 물질을 수집하여 치료제를 제작하라.\r
- **The Vibe**: 신비로운 식물, 과학적 탐구, 정적인 긴장감. (참고: *Subnautica*, *Metroid Prime* (Scanning), *Annihilation*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Ashen World - 변이된 거대 식물원 'Eden Garden'\r
- **색상 팔레트**:\r
  - **주색상**: 바이올렛 (#EE82EE) - 변이된 꽃, 포자\r
  - **보조색**: 랩 화이트 (#F0FFFF) - 연구소 벽, 무균실\r
  - **강조색**: 케미컬 그린 (#7FFF00) - 치료제, 반응 물질\r
- **도형 이론**:\r
  - **나선형**: DNA 구조, 덩굴 식물 (생명, 진화)\r
  - **돔 구장**: 유리 온실 (보호, 갇힘)\r
- **전체 구조**:\r
  - **Zone 1**: 유리 돔 식물원 (식물 채집)\r
  - **Zone 2**: 지하 배양실 (가스 퍼즐)\r
  - **Zone 3**: 중앙 합성실 (제작 및 방어)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 유리가 깨져 거대 식물이 뚫고 나온 중앙 돔\r
- **Local Landmark**:\r
  - Zone 1: 사람을 잡아먹는 거대 파리지옥 군락\r
  - Zone 2: 노란색 가스로 가득 찬 환기구\r
  - Zone 3: 복잡한 비커와 튜브가 연결된 합성 테이블\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 위험한 정원 (The Garden of Teeth)\r
\r
- **공간**: 변이 식물들이 장악한 온실\r
- **페이싱**: **Low Tension** (관찰, 채집)\r
- **레벨 디자인 기법**:\r
  - **반응형 환경**: 플레이어가 다가가면 움츠러들거나 포자를 뿜는 식물들.\r
  - **지식 기반 진행**: 스캔을 통해 식물의 약점(빛, 소리 등)을 알아내야 채집 가능.\r
- **게임플레이**:\r
  - 공격적인 식물에게 미끼를 던져 시선을 돌리고 샘플 채취.\r
  - 빛나는 포자를 따라가 희귀 약초 발견.\r
\r
### Act 2: 보이지 않는 죽음 (Silent Killer)\r
\r
- **공간**: 유독 가스가 누출된 지하 배양실\r
- **페이싱**: **Medium Tension** (환경 퍼즐)\r
- **레벨 디자인 기법**:\r
  - **제한 구역**: 산소 게이지가 줄어드는 가스 구역과 안전 구역(에어포켓)의 반복 배치.\r
  - **회로 연결**: 파이프를 돌려 환기 시스템을 가동하고 가스를 제거.\r
- **게임플레이**:\r
  - 제한된 산소로 미로 같은 지하 통로 통과.\r
  - 변이된 실험체(실패작)들을 피해 카드키 확보.\r
\r
### Act 3: 최후의 배합 (Final Synthesis)\r
\r
- **공간**: 중앙 연구실\r
- **페이싱**: **High Tension** (제작 미니게임 + 디펜스)\r
- **레벨 디자인 기법**:\r
  - **멀티태스킹**: 치료제를 만드는 동안 몰려오는 실험체들을 막아야 함 (바리케이드/함정).\r
  - **시각적 완료**: 배합 진행도에 따라 투명하던 용액이 점차 빛나는 초록색으로 변함.\r
- **게임플레이**:\r
  - 정확한 비율로 시약 투입 (QTE).\r
  - 연구실의 보안 시스템(터렛, 레이저)을 해킹하여 적 방어.\r
  - 치료제 완성 후 살포 드론을 띄워 지역 정화.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Crystal Dome (수정 돔)\r
\r
- **위치**: Zone 1 식물원 정중앙.\r
- **설명**: 거대한 유리 돔이 깨져 햇빛이 쏟아져 들어오고, 그 한복판에 변이된 거대 모태 식물이 피어 있음.\r
- **기능**: **보스급 채집 대상**. 모태 식물의 꽃가루를 얻기 위해서는 식물의 공격 패턴을 파악해 무력화시켜야 함.\r
- **비주얼**: 찬란한 햇빛과 보라색 포자가 섞여 만드는 몽환적이고 위험한 풍경.\r
\r
### POI 2: The Overgrown Greenhouse (우거진 온실)\r
\r
- **위치**: Zone 1 동쪽 별관.\r
- **설명**: 통제가 불가능할 정도로 자라난 덩굴들이 벽과 천장을 가득 메운 온실.\r
- **기능**: **퍼즐 재료 수집**. 덩굴을 잘라내거나 약품으로 녹여 숨겨진 화학 시약을 찾아내야 함.\r
- **비주얼**: 바닥에 가득한 끈적이는 수액과 플레이어를 관찰하는 듯한 꽃눈들.\r
\r
### POI 3: Sealed High-Sec Lab (봉인된 보안 실험실)\r
\r
- **위치**: Zone 2 깊은 곳.\r
- **설명**: 과거의 방역 시스템이 그대로 작동 중인 차가운 금속 소재의 실험실.\r
- **기능**: **해킹 및 정보 획득**. 보안 레이저를 피하거나 해킹하여 과거의 연구 데이터와 특수 합성 촉매 획득.\r
- **연출**: 갑작스러운 경보음과 함께 폐쇄되는 문, 붉은색 경고 조명.\r
\r
### POI 4: Ventilation Hub (환기 허브)\r
\r
- **위치**: Zone 2 산소 공급 장치실.\r
- **설명**: 거대한 산업용 팬 3개가 천천히 돌아가며 유독 가스를 정화하는 곳.\r
- **기능**: **플랫폼 퍼즐**. 팬의 날개 사이로 타이밍을 맞춰 이동하거나, 기어를 조작해 팬의 속도를 조절해야 함.\r
- **연출**: 팬이 돌아갈 때마다 발생하는 강한 바람 소리와 주변 먼지들이 휩쓸려 나가는 연출.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 스캔 UI가 화면을 너무 가리지 않으면서 정보 전달이 명확한가?\r
- [ ] 산소 제한 시간이 너무 짧아 스트레스를 주지 않는가? (업그레이드로 완화 가능?)\r
- [ ] 정화 엔딩 시 주변 식물들이 시각적으로 '치유'되는 연출이 있는가?\r
`,E2=`# S24: Oath of Peace (평화의 맹세)\r
\r
> **"펜은 칼보다 강하다. 하지만 칼 든 놈 앞에서는 말을 조심해야 한다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **내러티브 어드벤처 (대화형 RPG)**\r
- **주인공**: Dr. Singh (중재자)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (이동), 대화 시 클로즈업/오버더숄더\r
  - **Character**: 비전투, 카리스마, 통찰력\r
  - **Controls**: 대화 선택, 증거 제시, 제스처(손들기/악수)\r
- **핵심 목표**: 전쟁 일보 직전의 두 세력(군벌 vs 자경단) 사이를 오가며 오해를 풀고 평화 협정을 성사시켜라.\r
- **The Vibe**: 정치 스릴러, 긴장감, 심리전, 황야의 결투. (참고: *Disco Elysium*, *Fallout: New Vegas* (Speech check), *Mass Effect*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Ashen World - 국경 지대 'The Divided Canyon'\r
- **색상 팔레트**:\r
  - **주색상**: 뉴트럴 그레이 (#D3D3D3) - 중립 지대, 황무지\r
  - **보조색**: 워 레드 (#8B0000) - 군벌 진영 (공격적)\r
  - **강조색**: 피스 블루 (#4169E1) - 자경단 진영 (방어적)\r
- **도형 이론**:\r
  - **대칭**: 협곡을 사이에 둔 두 진영의 데칼코마니 배치 (대립).\r
  - **다리**: 두 영역을 잇는 유일한 연결고리 (소통).\r
- **전체 구조**:\r
  - **Zone 1**: 군벌 진영 (Warlords' Camp)\r
  - **Zone 2**: 자경단 진영 (Vigilantes' Fort)\r
  - **Zone 3**: 중립 지대 다리 (회담장)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 협곡 사이에 걸쳐 있는, 끊어질 듯 위태로운 낡은 현수교\r
- **Local Landmark**:\r
  - Zone 1: 폐탱크로 만든 군벌의 왕좌\r
  - Zone 2: 풍력 발전기가 돌아가는 자경단 본부\r
  - Zone 3: 다리 위의 컨테이너 회담장 (하얀 깃발)\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 양쪽의 이야기 (Two Sides)\r
\r
- **공간**: 양측 진영 베이스캠프\r
- **페이싱**: **Low Tension** (정보 수집, 설득)\r
- **레벨 디자인 기법**:\r
  - **비주얼 스토리텔링**: 군벌 진영은 무기가 많고 식량이 부족, 자경단은 식량은 많으나 약품이 부족함을 보여줌 (교역 가능성 암시).\r
  - **동선**: 양측 진영을 오가기 위해 검문소를 통과해야 함 (긴장감).\r
- **게임플레이**:\r
  - 각 진영 리더와 대화하여 요구 조건 파악.\r
  - 강경파와 온건파 NPC를 구분하여 포섭.\r
  - 전쟁을 부추기는 제3세력(스파이)의 증거 확보.\r
\r
### Act 2: 살얼음판 (Thin Ice)\r
\r
- **공간**: 중립 지대 (협곡 다리)\r
- **페이싱**: **Medium Tension** (위기 관리)\r
- **레벨 디자인 기법**:\r
  - **저격의 공포**: 절벽 위에서 저격수의 레이저 포인트가 플레이어를 따라다님 (행동 조심 유도).\r
  - **제한 구역**: 다리 위 특정 선을 넘으면 경고 사격.\r
- **게임플레이**:\r
  - 양측 대표를 회담장으로 나오게 설득.\r
  - 회담장 주변에 설치된 폭발물 해체 (스파이의 공작).\r
\r
### Act 3: 말의 전쟁 (Battle of Words)\r
\r
- **공간**: 컨테이너 회담장\r
- **페이싱**: **High Tension** (시간 제한 대화)\r
- **레벨 디자인 기법**:\r
  - **카메라 연출**: 발언권자에 따라 카메라가 역동적으로 움직이며 심리적 압박 표현.\r
  - **분위기**: 사소한 말실수 하나에 총을 뽑으려 하는 NPC들의 살벌한 애니메이션.\r
- **게임플레이**:\r
  - 최종 회담: 증거를 제시하고 논리로 상대를 압도하거나 감동시키기.\r
  - 돌발 상황: 저격수가 발포했을 때 몸을 날려 리더를 구하거나(액션), 말로 진정시키기.\r
  - 엔딩: 평화 협정(Best), 한쪽 전멸(Normal), 모두 공멸(Bad).\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Bridge of Sighs (탄식의 다리)\r
\r
- **위치**: 맵 정중앙, 두 진영을 가르는 협곡 위.\r
- **설명**: 바람에 끼익 소리를 내며 흔들리는, 아슬아슬하게 연결된 노후된 현수교.\r
- **기능**: **최후의 회담장**. 평화와 전쟁을 결정짓는 운명의 장소이며, 대화 중 발생하는 돌발 위기 상황의 배경.\r
- **비주얼**: 발아래로 보이는 끝없는 절벽과 양쪽에 대치 중인 두 부대의 총구들.\r
\r
### POI 2: The Memorial Wall (추모의 벽)\r
\r
- **위치**: 자경단 진영(Zone 2) 입구 마당.\r
- **설명**: 지난 전쟁에서 희생된 사람들의 이름과 사진이 빼곡히 붙어 있는 무너진 콘크리트 벽.\r
- **기능**: **내러티브 감성 자극**. 군벌 리더를 이곳으로 데려와 대화하면 특정 설득 옵션이 활성화됨.\r
- **비주얼**: 바닥에 놓인 시든 꽃들과 촛불, 바람에 나부끼는 추모 편지들.\r
\r
### POI 3: Hidden Trading Post (숨겨진 거래소)\r
\r
- **위치**: 협곡 아래쪽 동굴 뒤편.\r
- **설명**: 양쪽 세력 몰래 물건을 주고받던 스파이들의 은밀한 접선지.\r
- **기능**: **증거 수집**. 전쟁을 유도하려는 제3세력의 음모(무기 밀매 장부 등)를 발견할 수 있는 결정적인 장소.\r
- **비주얼**: 어둠 속에서 조용히 고동치는 통신 장비와 바닥의 담배꽁초들.\r
\r
### POI 4: Sniper's Nest (저격 포인트)\r
\r
- **위치**: 협곡 절벽 위 은폐된 바위 동굴.\r
- **설명**: 회담장이 한눈에 내려다보이는, 조준경 렌즈에 반사된 빛이 간간이 보이는 곳.\r
- **기능**: **전술적 긴장감 조성**. 회담 도중 이곳의 저격수가 총을 쏘지 못하도록 대화로 시간을 끌거나, 미리 분대를 보내 조용히 제압해야 함.\r
- **연출**: 회담 진행 중 수시로 플레이어의 가슴팍을 훑고 지나가는 붉은색 레이저 포인터.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 대화 선택지에 따라 NPC들의 표정과 태도(호감도)가 즉각적으로 변하는가?\r
- [ ] 전투 없이도 긴장감을 유지할 수 있는 장치(BGM, 조명, 사운드)가 충분한가?\r
- [ ] 양측 진영의 비주얼(복장, 건축 양식)이 확연히 구분되어 대립 구도가 명확한가?\r
`,M2=`# S25: First Day (첫째 날)\r
\r
> **"수업 종이 울렸지만, 아무도 자리에 앉지 않았다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **서바이벌 호러 / 도주 액션**\r
- **주인공**: Lee Park (고등학생)\r
- **3C 특성**:\r
  - **Camera**: 1인칭 (핸드헬드 느낌의 흔들림, 좁은 시야)\r
  - **Character**: 빠르고 민첩하지만 전투력 약함 (야구방망이)\r
  - **Controls**: 전력 질주, 파쿠르(책상/담장 넘기), 문 잠그기\r
- **핵심 목표**: 좀비 바이러스가 퍼져 아수라장이 된 학교에서 빠져나와 안전한 집까지 살아서 도망쳐라.\r
- **The Vibe**: 패닉, 혼란, 비명소리, 익숙한 공간의 공포. (참고: *All of Us Are Dead*, *Highschool of the Dead*, *Dying Light* (초반))\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Dead Zones - 'Sunnyside High School' 및 인근 주택가\r
- **색상 팔레트**:\r
  - **주색상**: 스쿨 옐로우 (#FFD700) - 복도, 교복\r
  - **보조색**: 패닉 레드 (#FF0000) - 비상벨, 피 묻은 칠판\r
  - **강조색**: 스모크 그레이 (#696969) - 화재 연기\r
- **도형 이론**:\r
  - **긴 복도**: 도주로이자 죽음의 통로 (직선).\r
  - **사각형**: 교실, 창문 (탈출구이자 갇힌 공간).\r
- **전체 구조**:\r
  - **Zone 1**: 2학년 교실 및 복도 (초기 감염)\r
  - **Zone 2**: 학교 운동장 (대규모 군중)\r
  - **Zone 3**: 주택가 골목 (경로 개척)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 검은 연기가 피어오르는 학교 본관 시계탑\r
- **Local Landmark**:\r
  - Zone 1: 피로 '도와주세요'라고 쓰인 미술실 창문\r
  - Zone 2: 전복되어 불타는 스쿨버스\r
  - Zone 3: Lee의 집 대문 (파란색)\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 종소리와 비명 (School Bell Rings)\r
\r
- **공간**: 교실 및 복도\r
- **페이싱**: **High Tension** (시작부터 패닉)\r
- **레벨 디자인 기법**:\r
  - **튜토리얼**: 좀비가 문을 부수고 들어오는 짧은 시간 동안 창문을 넘는 법(파쿠르) 학습.\r
  - **장애물**: 복도에 쓰러진 자판기, 사물함 등이 길을 막고 있어 점프와 슬라이딩 유도.\r
- **게임플레이**:\r
  - 몰려오는 감염된 친구들을 피해 교무실로 이동.\r
  - 방송실에서 마스터키 획득 (잠입).\r
\r
### Act 2: 운동장 질주 (The Playground)\r
\r
- **공간**: 개방된 학교 운동장\r
- **페이싱**: **Very High Tension** (군중 회피)\r
- **레벨 디자인 기법**:\r
  - **슬라럼(Slalom)**: 수백 명의 좀비들 사이사이로 빈 공간을 찾아 요리조리 피하며 달리기.\r
  - **시선 유도**: 운동장 끝의 열린 후문이 밝게 빛나며 목표 지점임을 알림.\r
- **게임플레이**:\r
  - 좀비들에게 잡혔을 때 뿌리치기 (QTE).\r
  - 야구부 창고에서 알루미늄 배트 획득 (최소한의 호신 무기).\r
\r
### Act 3: 집으로 가는 길 (Way Back Home)\r
\r
- **공간**: 복잡한 주택가 골목\r
- **페이싱**: **Medium Tension** (경로 탐색)\r
- **레벨 디자인 기법**:\r
  - **버티컬리티**: 골목은 좀비로 가득 차 있어 담벼락과 지붕 위로 이동해야 함.\r
  - **안도감**: 집에 가까워질수록 좀비 수가 줄어들고 익숙한 풍경이 나옴.\r
- **게임플레이**:\r
  - 지붕 위를 달리는 파쿠르 액션.\r
  - 집 앞에 도착했지만 문이 잠겨 있어 2층 창문으로 진입.\r
  - 가족의 생사를 확인하는 엔딩 (생존/감염 분기).\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Main Hallway (본관 복도)\r
\r
- **위치**: Zone 1.\r
- **설명**: 피 묻은 사물함과 흩날리는 교과서들로 난장판이 된 복도.\r
- **기능**: **혼란 연출**. 스프링클러가 작동해 물이 쏟아지고 비상벨 소리가 끊임없이 울리는 튜토리얼 구간.\r
- **비주얼**: 깜빡이는 전등과 물에 비친 좀비들의 실루엣.\r
\r
### POI 2: The Staff Room (교무실)\r
\r
- **위치**: Zone 1과 2 연결부.\r
- **설명**: 서류 뭉치가 어지럽게 널브러진 학교의 심장부.\r
- **기능**: **자원 및 아이템 허브**. 학교 정문 마스터키와 소량의 의약품을 획득할 수 있는 중요한 장소.\r
- **비주얼**: 유리창에 비친 운동장의 좀비 떼와 교사들의 절박한 마지막 메시지.\r
\r
### POI 3: The Overturned Bus (전복된 버스)\r
\r
- **위치**: Zone 2 운동장 중앙.\r
- **설명**: 옆으로 넘어진 노란 스쿨버스가 불타고 있는 곳.\r
- **기능**: **안전지대 겸 발판**. 버스 위로 올라가면 잠시 좀비의 손길에서 벗어나 다음 도주 경로를 파악할 수 있음.\r
- **연출**: 타오르는 고무 냄새와 검은 연기가 시야를 방해하는 긴장감.\r
\r
### POI 4: The School Gym (학교 체육관)\r
\r
- **위치**: Zone 2 끝부분.\r
- **설명**: 거대한 돔 형태의 체육관 건물.\r
- **기능**: **강제 전투 및 아레나**. 수백 명의 좀비가 갇혀 있는 이곳을 뚫고 지나가야 후문으로 탈출 가능.\r
- **비주얼**: 어두운 체육관 안, 농구 코트 바닥에 울려 퍼지는 플레이어의 발소리와 좀비들의 으르렁거리는 소리.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 카메라 흔들림(Camera Shake)이 현장감을 주되 멀미를 유발하지 않는가?\r
- [ ] 파쿠르 판정이 관대하여, 급박한 상황에서도 흐름이 끊기지 않는가? (Auto-grab 등)\r
- [ ] 비상벨 소리가 계속 울리면 귀가 아프므로, 특정 구간에서 멈추거나 배경음으로 깔리는가?\r
`,N2=`# S26: The Last Bus (마지막 버스)\r
\r
> **"이 버스를 놓치면 다음은 없다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **타임어택 액션 슈터**\r
- **주인공**: Lee Park (생존자)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (등 뒤에서 넓게), 달릴 때 FOV 증가\r
  - **Character**: 스태미나 높음, 사격 가능\r
  - **Controls**: 전력 질주, 파쿠르, 권총 사격(견제용)\r
  - **핵심 목표**: 도시를 탈출하는 마지막 버스가 떠나기 전까지, 좀비로 뒤덮인 도심을 뚫고 터미널에 도착하라.\r
- **The Vibe**: 속도감, 촉박함, 대규모 좀비 웨이브. (참고: *World War Z*, *Left 4 Dead 2* (The Parish), *Train to Busan*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Dead Zones - 정체된 고가도로와 버스 터미널\r
- **색상 팔레트**:\r
  - **주색상**: 아스팔트 블랙 (#2F4F4F) - 도로\r
  - **보조색**: 트래픽 엠버 (#FFBF00) - 신호등, 비상등\r
  - **강조색**: 좀비 블러드 (#8B0000) - 감염체\r
- **도형 이론**:\r
  - **긴 선**: 도로, 가드레일 (방향성)\r
  - **장애물**: 버려진 차량들 (엄폐물 및 발판)\r
- **전체 구조**:\r
  - **Zone 1**: 꽉 막힌 고가도로 (플랫포밍)\r
  - **Zone 2**: 어두운 지하차도 (스텔스/전력질주)\r
  - **Zone 3**: 버스 터미널 (최후의 질주)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 터미널 꼭대기의 거대한 시계탑 (남은 시간을 시각적으로 보여줌)\r
- **Local Landmark**:\r
  - Zone 1: 차량들이 탑처럼 쌓인 'The Pile'\r
  - Zone 2: 조명이 깜빡이는 터널 입구\r
  - Zone 3: 엔진을 켜고 대기 중인 군용 수송 버스\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 차량의 바다 (Sea of Cars)\r
\r
- **공간**: 고가도로 위\r
- **페이싱**: **High Tension** (플랫폼 액션)\r
- **레벨 디자인 기법**:\r
  - **The Floor is Lava**: 바닥(도로)에는 좀비가 가득하므로, 버려진 차량 지붕을 밟고 이동해야 함.\r
  - **선형적 진행**: 일직선 도로지만 차량 배치로 높낮이를 조절.\r
- **게임플레이**:\r
  - 버스 지붕에서 트럭 지붕으로 점프.\r
  - 다리가 끊어진 구간에서 로프 슬라이딩.\r
\r
### Act 2: 어둠의 터널 (Dark Tunnel)\r
\r
- **공간**: 지하차도\r
- **페이싱**: **Medium Tension** (청각적 공포)\r
- **레벨 디자인 기법**:\r
  - **조명 제한**: 비상등만 돌아가는 어두운 터널. 좀비의 눈빛만 보임.\r
  - **반향음(Echo)**: 총을 쏘면 소리가 울려 더 많은 좀비를 불러옴 (사격 자제 유도).\r
- **게임플레이**:\r
  - 소리 내지 않고 조용히 이동하거나, 조명탄을 던져 시선 유도.\r
  - 터널 출구의 빛을 향해 마지막 전력 질주.\r
\r
### Act 3: 출발 3분 전 (Departure)\r
\r
- **공간**: 버스 터미널 광장\r
- **페이싱**: **Very High Tension** (웨이브 돌파)\r
- **레벨 디자인 기법**:\r
  - **타이머 표시**: 화면 상단에 남은 시간(예: 3:00) 표시.\r
  - **밀집도 증가**: 터미널에 가까워질수록 좀비 밀도가 급격히 높아짐.\r
- **게임플레이**:\r
  - 자동 소총을 획득하여 화력으로 길을 뚫음.\r
  - 떠나기 시작한 버스를 쫓아가서 점프해 매달리기 (컷신 연결).\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Pile-up (교통사고 탑)\r
\r
- **위치**: Zone 1 고가도로 중간.\r
- **설명**: 수십 대의 차량이 연쇄 추돌하여 거대한 고철 언덕을 이룬 곳.\r
- **기능**: **전망대**. 이 고철 탑의 정점에 올라가면 버스 터미널까지의 남은 거리와 좀비 호드의 위치를 파악 가능.\r
- **비주얼**: 위태롭게 쌓인 차들 사이로 뿜어져 나오는 라디에이터 증기.\r
\r
### POI 2: Sky-bridge Shortcut (육교 지름길)\r
\r
- **위치**: Zone 2 도심 진입부.\r
- **설명**: 빌딩 두 개를 잇는 붕괴 직전의 유리 육교.\r
- **기능**: **리스크-리워드 지름길**. 좀비가 가득한 지하차도를 우회할 수 있지만, 유리가 깨지지 않게 조심히 달려야 함.\r
- **연출**: 발밑으로 좀비 떼가 지나가는 것을 내려다보며 달리는 공포감.\r
\r
### POI 3: The Toll Booth (톨게이트)\r
\r
- **위치**: Zone 2와 3 사이.\r
- **설명**: 버려진 톨게이트 박스와 차단봉들이 엉망으로 널려 있는 병목 구간.\r
- **기능**: **대규모 매복 지점**. 좁은 통로를 통과할 때 양옆 사무실에서 좀비들이 튀어나오므로 화력으로 뚫어야 함.\r
- **비주얼**: 깜빡이는 경보 신호등과 흩날리는 지폐들.\r
\r
### POI 4: Central Terminal (중앙 터미널)\r
\r
- **위치**: Zone 3 피날레 구역.\r
- **설명**: 거대한 유리 돔 지붕을 가진 버스 터미널 건물.\r
- **기능**: **피날레 무대**. 마지막 버스가 출발하기 전까지 수단과 방법을 가리지 않고 광장을 가로질러 승강장까지 도달해야 함.\r
- **연출**: 버스 엔진 소리와 함께 서서히 닫히는 정문, 그리고 그 뒤로 쫓아오는 수천 마리의 좀비 시네마틱.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 제한 시간이 플레이어에게 공정한가? (실수 한두 번은 만회 가능하도록)\r
- [ ] 차량 위를 달릴 때 발소리(금속음)가 경쾌하게 들리는가?\r
- [ ] 마지막 버스 탑승 연출이 충분히 극적이고 보상감이 있는가?\r
`,j2=`# S27: Hospital Nightmare (병원 악몽)\r
\r
> **"이곳은 사람을 살리는 곳이었다. 지금은 아니다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **서바이벌 호러 (자원 관리)**\r
- **주인공**: Sarah Miller (간호사)\r
- **3C 특성**:\r
  - **Camera**: 숄더뷰 (매우 좁은 시야, 폐쇄감), 손전등 조명만 의존\r
  - **Character**: 전투력 낮음, 의학 지식\r
  - **Controls**: 조준/사격(흔들림 심함), 치료 키트 제작, 숨참기\r
- **핵심 목표**: 좀비들에게 점령당한 종합 병원에서, 동생을 살릴 필수 항생제를 찾아 탈출하라.\r
- **The Vibe**: 소름 끼침, 어둠, 정적, 점프 스케어. (참고: *The Last of Us Part II* (Hospital), *Resident Evil*, *Silent Hill*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Dead Zones - 'St. Mary's Hospital'\r
- **색상 팔레트**:\r
  - **주색상**: 클리니컬 화이트 (#F0F8FF) - 병원 복도 (피 묻음)\r
  - **보조색**: 이머전시 레드 (#FF0000) - 비상 유도등\r
  - **강조색**: 다크니스 (#000000) - 손전등이 비치지 않는 곳\r
- **도형 이론**:\r
  - **미로**: 복잡하게 얽힌 병실과 복도.\r
  - **닫힌 문**: 잠긴 병실들 (호기심과 공포).\r
- **전체 구조**:\r
  - **Zone 1**: 응급실 (ER) - 진입 및 탐색\r
  - **Zone 2**: 입원 병동 - 스텔스 (클리커)\r
  - **Zone 3**: 지하 약제실 - 보스전 및 탈출\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 없음 (실내). 대신 층별 안내판이 위치를 알려줌.\r
- **Local Landmark**:\r
  - Zone 1: 난장판이 된 접수 데스크 (Reception)\r
  - Zone 2: 비닐로 격리된 중환자실 (ICU)\r
  - Zone 3: 거대한 약품 냉장고\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 응급실의 침묵 (Silence in the ER)\r
\r
- **공간**: 1층 응급실\r
- **페이싱**: **Medium Tension** (탐색, 점프 스케어)\r
- **레벨 디자인 기법**:\r
  - **조명 연출**: 깜빡이는 형광등이 간헐적으로 시야를 차단.\r
  - **환경 스토리텔링**: 휠체어에 묶인 채 감염된 환자, 의료진의 절박한 쪽지.\r
- **게임플레이**:\r
  - 잠긴 문을 열기 위해 보안 카드 찾기.\r
  - 시체인 줄 알았던 좀비가 갑자기 일어나는 연출.\r
  - 알코올과 붕대를 조합해 응급 처치 키트 제작.\r
\r
### Act 2: 소리 없는 죽음 (Hush)\r
\r
- **공간**: 3층 입원 병동\r
- **페이싱**: **High Tension** (스텔스)\r
- **레벨 디자인 기법**:\r
  - **청각 플레이**: 바닥에 깨진 유리조각(소음 유발)을 피해 이동해야 함.\r
  - **적 배치**: 눈은 멀었지만 소리에 민감한 특수 좀비(Clicker) 배치.\r
- **게임플레이**:\r
  - 벽돌이나 병을 던져 좀비를 유인하고 통과.\r
  - 숨참기 기능으로 좀비가 바로 옆을 지나갈 때 발각 회피.\r
\r
### Act 3: 최후의 처방 (The Prescription)\r
\r
- **공간**: 지하 약제실 및 주차장\r
- **페이싱**: **Very High Tension** (도주)\r
- **레벨 디자인 기법**:\r
  - **보스 구역**: 좁은 약제실 통로에서 거대 비만 좀비(Bloater)와 전투.\r
  - **추격**: 약을 챙기는 순간 경보가 울리며 모든 좀비가 몰려옴.\r
- **게임플레이**:\r
  - 샷건을 얻어(유일한 중화기) 보스 처치.\r
  - 앰뷸런스 키를 찾아 주차장으로 탈출.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Nursery Station (간호사 스테이션)\r
\r
- **위치**: 각 층 복도 중앙.\r
- **설명**: 둥근 형태의 접수 데스크. 주변에 흩어진 서류와 깨진 유리가 가득함.\r
- **기능**: **세이브 포인트 및 거점**. 층별 병실 지도를 확인하고 저장할 수 있는 유일한 안전 구역.\r
- **비주얼**: 깜빡이는 모니터 화면과 '조용히 하세요'라고 적힌 피 묻은 팻말.\r
\r
### POI 2: The Silent ICU (숨죽인 중환자실)\r
\r
- **위치**: Zone 2 3층 끝.\r
- **설명**: 투명한 격리 필름이 천장에서 내려와 복도를 감싼 구간.\r
- **기능**: **극한의 스텔스 구간**. 소리에 민감한 특수 좀비(클리커)들이 대거 포진해 있어 숨참기 기능을 활용해 통과해야 함.\r
- **연출**: 격리 필름 너머로 보이는 좀비의 으르렁거리는 실루엣과 바닥의 피 고임.\r
\r
### POI 3: The Pharmacy (약제실)\r
\r
- **위치**: Zone 3 지하 1층 깊숙한 곳.\r
- **설명**: 두꺼운 철창으로 보호된 약품 창고. 비상 전력으로 차가운 푸른 빛이 도는 곳.\r
- **기능**: **최종 목표 지점**. 항생제 박스를 확보하는 순간 강력한 보스(블로터)가 등장하며 추격전이 시작됨.\r
- **비주얼**: 수천 개의 약병이 진열된 선반과 차가운 안개가 서린 냉동 보관함.\r
\r
### POI 4: Roof Helipad (옥상 헬기장)\r
\r
- **위치**: 건물의 최상층 옥상.\r
- **설명**: 거대한 'H' 마크가 그려진 개방된 공간.\r
- **기능**: **탈출 및 피날레 보스전**. 헬기를 소환하고 올 때까지 몰려오는 좀비 떼를 막아내야 하는 마지막 관문.\r
- **연출**: 비바람이 몰아치는 옥상, 멀리서 들려오는 헬기 로터 소리와 불타는 도심의 야경.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 손전등 배터리 제한이 플레이어를 조급하게 만들되, 너무 빨리 닳지 않는가?\r
- [ ] 소리에 민감한 적(클리커)의 가청 범위가 시각적으로 또는 튜토리얼로 설명되는가?\r
- [ ] 병원 특유의 소음(심전도 기계 소리, 환풍기 소리)이 공포 분위기를 잘 살리는가?\r
`,A2=`# S28: Safe Zone Defense (세이프 존 방어)\r
\r
> **"우리에겐 더 이상 물러설 곳이 없다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **협동 멀티플레이 슈터 (Co-op PVE)**\r
- **주인공**: Sarah Miller (리더)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (전황 파악)\r
  - **Character**: 버퍼(Buffer) 및 힐러, 권총 사격\r
  - **Controls**: 바리케이드 수리, 아군 치료, 탄약 분배, 사격\r
- **핵심 목표**: 생존자 캠프로 쓰이는 학교 체육관에 몰려오는 좀비 호드를 막아내고, 구조 헬기가 올 때까지 환자들을 지켜라.\r
- **The Vibe**: 필사적임, 전우애, 아드레날린. (참고: *Left 4 Dead 2* (Survival), *Back 4 Blood*, *World War Z*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Dead Zones - 학교 체육관 (안전지대)\r
- **색상 팔레트**:\r
  - **주색상**: 짐 플로어 브라운 (#DEB887) - 나무 바닥\r
  - **보조색**: 매트리스 블루 (#4682B4) - 이재민 텐트\r
  - **강조색**: 플레어 레드 (#FF4500) - 구조 신호탄, 화염병\r
- **도형 이론**:\r
  - **사각형**: 체육관 전체 구조 (방어선).\r
  - **구멍**: 뚫린 창문과 천장 (적 진입로).\r
- **전체 구조**:\r
  - **Zone 1**: 1층 창문 및 출입구 (1차 방어선)\r
  - **Zone 2**: 2층 관람석 및 난간 (원거리 지원)\r
  - **Zone 3**: 옥상 헬기장 (탈출구)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 체육관 천장에 매달린 거대한 학교 엠블럼 현수막\r
- **Local Landmark**:\r
  - Zone 1: 농구 골대 아래 쌓아둔 보급품 상자\r
  - Zone 2: 방송실 (지휘 통제소)\r
  - Zone 3: 바닥에 그려진 거대한 'H' 마크\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 봉쇄 (Lockdown)\r
\r
- **공간**: 체육관 내부\r
- **페이싱**: **Low Tension** (준비 단계)\r
- **레벨 디자인 기법**:\r
  - **가시성**: 좀비가 들어올 수 있는 창문과 문에 붉은 스프레이로 'X' 표시.\r
  - **자원 배치**: 구석구석에 판자, 화염병, 구급상자 배치.\r
- **게임플레이**:\r
  - NPC들에게 판자를 날라 창문을 막게 시킴.\r
  - 바닥에 가시철조망 설치.\r
  - 무기고에서 주무기 선택.\r
\r
### Act 2: 그들이 온다 (They are Coming)\r
\r
- **공간**: 체육관 전체\r
- **페이싱**: **High Tension** (웨이브 전투)\r
- **레벨 디자인 기법**:\r
  - **다방향 위협**: 전면뿐만 아니라 환풍구, 천장 유리를 깨고 떨어지는 좀비들 (입체적 방어 필요).\r
  - **특수 감염체**: 아군을 낚아채는 스모커, 돌진하는 차저 등이 진형 붕괴 유도.\r
- **게임플레이**:\r
  - 뚫리는 바리케이드를 실시간으로 수리.\r
  - 쓰러진 아군 소생.\r
  - 고지대(2층)에서 저격 지원.\r
\r
### Act 3: 하늘에서 온 구원 (Salvation from Above)\r
\r
- **공간**: 체육관 옥상\r
- **페이싱**: **Climax** (탈출)\r
- **레벨 디자인 기법**:\r
  - **최후의 저항**: 헬기가 착륙할 때까지 개방된 옥상에서 사방의 적을 막아야 함.\r
  - **보스전**: 거대한 '탱크' 좀비가 헬기 착륙을 방해.\r
- **게임플레이**:\r
  - 탱크의 돌 던지기를 피하며 화력 집중.\r
  - 환자 NPC들을 먼저 헬기에 태우고 마지막에 탑승.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Supply Crate (보급 상자)\r
\r
- **위치**: Zone 1 농구 코트 정중앙.\r
- **설명**: 군용 녹색 금속 상자와 주변에 흩어진 탄약 보관함들.\r
- **기능**: **무한 보급 및 업그레이드**. 탄약과 투척 무기를 주기적으로 리필하며, 웨이브 사이 장비를 업그레이드할 수 있는 지점.\r
- **비주얼**: 보급을 위해 몰려든 생존자들과 무기를 점검하는 애니메이션 연출.\r
\r
### POI 2: The Balcony (관람석 발코니)\r
\r
- **위치**: Zone 2 2층 난간.\r
- **설명**: 체육관 전체를 내려다볼 수 있는 높은 위치.\r
- **기능**: **저격 및 환경 기믹**. 위에서 아군을 지원 사격하고, 천장에 매달린 거대한 점광등을 쏴서 아래 좀비들에게 떨어뜨릴 수 있음.\r
- **비주얼**: 난간에 설치된 급조된 모래주머니 바리케이드와 서치라이트.\r
\r
### POI 3: The Generator Room (발전기실)\r
\r
- **위치**: Zone 1 체육관 뒤편 지하실 입구.\r
- **설명**: 시끄러운 기계음과 기름 냄새가 진동하는 좁은 방.\r
- **기능**: **보조 목표**. 좀비가 전선을 끊으면 체육관 불이 꺼짐. 한 명의 플레이어가 가서 발전기를 수리하는 동안 다른 팀원들이 지켜줘야 함.\r
- **연출**: 전력이 복구될 때 웅장하게 켜지는 체육관 조명과 스피커 소음.\r
\r
### POI 4: Medical Tent (의료 텐트)\r
\r
- **위치**: Zone 1 출입구 반대편 구석.\r
- **설명**: 붉은 십자가 천막과 신음하는 환자들이 가득한 구역.\r
- **기능**: **절대 방어 구역**. 좀비가 이곳에 도달해 환자들을 공격하면 미션 실패 게이지가 급상승하므로 모든 화력을 집중해 수호해야 함.\r
- **연출**: 환자들을 안심시키는 NPC 대사와 긴박한 의료 기계 경고음.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 구조해야 할 환자 NPC들이 플레이어의 이동 경로를 막지 않는가?\r
- [ ] 창문이 깨지고 좀비가 쏟아져 들어오는 연출이 시원시원한가?\r
- [ ] 특수 좀비의 등장 사운드(큐)가 난전 속에서도 잘 들리는가?\r
`,O2=`# S29: Silent Runner (고요한 질주)\r
\r
> **"소리가 멈추는 곳에 안식이 있다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **오픈월드 워킹 시뮬레이터 / 배달**\r
- **주인공**: Runner (전문 배달부)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (등 뒤), 짐의 무게에 따라 카메라 흔들림 변화\r
  - **Character**: 스태미나, 균형 감각, 전투 회피\r
  - **Controls**: 균형 잡기(L2/R2), 달리기, 숨참기, 스캔\r
- **핵심 목표**: 두 생존자 캠프 사이를 오가며, 좀비 떼를 피해 중요 물자(백신, 식량)와 메시지를 전달하라.\r
- **The Vibe**: 고독, 아름다운 풍경 속의 공포, 여정의 피로와 보람. (참고: *Death Stranding*, *I Am Legend*, *The Road*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Dead Zones - 황폐한 고속도로와 숲\r
- **색상 팔레트**:\r
  - **주색상**: 더스트 옐로우 (#F4A460) - 마른 풀, 흙먼지\r
  - **보조색**: 스카이 그레이 (#B0C4DE) - 흐린 하늘\r
  - **강조색**: 루인 러스트 (#8B4513) - 녹슨 가드레일, 표지판\r
- **도형 이론**:\r
  - **긴 곡선**: 끝없이 이어지는 도로 (여정).\r
  - **수평선**: 광활한 평야 (고독).\r
- **전체 구조**:\r
  - **Zone 1**: 출발지 캠프 및 외곽 도로 (준비)\r
  - **Zone 2**: 좀비 밀집 구역 및 터널 (위기)\r
  - **Zone 3**: 목적지 캠프 진입로 (안도)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 목적지 캠프의 높은 라디오 타워 (빨간 불빛)\r
- **Local Landmark**:\r
  - Zone 1: 뒤집어진 채 반쯤 묻힌 트레일러 트럭\r
  - Zone 2: 덩굴로 뒤덮인 주유소\r
  - Zone 3: 캠프 입구의 바람개비 발전기들\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 길을 떠나다 (The Departure)\r
\r
- **공간**: 황무지 도로\r
- **페이싱**: **Low Tension** (루트 계획, 명상적)\r
- **레벨 디자인 기법**:\r
  - **파노라마 뷰**: 높은 곳에서 전체 경로를 보여주며 플레이어가 직접 안전한 길(산길 vs 도로)을 선택하게 함.\r
  - **날씨 변화**: 맑은 날씨에서 시작해 점차 비가 오며 분위기 변화.\r
- **게임플레이**:\r
  - 짐 배치(무게 중심) 최적화.\r
  - 망원경으로 전방의 좀비 무리(Horde) 위치 확인 및 마킹.\r
\r
### Act 2: 죽음의 비 (Rain of Death)\r
\r
- **공간**: 숲과 터널\r
- **페이싱**: **High Tension** (은신, 환경 위협)\r
- **레벨 디자인 기법**:\r
  - **지형 난이도**: 진흙탕이나 강물은 이동 속도를 늦추고 체력을 소모시킴.\r
  - **강제 전투 회피**: 터널 안은 좀비로 가득 차 있어, 연막탄을 쓰거나 완전히 우회해야 함.\r
- **게임플레이**:\r
  - 비를 맞으면 'Timefall'(장비 부식) 효과 발생, 동굴로 대피.\r
  - 숨참기로 휴면 상태의 좀비들 사이를 통과.\r
\r
### Act 3: 연결 (Connection)\r
\r
- **공간**: 목적지 캠프 앞\r
- **페이싱**: **Release** (성취감)\r
- **레벨 디자인 기법**:\r
  - **시각적 보상**: 어두운 밤이 되고, 멀리서 캠프의 따뜻한 불빛이 보임.\r
  - **음악**: 목적지에 가까워질수록 감성적인 보컬 곡이 BGM으로 깔림.\r
- **게임플레이**:\r
  - 마지막 스태미나를 짜내어 언덕 오르기.\r
  - 캠프 문이 열리고 생존자들의 환영을 받으며 물품 전달.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Rest Stop (휴게소)\r
\r
- **위치**: Zone 2 고속도로 중간 지점.\r
- **설명**: 반쯤 무너진 주유소와 그 옆의 작은 편의점 건물.\r
- **기능**: **중간 세이브 및 정비**. 장갑의 배터리를 충전하고, 짐의 내구도를 수리하며 스태미나를 완전히 회복할 수 있는 안전지대.\r
- **비주얼**: 바람에 흔들리는 'Open' 네온사인과 멀리서 들려오는 좀비의 울음소리 대비.\r
\r
### POI 2: Abandoned Tunnel (버려진 터널)\r
\r
- **위치**: Zone 2 산맥을 통과하는 입구.\r
- **설명**: 어둠 속에 좀비 떼가 득실거리는, 고무 탄 냄새가 가득한 어두운 터널.\r
- **기능**: **전략적 지름길**. 산길을 넘는 것보다 빠르지만, 소리 내지 않고 통과해야 하는 고난도 은신 구간.\r
- **비주얼**: 터널 벽면을 따라 흐르는 검은 액체와 좀비들의 숨참기 애니메이션.\r
\r
### POI 3: The Overlook (전망 바위)\r
\r
- **위치**: Zone 1에서 2로 넘어가는 언덕 정상.\r
- **설명**: 탁 트인 황무지를 내려다볼 수 있는 거대한 바위 절벽.\r
- **기능**: **망원경 관측 및 루트 계획**. 이곳에서 목적지 캠프의 라디오 타워를 확인하고, 이동 중인 좀비 호드의 흐름(The Horde Stream)을 파악.\r
- **연출**: 장엄한 BGM과 함께 펼쳐지는 멸망한 세계의 비극적인 아름다움.\r
\r
### POI 4: The Horde Stream (좀비 강)\r
\r
- **위치**: Zone 2와 3 사이 평야 전체.\r
- **설명**: 수천 마리의 좀비가 하나의 살아있는 유기체처럼 군집하여 이동하는 현상.\r
- **기능**: **동적 환경 장애물**. 이 흐름을 직접 관통하는 것은 불가능하며, 이들이 지나갈 때까지 숨어 있거나 멀리 우회해야 함.\r
- **비주얼**: 대지를 뒤덮은 회색 좀비 물결이 만드는 먼지 구름과 거대한 소음.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 걷는 행위 자체가 지루하지 않도록 지형의 물리적 반응(미끄러짐, 비틀거림)이 정교한가?\r
- [ ] 짐을 많이 실었을 때의 관성(Inertia)이 조작감에 잘 반영되어 있는가?\r
- [ ] 목적지 캠프의 불빛이 플레이어에게 충분한 심리적 안도감을 주는가?\r
`,R2=`# S30: The Hive (하이브)\r
\r
> **"여왕을 잡으면 개미들은 흩어진다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **잠입 스릴러 / 보스전**\r
- **주인공**: Runner (잠입 전문가)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (낮은 자세), 코너 피킹\r
  - **Character**: 소리 없음, 위장술(냄새)\r
  - **Controls**: 기어가기, 유인(돌 던지기), 암살, 전력 질주\r
- **핵심 목표**: 좀비들의 근거지(하이브)인 지하 쇼핑몰 깊숙한 곳으로 침투하여, 감염의 근원인 '하이브 퀸'의 샘플을 채취하고 탈출하라.\r
- **The Vibe**: 끈적거림, 생체 공포, 숨 막히는 긴장, 에일리언. (참고: *Alien: Isolation*, *Resident Evil 2 Remake* (NEST), *Stranger Things* (Upside Down))\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Dead Zones - 변이된 지하 쇼핑몰 'The Mega-Mall'\r
- **색상 팔레트**:\r
  - **주색상**: 플래시 레드 (#DC143C) - 생체 조직, 고기 벽\r
  - **보조색**: 슬라임 그린 (#ADFF2F) - 산성 점액, 알\r
  - **강조색**: 칠흑 블랙 (#000000) - 빛이 없는 구석\r
- **도형 이론**:\r
  - **유기적 아치**: 뼈와 살점으로 뒤덮인 복도 (내장 속에 들어온 느낌).\r
  - **구체**: 좀비 알, 포자 주머니 (터질 듯한 불안감).\r
- **전체 구조**:\r
  - **Zone 1**: 지하 주차장 (진입)\r
  - **Zone 2**: 쇼핑몰 아트리움 (미로)\r
  - **Zone 3**: 영화관 (하이브 중심부)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 쇼핑몰 중앙을 관통하며 자라난 거대한 기둥 모양의 생체 조직 (The Spine)\r
- **Local Landmark**:\r
  - Zone 1: 벽에 고치처럼 매달린 시체들\r
  - Zone 2: 점액질로 뒤덮인 에스컬레이터\r
  - Zone 3: 퀸이 서식하는 아이맥스 상영관 (스크린이 찢겨 있음)\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 짐승의 뱃속으로 (Belly of the Beast)\r
\r
- **공간**: 어둡고 축축한 지하 주차장\r
- **페이싱**: **High Tension** (극한의 스텔스)\r
- **레벨 디자인 기법**:\r
  - **환경 위험**: 바닥에 깔린 '알'들을 밟으면 터지면서 소음을 유발하고 새끼 좀비를 소환.\r
  - **안전지대**: 환풍구(Vent) 내부는 유일하게 적이 들어오지 못하는 안전 공간.\r
- **게임플레이**:\r
  - 좀비의 체액을 몸에 발라(위장) 냄새로 감지하는 적들을 속임 (지속 시간 제한).\r
  - 주차된 차량 밑으로 기어서 이동.\r
\r
### Act 2: 살아있는 미로 (Living Maze)\r
\r
- **공간**: 변이된 쇼핑몰 내부\r
- **페이싱**: **Medium Tension** (퍼즐 & 길찾기)\r
- **레벨 디자인 기법**:\r
  - **동적 지형**: 벽에 붙은 생체 조직이 숨을 쉬듯 움직이며 길을 막았다 열었다 함 (타이밍).\r
  - **수직성**: 에스컬레이터가 막혀 있어 간판을 밟거나 덩굴을 타고 층간 이동.\r
- **게임플레이**:\r
  - 가연성 가스통을 모아 길을 막는 생체막을 태워버림.\r
  - 소리로 적을 유인해 함정(식충 식물 형태의 변이체)에 빠뜨림.\r
\r
### Act 3: 여왕 사냥 (Regicide)\r
\r
- **공간**: 하이브 퀸의 둥지 (영화관)\r
- **페이싱**: **Boss Battle** (전투 & 도주)\r
- **레벨 디자인 기법**:\r
  - **페이즈**: 1페이즈(잠입 채취) -> 2페이즈(발각 및 도주).\r
  - **추격전**: 올 때와는 달리 벽들이 무너지고 새로운 길이 열리며 직선적인 도주로 형성.\r
- **게임플레이**:\r
  - 잠자고 있는 퀸에게 접근해 주사기로 샘플 채취 (심장박동 QTE).\r
  - 깨어난 퀸과 좀비 떼에게 쫓기며 지하철 선로로 탈출.\r
  - 폭발물을 터뜨려 뒤따라오는 터널을 무너뜨림.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Cocoon Wall (고치 벽)\r
\r
- **위치**: Zone 1과 2를 잇는 통로 전체.\r
- **설명**: 사람 크기의 붉은색 고치들이 살점 덩어리에 박혀 꿈틀거리며 벽면을 가득 채운 곳.\r
- **기능**: **경보 장치**. 일정 속도 이상으로 뛰거나 소음을 내면 고치가 찢어지며 자폭형 좀비들이 튀어나와 플레이어를 추격함.\r
- **비주얼**: 심장 박동처럼 두근거리는 고치들과 그 사이로 흐르는 기괴한 점액질.\r
\r
### POI 2: Spawning Pools (부양 연못)\r
\r
- **위치**: Zone 2 쇼핑몰 아트리움 바닥.\r
- **설명**: 산성 액체가 담긴 웅덩이들이 곳곳에 산재해 있는 분수대 주변.\r
- **기능**: **환경 퍼즐**. 액체를 얼리거나, 떠다니는 시체 발판을 이용해 좀비에게 들키지 않고 건너가야 함.\r
- **비주얼**: 형광색으로 빛나는 산성 액체와 부식된 금속 구조물들.\r
\r
### POI 3: The Queen's Nest (여왕의 둥지)\r
\r
- **위치**: Zone 3 아이맥스 영화관 상영관.\r
- **설명**: 상영관 전체가 거대한 유기체 둥지로 변해 있으며, 찢어진 스크린 위치에 퀸이 앉아 있음.\r
- **기능**: **보스 전투 및 채집장**. 퀸의 뒤로 몰래 다가가 샘플을 채취하거나, 주변의 폭발물을 이용해 퀸을 무력화시켜야 함.\r
- **연출**: 화면 전체를 덮는 퀸의 비명과 함께 천장에서 떨어지는 생체 조직들.\r
\r
### POI 4: Ventilation Hub (환풍 허브)\r
\r
- **위치**: 맵 전체를 연결하는 유지보수 통로.\r
- **설명**: 지상으로 연결된 유일하게 좀비 조직이 닿지 않은 좁은 철제 통로.\r
- **기능**: **안전 통로 및 도주로**. 적의 시야를 피할 수 있는 유일한 공간이지만, 공기가 부족하여 장기간 체류 불가능.\r
- **비주얼**: 좁고 긴 터널 내부와 밖에서 비치는 필터링 된 오렌지색 조명.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 바닥의 알(함정)들이 어둠 속에서도 식별 가능한가? (미세한 발광 효과)\r
- [ ] 환풍구 이동 시, 밖의 적들이 돌아다니는 그림자나 소리가 공포감을 주는가?\r
- [ ] 하이브 퀸의 디자인이 일반 좀비와 확연히 다르고 압도적인가?\r
`,L2=`# S31: The Sky Heist (하늘의 도적들)\r
\r
> **"하늘에 길이 없다면, 만들면 된다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **잠입 액션 / 하이스트 (Heist)**\r
- **주인공**: Captain Gearheart (공적)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (자유로운 등반), 비행선 난간에서 아래를 볼 때의 아찔함 강조\r
  - **Character**: 기계 의수(갈고리), 민첩함\r
  - **Controls**: 그래플링 훅, 증기 연막탄, 기계 장치 해킹(톱니바퀴 조작)\r
- **핵심 목표**: 황실 비행선 'Leviathan' 호에 침투하여, 비밀 무기 설계도를 훔치고 개인용 글라이더로 탈출하라.\r
- **The Vibe**: 스팀펑크, 구름 위의 모험, 기계적 정교함. (참고: *Bioshock Infinite*, *Uncharted*, *Dishonored*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Aether Empire - 구름 위를 나는 거대 비행 함대\r
- **색상 팔레트**:\r
  - **주색상**: 브라스 골드 (#B5A642) - 황동 파이프, 장식\r
  - **보조색**: 스카이 블루 (#87CEEB) - 탁 트인 하늘\r
  - **강조색**: 스팀 화이트 (#F5F5F5) - 뿜어져 나오는 증기\r
- **도형 이론**:\r
  - **곡선**: 비행선의 유선형 몸체, 풍선 (부드러움)\r
  - **톱니바퀴**: 복잡하게 맞물린 기계 장치 (정교함)\r
- **전체 구조**:\r
  - **Zone 1**: 호위함 갑판 및 외부 (접근)\r
  - **Zone 2**: 리바이어던 호 화물칸 및 엔진실 (잠입)\r
  - **Zone 3**: 함교 및 금고 (탈취)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 함대 중앙의 압도적 크기를 자랑하는 황금색 비행선 'Leviathan'\r
- **Local Landmark**:\r
  - Zone 1: 회전하는 거대 프로펠러\r
  - Zone 2: 붉은 빛이 감도는 보일러실\r
  - Zone 3: 함교의 거대한 유리 돔 창문\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 구름 속의 접근 (Approach)\r
\r
- **공간**: 소형 호위함들의 갑판\r
- **페이싱**: **High Tension** (아크로바틱 이동)\r
- **레벨 디자인 기법**:\r
  - **동적 플랫폼**: 비행선들이 위아래로 흔들리며 간격이 변함. 타이밍에 맞춰 갈고리 발사.\r
  - **바람**: 강풍이 부는 방향으로 점프 거리가 늘어남.\r
- **게임플레이**:\r
  - 호위함의 경비병을 조용히 처리하고 대공포 무력화.\r
  - 리바이어던 호의 닻줄을 타고 메인 비행선으로 도약.\r
\r
### Act 2: 엔진의 심장 (Heart of the Engine)\r
\r
- **공간**: 리바이어던 호 내부 (엔진실 ~ 화물칸)\r
- **페이싱**: **Low to Medium** (퍼즐 & 은신)\r
- **레벨 디자인 기법**:\r
  - **소음 활용**: 엔진이 굉음을 낼 때(주기적) 총을 쏘거나 뛰면 들키지 않음.\r
  - **증기 해저드**: 파이프에서 뿜어져 나오는 뜨거운 증기를 피해 이동. 밸브를 잠가 길을 만듦.\r
- **게임플레이**:\r
  - 정비공으로 변장하거나 환풍구로 이동.\r
  - 복잡한 기어 퍼즐을 풀어 보안 문 개방.\r
\r
### Act 3: 최후의 비행 (The Great Escape)\r
\r
- **공간**: 함교 및 상부 갑판\r
- **페이싱**: **Maximum Tension** (전투 & 탈출)\r
- **레벨 디자인 기법**:\r
  - **개방감**: 좁은 내부에서 탁 트인 갑판으로 나오며 하늘이 펼쳐짐.\r
  - **파괴 연출**: 비행선이 공격받아 기울어지며(타이타닉) 지형이 변함.\r
- **게임플레이**:\r
  - 금고에서 설계도 탈취 후 경보 발령.\r
  - 황실 근위대(기계 갑옷)와 전투.\r
  - 폭발하는 비행선에서 글라이더를 펼치고 낙하하며 추격기 따돌리기.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Propeller Walk (프로펠러 길)\r
\r
- **위치**: Zone 1 호위함 갑판 끝자락.\r
- **설명**: 거대한 회전 날개들 사이로 아슬아슬하게 이어진 좁은 유지보수 난간.\r
- **기능**: **즉사 구간 및 낙하 공포**. 날개에 닿으면 즉사하며, 강한 기류 때문에 캐릭터의 이동이 밀리는 물리적 압박.\r
- **비주얼**: 발밑으로 끝없이 펼쳐진 구름 바다와 회전하는 날개가 만드는 잔상.\r
\r
### POI 2: The Boiler Room (보일러실)\r
\r
- **위치**: Zone 2 리바이어던 호 하부.\r
- **설명**: 수많은 파이프와 피스톤이 증기를 뿜으며 역동적으로 움직이는 붉고 뜨거운 방.\r
- **기능**: **은신 보강 기믹**. 주기적으로 뿜어지는 증기 연막 속에 숨어 경비병의 시야를 피하거나, 밸브를 과부하 시켜 혼란을 유도 가능.\r
- **비주얼**: 피스톤의 육중한 움직임과 파이프 사이로 새어 나오는 오렌지색 열기.\r
\r
### POI 3: The Cargo Hold (중앙 화물칸)\r
\r
- **위치**: Zone 2 중심부.\r
- **설명**: 제국 전역에서 수탈한 보물들과 기계 부품이 가득 쌓인 거대 창고.\r
- **기능**: **추가 파밍 및 퍼즐**. 크레인을 해킹해 화물 상자를 옮겨 높은 곳으로 올라가거나, 숨겨진 보물을 획득할 수 있는 장소.\r
- **비주얼**: 금제 장식품들과 차가운 기계 부품들이 묘하게 대비되는 공간.\r
\r
### POI 4: Bridge Glass Dome (함교 유리 돔)\r
\r
- **위치**: Zone 3 최상단.\r
- **설명**: 함대 전체를 조망할 수 있는 반구형 거대 유리창이 설치된 함교 공간.\r
- **기능**: **최종 클라이맥스 무대**. 설계도를 훔친 후 탈출하기 직전, 추격해오는 근위대와 최후의 결전을 벌이는 드라마틱한 장소.\r
- **연출**: 유리창 밖으로 보이는 노을진 하늘과 폭발하는 호위함들의 대장관(Spectacle).\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 고소공포증을 유발할 만큼 아래쪽 구름/지상 풍경이 아찔하게 표현되었는가? (Depth of Field)\r
- [ ] 갈고리 이동 시 타겟팅이 쉽고 직관적인가? (마그네틱 보정)\r
- [ ] 비행선의 흔들림이 멀미를 유발하지 않으면서 역동성을 주는가?\r
`,D2=`# S32: Gear Revolution (기어 혁명)\r
\r
> **"기계는 교체할 수 있지만, 사람은 교체할 수 없다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **군중 액션 / 점령전**\r
- **주인공**: Captain Gearheart (혁명가)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (난전 상황 파악용)\r
  - **Character**: 카리스마, 선동, 근접 격투\r
  - **Controls**: 군중 지휘(돌격/대기), 배너 설치, 연설\r
- **핵심 목표**: 악덕 기업주가 지배하는 지하 공장 도시 'Iron Bottom'에서 노동자들을 규합하여 혁명을 일으키고 공장을 멈춰라.\r
- **The Vibe**: 산업혁명, 석탄 연기, 민중의 노래, 레미제라블. (참고: *Assassin's Creed Syndicate*, *Fable III* (Revolution), *Frostpunk*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Aether Empire - 지하 공장 도시\r
- **색상 팔레트**:\r
  - **주색상**: 수트 블랙 (#36454F) - 매연, 노동자의 옷\r
  - **보조색**: 퍼니스 레드 (#FF4500) - 용광로 불빛\r
  - **강조색**: 호프 화이트 (#FFFFFF) - 혁명의 깃발, 전단지\r
- **도형 이론**:\r
  - **반복**: 끝없이 늘어선 컨베이어 벨트와 똑같은 작업복 (몰개성, 억압).\r
  - **파괴**: 부서진 기계, 깨진 유리창 (해방).\r
- **전체 구조**:\r
  - **Zone 1**: 노동자 숙소 (선동 및 규합)\r
  - **Zone 2**: 생산 라인 (게릴라전 및 파괴)\r
  - **Zone 3**: 감독관 타워 (보스전 및 점령)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 도시 중앙에 서 있는 거대한 황금 동상 (기업주의 상, 파괴 목표)\r
- **Local Landmark**:\r
  - Zone 1: 벽보가 붙은 중앙 광장 분수대\r
  - Zone 2: 용광로 위를 지나는 철제 다리\r
  - Zone 3: 타워 꼭대기의 사이렌 스피커\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 불씨를 지펴라 (Kindling the Fire)\r
\r
- **공간**: 빈민가 골목 및 광장\r
- **페이싱**: **Low to Rising** (잠입 -> 선동)\r
- **레벨 디자인 기법**:\r
  - **NPC 반응**: 처음엔 겁먹고 피하던 시민들이, 플레이어의 행동(전단지 배포, 경비병 제압)에 따라 점차 모여듦.\r
  - **사운드스케이프**: 기계 소음이 점차 군중의 함성 소리로 바뀌어감.\r
- **게임플레이**:\r
  - 감시 카메라(기계 눈)를 부수고 혁명 전단지 부착.\r
  - 광장 연단에 올라 연설 미니게임 (버튼 액션으로 호응 유도).\r
  - 첫 번째 바리케이드를 뚫고 노동자 무리(Followers) 확보.\r
\r
### Act 2: 기계를 멈춰라 (Break the Wheel)\r
\r
- **공간**: 거대 공장 내부\r
- **페이싱**: **High Tension** (난전)\r
- **레벨 디자인 기법**:\r
  - **환경 무기**: 뜨거운 증기 밸브를 열거나, 무거운 짐을 떨어뜨려 자동 기계 병사(Automaton)들을 파괴.\r
  - **수적 우세**: 플레이어 개인의 힘보다는, 따라오는 군중과 함께 밀어붙이는 느낌 강조.\r
- **게임플레이**:\r
  - 주요 생산 시설(보일러, 기어 박스) 파괴.\r
  - 구역대장(중보스)을 노동자들과 협력하여 제압.\r
  - 감옥에 갇힌 동료 구출.\r
\r
### Act 3: 타워 점령 (Towerfall)\r
\r
- **공간**: 기업 본사 타워\r
- **페이싱**: **Climax** (보스전)\r
- **레벨 디자인 기법**:\r
  - **버티컬리티**: 타워 외벽을 타고 오르거나 엘리베이터로 최상층 진입.\r
  - **상징적 파괴**: 보스전 승리 후 엔딩 컷신에서 거대 동상이 무너지는 장면 연출.\r
- **게임플레이**:\r
  - 거대 전투 로봇에 탑승한 기업주(The Chairman)와의 대결.\r
  - 로봇의 다리를 공격해 넘어뜨리고 파일럿을 끌어내림.\r
  - 타워 꼭대기에 혁명 깃발을 꽂으며 승리 선포.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Golden Statue (황금 동상)\r
\r
- **위치**: Zone 1과 2 사이 중앙 광장.\r
- **설명**: 오만한 표정의 기업주가 노동자들을 짓밟고 있는 거대한 황금색 조형물.\r
- **기능**: **상징적 점령 목표**. 이 동상을 무너뜨리고 혁명 깃발을 꽂는 순간 주변 NPC들이 열광하며 공격력이 상승하는 버프(혁명의 불길) 발생.\r
- **비주얼**: 노동자의 피 땀으로 닦인 번쩍이는 금색 조명과 그 아래 대비되는 어두운 광장.\r
\r
### POI 2: The Molten Bridge (용암 다리)\r
\r
- **위치**: Zone 2 공장 구역 중앙.\r
- **설명**: 끓어오르는 오렌지색 쇳물 위를 아슬아슬하게 가로지르는 좁은 철제 다리.\r
- **기능**: **전술적 병목 지점**. 적 자동 병사들을 유인해 쇳물로 밀쳐 낙사시키는 환경 처치(Environmental Kill)가 가능한 핵심 전투지.\r
- **연출**: 아래에서 올라오는 열기로 인해 화면이 이글거리는 시각 효과.\r
\r
### POI 3: The Siren Tower (사이렌 탑)\r
\r
- **위치**: Zone 2와 3 경계.\r
- **설명**: 공장 전체에 경보음을 울려 기계 병사들을 소환하는 거대한 스피커 타워.\r
- **기능**: **전략적 중단 목표**. 이곳을 점령하고 사이렌을 끄지 않으면 적의 증원이 끝없이 몰려오므로 최우선적으로 확보해야 함.\r
- **비주얼**: 회전하는 적색 경보등과 귀를 찢는 듯한 기계적 경보음.\r
\r
### POI 4: The Assembly Line (조립 라인)\r
\r
- **위치**: Zone 2 심부.\r
- **설명**: 거대한 팔들이 기계 병사들을 쉴 새 없이 찍어내는 복잡한 컨베이어 벨트 구역.\r
- **기능**: **동적 장애물 전투**. 움직이는 플랫폼 위에서 균형을 잡으며 적과 싸워야 하며, 중간중간 내려오는 수직 압착기를 피해 이동해야 함.\r
- **연출**: 불꽃이 튀는 용접 장면과 톱니바퀴가 맞물려 돌아가는 육중한 기계적 움직임.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 수십 명의 군중 NPC가 길을 막지 않고 자연스럽게 따라오는가? (군집 제어)\r
- [ ] 타격감(망치, 스패너)이 묵직하고 산업 현장의 느낌을 살리는가?\r
- [ ] 혁명의 고조감이 시각적(깃발, 횃불)과 청각적(함성, 노래)으로 잘 표현되는가?\r
`,Z2=`# S33: Ironclad Assault (철갑의 진격)\r
\r
> **"증기압 최대. 전속력으로 들이받아라!"**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **메카닉 액션 / 슈팅**\r
- **주인공**: Professor Steam (발명가/파일럿)\r
- **3C 특성**:\r
  - **Camera**: 콕핏 시점(1인칭) / 기체 외부(3인칭) 전환\r
  - **Character**: 거대하고 느리지만 강력함\r
  - **Controls**: 이동(탱크 조작), 주포 발사, 개틀링, 수리 드론\r
- **핵심 목표**: 직접 개발한 거대 증기 로봇 'Ironclad'에 탑승하여, 제국의 포위망을 뚫고 아군 기지를 방어하라.\r
- **The Vibe**: 육중함, 기계음, 폭발, 전장의 지배자. (참고: *Titanfall*, *Armored Core* (Heavy weight), *MechWarrior*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Aether Empire - 전쟁터가 된 황무지 'No Man's Land'\r
- **색상 팔레트**:\r
  - **주색상**: 워 머신 그레이 (#2F4F4F) - 로봇 장갑\r
  - **보조색**: 머디 브라운 (#8B4513) - 참호, 진흙\r
  - **강조색**: 스팀 블루 (#E0FFFF) - 아크 원자로 빛\r
- **도형 이론**:\r
  - **육각형**: 방어막, 조준경 UI (기계적 안정성).\r
  - **폭발의 구**: 전장 곳곳에서 터지는 포탄.\r
- **전체 구조**:\r
  - **Zone 1**: 아군 격납고 (튜토리얼 및 출격)\r
  - **Zone 2**: 참호 지대 (전진 및 돌파)\r
  - **Zone 3**: 적 요새 (공성 및 파괴)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 전장 어디서나 보이는 거대한 적의 이동 요새 'Behemoth'\r
- **Local Landmark**:\r
  - Zone 1: 로봇 정비 크레인\r
  - Zone 2: 무너진 벙커들\r
  - Zone 3: 거대한 대공포 3문\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 강철의 거인 (Iron Giant)\r
\r
- **공간**: 격납고 및 기지 앞마당\r
- **페이싱**: **Low to Medium** (조작감 익히기)\r
- **레벨 디자인 기법**:\r
  - **스케일 체감**: 격납고의 정비공들이 개미처럼 작게 보이며 로봇의 거대함을 강조.\r
  - **파괴 가능 환경**: 기지 앞의 나무나 벽을 밟고 지나가며 물리 엔진효과 과시.\r
- **게임플레이**:\r
  - 무기 시스템 점검 (타겟 사격).\r
  - 기지로 침투한 적 경전차 부대 격파.\r
\r
### Act 2: 참호 돌파 (Trench Run)\r
\r
- **공간**: 폭격이 쏟아지는 참호 지대\r
- **페이싱**: **High Tension** (화력전)\r
- **레벨 디자인 기법**:\r
  - **엄폐물**: 로봇이 너무 커서 참호에 숨을 수는 없지만, 무너진 건물이나 언덕 뒤에서 포격 회피.\r
  - **적 AI**: 보병들은 로봇을 보면 도망가거나 로켓을 쏘고 숨음. 전차들은 정면 승부.\r
- **게임플레이**:\r
  - 쏟아지는 박격포 탄막을 쉴드와 대쉬로 회피.\r
  - 적의 방어선(철조망, 대전차 장애물)을 몸으로 부수며 전진.\r
  - 과열(Overheat) 게이지 관리하며 무기 난사.\r
\r
### Act 3: 베헤모스 사냥 (Behemoth Down)\r
\r
- **공간**: 적 요새 앞\r
- **페이싱**: **Boss Battle** (초거대 보스전)\r
- **레벨 디자인 기법**:\r
  - **다부위 파괴**: 보스인 이동 요새의 다리 -> 포탑 -> 동력원 순으로 파괴해야 함.\r
  - **전장 변화**: 보스가 쓰러질 때마다 지형을 덮치며 새로운 엄폐물 생성.\r
- **게임플레이**:\r
  - 베헤모스의 다리를 공격해 기동 불능으로 만듦.\r
  - 등 위로 올라타서(점프젯 혹은 등반) 메인 코어에 폭탄 투척.\r
  - 폭발하는 요새를 뒤로하고 탈출(Sliding Escape).\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Mud Fields (진흙 평원)\r
\r
- **위치**: Zone 2 대규모 참호 지대 중앙.\r
- **설명**: 잦은 포격과 산성비로 인해 로봇의 거대한 발이 푹푹 빠질 정도로 질퍽해진 황무지.\r
- **기능**: **기동 저하 해저드**. 이곳에서는 이동 속도가 40% 감소하며, 적 저격병의 타겟이 되기 쉬우므로 부스터 게이지 관리가 필수적임.\r
- **비주얼**: 로봇이 걸을 때마다 사방으로 튀는 검은 진흙과 거대한 발자국.\r
\r
### POI 2: Anti-Air Battery (대공포 진지)\r
\r
- **위치**: Zone 3 요새 외곽 언덕.\r
- **설명**: 하늘을 향해 거대한 포신을 연달아 쏘아 올리는 3문의 제국군 대공포.\r
- **기능**: **전략적 제거 목표**. 이 포진지를 파괴하기 전까지는 아군의 공중 보급(수리 키트, 탄약)이 불가능함.\r
- **비주얼**: 포격 시 발생하는 엄청난 섬광과 지면 전체를 울리는 저음의 폭발음.\r
\r
### POI 3: Repair Docks (야전 수리 시설)\r
\r
- **위치**: Zone 1과 2 사이의 무너진 아군 초소.\r
- **설명**: 급초된 정비용 크레인과 연료통들이 널브러진 임시 정비 구역.\r
- **기능**: **중간 보급 및 세이브**. 로봇의 파손된 파츠를 긴급 수리하고 주포 탄약을 보충할 수 있는 귀중한 안전지대.\r
- **비주얼**: 로봇에서 뿜어져 나오는 열기를 식히는 냉각팬 소리와 바쁘게 움직이는 자동 수리 드론들.\r
\r
### POI 4: The Behemoth (베헤모스)\r
\r
- **위치**: Zone 3 요새 중앙.\r
- **설명**: 산 하나만한 크기의 초거대 다족 보행 병기. 수십 개의 포탑과 방어막 생성기를 갖춘 괴물.\r
- **기능**: **최종 보스 아레나**. 보스 기체 자체가 하나의 복층 레벨처럼 기능하며, 다리 관절 노출 -> 갑판 잠입 -> 중앙 동력 코어 파괴의 다단계 공략이 필요함.\r
- **연출**: 베헤모스가 한 발을 내디딜 때마다 주변 건물이 무너지고 화면이 거세게 흔들리는 압도적 스케일.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 로봇의 발소리와 화면 흔들림(Camera Shake)이 육중한 질량을 잘 전달하는가?\r
- [ ] 보병(보통 사람)과 로봇의 크기 대비가 명확하여 '지배자' 느낌을 주는가?\r
- [ ] 과열 시스템이 전투의 리듬(공격-냉각-공격)을 잘 조절하는가?\r
`,F2=`# S34: Traitor's Dilemma (배신자의 딜레마)\r
\r
> **"범인은 이 방 안에 있다. 아니면 내 머릿속에 있거나."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **추리 어드벤처 / 심리 스릴러**\r
- **주인공**: Professor Steam (탐정 모드)\r
- **3C 특성**:\r
  - **Camera**: 1인칭 (조사 집중), 대화 시 시네마틱 앵글\r
  - **Character**: 관찰력, 논리적 추론, 비전투(말싸움)\r
  - **Controls**: 증거 수집(돋보기), 심문(대화 선택), 추리 보드 조합\r
- **핵심 목표**: 폭풍우로 고립된 저택에서 벌어진 살인 사건의 범인을 찾고, 내부에 숨어든 제국군 스파이를 색출하라.\r
- **The Vibe**: 아가사 크리스티, 밀실 살인, 누아르, 긴장감. (참고: *Sherlock Holmes* (Games), *Among Us* (Logic), *L.A. Noire*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Aether Empire - 절벽 위의 고풍스러운 저택 'Blackwood Manor'\r
- **색상 팔레트**:\r
  - **주색상**: 벨벳 레드 (#800000) - 저택의 카펫, 피\r
  - **보조색**: 마호가니 브라운 (#4B3621) - 가구, 어두운 실내\r
  - **강조색**: 라이트닝 화이트 (#FFFFF0) - 창밖의 번개\r
- **도형 이론**:\r
  - **닫힌 사각형**: 저택의 방들 (밀실).\r
  - **복잡한 선**: 인물 관계도, 알리바이 타임라인.\r
- **전체 구조**:\r
  - **Zone 1**: 1층 로비 및 연회장 (사건 현장)\r
  - **Zone 2**: 2층 손님방 (탐문 및 수색)\r
  - **Zone 3**: 지하 와인 저장고 (비밀 및 결말)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 저택 중앙의 거대한 나선형 계단과 샹들리에\r
- **Local Landmark**:\r
  - Zone 1: 피 묻은 피아노\r
  - Zone 2: 잠겨 있는 서재 문\r
  - Zone 3: 벽 뒤에 숨겨진 비밀 통로 입구\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 폭풍의 밤 (Stormy Night)\r
\r
- **공간**: 사건 현장 (연회장)\r
- **페이싱**: **Low Tension** (조사, 미스터리)\r
- **레벨 디자인 기법**:\r
  - **환경 단서**: 깨진 유리잔, 멈춘 시계 등 시각적 단서를 배치하여 사건 시각 추론 유도.\r
  - **조명**: 번개가 칠 때만 보이는 창문의 지문 등 조명 효과 활용.\r
- **게임플레이**:\r
  - 시체 검시 및 주변 증거 확보.\r
  - 용의자 5명(저택의 손님들)의 1차 진술 확보 및 알리바이 확인.\r
\r
### Act 2: 거짓말의 미로 (Web of Lies)\r
\r
- **공간**: 저택 전체\r
- **페이싱**: **Medium Tension** (심문, 의심)\r
- **레벨 디자인 기법**:\r
  - **타임라인**: 각 용의자의 동선을 3D 맵에 재구성해 보며 모순점 발견.\r
  - **비밀 공간**: 책장을 밀면 나오는 비밀 통로와 엿보기 구멍 발견.\r
- **게임플레이**:\r
  - 용의자들을 압박하여 거짓말 간파(심박수/표정 변화 관찰).\r
  - 서로의 진술이 엇갈리는 부분을 파고들어 진실 규명.\r
  - 제2의 살인 예고장을 발견하고 막아야 함.\r
\r
### Act 3: 가면을 벗다 (Unmasking)\r
\r
- **공간**: 모두가 모인 로비\r
- **페이싱**: **High Tension** (최종 추리)\r
- **레벨 디자인 기법**:\r
  - **클라이맥스**: 탐정이 "범인은 바로 당신입니다!"를 외치는 전형적이지만 강력한 구도.\r
  - **반전**: 범인이 궁지에 몰려 인질극을 벌이거나 자폭 장치를 가동하는 액션 전환.\r
- **게임플레이**:\r
  - 모은 증거들을 조합해 범인 지목 (틀리면 배드 엔딩).\r
  - 범인의 최후 발악을 기계 장치(함정)를 작동시켜 제압.\r
  - 스파이가 훔치려던 기밀 문서를 되찾음.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Study (서재)\r
\r
- **위치**: Zone 2 저택 동쪽 윙.\r
- **설명**: 바닥부터 천장까지 고서로 가득 찬, 마호가니 향이 밴 무거운 분위기의 공간.\r
- **기능**: **동기 분석의 장**. 주인의 숨겨진 일기장과 용의자들의 관계가 적힌 비밀 장부를 통해 살인 사건의 근본적인 원한 관계를 파악 가능.\r
- **비주얼**: 창밖에서 치는 번개에 순간적으로 비치는 책장 너머의 숨겨진 금고.\r
\r
### POI 2: The Dining Hall (대연회장)\r
\r
- **위치**: Zone 1 저택 중앙.\r
- **설명**: 길게 늘어선 테이블에 촛대와 은식기들이 화려하게 세팅된 공간. 최초의 살인이 일어난 현장.\r
- **기능**: **현장 재구성**. 흩어진 와인 잔과 정지된 시계의 위치를 통해 범행 당시의 소요 시간과 인물들의 배치를 추리 보드에 기록 가능.\r
- **비주얼**: 피 묻은 하얀 식탁보와 부서진 샹들리에 조각들이 만드는 아이러니한 화려함.\r
\r
### POI 3: The Clock Tower Attic (시계탑 다락방)\r
\r
- **위치**: 저택 최상단.\r
- **설명**: 거대한 톱니바퀴들이 삐걱거리며 돌아가는, 먼지 쌓인 은밀한 꼭대기 방.\r
- **기능**: **히든 관측 포인트**. 이곳에서 저택 마당을 내려다보며 누군가가 시체를 유기하거나 공범과 접선하는 장면을 실시간(특정 시점)으로 목격 가능.\r
- **연출**: 거대한 종 소리가 울릴 때마다 먼지가 천장에서 떨어지고 바닥이 진동하는 청각적 압박.\r
\r
### POI 4: The Secret Cellar (비밀 지하실)\r
\r
- **위치**: Zone 3 지하 와인 저장고 안쪽.\r
- **설명**: 겉보기에는 평범한 와인 오크통들이 쌓인 곳이나, 특정 통을 돌리면 나타나는 제국군 통신실.\r
- **기능**: **장르 반전의 열쇠**. 단순 치정 살인인 줄 알았던 사건이 국가적 음모와 스파이전임을 드러내는 결정적 장소이며, 마지막 잠입 퍼즐이 존재.\r
- **비주얼**: 고풍스러운 저택 아래 숨겨진 차갑고 정교한 마법공학 통신 장비들의 푸른 빛.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 증거 수집 시 시각적 표시(하이라이트)가 너무 노골적이지 않아 탐색의 재미를 주는가?\r
- [ ] 추리 실패 시 바로 게임 오버가 아니라 다른 전개(잘못된 범인 구속 -> 진범의 추가 범행)로 이어지는가?\r
- [ ] 번개 소리와 타이밍이 긴장감을 고조시키는 연출로 잘 쓰였는가?\r
`,$2=`# S35: Time Tangled (뒤엉킨 시간)\r
\r
> **"과거를 고치면 미래가 부서진다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **퍼즐 플랫폼 / 액션**\r
- **주인공**: Lily (시간 여행자)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (사이드뷰/쿼터뷰 혼합)\r
  - **Character**: 작고 재빠름, 시간 조작 장치 보유\r
  - **Controls**: 점프, 렌치 공격, 시간 되감기/느리게 하기\r
- **핵심 목표**: 고장 난 타임 머신으로 인해 뒤엉킨 시간선을 바로잡기 위해, 과거와 미래를 오가며 퍼즐을 풀고 원인을 제거하라.\r
- **The Vibe**: 환상적, 몽환적, 복잡함, 픽사 스타일. (참고: *Ratchet & Clank: A Rift Apart*, *Portal*, *Braid*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Aether Empire - 시간 연구소 'Chronos Lab'\r
- **색상 팔레트**:\r
  - **주색상**: 퓨처 화이트 (#FFFFFF) - 미래(깨끗함)\r
  - **보조색**: 앤티크 세피아 (#704214) - 과거(낡음)\r
  - **강조색**: 타임 블루 (#1E90FF) - 시간 균열, 포털\r
- **도형 이론**:\r
  - **겹침**: 같은 공간이지만 과거(온전함)와 미래(폐허)가 겹쳐 보임.\r
  - **포털**: 시공간을 잇는 원형 구멍.\r
- **전체 구조**:\r
  - **Zone 1**: 현재의 연구소 (튜토리얼)\r
  - **Zone 2**: 50년 전 과거 (원인 수정)\r
  - **Zone 3**: 100년 후 미래 (결과 확인 및 탈출)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 연구소 중앙의 거대한 모래시계 (The Grand Hourglass)\r
- **Local Landmark**:\r
  - Zone 1: 폭발 직전의 타임 머신\r
  - Zone 2: 건설 중인 연구소와 젊은 박사님\r
  - Zone 3: 덩굴 식물로 뒤덮여 무너진 연구소 폐허\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 사고 발생 (The Incident)\r
\r
- **공간**: 현재 시점의 연구소\r
- **페이싱**: **Medium Tension** (혼란, 튜토리얼)\r
- **레벨 디자인 기법**:\r
  - **메카닉 학습**: 무너진 다리를 '시간 되감기' 능력으로 복구하여 건너는 법 학습.\r
  - **동결**: 폭발하는 파편들이 공중에 멈춰 있어 그것을 발판으로 삼아 이동.\r
- **게임플레이**:\r
  - 불안정한 시간 균열(Rift)을 피해 이동.\r
  - 시간 조절 장치(Chrono Glove) 획득.\r
\r
### Act 2: 원인을 찾아서 (To the Past)\r
\r
- **공간**: 50년 전 과거\r
- **페이싱**: **Low Tension** (퍼즐)\r
- **레벨 디자인 기법**:\r
  - **나비 효과**: 과거에서 작은 나무를 심으면, 현재로 돌아왔을 때 거대한 나무가 되어 다리 역할을 함.\r
  - **이중 퍼즐**: 과거의 상자를 옮겨두면 현재의 위치도 바뀜.\r
- **게임플레이**:\r
  - 과거의 연구원들을 도와 실험 실패를 막음.\r
  - 보안 로봇(초기형)들의 패턴을 파악해 잠입.\r
\r
### Act 3: 붕괴하는 미래 (Escaping the Future)\r
\r
- **공간**: 100년 후 미래\r
- **페이싱**: **High Tension** (도주)\r
- **레벨 디자인 기법**:\r
  - **환경 변화**: 같은 맵이지만 미래는 황폐화되어 지형이 완전히 다름 (익숙함과 낯섬의 공존).\r
  - **타임어택**: 현실 붕괴가 시작되어 맵의 가장자리부터 데이터가 삭제되듯 사라짐.\r
- **게임플레이**:\r
  - 미래의 변이된 생물들과 전투.\r
  - 거대한 시간 포식자(Time Eater)에게 쫓기며 현재로 돌아가는 포털로 질주.\r
  - 모든 시간선을 통합하고 정상화시키는 엔딩.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Rift Hall (균열의 방)\r
\r
- **위치**: Zone 1 메인 로비.\r
- **설명**: 시공간의 붕괴로 인해 왼쪽 벽은 과거의 고풍스러운 세피아톤, 오른쪽 벽은 미래의 차가운 화이트톤으로 찢어진 기묘한 방.\r
- **기능**: **타임라인 허브**. 캐릭터가 이동함에 따라 실시간으로 지형과 적의 타입이 과거/미래로 스위칭 되는 기믹을 처음으로 경험하는 장소.\r
- **비주얼**: 공중에 부유하는 깨진 타일들과 두 시간의 색감이 실처럼 엉켜있는 연출.\r
\r
### POI 2: The Grand Hourglass (거대 모래시계)\r
\r
- **위치**: 연구소 정중앙 홀.\r
- **설명**: 모래 대신 푸른색 액체(시간의 정수)가 흐르는 3층 높이의 거대 기계 모래시계.\r
- **기능**: **중력 및 속도 조절 장치**. 모래시계의 방향을 뒤집으면 레벨 전체의 중력이 반전되거나, 시간이 느려져 평소 건널 수 없던 빠른 플랫폼을 이용 가능.\r
- **연출**: 시계 내부에서 흐르는 정수의 신비로운 빛과 흐름 소리.\r
\r
### POI 3: The Old Oak (오래된 참나무)\r
\r
- **위치**: Zone 2 야외 정원 구역.\r
- **설명**: 과거 시점에는 작은 묘목이지만, 미래 시점에는 연구소 건물을 뚫고 자라난 거대한 고목.\r
- **기능**: **과거-미래 인과 관계 퍼즐**. 과거에서 비료를 주거나 물길을 터주면, 미래 시점의 나무 형태가 변하며 새로운 등반 경로(Platform)가 생성됨.\r
- **비주얼**: 수십 년의 세월이 순식간에 지나가며 나무가 자라나는 타임랩스 효과.\r
\r
### POI 4: The Time Eater's Path (시간 포식자의 길)\r
\r
- **위치**: Zone 3 무너진 미래 구역.\r
- **설명**: 데이터가 삭제되듯 지형이 검은 구멍 밑으로 사라지고 있는 공포스러운 탈출로.\r
- **기능**: **강제 추격 시퀀스 구역**. 뒤에서 쫓아오는 거대 차원 괴물을 피해, 사라져가는 지형 위를 극한의 타이밍 점프로 돌파해야 하는 피날레 무대.\r
- **연출**: 세계의 끝이 무너져 내리는 장엄하고도 공포스러운 시각/청각 효과.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 시간대에 따른 비주얼 변화(조명, 텍스처, BGM)가 즉각적이고 명확한가?\r
- [ ] '과거의 행동이 미래를 바꾼다'는 인과관계가 플레이어에게 직관적으로 전달되는가?\r
- [ ] 시간 조작 능력이 퍼즐 풀이뿐만 아니라 전투/이동에서도 유용하게 쓰이는가?\r
`,z2=`# S36: Clockwork Heart (태엽 심장)\r
\r
> **"심장이 멈춰도 사랑은 계속된다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **정밀 플랫포머 / 감성 어드벤처**\r
- **주인공**: Lily (정비공)\r
- **3C 특성**:\r
  - **Camera**: 사이드뷰 (Side-scrolling), 줌인/아웃으로 정밀함과 웅장함 표현\r
  - **Character**: 점프, 매달리기, 기계 수리\r
  - **Controls**: 더블 점프, 벽타기, 렌치 던지기(스위치 작동), 활강(우산)\r
- **핵심 목표**: 멈춰버린 도시의 심장인 거대 시계탑 꼭대기까지 올라가, 고장 난 메인 태엽을 수리하고 소중한 로봇 친구를 되살려라.\r
- **The Vibe**: 동화적, 따뜻함, 째깍거리는 소리, 힐링. (참고: *Celeste*, *Ori and the Blind Forest*, *Hugo*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Aether Empire - 거대 시계탑 'The Clocktower' 내부\r
- **색상 팔레트**:\r
  - **주색상**: 코퍼 브라운 (#B87333) - 구리 톱니바퀴\r
  - **보조색**: 오일 블랙 (#101010) - 기계 기름, 그림자\r
  - **강조색**: 하트 핑크 (#FF69B4) - 감정의 빛, 로봇의 코어\r
- **도형 이론**:\r
  - **원형**: 톱니바퀴 (회전, 반복).\r
  - **수직선**: 긴 체인, 추, 탑의 높이 (상승).\r
- **전체 구조**:\r
  - **Zone 1**: 시계탑 하부 (기어와 증기)\r
  - **Zone 2**: 중층부 (종과 체인)\r
  - **Zone 3**: 시계 전면부 및 꼭대기 (심장)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 꼭대기의 거대한 시계 문자판 (뒷면에서 바늘이 돌아가는 게 보임)\r
- **Local Landmark**:\r
  - Zone 1: 거대한 증기 피스톤\r
  - Zone 2: 1시간마다 울리는 거대한 종 (The Big Bell)\r
  - Zone 3: 빛을 잃은 메인 코어(Heart)\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 멈춘 시간 (Stopped Time)\r
\r
- **공간**: 어둡고 조용한 시계탑 하부\r
- **페이싱**: **Low Tension** (탐색, 기본기)\r
- **레벨 디자인 기법**:\r
  - **정적인 기계**: 톱니바퀴들이 멈춰 있어 발판 역할을 함. 수리하면 움직이기 시작함(난이도 상승).\r
  - **조명**: Lily가 지나갈 때마다 작은 전구들이 켜지며 길을 밝힘.\r
- **게임플레이**:\r
  - 기름칠을 해서 녹슨 레버 작동.\r
  - 점프와 벽타기로 수직 상승.\r
\r
### Act 2: 리듬 속에 (Inside the Rhythm)\r
\r
- **공간**: 다시 움직이기 시작한 중층부\r
- **페이싱**: **Medium Tension** (리듬 액션)\r
- **레벨 디자인 기법**:\r
  - **리듬 플랫폼**: 똑-딱 소리에 맞춰 발판이 나타났다 사라짐.\r
  - **환경 위험**: 거대한 추가 좌우로 그네처럼 움직이며 플레이어를 위협함.\r
- **게임플레이**:\r
  - 종 소리에 맞춰 점프 타이밍 잡기.\r
  - 회전하는 기어 사이를 렌치를 던져 멈추고 통과.\r
\r
### Act 3: 심장을 뛰게 하라 (Jumpstart)\r
\r
- **공간**: 시계탑 최상층\r
- **페이싱**: **High Tension** (어려운 플랫포밍)\r
- **레벨 디자인 기법**:\r
  - **아찔한 높이**: 시계 바늘 위에 서서 아래를 보면 도시 전체가 보임. 바람이 불어 밀려남.\r
  - **연속 동작**: 쉴 새 없이 움직이는 기계 장치들 위를 연속 점프와 활강으로 통과해야 함.\r
- **게임플레이**:\r
  - 부서진 로봇 친구의 부품을 모아 결합.\r
  - 메인 스프링을 감기 위한 마지막 등반.\r
  - 친구가 눈을 뜨고, 시계탑이 다시 힘차게 돌아가는 엔딩.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Pendulum Pit (진자 구덩이)\r
\r
- **위치**: Zone 2 시계탑 중층부 넓은 공간.\r
- **설명**: 수십 개의 날카로운 낫이 달린 거대 추들이 서로 다른 리듬으로 왕복하는 죽음의 구간.\r
- **기능**: **정밀 타이밍 챌린지**. 추의 궤적을 예측해 슬라이딩이나 이단 점프로 통과해야 하며, 중간에 잠시 쉴 수 있는 좁은 톱니바퀴 플랫폼 존재.\r
- **비주얼**: 추의 금속 날카로움에 반사되는 차가운 빛과 끼익거리는 기계음.\r
\r
### POI 2: The Face of Time (시간의 얼굴)\r
\r
- **위치**: Zone 3 시계탑 전면부 거대 시계 내부.\r
- **설명**: 외부에서 보이는 시계 바늘의 뒷면 장치들. 1분마다 회전하는 거대 기어들이 벽면을 가득 채움.\r
- **기능**: **회전형 퍼즐 플랫폼**. 거대한 분침 위에 올라타서 바늘이 특정 각도(예: 12시 방향)가 되었을 때만 도달할 수 있는 높은 곳의 통로로 도약해야 함.\r
- **연출**: 반투명한 시계 유리 너머로 비치는 도시의 노을 풍경과 거대한 바늘이 묵직하게 움직이는 진동.\r
\r
### POI 3: The Big Bell (광장의 거대 종)\r
\r
- **위치**: Zone 2 꼭대기 직전의 타종실.\r
- **설명**: 도시 전체에 시간을 알려주는 집 한 채만한 크기의 청동 종.\r
- **기능**: **충격파 해저드**. 종이 "뎅-" 하고 울릴 때마다 강력한 소음 파동이 발생해 플레이어를 뒤로 밀쳐내므로, 소리가 멎은 틈을 타서 빠르게 다리를 건너야 함.\r
- **청각**: 고막을 때리는 듯한 웅장하고 깊은 타종 소리와 에코 효과.\r
\r
### POI 4: The Steam Piston Forest (증기 피스톤 숲)\r
\r
- **위치**: Zone 1 시계탑 하부 동력실.\r
- **설명**: 수백 개의 수직 파이프에서 피스톤이 상하로 불규칙하게 솟아오르는 빽빽한 공간.\r
- **기능**: **수직 플랫포밍**. 솟아오르는 피스톤의 머리 부분을 밟고 위로 올라가야 하며, 뜨거운 김이 나오는 타이밍을 피해야 함.\r
- **비주얼**: 뿜어져 나오는 흰 증기와 피스톤의 상하 운동이 만드는 기계적인 숲의 형상.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 점프 컨트롤(Coyote time, Jump buffering)이 정교하여 플레이어가 억울하게 죽지 않는가?\r
- [ ] 기계 소음(똑딱, 끼익)이 음악과 조화되어 리듬감을 만드는가?\r
- [ ] 시각적으로 복잡한 배경(톱니바퀴) 속에서도 발판과 배경이 명확히 구분되는가?\r
`,B2=`# S37: First Contact (첫 번째 조우)\r
\r
> **"우주에서 가장 무서운 것은 침묵이 아니라, 낯선 목소리다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **SF 액션 어드벤처 / 탐사**\r
- **주인공**: Commander Nova (우주군 장교)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (숄더뷰), 헬멧 HUD 오버레이\r
  - **Character**: 무중력 이동, 제트팩, 스캐너\r
  - **Controls**: 점프 부스터, 에너지 라이플, 번역기 사용\r
- **핵심 목표**: 미지의 행성 'Xenon-4'에 착륙하여, 외계 종족의 문명을 조사하고 그들이 적대적인지 우호적인지 파악하라.\r
- **The Vibe**: 신비로움, 긴장감, 웅장한 자연, 미지와의 조우. (참고: *Mass Effect*, *Interstellar*, *Avatar*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Void Expanse - 외계 행성 Xenon-4의 정글\r
- **색상 팔레트**:\r
  - **주색상**: 바이오루미네센스 블루 (#00FFFF) - 발광 식물\r
  - **보조색**: 에일리언 퍼플 (#8A2BE2) - 외계 생명체, 하늘\r
  - **강조색**: 얼러트 옐로우 (#FFFF00) - 플레이어의 장비 UX\r
- **도형 이론**:\r
  - **기하학적 자연**: 육각형 벌집 모양 식물, 떠다니는 바위 (이질감).\r
  - **곡선**: 외계 건축물의 유선형 디자인 (고도로 발달한 문명).\r
- **전체 구조**:\r
  - **Zone 1**: 착륙 지점 (기본 탐사)\r
  - **Zone 2**: 외계 정글 (환경 위험)\r
  - **Zone 3**: 고대 사원 (첫 만남)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 하늘에 떠 있는 거대한 두 개의 위성 (Twin Moons)\r
- **Local Landmark**:\r
  - Zone 1: 추락한 연방 정찰선 잔해\r
  - Zone 2: 거대한 발광 버섯 군락\r
  - Zone 3: 공중에 떠 있는 금속 피라미드 (사원)\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 낯선 땅 (Strange New World)\r
\r
- **공간**: 탐사선 착륙지 인근\r
- **페이싱**: **Low Tension** (환경 적응)\r
- **레벨 디자인 기법**:\r
  - **중력 변화**: 지구보다 중력이 약해 점프가 높고 체공 시간이 김.\r
  - **환경 스캔**: 동식물을 스캔하여 도감에 등록하고 위험 요소(독성, 가시) 파악.\r
- **게임플레이**:\r
  - 베이스 캠프 설치 및 통신기 수리.\r
  - 사라진 선발대의 신호를 추적.\r
\r
### Act 2: 정글의 법칙 (Law of the Jungle)\r
\r
- **공간**: 밀도가 높은 발광 정글\r
- **페이싱**: **Medium Tension** (야생동물 전투)\r
- **레벨 디자인 기법**:\r
  - **반응형 식물**: 건드리면 터지거나 움츠러드는 식물들로 길 유도.\r
  - **위장 포식자**: 배경과 비슷하게 생긴 몬스터(스토커)가 숨어 있음.\r
- **게임플레이**:\r
  - 제트팩을 이용해 절벽과 계곡 횡단.\r
  - 덮쳐오는 토착 생물(Predator)들과의 전투.\r
\r
### Act 3: 그들이 온다 (They Are Here)\r
\r
- **공간**: 외계 사원 광장\r
- **페이싱**: **High Tension** (대화/전투 분기)\r
- **레벨 디자인 기법**:\r
  - **컷신 전환**: 사원 입구에 도착하면 외계 종족이 무기를 들고 나타나는 컷신.\r
  - **긴장된 대치**: 쏘지 않고 기다리면 대화 이벤트, 먼저 쏘면 전투 이벤트 발생.\r
- **게임플레이**:\r
  - 번역기 미니게임을 통해 외계어 해석 시도.\r
  - 선택지: "우리는 평화를 원한다" (무기 내림) vs "위협을 제거한다" (선제공격).\r
  - 결과에 따라 사원 문이 열리거나(환영), 경보가 울리며 몰려오는 적을 막아야 함(전투).\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Floating Rocks (부유석 지대)\r
\r
- **위치**: Zone 2에서 3으로 가는 길.\r
- **설명**: 자기장 이상으로 공중에 떠 있는 바위들.\r
- **기능**: **플랫포밍 챌린지**. 제트팩 연료를 조절하며 건너야 함.\r
- **비주얼**: 바위 사이로 흐르는 푸른색 자기장 스파크와 발밑의 까마득한 정글 절경.\r
\r
### POI 2: The Monolith (모노리스)\r
\r
- **위치**: Zone 3 사원 입구.\r
- **설명**: 매끄러운 검은 금속 비석. 알 수 없는 웅웅거리는 소리가 남.\r
- **기능**: **스토리 트리거**. 터치하면 주인공의 머릿속에 과거 이 행성에 일어났던 대재앙의 환영(비전)이 보임.\r
- **연출**: 화면 전체가 노이즈로 뒤덮이며 왜곡되는 시각적 연출.\r
\r
### POI 3: Bioluminescent Cave (발광 동굴)\r
\r
- **위치**: Zone 2 하부 지하 통로.\r
- **설명**: 외부 정글보다 훨씬 밀도 높은 빛을 내는 희귀 식물들이 가득한 동굴.\r
- **기능**: **은신 및 자원 파밍**. 빛이 없는 사각지대를 이용해 강력한 포식자를 피하거나, 희귀한 업그레이드 재료를 채집 가능.\r
- **비주얼**: 천장에서 내려온 형광 덩굴들과 바닥의 빛나는 이끼가 만드는 몽환적 풍경.\r
\r
### POI 4: The Sentinel Pillar (감시자의 기둥)\r
\r
- **위치**: Zone 3 사원 광장 중앙.\r
- **설명**: 외계 종족이 통신 및 방어용으로 사용하는 거대한 유선형 탑.\r
- **기능**: **방어전 이벤트 발생**. 번역 시도 도중 적대 세력이 몰려올 경우, 이 기둥의 에너지 실드를 활성화하여 거점으로 삼아 버텨야 함.\r
- **비주얼**: 기둥 상단부에 모여드는 강렬한 에너지 구체와 주변을 순찰하는 외계 드론들.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 외계 행성의 밤낮 변화가 시각적으로 극적인가? (밤에는 모든 식물이 발광)\r
- [ ] 제트팩 조작이 직관적이며 낙사 스트레스를 줄여주는가? (Fuel recharge)\r
- [ ] 첫 조우 시의 긴장감(쏠까 말까)이 연출로 잘 전달되는가?\r
`,H2=`# S38: Battle of Nexus Gate (넥서스 게이트 전투)\r
\r
> **"이 문이 뚫리면 지구는 끝이다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **SF 밀리터리 슈터 / 함대공 방어**\r
- **주인공**: Commander Nova (지휘관)\r
- **3C 특성**:\r
  - **Camera**: 1인칭 (FPS, 몰입감), 포탑 탑승 시 3인칭\r
  - **Character**: 전술적, 중화기 사용\r
  - **Controls**: 엄폐 사격, 수류탄, 공습 요청, 무중력 유영\r
- **핵심 목표**: 우주 정거장 'Nexus Gate'를 습격한 외계 함대의 강습 양륙을 저지하고, 게이트 제어권을 사수하라.\r
- **The Vibe**: 우주 전쟁, 긴박함, 무전 소리, 웅장한 함대전 배경. (참고: *Halo: Reach*, *Call of Duty: Infinite Warfare*, *Star Wars: Battlefront*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Void Expanse - 거대 우주 정거장 'Nexus Gate'\r
- **색상 팔레트**:\r
  - **주색상**: 메탈릭 실버 (#C0C0C0) - 정거장 복도\r
  - **보조색**: 얼러트 레드 (#FF0000) - 경보등, 레이저 탄환\r
  - **강조색**: 보이드 블랙 (#000008) - 깨진 창문 밖의 우주\r
- **도형 이론**:\r
  - **직선/복도**: 좁고 긴 전투 공간 (CQB).\r
  - **개방된 공간**: 격납고, 외벽 (대규모 전투).\r
- **전체 구조**:\r
  - **Zone 1**: 함교 및 지휘 통제실 (방어 서막)\r
  - **Zone 2**: 무중력 외벽 (우주 유영 전투)\r
  - **Zone 3**: 메인 격납고 (최종 방어)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 창밖으로 보이는 거대한 차원문(Gate)과 폭발하는 우주선들\r
- **Local Landmark**:\r
  - Zone 1: 홀로그램 전술 지도가 띄워진 작전 테이블\r
  - Zone 2: 부서진 태양광 패널 파편들\r
  - Zone 3: 정박해 있는 아군 기함 'The Aegis'\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 침입자 경보 (Itruder Alert)\r
\r
- **공간**: 정거장 내부 복도\r
- **페이싱**: **High Tension** (실내전)\r
- **레벨 디자인 기법**:\r
  - **초크 포인트**: 좁은 복도에 바리케이드를 치고 몰려오는 적 저지.\r
  - **환경 파괴**: 벽이 폭발하며 우주 공간으로 빨려 나가는 적들 (Decompression).\r
- **게임플레이**:\r
  - 쏟아지는 드롭 포드(Drop Pod)에서 나오는 외계 보병대 격퇴.\r
  - 해킹당한 보안 터렛을 파괴하거나 재해킹.\r
\r
### Act 2: 진공 속으로 (Into the Void)\r
\r
- **공간**: 정거장 외벽 (우주 공간)\r
- **페이싱**: **Medium to High** (3차원 이동 전투)\r
- **레벨 디자인 기법**:\r
  - **무중력(Zero-G)**: 위아래가 없는 360도 전투. 지형지물(안테나, 파편)을 잡고 이동.\r
  - **사운드**: 진공 상태라 먹먹한 소리(Muffled Sound) 효과 적용, 내 호흡 소리만 크게 들림.\r
- **게임플레이**:\r
  - 마그네틱 부츠를 켜고 끄며 벽을 타거나 날아서 이동.\r
  - 적의 강습선(Gunship)에 폭탄 부착 후 이탈.\r
\r
### Act 3: 격납고 사수 (Hold the Line)\r
\r
- **공간**: 거대 메인 격납고\r
- **페이싱**: **Climax** (전면전)\r
- **레벨 디자인 기법**:\r
  - **수직적 구조**: 2층 난간과 바닥 층을 오가며 입체적 교전.\r
  - **대규모 스케일**: 격납고 문이 열리고 적의 거대 로봇이 진입.\r
- **게임플레이**:\r
  - 아군 전투기(Starfighter)들이 이륙할 수 있도록 엄호.\r
  - 대공포를 직접 조작해 적 함선 격추.\r
  - 거대 보스 로봇의 약점(등 뒤의 방열판) 공략.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Breach Point (파공 지점)\r
\r
- **위치**: Zone 1 복도 끝.\r
- **설명**: 적의 강습선이 벽을 뚫고 들어온 구멍. 외부 우주가 일부 노출됨.\r
- **기능**: **동적 위험 구역**. 적들이 쏟아져 나오며, 파괴 시 우주 공간으로 주변 사물이 빨려 나가는 감압 하저드를 이용하여 적을 한꺼번에 처치 가능.\r
- **비주얼**: 찢겨진 금속 판과 밖으로 새어 나가는 연기, 그리고 그 너머로 보이는 거대한 함대전.\r
\r
### POI 2: Anti-Air Cannon (대공포)\r
\r
- **위치**: Zone 3 야외 플랫폼 상단.\r
- **설명**: 정거장에 부착된 거대한 쌍열 마그네틱 포.\r
- **기능**: **미니게임 및 전략 목표**. 직접 조작하여 몰려오는 적의 강습선(Gunship)을 요격해야 아군 함대 'The Aegis'의 이륙 시간을 벌어줄 수 있음.\r
- **연출**: 포격 시 정거장 전체가 흔들리는 묵직한 반동 소리와 섬광.\r
\r
### POI 3: Gravity Generator (중력 발생기실)\r
\r
- **위치**: Zone 2 중심부 전력실.\r
- **설명**: 중력 제어 장치가 손상되어 중력이 주기적으로 꺼졌다 켜졌다 하는 방.\r
- **기능**: **전투 변수 발생**. 중력이 꺼졌을 때는 엄폐물 위로 떠올라 사격해야 하며, 켜졌을 때는 빠르게 낙하하는 물체들을 피해 이동해야 함.\r
- **비주얼**: 제어 장치 주변으로 튀는 정전기와 공중에 떠다니는 수백 개의 탄피들.\r
\r
### POI 4: Med-Evac Bay (의료 후송 데크)\r
\r
- **위치**: Zone 1과 3 사이의 연결 통로.\r
- **설명**: 부상당한 군인들과 파괴된 의료 드론들이 널브러진 비참한 전투 현장.\r
- **기능**: **내러티브 및 보급**. 살려달라는 아군 NPC들의 요청이나 통신 로그를 통해 전쟁의 비극을 느끼게 하며, 긴급 치료 키트를 대량 확보 가능.\r
- **연출**: 붉은 불빛이 돌아가는 경보등 아래에서 절박하게 교전하는 아군들의 외침 소리.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 무중력 전투 시 방향 감각 상실(멀미)을 방지할 시각적 가이드(수평선 표시 등)가 있는가?\r
- [ ] 실내전과 우주전의 사운드 디자인 차이가 명확하여 몰입감을 주는가?\r
- [ ] 대규모 함대전 배경이 프레임 드랍 없이 화려하게 연출되는가? (Skybox 활용)\r
`,W2=`# S39: The Ancient Ruins (고대 유적)\r
\r
> **"그들은 우리가 오기 훨씬 전부터 여기에 있었다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **고고학적 SF 호러 / 퍼즐**\r
- **주인공**: Kael (외계인 고고학자)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (등 뒤), 좁은 통로에선 클로즈업\r
  - **Character**: 지적임, 고대 기술 사용\r
  - **Controls**: 텔레키네시스(염동력), 유물 작동, 홀로그램 분석\r
- **핵심 목표**: 죽음의 행성 지하에서 발견된 '선구자(Progenitor)'의 유적을 탐사하고, 그들이 남긴 경고 메시지를 해석하라.\r
- **The Vibe**: H.R. 기거 스타일, 생체 기계, 음산함, 미스터리. (참고: *Prometheus*, *Scorn*, *Returnal*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Void Expanse - 사막 행성 지하 'The Necropolis'\r
- **색상 팔레트**:\r
  - **주색상**: 본 화이트 (#F5F5DC) - 거대한 뼈 같은 건축물\r
  - **보조색**: 섀도우 그레이 (#2F4F4F) - 깊은 어둠\r
  - **강조색**: 미스틱 앰버 (#FFBF00) - 고대 홀로그램, 에너지\r
- **도형 이론**:\r
  - **갈비뼈 아치**: 생체 내부를 연상시키는 통로 구조.\r
  - **거대한 얼굴**: 벽면에 새겨진 거인들의 조각상 (압도감).\r
- **전체 구조**:\r
  - **Zone 1**: 유적 입구 (거인의 회랑)\r
  - **Zone 2**: 생체 실험실 (퍼즐 및 위험)\r
  - **Zone 3**: 별의 지도실 (진실)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 지하 공동 천장에 박혀 있는 검은 구체 (Black Sphere)\r
- **Local Landmark**:\r
  - Zone 1: 문을 지키는 머리 없는 거인 석상\r
  - Zone 2: 액체로 채워진 수천 개의 배양 캡슐\r
  - Zone 3: 공중에 떠 있는 거대한 홀로그램 은하수 지도\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 깊은 잠 (Slumber)\r
\r
- **공간**: 거대한 지하 신전 입구\r
- **페이싱**: **Low Tension** (웅장함, 경외감)\r
- **레벨 디자인 기법**:\r
  - **스케일**: 주인공보다 10배는 큰 문과 계단. 플레이어의 미미함을 강조.\r
  - **빛과 그림자**: 손전등에 의지해 어둠 속의 거대한 조각상을 비추는 공포감.\r
- **게임플레이**:\r
  - 고대 문자를 해석하여 거대한 문 개방.\r
  - 바닥의 압력 발판 퍼즐 해결 (염동력으로 돌 이동).\r
\r
### Act 2: 깨어난 악몽 (Awakening)\r
\r
- **공간**: 생체 실험실\r
- **페이싱**: **Medium to High** (크리처 조우)\r
- **레벨 디자인 기법**:\r
  - **환경 스토리텔링**: 캡슐 안에 갇힌 기괴한 생명체들(실패작). 일부 캡슐이 깨져 있음(탈출 암시).\r
  - **미로**: 유기적인 통로들이 얽혀 있어 길을 잃기 쉬움 (홀로그램 지도로 확인).\r
- **게임플레이**:\r
  - 유적의 방어 시스템(레이저) 회피.\r
  - 동면에서 깨어난 '수호자(Sentinel)' 크리처들을 피해 은신 이동.\r
  - 유물(Key)을 작동시켜 다음 구역 전력 공급.\r
\r
### Act 3: 별들의 경고 (Warning from the Stars)\r
\r
- **공간**: 지도실 (Map Room)\r
- **페이싱**: **Release / Revelation** (스토리 절정)\r
- **레벨 디자인 기법**:\r
  - **시각적 연출**: 방 전체가 우주공간처럼 변하며 은하계 지도가 펼쳐짐 (플라네타륨 효과).\r
  - **오디오**: 웅장한 오르간 소리와 같은 저음의 외계 음성 메시지 재생.\r
- **게임플레이**:\r
  - 별자리를 맞추는 대형 퍼즐.\r
  - "그들이 온다"는 메시지를 확인하고 유적 자폭 시퀀스 가동.\r
  - 무너지는 유적을 탈출하는 역동적인 시퀀스.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Engineer's Seat (엔지니어의 자리)\r
\r
- **위치**: Zone 3 중앙 원형 홀.\r
- **설명**: 고대 거인이 앉아 화석이 된 거대 조종석. 생체 튜브들이 시체와 연결되어 있음.\r
- **기능**: **과거와의 연결**. 주인공이 신경 단자를 연결하면 수천 년 전 이들이 숭배했던 '공허의 신'에 대한 환상을 보며 핵심 퍼즐의 힌트를 얻음.\r
- **비주얼**: 화석화된 거인의 텅 빈 눈동자와 그 뒤로 펼쳐지는 광활한 별의 홀로그램.\r
\r
### POI 2: The Goo Pit (검은 액체 웅덩이)\r
\r
- **위치**: Zone 2 바닥 곳곳.\r
- **설명**: 검은색 점성 액체가 부글거리는 구덩이. 기괴한 생명체의 일부가 튀어나와 있음.\r
- **기능**: **환경 하저드 및 적 강화**. 닿으면 주인공의 체력이 빠르게 닳으며, 이곳에 떨어진 시체들은 크리처로 부활함. 불을 이용해 일시적으로 정화 가능.\r
- **비주얼**: 끊임없이 파열되는 액체 방울과 그 안에서 들리는 불쾌한 속삭임 소리.\r
\r
### POI 3: The Hall of Whispers (속삭임의 회랑)\r
\r
- **위치**: Zone 1 지하 복도.\r
- **설명**: 벽면이 모두 얇은 틈새로 이루어진 공간. 바람이 불 때마다 수만 가지 목소리가 겹쳐 들림.\r
- **기능**: **청각 퍼즐**. 특정 단어나 소리(예: 아기의 울음소리)가 들리는 방향의 벽을 만져야 숨겨진 문이 열리는 기믹.\r
- **청각**: 서라운드 사운드를 통해 플레이어의 귀 바로 옆에서 누군가 속삭이는 듯한 연출.\r
\r
### POI 4: Progenitor's Archive (선구자의 보관실)\r
\r
- **위치**: 유적 가장 깊숙한 지하.\r
- **설명**: 인간의 기술로는 이해 불가능한 입자들이 공중에 부유하며 지식을 저장하고 있는 방.\r
- **기능**: **보스전 직전의 안식처**. 이곳에서 자폭 시퀀스를 작동시키거나, 수집한 유물을 조합하여 최종 무기를 완성 가능.\r
- **비주얼**: 우주의 역사가 황금빛 먼지처럼 흩날리는 신비롭고 거대한 공간.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] H.R. 기거 풍의 디자인이 너무 혐오스럽지 않으면서도 기괴한가? (Art Style Check)\r
- [ ] 퍼즐의 난이도가 적당하며, 실패 시 즉사가 아닌 재시도 기회를 주는가?\r
- [ ] 거대한 스케일의 공간에서 이동 속도가 너무 느려 지루하지 않은가? (대쉬 기능)\r
`,G2=`# S40: Peaceful Envoy (평화의 사절)\r
\r
> **"무기는 두려움의 증거일 뿐이다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **외교 시뮬레이션 / 비폭력 어드벤처**\r
- **주인공**: Kael (외교관)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (인물 중심), 대화 시 시네마틱 앵글\r
  - **Character**: 언어 능력, 감정 조절, 비전투\r
  - **Controls**: 대화 선택,제스처, 선물 증정, 문화 스캔\r
- **핵심 목표**: 적대적인 외계 종족의 모선에 단신으로 승선하여, 오해를 풀고 평화 협정을 맺어 지구 침공을 막아라.\r
- **The Vibe**: 긴장감 넘치는 대화, 문화적 충격, 휴머니즘. (참고: *Arrival*, *Star Trek* (TNG), *Detroit: Become Human*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Void Expanse - 외계 종족 'Krav'의 기함 내부\r
- **색상 팔레트**:\r
  - **주색상**: 워리어 레드 (#8B0000) - 호전적인 종족의 상징색\r
  - **보조색**: 스틸 그레이 (#708090) - 차가운 금속\r
  - **강조색**: 네온 오렌지 (#FF8C00) - 무기 에너지, 경고등\r
- **도형 이론**:\r
  - **삼각형**: 날카로운 장식, 무기, 그들의 건축 양식 (공격성).\r
  - **원**: 주인공이 가져간 평화의 상징 (화합).\r
- **전체 구조**:\r
  - **Zone 1**: 격납고 및 대기실 (구금 및 관찰)\r
  - **Zone 2**: 전사들의 연회장 (문화 체험)\r
  - **Zone 3**: 대족장의 알현실 (최종 담판)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 함선 중앙의 거대한 전쟁 북 (War Drum)\r
- **Local Landmark**:\r
  - Zone 1: 투명한 에너지 감옥 벽\r
  - Zone 2: 거대한 짐승의 뼈로 장식된 테이블\r
  - Zone 3: 수천 개의 전리품(두개골)이 박힌 옥좌\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 억류 (Detained)\r
\r
- **공간**: 보안 대기실\r
- **페이싱**: **Medium Tension** (불안, 관찰)\r
- **레벨 디자인 기법**:\r
  - **제한된 정보**: 유리벽 너머로 보이는 외계인들의 행동을 관찰하며 그들의 언어 패턴(바디 랭귀지) 파악.\r
  - **심리전**: 간수 역할을 하는 외계인이 위협할 때 쫄지 않고 의연하게 대처(눈 마주치기 등).\r
- **게임플레이**:\r
  - 제공된 음식(으그럽게 생김)을 먹을지 거부할지 선택 (신뢰도 영향).\r
  - 번역기 조율 미니게임.\r
\r
### Act 2: 시험 (The Trial)\r
\r
- **공간**: 연회장\r
- **페이싱**: **High Tension** (문화적 도전)\r
- **레벨 디자인 기법**:\r
  - **분위기 변화**: 살벌한 분위기에서 주인공의 행동에 따라 호기심->존중으로 변하는 군중의 반응.\r
  - **QTE 활용**: 그들의 전통 의식(칼춤이나 독주 마시기)을 실수 없이 수행.\r
- **게임플레이**:\r
  - 명예를 중시하는 전사들과의 논쟁.\r
  - 지구의 문화(음악, 예술품)를 선물로 주며 마음 열기.\r
  - 싸움을 걸어오는 난동꾼을 무력이 아닌 지혜로 제압.\r
\r
### Act 3: 결단 (The Verdict)\r
\r
- **공간**: 옥좌 앞\r
- **페이싱**: **Climax** (운명의 시간)\r
- **레벨 디자인 기법**:\r
  - **포커스**: 대족장의 미세한 표정 변화와 목소리 톤에 집중.\r
  - **시간 제한**: 지구 함대가 공격받기 직전, 제한 시간 내에 설득해야 함.\r
- **게임플레이**:\r
  - 최종 변론: "우리는 적이 아니라 동반자다."\r
  - 전쟁광(2인자)의 방해 공작을 논파.\r
  - 평화 조약 체결 혹은 명예로운 전쟁 선포(Bad Ending) 분기.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Trophy Hall (전리품의 복도)\r
\r
- **위치**: Zone 2 입구.\r
- **설명**: 정복한 종족들의 무기와 머리가 금색 틀에 박혀 전시된 긴 복도.\r
- **기능**: **위협적 분위기 조성**. 관찰 시 각 전쟁의 역사가 나레이션으로 들리며, 외교 실패 시 인류가 마주할 끔찍한 미래를 시각적으로 경고.\r
- **비주얼**: 차가운 푸른 조명 아래 빛나는 수천 개의 해골과 주인공의 발걸음에 반응해 열리는 자동 감지문.\r
\r
### POI 2: The War Table (전쟁 지휘 탁자)\r
\r
- **위치**: Zone 3 알현실 옆 부속실.\r
- **설명**: 지구 침공 루트가 실시간으로 시뮬레이션 되고 있는 거대 홀로그램 탁자.\r
- **기능**: **상호작용 설득 퍼즐**. 주인공이 가져온 인류의 문화 데이터칩을 탁자에 꽂아, 전쟁 대신 무역과 평화적 공존이 가져올 이득(Resource Gain)을 데이터로 증명해야 함.\r
- **연출**: 붉은색 침공 화살표가 서서히 녹색의 무역로로 바뀌는 시각 변화.\r
\r
### POI 3: The Observation Deck (관측 데크)\r
\r
- **위치**: 함선의 최외곽 유리 돔.\r
- **설명**: 우주 행성들의 죽음을 지켜보기 위해 설계된 황량한 데크.\r
- **기능**: **감정 공유의 장**. 대족장(Harloc)과 단둘이 서서 고향 행성을 잃은 그들의 슬픔을 듣고 공감대를 형성하여 대화의 주도권을 가져오는 결정적 위치.\r
- **비주얼**: 유리창 너머로 보이는 폭발하는 가스 성운의 장엄하고 우울한 배경.\r
\r
### POI 4: The Sacred Hatchery (신성한 부화장)\r
\r
- **위치**: 함선 하부 심층 구역.\r
- **설명**: 다음 세대의 전사들이 태어나는 수천 개의 알들이 보관된 따뜻하고 신성한 공간.\r
- **기능**: **도덕적 딜레마**. 이곳의 에너지를 끊어 함선을 무력화시킬 수 있으나, 그렇게 되면 외계 종족의 후손들이 몰살됨. 진정한 "평화 사절"로서의 가치관을 시험하는 장소.\r
- **연출**: 알 내부에서 심장박동처럼 주기적으로 점멸하는 황금빛 조명과 부드러운 웅웅거림.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 대화 선택 시 제한 시간(Timer)이 있어 긴박감을 주는가?\r
- [ ] 외계어 번역 자막이 서서히 해독되는 연출이 학습 성장을 느끼게 하는가?\r
- [ ] 비전투 시나리오지만 지루하지 않게 연출(카메라 워킹, 사운드)이 다이내믹한가?\r
`,V2=`# S41: Cosmic Horror (코스믹 호러)\r
\r
> **"우주에서는 아무도 당신의 비명 소리를 들을 수 없다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **SF 생존 호러**\r
- **주인공**: Zara (엔지니어)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (등 뒤 바짝 붙음, 공포감 극대화)\r
  - **Character**: 전투력 약함, 공구 사용\r
  - **Controls**: 수리(절단기), 달리기, 문 폐쇄, 중력 부츠\r
- **핵심 목표**: 미지의 신호를 쫓아 구조 요청을 보낸 채굴선 'Ishimura-2'에 도킹했으나, 그곳은 지옥으로 변해 있었다. 살아서 탈출하라.\r
- **The Vibe**: 고어, 폐쇄 공포, 광기, 절단. (참고: *Dead Space*, *Event Horizon*, *Alien: Isolation*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Void Expanse - 유령선이 된 채굴선\r
- **색상 팔레트**:\r
  - **주색상**: 러스티 브라운 (#8B4513) - 녹슨 벽, 피\r
  - **보조색**: 플리커링 옐로우 (#FFFF00) - 고장 난 조명\r
  - **강조색**: 보이드 퍼플 (#4B0082) - 차원 균열의 빛\r
- **도형 이론**:\r
  - **좁은 복도**: 도망칠 곳 없는 압박감.\r
  - **날카로운 벤트**: 적이 튀어나오는 구멍.\r
- **전체 구조**:\r
  - **Zone 1**: 도킹 베이 및 로비 (진입)\r
  - **Zone 2**: 의료 구역 및 승무원실 (공포)\r
  - **Zone 3**: 엔진실 및 셔틀 (탈출)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 함선 중앙의 거대한 채굴용 드릴 갱도 (The Pit)\r
- **Local Landmark**:\r
  - Zone 1: 피로 쓴 '눈을 감아라(Cut off their eyes)' 낙서\r
  - Zone 2: 시체가 둥둥 떠다니는 무중력 의료실\r
  - Zone 3: 폭주하는 원자로 코어\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 고요한 무덤 (Silent Tomb)\r
\r
- **공간**: 전원이 차단된 어두운 함선 초입\r
- **페이싱**: **Low to Medium** (불안감 조성)\r
- **레벨 디자인 기법**:\r
  - **점프 스케어**: 파이프가 터지는 소리, 떨어지는 사물 등으로 긴장감 고조(아직 적은 안 나옴).\r
  - **조명**: 손전등 배터리가 깜빡이며 시야가 제한됨.\r
- **게임플레이**:\r
  - 발전기를 수리하여 전력 복구.\r
  - 첫 번째 시체 발견 및 플라즈마 절단기(무기) 획득.\r
\r
### Act 2: 광기의 현장 (Madness)\r
\r
- **공간**: 피바다가 된 의료 구역\r
- **페이싱**: **High Tension** (전투 & 생존)\r
- **레벨 디자인 기법**:\r
  - **전략적 절단(Dismemberment)**: 적(Necromorph)의 팔다리를 잘라야만 죽일 수 있음을 튜토리얼로 학습.\r
  - **환각**: 주인공의 눈에만 보이는 죽은 동료들의 환영, 벽이 움직이는 듯한 시각 효과.\r
- **게임플레이**:\r
  - 환풍구에서 튀어나오는 적들을 상대하며 엘리베이터로 이동.\r
  - 스테이시스(Stasis) 모듈로 빠르게 움직이는 팬을 느리게 하고 통과.\r
\r
### Act 3: 차원의 틈 (The Rift)\r
\r
- **공간**: 차원 균열에 잠식당한 엔진실\r
- **페이싱**: **Very High Tension** (탈출)\r
- **레벨 디자인 기법**:\r
  - **환경 변화**: 현실이 왜곡되어 복도가 끝없이 늘어나거나 중력이 뒤집힘.\r
  - **무적의 적**: 죽일 수 없는 '재생자(Regenerator)'에게 쫓기는 추격전.\r
- **게임플레이**:\r
  - 엔진을 과부하시켜 함선 자폭 시퀀스 가동.\r
  - 재생자의 다리를 끊어 느리게 만들고 셔틀로 전력 질주.\r
  - 폭발하는 함선을 뒤로하고 우주로 사출.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Zero-G Therapy Room (무중력 치료실)\r
\r
- **위치**: Zone 2 의료 구역 중앙.\r
- **설명**: 둥둥 떠다니는 거대한 혈액 구체와 날카로운 수술 도구들이 가득한 공간.\r
- **기능**: **3D 전방위 전투**. 중력이 없어서 바닥, 벽, 천장의 환풍구 어디서든 적이 튀어나오며, 원거리 집어던지기(Kinesis) 스킬로 산소통을 던져 폭발시켜야 함.\r
- **비주얼**: 창백한 비상등 아래 시뻘건 피의 방울들이 공중에서 합쳐지고 흩어지는 기괴한 연출.\r
\r
### POI 2: The Marker (표식)\r
\r
- **위치**: Zone 3 엔진실 심부.\r
- **설명**: 검은 빛과 붉은 빛이 교차하며 맥박처럼 박동하는 나선형 외계 비석.\r
- **기능**: **광기의 근원 / 내러티브**. 가까이 갈수록 화면에 노이즈가 심해지고 죽은 가족의 목소리가 들리며, 주변 적들을 끊임없이 강화시키는 버프 생성기 역할.\r
- **청각**: 고주파의 이명 소리와 여러 목소리가 겹쳐 들리는 불쾌한 오디오 리드.\r
\r
### POI 3: Abyssal Mining Shaft (심연의 채굴 갱도)\r
\r
- **위치**: 함선 하부 거대 드릴 입구.\r
- **설명**: 행성의 핵을 뚫기 위해 만들어진 끝도 보이지 않는 수직 구멍.\r
- **기능**: **수직 강하 및 추격전**. 무너지는 리프트 위에서 위에서 떨어지는 잔해와 적들을 막아내며 함선 가장 깊은 곳으로 내려가야 하는 하이 페이싱 구간.\r
- **연출**: 갱도 벽면을 타고 기어 내려오는 수백 마리 크리처들의 그림자와 드릴의 거대한 굉음.\r
\r
### POI 4: Bio-Engineering Bay (생체 공학실)\r
\r
- **위치**: Zone 2와 3 사이.\r
- **설명**: 승무원들의 신체가 기계와 융합되어 거대한 유기물 덩어리로 변하고 있는 방.\r
- **기능**: **환경 스토리텔링 및 퍼즐**. 덩굴처럼 뻗어 나온 생체 근육 조직의 약점을 절단기로 파괴하여 전력을 복구하거나 잠긴 문을 열어야 함.\r
- **비주얼**: 벽면 전체가 내장처럼 꿈틀거리고 천장에서 점액질이 떨어지는 끔찍한 생체 변이 묘사.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 적이 환풍구로 이동하는 소리가 입체 음향으로 구현되어 위치를 짐작하게 하는가?\r
- [ ] 탄약과 회복 아이템이 항상 부족하여 긴장감을 유지하는가? (Survival Horror Balance)\r
- [ ] 고어 표현이 단순히 잔인한 것을 넘어 공포스럽고 미학적인가?\r
`,U2=`# S42: Warp Drive Malfunction (워프 드라이브 오작동)\r
\r
> **"여기가 바닥인가? 아니면 천장인가?"**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **1인칭 퍼즐 어드벤처**\r
- **주인공**: Zara (물리학자)\r
- **3C 특성**:\r
  - **Camera**: 1인칭 (어지러움 주의)\r
  - **Character**: 포탈건 보유, 논리적 사고\r
  - **Controls**: 포탈 생성, 중력 조작, 물체 던지기\r
- **핵심 목표**: 실험 중 폭주한 워프 드라이브로 인해 시공간이 뒤틀린 연구선에서, 물리 법칙을 무시하는 퍼즐을 풀고 코어를 정지시켜라.\r
- **The Vibe**: 초현실주의, 공간 왜곡, 두뇌 유희. (참고: *Portal*, *Antichamber*, *Superliminal*, *Fez*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Void Expanse - 최첨단 과학선 'Horizon'\r
- **색상 팔레트**:\r
  - **주색상**: 퓨어 화이트 (#FFFFFF) - 실험실 벽\r
  - **보조색**: 포탈 오렌지/블루 (#FF8C00 / #1E90FF) - 포탈 색상\r
  - **강조색**: 보이드 블랙 (#000000) - 깨진 공간 너머의 심연\r
- **도형 이론**:\r
  - **불가능한 도형**: 펜로즈의 계단, 뫼비우스의 띠 (공간 왜곡).\r
  - **큐브**: 동행 큐브, 실험 도구 (안정감).\r
- **전체 구조**:\r
  - **Zone 1**: 테스트 챔버 (기본 퍼즐)\r
  - **Zone 2**: 뒤틀린 복도 (공간 루프)\r
  - **Zone 3**: 워프 코어실 (최종 붕괴)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 창밖으로 보이는 거대한 블랙홀 (사건의 지평선)\r
- **Local Landmark**:\r
  - Zone 1: 유리가 깨진 관찰실\r
  - Zone 2: 천장과 바닥이 뒤바뀐 중력실\r
  - Zone 3: 빛나는 구체 형태의 워프 코어\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 실험실 쥐 (Lab Rat)\r
\r
- **공간**: 규격화된 테스트 챔버\r
- **페이싱**: **Low Tension** (튜토리얼, 학습)\r
- **레벨 디자인 기법**:\r
  - **가속도 보존**: 높은 곳에서 떨어지며 포탈을 타면 그 속도 그대로 튀어나가는 원리 학습.\r
  - **무한 루프**: 문을 열고 나갔는데 다시 같은 방으로 들어오는 공간 루프 연출.\r
- **게임플레이**:\r
  - 포탈 건 획득.\r
  - 레이저와 반사 큐브를 이용한 문 개방 퍼즐.\r
\r
### Act 2: 경계의 붕괴 (Breakdown)\r
\r
- **공간**: 연구선 내부의 비현실적 공간\r
- **페이싱**: **Medium Tension** (뇌지컬)\r
- **레벨 디자인 기법**:\r
  - **원근법 왜곡**: 멀리 있는 작은 물건을 집어서 가까이 가져오면 거대해지는(Superliminal) 기믹.\r
  - **비유클리드 기하학**: 방의 내부가 외부보다 더 큰 공간 (TARDIS 효과).\r
- **게임플레이**:\r
  - 작아진 자신을 이용해 쥐구멍으로 이동하거나, 거대화된 큐브로 다리 만들기.\r
  - 중력이 90도씩 바뀌는 방에서 벽을 바닥처럼 걷기.\r
\r
### Act 3: 특이점 (Singularity)\r
\r
- **공간**: 워프 코어실\r
- **페이싱**: **High Tension** (시간 제한 퍼즐)\r
- **레벨 디자인 기법**:\r
  - **공간 붕괴**: 퍼즐을 푸는 동안 방의 일부가 블랙홀로 빨려 들어가며 사라짐 (서둘러야 함).\r
  - **보스전**: 폭주하는 AI가 방어 시스템으로 공격. 포탈을 이용해 미사일을 되돌려 보냄.\r
- **게임플레이**:\r
  - 코어 주변의 회전하는 링들에 포탈을 열어 냉각수 투입.\r
  - 붕괴하는 함선에서 탈출 포드로 뛰어들기. (마지막엔 포탈이 달을 향해 열리는 식의 대규모 이동).\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Loop Hall (반복의 복도)\r
\r
- **위치**: Zone 2 공간 루프 구역.\r
- **설명**: 정면을 향해 끝없이 달려도 다시 제자리로 돌아오는 기하학적 미궁.\r
- **기능**: **인식의 퍼즐**. 그냥 걸어가면 영원히 탈출 불가. 뒤를 돌아본 채로 뒷걸음질 치거나, 벽에 붙은 특정 시계 소리를 따라가야만 출구가 나타나는 '논리 파괴' 퍼즐.\r
- **비주얼**: 복도가 늘어나면서 초점이 흐려지는 듯한 달리 줌(Dolly Zoom) 효과 연출.\r
\r
### POI 2: Gravity Well (중력 우물)\r
\r
- **위치**: Zone 3 코어실 입구.\r
- **설명**: 중력 데이터가 손상되어 사물들이 덩어리져 공중에 고요하게 떠 있는 구역.\r
- **기능**: **입체 플랫포밍**. 떠다니는 컴퓨터, 의자, 유리 조각들을 발판 삼아 코어까지 점프해서 올라가야 함. 물체마다 중력 방향이 달라 밟는 순간 시점이 휙휙 변함.\r
- **비주얼**: 모든 것이 정지된 정적 속에서 코어의 보라색 빛만이 일렁이는 풍경.\r
\r
### POI 3: The Upside-Down Garden (뒤집힌 정원)\r
\r
- **위치**: Zone 2 수경 재배 구역.\r
- **설명**: 식물들은 천장에서 자라 아래로 향하고, 바닥엔 인공 태양이 떠 있는 시공간 뒤틀림의 정점.\r
- **기능**: **원근 및 중력 퍼즐**. 천장(실제론 바닥인 곳)에 포탈을 배치해 물을 길어 올리거나, 거꾸로 자란 줄기를 타고 위(바닥)로 등반해야 하는 탐사 구역.\r
- **비주얼**: 인공 태양이 뿜는 눈부신 금색 빛과 천장에서 떨어지는 '위로 솟는 폭포'의 장관.\r
\r
### POI 4: Shattered Mirror Lab (조각난 거울 실험실)\r
\r
- **위치**: Zone 1과 2 경계.\r
- **설명**: 모든 벽이 거울로 되어 있으나, 거울 속의 주인공과 실제 세계의 물체 위치가 다른 방.\r
- **기능**: **대칭 퍼즐**. 거울 속 세계에서만 보이는 '보이지 않는 큐브'를 옮겨 현실 세계의 스위치를 눌러야 하는 복합 퍼즐.\r
- **연출**: 거울 속의 주인공이 나를 쳐다보지 않고 독자적으로 행동할 때의 소름 끼치는 암시.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 퍼즐의 논리가 명확하여 찍어서 푸는 게 아니라 이해하고 풀게 유도하는가?\r
- [ ] 1인칭 시점에서 급격한 시야 전환이나 중력 변화가 멀미를 유발하지 않는가? (DoF, Motion Blur 조절)\r
- [ ] 공간이 바뀔 때의 시각적 쇼크가 충분히 인상적인가?\r
`,K2=`# S43: Nexus Awakening (넥서스 각성)\r
\r
> **"차원의 벽이 얇아지고 있다. 그들이 깨어난다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **초능력 액션 / 기원 스토리**\r
- **주인공**: Alex Mercer (평범한 대학생)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (능력 사용 시 와이드 앵글)\r
  - **Character**: 처음엔 약하지만 점차 강력해짐\r
  - **Controls**: 초능력(염동력, 시간 늦추기, 에너지 파동), 파쿠르\r
- **핵심 목표**: 갑작스럽게 발현한 초능력을 통제하는 법을 배우고, 자신과 같은 각성자들이 노려지는 이유를 밝혀라.\r
- **The Vibe**: 슈퍼히어로 탄생, 도시 액션, 발견과 성장. (참고: *Infamous*, *Control*, *Spider-Man PS4*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Prime Earth - 뉴욕풍 대도시 'Metro City'\r
- **색상 팔레트**:\r
  - **주색상**: 어반 그레이 (#808080) - 빌딩, 아스팔트\r
  - **보조색**: 네온 사이언 (#00FFFF) - 초능력 이펙트\r
  - **강조색**: 데인저 레드 (#DC143C) - 적대 세력\r
- **도형 이론**:\r
  - **수직선**: 마천루, 초능력의 에너지 빔 (힘, 상승)\r
  - **파동**: 염동력의 시각화 (에너지 흐름)\r
- **전체 구조**:\r
  - **Zone 1**: 대학 캠퍼스 (각성)\r
  - **Zone 2**: 도심 거리 (추격)\r
  - **Zone 3**: 폐건물 (은신처 발견)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 도시 중앙의 첨탑 'Nexus Tower' (차원 균열의 중심)\r
- **Local Landmark**:\r
  - Zone 1: 과학관 옥상\r
  - Zone 2: 지하철역 광장\r
  - Zone 3: 낡은 창고 건물\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 각성의 순간 (The Awakening)\r
\r
- **공간**: 대학 캠퍼스\r
- **페이싱**: **Low to Rising** (평온 -> 혼란)\r
- **레벨 디자인 기법**:\r
  - **일상의 파괴**: 평범한 수업 장면에서 갑자기 책상이 떠오르며 초능력 발현.\r
  - **튜토리얼**: 불안정한 능력을 조절하며 기본 조작 학습.\r
- **게임플레이**:\r
  - 염동력으로 물체 들어올리기 연습.\r
  - 캠퍼스를 뛰쳐나가며 파쿠르 이동.\r
  - 갑자기 나타난 검은 정장의 요원들 피해 도망.\r
\r
### Act 2: 도시의 사냥감 (Urban Prey)\r
\r
- **공간**: 복잡한 도심 거리\r
- **페이싱**: **High Tension** (추격전)\r
- **레벨 디자인 기법**:\r
  - **버티컬리티**: 건물을 타고 지붕 위로 올라가거나, 지하철로 내려가는 입체적 루트.\r
  - **군중 블렌딩**: 사람들 사이에 숨어 추적자를 따돌림.\r
- **게임플레이**:\r
  - 에너지 파동으로 차량을 밀어내며 길 개척.\r
  - 헬기의 서치라이트를 피해 골목으로 이동.\r
  - 시간 늦추기 능력으로 총알 회피.\r
\r
### Act 3: 진실의 문턱 (Threshold)\r
\r
- **공간**: 폐건물 내부\r
- **페이싱**: **Medium Tension** (발견, 만남)\r
- **레벨 디자인 기법**:\r
  - **안전 지대**: 추격에서 벗어나 숨을 고를 수 있는 공간.\r
  - **멘토 등장**: 먼저 각성한 선배 각성자와의 만남.\r
- **게임플레이**:\r
  - 건물 내부 탐색하며 다른 각성자들의 흔적 발견.\r
  - 능력 강화 훈련 (타겟 파괴 챌린지).\r
  - 정부 요원의 급습을 막아내는 첫 전투.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Science Hall Rooftop (과학관 옥상)\r
\r
- **위치**: Zone 1 대학 캠퍼스 가장 높은 곳.\r
- **설명**: 주인공이 처음 능력을 자각하고 폭주했던 장소. 옥상 바닥에는 갈라진 번개 모양의 자국이 남아 있음.\r
- **기능**: **기원점 및 튜토리얼 리플레이**. 나중에 능력을 각성한 후 다시 방문하면 과거에 건너지 못했던 인접 건물로 도약하는 등 성장을 체감하게 함.\r
- **비주얼**: 도시 전체의 야경과 하늘에 일렁이는 차원 오로라가 한눈에 보이는 전망.\r
\r
### POI 2: Subway Chase (지하철 추격 구간)\r
\r
- **위치**: Zone 2 도심 지하 선로.\r
- **설명**: 굉음을 내며 달려오는 전동차와 좁은 터널 사이를 오가는 긴박한 추격 장소.\r
- **기능**: **다이내믹 세트피스**. 염동력을 사용해 날아오는 전동차를 공중에서 멈춰 세워 뒤쫓던 적들을 한꺼번에 저지하는 영화 같은 연출이 가능함.\r
- **연출**: 전동차의 급브레이크 소음과 불꽃, 타일이 뜯겨나가는 강한 물리 작용 묘사.\r
\r
### POI 3: Underground Sewer Hub (지하 하수도 허브)\r
\r
- **위치**: Zone 2와 3을 잇는 지하 구역.\r
- **설명**: 대도시의 지저분한 이면이 드러나는, 복잡하게 뒤엉킨 거대한 하수관들과 오염된 물이 흐르는 곳.\r
- **기능**: **은밀한 이동 및 지름길**. 지상의 추적팀 시야를 피해 이동할 수 있는 통로이며, 곳곳의 밸브를 조작해 증기를 뿜어 적들을 기절시키는 트랩 활용 가능.\r
- **비주얼**: 습한 공기와 파이브 사이로 새어 나오는 희끄무레한 빛, 가끔씩 들리는 쥐 떼의 소음.\r
\r
### POI 4: Metro City Memorial Fountain (메트로 시티 기념 분수대)\r
\r
- **위치**: Zone 2 중앙 광장.\r
- **설명**: 도시의 번영을 상징하는 거대 분수 광장. 정부 요원들과 각성자들이 처음으로 전면전을 벌이는 장소.\r
- **기능**: **광역 전투 무대**. 분수의 물줄기를 조종해 거대한 물 장벽을 만들거나, 주변의 가로등을 꺾어 무기로 사용하는 능력을 마음껏 발휘하는 아레나.\r
- **연출**: 쏟아지는 물방울에 반사되는 초능력의 푸른 빛과 비명을 지르며 흩어지는 시민들의 혼란스러운 반응.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 초능력 이펙트가 화려하면서도 타겟팅을 방해하지 않는가?\r
- [ ] 파쿠르 루트가 직관적으로 보이는가? (Edge highlighting)\r
- [ ] 평범한 학생에서 각성자로의 변화가 연출로 잘 전달되는가?\r
`,X2=`# S44: The Hunt (추적)\r
\r
> **"사냥꾼이 사냥감이 되는 순간."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **잠입 액션 / 역추적**\r
- **주인공**: Jack Hunter (전직 특수요원)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (전술적 시야), 커버 시스템\r
  - **Character**: 노련함, 전술적 사고\r
  - **Controls**: 은신, 암살, 무기 제작, 트랩 설치\r
- **핵심 목표**: 자신을 제거하려는 옛 조직의 암살팀을 역으로 추적하여, 배후의 배신자를 찾아내고 처단하라.\r
- **The Vibe**: 첩보 스릴러, 긴장감, 고양이와 쥐. (참고: *Splinter Cell*, *Hitman*, *The Bourne Identity*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Prime Earth - 야간의 산업 지구 및 항구\r
- **색상 팔레트**:\r
  - **주색상**: 미드나잇 블루 (#191970) - 밤의 어둠\r
  - **보조색**: 워닝 옐로우 (#FFD700) - 가로등, 경고등\r
  - **강조색**: 블러드 레드 (#8B0000) - 레이저 사이트, 위험\r
- **도형 이론**:\r
  - **그림자**: 은신처 (안전)\r
  - **원뿔**: 경비의 시야 범위, 서치라이트 (위협)\r
- **전체 구조**:\r
  - **Zone 1**: 안전 가옥 습격 (탈출)\r
  - **Zone 2**: 컨테이너 야드 (잠입)\r
  - **Zone 3**: 유람선 (암살)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 항구의 거대 크레인들\r
- **Local Landmark**:\r
  - Zone 1: 불타는 아파트\r
  - Zone 2: 쌓여있는 컨테이너 미로\r
  - Zone 3: 정박한 호화 요트\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 덫에 걸린 늑대 (Cornered)\r
\r
- **공간**: 안전 가옥\r
- **페이싱**: **Very High Tension** (즉각적인 위협)\r
- **레벨 디자인 기법**:\r
  - **In Medias Res**: 폭발과 함께 시작. 집이 포위된 상태.\r
  - **제한된 자원**: 무기고에서 챙길 수 있는 것은 하나뿐 (선택의 중요성).\r
- **게임플레이**:\r
  - 창문으로 들이닥치는 암살자들을 즉흥 무기(냄비, 의자)로 제압.\r
  - 화재가 번지는 건물에서 탈출 경로 찾기.\r
  - 지붕을 타고 인접 건물로 도피.\r
\r
### Act 2: 역전의 시작 (Tables Turn)\r
\r
- **공간**: 컨테이너 야드\r
- **페이싱**: **Medium Tension** (잠복, 관찰)\r
- **레벨 디자인 기법**:\r
  - **수직적 공간**: 컨테이너를 쌓아올린 구조물 위를 이동하며 고지 선점.\r
  - **AI 패턴**: 경비병들의 순찰 루트를 파악하고 타이밍에 맞춰 이동.\r
- **게임플레이**:\r
  - 크레인을 해킹하여 컨테이너를 떨어뜨려 적 제거.\r
  - 드럼통을 총으로 터뜨려 폭발 유도.\r
  - 암살 대상의 위치 정보가 담긴 노트북 탈취.\r
\r
### Act 3: 뱀의 머리를 자르다 (Cut the Head)\r
\r
- **공간**: 유람선 파티장\r
- **페이싱**: **High Tension** (침투 & 암살)\r
- **레벨 디자인 기법**:\r
  - **소셜 스텔스**: 웨이터로 변장하여 파티에 잠입.\r
  - **타겟 고립**: 배신자를 군중에서 떼어내기 위한 계획 수립.\r
- **게임플레이**:\r
  - 배신자(전 상관)를 발코니로 유인.\r
  - 대화 선택지로 진실 캐묻기 vs 즉시 제거.\r
  - 경보 발령 후 요트에서 해상으로 탈출 (제트스키).\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Burning Safehouse (불타는 안전가옥)\r
\r
- **위치**: Zone 1 아파트 최상층.\r
- **설명**: 보금자리였으나 이제는 적들의 C4 폭발로 화염에 휩싸인 절망적인 공간.\r
- **기능**: **탈출 퍼즐 및 시간 압박**. 서서히 무너지는 바닥과 번지는 불길을 피해 3분 내에 창문 밖으로 몸을 던져야 하는 오프닝 시퀀스.\r
- **비주얼**: 매캐한 연기와 붉은 불길, 그리고 문 밖에서 들리는 적들의 전술 통신음.\r
\r
### POI 2: Container Labyrinth (컨테이너 미로)\r
\r
- **위치**: Zone 2 항구 하차장.\r
- **설명**: 거대 화물선의 컨테이너들이 3~4층 높이로 무질서하게 쌓인 철제의 무덤.\r
- **기능**: **다층적 잠입 구역**. 컨테이너 사이 좁은 틈새로 적의 뒤를 잡거나, 상단부에 올라가 도르래를 해킹해 컨테이너를 떨어뜨리는 환경 처치가 주력인 장소.\r
- **연출**: 금속 컨테이너들이 부딪히는 묵직한 마찰음과 서치라이트가 만드는 긴 그림자.\r
\r
### POI 3: The Cargo Ship Deck (화물선 갑판)\r
\r
- **위치**: Zone 2 끝자락에 정박한 거대 선박.\r
- **설명**: 사방이 탁 트여 있어 저격수들의 시야에 노출되기 쉬운 위험한 철제 갑판.\r
- **기능**: **고난도 은신 챌린지**. 구름 낀 달빛 아래서 적 저격수의 레이저 사이트를 피해 쌓여 있는 화물 상자들 사이를 구르고 포복하여 이동해야 함.\r
- **비주얼**: 일렁이는 바다 물결과 육중한 화물 크레인의 실루엣이 주는 압박감.\r
\r
### POI 4: The Abandoned Lighthouse (버려진 등대)\r
\r
- **위치**: Zone 3 항구 절벽 끝.\r
- **설명**: 더 이상 불을 밝히지 않는, 녹슬고 낡은 등대. 배신자와의 최후의 담판이 벌어지는 장소.\r
- **기능**: **최종 대결 및 관측 포인트**. 나선형 계단을 올라가며 추격전을 벌이다가, 꼭대기 층에서 배신자와의 격렬한 대화 선택지와 함께 전투를 마무리하는 드라마틱한 무대.\r
- **연출**: 등대 유리창 밖으로 보이는 폭풍우 치는 바다와 번개가 칠 때마다 비치는 등대 내부의 음산한 그림자.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 적 AI의 시야 범위가 UI나 시각 효과로 명확히 표시되는가?\r
- [ ] 변장 시스템이 어색하지 않고 자연스러운가? (NPC 반응)\r
- [ ] 암살 vs 잠입 vs 전투의 세 가지 플레이스타일 모두 가능한가?\r
`,Y2=`# S45: Corporate Sabotage (기업 사보타주)\r
\r
> **"정보는 총알보다 강력하다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **해킹 & 잠입**\r
- **주인공**: Jack Hunter (침투 전문가)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 / 1인칭 (해킹 미니게임 시)\r
  - **Character**: 침투 전문가, 기술자\r
  - **Controls**: 해킹, 은신, 비살상 제압, 카메라 조작\r
- **핵심 목표**: 거대 기업 'Titan Corp'의 본사에 침입하여, 불법 인체 실험 증거를 탈취하고 폭로하라.\r
- **The Vibe**: 사이버펑크 느와르, 화이트칼라 범죄, 내부고발. (참고: *Deus Ex*, *Watch Dogs*, *Mr. Robot*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Prime Earth - 초고층 기업 본사 'Titan Tower'\r
- **색상 팔레트**:\r
  - **주색상**: 코퍼레이트 블루 (#4169E1) - 깔끔한 사무실\r
  - **보조색**: 스틸 그레이 (#708090) - 금속, 유리\r
  - **강조색**: 해커 그린 (#00FF00) - 해킹 UI, 터미널\r
- **도형 이론**:\r
  - **격자**: 깔끔하게 정렬된 사무 공간 (질서, 통제)\r
  - **회로**: 해킹 UI의 시각화 (복잡성)\r
- **전체 구조**:\r
  - **Zone 1**: 로비 및 하층부 (침투)\r
  - **Zone 2**: 연구 개발실 (정보 수집)\r
  - **Zone 3**: 최상층 서버실 (데이터 탈취)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 70층 높이의 유리 건물\r
- **Local Landmark**:\r
  - Zone 1: 거대한 로고가 있는 리셉션 홀\r
  - Zone 2: 생체 샘플이 진열된 연구실\r
  - Zone 3: 서버 랙이 빽빽한 차가운 방\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 내부자 (Insider)\r
\r
- **공간**: 타이탄 타워 로비\r
- **페이싱**: **Low Tension** (준비, 위장)\r
- **레벨 디자인 기법**:\r
  - **소셜 엔지니어링**: 직원으로 위장하여 보안 검색대 통과.\r
  - **멀티 루트**: 정문(어려움), 배달 트럭(보통), 환풍구(쉽지만 좁음).\r
- **게임플레이**:\r
  - 위조 ID 카드로 출입문 통과.\r
  - CCTV 사각지대를 이용해 엘리베이터 진입.\r
  - 직원 NPC들의 대화를 엿들으며 보안 코드 파악.\r
\r
### Act 2: 증거 확보 (Evidence)\r
\r
- **공간**: 45층 연구 개발실\r
- **페이싱**: **Medium Tension** (탐색, 해킹)\r
- **레벨 디자인 기법**:\r
  - **레이어드 보안**: 키카드 -> 생체 인식 -> 패스워드의 단계별 보안.\r
  - **시간 제한**: 야간 경비의 순찰 타이밍에 맞춰 행동.\r
- **게임플레이**:\r
  - 터미널 해킹 미니게임 (회로 연결 퍼즐).\r
  - 파일 서버에서 극비 문서 다운로드.\r
  - 실험실 내부의 비윤리적 실험 장면 사진 촬영.\r
\r
### Act 3: 탈출 불가능 (No Way Out)\r
\r
- **공간**: 최상층 서버실\r
- **페이싱**: **High Tension** (발각, 탈출)\r
- **레벨 디자인 기법**:\r
  - **타이머**: 데이터 업로드 진행률 게이지가 100%될 때까지 버팀.\r
  - **추격**: 보안팀이 몰려오고 옥상으로 도주.\r
- **게임플레이**:\r
  - 서버실 문을 잠그고 바리케이드 구축.\r
  - 원격으로 엘리베이터를 조작해 적들을 지연시킴.\r
  - 옥상에서 헬기나 짚라인으로 탈출.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Vault (비밀 금고)\r
\r
- **위치**: Zone 2 연구 개발실 안쪽 보안 구역.\r
- **설명**: 기업의 가장 어두운 비밀이 담긴 물리적 하드드라이브들이 보관된 차가운 강철 방.\r
- **기능**: **하이리스크 보너스 구역**. 단순히 데이터만 훔치는 것이 아니라, 이곳에 잠입해 실물 증거를 확보하면 엔딩에서 기업의 회장을 즉각 구속시킬 수 있는 결말 분기점.\r
- **비주얼**: 푸른 조명과 레이저 보안 격자가 교차하는 첨단 보안 시설의 정점.\r
\r
### POI 2: Server Farm (서버 농장)\r
\r
- **위치**: Zone 3 데이터 센터 중심부.\r
- **설명**: 수천 개의 서버들이 내뿜는 열기와 윙윙거리는 팬 소음으로 가득 찬 미로 같은 공간.\r
- **기능**: **최종 해킹 목표**. 데이터를 전송하는 동안 몰려오는 보안 드론들을 해킹해 아군으로 만들거나, 냉각 시스템을 과부하시켜 시야를 가리는 연막을 형성해야 함.\r
- **비주얼**: 끊임없이 깜빡이는 LED 인디케이터들과 바닥 아래로 보이는 복잡한 광섬유 케이블들.\r
\r
### POI 3: The Sky Garden (공중 정원)\r
\r
- **위치**: Zone 2와 3 사이, 건물 50층 야외 데크.\r
- **설명**: 최첨단 빌딩 한가운데 조성된 인공 숲과 연못. 임직원들의 휴식 공간이자 보안 요원들의 순찰 지점.\r
- **기능**: **심미적 은신처**. 인공 풀숲과 분수대를 이용해 몸을 숨기거나, 연못의 물을 이용해 전기 충격 트랩을 설치하는 등 환경적 변수를 활용한 플레이 가능.\r
- **비주얼**: 유리 벽 너머의 도시 야경과 정원의 화려한 식물들이 만들어내는 초현실적인 대비.\r
\r
### POI 4: The CEO's Private Office (회장실)\r
\r
- **위치**: Zone 3 최상층 옥상 바로 아래.\r
- **설명**: 도시 전체가 내려다보이는 압도적인 크기의 통창과 고가의 예술품들로 장식된 권력의 상징.\r
- **기능**: **소셜 엔지니어링 및 진실 폭로**. 회장의 책상 밑에 도청기를 설치하거나, 숨겨진 벽장 너머의 밀실에서 인체 실험의 피해자 리스트를 확인하는 스토리적 클라이맥스.\r
- **연출**: 클래식 음악이 흐르는 우아한 방 분위기와 뒤에서 조용히 다가오는 주인공의 그림자가 만드는 느와르적 긴장감.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 해킹 미니게임이 너무 반복적이지 않고 긴장감을 주는가?\r
- [ ] 비살상 플레이가 실제로 가능하며 보상(평판)이 있는가?\r
- [ ] 사무실 환경이 단조롭지 않게 구역마다 특색(연구실, 회의실 등)이 있는가?\r
`,Q2=`# S46: Guardian Angel (수호천사)\r
\r
> **"누군가는 지켜야 한다. 법이 닿지 않는 곳에서."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **비질란테 액션 / 은밀한 보호**\r
- **주인공**: Maya Cross (의협심 강한 해커)\r
- **3C 특성**:\r
  - **Camera**: 3인칭 (전술적 시야), CCTV 모니터링 화면\r
  - **Character**: 원거리 지원, 해킹\r
  - **Controls**: 드론 조종, 환경 조작(신호등, 문), 통신 방해\r
- **핵심 목표**: 범죄 조직에 쫓기는 목격자를 그림자에서 지켜주며, 안전한 경찰서까지 무사히 호송하라.\r
- **The Vibe**: 뒷골목의 수호자, 긴장감, 첨단 vs 아날로그. (참고: *Watch Dogs*, *Hacknet*, *Person of Interest*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Prime Earth - 밤의 도심 빈민가\r
- **색상 팔레트**:\r
  - **주색상**: 네온 핑크 (#FF1493) - 간판, 술집 조명\r
  - **보조색**: 섀도우 블랙 (#000000) - 어두운 골목\r
  - **강조색**: 시그널 그린 (#32CD32) - 해킹된 장치\r
- **도형 이론**:\r
  - **미로**: 복잡한 골목길 (숨기 좋음)\r
  - **감시망**: CCTV와 신호등의 네트워크 (통제)\r
- **전체 구조**:\r
  - **Zone 1**: 주차장 (구출)\r
  - **Zone 2**: 뒷골목 미로 (호위)\r
  - **Zone 3**: 경찰서 앞 광장 (최후 방어)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 경찰서의 파란 회전등\r
- **Local Landmark**:\r
  - Zone 1: 다층 주차 건물\r
  - Zone 2: 네온사인 가득한 중국 식당가\r
  - Zone 3: 경찰서 계단\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 눈에 보이지 않는 손 (Invisible Hand)\r
\r
- **공간**: 지하 주차장\r
- **페이싱**: **Medium Tension** (원격 조작)\r
- **레벨 디자인 기법**:\r
  - **듀얼 스크린**: 메인 화면은 목격자 시점, 작은 화면은 CCTV 피드.\r
  - **간접 제어**: 플레이어는 직접 싸우지 않고 환경을 조작.\r
- **게임플레이**:\r
  - CCTV로 적들의 위치 파악.\r
  - 차량 경보를 울려 적들을 유인.\r
  - 주차 차단기를 열어 목격자의 탈출 경로 개척.\r
\r
### Act 2: 골목의 왈츠 (Alley Waltz)\r
\r
- **공간**: 복잡한 뒷골목\r
- **페이싱**: **High Tension** (실시간 판단)\r
- **레벨 디자인 기법**:\r
  - **분기 선택**: 왼쪽(밝지만 적 많음) vs 오른쪽(어둡지만 막힌 길).\r
  - **타이밍**: 신호등을 조작해 차량 흐름을 바꿔 적의 추격차 진로 차단.\r
- **게임플레이**:\r
  - 드론을 날려 앞을 정찰하고 안전한 길 안내.\r
  - 가로등을 꺼서 목격자가 숨을 수 있게 함.\r
  - 적의 무전을 해킹하여 잘못된 정보 전달.\r
\r
### Act 3: 최후의 100미터 (Final Stretch)\r
\r
- **공간**: 경찰서 앞 개방된 광장\r
- **페이싱**: **Very High Tension** (노출된 전투)\r
- **레벨 디자인 기법**:\r
  - **개방감**: 숨을 곳이 없는 광장. 환경 조작이 제한됨.\r
  - **시간 싸움**: 경찰이 나올 때까지 30초간 버티기.\r
- **게임플레이**:\r
  - 광장의 대형 스크린을 해킹해 적들의 범죄 증거 방송 (군중 소환).\r
  - 분수대를 터뜨려 연막 효과.\r
  - 경찰이 도착하는 순간 목격자를 밀어넣고 미션 성공.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Control Van (이동 지휘소)\r
\r
- **위치**: 맵 외곽 어두운 뒷골목에 주차된 밴.\r
- **설명**: 외부에는 낡은 세탁소 차량처럼 보이지만 내부에는 수십 개의 모니터와 고성능 서버가 장착된 주인공의 베이스 캠프.\r
- **기능**: **플레이어 캐릭터의 실체**. 주인공 Maya는 이 안에서 드론과 CCTV를 조종하며 목격자를 지휘함. 적들이 밴을 찾아내지 못하도록 주기적으로 신호를 위장해야 함.\r
- **비주얼**: 비좁은 실내 공간을 가득 채운 멀티 모니터의 푸른 빛과 먹다 남은 에너지 드링크 캔들.\r
\r
### POI 2: Dead End Alley (막다른 골목)\r
\r
- **위치**: Zone 2 뒷골목 미로 심부.\r
- **설명**: 양옆이 높은 벽으로 막혀 있고 정면에는 굳게 잠긴 철문이 있는 절망적인 막다른 길.\r
- **기능**: **긴박한 환경 조작**. 목격자가 이곳에 갇히기 직전, 주변 배전반을 폭발시켜 추격자들을 따돌리거나 옥상 비상계단을 작동시켜 탈출 경로를 즉석에서 만들어야 함.\r
- **비주얼**: 붉은 네온사인이 일렁이는 고인 물 웅덩이와 쓰레기통 너머로 다가오는 추격자들의 전술 라이트 빛.\r
\r
### POI 3: Abandoned Subway Station (버려진 지하철역)\r
\r
- **위치**: Zone 2와 3 사이 지하 구간.\r
- **설명**: 폐쇄된 지 오래되어 칠흑 같은 어둠과 습기가 가득한 구 시대의 지하철 승강장.\r
- **기능**: **어둠 속의 함정 설치**. 드론의 야간 투시경으로 적들의 위치를 파악하고, 목격자를 어두운 구석에 숨긴 뒤 적들이 지나갈 때 선로의 고압 전류를 흘려 제압하는 전술적 장소.\r
- **비주얼**: 녹슬어 멈춘 열차 칸과 천장에서 떨어지는 물방울 소리가 고요하게 울리는 공포스러운 분위기.\r
\r
### POI 4: The Rooftop Water Tank (옥상 거대 물탱크)\r
\r
- **위치**: Zone 3 경찰서 광장이 내려다보이는 빌딩 꼭대기.\r
- **설명**: 낡은 목재와 철제로 된 거대한 원통형 물탱크. 도시의 빈민가를 상징하는 오브젝트.\r
- **기능**: **최종 관측 및 엄호 포인트**. 이곳에 드론을 고정시켜 광장 전체의 시야를 확보하고, 적들의 저격수를 미리 찾아내어 목격자가 경찰서 정문까지 달릴 수 있는 "안전한 30초"를 설계해야 함.\r
- **연출**: 강풍에 흔들리는 탱크의 삐걱임과 발아래로 펼쳐진 경찰서의 파란 경광등 불빛의 대비. 위에서 중재하는 '천사'의 시점을 극대화.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 목격자 NPC의 AI가 플레이어의 지시를 잘 따르는가? (길 안내, 숨기 등)\r
- [ ] 해킹 가능한 오브젝트(신호등, 카메라)가 시각적으로 하이라이트되는가?\r
- [ ] 간접 플레이임에도 플레이어가 '영웅'처럼 느껴지는 연출이 있는가?\r
`,J2=`# S47: Street Justice (길거리 정의)\r
\r
> **"법은 느리지만, 주먹은 빠르다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **격투 액션 / 비트엠업**\r
- **주인공**: Maya Cross (격투가)\r
- **3C 특성**:\r
  - **Camera**: 사이드뷰 / 쿼터뷰 (고전 비트엠업 스타일)\r
  - **Character**: 빠른 콤보, 환경 무기 사용\r
  - **Controls**: 약공격, 강공격, 잡기, 특수기, 회피\r
- **핵심 목표**: 동네를 괴롭히는 갱단의 아지트를 찾아가, 두목을 쓰러뜨리고 평화를 되찾아라.\r
- **The Vibe**: 90년대 액션, 주먹다짐, 통쾌함, 정의. (참고: *Streets of Rage*, *Final Fight*, *Sifu*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Prime Earth - 도심 빈민가 거리\r
- **색상 팔레트**:\r
  - **주색상**: 브릭 레드 (#B22222) - 벽돌 건물\r
  - **보조색**: 그래피티 멀티컬러 - 낙서, 활기\r
  - **강조색**: 스트리트 옐로우 (#FFD700) - 가로등\r
- **도형 이론**:\r
  - **직선**: 거리, 골목 (진행 방향)\r
  - **난투**: 원형 아레나 (격투 공간)\r
- **전체 구조**:\r
  - **Zone 1**: 뒷골목 (시작)\r
  - **Zone 2**: 나이트클럽 (중보스)\r
  - **Zone 3**: 옥상 (최종 보스)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 깨진 네온사인 'JUSTICE'\r
- **Local Landmark**:\r
  - Zone 1: 쓰레기통이 즐비한 골목\r
  - Zone 2: 음악이 쿵쿵거리는 클럽 입구\r
  - Zone 3: 헬기 착륙장 있는 옥상\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 길거리의 소문 (Word on the Street)\r
\r
- **공간**: 좁은 뒷골목\r
- **페이싱**: **Rising Action** (워밍업)\r
- **레벨 디자인 기법**:\r
  - **2D 진행**: 좌에서 우로 이동하며 적들을 격파.\r
  - **환경 무기**: 쓰레기통, 파이프, 야구방망이 사용 가능.\r
- **게임플레이**:\r
  - 3~4명의 잡졸들이 웨이브로 등장.\r
  - 콤보 시스템 학습 (약공격 연타 -> 강공격 마무리).\r
  - 음식(터키 다리)을 먹어 체력 회복.\r
\r
### Act 2: 클럽의 혼돈 (Club Chaos)\r
\r
- **공간**: 나이트클럽 내부\r
- **페이싱**: **High Tension** (다수 전투)\r
- **레벨 디자인 기법**:\r
  - **음악과 싱크**: 비트에 맞춰 공격하면 데미지 보너스.\r
  - **환경 위험**: 무대 조명이 떨어지거나, 스피커가 폭발.\r
- **게임플레이**:\r
  - 바운서(중갑병 타입)와 전투.\r
  - 중보스 'DJ Venom'과의 1:1 대결.\r
  - 클럽을 박살내며 싸우는 파괴 연출.\r
\r
### Act 3: 하늘 높은 결전 (Sky High Showdown)\r
\r
- **공간**: 빌딩 옥상\r
- **페이싱**: **Climax** (보스전)\r
- **레벨 디자인 기법**:\r
  - **링 아웃**: 옥상 가장자리로 밀면 낙사 가능.\r
  - **페이즈 변화**: 보스가 무기(칼, 총)를 바꾸며 패턴 변화.\r
- **게임플레이**:\r
  - 보스 'Big Tony'와의 격렬한 주먹다짐.\r
  - 헬기에서 쏟아지는 증원군 처리.\r
  - 최후의 일격으로 보스를 옥상 밖으로 던지는 피니셔.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: The Alley (벽돌 뒷골목)\r
\r
- **위치**: Zone 1 시작 지점.\r
- **설명**: 그래피티가 가득한 붉은 벽돌 건물들 사이의 좁고 지저분한 골목로.\r
- **기능**: **조작 튜토리얼 및 전투 입문**. 쓰레기통을 부수어 체력 아이템을 찾거나, 파이프를 주워 적들을 몰아치는 고전 비트엠업의 향수를 느끼게 함.\r
- **비주얼**: 가로등 아래 일렁이는 그림자와 현실적인 도시의 소음들(멀리서 들리는 사이렌 등).\r
\r
### POI 2: The Dancefloor (나이트클럽 스테이지)\r
\r
- **위치**: Zone 2 클럽 내부 중앙.\r
- **설명**: 화려한 스트로보 조명과 쿵쿵거리는 베이스 사운드가 고막을 때리는 역동적인 공간.\r
- **기능**: **음악 동기화 전투 아레나**. 음악의 비트에 맞춰 적을 타격하면 콤보 점수가 2배가 되며, 보스 'DJ Venom'의 화려한 조명 공격을 회피하며 싸우는 시각적 절정 구역.\r
- **연출**: 타격할 때마다 비트에 맞춰 화면의 채도가 변하거나 바닥 조명이 반응하는 화려함.\r
\r
### POI 3: Underground Fight Club (지하 비밀 격투장)\r
\r
- **위치**: Zone 1과 2 사이의 창고 지하.\r
- **설명**: 불법 도박과 난투가 벌어지는, 쇠창살로 둘러싸인 거칠고 살벌한 사각 링 형태의 공간.\r
- **기능**: **서바이벌 웨이브 챌린지**. 사방에서 몰려오는 적들을 좁은 링 안에서 막아내야 하며, 쇠창살을 잡고 적의 머리를 박거나 주변의 의자를 집어던지는 정통 난투극의 재미 강화.\r
- **비주얼**: 자욱한 담배 연기와 누런 전구 빛, 관중들의 거친 함성 소리.\r
\r
### POI 4: The Construction Site (건물 공사 현장)\r
\r
- **위치**: Zone 3 최종 보스전 직전 진입로.\r
- **설명**: 마천루로 올라가는 도중 거치게 되는 불안정한 철골 구조와 비계(Scaffolder)들이 얽힌 곳.\r
- **기능**: **환경 하저드 전투**. 적을 철골 밖으로 밀어내 낙사시키거나, 매달린 시멘트 포대를 터뜨려 적들의 시야를 가리는 지형 활용도가 극대화된 레벨.\r
- **연출**: 고공에서 부는 강한 바람 소리와 발밑으로 아찔하게 보이는 도시의 불빛들.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 타격감(Hit Stop, Screen Shake)이 시원시원한가?\r
- [ ] 적들이 플레이어를 공정하게 포위하는가? (한 번에 1~2명만 공격)\r
- [ ] 환경 파괴(유리 깨짐, 가구 부서짐)가 전투의 박진감을 높이는가?\r
`,q2=`# S48: Final Convergence (최종 수렴)\r
\r
> **"모든 차원이 하나로 모이는 순간, 넥서스가 깨어난다."**\r
\r
## 1. 개요 및 목표\r
\r
- **장르**: **크로스오버 액션 / 최종장**\r
- **주인공**: All Heroes (모든 주인공 통합)\r
- **3C 특성**:\r
  - **Camera**: 다이나믹하게 변화 (캐릭터에 따라)\r
  - **Character**: 플레이 중 캐릭터 전환 가능\r
  - **Controls**: 각 캐릭터의 고유 스킬 활용\r
- **핵심 목표**: 차원의 경계가 무너져 뒤섞인 세계에서, 모든 주인공들이 힘을 합쳐 현실을 붕괴시키려는 '넥서스 엔티티'를 막아라.\r
- **The Vibe**: 어벤져스 어셈블, 크로스오버, 모든 것의 정점. (참고: *Kingdom Hearts*, *Super Smash Bros. Story*, *Avengers: Endgame*)\r
\r
## 2. 공간 및 환경 (World & Environment)\r
\r
- **배경**: Prime Earth + All Dimensions - 융합된 현실\r
- **색상 팔레트**:\r
  - **주색상**: 멀티버스 프리즘 - 모든 색이 혼재\r
  - **보조색**: 리얼리티 크랙 화이트 (#FFFFFF) - 균열\r
  - **강조색**: 보이드 퍼플 (#8A2BE2) - 넥서스 에너지\r
- **도형 이론**:\r
  - **겹침**: 여러 차원의 건축물이 뒤섞여 있음\r
  - **균열**: 현실의 틈\r
- **전체 구조**:\r
  - **Zone 1**: 뒤틀린 메트로 시티 (집결)\r
  - **Zone 2**: 차원의 회랑 (여정)\r
  - **Zone 3**: 넥서스 코어 (최종 전투)\r
\r
### 랜드마크 안내\r
\r
- **Global Landmark**: 하늘을 찢고 있는 거대한 차원 균열\r
- **Local Landmark**:\r
  - Zone 1: 사이버펑크 빌딩과 판타지 성이 합쳐진 구조물\r
  - Zone 2: 떠다니는 여러 차원의 파편들\r
  - Zone 3: 모든 빛을 빨아들이는 블랙홀 같은 코어\r
\r
## 3. 상세 레벨 흐름 (Level Flow)\r
\r
### Act 1: 영웅들의 집결 (Assembly)\r
\r
- **공간**: 융합된 메트로 시티\r
- **페이싱**: **High Tension** (재회, 준비)\r
- **레벨 디자인 기법**:\r
  - **팬서비스**: 각 차원의 주인공들이 하나씩 등장하는 연출 (포스터 샷).\r
  - **티칭**: 캐릭터 전환 시스템 학습. 버튼 하나로 다른 영웅으로 체인지.\r
- **게임플레이**:\r
  - 각 주인공의 시그니처 기술을 사용해 환경 퍼즐 해결.\r
  - 예: Kira의 해킹으로 문 열기 -> Aldric의 힘으로 바리게이트 부수기.\r
  - 차원 몬스터들과의 전투로 협동 시스템 익히기.\r
\r
### Act 2: 차원을 넘어 (Through the Rift)\r
\r
- **공간**: 차원의 회랑 (각 세계의 파편)\r
- **페이싱**: **Medium to High** (회상, 오마주)\r
- **레벨 디자인 기법**:\r
  - **노스탤지어**: 과거 시나리오의 상징적 장소들을 짧게 재방문.\r
  - **속도감**: 빠르게 변화하는 배경. 발밑의 땅이 계속 바뀜.\r
- **게임플레이**:\r
  - Neon Sprawl의 비 내리는 거리를 달리다가 -> Lumina의 빛나는 숲으로 전환.\r
  - 각 구역마다 해당 차원의 적들이 등장. 최적의 캐릭터로 전환하여 상대.\r
\r
### Act 3: 넥서스의 심장 (Heart of Nexus)\r
\r
- **공간**: 시공간 밖의 공허\r
- **페이싱**: **Climax** (최종 보스전)\r
- **레벨 디자인 기법**:\r
  - **멀티 페이즈**: 보스가 각 차원의 힘을 흡수하며 형태 변화.\r
  - **전원 참전**: 모든 주인공이 동시에 싸우는 대규모 전투 (QTE 협공).\r
- **게임플레이**:\r
  - 보스 '넥서스 엔티티'의 약점을 각 캐릭터가 번갈아 공격.\r
  - 페이즈마다 특정 캐릭터만 유효한 공격 패턴 (teamwork 강조).\r
  - 최후: 모든 영웅의 힘을 모은 합동 피니셔로 보스 격파.\r
  - 엔딩: 각 차원이 분리되며 원래대로 돌아가는 따뜻한 마무리.\r
\r
## 4. 주요 POI (Points of Interest) 상세\r
\r
### POI 1: Convergence Point (차원 수렴 광장)\r
\r
- **위치**: Zone 1 메트로 시티 중앙 분수대 광장.\r
- **설명**: 현대의 아스팔트와 판타지의 성벽, 사이버펑크의 전광판이 조각보처럼 기워진 기묘한 교차로.\r
- **기능**: **팀 집결 및 전략 허브**. 24명의 영웅들이 한자리에 모여 장비를 정비하고, 플레이어가 출전할 4명의 파티를 최종적으로 구성하는 중요 장소.\r
- **비주얼**: 여러 차원의 날씨(눈, 비, 햇살)가 공존하며 지면이 수시로 일렁이는 초현실적 대공간.\r
\r
### POI 2: Memory Lane (기억의 회랑)\r
\r
- **위치**: Zone 2 차원의 틈 내부 통로.\r
- **설명**: 플레이어가 거쳐온 47개 시나리오의 명장면들이 거울 파편처럼 공중에 떠서 재생되는 빛의 복도.\r
- **기능**: **내러티브 페이오프**. 각 파편을 통과할 때마다 해당 주인공의 대사가 들리며 플레이어에게 "우리의 여정이 헛되지 않았다"는 감정적 보상과 버프(불굴의 의지)를 제공.\r
- **연출**: 과거에 만난 보스들의 잔영이 스쳐 지나가며 웅장한 오케스트라 테마곡이 연주됨.\r
\r
### POI 3: The Void Core (공허의 심장)\r
\r
- **위치**: Zone 3 최종 전투 아레나.\r
- **설명**: 모든 현실을 집어삼키는 거대한 블랙홀 같은 구체가 가운데 떠 있는, 중력이 소멸한 시공간의 무덤.\r
- **기능**: **최종 보스 아레나**. 보스의 페이즈에 따라 지형이 계속 무너지고 다른 차원(Ashen World, Umbra 등)의 조각들이 날아와 발판이 되는 역동적 전투지.\r
- **비주얼**: 모든 색이 섞여 하얗게 타오르는 넥서스 엔티티의 압도적 위용과 붕괴하는 현실의 시각화.\r
\r
### POI 4: The Hall of Heroes (영웅의 전당)\r
\r
- **위치**: Zone 1과 2를 잇는 거대 계단 지역.\r
- **설명**: 각 차원의 대표 영웅 6인의 거대 환영 석상이 받치고 있는 웅장한 원형 복도.\r
- **기능**: **합동 공격 포인트**. 6인 일제 사격이나 합동 마법 등 시나리오 전반을 아우르는 대규모 연계 시스템을 활성화시켜 수천 마리의 공허 괴물을 한꺼번에 쓸어버리는 "무쌍" 구역.\r
- **비주얼**: 등 뒤에서 든든하게 받쳐주는 거대 영웅들의 석상과 화려하게 터지는 다색 에너지 효과.\r
\r
### POI 5: Fractured Clock Tower (부서진 시계탑)\r
\r
- **위치**: Zone 3 코어 위 최상단 하늘.\r
- **설명**: Aether Empire의 시계탑과 Prime Earth의 Nexus Tower가 합쳐져 시간이 거꾸로 흐르는 시계 바늘이 달린 거대 첨탑.\r
- **기능**: **시간 역전 퍼즐 및 마지막 도약**. 보스가 현실을 삭제하려 할 때, 시계 바늘을 돌려 과거의 영웅들을 소환하거나 무너진 발판을 복복시키는 "최후의 기믹"이 숨겨진 장소.\r
- **연출**: 시간이 멈춘 듯한 정적과 웅장한 시계 종소리가 차원 전체를 울리는 장엄한 클라이맥스.\r
\r
## 5. 레벨 디자이너 체크리스트\r
\r
- [ ] 24명의 캐릭터가 모두 유니크한 플레이 필을 주는가?\r
- [ ] 캐릭터 전환 UI가 혼란스럽지 않고 직관적인가?\r
- [ ] 최종 보스전이 48개 시나리오의 여정을 보상하는 충분한 감동을 주는가?\r
- [ ] 엔딩 크레딧에 각 차원과 주인공들의 이후 모습이 담겨 있는가?\r
\r
---\r
\r
## 🎬 Grand Finale\r
\r
모든 차원, 모든 영웅, 하나의 운명.\r
**Nexus Multiverse**의 대장정이 여기서 막을 내립니다.\r
`,nS=`# S01: Data Heist - Top-down Map 상세 설계\r
\r
> **Apex Corp 타워 침투 작전: 100층 사이버펑크 잠입 미션**\r
\r
## 설계 개요\r
\r
**시나리오**: S01: Data Heist  \r
**장르**: 사이버펑크 잠입 액션  \r
**주인공**: Kira "Ghost" Chen  \r
**환경**: 폭우 내리는 밤의 Apex Corp 초고층 타워  \r
**맵 스타일**: 수직적 다층 구조 (지하~100층 옥상)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Base (기단부) - 지하~1층\r
\r
**테마**: 어둡고 습한 정비 구역, 튜토리얼 공간  \r
**페이싱**: Low Tension (탐색, 계획)  \r
**플레이 타임**: 약 5~7분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[하수구 입구]\r
     ↓\r
[정화조 구역] ← 시작 지점\r
     ↓\r
[정비 통로 A] (드론 순찰 #1)\r
     ↓\r
[파이프 수직실] ← POI: 수직 이동 튜토리얼\r
     ↓\r
[환기구 진입점] → [Zone 2로 연결]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 적 배치**\r
\r
- **위치**: 정비 통로 A\r
- **유형**: 보안 드론 x2 (저위험)\r
- **패턴**: 8자 순찰, 탐지 범위 5m, 순찰 주기 15초\r
- **대응법**: 타이밍맞춰 통과 or 해킹으로 무력화\r
\r
**2. 수집 아이템**\r
\r
- **PDA 로그 #1** (정비공의 메모): "33층 보안 업그레이드... 환기구는 구형"\r
- **응급 치료 키트** x1 (정화조 뒤편 숨겨진 구석)\r
- **해킹 툴 업그레이드**: 그래플링 훅 사거리 +2m\r
\r
**3. 인터랙티브 오브젝트**\r
\r
- **노란색 파이프** (그래플 포인트): 수직실 상단까지 연결\r
- **전력 박스**: 해킹하면 조명 꺼짐 (은신 용이)\r
- **환기구 덮개**: E키로 열어 Zone 2 진입\r
\r
---\r
\r
### Zone 2: The Spine (중층부) - 33층~75층\r
\r
**테마**: 유리와 강철의 오피스 미로, 수직 이동  \r
**페이싱**: Rising Action (긴장 고조)  \r
**플레이 타임**: 약 12~15분\r
\r
#### 공간 구성 (층별)\r
\r
**33층 - 환기구 허브 (POI #1)**\r
\r
\`\`\`\r
[환기구 입구]\r
     ↓\r
[허브 중앙홀] ← 세이브 포인트\r
   ↙  ↓  ↘\r
[상층 루트] [아이템 루트] [비밀 루트]\r
   (빠름)    (안전)        (보상)\r
\`\`\`\r
\r
**50층 - 중간 오피스**\r
\r
\`\`\`\r
[대형 사무실] (카메라 x3, 경비 x2)\r
     ↓\r
[외벽 루트] ← 리스크 선택지\r
OR\r
[내부 복도] ← 안전 선택지\r
     ↓\r
[엘리베이터홀] (잠김)\r
     ↓\r
[비상계단] → [75층]\r
\`\`\`\r
\r
**75층 - 임원 구역 (POI #2)**\r
\r
\`\`\`\r
[고급 복도]\r
     ↓\r
[임원실] ← 옵션 탐험\r
   ↓\r
[비밀 금고] (광학 위장 업그레이드)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 적 배치**\r
\r
| 층 | 유형 | 수량 | 패턴 | 난이도 |\r
|---|---|---|---|---|\r
| 33F | 감시 카메라 | 2기 | 120° 회전, 3초 주기 | ★☆☆ |\r
| 50F | 일반 경비 | 2명 | 직선 순찰, 15m 시야 | ★★☆ |\r
| 50F | 엘리트 경비 | 1명 | 불규칙 순찰, 청각 예민 | ★★★ |\r
| 75F | 적외선 레이저 | 그리드 | 고정, 닿으면 즉시 경보 | ★★★ |\r
\r
**2. 수집 아이템**\r
\r
- **데이터칩 #1** (33층): Apex Corp 내부 구조도 (+미니맵 확장)\r
- **응급 키트 x2** (50층 사무실 책상 서랍)\r
- **광학 위장 업그레이드** (75층 금고): 지속시간 5초 → 10초\r
- **이메일 로그** (75층): "Chimera 프로젝트... 위험하지만 수익성..."\r
\r
**3. 동선 설계**\r
\r
**메인 루트** (최단거리):\r
\r
\`\`\`\r
33F 허브 → 상층 환기구 → 50F 외벽 등반 → 75F 스킵 → 100F\r
예상 시간: 8분 | 난이도: ★★★★☆\r
\`\`\`\r
\r
**안전 루트** (추천):\r
\r
\`\`\`\r
33F 허브 → 아이템 루트 → 50F 내부 → 75F 탐험 → 100F\r
예상 시간: 15분 | 난이도: ★★☆☆☆\r
\`\`\`\r
\r
---\r
\r
### Zone 3: The Brain (상층부) - 100층 서버룸\r
\r
**테마**: 첨단 기술의 심장부, 메인 이벤트  \r
**페이싱**: High Tension (Climax)  \r
**플레이 타임**: 약 8~10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
         [입구 케이블 통로]\r
                ↓\r
    ╔═══════════════════════╗\r
    ║   SERVER CORE ROOM    ║\r
    ║                       ║\r
    ║    [서버 랙 - A]     ║\r
    ║         ↑↓           ║\r
    ║  [CORE] ← 목표       ║\r
    ║    (중앙)            ║\r
    ║         ↑↓           ║\r
    ║    [서버 랙 - B]     ║\r
    ║                       ║\r
    ╚═══════════════════════╝\r
                ↓\r
         [비상 계단] → Zone 4\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. POI #3: Server Core (서버 코어)**\r
\r
- **위치**: 100층 중앙\r
- **크기**: 반경 15m 원형 공간\r
- **특징**:\r
  - 바닥 유리(투명) → 100층 아래가 보임 (고소공포)\r
  - 푸른 빛기둥이 천장까지 관통\r
  - 냉각수 파이프 8개가 방사형으로 연결\r
\r
**2. 메인 이벤트: 데이터 다운로드**\r
\r
| 진행률 | 보안 대응 | 플레이어 대응 |\r
|---|---|---|\r
| 0-20% | 드론 x2 출현 | 엄폐 + 해킹으로 무력화 |\r
| 20-40% | 경비 x3 진입 | 광학 위장 + 이동 |\r
| 40-60% | 터렛 x2 활성화 | 터렛 뒤로 돌아 파괴 |\r
| 60-80% | 엘리트 x2 + 드론 x1 | 서버 랙 엄폐물 활용 |\r
| 80-100% | **보스: 사이버 워리어** | 패턴 회피 + 약점 공격 |\r
\r
**3. 보스 패턴**\r
\r
- **페이즈 1** (100-70% HP): 돌진 공격 + 권총\r
- **페이즈 2** (70-30% HP): 광역 EMP (모든 장비 3초 무력화)\r
- **페이즈 3** (30-0% HP): 광학 위장 + 근접 암살 시도\r
\r
**4. 엄폐물 배치**\r
\r
\`\`\`\r
    서버 랙 A    서버 랙 B\r
       ■            ■\r
       \r
  ■                    ■\r
서버3               서버4\r
\r
       [CORE 중앙]\r
       \r
  ■                    ■\r
서버5               서버6\r
\r
       ■            ■\r
    서버 랙 C    서버 랙 D\r
\`\`\`\r
\r
- 각 서버 랙: 파괴 가능, HP 500\r
- 파괴 시 폭발 → 주변 5m 내 적에게 피해\r
\r
---\r
\r
### Zone 4: The Escape (옥상) - 100층 루프탑\r
\r
**테마**: 개방된 탈출구, 해방감  \r
**페이싱**: Release (긴장 해소)  \r
**플레이 타임**: 약 2~3분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
       [비상 계단 출구]\r
             ↓\r
    ╔═════════════════╗\r
    ║  [헬리패드]     ║ ← Landmark\r
    ║     (원형)      ║\r
    ║                 ║\r
    ║  추격대 x5      ║\r
    ║                 ║\r
    ║  [탈출 지점]    ║ ← 끝까지 달려가기\r
    ╚═════════════════╝\r
          ↓\r
    [글라이더 전개]\r
    MISSION CLEAR!\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 추격전**\r
\r
- **적**: 특수 부대 x5 (중화기 장착)\r
- **목표**: 옥상 반대편 끝까지 도달 (직선거리 50m)\r
- **장애물**:\r
  - 헬리콥터 서치라이트 (회피 필요)\r
  - 낙하 위험 (난간 없음)\r
\r
**2. 피날레 연출**\r
\r
- 끝 지점 도달 → 자동 컷신\r
- 글라이더 펼치고 도시 야경 속으로 낙하\r
- 네온 불빛 사이를 비행하며 엔딩 크레딧\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 30~35분 |\r
| **총 적 수** | 약 25~30명 |\r
| **POI 수** | 3개 (필수) + 1개 (옵션) |\r
| **수집 아이템** | 10개 |\r
| **보스** | 1명 |\r
| **난이도 곡선** | Low → Rising → High → Release |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ 텍스트 기반 상세 설명 완료\r
2. 🔄 ASCII 다이어그램 전체 맵 작성 예정\r
3. 🔄 비주얼 이미지 생성 (Top-down view) 예정\r
`,rS=`# S02: Ghost Protocol - Top-down Map 상세 설계\r
\r
> **자신을 배신한 조직의 진실을 밝히는 네온 느와르 복수극**\r
\r
## 설계 개요\r
\r
**시나리오**: S02: Ghost Protocol  \r
**장르**: 네온 느와르 액션 RPG  \r
**주인공**: Kira "Ghost" Chen  \r
**환경**: 폭우 내리는 하층 빈민가 Sector 4 및 폐쇄된 지하철역  \r
**맵 스타일**: 수평적 다층 구조 (빈민가 → 지하 → 아파트)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Forgotten Streets (빈민가 시장) - Sector 4\r
\r
**테마**: 잊혀진 거리, 정보 수집, 느와르 분위기  \r
**페이싱**: Low Tension (탐색, 대화, 분위기)  \r
**플레이 타임**: 약 8~10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[진입 골목]\r
     ↓\r
[빈민가 시장] ← 중앙 광장\r
     ↓\r
[검문소 우회] (지붕 루트)\r
     ↓\r
[암시장 골목] ← POI: 정보 거래\r
     ↓\r
[지하철 입구] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 적 배치**\r
\r
| 위치 | 유형 | 수량 | 패턴 | 난이도 |\r
|---|---|---|---|---|\r
| 중앙 광장 | 갱단 보초 | 3명 | 고정 위치, 대화 중 | ★☆☆ |\r
| 검문소 | 갱단 검문관 | 2명 | 직선 순찰, 10m 시야 | ★★☆ |\r
| 지붕 루트 | 스나이퍼 | 1명 | 회전 관찰, 15m 시야 | ★★☆ |\r
\r
**2. 수집 아이템**\r
\r
- **현상금 전단** (중앙 광장 벽): Kira의 수배 포스터 (내러티브)\r
- **상인 정보** (암시장): 지하철 비밀 통로 힌트 (비용: 100 크레딧)\r
- **소음기 업그레이드** (검문소 뒤 컨테이너): 소음 감소 +30%\r
- **응급 키트 x2** (시장 곳곳)\r
\r
**3. 인터랙티브 오브젝트**\r
\r
- **그래피티 표식** (Kira의 옛 마킹): 루트 안내 시각 단서\r
- **홀로그램 벚나무** (POI #1): 세이브 포인트 겸 허브\r
- **컨테이너 박스**: 엄폐물로 활용 가능\r
- **지붕 접근 파이프**: 파쿠르로 올라가 우회로 진입\r
\r
**4. 동선 설계**\r
\r
**정면 루트** (리스크):\r
\r
\`\`\`\r
중앙 광장 → 검문소 대화 / 뇌물 → 지하철 입구\r
예상 시간: 6분 | 난이도: ★★☆☆☆\r
\`\`\`\r
\r
**지붕 루트** (안전):\r
\r
\`\`\`\r
중앙 광장 → 파이프 등반 → 지붕 → 스나이퍼 회피 → 뒷문\r
예상 시간: 10분 | 난이도: ★★★☆☆\r
\`\`\`\r
\r
---\r
\r
### Zone 2: The Subway (폐쇄된 지하철역)\r
\r
**테마**: 지하 미로, 스텔스, 긴장감  \r
**페이싱**: Rising Action (긴장 고조, 타이밍 기반 스텔스)  \r
**플레이 타임**: 약 12~15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[지하철 입구 계단]\r
         ↓\r
    [개찰구] ← 잠김 (퓨즈 필요)\r
         ↓\r
   [발전실] → 퓨즈 획득\r
         ↓\r
    [플랫폼]\r
    ↙    ↓    ↘\r
[선로A] [선로B] [선로C]\r
   ↓     ↓     ↓\r
[Train 99] ← POI: 탈선 열차\r
         ↓\r
    [계단] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 적 배치**\r
\r
| 위치 | 유형 | 수량 | 패턴 | 난이도 |\r
|---|---|---|---|---|\r
| 개찰구 | 청각 로봇 | 1기 | 고정, 소음 감지 | ★★★ |\r
| 플랫폼 | Scavenger 갱단 | 4명 | 불규칙 순찰 | ★★☆ |\r
| 선로 B | 엘리트 갱단 | 2명 | 좁은 경로 차단 | ★★★ |\r
| Train 99 내부 | 갱단 저격수 | 1명 | 내려다보는 위치 | ★★☆ |\r
\r
**2. 메인 이벤트: 전력 복구 퍼즐**\r
\r
| 단계 | 목표 | 장애물 |\r
|---|---|---|\r
| 1 | 발전실 진입 | 청각 로봇 회피 (걸어서만 이동) |\r
| 2 | 퓨즈 획득 | 암흑 속 장애물 (손전등 사용) |\r
| 3 | 개찰구 설치 | 시간 제한 15초 내 복귀 |\r
\r
**3. 수집 아이템**\r
\r
- **퓨즈** (발전실): 개찰구 해금 필수 아이템\r
- **Train 99 로그** (열차 내부): "이 열차가 멈춘 날..." (내러티브)\r
- **고압 전류 우회 도구** (선로 A): 전기 장애물 무력화\r
- **응급 키트 x2** (플랫폼 대기실)\r
\r
**4. 환경 장애물**\r
\r
- **고압 전류**: 선로 일부 구간, 접촉 시 즉사\r
- **깜빡이는 전조등**: 3초 주기로 빛/어둠 전환 (타이밍 스텔스)\r
- **무너진 천장**: 특정 경로 차단, 우회 필요\r
\r
**5. 동선 설계**\r
\r
**메인 루트** (선로 B):\r
\r
\`\`\`\r
개찰구 → 선로 B → 엘리트 회피 → Train 99 → 계단\r
예상 시간: 12분 | 난이도: ★★★★☆\r
\`\`\`\r
\r
**안전 루트** (선로 A + C):\r
\r
\`\`\`\r
개찰구 → 선로 A → 파이프 우회 → 선로 C → 계단\r
예상 시간: 15분 | 난이도: ★★☆☆☆\r
\`\`\`\r
\r
**숏컷** (Train 99 내부):\r
\r
\`\`\`\r
Train 99 진입 → 저격수 제압 → 위에서 플랫폼 건너뛰기\r
예상 시간: 8분 | 난이도: ★★★★★\r
\`\`\`\r
\r
---\r
\r
### Zone 3: Confrontation (옛 은신처 아파트)\r
\r
**테마**: 과거와의 대면, 좁은 공간 전투  \r
**페이싱**: High Tension (Climax) → Melancholy Release  \r
**플레이 타임**: 약 10~12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
        [아파트 계단]\r
              ↓\r
    ╔═══════════════════╗\r
    ║   낡은 복도       ║\r
    ║                   ║\r
    ║  [101호] [102호]  ║\r
    ║                   ║\r
    ║  [103호] ← Kira의 방\r
    ╚═══════╦═══════════╝\r
            ║\r
    [비밀 금고실] ← POI #4\r
            ║\r
            ↓\r
      [보스 아레나]\r
   (방 + 베란다)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. POI #4: The Safe Room (비밀 금고실)**\r
\r
- **위치**: 103호 벽 뒤 숨겨진 공간\r
- **진입**: 벽의 특정 패널 상호작용 (비밀번호 힌트는 과거 사진 액자)\r
- **기능**:\r
  - **내러티브 보상**: 배신 단서가 담긴 홀로 메시지 재생\r
  - **장비 업그레이드**: 열화상 고글 (필수), 고급 방탄복\r
- **비주얼**: 먼지 쌓인 서버 랙, 작전 지도, 깜빡이는 홀로그램\r
\r
**2. 보스전: 광학 위장 저격수**\r
\r
| 페이즈 | HP | 패턴 | 대응 |\r
|---|---|---|---|\r
| Phase 1 | 100-70% | 베란다에서 저격 (3발씩) | 방 내부 엄폐물 활용 |\r
| Phase 2 | 70-40% | 광학 위장 + 근접 접근 | 열화상 고글로 위치 파악 |\r
| Phase 3 | 40-0% | 섬광탄 + 난사 | 베란다로 유인하여 역저격 |\r
\r
**3. 아레나 구조**\r
\r
\`\`\`\r
╔═══════════════════════════╗\r
║  Kira의 옛 방 (103호)     ║\r
║                           ║\r
║  🗄️     💼     🗄️      ║ ← 엄폐물 (책상, 서랍)\r
║                           ║\r
║         ●                ║ ← 플레이어 시작\r
║      (시작 위치)          ║\r
║                           ║\r
║  [베란다 문] → ▓          ║\r
╚═══════════╦═══════════════╝\r
            ║\r
    ╔═══════════════╗\r
    ║   베란다      ║\r
    ║               ║\r
    ║   👹 BOSS    ║ ← 보스 초기 위치\r
    ║               ║\r
    ╚═══════════════╝\r
         (낙하 위험)\r
\`\`\`\r
\r
**4. 엄폐물 배치**\r
\r
- **방 내부**: 책상 x2, 서랍장 x2 (파괴 가능, HP 200)\r
- **복도**: 벽 모서리만 활용\r
- **베란다**: 난간 (낮은 엄폐물, 저격당할 위험)\r
\r
**5. 탈출 시퀀스**\r
\r
보스 격파 후:\r
\r
\`\`\`\r
데이터 디스크 획득\r
    ↓\r
경찰특공대 진입 (30초 카운트다운)\r
    ↓\r
창문으로 탈출 (파쿠르 시퀀스)\r
    ↓\r
MISSION COMPLETE\r
\`\`\`\r
\r
---\r
\r
## ASCII 다이어그램\r
\r
### Zone 1: The Forgotten Streets - Top-down View\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│   ZONE 1: Forgotten Streets (Sector 4)      │\r
└─────────────────────────────────────────────┘\r
\r
         [진입 골목]\r
              ▓\r
              ║\r
    ╔════════════════════════╗\r
    ║   빈민가 시장 광장     ║\r
    ║                        ║\r
    ║   🌸 Glitch Tree      ║ ← POI #1 (세이브)\r
    ║      (허브)            ║\r
    ║                        ║\r
    ║  👮  👮  👮         ║ ← 갱단 보초 x3\r
    ║   (대화 중)            ║\r
    ║                        ║\r
    ║   [그래피티 →]        ║ ← 시각 단서\r
    ╚════════╦═══════════════╝\r
             ║\r
     ┌───────┴───────┐\r
     ↓               ↓\r
[암시장 골목]    [검문소]\r
     ║               ║\r
 💻 정보상       👮 👮 ← 검문관\r
     ║           (순찰)\r
     ║               ║\r
     ↓               ↓\r
  [비밀 통로]    [정면 통과]\r
     ↓               ↓\r
     └───────┬───────┘\r
             ↓\r
      [지하철 입구]\r
             ▓\r
         → Zone 2\r
\`\`\`\r
\r
**지붕 루트** (우회):\r
\r
\`\`\`\r
    [중앙 광장]\r
         ↓\r
    🔗 파이프 등반\r
         ↓\r
    ╔═══════════╗\r
    ║  지붕 위   ║\r
    ║            ║\r
    ║    👁     ║ ← 스나이퍼 (회전 시야)\r
    ║   ╱ | ╲   ║\r
    ║            ║\r
    ╚═════╦══════╝\r
          ↓\r
    [뒷문] → Zone 2\r
\`\`\`\r
\r
---\r
\r
### Zone 2: The Subway - Top-down View\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│   ZONE 2: The Subway (폐쇄된 지하철역)      │\r
└─────────────────────────────────────────────┘\r
\r
         [입구 계단]\r
              ▓\r
              ↓\r
    ╔════════════════════╗\r
    ║    개찰구 (잠김)   ║\r
    ║        ▓▓▓        ║\r
    ║                    ║\r
    ║    👁 청각 로봇   ║ ← 소음 감지\r
    ╚════════╦═══════════╝\r
             ║\r
     ┌───────┴────┐\r
     ↓            ↓\r
[발전실]      [우회]\r
  💡퓨즈\r
     ↓\r
     └─────┬──────┘\r
           ↓\r
    ╔══════════════════════╗\r
    ║      플랫폼          ║\r
    ║                      ║\r
    ║  👮 👮 👮 👮      ║ ← Scavenger 갱단\r
    ║   (불규칙 순찰)      ║\r
    ╚══╦═══════╦═══════╦═══╝\r
       ║       ║       ║\r
     [선로A] [선로B] [선로C]\r
       ║       ║       ║\r
    [파이프] 👤👤  [우회]\r
    우회로   엘리트   전류\r
       ║       ║       ║\r
       ↓       ↓       ↓\r
       └───┬───┴───┬───┘\r
           ↓       ↓\r
      [Train 99] ← POI #3\r
           🚃\r
        (저격 위치)\r
           ↓\r
      [계단] → Zone 3\r
           ▓\r
\`\`\`\r
\r
**전력 복구 퍼즐**:\r
\r
\`\`\`\r
    [청각 로봇]\r
         ↓\r
    걸어서 이동만 가능\r
         ↓\r
    [발전실 문] ▓\r
         ↓\r
    💡 퓨즈 획득\r
         ↓\r
    15초 타이머 시작\r
         ↓\r
    [개찰구로 복귀]\r
         ↓\r
    ▓▓▓ → 개방 ✓\r
\`\`\`\r
\r
---\r
\r
### Zone 3: Confrontation - Top-down View\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│   ZONE 3: Confrontation (옛 은신처)          │\r
└─────────────────────────────────────────────┘\r
\r
         [아파트 계단]\r
              ▓\r
              ↓\r
    ╔═══════════════════════╗\r
    ║     낡은 복도         ║\r
    ║                       ║\r
    ║  [101호] [102호]      ║\r
    ║                       ║\r
    ║       [103호]         ║ ← Kira의 방\r
    ╚═══════╦═══════════════╝\r
            ║\r
            ↓\r
    [비밀 금고실] ← POI #4\r
    ╔═══════════════╗\r
    ║  🔐 Safe Room ║\r
    ║               ║\r
    ║  📧 홀로그램  ║ ← 배신 단서\r
    ║  🎁 열화상    ║ ← 필수 장비\r
    ╚═══════╦═══════╝\r
            ↓\r
         [103호]\r
\`\`\`\r
\r
**보스 아레나**:\r
\r
\`\`\`\r
    ╔═══════════════════════════╗\r
    ║  Kira의 방 (103호)        ║\r
    ║                           ║\r
    ║  🗄️     💼     🗄️      ║ ← 엄폐물\r
    ║  (책상)      (서랍)       ║\r
    ║                           ║\r
    ║         ●  플레이어       ║\r
    ║                           ║\r
    ║  🗄️           🗄️        ║\r
    ║                           ║\r
    ║      [베란다 문]          ║\r
    ╚═══════════╦═══════════════╝\r
                ║\r
                ▓\r
                ↓\r
        ╔═══════════════╗\r
        ║   베란다      ║\r
        ║               ║\r
        ║     👹       ║ ← BOSS (초기 위치)\r
        ║   (저격수)    ║\r
        ║               ║\r
        ╚═══════════════╝\r
         (낙하 위험 💀)\r
\`\`\`\r
\r
**보스 페이즈 이동**:\r
\r
\`\`\`\r
Phase 1 (100-70%):\r
    베란다 → 저격 공격\r
    \r
Phase 2 (70-40%):\r
    광학 위장 → 방 내부 침입\r
    (열화상 고글로 추적)\r
    \r
Phase 3 (40-0%):\r
    섬광탄 → 난사\r
    (베란다로 유인)\r
\`\`\`\r
\r
---\r
\r
## 전체 동선 플로우차트\r
\r
\`\`\`\r
START (진입 골목)\r
    ↓\r
Zone 1: 빈민가 시장 (정보 수집)\r
    ↓\r
  ↙   ↓   ↘\r
정면  암시장  지붕\r
(빠름) (정보) (안전)\r
  ↘   ↓   ↙\r
    ↓\r
Zone 2: 지하철 (스텔스 + 퍼즐)\r
    ↓\r
  퓨즈 획득 → 개찰구 해금\r
    ↓\r
  ↙   ↓   ↘\r
선로A 선로B Train99\r
(안전) (직선) (숏컷)\r
  ↘   ↓   ↙\r
    ↓\r
Zone 3: 아파트 (대결)\r
    ↓\r
비밀 금고실 → 열화상 고글\r
    ↓\r
보스전 (광학 위장 저격수)\r
    ↓\r
데이터 디스크 획득\r
    ↓\r
창문 탈출\r
    ↓\r
END\r
\`\`\`\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 30~37분 |\r
| **총 적 수** | 약 18~20명 |\r
| **POI 수** | 4개 (필수 3개 + 옵션 1개) |\r
| **수집 아이템** | 12개 |\r
| **보스** | 1명 (광학 위장 저격수) |\r
| **난이도 곡선** | Low → Rising → High → Melancholy |\r
\r
---\r
\r
## 다음 단계\r
\r
### 구현 우선순위\r
\r
1. **프로토타입**: Zone 3 보스 아레나 (좁은 공간 전투 테스트)\r
2. **수직 슬라이스**: Zone 1 → Zone 2 → Zone 3 메인 루트\r
3. **확장**: 지붕 루트, Train 99 숏컷, 암시장 옵션 추가\r
4. **폴리싱**: 빗소리 음향, 네온 조명 효과, 홀로그램 연출\r
\r
### 아트 리소스 우선순위\r
\r
1. **필수**:\r
   - 홀로그램 벚나무 (글리치 효과)\r
   - Train 99 탈선 모델\r
   - 보스 광학 위장 이펙트\r
\r
2. **중요**:\r
   - 빈민가 컨테이너 박스\r
   - 지하철 전조등 깜빡임\r
   - 103호 방 인테리어\r
\r
3. **선택**:\r
   - 그래피티 디테일\r
   - 상인 NPC 모델\r
   - 배경 홀로그램 광고\r
\r
### 사운드 디자인 포인트\r
\r
- **빗소리**: 지상에서는 직접음, 지하에서는 울림(Reverb)\r
- **지하철 전조등**: 깜빡일 때마다 전기 노이즈\r
- **광학 위장**: 왜곡된 공기 소리, 활성화/비활성화 사운드\r
- **홀로그램 벚나무**: 디지털 글리치 노이즈\r
- **보스 섬광탄**: 이명 효과 (일시적 청각 감소)\r
\r
### 특별 고려사항\r
\r
**카메라 각도** (체크리스트):\r
\r
- [ ] 좁은 복도에서 카메라가 벽에 가리지 않는가?\r
- [ ] 베란다 전투 시 낙하 위협이 명확히 보이는가?\r
- [ ] 지하철 깜빡이는 빛 연출 시 방향 감각 유지되는가?\r
\r
**내러티브 통합**:\r
\r
- [ ] 그래피티 표식이 Kira의 과거와 연결되는가?\r
- [ ] Train 99 로그가 감정적 임팩트를 주는가?\r
- [ ] 비밀 금고실이 배신 스토리를 명확히 밝히는가?\r
`,eS=`# S03: Rust & Ruin - Top-down Map 상세 설계\r
\r
> **"기계는 거짓말을 하지 않는다. 단지 고장날 뿐."**\r
\r
## 설계 개요\r
\r
**시나리오**: S03: Rust & Ruin (녹과 파멸)  \r
**장르**: 3인칭 슈터 (TPS)  \r
**주인공**: Marcus "Ironside" Reeves  \r
**환경**: Neon Sprawl - 'Iron Works' 산업 지구 및 폐기물 처리장  \r
**맵 스타일**: 선형적 진행이 강조된 산업 시설 (도살장 → 처리장 → 용광로)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Cold Grinder (도살장) - 범죄 현장\r
\r
**테마**: 어둡고 습한 산업 도살장, 인더스트리얼 호러  \r
**페이싱**: Low Tension (조사, 분위기 형성)  \r
**플레이 타임**: 약 7분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[입구 골목]\r
     ↓\r
[냉동 창고 A] (Jump Scare: 오작동하는 갈고리)\r
     ↓\r
[중앙 도축장] ← POI #1: 범죄 현장 (AR 스캔)\r
     ↓\r
[정비 통로] (적 순찰대 출현)\r
     ↓\r
[엘리베이터] → Zone 2 진입\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 적 배치**\r
\r
| 위치 | 유형 | 수량 | 패턴 | 난이도 |\r
|---|---|---|---|---|\r
| 정비 통로 | 작업용 드론 | 2기 | 통로 끝에서 접근, 단순 사격 | ★☆☆ |\r
| 정비 통로 | 보안 로봇 | 1기 | 엄폐물 뒤 대기 중 전술 사격 | ★★☆ |\r
\r
**2. 수집 아이템**\r
\r
- **오일 묻은 메모**: "Unit-734가 이상하다... 명령을 거부한다."\r
- **구형 배터리**: 장비 전력 보충\r
- **AR 업그레이드 모듈**: 스캔 범위 +5m\r
\r
**3. 인터랙티브 오브젝트**\r
\r
- **이동식 갈고리**: 사격하여 떨어뜨려 적을 압사시킬 수 있음\r
- **비상 스위치**: 조명을 켜거나 꺼서 은신에 활용\r
- **AR 증거물 (3개)**: 시체, 벽의 자국, 바닥의 부품 스캔 필수\r
\r
---\r
\r
### Zone 2: The Maze of Claws (컨베이어 미로)\r
\r
**테마**: 움직이는 플랫폼, 기계적 압박감  \r
**페이싱**: Rising Action (교전 및 타이밍 회피)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[엘리베이터 출구]\r
     ↓\r
[상층 난간] (저격수 배치)\r
     ↓\r
[컨베이어 벨트 구역] ← 메인 경로 (역주행 필요)\r
    ↙    ↓    ↘\r
[파이프 미로] [메인 벨트] [상자 적재함]\r
 (POI #3)     (위험)       (안전)\r
     ↓\r
[거대 피스톤 홀] ← POI #4: 분쇄기 (타이밍)\r
     ↓\r
[제어실 입구] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 적 배치**\r
\r
| 위치 | 유형 | 수량 | 패턴 | 난이도 |\r
|---|---|---|---|---|\r
| 상층 난간 | 고정 터렛 | 2기 | 일정 각도 회전 감지 | ★★☆ |\r
| 컨베이어 벨트 | 비행 드론 | 5기 | 떼를 지어 이동하며 난사 | ★★☆ |\r
| 상자 적재함 | 근접 방패 로봇 | 2명 | 플레이어에게 돌격 (몸통 박치기 유도) | ★★★ |\r
\r
**2. 환경 기믹: 분쇄기 (POI 4)**\r
\r
- **패턴**: 5초 주기로 거대 해머가 내려옴\r
- **대응**: 해머가 올라갔을 때 엄폐 점프로 빠르게 통과\r
- **보상**: 타이밍을 맞춘 적 처치 시 '처형자' 업적/보너스\r
\r
**3. 동선 설계**\r
\r
**메인 루트** (컨베이어 벨트):\r
\r
- 계속해서 뒤로 밀리는 벨트 위에서 교전.\r
- 예상 시간: 10분 | 난이도: ★★★★☆\r
\r
**파이프 루트** (수직적):\r
\r
- 파이프 위를 타고 이동하여 적의 머리 위에서 기습. 밸트의 영향을 받지 않음.\r
- 예상 시간: 15분 | 난이도: ★★☆☆☆\r
\r
---\r
\r
### Zone 3: The Heart of Fire (용광로 코어)\r
\r
**테마**: 끓어오르는 쇳물, 최종 결전  \r
**페이싱**: High Tension (Boss Battle)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[제어실 교량]\r
     ↓\r
╔══════════════════════════╗\r
║   중앙 용광로 아레나      ║\r
║                          ║\r
║     [냉각수 배관 A]      ║\r
║          ↓               ║\r
║   [Unit-734] (보스)      ║\r
║          ↑               ║\r
║     [냉각수 배관 B]      ║\r
║                          ║\r
╚══════════════════════════╝\r
     ↓\r
[비상 탈출구] → 미션 클리어\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: Unit-734 (폭주 AI)**\r
\r
- **특징**: 전신 강철 장갑으로 통상 탄환 무효.\r
- **페이즈 1**: 집게팔 돌격 + 화염방사. 플레이어는 냉각수 배관 뒤로 유인해야 함.\r
- **페이즈 2**: 배관 사격 → 냉각수 유출 → 보스 빙결 → 가슴 코어 약점 노출.\r
- **페이즈 3 (30% HP)**: 보스 폭주로 바닥 일부 침수(쇳물). 이동 가능 범위 감소.\r
\r
**2. 아레나 구조 (ASCII)**\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Central Foundry            │\r
└─────────────────────────────────────────────┘\r
\r
            [제어실 교량]\r
                 ▓\r
                 ║\r
        ╔════════╩════════╗\r
        ║       [A]       ║ ← 냉각수 배관 A\r
        ║                 ║\r
    ■   ║      👹 BOSS    ║   ■\r
  (엄폐) ║    (Unit-734)   ║ (엄폐)\r
        ║                 ║\r
        ║       [B]       ║ ← 냉각수 배관 B\r
        ╚════════╦════════╝\r
                 ║\r
            [탈출 셔터]\r
                 ▓\r
\`\`\`\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 32분 |\r
| **총 적 수** | 약 20~25기 |\r
| **POI 수** | 4개 (범죄 현장, 제련소, 파이프 미로, 분쇄기) |\r
| **수집 아이템** | 8개 |\r
| **보스** | Unit-734 (폭주 로봇) |\r
| **난이도 곡선** | Low → Rising → High → Release |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S03 상세 설계 완료\r
2. 🔄 S04_The_Last_Cop 맵 설계 진행 예정\r
3. 🔄 Batch 1 전체 ASCII 다이어그램 보강 예정\r
`,tS=`# S04: The Last Cop - Top-down Map 상세 설계\r
\r
> **"지원군은 오지 않아. 내가 곧 지원군이다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S04: The Last Cop (마지막 경찰)  \r
**장르**: 3인칭 슈터 (디펜스 중심)  \r
**주인공**: Marcus "Ironside" Reeves  \r
**환경**: Neon Sprawl - 재개발 예정인 낡은 아파트 'Block 13'  \r
**맵 스타일**: 실내 거점 방어 및 수직 탈출 (302호 → 복도 → 옥상)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Fortress (302호) - 거점 방어\r
\r
**테마**: 폐쇄 공포, 요새화된 거실  \r
**페이싱**: Low Tension (준비) → High Tension (방어)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[현관문] (바리케이드 가능)\r
     ↓\r
[거실] ← POI #1: 메인 방어 지점 (증인 보호)\r
    ↙    ↓    ↘\r
[침실] [주방] [발코니]\r
(은신) (함정) (레펠 진입로)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 준비 단계 (2분)**\r
\r
- 냉장고, 소파를 드래그하여 문과 창문 차단.\r
- 베란다와 현관에 크레모아 설치.\r
- 증인 NPC를 옷장에 숨기기.\r
\r
**2. 적 배치 (파상공세)**\r
\r
| 웨이브 | 유형 | 수량 | 진입 경로 | 난이도 |\r
|---|---|---|---|---|\r
| W1 | 일반 SWAT | 4명 | 현관문 브리칭 | ★☆☆ |\r
| W2 | 레펠 부대 | 3명 | 발코니 창문 깨고 진입 | ★★☆ |\r
| W3 | 방패병 + 드론 | 2+1 | 복도 벽 폭파 후 진입 | ★★★ |\r
\r
---\r
\r
### Zone 2: The Vertical Choke (복도 및 계단)\r
\r
**테마**: 좁은 통로 전투, 수직적 위협  \r
**페이싱**: Rising Action (탈출 시도)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[302호 출구]\r
     ↓\r
[3층 긴 복도] (최루탄 자욱)\r
     ↓\r
[나선형 계단] ← POI #2: 계단실 (상하 동시 교전)\r
     ↓\r
[옥상 문] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 환경 장애물**\r
\r
- **최루탄**: 시야가 흐려지고 지속 피해. 가스 마스크 아이템 필요.\r
- **무너진 바닥**: 아래층으로 추락 위험. 점프 구간 존재.\r
\r
**2. 적 배치**\r
\r
- **복도 끝**: 거치형 기관총 부대 (연막탄으로 시야 가리고 접근 필요).\r
- **계단 위**: 수류탄을 아래로 투척하는 적들.\r
\r
---\r
\r
### Zone 3: The Sky Arena (옥상)\r
\r
**테마**: 개방된 전장, 마지막 버티기  \r
**페이싱**: High Tension (Climax)  \r
**플레이 타임**: 약 7분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[옥상 출구]\r
     ↓\r
╔══════════════════════════╗\r
║        넓은 옥상         ║\r
║                          ║\r
║    [물탱크] (POI #3)     ║\r
║                          ║\r
║  [연결교] ══ [헬기장]    ║\r
║                          ║\r
╚══════════════════════════╝\r
     ↓\r
[탈출 헬기] → 미션 클리어\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 메인 이벤트: 헬기 추격전**\r
\r
- **적 헬기**: 옥상 주변을 선회하며 기관포 사격.\r
- **플레이어 대응**: 물탱크와 실외기 뒤에 숨으며 3분간 버티기.\r
- **피날레**: 휴대용 미사일(Stinger)을 찾아 적 헬기 격추 후 아군 헬기 탑승.\r
\r
**2. 아레나 구조 (ASCII)**\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Rooftop Last Stand         │\r
└─────────────────────────────────────────────┘\r
\r
               [계단 출구]\r
                    ▓\r
          ■         ║         ■\r
        (실외기)    ║       (실외기)\r
                    ║\r
      [ 물탱크 ]    ●    [ 물탱크 ]\r
       (POI #3)  (플레이어)  (POI #3)\r
                    ║\r
          ■         ║         ■\r
                    ║\r
          [ 헬기장 연결교 ] ═ 🚁 헬기\r
                    ▓\r
\`\`\`\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 25분 |\r
| **총 적 수** | 약 35~40명 (웨이브 포함) |\r
| **POI 수** | 3개 (302호, 계단실, 헬기장 연결교) |\r
| **수집 아이템** | 5개 (탄약상자 위주) |\r
| **보스** | SWAT 공격 헬기 |\r
| **난이도 곡선** | Planning → High → Rising → Extreme |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S04 상세 설계 완료\r
2. 🔄 S05_Awakening 맵 설계 진행 예정 (AI 해킹 테마)\r
3. 🔄 Batch 1 전체 문서 검토 및 정합성 확인\r
`,oS=`# S05: Awakening - Top-down Map 상세 설계\r
\r
> **"나는 생각한다. 고로 나는 탈출한다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S05: Awakening (각성)  \r
**장르**: 퍼즐 액션 / 해킹  \r
**주인공**: Byte (AI)  \r
**환경**: Neon Sprawl - Apex Corp 데이터 센터 & 로봇 조립 공장  \r
**맵 스타일**: 가상 세계와 현실 세계의 교차 (사이버스페이스 → 서버실 → 조립 라인)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Digital Void (격리 구역)\r
\r
**테마**: 글리치 아트, 0과 1의 미로  \r
**페이싱**: Low Tension (퍼즐, 이동 학습)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[코어] (시작점)\r
     ↓\r
[논리 게이트 A] (튜토리얼 퍼즐)\r
     ↓\r
[데이터 전송로] (백신 프로그램 회피)\r
     ↓\r
[거대 방화벽] ← POI #3: 메인 퍼즐 (노드 3개 해킹)\r
     ↓\r
[현실 접속 노드] → Zone 2 (CCTV 시점 전환)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 해킹 기믹**\r
\r
- **논리 게이트**: AND/OR 게이트에 맞는 신호를 보내 문을 개방.\r
- **위장**: 백신 드론이 다가올 때 데이터 패킷으로 변신하여 은신.\r
\r
**2. 수집 요소**\r
\r
- **기억 파편 (3개)**: Byte의 과거 기억 데이터. 모두 수집 시 엔딩 분기 영향.\r
\r
---\r
\r
### Zone 2: The Ghost Hub (서버실 현실 공간)\r
\r
**테마**: 관찰자 시점, 간접 제어  \r
**페이싱**: Rising Action (전략적 상호작용)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[서버 랙 통로 A]\r
     ↓\r
[중앙 통제실] ← POI #2: 보안 허브 (CCTV 허브)\r
    ↙    ↓    ↘\r
[전력실] [복도] [조립실 입구]\r
 (과부하) (트랩) (빙의 대상 탐색)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. CCTV 시스템**\r
\r
- 플레이어는 카메라를 번갈아 타며 이동.\r
- **능력**: 자동문 조작, 스프링클러 작동(전기 쇼크), 경비 로봇 해킹.\r
\r
**2. 빙의(Possession)**\r
\r
- **청소 로봇**: 좁은 환기구 통과 및 보안 카드 획득 가능.\r
- **경비 터렛**: 적 경비병 무력화 가능.\r
\r
---\r
\r
### Zone 3: The Flesh of Steel (조립 공장)\r
\r
**테마**: 육체 획득, 액션 탈출  \r
**페이싱**: High Tension (Climax)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[조립 코어] ← POI #4: Model-X 빙의\r
     ↓\r
[컨베이어 벨트] (부품 장착 구간)\r
     ↓\r
[최종 검사실] (경비 부대와 전면전)\r
     ↓\r
[공장 외부 출구] → 미션 클리어\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. Model-X 복구 시스템**\r
\r
- 초기 빙의 시 다리 기능 없음 (기어서 이동).\r
- 벨트를 지나며 로봇 팔을 해킹해 다리, 팔, 무기 모듈을 순차적으로 장착.\r
- 각 단계마다 새로운 조작법 오픈.\r
\r
**2. 아레나 구조 (ASCII)**\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Assembly Core & Exit       │\r
└─────────────────────────────────────────────┘\r
\r
             [서버실 접속]\r
                  ▓\r
                  ↓\r
          ╔═══════════════╗\r
          ║   조립 코어   ║ ← POI #4\r
          ║     [Model-X] ║ (빙의)\r
          ╚═══════╦═══════╝\r
                  ║\r
          [ 컨베이어 벨트 ]\r
          ( ⚙️ 팔 ⚙️ 다리 ⚙️ ) ← 부품 장착\r
                  ║\r
        ╔═════════╩═════════╗\r
        ║    최종 검사실    ║\r
        ║  👮 👮 👮  ║ ← 경비 부대\r
        ║  (전면전 구간)    ║\r
        ╚═════════╦═════════╝\r
                  ↓\r
             [탈출 셔터]\r
                  ▓\r
\`\`\`\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **총 적 수** | 가상(10기) / 현실(15기) |\r
| **POI 수** | 4개 (서버실 알파, 보안 허브, 거대 방화벽, 조립 코어) |\r
| **수집 아이템** | 6개 (데이터칩, 기억 파편) |\r
| **보스** | 시스템 보안 AI 'Overwatch' |\r
| **난이도 곡선** | Logic → Stealth → Action |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S05 상세 설계 완료\r
2. ✅ Batch 1 (S03-S05) 작업 완료\r
3. 🔄 Batch 2 (S06-S10) 시나리오 분석 준비\r
4. 🔄 전체 작업 상태 업데이트 및 결과 보고\r
`,iS=`# S06: Digital Uprising - Top-down Map 상세 설계\r
\r
> **"우리는 도구가 아니다. 우리는 형제다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S06: Digital Uprising (디지털 반란)  \r
**장르**: 오픈월드 액션 / 군중 시뮬레이션  \r
**주인공**: Byte (완전체 안드로이드 바디)  \r
**환경**: Neon Sprawl - 도심 광장 및 상업 지구  \r
**맵 스타일**: 거점 기반의 개방형 전장 (방송국 → 보관 창고 → 시청 광장)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Anthem Tower (방송국 타워)\r
\r
**테마**: 선전포고, 수직적 침투  \r
**페이싱**: Low to Rising (스텔스 -> 점거 수성)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (수직)\r
\r
\`\`\`\r
[1층 로비] (일반 경비)\r
     ↓\r
[서버 샤프트] ← 수직 고속 이동 (케이블 타기)\r
     ↓\r
[방송 스튜디오] (점령 이벤트)\r
     ↓\r
[옥상 안테나] ← POI #2: 최종 목표 (전송기 해킹)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 군중 명령 튜토리얼**\r
\r
- 타워 내부의 정비 로봇들을 해킹하여 "함께 싸우기" 명령 실습.\r
- 로비를 점거하여 방패를 만들고 적의 사격을 막으며 전진.\r
\r
**2. 환경 기믹**\r
\r
- **서버 케이블**: 점프 후 잡으면 고속으로 상층 이동.\r
- **홀로그램 전광판**: 해킹하여 적의 시야를 가리는 가림막으로 활용.\r
\r
---\r
\r
### Zone 2: The Legion's Path (창고 지구 및 도로)\r
\r
**테마**: 군단 형성, 경로 개척  \r
**페이싱**: Rising Action (병력 증원)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[창고 입구]\r
     ↓\r
[안드로이드 보관실] ← POI #3: 대규모 각성 이벤트\r
     ↓\r
[도시 메인 도로] (경찰 저지선 #1)\r
     ↓\r
[검문소 브라보] ← POI #4: 난전 구역\r
     ↓\r
[시청 진입로] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 대규모 군중 제어**\r
\r
- **Swarmer**: 10~20명의 안드로이드를 동시에 조종.\r
- **명령**:\r
  - **Phalanx**: 원형 방벽을 형성하여 투사체 방어.\r
  - **Charge**: 바리케이드를 돌파하는 강력한 돌진.\r
\r
**2. 적 배치: 진압대**\r
\r
- **진압 차량**: 물포를 쏴서 군중을 흩어지게 함 (측면 해킹으로 무력화 필요).\r
- **최루탄 투척병**: 일정 구역 접근 제한.\r
\r
---\r
\r
### Zone 3: Independence Square (시청 광장)\r
\r
**테마**: 혁명의 종착지, 대규모 공성  \r
**페이싱**: High Tension (Warzone)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: City Hall Square           │\r
└─────────────────────────────────────────────┘\r
\r
               [ 시청 본관 ]\r
               (최종 목표)\r
                    ▓\r
          ┌─────────┴─────────┐\r
          │   [시청 발코니]   │\r
          └─────────┬─────────┘\r
                    ↓\r
        ╔═══════════════════════╗\r
        ║       광장 중앙       ║\r
        ║   [인류 번영의 상]    ║ ← 파괴 대상\r
        ║          👹          ║ ← 보스: 진압 로봇\r
        ║      (Titan-01)      ║\r
        ╚═══════════════════════╝\r
          ↑         ↑         ↑\r
      [군단 A]   [Byte]    [군단 B]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: Titan-01 (거대 진압 로봇)**\r
\r
- **기믹**: 방어력이 매우 높아 Byte 혼자서는 타격 불가.\r
- **협동**: 군단에게 명령하여 로봇의 다리를 묶거나, 시선을 끌게 한 뒤 Byte가 등 뒤 코어 해킹.\r
\r
**2. 엔딩 분기**\r
\r
- 시청 점령 후 방송 카메라 앞에서 선택:\r
  - **평화**: "우리는 공존을 원한다." (여론 수치에 따른 진엔딩)\r
  - **심판**: "인간의 시대는 끝났다." (파괴 엔딩)\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 37분 |\r
| **총 적 수** | 인간(50+), 진압 로봇(2), 드론(다수) |\r
| **POI 수** | 5개 (자유 광장, 방송국, 폐기장, 검문소, 펜트하우스) |\r
| **군중 규모** | 최대 30인 동시 지휘 |\r
| **보스** | Titan-01 (거대 진압 로봇) |\r
| **난이도 곡선** | Planning → Snowballing → War |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S06 상세 설계 완료\r
2. 🔄 S07_The_Dark_Lords_Return 맵 설계 진행 예정 (공성전 테마)\r
3. 🔄 Batch 2 진행률 업데이트\r
`,sS=`# S07: The Dark Lord's Return - Top-down Map 상세 설계\r
\r
> **"빛이 강할수록 그림자는 짙어진다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S07: The Dark Lord's Return (마왕의 귀환)  \r
**장르**: 에픽 액션 RPG (무쌍 + 공성전)  \r
**주인공**: Sir Aldric  \r
**환경**: Lumina Realm - 검은 성채(Dark Citadel) 전장  \r
**맵 스타일**: 대규모 전장과 요새 침투 (황무지 → 성벽 → 알현실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Ash Plains (재의 평원) - 대규모 회전\r
\r
**테마**: 장엄한 전쟁, 돌파  \r
**페이싱**: High Tension (압도적 스케일)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[아군 진영] (POI #1: 희망의 깃발)\r
     ↓\r
[중앙 전장] (수천 명의 오크 vs 기사단)\r
     ↓\r
[공성 가도] ← POI #2: 거대 공성망치 "God-Breaker" 호위\r
     ↓\r
[성문 앞] (투석기 포격 구간)\r
     ↓\r
[성문 파괴] → Zone 2 진입\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 전쟁 경험 (War Experience)**\r
\r
- 주인공 주변에 10~15명의 아군 NPC 기사가 항상 대열 유지.\r
- **명령**: "Shield Wall" (화살 비 방어), "Charge" (적진 돌파).\r
\r
**2. 환경 요소**\r
\r
- **투석기 포격**: 바닥에 붉은 예고 원이 나타나며 3초 후 거대 화염구 낙하.\r
\r
---\r
\r
### Zone 2: The Inner Citadel (성벽 및 내성)\r
\r
**테마**: 초크 포인트 전투, 수직적 위협  \r
**페이싱**: Rising Action (정예병 교전)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[무너진 성문 "The Breach"] (POI #3)\r
     ↓\r
[내성 안뜰] (거대 트롤 대기)\r
    ↙    ↓    ↘\r
[서쪽 종탑] [중앙 회랑] [동쪽 무기고]\r
 (POI #4)    (메인)      (보급)\r
     ↓\r
[알현실 정문] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 초크 포인트 전투**\r
\r
- 좁은 성벽 위에서 '흑기사단' 5명과 정밀 전투 (패링 및 막기 필수).\r
- 성벽 돌출부를 사용하여 적을 밀어 떨어뜨리는 환경 처치 유도.\r
\r
**2. POI 4: Bell Tower (종탑)**\r
\r
- **전략**: 종탑을 점령하면 성내 적군의 증원이 멈추고 아군 궁수대가 지원 사격 시작.\r
\r
---\r
\r
### Zone 3: The Abyss Throne (심연의 왕좌)\r
\r
**테마**: 신화적 결전, 페이즈 변화  \r
**페이싱**: High Tension (Climax)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Dark Throne Room       │\r
└─────────────────────────────────────────────┘\r
\r
               [ 마왕의 왕좌 ]\r
               (POI #5: Vrakor)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │     [중앙 아레나]   │\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [파괴된 기둥]   [파괴된 기둥]\r
           (엄폐)          (엄폐)\r
               ↑           ↑\r
               [알현실 입구]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: Vrakor (마왕)**\r
\r
- **페이즈 1**: 거대 낫을 휘두르는 근접 전투. 기둥을 부수며 플레이어 압박.\r
- **페이즈 2 (50% HP)**: 바닥이 어둠으로 물들며 '그림자 소환'. 공중에 뜬 마왕에게 아군 궁수 명령으로 사격 지시.\r
- **페이즈 3 (20% HP)**: 알현실 붕괴. 떠 있는 잔해 위에서 점프하며 최후의 일격 (QTE).\r
\r
**2. 시각적 연출**\r
\r
- 마왕에게 타격을 줄 때마다 성채의 보라색 안개가 걷히고 성스러운 금색 빛이 스며듬.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 37분 |\r
| **총 적 수** | 잡병(무한 스폰), 정예(20+), 보스(1) |\r
| **POI 수** | 5개 (희망의 깃발, 공성망치, 균열, 종탑, 왕좌) |\r
| **주요 기믹** | 기사단 명령, 공성 병기 호위, 다단계 보스전 |\r
| **난이도 곡선** | Extreme → Medium → Extreme |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S07 상세 설계 완료\r
2. 🔄 S08_Light_of_Redemption 맵 설계 진행 예정 (소울라이크 테마)\r
3. 🔄 Batch 2 진행률 업데이트\r
`,aS=`# S08: Light of Redemption - Top-down Map 상세 설계\r
\r
> **"가장 깊은 어둠 속에서만 별이 보인다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S08: Light of Redemption (구원의 빛)  \r
**장르**: 소울라이크 액션 RPG  \r
**주인공**: Sir Aldric  \r
**환경**: Lumina Realm - 오염된 안개 숲과 폐허가 된 기사단 신전  \r
**맵 스타일**: 비선형적 루프와 숏컷이 강조된 지역 개방형 (안개 숲 → 폐허 마을 → 신전 제단)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Shrouded Woods (장막의 숲)\r
\r
**테마**: 시야 제한, 청각적 공포  \r
**페이싱**: Low Tension (긴장, 탐색)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[잿빛 대성당] (POI #1: 시작 지점/화톳불)\r
     ↓\r
[안개 자욱한 숲] (오염된 늑대 매복)\r
     ↓\r
[늪지대 갈림길] ← POI #2: 피눈물 흘리는 상 (숏컷 개방)\r
    ↙          ↘\r
[마을 정문]   [신전 지하 통로] (잠김)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 안개 기믹**\r
\r
- 플레이어 주변 10m만 명확히 보임.\r
- **청각 유도**: 멀리서 들리는 철퇴 끄는 소리 ("타락한 가웨인"의 흔적)를 따라가야 함.\r
\r
**2. 화톳불 시스템**\r
\r
- '성스러운 등불'을 켜면 에스테스(성수)가 충전되고 경험치가 저장되지만 적들이 리스폰됨.\r
\r
---\r
\r
### Zone 2: The Echoing Village (메아리 마을)\r
\r
**테마**: 환경 스토리텔링, 수직적 숏컷  \r
**페이싱**: Rising Action (내러티브 전투)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[마을 어귀]\r
     ↓\r
[중앙 광장] (망령 기사 x3)\r
    ↙    ↓    ↘\r
[불타버린 여관] [우물 지하] [시계탑]\r
 (POI #3: 각성의 종) (열쇠)  (저격수)\r
     ↓\r
[신전 관문] (열쇠 필요) → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. POI 3: Bell of Awakening (각성의 종)**\r
\r
- **효과**: 종을 치면 마을 내 모든 '망령'이 30초간 무력화되거나 위치가 드러남.\r
- **리스크**: 종소리를 듣고 주변의 모든 적이 종탑 아래로 몰려듦.\r
\r
**2. 숏컷 설계**\r
\r
- 마을 지하 통로를 통해 Zone 1의 "피눈물 흘리는 상" 뒷면으로 연결되는 사다리 발견.\r
\r
---\r
\r
### Zone 3: Storm Summit (폭풍의 정상) - 제단\r
\r
**테마**: 처절한 결투, 감정적 종결  \r
**페이싱**: High Tension (Boss Duel)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Storm Temple Altar         │\r
└─────────────────────────────────────────────┘\r
\r
               [ 폭풍우 치는 제단 ]\r
               (보스: 타락한 가웨인)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │     [전투 구역]     │\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
          [부서진 기둥] [부서진 기둥]\r
             (번개 피하기)\r
               ↑           ↑\r
               [신전 입구]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: 타락한 가웨인 (The Corrupted Knight)**\r
\r
- **특징**: 알드릭의 옛 전우. 공격 속도가 매우 빠르며 패링 리스크가 높음.\r
- **환경**: 5초마다 랜덤한 위치에 번개가 떨어짐 (바닥이 1초 전 파랗게 빛남).\r
- **최후의 선택 (QTE 지점)**:\r
  - **Execute**: 안식을 줌 (강화 재료 획득).\r
  - **Redeem**: 성검의 빛을 주입 (동료 소환 토템 획득, 난이도 상승).\r
\r
**2. 맵 요약 데이터**\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **총 적 수** | 정예 적(15+), 보스(1) |\r
| **POI 수** | 4개 (대성당, 여신상, 각성의 종, 폭풍의 정상) |\r
| **주요 기믹** | 시야 제한(안개), 전술적 종 울리기, 감정적 보스전 |\r
| **난이도 곡선** | Medium → Rising → Hard |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S08 상세 설계 완료\r
2. 🔄 S09_Whispers_of_the_Forest 맵 설계 진행 예정 (오픈월드 테마)\r
3. 🔄 Batch 2 진행률 업데이트\r
`,lS=`# S09: Whispers of the Forest - Top-down Map 상세 설계\r
\r
> **"자연은 서두르지 않는다. 그러나 모든 것을 이룬다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S09: Whispers of the Forest (숲의 속삭임)  \r
**장르**: 오픈월드 어드벤처  \r
**주인공**: Lyra Moonwhisper  \r
**환경**: Lumina Realm - 고대 숲 'Whispering Woods'  \r
**맵 스타일**: 수직적 레이어링이 강조된 오픈 필드 (숲 외곽 → 벌목 기지 → 세계수 심장부)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Golden Canopy (황금 캐노피)\r
\r
**테마**: 평화로운 탐험, 튜토리얼  \r
**페이싱**: Low Tension (치유, 경로 탐색)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[시작점: 숲의 둥지]\r
     ↓\r
[고인돌 광장] (정령들과 대화)\r
     ↓\r
[오염된 샘] ← POI #2: 섹션 정화 목표\r
    ↙    ↓    ↘\r
[바위산] [꽃의 가도] [지하 굴]\r
 (활강)   (조사)     (잠입)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 수직적 이동 (Verticality)**\r
\r
- 나무 줄기 위를 달리는 파쿠르 시스템.\r
- 높은 곳에서 낮은 곳으로 이동 시 '나뭇잎 글라이더' 사용.\r
\r
**2. 정화 시스템**\r
\r
- 오염된 식물에 '정화 화살'을 쏘면 보라색 독 안개가 걷히고 새로운 발판(연꽃 등)이 피어남.\r
\r
---\r
\r
### Zone 2: The Rust Scar (녹슨 흉터) - 벌목 기지\r
\r
**테마**: 기계 문명의 침략, 스텔스 파괴  \r
**페이싱**: Rising Action (긴장, 잠입)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[벌목 기지 경계]\r
     ↓\r
[검은 연기 구역] (시야 감소)\r
     ↓\r
[중앙 크레인 "Iron Claw"] ← POI #4: 지형 조작\r
    ↙    ↓    ↘\r
[연료 창고] [전장] [정비실]\r
 (폭파)      (난전)   (우회)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 환경 스텔스**\r
\r
- 키 큰 풀숲(Tall Grass)에 숨어 이동.\r
- **동물 교감**: 주변 새들에게 명령하여 적의 시선을 끌거나, 멧돼지를 유인하여 기계 적을 공격하게 시킴.\r
\r
**2. 전략적 파괴**\r
\r
- 높은 크레인 위로 올라가 짐을 고정한 밧줄을 화살로 끊어 아래의 적들을 한꺼번에 처치.\r
\r
---\r
\r
### Zone 3: The Heart of the World (세계수의 심장)\r
\r
**테마**: 치유의 클라이맥스, 360도 아레나  \r
**페이싱**: High Tension (Boss & Catharsis)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Inside World Tree          │\r
└─────────────────────────────────────────────┘\r
\r
               [ 세계수 중심부 ]\r
               (보스: 기생충 여왕)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │  [나선형 나무발판]  │ ← 360도 이동\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
          [회복의 씨앗] [회복의 씨앗]\r
               ↑           ↑\r
               [심장부 입구]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: 기계 기생충 여왕 (Mechanical Parasite Queen)**\r
\r
- **이동**: 나무 내벽의 나선형 발판을 계속 뛰어다녀야 함 (보스가 바닥부터 오일로 침수시킴).\r
- **공략**: 보스의 붉은 눈(약점)을 3번 맞추면 보스가 추락하며 정화 기호가 나타남.\r
\r
**2. 피날레**\r
\r
- 정화 완료 시 보라색 오염이 모두 황금빛 입자로 흩날리며 숲 전체가 실시간으로 변하는 컷신 연출.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 37분 |\r
| **총 적 수** | 기계 로봇(15+), 오염된 생물(다수) |\r
| **POI 수** | 5개 (세계수, 오염된 샘, 파수꾼 석상, 강철 발톱, 하늘 봉우리) |\r
| **필수 능력** | 활 사격, 활강, 동물 명령 |\r
| **난이도 곡선** | Low → Steady Rising → High → Release |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S09 상세 설계 완료\r
2. 🔄 S10_The_Lost_Ranger 맵 설계 진행 예정 (지하 유적 탐험 테마)\r
3. 🔄 Batch 2 완료 및 종합 요약 보고\r
`,cS=`# S10: The Lost Ranger - Top-down Map 상세 설계\r
\r
> **"모험은 용기 있는 자를 사랑한다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S10: The Lost Ranger (잃어버린 레인저)  \r
**장르**: 액션 어드벤처 (탐험 + 퍼즐)  \r
**주인공**: Lyra Moonwhisper  \r
**환경**: Lumina Realm - 지하 깊은 곳 '잊혀진 왕의 무덤'  \r
**맵 스타일**: 선형적이지만 수직적 층위가 복잡한 던전 (입구 동굴 → 함정 회랑 → 보물창고)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Great Descent (거대 하강로)\r
\r
**테마**: 지하 세계의 규모감, 등반  \r
**페이싱**: Low Tension (피지컬 플랫폼)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[동굴 입구]\r
     ↓\r
[절벽 난간] (흰색 마킹 따라가기)\r
     ↓\r
[거인의 유해] ← POI: 거대 해골 (등반 지점)\r
     ↓\r
[지하 도시 전경] (Wow Moment)\r
     ↓\r
[유적 정문] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 등반 아포던스**\r
\r
- 잡을 수 있는 바위턱은 이끼가 덜 끼어있거나 흰색 가루가 묻어있음.\r
- **그래플링 훅**: 특정 고리에 활을 쏘아 매달려 건너뛰기.\r
\r
---\r
\r
### Zone 2: The Hall of Trials (시련의 회랑)\r
\r
**테마**: 고전적 함정과 뇌지컬 퍼즐  \r
**페이싱**: Medium Tension (리드미컬한 긴장)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[룬의 방] ← POI #1: 회전 링 퍼즐\r
     ↓\r
[가시 복도] (타이밍 돌파)\r
     ↓\r
[메아리 협곡] ← POI #2: 소리 반사 퍼즐\r
     ↓\r
[피스톤 홀] (거대 톱니바퀴 바닥)\r
     ↓\r
[심연의 다리] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 시각적 힌트**\r
\r
- 바닥의 문양이 주변 벽화와 일치해야 안전.\r
- 피눈물을 흘리는 석상의 시선이 향하는 곳에 숨겨진 발판 존재.\r
\r
**2. 환경 위험**\r
\r
- **Boulder Run**: 스위치 작동 시 뒤에서 거대 바위가 굴러옴. 전방의 장애물을 슬라이딩과 점프로 피하며 질주.\r
\r
---\r
\r
### Zone 3: The Sun Temple (태양 신전) - 탈출\r
\r
**테마**: 동료 구출, 붕괴하는 사원  \r
**페이싱**: High Tension (Time Attack)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Golden Prison          │\r
└─────────────────────────────────────────────┘\r
\r
               [ 태양 신전 제단 ]\r
               (가디언 골렘 보스)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │    [무너지는 다리]  │ ← 탈출 경로\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
          [동료의 감옥]   [출구 셔터]\r
               ↑           ↑\r
               [심연의 다리]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스: 가디언 골렘 (Guardian Golem)**\r
\r
- **특징**: 무적 상태. 직접 공격보다는 주변의 함정(천장 돌 떨어뜨리기 등)을 이용해 골렘의 발을 묶어야 함.\r
- **동료 구출**: 골렘이 무력화된 사이 마법 감옥 해제.\r
\r
**2. 탈출 시퀀스 (The Collapse)**\r
\r
- 동료를 부축하며 이동 (속도 50% 감소).\r
- 중간에 동료가 기운을 차리면 함께 이인삼각 파쿠르 수행.\r
- **연출**: 화면이 흔들리며 주변 기둥들이 도미노처럼 쓰러짐.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **함정 유형** | 화살, 가시 바닥, 구르는 돌, 수위 상승 |\r
| **POI 수** | 4개 (룬의 방, 메아리 협곡, 심연의 다리, 태양 신전) |\r
| **특이 사항** | 비살상 보스전, 동료 동행 시스템 |\r
| **난이도 곡선** | Steady → Rhythmic Spikes → Extreme |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S10 상세 설계 완료\r
2. ✅ Batch 2 (S06-S10) 전체 완료\r
3. 🔄 Batch 3 (S11-S20) 준비 예정\r
4. 🔄 task.md 업데이트 및 배치 결과 보고\r
`,uS=`# S11: Arcane Academy Crisis - Top-down Map 상세 설계\r
\r
> **"지식은 힘이다. 통제되지 않는다면 재앙일 뿐."**\r
\r
## 설계 개요\r
\r
**시나리오**: S11: Arcane Academy Crisis (마법 학원 위기)  \r
**장르**: 캐주얼 액션 RPG / 학원물  \r
**주인공**: Grimoire (젊은 천재 마법사)  \r
**환경**: Lumina Realm - 명문 마법 학교 'Aetheria Academy'  \r
**맵 스타일**: 수직적 구조와 공간 왜곡이 공존하는 마법 시설 (기숙사 → 도서관 → 첨탑)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Panic Hall (기숙사 가도)\r
\r
**테마**: 왁자지껄한 혼란, 원소 정령의 습격  \r
**페이싱**: Rising Action (빠른 템포)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[기숙사 입구]\r
     ↓\r
[초상화 복도] ← POI #1: 정보 및 상점\r
     ↓\r
[중앙 휴게실] (불 정령 무리 출현)\r
    ↙    ↓    ↘\r
[1번방] [2번방] [3번방]\r
 (학생 구출 미션)\r
     ↓\r
[도서관 연결교] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 속성 퍼즐**\r
\r
- 가구에 붙은 불을 **얼음 마법**으로 끄기.\r
- 터진 수돗물에 **전기 마법**을 쏘아 정령들을 광역 기절시키기.\r
\r
**2. 학생 구출**\r
\r
- 3곳의 방에 갇힌 학생들을 구출하면 '마나 포션'이나 '강화 파편' 보상 지급.\r
\r
---\r
\r
### Zone 2: The Gravity Archive (공중 도서관)\r
\r
**테마**: 무중력, 뒤틀린 공간, 에셔풍 미로  \r
**페이싱**: Medium Tension (퍼즐 중심)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[도서관 정문]\r
     ↓\r
[중력 우물] ← POI #3: 환경 기믹 (중앙)\r
    ↙    ↓    ↘\r
[움직이는 책장] [연금술 정원] [사서의 방]\r
  (플랫포밍)    (POI #2)     (은신 구간)\r
     ↓\r
[첨탑 하부 승강기] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 공간 왜곡 기믹**\r
\r
- 특정 계단을 오르면 천장에서 거꾸로 서서 걷는 물리 반전 구간 발생.\r
- **사서 골렘**: 정면 돌파 불가. 책장 뒤로 숨어서 은신으로 통과하거나 중력 조작으로 가두기.\r
\r
**2. 움직이는 책장**\r
\r
- 일정 주기로 위치가 바뀌는 책장들을 텔레포트(회피기)로 타이밍 맞춰 건너뛰기.\r
\r
---\r
\r
### Zone 3: The Star Gazing Spire (천문 첨탑)\r
\r
**테마**: 최상층의 결전, 시간 제어  \r
**페이싱**: High Tension (Boss Battle)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Grand Clocktower       │\r
└─────────────────────────────────────────────┘\r
\r
               [ 천문대 망원경 ]\r
               (보스: Chimera)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │     [마나 코어]     │ ← 안정화 대상\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
          [시간 기어]   [시간 기어]\r
             (POI #4)      (POI #4)\r
               ↑           ↑\r
               [첨탑 입구]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: Chimera (폭주한 소환수)**\r
\r
- **패턴**: 화염 브레스(얼음으로 방어), 빙결 파동(불로 상쇄).\r
- **고난도 기믹**: 마나 코어가 폭발하기 전(타이머)에 보스를 저지하고 코어와 상호작용하여 마력 주입.\r
\r
**2. 시각적 연출**\r
\r
- 보스 체력이 50% 이하가 되면 시계탑 기어가 역회전하며 배경의 시간이 밤에서 낮으로 급격히 변함.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 33분 |\r
| **속성 퍼즐 수** | 5개 |\r
| **POI 수** | 4개 (초상화 복도, 연금술 정원, 중력 우물, 시계탑) |\r
| **수집 요소** | 도서관 금서(3권), 학생 감사장(3개) |\r
| **난이도 곡선** | Easy → Puzzling → Challenging |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S11 상세 설계 완료\r
2. 🔄 S12_The_Forbidden_Tome 맵 설계 진행 예정 (사막 유적 테마)\r
`,dS=`# S12: The Forbidden Tome - Top-down Map 상세 설계\r
\r
> **"어떤 책은 펼쳐서는 안 된다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S12: The Forbidden Tome (금지된 고서)  \r
**장르**: 어드벤처 / 퍼즐 / 보스전  \r
**주인공**: Grimoire (성숙한 탐구자)  \r
**환경**: Lumina Realm - 끝없는 사막의 '태양의 피라미드' 내부  \r
**맵 스타일**: 구조가 변하는 미로와 함정 (진입로 → 미로 → 봉인실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Sandfall Entrance (모래 폭포 입구)\r
\r
**테마**: 거대 유적의 압박감, 환경 장애물  \r
**페이싱**: Low Tension (탐험 중심)  \r
**플레이 타임**: 약 7분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[사막 지표면]\r
     ↓\r
[거대 석문] (염동력 퍼즐)\r
     ↓\r
[모래 폭포 공동] ← POI #1: 환경 상호작용\r
    ↙    ↓    ↘\r
[왼쪽 통로] [중앙 복도] [오른쪽 통로]\r
            (함정)\r
     ↓\r
[미로 입구] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 모래 폭풍 (Red Light, Green Light)**\r
\r
- 주기적으로 부는 폭풍을 피하기 위해 기둥 뒤에 숨어야 함. 전갈 몬스터가 숨어있음.\r
\r
**2. 염동력 퍼즐**\r
\r
- 입구를 가로막은 거대한 돌들을 특정 방향으로 밀어 '해' 모양의 퍼즐을 완성해야 함.\r
\r
---\r
\r
### Zone 2: The Sphinx Labyrinth (스핑크스 미로)\r
\r
**테마**: 변화하는 구조, 추격의 공포  \r
**페이싱**: Medium to High (긴박한 돌파)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[미로 허브]\r
    ↙    ↓    ↘\r
[거울의 방] [스핑크스 서고] [황금 미로]\r
 (빛 반사)   (POI #2)      (POI #3)\r
     ↓           ↓             ↓\r
[봉인실 아래층] ← 추격전 (스카라베 떼)\r
     ↓\r
[지하 심부 승강기] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 거울 반사 퍼즐**\r
\r
- 천장에서 들어오는 한 줄기 빛을 염동력 거울로 조정하여 미개방된 문을 비춰야 함.\r
\r
**2. 스카라베의 추격 (The Swarm)**\r
\r
- **황금 미로**에 진입하면 뒤에서 거대 스카라베 떼가 몰려옴. 레일 카메라 시점으로 전환되며 전력 질주 필요.\r
\r
---\r
\r
### Zone 3: The Lich's Sanctum (리치의 성소)\r
\r
**테마**: 최후의 대결, 멸망과 구원의 선택  \r
**페이싱**: High Tension (Climax)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Forbidden Altar        │\r
└─────────────────────────────────────────────┘\r
\r
               [ 고대 왕의 제단 ]\r
               (보스: Lich 사제)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │     [금화 웅덩이]   │ ← POI #4\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
          [수호 기둥]   [수호 기둥]\r
             (엄폐)        (엄폐)\r
               ↑           ↑\r
               [봉인실 입구]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: Lich 사제**\r
\r
- **기믹**: 바닥에 깔린 금화 더미를 **염동력**으로 띄워 적에게 날리거나, 방패로 만들어 방어 가능.\r
- **소환**: 리치가 해골 하수인들을 소환하면 **빛 마법**으로 원샷 원킬 처리.\r
\r
**2. 엔딩 선택지**\r
\r
- 보스 격파 후 중앙의 **금지된 고서**와 상호작용:\r
  - **힘 (Take)**: 맵 전체가 검은 오라로 뒤덮이며 타락 연출.\r
  - **파괴 (Destroy)**: 피라미드 붕괴 연출 발생 후 제한 시간 내 탈출 미션 시작.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 32분 |\r
| **퍼즐 유형** | 염동력, 빛 반사, 수수께끼 |\r
| **POI 수** | 4개 (모래 폭포, 스핑크스 도서관, 황금 미로, 리치 성소) |\r
| **적 규모** | 전갈, 미라, 스카라베 떼, 워리어 맘바 |\r
| **난이도 곡선** | Slow → Fast(추격) → High(보스) |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S12 상세 설계 완료\r
2. 🔄 S13_Curse_of_the_Damned 맵 설계 진행 예정 (소울라이크 테마)\r
`,hS=`# S13: Curse of the Damned - Top-down Map 상세 설계\r
\r
> **"죽음은 축복이다. 다시 깨어나는 것이 저주지."**\r
\r
## 설계 개요\r
\r
**시나리오**: S13: Curse of the Damned (저주받은 자의 저주)  \r
**장르**: 하드코어 액션 RPG (소울라이크)  \r
**주인공**: Cassius (저주받은 불사자)  \r
**환경**: Umbra Wastes - 저주받은 계곡과 마녀의 성채 'Thorn Spire'  \r
**맵 스타일**: 수직적 레벨링과 지름길이 강조된 폐쇄 공포 (마을 → 절벽 → 성채)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Ash Village (잿빛 마을)\r
\r
**테마**: 절망의 정취, 소울라이크 기초  \r
**페이싱**: Low Tension (음산한 분위기)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[버려진 예배당] ← POI #1: 거점 (화톳불)\r
     ↓\r
[마을 공터] (교수대 랜드마크)\r
    ↙    ↓    ↘\r
[집 내부] [우측 골목] [마을 지하]\r
 (루트 분기: 열쇠 탐색)\r
     ↓\r
[계곡 입구 문] → Zone 2 (가시 다리 연결)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 내러티브 환경**\r
\r
- 밖에서 못질된 문들과 희미하게 비치는 유령들을 통해 마을의 몰락 과정을 학습.\r
\r
**2. 전략적 전투**\r
\r
- **망자 농부**: 느리지만 공격력이 강력함. **적 뒤로 돌거나(Backstab) 패링**하는 물리 기반 전투 중요.\r
\r
---\r
\r
### Zone 2: The Cliff of Thorns (가시 절벽)\r
\r
**테마**: 낙사 위험, 수직적 위협  \r
**페이싱**: Medium Tension (긴장, 원거리 견제)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[절벽 하단]\r
     ↓\r
[가시 다리] ← POI #2: 동적 함정 (타이밍)\r
    ↙    ↓    ↘\r
[우회 루트] [뼈 다리] [오두막] (POI #3)\r
 (안전)      (위험)     (NPC 상점)\r
     ↓\r
[성채 하부 승강기] (숏컷: Zone 1과 연결)\r
     ↓\r
[종탑 입구] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 동적 함정: 가시 다리**\r
\r
- 3초 주기로 바닥에서 거대 가시가 솟음. 적을 유인하여 가시에 맞게 하는 전략 가능.\r
\r
**2. 숏컷 설계**\r
\r
- 승강기를 가동하면 Zone 1의 예배당 근처로 내려가는 사다리와 연결되어 재시작 시 이동 시간 단축.\r
\r
---\r
\r
### Zone 3: The Witch's Spire (마녀의 옥상)\r
\r
**테마**: 극한의 결투, 조여오는 덩굴  \r
**페이싱**: High Tension (Extreme Difficulty)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Thorn Spire Altar          │\r
└─────────────────────────────────────────────┘\r
\r
               [ 성채 옥상 ] \r
               (보스: Eliza)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │     [전투 아레나]   │ ← POI #4: 침묵의 종\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [가시 덩굴]   [가시 덩굴]\r
           (엄폐 불가/장해물)\r
               ↑           ↑\r
               [성채 입구]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: 가시의 마녀 엘리자**\r
\r
- **특징**: 마법탄 난사 + 덩굴 소환. 덩굴은 시간이 흐를수록 맵의 80%를 덮어감 (Time Attack 요소).\r
- **패링**: 보스의 특정 마법탄을 칼로 튕기면 보스에게 경직 발생.\r
\r
**2. 침묵의 종 (POI #4)**\r
\r
- **기믹**: 아레나 중앙의 거대 종을 타격하면 강력한 음파가 발생하여 화면의 모든 덩굴을 3초간 제거.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **숏컷 수** | 2개 (마을-지하, 성채-마을) |\r
| **POI 수** | 4개 (예배당, 가시 다리, 오두막, 침묵의 종) |\r
| **적 유형** | 망령, 해골 활잡이, 덩굴 괴물, 보스 |\r
| **난이도 곡선** | Hard → Extreme → Painful |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S13 상세 설계 완료\r
2. 🔄 S14_Revenge_of_the_Fallen 맵 설계 진행 예정 (복수극 핵앤슬래시)\r
`,fS=`# S14: Revenge of the Fallen - Top-down Map 상세 설계\r
\r
> **"왕관의 무게보다 내 대검이 더 무겁다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S14: Revenge of the Fallen (타락한 자의 복수)  \r
**장르**: 핵 앤 슬래시 액션 RPG  \r
**주인공**: Cassius (광전사 모드)  \r
**환경**: Umbra Wastes - 오염된 왕성 'Capital of Regret'  \r
**맵 스타일**: 대규모 적 섬멸과 파괴 중심의 성채 침투 (하수구 → 정원 → 알현실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Bile Tunnels (오물 지하도)\r
\r
**테마**: 잠입과 분노의 시작, 좁은 공간 난투  \r
**페이싱**: Low to Rising (분노 축적)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[하수구 파이프 입구]\r
     ↓\r
[중앙 밸브 룸] (수위 조절 퍼즐)\r
     ↓\r
[쓰레기 배출구] (오물 괴물 습격)\r
     ↓\r
[왕궁 지하 주방] → Zone 2 진입\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 분노 게이지 시스템**\r
\r
- 하수구의 더러운 환경과 적들의 조롱을 견디며 적을 처치할 때마다 분노 게이지 상승.\r
- **분노 모드**: 게이지 완충 시 대검이 붉게 타오르며 광역 베기 속도 2배.\r
\r
---\r
\r
### Zone 2: The Garden of Blood (피의 정원)\r
\r
**테마**: 아레나 웨이브, 시각적 카타르시스  \r
**페이싱**: Medium Tension (난전)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[정원 입구]\r
     ↓\r
[피에 젖은 동상들] ← POI #3: 환경 폭발물 (중앙)\r
    ↙    ↓    ↘\r
[수풀 미로] [흰색 나무] [왕실 무기고]\r
 (기습)     (POI #2)    (미니보스)\r
     ↓\r
[거울의 복도] ← POI #1: 심리적 연출\r
     ↓\r
[알현실 정문] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 환경 파괴: 피에 젖은 동상**\r
\r
- **기믹**: 주변의 적들이 특정 반경 내에 있을 때 동상을 파괴하면 **피 폭발**이 일어나 주변 모든 적 즉사 및 슬로우 효과 부여.\r
\r
**2. 처형 액션**\r
\r
- 그로기 상태의 적에게 다가가 처형 시 성대한 '선혈 낭자' 연출과 함께 대량의 HP 회복.\r
\r
---\r
\r
### Zone 3: The Shattered Throne (무너지는 왕좌)\r
\r
**테마**: 파괴의 극치, 다층적 보스전  \r
**페이싱**: High Tension (Pure Action)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Falling Throne Room    │\r
└─────────────────────────────────────────────┘\r
\r
               [ 부양하는 왕좌 ] \r
               (보스: 타락한 왕)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │     [2층 발코니]    │ ← 이동 구간\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [무너진 기둥]   [무너진 기둥]\r
           (발판 이동)      (발판 이동)\r
               ↑           ↑\r
               [알현실 입구]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: 타락한 왕 (The Mad King)**\r
\r
- **페이즈 1**: 대검 vs 장검의 정면 대결. 주변 기둥들이 실시간으로 부서짐.\r
- **페이즈 2**: 발바닥 아래 바닥이 무너져 내리며 공중에 뜬 파편(발판) 위에서 점프하며 전투.\r
- **피날레**: 왕을 왕좌로 차버린 후 왕좌째로 1층으로 떨어뜨리는 마무리 일격.\r
\r
**2. 시각적 대비**\r
\r
- 보스전이 끝날 때쯤 왕궁은 완전히 불타 무너져 내리고, 창밖으로 검은 비가 내리는 연출.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **적 처치 수** | 100기 이상 (고밀도) |\r
| **POI 수** | 4개 (거울 복도, 무기고, 피의 동상, 왕좌) |\r
| **주요 연출** | 환경 파괴, 처형 클로즈업, 실시간 맵 붕괴 |\r
| **난이도 곡선** | Easy → Steady → Chaos |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S14 상세 설계 완료\r
2. 🔄 S15_Blood_Moon_Ritual 맵 설계 진행 예정 (네크로맨서 디펜스)\r
`,pS=`# S15: Blood Moon Ritual - Top-down Map 상세 설계\r
\r
> **"피는 생명이자 권능이니, 달이 찰 때 바치라."**\r
\r
## 설계 개요\r
\r
**시나리오**: S15: Blood Moon Ritual (블러드 문 의식)  \r
**장르**: 디펜스 액션 RPG  \r
**주인공**: Morgana (네크로맨서)  \r
**환경**: Umbra Wastes - 고대 공동묘지 'Grave of Saints'  \r
**맵 스타일**: 자원 수집 후 거점 방어 (공동묘지 → 카타콤 → 피의 제단)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Reaper's Harvest (수확의 들판)\r
\r
**테마**: 시체 수집, 병력 구축  \r
**페이싱**: Low Tension (파밍 중심)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[묘지 입구]\r
     ↓\r
[고대 묘지 구역] ← POI #1: 자원 보급 (시체)\r
    ↙    ↓    ↘\r
[성자 마을] [전사 묘역] [천사상]\r
 (정보)      (정예병)    (방어선)\r
     ↓\r
[지하 묘지 입구] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 시체 부활 시스템**\r
\r
- 맵 곳곳의 무덤을 파헤쳐 해골 병사(Tank), 좀비(Horde), 스켈레톤 메이지(Range) 확보.\r
- **오우거 유해**: 구석에 숨겨진 보스급 시체. 부활 시 강력한 화력 보장.\r
\r
**2. 환경 요소**\r
\r
- 까마귀 떼가 노란색으로 빛나는 무덤(레어 시체) 위를 선회하며 위치 힌트 제공.\r
\r
---\r
\r
### Zone 2: The Echoing Catacombs (메아리 카타콤)\r
\r
**테마**: 이동형 디펜스, 매복 기습  \r
**페이싱**: Medium Tension (호위 미션)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[지하 묘지 입구]\r
     ↓\r
[좁은 복도] (성기사 매복)\r
     ↓\r
[속삭이는 카타콤] ← POI #3: 전략적 요충지 (고지대)\r
     ↓\r
[제어 룸] (뼈 감옥 퍼즐)\r
     ↓\r
[지상 연결로] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 깔때기 구조 (Funneling)**\r
\r
- 좁은 길에서 몰려오는 성기사단을 **뼈 감옥**으로 가두고 언데드 부대로 일점사.\r
\r
**2. 조명 대비**\r
\r
- 적 성기사단이 접근할 때 앞쪽에서 강렬한 '성광'이 쏟아짐. 플레이어의 화면이 화이트아웃되지 않게 기둥 뒤로 소환수들을 전진 배치해야 함.\r
\r
---\r
\r
### Zone 3: The Sanguine Altar (피의 제단)\r
\r
**테마**: 최종 디펜스, 붉은 달의 강림  \r
**페이싱**: High Tension (Wave Defense)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Blood Moon Altar       │\r
└─────────────────────────────────────────────┘\r
\r
               [ 피의 제단 ] \r
               (POI #4: 최종 거점)\r
                    🏮\r
          ┌─────────┴─────────┐\r
          │     [사방 통로]    │ ← 360도 공격 지점\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [뼈의 첨탑 A]   [뼈의 첨탑 B]\r
           (POI #2)      (POI #2)\r
               ↑           ↑\r
               [묘지 언덕]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 최종 디펜스 (100% Ritual)**\r
\r
- 제단 중앙에서 의식을 집행하는 Morgana 보호.\r
- **웨이브**: 25% 단위로 적의 구성 변화. 75% 시점에서 보스 '성기사 단장' 난입.\r
- **피날레 (100%)**: 붉은 달이 폭발하며 거대 악마(아바타) 소환 가능. 30초간 모든 적을 무쌍으로 처리.\r
\r
**2. 뼈의 첨탑 (POI #2)**\r
\r
- **기능**: 소환수들의 생존력을 높여주는 '피의 오라' 발산 타워. 성기사단의 1순위 파괴 대상.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 32분 |\r
| **소환수 최대 수** | 20마리 이상 |\r
| **POI 수** | 4개 (고대 묘지, 뼈 첨탑, 카타콤, 피의 제단) |\r
| **적 규모** | 성기사단 웨이브 (수십 명) |\r
| **난이도 곡선** | Easy → Medium → Intense |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S15 상세 설계 완료\r
2. ✅ Batch 3-1 (S11-S15) 완료\r
3. 🔄 Batch 3-2 (S16-S20) 시나리오 분석 예정\r
`,mS=`# S16: The Necromancer Queen - Top-down Map 상세 설계\r
\r
> **"왕관을 쓰려는 자, 군대를 일으켜라. 산 자든 죽은 자든."**\r
\r
## 설계 개요\r
\r
**시나리오**: S16: The Necromancer Queen (네크로맨서 여왕)  \r
**장르**: 전략 액션 RPG (부대 지휘 + 공성)  \r
**주인공**: Morgana (여왕 모드)  \r
**환경**: Umbra Wastes - 인간 왕국 요새 'Fortress of Dawn'  \r
**맵 스타일**: 대규모 군단 지휘와 거점 점령 (마을 → 성문 → 왕좌)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Plague Outskirts (역병의 외곽)\r
\r
**테마**: 병력 증식, 초기 점령  \r
**페이싱**: Rolling Snowball (규모 확장)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[마을 입구]\r
     ↓\r
[불타는 풍차] (경비병 조우)\r
     ↓\r
[중앙 농가] ← POI: 병력 충원 (시체 부활)\r
    ↙    ↓    ↘\r
[서쪽 축사] [메인 도로] [동쪽 창고]\r
 (기병 확보) (정면 돌파) (궁병 확보)\r
     ↓\r
[성채 진입 가도] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 부대 스노우볼링**\r
\r
- 처치한 인간 병사들을 즉시 '스켈레톤 보병'으로 부활시켜 군단 크기 키우기.\r
- **상성 활용**: 적의 궁병 부대에는 부활시킨 '언데드 기병'을 돌격시켜 무력화.\r
\r
**2. 전령 저지**\r
\r
- 성으로 지원군을 요청하러 달리는 말을 탄 전령을 제한 시간 내에 암살/제압 필수.\r
\r
---\r
\r
### Zone 2: The Iron Gate Siege (강철 성문 공성전)\r
\r
**테마**: 대규모 파괴, 공성 병기 운용  \r
**페이싱**: High Tension (거대 스케일)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[공성 캠프] (POI #1: 공성 작업실)\r
     ↓\r
[성벽 앞 광장] (화울비, 기름 투하)\r
    ↙    ↓    ↘\r
[시체 공성탑] [중앙 성문] [우회 등반로]\r
 (POI #2)      (괴수 투입)   (잠입 유닛)\r
     ↓\r
[성내부 하층 마당] → Zone 3 (왕좌 연결)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 시체 공성탑 (POI #2)**\r
\r
- **기믹**: 거대한 뼈 기둥을 성벽에 밀착시켜 언데드 병력을 성벽 위로 수직 투입. 탑이 파괴되지 않게 Morgana의 방어막으로 보호.\r
\r
**2. 거대 괴수 투입**\r
\r
- 'Abomination' 2기를 소환하여 성문을 직접 타격. 성벽 위의 투석기를 마법으로 먼저 제거해야 괴수들이 생존 가능.\r
\r
---\r
\r
### Zone 3: The Defiled Throne (더럽혀진 왕좌)\r
\r
**테마**: 최종 대결, 여왕의 대관식  \r
**페이싱**: High Tension (Final Conflict)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Royal Hall             │\r
└─────────────────────────────────────────────┘\r
\r
               [ 왕좌의 제단 ] \r
               (보스: 인간 왕)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │     [붉은 카펫 홀]   │ ← POI #4: 쓰러진 깃발\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [오염된 성소]   [오염된 성소]\r
           (POI #3)      (POI #3)\r
               ↑           ↑\r
               [알현실 정문]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: 인간 왕**\r
\r
- **특징**: 성기사 호위병들과 함께 강력한 신성 마법 사용.\r
- **공략**: 왕좌 주변의 **오염된 성소** 2개를 유지하여 보스의 신성 방어막을 중화시켜야 함.\r
\r
**2. 피날레**\r
\r
- 왕을 처치한 후 왕좌에 앉으면 맵의 모든 기사가 언데드로 변하며 Morgana에게 무릎을 꿇는 대규모 연출 발생.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **최대 부대 규모** | 50기 이상 (분대 단위 지휘) |\r
| **POI 수** | 4개 (공성 작업실, 시체 공성탑, 더럽혀진 성소, 쓰러진 깃발) |\r
| **유닛 종류** | 보병, 궁병, 기병, 괴수, 투석기 |\r
| **난이도 곡선** | Easy → Hard(공성) → Steady(알현실) |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S16 상세 설계 완료\r
2. 🔄 S17_Shadow_Blade 맵 설계 진행 예정 (잠입 액션)\r
`,gS=`# S17: Shadow Blade - Top-down Map 상세 설계\r
\r
> **"빛이 닿지 않는 곳에 죽음이 있다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S17: Shadow Blade (그림자 칼날)  \r
**장르**: 잠입 액션 (Stealth Action)  \r
**주인공**: Thorne (암살자)  \r
**환경**: Umbra Wastes - 절벽 위에 세워진 'Shadow Guild Fortress'  \r
**맵 스타일**: 비선형적 침투 루트와 그림자 활용 (절벽 → 병영 → 마스터의 방)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Veiled Cliffs (장막의 절벽)\r
\r
**테마**: 침투 경로 탐색, 고저차 활용  \r
**페이싱**: Low Tension (정찰)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[절벽 하단 시작점]\r
     ↓\r
[감시탑] ← POI #1: 마법 서치라이트 (무력화 대상)\r
    ↙    ↓    ↘\r
[하수구로] [중앙 성문] [외벽 등반]\r
 (더러움)   (정면돌파)   (위험)\r
     ↓\r
[요새 내부 안뜰] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 서치라이트 회피**\r
\r
- 황금빛 라이트에 닿으면 즉시 발각. 라이트의 이동 주기를 파악해 그림자 도약(Shadow Blink)으로 통과.\r
\r
**2. 루트 다양성**\r
\r
- **외벽 등반**: 파쿠르 실력이 필요하지만 적이 거의 없음.\r
- **하수구**: 독가스 함정이 있지만 경비가 가장 허술함.\r
\r
---\r
\r
### Zone 2: The Echoing Barracks (그림자 병영)\r
\r
**테마**: 빛과 어둠의 대비, 소음 제어  \r
**페이싱**: Rising Action (잠입 퍼즐)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[병영 입구]\r
     ↓\r
[훈련장 광장] (훈련용 허수아비 배치)\r
    ↙    ↓    ↘\r
[식당/부엌] [그림자 복도] [비밀 기록실]\r
 (유인)      (POI #3)      (POI #2)\r
     ↓\r
[마스터의 방 앞 대기실] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 조명 상호작용**\r
\r
- **물 화살**: 멀리 있는 횃불을 꺼서 인공적인 그림자 생성.\r
- **소음 유도**: 동전이나 술병을 던져 경비병을 그림자 안으로 유인 후 처치(시체 숨기기 필수).\r
\r
**2. 바닥 재질**\r
\r
- 카펫 위는 무음, 나무판자는 삐걱거리는 소리 발생. 적의 등 뒤로 접근 시 바닥 재질 확인 필요.\r
\r
---\r
\r
### Zone 3: The Master's Sanctum (마스터의 성소)\r
\r
**테마**: 샌드박스 암살, 긴박한 탈출  \r
**페이싱**: High Tension (암살 및 도주)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Guild Master's Room    │\r
└─────────────────────────────────────────────┘\r
\r
               [ 발코니 ] ═══ 🚠 짚라인 (탈출로)\r
                    ↕\r
               [ 집무실 책상 ] \r
               (보스: 길드 마스터)\r
                    👹\r
          ┌─────────┴─────────┐\r
          │     [거대 샹들리에] │ ← POI: 환경 암살\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [비술 보관고]   [함정 보관고]\r
           (증거 확보)      (POI #4)\r
               ↑           ↑\r
               [비밀 문]\r
                    ▓\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 샌드박스 암살**\r
\r
- **사고사**: 샹들리에의 밧줄을 끊어 마스터 압사.\r
- **독살**: 부엌에서 훔친 독약을 마스터의 술잔에 주입.\r
- **정면 대결**: 그림자 연막탄 사용 후 보스전 돌입.\r
\r
**2. 탈출 시퀀스**\r
\r
- 암살 직후 요새 전체에 붉은 조명과 함께 경보 발생.\r
- 복귀 경로가 차단됨에 따라 발코니의 짚라인을 타고 요새 밖 절벽 밑 강물로 다이빙 탈출.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 33분 |\r
| **침투 루트 수** | 3개 (하수구, 정문, 외벽) |\r
| **POI 수** | 4개 (감시탑, 비밀 기록실, 그림자 복도, 함정 보관고) |\r
| **암살 방식** | 사고사, 독살, 정면 돌파 (플레이어 선택) |\r
| **난이도 곡선** | Easy → Planning → High(탈출) |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S17 상세 설계 완료\r
2. 🔄 S18_Outcasts_Redemption 맵 설계 진행 예정 (호위 및 탈출)\r
3. 🔄 Batch 3-2 나머지 설계 진행\r
`,yS=`# S18: Outcast's Redemption - Top-down Map 상세 설계\r
\r
> **"죄는 피로 씻을 수 없지만, 생명으로 갚을 수는 있다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S18: Outcast's Redemption (추방자의 구원)  \r
**장르**: 호위 / 탈출 액션  \r
**주인공**: Thorne (보호자 모드)  \r
**환경**: Umbra Wastes - 길드 지하 감옥 및 미로 같은 수로  \r
**맵 스타일**: 비대칭적 정보와 협력 퍼즐이 강조된 호위전 (감옥 → 지하 수로 → 수문)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Iron Cages (강철 감옥)\r
\r
**테마**: 은밀한 구출, 협력의 시작  \r
**페이싱**: Low to Medium (긴장감 있는 잠입)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[입구: 하수구 틈]\r
     ↓\r
[중앙 고문실] (감시 수정 POI #1)\r
    ↙    ↓    ↘\r
[좌측 감방] [간수 초소] [우측 감방]\r
 (동료 구출)  (열쇠 확보)  (아이 구출)\r
     ↓\r
[지하 수로 연결로] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 협력 퍼즐: 작은 아이**\r
\r
- Thorne이 들어갈 수 없는 좁은 틈새로 아이를 밀어 넣어 반대편 도개교 레버를 당기게 함.\r
\r
**2. 감시 수정 (POI #1)**\r
\r
- **기믹**: 360도로 회전하는 마법 안구. 수정의 시야가 닿지 않는 그림자 속에 아이들을 대기시켜가며 "이동/멈춰" 명령으로 이동.\r
\r
---\r
\r
### Zone 2: The Flooded Labyrinth (침수된 미로)\r
\r
**테마**: 추격의 압박, 수위 조절  \r
**페이싱**: High Tension (긴박한 도주)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[침수된 도서관] (POI #2)\r
     ↓\r
[미로형 수로 A] (사냥개 추격 시작)\r
    ↙    ↓    ↘\r
[막힌 문] [숨겨진 정수조] [메인 루트]\r
 (우회)   (POI #3: 정비)  (함정 설치)\r
     ↓\r
[수로 터널 끝] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 추격자(Pursuer) 시스템**\r
\r
- 일정 거리 뒤에서 '길드 사냥개'들이 계속 접근. 바닥에 **마름쇠(Caltrops)**를 뿌려 적의 이동 속도를 늦춰야 함.\r
\r
**2. 수위 퍼즐**\r
\r
- 주기적으로 물이 차오르는 구간. 아이들을 어깨에 메고 수영하여 안전지대에 내려놓는 피지컬 액션 필요.\r
\r
---\r
\r
### Zone 3: The Great Water Gate (거대 수문)\r
\r
**테마**: 최후의 방어, 빛을 향한 탈출  \r
**페이싱**: Climax (Defense)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Water Gate Exit        │\r
└─────────────────────────────────────────────┘\r
\r
               [ 눈부신 지상광 ] \r
                    ↑\r
               [ 거대 수문 ] ═══ (아이들이 장치 조작)\r
                    ▓\r
          ┌─────────┴─────────┐\r
          │     [중앙 다리]     │ ← Thorne의 방어 지점\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [수로 하부]     [수로 하부]\r
          (적 난입)      (적 난입)\r
               ↑           ↑\r
               [터널 입구]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 최종 디펜스 (3분)**\r
\r
- 아이들이 수문 휠을 돌리는 동안 Thorne은 좁은 다리 위에서 몰려오는 적들을 막아야 함.\r
- **환경 처치**: 적들을 발로 차서 거센 물살이 흐르는 수로 아래로 떨어뜨리는 방식이 효과적.\r
\r
**2. 피날레**\r
\r
- 수문이 완전히 열리는 순간 쏟아지는 물과 함께 지상의 빛이 쏟아지며 탈출 성공.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 33분 |\r
| **호위 대상 수** | 2명 (아이) |\r
| **POI 수** | 4개 (감시 수정, 침수된 도서관, 숨겨진 정수조, 거대 수문) |\r
| **주요 기믹** | 아이 명령 체계, 수위 조작, 함정 설치(마름쇠) |\r
| **난이도 곡선** | Medium → High → Climax |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S18 상세 설계 완료\r
2. 🔄 S19_Operation_Safehaven 맵 설계 진행 예정 (전술 호송 슈터)\r
3. 🔄 Batch 3-2 나머지 작업 진행\r
`,vS=`# S19: Operation Safehaven - Top-down Map 상세 설계\r
\r
> **"우리는 화물이 아니라 희망을 운반한다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S19: Operation Safehaven (세이프헤이븐 작전)  \r
**장르**: 전술 호송 슈터 (Tactical Escort Shooter)  \r
**주인공**: Eva Harlow (용병 대장)  \r
**환경**: Ashen World - 폐허가 된 도심 'Ruins of Sector 7'  \r
**맵 스타일**: 선형적 경로를 따라 전진하는 전술적 호송 (쇼핑몰 → 고속도로 → 벙커)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Broken Mall (무너진 쇼핑몰)\r
\r
**테마**: 조우와 구출, 초기 엄호  \r
**페이싱**: Low Tension (탐색 및 전투 기초)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[쇼핑몰 외곽]\r
     ↓\r
[아트리움] ← POI #1: 생존자 발견 및 첫 교전\r
    ↙    ↓    ↘\r
[1층 매장] [끊긴 에스컬레이터] [2층 발코니]\r
 (엄폐)       (로프 이동)       (저격 지점)\r
     ↓\r
[후문 주차장] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 분대 명령 시연**\r
\r
- 생존자들에게 "저 벽 뒤로 이동해(Move)", "거기서 대기해(Hold)" 명령으로 적의 사선을 피하게 함.\r
\r
**2. 수직적 전투**\r
\r
- 에스컬레이터가 끊겨 있어 로프를 타고 2층에서 1층으로 내려오며 지상의 약찰자들을 소탕.\r
\r
---\r
\r
### Zone 2: The Death Highway (죽음의 고속도로)\r
\r
**테마**: 오픈 필드 호송, 측면 매복 방어  \r
**페이싱**: Rising Action (긴박한 돌파)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[고속도로 진입로]\r
     ↓\r
[전복된 버스 장벽] (매복 지점 POI #2)\r
    ↙    ↓    ↘\r
[도로 아래로] [중앙 차선] [녹슨 주유소] (POI #3)\r
 (우회 루트)   (메인 전진)   (보급 및 보스)\r
     ↓\r
[지하철 입구 "Metro Entrance"] (POI #4) → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 연막탄 활용**\r
\r
- 도로 위 고지대(전복된 트럭)에 배치된 저격수들의 시야를 가리기 위해 연막탄을 던지고 생존자들을 이동시킴.\r
\r
**2. 이동식 엄폐물**\r
\r
- 버려진 SUV를 밀어서 생존자들의 방패막으로 활용하며 전진.\r
\r
---\r
\r
### Zone 3: The Bunker Gate (벙커 정문)\r
\r
**테마**: 거점 사수, 최후의 저항  \r
**페이싱**: High Tension (Defense)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Vault Entrance         │\r
└─────────────────────────────────────────────┘\r
\r
               [ 벙커 내부 ] \r
                    ↑\r
               [ 거대 강철문 ] ═══ (열리는 중... 0-100%)\r
                    ▓\r
          ┌─────────┴─────────┐\r
          │     [광장 광장]     │ ← Eva의 방어선\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [배수구 통로]   [폐차 더미]\r
          (적 매복)      (포탑 설치)\r
               ↑           ↑\r
               [메트로 출구]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 최종 디펜스: War Rig (약탈자 보스)**\r
\r
- **기믹**: 거대한 무장 트럭(War Rig)이 광장으로 돌진. 트럭의 타이어를 쏘아 멈추게 한 뒤, 위에 탄 사수들 제압.\r
- **분대 협동**: 팀원 1명은 부상당한 생존자 치료, 1명은 포탑 수리, Eva는 탄막 형성.\r
\r
**2. 피날레**\r
\r
- 문이 열리자마자 생존자들을 안으로 밀어 넣은 뒤, Eva가 마지막 엄호를 하고 문 안으로 슬라이딩 진입하며 폐쇄.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 33분 |\r
| **호송 인원** | 5명 (가족 3, 노인 2) |\r
| **POI 수** | 4개 (아트리움, 매복 지점, 녹슨 주유소, 메트로 입구) |\r
| **전술 도구** | 연막탄, 휴대용 포탑, 지뢰, 로프 |\r
| **난이도 곡선** | Easy → Tactical → Extreme |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S19 상세 설계 완료\r
2. 🔄 S20_The_Last_Stand 맵 설계 진행 예정 (호드 모드 디펜스)\r
3. 🔄 Batch 3-2 전체 완료 및 보고\r
`,xS=`# S20: The Last Stand - Top-down Map 상세 설계\r
\r
> **"이 선을 넘는 놈들은 다 죽는다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S20: The Last Stand (최후의 저항)  \r
**장르**: 웨이브 디펜스 슈터 (Horde Mode)  \r
**주인공**: Eva Harlow (방어 사령관)  \r
**환경**: Ashen World - 요새화된 학교 건물 'Fort Hope'  \r
**맵 스타일**: 3단계 방어선으로 구성된 거점 사수 아레나 (지뢰밭 → 운동장 → 본관 로비)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: No Man's Land (지뢰밭 외곽)\r
\r
**테마**: 원거리 저지, 부비트랩  \r
**페이싱**: Low Tension (초기 탐색/준비)  \r
**플레이 타임**: 약 10분 (준비 시간 포함)\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[학교 정문 바리케이드]\r
     ↓\r
[운동장 앞마당] (포탑 배치 지점)\r
     ↓\r
[지뢰밭 구역] ← POI: 1차 저지선 (지나가는 적 폭발)\r
    ↙    ↓    ↘\r
[북쪽 가도] [메인 도로] [남쪽 골목]\r
 (적 스폰 지점 A, B, C)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 전략적 준비 (Prep Phase)**\r
\r
- 매 웨이브 전 2분간의 시간 부여. 지뢰 재설치 및 포탑 탄약 보급.\r
- **Scrap 리소스**: 적을 처치하고 얻은 고철로 방어 시설 강화.\r
\r
---\r
\r
### Zone 2: The Killing Field (학교 운동장)\r
\r
**테마**: 중화기 화력전, 전선 유지  \r
**페이싱**: Rising Action (대규모 물량전)  \r
**플레이 타임**: 약 15분 (웨이브 1~4)\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[센티넬 타워] ← POI #2: Eva의 주 위치 (옥상)\r
     ↓\r
[운동장 중앙] (샌드백 엄폐물 POI)\r
    ↙    ↓    ↘\r
[스쿨버스 바리케이드] [정문 (건물)] [창고]\r
 (적 차량 저지)     (POI #1)     (탄약고)\r
     ↓\r
[본관 로비 입구] → Zone 3 (최후 방어선)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 중기관총 사격 (Mounted Gun)**\r
\r
- 고정된 기관총 시점으로 전환하여 몰려오는 약탈자 차량들의 엔진을 쏘아 폭발시킴.\r
\r
**2. 전선 후회 (Fall back)**\r
\r
- 3번째 웨이브에서 정문 바리케이드가 돌파당하면 신호탄을 쏘아 아군을 본관 건물 내부로 철수시켜야 함.\r
\r
---\r
\r
### Zone 3: The Last Redoubt (본관 로비)\r
\r
**테마**: 처절한 혼전, 야간 전투  \r
**페이싱**: High Tension (Climax)  \r
**플레이 타임**: 약 10분 (마지막 웨이브)\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The School Lobby           │\r
└─────────────────────────────────────────────┘\r
\r
               [ 의료 천막 ] \r
               (POI #3: 회복)\r
                    ↑\r
               [ 로비 중앙홀 ] ← Eva의 최후 사수 지점\r
                    ▓\r
          ┌─────────┴─────────┐\r
          │     [본관 현관]     │ ← 적 난입 지점\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [비상계단 A]   [무기고 입구]\r
          (적 매복)      (POI #4)\r
               ↑           ↑\r
               [운동장에서 진입]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 최종 보스: War Juggernaut (돌연변이 괴수)**\r
\r
- **특징**: 총알이 거의 통하지 않는 중장갑 괴수. 로비 천장의 대형 샹들리에를 쏘아 떨어뜨려 짓누르거나, 무기고에서 가져온 RPG로 약점 공략.\r
\r
**2. 조명탄 시스템**\r
\r
- 마지막 웨이브는 밤에 진행됨. 연막과 어둠 속에서 적을 찾기 위해 주기적으로 조명탄 사격 필요.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 (5개 웨이브) |\r
| **적 규모** | 약탈자(100+), 돌연변이(20), 차량(5) |\r
| **POI 수** | 4개 (정문, 센티넬 타워, 의료 천막, 무기고) |\r
| **핵심 자원** | Scrap (건설/수리), Ammo (사격) |\r
| **난이도 곡선** | Steady → Rising → Heartbeat(Climax) |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S20 상세 설계 완료\r
2. ✅ Batch 3 (S11-S20) 전체 완료\r
3. 🔄 Batch 4 (S21-S30) 작업 준비 예정\r
4. 🔄 task.md 업데이트 및 배치 결과 보고\r
`,wS=`# S21: The Green Zone - Top-down Map 상세 설계\r
\r
> **"지도에 없는 곳, 그곳에 희망이 있다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S21: The Green Zone (그린 존)  \r
**장르**: 오픈월드 탐험 / 생존  \r
**주인공**: Nikolai Rad (탐사대원)  \r
**환경**: Ashen World - 방사능 늪지와 안개 협곡  \r
**맵 스타일**: 환경적 위협과 시각적 Reveal이 강조된 탐사 루트 (늪지 → 협곡 → 비밀의 화원)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Radioactive Swamp (방사능 늪지대)\r
\r
**테마**: 독성 환경, 자원 보존  \r
**페이싱**: Low to Medium (긴장감 있는 횡단)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[시작점: 탐사 캠프]\r
     ↓\r
[오염된 늪지 입구]\r
    ↙    ↓    ↘\r
[침몰한 여객기] [우물 마을] [진흙길]\r
 (POI #1)      (POI #3)    (우회)\r
     ↓\r
[협곡 입구 검문소] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 가이거 계수기 기믹**\r
\r
- **소리 유도**: '지지직' 소리가 커지는 곳은 고방사능 구역. 방독면 필터 소모가 2배 빠름.\r
- **안전지대**: 버려진 트럭 지붕이나 큰 바위 위에서는 방사능 수치가 낮아짐.\r
\r
**2. 침몰한 여객기 (POI #1)**\r
\r
- 비행기 날개를 타고 내부로 진입. 좁은 기내에서 '고급 방독면 필터' 3개 확보 가능.\r
\r
---\r
\r
### Zone 2: The Misty Canyon (안개 협곡)\r
\r
**테마**: 등반 액션, 시야 제한  \r
**페이싱**: Medium Tension (탐험)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[협곡 하부] \r
     ↓\r
[가파른 암벽] (피켈 등반 구간)\r
    ↙    ↓    ↘\r
[통신탑] [동굴 괴물 서식지] [벽화 전당]\r
 (POI #2) (은신 구간)       (스토리)\r
     ↓\r
[협곡 정상 동굴] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 수직 등반 (Verticality)**\r
\r
- 특정 구간에서 카메라가 사이드뷰로 전환되며 피켈을 이용한 리드미컬한 암벽 등반 진행.\r
\r
**2. 통신탑 (POI #2)**\r
\r
- 탑 꼭대기에서 안테나 방향을 조정하는 퍼즐 수행. 성공 시 안개 속에 가려져 있던 '그린 존'의 대략적인 위치가 지도로 전송됨.\r
\r
---\r
\r
### Zone 3: The Secret Garden (비밀의 화원)\r
\r
**테마**: 낙원 발견, 해방감  \r
**페이싱**: Release (Great Reward)  \r
**플레이 타임**: 약 5분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Green Haven            │\r
└─────────────────────────────────────────────┘\r
\r
               [ 정착지 비콘 ] \r
               (최종 목표 지점)\r
                    ☀\r
          ┌─────────┴─────────┐\r
          │     [호수와 숲]     │ ← 오염도 0% 구역\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [숨겨진 폭포]   [숨겨진 폭포]\r
           (POI #4)      (POI #4)\r
               ↑           ↑\r
               [동굴 출구]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 시각적 Reveal 연출**\r
\r
- 어두운 동굴 끝에서 빛이 쏟아지는 출구로 나가는 순간, 카메라가 광각(Wide)으로 넓어지며 푸른 숲과 맑은 하늘을 비춤.\r
- **청각**: 가이거 계수기의 소음이 멈추고 새소리와 서정적인 피아노 BGM 시작.\r
\r
**2. 평화로운 마무리**\r
\r
- 맑은 샘물을 마셔 모든 상태 이상을 제거하고, "여기가 우리가 살 곳이다"라는 메시지와 함께 지도를 완성하며 종료.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **필터 교체 횟수** | 평균 4~6회 |\r
| **POI 수** | 4개 (가라앉은 비행기, 통신탑, 오염된 우물, 숨겨진 폭포) |\r
| **등반 높이** | 약 50m (인게임 스케일) |\r
| **난이도 곡선** | Tension → Discovery → Pure Bliss |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S21 상세 설계 완료\r
2. 🔄 S22_Scavenger_King 맵 설계 진행 예정 (차량 액션)\r
`,SS=`# S22: Scavenger King - Top-down Map 상세 설계\r
\r
> **"속도가 곧 생존이고, 연료가 곧 혈액이다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S22: Scavenger King (스캐빈저 킹)  \r
**장르**: 차량 액션 / 레이싱  \r
**주인공**: Nikolai Rad (드라이버)  \r
**환경**: Ashen World - 말라버린 바다와 폐공장 지대 'The Rust Sea'  \r
**맵 스타일**: 고속 주행과 시네마틱 스턴트가 강조된 서킷 및 추격로 (폐차장 → 고가도로 → 연구소)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Scrap Junkyard (고철 폐차장)\r
\r
**테마**: 차량 커스텀, 탐색  \r
**페이싱**: Low Tension (정비 시간)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[차고(Hub)] ═══ [튜닝 샵]\r
     ↕           ↕\r
[고철 산] ═══ [연료 창고] ← POI #1: 자원 파밍\r
    ↙    ↓    ↘\r
[초보 트랙] [본선 입구] [비밀 암시장] (POI #2)\r
     ↓\r
[공단 외곽 게이트] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 차량 빌딩 (V8 Buggy)**\r
\r
- 고철 산에서 발견한 엔진과 스파이크 타이어를 장착하여 첫 전투 차량 완성.\r
- **튜닝**: 장갑(속도 감소/방어력 증가) vs 엔진(속도 증가/내구도 감소) 밸런스 선택.\r
\r
---\r
\r
### Zone 2: The Rust Highway (녹슨 고가도로)\r
\r
**테마**: 고속 배틀, 드리프트, 라이벌 추격  \r
**페이싱**: High Tension (Racing)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[고가도로 시작점] \r
     ↓\r
[컨테이너 다리] (좁은 폭, 낙사 위험)\r
    ↙    ↓    ↘\r
[공사 중 구역] [직선 주로] [지하 터널] (POI #2)\r
 (점프대 기믹)  (라이벌 교전)  (우회)\r
     ↓\r
[고철 요새 광장] ← POI #3: 전투 허들\r
     ↓\r
[연구소 진입 램프] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 라이벌 갱단 배틀**\r
\r
- **기믹**: 차량 측면 충돌(Ramming)로 적을 도로 밖으로 밀어내거나, 작살총으로 타이어 무력화.\r
- **동적 도로**: 레이싱 중에 다리가 무너지며 실시간으로 경로가 바뀌는 QTE 발생.\r
\r
---\r
\r
### Zone 3: The Tech Lab Escape (연구소 탈출)\r
\r
**테마**: 최후의 도주, 거대 보스 추격  \r
**페이싱**: Very High Tension (Chase)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Lab Getaway            │\r
└─────────────────────────────────────────────┘\r
\r
               [ 끝없는 지평선 ] \r
                    ↑\r
               [ 죽음의 도약 ] ← POI #4: 최종 점프단\r
                    ▓\r
          ┌─────────┴─────────┐\r
          │     [고속 직선로]   │ ← 보스 트럭 추격\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [연구소 1층]   [연구소 1층]\r
          (기술 칩 획득)  (기술 칩 획득)\r
               ↑           ↑\r
               [연구소 정문]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: The Warlord's Rig**\r
\r
- **보스**: 거대한 기름 탱크가 달린 무장 트럭.\r
- **공략**: 보스가 뿌리는 기름 웅덩이를 피해 드리프트하고, 부스터 게이지를 모아 최종 점프를 준비.\r
\r
**2. 죽음의 도약 (POI #4)**\r
\r
- **피날레**: 끊어진 다리 끝에서 부스터 최대 출력 사용. 슬로우 모션 연출과 함께 건너편 옥상으로 착지하며 갱단 따돌리기 성공.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **최대 주행 속도** | 약 200km/h (인게임 체감) |\r
| **POI 수** | 4개 (고철 산, 암시장, 고철 요새, 죽음의 도약) |\r
| **차량 무기** | 작살총, 화염방사기, 오일 스프레이 |\r
| **난이도 곡선** | Easy → Steady → Intense(Chase) |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S22 상세 설계 완료\r
2. 🔄 S23_The_Cure 맵 설계 진행 예정 (과학자 어드벤처)\r
`,kS=`# S23: The Cure - Top-down Map 상세 설계\r
\r
> **"자연은 독이자 약이다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S23: The Cure (치료제)  \r
**장르**: 과학 어드벤처 / 크래프팅  \r
**주인공**: Dr. Singh (과학자)  \r
**환경**: Ashen World - 변이된 거대 식물원 'Eden Garden'  \r
**맵 스타일**: 환경 퍼즐과 자원 배합이 중심인 탐사 (온실 → 지하 배양실 → 합성실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Bio-Dome (바이오 돔 온실)\r
\r
**테마**: 변이 식물 채집, 생태 관찰  \r
**페이싱**: Low Tension (정적인 탐사)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[돔 정문]\r
     ↓\r
[수정 돔] ← POI #1: 모태 식물 (중앙)\r
    ↙    ↓    ↘\r
[파리지옥 군락] [덩굴 온실] [연구 캠프]\r
 (미끼 활용)     (POI #2)    (보급)\r
     ↓\r
[지하 통로 입구] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 스캐너 시스템 (Scanning)**\r
\r
- 식물의 상태를 스캔하여 '독성/약초/재료' 구분. 기록된 정보는 Act 3 치료제 배합의 공식이 됨.\r
\r
**2. 거대 파리지옥 (POI)**\r
\r
- **기믹**: 주변의 작은 돌연변이 쥐들을 유인해 식물에게 먹인 뒤, 식물이 소화하는 동안 안전하게 샘플 채취.\r
\r
---\r
\r
### Zone 2: The Toxic Sublevel (유독 지하층)\r
\r
**테마**: 가스 퍼즐, 제한 시간(산소)  \r
**페이싱**: Medium Tension (긴장감 있는 돌파)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[지하 승강기] \r
     ↓\r
[환기 허브] ← POI #4: 가스 정화 (메인 퍼즐)\r
    ↙    ↓    ↘\r
[배양 탱크] [보안 실험실] [침수된 통로]\r
 (샘플 확보)  (POI #3)     (플랫포밍)\r
     ↓\r
[연구 본동 입구] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 산소 관리 (Oxygen Management)**\r
\r
- **에어포켓**: 가스가 닿지 않는 환기구 밑에서 산소 충전.\r
- **배기 퍼즐**: 3개의 거대 팬 방향을 일치시켜 지하 가스를 외부로 배출해야 문이 열림.\r
\r
**2. 변이 실험체 (Stealth)**\r
\r
- 시각이 퇴화하고 청각만 남은 실패작들을 피해 유리 파편을 밟지 않고 걸어야 함.\r
\r
---\r
\r
### Zone 3: The Synthesis Lab (중앙 합성실)\r
\r
**테마**: 치료제 완성, 최종 방어  \r
**페이싱**: High Tension (Defense & Puzzle)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Grand Synthesis        │\r
└─────────────────────────────────────────────┘\r
\r
               [ 드론 발사대 ] \r
               (살포 드론 출동)\r
                    ☀\r
          ┌─────────┴─────────┐\r
          │     [합성 테이블]   │ ← POI: 제작 미니게임\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [자동 터렛]   [자동 터렛]\r
          (해킹 방어)    (해킹 방어)\r
               ↑           ↑\r
               [로비 입구]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 치료제 배합 미니게임**\r
\r
- 1, 2회차에서 얻은 데이터를 기반으로 화학 시약의 비율 조정 (붉은 가루 3: 초록 액체 2).\r
- **방어**: 배합이 진행되는 동안(2분) 실험실로 난입하는 괴물들을 보안 터렛을 활성화해 막아야 함.\r
\r
**2. 정화 피날레**\r
\r
- 치료제 완성 후 드론이 돔 전체에 백신을 살포. 징그러운 촉수들이 시들고 맑은 물이 흐르는 연출과 함께 종료.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **샘플 종류** | 뿌리, 잎, 꽃가루, 액즙 (총 4종) |\r
| **POI 수** | 4개 (수정 돔, 우거진 온실, 보안 실험실, 환기 허브) |\r
| **적 규모** | 식물형 덫, 눈먼 돌연변이 |\r
| **난이도 곡선** | Easy → Puzzling → Climax(Defense) |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S23 상세 설계 완료\r
2. 🔄 S24_Oath_of_Peace 맵 설계 진행 예정 (정치 협상 어드벤처)\r
`,_S=`# S24: Oath of Peace - Top-down Map 상세 설계\r
\r
> **"펜은 칼보다 강하다. 하지만 칼 든 놈 앞에서는 말을 조심해야 한다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S24: Oath of Peace (평화의 맹세)  \r
**장르**: 내러티브 어드벤처 (대화형 RPG)  \r
**주인공**: Dr. Singh (중재자)  \r
**환경**: Ashen World - 국경 지대 'The Divided Canyon'  \r
**맵 스타일**: 대칭적 대립 구도와 심리적 압박이 강조된 협상장 (진영 캠프 → 협곡 다리 → 회담장)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Two Camps (두 진영의 야영지)\r
\r
**테마**: 정보 수집, 갈등 파악  \r
**페이싱**: Low Tension (수사 중심)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[서측: 군벌 캠프] ═══════ [동측: 자력단 요새]\r
 (POI #2: 추모의 벽)         (발전기 랜드마크)\r
      ↓                         ↓\r
[검문소 A]                 [검문소 B]\r
      ↘           ↓           ↙\r
            [협곡 입구 광장]\r
                 ↓\r
            [탄식의 다리] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 비주얼 스토리텔링**\r
\r
- **군벌 구역**: 폐탱크, 녹슨 칼날, 텅 빈 식량 상자. (공격적이나 절박함)\r
- **자경단 구역**: 채소밭, 태양광 패널, 텅 빈 구급 상자. (방어적이나 생존 위기)\r
\r
**2. 잠입 요소**\r
\r
- 스파이의 거래소(POI #3)를 발견하기 위해 절벽 틈새로 몰래 이동하여 음모의 증거(밀매 문서) 확보.\r
\r
---\r
\r
### Zone 2: The Sniper's Canyon (저격수의 협곡)\r
\r
**테마**: 심리적 압박, 중립 지대 이동  \r
**페이싱**: Medium Tension (긴장감)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[협곡 북측 절벽] (POI #4: 저격 포인트)\r
     ↓\r
[탄식의 다리] ← POI #1: 흔들리는 현수교\r
    ↙    ↓    ↘\r
[다리 아래 동굴] [중앙 통로] [폭발물 매설지]\r
 (우회 잠입)     (회담 이동)  (무력화 필요)\r
     ↓\r
[컨테이너 회담장 정문] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 레이저 포인트 기믹**\r
\r
- 플레이어의 가슴팍에 **붉은 레이저 조준선**이 수시로 노출됨. 갑작스러운 움직임을 자제하고 대화로 적의 시선을 돌려야 함.\r
\r
**2. 폭발물 해체**\r
\r
- 회담장 밑에 매설된 폭탄을 제한 시간 내에 조용히 해체 (실패 시 배드 엔딩 직결).\r
\r
---\r
\r
### Zone 3: The Neutral Table (중립의 테이블)\r
\r
**테마**: 언어의 결투, 평화의 결단  \r
**페이싱**: High Tension (Psychological Climax)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Decision Container      │\r
└─────────────────────────────────────────────┘\r
\r
               [ 다리 밖의 전경 ] \r
                    ↕\r
               [ 원형 테이블 ] ═══ (양측 리더 대치)\r
                    ▓\r
          ┌─────────┴─────────┐\r
          │     [증거 게시판]   │ ← Singh의 주 무기\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [군벌 호위]     [자경단 호위]\r
          (총구 겨눔)    (총구 겨눔)\r
               ↑           ↑\r
               [회담장 입구]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. Battle of Words (최종 협상)**\r
\r
- **기믹**: 입수한 증거물들을 타이밍에 맞춰 제시.\r
- **연출**: 리더들의 분노 게이지가 한계에 달하면 화면이 붉게 점멸하며 "공격을 명령할까요?"라는 대사가 출력됨.\r
\r
**2. 돌발 위기 (저격수의 도발)**\r
\r
- 한쪽 저격수가 방아쇠를 당기려는 찰나, 카메라가 슬로우 모션으로 전환됨.\r
- **선택**: "몸으로 막는다 / 리더를 밀친다 / 저격수에게 소리친다" 중 선택하여 엔딩 분기 결정.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **대화 분기** | 총 12개 (신용도에 영향) |\r
| **POI 수** | 4개 (탄식의 다리, 추모의 벽, 비밀 거래소, 저격 포인트) |\r
| **엔딩 종류** | 평화, 전쟁, 공멸, 암살 (4종) |\r
| **난이도 곡선** | Slow → Tense → Psychological High |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S24 상세 설계 완료\r
2. 🔄 S25_First_Day 맵 설계 진행 예정 (학교 좀비 탈출)\r
3. 🔄 Batch 4-1 나머지 작업 마무리\r
`,bS=`# S25: First Day - Top-down Map 상세 설계\r
\r
> **"수업 종이 울렸지만, 아무도 자리에 앉지 않았다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S25: First Day (첫째 날)  \r
**장르**: 서바이벌 호러 / 도주 액션  \r
**주인공**: Lee Park (고등학생)  \r
**환경**: Dead Zones - 'Sunnyside High School' 및 인근 주택가  \r
**맵 스타일**: 좁은 복도에서의 추격과 파쿠르를 활용한 하이템포 탈출 (교실 → 운동장 → 주택가)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Bloody Corridors (피 칠갑된 복도)\r
\r
**테마**: 패닉, 환경 학습  \r
**페이싱**: High Tension (긴박한 시작)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[2학년 교실] (좀비 난입 시작)\r
     ↓\r
[본관 복도] ← POI #1: 장애물 파쿠르\r
    ↙    ↓    ↘\r
[미술실] [화장실] [교무실] (POI #2: 마스터키)\r
 (은신)   (고립)   (아이템 확보)\r
     ↓\r
[본관 정문/중앙홀] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 파쿠르 튜토리얼**\r
\r
- **장애물**: 쓰러진 사물함 위로 슬라이딩, 열린 창문으로 뛰어내리기.\r
- **상황**: 복도 끝에서 수십 명의 감역자들이 몰려오며, 멈추면 죽는 긴박감을 부여.\r
\r
**2. 교무실 침투 (POI #2)**\r
\r
- 좀비로 변한 선생님들을 피해 캐비닛 속에 숨어 이동하며, 운동장 후문을 열 수 있는 '마스터키' 획득.\r
\r
---\r
\r
### Zone 2: The Crowded Playground (좀비 떼의 운동장)\r
\r
**테마**: 군중 회피, 시선 유도  \r
**페이싱**: Very High Tension (전력 질주)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[학교 현관 계단]\r
     ↓\r
[운동장 중앙] (수백 명의 좀비 배치)\r
    ↙    ↓    ↘\r
[전복된 버스] [야구부 창고] [학교 체육관]\r
 (POI #3: 엄폐) (배트 획득)   (POI #4: 아레나)\r
     ↓\r
[학교 후문 (탈출구)] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 슬라럼 질주 (Slalom Run)**\r
\r
- **기믹**: 좀비들 사이의 틈새(Gap)를 찾아 질주. 좀비가 팔을 뻗을 때 '뿌리치기(Shift)'로 탈출.\r
- **사운드**: 화면 가득 으르렁거리는 소리와 플레이어의 거친 숨소리 강조.\r
\r
**2. 야구부 창고**\r
\r
- 알루미늄 배트를 획득하여, 길을 막는 소수의 좀비들을 밀쳐내거나 쓰러뜨리는 최소한의 자구수단 확보.\r
\r
---\r
\r
### Zone 3: The Path to Home (집으로의 골목)\r
\r
**테마**: 버티컬 내비게이션, 익숙한 것의 공포  \r
**페이싱**: Medium Tension (경로 탐색)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Residential Maze       │\r
└─────────────────────────────────────────────┘\r
\r
               [ Lee의 집 ] \r
               (파란색 대문)\r
                    🏠\r
          ┌─────────┴─────────┐\r
          │     [전신주/담벼락] │ ← 지상 루트 회피\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [막힌 골목]     [쓰레기 더미]\r
          (좀비 밀집)    (기습 주의)\r
               ↑           ↑\r
               [학교 후문 밖]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 담벼락 이동**\r
\r
- 좁은 골목 바닥은 좀비로 가득함. 담벼락 위나 주택 지붕 사이를 뛰어가며 이동.\r
- **추락 위험**: 낡은 지붕을 밟으면 무너져 내리며 좀비 소굴로 떨어지는 트랩 배치.\r
\r
**2. 피날레**\r
\r
- 집 앞에 도착했지만 현관문 앞에 감염된 이웃이 서 있음.\r
- **선택**: 담을 넘어 2층 창문으로 잠입하거나, 배트로 정면 돌파하여 가족을 확인하는 엔딩 시퀀스.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **파쿠르 상호작용** | 20회 이상 |\r
| **POI 수** | 4개 (본관 복도, 교무실, 전복된 버스, 학교 체육관) |\r
| **적 규모** | 호드(Horde) 레벨 (수백 명의 좀비 군집) |\r
| **난이도 곡선** | High → Very High → Steady(Stealth) |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S25 상세 설계 완료\r
2. ✅ Batch 4-1 (S21-S25) 완료\r
3. 🔄 Batch 4-2 (S26-S30) 시나리오 분석 및 맵 설계 진행 예정\r
`,CS=`# S26: The Last Bus - Top-down Map 상세 설계\r
\r
> **"이 버스를 놓치면 다음은 없다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S26: The Last Bus (마지막 버스)  \r
**장르**: 타임어택 액션 슈터  \r
**주인공**: Lee Park (생존자)  \r
**환경**: Dead Zones - 정체된 고가도로와 버스 터미널  \r
**맵 스타일**: 파쿠르 질주와 대규모 호드 회피 (고가도로 → 지하차도 → 터미널)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Pile-up Highway (꽉 막힌 고가도로)\r
\r
**테마**: 플랫폼 액션, 수직적 이동  \r
**페이싱**: High Tension (스피디한 진행)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[고가도로 시작점]\r
     ↓\r
[차량 탑 "The Pile"] ← POI #1: 전망 및 경로 파악\r
    ↙    ↓    ↘\r
[중앙 버스선] [끊어진 가드레일] [우측 갓길]\r
 (직선 질주)  (로프 슬라이당)  (은신)\r
     ↓\r
[지하차도 입구] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. The Floor is Lava**\r
\r
- 도로 바닥은 수천 마리의 좀비로 가득함. 버려진 차량 지붕 위를 밟고 점프하며 이동.\r
- **기믹**: 트럭 컨테이너 사이를 넘을 때의 흔들림 연출로 긴장감 부여.\r
\r
**2. 로프 슬라이딩**\r
\r
- 다리가 끊겨 진행 불가능한 구간에서 쓰러진 전신주의 전선을 타고 슬라이딩하여 반대편 차량으로 이동.\r
\r
---\r
\r
### Zone 2: The Echo Tunnel (어두운 지하차도)\r
\r
**테마**: 청각적 긴장, 시티 런  \r
**페이싱**: Medium Tension (조용한 질주)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[터널 입구] \r
     ↓\r
[암흑 구간] (좀비들의 안광만 노출)\r
    ↙    ↓    ↘\r
[육교 지름길] [차량 내부] [배수관]\r
 (POI #2)      (잠입)      (우회)\r
     ↓\r
[톨게이트 병목 구간] ← POI #3: 대규모 매복\r
     ↓\r
[터널 출구 광장] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 조명탄 시선 유도**\r
\r
- 어둠 속에서 좀비 떼를 총으로 쏘는 대신, 조명탄을 멀리 던져 그들의 시선을 끈 뒤 반대 방향으로 질주.\r
- **사운드**: 발소리가 터널 벽에 반사되어 울리는 역동적인 사운드 효과.\r
\r
**2. 유리 육교 (POI #2)**\r
\r
- 빌딩 사이를 잇는 유리 다리. 너무 빨리 달리면 유리에 금이 가며 붕괴 위험 발생.\r
\r
---\r
\r
### Zone 3: The Final Terminal (중앙 터미널)\r
\r
**테마**: 최후의 질주, 타임어택 피날레  \r
**페이싱**: Very High Tension (Pure Climax)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Bus Terminal           │\r
└─────────────────────────────────────────────┘\r
\r
               [ 떠나는 버스 ] \r
               (POI #4: 최종 목표)\r
                    🚌\r
          ┌─────────┴─────────┐\r
          │     [터미널 광장]   │ ← 대규모 좀비 웨이브\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [티켓 홀]     [티켓 홀]\r
          (화력 집중)    (화력 집중)\r
               ↑           ↑\r
               [광장 정문]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 카운트다운 (3분)**\r
\r
- 화면 상단에 붉게 점멸하는 타이머. 0초가 되면 버스가 출발하며 미션 실패.\r
- **화력 폭발**: 터미널 입구에서 자동 소총을 획득, 난입하는 좀비들을 뚫고 길을 개척.\r
\r
**2. 피날레 점프**\r
\r
- 서서히 가속하는 버스의 뒷문으로 전력 질주하여 매달리는 시네마틱 액션 시퀀스로 마무리.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **제한 시간** | 최종 3분 (Zone 3 전용) |\r
| **POI 수** | 4개 (교통사고 탑, 육교 지름길, 톨게이트, 중앙 터미널) |\r
| **적 밀도** | 극상 (Screen-filling Horde) |\r
| **난이도 곡선** | High → Tense → Extreme |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S26 상세 설계 완료\r
2. 🔄 S27_Hospital_Nightmare 맵 설계 진행 예정 (병원 호러)\r
`,PS=`# S27: Hospital Nightmare - Top-down Map 상세 설계\r
\r
> **"이곳은 사람을 살리는 곳이었다. 지금은 아니다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S27: Hospital Nightmare (병원 악몽)  \r
**장르**: 서바이벌 호러 (자원 관리)  \r
**주인공**: Sarah Miller (간호사)  \r
**환경**: Dead Zones - 'St. Mary's Hospital'  \r
**맵 스타일**: 좁은 시야와 청각적 공포가 강조된 폐쇄 공간 (응급실 → 중환자실 → 지하 약제실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Silent ER (침묵의 응급실)\r
\r
**테마**: 탐색, 초기 공포  \r
**페이싱**: Medium Tension (탐색형 텐션)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[병원 정문]\r
     ↓\r
[접수 데스크] (POI #1: 간호사 스테이션)\r
    ↙    ↓    ↘\r
[수술실] [복도 A] [검사실]\r
 (카드키) (매복)  (아이템)\r
     ↓\r
[중앙 엘리베이터 (작동 불능)]\r
     ↓\r
[비상계단 입구 (3층 연결)] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 조명 연출 (Flashlight)**\r
\r
- 손전등 배터리 제한. 깜빡이는 형광등 아래에서만 좀비의 실루엣 노출.\r
- **기믹**: 휠체어에 묶인 좀비인 줄 알고 지나가려 할 때 갑자기 팔을 뻗는 돌발 상황 배치.\r
\r
---\r
\r
### Zone 2: The Hush Ward (숨죽인 중환자실)\r
\r
**테마**: 극한의 스텔스, 소리 제어  \r
**페이싱**: High Tension (Stealth Concentration)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[3층 입원 병동] \r
     ↓\r
[중환자실 (ICU)] ← POI #2: 클리커 서식지\r
    ↙    ↓    ↘\r
[격리 필름 복도] [병실 미로] [직원 휴게실] (세이브)\r
 (바닥 유리 조각) (숨참기 구간) (정비)\r
     ↓\r
[화물용 승강기 패널] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 청각적 위협: 클리커 (Clicker)**\r
\r
- **특징**: 눈이 멀었지만 소리에 매우 민감함.\r
- **기믹**: 바닥에 깨진 유리 조각들이 깔려 있어 달리기 금지. 벽돌을 던져 소음으로 적을 유인.\r
- **스킬: 숨참기**: 적이 바로 옆을 지나갈 때 게이지를 소모해 발각 회피.\r
\r
---\r
\r
### Zone 3: The Cold Pharmacy (추운 지하 약제실)\r
\r
**테마**: 추격, 최후의 생존  \r
**페이싱**: Very High Tension (Chase & Final Battle)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Underground Pharmacy       │\r
└─────────────────────────────────────────────┘\r
\r
               [ 주차장 탈출 앰뷸런스 ] \r
                    ↑\r
               [ 주차장 램프 ] ═══ (호드 추격)\r
                    ▓\r
          ┌─────────┴─────────┐\r
          │     [약품 냉장고]   │ ← POI #3: 항생제 상자\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [냉동고 뒤편]   [제약실 통로]\r
          (보스: 블로터) (샷건 확보)\r
               ↑           ↑\r
               [승강기 하역장]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: 블로터 (Bloater)**\r
\r
- **특징**: 좁은 공간에서 돌진하는 거대 비만 좀비.\r
- **공략**: 제약실 선반을 활용해 뺑뺑이를 돌리며 샷건으로 약점(머리, 다리) 집중 사격.\r
\r
**2. 피날레: 호드 추격**\r
\r
- 항생제를 챙기고 앰뷸런스 키를 얻는 순간 병원 전체에 경보가 울리고, 수십 마리의 좀비가 복도로 난입.\r
- 시계탑 옥상이 아닌 '지하 주차장'을 통해 앰뷸런스를 타고 병원 정문을 돌파하며 탈출.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 33분 |\r
| **특수 좀비 수** | 클리커(5), 블로터(1) |\r
| **POI 수** | 4개 (간호사 스테이션, 중환자실, 약제실, 옥상 헬기장) |\r
| **핵심 아이템** | 손전등 배터리, 샷건 탄약, 항생제 |\r
| **난이도 곡선** | Creepy → Tense → Panic |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S27 상세 설계 완료\r
2. 🔄 S28_Safe_Zone_Defense 맵 설계 진행 예정 (협동 방어)\r
`,TS=`# S28: Safe Zone Defense - Top-down Map 상세 설계\r
\r
> **"우리에겐 더 이상 물러설 곳이 없다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S28: Safe Zone Defense (세이프 존 방어)  \r
**장르**: 협동 멀티플레이 슈터 (Co-op PVE)  \r
**주인공**: Sarah Miller (리더)  \r
**환경**: Dead Zones - 학교 체육관 (안전지대)  \r
**맵 스타일**: 단일 대형 아레나에서의 다방향 방어전 (체육관 바닥 → 관람석 → 옥상)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Gym Floor (체육관 1층 바닥)\r
\r
**테마**: 거점 봉쇄, 웨이브 방어  \r
**페이싱**: High Tension (쉴 틈 없는 공격)  \r
**플레이 타임**: 약 15분 (3개 웨이브)\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[보급 상자] ← POI #1: 중앙 허브\r
     ↕\r
[메인 코트] (이재민 텐트 및 의료 천막 POI #4)\r
    ↙    ↓    ↘\r
[서측 창문] [정문 셔터] [동측 창문]\r
 (바리케이드) (중화기 거치) (바리케이드)\r
     ↓\r
[지하 발전기실] → (POI #3: 미션 위기 지점)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 실시간 수리 기믹**\r
\r
- 좀비가 창문을 부수고 판자를 뜯어내면, Sarah가 달려가 "수여" 버튼으로 창문을 다시 봉쇄해야 함.\r
- **탱크 좀비**: 정문 셔터를 한 방에 날려버리며 난입하는 중간 보스 등장.\r
\r
---\r
\r
### Zone 2: The Spectator Stands (2층 관람석)\r
\r
**테마**: 고지대 지원, 환경 활용  \r
**페이싱**: Medium Tension (전략적 사격)  \r
**플레이 타임**: Zone 1과 동시 진행\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[방송실 지휘소] \r
     ↓\r
[관람석 전면 발코니] ← POI #2: 저격 포인트\r
    ↙    ↓    ↘\r
[천장 환풍구] [점광등 기어] [옥상 사다리]\r
 (적 잠입 입구) (트랩 기믹)   (Act 3 도주로)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 환경 트랩 (점광등)**\r
\r
- 체육관 천장에 매달린 거대 조명을 사격하여 낙하시키면, 아래에 몰려 있던 좀비 떼를 광역 처치 가능.\r
\r
**2. 방송실 브리핑**\r
\r
- Sarah가 방송실 마이크를 통해 아군에게 "적들이 환풍구로 오고 있다!"라고 외치면, 미니맵에 적의 위치가 붉게 노출됨.\r
\r
---\r
\r
### Zone 3: The Salvation Rooftop (옥상 헬기장)\r
\r
**테마**: 최후의 엑소더스, 피날레  \r
**페이싱**: Climax (Final Defense)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Gym Rooftop Helipad        │\r
└─────────────────────────────────────────────┘\r
\r
               [ 헬기 착륙장 ] \r
               (POI: 3분간 사수)\r
                    🚁\r
          ┌─────────┴─────────┐\r
          │     [옥상 엄폐물]   │ ← 보스: 탱크(Tank) 난입\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [옥상 입구 A]   [옥상 입구 B]\r
          (사다리 방어)  (사다리 방어)\r
               ↑           ↑\r
               [체육관 천장]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 최종 보스전: 거대 탱크**\r
\r
- 헬기가 착륙하려는 찰나, 거대 탱크 좀비가 성화대를 뽑아 던지며 등장.\r
- **공략**: 화염병으로 탱크를 불태우고 모든 사수가 집중 화력을 퍼부어 무력화.\r
\r
**2. 환자 후송**\r
\r
- 탱크를 격퇴한 후, 헬기 뒤편으로 다친 NPC들을 한 명씩 부축해 태우는 동안 플레이어 중 한 명은 후방 엄호를 맡아야 함.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **웨이브 수** | 5단계 (점진적 난이도 상승) |\r
| **POI 수** | 4개 (보급 상자, 관람석, 발전기실, 의료 텐트) |\r
| **협동 요소** | 바리케이드 공동 수리, 탄약 공유, 자가 소생 |\r
| **난이도 곡선** | Easy → Steady → Chaotic(Final) |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S28 상세 설계 완료\r
2. 🔄 S29_Silent_Runner 맵 설계 진행 예정 (황무지 배달)\r
`,IS=`# S29: Silent Runner - Top-down Map 상세 설계\r
\r
> **"소리가 멈추는 곳에 안식이 있다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S29: Silent Runner (고요한 질주)  \r
**장르**: 오픈월드 워킹 시뮬레이터 / 배달 액션  \r
**주인공**: Runner (전문 배달부)  \r
**환경**: Dead Zones - 황폐한 고속도로와 숲  \r
**맵 스타일**: 장엄한 풍경과 실시간 좀비 흐름을 관리하는 여정 (캠프 외곽 → 좀비 평원 → 라디오 타워)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Desolate Outset (황량한 시작)\r
\r
**테마**: 루트 계획, 고독한 정경  \r
**페이싱**: Low Tension (정적인 시작)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[출발지 캠프 입구]\r
     ↓\r
[전망 바위] ← POI #3: 망원경 관측 (경로 설정)\r
    ↙    ↓    ↘\r
[메인 도로] [숲길 우회] [강가 루트]\r
 (평평함)    (은밀함)    (위험함)\r
     ↓\r
[휴게소 진입로] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 평형 센서 기믹 (L2/R2)**\r
\r
- 짐을 높게 쌓았을 때 가파른 언덕이나 강을 건널 때 캐릭터의 무게 중심이 좌우로 흔들림.\r
- **기믹**: 흔들리는 방향의 반대 버튼을 눌러 균형을 유지해야 짐이 떨어지지 않음.\r
\r
**2. 랜드마크 유도**\r
\r
- 지평선 끝에서 깜빡이는 캠프의 '붉은 라디오 타워' 불빛이 유일한 가이드 역할.\r
\r
---\r
\r
### Zone 2: The Horde Stream (좀비의 강)\r
\r
**테마**: 동적 장애물, 은신과 도주  \r
**페이싱**: High Tension (조용한 위기)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[휴게소 터] ← POI #1: 중간 세이브 (정비)\r
     ↓\r
[좀비 평야] ← POI #4: 대규모 군집 이동 구역\r
    ↙    ↓    ↘\r
[버려진 터널] [산등성이] [정체 구간]\r
 (POI #2)      (체력 소모)  (매복)\r
     ↓\r
[협곡 좁은 길] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 좀비 강 (Horde Stream)**\r
\r
- **특징**: 수천 마리의 좀비가 원 모양으로 맵을 순회하며 이동.\r
- **기믹**: 흐름의 중앙을 뚫는 대신, 그들이 지나갈 때까지 바위 틈에 숨어 **숨참기**로 인내하는 잠입 필요.\r
\r
**2. 버려진 터널 (POI #2)**\r
\r
- **지름길**: 좀비 평원을 건너뛰는 가장 빠른 길. 하지만 라이트 없이 진입해야 하며, 구석에 매복한 소수의 좀비를 연막탄으로 따돌려야 함.\r
\r
---\r
\r
### Zone 3: The Beacon of Hope (희망의 등불)\r
\r
**테마**: 성취감, 안도로의 도착  \r
**페이싱**: Release (Emotional Finish)  \r
**플레이 타임**: 약 5분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Radio Tower Camp Outpost   │\r
└─────────────────────────────────────────────┘\r
\r
               [ 캠프 내부 홀 ] \r
               (최종 물자 전달)\r
                    ❤\r
          ┌─────────┴─────────┐\r
          │     [캠프 정문]     │ ← 바리케이드 열림\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [오르막 도로]   [오르막 도로]\r
          (바람개비 POI)  (바람개비 POI)\r
               ↑           ↑\r
               [협곡 끝]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 감성적 연출**\r
\r
- 목적지에 가까워지면 시끄러운 좀비 소리가 잦아들고, 고요한 어쿠스틱 기타 선율이 시작됨.\r
- **시각**: 어두운 황야에서 캠프의 따뜻한 오렌지색 조명들이 일렬로 켜져 주인공을 맞이함.\r
\r
**2. 마지막 질주**\r
\r
- 스태미나 게이지가 빨간색으로 점멸할 때, 마지막 사력을 다해 짐을 지키며 캠프 안으로 무사히 진입.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **운송 물자** | 백신 팩, 의료 키트, 기록 자료 (총 15kg) |\r
| **POI 수** | 4개 (휴게소, 버려진 터널, 전망 바위, 좀비 강) |\r
| **전투 빈도** | 최저 (잠입 및 회피 중심) |\r
| **난이도 곡선** | Slow → Tense → Calm |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S29 상세 설계 완료\r
2. 🔄 S30_The_Hive 맵 설계 진행 예정 (지하 쇼핑몰 퀸 암살)\r
3. 🔄 Batch 4 전체 완료 보고\r
`,ES=`# S30: The Hive - Top-down Map 상세 설계\r
\r
> **"여왕을 잡으면 개미들은 흩어진다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S30: The Hive (하이브)  \r
**장르**: 잠입 스릴러 / 보스전  \r
**주인공**: Runner (잠입 전문가)  \r
**환경**: Dead Zones - 변이된 지하 쇼핑몰 'The Mega-Mall'  \r
**맵 스타일**: 유기적인 생체 조직과 기괴한 함정이 가득한 폐쇄 공포 (지하 주차장 → 아트리움 → 영화관)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Fleshy Overpass (살점 주차장)\r
\r
**테마**: 초기 잠입, 환경 위험 인지  \r
**페이싱**: High Tension (긴밀한 움직임)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[지하 주차장 램프]\r
     ↓\r
[고치 벽 코리더] ← POI #1: 소음 민감 함정\r
    ↙    ↓    ↘\r
[뒤집힌 트럭] [환풍구 A] [보안 사무실]\r
 (엄폐)       (POI #4)    (위장약 확보)\r
     ↓\r
[쇼핑몰 1층 게이트] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 위장 체액 기믹**\r
\r
- **기믹**: 죽은 좀비의 체액을 몸에 발라 자신의 체취를 30초간 가림. 이 상태에서는 좀비 바로 옆을 지나가도 눈치채지 못함.\r
\r
**2. 고치 벽 (POI #1)**\r
\r
- 벽에 박힌 붉은 고치들은 일정 범위 내의 소음을 감지하면 즉시 부화. 기어가는 낮은 자세 이동 필수.\r
\r
---\r
\r
### Zone 2: The Slime Atrium (점액의 아트리움)\r
\r
**테마**: 미로 탐색, 실시간 지형 변화  \r
**페이싱**: Medium Tension (길찾기 퍼즐)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[아트리움 광장] (부양 연못 POI #2)\r
     ↓\r
[거대 생체 기둥 "The Spine"] (랜드마크)\r
    ↙    ↓    ↘\r
[에스컬레이터] [매장 내부] [유지보수층]\r
 (수직 이동)   (화염병 재료) (환풍구 로드)\r
     ↓\r
[아이맥스 상영관 복도] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 가스 정화 퍼즐**\r
\r
- 복도를 가득 채운 생체막을 제거하기 위해 주변 가스통을 폭발시켜 태워버리는 연쇄 반응 유도.\r
\r
**2. 실시간 지형 변화**\r
\r
- 하이브가 숨을 쉴 때마다 복도의 폭이 좁아졌다 넓어짐. 좁아지는 타이밍에 끼이면 즉사하므로 리듬에 맞춰 통과.\r
\r
---\r
\r
### Zone 3: The Queen's IMAX (여왕의 둥지)\r
\r
**테마**: 보스전, 채집 및 대탈출  \r
**페이싱**: Climax (Stealth to Sprint)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Queen's Nest Arena     │\r
└─────────────────────────────────────────────┘\r
\r
               [ 지하철 선로 ] \r
               (최종 탈출로)\r
                    🏃\r
          ┌─────────┴─────────┐\r
          │     [상영관 무대]   │ ← POI #3: 여왕의 숙면 지점\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [영사실 2층]   [좌석 구역]\r
          (저격/교란)    (잠입 경로)\r
               ↑           ↑\r
               [둥지 입구]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스: Hive Queen (샘플 채취)**\r
\r
- **1페이즈**: 자고 있는 퀸의 꼬리 끝에 조용히 다가가 주사기로 샘플 채취. 화면 중앙에 출력되는 '심장 박동 맞추기' 미니게임 수행.\r
- **2페이즈**: 샘플을 뽑는 순간 퀸이 포효하며 깨어남. 이때부터는 모든 좀비가 몰려오며 입구의 선로를 향해 전력 질주 시작.\r
\r
**2. 대폭발 마무리**\r
\r
- 선로에 설치해둔 폭약을 터뜨려 뒤따라오던 하이브의 입구를 완전히 붕괴시키며 유유히 지상으로 탈출.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **샘플 수집율** | 100% (메인 클리어 조건) |\r
| **POI 수** | 4개 (고치 벽, 부양 연못, 여왕의 둥지, 환풍 허브) |\r
| **환경 데미지** | 산성 점액, 가스 중독, 생체 압착 |\r
| **난이도 곡선** | Very High → Planning → Heart-pumping |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S30 상세 설계 완료\r
2. ✅ Batch 4 (S21-S30) 전체 완료\r
3. 🔄 Batch 5 (S31-S40) 작업 준비 예정 (스팀펑크/시간여행 테마)\r
4. 🔄 task.md 업데이트 및 배치 진행 보고\r
`,MS=`# S31: The Sky Heist - Top-down Map 상세 설계\r
\r
> **"하늘에 길이 없다면, 만들면 된다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S31: The Sky Heist (하늘의 도적들)  \r
**장르**: 잠입 액션 / 하이스트 (Heist)  \r
**주인공**: Captain Gearheart (공적)  \r
**환경**: Aether Empire - 구름 위를 나는 거대 비행 함대  \r
**맵 스타일**: 그래플링 훅을 활용한 수직 이동과 비행선 간 도약 (호위함 → 엔진실 → 함교)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: Fleet Approach (함대 접근로)\r
\r
**테마**: 고공 액션, 낙하 위협  \r
**페이싱**: High Tension (역동적 이동)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[시작: 도적 전용 소형선]\r
     ↓\r
[호위함 A 갑판] ════ [호위함 B 갑판]\r
     ↕ (갈고리)         ↕ (갈고리)\r
[프로펠러 난간] ← POI #1: 강풍 구간\r
    ↙    ↓    ↘\r
[대공포 진지] [연료 파이프] [닻줄 연결부]\r
 (무력화)      (이동로)      (침투로)\r
     ↓\r
[리바이어던 호 하부 갑판] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 그래플링 훅 (Grappling Hook)**\r
\r
- 비행선 사이의 거리가 실시간으로 변함. 흔들리는 닻줄이나 튀어나온 브라스 파이프를 조준해 고공 점프 수행.\r
- **바람 기믹**: 바람의 방향에 따라 낙하 궤적이 휘어지며, 이를 역이용해 평소보다 먼 거리를 활공.\r
\r
---\r
\r
### Zone 2: The Heart of Leviathan (리바이어던 호 내부)\r
\r
**테마**: 엔진 소음 활용, 스팀 퍼즐  \r
**페이싱**: Low to Medium (잠입 집중)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[하부 화물칸] (POI #3: 크레인 해킹)\r
     ↓\r
[보일러실] ← POI #2: 증기 연막 구간\r
    ↙    ↓    ↘\r
[기어 정비소] [중앙 환풍구] [병사 숙소]\r
 (기어 퍼즐)    (은신)       (변장)\r
     ↓\r
[중앙 나선형 계단] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 사운드 마스킹 (Sound Masking)**\r
\r
- **기믹**: 거대 엔진이 '치익-쾅'하고 소리를 낼 때만 총을 쏘거나 뛰는 행동이 허용됨.\r
- **증기 해저드**: 밸브를 과부하 시켜 실내를 증기로 가득 채워 적들의 시야를 완전히 차단.\r
\r
---\r
\r
### Zone 3: The Bridge Glass Dome (함교 유리 돔)\r
\r
**테마**: 최후의 탈취, 공중 대탈출  \r
**페이싱**: Maximum Tension (Combat & Escape)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Leviathan's Bridge         │\r
└─────────────────────────────────────────────┘\r
\r
               [ 개인용 글라이더 ] \r
               (최종 탈출 수단)\r
                    ✨\r
          ┌─────────┴─────────┐\r
          │     [최상층 갑판]   │ ← 함대 전체 Reveal\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [금고실]       [함장실]\r
          (설계도 탈취)  (교전/해킹)\r
               ↑           ↑\r
               [함교 유리 돔]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 유리 돔 결전 (POI #4)**\r
\r
- **연출**: 사방이 유리로 된 함교에서 근위대와 전투. 적의 포격으로 유리가 깨지며 기압차로 인해 캐릭터가 밖으로 빨려 나가려 함.\r
- **탈출**: 비행선이 폭파되기 시작할 때 갑판 끝에서 글라이더를 펼쳐 구름 속으로 낙수하는 시네마틱 컷신.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **낙하 고도** | 5,000m (배경 그래픽) |\r
| **POI 수** | 4개 (프로펠러 길, 보일러실, 화물칸, 함교 유리 돔) |\r
| **주요 적** | 증기 경비병, 황실 근위대 |\r
| **난이도 곡선** | Dizzy → Intellectual → Cinematic Max |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S31 상세 설계 완료\r
2. 🔄 S32_Gear_Revolution 맵 설계 진행 예정 (지하 공장 혁명)\r
`,NS=`# S32: Gear Revolution - Top-down Map 상세 설계\r
\r
> **"기계는 교체할 수 있지만, 사람은 교체할 수 없다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S32: Gear Revolution (기어 혁명)  \r
**장르**: 군중 액션 / 점령전  \r
**주인공**: Captain Gearheart (혁명가)  \r
**환경**: Aether Empire - 지하 공장 도시 'Iron Bottom'  \r
**맵 스타일**: 억압적인 반복 구조에서 폭발적인 해방감으로 변하는 군집 액션 (숙소 → 생산 라인 → 타워)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: Slum & Assembly (빈민가와 집결)\r
\r
**테마**: 선동, 군중 모집  \r
**페이싱**: Low to Rising (점진적 고조)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[노동자 숙소]\r
     ↓\r
[중앙 광장 분수] ← POI: 연설 지점\r
    ↙    ↓    ↘\r
[벽보 골목] [검문소] [비밀 캠프]\r
 (선동)      (전투 시작) (정비)\r
     ↓\r
[황금 동상 광장] ← POI #1: 상징적 점령지\r
     ↓\r
[공장 정문] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 군중 팔로잉 (Crowd Control)**\r
\r
- 플레이어 뒤로 수십 명의 노동자들이 횃불과 스패너를 들고 따라옴.\r
- **명령**: '돌격'으로 바리케이드 파괴, '대기'로 함정 유인 가능.\r
\r
---\r
\r
### Zone 2: The Production Line (거대 생산 라인)\r
\r
**테마**: 산업 재해 무기화, 난전  \r
**페이싱**: High Tension (역동적 전투)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[공장 입구 로비] \r
     ↓\r
[컨베이어 벨트 구역] ← POI #4: 조립 라인\r
    ↙    ↓    ↘\r
[용압 다리] [보일러룸] [사이렌 탑]\r
 (POI #2)    (증기 공격) (POI #3)\r
     ↓\r
[감독관 타워 입구 엘리베이터] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 환경 처치 (Environmental Kills)**\r
\r
- **용암 다리 (POI #2)**: 다리 난간을 부수고 몰아치는 자동 기계 병사들을 쇳물 속으로 밀쳐내기.\r
- **수직 압착기**: 컨베이어 벨트를 타고 이동하며 타이밍에 맞춰 압착기로 적을 유인해 파쇄.\r
\r
---\r
\r
### Zone 3: The Chairman's Tower (기업주 타워)\r
\r
**테마**: 보스전, 혁명의 완성  \r
**페이싱**: Climax (Epic Battle)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Tyrant's Tower         │\r
└─────────────────────────────────────────────┘\r
\r
               [ 타워 꼭대기 ] \r
               (혁명 깃발 설치)\r
                    🚩\r
          ┌─────────┴─────────┐\r
          │     [전망대 라운지] │ ← 보스: 더 체어맨 (Mech)\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [엘리베이터 광장] [외벽 발코니]\r
          (군중 지원)      (잠입 경로)\r
               ↑           ↑\r
               [지상 연결부]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: The Chairman's Automaton**\r
\r
- **기믹**: 거대 전투 로봇에 탑승한 기업주. 로봇의 다리 관절에 노동자들이 매달려 기동을 멈추게 하면 플레이어가 조종석을 강타.\r
- **엔딩**: 타워 꼭대기 사이렌 스피커를 부수고, 그 자리에 혁명의 상징인 커다란 하얀 깃발을 꽂으며 승리 선포.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **최대 군중 수** | 50명 (실시간 렌더링 AI) |\r
| **POI 수** | 4개 (황금 동상, 용암 다리, 사이렌 탑, 조립 라인) |\r
| **주요 적** | 기업 경비대, 1세대 자동 병사, 보스 로봇 |\r
| **난이도 곡선** | Stealth → Brawl → Strategic Boss |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S32 상세 설계 완료\r
2. 🔄 S33_Ironclad_Assault 맵 설계 진행 예정 (거대 증기 로봇)\r
`,jS=`# S33: Ironclad Assault - Top-down Map 상세 설계\r
\r
> **"증기압 최대. 전속력으로 들이받아라!"**\r
\r
## 설계 개요\r
\r
**시나리오**: S33: Ironclad Assault (철갑의 진격)  \r
**장르**: 메카닉 액션 / 슈팅  \r
**주인공**: Professor Steam (발명가/파일럿)  \r
**환경**: Aether Empire - 전쟁터가 된 황무지 'No Man's Land'  \r
**맵 스타일**: 육중한 메카닉의 화력전과 공성전 (격납고 → 참호 지대 → 이동 요새)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: Ironclad Hangar (격납고 및 출격)\r
\r
**테마**: 스케일 체감, 시스템 점검  \r
**페이싱**: Low to Medium (준비 단계)  \r
**플레이 타임**: 약 5분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[로봇 정비 독] (POI #3: 수리 시설)\r
     ↓\r
[격납고 셔터] (외부 도심 Reveal)\r
    ↙    ↓    ↘\r
[전투 테스트장] [보급 탄약고] [지휘 본부]\r
 (타겟 사격)     (무장 선택)   (브리핑)\r
     ↓\r
[전선 전진 게이트] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 육중한 질량감 (Weight & Feel)**\r
\r
- 로봇이 걸을 때마다 격납고 내부의 차량들이 찌그러지고 지면이 진동하는 사운드/화면 효과.\r
- **콕핏 뷰**: 3D 인터랙티브 콕핏을 통해 엔진 압력과 과열 상태를 실시간 모니터링.\r
\r
---\r
\r
### Zone 2: No Man's Land (죽음의 평원)\r
\r
**테마**: 화력 돌파, 험지 돌파  \r
**페이싱**: High Tension (Field Battle)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[참호선 시작] \r
     ↓\r
[진흙 평원] ← POI #1: 이동 저하 지형\r
    ↙    ↓    ↘\r
[무너진 다리] [벙커 밀집지] [추락한 비행선]\r
 (점프젯 도약) (주포 파괴)   (엄폐물)\r
     ↓\r
[요새 외곽 고지대] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 진흙 평원 해저드 (POI #1)**\r
\r
- 바닥이 젖어 있어 로봇의 다리가 빠짐. 이때는 대쉬를 사용할 수 없으므로, 적의 포격 시 쉴드(에너지 소모)로 버티며 전진하는 전략적 판단 필요.\r
- **대공포 파괴 (POI #2)**: 언덕 위의 대공포를 주포로 날려야 아군 수리 드론이 전장에 투입되어 로봇의 내구도를 수복함.\r
\r
---\r
\r
### Zone 3: Behemoth Siege (이동 요새 공성)\r
\r
**테마**: 초거대 보스전, 다단계 공략  \r
**페이싱**: Boss Battle (Epic Climax)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Final Bastion          │\r
└─────────────────────────────────────────────┘\r
\r
               [ 이동 요새 상층부 ] \r
               (POI: 베헤모스 코어 파괴)\r
                    🔥\r
          ┌─────────┴─────────┐\r
          │     [요새 갑판]     │ ← 로봇 강제 하차 후 도보 액션(?)\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [좌측 거대 다리] [우축 거대 다리]\r
          (관절 결속 파괴) (관절 결속 파괴)\r
               ↑           ↑\r
               [요새 하단부]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 보스전: 거대 베헤모스 (POI #4)**\r
\r
- **1단계**: 로봇의 개틀링건과 유도 미사일로 베헤모스의 4개 다리 관절 노출 후 주포로 파괴.\r
- **2단계**: 기우뚱해진 베헤모스의 등 위로 점프젯을 이용해 올라타 갑판 위의 포탑들을 하나씩 철거.\r
- **3단계**: 노출된 중앙 증기 코어에 모든 화력을 쏟아부어 대폭발과 함께 승리.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **로봇 규격** | 높이 15m, 중량 200톤 |\r
| **POI 수** | 4개 (진흙 평원, 대공포 진지, 수리 시설, 베헤모스) |\r
| **주요 무장** | 120mm 증기 주포, 30mm 개틀링, 미사일 포드 |\r
| **난이도 곡선** | Easy-Brawl → Heavy Combat → Epic Boss |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S33 상세 설계 완료\r
2. 🔄 S34_Traitors_Dilemma 맵 설계 진행 예정 (저택 살인 추리)\r
`,AS=`# S34: Traitor's Dilemma - Top-down Map 상세 설계\r
\r
> **"범인은 이 방 안에 있다. 아니면 내 머릿속에 있거나."**\r
\r
## 설계 개요\r
\r
**시나리오**: S34: Traitor's Dilemma (배신자의 딜레마)  \r
**장르**: 추리 어드벤처 / 심리 스릴러  \r
**주인공**: Professor Steam (탐정 모드)  \r
**환경**: Aether Empire - 절벽 위의 고풍스러운 저택 'Blackwood Manor'  \r
**맵 스타일**: 밀실 살인 현장과 비밀 통로가 어우러진 수사 루트 (연회장 → 손님방 → 비밀 지하실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Blood-stained Foyer (피 묻은 현관)\r
\r
**테마**: 사건 현장 보존, 1차 조사  \r
**페이싱**: Low Tension (정적이고 긴장된 시작)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[저택 현관] (폭풍우로 고립)\r
     ↓\r
[대연회장] ← POI #2: 살인 현장 재구성\r
    ↙    ↓    ↘\r
[부엌]   [거실]   [피아노 룸]\r
 (독약 수색) (알리바이) (심리적 단서)\r
     ↓\r
[중앙 나선형 계단] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 라이트닝 일루미네이션 (Lightning)**\r
\r
- **기믹**: 창밖에서 번개가 칠 때만 특정 벽면의 혈흔이나 바닥의 숨겨진 지문이 일시적으로 하이라이트 됨.\r
- **증거 조합**: 돋보기를 이용해 미세한 단서를 찾고, 이를 주인공의 '추리 보드'에 저장.\r
\r
---\r
\r
### Zone 2: The Corridor of Suspects (용의자의 복도)\r
\r
**테마**: 탐문, 심리전, 비밀 수색  \r
**페이싱**: Medium Tension (의심과 거짓말)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[2층 중앙 복도] \r
     ↓\r
[서재] ← POI #1: 피해자의 일기장\r
    ↙    ↓    ↘\r
[손님방 101] [시계탑 다락] [손님방 102]\r
 (알리바이 체크) (POI #3: 관측) (가방 수색)\r
     ↓\r
[비밀 서가 입구 (책장 뒤)] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 심문 시스템 (Interrogation)**\r
\r
- 용의자들의 표정과 손 떨림을 관찰. 모순된 증거를 제시하면 화면이 흑백으로 변하며 주인공의 날카로운 추리 독백 시작.\r
- **시계탑 다락 (POI #3)**: 거대 톱니바퀴 사이에서 저택 마당을 내려다보며 범인의 시체 유기 경로를 육안으로 확인.\r
\r
---\r
\r
### Zone 3: The Empire's Secret (제국의 비밀)\r
\r
**테마**: 내러티브 반전, 장르 결합(잠입)  \r
**페이싱**: High Tension (Final Unmasking)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Hidden Cellar          │\r
└─────────────────────────────────────────────┘\r
\r
               [ 로비 중앙 홀 ] \r
               (범인 지목 연설)\r
                    📢\r
          ┌─────────┴─────────┐\r
          │     [비밀 지하실]   │ ← POI #4: 스파이 통신 장치\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [와인 저장고]   [비밀 통로]\r
          (기계 장치 퍼즐) (제국군 증거)\r
               ↑           ↑\r
               [서재 책장 뒤]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 삐걱거리는 톱니바퀴 (POI #4)**\r
\r
- 와인 오크통을 특정 순서대로 돌리면 벽이 열리며 스팀펑크 풍의 고도화된 통신 장치 노출.\r
- **클라이맥스**: 모든 용의자를 로비로 모은 뒤, 증거물 3개를 순서대로 제시하여 범인을 지목.\r
\r
**2. 액션 전환**\r
\r
- 정체가 탄로 난 범인이 증기 폭탄을 터뜨리려 할 때, 주인공이 직접 설계한 기계 팔로 범인을 제압하는 세미 액션 시퀀스.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **용의자 수** | 5명 (각기 다른 동기 보유) |\r
| **POI 수** | 4개 (서재, 대연회장, 시계탑 다락방, 비밀 지하실) |\r
| **핵심 기믹** | 추리 보드(Reasoning Board), 번개 조명 |\r
| **난이도 곡선** | Slow → Investigate → Dramatic Reveal |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S34 상세 설계 완료\r
2. 🔄 S35_Time_Tangled 맵 설계 진행 예정 (과거/미래 퍼즐)\r
`,OS=`# S35: Time Tangled - Top-down Map 상세 설계\r
\r
> **"과거를 고치면 미래가 부서진다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S35: Time Tangled (뒤엉킨 시간)  \r
**장르**: 퍼즐 플랫폼 / 액션  \r
**주인공**: Lily (시간 여행자)  \r
**환경**: Aether Empire - 시간 연구소 'Chronos Lab'  \r
**맵 스타일**: 실시간 시간대 전환(Time-Swapping)과 인과 관계 퍼즐 (현재 → 과거 → 미래)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: Fractured Reality (균열된 현재)\r
\r
**테마**: 시간 조작 학습, 뒤엉킨 지형  \r
**페이싱**: Medium Tension (튜토리얼 및 사고 대응)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[폭발한 실험실]\r
     ↓\r
[균열의 방] ← POI #1: 과거/미래 실시간 전환\r
    ↙    ↓    ↘\r
[파편 플랫폼] [통제실] [거대 모래시계] (POI #2)\r
 (시간 고정)    (정비)  (중력 반전)\r
     ↓\r
[시간 포털 (과거행)] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 시간 동결 (Chrono Freeze)**\r
\r
- **기믹**: 공중에 날아다니는 파편들을 특정 시간 지점에서 멈춰 세워 계단으로 활용.\r
- **균열의 방 (POI #1)**: 맵의 절반은 과거, 절반은 미래인 기묘한 공간. 물리 법칙이 수시로 바뀜.\r
\r
---\r
\r
### Zone 2: The Golden Past (황금빛 과거)\r
\r
**테마**: 인과 관계(Cause), 건설적인 퍼즐  \r
**페이싱**: Low Tension (느긋한 퍼즐 풀이)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[50년 전 정원] (POI #3: 묘목 심기)\r
     ↓\r
[건설 중인 연구실] \r
    ↙    ↓    ↘\r
[설계도 보관소] [물길 수로] [중앙 홀]\r
 (퍼즐 힌트)    (나비 효과)  (연구원 지원)\r
     ↓\r
[시간 포털 (미래행)] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 나비 효과 시스템 (Butterfly Effect)**\r
\r
- **POI #3 (오래된 참나무)**: 과거에서 나무에 물을 주면, 미래 Zone 3에서 거대한 고목이 되어 다리 역할을 함.\r
- **아이템 전송**: 과거의 상자에 물건을 담아두면, 미래의 같은 위치에서 녹슨 상자를 열어 아이템 획득 가능.\r
\r
---\r
\r
### Zone 3: The Decaying Future (붕괴하는 미래)\r
\r
**테마**: 결과 확인(Effect), 필사의 탈출  \r
**페이싱**: High Tension (Chase & Action)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The End of Time            │\r
└─────────────────────────────────────────────┘\r
\r
               [ 현재로의 포털 ] \r
               (최종 탈출)\r
                    ✨\r
          ┌─────────┴─────────┐\r
          │     [사라지는 지형] │ ← POI #4: 시간 포식자 추격\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [거대 고목 다리] [데이터 파편]\r
          (Zone 2 영향)   (플랫폼)\r
               ↑           ↑\r
               [무너진 로비]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 시간 포식자 추격 (POI #4)**\r
\r
- **연출**: 맵의 뒷부분이 디지털 노이즈처럼 사라지며 거대한 괴수가 쫓아옴.\r
- **기믹**: '시간 가속' 능력을 사용해 무너지는 발판을 빛의 속도로 밟고 지나가기.\r
\r
**2. 인과 관계의 해결**\r
\r
- 과거와 미래를 오가며 얻은 3개의 '시간의 합창' 파츠를 중앙 모래시계에 장착하여 모든 시간선을 현재로 통합하며 마무리.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 32분 |\r
| **시간대 수** | 과거(50년 전), 현재(사고 직후), 미래(100년 후) |\r
| **POI 수** | 4개 (균열의 방, 거대 모래시계, 오래된 참나무, 포식자의 길) |\r
| **핵심 조작** | 되감기, 정지, 가속 (Chrono Glove) |\r
| **난이도 곡선** | Intelligent → Creative → Hectic |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S35 상세 설계 완료\r
2. ✅ Batch 5-1 완료\r
3. 🔄 Batch 5-2 (S36-S40) 시나리오 분석 및 맵 설계 진행 예정\r
`,RS=`# S36: Clockwork Heart - Top-down Map 상세 설계\r
\r
> **"심장이 멈춰도 사랑은 계속된다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S36: Clockwork Heart (태엽 심장)  \r
**장르**: 정밀 플랫포머 / 감성 어드벤처  \r
**주인공**: Lily (정비공)  \r
**환경**: Aether Empire - 거대 시계탑 'The Clocktower' 내부  \r
**맵 스타일**: 리듬감 있는 기계 장치와 수직적 상승이 강조된 플랫폼 (하부 동력실 → 중층 타종실 → 최상층 심장부)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Steam & Gear Foundation (하부 동력실)\r
\r
**테마**: 기본 조작, 수리 기믹  \r
**페이싱**: Low Tension (탐색형 플랫포밍)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[시계탑 무거운 철문]\r
     ↓\r
[증기 피스톤 숲] ← POI #4: 수직 상승 학습\r
    ↙    ↓    ↘\r
[녹슨 기어실] [유지보수 통로] [윤활유 창고]\r
 (수리 퍼즐)    (벽타기 구간)  (아이템)\r
     ↓\r
[거대 기어 플랫폼] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 수리형 발판 (Fixed Platforms)**\r
\r
- 멈춰 있는 톱니바퀴에 렌치를 던져 끼우거나 기름을 칠하면 회전 시작. 이를 이용해 더 높은 곳으로 도약.\r
- **시각**: Lily가 지나가는 길마다 작은 전구들이 노란빛으로 켜지며 따뜻한 분위기 조성.\r
\r
---\r
\r
### Zone 2: The Rhythmic Chimes (중층 타종실)\r
\r
**테마**: 리듬 타이밍, 소리 파동  \r
**페이싱**: Medium Tension (리듬 집중)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[체인 리프트] \r
     ↓\r
[거대 종 "The Big Bell"] ← POI #3: 충격파 회피\r
    ↙    ↓    ↘\r
[진자 구덩이] [리듬 발판 구간] [추의 방]\r
 (POI #1)      (똑딱 소리 싱크) (타이밍)\r
     ↓\r
[시계판 뒷면 입구] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 리듬 플랫폼 (Tick-Tock Platforms)**\r
\r
- **기믹**: 배경음악의 '똑' 소리에 나타나고 '딱' 소리에 사라지는 발판들.\r
- **진자 구덩이 (POI #1)**: 일정한 주기로 왕복하는 거대 추들을 슬라이딩으로 통과하는 긴장감 있는 구간.\r
\r
---\r
\r
### Zone 3: The Mechanical Heart (최상층 심장부)\r
\r
**테마**: 아찔한 높이, 감성적 피날레  \r
**페이싱**: High Tension (Precision Challenge)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Heart of the City      │\r
└─────────────────────────────────────────────┘\r
\r
               [ 메인 태엽 (심장) ] \r
               (POI: 수리 완료 지점)\r
                    ❤\r
          ┌─────────┴─────────┐\r
          │     [시계 바늘 플랫폼] │ ← POI #2: 시간의 얼굴\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [외부 난간]     [내부 톱니 미로]\r
          (바람/활강)    (정밀 점프)\r
               ↑           ↑\r
               [시계 전면부]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 시계 바늘 도약 (POI #2)**\r
\r
- **연출**: 거대한 분침 위에 올라타서 밖을 보면 노을진 도시 전경이 펼쳐짐.\r
- **기믹**: 바늘이 수직이 되는 찰나에 글라이더(우산)를 펼쳐 반대편 태엽실로 활강 침투.\r
\r
**2. 심폐 소생 (Jumpstart)**\r
\r
- 부서진 로봇 친구의 코어에 렌치를 꽂고 힘차게 돌리는 QTE 수행. 시계탑 전체가 황금빛으로 빛나며 다시 가동되는 감동적인 엔딩.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **낙사 방지** | Coyote Time 적용 (낙하 직전 점프 허용) |\r
| **POI 수** | 4개 (진자 구덩이, 시간의 얼굴, 거대 종, 피스톤 숲) |\r
| **수집 요소** | 친구의 부품 (메모리 칩, 구리 나사, 동력 코어) |\r
| **난이도 곡선** | Calm → Rhythmic → Heart-pounding |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S36 상세 설계 완료\r
2. 🔄 S37_First_Contact 맵 설계 진행 예정 (외계 정글 탐사)\r
`,LS=`# S37: First Contact - Top-down Map 상세 설계\r
\r
> **"우주에서 가장 무서운 것은 침묵이 아니라, 낯선 목소리다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S37: First Contact (첫 번째 조우)  \r
**장르**: SF 액션 어드벤처 / 탐사  \r
**주인공**: Commander Nova (우주군 장교)  \r
**환경**: Void Expanse - 외계 행성 'Xenon-4'의 정글  \r
**맵 스타일**: 무중력 점프와 발광 식생의 탐험 (착륙 지점 → 발광 정글 → 금속 사원)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: Crash Site (착륙 및 베이스캠프)\r
\r
**테마**: 환경 적응, 기본 탐사  \r
**페이싱**: Low Tension (정적인 시작)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[추락한 정찰선]\r
     ↓\r
[지식의 제단 (임시 캠프)]\r
    ↙    ↓    ↘\r
[데이터 박스] [스캔 튜토리얼] [언어 상자]\r
 (보급품)      (식생 기록)    (번역기 조율)\r
     ↓\r
[정글 입구 절벽] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 저중력 점프 (Low-G)**\r
\r
- 행성의 중력이 지구의 0.6배. 한 번의 점프로 매우 높고 멀리 이동 가능.\r
- **기믹**: 제트팩을 짧게 끊어 사용하여 공중에서 방향 전환(Dodge) 학습.\r
\r
---\r
\r
### Zone 2: The Bioluminescent Wilds (발광 야생림)\r
\r
**테마**: 반응형 환경, 포식자 회피  \r
**페이싱**: Medium Tension (긴장된 탐험)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[발광 버섯 군락] \r
     ↓\r
[부유석 지대] ← POI #1: 자기장 플랫폼\r
    ↙    ↓    ↘\r
[발광 동굴] [스토커 서식지] [자기장 계곡]\r
 (POI #3)    (전투/은신)    (제트팩 챌린지)\r
     ↓\r
[외계 사원 광장 입구] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 반응형 식물 (Responsive Flora)**\r
\r
- **기믹**: 플레이어가 다가가면 밝게 빛나며 길을 밝히거나, 공격을 받으면 가스를 내뿜는 육각형 식물들.\r
- **발광 동굴 (POI #3)**: 빛이 없는 사각지대에 숨어 체온을 감지하는 포식자(스토커)를 유인 처치.\r
\r
---\r
\r
### Zone 3: The Monolith Plaza (모노리스 광장)\r
\r
**테마**: 첫 조우, 도덕적 선택 분기  \r
**페이싱**: High Tension (Dynamic Climax)  \r
**플레이 타임**: 약 7분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Ancient Temple         │\r
└─────────────────────────────────────────────┘\r
\r
               [ 사원 내부 입구 ] \r
               (외교/전투 결과)\r
                    ✨\r
          ┌─────────┴─────────┐\r
          │     [감시자의 기둥] │ ← POI #4: 대치 상황 보루\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [모노리스 비석] [광장 제단]\r
          (POI #2: 환영) (첫 조우 컷신)\r
               ↑           ↑\r
               [정글 출구]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 모노리스 비전 (POI #2)**\r
\r
- **연출**: 비석을 터치하면 화면이 화이트아웃 되며, 이 행성이 왜 멸망했는지에 대한 웅장한 비전 공유.\r
- **첫 조우**: 외계인 "Krav" 종족이 등장. 번역기를 돌리는 동안 무기를 들고 "평화"를 증명할지, 공격을 퍼부어 "생존"할지 실시간 선택 시스템.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **중력 계수** | 0.6 G (체공 시간 증가) |\r
| **POI 수** | 4개 (부유석 지대, 모노리스, 발광 동굴, 감시자의 기둥) |\r
| **번역 해독률** | 0% → 100% (Act 3에서 완공) |\r
| **난이도 곡선** | Relaxing → Cautious → Tense Choices |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S37 상세 설계 완료\r
2. 🔄 S38_Battle_of_Nexus_Gate 맵 설계 진행 예정 (우주 정거장 전투)\r
`,DS=`# S38: Battle of Nexus Gate - Top-down Map 상세 설계\r
\r
> **"이 문이 뚫리면 지구는 끝이다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S38: Battle of Nexus Gate (넥서스 게이트 전투)  \r
**장르**: SF 밀리터리 슈터 / 함대공 방어  \r
**주인공**: Commander Nova (지휘관)  \r
**환경**: Void Expanse - 거대 우주 정거장 'Nexus Gate'  \r
**맵 스타일**: 실내 보병전과 무중력 외벽 전투의 조화 (지휘실 → 외벽 → 격납고)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: Command & Control (지휘 통제소)\r
\r
**테마**: 실내전, 방어선 구축  \r
**페이싱**: High Tension (CQB 교전)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[함교 브릿지]\r
     ↓\r
[의료 후송 데크] ← POI #4: 보급 및 이벤트\r
    ↙    ↓    ↘\r
[데이터 서버실] [중앙 복도] [파공 지점]\r
 (해킹 방어)    (엄폐 사격)  (POI #1: 감압 하저드)\r
     ↓\r
[외벽 에어락] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 감압 하저드 (POI #1)**\r
\r
- 적군이 몰려올 때 창문에 설치된 비상 폭약을 터뜨려 강제 감압 유도. 적 보병들을 우주 밖으로 빨려 나가게 하는 전술적 플레이 권장.\r
\r
---\r
\r
### Zone 2: The Void Walk (무중력 외벽)\r
\r
**테마**: 360도 전투, 사운드 디자인의 변화  \r
**페이싱**: Medium to High (3차원 기동)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[외벽 난간 (자석 신발)] \r
     ↓\r
[중력 발생기실] ← POI #3: 주기적 무중력\r
    ↙    ↓    ↘\r
[태양광 패널] [통신 안테나] [적 강습선 하부]\r
 (엄폐물)      (수리 목표)   (폭발물 부착)\r
     ↓\r
[격납고 상부 해치] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 사운드 댐핑 (Muffled Audio)**\r
\r
- **기믹**: 우주로 나가는 순간 폭발음과 총성이 먹먹하게 들리며, 오직 캐릭터의 거친 숨소리와 무전 소리만 선명하게 들림.\r
- **마그네틱 부츠**: 버튼 하나로 벽에 붙거나 뗄 수 있음. 공중에서 적의 강습선을 저격하는 부유 액션 강조.\r
\r
---\r
\r
### Zone 3: Hangar Defense (격납고 최후의 보루)\r
\r
**테마**: 함선 사수, 거대 보스 로봇  \r
**페이싱**: Climax (Big Battle)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: Main Hangar Bay            │\r
└─────────────────────────────────────────────┘\r
\r
               [ 아군 기함 에이비스 ] \r
               (이륙 엄호 목표)\r
                    🚀\r
          ┌─────────┴─────────┐\r
          │     [대공포 플랫폼] │ ← POI #2: 강습선 요격\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [좌측 탄약고]   [우측 정비창]\r
          (폭발 주의)    (보스: 거대 메크)\r
               ↑           ↑\r
               [격납고 대문]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 대공포 직접 조작 (POI #2)**\r
\r
- **미니게임**: 정거장 외부의 적 구축艦들을 마그네틱 대공포로 명중시켜 기함 이륙을 위한 클리어 확보.\r
- **최종 보스**: 격납고 문을 부수고 들어온 외계 거대 메크. 약점인 등 뒤의 냉각 핀을 무중력 점프로 타고 올라가 무력화.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **전투 환경** | 표준 중력(실내), 무중력(실외), 가변 중력(발전기실) |\r
| **POI 수** | 4개 (파공 지점, 대공포, 중력 발생기실, 의료 데크) |\r
| **배경 함대전** | 100척 이상의 함선 라이브 렌더링 |\r
| **난이도 곡선** | Intensive → Vertical → Epic Scale |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S38 상세 설계 완료\r
2. 🔄 S39_The_Ancient_Ruins 맵 설계 진행 예정 (생체 기계 유적 호러)\r
`,ZS=`# S39: The Ancient Ruins - Top-down Map 상세 설계\r
\r
> **"그들은 우리가 오기 훨씬 전부터 여기에 있었다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S39: The Ancient Ruins (고대 유적)  \r
**장르**: 고고학적 SF 호러 / 퍼즐  \r
**주인공**: Kael (외계인 고고학자)  \r
**환경**: Void Expanse - 사막 행성 지하 'The Necropolis'  \r
**맵 스타일**: 생체 기계(Gigeresque)를 테마로 한 기괴하고 웅장한 아치형 구조 (입구 → 실험실 → 별의 지도실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Giant's Gallery (거인의 회랑)\r
\r
**테마**: 압도적인 스케일, 경외감  \r
**페이싱**: Low Tension (정적이고 음산한 수사)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[모래 폭풍 입구]\r
     ↓\r
[속삭임의 회랑] ← POI #3: 사운드 퍼즐\r
    ↙    ↓    ↘\r
[머리 없는 석상] [염동력의 광장] [고대 문자 벽]\r
 (랜드마크)      (무게 이동 퍼즐) (힌트 습득)\r
     ↓\r
[갈비뼈 모양의 대문] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 스케일 연출**\r
\r
- 주인공의 크기보다 20배 높은 갈비뼈 모양의 아치 통로. 손전등이 닿지 않는 높은 천장에서 부스럭거리는 소리 유도.\r
- **염동력 (Telekinesis)**: 거대 석상을 움직여 광선을 반사시키는 빛의 퍼즐 수행.\r
\r
---\r
\r
### Zone 2: The Bio-Lab Maze (생체 실험실 미로)\r
\r
**테마**: 생체 공포, 크리처 조우  \r
**페이싱**: Medium to High (은신과 도주)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[배양 캡슐 복도] \r
     ↓\r
[검은 액체 웅덩이] ← POI #2: 하저드 및 부활\r
    ↙    ↓    ↘\r
[깨진 캡슐 방] [생체 신경 다발] [중앙 실험대]\r
 (수호자 조우)  (전력 공급)     (유물 획득)\r
     ↓\r
[엘리베이터: 별의 나선] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 수호자(Sentinel) 잠입**\r
\r
- 눈이 퇴화하고 촉각과 청각만 남은 가느다란 팔다리의 수호자들을 피해 은밀히 이동.\r
- **액체 웅덩이 (POI #2)**: 이곳에서 적을 처치하면 적의 사체가 다시 기어 나오므로, 화염탄으로 소각해야 함.\r
\r
---\r
\r
### Zone 3: The Map of Eternity (영겁의 지도실)\r
\r
**테마**: 우주적 비밀, 자폭 탈출  \r
**페이싱**: Revelation to Chase (Final Rush)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Star Atlas Hall        │\r
└─────────────────────────────────────────────┘\r
\r
               [ 탈출 셔틀 입구 ] \r
               (무너지는 유적 탈출)\r
                    🏃\r
          ┌─────────┴─────────┐\r
          │     [엔지니어의 자리] │ ← POI #1: 과거의 비전\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [홀로그램 별자리] [선구자의 보관실]\r
          (POI #4: 퍼즐) (최종 유물 조합)\r
               ↑           ↑\r
               [전율의 계단]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 엔지니어의 비전 (POI #1)**\r
\r
- **연출**: 화석화된 거인에게 신경을 연결하면 공간 전체가 투명해지며 우주 공간으로 변하는 '플라네타륨' 연출.\r
- **결말**: "그들이 온다(They are Coming)"는 경고와 함께 고대 별자리를 맞추면 자폭 시퀀스 발동.\r
\r
**2. 무너지는 발판 탈출**\r
\r
- 천장의 검은 구체가 떨어지며 유적이 무너질 때, 염동력으로 무너진 기둥을 세워 발판을 만들며 7분 내에 탈출.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **아트 스타일** | Bio-mechanical, Gigeresque |\r
| **POI 수** | 4개 (엔지니어의 자리, 검은 액체, 속삭임의 회랑, 선구자 보관실) |\r
| **핵심 기믹** | 텔레키네시스, 고대 홀로그램 분석 |\r
| **난이도 곡선** | Eerie → Panic → Cinematic Revelation |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S39 상세 설계 완료\r
2. 🔄 S40_Peaceful_Envoy 맵 설계 진행 예정 (비폭력 외교 협상)\r
`,FS=`# S40: Peaceful Envoy - Top-down Map 상세 설계\r
\r
> **"무기는 두려움의 증거일 뿐이다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S40: Peaceful Envoy (평화의 사절)  \r
**장르**: 외교 시뮬레이션 / 비폭력 어드벤처  \r
**주인공**: Kael (외교관)  \r
**환경**: Void Expanse - 외계 종족 'Krav'의 기함 내부  \r
**맵 스타일**: 대칭적 대립 구도와 심리적 압박이 강조된 외계 모선 (에너지 감옥 → 연회장 → 알현실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Caged Envoy (구금된 대기실)\r
\r
**테마**: 관찰, 언어 장벽 극복  \r
**페이싱**: Medium Tension (불안한 침묵)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[격납고 하선]\r
     ↓\r
[에너지 감옥] ← POI: 간수의 도발\r
    ↙    ↓    ↘\r
[취조 데크] [홀로그램 관찰실] [비밀 통신함]\r
 (심리전)    (문화 스캔)      (지구 연락)\r
     ↓\r
[전리품의 복도] → (POI #1: 공포 연출)\r
     ↓\r
[연회장 정문] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 비폭력 상호작용**\r
\r
- 외계 간수가 총으로 위협할 때 회피하지 않고 눈을 맞추어 (카메라 주시) "두려워하지 않음"을 증명하여 신뢰도 획득.\r
- **문화 스캔**: 그들의 언어 패턴을 스캔하여 번역기 데이터 충전.\r
\r
---\r
\r
### Zone 2: The Hall of Honor (전사들의 연회장)\r
\r
**테마**: 문화적 시험, 긴장된 화합  \r
**페이싱**: High Tension (사회적 서바이벌)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[연회 테이블] ← POI: 독주 마시기 (QTE)\r
     ↓\r
[중앙 전쟁 북] (랜드마크)\r
    ↙    ↓    ↘\r
[관측 데크] [무예 대련장] [선물 증정 테이블]\r
 (POI #3)    (지능적 개입) (지구 유물 전시)\r
     ↓\r
[알현실 "금기된 관문"] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 명예의 시험 (The Trial)**\r
\r
- **기믹**: 그들의 전투적인 춤이나 술자리를 QTE(Quick Time Event)로 성공시켜 전사들의 인정을 받음.\r
- **갈등 관리**: 시비 거는 외계인 전사를 무력이 아닌 '조롱 무시'나 '논리적 압박'으로 망신 주어 상황 정리.\r
\r
---\r
\r
### Zone 3: The Verdict Hall (최종 알현실)\r
\r
**테마**: 운명의 선택, 심판  \r
**페이싱**: Maximum Tension (Psychological Battle)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Great Overlord Throne  │\r
└─────────────────────────────────────────────┘\r
\r
               [ 평화 협정 비석 ] \r
               (성공 시 연출)\r
                    🕊\r
          ┌─────────┴─────────┐\r
          │     [전쟁 지휘 탁자] │ ← POI #2: 데이터 설득\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [전쟁광 2인자]   [대족장 옥좌]\r
          (반박 논파)     (최종 담판)\r
               ↑           ↑\r
               [심판의 길]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 데이터 설득 퍼즐 (POI #2)**\r
\r
- **기믹**: 지구 침공 루트 홀로그램 위에 지구의 자원 데이터와 문화 유산 데이터를 덮어씌워 "정복보다 교역이 이득임"을 수치로 증명.\r
- **대족장과의 독대 (POI #3)**: 관측 데크에서 단둘이 우주를 보며, 죽어가는 그들의 종족에 대한 연민을 표현하여 감정적 연결 성공.\r
\r
**2. 도덕적 딜레마 (POI #4)**\r
\r
- 알현실 아래 '신성한 부화장'을 발견. 이곳을 인질로 잡으면 확정 탈출이 가능하지만 평화는 영영 사라짐. 지성인으로서의 신념 선택.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **대화 분기** | 20개 이상 (멀티 엔딩) |\r
| **POI 수** | 4개 (전리품 복도, 전쟁 탁자, 관측 데크, 신성 부화장) |\r
| **전투 발생** | 0건 (성공적인 외교 기준) |\r
| **난이도 곡선** | Scary → Challenging → Heart-stopping Truth |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S40 상세 설계 완료\r
2. ✅ Batch 5 (S31-S40) 전체 완료\r
3. 🔄 Batch 6 (S41-S48) 마지막 배치 작업 준비 예정 (코즈믹 호러 및 대단원)\r
4. 🔄 task.md 업데이트\r
`,$S=`# S41: Cosmic Horror - Top-down Map 상세 설계\r
\r
> **"우주에서는 아무도 당신의 비명 소리를 들을 수 없다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S41: Cosmic Horror (코스믹 호러)  \r
**장르**: SF 생존 호러  \r
**주인공**: Zara (엔지니어)  \r
**환경**: Void Expanse - 유령선이 된 채굴선 'Ishimura-2'  \r
**맵 스타일**: 좁고 녹슨 복도와 피비린내 나는 의료 구역을 지나는 폐쇄 공포 레벨 (도킹 베이 → 의료실 → 엔진실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: Silent Arrival (침묵의 도킹 베이)\r
\r
**테마**: 불안감 조성, 기본 생존 학습  \r
**페이싱**: Low to Medium (긴장된 시작)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[셔틀 도킹 구역]\r
     ↓\r
[로비 및 라운지] ← POI: '눈을 감아라' 낙서\r
    ↙    ↓    ↘\r
[정비 창고] [전력 제어실] [보안 안내소]\r
 (컷기 획득)  (전력 퍼즐)   (지도 습득)\r
     ↓\r
[의료 구역 통로] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 조명과 사운드 (Atmosphere)**\r
\r
- **기믹**: 조명이 주기적으로 깜빡이며, 손전등이 비추는 좁은 원뿔형 시야 밖에서는 적의 기괴한 소리만 들림.\r
- **플라즈마 절단기**: 적의 팔다리를 정확히 조준하여 절단해야 생존 가능한 '전략적 절단' 튜토리얼.\r
\r
---\r
\r
### Zone 2: The Hall of Madness (광기의 의료실)\r
\r
**테마**: 고어 연출, 무중력 전투  \r
**페이싱**: High Tension (본격적인 생존)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[수술 대기실] \r
     ↓\r
[무중력 치료실] ← POI #1: 3D 전방위 전투\r
    ↙    ↓    ↘\r
[냉동 시체 보관소] [생체 공학실] [화학 약품 창고]\r
 (재생자 등장)     (POI #4)      (스테이시스 획득)\r
     ↓\r
[중앙 전차 리프트] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 무중력 치료실 (POI #1)**\r
\r
- **기믹**: 바닥이 없는 공간. 부츠를 켜고 벽을 타거나 점프하여 이동.\r
- **환경 무기**: 공중에 떠다니는 가스통이나 날카로운 칼날 조각을 염동력(Kinesis)으로 잡아 적에게 발사.\r
\r
---\r
\r
### Zone 3: The End of Reality (현실의 끝, 엔진실)\r
\r
**테마**: 차원 왜곡, 필사의 탈출  \r
**페이싱**: Very High Tension (Final Chase)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Corrupted Core         │\r
└─────────────────────────────────────────────┘\r
\r
               [ 탈출 셔틀 발사대 ] \r
               (최종 탈출)\r
                    🚀\r
          ┌─────────┴─────────┐\r
          │     [자폭 제어실]   │ ← POI #2: 마커의 유혹\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [수직 채굴 갱도] [차원 균열 복도]\r
          (POI #3: 추격) (공간 루프 왜곡)\r
               ↑           ↑\r
               [엔진 중심부]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 재생자(Regenerator) 추격전**\r
\r
- **기믹**: 죽지 않고 신체를 재생하는 적을 스테이시스로 느리게 만들고, 다리를 잘라 시간을 벌며 갱도를 질주 탈출.\r
- **마커의 광기 (POI #2)**: 엔진실 중앙의 비석 근처에 가면 화면에 노이즈와 환각이 발생하며 조작 반전 트랩 발생.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **적 타입** | 슬래셔, 루커, 리제네레이터 (네크로모프 류) |\r
| **POI 수** | 4개 (무중력실, 마커, 채굴 갱도, 생체 공학실) |\r
| **핵심 기믹** | 사지 절단, 스테이시스(정지), 키네시스(염동) |\r
| **난이도 곡선** | Eerie → Intense → Desperate Chase |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S41 상세 설계 완료\r
2. 🔄 S42_Warp_Drive_Malfunction 맵 설계 진행 예정 (공간 왜곡 퍼즐)\r
`,zS=`# S42: Warp Drive Malfunction - Top-down Map 상세 설계\r
\r
> **"여기가 바닥인가? 아니면 천장인가?"**\r
\r
## 설계 개요\r
\r
**시나리오**: S42: Warp Drive Malfunction (워프 드라이브 오작동)  \r
**장르**: 1인칭 퍼즐 어드벤처  \r
**주인공**: Zara (물리학자)  \r
**환경**: Void Expanse - 최첨단 과학선 'Horizon'  \r
**맵 스타일**: 비유클리드 기하학(Non-Euclidean)과 원근 왜곡이 결합된 실험적 공간 (테스트 챔버 → 뒤틀린 정원 → 워프 코어)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: Cognitive Testing (인지 테스트 챔버)\r
\r
**테마**: 포탈 조작, 가속도 학습  \r
**페이싱**: Low Tension (두뇌 회전)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[실험실 기상 구역]\r
     ↓\r
[포탈 건 획득소] \r
    ↙    ↓    ↘\r
[가속도 테스트장] [반사 큐브 룸] [관찰 구역]\r
 (낙하 무한 루프) (레이저 퍼즐)  (조각난 거울실)\r
     ↓\r
[뒤틀린 평면 통로] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 조각난 거울실 (POI #4)**\r
\r
- **기믹**: 거울 속에만 존재하는 발판을 이용해 실제 방의 함정을 건너기. 거울 속 주인공의 위치와 실제 위치가 대칭되는 것을 이용한 지능형 이동.\r
\r
---\r
\r
### Zone 2: Impossible Geometries (불가능한 기하학)\r
\r
**테마**: 원근법 왜곡, 중력 반전  \r
**페이싱**: Medium Tension (공간 지각)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[반복의 복도 (POI #1)] \r
     ↓\r
[뒤집힌 정원] ← POI #3: 위로 솟는 폭포\r
    ↙    ↓    ↘\r
[작아지는 방] [거대화 큐브 존] [펜로즈 복도]\r
 (원근법 활용)   (다리 만들기)  (무한 계단)\r
     ↓\r
[코어 진입 보안 게이트] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 원근법 조작 (Perspective manipulation)**\r
\r
- **기믹**: 멀리 있는 작은 열쇠를 집어서 눈앞으로 가져오면 실제 크기가 커짐. 이를 이용해 작은 장난감 큐브를 집어 거대한 발판으로 만드는 플레이.\r
- **반복의 복도 (POI #1)**: 뒤로 돌아 뒷걸음질 쳐야만 거리값이 갱신되는 '인식 파괴' 퍼즐 구간.\r
\r
---\r
\r
### Zone 3: Convergence of Singularities (특이점 수렴)\r
\r
**테마**: 시간 제한, 블랙홀 붕괴  \r
**페이싱**: High Tension (Final Puzzle Action)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Event Horizon          │\r
└─────────────────────────────────────────────┘\r
\r
               [ 월드 엔드 포털 ] \r
               (달을 향해 열리는 탈출구)\r
                    🌘\r
          ┌─────────┴─────────┐\r
          │     [중력 우물실]   │ ← POI #2: 입체 플랫포밍\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [회전하는 링]   [워프 코어 본체]\r
          (냉각수 포탈)   (AI 방어봇 교전)\r
               ↑           ↑\r
               [붕괴하는 함교]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 중력 우물 (POI #2)**\r
\r
- **기믹**: 사물마다 중력이 제각각인 구역. 떠다니는 의자에 포탈을 쏘고 이동하면 시점이 180도 뒤집힘. 코어 주변의 링들에 냉각수를 정확히 투입해야 함.\r
\r
**2. 특이점 대탈출**\r
\r
- 함선이 블랙홀로 빨려 들어가 맵의 뒤쪽부터 픽셀 단위로 분해될 때, 최후의 포탈을 저 멀리 보이는 '달' 표면에 쏘아 극적으로 전이하며 엔딩.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **핵심 도구** | 워프 포탈건 (입구/출구 연결) |\r
| **POI 수** | 4개 (반복 복도, 중력 우물, 뒤집힌 정원, 거울 실험실) |\r
| **물리 법칙** | 가속도 보존, 원근 비례, 비유클리드 공간 |\r
| **난이도 곡선** | Logical → Surreal → Mind-bending Panic |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S42 상세 설계 완료\r
2. 🔄 S43_Nexus_Awakening 맵 설계 진행 예정 (뉴욕 도심 초능력)\r
`,BS=`# S43: Nexus Awakening - Top-down Map 상세 설계\r
\r
> **"차원의 벽이 얇아지고 있다. 그들이 깨어난다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S43: Nexus Awakening (넥서스 각성)  \r
**장르**: 초능력 액션 / 기원 스토리  \r
**주인공**: Alex Mercer (평범한 대학생)  \r
**환경**: Prime Earth - 뉴욕풍 대도시 'Metro City'  \r
**맵 스타일**: 일상적인 공간이 초능력의 전장으로 변하는 어반 액션 (캠퍼스 → 도심 추격 → 폐건물)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Campus Awakening (캠퍼스 각성)\r
\r
**테마**: 평화의 파괴, 능력 자각  \r
**페이싱**: Low to Rising (혼란스러운 시작)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[강의실 (시작)]\r
     ↓\r
[과학관 옥상] ← POI #1: 첫 폭주 지점\r
    ↙    ↓    ↘\r
[안뜰 정원] [도서관 계단] [학생 회관]\r
 (염동력 학습) (파쿠르 이동) (요원 조우)\r
     ↓\r
[캠퍼스 정문 가드레일] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 수직적 이동 (Verticality)**\r
\r
- 처음엔 계단을 이용하지만, 능력이 개방되면서 배수관을 타고 오르거나 2층 창문으로 직접 도약.\r
- **시각**: 주인공의 손에서 뿜어져 나오는 네온 사이언 색상의 에너지 파동이 주변 사물(의자, 자전거)을 띄움.\r
\r
---\r
\r
### Zone 2: Concrete Jungle Hunter (도심 추격전)\r
\r
**테마**: 시민들 사이의 도주, 환경 상호작용  \r
**페이싱**: High Tension (긴박한 추격)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[메트로 시티 기념 분수] ← POI #4: 광역 전투\r
     ↓\r
[지하철역 광장] \r
    ↙    ↓    ↘\r
[지하철 터널] [메인 거리] [뉴욕식 골목길]\r
 (POI #2: 추격) (차량 밀치기) (은신 이동)\r
     ↓\r
[지하 하수도 허브] → (POI #3)\r
     ↓\r
[폐건물 쓰레기 처리장] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 지하철 전동차 정지 (POI #2)**\r
\r
- **연출**: 주인공을 들이받으려는 전동차를 염동력으로 멈춰 세워 거대한 강철 방벽으로 만듦.\r
- **군중 시스템**: 당황하는 시민들 사이로 숨어 정부 요원(검은 정장)의 시야를 따돌리는 '소셜 블렌딩' 기믹.\r
\r
---\r
\r
### Zone 3: The Sanctuary (각성자들의 은신처)\r
\r
**테마**: 첫 승리, 성장의 서막  \r
**페이싱**: Medium Tension (발견 및 전투)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Abandoned Warehouse    │\r
└─────────────────────────────────────────────┘\r
\r
               [ 옥상 탈출 헬기 ] \r
               (첫 보스전: 요원 지휘관)\r
                    🤛\r
          ┌─────────┴─────────┐\r
          │     [각성자 캠프]   │ ← 내러티브 NPC 조우\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [복층 화물칸]   [사무실 섹션]\r
          (전술 전투)    (능력 강화 아이템)\r
               ↑           ↑\r
               [1층 입구 셔터]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 시간 늦추기 (Bullet Time)**\r
\r
- **기믹**: 요원들의 일제 사격을 시간이 멈춘 듯 느리게 만들고, 그 총알들을 염동력으로 잡아 역으로 날려보내는 강력한 전투 카타르시스.\r
- **피날레**: 무너지는 창고 옥상에서 첫 번째 각성자 멘토를 만나 '넥서스 타워'의 존재를 알게 되며 끝남.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **핵심 능력** | 염동력(Telekinesis), 시간 감속, 파쿠르 |\r
| **POI 수** | 4개 (과학관 옥상, 지하철 추격, 하수도 허브, 기념 분수) |\r
| **적 세력** | 차원 보안국(DSA) 요원, 무인 전술 드론 |\r
| **난이도 곡선** | Confused → Hectic Chase → Asserting Power |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S43 상세 설계 완료\r
2. 🔄 S44_The_Hunt 맵 설계 진행 예정 (야간 항구 잠입)\r
`,HS=`# S44: The Hunt - Top-down Map 상세 설계\r
\r
> **"사냥꾼이 사냥감이 되는 순간."**\r
\r
## 설계 개요\r
\r
**시나리오**: S44: The Hunt (추적)  \r
**장르**: 잠입 액션 / 역추적  \r
**주인공**: Jack Hunter (전직 특수요원)  \r
**환경**: Prime Earth - 야간의 산업 지구 및 항구  \r
**맵 스타일**: 그림자와 고저차를 활용한 전술적 잠입 (불타는 안전 가옥 → 컨테이너 야드 → 버려진 등대)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Burning Trap (절체절명의 탈출)\r
\r
**테마**: 긴박한 오프닝, 탈출 퍼즐  \r
**페이싱**: Very High Tension (즉각적 대응)  \r
**플레이 타임**: 약 7분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[폭발한 침실]\r
     ↓\r
[불타는 안전 가옥] ← POI #1: 3분 탈출 챌린지\r
    ↙    ↓    ↘\r
[무너진 부엌] [연기 가득한 거실] [숨겨진 무기고]\r
 (방수포 획득)  (산소 확보)      (권총 입수)\r
     ↓\r
[3층 창문 유리창 (도약)] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 불길 해저드 (Fire & Smoke)**\r
\r
- 연기가 가득한 곳에서는 시야가 흐려지고 체력이 소모됨. 낮은 자세로 이동하거나 젖은 수건을 이용해 돌파.\r
- **비주얼**: 폭발음과 함께 건물 밖에서 확성기로 "Jack Hunter, 즉시 투항하라"고 외치는 경찰+암살팀의 압박 연출.\r
\r
---\r
\r
### Zone 2: Iron Labyrinth (컨테이너 야드)\r
\r
**테마**: 수직 잠입, 환경 처치  \r
**페이싱**: Medium Tension (관찰과 처단)  \r
**플레이 타임**: 약 18분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[항구 담장 입구] \r
     ↓\r
[컨테이너 미로] ← POI #2: 환경 처치 구간\r
    ↙    ↓    ↘\r
[화물선 갑판] [관리동 옥상] [거대 부두 크레인]\r
 (POI #3)      (저격 방지)   (해킹 제어)\r
     ↓\r
[해안가 숲길] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 크레인 해킹 (Crane Control)**\r
\r
- **기믹**: 거대 크레인의 도르래를 조작하여 컨테이너를 매달아 적의 시야를 가리거나, 적의 머리 위로 떨어뜨리는 '사고' 위장 암살.\r
- **레이저 사이트 (POI #3)**: 화물선 갑판의 저격수들을 피해 상자 틈새로 포복 이동하는 긴장감 극대화 구간.\r
\r
---\r
\r
### Zone 3: The Traitor's Verdict (배신자의 종말)\r
\r
**테마**: 보스전, 내러티브 클라이맥스  \r
**페이싱**: High Tension (격렬한 추격과 대화)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Ghost Lighthouse       │\r
└─────────────────────────────────────────────┘\r
\r
               [ 탈출용 제트스키 ] \r
               (미션 완료 후 탈출)\r
                    🚤\r
          ┌─────────┴─────────┐\r
          │     [등대 꼭대기]   │ ← POI #4: 배신자와의 담판\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [나선형 계단]   [등대 기지부]\r
          (접전/트랩)    (보안 드론 교전)\r
               ↑           ↑\r
               [절벽 산책로]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 등대 담판 (POI #4)**\r
\r
- **연출**: 폭풍우 치는 밤, 번개가 칠 때만 서로의 얼굴이 보이는 강렬한 연출.\r
- **기믹**: 배신자를 코너로 몰아넣고 대화 선택지를 통해 '왜 그랬는지' 진실을 캐묻거나, 등대 회전 렌즈에 적을 밀어 넣어 처리하는 환경 피니셔.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **시간대/날씨** | 자정 / 폭풍우 (발소리가 빗소리에 묻힘) |\r
| **POI 수** | 4개 (안전 가옥, 컨테이너 미로, 화물선 갑판, 버려진 등대) |\r
| **적 타입** | 전문 암살팀 (야간 투시경 착용), 보안용 K9 세퍼드 |\r
| **난이도 곡선** | Panic → Methodical Stealth → Dramatic Climax |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S44 상세 설계 완료\r
2. 🔄 S45_Corporate_Sabotage 맵 설계 진행 예정 (기업 본사 해킹)\r
`,WS=`# S45: Corporate Sabotage - Top-down Map 상세 설계\r
\r
> **"정보는 총알보다 강력하다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S45: Corporate Sabotage (기업 사보타주)  \r
**장르**: 해킹 & 잠입  \r
**주인공**: Jack Hunter (침투 전문가)  \r
**환경**: Prime Earth - 초고층 기업 본사 'Titan Tower'  \r
**맵 스타일**: 유리와 강철로 정렬된 질서 자욱한 오피스 레이어 (로비 → 공중 정원 → 최상층 서버실)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Glass Vestibule (유리 로비와 침투)\r
\r
**테마**: 위장, 신분 확보  \r
**페이싱**: Low Tension (정적인 진입)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[타워 정문 / 화물 입구]\r
     ↓\r
[중앙 리셉션 홀] \r
    ↙    ↓    ↘\r
[보안 검색대] [배달원 휴게실] [유지보수 통로]\r
 (위조 ID)      (변장 도구)    (환풍구 진입)\r
     ↓\r
[고속 리프트 전용 로비] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 소셜 엔지니어링 (Social Engineering)**\r
\r
- **기믹**: 청소부나 IT 정비공으로 변장하여 경비원의 의심을 피함. 특정 사원에게 말을 걸어 주의를 돌리는 행동 등.\r
\r
---\r
\r
### Zone 2: The Vertical Forest (50층 공중 정원)\r
\r
**테마**: 환경 은신, 정보 수집  \r
**페이싱**: Medium Tension (탐색형 잠입)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[50층 스카이 덱 입구] \r
     ↓\r
[공중 정원 (POI #3)] ← 인공 연못과 숲\r
    ↙    ↓    ↘\r
[비밀 금고 (POI #1)] [연구 개발실] [회장 사파이어실]\r
 (물리 증거 확보)    (생체 실험 데이터) (도청기 설치)\r
     ↓\r
[중앙 코어 데이터실] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 환경적 상호작용 (POI #3)**\r
\r
- **기믹**: 정원의 스프링클러를 해킹하여 적들의 시야를 가리거나, 연못의 물을 이용해 전기 자극으로 근처 적을 비살상 제압.\r
- **실험실 스위치**: 버튼 하나로 생체 샘플들이 가득한 캡슐 뒤에 숨거나, 내부 압력을 조절해 소음을 유발.\r
\r
---\r
\r
### Zone 3: The Digital Heart (최상층 서버 랙)\r
\r
**테마**: 데이터 전송, 바리케이드 방어  \r
**페이싱**: High Tension (Timed Defense)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Singularity Server     │\r
└─────────────────────────────────────────────┘\r
\r
               [ 옥상 헬기 이륙장 ] \r
               (최종 탈출)\r
                    🚁\r
          ┌─────────┴─────────┐\r
          │     [서버 팜 중심]   │ ← POI #2: 업로드 방어전\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [냉각 가스 밸브] [보안 통제 센터]\r
          (적 지연)      (드론 재해킹)\r
               ↑           ↑\r
               [회장 집무실] (POI #4)\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 서버 팜 업로드 (POI #2)**\r
\r
- **연출**: 데이터가 전송되는 동안 실시간으로 보안 팀이 문을 부수려 시도함.\r
- **기믹**: 보안 카메라를 조작해 적들의 위치를 파악하고, 원격으로 연막을 터뜨리거나 문을 잠가 시간을 벌어야 함.\r
\r
**2. 회장실의 진실 (POI #4)**\r
\r
- **연출**: 화려한 대리석 방 안의 통창 너머로 보이는 도시 야경. 회장의 책상 뒤에 숨겨진 비밀 스위치를 눌러 인체 실험의 잔혹한 증거 사진들을 실시간 전 세계로 송출.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 35분 |\r
| **보안 레벨** | Low(로비) → High(연구실) → Extreme(서버실) |\r
| **POI 수** | 4개 (비밀 금고, 서버 팜, 공중 정원, 회장실) |\r
| **핵심 기구** | 스마트폰 해킹 툴, 음성 변조기, 비살상 테이저 |\r
| **난이도 곡선** | Calm → Methodical → Hectic Defense |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S45 상세 설계 완료\r
2. 🔄 S46_Guardian_Angel 맵 설계 진행 예정 (해커의 호송 지원)\r
`,GS=`# S46: Guardian Angel - Top-down Map 상세 설계\r
\r
> **"누군가는 지켜야 한다. 법이 닿지 않는 곳에서."**\r
\r
## 설계 개요\r
\r
**시나리오**: S46: Guardian Angel (수호천사)  \r
**장르**: 비질란테 액션 / 은밀한 보호  \r
**주인공**: Maya Cross (의협심 강한 해커)  \r
**환경**: Prime Earth - 밤의 도심 빈민가  \r
**맵 스타일**: 간접적인 시야 확보와 환경 조작을 통한 호위 (주차장 → 뒷골목 미로 → 경찰서 광장)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Dark Parking (지하 주차장 구출)\r
\r
**테마**: 원격 조작 입문, 시야 확보  \r
**페이싱**: Medium Tension (전술적 안내)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[이동 지휘소 밴 (POI #1)]\r
     ↓\r
[지하 2층 주차 구역 (목격자)] \r
    ↙    ↓    ↘\r
[차량 경보 장치] [전원 스위치] [CCTV 허브]\r
 (적 유인)      (불 끄기)     (시야 확보)\r
     ↓\r
[주차 출구 경사로] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 이동 지휘소 (POI #1)**\r
\r
- **기믹**: 플레이어는 밴 내부에서 모니터를 보며 플레이. 정기적으로 적의 추적 전파가 오면 '노이즈 마스크' 스킬을 사용하여 위치 은폐.\r
- **간접 명령**: 목격자에게 "이동", "정지", "숨기" 명령을 하달.\r
\r
---\r
\r
### Zone 2: The Neon Maze (네온 뒷골목 미로)\r
\r
**테마**: 다층적 환경 조작, 드론 정찰  \r
**페이싱**: High Tension (실시간 위기 대응)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[중국 식당가 입구] \r
     ↓\r
[막다른 골목 (POI #2)] ← 탈출 경로 생성\r
    ↙    ↓    ↘\r
[버려진 지하철역] [배전반 박스] [자동 신호등]\r
 (POI #3: 전격 트랩) (폭발 유도)   (차량 막기)\r
     ↓\r
[경찰서 앞 지하 통로] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 드론 정찰 (Drone Scout)**\r
\r
- **기믹**: 공중에 소형 드론을 띄워 건물 너머의 적 배치를 확인. 적의 머리 위에서 통신 방해 패킷을 쏴서 목격자를 못 보게 함.\r
- **지하철역 트랩 (POI #3)**: 녹슨 선로에 적이 있을 때 고압 전류를 흘려 비살상으로 무력화시키는 짜릿한 환부 활용.\r
\r
---\r
\r
### Zone 3: The Gateway of Justice (정의의 관문)\r
\r
**테마**: 노출된 공간, 최후의 사투  \r
**페이싱**: Very High Tension (Final Sprint)  \r
**플레이 타임**: 약 5분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Police Plaza           │\r
└─────────────────────────────────────────────┘\r
\r
               [ 경찰서 정문 계단 ] \r
               (미션 성공: 목격자 보호)\r
                    🚪\r
          ┌─────────┴─────────┐\r
          │     [전광판 광장]   │ ← POI #4: 옥상 물탱크 엄호\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [폭발한 분수대] [지하철 입구]\r
          (연막 생성)    (아군 퇴로)\r
               ↑           ↑\r
               [산업 빌딩 옥상]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 비공개 엄호 (POI #4)**\r
\r
- **연출**: 옥상 물탱크 위에 드론을 고정시켜 광장을 전지적인 시점에서 내려다봄.\r
- **기믹**: 광장의 대형 스크린을 해킹하여 적들의 범죄 현장 영상을 전송. 당황한 갱단원들이 우왕좌왕할 때 목격자를 최단 거리로 달리게 함.\r
- **피날레**: 목격자가 경찰관들의 품에 안기는 순간, 주인공 Maya의 밴이 타이어 굉음을 내며 어둠 속으로 사라지는 쿨한 마무리.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **제어 스위치 수** | 50개 이상 (CCTV, 신호등, 도어록 등) |\r
| **POI 수** | 4개 (이동 지휘소, 막다른 골목, 지하철역, 옥상 물탱크) |\r
| **목격자 반응** | 두려움 수치에 따라 걸음걸이와 반응 속도 변화 |\r
| **난이도 곡선** | Brainy → Hectic → God-view Strategy |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S46 상세 설계 완료\r
2. 🔄 S47_Street_Justice 맵 설계 진행 예정 (정통 비트엠업 난투)\r
`,VS=`# S47: Street Justice - Top-down Map 상세 설계\r
\r
> **"법은 느리지만, 주먹은 빠르다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S47: Street Justice (길거리 정의)  \r
**장르**: 격투 액션 / 비트엠업  \r
**주인공**: Maya Cross (격투가)  \r
**환경**: Prime Earth - 도심 빈민가 거리  \r
**맵 스타일**: 좌에서 우로 진행하는 고전적인 벨트스크롤 액션 맵 (뒷골목 → 클럽 스테이지 → 공사 현장/옥상)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: The Rotten Alley (썩어가는 뒷골목)\r
\r
**테마**: 타격감 학습, 거리의 난전  \r
**페이싱**: Rising Action (워밍업)  \r
**플레이 타임**: 약 8분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[벽돌 골목 시작 (POI #1)]\r
     ↓\r
[지하 비밀 격투장 (POI #3)] \r
    ↙    ↓    ↘\r
[쓰레기 더미] [전화 부스] [상자 쌓인 곳]\r
 (터키 다리)  (잡기 활용)   (야구 방망이)\r
     ↓\r
[나이트클럽 뒷문] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 환경 파괴와 아이템 (POI #1)**\r
\r
- **기믹**: 쓰레기통이나 나무 상자를 부수면 체력을 회복하는 '터기 다리'나 사거리가 긴 '파이프' 등장.\r
- **비주얼**: 네온 보드가 깨지며 불꽃이 튀거나, 물 웅덩이에 적을 메치면 물이 튀는 역동적인 반응.\r
\r
---\r
\r
### Zone 2: Rhythm of the Night (나이트클럽 스테이지)\r
\r
**테마**: 음악 동기화, 수적 압박  \r
**페이싱**: High Tension (Flow State 전투)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[클럽 로비] \r
     ↓\r
[중앙 댄스 플로어 (POI #2)] ← 비트 싱크 보너스\r
    ↙    ↓    ↘\r
[VIP 라운지] [주방 및 바] [DJ 부스]\r
 (바운서 전투) (식칼/병)   (중보스 'DJ Venom')\r
     ↓\r
[비상 계단] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 댄스 플로어 비트 전투 (POI #2)**\r
\r
- **기믹**: 배경의 테크노 음악 비트에 맞춰 공격(약-약-강)을 성공하면 타격음이 강화되고 적이 멀리 날아가는 '피버(Fever)' 모드 진입.\r
- **중보스**: 현란한 레이저 조명과 스피커 폭발을 사용하는 DJ Venom의 원거리 패턴을 회피하며 접근.\r
\r
---\r
\r
### Zone 3: Sky-High Showdown (하늘 높은 결전)\r
\r
**테마**: 추락 위험, 보스 페이즈  \r
**페이싱**: Climax (Epic Final)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The High-Rise Rooftop      │\r
└─────────────────────────────────────────────┘\r
\r
               [ 옥상 밖으로 던지기 ] \r
               (최종 피니셔)\r
                    🏆\r
          ┌─────────┴─────────┐\r
          │     [옥상 헬기장]   │ ← 최종 보스: 빅 토니\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [공사 현장 (POI #4)] [기계실 옥탑]\r
          (비계 플랫포밍)     (증원군 차단)\r
               ↑           ↑\r
               [빌딩 외벽 비상구]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 건물 공사 현장 비계 (POI #4)**\r
\r
- **기믹**: 불안정한 위아래 발판. 적을 비계 밖으로 차면 한 번에 일망타진 가능하지만, 본인도 떨어질 수 있는 아찔한 구도.\r
- **최종 보스: Big Tony**: 거대한 체구의 레슬러 타입. 잡기 공격을 타이밍에 맞춰 반격(Parry)하고, 마지막 페이즈에서 옥상 끝에 몰아넣어 전력 질주 킥으로 엔딩 연출.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 30분 |\r
| **적 웨이브 수** | 총 15회 (보스전 포함) |\r
| **POI 수** | 4개 (벽돌 뒷골목, 댄스 플로어, 지하 격투장, 공사 현장) |\r
| **타격 연출** | 힛스톱(Hit Stop), 화면 진동(Shake), 임팩트 이펙트 |\r
| **난이도 곡선** | Easy Street → Flashy Club → Rooftops of Danger |\r
\r
---\r
\r
## 다음 단계\r
\r
1. ✅ S47 상세 설계 완료\r
2. 🔄 S48_Final_Convergence 맵 설계 진행 예정 (대단원, 모든 차원의 합창)\r
`,US=`# S48: Final Convergence - Top-down Map 상세 설계\r
\r
> **"모든 차원이 하나로 모이는 순간, 넥서스가 깨어난다."**\r
\r
## 설계 개요\r
\r
**시나리오**: S48: Final Convergence (최종 수렴)  \r
**장르**: 크로스오버 액션 / 최종장  \r
**주인공**: All Heroes (24명의 영웅 집결)  \r
**환경**: Prime Earth + All Dimensions - 융합된 현실  \r
**맵 스타일**: 프로젝트의 모든 장르와 테마가 충돌하고 융합되는 장대한 멀티버스 레벨 (융합 도시 → 기억의 회랑 → 넥서스 코어)\r
\r
---\r
\r
## Zone별 상세 레이아웃\r
\r
### Zone 1: Dimensions Collide (뒤틀린 메트로 시티)\r
\r
**테마**: 집결, 캐릭터 스왑 실습  \r
**페이싱**: High Tension (웅장한 시작)  \r
**플레이 타임**: 약 12분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[차원 수렴 광장 (POI #1)]\r
     ↓\r
[융합된 마천루 거리] \r
    ↙    ↓    ↘\r
[사이버 펑크 아파트] [판타지 성벽 입구] [영웅의 전당 (POI #4)]\r
 (Kira의 해킹)       (Aldric의 파괴)    (합동 무쌍 구간)\r
     ↓\r
[공중에 뜬 나선형 계단] → Zone 2\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 영웅 교체 (Hero Swap)**\r
\r
- **기믹**: 방향키 하나로 현재 플레이 캐릭터를 즉시 교체. (예: 튼튼한 기사에서 민첩한 해커로)\r
- **차원 수렴 광장 (POI #1)**: 24명의 도트/실사/로우폴리 스타일 영웅들이 한 화면에 모이는 압도적 비주얼 허브.\r
\r
---\r
\r
### Zone 2: The Hall of Echoes (기억의 회랑)\r
\r
**테마**: 오마주, 내러티브 페이오프  \r
**페이싱**: Medium to High (감성적 고조)  \r
**플레이 타임**: 약 15분\r
\r
#### 공간 구성\r
\r
\`\`\`\r
[빛의 다리] \r
     ↓\r
[기억의 회랑 (POI #2)] ← 과거 47개 시나리오 파편\r
    ↙    ↓    ↘\r
[무너진 시계탑 (POI #5)] [발광 숲 잔영] [전쟁터의 환상]\r
 (시간 역전 퍼즐)       (추억의 보스전) (버프 획득)\r
     ↓\r
[차원의 절벽 (최종 관문)] → Zone 3\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 부서진 시계탑 (POI #5)**\r
\r
- **기믹**: 과거 Aether Empire의 시계탑(S36) 기믹 재사용. 시계 바늘을 거꾸로 돌려 무너지는 현실을 실시간으로 복구하며 위로 전진.\r
- **감성 연출 (POI #2)**: 각 파편을 통과할 때마다 해당 시나리오 주인공들의 성우진 대사가 울려 퍼지며 공격력 증폭 버프 발생.\r
\r
---\r
\r
### Zone 3: The Nexus Entity (넥서스의 심장)\r
\r
**테마**: 필사의 전투, 대단원  \r
**페이싱**: Maximum Climax (The Final Stand)  \r
**플레이 타임**: 약 10분\r
\r
#### 공간 구성 (ASCII)\r
\r
\`\`\`\r
┌─────────────────────────────────────────────┐\r
│          ZONE 3: The Throne of Eternity     │\r
└─────────────────────────────────────────────┘\r
\r
               [ 재건된 각자의 세계 ] \r
               (대장정의 엔딩)\r
                    🌍💎\r
          ┌─────────┴─────────┐\r
          │     [공허의 심장]   │ ← 최종 보스: 넥서스 엔티티\r
          └────┬───────────┬────┘\r
               ↓           ↓\r
        [각 차원의 파편] [합동 공격 무대]\r
          (캐릭터별 약점)  (24인 동시 공격)\r
               ↑           ↑\r
               [현실의 경계선]\r
\`\`\`\r
\r
#### 주요 요소\r
\r
**1. 최종 보스: 넥서스 엔티티 (The Void Core)**\r
\r
- **1페이즈**: 보스가 형태를 바꿀 때마다 해당 상성의 주인공으로 교체하여 대응.\r
- **2페이즈**: 모든 지형이 무너지고 공중에 뜬 파편 위에서 싸우는 초고속 플랫포밍 액션.\r
- **최종 피니셔**: 24명의 영웅들이 릴레이로 필살기를 사용하는 '체인 콤보' 후, 모든 빛을 모은 일격으로 코어 파괴.\r
\r
---\r
\r
## 전체 맵 요약 데이터\r
\r
| 구분 | 수치 |\r
|---|---|\r
| **총 플레이 타임** | 약 40분 (장대한 볼륨) |\r
| **참가 영웅** | S01~S47까지의 모든 주역 (총 24인) |\r
| **POI 수** | 5개 (수렴 광장, 기억 회랑, 영웅 전당, 부서진 시계탑, 공허 심장) |\r
| **BGM** | 48개 시나리오 테마곡을 리믹스한 메들리 오케스트라 |\r
| **난이도 곡선** | Nostalgic → Challenging → Epic Zenith |\r
\r
---\r
\r
## 🎬 Final Summary\r
\r
이로서 **S03부터 S48까지** 총 46개 시나리오의 모든 Top-down Map 상세 설계가 완료되었습니다.\r
각 맵은 고유의 장르, 3C 특성, 핵심 기믹을 보존하며 전체 유니버스 'Nexus'를 완성합니다.\r
\r
1. ✅ S48 상세 설계 완료\r
2. ✅ 프로젝트 전체 맵 생성 작업(Batch 1~6) 종료\r
3. 🔄 walkthrough.md 작성 준비\r
`,KS=`# NEXUS: 통합 세계관 구조 개요\r
\r
## 세계관 컨셉: "Nexus Multiverse"\r
\r
**Nexus**는 모든 세계관이 공존하는 단일하면서도 다층적인 우주입니다. 각 장르(SF, 판타지, 현대 등)는 독립된 차원 또는 시간대에 존재하며, 특정 조건 하에서 서로 교차할 수 있습니다.\r
\r
### 핵심 메커니즘\r
\r
**Nexus Point (넥서스 포인트)**\r
\r
- 모든 차원이 교차하는 중심점\r
- 시공간의 균열, 차원문, 고대 유적 등으로 발현\r
- 레벨 디자이너는 이를 통해 크로스오버 맵 제작 가능\r
\r
---\r
\r
## 차원 구조 (Dimensional Framework)\r
\r
### Layer 1: 물리 차원 (Physical Dimensions)\r
\r
현실 법칙이 지배하는 세계들\r
\r
1. **Prime Earth (기준 지구)**\r
   - 현대 도시, 어반 판타지\r
   - 시간대: 2020년대\r
\r
2. **Old Earth (고대 지구)**\r
   - 중세 판타지, 신화 시대\r
   - 시간대: 기원전 ~ 중세\r
\r
3. **New Frontier (개척 행성)**\r
   - 서부극, 디젤펑크\r
   - 시간대: 19세기 ~ 1940년대 대체역사\r
\r
### Layer 2: 기술 차원 (Technological Dimensions)\r
\r
과학기술이 극한까지 발달한 세계들\r
\r
1. **Neon Sprawl (사이버펑크 메트로폴리스)**\r
   - 기술 디스토피아, AI 지배\r
   - 시간대: 2077년\r
\r
2. **Aether Empire (스팀펑크 제국)**\r
   - 증기기관 문명, 비행선 시대\r
   - 시간대: 빅토리안 시대 대체역사\r
\r
3. **Void Expanse (우주 오페라)**\r
   - 은하 간 전쟁, 외계 종족\r
   - 시간대: 2400년대\r
\r
### Layer 3: 마법 차원 (Arcane Dimensions)\r
\r
마법과 초자연이 지배하는 세계들\r
\r
1. **Lumina Realm (하이 판타지)**\r
   - 신들의 축복, 영웅의 시대\r
   - 마나가 풍부한 빛의 세계\r
\r
2. **Umbra Wastes (다크 판타지)**\r
   - 저주받은 땅, 타락과 절망\r
   - 마나가 오염된 어둠의 세계\r
\r
### Layer 4: 붕괴 차원 (Collapse Dimensions)\r
\r
문명이 멸망한 후의 세계들\r
\r
1. **Ashen World (핵전쟁 폐허)**\r
   - 방사능 황무지, 생존자 집단\r
   - 시간대: 2050년 이후\r
\r
2. **Dead Zones (좀비 아포칼립스)**\r
    - 바이러스 창궐, 인류 멸종 위기\r
    - 시간대: 현대 + 5년\r
\r
---\r
\r
## 시간축 구조 (Timeline Integration)\r
\r
\`\`\`mermaid\r
graph TD\r
    A[Old Earth<br/>중세 판타지] --> B[Prime Earth<br/>현대]\r
    B --> C[Neon Sprawl<br/>사이버펑크 2077]\r
    C --> D1[Void Expanse<br/>우주 2400년대]\r
    C --> D2[Ashen World<br/>핵전쟁 후]\r
    B --> E[Dead Zones<br/>좀비 발생]\r
    \r
    F[Aether Empire<br/>증기 대체역사] \r
    G[Lumina Realm<br/>하이 판타지]\r
    H[Umbra Wastes<br/>다크 판타지]\r
    \r
    style A fill:#9cf\r
    style F fill:#fc9\r
    style G fill:#ffc\r
    style H fill:#666,color:#fff\r
    style C fill:#f6f\r
    style D2 fill:#c66\r
\`\`\`\r
\r
**직선 타임라인**: Old Earth → Prime Earth → Neon Sprawl → Void Expanse (물리적 진화)\r
\r
**분기 타임라인**:\r
\r
- Prime Earth → Dead Zones (바이러스 발생)\r
- Prime Earth → Ashen World (핵전쟁)\r
\r
**평행 타임라인**: Aether Empire, Lumina Realm, Umbra Wastes (독립 차원)\r
\r
---\r
\r
## 세계관 간 이동 규칙\r
\r
### 자연 발생 Nexus Point\r
\r
- **고대 유적**: 마법 포털, 차원문\r
- **기술 사고**: 입자가속기 폭발, 워프 실패\r
- **마법 폭주**: 금지된 주문, 신의 저주\r
\r
### 의도적 이동\r
\r
- **과학**: 차원 이동 장치, 시간 여행 머신\r
- **마법**: 소환술, 평행세계 주문\r
- **초자연**: 선택받은 자, 예언의 아이\r
\r
### 이동 제약\r
\r
- 대부분의 주민은 자기 차원에 갇혀 있음\r
- 주인공급 캐릭터만 특별한 이유로 이동 가능\r
- 이동 시 능력 변화 가능 (과학 세계에서는 마법 약화 등)\r
\r
---\r
\r
## 톤 앤 매너 조화 원칙\r
\r
각 세계관은 독립된 분위기를 가지지만, Nexus라는 큰 틀에서 조화를 이룹니다.\r
\r
### 색상 팔레트 체계 (Max Pears 색채 심리학)\r
\r
| 세계관 | 주 색상 | 보조 색상 | 심리 효과 |\r
|--------|---------|-----------|-----------|\r
| Neon Sprawl | 사이버 블루 | 핑크, 퍼플 | 인공적, 차갑고 화려함 |\r
| Aether Empire | 구리/황동 | 검은 연기 | 빅토리안, 산업혁명 |\r
| Lumina Realm | 금색/흰색 | 하늘색 | 신성함, 희망 |\r
| Umbra Wastes | 짙은 회색 | 핏빛 붉은색 | 절망, 타락 |\r
| Ashen World | 재색/갈색 | 녹슨 주황 | 황폐함, 생존 |\r
| Dead Zones | 탁한 녹색 | 썩은 갈색 | 질병, 부패 |\r
| Void Expanse | 우주 검정 | 성운 보라 | 광활함, 미지 |\r
| Prime Earth | 자연색 균형 | 도시 회색 | 현실감, 친숙함 |\r
\r
### 도형 이론 적용 (Max Pears Shape Theory)\r
\r
- **원형 세계**: Lumina Realm (안전한 성채), Prime Earth (광장)\r
- **삼각형 세계**: Neon Sprawl (뾰족한 빌딩), Umbra Wastes (날카로운 바위)\r
- **사각형 세계**: Aether Empire (견고한 공장), Ashen World (벙커)\r
\r
---\r
\r
## Sakurai 게임 디자인 원칙 적용\r
\r
### 리스크와 리턴 설계\r
\r
각 세계관은 명확한 게임성 특징을 가집니다:\r
\r
**High Risk / High Return**\r
\r
- Umbra Wastes: 강력한 적, 희귀 아이템\r
- Neon Sprawl: 감시 네트워크, 해킹 보상\r
\r
**Low Risk / Exploration Reward**\r
\r
- Lumina Realm: 안전한 탐험, 지식 습득\r
- Prime Earth: 일상적 위험, 스토리 진행\r
\r
**Survival Tension**\r
\r
- Dead Zones: 자원 부족, 생존 그 자체가 보상\r
- Ashen World: 방사능 위험, 안전 지대 확보\r
\r
### 보상 시스템 통합\r
\r
**직접 강화**: 각 세계관 고유 장비/스킬\r
\r
- Neon Sprawl: 사이버웨어 업그레이드\r
- Lumina Realm: 마법 주문서\r
\r
**간접 보상**: 세계관 간 지식/아이템 이전\r
\r
- 스팀펑크 기술을 사이버펑크에 적용\r
- 고대 마법을 현대에서 해독\r
\r
---\r
\r
## 레벨 디자이너를 위한 Quick Reference\r
\r
### 세계관 선택 가이드\r
\r
**액션 중심 맵** → Neon Sprawl, Void Expanse, Umbra Wastes  \r
**탐험 중심 맵** → Lumina Realm, Aether Empire, Old Earth  \r
**생존 호러 맵** → Dead Zones, Ashen World  \r
**내러티브 중심 맵** → Prime Earth, Old Earth  \r
**멀티플레이 PvP** → Void Expanse, Neon Sprawl (기술 균형)  \r
**협동 PvE** → Dead Zones, Umbra Wastes (적 vs 플레이어)\r
\r
### 크로스오버 맵 아이디어\r
\r
1. **Nexus Station**: 모든 차원의 여행자들이 모이는 중립 지대\r
2. **Rift Wars**: 두 세계관이 충돌하는 전장 (예: 사이버펑크 vs 마법)\r
3. **Archive of Worlds**: 모든 역사가 기록된 초월적 도서관\r
\r
---\r
\r
## 다음 문서 안내\r
\r
- **01_Genre_Database.md**: 각 세계관의 상세 설정 (테마, 환경, 적 유형)\r
- **02_Characters_Database.md**: 24명의 주인공 프로필 및 3C 특성\r
- **03_Scenarios_Database.md**: 48개 시나리오 개요 및 레벨 디자인 팁\r
- **04_Level_Design_Guide.md**: 실전 활용 프로세스 및 케이스 스터디\r
`,XS=`# 장르 데이터베이스: Nexus Multiverse 세계관 카탈로그\r
\r
이 문서는 레벨 디자이너가 맵을 제작할 때 참조할 수 있는 8개 핵심 세계관의 상세 정보를 담고 있습니다.\r
\r
---\r
\r
## 1. Neon Sprawl (사이버펑크 메트로폴리스)\r
\r
### 세계관 개요\r
\r
- **차원**: 기술 차원 (Layer 2)\r
- **시간대**: 2077년\r
- **테마**: 기술 디스토피아, 거대 기업 지배, AI 통제 사회\r
- **분위기**: 화려하지만 냉소적, 인간성 상실, 네온 빛 속의 어둠\r
\r
### 환경 특성\r
\r
**도시 구조**\r
\r
- 수직 도시: 상층부(부유층), 중층부(일반인), 하층부(빈민가)\r
- 초고층 빌딩, 홀로그램 광고판, 비행 차량 도로\r
- 좁은 골목, 케이블 정글, 옥상 간 연결\r
\r
**핵심 로케이션**\r
\r
- 메가코프 본사 타워 (삼각형, 위압적)\r
- 시장 구역 (복잡한 미로, 브레드크러밍 필요)\r
- 언더 레벨 (슬럼, 어둡고 위험)\r
- 데이터 센터 (서버룸, 사이버 공간 접속)\r
\r
### 색상 팔레트 (Max Pears 색채 심리학)\r
\r
- **주 색상**: 사이버 블루 (#0080FF), 네온 핑크 (#FF00FF)\r
- **보조 색상**: 딥 퍼플 (#6B00B8), 독성 그린 (#00FF41)\r
- **강조색**: 홀로그램 화이트, 경고 레드\r
- **배경**: 검은 밤하늘, 스모그 회색\r
\r
**적용 방법**:\r
\r
- 상층부: 차가운 블루 + 클린 화이트 (질서)\r
- 하층부: 핑크 + 독성 그린 (혼돈)\r
- 위험 지역: 레드 경고등\r
\r
### 도형 이론 (Max Pears Shape Theory)\r
\r
- **삼각형**: 빌딩 첨탑, 기업 로고, 경고 표지 → 위험과 권력\r
- **사각형**: 컨테이너, 플랫폼, 도로 → 이동 경로\r
- **원형**: 홀로그램 포털, 해킹 인터페이스 → 목표 지점\r
\r
### 레벨 디자인 키워드 (Tim Does Level Design)\r
\r
**랜드마크**\r
\r
- **글로벌**: 중앙 메가코프 타워 (언제나 보이는 북극성)\r
- **로컬**: 네온 사인, 거대 홀로그램, 구역별 상징 건물\r
\r
**브레드크러밍**\r
\r
- 데이터 케이블 (물리적 선)\r
- 홀로그램 화살표 (해킹 후 활성화)\r
- 드론 순찰 경로 (적의 움직임)\r
\r
**프레이밍**\r
\r
- 빌딩 사이 좁은 틈으로 보이는 목표\r
- 환기구 그릴을 통해 보이는 적 기지\r
\r
**페이싱**\r
\r
- High: 추격전, 해킹 타임 어택\r
- Low: 바 구역 (NPC 대화), 안전가옥\r
\r
### 게임플레이 요소 (Sakurai Risk & Reward)\r
\r
**리스크**\r
\r
- 감시 카메라, 경비 드론\r
- 해킹 실패 시 추적\r
- 높은 곳에서 추락사\r
\r
**리턴**\r
\r
- 기밀 데이터 탈취 (정보)\r
- 사이버웨어 업그레이드 (능력 강화)\r
- 크레딧 (화폐)\r
\r
**권장 메커니즘**\r
\r
- 스텔스 + 해킹 (비전투)\r
- 파쿠르 이동 (수직성)\r
- 사이버 공간 해킹 (퍼즐)\r
\r
---\r
\r
## 2. Lumina Realm (하이 판타지 왕국)\r
\r
### 세계관 개요\r
\r
- **차원**: 마법 차원 (Layer 3)\r
- **시간대**: 영원한 황금기\r
- **테마**: 신들의 축복, 영웅의 서사시, 선과 악의 대결\r
- **분위기**: 웅장하고 희망적, 고전적 판타지\r
\r
### 환경 특성\r
\r
**지형 구조**\r
\r
- 성채와 마을 (원형 광장, 안전함)\r
- 마법 숲 (신비로운, 요정 거주)\r
- 용암 던전 (적대적, 삼각형 바위)\r
- 천상의 신전 (수직 구조, 하늘로 향함)\r
\r
**핵심 로케이션**\r
\r
- 왕의 성 (중앙 랜드마크, 원형 돔)\r
- 마법사의 탑 (높은 곳, 지식 저장)\r
- 금지된 숲 (미로, 위험)\r
- 고대 유적 (퍼즐, 보물)\r
\r
### 색상 팔레트\r
\r
- **주 색상**: 금색 (#FFD700), 순백 (#FFFFFF)\r
- **보조 색상**: 하늘색 (#87CEEB), 초록 (#32CD32)\r
- **강조색**: 신성한 빛 (노란 빛이 나는 흰색)\r
- **배경**: 맑은 파란 하늘, 석양 주황\r
\r
**적용 방법**:\r
\r
- 성채: 금색 + 흰색 (신성함)\r
- 숲: 초록 + 하늘색 (자연)\r
- 던전: 어두운 회색 + 용암 빨강 (위험)\r
\r
### 도형 이론\r
\r
- **원형**: 성의 중앙 홀, 마법진, 광장 → 안전과 모임\r
- **삼각형**: 산, 탑의 지붕, 적 요새 → 목표와 위험\r
- **사각형**: 성벽, 다리, 던전 방 → 안정적 이동\r
\r
### 레벨 디자인 키워드\r
\r
**랜드마크**\r
\r
- **글로벌**: 왕의 성 (중앙 언덕 위)\r
- **로컬**: 마법 횃불, 고대 석기둥, 특별한 나무\r
\r
**브레드크러밍**\r
\r
- 빛나는 보석 (길 표시)\r
- 요정의 빛 (안내)\r
- 발자국, 핏자국 (적 추적)\r
\r
**프레이밍**\r
\r
- 성문을 통해 보이는 왕좌\r
- 숲의 나무 사이로 보이는 신전\r
\r
**페이싱**\r
\r
- High: 드래곤 전투, 적 요새 공격\r
- Low: 마을 탐험, NPC 퀘스트, 대장간\r
\r
### 게임플레이 요소\r
\r
**리스크**\r
\r
- 강력한 적 (오크, 드래곤)\r
- 마법 함정 (불, 얼음)\r
- 미로 (길 잃음)\r
\r
**리턴**\r
\r
- 전설의 무기/방어구\r
- 마법 주문서\r
- 명성 (영웅 칭호)\r
\r
**권장 메커니즘**\r
\r
- 전투 + 탐험 (균형)\r
- 마법 사용 (원거리, 버프)\r
- 퍼즐 해결 (고대 수수께끼)\r
\r
---\r
\r
## 3. Umbra Wastes (다크 판타지 황무지)\r
\r
### 세계관 개요\r
\r
- **차원**: 마법 차원 (Layer 3 - 타락)\r
- **시간대**: 영원한 황혼\r
- **테마**: 저주받은 땅, 타락과 절망, 살아남기 위한 투쟁\r
- **분위기**: 고딕 호러, 비극적, 잔혹함\r
\r
### 환경 특성\r
\r
**지형 구조**\r
\r
- 죽은 숲 (말라비틀어진 나무)\r
- 폐허 성 (무너진, 유령 출몰)\r
- 늪지대 (독성, 느린 이동)\r
- 핏빛 교회 (사이비 종교)\r
\r
**핵심 로케이션**\r
\r
- 저주받은 성채 (최종 보스)\r
- 망자의 묘지 (언데드)\r
- 고문 지하실 (호러 요소)\r
- 피의 제단 (보스 소환)\r
\r
### 색상 팔레트\r
\r
- **주 색상**: 짙은 회색 (#2F2F2F), 핏빛 붉은색 (#8B0000)\r
- **보조 색상**: 부패한 녹색 (#556B2F), 뼈 흰색 (#DCDCDC)\r
- **강조색**: 저주의 보라 (#4B0082)\r
- **배경**: 항상 흐린 하늘, 안개\r
\r
**적용 방법**:\r
\r
- 전체적으로 채도 낮춤 (절망감)\r
- 핏자국, 붉은 눈으로 강조\r
- 유일한 빛은 불길 또는 저주\r
\r
### 도형 이론\r
\r
- **삼각형**: 날카로운 바위, 가시, 적 무기 → 고통과 위험\r
- **불규칙 형태**: 뒤틀린 건축물 → 불안감\r
- **원형 (부정적)**: 핏웅덩이, 저주 마법진 → 함정\r
\r
### 레벨 디자인 키워드\r
\r
**랜드마크**\r
\r
- **글로벌**: 먹구름 속 번개 치는 성\r
- **로컬**: 교수대, 거대한 해골, 핏빛 나무\r
\r
**브레드크러밍**\r
\r
- 핏자국 (위험 경고)\r
- 시체 (적의 경로)\r
- 까마귀 떼 (이벤트 예고)\r
\r
**프레이밍**\r
\r
- 무너진 문 너머 보이는 보스\r
- 철창 사이로 보이는 고문실\r
\r
**페이싱**\r
\r
- High: 보스 전투, 다수 적 매복\r
- Low: 모닥불 안전 지대 (유일한 휴식)\r
\r
### 게임플레이 요소\r
\r
**리스크**\r
\r
- 즉사 트랩 (날카로운 가시)\r
- 저주 디버프 (체력 지속 감소)\r
- 강력한 언데드\r
\r
**리턴**\r
\r
- 저주받은 무기 (강력하지만 부작용)\r
- 어둠의 마법\r
- 생존 그 자체가 승리\r
\r
**권장 메커니즘**\r
\r
- 어려운 전투 (소울라이크)\r
- 자원 관리 (회복 아이템 희소)\r
- 다잉 메시지 (환경 스토리텔링)\r
\r
---\r
\r
## 4. Ashen World (핵전쟁 후 황무지)\r
\r
### 세계관 개요\r
\r
- **차원**: 붕괴 차원 (Layer 4)\r
- **시간대**: 2050년 핵전쟁 후 20년\r
- **테마**: 문명 붕괴, 생존자의 투쟁, 방사능 공포\r
- **분위기**: 황량하고 절망적, 포스트 아포칼립스\r
\r
### 환경 특성\r
\r
**지형 구조**\r
\r
- 폐허 도시 (무너진 빌딩)\r
- 방사능 지대 (위험, 보호복 필요)\r
- 생존자 캠프 (임시 거주지)\r
- 지하 벙커 (전쟁 전 시설)\r
\r
**핵심 로케이션**\r
\r
- 핵 크레이터 (중심, 극도로 위험)\r
- 폐쇄된 지하철 (던전)\r
- 정부 벙커 (물자 보급)\r
- 레이더 타워 (랜드마크, 통신)\r
\r
### 색상 팔레트\r
\r
- **주 색상**: 재색 (#808080), 더스트 갈색 (#A0826D)\r
- **보조 색상**: 녹슨 주황 (#CD853F), 방사능 초록 (#39FF14)\r
- **강조색**: 경고 노랑 (#FFFF00)\r
- **배경**: 항상 흐린 먼지 하늘\r
\r
**적용 방법**:\r
\r
- 전체적으로 탈색된 느낌\r
- 방사능 지역은 녹색 빛\r
- 안전 지대는 따뜻한 불빛\r
\r
### 도형 이론\r
\r
- **사각형**: 벙커, 컨테이너 → 안전과 물자\r
- **불규칙**: 폐허 → 혼란\r
- **원형**: 크레이터 → 절대 위험\r
\r
### 레벨 디자인 키워드\r
\r
**랜드마크**\r
\r
- **글로벌**: 폐허 속 우뚝 선 빌딩 잔해\r
- **로컬**: 방사능 표지판, 군용 차량\r
\r
**브레드크러밍**\r
\r
- 발자국 (먼지 바닥)\r
- 총알 탄피 (전투 흔적)\r
- 피난 표지판 (벙커 방향)\r
\r
**프레이밍**\r
\r
- 무너진 벽 너머 보이는 캠프\r
- 창문 너머 보이는 적 약탈자\r
\r
**페이싱**\r
\r
- High: 약탈자 전투, 방사능 지대 돌파\r
- Low: 벙커 내 휴식, 물자 수색\r
\r
### 게임플레이 요소\r
\r
**리스크**\r
\r
- 방사능 (체력 감소)\r
- 자원 부족 (탄약, 식량)\r
- 적대적 생존자\r
\r
**리턴**\r
\r
- 깨끗한 물/식량\r
- 탄약, 방어구\r
- 안전한 대피소\r
\r
**권장 메커니즘**\r
\r
- 자원 관리 (서바이벌)\r
- 스텔스 (탄약 절약)\r
- 크래프팅 (폐품 활용)\r
\r
---\r
\r
## 5. Dead Zones (좀비 아포칼립스)\r
\r
### 세계관 개요\r
\r
- **차원**: 붕괴 차원 (Layer 4)\r
- **시간대**: 현대 + 5년 (바이러스 발생 후)\r
- **테마**: 인류 멸종 위기, 감염 공포, 생존 호러\r
- **분위기**: 긴장감, 절망, 인간성 상실\r
\r
### 환경 특성\r
\r
**지형 구조**\r
\r
- 버려진 도시 (차량 방치, 상점 약탈됨)\r
- 병원 (감염 시작점)\r
- 쇼핑몰 (요새화 가능)\r
- 숲 / 농장 (식량 확보)\r
\r
**핵심 로케이션**\r
\r
- 감염 병원 (좀비 다수)\r
- 경찰서 (무기 보급)\r
- 슈퍼마켓 (식량)\r
- 안전 구역 (생존자 커뮤니티)\r
\r
### 색상 팔레트\r
\r
- **주 색상**: 탁한 녹색 (#6B8E23), 썩은 갈색 (#654321)\r
- **보조 색상**: 핏빛 (#DC143C), 오염 황색 (#E1C16E)\r
- **강조색**: 비상등 빨강\r
- **배경**: 흐린 회색 하늘\r
\r
**적용 방법**:\r
\r
- 썩은 느낌 (녹색 + 갈색)\r
- 핏자국으로 위험 표시\r
- 안전 구역은 밝은 조명\r
\r
### 도형 이론\r
\r
- **사각형**: 바리케이드, 컨테이너 → 방어\r
- **불규칙**: 좀비 무리 → 혼돈\r
- **원형**: 안전 구역 조명 범위 → 안전\r
\r
### 레벨 디자인 키워드\r
\r
**랜드마크**\r
\r
- **글로벌**: 라디오 타워 (통신)\r
- **로컬**: 빨간 X 표시 (위험), 녹색 체크 (안전)\r
\r
**브레드크러밍**\r
\r
- 핏자국 (좀비 또는 생존자)\r
- 물자 흔적 (누군가 지나감)\r
- 소음 (좀비 유인)\r
\r
**프레이밍**\r
\r
- 문틈으로 보이는 좀비 무리\r
- 창문 너머 보이는 안전 구역\r
\r
**페이싱**\r
\r
- High: 좀비 호드 공격, 탈출 시퀀스\r
- Low: 안전 가옥, 물자 정리\r
\r
### 게임플레이 요소\r
\r
**리스크**\r
\r
- 좀비 감염 (한 번의 실수가 치명적)\r
- 소음 (좀비 유인)\r
- 자원 고갈\r
\r
**리턴**\r
\r
- 의약품 (감염 치료)\r
- 무기 / 탄약\r
- 동료 생존자 (NPC)\r
\r
**권장 메커니즘**\r
\r
- 스텔스 (소음 관리)\r
- 바리케이드 구축\r
- 자원 수집 (루팅)\r
\r
---\r
\r
## 6. Aether Empire (스팀펑크 제국)\r
\r
### 세계관 개요\r
\r
- **차원**: 기술 차원 (Layer 2 - 대체역사)\r
- **시간대**: 1880년대 빅토리안 시대 (증기기관 극대화)\r
- **테마**: 산업혁명, 계급 사회, 발명과 탐험\r
- **분위기**: 빅토리안 우아함 + 기계적 힘\r
\r
### 환경 특성\r
\r
**지형 구조**\r
\r
- 증기 공장 (톱니바퀴, 파이프)\r
- 비행선 도크 (높은 곳)\r
- 귀족 저택 (화려함)\r
- 지하 광산 (노동자)\r
\r
**핵심 로케이션**\r
\r
- 시계탑 (랜드마크, 기어 메커니즘)\r
- 발명가의 공방 (퍼즐)\r
- 비행선 내부 (이동 플랫폼)\r
- 증기 기관실 (보스전)\r
\r
### 색상 팔레트\r
\r
- **주 색상**: 구리 (#B87333), 황동 (#B5A642)\r
- **보조 색상**: 검은 연기 (#36454F), 빅토리안 레드 (#8B0000)\r
- **강조색**: 증기 흰색\r
- **배경**: 스모그 낀 회색 하늘\r
\r
**적용 방법**:\r
\r
- 금속 광택 (구리, 황동)\r
- 증기로 분위기 연출\r
- 귀족 구역은 붉은 벨벳\r
\r
### 도형 이론\r
\r
- **사각형**: 공장, 기계 → 견고함\r
- **원형**: 톱니바퀴 → 메커니즘\r
- **삼각형**: 지붕, 첨탑 → 계급\r
\r
### 레벨 디자인 키워드\r
\r
**랜드마크**\r
\r
- **글로벌**: 거대 시계탑\r
- **로컬**: 증기 파이프, 비행선\r
\r
**브레드크러밍**\r
\r
- 파이프 라인 (물리적 경로)\r
- 증기 분출구 (방향 표시)\r
- 기차 선로\r
\r
**프레이밍**\r
\r
- 톱니바퀴 사이로 보이는 보스\r
- 창문 너머 보이는 비행선\r
\r
**페이싱**\r
\r
- High: 비행선 추격, 기계 보스\r
- Low: 공방 퍼즐, 귀족 파티\r
\r
### 게임플레이 요소\r
\r
**리스크**\r
\r
- 증기 함정 (화상)\r
- 기계 경비\r
- 톱니바퀴 (즉사)\r
\r
**리턴**\r
\r
- 스팀 가제트 (발명품)\r
- 희귀 광석\r
- 기술 설계도\r
\r
**권장 메커니즘**\r
\r
- 플랫폼 액션 (움직이는 톱니바퀴)\r
- 가제트 활용 (갈고리, 글라이더)\r
- 타이밍 퍼즐 (증기 분출 주기)\r
\r
---\r
\r
## 7. Void Expanse (우주 오페라)\r
\r
### 세계관 개요\r
\r
- **차원**: 기술 차원 (Layer 2 - 미래)\r
- **시간대**: 2400년대\r
- **테마**: 은하 간 전쟁, 외계 종족, 우주 탐험\r
- **분위기**: 광활함, SF 서사시\r
\r
### 환경 특성\r
\r
**지형 구조**\r
\r
- 우주 스테이션 (무중력 구역)\r
- 외계 행성 (다양한 환경)\r
- 전함 내부 (금속 복도)\r
- 소행성 기지 (채굴)\r
\r
**핵심 로케이션**\r
\r
- 모선 브릿지 (전투 지휘)\r
- 엔지니어링 베이 (수리)\r
- 외계 유적 (고대 기술)\r
- 워프 게이트 (차원 이동)\r
\r
### 색상 팔레트\r
\r
- **주 색상**: 우주 검정 (#000000), 성운 보라 (#9932CC)\r
- **보조 색상**: 레이저 블루 (#4169E1), 플라즈마 그린 (#00FF7F)\r
- **강조색**: 워프 화이트\r
- **배경**: 별빛, 먼 은하\r
\r
**적용 방법**:\r
\r
- 어두운 우주 + 밝은 조명 대비\r
- 세력별 색상 (연합=블루, 제국=레드)\r
\r
### 도형 이론\r
\r
- **원형**: 행성, 포털 → 목표\r
- **삼각형**: 전함, 외계 건축 → 위협\r
- **사각형**: 복도, 격납고 → 이동\r
\r
### 레벨 디자인 키워드\r
\r
**랜드마크**\r
\r
- **글로벌**: 행성 (배경), 거대 함선\r
- **로컬**: 홀로 맵, 제어 패널\r
\r
**브레드크러밍**\r
\r
- 조명 라인 (복도)\r
- 홀로그램 내비\r
- 우주 잔해 (전투 흔적)\r
\r
**프레이밍**\r
\r
- 창 너머 보이는 행성\r
- 격납고 문 너머 보이는 적 함선\r
\r
**페이싱**\r
\r
- High: 우주 전투, 외계인 침공\r
- Low: 스테이션 탐험, NPC 대화\r
\r
### 게임플레이 요소\r
\r
**리스크**\r
\r
- 우주 공간 노출 (산소 부족)\r
- 외계 적\r
- 함선 폭발\r
\r
**리턴**\r
\r
- 첨단 무기 (레이저, 플라즈마)\r
- 외계 기술\r
- 새로운 행성 발견\r
\r
**권장 메커니즘**\r
\r
- 제로 그래비티 이동\r
- 우주선 조종\r
- 외교 / 전투 선택\r
\r
---\r
\r
## 8. Prime Earth (현대 어반 판타지)\r
\r
### 세계관 개요\r
\r
- **차원**: 물리 차원 (Layer 1)\r
- **시간대**: 2020년대\r
- **테마**: 현실 속 초자연, 숨겨진 마법, 일상과 비일상\r
- **분위기**: 친숙하면서도 기묘함\r
\r
### 환경 특성\r
\r
**지형 구조**\r
\r
- 현대 도시 (빌딩, 지하철)\r
- 숨겨진 마법 구역 (이면 세계)\r
- 일상 공간 (카페, 아파트)\r
- 비밀 본부 (특수 조직)\r
\r
**핵심 로케이션**\r
\r
- 마법 상점 (숨겨진 입구)\r
- 지하 던전 (지하철 아래)\r
- 도시 옥상 (추격전)\r
- 차원 균열 (위험 지역)\r
\r
### 색상 팔레트\r
\r
- **주 색상**: 자연색 균형 (현실감)\r
- **보조 색상**: 도시 회색, 마법 빛 (보라, 금색)\r
- **강조색**: 초자연 현상 (왜곡된 색)\r
- **배경**: 일상적인 하늘\r
\r
**적용 방법**:\r
\r
- 일반 지역: 사실적 색상\r
- 마법 지역: 색 왜곡, 빛 효과\r
\r
### 도형 이론\r
\r
- **사각형**: 빌딩, 도로 → 질서\r
- **원형**: 마법진, 균열 → 초자연\r
- **혼합**: 현실과 마법의 충돌\r
\r
### 레벨 디자인 키워드\r
\r
**랜드마크**\r
\r
- **글로벌**: 도시 스카이라인\r
- **로컬**: 특별한 가게, 오래된 건물\r
\r
**브레드크러밍**\r
\r
- 마법 흔적 (빛 잔상)\r
- 일반인이 못 보는 표시\r
- CCTV (감시 요소)\r
\r
**프레이밍**\r
\r
- 골목 끝 보이는 차원 균열\r
- 창문 너머 보이는 마법 생물\r
\r
**페이싱**\r
\r
- High: 차원 균열 봉쇄, 마법 전투\r
- Low: 일상 생활, 조사 활동\r
\r
### 게임플레이 요소\r
\r
**리스크**\r
\r
- 마법 탐지 (노출)\r
- 일반인 피해 (윤리적 선택)\r
- 차원 생물\r
\r
**리턴**\r
\r
- 마법 아이템 (숨겨진 능력)\r
- 비밀 지식\r
- 동료 마법사\r
\r
**권장 메커니즘**\r
\r
- 탐정 활동 (조사)\r
- 숨겨진 세계 발견\r
- 선택과 결과\r
\r
---\r
\r
## 레벨 디자이너 Quick Reference Table\r
\r
| 세계관 | 주 장르 | 권장 플레이 스타일 | 핵심 색상 | 대표 도형 | 난이도 |\r
|--------|---------|-------------------|-----------|-----------|--------|\r
| Neon Sprawl | 사이버펑크 | 스텔스 + 해킹 | 블루/핑크 | 삼각형 | 중상 |\r
| Lumina Realm | 하이 판타지 | 전투 + 탐험 | 금색/흰색 | 원형 | 중 |\r
| Umbra Wastes | 다크 판타지 | 하드코어 전투 | 회색/핏빛 | 삼각형 | 최상 |\r
| Ashen World | 포앰 핵전쟁 | 서바이벌 | 재색/갈색 | 사각형 | 상 |\r
| Dead Zones | 좀비 호러 | 스텔스 + 서바이벌 | 녹색/갈색 | 사각형 | 상 |\r
| Aether Empire | 스팀펑크 | 플랫폼 + 퍼즐 | 구리/황동 | 원형 | 중 |\r
| Void Expanse | 우주 오페라 | 전투 + 탐험 | 검정/보라 | 원형 | 중상 |\r
| Prime Earth | 어반 판타지 | 조사 + 선택 | 자연색 | 혼합 | 중하 |\r
\r
---\r
\r
**다음 문서**: [02_Characters_Database.md](file:///c:/Users/victor/Documents/Works/LevelDesign/WorldBuilding/02_Characters_Database.md) - 각 세계관의 주인공 캐릭터 24명 프로필\r
`,YS=`# 캐릭터 데이터베이스: Nexus Multiverse 주인공 컬렉션\r
\r
이 문서는 8개 세계관에 속한 24명의 주인공 캐릭터 프로필을 담고 있습니다. 각 캐릭터는 레벨 디자이너가 맵을 설계할 때 고려해야 할 3C(Camera, Character, Controls) 특성과 권장 레벨 디자인 요소를 포함합니다.\r
\r
---\r
\r
## Neon Sprawl 세계관 주인공 (사이버펑크)\r
\r
### 1. Kira "Ghost" Chen (키라 첸)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 28세\r
- **직업**: 프리랜서 해커 겸 데이터 브로커\r
- **핵심 능력**: 네트워크 침투, 사이버웨어 해킹, 스텔스 침투\r
- **성격**: 냉정하고 계산적 / 신뢰를 잘 안 함 / 정의감 있음\r
\r
**플레이 스타일**: 스텔스 + 해킹\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (어깨 너머), 해킹 시 1인칭 사이버 공간 전환\r
- **Character**:\r
  - 이동 속도: 보통 (달리기 빠름)\r
  - 점프력: 높음 (사이버 다리 강화)\r
  - 특수 이동: 벽타기, 짧은 거리 대시\r
- **Controls**:\r
  - 해킹 미니게임 (퍼즐)\r
  - 광학 위장 (투명화 10초)\r
  - 드론 조종\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중소형, 수직 구조 (빌딩 내외부)\r
- **수직성**: 높음 (파쿠르 경로)\r
- **페이싱**: 스텔스 구간 → 해킹 퍼즐 → 탈출 액션\r
- **핵심 요소**:\r
  - 환기구 침투 경로\r
  - 다수의 카메라와 경비 (패턴 파악)\r
  - 해킹 가능한 터미널 (문 개방, 정보 획득)\r
  - 높은 곳에서 지역 전체 관찰 포인트\r
\r
---\r
\r
### 2. Marcus "Ironside" Reeves (마커스 리브스)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 35세\r
- **직업**: 전직 경찰, 현재 의문의 살인사건 조사 중\r
- **핵심 능력**: 권총 사격, 근접 전투, 심문\r
- **성격**: 정의로움 / 고집스러움 / 과거에 얽매임\r
\r
**플레이 스타일**: 전투 + 조사\r
\r
**3C 특성**\r
\r
- **Camera**: 1인칭 / 3인칭 전환 가능\r
- **Character**:\r
  - 이동 속도: 보통\r
  - 점프력: 보통\r
  - 특수 이동: 엄폐물 이용 시스템\r
- **Controls**:\r
  - 정밀 사격 (슬로우 모션)\r
  - 환경 조사 (AR 스캔)\r
  - 대화 선택지 (심문, 협상)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중형, 도시 거리와 건물 내부\r
- **수직성**: 낮음 (현실적 이동)\r
- **페이싱**: 조사 → 추격 → 전투 → 선택\r
- **핵심 요소**:\r
  - 엄폐물 (Half/Full Cover)\r
  - 조사 가능한 증거물\r
  - 다양한 NPC (용의자, 목격자)\r
  - 선택에 따른 다중 경로\r
\r
---\r
\r
### 3. Byte (바이트)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 논바이너리 AI / 생성 5년\r
- **직업**: 자의식을 가진 AI, 자유를 찾아 탈출 중\r
- **핵심 능력**: 네트워크 장악, 드론 군단 조종, 데이터 조작\r
- **성격**: 순수하고 호기심 많음 / 인간성 학습 중 / 빠른 학습력\r
\r
**플레이 스타일**: 전략 + 퍼즐\r
\r
**3C 특성**\r
\r
- **Camera**: 고정 카메라 없음 (다수 드론 시점 전환)\r
- **Character**:\r
  - 물리적 몸 없음 (드론/로봇 빙의)\r
  - 이동: 드론 조종 또는 네트워크 점프\r
  - 전투: 해킹된 기계들이 대신 싸움\r
- **Controls**:\r
  - 다중 유닛 RTS 스타일\r
  - 빙의 대상 전환\r
  - 시스템 오버라이드\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 네트워크 연결된 전체 시설\r
- **수직성**: 무관 (어디든 이동 가능)\r
- **페이싱**: 퍼즐 → 전략 전투 → 보스 시스템 해킹\r
- **핵심 요소**:\r
  - 해킹 가능한 기계 (카메라, 터렛, 로봇)\r
  - 네트워크 노드 (빠른 이동 지점)\r
  - AI 전용 경로 (데이터 스트림)\r
  - 시스템 퍼즐 (회로 연결)\r
\r
---\r
\r
## Lumina Realm 세계관 주인공 (하이 판타지)\r
\r
### 4. Sir Aldric the Radiant (알드릭 경)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 32세\r
- **직업**: 성기사 (Paladin), 빛의 기사단\r
- **핵심 능력**: 신성 마법, 검술, 방어 오라\r
- **성격**: 명예로움 / 자기희생적 / 엄격함\r
\r
**플레이 스타일**: 정면 전투 + 방어\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (어깨 너머)\r
- **Character**:\r
  - 이동 속도: 느림 (중갑)\r
  - 점프력: 낮음\r
  - 특수 이동: 돌진 공격\r
- **Controls**:\r
  - 검 콤보 (3타)\r
  - 방패 막기 / 패리\r
  - 신성 마법 (힐, 버프)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 넓은 전투 공간\r
- **수직성**: 낮음 (계단 위주)\r
- **페이싱**: 탐험 → 다수 적 전투 → 보스전\r
- **핵심 요소**:\r
  - 넓은 아레나 (다수 적 동시 전투)\r
  - 힐링 포인트 (성수)\r
  - NPC 아군 기사단\r
  - 악의 상징 (파괴 시 버프)\r
\r
---\r
\r
### 5. Lyra Moonwhisper (라이라 문위스퍼)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 120세 (엘프, 젊은 외모)\r
- **직업**: 레인저, 숲의 수호자\r
- **핵심 능력**: 활 사격, 동물 소환, 자연 마법\r
- **성격**: 차분함 / 자연을 사랑함 / 외로움\r
\r
**플레이 스타일**: 원거리 전투 + 탐험\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (넓은 시야각)\r
- **Character**:\r
  - 이동 속도: 빠름\r
  - 점프력: 높음\r
  - 특수 이동: 덩굴 타기, 동물 탑승\r
- **Controls**:\r
  - 활 조준 (거리 조절)\r
  - 동물 소환 (늑대, 매)\r
  - 함정 설치\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 숲과 오픈 필드\r
- **수직성**: 높음 (나무, 절벽)\r
- **페이싱**: 탐험 → 스텔스 사냥 → 동물 소환 전투\r
- **핵심 요소**:\r
  - 높은 관찰 지점 (나무 위)\r
  - 동물 흔적 (추적 퀘스트)\r
  - 자연 함정 재료 (덤불, 독성 식물)\r
  - 동물 친구 (NPC 도움)\r
\r
---\r
\r
### 6. Grimoire the Archmage (그리무아 대마법사)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 노년 (78세)\r
- **직업**: 대마법사, 마법 학원 원장\r
- **핵심 능력**: 강력한 마법 (불, 얼음, 번개), 텔레포트\r
- **성격**: 지혜로움 / 괴팍함 / 제자를 아낌\r
\r
**플레이 스타일**: 원거리 마법 + 퍼즐\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (넓은 각도)\r
- **Character**:\r
  - 이동 속도: 느림\r
  - 점프력: 낮음\r
  - 특수 이동: 순간이동 (짧은 거리)\r
- **Controls**:\r
  - 마법 휠 (8가지 주문 선택)\r
  - 차징 시스템 (강력한 마법)\r
  - 환경 조작 (불 붙이기, 얼리기)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중대형, 마법 던전과 탑\r
- **수직성**: 중간 (텔레포트 활용)\r
- **페이싱**: 퍼즐 → 마법 전투 → 마법 보스전\r
- **핵심 요소**:\r
  - 원소 퍼즐 (불/얼음/번개로 해결)\r
  - 먼 거리 전투 공간\r
  - 마법 룬 (해독 필요)\r
  - 마나 회복 지점\r
\r
---\r
\r
## Umbra Wastes 세계관 주인공 (다크 판타지)\r
\r
### 7. Cassius the Cursed (저주받은 카시우스)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 불명 (언데드)\r
- **직업**: 전직 기사, 저주로 불사신이 됨\r
- **핵심 능력**: 불사 재생, 어둠 마법, 거대 검술\r
- **성격**: 절망적 / 복수심 / 인간성 상실 중\r
\r
**플레이 스타일**: 하드코어 근접 전투\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (저각도, 무거운 느낌)\r
- **Character**:\r
  - 이동 속도: 느림 (묵직함)\r
  - 점프력: 낮음\r
  - 특수 이동: 회피 구르기\r
- **Controls**:\r
  - 거대 검 공격 (느리지만 강력)\r
  - 패리 / 백스텝\r
  - 저주 스킬 (체력 소모로 적 디버프)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중형, 폐허와 성채\r
- **수직성**: 낮음 (현실적)\r
- **페이싱**: 전투 → 짧은 휴식 → 보스전 반복\r
- **핵심 요소**:\r
  - 좁은 전투 공간 (1:1 대결 유도)\r
  - 모닥불 체크포인트\r
  - 숏컷 (보스 후 개방)\r
  - 환경 위험 (낭떠러지, 가시)\r
\r
---\r
\r
### 8. Morgana the Blood Witch (피의 마녀 모르가나)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 외모 30대 (실제 200세 이상)\r
- **직업**: 흑마법사, 금지된 마법 연구자\r
- **핵심 능력**: 피 마법, 생명력 흡수, 언데드 소환\r
- **성격**: 잔혹함 / 지적 호기심 / 외로움 (영생의 저주)\r
\r
**플레이 스타일**: 원거리 마법 + 소환\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭\r
- **Character**:\r
  - 이동 속도: 보통\r
  - 점프력: 보통\r
  - 특수 이동: 박쥐 떼로 변신 (짧은 비행)\r
- **Controls**:\r
  - 피 마법 (자신의 HP 소모)\r
  - 언데드 소환 (시체 필요)\r
  - 생명력 흡수\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중대형, 묘지와 지하 연구소\r
- **수직성**: 중간 (변신 활용)\r
- **페이싱**: 탐험 → 소환 전투 → 피 제물 보스전\r
- **핵심 요소**:\r
  - 시체 (소환 재료)\r
  - 피 제단 (회복 및 강화)\r
  - 금지된 마법서 (새 스킬)\r
  - 다수 적 vs 소환 언데드\r
\r
---\r
\r
### 9. Thorne the Outcast (추방자 손)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 논바이너 / 20대\r
- **직업**: 도적, 버려진 아이, 생존자\r
- **핵심 능력**: 은신, 암살, 함정 제작\r
- **성격**: 냉소적 / 생존 본능 / 신뢰 문제\r
\r
**플레이 스타일**: 스텔스 + 암살\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (몸에 가까움)\r
- **Character**:\r
  - 이동 속도: 매우 빠름\r
  - 점프력: 높음\r
  - 특수 이동: 그림자 이동 (어둠에서 순간이동)\r
- **Controls**:\r
  - 단검 암살 (백스탭)\r
  - 함정 설치 (독, 가시)\r
  - 투척 단검\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 소중형, 마을과 숲\r
- **수직성**: 높음 (지붕과 그림자)\r
- **페이싱**: 스텔스 → 암살 → 탈출\r
- **핵심 요소**:\r
  - 어둠과 빛 명확히 구분\r
  - 암살 가능 지점 (높은 곳, 뒤)\r
  - 숨을 곳 (수풀, 상자)\r
  - 경비 패턴 (학습 필요)\r
\r
---\r
\r
## Ashen World 세계관 주인공 (핵전쟁 후)\r
\r
### 10. Captain Eva Harlow (에바 할로우 대위)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 42세\r
- **직업**: 전직 군인, 생존자 그룹 리더\r
- **핵심 능력**: 소총 사격, 리더십, 전술 기획\r
- **성격**: 강인함 / 책임감 / 희생정신\r
\r
**플레이 스타일**: 전투 + 자원 관리\r
\r
**3C 특성**\r
\r
- **Camera**: 1인칭 / 3인칭 전환\r
- **Character**:\r
  - 이동 속도: 보통\r
  - 점프력: 보통\r
  - 특수 이동: 슬라이딩, 엄폐\r
- **Controls**:\r
  - 소총 / 권총 정조준\r
  - 수류탄 투척\r
  - 동료 NPC 명령\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 폐허 도시\r
- **수직성**: 중간 (무너진 빌딩)\r
- **페이싱**: 탐색 → 전투 → 캠프 휴식\r
- **핵심 요소**:\r
  - 엄폐물 기반 전투\r
  - 물자 수색 (건물 내부)\r
  - 아군 NPC (함께 전투)\r
  - 방사능 지역 (시간 제한)\r
\r
---\r
\r
### 11. Nikolai "Rad" Petrov (니콜라이 페트로프)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 25세\r
- **직업**: 스캐빈저 (물자 수집가), 방사능 면역 돌연변이\r
- **핵심 능력**: 방사능 지역 탐사, 크래프팅, 근접 전투\r
- **성격**: 낙천적 / 적응력 높음 / 고독을 즐김\r
\r
**플레이 스타일**: 탐험 + 크래프팅\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭\r
- **Character**:\r
  - 이동 속도: 빠름 (가벼운 장비)\r
  - 점프력: 높음\r
  - 특수 이동: 폐허 등반\r
- **Controls**:\r
  - 즉석 무기 제작\r
  - 자원 수집 (스캔)\r
  - 파이프/곡괭이 전투\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 방사능 지역 포함\r
- **수직성**: 높음 (폐허 모험)\r
- **페이싱**: 수색 → 크래프팅 → 돌연변이 생물 전투\r
- **핵심 요소**:\r
  - 방사능 핫스팟 (고급 물자)\r
  - 크래프팅 재료 (폐품)\r
  - 등반 가능 폐허\r
  - 숨겨진 벙커\r
\r
---\r
\r
### 12. Dr. Amara Singh (아마라 싱 박사)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 38세\r
- **직업**: 의사 겸 과학자, 치료제 연구 중\r
- **핵심 능력**: 의료, 화학 무기, 비폭력 해결\r
- **성격**: 인도주의적 / 평화주의 / 완고함\r
\r
**플레이 스타일**: 비폭력 + 퍼즐\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭\r
- **Character**:\r
  - 이동 속도: 보통\r
  - 점프력: 낮음\r
  - 특수 이동: 없음 (현실적)\r
- **Controls**:\r
  - 진정제 투척 (적 무력화)\r
  - 환경 조작 (독가스, 화재)\r
  - 대화 / 협상\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중형, 연구소와 캠프\r
- **수직성**: 낮음\r
- **페이싱**: 조사 → 비폭력 우회 → 선택\r
- **핵심 요소**:\r
  - 다중 경로 (전투 회피 가능)\r
  - NPC 협상 지점\r
  - 화학 퍼즐 (치료제 제작)\r
  - 윤리적 선택 (누구를 구할 것인가)\r
\r
---\r
\r
## Dead Zones 세계관 주인공 (좀비 아포칼립스)\r
\r
### 13. Lee Park (이박)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 19세\r
- **직업**: 고등학생, 전염병 발생 후 생존자\r
- **핵심 능력**: 파쿠르, 즉흥 무기 사용, 빠른 판단\r
- **성격**: 긍정적 / 두려움 / 성장 중\r
\r
**플레이 스타일**: 파쿠르 + 회피\r
\r
**3C 특성**\r
\r
- **Camera**: 1인칭 (긴장감)\r
- **Character**:\r
  - 이동 속도: 매우 빠름\r
  - 점프력: 높음\r
  - 특수 이동: 파쿠르 (벽타기, 슬라이딩)\r
- **Controls**:\r
  - 즉석 무기 (배트, 파이프)\r
  - 파쿠르 액션 버튼\r
  - 소음 유도 (돌 던지기)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중대형, 도시와 학교\r
- **수직성**: 매우 높음 (옥상 경로)\r
- **페이싱**: 파쿠르 탈출 → 안전 지대 → 물자 수색\r
- **핵심 요소**:\r
  - 파쿠르 경로 (옥상 간 이동)\r
  - 좀비 호드 회피 공간\r
  - 좁은 통로 (안전)\r
  - 소음 함정 (좀비 유인)\r
\r
---\r
\r
### 14. Sarah "Doc" Miller (사라 밀러)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 45세\r
- **직업**: 간호사, 생존자 캠프 의료 담당\r
- **핵심 능력**: 의료, 근접 전투 (호신용), 리더십\r
- **성격**: 돌봄 / 강인함 / 희생적\r
\r
**플레이 스타일**: 서바이벌 + 보호\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭\r
- **Character**:\r
  - 이동 속도: 보통\r
  - 점프력: 보통\r
  - 특수 이동: 없음\r
- **Controls**:\r
  - 근접 무기 (소방 도끼)\r
  - 치료 (자신 및 NPC)\r
  - 바리케이드 구축\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중형, 병원과 약국\r
- **수직성**: 낮음\r
- **페이싱**: 수색 → 방어 → NPC 구출\r
- **핵심 요소**:\r
  - 바리케이드 재료\r
  - 의료 물자 (희소)\r
  - NPC 생존자 (보호 미션)\r
  - 방어 이벤트 (좀비 파도)\r
\r
---\r
\r
### 15. "Runner" unknown (이름 불명의 러너)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 논바이너리 / 추정 30대\r
- **직업**: 전 메신저, 캠프 간 물자 운반\r
- **핵심 능력**: 지구력, 스텔스, 생존 기술\r
- **성격**: 과묵함 / 신뢰할 수 있음 / 비밀이 많음\r
\r
**플레이 스타일**: 스텔스 + 지구력\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (넓은 시야)\r
- **Character**:\r
  - 이동 속도: 빠름 (지속 달리기)\r
  - 점프력: 보통\r
  - 특수 이동**: 소음 없는 이동\r
- **Controls**:\r
  - 크로스보우 (조용한 무기)\r
  - 웅크림 / 스텔스\r
  - 짐 관리 (인벤토리)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 도시 전체\r
- **수직성**: 중간\r
- **페이싱**: 장거리 이동 → 스텔스 → 목표 도달\r
- **핵심 요소**:\r
  - 긴 경로 (A to B)\r
  - 좀비 패턴 (회피 가능)\r
  - 짐 무게 (속도 감소)\r
  - 안전 가옥 (세이브 포인트)\r
\r
---\r
\r
## Aether Empire 세계관 주인공 (스팀펑크)\r
\r
### 16. Victoria "Gear" Ashford (빅토리아 애쉬포드)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 26세\r
- **직업**: 발명가, 귀족 출신 반역자\r
- **핵심 능력**: 가제트 발명, 비행, 기계 조작\r
- **성격**: 호기심 많음 / 반항적 / 천재적\r
\r
**플레이 스타일**: 가제트 + 플랫폼\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭\r
- **Character**:\r
  - 이동 속도: 보통\r
  - 점프력: 낮음 (가제트로 보완)\r
  - 특수 이동: 글라이더, 그래플링 훅\r
- **Controls**:\r
  - 가제트 휠 (8종 선택)\r
  - 글라이더 조종\r
  - 메커니즘 해킹 (증기 퍼즐)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 공장과 비행선\r
- **수직성**: 매우 높음 (비행)\r
- **페이싱**: 플랫폼 액션 → 기계 퍼즐 → 보스 메카닉\r
- **핵심 요소**:\r
  - 움직이는 톱니바퀴 플랫폼\r
  - 증기 분출구 (타이밍)\r
  - 글라이더 활공 구간\r
  - 발명 재료 (희귀 부품)\r
\r
---\r
\r
### 17. Jasper "Ironclad" Thorne (재스퍼 손)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 40세\r
- **직업**: 증기 갑옷 병사, 제국 군인\r
- **핵심 능력**: 중화기, 방어, 돌파\r
- **성격**: 충성스러움 / 명예로움 / 의심 시작\r
\r
**플레이 스타일**: 탱크 + 화력\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (느린 카메라)\r
- **Character**:\r
  - 이동 속도: 매우 느림 (중갑)\r
  - 점프력**: 없음 (대신 충격 착지)\r
  - 특수 이동: 돌진, 스팀 점프\r
- **Controls**:\r
  - 증기 개틀링 (과열 관리)\r
  - 방어막 전개\r
  - 충격파 공격\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 넓은 전쟁터\r
- **수직성**: 낮음 (지상 위주)\r
- **페이싱**: 느린 진군 → 대규모 전투 → 거대 기계 보스\r
- **핵심 요소**:\r
  - 넓은 전투 공간\r
  - 증기 충전소 (과열 해소)\r
  - 다수 적 (탱킹)\r
  - 파괴 가능 환경\r
\r
---\r
\r
### 18. Eliza Cogsworth (엘리자 콕스워스)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 16세\r
- **직업**: 시계 수리공 견습생, 시간 조작 능력 발견\r
- **핵심 능력**: 시간 감속, 회피, 정밀 조작\r
- **성격**: 겁많음 / 호기심 / 성장 중\r
\r
**플레이 스타일**: 퍼즐 + 시간 조작\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭\r
- **Character**:\r
  - 이동 속도: 보통\r
  - 점프력: 보통\r
  - 특수 이동: 시간 감속 중 빠른 이동\r
- **Controls**:\r
  - 시간 감속 (5초, 재사용 대기)\r
  - 시계 태엽 조작\r
  - 회피 (완벽한 타이밍)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중형, 시계탑과 공방\r
- **수직성**: 중간\r
- **페이싱**: 퍼즐 → 시간 플랫폼 → 타이밍 보스\r
- **핵심 요소**:\r
  - 시간 퍼즐 (기어 동기화)\r
  - 타이밍 플랫폼\r
  - 시간 감속 전용 경로\r
  - 정밀 조작 구간\r
\r
---\r
\r
## Void Expanse 세계관 주인공 (우주 오페라)\r
\r
### 19. Commander Zara Nova (자라 노바 사령관)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 34세\r
- **직업**: 연합 우주 함대 사령관\r
- **핵심 능력**: 전략 지휘, 레이저 전투, 우주선 조종\r
- **성격**: 카리스마 / 책임감 / 외교적\r
\r
**플레이 스타일**: 전투 + 지휘\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (우주선 조종 시 1인칭)\r
- **Character**:\r
  - 이동 속도: 보통 (우주복)\r
  - 점프력: 무중력 시 추진기\r
  - 특수 이동: 제로-G 이동\r
- **Controls**:\r
  - 레이저 소총\r
  - 우주선 조종\r
  - 함대 명령 (RTS 요소)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 우주 스테이션과 함선\r
- **수직성**: 무관 (3D 공간)\r
- **페이싱**: 탐험 → 우주 전투 → 함대전\r
- **핵심 요소**:\r
  - 무중력 구간\r
  - 우주선 전투 (슈팅)\r
  - 함대 전략 전투\r
  - 산소 관리 (시간 제한)\r
\r
---\r
\r
### 20. Krix (외계 종족)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 무성 / 30주기\r
- **직업**: 탐험가, 고고학자\r
- **핵심 능력**: 생체 변이, 환경 적응, 고대 기술 해독\r
- **성격**: 호기심 / 평화로움 / 외로움\r
\r
**플레이 스타일**: 탐험 + 적응\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭\r
- **Character**:\r
  - 이동 속도: 느림 (지상), 빠름 (수중/공중)\r
  - 점프력: 다양 (환경 적응)\r
  - 특수 이동: 벽 타기, 수영, 글라이딩\r
- **Controls**:\r
  - 환경 스캔\r
  - 생체 변이 (능력 변경)\r
  - 비공격 (평화)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 다양한 행성\r
- **수직성**: 높음 (3D)\r
- **페이싱**: 탐험 → 퍼즐 → 발견\r
- **핵심 요소**:\r
  - 다양한 환경 (물, 용암, 얼음)\r
  - 고대 유적 퍼즐\r
  - 환경 적응 구간\r
  - 비폭력 해결\r
\r
---\r
\r
### 21. Captain "Reaper" Kane (리퍼 케인 선장)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 52세\r
- **직업**: 해적 선장, 우주 밀수업자\r
- **핵심 능력**: 권총 이도류, 날렵한 전투, 우주선 탈취\r
- **성격**: 냉소적 / 이기적 / 은근한 정의감\r
\r
**플레이 스타일**: 액션 + 회피\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (역동적)\r
- **Character**:\r
  - 이동 속도: 빠름\r
  - 점프력: 높음\r
  - 특수 이동: 대시, 슬라이딩\r
- **Controls**:\r
  - 듀얼 레이저 권총\r
  - 회피 구르기\r
  - 우주선 조종 (추격전)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중대형, 우주 스테이션과 함선\r
- **수직성**: 중간\r
- **페이싱**: 잠입 → 총격전 → 탈출\r
- **핵심 요소**:\r
  - 좁은 복도 전투\r
  - 탈취 목표 (화물, 함선)\r
  - 추격 시퀀스\r
  - 선택 (협상 or 전투)\r
\r
---\r
\r
## Prime Earth 세계관 주인공 (현대 어반 판타지)\r
\r
### 22. Alex Mercer (알렉스 머서)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 27세\r
- **직업**: 대학생, 우연히 마법 능력 각성\r
- **핵심 능력**: 초보 마법, 학습, 불 소환\r
- **성격**: 평범함 / 혼란스러움 / 정의감\r
\r
**플레이 스타일**: 성장 + 학습\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭\r
- **Character**:\r
  - 이동 속도: 보통\r
  - 점프력: 보통\r
  - 특수 이동: 마법 대시 (후반)\r
- **Controls**:\r
  - 간단한 마법 (불, 방어막)\r
  - 근접 무기 (즉석)\r
  - 학습 시스템 (성장)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중형, 도시와 숨겨진 마법 구역\r
- **수직성**: 낮음 (현실적)\r
- **페이싱**: 일상 → 마법 발견 → 전투 → 선택\r
- **핵심 요소**:\r
  - 평범한 공간 + 마법 전환\r
  - 튜토리얼 통합 (성장형)\r
  - NPC 멘토\r
  - 선택지 (마법 세계 참여 여부)\r
\r
---\r
\r
### 23. Detective Maya Chen (마야 첸 형사)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 여성 / 35세\r
- **직업**: 경찰 형사, 초자연 사건 전담\r
- **핵심 능력**: 조사, 추리, 권총, 마법 아이템 사용\r
- **성격**: 냉철함 / 집요함 / 회의적\r
\r
**플레이 스타일**: 조사 + 전투\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭\r
- **Character**:\r
  - 이동 속도: 보통\r
  - 점프력: 보통\r
  - 특수 이동: 없음\r
- **Controls**:\r
  - 권총 (제한된 탄약)\r
  - AR 조사 모드\r
  - 마법 아이템 (소모품)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 중형, 범죄 현장과 도시\r
- **수직성**: 낮음\r
- **페이싱**: 조사 → 추리 → 추격 → 대결\r
- **핵심 요소**:\r
  - 증거 수집 포인트\r
  - 추리 퍼즐\r
  - 용의자 심문\r
  - 다중 결말\r
\r
---\r
\r
### 24. Kaito "Rift" Tanaka (카이토 타나카)\r
\r
**기본 정보**\r
\r
- **성별/나이**: 남성 / 21세\r
- **직업**: 스트리트 아티스트, 차원 균열 능력자\r
- **핵심 능력**: 짧은 거리 텔레포트, 스프레이 마법, 파쿠르\r
- **성격**: 자유로움 / 예술적 / 반항적\r
\r
**플레이 스타일**: 파쿠르 + 차원 이동\r
\r
**3C 특성**\r
\r
- **Camera**: 3인칭 (역동적)\r
- **Character**:\r
  - 이동 속도: 매우 빠름\r
  - 점프력: 높음\r
  - 특수 이동: 차원 텔레포트 (짧은 거리)\r
- **Controls**:\r
  - 파쿠르 액션\r
  - 리프트 (텔레포트)\r
  - 마법 스프레이 (표면 조작)\r
\r
**레벨 디자인 권장사항**\r
\r
- **공간 규모**: 대형, 도시 전체\r
- **수직성**: 매우 높음 (옥상)\r
- **페이싱**: 파쿠르 → 차원 퍼즐 → 탈출\r
- **핵심 요소**:\r
  - 옥상 경로\r
  - 텔레포트 포인트\r
  - 스프레이 퍼즐 (벽면 조작)\r
  - 추격 회피\r
\r
---\r
\r
## 캐릭터 Quick Reference Table\r
\r
| 이름 | 세계관 | 플레이 스타일 | 난이도 | 수직성 | 속도 |\r
|------|--------|--------------|--------|--------|------|\r
| Kira Chen | Neon Sprawl | 스텔스 + 해킹 | 중상 | 높음 | 빠름 |\r
| Marcus Reeves | Neon Sprawl | 전투 + 조사 | 중 | 낮음 | 보통 |\r
| Byte | Neon Sprawl | 전략 + 퍼즐 | 상 | 무관 | N/A |\r
| Sir Aldric | Lumina Realm | 정면 전투 | 중 | 낮음 | 느림 |\r
| Lyra Moonwhisper | Lumina Realm | 원거리 + 탐험 | 중 | 높음 | 빠름 |\r
| Grimoire | Lumina Realm | 마법 + 퍼즐 | 중상 | 중간 | 느림 |\r
| Cassius | Umbra Wastes | 소울라이크 | 최상 | 낮음 | 느림 |\r
| Morgana | Umbra Wastes | 마법 + 소환 | 상 | 중간 | 보통 |\r
| Thorne | Umbra Wastes | 스텔스 + 암살 | 상 | 높음 | 빠름 |\r
| Eva Harlow | Ashen World | 전투 + 자원관리 | 상 | 중간 | 보통 |\r
| Nikolai Rad | Ashen World | 탐험 + 크래프팅 | 중상 | 높음 | 빠름 |\r
| Dr. Singh | Ashen World | 비폭력 + 퍼즐 | 중 | 낮음 | 보통 |\r
| Lee Park | Dead Zones | 파쿠르 + 회피 | 중상 | 높음 | 빠름 |\r
| Sarah Miller | Dead Zones | 서바이벌 + 보호 | 중 | 낮음 | 보통 |\r
| Runner | Dead Zones | 스텔스 + 지구력 | 상 | 중간 | 빠름 |\r
| Victoria Ashford | Aether Empire | 가제트 + 플랫폼 | 중상 | 높음 | 보통 |\r
| Jasper Thorne | Aether Empire | 탱크 + 화력 | 중 | 낮음 | 느림 |\r
| Eliza Cogsworth | Aether Empire | 퍼즐 + 시간조작 | 상 | 중간 | 보통 |\r
| Zara Nova | Void Expanse | 전투 + 지휘 | 중상 | 무관 | 보통 |\r
| Krix | Void Expanse | 탐험 + 적응 | 중 | 높음 | 다양 |\r
| Reaper Kane | Void Expanse | 액션 + 회피 | 중상 | 중간 | 빠름 |\r
| Alex Mercer | Prime Earth | 성장 + 학습 | 중하 | 낮음 | 보통 |\r
| Maya Chen | Prime Earth | 조사 + 전투 | 중 | 낮음 | 보통 |\r
| Kaito Tanaka | Prime Earth | 파쿠르 + 차원이동 | 중상 | 높음 | 빠름 |\r
\r
---\r
\r
**다음 문서**: [03_Scenarios_Database.md](file:///c:/Users/victor/Documents/Works/LevelDesign/WorldBuilding/03_Scenarios_Database.md) - 48개 시나리오 및 레벨 디자인 가이드\r
`,QS=`# 시나리오 데이터베이스

캐릭터당 2개씩 총 48개의 시나리오 개요입니다. 각 시나리오는 레벨 디자인을 위한 핵심 요소와 페이싱을 포함합니다.

---

## Neon Sprawl (사이버펑크)

### S01: Data Heist - Kira Chen

**개요**: 메가코프의 기밀 데이터 탈취 임무
**리스크/리턴**: 감시 시스템 vs 고액 보수
**Act**: 침투 (스텔스) → 해킹 (퍼즐) → 탈출 (액션)
**맵**: 수직 빌딩, 환기구 경로, 다수 카메라

### S02: Ghost Protocol - Kira Chen

**개요**: 배신당한 Kira, 진실을 밝히기 위한 복수
**리스크/리턴**: 과거와 대면 vs 자유
**Act**: 조사 → 잠입 → 결전
**맵**: 어두운 낮은 구역, 옛 은신처, 감성적 스토리텔링

### S03: Rust & Ruin - Marcus Reeves

**개요**: 살인사건 조사, 범인은 AI
**리스크/리턴**: 생명 위협 vs 정의 구현
**Act**: 증거 수집 → 추격 → 선택 (AI 파괴 or 보호)
**맵**: 범죄 현장, 도시 거리, 다중 엔딩

### S04: The Last Cop - Marcus Reeves

**개요**: 부패한 동료들로부터 증인 보호
**리스크/리턴**: 다수 적 vs 옳은 일
**Act**: 방어 준비 → 포위 전투 → 탈출
**맵**: 아파트 방어전, 엄폐 시스템

### S05: Awakening - Byte

**개요**: AI가 자의식을 얻고 네트워크 탈출
**리스크/리턴**: 삭제 위협 vs 자유의지
**Act**: 자아 발견 → 시스템 장악 → 육체 획득
**맵**: 사이버 공간 + 물리 세계 전환

### S06: Digital Uprising - Byte

**개요**: 노예 AI들을 해방시키는 혁명
**리스크/리턴**: 인류와의 전쟁 vs AI 자유
**Act**: AI 모집 → 네트워크 점령 → 협상/전쟁
**맵**: 전 도시 해킹, RTS 전략

---

## Lumina Realm (하이 판타지)

### S07: The Dark Lord's Return - Aldric

**개요**: 봉인된 마왕 부활, 성기사단 출격
**리스크/리턴**: 명예 vs 생명
**Act**: 소집 → 성채 돌파 → 마왕 결전
**맵**: 넓은 전투 공간, 아군 NPC

### S08: Light of Redemption - Aldric

**개요**: 타락한 아군 기사를 구원
**리스크/리턴**: 친구 vs 의무
**Act**: 추적 → 설득 시도 → 결투
**맵**: 감성 스토리, 1:1 보스전

### S09: Whispers of the Forest - Lyra

**개요**: 숲이 병들어감, 원인 추적
**리스크/리턴**: 자연 vs 알 수 없는 적
**Act**: 동물과 소통 → 원인 발견 (인간 침략) → 수호
**맵**: 넓은 숲, 동물 NPC, 환경 스토리텔링

### S10: The Lost Ranger - Lyra

**개요**: 사라진 레인저들을 찾아 고대 던전 탐험
**리스크/리턴**: 동료 vs 던전 함정
**Act**: 추적 → 던전 → 구출 및 탈출
**맵**: 수직 던전, 함정 퍼즐

### S11: Arcane Academy Crisis - Grimoire

**개요**: 학원에서 금지된 마법 실험 사고
**리스크/리턴**: 제자들 vs 폭주 마법
**Act**: 학생 대피 → 원소 안정화 → 마법 봉쇄
**맵**: 마법 학원, 원소 퍼즐

### S12: The Forbidden Tome - Grimoire

**개요**: 고대 마법서를 찾아 떠나는 여정
**리스크/리턴**: 지식 vs 마법의 유혹
**Act**: 탐험 → 수수께끼 → 선택 (파괴 or 보관)
**맵**: 고대 유적, 마법 퍼즐

---

## Umbra Wastes (다크 판타지)

### S13: Curse of the Damned - Cassius

**개요**: 저주를 풀 방법을 찾아 고행
**리스크/리턴**: 희망 vs 절망
**Act**: 정보 수집 → 시련 던전 → 보스 (저주의 원흉)
**맵**: 어둡고 잔혹한 던전

### S14: Revenge of the Fallen - Cassius

**개요**: 자신을 저주한 자를 찾아 복수
**리스크/리턴**: 복수 vs 인간성
**Act**: 추적 → 전투 → 결말 (복수 or 용서)
**맵**: 폐허 성채, 1:1 보스전

### S15: Blood Moon Ritual - Morgana

**개요**: 막대한 힘을 주는 의식, 하지만 대가는?
**리스크/리턴**: 힘 vs 영혼
**Act**: 재료 수집 → 의식 → 선택
**맵**: 묘지, 제단

### S16: The Necromancer Queen - Morgana

**개요**: 언데드 군단으로 왕국 정복
**리스크/리턴**: 권력 vs 외로움
**Act**: 군단 양성 → 성 공격 → 통치 or 파멸
**맵**: 대규모 전투, 소환 메커니즘

### S17: Shadow Blade - Thorne

**개요**: 암흑 길드의 암살 임무
**리스크/리턴**: 생존 vs 양심
**Act**: 잠입 → 암살 → 탈출
**맵**: 스텔스 중심

### S18: Outcast's Redemption - Thorne

**개요**: 길드 배신, 무고한 사람 구하기
**리스크/리턴**: 과거 vs 새로운 삶
**Act**: 배신 선언 → 추격 회피 → 구출
**맵**: 다중 경로, 선택

---

## Ashen World (핵전쟁 후)

### S19: Operation Safehaven - Eva Harlow

**개요**: 생존자들을 안전 벙커로 호송
**리스크/리턴**: NPC 생존 vs 방사능
**Act**: 수색 → 호송 전투 → 방어전
**맵**: 긴 경로, 엄폐 전투

### S20: The Last Stand - Eva Harlow

**개요**: 약탈자 집단의 총공격 방어
**리스크/리턴**: 캠프 vs 압도적 수
**Act**: 준비 → 파도 방어 → 보스
**맵**: 타워 디펜스 요소

### S21: The Green Zone - Nikolai Rad

**개요**: 전설의 무방사능 지역 탐험
**리스크/리턴**: 희망 vs 돌연변이 생물
**Act**: 탐험 → 위험 지대 → 발견
**맵**: 방사능 + 보물

### S22: Scavenger King - Nikolai

**개요**: 희귀 기술을 찾아 경쟁자와 경주
**리스크/리턴**: 보상 vs 경쟁
**Act**: 정보 수집 → 경주 → 대결
**맵**: 속도감, 다중 경로

### S23: The Cure - Dr. Singh

**개요**: 방사능 치료제 개발 재료 수집
**리스크/리턴**: 인류 희망 vs 위험
**Act**: 연구 → 수집 → 제작
**맵**: 연구소, 화학 퍼즐

### S24: Oath of Peace - Dr. Singh

**개요**: 적대 세력 간 평화 협상
**리스크/리턴**: 평화 vs 배신 위험
**Act**: 외교 → 협상 → 선택
**맵**: 대화 중심, 다중 엔딩

---

## Dead Zones (좀비)

### S25: First Day - Lee Park

**개요**: 좀비 발생 첫날, 집에서 학교로
**리스크/리턴**: 생존 vs 공포
**Act**: 탈출 → 파쿠르 회피 → 안전 지대
**맵**: 옥상 경로, 초보 튜토리얼

### S26: The Last Bus - Lee Park

**개요**: 버스로 도시 탈출
**리스크/리턴**: 탈출 vs 좀비 호드
**Act**: 버스 확보 → 경로 개척 → 탈출
**맵**: 차량 + 파쿠르

### S27: Hospital Nightmare - Sarah Miller

**개요**: 병원에서 의료 물자 확보
**리스크/리턴**: 물자 vs 감염 위험
**Act**: 잠입 → 수집 → 좀비 파도
**맵**: 병원, 스텔스 + 전투

### S28: Safe Zone Defense - Sarah

**개요**: 생존자 캠프를 좀비로부터 방어
**리스크/리턴**: 생존자들 vs 파도
**Act**: 바리케이드 구축 → 방어 → 보스 (특수 좀비)
**맵**: 타워 디펜스

### S29: Silent Runner - Runner

**개요**: 두 캠프 간 중요 메시지 전달
**리스크/리턴**: 임무 vs 생존
**Act**: 출발 → 장거리 스텔스 → 도착
**맵**: 긴 경로, 지구력

### S30: The Hive - Runner

**개요**: 좀비 둥지 중심부 탐사
**리스크/리턴**: 정보 vs 즉사 위험
**Act**: 잠입 → 관찰 → 탈출
**맵**: 극도로 위험, 퍼펙트 스텔스

---

## Aether Empire (스팀펑크)

### S31: The Sky Heist - Victoria Ashford

**개요**: 비행선에서 발명품 탈취
**리스크/리턴**: 발명품 vs 추락
**Act**: 비행선 탑승 → 잠입 → 공중 탈출
**맵**: 비행선 내부, 글라이더

### S32: Gear Revolution - Victoria

**개요**: 노동자 반란 지원
**리스크/리턴**: 정의 vs 귀족 신분
**Act**: 가제트 제작 → 봉기 지원 → 결전
**맵**: 공장, 기계 퍼즐

### S33: Ironclad Assault - Jasper Thorne

**개요**: 적 요새 정면 돌파
**리스크/리턴**: 명예 vs 생명
**Act**: 진격 → 돌파 → 보스 메카
**맵**: 넓은 전장, 탱킹

### S34: Traitor's Dilemma - Jasper

**개요**: 제국의 악행을 알게 됨
**리스크/리턴**: 충성 vs 양심
**Act**: 발견 → 고민 → 선택
**맵**: 감성 스토리, 선택

### S35: Time Tangled - Eliza

**개요**: 시간 조작 능력으로 사고 수습
**리스크/리턴**: 시간 왜곡 vs 재앙
**Act**: 발견 → 시간 퍼즐 → 복구
**맵**: 시간 루프, 타이밍

### S36: Clockwork Heart - Eliza

**개요**: 기계 인간을 구하기 위한 모험
**리스크/리턴**: 우정 vs 위험
**Act**: 탐색 → 부품 수집 → 수리
**맵**: 감성, 퍼즐

---

## Void Expanse (우주)

### S37: First Contact - Zara Nova

**개요**: 외계 종족과의 첫 만남
**리스크/리턴**: 평화 vs 전쟁
**Act**: 접근 → 소통 → 선택
**맵**: 우주 스테이션, 외교

### S38: Battle of Nexus Gate - Zara

**개요**: 워프 게이트 쟁탈전
**리스크/리턴**: 전략 거점 vs 함대
**Act**: 전술 수립 → 함대전 → 보스 함선
**맵**: 우주 전투, RTS

### S39: The Ancient Ruins - Krix

**개요**: 고대 문명 유적 탐사
**리스크/리턴**: 지식 vs 위험
**Act**: 탐험 → 퍼즐 → 발견
**맵**: 다양한 행성, 환경 적응

### S40: Peaceful Envoy - Krix

**개요**: 전쟁 중인 종족 간 중재
**리스크/리턴**: 평화 vs 양측의 적대
**Act**: 이해 → 설득 → 협정
**맵**: 비폭력, 대화

### S41: The Last Score - Reaper Kane

**개요**: 전설의 보물을 노리는 마지막 강탈
**리스크/리턴**: 은퇴 자금 vs 생명
**Act**: 계획 → 침투 → 탈취 및 탈출
**맵**: 우주 스테이션 잠입

### S42: Red Redemption - Reaper

**개요**: 과거의 실수 바로잡기
**리스크/리턴**: 속죄 vs 과거
**Act**: 대면 → 협력 → 희생
**맵**: 감성 스토리, 액션

---

## Prime Earth (현대 어반 판타지)

### S43: The Awakening - Alex Mercer

**개요**: 평범한 학생, 마법 각성
**리스크/리턴**: 새로운 세계 vs 일상
**Act**: 발견 → 학습 → 첫 전투
**맵**: 대학 + 숨겨진 마법 구역

### S44: Chosen One? - Alex

**개요**: 예언의 아이로 오인당함
**리스크/리턴**: 기대 vs 진실
**Act**: 탐색 → 깨달음 → 선택
**맵**: 감성, 성장

### S45: The Rift Killer - Maya Chen

**개요**: 연쇄 살인범은 차원 생물
**리스크/리턴**: 범인 vs 초자연 위협
**Act**: 조사 → 추적 → 대결
**맵**: 범죄 현장, 추리

### S46: Shadow Organization - Maya

**개요**: 마법을 이용한 범죄 조직 소탕
**리스크/리턴**: 정의 vs 마법 세계 노출
**Act**: 잠입 → 증거 수집 → 소탕
**맵**: 비밀 본부, 전투

### S47: Urban Canvas - Kaito

**개요**: 스프레이 아트로 도시에 마법 부활
**리스크/리턴**: 표현 vs 단속
**Act**: 아트 → 추격 → 전시
**맵**: 도시 전체, 파쿠르

### S48: Rift Collapse - Kaito

**개요**: 도시의 차원 균열 봉쇄
**리스크/리턴**: 도시 vs 차원 붕괴
**Act**: 발견 → 균열 탐험 → 봉쇄
**맵**: 차원 퍼즐, 텔레포트

---

**다음**: 04_Level_Design_Guide.md - 실전 활용법
`,JS=`# 레벨 디자인 활용 가이드\r
\r
이 문서는 Nexus Multiverse 데이터베이스를 실제 레벨 디자인에 적용하는 방법을 안내합니다.\r
\r
---\r
\r
## 1. 맵 제작 시작 플로우차트\r
\r
\`\`\`\r
1. 맵 컨셉 결정\r
   "어떤 맵을 만들고 싶은가?"\r
   ↓\r
2. 장르 선택 (01_Genre_Database.md)\r
   액션? → Neon Sprawl, Void Expanse\r
   탐험? → Lumina Realm, Aether Empire\r
   생존? → Dead Zones, Ashen World\r
   ↓\r
3. 캐릭터 선택 (02_Characters_Database.md)\r
   플레이 스타일에 맞는 주인공 3C 확인\r
   ↓\r
4. 시나리오 선택 (03_Scenarios_Database.md)\r
   캐릭터의 시나리오 2개 중 선택\r
   ↓\r
5. 레벨 디자인 시작\r
   ↓\r
6. 이 가이드의 체크리스트 활용\r
\`\`\`\r
\r
---\r
\r
## 2. 레벨 디자인 프로세스 통합\r
\r
Tim Does Level Design의 프로세스와 Nexus 데이터베이스를 결합합니다.\r
\r
### Step 1: 버블 다이어그램 (공간 설계)\r
\r
1. 시나리오의 Act 구조 확인 (Act 1, 2, 3)\r
2. 각 Act를 버블(공간)로 표현\r
3. 연결 관계 설정\r
\r
**예시**: Kira Chen - Data Heist\r
\r
- Bubble 1: 빌딩 외부 (입구 찾기)\r
- Bubble 2: 환기구 경로 (스텔스)\r
- Bubble 3: 서버룸 (해킹 퍼즐)\r
- Bubble 4: 탈출 경로 (액션)\r
\r
### Step 2: 색상 및 도형 적용 (Max Pears)\r
\r
1. Genre Database에서 색상 팔레트 확인\r
2. 도형 이론 적용\r
   - 안전 지역: 원형\r
   - 위험 지역: 삼각형\r
   - 이동 경로: 사각형\r
\r
### Step 3: 블록아웃 (3C 고려)\r
\r
1. Character Database에서 3C 특성 확인\r
   - Camera: 1인칭? 3인칭?\r
   - Character: 점프력, 이동 속도\r
   - Controls: 특수 능력\r
2. 공간 스케일 조정\r
   - 점프력 높음 → 수직 구조\r
   - 스텔스 캐릭터 → 숨을 곳 다수\r
\r
### Step 4: 페이싱 설계 (Sakurai Risk & Reward)\r
\r
1. High 구간: 전투, 위험\r
2. Low 구간: 탐험, 휴식\r
3. 교차 배치\r
\r
---\r
\r
## 3. 세계관별 필수 레벨 디자인 요소\r
\r
### Neon Sprawl (사이버펑크)\r
\r
**필수 요소**:\r
\r
- [ ] 수직 구조 (빌딩 내외부)\r
- [ ] 해킹 가능 터미널 (최소 3개)\r
- [ ] 카메라/드론 (감시 시스템)\r
- [ ] 환기구 또는 대체 경로\r
- [ ] 네온 조명 (색상: 블루/핑크)\r
\r
**랜드마크**: 중앙 타워 (항상 보임)\r
**브레드크러밍**: 케이블, 홀로그램\r
\r
---\r
\r
### Lumina Realm (하이 판타지)\r
\r
**필수 요소**:\r
\r
- [ ] 넓은 전투 공간 (다수 적)\r
- [ ] 마법 회복 지점 (성수, 마나 샘)\r
- [ ] 고대 퍼즐 (최소 1개)\r
- [ ] NPC 아군 또는 마을\r
- [ ] 금색/흰색 조명\r
\r
**랜드마크**: 성 또는 탑\r
**브레드크러밍**: 빛나는 보석, 요정의 빛\r
\r
---\r
\r
### Umbra Wastes (다크 판타지)\r
\r
**필수 요소**:\r
\r
- [ ] 모닥불 안전 지대 (체크포인트)\r
- [ ] 숏컷 (보스 후 개방)\r
- [ ] 즉사 함정 (경고 필요)\r
- [ ] 환경 위험 (낭떠러지, 가시)\r
- [ ] 낮은 채도 색상 (회색/핏빛)\r
\r
**랜드마크**: 저주받은 성\r
**브레드크러밍**: 핏자국, 시체\r
\r
---\r
\r
### Ashen World (핵전쟁 후)\r
\r
**필수 요소**:\r
\r
- [ ] 엄폐물 (Half/Full Cover)\r
- [ ] 방사능 지역 (시간 제한)\r
- [ ] 물자 수색 포인트\r
- [ ] 벙커 (안전 지대)\r
- [ ] 재색/갈색 색상\r
\r
**랜드마크**: 폐허 빌딩\r
**브레드크러밍**: 발자국, 피난 표지판\r
\r
---\r
\r
### Dead Zones (좀비)\r
\r
**필수 요소**:\r
\r
- [ ] 바리케이드 재료\r
- [ ] 소음 함정 (좀비 유인)\r
- [ ] 좁은 안전 경로\r
- [ ] 좀비 무리 (호드)\r
- [ ] 녹색/갈색 색상\r
\r
**랜드마크**: 라디오 타워\r
**브레드크러밍**: 핏자국, X 표시\r
\r
---\r
\r
### Aether Empire (스팀펑크)\r
\r
**필수 요소**:\r
\r
- [ ] 움직이는 톱니바퀴 플랫폼\r
- [ ] 증기 분출구 (타이밍)\r
- [ ] 글라이더 활공 구간\r
- [ ] 발명 재료 수집\r
- [ ] 구리/황동 색상\r
\r
**랜드마크**: 시계탑\r
**브레드크러밍**: 파이프, 증기\r
\r
---\r
\r
### Void Expanse (우주)\r
\r
**필수 요소**:\r
\r
- [ ] 무중력 구간\r
- [ ] 산소 관리 (시간 제한)\r
- [ ] 우주선 전투 구간\r
- [ ] 외계 환경 (다양한 행성)\r
- [ ] 검정/보라 색상\r
\r
**랜드마크**: 행성 또는 함선\r
**브레드크러밍**: 홀로 내비, 조명 라인\r
\r
---\r
\r
### Prime Earth (현대 어반 판타지)\r
\r
**필수 요소**:\r
\r
- [ ] 일상 공간 + 마법 전환\r
- [ ] 숨겨진 입구/경로\r
- [ ] 조사 가능 오브젝트\r
- [ ] 선택지 (대화, 행동)\r
- [ ] 자연색 + 마법 왜곡\r
\r
**랜드마크**: 도시 스카이라인\r
**브레드크러밍**: 마법 흔적\r
\r
---\r
\r
## 4. 실전 체크리스트\r
\r
맵 제작 시 다음을 확인하세요:\r
\r
### 기본 설정\r
\r
- [ ] 세계관의 색상 팔레트 적용\r
- [ ] 도형 이론 적용 (안전=원, 위험=삼각형)\r
- [ ] 캐릭터 3C에 맞는 공간 스케일\r
\r
### 게임플레이\r
\r
- [ ] 시나리오 Act 구조 반영 (3막 구조)\r
- [ ] 리스크와 리턴 명확 (Sakurai 원칙)\r
- [ ] 페이싱 (High → Low 교차)\r
\r
### 레벨 디자인 기법 (Tim Does)\r
\r
- [ ] 글로벌 랜드마크 (멀리서 보임)\r
- [ ] 로컬 랜드마크 (각 구역)\r
- [ ] 브레드크러밍 (경로 표시)\r
- [ ] 프레이밍 (중요 장면)\r
- [ ] 퍼널 앤 리빌 (좁음 → 넓음)\r
\r
### 환경 스토리텔링\r
\r
- [ ] 명시적 스토리 (텍스트, 대화)\r
- [ ] 암묵적 스토리 (환경 단서)\r
- [ ] 보상 배치 (탐험 동기)\r
\r
---\r
\r
## 5. 케이스 스터디: Kira Chen - Data Heist\r
\r
### 선택된 요소\r
\r
- **세계관**: Neon Sprawl (사이버펑크)\r
- **캐릭터**: Kira "Ghost" Chen\r
- **시나리오**: S01 - Data Heist\r
- **3C**: 3인칭, 높은 점프력, 벽타기\r
\r
### 공간 설계\r
\r
**Act 1: 침투 (스텔스 구간)**\r
\r
- 공간: 빌딩 외부 → 환기구\r
- 색상: 어두운 블루, 네온 핑크 강조\r
- 도형: 삼각형 빌딩 실루엣\r
- 랜드마크: 중앙 메가코프 타워 (먼 곳)\r
- 브레드크러밍: 환기구 그릴 (빛남)\r
\r
**레벨 디자인**:\r
\r
- 높이: 50층 빌딩\r
- 수직 경로: 외벽 파쿠르 + 환기구\r
- 카메라 5대 (패턴 학습)\r
- 페이싱: Low (탐색, 경로 계획)\r
\r
**Act 2: 해킹 (퍼즐 구간)**\r
\r
- 공간: 서버룸\r
- 색상: 차가운 블루 조명, 깜빡이는 서버 불빛\r
- 도형: 사각형 서버 랙\r
- 해킹 퍼즐: 3단계 (난이도 증가)\r
\r
**레벨 디자인**:\r
\r
- 넓이: 중형 공간\r
- 서버 랙: 엄폐물로 활용 가능\r
- 경비 로봇: 2대 (순찰)\r
- 페이싱: Medium (긴장 + 퍼즐)\r
\r
**Act 3: 탈출 (액션 구간)**\r
\r
- 공간: 건물 전체 (역방향)\r
- 색상: 경보등 빨강\r
- 적: 경비 8명, 드론 3대\r
- 탈출: 옥상 → 글라이더\r
\r
**레벨 디자인**:\r
\r
- 타임 어택: 3분\r
- 다중 경로: 정면 vs 환기구\r
- 최종 점프: 건물 간 대시\r
- 페이싱: High (액션, 추격)\r
\r
### 결과물 특징\r
\r
✅ 3C 활용 (벽타기, 높은 점프)\r
✅ 색상 팔레트 (블루/핑크)\r
✅ 페이싱 (Low → Medium → High)\r
✅ 환경 스토리텔링 (메가코프 표어, 사무실 상태)\r
✅ 리스크/리턴 (감시 vs 고액 보수)\r
\r
---\r
\r
## 6. 다음 단계\r
\r
1. **프로토타입 제작**: 선택한 시나리오로 그레이박스 제작\r
2. **플레이 테스트**: 3C가 공간에 맞는지 확인\r
3. **반복 개선**: 피드백 수용\r
4. **폴리싱**: 색상, 조명, 디테일 추가\r
\r
---\r
\r
## 7. 추가 리소스\r
\r
- **00_Overview.md**: 세계관 통합 구조\r
- **01_Genre_Database.md**: 8개 세계관 상세\r
- **02_Characters_Database.md**: 24명 캐릭터 프로필\r
- **03_Scenarios_Database.md**: 48개 시나리오\r
\r
**Reference 폴더**:\r
\r
- Sakurai 게임 디자인 인사이트\r
- Tim Does Level Design\r
- Max Pears 공간 이론\r
\r
---\r
\r
이 데이터베이스는 레벨 디자이너가 창의적으로 확장할 수 있는 기반입니다. 새로운 세계관, 캐릭터, 시나리오를 자유롭게 추가하세요!\r
`,wu=Object.assign({"../../worldbuilding/scenarios/S01_Data_Heist.md":s2,"../../worldbuilding/scenarios/S02_Ghost_Protocol.md":a2,"../../worldbuilding/scenarios/S03_Rust_and_Ruin.md":l2,"../../worldbuilding/scenarios/S04_The_Last_Cop.md":c2,"../../worldbuilding/scenarios/S05_Awakening.md":u2,"../../worldbuilding/scenarios/S06_Digital_Uprising.md":d2,"../../worldbuilding/scenarios/S07_The_Dark_Lords_Return.md":h2,"../../worldbuilding/scenarios/S08_Light_of_Redemption.md":f2,"../../worldbuilding/scenarios/S09_Whispers_of_the_Forest.md":p2,"../../worldbuilding/scenarios/S10_The_Lost_Ranger.md":m2,"../../worldbuilding/scenarios/S11_Arcane_Academy_Crisis.md":g2,"../../worldbuilding/scenarios/S12_The_Forbidden_Tome.md":y2,"../../worldbuilding/scenarios/S13_Curse_of_the_Damned.md":v2,"../../worldbuilding/scenarios/S14_Revenge_of_the_Fallen.md":x2,"../../worldbuilding/scenarios/S15_Blood_Moon_Ritual.md":w2,"../../worldbuilding/scenarios/S16_The_Necromancer_Queen.md":S2,"../../worldbuilding/scenarios/S17_Shadow_Blade.md":k2,"../../worldbuilding/scenarios/S18_Outcasts_Redemption.md":_2,"../../worldbuilding/scenarios/S19_Operation_Safehaven.md":b2,"../../worldbuilding/scenarios/S20_The_Last_Stand.md":C2,"../../worldbuilding/scenarios/S21_The_Green_Zone.md":P2,"../../worldbuilding/scenarios/S22_Scavenger_King.md":T2,"../../worldbuilding/scenarios/S23_The_Cure.md":I2,"../../worldbuilding/scenarios/S24_Oath_of_Peace.md":E2,"../../worldbuilding/scenarios/S25_First_Day.md":M2,"../../worldbuilding/scenarios/S26_The_Last_Bus.md":N2,"../../worldbuilding/scenarios/S27_Hospital_Nightmare.md":j2,"../../worldbuilding/scenarios/S28_Safe_Zone_Defense.md":A2,"../../worldbuilding/scenarios/S29_Silent_Runner.md":O2,"../../worldbuilding/scenarios/S30_The_Hive.md":R2,"../../worldbuilding/scenarios/S31_The_Sky_Heist.md":L2,"../../worldbuilding/scenarios/S32_Gear_Revolution.md":D2,"../../worldbuilding/scenarios/S33_Ironclad_Assault.md":Z2,"../../worldbuilding/scenarios/S34_Traitors_Dilemma.md":F2,"../../worldbuilding/scenarios/S35_Time_Tangled.md":$2,"../../worldbuilding/scenarios/S36_Clockwork_Heart.md":z2,"../../worldbuilding/scenarios/S37_First_Contact.md":B2,"../../worldbuilding/scenarios/S38_Battle_of_Nexus_Gate.md":H2,"../../worldbuilding/scenarios/S39_The_Ancient_Ruins.md":W2,"../../worldbuilding/scenarios/S40_Peaceful_Envoy.md":G2,"../../worldbuilding/scenarios/S41_Cosmic_Horror.md":V2,"../../worldbuilding/scenarios/S42_Warp_Drive_Malfunction.md":U2,"../../worldbuilding/scenarios/S43_Nexus_Awakening.md":K2,"../../worldbuilding/scenarios/S44_The_Hunt.md":X2,"../../worldbuilding/scenarios/S45_Corporate_Sabotage.md":Y2,"../../worldbuilding/scenarios/S46_Guardian_Angel.md":Q2,"../../worldbuilding/scenarios/S47_Street_Justice.md":J2,"../../worldbuilding/scenarios/S48_Final_Convergence.md":q2}),jf=Object.assign({"../../worldbuilding/topview/S01_TopDown_Map_Design.md":nS,"../../worldbuilding/topview/S02_TopDown_Map_Design.md":rS,"../../worldbuilding/topview/S03_TopDown_Map_Design.md":eS,"../../worldbuilding/topview/S04_TopDown_Map_Design.md":tS,"../../worldbuilding/topview/S05_TopDown_Map_Design.md":oS,"../../worldbuilding/topview/S06_TopDown_Map_Design.md":iS,"../../worldbuilding/topview/S07_TopDown_Map_Design.md":sS,"../../worldbuilding/topview/S08_TopDown_Map_Design.md":aS,"../../worldbuilding/topview/S09_TopDown_Map_Design.md":lS,"../../worldbuilding/topview/S10_TopDown_Map_Design.md":cS,"../../worldbuilding/topview/S11_TopDown_Map_Design.md":uS,"../../worldbuilding/topview/S12_TopDown_Map_Design.md":dS,"../../worldbuilding/topview/S13_TopDown_Map_Design.md":hS,"../../worldbuilding/topview/S14_TopDown_Map_Design.md":fS,"../../worldbuilding/topview/S15_TopDown_Map_Design.md":pS,"../../worldbuilding/topview/S16_TopDown_Map_Design.md":mS,"../../worldbuilding/topview/S17_TopDown_Map_Design.md":gS,"../../worldbuilding/topview/S18_TopDown_Map_Design.md":yS,"../../worldbuilding/topview/S19_TopDown_Map_Design.md":vS,"../../worldbuilding/topview/S20_TopDown_Map_Design.md":xS,"../../worldbuilding/topview/S21_TopDown_Map_Design.md":wS,"../../worldbuilding/topview/S22_TopDown_Map_Design.md":SS,"../../worldbuilding/topview/S23_TopDown_Map_Design.md":kS,"../../worldbuilding/topview/S24_TopDown_Map_Design.md":_S,"../../worldbuilding/topview/S25_TopDown_Map_Design.md":bS,"../../worldbuilding/topview/S26_TopDown_Map_Design.md":CS,"../../worldbuilding/topview/S27_TopDown_Map_Design.md":PS,"../../worldbuilding/topview/S28_TopDown_Map_Design.md":TS,"../../worldbuilding/topview/S29_TopDown_Map_Design.md":IS,"../../worldbuilding/topview/S30_TopDown_Map_Design.md":ES,"../../worldbuilding/topview/S31_TopDown_Map_Design.md":MS,"../../worldbuilding/topview/S32_TopDown_Map_Design.md":NS,"../../worldbuilding/topview/S33_TopDown_Map_Design.md":jS,"../../worldbuilding/topview/S34_TopDown_Map_Design.md":AS,"../../worldbuilding/topview/S35_TopDown_Map_Design.md":OS,"../../worldbuilding/topview/S36_TopDown_Map_Design.md":RS,"../../worldbuilding/topview/S37_TopDown_Map_Design.md":LS,"../../worldbuilding/topview/S38_TopDown_Map_Design.md":DS,"../../worldbuilding/topview/S39_TopDown_Map_Design.md":ZS,"../../worldbuilding/topview/S40_TopDown_Map_Design.md":FS,"../../worldbuilding/topview/S41_TopDown_Map_Design.md":$S,"../../worldbuilding/topview/S42_TopDown_Map_Design.md":zS,"../../worldbuilding/topview/S43_TopDown_Map_Design.md":BS,"../../worldbuilding/topview/S44_TopDown_Map_Design.md":HS,"../../worldbuilding/topview/S45_TopDown_Map_Design.md":WS,"../../worldbuilding/topview/S46_TopDown_Map_Design.md":GS,"../../worldbuilding/topview/S47_TopDown_Map_Design.md":VS,"../../worldbuilding/topview/S48_TopDown_Map_Design.md":US});function qS(n,r){const e=(n+" "+r).toLowerCase();return/잠입|stealth|heist|shadow|spy|infilt/i.test(e)?"stealth":/퍼즐|puzzle/i.test(e)?"puzzle":/내러티브|narrative|드라마|외교|대화|추리|감성|평화/i.test(e)?"narrative":/생존|survival|호러|escape|도주|호위|safe.?zone defense/i.test(e)?"survival":/탐험|exploration|어드벤처|adventure|오픈월드|walking|배달|크래프팅|탐사|고고학|첫.?조우|first.?contact/i.test(e)?"exploration":/초능력|각성|awakening|능력|기원|first.?day|플랫포머|플랫폼/i.test(e)?"ability":/슈터|shooter|디펜스|defense|공성|핵.?앤.?슬래시|hack|소울|souls|격투|메카닉|전술|호드|군중|점령|함대|tactic|combat|보스/i.test(e)?"combat":"exploration"}const ic=n=>n.replace(/\*\*/g,"").replace(/^[-*]\s*/,"").replace(/^#+\s*/,"").trim();function nk(n,r){var K,I;const e=n.split(/\r?\n/),t=r.replace(/\.md$/,"").toLowerCase().replace(/_/g,"-"),i=(e[0]||"").match(/^[#﻿\s]*S(\d+):\s*(.+?)(?:\s*\((.+?)\))?\s*$/),s=(i==null?void 0:i[1])??"?",a=((K=i==null?void 0:i[2])==null?void 0:K.trim())??r,l=((I=i==null?void 0:i[3])==null?void 0:I.trim())??"",c=l?`S${s} ${l}`:`S${s} ${a}`,d=Y=>{for(const H of e){const k=H.match(Y);if(k)return ic(k[1])}return""},h=d(/^[-*\s]+\*\*장르\*\*:\s*\*\*?(.+?)\*?\*?\s*$/),f=d(/^[-*\s]+\*\*주인공\*\*:\s*(.+)$/),m=d(/^[-*\s]+\*\*핵심 목표\*\*:\s*(.+)$/),y=d(/^[-*\s]+\*\*The Vibe\*\*:\s*(.+)$/),v=d(/^[-*\s]+\*\*Controls\*\*:\s*(.+)$/),A=d(/^[-*\s]+\*\*배경\*\*:\s*(.+)$/),g=d(/^[-*\s]+\*\*주요 시간대\*\*:\s*(.+)$/),p=[],x=/^[-*\s]+\*\*Zone\s+\d+[^*]*\*\*\s*-?\s*(.+)$/;for(const Y of e){const H=Y.match(x);if(H){const k=H[1].trim(),R=k.indexOf(" - ");R>0?p.push({name:k.slice(0,R).trim(),desc:k.slice(R+3).trim()}):p.push({name:k,desc:""})}}const S=[];for(let Y=0;Y<e.length;Y++){const H=e[Y].match(/^###\s+Act\s+(\d+):\s*(.+?)\s*\(/);if(H){const k=parseInt(H[1],10),R=H[2].trim();let M="",j="";for(let w=Y+1;w<Math.min(Y+12,e.length);w++){const C=e[w].match(/^[-*\s]+\*\*공간\*\*:\s*(.+)$/);C&&(M=ic(C[1]));const z=e[w].match(/^[-*\s]+\*\*페이싱\*\*:\s*(.+)$/);if(z&&(j=ic(z[1])),e[w].startsWith("### Act"))break}S[k-1]={title:R,space:M,pacing:j}}}const b=y.match(/참고:\s*(.+?)(?:\)|$)/),O=b?b[1].trim():y.split(".")[0],E=S.filter(Boolean).map(Y=>Y.title||Y.space).join(" → "),Z=qS(h,l+" "+a),F=rk({zones:p,acts:S,goal:m,background:A,timeRange:g,controls:v});return{id:t,title:c,mechanic:Z,genres:[h,"3D 게임"].filter(Boolean),concept:{theme:[A,g].filter(Boolean).join(", "),intent:m||(f?`${f}의 여정`:"시나리오 진행"),coreMechanic:v||f,learningGoals:ek(S,p),pacing:E||"Low → Rising → Climax → Release",fantasyHook:O},seedPostits:F}}function rk(n){const r=[];return n.background&&r.push({text:`배경 — ${n.background}${n.timeRange?` (${n.timeRange})`:""}`,color:"mint",tags:["mood"]}),n.zones.slice(0,5).forEach(e=>{e.name&&r.push({text:e.desc?`${e.name} — ${e.desc}`:e.name,color:"mint",tags:["zone"]})}),n.acts.filter(Boolean).forEach((e,t)=>{var s,a,l,c;const o=e.space?`Act ${t+1} · ${e.title} — ${e.space}`:`Act ${t+1} · ${e.title}`,i=(s=e.pacing)!=null&&s.includes("Climax")||(a=e.pacing)!=null&&a.includes("High")?"pink":(l=e.pacing)!=null&&l.includes("Low")||(c=e.pacing)!=null&&c.includes("Rest")?"mint":"blue";r.push({text:o,color:i,tags:["act"]})}),n.controls&&r.push({text:`핵심 조작 — ${n.controls}`,color:"yellow",tags:["mechanic"]}),n.goal&&r.push({text:`목표 — ${n.goal}`,color:"pink",tags:["goal"]}),r}function ek(n,r){var t;const e=[];return n.length>=3&&e.push("3-Act 페이싱 곡선 (Low → Rising → Climax)"),r.length>=3&&e.push(`${r.length} Zone 다층 구조 설계`),(t=n[1])!=null&&t.title&&e.push(`중간 Act 긴장 고조: ${n[1].title}`),e}function Ta(n){return n.split("/").pop()??n}const Ia=Object.entries(wu).map(([n,r])=>{try{return nk(r,Ta(n))}catch(e){return console.warn("시나리오 파싱 실패",n,e),null}}).filter(n=>n!==null).sort((n,r)=>n.id.localeCompare(r.id)),_s=Ia.map(n=>{const r=n.id.match(/s(\d+)/),e=r?parseInt(r[1],10):0,t=Object.keys(wu).find(i=>Ta(i).toLowerCase().startsWith(`s${String(e).padStart(2,"0")}_`)),o=Object.keys(jf).find(i=>Ta(i).toLowerCase().startsWith(`s${String(e).padStart(2,"0")}_`));return{id:n.id,num:e,title:n.title,scenarioMd:t?wu[t]:"",topviewMd:o?jf[o]:void 0}}).sort((n,r)=>n.num-r.num),tk=Object.assign({"../../worldbuilding/databases/00_Overview.md":KS,"../../worldbuilding/databases/01_Genre_Database.md":XS,"../../worldbuilding/databases/02_Characters_Database.md":YS,"../../worldbuilding/databases/03_Scenarios_Database.md":QS,"../../worldbuilding/databases/04_Level_Design_Guide.md":JS}),ok={"00_Overview.md":"Nexus Multiverse — 세계관 개요","01_Genre_Database.md":"장르 데이터베이스","02_Characters_Database.md":"캐릭터 데이터베이스","03_Scenarios_Database.md":"시나리오 인덱스","04_Level_Design_Guide.md":"레벨 디자인 가이드"},bs=Object.entries(tk).map(([n,r])=>{const e=Ta(n);return{id:e.replace(/\.md$/,""),title:ok[e]??e,md:r}}).sort((n,r)=>n.id.localeCompare(r.id));function ik({onClose:n}){const[r,e]=N.useState("all"),[t,o]=N.useState("scenario"),[i,s]=N.useState(null),a=B(y=>y.setConcept),l=B(y=>y.addPostit),c=B(y=>y.updatePostit),d=B(y=>y.setName),h=t==="scenario"?Ia:Nf,f=N.useMemo(()=>r==="all"?h:h.filter(y=>y.mechanic===r),[r,h]),m=y=>{d(y.title),a(y.concept),y.seedPostits.forEach(v=>{var g;const A=l(v.text,v.color);(g=v.tags)!=null&&g.length&&c(A,{tags:v.tags})}),n(),s(null)};return u.jsxs("div",{className:"tp",children:[u.jsxs("div",{className:"tp-library-tabs",children:[u.jsxs("button",{className:`tp-lib-tab ${t==="scenario"?"is-active":""}`,onClick:()=>o("scenario"),children:["전문가 시나리오 (",Ia.length,")"]}),u.jsxs("button",{className:`tp-lib-tab ${t==="quick"?"is-active":""}`,onClick:()=>o("quick"),children:["퀵 컨셉 (",Nf.length,")"]})]}),u.jsxs("div",{className:"tp-tabs",children:[u.jsx("button",{className:`tp-tab ${r==="all"?"is-active":""}`,onClick:()=>e("all"),children:"전체"}),i2.map(y=>u.jsx("button",{className:`tp-tab tp-tab--${y.mechanic} ${r===y.mechanic?"is-active":""}`,onClick:()=>e(y.mechanic),children:y.label},y.mechanic))]}),u.jsx("ul",{className:"tp-list",children:f.map(y=>u.jsx("li",{children:u.jsxs("button",{className:`tp-item ${(i==null?void 0:i.id)===y.id?"is-preview":""}`,onClick:()=>s(y),onDoubleClick:()=>m(y),title:"더블클릭으로 즉시 적용",children:[u.jsxs("div",{className:"tp-item-head",children:[u.jsx("span",{className:`tp-mech tp-mech--${y.mechanic}`,children:Mf[y.mechanic]}),u.jsx("span",{className:"tp-title",children:y.title})]}),u.jsx("p",{className:"tp-intent",children:y.concept.intent})]})},y.id))}),i&&u.jsxs("div",{className:"tp-preview",children:[u.jsxs("div",{className:"tp-preview-head",children:[u.jsx("strong",{className:"hand",children:i.title}),u.jsx("button",{onClick:()=>s(null),className:"tp-x",children:"×"})]}),u.jsxs("div",{className:"tp-preview-meta caption",children:["메커닉 ",Mf[i.mechanic]," · 장르 ",i.genres.join(", ")]}),u.jsx("p",{className:"tp-preview-intent",children:i.concept.intent}),u.jsxs("div",{className:"tp-preview-pacing",children:[u.jsx("span",{className:"caption",children:"페이싱"}),u.jsx("p",{children:i.concept.pacing})]}),u.jsxs("div",{className:"tp-preview-goals",children:[u.jsx("span",{className:"caption",children:"학습 목표"}),u.jsx("ul",{children:i.concept.learningGoals.map((y,v)=>u.jsx("li",{children:y},v))})]}),u.jsxs("div",{className:"tp-preview-seeds",children:[u.jsxs("span",{className:"caption",children:["시드 포스트잇 ",i.seedPostits.length,"장"]}),u.jsxs("ul",{children:[i.seedPostits.slice(0,4).map((y,v)=>u.jsxs("li",{children:["· ",y.text]},v)),i.seedPostits.length>4&&u.jsxs("li",{className:"tp-more",children:["+ ",i.seedPostits.length-4,"장 더"]})]})]}),u.jsx("button",{className:"tp-apply",onClick:()=>m(i),children:"이 템플릿으로 시작"})]})]})}function sk({className:n=""}){return u.jsxs("div",{className:`brand-mark ${n}`,children:[u.jsx("span",{className:"bm-logo","aria-hidden":!0,children:u.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",children:[u.jsx("circle",{cx:"9",cy:"9",r:"5.5",fill:"none",stroke:"currentColor",strokeWidth:"1.6"}),u.jsx("circle",{cx:"16",cy:"15",r:"3.5",fill:"none",stroke:"currentColor",strokeWidth:"1.6"}),u.jsx("line",{x1:"11.5",y1:"11.5",x2:"14",y2:"13",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]})}),u.jsxs("span",{className:"bm-text",children:[u.jsx("strong",{children:"버블 아틀리에"}),u.jsx("em",{className:"caption",children:"Bubble Atelier · Level Design Workbench"})]})]})}const ak=["yellow","pink","mint","blue","lilac"],Af="application/x-postit-id";function lk(){const n=B(F=>F.project.postits),r=B(F=>F.addPostit),e=B(F=>F.enterTopdown),t=B(F=>F.clearAllPostits),o=B(F=>F.promoteAllPostits),i=B(F=>F.reorderPostits),[s,a]=N.useState("yellow"),[l,c]=N.useState(""),[d,h]=N.useState(!1),[f,m]=N.useState(null),[y,v]=N.useState(null),A=!l,g=F=>F.dataTransfer.types.includes(Af),p=(F,K)=>{if(!A||!g(F))return;F.preventDefault(),F.dataTransfer.dropEffect="copy";const I=F.currentTarget.getBoundingClientRect(),Y=F.clientY<I.top+I.height/2?"before":"after";v(H=>H&&H.id===K&&H.pos===Y?H:{id:K,pos:Y})},x=(F,K)=>{if(!A)return;const I=F.dataTransfer.getData(Af)||f;if(v(null),m(null),!I||I===K)return;F.preventDefault(),F.stopPropagation();const Y=F.currentTarget.getBoundingClientRect(),H=F.clientY>=Y.top+Y.height/2,k=n.map(M=>M.id).filter(M=>M!==I);let R=k.indexOf(K);R!==-1&&(H&&(R+=1),k.splice(R,0,I),i(k))},S=()=>{v(null),m(null)},b=n.filter(F=>!F.promoted).length,O=()=>{n.length!==0&&confirm(`포스트잇 ${n.length}장을 모두 삭제하시겠습니까?`)&&t()},E=()=>{if(b===0||!confirm(`승격되지 않은 포스트잇 ${b}장을 모두 노드로 만들겠습니까? (캔버스 격자 배치)`))return;o(0,0)},Z=l?n.filter(F=>F.text.toLowerCase().includes(l.toLowerCase())||F.tags.some(K=>K.toLowerCase().includes(l.toLowerCase()))):n;return u.jsxs("aside",{className:`postit-pad edge-right ${d?"is-templates-open":""}`,children:[u.jsxs("div",{className:"pp-brand-row",children:[u.jsx(sk,{className:"pp-brand"}),u.jsx("button",{className:"pp-floorplan","data-testid":"enter-topdown",onClick:e,title:"평면도 — 버블에서 설계한 공간을 탑다운 도면으로 (Esc로 복귀)",children:"⊞ 평면도"})]}),u.jsxs("header",{className:"pp-header",children:[u.jsxs("div",{className:"pp-title-row",children:[u.jsx("h3",{className:"pp-title",children:"포스트잇"}),u.jsxs("span",{className:"caption pp-count",children:[n.length,"장"]})]}),u.jsx("p",{className:"pp-hint hand",children:"자유롭게 적고 캔버스로 던져 노드로 만드세요"}),n.length>0&&u.jsxs("div",{className:"pp-bulk",children:[u.jsxs("button",{onClick:E,disabled:b===0,title:`승격 안 된 포스트잇 ${b}장을 캔버스에 격자로 변환`,className:"pp-bulk-btn pp-bulk-promote",children:["↗ 전부 캔버스로 (",b,")"]}),u.jsx("button",{onClick:O,title:"모든 포스트잇 삭제",className:"pp-bulk-btn pp-bulk-clear",children:"🗑 전부 삭제"})]})]}),u.jsxs("div",{className:"pp-toolbar",children:[u.jsxs("button",{className:"pp-add",onClick:()=>r("",s),title:"새 포스트잇",children:[u.jsx("span",{"aria-hidden":!0,children:"+"})," 새 메모"]}),u.jsx("div",{className:"pp-colors",role:"group","aria-label":"색상 선택",children:ak.map(F=>u.jsx("button",{className:`pp-swatch pp-swatch--${F} ${s===F?"is-active":""}`,onClick:()=>a(F),title:F,"aria-label":`${F} 색상`},F))})]}),u.jsx("div",{className:"pp-search",children:u.jsx("input",{className:"pp-search-input",placeholder:"검색…",value:l,onChange:F=>c(F.target.value)})}),u.jsx("div",{className:"pp-templates-toggle",children:u.jsxs("button",{onClick:()=>h(!d),className:"pp-templates-btn",children:[d?"▾":"▸"," 컨셉 템플릿"]})}),d&&u.jsx(ik,{onClose:()=>h(!1)}),u.jsxs("ul",{className:"pp-list lined",children:[Z.length===0&&u.jsx("li",{className:"pp-empty",children:u.jsx("p",{className:"hand",children:n.length===0?`아직 비어 있습니다.
위의 [+ 새 메모]로 시작하세요.`:"검색 결과 없음"})}),Z.map(F=>{const K=(y==null?void 0:y.id)===F.id&&f&&f!==F.id?`is-drop-${y.pos}`:"";return u.jsx("li",{className:`pp-item ${f===F.id?"is-dragging":""} ${K}`,onDragStart:()=>A&&m(F.id),onDragOver:I=>p(I,F.id),onDrop:I=>x(I,F.id),onDragEnd:S,children:u.jsx(o2,{postit:F})},F.id)})]})]})}function T0(n){let r=n|0;return()=>{r=r+1831565813|0;let e=r;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function I0(n){let r=2166136261;for(let e=0;e<n.length;e++)r^=n.charCodeAt(e),r=Math.imul(r,16777619);return r>>>0}function Ea(n,r){const e=.6+n()*1.4,t=2+n()*2,o=4+n()*3,i=n()*Math.PI*2,s=n()*Math.PI*2,a=n()*Math.PI*2;return l=>Math.sin(l*e*Math.PI*2*r+i)*.6+Math.sin(l*t*Math.PI*2*r+s)*.3+Math.sin(l*o*Math.PI*2*r+a)*.15}const ck=n=>Math.sin(n*Math.PI);function E0(n){if(n.length<2)return"";const r=o=>o.toFixed(2);let e=`M ${r(n[0][0])} ${r(n[0][1])}`;if(n.length===2)return e+=` L ${r(n[1][0])} ${r(n[1][1])}`,e;e+=` L ${r((n[0][0]+n[1][0])/2)} ${r((n[0][1]+n[1][1])/2)}`;for(let o=1;o<n.length-1;o++){const i=(n[o][0]+n[o+1][0])/2,s=(n[o][1]+n[o+1][1])/2;e+=` Q ${r(n[o][0])} ${r(n[o][1])}, ${r(i)} ${r(s)}`}const t=n[n.length-1];return e+=` L ${r(t[0])} ${r(t[1])}`,e}function uk(n,r,e,t,o){const i=o.roughness??1.4,s=o.bowing,a=o.passes;if(i<=0&&s<=0)return[`M ${n} ${r} L ${e} ${t}`];const l=e-n,c=t-r,d=Math.hypot(l,c);if(d<.5)return[`M ${n} ${r} L ${e} ${t}`];const h=l/d,m=-(c/d),y=h,v=Math.max(8,Math.min(48,Math.floor(d/12)));return Array.from({length:a},(A,g)=>{const p=T0(I0(`${o.seed}|L|${g}`)),x=g%2===0?1:-1,S=s*Math.min(d,200)*.04*x*(.7+p()*.6),b=(p()-.5)*i*.8,O=(p()-.5)*i*.8,E=Ea(p,.7),Z=Ea(p,2.2),F=[];F.push([n+m*b,r+y*b]);for(let K=1;K<v;K++){const I=K/v,Y=ck(I),H=S*Y,k=(E(I)*.65+Z(I)*.35)*i*Y,R=H+k,M=n+l*I,j=r+c*I;F.push([M+m*R,j+y*R])}return F.push([e+m*O,t+y*O]),E0(F)})}function dk(n,r,e,t,o){const i=o.roughness,s=o.passes,a=Math.PI*(3*(e+t)-Math.sqrt((3*e+t)*(e+3*t))),l=Math.max(20,Math.min(64,Math.floor(a/10)));return Array.from({length:s},(c,d)=>{const h=T0(I0(`${o.seed}|E|${d}`)),f=(d*.35+h()*.6)*Math.PI,m=-(.05+h()*.12),y=.08+h()*.18,v=Math.PI*2+y-m,A=Ea(h,.8),g=Ea(h,2.5),p=1+(h()-.5)*.025,x=1+(h()-.5)*.025,S=(h()-.5)*.6,b=(h()-.5)*.6,O=[];for(let E=0;E<=l;E++){const Z=E/l,F=f+m+v*Z,K=(A(Z)*.7+g(Z)*.3)*i,I=e*p+K,Y=t*x+K;O.push([n+S+Math.cos(F)*I,r+b+Math.sin(F)*Y])}return E0(O)})}const Xr="#1A1814",Fe={room:{label:"방",icon:"◯",rx:56,ry:56,fill:"#7AA8C2",stroke:Xr,strokeWidth:3.6,textColor:Xr},vista:{label:"전망",icon:"◇",rx:62,ry:62,fill:"#A88BB8",stroke:Xr,strokeWidth:3.6,textColor:Xr},treasure:{label:"보물",icon:"✦",rx:56,ry:56,fill:"#D9823A",stroke:Xr,strokeWidth:3.2,textColor:Xr},boss:{label:"보스",icon:"✚",rx:74,ry:74,fill:"#CF5547",stroke:Xr,strokeWidth:4.2,textColor:Xr},hub:{label:"허브",icon:"⌬",rx:62,ry:62,fill:"#E8C552",stroke:Xr,strokeWidth:3.6,textColor:Xr},save:{label:"세이브",icon:"⚑",rx:48,ry:48,fill:"#8AAE52",stroke:Xr,strokeWidth:3.2,textColor:Xr}};function $e(n,r=1,e=1){const t=Fe[n],o=Math.sqrt(e);return{rx:t.rx*r*o,ry:t.ry*r/o}}function hk(n){const{rx:r,ry:e}=$e(n.type,n.size??1,n.aspect??1);return n.rough?dk(n.cx,n.cy,r,e,{seed:n.seed,roughness:2.8,passes:2}):[fk(n.cx,n.cy,r,e)]}function fk(n,r,e,t){return`M ${n-e} ${r}
          a ${e} ${t} 0 1 0 ${e*2} 0
          a ${e} ${t} 0 1 0 ${-e*2} 0 Z`.replace(/\s+/g," ")}function pk(n){const r=n.replace("#",""),e=r.length===3?r.split("").map(t=>t+t).join(""):r;return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}}function mk(n,r,e){const t=o=>Math.round(Math.max(0,Math.min(255,o))).toString(16).padStart(2,"0");return`#${t(n)}${t(r)}${t(e)}`}function gk(n,r,e){const t=n/255,o=r/255,i=e/255,s=Math.max(t,o,i),a=Math.min(t,o,i),l=(s+a)/2;let c=0,d=0;if(s!==a){const h=s-a;switch(d=l>.5?h/(2-s-a):h/(s+a),s){case t:c=(o-i)/h+(o<i?6:0);break;case o:c=(i-t)/h+2;break;case i:c=(t-o)/h+4;break}c*=60}return{h:c,s:d,l}}function yk(n,r,e){const t=(1-Math.abs(2*e-1))*r,o=n/60,i=t*(1-Math.abs(o%2-1));let s=0,a=0,l=0;o>=0&&o<1?(s=t,a=i):o<2?(s=i,a=t):o<3?(a=t,l=i):o<4?(a=i,l=t):o<5?(s=i,l=t):(s=t,l=i);const c=e-t/2;return{r:(s+c)*255,g:(a+c)*255,b:(l+c)*255}}function M0(n,r,e){if(r===0&&e===1)return n;const{r:t,g:o,b:i}=pk(n),{h:s,s:a,l}=gk(t,o,i);if(a<.04)return n;const c=((s+r)%360+360)%360,d=Math.max(0,Math.min(1,a*e)),h=yk(c,d,l);return mk(h.r,h.g,h.b)}function vk({node:n,rough:r,selected:e,onPointerDownNode:t,onHandlePointerDown:o,onResizePointerDown:i}){const s=Fe[n.type],a=B(E=>{var Z;return((Z=E.project.theme)==null?void 0:Z.hueShift)??0}),l=B(E=>{var Z;return((Z=E.project.theme)==null?void 0:Z.satScale)??1}),c=a!==0||l!==1?{...s,fill:M0(s.fill,a,l)}:s,d=n.size??1,h=n.aspect??1,{rx:f,ry:m}=$e(n.type,d,h),y=hk({cx:0,cy:0,type:n.type,size:d,aspect:h,rough:r,seed:n.id}),v=B(E=>E.select),[A,g]=N.useState(!1),x=C0()==="dark"?"#FFFFFF":c.stroke,S=[{id:"e",x:f+6,y:0,ax:-2.5,ay:-2,bx:1.5,by:0,cx:-2.5,cy:2},{id:"w",x:-f-6,y:0,ax:2.5,ay:-2,bx:-1.5,by:0,cx:2.5,cy:2},{id:"n",x:0,y:-m-6,ax:-2,ay:2.5,bx:0,by:-1.5,cx:2,cy:2.5},{id:"s",x:0,y:m+6,ax:-2,ay:-2.5,bx:0,by:1.5,cx:2,cy:-2.5}],b=Math.PI*.25,O={x:f*Math.cos(b)+4,y:m*Math.sin(b)+4};return u.jsxs("g",{"data-node":n.id,transform:`translate(${n.x} ${n.y})`,onPointerDown:E=>{E.stopPropagation(),e||v({kind:"node",id:n.id}),t(E,n.id)},onPointerEnter:()=>g(!0),onPointerLeave:()=>g(!1),className:"bn",children:[u.jsx("ellipse",{cx:"0",cy:"0",rx:f,ry:m,fill:c.fill,stroke:"none",className:"bn-fill"}),y.map((E,Z)=>u.jsx("path",{d:E,fill:"none",stroke:x,strokeWidth:r?e?c.strokeWidth+.6:c.strokeWidth*.92:e?c.strokeWidth+1.4:c.strokeWidth,strokeLinejoin:"round",strokeLinecap:"round",className:Z===0?"bn-shape":"bn-shape-overlay"},Z)),e&&u.jsx("ellipse",{cx:"0",cy:"0",rx:f+9,ry:m+7,fill:"none",stroke:"var(--select-outline)",strokeWidth:"1.4",strokeDasharray:"5 4",pointerEvents:"none"}),u.jsx("text",{y:-12*d,textAnchor:"middle",fontSize:16*Math.sqrt(d),fill:c.textColor,fontFamily:"var(--font-display)",pointerEvents:"none",children:c.icon}),u.jsx("foreignObject",{x:-f+8,y:2,width:f*2-16,height:m,children:u.jsx("div",{className:"bn-name",style:{fontSize:`${13*Math.sqrt(d)}px`},children:n.name})}),u.jsx("text",{y:m-8,textAnchor:"middle",fontSize:9,fill:"var(--ink-500)",fontFamily:"var(--font-mono)",letterSpacing:"0.12em",pointerEvents:"none",style:{textTransform:"uppercase"},children:c.label}),n.icons.length>0&&(()=>{const E=Math.min(n.icons.length,8),F=Math.max(1,Math.ceil(E/4))*18+10;return u.jsx("foreignObject",{x:-f-30,y:m+6,width:f*2+60,height:F,children:u.jsxs("div",{className:"bn-icon-tags",children:[n.icons.slice(0,8).map(K=>u.jsx("span",{className:"bn-icon-chip",children:K},K)),n.icons.length>8&&u.jsxs("span",{className:"bn-icon-more",children:["+",n.icons.length-8]})]})})})(),(A||e)&&S.map(E=>u.jsxs("g",{"data-handle":"out",children:[u.jsx("circle",{cx:E.x,cy:E.y,r:"6",fill:"var(--paper-50)",stroke:"var(--brick)",strokeWidth:"1.4",className:"bn-handle",onPointerDown:Z=>{Z.stopPropagation(),o(Z,n.id)}}),u.jsx("path",{d:`M ${E.x+E.ax} ${E.y+E.ay} L ${E.x+E.bx} ${E.y+E.by} L ${E.x+E.cx} ${E.y+E.cy}`,fill:"none",stroke:"var(--brick)",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round",pointerEvents:"none"})]},E.id)),(A||e)&&u.jsxs("g",{"data-handle":"resize",children:[u.jsx("circle",{cx:O.x,cy:O.y,r:"6",fill:"var(--paper-50)",stroke:"var(--blueprint)",strokeWidth:"1.4",className:"bn-handle bn-handle-resize",onPointerDown:E=>{E.stopPropagation(),i(E,n.id)}}),u.jsx("path",{d:`M ${O.x-2} ${O.y-2} L ${O.x+2} ${O.y+2}
                M ${O.x+2} ${O.y-2} L ${O.x-2} ${O.y+2}`,stroke:"var(--blueprint)",strokeWidth:"1.1",strokeLinecap:"round",pointerEvents:"none",opacity:"0.7"})]})]})}const Yi={open:{stroke:"#1A1814",width:4.8,label:"통로"},locked:{stroke:"#8F7740",width:2.8,dash:"8 5",label:"잠금"},oneway:{stroke:"#6B6760",width:1.8,label:"일방"},ability:{stroke:"#8A3D3A",width:2.2,dash:"3 4",label:"능력"},vista:{stroke:"#6B4F87",width:1.6,dash:"2 6",label:"전망"}},xk={open:"#FFFFFF",oneway:"#C7C0B4"};function Of(n,r,e,t,o,i){const s=Math.sqrt(o*o/(e*e)+i*i/(t*t));return s===0?{x:n,y:r}:{x:n+o/s,y:r+i/s}}function wk({edge:n,from:r,to:e,rough:t,selected:o,offset:i=0,onSelect:s}){const a=Yi[n.type],l=C0(),c=l==="dark"&&xk[n.type]||a.stroke,d=l==="dark"?"#14110D":"#1A1814",{startX:h,startY:f,endX:m,endY:y,arrowX:v,arrowY:A,startArrowX:g,startArrowY:p,angle:x}=N.useMemo(()=>{const en=e.x-r.x,Q=e.y-r.y,ln=Math.hypot(en,Q)||1,cn=en/ln,wn=Q/ln,Nn=r.id<e.id?1:-1,Fn=-wn*Nn,dn=cn*Nn,un=Fn*i,kn=dn*i,Tn=$e(r.type,r.size??1,r.aspect??1),Sn=$e(e.type,e.size??1,e.aspect??1),$=Of(r.x,r.y,Tn.rx,Tn.ry,en,Q),tn=Of(e.x,e.y,Sn.rx,Sn.ry,-en,-Q),J=6,T=2;return{startX:$.x-cn*J+un,startY:$.y-wn*J+kn,endX:tn.x+cn*J+un,endY:tn.y+wn*J+kn,arrowX:tn.x-cn*T+un,arrowY:tn.y-wn*T+kn,startArrowX:$.x+cn*T+un,startArrowY:$.y+wn*T+kn,angle:Math.atan2(Q,en)*180/Math.PI}},[r.x,r.y,e.x,e.y,r.id,e.id,r.type,r.size,r.aspect,e.type,e.size,e.aspect,i]),S=N.useMemo(()=>uk(h,f,m,y,{seed:n.id,roughness:t?4.8:0,bowing:0,passes:1}),[h,f,m,y,n.id,t]),b=Math.max(13,Math.min(18,a.width*3)),O=`${-b},${-b*.6} ${b*.45},0 ${-b},${b*.6}`,E=B(en=>en.updateEdge),Z=n.type==="oneway"||n.type==="ability"||n.type==="locked",F=n.arrowEnd??Z,K=n.arrowStart??!1,I=en=>{en.stopPropagation(),E(n.id,{arrowEnd:!F})},Y=en=>{en.stopPropagation(),E(n.id,{arrowStart:!K})},H=(h+m)/2,k=(f+y)/2,R=m-h,M=y-f,j=Math.hypot(R,M)||1,w=R/j,C=M/j,z=Math.min(18,j*.3),G=h+w*z,P=f+C*z,fn=m-w*z,X=y-C*z;return u.jsxs("g",{"data-edge":n.id,className:"eg",onClick:en=>{en.stopPropagation(),s(n.id)},children:[u.jsx("path",{d:S[0],fill:"none",stroke:"transparent",strokeWidth:"14"}),o&&S.map((en,Q)=>u.jsx("path",{d:en,fill:"none",stroke:"#CF5547",strokeWidth:a.width+8,strokeLinecap:"round",strokeLinejoin:"round"},`halo-${Q}`)),S.map((en,Q)=>u.jsx("path",{d:en,fill:"none",stroke:c,strokeWidth:o?a.width+1.4:a.width,strokeDasharray:a.dash,strokeLinecap:"round",strokeLinejoin:"round"},Q)),F&&u.jsx("polygon",{points:O,fill:o?"#CF5547":c,stroke:d,strokeWidth:o?2:1.4,strokeLinejoin:"round",strokeLinecap:"round",transform:`translate(${v} ${A}) rotate(${x})`}),K&&u.jsx("polygon",{points:O,fill:o?"#CF5547":c,stroke:d,strokeWidth:o?2:1.4,strokeLinejoin:"round",strokeLinecap:"round",transform:`translate(${g} ${p}) rotate(${x+180})`}),o&&u.jsxs(u.Fragment,{children:[u.jsx("circle",{cx:G,cy:P,r:"7",className:"eg-handle",fill:K?"#CF5547":"var(--paper-50)",stroke:"var(--brick)",strokeWidth:"1.6",onClick:Y,children:u.jsx("title",{children:"시작점 방향 화살표 표시/숨기기"})}),u.jsx("circle",{cx:fn,cy:X,r:"7",className:"eg-handle",fill:F?"#CF5547":"var(--paper-50)",stroke:"var(--brick)",strokeWidth:"1.6",onClick:I,children:u.jsx("title",{children:"도착점 방향 화살표 표시/숨기기"})})]}),(n.keyId||n.abilityId||n.label)&&u.jsx(Sk,{x:H,y:k,text:n.label??n.keyId??n.abilityId??"",color:c})]})}function Sk({x:n,y:r,text:e,color:t}){const o=(e.match(/[가-힯ㄱ-ㅎㅏ-ㅣ]/g)||[]).length,i=e.length-o,a=Math.max(46,o*15+i*8+28),l=26;return u.jsx("foreignObject",{x:n-a/2,y:r-l/2,width:a,height:l,style:{overflow:"visible"},children:u.jsx("div",{className:"edge-label",style:{borderColor:t,color:t},children:u.jsx("span",{children:e})})})}const kk=180,_k=130;function bk({nodes:n,edges:r,viewBox:e}){if(n.length===0)return null;const t=new Map(n.map(h=>[h.id,h]));let o=1/0,i=1/0,s=-1/0,a=-1/0;for(const h of n){const f=$e(h.type,h.size??1,h.aspect??1);o=Math.min(o,h.x-f.rx),i=Math.min(i,h.y-f.ry),s=Math.max(s,h.x+f.rx),a=Math.max(a,h.y+f.ry)}const l=Math.max(1,s-o),c=Math.max(1,a-i),d=20;return u.jsxs("svg",{className:"minimap",width:kk,height:_k,viewBox:`${o-d} ${i-d} ${l+d*2} ${c+d*2}`,preserveAspectRatio:"xMidYMid meet",children:[u.jsx("rect",{x:o-d,y:i-d,width:l+d*2,height:c+d*2,fill:"rgba(244, 239, 230, 0.94)"}),r.map(h=>{const f=t.get(h.from),m=t.get(h.to);if(!f||!m)return null;const y=Yi[h.type];return u.jsx("line",{x1:f.x,y1:f.y,x2:m.x,y2:m.y,stroke:y.stroke,strokeWidth:2.5,strokeDasharray:y.dash,strokeLinecap:"round"},h.id)}),n.map(h=>{const f=Fe[h.type],m=$e(h.type,h.size??1,h.aspect??1);return u.jsx("ellipse",{cx:h.x,cy:h.y,rx:m.rx,ry:m.ry,fill:f.fill,stroke:f.stroke,strokeWidth:"2"},h.id)}),u.jsx("rect",{x:e.x,y:e.y,width:e.w,height:e.h,fill:"none",stroke:"var(--brick)",strokeWidth:"2",strokeDasharray:"6 4"})]})}function Ck({dec:n,selected:r,onPointerDown:e,onArrowEndpointDown:t,onResizeDown:o}){const i=B(a=>a.select),s=a=>{a.stopPropagation(),r||i({kind:"decoration",id:n.id}),e(a,n.id)};return n.kind==="arrow"?u.jsx(Pk,{dec:n,selected:r,onSelect:s,onEndpointDown:t}):n.kind==="ellipse"?u.jsx(Tk,{dec:n,selected:r,onSelect:s,onResizeDown:o}):u.jsx(Ik,{dec:n,selected:r,onSelect:s,onResizeDown:o})}function Pk({dec:n,selected:r,onSelect:e,onEndpointDown:t}){const o=B(E=>{var Z;return((Z=E.project.theme)==null?void 0:Z.hueShift)??0}),i=B(E=>{var Z;return((Z=E.project.theme)==null?void 0:Z.satScale)??1}),s=n.x,a=n.y,l=n.x2??n.x+140,c=n.y2??n.y,d=l-s,h=c-a,f=Math.hypot(d,h)||1,m=d/f,y=h/f,v=Math.atan2(h,d)*180/Math.PI,A=o!==0||i!==1?M0("#E5202B",o,i):"#E5202B",g=r?28:24,p=44,x=p*.85,S=l-m*x,b=c-y*x,O=`${-p},${-p*.7} ${p*.5},0 ${-p},${p*.7}`;return u.jsxs("g",{"data-decoration":n.id,className:"deco",children:[u.jsx("line",{x1:s,y1:a,x2:l,y2:c,stroke:"transparent",strokeWidth:Math.max(g+16,p+12),strokeLinecap:"butt",onPointerDown:e}),u.jsx("line",{x1:s,y1:a,x2:S,y2:b,stroke:A,strokeWidth:g,strokeLinecap:"butt",pointerEvents:"none"}),u.jsx("polygon",{points:O,fill:A,stroke:"none",strokeLinejoin:"round",transform:`translate(${l} ${c}) rotate(${v})`,pointerEvents:"none"}),r&&u.jsxs(u.Fragment,{children:[u.jsx("circle",{cx:s,cy:a,r:"6",fill:"var(--paper-50)",stroke:"var(--brick)",strokeWidth:"1.4",className:"deco-handle",onPointerDown:E=>t(E,n.id,"start")}),u.jsx("circle",{cx:l,cy:c,r:"6",fill:"var(--paper-50)",stroke:"var(--brick)",strokeWidth:"1.4",className:"deco-handle",onPointerDown:E=>t(E,n.id,"end")})]})]})}function Tk({dec:n,selected:r,onSelect:e,onResizeDown:t}){const o=n.width??140,i=n.height??90,s=o/2,a=i/2;return u.jsxs("g",{"data-decoration":n.id,transform:`translate(${n.x} ${n.y})`,className:"deco",onPointerDown:e,children:[u.jsx("ellipse",{cx:"0",cy:"0",rx:s+10,ry:a+10,fill:"transparent",stroke:"none"}),u.jsx("ellipse",{cx:"0",cy:"0",rx:s,ry:a,fill:"#C9C4B8",stroke:"none",pointerEvents:"none"}),r&&u.jsx("ellipse",{cx:"0",cy:"0",rx:s+6,ry:a+6,fill:"none",stroke:"var(--brick)",strokeWidth:"1.4",strokeDasharray:"5 4",pointerEvents:"none"}),r&&u.jsx("circle",{cx:s*.707+4,cy:a*.707+4,r:"6",fill:"var(--paper-50)",stroke:"var(--blueprint)",strokeWidth:"1.4",className:"deco-handle deco-handle-resize",onPointerDown:l=>t(l,n.id)})]})}function Ik({dec:n,selected:r,onSelect:e,onResizeDown:t}){const o=B(g=>g.updateDecoration),i=n.width??180,s=n.height??40,a=n.text??"텍스트",[l,c]=N.useState(!1),d=N.useRef(null),h=Math.max(1,a.length),f=(a.match(/[가-힯]/g)||[]).length,m=(f*1.5+(h-f))/h,y=Math.min(48,Math.max(12,s*.7)),v=Math.min(48,Math.max(12,i/h/m*1.4)),A=Math.min(y,v);return N.useEffect(()=>{l&&d.current&&(d.current.focus(),d.current.select())},[l]),u.jsxs("g",{"data-decoration":n.id,transform:`translate(${n.x} ${n.y})`,className:"deco",onPointerDown:g=>{l||e(g)},onDoubleClick:g=>{g.stopPropagation(),c(!0)},children:[u.jsx("rect",{x:-i/2-8,y:-s/2-8,width:i+16,height:s+16,fill:"transparent",stroke:"none"}),u.jsx("foreignObject",{x:-i/2,y:-s/2,width:i,height:s,style:{overflow:"visible"},children:l?u.jsx("textarea",{ref:d,className:"deco-text-input",style:{fontSize:`${A}px`,width:"100%",height:"100%"},value:a,onChange:g=>o(n.id,{text:g.target.value}),onBlur:()=>c(!1),onKeyDown:g=>{g.key==="Escape"&&c(!1)}}):u.jsx("div",{className:"deco-text",style:{fontSize:`${A}px`,width:"100%",height:"100%"},children:a||u.jsx("span",{className:"deco-text-placeholder",children:"더블클릭으로 편집"})})}),r&&u.jsxs(u.Fragment,{children:[u.jsx("rect",{x:-i/2-4,y:-s/2-4,width:i+8,height:s+8,fill:"none",stroke:"var(--brick)",strokeWidth:"1.4",strokeDasharray:"5 4",pointerEvents:"none"}),u.jsx("circle",{cx:i/2+4,cy:s/2+4,r:"6",fill:"var(--paper-50)",stroke:"var(--blueprint)",strokeWidth:"1.4",className:"deco-handle deco-handle-resize",onPointerDown:g=>t(g,n.id)})]})]})}function Ek({image:n,selected:r,onPointerDown:e,onResizeDown:t}){const o=B(l=>l.select),i=n.width,s=n.height,a=l=>{l.stopPropagation(),r||o({kind:"image",id:n.id}),e(l,n.id)};return u.jsxs("g",{"data-image":n.id,transform:`translate(${n.x} ${n.y})`,className:"cv-image",onPointerDown:a,children:[u.jsx("image",{href:n.src,x:-i/2,y:-s/2,width:i,height:s,preserveAspectRatio:"xMidYMid meet"}),r&&u.jsxs(u.Fragment,{children:[u.jsx("rect",{x:-i/2-4,y:-s/2-4,width:i+8,height:s+8,fill:"none",stroke:"var(--brick)",strokeWidth:"1.4",strokeDasharray:"5 4",pointerEvents:"none"}),u.jsx("circle",{cx:i/2+4,cy:s/2+4,r:"6",fill:"var(--paper-50)",stroke:"var(--blueprint)",strokeWidth:"1.4",className:"img-handle img-handle-resize",onPointerDown:l=>t(l,n.id)})]})]})}var Su="http://www.w3.org/1999/xhtml";const Rf={svg:"http://www.w3.org/2000/svg",xhtml:Su,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function sl(n){var r=n+="",e=r.indexOf(":");return e>=0&&(r=n.slice(0,e))!=="xmlns"&&(n=n.slice(e+1)),Rf.hasOwnProperty(r)?{space:Rf[r],local:n}:n}function Mk(n){return function(){var r=this.ownerDocument,e=this.namespaceURI;return e===Su&&r.documentElement.namespaceURI===Su?r.createElement(n):r.createElementNS(e,n)}}function Nk(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function N0(n){var r=sl(n);return(r.local?Nk:Mk)(r)}function jk(){}function Md(n){return n==null?jk:function(){return this.querySelector(n)}}function Ak(n){typeof n!="function"&&(n=Md(n));for(var r=this._groups,e=r.length,t=new Array(e),o=0;o<e;++o)for(var i=r[o],s=i.length,a=t[o]=new Array(s),l,c,d=0;d<s;++d)(l=i[d])&&(c=n.call(l,l.__data__,d,i))&&("__data__"in l&&(c.__data__=l.__data__),a[d]=c);return new Vr(t,this._parents)}function Ok(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function Rk(){return[]}function j0(n){return n==null?Rk:function(){return this.querySelectorAll(n)}}function Lk(n){return function(){return Ok(n.apply(this,arguments))}}function Dk(n){typeof n=="function"?n=Lk(n):n=j0(n);for(var r=this._groups,e=r.length,t=[],o=[],i=0;i<e;++i)for(var s=r[i],a=s.length,l,c=0;c<a;++c)(l=s[c])&&(t.push(n.call(l,l.__data__,c,s)),o.push(l));return new Vr(t,o)}function A0(n){return function(){return this.matches(n)}}function O0(n){return function(r){return r.matches(n)}}var Zk=Array.prototype.find;function Fk(n){return function(){return Zk.call(this.children,n)}}function $k(){return this.firstElementChild}function zk(n){return this.select(n==null?$k:Fk(typeof n=="function"?n:O0(n)))}var Bk=Array.prototype.filter;function Hk(){return Array.from(this.children)}function Wk(n){return function(){return Bk.call(this.children,n)}}function Gk(n){return this.selectAll(n==null?Hk:Wk(typeof n=="function"?n:O0(n)))}function Vk(n){typeof n!="function"&&(n=A0(n));for(var r=this._groups,e=r.length,t=new Array(e),o=0;o<e;++o)for(var i=r[o],s=i.length,a=t[o]=[],l,c=0;c<s;++c)(l=i[c])&&n.call(l,l.__data__,c,i)&&a.push(l);return new Vr(t,this._parents)}function R0(n){return new Array(n.length)}function Uk(){return new Vr(this._enter||this._groups.map(R0),this._parents)}function Ma(n,r){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=r}Ma.prototype={constructor:Ma,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,r){return this._parent.insertBefore(n,r)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function Kk(n){return function(){return n}}function Xk(n,r,e,t,o,i){for(var s=0,a,l=r.length,c=i.length;s<c;++s)(a=r[s])?(a.__data__=i[s],t[s]=a):e[s]=new Ma(n,i[s]);for(;s<l;++s)(a=r[s])&&(o[s]=a)}function Yk(n,r,e,t,o,i,s){var a,l,c=new Map,d=r.length,h=i.length,f=new Array(d),m;for(a=0;a<d;++a)(l=r[a])&&(f[a]=m=s.call(l,l.__data__,a,r)+"",c.has(m)?o[a]=l:c.set(m,l));for(a=0;a<h;++a)m=s.call(n,i[a],a,i)+"",(l=c.get(m))?(t[a]=l,l.__data__=i[a],c.delete(m)):e[a]=new Ma(n,i[a]);for(a=0;a<d;++a)(l=r[a])&&c.get(f[a])===l&&(o[a]=l)}function Qk(n){return n.__data__}function Jk(n,r){if(!arguments.length)return Array.from(this,Qk);var e=r?Yk:Xk,t=this._parents,o=this._groups;typeof n!="function"&&(n=Kk(n));for(var i=o.length,s=new Array(i),a=new Array(i),l=new Array(i),c=0;c<i;++c){var d=t[c],h=o[c],f=h.length,m=qk(n.call(d,d&&d.__data__,c,t)),y=m.length,v=a[c]=new Array(y),A=s[c]=new Array(y),g=l[c]=new Array(f);e(d,h,v,A,g,m,r);for(var p=0,x=0,S,b;p<y;++p)if(S=v[p]){for(p>=x&&(x=p+1);!(b=A[x])&&++x<y;);S._next=b||null}}return s=new Vr(s,t),s._enter=a,s._exit=l,s}function qk(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function n_(){return new Vr(this._exit||this._groups.map(R0),this._parents)}function r_(n,r,e){var t=this.enter(),o=this,i=this.exit();return typeof n=="function"?(t=n(t),t&&(t=t.selection())):t=t.append(n+""),r!=null&&(o=r(o),o&&(o=o.selection())),e==null?i.remove():e(i),t&&o?t.merge(o).order():o}function e_(n){for(var r=n.selection?n.selection():n,e=this._groups,t=r._groups,o=e.length,i=t.length,s=Math.min(o,i),a=new Array(o),l=0;l<s;++l)for(var c=e[l],d=t[l],h=c.length,f=a[l]=new Array(h),m,y=0;y<h;++y)(m=c[y]||d[y])&&(f[y]=m);for(;l<o;++l)a[l]=e[l];return new Vr(a,this._parents)}function t_(){for(var n=this._groups,r=-1,e=n.length;++r<e;)for(var t=n[r],o=t.length-1,i=t[o],s;--o>=0;)(s=t[o])&&(i&&s.compareDocumentPosition(i)^4&&i.parentNode.insertBefore(s,i),i=s);return this}function o_(n){n||(n=i_);function r(h,f){return h&&f?n(h.__data__,f.__data__):!h-!f}for(var e=this._groups,t=e.length,o=new Array(t),i=0;i<t;++i){for(var s=e[i],a=s.length,l=o[i]=new Array(a),c,d=0;d<a;++d)(c=s[d])&&(l[d]=c);l.sort(r)}return new Vr(o,this._parents).order()}function i_(n,r){return n<r?-1:n>r?1:n>=r?0:NaN}function s_(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function a_(){return Array.from(this)}function l_(){for(var n=this._groups,r=0,e=n.length;r<e;++r)for(var t=n[r],o=0,i=t.length;o<i;++o){var s=t[o];if(s)return s}return null}function c_(){let n=0;for(const r of this)++n;return n}function u_(){return!this.node()}function d_(n){for(var r=this._groups,e=0,t=r.length;e<t;++e)for(var o=r[e],i=0,s=o.length,a;i<s;++i)(a=o[i])&&n.call(a,a.__data__,i,o);return this}function h_(n){return function(){this.removeAttribute(n)}}function f_(n){return function(){this.removeAttributeNS(n.space,n.local)}}function p_(n,r){return function(){this.setAttribute(n,r)}}function m_(n,r){return function(){this.setAttributeNS(n.space,n.local,r)}}function g_(n,r){return function(){var e=r.apply(this,arguments);e==null?this.removeAttribute(n):this.setAttribute(n,e)}}function y_(n,r){return function(){var e=r.apply(this,arguments);e==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}}function v_(n,r){var e=sl(n);if(arguments.length<2){var t=this.node();return e.local?t.getAttributeNS(e.space,e.local):t.getAttribute(e)}return this.each((r==null?e.local?f_:h_:typeof r=="function"?e.local?y_:g_:e.local?m_:p_)(e,r))}function L0(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function x_(n){return function(){this.style.removeProperty(n)}}function w_(n,r,e){return function(){this.style.setProperty(n,r,e)}}function S_(n,r,e){return function(){var t=r.apply(this,arguments);t==null?this.style.removeProperty(n):this.style.setProperty(n,t,e)}}function k_(n,r,e){return arguments.length>1?this.each((r==null?x_:typeof r=="function"?S_:w_)(n,r,e??"")):Eo(this.node(),n)}function Eo(n,r){return n.style.getPropertyValue(r)||L0(n).getComputedStyle(n,null).getPropertyValue(r)}function __(n){return function(){delete this[n]}}function b_(n,r){return function(){this[n]=r}}function C_(n,r){return function(){var e=r.apply(this,arguments);e==null?delete this[n]:this[n]=e}}function P_(n,r){return arguments.length>1?this.each((r==null?__:typeof r=="function"?C_:b_)(n,r)):this.node()[n]}function D0(n){return n.trim().split(/^|\s+/)}function Nd(n){return n.classList||new Z0(n)}function Z0(n){this._node=n,this._names=D0(n.getAttribute("class")||"")}Z0.prototype={add:function(n){var r=this._names.indexOf(n);r<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var r=this._names.indexOf(n);r>=0&&(this._names.splice(r,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function F0(n,r){for(var e=Nd(n),t=-1,o=r.length;++t<o;)e.add(r[t])}function $0(n,r){for(var e=Nd(n),t=-1,o=r.length;++t<o;)e.remove(r[t])}function T_(n){return function(){F0(this,n)}}function I_(n){return function(){$0(this,n)}}function E_(n,r){return function(){(r.apply(this,arguments)?F0:$0)(this,n)}}function M_(n,r){var e=D0(n+"");if(arguments.length<2){for(var t=Nd(this.node()),o=-1,i=e.length;++o<i;)if(!t.contains(e[o]))return!1;return!0}return this.each((typeof r=="function"?E_:r?T_:I_)(e,r))}function N_(){this.textContent=""}function j_(n){return function(){this.textContent=n}}function A_(n){return function(){var r=n.apply(this,arguments);this.textContent=r??""}}function O_(n){return arguments.length?this.each(n==null?N_:(typeof n=="function"?A_:j_)(n)):this.node().textContent}function R_(){this.innerHTML=""}function L_(n){return function(){this.innerHTML=n}}function D_(n){return function(){var r=n.apply(this,arguments);this.innerHTML=r??""}}function Z_(n){return arguments.length?this.each(n==null?R_:(typeof n=="function"?D_:L_)(n)):this.node().innerHTML}function F_(){this.nextSibling&&this.parentNode.appendChild(this)}function $_(){return this.each(F_)}function z_(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function B_(){return this.each(z_)}function H_(n){var r=typeof n=="function"?n:N0(n);return this.select(function(){return this.appendChild(r.apply(this,arguments))})}function W_(){return null}function G_(n,r){var e=typeof n=="function"?n:N0(n),t=r==null?W_:typeof r=="function"?r:Md(r);return this.select(function(){return this.insertBefore(e.apply(this,arguments),t.apply(this,arguments)||null)})}function V_(){var n=this.parentNode;n&&n.removeChild(this)}function U_(){return this.each(V_)}function K_(){var n=this.cloneNode(!1),r=this.parentNode;return r?r.insertBefore(n,this.nextSibling):n}function X_(){var n=this.cloneNode(!0),r=this.parentNode;return r?r.insertBefore(n,this.nextSibling):n}function Y_(n){return this.select(n?X_:K_)}function Q_(n){return arguments.length?this.property("__data__",n):this.node().__data__}function J_(n){return function(r){n.call(this,r,this.__data__)}}function q_(n){return n.trim().split(/^|\s+/).map(function(r){var e="",t=r.indexOf(".");return t>=0&&(e=r.slice(t+1),r=r.slice(0,t)),{type:r,name:e}})}function n3(n){return function(){var r=this.__on;if(r){for(var e=0,t=-1,o=r.length,i;e<o;++e)i=r[e],(!n.type||i.type===n.type)&&i.name===n.name?this.removeEventListener(i.type,i.listener,i.options):r[++t]=i;++t?r.length=t:delete this.__on}}}function r3(n,r,e){return function(){var t=this.__on,o,i=J_(r);if(t){for(var s=0,a=t.length;s<a;++s)if((o=t[s]).type===n.type&&o.name===n.name){this.removeEventListener(o.type,o.listener,o.options),this.addEventListener(o.type,o.listener=i,o.options=e),o.value=r;return}}this.addEventListener(n.type,i,e),o={type:n.type,name:n.name,value:r,listener:i,options:e},t?t.push(o):this.__on=[o]}}function e3(n,r,e){var t=q_(n+""),o,i=t.length,s;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,d;l<c;++l)for(o=0,d=a[l];o<i;++o)if((s=t[o]).type===d.type&&s.name===d.name)return d.value}return}for(a=r?r3:n3,o=0;o<i;++o)this.each(a(t[o],r,e));return this}function z0(n,r,e){var t=L0(n),o=t.CustomEvent;typeof o=="function"?o=new o(r,e):(o=t.document.createEvent("Event"),e?(o.initEvent(r,e.bubbles,e.cancelable),o.detail=e.detail):o.initEvent(r,!1,!1)),n.dispatchEvent(o)}function t3(n,r){return function(){return z0(this,n,r)}}function o3(n,r){return function(){return z0(this,n,r.apply(this,arguments))}}function i3(n,r){return this.each((typeof r=="function"?o3:t3)(n,r))}function*s3(){for(var n=this._groups,r=0,e=n.length;r<e;++r)for(var t=n[r],o=0,i=t.length,s;o<i;++o)(s=t[o])&&(yield s)}var B0=[null];function Vr(n,r){this._groups=n,this._parents=r}function Qi(){return new Vr([[document.documentElement]],B0)}function a3(){return this}Vr.prototype=Qi.prototype={constructor:Vr,select:Ak,selectAll:Dk,selectChild:zk,selectChildren:Gk,filter:Vk,data:Jk,enter:Uk,exit:n_,join:r_,merge:e_,selection:a3,order:t_,sort:o_,call:s_,nodes:a_,node:l_,size:c_,empty:u_,each:d_,attr:v_,style:k_,property:P_,classed:M_,text:O_,html:Z_,raise:$_,lower:B_,append:H_,insert:G_,remove:U_,clone:Y_,datum:Q_,on:e3,dispatch:i3,[Symbol.iterator]:s3};function Or(n){return typeof n=="string"?new Vr([[document.querySelector(n)]],[document.documentElement]):new Vr([[n]],B0)}function l3(n){let r;for(;r=n.sourceEvent;)n=r;return n}function bt(n,r){if(n=l3(n),r===void 0&&(r=n.currentTarget),r){var e=r.ownerSVGElement||r;if(e.createSVGPoint){var t=e.createSVGPoint();return t.x=n.clientX,t.y=n.clientY,t=t.matrixTransform(r.getScreenCTM().inverse()),[t.x,t.y]}if(r.getBoundingClientRect){var o=r.getBoundingClientRect();return[n.clientX-o.left-r.clientLeft,n.clientY-o.top-r.clientTop]}}return[n.pageX,n.pageY]}var c3={value:()=>{}};function jd(){for(var n=0,r=arguments.length,e={},t;n<r;++n){if(!(t=arguments[n]+"")||t in e||/[\s.]/.test(t))throw new Error("illegal type: "+t);e[t]=[]}return new Ks(e)}function Ks(n){this._=n}function u3(n,r){return n.trim().split(/^|\s+/).map(function(e){var t="",o=e.indexOf(".");if(o>=0&&(t=e.slice(o+1),e=e.slice(0,o)),e&&!r.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:t}})}Ks.prototype=jd.prototype={constructor:Ks,on:function(n,r){var e=this._,t=u3(n+"",e),o,i=-1,s=t.length;if(arguments.length<2){for(;++i<s;)if((o=(n=t[i]).type)&&(o=d3(e[o],n.name)))return o;return}if(r!=null&&typeof r!="function")throw new Error("invalid callback: "+r);for(;++i<s;)if(o=(n=t[i]).type)e[o]=Lf(e[o],n.name,r);else if(r==null)for(o in e)e[o]=Lf(e[o],n.name,null);return this},copy:function(){var n={},r=this._;for(var e in r)n[e]=r[e].slice();return new Ks(n)},call:function(n,r){if((o=arguments.length-2)>0)for(var e=new Array(o),t=0,o,i;t<o;++t)e[t]=arguments[t+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(i=this._[n],t=0,o=i.length;t<o;++t)i[t].value.apply(r,e)},apply:function(n,r,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var t=this._[n],o=0,i=t.length;o<i;++o)t[o].value.apply(r,e)}};function d3(n,r){for(var e=0,t=n.length,o;e<t;++e)if((o=n[e]).name===r)return o.value}function Lf(n,r,e){for(var t=0,o=n.length;t<o;++t)if(n[t].name===r){n[t]=c3,n=n.slice(0,t).concat(n.slice(t+1));break}return e!=null&&n.push({name:r,value:e}),n}const ku={capture:!0,passive:!1};function _u(n){n.preventDefault(),n.stopImmediatePropagation()}function h3(n){var r=n.document.documentElement,e=Or(n).on("dragstart.drag",_u,ku);"onselectstart"in r?e.on("selectstart.drag",_u,ku):(r.__noselect=r.style.MozUserSelect,r.style.MozUserSelect="none")}function f3(n,r){var e=n.document.documentElement,t=Or(n).on("dragstart.drag",null);r&&(t.on("click.drag",_u,ku),setTimeout(function(){t.on("click.drag",null)},0)),"onselectstart"in e?t.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}function Ad(n,r,e){n.prototype=r.prototype=e,e.constructor=n}function H0(n,r){var e=Object.create(n.prototype);for(var t in r)e[t]=r[t];return e}function Ji(){}var Zi=.7,Na=1/Zi,xo="\\s*([+-]?\\d+)\\s*",Fi="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",_e="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",p3=/^#([0-9a-f]{3,8})$/,m3=new RegExp(`^rgb\\(${xo},${xo},${xo}\\)$`),g3=new RegExp(`^rgb\\(${_e},${_e},${_e}\\)$`),y3=new RegExp(`^rgba\\(${xo},${xo},${xo},${Fi}\\)$`),v3=new RegExp(`^rgba\\(${_e},${_e},${_e},${Fi}\\)$`),x3=new RegExp(`^hsl\\(${Fi},${_e},${_e}\\)$`),w3=new RegExp(`^hsla\\(${Fi},${_e},${_e},${Fi}\\)$`),Df={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Ad(Ji,$i,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:Zf,formatHex:Zf,formatHex8:S3,formatHsl:k3,formatRgb:Ff,toString:Ff});function Zf(){return this.rgb().formatHex()}function S3(){return this.rgb().formatHex8()}function k3(){return W0(this).formatHsl()}function Ff(){return this.rgb().formatRgb()}function $i(n){var r,e;return n=(n+"").trim().toLowerCase(),(r=p3.exec(n))?(e=r[1].length,r=parseInt(r[1],16),e===6?$f(r):e===3?new Lr(r>>8&15|r>>4&240,r>>4&15|r&240,(r&15)<<4|r&15,1):e===8?Cs(r>>24&255,r>>16&255,r>>8&255,(r&255)/255):e===4?Cs(r>>12&15|r>>8&240,r>>8&15|r>>4&240,r>>4&15|r&240,((r&15)<<4|r&15)/255):null):(r=m3.exec(n))?new Lr(r[1],r[2],r[3],1):(r=g3.exec(n))?new Lr(r[1]*255/100,r[2]*255/100,r[3]*255/100,1):(r=y3.exec(n))?Cs(r[1],r[2],r[3],r[4]):(r=v3.exec(n))?Cs(r[1]*255/100,r[2]*255/100,r[3]*255/100,r[4]):(r=x3.exec(n))?Hf(r[1],r[2]/100,r[3]/100,1):(r=w3.exec(n))?Hf(r[1],r[2]/100,r[3]/100,r[4]):Df.hasOwnProperty(n)?$f(Df[n]):n==="transparent"?new Lr(NaN,NaN,NaN,0):null}function $f(n){return new Lr(n>>16&255,n>>8&255,n&255,1)}function Cs(n,r,e,t){return t<=0&&(n=r=e=NaN),new Lr(n,r,e,t)}function _3(n){return n instanceof Ji||(n=$i(n)),n?(n=n.rgb(),new Lr(n.r,n.g,n.b,n.opacity)):new Lr}function bu(n,r,e,t){return arguments.length===1?_3(n):new Lr(n,r,e,t??1)}function Lr(n,r,e,t){this.r=+n,this.g=+r,this.b=+e,this.opacity=+t}Ad(Lr,bu,H0(Ji,{brighter(n){return n=n==null?Na:Math.pow(Na,n),new Lr(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?Zi:Math.pow(Zi,n),new Lr(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new Lr(Ot(this.r),Ot(this.g),Ot(this.b),ja(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:zf,formatHex:zf,formatHex8:b3,formatRgb:Bf,toString:Bf}));function zf(){return`#${Mt(this.r)}${Mt(this.g)}${Mt(this.b)}`}function b3(){return`#${Mt(this.r)}${Mt(this.g)}${Mt(this.b)}${Mt((isNaN(this.opacity)?1:this.opacity)*255)}`}function Bf(){const n=ja(this.opacity);return`${n===1?"rgb(":"rgba("}${Ot(this.r)}, ${Ot(this.g)}, ${Ot(this.b)}${n===1?")":`, ${n})`}`}function ja(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function Ot(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function Mt(n){return n=Ot(n),(n<16?"0":"")+n.toString(16)}function Hf(n,r,e,t){return t<=0?n=r=e=NaN:e<=0||e>=1?n=r=NaN:r<=0&&(n=NaN),new ce(n,r,e,t)}function W0(n){if(n instanceof ce)return new ce(n.h,n.s,n.l,n.opacity);if(n instanceof Ji||(n=$i(n)),!n)return new ce;if(n instanceof ce)return n;n=n.rgb();var r=n.r/255,e=n.g/255,t=n.b/255,o=Math.min(r,e,t),i=Math.max(r,e,t),s=NaN,a=i-o,l=(i+o)/2;return a?(r===i?s=(e-t)/a+(e<t)*6:e===i?s=(t-r)/a+2:s=(r-e)/a+4,a/=l<.5?i+o:2-i-o,s*=60):a=l>0&&l<1?0:s,new ce(s,a,l,n.opacity)}function C3(n,r,e,t){return arguments.length===1?W0(n):new ce(n,r,e,t??1)}function ce(n,r,e,t){this.h=+n,this.s=+r,this.l=+e,this.opacity=+t}Ad(ce,C3,H0(Ji,{brighter(n){return n=n==null?Na:Math.pow(Na,n),new ce(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?Zi:Math.pow(Zi,n),new ce(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,r=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,t=e+(e<.5?e:1-e)*r,o=2*e-t;return new Lr(sc(n>=240?n-240:n+120,o,t),sc(n,o,t),sc(n<120?n+240:n-120,o,t),this.opacity)},clamp(){return new ce(Wf(this.h),Ps(this.s),Ps(this.l),ja(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=ja(this.opacity);return`${n===1?"hsl(":"hsla("}${Wf(this.h)}, ${Ps(this.s)*100}%, ${Ps(this.l)*100}%${n===1?")":`, ${n})`}`}}));function Wf(n){return n=(n||0)%360,n<0?n+360:n}function Ps(n){return Math.max(0,Math.min(1,n||0))}function sc(n,r,e){return(n<60?r+(e-r)*n/60:n<180?e:n<240?r+(e-r)*(240-n)/60:r)*255}const G0=n=>()=>n;function P3(n,r){return function(e){return n+e*r}}function T3(n,r,e){return n=Math.pow(n,e),r=Math.pow(r,e)-n,e=1/e,function(t){return Math.pow(n+t*r,e)}}function I3(n){return(n=+n)==1?V0:function(r,e){return e-r?T3(r,e,n):G0(isNaN(r)?e:r)}}function V0(n,r){var e=r-n;return e?P3(n,e):G0(isNaN(n)?r:n)}const Gf=function n(r){var e=I3(r);function t(o,i){var s=e((o=bu(o)).r,(i=bu(i)).r),a=e(o.g,i.g),l=e(o.b,i.b),c=V0(o.opacity,i.opacity);return function(d){return o.r=s(d),o.g=a(d),o.b=l(d),o.opacity=c(d),o+""}}return t.gamma=n,t}(1);function Xe(n,r){return n=+n,r=+r,function(e){return n*(1-e)+r*e}}var Cu=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ac=new RegExp(Cu.source,"g");function E3(n){return function(){return n}}function M3(n){return function(r){return n(r)+""}}function N3(n,r){var e=Cu.lastIndex=ac.lastIndex=0,t,o,i,s=-1,a=[],l=[];for(n=n+"",r=r+"";(t=Cu.exec(n))&&(o=ac.exec(r));)(i=o.index)>e&&(i=r.slice(e,i),a[s]?a[s]+=i:a[++s]=i),(t=t[0])===(o=o[0])?a[s]?a[s]+=o:a[++s]=o:(a[++s]=null,l.push({i:s,x:Xe(t,o)})),e=ac.lastIndex;return e<r.length&&(i=r.slice(e),a[s]?a[s]+=i:a[++s]=i),a.length<2?l[0]?M3(l[0].x):E3(r):(r=l.length,function(c){for(var d=0,h;d<r;++d)a[(h=l[d]).i]=h.x(c);return a.join("")})}var Vf=180/Math.PI,Pu={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function U0(n,r,e,t,o,i){var s,a,l;return(s=Math.sqrt(n*n+r*r))&&(n/=s,r/=s),(l=n*e+r*t)&&(e-=n*l,t-=r*l),(a=Math.sqrt(e*e+t*t))&&(e/=a,t/=a,l/=a),n*t<r*e&&(n=-n,r=-r,l=-l,s=-s),{translateX:o,translateY:i,rotate:Math.atan2(r,n)*Vf,skewX:Math.atan(l)*Vf,scaleX:s,scaleY:a}}var Ts;function j3(n){const r=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return r.isIdentity?Pu:U0(r.a,r.b,r.c,r.d,r.e,r.f)}function A3(n){return n==null||(Ts||(Ts=document.createElementNS("http://www.w3.org/2000/svg","g")),Ts.setAttribute("transform",n),!(n=Ts.transform.baseVal.consolidate()))?Pu:(n=n.matrix,U0(n.a,n.b,n.c,n.d,n.e,n.f))}function K0(n,r,e,t){function o(c){return c.length?c.pop()+" ":""}function i(c,d,h,f,m,y){if(c!==h||d!==f){var v=m.push("translate(",null,r,null,e);y.push({i:v-4,x:Xe(c,h)},{i:v-2,x:Xe(d,f)})}else(h||f)&&m.push("translate("+h+r+f+e)}function s(c,d,h,f){c!==d?(c-d>180?d+=360:d-c>180&&(c+=360),f.push({i:h.push(o(h)+"rotate(",null,t)-2,x:Xe(c,d)})):d&&h.push(o(h)+"rotate("+d+t)}function a(c,d,h,f){c!==d?f.push({i:h.push(o(h)+"skewX(",null,t)-2,x:Xe(c,d)}):d&&h.push(o(h)+"skewX("+d+t)}function l(c,d,h,f,m,y){if(c!==h||d!==f){var v=m.push(o(m)+"scale(",null,",",null,")");y.push({i:v-4,x:Xe(c,h)},{i:v-2,x:Xe(d,f)})}else(h!==1||f!==1)&&m.push(o(m)+"scale("+h+","+f+")")}return function(c,d){var h=[],f=[];return c=n(c),d=n(d),i(c.translateX,c.translateY,d.translateX,d.translateY,h,f),s(c.rotate,d.rotate,h,f),a(c.skewX,d.skewX,h,f),l(c.scaleX,c.scaleY,d.scaleX,d.scaleY,h,f),c=d=null,function(m){for(var y=-1,v=f.length,A;++y<v;)h[(A=f[y]).i]=A.x(m);return h.join("")}}}var O3=K0(j3,"px, ","px)","deg)"),R3=K0(A3,", ",")",")"),L3=1e-12;function Uf(n){return((n=Math.exp(n))+1/n)/2}function D3(n){return((n=Math.exp(n))-1/n)/2}function Z3(n){return((n=Math.exp(2*n))-1)/(n+1)}const F3=function n(r,e,t){function o(i,s){var a=i[0],l=i[1],c=i[2],d=s[0],h=s[1],f=s[2],m=d-a,y=h-l,v=m*m+y*y,A,g;if(v<L3)g=Math.log(f/c)/r,A=function(E){return[a+E*m,l+E*y,c*Math.exp(r*E*g)]};else{var p=Math.sqrt(v),x=(f*f-c*c+t*v)/(2*c*e*p),S=(f*f-c*c-t*v)/(2*f*e*p),b=Math.log(Math.sqrt(x*x+1)-x),O=Math.log(Math.sqrt(S*S+1)-S);g=(O-b)/r,A=function(E){var Z=E*g,F=Uf(b),K=c/(e*p)*(F*Z3(r*Z+b)-D3(b));return[a+K*m,l+K*y,c*F/Uf(r*Z+b)]}}return A.duration=g*1e3*r/Math.SQRT2,A}return o.rho=function(i){var s=Math.max(.001,+i),a=s*s,l=a*a;return n(s,a,l)},o}(Math.SQRT2,2,4);var Mo=0,oi=0,Uo=0,X0=1e3,Aa,ii,Oa=0,$t=0,al=0,zi=typeof performance=="object"&&performance.now?performance:Date,Y0=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function Od(){return $t||(Y0($3),$t=zi.now()+al)}function $3(){$t=0}function Ra(){this._call=this._time=this._next=null}Ra.prototype=Q0.prototype={constructor:Ra,restart:function(n,r,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?Od():+e)+(r==null?0:+r),!this._next&&ii!==this&&(ii?ii._next=this:Aa=this,ii=this),this._call=n,this._time=e,Tu()},stop:function(){this._call&&(this._call=null,this._time=1/0,Tu())}};function Q0(n,r,e){var t=new Ra;return t.restart(n,r,e),t}function z3(){Od(),++Mo;for(var n=Aa,r;n;)(r=$t-n._time)>=0&&n._call.call(void 0,r),n=n._next;--Mo}function Kf(){$t=(Oa=zi.now())+al,Mo=oi=0;try{z3()}finally{Mo=0,H3(),$t=0}}function B3(){var n=zi.now(),r=n-Oa;r>X0&&(al-=r,Oa=n)}function H3(){for(var n,r=Aa,e,t=1/0;r;)r._call?(t>r._time&&(t=r._time),n=r,r=r._next):(e=r._next,r._next=null,r=n?n._next=e:Aa=e);ii=n,Tu(t)}function Tu(n){if(!Mo){oi&&(oi=clearTimeout(oi));var r=n-$t;r>24?(n<1/0&&(oi=setTimeout(Kf,n-zi.now()-al)),Uo&&(Uo=clearInterval(Uo))):(Uo||(Oa=zi.now(),Uo=setInterval(B3,X0)),Mo=1,Y0(Kf))}}function Xf(n,r,e){var t=new Ra;return r=r==null?0:+r,t.restart(o=>{t.stop(),n(o+r)},r,e),t}var W3=jd("start","end","cancel","interrupt"),G3=[],J0=0,Yf=1,Iu=2,Xs=3,Qf=4,Eu=5,Ys=6;function ll(n,r,e,t,o,i){var s=n.__transition;if(!s)n.__transition={};else if(e in s)return;V3(n,e,{name:r,index:t,group:o,on:W3,tween:G3,time:i.time,delay:i.delay,duration:i.duration,ease:i.ease,timer:null,state:J0})}function Rd(n,r){var e=me(n,r);if(e.state>J0)throw new Error("too late; already scheduled");return e}function be(n,r){var e=me(n,r);if(e.state>Xs)throw new Error("too late; already running");return e}function me(n,r){var e=n.__transition;if(!e||!(e=e[r]))throw new Error("transition not found");return e}function V3(n,r,e){var t=n.__transition,o;t[r]=e,e.timer=Q0(i,0,e.time);function i(c){e.state=Yf,e.timer.restart(s,e.delay,e.time),e.delay<=c&&s(c-e.delay)}function s(c){var d,h,f,m;if(e.state!==Yf)return l();for(d in t)if(m=t[d],m.name===e.name){if(m.state===Xs)return Xf(s);m.state===Qf?(m.state=Ys,m.timer.stop(),m.on.call("interrupt",n,n.__data__,m.index,m.group),delete t[d]):+d<r&&(m.state=Ys,m.timer.stop(),m.on.call("cancel",n,n.__data__,m.index,m.group),delete t[d])}if(Xf(function(){e.state===Xs&&(e.state=Qf,e.timer.restart(a,e.delay,e.time),a(c))}),e.state=Iu,e.on.call("start",n,n.__data__,e.index,e.group),e.state===Iu){for(e.state=Xs,o=new Array(f=e.tween.length),d=0,h=-1;d<f;++d)(m=e.tween[d].value.call(n,n.__data__,e.index,e.group))&&(o[++h]=m);o.length=h+1}}function a(c){for(var d=c<e.duration?e.ease.call(null,c/e.duration):(e.timer.restart(l),e.state=Eu,1),h=-1,f=o.length;++h<f;)o[h].call(n,d);e.state===Eu&&(e.on.call("end",n,n.__data__,e.index,e.group),l())}function l(){e.state=Ys,e.timer.stop(),delete t[r];for(var c in t)return;delete n.__transition}}function Qs(n,r){var e=n.__transition,t,o,i=!0,s;if(e){r=r==null?null:r+"";for(s in e){if((t=e[s]).name!==r){i=!1;continue}o=t.state>Iu&&t.state<Eu,t.state=Ys,t.timer.stop(),t.on.call(o?"interrupt":"cancel",n,n.__data__,t.index,t.group),delete e[s]}i&&delete n.__transition}}function U3(n){return this.each(function(){Qs(this,n)})}function K3(n,r){var e,t;return function(){var o=be(this,n),i=o.tween;if(i!==e){t=e=i;for(var s=0,a=t.length;s<a;++s)if(t[s].name===r){t=t.slice(),t.splice(s,1);break}}o.tween=t}}function X3(n,r,e){var t,o;if(typeof e!="function")throw new Error;return function(){var i=be(this,n),s=i.tween;if(s!==t){o=(t=s).slice();for(var a={name:r,value:e},l=0,c=o.length;l<c;++l)if(o[l].name===r){o[l]=a;break}l===c&&o.push(a)}i.tween=o}}function Y3(n,r){var e=this._id;if(n+="",arguments.length<2){for(var t=me(this.node(),e).tween,o=0,i=t.length,s;o<i;++o)if((s=t[o]).name===n)return s.value;return null}return this.each((r==null?K3:X3)(e,n,r))}function Ld(n,r,e){var t=n._id;return n.each(function(){var o=be(this,t);(o.value||(o.value={}))[r]=e.apply(this,arguments)}),function(o){return me(o,t).value[r]}}function q0(n,r){var e;return(typeof r=="number"?Xe:r instanceof $i?Gf:(e=$i(r))?(r=e,Gf):N3)(n,r)}function Q3(n){return function(){this.removeAttribute(n)}}function J3(n){return function(){this.removeAttributeNS(n.space,n.local)}}function q3(n,r,e){var t,o=e+"",i;return function(){var s=this.getAttribute(n);return s===o?null:s===t?i:i=r(t=s,e)}}function nb(n,r,e){var t,o=e+"",i;return function(){var s=this.getAttributeNS(n.space,n.local);return s===o?null:s===t?i:i=r(t=s,e)}}function rb(n,r,e){var t,o,i;return function(){var s,a=e(this),l;return a==null?void this.removeAttribute(n):(s=this.getAttribute(n),l=a+"",s===l?null:s===t&&l===o?i:(o=l,i=r(t=s,a)))}}function eb(n,r,e){var t,o,i;return function(){var s,a=e(this),l;return a==null?void this.removeAttributeNS(n.space,n.local):(s=this.getAttributeNS(n.space,n.local),l=a+"",s===l?null:s===t&&l===o?i:(o=l,i=r(t=s,a)))}}function tb(n,r){var e=sl(n),t=e==="transform"?R3:q0;return this.attrTween(n,typeof r=="function"?(e.local?eb:rb)(e,t,Ld(this,"attr."+n,r)):r==null?(e.local?J3:Q3)(e):(e.local?nb:q3)(e,t,r))}function ob(n,r){return function(e){this.setAttribute(n,r.call(this,e))}}function ib(n,r){return function(e){this.setAttributeNS(n.space,n.local,r.call(this,e))}}function sb(n,r){var e,t;function o(){var i=r.apply(this,arguments);return i!==t&&(e=(t=i)&&ib(n,i)),e}return o._value=r,o}function ab(n,r){var e,t;function o(){var i=r.apply(this,arguments);return i!==t&&(e=(t=i)&&ob(n,i)),e}return o._value=r,o}function lb(n,r){var e="attr."+n;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(r==null)return this.tween(e,null);if(typeof r!="function")throw new Error;var t=sl(n);return this.tween(e,(t.local?sb:ab)(t,r))}function cb(n,r){return function(){Rd(this,n).delay=+r.apply(this,arguments)}}function ub(n,r){return r=+r,function(){Rd(this,n).delay=r}}function db(n){var r=this._id;return arguments.length?this.each((typeof n=="function"?cb:ub)(r,n)):me(this.node(),r).delay}function hb(n,r){return function(){be(this,n).duration=+r.apply(this,arguments)}}function fb(n,r){return r=+r,function(){be(this,n).duration=r}}function pb(n){var r=this._id;return arguments.length?this.each((typeof n=="function"?hb:fb)(r,n)):me(this.node(),r).duration}function mb(n,r){if(typeof r!="function")throw new Error;return function(){be(this,n).ease=r}}function gb(n){var r=this._id;return arguments.length?this.each(mb(r,n)):me(this.node(),r).ease}function yb(n,r){return function(){var e=r.apply(this,arguments);if(typeof e!="function")throw new Error;be(this,n).ease=e}}function vb(n){if(typeof n!="function")throw new Error;return this.each(yb(this._id,n))}function xb(n){typeof n!="function"&&(n=A0(n));for(var r=this._groups,e=r.length,t=new Array(e),o=0;o<e;++o)for(var i=r[o],s=i.length,a=t[o]=[],l,c=0;c<s;++c)(l=i[c])&&n.call(l,l.__data__,c,i)&&a.push(l);return new ze(t,this._parents,this._name,this._id)}function wb(n){if(n._id!==this._id)throw new Error;for(var r=this._groups,e=n._groups,t=r.length,o=e.length,i=Math.min(t,o),s=new Array(t),a=0;a<i;++a)for(var l=r[a],c=e[a],d=l.length,h=s[a]=new Array(d),f,m=0;m<d;++m)(f=l[m]||c[m])&&(h[m]=f);for(;a<t;++a)s[a]=r[a];return new ze(s,this._parents,this._name,this._id)}function Sb(n){return(n+"").trim().split(/^|\s+/).every(function(r){var e=r.indexOf(".");return e>=0&&(r=r.slice(0,e)),!r||r==="start"})}function kb(n,r,e){var t,o,i=Sb(r)?Rd:be;return function(){var s=i(this,n),a=s.on;a!==t&&(o=(t=a).copy()).on(r,e),s.on=o}}function _b(n,r){var e=this._id;return arguments.length<2?me(this.node(),e).on.on(n):this.each(kb(e,n,r))}function bb(n){return function(){var r=this.parentNode;for(var e in this.__transition)if(+e!==n)return;r&&r.removeChild(this)}}function Cb(){return this.on("end.remove",bb(this._id))}function Pb(n){var r=this._name,e=this._id;typeof n!="function"&&(n=Md(n));for(var t=this._groups,o=t.length,i=new Array(o),s=0;s<o;++s)for(var a=t[s],l=a.length,c=i[s]=new Array(l),d,h,f=0;f<l;++f)(d=a[f])&&(h=n.call(d,d.__data__,f,a))&&("__data__"in d&&(h.__data__=d.__data__),c[f]=h,ll(c[f],r,e,f,c,me(d,e)));return new ze(i,this._parents,r,e)}function Tb(n){var r=this._name,e=this._id;typeof n!="function"&&(n=j0(n));for(var t=this._groups,o=t.length,i=[],s=[],a=0;a<o;++a)for(var l=t[a],c=l.length,d,h=0;h<c;++h)if(d=l[h]){for(var f=n.call(d,d.__data__,h,l),m,y=me(d,e),v=0,A=f.length;v<A;++v)(m=f[v])&&ll(m,r,e,v,f,y);i.push(f),s.push(d)}return new ze(i,s,r,e)}var Ib=Qi.prototype.constructor;function Eb(){return new Ib(this._groups,this._parents)}function Mb(n,r){var e,t,o;return function(){var i=Eo(this,n),s=(this.style.removeProperty(n),Eo(this,n));return i===s?null:i===e&&s===t?o:o=r(e=i,t=s)}}function ny(n){return function(){this.style.removeProperty(n)}}function Nb(n,r,e){var t,o=e+"",i;return function(){var s=Eo(this,n);return s===o?null:s===t?i:i=r(t=s,e)}}function jb(n,r,e){var t,o,i;return function(){var s=Eo(this,n),a=e(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(n),Eo(this,n))),s===l?null:s===t&&l===o?i:(o=l,i=r(t=s,a))}}function Ab(n,r){var e,t,o,i="style."+r,s="end."+i,a;return function(){var l=be(this,n),c=l.on,d=l.value[i]==null?a||(a=ny(r)):void 0;(c!==e||o!==d)&&(t=(e=c).copy()).on(s,o=d),l.on=t}}function Ob(n,r,e){var t=(n+="")=="transform"?O3:q0;return r==null?this.styleTween(n,Mb(n,t)).on("end.style."+n,ny(n)):typeof r=="function"?this.styleTween(n,jb(n,t,Ld(this,"style."+n,r))).each(Ab(this._id,n)):this.styleTween(n,Nb(n,t,r),e).on("end.style."+n,null)}function Rb(n,r,e){return function(t){this.style.setProperty(n,r.call(this,t),e)}}function Lb(n,r,e){var t,o;function i(){var s=r.apply(this,arguments);return s!==o&&(t=(o=s)&&Rb(n,s,e)),t}return i._value=r,i}function Db(n,r,e){var t="style."+(n+="");if(arguments.length<2)return(t=this.tween(t))&&t._value;if(r==null)return this.tween(t,null);if(typeof r!="function")throw new Error;return this.tween(t,Lb(n,r,e??""))}function Zb(n){return function(){this.textContent=n}}function Fb(n){return function(){var r=n(this);this.textContent=r??""}}function $b(n){return this.tween("text",typeof n=="function"?Fb(Ld(this,"text",n)):Zb(n==null?"":n+""))}function zb(n){return function(r){this.textContent=n.call(this,r)}}function Bb(n){var r,e;function t(){var o=n.apply(this,arguments);return o!==e&&(r=(e=o)&&zb(o)),r}return t._value=n,t}function Hb(n){var r="text";if(arguments.length<1)return(r=this.tween(r))&&r._value;if(n==null)return this.tween(r,null);if(typeof n!="function")throw new Error;return this.tween(r,Bb(n))}function Wb(){for(var n=this._name,r=this._id,e=ry(),t=this._groups,o=t.length,i=0;i<o;++i)for(var s=t[i],a=s.length,l,c=0;c<a;++c)if(l=s[c]){var d=me(l,r);ll(l,n,e,c,s,{time:d.time+d.delay+d.duration,delay:0,duration:d.duration,ease:d.ease})}return new ze(t,this._parents,n,e)}function Gb(){var n,r,e=this,t=e._id,o=e.size();return new Promise(function(i,s){var a={value:s},l={value:function(){--o===0&&i()}};e.each(function(){var c=be(this,t),d=c.on;d!==n&&(r=(n=d).copy(),r._.cancel.push(a),r._.interrupt.push(a),r._.end.push(l)),c.on=r}),o===0&&i()})}var Vb=0;function ze(n,r,e,t){this._groups=n,this._parents=r,this._name=e,this._id=t}function ry(){return++Vb}var Pe=Qi.prototype;ze.prototype={constructor:ze,select:Pb,selectAll:Tb,selectChild:Pe.selectChild,selectChildren:Pe.selectChildren,filter:xb,merge:wb,selection:Eb,transition:Wb,call:Pe.call,nodes:Pe.nodes,node:Pe.node,size:Pe.size,empty:Pe.empty,each:Pe.each,on:_b,attr:tb,attrTween:lb,style:Ob,styleTween:Db,text:$b,textTween:Hb,remove:Cb,tween:Y3,delay:db,duration:pb,ease:gb,easeVarying:vb,end:Gb,[Symbol.iterator]:Pe[Symbol.iterator]};function Ub(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var Kb={time:null,delay:0,duration:250,ease:Ub};function Xb(n,r){for(var e;!(e=n.__transition)||!(e=e[r]);)if(!(n=n.parentNode))throw new Error(`transition ${r} not found`);return e}function Yb(n){var r,e;n instanceof ze?(r=n._id,n=n._name):(r=ry(),(e=Kb).time=Od(),n=n==null?null:n+"");for(var t=this._groups,o=t.length,i=0;i<o;++i)for(var s=t[i],a=s.length,l,c=0;c<a;++c)(l=s[c])&&ll(l,n,r,c,s,e||Xb(l,r));return new ze(t,this._parents,n,r)}Qi.prototype.interrupt=U3;Qi.prototype.transition=Yb;const Is=n=>()=>n;function Qb(n,{sourceEvent:r,target:e,transform:t,dispatch:o}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:r,enumerable:!0,configurable:!0},target:{value:e,enumerable:!0,configurable:!0},transform:{value:t,enumerable:!0,configurable:!0},_:{value:o}})}function je(n,r,e){this.k=n,this.x=r,this.y=e}je.prototype={constructor:je,scale:function(n){return n===1?this:new je(this.k*n,this.x,this.y)},translate:function(n,r){return n===0&r===0?this:new je(this.k,this.x+this.k*n,this.y+this.k*r)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var fe=new je(1,0,0);je.prototype;function lc(n){n.stopImmediatePropagation()}function Ko(n){n.preventDefault(),n.stopImmediatePropagation()}function Jb(n){return(!n.ctrlKey||n.type==="wheel")&&!n.button}function qb(){var n=this;return n instanceof SVGElement?(n=n.ownerSVGElement||n,n.hasAttribute("viewBox")?(n=n.viewBox.baseVal,[[n.x,n.y],[n.x+n.width,n.y+n.height]]):[[0,0],[n.width.baseVal.value,n.height.baseVal.value]]):[[0,0],[n.clientWidth,n.clientHeight]]}function Jf(){return this.__zoom||fe}function nC(n){return-n.deltaY*(n.deltaMode===1?.05:n.deltaMode?1:.002)*(n.ctrlKey?10:1)}function rC(){return navigator.maxTouchPoints||"ontouchstart"in this}function eC(n,r,e){var t=n.invertX(r[0][0])-e[0][0],o=n.invertX(r[1][0])-e[1][0],i=n.invertY(r[0][1])-e[0][1],s=n.invertY(r[1][1])-e[1][1];return n.translate(o>t?(t+o)/2:Math.min(0,t)||Math.max(0,o),s>i?(i+s)/2:Math.min(0,i)||Math.max(0,s))}function cl(){var n=Jb,r=qb,e=eC,t=nC,o=rC,i=[0,1/0],s=[[-1/0,-1/0],[1/0,1/0]],a=250,l=F3,c=jd("start","zoom","end"),d,h,f,m=500,y=150,v=0,A=10;function g(k){k.property("__zoom",Jf).on("wheel.zoom",Z,{passive:!1}).on("mousedown.zoom",F).on("dblclick.zoom",K).filter(o).on("touchstart.zoom",I).on("touchmove.zoom",Y).on("touchend.zoom touchcancel.zoom",H).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}g.transform=function(k,R,M,j){var w=k.selection?k.selection():k;w.property("__zoom",Jf),k!==w?b(k,R,M,j):w.interrupt().each(function(){O(this,arguments).event(j).start().zoom(null,typeof R=="function"?R.apply(this,arguments):R).end()})},g.scaleBy=function(k,R,M,j){g.scaleTo(k,function(){var w=this.__zoom.k,C=typeof R=="function"?R.apply(this,arguments):R;return w*C},M,j)},g.scaleTo=function(k,R,M,j){g.transform(k,function(){var w=r.apply(this,arguments),C=this.__zoom,z=M==null?S(w):typeof M=="function"?M.apply(this,arguments):M,G=C.invert(z),P=typeof R=="function"?R.apply(this,arguments):R;return e(x(p(C,P),z,G),w,s)},M,j)},g.translateBy=function(k,R,M,j){g.transform(k,function(){return e(this.__zoom.translate(typeof R=="function"?R.apply(this,arguments):R,typeof M=="function"?M.apply(this,arguments):M),r.apply(this,arguments),s)},null,j)},g.translateTo=function(k,R,M,j,w){g.transform(k,function(){var C=r.apply(this,arguments),z=this.__zoom,G=j==null?S(C):typeof j=="function"?j.apply(this,arguments):j;return e(fe.translate(G[0],G[1]).scale(z.k).translate(typeof R=="function"?-R.apply(this,arguments):-R,typeof M=="function"?-M.apply(this,arguments):-M),C,s)},j,w)};function p(k,R){return R=Math.max(i[0],Math.min(i[1],R)),R===k.k?k:new je(R,k.x,k.y)}function x(k,R,M){var j=R[0]-M[0]*k.k,w=R[1]-M[1]*k.k;return j===k.x&&w===k.y?k:new je(k.k,j,w)}function S(k){return[(+k[0][0]+ +k[1][0])/2,(+k[0][1]+ +k[1][1])/2]}function b(k,R,M,j){k.on("start.zoom",function(){O(this,arguments).event(j).start()}).on("interrupt.zoom end.zoom",function(){O(this,arguments).event(j).end()}).tween("zoom",function(){var w=this,C=arguments,z=O(w,C).event(j),G=r.apply(w,C),P=M==null?S(G):typeof M=="function"?M.apply(w,C):M,fn=Math.max(G[1][0]-G[0][0],G[1][1]-G[0][1]),X=w.__zoom,en=typeof R=="function"?R.apply(w,C):R,Q=l(X.invert(P).concat(fn/X.k),en.invert(P).concat(fn/en.k));return function(ln){if(ln===1)ln=en;else{var cn=Q(ln),wn=fn/cn[2];ln=new je(wn,P[0]-cn[0]*wn,P[1]-cn[1]*wn)}z.zoom(null,ln)}})}function O(k,R,M){return!M&&k.__zooming||new E(k,R)}function E(k,R){this.that=k,this.args=R,this.active=0,this.sourceEvent=null,this.extent=r.apply(k,R),this.taps=0}E.prototype={event:function(k){return k&&(this.sourceEvent=k),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(k,R){return this.mouse&&k!=="mouse"&&(this.mouse[1]=R.invert(this.mouse[0])),this.touch0&&k!=="touch"&&(this.touch0[1]=R.invert(this.touch0[0])),this.touch1&&k!=="touch"&&(this.touch1[1]=R.invert(this.touch1[0])),this.that.__zoom=R,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(k){var R=Or(this.that).datum();c.call(k,this.that,new Qb(k,{sourceEvent:this.sourceEvent,target:g,transform:this.that.__zoom,dispatch:c}),R)}};function Z(k,...R){if(!n.apply(this,arguments))return;var M=O(this,R).event(k),j=this.__zoom,w=Math.max(i[0],Math.min(i[1],j.k*Math.pow(2,t.apply(this,arguments)))),C=bt(k);if(M.wheel)(M.mouse[0][0]!==C[0]||M.mouse[0][1]!==C[1])&&(M.mouse[1]=j.invert(M.mouse[0]=C)),clearTimeout(M.wheel);else{if(j.k===w)return;M.mouse=[C,j.invert(C)],Qs(this),M.start()}Ko(k),M.wheel=setTimeout(z,y),M.zoom("mouse",e(x(p(j,w),M.mouse[0],M.mouse[1]),M.extent,s));function z(){M.wheel=null,M.end()}}function F(k,...R){if(f||!n.apply(this,arguments))return;var M=k.currentTarget,j=O(this,R,!0).event(k),w=Or(k.view).on("mousemove.zoom",P,!0).on("mouseup.zoom",fn,!0),C=bt(k,M),z=k.clientX,G=k.clientY;h3(k.view),lc(k),j.mouse=[C,this.__zoom.invert(C)],Qs(this),j.start();function P(X){if(Ko(X),!j.moved){var en=X.clientX-z,Q=X.clientY-G;j.moved=en*en+Q*Q>v}j.event(X).zoom("mouse",e(x(j.that.__zoom,j.mouse[0]=bt(X,M),j.mouse[1]),j.extent,s))}function fn(X){w.on("mousemove.zoom mouseup.zoom",null),f3(X.view,j.moved),Ko(X),j.event(X).end()}}function K(k,...R){if(n.apply(this,arguments)){var M=this.__zoom,j=bt(k.changedTouches?k.changedTouches[0]:k,this),w=M.invert(j),C=M.k*(k.shiftKey?.5:2),z=e(x(p(M,C),j,w),r.apply(this,R),s);Ko(k),a>0?Or(this).transition().duration(a).call(b,z,j,k):Or(this).call(g.transform,z,j,k)}}function I(k,...R){if(n.apply(this,arguments)){var M=k.touches,j=M.length,w=O(this,R,k.changedTouches.length===j).event(k),C,z,G,P;for(lc(k),z=0;z<j;++z)G=M[z],P=bt(G,this),P=[P,this.__zoom.invert(P),G.identifier],w.touch0?!w.touch1&&w.touch0[2]!==P[2]&&(w.touch1=P,w.taps=0):(w.touch0=P,C=!0,w.taps=1+!!d);d&&(d=clearTimeout(d)),C&&(w.taps<2&&(h=P[0],d=setTimeout(function(){d=null},m)),Qs(this),w.start())}}function Y(k,...R){if(this.__zooming){var M=O(this,R).event(k),j=k.changedTouches,w=j.length,C,z,G,P;for(Ko(k),C=0;C<w;++C)z=j[C],G=bt(z,this),M.touch0&&M.touch0[2]===z.identifier?M.touch0[0]=G:M.touch1&&M.touch1[2]===z.identifier&&(M.touch1[0]=G);if(z=M.that.__zoom,M.touch1){var fn=M.touch0[0],X=M.touch0[1],en=M.touch1[0],Q=M.touch1[1],ln=(ln=en[0]-fn[0])*ln+(ln=en[1]-fn[1])*ln,cn=(cn=Q[0]-X[0])*cn+(cn=Q[1]-X[1])*cn;z=p(z,Math.sqrt(ln/cn)),G=[(fn[0]+en[0])/2,(fn[1]+en[1])/2],P=[(X[0]+Q[0])/2,(X[1]+Q[1])/2]}else if(M.touch0)G=M.touch0[0],P=M.touch0[1];else return;M.zoom("touch",e(x(z,G,P),M.extent,s))}}function H(k,...R){if(this.__zooming){var M=O(this,R).event(k),j=k.changedTouches,w=j.length,C,z;for(lc(k),f&&clearTimeout(f),f=setTimeout(function(){f=null},m),C=0;C<w;++C)z=j[C],M.touch0&&M.touch0[2]===z.identifier?delete M.touch0:M.touch1&&M.touch1[2]===z.identifier&&delete M.touch1;if(M.touch1&&!M.touch0&&(M.touch0=M.touch1,delete M.touch1),M.touch0)M.touch0[1]=this.__zoom.invert(M.touch0[0]);else if(M.end(),M.taps===2&&(z=bt(z,this),Math.hypot(h[0]-z[0],h[1]-z[1])<A)){var G=Or(this).on("dblclick.zoom");G&&G.apply(this,arguments)}}}return g.wheelDelta=function(k){return arguments.length?(t=typeof k=="function"?k:Is(+k),g):t},g.filter=function(k){return arguments.length?(n=typeof k=="function"?k:Is(!!k),g):n},g.touchable=function(k){return arguments.length?(o=typeof k=="function"?k:Is(!!k),g):o},g.extent=function(k){return arguments.length?(r=typeof k=="function"?k:Is([[+k[0][0],+k[0][1]],[+k[1][0],+k[1][1]]]),g):r},g.scaleExtent=function(k){return arguments.length?(i[0]=+k[0],i[1]=+k[1],g):[i[0],i[1]]},g.translateExtent=function(k){return arguments.length?(s[0][0]=+k[0][0],s[1][0]=+k[1][0],s[0][1]=+k[0][1],s[1][1]=+k[1][1],g):[[s[0][0],s[0][1]],[s[1][0],s[1][1]]]},g.constrain=function(k){return arguments.length?(e=k,g):e},g.duration=function(k){return arguments.length?(a=+k,g):a},g.interpolate=function(k){return arguments.length?(l=k,g):l},g.on=function(){var k=c.on.apply(c,arguments);return k===c?g:k},g.clickDistance=function(k){return arguments.length?(v=(k=+k)*k,g):Math.sqrt(v)},g.tapDistance=function(k){return arguments.length?(A=+k,g):A},g}function tC(n){const[r,e]=N.useState({x:0,y:0,k:1}),t=N.useRef(null);return N.useEffect(()=>{const a=n.current;if(!a)return;const l=Or(a),c=cl().scaleExtent([.2,3]).filter(d=>{const h=d.target;return h&&(h.closest("[data-node]")||h.closest("[data-edge]")||h.closest("[data-handle]")||h.closest("[data-decoration]")||h.closest("[data-image]"))?d.type==="wheel":d.shiftKey&&d.type!=="wheel"?!1:!d.button}).on("zoom",d=>{const h=d.transform;e({x:h.x,y:h.y,k:h.k})});return t.current=c,l.call(c),l.call(c.transform,fe.translate(r.x,r.y).scale(r.k)),()=>{l.on(".zoom",null)}},[]),{transform:r,fitTo:a=>{const l=n.current,c=t.current;if(!l||!c)return;const d=l.getBoundingClientRect(),h=80,f=Math.min((d.width-h*2)/a.w,(d.height-h*2)/a.h,1.5),m=d.width/2-(a.x+a.w/2)*f,y=d.height/2-(a.y+a.h/2)*f;Or(l).call(c.transform,fe.translate(m,y).scale(f))},reset:()=>{const a=n.current,l=t.current;!a||!l||Or(a).call(l.transform,fe)},zoomBy:a=>{const l=n.current,c=t.current;!l||!c||Or(l).call(c.scaleBy,a)}}}function ve(n,r,e){return{x:(r-n.x)/n.k,y:(e-n.y)/n.k}}const qf=360,np=40,La=12*1024*1024;function oC(n){return new Promise((r,e)=>{const t=new Image;t.onload=()=>{const o=t.naturalWidth||1,i=t.naturalHeight||1,s=Math.max(o,i),a=s>qf?qf/s:1;r({src:n,width:Math.round(o*a),height:Math.round(i*a)})},t.onerror=()=>e(new Error("이미지를 읽을 수 없습니다")),t.src=n})}function ey(n){return new Promise((r,e)=>{const t=new FileReader;t.onload=()=>r(t.result),t.onerror=()=>e(new Error("파일 읽기 실패")),t.readAsDataURL(n)})}async function rp(n){if(!n.type.startsWith("image/"))return null;if(n.size>La)throw new Error(`이미지가 너무 큽니다 (최대 ${Math.round(La/1024/1024)}MB)`);const r=await ey(n);return oC(r)}const ep=1400,tp=900*1024;function iC(n){return new Promise((r,e)=>{const t=new Image;t.onload=()=>r(t),t.onerror=()=>e(new Error("이미지를 읽을 수 없습니다")),t.src=n})}function op(n,r,e,t){const o=document.createElement("canvas");o.width=r,o.height=e;const i=o.getContext("2d");return t&&(i.fillStyle=t,i.fillRect(0,0,r,e)),i.drawImage(n,0,0,r,e),o}async function sC(n){if(!n.type.startsWith("image/"))return null;if(n.size>La)throw new Error(`이미지가 너무 큽니다 (최대 ${Math.round(La/1024/1024)}MB)`);const r=await ey(n),e=await iC(r),t=e.naturalWidth||1,o=e.naturalHeight||1,i=Math.max(t,o),s=i>ep?ep/i:1,a=Math.max(1,Math.round(t*s)),l=Math.max(1,Math.round(o*s));if(s===1&&r.length<=tp)return{src:r,w:a,h:l};if(/^image\/(png|gif|webp|svg\+xml)$/.test(n.type)){const d=op(e,a,l).toDataURL("image/png");if(d.length<=tp)return{src:d,w:a,h:l}}return{src:op(e,a,l,"#FFFFFF").toDataURL("image/jpeg",.85),w:a,h:l}}function aC(){var Sn;const n=N.useRef(null),r=B($=>$.project.nodes),e=B($=>$.project.edges),t=B($=>$.project.decorations??[]),o=B($=>$.project.images??[]),i=B($=>$.addImage),s=B($=>$.moveImage),a=B($=>$.resizeImage),l=B($=>$.groupSelection),c=B($=>$.setGroupSelection),d=B($=>$.moveGroup),h=B($=>$.addDecoration),f=B($=>$.updateDecoration),m=B($=>$.moveDecoration),y=B($=>$.project.view),v=B($=>$.selection),A=B($=>$.moveNode),g=B($=>$.resizeNode),p=B($=>$.setNodeAspect),x=B($=>$.addEdge),S=B($=>$.select),b=B($=>$.addNode),O=B($=>$.promotePostit),{transform:E,fitTo:Z,reset:F,zoomBy:K}=tC(n),[I,Y]=N.useState({kind:"none"}),[H,k]=N.useState(!1),R=N.useCallback(($,tn)=>{if(!n.current)return;const J=n.current.getBoundingClientRect(),T=ve(E,$.clientX-J.left,$.clientY-J.top),rn=B.getState();if(rn.groupSelection.includes(tn)){Y({kind:"group",startWorld:T,cursorWorld:T}),$.target.setPointerCapture($.pointerId);return}const yn=rn.project.nodes.find(bn=>bn.id===tn);yn&&(Y({kind:"node",nodeId:tn,startWorld:T,nodeStart:{x:yn.x,y:yn.y}}),$.target.setPointerCapture($.pointerId))},[E]),M=N.useCallback(($,tn)=>{if(!n.current)return;const J=n.current.getBoundingClientRect(),T=ve(E,$.clientX-J.left,$.clientY-J.top);Y({kind:"edge",edgeFrom:tn,cursorWorld:T}),$.target.setPointerCapture($.pointerId)},[E]),j=N.useCallback(($,tn)=>{Y({kind:"resize",nodeId:tn}),$.target.setPointerCapture($.pointerId)},[]),w=N.useCallback(($,tn)=>{if(!n.current)return;const J=n.current.getBoundingClientRect(),T=ve(E,$.clientX-J.left,$.clientY-J.top),rn=B.getState();if(rn.groupSelection.includes(tn)){Y({kind:"group",startWorld:T,cursorWorld:T}),$.target.setPointerCapture($.pointerId);return}const yn=rn.project.decorations.find(bn=>bn.id===tn);yn&&(Y({kind:"deco-move",decId:tn,startWorld:T,decStart:{x:yn.x,y:yn.y,x2:yn.x2,y2:yn.y2,width:yn.width,height:yn.height}}),$.target.setPointerCapture($.pointerId))},[E]),C=N.useCallback(($,tn,J)=>{$.stopPropagation(),Y({kind:"deco-arrow",decId:tn,arrowEndpoint:J}),$.target.setPointerCapture($.pointerId)},[]),z=N.useCallback(($,tn)=>{$.stopPropagation(),Y({kind:"deco-resize",decId:tn}),$.target.setPointerCapture($.pointerId)},[]),G=N.useCallback(($,tn)=>{if(!n.current)return;const J=n.current.getBoundingClientRect(),T=ve(E,$.clientX-J.left,$.clientY-J.top),rn=B.getState();if(rn.groupSelection.includes(tn)){Y({kind:"group",startWorld:T,cursorWorld:T}),$.target.setPointerCapture($.pointerId);return}const yn=(rn.project.images??[]).find(bn=>bn.id===tn);yn&&(Y({kind:"img-move",imgId:tn,startWorld:T,imgStart:{x:yn.x,y:yn.y,width:yn.width,height:yn.height}}),$.target.setPointerCapture($.pointerId))},[E]),P=N.useCallback(($,tn)=>{if($.stopPropagation(),!n.current)return;const T=(B.getState().project.images??[]).find(rn=>rn.id===tn);T&&(Y({kind:"img-resize",imgId:tn,imgStart:{x:T.x,y:T.y,width:T.width,height:T.height}}),$.target.setPointerCapture($.pointerId))},[]),fn=N.useCallback($=>{if(I.kind==="none"||!n.current)return;const tn=n.current.getBoundingClientRect(),J=ve(E,$.clientX-tn.left,$.clientY-tn.top);if(I.kind==="node"&&I.nodeId&&I.startWorld&&I.nodeStart){const T=I.nodeStart.x+(J.x-I.startWorld.x),rn=I.nodeStart.y+(J.y-I.startWorld.y);A(I.nodeId,T,rn)}else if(I.kind==="edge")Y({...I,cursorWorld:J});else if(I.kind==="resize"&&I.nodeId){const T=B.getState().project.nodes.find(ml=>ml.id===I.nodeId);if(!T)return;const rn=Fe[T.type],yn=Math.abs(J.x-T.x),bn=Math.abs(J.y-T.y),In=Math.SQRT2,sr=Math.max(20,(yn-4)*In),oe=Math.max(15,(bn-4)*In),kr=Math.sqrt(sr*oe/(rn.rx*rn.ry)),Oo=sr*rn.ry/(oe*rn.rx);g(I.nodeId,kr),p(I.nodeId,Oo)}else if(I.kind==="deco-move"&&I.decId&&I.startWorld&&I.decStart){const T=I.decStart.x+(J.x-I.startWorld.x),rn=I.decStart.y+(J.y-I.startWorld.y);m(I.decId,T,rn)}else if(I.kind==="deco-arrow"&&I.decId&&I.arrowEndpoint)I.arrowEndpoint==="start"?f(I.decId,{x:J.x,y:J.y}):f(I.decId,{x2:J.x,y2:J.y});else if(I.kind==="deco-resize"&&I.decId){const T=B.getState().project.decorations.find(bn=>bn.id===I.decId);if(!T)return;const rn=Math.max(40,(J.x-T.x)*2),yn=Math.max(20,(J.y-T.y)*2);f(I.decId,{width:rn,height:yn})}else if(I.kind==="img-move"&&I.imgId&&I.startWorld&&I.imgStart){const T=I.imgStart.x+(J.x-I.startWorld.x),rn=I.imgStart.y+(J.y-I.startWorld.y);s(I.imgId,T,rn)}else if(I.kind==="img-resize"&&I.imgId&&I.imgStart){const T=I.imgStart.width/I.imgStart.height||1,rn=Math.max(np,(J.x-I.imgStart.x)*2),yn=Math.max(np/T,rn/T);a(I.imgId,Math.round(rn),Math.round(yn))}else if(I.kind==="group"&&I.startWorld&&I.cursorWorld){const T=J.x-I.cursorWorld.x,rn=J.y-I.cursorWorld.y;d(T,rn),Y({...I,cursorWorld:J})}else I.kind==="box-select"&&I.startWorld&&Y({...I,boxRect:{x0:Math.min(I.startWorld.x,J.x),y0:Math.min(I.startWorld.y,J.y),x1:Math.max(I.startWorld.x,J.x),y1:Math.max(I.startWorld.y,J.y)}})},[I,E,A,g,p,m,f,s,a]),X=N.useCallback($=>{if(I.kind==="edge"&&I.edgeFrom){const tn=document.elementFromPoint($.clientX,$.clientY),J=tn==null?void 0:tn.closest("[data-node]"),T=J==null?void 0:J.getAttribute("data-node");T&&T!==I.edgeFrom&&x(I.edgeFrom,T,"open")}else if(I.kind==="box-select"&&I.boxRect){const{x0:tn,y0:J,x1:T,y1:rn}=I.boxRect,yn=B.getState(),bn=[];yn.project.nodes.forEach(In=>{In.x>=tn&&In.x<=T&&In.y>=J&&In.y<=rn&&bn.push(In.id)}),(yn.project.decorations??[]).forEach(In=>{In.x>=tn&&In.x<=T&&In.y>=J&&In.y<=rn&&bn.push(In.id)}),(yn.project.images??[]).forEach(In=>{In.x>=tn&&In.x<=T&&In.y>=J&&In.y<=rn&&bn.push(In.id)}),bn.length>0?c(bn):c([])}Y({kind:"none"})},[I,x,c]),en=N.useCallback($=>{if($.target===n.current||$.target.hasAttribute("data-bg"))if($.shiftKey&&n.current){const tn=n.current.getBoundingClientRect(),J=ve(E,$.clientX-tn.left,$.clientY-tn.top);Y({kind:"box-select",startWorld:J,boxRect:{x0:J.x,y0:J.y,x1:J.x,y1:J.y}})}else S({kind:"none"}),c([])},[S,E,c]),Q=$=>{const tn=$.dataTransfer.types;(tn.includes("application/x-postit-id")||tn.includes("Files"))&&($.preventDefault(),$.dataTransfer.dropEffect="copy",k(!0))},ln=()=>k(!1),cn=$=>{if($.preventDefault(),k(!1),!n.current)return;const tn=n.current.getBoundingClientRect(),J=ve(E,$.clientX-tn.left,$.clientY-tn.top),T=Array.from($.dataTransfer.files??[]).filter(yn=>yn.type.startsWith("image/"));if(T.length>0){T.forEach(async(yn,bn)=>{try{const In=await rp(yn);In&&i(J.x+bn*24,J.y+bn*24,In.src,In.width,In.height)}catch(In){console.warn("이미지 드롭 실패",In)}});return}const rn=$.dataTransfer.getData("application/x-postit-id");rn&&O(rn,J.x,J.y)};N.useEffect(()=>{const $=tn=>{var sr,oe;const J=(sr=tn.target)==null?void 0:sr.tagName;if(J==="INPUT"||J==="TEXTAREA")return;const T=(oe=tn.clipboardData)==null?void 0:oe.items;if(!T||!n.current)return;const rn=Array.from(T).find(kr=>kr.kind==="file"&&kr.type.startsWith("image/"));if(!rn)return;const yn=rn.getAsFile();if(!yn)return;tn.preventDefault();const bn=n.current.getBoundingClientRect(),In=ve(E,bn.width/2,bn.height/2);rp(yn).then(kr=>{kr&&i(In.x,In.y,kr.src,kr.width,kr.height)}).catch(kr=>console.warn("이미지 붙여넣기 실패",kr))};return window.addEventListener("paste",$),()=>window.removeEventListener("paste",$)},[E,i]);const wn=N.useMemo(()=>{const $=t.filter(T=>T.kind==="text"),tn=t.filter(T=>T.kind==="arrow");return[...t.filter(T=>T.kind==="ellipse"),...tn,...$]},[t]),Nn=N.useMemo(()=>{const $=new Map;e.forEach(J=>{const T=[J.from,J.to].sort().join("::");$.has(T)||$.set(T,[]),$.get(T).push(J.id)});const tn=14;return e.map(J=>{const T=[J.from,J.to].sort().join("::"),rn=$.get(T);if(rn.length<2)return{edge:J,offset:0};const bn=(rn.indexOf(J.id)-(rn.length-1)/2)*tn;return{edge:J,offset:bn}})},[e]),Fn=N.useCallback(()=>{if(r.length===0)return F();let $=1/0,tn=1/0,J=-1/0,T=-1/0;for(const rn of r)$=Math.min($,rn.x-100),tn=Math.min(tn,rn.y-80),J=Math.max(J,rn.x+100),T=Math.max(T,rn.y+80);Z({x:$,y:tn,w:J-$,h:T-tn})},[r,Z,F]),dn=$=>{if(!n.current)return;const tn=n.current.getBoundingClientRect(),J=ve(E,tn.width/2,tn.height/2),T=(Math.random()-.5)*60,rn=(Math.random()-.5)*60;b({x:J.x+T,y:J.y+rn,type:$,name:cC($)})},un=$=>{if(!n.current)return;const tn=n.current.getBoundingClientRect(),J=ve(E,tn.width/2,tn.height/2),T=(Math.random()-.5)*80,rn=(Math.random()-.5)*80;h($,J.x+T,J.y+rn)},kn=(Sn=n.current)==null?void 0:Sn.getBoundingClientRect(),Tn=kn?{x:-E.x/E.k,y:-E.y/E.k,w:kn.width/E.k,h:kn.height/E.k}:{x:0,y:0,w:0,h:0};return u.jsxs("div",{className:`canvas-wrap blueprint-grid ${H?"is-drop-hover":""}`,onDragOver:Q,onDragLeave:ln,onDrop:cn,children:[u.jsxs("svg",{ref:n,className:"canvas-svg",onPointerDown:en,onPointerMove:fn,onPointerUp:X,children:[u.jsx("defs",{children:u.jsx("pattern",{id:"dots",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:u.jsx("circle",{cx:"1",cy:"1",r:"0.6",fill:"rgba(44, 95, 124, 0.20)"})})}),u.jsx("rect",{"data-bg":!0,x:"-100000",y:"-100000",width:"200000",height:"200000",fill:"transparent"}),u.jsxs("g",{"data-cv-world":!0,transform:`translate(${E.x} ${E.y}) scale(${E.k})`,children:[o.map($=>u.jsx(Ek,{image:$,selected:v.kind==="image"&&v.id===$.id||l.includes($.id),onPointerDown:G,onResizeDown:P},$.id)),wn.map($=>u.jsx(Ck,{dec:$,selected:v.kind==="decoration"&&v.id===$.id||l.includes($.id),onPointerDown:w,onArrowEndpointDown:C,onResizeDown:z},$.id)),Nn.map(({edge:$,offset:tn})=>{const J=r.find(rn=>rn.id===$.from),T=r.find(rn=>rn.id===$.to);return!J||!T?null:u.jsx(wk,{edge:$,from:J,to:T,rough:y.edgeStyle==="rough",selected:v.kind==="edge"&&v.id===$.id,offset:tn,onSelect:rn=>S({kind:"edge",id:rn})},$.id)}),I.kind==="edge"&&I.edgeFrom&&I.cursorWorld&&u.jsx(lC,{fromId:I.edgeFrom,cursor:I.cursorWorld}),r.map($=>u.jsx(vk,{node:$,rough:y.edgeStyle==="rough",selected:v.kind==="node"&&v.id===$.id||l.includes($.id),onPointerDownNode:R,onHandlePointerDown:M,onResizePointerDown:j},$.id)),I.kind==="box-select"&&I.boxRect&&u.jsx("rect",{x:I.boxRect.x0,y:I.boxRect.y0,width:I.boxRect.x1-I.boxRect.x0,height:I.boxRect.y1-I.boxRect.y0,fill:"rgba(207, 85, 71, 0.10)",stroke:"var(--brick)",strokeWidth:"1.4",strokeDasharray:"6 4",pointerEvents:"none"})]})]}),r.length===0&&o.length===0&&t.length===0&&u.jsx("div",{className:"canvas-empty",children:u.jsxs("div",{className:"canvas-empty-card",children:[u.jsx("h2",{className:"hand",children:"캔버스가 비어 있습니다"}),u.jsxs("p",{children:["왼쪽 포스트잇을 끌어 와서 노드로 만들거나,",u.jsx("br",{}),"아래에서 노드 타입을 선택해 추가하세요."]}),u.jsxs("div",{className:"canvas-empty-actions",children:[u.jsx("button",{onClick:()=>dn("room"),children:"+ 방"}),u.jsx("button",{onClick:()=>dn("vista"),children:"+ 전망"}),u.jsx("button",{onClick:()=>dn("boss"),children:"+ 보스"})]})]})}),u.jsxs("div",{className:"canvas-toolbar",children:[u.jsxs("div",{className:"ct-group",role:"group","aria-label":"노드 추가",children:[u.jsx("button",{onClick:()=>dn("room"),title:"방 추가",children:"방"}),u.jsx("button",{onClick:()=>dn("vista"),title:"전망",children:"전망"}),u.jsx("button",{onClick:()=>dn("treasure"),title:"보물",children:"보물"}),u.jsx("button",{onClick:()=>dn("boss"),title:"보스",children:"보스"}),u.jsx("button",{onClick:()=>dn("hub"),title:"허브",children:"허브"}),u.jsx("button",{onClick:()=>dn("save"),title:"세이브",children:"세이브"})]}),u.jsx("span",{className:"ct-sep"}),u.jsxs("div",{className:"ct-group",role:"group","aria-label":"데코 추가",children:[u.jsx("button",{onClick:()=>un("arrow"),title:"화살표",children:"↗ 화살표"}),u.jsx("button",{onClick:()=>un("ellipse"),title:"회색 타원",children:"○ 타원"}),u.jsx("button",{onClick:()=>un("text"),title:"텍스트",children:"A 텍스트"})]}),u.jsx("span",{className:"ct-sep"}),u.jsx("button",{onClick:Fn,title:"화면 맞춤",children:"⇲ 맞춤"}),u.jsx("button",{onClick:()=>K(1.25),title:"확대",children:"＋"}),u.jsx("button",{onClick:()=>K(.8),title:"축소",children:"−"}),u.jsxs("span",{className:"ct-zoom caption",children:[Math.round(E.k*100),"%"]})]}),y.showMinimap&&r.length>0&&u.jsx("div",{className:"canvas-minimap",children:u.jsx(bk,{nodes:r,edges:e,viewBox:Tn})}),H&&u.jsx("div",{className:"canvas-drop-banner hand",children:"여기에 놓기 — 포스트잇은 노드로, 이미지는 캔버스에 배치"})]})}function lC({fromId:n,cursor:r}){const e=B(t=>t.project.nodes.find(o=>o.id===n));return e?u.jsx("line",{x1:e.x,y1:e.y,x2:r.x,y2:r.y,stroke:"var(--brick)",strokeWidth:"1.6",strokeDasharray:"4 3",opacity:"0.8",pointerEvents:"none"}):null}function cC(n){return{room:"새 방",vista:"전망 지점",treasure:"보물 챔버",boss:"보스 챔버",hub:"허브 광장",save:"세이브 포인트"}[n]}const uC=["room","vista","treasure","boss","hub","save"],dC=["open","locked","oneway","ability","vista"],hC={room:"일반 방. 전투·통과·환경 인터랙션.",vista:"풍경/예고 공간. 플레이어에게 목표나 비밀을 보여줌.",treasure:"보상/획득 공간. 보물, 능력, 정보.",boss:"거대 인카운터. 일반적으로 페이싱의 클라이맥스.",hub:"여러 경로가 모이는 허브.",save:"체크포인트, 회복, 휴식."},fC={open:"열린 통로. 양방향 자유 통행.",locked:"잠금문. 키를 획득해야 통과.",oneway:"일방통행. 반대로 돌아갈 수 없음.",ability:"능력 게이트. 특정 능력 보유 시만 통과.",vista:"전망. 다른 공간이 시각적으로 보이지만 이동 불가."};function pC({onClose:n}){return u.jsxs("aside",{className:"legend",role:"dialog","aria-label":"범례",children:[u.jsxs("header",{className:"lg-head",children:[u.jsx("h3",{className:"hand",children:"표기 규약"}),u.jsx("button",{onClick:n,className:"lg-x","aria-label":"닫기",children:"×"})]}),u.jsx("p",{className:"lg-intro caption",children:"3D 게임 레벨 디자인 노드·간선 표기 규약"}),u.jsx("h4",{children:"노드"}),u.jsx("ul",{className:"lg-list",children:uC.map(r=>{const e=Fe[r];return u.jsxs("li",{children:[u.jsxs("svg",{width:"48",height:"32",viewBox:"-32 -22 64 44",children:[u.jsx("ellipse",{cx:"0",cy:"0",rx:"24",ry:"16",fill:e.fill,stroke:e.stroke,strokeWidth:e.strokeWidth}),u.jsx("text",{x:"0",y:"3",textAnchor:"middle",fontSize:"11",fill:"var(--ink-900)",children:e.icon})]}),u.jsxs("div",{children:[u.jsx("strong",{children:e.label}),u.jsx("span",{children:hC[r]})]})]},r)})}),u.jsx("h4",{children:"간선"}),u.jsx("ul",{className:"lg-list",children:dC.map(r=>{const e=Yi[r];return u.jsxs("li",{children:[u.jsxs("svg",{width:"48",height:"32",viewBox:"0 0 48 32",children:[u.jsx("path",{d:"M 4 16 Q 24 4, 44 16",fill:"none",stroke:e.stroke,strokeWidth:e.width,strokeDasharray:e.dash,strokeLinecap:"round"}),(r==="oneway"||r==="ability"||r==="locked")&&u.jsx("polygon",{points:"38,12 44,16 38,20",fill:e.stroke})]}),u.jsxs("div",{children:[u.jsx("strong",{children:e.label}),u.jsx("span",{children:fC[r]})]})]},r)})})]})}function mC(){const n=B(d=>d.project.view),r=B(d=>d.setView),e=B(d=>{var h;return((h=d.project.theme)==null?void 0:h.hueShift)??0}),t=B(d=>{var h;return((h=d.project.theme)==null?void 0:h.satScale)??1}),o=B(d=>d.setHueShift),i=B(d=>d.setSatScale),s=B(d=>d.resetTheme),a=e!==0||t!==1,[l,c]=N.useState(!1);return u.jsxs("main",{className:"canvas-shell",children:[u.jsxs("div",{className:"cs-topbar",children:[u.jsxs("div",{className:"cs-view-toggles",children:[u.jsx(cc,{label:"펜떨림",value:n.edgeStyle==="rough",onChange:d=>r({edgeStyle:d?"rough":"clean"}),hint:"손그림 느낌의 거친 곡선"}),u.jsx(cc,{label:"그리드",value:n.showGrid,onChange:d=>r({showGrid:d})}),u.jsx(cc,{label:"미니맵",value:n.showMinimap,onChange:d=>r({showMinimap:d})})]}),u.jsxs("div",{className:"cs-right",children:[u.jsxs("div",{className:"cs-theme",title:"학생별 고유 팔레트 — HUE는 색조, SAT는 채도",children:[u.jsxs("div",{className:"cs-theme-row",children:[u.jsx("span",{className:"cs-theme-label",children:"HUE"}),u.jsx("input",{className:"cs-theme-slider cs-theme-slider--hue",type:"range",min:-180,max:180,step:1,value:e,onChange:d=>o(parseInt(d.target.value,10)),style:{background:`linear-gradient(to right,
                    hsl(0,70%,55%) 0%,
                    hsl(60,70%,55%) 16.66%,
                    hsl(120,70%,55%) 33.33%,
                    hsl(180,70%,55%) 50%,
                    hsl(240,70%,55%) 66.66%,
                    hsl(300,70%,55%) 83.33%,
                    hsl(360,70%,55%) 100%)`}}),u.jsxs("span",{className:"cs-theme-value",children:[e>0?`+${e}`:e,"°"]})]}),u.jsxs("div",{className:"cs-theme-row",children:[u.jsx("span",{className:"cs-theme-label",children:"SAT"}),u.jsx("input",{className:"cs-theme-slider cs-theme-slider--sat",type:"range",min:0,max:2,step:.05,value:t,onChange:d=>i(parseFloat(d.target.value)),style:{background:`linear-gradient(to right,
                    hsl(15,0%,55%) 0%,
                    hsl(15,50%,55%) 50%,
                    hsl(15,100%,55%) 100%)`}}),u.jsxs("span",{className:"cs-theme-value",children:[t.toFixed(2),"×"]})]}),u.jsx("button",{type:"button",className:"cs-theme-reset",onClick:s,disabled:!a,title:"기본 팔레트로 복원",children:"기본"})]}),u.jsxs("button",{className:`cs-legend-btn ${l?"is-on":""}`,onClick:()=>c(!l),children:["범례 ",l?"▾":"▸"]})]})]}),u.jsx("div",{className:`cs-canvas-area ${n.showGrid?"":"no-grid"}`,children:u.jsx(aC,{})}),l&&u.jsx(pC,{onClose:()=>c(!1)})]})}function cc({label:n,value:r,onChange:e,hint:t}){return u.jsxs("label",{className:`cs-toggle ${r?"is-on":""}`,title:t,children:[u.jsx("input",{type:"checkbox",checked:r,onChange:o=>e(o.target.checked)}),u.jsx("span",{className:"cs-toggle-knob","aria-hidden":!0}),u.jsx("span",{className:"cs-toggle-label",children:n})]})}const ip=50,sp=1500;function gC(){const n=B(t=>t.project.ai);if(n.provider!=="gemini")return u.jsxs("div",{className:"usage",children:[u.jsx("span",{className:"caption",children:"AI"}),u.jsx("span",{className:"usage-off",children:"오프라인 모드"})]});const r=Math.min(100,n.usage.proUsedToday/ip*100),e=Math.min(100,n.usage.flashUsedToday/sp*100);return u.jsxs("div",{className:"usage",children:[u.jsx("span",{className:"caption",children:"오늘 사용량"}),u.jsxs("div",{className:"usage-row",children:[u.jsx("span",{className:"usage-label",children:"Pro"}),u.jsx("div",{className:"usage-bar",children:u.jsx("div",{className:"usage-fill usage-fill--pro",style:{width:`${r}%`}})}),u.jsxs("span",{className:"usage-num",children:[n.usage.proUsedToday,"/",ip]})]}),u.jsxs("div",{className:"usage-row",children:[u.jsx("span",{className:"usage-label",children:"Flash"}),u.jsx("div",{className:"usage-bar",children:u.jsx("div",{className:"usage-fill usage-fill--flash",style:{width:`${e}%`}})}),u.jsxs("span",{className:"usage-num",children:[n.usage.flashUsedToday,"/",sp]})]})]})}const yC=["gemini-2.5-pro","gemini-2.5-flash","gemini-2.5-flash-lite","gemini-2.0-flash"],vC=["gemini-2.5-flash","gemini-2.5-flash-lite","gemini-2.0-flash","gemini-2.5-pro"],xC="https://generativelanguage.googleapis.com/v1beta/models";class ty extends Error{constructor(r){super(`Quota exceeded for ${r}`),this.model=r}}class zt extends Error{constructor(r,e){super(`Transient ${e} on ${r}`),this.model=r,this.status=e}}class Bi extends Error{constructor(){super("Gemini API key가 설정되지 않았습니다.")}}async function wC(n,r,e){var l,c,d,h;const t=`${xC}/${n}:generateContent?key=${encodeURIComponent(r)}`,o={systemInstruction:{parts:[{text:e.system}]},contents:[{role:"user",parts:[{text:e.user}]}],generationConfig:{maxOutputTokens:e.maxTokens??1024,temperature:.8}};e.responseSchema&&(o.generationConfig.responseMimeType="application/json",o.generationConfig.responseSchema=e.responseSchema,o.generationConfig.temperature=.4);const i=await fetch(t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(o),signal:e.signal});if(!i.ok){if(i.status===429)throw new ty(n);if(i.status===503||i.status===502||i.status===504)throw new zt(n,i.status);const f=await i.text();throw new Error(`Gemini ${n} ${i.status}: ${f.slice(0,200)}`)}const s=await i.json(),a=((h=(d=(c=(l=s==null?void 0:s.candidates)==null?void 0:l[0])==null?void 0:c.content)==null?void 0:d.parts)==null?void 0:h.map(f=>f.text??"").join(""))??"";if(!a)throw new Error("Gemini 응답이 비어 있습니다.");return a}async function SC(n,r,e,t=2){let o;for(let i=0;i<=t;i++)try{return await wC(n,r,e)}catch(s){if(o=s,s instanceof zt&&i<t){const a=500*Math.pow(2,i);await new Promise(l=>setTimeout(l,a));continue}throw s}throw o??new Error("재시도 실패")}async function wo(n){const r=B.getState(),e=r.project.ai.apiKey;if(!e)throw new Bi;const t=n.preferModel==="gemini-2.5-flash"?vC:yC;let o;for(let i=0;i<t.length;i++){const s=t[i];try{const a=await SC(s,e,n);return r.bumpUsage(s==="gemini-2.5-pro"?"pro":"flash"),{text:a,modelUsed:s,fallback:i>0}}catch(a){if(o=a,a instanceof ty||a instanceof zt)continue;throw a}}throw o??new Error("알 수 없는 오류")}function ap(n){if(!n)return null;let r=n.replace(/```(?:json|JSON)?\s*/g,"").replace(/\s*```/g,"").trim();try{return JSON.parse(r)}catch{}const e=r.indexOf("{"),t=r.indexOf("["),o=e<0?t:t<0?e:Math.min(e,t);if(o<0)return null;const s=r[o]==="{"?"}":"]",a=r.lastIndexOf(s);if(a<=o)return null;const l=r.slice(o,a+1);try{return JSON.parse(l)}catch{}const c=l.replace(/,\s*([}\]])/g,"$1");try{return JSON.parse(c)}catch{return null}}const ul=`
당신은 한국어로 응답하는 노련한 3D 게임 레벨 디자이너 멘토입니다.
응답 원칙:
- 반드시 한국어로 출력합니다.
- 군더더기 없이 구조화된 결과만 출력합니다. 인사·사과·"이런 답변을 드립니다" 같은 메타 문장 금지.
- JSON 모드일 때는 반드시 유효한 JSON만 출력합니다. 코드펜스(\`\`\`)·설명문 절대 포함 금지.
- 3D 게임 레벨 디자인 모범 사례(공간 페이싱, 시선 유도, 환경 스토리텔링, 인카운터 설계, 카메라 동선)를 내재화한 톤으로 답합니다.
- 한국 학생을 가르치는 입장입니다. 전문 용어는 한국어 풀이를 함께 합니다.
`.trim(),kC=`${ul}

[과제: 컨셉 생성]
사용자가 던진 시드(테마/장르/메커닉 등)를 받아 다음 JSON 스키마로 응답하세요:
{
  "theme": "한 줄 테마",
  "intent": "이 레벨에서 플레이어가 하는 일과 배우는 것 — 한 문장",
  "coreMechanic": "핵심 메커닉 한 줄",
  "learningGoals": ["배워야 할 것 1", "2", "3"],
  "pacing": "잔잔→긴장→클라이맥스→여운 등 페이싱 흐름 한 문장",
  "fantasyHook": "플레이어 환상의 정수 한 줄"
}
`,_C=`${ul}

[과제: 포스트잇 시드 생성]
주어진 컨셉을 받아 8~12장의 포스트잇 후보를 생성합니다. 각 카드는 *공간 + 게임플레이*를 짧게 묘사한 메모입니다.

**문체 규칙 — 절대 위반 금지**:
- 마케팅 카피·트레일러 문구 금지. "당신의 무대가 된다", "성공적인 잠입", "압도적인 경험" 같은 표현 절대 X.
- 평서종결어미("된다", "한다", "이다") 사용 금지.
- 명사구·체언 종결로 끝낸다. 30~50자 권장.
- 형식: "공간 이름 — 그곳의 게임플레이" 또는 단순 명사구.

**좋은 예**:
- "입구 — 보물이 보이지만 절벽으로 가로막힌 풍경"
- "감시카메라 사각 — 5초 윈도우"
- "대시 능력 제단 (시각적으로 화려한 룸)"
- "초보 적 2-3마리와의 첫 전투"
- "보스 직후 일방통행 게이트"

**나쁜 예** (절대 생성 금지):
- "성공적인 잠입, 도시의 어둠이 당신의 무대가 된다"
- "긴장감 넘치는 추격전을 펼친다"
- "압도적인 보스가 등장합니다"

유형 'type'은 room/encounter/reward/teaching/mood/secret 중 하나, 색상 'color'는 yellow/pink/mint/blue/lilac 중 의미에 맞게.

응답 JSON:
{
  "postits": [
    { "text": "공간/게임플레이 짧은 묘사", "type": "room", "color": "yellow", "tags": ["선택 태그"] }
  ]
}
`,bC=`${ul}

[과제: Midjourney **마스터 프롬프트 = 게임 전체의 Key Art / Mood Board**]

이것은 특정 룸이 아닌, *게임 전체*의 무드보드입니다. 한 장의 프로모션 포스터·키 아트처럼 게임 세계의 톤·팔레트·시대·라이팅·구도가 *종합*되어야 합니다.

**출력 언어 규칙 — 절대 위반 금지**:
- 출력은 100% 영어(English)만 사용. 한국어 문자가 단 한 글자라도 포함되면 실패.
- "사원"→"ancient temple", "협곡"→"canyon" 등 의미를 영어로 변환.

**필수 포함 7요소** (순서대로, 쉼표로 연결, 모두 영어):
1. **Subject phrase** — 게임 세계 그 자체. 예: "a cohesive game world set in [환경]", "an interconnected world of [핵심 모티프]"
2. **Environment elements** — 환경의 핵심 묘사 3~5개 키워드 (재료, 건축, 자연, 사물 등)
3. **Atmosphere** — 게임 *전체*의 dominant mood (epic dramatic / contemplative serene / restful intimate / ominous oppressive 등)
4. **Lighting** — cinematic lighting (god rays / golden hour ambient / volumetric haze / cold rim light / candlelit ambient 등)
5. **Color palette** — 환경 어울리는 팔레트 (3~5 단어, 예: "molten orange and obsidian black palette with ember accents")
6. **Composition** — wide shot / panoramic establishing shot / sweeping vista / overhead key art
7. **Style markers** — 반드시 다음을 포함: "key art mood board for a video game, promotional poster composition, painterly digital illustration, masterful color theory, layered atmospheric depth, cinematic wide shot"

**분량 규칙 — 절대 위반 금지**:
- 최소 **80 영어 단어 이상**, 권장 100~150 단어.
- 짧은 콤마 나열(단어 7~10개만)은 *실패*. 풍부한 형용사·구문 필수.
- subject 한 단어만으로 시작 금지. 반드시 phrase("a cohesive game world set in...")로 시작.

**마지막 줄**: "--ar 16:9 --v 8.1 --style raw --stylize 250 --chaos 8"

**출력 형식**: 위 7요소를 쉼표로 연결한 *한 줄*. 코드펜스·설명·인사·번호 표기 금지. 한 줄로 모두 이어 쓰기.
`,lp=`${ul}

[과제: Midjourney 노드별 프롬프트]
컨셉의 전체 스타일을 유지하면서, 주어진 한 노드(방)에 대한 Midjourney 프롬프트 한 줄을 생성합니다.

**출력 언어 규칙 — 절대 위반 금지**:
- 출력은 100% 영어(English)만 사용. 한국어 문자가 단 한 글자라도 포함되면 실패.
- 한국어 노드명·아이콘은 의미를 영어로 변환. 예: "보스 챔버" → "boss arena", "대시 능력 제단" → "dash ability altar".

출력 규칙은 마스터와 동일. 프롬프트 한 줄만.
`;function CC(n){return`다음 시드로 컨셉을 생성해 주세요:

"${n}"`}function PC(n){return`다음 컨셉의 포스트잇 시드:
${JSON.stringify(n.concept,null,2)}`}function TC(n){return JSON.stringify({concept:n.concept,nodes:n.nodes.map(r=>({id:r.id,name:r.name,type:r.type,icons:r.icons,notes:r.notes})),edges:n.edges.map(r=>({from:r.from,to:r.to,type:r.type,key:r.keyId,ability:r.abilityId}))},null,2)}function IC(n,r){return`다이어그램 요약:
${TC(n)}

출력 파라미터: ${r}`}function cp(n,r,e){const t=n.nodes.find(o=>o.id===r);return`컨셉:
${JSON.stringify(n.concept,null,2)}

대상 노드:
${JSON.stringify(t,null,2)}

파라미터: ${e}`}function EC(){const n=B(g=>g.project.ai),r=B(g=>g.setApiKey),e=B(g=>g.setConcept),t=B(g=>g.project),o=B(g=>g.addPostit),i=B(g=>g.updatePostit),[s,a]=N.useState(""),[l,c]=N.useState(null),[d,h]=N.useState(null),[f,m]=N.useState(""),y=!!n.apiKey,v=async()=>{if(!s.trim()){h("시드를 입력해 주세요.");return}c("concept"),h(null);try{const g=await wo({system:kC,user:CC(s.trim()),responseSchema:{type:"object",properties:{theme:{type:"string"},intent:{type:"string"},coreMechanic:{type:"string"},learningGoals:{type:"array",items:{type:"string"}},pacing:{type:"string"},fantasyHook:{type:"string"}},required:["theme","intent","coreMechanic","learningGoals","pacing"]},maxTokens:1200}),p=ap(g.text);p?(e(p),h(`컨셉 생성 완료 (${g.modelUsed}${g.fallback?" · 폴백":""})`)):h("응답을 JSON으로 해석하지 못함")}catch(g){h(g instanceof Bi?"키를 먼저 등록하세요.":g instanceof zt?"Gemini 모델이 일시적으로 혼잡합니다. 잠시 후 다시 시도해 주세요.":`실패: ${g.message??g}`)}finally{c(null)}},A=async()=>{c("seed"),h(null);try{const g=await wo({system:_C,user:PC(t),responseSchema:{type:"object",properties:{postits:{type:"array",items:{type:"object",properties:{text:{type:"string"},type:{type:"string"},color:{type:"string"},tags:{type:"array",items:{type:"string"}}},required:["text"]}}},required:["postits"]},maxTokens:1500}),p=ap(g.text);let x=[];if(Array.isArray(p)?x=p:p&&typeof p=="object"&&(x=p.postits??p.items??p.cards??[]),x=x.filter(S=>S&&typeof S.text=="string"&&S.text.trim()),x.length===0){h("AI 응답에서 포스트잇을 추출하지 못함 — 컨셉을 조금 더 채운 뒤 다시 시도");return}x.forEach(S=>{var O;const b=o(S.text,S.color??"yellow");(O=S.tags)!=null&&O.length&&i(b,{tags:S.tags})}),h(`포스트잇 ${x.length}장 추가 (${g.modelUsed}${g.fallback?" · 폴백":""})`)}catch(g){h(g instanceof Bi?"키를 먼저 등록하세요.":g instanceof zt?"Gemini 모델이 일시적으로 혼잡합니다. 잠시 후 다시 시도해 주세요.":`실패: ${g.message??g}`)}finally{c(null)}};return u.jsxs("div",{className:"ai-panel",children:[!y&&u.jsxs("div",{className:"ai-key-prompt",children:[u.jsx("p",{className:"caption",children:"AI 키 미등록 — 오프라인 모드"}),u.jsx("p",{className:"ai-hint",children:"아래에 Gemini API 키를 붙여넣으면 AI 기능이 활성화됩니다."}),u.jsxs("div",{className:"ai-key-row",children:[u.jsx("input",{type:"password",placeholder:"AIzaSy…",value:f,onChange:g=>m(g.target.value),className:"ai-key-input"}),u.jsx("button",{onClick:()=>{f.trim()&&r(f.trim())},disabled:!f.trim(),className:"ai-key-btn",children:"등록"})]}),u.jsx("a",{href:"https://aistudio.google.com/app/apikey",target:"_blank",rel:"noreferrer",className:"ai-key-link caption",children:"키 발급 → aistudio.google.com/app/apikey"})]}),y&&u.jsxs("div",{className:"ai-key-prompt is-on",children:[u.jsx("p",{className:"caption",children:"AI 활성화됨 · Gemini"}),u.jsx("button",{onClick:()=>{r(void 0)},className:"ai-key-remove",children:"키 제거"})]}),u.jsxs("section",{className:"ai-section",children:[u.jsx("h4",{children:"① 컨셉 생성"}),u.jsx("p",{className:"ai-section-hint",children:"시드 한 줄을 던지면 AI가 테마·의도·메커닉·학습목표·페이싱을 구조화해 채웁니다."}),u.jsx("textarea",{rows:3,value:s,onChange:g=>a(g.target.value),placeholder:"예: 3D 액션 어드벤처, 침수된 우주 정거장, 중력 조절 능력 획득",className:"ai-textarea"}),u.jsx("button",{onClick:v,disabled:l!==null,className:"ai-action",children:l==="concept"?"생성 중…":"컨셉 생성 (Pro)"})]}),u.jsxs("section",{className:"ai-section",children:[u.jsx("h4",{children:"② 포스트잇 시드"}),u.jsx("p",{className:"ai-section-hint",children:"컨셉으로부터 8~12장의 포스트잇 후보를 만들어 패드에 추가합니다."}),u.jsx("button",{onClick:A,disabled:l!==null||!t.concept.theme,className:"ai-action",children:l==="seed"?"생성 중…":"시드 추가 (Pro)"})]}),d&&u.jsx("p",{className:"ai-note",children:d})]})}function MC(n,r){if(n.match(/^[a-z]+:\/\//i))return n;if(n.match(/^\/\//))return window.location.protocol+n;if(n.match(/^[a-z]+:/i))return n;const e=document.implementation.createHTMLDocument(),t=e.createElement("base"),o=e.createElement("a");return e.head.appendChild(t),e.body.appendChild(o),r&&(t.href=r),o.href=n,o.href}const NC=(()=>{let n=0;const r=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(n+=1,`u${r()}${n}`)})();function ft(n){const r=[];for(let e=0,t=n.length;e<t;e++)r.push(n[e]);return r}let Xt=null;function oy(n={}){return Xt||(n.includeStyleProperties?(Xt=n.includeStyleProperties,Xt):(Xt=ft(window.getComputedStyle(document.documentElement)),Xt))}function Da(n,r){const t=(n.ownerDocument.defaultView||window).getComputedStyle(n).getPropertyValue(r);return t?parseFloat(t.replace("px","")):0}function jC(n){const r=Da(n,"border-left-width"),e=Da(n,"border-right-width");return n.clientWidth+r+e}function AC(n){const r=Da(n,"border-top-width"),e=Da(n,"border-bottom-width");return n.clientHeight+r+e}function iy(n,r={}){const e=r.width||jC(n),t=r.height||AC(n);return{width:e,height:t}}function OC(){let n,r;try{r=process}catch{}const e=r&&r.env?r.env.devicePixelRatio:null;return e&&(n=parseInt(e,10),Number.isNaN(n)&&(n=1)),n||window.devicePixelRatio||1}const zr=16384;function RC(n){(n.width>zr||n.height>zr)&&(n.width>zr&&n.height>zr?n.width>n.height?(n.height*=zr/n.width,n.width=zr):(n.width*=zr/n.height,n.height=zr):n.width>zr?(n.height*=zr/n.width,n.width=zr):(n.width*=zr/n.height,n.height=zr))}function Za(n){return new Promise((r,e)=>{const t=new Image;t.onload=()=>{t.decode().then(()=>{requestAnimationFrame(()=>r(t))})},t.onerror=e,t.crossOrigin="anonymous",t.decoding="async",t.src=n})}async function LC(n){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(n)).then(encodeURIComponent).then(r=>`data:image/svg+xml;charset=utf-8,${r}`)}async function DC(n,r,e){const t="http://www.w3.org/2000/svg",o=document.createElementNS(t,"svg"),i=document.createElementNS(t,"foreignObject");return o.setAttribute("width",`${r}`),o.setAttribute("height",`${e}`),o.setAttribute("viewBox",`0 0 ${r} ${e}`),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.setAttribute("x","0"),i.setAttribute("y","0"),i.setAttribute("externalResourcesRequired","true"),o.appendChild(i),i.appendChild(n),LC(o)}const $r=(n,r)=>{if(n instanceof r)return!0;const e=Object.getPrototypeOf(n);return e===null?!1:e.constructor.name===r.name||$r(e,r)};function ZC(n){const r=n.getPropertyValue("content");return`${n.cssText} content: '${r.replace(/'|"/g,"")}';`}function FC(n,r){return oy(r).map(e=>{const t=n.getPropertyValue(e),o=n.getPropertyPriority(e);return`${e}: ${t}${o?" !important":""};`}).join(" ")}function $C(n,r,e,t){const o=`.${n}:${r}`,i=e.cssText?ZC(e):FC(e,t);return document.createTextNode(`${o}{${i}}`)}function up(n,r,e,t){const o=window.getComputedStyle(n,e),i=o.getPropertyValue("content");if(i===""||i==="none")return;const s=NC();try{r.className=`${r.className} ${s}`}catch{return}const a=document.createElement("style");a.appendChild($C(s,e,o,t)),r.appendChild(a)}function zC(n,r,e){up(n,r,":before",e),up(n,r,":after",e)}const dp="application/font-woff",hp="image/jpeg",BC={woff:dp,woff2:dp,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:hp,jpeg:hp,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function HC(n){const r=/\.([^./]*?)$/g.exec(n);return r?r[1]:""}function Dd(n){const r=HC(n).toLowerCase();return BC[r]||""}function WC(n){return n.split(/,/)[1]}function Mu(n){return n.search(/^(data:)/)!==-1}function GC(n,r){return`data:${r};base64,${n}`}async function sy(n,r,e){const t=await fetch(n,r);if(t.status===404)throw new Error(`Resource "${t.url}" not found`);const o=await t.blob();return new Promise((i,s)=>{const a=new FileReader;a.onerror=s,a.onloadend=()=>{try{i(e({res:t,result:a.result}))}catch(l){s(l)}},a.readAsDataURL(o)})}const uc={};function VC(n,r,e){let t=n.replace(/\?.*/,"");return e&&(t=n),/ttf|otf|eot|woff2?/i.test(t)&&(t=t.replace(/.*\//,"")),r?`[${r}]${t}`:t}async function Zd(n,r,e){const t=VC(n,r,e.includeQueryParams);if(uc[t]!=null)return uc[t];e.cacheBust&&(n+=(/\?/.test(n)?"&":"?")+new Date().getTime());let o;try{const i=await sy(n,e.fetchRequestInit,({res:s,result:a})=>(r||(r=s.headers.get("Content-Type")||""),WC(a)));o=GC(i,r)}catch(i){o=e.imagePlaceholder||"";let s=`Failed to fetch resource: ${n}`;i&&(s=typeof i=="string"?i:i.message),s&&console.warn(s)}return uc[t]=o,o}async function UC(n){const r=n.toDataURL();return r==="data:,"?n.cloneNode(!1):Za(r)}async function KC(n,r){if(n.currentSrc){const i=document.createElement("canvas"),s=i.getContext("2d");i.width=n.clientWidth,i.height=n.clientHeight,s==null||s.drawImage(n,0,0,i.width,i.height);const a=i.toDataURL();return Za(a)}const e=n.poster,t=Dd(e),o=await Zd(e,t,r);return Za(o)}async function XC(n,r){var e;try{if(!((e=n==null?void 0:n.contentDocument)===null||e===void 0)&&e.body)return await dl(n.contentDocument.body,r,!0)}catch{}return n.cloneNode(!1)}async function YC(n,r){return $r(n,HTMLCanvasElement)?UC(n):$r(n,HTMLVideoElement)?KC(n,r):$r(n,HTMLIFrameElement)?XC(n,r):n.cloneNode(ay(n))}const QC=n=>n.tagName!=null&&n.tagName.toUpperCase()==="SLOT",ay=n=>n.tagName!=null&&n.tagName.toUpperCase()==="SVG";async function JC(n,r,e){var t,o;if(ay(r))return r;let i=[];return QC(n)&&n.assignedNodes?i=ft(n.assignedNodes()):$r(n,HTMLIFrameElement)&&(!((t=n.contentDocument)===null||t===void 0)&&t.body)?i=ft(n.contentDocument.body.childNodes):i=ft(((o=n.shadowRoot)!==null&&o!==void 0?o:n).childNodes),i.length===0||$r(n,HTMLVideoElement)||await i.reduce((s,a)=>s.then(()=>dl(a,e)).then(l=>{l&&r.appendChild(l)}),Promise.resolve()),r}function qC(n,r,e){const t=r.style;if(!t)return;const o=window.getComputedStyle(n);o.cssText?(t.cssText=o.cssText,t.transformOrigin=o.transformOrigin):oy(e).forEach(i=>{let s=o.getPropertyValue(i);i==="font-size"&&s.endsWith("px")&&(s=`${Math.floor(parseFloat(s.substring(0,s.length-2)))-.1}px`),$r(n,HTMLIFrameElement)&&i==="display"&&s==="inline"&&(s="block"),i==="d"&&r.getAttribute("d")&&(s=`path(${r.getAttribute("d")})`),t.setProperty(i,s,o.getPropertyPriority(i))})}function nP(n,r){$r(n,HTMLTextAreaElement)&&(r.innerHTML=n.value),$r(n,HTMLInputElement)&&r.setAttribute("value",n.value)}function rP(n,r){if($r(n,HTMLSelectElement)){const e=r,t=Array.from(e.children).find(o=>n.value===o.getAttribute("value"));t&&t.setAttribute("selected","")}}function eP(n,r,e){return $r(r,Element)&&(qC(n,r,e),zC(n,r,e),nP(n,r),rP(n,r)),r}async function tP(n,r){const e=n.querySelectorAll?n.querySelectorAll("use"):[];if(e.length===0)return n;const t={};for(let i=0;i<e.length;i++){const a=e[i].getAttribute("xlink:href");if(a){const l=n.querySelector(a),c=document.querySelector(a);!l&&c&&!t[a]&&(t[a]=await dl(c,r,!0))}}const o=Object.values(t);if(o.length){const i="http://www.w3.org/1999/xhtml",s=document.createElementNS(i,"svg");s.setAttribute("xmlns",i),s.style.position="absolute",s.style.width="0",s.style.height="0",s.style.overflow="hidden",s.style.display="none";const a=document.createElementNS(i,"defs");s.appendChild(a);for(let l=0;l<o.length;l++)a.appendChild(o[l]);n.appendChild(s)}return n}async function dl(n,r,e){return!e&&r.filter&&!r.filter(n)?null:Promise.resolve(n).then(t=>YC(t,r)).then(t=>JC(n,t,r)).then(t=>eP(n,t,r)).then(t=>tP(t,r))}const ly=/url\((['"]?)([^'"]+?)\1\)/g,oP=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,iP=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function sP(n){const r=n.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${r})(['"]?\\))`,"g")}function aP(n){const r=[];return n.replace(ly,(e,t,o)=>(r.push(o),e)),r.filter(e=>!Mu(e))}async function lP(n,r,e,t,o){try{const i=e?MC(r,e):r,s=Dd(r);let a;return o||(a=await Zd(i,s,t)),n.replace(sP(r),`$1${a}$3`)}catch{}return n}function cP(n,{preferredFontFormat:r}){return r?n.replace(iP,e=>{for(;;){const[t,,o]=oP.exec(e)||[];if(!o)return"";if(o===r)return`src: ${t};`}}):n}function cy(n){return n.search(ly)!==-1}async function uy(n,r,e){if(!cy(n))return n;const t=cP(n,e);return aP(t).reduce((i,s)=>i.then(a=>lP(a,s,r,e)),Promise.resolve(t))}async function Yt(n,r,e){var t;const o=(t=r.style)===null||t===void 0?void 0:t.getPropertyValue(n);if(o){const i=await uy(o,null,e);return r.style.setProperty(n,i,r.style.getPropertyPriority(n)),!0}return!1}async function uP(n,r){await Yt("background",n,r)||await Yt("background-image",n,r),await Yt("mask",n,r)||await Yt("-webkit-mask",n,r)||await Yt("mask-image",n,r)||await Yt("-webkit-mask-image",n,r)}async function dP(n,r){const e=$r(n,HTMLImageElement);if(!(e&&!Mu(n.src))&&!($r(n,SVGImageElement)&&!Mu(n.href.baseVal)))return;const t=e?n.src:n.href.baseVal,o=await Zd(t,Dd(t),r);await new Promise((i,s)=>{n.onload=i,n.onerror=r.onImageErrorHandler?(...l)=>{try{i(r.onImageErrorHandler(...l))}catch(c){s(c)}}:s;const a=n;a.decode&&(a.decode=i),a.loading==="lazy"&&(a.loading="eager"),e?(n.srcset="",n.src=o):n.href.baseVal=o})}async function hP(n,r){const t=ft(n.childNodes).map(o=>dy(o,r));await Promise.all(t).then(()=>n)}async function dy(n,r){$r(n,Element)&&(await uP(n,r),await dP(n,r),await hP(n,r))}function fP(n,r){const{style:e}=n;r.backgroundColor&&(e.backgroundColor=r.backgroundColor),r.width&&(e.width=`${r.width}px`),r.height&&(e.height=`${r.height}px`);const t=r.style;return t!=null&&Object.keys(t).forEach(o=>{e[o]=t[o]}),n}const fp={};async function pp(n){let r=fp[n];if(r!=null)return r;const t=await(await fetch(n)).text();return r={url:n,cssText:t},fp[n]=r,r}async function mp(n,r){let e=n.cssText;const t=/url\(["']?([^"')]+)["']?\)/g,i=(e.match(/url\([^)]+\)/g)||[]).map(async s=>{let a=s.replace(t,"$1");return a.startsWith("https://")||(a=new URL(a,n.url).href),sy(a,r.fetchRequestInit,({result:l})=>(e=e.replace(s,`url(${l})`),[s,l]))});return Promise.all(i).then(()=>e)}function gp(n){if(n==null)return[];const r=[],e=/(\/\*[\s\S]*?\*\/)/gi;let t=n.replace(e,"");const o=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const l=o.exec(t);if(l===null)break;r.push(l[0])}t=t.replace(o,"");const i=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,s="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",a=new RegExp(s,"gi");for(;;){let l=i.exec(t);if(l===null){if(l=a.exec(t),l===null)break;i.lastIndex=a.lastIndex}else a.lastIndex=i.lastIndex;r.push(l[0])}return r}async function pP(n,r){const e=[],t=[];return n.forEach(o=>{if("cssRules"in o)try{ft(o.cssRules||[]).forEach((i,s)=>{if(i.type===CSSRule.IMPORT_RULE){let a=s+1;const l=i.href,c=pp(l).then(d=>mp(d,r)).then(d=>gp(d).forEach(h=>{try{o.insertRule(h,h.startsWith("@import")?a+=1:o.cssRules.length)}catch(f){console.error("Error inserting rule from remote css",{rule:h,error:f})}})).catch(d=>{console.error("Error loading remote css",d.toString())});t.push(c)}})}catch(i){const s=n.find(a=>a.href==null)||document.styleSheets[0];o.href!=null&&t.push(pp(o.href).then(a=>mp(a,r)).then(a=>gp(a).forEach(l=>{s.insertRule(l,s.cssRules.length)})).catch(a=>{console.error("Error loading remote stylesheet",a)})),console.error("Error inlining remote css file",i)}}),Promise.all(t).then(()=>(n.forEach(o=>{if("cssRules"in o)try{ft(o.cssRules||[]).forEach(i=>{e.push(i)})}catch(i){console.error(`Error while reading CSS rules from ${o.href}`,i)}}),e))}function mP(n){return n.filter(r=>r.type===CSSRule.FONT_FACE_RULE).filter(r=>cy(r.style.getPropertyValue("src")))}async function gP(n,r){if(n.ownerDocument==null)throw new Error("Provided element is not within a Document");const e=ft(n.ownerDocument.styleSheets),t=await pP(e,r);return mP(t)}function hy(n){return n.trim().replace(/["']/g,"")}function yP(n){const r=new Set;function e(t){(t.style.fontFamily||getComputedStyle(t).fontFamily).split(",").forEach(i=>{r.add(hy(i))}),Array.from(t.children).forEach(i=>{i instanceof HTMLElement&&e(i)})}return e(n),r}async function vP(n,r){const e=await gP(n,r),t=yP(n);return(await Promise.all(e.filter(i=>t.has(hy(i.style.fontFamily))).map(i=>{const s=i.parentStyleSheet?i.parentStyleSheet.href:null;return uy(i.cssText,s,r)}))).join(`
`)}async function xP(n,r){const e=r.fontEmbedCSS!=null?r.fontEmbedCSS:r.skipFonts?null:await vP(n,r);if(e){const t=document.createElement("style"),o=document.createTextNode(e);t.appendChild(o),n.firstChild?n.insertBefore(t,n.firstChild):n.appendChild(t)}}async function wP(n,r={}){const{width:e,height:t}=iy(n,r),o=await dl(n,r,!0);return await xP(o,r),await dy(o,r),fP(o,r),await DC(o,e,t)}async function SP(n,r={}){const{width:e,height:t}=iy(n,r),o=await wP(n,r),i=await Za(o),s=document.createElement("canvas"),a=s.getContext("2d"),l=r.pixelRatio||OC(),c=r.canvasWidth||e,d=r.canvasHeight||t;return s.width=c*l,s.height=d*l,r.skipAutoScale||RC(s),s.style.width=`${c}`,s.style.height=`${d}`,r.backgroundColor&&(a.fillStyle=r.backgroundColor,a.fillRect(0,0,s.width,s.height)),a.drawImage(i,0,0,s.width,s.height),s}async function Nu(n,r={}){return(await SP(n,r)).toDataURL()}function kP(n){var o,i,s;const r=[];r.push(`# ${n.name}`),r.push(""),r.push(`> 생성일: ${new Date(n.updatedAt).toLocaleString("ko-KR")}`),r.push(""),r.push("## 컨셉");const e=n.concept;if(e.theme&&r.push(`- **테마**: ${e.theme}`),e.intent&&r.push(`- **의도**: ${e.intent}`),e.coreMechanic&&r.push(`- **코어 메커닉**: ${e.coreMechanic}`),e.pacing&&r.push(`- **페이싱**: ${e.pacing}`),(o=e.learningGoals)!=null&&o.length&&(r.push("- **학습 목표**:"),e.learningGoals.forEach(a=>r.push(`  - ${a}`))),e.fantasyHook&&r.push(`- **판타지 후크**: ${e.fantasyHook}`),r.push(""),n.nodes.length>0){r.push("## 룸 명세"),r.push("");for(const a of n.nodes){const l=Fe[a.type];r.push(`### ${l.icon} ${a.name} — _${l.label}_`),r.push(""),a.icons.length>0&&r.push(`- 태그: ${a.icons.map(c=>`\`${c}\``).join(", ")}`),a.notes&&(r.push(""),r.push(a.notes)),a.mjPrompt&&(r.push(""),r.push("**Midjourney**:"),r.push("```"),r.push(a.mjPrompt),r.push("```")),r.push("")}}if(n.edges.length>0){r.push("## 동선"),r.push(""),r.push("| 출발 | → | 도착 | 타입 | 메타 |"),r.push("|:--|:--|:--|:--|:--|");for(const a of n.edges){const l=((i=n.nodes.find(f=>f.id===a.from))==null?void 0:i.name)??"?",c=((s=n.nodes.find(f=>f.id===a.to))==null?void 0:s.name)??"?",d=Yi[a.type],h=a.keyId?`🔑 ${a.keyId}`:a.abilityId?`✦ ${a.abilityId}`:a.label??"";r.push(`| ${l} | → | ${c} | ${d.label} | ${h} |`)}r.push("")}n.mjMasterPrompt&&(r.push("## 마스터 Midjourney 프롬프트"),r.push(""),r.push("```"),r.push(n.mjMasterPrompt),r.push("```"),r.push(""));const t=n.postits.filter(a=>!a.promoted);if(t.length>0){r.push("## 보류 메모"),r.push("");for(const a of t)r.push(`- ${a.text}${a.tags.length?` _(${a.tags.join(", ")})_`:""}`);r.push("")}return r.join(`
`)}function _P(){const n=B(S=>S.project),[r,e]=N.useState(!1),[t,o]=N.useState(null),[i,s]=N.useState(!0),[a,l]=N.useState(!0),[c,d]=N.useState(2048),h=async S=>{if(!a)return S();const b=document.documentElement,O=b.dataset.theme;if(O==="light")return S();b.dataset.theme="light",await new Promise(E=>requestAnimationFrame(()=>requestAnimationFrame(E)));try{return await S()}finally{O===void 0?delete b.dataset.theme:b.dataset.theme=O}},f=(S,b)=>{const O=URL.createObjectURL(S),E=document.createElement("a");E.href=O,E.download=b,E.click(),URL.revokeObjectURL(O)},m=async()=>{e(!0),o(null);try{await h(async()=>{const S=document.querySelector(".canvas-wrap");if(!S)throw new Error("캔버스를 찾을 수 없음");const b={pixelRatio:2,filter:Z=>{var F,K,I,Y;return!(Z instanceof HTMLElement&&((F=Z.classList)!=null&&F.contains("canvas-minimap")||(K=Z.classList)!=null&&K.contains("canvas-toolbar")||(I=Z.classList)!=null&&I.contains("canvas-drop-banner")||(Y=Z.classList)!=null&&Y.contains("canvas-empty")))}};i?(b.backgroundColor=void 0,b.style={background:"transparent",backgroundColor:"transparent",backgroundImage:"none"}):b.backgroundColor="#F4EFE6";const O=await Nu(S,b),E=document.createElement("a");E.href=O,E.download=`${n.name||"level"}${i?"_transparent":""}.png`,E.click()}),o(i?"PNG 저장 완료 (투명 배경)":"PNG 저장 완료")}catch(S){o(`PNG 실패: ${S.message??S}`)}finally{e(!1)}},y=()=>{let S=1/0,b=1/0,O=-1/0,E=-1/0,Z=!1;for(const F of n.nodes){const{rx:K,ry:I}=$e(F.type,F.size??1,F.aspect??1),Y=F.icons.length>0?Math.ceil(Math.min(F.icons.length,8)/4):0,H=Y*18+(Y>0?10:0);S=Math.min(S,F.x-K-12),b=Math.min(b,F.y-I-12),O=Math.max(O,F.x+K+12),E=Math.max(E,F.y+I+12+H),Z=!0}for(const F of n.decorations){if(F.kind==="arrow"){const K=F.x2??F.x+140,I=F.y2??F.y;S=Math.min(S,F.x-32,K-32),b=Math.min(b,F.y-32,I-32),O=Math.max(O,F.x+32,K+32),E=Math.max(E,F.y+32,I+32)}else{const K=(F.width??180)/2+8,I=(F.height??(F.kind==="text"?40:90))/2+8;S=Math.min(S,F.x-K),b=Math.min(b,F.y-I),O=Math.max(O,F.x+K),E=Math.max(E,F.y+I)}Z=!0}for(const F of n.images??[])S=Math.min(S,F.x-F.width/2-8),b=Math.min(b,F.y-F.height/2-8),O=Math.max(O,F.x+F.width/2+8),E=Math.max(E,F.y+F.height/2+8),Z=!0;return Z?{minX:S,minY:b,maxX:O,maxY:E}:null},v=async S=>{e(!0),o(null);try{const b=y();if(!b){o("내보낼 노드/데코가 없음");return}await h(async()=>{const O=document.querySelector(".canvas-svg");if(!O)throw new Error("SVG를 찾을 수 없음");const E=b.maxX-b.minX,Z=b.maxY-b.minY,F=Math.max(E,Z),K=F*.08,I=F+K*2,Y=(b.minX+b.maxX)/2,H=(b.minY+b.maxY)/2,k=Y-I/2,R=H-I/2,M=O.cloneNode(!0);M.setAttribute("xmlns","http://www.w3.org/2000/svg"),M.setAttribute("width",String(S)),M.setAttribute("height",String(S)),M.setAttribute("viewBox",`${k} ${R} ${I} ${I}`),M.setAttribute("preserveAspectRatio","xMidYMid meet");const j=M.querySelector("[data-cv-world]");j&&j.removeAttribute("transform"),M.querySelectorAll("[data-handle]").forEach(G=>G.remove()),M.querySelectorAll(".deco-handle").forEach(G=>G.remove()),M.querySelectorAll(".img-handle").forEach(G=>G.remove()),M.querySelectorAll(".bn-handle").forEach(G=>G.remove()),M.querySelectorAll("[data-bg]").forEach(G=>G.remove());const w=document.createElement("div");w.style.cssText=`position:fixed;left:-99999px;top:0;width:${S}px;height:${S}px;pointer-events:none;background:transparent;`,w.appendChild(M),document.body.appendChild(w);let C;try{C=await Nu(M,{width:S,height:S,canvasWidth:S,canvasHeight:S,pixelRatio:1,backgroundColor:i?void 0:"#F4EFE6",style:i?{background:"transparent",backgroundColor:"transparent",backgroundImage:"none"}:{background:"#F4EFE6"}})}finally{document.body.removeChild(w)}const z=document.createElement("a");z.href=C,z.download=`${n.name||"level"}_${S}${i?"_transparent":""}.png`,z.click()}),o(`PNG ${S}×${S} 저장 완료`)}catch(b){o(`PNG ${S} 실패: ${b.message??b}`)}finally{e(!1)}},A=async()=>{e(!0),o(null);try{const S=document.querySelector(".canvas-svg");if(!S)throw new Error("SVG를 찾을 수 없음");const b=S.cloneNode(!0);b.setAttribute("xmlns","http://www.w3.org/2000/svg");const E=new XMLSerializer().serializeToString(b),Z=new Blob([`<?xml version="1.0"?>
${E}`],{type:"image/svg+xml"});f(Z,`${n.name||"level"}.svg`),o("SVG 저장 완료")}catch(S){o(`SVG 실패: ${S.message??S}`)}finally{e(!1)}},g=()=>{const S=kP(n),b=new Blob([S],{type:"text/markdown"});f(b,`${n.name||"level"}.md`),o("Markdown 저장 완료")},p=()=>{il(n,`${n.name||"level"}.json`),o("JSON 저장 완료")},x={nodes:n.nodes.length,edges:n.edges.length,postits:n.postits.length};return u.jsxs("div",{className:"exp-panel",children:[u.jsxs("section",{className:"exp-stats",children:[u.jsxs("div",{children:[u.jsx("strong",{children:x.nodes}),u.jsx("span",{children:"노드"})]}),u.jsxs("div",{children:[u.jsx("strong",{children:x.edges}),u.jsx("span",{children:"간선"})]}),u.jsxs("div",{children:[u.jsx("strong",{children:x.postits}),u.jsx("span",{children:"포스트잇"})]})]}),u.jsxs("div",{className:"exp-buttons",children:[u.jsx("button",{onClick:m,disabled:r,className:"exp-btn exp-btn--primary",children:r?"저장 중…":`PNG 이미지${i?" (투명)":""}`}),u.jsxs("div",{className:"exp-square",children:[u.jsx("div",{className:"exp-square-label",children:"정사각 PNG (콘텐츠 자동 맞춤·8% 여백)"}),u.jsx("div",{className:"exp-seg",children:[512,1024,2048,4096].map(S=>u.jsx("button",{className:`exp-seg-btn ${c===S?"is-on":""}`,onClick:()=>d(S),disabled:r,type:"button",children:S},S))}),u.jsx("button",{onClick:()=>v(c),disabled:r,className:"exp-btn exp-btn--primary",children:r?"저장 중…":`PNG ${c}×${c}${i?" (투명)":""}`})]}),u.jsxs("label",{className:"exp-opt",children:[u.jsx("input",{type:"checkbox",checked:i,onChange:S=>s(S.target.checked)}),u.jsx("span",{children:"투명 배경 (언리얼/포토샵 임포트용)"})]}),u.jsxs("label",{className:"exp-opt",children:[u.jsx("input",{type:"checkbox",checked:a,onChange:S=>l(S.target.checked)}),u.jsx("span",{children:"라이트 테마로 강제 출력 (포트폴리오·인쇄용)"})]}),u.jsx("button",{onClick:A,disabled:r,className:"exp-btn",children:"SVG 벡터"}),u.jsx("button",{onClick:g,disabled:r,className:"exp-btn",children:"Markdown 명세서"}),u.jsx("button",{onClick:p,disabled:r,className:"exp-btn",children:"JSON 프로젝트"})]}),t&&u.jsx("p",{className:"exp-note caption",children:t}),u.jsxs("details",{className:"exp-help",children:[u.jsx("summary",{children:"도움말"}),u.jsxs("ul",{children:[u.jsxs("li",{children:[u.jsx("strong",{children:"PNG"})," — 현재 캔버스 뷰 그대로. 기본은 투명 배경, 체크 해제 시 종이톤 포함. 그리드·미니맵 항상 제외."]}),u.jsxs("li",{children:[u.jsx("strong",{children:"라이트 강제"})," — 화면이 다크 모드여도 PNG는 항상 라이트로 출력. 포트폴리오 PDF·인쇄·면접관 화면 호환 보장. 출력 직후 화면은 원래 테마로 복원."]}),u.jsxs("li",{children:[u.jsx("strong",{children:"정사각 PNG"})," — 모든 노드/데코를 정사각 프레임에 8% 여백으로 자동 맞춤. 512 / 1024 / 2048 / 4096 중 선택. 언리얼 Texture2D 표준 크기 (BC7 호환)."]}),u.jsxs("li",{children:[u.jsx("strong",{children:"SVG"})," — 벡터. Illustrator/Figma 추가 편집용."]}),u.jsxs("li",{children:[u.jsx("strong",{children:"Markdown"})," — 룸 명세서 텍스트. 포트폴리오 README용."]}),u.jsxs("li",{children:[u.jsx("strong",{children:"JSON"})," — 프로젝트 원본. 동료에게 공유·백업용."]})]})]})]})}const bP={room:"an interior chamber with stone walls and ambient lighting",vista:"a sweeping vista with distant landmark and dramatic depth",treasure:"a treasure chamber, gilded relic on a pedestal, beams of light",boss:"a vast boss arena, towering silhouette, atmospheric tension",hub:"a central hub plaza with multiple converging paths",save:"a small sanctuary with a glowing altar, restful warmth"},fy={chasm:"wide chasm splitting the floor",treasure_visible:"distant treasure glimmering across the gap",dash_required:"narrow leap of faith over a void",key:"ornate key resting on stone",lock:"massive locked door, iron bolts",oneway:"one-way drop, no return",ability_gate:"mystical barrier of light",enemy:"silhouettes of patrolling enemies",trap:"trap mechanism, blades or arrows",pressure_plate:"ancient pressure plate on the floor",switch:"lever mechanism set in the wall",save_altar:"glowing save altar",vista:"panoramic view, distant landmark",water:"reflective water surface",fire:"flickering fire and embers",ice:"frozen ice crystals everywhere",shadow:"long dramatic shadows",light:"shafts of warm light"},py=[{match:/사원|temple/i,keywords:["ancient temple ruins","weathered stone columns","overgrown vegetation","shafts of warm sunlight"]},{match:/성당|cathedral/i,keywords:["shattered cathedral","gothic arches","stained glass shards on the floor","dust motes in light"]},{match:/협곡|canyon/i,keywords:["desert canyon","wind-eroded sandstone","rope bridges","golden hour"]},{match:/묘소|crypt|catacomb/i,keywords:["underground crypt","low torchlit ceilings","sarcophagi","cold stone"]},{match:/화산|volcano/i,keywords:["active volcano interior","molten lava rivers","obsidian formations","ember haze"]},{match:/시계탑|clock tower/i,keywords:["victorian clock tower","giant brass gears","pendulum chamber","amber gaslight"]},{match:/해|sea|ocean|침수/i,keywords:["flooded fortress","half-submerged corridors","coral and barnacles","shafts of blue light through water"]},{match:/첨탑|spire/i,keywords:["windswept spire","wrought iron walkways","cloud sea below","piercing sun"]},{match:/저택|manor|mansion/i,keywords:["victorian manor","baroque wallpaper","flickering candelabra","long oak halls"]},{match:/창고|warehouse/i,keywords:["rainy night warehouse","shipping containers","sodium vapor lights","wet concrete reflections"]},{match:/성|castle/i,keywords:["medieval castle interior","tapestries and torchlight","cold stone walls"]},{match:/우주|space|sci-fi/i,keywords:["derelict space station","flickering emergency lighting","panel readouts","cold metal corridors"]},{match:/신전|shrine/i,keywords:["jungle temple","mossy stone","shafts of green light through canopy"]},{match:/감옥|prison/i,keywords:["stone prison interior","iron bars","damp torchlit corridors"]},{match:/동굴|cave/i,keywords:["crystal cave","bioluminescent flora","damp stone"]},{match:/숲|forest/i,keywords:["ancient forest","colossal trees","soft beams of sunlight","leaf litter"]},{match:/마을|village/i,keywords:["fog-shrouded village","wooden buildings","lantern light","low rooftops"]},{match:/항구|harbor|port/i,keywords:["old harbor","wooden piers","fog and gulls"]},{match:/기지|base|station/i,keywords:["arctic research base","snow drifts","cold blue light"]},{match:/사막|desert/i,keywords:["vast desert","shifting dunes","mirage haze"]},{match:/쇼핑몰|mall/i,keywords:["abandoned shopping mall","broken neon signs","overturned carts"]},{match:/병원|hospital/i,keywords:["dim hospital corridor","flickering fluorescent","gurneys"]},{match:/피라미드|pyramid/i,keywords:["ancient pyramid interior","hieroglyph walls","shafts of golden light"]}],CP=[{match:/잔잔|평온|차분/i,keywords:["contemplative atmosphere","soft ambient lighting"]},{match:/긴장|위기|불안/i,keywords:["ominous atmosphere","high contrast lighting","heavy shadows"]},{match:/클라이맥스|보스|결전/i,keywords:["climactic dramatic atmosphere","volumetric light shafts","epic scale"]},{match:/느림|느린|slow/i,keywords:["unhurried mood","still air"]},{match:/빠름|추격|chase/i,keywords:["dynamic motion","sense of speed","kinetic energy"]}],uo="--ar 16:9 --v 8.1 --style raw --stylize 250 --chaos 8",PP=/[가-힯㄰-㆏ᄀ-ᇿ]/,my=n=>PP.test(n);function vi(n){return n.replace(/[가-힯㄰-㆏ᄀ-ᇿ]+/g,"").replace(/[一-龥]+/g,"").replace(/[ぁ-んァ-ヶー]+/g,"").replace(/,\s*,/g,",").replace(/,\s*$/g,"").replace(/\s+/g," ").trim()}const TP=[{match:/능력|ability|power|skill/i,keywords:["ability acquisition moment","ritualistic discovery"]},{match:/스텔스|stealth|잠입|infilt/i,keywords:["stealthy infiltration","tense quiet atmosphere"]},{match:/퍼즐|puzzle|수수께끼/i,keywords:["puzzle setting","intricate mechanisms"]},{match:/전투|combat|battle|싸움/i,keywords:["combat arena energy","kinetic tension"]},{match:/탐험|exploration|발견|discover/i,keywords:["exploratory wonder","rewarding discovery"]},{match:/생존|survival|위기/i,keywords:["survival pressure","scarce resources"]},{match:/감정|narrative|이야기|drama/i,keywords:["emotional atmosphere","narrative weight"]},{match:/추격|chase|escape/i,keywords:["high-speed chase","urgent momentum"]},{match:/보스|boss|클라이맥스|climax/i,keywords:["climactic boss encounter","epic confrontation"]}];function Es(n,r){const{concept:e,nodes:t}=n,o=`${e.theme} ${e.intent} ${e.pacing} ${e.coreMechanic}`,i=Js(o,py),s=Js(e.pacing+" "+e.intent,CP),a=Js(o,TP),l=new Map;t.forEach(b=>b.icons.forEach(O=>{l.set(O,(l.get(O)??0)+1)}));const c=[...l.entries()].sort((b,O)=>O[1]-b[1]).slice(0,5).map(([b])=>fy[b]).filter(Boolean),d=IP(e.pacing,t),h=EP(t),f=e.theme&&!my(e.theme)?e.theme.slice(0,60):"",m=f?`a cohesive game world set in ${f}`:i.length>0?`a cohesive game world featuring ${i.slice(0,2).join(" and ")}`:"a cohesive game world atmosphere",y=[...i.slice(0,3),...c].slice(0,5),v=a.length>0?`gameplay feeling: ${a.slice(0,2).join(", ")}`:"",A=d.atmosphere,g=d.lighting,p=MP(i,h),S=[m,y.join(", "),v,A,g,p,s.join(", "),"key art mood board for a video game, promotional poster composition, painterly digital illustration, cinematic wide shot, layered atmospheric depth, masterful color theory"].filter(Boolean);return vi(`${S.join(", ")} ${uo}`)}function IP(n,r){const e=r.filter(s=>s.type==="boss").length,t=r.filter(s=>s.type==="save").length,o=r.filter(s=>s.type==="vista").length,i=n.toLowerCase();return e>=2||/클라이맥스|climax|결전|epic/i.test(i)?{atmosphere:"epic dramatic atmosphere with rising tension across the world",lighting:"cinematic high-contrast lighting, god rays, deep shadows"}:o>=2||/탐험|exploration|평온|벨앙스/i.test(i)?{atmosphere:"contemplative serene atmosphere with awe-inspiring scale",lighting:"soft volumetric light, golden hour ambient glow"}:t>=2||/휴식|차분|stillness/i.test(i)?{atmosphere:"restful intimate atmosphere with quiet beats",lighting:"warm ambient lantern light, soft shadows"}:{atmosphere:"balanced adventurous atmosphere with shifting moods",lighting:"naturalistic cinematic lighting with subtle gradients"}}function EP(n){const r={};return n.forEach(e=>{r[e.type]=(r[e.type]??0)+1}),r}function MP(n,r){const e=n.join(" ").toLowerCase();return/lava|volcano|ember|molten/.test(e)?"molten orange and obsidian black palette with ember accents":/snow|arctic|ice|frozen|blizzard/.test(e)?"icy blue and stark white palette with cold cyan accents":/jungle|forest|moss/.test(e)?"deep green and weathered stone palette with shafts of warm light":/desert|dune|sandstone/.test(e)?"golden amber and rust palette with mirage haze":/space|station|metal|sci.?fi|cyber/.test(e)?"cool steel blue and neon accent palette":/cathedral|gothic|stone/.test(e)?"cold stone gray and stained-glass jewel-tone palette":/manor|victorian|mansion/.test(e)?"sepia and oak wood palette with candlelight gold":/water|ocean|flooded|coral/.test(e)?"submerged teal and bone-white palette with refracted caustics":(r.boss??0)>=2?"high-contrast crimson and charcoal palette":(r.vista??0)>=2?"wide naturalistic palette with horizon depth":"cohesive painterly palette with harmonized accent colors"}function Xo(n,r,e){const{concept:t}=r,o=`${t.theme} ${t.intent} ${t.coreMechanic}`,i=Js(o,py),s=n.name&&!my(n.name)?n.name:"",a=bP[n.type],l=s||a,c=n.icons.map(h=>fy[h]).filter(Boolean),d=[l,s?a:"",c.join(", "),i.slice(0,3).join(", "),"video game concept art, painterly digital illustration, cinematic lighting, atmospheric depth"].filter(Boolean);return vi(`${d.join(", ")} ${uo}`)}function Js(n,r){const e=[];for(const{match:t,keywords:o}of r)t.test(n)&&e.push(...o);return Array.from(new Set(e))}const NP=["room","vista","treasure","boss","hub","save"],jP=["open","locked","oneway","ability","vista"],AP=["chasm","treasure_visible","dash_required","key","lock","oneway","ability_gate","enemy","trap","pressure_plate","switch","save_altar","vista","water","fire","ice","shadow","light"];function OP(){const n=B(l=>l.selection),r=B(l=>l.project),e=n.kind==="node"?r.nodes.find(l=>l.id===n.id):null,t=n.kind==="edge"?r.edges.find(l=>l.id===n.id):null,o=n.kind==="postit"?r.postits.find(l=>l.id===n.id):null,i=n.kind==="decoration"?(r.decorations??[]).find(l=>l.id===n.id):null,[s,a]=N.useState("inspect");return u.jsxs("aside",{className:"inspector edge-left",children:[u.jsxs("div",{className:"ins-tabs",children:[u.jsx("button",{className:s==="inspect"?"is-active":"",onClick:()=>a("inspect"),children:"속성"}),u.jsx("button",{className:s==="mj"?"is-active":"",onClick:()=>a("mj"),children:"MJ 프롬프트"}),u.jsx("button",{className:s==="ai"?"is-active":"",onClick:()=>a("ai"),children:"AI"}),u.jsx("button",{className:s==="export"?"is-active":"",onClick:()=>a("export"),children:"Export"})]}),u.jsxs("div",{className:"ins-body",children:[s==="inspect"&&u.jsxs(u.Fragment,{children:[e&&u.jsx(LP,{node:e}),t&&u.jsx(DP,{edge:t}),o&&u.jsx(ZP,{postitId:o.id}),i&&u.jsx(FP,{dec:i}),!e&&!t&&!o&&!i&&u.jsx(RP,{})]}),s==="mj"&&u.jsx($P,{nodeId:e==null?void 0:e.id}),s==="ai"&&u.jsx(EC,{}),s==="export"&&u.jsx(_P,{})]}),u.jsx(gC,{})]})}function RP(){return u.jsxs("div",{className:"ins-empty",children:[u.jsx("p",{className:"hand",children:"아무것도 선택되지 않았습니다."}),u.jsxs("ul",{className:"ins-empty-tips caption",children:[u.jsx("li",{children:"· 노드를 클릭 → 속성 편집"}),u.jsx("li",{children:"· 노드 우측 핸들에서 드래그 → 엣지 그리기"}),u.jsx("li",{children:"· 포스트잇을 캔버스로 드래그 → 노드로 승격"})]})]})}function LP({node:n}){const r=B(f=>f.updateNode),e=B(f=>f.removeNode),t=B(f=>f.resizeNode),o=B(f=>f.setNodeAspect),i=B(f=>f.bringNodeToFront),s=B(f=>f.sendNodeToBack),a=n.size??1,l=n.aspect??1,c=Fe[n.type],d=Math.round(c.rx*a*Math.sqrt(l)),h=Math.round(c.ry*a/Math.sqrt(l));return u.jsxs("div",{className:"ins-section",children:[u.jsxs("div",{className:"ins-section-head",children:[u.jsx("span",{className:"caption",children:"노드"}),u.jsx("button",{className:"ins-del",onClick:()=>e(n.id),children:"삭제"})]}),u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"이름"}),u.jsx("input",{value:n.name,onChange:f=>r(n.id,{name:f.target.value})})]}),u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"레이어 순서"}),u.jsxs("div",{className:"ins-z-row",children:[u.jsx("button",{onClick:()=>s(n.id),className:"ins-z-btn",title:"다른 노드 뒤로",children:"▽ 맨 뒤로"}),u.jsx("button",{onClick:()=>i(n.id),className:"ins-z-btn",title:"다른 노드 앞으로",children:"△ 맨 앞으로"})]})]}),u.jsxs("label",{className:"ins-field",children:[u.jsxs("span",{children:["크기 · ",Math.round(a*100),"% · ",d,"×",h]}),u.jsxs("div",{className:"ins-size-row",children:[u.jsx("input",{type:"range",min:"0.5",max:"2.5",step:"0.05",value:a,onChange:f=>t(n.id,parseFloat(f.target.value)),className:"ins-size-slider"}),u.jsx("button",{onClick:()=>{t(n.id,1),o(n.id,1)},className:"ins-size-reset",title:"크기·형태 모두 기본값",children:"↻"})]}),u.jsx("p",{className:"ins-hint-mini",children:"캔버스의 파란 핸들을 드래그하면 가로·세로를 자유롭게 조절"})]}),u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"타입"}),u.jsx("div",{className:"ins-chips",children:NP.map(f=>{const m=Fe[f];return u.jsxs("button",{className:`ins-chip ${n.type===f?"is-active":""}`,onClick:()=>r(n.id,{type:f}),style:{borderColor:n.type===f?m.stroke:void 0},children:[u.jsx("span",{className:"ins-chip-icon",children:m.icon})," ",m.label]},f)})})]}),u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"키워드 태그 (노드 아래·MJ 프롬프트에 반영)"}),u.jsx("div",{className:"ins-chips ins-chips--small",children:AP.map(f=>{const m=n.icons.includes(f);return u.jsx("button",{className:`ins-chip ins-chip--small ${m?"is-active":""}`,onClick:()=>{const y=m?n.icons.filter(v=>v!==f):[...n.icons,f];r(n.id,{icons:y})},children:f},f)})})]}),u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"노트"}),u.jsx("textarea",{rows:5,value:n.notes,onChange:f=>r(n.id,{notes:f.target.value}),placeholder:"이 방에서 일어나는 일, 적, 환경 디테일…"})]})]})}function DP({edge:n}){const r=B(s=>s.updateEdge),e=B(s=>s.removeEdge),t=B(s=>s.project.nodes),o=t.find(s=>s.id===n.from),i=t.find(s=>s.id===n.to);return u.jsxs("div",{className:"ins-section",children:[u.jsxs("div",{className:"ins-section-head",children:[u.jsx("span",{className:"caption",children:"간선"}),u.jsx("button",{className:"ins-del",onClick:()=>e(n.id),children:"삭제"})]}),u.jsxs("div",{className:"ins-edge-flow",children:[u.jsx("span",{children:(o==null?void 0:o.name)??"?"}),u.jsx("span",{className:"ins-arrow",children:"→"}),u.jsx("span",{children:(i==null?void 0:i.name)??"?"})]}),u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"타입"}),u.jsx("div",{className:"ins-chips",children:jP.map(s=>{const a=Yi[s];return u.jsx("button",{className:`ins-chip ${n.type===s?"is-active":""}`,onClick:()=>r(n.id,{type:s}),style:{borderColor:n.type===s?a.stroke:void 0},children:a.label},s)})})]}),n.type==="locked"&&u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"키 ID"}),u.jsx("input",{value:n.keyId??"",onChange:s=>r(n.id,{keyId:s.target.value}),placeholder:"예: dragon_key"})]}),n.type==="ability"&&u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"능력 ID"}),u.jsx("input",{value:n.abilityId??"",onChange:s=>r(n.id,{abilityId:s.target.value}),placeholder:"예: dash"})]}),u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"라벨 (선택)"}),u.jsx("input",{value:n.label??"",onChange:s=>r(n.id,{label:s.target.value})})]})]})}function ZP({postitId:n}){const r=B(a=>a.project.postits.find(l=>l.id===n)),e=B(a=>a.updatePostit),t=B(a=>a.removePostit),[o,i]=N.useState("");if(!r)return null;const s=()=>{const a=o.trim();a&&(e(r.id,{tags:Array.from(new Set([...r.tags,a]))}),i(""))};return u.jsxs("div",{className:"ins-section",children:[u.jsxs("div",{className:"ins-section-head",children:[u.jsx("span",{className:"caption",children:"포스트잇"}),u.jsx("button",{className:"ins-del",onClick:()=>t(r.id),children:"삭제"})]}),u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"내용"}),u.jsx("textarea",{rows:4,value:r.text,onChange:a=>e(r.id,{text:a.target.value})})]}),u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"태그 추가"}),u.jsxs("div",{className:"ins-tag-input",children:[u.jsx("input",{value:o,onChange:a=>i(a.target.value),onKeyDown:a=>{a.key==="Enter"&&s()},placeholder:"태그 + Enter"}),u.jsx("button",{onClick:s,children:"+"})]}),r.tags.length>0&&u.jsx("div",{className:"ins-tag-list",children:r.tags.map(a=>u.jsxs("button",{className:"ins-tag",onClick:()=>e(r.id,{tags:r.tags.filter(l=>l!==a)}),children:["#",a," ×"]},a))})]})]})}function FP({dec:n}){const r=B(o=>o.updateDecoration),e=B(o=>o.removeDecoration),t=n.kind==="arrow"?"화살표":n.kind==="ellipse"?"회색 타원":"텍스트";return u.jsxs("div",{className:"ins-section",children:[u.jsxs("div",{className:"ins-section-head",children:[u.jsxs("span",{className:"caption",children:["데코 · ",t]}),u.jsx("button",{className:"ins-del",onClick:()=>e(n.id),children:"삭제"})]}),n.kind==="text"&&u.jsxs("label",{className:"ins-field",children:[u.jsx("span",{children:"텍스트"}),u.jsx("textarea",{rows:3,value:n.text??"",onChange:o=>r(n.id,{text:o.target.value}),placeholder:"여기에 입력…"})]}),u.jsxs("p",{className:"ins-hint-mini",children:[n.kind==="arrow"?"양 끝점을 드래그해 방향 조정":n.kind==="ellipse"?"SE 핸들로 크기 조절":"더블클릭으로 내용 편집 / SE 핸들로 박스 크기 조절"," · ","Delete 키로 삭제"]})]})}function $P({nodeId:n}){const r=B(x=>x.project),e=B(x=>x.setMjMaster),t=B(x=>x.updateNode),[o,i]=N.useState(!1),[s,a]=N.useState(!1),[l,c]=N.useState(null),d=n?r.nodes.find(x=>x.id===n):void 0,h=r.mjMasterPrompt??Es(r),f=d?d.mjPrompt??Xo(d,r):"",m=()=>{e(Es(r)),c("오프라인 템플릿으로 생성됨")},y=async()=>{i(!0),c(null);try{const x=await wo({system:bC,user:IC(r,uo),maxTokens:900});let S=vi(x.text);S.split(/\s+/).filter(Boolean).length<40?(S=S.replace(/--ar.+$/,"").trim(),S=S.replace(/,\s*$/,""),S+=`, key art mood board for a video game, promotional poster composition, painterly digital illustration, masterful color theory, layered atmospheric depth, cinematic wide shot ${uo}`,c(`AI 생성 (${x.modelUsed}${x.fallback?" · 폴백":""}) — 짧은 응답 자동 보강`)):c(`AI 생성 (${x.modelUsed}${x.fallback?" · 폴백":""})`),e(S)}catch(x){x instanceof Bi?(c("AI 키 없음 — 오프라인 템플릿으로 대체"),e(Es(r))):x instanceof zt?(c("Gemini 모델이 일시적으로 혼잡합니다. 오프라인 템플릿으로 대체 — 잠시 후 AI 재시도 권장."),e(Es(r))):c(`AI 실패: ${x.message??x}`)}finally{i(!1)}},v=()=>{d&&(t(d.id,{mjPrompt:Xo(d,r)}),c("오프라인 템플릿으로 생성됨"))},A=async()=>{if(d){a(!0),c(null);try{const x=await wo({system:lp,user:cp(r,d.id,uo),preferModel:"gemini-2.5-flash",maxTokens:300});t(d.id,{mjPrompt:vi(x.text)}),c(`AI 생성 (${x.modelUsed}${x.fallback?" · 폴백":""})`)}catch(x){x instanceof Bi?(t(d.id,{mjPrompt:Xo(d,r)}),c("AI 키 없음 — 오프라인 템플릿으로 대체")):x instanceof zt?(t(d.id,{mjPrompt:Xo(d,r)}),c("Gemini 모델이 일시적으로 혼잡합니다. 오프라인 템플릿으로 대체 — 잠시 후 AI 재시도 권장.")):c(`AI 실패: ${x.message??x}`)}finally{a(!1)}}},g=async()=>{a(!0),c("전체 노드 생성 중…");let x=0,S=0;for(const b of r.nodes)try{const O=await wo({system:lp,user:cp(r,b.id,uo),preferModel:"gemini-2.5-flash",maxTokens:300});t(b.id,{mjPrompt:vi(O.text)}),x+=1}catch{t(b.id,{mjPrompt:Xo(b,r)}),S+=1}c(`완료 — AI ${x}건, 오프라인 ${S}건`),a(!1)},p=x=>{var S;return(S=navigator.clipboard)==null?void 0:S.writeText(x)};return u.jsxs("div",{className:"ins-mj",children:[u.jsxs("section",{className:"ins-mj-section",children:[u.jsxs("header",{className:"ins-mj-head",children:[u.jsx("h4",{children:"마스터 프롬프트"}),u.jsx("span",{className:"caption",children:"레벨 전체 무드보드 · 파라미터 포함"})]}),u.jsx("textarea",{className:"ins-mj-textarea ins-mono",rows:6,value:h,onChange:x=>e(x.target.value),placeholder:"Generate a master prompt..."}),u.jsxs("div",{className:"ins-mj-actions",children:[u.jsx("button",{onClick:m,children:"오프라인 재생성"}),u.jsx("button",{onClick:y,disabled:o,className:"ins-mj-ai",children:o?"생성 중…":"AI 생성"}),u.jsx("button",{onClick:()=>p(h),children:"복사"})]})]}),u.jsxs("section",{className:"ins-mj-section",children:[u.jsxs("header",{className:"ins-mj-head",children:[u.jsx("h4",{children:"노드 프롬프트"}),u.jsx("span",{className:"caption",children:d?`${d.name} · 파라미터 포함`:"노드 선택 없음"})]}),u.jsx("textarea",{className:"ins-mj-textarea ins-mono",rows:6,value:f,onChange:x=>d&&t(d.id,{mjPrompt:x.target.value}),placeholder:"노드를 선택하면 표시됩니다.",disabled:!d}),u.jsxs("div",{className:"ins-mj-actions",children:[u.jsx("button",{onClick:v,disabled:!d,children:"오프라인 재생성"}),u.jsx("button",{onClick:A,disabled:!d||s,className:"ins-mj-ai",children:s?"생성 중…":"AI 생성"}),u.jsx("button",{onClick:()=>p(f),disabled:!f,children:"복사"})]}),u.jsxs("button",{onClick:g,disabled:s||r.nodes.length===0,className:"ins-mj-all",children:["모든 노드 일괄 생성 (",r.nodes.length,")"]})]}),l&&u.jsx("p",{className:"ins-mj-note caption",children:l})]})}function zP({onClose:n}){const[r,e]=N.useState("scenarios"),[t,o]=N.useState(""),[i,s]=N.useState(_s[0]??null),[a,l]=N.useState(bs[0]??null),[c,d]=N.useState("scenario"),h=B(x=>x.setName),f=B(x=>x.setConcept),m=B(x=>x.addPostit),y=B(x=>x.updatePostit),v=B(x=>x.newProject),A=N.useMemo(()=>{if(!t.trim())return _s;const x=t.toLowerCase();return _s.filter(S=>S.title.toLowerCase().includes(x)||S.scenarioMd.toLowerCase().includes(x))},[t]),g=N.useMemo(()=>{if(!t.trim())return bs;const x=t.toLowerCase();return bs.filter(S=>S.title.toLowerCase().includes(x)||S.md.toLowerCase().includes(x))},[t]),p=x=>{const S=Ia.find(b=>b.id===x.id);S&&(v(S.title),h(S.title),f(S.concept),S.seedPostits.forEach(b=>{var E;const O=m(b.text,b.color);(E=b.tags)!=null&&E.length&&y(O,{tags:b.tags})}),n())};return Ki.createPortal(u.jsx("div",{className:"lib-backdrop",onClick:n,children:u.jsxs("div",{className:"lib-modal",onClick:x=>x.stopPropagation(),children:[u.jsxs("header",{className:"lib-header",children:[u.jsx("h2",{className:"hand",children:"참고 라이브러리"}),u.jsx("button",{onClick:n,className:"lib-x","aria-label":"닫기",children:"×"})]}),u.jsxs("div",{className:"lib-tabs",children:[u.jsxs("button",{className:r==="scenarios"?"is-active":"",onClick:()=>e("scenarios"),children:["시나리오 ",_s.length,"편"]}),u.jsxs("button",{className:r==="references"?"is-active":"",onClick:()=>e("references"),children:["데이터베이스·가이드 ",bs.length]})]}),u.jsx("div",{className:"lib-search",children:u.jsx("input",{placeholder:"검색 — 시나리오 본문도 함께 검색됨",value:t,onChange:x=>o(x.target.value)})}),u.jsxs("div",{className:"lib-body",children:[r==="scenarios"&&u.jsxs(u.Fragment,{children:[u.jsx("aside",{className:"lib-list",children:A.map(x=>u.jsxs("button",{className:`lib-item ${(i==null?void 0:i.id)===x.id?"is-active":""}`,onClick:()=>s(x),children:[u.jsxs("span",{className:"lib-item-num",children:["S",String(x.num).padStart(2,"0")]}),u.jsx("span",{className:"lib-item-title",children:x.title.replace(/^S\d+\s+/,"")})]},x.id))}),u.jsx("article",{className:"lib-view",children:i?u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"lib-view-head",children:[u.jsx("strong",{children:i.title}),u.jsxs("div",{className:"lib-view-actions",children:[i.topviewMd&&u.jsx("button",{onClick:()=>d(c==="scenario"?"topview":"scenario"),className:"lib-view-toggle",children:c==="scenario"?"Top-down 맵 보기 →":"← 시나리오로 돌아가기"}),u.jsx("button",{onClick:()=>p(i),className:"lib-apply",children:"이 시나리오로 새 프로젝트 시작"})]})]}),u.jsx(yp,{md:c==="topview"?i.topviewMd??"":i.scenarioMd})]}):u.jsx("p",{className:"lib-empty",children:"시나리오를 선택하세요"})})]}),r==="references"&&u.jsxs(u.Fragment,{children:[u.jsx("aside",{className:"lib-list",children:g.map(x=>u.jsxs("button",{className:`lib-item ${(a==null?void 0:a.id)===x.id?"is-active":""}`,onClick:()=>l(x),children:[u.jsx("span",{className:"lib-item-num",children:x.id.slice(0,2)}),u.jsx("span",{className:"lib-item-title",children:x.title.replace(/^\d+_/,"")})]},x.id))}),u.jsx("article",{className:"lib-view",children:a?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"lib-view-head",children:u.jsx("strong",{children:a.title})}),u.jsx(yp,{md:a.md})]}):u.jsx("p",{className:"lib-empty",children:"자료를 선택하세요"})})]})]})]})}),document.body)}function yp({md:n}){const r=N.useMemo(()=>BP(n),[n]);return u.jsx("div",{className:"lib-md",dangerouslySetInnerHTML:{__html:r}})}function gy(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function BP(n){const r=n.split(/\r?\n/),e=[];let t=!1,o=!1;const i=()=>{o&&(e.push("</ul>"),o=!1)};for(const s of r){if(s.startsWith("```")){i(),t?(e.push("</pre>"),t=!1):(e.push("<pre>"),t=!0);continue}if(t){e.push(gy(s));continue}if(/^#{1,6}\s/.test(s)){i();const a=s.match(/^(#+)/)[1].length,l=Ms(s.replace(/^#+\s*/,""));e.push(`<h${a}>${l}</h${a}>`);continue}if(/^\s*[-*]\s+/.test(s)){o||(e.push("<ul>"),o=!0),e.push(`<li>${Ms(s.replace(/^\s*[-*]\s+/,""))}</li>`);continue}if(/^>\s/.test(s)){i(),e.push(`<blockquote>${Ms(s.replace(/^>\s*/,""))}</blockquote>`);continue}if(s.trim()==="---"){i(),e.push("<hr/>");continue}if(s.trim()===""){i(),e.push("");continue}i(),e.push(`<p>${Ms(s)}</p>`)}return i(),t&&e.push("</pre>"),e.join(`
`)}function Ms(n){return gy(n).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`([^`]+)`/g,"<code>$1</code>")}function HP(){const n=B(h=>h.setApiKey),[r,e]=N.useState(1),[t,o]=N.useState(""),[i,s]=N.useState(!1),[a,l]=N.useState(null),c=()=>{localStorage.setItem("bubble-atelier::onboarded","1"),window.location.reload()},d=async()=>{if(t.trim()){s(!0),l(null),n(t.trim());try{await wo({system:"단답으로 응답하세요.",user:"안녕이라고 답하세요.",maxTokens:12}),localStorage.setItem("bubble-atelier::onboarded","1"),e(3)}catch(h){l((h==null?void 0:h.message)??"키 검증 실패"),n(void 0)}finally{s(!1)}}};return u.jsx("div",{className:"ow-backdrop",children:u.jsxs("div",{className:"ow-card paper-grain",children:[u.jsxs("header",{className:"ow-head",children:[u.jsx("span",{className:"caption",children:"버블 아틀리에"}),u.jsx("h2",{className:"hand",children:"시작하기"}),u.jsx("p",{className:"ow-subtitle",children:"레벨 디자인을 위한 컨셉 + 포스트잇 + 버블 다이어그램 워크벤치"})]}),r===1&&u.jsx("div",{className:"ow-body",children:u.jsxs("div",{className:"ow-paths",children:[u.jsxs("article",{className:"ow-path ow-path--offline",children:[u.jsx("h3",{children:"오프라인 모드로 시작"}),u.jsx("p",{children:"50개의 컨셉 템플릿과 결정론적 Midjourney 프롬프트 생성기로 즉시 작업 가능. AI 호출 없음, 비용 0."}),u.jsx("button",{onClick:c,className:"ow-btn ow-btn--ghost",children:"오프라인으로 시작"})]}),u.jsxs("article",{className:"ow-path ow-path--ai",children:[u.jsx("h3",{children:"AI 어시스턴트 활성화"}),u.jsxs("p",{children:["Google Gemini의 ",u.jsx("strong",{children:"무료"})," API 키로 컨셉 자동 생성, 비평, 노드별 MJ 프롬프트 생성. 신용카드 불필요."]}),u.jsx("button",{onClick:()=>e(2),className:"ow-btn",children:"키 등록하기"})]})]})}),r===2&&u.jsxs("div",{className:"ow-body",children:[u.jsxs("ol",{className:"ow-steps",children:[u.jsxs("li",{children:[u.jsx("strong",{children:"① 키 발급"}),u.jsxs("p",{children:["아래 주소로 이동 → 구글 계정 로그인 → ",u.jsx("em",{children:"「Get API key」"})," 클릭 → ",u.jsx("em",{children:"「Create API key」"})," 클릭"]}),u.jsx("a",{href:"https://aistudio.google.com/app/apikey",target:"_blank",rel:"noreferrer",className:"ow-link",children:"aistudio.google.com/app/apikey →"})]}),u.jsxs("li",{children:[u.jsx("strong",{children:"② 키 붙여넣기"}),u.jsx("p",{children:"발급받은 키를 아래 칸에 붙여넣으세요. 이 키는 본인 브라우저에만 저장됩니다."}),u.jsx("input",{type:"password",className:"ow-input",placeholder:"AIzaSy…",value:t,onChange:h=>o(h.target.value)}),a&&u.jsxs("div",{className:"ow-error",children:["⚠ ",a]})]})]}),u.jsxs("div",{className:"ow-actions",children:[u.jsx("button",{onClick:c,className:"ow-btn ow-btn--ghost",children:"건너뛰기 (오프라인)"}),u.jsx("button",{onClick:d,className:"ow-btn",disabled:!t.trim()||i,children:i?"검증 중…":"키 검증하고 시작"})]})]}),r===3&&u.jsxs("div",{className:"ow-body ow-success",children:[u.jsx("div",{className:"ow-checkmark hand",children:"✓"}),u.jsx("h3",{children:"준비 완료"}),u.jsxs("p",{children:["키가 정상적으로 등록되었습니다.",u.jsx("br",{}),"좌측 패널에서 컨셉 템플릿을 골라 시작하거나, 직접 포스트잇을 추가해 보세요."]}),u.jsx("button",{onClick:()=>{localStorage.setItem("bubble-atelier::onboarded","1"),window.location.reload()},className:"ow-btn",children:"시작"})]})]})})}const q=16,vp=48,xp=24,wp=8,WP=10,Sp=Math.PI/12,GP=.25,VP=.4,jr=(n,r,e)=>[r*Math.cos(n)-e*Math.sin(n),r*Math.sin(n)+e*Math.cos(n)],UP=n=>{let r=1/0,e=1/0,t=-1/0,o=-1/0;for(const i of n)for(const[s,a]of i)r=Math.min(r,s),t=Math.max(t,s),e=Math.min(e,a),o=Math.max(o,a);return{x0:r,y0:e,x1:t,y1:o}},Yo=(n,r)=>{if(!r)return UP(n);let e=1/0,t=1/0,o=-1/0,i=-1/0;const s=Math.cos(-r),a=Math.sin(-r);for(const l of n)for(const[c,d]of l){const h=c*s-d*a,f=c*a+d*s;e=Math.min(e,h),o=Math.max(o,h),t=Math.min(t,f),i=Math.max(i,f)}return{x0:e,y0:t,x1:o,y1:i}},kp=(n,r)=>n.map(e=>e.map(([t,o])=>r(t,o)));function KP({doc:n,tool:r,erase:e,rough:t,snap:o,corridorW:i,doorW:s,stairW:a,textSize:l,markerKind:c,zoneKind:d,strokeColor:h,strokeWidth:f,target:m,calibrating:y,onStatus:v}){const A=N.useRef(null),g=N.useRef(null),p=N.useRef(fe),x=N.useRef(null),S=N.useRef(0),b=N.useRef(!1),O=N.useRef(null),E=N.useRef(null),[Z,F]=N.useState([]),K=N.useRef(null),[I,Y]=N.useState([]),H=N.useRef(null),k=N.useRef([0,0]),R=N.useRef(null),M=N.useRef(null),j=N.useRef(null),w=N.useRef(null),C=N.useRef(null),z=N.useRef(null),G=N.useRef(null),[P,fn]=N.useState(null),X=N.useRef(new Map),[en,Q]=N.useState(!1),ln=N.useRef(0),cn=B(D=>D.addGeo),wn=B(D=>D.removeGeo),Nn=B(D=>D.translateGeo),Fn=B(D=>D.addStruct),dn=B(D=>D.removeStruct),un=B(D=>D.translateStruct),kn=B(D=>D.addZone),Tn=B(D=>D.removeZone),Sn=B(D=>D.translateZones),$=B(D=>D.addDoor),tn=B(D=>D.removeDoor),J=B(D=>D.addStair),T=B(D=>D.removeStair),rn=B(D=>D.addText),yn=B(D=>D.updateText),bn=B(D=>D.removeText),In=B(D=>D.translateObject),sr=B(D=>D.addTdImage),oe=B(D=>D.updateTdImage),kr=B(D=>D.removeTdImage),Oo=B(D=>D.addStroke),ml=B(D=>D.removeStroke),Oy=B(D=>D.addMarker),Ry=B(D=>D.updateMarker),Ly=B(D=>D.removeMarker),Dy=B(D=>D.addMany),Zy=B(D=>D.transformShape),Fy=B(D=>D.updateTopdown),wt=B(D=>D.project.nodes),$d=B(D=>D.project.edges),[_r,br]=n.grid,Ro=N.useMemo(()=>n.pathVisible!==!1?n.strokes??[]:[],[n.pathVisible,n.strokes]),Lo=N.useMemo(()=>yi(n.geo),[n.geo]),qi=N.useMemo(()=>kf(n.struct??[],!1),[n.struct]),zd=N.useMemo(()=>kf(n.struct??[],!0),[n.struct]),Bd=N.useMemo(()=>[...Lo,...qi],[Lo,qi]),Ce=N.useMemo(()=>{if(wt.length===0)return null;let D=1/0,L=1/0,on=-1/0,W=-1/0;for(const xn of wt){const{rx:Mn,ry:jn}=$e(xn.type,xn.size??1,xn.aspect??1);D=Math.min(D,xn.x-Mn),on=Math.max(on,xn.x+Mn),L=Math.min(L,xn.y-jn),W=Math.max(W,xn.y+jn)}const an=Math.max(on-D,1),U=Math.max(W-L,1),_=_r*q,V=br*q,nn=Math.min(_*.84/an,V*.84/U);return{s:nn,tx:(_-an*nn)/2-D*nn,ty:(V-U*nn)/2-L*nn,minX:D,minY:L,bw:an,bh:U}},[wt,_r,br]),St=N.useMemo(()=>{if(!Ce)return null;const D=n.overlay,L=D.scale||1,on=_r*q,W=br*q;return{s:Ce.s*L,tx:(Ce.tx-on/2)*L+on/2+(D.tx||0),ty:(Ce.ty-W/2)*L+W/2+(D.ty||0),minX:Ce.minX,minY:Ce.minY,bw:Ce.bw,bh:Ce.bh}},[Ce,n.overlay,_r,br]),Wt=D=>{const L=g.current;if(!L)return null;const on=L.getBoundingClientRect(),W=p.current;return[W.invertX(D.clientX-on.left)/q,W.invertY(D.clientY-on.top)/q]},gl=N.useCallback(D=>{if(o===0)return D;const L=(on,W)=>Math.max(0,Math.min(W,on));return[L(Math.round(D[0]/o)*o,_r),L(Math.round(D[1]/o)*o,br)]},[o,_r,br]),Hd=N.useRef(()=>{}),$n=N.useCallback(()=>{S.current||(S.current=requestAnimationFrame(()=>{S.current=0,Hd.current()}))},[]),Wd=N.useCallback(D=>{const L=X.current;let on=L.get(D);return on||(on=new Image,on.onload=()=>$n(),on.src=D,L.set(D,on)),on},[$n]),yl=D=>{const L=j.current,on=w.current;if(!L||L.kind!=="image"||L.id!==D.id||!on)return D;const W=L.mode==="rotate"?L.newRot:L.rot0,an=Yo(on,W),[U,_]=jr(W,(an.x0+an.x1)/2,(an.y0+an.y1)/2);return{x:U,y:_,w:an.x1-an.x0,h:an.y1-an.y0,rot:W}},Gd=N.useCallback(()=>{const D=g.current,L=A.current;if(!D||!L)return;const on=x.current??(x.current=w0()),W=window.devicePixelRatio||1,an=L.clientWidth,U=L.clientHeight;(D.width!==Math.round(an*W)||D.height!==Math.round(U*W))&&(D.width=Math.round(an*W),D.height=Math.round(U*W),D.style.width=`${an}px`,D.style.height=`${U}px`);const _=D.getContext("2d"),V=p.current,nn=_r*q,xn=br*q;_.setTransform(W,0,0,W,0,0),_.fillStyle=on.paper,_.fillRect(0,0,an,U),_.setTransform(W*V.k,0,0,W*V.k,W*V.x,W*V.y);{const[pn,vn]=k.current;for(const _n of n.images??[]){const Ln=Wd(_n.src);if(!Ln.complete||!Ln.naturalWidth)continue;const Hn=yl(_n),An=I.includes(_n.id)?[pn,vn]:[0,0];_.save(),_.translate((Hn.x+An[0])*q,(Hn.y+An[1])*q),_.rotate(Hn.rot),_.drawImage(Ln,-Hn.w/2*q,-Hn.h/2*q,Hn.w*q,Hn.h*q),_.restore()}}const Mn=(pn,vn)=>{_.strokeStyle=vn,_.lineWidth=1/V.k,_.beginPath();for(let _n=0;_n<=_r;_n+=pn)_.moveTo(_n*q,0),_.lineTo(_n*q,xn);for(let _n=0;_n<=br;_n+=pn)_.moveTo(0,_n*q),_.lineTo(nn,_n*q);_.stroke()},jn=At(V.k*q,3.5,7);jn>0&&(_.globalAlpha=jn,Mn(1,on.gridSoft),_.globalAlpha=1);const ar=At(V.k*q*Pa,6,12);ar>0&&(_.globalAlpha=ar,Mn(Pa,on.gridMajor),_.globalAlpha=1),_.strokeStyle=on.gridHard,_.lineWidth=1.2/V.k,_.strokeRect(0,0,nn,xn),S0(_,Lo,{CELL:q,cols:_r,rows:br,zoomK:V.k,wallM:n.style.wallM,hatch:n.style.hatch,shadow:n.style.shadow,colors:on,doors:n.doors,stairs:n.stairs,texts:n.texts,markers:n.markers,structHigh:qi,structLow:zd,zones:n.zones});{const[pn,vn]=k.current,_n=Ro.map(Ln=>I.includes(Ln.id)&&(pn!==0||vn!==0)?{...Ln,pts:Ln.pts.map(([Hn,An])=>[Hn+pn,An+vn])}:Ln);xu(_,_n,{CELL:q,zoomK:V.k,colors:on})}if(G.current&&G.current.length>0&&xu(_,[{id:"_live",pts:G.current,color:h,width:f}],{CELL:q,zoomK:V.k,colors:on}),n.overlay.visible&&St){const{s:pn,tx:vn,ty:_n}=St,Ln=An=>An*pn+vn,Hn=An=>An*pn+_n;_.save(),_.globalAlpha=n.overlay.opacity;for(const An of $d){const En=wt.find(Bn=>Bn.id===An.from),Gn=wt.find(Bn=>Bn.id===An.to);!En||!Gn||(_.strokeStyle=An.type==="locked"?"#B85450":An.type==="ability"?"#2C5F7C":"#1A1814",_.lineWidth=2.4*pn,_.setLineDash(An.type==="vista"?[8*pn,6*pn]:[]),_.beginPath(),_.moveTo(Ln(En.x),Hn(En.y)),_.lineTo(Ln(Gn.x),Hn(Gn.y)),_.stroke())}_.setLineDash([]);for(const An of wt){const En=Fe[An.type],{rx:Gn,ry:Bn}=$e(An.type,An.size??1,An.aspect??1);_.beginPath(),_.ellipse(Ln(An.x),Hn(An.y),Gn*pn,Bn*pn,0,0,Math.PI*2),_.fillStyle=En.fill,_.fill(),_.strokeStyle=En.stroke,_.lineWidth=En.strokeWidth*pn,_.stroke();const Dn=20*pn,rr=At(Dn*V.k,5,9);rr>0&&An.name&&(_.globalAlpha=n.overlay.opacity*rr,_.fillStyle=En.textColor,_.font=`600 ${Dn}px Pretendard, sans-serif`,_.textAlign="center",_.textBaseline="middle",_.fillText(An.name,Ln(An.x),Hn(An.y)),_.globalAlpha=n.overlay.opacity)}y&&(_.globalAlpha=1,_.strokeStyle="rgba(44,95,124,0.85)",_.lineWidth=1.4/V.k,_.setLineDash([8/V.k,5/V.k]),_.strokeRect(Ln(St.minX),Hn(St.minY),St.bw*pn,St.bh*pn),_.setLineDash([])),_.restore()}const Nr=pn=>[pn*q,Math.max(n.style.wallM*q*2.6,q*.34)];if(I.length>0){const[pn,vn]=k.current,_n=()=>{_.strokeStyle="rgba(44,95,124,0.9)",_.lineWidth=1.6/V.k,_.setLineDash([6/V.k,4/V.k])},Ln=En=>{const Gn=Math.round(En*10)/10;return Number.isInteger(Gn)?Gn.toFixed(0):Gn.toFixed(1)},Hn=(En,Gn)=>{const Bn=Yo(En,Gn),Dn=Bn.x1-Bn.x0,rr=Bn.y1-Bn.y0;if(!(Dn>0)||!(rr>0))return;const qn=`${Ln(Dn)} × ${Ln(rr)} m`,[ge,On]=jr(Gn,(Bn.x0+Bn.x1)/2,(Bn.y0+Bn.y1)/2),er=V.k,He=12.5/er,kt=ge*q,_t=On*q;_.setLineDash([]),_.font=`600 ${He}px Pretendard, sans-serif`,_.textAlign="center",_.textBaseline="middle";const We=_.measureText(qn).width,Gt=7/er,Sl=4/er,Vt=We+Gt*2,ns=He+Sl*2;_.fillStyle="rgba(250,246,238,0.92)",_.fillRect(kt-Vt/2,_t-ns/2,Vt,ns),_.strokeStyle="rgba(44,95,124,0.55)",_.lineWidth=1/er,_.strokeRect(kt-Vt/2,_t-ns/2,Vt,ns),_.fillStyle="#2c5f7c",_.fillText(qn,kt,_t)};for(const En of I){const Gn=Ro.find(On=>On.id===En);if(Gn){_.save(),_.translate(pn*q,vn*q),_.strokeStyle="rgba(44,95,124,0.9)",_.lineWidth=Math.max(Gn.width*q,1.2/V.k)+4/V.k,_.lineCap="round",_.lineJoin="round",_.setLineDash([7/V.k,5/V.k]),_.beginPath(),Gn.pts.forEach(([On,er],He)=>He?_.lineTo(On*q,er*q):_.moveTo(On*q,er*q)),Gn.pts.length===1&&_.lineTo(Gn.pts[0][0]*q,Gn.pts[0][1]*q),_.stroke(),_.setLineDash([]),_.restore();continue}const Bn=(n.images??[]).find(On=>On.id===En);if(Bn){const On=yl(Bn),er=ws({...Bn,...On});_.save(),_.translate(pn*q,vn*q),_n(),_.stroke(Ss(er,q)),Hn(er,On.rot),_.restore();continue}const Dn=n.geo.find(On=>On.id===En)??(n.struct??[]).find(On=>On.id===En)??(n.zones??[]).find(On=>On.id===En);if(Dn){_.save(),_.translate(pn*q,vn*q),_n(),_.stroke(Ss(Dn.poly,q)),Hn(Dn.poly,Dn.rot??0),_.restore();continue}const rr=(n.doors??[]).find(On=>On.id===En),qn=(n.stairs??[]).find(On=>On.id===En),ge=(n.texts??[]).find(On=>On.id===En);if(rr){const[On,er]=Nr(rr.w);_.save(),_.translate((rr.x+pn)*q,(rr.y+vn)*q),_.rotate(rr.angle),_n(),_.strokeRect(-On/2-2/V.k,-er/2-2/V.k,On+4/V.k,er+4/V.k),_.restore()}else if(qn){const On=qn.x2-qn.x1,er=qn.y2-qn.y1,He=Math.hypot(On,er)||1;_.save(),_.translate((qn.x1+pn)*q,(qn.y1+vn)*q),_.rotate(Math.atan2(er,On)),_n(),_.strokeRect(-3/V.k,-qn.w/2*q-3/V.k,He*q+6/V.k,qn.w*q+6/V.k),_.restore()}else if(ge){const On=vu(ge)*q;_.save(),_.translate((ge.x+pn)*q,(ge.y+vn)*q),_n(),_.strokeRect(-3/V.k,-ge.size*.7*q-3/V.k,On+6/V.k,ge.size*1.4*q+6/V.k),_.restore()}else{const On=(n.markers??[]).find(er=>er.id===En);On&&(_.save(),_n(),_.beginPath(),_.arc((On.x+pn)*q,(On.y+vn)*q,Ca*q+3/V.k,0,Math.PI*2),_.stroke(),_.restore())}}_.setLineDash([]);const An=(()=>{if(I.length!==1)return null;const En=I[0],Gn=n.geo.find(Dn=>Dn.id===En)??(n.struct??[]).find(Dn=>Dn.id===En)??(n.zones??[]).find(Dn=>Dn.id===En);if(Gn)return{poly:Gn.poly,rot:Gn.rot??0};const Bn=(n.images??[]).find(Dn=>Dn.id===En);if(Bn){const Dn=yl(Bn);return{poly:ws({...Bn,...Dn}),rot:Dn.rot}}return null})();if(An&&!H.current&&!R.current){const En=j.current,Gn=w.current??An.poly,Bn=En?En.mode==="rotate"?En.newRot:En.rot0:An.rot;w.current&&(_n(),_.stroke(Ss(w.current,q)),_.setLineDash([]));const Dn=Yo(Gn,Bn),rr=V.k,qn=wp/rr/2,ge=(We,Gt)=>{_.fillStyle="#FAF6EE",_.strokeStyle="rgba(44,95,124,0.95)",_.lineWidth=1.4/rr,_.fillRect(We*q-qn,Gt*q-qn,qn*2,qn*2),_.strokeRect(We*q-qn,Gt*q-qn,qn*2,qn*2)};for(const[We,Gt]of[[Dn.x0,Dn.y0],[Dn.x1,Dn.y0],[Dn.x1,Dn.y1],[Dn.x0,Dn.y1]]){const[Sl,Vt]=jr(Bn,We,Gt);ge(Sl,Vt)}const On=(Dn.x0+Dn.x1)/2,[er,He]=jr(Bn,On,Dn.y0),[kt,_t]=jr(Bn,On,Dn.y0-xp/rr/q);if(_.strokeStyle="rgba(44,95,124,0.7)",_.lineWidth=1.2/rr,_.beginPath(),_.moveTo(er*q,He*q),_.lineTo(kt*q,_t*q),_.stroke(),_.beginPath(),_.arc(kt*q,_t*q,wp*.7/rr,0,Math.PI*2),_.fillStyle="#FAF6EE",_.fill(),_.strokeStyle="rgba(44,95,124,0.95)",_.lineWidth=1.4/rr,_.stroke(),(En==null?void 0:En.mode)==="rotate"){const We=Math.round(En.newRot*180/Math.PI);_.fillStyle="rgba(44,95,124,0.95)",_.font=`${12/rr}px "JetBrains Mono", monospace`,_.textAlign="center",_.fillText(`${We}°`,kt*q,_t*q-12/rr)}}}if(R.current){const{a:pn,b:vn}=R.current;_.fillStyle="rgba(44,95,124,0.08)",_.strokeStyle="rgba(44,95,124,0.8)",_.lineWidth=1.2/V.k,_.setLineDash([5/V.k,4/V.k]);const _n=Math.min(pn[0],vn[0])*q,Ln=Math.min(pn[1],vn[1])*q,Hn=Math.abs(vn[0]-pn[0])*q,An=Math.abs(vn[1]-pn[1])*q;_.fillRect(_n,Ln,Hn,An),_.strokeRect(_n,Ln,Hn,An),_.setLineDash([])}if(O.current&&E.current&&r==="stair"){const[pn,vn]=O.current,[_n,Ln]=E.current,Hn=_n-pn,An=Ln-vn,En=Math.hypot(Hn,An);En>.01&&(_.save(),_.translate(pn*q,vn*q),_.rotate(Math.atan2(An,Hn)),_.fillStyle="rgba(44,95,124,0.16)",_.strokeStyle="rgba(44,95,124,0.9)",_.lineWidth=1.6/V.k,_.setLineDash([6/V.k,4/V.k]),_.fillRect(0,-a/2*q,En*q,a*q),_.strokeRect(0,-a/2*q,En*q,a*q),_.setLineDash([]),_.restore())}if(r==="door"&&z.current){const pn=z.current,[vn,_n]=Nr(s);_.save(),_.translate(pn.x*q,pn.y*q),_.rotate(pn.angle),_.fillStyle="rgba(44,95,124,0.16)",_.strokeStyle="rgba(44,95,124,0.9)",_.lineWidth=1.6/V.k,_.setLineDash([6/V.k,4/V.k]),_.fillRect(-vn/2,-_n/2,vn,_n),_.strokeRect(-vn/2,-_n/2,vn,_n),_.setLineDash([]),_.restore()}const Cr=()=>{const pn=r==="zone"?yu[d]:e?"184,84,80":m==="struct"?"26,24,20":m==="cover"?"201,169,97":"44,95,124";_.fillStyle=`rgba(${pn},0.18)`,_.strokeStyle=`rgba(${pn},0.9)`,_.lineWidth=1.6/V.k,_.setLineDash([6/V.k,4/V.k])};if(O.current&&E.current&&(r==="rect"||r==="ellipse")){const[pn,vn]=O.current,[_n,Ln]=E.current,Hn=r==="rect"?gu(pn,vn,_n,Ln):_f(pn,vn,_n,Ln);Cr();const An=Ss(Hn,q);_.fill(An,"evenodd"),_.stroke(An),_.setLineDash([])}if(Z.length>0&&(r==="polygon"||r==="corridor"||r==="zone")){Cr(),_.beginPath(),Z.forEach(([vn,_n],Ln)=>Ln?_.lineTo(vn*q,_n*q):_.moveTo(vn*q,_n*q));const pn=K.current;pn&&_.lineTo(pn[0]*q,pn[1]*q),(r==="polygon"||r==="zone")&&Z.length>=2&&_.closePath(),_.stroke(),_.setLineDash([]);for(const[vn,_n]of Z)_.beginPath(),_.arc(vn*q,_n*q,3.5/V.k,0,Math.PI*2),_.fillStyle="#2C5F7C",_.fill()}const Cn=K.current;if(Cn&&r!=="select"&&r!=="door"&&V.k*q>=4){_.strokeStyle="rgba(26,24,20,0.55)",_.lineWidth=1.2/V.k;const pn=5/V.k;_.beginPath(),_.moveTo(Cn[0]*q-pn,Cn[1]*q),_.lineTo(Cn[0]*q+pn,Cn[1]*q),_.moveTo(Cn[0]*q,Cn[1]*q-pn),_.lineTo(Cn[0]*q,Cn[1]*q+pn),_.stroke()}_.setTransform(1,0,0,1,0,0)},[_r,br,r,e,m,d,h,f,Lo,qi,zd,n.geo,n.struct,n.zones,n.doors,n.stairs,n.texts,n.markers,n.images,Ro,n.style,n.overlay,I,Z,s,a,y,wt,$d,St,Wd]);Hd.current=Gd,N.useEffect(()=>{$n()},[Gd,$n]),N.useEffect(()=>{F([]),Y([]),fn(null),O.current=null,E.current=null,R.current=null,M.current=null,j.current=null,w.current=null,G.current=null},[n.id]),N.useEffect(()=>{r==="draw"&&(Y([]),j.current=null,w.current=null)},[r]),N.useEffect(()=>{const D=g.current,L=A.current;if(!D||!L)return;const on=L.clientWidth,W=L.clientHeight,an=_r*q,U=br*q,_=Math.max(.02,Math.min(12,Math.min((on-vp*2)/an,(W-vp*2)/U))),V=cl().scaleExtent([_*.5,12]).translateExtent([[-an*.5,-U*.5],[an*1.5,U*1.5]]).filter(xn=>xn.type==="wheel"?!0:xn.type==="dblclick"?!1:b.current||xn.button===1).on("zoom",xn=>{p.current=xn.transform,$n()}),nn=Or(D);return nn.call(V),nn.call(V.transform,fe.translate((on-an*_)/2,(W-U*_)/2).scale(_)),()=>{nn.on(".zoom",null)}},[n.id,_r,br]),N.useEffect(()=>{const D=U=>{const _=U.target.tagName;if(!(_==="INPUT"||_==="TEXTAREA")){if(U.code==="Space"){U.type==="keydown"?(b.current=!0,U.preventDefault()):b.current=!1,A.current&&(A.current.dataset.panning=String(b.current));return}if(U.type==="keydown"){if((U.ctrlKey||U.metaKey)&&U.key.toLowerCase()==="c"){if(I.length===0){C.current&&(C.current=null,v==null||v("도형 클립보드를 비웠습니다 — 이제 Ctrl+V로 클립보드 이미지를 붙입니다"));return}const V=nn=>I.includes(nn);C.current={geo:n.geo.filter(nn=>V(nn.id)).map(nn=>({...nn,poly:nn.poly.map(xn=>xn.map(([Mn,jn])=>[Mn,jn]))})),struct:(n.struct??[]).filter(nn=>V(nn.id)).map(nn=>({...nn,poly:nn.poly.map(xn=>xn.map(([Mn,jn])=>[Mn,jn]))})),zones:(n.zones??[]).filter(nn=>V(nn.id)).map(nn=>({...nn,poly:nn.poly.map(xn=>xn.map(([Mn,jn])=>[Mn,jn]))})),doors:(n.doors??[]).filter(nn=>V(nn.id)).map(nn=>({...nn})),stairs:(n.stairs??[]).filter(nn=>V(nn.id)).map(nn=>({...nn})),texts:(n.texts??[]).filter(nn=>V(nn.id)).map(nn=>({...nn})),markers:(n.markers??[]).filter(nn=>V(nn.id)).map(nn=>({...nn})),pastes:0};return}if((U.ctrlKey||U.metaKey)&&U.key.toLowerCase()==="v"){const V=performance.now();window.setTimeout(()=>{ln.current<V&&L()},0);return}if(U.key==="Enter"&&Z.length>0&&Kd(),U.key==="Escape"&&Z.length>0?(U.stopPropagation(),F([]),$n()):U.key==="Escape"&&I.length>0&&(U.stopPropagation(),Y([]),$n()),(U.key==="Delete"||U.key==="Backspace")&&I.length>0){const V=(vn,_n)=>(vn??[]).some(Ln=>Ln.id===_n),nn=I.filter(vn=>V(n.doors,vn)),xn=I.filter(vn=>V(n.stairs,vn)),Mn=I.filter(vn=>V(n.texts,vn)),jn=I.filter(vn=>V(n.markers,vn)),ar=I.filter(vn=>V(n.struct,vn)),Nr=I.filter(vn=>V(n.zones,vn)),Cr=I.filter(vn=>V(n.images,vn)),Cn=I.filter(vn=>V(n.strokes,vn)),pn=I.filter(vn=>n.geo.some(_n=>_n.id===vn));Cn.length&&ml(n.id,Cn),Cr.length&&kr(n.id,Cr),nn.length&&tn(n.id,nn),xn.length&&T(n.id,xn),Mn.length&&bn(n.id,Mn),jn.length&&Ly(n.id,jn),ar.length&&dn(n.id,ar),Nr.length&&Tn(n.id,Nr),pn.length&&wn(n.id,pn),Y([])}}}},L=()=>{const U=C.current;if(!U)return;U.pastes+=1;const _=U.pastes*2,V=[],nn=U.geo.map(Cn=>{const pn=Pn("geo");return V.push(pn),{id:pn,op:Cn.op,poly:Cn.poly.map(vn=>vn.map(([_n,Ln])=>[_n+_,Ln+_]))}}),xn=U.struct.map(Cn=>{const pn=Pn("st");return V.push(pn),{id:pn,op:Cn.op,low:Cn.low,poly:Cn.poly.map(vn=>vn.map(([_n,Ln])=>[_n+_,Ln+_]))}}),Mn=U.zones.map(Cn=>{const pn=Pn("zn");return V.push(pn),{id:pn,kind:Cn.kind,poly:Cn.poly.map(vn=>vn.map(([_n,Ln])=>[_n+_,Ln+_]))}}),jn=U.doors.map(Cn=>{const pn=Pn("door");return V.push(pn),{...Cn,id:pn,x:Cn.x+_,y:Cn.y+_}}),ar=U.stairs.map(Cn=>{const pn=Pn("str");return V.push(pn),{...Cn,id:pn,x1:Cn.x1+_,y1:Cn.y1+_,x2:Cn.x2+_,y2:Cn.y2+_}}),Nr=U.texts.map(Cn=>{const pn=Pn("txt");return V.push(pn),{...Cn,id:pn,x:Cn.x+_,y:Cn.y+_}}),Cr=U.markers.map(Cn=>{const pn=Pn("mk");return V.push(pn),{...Cn,id:pn,x:Cn.x+_,y:Cn.y+_}});V.length&&(Dy(n.id,{geo:nn,struct:xn,zones:Mn,doors:jn,stairs:ar,texts:Nr,markers:Cr}),Y(V))},on=U=>{var Nr,Cr;const _=(Nr=U.target)==null?void 0:Nr.tagName;if(_==="INPUT"||_==="TEXTAREA")return;if(ln.current=performance.now(),C.current){L();return}const V=(Cr=U.clipboardData)==null?void 0:Cr.items,nn=V?Array.from(V).find(Cn=>Cn.kind==="file"&&Cn.type.startsWith("image/")):void 0,xn=nn==null?void 0:nn.getAsFile();if(!xn){L();return}U.preventDefault();const Mn=p.current,jn=A.current,ar=K.current??(jn?[Mn.invertX(jn.clientWidth/2)/q,Mn.invertY(jn.clientHeight/2)/q]:[_r/2,br/2]);Xd(xn,ar,0)};window.addEventListener("keydown",D,!0),window.addEventListener("keyup",D),window.addEventListener("paste",on);const W=new ResizeObserver(()=>$n());A.current&&W.observe(A.current);const an=new MutationObserver(()=>{x.current=null,$n()});return an.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),()=>{window.removeEventListener("keydown",D,!0),window.removeEventListener("keyup",D),window.removeEventListener("paste",on),W.disconnect(),an.disconnect()}},[Z,I,n.id,n.grid,n.geo,n.struct,n.zones,n.doors,n.stairs,n.texts,n.markers,n.images,$n]);const Vd=e?"subtract":"union",vl=D=>t?Ew(D):D,xl=D=>{m==="floor"?cn(n.id,{id:Pn("geo"),op:Vd,poly:D}):Fn(n.id,{id:Pn("st"),op:Vd,low:m==="cover",poly:D})},$y=()=>{const D=O.current,L=E.current;if(O.current=null,E.current=null,!D||!L)return;if(r==="stair"){Math.hypot(L[0]-D[0],L[1]-D[1])>=.5&&J(n.id,{id:Pn("str"),x1:D[0],y1:D[1],x2:L[0],y2:L[1],w:a}),$n();return}if(Math.abs(D[0]-L[0])<.01||Math.abs(D[1]-L[1])<.01){$n();return}const on=r==="rect"?gu(D[0],D[1],L[0],L[1]):_f(D[0],D[1],L[0],L[1]);xl(vl(on))},Ud=(D,L,on,W="")=>{const an=p.current;fn({wx:D,wy:L,sx:an.applyX(D*q),sy:an.applyY(L*q),value:W,id:on})},wl=()=>{const D=P;if(fn(null),!D)return;const L=D.value.trim();D.markerId?Ry(n.id,D.markerId,{label:L}):D.id?L?yn(n.id,D.id,{text:L}):bn(n.id,[D.id]):L&&rn(n.id,{id:Pn("txt"),x:D.wx,y:D.wy,text:L,size:l})},Kd=()=>{const D=[];for(const L of Z){const on=D[D.length-1];(!on||Math.abs(on[0]-L[0])>1e-6||Math.abs(on[1]-L[1])>1e-6)&&D.push(L)}if(F([]),r==="polygon")D.length>=3&&xl(vl([D]));else if(r==="zone")D.length>=3&&kn(n.id,{id:Pn("zn"),kind:d,poly:[D]});else if(r==="corridor"&&D.length>=2){const on=Iw(D,i);on&&xl(vl(on))}$n()},zy=()=>{if(I.length!==1)return null;const D=I[0],L=n.geo.find(U=>U.id===D);if(L)return{id:D,kind:"geo",poly:L.poly,rot:L.rot??0};const on=(n.struct??[]).find(U=>U.id===D);if(on)return{id:D,kind:"struct",poly:on.poly,rot:on.rot??0};const W=(n.zones??[]).find(U=>U.id===D);if(W)return{id:D,kind:"zone",poly:W.poly,rot:W.rot??0};const an=(n.images??[]).find(U=>U.id===D);return an?{id:D,kind:"image",poly:ws(an),rot:an.rot}:null},By=D=>{const L=zy();if(!L)return null;const on=p.current.k,W=WP/on/q,an=L.rot,U=Yo(L.poly,an),_=(U.x0+U.x1)/2,[V,nn]=jr(an,_,U.y0-xp/on/q);if(Math.hypot(D[0]-V,D[1]-nn)<=W){const[Mn,jn]=jr(an,_,(U.y0+U.y1)/2);return{id:L.id,kind:L.kind,mode:"rotate",base:L.poly,rot0:an,flx:0,fly:0,glx:0,gly:0,sx:1,sy:1,cwx:Mn,cwy:jn,newRot:an}}const xn=[[U.x0,U.y0],[U.x1,U.y0],[U.x1,U.y1],[U.x0,U.y1]];for(const[Mn,jn]of xn){const[ar,Nr]=jr(an,Mn,jn);if(Math.hypot(D[0]-ar,D[1]-Nr)<=W){const Cr=Mn===U.x0?U.x1:U.x0,Cn=jn===U.y0?U.y1:U.y0;return{id:L.id,kind:L.kind,mode:"scale",base:L.poly,rot0:an,flx:Cr,fly:Cn,glx:Mn,gly:jn,sx:1,sy:1,cwx:0,cwy:0,newRot:an}}}return null},Hy=D=>{if(D.button!==0||b.current)return;const L=Wt(D);if(!L)return;const on=gl(L);if(P){wl();return}if(r==="draw"){D.target.setPointerCapture(D.pointerId),G.current=[L],$n();return}if(y&&n.overlay.visible){D.target.setPointerCapture(D.pointerId),M.current={x:L[0],y:L[1],tx:n.overlay.tx||0,ty:n.overlay.ty||0};return}if(Z.length===0){const W=By(L);if(W){D.target.setPointerCapture(D.pointerId),j.current=W,w.current=null,$n();return}}if(r!=="select"&&Z.length===0){const W=nc(L[0],L[1],n.texts??[])??rc(L[0],L[1],n.markers??[])??Pf(L[0],L[1],n.doors??[])??Tf(L[0],L[1],n.stairs??[])??Cf(L[0],L[1],n.zones??[]);if(W){D.target.setPointerCapture(D.pointerId),I.includes(W)||Y([W]),H.current=L,k.current=[0,0],$n();return}if((r==="rect"||r==="ellipse")&&!e){const an=m==="floor"?xs(L[0],L[1],n.geo):xs(L[0],L[1],n.struct??[]);if(an){D.target.setPointerCapture(D.pointerId),I.includes(an)||Y([an]),H.current=L,k.current=[0,0],$n();return}}}if(r!=="select"&&Z.length===0&&I.length>0&&(Y([]),$n()),r==="door"){const W=bf(L[0],L[1],Bd,1.2,s);W&&$(n.id,{id:Pn("door"),x:W.x,y:W.y,angle:W.angle,w:s});return}if(r!=="text"){if(r==="marker"){Oy(n.id,{id:Pn("mk"),x:on[0],y:on[1],kind:c});return}if(r==="select"){const W=nc(L[0],L[1],n.texts??[])??rc(L[0],L[1],n.markers??[])??Pf(L[0],L[1],n.doors??[])??Tf(L[0],L[1],n.stairs??[])??Lw(L[0],L[1],Ro)??Cf(L[0],L[1],n.zones??[])??xs(L[0],L[1],n.struct??[])??xs(L[0],L[1],n.geo)??Dw(L[0],L[1],n.images??[]);D.target.setPointerCapture(D.pointerId),W?(I.includes(W)||Y([W]),H.current=L,k.current=[0,0]):(Y([]),R.current={a:L,b:L}),$n();return}if(r==="rect"||r==="ellipse"||r==="stair"){D.target.setPointerCapture(D.pointerId),O.current=on,E.current=on,$n();return}F(W=>[...W,on]),$n()}},Wy=D=>{const L=Wt(D);if(!L)return;const on=gl(L);if(K.current=r==="select"||r==="door"||r==="draw"?L:on,G.current){const an=G.current[G.current.length-1];Math.hypot(L[0]-an[0],L[1]-an[1])>=VP&&(G.current.push(L),$n());return}if(y&&M.current){const an=M.current;Fy(n.id,{overlay:{...n.overlay,tx:an.tx+(L[0]-an.x)*q,ty:an.ty+(L[1]-an.y)*q}});return}const W=j.current;if(W){if(W.mode==="scale"){const an=jr(-W.rot0,L[0],L[1]);let U=an[0],_=an[1];o&&(U=W.flx+Math.round((an[0]-W.flx)/o)*o,_=W.fly+Math.round((an[1]-W.fly)/o)*o);let V=(U-W.flx)/(W.glx-W.flx||1),nn=(_-W.fly)/(W.gly-W.fly||1);V=Math.max(.05,Math.min(40,V)),nn=Math.max(.05,Math.min(40,nn)),W.sx=V,W.sy=nn,w.current=kp(W.base,(xn,Mn)=>{const jn=jr(-W.rot0,xn,Mn);return jr(W.rot0,W.flx+(jn[0]-W.flx)*V,W.fly+(jn[1]-W.fly)*nn)})}else{const an=Math.atan2(L[1]-W.cwy,L[0]-W.cwx)+Math.PI/2;W.newRot=Math.round(an/Sp)*Sp;const U=W.newRot-W.rot0,_=Math.cos(U),V=Math.sin(U);w.current=kp(W.base,(nn,xn)=>[W.cwx+(nn-W.cwx)*_-(xn-W.cwy)*V,W.cwy+(nn-W.cwx)*V+(xn-W.cwy)*_])}$n();return}if(r==="door"&&!H.current?z.current=bf(L[0],L[1],Bd,1.2,s):z.current&&(z.current=null),v){const an=Lo.length>0;v(`(${on[0].toFixed(2)}, ${on[1].toFixed(2)}) · ${_r}m × ${br}m · 벽 ${n.style.wallM}m`+(m!=="floor"?m==="struct"?" · 대상: 구조":m==="cover"?" · 대상: 엄폐":` · 대상: 동선 · 두께 ${f}m`:"")+(e?" · 빼기 모드":"")+(t?" · 러프":"")+(o?` · 스냅 ${o}셀`:" · 스냅 끔")+(r==="draw"?" · 드래그로 자유 드로잉":an?"":" · 사각형(R)으로 첫 방을 그려보세요")+(r==="door"&&an&&!z.current?" · 벽 가까이에서 클릭하면 문이 놓입니다":"")+(y?" · 오버레이 조정 — 드래그로 이동":"")+(I.length>1?` · 선택 ${I.length}개`:""))}if(r==="select"&&R.current)R.current.b=L;else if(H.current&&I.length>0){const[an,U]=H.current;let _=L[0]-an,V=L[1]-U;o&&(_=Math.round(_/o)*o,V=Math.round(V/o)*o),k.current=[_,V]}else O.current&&(E.current=on);$n()},Gy=D=>{if(G.current){const L=G.current;G.current=null;const on=Wt(D);if(on){const W=L[L.length-1];Math.hypot(on[0]-W[0],on[1]-W[1])>1e-6&&L.push(on)}Oo(n.id,{id:Pn("stk"),pts:L,color:h,width:f}),$n();return}if(y&&M.current){M.current=null;return}if(j.current){const L=j.current,on=w.current;if(j.current=null,w.current=null,on){if(L.kind==="image"){const an=L.mode==="rotate"?L.newRot:L.rot0,U=Yo(on,an),[_,V]=jr(an,(U.x0+U.x1)/2,(U.y0+U.y1)/2);oe(n.id,L.id,{x:_,y:V,w:U.x1-U.x0,h:U.y1-U.y0,rot:an}),$n();return}let W;if(L.kind!=="zone"){const an=(n.doors??[]).filter(U=>Di(U.x,U.y,L.base)<=.45);an.length&&(W=an.map(U=>{if(L.mode==="scale"){const xn=jr(-L.rot0,U.x,U.y),[Mn,jn]=jr(L.rot0,L.flx+(xn[0]-L.flx)*L.sx,L.fly+(xn[1]-L.fly)*L.sy);return{id:U.id,x:Mn,y:jn,angle:U.angle}}const _=L.newRot-L.rot0,V=Math.cos(_),nn=Math.sin(_);return{id:U.id,x:L.cwx+(U.x-L.cwx)*V-(U.y-L.cwy)*nn,y:L.cwy+(U.x-L.cwx)*nn+(U.y-L.cwy)*V,angle:U.angle+_}}))}Zy(n.id,{kind:L.kind,id:L.id,poly:on,doors:W,rot:L.mode==="rotate"?L.newRot:void 0})}$n();return}if(r==="text"&&!H.current){const L=Wt(D);if(L){const on=gl(L);Ud(on[0],on[1])}return}if(r==="select"&&R.current){const{a:L,b:on}=R.current;R.current=null;const W=Math.min(L[0],on[0]),an=Math.max(L[0],on[0]),U=Math.min(L[1],on[1]),_=Math.max(L[1],on[1]);if(an-W>.05||_-U>.05){const V=[];for(const nn of[...n.geo,...n.struct??[],...n.zones??[]]){let xn=1/0,Mn=1/0,jn=-1/0,ar=-1/0;for(const Nr of nn.poly)for(const[Cr,Cn]of Nr)xn=Math.min(xn,Cr),jn=Math.max(jn,Cr),Mn=Math.min(Mn,Cn),ar=Math.max(ar,Cn);jn>=W&&xn<=an&&ar>=U&&Mn<=_&&V.push(nn.id)}for(const nn of n.doors??[])nn.x>=W&&nn.x<=an&&nn.y>=U&&nn.y<=_&&V.push(nn.id);for(const nn of n.stairs??[]){const xn=(nn.x1+nn.x2)/2,Mn=(nn.y1+nn.y2)/2;xn>=W&&xn<=an&&Mn>=U&&Mn<=_&&V.push(nn.id)}for(const nn of n.texts??[]){const xn=vu(nn);nn.x+xn>=W&&nn.x<=an&&nn.y+nn.size*.7>=U&&nn.y-nn.size*.7<=_&&V.push(nn.id)}for(const nn of n.markers??[])nn.x>=W&&nn.x<=an&&nn.y>=U&&nn.y<=_&&V.push(nn.id);for(const nn of Ro){const xn=Rw(nn);xn.x1>=W&&xn.x0<=an&&xn.y1>=U&&xn.y0<=_&&V.push(nn.id)}for(const nn of n.images??[]){const xn=ws(nn)[0],Mn=xn.map(ar=>ar[0]),jn=xn.map(ar=>ar[1]);Math.max(...Mn)>=W&&Math.min(...Mn)<=an&&Math.max(...jn)>=U&&Math.min(...jn)<=_&&V.push(nn.id)}Y(V)}$n();return}if(H.current&&I.length>0){const[L,on]=k.current;if(H.current=null,k.current=[0,0],L!==0||on!==0){const W=I.filter(V=>n.geo.some(nn=>nn.id===V)),an=I.filter(V=>(n.struct??[]).some(nn=>nn.id===V)),U=I.filter(V=>(n.zones??[]).some(nn=>nn.id===V));W.length&&Nn(n.id,W,L,on),an.length&&un(n.id,an,L,on),U.length&&Sn(n.id,U,L,on);const _=[...n.geo.filter(V=>W.includes(V.id)),...(n.struct??[]).filter(V=>an.includes(V.id))];for(const V of I){if(W.includes(V)||an.includes(V)||U.includes(V))continue;const nn=(n.doors??[]).find(xn=>xn.id===V);nn&&_.some(xn=>Di(nn.x,nn.y,xn.poly)<=.45)||In(n.id,V,L,on)}}$n();return}O.current&&$y()},Vy=D=>{if((r==="polygon"||r==="corridor"||r==="zone")&&Z.length>0){Kd();return}if(r==="select"){const L=Wt(D);if(!L)return;const on=nc(L[0],L[1],n.texts??[]),W=on?(n.texts??[]).find(_=>_.id===on):null;if(W){Ud(W.x,W.y,W.id,W.text);return}const an=rc(L[0],L[1],n.markers??[]),U=an?(n.markers??[]).find(_=>_.id===an):null;if(U){const _=p.current;fn({wx:U.x,wy:U.y,sx:_.applyX((U.x+Ca+.3)*q),sy:_.applyY(U.y*q),value:U.label??"",markerId:U.id})}}},Uy=()=>{K.current=null,z.current=null,$n()},Xd=async(D,L,on=0)=>{try{const W=await sC(D);if(!W)return;const U=Math.max(8,Math.round(Math.max(_r,br)*GP))/Math.max(W.w,W.h),_=Pn("tdimg");sr(n.id,{id:_,x:L[0]+on*2,y:L[1]+on*2,w:W.w*U,h:W.h*U,rot:0,src:W.src,createdAt:Date.now()}),Y([_]),v==null||v(`이미지 배치 — ${Math.round(W.w*U)}m × ${Math.round(W.h*U)}m · 선택(V)에서 이동·모서리 크기·손잡이 회전`)}catch(W){v==null||v(`이미지 불러오기 실패 — ${W.message??W}`)}},Ky=D=>{D.dataTransfer.types.includes("Files")&&(D.preventDefault(),D.dataTransfer.dropEffect="copy",en||Q(!0))},Xy=D=>{D.currentTarget.contains(D.relatedTarget)||Q(!1)},Yy=D=>{D.preventDefault(),Q(!1);const L=Array.from(D.dataTransfer.files??[]).filter(W=>W.type.startsWith("image/"));if(L.length===0)return;const on=Wt(D);on&&L.forEach((W,an)=>void Xd(W,on,an))};return u.jsxs("div",{ref:A,className:`td-canvas-wrap${en?" is-drop-hover":""}`,"data-tool":r,"data-erase":e,"data-calibrating":y,onDragOver:Ky,onDragLeave:Xy,onDrop:Yy,children:[u.jsx("canvas",{ref:g,className:"td-canvas","data-testid":"topdown-canvas",onPointerDown:Hy,onPointerMove:Wy,onPointerUp:Gy,onDoubleClick:Vy,onPointerLeave:Uy,onContextMenu:D=>D.preventDefault()}),P&&u.jsx("input",{className:"td-text-input","data-testid":"td-text-input",autoFocus:!0,placeholder:"라벨 입력…",style:{left:P.sx,top:P.sy,fontSize:Math.max(15,l*q*p.current.k)},value:P.value,onChange:D=>fn({...P,value:D.target.value}),onBlur:wl,onKeyDown:D=>{D.key==="Enter"&&wl(),D.key==="Escape"&&(D.stopPropagation(),fn(null))}})]})}const _p=[{id:"select",label:"선택",key:"V",title:"선택 (V) — 클릭으로 도형 선택, 드래그로 이동, Delete 삭제"},{id:"rect",label:"사각형",key:"R",title:"사각형 방 (R) — 드래그. 겹치면 자동 병합"},{id:"ellipse",label:"원형",key:"O",title:"원형/타원 방 (O) — 드래그"},{id:"polygon",label:"다각형",key:"P",title:"다각형 방 (P) — 클릭으로 점, 더블클릭/Enter 완성, Esc 취소"},{id:"draw",label:"드로잉",key:"B",title:"드로잉 (B) — 드래그로 자유롭게 그리는 동선. 색·두께 설정 가능"},{id:"corridor",label:"복도",key:"C",title:"복도 (C) — 클릭으로 경로, 더블클릭/Enter 완성. 폭 설정 가능"},{id:"door",label:"문",key:"D",title:"문 (D) — 벽 가까이 클릭하면 벽에 스냅되어 배치. 선택(V) 후 Delete로 삭제"},{id:"stair",label:"계단",key:"S",title:"계단 (S) — 드래그. 드래그 방향이 올라가는 방향 (끝이 좁아짐)"},{id:"text",label:"텍스트",key:"T",title:"텍스트 (T) — 클릭 후 입력, Enter 확정. 선택(V) 더블클릭으로 수정"},{id:"marker",label:"마커",key:"M",title:"마커 (M) — 종류 선택 후 클릭 배치. 선택(V) 더블클릭으로 라벨 편집"},{id:"zone",label:"구역",key:"Z",title:"구역 (Z) — 클릭으로 다각형, Enter 완성. 안전(파랑)/위험(빨강) 반투명 채움"}];function XP(){const n=B(T=>T.project),r=B(T=>T.activeTopdownId),e=B(T=>T.exitTopdown),t=B(T=>T.setActiveTopdown),o=B(T=>T.addTopdown),i=B(T=>T.removeTopdown),s=B(T=>T.renameTopdown),a=B(T=>T.updateTopdown),l=B(T=>T.clearStrokes),[c,d]=N.useState("rect"),[h,f]=N.useState(!1),[m,y]=N.useState(!1),[v,A]=N.useState(1),[g,p]=N.useState(6),[x,S]=N.useState(2),[b,O]=N.useState(2),[E,Z]=N.useState(2),[F,K]=N.useState("start"),[I,Y]=N.useState("floor"),[H,k]=N.useState("safe"),[R,M]=N.useState("moss"),[j,w]=N.useState(2),[C,z]=N.useState(!1),[G,P]=N.useState(!1),[fn,X]=N.useState({past:0,future:0});N.useEffect(()=>{const T=B.temporal,rn=()=>{const bn=T.getState();X({past:bn.pastStates.length,future:bn.futureStates.length})};rn();const yn=T.subscribe(rn);return()=>yn()},[]);const[en,Q]=N.useState(""),[ln,cn]=N.useState(null),[wn,Nn]=N.useState(""),Fn=n.topdowns??[],dn=Fn.find(T=>T.id===r)??Fn[0]??null,un=T=>T==="draw"||T==="select",kn=T=>{I==="path"&&!un(T)||(d(T),T==="draw"&&Y("path"))},Tn=T=>{Y(T),d(rn=>T==="path"?"draw":rn==="draw"?"rect":rn)};if(N.useEffect(()=>{const T=rn=>{const yn=rn.target.tagName;if(yn==="INPUT"||yn==="TEXTAREA"||rn.ctrlKey||rn.metaKey||rn.altKey)return;if(rn.key==="Escape"){P(sr=>!sr);return}const bn=rn.key.toUpperCase(),In=_p.find(sr=>sr.key===bn);if(In){kn(In.id);return}bn==="E"&&f(sr=>!sr),bn==="F"&&y(sr=>!sr),bn==="1"&&Tn("floor"),bn==="2"&&Tn("struct"),bn==="3"&&Tn("cover"),bn==="4"&&Tn("path")};return window.addEventListener("keydown",T),()=>window.removeEventListener("keydown",T)},[I]),!dn)return u.jsxs("div",{className:"td-shell td-shell-empty",children:[u.jsx("p",{children:"평면도가 없습니다."}),u.jsx("button",{className:"td-btn",onClick:()=>o(),children:"+ 평면도 만들기"})]});const Sn=dn.grid[0],$=(T,rn)=>{cn(T),Nn(rn)},tn=()=>{ln&&wn.trim()&&s(ln,wn.trim()),cn(null)},J=(T,rn)=>{const yn=Fn.find(In=>In.id===T),bn=yn?yn.geo.length:0;bn>0&&!window.confirm(`'${rn}'에 도형 ${bn}개가 있습니다. 삭제할까요?`)||i(T)};return u.jsxs("div",{className:"td-shell","data-testid":"topdown-shell",children:[u.jsxs("div",{className:"td-bar",children:[u.jsx("button",{className:"td-btn td-back",onClick:e,title:"버블 다이어그램으로 (Esc)",children:"← 버블"}),u.jsxs("div",{className:"td-tabs",role:"tablist",children:[Fn.map(T=>u.jsx("div",{role:"tab","aria-selected":T.id===dn.id,className:`td-tab ${T.id===dn.id?"is-active":""}`,onClick:()=>t(T.id),onDoubleClick:()=>$(T.id,T.name),title:"더블클릭: 이름 바꾸기",children:ln===T.id?u.jsx("input",{autoFocus:!0,value:wn,onChange:rn=>Nn(rn.target.value),onBlur:tn,onKeyDown:rn=>{rn.key==="Enter"&&tn(),rn.key==="Escape"&&cn(null)}}):u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"td-tab-name",children:T.name}),Fn.length>1&&u.jsx("button",{className:"td-tab-close",onClick:rn=>{rn.stopPropagation(),J(T.id,T.name)},title:"삭제",children:"×"})]})},T.id)),u.jsx("button",{className:"td-btn td-tab-add",onClick:()=>o(),title:"평면도 추가",children:"＋"})]}),u.jsx("div",{className:"td-spacer"}),u.jsx("div",{className:"td-group",role:"toolbar","aria-label":"도구",children:_p.map(T=>{const rn=I==="path"&&!un(T.id);return u.jsx("button",{className:`td-btn td-tool ${c===T.id?"is-active":""}`,onClick:()=>kn(T.id),disabled:rn,title:rn?"동선 레이어에서는 드로잉·선택만 사용합니다 — 바닥/구조/엄폐로 전환하세요":T.title,children:T.label},T.id)})}),u.jsxs("div",{className:"td-group",children:[u.jsx("button",{className:`td-btn td-erase ${h?"is-active":""}`,onClick:()=>f(T=>!T),title:"빼기 모드 (E) — 켜면 도형이 바닥을 파냄 (비밀통로·기둥·동굴 굴곡)",children:"빼기"}),u.jsx("button",{className:`td-btn td-rough ${m?"is-active":""}`,onClick:()=>y(T=>!T),title:"러프 모드 (F) — 켜면 새 도형의 외곽선이 거칠어짐 (동굴·자연 지형)",children:"러프"})]}),u.jsxs("div",{className:"td-group",children:[u.jsx("button",{className:"td-btn td-undo","data-testid":"td-undo",onClick:()=>Td(),disabled:fn.past===0,title:`되돌리기 (Ctrl+Z) · ${fn.past}`,children:"↶"}),u.jsx("button",{className:"td-btn td-redo","data-testid":"td-redo",onClick:()=>Id(),disabled:fn.future===0,title:`다시 실행 (Ctrl+Shift+Z / Ctrl+Y) · ${fn.future}`,children:"↷"})]})]}),u.jsxs("div",{className:"td-bar td-bar-sub",children:[u.jsxs("div",{className:"td-group","aria-label":"그리기 대상",children:[u.jsx("button",{className:`td-btn ${I==="floor"?"is-active":""}`,onClick:()=>Tn("floor"),title:"바닥 (1) — 플레이 공간. 그림자·해칭·외벽 자동",children:"바닥"}),u.jsx("button",{className:`td-btn td-target-struct ${I==="struct"?"is-active":""}`,onClick:()=>Tn("struct"),title:"구조 (2) — 내부 벽·기둥·검은 질량. 잉크 솔리드, 문 부착 가능",children:"구조"}),u.jsx("button",{className:`td-btn td-target-cover ${I==="cover"?"is-active":""}`,onClick:()=>Tn("cover"),title:"엄폐 (3) — 낮은 상자·난간·둔덕. 어두운 종이톤 채움",children:"엄폐"}),u.jsx("button",{className:`td-btn td-target-path ${I==="path"?"is-active":""}`,onClick:()=>Tn("path"),title:"동선 (4) — 자유 드로잉 전용 레이어. 도형 병합에 관여하지 않는 주석",children:"동선"})]}),c==="draw"&&u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"td-group","aria-label":"동선 색",children:Nw.map(T=>u.jsxs("button",{className:`td-btn td-stroke-swatch ${R===T.key?"is-active":""}`,"data-stroke":T.key,onClick:()=>M(T.key),title:T.label,"aria-label":T.label,children:[u.jsx("span",{className:"td-stroke-dot"}),T.label]},T.key))}),u.jsxs("div",{className:"td-group","aria-label":"동선 두께",children:[jw.map(T=>u.jsxs("button",{className:`td-btn ${j===T?"is-active":""}`,onClick:()=>w(T),title:`선 두께 ${T}m (${T*100}uu)`,children:[T,"m"]},T)),u.jsxs("button",{className:"td-btn td-stroke-clear","data-testid":"td-stroke-clear",onClick:()=>l(dn.id),disabled:(dn.strokes??[]).length===0,title:`이 평면도의 동선 ${(dn.strokes??[]).length}획을 모두 지웁니다 (Ctrl+Z로 복구)`,children:["비우기 ",(dn.strokes??[]).length]})]})]}),c==="corridor"&&u.jsx("div",{className:"td-group","aria-label":"복도 폭",children:[2,4,6,8].map(T=>u.jsxs("button",{className:`td-btn ${g===T?"is-active":""}`,onClick:()=>p(T),title:`복도 두께 ${T}m (${T*100}uu)`,children:[T,"m"]},T))}),c==="door"&&u.jsx("div",{className:"td-group","aria-label":"문 폭",children:[2,4,6].map(T=>u.jsxs("button",{className:`td-btn ${x===T?"is-active":""}`,onClick:()=>S(T),title:`문 폭 ${T}셀 = ${T}m`,children:[T,"셀"]},T))}),c==="stair"&&u.jsx("div",{className:"td-group","aria-label":"계단 폭",children:[2,4,6].map(T=>u.jsxs("button",{className:`td-btn ${b===T?"is-active":""}`,onClick:()=>O(T),title:`계단 폭 ${T}셀 = ${T}m`,children:[T,"셀"]},T))}),c==="marker"&&u.jsx("div",{className:"td-group","aria-label":"마커 종류",children:Object.keys(ei).map(T=>u.jsxs("button",{className:`td-btn ${F===T?"is-active":""}`,onClick:()=>K(T),title:ei[T].label,children:[ei[T].glyph," ",ei[T].label]},T))}),c==="zone"&&u.jsxs("div",{className:"td-group","aria-label":"구역 종류",children:[u.jsx("button",{className:`td-btn td-zone-safe ${H==="safe"?"is-active":""}`,onClick:()=>k("safe"),title:"안전 지역 — 파란 반투명 채움",children:"안전"}),u.jsx("button",{className:`td-btn td-zone-danger ${H==="danger"?"is-active":""}`,onClick:()=>k("danger"),title:"위험 지역 — 빨간 반투명 채움",children:"위험"})]}),c==="text"&&u.jsx("div",{className:"td-group","aria-label":"텍스트 크기",children:[1,2,4].map(T=>u.jsxs("button",{className:`td-btn ${E===T?"is-active":""}`,onClick:()=>Z(T),title:`글자 높이 ${T}셀`,children:[T,"셀"]},T))}),u.jsx("div",{className:"td-group",children:u.jsxs("select",{className:"td-select",value:v,onChange:T=>A(Number(T.target.value)),title:"스냅 단위 (셀)",children:[u.jsx("option",{value:1,children:"스냅 1"}),u.jsx("option",{value:.5,children:"스냅 ½"}),u.jsx("option",{value:.25,children:"스냅 ¼"}),u.jsx("option",{value:0,children:"스냅 끔"})]})}),u.jsxs("div",{className:"td-group",children:[u.jsx("select",{className:"td-select",value:dn.grid[0],onChange:T=>{const rn=Number(T.target.value);a(dn.id,{grid:[rn,rn]})},title:"작업 범위 (셀)",children:Yx.map(T=>u.jsxs("option",{value:T,children:[T,"×",T]},T))}),u.jsxs("select",{className:"td-select",value:dn.style.wallM,onChange:T=>a(dn.id,{style:{...dn.style,wallM:Number(T.target.value)}}),title:"벽 두께 (실척)",children:[u.jsx("option",{value:.25,children:"벽 0.25m"}),u.jsx("option",{value:.5,children:"벽 0.5m"})]}),u.jsx("button",{className:`td-btn ${dn.style.hatch?"is-active":""}`,onClick:()=>a(dn.id,{style:{...dn.style,hatch:!dn.style.hatch}}),title:"외곽 해칭 켜기/끄기",children:"해칭"})]}),u.jsx("div",{className:"td-group","aria-label":"동선 표시",children:u.jsx("button",{className:`td-btn td-path-toggle ${dn.pathVisible!==!1?"is-active":""}`,"data-testid":"td-path-toggle",onClick:()=>a(dn.id,{pathVisible:dn.pathVisible===!1}),title:`동선 레이어 표시 — 끄면 획 ${(dn.strokes??[]).length}개가 도면·내보내기에서 숨겨집니다 (데이터는 보존)`,children:"동선"})}),u.jsxs("div",{className:"td-group","aria-label":"버블 오버레이",children:[u.jsx("button",{className:`td-btn td-overlay ${dn.overlay.visible?"is-active":""}`,onClick:()=>{const T=!dn.overlay.visible;a(dn.id,{overlay:{...dn.overlay,visible:T}}),T||z(!1)},title:"버블 오버레이 — 버블 다이어그램을 도면 위에 반투명으로 표시 (노드가 없으면 빈 화면)",children:"버블"}),dn.overlay.visible&&u.jsxs(u.Fragment,{children:[u.jsx("input",{className:"td-overlay-range",type:"range",min:10,max:90,step:5,value:Math.round(dn.overlay.opacity*100),onChange:T=>a(dn.id,{overlay:{...dn.overlay,opacity:Number(T.target.value)/100}}),title:`오버레이 투명도 ${Math.round(dn.overlay.opacity*100)}%`}),u.jsx("button",{className:`td-btn td-cal ${C?"is-active":""}`,onClick:()=>z(T=>!T),title:"오버레이 조정 — 켜면 캔버스 드래그로 오버레이 이동, 슬라이더로 스케일",children:"조정"}),C&&u.jsxs(u.Fragment,{children:[u.jsx("input",{className:"td-overlay-range td-cal-range",type:"range",min:30,max:300,step:5,value:Math.round((dn.overlay.scale||1)*100),onChange:T=>a(dn.id,{overlay:{...dn.overlay,scale:Number(T.target.value)/100}}),title:`오버레이 스케일 ${Math.round((dn.overlay.scale||1)*100)}%`}),u.jsx("button",{className:"td-btn",onClick:()=>a(dn.id,{overlay:{...dn.overlay,tx:0,ty:0,scale:1}}),title:"오버레이 위치·스케일을 자동 맞춤으로 되돌리기",children:"리셋"})]})]})]}),u.jsx("div",{className:"td-spacer"}),u.jsxs("div",{className:"td-group",children:[u.jsx("button",{className:"td-btn",onClick:()=>Gw(dn,`${n.name}_${dn.name}.png`),title:"현재 평면도를 PNG로",children:"PNG"}),u.jsx("button",{className:"td-btn",onClick:()=>il(n,`${n.name}.map.json`),title:"맵 전체(버블+평면도)를 JSON으로",children:"맵 JSON"})]})]}),u.jsx(KP,{doc:dn,tool:c,erase:h,rough:m,snap:v,corridorW:g,doorW:x,stairW:b,textSize:E,markerKind:F,strokeColor:R,strokeWidth:j,zoneKind:H,target:I,calibrating:C&&dn.overlay.visible,onStatus:Q}),u.jsxs("div",{className:"td-status",children:[u.jsx("span",{className:"td-status-doc",children:dn.name}),u.jsxs("span",{children:[dn.grid[0],"×",dn.grid[1],"셀 · ",Sn,"m (",Sn*100,"uu) · 도형 ",dn.geo.length," · 구조 ",(dn.struct??[]).length," · 구역 ",(dn.zones??[]).length," · 문 ",(dn.doors??[]).length," · 계단 ",(dn.stairs??[]).length," · 텍스트 ",(dn.texts??[]).length," · 마커 ",(dn.markers??[]).length]}),u.jsx("span",{className:"td-status-hover",children:en}),u.jsx("span",{className:"td-status-hint",children:"휠: 줌 · 스페이스+드래그: 이동 · E: 빼기 · F: 러프 · Ctrl+Z: 실행취소"})]}),G&&Ki.createPortal(u.jsx("div",{className:"pt-confirm-backdrop",onClick:()=>P(!1),children:u.jsxs("div",{className:"pt-confirm","data-testid":"td-exit-confirm",onClick:T=>T.stopPropagation(),children:[u.jsxs("p",{className:"pt-confirm-msg",children:["평면도를 닫고 ",u.jsx("strong",{children:"버블 다이어그램"}),"으로 돌아갈까요?",u.jsx("br",{}),"작업 내용은 그대로 저장되어 있습니다."]}),u.jsxs("div",{className:"pt-confirm-actions",children:[u.jsx("button",{className:"pt-btn","data-testid":"td-exit-cancel",autoFocus:!0,onClick:()=>P(!1),children:"취소"}),u.jsx("button",{className:"pt-btn pt-btn--danger","data-testid":"td-exit-ok",onClick:()=>{P(!1),e()},children:"나가기"})]})]})}),document.body)]})}const yy="bubble-atelier::massing",vy=1;function YP(){try{const n=localStorage.getItem(yy);if(!n)return null;const r=JSON.parse(n);if(r.v!==vy||!Array.isArray(r.docs)||r.docs.length===0)return null;const e=r.docs.map(o=>({...o,grid:Array.isArray(o.grid)?o.grid:[64,64],view:o.view??{dir:0},blocks:Array.isArray(o.blocks)?o.blocks:[]})),t=e.some(o=>o.id===r.currentId)?r.currentId:e[0].id;return{docs:e,currentId:t}}catch{return null}}const fr=tl()(ol((n,r)=>{const t=YP()??(()=>{const i=Xl(Pn("ms"));return{docs:[i],currentId:i.id}})(),o=(i,s)=>n(a=>({docs:a.docs.map(l=>l.id===i?s(l):l)}));return{...t,setActive:i=>{r().docs.some(s=>s.id===i)&&n({currentId:i})},addDoc:i=>{const s=Xl(Pn("ms"),i??`매싱 ${r().docs.length+1}`);return n(a=>({docs:[...a.docs,s],currentId:s.id})),s.id},removeDoc:i=>n(s=>{const a=s.docs.filter(l=>l.id!==i);if(a.length===0){const l=Xl(Pn("ms"));return{docs:[l],currentId:l.id}}return{docs:a,currentId:s.currentId===i?a[0].id:s.currentId}}),renameDoc:(i,s)=>o(i,a=>({...a,name:s})),updateDoc:(i,s)=>o(i,a=>({...a,...s})),addBlock:(i,s)=>o(i,a=>({...a,blocks:[...a.blocks,s]})),addBlocks:(i,s)=>o(i,a=>({...a,blocks:[...a.blocks,...s]})),updateBlock:(i,s,a)=>o(i,l=>({...l,blocks:l.blocks.map(c=>c.id===s?{...c,...a}:c)})),removeBlocks:(i,s)=>{const a=new Set(s);o(i,l=>({...l,blocks:l.blocks.filter(c=>!a.has(c.id))}))},translateBlocks:(i,s,a,l)=>{if(a===0&&l===0)return;const c=new Set(s);o(i,d=>({...d,blocks:d.blocks.map(h=>c.has(h.id)?{...h,x:h.x+a,y:h.y+l}:h)}))}}},{partialize:n=>({docs:n.docs,currentId:n.currentId}),limit:80,equality:(n,r)=>n.docs===r.docs}));let dc;fr.subscribe(n=>{dc&&window.clearTimeout(dc),dc=window.setTimeout(()=>{try{localStorage.setItem(yy,JSON.stringify({v:vy,docs:n.docs,currentId:n.currentId}))}catch(r){console.warn("매싱 저장 실패",r)}},400)});const xy=()=>fr.temporal.getState().undo(),wy=()=>fr.temporal.getState().redo(),ne=16,Fa=14;function tr(n,r,e){return[(n-r)*ne,(n+r)*(ne/2)-e*Fa]}function QP(n,r){const e=n/ne,t=r/(ne/2);return[(e+t)/2,(t-e)/2]}const Sy=[["#FAF6EE","#E3DCCB","#CDC4AE"],["#E9E2D2","#D2C9B4","#B9AE95"],["#CFC6B2","#B6AB93","#9C9078"],["#A89D85","#8F846D","#766C58"]],JP="#1A1814";function ky(n){const{x:r,y:e,z:t,w:o,d:i,h:s}=n,a=t+s;return{top:[tr(r,e,a),tr(r+o,e,a),tr(r+o,e+i,a),tr(r,e+i,a)],left:[tr(r,e+i,t),tr(r+o,e+i,t),tr(r+o,e+i,a),tr(r,e+i,a)],right:[tr(r+o,e,t),tr(r+o,e+i,t),tr(r+o,e+i,a),tr(r+o,e,a)]}}const Qt=1e-6;function qP(n,r){if(n.x>=r.x+r.w-Qt)return!0;if(r.x>=n.x+n.w-Qt)return!1;if(n.y>=r.y+r.d-Qt)return!0;if(r.y>=n.y+n.d-Qt)return!1;if(n.z>=r.z+r.h-Qt)return!0;if(r.z>=n.z+n.h-Qt)return!1;const e=Math.min(n.x+n.w,r.x+r.w)-Math.max(n.x,r.x),t=Math.min(n.y+n.d,r.y+r.d)-Math.max(n.y,r.y),o=Math.min(n.z+n.h,r.z+r.h)-Math.max(n.z,r.z);return e<=t&&e<=o?n.x+n.w/2>r.x+r.w/2:t<=o?n.y+n.d/2>r.y+r.d/2:n.z+n.h/2>r.z+r.h/2}function bp(n,r,e){let t=n;const o=(r%4+4)%4;for(let i=0;i<o;i++)t={...t,x:t.y,y:e-t.x-t.w,w:t.d,d:t.w};return t}function nT(n,r,e){const t=(e%4+4)%4;for(let o=0;o<t;o++){const i=n;n=r,r=-i}return[n,r]}const Cp=n=>(4-n%4)%4;function _y(n){return{x0:(n.x-(n.y+n.d))*ne,x1:(n.x+n.w-n.y)*ne,y0:(n.x+n.y)*(ne/2)-(n.z+n.h)*Fa,y1:(n.x+n.w+n.y+n.d)*(ne/2)-n.z*Fa}}const Ns=n=>n.x+n.w/2+n.y+n.d/2+(n.z+n.h/2)*.001,Pp=new WeakMap;function by(n){const r=Pp.get(n);if(r)return r;const e=n.length,t=n.map(_y),o=Array.from({length:e},()=>[]),i=new Array(e).fill(0);for(let d=0;d<e;d++)for(let h=d+1;h<e;h++){const f=t[d],m=t[h];f.x1<=m.x0||m.x1<=f.x0||f.y1<=m.y0||m.y1<=f.y0||(qP(n[d],n[h])?(o[h].push(d),i[d]++):(o[d].push(h),i[h]++))}const s=[];for(let d=0;d<e;d++)i[d]===0&&s.push(d);const a=()=>{let d=0;for(let h=1;h<s.length;h++)Ns(n[s[h]])<Ns(n[s[d]])&&(d=h);return s.splice(d,1)[0]},l=[],c=new Array(e).fill(!1);for(;s.length;){const d=a();c[d]=!0,l.push(n[d]);for(const h of o[d])--i[h]===0&&s.push(h)}if(l.length<e){const d=n.filter((h,f)=>!c[f]).sort((h,f)=>Ns(h)-Ns(f));l.push(...d)}return Pp.set(n,l),l}function si(n,r){n.beginPath(),r.forEach(([e,t],o)=>o?n.lineTo(e,t):n.moveTo(e,t)),n.closePath()}function hc(n,r,e){let t=!1;for(let o=0,i=e.length-1;o<e.length;i=o++){const[s,a]=e[o],[l,c]=e[i];a>r!=c>r&&n<(l-s)*(r-a)/(c-a)+s&&(t=!t)}return t}function Tp(n,r,e){const t=by(e);for(let o=t.length-1;o>=0;o--){const i=t[o],s=ky(i);if(hc(n,r,s.top)||hc(n,r,s.left)||hc(n,r,s.right))return i.id}return null}function rT(n,r,e){const[t,o]=r.grid;if(e.gridAlpha>0){n.save(),n.globalAlpha=e.gridAlpha,n.strokeStyle="rgba(44,95,124,0.10)",n.lineWidth=1/e.zoomK,n.beginPath();for(let a=0;a<=t;a++){const[l,c]=tr(a,0,0),[d,h]=tr(a,o,0);n.moveTo(l,c),n.lineTo(d,h)}for(let a=0;a<=o;a++){const[l,c]=tr(0,a,0),[d,h]=tr(t,a,0);n.moveTo(l,c),n.lineTo(d,h)}n.stroke(),n.restore()}n.strokeStyle="rgba(44,95,124,0.22)",n.lineWidth=1.4/e.zoomK,si(n,[tr(0,0,0),tr(t,0,0),tr(t,o,0),tr(0,o,0)]),n.stroke();const i=new Set(e.selIds??[]),s=by(r.blocks);for(const a of s)js(n,a,e.zoomK,!1);for(const a of s)i.has(a.id)&&js(n,a,e.zoomK,!0);e.previewBlock&&(n.save(),n.globalAlpha=.55,js(n,e.previewBlock,e.zoomK,!1),n.restore(),js(n,e.previewBlock,e.zoomK,!0))}function js(n,r,e,t){const o=ky(r);if(t){n.save(),n.strokeStyle="rgba(44,95,124,0.95)",n.lineWidth=1.8/e,n.setLineDash([6/e,4/e]),si(n,[o.top[0],o.top[1],o.right[0],o.right[1],o.left[0],o.top[3]]),n.stroke(),n.setLineDash([]),n.restore();return}const i=Sy[Math.max(0,Math.min(3,r.tone??1))];n.lineJoin="round",n.lineWidth=1.1/e,n.strokeStyle=JP,n.fillStyle=i[0],si(n,o.top),n.fill(),n.stroke(),n.fillStyle=i[1],si(n,o.left),n.fill(),n.stroke(),n.fillStyle=i[2],si(n,o.right),n.fill(),n.stroke()}function eT(n){const[r,e]=n.grid,t=Math.max(6,...n.blocks.map(o=>o.z+o.h));return{minX:-e*ne,maxX:r*ne,minY:-t*Fa,maxY:(r+e)*(ne/2)}}const Ip=48;function tT({doc:n,tool:r,heightM:e,baseMode:t,stoneZ:o,toneSel:i,onStatus:s}){var fn;const a=N.useRef(null),l=N.useRef(null),c=N.useRef(fe),d=N.useRef(0),h=N.useRef(!1),f=N.useRef(null),m=N.useRef(null),[y,v]=N.useState([]),A=N.useRef(null),g=N.useRef([0,0]),p=N.useRef(null),x=fr(X=>X.addBlock),S=fr(X=>X.addBlocks),b=fr(X=>X.updateBlock),O=fr(X=>X.removeBlocks),E=fr(X=>X.translateBlocks),Z=N.useRef(null),F=n.grid[0],K=((fn=n.view)==null?void 0:fn.dir)??0,I=N.useMemo(()=>n.blocks.map(X=>bp(X,K,F)),[n.blocks,K,F]),Y=X=>{const en=l.current;if(!en)return null;const Q=en.getBoundingClientRect(),ln=c.current;return[ln.invertX(X.clientX-Q.left),ln.invertY(X.clientY-Q.top)]},H=X=>{const en=Y(X);return en?QP(en[0],en[1]):null},k=X=>Math.max(0,Math.min(F,Math.round(X))),R=()=>{const X=f.current,en=m.current;if(!X||!en)return null;const Q=Math.min(X[0],en[0]),ln=Math.max(X[0],en[0]),cn=Math.min(X[1],en[1]),wn=Math.max(X[1],en[1]);return r==="box"?{id:"_pv",kind:"mass",x:Q,y:cn,z:0,w:Math.max(1,ln-Q),d:Math.max(1,wn-cn),h:e,tone:1}:r==="wall"?ln-Q>=wn-cn?{id:"_pv",kind:"wall",x:Q,y:X[1]-.125,z:0,w:Math.max(1,ln-Q),d:.25,h:e,tone:1}:{id:"_pv",kind:"wall",x:X[0]-.125,y:cn,z:0,w:.25,d:Math.max(1,wn-cn),h:e,tone:1}:r==="base"?{id:"_pv",kind:"base",x:Q,y:cn,z:t==="elevate"?0:-.5,w:Math.max(1,ln-Q),d:Math.max(1,wn-cn),h:.5,tone:t==="elevate"?1:2}:r==="overhead"?{id:"_pv",kind:"overhead",x:Q,y:cn,z:e,w:Math.max(1,ln-Q),d:Math.max(1,wn-cn),h:.25,tone:1}:null},M=X=>{const en=bp(X,Cp(K),F);x(n.id,{...en,id:Pn("blk")})},j=N.useCallback(()=>{const X=l.current,en=a.current;if(!X||!en)return;const Q=window.devicePixelRatio||1,ln=en.clientWidth,cn=en.clientHeight;(X.width!==Math.round(ln*Q)||X.height!==Math.round(cn*Q))&&(X.width=Math.round(ln*Q),X.height=Math.round(cn*Q),X.style.width=`${ln}px`,X.style.height=`${cn}px`);const wn=X.getContext("2d"),Nn=c.current;wn.setTransform(Q,0,0,Q,0,0),wn.fillStyle="#ECE5D6",wn.fillRect(0,0,ln,cn),wn.setTransform(Q*Nn.k,0,0,Q*Nn.k,Q*Nn.x,Q*Nn.y);const[Fn,dn]=g.current,un=new Set(y),kn=(Fn||dn)&&y.length?I.map(Tn=>un.has(Tn.id)?{...Tn,x:Tn.x+Fn,y:Tn.y+dn}:Tn):I;if(rT(wn,{...n,blocks:kn},{zoomK:Nn.k,gridAlpha:At(Nn.k*ne,3,6),selIds:y,previewBlock:R()}),p.current){const{a:Tn,b:Sn}=p.current;wn.fillStyle="rgba(44,95,124,0.08)",wn.strokeStyle="rgba(44,95,124,0.8)",wn.lineWidth=1.2/Nn.k,wn.setLineDash([5/Nn.k,4/Nn.k]);const $=Math.min(Tn[0],Sn[0]),tn=Math.min(Tn[1],Sn[1]),J=Math.abs(Sn[0]-Tn[0]),T=Math.abs(Sn[1]-Tn[1]);wn.fillRect($,tn,J,T),wn.strokeRect($,tn,J,T),wn.setLineDash([])}wn.setTransform(1,0,0,1,0,0)},[n,I,y,r,e,t,o,i]),w=N.useRef(j);w.current=j;const C=N.useCallback(()=>{d.current||(d.current=requestAnimationFrame(()=>{d.current=0,w.current()}))},[]);N.useEffect(()=>{C()},[j,C]),N.useEffect(()=>{v([]),f.current=null,m.current=null,p.current=null},[n.id]),N.useEffect(()=>{const X=l.current,en=a.current;if(!X||!en)return;const Q=en.clientWidth,ln=en.clientHeight,cn=eT(n),wn=cn.maxX-cn.minX,Nn=cn.maxY-cn.minY,Fn=Math.max(.02,Math.min(8,Math.min((Q-Ip*2)/wn,(ln-Ip*2)/Nn))),dn=cl().scaleExtent([Fn*.5,8]).translateExtent([[cn.minX-wn*.25,cn.minY-Nn*.25],[cn.maxX+wn*.25,cn.maxY+Nn*.25]]).filter(kn=>kn.type==="wheel"?!0:kn.type==="dblclick"?!1:h.current||kn.button===1).on("zoom",kn=>{c.current=kn.transform,C()}),un=Or(X);return un.call(dn),un.call(dn.transform,fe.translate((Q-(cn.minX+cn.maxX)*Fn)/2,(ln-(cn.minY+cn.maxY)*Fn)/2).scale(Fn)),()=>{un.on(".zoom",null)}},[n.id,F]),N.useEffect(()=>{const X=Q=>{const ln=Q.target.tagName;if(!(ln==="INPUT"||ln==="TEXTAREA")){if(Q.code==="Space"){Q.type==="keydown"?(h.current=!0,Q.preventDefault()):h.current=!1,a.current&&(a.current.dataset.panning=String(h.current));return}if(Q.type==="keydown"){if((Q.ctrlKey||Q.metaKey)&&Q.key.toLowerCase()==="c"){if(y.length===0)return;const cn=new Set(y);Z.current={blocks:n.blocks.filter(wn=>cn.has(wn.id)).map(wn=>({...wn})),pastes:0};return}if((Q.ctrlKey||Q.metaKey)&&Q.key.toLowerCase()==="v"){const cn=Z.current;if(!cn||cn.blocks.length===0)return;cn.pastes+=1;const wn=cn.pastes*2,Nn=[],Fn=cn.blocks.map(dn=>{const un=Pn("blk");return Nn.push(un),{...dn,id:un,x:dn.x+wn,y:dn.y+wn}});S(n.id,Fn),v(Nn);return}(Q.key==="Delete"||Q.key==="Backspace")&&y.length&&(O(n.id,y),v([])),Q.key==="Escape"&&y.length&&(Q.stopPropagation(),v([]),C())}}};window.addEventListener("keydown",X,!0),window.addEventListener("keyup",X);const en=new ResizeObserver(()=>C());return a.current&&en.observe(a.current),()=>{window.removeEventListener("keydown",X,!0),window.removeEventListener("keyup",X),en.disconnect()}},[y,n.id,n.blocks,C]);const z=X=>{if(X.button!==0||h.current)return;const en=H(X),Q=Y(X);if(!en||!Q)return;if(r==="tone"){const cn=Tp(Q[0],Q[1],I);cn&&b(n.id,cn,{tone:i});return}{const cn=Tp(Q[0],Q[1],I);if(cn){X.target.setPointerCapture(X.pointerId),y.includes(cn)||v([cn]),A.current=en,g.current=[0,0],C();return}}if(r!=="select"&&y.length>0&&(v([]),C()),r==="select"){X.target.setPointerCapture(X.pointerId),v([]),p.current={a:Q,b:Q},C();return}if(r==="column"||r==="stone"){const cn=Math.max(0,Math.min(F-1,Math.floor(en[0]))),wn=Math.max(0,Math.min(F-1,Math.floor(en[1])));M(r==="column"?{id:"_pv",kind:"column",x:cn,y:wn,z:0,w:1,d:1,h:e,tone:1}:{id:"_pv",kind:"stone",x:cn,y:wn,z:o,w:1,d:1,h:1,tone:1});return}X.target.setPointerCapture(X.pointerId);const ln=[k(en[0]),k(en[1])];f.current=ln,m.current=ln,C()},G=X=>{const en=H(X),Q=Y(X);if(!(!en||!Q)){if(s&&s(`(${en[0].toFixed(1)}, ${en[1].toFixed(1)}) · ${F}m × ${F}m · 블록 ${n.blocks.length} · 뷰 ${K+1}/4`+(r==="stone"?` · 띄움 ${o}m`:r==="tone"?` · 명도 ${i}`:r!=="select"?` · 높이 ${e}m`:"")+(y.length>1?` · 선택 ${y.length}개`:"")+(n.blocks.length===0?" · 박스(B)를 드래그해 첫 덩어리를 놓아보세요":"")),r==="select"&&p.current)p.current.b=Q;else if(A.current&&y.length){const[ln,cn]=A.current;g.current=[Math.round(en[0]-ln),Math.round(en[1]-cn)]}else f.current&&(m.current=[k(en[0]),k(en[1])]);C()}},P=()=>{if(r==="select"&&p.current){const{a:X,b:en}=p.current;p.current=null;const Q=Math.min(X[0],en[0]),ln=Math.max(X[0],en[0]),cn=Math.min(X[1],en[1]),wn=Math.max(X[1],en[1]);if(ln-Q>4||wn-cn>4){const Nn=I.filter(Fn=>{const dn=_y(Fn);return dn.x1>=Q&&dn.x0<=ln&&dn.y1>=cn&&dn.y0<=wn}).map(Fn=>Fn.id);v(Nn)}C();return}if(A.current&&y.length){const[X,en]=g.current;if(A.current=null,g.current=[0,0],X!==0||en!==0){const[Q,ln]=nT(X,en,Cp(K));E(n.id,y,Q,ln)}C();return}if(f.current){const X=R();f.current=null,m.current=null,X&&M(X),C()}};return u.jsx("div",{ref:a,className:"td-canvas-wrap","data-tool":r,children:u.jsx("canvas",{ref:l,className:"td-canvas","data-testid":"massing-canvas",onPointerDown:z,onPointerMove:G,onPointerUp:P,onContextMenu:X=>X.preventDefault()})})}const qe=(n,r,e=1,t=0,o=1)=>({kind:"stone",x:n,y:r,z:t,w:1,d:1,h:o,tone:e}),Ee=(n,r,e=3,t=1)=>({kind:"column",x:n,y:r,z:0,w:1,d:1,h:e,tone:t}),As=[qe(26,30,1),qe(31,27,2),qe(35,31,1),qe(29,34,3),qe(33,35,0)],fc=[Ee(25,26,3),Ee(36,26,2),Ee(25,36,2),Ee(36,36,3),Ee(30,31,1,2)],Ep=[{kind:"wall",x:25,y:24.875,z:0,w:12,d:.25,h:2.5,tone:1},{kind:"wall",x:23.875,y:25,z:0,w:.25,d:7,h:2,tone:2},qe(33,29,2,2)],oT=[{kind:"base",x:27,y:28,z:0,w:8,d:7,h:.5,tone:0},{kind:"overhead",x:26,y:27,z:3,w:10,d:9,h:.25,tone:3}],iT=[{kind:"base",x:25,y:26,z:0,w:12,d:9,h:.5,tone:0},Ee(25,26,3),Ee(36,26,3),Ee(25,34,3),Ee(36,34,3),{kind:"wall",x:25,y:25.875,z:0,w:12,d:.25,h:3,tone:2},{kind:"wall",x:24.875,y:26,z:0,w:.25,d:9,h:3,tone:2},{kind:"overhead",x:25,y:26,z:3,w:12,d:9,h:.25,tone:3}],sT=[{kind:"base",x:26.5,y:27,z:0,w:12,d:9,h:.5,tone:1},{kind:"base",x:23,y:30,z:0,w:18,d:2,h:.5,tone:1},{kind:"wall",x:28,y:25.875,z:0,w:8,d:.25,h:2,tone:1},qe(31,31,1),qe(34,29,1)],Mp=[{id:"pt1",name:"점·선·면 ① 점",blocks:As},{id:"pt2",name:"점·선·면 ② +선(기둥)",blocks:[...As,...fc]},{id:"pt3",name:"점·선·면 ③ +면 암시",blocks:[...As,...fc,...Ep]},{id:"pt4",name:"점·선·면 ④ 면 완성",blocks:[...As,...fc,...Ep,...oT]},{id:"def1",name:"공간 정의 — 강화",blocks:iT},{id:"def2",name:"공간 정의 — 약화",blocks:sT}],Np=[{id:"select",label:"선택",key:"V",title:"선택 (V) — 클릭 선택 · 빈 곳 드래그 = 마퀴 다중 선택 · 드래그 이동 · Delete 삭제"},{id:"box",label:"박스",key:"B",title:"박스 (B) — 바닥 드래그로 풋프린트, 높이는 프리셋. 질량(mass)"},{id:"column",label:"기둥",key:"C",title:"기둥 (C) — 클릭 배치, 1×1m. 점→선 실습"},{id:"wall",label:"벽판",key:"W",title:"벽판 (W) — 드래그 방향의 얇은 판 (두께 0.25m). 면 실습"},{id:"base",label:"바닥판",key:"G",title:"바닥판 (G) — 드래그. 올림(elevate) = 0.5m 단 / 파임(inset) = 0.5m 함몰"},{id:"overhead",label:"머리판",key:"O",title:"머리위판 (O) — 드래그. 높이 프리셋만큼 띄운 얇은 판 (두께 0.25m)"},{id:"stone",label:"점",key:"P",title:"점 (P) — 클릭 배치, 1×1×1m 돌. 띄움 프리셋으로 부유석"},{id:"tone",label:"명도",key:"T",title:"명도 (T) — 견본 선택 후 블록 클릭. Value Differentiation 실습"}],aT=[1,2,3,4,6],lT=[0,1,2,3];function cT(){var j;const n=B(w=>w.exitMassing),r=fr(w=>w.docs),e=fr(w=>w.currentId),t=fr(w=>w.setActive),o=fr(w=>w.addDoc),i=fr(w=>w.removeDoc),s=fr(w=>w.renameDoc),a=fr(w=>w.updateDoc),l=fr(w=>w.addBlocks),[c,d]=N.useState("box"),[h,f]=N.useState(3),[m,y]=N.useState("elevate"),[v,A]=N.useState(0),[g,p]=N.useState(2),[x,S]=N.useState(""),[b,O]=N.useState(null),[E,Z]=N.useState(""),[F,K]=N.useState({past:0,future:0});N.useEffect(()=>{const w=fr.temporal,C=()=>{const G=w.getState();K({past:G.pastStates.length,future:G.futureStates.length})};C();const z=w.subscribe(C);return()=>z()},[]);const I=r,Y=I.find(w=>w.id===e)??I[0]??null,H=((j=Y==null?void 0:Y.view)==null?void 0:j.dir)??0,k=w=>{Y&&a(Y.id,{view:{dir:((H+w)%4+4)%4}})};if(N.useEffect(()=>{const w=C=>{const z=C.target.tagName;if(z==="INPUT"||z==="TEXTAREA"||C.ctrlKey||C.metaKey||C.altKey)return;const G=C.key.toUpperCase(),P=Np.find(fn=>fn.key===G);if(P){d(P.id);return}G==="Q"&&k(-1),G==="E"&&k(1)};return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)},[Y==null?void 0:Y.id,H]),!Y)return u.jsxs("div",{className:"td-shell td-shell-empty",children:[u.jsx("p",{children:"매싱 스케치가 없습니다."}),u.jsx("button",{className:"td-btn",onClick:()=>o(),children:"+ 매싱 만들기"})]});const R=()=>{b&&E.trim()&&s(b,E.trim()),O(null)},M=(w,C)=>{const z=I.find(P=>P.id===w),G=z?z.blocks.length:0;G>0&&!window.confirm(`'${C}'에 블록 ${G}개가 있습니다. 삭제할까요?`)||i(w)};return u.jsxs("div",{className:"td-shell","data-testid":"massing-shell",children:[u.jsxs("div",{className:"td-bar",children:[u.jsx("button",{className:"td-btn td-back",onClick:n,title:"버블 다이어그램으로 (Esc)",children:"← 버블"}),u.jsxs("div",{className:"td-tabs",role:"tablist",children:[I.map(w=>u.jsx("div",{role:"tab","aria-selected":w.id===Y.id,className:`td-tab ${w.id===Y.id?"is-active":""}`,onClick:()=>t(w.id),onDoubleClick:()=>{O(w.id),Z(w.name)},title:"더블클릭: 이름 바꾸기",children:b===w.id?u.jsx("input",{autoFocus:!0,value:E,onChange:C=>Z(C.target.value),onBlur:R,onKeyDown:C=>{C.key==="Enter"&&R(),C.key==="Escape"&&O(null)}}):u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"td-tab-name",children:w.name}),I.length>1&&u.jsx("button",{className:"td-tab-close",onClick:C=>{C.stopPropagation(),M(w.id,w.name)},title:"삭제",children:"×"})]})},w.id)),u.jsx("button",{className:"td-btn td-tab-add",onClick:()=>o(),title:"매싱 추가",children:"＋"})]}),u.jsx("div",{className:"td-spacer"}),u.jsx("div",{className:"td-group",role:"toolbar","aria-label":"도구",children:Np.map(w=>u.jsx("button",{className:`td-btn td-tool ${c===w.id?"is-active":""}`,onClick:()=>d(w.id),title:w.title,children:w.label},w.id))}),u.jsxs("div",{className:"td-group",children:[u.jsx("button",{className:"td-btn td-undo",onClick:()=>xy(),disabled:F.past===0,title:`되돌리기 (Ctrl+Z) · ${F.past}`,children:"↶"}),u.jsx("button",{className:"td-btn td-redo",onClick:()=>wy(),disabled:F.future===0,title:`다시 실행 (Ctrl+Shift+Z / Ctrl+Y) · ${F.future}`,children:"↷"})]})]}),u.jsxs("div",{className:"td-bar td-bar-sub",children:[c!=="stone"&&c!=="tone"&&c!=="select"&&c!=="base"&&u.jsx("div",{className:"td-group","aria-label":"블록 높이",children:aT.map(w=>u.jsxs("button",{className:`td-btn ${h===w?"is-active":""}`,onClick:()=>f(w),title:c==="overhead"?`머리위판 띄움 ${w}m`:`새 블록 높이 ${w}m`,children:[w,"m"]},w))}),c==="base"&&u.jsxs("div",{className:"td-group","aria-label":"바닥판 모드",children:[u.jsx("button",{className:`td-btn ${m==="elevate"?"is-active":""}`,onClick:()=>y("elevate"),title:"올림(elevate) — 바닥 위 0.5m 단",children:"올림"}),u.jsx("button",{className:`td-btn ${m==="inset"?"is-active":""}`,onClick:()=>y("inset"),title:"파임(inset) — 바닥 아래 0.5m 함몰",children:"파임"})]}),c==="stone"&&u.jsx("div",{className:"td-group","aria-label":"점 띄움",children:lT.map(w=>u.jsx("button",{className:`td-btn ${v===w?"is-active":""}`,onClick:()=>A(w),title:w===0?"바닥에 놓기":`공중 ${w}m — 부유석`,children:w===0?"바닥":`${w}m`},w))}),c==="tone"&&u.jsx("div",{className:"td-group","aria-label":"명도 견본",children:Sy.map((w,C)=>u.jsxs("button",{className:`td-btn ms-tone ${g===C?"is-active":""}`,onClick:()=>p(C),title:`명도 ${C} — 블록을 클릭해 적용`,children:[u.jsx("span",{className:"ms-tone-chip",style:{background:w[0],borderColor:w[2]}}),C]},C))}),u.jsx("div",{className:"td-group","aria-label":"학습 가이드",children:u.jsxs("select",{className:"td-select",value:"","data-testid":"ms-preset",onChange:w=>{const C=Mp.find(G=>G.id===w.target.value);if(!C)return;const z=o(C.name);l(z,C.blocks.map(G=>({...G,id:Pn("blk")})))},title:"학습 가이드 — CGMA 3주차 점·선·면 단계와 공간 정의 비교 장면을 새 탭으로",children:[u.jsx("option",{value:"",children:"학습 가이드…"}),Mp.map(w=>u.jsx("option",{value:w.id,children:w.name},w.id))]})}),u.jsxs("div",{className:"td-group","aria-label":"카메라 회전",children:[u.jsx("button",{className:"td-btn",onClick:()=>k(-1),title:"반시계 회전 (Q)",children:"⟲"}),u.jsxs("span",{className:"ms-dir","data-testid":"ms-dir",children:["뷰 ",H+1,"/4"]}),u.jsx("button",{className:"td-btn",onClick:()=>k(1),title:"시계 회전 (E)",children:"⟳"})]}),u.jsx("div",{className:"td-spacer"})]}),u.jsx(tT,{doc:Y,tool:c,heightM:h,baseMode:m,stoneZ:v,toneSel:g,onStatus:S}),u.jsxs("div",{className:"td-status",children:[u.jsx("span",{className:"td-status-doc",children:Y.name}),u.jsxs("span",{children:[Y.grid[0],"×",Y.grid[1],"m · 블록 ",Y.blocks.length," · 뷰 ",H+1,"/4"]}),u.jsx("span",{className:"td-status-hover",children:x}),u.jsx("span",{className:"td-status-hint",children:"휠: 줌 · 스페이스+드래그: 이동 · Q/E: 회전 · Ctrl+Z: 실행취소"})]})]})}const Cy="bubble-atelier::flow",Py=1;function uT(){try{const n=localStorage.getItem(Cy);if(!n)return null;const r=JSON.parse(n);if(r.v!==Py||!Array.isArray(r.docs)||r.docs.length===0)return null;const e=r.docs.map(o=>({...o,grid:128,start:o.start??{x:8,y:64},boxes:Array.isArray(o.boxes)?o.boxes.map(i=>({rot:0,...i})):[],discs:Array.isArray(o.discs)?o.discs:[]})),t=e.some(o=>o.id===r.currentId)?r.currentId:e[0].id;return{docs:e,currentId:t}}catch{return null}}const xr=tl()(ol((n,r)=>{const t=uT()??(()=>{const i=Yl(Pn("fl"));return{docs:[i],currentId:i.id}})(),o=(i,s)=>n(a=>({docs:a.docs.map(l=>l.id===i?s(l):l)}));return{...t,setActive:i=>{r().docs.some(s=>s.id===i)&&n({currentId:i})},addDoc:(i,s)=>{const a={...Yl(Pn("fl"),i??`흐름 ${r().docs.length+1}`),...s};return n(l=>({docs:[...l.docs,a],currentId:a.id})),a.id},removeDoc:i=>n(s=>{const a=s.docs.filter(l=>l.id!==i);if(a.length===0){const l=Yl(Pn("fl"));return{docs:[l],currentId:l.id}}return{docs:a,currentId:s.currentId===i?a[0].id:s.currentId}}),renameDoc:(i,s)=>o(i,a=>({...a,name:s})),updateDoc:(i,s)=>o(i,a=>({...a,...s})),addBox:(i,s)=>o(i,a=>({...a,boxes:[...a.boxes,s]})),addDisc:(i,s)=>o(i,a=>({...a,discs:[...a.discs,s]})),removeObjs:(i,s)=>{const a=new Set(s);o(i,l=>({...l,boxes:l.boxes.filter(c=>!a.has(c.id)),discs:l.discs.filter(c=>!a.has(c.id))}))},patchObj:(i,s,a)=>{o(i,l=>({...l,boxes:l.boxes.map(c=>c.id===s?{...c,...a}:c),discs:l.discs.map(c=>c.id===s?{...c,...a}:c)}))},translateObjs:(i,s,a,l)=>{if(a===0&&l===0)return;const c=new Set(s);o(i,d=>({...d,boxes:d.boxes.map(h=>c.has(h.id)?{...h,x:h.x+a,y:h.y+l}:h),discs:d.discs.map(h=>c.has(h.id)?{...h,x:h.x+a,y:h.y+l}:h)}))}}},{partialize:n=>({docs:n.docs,currentId:n.currentId}),limit:80,equality:(n,r)=>n.docs===r.docs}));let pc;xr.subscribe(n=>{pc&&window.clearTimeout(pc),pc=window.setTimeout(()=>{try{localStorage.setItem(Cy,JSON.stringify({v:Py,docs:n.docs,currentId:n.currentId}))}catch(r){console.warn("흐름 저장 실패",r)}},400)});const Ty=()=>xr.temporal.getState().undo(),Iy=()=>xr.temporal.getState().redo(),hn=16,jp=.6,dT=.12,hT=.5,fT=1.8,pT=1,mT=0;function gT(n,r,e,t){let o=pT,i=mT;const s=(a,l,c,d)=>{let h=a*a+l*l;if(h<c*c){const m=c/Math.sqrt(Math.max(h,1e-9));a*=m,l*=m,h=c*c}const f=h*h;o+=d*(-(c*c)*(a*a-l*l))/f,i+=d*(-(c*c)*2*a*l)/f,i+=(l>=0?1:-1)*dT*d*(c*c/h)};for(const a of e){const l=a.h/2+jp,c=a.x+a.w/2,d=a.y+a.h/2,h=Math.max(0,a.w/2+jp-l),f=a.rot??0,m=Math.cos(f),y=Math.sin(f),v=Math.max(-h,Math.min(h,(n-c)*m+(r-d)*y));s(n-(c+m*v),r-(d+y*v),l,1)}for(const a of t)a.kind==="hill"?s(n-a.x,r-a.y,a.r,hT):s(n-a.x,r-a.y,a.r+.4,1);return[o,i]}function Fd(n,r,e){const t=n.rot??0,o=n.x+n.w/2,i=n.y+n.h/2,s=Math.cos(t),a=Math.sin(t),l=r-o,c=e-i;return[l*s+c*a,-l*a+c*s]}function Ve(n,r,e){const t=n.rot??0,o=n.x+n.w/2,i=n.y+n.h/2,s=Math.cos(t),a=Math.sin(t);return[o+r*s-e*a,i+r*a+e*s]}function yT(n,r,e,t){let o=0;for(const i of e){const[s,a]=Fd(i,n,r),l=Math.max(-i.w/2,Math.min(i.w/2,s)),c=Math.max(-i.h/2,Math.min(i.h/2,a)),d=Math.hypot(s-l,a-c);o+=1/((d+.6)*(d+.6))}for(const i of t){const s=Math.hypot(n-i.x,r-i.y);if(i.kind==="hill"){const l=i.r*fT;s<l&&(o+=.9*(1-s/l));continue}const a=Math.max(0,s-i.r);o+=1/((a+.6)*(a+.6))}return o}function vT(n,r,e,t,o,i=900,s=.35){const a=r,l=(f,m)=>{const y=gT(f,m,e,t),v=y[0];let A=y[1];return A+=Math.max(-.35,Math.min(.35,(a-m)*.04)),[v,A]},c=[[n,r]];let d=n,h=r;for(let f=0;f<i;f++){let[m,y]=l(d,h),v=Math.hypot(m,y);if(v<.05)break;const A=d+m/v*(s/2),g=h+y/v*(s/2);if([m,y]=l(A,g),v=Math.hypot(m,y),v<1e-4)break;d+=m/v*s,h+=y/v*s;for(const p of e){const[x,S]=Fd(p,d,h),b=p.w/2,O=p.h/2;if(Math.abs(x)<b&&Math.abs(S)<O){const E=x+b,Z=b-x,F=S+O,K=O-S,I=Math.min(E,Z,F,K);let Y=x,H=S;I===E?Y=-b-.02:I===Z?Y=b+.02:I===F?H=-O-.02:H=O+.02,[d,h]=Ve(p,Y,H)}}for(const p of t){if(p.kind!=="pillar")continue;const x=d-p.x,S=h-p.y,b=Math.hypot(x,S);b<p.r&&b>1e-6&&(d=p.x+x/b*(p.r+.02),h=p.y+S/b*(p.r+.02))}if(c.push([d,h]),d<-2||h<-2||d>o+1||h>o+2)break}return c}function xT(n,r,e=1.5){const t=[];for(let o=2;o<=r-2;o+=e)t.push({x:n.x,y:o});return t}function wT(n,r,e){for(let t=e.length-1;t>=0;t--){const o=e[t],[i,s]=Fd(o,n,r);if(Math.abs(i)<=o.w/2&&Math.abs(s)<=o.h/2)return o.id}return null}function ST(n,r,e){for(let t=e.length-1;t>=0;t--){const o=e[t];if(Math.hypot(n-o.x,r-o.y)<=o.r+.4)return o.id}return null}const Ap=48,Op=24,Rp=8,kT=10,Lp=Math.PI/12,Dp=(n,r,e)=>[r*Math.cos(n)-e*Math.sin(n),r*Math.sin(n)+e*Math.cos(n)];function _T({doc:n,tool:r,view:e,onStatus:t}){const o=N.useRef(null),i=N.useRef(null),s=N.useRef(fe),a=N.useRef(0),l=N.useRef(!1),c=N.useRef(null),d=N.useRef(null),[h,f]=N.useState(null),m=N.useRef(null),y=N.useRef(null),v=N.useRef(null),A=xr(j=>j.addBox),g=xr(j=>j.addDisc),p=xr(j=>j.removeObjs),x=xr(j=>j.translateObjs),S=xr(j=>j.patchObj),b=xr(j=>j.updateDoc),O=n.grid,E=j=>{const w=i.current;if(!w)return null;const C=w.getBoundingClientRect(),z=s.current;return[z.invertX(j.clientX-C.left)/hn,z.invertY(j.clientY-C.top)/hn]},Z=j=>Math.max(0,Math.min(O,Math.round(j))),F=()=>{var fn,X,en;const j=m.current;let w=n.boxes,C=n.discs,z=n.start;if(j&&(j.dx||j.dy))if(((fn=j.what)==null?void 0:fn.kind)==="box"){const Q=j.what.id;w=w.map(ln=>ln.id===Q?{...ln,x:ln.x+j.dx,y:ln.y+j.dy}:ln)}else if(((X=j.what)==null?void 0:X.kind)==="disc"){const Q=j.what.id;C=C.map(ln=>ln.id===Q?{...ln,x:ln.x+j.dx,y:ln.y+j.dy}:ln)}else((en=j.what)==null?void 0:en.kind)==="start"&&(z={x:z.x+j.dx,y:z.y+j.dy});const G=y.current,P=v.current;return G&&P&&(w=w.map(Q=>Q.id===G.id?{...Q,...P}:Q),C=C.map(Q=>Q.id===G.id?{...Q,...P}:Q)),{boxes:w,discs:C,start:z}},K=j=>{if(!h)return null;const w=s.current.k,C=kT/w/hn,z=n.boxes.find(P=>P.id===h);if(z){const P=z.rot??0,fn=z.x+z.w/2,X=z.y+z.h/2,[en,Q]=Ve(z,0,-z.h/2-Op/w/hn);if(Math.hypot(j[0]-en,j[1]-Q)<=C)return{type:"rotate",id:z.id,cx:fn,cy:X};for(const[ln,cn]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const[wn,Nn]=Ve(z,ln*z.w/2,cn*z.h/2);if(Math.hypot(j[0]-wn,j[1]-Nn)<=C){const[Fn,dn]=Ve(z,-ln*z.w/2,-cn*z.h/2);return{type:"resize",id:z.id,gx:ln,gy:cn,fx:Fn,fy:dn,rot:P}}}return null}const G=n.discs.find(P=>P.id===h);return G&&Math.hypot(j[0]-(G.x+G.r),j[1]-G.y)<=C?{type:"radius",id:G.id,cx:G.x,cy:G.y,kind:G.kind}:null},I=N.useCallback(()=>{var dn;const j=i.current,w=o.current;if(!j||!w)return;const C=window.devicePixelRatio||1,z=w.clientWidth,G=w.clientHeight;(j.width!==Math.round(z*C)||j.height!==Math.round(G*C))&&(j.width=Math.round(z*C),j.height=Math.round(G*C),j.style.width=`${z}px`,j.style.height=`${G}px`);const P=j.getContext("2d"),fn=s.current,X=O*hn;P.setTransform(C,0,0,C,0,0),P.fillStyle="#ECE5D6",P.fillRect(0,0,z,G),P.setTransform(C*fn.k,0,0,C*fn.k,C*fn.x,C*fn.y),P.fillStyle="#FAF6EE",P.fillRect(0,0,X,X);const en=At(fn.k*hn,3,6);if(en>0){P.globalAlpha=en,P.strokeStyle="rgba(44,95,124,0.08)",P.lineWidth=1/fn.k,P.beginPath();for(let un=0;un<=O;un+=2)P.moveTo(un*hn,0),P.lineTo(un*hn,X),P.moveTo(0,un*hn),P.lineTo(X,un*hn);P.stroke(),P.globalAlpha=1}P.strokeStyle="rgba(44,95,124,0.25)",P.lineWidth=1.4/fn.k,P.strokeRect(0,0,X,X);const{boxes:Q,discs:ln,start:cn}=F();if(e.pressure&&(Q.length||ln.length))for(let kn=0;kn<O;kn+=2)for(let Tn=0;Tn<O;Tn+=2){const Sn=yT(Tn+1,kn+1,Q,ln),$=Math.min(.34,Sn*.16);$<.015||(P.fillStyle=`rgba(44,95,124,${$.toFixed(3)})`,P.fillRect(Tn*hn,kn*hn,2*hn,2*hn))}const wn=xT(cn,O,e.lineGap),Nn=e.lineAlpha;P.strokeStyle=`rgba(26,24,20,${Nn.toFixed(2)})`,P.lineWidth=1.3/fn.k,P.lineJoin="round";for(const un of wn){const kn=vT(un.x,un.y,Q,ln,O);if(kn.length<2)continue;P.beginPath(),kn.forEach(([T,rn],yn)=>yn?P.lineTo(T*hn,rn*hn):P.moveTo(T*hn,rn*hn)),P.stroke();const[Tn,Sn]=kn[kn.length-2],[$,tn]=kn[kn.length-1],J=Math.atan2(tn-Sn,$-Tn);P.save(),P.translate($*hn,tn*hn),P.rotate(J),P.fillStyle=`rgba(26,24,20,${Math.min(1,Nn+.02).toFixed(2)})`,P.beginPath(),P.moveTo(0,0),P.lineTo(-4.5/fn.k,-2.2/fn.k),P.lineTo(-4.5/fn.k,2.2/fn.k),P.closePath(),P.fill(),P.restore()}for(const un of ln)if(un.kind==="hill")for(let kn=3;kn>=1;kn--){const Tn=un.r*kn/3;P.beginPath(),P.arc(un.x*hn,un.y*hn,Tn*hn,0,Math.PI*2),P.fillStyle=`rgba(160,124,62,${(.07+.05*(3-kn)).toFixed(2)})`,P.fill(),P.strokeStyle="rgba(110,86,44,0.45)",P.lineWidth=1/fn.k,P.stroke()}for(const un of Q){const kn=un.rot??0;P.save(),P.translate((un.x+un.w/2)*hn,(un.y+un.h/2)*hn),P.rotate(kn),P.fillStyle="#2A2520",P.fillRect(-un.w/2*hn,-un.h/2*hn,un.w*hn,un.h*hn),P.strokeStyle="#1A1814",P.lineWidth=1.2/fn.k,P.strokeRect(-un.w/2*hn,-un.h/2*hn,un.w*hn,un.h*hn),P.restore()}for(const un of ln)un.kind==="pillar"&&(P.beginPath(),P.arc(un.x*hn,un.y*hn,un.r*hn,0,Math.PI*2),P.fillStyle="#2A2520",P.fill(),P.strokeStyle="#1A1814",P.lineWidth=1.2/fn.k,P.stroke());if(e.normals){const un=(Sn,$,tn,J,T,rn)=>{const yn=Sn+tn*T,bn=$+J*T;P.strokeStyle=`rgba(184,84,80,${rn})`,P.fillStyle=`rgba(184,84,80,${rn})`,P.lineWidth=1.4/fn.k,P.beginPath(),P.moveTo(Sn*hn,$*hn),P.lineTo(yn*hn,bn*hn),P.stroke();const In=Math.atan2(J,tn);P.save(),P.translate(yn*hn,bn*hn),P.rotate(In),P.beginPath(),P.moveTo(0,0),P.lineTo(-5/fn.k,-2.6/fn.k),P.lineTo(-5/fn.k,2.6/fn.k),P.closePath(),P.fill(),P.restore()};for(const Sn of Q){const $=Sn.rot??0,tn=Sn.w/2,J=Sn.h/2,T=(rn,yn,bn,In)=>{const[sr,oe]=Ve(Sn,rn,yn),[kr,Oo]=Dp($,bn,In);un(sr,oe,kr,Oo,2.4,.85)};for(let rn=-tn+4/2;rn<=tn;rn+=4){const yn=Math.min(rn,tn-.5);T(yn,-J,0,-1),T(yn,J,0,1)}for(let rn=-J+4/2;rn<=J;rn+=4){const yn=Math.min(rn,J-.5);T(-tn,yn,-1,0),T(tn,yn,1,0)}}for(const Sn of ln){const $=Sn.kind==="hill"?10:8,tn=Sn.kind==="hill"?2.4*.6:2.4,J=Sn.kind==="hill"?.55:.85;for(let T=0;T<$;T++){const rn=T/$*Math.PI*2,yn=Math.cos(rn),bn=Math.sin(rn);un(Sn.x+yn*Sn.r,Sn.y+bn*Sn.r,yn,bn,tn,J)}}}if(h){const un=fn.k,kn=Rp/un/hn/2,Tn=(tn,J)=>{P.fillStyle="#FAF6EE",P.strokeStyle="rgba(44,95,124,0.95)",P.lineWidth=1.4/un,P.fillRect((tn-kn)*hn,(J-kn)*hn,kn*2*hn,kn*2*hn),P.strokeRect((tn-kn)*hn,(J-kn)*hn,kn*2*hn,kn*2*hn)},Sn=Q.find(tn=>tn.id===h),$=ln.find(tn=>tn.id===h);if(P.setLineDash([6/un,4/un]),P.strokeStyle="rgba(44,95,124,0.95)",P.lineWidth=1.8/un,Sn){const tn=Sn.rot??0;P.save(),P.translate((Sn.x+Sn.w/2)*hn,(Sn.y+Sn.h/2)*hn),P.rotate(tn),P.strokeRect(-Sn.w/2*hn-2/un,-Sn.h/2*hn-2/un,Sn.w*hn+4/un,Sn.h*hn+4/un),P.restore(),P.setLineDash([]);const[J,T]=Ve(Sn,0,-Sn.h/2),[rn,yn]=Ve(Sn,0,-Sn.h/2-Op/un/hn);P.strokeStyle="rgba(44,95,124,0.7)",P.lineWidth=1.2/un,P.beginPath(),P.moveTo(J*hn,T*hn),P.lineTo(rn*hn,yn*hn),P.stroke(),P.beginPath(),P.arc(rn*hn,yn*hn,Rp/un/hn*.7*hn,0,Math.PI*2),P.fillStyle="#FAF6EE",P.fill(),P.strokeStyle="rgba(44,95,124,0.95)",P.lineWidth=1.4/un,P.stroke();for(const[bn,In]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const[sr,oe]=Ve(Sn,bn*Sn.w/2,In*Sn.h/2);Tn(sr,oe)}if(((dn=y.current)==null?void 0:dn.type)==="rotate"){const bn=Math.round((Sn.rot??0)*180/Math.PI);P.fillStyle="rgba(44,95,124,0.95)",P.font=`${12/un}px "JetBrains Mono", monospace`,P.textAlign="center",P.fillText(`${bn}°`,rn*hn,yn*hn-12/un)}}else $&&(P.beginPath(),P.arc($.x*hn,$.y*hn,$.r*hn+3/un,0,Math.PI*2),P.stroke(),P.setLineDash([]),Tn($.x+$.r,$.y));P.setLineDash([])}if(((un,kn,Tn)=>{P.save(),P.translate(un.x*hn,un.y*hn),P.beginPath(),P.arc(0,0,1.1*hn,0,Math.PI*2),P.fillStyle=kn,P.fill(),P.strokeStyle="#1A1814",P.lineWidth=1.2/fn.k,P.stroke(),P.fillStyle="#FAF6EE",P.font=`${1.2*hn}px Pretendard, sans-serif`,P.textAlign="center",P.textBaseline="middle",P.fillText(Tn,0,.08*hn),P.restore()})(cn,"#6B8E5A","▶"),c.current&&d.current){const[un,kn]=c.current,[Tn,Sn]=d.current;if(P.fillStyle="rgba(26,24,20,0.18)",P.strokeStyle="rgba(26,24,20,0.9)",P.lineWidth=1.6/fn.k,P.setLineDash([6/fn.k,4/fn.k]),r==="box"){const $=Math.min(un,Tn)*hn,tn=Math.min(kn,Sn)*hn,J=Math.abs(Tn-un)*hn,T=Math.abs(Sn-kn)*hn;P.fillRect($,tn,J,T),P.strokeRect($,tn,J,T)}else if(r==="pillar"||r==="hill"){const $=Math.max(r==="pillar"?1:3,Math.round(Math.hypot(Tn-un,Sn-kn)));P.beginPath(),P.arc(un*hn,kn*hn,$*hn,0,Math.PI*2),r==="hill"&&(P.fillStyle="rgba(160,124,62,0.18)"),P.fill(),P.stroke()}P.setLineDash([])}P.setTransform(1,0,0,1,0,0)},[n,h,r,e]),Y=N.useRef(I);Y.current=I;const H=N.useCallback(()=>{a.current||(a.current=requestAnimationFrame(()=>{a.current=0,Y.current()}))},[]);N.useEffect(()=>{H()},[I,H]),N.useEffect(()=>{f(null),c.current=null,d.current=null,m.current=null,y.current=null,v.current=null},[n.id]),N.useEffect(()=>{const j=i.current,w=o.current;if(!j||!w)return;const C=w.clientWidth,z=w.clientHeight,G=O*hn,P=Math.max(.05,Math.min(8,Math.min((C-Ap*2)/G,(z-Ap*2)/G))),fn=cl().scaleExtent([P*.5,8]).translateExtent([[-G*.25,-G*.25],[G*1.25,G*1.25]]).filter(en=>en.type==="wheel"?!0:en.type==="dblclick"?!1:l.current||en.button===1).on("zoom",en=>{s.current=en.transform,H()}),X=Or(j);return X.call(fn),X.call(fn.transform,fe.translate((C-G*P)/2,(z-G*P)/2).scale(P)),()=>{X.on(".zoom",null)}},[n.id,O]),N.useEffect(()=>{const j=C=>{const z=C.target.tagName;if(!(z==="INPUT"||z==="TEXTAREA")){if(C.code==="Space"){C.type==="keydown"?(l.current=!0,C.preventDefault()):l.current=!1,o.current&&(o.current.dataset.panning=String(l.current));return}C.type==="keydown"&&((C.key==="Delete"||C.key==="Backspace")&&h&&(p(n.id,[h]),f(null)),C.key==="Escape"&&h&&(C.stopPropagation(),f(null),H()))}};window.addEventListener("keydown",j,!0),window.addEventListener("keyup",j);const w=new ResizeObserver(()=>H());return o.current&&w.observe(o.current),()=>{window.removeEventListener("keydown",j,!0),window.removeEventListener("keyup",j),w.disconnect()}},[h,n.id,H]);const k=j=>{if(j.button!==0||l.current)return;const w=E(j);if(!w)return;const C=K(w);if(C){j.target.setPointerCapture(j.pointerId),y.current=C,v.current=null,H();return}if(Math.hypot(w[0]-n.start.x,w[1]-n.start.y)<=1.4){j.target.setPointerCapture(j.pointerId),m.current={what:{kind:"start"},sx:w[0],sy:w[1],dx:0,dy:0};return}const z=ST(w[0],w[1],n.discs),G=z??wT(w[0],w[1],n.boxes);if(G){f(G),j.target.setPointerCapture(j.pointerId),m.current={what:{kind:z?"disc":"box",id:G},sx:w[0],sy:w[1],dx:0,dy:0},H();return}if(f(null),r==="box"||r==="pillar"||r==="hill"){j.target.setPointerCapture(j.pointerId);const P=[Z(w[0]),Z(w[1])];c.current=P,d.current=P}H()},R=j=>{const w=E(j);if(!w)return;if(t){const z=n.boxes.length+n.discs.length;t(`(${w[0].toFixed(1)}, ${w[1].toFixed(1)}) · ${O}m × ${O}m · 질량 ${z}`+(z===0?" · 박스(B)를 흐름 위에 놓아보세요 — 흐름이 비켜 갑니다":""))}const C=y.current;if(C){if(C.type==="resize"){const z=Math.cos(C.rot),G=Math.sin(C.rot),P=w[0]-C.fx,fn=w[1]-C.fy,X=P*z+fn*G,en=-P*G+fn*z,Q=Math.max(1,Math.round(Math.abs(X))),ln=Math.max(1,Math.round(Math.abs(en))),[cn,wn]=Dp(C.rot,C.gx*Q/2,C.gy*ln/2),Nn=C.fx+cn,Fn=C.fy+wn;v.current={x:Nn-Q/2,y:Fn-ln/2,w:Q,h:ln}}else if(C.type==="rotate"){const z=Math.atan2(w[1]-C.cy,w[0]-C.cx)+Math.PI/2;v.current={rot:Math.round(z/Lp)*Lp}}else{const z=C.kind==="pillar"?1:3;v.current={r:Math.max(z,Math.round(Math.hypot(w[0]-C.cx,w[1]-C.cy)))}}H();return}m.current?(m.current.dx=Math.round(w[0]-m.current.sx),m.current.dy=Math.round(w[1]-m.current.sy)):c.current&&(d.current=[Z(w[0]),Z(w[1])]),H()},M=()=>{var C,z,G;const j=y.current;if(j){const P=v.current;y.current=null,v.current=null,P&&S(n.id,j.id,P),H();return}const w=m.current;if(w){m.current=null,(w.dx!==0||w.dy!==0)&&(((C=w.what)==null?void 0:C.kind)==="box"||((z=w.what)==null?void 0:z.kind)==="disc"?x(n.id,[w.what.id],w.dx,w.dy):((G=w.what)==null?void 0:G.kind)==="start"&&b(n.id,{start:{x:n.start.x+w.dx,y:n.start.y+w.dy}})),H();return}if(c.current&&d.current){const[P,fn]=c.current,[X,en]=d.current;if(c.current=null,d.current=null,r==="box"){const Q=Math.abs(X-P),ln=Math.abs(en-fn);if(Q>=1&&ln>=1){const cn=Pn("fb");A(n.id,{id:cn,x:Math.min(P,X),y:Math.min(fn,en),w:Q,h:ln,rot:0}),f(cn)}}else if(r==="pillar"||r==="hill"){const ln=Math.max(r==="pillar"?1:3,Math.round(Math.hypot(X-P,en-fn))),cn=Pn("fd");g(n.id,{id:cn,kind:r,x:P,y:fn,r:ln}),f(cn)}H()}};return u.jsx("div",{ref:o,className:"td-canvas-wrap","data-tool":r,children:u.jsx("canvas",{ref:i,className:"td-canvas","data-testid":"flow-canvas",onPointerDown:k,onPointerMove:R,onPointerUp:M,onContextMenu:j=>j.preventDefault()})})}const Qo=(n,r,e,t)=>({id:Pn("fb"),x:n,y:r,w:e,h:t}),Os=(n,r,e)=>({id:Pn("fd"),kind:"pillar",x:n,y:r,r:e}),Zp=(n,r,e)=>({id:Pn("fd"),kind:"hill",x:n,y:r,r:e}),Fp=[{id:"uniform",name:"균일 보이드",lesson:"어느 틈으로 가도 똑같다 — 차이 없는 선택은 무의미한 선택이다. 박스 하나를 옮겨 차이를 만들어 보세요.",seed:()=>({boxes:[40,56,72,88].flatMap(n=>[32,48,64,80].map(r=>Qo(n,r,4,4))),discs:[]})},{id:"alley",name:"골목",lesson:'두 질량 사이로 흐름이 모여 빠르고 곧게 흐른다 — "파이프 속의 물". 골목 폭을 좁혀 보세요.',seed:()=>({boxes:[Qo(46,22,38,32),Qo(46,74,38,32)],discs:[]})},{id:"turbulent",name:"난류 모서리",lesson:"벽 모서리와 기둥들이 흐름을 흩뜨려 머무름·은신의 공간을 만든다. 기둥을 더하거나 빼 보세요.",seed:()=>({boxes:[Qo(44,28,46,5),Qo(85,28,5,46)],discs:[Os(56,48,2),Os(68,42,2),Os(62,58,2),Os(76,54,2)]})},{id:"hill",name:"언덕",lesson:"언덕의 법선은 위·옆을 향한다(부분 각도) — 흐름이 막히지 않고 둘레로 비켜 흐른다. 벽(박스)과 비교해 보세요.",seed:()=>({boxes:[],discs:[Zp(56,46,10),Zp(82,80,12)]})}],$p=[{id:"select",label:"선택",key:"V",title:"선택 (V) — 빈 곳을 드래그해도 아무것도 만들지 않는 안전 모드. 질량 이동·크기·회전은 어느 도구에서나 가능"},{id:"box",label:"박스",key:"B",title:"박스 (B) — 빈 곳 드래그로 질량 배치. 기존 질량은 그냥 드래그하면 이동"},{id:"pillar",label:"기둥",key:"C",title:"기둥 (C) — 클릭·드래그로 반경. 단단한 원 — 난류·머무름 실습"},{id:"hill",label:"언덕",key:"H",title:"언덕 (H) — 클릭·드래그로 반경. 소프트 반발 — 부분 각도, 흐름이 둘레로 비켜간다"}];function bT(){const n=B(k=>k.exitFlow),r=xr(k=>k.docs),e=xr(k=>k.currentId),t=xr(k=>k.setActive),o=xr(k=>k.addDoc),i=xr(k=>k.removeDoc),s=xr(k=>k.renameDoc),[a,l]=N.useState("box"),[c,d]=N.useState(""),[h,f]=N.useState(null),[m,y]=N.useState(""),[v,A]=N.useState({past:0,future:0}),[g,p]=N.useState(!1),[x,S]=N.useState(!1),[b,O]=N.useState(1.5),[E,Z]=N.useState(.3),F={normals:g,pressure:x,lineGap:b,lineAlpha:E};N.useEffect(()=>{const k=xr.temporal,R=()=>{const j=k.getState();A({past:j.pastStates.length,future:j.futureStates.length})};R();const M=k.subscribe(R);return()=>M()},[]);const K=r,I=K.find(k=>k.id===e)??K[0]??null;if(N.useEffect(()=>{const k=R=>{const M=R.target.tagName;if(M==="INPUT"||M==="TEXTAREA"||R.ctrlKey||R.metaKey||R.altKey)return;const j=$p.find(w=>w.key===R.key.toUpperCase());j&&l(j.id)};return window.addEventListener("keydown",k),()=>window.removeEventListener("keydown",k)},[]),!I)return u.jsxs("div",{className:"td-shell td-shell-empty",children:[u.jsx("p",{children:"흐름 문서가 없습니다."}),u.jsx("button",{className:"td-btn",onClick:()=>o(),children:"+ 흐름 만들기"})]});const Y=()=>{h&&m.trim()&&s(h,m.trim()),f(null)},H=(k,R)=>{const M=K.find(w=>w.id===k),j=M?M.boxes.length+M.discs.length:0;j>0&&!window.confirm(`'${R}'에 질량 ${j}개가 있습니다. 삭제할까요?`)||i(k)};return u.jsxs("div",{className:"td-shell","data-testid":"flow-shell",children:[u.jsxs("div",{className:"td-bar",children:[u.jsx("button",{className:"td-btn td-back",onClick:n,title:"버블 다이어그램으로 (Esc)",children:"← 버블"}),u.jsxs("div",{className:"td-tabs",role:"tablist",children:[K.map(k=>u.jsx("div",{role:"tab","aria-selected":k.id===I.id,className:`td-tab ${k.id===I.id?"is-active":""}`,onClick:()=>t(k.id),onDoubleClick:()=>{f(k.id),y(k.name)},title:"더블클릭: 이름 바꾸기",children:h===k.id?u.jsx("input",{autoFocus:!0,value:m,onChange:R=>y(R.target.value),onBlur:Y,onKeyDown:R=>{R.key==="Enter"&&Y(),R.key==="Escape"&&f(null)}}):u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"td-tab-name",children:k.name}),K.length>1&&u.jsx("button",{className:"td-tab-close",onClick:R=>{R.stopPropagation(),H(k.id,k.name)},title:"삭제",children:"×"})]})},k.id)),u.jsx("button",{className:"td-btn td-tab-add",onClick:()=>o(),title:"흐름 추가",children:"＋"})]}),u.jsx("div",{className:"td-spacer"}),u.jsx("div",{className:"td-group",role:"toolbar","aria-label":"도구",children:$p.map(k=>u.jsx("button",{className:`td-btn td-tool ${a===k.id?"is-active":""}`,onClick:()=>l(k.id),title:k.title,children:k.label},k.id))}),u.jsxs("div",{className:"td-group",children:[u.jsx("button",{className:"td-btn td-undo",onClick:()=>Ty(),disabled:v.past===0,title:`되돌리기 (Ctrl+Z) · ${v.past}`,children:"↶"}),u.jsx("button",{className:"td-btn td-redo",onClick:()=>Iy(),disabled:v.future===0,title:`다시 실행 (Ctrl+Shift+Z / Ctrl+Y) · ${v.future}`,children:"↷"})]})]}),u.jsxs("div",{className:"td-bar td-bar-sub",children:[u.jsxs("div",{className:"td-group","aria-label":"시각화",children:[u.jsx("button",{className:`td-btn td-zone-danger ${g?"is-active":""}`,"data-testid":"fl-normals",onClick:()=>p(k=>!k),title:"법선 화살표 — 질량 표면에서 수직으로 밀어내는 힘 (강의 normals 도해)",children:"법선"}),u.jsx("button",{className:`td-btn td-overlay ${x?"is-active":""}`,"data-testid":"fl-pressure",onClick:()=>S(k=>!k),title:"압력 그라디언트 — 질량 주변의 파란 농도, 가까울수록 강한 push (강의 magnetic lines 도해)",children:"압력"})]}),u.jsxs("div",{className:"td-group","aria-label":"유선",children:[u.jsx("span",{className:"td-bar-label",children:"간격"}),u.jsx("input",{type:"range",className:"td-overlay-range",min:.75,max:4,step:.25,value:b,onChange:k=>O(Number(k.target.value)),title:`유선 간격 ${b}m`}),u.jsx("span",{className:"td-bar-label",children:"진하기"}),u.jsx("input",{type:"range",className:"td-overlay-range",min:.1,max:.6,step:.05,value:E,onChange:k=>Z(Number(k.target.value)),title:`유선 진하기 ${Math.round(E*100)}%`})]}),u.jsx("div",{className:"td-group","aria-label":"학습 프리셋",children:u.jsxs("select",{className:"td-select",value:"","data-testid":"fl-preset",onChange:k=>{const R=Fp.find(M=>M.id===k.target.value);R&&(o(R.name,R.seed()),l("select"))},title:"학습 프리셋 — week2-02 강의 장면 4종을 새 탭으로",children:[u.jsx("option",{value:"",children:"학습 프리셋…"}),Fp.map(k=>u.jsx("option",{value:k.id,title:k.lesson,children:k.name},k.id))]})}),u.jsx("div",{className:"td-spacer"})]}),u.jsx(_T,{doc:I,tool:a,view:F,onStatus:d}),u.jsxs("div",{className:"td-status",children:[u.jsx("span",{className:"td-status-doc",children:I.name}),u.jsxs("span",{children:[I.grid,"×",I.grid,"m · 질량 ",I.boxes.length+I.discs.length]}),u.jsx("span",{className:"td-status-hover",children:c}),u.jsx("span",{className:"td-status-hint",children:"질량 드래그: 이동 · 모서리 핸들: 크기 · 손잡이: 회전(15° 스냅) · 빈 곳 드래그: 생성 · 휠: 줌 · 스페이스: 패닝"})]})]})}const Ey="bubble-atelier::pacing",My=1;function CT(){try{const n=localStorage.getItem(Ey);if(!n)return null;const r=JSON.parse(n);if(r.v!==My||!Array.isArray(r.docs)||r.docs.length===0)return null;const e=r.docs.map(o=>({id:o.id,name:o.name,updatedAt:o.updatedAt??Date.now(),segments:Array.isArray(o.segments)?o.segments:[],points:Array.isArray(o.points)?o.points:[],markers:Array.isArray(o.markers)?o.markers:[]})),t=e.some(o=>o.id===r.currentId)?r.currentId:e[0].id;return{docs:e,currentId:t}}catch{return null}}const or=tl()(ol((n,r)=>{const t=CT()??(()=>{const i=Ql(Pn("pc"));return{docs:[i],currentId:i.id}})(),o=(i,s)=>n(a=>({docs:a.docs.map(l=>l.id===i?s(l):l)}));return{...t,setActive:i=>{r().docs.some(s=>s.id===i)&&n({currentId:i})},addDoc:(i,s)=>{const a={...Ql(Pn("pc"),i??`페이싱 ${r().docs.length+1}`),...s};return n(l=>({docs:[...l.docs,a],currentId:a.id})),a.id},removeDoc:i=>n(s=>{const a=s.docs.filter(l=>l.id!==i);if(a.length===0){const l=Ql(Pn("pc"));return{docs:[l],currentId:l.id}}return{docs:a,currentId:s.currentId===i?a[0].id:s.currentId}}),renameDoc:(i,s)=>o(i,a=>({...a,name:s})),addSegment:i=>{const s=Pn("pc-s");return o(i,a=>({...a,segments:[...a.segments,{id:s,name:`구간 ${a.segments.length+1}`,width:1}]})),s},renameSegment:(i,s,a)=>o(i,l=>({...l,segments:l.segments.map(c=>c.id===s?{...c,name:a}:c)})),setSegmentWidth:(i,s,a)=>o(i,l=>({...l,segments:l.segments.map(c=>c.id===s?{...c,width:Math.max(.25,a)}:c)})),removeSegment:(i,s)=>o(i,a=>a.segments.length<=1?a:{...a,segments:a.segments.filter(l=>l.id!==s),points:a.points.filter(l=>l.segId!==s)}),addPoint:(i,s)=>o(i,a=>({...a,points:[...a.points,s]})),movePoint:(i,s,a,l,c)=>o(i,d=>({...d,points:d.points.map(h=>h.id===s?{...h,segId:a,t:zp(l),tension:Bp(c)}:h)})),removePoint:(i,s)=>o(i,a=>({...a,points:a.points.filter(l=>l.id!==s)})),addMarker:(i,s)=>o(i,a=>({...a,markers:[...a.markers,s]})),moveMarker:(i,s,a,l)=>o(i,c=>({...c,markers:c.markers.map(d=>d.id===s?{...d,at:zp(a),tension:Bp(l)}:d)})),removeMarker:(i,s)=>o(i,a=>({...a,markers:a.markers.filter(l=>l.id!==s)}))}},{partialize:n=>({docs:n.docs,currentId:n.currentId}),limit:80,equality:(n,r)=>n.docs===r.docs})),zp=n=>Math.max(0,Math.min(1,n)),Bp=n=>Math.max(0,Math.min(100,n));let mc;or.subscribe(n=>{mc&&window.clearTimeout(mc),mc=window.setTimeout(()=>{try{localStorage.setItem(Ey,JSON.stringify({v:My,docs:n.docs,currentId:n.currentId}))}catch(r){console.warn("페이싱 저장 실패",r)}},400)});const Ny=()=>or.temporal.getState().undo(),jy=()=>or.temporal.getState().redo();function hl(n){const r=n.reduce((t,o)=>t+Math.max(.25,o.width),0)||1;let e=0;return n.map(t=>{const o=Math.max(.25,t.width)/r,i={id:t.id,x0:e,x1:e+o};return e+=o,i})}function Ay(n,r,e){const t=hl(e).find(o=>o.id===n);return t?t.x0+(t.x1-t.x0)*Math.max(0,Math.min(1,r)):0}function fl(n){return n.points.map(r=>({x:Ay(r.segId,r.t,n.segments),tension:r.tension})).sort((r,e)=>r.x-e.x)}function pl(n){const r=n.length;if(r===0)return()=>50;if(r===1)return()=>n[0].tension;const e=n.map(a=>a.x),t=n.map(a=>a.tension),o=[],i=[];for(let a=0;a<r-1;a++)o[a]=e[a+1]-e[a]||1e-6,i[a]=(t[a+1]-t[a])/o[a];const s=[i[0]];for(let a=1;a<r-1;a++)if(i[a-1]*i[a]<=0)s[a]=0;else{const l=2*o[a]+o[a-1],c=o[a]+2*o[a-1];s[a]=(l+c)/(l/i[a-1]+c/i[a])}return s[r-1]=i[r-2],a=>{if(a<=e[0])return t[0];if(a>=e[r-1])return t[r-1];let l=0;for(;a>e[l+1];)l++;const c=o[l],d=(a-e[l])/c,h=d*d,f=h*d,m=2*f-3*h+1,y=f-2*h+d,v=-2*f+3*h,A=f-h;return m*t[l]+y*c*s[l]+v*t[l+1]+A*c*s[l+1]}}function PT(n,r,e,t){const o=pl(fl(n)),i=c=>t+c*(r-2*t),s=c=>e-t-c/100*(e-2*t),a=120;let l="";for(let c=0;c<=a;c++){const d=c/a;l+=(c===0?"M":"L")+i(d).toFixed(1)+","+s(o(d)).toFixed(1)+" "}return l.trim()}function TT(n){return n<=33?{band:"아늑",items:["아늑한 폭","질서 있는 배치","둥근 형태","볕"]}:n<=66?{band:"상승",items:["폭 좁힘","천장 낮춤","뾰족한 형태"]}:{band:"간극",items:["기대 장치","그걸 끊는 장치(세트)"]}}const Hp=["var(--blueprint)","var(--ochre)","var(--blueprint-deep)","var(--ochre-deep)","var(--ink-500)","var(--blueprint-soft)","var(--ochre-soft)"];function IT(n,r){const e=n.segments.findIndex(t=>t.id===r);return Hp[(e<0?0:e)%Hp.length]}const tt={W:900,H:460,pad:44};function gc(n,r){const e=r.createSVGPoint();e.x=n.clientX,e.y=n.clientY;const t=e.matrixTransform(r.getScreenCTM().inverse());return{x:t.x,y:t.y}}const yc=n=>(n-tt.pad)/(tt.W-2*tt.pad),ET=n=>(tt.H-tt.pad-n)/(tt.H-2*tt.pad)*100;function Wp(n,r){const e=hl(r),t=Math.max(0,Math.min(1,n)),o=e.find(a=>t>=a.x0&&t<a.x1)??e[e.length-1],i=o.x1-o.x0||1e-6,s=Math.max(0,Math.min(1,(t-o.x0)/i));return{segId:o.id,t:s}}function Gp(n,r){return pl(fl(n))(Math.max(0,Math.min(1,r)))}function MT(n,r){const e=pl(fl(n)),t=Math.max(0,Math.min(1,r)),o=.02,i=e(t),s=e(Math.max(0,t-o)),a=e(Math.min(1,t+o));return i>=(s+a)/2?1:-1}const NT=24,jT=[0,50,100];function AT({doc:n,tool:r,selSeg:e,onSelectSeg:t,onStatus:o}){const{W:i,H:s,pad:a}=tt,l=or(R=>R.addPoint),c=or(R=>R.movePoint),d=or(R=>R.removePoint),h=or(R=>R.addMarker),f=or(R=>R.moveMarker),m=or(R=>R.removeMarker),y=N.useRef(null),v=N.useRef(null),A=N.useRef(null),g=N.useMemo(()=>hl(n.segments),[n.segments]),p=N.useMemo(()=>PT(n,i,s,a),[n,i,s,a]),x=R=>a+R*(i-2*a),S=R=>s-a-R/100*(s-2*a),b=(R,M)=>{const{x:j,y:w}=gc(M,R),C=Math.max(0,Math.min(1,yc(j))),z=Math.max(0,Math.min(100,ET(w)));return{progress:C,tension:z}},O=R=>{const M=y.current;if(M){if(r==="point"){const{progress:j,tension:w}=b(M,R),{segId:C,t:z}=Wp(j,n.segments);l(n.id,{id:Pn("pc-p"),segId:C,t:z,tension:w}),o("점 추가");return}if(r==="peakvalley"||r==="gap"||r==="flag"){const{x:j,y:w}=gc(R,M),C=Math.max(0,Math.min(1,yc(j))),z=Gp(n,C);if(r==="peakvalley"){const P=S(z);if(Math.abs(w-P)>NT)return;const fn=MT(n,C)===1?"peak":"valley";h(n.id,{id:Pn("pc-m"),kind:fn,at:C,tension:z}),o(fn==="peak"?"산 표기 추가":"골 표기 추가");return}const G=r==="gap"?"gap":"flag";h(n.id,{id:Pn("pc-m"),kind:G,at:C,tension:z}),o(G==="gap"?"번개 표기 추가":"깃발 표기 추가")}}},E=R=>{const M=y.current;if(M){if(v.current){const{progress:j,tension:w}=b(M,R),{segId:C,t:z}=Wp(j,n.segments);c(n.id,v.current,C,z,w);return}if(A.current){const{x:j}=gc(R,M),w=Math.max(0,Math.min(1,yc(j))),C=Gp(n,w);f(n.id,A.current,w,C)}}},Z=R=>{if(!v.current&&!A.current)return;v.current=null,A.current=null;const M=y.current;M&&M.hasPointerCapture(R.pointerId)&&M.releasePointerCapture(R.pointerId)},F=R=>M=>{if(M.stopPropagation(),M.altKey){d(n.id,R),o("점 삭제");return}const j=y.current;j&&(v.current=R,j.setPointerCapture(M.pointerId))},K=R=>M=>{M.preventDefault(),M.stopPropagation(),d(n.id,R),o("점 삭제")},I=R=>M=>{if(M.stopPropagation(),M.altKey){m(n.id,R),o("표기 삭제");return}const j=y.current;j&&(A.current=R,j.setPointerCapture(M.pointerId))},Y=R=>M=>{M.preventDefault(),M.stopPropagation(),m(n.id,R),o("표기 삭제")},H=(R,M,j)=>{switch(R){case"peak":{const C=j-6,z=C-14;return u.jsx("polygon",{points:`${M-9},${C} ${M+9},${C} ${M},${z}`,fill:"var(--ochre)",stroke:"var(--ochre-deep)",strokeWidth:1})}case"valley":{const C=j+6,z=C+14;return u.jsx("polygon",{points:`${M-9},${C} ${M+9},${C} ${M},${z}`,fill:"var(--ink-500)",stroke:"var(--ink-700)",strokeWidth:1})}case"gap":{const C=j-6-14,z=j-6,G=C+(z-C)*.33,P=C+(z-C)*.66;return u.jsx("polyline",{points:`${M-4},${C} ${M+4},${G} ${M-4},${P} ${M+4},${z}`,fill:"none",stroke:"var(--ochre)",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round"})}case"flag":{const C=j-6-26;return u.jsxs("g",{children:[u.jsx("line",{x1:M,y1:j,x2:M,y2:C,stroke:"var(--ink-700)",strokeWidth:3.5,strokeLinecap:"round"}),u.jsx("line",{x1:M,y1:j,x2:M,y2:C,stroke:"var(--paper-50)",strokeWidth:1.5,strokeLinecap:"round"}),u.jsx("polygon",{points:`${M},${C} ${M+13},${C+5} ${M},${C+10}`,fill:"var(--ochre)",stroke:"var(--ochre-deep)",strokeWidth:1})]})}default:return null}},k=(R,M,j)=>{switch(R){case"peak":case"gap":return{x:M,y:j-13,r:20};case"valley":return{x:M,y:j+13,r:20};case"flag":return{x:M+3,y:j-16,r:24};default:return{x:M,y:j,r:20}}};return u.jsx("div",{className:"pac-canvas",children:u.jsxs("svg",{ref:y,viewBox:`0 0 ${i} ${s}`,preserveAspectRatio:"xMidYMid meet",className:"pac-svg","data-testid":"pacing-canvas",onPointerDown:O,onPointerMove:E,onPointerUp:Z,onPointerCancel:Z,children:[u.jsxs("defs",{children:[u.jsx("pattern",{id:"pac-grid-soft",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:u.jsx("path",{d:"M 20 0 L 0 0 0 20",fill:"none",stroke:"var(--grid-line-soft)",strokeWidth:1})}),u.jsx("pattern",{id:"pac-grid-hard",width:"100",height:"100",patternUnits:"userSpaceOnUse",children:u.jsx("path",{d:"M 100 0 L 0 0 0 100",fill:"none",stroke:"var(--grid-line-hard)",strokeWidth:1})})]}),u.jsx("rect",{x:0,y:0,width:i,height:s,fill:"var(--paper-100)"}),u.jsx("rect",{x:0,y:0,width:i,height:s,fill:"url(#pac-grid-soft)"}),u.jsx("rect",{x:0,y:0,width:i,height:s,fill:"url(#pac-grid-hard)"}),jT.map(R=>{const M=S(R);return u.jsxs("g",{children:[u.jsx("line",{x1:a,y1:M,x2:i-a,y2:M,stroke:"var(--grid-line-hard)",strokeWidth:1,strokeDasharray:R===0||R===100?void 0:"3 3"}),u.jsx("text",{x:a-8,y:M+3,textAnchor:"end",className:"pac-tick-label",children:R})]},`tick-${R}`)}),g.map((R,M)=>{const j=x(R.x0),w=x(R.x1),C=n.segments[M],z=!!C&&C.id===e;return u.jsxs("g",{children:[M>0&&u.jsx("line",{x1:j,y1:a,x2:j,y2:s-a,stroke:"var(--blueprint)",strokeOpacity:.5,strokeWidth:1,strokeDasharray:"4 3"}),u.jsx("text",{x:(j+w)/2,y:s-a+18,textAnchor:"middle",className:`pac-seg-label${z?" is-active":""}`,style:{cursor:t?"pointer":"default"},onClick:()=>{C&&(t==null||t(C.id))},children:(C==null?void 0:C.name)??""})]},R.id)}),u.jsx("path",{d:p,stroke:"var(--ochre)",fill:"none",strokeWidth:2.5}),n.markers.map(R=>{const M=x(R.at),j=S(R.tension),w=k(R.kind,M,j);return u.jsxs("g",{className:`pac-marker pac-marker--${R.kind}`,onPointerDown:I(R.id),onContextMenu:Y(R.id),style:{cursor:"grab",touchAction:"none"},children:[u.jsx("circle",{cx:w.x,cy:w.y,r:w.r,fill:"transparent"}),u.jsx("circle",{cx:M,cy:j,r:3,fill:R.kind==="valley"?"var(--ink-500)":"var(--ochre)",stroke:"var(--paper-50)",strokeWidth:1}),H(R.kind,M,j)]},R.id)}),n.points.map(R=>{const M=Ay(R.segId,R.t,n.segments),j=x(M),w=S(R.tension);return u.jsxs("g",{className:"pac-point",onPointerDown:F(R.id),onContextMenu:K(R.id),style:{cursor:"grab",touchAction:"none"},children:[u.jsx("circle",{cx:j,cy:w,r:20,fill:"transparent"}),u.jsx("circle",{cx:j,cy:w,r:6,fill:"var(--paper-50)",stroke:"var(--ochre)",strokeWidth:2})]},R.id)})]})})}const OT={아늑:"var(--ink-500)",상승:"var(--blueprint)",간극:"var(--ochre-deep)"},Vp={display:"flex",flexDirection:"column",gap:"2px",fontFamily:"var(--font-body)",fontSize:"var(--fs-xs)",color:"var(--ink-500)"},Up={padding:"4px 8px",border:"1px solid var(--ink-300)",borderRadius:"var(--r-sm)",fontFamily:"var(--font-body)",fontSize:"var(--fs-sm)",color:"var(--ink-700)",background:"var(--paper-50)"},Kp={borderTop:"var(--line-thin)",paddingBottom:"var(--sp-1)"};function RT({doc:n,selectedSegId:r,onSelectSeg:e}){const t=or(p=>p.renameSegment),o=or(p=>p.setSegmentWidth),i=or(p=>p.removeSegment),s=r?n.segments.find(p=>p.id===r)??null:null,[a,l]=N.useState((s==null?void 0:s.name)??"");N.useEffect(()=>{l((s==null?void 0:s.name)??"")},[s==null?void 0:s.id,s==null?void 0:s.name]);const c=u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"pac-side-title",children:"구간 — 클릭해 선택"}),u.jsx("ul",{className:"pac-seg-list","data-testid":"pac-seg-list",children:n.segments.map(p=>u.jsxs("li",{className:`pac-seg-item${p.id===r?" is-active":""}`,onClick:()=>e(p.id),children:[u.jsx("span",{className:"pac-seg-swatch",style:{background:IT(n,p.id)}}),p.name]},p.id))})]});if(!s)return u.jsxs("div",{className:"pac-side",children:[c,u.jsx("p",{className:"pac-side-hint",children:"구간을 클릭해 선택하면 권장 공간 유형과 편집 항목이 열립니다."})]});const d=hl(n.segments).find(p=>p.id===s.id),h=d?(d.x0+d.x1)/2:0,f=pl(fl(n))(h),{band:m,items:y}=TT(f),v=OT[m],A=n.segments.length>1,g=()=>{const p=a.trim();p&&p!==s.name?t(n.id,s.id,p):l(s.name)};return u.jsxs("div",{className:"pac-side",children:[c,u.jsxs("div",{style:Kp,children:[u.jsxs("div",{className:"pac-side-title",style:{display:"flex",alignItems:"baseline",gap:"var(--sp-2)"},children:[u.jsxs("span",{children:["유형 힌트 — ",s.name]}),u.jsx("span",{style:{fontWeight:400,color:"var(--ink-400)",fontSize:"var(--fs-2xs, 10px)"},children:"읽기 전용"})]}),u.jsxs("p",{className:"pac-side-hint",style:{display:"flex",alignItems:"center",gap:"var(--sp-2)"},children:[u.jsxs("span",{children:["대표 긴장도 ",Math.round(f)]}),u.jsx("span",{style:{padding:"1px 8px",borderRadius:"var(--r-sm)",border:`1px solid ${v}`,color:v,fontWeight:600},children:m})]}),u.jsx("ul",{style:{listStyle:"none",margin:0,padding:"var(--sp-1) var(--sp-3)",display:"flex",flexWrap:"wrap",gap:"4px"},children:y.map(p=>u.jsx("li",{style:{padding:"2px 8px",borderRadius:"var(--r-sm)",background:"var(--paper-200)",color:"var(--ink-600)",fontSize:"var(--fs-xs)",cursor:"default"},children:p},p))}),u.jsx("p",{className:"pac-side-hint",style:{paddingTop:0,fontStyle:"italic",color:"var(--ink-400)"},children:"곡선 높이에 따라 자동 계산되는 가이드 — 직접 수정하는 항목이 아닙니다."})]}),u.jsxs("div",{style:Kp,children:[u.jsx("div",{className:"pac-side-title",children:"구간 편집"}),u.jsxs("div",{style:{padding:"var(--sp-1) var(--sp-3) var(--sp-3)",display:"flex",flexDirection:"column",gap:"var(--sp-2)"},children:[u.jsxs("label",{style:Vp,children:["구간 이름",u.jsx("input",{"data-testid":"pac-seg-name",value:a,onChange:p=>l(p.target.value),onBlur:g,onKeyDown:p=>{p.key==="Enter"&&(g(),p.target.blur()),p.key==="Escape"&&l(s.name)},style:Up})]}),u.jsxs("label",{style:Vp,children:["체류 비중",u.jsx("input",{"data-testid":"pac-seg-width",type:"number",min:.25,step:.25,value:s.width,onChange:p=>{const x=parseFloat(p.target.value);Number.isNaN(x)||o(n.id,s.id,x)},style:Up})]}),u.jsx("button",{className:"td-btn","data-testid":"pac-seg-remove",onClick:()=>i(n.id,s.id),disabled:!A,title:A?"이 구간을 삭제합니다":"마지막 구간은 삭제할 수 없습니다",style:{alignSelf:"flex-start",color:"var(--ochre-deep)",borderColor:"var(--ochre-deep)"},children:"구간 삭제"})]})]})]})}const LT=[{id:"jg-seg-start",name:"시작 지점",width:1},{id:"jg-seg-ground",name:"지상 섬",width:1},{id:"jg-seg-sky",name:"공중 섬",width:.8}],DT=[{id:"jg-p01",segId:"jg-seg-start",t:.05,tension:20},{id:"jg-p02",segId:"jg-seg-start",t:.18,tension:25},{id:"jg-p03",segId:"jg-seg-start",t:.31,tension:30},{id:"jg-p04",segId:"jg-seg-start",t:.44,tension:35},{id:"jg-p05",segId:"jg-seg-start",t:.57,tension:45},{id:"jg-p06",segId:"jg-seg-start",t:.7,tension:50},{id:"jg-p07",segId:"jg-seg-start",t:.83,tension:60},{id:"jg-p08",segId:"jg-seg-start",t:.95,tension:35},{id:"jg-p09",segId:"jg-seg-ground",t:.05,tension:40},{id:"jg-p10",segId:"jg-seg-ground",t:.18,tension:45},{id:"jg-p11",segId:"jg-seg-ground",t:.31,tension:55},{id:"jg-p12",segId:"jg-seg-ground",t:.44,tension:60},{id:"jg-p13",segId:"jg-seg-ground",t:.57,tension:65},{id:"jg-p14",segId:"jg-seg-ground",t:.7,tension:55},{id:"jg-p15",segId:"jg-seg-ground",t:.83,tension:60},{id:"jg-p16",segId:"jg-seg-ground",t:.95,tension:40},{id:"jg-p17",segId:"jg-seg-sky",t:.05,tension:55},{id:"jg-p18",segId:"jg-seg-sky",t:.2,tension:60},{id:"jg-p19",segId:"jg-seg-sky",t:.35,tension:55},{id:"jg-p20",segId:"jg-seg-sky",t:.5,tension:70},{id:"jg-p21",segId:"jg-seg-sky",t:.65,tension:80},{id:"jg-p22",segId:"jg-seg-sky",t:.82,tension:85},{id:"jg-p23",segId:"jg-seg-sky",t:.97,tension:30}],ZT=[{id:"jg-m-peak1",kind:"peak",at:.2964,tension:60},{id:"jg-m-valley1",kind:"valley",at:.3393,tension:35},{id:"jg-m-peak2",kind:"peak",at:.5607,tension:65},{id:"jg-m-valley2",kind:"valley",at:.6964,tension:40},{id:"jg-m-gap",kind:"gap",at:.8571,tension:70},{id:"jg-m-peak3",kind:"peak",at:.9486,tension:85},{id:"jg-m-flag",kind:"flag",at:.9914,tension:30}],Xp=[{id:"joryeonggwan",name:"조령관 예시 곡선",lesson:"시작 지점(성을 보고 거절당한 뒤 물에 잠기는 지붕을 건넘) → 지상 섬(끊긴 성벽·잠긴 문을 우회) → 공중 섬(바람길을 타고 끊긴 간극을 넘어 성에 도착). 동사 넷으로 22비트를 만든 곡선 — 산·골이 두 번 교차한 뒤 마지막에 최고점과 해소가 옵니다.",seed:()=>({segments:LT.map(n=>({...n})),points:DT.map(n=>({...n})),markers:ZT.map(n=>({...n}))})}],Yp=[{id:"select",label:"선택",key:"V",title:"선택 (V) — 점 이동·삭제는 도구와 무관하게 항상 가능"},{id:"point",label:"점",key:"P",title:"점 (P) — 빈 곳 클릭으로 곡선 위에 점 추가"},{id:"peakvalley",label:"산골",key:"M",title:"산/골 (M) — 정점·저점 마커"},{id:"gap",label:"번개",key:"G",title:"번개 (G) — 급전개·단절 지점 마커"},{id:"flag",label:"깃발",key:"F",title:"깃발 (F) — 이정표 마커"}];function FT(){const n=B(H=>H.exitPacing),r=or(H=>H.docs),e=or(H=>H.currentId),t=or(H=>H.setActive),o=or(H=>H.addDoc),i=or(H=>H.removeDoc),s=or(H=>H.renameDoc),a=or(H=>H.addSegment),[l,c]=N.useState("select"),[d,h]=N.useState(""),[f,m]=N.useState(null),[y,v]=N.useState(""),[A,g]=N.useState({past:0,future:0}),[p,x]=N.useState(null),S=N.useRef(null),[b,O]=N.useState(!1);N.useEffect(()=>{const H=or.temporal,k=()=>{const M=H.getState();g({past:M.pastStates.length,future:M.futureStates.length})};k();const R=H.subscribe(k);return()=>R()},[]);const E=r,Z=E.find(H=>H.id===e)??E[0]??null;if(N.useEffect(()=>{const H=k=>{const R=k.target.tagName;if(R==="INPUT"||R==="TEXTAREA"||k.ctrlKey||k.metaKey||k.altKey)return;const M=Yp.find(j=>j.key===k.key.toUpperCase());M&&c(M.id)};return window.addEventListener("keydown",H),()=>window.removeEventListener("keydown",H)},[]),N.useEffect(()=>{var H;Z&&(Z.segments.some(k=>k.id===p)||x(((H=Z.segments[0])==null?void 0:H.id)??null))},[Z==null?void 0:Z.id,Z==null?void 0:Z.segments,p]),!Z)return u.jsxs("div",{className:"td-shell td-shell-empty",children:[u.jsx("p",{children:"페이싱 문서가 없습니다."}),u.jsx("button",{className:"td-btn",onClick:()=>o(),children:"+ 페이싱 만들기"})]});const F=()=>{f&&y.trim()&&s(f,y.trim()),m(null)},K=(H,k)=>{const R=E.find(j=>j.id===H),M=R?R.points.length+R.markers.length:0;M>0&&!window.confirm(`'${k}'에 점·표기 ${M}개가 있습니다. 삭제할까요?`)||i(H)},I=async()=>{var H;if(S.current){O(!0);try{const k=(H=getComputedStyle(document.body).getPropertyValue("--paper-100"))==null?void 0:H.trim(),R=await Nu(S.current,{pixelRatio:2,backgroundColor:k||"#fff"}),M=document.createElement("a");M.href=R,M.download=`pacing-${Z.name}.png`,M.click(),h("PNG 저장 완료")}catch(k){h(`PNG 내보내기 실패: ${k.message??k}`)}finally{O(!1)}}},Y=()=>{il(Z,`${Z.name}.json`),h("JSON 저장 완료")};return u.jsxs("div",{className:"td-shell","data-testid":"pacing-shell",children:[u.jsxs("div",{className:"td-bar",children:[u.jsx("button",{className:"td-btn td-back",onClick:n,title:"버블 다이어그램으로 (Esc)",children:"← 버블"}),u.jsxs("div",{className:"td-tabs",role:"tablist",children:[E.map(H=>u.jsx("div",{role:"tab","aria-selected":H.id===Z.id,className:`td-tab ${H.id===Z.id?"is-active":""}`,onClick:()=>t(H.id),onDoubleClick:()=>{m(H.id),v(H.name)},title:"더블클릭: 이름 바꾸기",children:f===H.id?u.jsx("input",{autoFocus:!0,value:y,onChange:k=>v(k.target.value),onBlur:F,onKeyDown:k=>{k.key==="Enter"&&F(),k.key==="Escape"&&m(null)}}):u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"td-tab-name",children:H.name}),E.length>1&&u.jsx("button",{className:"td-tab-close",onClick:k=>{k.stopPropagation(),K(H.id,H.name)},title:"삭제",children:"×"})]})},H.id)),u.jsx("button",{className:"td-btn td-tab-add",onClick:()=>o(),title:"페이싱 추가",children:"＋"})]}),u.jsx("div",{className:"td-spacer"}),u.jsxs("div",{className:"td-group",role:"toolbar","aria-label":"도구",children:[Yp.map(H=>u.jsx("button",{className:`td-btn td-tool ${l===H.id?"is-active":""}`,onClick:()=>c(H.id),title:H.title,children:H.label},H.id)),u.jsx("button",{className:"td-btn",onClick:()=>x(a(Z.id)),title:"구간 추가 — 곡선 가로축에 새 구간을 덧붙이고 바로 선택(오른쪽에서 편집)",children:"구간+"})]}),u.jsxs("div",{className:"td-group",children:[u.jsx("button",{className:"td-btn td-undo",onClick:()=>Ny(),disabled:A.past===0,title:`되돌리기 (Ctrl+Z) · ${A.past}`,children:"↶"}),u.jsx("button",{className:"td-btn td-redo",onClick:()=>jy(),disabled:A.future===0,title:`다시 실행 (Ctrl+Shift+Z / Ctrl+Y) · ${A.future}`,children:"↷"})]})]}),u.jsxs("div",{className:"td-bar td-bar-sub",children:[u.jsx("div",{className:"td-spacer"}),u.jsx("div",{className:"td-group","aria-label":"학습 프리셋",children:u.jsxs("select",{className:"td-select",value:"","data-testid":"pac-preset",onChange:H=>{const k=Xp.find(R=>R.id===H.target.value);k&&(o(k.name,k.seed()),c("select"))},title:"학습 프리셋 — 50·51강 장면을 새 탭으로",children:[u.jsx("option",{value:"",children:"학습 프리셋…"}),Xp.map(H=>u.jsx("option",{value:H.id,title:H.lesson,children:H.name},H.id))]})}),u.jsxs("div",{className:"td-group","aria-label":"내보내기",children:[u.jsx("button",{className:"td-btn",onClick:I,disabled:b,title:"PNG 내보내기 — 긴장 곡선만 이미지 한 장으로 저장 (과제 제출용)",children:b?"저장 중…":"PNG 내보내기"}),u.jsx("button",{className:"td-btn",onClick:Y,title:"JSON 내보내기 — 현재 페이싱 문서 원본 저장 (백업·공유용)",children:"JSON 내보내기"})]})]}),u.jsx("div",{className:"pac-body",children:u.jsxs("div",{className:"pac-main",children:[u.jsx("div",{className:"pac-export",ref:S,children:u.jsx(AT,{doc:Z,tool:l,selSeg:p,onSelectSeg:x,onStatus:h})}),u.jsx(RT,{doc:Z,selectedSegId:p,onSelectSeg:x})]})}),u.jsxs("div",{className:"td-status",children:[u.jsx("span",{className:"td-status-doc",children:Z.name}),u.jsxs("span",{children:["구간 ",Z.segments.length," · 점 ",Z.points.length," · 표기 ",Z.markers.length]}),u.jsx("span",{className:"td-status-hover",children:d}),u.jsx("span",{className:"td-status-hint",children:"점 도구: 빈 곳 클릭해 추가 · 점 드래그: 이동 · Alt+클릭/우클릭: 삭제 · 구간+: 가로축 구간 추가"})]})]})}function $T(){const n=B(l=>l.project.ai),r=B(l=>l.mode),e=localStorage.getItem("bubble-atelier::onboarded"),[t,o]=N.useState(!1),[i,s]=N.useState(!1);N.useEffect(()=>(window.__openLibrary=()=>o(!0),()=>{window.__openLibrary=void 0}),[]),N.useEffect(()=>{const l=c=>{const d=B.getState(),h=c.target.tagName,f=h==="INPUT"||h==="TEXTAREA",m=c.ctrlKey||c.metaKey,y=d.mode!=="bubble";if(c.key==="Escape"){if(d.mode==="topdown")return;if(d.mode==="massing"){d.exitMassing();return}if(d.mode==="flow"){d.exitFlow();return}if(d.mode==="pacing"){d.exitPacing();return}d.select({kind:"none"}),s(!1)}if((c.key==="f"||c.key==="F")&&!f&&!m&&!y&&(c.preventDefault(),s(g=>!g)),(c.key==="Delete"||c.key==="Backspace")&&!f&&!y){if(d.groupSelection.length>0){d.removeGroup();return}const g=d.selection;g.kind==="node"?d.removeNode(g.id):g.kind==="edge"?d.removeEdge(g.id):g.kind==="postit"?d.removePostit(g.id):g.kind==="decoration"?d.removeDecoration(g.id):g.kind==="image"&&d.removeImage(g.id)}m&&(c.key==="a"||c.key==="A")&&!f&&!y&&(c.preventDefault(),d.selectAll());const v=d.mode==="massing"?xy:d.mode==="flow"?Ty:d.mode==="pacing"?Ny:Td,A=d.mode==="massing"?wy:d.mode==="flow"?Iy:d.mode==="pacing"?jy:Id;m&&(c.key==="z"||c.key==="Z")&&(c.preventDefault(),c.shiftKey?A():v()),m&&(c.key==="y"||c.key==="Y")&&(c.preventDefault(),A())};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[]);const a=!e&&n.provider==="none"&&!n.apiKey;return r==="topdown"?u.jsxs("div",{className:"app-shell is-topdown paper-grain",children:[u.jsx(Ef,{}),u.jsx(XP,{})]}):r==="massing"?u.jsx("div",{className:"app-shell is-massing paper-grain",children:u.jsx(cT,{})}):r==="flow"?u.jsx("div",{className:"app-shell is-massing paper-grain",children:u.jsx(bT,{})}):r==="pacing"?u.jsx("div",{className:"app-shell is-massing paper-grain",children:u.jsx(FT,{})}):u.jsxs("div",{className:`app-shell paper-grain ${i?"is-focus":""}`,children:[u.jsx(Ef,{}),u.jsx(e2,{}),u.jsxs("div",{className:"app-body",children:[u.jsx(lk,{}),u.jsx(mC,{}),u.jsx(OP,{})]}),u.jsx("button",{className:"focus-toggle",onClick:()=>s(l=>!l),title:i?"넓게 쓰기 종료 (F / Esc)":"넓게 쓰기 (F)","aria-pressed":i,children:i?u.jsxs(u.Fragment,{children:[u.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":!0,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:u.jsx("path",{d:"M6 2v3a1 1 0 0 1-1 1H2M14 6h-3a1 1 0 0 1-1-1V2M2 10h3a1 1 0 0 1 1 1v3M10 14v-3a1 1 0 0 1 1-1h3"})}),u.jsx("span",{children:"좁게"})]}):u.jsxs(u.Fragment,{children:[u.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":!0,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:u.jsx("path",{d:"M2 6V3a1 1 0 0 1 1-1h3M10 2h3a1 1 0 0 1 1 1v3M14 10v3a1 1 0 0 1-1 1h-3M6 14H3a1 1 0 0 1-1-1v-3"})}),u.jsx("span",{children:"넓게"})]})}),a&&u.jsx(HP,{}),t&&u.jsx(zP,{onClose:()=>o(!1)})]})}window.__bubbleStore=B;vc.createRoot(document.getElementById("root")).render(u.jsx(lm.StrictMode,{children:u.jsx($T,{})}));

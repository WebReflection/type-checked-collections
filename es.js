const e=()=>!0,t=(t,n)=>{const s=[];if(t)for(const e of t.split(/\s*\|\s*/))"object"===e?s.push((t=>null!==t&&typeof t===e)):"null"===e?s.push((e=>null===e)):s.push((t=>typeof t===e));if(n)for(const e of[].concat(n))s.push((t=>t instanceof e));return 1===s.length?s[0]:s.length?e=>s.some((t=>t(e))):e},n=(e,t,n="value")=>s=>{const o=[`Invalid ${typeof s} ${n}: expected `];throw e&&(o.push(e),t&&o.push(" or ")),t&&(o.push("an instanceof "),o.push([].concat(t).map((({name:e})=>e)).join(" | "))),new TypeError(o.join(""))},s=e=>({typeof:s,instanceof:o})=>{const p=t(s,o),a=n(s,o);return class extends e{add(e){return p(e)?super.add(e):a(e)}}},o=s(Set),p=s(WeakSet),a=e=>([s,o])=>{const p=s?.typeof,a=s?.instanceof,c=t(p,a),r=n(p,a,"key"),u=o?.typeof,f=o?.instanceof,l=t(u,f),h=n(u,f);return class extends e{set(e,t){return c(e)||r(e),l(t)||h(t),super.set(e,t)}}},c=a(Map),r=a(WeakMap);export{c as typedMap,o as typedSet,r as typedWeakMap,p as typedWeakSet};

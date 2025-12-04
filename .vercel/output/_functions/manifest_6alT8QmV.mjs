import { q as decodeKey } from './chunks/astro/server_BSuLEWao.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B3WbLgk8.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/linuxdevco/Workspace/Genion_web/","cacheDir":"file:///home/linuxdevco/Workspace/Genion_web/node_modules/.astro/","outDir":"file:///home/linuxdevco/Workspace/Genion_web/dist/","srcDir":"file:///home/linuxdevco/Workspace/Genion_web/src/","publicDir":"file:///home/linuxdevco/Workspace/Genion_web/public/","buildClientDir":"file:///home/linuxdevco/Workspace/Genion_web/dist/client/","buildServerDir":"file:///home/linuxdevco/Workspace/Genion_web/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"chatbot/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/chatbot","isIndex":false,"type":"page","pattern":"^\\/chatbot\\/?$","segments":[[{"content":"chatbot","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/chatbot.astro","pathname":"/chatbot","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"services/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"team/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/team","isIndex":false,"type":"page","pattern":"^\\/team\\/?$","segments":[[{"content":"team","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/team.astro","pathname":"/team","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://genion.site","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/linuxdevco/Workspace/Genion_web/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/linuxdevco/Workspace/Genion_web/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/home/linuxdevco/Workspace/Genion_web/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/linuxdevco/Workspace/Genion_web/src/pages/services.astro",{"propagation":"none","containsHead":true}],["/home/linuxdevco/Workspace/Genion_web/src/pages/team.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/chatbot@_@astro":"pages/chatbot.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/team@_@astro":"pages/team.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_6alT8QmV.mjs","/home/linuxdevco/Workspace/Genion_web/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DBhGwdhd.mjs","/home/linuxdevco/Workspace/Genion_web/src/layouts/Layout.astro?astro&type=script&index=3&lang.ts":"_astro/Layout.astro_astro_type_script_index_3_lang.CpQKrWHy.js","/home/linuxdevco/Workspace/Genion_web/src/pages/about.astro?astro&type=script&index=0&lang.ts":"_astro/about.astro_astro_type_script_index_0_lang.qfHPBYKP.js","/home/linuxdevco/Workspace/Genion_web/src/pages/contact.astro?astro&type=script&index=0&lang.ts":"_astro/contact.astro_astro_type_script_index_0_lang.mo_rufII.js","/home/linuxdevco/Workspace/Genion_web/src/pages/services.astro?astro&type=script&index=0&lang.ts":"_astro/services.astro_astro_type_script_index_0_lang.qfHPBYKP.js","/home/linuxdevco/Workspace/Genion_web/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.CyUE8uxv.js","/home/linuxdevco/Workspace/Genion_web/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.Bhv2VODt.js","/home/linuxdevco/Workspace/Genion_web/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts":"_astro/Layout.astro_astro_type_script_index_2_lang.D8VIa3p_.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/linuxdevco/Workspace/Genion_web/src/pages/about.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const n=document.querySelectorAll(\".animate-on-scroll\"),o=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add(\"visible\")})},{threshold:.1});n.forEach(e=>o.observe(e))});"],["/home/linuxdevco/Workspace/Genion_web/src/pages/contact.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const n=document.querySelectorAll(\".animate-on-scroll\");if(n.length>0){const o=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add(\"visible\"),o.unobserve(t.target))})},{threshold:.1});n.forEach(e=>o.observe(e))}});"],["/home/linuxdevco/Workspace/Genion_web/src/pages/services.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const n=document.querySelectorAll(\".animate-on-scroll\"),o=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add(\"visible\")})},{threshold:.1});n.forEach(e=>o.observe(e))});"],["/home/linuxdevco/Workspace/Genion_web/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"mobile-menu-button\"),s=document.getElementById(\"mobile-menu\");n&&s&&n.addEventListener(\"click\",()=>{s.classList.toggle(\"open\")});const a={threshold:.1,rootMargin:\"0px 0px -50px 0px\"},i=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&e.target.classList.add(\"visible\")})},a);document.addEventListener(\"DOMContentLoaded\",()=>{document.querySelectorAll(\".animate-on-scroll\").forEach(o=>i.observe(o));const e=document.getElementById(\"navbar\");e&&window.addEventListener(\"scroll\",()=>{window.scrollY>50?(e.classList.add(\"bg-white/90\",\"dark:bg-gray-900/90\"),e.classList.remove(\"bg-white/80\",\"dark:bg-gray-900/80\")):(e.classList.add(\"bg-white/80\",\"dark:bg-gray-900/80\"),e.classList.remove(\"bg-white/90\",\"dark:bg-gray-900/90\"))})});"],["/home/linuxdevco/Workspace/Genion_web/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.documentElement,s=document.getElementById(\"theme-toggle\"),t=document.getElementById(\"theme-toggle-light\"),d=document.getElementById(\"theme-toggle-dark\");!s||!t||!d||(localStorage.theme===\"dark\"||!(\"theme\"in localStorage)&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches?(e.classList.add(\"dark\"),d.classList.add(\"hidden\"),t.classList.remove(\"hidden\")):(e.classList.remove(\"dark\"),t.classList.add(\"hidden\"),d.classList.remove(\"hidden\")),s.addEventListener(\"click\",()=>{e.classList.contains(\"dark\")?(e.classList.remove(\"dark\"),localStorage.theme=\"light\",t.classList.add(\"hidden\"),d.classList.remove(\"hidden\")):(e.classList.add(\"dark\"),localStorage.theme=\"dark\",d.classList.add(\"hidden\"),t.classList.remove(\"hidden\"))}))});"],["/home/linuxdevco/Workspace/Genion_web/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts","const r=window.location.pathname;document.querySelectorAll(\".nav-link\").forEach(e=>{e.getAttribute(\"href\")===r&&e.classList.add(\"border-b-2\",\"border-black\",\"dark:border-white\",\"pb-1\",\"font-semibold\")});"]],"assets":["/_astro/edufo_db.D3IAvLhY.png","/_astro/Gene.BSFUlW9b.webp","/_astro/maskot_genion.mgd7PCLn.png","/_astro/gamba2.BxnRGNJl.webp","/_astro/gambar3.CfPlBjij.webp","/_astro/gambar1.L0TszS9T.webp","/_astro/about.C4uLXRsE.css","/Edufo-Aset.png","/Ka.png","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/aspal.jpeg","/beranda_kostapp.png","/bima.jpeg","/boy.jpeg","/chacha.png","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/genion_logo.png","/genion_team.webp","/layer1.jpg","/logo_murata.avif","/logo_nuris.png","/logobkk.jpg","/mifzal.jpeg","/nafil.jpeg","/og-image.webp","/robots.txt","/site.webmanifest","/sitemap-0.xml","/sitemap-index.xml","/stenly.jpg","/unk.png","/yusnaldi.jpeg","/yusuf.jpeg","/_astro/Layout.astro_astro_type_script_index_3_lang.CpQKrWHy.js","/about/index.html","/chatbot/index.html","/contact/index.html","/services/index.html","/team/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"xwgrV6Aodm3T63Evl4tBfyMWJYvbeT//6S65INpPkCA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

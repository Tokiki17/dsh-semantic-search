import { createRequire as __semanticSearchCreateRequire } from 'node:module'; const require = __semanticSearchCreateRequire(import.meta.url);
import "./chunk-H227JCQO.js";

// node_modules/unpdf/dist/pdfjs-loader.mjs
function createDecoderLoader(e) {
  return async (t2) => {
    if (!Object.hasOwn(e, t2)) throw Error(`No bundled decoder for ${t2}`);
    let { default: n } = await e[t2]();
    return n;
  };
}

// node_modules/unpdf/dist/pdfjs-decoders.mjs
var t = createDecoderLoader({ "jbig2.wasm": () => import("./pdfjs-jbig2-UJGLKXY4.js"), "jbig2_nowasm_fallback.js": () => import("./pdfjs-jbig2_nowasm_fallback-XACI27ZU.js"), "openjpeg.wasm": () => import("./pdfjs-openjpeg-L3VDEZNS.js"), "openjpeg_nowasm_fallback.js": () => import("./pdfjs-openjpeg_nowasm_fallback-5DMSST6S.js") });
export {
  t as loadDecoder
};

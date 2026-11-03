import { createRequire as __qwenRagCreateRequire } from 'node:module'; const require = __qwenRagCreateRequire(import.meta.url);
import "./chunk-WQWKGS6O.js";

// node_modules/unpdf/dist/pdfjs-loader.mjs
function createDecoderLoader(e) {
  return async (t2) => {
    if (!Object.hasOwn(e, t2)) throw Error(`No bundled decoder for ${t2}`);
    let { default: n } = await e[t2]();
    return n;
  };
}

// node_modules/unpdf/dist/pdfjs-decoders.mjs
var t = createDecoderLoader({ "jbig2.wasm": () => import("./pdfjs-jbig2-Y2XXFZKW.js"), "jbig2_nowasm_fallback.js": () => import("./pdfjs-jbig2_nowasm_fallback-7IXEJ44B.js"), "openjpeg.wasm": () => import("./pdfjs-openjpeg-U4THTBU2.js"), "openjpeg_nowasm_fallback.js": () => import("./pdfjs-openjpeg_nowasm_fallback-GR4ZDUMY.js") });
export {
  t as loadDecoder
};

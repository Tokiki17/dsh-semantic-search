import { createRequire as __qwenRagCreateRequire } from 'node:module'; const require = __qwenRagCreateRequire(import.meta.url);
import "./chunk-WQWKGS6O.js";

// node_modules/unpdf/dist/pdfjs-jbig2_nowasm_fallback.mjs
async function JBig2(e = {}) {
  var n = e, r = true, quit_ = (e2, n2) => {
    throw n2;
  }, a = import.meta.url;
  if (r) try {
    new URL(`.`, a).href;
  } catch {
  }
  console.log.bind(console);
  var s = console.error.bind(console), c = { Memory: function(e2) {
    this.buffer = /* @__PURE__ */ new ArrayBuffer(e2.initial * 65536);
  }, Module: function(e2) {
  }, Instance: function(e2, n2) {
    this.exports = (function instantiate(e3) {
      for (var n3, r2 = /* @__PURE__ */ new Uint8Array(123), a2 = 25; a2 >= 0; --a2) r2[48 + a2] = 52 + a2, r2[65 + a2] = a2, r2[97 + a2] = 26 + a2;
      r2[43] = 62, r2[47] = 63;
      function i(e4, n4, a3) {
        for (var s2, c2, l2 = 0, u2 = n4, d2 = a3.length, f2 = n4 + (d2 * 3 >> 2) - (a3[d2 - 2] == `=`) - (a3[d2 - 1] == `=`); l2 < d2; l2 += 4) s2 = r2[a3.charCodeAt(l2 + 1)], c2 = r2[a3.charCodeAt(l2 + 2)], e4[u2++] = r2[a3.charCodeAt(l2)] << 2 | s2 >> 4, u2 < f2 && (e4[u2++] = s2 << 4 | c2 >> 2), u2 < f2 && (e4[u2++] = c2 << 6 | r2[a3.charCodeAt(l2 + 3)]);
        return e4;
      }
      function m(e4) {
        i(n3, 1024, `TjdmeGNvZGVjMTVTY2FubGluZURlY29kZXJFAAAAAAAAAAAGBwIACAMACwQADAUADgYADwcABgcKAAgLABKAABMIABQJABtAAAkDDQAHAQAIDAAXwAAYgAYqEAArEQA0DgA1DwAMAxYABBcACBQADBMAExoAFxUAGBwAJBsAJxIAKBgAKxkANwABKgIdAAMeAAQtAAUuAAovAAswABIhABMiABQjABUkABYlABcmABofABsgACQ1ACU2ACgnACkoACopACsqACwrAC0sADI9ADM+ADQ/ADUAADZAATeAAUo7AEs8AFIxAFMyAFQzAFU0AFg3AFk4AFo5AFs6AGTAAWUAAmeAAmhAAhCYwAWZAAaaQAabwAbMwALNAAPSQAPTgAPUwAPVAATWQATXgATYwATZAAXaQAXbgAUAAwgABwxABw2ABwoSwAcTAAgUQAgVgAgWwAgXAAkcQAkdgAkewAkfAAr/`), i(n3, 1393, `AgIDAAMCAAICAQADBAACAgYAAwUAAQMHAAIECQAFCAADBAoABQsABwwAAgQNAAcOAAEYDwAFCBIAD0AAFxAAGBEANwAACggABwxABw2ABxcYABgZACgXADcWAGcTAGgUAGwVADYSwAcTAAgUQAgVgAgWwAgXAAkcQAkdgAkewAkfAAokNAAnNwAoOAArOwAsPAAzQAE0gAE1wAE3NQA4NgBSMgBTMwBULABVLQBWLgBXLwBYOQBZOgBaPQBbAAFkMABlMQBmPgBnPwBoHgBpHwBqIABrIQBsKABtKQDIgADJwADKGgDLGwDMHADNHQDSIgDTIwDUJADVJQDWJgDXJwDaKgDbKwAUSoACS8ACTAADTUADUgAFU0AFVIAFVcAFWgAGW0AGZIAGZcAGbAACbUACcoADc8ADdAAEdUAEdoAEd8AE/wAAAAAAANQGAAAMAAAADQAAAA4AAAAPAAAAEAAAAAgWAADgBgAACAcAAE43Znhjb2RlYzEyX0dMT0JBTF9fTl8xMTBGYXhEZWNvZGVyRQAAAADQFQAAAAQAAAFWAQEBAAE0AgYAAAEYAwkAAMEKBAwAACEFBR0AACECJiEAAAFWBwYBAAFUCA4AAAFICQ4AAAE4Cg4AAAEwCxEAAAEkDBIAAAEcDRQAAAEWHRUAAAFWDw4BAAFUEA4AAAFREQ8AAAFIEhAAAAE4ExEAAAE0FBIAAAEwFRMAAAEoFhMAAAEkFxQAAAEiGBUAAAEcGRYAAAEYGhcAAAEWGxgAAAEUHBkAAAESHRoAAAERHhsAAMEKHxwAAMEJIB0AAKEIIR4AACEFIh8AAEEEIyAAAKECJCEAACECJSIAAEEBJiMAABEBJyQAAIUAKCUAAEkAKSYAACUAKicAABUAKygAAAkALCkAAAUALSoAAAEALSsAAAFWLi4AAAAAAgAAAAAAAAAEAAAABAAAAAYAAAAUAAAACAAAAFQAAAAMAAAAVAEAACAAAABUEQAAJZsAAPd7AAAAAAAA8AcAABAAAAAGAAAAAPgAAAAIAACVBwAA+w4AAAEAAAD4AQAACAAAAAQAAAAAHgAAAAIAAOUAAAC9AQAAAwAAAHwAAAAEAAAAAQAAAIADAACAAAAAAAAAAOgIAAARAAAAEgAAABMAAAAUAAAAFQAAABYAAAAXAAAAGAAAABkAAAAIFgAA9AgAAGQJAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lNMTRDSkJpZzJfR1JEUHJvY0YxNEZYQ09ERUNfU1RBVFVTUE5TMl8yN1Byb2dyZXNzaXZlQXJpdGhEZWNvZGVTdGF0ZUVFRlMzX1JTMl9TNV9FRUUA0BUAAGwJAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fYmFzZUlGMTRGWENPREVDX1NUQVRVU1IxNENKQmlnMl9HUkRQcm9jUE5TM18yN1Byb2dyZXNzaXZlQXJpdGhEZWNvZGVTdGF0ZUVFRUUA4BQAAOQJAAAAAAAALAoAAHgKAABNMTRDSkJpZzJfR1JEUHJvY0YxNEZYQ09ERUNfU1RBVFVTUE5TXzI3UHJvZ3Jlc3NpdmVBcml0aERlY29kZVN0YXRlRUUAAACQFAAANAoAAEYxNEZYQ09ERUNfU1RBVFVTUE4xNENKQmlnMl9HUkRQcm9jMjdQcm9ncmVzc2l2ZUFyaXRoRGVjb2RlU3RhdGVFRQAA0BUAAIAKAAAxNENKQmlnMl9HUkRQcm9j`), i(n3, 2724, `YAsAAAUAAAABAAAAkAsAAAgAAAABAAAA0AsAAAkAAAAAAAAAIAwAAAcAAAAAAAAAYAwAAAgAAAAAAAAAoAwAAA4AAAAAAAAAEA0AAA8AAAABAAAAkA0AABUAAAABAAAAQA4AABYAAAABAAAA8A4AABUAAAAAAAAAoA8AAA4AAAAAAAAAEBAAAA4AAAAAAAAAgBAAAA4AAAAAAAAA8BAAAAcAAAAAAAAAMBEAAA0=`), i(n3, 2912, `AQQAAAAAAAACCAAAEAAAAAMQAAAQAQAAACAAAP////8DIAAAEAEB`), i(n3, 2960, `AQAAAAAAAAACAAAAAQAAAAMAAAACAAAABAMAAAMAAAAFBgAACwAAAAAgAAD/////BiAAAEsAAAAGAAAAAAAAAAgIAAAA////AQAAAAAAAAACAAAAAQAAAAMAAAACAAAABAMAAAMAAAAFBgAACwAAAAggAAD//v//ByAAAEsAAAAG`), i(n3, 3104, `AQAAAAEAAAACAAAAAgAAAAMAAAADAAAABAMAAAQAAAAFBgAADAAAAAAgAAD/////BSAAAEw=`), i(n3, 3168, `BwgAAAH///8BAAAAAQAAAAIAAAACAAAAAwAAAAMAAAAEAwAABAAAAAUGAAAMAAAAByAAAAD///8GIAAATAAAAAUKAAAA+P//BAkAAAD8//8ECAAAAP7//wQHAAAA////BQYAAID///8FBQAAwP///wQFAADg////AgcAAAAAAAADBwAAgAAAAAMIAAAAAQAABAkAAAACAAAECgAAAAQAAAYgAAD/9///BiAAAAAIAAAECQAAAPz//wMIAAAA/v//BAcAAAD///8FBgAAgP///wUFAADA////BAUAAOD///8EBQAAAAAAAAUFAAAgAAAABQYAAEAAAAAEBwAAgAAAAAMIAAAAAQAAAwkAAAACAAADCgAAAAQAAAUgAAD/+///BSAAAAAI`), i(n3, 3472, `CAMAAPH///8JAQAA+f///wgBAAD7////CQAAAP3///8HAAAA/v///wQAAAD/////AgEAAAAAAAAFAAAAAgAAAAYAAAADAAAAAwQAAAQAAAAGAQAAFAAAAAQEAAAWAAAABAUAACYAAAAFBgAARgAAAAUHAACGAAAABgcAAAYBAAAHCAAAhgEAAAYKAACGAgAACSAAAPD///8JIAAAhgYAAAI=`), i(n3, 3648, `CAQAAOH///8JAgAA8f///wgCAAD1////CQEAAPn///8HAQAA+////wQBAAD9////AwEAAP////8DAQAAAQAAAAUBAAADAAAABgEAAAUAAAADBQAABwAAAAYCAAAnAAAABAUAACsAAAAEBgAASwAAAAUHAACLAAAABQgAAAsBAAAGCAAACwIAAAcJAAALAwAABgsAAAsFAAAJIAAA4P///wkgAAALDQAAAgAAAAAAAAAHBAAA6////wgAAAD7////BwAAAPz///8FAAAA/f///wICAAD+////BQAAAAIAAAAGAAAAAwAAAAcAAAAEAAAACAAAAAUAAAACBgAABgAAAAUFAABGAAAABgUAAGYAAAAGBgAAhgAAAAYHAADGAAAABggAAEYBAAAGCQAARgIAAAYKAABGBAAABwsAAEYIAAAIIAAA6v///wggAABGEAAAAg==`), i(n3, 4e3, `AQAAAAEAAAACAQAAAgAAAAQAAAAEAAAABAEAAAUAAAAFAQAABwAAAAUCAAAJAAAABgIAAA0AAAAHAgAAEQAAAAcDAAAVAAAABwQAAB0AAAAHBQAALQAAAAcGAABNAAAAACAAAAAAAAAHIAAAjQAAAAEAAAABAAAAAgAAAAIAAAADAQAAAwAAAAUAAAAFAAAABQEAAAYAAAAGAQAACAAAAAcAAAAKAAAABwEAAAsAAAAHAgAADQAAAAcDAAARAAAABwQAABkAAAAIBQAAKQAAAAAgAAAAAAAACCAAAEkAAAABAAAAAQAAAAMAAAACAAAABAAAAAMAAAAFAAAABAAAAAQBAAAFAAAAAwMAAAcAAAAGAQAADwAAAAYCAAARAAAABgMAABUAAAAGBAAAHQAAAAYFAAAtAAAABwYAAE0AAAAAIAAAAAAAAAcgAACNAAAAAwAAAP7///8DAAAA/////wEAAAAAAAAAAwAAAAEAAAADAAAAAgAAAAAgAAD9////ACAAAAM=`), i(n3, 4400, `BwQAAOj///8GAgAA+P///wUBAAD8////BAAAAP7///8DAAAA/////wEAAAAAAAAAAwAAAAEAAAAEAAAAAgAAAAUBAAADAAAABgIAAAUAAAAHBAAACQAAAAcgAADn////ByAAABkAAABiYWRfdmFyaWFudF9hY2Nlc3MAdmVjdG9yAHN0ZDo6YmFkX2Z1bmN0aW9uX2NhbGwAYmFkX2FycmF5X25ld19sZW5ndGgAAAAaAAAAGwAAABwAAAAdAAAAHgAAAB8AAAAgAAAAIQAAAAAAAAAiAAAAIgAAACMAAAAjAAAAIwAAACMAAAAjAAAAIwAAACIAAAAiAAAAIwAAACIAAAAiAAAAIgAAACI=`), i(n3, 4704, `IwAAACMAAAAiAAAAIgAAAAAAAAAiAAAAAAAAACM=`), i(n3, 4872, `GBMAAAsAAAAkAAAAJQAAAAgWAAAkEwAAKBYAAE5TdDNfXzIxN2JhZF9mdW5jdGlvbl9jYWxsRQAAAAAAVBMAAAIAAAAmAAAAJwAAAAgWAABgEwAAKBYAAFN0MThiYWRfdmFyaWFudF9hY2Nlc3MAAAgWAACEEwAAwBUAAE4xMF9fY3h4YWJpdjExNl9fc2hpbV90eXBlX2luZm9FAAAAAAgWAAC0EwAAeBMAAE4xMF9fY3h4YWJpdjExN19fY2xhc3NfdHlwZV9pbmZvRQAAAAgWAADkEwAAeBMAAE4xMF9fY3h4YWJpdjExN19fcGJhc2VfdHlwZV9pbmZvRQAAAAgWAAAUFAAAeBMAAE4xMF9fY3h4YWJpdjEyMF9fZnVuY3Rpb25fdHlwZV9pbmZvRQAAAAAIFgAASBQAANgTAABOMTBfX2N4eGFiaXYxMjlfX3BvaW50ZXJfdG9fbWVtYmVyX3R5cGVfaW5mb0U=`), i(n3, 5248, `/////0RuAAAAAAAACBQAACgAAAApAAAAKgAAACsAAAAsAAAACBYAALAUAACoEwAATjEwX19jeHhhYml2MTIwX19zaV9jbGFzc190eXBlX2luZm9FAAAAAAAAAAA8FAAAKAAAAC0AAAAqAAAAKwAAAC4AAAAAAAAANBUAAAIAAAAvAAAAMAAAAFN0OWV4Y2VwdGlvbgAAAAAIFgAAJBUAACgWAABTdDliYWRfYWxsb2MAAAAACBYAAEAVAAAYFQAAU3QyMGJhZF9hcnJheV9uZXdfbGVuZ3RoAAAAAAAAAABwFQAAAQAAADEAAAAyAAAACBYAAHwVAAAoFgAAU3QxMWxvZ2ljX2Vycm9yAAAAAACgFQAAAQAAADMAAAAyAAAACBYAAKwVAABwFQAAU3QxMmxlbmd0aF9lcnJvcgAAAADQFQAA8BUAAAAAAACoEwAAKAAAADQAAAAqAAAAKwAAADUAAAA2AAAANwAAADgAAABTdDl0eXBlX2luZm8AAAAAAAAAAKQUAAAoAAAAOQAAACoAAAArAAAANQAAADoAAAA7AAAAPAAAANAVAAAIFQ==`), i(n3, 5680, `wBoBAL0=`);
      }
      function o() {
        throw Error(`abort`);
      }
      function p(e4, r3, a3) {
        n3.copyWithin(e4, r3, r3 + a3);
      }
      function t(e4, r3, a3) {
        if (e4 >>>= 0, a3 >>>= 0, e4 + a3 > n3.length) throw `trap: invalid memory.fill`;
        n3.fill(r3, e4, e4 + a3);
      }
      function ga(e4) {
        var r3 = /* @__PURE__ */ new ArrayBuffer(16777216), a3 = new Int8Array(r3), s2 = new Int16Array(r3), c2 = new Int32Array(r3), l2 = new Uint8Array(r3), u2 = new Uint16Array(r3), d2 = new Uint32Array(r3);
        new Float32Array(r3);
        var f2 = new Float64Array(r3), h2 = Math.imul, g2 = Math.abs, _2 = Math.clz32, v2 = Math.min, y2 = Math.max, b2 = Math.floor, x2 = Math.ceil, S2 = e4.a, C2 = S2.a, w2 = S2.b, T2 = S2.c, E2 = S2.d, D2 = S2.e, O2 = S2.f, k = S2.g, A = S2.h, j = S2.i, M = 72384, N = 0;
        function yc(e5) {
          var n4 = 0, r4 = 0, f3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0, A2 = 0, j2 = 0, P2 = 0, F = 0, I = 0, L = 0, R = 0, z = 0, B = 0, V = 0, H = 0, U = 0, W = 0, G = 0, K = 0, q = 0, J = 0, Y = 0, X = 0, Z = 0, Q = 0, _e = 0, Se = 0, Ce = 0, Te = 0, Ee = 0, De = 0, Oe = 0, Me = 0, Ne = 0, Pe = 0, Fe = 0, Ie = 0, Le = 0, Re = 0, Ve = 0, He = 0, Ue = 0, We = 0, Ge = 0, Ke = 0, Je = 0, Ye = 0, Xe = 0, Ze = 0, Qe = 0;
          Y = M - 16 | 0, M = Y, n4 = c2[e5 + 4 >> 2], r4 = c2[n4 + 8 >> 2], n4 = c2[n4 + 4 >> 2], b3 = n4;
          a: {
            b: {
              c: {
                d: {
                  e: {
                    if (n4 >>> 0 < r4 >>> 0) break e;
                    if ((n4 | 0) == (r4 | 0)) {
                      Xe = 2;
                      break c;
                    }
                    for (Ee = e5 + 80 | 0; ; ) {
                      if (r4 >>> 0 > b3 >>> 0) break e;
                      if (b3 - r4 >>> 0 < 11) break c;
                      f: {
                        g: {
                          h: {
                            T3 = c2[Ee >> 2];
                            i: {
                              if (!T3) {
                                n4 = na(72), a3[n4 + 4 | 0] = 0, c2[n4 >> 2] = 0, t(n4 + 8 | 0, 0, 64), c2[Y + 4 >> 2] = 0, eb(Ee, n4), Vb(Y + 4 | 0);
                                j: {
                                  b3 = c2[e5 + 80 >> 2];
                                  k: {
                                    if (qa(c2[e5 + 4 >> 2], b3) || wa(c2[e5 + 4 >> 2], b3 + 4 | 0)) break k;
                                    v3 = c2[e5 + 4 >> 2], f3 = c2[v3 + 8 >> 2], n4 = c2[v3 >> 2];
                                    l: {
                                      m: {
                                        if (d2[v3 + 4 >> 2] <= f3 >>> 0) {
                                          a3[Y + 15 | 0] = 0;
                                          break m;
                                        }
                                        if (n4 = l2[n4 + f3 | 0], a3[Y + 15 | 0] = n4, n4 >>> 0 < 224) break m;
                                        if (qa(v3, b3 + 8 | 0) || (r4 = c2[b3 + 8 >> 2] & 536870911, c2[b3 + 8 >> 2] = r4, r4 >>> 0 > 64)) break k;
                                        if (f3 = c2[e5 + 4 >> 2], n4 = c2[f3 + 8 >> 2], v3 = n4 + (r4 + 8 >>> 3 | 0) | 0, n4 >>> 0 > v3 >>> 0) break l;
                                        n4 = c2[f3 + 4 >> 2], c2[f3 + 8 >> 2] = n4 >>> 0 > v3 >>> 0 ? v3 : n4;
                                        break l;
                                      }
                                      if (wa(v3, Y + 15 | 0)) break k;
                                      r4 = l2[Y + 15 | 0] >>> 5 | 0, c2[b3 + 8 >> 2] = r4;
                                    }
                                    f3 = l2[b3 + 4 | 0];
                                    n: {
                                      if (!r4) break n;
                                      for (n4 = c2[b3 >> 2], Rb(b3 + 12 | 0, r4), r4 = 0, n4 = (n4 >>> 0 > 65536 ? 4 : n4 >>> 0 > 256 ? 2 : 1) - 1 | 0; ; ) {
                                        if (c2[b3 + 8 >> 2] <= (r4 | 0)) break n;
                                        o: {
                                          p: switch (n4 - 1 | 0) {
                                            default:
                                              if (wa(c2[e5 + 4 >> 2], Y + 15 | 0)) break k;
                                              T3 = l2[Y + 15 | 0], c2[c2[b3 + 12 >> 2] + (r4 << 2) >> 2] = T3;
                                              break o;
                                            case 0:
                                              if (Sa(c2[e5 + 4 >> 2], Y + 12 | 0)) break k;
                                              T3 = u2[Y + 12 >> 1], c2[c2[b3 + 12 >> 2] + (r4 << 2) >> 2] = T3;
                                              break o;
                                            case 1:
                                              break e;
                                            case 2:
                                              break p;
                                          }
                                          if (qa(c2[e5 + 4 >> 2], Y + 8 | 0)) break k;
                                          T3 = c2[Y + 8 >> 2], c2[c2[b3 + 12 >> 2] + (r4 << 2) >> 2] = T3;
                                        }
                                        if (r4 = r4 + 1 | 0, !(d2[b3 >> 2] > T3 >>> 0)) break;
                                      }
                                      break k;
                                    }
                                    n4 = c2[e5 + 4 >> 2];
                                    q: {
                                      if (!(f3 & 64)) {
                                        if (wa(n4, Y + 15 | 0)) break k;
                                        c2[b3 + 24 >> 2] = l2[Y + 15 | 0];
                                        break q;
                                      }
                                      if (qa(n4, b3 + 24 | 0)) break k;
                                    }
                                    if (!qa(c2[e5 + 4 >> 2], b3 + 28 | 0)) break j;
                                  }
                                  eb(Ee, 0);
                                  break i;
                                }
                                r4 = c2[e5 + 4 >> 2], n4 = c2[r4 + 20 >> 2], c2[b3 + 40 >> 2] = c2[r4 + 16 >> 2], c2[b3 + 44 >> 2] = n4, n4 = c2[r4 + 8 >> 2], c2[b3 + 48 >> 2] = 1, c2[b3 + 36 >> 2] = n4, c2[e5 + 84 >> 2] = n4, T3 = c2[e5 + 80 >> 2];
                              }
                              r: {
                                for (; ; ) {
                                  v3 = 0, w3 = 0, r4 = 0, _3 = M - 304 | 0, M = _3, n4 = 2;
                                  s: {
                                    t: {
                                      u: {
                                        v: {
                                          w: {
                                            x: {
                                              y: {
                                                z: {
                                                  A: {
                                                    B: {
                                                      C: {
                                                        D: {
                                                          E: {
                                                            F: {
                                                              G: {
                                                                H: {
                                                                  I: {
                                                                    J: {
                                                                      K: {
                                                                        L: {
                                                                          M: {
                                                                            N: {
                                                                              O: {
                                                                                P: {
                                                                                  Q: {
                                                                                    R: {
                                                                                      S: switch (f3 = l2[T3 + 4 | 0] & 63, f3 - 16 | 0) {
                                                                                        case 0:
                                                                                          break R;
                                                                                        case 1:
                                                                                        case 2:
                                                                                        case 3:
                                                                                        case 5:
                                                                                        case 8:
                                                                                        case 9:
                                                                                        case 10:
                                                                                        case 11:
                                                                                        case 12:
                                                                                        case 13:
                                                                                        case 14:
                                                                                        case 15:
                                                                                        case 16:
                                                                                        case 17:
                                                                                        case 18:
                                                                                        case 19:
                                                                                        case 21:
                                                                                        case 25:
                                                                                        case 28:
                                                                                        case 29:
                                                                                        case 30:
                                                                                        case 31:
                                                                                          break B;
                                                                                        case 4:
                                                                                        case 6:
                                                                                        case 7:
                                                                                          break Q;
                                                                                        case 20:
                                                                                        case 22:
                                                                                        case 23:
                                                                                          break P;
                                                                                        case 24:
                                                                                        case 26:
                                                                                        case 27:
                                                                                          break O;
                                                                                        case 32:
                                                                                          break N;
                                                                                        case 33:
                                                                                          break K;
                                                                                        case 34:
                                                                                          break J;
                                                                                        case 35:
                                                                                          break u;
                                                                                        case 36:
                                                                                          break I;
                                                                                        case 37:
                                                                                          break H;
                                                                                        default:
                                                                                          break S;
                                                                                      }
                                                                                      T: switch (f3 | 0) {
                                                                                        case 0:
                                                                                          if (n4 = 0, y3 = 0, E3 = 0, g3 = M - 432 | 0, M = g3, r4 = 1, !Sa(c2[e5 + 4 >> 2], g3 + 210 | 0)) {
                                                                                            C3 = na(56), c2[C3 + 40 >> 2] = 0, c2[C3 + 32 >> 2] = 0, c2[C3 + 36 >> 2] = 0, c2[C3 + 24 >> 2] = 0, c2[C3 + 28 >> 2] = 0, c2[C3 + 16 >> 2] = 0, c2[C3 + 20 >> 2] = 0, k2 = u2[g3 + 210 >> 1], b3 = k2 & 1, a3[C3 | 0] = b3, v3 = k2 >>> 10 & 3, a3[C3 + 3 | 0] = v3, f3 = k2 & 12288, a3[C3 + 2 | 0] = !!(f3 | 0), r4 = (k2 & 254) >>> 1 & 1, a3[C3 + 1 | 0] = r4, Pe = C3 + 16 | 0;
                                                                                            U: {
                                                                                              V: {
                                                                                                W: {
                                                                                                  if (!b3) {
                                                                                                    for (b3 = v3 ? 2 : 8, v3 = C3 + 44 | 0; ; ) {
                                                                                                      if ((n4 | 0) != (b3 | 0)) {
                                                                                                        if (r4 = 1, f3 = n4 + v3 | 0, n4 = n4 + 1 | 0, !wa(c2[e5 + 4 >> 2], f3)) continue;
                                                                                                        break U;
                                                                                                      }
                                                                                                      break;
                                                                                                    }
                                                                                                    if (l2[C3 + 1 | 0] != 1) break V;
                                                                                                    if (!l2[C3 + 2 | 0]) break W;
                                                                                                    break V;
                                                                                                  }
                                                                                                  if (f3 | !r4) break V;
                                                                                                }
                                                                                                for (v3 = C3 + 52 | 0, n4 = 0; ; ) {
                                                                                                  if ((n4 | 0) == 4) break V;
                                                                                                  if (r4 = 1, f3 = n4 + v3 | 0, n4 = n4 + 1 | 0, wa(c2[e5 + 4 >> 2], f3)) break;
                                                                                                }
                                                                                                break U;
                                                                                              }
                                                                                              if (r4 = 1, qa(c2[e5 + 4 >> 2], C3 + 12 | 0) || qa(c2[e5 + 4 >> 2], C3 + 8 | 0) | d2[C3 + 12 >> 2] > 1048576 | d2[C3 + 8 >> 2] > 1048576) break U;
                                                                                              for (n4 = c2[T3 + 8 >> 2], S3 = (n4 | 0) > 0 ? n4 : 0, n4 = 0; ; ) {
                                                                                                if ((n4 | 0) == (S3 | 0)) for (R = 1, n4 = 0; ; ) if ((n4 | 0) == (S3 | 0)) {
                                                                                                  X: {
                                                                                                    Y: {
                                                                                                      Z: {
                                                                                                        _: {
                                                                                                          $: {
                                                                                                            aa: {
                                                                                                              ba: {
                                                                                                                ca: {
                                                                                                                  da: {
                                                                                                                    ea: {
                                                                                                                      fa: {
                                                                                                                        if (!(R & 1)) break fa;
                                                                                                                        c2[C3 + 4 >> 2] = y3, Ge = Kb(g3 + 196 | 0, y3), S3 = c2[Ge >> 2];
                                                                                                                        ga: {
                                                                                                                          if ((S3 | 0) == c2[Ge + 4 >> 2]) break ga;
                                                                                                                          for (n4 = c2[T3 + 8 >> 2], f3 = (n4 | 0) > 0 ? n4 : 0, R = 1, y3 = 0, v3 = 0; ; ) {
                                                                                                                            if ((f3 | 0) == (v3 | 0)) break ga;
                                                                                                                            ha: {
                                                                                                                              if (n4 = Ka(e5, c2[c2[T3 + 12 >> 2] + (v3 << 2) >> 2]), l2[n4 + 4 | 0] & 63) break ha;
                                                                                                                              for (n4 = c2[n4 + 56 >> 2], b3 = c2[n4 + 24 >> 2], w3 = c2[n4 + 28 >> 2] - b3 >> 2, n4 = 0; ; ) {
                                                                                                                                if ((n4 | 0) == (w3 | 0)) {
                                                                                                                                  x3 = 0, b3 = 0, R & 1 && (n4 = y3 + w3 | 0, r4 = n4 >>> 0 >= w3 >>> 0, x3 = r4, b3 = r4 ? n4 : 0), y3 = b3, R = x3;
                                                                                                                                  break ha;
                                                                                                                                }
                                                                                                                                if (r4 = n4 + y3 | 0, !(r4 >>> 0 >= n4 >>> 0 & R)) break fa;
                                                                                                                                c2[S3 + (r4 << 2) >> 2] = c2[b3 + (n4 << 2) >> 2], n4 = n4 + 1 | 0;
                                                                                                                              }
                                                                                                                            }
                                                                                                                            v3 = v3 + 1 | 0;
                                                                                                                          }
                                                                                                                        }
                                                                                                                        $a(Pe, Ge), r4 = 1;
                                                                                                                        ia: {
                                                                                                                          if (l2[C3 | 0] != 1) break ia;
                                                                                                                          if (n4 = k2 >>> 2 & 3, (n4 | 0) == 2 || (f3 = k2 >>> 4 & 3, (f3 | 0) == 2)) break X;
                                                                                                                          ja: {
                                                                                                                            ka: switch (n4 | 0) {
                                                                                                                              case 0:
                                                                                                                                R = ra(e5, 4), n4 = 0;
                                                                                                                                break ja;
                                                                                                                              case 1:
                                                                                                                                R = ra(e5, 5), n4 = 0;
                                                                                                                                break ja;
                                                                                                                              default:
                                                                                                                                break ka;
                                                                                                                            }
                                                                                                                            if (n4 = Ga(e5, T3, 0), !n4) break X;
                                                                                                                            R = c2[n4 + 68 >> 2], n4 = 1;
                                                                                                                          }
                                                                                                                          c2[C3 + 28 >> 2] = R;
                                                                                                                          la: {
                                                                                                                            ma: switch (f3 | 0) {
                                                                                                                              case 0:
                                                                                                                                f3 = ra(e5, 2);
                                                                                                                                break la;
                                                                                                                              case 1:
                                                                                                                                f3 = ra(e5, 3);
                                                                                                                                break la;
                                                                                                                              default:
                                                                                                                                break ma;
                                                                                                                            }
                                                                                                                            if (f3 = Ga(e5, T3, n4), !f3) break X;
                                                                                                                            n4 = n4 + 1 | 0, f3 = c2[f3 + 68 >> 2];
                                                                                                                          }
                                                                                                                          c2[C3 + 32 >> 2] = f3;
                                                                                                                          na: {
                                                                                                                            if (!(k2 & 64)) {
                                                                                                                              f3 = ra(e5, 1);
                                                                                                                              break na;
                                                                                                                            }
                                                                                                                            if (f3 = Ga(e5, T3, n4), !f3) break X;
                                                                                                                            n4 = n4 + 1 | 0, f3 = c2[f3 + 68 >> 2];
                                                                                                                          }
                                                                                                                          if (c2[C3 + 36 >> 2] = f3, l2[C3 + 1 | 0] != 1) break ia;
                                                                                                                          oa: {
                                                                                                                            if (!(k2 & 128)) {
                                                                                                                              n4 = ra(e5, 1);
                                                                                                                              break oa;
                                                                                                                            }
                                                                                                                            if (n4 = Ga(e5, T3, n4), !n4) break X;
                                                                                                                            n4 = c2[n4 + 68 >> 2];
                                                                                                                          }
                                                                                                                          c2[C3 + 40 >> 2] = n4;
                                                                                                                        }
                                                                                                                        W = l2[C3 + 1 | 0], Ke = l2[C3 | 0], r4 = l2[C3 + 3 | 0], n4 = l2[C3 + 2 | 0], c2[g3 + 192 >> 2] = 0, c2[g3 + 184 >> 2] = 0, c2[g3 + 188 >> 2] = 0, c2[g3 + 180 >> 2] = 0, c2[g3 + 172 >> 2] = 0, c2[g3 + 176 >> 2] = 0, v3 = n4 ? 1024 : 8192, f3 = r4 ? (r4 | 0) == 1 ? 8192 : 1024 : 65536;
                                                                                                                        pa: {
                                                                                                                          if (!(!(k2 & 256) | !E3)) {
                                                                                                                            if (r4 = 1, !(Ke & 1) && (n4 = Jb(g3 + 184 | 0, c2[E3 + 56 >> 2]), (f3 | 0) != c2[g3 + 188 >> 2] - c2[n4 >> 2] >> 1)) break Y;
                                                                                                                            if (!(W & 1) || (n4 = Jb(g3 + 172 | 0, c2[E3 + 56 >> 2] + 12 | 0), (v3 | 0) == c2[g3 + 176 >> 2] - c2[n4 >> 2] >> 1)) break pa;
                                                                                                                            break Y;
                                                                                                                          }
                                                                                                                          if (Ke & 1 || fb(g3 + 184 | 0, f3), !(W & 1)) break pa;
                                                                                                                          fb(g3 + 172 | 0, v3);
                                                                                                                        }
                                                                                                                        f3 = c2[T3 + 44 >> 2], S3 = f3, r4 = c2[T3 + 40 >> 2], c2[g3 + 152 >> 2] = r4, c2[g3 + 156 >> 2] = f3, b3 = c2[T3 + 36 >> 2], c2[g3 + 160 >> 2] = b3, c2[T3 + 52 >> 2] = 2;
                                                                                                                        qa: {
                                                                                                                          if (!(r4 | f3) | l2[e5 + 48 | 0] != 1) break qa;
                                                                                                                          for (v3 = c2[e5 + 108 >> 2], n4 = v3; ; ) {
                                                                                                                            if (n4 = c2[n4 + 4 >> 2], (v3 | 0) == (n4 | 0)) break qa;
                                                                                                                            if (!((r4 | 0) != c2[n4 + 8 >> 2] | (S3 | 0) != c2[n4 + 12 >> 2] | (b3 | 0) != c2[n4 + 16 >> 2])) break;
                                                                                                                          }
                                                                                                                          r4 = Dd(c2[n4 + 24 >> 2]), c2[g3 + 232 >> 2] = 0, Ib(T3 + 56 | 0, r4), Va(g3 + 232 | 0), Cd(c2[e5 + 108 >> 2], g3 + 152 | 0, n4 + 24 | 0), v3 = c2[e5 + 108 >> 2], f3 = c2[n4 >> 2], r4 = c2[n4 + 4 >> 2], c2[f3 + 4 >> 2] = r4, c2[r4 >> 2] = f3, c2[v3 + 8 >> 2] = c2[v3 + 8 >> 2] - 1, pc(n4);
                                                                                                                          break _;
                                                                                                                        }
                                                                                                                        if (!(Ke & 1)) for (A2 = Na(c2[e5 + 4 >> 2]), c2[g3 + 344 >> 2] = A2, v3 = c2[g3 + 172 >> 2], r4 = c2[g3 + 176 >> 2], n4 = c2[g3 + 188 >> 2], K = c2[g3 + 184 >> 2], Je = Da(), c2[g3 + 428 >> 2] = Je, De = Da(), c2[g3 + 400 >> 2] = De, V = Da(), c2[g3 + 396 >> 2] = V, H = Da(), c2[g3 + 392 >> 2] = H, Te = K + 810 | 0, Oe = K + 79434 | 0, Fe = K + 3882 | 0, Le = K + 458 | 0, Re = v3, Me = r4 - v3 >> 1, Ve = Fd(g3 + 232 | 0, ib(c2[C3 + 8 >> 2] + c2[C3 + 4 >> 2] | 0)), Ie = cb(g3 + 416 | 0, c2[C3 + 8 >> 2]), q = n4 - K >> 1, He = q >>> 0 > 405, Ue = q >>> 0 > 39717, We = q >>> 0 > 1941, Ye = q >>> 0 > 229, E3 = 0, R = 0; ; ) {
                                                                                                                          ra: {
                                                                                                                            sa: {
                                                                                                                              ta: {
                                                                                                                                if (n4 = c2[C3 + 8 >> 2], n4 >>> 0 > R >>> 0) {
                                                                                                                                  if (c2[g3 + 388 >> 2] = 0, Aa(Je, A2, g3 + 384 | 0), E3 = c2[g3 + 384 >> 2] + E3 | 0, E3 >>> 0 <= 65535) for (Ne = 0; ; ) {
                                                                                                                                    if (!Aa(De, A2, g3 + 380 | 0)) break ra;
                                                                                                                                    if (d2[C3 + 8 >> 2] <= R >>> 0 || (Ne = c2[g3 + 380 >> 2] + Ne | 0, Ne >>> 0 > 65535)) break ta;
                                                                                                                                    if (!(!E3 | !Ne)) {
                                                                                                                                      ua: {
                                                                                                                                        va: {
                                                                                                                                          wa: {
                                                                                                                                            xa: {
                                                                                                                                              ya: {
                                                                                                                                                za: {
                                                                                                                                                  Aa: {
                                                                                                                                                    if (!l2[C3 + 1 | 0]) {
                                                                                                                                                      P2 = lb(), c2[g3 + 376 >> 2] = P2, c2[P2 + 8 >> 2] = E3, c2[P2 + 4 >> 2] = Ne, a3[P2 | 0] = 0, n4 = l2[C3 + 3 | 0], a3[P2 + 1 | 0] = 0, a3[P2 + 2 | 0] = 0, a3[P2 + 3 | 0] = n4, a3[P2 + 16 | 0] = l2[C3 + 44 | 0], a3[P2 + 17 | 0] = l2[C3 + 45 | 0], a3[P2 + 18 | 0] = l2[C3 + 46 | 0], a3[P2 + 19 | 0] = l2[C3 + 47 | 0], a3[P2 + 20 | 0] = l2[C3 + 48 | 0], a3[P2 + 21 | 0] = l2[C3 + 49 | 0], a3[P2 + 22 | 0] = l2[C3 + 50 | 0], a3[P2 + 23 | 0] = l2[C3 + 51 | 0], X = P2 + 8 | 0, Z = P2 + 4 | 0;
                                                                                                                                                      Ba: switch (n4 | 0) {
                                                                                                                                                        case 0:
                                                                                                                                                          break Ba;
                                                                                                                                                        case 1:
                                                                                                                                                          break ya;
                                                                                                                                                        case 2:
                                                                                                                                                          break za;
                                                                                                                                                        default:
                                                                                                                                                          break Aa;
                                                                                                                                                      }
                                                                                                                                                      if (!Bd(P2)) break xa;
                                                                                                                                                      if (j2 = ua(Z, X), c2[g3 + 212 >> 2] = j2, !c2[j2 + 16 >> 2]) break wa;
                                                                                                                                                      if (n4 = c2[Z >> 2], !n4) break fa;
                                                                                                                                                      for (G = c2[X >> 2] & 2147483647, n4 = n4 - 1 | 0, U = n4 >>> 3 | 0, Q = (n4 & 7) + 1 | 0, n4 = 0, f3 = 0, y3 = 0, b3 = 0, k2 = 0, r4 = 0; ; ) {
                                                                                                                                                        w3 = f3, F = n4;
                                                                                                                                                        Ca: {
                                                                                                                                                          Da: {
                                                                                                                                                            if ((k2 | 0) != (G | 0)) {
                                                                                                                                                              if (ja(g3 + 404 | 0, j2, k2), n4 = c2[g3 + 408 >> 2], f3 = c2[g3 + 404 >> 2], l2[P2 + 1 | 0] != 1) {
                                                                                                                                                                v3 = r4;
                                                                                                                                                                break Da;
                                                                                                                                                              }
                                                                                                                                                              if (l2[A2 | 0]) break wa;
                                                                                                                                                              if (!Ue) break fa;
                                                                                                                                                              if (v3 = 0, S3 = ka(A2, Oe), (S3 | 0) == (r4 | 0)) break Da;
                                                                                                                                                              c2[g3 + 332 >> 2] = n4, c2[g3 + 328 >> 2] = f3, c2[g3 + 224 >> 2] = F, c2[g3 + 220 >> 2] = w3, v3 = c2[g3 + 332 >> 2], c2[g3 + 40 >> 2] = c2[g3 + 328 >> 2], c2[g3 + 44 >> 2] = v3, v3 = c2[g3 + 224 >> 2], c2[g3 + 32 >> 2] = c2[g3 + 220 >> 2], c2[g3 + 36 >> 2] = v3, Ca(g3 + 40 | 0, g3 + 32 | 0), r4 ^= S3;
                                                                                                                                                              break Ca;
                                                                                                                                                            }
                                                                                                                                                            c2[g3 + 212 >> 2] = 0;
                                                                                                                                                            break va;
                                                                                                                                                          }
                                                                                                                                                          Ea: {
                                                                                                                                                            Fa: {
                                                                                                                                                              Ga: {
                                                                                                                                                                if (k2 >>> 0 <= 1) {
                                                                                                                                                                  if (z = 0, D3 = 0, S3 = (k2 | 0) != 1, !S3) {
                                                                                                                                                                    if (!F) break fa;
                                                                                                                                                                    D3 = l2[w3 | 0];
                                                                                                                                                                  }
                                                                                                                                                                  for (y3 = D3 & 240; (z | 0) != (U | 0); ) {
                                                                                                                                                                    if (!S3) {
                                                                                                                                                                      if (r4 = z + 1 | 0, r4 >>> 0 >= F >>> 0) break fa;
                                                                                                                                                                      D3 = l2[r4 + w3 | 0] | D3 << 8;
                                                                                                                                                                    }
                                                                                                                                                                    for (r4 = 7, O3 = 0; (r4 | 0) >= 0; ) {
                                                                                                                                                                      if (l2[A2 | 0]) break wa;
                                                                                                                                                                      if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                      b3 = y3 << 1, x3 = ka(A2, b3 + K | 0), y3 = x3 | (D3 >>> r4 & 16 | b3 & 63470), O3 = x3 << r4 | O3, r4 = r4 - 1 | 0;
                                                                                                                                                                    }
                                                                                                                                                                    if ((n4 | 0) == (z | 0)) break fa;
                                                                                                                                                                    a3[f3 + z | 0] = O3, z = z + 1 | 0;
                                                                                                                                                                  }
                                                                                                                                                                  for (x3 = D3 << 8, r4 = 0, O3 = 0; ; ) {
                                                                                                                                                                    if ((r4 | 0) == (Q | 0)) break Ga;
                                                                                                                                                                    if (l2[A2 | 0]) break wa;
                                                                                                                                                                    if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                    S3 = y3 << 1, B = ka(A2, S3 + K | 0), b3 = 7 - r4 | 0, y3 = B | (x3 >>> b3 & 16 | S3 & 63470), O3 = B << b3 | O3, r4 = r4 + 1 | 0;
                                                                                                                                                                  }
                                                                                                                                                                }
                                                                                                                                                                if (!y3 | !F | (n4 >>> 0 < U >>> 0 | U >>> 0 > F - 1 >>> 0) | U >>> 0 > y3 - 1 >>> 0) break fa;
                                                                                                                                                                for (D3 = l2[w3 | 0], z = l2[b3 | 0] << 6, y3 = D3 & 240 | z & 14336, L = f3 + U | 0, S3 = w3, x3 = f3; ; ) {
                                                                                                                                                                  Ha: {
                                                                                                                                                                    if (B = z << 8, (x3 | 0) == (L | 0)) break Ha;
                                                                                                                                                                    for (S3 = S3 + 1 | 0, D3 = l2[S3 | 0] | D3 << 8, b3 = b3 + 1 | 0, z = B | l2[b3 | 0] << 6, r4 = 7, O3 = 0; (r4 | 0) >= 0; ) {
                                                                                                                                                                      if (l2[A2 | 0]) break wa;
                                                                                                                                                                      if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                      y3 <<= 1, B = ka(A2, y3 + K | 0), y3 = B | (D3 >>> r4 & 16 | (z >>> r4 & 2048 | y3 & 63470)), O3 = B << r4 | O3, r4 = r4 - 1 | 0;
                                                                                                                                                                    }
                                                                                                                                                                    a3[x3 | 0] = O3, x3 = x3 + 1 | 0;
                                                                                                                                                                    continue;
                                                                                                                                                                  }
                                                                                                                                                                  break;
                                                                                                                                                                }
                                                                                                                                                                for (S3 = D3 << 8, O3 = 0, I = 0; ; ) {
                                                                                                                                                                  if ((O3 | 0) == (Q | 0)) break Fa;
                                                                                                                                                                  if (l2[A2 | 0]) break wa;
                                                                                                                                                                  if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                  b3 = y3 << 1, r4 = ka(A2, b3 + K | 0), x3 = 7 - O3 | 0, I = r4 << x3 | I, y3 = r4 | (S3 >>> x3 & 16 | (B >>> x3 & 2048 | b3 & 63470)), O3 = O3 + 1 | 0;
                                                                                                                                                                }
                                                                                                                                                              }
                                                                                                                                                              if (n4 >>> 0 <= U >>> 0) break fa;
                                                                                                                                                              a3[f3 + U | 0] = O3;
                                                                                                                                                              break Ea;
                                                                                                                                                            }
                                                                                                                                                            if (n4 >>> 0 <= U >>> 0) break fa;
                                                                                                                                                            a3[L | 0] = I;
                                                                                                                                                          }
                                                                                                                                                          r4 = v3;
                                                                                                                                                        }
                                                                                                                                                        k2 = k2 + 1 | 0, y3 = F, b3 = w3;
                                                                                                                                                      }
                                                                                                                                                    }
                                                                                                                                                    if (Aa(V, A2, g3 + 328 | 0), r4 = c2[g3 + 328 >> 2], r4 >>> 0 >= 2) {
                                                                                                                                                      if (F = xa(6), c2[g3 + 220 >> 2] = F, k2 = xa(8), c2[g3 + 212 >> 2] = k2, w3 = xa(11), c2[g3 + 376 >> 2] = w3, y3 = xa(15), c2[g3 + 372 >> 2] = y3, x3 = xa(15), c2[g3 + 368 >> 2] = x3, S3 = xa(15), c2[g3 + 364 >> 2] = S3, b3 = xa(15), c2[g3 + 360 >> 2] = b3, v3 = xa(1), c2[g3 + 356 >> 2] = v3, L = Qb(), c2[g3 + 352 >> 2] = L, n4 = l2[C3 | 0], c2[L + 20 >> 2] = 1, c2[L + 16 >> 2] = r4, c2[L + 12 >> 2] = E3, c2[L + 8 >> 2] = Ne, a3[L + 1 | 0] = 1, a3[L | 0] = n4, n4 = c2[C3 + 4 >> 2] + R | 0, c2[L + 24 >> 2] = n4, B = Kb(g3 + 404 | 0, n4), n4 = c2[C3 + 4 >> 2], r4 = c2[C3 + 16 >> 2], n4 >>> 0 > c2[C3 + 20 >> 2] - r4 >> 2 >>> 0) break fa;
                                                                                                                                                      for (G = c2[B >> 2], zd(r4, n4, G, c2[g3 + 408 >> 2] - G >> 2), f3 = c2[Ie >> 2], n4 = 0; ; ) if ((n4 | 0) == (R | 0)) {
                                                                                                                                                        if ($a(L + 124 | 0, B), s2[L + 4 >> 1] = 0, c2[L + 136 >> 2] = 0, c2[L + 140 >> 2] = 1, a3[L + 3 | 0] = 0, c2[L + 172 >> 2] = v3, c2[L + 168 >> 2] = b3, c2[L + 164 >> 2] = S3, c2[L + 160 >> 2] = x3, c2[L + 156 >> 2] = y3, c2[L + 152 >> 2] = w3, c2[L + 148 >> 2] = k2, c2[L + 144 >> 2] = F, a3[L + 2 | 0] = l2[C3 + 2 | 0], a3[L + 176 | 0] = l2[C3 + 52 | 0], a3[L + 177 | 0] = l2[C3 + 53 | 0], a3[L + 178 | 0] = l2[C3 + 54 | 0], a3[L + 179 | 0] = l2[C3 + 55 | 0], n4 = Ed(L, A2, Re, Me, Ve), c2[g3 + 348 >> 2] = 0, oa(g3 + 388 | 0, n4), la(g3 + 348 | 0), n4 = c2[g3 + 388 >> 2], va(B), qc(g3 + 352 | 0), pa(g3 + 356 | 0), pa(g3 + 360 | 0), pa(g3 + 364 | 0), pa(g3 + 368 | 0), pa(g3 + 372 | 0), pa(g3 + 376 | 0), pa(g3 + 212 | 0), pa(g3 + 220 | 0), !n4) break ta;
                                                                                                                                                        break ua;
                                                                                                                                                      } else {
                                                                                                                                                        r4 = n4 << 2, c2[(r4 + G | 0) + (c2[C3 + 4 >> 2] << 2) >> 2] = c2[r4 + f3 >> 2], n4 = n4 + 1 | 0;
                                                                                                                                                        continue;
                                                                                                                                                      }
                                                                                                                                                    }
                                                                                                                                                    if (n4 = 0, (r4 | 0) != 1) break ua;
                                                                                                                                                    if (n4 = c2[C3 + 4 >> 2], Ac(c2[Ve + 36 >> 2], A2, g3 + 404 | 0), f3 = c2[g3 + 404 >> 2], f3 >>> 0 >= n4 + R >>> 0) break ta;
                                                                                                                                                    if (n4 = c2[C3 + 4 >> 2], n4 >>> 0 > f3 >>> 0) n4 = c2[Pe >> 2] + (f3 << 2) | 0;
                                                                                                                                                    else {
                                                                                                                                                      if (n4 = f3 - n4 | 0, r4 = c2[Ie >> 2], n4 >>> 0 >= c2[Ie + 4 >> 2] - r4 >> 2 >>> 0) break fa;
                                                                                                                                                      n4 = r4 + (n4 << 2) | 0;
                                                                                                                                                    }
                                                                                                                                                    if (r4 = c2[n4 >> 2], !r4 || (Aa(c2[Ve + 28 >> 2], A2, g3 + 220 | 0), Aa(c2[Ve + 32 >> 2], A2, g3 + 212 | 0), f3 = kb(), c2[g3 + 376 >> 2] = f3, c2[f3 + 8 >> 2] = E3, c2[f3 + 4 >> 2] = Ne, n4 = l2[C3 + 2 | 0], c2[f3 + 20 >> 2] = r4, a3[f3 | 0] = n4, c2[f3 + 12 >> 2] = c2[g3 + 220 >> 2], n4 = c2[g3 + 212 >> 2], a3[f3 + 1 | 0] = 0, c2[f3 + 16 >> 2] = n4, a3[f3 + 24 | 0] = l2[C3 + 52 | 0], a3[f3 + 25 | 0] = l2[C3 + 53 | 0], a3[f3 + 26 | 0] = l2[C3 + 54 | 0], a3[f3 + 27 | 0] = l2[C3 + 55 | 0], n4 = jb(f3, A2, Re, Me), c2[g3 + 372 >> 2] = 0, oa(g3 + 388 | 0, n4), la(g3 + 372 | 0), n4 = c2[g3 + 388 >> 2], Ua(g3 + 376 | 0), !n4)) break ta;
                                                                                                                                                    break ua;
                                                                                                                                                  }
                                                                                                                                                  Ia: {
                                                                                                                                                    Ja: {
                                                                                                                                                      if (Hb(P2)) {
                                                                                                                                                        if (j2 = ua(Z, X), c2[g3 + 212 >> 2] = j2, !c2[j2 + 16 >> 2]) break Ja;
                                                                                                                                                        if (n4 = c2[Z >> 2], !n4) break fa;
                                                                                                                                                        for (n4 = n4 - 1 | 0, B = n4 >>> 3 | 0, G = (n4 & 7) + 1 | 0, y3 = 0, v3 = 0, f3 = 0, r4 = 0; ; ) {
                                                                                                                                                          Ka: {
                                                                                                                                                            La: {
                                                                                                                                                              if (d2[X >> 2] > f3 >>> 0) {
                                                                                                                                                                if (ja(g3 + 404 | 0, j2, f3), x3 = c2[g3 + 408 >> 2], b3 = c2[g3 + 404 >> 2], l2[P2 + 1 | 0] != 1) {
                                                                                                                                                                  S3 = r4;
                                                                                                                                                                  break La;
                                                                                                                                                                }
                                                                                                                                                                if (l2[A2 | 0]) break Ja;
                                                                                                                                                                if (!He) break fa;
                                                                                                                                                                if (S3 = 0, w3 = ka(A2, Te), (w3 | 0) == (r4 | 0)) break La;
                                                                                                                                                                c2[g3 + 332 >> 2] = x3, c2[g3 + 328 >> 2] = b3, c2[g3 + 224 >> 2] = y3, c2[g3 + 220 >> 2] = v3, n4 = c2[g3 + 332 >> 2], c2[g3 + 8 >> 2] = c2[g3 + 328 >> 2], c2[g3 + 12 >> 2] = n4, n4 = c2[g3 + 224 >> 2], c2[g3 >> 2] = c2[g3 + 220 >> 2], c2[g3 + 4 >> 2] = n4, Ca(g3 + 8 | 0, g3), r4 ^= w3;
                                                                                                                                                                break Ka;
                                                                                                                                                              }
                                                                                                                                                              c2[g3 + 212 >> 2] = 0;
                                                                                                                                                              break Ia;
                                                                                                                                                            }
                                                                                                                                                            r4 = 0, D3 = 0;
                                                                                                                                                            Ma: {
                                                                                                                                                              if (!f3) {
                                                                                                                                                                Na: {
                                                                                                                                                                  for (; ; ) {
                                                                                                                                                                    if (y3 = 7, O3 = 0, (D3 | 0) == (B | 0)) break Na;
                                                                                                                                                                    Oa: {
                                                                                                                                                                      for (; (y3 | 0) >= 0; ) {
                                                                                                                                                                        if (l2[A2 | 0]) break Oa;
                                                                                                                                                                        if (r4 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                        n4 = r4 << 1, v3 = ka(A2, n4 + K | 0), r4 = v3 | n4 & 1006, O3 = v3 << y3 | O3, y3 = y3 - 1 | 0;
                                                                                                                                                                      }
                                                                                                                                                                      if ((x3 | 0) == (D3 | 0)) break fa;
                                                                                                                                                                      a3[b3 + D3 | 0] = O3, D3 = D3 + 1 | 0;
                                                                                                                                                                      continue;
                                                                                                                                                                    }
                                                                                                                                                                    break;
                                                                                                                                                                  }
                                                                                                                                                                  if (D3 >>> 0 < B >>> 0) break Ja;
                                                                                                                                                                }
                                                                                                                                                                for (y3 = 0, O3 = 0; ; ) {
                                                                                                                                                                  if ((y3 | 0) == (G | 0)) break Ma;
                                                                                                                                                                  if (l2[A2 | 0]) break Ja;
                                                                                                                                                                  if (r4 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                  n4 = r4 << 1, v3 = ka(A2, n4 + K | 0), r4 = v3 | n4 & 1006, O3 = v3 << 7 - y3 | O3, y3 = y3 + 1 | 0;
                                                                                                                                                                }
                                                                                                                                                              }
                                                                                                                                                              if (!y3) break fa;
                                                                                                                                                              for (w3 = y3 - 1 | 0, D3 = l2[v3 | 0], y3 = D3 >>> 1 & 112, k2 = 0; ; ) {
                                                                                                                                                                Pa: {
                                                                                                                                                                  if ((k2 | 0) != (B | 0)) {
                                                                                                                                                                    if ((w3 | 0) == (k2 | 0)) break fa;
                                                                                                                                                                    for (n4 = k2 + 1 | 0, D3 = l2[n4 + v3 | 0] | D3 << 8, r4 = 7, O3 = 0; ; ) {
                                                                                                                                                                      if ((r4 | 0) < 0) break Pa;
                                                                                                                                                                      if (l2[A2 | 0]) break Ja;
                                                                                                                                                                      if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                      y3 <<= 1, F = ka(A2, y3 + K | 0), y3 = F | (D3 >>> r4 + 1 & 16 | y3 & 1006), O3 = F << r4 | O3, r4 = r4 - 1 | 0;
                                                                                                                                                                    }
                                                                                                                                                                  }
                                                                                                                                                                  for (v3 = D3 << 8, r4 = 0, O3 = 0; (r4 | 0) != (G | 0); ) {
                                                                                                                                                                    if (l2[A2 | 0]) break Ja;
                                                                                                                                                                    if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                    n4 = y3 << 1, w3 = ka(A2, n4 + K | 0), y3 = w3 | (v3 >>> 8 - r4 & 16 | n4 & 1006), O3 = w3 << 7 - r4 | O3, r4 = r4 + 1 | 0;
                                                                                                                                                                  }
                                                                                                                                                                  break Ma;
                                                                                                                                                                }
                                                                                                                                                                if ((x3 | 0) == (k2 | 0)) break fa;
                                                                                                                                                                a3[b3 + k2 | 0] = O3, k2 = n4;
                                                                                                                                                              }
                                                                                                                                                            }
                                                                                                                                                            if (x3 >>> 0 <= B >>> 0) break fa;
                                                                                                                                                            a3[b3 + B | 0] = O3, r4 = S3;
                                                                                                                                                          }
                                                                                                                                                          f3 = f3 + 1 | 0, y3 = x3, v3 = b3;
                                                                                                                                                        }
                                                                                                                                                      }
                                                                                                                                                      j2 = ua(Z, X), c2[g3 + 212 >> 2] = j2;
                                                                                                                                                      Qa: {
                                                                                                                                                        Ra: {
                                                                                                                                                          if (r4 = c2[j2 + 16 >> 2], !r4) break Ra;
                                                                                                                                                          for (y3 = c2[j2 + 12 >> 2]; (r4 | 0) > 0; ) a3[y3 | 0] = 0, r4 = r4 - 1 | 0, y3 = y3 + 1 | 0;
                                                                                                                                                          for (n4 = 0, k2 = 0, r4 = 0, Se = 0; ; ) {
                                                                                                                                                            Sa: {
                                                                                                                                                              Ta: {
                                                                                                                                                                if (d2[X >> 2] > Se >>> 0) {
                                                                                                                                                                  if (ja(g3 + 404 | 0, j2, Se), v3 = c2[g3 + 408 >> 2], f3 = c2[g3 + 404 >> 2], l2[P2 + 1 | 0] != 1) {
                                                                                                                                                                    w3 = r4;
                                                                                                                                                                    break Ta;
                                                                                                                                                                  }
                                                                                                                                                                  if (l2[A2 | 0]) break Ra;
                                                                                                                                                                  if (!He) break fa;
                                                                                                                                                                  if (w3 = 0, b3 = ka(A2, Te), (b3 | 0) == (r4 | 0)) break Ta;
                                                                                                                                                                  c2[g3 + 332 >> 2] = v3, c2[g3 + 328 >> 2] = f3, c2[g3 + 224 >> 2] = k2, c2[g3 + 220 >> 2] = n4, n4 = c2[g3 + 332 >> 2], c2[g3 + 24 >> 2] = c2[g3 + 328 >> 2], c2[g3 + 28 >> 2] = n4, n4 = c2[g3 + 224 >> 2], c2[g3 + 16 >> 2] = c2[g3 + 220 >> 2], c2[g3 + 20 >> 2] = n4, r4 ^= b3, Ca(g3 + 24 | 0, g3 + 16 | 0);
                                                                                                                                                                  break Sa;
                                                                                                                                                                }
                                                                                                                                                                c2[g3 + 212 >> 2] = 0;
                                                                                                                                                                break Qa;
                                                                                                                                                              }
                                                                                                                                                              for (I = 0, x3 = 0, b3 = 0, l2[P2 + 2 | 0] == 1 && (ja(g3 + 404 | 0, c2[P2 + 12 >> 2], Se), x3 = c2[g3 + 408 >> 2], b3 = c2[g3 + 404 >> 2]), ja(g3 + 404 | 0, j2, a3[P2 + 17 | 0] + Se | 0), G = c2[g3 + 408 >> 2], F = c2[g3 + 404 >> 2], y3 = c2[j2 + 20 >> 2], I = !k2 | (y3 | 0) < 2 ? I : l2[n4 | 0] >>> 6 & 1, I = !k2 | (y3 | 0) <= 0 ? I : l2[n4 | 0] >>> 6 & 2 | I, D3 = 0, r4 = 0; ; ) {
                                                                                                                                                                if (d2[Z >> 2] <= r4 >>> 0) {
                                                                                                                                                                  r4 = w3;
                                                                                                                                                                  break Sa;
                                                                                                                                                                }
                                                                                                                                                                Ua: {
                                                                                                                                                                  Va: {
                                                                                                                                                                    if (l2[P2 + 2 | 0] == 1 && ia(c2[c2[P2 + 12 >> 2] + 20 >> 2], r4, b3, x3)) break Va;
                                                                                                                                                                    if (S3 = ia(y3, a3[P2 + 16 | 0] + r4 | 0, F, G), l2[A2 | 0]) break Ra;
                                                                                                                                                                    if (S3 = I << 5 | S3 << 4 | D3, S3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                    if (S3 = ka(A2, K + (S3 << 1) | 0), y3 = c2[j2 + 20 >> 2], !S3) break Va;
                                                                                                                                                                    Ea(y3, r4, f3, v3, 1), y3 = c2[j2 + 20 >> 2], S3 = 1;
                                                                                                                                                                    break Ua;
                                                                                                                                                                  }
                                                                                                                                                                  S3 = 0;
                                                                                                                                                                }
                                                                                                                                                                I = ia(y3, r4 + 2 | 0, n4, k2) | I << 1 & 30, r4 = r4 + 1 | 0, D3 = D3 << 1 & 14 | S3;
                                                                                                                                                              }
                                                                                                                                                            }
                                                                                                                                                            Se = Se + 1 | 0, n4 = f3, k2 = v3;
                                                                                                                                                          }
                                                                                                                                                        }
                                                                                                                                                        j2 = 0;
                                                                                                                                                      }
                                                                                                                                                      break va;
                                                                                                                                                    }
                                                                                                                                                    j2 = 0;
                                                                                                                                                  }
                                                                                                                                                  break va;
                                                                                                                                                }
                                                                                                                                                Wa: {
                                                                                                                                                  Xa: {
                                                                                                                                                    if (Hb(P2)) {
                                                                                                                                                      if (j2 = ua(Z, X), c2[g3 + 212 >> 2] = j2, !c2[j2 + 16 >> 2]) break Xa;
                                                                                                                                                      if (n4 = c2[Z >> 2], !n4) break fa;
                                                                                                                                                      for (n4 = n4 - 1 | 0, U = n4 >>> 3 | 0, Q = (n4 & 7) + 1 | 0, G = c2[X >> 2], n4 = 0, f3 = 0, y3 = 0, b3 = 0, k2 = 0, r4 = 0; ; ) {
                                                                                                                                                        w3 = f3, F = n4;
                                                                                                                                                        Ya: {
                                                                                                                                                          Za: {
                                                                                                                                                            if ((k2 | 0) != (G | 0)) {
                                                                                                                                                              if (ja(g3 + 404 | 0, j2, k2), n4 = c2[g3 + 408 >> 2], f3 = c2[g3 + 404 >> 2], l2[P2 + 1 | 0] != 1) {
                                                                                                                                                                v3 = r4;
                                                                                                                                                                break Za;
                                                                                                                                                              }
                                                                                                                                                              if (l2[A2 | 0]) break Xa;
                                                                                                                                                              if (!Ye) break fa;
                                                                                                                                                              if (v3 = 0, S3 = ka(A2, Le), (S3 | 0) == (r4 | 0)) break Za;
                                                                                                                                                              c2[g3 + 332 >> 2] = n4, c2[g3 + 328 >> 2] = f3, c2[g3 + 224 >> 2] = F, c2[g3 + 220 >> 2] = w3, v3 = c2[g3 + 332 >> 2], c2[g3 + 104 >> 2] = c2[g3 + 328 >> 2], c2[g3 + 108 >> 2] = v3, v3 = c2[g3 + 224 >> 2], c2[g3 + 96 >> 2] = c2[g3 + 220 >> 2], c2[g3 + 100 >> 2] = v3, Ca(g3 + 104 | 0, g3 + 96 | 0), r4 ^= S3;
                                                                                                                                                              break Ya;
                                                                                                                                                            }
                                                                                                                                                            c2[g3 + 212 >> 2] = 0;
                                                                                                                                                            break Wa;
                                                                                                                                                          }
                                                                                                                                                          _a: {
                                                                                                                                                            $a: {
                                                                                                                                                              ab: {
                                                                                                                                                                if (k2 >>> 0 <= 1) {
                                                                                                                                                                  if (z = 0, D3 = 0, S3 = (k2 | 0) != 1, !S3) {
                                                                                                                                                                    if (!F) break fa;
                                                                                                                                                                    D3 = l2[w3 | 0];
                                                                                                                                                                  }
                                                                                                                                                                  for (y3 = D3 >>> 3 & 28; (z | 0) != (U | 0); ) {
                                                                                                                                                                    if (!S3) {
                                                                                                                                                                      if (r4 = z + 1 | 0, r4 >>> 0 >= F >>> 0) break fa;
                                                                                                                                                                      D3 = l2[r4 + w3 | 0] | D3 << 8;
                                                                                                                                                                    }
                                                                                                                                                                    for (r4 = 7, O3 = 0; (r4 | 0) >= 0; ) {
                                                                                                                                                                      if (l2[A2 | 0]) break Xa;
                                                                                                                                                                      if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                      b3 = y3 << 1, x3 = ka(A2, b3 + K | 0), y3 = x3 | (D3 >>> r4 + 3 & 4 | b3 & 890), O3 = x3 << r4 | O3, r4 = r4 - 1 | 0;
                                                                                                                                                                    }
                                                                                                                                                                    if ((n4 | 0) == (z | 0)) break fa;
                                                                                                                                                                    a3[f3 + z | 0] = O3, z = z + 1 | 0;
                                                                                                                                                                  }
                                                                                                                                                                  for (S3 = D3 << 8, r4 = 0, O3 = 0; ; ) {
                                                                                                                                                                    if ((r4 | 0) == (Q | 0)) break ab;
                                                                                                                                                                    if (l2[A2 | 0]) break Xa;
                                                                                                                                                                    if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                    b3 = y3 << 1, x3 = ka(A2, b3 + K | 0), y3 = x3 | (S3 >>> 10 - r4 & 4 | b3 & 890), O3 = x3 << 7 - r4 | O3, r4 = r4 + 1 | 0;
                                                                                                                                                                  }
                                                                                                                                                                }
                                                                                                                                                                if (!y3 | !F | (n4 >>> 0 < U >>> 0 | U >>> 0 > F - 1 >>> 0) | U >>> 0 > y3 - 1 >>> 0) break fa;
                                                                                                                                                                for (D3 = l2[w3 | 0], z = l2[b3 | 0] << 1, y3 = D3 >>> 3 & 28 | z & 384, L = f3 + U | 0, S3 = w3, x3 = f3; ; ) {
                                                                                                                                                                  bb: {
                                                                                                                                                                    if (B = z << 8, (x3 | 0) == (L | 0)) break bb;
                                                                                                                                                                    for (S3 = S3 + 1 | 0, D3 = l2[S3 | 0] | D3 << 8, b3 = b3 + 1 | 0, z = B | l2[b3 | 0] << 1, r4 = 7, O3 = 0; (r4 | 0) >= 0; ) {
                                                                                                                                                                      if (l2[A2 | 0]) break Xa;
                                                                                                                                                                      if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                      y3 <<= 1, B = ka(A2, y3 + K | 0), y3 = B | (D3 >>> r4 + 3 & 4 | (z >>> r4 & 128 | y3 & 890)), O3 = B << r4 | O3, r4 = r4 - 1 | 0;
                                                                                                                                                                    }
                                                                                                                                                                    a3[x3 | 0] = O3, x3 = x3 + 1 | 0;
                                                                                                                                                                    continue;
                                                                                                                                                                  }
                                                                                                                                                                  break;
                                                                                                                                                                }
                                                                                                                                                                for (x3 = D3 << 8, O3 = 0, I = 0; ; ) {
                                                                                                                                                                  if ((O3 | 0) == (Q | 0)) break $a;
                                                                                                                                                                  if (l2[A2 | 0]) break Xa;
                                                                                                                                                                  if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                  S3 = y3 << 1, b3 = ka(A2, S3 + K | 0), r4 = 7 - O3 | 0, I = b3 << r4 | I, y3 = b3 | (x3 >>> 10 - O3 & 4 | (B >>> r4 & 128 | S3 & 890)), O3 = O3 + 1 | 0;
                                                                                                                                                                }
                                                                                                                                                              }
                                                                                                                                                              if (n4 >>> 0 <= U >>> 0) break fa;
                                                                                                                                                              a3[f3 + U | 0] = O3;
                                                                                                                                                              break _a;
                                                                                                                                                            }
                                                                                                                                                            if (n4 >>> 0 <= U >>> 0) break fa;
                                                                                                                                                            a3[L | 0] = I;
                                                                                                                                                          }
                                                                                                                                                          r4 = v3;
                                                                                                                                                        }
                                                                                                                                                        k2 = k2 + 1 | 0, y3 = F, b3 = w3;
                                                                                                                                                      }
                                                                                                                                                    }
                                                                                                                                                    j2 = ua(Z, X), c2[g3 + 212 >> 2] = j2;
                                                                                                                                                    cb: {
                                                                                                                                                      db: {
                                                                                                                                                        if (r4 = c2[j2 + 16 >> 2], !r4) break db;
                                                                                                                                                        for (y3 = c2[j2 + 12 >> 2]; (r4 | 0) > 0; ) a3[y3 | 0] = 0, r4 = r4 - 1 | 0, y3 = y3 + 1 | 0;
                                                                                                                                                        for (b3 = 0, f3 = 0, v3 = 0, n4 = 0, r4 = 0, J = 0; ; ) {
                                                                                                                                                          eb: {
                                                                                                                                                            fb: {
                                                                                                                                                              if (d2[X >> 2] > J >>> 0) {
                                                                                                                                                                if (ja(g3 + 404 | 0, j2, J), k2 = c2[g3 + 408 >> 2], x3 = c2[g3 + 404 >> 2], l2[P2 + 1 | 0] != 1) {
                                                                                                                                                                  S3 = r4;
                                                                                                                                                                  break fb;
                                                                                                                                                                }
                                                                                                                                                                if (l2[A2 | 0]) break db;
                                                                                                                                                                if (!Ye) break fa;
                                                                                                                                                                if (S3 = 0, y3 = ka(A2, Le), (y3 | 0) == (r4 | 0)) break fb;
                                                                                                                                                                c2[g3 + 332 >> 2] = k2, c2[g3 + 328 >> 2] = x3, c2[g3 + 224 >> 2] = n4, c2[g3 + 220 >> 2] = v3, f3 = c2[g3 + 332 >> 2], c2[g3 + 120 >> 2] = c2[g3 + 328 >> 2], c2[g3 + 124 >> 2] = f3, f3 = c2[g3 + 224 >> 2], c2[g3 + 112 >> 2] = c2[g3 + 220 >> 2], c2[g3 + 116 >> 2] = f3, r4 ^= y3, Ca(g3 + 120 | 0, g3 + 112 | 0);
                                                                                                                                                                break eb;
                                                                                                                                                              }
                                                                                                                                                              c2[g3 + 212 >> 2] = 0;
                                                                                                                                                              break cb;
                                                                                                                                                            }
                                                                                                                                                            for (I = 0, Se = 0, w3 = 0, l2[P2 + 2 | 0] == 1 && (ja(g3 + 404 | 0, c2[P2 + 12 >> 2], J), Se = c2[g3 + 408 >> 2], w3 = c2[g3 + 404 >> 2]), ja(g3 + 404 | 0, j2, a3[P2 + 17 | 0] + J | 0), B = c2[g3 + 408 >> 2], G = c2[g3 + 404 >> 2], y3 = c2[j2 + 20 >> 2], I = !f3 | (y3 | 0) < 2 ? I : l2[b3 | 0] >>> 6 & 1, I = !f3 | (y3 | 0) <= 0 ? I : l2[b3 | 0] >>> 6 & 2 | I, D3 = 0, D3 = !n4 | (y3 | 0) < 2 ? D3 : l2[v3 | 0] >>> 6 & 1, D3 = !n4 | (y3 | 0) <= 0 ? D3 : l2[v3 | 0] >>> 6 & 2 | D3, z = 0, r4 = 0; ; ) {
                                                                                                                                                              if (d2[Z >> 2] <= r4 >>> 0) {
                                                                                                                                                                r4 = S3;
                                                                                                                                                                break eb;
                                                                                                                                                              }
                                                                                                                                                              gb: {
                                                                                                                                                                hb: {
                                                                                                                                                                  if (l2[P2 + 2 | 0] == 1 && ia(c2[c2[P2 + 12 >> 2] + 20 >> 2], r4, w3, Se)) break hb;
                                                                                                                                                                  if (l2[A2 | 0]) break db;
                                                                                                                                                                  if (y3 = D3 << 3 | I << 7 | ia(y3, a3[P2 + 16 | 0] + r4 | 0, G, B) << 2 | z, y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                  if (F = ka(A2, K + (y3 << 1) | 0), y3 = c2[j2 + 20 >> 2], !F) break hb;
                                                                                                                                                                  Ea(y3, r4, x3, k2, 1), y3 = c2[j2 + 20 >> 2], L = 1;
                                                                                                                                                                  break gb;
                                                                                                                                                                }
                                                                                                                                                                L = 0;
                                                                                                                                                              }
                                                                                                                                                              F = r4 + 2 | 0, I = ia(y3, F, b3, f3) | I << 1 & 6, D3 = ia(y3, F, v3, n4) | D3 << 1 & 14, r4 = r4 + 1 | 0, z = z << 1 & 2 | L;
                                                                                                                                                            }
                                                                                                                                                          }
                                                                                                                                                          J = J + 1 | 0, b3 = v3, f3 = n4, v3 = x3, n4 = k2;
                                                                                                                                                        }
                                                                                                                                                      }
                                                                                                                                                      j2 = 0;
                                                                                                                                                    }
                                                                                                                                                    break va;
                                                                                                                                                  }
                                                                                                                                                  j2 = 0;
                                                                                                                                                }
                                                                                                                                                break va;
                                                                                                                                              }
                                                                                                                                              ib: {
                                                                                                                                                jb: {
                                                                                                                                                  if (yd(P2)) {
                                                                                                                                                    if (j2 = ua(Z, X), c2[g3 + 212 >> 2] = j2, !c2[j2 + 16 >> 2]) break jb;
                                                                                                                                                    if (n4 = c2[Z >> 2], !n4) break fa;
                                                                                                                                                    for (n4 = n4 - 1 | 0, U = n4 >>> 3 | 0, Q = (n4 & 7) + 1 | 0, G = c2[X >> 2], n4 = 0, f3 = 0, y3 = 0, b3 = 0, k2 = 0, r4 = 0; ; ) {
                                                                                                                                                      w3 = f3, F = n4;
                                                                                                                                                      kb: {
                                                                                                                                                        lb: {
                                                                                                                                                          if ((k2 | 0) != (G | 0)) {
                                                                                                                                                            if (ja(g3 + 404 | 0, j2, k2), n4 = c2[g3 + 408 >> 2], f3 = c2[g3 + 404 >> 2], l2[P2 + 1 | 0] != 1) {
                                                                                                                                                              v3 = r4;
                                                                                                                                                              break lb;
                                                                                                                                                            }
                                                                                                                                                            if (l2[A2 | 0]) break jb;
                                                                                                                                                            if (!We) break fa;
                                                                                                                                                            if (v3 = 0, S3 = ka(A2, Fe), (S3 | 0) == (r4 | 0)) break lb;
                                                                                                                                                            c2[g3 + 332 >> 2] = n4, c2[g3 + 328 >> 2] = f3, c2[g3 + 224 >> 2] = F, c2[g3 + 220 >> 2] = w3, v3 = c2[g3 + 332 >> 2], c2[g3 + 72 >> 2] = c2[g3 + 328 >> 2], c2[g3 + 76 >> 2] = v3, v3 = c2[g3 + 224 >> 2], c2[g3 + 64 >> 2] = c2[g3 + 220 >> 2], c2[g3 + 68 >> 2] = v3, Ca(g3 + 72 | 0, g3 - -64 | 0), r4 ^= S3;
                                                                                                                                                            break kb;
                                                                                                                                                          }
                                                                                                                                                          c2[g3 + 212 >> 2] = 0;
                                                                                                                                                          break ib;
                                                                                                                                                        }
                                                                                                                                                        mb: {
                                                                                                                                                          nb: {
                                                                                                                                                            ob: {
                                                                                                                                                              if (k2 >>> 0 <= 1) {
                                                                                                                                                                if (z = 0, D3 = 0, S3 = (k2 | 0) != 1, !S3) {
                                                                                                                                                                  if (!F) break fa;
                                                                                                                                                                  D3 = l2[w3 | 0];
                                                                                                                                                                }
                                                                                                                                                                for (y3 = D3 >>> 1 & 120; (z | 0) != (U | 0); ) {
                                                                                                                                                                  if (!S3) {
                                                                                                                                                                    if (r4 = z + 1 | 0, r4 >>> 0 >= F >>> 0) break fa;
                                                                                                                                                                    D3 = l2[r4 + w3 | 0] | D3 << 8;
                                                                                                                                                                  }
                                                                                                                                                                  for (r4 = 7, O3 = 0; (r4 | 0) >= 0; ) {
                                                                                                                                                                    if (l2[A2 | 0]) break jb;
                                                                                                                                                                    if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                    b3 = y3 << 1, x3 = ka(A2, b3 + K | 0), y3 = x3 | (D3 >>> r4 + 1 & 8 | b3 & 7670), O3 = x3 << r4 | O3, r4 = r4 - 1 | 0;
                                                                                                                                                                  }
                                                                                                                                                                  if ((n4 | 0) == (z | 0)) break fa;
                                                                                                                                                                  a3[f3 + z | 0] = O3, z = z + 1 | 0;
                                                                                                                                                                }
                                                                                                                                                                for (S3 = D3 << 8, r4 = 0, O3 = 0; ; ) {
                                                                                                                                                                  if ((r4 | 0) == (Q | 0)) break ob;
                                                                                                                                                                  if (l2[A2 | 0]) break jb;
                                                                                                                                                                  if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                  b3 = y3 << 1, x3 = ka(A2, b3 + K | 0), y3 = x3 | (S3 >>> 8 - r4 & 8 | b3 & 7670), O3 = x3 << 7 - r4 | O3, r4 = r4 + 1 | 0;
                                                                                                                                                                }
                                                                                                                                                              }
                                                                                                                                                              if (!y3 | !F | (n4 >>> 0 < U >>> 0 | U >>> 0 > F - 1 >>> 0) | U >>> 0 > y3 - 1 >>> 0) break fa;
                                                                                                                                                              for (D3 = l2[w3 | 0], z = l2[b3 | 0] << 4, y3 = D3 >>> 1 & 120 | z & 3584, L = f3 + U | 0, S3 = w3, x3 = f3; ; ) {
                                                                                                                                                                pb: {
                                                                                                                                                                  if (B = z << 8, (x3 | 0) == (L | 0)) break pb;
                                                                                                                                                                  for (S3 = S3 + 1 | 0, D3 = l2[S3 | 0] | D3 << 8, b3 = b3 + 1 | 0, z = B | l2[b3 | 0] << 4, r4 = 7, O3 = 0; (r4 | 0) >= 0; ) {
                                                                                                                                                                    if (l2[A2 | 0]) break jb;
                                                                                                                                                                    if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                    y3 <<= 1, B = ka(A2, y3 + K | 0), y3 = B | (D3 >>> r4 + 1 & 8 | (z >>> r4 & 512 | y3 & 7670)), O3 = B << r4 | O3, r4 = r4 - 1 | 0;
                                                                                                                                                                  }
                                                                                                                                                                  a3[x3 | 0] = O3, x3 = x3 + 1 | 0;
                                                                                                                                                                  continue;
                                                                                                                                                                }
                                                                                                                                                                break;
                                                                                                                                                              }
                                                                                                                                                              for (x3 = D3 << 8, O3 = 0, I = 0; ; ) {
                                                                                                                                                                if ((O3 | 0) == (Q | 0)) break nb;
                                                                                                                                                                if (l2[A2 | 0]) break jb;
                                                                                                                                                                if (y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                S3 = y3 << 1, b3 = ka(A2, S3 + K | 0), r4 = 7 - O3 | 0, I = b3 << r4 | I, y3 = b3 | (x3 >>> 8 - O3 & 8 | (B >>> r4 & 512 | S3 & 7670)), O3 = O3 + 1 | 0;
                                                                                                                                                              }
                                                                                                                                                            }
                                                                                                                                                            if (n4 >>> 0 <= U >>> 0) break fa;
                                                                                                                                                            a3[f3 + U | 0] = O3;
                                                                                                                                                            break mb;
                                                                                                                                                          }
                                                                                                                                                          if (n4 >>> 0 <= U >>> 0) break fa;
                                                                                                                                                          a3[L | 0] = I;
                                                                                                                                                        }
                                                                                                                                                        r4 = v3;
                                                                                                                                                      }
                                                                                                                                                      k2 = k2 + 1 | 0, y3 = F, b3 = w3;
                                                                                                                                                    }
                                                                                                                                                  }
                                                                                                                                                  j2 = ua(Z, X), c2[g3 + 212 >> 2] = j2;
                                                                                                                                                  qb: {
                                                                                                                                                    rb: {
                                                                                                                                                      if (r4 = c2[j2 + 16 >> 2], !r4) break rb;
                                                                                                                                                      for (y3 = c2[j2 + 12 >> 2]; (r4 | 0) > 0; ) a3[y3 | 0] = 0, r4 = r4 - 1 | 0, y3 = y3 + 1 | 0;
                                                                                                                                                      for (b3 = 0, v3 = 0, f3 = 0, n4 = 0, r4 = 0, J = 0; ; ) {
                                                                                                                                                        sb: {
                                                                                                                                                          tb: {
                                                                                                                                                            if (d2[X >> 2] > J >>> 0) {
                                                                                                                                                              if (ja(g3 + 404 | 0, j2, J), k2 = c2[g3 + 408 >> 2], x3 = c2[g3 + 404 >> 2], l2[P2 + 1 | 0] != 1) {
                                                                                                                                                                S3 = r4;
                                                                                                                                                                break tb;
                                                                                                                                                              }
                                                                                                                                                              if (l2[A2 | 0]) break rb;
                                                                                                                                                              if (!We) break fa;
                                                                                                                                                              if (S3 = 0, y3 = ka(A2, Fe), (y3 | 0) == (r4 | 0)) break tb;
                                                                                                                                                              c2[g3 + 332 >> 2] = k2, c2[g3 + 328 >> 2] = x3, c2[g3 + 224 >> 2] = n4, c2[g3 + 220 >> 2] = f3, v3 = c2[g3 + 332 >> 2], c2[g3 + 88 >> 2] = c2[g3 + 328 >> 2], c2[g3 + 92 >> 2] = v3, v3 = c2[g3 + 224 >> 2], c2[g3 + 80 >> 2] = c2[g3 + 220 >> 2], c2[g3 + 84 >> 2] = v3, r4 ^= y3, Ca(g3 + 88 | 0, g3 + 80 | 0);
                                                                                                                                                              break sb;
                                                                                                                                                            }
                                                                                                                                                            c2[g3 + 212 >> 2] = 0;
                                                                                                                                                            break qb;
                                                                                                                                                          }
                                                                                                                                                          for (I = 0, Se = 0, w3 = 0, l2[P2 + 2 | 0] == 1 && (ja(g3 + 404 | 0, c2[P2 + 12 >> 2], J), Se = c2[g3 + 408 >> 2], w3 = c2[g3 + 404 >> 2]), ja(g3 + 404 | 0, j2, a3[P2 + 17 | 0] + J | 0), B = c2[g3 + 408 >> 2], G = c2[g3 + 404 >> 2], y3 = c2[j2 + 20 >> 2], I = !v3 | (y3 | 0) < 3 ? I : l2[b3 | 0] >>> 5 & 1, I = !v3 | (y3 | 0) < 2 ? I : l2[b3 | 0] >>> 5 & 2 | I, I = !v3 | (y3 | 0) <= 0 ? I : l2[b3 | 0] >>> 5 & 4 | I, D3 = 0, D3 = !n4 | (y3 | 0) < 3 ? D3 : l2[f3 | 0] >>> 5 & 1, D3 = !n4 | (y3 | 0) < 2 ? D3 : l2[f3 | 0] >>> 5 & 2 | D3, D3 = !n4 | (y3 | 0) <= 0 ? D3 : l2[f3 | 0] >>> 5 & 4 | D3, z = 0, r4 = 0; ; ) {
                                                                                                                                                            if (d2[Z >> 2] <= r4 >>> 0) {
                                                                                                                                                              r4 = S3;
                                                                                                                                                              break sb;
                                                                                                                                                            }
                                                                                                                                                            ub: {
                                                                                                                                                              vb: {
                                                                                                                                                                if (l2[P2 + 2 | 0] == 1 && ia(c2[c2[P2 + 12 >> 2] + 20 >> 2], r4, w3, Se)) break vb;
                                                                                                                                                                if (l2[A2 | 0]) break rb;
                                                                                                                                                                if (y3 = D3 << 4 | I << 9 | ia(y3, a3[P2 + 16 | 0] + r4 | 0, G, B) << 3 | z, y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                                if (F = ka(A2, K + (y3 << 1) | 0), y3 = c2[j2 + 20 >> 2], !F) break vb;
                                                                                                                                                                Ea(y3, r4, x3, k2, 1), y3 = c2[j2 + 20 >> 2], L = 1;
                                                                                                                                                                break ub;
                                                                                                                                                              }
                                                                                                                                                              L = 0;
                                                                                                                                                            }
                                                                                                                                                            F = r4 + 3 | 0, I = ia(y3, F, b3, v3) | I << 1 & 14, D3 = ia(y3, F, f3, n4) | D3 << 1 & 30, r4 = r4 + 1 | 0, z = z << 1 & 6 | L;
                                                                                                                                                          }
                                                                                                                                                        }
                                                                                                                                                        J = J + 1 | 0, b3 = f3, v3 = n4, f3 = x3, n4 = k2;
                                                                                                                                                      }
                                                                                                                                                    }
                                                                                                                                                    j2 = 0;
                                                                                                                                                  }
                                                                                                                                                  break va;
                                                                                                                                                }
                                                                                                                                                j2 = 0;
                                                                                                                                              }
                                                                                                                                              break va;
                                                                                                                                            }
                                                                                                                                            j2 = ua(Z, X), c2[g3 + 212 >> 2] = j2;
                                                                                                                                            wb: {
                                                                                                                                              xb: {
                                                                                                                                                if (r4 = c2[j2 + 16 >> 2], !r4) break xb;
                                                                                                                                                for (y3 = c2[j2 + 12 >> 2]; (r4 | 0) > 0; ) a3[y3 | 0] = 0, r4 = r4 - 1 | 0, y3 = y3 + 1 | 0;
                                                                                                                                                for (x3 = 0, v3 = 0, n4 = 0, f3 = 0, r4 = 0, J = 0; ; ) {
                                                                                                                                                  yb: {
                                                                                                                                                    zb: {
                                                                                                                                                      if (d2[X >> 2] > J >>> 0) {
                                                                                                                                                        if (ja(g3 + 404 | 0, j2, J), k2 = c2[g3 + 408 >> 2], w3 = c2[g3 + 404 >> 2], l2[P2 + 1 | 0] != 1) {
                                                                                                                                                          b3 = r4;
                                                                                                                                                          break zb;
                                                                                                                                                        }
                                                                                                                                                        if (l2[A2 | 0]) break xb;
                                                                                                                                                        if (!Ue) break fa;
                                                                                                                                                        if (b3 = 0, S3 = ka(A2, Oe), (S3 | 0) == (r4 | 0)) break zb;
                                                                                                                                                        c2[g3 + 332 >> 2] = k2, c2[g3 + 328 >> 2] = w3, c2[g3 + 224 >> 2] = f3, c2[g3 + 220 >> 2] = n4, v3 = c2[g3 + 332 >> 2], c2[g3 + 56 >> 2] = c2[g3 + 328 >> 2], c2[g3 + 60 >> 2] = v3, v3 = c2[g3 + 224 >> 2], c2[g3 + 48 >> 2] = c2[g3 + 220 >> 2], c2[g3 + 52 >> 2] = v3, r4 ^= S3, Ca(g3 + 56 | 0, g3 + 48 | 0);
                                                                                                                                                        break yb;
                                                                                                                                                      }
                                                                                                                                                      c2[g3 + 212 >> 2] = 0;
                                                                                                                                                      break wb;
                                                                                                                                                    }
                                                                                                                                                    for (D3 = 0, S3 = 0, Se = 0, l2[P2 + 2 | 0] == 1 && (ja(g3 + 404 | 0, c2[P2 + 12 >> 2], J), Se = c2[g3 + 408 >> 2], S3 = c2[g3 + 404 >> 2]), r4 = g3 + 404 | 0, ja(r4, j2, a3[P2 + 17 | 0] + J | 0), _e = c2[g3 + 408 >> 2], Ce = c2[g3 + 404 >> 2], ja(r4, j2, a3[P2 + 19 | 0] + J | 0), O3 = c2[g3 + 408 >> 2], U = c2[g3 + 404 >> 2], ja(r4, j2, a3[P2 + 21 | 0] + J | 0), Q = c2[g3 + 408 >> 2], L = c2[g3 + 404 >> 2], ja(r4, j2, a3[P2 + 23 | 0] + J | 0), B = c2[g3 + 408 >> 2], G = c2[g3 + 404 >> 2], y3 = c2[j2 + 20 >> 2], D3 = !v3 | (y3 | 0) < 2 ? D3 : l2[x3 | 0] >>> 6 & 1, D3 = !v3 | (y3 | 0) <= 0 ? D3 : l2[x3 | 0] >>> 6 & 2 | D3, I = 0, I = !f3 | (y3 | 0) < 3 ? I : l2[n4 | 0] >>> 5 & 1, I = !f3 | (y3 | 0) < 2 ? I : l2[n4 | 0] >>> 5 & 2 | I, I = !f3 | (y3 | 0) <= 0 ? I : l2[n4 | 0] >>> 5 & 4 | I, z = 0, r4 = 0; ; ) {
                                                                                                                                                      if (d2[Z >> 2] <= r4 >>> 0) {
                                                                                                                                                        r4 = b3;
                                                                                                                                                        break yb;
                                                                                                                                                      }
                                                                                                                                                      Ab: {
                                                                                                                                                        Bb: {
                                                                                                                                                          if (l2[P2 + 2 | 0] == 1 && ia(c2[c2[P2 + 12 >> 2] + 20 >> 2], r4, S3, Se)) break Bb;
                                                                                                                                                          if (l2[A2 | 0]) break xb;
                                                                                                                                                          if (y3 = I << 5 | D3 << 12 | ia(y3, a3[P2 + 16 | 0] + r4 | 0, Ce, _e) << 4 | ia(y3, a3[P2 + 18 | 0] + r4 | 0, U, O3) << 10 | ia(y3, a3[P2 + 20 | 0] + r4 | 0, L, Q) << 11 | ia(y3, a3[P2 + 22 | 0] + r4 | 0, G, B) << 15 | z, y3 >>> 0 >= q >>> 0) break fa;
                                                                                                                                                          if (F = ka(A2, K + (y3 << 1) | 0), y3 = c2[j2 + 20 >> 2], !F) break Bb;
                                                                                                                                                          Ea(y3, r4, w3, k2, 1), y3 = c2[j2 + 20 >> 2], F = 1;
                                                                                                                                                          break Ab;
                                                                                                                                                        }
                                                                                                                                                        F = 0;
                                                                                                                                                      }
                                                                                                                                                      D3 = ia(y3, r4 + 2 | 0, x3, v3) | D3 << 1 & 6, I = ia(y3, r4 + 3 | 0, n4, f3) | I << 1 & 30, r4 = r4 + 1 | 0, z = z << 1 & 14 | F;
                                                                                                                                                    }
                                                                                                                                                  }
                                                                                                                                                  J = J + 1 | 0, x3 = n4, v3 = f3, n4 = w3, f3 = k2;
                                                                                                                                                }
                                                                                                                                              }
                                                                                                                                              j2 = 0;
                                                                                                                                            }
                                                                                                                                            break va;
                                                                                                                                          }
                                                                                                                                          j2 = 0;
                                                                                                                                        }
                                                                                                                                        if (la(g3 + 212 | 0), c2[g3 + 404 >> 2] = 0, oa(g3 + 388 | 0, j2), la(g3 + 404 | 0), n4 = c2[g3 + 388 >> 2], ta(g3 + 376 | 0), n4) break ua;
                                                                                                                                        break ta;
                                                                                                                                      }
                                                                                                                                      r4 = c2[Ie >> 2], c2[g3 + 388 >> 2] = 0, oa((R << 2) + r4 | 0, n4);
                                                                                                                                    }
                                                                                                                                    R = R + 1 | 0;
                                                                                                                                  }
                                                                                                                                  break ta;
                                                                                                                                }
                                                                                                                                c2[g3 + 412 >> 2] = 0, c2[g3 + 404 >> 2] = 0, c2[g3 + 408 >> 2] = 0, xd(g3 + 404 | 0, n4 + c2[C3 + 4 >> 2] | 0), S3 = c2[g3 + 404 >> 2], R = 0, n4 = 0, O3 = 0;
                                                                                                                                Cb: {
                                                                                                                                  for (; c2[C3 + 8 >> 2] + c2[C3 + 4 >> 2] >>> 0 > n4 >>> 0; ) {
                                                                                                                                    if (Aa(H, A2, g3 + 212 | 0), v3 = c2[g3 + 212 >> 2], r4 = v3 + n4 | 0, !(r4 >>> 0 <= c2[C3 + 8 >> 2] + c2[C3 + 4 >> 2] >>> 0 & r4 >>> 0 >= v3 >>> 0)) {
                                                                                                                                      n4 = 0;
                                                                                                                                      break Cb;
                                                                                                                                    }
                                                                                                                                    c2[g3 + 328 >> 2] = S3, c2[g3 + 332 >> 2] = 0, f3 = oc(g3 + 328 | 0, n4), wd(g3 + 220 | 0, c2[f3 >> 2], c2[f3 + 4 >> 2], v3, R), O3 = (R & 1 ? v3 : 0) + O3 | 0, R ^= 1, n4 = r4;
                                                                                                                                  }
                                                                                                                                  if (n4 = 0, d2[C3 + 12 >> 2] < O3 >>> 0) break Cb;
                                                                                                                                  for (n4 = nc(), b3 = c2[Ie >> 2], r4 = 0, R = 0; ; ) {
                                                                                                                                    if (f3 = c2[C3 + 4 >> 2], f3 + c2[C3 + 8 >> 2] >>> 0 <= r4 >>> 0) break Cb;
                                                                                                                                    if (!(!(c2[S3 + (r4 >>> 3 & 536870908) >> 2] >>> r4 & 1) | d2[C3 + 12 >> 2] <= R >>> 0)) {
                                                                                                                                      Db: {
                                                                                                                                        if (r4 >>> 0 < f3 >>> 0) {
                                                                                                                                          if (f3 = c2[c2[Pe >> 2] + (r4 << 2) >> 2], !f3) {
                                                                                                                                            f3 = 0;
                                                                                                                                            break Db;
                                                                                                                                          }
                                                                                                                                          f3 = mc(f3);
                                                                                                                                          break Db;
                                                                                                                                        }
                                                                                                                                        v3 = b3 + (r4 - f3 << 2) | 0, f3 = c2[v3 >> 2], c2[v3 >> 2] = 0;
                                                                                                                                      }
                                                                                                                                      ud(n4, f3), R = R + 1 | 0;
                                                                                                                                    }
                                                                                                                                    r4 = r4 + 1 | 0;
                                                                                                                                  }
                                                                                                                                }
                                                                                                                                lc(g3 + 404 | 0);
                                                                                                                                break sa;
                                                                                                                              }
                                                                                                                              la(g3 + 388 | 0), n4 = 0;
                                                                                                                            }
                                                                                                                            if (Za(Ie), rc(Ve), Ba(g3 + 392 | 0), Ba(g3 + 396 | 0), Ba(g3 + 400 | 0), Ba(g3 + 428 | 0), c2[g3 + 232 >> 2] = 0, Ib(T3 + 56 | 0, n4), Va(g3 + 232 | 0), c2[T3 + 56 >> 2]) {
                                                                                                                              sa(c2[e5 + 4 >> 2]), f3 = c2[e5 + 4 >> 2], n4 = c2[f3 + 8 >> 2], n4 >>> 0 <= 4294967293 && (r4 = n4 + 2 | 0, n4 = c2[f3 + 4 >> 2], c2[f3 + 8 >> 2] = n4 >>> 0 > r4 >>> 0 ? r4 : n4), ta(g3 + 344 | 0);
                                                                                                                              break $;
                                                                                                                            }
                                                                                                                            ta(g3 + 344 | 0);
                                                                                                                            break Z;
                                                                                                                          }
                                                                                                                          la(g3 + 388 | 0);
                                                                                                                        }
                                                                                                                        r4 = c2[g3 + 172 >> 2], n4 = c2[g3 + 176 >> 2], H = c2[e5 + 4 >> 2], _e = td(H), c2[g3 + 428 >> 2] = _e, Ce = cb(g3 + 416 | 0, c2[C3 + 8 >> 2]), c2[g3 + 412 >> 2] = 0, c2[g3 + 404 >> 2] = 0, c2[g3 + 408 >> 2] = 0, l2[C3 + 1 | 0] || Rb(g3 + 404 | 0, c2[C3 + 8 >> 2]), U = r4, b3 = n4 - r4 >> 1, c2[g3 + 400 >> 2] = 0, c2[g3 + 396 >> 2] = 0, v3 = 0, E3 = 0;
                                                                                                                        Eb: {
                                                                                                                          for (; d2[C3 + 8 >> 2] > E3 >>> 0; ) {
                                                                                                                            if (ya(_e, c2[C3 + 28 >> 2], g3 + 212 | 0) || (v3 = c2[g3 + 212 >> 2] + v3 | 0, c2[g3 + 400 >> 2] = v3, v3 >>> 0 > 65535)) break ba;
                                                                                                                            for (R = 0, c2[g3 + 392 >> 2] = 0, S3 = 0, r4 = E3; ; ) {
                                                                                                                              Fb: {
                                                                                                                                n4 = ya(_e, c2[C3 + 32 >> 2], g3 + 388 | 0), c2[g3 + 384 >> 2] = n4;
                                                                                                                                Gb: switch (n4 | 0) {
                                                                                                                                  case 0:
                                                                                                                                    break Gb;
                                                                                                                                  case 1:
                                                                                                                                    break Fb;
                                                                                                                                  default:
                                                                                                                                    break ca;
                                                                                                                                }
                                                                                                                                if (d2[C3 + 8 >> 2] <= r4 >>> 0 || (R = c2[g3 + 388 >> 2] + R | 0, R >>> 0 > 65535)) break ca;
                                                                                                                                S3 = S3 + R | 0;
                                                                                                                                Hb: {
                                                                                                                                  if (!R | !v3) break Hb;
                                                                                                                                  if (l2[C3 + 1 | 0] == 1) {
                                                                                                                                    if (ya(_e, c2[C3 + 40 >> 2], g3 + 380 | 0)) break ca;
                                                                                                                                    oa(g3 + 396 | 0, 0), f3 = c2[g3 + 380 >> 2];
                                                                                                                                    Ib: {
                                                                                                                                      if (f3 >>> 0 >= 2) {
                                                                                                                                        if (L = xa(6), c2[g3 + 376 >> 2] = L, B = xa(8), c2[g3 + 372 >> 2] = B, G = xa(11), c2[g3 + 368 >> 2] = G, Me = xa(15), c2[g3 + 364 >> 2] = Me, F = xa(15), c2[g3 + 360 >> 2] = F, k2 = xa(15), c2[g3 + 356 >> 2] = k2, w3 = xa(15), c2[g3 + 352 >> 2] = w3, x3 = xa(1), c2[g3 + 348 >> 2] = x3, V = Qb(), c2[g3 + 344 >> 2] = V, n4 = l2[C3 | 0], c2[V + 20 >> 2] = 1, c2[V + 16 >> 2] = f3, c2[V + 12 >> 2] = v3, c2[V + 8 >> 2] = R, a3[V + 1 | 0] = 1, a3[V | 0] = n4, n4 = c2[C3 + 4 >> 2], y3 = n4 + r4 | 0, c2[V + 24 >> 2] = y3, f3 = ib(n4 + c2[C3 + 8 >> 2] | 0), c2[g3 + 336 >> 2] = 0, c2[g3 + 328 >> 2] = 0, c2[g3 + 332 >> 2] = 0, n4 = g3 + 328 | 0, c2[g3 + 232 >> 2] = n4, y3) {
                                                                                                                                          for (f3 = f3 >>> 0 <= 1 ? 1 : f3, Kd(n4, y3), n4 = c2[g3 + 332 >> 2], y3 = y3 + n4 | 0; (n4 | 0) != (y3 | 0); ) a3[n4 | 0] = f3, n4 = n4 + 1 | 0;
                                                                                                                                          c2[g3 + 332 >> 2] = y3;
                                                                                                                                        }
                                                                                                                                        if (a3[g3 + 236 | 0] = 1, f3 = g3 + 232 | 0, gc(f3), n4 = c2[g3 + 328 >> 2], n4 = tc(f3, n4, c2[g3 + 332 >> 2] - n4 | 0), Id(V + 28 | 0, n4), Oa(n4), O3 = Kb(f3, c2[V + 24 >> 2]), n4 = c2[C3 + 4 >> 2], f3 = c2[C3 + 16 >> 2], n4 >>> 0 > c2[C3 + 20 >> 2] - f3 >> 2 >>> 0) break ea;
                                                                                                                                        for (Q = c2[O3 >> 2], zd(f3, n4, Q, c2[g3 + 236 >> 2] - Q >> 2), y3 = c2[Ce >> 2], n4 = 0; ; ) if ((n4 | 0) == (r4 | 0)) {
                                                                                                                                          if ($a(V + 124 | 0, O3), s2[V + 4 >> 1] = 0, c2[V + 136 >> 2] = 0, c2[V + 140 >> 2] = 1, a3[V + 3 | 0] = 0, c2[V + 172 >> 2] = x3, c2[V + 168 >> 2] = w3, c2[V + 164 >> 2] = k2, c2[V + 160 >> 2] = F, c2[V + 156 >> 2] = Me, c2[V + 152 >> 2] = G, c2[V + 148 >> 2] = B, c2[V + 144 >> 2] = L, a3[V + 2 | 0] = l2[C3 + 2 | 0], a3[V + 176 | 0] = l2[C3 + 52 | 0], a3[V + 177 | 0] = l2[C3 + 53 | 0], a3[V + 178 | 0] = l2[C3 + 54 | 0], a3[V + 179 | 0] = l2[C3 + 55 | 0], n4 = Gd(V, H, U, b3), c2[g3 + 228 >> 2] = 0, oa(g3 + 396 | 0, n4), la(g3 + 228 | 0), n4 = c2[g3 + 396 >> 2], va(O3), va(g3 + 328 | 0), qc(g3 + 344 | 0), pa(g3 + 348 | 0), pa(g3 + 352 | 0), pa(g3 + 356 | 0), pa(g3 + 360 | 0), pa(g3 + 364 | 0), pa(g3 + 368 | 0), pa(g3 + 372 | 0), pa(g3 + 376 | 0), n4) break Ib;
                                                                                                                                          break ca;
                                                                                                                                        } else {
                                                                                                                                          f3 = n4 << 2, c2[(f3 + Q | 0) + (c2[C3 + 4 >> 2] << 2) >> 2] = c2[f3 + y3 >> 2], n4 = n4 + 1 | 0;
                                                                                                                                          continue;
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                      if ((f3 | 0) != 1) {
                                                                                                                                        y3 = c2[Ce >> 2], n4 = c2[g3 + 396 >> 2];
                                                                                                                                        break Ib;
                                                                                                                                      }
                                                                                                                                      if (f3 = c2[C3 + 4 >> 2], n4 = c2[C3 + 8 >> 2], c2[g3 + 232 >> 2] = 0, n4 = ib(n4 + f3 | 0), Fa(H, n4 >>> 0 <= 1 ? 1 : n4, g3 + 232 | 0) || (f3 = c2[g3 + 232 >> 2], n4 = c2[C3 + 4 >> 2], f3 >>> 0 >= n4 + r4 >>> 0)) break ca;
                                                                                                                                      if (y3 = c2[Ce >> 2], n4 >>> 0 > f3 >>> 0) n4 = c2[Pe >> 2] + (f3 << 2) | 0;
                                                                                                                                      else {
                                                                                                                                        if (n4 = f3 - n4 | 0, n4 >>> 0 >= c2[Ce + 4 >> 2] - y3 >> 2 >>> 0) break ea;
                                                                                                                                        n4 = (n4 << 2) + y3 | 0;
                                                                                                                                      }
                                                                                                                                      if (f3 = c2[n4 >> 2], !f3) break ca;
                                                                                                                                      x3 = xa(15), c2[g3 + 328 >> 2] = x3, n4 = xa(1), c2[g3 + 376 >> 2] = n4;
                                                                                                                                      Jb: {
                                                                                                                                        Kb: {
                                                                                                                                          if (ya(_e, x3, g3 + 372 | 0) || ya(_e, x3, g3 + 368 | 0)) break Kb;
                                                                                                                                          if (!ya(_e, n4, g3 + 384 | 0)) break Jb;
                                                                                                                                        }
                                                                                                                                        c2[g3 + 392 >> 2] = S3, pa(g3 + 376 | 0), pa(g3 + 328 | 0);
                                                                                                                                        break ba;
                                                                                                                                      }
                                                                                                                                      if (sa(H), w3 = c2[H + 8 >> 2], x3 = kb(), c2[g3 + 364 >> 2] = x3, c2[x3 + 8 >> 2] = v3, c2[x3 + 4 >> 2] = R, n4 = l2[C3 + 2 | 0], c2[x3 + 20 >> 2] = f3, a3[x3 | 0] = n4, c2[x3 + 12 >> 2] = c2[g3 + 372 >> 2], n4 = c2[g3 + 368 >> 2], f3 = 0, a3[x3 + 1 | 0] = 0, c2[x3 + 16 >> 2] = n4, a3[x3 + 24 | 0] = l2[C3 + 52 | 0], a3[x3 + 25 | 0] = l2[C3 + 53 | 0], a3[x3 + 26 | 0] = l2[C3 + 54 | 0], a3[x3 + 27 | 0] = l2[C3 + 55 | 0], n4 = Na(H), c2[g3 + 360 >> 2] = n4, n4 = jb(x3, n4, U, b3), c2[g3 + 356 >> 2] = 0, oa(g3 + 396 | 0, n4), la(g3 + 356 | 0), n4 = c2[g3 + 396 >> 2], n4 && (sa(H), f3 = c2[H + 8 >> 2], f3 >>> 0 <= 4294967293 && (x3 = f3 + 2 | 0, f3 = c2[H + 4 >> 2], f3 = f3 >>> 0 > x3 >>> 0 ? x3 : f3, c2[H + 8 >> 2] = f3), f3 = c2[g3 + 384 >> 2] == (f3 - w3 | 0)), ta(g3 + 360 | 0), Ua(g3 + 364 | 0), pa(g3 + 376 | 0), pa(g3 + 328 | 0), !f3) break ca;
                                                                                                                                    }
                                                                                                                                    if (c2[g3 + 396 >> 2] = 0, oa((r4 << 2) + y3 | 0, n4), l2[C3 + 1 | 0]) break Hb;
                                                                                                                                  }
                                                                                                                                  c2[c2[g3 + 404 >> 2] + (r4 << 2) >> 2] = R;
                                                                                                                                }
                                                                                                                                r4 = r4 + 1 | 0;
                                                                                                                                continue;
                                                                                                                              }
                                                                                                                              break;
                                                                                                                            }
                                                                                                                            if (c2[g3 + 392 >> 2] = S3, !l2[C3 + 1 | 0]) {
                                                                                                                              if (ya(_e, c2[C3 + 36 >> 2], g3 + 232 | 0)) break ba;
                                                                                                                              sa(H), c2[g3 + 328 >> 2] = 0;
                                                                                                                              Lb: {
                                                                                                                                if (!c2[g3 + 232 >> 2]) {
                                                                                                                                  if ((S3 | 0) > 65535 || (x3 = S3 + 7 >>> 3 | 0, n4 = ze(x3, 0, v3, 0), N)) break Eb;
                                                                                                                                  if (S3 = c2[H + 4 >> 2], f3 = c2[H + 8 >> 2], S3 >>> 0 < f3 >>> 0) break fa;
                                                                                                                                  if (n4 >>> 0 > S3 - f3 >>> 0) break Eb;
                                                                                                                                  for (R = 0, n4 = ua(g3 + 392 | 0, g3 + 400 | 0), c2[g3 + 388 >> 2] = 0, oa(g3 + 328 | 0, n4), la(g3 + 388 | 0), O3 = c2[g3 + 328 >> 2]; ; ) {
                                                                                                                                    if ((v3 | 0) == (R | 0)) break Lb;
                                                                                                                                    if (ja(g3 + 220 | 0, O3, R), f3 = c2[H + 8 >> 2], n4 = c2[H + 4 >> 2], f3 >>> 0 > n4 >>> 0 | x3 >>> 0 > n4 - f3 >>> 0 | x3 >>> 0 > d2[g3 + 224 >> 2]) break fa;
                                                                                                                                    x3 && (x3 && p(c2[g3 + 220 >> 2], c2[H >> 2] + f3 | 0, x3), f3 = c2[H + 8 >> 2]), n4 = f3, f3 = f3 + x3 | 0, n4 >>> 0 <= f3 >>> 0 && (n4 = c2[H + 4 >> 2], c2[H + 8 >> 2] = n4 >>> 0 > f3 >>> 0 ? f3 : n4), R = R + 1 | 0;
                                                                                                                                  }
                                                                                                                                }
                                                                                                                                n4 = lb(), c2[g3 + 388 >> 2] = n4, c2[n4 + 8 >> 2] = v3, c2[n4 + 4 >> 2] = S3, a3[n4 | 0] = 1, db(n4, g3 + 328 | 0, H), sa(H), ta(g3 + 388 | 0), O3 = c2[g3 + 328 >> 2];
                                                                                                                              }
                                                                                                                              Mb: {
                                                                                                                                if (!O3) break Mb;
                                                                                                                                for (k2 = r4 >>> 0 < E3 >>> 0 ? E3 : r4, w3 = c2[Ce >> 2], n4 = 0, y3 = c2[g3 + 404 >> 2]; ; ) {
                                                                                                                                  if ((E3 | 0) == (k2 | 0)) break Mb;
                                                                                                                                  x3 = E3 << 2, S3 = x3 + y3 | 0, f3 = nb(O3, n4, 0, c2[S3 >> 2], v3), c2[g3 + 388 >> 2] = 0, oa(x3 + w3 | 0, f3), E3 = E3 + 1 | 0, la(g3 + 388 | 0), n4 = c2[S3 >> 2] + n4 | 0;
                                                                                                                                }
                                                                                                                              }
                                                                                                                              la(g3 + 328 | 0);
                                                                                                                            }
                                                                                                                            E3 = r4;
                                                                                                                          }
                                                                                                                          for (b3 = xa(1), c2[g3 + 392 >> 2] = b3, c2[g3 + 240 >> 2] = 0, c2[g3 + 232 >> 2] = 0, c2[g3 + 236 >> 2] = 0, xd(g3 + 232 | 0, c2[C3 + 8 >> 2] + c2[C3 + 4 >> 2] | 0), S3 = c2[g3 + 232 >> 2], r4 = 0, n4 = 0, y3 = 0; c2[C3 + 8 >> 2] + c2[C3 + 4 >> 2] >>> 0 > n4 >>> 0; ) {
                                                                                                                            Nb: {
                                                                                                                              Ob: {
                                                                                                                                if (ya(_e, b3, g3 + 388 | 0) || (x3 = c2[g3 + 388 >> 2], f3 = x3 + n4 | 0, f3 >>> 0 < x3 >>> 0)) break Ob;
                                                                                                                                if (f3 >>> 0 <= c2[C3 + 8 >> 2] + c2[C3 + 4 >> 2] >>> 0) break Nb;
                                                                                                                              }
                                                                                                                              n4 = 0;
                                                                                                                              break da;
                                                                                                                            }
                                                                                                                            c2[g3 + 328 >> 2] = S3, c2[g3 + 332 >> 2] = 0, v3 = oc(g3 + 328 | 0, n4), wd(g3 + 212 | 0, c2[v3 >> 2], c2[v3 + 4 >> 2], x3, r4), y3 = (r4 & 1 ? x3 : 0) + y3 | 0, r4 ^= 1, n4 = f3;
                                                                                                                          }
                                                                                                                          if (n4 = 0, d2[C3 + 12 >> 2] < y3 >>> 0) break da;
                                                                                                                          for (n4 = nc(), b3 = c2[Ce >> 2], r4 = 0, R = 0; ; ) {
                                                                                                                            if (f3 = c2[C3 + 4 >> 2], f3 + c2[C3 + 8 >> 2] >>> 0 <= r4 >>> 0) break da;
                                                                                                                            if (!(!(c2[S3 + (r4 >>> 3 & 536870908) >> 2] >>> r4 & 1) | d2[C3 + 12 >> 2] <= R >>> 0)) {
                                                                                                                              Pb: {
                                                                                                                                if (r4 >>> 0 < f3 >>> 0) {
                                                                                                                                  if (f3 = c2[c2[Pe >> 2] + (r4 << 2) >> 2], !f3) {
                                                                                                                                    f3 = 0;
                                                                                                                                    break Pb;
                                                                                                                                  }
                                                                                                                                  f3 = mc(f3);
                                                                                                                                  break Pb;
                                                                                                                                }
                                                                                                                                v3 = b3 + (r4 - f3 << 2) | 0, f3 = c2[v3 >> 2], c2[v3 >> 2] = 0;
                                                                                                                              }
                                                                                                                              ud(n4, f3), R = R + 1 | 0;
                                                                                                                            }
                                                                                                                            r4 = r4 + 1 | 0;
                                                                                                                          }
                                                                                                                        }
                                                                                                                        la(g3 + 328 | 0);
                                                                                                                        break ba;
                                                                                                                      }
                                                                                                                      o();
                                                                                                                    }
                                                                                                                    c2[g3 + 392 >> 2] = S3, o();
                                                                                                                  }
                                                                                                                  lc(g3 + 232 | 0), pa(g3 + 392 | 0);
                                                                                                                  break aa;
                                                                                                                }
                                                                                                                c2[g3 + 392 >> 2] = S3;
                                                                                                              }
                                                                                                              n4 = 0;
                                                                                                            }
                                                                                                            if (la(g3 + 396 | 0), va(g3 + 404 | 0), Za(Ce), Ua(g3 + 428 | 0), c2[g3 + 232 >> 2] = 0, Ib(T3 + 56 | 0, n4), Va(g3 + 232 | 0), !c2[T3 + 56 >> 2]) break Z;
                                                                                                            sa(c2[e5 + 4 >> 2]);
                                                                                                          }
                                                                                                          if (l2[e5 + 48 | 0] != 1) break _;
                                                                                                          for (Ze = g3, Qe = Dd(c2[T3 + 56 >> 2]), c2[Ze + 232 >> 2] = Qe, n4 = c2[e5 + 108 >> 2], r4 = c2[n4 + 8 >> 2]; r4 >>> 0 >= 2; ) b3 = c2[n4 >> 2], v3 = c2[b3 >> 2], f3 = c2[b3 + 4 >> 2], c2[v3 + 4 >> 2] = f3, c2[f3 >> 2] = v3, c2[n4 + 8 >> 2] = c2[n4 + 8 >> 2] - 1, pc(b3), r4 = r4 - 1 | 0, n4 = c2[e5 + 108 >> 2];
                                                                                                          r4 = n4, n4 = g3 + 232 | 0, Cd(r4, g3 + 152 | 0, n4), Va(n4);
                                                                                                        }
                                                                                                        if (r4 = 0, !(l2[g3 + 211 | 0] & 2) || (Ke & 1 || (v3 = c2[T3 + 56 >> 2], c2[g3 + 140 >> 2] = c2[g3 + 184 >> 2], f3 = c2[g3 + 188 >> 2], n4 = c2[g3 + 192 >> 2], c2[g3 + 188 >> 2] = 0, c2[g3 + 192 >> 2] = 0, c2[g3 + 144 >> 2] = f3, c2[g3 + 148 >> 2] = n4, c2[g3 + 184 >> 2] = 0, n4 = g3 + 140 | 0, _a(v3, n4), Ha(n4)), !(W & 1))) break Y;
                                                                                                        v3 = c2[T3 + 56 >> 2], c2[g3 + 128 >> 2] = c2[g3 + 172 >> 2], f3 = c2[g3 + 176 >> 2], n4 = c2[g3 + 180 >> 2], c2[g3 + 176 >> 2] = 0, c2[g3 + 180 >> 2] = 0, c2[g3 + 132 >> 2] = f3, c2[g3 + 136 >> 2] = n4, c2[g3 + 172 >> 2] = 0, n4 = g3 + 128 | 0, _a(v3 + 12 | 0, n4), Ha(n4);
                                                                                                        break Y;
                                                                                                      }
                                                                                                      r4 = 1;
                                                                                                    }
                                                                                                    Ha(g3 + 172 | 0), Ha(g3 + 184 | 0);
                                                                                                  }
                                                                                                  va(Ge);
                                                                                                  break U;
                                                                                                } else {
                                                                                                  r4 = Ka(e5, c2[c2[T3 + 12 >> 2] + (n4 << 2) >> 2]), l2[r4 + 4 | 0] & 63 || (x3 = 0, b3 = 0, R & 1 ? (f3 = c2[r4 + 56 >> 2], v3 = c2[f3 + 28 >> 2] - c2[f3 + 24 >> 2] >> 2, f3 = v3 + y3 | 0, b3 = f3, f3 = f3 >>> 0 >= v3 >>> 0, b3 = f3 ? b3 : 0) : f3 = x3, R = f3, E3 = r4, y3 = b3), n4 = n4 + 1 | 0;
                                                                                                  continue;
                                                                                                }
                                                                                                if (f3 = n4 << 2, n4 = n4 + 1 | 0, !Ka(e5, c2[f3 + c2[T3 + 12 >> 2] >> 2])) break;
                                                                                              }
                                                                                            }
                                                                                            va(Pe), ma(C3);
                                                                                          }
                                                                                          M = g3 + 432 | 0, n4 = r4;
                                                                                          break u;
                                                                                        case 1:
                                                                                        case 2:
                                                                                        case 3:
                                                                                        case 5:
                                                                                          break B;
                                                                                        case 4:
                                                                                        case 6:
                                                                                        case 7:
                                                                                          break T;
                                                                                        default:
                                                                                          break G;
                                                                                      }
                                                                                      if (n4 = 1, l2[e5 + 49 | 0] != 1 || ob(e5, _3 + 120 | 0) || (b3 = _3 + 142 | 0, Sa(c2[e5 + 4 >> 2], b3)) || (r4 = c2[_3 + 120 >> 2], r4 - 1 >>> 0 > 65534) || (k2 = c2[_3 + 124 >> 2], k2 - 1 >>> 0 > 65534)) break u;
                                                                                      y3 = Qb(), c2[_3 + 116 >> 2] = y3, c2[y3 + 12 >> 2] = k2, c2[y3 + 8 >> 2] = r4, S3 = u2[_3 + 142 >> 1], v3 = S3 & 1, a3[y3 | 0] = v3, a3[y3 + 2 | 0] = S3 >>> 15, c2[y3 + 140 >> 2] = S3 >>> 4 & 3, c2[y3 + 136 >> 2] = S3 >>> 7 & 3, a3[y3 + 3 | 0] = S3 >>> 6 & 1, a3[y3 + 4 | 0] = S3 >>> 9 & 1, c2[y3 + 20 >> 2] = 1 << (S3 >>> 2 & 3), f3 = (S3 & 254) >>> 1 & 1, a3[y3 + 1 | 0] = f3, r4 = S3 >>> 10 & 31, a3[y3 + 5 | 0] = (r4 >>> 0 > 15 ? -32 : 0) | r4;
                                                                                      Qb: {
                                                                                        if (v3) {
                                                                                          if (Sa(c2[e5 + 4 >> 2], b3)) break v;
                                                                                          if (l2[y3 + 1 | 0] != 1) break w;
                                                                                          if (!l2[y3 + 2 | 0]) break Qb;
                                                                                          break w;
                                                                                        }
                                                                                        if (!f3 | S3 << 16 >> 16 < 0) break w;
                                                                                      }
                                                                                      for (v3 = y3 + 176 | 0, r4 = 0; ; ) {
                                                                                        if ((r4 | 0) == 4) break w;
                                                                                        if (f3 = r4 + v3 | 0, r4 = r4 + 1 | 0, wa(c2[e5 + 4 >> 2], f3)) break;
                                                                                      }
                                                                                      break v;
                                                                                    }
                                                                                    if (y3 = na(12), c2[y3 + 8 >> 2] = 0, c2[y3 >> 2] = 0, c2[y3 + 4 >> 2] = 0, wa(c2[e5 + 4 >> 2], _3 + 292 | 0)) break y;
                                                                                    if (n4 = 1, wa(c2[e5 + 4 >> 2], y3 + 1 | 0) || wa(c2[e5 + 4 >> 2], y3 + 2 | 0) || qa(c2[e5 + 4 >> 2], y3 + 4 | 0) || (x3 = c2[y3 + 4 >> 2], x3 >>> 0 > 65535)) break x;
                                                                                    if (r4 = l2[_3 + 292 | 0], n4 = r4 & 1, a3[y3 | 0] = n4, S3 = r4 >>> 1 & 3, a3[y3 + 8 | 0] = S3, c2[T3 + 52 >> 2] = 3, n4) {
                                                                                      if (n4 = c2[e5 + 4 >> 2], r4 = xc(y3), c2[_3 + 160 >> 2] = r4, r4) {
                                                                                        c2[_3 + 8 >> 2] = 0, db(r4, _3 + 8 | 0, n4);
                                                                                        Rb: {
                                                                                          if (b3 = c2[_3 + 8 >> 2], !b3) break Rb;
                                                                                          for (v3 = wc(x3 + 1 | 0), n4 = 0; ; ) {
                                                                                            if (n4 >>> 0 > x3 >>> 0) break Rb;
                                                                                            r4 = l2[y3 + 1 | 0], f3 = nb(b3, h2(r4, n4), 0, r4, l2[y3 + 2 | 0]), r4 = c2[v3 + 4 >> 2], c2[_3 + 256 >> 2] = 0, oa((n4 << 2) + r4 | 0, f3), n4 = n4 + 1 | 0, la(_3 + 256 | 0);
                                                                                          }
                                                                                        }
                                                                                        la(_3 + 8 | 0);
                                                                                      }
                                                                                      if (ta(_3 + 160 | 0), c2[_3 + 8 >> 2] = 0, Pb(T3 + 60 | 0, v3), Sb(_3 + 8 | 0), !c2[T3 + 60 >> 2]) break y;
                                                                                      sa(c2[e5 + 4 >> 2]), n4 = 0;
                                                                                      break x;
                                                                                    }
                                                                                    if (mb(_3 + 8 | 0, S3 ? (S3 | 0) == 1 ? 8192 : 1024 : 65536), f3 = Na(c2[e5 + 4 >> 2]), c2[_3 + 104 >> 2] = f3, n4 = c2[_3 + 8 >> 2], r4 = c2[_3 + 12 >> 2], w3 = xc(y3), c2[_3 + 256 >> 2] = w3, !w3) break z;
                                                                                    for (a3[w3 + 1 | 0] = 0, a3[w3 + 2 | 0] = 0, a3[w3 + 3 | 0] = S3, b3 = l2[y3 + 1 | 0], a3[w3 + 17 | 0] = 0, a3[w3 + 16 | 0] = 0 - b3, S3 || (s2[w3 + 22 >> 1] = 65278, s2[w3 + 18 >> 1] = 65533, s2[w3 + 20 >> 1] = 65026), c2[_3 + 120 >> 2] = 0, c2[_3 + 176 >> 2] = 0, c2[_3 + 168 >> 2] = n4, c2[_3 + 172 >> 2] = r4, c2[_3 + 164 >> 2] = f3, c2[_3 + 160 >> 2] = _3 + 120, n4 = Ob(w3, _3 + 160 | 0), c2[_3 + 176 >> 2] = 0; (n4 | 0) == 3; ) n4 = Nb(w3, _3 + 160 | 0);
                                                                                    if (c2[w3 + 44 >> 2] = 0, c2[w3 + 48 >> 2] = 0, c2[w3 + 36 >> 2] = 0, c2[w3 + 40 >> 2] = 0, c2[w3 + 28 >> 2] = 0, c2[w3 + 32 >> 2] = 0, !c2[_3 + 120 >> 2]) break A;
                                                                                    for (v3 = wc(x3 + 1 | 0), n4 = 0; ; ) {
                                                                                      if (n4 >>> 0 > x3 >>> 0) break A;
                                                                                      f3 = nb(c2[_3 + 120 >> 2], h2(n4, b3), 0, b3, l2[y3 + 2 | 0]), r4 = c2[v3 + 4 >> 2], c2[_3 + 148 >> 2] = 0, oa((n4 << 2) + r4 | 0, f3), n4 = n4 + 1 | 0, la(_3 + 148 | 0);
                                                                                    }
                                                                                  }
                                                                                  if (n4 = 1, l2[e5 + 49 | 0] != 1) break u;
                                                                                  W = na(56), c2[W + 16 >> 2] = 0;
                                                                                  Sb: {
                                                                                    if (ob(e5, _3 + 256 | 0) || wa(c2[e5 + 4 >> 2], _3 + 144 | 0) || (E3 = W + 32 | 0, qa(c2[e5 + 4 >> 2], E3)) || (y3 = W + 36 | 0, qa(c2[e5 + 4 >> 2], y3)) || qa(c2[e5 + 4 >> 2], W + 40 | 0) || qa(c2[e5 + 4 >> 2], W + 44 | 0) || Sa(c2[e5 + 4 >> 2], W + 48 | 0) || Sa(c2[e5 + 4 >> 2], W + 50 | 0) || (L = c2[E3 >> 2], L - 1 >>> 0 > 65534) || (B = c2[y3 >> 2], B - 1 >>> 0 > 65534) || (S3 = c2[_3 + 256 >> 2], S3 - 1 >>> 0 > 65534) || (_e = c2[_3 + 260 >> 2], _e - 1 >>> 0 > 65534) || (c2[W + 4 >> 2] = _e, c2[W >> 2] = S3, v3 = l2[_3 + 144 | 0], Fe = v3 & 1, a3[W + 8 | 0] = Fe, a3[W + 20 | 0] = v3 >>> 7, x3 = v3 >>> 3 | 0, Ue = x3 & 1, a3[W + 28 | 0] = Ue, Te = v3 >>> 1 & 3, a3[W + 9 | 0] = Te, f3 = v3 >>> 4 | 0, c2[W + 24 >> 2] = (f3 & 7) == 4 ? 4 : f3 & 3, c2[T3 + 8 >> 2] != 1) || (f3 = Ka(e5, c2[c2[T3 + 12 >> 2] >> 2]), !f3 | (l2[f3 + 4 | 0] & 63) != 16) || (f3 = c2[f3 + 60 >> 2], !f3) || (Oe = c2[f3 >> 2], !Oe)) break Sb;
                                                                                    c2[W + 12 >> 2] = Oe, c2[W + 16 >> 2] = f3 + 4, n4 = c2[c2[f3 + 4 >> 2] >> 2], b3 = c2[n4 + 20 >> 2], a3[W + 52 | 0] = b3, f3 = c2[n4 + 24 >> 2], a3[W + 53 | 0] = f3, c2[T3 + 52 >> 2] = 1;
                                                                                    Tb: {
                                                                                      Ub: {
                                                                                        Vb: {
                                                                                          if (v3 & 1) {
                                                                                            for (x3 = c2[e5 + 4 >> 2], n4 = 1; r4 = n4, n4 = n4 + 1 | 0, Oe >>> 0 > 1 << r4 >>> 0; ) ;
                                                                                            s2[_3 + 216 >> 1] = 0, c2[_3 + 172 >> 2] = 0, c2[_3 + 184 >> 2] = 0, c2[_3 + 188 >> 2] = 0, c2[_3 + 192 >> 2] = 0, c2[_3 + 196 >> 2] = 0, c2[_3 + 200 >> 2] = 0, c2[_3 + 204 >> 2] = 0, c2[_3 + 208 >> 2] = 0, c2[_3 + 220 >> 2] = 0, c2[_3 + 224 >> 2] = 0, c2[_3 + 228 >> 2] = 0, c2[_3 + 232 >> 2] = 0, c2[_3 + 236 >> 2] = 0, c2[_3 + 168 >> 2] = B, c2[_3 + 164 >> 2] = L, a3[_3 + 160 | 0] = Fe, f3 = r4 & 255, b3 = cb(_3 + 8 | 0, f3), v3 = c2[b3 >> 2], n4 = (v3 + (f3 << 2) | 0) - 4 | 0, db(_3 + 160 | 0, n4, x3), r4 = 0;
                                                                                            Wb: {
                                                                                              if (!c2[n4 >> 2]) break Wb;
                                                                                              for (sa(x3), n4 = c2[x3 + 8 >> 2], n4 >>> 0 <= 4294967292 && (r4 = n4 + 3 | 0, n4 = c2[x3 + 4 >> 2], c2[x3 + 8 >> 2] = n4 >>> 0 > r4 >>> 0 ? r4 : n4), n4 = f3 - 2 | 0; (n4 | 0) >= 0; ) {
                                                                                                if (S3 = v3 + (n4 << 2) | 0, db(_3 + 160 | 0, S3, x3), r4 = 0, !c2[S3 >> 2]) break Wb;
                                                                                                sa(x3), r4 = c2[x3 + 8 >> 2], r4 >>> 0 <= 4294967292 && (f3 = r4 + 3 | 0, r4 = c2[x3 + 4 >> 2], c2[x3 + 8 >> 2] = r4 >>> 0 > f3 >>> 0 ? f3 : r4), bb(c2[S3 >> 2], 0, 0, 0, 0, c2[S3 + 4 >> 2], 2), n4 = n4 - 1 | 0;
                                                                                              }
                                                                                              r4 = vc(W, b3);
                                                                                            }
                                                                                            if (Za(b3), c2[_3 + 120 >> 2] = 0, oa(T3 - -64 | 0, r4), la(_3 + 120 | 0), !c2[T3 + 64 >> 2]) break Tb;
                                                                                            sa(c2[e5 + 4 >> 2]);
                                                                                            break Vb;
                                                                                          }
                                                                                          mb(_3 + 148 | 0, Te ? (Te | 0) == 1 ? 8192 : 1024 : 65536), We = Na(c2[e5 + 4 >> 2]), c2[_3 + 300 >> 2] = We, O3 = c2[_3 + 148 >> 2], Ye = c2[_3 + 152 >> 2], v3 = 0, c2[_3 + 104 >> 2] = 0;
                                                                                          Xb: {
                                                                                            if (!(x3 & 1)) break Xb;
                                                                                            n4 = ua(E3, y3), c2[_3 + 160 >> 2] = 0, oa(_3 + 104 | 0, n4), n4 = f3 & 255, U = 1 - n4 | 0, Le = 0 - (n4 >>> 0 > 1) | 0, n4 = b3 & 255, Q = 1 - n4 | 0, Re = 0 - (n4 >>> 0 > 1) | 0, la(_3 + 160 | 0), y3 = _e, v3 = c2[_3 + 104 >> 2];
                                                                                            Yb: for (; ; ) {
                                                                                              if (!r4 & (w3 | 0) == (B | 0)) break Xb;
                                                                                              for (ja(_3 + 160 | 0, v3, w3), n4 = c2[W + 44 >> 2], G = u2[W + 48 >> 1], f3 = ze(w3, r4, G, 0), Ce = n4 + f3 | 0, n4 = N + (n4 >> 31) | 0, Me = f3 >>> 0 > Ce >>> 0 ? n4 + 1 | 0 : n4, f3 = c2[W + 40 >> 2], R = u2[W + 50 >> 1], n4 = ze(w3, r4, R, 0), F = f3 + n4 | 0, f3 = N + (f3 >> 31) | 0, C3 = n4 >>> 0 > F >>> 0 ? f3 + 1 | 0 : f3, x3 = 0, b3 = 0, E3 = c2[_3 + 164 >> 2], k2 = c2[_3 + 160 >> 2]; ; ) if (!b3 & (x3 | 0) == (L | 0)) {
                                                                                                n4 = r4, f3 = w3 + 1 | 0, n4 = f3 ? n4 : n4 + 1 | 0, w3 = f3, r4 = n4;
                                                                                                continue Yb;
                                                                                              } else {
                                                                                                Je = c2[v3 + 20 >> 2], n4 = ze(x3, b3, R, 0), f3 = Ce - n4 | 0, H = Me - (N + (n4 >>> 0 > Ce >>> 0) | 0) | 0, n4 = H >> 8, De = (H & 255) << 24 | f3 >>> 8, f3 = De, V = (n4 | 0) >= 0 & f3 >>> 0 >= y3 >>> 0 | (n4 | 0) > 0, H = ze(x3, b3, G, 0), He = H + F | 0, f3 = N + C3 | 0, f3 = H >>> 0 > He >>> 0 ? f3 + 1 | 0 : f3, H = f3 >> 8, f3 = (f3 & 255) << 24 | He >>> 8, De = (H | 0) <= (Re | 0) & Q >>> 0 > f3 >>> 0 | (H | 0) < (Re | 0) | ((n4 | 0) <= (Le | 0) & U >>> 0 > De >>> 0 | (n4 | 0) < (Le | 0)), n4 = H, n4 = (n4 | 0) > 0 ? 1 : (n4 | 0) >= 0 & f3 >>> 0 >= S3 >>> 0, Ea(Je, x3, k2, E3, De | n4 | V), x3 = x3 + 1 | 0, b3 = x3 ? b3 : b3 + 1 | 0;
                                                                                                continue;
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                          for (n4 = 1; r4 = n4, n4 = n4 + 1 | 0, Oe >>> 0 > 1 << r4 >>> 0; ) ;
                                                                                          c2[_3 + 184 >> 2] = 0, c2[_3 + 188 >> 2] = 0, s2[_3 + 216 >> 1] = 0, c2[_3 + 192 >> 2] = 0, c2[_3 + 196 >> 2] = 0, c2[_3 + 200 >> 2] = 0, c2[_3 + 204 >> 2] = 0, c2[_3 + 208 >> 2] = 0, c2[_3 + 220 >> 2] = 0, c2[_3 + 224 >> 2] = 0, c2[_3 + 228 >> 2] = 0, c2[_3 + 232 >> 2] = 0, c2[_3 + 236 >> 2] = 0, c2[_3 + 168 >> 2] = B, c2[_3 + 164 >> 2] = L, a3[_3 + 160 | 0] = Fe, c2[_3 + 172 >> 2] = v3, a3[_3 + 162 | 0] = Ue, a3[_3 + 161 | 0] = 0, a3[_3 + 163 | 0] = Te;
                                                                                          Zb: {
                                                                                            if (Te >>> 0 >= 2) {
                                                                                              s2[_3 + 176 >> 1] = 65282;
                                                                                              break Zb;
                                                                                            }
                                                                                            if (s2[_3 + 176 >> 1] = 65283, Te) break Zb;
                                                                                            s2[_3 + 182 >> 1] = 65278, s2[_3 + 178 >> 1] = 65533, s2[_3 + 180 >> 1] = 65026;
                                                                                          }
                                                                                          n4 = r4 & 255, S3 = cb(_3 + 120 | 0, n4), v3 = c2[S3 >> 2], r4 = n4 - 1 | 0, f3 = r4;
                                                                                          _b: {
                                                                                            $b: {
                                                                                              for (; (f3 | 0) >= 0; ) {
                                                                                                for (c2[_3 + 292 >> 2] = 0, c2[_3 + 24 >> 2] = 0, c2[_3 + 16 >> 2] = O3, c2[_3 + 20 >> 2] = Ye, c2[_3 + 12 >> 2] = We, c2[_3 + 8 >> 2] = _3 + 292, n4 = Ob(_3 + 160 | 0, _3 + 8 | 0), c2[_3 + 24 >> 2] = 0; (n4 | 0) == 3; ) n4 = Nb(_3 + 160 | 0, _3 + 8 | 0);
                                                                                                if (c2[_3 + 204 >> 2] = 0, c2[_3 + 208 >> 2] = 0, c2[_3 + 196 >> 2] = 0, c2[_3 + 200 >> 2] = 0, c2[_3 + 188 >> 2] = 0, c2[_3 + 192 >> 2] = 0, n4 = c2[_3 + 292 >> 2], !n4) break $b;
                                                                                                c2[_3 + 292 >> 2] = 0, b3 = v3 + (f3 << 2) | 0, oa(b3, n4), (r4 | 0) > (f3 | 0) && bb(c2[b3 >> 2], 0, 0, 0, 0, c2[b3 + 4 >> 2], 2), f3 = f3 - 1 | 0, la(_3 + 292 | 0);
                                                                                              }
                                                                                              n4 = vc(W, S3);
                                                                                              break _b;
                                                                                            }
                                                                                            la(_3 + 292 | 0), n4 = 0;
                                                                                          }
                                                                                          if (Za(S3), la(_3 + 104 | 0), c2[_3 + 160 >> 2] = 0, oa(T3 - -64 | 0, n4), la(_3 + 160 | 0), !c2[T3 + 64 >> 2]) break Ub;
                                                                                          sa(c2[e5 + 4 >> 2]), f3 = c2[e5 + 4 >> 2], n4 = c2[f3 + 8 >> 2], n4 >>> 0 <= 4294967293 && (r4 = n4 + 2 | 0, n4 = c2[f3 + 4 >> 2], c2[f3 + 8 >> 2] = n4 >>> 0 > r4 >>> 0 ? r4 : n4), ta(_3 + 300 | 0), Ja(_3 + 148 | 0);
                                                                                        }
                                                                                        if ((l2[T3 + 4 | 0] & 63) == 20) {
                                                                                          n4 = 0;
                                                                                          break Sb;
                                                                                        }
                                                                                        ac: {
                                                                                          if (l2[e5 + 50 | 0] || (f3 = c2[c2[e5 + 24 >> 2] - 4 >> 2], l2[f3 + 17 | 0] != 1) || (n4 = _e + c2[_3 + 268 >> 2] | 0, r4 = c2[e5 + 32 >> 2], (n4 | 0) <= c2[r4 + 24 >> 2])) break ac;
                                                                                          ab(r4, n4, l2[f3 + 16 | 0]);
                                                                                        }
                                                                                        n4 = c2[_3 + 264 >> 2], r4 = n4, v3 = n4 >> 31, n4 = c2[_3 + 268 >> 2], f3 = n4, b3 = n4 >> 31, n4 = l2[_3 + 272 | 0], bb(c2[e5 + 32 >> 2], r4, v3, f3, b3, c2[T3 + 64 >> 2], (n4 & 7) == 4 ? 4 : n4 & 3), n4 = 0, oa(T3 - -64 | 0, 0);
                                                                                        break Sb;
                                                                                      }
                                                                                      ta(_3 + 300 | 0), Ja(_3 + 148 | 0);
                                                                                    }
                                                                                    n4 = 1;
                                                                                  }
                                                                                  ma(W);
                                                                                  break u;
                                                                                }
                                                                                if (n4 = 1, l2[e5 + 49 | 0] != 1) break u;
                                                                                if (S3 = e5 + 76 | 0, r4 = c2[e5 + 76 >> 2], !r4) {
                                                                                  b3 = lb(), c2[_3 + 160 >> 2] = b3;
                                                                                  bc: {
                                                                                    cc: {
                                                                                      if (ob(e5, e5 + 88 | 0) || wa(c2[e5 + 4 >> 2], _3 + 8 | 0) || (f3 = c2[e5 + 92 >> 2], (f3 | 0) < 0) || (r4 = c2[e5 + 88 >> 2], (r4 | 0) < 0)) break cc;
                                                                                      if (c2[b3 + 8 >> 2] = f3, c2[b3 + 4 >> 2] = r4, v3 = l2[_3 + 8 | 0], r4 = v3 & 1, a3[b3 | 0] = r4, f3 = v3 >>> 1 & 3, a3[b3 + 3 | 0] = f3, a3[b3 + 1 | 0] = v3 >>> 3 & 1, r4) break bc;
                                                                                      if (v3 = b3 + 16 | 0, r4 = 0, !f3) for (; ; ) {
                                                                                        if ((r4 | 0) == 8) break bc;
                                                                                        if (f3 = r4 + v3 | 0, r4 = r4 + 1 | 0, wa(c2[e5 + 4 >> 2], f3)) break cc;
                                                                                      }
                                                                                      for (; ; ) {
                                                                                        if ((r4 | 0) == 2) break bc;
                                                                                        if (f3 = r4 + v3 | 0, r4 = r4 + 1 | 0, wa(c2[e5 + 4 >> 2], f3)) break;
                                                                                      }
                                                                                    }
                                                                                    ta(_3 + 160 | 0);
                                                                                    break u;
                                                                                  }
                                                                                  a3[b3 + 2 | 0] = 0, c2[_3 + 160 >> 2] = 0, Ra(S3, b3), ta(_3 + 160 | 0), r4 = c2[S3 >> 2];
                                                                                }
                                                                                c2[T3 + 52 >> 2] = 1;
                                                                                dc: {
                                                                                  if (l2[r4 | 0] == 1) {
                                                                                    if (db(r4, T3 - -64 | 0, c2[e5 + 4 >> 2]), !c2[T3 + 64 >> 2]) {
                                                                                      Ra(S3, 0);
                                                                                      break M;
                                                                                    }
                                                                                    sa(c2[e5 + 4 >> 2]);
                                                                                    break dc;
                                                                                  }
                                                                                  c2[e5 + 60 >> 2] == c2[e5 + 64 >> 2] && (n4 = l2[r4 + 3 | 0], fb(e5 + 60 | 0, n4 ? (n4 | 0) == 1 ? 8192 : 1024 : 65536)), b3 = e5 + 72 | 0, f3 = c2[e5 + 72 >> 2], f3 ? n4 = f3 : (r4 = Na(c2[e5 + 4 >> 2]), c2[_3 + 160 >> 2] = 0, Ra(b3, r4), ta(_3 + 160 | 0), n4 = c2[e5 + 72 >> 2]), c2[_3 + 164 >> 2] = n4, v3 = T3 - -64 | 0, c2[_3 + 160 >> 2] = v3, n4 = c2[e5 + 64 >> 2], r4 = c2[e5 + 60 >> 2], c2[_3 + 176 >> 2] = 0, c2[_3 + 168 >> 2] = r4, c2[_3 + 172 >> 2] = n4 - r4 >> 1, n4 = c2[e5 + 76 >> 2];
                                                                                  ec: {
                                                                                    if (!f3) {
                                                                                      n4 = Ob(n4, _3 + 160 | 0);
                                                                                      break ec;
                                                                                    }
                                                                                    n4 = Nb(n4, _3 + 160 | 0);
                                                                                  }
                                                                                  if (c2[e5 + 56 >> 2] = n4, (n4 | 0) == 3) {
                                                                                    if ((l2[T3 + 4 | 0] & 63) == 36) break B;
                                                                                    fc: {
                                                                                      if (l2[e5 + 50 | 0] || (f3 = c2[c2[e5 + 24 >> 2] - 4 >> 2], l2[f3 + 17 | 0] != 1) || (n4 = c2[e5 + 92 >> 2] + c2[e5 + 100 >> 2] | 0, r4 = c2[e5 + 32 >> 2], (n4 | 0) <= c2[r4 + 24 >> 2])) break fc;
                                                                                      ab(r4, n4, l2[f3 + 16 | 0]);
                                                                                    }
                                                                                    r4 = c2[e5 + 76 >> 2], n4 = c2[r4 + 64 >> 2] + c2[e5 + 96 >> 2] | 0, f3 = n4, x3 = n4 >> 31, n4 = c2[r4 + 68 >> 2] + c2[e5 + 100 >> 2] | 0, b3 = n4, y3 = n4 >> 31, n4 = l2[e5 + 104 | 0], uc(c2[e5 + 32 >> 2], f3, x3, b3, y3, c2[v3 >> 2], r4 - -64 | 0, (n4 & 7) == 4 ? 4 : n4 & 3);
                                                                                    break B;
                                                                                  }
                                                                                  if (n4 = c2[e5 + 76 >> 2], c2[n4 + 44 >> 2] = 0, c2[n4 + 48 >> 2] = 0, c2[n4 + 36 >> 2] = 0, c2[n4 + 40 >> 2] = 0, c2[n4 + 28 >> 2] = 0, c2[n4 + 32 >> 2] = 0, Ra(b3, 0), c2[e5 + 64 >> 2] = c2[e5 + 60 >> 2], !c2[v3 >> 2]) {
                                                                                    c2[e5 + 56 >> 2] = -1, Ra(S3, 0);
                                                                                    break M;
                                                                                  }
                                                                                  if (sa(c2[e5 + 4 >> 2]), f3 = c2[e5 + 4 >> 2], n4 = c2[f3 + 8 >> 2], n4 >>> 0 > 4294967293) break dc;
                                                                                  r4 = n4 + 2 | 0, n4 = c2[f3 + 4 >> 2], c2[f3 + 8 >> 2] = n4 >>> 0 > r4 >>> 0 ? r4 : n4;
                                                                                }
                                                                                if ((l2[T3 + 4 | 0] & 63) != 36) {
                                                                                  gc: {
                                                                                    if (l2[e5 + 50 | 0] || (f3 = c2[c2[e5 + 24 >> 2] - 4 >> 2], l2[f3 + 17 | 0] != 1) || (n4 = c2[e5 + 92 >> 2] + c2[e5 + 100 >> 2] | 0, r4 = c2[e5 + 32 >> 2], (n4 | 0) <= c2[r4 + 24 >> 2])) break gc;
                                                                                    ab(r4, n4, l2[f3 + 16 | 0]);
                                                                                  }
                                                                                  r4 = c2[e5 + 76 >> 2], n4 = c2[r4 + 64 >> 2] + c2[e5 + 96 >> 2] | 0, f3 = n4, b3 = n4 >> 31, n4 = c2[r4 + 68 >> 2] + c2[e5 + 100 >> 2] | 0, v3 = n4, x3 = n4 >> 31, n4 = l2[e5 + 104 | 0], uc(c2[e5 + 32 >> 2], f3, b3, v3, x3, c2[T3 + 64 >> 2], r4 - -64 | 0, (n4 & 7) == 4 ? 4 : n4 & 3), oa(T3 - -64 | 0, 0);
                                                                                }
                                                                                n4 = 0, Ra(S3, 0);
                                                                                break u;
                                                                              }
                                                                              if (n4 = 1, l2[e5 + 49 | 0] != 1 || ob(e5, _3 + 160 | 0) || wa(c2[e5 + 4 >> 2], _3 + 292 | 0) || (b3 = c2[_3 + 160 >> 2], b3 - 1 >>> 0 > 65534) || (S3 = c2[_3 + 164 >> 2], S3 - 1 >>> 0 > 65534)) break u;
                                                                              c2[_3 + 256 >> 2] = 0, x3 = kb(), c2[_3 + 120 >> 2] = x3, c2[x3 + 8 >> 2] = S3, c2[x3 + 4 >> 2] = b3, f3 = l2[_3 + 292 | 0], n4 = f3 & 1, a3[x3 | 0] = n4, a3[x3 + 1 | 0] = f3 >>> 1 & 1;
                                                                              hc: {
                                                                                ic: {
                                                                                  if (n4) break ic;
                                                                                  for (v3 = x3 + 24 | 0; ; ) {
                                                                                    if ((r4 | 0) == 4) break ic;
                                                                                    if (n4 = 1, f3 = r4 + v3 | 0, r4 = r4 + 1 | 0, wa(c2[e5 + 4 >> 2], f3)) break;
                                                                                  }
                                                                                  break hc;
                                                                                }
                                                                                v3 = c2[T3 + 8 >> 2];
                                                                                jc: {
                                                                                  if ((v3 | 0) > 0) {
                                                                                    for (r4 = 0, n4 = 1; ; ) {
                                                                                      if ((r4 | 0) == (v3 | 0) || (b3 = Ka(e5, c2[c2[T3 + 12 >> 2] >> 2]), !b3)) break hc;
                                                                                      if (f3 = l2[b3 + 4 | 0], f3 = (f3 << 6 | f3 >>> 2) & 207, !(1 << f3 & 1570 && f3 >>> 0 <= 10)) r4 = r4 + 1 | 0;
                                                                                      else break;
                                                                                    }
                                                                                    n4 = b3 - -64 | 0;
                                                                                    break jc;
                                                                                  }
                                                                                  r4 = nb(c2[e5 + 32 >> 2], c2[_3 + 168 >> 2], c2[_3 + 172 >> 2], b3, S3), c2[_3 + 8 >> 2] = 0, n4 = _3 + 256 | 0, oa(n4, r4), la(_3 + 8 | 0);
                                                                                }
                                                                                n4 = c2[n4 >> 2], c2[x3 + 12 >> 2] = 0, c2[x3 + 16 >> 2] = 0, c2[x3 + 20 >> 2] = n4, mb(_3 + 8 | 0, l2[x3 | 0] ? 1024 : 8192), r4 = Na(c2[e5 + 4 >> 2]), c2[_3 + 148 >> 2] = r4, c2[T3 + 52 >> 2] = 1, n4 = jb(x3, r4, c2[_3 + 8 >> 2], c2[_3 + 12 >> 2]), c2[_3 + 104 >> 2] = 0, v3 = T3 - -64 | 0, oa(v3, n4), la(_3 + 104 | 0), n4 = 1;
                                                                                kc: {
                                                                                  if (!c2[T3 + 64 >> 2] || (sa(c2[e5 + 4 >> 2]), f3 = c2[e5 + 4 >> 2], n4 = c2[f3 + 8 >> 2], n4 >>> 0 <= 4294967293 && (r4 = n4 + 2 | 0, n4 = c2[f3 + 4 >> 2], c2[f3 + 8 >> 2] = n4 >>> 0 > r4 >>> 0 ? r4 : n4), n4 = 0, (l2[T3 + 4 | 0] & 63) == 40)) break kc;
                                                                                  lc: {
                                                                                    if (l2[e5 + 50 | 0] || (f3 = c2[c2[e5 + 24 >> 2] - 4 >> 2], l2[f3 + 17 | 0] != 1) || (n4 = S3 + c2[_3 + 172 >> 2] | 0, r4 = c2[e5 + 32 >> 2], (n4 | 0) <= c2[r4 + 24 >> 2])) break lc;
                                                                                    ab(r4, n4, l2[f3 + 16 | 0]);
                                                                                  }
                                                                                  n4 = c2[_3 + 168 >> 2], r4 = n4, b3 = n4 >> 31, n4 = c2[_3 + 172 >> 2], f3 = n4, x3 = n4 >> 31, n4 = l2[_3 + 176 | 0], bb(c2[e5 + 32 >> 2], r4, b3, f3, x3, c2[v3 >> 2], (n4 & 7) == 4 ? 4 : n4 & 3), oa(v3, 0), n4 = 0;
                                                                                }
                                                                                ta(_3 + 148 | 0), Ja(_3 + 8 | 0);
                                                                              }
                                                                              Ua(_3 + 120 | 0), la(_3 + 256 | 0);
                                                                              break u;
                                                                            }
                                                                            x3 = na(20), c2[x3 + 16 >> 2] = 0, c2[x3 + 8 >> 2] = 0, c2[x3 + 12 >> 2] = 0, c2[x3 >> 2] = 0, c2[x3 + 4 >> 2] = 0, c2[_3 + 160 >> 2] = x3;
                                                                            mc: {
                                                                              if (qa(c2[e5 + 4 >> 2], x3) || qa(c2[e5 + 4 >> 2], x3 + 4 | 0) || qa(c2[e5 + 4 >> 2], x3 + 8 | 0) || qa(c2[e5 + 4 >> 2], x3 + 12 | 0) || wa(c2[e5 + 4 >> 2], _3 + 148 | 0) || Sa(c2[e5 + 4 >> 2], _3 + 120 | 0)) break mc;
                                                                              a3[x3 + 16 | 0] = l2[_3 + 148 | 0] >>> 2 & 1, f3 = u2[_3 + 120 >> 1], n4 = f3 & 32767, s2[x3 + 18 >> 1] = n4, a3[x3 + 17 | 0] = f3 >>> 15, r4 = c2[x3 + 4 >> 2];
                                                                              nc: {
                                                                                oc: {
                                                                                  if ((r4 | 0) == -1) {
                                                                                    if (f3 << 16 >> 16 >= 0 && (a3[x3 + 17 | 0] = 1), l2[e5 + 50 | 0]) break nc;
                                                                                    r4 = n4;
                                                                                    break oc;
                                                                                  }
                                                                                  if (l2[e5 + 50 | 0]) break nc;
                                                                                }
                                                                                c2[_3 + 8 >> 2] = r4, n4 = ua(x3, _3 + 8 | 0), c2[_3 + 256 >> 2] = 0, oa(e5 + 32 | 0, n4), la(_3 + 256 | 0);
                                                                              }
                                                                              if (r4 = c2[e5 + 32 >> 2], n4 = c2[r4 + 16 >> 2], n4) break L;
                                                                              c2[e5 + 56 >> 2] = -1;
                                                                            }
                                                                            Ub(_3 + 160 | 0);
                                                                          }
                                                                          n4 = 1;
                                                                          break u;
                                                                        }
                                                                        Mb(c2[r4 + 12 >> 2], n4, l2[x3 + 16 | 0]), n4 = c2[e5 + 24 >> 2], r4 = c2[e5 + 28 >> 2];
                                                                        pc: {
                                                                          if (n4 >>> 0 < r4 >>> 0) {
                                                                            c2[_3 + 160 >> 2] = 0, c2[n4 >> 2] = x3, n4 = n4 + 4 | 0;
                                                                            break pc;
                                                                          }
                                                                          if (f3 = c2[e5 + 20 >> 2], n4 = n4 - f3 | 0, S3 = n4 >> 2, b3 = S3 + 1 | 0, b3 >>> 0 >= 1073741824) break F;
                                                                          v3 = r4 - f3 | 0, r4 = v3 >> 1, b3 = v3 >>> 0 >= 2147483644 ? 1073741823 : r4 >>> 0 > b3 >>> 0 ? r4 : b3;
                                                                          qc: {
                                                                            if (!b3) {
                                                                              v3 = n4, y3 = 0;
                                                                              break qc;
                                                                            }
                                                                            if (b3 >>> 0 >= 1073741824) break E;
                                                                            y3 = na(b3 << 2), f3 = c2[e5 + 20 >> 2], v3 = c2[e5 + 24 >> 2] - f3 | 0, S3 = v3 >> 2;
                                                                          }
                                                                          if (c2[_3 + 160 >> 2] = 0, n4 = n4 + y3 | 0, c2[n4 >> 2] = x3, r4 = n4 - (S3 << 2) | 0, v3 && p(r4, f3, v3), c2[e5 + 28 >> 2] = (b3 << 2) + y3, n4 = n4 + 4 | 0, c2[e5 + 24 >> 2] = n4, c2[e5 + 20 >> 2] = r4, !f3) break pc;
                                                                          ma(f3);
                                                                        }
                                                                        a3[e5 + 49 | 0] = 1, c2[e5 + 24 >> 2] = n4, Ub(_3 + 160 | 0);
                                                                        break B;
                                                                      }
                                                                      a3[e5 + 49 | 0] = 0;
                                                                      break u;
                                                                    }
                                                                    if (r4 = c2[e5 + 4 >> 2], n4 = c2[r4 + 8 >> 2], f3 = n4 + c2[T3 + 28 >> 2] | 0, n4 >>> 0 > f3 >>> 0) break B;
                                                                    n4 = c2[r4 + 4 >> 2], c2[r4 + 8 >> 2] = n4 >>> 0 > f3 >>> 0 ? f3 : n4;
                                                                    break B;
                                                                  }
                                                                  if (r4 = c2[e5 + 4 >> 2], n4 = c2[r4 + 8 >> 2], f3 = n4 + c2[T3 + 28 >> 2] | 0, n4 >>> 0 > f3 >>> 0) break B;
                                                                  n4 = c2[r4 + 4 >> 2], c2[r4 + 8 >> 2] = n4 >>> 0 > f3 >>> 0 ? f3 : n4;
                                                                  break B;
                                                                }
                                                                if (c2[T3 + 52 >> 2] = 4, S3 = T3 + 68 | 0, pb(S3, 0), w3 = c2[e5 + 4 >> 2], E3 = na(96), s2[E3 >> 1] = 0, t(E3 + 4 | 0, 0, 92), (wa(w3, _3 + 120 | 0) | 0) == -1) break D;
                                                                n4 = 1, f3 = l2[_3 + 120 | 0], a3[E3 + 1 | 0] = f3 & 1;
                                                                rc: {
                                                                  sc: {
                                                                    if ((qa(w3, _3 + 8 | 0) | 0) == -1 || (qa(w3, _3 + 256 | 0) | 0) == -1 || (r4 = c2[_3 + 8 >> 2], x3 = c2[_3 + 256 >> 2], (r4 | 0) > (x3 | 0))) break sc;
                                                                    for (b3 = (f3 >>> 4 & 7) + 1 | 0, y3 = (f3 >>> 1 & 7) + 1 | 0, Lb(E3, 0), c2[_3 + 164 >> 2] = r4, a3[_3 + 160 | 0] = 1, n4 = r4; ; ) {
                                                                      if ((Fa(w3, y3, c2[E3 + 8 >> 2] + (c2[E3 + 4 >> 2] << 3) | 0) | 0) == -1 || (Fa(w3, b3, c2[E3 + 20 >> 2] + (c2[E3 + 4 >> 2] << 2) | 0) | 0) == -1 || (v3 = c2[E3 + 20 >> 2], f3 = c2[E3 + 4 >> 2] << 2, d2[v3 + f3 >> 2] > 63) || (c2[f3 + c2[E3 + 32 >> 2] >> 2] = n4, n4 = c2[v3 + (c2[E3 + 4 >> 2] << 2) >> 2], (n4 | 0) > 31) || l2[La(_3 + 160 | 0, 1 << n4) | 0] != 1) break rc;
                                                                      if (Lb(E3, 1), n4 = c2[_3 + 164 >> 2], !((x3 | 0) > (n4 | 0))) break;
                                                                    }
                                                                    if ((Fa(w3, y3, c2[E3 + 8 >> 2] + (c2[E3 + 4 >> 2] << 3) | 0) | 0) == -1 || (c2[c2[E3 + 20 >> 2] + (c2[E3 + 4 >> 2] << 2) >> 2] = 32, (r4 | 0) == -2147483648) || (c2[c2[E3 + 32 >> 2] + (c2[E3 + 4 >> 2] << 2) >> 2] = r4 - 1, Lb(E3, 1), (Fa(w3, y3, c2[E3 + 8 >> 2] + (c2[E3 + 4 >> 2] << 3) | 0) | 0) == -1)) break rc;
                                                                    if (c2[c2[E3 + 20 >> 2] + (c2[E3 + 4 >> 2] << 2) >> 2] = 32, c2[c2[E3 + 32 >> 2] + (c2[E3 + 4 >> 2] << 2) >> 2] = x3, Lb(E3, 1), l2[E3 + 1 | 0] == 1) {
                                                                      if ((Fa(w3, y3, c2[E3 + 8 >> 2] + (c2[E3 + 4 >> 2] << 3) | 0) | 0) == -1) break rc;
                                                                      c2[E3 + 4 >> 2] = c2[E3 + 4 >> 2] + 1;
                                                                    }
                                                                    if (r4 = Ld(E3), a3[E3 | 0] = r4, c2[_3 + 160 >> 2] = E3, n4 = 1, !r4) break C;
                                                                    n4 = 0, c2[_3 + 160 >> 2] = 0, pb(S3, E3), sa(c2[e5 + 4 >> 2]);
                                                                    break C;
                                                                  }
                                                                  a3[E3 | 0] = 0, c2[_3 + 160 >> 2] = E3;
                                                                  break C;
                                                                }
                                                                break D;
                                                              }
                                                              if ((f3 | 0) != 62 || (r4 = c2[e5 + 4 >> 2], n4 = c2[r4 + 8 >> 2], f3 = n4 + c2[T3 + 28 >> 2] | 0, n4 >>> 0 > f3 >>> 0)) break B;
                                                              n4 = c2[r4 + 4 >> 2], c2[r4 + 8 >> 2] = n4 >>> 0 > f3 >>> 0 ? f3 : n4;
                                                              break B;
                                                            }
                                                            za(), o();
                                                          }
                                                          Wa(), o();
                                                        }
                                                        a3[E3 | 0] = 0, c2[_3 + 160 >> 2] = E3, n4 = 1;
                                                      }
                                                      pa(_3 + 160 | 0);
                                                      break u;
                                                    }
                                                    n4 = 0;
                                                    break u;
                                                  }
                                                  la(_3 + 120 | 0);
                                                }
                                                if (ta(_3 + 256 | 0), c2[_3 + 160 >> 2] = 0, Pb(T3 + 60 | 0, v3), Sb(_3 + 160 | 0), c2[T3 + 60 >> 2]) {
                                                  sa(c2[e5 + 4 >> 2]), f3 = c2[e5 + 4 >> 2], n4 = c2[f3 + 8 >> 2], n4 >>> 0 <= 4294967293 && (r4 = n4 + 2 | 0, n4 = c2[f3 + 4 >> 2], c2[f3 + 8 >> 2] = n4 >>> 0 > r4 >>> 0 ? r4 : n4), ta(_3 + 104 | 0), Ja(_3 + 8 | 0), n4 = 0;
                                                  break x;
                                                }
                                                ta(_3 + 104 | 0), Ja(_3 + 8 | 0);
                                              }
                                              n4 = 1;
                                            }
                                            ma(y3);
                                            break u;
                                          }
                                          if (qa(c2[e5 + 4 >> 2], y3 + 16 | 0)) break v;
                                          if (r4 = c2[e5 + 4 >> 2], f3 = c2[r4 >> 2], r4 = c2[r4 + 4 >> 2], (r4 | 0) < 0 || (f3 = ((r4 & 134217727) << 5 | f3 >>> 27) & -32, r4 = r4 >>> 27 & 15, !r4 & f3 >>> 0 >= 2147483648 | r4)) break t;
                                          if (!r4 & d2[y3 + 16 >> 2] > f3 >>> 0) break v;
                                          for (S3 = 0, n4 = c2[T3 + 8 >> 2], v3 = (n4 | 0) > 0 ? n4 : 0, r4 = 0; ; ) {
                                            if ((r4 | 0) == (v3 | 0)) for (f3 = 1, n4 = 0; ; ) if ((n4 | 0) == (v3 | 0)) {
                                              if (!(f3 & 1)) break t;
                                              c2[y3 + 24 >> 2] = S3, F = Kb(_3 + 104 | 0, S3), E3 = c2[F >> 2];
                                              tc: {
                                                if ((E3 | 0) == c2[F + 4 >> 2]) break tc;
                                                for (n4 = c2[T3 + 8 >> 2], w3 = (n4 | 0) > 0 ? n4 : 0, f3 = 1, S3 = 0, v3 = 0; ; ) {
                                                  if ((v3 | 0) == (w3 | 0)) break tc;
                                                  uc: {
                                                    if (n4 = Ka(e5, c2[c2[T3 + 12 >> 2] + (v3 << 2) >> 2]), l2[n4 + 4 | 0] & 63) break uc;
                                                    for (n4 = c2[n4 + 56 >> 2], b3 = c2[n4 + 24 >> 2], C3 = c2[n4 + 28 >> 2] - b3 >> 2, n4 = 0; ; ) {
                                                      if ((n4 | 0) == (C3 | 0)) {
                                                        x3 = 0, b3 = 0, f3 & 1 && (n4 = S3 + C3 | 0, r4 = n4 >>> 0 >= C3 >>> 0, x3 = r4, b3 = r4 ? n4 : 0), S3 = b3, f3 = x3;
                                                        break uc;
                                                      }
                                                      if (r4 = n4 + S3 | 0, !(r4 >>> 0 >= n4 >>> 0 & f3)) break t;
                                                      c2[E3 + (r4 << 2) >> 2] = c2[b3 + (n4 << 2) >> 2], n4 = n4 + 1 | 0;
                                                    }
                                                  }
                                                  v3 = v3 + 1 | 0;
                                                }
                                              }
                                              $a(y3 + 124 | 0, F);
                                              vc: {
                                                wc: {
                                                  if (l2[y3 | 0] == 1) {
                                                    E3 = c2[y3 + 24 >> 2], n4 = 0;
                                                    xc: {
                                                      yc: {
                                                        for (; ; ) {
                                                          if ((n4 | 0) == 35) break yc;
                                                          if (!Fa(c2[e5 + 4 >> 2], 4, _3 + 160 | 0)) a3[(_3 + 256 | 0) + n4 | 0] = c2[_3 + 160 >> 2], n4 = n4 + 1 | 0;
                                                          else break;
                                                        }
                                                        s2[_3 + 8 >> 1] = 0, t(_3 + 12 | 0, 0, 92);
                                                        break xc;
                                                      }
                                                      if (w3 = tc(_3 + 160 | 0, _3 + 256 | 0, 35), !l2[w3 | 0]) {
                                                        s2[_3 + 8 >> 1] = 0, t(_3 + 12 | 0, 0, 92), Oa(w3);
                                                        break xc;
                                                      }
                                                      if (c2[_3 + 300 >> 2] = c2[e5 + 4 >> 2], f3 = 0, c2[_3 + 156 >> 2] = 0, c2[_3 + 148 >> 2] = 0, c2[_3 + 152 >> 2] = 0, n4 = _3 + 148 | 0, c2[_3 + 292 >> 2] = n4, E3) {
                                                        for (Kd(n4, E3), n4 = c2[_3 + 152 >> 2], r4 = E3 + n4 | 0; (n4 | 0) != (r4 | 0); ) a3[n4 | 0] = 0, n4 = n4 + 1 | 0;
                                                        c2[_3 + 152 >> 2] = r4;
                                                      }
                                                      a3[_3 + 296 | 0] = 1, gc(_3 + 292 | 0), S3 = 0;
                                                      zc: for (; ; ) {
                                                        Ac: {
                                                          Bc: {
                                                            if ((f3 | 0) < (E3 | 0)) {
                                                              if (ya(_3 + 300 | 0, w3, _3 + 292 | 0)) break Bc;
                                                              if (v3 = c2[_3 + 292 >> 2], (v3 | 0) <= 31) {
                                                                a3[c2[_3 + 148 >> 2] + f3 | 0] = v3, S3 = 0;
                                                                break Ac;
                                                              }
                                                              Cc: {
                                                                Dc: switch (v3 - 32 | 0) {
                                                                  case 0:
                                                                    if (Fa(c2[e5 + 4 >> 2], 2, _3 + 144 | 0)) break Bc;
                                                                    S3 = c2[_3 + 144 >> 2] + 3 | 0;
                                                                    break Cc;
                                                                  case 1:
                                                                    if (Fa(c2[e5 + 4 >> 2], 3, _3 + 144 | 0)) break Bc;
                                                                    S3 = c2[_3 + 144 >> 2] + 3 | 0;
                                                                    break Cc;
                                                                  case 2:
                                                                    break Dc;
                                                                  default:
                                                                    break Cc;
                                                                }
                                                                if (Fa(c2[e5 + 4 >> 2], 7, _3 + 144 | 0)) break Bc;
                                                                S3 = c2[_3 + 144 >> 2] + 11 | 0;
                                                              }
                                                              if ((S3 | 0) <= 0) break Ac;
                                                              if (r4 = f3 + S3 | 0, (r4 | 0) > (E3 | 0)) break Bc;
                                                              for (n4 = 0, x3 = (v3 | 0) == 32 & (f3 | 0) > 0; ; ) if ((n4 | 0) == (S3 | 0)) {
                                                                f3 = r4;
                                                                continue zc;
                                                              } else {
                                                                b3 = c2[_3 + 148 >> 2] + f3 | 0, a3[b3 + n4 | 0] = x3 ? l2[b3 - 1 | 0] : 0, n4 = n4 + 1 | 0;
                                                                continue;
                                                              }
                                                            }
                                                            if (n4 = c2[_3 + 148 >> 2], r4 = tc(_3 + 8 | 0, n4, c2[_3 + 152 >> 2] - n4 | 0), n4 = l2[r4 | 0], va(_3 + 148 | 0), Oa(w3), !n4) break xc;
                                                            if (sa(c2[e5 + 4 >> 2]), Id(y3 + 28 | 0, r4), Oa(r4), n4 = 1, r4 = 0, l2[y3 | 0] != 1) break wc;
                                                            if (E3 = u2[_3 + 142 >> 1], w3 = E3 >>> 12 & 3, (w3 | 0) == 2 || (x3 = E3 >>> 10 & 3, (x3 | 0) == 2) || (S3 = E3 >>> 8 & 3, (S3 | 0) == 2) || (f3 = E3 & 3, (f3 | 0) == 2) || (b3 = E3 >>> 6 & 3, (b3 | 0) == 2)) break vc;
                                                            Ec: {
                                                              Fc: switch (f3 | 0) {
                                                                case 0:
                                                                  v3 = ra(e5, 6), f3 = 0;
                                                                  break Ec;
                                                                case 1:
                                                                  v3 = ra(e5, 7), f3 = 0;
                                                                  break Ec;
                                                                default:
                                                                  break Fc;
                                                              }
                                                              if (f3 = Ga(e5, T3, 0), !f3) break vc;
                                                              v3 = c2[f3 + 68 >> 2], f3 = 1;
                                                            }
                                                            c2[y3 + 144 >> 2] = v3;
                                                            Gc: {
                                                              Hc: switch ((E3 >>> 2 & 3) - 1 | 0) {
                                                                default:
                                                                  v3 = ra(e5, 8);
                                                                  break Gc;
                                                                case 0:
                                                                  v3 = ra(e5, 9);
                                                                  break Gc;
                                                                case 1:
                                                                  v3 = ra(e5, 10);
                                                                  break Gc;
                                                                case 2:
                                                                  break Hc;
                                                              }
                                                              if (v3 = Ga(e5, T3, f3), !v3) break vc;
                                                              f3 = f3 + 1 | 0, v3 = c2[v3 + 68 >> 2];
                                                            }
                                                            c2[y3 + 148 >> 2] = v3;
                                                            Ic: {
                                                              Jc: switch ((E3 >>> 4 & 3) - 1 | 0) {
                                                                default:
                                                                  v3 = ra(e5, 11);
                                                                  break Ic;
                                                                case 0:
                                                                  v3 = ra(e5, 12);
                                                                  break Ic;
                                                                case 1:
                                                                  v3 = ra(e5, 13);
                                                                  break Ic;
                                                                case 2:
                                                                  break Jc;
                                                              }
                                                              if (v3 = Ga(e5, T3, f3), !v3) break vc;
                                                              f3 = f3 + 1 | 0, v3 = c2[v3 + 68 >> 2];
                                                            }
                                                            c2[y3 + 152 >> 2] = v3;
                                                            Kc: {
                                                              Lc: switch (b3 | 0) {
                                                                case 0:
                                                                  v3 = ra(e5, 14);
                                                                  break Kc;
                                                                case 1:
                                                                  v3 = ra(e5, 15);
                                                                  break Kc;
                                                                default:
                                                                  break Lc;
                                                              }
                                                              if (v3 = Ga(e5, T3, f3), !v3) break vc;
                                                              f3 = f3 + 1 | 0, v3 = c2[v3 + 68 >> 2];
                                                            }
                                                            c2[y3 + 156 >> 2] = v3;
                                                            Mc: {
                                                              Nc: switch (S3 | 0) {
                                                                case 0:
                                                                  v3 = ra(e5, 14);
                                                                  break Mc;
                                                                case 1:
                                                                  v3 = ra(e5, 15);
                                                                  break Mc;
                                                                default:
                                                                  break Nc;
                                                              }
                                                              if (v3 = Ga(e5, T3, f3), !v3) break vc;
                                                              f3 = f3 + 1 | 0, v3 = c2[v3 + 68 >> 2];
                                                            }
                                                            c2[y3 + 160 >> 2] = v3;
                                                            Oc: {
                                                              Pc: switch (x3 | 0) {
                                                                case 0:
                                                                  v3 = ra(e5, 14);
                                                                  break Oc;
                                                                case 1:
                                                                  v3 = ra(e5, 15);
                                                                  break Oc;
                                                                default:
                                                                  break Pc;
                                                              }
                                                              if (v3 = Ga(e5, T3, f3), !v3) break vc;
                                                              f3 = f3 + 1 | 0, v3 = c2[v3 + 68 >> 2];
                                                            }
                                                            c2[y3 + 164 >> 2] = v3;
                                                            Qc: {
                                                              Rc: switch (w3 | 0) {
                                                                case 0:
                                                                  v3 = ra(e5, 14);
                                                                  break Qc;
                                                                case 1:
                                                                  v3 = ra(e5, 15);
                                                                  break Qc;
                                                                default:
                                                                  break Rc;
                                                              }
                                                              if (v3 = Ga(e5, T3, f3), !v3) break vc;
                                                              f3 = f3 + 1 | 0, v3 = c2[v3 + 68 >> 2];
                                                            }
                                                            c2[y3 + 168 >> 2] = v3;
                                                            Sc: {
                                                              if (!(E3 & 16384)) {
                                                                n4 = ra(e5, 1);
                                                                break Sc;
                                                              }
                                                              if (f3 = Ga(e5, T3, f3), !f3) break vc;
                                                              n4 = c2[f3 + 68 >> 2];
                                                            }
                                                            c2[y3 + 172 >> 2] = n4;
                                                            break wc;
                                                          }
                                                          s2[_3 + 8 >> 1] = 0, t(_3 + 12 | 0, 0, 92), va(_3 + 148 | 0), Oa(w3);
                                                          break xc;
                                                        }
                                                        f3 = f3 + 1 | 0;
                                                      }
                                                    }
                                                    Oa(_3 + 8 | 0), n4 = 1;
                                                    break vc;
                                                  }
                                                  r4 = ib(c2[y3 + 24 >> 2]);
                                                }
                                                x3 = 0, b3 = 0, c2[_3 + 8 >> 2] = 0, c2[_3 + 12 >> 2] = 0, l2[y3 + 1 | 0] == 1 && (v3 = _3 + 160 | 0, mb(v3, l2[y3 + 2 | 0] ? 1024 : 8192), n4 = c2[_3 + 160 >> 2], c2[_3 + 160 >> 2] = 0, Hd(_3 + 8 | 0, n4), f3 = c2[_3 + 164 >> 2], c2[_3 + 12 >> 2] = f3, c2[_3 + 164 >> 2] = 0, Ja(v3), b3 = f3), c2[T3 + 52 >> 2] = 1;
                                                Tc: {
                                                  Uc: {
                                                    Vc: {
                                                      Wc: {
                                                        if (l2[y3 | 0] == 1) {
                                                          if (n4 = Gd(y3, c2[e5 + 4 >> 2], c2[_3 + 8 >> 2] | x3, b3), c2[_3 + 160 >> 2] = 0, oa(T3 - -64 | 0, n4), la(_3 + 160 | 0), !c2[T3 + 64 >> 2]) break Uc;
                                                          sa(c2[e5 + 4 >> 2]);
                                                          break Wc;
                                                        }
                                                        if (n4 = Na(c2[e5 + 4 >> 2]), c2[_3 + 256 >> 2] = n4, v3 = Fd(_3 + 160 | 0, r4), n4 = Ed(y3, n4, c2[_3 + 8 >> 2] | x3, b3, v3), c2[_3 + 148 >> 2] = 0, oa(T3 - -64 | 0, n4), la(_3 + 148 | 0), !c2[T3 + 64 >> 2]) break Vc;
                                                        sa(c2[e5 + 4 >> 2]), f3 = c2[e5 + 4 >> 2], n4 = c2[f3 + 8 >> 2], n4 >>> 0 <= 4294967293 && (r4 = n4 + 2 | 0, n4 = c2[f3 + 4 >> 2], c2[f3 + 8 >> 2] = n4 >>> 0 > r4 >>> 0 ? r4 : n4), rc(v3), ta(_3 + 256 | 0);
                                                      }
                                                      if (n4 = 0, (l2[T3 + 4 | 0] & 63) == 4) break Tc;
                                                      Xc: {
                                                        if (l2[e5 + 50 | 0] || (f3 = c2[c2[e5 + 24 >> 2] - 4 >> 2], l2[f3 + 17 | 0] != 1) || (n4 = k2 + c2[_3 + 132 >> 2] | 0, r4 = c2[e5 + 32 >> 2], (n4 | 0) <= c2[r4 + 24 >> 2])) break Xc;
                                                        ab(r4, n4, l2[f3 + 16 | 0]);
                                                      }
                                                      n4 = c2[_3 + 128 >> 2], r4 = n4, v3 = n4 >> 31, n4 = c2[_3 + 132 >> 2], f3 = n4, b3 = n4 >> 31, n4 = l2[_3 + 136 | 0], bb(c2[e5 + 32 >> 2], r4, v3, f3, b3, c2[T3 + 64 >> 2], (n4 & 7) == 4 ? 4 : n4 & 3), oa(T3 - -64 | 0, 0), n4 = 0;
                                                      break Tc;
                                                    }
                                                    rc(v3), ta(_3 + 256 | 0);
                                                  }
                                                  n4 = 1;
                                                }
                                                Ja(_3 + 8 | 0);
                                              }
                                              va(F);
                                              break v;
                                            } else {
                                              r4 = Ka(e5, c2[c2[T3 + 12 >> 2] + (n4 << 2) >> 2]), l2[r4 + 4 | 0] & 63 || (x3 = 0, b3 = 0, f3 & 1 ? (r4 = c2[r4 + 56 >> 2], f3 = c2[r4 + 28 >> 2] - c2[r4 + 24 >> 2] >> 2, r4 = f3 + S3 | 0, b3 = r4, r4 = r4 >>> 0 >= f3 >>> 0, f3 = r4 ? b3 : 0, x3 = r4) : f3 = b3, S3 = f3, f3 = x3), n4 = n4 + 1 | 0;
                                              continue;
                                            }
                                            if (n4 = 1, f3 = r4 << 2, r4 = r4 + 1 | 0, !Ka(e5, c2[f3 + c2[T3 + 12 >> 2] >> 2])) break;
                                          }
                                        }
                                        qc(_3 + 116 | 0);
                                      }
                                      M = _3 + 304 | 0;
                                      break s;
                                    }
                                    o();
                                  }
                                  if (c2[e5 + 56 >> 2] != 3) break r;
                                  if (n4 = c2[e5 + 4 >> 2], r4 = c2[n4 + 8 >> 2], n4 = c2[n4 + 4 >> 2], r4 >>> 0 > n4 >>> 0) break e;
                                  if ((n4 | 0) == (r4 | 0)) break;
                                }
                                c2[e5 + 52 >> 2] = 2;
                                break c;
                              }
                              Yc: switch (n4 | 0) {
                                default:
                                  eb(Ee, 0);
                                  break i;
                                case 0:
                                  break Yc;
                                case 2:
                                  break d;
                              }
                              if (T3 = c2[Ee >> 2], n4 = c2[T3 + 28 >> 2], (n4 | 0) == -1) break g;
                              if (r4 = n4, n4 = c2[e5 + 84 >> 2], r4 = r4 + n4 | 0, n4 >>> 0 <= r4 >>> 0) break h;
                            }
                            Xe = 1;
                            break c;
                          }
                          c2[e5 + 84 >> 2] = r4, f3 = c2[e5 + 4 >> 2], n4 = c2[f3 + 4 >> 2], c2[f3 + 8 >> 2] = n4 >>> 0 > r4 >>> 0 ? r4 : n4;
                          break f;
                        }
                        if (f3 = c2[e5 + 4 >> 2], n4 = c2[f3 + 8 >> 2], n4 >>> 0 > 4294967291) break f;
                        r4 = n4 + 4 | 0, n4 = c2[f3 + 4 >> 2], c2[f3 + 8 >> 2] = n4 >>> 0 > r4 >>> 0 ? r4 : n4;
                      }
                      n4 = c2[e5 + 12 >> 2], r4 = c2[e5 + 16 >> 2];
                      Zc: {
                        if (n4 >>> 0 < r4 >>> 0) {
                          c2[Ee >> 2] = 0, c2[n4 >> 2] = T3, r4 = n4 + 4 | 0;
                          break Zc;
                        }
                        if (f3 = c2[e5 + 8 >> 2], n4 = n4 - f3 | 0, y3 = n4 >> 2, b3 = y3 + 1 | 0, b3 >>> 0 >= 1073741824) break b;
                        v3 = r4 - f3 | 0, r4 = v3 >> 1, S3 = v3 >>> 0 >= 2147483644 ? 1073741823 : r4 >>> 0 > b3 >>> 0 ? r4 : b3;
                        _c: {
                          if (!S3) {
                            v3 = 0, r4 = n4;
                            break _c;
                          }
                          if (S3 >>> 0 >= 1073741824) break a;
                          v3 = na(S3 << 2), f3 = c2[e5 + 8 >> 2], r4 = c2[e5 + 12 >> 2] - f3 | 0, y3 = r4 >> 2, T3 = c2[e5 + 80 >> 2];
                        }
                        c2[e5 + 80 >> 2] = 0, b3 = n4 + v3 | 0, c2[b3 >> 2] = T3, n4 = b3 - (y3 << 2) | 0, r4 && p(n4, f3, r4), c2[e5 + 16 >> 2] = (S3 << 2) + v3, r4 = b3 + 4 | 0, c2[e5 + 12 >> 2] = r4, c2[e5 + 8 >> 2] = n4, f3 && ma(f3), f3 = c2[e5 + 4 >> 2];
                      }
                      if (c2[e5 + 12 >> 2] = r4, n4 = c2[f3 + 4 >> 2], b3 = n4, r4 = c2[f3 + 8 >> 2], !(n4 >>> 0 >= r4 >>> 0)) break;
                    }
                  }
                  o();
                }
                eb(Ee, 0);
              }
              return M = Y + 16 | 0, Xe;
            }
            za(), o();
          }
          Wa(), o();
        }
        function jb(e5, n4, r4, s3) {
          var u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0, A2 = 0, j2 = 0, N2 = 0, P2 = 0, F = 0, I = 0, L = 0, R = 0, z = 0, B = 0, V = 0, H = 0, U = 0, W = 0, G = 0, K = 0, q = 0, J = 0;
          u3 = M - 96 | 0, M = u3, P2 = e5 + 8 | 0, C3 = e5 + 4 | 0;
          a: {
            b: {
              if (x3 = c2[e5 + 4 >> 2], x3 - 1 >>> 0 <= 65534 && (E3 = c2[e5 + 8 >> 2], E3 - 1 >>> 0 < 65535)) break b;
              b3 = ua(C3, P2);
              break a;
            }
            c: {
              d: {
                e: {
                  f: {
                    g: {
                      h: {
                        i: {
                          j: {
                            k: {
                              l: {
                                if (!l2[e5 | 0]) {
                                  m: {
                                    if (l2[e5 + 24 | 0] != 255 | l2[e5 + 25 | 0] != 255 | (l2[e5 + 26 | 0] != 255 | l2[e5 + 27 | 0] != 255) || c2[e5 + 12 >> 2] || (v3 = c2[e5 + 20 >> 2], (x3 | 0) != c2[v3 + 20 >> 2])) break m;
                                    if (!c2[v3 + 16 >> 2]) break c;
                                    if (b3 = hc(x3, E3), c2[u3 + 44 >> 2] = b3, !c2[b3 + 16 >> 2]) break e;
                                    for (O3 = s3, F = r4, r4 = c2[e5 + 20 >> 2], I = c2[r4 + 20 >> 2], w3 = c2[r4 + 24 >> 2], r4 = c2[e5 + 16 >> 2], (1 - w3 | 0) <= (r4 | 0) & (r4 | 0) < (w3 | 0) || (c2[e5 + 16 >> 2] = 0), H = w3 + 1 | 0, z = w3 - 1 | 0, B = F + 32 | 0, C3 = 0; (C3 | 0) != (E3 | 0); ) {
                                      if (l2[e5 + 1 | 0] == 1) {
                                        if (l2[n4 | 0]) break e;
                                        if ((s3 | 0) == 16 | s3 >>> 0 < 16) break l;
                                        k2 = ka(n4, B) ^ k2;
                                      }
                                      ja(u3 + 32 | 0, b3, C3), _3 = 0;
                                      n: {
                                        if (!C3) {
                                          P2 = 0, D3 = 0, v3 = 0;
                                          break n;
                                        }
                                        if (ja(u3 + 72 | 0, b3, C3 - 1 | 0), D3 = c2[u3 + 76 >> 2], !D3) break l;
                                        P2 = c2[u3 + 72 >> 2], v3 = l2[P2 | 0] << 4;
                                      }
                                      if (r4 = c2[e5 + 16 >> 2], c2[u3 + 88 >> 2] = 0, c2[u3 + 92 >> 2] = 0, c2[u3 + 80 >> 2] = 0, c2[u3 + 84 >> 2] = 0, c2[u3 + 72 >> 2] = 0, c2[u3 + 76 >> 2] = 0, c2[u3 + 16 >> 2] = 0, c2[u3 + 8 >> 2] = 0, c2[u3 + 12 >> 2] = 0, g3 = C3 - r4 | 0, !((g3 | 0) <= 0 | (g3 | 0) > (w3 | 0))) {
                                        if (ja(u3 + 48 | 0, c2[e5 + 20 >> 2], g3 - 1 | 0), r4 = c2[u3 + 52 >> 2], c2[u3 + 76 >> 2] = r4, f3 = c2[u3 + 48 >> 2], c2[u3 + 72 >> 2] = f3, !r4) break l;
                                        r4 = l2[f3 | 0], c2[u3 + 8 >> 2] = r4, _3 = r4 & 192;
                                      }
                                      y3 = 0, r4 = 0;
                                      o: {
                                        if ((g3 | 0) < 0 || (r4 = 0, (g3 | 0) >= (w3 | 0))) break o;
                                        if (ja(u3 + 48 | 0, c2[e5 + 20 >> 2], g3), r4 = c2[u3 + 52 >> 2], c2[u3 + 84 >> 2] = r4, f3 = c2[u3 + 48 >> 2], c2[u3 + 80 >> 2] = f3, !r4) break l;
                                        r4 = l2[f3 | 0], c2[u3 + 12 >> 2] = r4, r4 = r4 >>> 3 & 24;
                                      }
                                      if (!((g3 | 0) < -1 | (g3 | 0) >= (z | 0))) {
                                        if (ja(u3 + 48 | 0, c2[e5 + 20 >> 2], g3 + 1 | 0), g3 = c2[u3 + 52 >> 2], c2[u3 + 92 >> 2] = g3, f3 = c2[u3 + 48 >> 2], c2[u3 + 88 >> 2] = f3, !g3) break l;
                                        g3 = l2[f3 | 0], c2[u3 + 16 >> 2] = g3, y3 = g3 >>> 6 | 0;
                                      }
                                      p: {
                                        if (!k2) {
                                          h3 = r4 | v3 & 3072 | _3 | y3, S3 = 0, A2 = c2[u3 + 32 >> 2], j2 = c2[u3 + 36 >> 2], y3 = 0;
                                          q: for (; ; ) {
                                            if ((y3 | 0) >= (x3 | 0)) break p;
                                            r: {
                                              if (!C3 || (v3 <<= 8, (x3 | 0) <= (y3 + 8 | 0))) break r;
                                              if (r4 = (y3 >>> 3 | 0) + 1 | 0, r4 >>> 0 >= D3 >>> 0) break l;
                                              v3 = l2[r4 + P2 | 0] << 4 | v3;
                                            }
                                            s: {
                                              if ((H + c2[e5 + 16 >> 2] | 0) < (C3 | 0)) {
                                                g3 = 0, c2[u3 + 16 >> 2] = 0, c2[u3 + 8 >> 2] = 0, c2[u3 + 12 >> 2] = 0, T3 = 0, r4 = 0;
                                                break s;
                                              }
                                              for (r4 = (y3 >>> 3 | 0) + 1 | 0, f3 = 0, _3 = u3 + 8 | 0, g3 = (I | 0) <= (y3 + 8 | 0); (f3 | 0) != 24; ) {
                                                T3 = (u3 + 72 | 0) + f3 | 0, L = c2[T3 + 4 >> 2];
                                                t: {
                                                  if (!L || (N2 = c2[_3 >> 2] << 8, c2[_3 >> 2] = N2, g3)) break t;
                                                  if (r4 >>> 0 >= L >>> 0) break l;
                                                  c2[_3 >> 2] = N2 | l2[r4 + c2[T3 >> 2] | 0];
                                                }
                                                _3 = _3 + 4 | 0, f3 = f3 + 8 | 0;
                                              }
                                              g3 = c2[u3 + 16 >> 2], T3 = c2[u3 + 8 >> 2], r4 = c2[u3 + 12 >> 2];
                                            }
                                            for (f3 = 0, _3 = S3 + x3 | 0, _3 = (_3 | 0) > 0 ? _3 : 0, L = (_3 | 0) >= 8 ? 8 : _3, _3 = 0; ; ) {
                                              if ((f3 | 0) == (L | 0)) {
                                                if (r4 = y3 >>> 3 | 0, r4 >>> 0 >= j2 >>> 0) break l;
                                                a3[r4 + A2 | 0] = _3, S3 = S3 - 8 | 0, y3 = y3 + 8 | 0;
                                                continue q;
                                              }
                                              if (h3 >>> 0 >= O3 >>> 0) break l;
                                              N2 = h3 << 1, R = ka(n4, N2 + F | 0), h3 = f3 ^ 7, _3 = R << h3 | _3, h3 = g3 >>> 13 - f3 & 1 | (r4 >>> 10 - f3 & 8 | (T3 >>> h3 & 64 | (v3 >>> h3 & 1024 | N2 & 6582 | R << 9))), f3 = f3 + 1 | 0;
                                            }
                                          }
                                        }
                                        for (Cb(u3 + 48 | 0, c2[e5 + 20 >> 2], C3), _3 = r4 | v3 & 3072 | _3 | y3, g3 = 0, j2 = c2[u3 + 32 >> 2], L = c2[u3 + 36 >> 2], N2 = c2[u3 + 60 >> 2], R = c2[u3 + 56 >> 2], y3 = 0; ; ) {
                                          if ((g3 | 0) >= (x3 | 0)) break p;
                                          u: {
                                            if (!C3) {
                                              r4 = g3 + 8 | 0;
                                              break u;
                                            }
                                            if (v3 <<= 8, r4 = g3 + 8 | 0, (x3 | 0) <= (r4 | 0)) break u;
                                            if (f3 = (g3 >>> 3 | 0) + 1 | 0, f3 >>> 0 >= D3 >>> 0) break l;
                                            v3 = l2[f3 + P2 | 0] << 4 | v3;
                                          }
                                          for (T3 = g3 >>> 3 | 0, S3 = T3 + 1 | 0, f3 = 0, h3 = u3 + 8 | 0; ; ) {
                                            v: {
                                              if ((f3 | 0) == 24) for (f3 = 0, h3 = y3 + x3 | 0, h3 = (h3 | 0) > 0 ? h3 : 0, V = (h3 | 0) >= 8 ? 8 : h3, W = c2[u3 + 16 >> 2], U = c2[u3 + 12 >> 2], G = c2[u3 + 8 >> 2], S3 = 0; ; ) {
                                                if ((f3 | 0) == (V | 0)) break v;
                                                A2 = c2[c2[e5 + 20 >> 2] + 20 >> 2], K = f3 + g3 | 0, h3 = ia(A2, K, R, N2);
                                                w: {
                                                  if (l2[e5 + 1 | 0] == 1 && Bb(A2, K, h3, u3 + 48 | 0)) break w;
                                                  if (l2[n4 | 0]) break e;
                                                  if (_3 >>> 0 >= O3 >>> 0) break l;
                                                  h3 = ka(n4, F + (_3 << 1) | 0);
                                                }
                                                A2 = f3 ^ 7, _3 = W >>> 13 - f3 & 1 | (U >>> 10 - f3 & 8 | (v3 >>> A2 & 1024 | _3 << 1 & 6582 | h3 << 9 | G >>> A2 & 64)), f3 = f3 + 1 | 0, S3 = h3 << A2 | S3;
                                              }
                                              A2 = (u3 + 72 | 0) + f3 | 0, V = c2[A2 + 4 >> 2];
                                              x: {
                                                if (!V || (W = c2[h3 >> 2] << 8, c2[h3 >> 2] = W, (r4 | 0) >= (I | 0))) break x;
                                                if (S3 >>> 0 >= V >>> 0) break l;
                                                c2[h3 >> 2] = W | l2[S3 + c2[A2 >> 2] | 0];
                                              }
                                              h3 = h3 + 4 | 0, f3 = f3 + 8 | 0;
                                              continue;
                                            }
                                            break;
                                          }
                                          if (T3 >>> 0 >= L >>> 0) break l;
                                          a3[T3 + j2 | 0] = S3, y3 = y3 - 8 | 0, g3 = r4;
                                        }
                                      }
                                      C3 = C3 + 1 | 0;
                                    }
                                    c2[u3 + 44 >> 2] = 0;
                                    break d;
                                  }
                                  if (b3 = ua(C3, P2), c2[u3 + 44 >> 2] = b3, f3 = c2[b3 + 16 >> 2], !f3) break g;
                                  for (F = r4, h3 = c2[b3 + 12 >> 2]; (f3 | 0) > 0; ) a3[h3 | 0] = 0, f3 = f3 - 1 | 0, h3 = h3 + 1 | 0;
                                  for (D3 = F + 32 | 0; d2[P2 >> 2] > g3 >>> 0; ) {
                                    if (l2[e5 + 1 | 0] == 1) {
                                      if (l2[n4 | 0]) break g;
                                      if ((s3 | 0) == 16 | s3 >>> 0 < 16) break l;
                                      y3 = ka(n4, D3) ^ y3;
                                    }
                                    ja(u3 + 32 | 0, b3, g3), r4 = u3 + 72 | 0, ja(r4, b3, g3 - 1 | 0), v3 = c2[u3 + 76 >> 2], O3 = c2[u3 + 72 >> 2], k2 = c2[e5 + 16 >> 2], _3 = c2[e5 + 20 >> 2], jd(r4, k2, _3, g3), f3 = 0, r4 = c2[b3 + 20 >> 2], f3 = !v3 | (r4 | 0) < 2 ? f3 : l2[O3 | 0] >>> 6 & 1, !v3 | (r4 | 0) <= 0 || (f3 = l2[O3 | 0] >>> 6 & 2 | f3), c2[u3 + 8 >> 2] = f3, c2[u3 + 12 >> 2] = 0, r4 = c2[_3 + 20 >> 2], f3 = c2[e5 + 12 >> 2], h3 = 1 - f3 | 0, x3 = c2[u3 + 72 >> 2], w3 = c2[u3 + 76 >> 2], S3 = 0 - f3 | 0, q = u3, J = ia(r4, h3, x3, w3) | ia(r4, S3, x3, w3) << 1, c2[q + 16 >> 2] = J, x3 = c2[u3 + 80 >> 2], w3 = c2[u3 + 84 >> 2], E3 = ia(r4, h3, x3, w3), T3 = E3 | ia(r4, S3, x3, w3) << 1, E3 = f3 ^ -1, q = u3, J = T3 | ia(r4, E3, x3, w3) << 2, c2[q + 20 >> 2] = J, x3 = h3, f3 = c2[u3 + 88 >> 2], h3 = c2[u3 + 92 >> 2], x3 = ia(r4, x3, f3, h3), q = u3, J = x3 | ia(r4, S3, f3, h3) << 1 | ia(r4, E3, f3, h3) << 2, c2[q + 24 >> 2] = J, r4 = u3 + 48 | 0, ja(r4, _3, a3[e5 + 27 | 0] + (g3 - k2 | 0) | 0), f3 = c2[u3 + 52 >> 2], h3 = c2[u3 + 48 >> 2], ja(r4, b3, a3[e5 + 25 | 0] + g3 | 0), r4 = c2[u3 + 52 >> 2], S3 = c2[u3 + 48 >> 2];
                                    y: {
                                      if (!y3) for (x3 = O3, O3 = v3, v3 = r4, r4 = f3, w3 = h3, f3 = 0, _3 = c2[u3 + 32 >> 2], k2 = c2[u3 + 36 >> 2]; ; ) {
                                        if (d2[C3 >> 2] <= f3 >>> 0) break y;
                                        if (E3 = u3 + 8 | 0, h3 = id(e5, c2[b3 + 20 >> 2], E3, f3, w3, r4, S3, v3), l2[n4 | 0]) break g;
                                        if (s3 >>> 0 <= h3 >>> 0) break l;
                                        hd(e5, b3, E3, f3, ka(n4, F + (h3 << 1) | 0), u3 + 72 | 0, x3, O3, _3, k2), f3 = f3 + 1 | 0;
                                      }
                                      for (Cb(u3 + 48 | 0, _3, g3), x3 = O3, O3 = v3, v3 = r4, r4 = f3, w3 = h3, f3 = 0, _3 = c2[u3 + 32 >> 2], k2 = c2[u3 + 36 >> 2], E3 = c2[u3 + 60 >> 2], I = c2[u3 + 56 >> 2]; ; ) {
                                        if (d2[C3 >> 2] <= f3 >>> 0) break y;
                                        T3 = c2[c2[e5 + 20 >> 2] + 20 >> 2], h3 = ia(T3, f3, I, E3);
                                        z: {
                                          if (l2[e5 + 1 | 0] == 1 && Bb(T3, f3, h3, u3 + 48 | 0)) break z;
                                          if (h3 = id(e5, c2[b3 + 20 >> 2], u3 + 8 | 0, f3, w3, r4, S3, v3), l2[n4 | 0] == 1) break g;
                                          if (s3 >>> 0 <= h3 >>> 0) break l;
                                          h3 = ka(n4, F + (h3 << 1) | 0);
                                        }
                                        hd(e5, b3, u3 + 8 | 0, f3, h3, u3 + 72 | 0, x3, O3, _3, k2), f3 = f3 + 1 | 0;
                                      }
                                    }
                                    g3 = g3 + 1 | 0;
                                  }
                                  c2[u3 + 44 >> 2] = 0;
                                  break f;
                                }
                                A: {
                                  if (c2[e5 + 12 >> 2] || (v3 = c2[e5 + 20 >> 2], (x3 | 0) != c2[v3 + 20 >> 2])) break A;
                                  if (!c2[v3 + 16 >> 2]) break c;
                                  if (b3 = hc(x3, E3), c2[u3 + 44 >> 2] = b3, !c2[b3 + 16 >> 2]) break i;
                                  for (O3 = s3, F = r4, r4 = c2[e5 + 20 >> 2], T3 = c2[r4 + 20 >> 2], k2 = c2[r4 + 24 >> 2], r4 = c2[e5 + 16 >> 2], (1 - k2 | 0) <= (r4 | 0) & (r4 | 0) < (k2 | 0) || (c2[e5 + 16 >> 2] = 0), A2 = k2 - 1 | 0, H = F + 16 | 0, C3 = 0; ; ) {
                                    B: {
                                      C: {
                                        if ((C3 | 0) != (E3 | 0)) {
                                          if (l2[e5 + 1 | 0] == 1) {
                                            if (l2[n4 | 0]) break i;
                                            if ((s3 | 0) == 8 | s3 >>> 0 < 8) break l;
                                            w3 = ka(n4, H) ^ w3;
                                          }
                                          ja(u3 + 32 | 0, b3, C3), _3 = 0;
                                          D: {
                                            if (!C3) {
                                              D3 = 0, I = 0, v3 = 0;
                                              break D;
                                            }
                                            if (ja(u3 + 72 | 0, b3, C3 - 1 | 0), I = c2[u3 + 76 >> 2], !I) break l;
                                            D3 = c2[u3 + 72 >> 2], v3 = l2[D3 | 0] << 1;
                                          }
                                          if (r4 = c2[e5 + 16 >> 2], c2[u3 + 88 >> 2] = 0, c2[u3 + 92 >> 2] = 0, c2[u3 + 80 >> 2] = 0, c2[u3 + 84 >> 2] = 0, c2[u3 + 72 >> 2] = 0, c2[u3 + 76 >> 2] = 0, c2[u3 + 16 >> 2] = 0, c2[u3 + 8 >> 2] = 0, c2[u3 + 12 >> 2] = 0, g3 = C3 - r4 | 0, !((g3 | 0) <= 0 | (g3 | 0) > (k2 | 0))) {
                                            if (ja(u3 + 48 | 0, c2[e5 + 20 >> 2], g3 - 1 | 0), r4 = c2[u3 + 52 >> 2], c2[u3 + 76 >> 2] = r4, f3 = c2[u3 + 48 >> 2], c2[u3 + 72 >> 2] = f3, !r4) break l;
                                            r4 = l2[f3 | 0], c2[u3 + 8 >> 2] = r4, _3 = r4 >>> 2 & 32;
                                          }
                                          y3 = 0, r4 = 0;
                                          E: {
                                            if ((g3 | 0) < 0 || (r4 = 0, (g3 | 0) >= (k2 | 0))) break E;
                                            if (ja(u3 + 48 | 0, c2[e5 + 20 >> 2], g3), r4 = c2[u3 + 52 >> 2], c2[u3 + 84 >> 2] = r4, f3 = c2[u3 + 48 >> 2], c2[u3 + 80 >> 2] = f3, !r4) break l;
                                            r4 = l2[f3 | 0], c2[u3 + 12 >> 2] = r4, r4 = r4 >>> 4 & 12;
                                          }
                                          if (!((g3 | 0) < -1 | (g3 | 0) >= (A2 | 0))) {
                                            if (ja(u3 + 48 | 0, c2[e5 + 20 >> 2], g3 + 1 | 0), g3 = c2[u3 + 52 >> 2], c2[u3 + 92 >> 2] = g3, f3 = c2[u3 + 48 >> 2], c2[u3 + 88 >> 2] = f3, !g3) break l;
                                            g3 = l2[f3 | 0], c2[u3 + 16 >> 2] = g3, y3 = g3 >>> 6 | 0;
                                          }
                                          if (w3) break C;
                                          _3 = r4 | v3 & 384 | _3 | y3, f3 = 0, P2 = c2[u3 + 32 >> 2], z = c2[u3 + 36 >> 2], S3 = 0;
                                          F: for (; ; ) {
                                            if ((f3 | 0) >= (x3 | 0)) break B;
                                            G: {
                                              if (!C3) {
                                                r4 = f3 + 8 | 0;
                                                break G;
                                              }
                                              if (v3 <<= 8, r4 = f3 + 8 | 0, (x3 | 0) <= (r4 | 0)) break G;
                                              if (g3 = (f3 >>> 3 | 0) + 1 | 0, g3 >>> 0 >= I >>> 0) break l;
                                              v3 = l2[g3 + D3 | 0] << 1 | v3;
                                            }
                                            for (g3 = f3 >>> 3 | 0, y3 = g3 + 1 | 0, f3 = 0, h3 = u3 + 8 | 0; ; ) {
                                              if ((f3 | 0) == 24) for (f3 = 0, h3 = S3 + x3 | 0, h3 = (h3 | 0) > 0 ? h3 : 0, y3 = (h3 | 0) >= 8 ? 8 : h3, B = c2[u3 + 16 >> 2], j2 = c2[u3 + 12 >> 2], L = c2[u3 + 8 >> 2], h3 = 0; ; ) {
                                                if ((f3 | 0) == (y3 | 0)) {
                                                  if (g3 >>> 0 >= z >>> 0) break l;
                                                  a3[g3 + P2 | 0] = h3, S3 = S3 - 8 | 0, f3 = r4;
                                                  continue F;
                                                }
                                                if (_3 >>> 0 >= O3 >>> 0) break l;
                                                _3 <<= 1, N2 = ka(n4, _3 + F | 0), R = f3 ^ 7, h3 = N2 << R | h3, _3 = B >>> 13 - f3 & 1 | (j2 >>> 11 - f3 & 4 | (L >>> 9 - f3 & 32 | (v3 >>> R & 128 | _3 & 794 | N2 << 6))), f3 = f3 + 1 | 0;
                                              }
                                              B = (u3 + 72 | 0) + f3 | 0, j2 = c2[B + 4 >> 2];
                                              H: {
                                                if (!j2 || (L = c2[h3 >> 2] << 8, c2[h3 >> 2] = L, (r4 | 0) >= (T3 | 0))) break H;
                                                if (y3 >>> 0 >= j2 >>> 0) break l;
                                                c2[h3 >> 2] = L | l2[y3 + c2[B >> 2] | 0];
                                              }
                                              h3 = h3 + 4 | 0, f3 = f3 + 8 | 0;
                                            }
                                          }
                                        }
                                        c2[u3 + 44 >> 2] = 0;
                                        break h;
                                      }
                                      for (Cb(u3 + 48 | 0, c2[e5 + 20 >> 2], C3), _3 = r4 | v3 & 384 | _3 | y3, g3 = 0, z = c2[u3 + 32 >> 2], B = c2[u3 + 36 >> 2], j2 = c2[u3 + 60 >> 2], L = c2[u3 + 56 >> 2], P2 = 0; ; ) {
                                        if ((g3 | 0) >= (x3 | 0)) break B;
                                        I: {
                                          if (!C3) {
                                            r4 = g3 + 8 | 0;
                                            break I;
                                          }
                                          if (v3 <<= 8, r4 = g3 + 8 | 0, (x3 | 0) <= (r4 | 0)) break I;
                                          if (f3 = (g3 >>> 3 | 0) + 1 | 0, f3 >>> 0 >= I >>> 0) break l;
                                          v3 = l2[f3 + D3 | 0] << 1 | v3;
                                        }
                                        for (S3 = g3 >>> 3 | 0, y3 = S3 + 1 | 0, f3 = 0, h3 = u3 + 8 | 0; ; ) {
                                          J: {
                                            if ((f3 | 0) == 24) for (f3 = 0, h3 = x3 + P2 | 0, h3 = (h3 | 0) > 0 ? h3 : 0, N2 = (h3 | 0) >= 8 ? 8 : h3, R = c2[u3 + 16 >> 2], V = c2[u3 + 12 >> 2], W = c2[u3 + 8 >> 2], y3 = 0; ; ) {
                                              if ((f3 | 0) == (N2 | 0)) break J;
                                              U = c2[c2[e5 + 20 >> 2] + 20 >> 2], G = f3 + g3 | 0, h3 = ia(U, G, L, j2);
                                              K: {
                                                if (l2[e5 + 1 | 0] == 1 && Bb(U, G, h3, u3 + 48 | 0)) break K;
                                                if (l2[n4 | 0]) break i;
                                                if (_3 >>> 0 >= O3 >>> 0) break l;
                                                h3 = ka(n4, F + (_3 << 1) | 0);
                                              }
                                              U = f3 ^ 7, _3 = R >>> 13 - f3 & 1 | (V >>> 11 - f3 & 4 | (W >>> 9 - f3 & 32 | (v3 >>> U & 128 | _3 << 1 & 794 | h3 << 6))), f3 = f3 + 1 | 0, y3 = h3 << U | y3;
                                            }
                                            N2 = (u3 + 72 | 0) + f3 | 0, R = c2[N2 + 4 >> 2];
                                            L: {
                                              if (!R || (V = c2[h3 >> 2] << 8, c2[h3 >> 2] = V, (r4 | 0) >= (T3 | 0))) break L;
                                              if (y3 >>> 0 >= R >>> 0) break l;
                                              c2[h3 >> 2] = V | l2[y3 + c2[N2 >> 2] | 0];
                                            }
                                            h3 = h3 + 4 | 0, f3 = f3 + 8 | 0;
                                            continue;
                                          }
                                          break;
                                        }
                                        if (S3 >>> 0 >= B >>> 0) break l;
                                        a3[S3 + z | 0] = y3, P2 = P2 - 8 | 0, g3 = r4;
                                      }
                                    }
                                    C3 = C3 + 1 | 0;
                                  }
                                }
                                if (b3 = ua(C3, P2), c2[u3 + 32 >> 2] = b3, f3 = c2[b3 + 16 >> 2], !f3) break k;
                                for (F = r4, h3 = c2[b3 + 12 >> 2]; (f3 | 0) > 0; ) a3[h3 | 0] = 0, f3 = f3 - 1 | 0, h3 = h3 + 1 | 0;
                                for (B = F + 16 | 0; d2[P2 >> 2] > w3 >>> 0; ) {
                                  if (l2[e5 + 1 | 0] == 1) {
                                    if (l2[n4 | 0]) break k;
                                    if ((s3 | 0) == 8 | s3 >>> 0 < 8) break l;
                                    k2 = ka(n4, B) ^ k2;
                                  }
                                  ja(u3 + 8 | 0, b3, w3), r4 = u3 + 72 | 0, ja(r4, b3, w3 - 1 | 0), O3 = c2[u3 + 76 >> 2], x3 = c2[u3 + 72 >> 2], v3 = c2[e5 + 20 >> 2], jd(r4, c2[e5 + 16 >> 2], v3, w3), _3 = 0, D3 = c2[b3 + 20 >> 2], _3 = !O3 | (D3 | 0) < 2 ? _3 : l2[x3 | 0] >>> 6 & 1, _3 = !O3 | (D3 | 0) <= 0 ? _3 : l2[x3 | 0] >>> 6 & 2 | _3, h3 = c2[v3 + 20 >> 2], f3 = c2[e5 + 12 >> 2], r4 = 0 - f3 | 0, T3 = c2[u3 + 72 >> 2], A2 = c2[u3 + 76 >> 2], ia(h3, r4, T3, A2), g3 = ia(h3, r4, T3, A2), S3 = 1 - f3 | 0, E3 = c2[u3 + 80 >> 2], I = c2[u3 + 84 >> 2], y3 = ia(h3, S3, E3, I) | ia(h3, r4, E3, I) << 1 | ia(h3, f3 ^ -1, E3, I) << 2, H = c2[u3 + 88 >> 2], z = c2[u3 + 92 >> 2], S3 = ia(h3, S3, H, z) | ia(h3, r4, H, z) << 1;
                                  M: {
                                    if (!k2) for (h3 = 0, v3 = c2[u3 + 12 >> 2], D3 = c2[u3 + 8 >> 2], f3 = 0; ; ) {
                                      if (d2[C3 >> 2] <= f3 >>> 0) break M;
                                      if (l2[n4 | 0]) break k;
                                      if (r4 = y3 << 2 | g3 << 5 | h3 << 6 | _3 << 7 | S3, r4 >>> 0 >= s3 >>> 0) break l;
                                      h3 = ka(n4, F + (r4 << 1) | 0), Ea(c2[b3 + 20 >> 2], f3, D3, v3, h3), g3 = c2[e5 + 12 >> 2], _3 = ia(c2[b3 + 20 >> 2], f3 + 2 | 0, x3, O3) | _3 << 1 & 6, r4 = c2[c2[e5 + 20 >> 2] + 20 >> 2], j2 = f3 - g3 | 0, g3 = ia(r4, j2 + 1 | 0, T3, A2), j2 = j2 + 2 | 0, y3 = ia(r4, j2, E3, I) | y3 << 1 & 6, S3 = ia(r4, j2, H, z) | S3 << 1 & 2, f3 = f3 + 1 | 0;
                                    }
                                    for (Cb(u3 + 48 | 0, v3, w3), r4 = 0, j2 = c2[u3 + 12 >> 2], L = c2[u3 + 8 >> 2], N2 = c2[u3 + 60 >> 2], R = c2[u3 + 56 >> 2], f3 = 0; ; ) {
                                      if (d2[C3 >> 2] <= f3 >>> 0) break M;
                                      v3 = ia(h3, f3, R, N2);
                                      N: {
                                        if (l2[e5 + 1 | 0] == 1 && Bb(h3, f3, v3, u3 + 48 | 0)) break N;
                                        if (l2[n4 | 0] == 1) break k;
                                        if (r4 = y3 << 2 | g3 << 5 | r4 << 6 | _3 << 7 | S3, r4 >>> 0 >= s3 >>> 0) break l;
                                        v3 = ka(n4, F + (r4 << 1) | 0), D3 = c2[b3 + 20 >> 2];
                                      }
                                      Ea(D3, f3, L, j2, v3), r4 = c2[e5 + 12 >> 2], D3 = c2[b3 + 20 >> 2], _3 = ia(D3, f3 + 2 | 0, x3, O3) | _3 << 1 & 6, h3 = c2[c2[e5 + 20 >> 2] + 20 >> 2], r4 = f3 - r4 | 0, g3 = ia(h3, r4 + 1 | 0, T3, A2), r4 = r4 + 2 | 0, y3 = ia(h3, r4, E3, I) | y3 << 1 & 6, S3 = ia(h3, r4, H, z) | S3 << 1 & 2, f3 = f3 + 1 | 0, r4 = v3;
                                    }
                                  }
                                  w3 = w3 + 1 | 0;
                                }
                                c2[u3 + 32 >> 2] = 0;
                                break j;
                              }
                              o();
                            }
                            b3 = 0;
                          }
                          la(u3 + 32 | 0);
                          break a;
                        }
                        b3 = 0;
                      }
                      la(u3 + 44 | 0);
                      break a;
                    }
                    b3 = 0;
                  }
                  la(u3 + 44 | 0);
                  break a;
                }
                b3 = 0;
              }
              la(u3 + 44 | 0);
            }
          }
          return M = u3 + 96 | 0, b3;
        }
        function cd(e5, n4, r4, s3, u3, f3, h3, g3) {
          var _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0, A2 = 0, j2 = 0, N2 = 0, P2 = 0, F = 0, I = 0, L = 0, R = 0, z = 0, B = 0, V = 0, H = 0;
          _3 = M - 32 | 0, M = _3;
          a: {
            b: {
              if (s3 = s3 - (r4 >>> 0 < 1048577) | 0, y3 = (s3 | 0) == -1 & r4 - 1048577 >>> 0 < 4292870143 | (s3 | 0) != -1, s3 = f3 - (u3 >>> 0 < 1048577) | 0, y3 | ((s3 | 0) == -1 & u3 - 1048577 >>> 0 < 4292870143 | (s3 | 0) != -1) || (y3 = c2[g3 + 4 >> 2], b3 = c2[g3 + 12 >> 2], v3 = c2[g3 >> 2], C3 = c2[g3 + 8 >> 2], c2[_3 + 28 >> 2] = c2[n4 + 20 >> 2], a3[_3 + 24 | 0] = 1, s3 = r4, f3 = bd(_3 + 24 | 0, r4), w3 = l2[f3 | 0], g3 = c2[_3 + 28 >> 2], x3 = c2[n4 + 24 >> 2], c2[f3 >> 2] = 1, c2[f3 + 4 >> 2] = x3, x3 = bd(f3, u3), f3 = b3 - y3 | 0, b3 = c2[_3 + 28 >> 2], x3 = l2[x3 | 0] ? (f3 | 0) < (b3 | 0) ? f3 : b3 : f3, b3 = u3 & u3 >> 31, f3 = C3 - v3 | 0, j2 = w3 ? (f3 | 0) < (g3 | 0) ? f3 : g3 : f3, r4 &= r4 >> 31, T3 = 0 - r4 | 0, !((x3 | 0) > (0 - b3 | 0) & (j2 | 0) > (T3 | 0)))) break b;
              if (f3 = v3 - r4 | 0, (f3 | 0) < 0 || (r4 = c2[e5 + 28 >> 2], A2 = (r4 | 0) / 4 | 0, C3 = f3 >>> 5 | 0, A2 >>> 0 <= C3 >>> 0) || (g3 = c2[n4 + 28 >> 2], E3 = (g3 | 0) / 4 | 0, f3 = (s3 | 0) > 0 ? s3 : 0, w3 = f3 >>> 5 | 0, E3 >>> 0 <= w3 >>> 0) || (v3 = _3 + 16 | 0, S3 = y3 - b3 | 0, y3 = b3 + x3 | 0, cc(v3, e5, S3, y3), b3 = c2[_3 + 20 >> 2], x3 = c2[_3 + 16 >> 2], cc(v3, n4, (u3 | 0) > 0 ? u3 : 0, y3), v3 = c2[_3 + 20 >> 2], !v3)) break a;
              if (I = -1 >>> f3 | 0, y3 = s3 + j2 | 0, L = -1 << 0 - y3, u3 = T3 & 31, S3 = f3 & 31, D3 = A2 - C3 | 0, (f3 ^ y3 - 1) >>> 0 <= 31) {
                if (s3 = I & L, (T3 ^ j2 - 1) >>> 0 >= 32) for (y3 = u3 - S3 | 0, S3 = 32 - y3 | 0, T3 = C3 << 2; ; ) {
                  if (!v3) break b;
                  if (b3 >>> 0 < C3 >>> 0 | D3 >>> 0 > b3 - C3 >>> 0 || (c2[_3 + 12 >> 2] = D3, c2[_3 + 8 >> 2] = x3 + T3, u3 = (g3 | 0) / 4 | 0, u3 >>> 0 > v3 >>> 0) || (f3 = c2[_3 + 16 >> 2], r4 = Ya(_3 + 8 | 0), !c2[_3 + 12 >> 2] | u3 >>> 0 < w3 >>> 0 | (u3 | 0) == (w3 | 0)) || (u3 = (((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8)) << y3, r4 = c2[c2[_3 + 8 >> 2] >> 2], g3 = u3 | (((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8)) >>> S3, u3 = f3 + (w3 << 2) | 0, r4 = c2[u3 >> 2], r4 = Ma(h3, g3, ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), s3), g3 = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 | 0, V = u3, H = Ae(r4, 8) ^ g3, c2[V >> 2] = H, r4 = c2[e5 + 28 >> 2] / 4 | 0, r4 >>> 0 > b3 >>> 0) || (g3 = c2[n4 + 28 >> 2], u3 = (g3 | 0) / 4 | 0, u3 >>> 0 > v3 >>> 0)) break a;
                  c2[_3 + 16 >> 2] = f3 + (u3 << 2), v3 = v3 - u3 | 0, b3 = b3 - r4 | 0, x3 = (r4 << 2) + x3 | 0;
                }
                if (u3 >>> 0 > S3 >>> 0) for (y3 = u3 - S3 | 0, S3 = C3 << 2; ; ) {
                  if (!v3) break b;
                  if (r4 = (r4 | 0) / 4 | 0, r4 >>> 0 > b3 >>> 0 || (u3 = (g3 | 0) / 4 | 0, r4 >>> 0 < C3 >>> 0 | u3 >>> 0 > v3 >>> 0 | ((r4 | 0) == (C3 | 0) | u3 >>> 0 < w3 >>> 0) | (u3 | 0) == (w3 | 0)) || (D3 = c2[_3 + 16 >> 2], u3 = D3 + (w3 << 2) | 0, r4 = c2[x3 + S3 >> 2], f3 = (((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8)) << y3, r4 = c2[u3 >> 2], r4 = Ma(h3, f3, ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), s3), V = u3, H = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), c2[V >> 2] = H, r4 = c2[e5 + 28 >> 2], u3 = (r4 | 0) / 4 | 0, u3 >>> 0 > b3 >>> 0) || (g3 = c2[n4 + 28 >> 2], f3 = (g3 | 0) / 4 | 0, f3 >>> 0 > v3 >>> 0)) break a;
                  c2[_3 + 16 >> 2] = D3 + (f3 << 2), v3 = v3 - f3 | 0, b3 = b3 - u3 | 0, x3 = (u3 << 2) + x3 | 0;
                }
                for (y3 = S3 - u3 | 0, S3 = C3 << 2; ; ) {
                  if (!v3) break b;
                  if (r4 = (r4 | 0) / 4 | 0, r4 >>> 0 > b3 >>> 0 || (u3 = (g3 | 0) / 4 | 0, r4 >>> 0 < C3 >>> 0 | u3 >>> 0 > v3 >>> 0 | ((r4 | 0) == (C3 | 0) | u3 >>> 0 < w3 >>> 0) | (u3 | 0) == (w3 | 0)) || (D3 = c2[_3 + 16 >> 2], u3 = D3 + (w3 << 2) | 0, r4 = c2[x3 + S3 >> 2], f3 = (((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8)) >>> y3 | 0, r4 = c2[u3 >> 2], r4 = Ma(h3, f3, ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), s3), V = u3, H = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), c2[V >> 2] = H, r4 = c2[e5 + 28 >> 2], u3 = (r4 | 0) / 4 | 0, u3 >>> 0 > b3 >>> 0) || (g3 = c2[n4 + 28 >> 2], f3 = (g3 | 0) / 4 | 0, f3 >>> 0 > v3 >>> 0)) break a;
                  c2[_3 + 16 >> 2] = D3 + (f3 << 2), v3 = v3 - f3 | 0, b3 = b3 - u3 | 0, x3 = (u3 << 2) + x3 | 0;
                }
              }
              if (j2 = y3 & 31, s3 = E3 - w3 | 0, A2 = A2 - (T3 >>> 5 | 0) | 0, u3 >>> 0 <= S3 >>> 0) {
                if ((u3 | 0) == (S3 | 0)) {
                  if (y3 = ((y3 | 0) / 32 | 0) - (f3 + 31 >>> 5 | 0) | 0, (y3 | 0) < 0) break a;
                  N2 = C3 << 2;
                  c: for (; ; ) {
                    if (!v3) break b;
                    if (b3 >>> 0 < C3 >>> 0 | D3 >>> 0 > b3 - C3 >>> 0 || (c2[_3 + 12 >> 2] = D3, c2[_3 + 8 >> 2] = x3 + N2, v3 >>> 0 < w3 >>> 0 | s3 >>> 0 > v3 - w3 >>> 0) || (c2[_3 + 4 >> 2] = s3, O3 = c2[_3 + 16 >> 2], c2[_3 >> 2] = O3 + (w3 << 2), f3 = s3, S3 && (r4 = Ya(_3 + 8 | 0), u3 = bc(_3), f3 = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), r4 = c2[u3 >> 2], r4 = Ma(h3, f3, ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), I), V = u3, H = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), c2[V >> 2] = H, f3 = c2[_3 + 4 >> 2]), f3 >>> 0 < y3 >>> 0) || (r4 = c2[_3 + 8 >> 2], d2[_3 + 12 >> 2] < y3 >>> 0)) break a;
                    for (g3 = c2[_3 >> 2], P2 = y3 << 2, T3 = g3 + P2 | 0, A2 = c2[_3 + 12 >> 2], u3 = r4; ; ) if ((g3 | 0) == (T3 | 0)) {
                      if (j2) {
                        if ((y3 | 0) == (A2 | 0) | y3 >>> 0 > A2 >>> 0 | (f3 | 0) == (y3 | 0)) break a;
                        r4 = c2[u3 + P2 >> 2], u3 = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), r4 = c2[T3 >> 2], r4 = Ma(h3, u3, ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), L), V = T3, H = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), c2[V >> 2] = H;
                      }
                      if (r4 = c2[e5 + 28 >> 2] / 4 | 0, r4 >>> 0 > b3 >>> 0 || (u3 = c2[n4 + 28 >> 2] / 4 | 0, u3 >>> 0 > v3 >>> 0)) break a;
                      c2[_3 + 16 >> 2] = O3 + (u3 << 2), v3 = v3 - u3 | 0, b3 = b3 - r4 | 0, x3 = (r4 << 2) + x3 | 0;
                      continue c;
                    } else {
                      E3 = c2[r4 >> 2], k2 = ((Ae(E3, 16) ^ E3) & -16711936) >>> 8 ^ Ae(E3, 8), E3 = c2[g3 >> 2], E3 = yb(h3, k2, ((Ae(E3, 16) ^ E3) & -16711936) >>> 8 ^ Ae(E3, 8)), V = g3, H = ((Ae(E3, 16) ^ E3) & -16711936) >>> 8 ^ Ae(E3, 8), c2[V >> 2] = H, r4 = r4 + 4 | 0, g3 = g3 + 4 | 0;
                      continue;
                    }
                  }
                }
                if (y3 = ((y3 | 0) / 32 | 0) - (f3 + 31 >>> 5 | 0) | 0, (y3 | 0) < 0) break a;
                S3 = S3 - u3 | 0, E3 = 32 - S3 | 0, P2 = C3 << 2;
                d: for (; ; ) {
                  if (!v3) break b;
                  if (b3 >>> 0 < C3 >>> 0 | D3 >>> 0 > b3 - C3 >>> 0 || (c2[_3 + 12 >> 2] = D3, r4 = x3 + P2 | 0, c2[_3 + 8 >> 2] = r4, v3 >>> 0 < w3 >>> 0 | s3 >>> 0 > v3 - w3 >>> 0)) break a;
                  if (c2[_3 + 4 >> 2] = s3, k2 = c2[_3 + 16 >> 2], c2[_3 >> 2] = k2 + (w3 << 2), j2) {
                    if (D3 >>> 0 < A2 >>> 0) break a;
                    c2[_3 + 12 >> 2] = A2, c2[_3 + 8 >> 2] = r4;
                  }
                  if (r4 = Ya(_3 + 8 | 0), u3 = bc(_3), f3 = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), r4 = c2[u3 >> 2], r4 = Ma(h3, f3 >>> S3 | 0, ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), I), V = u3, H = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), c2[V >> 2] = H, R = c2[_3 + 4 >> 2], R >>> 0 < y3 >>> 0 || (r4 = c2[_3 + 8 >> 2], d2[_3 + 12 >> 2] < y3 >>> 0)) break a;
                  for (g3 = c2[_3 >> 2], F = y3 << 2, T3 = g3 + F | 0, N2 = c2[_3 + 12 >> 2], u3 = r4; ; ) if ((g3 | 0) == (T3 | 0)) {
                    if (j2) {
                      if (y3 >>> 0 > N2 >>> 0 || (g3 = f3 << E3, (y3 | 0) != (N2 | 0) && (r4 = c2[u3 + F >> 2], g3 = (((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8)) >>> S3 | g3), (y3 | 0) == (R | 0))) break a;
                      r4 = c2[T3 >> 2], r4 = Ma(h3, g3, ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), L), V = T3, H = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), c2[V >> 2] = H;
                    }
                    if (r4 = c2[e5 + 28 >> 2] / 4 | 0, r4 >>> 0 > b3 >>> 0 || (u3 = c2[n4 + 28 >> 2] / 4 | 0, u3 >>> 0 > v3 >>> 0)) break a;
                    c2[_3 + 16 >> 2] = k2 + (u3 << 2), v3 = v3 - u3 | 0, b3 = b3 - r4 | 0, x3 = (r4 << 2) + x3 | 0;
                    continue d;
                  } else {
                    z = f3 << E3, f3 = c2[r4 >> 2], f3 = ((Ae(f3, 16) ^ f3) & -16711936) >>> 8 ^ Ae(f3, 8), O3 = c2[g3 >> 2], O3 = yb(h3, z | f3 >>> S3, ((Ae(O3, 16) ^ O3) & -16711936) >>> 8 ^ Ae(O3, 8)), V = g3, H = ((Ae(O3, 16) ^ O3) & -16711936) >>> 8 ^ Ae(O3, 8), c2[V >> 2] = H, r4 = r4 + 4 | 0, g3 = g3 + 4 | 0;
                    continue;
                  }
                }
              }
              if (T3 = ((y3 | 0) / 32 | 0) - (f3 + 31 >>> 5 | 0) | 0, (T3 | 0) < 0) break a;
              E3 = u3 - S3 | 0, N2 = 32 - E3 | 0, R = C3 << 2;
              e: for (; ; ) {
                if (!v3) break b;
                if (b3 >>> 0 < C3 >>> 0 | D3 >>> 0 > b3 - C3 >>> 0 || (c2[_3 + 12 >> 2] = D3, r4 = x3 + R | 0, c2[_3 + 8 >> 2] = r4, v3 >>> 0 < w3 >>> 0 | s3 >>> 0 > v3 - w3 >>> 0)) break a;
                if (c2[_3 + 4 >> 2] = s3, F = c2[_3 + 16 >> 2], c2[_3 >> 2] = F + (w3 << 2), j2) {
                  if (D3 >>> 0 < A2 >>> 0) break a;
                  c2[_3 + 12 >> 2] = A2, c2[_3 + 8 >> 2] = r4;
                }
                if (u3 = _3 + 8 | 0, r4 = Ya(u3), f3 = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), S3 ? (r4 = Ya(u3), u3 = bc(_3), g3 = f3 << E3, f3 = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), r4 = c2[u3 >> 2], r4 = Ma(h3, g3 | f3 >>> N2, ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), I), V = u3, H = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), c2[V >> 2] = H, u3 = c2[_3 + 4 >> 2]) : u3 = s3, u3 >>> 0 < T3 >>> 0 || (r4 = c2[_3 + 8 >> 2], d2[_3 + 12 >> 2] < T3 >>> 0)) break a;
                for (g3 = c2[_3 >> 2], z = T3 << 2, O3 = g3 + z | 0, P2 = c2[_3 + 12 >> 2], y3 = r4; ; ) if ((g3 | 0) == (O3 | 0)) {
                  if (j2) {
                    if (T3 >>> 0 > P2 >>> 0 || (g3 = f3 << E3, (T3 | 0) != (P2 | 0) && (r4 = c2[y3 + z >> 2], g3 = (((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8)) >>> N2 | g3), (u3 | 0) == (T3 | 0))) break a;
                    r4 = c2[O3 >> 2], r4 = Ma(h3, g3, ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), L), V = O3, H = ((Ae(r4, 16) ^ r4) & -16711936) >>> 8 ^ Ae(r4, 8), c2[V >> 2] = H;
                  }
                  if (r4 = c2[e5 + 28 >> 2] / 4 | 0, r4 >>> 0 > b3 >>> 0 || (u3 = c2[n4 + 28 >> 2] / 4 | 0, u3 >>> 0 > v3 >>> 0)) break a;
                  c2[_3 + 16 >> 2] = F + (u3 << 2), v3 = v3 - u3 | 0, b3 = b3 - r4 | 0, x3 = (r4 << 2) + x3 | 0;
                  continue e;
                } else {
                  B = f3 << E3, f3 = c2[r4 >> 2], f3 = ((Ae(f3, 16) ^ f3) & -16711936) >>> 8 ^ Ae(f3, 8), k2 = c2[g3 >> 2], k2 = yb(h3, B | f3 >>> N2, ((Ae(k2, 16) ^ k2) & -16711936) >>> 8 ^ Ae(k2, 8)), V = g3, H = ((Ae(k2, 16) ^ k2) & -16711936) >>> 8 ^ Ae(k2, 8), c2[V >> 2] = H, r4 = r4 + 4 | 0, g3 = g3 + 4 | 0;
                  continue;
                }
              }
            }
            M = _3 + 32 | 0;
            return;
          }
          o();
        }
        function Gd(e5, n4, r4, s3) {
          var u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0;
          u3 = M - 128 | 0, M = u3, x3 = ua(e5 + 8 | 0, e5 + 12 | 0), c2[u3 + 124 >> 2] = x3, f3 = c2[x3 + 16 >> 2];
          a: {
            if (!f3) break a;
            Mb(c2[x3 + 12 >> 2], f3, l2[e5 + 4 | 0]), v3 = td(n4), c2[u3 + 116 >> 2] = v3, h3 = 0;
            b: {
              if (ya(v3, c2[e5 + 152 >> 2], u3 + 120 | 0)) break b;
              c2[u3 + 108 >> 2] = c2[u3 + 120 >> 2], a3[u3 + 104 | 0] = 1, T3 = xb(u3 + 104 | 0, c2[e5 + 20 >> 2]), h3 = T3, g3 = c2[u3 + 108 >> 2], f3 = 0 - g3 | 0, c2[h3 >> 2] = l2[h3 | 0] & (g3 | 0) != -2147483648, c2[h3 + 4 >> 2] = f3, c2[u3 + 100 >> 2] = 0, a3[u3 + 96 | 0] = 1, O3 = e5 + 28 | 0;
              c: {
                d: {
                  e: for (; ; ) {
                    if (d2[e5 + 16 >> 2] > E3 >>> 0) {
                      if (ya(v3, c2[e5 + 152 >> 2], u3 + 92 | 0)) break c;
                      for (c2[u3 + 84 >> 2] = c2[u3 + 92 >> 2], h3 = 1, a3[u3 + 80 | 0] = 1, g3 = xb(u3 + 80 | 0, c2[e5 + 20 >> 2]), D3 = Zc(T3, c2[g3 >> 2], c2[g3 + 4 >> 2]), c2[u3 + 76 >> 2] = 0, a3[u3 + 72 | 0] = 1; ; ) {
                        f: {
                          if (h3 & 1) {
                            if (ya(v3, c2[e5 + 144 >> 2], u3 + 12 | 0)) break c;
                            h3 = La(u3 + 96 | 0, c2[u3 + 12 >> 2]), f3 = c2[h3 + 4 >> 2], c2[u3 + 72 >> 2] = c2[h3 >> 2], c2[u3 + 76 >> 2] = f3;
                            break f;
                          }
                          g: switch (ya(v3, c2[e5 + 148 >> 2], u3 + 12 | 0) | 0) {
                            case 0:
                              break g;
                            case 1:
                              continue e;
                            default:
                              break c;
                          }
                          La(La(u3 + 72 | 0, c2[u3 + 12 >> 2]), a3[e5 + 5 | 0]);
                        }
                        if (h3 = 0, f3 = c2[e5 + 20 >> 2], (f3 | 0) != 1) {
                          if (f3 = ib(f3), Fa(n4, f3 >>> 0 <= 1 ? 1 : f3, u3 + 12 | 0)) break c;
                          h3 = l2[u3 + 12 | 0];
                        }
                        if (f3 = c2[D3 + 4 >> 2], !(c2[D3 >> 2] & 1) || (w3 = f3 + h3 | 0, (w3 & (f3 ^ -1)) < 0) || ya(v3, O3, u3 + 68 | 0)) break c;
                        h: {
                          i: {
                            j: {
                              if (!l2[e5 + 1 | 0]) {
                                a3[u3 + 64 | 0] = 0, c2[u3 + 60 >> 2] = 0;
                                break j;
                              }
                              if (f3 = c2[n4 >> 2], h3 = c2[n4 + 8 >> 2], h3 >>> 0 >= d2[n4 + 4 >> 2]) break c;
                              if (h3 = l2[f3 + h3 | 0], f3 = c2[n4 + 12 >> 2], Tb(n4), a3[u3 + 64 | 0] = 0, c2[u3 + 60 >> 2] = 0, h3 >>> 7 - f3 & 1) break i;
                            }
                            Yc(u3 + 60 | 0, c2[c2[e5 + 124 >> 2] + (c2[u3 + 68 >> 2] << 2) >> 2]);
                            break h;
                          }
                          if (ya(v3, c2[e5 + 156 >> 2], u3 + 56 | 0) || ya(v3, c2[e5 + 160 >> 2], u3 + 52 | 0) || ya(v3, c2[e5 + 164 >> 2], u3 + 48 | 0) || ya(v3, c2[e5 + 168 >> 2], u3 + 44 | 0) || ya(v3, c2[e5 + 172 >> 2], u3 + 40 | 0) || (sa(n4), y3 = c2[c2[e5 + 124 >> 2] + (c2[u3 + 68 >> 2] << 2) >> 2], !y3) || (b3 = c2[u3 + 56 >> 2], h3 = b3 >> 31, f3 = c2[y3 + 20 >> 2] + b3 | 0, f3 >>> 0 < b3 >>> 0 ? h3 + 1 | 0 : h3) || (_3 = c2[u3 + 52 >> 2], g3 = _3 >> 31, h3 = _3 + c2[y3 + 24 >> 2] | 0, h3 >>> 0 < _3 >>> 0 ? g3 + 1 | 0 : g3) || (g3 = c2[n4 + 8 >> 2], wb(u3 + 12 | 0, b3, 2, c2[u3 + 48 >> 2]), wb(u3 + 32 | 0, _3, 2, c2[u3 + 44 >> 2]), !(a3[u3 + 36 | 0] & 1) | l2[u3 + 16 | 0] != 1) || (_3 = kb(), c2[u3 + 28 >> 2] = _3, c2[_3 + 8 >> 2] = h3, c2[_3 + 4 >> 2] = f3, f3 = l2[e5 + 2 | 0], c2[_3 + 20 >> 2] = y3, a3[_3 | 0] = f3, c2[_3 + 12 >> 2] = c2[u3 + 12 >> 2], f3 = c2[u3 + 32 >> 2], h3 = 0, a3[_3 + 1 | 0] = 0, c2[_3 + 16 >> 2] = f3, a3[_3 + 24 | 0] = l2[e5 + 176 | 0], a3[_3 + 25 | 0] = l2[e5 + 177 | 0], a3[_3 + 26 | 0] = l2[e5 + 178 | 0], a3[_3 + 27 | 0] = l2[e5 + 179 | 0], f3 = Na(n4), c2[u3 + 24 >> 2] = f3, ac(Xc(u3 + 60 | 0, jb(_3, f3, r4, s3))) && (sa(n4), h3 = c2[n4 + 8 >> 2], h3 >>> 0 <= 4294967293 && (h3 = h3 + 2 | 0, f3 = c2[n4 + 4 >> 2], h3 = f3 >>> 0 > h3 >>> 0 ? h3 : f3, c2[n4 + 8 >> 2] = h3), h3 = c2[u3 + 40 >> 2] == (h3 - g3 | 0)), ta(u3 + 24 | 0), Ua(u3 + 28 | 0), !h3)) break d;
                        }
                        if (f3 = u3 + 60 | 0, ac(f3)) {
                          y3 = c2[Ta(f3) + 20 >> 2], f3 = Ta(f3), S3 = c2[e5 + 140 >> 2], b3 = c2[f3 + 24 >> 2];
                          k: {
                            l: {
                              if (_3 = l2[e5 + 3 | 0], !_3) {
                                if (f3 = l2[u3 + 72 | 0], (S3 & -2) != 2) break l;
                                if (!(f3 & 1) || (g3 = c2[u3 + 76 >> 2], h3 = g3 >> 31, f3 = y3 - 1 | 0, C3 = f3, f3 = f3 + g3 | 0, h3 = C3 >>> 0 > f3 >>> 0 ? h3 + 1 | 0 : h3, g3 = f3 >>> 0 < 2147483648 & (h3 | 0) <= 0 | (h3 | 0) < 0, c2[u3 + 72 >> 2] = 0 | g3, c2[u3 + 76 >> 2] = g3 ? f3 : 0, !g3)) break d;
                                break k;
                              }
                              f3 = l2[u3 + 72 | 0];
                              m: switch (S3 | 0) {
                                default:
                                  if (!(f3 & 1)) break d;
                                  break k;
                                case 0:
                                case 2:
                                  break m;
                              }
                              if (!(f3 & 1)) break d;
                              if (g3 = c2[u3 + 76 >> 2], h3 = g3 >> 31, f3 = b3 - 1 | 0, C3 = f3, f3 = f3 + g3 | 0, h3 = C3 >>> 0 > f3 >>> 0 ? h3 + 1 | 0 : h3, g3 = f3 >>> 0 < 2147483648 & (h3 | 0) <= 0 | (h3 | 0) < 0, c2[u3 + 72 >> 2] = 0 | g3, c2[u3 + 76 >> 2] = g3 ? f3 : 0, g3) break k;
                              break d;
                            }
                            if (!(f3 & 1)) break d;
                          }
                          f3 = c2[u3 + 76 >> 2], Wc(u3 + 12 | 0, _3, S3, f3, w3, y3, b3), S3 = Ta(u3 + 60 | 0), h3 = c2[u3 + 12 >> 2], C3 = h3, w3 = h3 >> 31, h3 = c2[u3 + 16 >> 2], Ab(S3, x3, C3, w3, h3, h3 >> 31, c2[e5 + 136 >> 2]), g3 = c2[u3 + 20 >> 2], g3 && (h3 = f3, f3 >>= 31, h3 = h3 + g3 | 0, f3 = h3 >>> 0 < g3 >>> 0 ? f3 + 1 | 0 : f3, g3 = h3 >>> 0 < 2147483648 & (f3 | 0) <= 0 | (f3 | 0) < 0, f3 = 0, c2[u3 + 72 >> 2] = f3 | g3, c2[u3 + 76 >> 2] = g3 ? h3 : 0), E3 = E3 + 1 | 0;
                        }
                        Xa(u3 + 60 | 0), h3 = 0;
                      }
                    }
                    break;
                  }
                  c2[u3 + 124 >> 2] = 0, h3 = x3;
                  break b;
                }
                Xa(u3 + 60 | 0);
              }
              h3 = 0;
            }
            Ua(u3 + 116 | 0);
          }
          return la(u3 + 124 | 0), M = u3 + 128 | 0, h3;
        }
        function Ed(e5, n4, r4, s3, u3) {
          var f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0, A2 = 0, j2 = 0, N2 = 0, P2 = 0, F = 0, I = 0, L = 0, R = 0;
          f3 = M - 112 | 0, M = f3, x3 = ua(e5 + 8 | 0, e5 + 12 | 0), c2[f3 + 108 >> 2] = x3;
          a: {
            b: {
              if (!c2[x3 + 16 >> 2]) break b;
              if (T3 = c2[u3 >> 2], h3 = 0, !Aa(T3, n4, f3 + 104 | 0)) break a;
              O3 = c2[u3 + 36 >> 2], k2 = c2[u3 + 32 >> 2], A2 = c2[u3 + 28 >> 2], j2 = c2[u3 + 24 >> 2], N2 = c2[u3 + 20 >> 2], P2 = c2[u3 + 16 >> 2], F = c2[u3 + 12 >> 2], I = c2[u3 + 8 >> 2], L = c2[u3 + 4 >> 2], Mb(c2[x3 + 12 >> 2], c2[x3 + 16 >> 2], l2[e5 + 4 | 0]), c2[f3 + 100 >> 2] = c2[f3 + 104 >> 2], a3[f3 + 96 | 0] = 1, E3 = xb(f3 + 96 | 0, c2[e5 + 20 >> 2]), h3 = E3, g3 = c2[f3 + 100 >> 2], u3 = 0 - g3 | 0, c2[h3 >> 2] = l2[h3 | 0] & (g3 | 0) != -2147483648, c2[h3 + 4 >> 2] = u3, c2[f3 + 92 >> 2] = 0, a3[f3 + 88 | 0] = 1;
              c: {
                d: for (; ; ) {
                  if (d2[e5 + 16 >> 2] > S3 >>> 0) {
                    if (c2[f3 + 84 >> 2] = 0, a3[f3 + 80 | 0] = 1, !Aa(T3, n4, f3 + 76 | 0)) break b;
                    for (c2[f3 + 68 >> 2] = c2[f3 + 76 >> 2], u3 = 1, a3[f3 + 64 | 0] = 1, g3 = xb(f3 - -64 | 0, c2[e5 + 20 >> 2]), h3 = Zc(E3, c2[g3 >> 2], c2[g3 + 4 >> 2]), g3 = c2[h3 >> 2], D3 = c2[h3 + 4 >> 2], R = g3 & 1; ; ) {
                      e: {
                        if (u3 & 1) {
                          Aa(L, n4, f3 + 4 | 0), h3 = La(f3 + 88 | 0, c2[f3 + 4 >> 2]), u3 = c2[h3 + 4 >> 2], c2[f3 + 80 >> 2] = c2[h3 >> 2], c2[f3 + 84 >> 2] = u3;
                          break e;
                        }
                        if (!Aa(I, n4, f3 + 4 | 0)) continue d;
                        La(La(f3 + 80 | 0, c2[f3 + 4 >> 2]), a3[e5 + 5 | 0]);
                      }
                      if (d2[e5 + 16 >> 2] <= S3 >>> 0) continue d;
                      if (c2[f3 + 60 >> 2] = 0, c2[e5 + 20 >> 2] != 1 && Aa(F, n4, f3 + 60 | 0), !R || (u3 = c2[f3 + 60 >> 2], C3 = u3 + D3 | 0, ((C3 ^ D3) & (u3 ^ C3)) < 0) || (Ac(O3, n4, f3 + 56 | 0), h3 = c2[f3 + 56 >> 2], h3 >>> 0 >= d2[e5 + 24 >> 2])) break b;
                      f: {
                        g: {
                          h: {
                            if (!l2[e5 + 1 | 0]) {
                              c2[f3 + 52 >> 2] = 0, a3[f3 + 48 | 0] = 0, c2[f3 + 44 >> 2] = 0;
                              break h;
                            }
                            if (Aa(P2, n4, f3 + 52 | 0), u3 = c2[f3 + 52 >> 2], a3[f3 + 48 | 0] = 0, c2[f3 + 44 >> 2] = 0, u3) break g;
                          }
                          Yc(f3 + 44 | 0, c2[c2[e5 + 124 >> 2] + (h3 << 2) >> 2]);
                          break f;
                        }
                        if (Aa(N2, n4, f3 + 40 | 0), Aa(j2, n4, f3 + 36 | 0), Aa(A2, n4, f3 + 32 | 0), Aa(k2, n4, f3 + 28 | 0), _3 = c2[c2[e5 + 124 >> 2] + (h3 << 2) >> 2], !_3 || (v3 = c2[f3 + 40 >> 2], h3 = v3 >> 31, u3 = c2[_3 + 20 >> 2] + v3 | 0, u3 >>> 0 < v3 >>> 0 ? h3 + 1 | 0 : h3) || (y3 = c2[f3 + 36 >> 2], g3 = y3 >> 31, h3 = y3 + c2[_3 + 24 >> 2] | 0, h3 >>> 0 < y3 >>> 0 ? g3 + 1 | 0 : g3) || (wb(f3 + 4 | 0, v3, 1, c2[f3 + 32 >> 2]), wb(f3 + 20 | 0, y3, 1, c2[f3 + 28 >> 2]), !(a3[f3 + 24 | 0] & 1) | l2[f3 + 8 | 0] != 1)) break c;
                        g3 = kb(), c2[f3 + 16 >> 2] = g3, c2[g3 + 8 >> 2] = h3, c2[g3 + 4 >> 2] = u3, u3 = l2[e5 + 2 | 0], c2[g3 + 20 >> 2] = _3, a3[g3 | 0] = u3, c2[g3 + 12 >> 2] = c2[f3 + 4 >> 2], u3 = c2[f3 + 20 >> 2], a3[g3 + 1 | 0] = 0, c2[g3 + 16 >> 2] = u3, a3[g3 + 24 | 0] = l2[e5 + 176 | 0], a3[g3 + 25 | 0] = l2[e5 + 177 | 0], a3[g3 + 26 | 0] = l2[e5 + 178 | 0], a3[g3 + 27 | 0] = l2[e5 + 179 | 0], Xc(f3 + 44 | 0, jb(g3, n4, r4, s3)), Ua(f3 + 16 | 0);
                      }
                      if (u3 = f3 + 44 | 0, !ac(u3)) break c;
                      v3 = c2[Ta(u3) + 20 >> 2], u3 = Ta(u3), w3 = c2[e5 + 140 >> 2], _3 = c2[u3 + 24 >> 2];
                      i: {
                        j: {
                          if (y3 = l2[e5 + 3 | 0], !y3) {
                            if (u3 = l2[f3 + 80 | 0], (w3 & -2) != 2) break j;
                            if (!(u3 & 1) || (g3 = c2[f3 + 84 >> 2], u3 = g3 >> 31, h3 = v3 - 1 | 0, b3 = h3, h3 = g3 + h3 | 0, u3 = b3 >>> 0 > h3 >>> 0 ? u3 + 1 | 0 : u3, g3 = h3 >>> 0 < 2147483648 & (u3 | 0) <= 0 | (u3 | 0) < 0, c2[f3 + 80 >> 2] = 0 | g3, c2[f3 + 84 >> 2] = g3 ? h3 : 0, !g3)) break c;
                            break i;
                          }
                          u3 = l2[f3 + 80 | 0];
                          k: switch (w3 | 0) {
                            default:
                              if (!(u3 & 1)) break c;
                              break i;
                            case 0:
                            case 2:
                              break k;
                          }
                          if (!(u3 & 1)) break c;
                          if (g3 = c2[f3 + 84 >> 2], h3 = g3 >> 31, u3 = _3 - 1 | 0, b3 = u3, u3 = u3 + g3 | 0, h3 = b3 >>> 0 > u3 >>> 0 ? h3 + 1 | 0 : h3, g3 = u3 >>> 0 < 2147483648 & (h3 | 0) <= 0 | (h3 | 0) < 0, c2[f3 + 80 >> 2] = 0 | g3, c2[f3 + 84 >> 2] = g3 ? u3 : 0, g3) break i;
                          break c;
                        }
                        if (!(u3 & 1)) break c;
                      }
                      g3 = c2[f3 + 84 >> 2], Wc(f3 + 4 | 0, y3, w3, g3, C3, v3, _3), b3 = Ta(f3 + 44 | 0), u3 = c2[f3 + 4 >> 2], h3 = u3, _3 = u3 >> 31, u3 = c2[f3 + 8 >> 2], Ab(b3, x3, h3, _3, u3, u3 >> 31, c2[e5 + 136 >> 2]), u3 = c2[f3 + 12 >> 2], u3 && (h3 = g3 >> 31, b3 = u3, u3 = u3 + g3 | 0, h3 = b3 >>> 0 > u3 >>> 0 ? h3 + 1 | 0 : h3, g3 = u3 >>> 0 < 2147483648 & (h3 | 0) <= 0 | (h3 | 0) < 0, h3 = 0, c2[f3 + 80 >> 2] = g3 | h3, c2[f3 + 84 >> 2] = g3 ? u3 : 0), S3 = S3 + 1 | 0, Xa(f3 + 44 | 0), u3 = 0;
                    }
                  }
                  break;
                }
                c2[f3 + 108 >> 2] = 0, h3 = x3;
                break a;
              }
              Xa(f3 + 44 | 0);
            }
            h3 = 0;
          }
          return la(f3 + 108 | 0), M = f3 + 112 | 0, h3;
        }
        function he(e5, n4, r4, s3, l3, u3) {
          e5 |= 0, n4 |= 0, r4 |= 0, s3 |= 0, l3 |= 0, u3 |= 0;
          var f3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0;
          f3 = M - 96 | 0, M = f3, a3[f3 + 72 | 0] = 0, c2[f3 + 68 >> 2] = 0, _3 = r4 + 31 >>> 3 & 536870908, y3 = h2(_3, s3), v3 = vd(y3, 1), c2[f3 + 76 >> 2] = 0, c2[f3 >> 2] = v3, g3 = f3 + 68 | 0, Uc(g3), a3[f3 + 72 | 0] = 1, c2[f3 + 68 >> 2] = v3, c2[f3 >> 2] = 0, Ja(f3), Ja(f3 + 76 | 0);
          a: {
            b: {
              if (!$b(g3)) break b;
              if (v3 = $b(g3), g3 = f3 + 56 | 0, c2[f3 + 60 >> 2] = g3, c2[f3 + 56 >> 2] = g3, c2[f3 + 64 >> 2] = 0, c2[f3 + 48 >> 2] = 0, c2[f3 + 52 >> 2] = 0, g3 = e5, e5 = 0, g3 |= e5, c2[f3 + 32 >> 2] = g3, c2[f3 + 36 >> 2] = n4, c2[f3 >> 2] = r4, b3 = e5 | l3, c2[f3 + 24 >> 2] = b3, c2[f3 + 28 >> 2] = u3, c2[f3 + 16 >> 2] = 0, c2[f3 + 20 >> 2] = 0, c2[f3 + 40 >> 2] = e5 | v3, c2[f3 + 44 >> 2] = y3, c2[f3 + 8 >> 2] = 0, c2[f3 + 12 >> 2] = 0, c2[f3 + 4 >> 2] = s3, c2[f3 + 48 >> 2] = _3, e5 = ze(_3, 0, s3, 0), N | e5 >>> 0 > y3 >>> 0) break a;
              for (l3 = v3; (e5 | 0) > 0; ) a3[l3 | 0] = 0, e5 = e5 - 1 | 0, l3 = l3 + 1 | 0;
              e5 = n4, n4 = f3 + 56 | 0, e5 = zc(na(116), g3, e5, n4, 0), u3 && (n4 = zc(na(116), b3, u3, n4, 1), c2[f3 + 76 >> 2] = 0, rb(e5, n4), sb(f3 + 76 | 0)), u3 = r4 + 7 >>> 3 | 0, c2[f3 + 76 >> 2] = 0, g3 = f3 + 52 | 0, rb(g3, e5), sb(f3 + 76 | 0);
              c: {
                d: {
                  if (n4 = c2[f3 + 52 >> 2], e5 = c2[n4 >> 2], !e5 || !yc(e5)) break d;
                  c2[n4 + 56 >> 2] = -1, e5 = 0;
                  break c;
                }
                c2[n4 + 52 >> 2] = 0, l3 = na(32), e5 = l3, c2[e5 + 24 >> 2] = 0, c2[e5 + 28 >> 2] = 0, c2[e5 + 16 >> 2] = 0, c2[e5 + 20 >> 2] = 0, c2[e5 + 8 >> 2] = 0, c2[e5 + 12 >> 2] = 0, c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0;
                e: {
                  if ((r4 | s3) < 0 | _3 >>> 0 > 268435452 || (b3 = _3 << 3, (b3 | 0) < (r4 | 0) | (!(!_3 | (s3 | 0) <= 0 | y3) | (2147483616 / (b3 >>> 0) | 0) < (s3 | 0)))) break e;
                  if (c2[e5 + 28 >> 2] = _3, c2[e5 + 24 >> 2] = s3, c2[e5 + 20 >> 2] = r4, e5 = ze(_3, 0, s3, s3 >> 31), r4 = N, (r4 | 0) == 1 | r4 >>> 0 > 1 | e5 >>> 0 > y3 >>> 0) break a;
                  c2[f3 + 92 >> 2] = e5, c2[f3 + 88 >> 2] = v3, c2[f3 + 84 >> 2] = 0, c2[f3 + 76 >> 2] = 0, c2[f3 + 80 >> 2] = 0, e5 = f3 + 76 | 0, ec(l3, e5), va(e5);
                }
                c2[f3 + 76 >> 2] = 0, oa(n4 + 32 | 0, l3), la(f3 + 76 | 0), a3[n4 + 50 | 0] = 1, e5 = od(n4);
              }
              f: {
                for (; ; ) {
                  g: {
                    e5 &= 1;
                    h: {
                      i: {
                        if (n4 = c2[c2[f3 + 52 >> 2] + 56 >> 2], (n4 | 0) != 4 || (rb(f3 + 52 | 0, 0), n4 = -1, !e5)) break h;
                        if (n4 = h2(c2[f3 + 48 >> 2], c2[f3 + 4 >> 2]), n4 >>> 0 > d2[f3 + 44 >> 2] || (e5 = c2[f3 + 40 >> 2], e5 & 3)) break i;
                        for (r4 = (n4 & -4) + e5 | 0, n4 = 4; ; ) {
                          if ((e5 | 0) == (r4 | 0)) break h;
                          c2[e5 >> 2] = c2[e5 >> 2] ^ -1, e5 = e5 + 4 | 0;
                        }
                      }
                      o();
                    }
                    j: switch (n4 - 3 | 0) {
                      case 0:
                        break j;
                      case 1:
                        break g;
                      default:
                        break f;
                    }
                    e5 = od(c2[f3 + 52 >> 2]);
                    continue;
                  }
                  break;
                }
                j($b(f3 + 68 | 0) | 0, u3 | 0, _3 | 0, s3 | 0);
              }
              if (sb(g3), !c2[f3 + 64 >> 2]) break b;
              for (e5 = c2[f3 + 60 >> 2], n4 = c2[e5 >> 2], r4 = c2[c2[f3 + 56 >> 2] + 4 >> 2], c2[n4 + 4 >> 2] = r4, c2[r4 >> 2] = n4, c2[f3 + 64 >> 2] = 0; ; ) {
                if ((f3 + 56 | 0) == (e5 | 0)) break b;
                n4 = c2[e5 + 4 >> 2], pc(e5), e5 = n4;
              }
            }
            Uc(f3 + 68 | 0), M = f3 + 96 | 0;
            return;
          }
          o();
        }
        function jc(e5, n4, r4, s3, u3) {
          var f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0;
          a: {
            b: {
              c: {
                d: {
                  if (!l2[e5 + 1 | 0]) {
                    h3 = c2[e5 + 60 >> 2];
                    break d;
                  }
                  if (f3 = c2[n4 + 4 >> 2], l2[f3 | 0]) break a;
                  if (g3 = c2[r4 >> 2], g3 >>> 0 >= d2[n4 + 12 >> 2]) break c;
                  h3 = c2[e5 + 60 >> 2] ^ ka(f3, c2[n4 + 8 >> 2] + (g3 << 1) | 0), c2[e5 + 60 >> 2] = h3;
                }
                if (h3) {
                  ld(e5, c2[c2[n4 >> 2] >> 2]);
                  break b;
                }
                if (f3 = c2[e5 + 24 >> 2], f3 >>> 0 <= 1) {
                  if ((f3 | 0) == 1) {
                    if (!c2[e5 + 40 >> 2]) break c;
                    v3 = l2[c2[e5 + 36 >> 2]];
                  }
                  for (_3 = c2[r4 + 12 >> 2] & v3 >>> c2[r4 + 8 >> 2], g3 = (f3 | 0) != 1; (s3 | 0) != (y3 | 0); ) {
                    if (!g3) {
                      if (f3 = y3 + 1 | 0, f3 >>> 0 >= d2[e5 + 40 >> 2]) break c;
                      v3 = l2[f3 + c2[e5 + 36 >> 2] | 0] | v3 << 8;
                    }
                    for (h3 = 7, b3 = 0; (h3 | 0) >= 0; ) {
                      if (f3 = c2[n4 + 4 >> 2], l2[f3 | 0]) break a;
                      if (d2[n4 + 12 >> 2] <= _3 >>> 0) break c;
                      f3 = ka(f3, c2[n4 + 8 >> 2] + (_3 << 1) | 0), _3 = f3 | (c2[r4 + 16 >> 2] & v3 >>> c2[r4 + 8 >> 2] + h3 | (c2[r4 + 4 >> 2] & _3) << 1), b3 = f3 << h3 | b3, h3 = h3 - 1 | 0;
                    }
                    if (d2[e5 + 48 >> 2] <= y3 >>> 0) break c;
                    a3[c2[e5 + 44 >> 2] + y3 | 0] = b3, y3 = y3 + 1 | 0;
                  }
                  for (f3 = v3 << 8, h3 = 0, b3 = 0; (u3 | 0) != (h3 | 0); ) {
                    if (g3 = c2[n4 + 4 >> 2], l2[g3 | 0]) break a;
                    if (d2[n4 + 12 >> 2] <= _3 >>> 0) break c;
                    g3 = ka(g3, c2[n4 + 8 >> 2] + (_3 << 1) | 0), v3 = 7 - h3 | 0, b3 = g3 << v3 | b3, _3 = g3 | (c2[r4 + 16 >> 2] & f3 >>> v3 + c2[r4 + 8 >> 2] | (c2[r4 + 4 >> 2] & _3) << 1), h3 = h3 + 1 | 0;
                  }
                  if (d2[e5 + 48 >> 2] <= s3 >>> 0) break c;
                  a3[c2[e5 + 44 >> 2] + s3 | 0] = b3;
                  break b;
                }
                if (!c2[e5 + 32 >> 2] | !c2[e5 + 40 >> 2]) break c;
                for (v3 = l2[c2[e5 + 36 >> 2]], y3 = l2[c2[e5 + 28 >> 2]] << c2[r4 + 20 >> 2], _3 = c2[r4 + 12 >> 2] & v3 >>> c2[r4 + 8 >> 2] | y3 & c2[r4 + 24 >> 2], f3 = 0; ; ) {
                  e: {
                    if ((s3 | 0) != (f3 | 0)) {
                      if (g3 = f3 + 1 | 0, g3 >>> 0 >= d2[e5 + 32 >> 2] | g3 >>> 0 >= d2[e5 + 40 >> 2]) break c;
                      for (y3 = l2[g3 + c2[e5 + 28 >> 2] | 0] << c2[r4 + 20 >> 2] | y3 << 8, v3 = l2[g3 + c2[e5 + 36 >> 2] | 0] | v3 << 8, h3 = 7, b3 = 0; ; ) {
                        if ((h3 | 0) < 0) break e;
                        if (x3 = c2[n4 + 4 >> 2], l2[x3 | 0]) break a;
                        if (d2[n4 + 12 >> 2] <= _3 >>> 0) break c;
                        x3 = ka(x3, c2[n4 + 8 >> 2] + (_3 << 1) | 0), _3 = x3 | (c2[r4 + 16 >> 2] & v3 >>> c2[r4 + 8 >> 2] + h3 | (c2[r4 + 28 >> 2] & y3 >>> h3 | (c2[r4 + 4 >> 2] & _3) << 1)), b3 = x3 << h3 | b3, h3 = h3 - 1 | 0;
                      }
                    }
                    for (b3 = v3 << 8, v3 = y3 << 8, h3 = 0, f3 = 0; (u3 | 0) != (h3 | 0); ) {
                      if (g3 = c2[n4 + 4 >> 2], l2[g3 | 0]) break a;
                      if (d2[n4 + 12 >> 2] <= _3 >>> 0) break c;
                      y3 = ka(g3, c2[n4 + 8 >> 2] + (_3 << 1) | 0), g3 = 7 - h3 | 0, f3 = y3 << g3 | f3, _3 = y3 | (c2[r4 + 16 >> 2] & b3 >>> g3 + c2[r4 + 8 >> 2] | (c2[r4 + 28 >> 2] & v3 >>> g3 | (c2[r4 + 4 >> 2] & _3) << 1)), h3 = h3 + 1 | 0;
                    }
                    if (d2[e5 + 48 >> 2] <= s3 >>> 0) break c;
                    a3[c2[e5 + 44 >> 2] + s3 | 0] = f3;
                    break b;
                  }
                  if (d2[e5 + 48 >> 2] <= f3 >>> 0) break c;
                  a3[c2[e5 + 44 >> 2] + f3 | 0] = b3, f3 = g3;
                }
              }
              o();
            }
            return 1;
          }
          return 0;
        }
        function we(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0, s3 = 0, u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0, A2 = 0, j2 = 0, N2 = 0, F = 0, I = 0, L = 0, R = 0, z = 0, B = 0, V = 0, H = 0, U = 0, W = 0;
          r4 = M - 48 | 0, M = r4, x3 = c2[n4 + 4 >> 2], D3 = c2[n4 + 12 >> 2], O3 = c2[n4 + 8 >> 2], g3 = c2[c2[n4 >> 2] >> 2], s3 = c2[e5 + 24 >> 2], ja(r4 + 40 | 0, g3, s3 - 1 | 0), ja(r4 + 32 | 0, g3, s3 - 2 | 0), j2 = O3 + 79434 | 0, S3 = c2[r4 + 36 >> 2], C3 = c2[r4 + 32 >> 2], N2 = D3 >>> 0 > 39717, w3 = 4;
          a: {
            for (; ; ) {
              b: {
                c: {
                  if (d2[e5 + 8 >> 2] > s3 >>> 0) {
                    v3 = c2[r4 + 44 >> 2], y3 = c2[r4 + 40 >> 2], ja(r4 + 32 | 0, g3, s3), f3 = c2[r4 + 36 >> 2], T3 = c2[r4 + 32 >> 2], c2[r4 + 40 >> 2] = T3, c2[r4 + 44 >> 2] = f3;
                    d: {
                      e: {
                        f: {
                          if (!l2[e5 + 1 | 0]) {
                            s3 = c2[e5 + 60 >> 2];
                            break f;
                          }
                          if (l2[x3 | 0]) break b;
                          if (!N2) break e;
                          s3 = c2[e5 + 60 >> 2] ^ ka(x3, j2), c2[e5 + 60 >> 2] = s3;
                        }
                        if (s3) {
                          c2[r4 + 20 >> 2] = v3, c2[r4 + 16 >> 2] = y3, c2[r4 + 24 >> 2] = T3, c2[r4 + 28 >> 2] = f3, c2[r4 + 8 >> 2] = T3, c2[r4 + 12 >> 2] = f3, f3 = c2[r4 + 20 >> 2], c2[r4 >> 2] = c2[r4 + 16 >> 2], c2[r4 + 4 >> 2] = f3, Ca(r4 + 8 | 0, r4);
                          break d;
                        }
                        for (s3 = c2[e5 + 24 >> 2], _3 = 0, k2 = 0, A2 = 0, l2[e5 + 2 | 0] == 1 && (ja(r4 + 32 | 0, c2[e5 + 12 >> 2], s3), A2 = c2[r4 + 32 >> 2], k2 = c2[r4 + 36 >> 2]), u3 = r4 + 32 | 0, ja(u3, g3, s3 + a3[e5 + 17 | 0] | 0), F = c2[r4 + 36 >> 2], I = c2[r4 + 32 >> 2], ja(u3, g3, s3 + a3[e5 + 19 | 0] | 0), L = c2[r4 + 36 >> 2], R = c2[r4 + 32 >> 2], ja(u3, g3, s3 + a3[e5 + 21 | 0] | 0), z = c2[r4 + 36 >> 2], B = c2[r4 + 32 >> 2], ja(u3, g3, s3 + a3[e5 + 23 | 0] | 0), V = c2[r4 + 36 >> 2], H = c2[r4 + 32 >> 2], u3 = c2[g3 + 20 >> 2], _3 = !S3 | (u3 | 0) < 2 ? _3 : l2[C3 | 0] >>> 6 & 1, _3 = !S3 | (u3 | 0) <= 0 ? _3 : l2[C3 | 0] >>> 6 & 2 | _3, h3 = 0, h3 = !v3 | (u3 | 0) < 3 ? h3 : l2[y3 | 0] >>> 5 & 1, h3 = !v3 | (u3 | 0) < 2 ? h3 : l2[y3 | 0] >>> 5 & 2 | h3, h3 = !v3 | (u3 | 0) <= 0 ? h3 : l2[y3 | 0] >>> 5 & 4 | h3, E3 = 0, s3 = 0; ; ) {
                          if (d2[e5 + 4 >> 2] <= s3 >>> 0) break d;
                          g: {
                            h: {
                              if (l2[e5 + 2 | 0] == 1 && ia(c2[c2[e5 + 12 >> 2] + 20 >> 2], s3, A2, k2)) break h;
                              if (b3 = ia(u3, a3[e5 + 16 | 0] + s3 | 0, I, F), U = ia(u3, a3[e5 + 18 | 0] + s3 | 0, R, L), W = ia(u3, a3[e5 + 20 | 0] + s3 | 0, B, z), u3 = ia(u3, a3[e5 + 22 | 0] + s3 | 0, H, V), l2[x3 | 0]) break b;
                              if (u3 = h3 << 5 | _3 << 12 | b3 << 4 | U << 10 | W << 11 | u3 << 15 | E3, u3 >>> 0 >= D3 >>> 0) break e;
                              if (b3 = ka(x3, (u3 << 1) + O3 | 0), u3 = c2[g3 + 20 >> 2], !b3) break h;
                              Ea(u3, s3, T3, f3, 1), u3 = c2[g3 + 20 >> 2], b3 = 1;
                              break g;
                            }
                            b3 = 0;
                          }
                          _3 = ia(u3, s3 + 2 | 0, C3, S3) | _3 << 1 & 6, h3 = ia(u3, s3 + 3 | 0, y3, v3) | h3 << 1 & 30, s3 = s3 + 1 | 0, E3 = E3 << 1 & 14 | b3;
                        }
                      }
                      o();
                    }
                    if (f3 = c2[n4 + 16 >> 2], !f3) {
                      s3 = c2[e5 + 24 >> 2];
                      break c;
                    }
                    if (f3 = P[c2[c2[f3 >> 2] + 8 >> 2]](f3) | 0, s3 = c2[e5 + 24 >> 2], !f3) break c;
                    c2[e5 + 24 >> 2] = s3 + 1, w3 = 3;
                  }
                  c2[e5 + 52 >> 2] = w3;
                  break a;
                }
                s3 = s3 + 1 | 0, c2[e5 + 24 >> 2] = s3, C3 = y3, S3 = v3;
                continue;
              }
              break;
            }
            w3 = -1;
          }
          return M = r4 + 48 | 0, w3 | 0;
        }
        function re(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0, s3 = 0, u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0;
          _3 = c2[n4 + 4 >> 2], y3 = c2[n4 + 12 >> 2], b3 = c2[n4 + 8 >> 2], x3 = c2[c2[n4 >> 2] >> 2], c2[e5 + 48 >> 2] || (r4 = c2[x3 + 16 >> 2], c2[e5 + 44 >> 2] = c2[x3 + 12 >> 2], c2[e5 + 48 >> 2] = r4);
          a: {
            b: {
              if (r4 = c2[e5 + 4 >> 2], !r4) break b;
              for (w3 = b3 + 810 | 0, r4 = r4 - 1 | 0, v3 = r4 >>> 3 | 0, S3 = (r4 & 7) + 1 | 0, s3 = c2[e5 + 24 >> 2], T3 = y3 >>> 0 > 405; ; ) {
                c: {
                  if (d2[e5 + 8 >> 2] <= s3 >>> 0) n4 = 4;
                  else {
                    d: {
                      if (!l2[e5 + 1 | 0]) {
                        s3 = c2[e5 + 60 >> 2];
                        break d;
                      }
                      if (l2[_3 | 0]) break a;
                      if (!T3) break b;
                      s3 = c2[e5 + 60 >> 2] ^ ka(_3, w3), c2[e5 + 60 >> 2] = s3;
                    }
                    e: {
                      if (s3) {
                        ld(e5, x3);
                        break e;
                      }
                      s3 = 0, h3 = 0;
                      f: {
                        if (!c2[e5 + 24 >> 2]) {
                          g: {
                            for (; ; ) {
                              if (u3 = 7, f3 = 0, (h3 | 0) == (v3 | 0)) break g;
                              h: {
                                for (; (u3 | 0) >= 0; ) {
                                  if (l2[_3 | 0]) break h;
                                  if (s3 >>> 0 >= y3 >>> 0) break b;
                                  g3 = s3 << 1, r4 = ka(_3, g3 + b3 | 0), s3 = r4 | g3 & 1006, f3 = r4 << u3 | f3, u3 = u3 - 1 | 0;
                                }
                                if (d2[e5 + 48 >> 2] <= h3 >>> 0) break b;
                                a3[c2[e5 + 44 >> 2] + h3 | 0] = f3, h3 = h3 + 1 | 0;
                                continue;
                              }
                              break;
                            }
                            if (h3 >>> 0 < v3 >>> 0) break a;
                          }
                          for (u3 = 0, f3 = 0; ; ) {
                            if ((u3 | 0) == (S3 | 0)) break f;
                            if (l2[_3 | 0]) break a;
                            if (s3 >>> 0 >= y3 >>> 0) break b;
                            g3 = s3 << 1, r4 = ka(_3, g3 + b3 | 0), s3 = r4 | g3 & 1006, f3 = r4 << 7 - u3 | f3, u3 = u3 + 1 | 0;
                          }
                        }
                        if (!c2[e5 + 40 >> 2]) break b;
                        for (h3 = l2[c2[e5 + 36 >> 2]], u3 = h3 >>> 1 & 112, r4 = 0; ; ) {
                          i: {
                            if ((r4 | 0) != (v3 | 0)) {
                              if (g3 = r4 + 1 | 0, g3 >>> 0 >= d2[e5 + 40 >> 2]) break b;
                              for (h3 = l2[g3 + c2[e5 + 36 >> 2] | 0] | h3 << 8, s3 = 7, f3 = 0; ; ) {
                                if ((s3 | 0) < 0) break i;
                                if (l2[_3 | 0]) break a;
                                if (u3 >>> 0 >= y3 >>> 0) break b;
                                u3 <<= 1, C3 = ka(_3, u3 + b3 | 0), u3 = C3 | (h3 >>> s3 + 1 & 16 | u3 & 1006), f3 = C3 << s3 | f3, s3 = s3 - 1 | 0;
                              }
                            }
                            for (g3 = h3 << 8, s3 = 0, f3 = 0; (s3 | 0) != (S3 | 0); ) {
                              if (l2[_3 | 0]) break a;
                              if (u3 >>> 0 >= y3 >>> 0) break b;
                              u3 <<= 1, r4 = ka(_3, u3 + b3 | 0), u3 = r4 | (g3 >>> 8 - s3 & 16 | u3 & 1006), f3 = r4 << 7 - s3 | f3, s3 = s3 + 1 | 0;
                            }
                            if (d2[e5 + 48 >> 2] <= v3 >>> 0) break b;
                            a3[c2[e5 + 44 >> 2] + v3 | 0] = f3;
                            break e;
                          }
                          if (d2[e5 + 48 >> 2] <= r4 >>> 0) break b;
                          a3[c2[e5 + 44 >> 2] + r4 | 0] = f3, r4 = g3;
                        }
                      }
                      if (d2[e5 + 48 >> 2] <= v3 >>> 0) break b;
                      a3[c2[e5 + 44 >> 2] + v3 | 0] = f3;
                    }
                    if (Db(e5, x3), r4 = c2[n4 + 16 >> 2], !r4 || !(P[c2[c2[r4 >> 2] + 8 >> 2]](r4) | 0)) break c;
                    c2[e5 + 24 >> 2] = c2[e5 + 24 >> 2] + 1, n4 = 3;
                  }
                  return c2[e5 + 52 >> 2] = n4, n4 | 0;
                }
                s3 = c2[e5 + 24 >> 2] + 1 | 0, c2[e5 + 24 >> 2] = s3;
              }
            }
            o();
          }
          return -1;
        }
        function hb(e5) {
          var n4 = 0, r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0, d3 = 0, f3 = 0, h3 = 0, g3 = 0;
          a: {
            b: {
              for (; ; ) {
                if (e5 >>> 0 > 4294967239) break b;
                n4 = c2[1691], r4 = n4, l3 = c2[1690], e5 = e5 >>> 0 <= 8 ? 8 : e5 + 3 & -4;
                c: {
                  if (e5 >>> 0 <= 127) {
                    a4 = (e5 >>> 3 | 0) - 1 | 0;
                    break c;
                  }
                  if (s3 = _2(e5), a4 = ((e5 >>> 29 - s3 ^ 4) - (s3 << 2) | 0) + 110 | 0, e5 >>> 0 <= 4095) break c;
                  s3 = ((e5 >>> 30 - s3 ^ 2) - (s3 << 1) | 0) + 71 | 0, a4 = s3 >>> 0 >= 63 ? 63 : s3;
                }
                if (u3 = a4, a4 = u3 & 31, (u3 & 63) >>> 0 >= 32 ? (s3 = 0, n4 = n4 >>> a4 | 0) : (s3 = n4 >>> a4 | 0, n4 = ((1 << a4) - 1 & n4) << 32 - a4 | l3 >>> a4), n4 | s3) {
                  for (; ; ) {
                    a4 = s3;
                    d: {
                      if (a4 | n4) {
                        r4 = a4 - 1 | 0, s3 = r4 + 1 | 0, l3 = r4, r4 = n4 - 1 | 0, l3 = (r4 | 0) == -1 ? l3 : s3, s3 = _2(a4 ^ l3), s3 = (s3 | 0) == 32 ? _2(n4 ^ r4) + 32 | 0 : s3, r4 = 63 - s3 | 0, N = 0 - (s3 >>> 0 > 63) | 0;
                        break d;
                      }
                      N = 0, r4 = 64;
                    }
                    l3 = r4, r4 = l3 & 31, (l3 & 63) >>> 0 >= 32 ? (s3 = 0, d3 = a4 >>> r4 | 0) : (s3 = a4 >>> r4 | 0, d3 = ((1 << r4) - 1 & a4) << 32 - r4 | n4 >>> r4), u3 = l3 + u3 | 0, n4 = u3 << 4, a4 = c2[n4 + 5736 >> 2], r4 = n4 + 5728 | 0;
                    e: {
                      if ((a4 | 0) != (r4 | 0)) {
                        if (n4 = _b(a4, e5), n4) break a;
                        n4 = c2[a4 + 4 >> 2], l3 = c2[a4 + 8 >> 2], c2[n4 + 8 >> 2] = l3, c2[l3 + 4 >> 2] = n4, c2[a4 + 8 >> 2] = r4, c2[a4 + 4 >> 2] = c2[r4 + 4 >> 2], c2[r4 + 4 >> 2] = a4, c2[c2[a4 + 4 >> 2] + 8 >> 2] = a4, u3 = u3 + 1 | 0, n4 = (s3 & 1) << 31 | d3 >>> 1, s3 = s3 >>> 1 | 0;
                        break e;
                      }
                      h3 = c2[1691], l3 = u3 & 63, n4 = l3, a4 = n4 & 31, n4 >>> 0 >= 32 ? (n4 = 0, r4 = -1 >>> a4 | 0) : (n4 = -1 >>> a4 | 0, r4 = n4 | (1 << a4) - 1 << 32 - a4), r4 &= -2, a4 = l3 & 31, l3 >>> 0 >= 32 ? (n4 = r4 << a4, f3 = 0) : (n4 = (1 << a4) - 1 & r4 >>> 32 - a4 | n4 << a4, f3 = r4 << a4), a4 = n4, l3 = 0 - u3 & 63, r4 = l3, n4 = r4 & 31, r4 >>> 0 >= 32 ? (n4 = -1 << n4, r4 = 0) : (r4 = -1 << n4, n4 = r4 | (1 << n4) - 1 & -1 >>> 32 - n4), g3 = r4 & -2, r4 = l3 & 31, l3 >>> 0 >= 32 ? (l3 = 0, r4 = n4 >>> r4 | 0) : (l3 = n4 >>> r4 | 0, r4 = ((1 << r4) - 1 & n4) << 32 - r4 | g3 >>> r4), n4 = r4 | f3, N = a4 | l3, c2[1690] &= n4, c2[1691] = N & h3, n4 = d3 ^ 1;
                    }
                    if (!(n4 | s3)) break;
                  }
                  l3 = c2[1690], r4 = c2[1691];
                }
                s3 = _2(r4), a4 = 63 - ((s3 | 0) == 32 ? _2(l3) + 32 | 0 : s3) | 0;
                f: {
                  if (!(r4 | l3)) {
                    u3 = 0;
                    break f;
                  }
                  if (n4 = a4 << 4, u3 = c2[n4 + 5736 >> 2], !r4 & l3 >>> 0 < 1073741824 || (s3 = 98, r4 = n4 + 5728 | 0, (r4 | 0) == (u3 | 0))) break f;
                  for (; ; ) {
                    if (n4 = _b(u3, e5), n4) break a;
                    if (u3 = c2[u3 + 8 >> 2], (r4 | 0) == (u3 | 0)) break f;
                    if (n4 = s3, s3 = n4 - 1 | 0, !n4) break;
                  }
                }
                if (!Md(e5 + 48 | 0)) break;
              }
              if (!u3 || (s3 = (a4 << 4) + 5728 | 0, (s3 | 0) == (u3 | 0))) break b;
              for (; ; ) {
                if (n4 = _b(u3, e5), n4) break a;
                if (u3 = c2[u3 + 8 >> 2], (s3 | 0) == (u3 | 0)) break;
              }
            }
            n4 = 0;
          }
          return n4;
        }
        function nb(e5, n4, r4, a4, s3) {
          var u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0;
          f3 = M - 32 | 0, M = f3;
          a: {
            if (g3 = hc(a4, s3), !c2[g3 + 16 >> 2] | (n4 | 0) < 0 | (!c2[e5 + 16 >> 2] | (r4 | 0) < 0) | c2[e5 + 20 >> 2] <= (n4 | 0) || (u3 = c2[e5 + 24 >> 2], (u3 | 0) <= (r4 | 0))) break a;
            b: {
              if (!(n4 & 7)) {
                if (s3 = c2[e5 + 28 >> 2], a4 = n4 >>> 3 | 0, s3 >>> 0 <= a4 >>> 0 || (n4 = s3 - a4 | 0, s3 = c2[g3 + 28 >> 2], h3 = n4 >>> 0 < s3 >>> 0 ? n4 : s3, !h3)) break b;
                for (s3 = 0, n4 = u3 - r4 | 0, u3 = c2[g3 + 24 >> 2], n4 = (n4 | 0) < (u3 | 0) ? n4 : u3, v3 = (n4 | 0) > 0 ? n4 : 0; ; ) {
                  if ((s3 | 0) == (v3 | 0)) break a;
                  if (dc(f3 + 24 | 0, e5, r4 + s3 | 0), u3 = 0, n4 = 0, l2[f3 + 28 | 0] == 1) {
                    if (_3 = c2[e5 + 16 >> 2], n4 = c2[f3 + 24 >> 2], _3 >>> 0 < n4 >>> 0 || (u3 = c2[e5 + 28 >> 2], u3 >>> 0 > _3 - n4 >>> 0)) break b;
                    n4 = n4 + c2[e5 + 12 >> 2] | 0;
                  }
                  if (a4 >>> 0 > u3 >>> 0 | h3 >>> 0 > u3 - a4 >>> 0 || (ja(f3 + 16 | 0, g3, s3), h3 >>> 0 > d2[f3 + 20 >> 2])) break b;
                  h3 && p(c2[f3 + 16 >> 2], n4 + a4 | 0, h3), s3 = s3 + 1 | 0;
                }
              }
              if (a4 = c2[e5 + 28 >> 2] / 4 | 0, _3 = n4 >>> 5 | 0, a4 >>> 0 <= _3 >>> 0 || (x3 = a4 - _3 | 0, a4 = c2[g3 + 28 >> 2] / 4 | 0, y3 = a4 >>> 0 > x3 >>> 0 ? x3 : a4, !y3) || (s3 = r4, r4 = u3 - r4 | 0, a4 = c2[g3 + 24 >> 2], r4 = (r4 | 0) < (a4 | 0) ? r4 : a4, ad(f3 + 24 | 0, e5, s3, r4), cc(f3 + 16 | 0, g3, 0, r4), h3 = c2[f3 + 20 >> 2], !h3)) break b;
              T3 = n4 & 31, v3 = c2[f3 + 28 >> 2], E3 = _3 << 2, D3 = n4 ^ -1;
              c: for (; ; ) {
                if (!h3) break a;
                if (v3 >>> 0 < _3 >>> 0 | v3 - _3 >>> 0 < x3 >>> 0 || (c2[f3 + 12 >> 2] = x3, C3 = c2[f3 + 24 >> 2], c2[f3 + 8 >> 2] = C3 + E3, h3 >>> 0 < y3 >>> 0) || (r4 = c2[f3 + 16 >> 2], s3 = Ya(f3 + 8 | 0), a4 = c2[f3 + 8 >> 2], S3 = c2[f3 + 12 >> 2], u3 = y3 >>> 0 > S3 >>> 0 ? S3 : y3, u3 >>> 0 > d2[f3 + 12 >> 2])) break b;
                for (w3 = r4 + (u3 << 2) | 0, u3 = ((Ae(s3, 16) ^ s3) & -16711936) >>> 8 ^ Ae(s3, 8), s3 = r4; ; ) if ((s3 | 0) == (w3 | 0)) {
                  if (y3 >>> 0 > S3 >>> 0 && (a4 = u3 << T3, O3 = w3, k2 = ((Ae(a4, 16) ^ a4) & -16711936) >>> 8 ^ Ae(a4, 8), c2[O3 >> 2] = k2), a4 = c2[e5 + 28 >> 2] / 4 | 0, a4 >>> 0 > v3 >>> 0 || (c2[f3 + 24 >> 2] = (a4 << 2) + C3, s3 = c2[g3 + 28 >> 2] / 4 | 0, s3 >>> 0 > h3 >>> 0)) break b;
                  c2[f3 + 16 >> 2] = r4 + (s3 << 2), h3 = h3 - s3 | 0, v3 = v3 - a4 | 0;
                  continue c;
                } else {
                  b3 = u3 << n4, u3 = c2[a4 >> 2], u3 = ((Ae(u3, 16) ^ u3) & -16711936) >>> 8 ^ Ae(u3, 8), b3 |= u3 >>> 1 >>> D3, O3 = s3, k2 = ((b3 ^ Ae(b3, 16)) & -16711936) >>> 8 ^ Ae(b3, 8), c2[O3 >> 2] = k2, a4 = a4 + 4 | 0, s3 = s3 + 4 | 0;
                  continue;
                }
              }
            }
            o();
          }
          return M = f3 + 32 | 0, g3;
        }
        function ue(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0, s3 = 0, u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0, A2 = 0, j2 = 0, N2 = 0, F = 0, I = 0, L = 0;
          r4 = M - 48 | 0, M = r4, S3 = c2[n4 + 4 >> 2], D3 = c2[n4 + 12 >> 2], O3 = c2[n4 + 8 >> 2], _3 = c2[c2[n4 >> 2] >> 2], s3 = c2[e5 + 24 >> 2], ja(r4 + 40 | 0, _3, s3 - 1 | 0), ja(r4 + 32 | 0, _3, s3 - 2 | 0), N2 = O3 + 3882 | 0, b3 = c2[r4 + 36 >> 2], x3 = c2[r4 + 32 >> 2], F = D3 >>> 0 > 1941, C3 = 4;
          a: {
            for (; ; ) {
              b: {
                c: {
                  if (d2[e5 + 8 >> 2] > s3 >>> 0) {
                    v3 = c2[r4 + 44 >> 2], y3 = c2[r4 + 40 >> 2], ja(r4 + 32 | 0, _3, s3), f3 = c2[r4 + 36 >> 2], w3 = c2[r4 + 32 >> 2], c2[r4 + 40 >> 2] = w3, c2[r4 + 44 >> 2] = f3;
                    d: {
                      e: {
                        f: {
                          if (!l2[e5 + 1 | 0]) {
                            s3 = c2[e5 + 60 >> 2];
                            break f;
                          }
                          if (l2[S3 | 0]) break b;
                          if (!F) break e;
                          s3 = c2[e5 + 60 >> 2] ^ ka(S3, N2), c2[e5 + 60 >> 2] = s3;
                        }
                        if (s3) {
                          c2[r4 + 20 >> 2] = v3, c2[r4 + 16 >> 2] = y3, c2[r4 + 24 >> 2] = w3, c2[r4 + 28 >> 2] = f3, c2[r4 + 8 >> 2] = w3, c2[r4 + 12 >> 2] = f3, f3 = c2[r4 + 20 >> 2], c2[r4 >> 2] = c2[r4 + 16 >> 2], c2[r4 + 4 >> 2] = f3, Ca(r4 + 8 | 0, r4);
                          break d;
                        }
                        for (s3 = c2[e5 + 24 >> 2], h3 = 0, k2 = 0, A2 = 0, l2[e5 + 2 | 0] == 1 && (ja(r4 + 32 | 0, c2[e5 + 12 >> 2], s3), A2 = c2[r4 + 32 >> 2], k2 = c2[r4 + 36 >> 2]), ja(r4 + 32 | 0, _3, s3 + a3[e5 + 17 | 0] | 0), I = c2[r4 + 36 >> 2], L = c2[r4 + 32 >> 2], u3 = c2[_3 + 20 >> 2], h3 = !b3 | (u3 | 0) < 3 ? h3 : l2[x3 | 0] >>> 5 & 1, h3 = !b3 | (u3 | 0) < 2 ? h3 : l2[x3 | 0] >>> 5 & 2 | h3, h3 = !b3 | (u3 | 0) <= 0 ? h3 : l2[x3 | 0] >>> 5 & 4 | h3, g3 = 0, g3 = !v3 | (u3 | 0) < 3 ? g3 : l2[y3 | 0] >>> 5 & 1, g3 = !v3 | (u3 | 0) < 2 ? g3 : l2[y3 | 0] >>> 5 & 2 | g3, g3 = !v3 | (u3 | 0) <= 0 ? g3 : l2[y3 | 0] >>> 5 & 4 | g3, E3 = 0, s3 = 0; ; ) {
                          if (d2[e5 + 4 >> 2] <= s3 >>> 0) break d;
                          g: {
                            h: {
                              if (l2[e5 + 2 | 0] == 1 && ia(c2[c2[e5 + 12 >> 2] + 20 >> 2], s3, A2, k2)) break h;
                              if (u3 = ia(u3, a3[e5 + 16 | 0] + s3 | 0, L, I), l2[S3 | 0]) break b;
                              if (u3 = g3 << 4 | h3 << 9 | u3 << 3 | E3, u3 >>> 0 >= D3 >>> 0) break e;
                              if (T3 = ka(S3, (u3 << 1) + O3 | 0), u3 = c2[_3 + 20 >> 2], !T3) break h;
                              Ea(u3, s3, w3, f3, 1), u3 = c2[_3 + 20 >> 2], T3 = 1;
                              break g;
                            }
                            T3 = 0;
                          }
                          j2 = s3 + 3 | 0, h3 = ia(u3, j2, x3, b3) | h3 << 1 & 14, g3 = ia(u3, j2, y3, v3) | g3 << 1 & 30, s3 = s3 + 1 | 0, E3 = E3 << 1 & 6 | T3;
                        }
                      }
                      o();
                    }
                    if (f3 = c2[n4 + 16 >> 2], !f3) {
                      s3 = c2[e5 + 24 >> 2];
                      break c;
                    }
                    if (f3 = P[c2[c2[f3 >> 2] + 8 >> 2]](f3) | 0, s3 = c2[e5 + 24 >> 2], !f3) break c;
                    c2[e5 + 24 >> 2] = s3 + 1, C3 = 3;
                  }
                  c2[e5 + 52 >> 2] = C3;
                  break a;
                }
                s3 = s3 + 1 | 0, c2[e5 + 24 >> 2] = s3, x3 = y3, b3 = v3;
                continue;
              }
              break;
            }
            C3 = -1;
          }
          return M = r4 + 48 | 0, C3 | 0;
        }
        function Sd(e5, n4) {
          e5 |= 0, n4 = +n4;
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0, d3 = 0, h3 = 0, S3 = 0, C3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0, A2 = 0, j2 = 0, M2 = 0;
          if (r4 = e5 << 3, O3 = r4 + 6784 | 0, S3 = f2[r4 + 6816 >> 3], S3 != 0) {
            T3 = f2[O3 >> 3], E3 = y2(T3, n4), n4 = E3 - T3, a4 = ~~n4 >>> 0, r4 = g2(n4) >= 1 ? ~~(n4 > 0 ? v2(b2(n4 * 23283064365386963e-26), 4294967295) : x2((n4 - +(~~n4 >>> 0 >>> 0)) * 23283064365386963e-26)) >>> 0 : 0, d3 = ~~S3 >>> 0, l3 = g2(S3) >= 1 ? ~~(S3 > 0 ? v2(b2(S3 * 23283064365386963e-26), 4294967295) : x2((S3 - +(~~S3 >>> 0 >>> 0)) * 23283064365386963e-26)) >>> 0 : 0;
            a: {
              b: {
                c: {
                  d: {
                    e: {
                      f: {
                        g: {
                          h: {
                            i: {
                              j: {
                                k: {
                                  if (r4) {
                                    if (!d3) break k;
                                    if (!l3) break j;
                                    if (s3 = _2(l3) - _2(r4) | 0, s3 >>> 0 <= 31) break i;
                                    break c;
                                  }
                                  if ((l3 | 0) == 1 | l3 >>> 0 > 1) break c;
                                  N = 0, r4 = (a4 >>> 0) / (d3 >>> 0) | 0;
                                  break a;
                                }
                                if (!a4) break h;
                                if (!l3 | l3 - 1 & l3) break g;
                                r4 = r4 >>> Be(l3) | 0, N = 0;
                                break a;
                              }
                              if (!(d3 - 1 & d3)) break f;
                              C3 = (_2(d3) + 33 | 0) - _2(r4) | 0, h3 = 0 - C3 | 0;
                              break d;
                            }
                            C3 = s3 + 1 | 0, h3 = 63 - s3 | 0;
                            break d;
                          }
                          N = 0, r4 = (r4 >>> 0) / (l3 >>> 0) | 0;
                          break a;
                        }
                        if (s3 = _2(l3) - _2(r4) | 0, s3 >>> 0 < 31) break e;
                        break c;
                      }
                      if ((d3 | 0) == 1) break b;
                      d3 = Be(d3), l3 = d3 & 31, (d3 & 63) >>> 0 >= 32 ? r4 = r4 >>> l3 | 0 : (s3 = r4 >>> l3 | 0, r4 = ((1 << l3) - 1 & r4) << 32 - l3 | a4 >>> l3), N = s3;
                      break a;
                    }
                    C3 = s3 + 1 | 0, h3 = 63 - s3 | 0;
                  }
                  if (s3 = C3 & 63, u3 = s3 & 31, s3 >>> 0 >= 32 ? (s3 = 0, D3 = r4 >>> u3 | 0) : (s3 = r4 >>> u3 | 0, D3 = ((1 << u3) - 1 & r4) << 32 - u3 | a4 >>> u3), h3 &= 63, u3 = h3 & 31, h3 >>> 0 >= 32 ? (r4 = a4 << u3, a4 = 0) : (r4 = (1 << u3) - 1 & a4 >>> 32 - u3 | r4 << u3, a4 <<= u3), C3) for (u3 = l3 - 1 | 0, h3 = d3 - 1 | 0, M2 = (h3 | 0) == -1 ? u3 : u3 + 1 | 0; k2 = s3 << 1 | D3 >>> 31, s3 = D3 << 1 | r4 >>> 31, u3 = M2 - (k2 + (s3 >>> 0 > h3 >>> 0) | 0) >> 31, A2 = u3 & d3, D3 = s3 - A2 | 0, s3 = k2 - ((l3 & u3) + (s3 >>> 0 < A2 >>> 0) | 0) | 0, r4 = r4 << 1 | a4 >>> 31, a4 = j2 | a4 << 1, j2 = u3 & 1, C3 = C3 - 1 | 0, C3; ) ;
                  N = r4 << 1 | a4 >>> 31, r4 = j2 | a4 << 1;
                  break a;
                }
                a4 = 0, r4 = 0;
              }
              N = r4, r4 = a4;
            }
            a4 = N, r4 = r4 + 1 | 0, a4 = r4 ? a4 : a4 + 1 | 0, T3 = (+(r4 >>> 0) + (a4 >>> 0) * 4294967296) * S3 + T3, E3 = T3 - E3;
          }
          f2[O3 >> 3] = T3, w2(e5 | 0, +E3) | 0, e5 = (e5 | 0) == 2 ? 27 : (e5 | 0) == 1 ? 26 : 14, r4 = e5 - 1 | 0;
          l: {
            if (c2[1692] >>> r4 & 1) {
              c2[1694] |= 1 << r4;
              break l;
            }
            r4 = c2[(e5 << 2) + 4608 >> 2], r4 && P[r4 | 0](e5);
          }
        }
        function se(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0, s3 = 0, u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0, A2 = 0, j2 = 0, N2 = 0, F = 0, I = 0;
          r4 = M - 48 | 0, M = r4, b3 = c2[n4 + 4 >> 2], E3 = c2[n4 + 12 >> 2], D3 = c2[n4 + 8 >> 2], _3 = c2[c2[n4 >> 2] >> 2], s3 = c2[e5 + 24 >> 2], ja(r4 + 40 | 0, _3, s3 - 1 | 0), ja(r4 + 32 | 0, _3, s3 - 2 | 0), j2 = D3 + 458 | 0, x3 = c2[r4 + 36 >> 2], S3 = c2[r4 + 32 >> 2], N2 = E3 >>> 0 > 229;
          a: {
            for (; ; ) {
              b: {
                c: {
                  if (d2[e5 + 8 >> 2] <= s3 >>> 0) s3 = 4;
                  else {
                    v3 = c2[r4 + 44 >> 2], y3 = c2[r4 + 40 >> 2], ja(r4 + 32 | 0, _3, s3), f3 = c2[r4 + 36 >> 2], C3 = c2[r4 + 32 >> 2], c2[r4 + 40 >> 2] = C3, c2[r4 + 44 >> 2] = f3;
                    d: {
                      e: {
                        f: {
                          if (!l2[e5 + 1 | 0]) {
                            s3 = c2[e5 + 60 >> 2];
                            break f;
                          }
                          if (l2[b3 | 0]) break b;
                          if (!N2) break e;
                          s3 = c2[e5 + 60 >> 2] ^ ka(b3, j2), c2[e5 + 60 >> 2] = s3;
                        }
                        if (s3) {
                          c2[r4 + 20 >> 2] = v3, c2[r4 + 16 >> 2] = y3, c2[r4 + 24 >> 2] = C3, c2[r4 + 28 >> 2] = f3, c2[r4 + 8 >> 2] = C3, c2[r4 + 12 >> 2] = f3, f3 = c2[r4 + 20 >> 2], c2[r4 >> 2] = c2[r4 + 16 >> 2], c2[r4 + 4 >> 2] = f3, Ca(r4 + 8 | 0, r4);
                          break d;
                        }
                        for (s3 = c2[e5 + 24 >> 2], h3 = 0, O3 = 0, k2 = 0, l2[e5 + 2 | 0] == 1 && (ja(r4 + 32 | 0, c2[e5 + 12 >> 2], s3), k2 = c2[r4 + 32 >> 2], O3 = c2[r4 + 36 >> 2]), ja(r4 + 32 | 0, _3, s3 + a3[e5 + 17 | 0] | 0), F = c2[r4 + 36 >> 2], I = c2[r4 + 32 >> 2], u3 = c2[_3 + 20 >> 2], h3 = !x3 | (u3 | 0) < 2 ? h3 : l2[S3 | 0] >>> 6 & 1, h3 = !x3 | (u3 | 0) <= 0 ? h3 : l2[S3 | 0] >>> 6 & 2 | h3, g3 = 0, g3 = !v3 | (u3 | 0) < 2 ? g3 : l2[y3 | 0] >>> 6 & 1, g3 = !v3 | (u3 | 0) <= 0 ? g3 : l2[y3 | 0] >>> 6 & 2 | g3, T3 = 0, s3 = 0; ; ) {
                          if (d2[e5 + 4 >> 2] <= s3 >>> 0) break d;
                          g: {
                            h: {
                              if (l2[e5 + 2 | 0] == 1 && ia(c2[c2[e5 + 12 >> 2] + 20 >> 2], s3, k2, O3)) break h;
                              if (u3 = ia(u3, a3[e5 + 16 | 0] + s3 | 0, I, F), l2[b3 | 0]) break b;
                              if (u3 = g3 << 3 | h3 << 7 | u3 << 2 | T3, u3 >>> 0 >= E3 >>> 0) break e;
                              if (w3 = ka(b3, (u3 << 1) + D3 | 0), u3 = c2[_3 + 20 >> 2], !w3) break h;
                              Ea(u3, s3, C3, f3, 1), u3 = c2[_3 + 20 >> 2], w3 = 1;
                              break g;
                            }
                            w3 = 0;
                          }
                          A2 = s3 + 2 | 0, h3 = ia(u3, A2, S3, x3) | h3 << 1 & 6, g3 = ia(u3, A2, y3, v3) | g3 << 1 & 14, s3 = s3 + 1 | 0, T3 = T3 << 1 & 2 | w3;
                        }
                      }
                      o();
                    }
                    if (f3 = c2[n4 + 16 >> 2], !f3) {
                      s3 = c2[e5 + 24 >> 2];
                      break c;
                    }
                    if (f3 = P[c2[c2[f3 >> 2] + 8 >> 2]](f3) | 0, s3 = c2[e5 + 24 >> 2], !f3) break c;
                    c2[e5 + 24 >> 2] = s3 + 1, s3 = 3;
                  }
                  c2[e5 + 52 >> 2] = s3;
                  break a;
                }
                s3 = s3 + 1 | 0, c2[e5 + 24 >> 2] = s3, S3 = y3, x3 = v3;
                continue;
              }
              break;
            }
            s3 = -1;
          }
          return M = r4 + 48 | 0, s3 | 0;
        }
        function vc(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0;
          f3 = M - 32 | 0, M = f3, y3 = ua(e5, e5 + 4 | 0), c2[f3 + 28 >> 2] = y3;
          a: {
            if (r4 = c2[y3 + 16 >> 2], !r4) {
              y3 = 0;
              break a;
            }
            Mb(c2[y3 + 12 >> 2], r4, l2[e5 + 20 | 0]);
            b: {
              for (; ; ) {
                if (!x3 & b3 >>> 0 >= d2[e5 + 36 >> 2] | x3) {
                  c2[f3 + 28 >> 2] = 0;
                  break a;
                }
                s3 = c2[n4 >> 2], r4 = c2[n4 + 4 >> 2], a4 = 0, c2[f3 + 24 >> 2] = 0, c2[f3 + 16 >> 2] = 0, c2[f3 + 20 >> 2] = 0;
                c: {
                  d: {
                    if ((r4 | 0) == (s3 | 0)) {
                      v3 = 0, s3 = r4;
                      break d;
                    }
                    if (r4 = r4 - s3 | 0, s3 = r4 >> 2, s3 >>> 0 >= 536870912) break c;
                    for (v3 = na(r4 << 1), c2[f3 + 16 >> 2] = v3, a4 = (s3 << 3) + v3 | 0, c2[f3 + 24 >> 2] = a4, r4 = v3; (r4 | 0) != (a4 | 0); ) c2[r4 >> 2] = 0, c2[r4 + 4 >> 2] = 0, r4 = r4 + 8 | 0;
                    c2[f3 + 20 >> 2] = a4, r4 = c2[n4 >> 2], s3 = c2[n4 + 4 >> 2];
                  }
                  if (s3 = s3 - r4 | 0, s3 >> 2 >>> 0 > a4 - v3 >> 3 >>> 0) break b;
                  for (s3 = r4 + s3 | 0, a4 = v3; ; ) {
                    if ((r4 | 0) == (s3 | 0)) e: {
                      r4 = c2[e5 + 44 >> 2], a4 = ze(b3, x3, u2[e5 + 48 >> 1], 0), s3 = r4 + a4 | 0, r4 = N + (r4 >> 31) | 0, S3 = s3, T3 = a4 >>> 0 > s3 >>> 0 ? r4 + 1 | 0 : r4, r4 = c2[e5 + 40 >> 2], a4 = ze(b3, x3, u2[e5 + 50 >> 1], 0), s3 = r4 + a4 | 0, r4 = N + (r4 >> 31) | 0, E3 = s3, D3 = a4 >>> 0 > s3 >>> 0 ? r4 + 1 | 0 : r4, s3 = 0, r4 = 0;
                      f: for (; ; ) {
                        if (!r4 & d2[e5 + 32 >> 2] <= s3 >>> 0 | r4) break e;
                        for (g3 = c2[n4 >> 2], C3 = c2[n4 + 4 >> 2] - g3 >> 2, a4 = 0, h3 = 0; ; ) {
                          if (_3 = a4 & 255, C3 >>> 0 <= _3 >>> 0) {
                            a4 = c2[e5 + 12 >> 2] - 1 | 0, a4 = c2[c2[c2[e5 + 16 >> 2] >> 2] + ((a4 >>> 0 < h3 >>> 0 ? a4 : h3) << 2) >> 2], g3 = ze(s3, r4, u2[e5 + 48 >> 1], 0), _3 = g3 + E3 | 0, h3 = N + D3 | 0, h3 = g3 >>> 0 > _3 >>> 0 ? h3 + 1 | 0 : h3, g3 = ze(s3, r4, u2[e5 + 50 >> 1], 0), C3 = S3 - g3 | 0, _3 = (h3 & 255) << 24 | _3 >>> 8, w3 = h3 >> 8, g3 = T3 - (N + (g3 >>> 0 > S3 >>> 0) | 0) | 0, h3 = g3 >> 8, Ab(a4, y3, _3, w3, (g3 & 255) << 24 | C3 >>> 8, h3, c2[e5 + 24 >> 2]), s3 = s3 + 1 | 0, r4 = s3 ? r4 : r4 + 1 | 0;
                            continue f;
                          }
                          w3 = h3, h3 = (_3 << 3) + v3 | 0, h3 = w3 | ia(c2[c2[(_3 << 2) + g3 >> 2] + 20 >> 2], s3, c2[h3 >> 2], c2[h3 + 4 >> 2]) << _3, a4 = a4 + 1 | 0;
                        }
                      }
                    }
                    else {
                      ja(f3 + 8 | 0, c2[r4 >> 2], b3), S3 = c2[f3 + 12 >> 2], c2[a4 >> 2] = c2[f3 + 8 >> 2], c2[a4 + 4 >> 2] = S3, a4 = a4 + 8 | 0, r4 = r4 + 4 | 0;
                      continue;
                    }
                    break;
                  }
                  a4 = x3, b3 = b3 + 1 | 0, x3 = b3 ? a4 : a4 + 1 | 0, va(f3 + 16 | 0);
                  continue;
                }
                break;
              }
              za();
            }
            o();
          }
          return la(f3 + 28 | 0), M = f3 + 32 | 0, y3;
        }
        function Zb(e5, n4, r4, a4, s3, f3, h3, g3) {
          var _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0;
          v3 = M - 48 | 0, M = v3, x3 = ((n4 & 536870911) << 3 | e5 >>> 29) & -8, C3 = a4, a4 = -1, w3 = 1;
          a: {
            b: for (; ; ) {
              y3 = w3 & 1, T3 = y3 ? 326 : 325, E3 = y3 ? 1392 : 1056, D3 = y3 ? 325 : 326, O3 = y3 ? 1056 : 1392;
              c: for (; ; ) {
                for (_3 = c2[r4 >> 2]; ; ) {
                  if (_3 >>> 0 >= x3 >>> 0) break a;
                  d: {
                    _3 = 0;
                    e: {
                      if (Ia(e5, n4, r4)) break e;
                      if (d2[r4 >> 2] >= x3 >>> 0 || (b3 = Ia(e5, n4, r4), d2[r4 >> 2] >= x3 >>> 0)) break a;
                      if (S3 = Ia(e5, n4, r4), _3 = S3 ? 1 : -1, b3) break e;
                      if (S3) {
                        for (_3 = 0; ; ) {
                          if (Yb(v3 + 44 | 0, O3, D3, e5, n4, r4), l2[v3 + 46 | 0] != 1 || (b3 = u2[v3 + 44 >> 1], _3 = b3 + _3 | 0, (_3 | 0) > (g3 | 0))) break a;
                          if (!(b3 >>> 0 >= 64)) break;
                        }
                        for (b3 = ((a4 >>> 31 | 0) + a4 | 0) + _3 | 0, y3 || gb(C3, s3, g3, a4, b3), _3 = 0; ; ) {
                          if (Yb(v3 + 44 | 0, E3, T3, e5, n4, r4), l2[v3 + 46 | 0] != 1 || (a4 = u2[v3 + 44 >> 1], _3 = a4 + _3 | 0, (_3 | 0) > (g3 | 0))) break a;
                          if (!(a4 >>> 0 >= 64)) break;
                        }
                        if (a4 = _3 + b3 | 0, y3 && gb(C3, s3, g3, b3, a4), (a4 | 0) < (g3 | 0)) continue c;
                        break a;
                      }
                      if (d2[r4 >> 2] >= x3 >>> 0) break a;
                      if (Ia(e5, n4, r4)) {
                        if (c2[v3 + 32 >> 2] = f3, c2[v3 + 36 >> 2] = h3, c2[v3 + 16 >> 2] = f3, c2[v3 + 20 >> 2] = h3, Gc(v3 + 16 | 0, g3, a4, y3, v3 + 44 | 0, v3 + 40 | 0), _3 = c2[v3 + 40 >> 2], y3 || gb(C3, s3, g3, a4, _3), a4 = _3, (_3 | 0) < (g3 | 0)) continue c;
                        break a;
                      }
                      if (d2[r4 >> 2] >= x3 >>> 0 || (b3 = Ia(e5, n4, r4), d2[r4 >> 2] >= x3 >>> 0)) break a;
                      if (S3 = Ia(e5, n4, r4), _3 = S3 ? 2 : -2, b3) break e;
                      if (_3 = c2[r4 >> 2], !S3) break d;
                      if (_3 >>> 0 >= x3 >>> 0) break a;
                      _3 = Ia(e5, n4, r4) ? 3 : -3;
                    }
                    if (c2[v3 + 24 >> 2] = f3, c2[v3 + 28 >> 2] = h3, c2[v3 + 8 >> 2] = f3, c2[v3 + 12 >> 2] = h3, Gc(v3 + 8 | 0, g3, a4, y3, v3 + 44 | 0, v3 + 40 | 0), _3 = _3 + c2[v3 + 44 >> 2] | 0, y3 || gb(C3, s3, g3, a4, _3), (g3 | 0) <= (_3 | 0)) break a;
                    if (w3 ^= 1, y3 = (a4 | 0) < (_3 | 0), a4 = _3, y3) continue b;
                    break a;
                  }
                  if (_3 >>> 0 >= x3 >>> 0) break a;
                  if (b3 = Ia(e5, n4, r4), _3 = c2[r4 >> 2], b3) _3 = _3 + 3 | 0, c2[r4 >> 2] = _3;
                  else break;
                }
                break;
              }
              break;
            }
            c2[r4 >> 2] = _3 + 5;
          }
          M = v3 + 48 | 0;
        }
        function qe(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0, s3 = 0, u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0, D3 = 0, O3 = 0, k2 = 0, A2 = 0, j2 = 0;
          r4 = M - 48 | 0, M = r4, _3 = c2[n4 + 4 >> 2], w3 = c2[n4 + 12 >> 2], T3 = c2[n4 + 8 >> 2], g3 = c2[c2[n4 >> 2] >> 2], s3 = c2[e5 + 24 >> 2], ja(r4 + 40 | 0, g3, s3 - 1 | 0), O3 = T3 + 810 | 0, k2 = w3 >>> 0 > 405, v3 = 4;
          a: {
            for (; ; ) {
              b: {
                c: {
                  if (d2[e5 + 8 >> 2] > s3 >>> 0) {
                    y3 = c2[r4 + 44 >> 2], b3 = c2[r4 + 40 >> 2], ja(r4 + 32 | 0, g3, s3), u3 = c2[r4 + 36 >> 2], x3 = c2[r4 + 32 >> 2], c2[r4 + 40 >> 2] = x3, c2[r4 + 44 >> 2] = u3;
                    d: {
                      e: {
                        f: {
                          if (!l2[e5 + 1 | 0]) {
                            s3 = c2[e5 + 60 >> 2];
                            break f;
                          }
                          if (l2[_3 | 0]) break b;
                          if (!k2) break e;
                          s3 = c2[e5 + 60 >> 2] ^ ka(_3, O3), c2[e5 + 60 >> 2] = s3;
                        }
                        if (s3) {
                          c2[r4 + 20 >> 2] = y3, c2[r4 + 16 >> 2] = b3, c2[r4 + 24 >> 2] = x3, c2[r4 + 28 >> 2] = u3, c2[r4 + 8 >> 2] = x3, c2[r4 + 12 >> 2] = u3, u3 = c2[r4 + 20 >> 2], c2[r4 >> 2] = c2[r4 + 16 >> 2], c2[r4 + 4 >> 2] = u3, Ca(r4 + 8 | 0, r4);
                          break d;
                        }
                        for (s3 = c2[e5 + 24 >> 2], h3 = 0, E3 = 0, D3 = 0, l2[e5 + 2 | 0] == 1 && (ja(r4 + 32 | 0, c2[e5 + 12 >> 2], s3), D3 = c2[r4 + 32 >> 2], E3 = c2[r4 + 36 >> 2]), ja(r4 + 32 | 0, g3, s3 + a3[e5 + 17 | 0] | 0), A2 = c2[r4 + 36 >> 2], j2 = c2[r4 + 32 >> 2], f3 = c2[g3 + 20 >> 2], h3 = !y3 | (f3 | 0) < 2 ? h3 : l2[b3 | 0] >>> 6 & 1, h3 = !y3 | (f3 | 0) <= 0 ? h3 : l2[b3 | 0] >>> 6 & 2 | h3, C3 = 0, s3 = 0; ; ) {
                          if (d2[e5 + 4 >> 2] <= s3 >>> 0) break d;
                          g: {
                            h: {
                              if (l2[e5 + 2 | 0] == 1 && ia(c2[c2[e5 + 12 >> 2] + 20 >> 2], s3, D3, E3)) break h;
                              if (f3 = ia(f3, a3[e5 + 16 | 0] + s3 | 0, j2, A2), l2[_3 | 0]) break b;
                              if (f3 = h3 << 5 | f3 << 4 | C3, f3 >>> 0 >= w3 >>> 0) break e;
                              if (S3 = ka(_3, (f3 << 1) + T3 | 0), f3 = c2[g3 + 20 >> 2], !S3) break h;
                              Ea(f3, s3, x3, u3, 1), f3 = c2[g3 + 20 >> 2], S3 = 1;
                              break g;
                            }
                            S3 = 0;
                          }
                          h3 = ia(f3, s3 + 2 | 0, b3, y3) | h3 << 1 & 30, s3 = s3 + 1 | 0, C3 = C3 << 1 & 14 | S3;
                        }
                      }
                      o();
                    }
                    if (u3 = c2[n4 + 16 >> 2], !u3) {
                      s3 = c2[e5 + 24 >> 2];
                      break c;
                    }
                    if (u3 = P[c2[c2[u3 >> 2] + 8 >> 2]](u3) | 0, s3 = c2[e5 + 24 >> 2], !u3) break c;
                    c2[e5 + 24 >> 2] = s3 + 1, v3 = 3;
                  }
                  c2[e5 + 52 >> 2] = v3;
                  break a;
                }
                s3 = s3 + 1 | 0, c2[e5 + 24 >> 2] = s3;
                continue;
              }
              break;
            }
            v3 = -1;
          }
          return M = r4 + 48 | 0, v3 | 0;
        }
        function Od(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0, s3 = 0, u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0;
          if (r4 = c2[n4 + 60 >> 2], s3 = c2[n4 + 64 >> 2], f3 = n4 + 52 | 0, Jc(r4, s3, f3), v3 = ((s3 & 536870911) << 3 | r4 >>> 29) & -8, v3 >>> 0 <= d2[n4 + 52 >> 2]) c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0;
          else {
            Kc(c2[n4 + 68 >> 2], c2[n4 + 72 >> 2]), g3 = n4 + 68 | 0, r4 = c2[n4 + 48 >> 2];
            a: {
              if ((r4 | 0) < 0) {
                u3 = c2[n4 + 68 >> 2], r4 = c2[n4 + 72 >> 2] - u3 | 0, s3 = 0, _3 = r4, h3 = c2[n4 + 80 >> 2], r4 = c2[n4 + 84 >> 2] - h3 | 0, Zb(c2[n4 + 60 >> 2], c2[n4 + 64 >> 2], f3, u3 | s3, _3, s3 | h3, r4, c2[n4 + 4 >> 2]), Ic(n4 + 80 | 0, g3);
                break a;
              }
              if (!r4) {
                s3 = c2[n4 + 68 >> 2], r4 = c2[n4 + 72 >> 2] - s3 | 0, Hc(c2[n4 + 60 >> 2], c2[n4 + 64 >> 2], f3, s3, r4, c2[n4 + 4 >> 2]);
                break a;
              }
              u3 = Ia(c2[n4 + 60 >> 2], c2[n4 + 64 >> 2], f3), h3 = c2[n4 + 68 >> 2], r4 = c2[n4 + 72 >> 2] - h3 | 0, s3 = c2[n4 + 60 >> 2], y3 = c2[n4 + 64 >> 2];
              b: {
                if (u3) {
                  Hc(s3, y3, f3, h3, r4, c2[n4 + 4 >> 2]);
                  break b;
                }
                _3 = s3, s3 = 0, b3 = r4, u3 = c2[n4 + 80 >> 2], r4 = c2[n4 + 84 >> 2] - u3 | 0, Zb(_3, y3, f3, s3 | h3, b3, s3 | u3, r4, c2[n4 + 4 >> 2]);
              }
              Ic(n4 + 80 | 0, g3);
            }
            l2[n4 + 57 | 0] == 1 && Jc(c2[n4 + 60 >> 2], c2[n4 + 64 >> 2], f3);
            c: {
              d: {
                e: {
                  if (l2[n4 + 56 | 0] != 1 || (s3 = c2[f3 >> 2], v3 >>> 0 <= s3 >>> 0)) break e;
                  for (u3 = s3 + 7 & -8; ; ) {
                    g3 = s3 >>> 3 | 0, h3 = 128 >>> (s3 & 7) | 0, r4 = 1;
                    f: {
                      for (; ; ) {
                        if (!r4 | s3 >>> 0 >= u3 >>> 0) break f;
                        if (g3 >>> 0 >= d2[n4 + 64 >> 2]) break d;
                        if (h3 & l2[g3 + c2[n4 + 60 >> 2] | 0]) r4 = 0, a3[n4 + 56 | 0] = 0;
                        else break;
                      }
                      s3 = s3 + 1 | 0;
                      continue;
                    }
                    break;
                  }
                  if (!r4) break e;
                  c2[f3 >> 2] = u3;
                }
                if (r4 = c2[n4 + 68 >> 2], !l2[n4 + 58 | 0]) {
                  s3 = c2[n4 + 72 >> 2] - r4 | 0;
                  break c;
                }
                if (r4 & 3) break d;
                for (s3 = c2[n4 + 72 >> 2] - r4 | 0, u3 = r4 + (s3 & -4) | 0, n4 = r4; ; ) {
                  if ((n4 | 0) == (u3 | 0)) break c;
                  c2[n4 >> 2] = c2[n4 >> 2] ^ -1, n4 = n4 + 4 | 0;
                }
              }
              o();
            }
            c2[e5 + 4 >> 2] = s3, c2[e5 >> 2] = r4;
          }
        }
        function ab(e5, n4, r4) {
          var s3 = 0, u3 = 0, d3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0;
          g3 = M - 32 | 0, M = g3;
          a: {
            b: {
              if (!c2[e5 + 16 >> 2] | c2[e5 + 24 >> 2] >= (n4 | 0) || (u3 = c2[e5 + 28 >> 2], (268435452 / (u3 | 0) | 0) < (n4 | 0))) break b;
              if ((n4 | 0) < 0 || (u3 = ze(u3, u3 >> 31, n4, 0), f3 = N, (f3 | 0) == 1 | f3 >>> 0 > 1)) break a;
              v3 = c2[e5 + 12 >> 2], f3 = 0, _3 = c2[e5 + 16 >> 2], s3 = c2[e5 >> 2], h3 = c2[e5 + 4 >> 2];
              c: {
                if ((s3 | 0) != (h3 | 0)) {
                  c2[e5 + 12 >> 2] = 0, c2[e5 + 16 >> 2] = 0, d3 = h3 - s3 | 0;
                  d: {
                    if (d3 >>> 0 < u3 >>> 0) {
                      if (f3 = c2[e5 + 8 >> 2], u3 >>> 0 <= f3 - s3 >>> 0) {
                        kd(e5, u3 - d3 | 0);
                        break d;
                      }
                      for (h3 = Fc(s3, f3, u3), h3 && (y3 = Ad(h3)), v3 = u3 + y3 | 0, f3 = d3 + y3 | 0, s3 = f3; (s3 | 0) != (v3 | 0); ) a3[s3 | 0] = 0, s3 = s3 + 1 | 0;
                      for (s3 = c2[e5 >> 2], u3 = c2[e5 + 4 >> 2], f3 = f3 + (s3 - u3 | 0) | 0, d3 = f3; (s3 | 0) != (u3 | 0); ) a3[d3 | 0] = l2[s3 | 0], d3 = d3 + 1 | 0, s3 = s3 + 1 | 0;
                      c2[e5 + 4 >> 2] = v3, c2[e5 + 8 >> 2] = h3 + y3, u3 = c2[e5 >> 2], c2[e5 >> 2] = f3, ma(u3);
                      break d;
                    }
                    if (u3 >>> 0 >= d3 >>> 0) break d;
                    c2[e5 + 4 >> 2] = s3 + u3;
                  }
                  u3 = c2[e5 >> 2], c2[e5 + 12 >> 2] = u3, s3 = c2[e5 + 4 >> 2] - u3 | 0, c2[e5 + 16 >> 2] = s3;
                  break c;
                }
                if (d3 = Gb(g3, u3), h3 = c2[d3 >> 2], c2[g3 + 12 >> 2] = h3, u3 = c2[d3 + 4 >> 2], c2[g3 + 16 >> 2] = u3, c2[g3 + 20 >> 2] = c2[d3 + 8 >> 2], c2[d3 + 8 >> 2] = 0, c2[d3 >> 2] = 0, c2[d3 + 4 >> 2] = 0, c2[g3 + 28 >> 2] = u3 - h3, c2[g3 + 24 >> 2] = h3, u3 = g3 + 12 | 0, ec(e5, u3), va(u3), va(d3), s3 = c2[e5 + 16 >> 2], _3 >>> 0 > s3 >>> 0) break a;
                if (!(f3 | _3)) break c;
                _3 && p(c2[e5 + 12 >> 2], v3, _3), s3 = c2[e5 + 16 >> 2];
              }
              if (s3 >>> 0 < _3 >>> 0) break a;
              for (r4 = 0 - r4 | 0, s3 = s3 - _3 | 0, d3 = c2[e5 + 12 >> 2] + _3 | 0; (s3 | 0) > 0; ) a3[d3 | 0] = r4, s3 = s3 - 1 | 0, d3 = d3 + 1 | 0;
              c2[e5 + 24 >> 2] = n4;
            }
            M = g3 + 32 | 0;
            return;
          }
          o();
        }
        function nd(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, u3 = 0, d3 = 0, f3 = 0;
          a4 = M - 32 | 0, M = a4, f3 = c2[e5 + 24 >> 2], c2[a4 + 16 >> 2] = 0;
          a: {
            b: switch (l2[e5 + 3 | 0]) {
              case 0:
                r4 = Bd(e5) ? 3 : 4;
                break a;
              case 1:
                r4 = yd(e5) ? 5 : 6;
                break a;
              case 2:
                r4 = Hb(e5) ? 7 : 8;
                break a;
              default:
                break b;
            }
            r4 = Hb(e5) ? 9 : 10;
          }
          s3 = M - 48 | 0, M = s3, c2[s3 + 24 >> 2] = 0;
          c: {
            if (r4) {
              if (c2[s3 + 16 >> 2] = 0, c2[s3 + 12 >> 2] = r4, c2[s3 + 8 >> 2] = 2244, d3 = s3 + 8 | 0, c2[s3 + 24 >> 2] = d3, c2[a4 + 16 >> 2] == (a4 | 0)) {
                u3 = s3 + 32 | 0, P[c2[c2[s3 + 8 >> 2] + 12 >> 2]](d3, u3), r4 = c2[s3 + 24 >> 2], P[c2[c2[r4 >> 2] + 16 >> 2]](r4), c2[s3 + 24 >> 2] = 0, r4 = c2[a4 + 16 >> 2], P[c2[c2[r4 >> 2] + 12 >> 2]](r4, d3), r4 = c2[a4 + 16 >> 2], P[c2[c2[r4 >> 2] + 16 >> 2]](r4), c2[a4 + 16 >> 2] = 0, c2[s3 + 24 >> 2] = d3, P[c2[c2[s3 + 32 >> 2] + 12 >> 2]](u3, a4), P[c2[c2[s3 + 32 >> 2] + 16 >> 2]](u3), c2[a4 + 16 >> 2] = a4;
                break c;
              }
              P[c2[c2[s3 + 8 >> 2] + 12 >> 2]](s3 + 8 | 0, a4), r4 = c2[s3 + 24 >> 2], P[c2[c2[r4 >> 2] + 16 >> 2]](r4), c2[s3 + 24 >> 2] = c2[a4 + 16 >> 2], c2[a4 + 16 >> 2] = a4;
              break c;
            }
            if (r4 = c2[a4 + 16 >> 2], (r4 | 0) == (a4 | 0)) {
              u3 = s3 + 8 | 0, P[c2[c2[r4 >> 2] + 12 >> 2]](r4, u3), r4 = c2[a4 + 16 >> 2], P[c2[c2[r4 >> 2] + 16 >> 2]](r4), c2[a4 + 16 >> 2] = c2[s3 + 24 >> 2], c2[s3 + 24 >> 2] = u3;
              break c;
            }
            c2[s3 + 24 >> 2] = r4, c2[a4 + 16 >> 2] = 0;
          }
          if (md(s3 + 8 | 0), M = s3 + 48 | 0, r4 = c2[c2[n4 >> 2] >> 2], u3 = c2[a4 + 16 >> 2], c2[a4 + 28 >> 2] = n4, u3) return u3 = P[c2[c2[u3 >> 2] + 24 >> 2]](u3, e5, a4 + 28 | 0) | 0, c2[e5 + 64 >> 2] = 0, c2[e5 + 52 >> 2] = u3, n4 = c2[r4 + 20 >> 2], c2[e5 + 68 >> 2] = f3, c2[e5 + 72 >> 2] = n4, c2[e5 + 76 >> 2] = c2[e5 + 24 >> 2], (u3 | 0) == 4 && (c2[e5 + 24 >> 2] = 0), md(a4), M = a4 + 32 | 0, u3;
          e5 = vb(4), c2[e5 >> 2] = 4876, C2(e5 | 0, 4888, 11), o();
        }
        function ie(e5, n4, r4, s3, l3, u3, d3, f3, g3, _3) {
          e5 |= 0, n4 |= 0, r4 |= 0, s3 |= 0, l3 |= 0, u3 |= 0, d3 |= 0, f3 |= 0, g3 |= 0, _3 |= 0;
          var v3 = 0, y3 = 0;
          v3 = M - 16 | 0, M = v3, y3 = g3 || r4;
          a: {
            if ((y3 | 0) <= 0 || (_3 ||= s3, (_3 | 0) <= 0 | (_3 | y3) >>> 0 > 65535)) break a;
            for (g3 = na(92), c2[g3 + 44 >> 2] = 0, c2[g3 + 36 >> 2] = -1, c2[g3 + 40 >> 2] = 0, a3[g3 + 32 | 0] = 0, c2[g3 + 20 >> 2] = 1, c2[g3 + 24 >> 2] = 1, c2[g3 + 16 >> 2] = _3, c2[g3 + 12 >> 2] = y3, c2[g3 + 8 >> 2] = _3, c2[g3 + 4 >> 2] = y3, c2[g3 + 60 >> 2] = e5, c2[g3 + 64 >> 2] = n4, a3[g3 + 58 | 0] = !!(f3 | 0), a3[g3 + 57 | 0] = !!(u3 | 0), a3[g3 + 56 | 0] = !!(d3 | 0), c2[g3 + 52 >> 2] = 0, c2[g3 + 48 >> 2] = l3, c2[g3 >> 2] = 1728, e5 = (y3 >>> 3 | 0) + 3 | 0, e5 = ((y3 << 29) - 536870912 >>> 0 < 3758096384 ? e5 + 1 | 0 : e5) & 16380, c2[g3 + 28 >> 2] = e5, Gb(g3 + 68 | 0, e5), Gb(g3 + 80 | 0, c2[g3 + 28 >> 2]), l3 = r4 + 7 >>> 3 | 0, A(h2(l3, s3) | 0), r4 = 0; ; ) {
              b: {
                if ((r4 | 0) == (s3 | 0)) break b;
                c: {
                  if (_3 = c2[g3 + 36 >> 2], e5 = r4 + 1 | 0, (_3 | 0) == (e5 | 0)) {
                    n4 = c2[g3 + 44 >> 2], _3 = c2[g3 + 40 >> 2];
                    break c;
                  }
                  d: {
                    if (!((_3 | 0) >= 0 & (r4 | 0) >= (_3 | 0))) {
                      if (_3 = 0, !(P[c2[c2[g3 >> 2] + 12 >> 2]](g3) | 0)) break b;
                      n4 = 0;
                      break d;
                    }
                    n4 = 1;
                  }
                  for (; ; ) if (!n4) c2[g3 + 36 >> 2] = _3, n4 = 1;
                  else {
                    e: {
                      if ((r4 | 0) > (_3 | 0)) {
                        P[c2[c2[g3 >> 2] + 16 >> 2]](v3 + 8 | 0, g3), _3 = c2[g3 + 36 >> 2] + 1 | 0;
                        break e;
                      }
                      P[c2[c2[g3 >> 2] + 16 >> 2]](v3 + 8 | 0, g3), n4 = c2[v3 + 12 >> 2], _3 = c2[v3 + 8 >> 2], c2[g3 + 40 >> 2] = _3, c2[g3 + 44 >> 2] = n4, c2[g3 + 36 >> 2] = c2[g3 + 36 >> 2] + 1;
                      break c;
                    }
                    n4 = 0;
                  }
                }
                if (!n4) break b;
                k(_3 | 0, l3 | 0, h2(r4, l3) | 0), r4 = e5;
                continue;
              }
              break;
            }
            P[c2[c2[g3 >> 2] + 4 >> 2]](g3);
          }
          M = v3 + 16 | 0;
        }
        function db(e5, n4, r4) {
          var s3 = 0, u3 = 0, d3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0, C3 = 0, w3 = 0, T3 = 0, E3 = 0;
          s3 = M - 32 | 0, M = s3, h3 = ua(e5 + 4 | 0, e5 + 8 | 0), c2[s3 + 8 >> 2] = h3, g3 = c2[h3 + 12 >> 2], d3 = c2[h3 + 16 >> 2], f3 = d3;
          a: {
            if (!d3) {
              oa(n4, 0), c2[e5 + 52 >> 2] = -1;
              break a;
            }
            b: {
              if (d3 = c2[h3 + 28 >> 2], (d3 | 0) < 0 | !d3) break b;
              for (_3 = c2[r4 + 12 >> 2] + (c2[r4 + 8 >> 2] << 3) | 0, y3 = f3, v3 = c2[e5 + 8 >> 2], S3 = c2[e5 + 4 >> 2], C3 = c2[r4 >> 2], w3 = c2[r4 + 4 >> 2], c2[s3 + 20 >> 2] = 0, c2[s3 + 12 >> 2] = 0, c2[s3 + 16 >> 2] = 0, f3 = s3 + 12 | 0, c2[s3 + 24 >> 2] = f3, Eb(f3, d3), u3 = c2[s3 + 16 >> 2], f3 = d3 + u3 | 0; (u3 | 0) != (f3 | 0); ) a3[u3 | 0] = 255, u3 = u3 + 1 | 0;
              for (a3[s3 + 28 | 0] = 1, c2[s3 + 16 >> 2] = f3, gc(s3 + 24 | 0), b3 = c2[s3 + 12 >> 2], f3 = c2[s3 + 16 >> 2], c2[s3 + 24 >> 2] = _3, T3 = (v3 | 0) > 0 ? v3 : 0, u3 = 0, f3 = f3 - b3 | 0, v3 = u3 | b3; (x3 | 0) != (T3 | 0); ) {
                if (_3 = g3, u3 = d3, y3 >>> 0 < d3 >>> 0) break b;
                for (; (u3 | 0) > 0; ) a3[_3 | 0] = 255, u3 = u3 - 1 | 0, _3 = _3 + 1 | 0;
                if (Zb(C3, w3, s3 + 24 | 0, g3 | E3, d3, v3, f3, S3), d3 >>> 0 > f3 >>> 0) break b;
                d3 && p(b3, g3, d3), x3 = x3 + 1 | 0, y3 = y3 - d3 | 0, g3 = d3 + g3 | 0;
              }
              for (g3 = c2[s3 + 24 >> 2], va(s3 + 12 | 0), c2[r4 + 12 >> 2] = g3 & 7, c2[r4 + 8 >> 2] = g3 >>> 3, u3 = c2[h3 + 12 >> 2], r4 = u3 + c2[h3 + 16 >> 2] | 0; ; ) if ((r4 | 0) == (u3 | 0)) {
                c2[e5 + 64 >> 2] = 0, c2[e5 + 52 >> 2] = 4, r4 = c2[h3 + 20 >> 2], c2[e5 + 68 >> 2] = 0, c2[e5 + 72 >> 2] = r4, c2[e5 + 76 >> 2] = c2[h3 + 24 >> 2], c2[s3 + 8 >> 2] = 0, oa(n4, h3);
                break a;
              } else {
                a3[u3 | 0] = l2[u3 | 0] ^ -1, u3 = u3 + 1 | 0;
                continue;
              }
            }
            o();
          }
          la(s3 + 8 | 0), M = s3 + 32 | 0;
        }
        function Ld(e5) {
          var n4 = 0, r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0, f3 = 0, h3 = 0, g3 = 0;
          for (l3 = M - 16 | 0, M = l3, c2[e5 + 44 >> 2] = 0, s3 = c2[e5 + 12 >> 2], n4 = c2[e5 + 8 >> 2]; ; ) {
            if ((n4 | 0) == (s3 | 0)) a: {
              for (c2[l3 + 4 >> 2] = 0, a4 = r4 + 1 | 0, fc(e5 + 60 | 0, a4, l3 + 4 | 0), s3 = c2[e5 + 12 >> 2], n4 = c2[e5 + 8 >> 2]; ; ) if ((n4 | 0) == (s3 | 0)) {
                for (c2[c2[e5 + 60 >> 2] >> 2] = 0, c2[l3 + 4 >> 2] = 0, n4 = l3 + 4 | 0, fc(e5 + 48 | 0, a4, n4), c2[l3 + 4 >> 2] = 0, fc(e5 + 72 | 0, a4, n4), r4 = 0, s3 = 0, n4 = 1; g3 = d2[e5 + 44 >> 2] < n4 >>> 0, !g3; ) {
                  if (u3 = n4 << 2, f3 = u3 + c2[e5 + 60 >> 2] | 0, h3 = c2[f3 - 4 >> 2], r4 = h3 + r4 | 0, (r4 | 0) < 0 | r4 >>> 0 < h3 >>> 0) break a;
                  r4 <<= 1, c2[u3 + c2[e5 + 48 >> 2] >> 2] = r4, c2[u3 + c2[e5 + 72 >> 2] >> 2] = s3, n4 = n4 + 1 | 0, s3 = c2[f3 >> 2] + s3 | 0;
                }
                for (Rb(e5 + 84 | 0, s3), n4 = 0, c2[l3 + 12 >> 2] = 0, c2[l3 + 4 >> 2] = 0, c2[l3 + 8 >> 2] = 0, s3 = 0, a4 && (s3 = l3 + 4 | 0, ed(s3, a4), qd(s3, a4), s3 = c2[l3 + 4 >> 2]), u3 = c2[e5 + 8 >> 2], f3 = c2[e5 + 12 >> 2] - u3 >> 3; ; ) {
                  if ((n4 | 0) == (f3 | 0)) {
                    va(l3 + 4 | 0);
                    break a;
                  }
                  r4 = u3 + (n4 << 3) | 0, a4 = c2[r4 >> 2], a4 && (h3 = r4, a4 <<= 2, r4 = a4 + s3 | 0, c2[h3 + 4 >> 2] = c2[r4 >> 2] + c2[a4 + c2[e5 + 48 >> 2] >> 2], c2[(c2[e5 + 84 >> 2] + (c2[a4 + c2[e5 + 72 >> 2] >> 2] << 2) | 0) + (c2[r4 >> 2] << 2) >> 2] = n4, c2[r4 >> 2] = c2[r4 >> 2] + 1), n4 = n4 + 1 | 0;
                }
              } else {
                r4 = c2[e5 + 60 >> 2] + (c2[n4 >> 2] << 2) | 0, c2[r4 >> 2] = c2[r4 >> 2] + 1, n4 = n4 + 8 | 0;
                continue;
              }
            }
            else {
              a4 = c2[n4 >> 2], r4 = r4 >>> 0 < a4 >>> 0 ? a4 : r4, c2[e5 + 44 >> 2] = r4, n4 = n4 + 8 | 0;
              continue;
            }
            break;
          }
          return M = l3 + 16 | 0, g3;
        }
        function Md(e5) {
          var n4 = 0, r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0, d3 = 0;
          n4 = c2[1420], r4 = e5 + 7 & -8, e5 = r4 + 7 | 0, a4 = e5 >>> 0 < 7 ? 1 : a4, s3 = e5 & -8, e5 = s3 + n4 | 0;
          a: {
            b: {
              if (!(e5 >>> 0 < s3 >>> 0 ? a4 + 1 | 0 : a4) && (e5 >>> 0 <= $() << 16 >>> 0 || T2(e5 | 0) | 0)) break b;
              c2[1428] = 48, n4 = -1;
              break a;
            }
            c2[1420] = e5;
          }
          if (a4 = n4, (a4 | 0) != -1) {
            e5 = a4 + r4 | 0, c2[e5 - 4 >> 2] = 16, l3 = e5 - 16 | 0, c2[l3 >> 2] = 16, n4 = c2[1688], s3 = n4 ? c2[n4 + 8 >> 2] : 0;
            c: {
              d: {
                if ((s3 | 0) == (a4 | 0)) {
                  if (s3 = c2[a4 - 4 >> 2] & -2, u3 = a4 - s3 | 0, d3 = c2[u3 - 4 >> 2], c2[n4 + 8 >> 2] = e5, n4 = d3 & -2, e5 = u3 - n4 | 0, c2[(e5 + c2[e5 >> 2] | 0) - 4 >> 2] & 1) {
                    l3 = c2[e5 + 4 >> 2], u3 = c2[e5 + 8 >> 2], c2[l3 + 8 >> 2] = u3, c2[u3 + 4 >> 2] = l3, n4 = (n4 + (r4 + s3 | 0) | 0) - 16 | 0, c2[e5 >> 2] = n4;
                    break c;
                  }
                  e5 = a4 - 16 | 0;
                  break d;
                }
                c2[a4 >> 2] = 16, c2[a4 + 8 >> 2] = e5, c2[a4 + 4 >> 2] = n4, c2[a4 + 12 >> 2] = 16, c2[1688] = a4, e5 = a4 + 16 | 0;
              }
              n4 = l3 - e5 | 0, c2[e5 >> 2] = n4;
            }
            c2[((n4 & -4) + e5 | 0) - 4 >> 2] = n4 | 1, r4 = c2[e5 >> 2] - 8 | 0;
            e: {
              if (r4 >>> 0 <= 127) {
                n4 = (r4 >>> 3 | 0) - 1 | 0;
                break e;
              }
              if (s3 = _2(r4), n4 = ((r4 >>> 29 - s3 ^ 4) - (s3 << 2) | 0) + 110 | 0, r4 >>> 0 <= 4095) break e;
              n4 = ((r4 >>> 30 - s3 ^ 2) - (s3 << 1) | 0) + 71 | 0, n4 = n4 >>> 0 >= 63 ? 63 : n4;
            }
            r4 = n4 << 4, c2[e5 + 4 >> 2] = r4 + 5728, r4 = r4 + 5736 | 0, c2[e5 + 8 >> 2] = c2[r4 >> 2], c2[r4 >> 2] = e5, c2[c2[e5 + 8 >> 2] + 4 >> 2] = e5, r4 = c2[1691], e5 = n4 & 31, (n4 & 63) >>> 0 >= 32 ? (n4 = 1 << e5, s3 = 0) : (s3 = 1 << e5, n4 = s3 - 1 & 1 >>> 32 - e5), c2[1690] = s3 | c2[1690], c2[1691] = n4 | r4;
          }
          return (a4 | 0) != -1;
        }
        function tb(e5, n4) {
          var r4 = 0, s3 = 0, l3 = 0;
          r4 = M + -64 | 0, M = r4, s3 = c2[e5 >> 2], l3 = c2[s3 - 8 >> 2], s3 = c2[s3 - 4 >> 2];
          a: {
            if (c2[s3 + 4 >> 2] == c2[n4 + 4 >> 2]) {
              e5 = l3 ? 0 : e5;
              break a;
            }
            if (l3 = e5 + l3 | 0, (l3 | 0) <= (e5 | 0) && (c2[r4 + 16 >> 2] = 0, c2[r4 + 20 >> 2] = 0, c2[r4 + 12 >> 2] = n4, c2[r4 + 8 >> 2] = e5, c2[r4 + 4 >> 2] = s3, c2[r4 + 24 >> 2] = 0, c2[r4 + 28 >> 2] = 0, c2[r4 + 32 >> 2] = 0, c2[r4 + 36 >> 2] = 0, c2[r4 + 40 >> 2] = 0, c2[r4 + 44 >> 2] = 0, c2[r4 + 48 >> 2] = 0, c2[r4 + 60 >> 2] = 0, c2[r4 + 52 >> 2] = 1, c2[r4 + 56 >> 2] = 16777216, P[c2[c2[s3 >> 2] + 20 >> 2]](s3, r4 + 4 | 0, l3, l3, 1, 0), c2[r4 + 28 >> 2])) break a;
            c2[r4 + 16 >> 2] = 0, c2[r4 + 20 >> 2] = 0, c2[r4 + 12 >> 2] = 4984, c2[r4 + 8 >> 2] = e5, c2[r4 + 4 >> 2] = n4, c2[r4 + 24 >> 2] = 0, c2[r4 + 28 >> 2] = 0, c2[r4 + 32 >> 2] = 0, c2[r4 + 36 >> 2] = 0, c2[r4 + 40 >> 2] = 0, c2[r4 + 44 >> 2] = 0, c2[r4 + 48 >> 2] = 0, c2[r4 + 52 >> 2] = 0, e5 = 0, a3[r4 + 55 | 0] = 0, a3[r4 + 56 | 0] = 0, a3[r4 + 57 | 0] = 0, a3[r4 + 58 | 0] = 0, c2[r4 + 60 >> 2] = 0, a3[r4 + 59 | 0] = 1, P[c2[c2[s3 >> 2] + 24 >> 2]](s3, r4 + 4 | 0, l3, 1, 0);
            b: switch (c2[r4 + 40 >> 2]) {
              case 0:
                e5 = c2[r4 + 44 >> 2] == 1 && c2[r4 + 32 >> 2] == 1 && c2[r4 + 36 >> 2] == 1 ? c2[r4 + 24 >> 2] : 0;
                break a;
              case 1:
                break b;
              default:
                break a;
            }
            if (c2[r4 + 28 >> 2] != 1 && c2[r4 + 44 >> 2] | c2[r4 + 32 >> 2] != 1 | c2[r4 + 36 >> 2] != 1) break a;
            e5 = c2[r4 + 20 >> 2];
          }
          return M = r4 - -64 | 0, e5;
        }
        function _b(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0;
          if (s3 = e5 + 4 | 0, a4 = s3 + 7 & -8, r4 = c2[e5 >> 2], a4 + n4 >>> 0 <= (r4 + e5 | 0) - 4 >>> 0) {
            l3 = c2[e5 + 4 >> 2], u3 = c2[e5 + 8 >> 2], c2[l3 + 8 >> 2] = u3, c2[u3 + 4 >> 2] = l3, (a4 | 0) != (s3 | 0) && (a4 = a4 - s3 | 0, l3 = e5 - (c2[e5 - 4 >> 2] & -2) | 0, s3 = a4 + c2[l3 >> 2] | 0, c2[l3 >> 2] = s3, c2[(l3 + (s3 & -4) | 0) - 4 >> 2] = s3, e5 = e5 + a4 | 0, r4 = r4 - a4 | 0, c2[e5 >> 2] = r4);
            a: {
              if (n4 + 24 >>> 0 <= r4 >>> 0) {
                s3 = e5 + n4 | 0, r4 = (r4 - n4 | 0) - 8 | 0, c2[s3 + 8 >> 2] = r4, u3 = s3 + 8 | 0, c2[(u3 + (r4 & -4) | 0) - 4 >> 2] = r4 | 1, a4 = c2[s3 + 8 >> 2] - 8 | 0;
                b: {
                  if (a4 >>> 0 <= 127) {
                    r4 = (a4 >>> 3 | 0) - 1 | 0;
                    break b;
                  }
                  if (l3 = _2(a4), r4 = ((a4 >>> 29 - l3 ^ 4) - (l3 << 2) | 0) + 110 | 0, a4 >>> 0 <= 4095) break b;
                  r4 = ((a4 >>> 30 - l3 ^ 2) - (l3 << 1) | 0) + 71 | 0, r4 = r4 >>> 0 >= 63 ? 63 : r4;
                }
                a4 = r4 << 4, c2[s3 + 12 >> 2] = a4 + 5728, a4 = a4 + 5736 | 0, c2[s3 + 16 >> 2] = c2[a4 >> 2], c2[a4 >> 2] = u3, c2[c2[s3 + 16 >> 2] + 4 >> 2] = u3, a4 = c2[1690], l3 = c2[1691], s3 = r4 & 31, (r4 & 63) >>> 0 >= 32 ? (r4 = 1 << s3, u3 = 0) : (u3 = 1 << s3, r4 = u3 - 1 & 1 >>> 32 - s3), c2[1690] = u3 | a4, c2[1691] = r4 | l3, r4 = n4 + 8 | 0, c2[e5 >> 2] = r4, n4 = (r4 & -4) + e5 | 0;
                break a;
              }
              n4 = e5 + r4 | 0;
            }
            c2[n4 - 4 >> 2] = r4, e5 = e5 + 4 | 0;
          } else e5 = 0;
          return e5;
        }
        function ya(e5, n4, r4) {
          var a4 = 0, s3 = 0, u3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0;
          for (f3 = M - 16 | 0, M = f3, v3 = c2[n4 + 44 >> 2], u3 = 1; ; ) {
            a: {
              b: {
                if (u3 >>> 0 > v3 >>> 0) {
                  s3 = -1;
                  break b;
                }
                if (s3 = -1, h3 = c2[e5 >> 2], _3 = c2[h3 + 8 >> 2], a4 = c2[h3 >> 2], d2[h3 + 4 >> 2] <= _3 >>> 0 || (a4 = l2[a4 + _3 | 0] >>> 7 - c2[h3 + 12 >> 2] & 1, c2[f3 + 12 >> 2] = a4, Tb(h3), (g3 | 0) < 0)) break b;
                if (g3 = a4 | g3 << 1, d2[n4 + 44 >> 2] < u3 >>> 0 || (a4 = u3 << 2, s3 = c2[a4 + c2[n4 + 48 >> 2] >> 2], s3 >>> 0 > g3 >>> 0) || (s3 = g3 - s3 | 0, s3 >>> 0 >= d2[a4 + c2[n4 + 60 >> 2] >> 2])) break a;
                if (a4 = c2[(c2[n4 + 84 >> 2] + (c2[a4 + c2[n4 + 72 >> 2] >> 2] << 2) | 0) + (s3 << 2) >> 2], s3 = 1, l2[n4 + 1 | 0] == 1 & (a4 | 0) == (c2[n4 + 4 >> 2] - 1 | 0) || (s3 = -1, u3 = c2[e5 >> 2], e5 = a4 << 2, (Fa(u3, c2[e5 + c2[n4 + 20 >> 2] >> 2], f3 + 12 | 0) | 0) == -1)) break b;
                s3 = 0, u3 = c2[e5 + c2[n4 + 32 >> 2] >> 2], e5 = c2[f3 + 12 >> 2], c2[r4 >> 2] = u3 + ((a4 | 0) == (c2[n4 + 4 >> 2] + (l2[n4 + 1 | 0] ? -3 : -2) | 0) ? 0 - e5 | 0 : e5);
              }
              return M = f3 + 16 | 0, s3;
            }
            u3 = u3 + 1 | 0;
          }
        }
        function ma(e5) {
          e5 |= 0;
          var n4 = 0, r4 = 0, a4 = 0, s3 = 0, l3 = 0;
          if (e5) {
            n4 = e5 - 4 | 0, l3 = c2[n4 >> 2], r4 = l3, a4 = n4, s3 = c2[e5 - 8 >> 2], e5 = s3 & -2, (e5 | 0) != (s3 | 0) && (a4 = n4 - e5 | 0, r4 = c2[a4 + 4 >> 2], s3 = c2[a4 + 8 >> 2], c2[r4 + 8 >> 2] = s3, c2[s3 + 4 >> 2] = r4, r4 = e5 + l3 | 0), e5 = n4 + l3 | 0, n4 = c2[e5 >> 2], (n4 | 0) != c2[(e5 + n4 | 0) - 4 >> 2] && (l3 = c2[e5 + 4 >> 2], e5 = c2[e5 + 8 >> 2], c2[l3 + 8 >> 2] = e5, c2[e5 + 4 >> 2] = l3, r4 = n4 + r4 | 0), c2[a4 >> 2] = r4, c2[((r4 & -4) + a4 | 0) - 4 >> 2] = r4 | 1, n4 = c2[a4 >> 2] - 8 | 0;
            a: {
              if (n4 >>> 0 <= 127) {
                e5 = (n4 >>> 3 | 0) - 1 | 0;
                break a;
              }
              if (r4 = _2(n4), e5 = ((n4 >>> 29 - r4 ^ 4) - (r4 << 2) | 0) + 110 | 0, n4 >>> 0 <= 4095) break a;
              e5 = ((n4 >>> 30 - r4 ^ 2) - (r4 << 1) | 0) + 71 | 0, e5 = e5 >>> 0 >= 63 ? 63 : e5;
            }
            n4 = e5 << 4, c2[a4 + 4 >> 2] = n4 + 5728, n4 = n4 + 5736 | 0, c2[a4 + 8 >> 2] = c2[n4 >> 2], c2[n4 >> 2] = a4, c2[c2[a4 + 8 >> 2] + 4 >> 2] = a4, n4 = c2[1690], r4 = c2[1691], a4 = e5 & 31, (e5 & 63) >>> 0 >= 32 ? (e5 = 1 << a4, s3 = 0) : (s3 = 1 << a4, e5 = s3 - 1 & 1 >>> 32 - a4), c2[1690] = s3 | n4, c2[1691] = e5 | r4;
          }
        }
        function fd(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0;
          a: {
            b: {
              r4 = c2[e5 + 4 >> 2], a4 = c2[e5 >> 2], s3 = r4 - a4 | 0, l3 = s3 >> 3;
              c: {
                if (l3 >>> 0 < n4 >>> 0) {
                  if (a4 = c2[e5 + 8 >> 2] - a4 | 0, a4 >> 3 >>> 0 >= n4 >>> 0) {
                    for (n4 = (n4 - l3 << 3) + r4 | 0; (n4 | 0) != (r4 | 0); ) c2[r4 >> 2] = 0, c2[r4 + 4 >> 2] = 0, r4 = r4 + 8 | 0;
                    c2[e5 + 4 >> 2] = n4;
                    return;
                  }
                  if (n4 >>> 0 >= 536870912) break b;
                  if (r4 = a4 >> 2, a4 = a4 >>> 0 >= 2147483640 ? 536870911 : n4 >>> 0 < r4 >>> 0 ? r4 : n4, a4 >>> 0 >= 536870912) break a;
                  for (r4 = n4 - l3 << 3, u3 = na(a4 << 3), n4 = u3 + s3 | 0, l3 = r4 + n4 | 0, r4 = n4; (r4 | 0) != (l3 | 0); ) c2[r4 >> 2] = 0, c2[r4 + 4 >> 2] = 0, r4 = r4 + 8 | 0;
                  if (s3 = n4, n4 = c2[e5 >> 2], r4 = c2[e5 + 4 >> 2] - n4 | 0, s3 = s3 - r4 | 0, r4 && p(s3, n4, r4), c2[e5 + 4 >> 2] = l3, c2[e5 >> 2] = s3, c2[e5 + 8 >> 2] = u3 + (a4 << 3), !n4) break c;
                  ma(n4);
                  return;
                }
                if (n4 >>> 0 >= l3 >>> 0) break c;
                c2[e5 + 4 >> 2] = a4 + (n4 << 3);
              }
              return;
            }
            za(), o();
          }
          Wa(), o();
        }
        function Wb(e5, n4, r4, a4, s3) {
          var c3 = 0, u3 = 0, d3 = 0;
          a: {
            b: {
              c: {
                if ((a4 | 0) < 0) break c;
                if ((r4 | 0) <= (a4 | 0)) break a;
                if (u3 = 0 - (s3 ^ 1) | 0, s3 = a4 & 7, s3) {
                  if (c3 = a4 >>> 3 | 0, c3 >>> 0 >= n4 >>> 0) break c;
                  if (s3 = (l2[e5 + c3 | 0] ^ u3) & 255 >>> s3, s3) break b;
                  a4 = a4 + 7 | 0;
                }
                for (s3 = a4 >>> 3 | 0, d3 = r4 + 7 >>> 3 | 0; ; ) {
                  if (a4 = s3, s3 = a4 + 4 | 0, d3 >>> 0 < s3 >>> 0) for (s3 = u3 & 255; ; ) {
                    if (a4 >>> 0 >= d3 >>> 0) break a;
                    if (n4 >>> 0 <= a4 >>> 0) break c;
                    if (c3 = l2[e5 + a4 | 0], (c3 | 0) != (s3 | 0)) return e5 = _2((c3 ^ u3) << 24) | a4 << 3, (e5 | 0) > (r4 | 0) ? r4 : e5;
                    a4 = a4 + 1 | 0;
                  }
                  if (n4 >>> 0 < a4 >>> 0 | n4 - a4 >>> 0 <= 3) break c;
                  if (c3 = e5 + a4 | 0, c3 = l2[c3 | 0] | l2[c3 + 1 | 0] << 8 | (l2[c3 + 2 | 0] << 16 | l2[c3 + 3 | 0] << 24), c3 = ((Ae(c3, 16) ^ c3) & -16711936) >>> 8 ^ Ae(c3, 8), (c3 | 0) != (u3 | 0)) break;
                }
                return e5 = _2(c3 ^ u3) + (a4 << 3) | 0, (e5 | 0) > (r4 | 0) ? r4 : e5;
              }
              o();
            }
            r4 = _2(s3 << 24) | a4 & 2147483640;
          }
          return r4;
        }
        function gb(e5, n4, r4, s3, c3) {
          var u3 = 0, d3 = 0, f3 = 0;
          a: {
            if (s3 = (s3 | 0) > 0 ? s3 : 0, u3 = (c3 | 0) >= 0 ? (r4 | 0) < (c3 | 0) ? r4 : c3 : 0, (s3 | 0) >= (u3 | 0)) break a;
            b: {
              if (f3 = s3 >>> 3 | 0, f3 >>> 0 >= n4 >>> 0) break b;
              if (c3 = s3 & 7, r4 = e5 + f3 | 0, d3 = u3 - 1 | 0, u3 = d3 >>> 3 | 0, (u3 | 0) == (f3 | 0)) for (e5 = d3 & 7; ; ) {
                if (e5 >>> 0 < c3 >>> 0) break a;
                a3[r4 | 0] = l2[r4 | 0] + (-128 >> c3), c3 = c3 + 1 | 0;
              }
              for (s3 = l2[r4 | 0]; ; ) if ((c3 | 0) == 8) {
                if (a3[r4 | 0] = s3, n4 >>> 0 <= u3 >>> 0) break b;
                for (s3 = (d3 & 7) + 1 | 0, d3 = e5 + u3 | 0, r4 = l2[d3 | 0], c3 = 0; ; ) if ((s3 | 0) == (c3 | 0)) {
                  if (a3[d3 | 0] = r4, r4 = f3 + 1 | 0, r4 >>> 0 >= u3 >>> 0) break a;
                  if (c3 = u3 + (f3 ^ -1) | 0, c3 >>> 0 > n4 - r4 >>> 0) break b;
                  for (r4 = e5 + r4 | 0; ; ) {
                    if ((c3 | 0) <= 0) break a;
                    a3[r4 | 0] = 0, c3 = c3 - 1 | 0, r4 = r4 + 1 | 0;
                  }
                } else {
                  r4 = (-128 >> c3) + r4 | 0, c3 = c3 + 1 | 0;
                  continue;
                }
              } else {
                s3 = (-128 >> c3) + s3 | 0, c3 = c3 + 1 | 0;
                continue;
              }
            }
            o();
          }
        }
        function zb(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0;
          a: {
            b: {
              r4 = c2[e5 + 4 >> 2], a4 = c2[e5 >> 2], s3 = r4 - a4 | 0, l3 = s3 >> 2;
              c: {
                if (l3 >>> 0 < n4 >>> 0) {
                  if (a4 = c2[e5 + 8 >> 2] - a4 | 0, a4 >> 2 >>> 0 >= n4 >>> 0) {
                    for (n4 = (n4 - l3 << 2) + r4 | 0; (n4 | 0) != (r4 | 0); ) c2[r4 >> 2] = 0, r4 = r4 + 4 | 0;
                    c2[e5 + 4 >> 2] = n4;
                    return;
                  }
                  if (n4 >>> 0 >= 1073741824) break b;
                  if (r4 = a4 >> 1, a4 = a4 >>> 0 >= 2147483644 ? 1073741823 : n4 >>> 0 < r4 >>> 0 ? r4 : n4, a4 >>> 0 >= 1073741824) break a;
                  for (r4 = n4 - l3 << 2, u3 = na(a4 << 2), n4 = u3 + s3 | 0, l3 = r4 + n4 | 0, r4 = n4; (r4 | 0) != (l3 | 0); ) c2[r4 >> 2] = 0, r4 = r4 + 4 | 0;
                  if (s3 = n4, n4 = c2[e5 >> 2], r4 = c2[e5 + 4 >> 2] - n4 | 0, s3 = s3 - r4 | 0, r4 && p(s3, n4, r4), c2[e5 + 4 >> 2] = l3, c2[e5 >> 2] = s3, c2[e5 + 8 >> 2] = u3 + (a4 << 2), !n4) break c;
                  ma(n4);
                  return;
                }
                if (n4 >>> 0 >= l3 >>> 0) break c;
                c2[e5 + 4 >> 2] = a4 + (n4 << 2);
              }
              return;
            }
            za(), o();
          }
          Wa(), o();
        }
        function ka(e5, n4) {
          var r4 = 0, s3 = 0, d3 = 0, f3 = 0;
          if (r4 = l2[n4 + 1 | 0], r4 >>> 0 < 47) {
            r4 = h2(r4, 6), d3 = u2[r4 + 1808 >> 1], s3 = c2[e5 + 8 >> 2] - d3 | 0, c2[e5 + 8 >> 2] = s3, r4 = r4 + 1808 | 0, f3 = c2[e5 + 4 >> 2];
            a: {
              if (s3 >>> 0 > f3 >>> 16 >>> 0) {
                if (s3 & 32768) return l2[n4 | 0];
                if (s3 >>> 0 < d3 >>> 0) {
                  s3 = l2[n4 | 0] ^ 1, d3 = l2[r4 + 3 | 0], l2[r4 + 4 | 0] == 1 && (a3[n4 | 0] = s3 & 1), a3[n4 + 1 | 0] = d3, n4 = s3 & 1;
                  break a;
                }
                a3[n4 + 1 | 0] = l2[r4 + 2 | 0], n4 = l2[n4 | 0];
                break a;
              }
              c2[e5 + 4 >> 2] = f3 - (s3 << 16);
              b: {
                if (s3 >>> 0 < d3 >>> 0) {
                  a3[n4 + 1 | 0] = l2[r4 + 2 | 0], n4 = l2[n4 | 0];
                  break b;
                }
                s3 = l2[n4 | 0] ^ 1, f3 = l2[r4 + 3 | 0], l2[r4 + 4 | 0] == 1 && (a3[n4 | 0] = s3 & 1), a3[n4 + 1 | 0] = f3, n4 = s3 & 1;
              }
              c2[e5 + 8 >> 2] = d3;
            }
            for (r4 = c2[e5 + 12 >> 2]; r4 ||= (Ec(e5), c2[e5 + 12 >> 2]), r4 = r4 - 1 | 0, c2[e5 + 12 >> 2] = r4, s3 = c2[e5 + 8 >> 2], c2[e5 + 8 >> 2] = s3 << 1, c2[e5 + 4 >> 2] = c2[e5 + 4 >> 2] << 1, !(s3 & 16384); ) ;
            return n4;
          }
          o();
        }
        function tc(e5, n4, r4) {
          var u3 = 0, d3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0;
          d3 = M - 32 | 0, M = d3, s2[e5 >> 1] = 0, t(e5 + 4 | 0, 0, 92), c2[d3 + 28 >> 2] = 0, c2[d3 + 20 >> 2] = 0, c2[d3 + 24 >> 2] = 0;
          a: {
            b: {
              if (u3 = r4 + 2 | 0, u3) {
                if (u3 >>> 0 >= 536870912) break b;
                for (u3 <<= 3, f3 = na(u3), c2[d3 + 20 >> 2] = f3, h3 = u3 + f3 | 0, c2[d3 + 28 >> 2] = h3, u3 = f3; (u3 | 0) != (h3 | 0); ) c2[u3 >> 2] = 0, c2[u3 + 4 >> 2] = 0, u3 = u3 + 8 | 0;
                c2[d3 + 24 >> 2] = h3;
              }
              for (_3 = n4 + r4 | 0, u3 = 0; ; ) {
                if ((n4 | 0) == (_3 | 0)) break a;
                v3 = l2[n4 | 0], g3 = (u3 << 3) + f3 | 0, c2[g3 + 4 >> 2] = u3, a3[g3 + 1 | 0] = 0, a3[g3 | 0] = v3, n4 = n4 + 1 | 0, u3 = u3 + 1 | 0;
              }
            }
            za(), o();
          }
          return n4 = (r4 << 3) + f3 | 0, c2[n4 + 4 >> 2] = 0, s2[n4 >> 1] = 0, c2[n4 + 12 >> 2] = 0, s2[n4 + 8 >> 1] = 0, c2[d3 + 16 >> 2] = h3 - f3 >> 3, c2[d3 + 12 >> 2] = f3, a3[d3 + 8 | 0] = 0, y3 = e5, b3 = gd(e5, d3 + 8 | 0), a3[y3 | 0] = b3, va(d3 + 20 | 0), M = d3 + 32 | 0, e5;
        }
        function _d(e5, n4, r4, u3, d3) {
          e5 |= 0, n4 |= 0, r4 |= 0, u3 |= 0, d3 |= 0;
          a: {
            if (Pa(e5, c2[n4 + 8 >> 2], d3)) {
              if (c2[n4 + 28 >> 2] == 1 | c2[n4 + 4 >> 2] != (r4 | 0)) break a;
              c2[n4 + 28 >> 2] = u3;
              return;
            }
            if (Pa(e5, c2[n4 >> 2], d3)) {
              if (!(c2[n4 + 16 >> 2] != (r4 | 0) & c2[n4 + 20 >> 2] != (r4 | 0))) {
                if ((u3 | 0) != 1) break a;
                c2[n4 + 32 >> 2] = 1;
                return;
              }
              c2[n4 + 32 >> 2] = u3;
              b: {
                if (c2[n4 + 44 >> 2] == 4) break b;
                if (s2[n4 + 52 >> 1] = 0, e5 = c2[e5 + 8 >> 2], P[c2[c2[e5 >> 2] + 20 >> 2]](e5, n4, r4, r4, 1, d3), l2[n4 + 53 | 0] == 1) {
                  if (c2[n4 + 44 >> 2] = 3, !l2[n4 + 52 | 0]) break b;
                  break a;
                }
                c2[n4 + 44 >> 2] = 4;
              }
              if (c2[n4 + 20 >> 2] = r4, c2[n4 + 40 >> 2] = c2[n4 + 40 >> 2] + 1, c2[n4 + 36 >> 2] != 1 | c2[n4 + 24 >> 2] != 2) break a;
              a3[n4 + 54 | 0] = 1;
              return;
            }
            e5 = c2[e5 + 8 >> 2], P[c2[c2[e5 >> 2] + 24 >> 2]](e5, n4, r4, u3, d3);
          }
        }
        function Yb(e5, n4, r4, u3, d3, f3) {
          var g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0;
          x3 = ((d3 & 536870911) << 3 | u3 >>> 29) & -8;
          a: {
            b: {
              c: for (; ; ) {
                d: {
                  if (r4 >>> 0 <= g3 >>> 0) break d;
                  if (y3 = l2[n4 + g3 | 0], (y3 | 0) == 255 || (_3 = c2[f3 >> 2], _3 >>> 0 >= x3 >>> 0)) break b;
                  if (v3 = _3 >>> 3 | 0, v3 >>> 0 >= d3 >>> 0) break d;
                  for (v3 = l2[u3 + v3 | 0], c2[f3 >> 2] = _3 + 1, b3 = b3 << 1 | (v3 << (_3 & 7) & 128) >>> 7, g3 = g3 + 1 | 0, _3 = g3 + h2(y3, 3) | 0; ; ) {
                    if ((g3 | 0) >= (_3 | 0)) continue c;
                    if (r4 >>> 0 <= g3 >>> 0) break d;
                    if (l2[n4 + g3 | 0] == (b3 | 0)) {
                      if (u3 = g3 + 1 | 0, u3 >>> 0 >= r4 >>> 0 || (d3 = r4, r4 = g3 + 2 | 0, d3 >>> 0 <= r4 >>> 0)) break d;
                      s2[e5 >> 1] = l2[n4 + u3 | 0] | l2[n4 + r4 | 0] << 8, n4 = 1;
                      break a;
                    }
                    g3 = g3 + 3 | 0;
                  }
                }
                break;
              }
              o();
            }
            a3[e5 | 0] = 0, n4 = 0;
          }
          a3[e5 + 2 | 0] = n4;
        }
        function Wc(e5, n4, r4, a4, s3, l3, u3) {
          c2[e5 + 8 >> 2] = 0;
          a: {
            b: {
              if (!(n4 & 255)) {
                c: switch (r4 | 0) {
                  case 1:
                    c2[e5 + 4 >> 2] = s3, c2[e5 >> 2] = a4, c2[e5 + 8 >> 2] = l3 - 1;
                    return;
                  case 3:
                    c2[e5 + 4 >> 2] = s3;
                    break a;
                  case 0:
                    c2[e5 >> 2] = a4, c2[e5 + 8 >> 2] = l3 - 1, c2[e5 + 4 >> 2] = (s3 - u3 | 0) + 1;
                    return;
                  case 2:
                    break c;
                  default:
                    break b;
                }
                c2[e5 + 4 >> 2] = (s3 - u3 | 0) + 1;
                break a;
              }
              d: switch (r4 | 0) {
                case 1:
                  c2[e5 + 4 >> 2] = a4, c2[e5 >> 2] = s3, c2[e5 + 8 >> 2] = u3 - 1;
                  return;
                case 3:
                  c2[e5 + 4 >> 2] = a4, c2[e5 + 8 >> 2] = u3 - 1, c2[e5 >> 2] = (s3 - l3 | 0) + 1;
                  return;
                case 0:
                  c2[e5 >> 2] = s3, c2[e5 + 4 >> 2] = (a4 - u3 | 0) + 1;
                  return;
                case 2:
                  break d;
                default:
                  break b;
              }
              c2[e5 + 4 >> 2] = (a4 - u3 | 0) + 1, c2[e5 >> 2] = (s3 - l3 | 0) + 1;
            }
            return;
          }
          c2[e5 >> 2] = (a4 - l3 | 0) + 1;
        }
        function fb(e5, n4) {
          var r4 = 0, s3 = 0, l3 = 0, u3 = 0, d3 = 0, f3 = 0;
          a: {
            if (r4 = c2[e5 + 4 >> 2], s3 = c2[e5 >> 2], l3 = r4 - s3 | 0, u3 = l3 >> 1, u3 >>> 0 < n4 >>> 0) {
              if (d3 = c2[e5 + 8 >> 2], d3 - s3 >> 1 >>> 0 >= n4 >>> 0) {
                for (n4 = (n4 - u3 << 1) + r4 | 0; (n4 | 0) != (r4 | 0); ) a3[r4 | 0] = 0, a3[r4 + 1 | 0] = 0, r4 = r4 + 2 | 0;
                c2[e5 + 4 >> 2] = n4;
                return;
              }
              for (s3 = Cc(s3, d3, n4), s3 && (f3 = Bc(s3)), r4 = n4 - u3 << 1, n4 = l3 + f3 | 0, u3 = r4 + n4 | 0, r4 = n4; (r4 | 0) != (u3 | 0); ) a3[r4 | 0] = 0, a3[r4 + 1 | 0] = 0, r4 = r4 + 2 | 0;
              if (l3 = n4, n4 = c2[e5 >> 2], r4 = c2[e5 + 4 >> 2] - n4 | 0, l3 = l3 - r4 | 0, r4 && p(l3, n4, r4), c2[e5 + 4 >> 2] = u3, c2[e5 >> 2] = l3, c2[e5 + 8 >> 2] = (s3 << 1) + f3, !n4) break a;
              ma(n4);
              return;
            }
            if (n4 >>> 0 >= u3 >>> 0) break a;
            c2[e5 + 4 >> 2] = s3 + (n4 << 1);
          }
        }
        function sd(e5, n4, r4) {
          var a4 = 0, s3 = 0;
          a4 = M - 32 | 0, M = a4, c2[e5 + 24 >> 2] = 0, c2[e5 + 28 >> 2] = 0, c2[e5 + 16 >> 2] = 0, c2[e5 + 20 >> 2] = 0, c2[e5 + 8 >> 2] = 0, c2[e5 + 12 >> 2] = 0, c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0;
          a: {
            b: {
              if (n4 - 2147483617 >>> 0 < 2147483680 | (r4 | 0) <= 0 || (s3 = n4 + 31 & 2147483616, 2147483616 / (s3 >>> 0) >>> 0 < r4 >>> 0)) break b;
              if (c2[e5 + 24 >> 2] = r4, c2[e5 + 20 >> 2] = n4, n4 = s3 >>> 3 | 0, c2[e5 + 28 >> 2] = n4, n4 = ze(r4, 0, n4, 0), N) break a;
              n4 = Gb(a4, n4), r4 = c2[n4 >> 2], c2[a4 + 12 >> 2] = r4, s3 = c2[n4 + 4 >> 2], c2[a4 + 16 >> 2] = s3, c2[a4 + 20 >> 2] = c2[n4 + 8 >> 2], c2[n4 + 8 >> 2] = 0, c2[n4 >> 2] = 0, c2[n4 + 4 >> 2] = 0, c2[a4 + 28 >> 2] = s3 - r4, c2[a4 + 24 >> 2] = r4, r4 = a4 + 12 | 0, ec(e5, r4), va(r4), va(n4);
            }
            return M = a4 + 32 | 0, e5;
          }
          o();
        }
        function Fa(e5, n4, r4) {
          var a4 = 0, s3 = 0, u3 = 0, f3 = 0;
          s3 = -1, f3 = c2[e5 >> 2];
          a: {
            if (u3 = c2[e5 + 8 >> 2], a4 = c2[e5 + 4 >> 2], u3 >>> 0 >= a4 >>> 0) break a;
            b: {
              if ((a4 | 0) == 536870912 | a4 >>> 0 > 536870912) break b;
              if (u3 = c2[e5 + 12 >> 2] + (u3 << 3) | 0, u3 >>> 0 > (((a4 & 536870911) << 3 | f3 >>> 29) & -8) >>> 0) break a;
              if (c2[r4 >> 2] = 0, f3 = c2[e5 >> 2], a4 = c2[e5 + 4 >> 2], (a4 | 0) == 536870912 | a4 >>> 0 > 536870912) break b;
              for (a4 = ((a4 & 536870911) << 3 | f3 >>> 29) & -8, s3 = a4 >>> 0 < n4 + u3 >>> 0 ? a4 - u3 | 0 : n4; ; ) {
                if (!s3) {
                  s3 = 0;
                  break a;
                }
                if (n4 = c2[e5 + 8 >> 2], n4 >>> 0 >= d2[e5 + 4 >> 2]) break b;
                c2[r4 >> 2] = l2[n4 + c2[e5 >> 2] | 0] >>> 7 - c2[e5 + 12 >> 2] & 1 | c2[r4 >> 2] << 1, Tb(e5), s3 = s3 - 1 | 0;
              }
            }
            o();
          }
          return s3;
        }
        function Aa(e5, n4, r4) {
          var s3 = 0, u3 = 0, d3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0;
          for (d3 = M - 16 | 0, M = d3, g3 = ka(n4, c2[e5 >> 2] + 2 | 0), s3 = g3 | 2; ; ) {
            a: {
              if ((u3 | 0) == 5) {
                u3 = 5;
                break a;
              }
              if (s3 <<= 1, f3 = ka(n4, s3 + c2[e5 >> 2] | 0), s3 |= f3, !f3) break a;
              u3 = u3 + 1 | 0;
              continue;
            }
            break;
          }
          for (f3 = 0, u3 <<= 3, h3 = c2[u3 + 2092 >> 2], h3 = (h3 | 0) > 0 ? h3 : 0, v3 = u3 + 2092 | 0, u3 = 0; (u3 | 0) != (h3 | 0); ) s3 <<= 1, _3 = ka(n4, s3 + c2[e5 >> 2] | 0), s3 = _3 | s3, s3 = (s3 | 0) > 255 ? s3 & 255 | 256 : s3, f3 = f3 << 1 | _3, u3 = u3 + 1 | 0;
          return a3[d3 + 8 | 0] = 1, c2[d3 + 12 >> 2] = c2[v3 + 4 >> 2], u3 = 0, s3 = 0, l2[La(d3 + 8 | 0, f3) | 0] && (e5 = c2[d3 + 12 >> 2], n4 = e5 >> 31, u3 = g3 ? n4 - (e5 ^ n4) | 0 : e5, s3 = !g3 | !!(u3 | 0)), c2[r4 >> 2] = u3, M = d3 + 16 | 0, s3;
        }
        function zc(e5, n4, r4, s3, l3) {
          var u3 = 0, d3 = 0;
          for (c2[e5 >> 2] = 0, u3 = na(24), c2[u3 + 8 >> 2] = 0, c2[u3 + 12 >> 2] = 0, d3 = n4, n4 = (r4 | 0) == 268435456 | r4 >>> 0 < 268435456, c2[u3 >> 2] = n4 ? d3 : 0, c2[u3 + 4 >> 2] = n4 ? r4 : 0, c2[u3 + 16 >> 2] = 0, c2[u3 + 20 >> 2] = 0, c2[e5 + 8 >> 2] = 0, c2[e5 + 12 >> 2] = 0, c2[e5 + 4 >> 2] = u3, c2[e5 + 16 >> 2] = 0, c2[e5 + 20 >> 2] = 0, c2[e5 + 24 >> 2] = 0, c2[e5 + 28 >> 2] = 0, c2[e5 + 32 >> 2] = 0, r4 = na(64), c2[e5 + 36 >> 2] = r4, n4 = r4 - -64 | 0, c2[e5 + 44 >> 2] = n4, u3 = 0; (u3 | 0) != 64; ) c2[r4 + u3 >> 2] = 0, u3 = u3 + 4 | 0;
          return c2[e5 + 52 >> 2] = 10, a3[e5 + 49 | 0] = 0, a3[e5 + 50 | 0] = 0, a3[e5 + 48 | 0] = l3, c2[e5 + 40 >> 2] = n4, t(e5 + 56 | 0, 0, 49), a3[e5 + 112 | 0] = 0, c2[e5 + 108 >> 2] = s3, e5;
        }
        function Ob(e5, n4) {
          var r4 = 0, l3 = 0, u3 = 0, d3 = 0;
          u3 = M - 16 | 0, M = u3, r4 = 4;
          a: {
            b: {
              if (c2[e5 + 4 >> 2] - 1 >>> 0 > 65534 | c2[e5 + 8 >> 2] - 1 >>> 0 >= 65535) break b;
              if (c2[e5 + 52 >> 2] = 2, d3 = c2[n4 >> 2], l3 = c2[d3 >> 2], l3 ||= (r4 = ua(e5 + 4 | 0, e5 + 8 | 0), c2[u3 + 12 >> 2] = 0, oa(d3, r4), la(u3 + 12 | 0), c2[d3 >> 2]), r4 = c2[l3 + 16 >> 2], !r4) {
                oa(d3, 0), r4 = -1;
                break b;
              }
              for (l3 = c2[l3 + 12 >> 2]; (r4 | 0) > 0; ) a3[l3 | 0] = 0, r4 = r4 - 1 | 0, l3 = l3 + 1 | 0;
              c2[e5 + 60 >> 2] = 0, s2[e5 + 56 >> 1] = 1, c2[e5 + 24 >> 2] = 0, c2[e5 + 28 >> 2] = 0, c2[e5 + 32 >> 2] = 0, c2[e5 + 36 >> 2] = 0, c2[e5 + 40 >> 2] = 0, c2[e5 + 44 >> 2] = 0, c2[e5 + 48 >> 2] = 0, r4 = nd(e5, n4);
              break a;
            }
            c2[e5 + 52 >> 2] = r4;
          }
          return M = u3 + 16 | 0, r4;
        }
        function _c(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0, d3 = 0, f3 = 0;
          a: {
            r4 = c2[e5 + 4 >> 2], a4 = c2[e5 + 8 >> 2];
            b: {
              if (r4 >>> 0 < a4 >>> 0) {
                s3 = c2[n4 >> 2], c2[n4 >> 2] = 0, c2[r4 >> 2] = s3, n4 = r4 + 4 | 0;
                break b;
              }
              if (l3 = c2[e5 >> 2], s3 = r4 - l3 | 0, d3 = s3 >> 2, r4 = d3 + 1 | 0, r4 >>> 0 >= 1073741824) break a;
              a4 = a4 - l3 | 0, u3 = a4 >> 1, u3 = a4 >>> 0 >= 2147483644 ? 1073741823 : r4 >>> 0 < u3 >>> 0 ? u3 : r4;
              c: {
                if (!u3) {
                  r4 = s3, a4 = 0;
                  break c;
                }
                a4 = Fb(u3), l3 = c2[e5 >> 2], r4 = c2[e5 + 4 >> 2] - l3 | 0, d3 = r4 >> 2;
              }
              if (f3 = c2[n4 >> 2], c2[n4 >> 2] = 0, n4 = a4 + s3 | 0, c2[n4 >> 2] = f3, s3 = n4 - (d3 << 2) | 0, r4 && p(s3, l3, r4), c2[e5 + 8 >> 2] = (u3 << 2) + a4, n4 = n4 + 4 | 0, c2[e5 + 4 >> 2] = n4, c2[e5 >> 2] = s3, !l3) break b;
              ma(l3);
            }
            c2[e5 + 4 >> 2] = n4;
            return;
          }
          za(), o();
        }
        function rb(e5, n4) {
          var r4 = 0;
          if (r4 = c2[e5 >> 2], c2[e5 >> 2] = n4, r4) {
            if (Vb(r4 + 80 | 0), ta(r4 + 76 | 0), ta(r4 + 72 | 0), Ha(r4 + 60 | 0), n4 = c2[r4 + 36 >> 2], n4) {
              for (e5 = c2[r4 + 40 >> 2]; (e5 | 0) != (n4 | 0); ) e5 = pa(e5 - 4 | 0);
              c2[r4 + 40 >> 2] = n4, ma(c2[r4 + 36 >> 2]);
            }
            if (la(r4 + 32 | 0), n4 = c2[r4 + 20 >> 2], n4) {
              for (e5 = c2[r4 + 24 >> 2]; (e5 | 0) != (n4 | 0); ) e5 = Ub(e5 - 4 | 0);
              c2[r4 + 24 >> 2] = n4, ma(c2[r4 + 20 >> 2]);
            }
            if (n4 = c2[r4 + 8 >> 2], n4) {
              for (e5 = c2[r4 + 12 >> 2]; (e5 | 0) != (n4 | 0); ) e5 = Vb(e5 - 4 | 0);
              c2[r4 + 12 >> 2] = n4, ma(c2[r4 + 8 >> 2]);
            }
            e5 = c2[r4 + 4 >> 2], c2[r4 + 4 >> 2] = 0, e5 && ma(e5), ma(sb(r4));
          }
        }
        function xd(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0, d3 = 0, f3 = 0;
          a4 = M - 16 | 0, M = a4;
          a: {
            s3 = c2[e5 + 4 >> 2];
            b: {
              if (s3 >>> 0 > n4 >>> 0) break b;
              if (r4 = s3, c2[e5 + 8 >> 2] << 5 >>> 0 < n4 >>> 0) {
                if ((n4 | 0) < 0) break a;
                l3 = (n4 - 1 >>> 5 | 0) + 1 | 0, u3 = na(l3 << 2), d3 = c2[e5 >> 2], r4 = c2[e5 + 4 >> 2], f3 = r4 ? (r4 - 1 >>> 3 & 536870908) + 4 | 0 : 0, f3 && p(u3, d3, f3), c2[e5 >> 2] = u3, c2[a4 + 4 >> 2] = d3, c2[e5 + 4 >> 2] = r4, c2[a4 + 8 >> 2] = r4, r4 = c2[e5 + 8 >> 2], c2[e5 + 8 >> 2] = l3, c2[a4 + 12 >> 2] = r4, lc(a4 + 4 | 0), r4 = c2[e5 + 4 >> 2];
              }
              if ((n4 | 0) == (s3 | 0)) break b;
              $c(c2[e5 >> 2] + (r4 >>> 3 & 536870908) | 0, r4 & 31, n4 - s3 | 0);
            }
            c2[e5 + 4 >> 2] = n4, M = a4 + 16 | 0;
            return;
          }
          za(), o();
        }
        function Hc(e5, n4, r4, a4, s3, c3) {
          var f3 = 0, h3 = 0, g3 = 0, _3 = 0, v3 = 0, y3 = 0, b3 = 0, x3 = 0, S3 = 0;
          for (h3 = M - 16 | 0, M = h3, y3 = ((n4 & 536870911) << 3 | e5 >>> 29) & -8, _3 = 1; ; ) {
            a: {
              if (d2[r4 >> 2] >= y3 >>> 0) break a;
              for (v3 = _3 & 1, x3 = v3 ? 325 : 326, S3 = v3 ? 1056 : 1392, g3 = 0; ; ) {
                if (Yb(h3 + 12 | 0, S3, x3, e5, n4, r4), !l2[h3 + 14 | 0]) {
                  for (; ; ) {
                    if (d2[r4 >> 2] >= y3 >>> 0) break a;
                    if (Ia(e5, n4, r4)) break;
                  }
                  break a;
                }
                if (f3 = u2[h3 + 12 >> 1], g3 = f3 + g3 | 0, (g3 | 0) > (c3 | 0)) break a;
                if (!(f3 >>> 0 >= 64)) break;
              }
              if (f3 = g3 + b3 | 0, v3 || gb(a4, s3, c3, b3, f3), _3 ^= 1, b3 = f3, (c3 | 0) > (f3 | 0)) continue;
            }
            break;
          }
          M = h3 + 16 | 0;
        }
        function te(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0;
          if (s3 = c2[c2[n4 >> 2] >> 2], c2[e5 + 48 >> 2] || (r4 = c2[s3 + 16 >> 2], c2[e5 + 44 >> 2] = c2[s3 + 12 >> 2], c2[e5 + 48 >> 2] = r4), r4 = c2[e5 + 4 >> 2], r4) for (r4 = r4 - 1 | 0, l3 = r4 >>> 3 | 0, u3 = (r4 & 7) + 1 | 0, r4 = c2[e5 + 24 >> 2]; ; ) {
            a: {
              if (d2[e5 + 8 >> 2] <= r4 >>> 0) n4 = 4;
              else {
                if (!jc(e5, n4, 2204, l3, u3)) return -1;
                if (Db(e5, s3), a4 = c2[n4 + 16 >> 2], r4 = c2[e5 + 24 >> 2], !a4 | (r4 >>> 0) % 50 || (a4 = P[c2[c2[a4 >> 2] + 8 >> 2]](a4) | 0, r4 = c2[e5 + 24 >> 2], !a4)) break a;
                c2[e5 + 24 >> 2] = r4 + 1, n4 = 3;
              }
              return c2[e5 + 52 >> 2] = n4, n4 | 0;
            }
            r4 = r4 + 1 | 0, c2[e5 + 24 >> 2] = r4;
          }
          o();
        }
        function xe(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0;
          if (a4 = c2[c2[n4 >> 2] >> 2], c2[e5 + 48 >> 2] || (r4 = c2[a4 + 16 >> 2], c2[e5 + 44 >> 2] = c2[a4 + 12 >> 2], c2[e5 + 48 >> 2] = r4), r4 = c2[e5 + 4 >> 2], r4) for (s3 = c2[e5 + 8 >> 2] & 2147483647, r4 = r4 - 1 | 0, l3 = r4 >>> 3 | 0, u3 = (r4 & 7) + 1 | 0, r4 = c2[e5 + 24 >> 2]; ; ) {
            a: {
              if (r4 >>> 0 >= s3 >>> 0) n4 = 4;
              else {
                if (!jc(e5, n4, 2140, l3, u3)) return -1;
                if (Db(e5, a4), r4 = c2[n4 + 16 >> 2], !r4 || !(P[c2[c2[r4 >> 2] + 8 >> 2]](r4) | 0)) break a;
                c2[e5 + 24 >> 2] = c2[e5 + 24 >> 2] + 1, n4 = 3;
              }
              return c2[e5 + 52 >> 2] = n4, n4 | 0;
            }
            r4 = c2[e5 + 24 >> 2] + 1 | 0, c2[e5 + 24 >> 2] = r4;
          }
          o();
        }
        function Xd(e5, n4, r4) {
          e5 |= 0, n4 |= 0, r4 |= 0;
          var a4 = 0, s3 = 0;
          if (c2[n4 + 4 >> 2] == 5252) {
            n4 = c2[e5 + 12 >> 2];
            a: {
              if (n4 && (e5 = 5240, tb(n4, 5128))) break a;
              e5 = 5248;
            }
            return c2[r4 >> 2] = e5, 1;
          }
          s3 = c2[e5 + 8 >> 2];
          b: {
            c: {
              if (!(s3 & 24)) {
                if (a4 = tb(n4, 5080), !a4 || (r4 = 1, !Pa(e5, n4, !!(c2[a4 + 8 >> 2] & 24)))) break c;
                break b;
              }
              if (r4 = 1, Pa(e5, n4, 1)) break b;
            }
            if (r4 = 0, n4 = tb(n4, 5180), !n4 || (a4 = c2[n4 + 8 >> 2], a4 & (s3 ^ -1) & 7 | (a4 ^ -1) & s3 & 96 | c2[c2[e5 + 12 >> 2] + 4 >> 2] != c2[c2[n4 + 12 >> 2] + 4 >> 2])) break b;
            r4 = c2[c2[e5 + 16 >> 2] + 4 >> 2] == c2[c2[n4 + 16 >> 2] + 4 >> 2];
          }
          return r4 | 0;
        }
        function za() {
          var e5 = 0, n4 = 0, r4 = 0, a4 = 0;
          r4 = vb(8), c2[r4 >> 2] = 5476, e5 = 4523, n4 = 0;
          a: {
            if (!l2[4523]) break a;
            b: {
              c: {
                for (; ; ) {
                  if (e5 = e5 + 1 | 0, !(e5 & 3)) break c;
                  if (!l2[e5 | 0]) break;
                }
                break b;
              }
              for (; n4 = e5, e5 = e5 + 4 | 0, a4 = c2[n4 >> 2], ((16843008 - a4 | a4) & -2139062144) == -2139062144; ) ;
              for (; e5 = n4, n4 = e5 + 1 | 0, l2[e5 | 0]; ) ;
            }
            n4 = e5 - 4523 | 0;
          }
          e5 = na(n4 + 13 | 0), c2[e5 + 8 >> 2] = 0, c2[e5 + 4 >> 2] = n4, c2[e5 >> 2] = n4, e5 = e5 + 12 | 0, n4 = n4 + 1 | 0, n4 && p(e5, 4523, n4), c2[r4 >> 2] = 5524, c2[r4 + 4 >> 2] = e5, C2(r4 | 0, 5536, 1), o();
        }
        function ve(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0;
          if (a4 = c2[c2[n4 >> 2] >> 2], c2[e5 + 48 >> 2] || (r4 = c2[a4 + 16 >> 2], c2[e5 + 44 >> 2] = c2[a4 + 12 >> 2], c2[e5 + 48 >> 2] = r4), r4 = c2[e5 + 4 >> 2], r4) for (r4 = r4 - 1 | 0, s3 = r4 >>> 3 | 0, l3 = (r4 & 7) + 1 | 0, r4 = c2[e5 + 24 >> 2]; ; ) {
            a: {
              if (d2[e5 + 8 >> 2] <= r4 >>> 0) n4 = 4;
              else {
                if (!jc(e5, n4, 2172, s3, l3)) return -1;
                if (Db(e5, a4), r4 = c2[n4 + 16 >> 2], !r4 || !(P[c2[c2[r4 >> 2] + 8 >> 2]](r4) | 0)) break a;
                c2[e5 + 24 >> 2] = c2[e5 + 24 >> 2] + 1, n4 = 3;
              }
              return c2[e5 + 52 >> 2] = n4, n4 | 0;
            }
            r4 = c2[e5 + 24 >> 2] + 1 | 0, c2[e5 + 24 >> 2] = r4;
          }
          o();
        }
        function Ec(e5) {
          var n4 = 0, r4 = 0, s3 = 0, u3 = 0, f3 = 0;
          u3 = 255, n4 = c2[e5 + 16 >> 2];
          a: {
            if (l2[e5 + 1 | 0] == 255) {
              if (f3 = 8, s3 = c2[n4 + 8 >> 2], r4 = s3 + 1 | 0, r4 >>> 0 >= d2[n4 + 4 >> 2] || (r4 = l2[r4 + c2[n4 >> 2] | 0], r4 >>> 0 > 143)) break a;
              Dc(n4), a3[e5 + 1 | 0] = r4, c2[e5 + 4 >> 2] = (c2[e5 + 4 >> 2] - (r4 << 9) | 0) + 65024, n4 = c2[e5 + 16 >> 2], s3 = c2[n4 + 8 >> 2], f3 = 7;
              break a;
            }
            Dc(n4), f3 = 8, n4 = c2[e5 + 16 >> 2], s3 = c2[n4 + 8 >> 2], r4 = c2[n4 >> 2], u3 = d2[n4 + 4 >> 2] > s3 >>> 0 ? l2[r4 + s3 | 0] : u3, a3[e5 + 1 | 0] = u3, c2[e5 + 4 >> 2] = (c2[e5 + 4 >> 2] - (u3 << 8) | 0) + 65280;
          }
          c2[e5 + 12 >> 2] = f3, d2[n4 + 4 >> 2] <= s3 >>> 0 && (a3[e5 | 0] = 1);
        }
        function Jb(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0;
          a: {
            b: {
              if ((e5 | 0) != (n4 | 0)) {
                if (l3 = c2[n4 + 4 >> 2], a4 = c2[n4 >> 2], n4 = l3 - a4 | 0, r4 = c2[e5 >> 2], n4 >>> 0 <= c2[e5 + 8 >> 2] - r4 >>> 0) {
                  if (s3 = c2[e5 + 4 >> 2] - r4 | 0, s3 >>> 0 < n4 >>> 0) {
                    s3 && p(r4, a4, s3), n4 = c2[e5 + 4 >> 2], a4 = a4 + s3 | 0, r4 = l3 - a4 | 0, r4 && p(n4, a4, r4);
                    break a;
                  }
                  n4 && p(r4, a4, n4);
                  break a;
                }
                if (kc(e5), s3 = Cc(c2[e5 >> 2], c2[e5 + 8 >> 2], n4 >> 1), (s3 | 0) < 0) break b;
                r4 = Bc(s3), c2[e5 + 4 >> 2] = r4, c2[e5 >> 2] = r4, c2[e5 + 8 >> 2] = r4 + (s3 << 1), n4 && p(r4, a4, n4), c2[e5 + 4 >> 2] = n4 + r4;
              }
              return e5;
            }
            za(), o();
          }
          return c2[e5 + 4 >> 2] = n4 + r4, e5;
        }
        function Bb(e5, n4, r4, a4) {
          var s3 = 0, l3 = 0, u3 = 0, d3 = 0, f3 = 0;
          l3 = n4 - 1 | 0, u3 = c2[a4 >> 2], s3 = c2[a4 + 4 >> 2];
          a: {
            if ((ia(e5, l3, u3, s3) | 0) != (r4 | 0) || (ia(e5, n4, u3, s3) | 0) != (r4 | 0) || (d3 = n4 + 1 | 0, (ia(e5, d3, u3, s3) | 0) != (r4 | 0)) || (u3 = c2[a4 + 8 >> 2], s3 = c2[a4 + 12 >> 2], (ia(e5, l3, u3, s3) | 0) != (r4 | 0)) || (ia(e5, d3, u3, s3) | 0) != (r4 | 0) || (s3 = l3, l3 = c2[a4 + 16 >> 2], a4 = c2[a4 + 20 >> 2], (ia(e5, s3, l3, a4) | 0) != (r4 | 0)) || (ia(e5, n4, l3, a4) | 0) != (r4 | 0)) break a;
            f3 = (ia(e5, d3, l3, a4) | 0) == (r4 | 0);
          }
          return f3;
        }
        function Rb(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0;
          a: {
            if (r4 = c2[e5 >> 2], a4 = c2[e5 + 4 >> 2] - r4 | 0, s3 = a4 >> 2, s3 >>> 0 < n4 >>> 0) {
              if (l3 = c2[e5 + 8 >> 2], l3 - r4 >> 2 >>> 0 >= n4 >>> 0) {
                qd(e5, n4 - s3 | 0);
                return;
              }
              for (l3 = pd(r4, l3, n4), u3 = Fb(l3), r4 = a4 + u3 | 0, s3 = r4 + (n4 - s3 << 2) | 0, n4 = r4; (n4 | 0) != (s3 | 0); ) c2[n4 >> 2] = 0, n4 = n4 + 4 | 0;
              if (a4 = r4, n4 = c2[e5 >> 2], r4 = c2[e5 + 4 >> 2] - n4 | 0, a4 = a4 - r4 | 0, r4 && p(a4, n4, r4), c2[e5 + 4 >> 2] = s3, c2[e5 >> 2] = a4, c2[e5 + 8 >> 2] = (l3 << 2) + u3, !n4) break a;
              ma(n4);
              return;
            }
            if (n4 >>> 0 >= s3 >>> 0) break a;
            c2[e5 + 4 >> 2] = r4 + (n4 << 2);
          }
        }
        function hd(e5, n4, r4, a4, s3, l3, u3, d3, f3, h3) {
          var g3 = 0, _3 = 0;
          Ea(c2[n4 + 20 >> 2], a4, f3, h3, s3), f3 = c2[e5 + 12 >> 2], h3 = c2[r4 >> 2], n4 = ia(c2[n4 + 20 >> 2], a4 + 2 | 0, u3, d3), c2[r4 + 4 >> 2] = s3, c2[r4 >> 2] = n4 | h3 << 1 & 2, s3 = c2[r4 + 8 >> 2], e5 = c2[e5 + 20 >> 2], n4 = (a4 - f3 | 0) + 2 | 0, g3 = r4, _3 = ia(c2[e5 + 20 >> 2], n4, c2[l3 >> 2], c2[l3 + 4 >> 2]) | s3 << 1 & 2, c2[g3 + 8 >> 2] = _3, a4 = c2[r4 + 12 >> 2], g3 = r4, _3 = ia(c2[e5 + 20 >> 2], n4, c2[l3 + 8 >> 2], c2[l3 + 12 >> 2]) | a4 << 1 & 6, c2[g3 + 12 >> 2] = _3, a4 = c2[r4 + 16 >> 2], g3 = r4, _3 = ia(c2[e5 + 20 >> 2], n4, c2[l3 + 16 >> 2], c2[l3 + 20 >> 2]) | a4 << 1 & 6, c2[g3 + 16 >> 2] = _3;
        }
        function mc(e5) {
          var n4 = 0, r4 = 0, s3 = 0, l3 = 0;
          l3 = M - 16 | 0, M = l3, n4 = na(32), c2[n4 + 8 >> 2] = 0, c2[n4 >> 2] = 0, c2[n4 + 4 >> 2] = 0, r4 = c2[e5 + 4 >> 2], s3 = c2[e5 >> 2], c2[l3 + 8 >> 2] = n4, (r4 | 0) != (s3 | 0) && (Eb(n4, r4 - s3 | 0), Xb(n4, s3, r4)), a3[l3 + 12 | 0] = 1, gc(l3 + 8 | 0), r4 = c2[n4 >> 2], s3 = c2[n4 + 4 >> 2];
          a: {
            if ((r4 | 0) != (s3 | 0)) {
              c2[n4 + 12 >> 2] = r4, c2[n4 + 16 >> 2] = s3 - r4;
              break a;
            }
            r4 = c2[e5 + 16 >> 2], c2[n4 + 12 >> 2] = c2[e5 + 12 >> 2], c2[n4 + 16 >> 2] = r4;
          }
          return c2[n4 + 20 >> 2] = c2[e5 + 20 >> 2], c2[n4 + 24 >> 2] = c2[e5 + 24 >> 2], c2[n4 + 28 >> 2] = c2[e5 + 28 >> 2], M = l3 + 16 | 0, n4;
        }
        function Gc(e5, n4, r4, a4, s3, u3) {
          var d3 = 0, f3 = 0, h3 = 0, g3 = 0, _3 = 0;
          h3 = c2[e5 + 4 >> 2];
          a: {
            b: {
              c: {
                if ((r4 | 0) < 0) {
                  f3 = c2[e5 >> 2], e5 = 1;
                  break c;
                }
                if (d3 = r4 >>> 3 | 0, d3 >>> 0 >= h3 >>> 0) break b;
                f3 = c2[e5 >> 2], e5 = (l2[d3 + f3 | 0] << (r4 & 7) & 128) >>> 7 | 0;
              }
              if (d3 = e5 ^ 1, r4 = Wb(f3, h3, n4, r4 + 1 | 0, d3), c2[s3 >> 2] = r4, (n4 | 0) <= (r4 | 0)) break a;
              d: {
                if ((e5 | 0) == (a4 | 0)) {
                  d3 = e5;
                  break d;
                }
                r4 = Wb(f3, h3, n4, r4 + 1 | 0, e5), c2[s3 >> 2] = r4;
              }
              if ((n4 | 0) <= (r4 | 0)) break a;
              g3 = u3, _3 = Wb(f3, h3, n4, r4 + 1 | 0, d3), c2[g3 >> 2] = _3;
              return;
            }
            o();
          }
          c2[u3 >> 2] = n4, c2[s3 >> 2] = n4;
        }
        function Id(e5, n4) {
          var r4 = 0;
          r4 = c2[n4 + 4 >> 2], c2[e5 >> 2] = c2[n4 >> 2], c2[e5 + 4 >> 2] = r4, r4 = c2[e5 + 8 >> 2], r4 && (c2[e5 + 12 >> 2] = r4, ma(r4), c2[e5 + 16 >> 2] = 0, c2[e5 + 8 >> 2] = 0, c2[e5 + 12 >> 2] = 0), c2[e5 + 8 >> 2] = c2[n4 + 8 >> 2], c2[e5 + 12 >> 2] = c2[n4 + 12 >> 2], c2[e5 + 16 >> 2] = c2[n4 + 16 >> 2], c2[n4 + 16 >> 2] = 0, c2[n4 + 8 >> 2] = 0, c2[n4 + 12 >> 2] = 0, $a(e5 + 20 | 0, n4 + 20 | 0), $a(e5 + 32 | 0, n4 + 32 | 0), c2[e5 + 44 >> 2] = c2[n4 + 44 >> 2], _a(e5 + 48 | 0, n4 + 48 | 0), _a(e5 + 60 | 0, n4 + 60 | 0), _a(e5 + 72 | 0, n4 + 72 | 0), _a(e5 + 84 | 0, n4 + 84 | 0);
        }
        function Wd(e5, n4, r4, s3, l3) {
          e5 |= 0, n4 |= 0, r4 |= 0, s3 |= 0, l3 |= 0;
          a: {
            if (Pa(e5, c2[n4 + 8 >> 2], l3)) {
              if (c2[n4 + 28 >> 2] == 1 | c2[n4 + 4 >> 2] != (r4 | 0)) break a;
              c2[n4 + 28 >> 2] = s3;
              return;
            }
            if (!Pa(e5, c2[n4 >> 2], l3)) break a;
            if (!(c2[n4 + 16 >> 2] != (r4 | 0) & c2[n4 + 20 >> 2] != (r4 | 0))) {
              if ((s3 | 0) != 1) break a;
              c2[n4 + 32 >> 2] = 1;
              return;
            }
            c2[n4 + 20 >> 2] = r4, c2[n4 + 32 >> 2] = s3, c2[n4 + 40 >> 2] = c2[n4 + 40 >> 2] + 1, c2[n4 + 36 >> 2] != 1 | c2[n4 + 24 >> 2] != 2 || (a3[n4 + 54 | 0] = 1), c2[n4 + 44 >> 2] = 4;
          }
        }
        function ae(e5, n4, r4) {
          e5 |= 0, n4 |= 0, r4 |= 0;
          var s3 = 0, l3 = 0;
          s3 = M + -64 | 0, M = s3;
          a: {
            l3 = 1;
            b: {
              if (c2[e5 + 4 >> 2] == c2[n4 + 4 >> 2] || (n4 = tb(n4, 5032), l3 = 0, !n4)) break b;
              if (l3 = c2[r4 >> 2], !l3) break a;
              t(s3 + 8 | 0, 0, 56), a3[s3 + 59 | 0] = 1, c2[s3 + 16 >> 2] = -1, c2[s3 + 12 >> 2] = e5, c2[s3 + 4 >> 2] = n4, c2[s3 + 52 >> 2] = 1, P[c2[c2[n4 >> 2] + 28 >> 2]](n4, s3 + 4 | 0, l3, 1), e5 = c2[s3 + 28 >> 2], (e5 | 0) == 1 && (c2[r4 >> 2] = c2[s3 + 20 >> 2]), l3 = (e5 | 0) == 1;
            }
            return M = s3 - -64 | 0, l3 | 0;
          }
          Sc(), o();
        }
        function wd(e5, n4, r4, a4, s3) {
          var l3 = 0, u3 = 0, d3 = 0, f3 = 0;
          a: {
            if (!a4) break a;
            if (u3 = r4, d3 = n4, s3 & 1) {
              for (l3 | u3 ? (l3 = 32 - u3 | 0, s3 = a4 >>> 0 < l3 >>> 0 ? a4 : l3, c2[d3 >> 2] = c2[d3 >> 2] | -1 << u3 & -1 >>> l3 - s3, d3 = d3 + 4 | 0, s3 = a4 - s3 | 0) : s3 = a4, l3 = s3, f3 = l3 >>> 5 | 0, s3 = f3, u3 = d3; s3; ) c2[u3 >> 2] = -1, s3 = s3 - 1 | 0, u3 = u3 + 4 | 0;
              if (l3 &= 31, !l3) break a;
              s3 = (f3 << 2) + d3 | 0, c2[s3 >> 2] = c2[s3 >> 2] | -1 >>> 32 - l3;
              break a;
            }
            $c(d3, u3, a4);
          }
          c2[e5 >> 2] = n4, c2[e5 + 4 >> 2] = r4, oc(e5, a4);
        }
        function ad(e5, n4, r4, a4) {
          var s3 = 0, u3 = 0;
          s3 = M - 16 | 0, M = s3, dc(s3 + 8 | 0, n4, r4);
          a: {
            b: {
              if (!l2[s3 + 12 | 0] || !((a4 | 0) > 0 & (c2[n4 + 24 >> 2] - r4 | 0) >= (a4 | 0))) {
                c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0;
                break b;
              }
              if (u3 = c2[n4 + 16 >> 2], r4 = c2[s3 + 8 >> 2], u3 >>> 0 < r4 >>> 0 || (a4 = h2(c2[n4 + 28 >> 2], a4), a4 >>> 0 > u3 - r4 >>> 0) || (n4 = r4 + c2[n4 + 12 >> 2] | 0, n4 & 3)) break a;
              c2[e5 >> 2] = n4, c2[e5 + 4 >> 2] = a4 >>> 2;
            }
            M = s3 + 16 | 0;
            return;
          }
          o();
        }
        function Rc(e5, n4, r4, s3) {
          a3[e5 + 53 | 0] = 1;
          a: {
            if (c2[e5 + 4 >> 2] != (r4 | 0)) break a;
            a3[e5 + 52 | 0] = 1, r4 = c2[e5 + 16 >> 2];
            b: {
              if (!r4) {
                if (c2[e5 + 36 >> 2] = 1, c2[e5 + 24 >> 2] = s3, c2[e5 + 16 >> 2] = n4, (s3 | 0) != 1) break a;
                if (c2[e5 + 48 >> 2] == 1) break b;
                break a;
              }
              if ((n4 | 0) == (r4 | 0)) {
                if (r4 = c2[e5 + 24 >> 2], (r4 | 0) == 2 && (c2[e5 + 24 >> 2] = s3, r4 = s3), c2[e5 + 48 >> 2] != 1) break a;
                if ((r4 | 0) == 1) break b;
                break a;
              }
              c2[e5 + 36 >> 2] = c2[e5 + 36 >> 2] + 1;
            }
            a3[e5 + 54 | 0] = 1;
          }
        }
        function Fd(e5, n4) {
          var r4 = 0, s3 = 0, l3 = 0;
          return s3 = e5, l3 = Da(), c2[s3 >> 2] = l3, s3 = e5, l3 = Da(), c2[s3 + 4 >> 2] = l3, s3 = e5, l3 = Da(), c2[s3 + 8 >> 2] = l3, s3 = e5, l3 = Da(), c2[s3 + 12 >> 2] = l3, s3 = e5, l3 = Da(), c2[s3 + 16 >> 2] = l3, s3 = e5, l3 = Da(), c2[s3 + 20 >> 2] = l3, s3 = e5, l3 = Da(), c2[s3 + 24 >> 2] = l3, s3 = e5, l3 = Da(), c2[s3 + 28 >> 2] = l3, s3 = e5, l3 = Da(), c2[s3 + 32 >> 2] = l3, r4 = na(16), a3[r4 + 12 | 0] = n4, c2[r4 + 8 >> 2] = 0, c2[r4 >> 2] = 0, c2[r4 + 4 >> 2] = 0, fb(r4, 1 << n4), c2[e5 + 36 >> 2] = r4, e5;
        }
        function ld(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0;
          r4 = M - 32 | 0, M = r4;
          a: {
            if (a4 = c2[e5 + 40 >> 2], a4) {
              if (s3 = c2[e5 + 48 >> 2], c2[r4 + 24 >> 2] = c2[e5 + 44 >> 2], c2[r4 + 28 >> 2] = s3, n4 = c2[n4 + 28 >> 2], n4 >>> 0 > a4 >>> 0) break a;
              e5 = c2[e5 + 36 >> 2], c2[r4 + 20 >> 2] = n4, c2[r4 + 16 >> 2] = e5, e5 = c2[r4 + 28 >> 2], c2[r4 + 8 >> 2] = c2[r4 + 24 >> 2], c2[r4 + 12 >> 2] = e5, e5 = c2[r4 + 20 >> 2], c2[r4 >> 2] = c2[r4 + 16 >> 2], c2[r4 + 4 >> 2] = e5, Ca(r4 + 8 | 0, r4);
            }
            M = r4 + 32 | 0;
            return;
          }
          o();
        }
        function gd(e5, n4) {
          var r4 = 0, s3 = 0, u3 = 0;
          for (a3[e5 + 1 | 0] = l2[n4 | 0], r4 = c2[n4 + 8 >> 2], c2[e5 + 4 >> 2] = r4, n4 = c2[n4 + 4 >> 2], fd(e5 + 8 | 0, r4), zb(e5 + 20 | 0, r4), zb(e5 + 32 | 0, r4), u3 = (r4 << 3) + n4 | 0, r4 = 0; ; ) {
            if ((n4 | 0) == (u3 | 0)) e5 = Ld(e5);
            else {
              c2[c2[e5 + 8 >> 2] + (r4 << 3) >> 2] = l2[n4 | 0], s3 = r4 << 2, c2[s3 + c2[e5 + 20 >> 2] >> 2] = l2[n4 + 1 | 0], c2[c2[e5 + 32 >> 2] + s3 >> 2] = c2[n4 + 4 >> 2], n4 = n4 + 8 | 0, r4 = r4 + 1 | 0;
              continue;
            }
            break;
          }
          return e5;
        }
        function qa(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, u3 = 0;
          a: {
            if (r4 = c2[e5 + 4 >> 2], a4 = c2[e5 + 8 >> 2], r4 >>> 0 > a4 + 3 >>> 0) {
              if (a4 >>> 0 >= r4 >>> 0 | a4 + 1 >>> 0 >= r4 >>> 0 | a4 + 2 >>> 0 >= r4 >>> 0) break a;
              r4 = n4, n4 = c2[e5 >> 2] + a4 | 0, n4 = l2[n4 | 0] | l2[n4 + 1 | 0] << 8 | (l2[n4 + 2 | 0] << 16 | l2[n4 + 3 | 0] << 24), s3 = r4, u3 = ((Ae(n4, 16) ^ n4) & -16711936) >>> 8 ^ Ae(n4, 8), c2[s3 >> 2] = u3, c2[e5 + 8 >> 2] = c2[e5 + 8 >> 2] + 4, e5 = 0;
            } else e5 = -1;
            return e5;
          }
          o();
        }
        function ec(e5, n4) {
          var r4 = 0, a4 = 0;
          if ((e5 | 0) != (n4 | 0)) {
            kc(e5), c2[e5 >> 2] = c2[n4 >> 2], c2[e5 + 4 >> 2] = c2[n4 + 4 >> 2], c2[e5 + 8 >> 2] = c2[n4 + 8 >> 2], c2[n4 + 8 >> 2] = 0, c2[n4 >> 2] = 0, c2[n4 + 4 >> 2] = 0, r4 = c2[e5 >> 2], a4 = c2[e5 + 4 >> 2];
            a: {
              if ((r4 | 0) != (a4 | 0)) {
                c2[e5 + 12 >> 2] = r4, c2[e5 + 16 >> 2] = a4 - r4;
                break a;
              }
              r4 = c2[n4 + 16 >> 2], c2[e5 + 12 >> 2] = c2[n4 + 12 >> 2], c2[e5 + 16 >> 2] = r4;
            }
            c2[n4 + 12 >> 2] = 0, c2[n4 + 16 >> 2] = 0;
          }
        }
        function fc(e5, n4, r4) {
          var a4 = 0, s3 = 0, l3 = 0, u3 = 0;
          if (a4 = c2[e5 >> 2], c2[e5 + 8 >> 2] - a4 >> 2 >>> 0 >= n4 >>> 0) {
            for (s3 = c2[e5 + 4 >> 2] - a4 >> 2, l3 = n4 >>> 0 > s3 >>> 0 ? s3 : n4, u3 = a4; l3; ) c2[u3 >> 2] = c2[r4 >> 2], l3 = l3 - 1 | 0, u3 = u3 + 4 | 0;
            if (n4 >>> 0 > s3 >>> 0) {
              dd(e5, n4 - s3 | 0, r4);
              return;
            }
            c2[e5 + 4 >> 2] = (n4 << 2) + a4;
          } else kc(e5), ed(e5, pd(c2[e5 >> 2], c2[e5 + 8 >> 2], n4)), dd(e5, n4, r4);
        }
        function Pa(e5, n4, r4) {
          var a4 = 0;
          if (!r4) return c2[e5 + 4 >> 2] == c2[n4 + 4 >> 2];
          if ((e5 | 0) == (n4 | 0)) return 1;
          r4 = c2[e5 + 4 >> 2], e5 = l2[r4 | 0], n4 = c2[n4 + 4 >> 2], a4 = l2[n4 | 0];
          a: {
            if (!e5 | (a4 | 0) != (e5 | 0)) break a;
            for (; ; ) {
              if (a4 = l2[n4 + 1 | 0], e5 = l2[r4 + 1 | 0], !e5) break a;
              if (n4 = n4 + 1 | 0, r4 = r4 + 1 | 0, (e5 | 0) != (a4 | 0)) break;
            }
          }
          return (e5 | 0) == (a4 | 0);
        }
        function Ic(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0, l3 = 0;
          if ((e5 | 0) != (n4 | 0)) {
            if (l3 = c2[n4 + 4 >> 2], r4 = c2[n4 >> 2], n4 = l3 - r4 | 0, a4 = c2[e5 >> 2], n4 >>> 0 <= c2[e5 + 8 >> 2] - a4 >>> 0) {
              if (s3 = c2[e5 + 4 >> 2] - a4 | 0, n4 >>> 0 > s3 >>> 0) {
                s3 && p(a4, r4, s3), Xb(e5, r4 + s3 | 0, l3);
                return;
              }
              n4 && p(a4, r4, n4), c2[e5 + 4 >> 2] = n4 + a4;
              return;
            }
            kc(e5), Eb(e5, Fc(c2[e5 >> 2], c2[e5 + 8 >> 2], n4)), Xb(e5, r4, l3);
          }
        }
        function Ca(e5, n4) {
          var r4 = 0, s3 = 0, l3 = 0;
          a: {
            r4 = c2[e5 + 4 >> 2];
            b: {
              if (!r4) break b;
              if (!c2[n4 + 4 >> 2]) for (e5 = c2[e5 >> 2]; ; ) {
                if ((r4 | 0) <= 0) break b;
                a3[e5 | 0] = 0, r4 = r4 - 1 | 0, e5 = e5 + 1 | 0;
              }
              if (l3 = c2[n4 >> 2], s3 = c2[n4 + 4 >> 2], r4 = c2[e5 >> 2], n4 = 0, 1 & d2[e5 + 4 >> 2] < s3 >>> 0) break a;
              if (!(n4 | s3) | !s3) break b;
              p(r4, l3, s3);
            }
            return;
          }
          o();
        }
        function Dd(e5) {
          var n4 = 0, r4 = 0, a4 = 0, s3 = 0, l3 = 0, u3 = 0;
          for (a4 = M - 16 | 0, M = a4, s3 = nc(), l3 = s3 + 24 | 0, u3 = c2[e5 + 28 >> 2], r4 = c2[e5 + 24 >> 2]; (r4 | 0) != (u3 | 0); ) n4 = c2[r4 >> 2], n4 = n4 ? mc(n4) : 0, c2[a4 + 12 >> 2] = n4, n4 = a4 + 12 | 0, _c(l3, n4), r4 = r4 + 4 | 0, la(n4);
          return r4 = Jb(s3, e5), Jb(r4 + 12 | 0, e5 + 12 | 0), M = a4 + 16 | 0, r4;
        }
        function ja(e5, n4, r4) {
          var a4 = 0, s3 = 0, u3 = 0;
          a4 = M - 16 | 0, M = a4, dc(a4 + 8 | 0, n4, r4);
          a: {
            b: {
              if (!l2[a4 + 12 | 0]) {
                c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0;
                break b;
              }
              if (s3 = c2[n4 + 16 >> 2], r4 = c2[a4 + 8 >> 2], s3 >>> 0 < r4 >>> 0 || (u3 = c2[n4 + 28 >> 2], u3 >>> 0 > s3 - r4 >>> 0)) break a;
              n4 = c2[n4 + 12 >> 2], c2[e5 + 4 >> 2] = u3, c2[e5 >> 2] = n4 + r4;
            }
            M = a4 + 16 | 0;
            return;
          }
          o();
        }
        function Qc(e5, n4, r4) {
          var s3 = 0;
          if (s3 = c2[e5 + 36 >> 2], !s3) c2[e5 + 24 >> 2] = r4, c2[e5 + 16 >> 2] = n4, c2[e5 + 36 >> 2] = 1, c2[e5 + 20 >> 2] = c2[e5 + 56 >> 2];
          else a: {
            if (!(c2[e5 + 20 >> 2] != c2[e5 + 56 >> 2] | c2[e5 + 16 >> 2] != (n4 | 0))) {
              if (c2[e5 + 24 >> 2] != 2) break a;
              c2[e5 + 24 >> 2] = r4;
              return;
            }
            a3[e5 + 54 | 0] = 1, c2[e5 + 24 >> 2] = 2, c2[e5 + 36 >> 2] = s3 + 1;
          }
        }
        function Na(e5) {
          var n4 = 0, r4 = 0, s3 = 0, u3 = 0;
          return n4 = na(20), c2[n4 + 16 >> 2] = e5, a3[n4 | 0] = 0, r4 = 255, s3 = c2[e5 >> 2], u3 = c2[e5 + 4 >> 2], e5 = c2[e5 + 8 >> 2], u3 >>> 0 > e5 >>> 0 && (r4 = l2[e5 + s3 | 0]), a3[n4 + 1 | 0] = r4, c2[n4 + 4 >> 2] = ((r4 ^ -1) & 255) << 16, Ec(n4), c2[n4 + 8 >> 2] = 32768, c2[n4 + 4 >> 2] = c2[n4 + 4 >> 2] << 7, c2[n4 + 12 >> 2] = c2[n4 + 12 >> 2] - 7, n4;
        }
        function $c(e5, n4, r4) {
          var a4 = 0, s3 = 0;
          for (n4 && (a4 = 32 - n4 | 0, s3 = r4 >>> 0 < a4 >>> 0 ? r4 : a4, c2[e5 >> 2] = c2[e5 >> 2] & (-1 << n4 & -1 >>> a4 - s3 ^ -1), r4 = r4 - s3 | 0, e5 = e5 + 4 | 0), s3 = r4 >>> 5 | 0, n4 = s3, a4 = e5; n4; ) c2[a4 >> 2] = 0, n4 = n4 - 1 | 0, a4 = a4 + 4 | 0;
          n4 = r4 & 31, n4 && (e5 = (s3 << 2) + e5 | 0, c2[e5 >> 2] = c2[e5 >> 2] & (-1 >>> 32 - n4 ^ -1));
        }
        function ob(e5, n4) {
          var r4 = 0;
          r4 = 1;
          a: {
            if (qa(c2[e5 + 4 >> 2], n4) || qa(c2[e5 + 4 >> 2], n4 + 4 | 0) || qa(c2[e5 + 4 >> 2], n4 + 8 | 0) || qa(c2[e5 + 4 >> 2], n4 + 12 | 0) || wa(c2[e5 + 4 >> 2], n4 + 16 | 0) | (c2[n4 >> 2] > 4096 | c2[n4 + 4 >> 2] > 4096) & l2[e5 + 112 | 0] == 1) break a;
            r4 = 0;
          }
          return r4;
        }
        function jd(e5, n4, r4, a4) {
          var s3 = 0;
          s3 = M - 32 | 0, M = s3, ja(s3 + 24 | 0, r4, (n4 ^ -1) + a4 | 0), c2[e5 >> 2] = c2[s3 + 24 >> 2], c2[e5 + 4 >> 2] = c2[s3 + 28 >> 2], n4 = a4 - n4 | 0, ja(s3 + 16 | 0, r4, n4), c2[e5 + 8 >> 2] = c2[s3 + 16 >> 2], c2[e5 + 12 >> 2] = c2[s3 + 20 >> 2], ja(s3 + 8 | 0, r4, n4 + 1 | 0), c2[e5 + 16 >> 2] = c2[s3 + 8 >> 2], c2[e5 + 20 >> 2] = c2[s3 + 12 >> 2], M = s3 + 32 | 0;
        }
        function Cd(e5, n4, r4) {
          var a4 = 0, s3 = 0;
          a4 = na(32), s3 = c2[n4 + 12 >> 2], c2[a4 + 16 >> 2] = c2[n4 + 8 >> 2], c2[a4 + 20 >> 2] = s3, s3 = c2[n4 + 4 >> 2], c2[a4 + 8 >> 2] = c2[n4 >> 2], c2[a4 + 12 >> 2] = s3, n4 = c2[r4 >> 2], c2[r4 >> 2] = 0, c2[a4 >> 2] = e5, c2[a4 + 24 >> 2] = n4, n4 = c2[e5 + 4 >> 2], c2[a4 + 4 >> 2] = n4, c2[n4 >> 2] = a4, c2[e5 + 4 >> 2] = a4, c2[e5 + 8 >> 2] = c2[e5 + 8 >> 2] + 1;
        }
        function Ga(e5, n4, r4) {
          var a4 = 0, s3 = 0, u3 = 0, d3 = 0;
          for (a4 = c2[n4 + 8 >> 2], d3 = (a4 | 0) > 0 ? a4 : 0, a4 = 0; ; ) {
            a: {
              if ((a4 | 0) == (d3 | 0)) {
                s3 = 0;
                break a;
              }
              if (s3 = Ka(e5, c2[c2[n4 + 12 >> 2] + (a4 << 2) >> 2]), !(!s3 | (l2[s3 + 4 | 0] & 63) != 53)) {
                if ((r4 | 0) == (u3 | 0)) break a;
                u3 = u3 + 1 | 0;
              }
              a4 = a4 + 1 | 0;
              continue;
            }
            break;
          }
          return s3;
        }
        function Kb(e5, n4) {
          var r4 = 0;
          c2[e5 + 8 >> 2] = 0, c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0;
          a: {
            if (n4) {
              if (n4 >>> 0 >= 1073741824) break a;
              for (r4 = n4 << 2, n4 = na(r4), c2[e5 >> 2] = n4, r4 = n4 + r4 | 0, c2[e5 + 8 >> 2] = r4; (n4 | 0) != (r4 | 0); ) c2[n4 >> 2] = 0, n4 = n4 + 4 | 0;
              c2[e5 + 4 >> 2] = r4;
            }
            return e5;
          }
          za(), o();
        }
        function cb(e5, n4) {
          var r4 = 0;
          c2[e5 + 8 >> 2] = 0, c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0;
          a: {
            if (n4) {
              if (n4 >>> 0 >= 1073741824) break a;
              for (r4 = Fb(n4), c2[e5 >> 2] = r4, n4 = (n4 << 2) + r4 | 0, c2[e5 + 8 >> 2] = n4; (n4 | 0) != (r4 | 0); ) c2[r4 >> 2] = 0, r4 = r4 + 4 | 0;
              c2[e5 + 4 >> 2] = n4;
            }
            return e5;
          }
          za(), o();
        }
        function Cb(e5, n4, r4) {
          var a4 = 0;
          a4 = M - 32 | 0, M = a4, ja(a4 + 24 | 0, n4, r4 - 1 | 0), c2[e5 >> 2] = c2[a4 + 24 >> 2], c2[e5 + 4 >> 2] = c2[a4 + 28 >> 2], ja(a4 + 16 | 0, n4, r4), c2[e5 + 8 >> 2] = c2[a4 + 16 >> 2], c2[e5 + 12 >> 2] = c2[a4 + 20 >> 2], ja(a4 + 8 | 0, n4, r4 + 1 | 0), c2[e5 + 16 >> 2] = c2[a4 + 8 >> 2], c2[e5 + 20 >> 2] = c2[a4 + 12 >> 2], M = a4 + 32 | 0;
        }
        function Mc(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0;
          return r4 = M - 16 | 0, M = r4, a4 = l2[e5 + 4 | 0], (a4 | 0) == 255 && (e5 = vb(4), c2[e5 >> 2] = 4936, C2(e5 | 0, 4948, 2), o()), c2[r4 + 4 >> 2] = r4 + 3, s3 = c2[n4 + 4 >> 2], c2[r4 + 8 >> 2] = c2[n4 >> 2], c2[r4 + 12 >> 2] = s3, e5 = P[c2[(r4 + 8 | 0) + (a4 << 2) >> 2]](r4 + 4 | 0, e5) | 0, M = r4 + 16 | 0, e5;
        }
        function lb() {
          var e5 = 0;
          return e5 = na(80), s2[e5 + 56 >> 1] = 0, c2[e5 + 12 >> 2] = 0, c2[e5 + 24 >> 2] = 0, c2[e5 + 28 >> 2] = 0, c2[e5 + 32 >> 2] = 0, c2[e5 + 36 >> 2] = 0, c2[e5 + 40 >> 2] = 0, c2[e5 + 44 >> 2] = 0, c2[e5 + 48 >> 2] = 0, c2[e5 + 60 >> 2] = 0, c2[e5 + 64 >> 2] = 0, c2[e5 + 68 >> 2] = 0, c2[e5 + 72 >> 2] = 0, c2[e5 + 76 >> 2] = 0, e5;
        }
        function ze(e5, n4, r4, a4) {
          var s3 = 0, c3 = 0, l3 = 0, u3 = 0, d3 = 0, f3 = 0;
          return s3 = r4 >>> 16 | 0, c3 = e5 >>> 16 | 0, f3 = h2(s3, c3), l3 = r4 & 65535, u3 = e5 & 65535, d3 = h2(l3, u3), c3 = (d3 >>> 16 | 0) + h2(c3, l3) | 0, s3 = (c3 & 65535) + h2(s3, u3) | 0, N = (h2(n4, r4) + f3 | 0) + h2(e5, a4) + (c3 >>> 16) + (s3 >>> 16) | 0, d3 & 65535 | s3 << 16;
        }
        function Ea(e5, n4, r4, s3, c3) {
          var u3 = 0;
          a: {
            if (!(!s3 | (n4 | 0) < 0 | (e5 | 0) <= (n4 | 0))) {
              if (u3 = n4 & 7, e5 = n4 >>> 3 | 0, c3) {
                if (e5 >>> 0 >= s3 >>> 0) break a;
                e5 = e5 + r4 | 0, a3[e5 | 0] = l2[e5 | 0] | 128 >>> u3;
                return;
              }
              if (e5 >>> 0 >= s3 >>> 0) break a;
              e5 = e5 + r4 | 0, a3[e5 | 0] = l2[e5 | 0] & -129 >> u3;
            }
            return;
          }
          o();
        }
        function od(e5) {
          var n4 = 0, r4 = 0, a4 = 0;
          c2[e5 + 56 >> 2] = 2, r4 = 1, n4 = 4, a4 = c2[e5 + 52 >> 2];
          a: {
            b: {
              if ((a4 | 0) == 5) break b;
              if ((a4 | 0) >= 3) {
                c2[e5 + 52 >> 2] = 5;
                break b;
              }
              if (n4 = yc(e5), r4 = !n4, c2[e5 + 56 >> 2] == 3) break a;
              c2[e5 + 52 >> 2] = 5, n4 = n4 ? -1 : 4;
            }
            c2[e5 + 56 >> 2] = n4;
          }
          return r4;
        }
        function Ka(e5, n4) {
          var r4 = 0, a4 = 0;
          r4 = c2[e5 >> 2];
          a: {
            if (r4 && (r4 = Ka(r4, n4), r4)) break a;
            for (a4 = c2[e5 + 12 >> 2], e5 = c2[e5 + 8 >> 2]; ; ) {
              if ((e5 | 0) == (a4 | 0)) return 0;
              if (r4 = c2[e5 >> 2], e5 = e5 + 4 | 0, c2[r4 >> 2] == (n4 | 0)) break;
            }
          }
          return r4;
        }
        function Bd(e5) {
          var n4 = 0;
          a: {
            if (l2[e5 + 16 | 0] != 3 | l2[e5 + 17 | 0] != 255 | (l2[e5 + 18 | 0] != 253 | l2[e5 + 19 | 0] != 255) || l2[e5 + 20 | 0] != 2 | l2[e5 + 21 | 0] != 254 | (l2[e5 + 22 | 0] != 254 | l2[e5 + 23 | 0] != 254)) break a;
            n4 = l2[e5 + 2 | 0] ^ 1;
          }
          return n4 & 1;
        }
        function Sa(e5, n4) {
          var r4 = 0, a4 = 0, u3 = 0;
          a: {
            if (r4 = c2[e5 + 8 >> 2], u3 = r4 + 1 | 0, a4 = c2[e5 + 4 >> 2], u3 >>> 0 < a4 >>> 0) {
              if (r4 >>> 0 >= a4 >>> 0) break a;
              a4 = n4, n4 = c2[e5 >> 2], s2[a4 >> 1] = l2[n4 + r4 | 0] << 8 | l2[n4 + u3 | 0], c2[e5 + 8 >> 2] = r4 + 2, e5 = 0;
            } else e5 = -1;
            return e5;
          }
          o();
        }
        function id(e5, n4, r4, s3, l3, u3, d3, f3) {
          return c2[r4 + 16 >> 2] | c2[r4 + 12 >> 2] << 3 | c2[r4 + 8 >> 2] << 6 | ia(c2[c2[e5 + 20 >> 2] + 20 >> 2], a3[e5 + 26 | 0] + (s3 - c2[e5 + 12 >> 2] | 0) | 0, l3, u3) << 8 | c2[r4 + 4 >> 2] << 9 | c2[r4 >> 2] << 10 | ia(n4, a3[e5 + 24 | 0] + s3 | 0, d3, f3) << 12;
        }
        function Db(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 + 40 >> 2], c2[e5 + 28 >> 2] = c2[e5 + 36 >> 2], c2[e5 + 32 >> 2] = r4, r4 = c2[e5 + 48 >> 2], n4 = c2[n4 + 28 >> 2], r4 >>> 0 < n4 >>> 0 && o(), c2[e5 + 40 >> 2] = r4, c2[e5 + 48 >> 2] = r4 - n4, r4 = c2[e5 + 44 >> 2], c2[e5 + 36 >> 2] = r4, c2[e5 + 44 >> 2] = n4 + r4;
        }
        function ra(e5, n4) {
          var r4 = 0, a4 = 0, s3 = 0;
          return a4 = M - 16 | 0, M = a4, s3 = n4 << 2, r4 = c2[s3 + c2[e5 + 36 >> 2] >> 2], r4 ||= (n4 = rd(na(96), n4), r4 = c2[e5 + 36 >> 2], c2[a4 + 12 >> 2] = 0, pb(r4 + s3 | 0, n4), pa(a4 + 12 | 0), c2[c2[e5 + 36 >> 2] + s3 >> 2]), M = a4 + 16 | 0, r4;
        }
        function $a(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 >> 2], r4 && (c2[e5 + 4 >> 2] = r4, ma(r4), c2[e5 + 8 >> 2] = 0, c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0), c2[e5 >> 2] = c2[n4 >> 2], c2[e5 + 4 >> 2] = c2[n4 + 4 >> 2], c2[e5 + 8 >> 2] = c2[n4 + 8 >> 2], c2[n4 + 8 >> 2] = 0, c2[n4 >> 2] = 0, c2[n4 + 4 >> 2] = 0;
        }
        function Qb() {
          var e5 = 0;
          return e5 = na(180), c2[e5 + 144 >> 2] = 0, c2[e5 + 148 >> 2] = 0, s2[e5 + 28 >> 1] = 0, c2[e5 + 152 >> 2] = 0, c2[e5 + 156 >> 2] = 0, c2[e5 + 160 >> 2] = 0, c2[e5 + 164 >> 2] = 0, c2[e5 + 168 >> 2] = 0, c2[e5 + 172 >> 2] = 0, t(e5 + 32 | 0, 0, 104), e5;
        }
        function Jc(e5, n4, r4) {
          var a4 = 0, s3 = 0;
          s3 = ((n4 & 536870911) << 3 | e5 >>> 29) & -8, a4 = c2[r4 >> 2];
          a: {
            for (; ; ) {
              if (d2[r4 >> 2] >= s3 >>> 0) break a;
              if (Ia(e5, n4, r4)) break;
            }
            if (c2[r4 >> 2] - a4 >>> 0 > 11) break a;
            c2[r4 >> 2] = a4;
          }
        }
        function xb(e5, n4) {
          var r4 = 0, a4 = 0;
          return l2[e5 | 0] == 1 ? (r4 = c2[e5 + 4 >> 2], n4 = ze(r4, r4 >> 31, n4, 0), r4 = N, a4 = !(n4 - -2147483648 >>> 0 < 2147483648 ? r4 + 1 | 0 : r4), r4 = 0 | a4, n4 = a4 ? n4 : 0) : n4 = 0, c2[e5 >> 2] = r4, c2[e5 + 4 >> 2] = n4, e5;
        }
        function oc(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 + 4 >> 2];
          a: {
            if ((n4 | 0) >= 0) {
              n4 = n4 + r4 | 0, r4 = c2[e5 >> 2] + (n4 >>> 3 & 536870908) | 0;
              break a;
            }
            n4 = n4 + r4 | 0, r4 = c2[e5 >> 2] + ((n4 - 31 | 0) / 32 << 2) | 0;
          }
          return c2[e5 >> 2] = r4, c2[e5 + 4 >> 2] = n4 & 31, e5;
        }
        function Lc(e5, n4) {
          var r4 = 0, s3 = 0, u3 = 0;
          r4 = M - 16 | 0, M = r4, s3 = l2[e5 + 4 | 0], (s3 | 0) != 255 && (u3 = c2[n4 + 4 >> 2], c2[r4 + 8 >> 2] = c2[n4 >> 2], c2[r4 + 12 >> 2] = u3, P[c2[(r4 + 8 | 0) + (s3 << 2) >> 2]](r4 + 7 | 0, e5)), a3[e5 + 4 | 0] = 255, M = r4 + 16 | 0;
        }
        function Ab(e5, n4, r4, a4, s3, l3, u3) {
          var d3 = 0, f3 = 0;
          d3 = M - 16 | 0, M = d3, c2[e5 + 16 >> 2] && (f3 = c2[e5 + 24 >> 2], c2[d3 + 8 >> 2] = c2[e5 + 20 >> 2], c2[d3 + 12 >> 2] = f3, c2[d3 >> 2] = 0, c2[d3 + 4 >> 2] = 0, cd(e5, n4, r4, a4, s3, l3, u3, d3)), M = d3 + 16 | 0;
        }
        function Xc(e5, n4) {
          var r4 = 0;
          r4 = M - 16 | 0, M = r4, c2[r4 + 8 >> 2] = 0;
          a: {
            if (l2[e5 + 4 | 0] == 1) {
              oa(e5, n4);
              break a;
            }
            Xa(e5), a3[e5 + 4 | 0] = 1, c2[e5 >> 2] = n4;
          }
          return c2[r4 + 12 >> 2] = 0, la(r4 + 12 | 0), la(r4 + 8 | 0), M = r4 + 16 | 0, e5;
        }
        function Ac(e5, n4, r4) {
          var a4 = 0, s3 = 0, u3 = 0;
          for (a4 = 1; ; ) {
            if (s3 = l2[e5 + 12 | 0], s3 >>> 0 <= (u3 & 255) >>> 0) c2[r4 >> 2] = (-1 << s3) + a4;
            else {
              a4 <<= 1, a4 = ka(n4, a4 + c2[e5 >> 2] | 0) | a4, u3 = u3 + 1 | 0;
              continue;
            }
            break;
          }
        }
        function wb(e5, n4, r4, s3) {
          var u3 = 0;
          u3 = M - 16 | 0, M = u3, c2[u3 + 12 >> 2] = s3, s3 = 1, a3[u3 + 8 | 0] = 1;
          a: {
            if (!l2[La(u3 + 8 | 0, n4 >> r4) | 0]) {
              s3 = 0, a3[e5 | 0] = 0;
              break a;
            }
            c2[e5 >> 2] = c2[u3 + 12 >> 2];
          }
          a3[e5 + 4 | 0] = s3, M = u3 + 16 | 0;
        }
        function rc(e5) {
          var n4 = 0;
          n4 = c2[e5 + 36 >> 2], c2[e5 + 36 >> 2] = 0, n4 && ma(Ha(n4)), Ba(e5 + 32 | 0), Ba(e5 + 28 | 0), Ba(e5 + 24 | 0), Ba(e5 + 20 | 0), Ba(e5 + 16 | 0), Ba(e5 + 12 | 0), Ba(e5 + 8 | 0), Ba(e5 + 4 | 0), Ba(e5);
        }
        function Lb(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 + 4 >> 2], n4 && (r4 = r4 + 1 | 0, c2[e5 + 4 >> 2] = r4), n4 = c2[e5 + 12 >> 2] - c2[e5 + 8 >> 2] >> 3, n4 >>> 0 <= r4 >>> 0 && (n4 = n4 + 16 | 0, fd(e5 + 8 | 0, n4), zb(e5 + 20 | 0, n4), zb(e5 + 32 | 0, n4));
        }
        function yb(e5, n4, r4) {
          a: switch (e5 | 0) {
            case 1:
              return n4 & r4;
            case 2:
              return n4 ^ r4;
            case 3:
              return n4 ^ r4 ^ -1;
            default:
              o();
            case 0:
              n4 |= r4;
              break;
            case 4:
              break a;
          }
          return n4;
        }
        function $d(e5, n4, r4, a4, s3, l3) {
          e5 |= 0, n4 |= 0, r4 |= 0, a4 |= 0, s3 |= 0, l3 |= 0, Pa(e5, c2[n4 + 8 >> 2], l3) ? Rc(n4, r4, a4, s3) : (e5 = c2[e5 + 8 >> 2], P[c2[c2[e5 >> 2] + 20 >> 2]](e5, n4, r4, a4, s3, l3));
        }
        function Gb(e5, n4) {
          var r4 = 0;
          return r4 = M - 16 | 0, M = r4, c2[e5 + 8 >> 2] = 0, c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0, c2[r4 + 8 >> 2] = e5, n4 && (Eb(e5, n4), kd(e5, n4)), a3[r4 + 12 | 0] = 1, gc(r4 + 8 | 0), M = r4 + 16 | 0, e5;
        }
        function xc(e5) {
          var n4 = 0, r4 = 0, s3 = 0;
          return r4 = h2(l2[e5 + 1 | 0], c2[e5 + 4 >> 2] + 1 | 0), r4 >>> 0 <= 65535 && (s3 = l2[e5 + 2 | 0], n4 = lb(), e5 = l2[e5 | 0], c2[n4 + 8 >> 2] = s3, c2[n4 + 4 >> 2] = r4, a3[n4 | 0] = e5), n4;
        }
        function Zc(e5, n4, r4) {
          var a4 = 0;
          return !(n4 & 1) | l2[e5 | 0] != 1 ? (n4 = 0, r4 = 0) : (n4 = c2[e5 + 4 >> 2], a4 = n4, n4 = n4 + r4 | 0, r4 = ((a4 ^ n4) & (n4 ^ r4)) >= 0, n4 = r4 ? n4 : 0), c2[e5 >> 2] = r4, c2[e5 + 4 >> 2] = n4, e5;
        }
        function me(e5, n4, r4) {
          e5 |= 0, n4 |= 0, r4 |= 0;
          var a4 = 0;
          return a4 = c2[e5 + 4 >> 2], e5 = c2[e5 + 8 >> 2], n4 = (e5 >> 1) + n4 | 0, r4 = c2[r4 >> 2], e5 & 1 && (a4 = c2[a4 + c2[n4 >> 2] >> 2]), P[a4 | 0](n4, r4) | 0;
        }
        function Zd(e5, n4, r4, a4) {
          e5 |= 0, n4 |= 0, r4 |= 0, a4 |= 0, c2[e5 + 4 >> 2] == c2[c2[n4 + 8 >> 2] + 4 >> 2] ? Qc(n4, r4, a4) : (e5 = c2[e5 + 8 >> 2], P[c2[c2[e5 >> 2] + 28 >> 2]](e5, n4, r4, a4));
        }
        function zd(e5, n4, r4, a4) {
          if (n4 >>> 0 <= a4 >>> 0) for (n4 = (n4 << 2) + e5 | 0; (e5 | 0) != (n4 | 0); ) c2[r4 >> 2] = c2[e5 >> 2], r4 = r4 + 4 | 0, e5 = e5 + 4 | 0;
          else o();
        }
        function ia(e5, n4, r4, a4) {
          a: {
            if (!a4 | (n4 | 0) < 0 | (e5 | 0) <= (n4 | 0)) e5 = 0;
            else {
              if (e5 = n4 >>> 3 | 0, e5 >>> 0 >= a4 >>> 0) break a;
              e5 = l2[e5 + r4 | 0] >>> ((n4 ^ -1) & 7) & 1;
            }
            return e5;
          }
          o();
        }
        function dd(e5, n4, r4) {
          var a4 = 0;
          for (a4 = c2[e5 + 4 >> 2], n4 = a4 + (n4 << 2) | 0; ; ) {
            if ((n4 | 0) == (a4 | 0)) c2[e5 + 4 >> 2] = n4;
            else {
              c2[a4 >> 2] = c2[r4 >> 2], a4 = a4 + 4 | 0;
              continue;
            }
            break;
          }
        }
        function Oa(e5) {
          var n4 = 0;
          return va(e5 + 84 | 0), va(e5 + 72 | 0), va(e5 + 60 | 0), va(e5 + 48 | 0), Ha(e5 + 32 | 0), Ha(e5 + 20 | 0), n4 = c2[e5 + 8 >> 2], n4 && (c2[e5 + 12 >> 2] = n4, ma(n4)), e5;
        }
        function bd(e5, n4) {
          var r4 = 0, a4 = 0;
          return l2[e5 | 0] == 1 ? (r4 = c2[e5 + 4 >> 2], a4 = r4 - n4 | 0, r4 = ((r4 ^ a4) & (n4 ^ r4)) >= 0, n4 = r4 ? a4 : 0) : (n4 = 0, r4 = 0), c2[e5 >> 2] = r4, c2[e5 + 4 >> 2] = n4, e5;
        }
        function La(e5, n4) {
          var r4 = 0, a4 = 0;
          return l2[e5 | 0] == 1 ? (r4 = c2[e5 + 4 >> 2], a4 = r4 + n4 | 0, r4 = ((a4 ^ r4) & (n4 ^ a4)) >= 0, n4 = r4 ? a4 : 0) : (n4 = 0, r4 = 0), c2[e5 >> 2] = r4, c2[e5 + 4 >> 2] = n4, e5;
        }
        function dc(e5, n4, r4) {
          var s3 = 0;
          a: {
            if (!(!(!c2[n4 + 16 >> 2] | (r4 | 0) < 0) & c2[n4 + 24 >> 2] > (r4 | 0))) {
              a3[e5 | 0] = 0;
              break a;
            }
            c2[e5 >> 2] = h2(c2[n4 + 28 >> 2], r4), s3 = 1;
          }
          a3[e5 + 4 | 0] = s3;
        }
        function Za(e5) {
          var n4 = 0, r4 = 0;
          if (n4 = c2[e5 >> 2], n4) {
            for (r4 = c2[e5 + 4 >> 2]; (r4 | 0) != (n4 | 0); ) r4 = la(r4 - 4 | 0);
            c2[e5 + 4 >> 2] = n4, ma(c2[e5 >> 2]);
          }
        }
        function wa(e5, n4) {
          var r4 = 0, s3 = 0;
          return s3 = c2[e5 >> 2], r4 = c2[e5 + 8 >> 2], r4 >>> 0 < d2[e5 + 4 >> 2] ? (a3[n4 | 0] = l2[s3 + r4 | 0], c2[e5 + 8 >> 2] = c2[e5 + 8 >> 2] + 1, e5 = 0) : e5 = -1, e5;
        }
        function ye() {
          for (var e5 = 0, n4 = 0, r4 = 0; n4 = e5 << 4, r4 = n4 + 5728 | 0, c2[n4 + 5732 >> 2] = r4, c2[n4 + 5736 >> 2] = r4, e5 = e5 + 1 | 0, (e5 | 0) != 64; ) ;
          Md(48);
        }
        function Tc(e5) {
          e5 |= 0;
          var n4 = 0, r4 = 0, a4 = 0;
          return c2[e5 >> 2] = 5476, n4 = c2[e5 + 4 >> 2], r4 = n4 - 4 | 0, a4 = c2[r4 >> 2] - 1 | 0, c2[r4 >> 2] = a4, (a4 | 0) < 0 && ma(n4 - 12 | 0), e5 | 0;
        }
        function qd(e5, n4) {
          var r4 = 0;
          for (r4 = c2[e5 + 4 >> 2], n4 = r4 + (n4 << 2) | 0; ; ) {
            if ((n4 | 0) == (r4 | 0)) c2[e5 + 4 >> 2] = n4;
            else {
              c2[r4 >> 2] = 0, r4 = r4 + 4 | 0;
              continue;
            }
            break;
          }
        }
        function kd(e5, n4) {
          var r4 = 0;
          for (r4 = n4, n4 = c2[e5 + 4 >> 2], r4 = r4 + n4 | 0; ; ) {
            if ((n4 | 0) == (r4 | 0)) c2[e5 + 4 >> 2] = r4;
            else {
              a3[n4 | 0] = 0, n4 = n4 + 1 | 0;
              continue;
            }
            break;
          }
        }
        function Xb(e5, n4, r4) {
          var s3 = 0;
          for (s3 = c2[e5 + 4 >> 2]; (n4 | 0) != (r4 | 0); ) a3[s3 | 0] = l2[n4 | 0], s3 = s3 + 1 | 0, n4 = n4 + 1 | 0;
          c2[e5 + 4 >> 2] = s3;
        }
        function Ia(e5, n4, r4) {
          var a4 = 0;
          return a4 = r4, r4 = c2[r4 >> 2], c2[a4 >> 2] = r4 + 1, a4 = n4, n4 = r4 >>> 3 | 0, a4 >>> 0 <= n4 >>> 0 && o(), (l2[e5 + n4 | 0] << (r4 & 7) & 128) >>> 7 | 0;
        }
        function vd(e5, n4) {
          var r4 = 0;
          return r4 = ze(n4, 0, e5, 0), N | r4 >>> 0 > 2147479550 ? e5 = 0 : (n4 = h2(e5, n4), e5 = hb(n4), n4 && e5 && t(e5, 0, n4)), e5;
        }
        function pd(e5, n4, r4) {
          return r4 >>> 0 >= 1073741824 && (za(), o()), e5 = n4 - e5 | 0, n4 = e5 >> 1, e5 >>> 0 >= 2147483644 ? 1073741823 : n4 >>> 0 > r4 >>> 0 ? n4 : r4;
        }
        function sa(e5) {
          var n4 = 0, r4 = 0;
          c2[e5 + 12 >> 2] && (n4 = c2[e5 + 8 >> 2] + 1 | 0, n4 && (r4 = c2[e5 + 4 >> 2], c2[e5 + 8 >> 2] = n4 >>> 0 < r4 >>> 0 ? n4 : r4), c2[e5 + 12 >> 2] = 0);
        }
        function eb(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 >> 2], c2[e5 >> 2] = n4, r4 && (pa(r4 + 68 | 0), la(r4 - -64 | 0), Sb(r4 + 60 | 0), Va(r4 + 56 | 0), va(r4 + 12 | 0), ma(r4));
        }
        function md(e5) {
          var n4 = 0;
          a: {
            if (n4 = e5, e5 = c2[e5 + 16 >> 2], (n4 | 0) == (e5 | 0)) n4 = 16;
            else {
              if (!e5) break a;
              n4 = 20;
            }
            P[c2[n4 + c2[e5 >> 2] >> 2]](e5);
          }
        }
        function _a(e5, n4) {
          kc(e5), c2[e5 >> 2] = c2[n4 >> 2], c2[e5 + 4 >> 2] = c2[n4 + 4 >> 2], c2[e5 + 8 >> 2] = c2[n4 + 8 >> 2], c2[n4 + 8 >> 2] = 0, c2[n4 >> 2] = 0, c2[n4 + 4 >> 2] = 0;
        }
        function Nb(e5, n4) {
          var r4 = 0;
          if (r4 = c2[e5 + 52 >> 2], (r4 | 0) == 3) {
            if (u2[e5 + 56 >> 1] != 1) return c2[e5 + 52 >> 2] = -1, -1;
            r4 = nd(e5, n4);
          }
          return r4;
        }
        function pe(e5) {
          e5 |= 0;
          var n4 = 0, r4 = 0;
          return n4 = na(12), c2[n4 >> 2] = 2244, r4 = c2[e5 + 8 >> 2], c2[n4 + 4 >> 2] = c2[e5 + 4 >> 2], c2[n4 + 8 >> 2] = r4, n4 | 0;
        }
        function cc(e5, n4, r4, a4) {
          var s3 = 0;
          s3 = M - 16 | 0, M = s3, ad(s3 + 8 | 0, n4, r4, a4), n4 = c2[s3 + 12 >> 2], c2[e5 >> 2] = c2[s3 + 8 >> 2], c2[e5 + 4 >> 2] = n4, M = s3 + 16 | 0;
        }
        function Tb(e5) {
          var n4 = 0;
          n4 = c2[e5 + 12 >> 2];
          a: {
            if ((n4 | 0) == 7) {
              c2[e5 + 8 >> 2] = c2[e5 + 8 >> 2] + 1, n4 = 0;
              break a;
            }
            n4 = n4 + 1 | 0;
          }
          c2[e5 + 12 >> 2] = n4;
        }
        function Fc(e5, n4, r4) {
          return (r4 | 0) < 0 && (za(), o()), e5 = n4 - e5 | 0, n4 = e5 << 1, e5 >>> 0 >= 1073741823 ? 2147483647 : n4 >>> 0 > r4 >>> 0 ? n4 : r4;
        }
        function ed(e5, n4) {
          var r4 = 0;
          n4 >>> 0 >= 1073741824 && (za(), o()), r4 = Fb(n4), c2[e5 + 4 >> 2] = r4, c2[e5 >> 2] = r4, c2[e5 + 8 >> 2] = (n4 << 2) + r4;
        }
        function Ya(e5) {
          var n4 = 0, r4 = 0;
          return n4 = c2[e5 + 4 >> 2], n4 || o(), r4 = c2[e5 >> 2], c2[e5 >> 2] = r4 + 4, c2[e5 + 4 >> 2] = n4 - 1, c2[r4 >> 2];
        }
        function Yc(e5, n4) {
          a: {
            b: {
              if (!l2[e5 + 4 | 0]) {
                if (c2[e5 >> 2] != (n4 | 0)) break b;
                break a;
              }
              Xa(e5), a3[e5 + 4 | 0] = 0;
            }
            c2[e5 >> 2] = n4;
          }
        }
        function Cc(e5, n4, r4) {
          return (r4 | 0) < 0 && (za(), o()), e5 = n4 - e5 | 0, e5 >>> 0 >= 2147483646 ? 2147483647 : e5 >>> 0 > r4 >>> 0 ? e5 : r4;
        }
        function rd(e5, n4) {
          var r4 = 0, c3 = 0;
          return s2[e5 >> 1] = 0, t(e5 + 4 | 0, 0, 92), r4 = e5, c3 = gd(e5, h2(n4, 12) + 2708 | 0), a3[r4 | 0] = c3, e5;
        }
        function Vd(e5, n4, r4, a4, s3, l3) {
          e5 |= 0, n4 |= 0, r4 |= 0, a4 |= 0, s3 |= 0, l3 |= 0, Pa(e5, c2[n4 + 8 >> 2], l3) && Rc(n4, r4, a4, s3);
        }
        function ib(e5) {
          for (var n4 = 0, r4 = 0; n4 = r4, r4 = n4 + 1 | 0, 1 << n4 >>> 0 < e5 >>> 0; ) ;
          return n4 & 255;
        }
        function bc(e5) {
          var n4 = 0, r4 = 0;
          return n4 = c2[e5 + 4 >> 2], n4 || o(), r4 = c2[e5 >> 2], c2[e5 >> 2] = r4 + 4, c2[e5 + 4 >> 2] = n4 - 1, r4;
        }
        function oe(e5, n4) {
          e5 |= 0, n4 |= 0;
          var r4 = 0;
          c2[n4 >> 2] = 2244, r4 = c2[e5 + 8 >> 2], c2[n4 + 4 >> 2] = c2[e5 + 4 >> 2], c2[n4 + 8 >> 2] = r4;
        }
        function ud(e5, n4) {
          var r4 = 0;
          r4 = M - 16 | 0, M = r4, c2[r4 + 12 >> 2] = n4, n4 = e5 + 24 | 0, e5 = r4 + 12 | 0, _c(n4, e5), la(e5), M = r4 + 16 | 0;
        }
        function kc(e5) {
          var n4 = 0;
          n4 = c2[e5 >> 2], n4 && (c2[e5 + 4 >> 2] = n4, ma(n4), c2[e5 + 8 >> 2] = 0, c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0);
        }
        function Dc(e5) {
          var n4 = 0, r4 = 0;
          n4 = c2[e5 + 8 >> 2] + 1 | 0, n4 && (r4 = e5, e5 = c2[e5 + 4 >> 2], c2[r4 + 8 >> 2] = e5 >>> 0 > n4 >>> 0 ? n4 : e5);
        }
        function Kd(e5, n4) {
          var r4 = 0;
          (n4 | 0) < 0 && (za(), o()), r4 = na(n4), c2[e5 + 4 >> 2] = r4, c2[e5 >> 2] = r4, c2[e5 + 8 >> 2] = n4 + r4;
        }
        function Eb(e5, n4) {
          var r4 = 0;
          (n4 | 0) < 0 && (za(), o()), r4 = Ad(n4), c2[e5 + 4 >> 2] = r4, c2[e5 >> 2] = r4, c2[e5 + 8 >> 2] = n4 + r4;
        }
        function Ae(e5, n4) {
          var r4 = 0, a4 = 0;
          return r4 = n4 & 31, a4 = (-1 << r4 & e5) >>> r4 | 0, r4 = e5, e5 = 0 - n4 & 31, a4 | (r4 & -1 >>> e5) << e5;
        }
        function Yd(e5, n4, r4, a4) {
          e5 |= 0, n4 |= 0, r4 |= 0, a4 |= 0, c2[e5 + 4 >> 2] == c2[c2[n4 + 8 >> 2] + 4 >> 2] && Qc(n4, r4, a4);
        }
        function Qd(e5) {
          e5 |= 0;
          var n4 = 0;
          return n4 = c2[e5 + 64 >> 2], e5 = c2[e5 + 52 >> 2] + 7 >>> 3 | 0, (e5 >>> 0 > n4 >>> 0 ? n4 : e5) | 0;
        }
        function Mb(e5, n4, r4) {
          for (r4 = 0 - r4 | 0; (n4 | 0) > 0; ) a3[e5 | 0] = r4, n4 = n4 - 1 | 0, e5 = e5 + 1 | 0;
        }
        function Kc(e5, n4) {
          for (n4 = n4 - e5 | 0; (n4 | 0) > 0; ) a3[e5 | 0] = 255, n4 = n4 - 1 | 0, e5 = e5 + 1 | 0;
        }
        function Ib(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 >> 2], c2[e5 >> 2] = n4, r4 && (Za(r4 + 24 | 0), Ha(r4 + 12 | 0), ma(Ha(r4)));
        }
        function Da() {
          var e5 = 0;
          return e5 = na(12), c2[e5 + 8 >> 2] = 0, c2[e5 >> 2] = 0, c2[e5 + 4 >> 2] = 0, fb(e5, 512), e5;
        }
        function uc(e5, n4, r4, a4, s3, l3, u3, d3) {
          !c2[e5 + 16 >> 2] | !c2[l3 + 16 >> 2] || cd(l3, e5, n4, r4, a4, s3, d3, u3);
        }
        function Ad(e5) {
          a: {
            if (e5 >>> 0 <= 2147479550 && (e5 = hb(e5), e5)) break a;
            Jd(), o();
          }
          return e5;
        }
        function Oc(e5, n4) {
          return (l2[e5 + 16 | 0] != (n4 | 0) | l2[e5 + 17 | 0] != 255 ? 0 : l2[e5 + 2 | 0] ^ 1) & 1;
        }
        function Nc(e5) {
          return e5 |= 0, c2[e5 + 40 >> 2] = 0, c2[e5 + 44 >> 2] = 0, va(e5 + 80 | 0), va(e5 + 68 | 0), e5 | 0;
        }
        function qc(e5) {
          var n4 = 0;
          n4 = c2[e5 >> 2], c2[e5 >> 2] = 0, n4 && (va(n4 + 124 | 0), Oa(n4 + 28 | 0), ma(n4));
        }
        function mb(e5, n4) {
          var r4 = 0;
          r4 = vd(n4, 2), r4 || (Jd(), o()), c2[e5 + 4 >> 2] = n4, c2[e5 >> 2] = r4;
        }
        function Pd(e5) {
          return e5 |= 0, Kc(c2[e5 + 80 >> 2], c2[e5 + 84 >> 2]), c2[e5 + 52 >> 2] = 0, 1;
        }
        function Pb(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 >> 2], c2[e5 >> 2] = n4, r4 && (Za(r4 + 4 | 0), ma(r4));
        }
        function Ha(e5) {
          var n4 = 0;
          return n4 = c2[e5 >> 2], n4 && (c2[e5 + 4 >> 2] = n4, ma(n4)), e5;
        }
        function oa(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 >> 2], c2[e5 >> 2] = n4, r4 && (va(r4), ma(r4));
        }
        function Ub(e5) {
          var n4 = 0;
          return n4 = c2[e5 >> 2], c2[e5 >> 2] = 0, n4 && ma(n4), e5;
        }
        function wc(e5) {
          var n4 = 0;
          return n4 = na(16), c2[n4 >> 2] = e5, cb(n4 + 4 | 0, e5), n4;
        }
        function le(e5, n4) {
          return e5 |= 0, n4 |= 0, (c2[n4 + 4 >> 2] == 2532 ? e5 + 4 | 0 : 0) | 0;
        }
        function pb(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 >> 2], c2[e5 >> 2] = n4, r4 && ma(Oa(r4));
        }
        function Fb(e5) {
          return e5 >>> 0 >= 1073741824 && (Wa(), o()), na(e5 << 2);
        }
        function bb(e5, n4, r4, a4, s3, l3, u3) {
          c2[e5 + 16 >> 2] && Ab(l3, e5, n4, r4, a4, s3, u3);
        }
        function Wa() {
          var e5 = 0;
          e5 = vb(4), c2[e5 >> 2] = 5372, C2(e5 | 0, 5428, 2), o();
        }
        function Ba(e5) {
          var n4 = 0;
          n4 = c2[e5 >> 2], c2[e5 >> 2] = 0, n4 && ma(Ha(n4));
        }
        function na(e5) {
          return e5 = hb(e5 >>> 0 <= 1 ? 1 : e5), e5 || (Sc(), o()), e5;
        }
        function va(e5) {
          var n4 = 0;
          n4 = c2[e5 >> 2], n4 && (c2[e5 + 4 >> 2] = n4, ma(n4));
        }
        function Ra(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 >> 2], c2[e5 >> 2] = n4, r4 && ma(r4);
        }
        function Ua(e5) {
          var n4 = 0;
          n4 = c2[e5 >> 2], c2[e5 >> 2] = 0, n4 && ma(n4);
        }
        function kb() {
          var e5 = 0;
          return e5 = na(28), c2[e5 + 20 >> 2] = 0, e5;
        }
        function Be(e5) {
          return e5 ? 31 - _2(e5 - 1 ^ e5) | 0 : 32;
        }
        function Bc(e5) {
          return (e5 | 0) < 0 && (Wa(), o()), na(e5 << 1);
        }
        function ua(e5, n4) {
          return sd(na(32), c2[e5 >> 2], c2[n4 >> 2]);
        }
        function Hd(e5, n4) {
          var r4 = 0;
          r4 = c2[e5 >> 2], c2[e5 >> 2] = n4, ma(r4);
        }
        function td(e5) {
          var n4 = 0;
          return n4 = na(4), c2[n4 >> 2] = e5, n4;
        }
        function nc() {
          var e5 = 0;
          return e5 = na(36), t(e5, 0, 36), e5;
        }
        function be(e5, n4, r4) {
          return e5 |= 0, n4 |= 0, r4 |= 0, 0;
        }
        function Jd() {
          c2[(M - 16 | 0) + 12 >> 2] = 5684, sc(), o();
        }
        function Ma(e5, n4, r4, a4) {
          return (yb(e5, n4, r4) ^ r4) & a4 ^ r4;
        }
        function ub(e5, n4) {
          return e5 |= 0, n4 |= 0, c2[n4 >> 2];
        }
        function ne(e5) {
          e5 |= 0, P[c2[c2[e5 >> 2] + 4 >> 2]](e5);
        }
        function gc(e5) {
          l2[e5 + 4 | 0] || va(c2[e5 >> 2]);
        }
        function ee(e5) {
          e5 |= 0, D2(), E2(e5 + 128 | 0), o();
        }
        function hc(e5, n4) {
          return sd(na(32), e5, n4);
        }
        function lc(e5) {
          e5 = c2[e5 >> 2], e5 && ma(e5);
        }
        function Td(e5) {
          return e5 |= 0, c2[e5 + 4 >> 2];
        }
        function vb(e5) {
          return hb(e5 | 80) + 80 | 0;
        }
        function Nd(e5) {
          return e5 |= 0, hb(e5) | 0;
        }
        function xa(e5) {
          return rd(na(96), e5);
        }
        function je(e5, n4) {
          e5 |= 0, n4 |= 0, la(n4);
        }
        function ge(e5, n4) {
          e5 |= 0, n4 |= 0, Ja(n4);
        }
        function ac(e5) {
          return !!(Ta(e5) | 0);
        }
        function ke(e5) {
          return e5 |= 0, 2512;
        }
        function de(e5) {
          return e5 |= 0, 4530;
        }
        function ce(e5) {
          return e5 |= 0, 4504;
        }
        function Ud(e5) {
          return e5 |= 0, 4553;
        }
        function Ta(e5) {
          return Mc(e5, 4584);
        }
        function $b(e5) {
          return Mc(e5, 4600);
        }
        function sb(e5) {
          return rb(e5, 0), e5;
        }
        function qb(e5) {
          return e5 |= 0, e5 | 0;
        }
        function pc(e5) {
          Va(e5 + 24 | 0), ma(e5);
        }
        function pa(e5) {
          return pb(e5, 0), e5;
        }
        function la(e5) {
          return oa(e5, 0), e5;
        }
        function Vb(e5) {
          return eb(e5, 0), e5;
        }
        function Rd(e5) {
          e5 |= 0, ma(Nc(e5));
        }
        function Pc(e5) {
          e5 |= 0, ma(Tc(e5));
        }
        function yd(e5) {
          return Oc(e5, 3);
        }
        function fe(e5) {
          e5 |= 0, sc(), o();
        }
        function Hb(e5) {
          return Oc(e5, 2);
        }
        function Vc(e5, n4) {
          e5 |= 0, n4 |= 0;
        }
        function Qa(e5) {
          e5 |= 0, ma(e5);
        }
        function Xa(e5) {
          Lc(e5, 4576);
        }
        function Uc(e5) {
          Lc(e5, 4592);
        }
        function ta(e5) {
          Ra(e5, 0);
        }
        function Va(e5) {
          Ib(e5, 0);
        }
        function Sc() {
          sc(), o();
        }
        function Sb(e5) {
          Pb(e5, 0);
        }
        function Ja(e5) {
          Hd(e5, 0);
        }
        function sc() {
          O2(), o();
        }
        function ic(e5) {
          e5 |= 0;
        }
        n3 = l2, m(e4);
        var P = [null, Tc, qb, xe, we, ve, ue, te, se, re, qe, qb, Nc, Rd, Qd, Pd, Od, qb, Qa, pe, oe, ic, ne, me, le, ke, Vc, je, ub, ub, Vc, ge, ub, ub, ee, fe, Qa, de, Qa, ce, qb, Qa, ic, ic, be, Qa, Xd, Qa, Ud, Pc, Td, Pc, Qa, ae, Vd, Wd, Yd, Qa, $d, _d, Zd];
        function $() {
          return r3.byteLength >> 16;
        }
        function ea(e5) {
          e5 |= 0;
          var h3 = $() | 0, g3 = h3 + e5 | 0;
          if (h3 < g3 && g3 < 65536 && g3 <= 32768) {
            var _3 = /* @__PURE__ */ new ArrayBuffer(g3 << 16);
            new Int8Array(_3).set(a3), a3 = new Int8Array(_3), s2 = new Int16Array(_3), c2 = new Int32Array(_3), l2 = new Uint8Array(_3), u2 = new Uint16Array(_3), d2 = new Uint32Array(_3), new Float32Array(_3), f2 = new Float64Array(_3), r3 = _3, n3 = l2;
          }
          return h3;
        }
        return { j: Object.create(Object.prototype, { grow: { value: ea }, buffer: { get: function() {
          return r3;
        } } }), k: ye, l: Nd, m: ma, n: he, o: ie, p: Sd };
      }
      return ga(e3);
    })(n2);
  }, instantiate: function(e2, n2) {
    return { then: function(r2) {
      var a2 = new c.Module(e2);
      r2({ instance: new c.Instance(a2, n2) });
    } };
  }, RuntimeError: Error, isWasm2js: true };
  c.isWasm2js;
  var l = false, u;
  function getMemoryBuffer() {
    return E.buffer;
  }
  function updateMemoryViews() {
    if (!f?.buffer?.resizable) {
      var e2 = getMemoryBuffer();
      f = new Int8Array(e2), C = new Uint8Array(e2), v = new Uint32Array(e2);
    }
  }
  function preRun() {
    var e2 = n.preRun;
    e2 && (typeof e2 == `function` && (e2 = [e2]), g.push(...e2)), callRuntimeCallbacks(g);
  }
  function initRuntime() {
    O.k();
  }
  function postRun() {
    var e2 = n.postRun;
    e2 && (typeof e2 == `function` && (e2 = [e2]), h.push(...e2)), callRuntimeCallbacks(h);
  }
  function abort(e2) {
    throw n.onAbort?.(e2), e2 = `Aborted(${e2})`, s(e2), l = true, e2 += `. Build with -sASSERTIONS for more info.`, new c.RuntimeError(e2);
  }
  var d;
  function instantiateSync(e2, n2) {
    var r2 = new c.Module(void 0);
    return [new c.Instance(r2, n2), r2];
  }
  function getWasmImports() {
    return { a: D };
  }
  function createWasm() {
    function receiveInstance(e3) {
      return O = e3.exports, assignWasmExports(O), updateMemoryViews(), O;
    }
    var e2 = getWasmImports(), r2 = n.instantiateWasm;
    return r2 ? new Promise((n2) => {
      r2(e2, (e3) => n2(receiveInstance(e3)));
    }) : (d ??= void 0, receiveInstance(instantiateSync(d, e2)[0]));
  }
  class ExitStatus {
    name = `ExitStatus`;
    constructor(e2) {
      this.message = `Program terminated with exit(${e2})`, this.status = e2;
    }
  }
  var f, callRuntimeCallbacks = (e2) => {
    for (; e2.length > 0; ) e2.shift()(n);
  }, h = [], g = [], _ = true, v;
  class ExceptionInfo {
    constructor(e2) {
      this.excPtr = e2, this.ptr = e2 - 24;
    }
    set_type(e2) {
      v[this.ptr + 4 >> 2] = e2;
    }
    get_type() {
      return v[this.ptr + 4 >> 2];
    }
    set_destructor(e2) {
      v[this.ptr + 8 >> 2] = e2;
    }
    get_destructor() {
      return v[this.ptr + 8 >> 2];
    }
    set_caught(e2) {
      e2 = +!!e2, f[this.ptr + 12] = e2;
    }
    get_caught() {
      return f[this.ptr + 12] != 0;
    }
    set_rethrown(e2) {
      e2 = +!!e2, f[this.ptr + 13] = e2;
    }
    get_rethrown() {
      return f[this.ptr + 13] != 0;
    }
    init(e2, n2) {
      this.set_adjusted_ptr(0), this.set_type(e2), this.set_destructor(n2);
    }
    set_adjusted_ptr(e2) {
      v[this.ptr + 16 >> 2] = e2;
    }
    get_adjusted_ptr() {
      return v[this.ptr + 16 >> 2];
    }
  }
  var y = 0, __Unwind_RaiseException = (e2) => {
    abort();
  }, ___cxa_throw = (e2, n2, r2) => {
    new ExceptionInfo(e2).init(n2, r2), y++, __Unwind_RaiseException(e2);
  }, __abort_js = () => abort(``), b = 0, __emscripten_runtime_keepalive_clear = () => {
    _ = false, b = 0;
  }, x = {}, handleException = (e2) => {
    if (e2 instanceof ExitStatus || e2 == `unwind`) return u;
    quit_(1, e2);
  }, keepRuntimeAlive = () => _ || b > 0, _proc_exit = (e2) => {
    u = e2, keepRuntimeAlive() || (n.onExit?.(e2), l = true), quit_(e2, new ExitStatus(e2));
  }, exitJS = (e2, n2) => {
    u = e2, _proc_exit(e2);
  }, S = exitJS, maybeExit = () => {
    if (!keepRuntimeAlive()) try {
      S(u);
    } catch (e2) {
      handleException(e2);
    }
  }, callUserCallback = (e2) => {
    if (!l) try {
      return e2();
    } catch (e3) {
      handleException(e3);
    } finally {
      maybeExit();
    }
  }, _emscripten_get_now = () => performance.now(), __setitimer_js = (e2, n2) => (x[e2] && (clearTimeout(x[e2].id), delete x[e2]), n2 && (x[e2] = { id: setTimeout(() => {
    delete x[e2], callUserCallback(() => T(e2, _emscripten_get_now()));
  }, n2), timeout_ms: n2 }), 0);
  function _createImageData(e2) {
    n.imageData = new Uint8Array(e2);
  }
  var getHeapMax = () => 2147483648, alignMemory = (e2, n2) => Math.ceil(e2 / n2) * n2, growMemory = (e2) => {
    var n2 = (e2 - E.buffer.byteLength + 65535) / 65536 | 0;
    try {
      return E.grow(n2), updateMemoryViews(), 1;
    } catch {
    }
  }, C, _emscripten_resize_heap = (e2) => {
    var n2 = C.length;
    e2 >>>= 0;
    var r2 = getHeapMax();
    if (e2 > r2) return false;
    for (var a2 = 1; a2 <= 4; a2 *= 2) {
      var s2 = n2 * (1 + 0.2 / a2);
      if (s2 = Math.min(s2, e2 + 100663296), growMemory(Math.min(r2, alignMemory(Math.max(e2, s2), 65536)))) return true;
    }
    return false;
  };
  function _setImageData(e2, r2, a2, s2) {
    if (a2 === r2) {
      n.imageData = new Uint8ClampedArray(C.subarray(e2, e2 + a2 * s2));
      return;
    }
    let c2 = r2 * s2, l2 = n.imageData = new Uint8ClampedArray(c2);
    for (let n2 = e2, s3 = 0; s3 < c2; n2 += a2, s3 += r2) l2.set(C.subarray(n2, n2 + r2), s3);
  }
  function _setLineData(e2, r2, a2) {
    n.imageData.set(C.subarray(e2, e2 + r2), a2);
  }
  var writeArrayToMemory = (e2, n2) => {
    f.set(e2, n2);
  };
  n.noExitRuntime && (_ = n.noExitRuntime), n.print && n.print, n.printErr && (s = n.printErr), n.wasmBinary && n.wasmBinary, n.arguments && n.arguments, n.thisProgram && n.thisProgram;
  var w = n.preInit;
  if (w) for (typeof w == `function` && (n.preInit = w = [w]); w.length > 0; ) w.shift()();
  n.writeArrayToMemory = writeArrayToMemory;
  var T, E;
  function assignWasmExports(e2) {
    n._malloc = e2.l, n._free = e2.m, n._jbig2_decode = e2.n, n._ccitt_decode = e2.o, T = e2.p, E = e2.j, e2.__indirect_function_table;
  }
  var D = { a: ___cxa_throw, f: __abort_js, e: __emscripten_runtime_keepalive_clear, b: __setitimer_js, h: _createImageData, c: _emscripten_resize_heap, d: _proc_exit, i: _setImageData, g: _setLineData };
  async function run() {
    preRun();
    var e2 = n.setStatus;
    e2 && (e2(`Running...`), await new Promise((e3) => setTimeout(e3, 1)), setTimeout(e2, 1, ``)), !l && (initRuntime(), n.onRuntimeInitialized?.(), postRun());
  }
  var O = createWasm();
  return await run(), n;
}
export {
  JBig2 as default
};

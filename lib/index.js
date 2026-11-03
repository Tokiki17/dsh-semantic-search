import { createRequire as __qwenRagCreateRequire } from 'node:module'; const require = __qwenRagCreateRequire(import.meta.url);
import {
  __commonJS,
  __toESM
} from "./chunks/chunk-WQWKGS6O.js";

// node_modules/ignore/index.js
var require_ignore = __commonJS({
  "node_modules/ignore/index.js"(exports, module) {
    function makeArray(subject) {
      return Array.isArray(subject) ? subject : [subject];
    }
    var UNDEFINED = void 0;
    var EMPTY = "";
    var SPACE = " ";
    var ESCAPE = "\\";
    var REGEX_LITERAL_SPECIAL = /[.*+?()[\]{}^$|\\/]/;
    var BOM = "\uFEFF";
    var REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
    var REGEX_ANCHORED_GLOBSTAR = /^\/\*{2,}$/;
    var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
    var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
    var REGEX_SPLITALL_CRLF = /\r?\n/g;
    var DOUBLE_SLASH = "//";
    var SLASH_CODE = 47;
    var DOT_CODE = 46;
    var SLASH = "/";
    var TMP_KEY_IGNORE = "node-ignore";
    if (typeof Symbol !== "undefined") {
      TMP_KEY_IGNORE = /* @__PURE__ */ Symbol.for("node-ignore");
    }
    var KEY_IGNORE = TMP_KEY_IGNORE;
    var define = (object, key, value) => {
      Object.defineProperty(object, key, { value });
      return value;
    };
    var RETURN_FALSE = () => false;
    var POSIX_CLASSES = {
      alnum: "0-9A-Za-z",
      alpha: "A-Za-z",
      blank: " \\t",
      cntrl: "\\x00-\\x1f\\x7f",
      digit: "0-9",
      graph: "!-.0-~",
      lower: "a-z",
      print: " -.0-~",
      punct: "!-.:-@\\[-`{-~",
      // git's `sane-ctype.h` classifies \v and \f as control, not space,
      //   unlike C's `isspace`
      space: " \\t\\n\\r",
      upper: "A-Z",
      xdigit: "0-9A-Fa-f"
    };
    var CLASS_MEMBERS_TO_ESCAPE = "\\]^-[";
    var escapeMember = (char) => CLASS_MEMBERS_TO_ESCAPE.indexOf(char) < 0 ? char : ESCAPE + char;
    var NON_SLASH = "(?!\\/)";
    var classSource = (negated, body) => {
      if (negated) {
        return `[^\\/${body}]`;
      }
      const source = `[${body}]`;
      return new RegExp(source).test("/") ? NON_SLASH + source : source;
    };
    var scanBracket = (pattern, start) => {
      const { length } = pattern;
      let index = start + 1;
      let negated = EMPTY;
      const lead = pattern[index];
      if (lead === "!" || lead === "^") {
        negated = "^";
        index++;
      }
      let body = EMPTY;
      let prev = EMPTY;
      for (; ; ) {
        const char = pattern[index];
        if (char === UNDEFINED) {
          return null;
        }
        if (char === ESCAPE) {
          const escaped = pattern[index + 1];
          if (escaped === UNDEFINED) {
            return null;
          }
          body += escapeMember(escaped);
          prev = escaped;
          index++;
        } else if (char === "-" && prev && index + 1 < length && pattern[index + 1] !== "]") {
          index++;
          let to = pattern[index];
          if (to === ESCAPE) {
            to = pattern[index += 1];
          }
          if (prev <= to) {
            body += `-${escapeMember(to)}`;
          }
          prev = EMPTY;
        } else if (char === "[" && pattern[index + 1] === ":") {
          const nameStart = index + 2;
          let end = nameStart;
          while (end < length && pattern[end] !== "]") {
            end++;
          }
          if (end === length) {
            return null;
          }
          if (end > nameStart && pattern[end - 1] === ":") {
            const name2 = pattern.slice(nameStart, end - 1);
            if (!Object.prototype.hasOwnProperty.call(POSIX_CLASSES, name2)) {
              return null;
            }
            body += POSIX_CLASSES[name2];
            prev = EMPTY;
            index = end;
          } else {
            body += escapeMember("[");
            prev = "[";
            index = nameStart - 2;
          }
        } else {
          body += escapeMember(char);
          prev = char;
        }
        index++;
        if (pattern[index] === "]") {
          return {
            end: index,
            source: classSource(negated, body)
          };
        }
      }
    };
    var NEVER_MATCH = "[]";
    var PLACEHOLDER = "\0";
    var REGEX_RESTORE_PLACEHOLDER = new RegExp(
      `${PLACEHOLDER}(\\d+)${PLACEHOLDER}`,
      "g"
    );
    var TRAILING_WILDCARD = "\uE000";
    var TRAILING_DOUBLESTAR = "\uE001";
    var isReserved = (char) => char === PLACEHOLDER || char === TRAILING_WILDCARD || char === TRAILING_DOUBLESTAR;
    var extractBrackets = (pattern) => {
      const sources = [];
      const hold = (source) => `${PLACEHOLDER}${sources.push(source) - 1}${PLACEHOLDER}`;
      const { length } = pattern;
      let out = EMPTY;
      let index = 0;
      while (index < length) {
        const char = pattern[index];
        if (char === ESCAPE) {
          const escaped = pattern[index + 1];
          if (escaped === UNDEFINED || escaped === SLASH && index + 2 === length) {
            out += hold(NEVER_MATCH);
          } else if (escaped === "*" || escaped === "[" || escaped === SPACE) {
            out += pattern.slice(index, index + 2);
          } else {
            out += hold(
              REGEX_LITERAL_SPECIAL.test(escaped) ? ESCAPE + escaped : isReserved(escaped) ? `[${escaped}]` : escaped
            );
          }
          index += 2;
        } else if (isReserved(char)) {
          out += hold(`[${char}]`);
          index++;
        } else if (char === "[") {
          const scanned = scanBracket(pattern, index);
          if (scanned === null) {
            out += hold(NEVER_MATCH);
            index = length;
          } else {
            out += hold(scanned.source);
            index = scanned.end + 1;
          }
        } else {
          out += char;
          index++;
        }
      }
      return {
        source: out,
        sources
      };
    };
    var DIRECT = null;
    var REGEX_INNER_SLASH = /\/(?!$)/;
    var REPLACERS = [
      // Replace (\ ) with ' '
      // Only a space: an escaped tab or other whitespace is already a literal by
      //   the time it reaches here, and a bare tab must be left as one, not turned
      //   into a space.
      // (\ ) -> ' '
      // (\\ ) -> '\\ '
      // (\\\ ) -> '\\ '
      [
        // A run of backslashes is taken whole, from its first one, so no match
        //   ever starts again inside it -- `(\\+?) ` did, which made a long run
        //   quadratic.
        /(\\+)( ?)/g,
        (_, run, space) => space ? run.slice(0, run.length - run.length % 2) + SPACE : run,
        ESCAPE + SPACE
      ],
      // git's wildmatch() reads a run of two or more asterisks as one globstar
      //   whenever the run fills a path segment: it starts the pattern or follows
      //   a `/`, and it ends the pattern or comes before a `/`. A run of two is
      //   already `**`; a longer one is folded into `**` here, so the steps
      //   below only ever have to know `**`.
      // `***/foo` -> `**/foo`, `a/***/b` -> `a/**/b`, `a/***` -> `a/**`
      // git also takes a run beside a literal prefix (`a***/b`) or beside an
      //   escaped slash (`***\/b`) as a globstar, and this does not; the README
      //   lists both, under "A run of asterisks".
      [
        /(^|\/)\*{3,}(?=\/|$)/g,
        (_, start) => `${start}**`,
        "*"
      ],
      // Escape metacharacters
      // which is written down by users but means special for regular expressions.
      // > There are 12 characters with special meanings:
      // > - the backslash \,
      // > - the caret ^,
      // > - the dollar sign $,
      // > - the period or dot .,
      // > - the vertical bar or pipe symbol |,
      // > - the question mark ?,
      // > - the asterisk or star *,
      // > - the plus sign +,
      // > - the opening parenthesis (,
      // > - the closing parenthesis ),
      // > - and the opening square bracket [,
      // > - the opening curly brace {,
      // > These special characters are often called "metacharacters".
      [
        /[\\$.|*+(){^]/g,
        (match) => `\\${match}`
      ],
      [
        // > a question mark (?) matches a single character
        /(?!\\)\?/g,
        () => "[^/]",
        "?"
      ],
      // leading slash
      [
        // > A leading slash matches the beginning of the pathname.
        // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
        // A leading slash matches the beginning of the pathname
        /^\//,
        () => "^",
        SLASH
      ],
      // replace special metacharacter slash after the leading slash
      [
        /\//g,
        () => "\\/",
        SLASH
      ],
      [
        // > A leading "**" followed by a slash means match in all directories.
        // > For example, "**/foo" matches file or directory "foo" anywhere,
        // > the same as pattern "foo".
        // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
        // >   under directory "foo".
        // Notice that the '*'s have been replaced as '\\*'
        /^\^*(?:\\\*\\\*\\\/)+/,
        // '**/foo' <-> 'foo'
        () => "^(?:.*\\/)?",
        "*"
      ],
      // starting
      [
        // there will be no leading '/'
        //   (which has been replaced by section "leading slash")
        // If starts with '**', adding a '^' to the regular expression also works
        DIRECT,
        (source, pattern) => {
          if (!source || source[0] === "^") {
            return source;
          }
          const anchor = !REGEX_INNER_SLASH.test(pattern) ? "(?:^|\\/)" : "^";
          return anchor + source;
        }
      ],
      // two globstars
      [
        // Use lookahead assertions so that we could match more than one `'/**'`
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        // Zero, one or several directories
        // should not use '*', or it will be replaced by the next replacer
        // Check if it is not the last `'/**'`
        (_, index, str) => index + 6 < str.length ? str.slice(index + 6) === "\\/" ? "(?:\\/[^\\/]+)+" : "(?:\\/[^\\/]+)*" : `\\/${TRAILING_DOUBLESTAR}`,
        "*"
      ],
      // normal intermediate wildcards
      [
        // Never replace escaped '*'
        // ignore rule '\*' will match the path '*'
        // 'abc.*/' -> go
        // 'abc.*'  -> skip this rule,
        //    coz trailing single wildcard will be handed by [trailing wildcard]
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        // '*.js' matches '.js'
        // '*.js' doesn't match 'abc'
        (_, p1, p2) => {
          const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
          return p1 + unescaped;
        },
        "*"
      ],
      // trailing wildcard, held apart from a literal star
      [
        // The step above leaves a trailing `*` alone, so a single `\*` is all that
        //   can be left at the end here, and what stands in front of it says which
        //   kind it is. A wildcard arrives as the escaper wrote it, `\*` with
        //   nothing before it; a literal arrives as the user's own escape, which
        //   the escaper doubled, and then the star's own -- `\\` and then `\*`.
        //   There is no third case: every backslash still reaching the chain is
        //   one `\*`, `\[` or `\ ` carries itself, and each is followed by its
        //   own character, so a longer run can never form. This runs while the
        //   two are still distinct, before the unescape steps below collapse the
        //   literal onto the very `\*` a wildcard leaves behind.
        /(^|[^\\])((?:\\\\)*)\\\*$/,
        (match, p1, p2) => p2 === EMPTY ? p1 + TRAILING_WILDCARD : match,
        "*"
      ],
      [
        // unescape, revert step 3 except for back slash
        // For example, if a user escape a '\\*',
        // after step 3, the result will be '\\\\\\*'
        /\\\\\\(?=[$.|*+(){^])/g,
        () => ESCAPE,
        ESCAPE + ESCAPE
      ],
      [
        // '\\\\' -> '\\'
        /\\\\/g,
        () => ESCAPE,
        ESCAPE + ESCAPE
      ],
      [
        // Every real bracket expression -- POSIX classes included -- has already
        //   been held aside by `extractBrackets`, so the only `[` left in the
        //   pattern is an escaped, literal one.
        // A backslash could only stand at the end of the range if it quoted the
        //   `]`, and `\]` is held aside long before this.
        /\\\[([^\]/]*?)($|\])/g,
        // '\\[bar]' -> '\\\\[bar]'
        (match, range, close) => `\\[${range}${close}`,
        "["
      ],
      // ending
      [
        // 'js' will not match 'js.'
        // 'ab' will not match 'abc'
        DIRECT,
        // WTF!
        // https://git-scm.com/docs/gitignore
        // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
        // which re-fixes #24, #38
        // > If there is a separator at the end of the pattern then the pattern
        // > will only match directories, otherwise the pattern can match both
        // > files and directories.
        // 'js*' will not match 'a.js'
        // 'js/' will not match 'a.js'
        // 'js' will match 'a.js' and 'a.js/'
        (source) => {
          const last = source[source.length - 1];
          if (!last || last === TRAILING_WILDCARD || last === TRAILING_DOUBLESTAR) {
            return source;
          }
          return last === SLASH ? `${source}$` : `${source}(?=$|\\/$)`;
        }
      ]
    ];
    var REGEX_REPLACE_TRAILING_WILDCARD = /(^|\\\/)?\uE000$/;
    var MODE_IGNORE = "regex";
    var MODE_CHECK_IGNORE = "checkRegex";
    var UNDERSCORE = "_";
    var replaceTrailingWildcard = (_, p1) => {
      const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
      return `${prefix}(?=$|\\/$)`;
    };
    var REGEX_REPLACE_TRAILING_DOUBLESTAR = /\uE001$/;
    var replaceTrailingDoublestar = () => ".+(?=$|\\/$)";
    var WILDCARD = "[^\\/]*";
    var separatorAfter = (run, at) => {
      let separator = EMPTY;
      for (let index = at + 1; index < run.length && !run[index].wildcard; index++) {
        separator += run[index].single;
      }
      return separator;
    };
    var pinWildcards = (source) => {
      if (source.indexOf(WILDCARD) < 0) {
        return source;
      }
      const tokens = [];
      const { length } = source;
      let index = 0;
      while (index < length) {
        const char = source[index];
        if (source.startsWith(WILDCARD, index)) {
          tokens.push({ wildcard: true });
          index += WILDCARD.length;
        } else if (char === "[") {
          let end = index + 1;
          if (source[end] === "^") {
            end++;
          }
          if (source[end] === "]") {
            end++;
          }
          while (end < length && source[end] !== "]") {
            end += source[end] === ESCAPE ? 2 : 1;
          }
          end++;
          tokens.push({ single: source.slice(index, end) });
          index = end;
        } else if (char === ESCAPE) {
          tokens.push({ single: source.slice(index, index + 2) });
          index += 2;
        } else if (char === "(") {
          let depth = 0;
          let end = index;
          do {
            if (source[end] === ESCAPE) {
              end++;
            } else if (source[end] === "(") {
              depth++;
            } else if (source[end] === ")") {
              depth--;
            }
            end++;
          } while (end < length && depth > 0);
          if ("*+?".indexOf(source[end]) >= 0) {
            end++;
          }
          tokens.push({ boundary: source.slice(index, end) });
          index = end;
        } else if (char === "^" || char === "$") {
          tokens.push({ boundary: char });
          index++;
        } else {
          tokens.push({ single: char });
          index++;
        }
      }
      let out = EMPTY;
      let run = [];
      const flush = () => {
        let lastWildcard;
        run.forEach((token, at) => {
          if (token.wildcard) {
            lastWildcard = at;
          }
        });
        run.forEach((token, at) => {
          if (!token.wildcard) {
            out += token.single;
            return;
          }
          out += at === lastWildcard ? WILDCARD : `(?:(?!${separatorAfter(run, at)})[^\\/])*`;
        });
        run = [];
      };
      tokens.forEach((token) => {
        if (token.boundary === void 0) {
          run.push(token);
          return;
        }
        flush();
        out += token.boundary;
      });
      flush();
      return out;
    };
    var makeRegexPrefix = (pattern) => {
      if (REGEX_ANCHORED_GLOBSTAR.test(pattern)) {
        pattern = "**";
      }
      const { source, sources } = extractBrackets(pattern);
      const replaced = REPLACERS.reduce(
        // A pass whose matcher finds nothing hands back the very string it was
        //   given, so asking first costs a search and saves a rewrite. Ten of the
        //   fifteen passes never fire for a typical .gitignore line, and between
        //   them they were 45% of this chain.
        (prev, [matcher, replacer, required]) => {
          if (matcher === DIRECT) {
            return replacer(prev, pattern);
          }
          if (required !== UNDEFINED && prev.indexOf(required) < 0) {
            return prev;
          }
          return matcher.test(prev) ? prev.replace(matcher, replacer.bind(pattern)) : prev;
        },
        source
      );
      return sources.length ? replaced.replace(
        REGEX_RESTORE_PLACEHOLDER,
        (match, index) => sources[index]
      ) : replaced;
    };
    var checkSourceOf = (body, prefix) => {
      if (body[body.length - 1] === SLASH) {
        prefix = makeRegexPrefix(body.slice(0, -1));
      }
      const head = prefix.slice(0, -1);
      const last = prefix[prefix.length - 1];
      return last === TRAILING_WILDCARD ? `${head}$` : last === TRAILING_DOUBLESTAR ? `${head}.*$` : NEVER_MATCH;
    };
    var matchesBasename = (body) => {
      const index = body.indexOf(SLASH);
      return index < 0 || index === body.length - 1;
    };
    var basenameOf = (path) => {
      const end = path.length - 1;
      const index = path.lastIndexOf(
        SLASH,
        path[end] === SLASH ? end - 1 : end
      );
      return index < 0 ? path : path.slice(index + 1);
    };
    var parentOf = (path) => {
      if (path.charCodeAt(0) === SLASH_CODE || path.indexOf(DOUBLE_SLASH) >= 0) {
        const slices = path.split(SLASH).filter(Boolean);
        slices.pop();
        return slices.length ? slices.join(SLASH) + SLASH : EMPTY;
      }
      const end = path.length - 1;
      const cut = path.lastIndexOf(
        SLASH,
        path.charCodeAt(end) === SLASH_CODE ? end - 1 : end
      );
      return cut < 0 ? EMPTY : path.slice(0, cut + 1);
    };
    var isString = (subject) => typeof subject === "string";
    var checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern);
    var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF).filter(Boolean);
    var IgnoreRule = class {
      constructor(pattern, mark, body, ignoreCase, negative, prefix) {
        this.pattern = pattern;
        this.mark = mark;
        this.negative = negative;
        define(this, "body", body);
        define(this, "ignoreCase", ignoreCase);
        define(this, "regexPrefix", prefix);
      }
      // Worked out on first use and kept behind an own property, the way `regex`
      //   caches itself in `_regex`. Deciding it in the constructor instead would
      //   add a fourth `defineProperty` to every rule ever built, which cost 4% of
      //   every compile -- including the compiles of rules that are never matched
      //   against anything.
      get _basenameOnly() {
        return define(this, "_basenameOnly", matchesBasename(this.body));
      }
      get regex() {
        const key = UNDERSCORE + MODE_IGNORE;
        if (this[key]) {
          return this[key];
        }
        return this._make(MODE_IGNORE, key);
      }
      get checkRegex() {
        const key = UNDERSCORE + MODE_CHECK_IGNORE;
        if (this[key]) {
          return this[key];
        }
        return this._make(MODE_CHECK_IGNORE, key);
      }
      _make(mode, key) {
        const str = pinWildcards(
          mode === MODE_IGNORE ? this.regexPrefix.replace(REGEX_REPLACE_TRAILING_WILDCARD, replaceTrailingWildcard).replace(REGEX_REPLACE_TRAILING_DOUBLESTAR, replaceTrailingDoublestar) : checkSourceOf(this.body, this.regexPrefix)
        );
        const regex = this.ignoreCase ? new RegExp(str, "i") : new RegExp(str);
        return define(this, key, regex);
      }
    };
    var isLineEnd = (char) => char === "\r" || char === "\n";
    var trimEnd = (body) => {
      let end = body.length;
      while (end && isLineEnd(body[end - 1])) {
        end--;
      }
      const lineEnd = end;
      while (end && body[end - 1] === SPACE) {
        end--;
      }
      if (end === lineEnd) {
        return body.slice(0, end);
      }
      let backslashes = 0;
      while (backslashes < end && body[end - backslashes - 1] === ESCAPE) {
        backslashes++;
      }
      return backslashes % 2 ? body.slice(0, end - 1) + SPACE : body.slice(0, end);
    };
    var createRule = ({
      pattern,
      mark
    }, ignoreCase) => {
      let body = pattern[0] === BOM ? pattern.slice(1) : pattern;
      if (body[0] === "#") {
        return;
      }
      let negative = false;
      if (body[0] === "!") {
        negative = true;
        body = body.slice(1);
      }
      const last = body[body.length - 1];
      if (last === SPACE || last === "\r" || last === "\n") {
        body = trimEnd(body);
      }
      if (!body) {
        return;
      }
      body = body.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
      const regexPrefix = makeRegexPrefix(body);
      return new IgnoreRule(
        pattern,
        mark,
        body,
        ignoreCase,
        negative,
        regexPrefix
      );
    };
    var RuleManager = class {
      constructor(ignoreCase) {
        this._ignoreCase = ignoreCase;
        this._rules = [];
        this._basenameCount = 0;
      }
      _add(pattern) {
        if (pattern && pattern[KEY_IGNORE]) {
          this._rules = this._rules.concat(pattern._rules._rules);
          this._basenameCount += pattern._rules._basenameCount;
          this._added = true;
          return;
        }
        if (isString(pattern)) {
          pattern = {
            pattern
          };
        }
        const rule = checkPattern(pattern.pattern) && createRule(pattern, this._ignoreCase);
        if (rule) {
          this._added = true;
          this._rules.push(rule);
          if (matchesBasename(rule.body)) {
            this._basenameCount++;
          }
        }
      }
      // @param {Array<string> | string | Ignore} pattern
      add(pattern) {
        this._added = false;
        makeArray(
          isString(pattern) ? splitPattern(pattern) : pattern
        ).forEach(this._add, this);
        if (this._added) {
          this._literalRules = UNDEFINED;
        }
        return this._added;
      }
      // Match the literal 'abc/' for `checkIgnore`, last rule wins. Only a rule
      //   ending in a wildcard can match it (see `checkSourceOf`), so the rest
      //   are left out once, rather than tested or compiled for every path.
      testLiteral(path) {
        const rules = this._literalRules || (this._literalRules = this._rules.filter(
          ({ body }) => body[body.length - (body[body.length - 1] === SLASH ? 2 : 1)] === "*"
        ));
        let ignored = false;
        let unignored = false;
        let matchedRule;
        for (let index = rules.length - 1; index >= 0; index--) {
          const rule = rules[index];
          if (rule.checkRegex.test(path)) {
            ignored = !rule.negative;
            unignored = rule.negative;
            matchedRule = rule.negative ? UNDEFINED : rule;
            break;
          }
        }
        const ret = {
          ignored,
          unignored
        };
        if (matchedRule) {
          ret.rule = matchedRule;
        }
        return ret;
      }
      // Test one single path without recursively checking parent directories
      //
      // - mode `string` either `MODE_IGNORE` or `MODE_CHECK_IGNORE`
      // @returns {TestResult}
      test(path, mode) {
        const rules = this._rules;
        const { length } = rules;
        const shortcut = this._basenameCount * 2 >= length;
        const basename2 = shortcut ? basenameOf(path) : path;
        for (let index = length - 1; index >= 0; index--) {
          const rule = rules[index];
          if (rule[mode].test(
            shortcut && rule._basenameOnly ? basename2 : path
          )) {
            const { negative } = rule;
            const ret = {
              ignored: !negative,
              unignored: negative
            };
            if (!negative) {
              ret.rule = rule;
            }
            return ret;
          }
        }
        return {
          ignored: false,
          unignored: false
        };
      }
    };
    var throwError = (message, Ctor) => {
      throw new Ctor(message);
    };
    var checkPath = (path, originalPath, doThrow) => {
      if (!isString(path)) {
        return doThrow(
          `path must be a string, but got \`${originalPath}\``,
          TypeError
        );
      }
      if (!path) {
        return doThrow(`path must not be empty`, TypeError);
      }
      if (checkPath.isNotRelative(path)) {
        const r = "`path.relative()`d";
        return doThrow(
          `path should be a ${r} string, but got "${originalPath}"`,
          RangeError
        );
      }
      return true;
    };
    var isNotRelative = (path) => {
      const first = path.charCodeAt(0);
      if (first === SLASH_CODE) {
        return true;
      }
      if (first !== DOT_CODE) {
        return false;
      }
      if (path.length === 1) {
        return true;
      }
      const second = path.charCodeAt(1);
      if (second === SLASH_CODE) {
        return true;
      }
      if (second !== DOT_CODE) {
        return false;
      }
      return path.length === 2 || path.charCodeAt(2) === SLASH_CODE;
    };
    checkPath.isNotRelative = isNotRelative;
    checkPath.convert = (p) => p;
    var Ignore = class {
      constructor({
        ignorecase = true,
        ignoreCase = ignorecase,
        allowRelativePaths = false
      } = {}) {
        define(this, KEY_IGNORE, true);
        this._rules = new RuleManager(ignoreCase);
        this._strictPathCheck = !allowRelativePaths;
        this._initCache();
      }
      _initCache() {
        this._ignoreCache = /* @__PURE__ */ Object.create(null);
        this._testCache = /* @__PURE__ */ Object.create(null);
      }
      add(pattern) {
        if (this._rules.add(pattern)) {
          this._initCache();
        }
        return this;
      }
      // legacy
      addPattern(pattern) {
        return this.add(pattern);
      }
      // @returns {TestResult}
      _test(originalPath, cache) {
        const path = originalPath && checkPath.convert(originalPath);
        checkPath(
          path,
          originalPath,
          this._strictPathCheck ? throwError : RETURN_FALSE
        );
        return this._t(path, cache);
      }
      checkIgnore(path) {
        if (path.charCodeAt(path.length - 1) !== SLASH_CODE) {
          return this.test(path);
        }
        const dir = this._t(path, this._testCache);
        if (dir.ignored) {
          return dir;
        }
        const literal = this._rules.testLiteral(path);
        return literal.ignored || literal.unignored ? literal : dir;
      }
      _t(path, cache) {
        if (path in cache) {
          return cache[path];
        }
        const parentPath = parentOf(path);
        const parent = parentPath ? this._t(parentPath, cache) : UNDEFINED;
        return cache[path] = parent && parent.ignored ? parent : this._rules.test(path, MODE_IGNORE);
      }
      ignores(path) {
        return this._test(path, this._ignoreCache).ignored;
      }
      createFilter() {
        return (path) => !this.ignores(path);
      }
      filter(paths) {
        return makeArray(paths).filter(this.createFilter());
      }
      // @returns {TestResult}
      test(path) {
        return this._test(path, this._testCache);
      }
    };
    var factory = (options) => new Ignore(options);
    var isPathValid = (path) => checkPath(path && checkPath.convert(path), path, RETURN_FALSE);
    var setupWindows = () => {
      const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
      checkPath.convert = makePosix;
      const REGEX_TEST_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
      checkPath.isNotRelative = (path) => REGEX_TEST_WINDOWS_PATH_ABSOLUTE.test(path) || isNotRelative(path);
    };
    if (
      // Detect `process` so that it can run in browsers.
      typeof process !== "undefined" && process.platform === "win32"
    ) {
      setupWindows();
    }
    module.exports = factory;
    factory.default = factory;
    module.exports.isPathValid = isPathValid;
    define(module.exports, /* @__PURE__ */ Symbol.for("setupWindows"), setupWindows);
  }
});

// src/index.ts
import { homedir as homedir2 } from "node:os";
import { join as join3 } from "node:path";
import { resolveDshHome } from "@deepseek-ai/dsh-home-paths";
import { defineTool } from "@deepseek-ai/dsh-tools";

// src/http.ts
var BackendError = class extends Error {
  status;
  code;
  constructor(message, code, status) {
    super(message);
    this.name = "BackendError";
    this.code = code;
    this.status = status;
  }
};
var RETRYABLE = /* @__PURE__ */ new Set([408, 409, 425, 429, 500, 502, 503, 504]);
async function postJson(options) {
  const retries = options.retries ?? 2;
  let attempt = 0;
  for (; ; ) {
    try {
      return await postOnce(options);
    } catch (error) {
      if (options.signal.aborted) throw options.signal.reason ?? error;
      const retryable = error instanceof BackendError && (error.code === "network" || error.status !== void 0 && RETRYABLE.has(error.status));
      if (!retryable || attempt >= retries) throw error;
      attempt += 1;
      await delay(400 * 2 ** (attempt - 1), options.signal);
    }
  }
}
async function postOnce(options) {
  const timeout = AbortSignal.timeout(options.timeoutMs);
  const signal = AbortSignal.any([options.signal, timeout]);
  const headers = { "content-type": "application/json", accept: "application/json" };
  if (options.apiKey) headers.authorization = `Bearer ${options.apiKey}`;
  let response;
  try {
    response = await fetch(options.url, { method: "POST", headers, body: JSON.stringify(options.body), signal, redirect: "error" });
  } catch (error) {
    if (options.signal.aborted) throw options.signal.reason ?? error;
    if (timeout.aborted) throw new BackendError(`${options.label}: request to ${redactUrl(options.url)} timed out after ${options.timeoutMs} ms`, "timeout");
    throw new BackendError(`${options.label}: cannot reach ${redactUrl(options.url)} (${describeCause(error)})`, "network");
  }
  const text = await response.text();
  if (!response.ok) {
    throw new BackendError(`${options.label}: HTTP ${response.status} from ${redactUrl(options.url)}: ${summarizeBody(text)}`, "http", response.status);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new BackendError(`${options.label}: ${redactUrl(options.url)} returned non-JSON: ${summarizeBody(text)}`, "protocol", response.status);
  }
}
function delay(ms, signal) {
  return new Promise((resolve2, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve2();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal.reason);
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}
function describeCause(error) {
  const cause = error?.cause;
  return cause?.code ?? cause?.message ?? (error instanceof Error ? error.message : String(error));
}
function redactUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return "<invalid url>";
  }
}
function summarizeBody(text) {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > 300 ? `${flat.slice(0, 300)}\u2026` : flat || "<empty body>";
}
function isLoopbackUrl(url) {
  try {
    const host = new URL(url).hostname.replace(/^\[|\]$/g, "");
    return host === "localhost" || host.endsWith(".localhost") || host === "::1" || /^127(\.\d{1,3}){3}$/.test(host);
  } catch {
    return false;
  }
}

// src/backends/types.ts
function toUnitVector(raw, dims, label) {
  if (!Array.isArray(raw) || raw.length < dims) {
    throw new Error(`${label}: expected an embedding with at least ${dims} dimensions, got ${Array.isArray(raw) ? raw.length : typeof raw}`);
  }
  const out = new Float32Array(dims);
  let norm = 0;
  for (let i = 0; i < dims; i++) {
    const value = Number(raw[i]);
    if (!Number.isFinite(value)) throw new Error(`${label}: embedding contains a non-finite value`);
    out[i] = value;
    norm += value * value;
  }
  norm = Math.sqrt(norm);
  if (norm === 0) throw new Error(`${label}: embedding is all zeros (is the server running an embedding model with --embedding?)`);
  for (let i = 0; i < dims; i++) out[i] = out[i] / norm;
  return out;
}
function qwen3Query(instruct, query) {
  return `Instruct: ${instruct}
Query:${query}`;
}

// src/backends/dashscope.ts
var EMBED_PATH = "/api/v1/services/embeddings/text-embedding/text-embedding";
var RERANK_PATH = "/api/v1/services/rerank/text-rerank/text-rerank";
function createDashScopeBackend(settings) {
  const base = settings.baseURL.replace(/\/+$/, "");
  const requireKey = async () => {
    const key = await settings.apiKey();
    if (!key) {
      throw new Error(
        `DashScope API key not found: set ${settings.apiKeyEnv} in DSH credentials or in the harness home .env file, or switch the qwen-rag backend to openai-compatible (local llama-server).`
      );
    }
    return key;
  };
  const embed = async (texts, textType, signal) => {
    const parameters = { dimension: settings.dimensions, text_type: textType, output_type: "dense" };
    if (textType === "query" && settings.queryInstruct) parameters.instruct = settings.queryInstruct;
    const body = await postJson({
      url: base + EMBED_PATH,
      body: { model: settings.embeddingModel, input: { texts }, parameters },
      apiKey: await requireKey(),
      signal,
      timeoutMs: settings.timeoutMs,
      label: `DashScope ${settings.embeddingModel}`
    });
    return parseEmbeddings(body, texts.length, settings.dimensions, `DashScope ${settings.embeddingModel}`);
  };
  const embedder = {
    id: `dashscope|${settings.embeddingModel}|${settings.dimensions}`,
    dims: settings.dimensions,
    batchSize: settings.batchSize,
    remote: true,
    endpoint: `${base} (${settings.embeddingModel})`,
    embedDocuments: (texts, signal) => embed(texts, "document", signal),
    embedQuery: async (text, signal) => (await embed([text], "query", signal))[0]
  };
  const rerankModel = settings.rerankModel;
  const reranker = rerankModel === void 0 ? void 0 : {
    id: `dashscope|${rerankModel}`,
    async rerank(query, documents, topN, signal) {
      const parameters = { top_n: Math.min(topN, documents.length), return_documents: false };
      if (settings.rerankInstruct) parameters.instruct = settings.rerankInstruct;
      const body = await postJson({
        url: base + RERANK_PATH,
        body: { model: rerankModel, input: { query, documents }, parameters },
        apiKey: await requireKey(),
        signal,
        timeoutMs: settings.timeoutMs,
        label: `DashScope ${rerankModel}`
      });
      return parseRerank(body, documents.length, `DashScope ${rerankModel}`);
    }
  };
  return { embedder, reranker };
}
function parseEmbeddings(body, expected, dims, label) {
  const record = body;
  const list = record?.output?.embeddings ?? record?.embeddings ?? record?.data;
  if (!Array.isArray(list) || list.length !== expected) {
    throw new Error(`${label}: expected ${expected} embeddings, got ${Array.isArray(list) ? list.length : "none"}`);
  }
  const out = new Array(expected);
  list.forEach((item, position) => {
    const index = item.index ?? item.text_index ?? position;
    if (!Number.isInteger(index) || index < 0 || index >= expected || out[index] !== void 0) {
      throw new Error(`${label}: embedding response has an invalid or duplicate index ${String(index)}`);
    }
    out[index] = toUnitVector(item.embedding ?? [], dims, label);
  });
  return out;
}
function parseRerank(body, count, label) {
  const record = body;
  const list = record?.output?.results ?? record?.results;
  if (!Array.isArray(list)) throw new Error(`${label}: rerank response has no results`);
  const hits = [];
  for (const item of list) {
    const index = item.index;
    const score = item.relevance_score ?? item.score;
    if (!Number.isInteger(index) || index < 0 || index >= count || typeof score !== "number" || !Number.isFinite(score)) {
      throw new Error(`${label}: malformed rerank result ${JSON.stringify(item).slice(0, 120)}`);
    }
    hits.push({ index, score });
  }
  return hits.sort((a, b) => b.score - a.score);
}

// src/backends/openai-compat.ts
function createOpenAICompatibleBackend(settings) {
  const embeddingBase = settings.embeddingBaseURL.replace(/\/+$/, "");
  const remote = !isLoopbackUrl(embeddingBase);
  const key = async () => {
    const value = await settings.apiKey();
    if (!value && settings.apiKeyEnv && remote) {
      throw new Error(`${settings.name}: API key not found; set ${settings.apiKeyEnv} in DSH credentials or the harness home .env file.`);
    }
    return value;
  };
  const embed = async (texts, signal) => {
    const body = { model: settings.embeddingModel, input: texts, encoding_format: "float" };
    if (settings.sendDimensions) body.dimensions = settings.dimensions;
    const response = await postJson({
      url: `${embeddingBase}/embeddings`,
      body,
      apiKey: await key(),
      signal,
      timeoutMs: settings.timeoutMs,
      label: `${settings.name} embeddings`
    });
    return parseEmbeddings(response, texts.length, settings.dimensions, `${settings.name} embeddings`);
  };
  const embedder = {
    id: `openai-compatible|${settings.embeddingModel}|${settings.dimensions}|${settings.queryFormat}`,
    dims: settings.dimensions,
    batchSize: settings.batchSize,
    remote,
    endpoint: `${embeddingBase} (${settings.embeddingModel})`,
    embedDocuments: embed,
    embedQuery: async (text, signal) => {
      const query = settings.queryFormat === "qwen3" ? qwen3Query(settings.queryInstruct, text) : text;
      return (await embed([query], signal))[0];
    }
  };
  const rerankBase = settings.rerankBaseURL?.replace(/\/+$/, "");
  const rerankModel = settings.rerankModel;
  const reranker = rerankBase === void 0 || rerankModel === void 0 ? void 0 : {
    id: `openai-compatible|${rerankModel}`,
    async rerank(query, documents, topN, signal) {
      const body = { model: rerankModel, query, documents, top_n: Math.min(topN, documents.length), return_documents: false };
      if (settings.rerankInstruct) body.instruction = settings.rerankInstruct;
      const response = await postJson({
        url: `${rerankBase}/rerank`,
        body,
        apiKey: await key(),
        signal,
        timeoutMs: settings.timeoutMs,
        label: `${settings.name} rerank`
      });
      return parseRerank(response, documents.length, `${settings.name} rerank`);
    }
  };
  return { embedder, reranker };
}

// src/config.ts
import z from "@deepseek-ai/schemastery";
var DEFAULT_QUERY_INSTRUCT = "Given a search query, retrieve relevant passages from documents and source code that answer the query";
var DEFAULT_EXCLUDE_DIRS = [
  ".git",
  ".hg",
  ".svn",
  "node_modules",
  ".pnpm-store",
  "bower_components",
  "dist",
  "build",
  "out",
  "target",
  "coverage",
  ".next",
  ".nuxt",
  ".turbo",
  ".cache",
  ".parcel-cache",
  ".venv",
  "venv",
  "__pycache__",
  ".mypy_cache",
  ".pytest_cache",
  ".tox",
  ".gradle",
  ".idea",
  ".dsh",
  "DerivedData",
  "Pods"
];
var Config = z.object({
  backend: z.union(["dashscope", "openai-compatible"]).default("dashscope").description("Embedding/rerank backend: Alibaba Cloud Model Studio (dashscope) or an OpenAI-compatible server (local llama-server, SiliconFlow, \u2026)."),
  dashscope: z.object({
    baseURL: z.string().default("https://dashscope.aliyuncs.com").description("DashScope origin. Singapore: https://dashscope-intl.aliyuncs.com; workspace domain: https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com"),
    apiKeyEnv: z.string().default("DASHSCOPE_API_KEY").description("Credential name resolved through DSH credentials, then the environment / harness .env."),
    embeddingModel: z.string().default("qwen3.7-text-embedding"),
    rerankModel: z.string().default("qwen3.7-text-rerank"),
    dimensions: z.natural().min(64).max(4096).default(1024),
    batchSize: z.natural().min(1).max(20).default(10)
  }).default({}),
  openaiCompatible: z.object({
    preset: z.union(["local", "siliconflow", "custom"]).default("local").description("local = llama-server on 127.0.0.1:8081 (embedding) and :8082 (rerank); siliconflow = api.siliconflow.cn Qwen3 4B models."),
    embeddingBaseURL: z.string().description("Overrides the preset, e.g. http://127.0.0.1:8081/v1"),
    rerankBaseURL: z.string().description("Overrides the preset; leave the preset value or set rerank: false to skip reranking."),
    apiKeyEnv: z.string(),
    embeddingModel: z.string(),
    rerankModel: z.string(),
    dimensions: z.natural().min(32).max(4096),
    sendDimensions: z.boolean(),
    batchSize: z.natural().min(1).max(256),
    queryFormat: z.union(["qwen3", "plain"]).description('qwen3 wraps queries as "Instruct: \u2026\\nQuery:\u2026" for Qwen3-Embedding.')
  }).default({ preset: "local" }),
  queryInstruct: z.string().default(DEFAULT_QUERY_INSTRUCT).description("English task instruction for query embeddings."),
  rerankInstruct: z.string().default("").description("Optional rerank instruction (empty = provider default)."),
  rerank: z.boolean().default(true),
  approval: z.union(["remote", "always", "never"]).default("remote").description("When knowledge_index asks for approval: remote = only when document text leaves this machine."),
  storageDir: z.string().description("Index storage directory; default <DSH home>/qwen-rag."),
  requestTimeoutMs: z.natural().min(1e3).default(6e4),
  index: z.object({
    chunkChars: z.natural().min(200).max(8e3).default(1200),
    overlapChars: z.natural().max(2e3).default(150),
    maxFileBytes: z.natural().min(1024).default(20 * 1024 * 1024),
    maxFiles: z.natural().min(1).default(2e4),
    extraExtensions: z.array(z.string()).default([]),
    excludeDirs: z.array(z.string()).default(DEFAULT_EXCLUDE_DIRS)
  }).default({}),
  search: z.object({
    topK: z.natural().min(1).max(50).default(8),
    candidates: z.natural().min(5).max(500).default(50),
    rerankCandidates: z.natural().min(1).max(200).default(30),
    maxSnippetChars: z.natural().min(200).default(1500),
    refreshBeforeSearch: z.boolean().default(true),
    maxRefreshFiles: z.natural().default(50),
    timeoutMs: z.natural().min(1e3).default(18e4)
  }).default({})
});
var PRESETS = {
  local: {
    embeddingBaseURL: "http://127.0.0.1:8081/v1",
    rerankBaseURL: "http://127.0.0.1:8082/v1",
    apiKeyEnv: void 0,
    embeddingModel: "qwen3-embedding-0.6b",
    rerankModel: "qwen3-reranker-0.6b",
    dimensions: 1024,
    sendDimensions: false,
    batchSize: 16,
    queryFormat: "qwen3"
  },
  siliconflow: {
    embeddingBaseURL: "https://api.siliconflow.cn/v1",
    rerankBaseURL: "https://api.siliconflow.cn/v1",
    apiKeyEnv: "SILICONFLOW_API_KEY",
    embeddingModel: "Qwen/Qwen3-Embedding-4B",
    rerankModel: "Qwen/Qwen3-Reranker-4B",
    dimensions: 1024,
    sendDimensions: true,
    batchSize: 16,
    queryFormat: "qwen3"
  }
};
function resolveOpenAICompatible(config) {
  const preset = config.preset === "custom" ? void 0 : PRESETS[config.preset];
  const embeddingBaseURL = config.embeddingBaseURL ?? preset?.embeddingBaseURL;
  const embeddingModel = config.embeddingModel ?? preset?.embeddingModel;
  if (!embeddingBaseURL || !embeddingModel) {
    throw new Error('qwen-rag: openaiCompatible.preset "custom" requires embeddingBaseURL and embeddingModel');
  }
  return {
    embeddingBaseURL,
    rerankBaseURL: config.rerankBaseURL ?? preset?.rerankBaseURL,
    apiKeyEnv: config.apiKeyEnv ?? preset?.apiKeyEnv,
    embeddingModel,
    rerankModel: config.rerankModel ?? preset?.rerankModel,
    dimensions: config.dimensions ?? preset?.dimensions ?? 1024,
    sendDimensions: config.sendDimensions ?? preset?.sendDimensions ?? false,
    batchSize: config.batchSize ?? preset?.batchSize ?? 16,
    queryFormat: config.queryFormat ?? preset?.queryFormat ?? "plain"
  };
}
function assertCredentialName(name2) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name2)) throw new Error(`qwen-rag: invalid credential name ${JSON.stringify(name2)}`);
  return name2;
}

// src/kb.ts
import { createHash as createHash2 } from "node:crypto";
import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { dirname as dirname2, join as join2, relative as relative2, resolve, sep as sep2 } from "node:path";

// src/indexer.ts
import { createHash } from "node:crypto";
import { readFile as readFile2 } from "node:fs/promises";

// src/chunk.ts
function chunkDocument(doc, options) {
  const out = [];
  if (doc.kind === "pages") {
    doc.pages.forEach((page, index) => {
      packLines(splitLines(page), 0, void 0, "", index + 1, options, out);
    });
  } else if (doc.kind === "markdown") {
    chunkMarkdown(splitLines(doc.text), options, out);
  } else {
    packLines(splitLines(doc.text), 0, void 0, "", void 0, options, out);
  }
  return out;
}
function splitLines(text) {
  return text.replace(/\r\n?/g, "\n").split("\n");
}
function chunkMarkdown(lines, options, out) {
  const stack = [];
  let sectionStart = 0;
  let heading = "";
  let fence;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fenceMatch = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (fence === void 0) fence = marker[0].repeat(marker.length);
      else if (marker.startsWith(fence)) fence = void 0;
      continue;
    }
    if (fence !== void 0) continue;
    const headingMatch = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (!headingMatch) continue;
    packLines(lines, sectionStart, i, heading, void 0, options, out);
    const level = headingMatch[1].length;
    stack.length = Math.min(stack.length, level - 1);
    stack[level - 1] = headingMatch[2].trim();
    heading = stack.filter(Boolean).join(" > ");
    sectionStart = i;
  }
  packLines(lines, sectionStart, lines.length, heading, void 0, options, out);
}
function packLines(lines, from, to, heading, page, options, out) {
  const end = to ?? lines.length;
  const blocks = splitBlocks(lines, from, end, options.chunkChars);
  let i = 0;
  while (i < blocks.length) {
    let j = i;
    let size = blocks[i].size;
    while (j + 1 < blocks.length && size + 1 + blocks[j + 1].size <= options.chunkChars) {
      j += 1;
      size += 1 + blocks[j].size;
    }
    emit(lines, blocks[i].start, blocks[j].end, heading, page, out);
    if (j + 1 >= blocks.length) break;
    let k = j + 1;
    let carried = 0;
    while (k - 1 > i && carried + blocks[k - 1].size <= options.overlapChars) {
      k -= 1;
      carried += blocks[k].size + 1;
    }
    i = k;
  }
}
function splitBlocks(lines, from, to, maxChars) {
  const blocks = [];
  let start = -1;
  let size = 0;
  const flush = (endExclusive) => {
    if (start < 0) return;
    blocks.push(...splitOversize(lines, start, endExclusive - 1, size, maxChars));
    start = -1;
    size = 0;
  };
  for (let i = from; i < to; i++) {
    const line = lines[i];
    if (line.trim() === "") {
      flush(i);
      continue;
    }
    if (start < 0) start = i;
    size += (size === 0 ? 0 : 1) + line.length;
  }
  flush(to);
  return blocks;
}
function splitOversize(lines, start, end, size, maxChars) {
  if (size <= maxChars) return [{ start, end, size }];
  const parts = [];
  let partStart = start;
  let partSize = 0;
  for (let i = start; i <= end; i++) {
    const length = lines[i].length;
    if (partSize > 0 && partSize + 1 + length > maxChars) {
      parts.push({ start: partStart, end: i - 1, size: partSize });
      partStart = i;
      partSize = 0;
    }
    partSize += (partSize === 0 ? 0 : 1) + length;
  }
  parts.push({ start: partStart, end, size: Math.min(partSize, maxChars) });
  return parts;
}
var MAX_EMIT_CHARS = 16e3;
function emit(lines, start, end, heading, page, out) {
  let text = lines.slice(start, end + 1).join("\n").trim();
  if (text === "") return;
  if (text.length > MAX_EMIT_CHARS) text = text.slice(0, MAX_EMIT_CHARS);
  out.push({ ord: out.length, text, startLine: start + 1, endLine: end + 1, heading, page });
}
function embeddingInput(label, chunk, maxChars) {
  const header = chunk.heading ? `${label}
${chunk.heading}

` : `${label}

`;
  const body = chunk.text.length > maxChars ? chunk.text.slice(0, maxChars) : chunk.text;
  return header + body;
}

// src/parse.ts
import { basename, extname } from "node:path";
var MARKDOWN = /* @__PURE__ */ new Set([".md", ".markdown", ".mdx", ".mdown", ".mkd"]);
var HTML = /* @__PURE__ */ new Set([".html", ".htm", ".xhtml"]);
var TEXT = /* @__PURE__ */ new Set([
  ".txt",
  ".text",
  ".rst",
  ".adoc",
  ".asciidoc",
  ".org",
  ".tex",
  ".bib",
  ".ts",
  ".tsx",
  ".mts",
  ".cts",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".vue",
  ".svelte",
  ".astro",
  ".py",
  ".pyi",
  ".ipynb",
  ".go",
  ".rs",
  ".java",
  ".kt",
  ".kts",
  ".scala",
  ".sc",
  ".groovy",
  ".gradle",
  ".swift",
  ".m",
  ".mm",
  ".c",
  ".h",
  ".cc",
  ".cpp",
  ".cxx",
  ".hpp",
  ".hh",
  ".hxx",
  ".cs",
  ".fs",
  ".vb",
  ".rb",
  ".php",
  ".pl",
  ".pm",
  ".lua",
  ".dart",
  ".clj",
  ".cljs",
  ".ex",
  ".exs",
  ".erl",
  ".hrl",
  ".hs",
  ".ml",
  ".mli",
  ".r",
  ".jl",
  ".zig",
  ".nim",
  ".v",
  ".sol",
  ".sh",
  ".bash",
  ".zsh",
  ".fish",
  ".ps1",
  ".psm1",
  ".bat",
  ".cmd",
  ".sql",
  ".graphql",
  ".gql",
  ".proto",
  ".thrift",
  ".prisma",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".xml",
  ".xsd",
  ".plist",
  ".json",
  ".jsonc",
  ".json5",
  ".yaml",
  ".yml",
  ".toml",
  ".ini",
  ".cfg",
  ".conf",
  ".properties",
  ".cmake",
  ".mk",
  ".tf",
  ".hcl",
  ".nix",
  ".dockerfile",
  ".j2",
  ".tmpl",
  ".tpl",
  ".csv",
  ".tsv"
]);
var TEXT_BASENAMES = /* @__PURE__ */ new Set([
  "dockerfile",
  "makefile",
  "gnumakefile",
  "justfile",
  "rakefile",
  "gemfile",
  "procfile",
  "vagrantfile",
  "brewfile",
  "podfile",
  "cmakelists.txt",
  "license",
  "copying",
  "readme",
  "changelog",
  "authors",
  "notice"
]);
var LOCKFILES = /* @__PURE__ */ new Set([
  "package-lock.json",
  "npm-shrinkwrap.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "bun.lockb",
  "bun.lock",
  "cargo.lock",
  "poetry.lock",
  "pipfile.lock",
  "uv.lock",
  "gemfile.lock",
  "composer.lock",
  "go.sum",
  "flake.lock",
  "podfile.lock",
  "packages.lock.json",
  "mix.lock",
  "pubspec.lock"
]);
function isSensitiveName(name2) {
  const lower = name2.toLowerCase();
  return /^\.env(\..*)?$/.test(lower) || /^\.?(netrc|npmrc|pypirc|pgpass|htpasswd)$/.test(lower) || /^id_(rsa|dsa|ecdsa|ed25519)(\.pub)?$/.test(lower) || /\.(pem|key|p12|pfx|jks|keystore|kdbx|gpg|asc|age)$/.test(lower) || /(^|[._-])(credentials?|secrets?)([._-]|$)/.test(lower);
}
function classifyFile(path, extraExtensions = []) {
  const name2 = basename(path).toLowerCase();
  if (isSensitiveName(name2) || LOCKFILES.has(name2)) return void 0;
  if (/\.min\.(js|css)$/.test(name2) || name2.endsWith(".map")) return void 0;
  const ext = extname(name2);
  if (MARKDOWN.has(ext)) return "markdown";
  if (HTML.has(ext)) return "html";
  if (ext === ".pdf") return "pdf";
  if (ext === ".docx") return "docx";
  if (TEXT.has(ext) || TEXT_BASENAMES.has(name2)) return "text";
  if (extraExtensions.some((extra) => normalizeExtension(extra) === ext)) return "text";
  return void 0;
}
function normalizeExtension(extension) {
  const lower = extension.trim().toLowerCase();
  return lower.startsWith(".") ? lower : `.${lower}`;
}
var MAX_TEXT_BYTES = 2 * 1024 * 1024;
var SkipFile = class extends Error {
};
async function parseFile(kind, data) {
  switch (kind) {
    case "markdown":
      return { kind: "markdown", text: decodeText(data) };
    case "text":
      return { kind: "text", text: decodeText(data) };
    case "html":
      return { kind: "text", text: htmlToText(decodeText(data)) };
    case "pdf":
      return { kind: "pages", pages: await pdfPages(data) };
    case "docx":
      return { kind: "text", text: await docxText(data) };
  }
}
function decodeText(data) {
  if (data.byteLength > MAX_TEXT_BYTES) throw new SkipFile(`larger than ${MAX_TEXT_BYTES} bytes`);
  const probe = data.subarray(0, 8e3);
  if (probe.includes(0)) throw new SkipFile("binary content");
  return new TextDecoder("utf-8", { ignoreBOM: false }).decode(data);
}
function htmlToText(html) {
  return html.replace(/<(script|style|noscript|template)[\s\S]*?<\/\1>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ").replace(/<(br|\/p|\/div|\/li|\/tr|\/h[1-6]|\/section|\/article)\b[^>]*>/gi, "\n").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, "&").replace(/[ \t]+/g, " ").replace(/\n\s*\n\s*\n+/g, "\n\n");
}
async function pdfPages(data) {
  const { extractText, getDocumentProxy } = await import("./chunks/dist-EUXHUTVA.js");
  const pdf = await getDocumentProxy(new Uint8Array(data));
  try {
    const { text } = await extractText(pdf, { mergePages: false });
    const pages = Array.isArray(text) ? text : [text];
    if (pages.every((page) => page.trim() === "")) throw new SkipFile("PDF has no extractable text (scanned images need OCR)");
    return pages;
  } finally {
    await pdf.destroy?.();
  }
}
async function docxText(data) {
  const mammoth = await import("./chunks/lib-J4LNT4KZ.js");
  const extract = mammoth.extractRawText ?? mammoth.default.extractRawText;
  const result = await extract({ buffer: Buffer.from(data.buffer, data.byteOffset, data.byteLength) });
  return result.value;
}

// src/scan.ts
var import_ignore = __toESM(require_ignore(), 1);
import { lstat, opendir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
var IGNORE_FILES = [".gitignore", ".ragignore"];
async function scanSources(sources, options) {
  const files = [];
  const seen = /* @__PURE__ */ new Set();
  const excluded = new Set(options.excludeDirs);
  const missing = [];
  let oversized = 0;
  let truncated = false;
  const consider = (path, size, mtimeMs) => {
    if (seen.has(path)) return;
    const kind = classifyFile(path, options.extraExtensions);
    if (kind === void 0) return;
    if (size > options.maxFileBytes) {
      oversized += 1;
      return;
    }
    if (files.length >= options.maxFiles) {
      truncated = true;
      return;
    }
    seen.add(path);
    files.push({ path, kind, size, mtimeMs });
  };
  const walk = async (dir, layers) => {
    if (options.signal.aborted) throw options.signal.reason;
    if (truncated) return;
    const local = await loadIgnore(dir);
    const active = local === void 0 ? layers : [...layers, { dir, rules: local }];
    let handle;
    try {
      handle = await opendir(dir);
    } catch {
      return;
    }
    const entries = [];
    for await (const entry of handle) entries.push({ name: entry.name, isDir: entry.isDirectory(), isFile: entry.isFile() });
    entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDir) {
        if (excluded.has(entry.name) || isIgnored(active, path, true)) continue;
        await walk(path, active);
      } else if (entry.isFile) {
        if (isIgnored(active, path, false)) continue;
        try {
          const stats = await lstat(path);
          consider(path, stats.size, stats.mtimeMs);
        } catch {
        }
      }
    }
  };
  for (const source of sources) {
    let stats;
    try {
      stats = await lstat(source);
    } catch {
      missing.push(source);
      continue;
    }
    if (stats.isDirectory()) await walk(source, []);
    else if (stats.isFile()) consider(source, stats.size, stats.mtimeMs);
  }
  return { files, truncated, oversized, missing };
}
async function loadIgnore(dir) {
  let rules;
  for (const name2 of IGNORE_FILES) {
    let text;
    try {
      text = await readFile(join(dir, name2), "utf8");
    } catch {
      continue;
    }
    rules ??= (0, import_ignore.default)();
    rules.add(text);
  }
  return rules;
}
function isIgnored(layers, path, isDir) {
  for (const layer of layers) {
    const rel = relative(layer.dir, path).split(sep).join("/");
    if (rel === "" || rel.startsWith("..")) continue;
    if (layer.rules.ignores(isDir ? `${rel}/` : rel)) return true;
  }
  return false;
}
function isWithin(root, path) {
  return path === root || path.startsWith(root.endsWith(sep) ? root : root + sep);
}

// src/indexer.ts
var MAX_ERRORS = 20;
async function indexSources(store, embedder, options) {
  const started = Date.now();
  const { signal } = options;
  const stats = {
    scanned: 0,
    added: 0,
    updated: 0,
    unchanged: 0,
    removed: 0,
    skipped: 0,
    chunks: 0,
    oversized: 0,
    truncated: false,
    missing: [],
    errors: [],
    ms: 0
  };
  const previousEmbedder = store.getMeta("embedder");
  const embedderChanged = previousEmbedder !== void 0 && previousEmbedder !== embedder.id;
  if (embedderChanged && options.maxChanged !== void 0) {
    stats.deferred = Number.POSITIVE_INFINITY;
    return finish(stats, started);
  }
  if (options.rebuild || embedderChanged) store.clear();
  if (previousEmbedder !== embedder.id) store.setMeta({ embedder: embedder.id, dims: String(embedder.dims) });
  const scan = await scanSources(options.sources, {
    excludeDirs: options.excludeDirs,
    extraExtensions: options.extraExtensions,
    maxFiles: options.maxFiles,
    maxFileBytes: options.maxFileBytes,
    signal
  });
  stats.scanned = scan.files.length;
  stats.oversized = scan.oversized;
  stats.truncated = scan.truncated;
  stats.missing = scan.missing;
  const known = new Map(store.files().map((row) => [row.path, row]));
  const changed = [];
  for (const file of scan.files) {
    const row = known.get(file.path);
    if (row !== void 0 && row.size === file.size && row.mtimeMs === file.mtimeMs) stats.unchanged += 1;
    else changed.push(file);
  }
  const present = new Set(scan.files.map((file) => file.path));
  const gone = scan.truncated ? [] : [...known.keys()].filter((path) => !present.has(path) && options.sources.some((source) => isWithin(source, path)));
  if (options.maxChanged !== void 0 && changed.length + gone.length > options.maxChanged) {
    stats.deferred = changed.length + gone.length;
    return finish(stats, started);
  }
  if (gone.length > 0) stats.removed = store.removeFiles(gone);
  const batchTarget = Math.max(embedder.batchSize * 4, 32);
  let pending = [];
  let pendingChunks = 0;
  let done = 0;
  const flush = async () => {
    if (pending.length === 0) return;
    const inputs = [];
    for (const item of pending) {
      for (const chunk of item.chunks) inputs.push(embeddingInput(options.label(item.file.path), chunk, options.chunkChars * 2));
    }
    const vectors = [];
    for (let i = 0; i < inputs.length; i += embedder.batchSize) {
      if (signal.aborted) throw signal.reason;
      vectors.push(...await embedder.embedDocuments(inputs.slice(i, i + embedder.batchSize), signal));
    }
    let offset = 0;
    for (const item of pending) {
      const rows = item.chunks.map((chunk, index) => ({ chunk, vector: vectors[offset + index] }));
      offset += item.chunks.length;
      store.replaceFile(item.file.path, item.file.mtimeMs, item.file.size, item.sha256, rows);
      if (item.existed) stats.updated += 1;
      else stats.added += 1;
      stats.chunks += rows.length;
    }
    pending = [];
    pendingChunks = 0;
    options.progress?.(`indexed ${stats.added + stats.updated}/${changed.length} changed files (${stats.chunks} chunks)`);
  };
  for (const file of changed) {
    if (signal.aborted) throw signal.reason;
    done += 1;
    const row = known.get(file.path);
    let data;
    try {
      data = await readFile2(file.path);
    } catch (error) {
      noteError(stats, options.label(file.path), error);
      continue;
    }
    const sha256 = createHash("sha256").update(data).digest("hex");
    if (row !== void 0 && row.sha256 === sha256 && !embedderChanged && !options.rebuild) {
      store.touchFile(file.path, file.mtimeMs, file.size);
      stats.unchanged += 1;
      continue;
    }
    let chunks;
    try {
      chunks = chunkDocument(await parseFile(file.kind, data), options);
    } catch (error) {
      if (error instanceof SkipFile) stats.skipped += 1;
      else noteError(stats, options.label(file.path), error);
      continue;
    }
    if (chunks.length === 0) {
      store.replaceFile(file.path, file.mtimeMs, file.size, sha256, []);
      stats.skipped += 1;
      continue;
    }
    pending.push({ file, sha256, existed: row !== void 0, chunks });
    pendingChunks += chunks.length;
    if (pendingChunks >= batchTarget) await flush();
    else if (done % 200 === 0) options.progress?.(`parsed ${done}/${changed.length} changed files`);
  }
  await flush();
  store.setMeta({ embedder: embedder.id, dims: String(embedder.dims), updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
  return finish(stats, started);
}
function noteError(stats, label, error) {
  if (stats.errors.length < MAX_ERRORS) stats.errors.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);
}
function finish(stats, started) {
  stats.ms = Date.now() - started;
  return stats;
}

// src/retrieve.ts
function denseTopK(matrix, query, k) {
  const { ids, data, dims } = matrix;
  if (query.length !== dims || ids.length === 0 || k <= 0) return [];
  const top = [];
  let floor = Number.NEGATIVE_INFINITY;
  for (let row = 0; row < ids.length; row++) {
    const base = row * dims;
    let dot = 0;
    for (let i = 0; i < dims; i++) dot += data[base + i] * query[i];
    if (top.length < k) {
      top.push({ id: ids[row], score: dot });
      if (top.length === k) {
        top.sort((a, b) => b.score - a.score);
        floor = top[k - 1].score;
      }
    } else if (dot > floor) {
      top[k - 1] = { id: ids[row], score: dot };
      top.sort((a, b) => b.score - a.score);
      floor = top[k - 1].score;
    }
  }
  return top.sort((a, b) => b.score - a.score);
}
function reciprocalRankFusion(lists, k = 60) {
  const scores = /* @__PURE__ */ new Map();
  for (const list of lists) {
    list.forEach((id, index) => {
      scores.set(id, (scores.get(id) ?? 0) + 1 / (k + index + 1));
    });
  }
  return [...scores].map(([id, score]) => ({ id, score })).sort((a, b) => b.score - a.score || a.id - b.id);
}

// src/store.ts
import { closeSync, mkdirSync, openSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";
var SCHEMA = `
CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS files (
  id INTEGER PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  mtime_ms REAL NOT NULL,
  size INTEGER NOT NULL,
  sha256 TEXT NOT NULL,
  indexed_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS chunks (
  id INTEGER PRIMARY KEY,
  file_id INTEGER NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  ord INTEGER NOT NULL,
  start_line INTEGER NOT NULL,
  end_line INTEGER NOT NULL,
  page INTEGER,
  heading TEXT NOT NULL,
  text TEXT NOT NULL,
  vec BLOB NOT NULL
);
CREATE INDEX IF NOT EXISTS chunks_by_file ON chunks(file_id);
CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(body, content='', contentless_delete=1, tokenize='unicode61 remove_diacritics 2');
`;
var Store = class _Store {
  path;
  db;
  generation = 0;
  cached;
  statements = /* @__PURE__ */ new Map();
  constructor(path, db) {
    this.path = path;
    this.db = db;
  }
  static open(path) {
    if (path !== ":memory:") {
      mkdirSync(dirname(path), { recursive: true, mode: 448 });
      closeSync(openSync(path, "a", 384));
    }
    const db = new DatabaseSync(path);
    db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
    db.exec(SCHEMA);
    return new _Store(path, db);
  }
  close() {
    this.statements.clear();
    this.db.close();
  }
  prepare(sql) {
    let statement = this.statements.get(sql);
    if (statement === void 0) {
      statement = this.db.prepare(sql);
      this.statements.set(sql, statement);
    }
    return statement;
  }
  getMeta(key) {
    const row = this.prepare("SELECT value FROM meta WHERE key = ?").get(key);
    return row?.value;
  }
  setMeta(entries) {
    const statement = this.prepare("INSERT INTO meta(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
    this.transaction(() => {
      for (const [key, value] of Object.entries(entries)) statement.run(key, value);
    });
  }
  allMeta() {
    const rows = this.prepare("SELECT key, value FROM meta").all();
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  }
  files() {
    const rows = this.prepare("SELECT id, path, mtime_ms, size, sha256 FROM files").all();
    return rows.map((row) => ({ id: row.id, path: row.path, mtimeMs: row.mtime_ms, size: row.size, sha256: row.sha256 }));
  }
  counts() {
    const files = this.prepare("SELECT count(*) AS n FROM files").get().n;
    const chunks = this.prepare("SELECT count(*) AS n FROM chunks").get().n;
    return { files, chunks };
  }
  touchFile(path, mtimeMs, size) {
    this.prepare("UPDATE files SET mtime_ms = ?, size = ? WHERE path = ?").run(mtimeMs, size, path);
  }
  /** Atomically replace every chunk of one file. */
  replaceFile(path, mtimeMs, size, sha256, chunks) {
    this.transaction(() => {
      this.deleteFileRows(path);
      const fileId = Number(
        this.prepare("INSERT INTO files(path, mtime_ms, size, sha256, indexed_at) VALUES (?, ?, ?, ?, ?)").run(path, mtimeMs, size, sha256, (/* @__PURE__ */ new Date()).toISOString()).lastInsertRowid
      );
      const insertChunk = this.prepare(
        "INSERT INTO chunks(file_id, ord, start_line, end_line, page, heading, text, vec) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      );
      const insertFts = this.prepare("INSERT INTO chunks_fts(rowid, body) VALUES (?, ?)");
      for (const { chunk, vector } of chunks) {
        const id = insertChunk.run(
          fileId,
          chunk.ord,
          chunk.startLine,
          chunk.endLine,
          chunk.page ?? null,
          chunk.heading,
          chunk.text,
          new Uint8Array(vector.buffer, vector.byteOffset, vector.byteLength)
        ).lastInsertRowid;
        insertFts.run(id, ftsBody(path, chunk));
      }
    });
    this.generation += 1;
  }
  removeFiles(paths) {
    let removed = 0;
    this.transaction(() => {
      for (const path of paths) removed += this.deleteFileRows(path);
    });
    if (removed > 0) this.generation += 1;
    return removed;
  }
  clear() {
    this.transaction(() => {
      this.db.exec("DELETE FROM chunks_fts; DELETE FROM chunks; DELETE FROM files;");
    });
    this.generation += 1;
  }
  deleteFileRows(path) {
    const file = this.prepare("SELECT id FROM files WHERE path = ?").get(path);
    if (file === void 0) return 0;
    const ids = this.prepare("SELECT id FROM chunks WHERE file_id = ?").all(file.id);
    const deleteFts = this.prepare("DELETE FROM chunks_fts WHERE rowid = ?");
    for (const { id } of ids) deleteFts.run(id);
    this.prepare("DELETE FROM chunks WHERE file_id = ?").run(file.id);
    this.prepare("DELETE FROM files WHERE id = ?").run(file.id);
    return 1;
  }
  /** Every chunk vector as one row-major matrix, cached until the next write through this handle. */
  vectors(dims) {
    if (this.cached?.generation === this.generation && this.cached.matrix.dims === dims) return this.cached.matrix;
    const rows = this.prepare("SELECT id, vec FROM chunks ORDER BY id").all();
    const ids = new Int32Array(rows.length);
    const data = new Float32Array(rows.length * dims);
    let n = 0;
    for (const row of rows) {
      if (row.vec.byteLength !== dims * 4) continue;
      ids[n] = row.id;
      data.set(new Float32Array(row.vec.buffer.slice(row.vec.byteOffset, row.vec.byteOffset + row.vec.byteLength)), n * dims);
      n += 1;
    }
    const matrix = { ids: ids.subarray(0, n), data: data.subarray(0, n * dims), dims };
    this.cached = { generation: this.generation, matrix };
    return matrix;
  }
  /** BM25 over the bigram projection; `match` must already be a safe FTS5 expression. */
  keyword(match, limit) {
    return this.prepare("SELECT rowid AS id, bm25(chunks_fts) AS rank FROM chunks_fts WHERE chunks_fts MATCH ? ORDER BY rank LIMIT ?").all(match, limit);
  }
  chunks(ids) {
    const out = /* @__PURE__ */ new Map();
    const statement = this.prepare(
      "SELECT c.id, f.path, c.text, c.heading, c.start_line, c.end_line, c.page FROM chunks c JOIN files f ON f.id = c.file_id WHERE c.id = ?"
    );
    for (const id of ids) {
      const row = statement.get(id);
      if (row === void 0) continue;
      out.set(id, {
        id: row.id,
        path: row.path,
        text: row.text,
        heading: row.heading,
        startLine: row.start_line,
        endLine: row.end_line,
        page: row.page ?? void 0
      });
    }
    return out;
  }
  transaction(body) {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      body();
      this.db.exec("COMMIT");
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
  }
};
function ftsBody(path, chunk) {
  return toSearchText(`${path}
${chunk.heading}
${chunk.text}`);
}
var CJK_RUN = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+/gu;
function toSearchText(text) {
  return text.replace(CJK_RUN, (run) => {
    const chars = Array.from(run);
    if (chars.length === 1) return ` ${run} `;
    const grams = [];
    for (let i = 0; i + 1 < chars.length; i++) grams.push(chars[i] + chars[i + 1]);
    return ` ${grams.join(" ")} `;
  });
}
function toMatchExpression(query, maxTokens = 48) {
  const tokens = /* @__PURE__ */ new Set();
  for (const match of toSearchText(query).toLowerCase().matchAll(/[\p{L}\p{N}]+/gu)) {
    const token = match[0];
    const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(token);
    if (!cjk && token.length < 2) continue;
    tokens.add(token);
    if (tokens.size >= maxTokens) break;
  }
  if (tokens.size === 0) return void 0;
  return [...tokens].map((token) => `"${token.replaceAll('"', '""')}"${Array.from(token).length === 1 ? "*" : ""}`).join(" OR ");
}

// src/kb.ts
var WORKSPACE = "workspace";
var NAME_PATTERN = /^[a-z0-9][a-z0-9_-]{0,63}$/;
var KnowledgeBase = class {
  options;
  stores = /* @__PURE__ */ new Map();
  locks = /* @__PURE__ */ new Map();
  constructor(options) {
    this.options = options;
  }
  close() {
    for (const store of this.stores.values()) store.close();
    this.stores.clear();
  }
  /** Resolve `workspace` (relative to `cwd`) or a collection name. */
  ref(name2, cwd) {
    if (name2 === WORKSPACE) {
      const root = projectRoot(cwd);
      const id = createHash2("sha256").update(root).digest("hex").slice(0, 16);
      return { name: WORKSPACE, kind: "workspace", dbPath: join2(this.options.storageDir, "workspaces", `${id}.db`), root };
    }
    if (!NAME_PATTERN.test(name2)) {
      throw new Error(`invalid collection name ${JSON.stringify(name2)}: use lowercase letters, digits, "-" or "_" (max 64), or "workspace"`);
    }
    return { name: name2, kind: "named", dbPath: join2(this.options.storageDir, "collections", `${name2}.db`), root: void 0 };
  }
  open(ref) {
    let store = this.stores.get(ref.dbPath);
    if (store === void 0) {
      store = Store.open(ref.dbPath);
      this.stores.set(ref.dbPath, store);
    }
    return store;
  }
  exists(ref) {
    return this.stores.has(ref.dbPath) || existsSync(ref.dbPath);
  }
  /** Run `body` while holding the collection's write lock; concurrent writers fail fast. */
  async exclusive(ref, body) {
    if (this.locks.has(ref.dbPath)) throw new Error(`collection "${ref.name}" is already being indexed; wait for that run to finish`);
    const run = body();
    this.locks.set(ref.dbPath, run);
    try {
      return await run;
    } finally {
      this.locks.delete(ref.dbPath);
    }
  }
  isIndexing(ref) {
    return this.locks.has(ref.dbPath);
  }
  /** Validate an index request without touching the disk, so tools can fail before going to the background. */
  planIndex(name2, paths, cwd) {
    const ref = this.ref(name2, cwd);
    if (ref.kind === "workspace") {
      if (paths !== void 0 && paths.length > 0) throw new Error("the workspace collection always covers the whole project root; pass a collection name to index other paths");
      return { ref, sources: [ref.root] };
    }
    const existing = this.exists(ref) ? readSources(this.open(ref)) : [];
    const added = (paths ?? []).map((path) => resolvePath(path, cwd));
    for (const path of added) {
      if (!existsSync(path)) throw new Error(`path does not exist: ${path}`);
    }
    const sources = [.../* @__PURE__ */ new Set([...existing, ...added])];
    if (sources.length === 0) throw new Error(`collection "${name2}" does not exist yet; pass paths (folders or files) to create it`);
    return { ref, sources };
  }
  async index(plan, request) {
    const { ref, sources } = plan;
    return this.exclusive(ref, async () => {
      const store = this.open(ref);
      const { embedder } = this.options.backend();
      const meta = { name: ref.name, kind: ref.kind, sources: JSON.stringify(sources) };
      if (ref.root !== void 0) meta.root = ref.root;
      if (request.description !== void 0) meta.description = request.description;
      store.setMeta(meta);
      return indexSources(store, embedder, {
        ...this.options.index,
        sources,
        label: (path) => displayPath(ref, sources, path),
        rebuild: request.rebuild ?? false,
        signal: request.signal,
        ...request.progress !== void 0 ? { progress: request.progress } : {}
      });
    });
  }
  list(cwd) {
    const current = this.ref(WORKSPACE, cwd);
    const infos = [];
    const embedderId = safeEmbedderId(this.options.backend);
    for (const kind of ["workspaces", "collections"]) {
      const dir = join2(this.options.storageDir, kind);
      let names;
      try {
        names = readdirSync(dir).filter((name2) => name2.endsWith(".db")).sort();
      } catch {
        continue;
      }
      for (const file of names) {
        const dbPath = join2(dir, file);
        const store = this.stores.get(dbPath) ?? this.open({ name: file, kind: "named", dbPath, root: void 0 });
        const meta = store.allMeta();
        const counts = store.counts();
        infos.push({
          name: kind === "workspaces" ? dbPath === current.dbPath ? WORKSPACE : `${WORKSPACE}:${meta.root ?? "?"}` : file.slice(0, -3),
          kind: kind === "workspaces" ? "workspace" : "named",
          root: meta.root,
          description: meta.description ?? "",
          sources: parseSources(meta.sources),
          files: counts.files,
          chunks: counts.chunks,
          embedder: meta.embedder,
          stale: meta.embedder !== void 0 && embedderId !== void 0 && meta.embedder !== embedderId,
          updatedAt: meta.updatedAt,
          current: dbPath === current.dbPath
        });
      }
    }
    return infos;
  }
  async remove(name2, paths, cwd) {
    const ref = this.ref(name2, cwd);
    if (!this.exists(ref)) throw new Error(`collection "${name2}" does not exist`);
    return this.exclusive(ref, async () => {
      if (paths !== void 0 && paths.length > 0) {
        const store2 = this.open(ref);
        const targets = paths.map((path) => resolvePath(path, ref.root ?? cwd));
        const doomed = store2.files().map((row) => row.path).filter((path) => targets.some((target) => path === target || path.startsWith(target + sep2)));
        const removedFiles2 = store2.removeFiles(doomed);
        if (ref.kind === "named") {
          const remaining = readSources(store2).filter((source) => !targets.includes(source));
          store2.setMeta({ sources: JSON.stringify(remaining) });
        }
        return { removedFiles: removedFiles2, deleted: false };
      }
      const store = this.stores.get(ref.dbPath);
      const removedFiles = store?.counts().files ?? 0;
      store?.close();
      this.stores.delete(ref.dbPath);
      for (const suffix of ["", "-wal", "-shm"]) rmSync(ref.dbPath + suffix, { force: true });
      return { removedFiles, deleted: true };
    });
  }
  async search(query, request) {
    const notes = [];
    const backend = this.options.backend();
    const { embedder } = backend;
    const refs = this.searchTargets(request.collections, request.cwd, notes);
    const usable = [];
    for (const ref of refs) {
      const store = this.open(ref);
      const id = store.getMeta("embedder");
      if (id === void 0 || store.counts().chunks === 0) {
        notes.push(`collection "${ref.name}" is empty; run knowledge_index first`);
        continue;
      }
      if (id !== embedder.id) {
        notes.push(`collection "${ref.name}" was built with ${id} but the current backend is ${embedder.id}; rebuild it with knowledge_index (rebuild: true)`);
        continue;
      }
      if (this.isIndexing(ref)) {
        notes.push(`collection "${ref.name}" is being indexed right now; results may be incomplete`);
      } else if (this.options.search.refreshBeforeSearch) {
        await this.refresh(ref, store, request.signal, notes);
      }
      usable.push({ ref, store });
    }
    if (usable.length === 0) return { hits: [], ranking: "fusion", searched: [], notes };
    const queryVector = await embedder.embedQuery(query, request.signal);
    const match = toMatchExpression(query);
    const { candidates } = this.options.search;
    const pool = [];
    for (const { ref, store } of usable) {
      const dense = denseTopK(store.vectors(embedder.dims), queryVector, candidates).map((hit) => hit.id);
      let keyword = [];
      if (match !== void 0) {
        try {
          keyword = store.keyword(match, candidates).map((hit) => hit.id);
        } catch (error) {
          notes.push(`keyword search skipped for "${ref.name}": ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      for (const hit of reciprocalRankFusion([dense, keyword]).slice(0, candidates)) {
        pool.push({ ref, store, id: hit.id, fused: hit.score });
      }
    }
    pool.sort((a, b) => b.fused - a.fused);
    const topK = Math.max(1, Math.min(request.topK ?? this.options.search.topK, 50));
    const rows = loadRows(pool.slice(0, Math.max(topK, this.options.search.rerankCandidates)));
    const shortlist = pool.filter((candidate) => rows.has(candidate)).slice(0, Math.max(topK, this.options.search.rerankCandidates));
    const docLimit = this.options.index.chunkChars * 2;
    const docs = shortlist.map((candidate) => {
      const row = rows.get(candidate);
      const body = row.text.length > docLimit ? row.text.slice(0, docLimit) : row.text;
      return row.heading ? `${row.heading}
${body}` : body;
    });
    let ranking = "fusion";
    let ordered = shortlist.map((candidate) => ({ candidate, score: candidate.fused }));
    if (this.options.rerank && backend.reranker !== void 0 && shortlist.length > 1) {
      try {
        const hits2 = await backend.reranker.rerank(query, docs, topK, request.signal);
        ordered = hits2.map((hit) => ({ candidate: shortlist[hit.index], score: hit.score }));
        ranking = "rerank";
      } catch (error) {
        if (request.signal.aborted) throw error;
        notes.push(`rerank unavailable, results ordered by hybrid fusion: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    const hits = ordered.slice(0, topK).map(({ candidate, score }) => {
      const row = rows.get(candidate);
      const sources = parseSources(candidate.store.getMeta("sources"));
      return {
        collection: candidate.ref.name,
        path: displayPath(candidate.ref, sources, row.path),
        location: row.page !== void 0 ? `p.${row.page}` : row.startLine === row.endLine ? `${row.startLine}` : `${row.startLine}-${row.endLine}`,
        heading: row.heading,
        score: Math.round(score * 1e4) / 1e4,
        text: truncate(row.text, this.options.search.maxSnippetChars)
      };
    });
    return { hits, ranking, searched: usable.map(({ ref }) => ref.name), notes };
  }
  searchTargets(names, cwd, notes) {
    if (names !== void 0 && names.length > 0) {
      const refs2 = [];
      for (const name2 of new Set(names)) {
        const ref = this.ref(name2, cwd);
        if (this.exists(ref)) refs2.push(ref);
        else notes.push(name2 === WORKSPACE ? `the workspace ${ref.root} is not indexed yet; call knowledge_index with target "workspace" to build it` : `collection "${name2}" does not exist`);
      }
      return refs2;
    }
    const refs = [];
    const workspace = this.ref(WORKSPACE, cwd);
    if (this.exists(workspace)) refs.push(workspace);
    else notes.push(`the workspace ${workspace.root} is not indexed yet; call knowledge_index with target "workspace" to build it`);
    const dir = join2(this.options.storageDir, "collections");
    try {
      for (const file of readdirSync(dir).filter((name2) => name2.endsWith(".db")).sort()) refs.push(this.ref(file.slice(0, -3), cwd));
    } catch {
    }
    return refs;
  }
  async refresh(ref, store, signal, notes) {
    const sources = ref.kind === "workspace" ? [ref.root] : readSources(store);
    try {
      await this.exclusive(ref, async () => {
        const stats = await indexSources(store, this.options.backend().embedder, {
          ...this.options.index,
          sources,
          label: (path) => displayPath(ref, sources, path),
          maxChanged: this.options.search.maxRefreshFiles,
          signal
        });
        if (stats.deferred !== void 0) {
          notes.push(`collection "${ref.name}" has ${stats.deferred} changed files, more than the refresh limit; run knowledge_index to update it`);
        } else if (stats.added + stats.updated + stats.removed > 0) {
          notes.push(`refreshed "${ref.name}": ${stats.added} added, ${stats.updated} updated, ${stats.removed} removed`);
        }
      });
    } catch (error) {
      if (signal.aborted) throw error;
      notes.push(`could not refresh "${ref.name}": ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};
function loadRows(shortlist) {
  const byStore = /* @__PURE__ */ new Map();
  for (const candidate of shortlist) {
    const list = byStore.get(candidate.store) ?? [];
    list.push(candidate);
    byStore.set(candidate.store, list);
  }
  const rows = /* @__PURE__ */ new Map();
  for (const [store, list] of byStore) {
    const found = store.chunks(list.map((candidate) => candidate.id));
    for (const candidate of list) {
      const row = found.get(candidate.id);
      if (row !== void 0) rows.set(candidate, row);
    }
  }
  return rows;
}
function readSources(store) {
  return parseSources(store.getMeta("sources"));
}
function parseSources(value) {
  if (value === void 0) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}
function safeEmbedderId(backend) {
  try {
    return backend().embedder.id;
  } catch {
    return void 0;
  }
}
function projectRoot(cwd) {
  let dir = resolve(cwd);
  for (; ; ) {
    if (existsSync(join2(dir, ".git"))) return dir;
    const parent = dirname2(dir);
    if (parent === dir) return resolve(cwd);
    dir = parent;
  }
}
function resolvePath(path, cwd) {
  const expanded = path === "~" ? homedir() : path.startsWith("~/") ? join2(homedir(), path.slice(2)) : path;
  return resolve(cwd, expanded);
}
function displayPath(ref, sources, path) {
  if (ref.root !== void 0) return relative2(ref.root, path) || path;
  const home = homedir();
  for (const source of sources) {
    if (path.startsWith(source + sep2) && isDirectory(source)) {
      const base = source.startsWith(home + sep2) ? `~${source.slice(home.length)}` : source;
      return `${base}/${relative2(source, path)}`;
    }
  }
  return path.startsWith(home + sep2) ? `~${path.slice(home.length)}` : path;
}
function isDirectory(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}
function truncate(text, max) {
  return text.length > max ? `${text.slice(0, max)}\u2026` : text;
}

// src/index.ts
var name = "qwen-rag";
var inject = ["tools", "systemPrompt"];
var TOOL_SEARCH = "knowledge_search";
var TOOL_INDEX = "knowledge_index";
var TOOL_STATUS = "knowledge_status";
var TOOL_REMOVE = "knowledge_remove";
var PROMPT = [
  "Knowledge base: `knowledge_search` runs hybrid semantic + keyword search (Qwen embedding and rerank) over the indexed current workspace and named document collections.",
  "Before answering questions about this project's code or docs, or about documents the user has added to a collection, search first and cite passages as path:line (or path p.N for PDFs).",
  "If the workspace is not indexed yet, offer to index it with `knowledge_index`; use `knowledge_status` to list collections."
].join(" ");
function apply(ctx, config) {
  const optional = (service) => ctx.get(service);
  const apiKey = (env) => async () => {
    if (env === void 0) return void 0;
    assertCredentialName(env);
    const credentials = optional("credentials");
    const hit = await credentials?.resolve(env).catch(() => void 0);
    return hit?.value || process.env[env] || void 0;
  };
  let cachedBackend;
  const backend = () => {
    if (cachedBackend !== void 0) return cachedBackend;
    const rerankInstruct = config.rerankInstruct || void 0;
    if (config.backend === "dashscope") {
      const d = config.dashscope;
      cachedBackend = createDashScopeBackend({
        baseURL: d.baseURL,
        apiKey: apiKey(d.apiKeyEnv),
        apiKeyEnv: d.apiKeyEnv,
        embeddingModel: d.embeddingModel,
        rerankModel: d.rerankModel || void 0,
        dimensions: d.dimensions,
        batchSize: d.batchSize,
        queryInstruct: config.queryInstruct,
        rerankInstruct,
        timeoutMs: config.requestTimeoutMs
      });
    } else {
      const o = resolveOpenAICompatible(config.openaiCompatible);
      cachedBackend = createOpenAICompatibleBackend({
        name: config.openaiCompatible.preset === "local" ? "llama-server" : config.openaiCompatible.preset,
        embeddingBaseURL: o.embeddingBaseURL,
        rerankBaseURL: o.rerankBaseURL,
        apiKey: apiKey(o.apiKeyEnv),
        apiKeyEnv: o.apiKeyEnv,
        embeddingModel: o.embeddingModel,
        rerankModel: o.rerankModel,
        dimensions: o.dimensions,
        sendDimensions: o.sendDimensions,
        batchSize: o.batchSize,
        queryFormat: o.queryFormat,
        queryInstruct: config.queryInstruct,
        rerankInstruct,
        timeoutMs: config.requestTimeoutMs
      });
    }
    return cachedBackend;
  };
  const storageDir = config.storageDir ? resolvePath(config.storageDir, homedir2()) : join3(resolveDshHome(), "qwen-rag");
  const kb = new KnowledgeBase({
    storageDir,
    backend,
    index: config.index,
    search: config.search,
    rerank: config.rerank
  });
  ctx.effect(() => () => kb.close(), "qwen-rag stores");
  const cwdOf = async (exec) => {
    const workingDirectory = optional("workingDirectory");
    if (exec.agent !== void 0 && workingDirectory !== void 0) return workingDirectory.ensure(exec.agent, exec.signal);
    return process.cwd();
  };
  ctx.systemPrompt.section({ name: "tool:qwen-rag", order: 9e3, text: PROMPT });
  ctx.on("tools/pre-execute", async (exec, next) => {
    const decision = await next();
    if (decision.kind !== "allow" || exec.name !== TOOL_INDEX || config.approval === "never") return decision;
    let remote;
    let endpoint;
    try {
      const { embedder } = backend();
      remote = embedder.remote;
      endpoint = embedder.endpoint;
    } catch {
      return decision;
    }
    if (config.approval === "remote" && !remote) return decision;
    const mode = optional("sandboxPolicy")?.resolve({ session: exec.agent?.session }).mode;
    if (mode === "danger-full-access") return decision;
    const target = exec.arguments?.target;
    const what = typeof target === "string" ? target : "the requested files";
    return {
      kind: "ask",
      reason: remote ? `knowledge_index will upload the text of "${what}" to ${endpoint} to compute embeddings.` : `knowledge_index will read and index "${what}".`,
      displayReason: {
        en: remote ? `Index "${what}" by sending its text to ${endpoint} for embedding?` : `Index "${what}" into the local knowledge base?`,
        zh: remote ? `\u8981\u7D22\u5F15\u300C${what}\u300D\u5417\uFF1F\u6587\u4EF6\u5185\u5BB9\u4F1A\u53D1\u9001\u5230 ${endpoint} \u8BA1\u7B97\u5411\u91CF\u3002` : `\u8981\u628A\u300C${what}\u300D\u7D22\u5F15\u8FDB\u672C\u5730\u77E5\u8BC6\u5E93\u5417\uFF1F`
      }
    };
  });
  ctx.tools.register(defineTool({
    name: TOOL_SEARCH,
    description: "Search the knowledge base (current workspace index plus named document collections) with hybrid semantic + keyword retrieval and Qwen reranking. Returns cited passages (path:line or path p.N).",
    parameters: {
      query: { type: "string", required: true, description: "Natural-language question or keywords, in any language." },
      collections: {
        type: "array",
        items: { type: "string" },
        description: 'Limit to these collections ("workspace" = current project). Default: the current workspace plus every named collection.'
      },
      top_k: { type: "integer", description: "Number of passages to return (1-50, default from plugin config)." }
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          ranking: { type: "string", required: true },
          searched: { type: "array", items: { type: "string" }, required: true },
          notes: { type: "array", items: { type: "string" }, required: true },
          hits: {
            type: "array",
            required: true,
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                collection: { type: "string", required: true },
                path: { type: "string", required: true },
                location: { type: "string", required: true },
                heading: { type: "string", required: true },
                score: { type: "number", required: true },
                text: { type: "string", required: true }
              }
            }
          }
        }
      },
      render: (args, value) => [{ type: "text", text: renderSearch(args.query, value) }]
    },
    timeoutMs: config.search.timeoutMs,
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      const query = args.query.trim();
      if (query === "") throw new Error("query must be a non-empty string");
      const result = await kb.search(query, {
        cwd: await cwdOf(exec),
        signal: exec.signal,
        ...args.collections !== void 0 ? { collections: args.collections } : {},
        ...args.top_k !== void 0 ? { topK: args.top_k } : {}
      });
      return { ...result, hits: result.hits.map((hit) => ({ ...hit })) };
    }
  }));
  ctx.tools.register(defineTool({
    name: TOOL_INDEX,
    description: 'Build or incrementally update a knowledge-base collection. target "workspace" indexes the current project (respects .gitignore); any other name creates/updates a named collection from `paths` (folders or files: Markdown, text, code, PDF, DOCX). Runs as a background job when available.',
    parameters: {
      target: { type: "string", required: true, description: '"workspace" or a collection name (lowercase letters, digits, - or _).' },
      paths: {
        type: "array",
        items: { type: "string" },
        description: "Folders or files to add to a named collection (absolute, ~/\u2026, or relative to the working directory). Omit to refresh its existing sources."
      },
      description: { type: "string", description: "Short description stored with a named collection." },
      rebuild: { type: "boolean", description: "Drop existing vectors and re-embed everything." },
      background: { type: "boolean", description: "Run as a background job (default true when the job service is available)." }
    },
    output: {
      schema: { type: "string" },
      render: (_args, value) => [{ type: "text", text: value }]
    },
    async execute(args, exec) {
      const cwd = await cwdOf(exec);
      const plan = kb.planIndex(args.target, args.paths, cwd);
      if (kb.isIndexing(plan.ref)) throw new Error(`collection "${plan.ref.name}" is already being indexed`);
      const run = (signal, progress) => kb.index(plan, {
        signal,
        ...args.description !== void 0 ? { description: args.description } : {},
        ...args.rebuild !== void 0 ? { rebuild: args.rebuild } : {},
        ...progress !== void 0 ? { progress } : {}
      });
      const label = plan.ref.kind === "workspace" ? `workspace ${plan.ref.root}` : `collection "${plan.ref.name}"`;
      const jobs = optional("jobs");
      if (args.background !== false && jobs !== void 0 && exec.agent !== void 0) {
        try {
          const jobId = jobs.start({
            kind: "knowledge-index",
            label: `index ${label}`,
            owner: exec.agent.id,
            toolCall: { callId: exec.callId, rootCallId: exec.rootCallId },
            run(job) {
              const controller = new AbortController();
              const done = run(controller.signal, (line) => job.updateProgress(line)).then(
                (stats) => ({ status: "completed", detail: summary(stats), result: renderIndex(label, stats) }),
                (error) => controller.signal.aborted ? { status: "killed" } : { status: "failed", detail: error instanceof Error ? error.message : String(error) }
              );
              return { cancel: (reason) => controller.abort(reason), done };
            }
          });
          return `Indexing ${label} started in the background as job ${jobId}. You will be notified when it finishes; check progress with job_output or stop it with job_kill.`;
        } catch (error) {
          ctx.logger?.debug?.(`qwen-rag: background job unavailable (${String(error)}), indexing in the foreground`);
        }
      }
      return renderIndex(label, await run(exec.signal));
    }
  }));
  ctx.tools.register(defineTool({
    name: TOOL_STATUS,
    description: "List knowledge-base collections with file/chunk counts, embedding model, staleness and last update, plus the active backend.",
    parameters: {},
    output: {
      schema: { type: "string" },
      render: (_args, value) => [{ type: "text", text: value }]
    },
    isConcurrencySafe: () => true,
    async execute(_args, exec) {
      const cwd = await cwdOf(exec);
      let active;
      try {
        const current = backend();
        active = `${current.embedder.id} at ${current.embedder.endpoint}${current.reranker && config.rerank ? `; rerank ${current.reranker.id}` : "; rerank off"}`;
      } catch (error) {
        active = `misconfigured (${error instanceof Error ? error.message : String(error)})`;
      }
      return renderStatus(kb.list(cwd), active, storageDir);
    }
  }));
  ctx.tools.register(defineTool({
    name: TOOL_REMOVE,
    description: "Delete a knowledge-base collection, or only the given files/folders from it. Source files on disk are never touched.",
    parameters: {
      collection: { type: "string", required: true, description: '"workspace" or a collection name.' },
      paths: { type: "array", items: { type: "string" }, description: "Only remove these files/folders from the index." }
    },
    output: {
      schema: { type: "string" },
      render: (_args, value) => [{ type: "text", text: value }]
    },
    async execute(args, exec) {
      const result = await kb.remove(args.collection, args.paths, await cwdOf(exec));
      return result.deleted ? `Deleted collection "${args.collection}" (${result.removedFiles} files were indexed).` : `Removed ${result.removedFiles} files from collection "${args.collection}".`;
    }
  }));
}
function renderSearch(query, result) {
  const lines = [];
  if (result.hits.length === 0) {
    lines.push(`No passages found for ${JSON.stringify(query)}.`);
  } else {
    lines.push(`${result.hits.length} passages for ${JSON.stringify(query)} (${result.ranking === "rerank" ? "reranked" : "hybrid fusion order"}; searched: ${result.searched.join(", ")}):`);
    result.hits.forEach((hit, index) => {
      const where = hit.location.startsWith("p.") ? `${hit.path} ${hit.location}` : `${hit.path}:${hit.location}`;
      lines.push("", `[${index + 1}] ${where} \xB7 ${hit.collection}${hit.heading ? ` \xB7 \xA7 ${hit.heading}` : ""} \xB7 score ${hit.score}`, hit.text);
    });
  }
  if (result.notes.length > 0) lines.push("", "Notes:", ...result.notes.map((note) => `- ${note}`));
  return lines.join("\n");
}
function summary(stats) {
  return `${stats.added} added, ${stats.updated} updated, ${stats.removed} removed, ${stats.chunks} chunks`;
}
function renderIndex(label, stats) {
  const lines = [
    `Indexed ${label} in ${(stats.ms / 1e3).toFixed(1)} s: ${stats.scanned} files scanned, ${stats.added} added, ${stats.updated} updated, ${stats.unchanged} unchanged, ${stats.removed} removed, ${stats.skipped} skipped; ${stats.chunks} chunks embedded.`
  ];
  if (stats.oversized > 0) lines.push(`${stats.oversized} files exceeded index.maxFileBytes and were skipped.`);
  if (stats.truncated) lines.push("Stopped at index.maxFiles; some files were not indexed and deletions were not pruned.");
  if (stats.missing.length > 0) lines.push(`Missing sources: ${stats.missing.join(", ")}`);
  if (stats.errors.length > 0) lines.push("Errors:", ...stats.errors.map((error) => `- ${error}`));
  return lines.join("\n");
}
function renderStatus(infos, active, storageDir) {
  const lines = [`Backend: ${active}`, `Storage: ${storageDir}`];
  if (infos.length === 0) {
    lines.push('No collections yet. Index the current project with knowledge_index { target: "workspace" }.');
    return lines.join("\n");
  }
  for (const info of infos) {
    const where = info.kind === "workspace" ? info.root ?? "" : info.sources.join(", ");
    lines.push(
      `- ${info.name}${info.current ? " (current workspace)" : ""}: ${info.files} files, ${info.chunks} chunks${info.stale ? ", STALE (embedding model changed; rebuild)" : ""}; updated ${info.updatedAt ?? "never"}; ${where}${info.description ? `; ${info.description}` : ""}`
    );
  }
  return lines.join("\n");
}
export {
  Config,
  WORKSPACE,
  apply,
  inject,
  name
};

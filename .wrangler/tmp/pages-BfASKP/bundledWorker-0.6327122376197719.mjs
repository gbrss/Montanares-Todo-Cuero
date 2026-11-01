var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e2) {
    throw err = [e2], e2;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/chunks/compiler_8THfIuk0.mjs
function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}
function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) return "";
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n2 = -2; n2 <= 2; n2++) if (lines[loc.line + n2]) visibleLines.push(loc.line + n2);
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w = `> ${lineNo}`;
    if (w.length > gutterWidth) gutterWidth = w.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine) output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({ length: loc.column }).join(" ")}^
`;
  }
  return output;
}
function isAstroError(e2) {
  return e2 != null && (e2 instanceof AstroError || AstroError.is(e2));
}
function encodeHexUpperCase(data) {
  let result = "";
  for (let i2 = 0; i2 < data.length; i2++) {
    result += alphabetUpperCase[data[i2] >> 4];
    result += alphabetUpperCase[data[i2] & 15];
  }
  return result;
}
function decodeHex(data) {
  if (data.length % 2 !== 0) throw new Error("Invalid hex string");
  const result = new Uint8Array(data.length / 2);
  for (let i2 = 0; i2 < data.length; i2 += 2) {
    if (!(data[i2] in decodeMap)) throw new Error("Invalid character");
    if (!(data[i2 + 1] in decodeMap)) throw new Error("Invalid character");
    result[i2 / 2] |= decodeMap[data[i2]] << 4;
    result[i2 / 2] |= decodeMap[data[i2 + 1]];
  }
  return result;
}
function encodeBase64(bytes) {
  return encodeBase64_internal(bytes, base64Alphabet, EncodingPadding.Include);
}
function encodeBase64_internal(bytes, alphabet, padding) {
  let result = "";
  for (let i2 = 0; i2 < bytes.byteLength; i2 += 3) {
    let buffer2 = 0;
    let bufferBitSize = 0;
    for (let j = 0; j < 3 && i2 + j < bytes.byteLength; j++) {
      buffer2 = buffer2 << 8 | bytes[i2 + j];
      bufferBitSize += 8;
    }
    for (let j = 0; j < 4; j++) if (bufferBitSize >= 6) {
      result += alphabet[buffer2 >> bufferBitSize - 6 & 63];
      bufferBitSize -= 6;
    } else if (bufferBitSize > 0) {
      result += alphabet[buffer2 << 6 - bufferBitSize & 63];
      bufferBitSize = 0;
    } else if (padding === EncodingPadding.Include) result += "=";
  }
  return result;
}
function decodeBase64(encoded) {
  return decodeBase64_internal(encoded, base64DecodeMap, DecodingPadding.Required);
}
function decodeBase64_internal(encoded, decodeMap2, padding) {
  const result = new Uint8Array(Math.ceil(encoded.length / 4) * 3);
  let totalBytes = 0;
  for (let i2 = 0; i2 < encoded.length; i2 += 4) {
    let chunk = 0;
    let bitsRead = 0;
    for (let j = 0; j < 4; j++) {
      if (padding === DecodingPadding.Required && encoded[i2 + j] === "=") continue;
      if (padding === DecodingPadding.Ignore && (i2 + j >= encoded.length || encoded[i2 + j] === "=")) continue;
      if (j > 0 && encoded[i2 + j - 1] === "=") throw new Error("Invalid padding");
      if (!(encoded[i2 + j] in decodeMap2)) throw new Error("Invalid character");
      chunk |= decodeMap2[encoded[i2 + j]] << (3 - j) * 6;
      bitsRead += 6;
    }
    if (bitsRead < 24) {
      let unused;
      if (bitsRead === 12) unused = chunk & 65535;
      else if (bitsRead === 18) unused = chunk & 255;
      else throw new Error("Invalid padding");
      if (unused !== 0) throw new Error("Invalid padding");
    }
    const byteLength = Math.floor(bitsRead / 8);
    for (let i3 = 0; i3 < byteLength; i3++) {
      result[totalBytes] = chunk >> 16 - i3 * 8 & 255;
      totalBytes++;
    }
  }
  return result.slice(0, totalBytes);
}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function joinValues(array2, separator = "|") {
  return array2.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint") return value.toString();
  return value;
}
function cached(getter) {
  return new Cached(getter);
}
function nullish(input) {
  return input === null || input === void 0;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function rawShape(def) {
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  return desc?.get ? desc.get.raw : desc?.value;
}
function sourceShape(schema) {
  return rawShape(schema._zod.def) ?? schema._zod.def.shape;
}
function deferProp(target, key, getter) {
  Object.defineProperty(target, key, {
    get() {
      const value = getter();
      assignProp(this, key, value);
      return value;
    },
    enumerable: true,
    configurable: true
  });
}
function putProp(target, key, value) {
  if (key in target) assignProp(target, key, value);
  else target[key] = value;
}
function mirrorShape(target, source, keys, wrap) {
  const raw = sourceShape(source);
  for (const key of keys) {
    const desc = Object.getOwnPropertyDescriptor(raw, key);
    if (!desc.enumerable) continue;
    if (desc.get) deferProp(target, key, () => {
      const value = source._zod.def.shape[key];
      return wrap ? wrap(value, key) : value;
    });
    else putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
  }
}
function mirrorProps(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    const desc = Object.getOwnPropertyDescriptor(source, key);
    if (!desc.enumerable) continue;
    if (desc.get) deferProp(target, key, () => source[key]);
    else putProp(target, key, desc.value);
  }
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
function isPlainObject(o2) {
  if (isObject(o2) === false) return false;
  const ctor = o2.constructor;
  if (ctor === void 0) return true;
  if (typeof ctor !== "function") return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false) return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
  return true;
}
function shallowClone(o2) {
  if (isPlainObject(o2)) return { ...o2 };
  if (Array.isArray(o2)) return [...o2];
  if (o2 instanceof Map) return new Map(o2);
  if (o2 instanceof Set) return new Set(o2);
  return o2;
}
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent) cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params) return {};
  if (typeof params === "string") return { error: /* @__PURE__ */ __name(() => params, "error") };
  if (params?.message !== void 0) {
    if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string") return {
    ...params,
    error: /* @__PURE__ */ __name(() => params.error, "error")
  };
  return params;
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint") return value.toString() + "n";
  if (typeof value === "string") return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin !== void 0 && shape[k]._zod.optout === "optional";
  });
}
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
  const newShape = {};
  mirrorShape(newShape, schema, maskedKeys(schema, mask));
  return clone(schema, mergeDefs(currDef, {
    shape: newShape,
    checks: []
  }));
}
function maskedKeys(schema, mask) {
  const raw = sourceShape(schema);
  const keys = [];
  for (const key of Reflect.ownKeys(mask)) {
    if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) throw new Error(`Unrecognized key: "${String(key)}"`);
    if (mask[key]) keys.push(key);
  }
  return keys;
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
  const omitted = new Set(maskedKeys(schema, mask));
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
  return clone(schema, mergeDefs(currDef, {
    shape: newShape,
    checks: []
  }));
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
  const checks = schema._zod.def.checks;
  if (checks && checks.length > 0) {
    const existingShape = sourceShape(schema);
    for (const key of Reflect.ownKeys(shape)) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function extended(schema, shape) {
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
  mirrorProps(newShape, shape);
  return newShape;
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function merge(a2, b) {
  if (!b?._zod?.def) throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  if (a2._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const newShape = {};
  mirrorShape(newShape, a2, Reflect.ownKeys(sourceShape(a2)));
  mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
  return clone(a2, mergeDefs(a2._zod.def, {
    shape: newShape,
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: b._zod.def.checks ?? []
  }));
}
function partial(Class, schema, mask, name = "partial") {
  const checks = schema._zod.def.checks;
  if (checks && checks.length > 0) throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
  const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class && ((value, key) => selected && !selected.has(key) ? value : new Class({
    type: "optional",
    innerType: value
  })));
  return clone(schema, mergeDefs(schema._zod.def, {
    shape: newShape,
    checks: []
  }));
}
function required(Class, schema, mask) {
  const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class({
    type: "nonoptional",
    innerType: value
  }));
  return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true) return true;
  for (let i2 = startIndex; i2 < x.issues.length; i2++) if (x.issues[i2]?.continue !== true) return true;
  return false;
}
function explicitlyAborted(x, startIndex = 0) {
  if (x.aborted === true) return true;
  for (let i2 = startIndex; i2 < x.issues.length; i2++) if (x.issues[i2]?.continue === false) return true;
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a2;
    (_a2 = iss).path ?? (_a2.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function sizeCaps(defChecks) {
  const caps = [];
  for (const ch of defChecks ?? []) {
    const d = ch._zod.def;
    if (!/_(length|size)$|_equals$/.test(d.check)) break;
    const max = d.maximum ?? d.length ?? d.size;
    if (max >= 0) caps.push([max, ch]);
  }
  return caps;
}
function attachSchema(issues, start, inst) {
  var _a2;
  for (let i2 = start; i2 < issues.length; i2++) (_a2 = issues[i2]).schema ?? (_a2.schema = inst);
}
function finalizeIssue(iss, ctx, config2) {
  var _a2;
  const traits = iss.inst?._zod?.traits;
  if (traits?.has("$ZodType")) {
    if (traits.has("$ZodCheck")) (_a2 = iss).schema ?? (_a2.schema = iss.inst);
    else iss.schema = iss.inst;
  }
  const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : void 0;
  const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
  const full = {};
  for (const k of Object.keys(iss)) {
    if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__") continue;
    full[k] = iss[k];
  }
  full.path ?? (full.path = []);
  full.message = message;
  if (ctx?.reportInput) full.input = iss.input;
  return full;
}
function codePointLength(str) {
  const units2 = str.length;
  if (!highSurrogate.test(str)) return units2;
  let count = units2;
  for (let i2 = 0; i2 < units2 - 1; i2++) if ((str.charCodeAt(i2) & 64512) === 55296 && (str.charCodeAt(i2 + 1) & 64512) === 56320) {
    count--;
    i2++;
  }
  return count;
}
function getLengthableOrigin(input) {
  if (Array.isArray(input)) return "array";
  if (typeof input === "string") return "string";
  return "unknown";
}
function parsedType(data) {
  const t2 = typeof data;
  switch (t2) {
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "object": {
      if (data === null) return "null";
      if (Array.isArray(data)) return "array";
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
    }
  }
  return t2;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") return {
    message: iss,
    code: "custom",
    input,
    inst
  };
  return { ...iss };
}
function members(proto, table) {
  for (const key in table) {
    const desc = Object.getOwnPropertyDescriptor(table, key);
    if (desc.get) Object.defineProperty(proto, key, {
      ...desc,
      enumerable: false
    });
    else defineBound(proto, key, desc.value);
  }
}
function own(inst, key, value, enumerable = true) {
  Object.defineProperty(inst, key, {
    configurable: true,
    writable: true,
    enumerable,
    value
  });
  return value;
}
function hide(inst, key, value) {
  return own(inst, key, value, false);
}
// @__NO_SIDE_EFFECTS__
function derived(computes, table) {
  for (const key in computes) {
    const compute = computes[key];
    Object.defineProperty(table, key, {
      configurable: true,
      enumerable: true,
      get() {
        return own(this, key, compute(this));
      },
      set(value) {
        own(this, key, value);
      }
    });
  }
  return table;
}
function defineBound(proto, key, fn) {
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      return this == null ? fn : own(this, key, fn.bind(this));
    },
    set(value) {
      own(this, key, value);
    }
  });
}
function claim(inst, sentinel) {
  const proto = Object.getPrototypeOf(inst);
  return sentinel in proto ? void 0 : proto;
}
function defineLazyInternal(inst, key, compute) {
  const proto = Object.getPrototypeOf(inst._zod);
  if (key in proto && installing !== inst._zod) {
    installing = void 0;
    return;
  }
  installing = inst._zod;
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      Object.defineProperty(this, key, breaker);
      const outer = broke;
      broke = false;
      try {
        const value = compute(this);
        if (broke) delete this[key];
        else Object.defineProperty(this, key, {
          configurable: true,
          writable: true,
          value
        });
        broke = broke || outer;
        return value;
      } catch (err) {
        delete this[key];
        broke = broke || outer;
        throw err;
      }
    },
    set(value) {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        value
      });
    }
  });
}
function installLazyProp(inst, key, make, enumerable) {
  const proto = claim(inst, key);
  if (!proto) return;
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      const desc = {
        configurable: true,
        writable: true,
        enumerable,
        value: void 0
      };
      Object.defineProperty(this, key, desc);
      desc.value = make(this);
      Object.defineProperty(this, key, desc);
      return desc.value;
    },
    set(value) {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable,
        value
      });
    }
  });
}
function constantCatch(value) {
  const fn = /* @__PURE__ */ __name(() => value, "fn");
  fn[CONSTANT_CATCH] = true;
  return fn;
}
function newError(Definition) {
  const E = _E;
  if (E) {
    const saved = E.stackTraceLimit;
    if (typeof saved === "number") {
      try {
        E.stackTraceLimit = 0;
      } catch {
        _E = null;
        return new Definition();
      }
      try {
        return new Definition();
      } finally {
        E.stackTraceLimit = saved;
      }
    }
  }
  return new Definition();
}
// @__NO_SIDE_EFFECTS__
function $constructor(name, initializer2, proto, params) {
  const zodProto = {};
  function Internals(def) {
    this.def = def;
    this.constr = _;
    this.traits = /* @__PURE__ */ new Set();
  }
  __name(Internals, "Internals");
  Internals.prototype = zodProto;
  const protoMembers = proto;
  const initialized = protoMembers && /* @__PURE__ */ new WeakSet();
  function init(inst, def) {
    if (!inst._zod) {
      _zodDesc.value = new Internals(def);
      try {
        Object.defineProperty(inst, "_zod", _zodDesc);
      } finally {
        _zodDesc.value = void 0;
      }
    } else if (inst._zod.traits.has(name)) return;
    inst._zod.traits.add(name);
    initializer2(inst, def);
    if (initialized) {
      const own2 = Object.getPrototypeOf(inst);
      const ctorProto = inst._zod.constr.prototype;
      let up = own2;
      while (up && up !== ctorProto) up = Object.getPrototypeOf(up);
      const target = up ?? own2;
      if (!initialized.has(target)) {
        initialized.add(target);
        members(target, protoMembers);
      }
    }
    const proto2 = _.prototype;
    for (const k in proto2) {
      if (!Object.prototype.hasOwnProperty.call(proto2, k)) continue;
      if (!(k in inst)) inst[k] = proto2[k].bind(inst);
    }
  }
  __name(init, "init");
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
    static {
      __name(this, "Definition");
    }
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    const inst = params?.Parent ? newError(Definition) : this;
    init(inst, def);
    const deferred = inst._zod.deferred;
    if (deferred) {
      for (const fn of deferred) fn();
      inst._zod.deferred = void 0;
    }
    const pp = globalThis.__zod_globalConfig?.postProcessor;
    if (pp) pp(inst);
    return inst;
  }
  __name(_, "_");
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, { value: /* @__PURE__ */ __name((inst) => {
    if (params?.Parent && inst instanceof params.Parent) return true;
    return inst?._zod?.traits?.has(name);
  }, "value") });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
function config(newConfig) {
  if (newConfig) Object.assign(globalConfig, newConfig);
  return globalConfig;
}
function _getMessage() {
  const internals = this._zod;
  internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
  return internals.message;
}
function _setMessage(value) {
  this._zod.message = value;
}
function node(obj, key, make) {
  if (!Object.prototype.hasOwnProperty.call(obj, key)) {
    if (key === "__proto__") Object.defineProperty(obj, key, {
      value: make(),
      writable: true,
      enumerable: true,
      configurable: true
    });
    else obj[key] = make();
  }
  return obj[key];
}
function flattenError(error3, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error3.issues) if (sub.path.length > 0) node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
  else formErrors.push(mapper(sub));
  return {
    formErrors,
    fieldErrors
  };
}
function formatError(error3, mapper = (issue2) => issue2.message) {
  const fieldErrors = { _errors: [] };
  const processError = /* @__PURE__ */ __name((error4, path = []) => {
    for (const issue2 of error4.issues) if (issue2.code === "invalid_union" && issue2.errors.length) issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
    else if (issue2.code === "invalid_key") processError({ issues: issue2.issues }, [...path, ...issue2.path]);
    else if (issue2.code === "invalid_element") processError({ issues: issue2.issues }, [...path, ...issue2.path]);
    else {
      const fullpath = [...path, ...issue2.path];
      if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue2));
      else {
        let curr = fieldErrors;
        let i2 = 0;
        while (i2 < fullpath.length) {
          const el = fullpath[i2];
          const terminal = i2 === fullpath.length - 1;
          if (el === "_errors") {
            if (terminal) curr._errors.push(mapper(issue2));
            i2++;
            continue;
          }
          if (!Object.prototype.hasOwnProperty.call(curr, el)) Object.defineProperty(curr, el, {
            value: { _errors: [] },
            enumerable: true,
            writable: true,
            configurable: true
          });
          const node2 = curr[el];
          if (terminal) node2._errors.push(mapper(issue2));
          curr = node2;
          i2++;
        }
      }
    }
  }, "processError");
  processError(error3);
  return fieldErrors;
}
function finalizeParams(callee, params) {
  return {
    callee: params?.callee ?? callee,
    Err: params?.Err
  };
}
function failure(Err, issues, ctx) {
  let error3;
  return {
    success: false,
    get error() {
      if (!error3) {
        error3 = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
        issues = void 0;
        ctx = void 0;
      }
      return error3;
    },
    set error(e2) {
      error3 = e2;
      issues = void 0;
      ctx = void 0;
    }
  };
}
function validateFallback(schema, value, _ctx) {
  const ctx = _ctx ? {
    ..._ctx,
    async: false,
    abortEarly: true
  } : {
    async: false,
    abortEarly: true
  };
  const fallbackRun = schema._zod.bag.fallbackRun;
  let result;
  if (fallbackRun) {
    ctx[COMPILE_FALLBACK] = true;
    result = fallbackRun({
      value,
      issues: []
    }, ctx);
  } else result = schema._zod.run({
    value,
    issues: []
  }, ctx);
  if (result instanceof Promise) throw new $ZodAsyncError();
  return result.issues.length === 0;
}
function nanoidOfLength(length) {
  return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
}
function emoji() {
  return new RegExp(_emoji$1, "u");
}
function anchor(source) {
  return new RegExp(`^${source}$`);
}
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const opts = ["Z"];
  if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const qualified = `${timeSource({
    precision: args.precision,
    seconds: true
  })}(?:${opts.join("|")})`;
  const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
async function validateAsync(inst, value) {
  const ctx = { async: true };
  return toStandardResult(await inst._zod.run({
    value,
    issues: []
  }, ctx), ctx);
}
function standardProps(inst) {
  return {
    validate: /* @__PURE__ */ __name((value) => {
      const ctx = { async: false };
      try {
        const r2 = inst._zod.run({
          value,
          issues: []
        }, ctx);
        if (!(r2 instanceof Promise)) return toStandardResult(r2, ctx);
      } catch (_) {
      }
      return validateAsync(inst, value);
    }, "validate"),
    vendor: "zod",
    version: 1
  };
}
function canParseURL(input) {
  try {
    if (typeof URL !== "undefined" && typeof URL.canParse === "function") return URL.canParse(input);
    new URL(input);
    return true;
  } catch {
    return false;
  }
}
function validateURL(trimmed, def) {
  if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) return canParseURL(trimmed) || 2;
  return parseURLObject(trimmed, def);
}
function parseURLObject(trimmed, def) {
  if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) return 1;
  try {
    if (typeof URL !== "undefined") {
      const URLStatic = URL;
      if (typeof URLStatic.parse === "function") return URLStatic.parse(trimmed) ?? 2;
    }
    return new URL(trimmed);
  } catch {
    return 2;
  }
}
function stripTabAndNewline(value) {
  return value.replace(asciiTabOrNewline, "");
}
function urlHostnameOk(url, hostname) {
  hostname.lastIndex = 0;
  return hostname.test(url.hostname);
}
function urlProtocolOk(url, protocol) {
  protocol.lastIndex = 0;
  return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
}
function isValidIPv6(value) {
  if (!ipv6Alphabet.test(value)) return false;
  return canParseURL(`http://[${value}]`);
}
function isValidCIDRv6(value) {
  const parts = value.split("/");
  if (parts.length !== 2) return false;
  const [address, prefix] = parts;
  if (!prefix) return false;
  const prefixNum = Number(prefix);
  if (`${prefixNum}` !== prefix) return false;
  if (prefixNum < 0 || prefixNum > 128) return false;
  return isValidIPv6(address);
}
function isValidBase64(data) {
  if (data === "") return true;
  if (/\s/.test(data)) return false;
  if (data.length % 4 !== 0) return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
function isValidBase64URL(data) {
  if (!base64urlCharset.test(data)) return false;
  const base642 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  return isValidBase64(base642.padEnd(Math.ceil(base642.length / 4) * 4, "="));
}
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3) return false;
    const [header] = tokensParts;
    if (!header) return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
    if (!parsedHeader.alg) return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
    return true;
  } catch {
    return false;
  }
}
function capSize(inst, size) {
  const caps = sizeCaps(inst._zod.def.checks);
  if (!caps.length) return;
  const cap = Math.min(...caps.map((c) => c[0]));
  const parse3 = inst._zod.parse;
  inst._zod.parse = (payload, ctx) => {
    const n2 = size(payload.value);
    if (n2 > cap && !ctx?.skipChecks && ctx?.direction !== "backward") {
      for (const [max, ch] of sizeCaps(inst._zod.def.checks)) if (n2 > max && ch._zod.def.when(payload)) {
        const start = payload.issues.length;
        ch._zod.check(payload);
        payload.issues[start].continue = false;
        attachSchema(payload.issues, start, inst);
        return payload;
      }
    }
    return parse3(payload, ctx);
  };
}
function handleArrayResult(result, final, index) {
  if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
  final.value[index] = result.value;
}
function handlePropertyResult(result, final, key, input, optin, optout) {
  const isPresent = key in input;
  const isOptionalOut = optout === "optional";
  if (!isPresent && isOptionalOut && optin === "optional") return;
  if (result.issues.length) {
    if (optin !== void 0 && isOptionalOut && !isPresent) return;
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (!isPresent && optin === void 0) {
    if (!result.issues.length) final.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: void 0,
      path: [key]
    });
    return;
  }
  if (result.value === void 0) {
    if (isPresent || optin === "defaulted" && !isOptionalOut) final.value[key] = void 0;
  } else final.value[key] = result.value;
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  const ownSymbols = Object.getOwnPropertySymbols(def.shape);
  const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
  const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
  for (const k of allKeys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    allKeys,
    symbolKeys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t2 = _catchall.def.type;
  const optin = _catchall.optin;
  const optout = _catchall.optout;
  let seen = 0;
  for (const key in input) {
    if (abortEarly && payload.issues.length !== seen) {
      if (aborted(payload, seen)) break;
      seen = payload.issues.length;
    }
    if (keySet.has(key)) continue;
    if (key === "__proto__") {
      if (t2 === "never") unrecognized.push(key);
      continue;
    }
    if (t2 === "never") {
      unrecognized.push(key);
      continue;
    }
    const r2 = _catchall.run({
      value: input[key],
      issues: []
    }, ctx);
    if (r2 instanceof Promise) proms.push(r2.then((r3) => handlePropertyResult(r3, payload, key, input, optin, optout)));
    else handlePropertyResult(r2, payload, key, input, optin, optout);
  }
  if (unrecognized.length) payload.issues.push({
    code: "unrecognized_keys",
    keys: unrecognized,
    input,
    inst,
    continue: true
  });
  if (!proms.length) return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) if (result.issues.length === 0) {
    final.value = result.value;
    return final;
  }
  const nonaborted = results.filter((r2) => !aborted(r2));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
function mergeValues(a2, b) {
  if (a2 === b) return {
    valid: true,
    data: a2
  };
  if (a2 instanceof Date && b instanceof Date && +a2 === +b) return {
    valid: true,
    data: a2
  };
  if (isPlainObject(a2) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a2).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = {
      ...a2,
      ...b
    };
    if (Object.prototype.hasOwnProperty.call(newObj, "__proto__")) delete newObj.__proto__;
    for (const key of sharedKeys) {
      if (key === "__proto__") continue;
      const sharedValue = mergeValues(a2[key], b[key]);
      if (!sharedValue.valid) return {
        valid: false,
        mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
      };
      newObj[key] = sharedValue.data;
    }
    return {
      valid: true,
      data: newObj
    };
  }
  if (Array.isArray(a2) && Array.isArray(b)) {
    if (a2.length !== b.length) return {
      valid: false,
      mergeErrorPath: []
    };
    const newArray = [];
    for (let index = 0; index < a2.length; index++) {
      const itemA = a2[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) return {
        valid: false,
        mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
      };
      newArray.push(sharedValue.data);
    }
    return {
      valid: true,
      data: newArray
    };
  }
  return {
    valid: false,
    mergeErrorPath: []
  };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = /* @__PURE__ */ new Map();
  let unrecIssue;
  const keyIssues = /* @__PURE__ */ new Map();
  const collect = /* @__PURE__ */ __name((iss, side) => {
    let keys;
    if (iss.code === "unrecognized_keys" && !iss.path?.length) {
      unrecIssue ?? (unrecIssue = iss);
      keys = iss.keys;
    } else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
      const k = String(iss.path[0]);
      if (!keyIssues.has(k)) keyIssues.set(k, iss);
      keys = [k];
    } else return false;
    for (const k of keys) {
      if (!unrecKeys.has(k)) unrecKeys.set(k, {});
      unrecKeys.get(k)[side] = true;
    }
    return true;
  }, "collect");
  for (const iss of left.issues) if (!collect(iss, "l")) result.issues.push(iss);
  for (const iss of right.issues) if (!collect(iss, "r")) result.issues.push(iss);
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length) {
    const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
    if (aggregated.length) result.issues.push({
      ...unrecIssue,
      keys: aggregated
    });
    for (const k of bothKeys) if (!aggregated.includes(k) && keyIssues.has(k)) result.issues.push(keyIssues.get(k));
  }
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    if (aborted(result)) return result;
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
function handleOptionalResult(payload, result) {
  payload.value = result.issues.length ? void 0 : result.value;
  return payload;
}
function handleDefaultResult(payload, def) {
  if (payload.value === void 0) payload.value = def.defaultValue;
  return payload;
}
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === void 0) payload.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: payload.value,
    inst
  });
  return payload;
}
function handleCatchResult(payload, result, def, ctx) {
  if (!result.issues.length) {
    payload.value = result.value;
    if (result.memo) payload.memo = true;
    return payload;
  }
  payload.value = def.catchValue({
    ...result,
    value: payload.value,
    error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
    input: payload.value
  });
  return payload;
}
function handlePipeResult(left, next, ctx) {
  if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({
    value: left.value,
    issues: left.issues
  }, ctx);
}
function handleReadonlyResult(payload) {
  if (!payload.memo) payload.value = Object.freeze(payload.value);
  return payload;
}
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      path: [...inst._zod.def.path ?? []],
      continue: !inst._zod.def.abort
    };
    if (inst._zod.def.params) _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
function isRef(value) {
  return value !== null && typeof value === "object";
}
function cloneIssues(issues) {
  return issues.map((iss) => iss.path ? {
    ...iss,
    path: iss.path.slice()
  } : { ...iss });
}
function isRecursive(inst, stack, resolve) {
  const cached2 = recursive.get(inst);
  if (cached2 !== void 0) return cached2 ? PROVEN : NONE;
  if (stack.has(inst)) return PROVEN;
  stack.add(inst);
  let result = NONE;
  const check = /* @__PURE__ */ __name((child) => {
    if (result !== PROVEN && child?._zod) {
      const answer = isRecursive(child, stack, resolve);
      if (answer > result) result = answer;
    }
  }, "check");
  const shape = /* @__PURE__ */ __name((sh, spread) => {
    let answer = NONE;
    for (const key of Reflect.ownKeys(sh)) {
      const desc = Object.getOwnPropertyDescriptor(sh, key);
      if (spread && !desc.enumerable) continue;
      const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
      if (child > answer) answer = child;
    }
    return answer;
  }, "shape");
  const merge2 = /* @__PURE__ */ __name((answer) => {
    if (answer > result) result = answer;
  }, "merge");
  const def = inst._zod.def;
  switch (def.type) {
    case "object": {
      const raw = rawShape(def);
      merge2(raw ? shape(raw, true) : ASSUMED);
      check(def.catchall);
      break;
    }
    case "array":
      check(def.element);
      break;
    case "tuple":
      for (const el of def.items) check(el);
      check(def.rest);
      break;
    case "record":
    case "map":
      check(def.keyType);
      check(def.valueType);
      break;
    case "set":
      check(def.valueType);
      break;
    case "union":
      for (const el of def.options) check(el);
      break;
    case "intersection":
      check(def.left);
      check(def.right);
      break;
    case "optional":
    case "nullable":
    case "default":
    case "prefault":
    case "catch":
    case "readonly":
    case "nonoptional":
    case "promise":
    case "success":
      check(def.innerType);
      break;
    case "pipe":
      check(def.in);
      check(def.out);
      break;
    case "function":
      check(def.input);
      check(def.output);
      break;
    case "lazy": {
      const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : void 0);
      merge2(inner ? isRecursive(inner, stack, false) : ASSUMED);
      break;
    }
    case "template_literal":
    case "string":
    case "number":
    case "int":
    case "boolean":
    case "bigint":
    case "symbol":
    case "undefined":
    case "null":
    case "void":
    case "never":
    case "any":
    case "unknown":
    case "date":
    case "nan":
    case "enum":
    case "literal":
    case "file":
    case "transform":
    case "custom":
      break;
    default:
      for (const key in def) {
        const desc = Object.getOwnPropertyDescriptor(def, key);
        if (!desc || desc.get) continue;
        const value = desc.value;
        if (!value || typeof value !== "object") continue;
        if (value._zod) check(value);
        else if (Array.isArray(value)) for (const el of value) check(el);
      }
  }
  stack.delete(inst);
  return settle(inst, result);
}
function settle(inst, answer) {
  if (answer !== ASSUMED) recursive.set(inst, answer === PROVEN);
  return answer;
}
function bucketFor(state, inst) {
  let bucket = state.buckets.get(inst);
  if (!bucket) {
    bucket = /* @__PURE__ */ new WeakMap();
    state.buckets.set(inst, bucket);
  }
  return bucket;
}
function memoizer() {
  return memo;
}
function isBackEdge(ctx, value) {
  const backEdges = ctx[STATE]?.backEdges;
  return backEdges !== void 0 && isRef(value) && backEdges.has(value);
}
function en_default() {
  return { localeError: error() };
}
function registry() {
  return new $ZodRegistry();
}
function snapshotChecks(def) {
  if (def.checks) def.checks = [...def.checks];
  return def;
}
// @__NO_SIDE_EFFECTS__
function _string(Class, params) {
  return new Class(snapshotChecks({
    type: "string",
    ...normalizeParams(params)
  }));
}
// @__NO_SIDE_EFFECTS__
function _email(Class, params) {
  return new Class({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _guid(Class, params) {
  return new Class({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _url(Class, params) {
  return new Class({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _emoji(Class, params) {
  return new Class({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class, params) {
  return new Class({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid(Class, params) {
  return new Class({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class, params) {
  return new Class({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class, params) {
  return new Class({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _xid(Class, params) {
  return new Class({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class, params) {
  return new Class({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class, params) {
  return new Class({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class, params) {
  return new Class({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64(Class, params) {
  return new Class({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class, params) {
  return new Class({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _e164(Class, params) {
  return new Class({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class, params) {
  return new Class({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class, params) {
  return new Class({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class, params) {
  return new Class({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class, params) {
  return new Class({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class, params) {
  return new Class({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class) {
  return new Class({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function _never(Class, params) {
  return new Class({
    type: "never",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
  return new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
  return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
  return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
  return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
  return new Class({
    type: "array",
    element,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _custom(Class, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  return new Class({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
}
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
  return new Class({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
  const ch = /* @__PURE__ */ _check((payload) => {
    payload.addIssue = (issue$2) => {
      if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
      else {
        const _issue = issue$2;
        if (_issue.fatal) _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        if (!("input" in _issue)) _issue.input = payload.value;
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  }, params);
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
function assignProps(target, ...sources) {
  for (const source of sources) for (const key of Reflect.ownKeys(source)) if (Object.prototype.propertyIsEnumerable.call(source, key)) assignProp(target, key, source[key]);
  return target;
}
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4") target = "draft-04";
  if (target === "draft-7") target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {
    }),
    io: params?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    sharedDefsExtractedFor: void 0,
    sharedEmitDoneFor: void 0,
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    intersections: [],
    deferred: [],
    external: params?.external ?? void 0
  };
}
function handleUnrepresentable(schema, ctx, json, params, message) {
  const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({
    zodSchema: schema,
    path: params.path,
    message
  }) : ctx.unrepresentable;
  if (result === "any") return false;
  if (result === void 0 || result === "throw") throw new Error(message);
  Object.assign(json, result);
  return true;
}
function processSchema(schema, ctx, _params = {
  path: [],
  schemaPath: []
}) {
  var _a2;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
    return seen.schema;
  }
  const result = {
    schema: {},
    count: 1,
    cycle: void 0,
    path: _params.path
  };
  ctx.seen.set(schema, result);
  ctx.sharedDefsExtractedFor = void 0;
  ctx.sharedEmitDoneFor = void 0;
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) result.schema = overrideSchema;
  else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
    else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref) result.ref = parent;
      processSchema(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta = ctx.metadataRegistry.get(schema);
  if (meta) assignProps(result.schema, meta);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && "_prefault" in result.schema) (_a2 = result.schema).default ?? (_a2.default = result.schema._prefault);
  delete result.schema._prefault;
  return ctx.seen.get(schema).schema;
}
function encodeJSONPointerSegment(segment) {
  return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
  if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external) return;
  const idToSchema = /* @__PURE__ */ new Map();
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = /* @__PURE__ */ __name((entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
      if (externalId) return { ref: uriGenerator(externalId) };
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return {
        defId: id,
        ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}`
      };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    if (entry[1] === root && !entry[1].schema.id) return { ref: uriPrefix };
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return {
      defId,
      ref: defUriPrefix + encodeJSONPointerSegment(defId)
    };
  }, "makeURI");
  const extractToDef = /* @__PURE__ */ __name((entry) => {
    if (entry[1].schema.$ref) return;
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId) seen.defId = defId;
    const schema2 = seen.schema;
    for (const key in schema2) delete schema2[key];
    schema2.$ref = ref;
  }, "extractToDef");
  if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    if (ctx.metadataRegistry.get(entry[0])?.id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") extractToDef(entry);
    }
  }
  if (ctx.external) ctx.sharedDefsExtractedFor = ctx.external;
}
function compactTypeUnion(schema) {
  const options = schema.anyOf;
  if (!Array.isArray(options) || options.length === 0 || schema.type !== void 0) return;
  const types = [];
  for (const option of options) {
    if (!option || typeof option !== "object") return;
    compactTypeUnion(option);
    const keys = Object.keys(option);
    if (keys.length !== 1 || keys[0] !== "type") return;
    const type = option.type;
    for (const member of Array.isArray(type) ? type : [type]) {
      if (typeof member !== "string") return;
      if (!types.includes(member)) types.push(member);
    }
  }
  delete schema.anyOf;
  schema.type = types.length === 1 ? types[0] : types;
}
function undeclaredConstraint(member) {
  const extra = member.additionalProperties;
  if (extra === void 0 || extra === false || typeof extra !== "object" || extra === null) return null;
  return Object.keys(extra).length ? extra : null;
}
function foldObjects(members2) {
  const objects = [];
  for (const member of members2) {
    if (typeof member !== "object" || member.type !== "object") return null;
    for (const key in member) if (!FOLDABLE_KEYS.has(key)) return null;
    objects.push(member);
  }
  const properties = {};
  const required2 = /* @__PURE__ */ new Set();
  for (const object2 of objects) {
    for (const key in object2.properties) {
      if (Object.prototype.hasOwnProperty.call(properties, key)) continue;
      const parts = [];
      for (const other of objects) {
        const part = other.properties?.[key] ?? undeclaredConstraint(other);
        if (part === null || part === void 0) continue;
        if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part))) parts.push(part);
      }
      assignProp(properties, key, parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts });
    }
    for (const key of object2.required ?? []) required2.add(key);
  }
  const folded = {
    type: "object",
    properties
  };
  if (required2.size) folded.required = [...required2];
  if (objects.every((object2) => object2.additionalProperties === false)) folded.additionalProperties = false;
  else {
    const constraints = [];
    for (const object2 of objects) {
      const constraint = undeclaredConstraint(object2);
      if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint))) constraints.push(constraint);
    }
    if (constraints.length === 1) folded.additionalProperties = constraints[0];
    else if (constraints.length > 1) folded.additionalProperties = { allOf: constraints };
  }
  return folded;
}
function foldIntersection(json) {
  const allOf = json.allOf;
  if (!Array.isArray(allOf) || allOf.length < 2) return;
  for (const key of FOLDABLE_KEYS) if (key in json) return;
  const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
  let folded = null;
  if (!unions.length) folded = foldObjects(allOf);
  else {
    const union2 = unions[0];
    const keyword = UNION_KEYS.find((k) => Array.isArray(union2[k]));
    if (Object.keys(union2).length !== 1) return;
    const rest = allOf.filter((m) => m !== union2);
    const branches = union2[keyword].map((branch) => foldObjects([...rest, branch]));
    if (branches.some((b) => !b)) return;
    folded = { [keyword]: branches };
  }
  if (!folded) return;
  delete json.allOf;
  assignProps(json, folded);
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = /* @__PURE__ */ __name((zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null) return;
    const schema2 = seen.def ?? seen.schema;
    const _cached = { ...schema2 };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema2.allOf = schema2.allOf ?? [];
        schema2.allOf.push(refSchema);
      } else assignProps(schema2, refSchema);
      assignProps(schema2, _cached);
      if (zodSchema._zod.parent === ref) for (const key in schema2) {
        if (key === "$ref" || key === "allOf") continue;
        if (!(key in _cached)) delete schema2[key];
      }
      if (refSchema.$ref && refSeen.def) for (const key in schema2) {
        if (key === "$ref" || key === "allOf") continue;
        if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) delete schema2[key];
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema2.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) for (const key in schema2) {
          if (key === "$ref" || key === "allOf") continue;
          if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) delete schema2[key];
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
      path: seen.path ?? []
    });
  }, "flattenRef");
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
    for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
    if (ctx.target !== "openapi-3.0") for (const entry of ctx.seen.entries()) compactTypeUnion(entry[1].def ?? entry[1].schema);
    for (const rewrite of ctx.deferred) rewrite();
    if (ctx.intersections.length) {
      const carriers = /* @__PURE__ */ new Map();
      for (const seen of ctx.seen.values()) for (const json of [seen.schema, seen.def]) {
        const allOf = json?.allOf;
        if (!Array.isArray(allOf)) continue;
        const existing = carriers.get(allOf);
        if (existing) existing.push(json);
        else carriers.set(allOf, [json]);
      }
      for (const allOf of ctx.intersections) for (const json of carriers.get(allOf) ?? []) foldIntersection(json);
    }
  }
  const result = {};
  if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
  else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
  else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
  else if (ctx.target === "openapi-3.0") {
  }
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id) throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
  const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
  if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
  const defs = ctx.external?.defs ?? {};
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      if (seen.def.id === seen.defId) delete seen.def.id;
      assignProp(defs, seen.defId, seen.def);
    }
  }
  if (ctx.external) ctx.sharedEmitDoneFor = ctx.external;
  if (ctx.external) {
  } else if (Object.keys(defs).length > 0) {
    if (ctx.target === "draft-2020-12") result.$defs = defs;
    else result.definitions = defs;
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema)) return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform") return true;
  if (def.type === "array") return isTransforming(def.element, ctx);
  if (def.type === "set") return isTransforming(def.valueType, ctx);
  if (def.type === "lazy") return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") return isTransforming(def.innerType, ctx);
  if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  if (def.type === "pipe") {
    if (_schema._zod.traits.has("$ZodCodec")) return true;
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) if (isTransforming(option, ctx)) return true;
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) if (isTransforming(item, ctx)) return true;
    if (def.rest && isTransforming(def.rest, ctx)) return true;
    return false;
  }
  return false;
}
function aggregateChecks(schema) {
  const agg = {};
  const def = schema._zod.def;
  const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
  for (const ch of list) contributors[ch._zod.def.check]?.(agg, ch._zod.def);
  const bag = schema._zod.bag;
  if (bag.minimum !== void 0) narrowMin(agg, "minimum", bag.minimum);
  if (bag.exclusiveMinimum !== void 0) narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
  if (bag.maximum !== void 0) narrowMax(agg, "maximum", bag.maximum);
  if (bag.exclusiveMaximum !== void 0) narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
  if (bag.multipleOf !== void 0) addDivisor(agg, bag.multipleOf);
  if (bag.format !== void 0) {
    agg.format ?? (agg.format = bag.format);
    if (bag.format.includes("int")) agg.isInt = true;
  }
  if (bag.mime) intersectMime(agg, bag.mime);
  for (const pattern of bag.patterns ?? []) addPattern(agg, pattern);
  return agg;
}
function inputOptin(schema) {
  const def = schema._zod.def;
  if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) return inputOptin(def.out);
  if (def.type === "catch") return inputOptin(def.innerType);
  return schema._zod.optin;
}
function serializeDefaultValue(value, schema, ctx, json, params) {
  let unrepresentable = false;
  const serialized = JSON.stringify(value, (_, val) => {
    if (typeof val !== "bigint") return val;
    unrepresentable = true;
    return null;
  });
  if (!unrepresentable) return JSON.parse(serialized);
  handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
  return UNREPRESENTABLE_DEFAULT;
}
function _lazyMethod(proto, key, make) {
  Object.defineProperty(proto, key, {
    configurable: true,
    enumerable: false,
    get() {
      const value = make(this);
      Object.defineProperty(this, key, {
        value,
        configurable: true,
        writable: true
      });
      return value;
    },
    set(value) {
      Object.defineProperty(this, key, {
        value,
        configurable: true,
        writable: true
      });
    }
  });
}
function _ensureDefaultLocale() {
  if (!globalConfig.localeError) config(en_default());
}
function _ensureDefaultMemoizer() {
  if (!globalConfig.memoizer) config({ memoizer: memoizer() });
}
function string(params) {
  return /* @__PURE__ */ _string(ZodString, params);
}
function unknown() {
  return /* @__PURE__ */ _unknown(ZodUnknown);
}
function never(params) {
  return /* @__PURE__ */ _never(ZodNever, params);
}
function array(element, params) {
  return /* @__PURE__ */ _array(ZodArray, element, params);
}
function object(shape, params) {
  return new ZodObject({
    type: "object",
    shape: shape ?? {},
    ...normalizeParams(params)
  });
}
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
function _enum(values, params) {
  return new ZodEnum({
    type: "enum",
    entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
    ...normalizeParams(params)
  });
}
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
function _default(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
function _catch(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
  });
}
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
  });
}
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
function custom(fn, _params) {
  return /* @__PURE__ */ _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
  return /* @__PURE__ */ _superRefine(fn, params);
}
async function decodeKey(encoded) {
  const bytes = decodeBase64(encoded);
  return crypto.subtle.importKey("raw", bytes.buffer, ALGORITHM, true, ["encrypt", "decrypt"]);
}
async function encryptString(key, raw, additionalData) {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH / 2));
  const data = encoder$1.encode(raw);
  const params = {
    name: ALGORITHM,
    iv
  };
  if (additionalData) params.additionalData = encoder$1.encode(additionalData);
  const buffer2 = await crypto.subtle.encrypt(params, key, data);
  return encodeHexUpperCase(iv) + encodeBase64(new Uint8Array(buffer2));
}
async function decryptString(key, encoded, additionalData) {
  const iv = decodeHex(encoded.slice(0, IV_LENGTH));
  const dataArray = decodeBase64(encoded.slice(IV_LENGTH));
  const params = {
    name: ALGORITHM,
    iv
  };
  if (additionalData) params.additionalData = encoder$1.encode(additionalData);
  const decryptedBuffer = await crypto.subtle.decrypt(params, key, dataArray);
  return decoder$1.decode(decryptedBuffer);
}
async function generateCspDigest(data, algorithm) {
  const hashBuffer = await crypto.subtle.digest(algorithm, encoder$1.encode(data));
  const hash = encodeBase64(new Uint8Array(hashBuffer));
  return `${ALGORITHMS[algorithm]}${hash}`;
}
function isRoute404(route) {
  return ROUTE404_RE.test(route);
}
function isRoute500(route) {
  return ROUTE500_RE.test(route);
}
function isRoute3xx(route) {
  return ROUTE3XX_RE.test(route);
}
function createError(name) {
  return new AstroError({
    ...UnavailableAstroGlobal,
    message: UnavailableAstroGlobal.message(name)
  });
}
function createAstro(site) {
  return {
    get site() {
      console.warn(`Astro.site inside getStaticPaths is deprecated and will be removed in a future major version of Astro. Use import.meta.env.SITE instead`);
      return site ? new URL(site) : void 0;
    },
    get generator() {
      console.warn(`Astro.generator inside getStaticPaths is deprecated and will be removed in a future major version of Astro.`);
      return ASTRO_GENERATOR;
    },
    get callAction() {
      throw createError("callAction");
    },
    get clientAddress() {
      throw createError("clientAddress");
    },
    get cookies() {
      throw createError("cookies");
    },
    get csp() {
      throw createError("csp");
    },
    get currentLocale() {
      throw createError("currentLocale");
    },
    get getActionResult() {
      throw createError("getActionResult");
    },
    get isPrerendered() {
      throw createError("isPrerendered");
    },
    get locals() {
      throw createError("locals");
    },
    get originPathname() {
      throw createError("originPathname");
    },
    get params() {
      throw createError("params");
    },
    get preferredLocale() {
      throw createError("preferredLocale");
    },
    get preferredLocaleList() {
      throw createError("preferredLocaleList");
    },
    get props() {
      throw createError("props");
    },
    get redirect() {
      throw createError("redirect");
    },
    get request() {
      throw createError("request");
    },
    get response() {
      throw createError("response");
    },
    get rewrite() {
      throw createError("rewrite");
    },
    get routePattern() {
      throw createError("routePattern");
    },
    get self() {
      throw createError("self");
    },
    get slots() {
      throw createError("slots");
    },
    get url() {
      throw createError("url");
    },
    get session() {
      throw createError("session");
    },
    get cache() {
      throw createError("cache");
    },
    get logger() {
      throw createError("logger");
    }
  };
}
async function renderEndpoint(mod, context, isPrerendered, logger, state) {
  const { request, url } = context;
  const method = request.method.toUpperCase();
  let handler = mod[method] ?? mod["ALL"];
  if (!handler && method === "HEAD" && mod["GET"]) handler = mod["GET"];
  if (isPrerendered && !["GET", "HEAD"].includes(method)) logger.warn("router", `${url.pathname} ${s.bold(method)} requests are not available in static endpoints. Mark this page as server-rendered (\`export const prerender = false;\`) or update your config to \`output: 'server'\` to make all your pages server-rendered by default.`);
  if (handler === void 0) {
    logger.warn("router", `No API Route handler exists for the method "${method}" for the route "${url.pathname}".
Found handlers: ${Object.keys(mod).map((exp) => JSON.stringify(exp)).join(", ")}
` + ("all" in mod ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : ""));
    return new Response(null, { status: 404 });
  }
  if (typeof handler !== "function") {
    logger.error("router", `The route "${url.pathname}" exports a value for the method "${method}", but it is of the type ${typeof handler} instead of a function.`);
    return new Response(null, { status: 500 });
  }
  let response = await handler.call(mod, context);
  if (!response || response instanceof Response === false) throw new AstroError(EndpointDidNotReturnAResponse);
  if (state && REROUTABLE_STATUS_CODES.includes(response.status)) state.skipErrorReroute = true;
  if (method === "HEAD") return new Response(null, response);
  return response;
}
function isPromise(value) {
  return typeof value === "object" && value !== null && typeof value.then === "function";
}
async function* streamAsyncIterator(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
function entityFor(code) {
  switch (code) {
    case 38:
      return "&amp;";
    case 60:
      return "&lt;";
    case 62:
      return "&gt;";
    case 39:
      return "&#39;";
    default:
      return "&quot;";
  }
}
function escapeHTML(value) {
  ESCAPABLE.lastIndex = 0;
  if (!ESCAPABLE.test(value)) return value;
  let output = "";
  let last = 0;
  do {
    const index = ESCAPABLE.lastIndex - 1;
    if (last !== index) output += value.slice(last, index);
    output += entityFor(value.charCodeAt(index));
    last = index + 1;
  } while (ESCAPABLE.test(value));
  return last === value.length ? output : output + value.slice(last);
}
function stringifyForScript(value) {
  return JSON.stringify(value)?.replace(/</g, "\\u003c");
}
function escapeStyleText(value) {
  return value.replaceAll("<", "\\3C ");
}
function isHTMLString(value) {
  return typeof value === "object" && value !== null && value[htmlStringSymbol] === true;
}
function markHTMLBytes(bytes) {
  return new HTMLBytes(bytes);
}
function hasGetReader(obj) {
  return typeof obj.getReader === "function";
}
async function* unescapeChunksAsync(iterable) {
  if (hasGetReader(iterable)) for await (const chunk of streamAsyncIterator(iterable)) yield unescapeHTML(chunk);
  else for await (const chunk of iterable) yield unescapeHTML(chunk);
}
function* unescapeChunks(iterable) {
  for (const chunk of iterable) yield unescapeHTML(chunk);
}
function unescapeHTML(str) {
  if (!!str && typeof str === "object") {
    if (str instanceof Uint8Array) return markHTMLBytes(str);
    else if (str instanceof Response && str.body) {
      const body = str.body;
      return unescapeChunksAsync(body);
    } else if (typeof str.then === "function") return Promise.resolve(str).then((value) => {
      return unescapeHTML(value);
    });
    else if (str[/* @__PURE__ */ Symbol.for("astro:slot-string")]) return str;
    else if (Symbol.iterator in str) return unescapeChunks(str);
    else if (Symbol.asyncIterator in str || hasGetReader(str)) return unescapeChunksAsync(str);
  }
  return markHTMLString(str);
}
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode["astro:jsx"];
}
function isPropagatingHint(hint) {
  return hint === "self" || hint === "in-tree";
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
function r(e2) {
  var t2, f, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2) n2 += e2;
  else if ("object" == typeof e2) if (Array.isArray(e2)) {
    var o2 = e2.length;
    for (t2 = 0; t2 < o2; t2++) e2[t2] && (f = r(e2[t2])) && (n2 && (n2 += " "), n2 += f);
  } else for (f in e2) e2[f] && (n2 && (n2 += " "), n2 += f);
  return n2;
}
function clsx() {
  for (var e2, t2, f = 0, n2 = "", o2 = arguments.length; f < o2; f++) (e2 = arguments[f]) && (t2 = r(e2)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  parents.add(value);
  const serialized = Object.fromEntries(Object.entries(value).map(([k, v]) => {
    return [k, convertToSerializedForm(v, metadata, parents)];
  }));
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  switch (Object.prototype.toString.call(value)) {
    case "[object Date]":
      return [PROP_TYPE.Date, value.toISOString()];
    case "[object RegExp]":
      return [PROP_TYPE.RegExp, value.source];
    case "[object Map]":
      return [PROP_TYPE.Map, serializeArray(Array.from(value), metadata, parents)];
    case "[object Set]":
      return [PROP_TYPE.Set, serializeArray(Array.from(value), metadata, parents)];
    case "[object BigInt]":
      return [PROP_TYPE.BigInt, value.toString()];
    case "[object URL]":
      return [PROP_TYPE.URL, value.toString()];
    case "[object Array]":
      return [PROP_TYPE.JSON, serializeArray(value, metadata, parents)];
    case "[object Uint8Array]":
      return [PROP_TYPE.Uint8Array, Array.from(value)];
    case "[object Uint16Array]":
      return [PROP_TYPE.Uint16Array, Array.from(value)];
    case "[object Uint32Array]":
      return [PROP_TYPE.Uint32Array, Array.from(value)];
    default:
      if (value !== null && typeof value === "object") return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      if (value === Number.POSITIVE_INFINITY) return [PROP_TYPE.Infinity, 1];
      if (value === Number.NEGATIVE_INFINITY) return [PROP_TYPE.Infinity, -1];
      if (value === void 0) return [PROP_TYPE.Value];
      return [PROP_TYPE.Value, value];
  }
}
function serializeProps(props, metadata) {
  return JSON.stringify(serializeObject(props, metadata));
}
function extractDirectives(inputProps, clientDirectives) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {},
    propsWithoutTransitionAttributes: {}
  };
  for (const key of Object.keys(inputProps)) {
    const value = inputProps[key];
    if (key.startsWith("server:")) {
      if (key === "server:root") extracted.isPage = true;
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) extracted.hydration = {
        directive: "",
        value: "",
        componentUrl: "",
        componentExport: { value: "" }
      };
      switch (key) {
        case "client:component-path":
          extracted.hydration.componentUrl = value;
          break;
        case "client:component-export":
          extracted.hydration.componentExport.value = value;
          break;
        case "client:component-hydration":
          break;
        case "client:display-name":
          break;
        default:
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!clientDirectives.has(extracted.hydration.directive)) {
            const hydrationMethods = Array.from(clientDirectives.keys()).map((d) => `client:${d}`).join(", ");
            throw new Error(`Error: invalid hydration directive "${key}". Supported hydration methods: ${hydrationMethods}`);
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") throw new AstroError(MissingMediaQueryDirective);
      }
    } else {
      extracted.props[key] = value;
      if (!transitionDirectivesToCopyOnIsland.has(key)) extracted.propsWithoutTransitionAttributes[key] = value;
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
    extracted.propsWithoutTransitionAttributes[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) throw new AstroError({
    ...NoMatchingImport,
    message: NoMatchingImport.message(metadata.displayName)
  });
  const island = {
    children: "",
    props: { uid: astroId }
  };
  if (attrs) for (const [key, value] of Object.entries(attrs)) island.props[key] = escapeHTML(String(value));
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint.toString()));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) island.props["before-hydration-url"] = beforeHydrationUrl;
  island.props["opts"] = escapeHTML(JSON.stringify({
    name: metadata.displayName,
    value: metadata.hydrateArgs || ""
  }));
  transitionDirectivesToCopyOnIsland.forEach((name) => {
    if (typeof props[name] !== "undefined") island.props[name] = escapeHTML(String(props[name]));
  });
  return island;
}
function bitwise(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i2 = 0; i2 < str.length; i2++) {
    const ch = str.charCodeAt(i2);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) result = dictionary[integer] + result;
  return sign + result;
}
function isHeadAndContent(obj) {
  return typeof obj === "object" && obj !== null && !!obj[headAndContentSym];
}
function createThinHead() {
  return { [headAndContentSym]: true };
}
function determineIfNeedsHydrationScript(result) {
  if (result._metadata.templateDepth > 0) return !result._metadata.hasHydrationScript;
  if (result._metadata.hasHydrationScript) return false;
  return result._metadata.hasHydrationScript = true;
}
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.templateDepth > 0) return !result._metadata.hasDirectives.has(directive);
  if (result._metadata.hasDirectives.has(directive)) return false;
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(result, directive) {
  const clientDirective = result.clientDirectives.get(directive);
  if (!clientDirective) throw new Error(`Unknown directive: ${directive}`);
  return clientDirective;
}
function getPrescripts(result, type, directive) {
  switch (type) {
    case "both":
      return `<style>${ISLAND_STYLES}</style><script>${getDirectiveScriptText(result, directive)}<\/script><script>${astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(result, directive)}<\/script>`;
  }
}
async function collectPropagatedHeadParts(input) {
  const collectedHeadParts = [];
  const pendingSlotEvaluations = input.awaitPendingSlots === false ? [] : input.result._metadata?.pendingSlotEvaluations ?? [];
  const drainPendingSlots = /* @__PURE__ */ __name(async () => {
    while (pendingSlotEvaluations.length > 0) {
      const batch = pendingSlotEvaluations.splice(0, pendingSlotEvaluations.length);
      await Promise.all(batch);
    }
  }, "drainPendingSlots");
  await drainPendingSlots();
  for (const propagator of input.propagators) {
    const returnValue = await propagator.init(input.result);
    if (input.isHeadAndContent(returnValue) && returnValue.head) collectedHeadParts.push(returnValue.head);
    await drainPendingSlots();
  }
  return collectedHeadParts;
}
function shouldRenderHeadInstruction(state) {
  return !state.hasRenderedHead && !state.partial;
}
function shouldRenderMaybeHeadInstruction(state) {
  return !state.hasRenderedHead && !state.headInTree && !state.partial;
}
function shouldRenderInstruction$1(type, state) {
  return type === "head" ? shouldRenderHeadInstruction(state) : shouldRenderMaybeHeadInstruction(state);
}
function registerIfPropagating(result, factory, instance) {
  if (factory.propagation === "self" || factory.propagation === "in-tree") {
    result._metadata.propagators.add(instance);
    return;
  }
  if (factory.moduleId) {
    const hint = result.componentMetadata.get(factory.moduleId)?.propagation;
    if (isPropagatingHint(hint ?? "none")) result._metadata.propagators.add(instance);
  }
}
async function bufferPropagatedHead(result, options = {}) {
  const collected = await collectPropagatedHeadParts({
    propagators: result._metadata.propagators,
    result,
    isHeadAndContent,
    awaitPendingSlots: options.awaitPendingSlots
  });
  result._metadata.extraHead.push(...collected);
}
function shouldRenderInstruction(type, state) {
  return shouldRenderInstruction$1(type, state);
}
function getInstructionRenderState(result) {
  return {
    hasRenderedHead: result._metadata.hasRenderedHead,
    headInTree: result._metadata.headInTree,
    partial: result.partial
  };
}
function normalizeCspResourceEntry(entry) {
  if (typeof entry === "string") return {
    resource: entry,
    kind: "default"
  };
  return {
    resource: entry.resource,
    kind: entry.kind ?? "default"
  };
}
function normalizeCspHashEntry(entry) {
  if (typeof entry === "string") return {
    hash: entry,
    kind: "default"
  };
  return {
    hash: entry.hash,
    kind: entry.kind ?? "default"
  };
}
function partitionByKind(directive) {
  const groups = {
    default: {
      resources: [],
      hashes: []
    },
    element: {
      resources: [],
      hashes: []
    },
    attribute: {
      resources: [],
      hashes: []
    }
  };
  for (const entry of directive.resources) {
    const { resource, kind } = normalizeCspResourceEntry(entry);
    groups[kind].resources.push(resource);
  }
  for (const entry of directive.hashes) {
    const { hash, kind } = normalizeCspHashEntry(entry);
    groups[kind].hashes.push(hash);
  }
  return groups;
}
function deduplicateDirectiveValues(existingDirective, newDirective) {
  const [directiveName, ...existingValues] = existingDirective.split(/\s+/).filter(Boolean);
  const [newDirectiveName, ...newValues] = newDirective.split(/\s+/).filter(Boolean);
  if (directiveName !== newDirectiveName) return;
  return `${directiveName} ${Array.from(/* @__PURE__ */ new Set([...existingValues, ...newValues])).join(" ")}`;
}
function pushDirective(directives, newDirective) {
  if (directives.length === 0) return [newDirective];
  const finalDirectives = [];
  let matched = false;
  for (const directive of directives) {
    if (matched) {
      finalDirectives.push(directive);
      continue;
    }
    const result = deduplicateDirectiveValues(directive, newDirective);
    if (result) {
      finalDirectives.push(result);
      matched = true;
    } else finalDirectives.push(directive);
  }
  if (!matched) finalDirectives.push(newDirective);
  return finalDirectives;
}
function renderCspContent(result) {
  const { scriptDirective, styleDirective, directives } = result;
  const script = partitionByKind(scriptDirective);
  const style = partitionByKind(styleDirective);
  const finalScriptHashes = /* @__PURE__ */ new Set();
  for (const scriptHash of script.default.hashes) finalScriptHashes.add(`'${scriptHash}'`);
  for (const scriptHash of result._metadata.extraScriptHashes) finalScriptHashes.add(`'${scriptHash}'`);
  const finalStyleHashes = /* @__PURE__ */ new Set();
  for (const styleHash of style.default.hashes) finalStyleHashes.add(`'${styleHash}'`);
  for (const styleHash of result._metadata.extraStyleHashes) finalStyleHashes.add(`'${styleHash}'`);
  let directivesContent;
  if (directives.length > 0) directivesContent = directives.join(";") + ";";
  const scriptResources = script.default.resources.length > 0 ? script.default.resources.join(" ") : "'self'";
  const styleResources = style.default.resources.length > 0 ? style.default.resources.join(" ") : "'self'";
  const scriptElementDefaultResource = script.default.resources.length > 0 ? "" : "'self'";
  const styleElementDefaultResource = style.default.resources.length > 0 ? "" : "'self'";
  const scriptElemActive = isEnabled(script.element);
  const styleElemActive = isEnabled(style.element);
  const strictDynamicSuffix = scriptDirective.strictDynamic ? ` 'strict-dynamic'` : "";
  const scriptDefaultHasUnsafeInline = hasUnsafeInline(script.default.resources);
  const styleDefaultHasUnsafeInline = hasUnsafeInline(style.default.resources);
  const scriptSrc = `script-src ${scriptResources} ${[...scriptElemActive || scriptDefaultHasUnsafeInline ? [] : [...finalScriptHashes], ...scriptDirective.strictDynamic ? [`'strict-dynamic'`] : []].join(" ")};`;
  const styleSrc = `style-src ${styleResources} ${(styleElemActive || styleDefaultHasUnsafeInline ? [] : [...finalStyleHashes]).join(" ")};`;
  const scriptSrcElem = scriptElemActive ? renderSpecificDirective("script-src-elem", script.element.resources, scriptElementDefaultResource, finalScriptHashes, script.element.hashes, strictDynamicSuffix) : void 0;
  const scriptSrcAttr = isEnabled(script.attribute) ? renderSpecificDirective("script-src-attr", script.attribute.resources, "'none'", void 0, script.attribute.hashes) : void 0;
  const styleSrcElem = styleElemActive ? renderSpecificDirective("style-src-elem", style.element.resources, styleElementDefaultResource, finalStyleHashes, style.element.hashes) : void 0;
  const styleSrcAttr = isEnabled(style.attribute) ? renderSpecificDirective("style-src-attr", style.attribute.resources, "'none'", void 0, style.attribute.hashes) : void 0;
  return [
    directivesContent,
    scriptSrc,
    scriptSrcElem,
    scriptSrcAttr,
    styleSrc,
    styleSrcElem,
    styleSrcAttr
  ].filter(Boolean).join(" ");
}
function hasUnsafeInline(resources) {
  return resources.includes("'unsafe-inline'");
}
function isEnabled(sources) {
  return sources.resources.length > 0 || sources.hashes.length > 0;
}
function renderSpecificDirective(name, resources, defaultResource, sharedHashes, ownHashes, suffix = "") {
  const unsafeInline = hasUnsafeInline(resources);
  const hashes = new Set(unsafeInline ? void 0 : sharedHashes);
  if (!unsafeInline) for (const hash of ownHashes) hashes.add(`'${hash}'`);
  let finalResources;
  if (resources.length > 0) finalResources = resources.map((r2) => `${r2}`).join(" ");
  else if (defaultResource === "'none'" && hashes.size > 0) finalResources = "";
  else finalResources = defaultResource;
  return `${name} ${[finalResources, ...hashes].filter(Boolean).join(" ")}${suffix};`;
}
function createRenderInstruction(instruction) {
  instruction[RenderInstructionSymbol] = true;
  return instruction;
}
function isRenderInstruction(chunk) {
  return chunk && typeof chunk === "object" && chunk[RenderInstructionSymbol];
}
function isScriptInstruction(chunk) {
  return chunk && typeof chunk === "object" && "type" in chunk && chunk.type === "script";
}
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) output += `const ${toIdent(key)} = ${stringifyForScript(value)};
`;
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) return values[0];
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function isCustomElement(tagName) {
  return tagName.includes("-");
}
function handleBooleanAttribute(key, value, shouldEscape, tagName) {
  if (key === "popover") return markHTMLString(value ? ` ${key}` : "");
  if (tagName && isCustomElement(tagName)) return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  return markHTMLString(value ? ` ${key}` : "");
}
function classifyAttribute(key) {
  if (INVALID_ATTR_NAME_CHAR.test(key)) return ATTRIBUTE_KIND.INVALID_NAME;
  if (STATIC_DIRECTIVES.has(key)) return ATTRIBUTE_KIND.STATIC_DIRECTIVE;
  if (key === "class:list") return ATTRIBUTE_KIND.CLASS_LIST;
  if (key === "style") return ATTRIBUTE_KIND.STYLE;
  if (key === "className") return ATTRIBUTE_KIND.CLASS_NAME;
  if (htmlBooleanAttributes.test(key)) return ATTRIBUTE_KIND.BOOLEAN;
  if (key === "popover" || key === "download" || key === "hidden") return ATTRIBUTE_KIND.BOOLEAN_IF_BOOLEAN;
  return ATTRIBUTE_KIND.ORDINARY;
}
function addAttribute(value, key, shouldEscape = true, tagName = "") {
  if (value == null) return "";
  switch (classifyAttribute(key)) {
    case ATTRIBUTE_KIND.INVALID_NAME:
      return "";
    case ATTRIBUTE_KIND.STATIC_DIRECTIVE:
      console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
      return "";
    case ATTRIBUTE_KIND.CLASS_LIST: {
      const listValue = toAttributeString(clsx(value), shouldEscape);
      if (listValue === "") return "";
      return markHTMLString(` class="${listValue}"`);
    }
    case ATTRIBUTE_KIND.STYLE:
      if (!(value instanceof HTMLString)) {
        if (Array.isArray(value) && value.length === 2) return markHTMLString(` style="${toAttributeString(`${toStyleString(value[0])};${value[1]}`, shouldEscape)}"`);
        if (typeof value === "object") return markHTMLString(` style="${toAttributeString(toStyleString(value), shouldEscape)}"`);
      }
      break;
    case ATTRIBUTE_KIND.CLASS_NAME:
      return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
    case ATTRIBUTE_KIND.BOOLEAN:
      return handleBooleanAttribute(key, value, shouldEscape, tagName);
    case ATTRIBUTE_KIND.BOOLEAN_IF_BOOLEAN:
      if (typeof value === "boolean") return handleBooleanAttribute(key, value, shouldEscape, tagName);
      break;
    case ATTRIBUTE_KIND.ORDINARY:
  }
  if (value === "") return markHTMLString(` ${key}`);
  return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
}
function spreadElementAttributes(values) {
  let output = "";
  for (const key of Object.keys(values)) {
    if (key === "children") continue;
    output += addAttribute(values[key], key, true);
  }
  return output;
}
function internalSpreadAttributes(values, shouldEscape = true, tagName) {
  let output = "";
  for (const key of Object.keys(values)) output += addAttribute(values[key], key, shouldEscape, tagName);
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children === "") && voidElementNames.test(name)) return `<${name}${internalSpreadAttributes(props, shouldEscape, name)}>`;
  return `<${name}${internalSpreadAttributes(props, shouldEscape, name)}>${children}</${name}>`;
}
function createBufferedRenderer(destination, renderFunction) {
  return new BufferedRenderer(destination, renderFunction);
}
function promiseWithResolvers() {
  let resolve, reject;
  return {
    promise: new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    }),
    resolve,
    reject
  };
}
function stablePropsKey(props) {
  const keys = Object.keys(props).sort();
  let result = "{";
  for (let i2 = 0; i2 < keys.length; i2++) {
    if (i2 > 0) result += ",";
    result += JSON.stringify(keys[i2]) + ":" + JSON.stringify(props[keys[i2]]);
  }
  result += "}";
  return result;
}
function deduplicateElements(elements) {
  if (elements.length <= 1) return elements;
  const seen = /* @__PURE__ */ new Set();
  return elements.filter((item) => {
    const key = stablePropsKey(item.props) + item.children;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function renderCspMetaTag(result) {
  return renderElement$1("meta", {
    props: {
      "http-equiv": "content-security-policy",
      content: renderCspContent(result)
    },
    children: ""
  }, false);
}
function renderAllHeadContent(result) {
  result._metadata.hasRenderedHead = true;
  let content = "";
  if (result.shouldInjectCspMetaTags && result.cspDestination === "meta") content += result._metadata.cspMetaPlaceholder ?? renderCspMetaTag(result);
  const styles = deduplicateElements(Array.from(result.styles)).map((style) => style.props.rel === "stylesheet" ? renderElement$1("link", style) : renderElement$1("style", style));
  result.styles.clear();
  const scripts = deduplicateElements(Array.from(result.scripts)).map((script) => {
    if (result.userAssetsBase) script.props.src = (result.base === "/" ? "" : result.base) + result.userAssetsBase + script.props.src;
    return renderElement$1("script", script, false);
  });
  const links = deduplicateElements(Array.from(result.links)).map((link) => renderElement$1("link", link, false));
  const sep = result.compressHTML === true || result.compressHTML === "jsx" ? "" : "\n";
  content += styles.join(sep) + links.join(sep) + scripts.join(sep);
  if (result.speculationRulesContent) content += renderElement$1("script", {
    props: { type: "speculationrules" },
    children: result.speculationRulesContent
  }, false);
  content += result._metadata.extraHead.join("");
  return markHTMLString(content);
}
function renderHead() {
  return HEAD_INSTRUCTION;
}
function maybeRenderHead() {
  return MAYBE_HEAD_INSTRUCTION;
}
function markHtmlParts(htmlParts) {
  let marked = markedHtmlParts.get(htmlParts);
  if (marked === void 0) {
    marked = new Array(htmlParts.length);
    for (let i2 = 0; i2 < htmlParts.length; i2++) marked[i2] = htmlParts[i2] ? markHTMLString(htmlParts[i2]) : htmlParts[i2];
    markedHtmlParts.set(htmlParts, marked);
  }
  return marked;
}
function isRenderTemplateResult(obj) {
  return typeof obj === "object" && obj !== null && !!obj[renderTemplateResultSym];
}
function renderTemplate(htmlParts, ...expressions) {
  return new RenderTemplateResult(htmlParts, expressions);
}
function isSlotString(str) {
  return !!str[slotString];
}
function mergeSlotInstructions(target, source) {
  if (source.instructions?.length) {
    target ??= [];
    target.push(...source.instructions);
  }
  return target;
}
function renderSlot(result, slotted, fallback) {
  if (!slotted && fallback) return renderSlot(result, fallback);
  return new SlotRenderInstance(result, slotted);
}
async function renderSlotToString(result, slotted, fallback) {
  let content = "";
  let instructions = null;
  const chunks = [];
  await renderSlot(result, slotted, fallback).render({ write(chunk) {
    if (chunk instanceof SlotString) {
      content += chunk;
      if (chunk.chunks.length) chunks.push(...chunk.chunks);
      instructions = mergeSlotInstructions(instructions, chunk);
    } else if (chunk instanceof Response) return;
    else if (typeof chunk === "object" && "type" in chunk && typeof chunk.type === "string") {
      if (isScriptInstruction(chunk)) chunks.push(chunk);
      else {
        if (instructions === null) instructions = [];
        instructions.push(chunk);
      }
    } else {
      const str = chunkToString(result, chunk);
      content += str;
      chunks.push(str);
    }
  } });
  return markHTMLString(new SlotString(content, instructions, chunks));
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) await Promise.all(Object.entries(slots).map(([key, value]) => renderSlotToString(result, value).then((output) => {
    if (output.instructions) {
      if (slotInstructions === null) slotInstructions = [];
      slotInstructions.push(...output.instructions);
    }
    if (output.chunks) {
      for (const part of output.chunks) if (typeof part !== "string") {
        if (slotInstructions === null) slotInstructions = [];
        slotInstructions.push(part);
      }
    }
    children[key] = output;
  })));
  return {
    slotInstructions,
    children
  };
}
function createSlotValueFromString(content) {
  return function() {
    return renderTemplate`${unescapeHTML(content)}`;
  };
}
function containsServerDirective(props) {
  return "server:component-directive" in props;
}
function createSearchParams(encryptedComponentExport, encryptedProps, slots) {
  const params = new URLSearchParams();
  params.set("e", encryptedComponentExport);
  params.set("p", encryptedProps);
  params.set("s", slots);
  return params;
}
function isWithinURLLimit(pathname, params) {
  return (pathname + "?" + params.toString()).length < 2048;
}
function stringifyChunk(result, chunk) {
  if (typeof chunk === "string") return chunk;
  if (isRenderInstruction(chunk)) {
    const instruction = chunk;
    switch (instruction.type) {
      case "directive": {
        const { hydration } = instruction;
        const needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
        const needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
        if (needsHydrationScript) return markHTMLString(getPrescripts(result, "both", hydration.directive));
        else if (needsDirectiveScript) return markHTMLString(getPrescripts(result, "directive", hydration.directive));
        else return "";
      }
      case "head":
        if (!shouldRenderInstruction("head", getInstructionRenderState(result))) return "";
        return renderAllHeadContent(result);
      case "maybe-head":
        if (!shouldRenderInstruction("maybe-head", getInstructionRenderState(result))) return "";
        return renderAllHeadContent(result);
      case "renderer-hydration-script": {
        const { rendererSpecificHydrationScripts } = result._metadata;
        const { rendererName } = instruction;
        if (result._metadata.templateDepth > 0) return instruction.render();
        if (!rendererSpecificHydrationScripts.has(rendererName)) {
          rendererSpecificHydrationScripts.add(rendererName);
          return instruction.render();
        }
        return "";
      }
      case "server-island-runtime":
        if (result._metadata.templateDepth > 0) return renderServerIslandRuntime();
        if (result._metadata.hasRenderedServerIslandRuntime) return "";
        result._metadata.hasRenderedServerIslandRuntime = true;
        return renderServerIslandRuntime();
      case "script": {
        const { id, content } = instruction;
        if (result._metadata.templateDepth > 0) return content;
        if (result._metadata.renderedScripts.has(id)) return "";
        result._metadata.renderedScripts.add(id);
        return content;
      }
      case "template-enter":
        result._metadata.templateDepth++;
        return "";
      case "template-exit":
        if (result._metadata.templateDepth <= 0) throw new Error("Unexpected template-exit instruction without a matching template-enter. This may indicate that the compiler emitted unbalanced template boundaries, or that a component manually injected a template-exit render instruction.");
        result._metadata.templateDepth--;
        return "";
      default:
        throw new Error(`Unknown chunk type: ${chunk.type}`);
    }
  } else if (chunk instanceof Response) return "";
  else if (isSlotString(chunk)) {
    let out = "";
    const c = chunk;
    if (c.instructions) for (const instr of c.instructions) out += stringifyChunk(result, instr);
    if (c.chunks.length) for (const part of c.chunks) out += typeof part === "string" ? part : stringifyChunk(result, part);
    else out += chunk.toString();
    return out;
  }
  return chunk.toString();
}
function chunkToString(result, chunk) {
  if (ArrayBuffer.isView(chunk)) return decoder.decode(chunk);
  else return stringifyChunk(result, chunk);
}
function chunkToByteArray(result, chunk) {
  if (ArrayBuffer.isView(chunk)) return chunk;
  else {
    const stringified = stringifyChunk(result, chunk);
    return encoder.encode(stringified.toString());
  }
}
function chunkToByteArrayOrString(result, chunk) {
  if (ArrayBuffer.isView(chunk)) return chunk;
  else return stringifyChunk(result, chunk).toString();
}
function isRenderInstance(obj) {
  return typeof obj === "object" && obj !== null && typeof obj.render === "function";
}
function renderChild(destination, child) {
  if (typeof child === "string") {
    destination.write(markHTMLString(escapeHTML(child)));
    return;
  }
  if (isRenderInstruction(child)) {
    destination.write(child);
    return;
  }
  if (isPromise(child)) return child.then((x) => renderChild(destination, x));
  if (isRenderInstance(child)) return child.render(destination);
  if (child instanceof SlotString) {
    destination.write(child);
    return;
  }
  if (isHTMLString(child)) {
    destination.write(child);
    return;
  }
  if (!child && child !== 0) return;
  if (Array.isArray(child)) return renderArray(destination, child);
  if (typeof child === "function") return renderChild(destination, child());
  if (ArrayBuffer.isView(child)) {
    destination.write(child);
    return;
  }
  if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    if (Symbol.asyncIterator in child) return renderAsyncIterable(destination, child);
    return renderIterable(destination, child);
  }
  destination.write(child);
}
function renderArray(destination, children) {
  for (let i2 = 0; i2 < children.length; i2++) {
    const result = renderChild(destination, children[i2]);
    if (isPromise(result)) {
      if (i2 + 1 >= children.length) return result;
      const remaining = children.length - i2 - 1;
      const flushers = new Array(remaining);
      for (let j = 0; j < remaining; j++) flushers[j] = createBufferedRenderer(destination, (bufferDestination) => {
        return renderChild(bufferDestination, children[i2 + 1 + j]);
      });
      return result.then(() => {
        let k = 0;
        const iterate = /* @__PURE__ */ __name(() => {
          while (k < flushers.length) {
            const flushResult = flushers[k++].flush();
            if (isPromise(flushResult)) return flushResult.then(iterate);
          }
        }, "iterate");
        return iterate();
      });
    }
  }
}
function renderIterable(destination, children) {
  const iterator = children[Symbol.iterator]();
  const iterate = /* @__PURE__ */ __name(() => {
    for (; ; ) {
      const { value, done } = iterator.next();
      if (done) break;
      const result = renderChild(destination, value);
      if (isPromise(result)) return result.then(iterate);
    }
  }, "iterate");
  return iterate();
}
async function renderAsyncIterable(destination, children) {
  for await (const value of children) await renderChild(destination, value);
}
function validateComponentProps(props, clientDirectives, displayName) {
  if (props != null) {
    for (const prop in props) if (prop.startsWith(CLIENT_DIRECTIVE_PREFIX) && clientDirectives.has(prop.slice(7))) console.warn(`You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`);
  }
}
function createAstroComponentInstance(result, displayName, factory, props, slots = {}) {
  validateComponentProps(props, result.clientDirectives, displayName);
  const instance = new AstroComponentInstance(result, props, slots, factory);
  registerIfPropagating(result, factory, instance);
  return instance;
}
function isAstroComponentInstance(obj) {
  return typeof obj === "object" && obj !== null && !!obj[astroComponentInstanceSym];
}
async function renderStreaming(root, result, destination) {
  const stack = [root];
  const openTagCache = /* @__PURE__ */ new Map();
  const closeTagCache = /* @__PURE__ */ new Map();
  const closeTagFor = /* @__PURE__ */ __name((type) => {
    let tag = closeTagCache.get(type);
    if (tag === void 0) {
      tag = new HTMLString(`</${type}>`);
      closeTagCache.set(type, tag);
    }
    return tag;
  }, "closeTagFor");
  const streamingState = new StreamingRenderState();
  let firstAsyncRender = null;
  const bufferedTail = [];
  const flushBufferedStaticOutput = /* @__PURE__ */ __name(() => {
    if (streamingState.bufferedStaticOutput) {
      bufferedTail.push(streamingState.bufferedStaticOutput);
      streamingState.bufferedStaticOutput = "";
    }
  }, "flushBufferedStaticOutput");
  const renderDynamic = /* @__PURE__ */ __name((node2) => (d) => {
    if (isVNode(node2)) return renderJSX(result, node2).then((out) => renderChild(d, out));
    return renderChild(d, node2);
  }, "renderDynamic");
  const handleVNode = /* @__PURE__ */ __name((vnode) => {
    const type = vnode.type;
    if (!type) throw new Error(`Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
    if (type === Fragment) {
      stack.push(vnode.props?.children);
      return;
    }
    if (isAstroComponentFactory(type)) {
      const props = {};
      const slots = {};
      for (const [key, value] of Object.entries(vnode.props ?? {})) if (key === "children" || value && typeof value === "object" && value["$$slot"]) slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
      else props[key] = value;
      const displayName = type.name || "Anonymous";
      if (containsServerDirective(props)) {
        const island = new ServerIslandComponent(result, props, slots, displayName);
        result._metadata.propagators.add(island);
        stack.push(island);
        return;
      }
      stack.push(createAstroComponentInstance(result, displayName, type, props, slots));
      return;
    }
    if (typeof type === "string" && type !== ClientOnlyPlaceholder$1) {
      const props = vnode.props;
      let hasAttrs = false;
      if (props) {
        for (const key in props) if (key !== "children") {
          hasAttrs = true;
          break;
        }
      }
      const children = props?.children;
      const isVoid = (children == null || children === "") && voidElementNames.test(type);
      if (!hasAttrs) {
        const key = isVoid ? `${type}/` : type;
        let openTag = openTagCache.get(key);
        if (openTag === void 0) {
          openTag = isVoid ? `<${type}/>` : `<${type}>`;
          openTagCache.set(key, openTag);
        }
        streamingState.appendStatic(openTag);
        if (!isVoid) stack.push(closeTagFor(type));
      } else {
        const attrs = spreadElementAttributes(props);
        if (isVoid) {
          streamingState.appendStatic(`<${type}${attrs}/>`);
          return;
        }
        streamingState.appendStatic(`<${type}${attrs}>`);
        stack.push(closeTagFor(type));
      }
      if (!isVoid && children != null && children !== "") {
        if (typeof children === "string" && type === "style") stack.push(markHTMLString(escapeStyleText(children)));
        else stack.push(children);
      }
      return;
    }
    if (typeof type === "function" && vnode.props?.["server:root"]) {
      stack.push(type(vnode.props ?? {}));
      return;
    }
    stack.push(renderJSX(result, vnode));
  }, "handleVNode");
  while (stack.length > 0) {
    const node2 = stack.pop();
    if (node2 == null || node2 === false) continue;
    if (node2 instanceof TemplateFrame) {
      const htmlParts = node2.templateResult.htmlParts;
      const expressions = node2.templateResult.expressions;
      let i2 = node2.cursor;
      while (i2 < htmlParts.length) {
        if (htmlParts[i2]) streamingState.appendStatic(htmlParts[i2]);
        if (i2 >= expressions.length) break;
        const expression = expressions[i2];
        i2++;
        if (expression == null || expression === false) continue;
        const expressionType = typeof expression;
        if (expressionType === "string") {
          streamingState.appendStatic(escapeHTML(expression));
          continue;
        }
        if (expressionType === "number" || expressionType === "bigint" || expressionType === "boolean") {
          streamingState.appendStatic(String(expression));
          continue;
        }
        if (expression instanceof HTMLString || isHTMLString(expression)) {
          if (!(expression instanceof SlotString)) {
            streamingState.appendStatic(expression.toString());
            continue;
          }
        }
        node2.storeCursor(i2);
        stack.push(node2);
        stack.push(isPromise(expression) ? node2.templateResult.catchExpressionError(i2 - 1, expression) : expression);
        break;
      }
      continue;
    }
    const nodeType = typeof node2;
    if (nodeType === "string") {
      streamingState.appendStatic(escapeHTML(node2));
      continue;
    }
    if (nodeType === "number" || nodeType === "bigint" || nodeType === "boolean") {
      streamingState.appendStatic(String(node2));
      continue;
    }
    if (node2 instanceof HTMLString || isHTMLString(node2)) {
      if (!(node2 instanceof SlotString)) {
        streamingState.appendStatic(node2.toString());
        continue;
      }
    }
    if (Array.isArray(node2)) {
      for (let i2 = node2.length - 1; i2 >= 0; i2--) stack.push(node2[i2]);
      continue;
    }
    if (isRenderTemplateResult(node2)) {
      stack.push(new TemplateFrame(node2));
      continue;
    }
    if (isVNode(node2)) {
      handleVNode(node2);
      continue;
    }
    if (node2 instanceof SlotRenderInstance) {
      stack.push(node2.evaluate());
      continue;
    }
    if (isAstroComponentInstance(node2)) {
      const returnValue = node2.init(result);
      if (!isPromise(returnValue)) {
        stack.push(isHeadAndContent(returnValue) ? returnValue.content : returnValue);
        continue;
      }
    }
    if (!streamingState.isBuffering) {
      if (streamingState.pendingStaticOutput) {
        destination.write(streamingState.pendingStaticOutput);
        streamingState.pendingStaticOutput = "";
      }
      const rendered = renderDynamic(node2)(destination);
      if (isPromise(rendered)) {
        streamingState.isBuffering = true;
        firstAsyncRender = rendered;
      }
    } else {
      flushBufferedStaticOutput();
      bufferedTail.push(createBufferedRenderer(destination, renderDynamic(node2)));
    }
  }
  if (!streamingState.isBuffering) {
    if (streamingState.pendingStaticOutput) destination.write(streamingState.pendingStaticOutput);
    return;
  }
  await firstAsyncRender;
  flushBufferedStaticOutput();
  for (const segment of bufferedTail) if (typeof segment === "string") destination.write(segment);
  else {
    const flushResult = segment.flush();
    if (isPromise(flushResult)) await flushResult;
  }
}
async function renderStreamToString(result, templateResult, isPage) {
  let str = "";
  let renderedFirstPageChunk = false;
  if (isPage) await bufferHeadContent(result);
  await renderStreaming(templateResult, result, { write(chunk) {
    if (isPage && !renderedFirstPageChunk) {
      renderedFirstPageChunk = true;
      if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
        const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
        str += doctype;
      }
    }
    if (chunk instanceof Response) return;
    str += chunkToString(result, chunk);
  } });
  return str;
}
async function renderStreamToStream(result, templateResult, isPage, route) {
  let renderedFirstPageChunk = false;
  if (isPage) await bufferHeadContent(result);
  return new ReadableStream({
    start(controller) {
      const destination = { write(chunk) {
        if (isPage && !renderedFirstPageChunk) {
          renderedFirstPageChunk = true;
          if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
            const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
            controller.enqueue(encoder.encode(doctype));
          }
        }
        if (chunk instanceof Response) throw new AstroError({ ...ResponseSentError });
        const bytes = chunkToByteArray(result, chunk);
        controller.enqueue(bytes);
      } };
      (async () => {
        try {
          await renderStreaming(templateResult, result, destination);
          controller.close();
        } catch (e2) {
          if (AstroError.is(e2) && !e2.loc) e2.setLocation({ file: route?.component });
          setTimeout(() => controller.error(e2), 0);
        }
      })();
    },
    cancel() {
      result.cancelled = true;
    }
  });
}
async function renderStreamToAsyncIterable(result, templateResult, isPage, _route) {
  let renderedFirstPageChunk = false;
  let error3 = null;
  let next = null;
  const buffer2 = [];
  let hasBytes = false;
  let lastIsString = false;
  let renderingComplete = false;
  if (isPage) await bufferHeadContent(result);
  const iterator = {
    async next() {
      if (result.cancelled) return {
        done: true,
        value: void 0
      };
      if (next !== null) await next.promise;
      else if (!renderingComplete && !buffer2.length) {
        next = promiseWithResolvers();
        await next.promise;
      }
      if (!renderingComplete) next = promiseWithResolvers();
      if (error3) throw error3;
      let mergedArray;
      if (!hasBytes) {
        let text = "";
        for (let i2 = 0, len = buffer2.length; i2 < len; i2++) text += buffer2[i2];
        mergedArray = encoder.encode(text);
      } else {
        let length = 0;
        let stringToEncode = "";
        for (let i2 = 0, len = buffer2.length; i2 < len; i2++) {
          const bufferEntry = buffer2[i2];
          if (typeof bufferEntry === "string") {
            const nextIsString = i2 + 1 < len && typeof buffer2[i2 + 1] === "string";
            stringToEncode += bufferEntry;
            if (!nextIsString) {
              const encoded = encoder.encode(stringToEncode);
              length += encoded.length;
              stringToEncode = "";
              buffer2[i2] = encoded;
            } else buffer2[i2] = "";
          } else length += bufferEntry.length;
        }
        mergedArray = new Uint8Array(length);
        let offset = 0;
        for (let i2 = 0, len = buffer2.length; i2 < len; i2++) {
          const item = buffer2[i2];
          if (item === "") continue;
          mergedArray.set(item, offset);
          offset += item.length;
        }
      }
      buffer2.length = 0;
      hasBytes = false;
      lastIsString = false;
      return {
        done: mergedArray.length === 0 && renderingComplete,
        value: mergedArray
      };
    },
    async return() {
      result.cancelled = true;
      return {
        done: true,
        value: void 0
      };
    }
  };
  const destination = { write(chunk) {
    if (isPage && !renderedFirstPageChunk) {
      renderedFirstPageChunk = true;
      if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
        const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
        buffer2.push(doctype);
        lastIsString = true;
      }
    }
    if (chunk instanceof Response) throw new AstroError(ResponseSentError);
    const bytes = chunkToByteArrayOrString(result, chunk);
    if (bytes.length > 0) {
      if (typeof bytes === "string") {
        if (lastIsString) buffer2[buffer2.length - 1] = buffer2[buffer2.length - 1] + bytes;
        else {
          buffer2.push(bytes);
          lastIsString = true;
        }
      } else {
        buffer2.push(bytes);
        hasBytes = true;
        lastIsString = false;
      }
      next?.resolve();
    } else if (buffer2.length > 0) next?.resolve();
  } };
  toPromise(() => renderStreaming(templateResult, result, destination)).catch((err) => {
    error3 = err;
  }).finally(() => {
    renderingComplete = true;
    next?.resolve();
  });
  return { [Symbol.asyncIterator]() {
    return iterator;
  } };
}
async function renderToString(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route);
  if (templateResult instanceof Response) return templateResult;
  return await renderStreamToString(result, templateResult, isPage);
}
async function renderToReadableStream(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route);
  if (templateResult instanceof Response) return templateResult;
  return await renderStreamToStream(result, templateResult, isPage, route);
}
async function callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route) {
  const factoryResult = await componentFactory(result, props, children);
  if (factoryResult instanceof Response) return factoryResult;
  else if (isHeadAndContent(factoryResult)) {
    if (!isRenderTemplateResult(factoryResult.content)) throw new AstroError({
      ...OnlyResponseCanBeReturned,
      message: OnlyResponseCanBeReturned.message(route?.route, typeof factoryResult),
      location: { file: route?.component }
    });
    return factoryResult.content;
  } else if (!isRenderTemplateResult(factoryResult)) throw new AstroError({
    ...OnlyResponseCanBeReturned,
    message: OnlyResponseCanBeReturned.message(route?.route, typeof factoryResult),
    location: { file: route?.component }
  });
  return factoryResult;
}
async function bufferHeadContent(result) {
  await bufferPropagatedHead(result);
}
async function renderToAsyncIterable(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route);
  if (templateResult instanceof Response) return templateResult;
  return await renderStreamToAsyncIterable(result, templateResult, isPage, route);
}
function toPromise(fn) {
  try {
    const result = fn();
    return isPromise(result) ? result : Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}
function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    if (INVALID_ATTR_NAME_CHAR.test(attr)) continue;
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(`<${name}${attrHTML}>${await renderSlotToString(result, slots?.default)}</${name}>`);
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName) return definedName;
  return constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
}
function guessRenderers(componentUrl) {
  switch (componentUrl?.split(".").pop()) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue (jsx)"
      ];
    case void 0:
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue",
        "@astrojs/svelte"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment;
}
function isHTMLComponent(Component) {
  return Component && Component["astro:html"] === true;
}
function removeStaticAstroSlot(html, supportsAstroStaticSlot = true) {
  const exp = supportsAstroStaticSlot ? ASTRO_STATIC_SLOT_EXP : ASTRO_SLOT_EXP;
  return html.replace(exp, "");
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  if (!Component && "client:only" in _props === false) throw new Error(`Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`);
  const { renderers: renderers2, clientDirectives } = result;
  const metadata = {
    astroStaticSlot: true,
    displayName
  };
  const { hydration, isPage, props, propsWithoutTransitionAttributes } = extractDirectives(_props, clientDirectives);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers2.filter((r2) => r2.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers2.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error3;
      for (const r2 of renderers2) try {
        if (await r2.ssr.check.call({ result }, Component, props, children, metadata)) {
          renderer = r2;
          break;
        }
      } catch (e2) {
        error3 ??= e2;
      }
      if (!renderer && error3) throw error3;
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = await renderHTMLElement(result, Component, _props, slots);
      return { render(destination) {
        destination.write(output);
      } };
    }
  } else {
    if (metadata.hydrateArgs) {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) renderer = renderers2.find(({ name }) => name === `@astrojs/${rendererName}` || name === rendererName);
    }
    if (!renderer && validRenderers.length === 1) renderer = validRenderers[0];
    if (!renderer) {
      const extname = metadata.componentUrl?.split(".").pop();
      renderer = renderers2.find(({ name }) => name === `@astrojs/${extname}` || name === extname);
    }
    if (!renderer && metadata.hydrateArgs) {
      const rendererName = metadata.hydrateArgs;
      if (typeof rendererName === "string") renderer = renderers2.find(({ name }) => name === rendererName);
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) {
        const plural = validRenderers.length > 1;
        throw new AstroError({
          ...NoMatchingRenderer,
          message: NoMatchingRenderer.message(metadata.displayName, metadata?.componentUrl?.split(".").pop(), plural, validRenderers.length),
          hint: NoMatchingRenderer.hint(formatList(probableRendererNames.map((r2) => "`" + r2 + "`")))
        });
      } else throw new AstroError({
        ...NoClientOnlyHint,
        message: NoClientOnlyHint.message(metadata.displayName),
        hint: NoClientOnlyHint.hint(probableRendererNames.map((r2) => r2.replace("@astrojs/", "")).join("|"))
      });
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter((r2) => probableRendererNames.includes(r2.name));
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) throw new AstroError({
        ...NoMatchingRenderer,
        message: NoMatchingRenderer.message(metadata.displayName, metadata?.componentUrl?.split(".").pop(), plural, validRenderers.length),
        hint: NoMatchingRenderer.hint(formatList(probableRendererNames.map((r2) => "`" + r2 + "`")))
      });
      else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call({ result }, Component, propsWithoutTransitionAttributes, children, metadata));
      } else throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.
3. If using multiple JSX frameworks at the same time (e.g. React + Preact), pass the correct \`include\`/\`exclude\` options to integrations.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
    }
  } else if (metadata.hydrate === "only") html = await renderSlotToString(result, slots?.fallback);
  else {
    performance.now();
    ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call({ result }, Component, propsWithoutTransitionAttributes, children, metadata));
  }
  if (!html && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const renderTemplateResult = renderTemplate`<${Tag}${internalSpreadAttributes(props, true, Tag)}${markHTMLString(childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`)}`;
    html = "";
    await renderTemplateResult.render({ write(chunk) {
      if (chunk instanceof Response) return;
      html += chunkToString(result, chunk);
    } });
  }
  if (!hydration) return { render(destination) {
    if (slotInstructions) for (const instruction of slotInstructions) destination.write(instruction);
    if (isPage || renderer?.name === "astro:jsx") destination.write(html);
    else if (html && html.length > 0) {
      const output = renderer ? removeStaticAstroSlot(html, renderer.ssr?.supportsAstroStaticSlot) : html;
      destination.write(markHTMLString(output));
    }
  } };
  const astroId = shorthash(`<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(props, metadata)}`);
  const island = await generateHydrateScript({
    renderer,
    result,
    astroId,
    props,
    attrs
  }, metadata);
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) for (const key of Object.keys(children)) {
      let tagName = renderer?.ssr?.supportsAstroStaticSlot ? !!metadata.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot";
      let expectedHTML = key === "default" ? `<${tagName}>` : `<${tagName} name="${escapeHTML(key)}">`;
      if (!html.includes(expectedHTML)) unrenderedSlots.push(key);
    }
  } else unrenderedSlots = Object.keys(children);
  const template2 = unrenderedSlots.length > 0 ? unrenderedSlots.map((key) => `<template data-astro-template${key !== "default" ? `="${escapeHTML(key)}"` : ""}>${children[key]}</template>`).join("") : "";
  island.children = `${html ?? ""}${template2}`;
  if (island.children) {
    island.props["await-children"] = "";
    island.children += `<!--astro:end-->`;
  }
  return { render(destination) {
    if (slotInstructions) for (const instruction of slotInstructions) destination.write(instruction);
    destination.write(createRenderInstruction({
      type: "directive",
      hydration
    }));
    if (hydration.directive !== "only" && renderer?.ssr.renderHydrationScript) destination.write(createRenderInstruction({
      type: "renderer-hydration-script",
      rendererName: renderer.name,
      render: renderer.ssr.renderHydrationScript
    }));
    const renderedElement = renderElement$1("astro-island", island, false);
    destination.write(markHTMLString(renderedElement));
  } };
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/;
  if (!unsafe.test(tag)) return tag;
  return tag.trim().split(unsafe)[0].trim();
}
function renderFragmentComponent(result, slots = {}) {
  const slot = slots?.default;
  const preRendered = slot?.(result);
  return { render(destination) {
    if (preRendered == null) return;
    return renderChild(destination, preRendered);
  } };
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html = Component({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => chunkToString(result, instr)).join("") : "";
  return { render(destination) {
    destination.write(markHTMLString(hydrationHtml + html));
  } };
}
function renderAstroComponent(result, displayName, Component, props, slots = {}) {
  if (containsServerDirective(props)) {
    const serverIslandComponent = new ServerIslandComponent(result, props, slots, displayName);
    result._metadata.propagators.add(serverIslandComponent);
    return serverIslandComponent;
  }
  return createAstroComponentInstance(result, displayName, Component, props, slots);
}
function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isAstroComponentFactory(Component)) return renderAstroComponent(result, displayName, Component, normalizeProps(props), slots);
  if (isPromise(Component)) return Component.catch(handleCancellation).then((x) => {
    return renderComponent(result, displayName, x, props, slots);
  });
  if (isFragmentComponent(Component)) return renderFragmentComponent(result, slots);
  props = normalizeProps(props);
  if (isHTMLComponent(Component)) return renderHTMLComponent(result, Component, props, slots).catch(handleCancellation);
  return renderFrameworkComponent(result, displayName, Component, props, slots).catch(handleCancellation);
  function handleCancellation(e2) {
    if (result.cancelled) return { render() {
    } };
    throw e2;
  }
  __name(handleCancellation, "handleCancellation");
}
function normalizeProps(props) {
  if (props["class:list"] !== void 0) {
    const value = props["class:list"];
    delete props["class:list"];
    props["class"] = clsx(props["class"], value);
    if (props["class"] === "") delete props["class"];
  }
  return props;
}
async function renderComponentToString(result, displayName, Component, props, slots = {}, isPage = false, route) {
  let str = "";
  let renderedFirstPageChunk = false;
  let head = "";
  if (isPage && !result.partial && nonAstroPageNeedsHeadInjection(Component)) head += chunkToString(result, maybeRenderHead());
  try {
    const destination = { write(chunk) {
      if (isPage && !result.partial && !renderedFirstPageChunk) {
        renderedFirstPageChunk = true;
        if (!/<!doctype html/i.test(String(chunk))) {
          const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
          str += doctype + head;
        }
      }
      if (chunk instanceof Response) return;
      str += chunkToString(result, chunk);
    } };
    const renderInstance = await renderComponent(result, displayName, Component, props, slots);
    if (containsServerDirective(props)) await bufferPropagatedHead(result, { awaitPendingSlots: false });
    await renderInstance.render(destination);
  } catch (e2) {
    if (AstroError.is(e2) && !e2.loc) e2.setLocation({ file: route?.component });
    throw e2;
  }
  return str;
}
function nonAstroPageNeedsHeadInjection(pageComponent) {
  return !!pageComponent?.[needsHeadRenderingSymbol];
}
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") return "";
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode): {
      const renderedItems = await Promise.all(vnode.map((v) => renderJSX(result, v)));
      let instructions = null;
      let content = "";
      for (const item of renderedItems) if (item instanceof SlotString) {
        content += item;
        instructions = mergeSlotInstructions(instructions, item);
      } else content += item;
      if (instructions) return markHTMLString(new SlotString(content, instructions));
      return markHTMLString(content);
    }
  }
  return renderJSXVNode(result, vnode);
}
async function renderJSXVNode(result, vnode) {
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type:
        throw new Error(`Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      case vnode.type === /* @__PURE__ */ Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case isAstroComponentFactory(vnode.type): {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) if (key === "children" || value && typeof value === "object" && value["$$slot"]) slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
        else props[key] = value;
        return markHTMLString(await renderComponentToString(result, vnode.type.name, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder && !vnode.type.includes("-")):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots = function(child) {
        if (Array.isArray(child)) return child.map((c) => extractSlots(c));
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props && !isCustomElement2) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      __name(extractSlots, "extractSlots");
      if (typeof vnode.type === "function" && vnode.props["server:root"]) return await renderJSX(result, await vnode.type(vnode.props ?? {}));
      if (typeof vnode.type === "function") {
        if (vnode.props[hasTriedRenderComponentSymbol]) {
          delete vnode.props[hasTriedRenderComponentSymbol];
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2?.["astro:jsx"] || !output2) return await renderJSXVNode(result, output2);
          else return;
        } else vnode.props[hasTriedRenderComponentSymbol] = true;
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = { default: [] };
      const isCustomElement2 = typeof vnode.type === "string" && vnode.type.includes("-");
      extractSlots(children);
      for (const [key, value] of Object.entries(props)) if (value?.["$$slot"]) {
        _slots[key] = value;
        delete props[key];
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) slotPromises.push(renderJSX(result, value).then((output2) => {
        if (output2.toString().trim().length === 0) return;
        slots[key] = () => output2;
      }));
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) output = await renderComponentToString(result, vnode.props["client:display-name"] ?? "", null, props, slots);
      else output = await renderComponentToString(result, typeof vnode.type === "function" ? vnode.type.name : vnode.type, vnode.type, props, slots);
      return markHTMLString(output);
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(`<${tag}${spreadAttributes(props)}${markHTMLString((children == null || children === "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, prerenderElementChildren(tag, children))}</${tag}>`)}`);
}
function prerenderElementChildren(tag, children) {
  if (typeof children === "string" && tag === "style") return markHTMLString(escapeStyleText(children));
  return children;
}
function setCspMetaPlaceholder(result) {
  if (result.shouldInjectCspMetaTags && result.cspDestination === "meta") result._metadata.cspMetaPlaceholder = `<!--astro-csp-meta-${crypto.randomUUID()}-->`;
  return result._metadata.cspMetaPlaceholder;
}
function replaceCspMetaPlaceholder(result, placeholder, html) {
  return placeholder ? html.replace(placeholder, () => renderCspMetaTag(result)) : html;
}
async function renderPage(result, componentFactory, props, children, streaming, route) {
  if (!isAstroComponentFactory(componentFactory)) {
    const nonAstroMeta = result.componentMetadata.get(componentFactory.moduleId);
    result._metadata.headInTree = nonAstroMeta?.containsHead ?? false;
    result._metadata.routeHasPropagation = isPropagatingHint(nonAstroMeta?.propagation ?? "none");
    const pageProps = {
      ...props ?? {},
      "server:root": true
    };
    const cspMetaPlaceholder = setCspMetaPlaceholder(result);
    let str = await renderComponentToString(result, componentFactory.name, componentFactory, pageProps, {}, true, route);
    str = replaceCspMetaPlaceholder(result, cspMetaPlaceholder, str);
    const bytes = encoder.encode(str);
    const headers2 = new Headers([["Content-Type", "text/html"], ["Content-Length", bytes.byteLength.toString()]]);
    if (result.shouldInjectCspMetaTags && (result.cspDestination === "header" || result.cspDestination === "adapter")) headers2.set("content-security-policy", renderCspContent(result));
    return new Response(bytes, {
      headers: headers2,
      status: result.response.status
    });
  }
  const pageMeta = result.componentMetadata.get(componentFactory.moduleId);
  result._metadata.headInTree = pageMeta?.containsHead ?? false;
  result._metadata.routeHasPropagation = isPropagatingHint(pageMeta?.propagation ?? "none");
  let body;
  if (streaming) {
    if (isNode && !isDeno) {
      const nodeBody = await renderToAsyncIterable(result, componentFactory, props, children, true, route);
      if (isWorkerd && !(nodeBody instanceof Response)) body = ReadableStream.from(nodeBody);
      else body = nodeBody;
    } else body = await renderToReadableStream(result, componentFactory, props, children, true, route);
  } else {
    const cspMetaPlaceholder = setCspMetaPlaceholder(result);
    body = await renderToString(result, componentFactory, props, children, true, route);
    if (typeof body === "string") body = replaceCspMetaPlaceholder(result, cspMetaPlaceholder, body);
  }
  if (body instanceof Response) return body;
  const init = result.response;
  const headers = new Headers(init.headers);
  if (result.shouldInjectCspMetaTags && result.cspDestination === "header" || result.cspDestination === "adapter") headers.set("content-security-policy", renderCspContent(result));
  if (!streaming && typeof body === "string") {
    body = encoder.encode(body);
    headers.set("Content-Length", body.byteLength.toString());
  }
  let status = init.status;
  let statusText = init.statusText;
  if (route?.route && isRoute404(route.route)) {
    status = 404;
    if (statusText === "OK") statusText = "Not Found";
  } else if (route?.route && isRoute500(route.route)) {
    status = 500;
    if (statusText === "OK") statusText = "Internal Server Error";
  }
  if (status) return new Response(body, {
    ...init,
    headers,
    status,
    statusText
  });
  else return new Response(body, {
    ...init,
    headers
  });
}
function spreadAttributes(values = {}, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") values.class += ` ${scopedClassName}`;
    else if (typeof values["class:list"] !== "undefined") values["class:list"] = [values["class:list"], scopedClassName];
    else values.class = scopedClassName;
  }
  for (const key of Object.keys(values)) output += addAttribute(values[key], key, true, _name);
  return markHTMLString(output);
}
var ClientAddressNotAvailable, PrerenderClientAddressNotAvailable, StaticClientAddressNotAvailable, NoMatchingStaticPathFound, OnlyResponseCanBeReturned, MissingMediaQueryDirective, NoMatchingRenderer, NoClientOnlyHint, InvalidGetStaticPathsEntry, InvalidGetStaticPathsReturn, GetStaticPathsExpectedParams, GetStaticPathsInvalidRouteParam, GetStaticPathsRequired, ReservedSlotName, NoMatchingImport, InvalidComponentArgs, PageNumberParamNotFound, PrerenderDynamicEndpointPathCollide, ResponseSentError, MiddlewareNoDataOrNextCalled, MiddlewareNotAResponse, EndpointDidNotReturnAResponse, LocalsNotAnObject, LocalsReassigned, AstroResponseHeadersReassigned, i18nNoLocaleFoundInPath, RewriteWithBodyUsed, ForbiddenRewrite, MissingGetFontFileRequestUrl, UnavailableAstroGlobal, NoManifestAvailable, ActionsReturnedInvalidDataError, ActionNotFoundError, SessionStorageInitError, SessionStorageSaveError, CacheNotEnabled, AstroError, alphabetUpperCase, decodeMap, EncodingPadding$1, DecodingPadding$1, base64Alphabet, EncodingPadding, DecodingPadding, base64DecodeMap, Cached, captureStackTrace, allowsEval, propertyKeyTypes, NUMBER_FORMAT_RANGES, BIGINT_FORMAT_RANGES, highSurrogate, installing, broke, breaker, CONSTANT_CATCH, _a$1, _zodDesc, _E, $ZodAsyncError, $ZodEncodeError, globalConfig, _messageDesc, _issuesDesc, _installedToString, initializer$1, $ZodError, _parse, _parseAsync, _safeParse, _safeParseAsync, COMPILE_INVALID, COMPILE_FALLBACK, validate, validateAsync$1, _encode, _decode, _encodeAsync, _decodeAsync, _safeEncode, _safeDecode, _safeEncodeAsync, _safeDecodeAsync, cuid, cuid2, ulid, xid, ksuid, nanoid, duration, guid, uuid, email, _emoji$1, ipv4, ipv6, cidrv4, cidrv6, base64, base64url, httpProtocol, e164, dateSource, date, anyString, lowercase, uppercase, $ZodCheck, _whenHasLength, $ZodCheckMaxLength, $ZodCheckMinLength, $ZodCheckLengthEquals, $ZodCheckStringFormat, $ZodCheckRegex, $ZodCheckLowerCase, $ZodCheckUpperCase, $ZodCheckIncludes, $ZodCheckStartsWith, $ZodCheckEndsWith, $ZodCheckOverwrite, Doc, version, $ZodType, toStandardResult, $ZodString, $ZodStringFormat, $ZodGUID, $ZodUUID, $ZodEmail, asciiTabOrNewline, $ZodURL, $ZodEmoji, $ZodNanoID, $ZodCUID, $ZodCUID2, $ZodULID, $ZodXID, $ZodKSUID, $ZodISODateTime, $ZodISODate, $ZodISOTime, $ZodISODuration, $ZodIPv4, ipv6Alphabet, $ZodIPv6, $ZodCIDRv4, $ZodCIDRv6, base64Charset, $ZodBase64, base64urlCharset, $ZodBase64URL, $ZodE164, $ZodJWT, $ZodUnknown, $ZodNever, arraySize, $ZodArray, NO_SYMBOL_KEYS, $ZodObject, $ZodObjectJIT, $ZodUnion, $ZodIntersection, $ZodEnum, $ZodTransform, $ZodOptional, $ZodExactOptional, $ZodNullable, $ZodDefault, $ZodPrefault, $ZodNonOptional, $ZodCatch, $ZodPipe, $ZodReadonly, $ZodCustom, $ZodCyclicError, STATE, NO_ISSUES, recursive, NONE, ASSUMED, PROVEN, handoff, open, memo, error, _a, $ZodRegistry, globalRegistry, FOLDABLE_KEYS, UNION_KEYS, createToJSONSchemaMethod, createStandardJSONSchemaMethod, narrowMin, narrowMax, narrowBoth, addDivisor, addPattern, intersectMime, setFormat, minContributor, maxContributor, formatContributor, contributors, formatMap, exactPatterns, exactPattern, stringProcessor, neverProcessor, enumProcessor, customProcessor, transformProcessor, arrayProcessor, objectProcessor, unionProcessor, intersectionProcessor, nullableProcessor, nonoptionalProcessor, UNREPRESENTABLE_DEFAULT, defaultProcessor, prefaultProcessor, catchProcessor, pipeProcessor, readonlyProcessor, optionalProcessor, _installedErrorProtos, initializer, ZodRealError, parse, parseAsync, safeParse, safeParseAsync, encode, decode, encodeAsync, decodeAsync, safeEncode, safeDecode, safeEncodeAsync, safeDecodeAsync, ZodType, _ZodString, ZodString, ZodStringFormat, ZodISODateTime, ZodISODate, ZodISOTime, ZodISODuration, ZodEmail, ZodGUID, ZodUUID, ZodURL, ZodEmoji, ZodNanoID, ZodCUID, ZodCUID2, ZodULID, ZodXID, ZodKSUID, ZodIPv4, ZodIPv6, ZodCIDRv4, ZodCIDRv6, ZodBase64, ZodBase64URL, ZodE164, ZodJWT, ZodUnknown, ZodNever, ZodArray, ZodObject, ZodUnion, ZodIntersection, ZodEnum, ZodTransform, ZodOptional, ZodExactOptional, ZodNullable, ZodDefault, ZodPrefault, ZodNonOptional, ZodCatch, ZodPipe, ZodReadonly, ZodCustom, ZodIssueCode, ZodFirstPartyTypeKind, ALGORITHMS, ALGORITHM_VALUES, cspHashSchema, cspKindSchema, ATTRIBUTE_ALLOWED_RESOURCES, ALLOWED_DIRECTIVES, ALGORITHM, encoder$1, decoder$1, IV_LENGTH, ASTRO_GENERATOR, ASTRO_ERROR_HEADER, DEFAULT_404_COMPONENT, REDIRECT_STATUS_CODES, REROUTABLE_STATUS_CODES, STATUS_CODE_PAGES, clientAddressSymbol, originPathnameSymbol, fetchStateSymbol, responseSentSymbol, e, t, n, r$1, i, a, o, s, ROUTE404_RE, ROUTE500_RE, ROUTE3XX_RE, ESCAPABLE, HTMLBytes, htmlStringSymbol, HTMLString, markHTMLString, PROP_TYPE, transitionDirectivesToCopyOnIsland, dictionary, binary, headAndContentSym, astro_island_prebuilt_default, ISLAND_STYLES, RenderInstructionSymbol, voidElementNames, htmlBooleanAttributes, AMPERSAND_REGEX, DOUBLE_QUOTE_REGEX, STATIC_DIRECTIVES, INVALID_ATTR_NAME_CHAR, toIdent, toAttributeString, kebab, toStyleString, ATTRIBUTE_KIND, noop, BufferedRenderer, isNode, isDeno, isWorkerd, HEAD_INSTRUCTION, MAYBE_HEAD_INSTRUCTION, SERVER_ISLAND_START, renderTemplateResultSym, markedHtmlParts, RenderTemplateResult, slotString, SlotString, SlotRenderInstance, internalProps, ServerIslandComponent, renderServerIslandRuntime, SERVER_ISLAND_REPLACER, Fragment, Renderer, encoder, decoder, astroComponentInstanceSym, CLIENT_DIRECTIVE_PREFIX, AstroComponentInstance, ClientOnlyPlaceholder$1, TemplateFrame, StreamingRenderState, DOCTYPE_EXP, needsHeadRenderingSymbol, rendererAliases, clientOnlyValues, ASTRO_SLOT_EXP, ASTRO_STATIC_SLOT_EXP, ClientOnlyPlaceholder, hasTriedRenderComponentSymbol;
var init_compiler_8THfIuk0 = __esm({
  "server/chunks/compiler_8THfIuk0.mjs"() {
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    ClientAddressNotAvailable = {
      name: "ClientAddressNotAvailable",
      title: "`Astro.clientAddress` is not available in current adapter.",
      message: /* @__PURE__ */ __name((adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`, "message")
    };
    PrerenderClientAddressNotAvailable = {
      name: "PrerenderClientAddressNotAvailable",
      title: "`Astro.clientAddress` cannot be used inside prerendered routes.",
      message: /* @__PURE__ */ __name((name) => `\`Astro.clientAddress\` cannot be used inside prerendered route ${name}.`, "message")
    };
    StaticClientAddressNotAvailable = {
      name: "StaticClientAddressNotAvailable",
      title: "`Astro.clientAddress` is not available in prerendered pages.",
      message: "`Astro.clientAddress` is only available on pages that are server-rendered.",
      hint: "See https://docs.astro.build/en/guides/on-demand-rendering/ for more information on how to enable SSR."
    };
    NoMatchingStaticPathFound = {
      name: "NoMatchingStaticPathFound",
      title: "No static path found for requested path.",
      message: /* @__PURE__ */ __name((pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`, "message"),
      hint: /* @__PURE__ */ __name((possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`, "hint")
    };
    OnlyResponseCanBeReturned = {
      name: "OnlyResponseCanBeReturned",
      title: "Invalid type returned by Astro page.",
      message: /* @__PURE__ */ __name((route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`, "message"),
      hint: "See https://docs.astro.build/en/guides/on-demand-rendering/#response for more information."
    };
    MissingMediaQueryDirective = {
      name: "MissingMediaQueryDirective",
      title: "Missing value for `client:media` directive.",
      message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided.'
    };
    NoMatchingRenderer = {
      name: "NoMatchingRenderer",
      title: "No matching renderer found.",
      message: /* @__PURE__ */ __name((componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are" : "is"} ${validRenderersCount} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`, "message"),
      hint: /* @__PURE__ */ __name((probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/guides/framework-components/ for more information on how to install and configure integrations.`, "hint")
    };
    NoClientOnlyHint = {
      name: "NoClientOnlyHint",
      title: "Missing hint on client:only directive.",
      message: /* @__PURE__ */ __name((componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`, "message"),
      hint: /* @__PURE__ */ __name((probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on \`client:only\`.`, "hint")
    };
    InvalidGetStaticPathsEntry = {
      name: "InvalidGetStaticPathsEntry",
      title: "Invalid entry inside `getStaticPaths()`'s return value.",
      message: /* @__PURE__ */ __name((entryType) => `Invalid entry returned by \`getStaticPaths()\`. Expected an object, got \`${entryType}\`.`, "message"),
      hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/routing-reference/#getstaticpaths for more information on `getStaticPaths()`."
    };
    InvalidGetStaticPathsReturn = {
      name: "InvalidGetStaticPathsReturn",
      title: "Invalid value returned by `getStaticPaths()`.",
      message: /* @__PURE__ */ __name((returnType) => `Invalid type returned by \`getStaticPaths()\`. Expected an \`array\`, got \`${returnType}\`.`, "message"),
      hint: "See https://docs.astro.build/en/reference/routing-reference/#getstaticpaths for more information on `getStaticPaths()`."
    };
    GetStaticPathsExpectedParams = {
      name: "GetStaticPathsExpectedParams",
      title: "Missing params property on `getStaticPaths()` route.",
      message: "Missing or empty required `params` property on `getStaticPaths()` route.",
      hint: "See https://docs.astro.build/en/reference/routing-reference/#getstaticpaths for more information on `getStaticPaths()`."
    };
    GetStaticPathsInvalidRouteParam = {
      name: "GetStaticPathsInvalidRouteParam",
      title: "Invalid route parameter returned by `getStaticPaths()`.",
      message: /* @__PURE__ */ __name((key, value, valueType) => `Invalid \`getStaticPaths()\` route parameter for \`${key}\`. Expected a string or undefined, received \`${valueType}\` (\`${value}\`).`, "message"),
      hint: "See https://docs.astro.build/en/reference/routing-reference/#getstaticpaths for more information on `getStaticPaths()`."
    };
    GetStaticPathsRequired = {
      name: "GetStaticPathsRequired",
      title: "`getStaticPaths()` function required for dynamic routes.",
      message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths()` function from your dynamic route.",
      hint: `See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.

	If you meant for this route to be server-rendered, set \`export const prerender = false;\` in the page.`
    };
    ReservedSlotName = {
      name: "ReservedSlotName",
      title: "Invalid slot name.",
      message: /* @__PURE__ */ __name((slotName) => `Unable to create a slot named \`${slotName}\`. \`${slotName}\` is a reserved slot name. Please update the name of this slot.`, "message")
    };
    NoMatchingImport = {
      name: "NoMatchingImport",
      title: "No import found for component.",
      message: /* @__PURE__ */ __name((componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`, "message"),
      hint: "Please make sure the component is properly imported."
    };
    InvalidComponentArgs = {
      name: "InvalidComponentArgs",
      title: "Invalid component arguments.",
      message: /* @__PURE__ */ __name((name) => `Invalid arguments passed to${name ? ` <${name}>` : ""} component.`, "message"),
      hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."
    };
    PageNumberParamNotFound = {
      name: "PageNumberParamNotFound",
      title: "Page number param not found.",
      message: /* @__PURE__ */ __name((paramName) => `[paginate()] page number param \`${paramName}\` not found in your filepath.`, "message"),
      hint: "Rename your file to `[page].astro` or `[...page].astro`."
    };
    PrerenderDynamicEndpointPathCollide = {
      name: "PrerenderDynamicEndpointPathCollide",
      title: "Prerendered dynamic endpoint has path collision.",
      message: /* @__PURE__ */ __name((pathname) => `Could not render \`${pathname}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`, "message"),
      hint: /* @__PURE__ */ __name((filename) => `Rename \`${filename}\` to \`${filename.replace(/\.(?:js|ts)/, (m) => `.json` + m)}\``, "hint")
    };
    ResponseSentError = {
      name: "ResponseSentError",
      title: "Unable to set response.",
      message: "The response has already been sent to the browser and cannot be altered."
    };
    MiddlewareNoDataOrNextCalled = {
      name: "MiddlewareNoDataOrNextCalled",
      title: "The middleware didn't return a `Response`.",
      message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function."
    };
    MiddlewareNotAResponse = {
      name: "MiddlewareNotAResponse",
      title: "The middleware returned something that is not a `Response` object.",
      message: "Any data returned from middleware must be a valid `Response` object."
    };
    EndpointDidNotReturnAResponse = {
      name: "EndpointDidNotReturnAResponse",
      title: "The endpoint did not return a `Response`.",
      message: "An endpoint must return either a `Response`, or a `Promise` that resolves with a `Response`."
    };
    LocalsNotAnObject = {
      name: "LocalsNotAnObject",
      title: "Value assigned to `locals` is not accepted.",
      message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.",
      hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`."
    };
    LocalsReassigned = {
      name: "LocalsReassigned",
      title: "`locals` must not be reassigned.",
      message: "`locals` cannot be assigned directly.",
      hint: "Set a `locals` property instead."
    };
    AstroResponseHeadersReassigned = {
      name: "AstroResponseHeadersReassigned",
      title: "`Astro.response.headers` must not be reassigned.",
      message: "Individual headers can be added to and removed from `Astro.response.headers`, but it must not be replaced with another instance of `Headers` altogether.",
      hint: "Consider using `Astro.response.headers.add()`, and `Astro.response.headers.delete()`."
    };
    i18nNoLocaleFoundInPath = {
      name: "i18nNoLocaleFoundInPath",
      title: "The path doesn't contain any locale.",
      message: "You tried to use an i18n utility on a path that doesn't contain any locale. You can use `pathHasLocale` first to determine if the path has a locale."
    };
    RewriteWithBodyUsed = {
      name: "RewriteWithBodyUsed",
      title: "Cannot use `Astro.rewrite()` after the request body has been read.",
      message: "`Astro.rewrite()` cannot be used if the request body has already been read. If you need to read the body, first clone the request.",
      hint: "Read the body from `Astro.request.clone()` instead of `Astro.request`, so the original request can still be rewritten."
    };
    ForbiddenRewrite = {
      name: "ForbiddenRewrite",
      title: "Forbidden rewrite to a static route.",
      message: /* @__PURE__ */ __name((from, to, component) => `You tried to rewrite the on-demand route '${from}' with the static route '${to}', when using the 'server' output. 

The static route '${to}' is rendered by the component
'${component}', which is marked as prerendered. This is a forbidden operation because during the build, the component '${component}' is compiled to an
HTML file, which can't be retrieved at runtime by Astro.`, "message"),
      hint: /* @__PURE__ */ __name((component) => `Add \`export const prerender = false\` to the component '${component}', or use \`Astro.redirect()\`.`, "hint")
    };
    MissingGetFontFileRequestUrl = {
      name: "MissingGetFontFileRequestUrl",
      title: "`experimental_getFontFileURL()` requires the request URL with on-demand rendering.",
      hint: "Pass the request URL as the 2nd argument, for example `Astro.url`."
    };
    UnavailableAstroGlobal = {
      name: "UnavailableAstroGlobal",
      title: "Unavailable Astro global in `getStaticPaths()`.",
      message: /* @__PURE__ */ __name((name) => `The Astro global is not available in this scope. Please remove \`Astro.${name}\` from your \`getStaticPaths()\` function.`, "message")
    };
    NoManifestAvailable = {
      name: "NoManifestAvailable",
      title: "No manifest available.",
      message: "`new FetchState(request)` was called outside of an Astro server, so no manifest is available.",
      hint: "Make sure this code runs as part of your Astro app, such as its fetch entrypoint. If this error occurred inside an Astro-built server, please open an issue at https://github.com/withastro/astro/issues."
    };
    ActionsReturnedInvalidDataError = {
      name: "ActionsReturnedInvalidDataError",
      title: "Action handler returned invalid data.",
      message: /* @__PURE__ */ __name((error3) => `Action handler returned invalid data. Handlers should return serializable data types like objects, arrays, strings, and numbers. Parse error: ${error3}`, "message"),
      hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
    };
    ActionNotFoundError = {
      name: "ActionNotFoundError",
      title: "Action not found.",
      message: /* @__PURE__ */ __name((actionName) => `The server received a request for an action named \`${actionName}\` but could not find a match. If you renamed an action, check that you've updated your \`actions/index\` file and your calling code to match.`, "message"),
      hint: "You can run `astro check` to detect type errors caused by mismatched action names."
    };
    SessionStorageInitError = {
      name: "SessionStorageInitError",
      title: "Session storage could not be initialized.",
      message: /* @__PURE__ */ __name((error3, driver) => `Error when initializing session storage${driver ? ` with driver \`${driver}\`` : ""}. \`${error3 ?? ""}\``, "message"),
      hint: "For more information, see https://docs.astro.build/en/guides/sessions/"
    };
    SessionStorageSaveError = {
      name: "SessionStorageSaveError",
      title: "Session data could not be saved.",
      message: /* @__PURE__ */ __name((error3, driver) => `Error when saving session data${driver ? ` with driver \`${driver}\`` : ""}. \`${error3 ?? ""}\``, "message"),
      hint: "For more information, see https://docs.astro.build/en/guides/sessions/"
    };
    CacheNotEnabled = {
      name: "CacheNotEnabled",
      title: "Cache is not enabled.",
      message: "`Astro.cache` is not available because the cache feature is not enabled. To use caching, configure a cache provider in your Astro config under `cache`.",
      hint: 'Use an adapter that provides a default cache provider, or set one explicitly: `cache: { provider: "..." }`. See https://docs.astro.build/en/guides/caching/.'
    };
    __name(normalizeLF, "normalizeLF");
    __name(codeFrame, "codeFrame");
    __name(isAstroError, "isAstroError");
    AstroError = class extends Error {
      static {
        __name(this, "AstroError");
      }
      loc;
      title;
      hint;
      frame;
      type = "AstroError";
      constructor(props, options) {
        const { name, title, message, stack, location, hint, frame } = props;
        super(message, options);
        this.title = title;
        this.name = name;
        if (message) this.message = message;
        this.stack = stack ? stack : this.stack;
        this.loc = location;
        this.hint = hint;
        this.frame = frame;
      }
      setLocation(location) {
        this.loc = location;
      }
      setName(name) {
        this.name = name;
      }
      setMessage(message) {
        this.message = message;
      }
      setHint(hint) {
        this.hint = hint;
      }
      setFrame(source, location) {
        this.frame = codeFrame(source, location);
      }
      static is(err) {
        return err?.type === "AstroError";
      }
    };
    __name(encodeHexUpperCase, "encodeHexUpperCase");
    __name(decodeHex, "decodeHex");
    alphabetUpperCase = "0123456789ABCDEF";
    decodeMap = {
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    };
    (function(EncodingPadding2) {
      EncodingPadding2[EncodingPadding2["Include"] = 0] = "Include";
      EncodingPadding2[EncodingPadding2["None"] = 1] = "None";
    })(EncodingPadding$1 || (EncodingPadding$1 = {}));
    (function(DecodingPadding2) {
      DecodingPadding2[DecodingPadding2["Required"] = 0] = "Required";
      DecodingPadding2[DecodingPadding2["Ignore"] = 1] = "Ignore";
    })(DecodingPadding$1 || (DecodingPadding$1 = {}));
    __name(encodeBase64, "encodeBase64");
    __name(encodeBase64_internal, "encodeBase64_internal");
    base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    __name(decodeBase64, "decodeBase64");
    __name(decodeBase64_internal, "decodeBase64_internal");
    (function(EncodingPadding2) {
      EncodingPadding2[EncodingPadding2["Include"] = 0] = "Include";
      EncodingPadding2[EncodingPadding2["None"] = 1] = "None";
    })(EncodingPadding || (EncodingPadding = {}));
    (function(DecodingPadding2) {
      DecodingPadding2[DecodingPadding2["Required"] = 0] = "Required";
      DecodingPadding2[DecodingPadding2["Ignore"] = 1] = "Ignore";
    })(DecodingPadding || (DecodingPadding = {}));
    base64DecodeMap = {
      "0": 52,
      "1": 53,
      "2": 54,
      "3": 55,
      "4": 56,
      "5": 57,
      "6": 58,
      "7": 59,
      "8": 60,
      "9": 61,
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      I: 8,
      J: 9,
      K: 10,
      L: 11,
      M: 12,
      N: 13,
      O: 14,
      P: 15,
      Q: 16,
      R: 17,
      S: 18,
      T: 19,
      U: 20,
      V: 21,
      W: 22,
      X: 23,
      Y: 24,
      Z: 25,
      a: 26,
      b: 27,
      c: 28,
      d: 29,
      e: 30,
      f: 31,
      g: 32,
      h: 33,
      i: 34,
      j: 35,
      k: 36,
      l: 37,
      m: 38,
      n: 39,
      o: 40,
      p: 41,
      q: 42,
      r: 43,
      s: 44,
      t: 45,
      u: 46,
      v: 47,
      w: 48,
      x: 49,
      y: 50,
      z: 51,
      "+": 62,
      "/": 63
    };
    __name(getEnumValues, "getEnumValues");
    __name(joinValues, "joinValues");
    __name(jsonStringifyReplacer, "jsonStringifyReplacer");
    Cached = class {
      static {
        __name(this, "Cached");
      }
      constructor(getter) {
        this._getter = getter;
        this._value = void 0;
      }
      get value() {
        const getter = this._getter;
        if (getter !== void 0) {
          this._value = getter();
          this._getter = void 0;
        }
        return this._value;
      }
    };
    __name(cached, "cached");
    __name(nullish, "nullish");
    __name(cleanRegex, "cleanRegex");
    __name(assignProp, "assignProp");
    __name(rawShape, "rawShape");
    __name(sourceShape, "sourceShape");
    __name(deferProp, "deferProp");
    __name(putProp, "putProp");
    __name(mirrorShape, "mirrorShape");
    __name(mirrorProps, "mirrorProps");
    __name(mergeDefs, "mergeDefs");
    __name(esc, "esc");
    __name(slugify, "slugify");
    captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
    };
    __name(isObject, "isObject");
    allowsEval = /* @__PURE__ */ cached(() => {
      if (globalConfig.jitless) return false;
      if (typeof navigator !== "undefined" && "Cloudflare-Workers"?.includes("Cloudflare")) return false;
      try {
        new Function("");
        return true;
      } catch (_) {
        return false;
      }
    });
    __name(isPlainObject, "isPlainObject");
    __name(shallowClone, "shallowClone");
    propertyKeyTypes = /* @__PURE__ */ new Set([
      "string",
      "number",
      "symbol"
    ]);
    __name(escapeRegex, "escapeRegex");
    __name(clone, "clone");
    __name(normalizeParams, "normalizeParams");
    __name(stringifyPrimitive, "stringifyPrimitive");
    __name(optionalKeys, "optionalKeys");
    NUMBER_FORMAT_RANGES = /* @__PURE__ */ (() => ({
      safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      int32: [-2147483648, 2147483647],
      uint32: [0, 4294967295],
      float32: [-34028234663852886e22, 34028234663852886e22],
      float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
    }))();
    BIGINT_FORMAT_RANGES = {
      int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
      uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
    };
    __name(pick, "pick");
    __name(maskedKeys, "maskedKeys");
    __name(omit, "omit");
    __name(extend, "extend");
    __name(extended, "extended");
    __name(safeExtend, "safeExtend");
    __name(merge, "merge");
    __name(partial, "partial");
    __name(required, "required");
    __name(aborted, "aborted");
    __name(explicitlyAborted, "explicitlyAborted");
    __name(prefixIssues, "prefixIssues");
    __name(unwrapMessage, "unwrapMessage");
    __name(sizeCaps, "sizeCaps");
    __name(attachSchema, "attachSchema");
    __name(finalizeIssue, "finalizeIssue");
    highSurrogate = /[\uD800-\uDBFF]/;
    __name(codePointLength, "codePointLength");
    __name(getLengthableOrigin, "getLengthableOrigin");
    __name(parsedType, "parsedType");
    __name(issue, "issue");
    __name(members, "members");
    __name(own, "own");
    __name(hide, "hide");
    __name(derived, "derived");
    __name(defineBound, "defineBound");
    __name(claim, "claim");
    broke = false;
    breaker = {
      configurable: true,
      get() {
        broke = true;
      }
    };
    __name(defineLazyInternal, "defineLazyInternal");
    __name(installLazyProp, "installLazyProp");
    CONSTANT_CATCH = "~constantCatch";
    __name(constantCatch, "constantCatch");
    _zodDesc = {
      value: void 0,
      enumerable: false
    };
    _E = "captureStackTrace" in Error ? Error : null;
    __name(newError, "newError");
    __name($constructor, "$constructor");
    $ZodAsyncError = class extends Error {
      static {
        __name(this, "$ZodAsyncError");
      }
      constructor() {
        super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
      }
    };
    $ZodEncodeError = class extends Error {
      static {
        __name(this, "$ZodEncodeError");
      }
      constructor(name) {
        super(`Encountered unidirectional transform during encode: ${name}`);
        this.name = "ZodEncodeError";
      }
    };
    (_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
    globalConfig = globalThis.__zod_globalConfig;
    __name(config, "config");
    __name(_getMessage, "_getMessage");
    __name(_setMessage, "_setMessage");
    _messageDesc = {
      get: _getMessage,
      set: _setMessage,
      enumerable: true,
      configurable: true
    };
    _issuesDesc = {
      value: void 0,
      enumerable: false
    };
    _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
    initializer$1 = /* @__PURE__ */ __name((inst, def) => {
      inst.name = "$ZodError";
      _issuesDesc.value = def;
      Object.defineProperty(inst, "issues", _issuesDesc);
      _issuesDesc.value = void 0;
      Object.defineProperty(inst, "message", _messageDesc);
      const proto = Object.getPrototypeOf(inst);
      if (!_installedToString.has(proto)) {
        _installedToString.add(proto);
        Object.defineProperty(proto, "toString", {
          configurable: true,
          enumerable: false,
          get() {
            const value = /* @__PURE__ */ __name(() => this.message, "value");
            Object.defineProperty(this, "toString", {
              value,
              configurable: true,
              writable: true
            });
            return value;
          },
          set(value) {
            Object.defineProperty(this, "toString", {
              value,
              configurable: true,
              writable: true
            });
          }
        });
      }
    }, "initializer$1");
    $ZodError = /* @__PURE__ */ $constructor("$ZodError", initializer$1);
    __name(node, "node");
    __name(flattenError, "flattenError");
    __name(formatError, "formatError");
    __name(finalizeParams, "finalizeParams");
    _parse = /* @__PURE__ */ __name((_Err) => {
      const fn = /* @__PURE__ */ __name((schema, value, _ctx, _params) => {
        const ctx = _ctx ? {
          ..._ctx,
          async: false
        } : { async: false };
        const result = schema._zod.run({
          value,
          issues: []
        }, ctx);
        if (result instanceof Promise) throw new $ZodAsyncError();
        if (result.issues.length) {
          const e2 = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
          captureStackTrace(e2, _params?.callee ?? fn);
          throw e2;
        }
        return result.value;
      }, "fn");
      return fn;
    }, "_parse");
    _parseAsync = /* @__PURE__ */ __name((_Err) => {
      const fn = /* @__PURE__ */ __name(async (schema, value, _ctx, params) => {
        const ctx = _ctx ? {
          ..._ctx,
          async: true
        } : { async: true };
        let result = schema._zod.run({
          value,
          issues: []
        }, ctx);
        if (result instanceof Promise) result = await result;
        if (result.issues.length) {
          const e2 = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
          captureStackTrace(e2, params?.callee ?? fn);
          throw e2;
        }
        return result.value;
      }, "fn");
      return fn;
    }, "_parseAsync");
    _safeParse = /* @__PURE__ */ __name((_Err) => (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        async: false
      } : { async: false };
      const result = schema._zod.run({
        value,
        issues: []
      }, ctx);
      if (result instanceof Promise) throw new $ZodAsyncError();
      return result.issues.length ? failure(_Err, result.issues, ctx) : {
        success: true,
        data: result.value
      };
    }, "_safeParse");
    __name(failure, "failure");
    _safeParseAsync = /* @__PURE__ */ __name((_Err) => async (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        async: true
      } : { async: true };
      let result = schema._zod.run({
        value,
        issues: []
      }, ctx);
      if (result instanceof Promise) result = await result;
      return result.issues.length ? failure(_Err, result.issues, ctx) : {
        success: true,
        data: result.value
      };
    }, "_safeParseAsync");
    COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
    COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
    validate = /* @__PURE__ */ __name(((schema, value, _ctx) => {
      const validator = schema._zod.bag.validator;
      if (validator !== void 0) {
        if (validator(value) !== COMPILE_INVALID) return true;
        if (validator.definite === true && _ctx === void 0) return false;
      }
      return validateFallback(schema, value, _ctx);
    }), "validate");
    __name(validateFallback, "validateFallback");
    validateAsync$1 = /* @__PURE__ */ __name(async (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        async: true,
        abortEarly: true
      } : {
        async: true,
        abortEarly: true
      };
      let result = schema._zod.run({
        value,
        issues: []
      }, ctx);
      if (result instanceof Promise) result = await result;
      return result.issues.length === 0;
    }, "validateAsync$1");
    _encode = /* @__PURE__ */ __name((_Err) => {
      const parse3 = _parse(_Err);
      const fn = /* @__PURE__ */ __name((schema, value, _ctx, _params) => {
        const ctx = _ctx ? {
          ..._ctx,
          direction: "backward"
        } : { direction: "backward" };
        return parse3(schema, value, ctx, finalizeParams(fn, _params));
      }, "fn");
      return fn;
    }, "_encode");
    _decode = /* @__PURE__ */ __name((_Err) => {
      const parse3 = _parse(_Err);
      const fn = /* @__PURE__ */ __name((schema, value, _ctx, _params) => {
        return parse3(schema, value, _ctx, finalizeParams(fn, _params));
      }, "fn");
      return fn;
    }, "_decode");
    _encodeAsync = /* @__PURE__ */ __name((_Err) => {
      const parseAsync2 = _parseAsync(_Err);
      const fn = /* @__PURE__ */ __name(async (schema, value, _ctx, _params) => {
        const ctx = _ctx ? {
          ..._ctx,
          direction: "backward"
        } : { direction: "backward" };
        return await parseAsync2(schema, value, ctx, finalizeParams(fn, _params));
      }, "fn");
      return fn;
    }, "_encodeAsync");
    _decodeAsync = /* @__PURE__ */ __name((_Err) => {
      const parseAsync2 = _parseAsync(_Err);
      const fn = /* @__PURE__ */ __name(async (schema, value, _ctx, _params) => {
        return await parseAsync2(schema, value, _ctx, finalizeParams(fn, _params));
      }, "fn");
      return fn;
    }, "_decodeAsync");
    _safeEncode = /* @__PURE__ */ __name((_Err) => (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        direction: "backward"
      } : { direction: "backward" };
      return _safeParse(_Err)(schema, value, ctx);
    }, "_safeEncode");
    _safeDecode = /* @__PURE__ */ __name((_Err) => (schema, value, _ctx) => {
      return _safeParse(_Err)(schema, value, _ctx);
    }, "_safeDecode");
    _safeEncodeAsync = /* @__PURE__ */ __name((_Err) => async (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        direction: "backward"
      } : { direction: "backward" };
      return _safeParseAsync(_Err)(schema, value, ctx);
    }, "_safeEncodeAsync");
    _safeDecodeAsync = /* @__PURE__ */ __name((_Err) => async (schema, value, _ctx) => {
      return _safeParseAsync(_Err)(schema, value, _ctx);
    }, "_safeDecodeAsync");
    cuid = /^[cC][0-9a-z]{6,}$/;
    cuid2 = /^[0-9a-z]+$/;
    ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
    xid = /^[0-9a-vA-V]{20}$/;
    ksuid = /^[A-Za-z0-9]{27}$/;
    nanoid = /^[a-zA-Z0-9_-]{21}$/;
    __name(nanoidOfLength, "nanoidOfLength");
    duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
    guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
    uuid = /* @__PURE__ */ __name((version2) => {
      if (!version2) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
      return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
    }, "uuid");
    email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
    _emoji$1 = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
    __name(emoji, "emoji");
    ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
    cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
    cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
    base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
    base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
    httpProtocol = /^https?$/;
    e164 = /^\+[1-9]\d{6,14}$/;
    dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
    __name(anchor, "anchor");
    date = /* @__PURE__ */ anchor(dateSource);
    __name(timeSource, "timeSource");
    __name(time, "time");
    __name(datetime, "datetime");
    anyString = /^[\s\S]{0,}$/;
    lowercase = /^[^A-Z]*$/;
    uppercase = /^[^a-z]*$/;
    $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
      var _a2;
      inst._zod ?? (inst._zod = {});
      inst._zod.def = def;
      (_a2 = inst._zod).onattach ?? (_a2.onattach = []);
    });
    _whenHasLength = /* @__PURE__ */ __name((payload) => {
      const val = payload.value;
      return !nullish(val) && val.length !== void 0;
    }, "_whenHasLength");
    $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
      var _a2;
      $ZodCheck.init(inst, def);
      (_a2 = inst._zod.def).when ?? (_a2.when = _whenHasLength);
      inst._zod.check = (payload) => {
        const input = payload.value;
        const units2 = input.length;
        if ((typeof input === "string" && units2 > def.maximum ? codePointLength(input) : units2) <= def.maximum) return;
        const origin = getLengthableOrigin(input);
        payload.issues.push({
          origin,
          code: "too_big",
          maximum: def.maximum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
      var _a2;
      $ZodCheck.init(inst, def);
      (_a2 = inst._zod.def).when ?? (_a2.when = _whenHasLength);
      inst._zod.check = (payload) => {
        const input = payload.value;
        const units2 = input.length;
        if ((typeof input === "string" && units2 >= def.minimum && units2 < def.minimum * 2 ? codePointLength(input) : units2) >= def.minimum) return;
        const origin = getLengthableOrigin(input);
        payload.issues.push({
          origin,
          code: "too_small",
          minimum: def.minimum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
      var _a2;
      $ZodCheck.init(inst, def);
      (_a2 = inst._zod.def).when ?? (_a2.when = _whenHasLength);
      inst._zod.check = (payload) => {
        const input = payload.value;
        const units2 = input.length;
        const length = typeof input === "string" && units2 >= def.length && units2 <= def.length * 2 ? codePointLength(input) : units2;
        if (length === def.length) return;
        const origin = getLengthableOrigin(input);
        const tooBig = length > def.length;
        payload.issues.push({
          origin,
          ...tooBig ? {
            code: "too_big",
            maximum: def.length
          } : {
            code: "too_small",
            minimum: def.length
          },
          inclusive: true,
          exact: true,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
      var _a2, _b;
      $ZodCheck.init(inst, def);
      if (def.pattern) (_a2 = inst._zod).check ?? (_a2.check = (payload) => {
        def.pattern.lastIndex = 0;
        if (def.pattern.test(payload.value)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: def.format,
          input: payload.value,
          ...def.pattern ? { pattern: def.pattern.toString() } : {},
          inst,
          continue: !def.abort
        });
      });
      else (_b = inst._zod).check ?? (_b.check = () => {
      });
    });
    $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
      $ZodCheckStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        def.pattern.lastIndex = 0;
        if (def.pattern.test(payload.value)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "regex",
          input: payload.value,
          pattern: def.pattern.toString(),
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
      def.pattern ?? (def.pattern = lowercase);
      $ZodCheckStringFormat.init(inst, def);
    });
    $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
      def.pattern ?? (def.pattern = uppercase);
      $ZodCheckStringFormat.init(inst, def);
    });
    $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
      $ZodCheck.init(inst, def);
      const escapedRegex = escapeRegex(def.includes);
      def.pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
      inst._zod.check = (payload) => {
        if (payload.value.includes(def.includes, def.position)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "includes",
          includes: def.includes,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
      $ZodCheck.init(inst, def);
      const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
      def.pattern ?? (def.pattern = pattern);
      inst._zod.check = (payload) => {
        if (payload.value.startsWith(def.prefix)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "starts_with",
          prefix: def.prefix,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
      $ZodCheck.init(inst, def);
      const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
      def.pattern ?? (def.pattern = pattern);
      inst._zod.check = (payload) => {
        if (payload.value.endsWith(def.suffix)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "ends_with",
          suffix: def.suffix,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
      $ZodCheck.init(inst, def);
      inst._zod.check = (payload) => {
        payload.value = def.tx(payload.value);
      };
    });
    Doc = class {
      static {
        __name(this, "Doc");
      }
      constructor(args = [], closed = {}) {
        this.content = [];
        this.indent = 0;
        this.args = args;
        this.closed = closed;
      }
      indented(fn) {
        this.indent += 1;
        try {
          fn(this);
        } finally {
          this.indent -= 1;
        }
      }
      write(arg) {
        if (typeof arg === "function") {
          arg(this, { execution: "sync" });
          arg(this, { execution: "async" });
          return;
        }
        const lines = arg.split("\n").filter((x) => x);
        const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
        const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
        for (const line of dedented) this.content.push(line);
      }
      compile() {
        const F = Function;
        const content = this?.content ?? [``];
        return new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${content.join("\n")}
};`)(...Object.values(this.closed));
      }
    };
    version = {
      major: 4,
      minor: 6,
      patch: 7
    };
    $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
      var _a2;
      inst ?? (inst = {});
      inst._zod.def = def;
      inst._zod.bag = inst._zod.bag || {};
      inst._zod.version = version;
      const defChecks = inst._zod.def.checks;
      const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
      for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
      if (checks.length === 0) {
        (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
        inst._zod.deferred?.push(() => {
          inst._zod.run = inst._zod.parse;
        });
      } else {
        const runChecks = /* @__PURE__ */ __name((payload, checks2, ctx) => {
          if (payload.memo) return payload;
          let isAborted = aborted(payload);
          let asyncResult;
          for (const ch of checks2) {
            if (ch._zod.def.when) {
              if (explicitlyAborted(payload)) continue;
              if (!ch._zod.def.when(payload)) continue;
            } else if (isAborted) continue;
            const currLen = payload.issues.length;
            const _ = ch._zod.check(payload);
            if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
            if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
              await _;
              if (payload.issues.length === currLen) return;
              attachSchema(payload.issues, currLen, inst);
              if (!isAborted) isAborted = aborted(payload, currLen);
            });
            else {
              if (payload.issues.length === currLen) continue;
              attachSchema(payload.issues, currLen, inst);
              if (!isAborted) isAborted = aborted(payload, currLen);
            }
          }
          if (asyncResult) return asyncResult.then(() => {
            return payload;
          });
          return payload;
        }, "runChecks");
        const handleCanaryResult = /* @__PURE__ */ __name((canary, payload, ctx) => {
          if (aborted(canary)) {
            canary.aborted = true;
            return canary;
          }
          const checkResult = runChecks(payload, checks, ctx);
          if (checkResult instanceof Promise) {
            if (ctx.async === false) throw new $ZodAsyncError();
            return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
          }
          return inst._zod.parse(checkResult, ctx);
        }, "handleCanaryResult");
        inst._zod.run = (payload, ctx) => {
          if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
          if (ctx.direction === "backward") {
            const canary = inst._zod.parse({
              value: payload.value,
              issues: []
            }, {
              ...ctx,
              skipChecks: true
            });
            if (canary instanceof Promise) return canary.then((canary2) => {
              return handleCanaryResult(canary2, payload, ctx);
            });
            return handleCanaryResult(canary, payload, ctx);
          }
          const result = inst._zod.parse(payload, ctx);
          if (result instanceof Promise) {
            if (ctx.async === false) throw new $ZodAsyncError();
            return result.then((result2) => runChecks(result2, checks, ctx));
          }
          return runChecks(result, checks, ctx);
        };
      }
    }, {
      get "~standard"() {
        return hide(this, "~standard", standardProps(this));
      },
      set "~standard"(value) {
        own(this, "~standard", value);
      }
    });
    toStandardResult = /* @__PURE__ */ __name((r2, ctx) => r2.issues.length ? { issues: r2.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r2.value }, "toStandardResult");
    __name(validateAsync, "validateAsync");
    __name(standardProps, "standardProps");
    $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = def.pattern ?? anyString;
      inst._zod.parse = (payload, _) => {
        if (def.coerce) try {
          payload.value = String(payload.value);
        } catch (_2) {
        }
        if (typeof payload.value === "string") return payload;
        payload.issues.push({
          expected: "string",
          code: "invalid_type",
          input: payload.value,
          inst
        });
        return payload;
      };
    });
    $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
      $ZodCheckStringFormat.init(inst, def);
      $ZodString.init(inst, def);
    });
    $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
      def.pattern ?? (def.pattern = guid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
      if (def.version) {
        const v = {
          v1: 1,
          v2: 2,
          v3: 3,
          v4: 4,
          v5: 5,
          v6: 6,
          v7: 7,
          v8: 8
        }[def.version];
        if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
        def.pattern ?? (def.pattern = uuid(v));
      } else def.pattern ?? (def.pattern = uuid());
      $ZodStringFormat.init(inst, def);
    });
    $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
      def.pattern ?? (def.pattern = email);
      $ZodStringFormat.init(inst, def);
    });
    __name(canParseURL, "canParseURL");
    __name(validateURL, "validateURL");
    __name(parseURLObject, "parseURLObject");
    asciiTabOrNewline = /[\t\n\r]/g;
    __name(stripTabAndNewline, "stripTabAndNewline");
    __name(urlHostnameOk, "urlHostnameOk");
    __name(urlProtocolOk, "urlProtocolOk");
    $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        try {
          const trimmed = payload.value.trim();
          const url = validateURL(trimmed, def);
          if (url === 1) {
            payload.issues.push({
              code: "invalid_format",
              format: "url",
              note: "Invalid URL format",
              input: payload.value,
              inst,
              continue: !def.abort
            });
            return;
          }
          if (url === 2) {
            payload.issues.push({
              code: "invalid_format",
              format: "url",
              input: payload.value,
              inst,
              continue: !def.abort
            });
            return;
          }
          if (url === true) {
            payload.value = stripTabAndNewline(trimmed);
            return;
          }
          if (def.hostname && !urlHostnameOk(url, def.hostname)) payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: def.hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
          if (def.protocol && !urlProtocolOk(url, def.protocol)) payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
          payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
          return;
        } catch (_) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
      def.pattern ?? (def.pattern = emoji());
      $ZodStringFormat.init(inst, def);
    });
    $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
      if (def.length !== void 0 && (!Number.isInteger(def.length) || def.length < 1)) throw new Error(`Invalid nanoid length: ${def.length}`);
      def.pattern ?? (def.pattern = def.length === void 0 ? nanoid : nanoidOfLength(def.length));
      $ZodStringFormat.init(inst, def);
    });
    $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
      def.pattern ?? (def.pattern = cuid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
      def.pattern ?? (def.pattern = cuid2);
      $ZodStringFormat.init(inst, def);
    });
    $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
      def.pattern ?? (def.pattern = ulid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
      def.pattern ?? (def.pattern = xid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
      def.pattern ?? (def.pattern = ksuid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
      def.pattern ?? (def.pattern = datetime(def));
      $ZodStringFormat.init(inst, def);
    });
    $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
      def.pattern ?? (def.pattern = date);
      $ZodStringFormat.init(inst, def);
    });
    $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
      def.pattern ?? (def.pattern = time(def));
      $ZodStringFormat.init(inst, def);
    });
    $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
      def.pattern ?? (def.pattern = duration);
      $ZodStringFormat.init(inst, def);
    });
    $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
      def.pattern ?? (def.pattern = ipv4);
      $ZodStringFormat.init(inst, def);
    });
    ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
    __name(isValidIPv6, "isValidIPv6");
    $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
      def.pattern ?? (def.pattern = ipv6);
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        if (!isValidIPv6(payload.value)) payload.issues.push({
          code: "invalid_format",
          format: "ipv6",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
      def.pattern ?? (def.pattern = cidrv4);
      $ZodStringFormat.init(inst, def);
    });
    __name(isValidCIDRv6, "isValidCIDRv6");
    $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
      def.pattern ?? (def.pattern = cidrv6);
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        if (!isValidCIDRv6(payload.value)) payload.issues.push({
          code: "invalid_format",
          format: "cidrv6",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    __name(isValidBase64, "isValidBase64");
    base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
    $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
      def.pattern ?? (def.pattern = base64Charset);
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        if (isValidBase64(payload.value)) return;
        payload.issues.push({
          code: "invalid_format",
          format: "base64",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    base64urlCharset = /^[A-Za-z0-9_-]*$/;
    __name(isValidBase64URL, "isValidBase64URL");
    $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
      def.pattern ?? (def.pattern = base64urlCharset);
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        if (isValidBase64URL(payload.value)) return;
        payload.issues.push({
          code: "invalid_format",
          format: "base64url",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
      def.pattern ?? (def.pattern = e164);
      $ZodStringFormat.init(inst, def);
    });
    __name(isValidJWT, "isValidJWT");
    $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        if (isValidJWT(payload.value, def.alg)) return;
        payload.issues.push({
          code: "invalid_format",
          format: "jwt",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload) => payload;
    });
    $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        payload.issues.push({
          expected: "never",
          code: "invalid_type",
          input: payload.value,
          inst
        });
        return payload;
      };
    });
    __name(capSize, "capSize");
    arraySize = /* @__PURE__ */ __name((input) => Array.isArray(input) ? input.length : -1, "arraySize");
    __name(handleArrayResult, "handleArrayResult");
    $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
      $ZodType.init(inst, def);
      const memo2 = globalConfig.memoizer;
      memo2?.attach(inst);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
          payload.issues.push({
            expected: "array",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        payload.value = memo2 ? memo2.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
        const proms = [];
        const abortEarly = ctx?.abortEarly;
        for (let i2 = 0; i2 < input.length; i2++) {
          const item = input[i2];
          const result = def.element._zod.run({
            value: item,
            issues: []
          }, ctx);
          if (result instanceof Promise) proms.push(result.then((result2) => handleArrayResult(result2, payload, i2)));
          else {
            handleArrayResult(result, payload, i2);
            if (abortEarly && result.issues.length !== 0 && aborted(result)) break;
          }
        }
        if (proms.length) return Promise.all(proms).then(() => payload);
        return payload;
      };
      capSize(inst, arraySize);
    });
    __name(handlePropertyResult, "handlePropertyResult");
    NO_SYMBOL_KEYS = [];
    __name(normalizeDef, "normalizeDef");
    __name(handleCatchall, "handleCatchall");
    $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
      $ZodType.init(inst, def);
      const desc = Object.getOwnPropertyDescriptor(def, "shape");
      const sh = desc?.get ? desc.get.raw : def.shape ?? {};
      if (sh) {
        const get = /* @__PURE__ */ __name(() => {
          const newSh = { ...sh };
          Object.defineProperty(def, "shape", { value: newSh });
          get.raw = newSh;
          return newSh;
        }, "get");
        get.raw = sh;
        Object.defineProperty(def, "shape", { get });
      }
      const _normalized = cached(() => normalizeDef(def));
      defineLazyInternal(inst, "propValues", (zod) => {
        const shape = zod.def.shape;
        const propValues = {};
        for (const key in shape) {
          const field = shape[key]._zod;
          if (field.values) {
            if (!Object.prototype.hasOwnProperty.call(propValues, key)) assignProp(propValues, key, /* @__PURE__ */ new Set());
            for (const v of field.values) propValues[key].add(v);
            if (field.optin !== void 0) propValues[key].add(void 0);
          }
        }
        return propValues;
      });
      const isObject$1 = isObject;
      const catchall = def.catchall;
      let value;
      const memo2 = globalConfig.memoizer;
      memo2?.attach(inst);
      inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject$1(input)) {
          payload.issues.push({
            expected: "object",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        payload.value = memo2 ? memo2.alloc(inst, payload, {}, ctx) : {};
        const proms = [];
        const shape = value.shape;
        const abortEarly = ctx?.abortEarly;
        let seen = payload.issues.length;
        for (const key of value.allKeys) {
          if (abortEarly && payload.issues.length !== seen) {
            if (aborted(payload, seen)) break;
            seen = payload.issues.length;
          }
          if (key === "__proto__") continue;
          const el = shape[key];
          const optin = el._zod.optin;
          const optout = el._zod.optout;
          const r2 = el._zod.run({
            value: input[key],
            issues: []
          }, ctx);
          if (r2 instanceof Promise) proms.push(r2.then((r3) => handlePropertyResult(r3, payload, key, input, optin, optout)));
          else handlePropertyResult(r2, payload, key, input, optin, optout);
        }
        if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
        return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
      };
    });
    $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
      $ZodObject.init(inst, def);
      const superParse = inst._zod.parse;
      const _normalized = cached(() => normalizeDef(def));
      const memo2 = globalConfig.memoizer;
      const generateFastpass = /* @__PURE__ */ __name((shape) => {
        const normalized = _normalized.value;
        const syms = normalized.symbolKeys;
        const doc = new Doc(["payload", "ctx"], {
          shape,
          inst,
          memo: memo2,
          syms
        });
        const parseStr = /* @__PURE__ */ __name((k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`, "parseStr");
        const prefixStr = /* @__PURE__ */ __name((id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`, "prefixStr");
        doc.write(`const input = payload.value;`);
        const ids = /* @__PURE__ */ Object.create(null);
        let counter = 0;
        for (const key of normalized.allKeys) ids[key] = `key_${counter++}`;
        doc.write(memo2 ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
        for (const key of normalized.allKeys) {
          if (key === "__proto__") continue;
          const id = ids[key];
          const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
          const isPresent = `${k} in input`;
          const schema = shape[key];
          const optin = schema?._zod?.optin;
          const isOptionalIn = optin !== void 0;
          const isOptionalOut = schema?._zod?.optout === "optional";
          doc.write(`const ${id} = ${parseStr(k)};`);
          if (isOptionalIn && isOptionalOut) {
            const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
            doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
          } else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
          else {
            doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
            if (optin === "defaulted") doc.write(`newResult[${k}] = ${id}.value;`);
            else doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
          }
        }
        doc.write(`payload.value = newResult;`);
        doc.write(`return payload;`);
        return doc.compile();
      }, "generateFastpass");
      let fastpass;
      const isObject$2 = isObject;
      const jit = !globalConfig.jitless;
      const fastEnabled = jit && allowsEval.value;
      const catchall = def.catchall;
      let value;
      inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject$2(input)) {
          payload.issues.push({
            expected: "object",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
          if (!fastpass) fastpass = generateFastpass(def.shape);
          payload = fastpass(payload, ctx);
          if (!catchall) return payload;
          return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
        }
        return superParse(payload, ctx);
      };
    });
    __name(handleUnionResults, "handleUnionResults");
    $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o2) => o2._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o2) => o2._zod.optin !== void 0) ? "optional" : void 0);
      defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o2) => o2._zod.optout === "optional") ? "optional" : void 0);
      defineLazyInternal(inst, "values", (zod) => {
        if (zod.def.options.every((o2) => o2._zod.values)) return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
      });
      defineLazyInternal(inst, "pattern", (zod) => {
        if (zod.def.options.every((o2) => o2._zod.pattern)) {
          const patterns = zod.def.options.map((o2) => o2._zod.pattern);
          return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
        }
      });
      const first = def.options.length === 1 ? def.options[0]._zod.run : null;
      inst._zod.parse = (payload, ctx) => {
        if (first) return first(payload, ctx);
        let async = false;
        const results = [];
        for (const option of def.options) {
          const result = option._zod.run({
            value: payload.value,
            issues: []
          }, ctx);
          if (result instanceof Promise) {
            results.push(result);
            async = true;
          } else {
            if (result.issues.length === 0) return result;
            results.push(result);
          }
        }
        if (!async) return handleUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then((results2) => {
          return handleUnionResults(results2, payload, inst, ctx);
        });
      };
    });
    $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        const left = def.left._zod.run({
          value: input,
          issues: []
        }, ctx);
        const right = def.right._zod.run({
          value: input,
          issues: []
        }, ctx);
        if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left2, right2]) => {
          return handleIntersectionResults(payload, left2, right2);
        });
        return handleIntersectionResults(payload, left, right);
      };
    });
    __name(mergeValues, "mergeValues");
    __name(handleIntersectionResults, "handleIntersectionResults");
    $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
      $ZodType.init(inst, def);
      const values = getEnumValues(def.entries);
      const valuesSet = new Set(values);
      inst._zod.values = valuesSet;
      defineLazyInternal(inst, "pattern", (zod) => {
        const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
        return new RegExp(patternValues.length ? `^(${patternValues.map((o2) => escapeRegex(o2.toString())).join("|")})$` : "^[^\\s\\S]$");
      });
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (valuesSet.has(input)) return payload;
        payload.issues.push({
          code: "invalid_value",
          values,
          input,
          inst
        });
        return payload;
      };
    });
    $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "optional";
      globalConfig.memoizer?.guard(inst);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
        const _out = def.transform(payload.value, payload);
        if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
          payload.value = output;
          return payload;
        });
        if (_out instanceof Promise) throw new $ZodAsyncError();
        payload.value = _out;
        return payload;
      };
    });
    __name(handleOptionalResult, "handleOptionalResult");
    $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
      inst._zod.optout = "optional";
      defineLazyInternal(inst, "values", (zod) => {
        const values = zod.def.innerType._zod.values;
        return values ? /* @__PURE__ */ new Set([...values, void 0]) : void 0;
      });
      defineLazyInternal(inst, "pattern", (zod) => {
        const pattern = zod.def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
      });
      inst._zod.parse = (payload, ctx) => {
        if (payload.value === void 0) {
          if (def.innerType._zod.optin !== "defaulted") return payload;
          const result = def.innerType._zod.run({
            value: payload.value,
            issues: []
          }, ctx);
          if (result instanceof Promise) return result.then((result2) => handleOptionalResult(payload, result2));
          return handleOptionalResult(payload, result);
        }
        return def.innerType._zod.run(payload, ctx);
      };
    });
    $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
      $ZodOptional.init(inst, def);
      defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
      defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
      inst._zod.parse = (payload, ctx) => {
        return def.innerType._zod.run(payload, ctx);
      };
    });
    $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
      defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
      defineLazyInternal(inst, "pattern", (zod) => {
        const pattern = zod.def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
      });
      defineLazyInternal(inst, "values", (zod) => {
        return zod.def.innerType._zod.values ? /* @__PURE__ */ new Set([...zod.def.innerType._zod.values, null]) : void 0;
      });
      inst._zod.parse = (payload, ctx) => {
        if (payload.value === null) return payload;
        return def.innerType._zod.run(payload, ctx);
      };
    });
    $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "defaulted";
      defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
        if (payload.value === void 0) {
          payload.value = def.defaultValue;
          return payload;
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) return result.then((result2) => handleDefaultResult(result2, def));
        return handleDefaultResult(result, def);
      };
    });
    __name(handleDefaultResult, "handleDefaultResult");
    $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "defaulted";
      defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
        if (payload.value === void 0) payload.value = def.defaultValue;
        return def.innerType._zod.run(payload, ctx);
      };
    });
    $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazyInternal(inst, "values", (zod) => {
        const v = zod.def.innerType._zod.values;
        return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
      });
      inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) return result.then((result2) => handleNonOptionalResult(result2, inst));
        return handleNonOptionalResult(result, inst);
      };
    });
    __name(handleNonOptionalResult, "handleNonOptionalResult");
    __name(handleCatchResult, "handleCatchResult");
    $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
      defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
      defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
        const result = def.innerType._zod.run({
          value: payload.value,
          issues: []
        }, ctx);
        if (result instanceof Promise) return result.then((result2) => handleCatchResult(payload, result2, def, ctx));
        return handleCatchResult(payload, result, def, ctx);
      };
    });
    $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
      defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
      defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
      defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          const right = def.out._zod.run(payload, ctx);
          if (right instanceof Promise) return right.then((right2) => handlePipeResult(right2, def.in, ctx));
          return handlePipeResult(right, def.in, ctx);
        }
        const left = def.in._zod.run(payload, ctx);
        if (left instanceof Promise) return left.then((left2) => handlePipeResult(left2, def.out, ctx));
        return handlePipeResult(left, def.out, ctx);
      };
    });
    __name(handlePipeResult, "handlePipeResult");
    $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
      defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
      defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
      defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) return result.then(handleReadonlyResult);
        return handleReadonlyResult(result);
      };
    });
    __name(handleReadonlyResult, "handleReadonlyResult");
    $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
      $ZodCheck.init(inst, def);
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _) => {
        return payload;
      };
      inst._zod.check = (payload) => {
        const input = payload.value;
        const r2 = def.fn(input);
        if (r2 instanceof Promise) return r2.then((r3) => handleRefineResult(r3, payload, input, inst));
        handleRefineResult(r2, payload, input, inst);
      };
    });
    __name(handleRefineResult, "handleRefineResult");
    $ZodCyclicError = class extends Error {
      static {
        __name(this, "$ZodCyclicError");
      }
      constructor() {
        super(`Cannot parse a reference cycle that closes through a transform`);
        this.name = "ZodCyclicError";
      }
    };
    STATE = "~memo";
    NO_ISSUES = [];
    __name(isRef, "isRef");
    __name(cloneIssues, "cloneIssues");
    recursive = /* @__PURE__ */ new WeakMap();
    NONE = 0;
    ASSUMED = 1;
    PROVEN = 2;
    __name(isRecursive, "isRecursive");
    __name(settle, "settle");
    __name(bucketFor, "bucketFor");
    open = [];
    memo = {
      alloc(_inst, payload, empty) {
        const bucket = handoff;
        if (!bucket) return empty;
        handoff = void 0;
        const entry = {
          value: empty,
          issues: null
        };
        bucket.set(payload.value, entry);
        open.push(entry);
        return empty;
      },
      guard(inst) {
        var _a2;
        (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
        inst._zod.deferred.push(() => {
          const base = inst._zod.parse;
          const wrapped = /* @__PURE__ */ __name((payload, ctx) => {
            if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value)) throw new $ZodCyclicError();
            return base(payload, ctx);
          }, "wrapped");
          inst._zod.parse = wrapped;
          if (inst._zod.run === base) inst._zod.run = wrapped;
        });
      },
      attach(inst) {
        var _a2;
        let isRecursiveInst;
        let rechecked = false;
        let lastCtx;
        let lastBucket;
        (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
        inst._zod.deferred.push(() => {
          const base = inst._zod.parse;
          const wrapped = /* @__PURE__ */ __name((payload, ctx) => {
            if (isRecursiveInst === void 0) {
              const walked = isRecursive(inst, /* @__PURE__ */ new Set(), false);
              if (walked === NONE) {
                inst._zod.parse = base;
                if (inst._zod.run === wrapped) inst._zod.run = base;
                return base(payload, ctx);
              }
              if (walked === PROVEN || rechecked) isRecursiveInst = true;
              else rechecked = true;
            }
            const input = payload.value;
            if (!isRef(input)) return base(payload, ctx);
            let state = ctx[STATE];
            if (!state) {
              state = {
                buckets: /* @__PURE__ */ new WeakMap(),
                backEdges: void 0
              };
              ctx[STATE] = state;
            }
            let bucket;
            if (lastCtx === ctx) bucket = lastBucket;
            else {
              bucket = bucketFor(state, inst);
              lastCtx = ctx;
              lastBucket = bucket;
            }
            const hit = bucket.get(input);
            if (hit) {
              payload.value = hit.value;
              if (hit.issues) {
                if (hit.issues.length) payload.issues.push(...cloneIssues(hit.issues));
              } else {
                payload.memo = true;
                state.backEdges ?? (state.backEdges = /* @__PURE__ */ new WeakSet());
                state.backEdges.add(hit.value);
              }
              return payload;
            }
            handoff = bucket;
            const depth = open.length;
            const result = base(payload, ctx);
            handoff = void 0;
            const entry = open.length > depth ? open.pop() : void 0;
            if (result instanceof Promise) return result.then((r2) => {
              if (entry) entry.issues = r2.issues.length ? cloneIssues(r2.issues) : NO_ISSUES;
              return r2;
            });
            if (entry) entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
            return result;
          }, "wrapped");
          inst._zod.parse = wrapped;
          if (inst._zod.run === base) inst._zod.run = wrapped;
        });
      }
    };
    __name(memoizer, "memoizer");
    __name(isBackEdge, "isBackEdge");
    error = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: {
          unit: "characters",
          verb: "to have"
        },
        file: {
          unit: "bytes",
          verb: "to have"
        },
        array: {
          unit: "items",
          verb: "to have"
        },
        set: {
          unit: "items",
          verb: "to have"
        },
        map: {
          unit: "entries",
          verb: "to have"
        }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "input",
        email: "email address",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datetime",
        date: "ISO date",
        time: "ISO time",
        duration: "ISO duration",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        mac: "MAC address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded string",
        base64url: "base64url-encoded string",
        json_string: "JSON string",
        e164: "E.164 number",
        currency_code: "currency code",
        credit_card: "credit card number",
        iban: "IBAN",
        jwt: "JWT",
        template_literal: "input"
      };
      const TypeDictionary = { nan: "NaN" };
      function getTypeName(type, input) {
        if (type === "number" && typeof input === "number" && !Number.isFinite(input)) return String(input);
        return TypeDictionary[type] ?? type;
      }
      __name(getTypeName, "getTypeName");
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type":
            return `Invalid input: expected ${getTypeName(issue2.expected)}, received ${getTypeName(parsedType(issue2.input), issue2.input)}`;
          case "invalid_value":
            if (issue2.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
            return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.exact ? "exactly " : issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
            return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.exact ? "exactly " : issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
            if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
            if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
            if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
            return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Invalid number: must be a multiple of ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Invalid key in ${issue2.origin}`;
          case "invalid_union":
            if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) return `Invalid discriminator value. Expected ${issue2.options.map((o2) => `'${o2}'`).join(" | ")}`;
            if (issue2.inclusive === false) return "Invalid input: more than one option matched";
            return "Invalid input";
          case "invalid_element":
            return `Invalid value in ${issue2.origin}`;
          default:
            return `Invalid input`;
        }
      };
    }, "error");
    __name(en_default, "en_default");
    $ZodRegistry = class {
      static {
        __name(this, "$ZodRegistry");
      }
      constructor() {
        this._map = /* @__PURE__ */ new WeakMap();
        this._idmap = /* @__PURE__ */ new Map();
      }
      add(schema, ..._meta) {
        const meta = _meta[0];
        this._map.set(schema, meta);
        if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
        return this;
      }
      clear() {
        this._map = /* @__PURE__ */ new WeakMap();
        this._idmap = /* @__PURE__ */ new Map();
        return this;
      }
      remove(schema) {
        const meta = this._map.get(schema);
        if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
        this._map.delete(schema);
        return this;
      }
      get(schema) {
        const p = schema._zod.parent;
        if (p) {
          const pm = { ...this.get(p) ?? {} };
          delete pm.id;
          const f = {
            ...pm,
            ...this._map.get(schema)
          };
          return Object.keys(f).length ? f : void 0;
        }
        return this._map.get(schema);
      }
      has(schema) {
        return this._map.has(schema);
      }
    };
    __name(registry, "registry");
    (_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
    globalRegistry = globalThis.__zod_globalRegistry;
    __name(snapshotChecks, "snapshotChecks");
    __name(_string, "_string");
    __name(_email, "_email");
    __name(_guid, "_guid");
    __name(_uuid, "_uuid");
    __name(_uuidv4, "_uuidv4");
    __name(_uuidv6, "_uuidv6");
    __name(_uuidv7, "_uuidv7");
    __name(_url, "_url");
    __name(_emoji, "_emoji");
    __name(_nanoid, "_nanoid");
    __name(_cuid, "_cuid");
    __name(_cuid2, "_cuid2");
    __name(_ulid, "_ulid");
    __name(_xid, "_xid");
    __name(_ksuid, "_ksuid");
    __name(_ipv4, "_ipv4");
    __name(_ipv6, "_ipv6");
    __name(_cidrv4, "_cidrv4");
    __name(_cidrv6, "_cidrv6");
    __name(_base64, "_base64");
    __name(_base64url, "_base64url");
    __name(_e164, "_e164");
    __name(_jwt, "_jwt");
    __name(_isoDateTime, "_isoDateTime");
    __name(_isoDate, "_isoDate");
    __name(_isoTime, "_isoTime");
    __name(_isoDuration, "_isoDuration");
    __name(_unknown, "_unknown");
    __name(_never, "_never");
    __name(_maxLength, "_maxLength");
    __name(_minLength, "_minLength");
    __name(_length, "_length");
    __name(_regex, "_regex");
    __name(_lowercase, "_lowercase");
    __name(_uppercase, "_uppercase");
    __name(_includes, "_includes");
    __name(_startsWith, "_startsWith");
    __name(_endsWith, "_endsWith");
    __name(_overwrite, "_overwrite");
    __name(_normalize, "_normalize");
    __name(_trim, "_trim");
    __name(_toLowerCase, "_toLowerCase");
    __name(_toUpperCase, "_toUpperCase");
    __name(_slugify, "_slugify");
    __name(_array, "_array");
    __name(_custom, "_custom");
    __name(_refine, "_refine");
    __name(_superRefine, "_superRefine");
    __name(_check, "_check");
    __name(assignProps, "assignProps");
    __name(initializeContext, "initializeContext");
    __name(handleUnrepresentable, "handleUnrepresentable");
    __name(processSchema, "processSchema");
    __name(encodeJSONPointerSegment, "encodeJSONPointerSegment");
    __name(extractDefs, "extractDefs");
    __name(compactTypeUnion, "compactTypeUnion");
    FOLDABLE_KEYS = /* @__PURE__ */ new Set([
      "type",
      "properties",
      "required",
      "additionalProperties"
    ]);
    UNION_KEYS = ["oneOf", "anyOf"];
    __name(undeclaredConstraint, "undeclaredConstraint");
    __name(foldObjects, "foldObjects");
    __name(foldIntersection, "foldIntersection");
    __name(finalize, "finalize");
    __name(isTransforming, "isTransforming");
    createToJSONSchemaMethod = /* @__PURE__ */ __name((schema, processors = {}) => (params) => {
      const ctx = initializeContext({
        ...params,
        processors
      });
      processSchema(schema, ctx);
      extractDefs(ctx, schema);
      return finalize(ctx, schema);
    }, "createToJSONSchemaMethod");
    createStandardJSONSchemaMethod = /* @__PURE__ */ __name((schema, io, processors = {}) => (params) => {
      const { libraryOptions, target } = params ?? {};
      const ctx = initializeContext({
        ...libraryOptions ?? {},
        target,
        io,
        processors
      });
      processSchema(schema, ctx);
      extractDefs(ctx, schema);
      return finalize(ctx, schema);
    }, "createStandardJSONSchemaMethod");
    narrowMin = /* @__PURE__ */ __name((agg, key, value) => {
      if (agg[key] === void 0 || value > agg[key]) agg[key] = value;
    }, "narrowMin");
    narrowMax = /* @__PURE__ */ __name((agg, key, value) => {
      if (agg[key] === void 0 || value < agg[key]) agg[key] = value;
    }, "narrowMax");
    narrowBoth = /* @__PURE__ */ __name((agg, value) => {
      narrowMin(agg, "minimum", value);
      narrowMax(agg, "maximum", value);
    }, "narrowBoth");
    addDivisor = /* @__PURE__ */ __name((agg, value) => {
      agg.multipleOf ?? (agg.multipleOf = []);
      if (!agg.multipleOf.includes(value)) agg.multipleOf.push(value);
    }, "addDivisor");
    addPattern = /* @__PURE__ */ __name((agg, pattern) => {
      agg.patterns ?? (agg.patterns = /* @__PURE__ */ new Set());
      agg.patterns.add(pattern);
    }, "addPattern");
    intersectMime = /* @__PURE__ */ __name((agg, mime) => {
      agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
    }, "intersectMime");
    setFormat = /* @__PURE__ */ __name((agg, format) => {
      agg.format = format;
      if (format.includes("int")) agg.isInt = true;
    }, "setFormat");
    minContributor = /* @__PURE__ */ __name((agg, def) => narrowMin(agg, "minimum", def.minimum), "minContributor");
    maxContributor = /* @__PURE__ */ __name((agg, def) => narrowMax(agg, "maximum", def.maximum), "maxContributor");
    formatContributor = /* @__PURE__ */ __name((ranges) => (agg, def) => {
      setFormat(agg, def.format);
      const [minimum, maximum] = ranges[def.format];
      narrowMin(agg, "minimum", minimum);
      narrowMax(agg, "maximum", maximum);
    }, "formatContributor");
    contributors = {
      greater_than: /* @__PURE__ */ __name((agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value), "greater_than"),
      less_than: /* @__PURE__ */ __name((agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value), "less_than"),
      multiple_of: /* @__PURE__ */ __name((agg, def) => addDivisor(agg, def.value), "multiple_of"),
      number_format: formatContributor(NUMBER_FORMAT_RANGES),
      bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
      min_length: minContributor,
      max_length: maxContributor,
      length_equals: /* @__PURE__ */ __name((agg, def) => narrowBoth(agg, def.length), "length_equals"),
      min_size: minContributor,
      max_size: maxContributor,
      size_equals: /* @__PURE__ */ __name((agg, def) => narrowBoth(agg, def.size), "size_equals"),
      string_format: /* @__PURE__ */ __name((agg, def) => {
        setFormat(agg, def.format);
        if (def.pattern) addPattern(agg, def.pattern);
        if (def.format === "base64" || def.format === "base64url") agg.contentEncoding = def.format;
        if (def.local || def.precision === -1) agg.laxFormat = true;
      }, "string_format"),
      mime_type: /* @__PURE__ */ __name((agg, def) => intersectMime(agg, def.mime), "mime_type")
    };
    __name(aggregateChecks, "aggregateChecks");
    formatMap = {
      guid: "uuid",
      url: "uri",
      datetime: "date-time",
      json_string: "json-string",
      regex: ""
    };
    exactPatterns = /* @__PURE__ */ new Map([[base64Charset, base64], [base64urlCharset, base64url]]);
    exactPattern = /* @__PURE__ */ __name((p) => exactPatterns.get(p) ?? p, "exactPattern");
    stringProcessor = /* @__PURE__ */ __name((schema, ctx, _json, _params) => {
      const json = _json;
      json.type = "string";
      const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
      if (typeof minimum === "number") json.minLength = minimum;
      if (typeof maximum === "number") json.maxLength = maximum;
      if (format) {
        json.format = formatMap[format] ?? format;
        if (json.format === "") delete json.format;
        if (format === "time" || laxFormat) delete json.format;
      }
      if (contentEncoding) json.contentEncoding = contentEncoding;
      if (patterns && patterns.size > 0) {
        const patternList = [...patterns].map(exactPattern);
        if (patternList.length === 1) json.pattern = patternList[0].source;
        else if (patternList.length > 1) json.allOf = [...patternList.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))];
      }
    }, "stringProcessor");
    neverProcessor = /* @__PURE__ */ __name((_schema, _ctx, json, _params) => {
      json.not = {};
    }, "neverProcessor");
    enumProcessor = /* @__PURE__ */ __name((schema, _ctx, json, _params) => {
      const def = schema._zod.def;
      const values = getEnumValues(def.entries);
      if (values.length === 0) {
        json.not = {};
        return;
      }
      if (values.every((v) => typeof v === "number")) json.type = "number";
      if (values.every((v) => typeof v === "string")) json.type = "string";
      json.enum = values;
    }, "enumProcessor");
    customProcessor = /* @__PURE__ */ __name((schema, ctx, json, params) => {
      handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
    }, "customProcessor");
    transformProcessor = /* @__PURE__ */ __name((schema, ctx, json, params) => {
      handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
    }, "transformProcessor");
    arrayProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const json = _json;
      const def = schema._zod.def;
      const { minimum, maximum } = aggregateChecks(schema);
      if (typeof minimum === "number") json.minItems = minimum;
      if (typeof maximum === "number") json.maxItems = maximum;
      json.type = "array";
      json.items = processSchema(def.element, ctx, {
        ...params,
        path: [...params.path, "items"]
      });
    }, "arrayProcessor");
    __name(inputOptin, "inputOptin");
    objectProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const json = _json;
      const def = schema._zod.def;
      const shape = def.shape;
      if (Object.getOwnPropertySymbols(shape).length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) return;
      json.type = "object";
      json.properties = {};
      for (const key in shape) assignProp(json.properties, key, processSchema(shape[key], ctx, {
        ...params,
        path: [
          ...params.path,
          "properties",
          key
        ]
      }));
      const requiredKeys = [];
      for (const key of Object.keys(shape)) {
        const field = def.shape[key];
        if (ctx.io === "input" ? inputOptin(field) === void 0 : field._zod.optout === void 0) requiredKeys.push(key);
      }
      if (requiredKeys.length > 0) json.required = requiredKeys;
      if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
      else if (!def.catchall) {
        if (ctx.io === "output") json.additionalProperties = false;
      } else if (def.catchall) json.additionalProperties = processSchema(def.catchall, ctx, {
        ...params,
        path: [...params.path, "additionalProperties"]
      });
    }, "objectProcessor");
    unionProcessor = /* @__PURE__ */ __name((schema, ctx, json, params) => {
      const def = schema._zod.def;
      const isExclusive = def.inclusive === false;
      const options = def.options.map((x, i2) => processSchema(x, ctx, {
        ...params,
        path: [
          ...params.path,
          isExclusive ? "oneOf" : "anyOf",
          i2
        ]
      }));
      if (isExclusive) json.oneOf = options;
      else json.anyOf = options;
    }, "unionProcessor");
    intersectionProcessor = /* @__PURE__ */ __name((schema, ctx, json, params) => {
      const def = schema._zod.def;
      const a2 = processSchema(def.left, ctx, {
        ...params,
        path: [
          ...params.path,
          "allOf",
          0
        ]
      });
      const b = processSchema(def.right, ctx, {
        ...params,
        path: [
          ...params.path,
          "allOf",
          1
        ]
      });
      const isSimpleIntersection = /* @__PURE__ */ __name((val) => "allOf" in val && Object.keys(val).length === 1, "isSimpleIntersection");
      const allOf = [...isSimpleIntersection(a2) ? a2.allOf : [a2], ...isSimpleIntersection(b) ? b.allOf : [b]];
      json.allOf = allOf;
      ctx.intersections.push(allOf);
    }, "intersectionProcessor");
    nullableProcessor = /* @__PURE__ */ __name((schema, ctx, json, params) => {
      const def = schema._zod.def;
      const inner = processSchema(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      if (ctx.target === "openapi-3.0") {
        seen.ref = def.innerType;
        json.nullable = true;
      } else json.anyOf = [inner, { type: "null" }];
    }, "nullableProcessor");
    nonoptionalProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const def = schema._zod.def;
      processSchema(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
    }, "nonoptionalProcessor");
    UNREPRESENTABLE_DEFAULT = /* @__PURE__ */ Symbol();
    __name(serializeDefaultValue, "serializeDefaultValue");
    defaultProcessor = /* @__PURE__ */ __name((schema, ctx, json, params) => {
      const def = schema._zod.def;
      processSchema(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
      if (value !== UNREPRESENTABLE_DEFAULT) json.default = value;
    }, "defaultProcessor");
    prefaultProcessor = /* @__PURE__ */ __name((schema, ctx, json, params) => {
      const def = schema._zod.def;
      processSchema(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      if (ctx.io !== "input") return;
      const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
      if (value !== UNREPRESENTABLE_DEFAULT) json._prefault = value;
    }, "prefaultProcessor");
    catchProcessor = /* @__PURE__ */ __name((schema, ctx, json, params) => {
      const def = schema._zod.def;
      processSchema(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      let catchValue;
      try {
        catchValue = def.catchValue(void 0);
      } catch {
        handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
        return;
      }
      json.default = catchValue;
    }, "catchProcessor");
    pipeProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const def = schema._zod.def;
      const inIsTransform = def.in._zod.traits.has("$ZodTransform");
      const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
      processSchema(innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = innerType;
    }, "pipeProcessor");
    readonlyProcessor = /* @__PURE__ */ __name((schema, ctx, json, params) => {
      const def = schema._zod.def;
      processSchema(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      json.readOnly = true;
    }, "readonlyProcessor");
    optionalProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const def = schema._zod.def;
      processSchema(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
    }, "optionalProcessor");
    _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
    __name(_lazyMethod, "_lazyMethod");
    initializer = /* @__PURE__ */ __name((inst, issues) => {
      $ZodError.init(inst, issues);
      inst.name = "ZodError";
      const proto = Object.getPrototypeOf(inst);
      if (_installedErrorProtos.has(proto)) return;
      _installedErrorProtos.add(proto);
      _lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
      _lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
      _lazyMethod(proto, "addIssue", (self) => (issue2) => {
        self.issues.push(issue2);
        self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
      });
      _lazyMethod(proto, "addIssues", (self) => (issues2) => {
        self.issues.push(...issues2);
        self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
      });
      Object.defineProperty(proto, "isEmpty", {
        configurable: true,
        enumerable: false,
        get() {
          return this.issues.length === 0;
        }
      });
    }, "initializer");
    ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer, void 0, { Parent: Error });
    parse = /* @__PURE__ */ _parse(ZodRealError);
    parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
    safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
    safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
    encode = /* @__PURE__ */ _encode(ZodRealError);
    decode = /* @__PURE__ */ _decode(ZodRealError);
    encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
    decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
    safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
    safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
    safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
    safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
    __name(_ensureDefaultLocale, "_ensureDefaultLocale");
    __name(_ensureDefaultMemoizer, "_ensureDefaultMemoizer");
    ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
      _ensureDefaultLocale();
      $ZodType.init(inst, def);
      inst.def = def;
      inst.type = def.type;
      return inst;
    }, {
      check(...chks) {
        const def = this.def;
        return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
          check: ch,
          def: { check: "custom" },
          onattach: []
        } } : ch)] }), { parent: true });
      },
      with(...chks) {
        return this.check(...chks);
      },
      clone(def, params) {
        return clone(this, def, params);
      },
      brand() {
        return this;
      },
      register(reg, meta) {
        reg.add(this, meta);
        return this;
      },
      refine(check, params) {
        return this.check(refine(check, params));
      },
      superRefine(refinement, params) {
        return this.check(superRefine(refinement, params));
      },
      overwrite(fn) {
        return this.check(/* @__PURE__ */ _overwrite(fn));
      },
      optional() {
        return optional(this);
      },
      exactOptional() {
        return exactOptional(this);
      },
      nullable() {
        return nullable(this);
      },
      nullish() {
        return optional(nullable(this));
      },
      nonoptional(params) {
        return nonoptional(this, params);
      },
      array() {
        return array(this);
      },
      or(arg) {
        return union([this, arg]);
      },
      and(arg) {
        return intersection(this, arg);
      },
      transform(tx) {
        return pipe(this, transform(tx));
      },
      default(d) {
        return _default(this, d);
      },
      prefault(d) {
        return prefault(this, d);
      },
      catch(params) {
        return _catch(this, params);
      },
      pipe(target) {
        return pipe(this, target);
      },
      readonly() {
        return readonly(this);
      },
      describe(description) {
        const cl = this.clone();
        globalRegistry.add(cl, { description });
        return cl;
      },
      meta(...args) {
        if (args.length === 0) return globalRegistry.get(this);
        const cl = this.clone();
        globalRegistry.add(cl, args[0]);
        return cl;
      },
      isOptional() {
        return this.safeParse(void 0).success;
      },
      isNullable() {
        return this.safeParse(null).success;
      },
      apply(fn, ...args) {
        return args.length === 0 ? fn(this) : fn(this, ...args);
      },
      get "~standard"() {
        return hide(this, "~standard", {
          ...standardProps(this),
          jsonSchema: {
            input: createStandardJSONSchemaMethod(this, "input"),
            output: createStandardJSONSchemaMethod(this, "output")
          }
        });
      },
      set "~standard"(value) {
        own(this, "~standard", value);
      },
      parse: /* @__PURE__ */ __name(function _parse2(data, params) {
        return parse(this, data, params, { callee: _parse2 });
      }, "_parse"),
      parseAsync: /* @__PURE__ */ __name(async function _parseAsync2(data, params) {
        return await parseAsync(this, data, params, { callee: _parseAsync2 });
      }, "_parseAsync"),
      safeParse(data, params) {
        return safeParse(this, data, params);
      },
      async safeParseAsync(data, params) {
        return safeParseAsync(this, data, params);
      },
      get spa() {
        return this?.safeParseAsync;
      },
      set spa(value) {
        own(this, "spa", value);
      },
      validate(data, params) {
        return validate(this, data, params);
      },
      validateAsync(data, params) {
        return validateAsync$1(this, data, params);
      },
      encode: /* @__PURE__ */ __name(function _encode2(data, params) {
        return encode(this, data, params, { callee: _encode2 });
      }, "_encode"),
      decode: /* @__PURE__ */ __name(function _decode2(data, params) {
        return decode(this, data, params, { callee: _decode2 });
      }, "_decode"),
      encodeAsync: /* @__PURE__ */ __name(async function _encodeAsync2(data, params) {
        return await encodeAsync(this, data, params, { callee: _encodeAsync2 });
      }, "_encodeAsync"),
      decodeAsync: /* @__PURE__ */ __name(async function _decodeAsync2(data, params) {
        return await decodeAsync(this, data, params, { callee: _decodeAsync2 });
      }, "_decodeAsync"),
      safeEncode(data, params) {
        return safeEncode(this, data, params);
      },
      safeDecode(data, params) {
        return safeDecode(this, data, params);
      },
      async safeEncodeAsync(data, params) {
        return safeEncodeAsync(this, data, params);
      },
      async safeDecodeAsync(data, params) {
        return safeDecodeAsync(this, data, params);
      },
      toJSONSchema(params) {
        return createToJSONSchemaMethod(this, {})(params);
      },
      get description() {
        return globalRegistry.get(this)?.description;
      },
      get _def() {
        return this._zod.def;
      }
    });
    _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
      $ZodString.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
    }, /* @__PURE__ */ derived({
      format: /* @__PURE__ */ __name((inst) => aggregateChecks(inst).format ?? null, "format"),
      minLength: /* @__PURE__ */ __name((inst) => aggregateChecks(inst).minimum ?? null, "minLength"),
      maxLength: /* @__PURE__ */ __name((inst) => aggregateChecks(inst).maximum ?? null, "maxLength")
    }, {
      regex(...args) {
        return this.check(/* @__PURE__ */ _regex(...args));
      },
      includes(...args) {
        return this.check(/* @__PURE__ */ _includes(...args));
      },
      startsWith(...args) {
        return this.check(/* @__PURE__ */ _startsWith(...args));
      },
      endsWith(...args) {
        return this.check(/* @__PURE__ */ _endsWith(...args));
      },
      min(...args) {
        return this.check(/* @__PURE__ */ _minLength(...args));
      },
      max(...args) {
        return this.check(/* @__PURE__ */ _maxLength(...args));
      },
      length(...args) {
        return this.check(/* @__PURE__ */ _length(...args));
      },
      nonempty(...args) {
        return this.check(/* @__PURE__ */ _minLength(1, ...args));
      },
      lowercase(params) {
        return this.check(/* @__PURE__ */ _lowercase(params));
      },
      uppercase(params) {
        return this.check(/* @__PURE__ */ _uppercase(params));
      },
      trim() {
        return this.check(/* @__PURE__ */ _trim());
      },
      normalize(...args) {
        return this.check(/* @__PURE__ */ _normalize(...args));
      },
      toLowerCase() {
        return this.check(/* @__PURE__ */ _toLowerCase());
      },
      toUpperCase() {
        return this.check(/* @__PURE__ */ _toUpperCase());
      },
      slugify() {
        return this.check(/* @__PURE__ */ _slugify());
      }
    }));
    ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
      $ZodString.init(inst, def);
      _ZodString.init(inst, def);
    }, {
      email(params) {
        return this.check(/* @__PURE__ */ _email(ZodEmail, params));
      },
      url(params) {
        return this.check(/* @__PURE__ */ _url(ZodURL, params));
      },
      jwt(params) {
        return this.check(/* @__PURE__ */ _jwt(ZodJWT, params));
      },
      emoji(params) {
        return this.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
      },
      guid(params) {
        return this.check(/* @__PURE__ */ _guid(ZodGUID, params));
      },
      uuid(params) {
        return this.check(/* @__PURE__ */ _uuid(ZodUUID, params));
      },
      uuidv4(params) {
        return this.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
      },
      uuidv6(params) {
        return this.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
      },
      uuidv7(params) {
        return this.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
      },
      nanoid(params) {
        return this.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
      },
      cuid(params) {
        return this.check(/* @__PURE__ */ _cuid(ZodCUID, params));
      },
      cuid2(params) {
        return this.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
      },
      ulid(params) {
        return this.check(/* @__PURE__ */ _ulid(ZodULID, params));
      },
      base64(params) {
        return this.check(/* @__PURE__ */ _base64(ZodBase64, params));
      },
      base64url(params) {
        return this.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
      },
      xid(params) {
        return this.check(/* @__PURE__ */ _xid(ZodXID, params));
      },
      ksuid(params) {
        return this.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
      },
      ipv4(params) {
        return this.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
      },
      ipv6(params) {
        return this.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
      },
      cidrv4(params) {
        return this.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
      },
      cidrv6(params) {
        return this.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
      },
      e164(params) {
        return this.check(/* @__PURE__ */ _e164(ZodE164, params));
      },
      datetime(params) {
        return this.check(/* @__PURE__ */ _isoDateTime(ZodISODateTime, params));
      },
      date(params) {
        return this.check(/* @__PURE__ */ _isoDate(ZodISODate, params));
      },
      time(params) {
        return this.check(/* @__PURE__ */ _isoTime(ZodISOTime, params));
      },
      duration(params) {
        return this.check(/* @__PURE__ */ _isoDuration(ZodISODuration, params));
      }
    });
    __name(string, "string");
    ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      _ZodString.init(inst, def);
    });
    ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
      $ZodISODateTime.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
      $ZodISODate.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
      $ZodISOTime.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
      $ZodISODuration.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
      $ZodEmail.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
      $ZodGUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
      $ZodUUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
      $ZodURL.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
      $ZodEmoji.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
      $ZodNanoID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
      $ZodCUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
      $ZodCUID2.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
      $ZodULID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
      $ZodXID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
      $ZodKSUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
      $ZodIPv4.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
      $ZodIPv6.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
      $ZodCIDRv4.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
      $ZodCIDRv6.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
      $ZodBase64.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
      $ZodBase64URL.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
      $ZodE164.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
      $ZodJWT.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
      $ZodUnknown.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => void 0;
    });
    __name(unknown, "unknown");
    ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
      $ZodNever.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
    });
    __name(never, "never");
    ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
      _ensureDefaultMemoizer();
      $ZodArray.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
      inst.element = def.element;
    }, {
      min(n2, params) {
        return this.check(/* @__PURE__ */ _minLength(n2, params));
      },
      nonempty(params) {
        return this.check(/* @__PURE__ */ _minLength(1, params));
      },
      max(n2, params) {
        return this.check(/* @__PURE__ */ _maxLength(n2, params));
      },
      length(n2, params) {
        return this.check(/* @__PURE__ */ _length(n2, params));
      },
      unwrap() {
        return this.element;
      }
    });
    __name(array, "array");
    ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
      _ensureDefaultMemoizer();
      $ZodObjectJIT.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
      installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
    }, {
      keyof() {
        return _enum(Object.keys(this._zod.def.shape));
      },
      catchall(catchall) {
        return this.clone(mergeDefs(this._zod.def, { catchall }));
      },
      passthrough() {
        return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
      },
      loose() {
        return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
      },
      strict() {
        return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
      },
      strip() {
        return this.clone(mergeDefs(this._zod.def, { catchall: void 0 }));
      },
      extend(incoming) {
        return extend(this, incoming);
      },
      safeExtend(incoming) {
        return safeExtend(this, incoming);
      },
      merge(other) {
        return merge(this, other);
      },
      pick(mask) {
        return pick(this, mask);
      },
      omit(mask) {
        return omit(this, mask);
      },
      partial(...args) {
        return partial(ZodOptional, this, args[0]);
      },
      exactPartial(...args) {
        return partial(ZodExactOptional, this, args[0], "exactPartial");
      },
      required(...args) {
        return required(ZodNonOptional, this, args[0]);
      }
    });
    __name(object, "object");
    ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
      $ZodUnion.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
      inst.options = def.options;
    });
    __name(union, "union");
    ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
      $ZodIntersection.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
    });
    __name(intersection, "intersection");
    ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
      $ZodEnum.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
      inst.enum = def.entries;
      inst.options = [...inst._zod.values];
      const keys = new Set(Object.keys(def.entries));
      inst.extract = (values, params) => {
        const newEntries = {};
        for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
        else throw new Error(`Key ${value} not found in enum`);
        return new ZodEnum({
          ...def,
          checks: [],
          ...normalizeParams(params),
          entries: newEntries
        });
      };
      inst.exclude = (values, params) => {
        const newEntries = { ...def.entries };
        for (const value of values) if (keys.has(value)) delete newEntries[value];
        else throw new Error(`Key ${value} not found in enum`);
        return new ZodEnum({
          ...def,
          checks: [],
          ...normalizeParams(params),
          entries: newEntries
        });
      };
    });
    __name(_enum, "_enum");
    ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
      _ensureDefaultMemoizer();
      $ZodTransform.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
      inst._zod.parse = (payload, _ctx) => {
        if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
        payload.addIssue = (issue$1) => {
          if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
          else {
            const _issue = issue$1;
            if (_issue.fatal) _issue.continue = false;
            _issue.code ?? (_issue.code = "custom");
            if (!("input" in _issue)) _issue.input = payload.value;
            _issue.inst ?? (_issue.inst = inst);
            payload.issues.push(issue(_issue));
          }
        };
        const output = def.transform(payload.value, payload);
        if (output instanceof Promise) return output.then((output2) => {
          payload.value = output2;
          return payload;
        });
        payload.value = output;
        return payload;
      };
    });
    __name(transform, "transform");
    ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
      $ZodOptional.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(optional, "optional");
    ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
      $ZodExactOptional.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(exactOptional, "exactOptional");
    ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
      $ZodNullable.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(nullable, "nullable");
    ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
      $ZodDefault.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
      inst.removeDefault = inst.unwrap;
    });
    __name(_default, "_default");
    ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
      $ZodPrefault.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(prefault, "prefault");
    ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
      $ZodNonOptional.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(nonoptional, "nonoptional");
    ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
      $ZodCatch.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
      inst.removeCatch = inst.unwrap;
    });
    __name(_catch, "_catch");
    ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
      $ZodPipe.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
      inst.in = def.in;
      inst.out = def.out;
    });
    __name(pipe, "pipe");
    ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
      $ZodReadonly.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(readonly, "readonly");
    ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
      $ZodCustom.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
    });
    __name(custom, "custom");
    __name(refine, "refine");
    __name(superRefine, "superRefine");
    ZodIssueCode = {
      invalid_type: "invalid_type",
      too_big: "too_big",
      too_small: "too_small",
      invalid_format: "invalid_format",
      not_multiple_of: "not_multiple_of",
      unrecognized_keys: "unrecognized_keys",
      invalid_union: "invalid_union",
      invalid_key: "invalid_key",
      invalid_element: "invalid_element",
      invalid_value: "invalid_value",
      custom: "custom"
    };
    ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {});
    ALGORITHMS = {
      "SHA-256": "sha256-",
      "SHA-384": "sha384-",
      "SHA-512": "sha512-"
    };
    ALGORITHM_VALUES = Object.values(ALGORITHMS);
    _enum(Object.keys(ALGORITHMS)).optional().default("SHA-256");
    cspHashSchema = custom((value) => {
      if (typeof value !== "string") return false;
      return ALGORITHM_VALUES.some((allowedValue) => {
        return value.startsWith(allowedValue);
      });
    });
    cspKindSchema = _enum([
      "element",
      "attribute",
      "default"
    ]);
    ATTRIBUTE_ALLOWED_RESOURCES = [
      "'none'",
      "'unsafe-hashes'",
      "'unsafe-inline'",
      "'report-sample'"
    ];
    union([string(), object({
      resource: string(),
      kind: cspKindSchema
    })]).superRefine((value, ctx) => {
      const resource = typeof value === "string" ? value : value.resource;
      const kind = typeof value === "string" ? "default" : value.kind;
      if (kind === "element" && resource === "'unsafe-hashes'") ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `The source \`'unsafe-hashes'\` is not valid for \`element\` resources (it is rejected by \`script-src-elem\`/\`style-src-elem\`).`,
        fatal: true
      });
      else if (kind === "attribute" && !ATTRIBUTE_ALLOWED_RESOURCES.includes(resource)) ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `The source \`${resource}\` is not valid for \`attribute\` resources. \`script-src-attr\`/\`style-src-attr\` only accept: ${ATTRIBUTE_ALLOWED_RESOURCES.join(", ")}.`,
        fatal: true
      });
    });
    union([cspHashSchema, object({
      hash: cspHashSchema,
      kind: cspKindSchema
    })]);
    ALLOWED_DIRECTIVES = [
      "base-uri",
      "child-src",
      "connect-src",
      "default-src",
      "fenced-frame-src",
      "font-src",
      "form-action",
      "frame-ancestors",
      "frame-src",
      "img-src",
      "manifest-src",
      "media-src",
      "object-src",
      "referrer",
      "report-to",
      "report-uri",
      "require-trusted-types-for",
      "sandbox",
      "trusted-types",
      "upgrade-insecure-requests",
      "worker-src"
    ];
    custom((v) => typeof v === "string").superRefine((value, ctx) => {
      if (!ALLOWED_DIRECTIVES.some((allowedValue) => {
        return value.startsWith(allowedValue);
      })) {
        if (value.startsWith("script-src") || value.startsWith("style-src")) ctx.addIssue({
          code: ZodIssueCode.custom,
          message: `Directives \`script-src\` and \`style-src\` (including their \`-elem\`/\`-attr\` variants) are not allowed in \`security.csp.directives\`. Please use \`security.csp.scriptDirective\` and \`security.csp.styleDirective\` instead, scoping resources/hashes to the more specific directives with the \`kind\` option (\`"element"\` or \`"attribute"\`).`,
          fatal: true
        });
        else ctx.addIssue({
          code: ZodIssueCode.custom,
          message: `Invalid directive: "${value}". Allowed directives are: ${ALLOWED_DIRECTIVES.join(", ")}`,
          fatal: true
        });
      }
    });
    ALGORITHM = "AES-GCM";
    __name(decodeKey, "decodeKey");
    encoder$1 = new TextEncoder();
    decoder$1 = new TextDecoder();
    IV_LENGTH = 24;
    __name(encryptString, "encryptString");
    __name(decryptString, "decryptString");
    __name(generateCspDigest, "generateCspDigest");
    ASTRO_GENERATOR = `Astro v7.4.4`;
    ASTRO_ERROR_HEADER = "X-Astro-Error";
    DEFAULT_404_COMPONENT = "astro-default-404.astro";
    REDIRECT_STATUS_CODES = [
      301,
      302,
      303,
      307,
      308,
      300,
      304
    ];
    REROUTABLE_STATUS_CODES = [404, 500];
    STATUS_CODE_PAGES = /* @__PURE__ */ new Set([
      "/404",
      "/500",
      "/3xx"
    ]);
    clientAddressSymbol = /* @__PURE__ */ Symbol.for("astro.clientAddress");
    originPathnameSymbol = /* @__PURE__ */ Symbol.for("astro.originPathname");
    fetchStateSymbol = /* @__PURE__ */ Symbol.for("astro.fetchState");
    responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
    e = globalThis.process || {};
    t = e.argv || [];
    n = e.env || {};
    r$1 = !(n.NO_COLOR || t.includes(`--no-color`)) && (!!n.FORCE_COLOR || t.includes(`--color`) || e.platform === `win32` || (e.stdout || {}).isTTY && n.TERM !== `dumb` || !!n.CI);
    i = /* @__PURE__ */ __name((e2, t2, n2 = e2) => (r2) => {
      let i2 = `` + r2, o2 = i2.indexOf(t2, e2.length);
      return ~o2 ? e2 + a(i2, t2, n2, o2) + t2 : e2 + i2 + t2;
    }, "i");
    a = /* @__PURE__ */ __name((e2, t2, n2, r2) => {
      let i2 = ``, a2 = 0;
      do
        i2 += e2.substring(a2, r2) + n2, a2 = r2 + t2.length, r2 = e2.indexOf(t2, a2);
      while (~r2);
      return i2 + e2.substring(a2);
    }, "a");
    o = /* @__PURE__ */ __name((e2 = r$1) => {
      let t2 = e2 ? i : () => String;
      return {
        isColorSupported: e2,
        reset: t2(`\x1B[0m`, `\x1B[0m`),
        bold: t2(`\x1B[1m`, `\x1B[22m`, `\x1B[22m\x1B[1m`),
        dim: t2(`\x1B[2m`, `\x1B[22m`, `\x1B[22m\x1B[2m`),
        italic: t2(`\x1B[3m`, `\x1B[23m`),
        underline: t2(`\x1B[4m`, `\x1B[24m`),
        inverse: t2(`\x1B[7m`, `\x1B[27m`),
        hidden: t2(`\x1B[8m`, `\x1B[28m`),
        strikethrough: t2(`\x1B[9m`, `\x1B[29m`),
        black: t2(`\x1B[30m`, `\x1B[39m`),
        red: t2(`\x1B[31m`, `\x1B[39m`),
        green: t2(`\x1B[32m`, `\x1B[39m`),
        yellow: t2(`\x1B[33m`, `\x1B[39m`),
        blue: t2(`\x1B[34m`, `\x1B[39m`),
        magenta: t2(`\x1B[35m`, `\x1B[39m`),
        cyan: t2(`\x1B[36m`, `\x1B[39m`),
        white: t2(`\x1B[37m`, `\x1B[39m`),
        gray: t2(`\x1B[90m`, `\x1B[39m`),
        bgBlack: t2(`\x1B[40m`, `\x1B[49m`),
        bgRed: t2(`\x1B[41m`, `\x1B[49m`),
        bgGreen: t2(`\x1B[42m`, `\x1B[49m`),
        bgYellow: t2(`\x1B[43m`, `\x1B[49m`),
        bgBlue: t2(`\x1B[44m`, `\x1B[49m`),
        bgMagenta: t2(`\x1B[45m`, `\x1B[49m`),
        bgCyan: t2(`\x1B[46m`, `\x1B[49m`),
        bgWhite: t2(`\x1B[47m`, `\x1B[49m`),
        blackBright: t2(`\x1B[90m`, `\x1B[39m`),
        redBright: t2(`\x1B[91m`, `\x1B[39m`),
        greenBright: t2(`\x1B[92m`, `\x1B[39m`),
        yellowBright: t2(`\x1B[93m`, `\x1B[39m`),
        blueBright: t2(`\x1B[94m`, `\x1B[39m`),
        magentaBright: t2(`\x1B[95m`, `\x1B[39m`),
        cyanBright: t2(`\x1B[96m`, `\x1B[39m`),
        whiteBright: t2(`\x1B[97m`, `\x1B[39m`),
        bgBlackBright: t2(`\x1B[100m`, `\x1B[49m`),
        bgRedBright: t2(`\x1B[101m`, `\x1B[49m`),
        bgGreenBright: t2(`\x1B[102m`, `\x1B[49m`),
        bgYellowBright: t2(`\x1B[103m`, `\x1B[49m`),
        bgBlueBright: t2(`\x1B[104m`, `\x1B[49m`),
        bgMagentaBright: t2(`\x1B[105m`, `\x1B[49m`),
        bgCyanBright: t2(`\x1B[106m`, `\x1B[49m`),
        bgWhiteBright: t2(`\x1B[107m`, `\x1B[49m`)
      };
    }, "o");
    s = o();
    ROUTE404_RE = /^\/404\/?$/;
    ROUTE500_RE = /^\/500\/?$/;
    ROUTE3XX_RE = /^\/3xx\/?$/;
    __name(isRoute404, "isRoute404");
    __name(isRoute500, "isRoute500");
    __name(isRoute3xx, "isRoute3xx");
    __name(createError, "createError");
    __name(createAstro, "createAstro");
    __name(renderEndpoint, "renderEndpoint");
    __name(isPromise, "isPromise");
    __name(streamAsyncIterator, "streamAsyncIterator");
    ESCAPABLE = /[&<>'"]/g;
    __name(entityFor, "entityFor");
    __name(escapeHTML, "escapeHTML");
    __name(stringifyForScript, "stringifyForScript");
    __name(escapeStyleText, "escapeStyleText");
    HTMLBytes = class extends Uint8Array {
      static {
        __name(this, "HTMLBytes");
      }
    };
    Object.defineProperty(HTMLBytes.prototype, Symbol.toStringTag, { get() {
      return "HTMLBytes";
    } });
    htmlStringSymbol = /* @__PURE__ */ Symbol.for("astro:html-string");
    HTMLString = class extends String {
      static {
        __name(this, "HTMLString");
      }
    };
    Object.defineProperty(HTMLString.prototype, htmlStringSymbol, { value: true });
    markHTMLString = /* @__PURE__ */ __name((value) => {
      if (isHTMLString(value)) return value;
      if (typeof value === "string") return new HTMLString(value);
      return value;
    }, "markHTMLString");
    __name(isHTMLString, "isHTMLString");
    __name(markHTMLBytes, "markHTMLBytes");
    __name(hasGetReader, "hasGetReader");
    __name(unescapeChunksAsync, "unescapeChunksAsync");
    __name(unescapeChunks, "unescapeChunks");
    __name(unescapeHTML, "unescapeHTML");
    __name(isVNode, "isVNode");
    __name(isPropagatingHint, "isPropagatingHint");
    __name(isAstroComponentFactory, "isAstroComponentFactory");
    __name(r, "r");
    __name(clsx, "clsx");
    PROP_TYPE = {
      Value: 0,
      JSON: 1,
      RegExp: 2,
      Date: 3,
      Map: 4,
      Set: 5,
      BigInt: 6,
      URL: 7,
      Uint8Array: 8,
      Uint16Array: 9,
      Uint32Array: 10,
      Infinity: 11
    };
    __name(serializeArray, "serializeArray");
    __name(serializeObject, "serializeObject");
    __name(convertToSerializedForm, "convertToSerializedForm");
    __name(serializeProps, "serializeProps");
    transitionDirectivesToCopyOnIsland = /* @__PURE__ */ new Set([
      "data-astro-transition-scope",
      "data-astro-transition-persist",
      "data-astro-transition-persist-props"
    ]);
    __name(extractDirectives, "extractDirectives");
    __name(generateHydrateScript, "generateHydrateScript");
    dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
    binary = 61;
    __name(bitwise, "bitwise");
    __name(shorthash, "shorthash");
    headAndContentSym = /* @__PURE__ */ Symbol.for("astro.headAndContent");
    __name(isHeadAndContent, "isHeadAndContent");
    __name(createThinHead, "createThinHead");
    astro_island_prebuilt_default = `(function(){function e(t){"@babel/helpers - typeof";return e=typeof Symbol==\`function\`&&typeof Symbol.iterator==\`symbol\`?function(e){return typeof e}:function(e){return e&&typeof Symbol==\`function\`&&e.constructor===Symbol&&e!==Symbol.prototype?\`symbol\`:typeof e},e(t)}function t(t,n){if(e(t)!=\`object\`||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var i=r.call(t,n||\`default\`);if(e(i)!=\`object\`)return i;throw TypeError(\`@@toPrimitive must return a primitive value.\`)}return(n===\`string\`?String:Number)(t)}function n(n){var r=t(n,\`string\`);return e(r)==\`symbol\`?r:r+\`\`}function r(e,t,r){return(t=n(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}let i=/* @__PURE__ */ new Set([\`__proto__\`,\`constructor\`,\`prototype\`]);{let e={0:e=>a(e),1:e=>n(e),2:e=>new RegExp(e),3:e=>new Date(e),4:e=>new Map(n(e)),5:e=>new Set(n(e)),6:e=>BigInt(e),7:e=>new URL(e),8:e=>new Uint8Array(e),9:e=>new Uint16Array(e),10:e=>new Uint32Array(e),11:e=>1/0*e},t=t=>{let[n,r]=t;return n in e?e[n](r):void 0},n=e=>e.map(t),a=e=>typeof e!=\`object\`||!e?e:Object.fromEntries(Object.entries(e).map(([e,n])=>[e,t(n)]));class o extends HTMLElement{constructor(...e){super(...e),r(this,\`Component\`,void 0),r(this,\`hydrator\`,void 0),r(this,\`hydrate\`,async()=>{var e;if(!this.hydrator||!this.isConnected)return;let t=(e=this.parentElement)==null?void 0:e.closest(\`astro-island[ssr]\`);if(t){t.addEventListener(\`astro:hydrate\`,this.hydrate,{once:!0});return}let n=this.querySelectorAll(\`astro-slot\`),r={},i=this.querySelectorAll(\`template[data-astro-template]\`);for(let e of i){let t=e.closest(this.tagName);t!=null&&t.isSameNode(this)&&(r[e.getAttribute(\`data-astro-template\`)||\`default\`]=e.innerHTML,e.remove())}for(let e of n){let t=e.closest(this.tagName);t!=null&&t.isSameNode(this)&&(r[e.getAttribute(\`name\`)||\`default\`]=e.innerHTML)}let o;try{o=this.hasAttribute(\`props\`)?a(JSON.parse(this.getAttribute(\`props\`))):{}}catch(e){let t=this.getAttribute(\`component-url\`)||\`<unknown>\`,n=this.getAttribute(\`component-export\`);throw n&&(t+=\` (export \${n})\`),console.error(\`[hydrate] Error parsing props for component \${t}\`,this.getAttribute(\`props\`),e),e}await this.hydrator(this)(this.Component,o,r,{client:this.getAttribute(\`client\`)}),this.removeAttribute(\`ssr\`),this.dispatchEvent(new CustomEvent(\`astro:hydrate\`))}),r(this,\`unmount\`,()=>{this.isConnected||this.dispatchEvent(new CustomEvent(\`astro:unmount\`))})}disconnectedCallback(){document.removeEventListener(\`astro:after-swap\`,this.unmount),document.addEventListener(\`astro:after-swap\`,this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute(\`await-children\`)||document.readyState===\`interactive\`||document.readyState===\`complete\`)this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener(\`DOMContentLoaded\`,e),t.disconnect(),this.childrenConnectedCallback()},t=new MutationObserver(()=>{var t;((t=this.lastChild)==null?void 0:t.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue===\`astro:end\`&&(this.lastChild.remove(),e())});t.observe(this,{childList:!0}),document.addEventListener(\`DOMContentLoaded\`,e)}}async childrenConnectedCallback(){let e=this.getAttribute(\`before-hydration-url\`);e&&await import(e),this.start()}getRetryImportUrl(e){let t=new URL(e,document.baseURI);return t.searchParams.set(\`astro-retry\`,Date.now().toString()),t.toString()}async importWithRetry(e){try{return await import(e)}catch(t){return await new Promise(e=>setTimeout(e,1e3)),import(this.getRetryImportUrl(e))}}handleHydrationError(e){let t=this.getAttribute(\`component-url\`),n=new CustomEvent(\`astro:hydration-error\`,{cancelable:!0,bubbles:!0,composed:!0,detail:{error:e,componentUrl:t}});this.dispatchEvent(n)&&console.error(\`[astro-island] Error hydrating \${t}\`,e)}async start(){let e=JSON.parse(this.getAttribute(\`opts\`)),t=this.getAttribute(\`client\`);if(Astro[t]===void 0)window.addEventListener(\`astro:\${t}\`,()=>this.start(),{once:!0});else try{await Astro[t](async()=>{let e=this.getAttribute(\`renderer-url\`);try{let[t,{default:n}]=await Promise.all([this.importWithRetry(this.getAttribute(\`component-url\`)),e?this.importWithRetry(e):Promise.resolve({default:()=>()=>{}})]),r=this.getAttribute(\`component-export\`)||\`default\`;if(r.includes(\`.\`)){this.Component=t;for(let e of r.split(\`.\`)){if(i.has(e)||!this.Component||typeof this.Component!=\`object\`&&typeof this.Component!=\`function\`||!Object.hasOwn(this.Component,e))throw Error(\`Invalid component export path: \${r}\`);this.Component=this.Component[e]}}else{if(i.has(r))throw Error(\`Invalid component export path: \${r}\`);this.Component=t[r]}return this.hydrator=n,this.hydrate}catch(e){return this.handleHydrationError(e),()=>{}}},e,this)}catch(e){this.handleHydrationError(e)}}attributeChangedCallback(){this.hydrate()}}r(o,\`observedAttributes\`,[\`props\`]),customElements.get(\`astro-island\`)||customElements.define(\`astro-island\`,o)}})();`;
    ISLAND_STYLES = "astro-island,astro-slot,astro-static-slot{display:contents}";
    __name(determineIfNeedsHydrationScript, "determineIfNeedsHydrationScript");
    __name(determinesIfNeedsDirectiveScript, "determinesIfNeedsDirectiveScript");
    __name(getDirectiveScriptText, "getDirectiveScriptText");
    __name(getPrescripts, "getPrescripts");
    __name(collectPropagatedHeadParts, "collectPropagatedHeadParts");
    __name(shouldRenderHeadInstruction, "shouldRenderHeadInstruction");
    __name(shouldRenderMaybeHeadInstruction, "shouldRenderMaybeHeadInstruction");
    __name(shouldRenderInstruction$1, "shouldRenderInstruction$1");
    __name(registerIfPropagating, "registerIfPropagating");
    __name(bufferPropagatedHead, "bufferPropagatedHead");
    __name(shouldRenderInstruction, "shouldRenderInstruction");
    __name(getInstructionRenderState, "getInstructionRenderState");
    __name(normalizeCspResourceEntry, "normalizeCspResourceEntry");
    __name(normalizeCspHashEntry, "normalizeCspHashEntry");
    __name(partitionByKind, "partitionByKind");
    __name(deduplicateDirectiveValues, "deduplicateDirectiveValues");
    __name(pushDirective, "pushDirective");
    __name(renderCspContent, "renderCspContent");
    __name(hasUnsafeInline, "hasUnsafeInline");
    __name(isEnabled, "isEnabled");
    __name(renderSpecificDirective, "renderSpecificDirective");
    RenderInstructionSymbol = /* @__PURE__ */ Symbol.for("astro:render");
    __name(createRenderInstruction, "createRenderInstruction");
    __name(isRenderInstruction, "isRenderInstruction");
    __name(isScriptInstruction, "isScriptInstruction");
    voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
    htmlBooleanAttributes = /^(?:allowfullscreen|async|autofocus|autoplay|checked|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|inert|loop|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|selected|itemscope)$/i;
    AMPERSAND_REGEX = /&/g;
    DOUBLE_QUOTE_REGEX = /"/g;
    STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
    INVALID_ATTR_NAME_CHAR = /[\s"'>/=]/;
    toIdent = /* @__PURE__ */ __name((k) => k.trim().replace(/(?!^)\b\w|\s+|\W+/g, (match, index) => {
      if (/\W/.test(match)) return "";
      return index === 0 ? match : match.toUpperCase();
    }), "toIdent");
    toAttributeString = /* @__PURE__ */ __name((value, shouldEscape = true) => {
      if (!shouldEscape) return value;
      const str = String(value);
      if (!str.includes("&") && !str.includes('"')) return str;
      return str.replace(AMPERSAND_REGEX, "&amp;").replace(DOUBLE_QUOTE_REGEX, "&quot;");
    }, "toAttributeString");
    kebab = /* @__PURE__ */ __name((k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`), "kebab");
    toStyleString = /* @__PURE__ */ __name((obj) => {
      let output = "";
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (!(typeof value === "string" && value.trim() || typeof value === "number")) continue;
        if (output) output += ";";
        output += key[0] !== "-" && key[1] !== "-" ? `${kebab(key)}:${value}` : `${key}:${value}`;
      }
      return output;
    }, "toStyleString");
    __name(defineScriptVars, "defineScriptVars");
    __name(formatList, "formatList");
    __name(isCustomElement, "isCustomElement");
    __name(handleBooleanAttribute, "handleBooleanAttribute");
    ATTRIBUTE_KIND = {
      ORDINARY: 0,
      INVALID_NAME: 1,
      STATIC_DIRECTIVE: 2,
      CLASS_LIST: 3,
      STYLE: 4,
      CLASS_NAME: 5,
      BOOLEAN: 6,
      BOOLEAN_IF_BOOLEAN: 7
    };
    __name(classifyAttribute, "classifyAttribute");
    __name(addAttribute, "addAttribute");
    __name(spreadElementAttributes, "spreadElementAttributes");
    __name(internalSpreadAttributes, "internalSpreadAttributes");
    __name(renderElement$1, "renderElement$1");
    noop = /* @__PURE__ */ __name(() => {
    }, "noop");
    BufferedRenderer = class {
      static {
        __name(this, "BufferedRenderer");
      }
      chunks = [];
      renderPromise;
      destination;
      /**
      * Determines whether buffer has been flushed
      * to the final destination.
      */
      flushed = false;
      constructor(destination, renderFunction) {
        this.destination = destination;
        this.renderPromise = renderFunction(this);
        if (isPromise(this.renderPromise)) Promise.resolve(this.renderPromise).catch(noop);
      }
      write(chunk) {
        if (this.flushed) this.destination.write(chunk);
        else this.chunks.push(chunk);
      }
      flush() {
        if (this.flushed) throw new Error("The render buffer has already been flushed.");
        this.flushed = true;
        for (const chunk of this.chunks) this.destination.write(chunk);
        return this.renderPromise;
      }
    };
    __name(createBufferedRenderer, "createBufferedRenderer");
    isNode = typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]";
    isDeno = typeof Deno !== "undefined";
    isWorkerd = typeof navigator !== "undefined" && true;
    __name(promiseWithResolvers, "promiseWithResolvers");
    __name(stablePropsKey, "stablePropsKey");
    __name(deduplicateElements, "deduplicateElements");
    __name(renderCspMetaTag, "renderCspMetaTag");
    __name(renderAllHeadContent, "renderAllHeadContent");
    HEAD_INSTRUCTION = Object.freeze(createRenderInstruction({ type: "head" }));
    MAYBE_HEAD_INSTRUCTION = Object.freeze(createRenderInstruction({ type: "maybe-head" }));
    __name(renderHead, "renderHead");
    __name(maybeRenderHead, "maybeRenderHead");
    SERVER_ISLAND_START = "[if astro]>server-island-start<![endif]";
    renderTemplateResultSym = /* @__PURE__ */ Symbol.for("astro.renderTemplateResult");
    markedHtmlParts = /* @__PURE__ */ new WeakMap();
    __name(markHtmlParts, "markHtmlParts");
    RenderTemplateResult = class {
      static {
        __name(this, "RenderTemplateResult");
      }
      [renderTemplateResultSym] = true;
      htmlParts;
      expressions;
      error;
      wrapped;
      constructor(htmlParts, expressions) {
        this.htmlParts = htmlParts;
        this.error = void 0;
        this.expressions = expressions;
      }
      catchExpressionError(index, expression) {
        if (this.wrapped?.has(index)) return expression;
        const wrapped = Promise.resolve(expression).catch((err) => {
          if (!this.error) {
            this.error = err;
            throw err;
          }
        });
        (this.wrapped ??= /* @__PURE__ */ new Set()).add(index);
        this.expressions[index] = wrapped;
        return wrapped;
      }
      render(destination) {
        const { expressions } = this;
        const htmlParts = markHtmlParts(this.htmlParts);
        for (let i2 = 0; i2 < htmlParts.length; i2++) {
          const html = htmlParts[i2];
          if (html) destination.write(html);
          if (i2 >= expressions.length) break;
          let exp = expressions[i2];
          if (!(exp || exp === 0)) continue;
          if (isPromise(exp)) exp = this.catchExpressionError(i2, exp);
          const result = renderChild(destination, exp);
          if (isPromise(result)) {
            const startIdx = i2 + 1;
            const remaining = expressions.length - startIdx;
            const flushers = new Array(remaining);
            for (let j = 0; j < remaining; j++) {
              let rExp = expressions[startIdx + j];
              if (isPromise(rExp)) rExp = this.catchExpressionError(startIdx + j, rExp);
              flushers[j] = createBufferedRenderer(destination, (bufferDestination) => {
                if (rExp || rExp === 0) return renderChild(bufferDestination, rExp);
              });
            }
            return result.then(() => {
              let k = 0;
              const iterate = /* @__PURE__ */ __name(() => {
                while (k < flushers.length) {
                  const rHtml = htmlParts[startIdx + k];
                  if (rHtml) destination.write(rHtml);
                  const flushResult = flushers[k++].flush();
                  if (isPromise(flushResult)) return flushResult.then(iterate);
                }
                const lastHtml = htmlParts[htmlParts.length - 1];
                if (lastHtml) destination.write(lastHtml);
              }, "iterate");
              return iterate();
            });
          }
        }
      }
    };
    __name(isRenderTemplateResult, "isRenderTemplateResult");
    __name(renderTemplate, "renderTemplate");
    slotString = /* @__PURE__ */ Symbol.for("astro:slot-string");
    SlotString = class extends HTMLString {
      static {
        __name(this, "SlotString");
      }
      instructions;
      /**
      * The slot's content as an ordered stream. Unlike `instructions` (which holds
      * position-independent instructions like head/hydration content), scripts are
      * kept inline here so they render at their original position instead of being
      * hoisted to the start of the slot output.
      */
      chunks;
      [slotString];
      constructor(content, instructions, chunks = []) {
        super(content);
        this.instructions = instructions;
        this.chunks = chunks;
        this[slotString] = true;
      }
    };
    __name(isSlotString, "isSlotString");
    __name(mergeSlotInstructions, "mergeSlotInstructions");
    SlotRenderInstance = class {
      static {
        __name(this, "SlotRenderInstance");
      }
      result;
      slotted;
      constructor(result, slotted) {
        this.result = result;
        this.slotted = slotted;
      }
      /** Must be called at most once per instance. */
      evaluate() {
        const { slotted } = this;
        return typeof slotted === "function" ? slotted(this.result) : slotted;
      }
      render(destination) {
        return renderChild(destination, this.evaluate());
      }
    };
    __name(renderSlot, "renderSlot");
    __name(renderSlotToString, "renderSlotToString");
    __name(renderSlots, "renderSlots");
    __name(createSlotValueFromString, "createSlotValueFromString");
    internalProps = /* @__PURE__ */ new Set([
      "server:component-path",
      "server:component-export",
      "server:component-directive",
      "server:defer"
    ]);
    __name(containsServerDirective, "containsServerDirective");
    __name(createSearchParams, "createSearchParams");
    __name(isWithinURLLimit, "isWithinURLLimit");
    ServerIslandComponent = class {
      static {
        __name(this, "ServerIslandComponent");
      }
      result;
      props;
      slots;
      displayName;
      hostId;
      islandContent;
      componentPath;
      componentExport;
      componentId;
      initPromise;
      constructor(result, props, slots, displayName) {
        this.result = result;
        this.props = props;
        this.slots = slots;
        this.displayName = displayName;
      }
      /**
      * Pre-renders the island slots and records its CSP script hashes. Runs once;
      * later calls (every head-collection pass revisits all propagators) return
      * the first result.
      */
      init() {
        this.initPromise ??= this.initImpl();
        return this.initPromise;
      }
      async initImpl() {
        const content = await this.getIslandContent();
        if (this.result.cspDestination) {
          this.result._metadata.extraScriptHashes.push(await generateCspDigest(SERVER_ISLAND_REPLACER, this.result.cspAlgorithm));
          const contentDigest = await generateCspDigest(content, this.result.cspAlgorithm);
          this.result._metadata.extraScriptHashes.push(contentDigest);
        }
        return createThinHead();
      }
      async render(destination) {
        const hostId = await this.getHostId();
        const islandContent = await this.getIslandContent();
        destination.write(createRenderInstruction({ type: "server-island-runtime" }));
        destination.write(`<!--${SERVER_ISLAND_START}-->`);
        for (const name in this.slots) if (name === "fallback") await renderChild(destination, this.slots.fallback(this.result));
        destination.write(`<script type="module" data-astro-rerun data-island-id="${hostId}">${islandContent}<\/script>`);
      }
      getComponentPath() {
        if (this.componentPath) return this.componentPath;
        const componentPath = this.props["server:component-path"];
        if (!componentPath) throw new Error(`Could not find server component path`);
        this.componentPath = componentPath;
        return componentPath;
      }
      getComponentExport() {
        if (this.componentExport) return this.componentExport;
        const componentExport = this.props["server:component-export"];
        if (!componentExport) throw new Error(`Could not find server component export`);
        this.componentExport = componentExport;
        return componentExport;
      }
      async getHostId() {
        if (!this.hostId) this.hostId = await crypto.randomUUID();
        return this.hostId;
      }
      async getIslandContent() {
        if (this.islandContent) return this.islandContent;
        const componentPath = this.getComponentPath();
        const componentExport = this.getComponentExport();
        let componentId = (await this.result.getServerIslandNameMap()).get(componentPath);
        if (!componentId) throw new Error(`Could not find server component name ${componentPath}`);
        for (const key2 of Object.keys(this.props)) if (internalProps.has(key2)) delete this.props[key2];
        const renderedSlots = {};
        for (const name in this.slots) if (name !== "fallback") {
          const content = await renderSlotToString(this.result, this.slots[name]);
          const slotContent = content;
          let slotHtml = "";
          if (slotContent.chunks?.length) for (const part of slotContent.chunks) slotHtml += typeof part === "string" ? part : part.content;
          else slotHtml = content.toString();
          renderedSlots[name] = slotHtml;
        }
        const key = await this.result.key;
        const componentExportEncrypted = await encryptString(key, componentExport, `export:${componentId}`);
        const propsEncrypted = Object.keys(this.props).length === 0 ? "" : await encryptString(key, JSON.stringify(this.props), `props:${componentId}`);
        const slotsEncrypted = Object.keys(renderedSlots).length === 0 ? "" : await encryptString(key, JSON.stringify(renderedSlots), `slots:${componentId}`);
        const hostId = await this.getHostId();
        const slash2 = this.result.base.endsWith("/") ? "" : "/";
        let serverIslandUrl = `${this.result.base}${slash2}_server-islands/${componentId}${this.result.trailingSlash === "always" ? "/" : ""}`;
        const potentialSearchParams = createSearchParams(componentExportEncrypted, propsEncrypted, slotsEncrypted);
        const useGETRequest = isWithinURLLimit(serverIslandUrl, potentialSearchParams);
        if (useGETRequest) {
          serverIslandUrl += "?" + potentialSearchParams.toString();
          this.result._metadata.extraHead.push(markHTMLString(`<link rel="preload" as="fetch" href="${toAttributeString(serverIslandUrl)}" crossorigin="anonymous">`));
        }
        const headersJson = stringifyForScript(this.result.internalFetchHeaders || {});
        const serverIslandUrlJson = stringifyForScript(serverIslandUrl);
        const method = useGETRequest ? `const headers = new Headers(${headersJson});
let response = await fetch(${serverIslandUrlJson}, { headers }).catch(() => {});` : `let data = {
	encryptedComponentExport: ${stringifyForScript(componentExportEncrypted)},
	encryptedProps: ${stringifyForScript(propsEncrypted)},
	encryptedSlots: ${stringifyForScript(slotsEncrypted)},
};
const headers = new Headers({ 'Content-Type': 'application/json', ...${headersJson} });
let response = await fetch(${serverIslandUrlJson}, {
	method: 'POST',
	body: JSON.stringify(data),
	headers,
}).catch(() => {});`;
        this.islandContent = `${method}replaceServerIsland(${stringifyForScript(hostId)}, response);`;
        return this.islandContent;
      }
    };
    renderServerIslandRuntime = /* @__PURE__ */ __name(() => {
      return `<script>${SERVER_ISLAND_REPLACER}<\/script>`;
    }, "renderServerIslandRuntime");
    SERVER_ISLAND_REPLACER = markHTMLString(`async function replaceServerIsland(id, r) {
	let s = document.querySelector(\`script[data-island-id="\${id}"]\`);
	// If there's no matching script, or the request fails then return
	if (!s || !r || r.status !== 200 || r.headers.get('content-type')?.split(';')[0].trim() !== 'text/html') return;
	// Load the HTML before modifying the DOM in case of errors
	let html;
	try {
		html = await r.text();
	} catch {
		return;
	}
	// Remove any placeholder content before the island script
	while (s.previousSibling && s.previousSibling.nodeType !== 8 && s.previousSibling.data !== '${SERVER_ISLAND_START}')
		s.previousSibling.remove();
	s.previousSibling?.remove();
	// Insert the new HTML
	s.before(document.createRange().createContextualFragment(html));
	// Remove the script. Prior to v5.4.2, this was the trick to force rerun of scripts.  Keeping it to minimize change to the existing behavior.
	s.remove();
}`.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("//")).join(" "));
    Fragment = /* @__PURE__ */ Symbol.for("astro:fragment");
    Renderer = /* @__PURE__ */ Symbol.for("astro:renderer");
    encoder = new TextEncoder();
    decoder = new TextDecoder();
    __name(stringifyChunk, "stringifyChunk");
    __name(chunkToString, "chunkToString");
    __name(chunkToByteArray, "chunkToByteArray");
    __name(chunkToByteArrayOrString, "chunkToByteArrayOrString");
    __name(isRenderInstance, "isRenderInstance");
    __name(renderChild, "renderChild");
    __name(renderArray, "renderArray");
    __name(renderIterable, "renderIterable");
    __name(renderAsyncIterable, "renderAsyncIterable");
    astroComponentInstanceSym = /* @__PURE__ */ Symbol.for("astro.componentInstance");
    CLIENT_DIRECTIVE_PREFIX = "client:";
    AstroComponentInstance = class {
      static {
        __name(this, "AstroComponentInstance");
      }
      [astroComponentInstanceSym] = true;
      result;
      props;
      slotValues;
      factory;
      returnValue;
      constructor(result, props, slots, factory) {
        this.result = result;
        this.props = props;
        this.factory = factory;
        this.slotValues = slots;
        for (const name in slots) {
          if (this.slotValues === slots) this.slotValues = {};
          let didRender = false;
          let value = slots[name](result);
          if (result._metadata.routeHasPropagation && isPromise(value)) result._metadata.pendingSlotEvaluations.push(value);
          this.slotValues[name] = () => {
            if (!didRender) {
              didRender = true;
              return value;
            }
            return slots[name](result);
          };
        }
      }
      init(result) {
        if (this.returnValue !== void 0) return this.returnValue;
        this.returnValue = this.factory(result, this.props, this.slotValues);
        if (isPromise(this.returnValue)) this.returnValue.then((resolved) => {
          this.returnValue = resolved;
        }).catch(() => {
        });
        return this.returnValue;
      }
      render(destination) {
        const returnValue = this.init(this.result);
        if (isPromise(returnValue)) return returnValue.then((x) => this.renderImpl(destination, x));
        return this.renderImpl(destination, returnValue);
      }
      renderImpl(destination, returnValue) {
        if (isHeadAndContent(returnValue)) return returnValue.content.render(destination);
        else return renderChild(destination, returnValue);
      }
    };
    __name(validateComponentProps, "validateComponentProps");
    __name(createAstroComponentInstance, "createAstroComponentInstance");
    __name(isAstroComponentInstance, "isAstroComponentInstance");
    ClientOnlyPlaceholder$1 = "astro-client-only";
    TemplateFrame = class {
      static {
        __name(this, "TemplateFrame");
      }
      /** The RenderTemplateResult this frame walks. */
      templateResult;
      /** Resume position: the next `htmlParts`/`expressions` index to process. */
      cursor;
      constructor(templateResult) {
        this.templateResult = templateResult;
        this.cursor = 0;
      }
      storeCursor(index) {
        this.cursor = index;
      }
    };
    StreamingRenderState = class {
      static {
        __name(this, "StreamingRenderState");
      }
      pendingStaticOutput = "";
      isBuffering = false;
      bufferedStaticOutput = "";
      appendStatic(output) {
        if (!output) return;
        if (this.isBuffering) this.bufferedStaticOutput += output;
        else this.pendingStaticOutput += output;
      }
    };
    __name(renderStreaming, "renderStreaming");
    DOCTYPE_EXP = /<!doctype html/i;
    __name(renderStreamToString, "renderStreamToString");
    __name(renderStreamToStream, "renderStreamToStream");
    __name(renderStreamToAsyncIterable, "renderStreamToAsyncIterable");
    __name(renderToString, "renderToString");
    __name(renderToReadableStream, "renderToReadableStream");
    __name(callComponentAsTemplateResultOrResponse, "callComponentAsTemplateResultOrResponse");
    __name(bufferHeadContent, "bufferHeadContent");
    __name(renderToAsyncIterable, "renderToAsyncIterable");
    __name(toPromise, "toPromise");
    __name(componentIsHTMLElement, "componentIsHTMLElement");
    __name(renderHTMLElement, "renderHTMLElement");
    __name(getHTMLElementName, "getHTMLElementName");
    needsHeadRenderingSymbol = /* @__PURE__ */ Symbol.for("astro.needsHeadRendering");
    rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
    clientOnlyValues = /* @__PURE__ */ new Set([
      "solid-js",
      "react",
      "preact",
      "vue",
      "svelte"
    ]);
    __name(guessRenderers, "guessRenderers");
    __name(isFragmentComponent, "isFragmentComponent");
    __name(isHTMLComponent, "isHTMLComponent");
    ASTRO_SLOT_EXP = /<\/?astro-slot\b[^>]*>/g;
    ASTRO_STATIC_SLOT_EXP = /<\/?astro-static-slot\b[^>]*>/g;
    __name(removeStaticAstroSlot, "removeStaticAstroSlot");
    __name(renderFrameworkComponent, "renderFrameworkComponent");
    __name(sanitizeElementName, "sanitizeElementName");
    __name(renderFragmentComponent, "renderFragmentComponent");
    __name(renderHTMLComponent, "renderHTMLComponent");
    __name(renderAstroComponent, "renderAstroComponent");
    __name(renderComponent, "renderComponent");
    __name(normalizeProps, "normalizeProps");
    __name(renderComponentToString, "renderComponentToString");
    __name(nonAstroPageNeedsHeadInjection, "nonAstroPageNeedsHeadInjection");
    ClientOnlyPlaceholder = "astro-client-only";
    hasTriedRenderComponentSymbol = /* @__PURE__ */ Symbol("hasTriedRenderComponent");
    __name(renderJSX, "renderJSX");
    __name(renderJSXVNode, "renderJSXVNode");
    __name(renderElement, "renderElement");
    __name(prerenderElementChildren, "prerenderElementChildren");
    __name(setCspMetaPlaceholder, "setCspMetaPlaceholder");
    __name(replaceCspMetaPlaceholder, "replaceCspMetaPlaceholder");
    __name(renderPage, "renderPage");
    Object.freeze(createRenderInstruction({ type: "template-enter" }));
    Object.freeze(createRenderInstruction({ type: "template-exit" }));
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((v, c) => (v[c.charCodeAt(0)] = c, v), []);
    "-0123456789_".split("").reduce((v, c) => (v[c.charCodeAt(0)] = c, v), []);
    __name(spreadAttributes, "spreadAttributes");
  }
});

// server/chunks/_astro_assets_B_bvnz1D.mjs
function appendForwardSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function collapseDuplicateLeadingSlashes(path) {
  if (!path) return path;
  return path.replace(MANY_LEADING_SLASHES, "/");
}
function collapseDuplicateSlashes(path) {
  if (!path) return path;
  return path.replace(MANY_SLASHES, "/");
}
function collapseDuplicateTrailingSlashes(path, trailingSlash) {
  if (!path) return path;
  return path.replace(MANY_TRAILING_SLASHES, trailingSlash ? "/" : "") || "/";
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function isInternalPath(path) {
  const prefix = path.slice(0, 2).replace(/\\/g, "/");
  return INTERNAL_PREFIXES.has(prefix) && !JUST_SLASHES.test(path);
}
function joinPaths(...paths) {
  return paths.filter(isString).map((path, i2) => {
    if (i2 === 0) return removeTrailingForwardSlash(path);
    else if (i2 === paths.length - 1) return removeLeadingForwardSlash(path);
    else return trimSlashes(path);
  }).join("/");
}
function isRemotePath(src) {
  if (!src) return false;
  const trimmed = src.trim();
  if (!trimmed) return false;
  let decoded = trimmed;
  let previousDecoded = "";
  let maxIterations = 10;
  while (decoded !== previousDecoded && maxIterations > 0) {
    previousDecoded = decoded;
    try {
      decoded = decodeURIComponent(decoded);
    } catch {
      break;
    }
    maxIterations--;
  }
  if (/^[a-zA-Z]:/.test(decoded)) return false;
  if (decoded[0] === "/" && /^\/[\w.@-]/.test(decoded)) return false;
  if (decoded[0] === "\\") return true;
  if (decoded.startsWith("//")) return true;
  try {
    const url = new URL(decoded, "http://n");
    if (url.username || url.password) return true;
    if (decoded.includes("@") && !url.pathname.includes("@") && !url.search.includes("@")) return true;
    if (url.origin !== "http://n") {
      if (url.protocol.toLowerCase() === "file:") return false;
      return true;
    }
    if (URL.canParse(decoded)) return true;
    return false;
  } catch {
    return true;
  }
}
function slash(path) {
  return path.replace(/\\/g, "/");
}
function fileExtension(path) {
  const ext = path.split(".").pop();
  return ext !== path ? `.${ext}` : "";
}
function stripRequestBase(pathname, base) {
  pathname = collapseDuplicateLeadingSlashes(pathname);
  const baseWithoutTrailingSlash = removeTrailingForwardSlash(base);
  if (pathname === baseWithoutTrailingSlash) return "/";
  if (pathname.startsWith(baseWithoutTrailingSlash + "/")) return pathname.slice(baseWithoutTrailingSlash.length);
  return pathname;
}
function hasFileExtension(path) {
  return WITH_FILE_EXT.test(path);
}
function log(opts, level2, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.destination;
  const event = {
    label,
    level: level2,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level2)) return;
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level2) {
  return levels[configuredLogLevel] <= levels[level2];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error2(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) globalThis._astroGlobalDebug(...args);
}
function getEventPrefix({ level: level2, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level2 === "error" || level2 === "warn") {
    prefix.push(s.bold(timestamp));
    prefix.push(`[${level2.toUpperCase()}]`);
  } else prefix.push(timestamp);
  if (label) prefix.push(`[${label}]`);
  if (level2 === "error") return s.red(prefix.join(" "));
  if (level2 === "warn") return s.yellow(prefix.join(" "));
  if (prefix.length === 1) return s.dim(prefix[0]);
  return s.dim(prefix[0]) + " " + s.blue(prefix.splice(1).join(" "));
}
function astroToRuntimeLogger(logger) {
  return {
    info(msg) {
      logger.info(null, msg);
    },
    warn(msg) {
      logger.warn(null, msg);
    },
    error(msg) {
      logger.error(null, msg);
    }
  };
}
function matchesLevel(messageLevel, configuredLevel) {
  return levels[messageLevel] >= levels[configuredLevel];
}
function consoleLogDestination(config2 = {}) {
  const { level: level2 = "info" } = config2;
  return { write(event) {
    let dest = console.error;
    if (levels[event.level] < levels["error"]) dest = console.info;
    if (!matchesLevel(event.level, level2)) return;
    if (event.label === "SKIP_FORMAT") dest(event.message);
    else dest(getEventPrefix(event) + " " + event.message);
  } };
}
function createConsoleLogger({ level: level2 }) {
  return new AstroLogger({
    level: level2,
    destination: consoleLogDestination()
  });
}
function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard = false) {
  if (!hostname) return true;
  else if (!allowWildcard || !hostname.startsWith("*")) return hostname === url.hostname;
  else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    if (!url.hostname.endsWith(slicedHostname)) return false;
    const subdomainWithDot = url.hostname.slice(0, -(slicedHostname.length - 1));
    return subdomainWithDot.endsWith(".") && !subdomainWithDot.slice(0, -1).includes(".");
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard = false) {
  if (!pathname) return true;
  else if (!allowWildcard || !pathname.endsWith("*")) return pathname === url.pathname;
  else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    if (!url.pathname.startsWith(slicedPathname)) return false;
    return url.pathname.slice(slicedPathname.length).split("/").filter(Boolean).length === 1;
  }
  return false;
}
function isRemoteAllowed(src, { domains, remotePatterns }) {
  if (!URL.canParse(src)) return false;
  const url = new URL(src);
  if (![
    "http:",
    "https:",
    "data:"
  ].includes(url.protocol)) return false;
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
function readUInt(input, bits, offset = 0, isBigEndian = false) {
  return methods[`readUInt${bits}${isBigEndian ? "BE" : "LE"}`](input, offset);
}
function readBox(input, offset) {
  if (input.length - offset < MIN_BOX_HEADER) return;
  const boxSize = readUInt32BE(input, offset);
  if (boxSize === 0) return {
    name: toUTF8String(input, offset + 4, offset + 8),
    offset,
    size: input.length - offset
  };
  if (boxSize === 1) return;
  if (boxSize < MIN_BOX_HEADER) return;
  if (input.length - offset < boxSize) return;
  return {
    name: toUTF8String(input, offset + 4, offset + 8),
    offset,
    size: boxSize
  };
}
function findBox(input, boxName, startOffset) {
  let offset = startOffset;
  while (offset < input.length) {
    const box = readBox(input, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    if (box.size < MIN_BOX_HEADER) break;
    const nextOffset = offset + box.size;
    if (nextOffset <= offset) break;
    offset = nextOffset;
  }
}
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
function detectType(input, start, end) {
  let hasAvif = false;
  let hasHeic = false;
  let hasHeif = false;
  for (let i2 = start; i2 <= end; i2 += 4) {
    const brand = toUTF8String(input, i2, i2 + 4);
    if (brand === "avif" || brand === "avis") hasAvif = true;
    else if (brand === "heic" || brand === "heix" || brand === "hevc" || brand === "hevx") hasHeic = true;
    else if (brand === "mif1" || brand === "msf1") hasHeif = true;
  }
  if (hasAvif) return "avif";
  if (hasHeic) return "heic";
  if (hasHeif) return "heif";
}
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [toUTF8String(input, imageOffset, imageLengthOffset), readUInt32BE(input, imageLengthOffset)];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return {
    width: size,
    height: size,
    type
  };
}
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfDirectoryEntries = readUInt(exifBlock, 16, 14, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = 16 + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) return;
    const block = exifBlock.slice(start, end);
    if (readUInt(block, 16, 0, isBigEndian) === 274) {
      if (readUInt(block, 16, 2, isBigEndian) !== 3) return;
      if (readUInt(block, 32, 4, isBigEndian) !== 1) return;
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(exifBlock, EXIF_HEADER_BYTES, 8);
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || byteAlign === LITTLE_ENDIAN_BYTE_ALIGN) return extractOrientation(exifBlock, isBigEndian);
}
function validateInput(input, index) {
  if (index > input.length) throw new TypeError("Corrupt JPG, exceeded buffer limits");
}
function calculateImageDimension(reader, isSmallImage) {
  if (isSmallImage) return 8 * (1 + reader.getBits(5));
  const extraBits = [
    9,
    13,
    18,
    30
  ][reader.getBits(2)];
  return 1 + reader.getBits(extraBits);
}
function calculateImageWidth(reader, isSmallImage, widthMode, height) {
  if (isSmallImage && widthMode === 0) return 8 * (1 + reader.getBits(5));
  if (widthMode === 0) return calculateImageDimension(reader, false);
  return Math.floor(height * [
    1,
    1.2,
    4 / 3,
    1.5,
    16 / 9,
    5 / 4,
    2
  ][widthMode - 1]);
}
function extractCodestream(input) {
  const jxlcBox = findBox(input, "jxlc", 0);
  if (jxlcBox && jxlcBox.size >= 8) return input.slice(jxlcBox.offset + 8, jxlcBox.offset + jxlcBox.size);
  const partialStreams = extractPartialStreams(input);
  if (partialStreams.length > 0) return concatenateCodestreams(partialStreams);
}
function extractPartialStreams(input) {
  const partialStreams = [];
  let offset = 0;
  while (offset < input.length) {
    const jxlpBox = findBox(input, "jxlp", offset);
    if (!jxlpBox) break;
    if (jxlpBox.size < 12) break;
    partialStreams.push(input.slice(jxlpBox.offset + 12, jxlpBox.offset + jxlpBox.size));
    const nextOffset = jxlpBox.offset + jxlpBox.size;
    if (nextOffset <= offset) break;
    offset = nextOffset;
  }
  return partialStreams;
}
function concatenateCodestreams(partialCodestreams) {
  const totalLength = partialCodestreams.reduce((acc, curr) => acc + curr.length, 0);
  const codestream = new Uint8Array(totalLength);
  let position = 0;
  for (const partial2 of partialCodestreams) {
    codestream.set(partial2, position);
    position += partial2.length;
  }
  return codestream;
}
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) return;
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = extractorRegExps.width.exec(root);
  const height = extractorRegExps.height.exec(root);
  const viewbox = extractorRegExps.viewbox.exec(root);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) return {
    height: Math.floor(attrs.width / ratio),
    width: attrs.width
  };
  if (attrs.height) return {
    height: attrs.height,
    width: Math.floor(attrs.height * ratio)
  };
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
function readIFD(input, { isBigEndian, isBigTiff }) {
  const ifdOffset = isBigTiff ? Number(readUInt64(input, 8, isBigEndian)) : readUInt(input, 32, 4, isBigEndian);
  const entryCountSize = isBigTiff ? CONSTANTS.COUNT_SIZE.BIG : CONSTANTS.COUNT_SIZE.STANDARD;
  return input.slice(ifdOffset + entryCountSize);
}
function readTagValue(input, type, offset, isBigEndian) {
  switch (type) {
    case CONSTANTS.TYPE.SHORT:
      return readUInt(input, 16, offset, isBigEndian);
    case CONSTANTS.TYPE.LONG:
      return readUInt(input, 32, offset, isBigEndian);
    case CONSTANTS.TYPE.LONG8: {
      const value = Number(readUInt64(input, offset, isBigEndian));
      if (value > Number.MAX_SAFE_INTEGER) throw new TypeError("Value too large");
      return value;
    }
    default:
      return 0;
  }
}
function nextTag(input, isBigTiff) {
  const entrySize = isBigTiff ? CONSTANTS.ENTRY_SIZE.BIG : CONSTANTS.ENTRY_SIZE.STANDARD;
  if (input.length > entrySize) return input.slice(entrySize);
}
function extractTags(input, { isBigEndian, isBigTiff }) {
  const tags = {};
  let temp = input;
  while (temp?.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = isBigTiff ? Number(readUInt64(temp, 4, isBigEndian)) : readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) break;
    if (length === 1 && (type === CONSTANTS.TYPE.SHORT || type === CONSTANTS.TYPE.LONG || isBigTiff && type === CONSTANTS.TYPE.LONG8)) tags[code] = readTagValue(temp, type, isBigTiff ? 12 : 8, isBigEndian);
    temp = nextTag(temp, isBigTiff);
  }
  return tags;
}
function determineFormat(input) {
  const signature = toUTF8String(input, 0, 2);
  const version2 = readUInt(input, 16, 2, signature === "MM");
  return {
    isBigEndian: signature === "MM",
    isBigTiff: version2 === 43
  };
}
function validateBigTIFFHeader(input, isBigEndian) {
  const byteSize = readUInt(input, 16, 4, isBigEndian);
  const reserved = readUInt(input, 16, 6, isBigEndian);
  if (byteSize !== 8 || reserved !== 0) throw new TypeError("Invalid BigTIFF header");
}
function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
var MANY_LEADING_SLASHES, MANY_SLASHES, MANY_TRAILING_SLASHES, INTERNAL_PREFIXES, JUST_SLASHES, WITH_FILE_EXT, dateTimeFormat, levels, AstroLogger, AstroIntegrationLogger, level, decoder2, toUTF8String, toHexString, getView, readInt16LE, readUInt16BE, readUInt16LE, readUInt24LE, readInt32LE, readUInt32BE, readUInt32LE, readUInt64, methods, MIN_BOX_HEADER, BMP, TYPE_ICON, SIZE_HEADER$1, SIZE_IMAGE_ENTRY, ICO, TYPE_CURSOR, CUR, DDS, gifRegexp, GIF, brandMap, HEIF, SIZE_HEADER, FILE_LENGTH_OFFSET, MIN_ENTRY_LENGTH, ENTRY_LENGTH_OFFSET, ICON_TYPE_SIZE, ICNS, J2C, JP2, EXIF_MARKER, APP1_DATA_SIZE_BYTES, EXIF_HEADER_BYTES, BIG_ENDIAN_BYTE_ALIGN, LITTLE_ENDIAN_BYTE_ALIGN, IDF_ENTRY_BYTES, JPG, BitReader, JXLStream, JXL, KTX, pngSignature, pngImageHeaderChunkName, pngFriedChunkName, PNG, PNMTypes, handlers, PNM, PSD, svgReg, extractorRegExps, INCH_CM, units, unitsReg, SVG, TGA, CONSTANTS, signatures, TIFF, typeHandlers, SsrRuntimeFontFileUrlResolver, imageConfig;
var init_astro_assets_B_bvnz1D = __esm({
  "server/chunks/_astro_assets_B_bvnz1D.mjs"() {
    init_compiler_8THfIuk0();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(appendForwardSlash, "appendForwardSlash");
    __name(prependForwardSlash, "prependForwardSlash");
    MANY_LEADING_SLASHES = /^\/{2,}/;
    __name(collapseDuplicateLeadingSlashes, "collapseDuplicateLeadingSlashes");
    MANY_SLASHES = /\/{2,}/g;
    __name(collapseDuplicateSlashes, "collapseDuplicateSlashes");
    MANY_TRAILING_SLASHES = /\/{2,}$/g;
    __name(collapseDuplicateTrailingSlashes, "collapseDuplicateTrailingSlashes");
    __name(removeTrailingForwardSlash, "removeTrailingForwardSlash");
    __name(removeLeadingForwardSlash, "removeLeadingForwardSlash");
    __name(trimSlashes, "trimSlashes");
    __name(isString, "isString");
    INTERNAL_PREFIXES = /* @__PURE__ */ new Set([
      "/_",
      "/@",
      "/.",
      "//"
    ]);
    JUST_SLASHES = /^\/{2,}$/;
    __name(isInternalPath, "isInternalPath");
    __name(joinPaths, "joinPaths");
    __name(isRemotePath, "isRemotePath");
    __name(slash, "slash");
    __name(fileExtension, "fileExtension");
    __name(stripRequestBase, "stripRequestBase");
    WITH_FILE_EXT = /\/[^/]+\.\w+$/;
    __name(hasFileExtension, "hasFileExtension");
    dateTimeFormat = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    levels = {
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      silent: 90
    };
    __name(log, "log");
    __name(isLogLevelEnabled, "isLogLevelEnabled");
    __name(info, "info");
    __name(warn, "warn");
    __name(error2, "error");
    __name(debug, "debug");
    __name(getEventPrefix, "getEventPrefix");
    AstroLogger = class {
      static {
        __name(this, "AstroLogger");
      }
      options;
      constructor(options) {
        this.options = options;
      }
      info(label, message, newLine = true) {
        info(this.options, label, message, newLine);
      }
      warn(label, message, newLine = true) {
        warn(this.options, label, message, newLine);
      }
      error(label, message, newLine = true) {
        error2(this.options, label, message, newLine);
      }
      debug(label, ...messages) {
        debug(label, ...messages);
      }
      level() {
        return this.options.level;
      }
      forkIntegrationLogger(label) {
        return new AstroIntegrationLogger(this.options, label);
      }
      setDestination(destination) {
        this.options.destination = destination;
      }
      /**
      * It calls the `close` function of the provided destination, if it exists.
      */
      close() {
        if (this.options.destination.close) this.options.destination.close();
      }
      /**
      * It calls the `flush` function of the provided destination, if it exists.
      */
      flush() {
        if (this.options.destination.flush) this.options.destination.flush();
      }
    };
    AstroIntegrationLogger = class AstroIntegrationLogger2 {
      static {
        __name(this, "AstroIntegrationLogger");
      }
      options;
      label;
      constructor(logging, label) {
        this.options = logging;
        this.label = label;
      }
      /**
      * Creates a new logger instance with a new label, but the same log options.
      */
      fork(label) {
        return new AstroIntegrationLogger2(this.options, label);
      }
      info(message) {
        info(this.options, this.label, message);
      }
      warn(message) {
        warn(this.options, this.label, message);
      }
      error(message) {
        error2(this.options, this.label, message);
      }
      debug(message) {
        debug(this.label, message);
      }
      /**
      * It calls the `flush` function of the provided destination, if it exists.
      */
      flush() {
        if (this.options.destination.flush) this.options.destination.flush();
      }
      /**
      * It calls the `close` function of the provided destination, if it exists.
      */
      close() {
        if (this.options.destination.close) this.options.destination.close();
      }
    };
    __name(astroToRuntimeLogger, "astroToRuntimeLogger");
    __name(matchesLevel, "matchesLevel");
    __name(consoleLogDestination, "consoleLogDestination");
    __name(createConsoleLogger, "createConsoleLogger");
    __name(matchPattern, "matchPattern");
    __name(matchPort, "matchPort");
    __name(matchProtocol, "matchProtocol");
    __name(matchHostname, "matchHostname");
    __name(matchPathname, "matchPathname");
    __name(isRemoteAllowed, "isRemoteAllowed");
    level = "info";
    decoder2 = new TextDecoder();
    toUTF8String = /* @__PURE__ */ __name((input, start = 0, end = input.length) => decoder2.decode(input.slice(start, end)), "toUTF8String");
    toHexString = /* @__PURE__ */ __name((input, start = 0, end = input.length) => input.slice(start, end).reduce((memo2, i2) => memo2 + `0${i2.toString(16)}`.slice(-2), ""), "toHexString");
    getView = /* @__PURE__ */ __name((input, offset) => new DataView(input.buffer, input.byteOffset + offset), "getView");
    readInt16LE = /* @__PURE__ */ __name((input, offset = 0) => getView(input, offset).getInt16(0, true), "readInt16LE");
    readUInt16BE = /* @__PURE__ */ __name((input, offset = 0) => getView(input, offset).getUint16(0, false), "readUInt16BE");
    readUInt16LE = /* @__PURE__ */ __name((input, offset = 0) => getView(input, offset).getUint16(0, true), "readUInt16LE");
    readUInt24LE = /* @__PURE__ */ __name((input, offset = 0) => {
      const view = getView(input, offset);
      return view.getUint16(0, true) + (view.getUint8(2) << 16);
    }, "readUInt24LE");
    readInt32LE = /* @__PURE__ */ __name((input, offset = 0) => getView(input, offset).getInt32(0, true), "readInt32LE");
    readUInt32BE = /* @__PURE__ */ __name((input, offset = 0) => getView(input, offset).getUint32(0, false), "readUInt32BE");
    readUInt32LE = /* @__PURE__ */ __name((input, offset = 0) => getView(input, offset).getUint32(0, true), "readUInt32LE");
    readUInt64 = /* @__PURE__ */ __name((input, offset, isBigEndian) => getView(input, offset).getBigUint64(0, !isBigEndian), "readUInt64");
    methods = {
      readUInt16BE,
      readUInt16LE,
      readUInt32BE,
      readUInt32LE
    };
    __name(readUInt, "readUInt");
    MIN_BOX_HEADER = 8;
    __name(readBox, "readBox");
    __name(findBox, "findBox");
    BMP = {
      validate: /* @__PURE__ */ __name((input) => toUTF8String(input, 0, 2) === "BM", "validate"),
      calculate: /* @__PURE__ */ __name((input) => ({
        height: Math.abs(readInt32LE(input, 22)),
        width: readUInt32LE(input, 18)
      }), "calculate")
    };
    TYPE_ICON = 1;
    SIZE_HEADER$1 = 6;
    SIZE_IMAGE_ENTRY = 16;
    __name(getSizeFromOffset, "getSizeFromOffset");
    __name(getImageSize$1, "getImageSize$1");
    ICO = {
      validate(input) {
        const reserved = readUInt16LE(input, 0);
        const imageCount = readUInt16LE(input, 4);
        if (reserved !== 0 || imageCount === 0) return false;
        return readUInt16LE(input, 2) === TYPE_ICON;
      },
      calculate(input) {
        const nbImages = readUInt16LE(input, 4);
        const imageSize = getImageSize$1(input, 0);
        if (nbImages === 1) return imageSize;
        const images = [];
        for (let imageIndex = 0; imageIndex < nbImages; imageIndex += 1) images.push(getImageSize$1(input, imageIndex));
        return {
          width: imageSize.width,
          height: imageSize.height,
          images
        };
      }
    };
    TYPE_CURSOR = 2;
    CUR = {
      validate(input) {
        const reserved = readUInt16LE(input, 0);
        const imageCount = readUInt16LE(input, 4);
        if (reserved !== 0 || imageCount === 0) return false;
        return readUInt16LE(input, 2) === TYPE_CURSOR;
      },
      calculate: /* @__PURE__ */ __name((input) => ICO.calculate(input), "calculate")
    };
    DDS = {
      validate: /* @__PURE__ */ __name((input) => readUInt32LE(input, 0) === 542327876, "validate"),
      calculate: /* @__PURE__ */ __name((input) => ({
        height: readUInt32LE(input, 12),
        width: readUInt32LE(input, 16)
      }), "calculate")
    };
    gifRegexp = /^GIF8[79]a/;
    GIF = {
      validate: /* @__PURE__ */ __name((input) => gifRegexp.test(toUTF8String(input, 0, 6)), "validate"),
      calculate: /* @__PURE__ */ __name((input) => ({
        height: readUInt16LE(input, 8),
        width: readUInt16LE(input, 6)
      }), "calculate")
    };
    brandMap = {
      avif: "avif",
      avis: "avif",
      mif1: "heif",
      msf1: "heif",
      heic: "heic",
      heix: "heic",
      hevc: "heic",
      hevx: "heic"
    };
    __name(detectType, "detectType");
    HEIF = {
      validate(input) {
        if (toUTF8String(input, 4, 8) !== "ftyp") return false;
        const ftypBox = findBox(input, "ftyp", 0);
        if (!ftypBox) return false;
        return toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12) in brandMap;
      },
      calculate(input) {
        const metaBox = findBox(input, "meta", 0);
        const iprpBox = metaBox && findBox(input, "iprp", metaBox.offset + 12);
        const ipcoBox = iprpBox && findBox(input, "ipco", iprpBox.offset + 8);
        if (!ipcoBox) throw new TypeError("Invalid HEIF, no ipco box found");
        const type = detectType(input, 8, metaBox.offset);
        const images = [];
        let currentOffset = ipcoBox.offset + 8;
        const ipcoEnd = ipcoBox.offset + ipcoBox.size;
        while (currentOffset < ipcoEnd) {
          const ispeBox = findBox(input, "ispe", currentOffset);
          if (!ispeBox) break;
          if (ispeBox.size < 8) break;
          if (ispeBox.offset + ispeBox.size > ipcoEnd) break;
          const rawWidth = readUInt32BE(input, ispeBox.offset + 12);
          const rawHeight = readUInt32BE(input, ispeBox.offset + 16);
          const clapBox = findBox(input, "clap", currentOffset);
          let width = rawWidth;
          let height = rawHeight;
          if (clapBox && clapBox.offset < ipcoEnd && clapBox.size >= 8) width = rawWidth - readUInt32BE(input, clapBox.offset + 12);
          images.push({
            height,
            width
          });
          const nextOffset = ispeBox.offset + ispeBox.size;
          if (nextOffset <= currentOffset) break;
          currentOffset = nextOffset;
        }
        if (images.length === 0) throw new TypeError("Invalid HEIF, no sizes found");
        return {
          width: images[0].width,
          height: images[0].height,
          type,
          ...images.length > 1 ? { images } : {}
        };
      }
    };
    SIZE_HEADER = 8;
    FILE_LENGTH_OFFSET = 4;
    MIN_ENTRY_LENGTH = 8;
    ENTRY_LENGTH_OFFSET = 4;
    ICON_TYPE_SIZE = {
      ICON: 32,
      "ICN#": 32,
      "icm#": 16,
      icm4: 16,
      icm8: 16,
      "ics#": 16,
      ics4: 16,
      ics8: 16,
      is32: 16,
      s8mk: 16,
      icp4: 16,
      icl4: 32,
      icl8: 32,
      il32: 32,
      l8mk: 32,
      icp5: 32,
      ic11: 32,
      ich4: 48,
      ich8: 48,
      ih32: 48,
      h8mk: 48,
      icp6: 64,
      ic12: 32,
      it32: 128,
      t8mk: 128,
      ic07: 128,
      ic08: 256,
      ic13: 256,
      ic09: 512,
      ic14: 512,
      ic10: 1024
    };
    __name(readImageHeader, "readImageHeader");
    __name(getImageSize, "getImageSize");
    ICNS = {
      validate: /* @__PURE__ */ __name((input) => toUTF8String(input, 0, 4) === "icns", "validate"),
      calculate(input) {
        const inputLength = input.length;
        const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
        let imageOffset = SIZE_HEADER;
        const images = [];
        while (imageOffset < fileLength && imageOffset < inputLength) {
          if (inputLength - imageOffset < MIN_ENTRY_LENGTH) break;
          const imageHeader = readImageHeader(input, imageOffset);
          const entryLength = imageHeader[1];
          if (entryLength < MIN_ENTRY_LENGTH) break;
          const imageSize = getImageSize(imageHeader[0]);
          if (imageSize.width && imageSize.height) images.push(imageSize);
          const nextOffset = imageOffset + entryLength;
          if (nextOffset <= imageOffset) break;
          imageOffset = nextOffset;
        }
        if (images.length === 0) throw new TypeError("Invalid ICNS, no sizes found");
        return {
          width: images[0].width,
          height: images[0].height,
          ...images.length > 1 ? { images } : {}
        };
      }
    };
    J2C = {
      validate: /* @__PURE__ */ __name((input) => readUInt32BE(input, 0) === 4283432785, "validate"),
      calculate: /* @__PURE__ */ __name((input) => ({
        height: readUInt32BE(input, 12),
        width: readUInt32BE(input, 8)
      }), "calculate")
    };
    JP2 = {
      validate(input) {
        if (toUTF8String(input, 4, 8) !== "jP  ") return false;
        const ftypBox = findBox(input, "ftyp", 0);
        if (!ftypBox) return false;
        return toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12) === "jp2 ";
      },
      calculate(input) {
        const jp2hBox = findBox(input, "jp2h", 0);
        const ihdrBox = jp2hBox && jp2hBox.size >= 8 && findBox(input, "ihdr", jp2hBox.offset + 8);
        if (ihdrBox && ihdrBox.size >= 8) return {
          height: readUInt32BE(input, ihdrBox.offset + 8),
          width: readUInt32BE(input, ihdrBox.offset + 12)
        };
        throw new TypeError("Unsupported JPEG 2000 format");
      }
    };
    EXIF_MARKER = "45786966";
    APP1_DATA_SIZE_BYTES = 2;
    EXIF_HEADER_BYTES = 6;
    BIG_ENDIAN_BYTE_ALIGN = "4d4d";
    LITTLE_ENDIAN_BYTE_ALIGN = "4949";
    IDF_ENTRY_BYTES = 12;
    __name(isEXIF, "isEXIF");
    __name(extractSize, "extractSize");
    __name(extractOrientation, "extractOrientation");
    __name(validateExifBlock, "validateExifBlock");
    __name(validateInput, "validateInput");
    JPG = {
      validate: /* @__PURE__ */ __name((input) => toHexString(input, 0, 2) === "ffd8", "validate"),
      calculate(_input) {
        let input = _input.slice(4);
        let orientation;
        let next;
        while (input.length) {
          const i2 = readUInt16BE(input, 0);
          validateInput(input, i2);
          if (input[i2] !== 255) {
            input = input.slice(1);
            continue;
          }
          if (isEXIF(input)) orientation = validateExifBlock(input, i2);
          next = input[i2 + 1];
          if (next === 192 || next === 193 || next === 194) {
            const size = extractSize(input, i2 + 5);
            if (!orientation) return size;
            return {
              height: size.height,
              orientation,
              width: size.width
            };
          }
          input = input.slice(i2 + 2);
        }
        throw new TypeError("Invalid JPG, no size found");
      }
    };
    BitReader = class {
      static {
        __name(this, "BitReader");
      }
      byteOffset = 2;
      bitOffset = 0;
      input;
      endianness;
      constructor(input, endianness) {
        this.input = input;
        this.endianness = endianness;
      }
      /** Reads a specified number of bits, and move the offset */
      getBits(length = 1) {
        let result = 0;
        let bitsRead = 0;
        while (bitsRead < length) {
          if (this.byteOffset >= this.input.length) throw new Error("Reached end of input");
          const currentByte = this.input[this.byteOffset];
          const bitsLeft = 8 - this.bitOffset;
          const bitsToRead = Math.min(length - bitsRead, bitsLeft);
          if (this.endianness === "little-endian") {
            const mask = (1 << bitsToRead) - 1;
            const bits = currentByte >> this.bitOffset & mask;
            result |= bits << bitsRead;
          } else {
            const bits = (currentByte & (1 << bitsToRead) - 1 << 8 - this.bitOffset - bitsToRead) >> 8 - this.bitOffset - bitsToRead;
            result = result << bitsToRead | bits;
          }
          bitsRead += bitsToRead;
          this.bitOffset += bitsToRead;
          if (this.bitOffset === 8) {
            this.byteOffset++;
            this.bitOffset = 0;
          }
        }
        return result;
      }
    };
    __name(calculateImageDimension, "calculateImageDimension");
    __name(calculateImageWidth, "calculateImageWidth");
    JXLStream = {
      validate: /* @__PURE__ */ __name((input) => {
        return toHexString(input, 0, 2) === "ff0a";
      }, "validate"),
      calculate(input) {
        const reader = new BitReader(input, "little-endian");
        const isSmallImage = reader.getBits(1) === 1;
        const height = calculateImageDimension(reader, isSmallImage);
        return {
          width: calculateImageWidth(reader, isSmallImage, reader.getBits(3), height),
          height
        };
      }
    };
    __name(extractCodestream, "extractCodestream");
    __name(extractPartialStreams, "extractPartialStreams");
    __name(concatenateCodestreams, "concatenateCodestreams");
    JXL = {
      validate: /* @__PURE__ */ __name((input) => {
        if (toUTF8String(input, 4, 8) !== "JXL ") return false;
        const ftypBox = findBox(input, "ftyp", 0);
        if (!ftypBox) return false;
        return toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12) === "jxl ";
      }, "validate"),
      calculate(input) {
        const codestream = extractCodestream(input);
        if (codestream) return JXLStream.calculate(codestream);
        throw new Error("No codestream found in JXL container");
      }
    };
    KTX = {
      validate: /* @__PURE__ */ __name((input) => {
        const signature = toUTF8String(input, 1, 7);
        return ["KTX 11", "KTX 20"].includes(signature);
      }, "validate"),
      calculate: /* @__PURE__ */ __name((input) => {
        const type = input[5] === 49 ? "ktx" : "ktx2";
        const offset = type === "ktx" ? 36 : 20;
        return {
          height: readUInt32LE(input, offset + 4),
          width: readUInt32LE(input, offset),
          type
        };
      }, "calculate")
    };
    pngSignature = "PNG\r\n\n";
    pngImageHeaderChunkName = "IHDR";
    pngFriedChunkName = "CgBI";
    PNG = {
      validate(input) {
        if (pngSignature === toUTF8String(input, 1, 8)) {
          let chunkName = toUTF8String(input, 12, 16);
          if (chunkName === pngFriedChunkName) chunkName = toUTF8String(input, 28, 32);
          if (chunkName !== pngImageHeaderChunkName) throw new TypeError("Invalid PNG");
          return true;
        }
        return false;
      },
      calculate(input) {
        if (toUTF8String(input, 12, 16) === pngFriedChunkName) return {
          height: readUInt32BE(input, 36),
          width: readUInt32BE(input, 32)
        };
        return {
          height: readUInt32BE(input, 20),
          width: readUInt32BE(input, 16)
        };
      }
    };
    PNMTypes = {
      P1: "pbm/ascii",
      P2: "pgm/ascii",
      P3: "ppm/ascii",
      P4: "pbm",
      P5: "pgm",
      P6: "ppm",
      P7: "pam",
      PF: "pfm"
    };
    handlers = {
      default: /* @__PURE__ */ __name((lines) => {
        let dimensions = [];
        while (lines.length > 0) {
          const line = lines.shift();
          if (line[0] === "#") continue;
          dimensions = line.split(" ");
          break;
        }
        if (dimensions.length === 2) return {
          height: Number.parseInt(dimensions[1], 10),
          width: Number.parseInt(dimensions[0], 10)
        };
        throw new TypeError("Invalid PNM");
      }, "default"),
      pam: /* @__PURE__ */ __name((lines) => {
        const size = {};
        while (lines.length > 0) {
          const line = lines.shift();
          if (line.length > 16 || line.charCodeAt(0) > 128) continue;
          const [key, value] = line.split(" ");
          if (key && value) size[key.toLowerCase()] = Number.parseInt(value, 10);
          if (size.height && size.width) break;
        }
        if (size.height && size.width) return {
          height: size.height,
          width: size.width
        };
        throw new TypeError("Invalid PAM");
      }, "pam")
    };
    PNM = {
      validate: /* @__PURE__ */ __name((input) => toUTF8String(input, 0, 2) in PNMTypes, "validate"),
      calculate(input) {
        const type = PNMTypes[toUTF8String(input, 0, 2)];
        const lines = toUTF8String(input, 3).split(/[\r\n]+/);
        return (handlers[type] || handlers.default)(lines);
      }
    };
    PSD = {
      validate: /* @__PURE__ */ __name((input) => toUTF8String(input, 0, 4) === "8BPS", "validate"),
      calculate: /* @__PURE__ */ __name((input) => ({
        height: readUInt32BE(input, 14),
        width: readUInt32BE(input, 18)
      }), "calculate")
    };
    svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
    extractorRegExps = {
      height: /\sheight=(['"])([^%]+?)\1/,
      root: svgReg,
      viewbox: /\sviewBox=(['"])(.+?)\1/i,
      width: /\swidth=(['"])([^%]+?)\1/
    };
    INCH_CM = 2.54;
    units = {
      in: 96,
      cm: 96 / INCH_CM,
      em: 16,
      ex: 8,
      m: 96 / INCH_CM * 100,
      mm: 96 / INCH_CM / 10,
      pc: 96 / 72 / 12,
      pt: 96 / 72,
      px: 1
    };
    unitsReg = new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`);
    __name(parseLength, "parseLength");
    __name(parseViewbox, "parseViewbox");
    __name(parseAttributes, "parseAttributes");
    __name(calculateByDimensions, "calculateByDimensions");
    __name(calculateByViewbox, "calculateByViewbox");
    SVG = {
      validate: /* @__PURE__ */ __name((input) => svgReg.test(toUTF8String(input, 0, 1e3)), "validate"),
      calculate(input) {
        const root = extractorRegExps.root.exec(toUTF8String(input));
        if (root) {
          const attrs = parseAttributes(root[0]);
          if (attrs.width != null && attrs.height != null) return calculateByDimensions(attrs);
          if (attrs.viewbox) return calculateByViewbox(attrs, attrs.viewbox);
        }
        throw new TypeError("Invalid SVG");
      }
    };
    TGA = {
      validate(input) {
        return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
      },
      calculate(input) {
        return {
          height: readUInt16LE(input, 14),
          width: readUInt16LE(input, 12)
        };
      }
    };
    CONSTANTS = {
      TAG: {
        WIDTH: 256,
        HEIGHT: 257,
        COMPRESSION: 259
      },
      TYPE: {
        SHORT: 3,
        LONG: 4,
        LONG8: 16
      },
      ENTRY_SIZE: {
        STANDARD: 12,
        BIG: 20
      },
      COUNT_SIZE: {
        STANDARD: 2,
        BIG: 8
      }
    };
    __name(readIFD, "readIFD");
    __name(readTagValue, "readTagValue");
    __name(nextTag, "nextTag");
    __name(extractTags, "extractTags");
    __name(determineFormat, "determineFormat");
    __name(validateBigTIFFHeader, "validateBigTIFFHeader");
    signatures = /* @__PURE__ */ new Set([
      "49492a00",
      "4d4d002a",
      "49492b00",
      "4d4d002b"
    ]);
    TIFF = {
      validate: /* @__PURE__ */ __name((input) => {
        const signature = toHexString(input, 0, 4);
        return signatures.has(signature);
      }, "validate"),
      calculate(input) {
        const format = determineFormat(input);
        if (format.isBigTiff) validateBigTIFFHeader(input, format.isBigEndian);
        const tags = extractTags(readIFD(input, format), format);
        const info2 = {
          height: tags[CONSTANTS.TAG.HEIGHT],
          width: tags[CONSTANTS.TAG.WIDTH],
          type: format.isBigTiff ? "bigtiff" : "tiff"
        };
        if (tags[CONSTANTS.TAG.COMPRESSION]) info2.compression = tags[CONSTANTS.TAG.COMPRESSION];
        if (!info2.width || !info2.height) throw new TypeError("Invalid Tiff. Missing tags");
        return info2;
      }
    };
    __name(calculateExtended, "calculateExtended");
    __name(calculateLossless, "calculateLossless");
    __name(calculateLossy, "calculateLossy");
    typeHandlers = /* @__PURE__ */ new Map([
      ["bmp", BMP],
      ["cur", CUR],
      ["dds", DDS],
      ["gif", GIF],
      ["heif", HEIF],
      ["icns", ICNS],
      ["ico", ICO],
      ["j2c", J2C],
      ["jp2", JP2],
      ["jpg", JPG],
      ["jxl", JXL],
      ["jxl-stream", JXLStream],
      ["ktx", KTX],
      ["png", PNG],
      ["pnm", PNM],
      ["psd", PSD],
      ["svg", SVG],
      ["tga", TGA],
      ["tiff", TIFF],
      ["webp", {
        validate(input) {
          const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
          const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
          const vp8Header = "VP8" === toUTF8String(input, 12, 15);
          return riffHeader && webpHeader && vp8Header;
        },
        calculate(_input) {
          const chunkHeader = toUTF8String(_input, 12, 16);
          const input = _input.slice(20, 30);
          if (chunkHeader === "VP8X") {
            const extendedHeader = input[0];
            const validStart = (extendedHeader & 192) === 0;
            const validEnd = (extendedHeader & 1) === 0;
            if (validStart && validEnd) return calculateExtended(input);
            throw new TypeError("Invalid WebP");
          }
          if (chunkHeader === "VP8 " && input[0] !== 47) return calculateLossy(input);
          const signature = toHexString(input, 3, 6);
          if (chunkHeader === "VP8L" && signature !== "9d012a") return calculateLossless(input);
          throw new TypeError("Invalid WebP");
        }
      }]
    ]);
    Array.from(typeHandlers.keys());
    Function.prototype.toString.call(Object);
    createAstro("https://astro.build");
    createAstro("https://astro.build");
    createAstro("https://astro.build");
    SsrRuntimeFontFileUrlResolver = class {
      static {
        __name(this, "SsrRuntimeFontFileUrlResolver");
      }
      #urls;
      constructor({ urls }) {
        this.#urls = urls;
      }
      resolve(url, requestUrl) {
        if (!this.#urls.has(url)) return null;
        if (!url.startsWith("/")) return url;
        if (!requestUrl) throw new AstroError(MissingGetFontFileRequestUrl);
        return `${requestUrl.origin}${url}`;
      }
    };
    new SsrRuntimeFontFileUrlResolver({ urls: /* @__PURE__ */ new Set([]) });
    createConsoleLogger({ level });
    imageConfig = {
      "endpoint": {
        "route": "/_image",
        "entrypoint": "@astrojs/cloudflare/image-passthrough-endpoint"
      },
      "service": {
        "entrypoint": "astro/assets/services/noop",
        "config": {}
      },
      "dangerouslyProcessSVG": false,
      "domains": [],
      "remotePatterns": [],
      "responsiveStyles": false
    };
    Object.defineProperties(imageConfig, {
      assetQueryParams: {
        value: void 0,
        enumerable: false,
        configurable: true
      },
      staticImageConfig: {
        value: {
          "base": "/",
          "assetsDir": "_astro"
        },
        enumerable: false,
        configurable: true
      }
    });
  }
});

// server/chunks/scope_CTVc8alC.mjs
function getInstalledRenderScope() {
  return globalThis[SCOPE_KEY];
}
function getRenderCollectors() {
  return getInstalledRenderScope()?.getStore();
}
var SCOPE_KEY;
var init_scope_CTVc8alC = __esm({
  "server/chunks/scope_CTVc8alC.mjs"() {
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    SCOPE_KEY = /* @__PURE__ */ Symbol.for("astro:render-scope");
    __name(getInstalledRenderScope, "getInstalledRenderScope");
    __name(getRenderCollectors, "getRenderCollectors");
  }
});

// server/chunks/rolldown-runtime_COXxpbMV.mjs
var __defProp2, __exportAll;
var init_rolldown_runtime_COXxpbMV = __esm({
  "server/chunks/rolldown-runtime_COXxpbMV.mjs"() {
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __defProp2 = Object.defineProperty;
    __exportAll = /* @__PURE__ */ __name((all, no_symbols) => {
      let target = {};
      for (var name in all) __defProp2(target, name, {
        get: all[name],
        enumerable: true
      });
      if (!no_symbols) __defProp2(target, Symbol.toStringTag, { value: "Module" });
      return target;
    }, "__exportAll");
  }
});

// server/chunks/image-passthrough-endpoint_x6nVUZWz.mjs
var image_passthrough_endpoint_x6nVUZWz_exports = {};
__export(image_passthrough_endpoint_x6nVUZWz_exports, {
  page: () => page
});
import { env } from "cloudflare:workers";
async function fetchWithRedirects(options) {
  const { url, headers, imageConfig: imageConfig2, fetchFn = globalThis.fetch, redirectLimit = 10, onMaxRedirectsExceeded = /* @__PURE__ */ __name((_u) => /* @__PURE__ */ new Error("Maximum redirect depth exceeded"), "onMaxRedirectsExceeded"), onMissingLocationHeader = /* @__PURE__ */ __name((_s, _u) => /* @__PURE__ */ new Error(`Redirect response ${_s} missing Location header`), "onMissingLocationHeader"), onDisallowedRedirect = /* @__PURE__ */ __name((_current, _target) => /* @__PURE__ */ new Error(`The image at ${_current} redirected to ${_target}, which is not an allowed remote location.`), "onDisallowedRedirect") } = options;
  if (redirectLimit <= 0) throw onMaxRedirectsExceeded(typeof url === "string" ? url : url.toString());
  const urlString = typeof url === "string" ? url : url.toString();
  const res = await fetchFn(new Request(url, { headers }), { redirect: "manual" });
  if ([
    301,
    302,
    303,
    307,
    308
  ].includes(res.status)) {
    const location = res.headers.get("Location");
    if (!location) throw onMissingLocationHeader(res.status, urlString);
    const redirectUrl = new URL(location, urlString).toString();
    if (!isRemoteAllowed(redirectUrl, {
      domains: imageConfig2.domains ?? [],
      remotePatterns: imageConfig2.remotePatterns ?? []
    })) throw onDisallowedRedirect(urlString, redirectUrl);
    return fetchWithRedirects({
      url: redirectUrl,
      headers,
      imageConfig: imageConfig2,
      fetchFn,
      redirectLimit: redirectLimit - 1,
      onMaxRedirectsExceeded,
      onMissingLocationHeader,
      onDisallowedRedirect
    });
  }
  return res;
}
var image_passthrough_endpoint_exports, GET, page;
var init_image_passthrough_endpoint_x6nVUZWz = __esm({
  "server/chunks/image-passthrough-endpoint_x6nVUZWz.mjs"() {
    init_rolldown_runtime_COXxpbMV();
    init_astro_assets_B_bvnz1D();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(fetchWithRedirects, "fetchWithRedirects");
    image_passthrough_endpoint_exports = /* @__PURE__ */ __exportAll({
      GET: /* @__PURE__ */ __name(() => GET, "GET"),
      prerender: /* @__PURE__ */ __name(() => false, "prerender")
    });
    GET = /* @__PURE__ */ __name(async ({ request }) => {
      try {
        const url = new URL(request.url);
        const href = url.searchParams.get("href");
        if (!href) return new Response("Bad Request", { status: 400 });
        const isRemote = isRemotePath(href);
        let response;
        if (isRemote) {
          if (!isRemoteAllowed(href, imageConfig)) return new Response("Forbidden", { status: 403 });
          response = await fetchWithRedirects({
            url: href,
            imageConfig
          });
        } else {
          const sourceUrl = new URL(href, url.origin);
          if (sourceUrl.origin !== url.origin) return new Response("Forbidden", { status: 403 });
          response = await env.ASSETS.fetch(new Request(sourceUrl, { headers: request.headers }));
        }
        if (response.status >= 300 && response.status < 400) return new Response("Not Found", { status: 404 });
        if (!response.ok) return new Response("Not Found", { status: 404 });
        const contentType = response.headers.get("Content-Type") ?? "";
        if (!contentType.startsWith("image/")) return new Response("Forbidden", { status: 403 });
        const headers = new Headers();
        headers.set("Content-Type", contentType);
        headers.set("Cache-Control", "public, max-age=31536000");
        headers.set("Date", (/* @__PURE__ */ new Date()).toUTCString());
        const etag = response.headers.get("ETag");
        if (etag) headers.set("ETag", etag);
        return new Response(response.body, {
          status: 200,
          headers
        });
      } catch (_err) {
        return new Response("Internal Server Error", { status: 500 });
      }
    }, "GET");
    page = /* @__PURE__ */ __name(() => image_passthrough_endpoint_exports, "page");
  }
});

// server/chunks/index_DQmiYbIR.mjs
var index_DQmiYbIR_exports = {};
__export(index_DQmiYbIR_exports, {
  page: () => page2
});
function validateArgs(args) {
  if (args.length !== 3) return false;
  if (!args[0] || typeof args[0] !== "object") return false;
  return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
  const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
  const fn = /* @__PURE__ */ __name((...args) => {
    if (!validateArgs(args)) throw new AstroError({
      ...InvalidComponentArgs,
      message: InvalidComponentArgs.message(name)
    });
    return cb(...args);
  }, "fn");
  Object.defineProperty(fn, "name", {
    value: name,
    writable: false
  });
  fn.isAstroComponentFactory = true;
  fn.moduleId = moduleId;
  fn.propagation = propagation;
  return fn;
}
function createComponentWithOptions(opts) {
  return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
  if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
  else return createComponentWithOptions(arg1);
}
async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) content = `<script type="module">${inlined}<\/script>`;
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
  }
  return createRenderInstruction({
    type: "script",
    id,
    content
  });
}
function recordReferencedImage(fsPath) {
  getRenderCollectors()?.referencedImages?.add(fsPath);
}
function createImageAsset(metadata, fsPath, track) {
  const asset = { ...metadata };
  Object.defineProperty(asset, "fsPath", {
    value: fsPath,
    enumerable: false
  });
  if (track) {
    let src = metadata.src;
    Object.defineProperty(asset, RAW_SRC, { get: /* @__PURE__ */ __name(() => src, "get") });
    Object.defineProperty(asset, "src", {
      enumerable: true,
      configurable: true,
      get() {
        recordReferencedImage(fsPath);
        return src;
      },
      set(value) {
        src = value;
      }
    });
  } else Object.defineProperty(asset, RAW_SRC, { get: /* @__PURE__ */ __name(() => asset.src, "get") });
  return asset;
}
function getProductWhatsAppUrl(productName) {
  const message = `Hola Montanares Todo Cuero, me gustar\xEDa consultar por la disponibilidad de: ${productName}. \xBFMe podr\xEDan dar m\xE1s detalles sobre disponibilidad y env\xEDos?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function getGeneralWhatsAppUrl(customText) {
  const message = customText && customText.trim() ? customText.trim() : "Hola Montanares Todo Cuero, me gustar\xEDa consultar por sus productos de cuero, cat\xE1logo y despachos. \xA1Muchas gracias!";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
var RAW_SRC, product_leather_wallet_1793558228894_default, product_leather_belt_1793558230384_default, product_leather_bag_1793558230519_default, product_leather_cardholder_1793558231155_default, product_leather_apron_1793558232510_default, hero_leather_craft_1793558229126_default, gallery_leather_stitch_detail_1793558232652_default, PRODUCTS, GALLERY_ITEMS, TESTIMONIALS, WHATSAPP_NUMBER, WHATSAPP_DISPLAY, FACEBOOK_URL, $$Header, $$Footer, $$WhatsAppButton, $$MainLayout, $$Hero, $$ProductCard, $$ProductGrid, $$About, $$Gallery, $$Testimonials, $$Contact, pages_exports, $$Index, $$file, page2;
var init_index_DQmiYbIR = __esm({
  "server/chunks/index_DQmiYbIR.mjs"() {
    init_rolldown_runtime_COXxpbMV();
    init_compiler_8THfIuk0();
    init_scope_CTVc8alC();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(validateArgs, "validateArgs");
    __name(baseCreateComponent, "baseCreateComponent");
    __name(createComponentWithOptions, "createComponentWithOptions");
    __name(createComponent, "createComponent");
    __name(renderScript, "renderScript");
    __name(recordReferencedImage, "recordReferencedImage");
    RAW_SRC = /* @__PURE__ */ Symbol.for("astro:image-asset:raw-src");
    __name(createImageAsset, "createImageAsset");
    product_leather_wallet_1793558228894_default = createImageAsset({
      "src": "/_astro/product_leather_wallet_1793558228894.Y5NOegok.jpg",
      "width": 1200,
      "height": 896,
      "format": "jpg"
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/assets/images/product_leather_wallet_1793558228894.jpg", false);
    product_leather_belt_1793558230384_default = createImageAsset({
      "src": "/_astro/product_leather_belt_1793558230384.BdG4w1r6.jpg",
      "width": 1200,
      "height": 896,
      "format": "jpg"
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/assets/images/product_leather_belt_1793558230384.jpg", false);
    product_leather_bag_1793558230519_default = createImageAsset({
      "src": "/_astro/product_leather_bag_1793558230519.dPwUN4TW.jpg",
      "width": 1200,
      "height": 896,
      "format": "jpg"
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/assets/images/product_leather_bag_1793558230519.jpg", false);
    product_leather_cardholder_1793558231155_default = createImageAsset({
      "src": "/_astro/product_leather_cardholder_1793558231155.BESY8S7R.jpg",
      "width": 1200,
      "height": 896,
      "format": "jpg"
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/assets/images/product_leather_cardholder_1793558231155.jpg", false);
    product_leather_apron_1793558232510_default = createImageAsset({
      "src": "/_astro/product_leather_apron_1793558232510.B9U0N4Ke.jpg",
      "width": 1200,
      "height": 896,
      "format": "jpg"
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/assets/images/product_leather_apron_1793558232510.jpg", false);
    hero_leather_craft_1793558229126_default = createImageAsset({
      "src": "/_astro/hero_leather_craft_1793558229126.s4vZZVRO.jpg",
      "width": 1376,
      "height": 768,
      "format": "jpg"
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/assets/images/hero_leather_craft_1793558229126.jpg", false);
    gallery_leather_stitch_detail_1793558232652_default = createImageAsset({
      "src": "/_astro/gallery_leather_stitch_detail_1793558232652.CNtKIXSz.jpg",
      "width": 1200,
      "height": 896,
      "format": "jpg"
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/assets/images/gallery_leather_stitch_detail_1793558232652.jpg", false);
    PRODUCTS = [
      {
        id: "billetera-clasica-caramel",
        name: "Billetera Cl\xE1sica Bifold",
        category: "Billeteras & Tarjeteros",
        description: "Billetera de cuero vacuno en tono caramelo con costura artesanal a dos agujas, m\xFAltiples ranuras para tarjetas y compartimento para billetes.",
        image: product_leather_wallet_1793558228894_default,
        badge: "100% Cuero Genuino",
        features: [
          "Ranuras reforzadas",
          "Hilo encerado de alta resistencia",
          "Bordes pulidos y bru\xF1idos"
        ],
        dimensions: "11.5 cm x 9.5 cm cerrado",
        material: "Cuero curtido al vegetal"
      },
      {
        id: "cinturon-robusto-hebilla-bronce",
        name: "Cintur\xF3n Cl\xE1sico con Hebilla de Bronce",
        category: "Cinturones",
        description: "Cintur\xF3n de cuero grueso de grano entero con p\xE1tina natural y hebilla maciza de bronce envejecido. Resistente al uso diario por a\xF1os.",
        image: product_leather_belt_1793558230384_default,
        badge: "Grano Entero Seleccionado",
        features: [
          "Grosor premium 3.8 - 4.0 mm",
          "Hebilla de lat\xF3n/bronce macizo",
          "P\xE1tina que mejora con el tiempo"
        ],
        dimensions: "Ancho: 3.8 cm (Largo a medida)",
        material: "Cuero de grano entero curtido"
      },
      {
        id: "morral-bandolera-rustico",
        name: "Morral Bandolera R\xFAstico",
        category: "Bolsos & Morrales",
        description: "Bolso bandolera de dise\xF1o artesanal con correas ajustables, cierres de hebilla met\xE1lica tradicional y amplio compartimento con car\xE1cter.",
        image: product_leather_bag_1793558230519_default,
        badge: "Pieza Exclusiva",
        features: [
          "Correa con almohadilla acolchada",
          "Costuras reforzadas en puntos de tensi\xF3n",
          "Bolsillo frontal de acceso r\xE1pido"
        ],
        dimensions: "28 cm ancho x 22 cm alto x 9 cm fuelle",
        material: "Cuero curtido r\xFAstico chestnut"
      },
      {
        id: "tarjetero-minimalista-cognac",
        name: "Tarjetero Minimalista Piel Genuina",
        category: "Billeteras & Tarjeteros",
        description: "Dise\xF1o ultra delgado y ergon\xF3mico para quienes prefieren ligereza. Capacidad para 6 tarjetas y compartimento central para billetes doblados.",
        image: product_leather_cardholder_1793558231155_default,
        badge: "Compacto & Pr\xE1ctico",
        features: [
          "Perfil ultra delgado",
          "Costura a mano con hilo encerado",
          "Cuero suave al tacto con memoria"
        ],
        dimensions: "10 cm x 7.5 cm",
        material: "Cuero vacuno curtido al vegetal"
      },
      {
        id: "delantal-artesanal-taller",
        name: "Delantal Artesanal de Cuero para Taller / Parrilla",
        category: "Accesorios & Taller",
        description: "Delantal de cuero vacuno robusto con arn\xE9s cruzado en la espalda para distribuir el peso, remaches de bronce y bolsillos utilitarios.",
        image: product_leather_apron_1793558232510_default,
        badge: "Trabajo Pesado & Parrilla",
        features: [
          "Correas cruzadas regulables",
          "Bolsillo portaherramientas y pecho",
          "Remaches de alta durabilidad"
        ],
        dimensions: "75 cm largo x 60 cm ancho (regulable)",
        material: "Cuero grueso seleccionado con acabado graso"
      },
      {
        id: "bolso-tote-viajero-artesano",
        name: "Bolso Duffle Fin de Semana",
        category: "Bolsos & Morrales",
        description: "Espacioso bolso de mano y hombro para viajes cortos o escapadas. Asas reforzadas con remaches dobles y detalles de marroquiner\xEDa fina.",
        image: hero_leather_craft_1793558229126_default,
        badge: "Gran Capacidad",
        features: [
          "Herrajes met\xE1licos reforzados",
          "Cierre principal de cremallera met\xE1lica",
          "Asas dobles con funda protectora"
        ],
        dimensions: "48 cm largo x 26 cm di\xE1metro",
        material: "Cuero vacuno plena flor con efecto pull-up"
      }
    ];
    GALLERY_ITEMS = [
      {
        id: "g-1",
        title: "Costura a Dos Agujas",
        subtitle: "T\xE9cnica tradicional de guarnicioner\xEDa con hilo encerado",
        image: gallery_leather_stitch_detail_1793558232652_default
      },
      {
        id: "g-2",
        title: "Colecci\xF3n en Banco de Trabajo",
        subtitle: "Nuestra l\xEDnea r\xFAstica sobre madera noble",
        image: hero_leather_craft_1793558229126_default
      },
      {
        id: "g-3",
        title: "Billetera Bifold y Texturas",
        subtitle: "Detalle de esquinas redondeadas y p\xE1tina c\xE1lida",
        image: product_leather_wallet_1793558228894_default
      },
      {
        id: "g-4",
        title: "Hebilla Maciza de Bronce",
        subtitle: "Herrajes seleccionados para durar toda una vida",
        image: product_leather_belt_1793558230384_default
      },
      {
        id: "g-5",
        title: "Morral con Fuelle Estructurado",
        subtitle: "Cortes limpios y ensamblaje manual",
        image: product_leather_bag_1793558230519_default
      },
      {
        id: "g-6",
        title: "Tarjetero de Bolsillo",
        subtitle: "Proporciones exactas pensadas para el uso cotidiano",
        image: product_leather_cardholder_1793558231155_default
      }
    ];
    TESTIMONIALS = [
      {
        name: "Rodrigo Valenzuela",
        location: "Concepci\xF3n, Chile",
        text: "Compr\xE9 la billetera bifold hace varios meses y el cuero se pone cada d\xEDa m\xE1s lindo con la p\xE1tina. Se nota el trabajo artesanal en cada costura. 100% recomendado.",
        productConsulted: "Billetera Bifold"
      },
      {
        name: "Carolina Morales",
        location: "Santiago, Chile",
        text: "Le regal\xE9 a mi esposo el cintur\xF3n de cuero grueso con hebilla de bronce. Es de una solidez impresionante, nada que ver con los que venden en tiendas comerciales. La atenci\xF3n por WhatsApp fue muy r\xE1pida y amable.",
        productConsulted: "Cintur\xF3n Cl\xE1sico"
      },
      {
        name: "Gonzalo Sep\xFAlveda",
        location: "Temuco, Chile",
        text: "Excelente confecci\xF3n del morral bandolera. Los remaches y el grosor del cuero son de primer nivel. El env\xEDo lleg\xF3 a regiones sin ning\xFAn problema.",
        productConsulted: "Morral Bandolera R\xFAstico"
      }
    ];
    WHATSAPP_NUMBER = "56927047529";
    WHATSAPP_DISPLAY = "+56 9 2704 7529";
    FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100054494468211";
    __name(getProductWhatsAppUrl, "getProductWhatsAppUrl");
    __name(getGeneralWhatsAppUrl, "getGeneralWhatsAppUrl");
    $$Header = createComponent(($$result, $$props, $$slots) => {
      const whatsappUrl = getGeneralWhatsAppUrl();
      return renderTemplate`${maybeRenderHead($$result)}<header class="sticky top-0 z-40 bg-[#F7F2E9]/95 backdrop-blur-md border-b border-[#D9C6A5]/40 transition-colors"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between gap-8 h-20"><!-- Zone 1: Brand Wordmark --><a href="#inicio" class="flex items-center gap-2 group whitespace-nowrap shrink-0" aria-label="Montanares Todo Cuero - Inicio"><div class="w-9 h-9 rounded-full bg-[#38271F] flex items-center justify-center text-[#D9C6A5] font-serif font-bold text-lg shadow-xs group-hover:bg-[#76513B] transition-colors">M</div><div class="flex flex-col"><span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#38271F] group-hover:text-[#76513B] transition-colors">Montanares Todo Cuero</span></div></a><!-- Zone 2: Navigation Links --><nav class="hidden md:flex items-center gap-8 text-sm font-medium text-[#38271F]/80"><a href="#inicio" class="hover:text-[#76513B] transition-colors whitespace-nowrap shrink-0 py-1">Inicio</a><a href="#productos" class="hover:text-[#76513B] transition-colors whitespace-nowrap shrink-0 py-1">Productos</a><a href="#nosotros" class="hover:text-[#76513B] transition-colors whitespace-nowrap shrink-0 py-1">Nosotros</a><a href="#galeria" class="hover:text-[#76513B] transition-colors whitespace-nowrap shrink-0 py-1">Galería</a><a href="#testimonios" class="hover:text-[#76513B] transition-colors whitespace-nowrap shrink-0 py-1">Testimonios</a><a href="#contacto" class="hover:text-[#76513B] transition-colors whitespace-nowrap shrink-0 py-1">Contacto</a></nav><!-- Zone 3: Primary Action --><div class="flex items-center gap-3 shrink-0"><a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-[#38271F] hover:bg-[#76513B] text-[#F7F2E9] rounded-lg text-xs md:text-sm font-medium tracking-wide transition-all shadow-xs hover:shadow-md active:scale-95 whitespace-nowrap shrink-0"><svg class="w-4 h-4 text-[#D9C6A5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span>Consultar por WhatsApp</span></a><!-- Mobile Toggle Button --><button type="button" id="mobile-menu-toggle" class="md:hidden p-2 rounded-lg text-[#38271F] hover:bg-[#D9C6A5]/20 focus:outline-hidden focus:ring-2 focus:ring-[#76513B]" aria-label="Abrir menú"><svg class="w-6 h-6" id="menu-icon-bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg><svg class="w-6 h-6 hidden" id="menu-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg></button></div></div></div><!-- Mobile Drawer --><div id="mobile-menu" class="hidden md:hidden border-b border-[#D9C6A5]/40 bg-[#F7F2E9] px-4 pt-3 pb-6 space-y-3 shadow-lg"><nav class="flex flex-col space-y-2"><a href="#inicio" class="mobile-nav-link px-3 py-2 text-base font-medium text-[#38271F] hover:bg-[#D9C6A5]/25 rounded-md">Inicio</a><a href="#productos" class="mobile-nav-link px-3 py-2 text-base font-medium text-[#38271F] hover:bg-[#D9C6A5]/25 rounded-md">Productos</a><a href="#nosotros" class="mobile-nav-link px-3 py-2 text-base font-medium text-[#38271F] hover:bg-[#D9C6A5]/25 rounded-md">Nosotros</a><a href="#galeria" class="mobile-nav-link px-3 py-2 text-base font-medium text-[#38271F] hover:bg-[#D9C6A5]/25 rounded-md">Galería</a><a href="#testimonios" class="mobile-nav-link px-3 py-2 text-base font-medium text-[#38271F] hover:bg-[#D9C6A5]/25 rounded-md">Testimonios</a><a href="#contacto" class="mobile-nav-link px-3 py-2 text-base font-medium text-[#38271F] hover:bg-[#D9C6A5]/25 rounded-md">Contacto</a></nav><div class="pt-2"><a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#38271F] text-[#F7F2E9] rounded-lg text-sm font-medium hover:bg-[#76513B] transition-colors"><svg class="w-5 h-5 text-[#D9C6A5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span>Consultar por WhatsApp (+56 9 2704 7529)</span></a></div></div></header>${renderScript($$result, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Header.astro", void 0);
    $$Footer = createComponent(($$result, $$props, $$slots) => {
      const generalWhatsAppUrl = getGeneralWhatsAppUrl();
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-[#38271F] text-[#F7F2E9] border-t border-[#D9C6A5]/20 pt-16 pb-12"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#D9C6A5]/20"><!-- Brand Info --><div class="md:col-span-5 space-y-4"><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-[#76513B] flex items-center justify-center text-[#D9C6A5] font-serif font-bold text-base">M</div><span class="font-serif text-xl font-bold tracking-tight text-[#F7F2E9]">Montanares Todo Cuero</span></div><p class="text-xs sm:text-sm text-[#F7F2E9]/75 max-w-sm leading-relaxed">Artesanía y tradición en marroquinería de cuero genuino. Productos hechos con dedicación para acompañarte toda la vida.</p><div class="flex items-center gap-3 pt-2"><a${addAttribute(FACEBOOK_URL, "href")} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-[#76513B]/40 hover:bg-[#76513B] text-[#D9C6A5] hover:text-white flex items-center justify-center transition-colors" aria-label="Perfil oficial de Facebook de Montanares Todo Cuero"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a><a${addAttribute(generalWhatsAppUrl, "href")} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-[#76513B]/40 hover:bg-[#76513B] text-[#D9C6A5] hover:text-white flex items-center justify-center transition-colors" aria-label="WhatsApp de Montanares Todo Cuero"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg></a></div></div><!-- Quick Links --><div class="md:col-span-3 space-y-3"><h4 class="font-serif text-sm font-semibold uppercase tracking-wider text-[#D9C6A5]">Navegación</h4><ul class="space-y-2 text-xs text-[#F7F2E9]/80"><li><a href="#inicio" class="hover:text-[#D9C6A5] transition-colors">Inicio</a></li><li><a href="#productos" class="hover:text-[#D9C6A5] transition-colors">Catálogo de Productos</a></li><li><a href="#nosotros" class="hover:text-[#D9C6A5] transition-colors">El Taller & Nosotros</a></li><li><a href="#galeria" class="hover:text-[#D9C6A5] transition-colors">Galería de Acabados</a></li><li><a href="#testimonios" class="hover:text-[#D9C6A5] transition-colors">Testimonios</a></li><li><a href="#contacto" class="hover:text-[#D9C6A5] transition-colors">Contacto Directo</a></li></ul></div><!-- Attention & Dispatches --><div class="md:col-span-4 space-y-3"><h4 class="font-serif text-sm font-semibold uppercase tracking-wider text-[#D9C6A5]">Atención y Despachos</h4><div class="space-y-2 text-xs text-[#F7F2E9]/80"><p><strong class="text-[#F7F2E9]">WhatsApp Oficial:</strong> ${WHATSAPP_DISPLAY}</p><p><strong class="text-[#F7F2E9]">Despachos:</strong> Envíos coordinados a Santiago y todas las regiones de Chile.</p><p><strong class="text-[#F7F2E9]">Pedidos:</strong> Ventas minoristas y confección por encargo.</p></div></div></div><!-- Bottom Bar --><div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F2E9]/60"><p>© ${currentYear} Montanares Todo Cuero. Todos los derechos reservados.</p><a href="#inicio" class="flex items-center gap-1.5 hover:text-[#D9C6A5] transition-colors cursor-pointer"><span>Volver arriba</span><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></a></div></div></footer>`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Footer.astro", void 0);
    $$WhatsAppButton = createComponent(($$result, $$props, $$slots) => {
      const whatsappUrl = getGeneralWhatsAppUrl();
      return renderTemplate`${maybeRenderHead($$result)}<div class="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2" id="whatsapp-floating-container"><!-- Friendly Prompt --><div id="whatsapp-tooltip" class="hidden sm:flex items-center gap-2 bg-[#38271F] text-[#F7F2E9] text-xs py-2 px-3.5 rounded-xl shadow-lg border border-[#D9C6A5]/40 animate-in fade-in slide-in-from-bottom-2 duration-300"><span>¿Dudas sobre algún producto?</span><button type="button" id="whatsapp-tooltip-close" class="text-[#D9C6A5] hover:text-white p-0.5 rounded-full cursor-pointer" aria-label="Cerrar sugerencia"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><!-- Floating Button --><a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-hidden focus:ring-4 focus:ring-[#25D366]/40"${addAttribute(`Contactar por WhatsApp a ${WHATSAPP_DISPLAY}`, "aria-label")}${addAttribute(`Consultar por WhatsApp (${WHATSAPP_DISPLAY})`, "title")}><svg class="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.974.55 1.777.848 2.796.849 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.636-5.768-5.636zm3.385 8.169c-.144.405-.837.774-1.17.823-.312.045-.698.073-2.023-.473-1.603-.661-2.617-2.28-2.697-2.387-.08-.107-.648-.863-.648-1.646 0-.783.411-1.168.558-1.328.147-.16.321-.2.428-.2.107 0 .214.001.307.006.099.005.231-.038.361.275.134.321.455 1.11.495 1.191.04.081.067.175.013.282-.053.107-.08.174-.16.267-.08.094-.17.21-.242.282-.08.08-.163.167-.07.327.093.16.414.683.889 1.106.611.544 1.127.712 1.287.792.16.08.254.067.348-.04.093-.108.401-.468.508-.629.107-.16.214-.134.361-.08.147.054.935.441 1.096.521.16.08.267.12.307.187.04.067.04.388-.104.793zM12 2C6.477 2 2 6.477 2 12c0 1.891.523 3.66 1.433 5.174L2 22l4.954-1.399A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path></svg></a></div>${renderScript($$result, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/WhatsAppButton.astro?astro&type=script&index=0&lang.ts")}`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/WhatsAppButton.astro", void 0);
    createAstro("https://astro.build");
    $$MainLayout = createComponent(($$result, $$props, $$slots) => {
      const Astro = $$result.createAstro($$props, $$slots);
      Astro.self = $$MainLayout;
      const { title = "Montanares Todo Cuero | Productos y art\xEDculos de cuero", description = "Art\xEDculos de cuero genuino hechos con dedicaci\xF3n y tradici\xF3n artesanal: billeteras, cinturones, bolsos y accesorios con acabados \xFAnicos. Consulta y pedidos directos por WhatsApp." } = Astro.props;
      return renderTemplate`<html lang="es" class="scroll-smooth"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="keywords" content="cuero chile, marroquinería artesanal, billeteras de cuero, cinturones cuero genuino, bolsos de cuero, talabartería, Montanares Todo Cuero"><meta name="author" content="Montanares Todo Cuero"><link rel="canonical" href="https://ais-pre-mvybpnz57jqlurroety7jn-260431366643.us-east1.run.app/"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url" content="https://ais-pre-mvybpnz57jqlurroety7jn-260431366643.us-east1.run.app/"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:site_name" content="Montanares Todo Cuero"><meta property="og:locale" content="es_CL"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Montanares Todo Cuero | Artesanía en Cuero Genuino"><meta name="twitter:description" content="Descubre productos con carácter, detalles únicos y esencia artesanal. Atención personalizada por WhatsApp."><!-- Favicon --><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='%2338271F'%3E%3Cpath d='M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6zm-3.5 6.5a1.5 1.5 0 0 0-1.5 1.5v7a1.5 1.5 0 0 0 3 0V16.5l4 4.5 4-4.5V21a1.5 1.5 0 0 0 3 0v-7a1.5 1.5 0 0 0-2.5-1.125L16 16.375l-4-3.5a1.5 1.5 0 0 0-.5-.375z' fill='%2376513B'/%3E%3C/svg%3E"><!-- Google Fonts: Cormorant Garamond, Playfair Display & Inter --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet"><!-- Schema.org JSON-LD --><script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Montanares Todo Cuero",
      "description": "Comercialización y confección artesanal de artículos de cuero genuino en Chile: billeteras, cinturones, bolsos y accesorios con dedicación y estilo duradero.",
      "telephone": "+56927047529",
      "url": "https://ais-pre-mvybpnz57jqlurroety7jn-260431366643.us-east1.run.app/",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100054494468211",
        "https://wa.me/56927047529"
      ],
      "areaServed": "Chile",
      "priceRange": "$$"
    }
    <\/script>${renderHead($$result)}</head><body class="bg-[#F7F2E9] text-[#38271F] font-sans antialiased selection:bg-[#76513B] selection:text-[#F7F2E9] min-h-screen flex flex-col">${renderComponent($$result, "Header", $$Header, {})}<main class="flex-1">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}${renderComponent($$result, "WhatsAppButton", $$WhatsAppButton, {})}</body></html>`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/layouts/MainLayout.astro", void 0);
    $$Hero = createComponent(($$result, $$props, $$slots) => {
      const whatsappUrl = getGeneralWhatsAppUrl();
      return renderTemplate`${maybeRenderHead($$result)}<section id="inicio" class="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"><!-- Left Column: Editorial Headline & Actions --><div class="lg:col-span-6 flex flex-col justify-center space-y-6"><div class="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#76513B]"><span>Marroquinería Artesanal</span><span aria-hidden="true">·</span><span>Chile</span><span aria-hidden="true">·</span><span>100% Cuero Genuino</span></div><h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#38271F] leading-[1.12] [text-wrap:balance]">Tradición y estilo en cada pieza</h1><p class="text-base sm:text-lg text-[#38271F]/80 leading-relaxed max-w-xl">Descubre productos con carácter, detalles únicos y esencia artesanal. Confeccionamos piezas diseñadas para resistir el paso del tiempo con la nobleza del cuero auténtico.</p><!-- CTAs --><div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"><a href="#productos" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#38271F] hover:bg-[#76513B] text-[#F7F2E9] rounded-lg text-sm font-medium tracking-wide transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 group"><span>Explorar productos</span><svg class="w-4 h-4 text-[#D9C6A5] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline></svg></a><a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#76513B]/40 hover:border-[#76513B] bg-[#F7F2E9] hover:bg-[#D9C6A5]/20 text-[#38271F] rounded-lg text-sm font-medium transition-all shadow-2xs active:scale-95 whitespace-nowrap shrink-0"><svg class="w-4 h-4 text-[#76513B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span>Contactar por WhatsApp</span></a></div><!-- Trust Badges --><div class="pt-6 border-t border-[#D9C6A5]/40 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#38271F]/85"><div class="flex items-center gap-2"><svg class="w-4 h-4 text-[#76513B] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><span class="font-medium">Cuero vacuno genuino</span></div><div class="flex items-center gap-2"><svg class="w-4 h-4 text-[#76513B] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg><span class="font-medium">Terminaciones a mano</span></div><div class="flex items-center gap-2 col-span-2 sm:col-span-1"><svg class="w-4 h-4 text-[#76513B] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg><span class="font-medium">Envíos a todo Chile</span></div></div></div><!-- Right Column: Visual Showcase --><div class="lg:col-span-6 relative"><div class="relative rounded-2xl overflow-hidden border border-[#D9C6A5]/50 shadow-xl bg-[#38271F]/5 group"><img${addAttribute(hero_leather_craft_1793558229126_default.src, "src")} alt="Colección artesanal Montanares Todo Cuero" class="w-full h-auto object-cover aspect-16/10 sm:aspect-4/3 lg:aspect-5/4 group-hover:scale-[1.02] transition-transform duration-700 ease-out" referrerpolicy="no-referrer" loading="eager"><div class="absolute inset-0 bg-gradient-to-t from-[#38271F]/80 via-transparent to-transparent opacity-60"></div><div class="absolute bottom-4 left-4 right-4 text-[#F7F2E9] text-xs flex justify-between items-end backdrop-blur-xs bg-[#38271F]/40 p-3 rounded-lg border border-white/10"><div><p class="font-serif font-semibold text-sm">Colección Taller Montanares</p><p class="text-[#D9C6A5] text-[11px]">Materiales nobles, costuras resistentes y durabilidad</p></div><span class="text-[11px] text-[#D9C6A5] hidden sm:inline-block">Hecho a mano</span></div></div><div aria-hidden="true" class="absolute -bottom-6 -right-6 w-48 h-48 bg-[#D9C6A5]/25 rounded-full blur-2xl -z-10 pointer-events-none"></div></div></div></div></section>`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Hero.astro", void 0);
    createAstro("https://astro.build");
    $$ProductCard = createComponent(($$result, $$props, $$slots) => {
      const Astro = $$result.createAstro($$props, $$slots);
      Astro.self = $$ProductCard;
      const { product } = Astro.props;
      const whatsappUrl = getProductWhatsAppUrl(product.name);
      return renderTemplate`${maybeRenderHead($$result)}<article class="group flex flex-col bg-[#F7F2E9] rounded-xl border border-[#D9C6A5]/50 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"${addAttribute(product.category, "data-category")}><!-- Image slot --><div class="relative aspect-4/3 overflow-hidden bg-[#38271F]/5 cursor-pointer product-card-trigger"${addAttribute(product.id, "data-product-id")}><img${addAttribute(product.image.src, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" referrerpolicy="no-referrer" loading="lazy"><div class="absolute inset-0 bg-[#38271F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"><span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F2E9]/90 text-[#38271F] rounded-md text-xs font-medium shadow-xs backdrop-blur-xs"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg><span>Ver detalles</span></span></div><span class="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-medium tracking-wide bg-[#38271F]/80 text-[#F7F2E9] rounded backdrop-blur-xs">${product.badge}</span></div><!-- Content --><div class="p-5 flex flex-col flex-1 justify-between space-y-4"><div class="space-y-1.5"><div class="flex items-center gap-2 text-xs text-[#76513B] font-medium"><span>${product.category}</span><span aria-hidden="true">·</span><span>Artesanal</span></div><h3 class="font-serif text-lg font-bold text-[#38271F] group-hover:text-[#76513B] transition-colors cursor-pointer line-clamp-1 product-card-trigger"${addAttribute(product.id, "data-product-id")}>${product.name}</h3><p class="text-xs text-[#38271F]/80 line-clamp-2 leading-relaxed">${product.description}</p></div><!-- Actions --><div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"><a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#38271F] hover:bg-[#76513B] text-[#F7F2E9] rounded-lg text-xs font-medium transition-colors shadow-2xs whitespace-nowrap active:scale-95"${addAttribute(`Consultar disponibilidad de ${product.name} por WhatsApp`, "aria-label")}><svg class="w-3.5 h-3.5 text-[#D9C6A5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span>Consultar disponibilidad</span></a><button type="button" class="px-3 py-2.5 border border-[#D9C6A5] hover:bg-[#D9C6A5]/25 text-[#38271F] rounded-lg text-xs font-medium transition-colors product-card-trigger cursor-pointer"${addAttribute(product.id, "data-product-id")} title="Ver especificaciones y medidas">Detalles</button></div></div></article>`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/ProductCard.astro", void 0);
    $$ProductGrid = createComponent(($$result, $$props, $$slots) => {
      const CATEGORIES = [
        "Todos",
        "Billeteras & Tarjeteros",
        "Cinturones",
        "Bolsos & Morrales",
        "Accesorios & Taller"
      ];
      const customOrderUrl = getGeneralWhatsAppUrl("Hola Montanares Todo Cuero, me gustar\xEDa consultar por un trabajo personalizado o encargo especial en cuero.");
      return renderTemplate`${maybeRenderHead($$result)}<section id="productos" class="py-16 md:py-24 bg-[#F7F2E9] border-t border-[#D9C6A5]/30"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><!-- Section Header --><div class="text-center max-w-2xl mx-auto mb-10 md:mb-14"><div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#76513B] mb-2"><span>Catálogo Artesanal</span><span aria-hidden="true">·</span><span>Piezas Únicas</span></div><h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#38271F] [text-wrap:balance]">Nuestra Colección de Cuero</h2><p class="mt-3 text-sm sm:text-base text-[#38271F]/80 leading-relaxed">Cada artículo es elaborado con cueros seleccionados, corte preciso y armado minucioso. Consulta disponibilidad inmediata o encarga tu pieza a medida.</p></div><!-- Category Filter Tabs --><div class="flex flex-wrap items-center justify-center gap-2 mb-10" id="category-filters">${CATEGORIES.map((cat, index) => renderTemplate`<button type="button"${addAttribute(cat, "data-category")}${addAttribute(`filter-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${index === 0 ? "bg-[#38271F] text-[#F7F2E9] shadow-xs active" : "bg-[#D9C6A5]/30 text-[#38271F] hover:bg-[#D9C6A5]/50"}`, "class")}>${cat}</button>`)}</div><!-- Products Grid --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="product-grid">${PRODUCTS.map((product) => renderTemplate`<div class="product-item"${addAttribute(product.category, "data-category")}>${renderComponent($$result, "ProductCard", $$ProductCard, { "product": product })}</div>`)}</div><!-- Custom Order Banner --><div class="mt-14 p-6 sm:p-8 rounded-2xl bg-[#D9C6A5]/25 border border-[#D9C6A5]/60 flex flex-col md:flex-row items-center justify-between gap-6"><div class="space-y-1 text-center md:text-left"><h3 class="font-serif text-lg sm:text-xl font-bold text-[#38271F]">¿Buscas un modelo específico, grabado o medida especial?</h3><p class="text-xs sm:text-sm text-[#38271F]/80">Confeccionamos pedidos especiales en cuero vacuno y grabados personalizados. Consúltanos directamente por WhatsApp.</p></div><a${addAttribute(customOrderUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-3 bg-[#76513B] hover:bg-[#38271F] text-[#F7F2E9] rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-2xs whitespace-nowrap shrink-0 active:scale-95"><svg class="w-4 h-4 text-[#D9C6A5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span>Consultar por encargo a medida</span></a></div></div><!-- Accessible Product Details Modal --><div id="product-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 sm:p-6 bg-[#38271F]/80 backdrop-blur-xs" role="dialog" aria-modal="true"><div class="relative bg-[#F7F2E9] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D9C6A5]/50 p-6 sm:p-8"><button type="button" id="modal-close-btn" class="absolute top-4 right-4 p-2 rounded-full text-[#38271F]/70 hover:text-[#38271F] hover:bg-[#D9C6A5]/30 transition-colors" aria-label="Cerrar modal"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"><div class="rounded-xl overflow-hidden border border-[#D9C6A5]/60 bg-white"><img id="modal-image" src="" alt="" class="w-full h-full aspect-4/3 object-cover" referrerpolicy="no-referrer"></div><div class="space-y-4"><div><span id="modal-category" class="text-xs font-semibold uppercase tracking-wider text-[#76513B]"></span><h2 id="modal-title" class="font-serif text-2xl font-bold text-[#38271F] mt-1"></h2></div><p id="modal-description" class="text-sm text-[#38271F]/80 leading-relaxed"></p><div class="space-y-2 pt-2 border-t border-[#D9C6A5]/40 text-xs"><div class="text-[#38271F]"><strong>Material:</strong> <span id="modal-material"></span></div><div id="modal-dimensions-container" class="text-[#38271F]"><strong>Dimensiones:</strong> <span id="modal-dimensions"></span></div></div><div class="pt-2"><h3 class="text-xs font-semibold text-[#38271F] uppercase tracking-wider mb-2">Detalles de confección:</h3><ul id="modal-features" class="space-y-1.5 text-xs text-[#38271F]/85"></ul></div><div class="bg-[#D9C6A5]/20 p-3 rounded-lg border border-[#D9C6A5]/50 text-xs space-y-1"><p class="font-semibold text-[#38271F]">Cuidado del cuero genuino:</p><p class="text-[#38271F]/80">Evitar calor directo y exceso de agua. Aplicar bálsamo neutro periódicamente para mantener la elasticidad y pátina.</p></div><div class="pt-2"><a id="modal-whatsapp-link" href="#" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#38271F] hover:bg-[#76513B] text-[#F7F2E9] rounded-lg text-sm font-medium transition-all shadow-xs hover:shadow-md active:scale-95 whitespace-nowrap"><svg class="w-4 h-4 text-[#D9C6A5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span>Consultar disponibilidad en WhatsApp</span></a></div></div></div></div></div></section><!-- Client Script for Filtering & Modal --><script>(function(){${defineScriptVars({ products: PRODUCTS })}
  // Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.classList.remove('bg-[#38271F]', 'text-[#F7F2E9]', 'shadow-xs', 'active');
        b.classList.add('bg-[#D9C6A5]/30', 'text-[#38271F]');
      });
      btn.classList.add('bg-[#38271F]', 'text-[#F7F2E9]', 'shadow-xs', 'active');
      btn.classList.remove('bg-[#D9C6A5]/30', 'text-[#38271F]');

      const selected = btn.getAttribute('data-category');
      productItems.forEach((item) => {
        if (selected === 'Todos' || item.getAttribute('data-category') === selected) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Modal Handling
  const modal = document.getElementById('product-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-image');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalMaterial = document.getElementById('modal-material');
  const modalDim = document.getElementById('modal-dimensions');
  const modalFeatures = document.getElementById('modal-features');
  const modalWhatsApp = document.getElementById('modal-whatsapp-link');

  function openProductModal(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product || !modal) return;

    // IMPORTANTE: Usamos product.image.src
    modalImg.src = product.image.src;
    modalImg.alt = product.name;
    modalCategory.textContent = product.category;
    modalTitle.textContent = product.name;
    modalDesc.textContent = product.description;
    modalMaterial.textContent = product.material;
    modalDim.textContent = product.dimensions || 'Estándar';

    modalFeatures.innerHTML = '';
    product.features.forEach((feat) => {
      const li = document.createElement('li');
      li.className = 'flex items-center gap-2';
      li.innerHTML = \`
        <svg class="w-3.5 h-3.5 text-[#76513B] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>\${feat}</span>
      \`;
      modalFeatures.appendChild(li);
    });

    const msg = \`Hola Montanares Todo Cuero, me gustaría consultar por la disponibilidad de: \${product.name}. ¿Me podrían dar más detalles sobre disponibilidad y envíos?\`;
    modalWhatsApp.href = \`https://wa.me/56927047529?text=\${encodeURIComponent(msg)}\`;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = 'unset';
  }

  document.querySelectorAll('.product-card-trigger').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-product-id');
      if (id) openProductModal(id);
    });
  });

  closeBtn?.addEventListener('click', closeProductModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeProductModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
  });
})();<\/script>`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/ProductGrid.astro", void 0);
    $$About = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${maybeRenderHead($$result)}<section id="nosotros" class="py-16 md:py-24 bg-[#38271F] text-[#F7F2E9] relative overflow-hidden"><div aria-hidden="true" class="absolute top-0 right-0 w-96 h-96 bg-[#76513B]/20 rounded-full blur-3xl pointer-events-none"></div><div aria-hidden="true" class="absolute bottom-0 left-0 w-96 h-96 bg-[#A6533C]/10 rounded-full blur-3xl pointer-events-none"></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"><!-- Visual Focus --><div class="lg:col-span-5 order-2 lg:order-1"><div class="relative rounded-2xl overflow-hidden border border-[#D9C6A5]/30 shadow-2xl bg-black/20 group"><img${addAttribute(gallery_leather_stitch_detail_1793558232652_default.src, "src")} alt="Detalle de costura a mano en cuero auténtico Montanares Todo Cuero" class="w-full h-full aspect-4/3 sm:aspect-5/4 object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerpolicy="no-referrer" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-[#38271F]/80 via-transparent to-transparent"></div><div class="absolute bottom-4 left-4 right-4 bg-[#38271F]/70 backdrop-blur-xs p-3.5 rounded-xl border border-[#D9C6A5]/20"><p class="font-serif text-sm font-semibold text-[#D9C6A5]">Puntada por puntada</p><p class="text-xs text-[#F7F2E9]/80 mt-0.5">Costuras resistentes confeccionadas con hilo encerado y técnicas tradicionales que garantizan máxima durabilidad.</p></div></div></div><!-- Text Content --><div class="lg:col-span-7 order-1 lg:order-2 space-y-6"><div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9C6A5]"><span>Tradición & Taller</span><span aria-hidden="true">·</span><span>Nuestra Historia</span></div><h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F2E9] leading-tight [text-wrap:balance]">El valor de lo hecho con dedicación</h2><p class="text-base sm:text-lg text-[#F7F2E9]/90 leading-relaxed">En Montanares Todo Cuero valoramos los detalles, los materiales nobles y la belleza de los productos que perduran en el tiempo. Descubre nuestra colección y encuentra esa pieza especial que combina estilo, funcionalidad y personalidad.</p><p class="text-sm sm:text-base text-[#F7F2E9]/75 leading-relaxed">Cada creación nace de la pasión por la talabartería y la marroquinería tradicional. No fabricamos en masa: seleccionamos cuidadosamente el grano del cuero, respetamos sus vetas naturales y aplicamos acabados artesanales que enriquecen su carácter con el uso cotidiano.</p><!-- Values Grid --><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D9C6A5]/20"><div class="space-y-1"><div class="flex items-center gap-2 text-[#D9C6A5] font-semibold text-sm"><svg class="w-4 h-4 text-[#D9C6A5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><h4>Materiales Nobles</h4></div><p class="text-xs text-[#F7F2E9]/70">Cuero genuino vacuno que envejece con gracia, ganando pátina y suavidad con los años.</p></div><div class="space-y-1"><div class="flex items-center gap-2 text-[#D9C6A5] font-semibold text-sm"><svg class="w-4 h-4 text-[#D9C6A5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path><path d="M17.64 15 22 10.64"></path><path d="m20.91 3.26-2.17-2.17a2.12 2.12 0 0 0-3 0L13.5 3.33l5.17 5.17 2.24-2.24c.83-.83.83-2.17 0-3Z"></path></svg><h4>Trabajo Manual</h4></div><p class="text-xs text-[#F7F2E9]/70">Corte, biselado de cantos, bruñido y costuras elaboradas con el esmero de un artesano.</p></div><div class="space-y-1"><div class="flex items-center gap-2 text-[#D9C6A5] font-semibold text-sm"><svg class="w-4 h-4 text-[#D9C6A5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><h4>Durabilidad Real</h4></div><p class="text-xs text-[#F7F2E9]/70">Herrajes sólidos y uniones concebidas para acompañarte durante décadas.</p></div><div class="space-y-1"><div class="flex items-center gap-2 text-[#D9C6A5] font-semibold text-sm"><svg class="w-4 h-4 text-[#D9C6A5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg><h4>Envíos a Todo Chile</h4></div><p class="text-xs text-[#F7F2E9]/70">Coordinación personalizada por WhatsApp y envíos seguros a cualquier región.</p></div></div></div></div></div></section>`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/About.astro", void 0);
    $$Gallery = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${maybeRenderHead($$result)}<section id="galeria" class="py-16 md:py-24 bg-[#F7F2E9]"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><!-- Header --><div class="text-center max-w-2xl mx-auto mb-12"><div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#76513B] mb-2"><span>Texturas & Detalles</span><span aria-hidden="true">·</span><span>Galería Fotográfica</span></div><h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#38271F] [text-wrap:balance]">El Arte en los Detalles</h2><p class="mt-3 text-sm sm:text-base text-[#38271F]/80 leading-relaxed">Haz clic en cualquier imagen para ampliarla y apreciar las texturas, el grano natural, la precisión de las costuras y los herrajes.</p></div><!-- Masonry Grid --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">${GALLERY_ITEMS.map((item, index) => renderTemplate`<div${addAttribute(index, "data-index")} class="gallery-trigger group relative rounded-xl overflow-hidden border border-[#D9C6A5]/50 bg-[#38271F]/5 cursor-pointer shadow-2xs hover:shadow-lg transition-all duration-300"><img${addAttribute(item.image.src, "src")}${addAttribute(item.title, "alt")} class="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500 ease-out" referrerpolicy="no-referrer" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-[#38271F]/90 via-[#38271F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5"><div class="flex items-center justify-between"><div><h3 class="font-serif text-base font-bold text-[#F7F2E9]">${item.title}</h3><p class="text-xs text-[#D9C6A5]">${item.subtitle}</p></div><div class="w-8 h-8 rounded-full bg-[#F7F2E9]/20 backdrop-blur-xs flex items-center justify-center text-[#F7F2E9]"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg></div></div></div></div>`)}</div></div><!-- Lightbox Modal --><div id="gallery-lightbox" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Visualizador de fotos de galería"><button type="button" id="lightbox-close" class="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 text-[#F7F2E9] hover:bg-black/80 transition-colors cursor-pointer" aria-label="Cerrar visor"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><button type="button" id="lightbox-prev" class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-[#F7F2E9] hover:bg-black/80 transition-colors hidden sm:flex items-center justify-center cursor-pointer" aria-label="Imagen anterior"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button><button type="button" id="lightbox-next" class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-[#F7F2E9] hover:bg-black/80 transition-colors hidden sm:flex items-center justify-center cursor-pointer" aria-label="Siguiente imagen"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button><div class="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center" id="lightbox-content"><img id="lightbox-img" src="" alt="" class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10" referrerpolicy="no-referrer"><div class="mt-4 text-center text-[#F7F2E9] space-y-1"><h3 id="lightbox-title" class="font-serif text-lg font-bold"></h3><p id="lightbox-subtitle" class="text-xs text-[#D9C6A5]"></p><p id="lightbox-counter" class="text-[11px] text-[#F7F2E9]/60"></p></div></div></div></section><script>(function(){${defineScriptVars({ items: GALLERY_ITEMS })}
  let currentIndex = null;
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSubtitle = document.getElementById('lightbox-subtitle');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  function showImage(index) {
    if (index === null || index < 0 || index >= items.length) return;
    currentIndex = index;
    const item = items[index];
    
    // IMPORTANTE: Usamos item.image.src para el lightbox
    lightboxImg.src = item.image.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxSubtitle.textContent = item.subtitle;
    lightboxCounter.textContent = \`\${index + 1} de \${items.length}\`;

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    currentIndex = null;
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'unset';
  }

  function next() {
    if (currentIndex !== null) {
      showImage((currentIndex + 1) % items.length);
    }
  }

  function prev() {
    if (currentIndex !== null) {
      showImage((currentIndex - 1 + items.length) % items.length);
    }
  }

  document.querySelectorAll('.gallery-trigger').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-index') || '0', 10);
      showImage(idx);
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); next(); });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (currentIndex === null) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();<\/script>`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Gallery.astro", void 0);
    $$Testimonials = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${maybeRenderHead($$result)}<section id="testimonios" class="py-16 md:py-24 bg-[#D9C6A5]/20 border-t border-[#D9C6A5]/40"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center max-w-2xl mx-auto mb-12"><div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#76513B] mb-2"><span>Experiencias Reales</span><span aria-hidden="true">·</span><span>Clientes Satisfechos</span></div><h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#38271F] [text-wrap:balance]">La Calidad que Acompaña</h2><p class="mt-3 text-sm sm:text-base text-[#38271F]/80 leading-relaxed">Opiniones de quienes ya disfrutan de nuestras piezas de cuero en su día a día.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">${TESTIMONIALS.map((t2) => renderTemplate`<div class="bg-[#F7F2E9] p-6 sm:p-7 rounded-xl border border-[#D9C6A5]/60 shadow-xs flex flex-col justify-between space-y-4"><div class="space-y-3"><svg class="w-6 h-6 text-[#76513B]/40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg><p class="text-sm text-[#38271F]/90 leading-relaxed italic">"${t2.text}"</p></div><div class="pt-4 border-t border-[#D9C6A5]/40"><h3 class="font-serif font-bold text-sm text-[#38271F]">${t2.name}</h3><div class="flex items-center gap-2 text-xs text-[#76513B] mt-0.5"><span>${t2.location}</span><span aria-hidden="true">·</span><span>${t2.productConsulted}</span></div></div></div>`)}</div></div></section>`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Testimonials.astro", void 0);
    $$Contact = createComponent(($$result, $$props, $$slots) => {
      const generalWhatsAppUrl = getGeneralWhatsAppUrl();
      return renderTemplate`${maybeRenderHead($$result)}<section id="contacto" class="py-16 md:py-24 bg-[#F7F2E9] border-t border-[#D9C6A5]/40"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-12 gap-12"><!-- Official Contact Info --><div class="lg:col-span-5 space-y-8"><div class="space-y-3"><div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#76513B]"><span>Atención Personalizada</span><span aria-hidden="true">·</span><span>Canales Oficiales</span></div><h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#38271F] [text-wrap:balance]">¿Te gustó algún producto?</h2><p class="text-base text-[#38271F]/80 leading-relaxed">Escríbenos y consulta por nuestros productos, disponibilidad y pedidos. ¡Será un gusto atenderte!</p></div><div class="space-y-4"><!-- WhatsApp Card --><a${addAttribute(generalWhatsAppUrl, "href")} target="_blank" rel="noopener noreferrer" class="group flex items-start gap-4 p-5 rounded-xl bg-white border border-[#D9C6A5]/60 hover:border-[#76513B] shadow-2xs hover:shadow-md transition-all"><div class="w-12 h-12 rounded-lg bg-[#38271F] group-hover:bg-[#76513B] text-[#D9C6A5] flex items-center justify-center shrink-0 transition-colors"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg></div><div class="space-y-1"><span class="text-xs font-medium text-[#76513B] uppercase tracking-wide">Canal Principal WhatsApp</span><h3 class="font-serif text-lg font-bold text-[#38271F] group-hover:text-[#76513B] transition-colors">${WHATSAPP_DISPLAY}</h3><p class="text-xs text-[#38271F]/70">Atención rápida, fotos adicionales y coordinación de pedidos.</p></div></a><!-- Facebook Card --><a${addAttribute(FACEBOOK_URL, "href")} target="_blank" rel="noopener noreferrer" class="group flex items-start gap-4 p-5 rounded-xl bg-white border border-[#D9C6A5]/60 hover:border-[#76513B] shadow-2xs hover:shadow-md transition-all"><div class="w-12 h-12 rounded-lg bg-[#38271F] group-hover:bg-[#76513B] text-[#D9C6A5] flex items-center justify-center shrink-0 transition-colors"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></div><div class="space-y-1"><span class="text-xs font-medium text-[#76513B] uppercase tracking-wide">Página Oficial en Facebook</span><h3 class="font-serif text-lg font-bold text-[#38271F] group-hover:text-[#76513B] transition-colors">Montanares Todo Cuero</h3><p class="text-xs text-[#38271F]/70">Sigue nuestras publicaciones, novedades y nuevos trabajos de taller.</p></div></a><!-- Shipping Card --><div class="flex items-start gap-4 p-5 rounded-xl bg-[#D9C6A5]/20 border border-[#D9C6A5]/50"><div class="w-12 h-12 rounded-lg bg-[#76513B]/20 text-[#38271F] flex items-center justify-center shrink-0"><svg class="w-6 h-6 text-[#76513B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg></div><div class="space-y-1"><h3 class="font-serif text-base font-bold text-[#38271F]">Despachos a Regiones</h3><p class="text-xs text-[#38271F]/80 leading-relaxed">Realizamos envíos coordinados a lo largo de todo Chile. Embalaje protegido para asegurar que tus artículos de cuero lleguen en perfectas condiciones.</p></div></div></div></div><!-- Quick Consultation Form --><div class="lg:col-span-7"><div class="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9C6A5]/60 shadow-md space-y-6"><div class="space-y-1"><h3 class="font-serif text-xl sm:text-2xl font-bold text-[#38271F]">Consulta rápida y directa</h3><p class="text-xs sm:text-sm text-[#38271F]/75">Completa estos datos para abrir WhatsApp con tu consulta armada y lista para enviar.</p></div><form id="contact-form" class="space-y-4"><div><label for="contact-name" class="block text-xs font-medium text-[#38271F] mb-1">Tu nombre (opcional):</label><input id="contact-name" type="text" placeholder="Ej. Juan Pérez" class="w-full px-3.5 py-2.5 rounded-lg border border-[#D9C6A5] bg-[#F7F2E9]/40 text-sm text-[#38271F] placeholder-[#38271F]/40 focus:outline-hidden focus:ring-2 focus:ring-[#76513B]"></div><div><label for="contact-product" class="block text-xs font-medium text-[#38271F] mb-1">Producto de interés:</label><select id="contact-product" class="w-full px-3.5 py-2.5 rounded-lg border border-[#D9C6A5] bg-[#F7F2E9]/40 text-sm text-[#38271F] focus:outline-hidden focus:ring-2 focus:ring-[#76513B]"><option value="">-- Consulta general de catálogo --</option>${PRODUCTS.map((prod) => renderTemplate`<option${addAttribute(prod.name, "value")}>${prod.name} (${prod.category})</option>`)}<option value="Trabajo personalizado / Medida especial">Trabajo personalizado / Medida especial</option></select></div><div><label for="contact-query" class="block text-xs font-medium text-[#38271F] mb-1">Mensaje o duda:</label><textarea id="contact-query" rows="3" placeholder="Escribe aquí tu consulta, color de cuero preferido, medidas o ciudad de despacho..." class="w-full px-3.5 py-2.5 rounded-lg border border-[#D9C6A5] bg-[#F7F2E9]/40 text-sm text-[#38271F] placeholder-[#38271F]/40 focus:outline-hidden focus:ring-2 focus:ring-[#76513B]"></textarea></div><button type="submit" class="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#38271F] hover:bg-[#76513B] text-[#F7F2E9] rounded-lg text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md active:scale-98 cursor-pointer"><svg class="w-5 h-5 text-[#D9C6A5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span>Hablar por WhatsApp (+56 9 2704 7529)</span></button><p class="text-[11px] text-center text-[#38271F]/60">Se abrirá tu aplicación de WhatsApp con el mensaje listo para enviar.</p></form></div></div></div></div></section>${renderScript($$result, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Contact.astro?astro&type=script&index=0&lang.ts")}`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Contact.astro", void 0);
    pages_exports = /* @__PURE__ */ __exportAll({
      default: /* @__PURE__ */ __name(() => $$Index, "default"),
      file: /* @__PURE__ */ __name(() => $$file, "file"),
      url: /* @__PURE__ */ __name(() => "", "url")
    });
    $$Index = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Montanares Todo Cuero | Productos y art\xEDculos de cuero" }, { "default": /* @__PURE__ */ __name(($$result2) => renderTemplate`${renderComponent($$result2, "Hero", $$Hero, {})}${renderComponent($$result2, "ProductGrid", $$ProductGrid, {})}${renderComponent($$result2, "About", $$About, {})}${renderComponent($$result2, "Gallery", $$Gallery, {})}${renderComponent($$result2, "Testimonials", $$Testimonials, {})}${renderComponent($$result2, "Contact", $$Contact, {})}`, "default") })}`;
    }, "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/pages/index.astro", void 0);
    $$file = "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/pages/index.astro";
    page2 = /* @__PURE__ */ __name(() => pages_exports, "page");
  }
});

// server/chunks/noop-entrypoint_Cx5UkKLo.mjs
var noop_entrypoint_Cx5UkKLo_exports = {};
__export(noop_entrypoint_Cx5UkKLo_exports, {
  server: () => server
});
var server;
var init_noop_entrypoint_Cx5UkKLo = __esm({
  "server/chunks/noop-entrypoint_Cx5UkKLo.mjs"() {
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    server = {};
  }
});

// server/virtual_astro_middleware.mjs
var virtual_astro_middleware_exports = {};
__export(virtual_astro_middleware_exports, {
  onRequest: () => onRequest
});
var onRequest;
var init_virtual_astro_middleware = __esm({
  "server/virtual_astro_middleware.mjs"() {
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    onRequest = /* @__PURE__ */ __name((_, next) => next(), "onRequest");
  }
});

// server/chunks/_virtual_astro_session-driver_BIKa71yg.mjs
var virtual_astro_session_driver_BIKa71yg_exports = {};
__export(virtual_astro_session_driver_BIKa71yg_exports, {
  default: () => _virtual_astro_session_driver_default
});
function defineDriver(factory) {
  return factory;
}
function normalizeKey(key, sep = ":") {
  if (!key) return "";
  return key.replace(/[:/\\]/g, sep).replace(/^[:/\\]|[:/\\]$/g, "");
}
function joinKeys(...keys) {
  return keys.map((key) => normalizeKey(key)).filter(Boolean).join(":");
}
function createError2(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) Error.captureStackTrace(err, createError2);
  return err;
}
function getBinding(binding) {
  let bindingName = "[binding]";
  if (typeof binding === "string") {
    bindingName = binding;
    binding = globalThis[bindingName] || globalThis.__env__?.[bindingName];
  }
  if (!binding) throw createError2("cloudflare", `Invalid binding \`${bindingName}\`: \`${binding}\``);
  for (const key of [
    "get",
    "put",
    "delete"
  ]) if (!(key in binding)) throw createError2("cloudflare", `Invalid binding \`${bindingName}\`: \`${key}\` key is missing`);
  return binding;
}
function getKVBinding(binding = "STORAGE") {
  return getBinding(binding);
}
var DRIVER_NAME, _virtual_astro_session_driver_default;
var init_virtual_astro_session_driver_BIKa71yg = __esm({
  "server/chunks/_virtual_astro_session-driver_BIKa71yg.mjs"() {
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __name(defineDriver, "defineDriver");
    __name(normalizeKey, "normalizeKey");
    __name(joinKeys, "joinKeys");
    __name(createError2, "createError");
    __name(getBinding, "getBinding");
    __name(getKVBinding, "getKVBinding");
    DRIVER_NAME = "cloudflare-kv-binding";
    _virtual_astro_session_driver_default = defineDriver((opts) => {
      const r2 = /* @__PURE__ */ __name((key = "") => opts.base ? joinKeys(opts.base, key) : key, "r");
      async function getKeys(base = "") {
        const prefix = joinKeys(opts.base || "", base);
        const binding = getKVBinding(opts.binding);
        const keys = [];
        let cursor = void 0;
        do {
          const kvList = await binding.list({
            prefix: prefix ? `${prefix}:` : void 0,
            cursor
          });
          keys.push(...kvList.keys);
          cursor = kvList.list_complete ? void 0 : kvList.cursor;
        } while (cursor);
        return keys.map((key) => key.name);
      }
      __name(getKeys, "getKeys");
      return {
        name: DRIVER_NAME,
        options: opts,
        getInstance: /* @__PURE__ */ __name(() => getKVBinding(opts.binding), "getInstance"),
        async hasItem(key) {
          key = r2(key);
          return await getKVBinding(opts.binding).get(key) !== null;
        },
        getItem(key) {
          key = r2(key);
          return getKVBinding(opts.binding).get(key);
        },
        setItem(key, value, topts) {
          key = r2(key);
          return getKVBinding(opts.binding).put(key, value, topts ? {
            expirationTtl: topts?.ttl ? Math.max(topts.ttl, opts.minTTL ?? 60) : void 0,
            ...topts
          } : void 0);
        },
        removeItem(key) {
          key = r2(key);
          return getKVBinding(opts.binding).delete(key);
        },
        getKeys(base) {
          return getKeys(base).then((keys) => keys.map((key) => opts.base ? key.slice(opts.base.length) : key));
        },
        async clear(base) {
          const binding = getKVBinding(opts.binding);
          const keys = await getKeys(base);
          await Promise.all(keys.map((key) => binding.delete(key)));
        }
      };
    });
  }
});

// server/chunks/_virtual_astro_server-island-manifest_CddHi3Kr.mjs
var virtual_astro_server_island_manifest_CddHi3Kr_exports = {};
__export(virtual_astro_server_island_manifest_CddHi3Kr_exports, {
  serverIslandMap: () => serverIslandMap,
  serverIslandNameMap: () => serverIslandNameMap
});
var serverIslandMap, serverIslandNameMap;
var init_virtual_astro_server_island_manifest_CddHi3Kr = __esm({
  "server/chunks/_virtual_astro_server-island-manifest_CddHi3Kr.mjs"() {
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    serverIslandMap = /* @__PURE__ */ new Map([]);
    serverIslandNameMap = /* @__PURE__ */ new Map([]);
  }
});

// server/entry.mjs
init_compiler_8THfIuk0();
init_astro_assets_B_bvnz1D();
init_scope_CTVc8alC();
import "cloudflare:workers";
globalThis.process ??= {};
globalThis.process.env ??= {};
var sessionKVBindingName = "SESSION";
var NOOP_MIDDLEWARE_FN = /* @__PURE__ */ __name(async (_ctx, next) => {
  return await next();
}, "NOOP_MIDDLEWARE_FN");
function deserializeManifest(serializedManifest, routesList) {
  const routes = [];
  if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) routes.push({
    ...serializedRoute,
    routeData: deserializeRouteData(serializedRoute.routeData)
  });
  if (routesList) for (const route of routesList?.routes) routes.push({
    file: "",
    links: [],
    scripts: [],
    styles: [],
    routeData: route
  });
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const key = decodeKey(serializedManifest.key);
  return {
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    rootDir: new URL(serializedManifest.rootDir),
    srcDir: new URL(serializedManifest.srcDir),
    publicDir: new URL(serializedManifest.publicDir),
    outDir: new URL(serializedManifest.outDir),
    cacheDir: new URL(serializedManifest.cacheDir),
    buildClientDir: new URL(serializedManifest.buildClientDir),
    buildServerDir: new URL(serializedManifest.buildServerDir),
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    key
  };
}
__name(deserializeManifest, "deserializeManifest");
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin,
    distURL: rawRouteData.distURL
  };
}
__name(deserializeRouteData, "deserializeRouteData");
function deserializeRouteInfo(rawRouteInfo) {
  return {
    styles: rawRouteInfo.styles,
    file: rawRouteInfo.file,
    links: rawRouteInfo.links,
    scripts: rawRouteInfo.scripts,
    routeData: deserializeRouteData(rawRouteInfo.routeData)
  };
}
__name(deserializeRouteInfo, "deserializeRouteInfo");
var renderers = [];
[
  {
    "file": "",
    "links": [],
    "scripts": [],
    "styles": [],
    "routeData": {
      "type": "page",
      "component": "_server-islands.astro",
      "params": ["name"],
      "segments": [[{
        "content": "_server-islands",
        "dynamic": false,
        "spread": false
      }], [{
        "content": "name",
        "dynamic": true,
        "spread": false
      }]],
      "pattern": "^\\/_server-islands\\/([^/]+?)\\/?$",
      "prerender": false,
      "isIndex": false,
      "fallbackRoutes": [],
      "route": "/_server-islands/[name]",
      "origin": "internal",
      "distURL": [],
      "_meta": { "trailingSlash": "ignore" }
    }
  },
  {
    "file": "",
    "links": [],
    "scripts": [],
    "styles": [],
    "routeData": {
      "route": "/_image",
      "component": "node_modules/@astrojs/cloudflare/dist/entrypoints/image-passthrough-endpoint.js",
      "params": [],
      "pathname": "/_image",
      "pattern": "^\\/_image\\/?$",
      "segments": [[{
        "content": "_image",
        "dynamic": false,
        "spread": false
      }]],
      "type": "endpoint",
      "prerender": false,
      "fallbackRoutes": [],
      "distURL": [],
      "isIndex": false,
      "origin": "internal",
      "_meta": { "trailingSlash": "ignore" }
    }
  },
  {
    "file": "",
    "links": [],
    "scripts": [],
    "styles": [],
    "routeData": {
      "route": "/",
      "isIndex": true,
      "type": "page",
      "pattern": "^\\/$",
      "segments": [],
      "params": [],
      "component": "src/pages/index.astro",
      "pathname": "/",
      "prerender": false,
      "fallbackRoutes": [],
      "distURL": [],
      "origin": "project",
      "_meta": { "trailingSlash": "ignore" }
    }
  }
].map(deserializeRouteInfo);
var _page0 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_image_passthrough_endpoint_x6nVUZWz(), image_passthrough_endpoint_x6nVUZWz_exports)), "_page0");
var _page1 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_index_DQmiYbIR(), index_DQmiYbIR_exports)), "_page1");
var pageMap = /* @__PURE__ */ new Map([["node_modules/@astrojs/cloudflare/dist/entrypoints/image-passthrough-endpoint.js", _page0], ["src/pages/index.astro", _page1]]);
var _manifest = deserializeManifest({ "rootDir": "file:///C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/", "cacheDir": "file:///C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/node_modules/.astro/", "outDir": "file:///C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/dist/", "srcDir": "file:///C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/", "publicDir": "file:///C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/public/", "buildClientDir": "file:///C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/dist/client/", "buildServerDir": "file:///C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/dist/server/", "adapterName": "@astrojs/cloudflare", "assetsDir": "_astro", "routes": [{ "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "type": "page", "component": "_server-islands.astro", "params": ["name"], "segments": [[{ "content": "_server-islands", "dynamic": false, "spread": false }], [{ "content": "name", "dynamic": true, "spread": false }]], "pattern": "^\\/_server-islands\\/([^/]+?)\\/?$", "prerender": false, "isIndex": false, "fallbackRoutes": [], "route": "/_server-islands/[name]", "origin": "internal", "distURL": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/_image", "component": "node_modules/@astrojs/cloudflare/dist/entrypoints/image-passthrough-endpoint.js", "params": [], "pathname": "/_image", "pattern": "^\\/_image\\/?$", "segments": [[{ "content": "_image", "dynamic": false, "spread": false }]], "type": "endpoint", "prerender": false, "fallbackRoutes": [], "distURL": [], "isIndex": false, "origin": "internal", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [{ "type": "external", "src": "_astro/index.BXBQCwSM.css" }], "routeData": { "route": "/", "isIndex": true, "type": "page", "pattern": "^\\/$", "segments": [], "params": [], "component": "src/pages/index.astro", "pathname": "/", "prerender": false, "fallbackRoutes": [], "distURL": [], "origin": "project", "_meta": { "trailingSlash": "ignore" } } }], "serverLike": true, "middlewareMode": "classic", "base": "/", "trailingSlash": "ignore", "compressHTML": "jsx", "componentMetadata": [["C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/pages/index.astro", { "propagation": "none", "containsHead": true }]], "renderers": [], "clientDirectives": [["idle", "(function(){let e=(e,t)=>{let n=async()=>{await(await e())()},r=typeof t.value==`object`?t.value:void 0,i={timeout:r==null?void 0:r.timeout};`requestIdleCallback`in window?window.requestIdleCallback(n,i):setTimeout(n,i.timeout||200)};(self.Astro||(self.Astro={})).idle=e,window.dispatchEvent(new Event(`astro:idle`))})();"], ["load", "(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).load=e,window.dispatchEvent(new Event(`astro:load`))})();"], ["media", "(function(){let e=(e,t)=>{let n=async()=>{await(await e())()};if(t.value){let e=matchMedia(t.value);e.matches?n():e.addEventListener(`change`,n,{once:!0})}};(self.Astro||(self.Astro={})).media=e,window.dispatchEvent(new Event(`astro:media`))})();"], ["only", "(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).only=e,window.dispatchEvent(new Event(`astro:only`))})();"], ["visible", "(function(){let e=(e,t,n)=>{let r=async()=>{await(await e())()},i=typeof t.value==`object`?t.value:void 0,a={rootMargin:i==null?void 0:i.rootMargin},o=new IntersectionObserver(e=>{for(let t of e)if(t.isIntersecting){o.disconnect(),r();break}},a);for(let e of n.children)o.observe(e)};(self.Astro||(self.Astro={})).visible=e,window.dispatchEvent(new Event(`astro:visible`))})();"]], "entryModules": { "virtual:cloudflare/worker-entry": "entry.mjs", "\0noop-middleware": "virtual_astro_middleware.mjs", "\0virtual:astro:server-island-manifest": "chunks/_virtual_astro_server-island-manifest_CddHi3Kr.mjs", "\0virtual:astro:session-driver": "chunks/_virtual_astro_session-driver_BIKa71yg.mjs", "\0virtual:astro:actions/noop-entrypoint": "chunks/noop-entrypoint_Cx5UkKLo.mjs", "\0virtual:astro:page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-passthrough-endpoint@_@js": "chunks/image-passthrough-endpoint_x6nVUZWz.mjs", "\0virtual:astro:page:src/pages/index@_@astro": "chunks/index_DQmiYbIR.mjs", "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Contact.astro?astro&type=script&index=0&lang.ts": "_astro/Contact.astro_astro_type_script_index_0_lang.CUxYMTua.js", "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Header.astro?astro&type=script&index=0&lang.ts": "_astro/Header.astro_astro_type_script_index_0_lang.CNf2q-DB.js", "C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/WhatsAppButton.astro?astro&type=script&index=0&lang.ts": "_astro/WhatsAppButton.astro_astro_type_script_index_0_lang.DrL65GsA.js", "astro:scripts/before-hydration.js": "" }, "inlinedScripts": [["C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Contact.astro?astro&type=script&index=0&lang.ts", "var e=document.getElementById(`contact-form`),t=document.getElementById(`contact-name`),n=document.getElementById(`contact-product`),r=document.getElementById(`contact-query`);e?.addEventListener(`submit`,e=>{e.preventDefault();let i=`Hola Montanares Todo Cuero`,a=t?.value?.trim(),o=n?.value?.trim(),s=r?.value?.trim();a&&(i+=`, mi nombre es ${a}`),o&&(i+=`. Me gustar\xEDa consultar disponibilidad del producto: ${o}`),s?i+=`. ${s}`:o||(i+=`. Me gustar\xEDa consultar por sus productos y opciones de env\xEDo.`);let c=`https://wa.me/56927047529?text=${encodeURIComponent(i)}`;window.open(c,`_blank`,`noopener,noreferrer`)});"], ["C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/Header.astro?astro&type=script&index=0&lang.ts", "var e=document.getElementById(`mobile-menu-toggle`),t=document.getElementById(`mobile-menu`),n=document.getElementById(`menu-icon-bars`),r=document.getElementById(`menu-icon-close`),i=document.querySelectorAll(`.mobile-nav-link`);function a(){t&&(t.classList.contains(`hidden`)?(t.classList.remove(`hidden`),n?.classList.add(`hidden`),r?.classList.remove(`hidden`)):(t.classList.add(`hidden`),n?.classList.remove(`hidden`),r?.classList.add(`hidden`)))}e?.addEventListener(`click`,a),i.forEach(e=>e.addEventListener(`click`,()=>{t?.classList.add(`hidden`),n?.classList.remove(`hidden`),r?.classList.add(`hidden`)}));"], ["C:/Users/zldxbrsss/Desktop/Montanares-Todo-Cuero/src/components/WhatsAppButton.astro?astro&type=script&index=0&lang.ts", "var e=document.getElementById(`whatsapp-tooltip`);document.getElementById(`whatsapp-tooltip-close`)?.addEventListener(`click`,()=>{e?.classList.add(`hidden`)});"]], "assets": ["/_astro/gallery_leather_stitch_detail_1793558232652.CNtKIXSz.jpg", "/_astro/hero_leather_craft_1793558229126.s4vZZVRO.jpg", "/_astro/index.BXBQCwSM.css", "/_astro/product_leather_apron_1793558232510.B9U0N4Ke.jpg", "/_astro/product_leather_bag_1793558230519.dPwUN4TW.jpg", "/_astro/product_leather_belt_1793558230384.BdG4w1r6.jpg", "/_astro/product_leather_cardholder_1793558231155.BESY8S7R.jpg", "/_astro/product_leather_wallet_1793558228894.Y5NOegok.jpg", "/robots.txt", "/sitemap.xml"], "buildFormat": "directory", "checkOrigin": true, "actionBodySizeLimit": 1048576, "serverIslandBodySizeLimit": 1048576, "allowedDomains": [], "key": "t06jPFnDxzh1De/OdF8e3WCp3CtXhQQcqEWCuBHoH20=", "sessionConfig": { "driver": "unstorage/drivers/cloudflare-kv-binding", "options": { "binding": "SESSION" } }, "image": {}, "devToolbar": { "enabled": false, "debugInfoOutput": "" }, "logLevel": "info", "shouldInjectCspMetaTags": false });
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
  renderers,
  actions: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_noop_entrypoint_Cx5UkKLo(), noop_entrypoint_Cx5UkKLo_exports)), "actions"),
  middleware: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_virtual_astro_middleware(), virtual_astro_middleware_exports)), "middleware"),
  sessionDriver: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_virtual_astro_session_driver_BIKa71yg(), virtual_astro_session_driver_BIKa71yg_exports)), "sessionDriver"),
  serverIslandMappings: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_virtual_astro_server_island_manifest_CddHi3Kr(), virtual_astro_server_island_manifest_CddHi3Kr_exports)), "serverIslandMappings"),
  routes: manifestRoutes,
  pageMap
});
function getAmbientManifest() {
  const manifest$1 = manifest;
  if (!manifest$1) throw new AstroError(NoManifestAvailable);
  return manifest$1;
}
__name(getAmbientManifest, "getAmbientManifest");
var renderOptionsSymbol = /* @__PURE__ */ Symbol.for("astro.renderOptions");
function getRenderOptions(request) {
  return Reflect.get(request, renderOptionsSymbol);
}
__name(getRenderOptions, "getRenderOptions");
function setRenderOptions(request, options) {
  Reflect.set(request, renderOptionsSymbol, options);
}
__name(setRenderOptions, "setRenderOptions");
function defineMiddleware(fn) {
  return fn;
}
__name(defineMiddleware, "defineMiddleware");
var FORM_CONTENT_TYPES = [
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
];
var SAFE_METHODS = [
  "GET",
  "HEAD",
  "OPTIONS"
];
function isForbiddenCrossOriginRequest(request, url, isPrerendered) {
  if (isPrerendered) return false;
  if (SAFE_METHODS.includes(request.method)) return false;
  const contentType = request.headers.get("content-type");
  if (contentType && !hasFormLikeHeader(contentType)) return false;
  switch (request.headers.get("sec-fetch-site")) {
    case "":
    case null:
      break;
    case "same-origin":
    case "none":
      return false;
    default:
      return true;
  }
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return origin !== url.origin;
}
__name(isForbiddenCrossOriginRequest, "isForbiddenCrossOriginRequest");
function createCrossOriginForbiddenResponse(request) {
  return new Response(`Cross-site ${request.method} form submissions are forbidden`, { status: 403 });
}
__name(createCrossOriginForbiddenResponse, "createCrossOriginForbiddenResponse");
function createOriginCheckMiddleware() {
  return defineMiddleware((context, next) => {
    const { request, url, isPrerendered } = context;
    if (isForbiddenCrossOriginRequest(request, url, isPrerendered)) return createCrossOriginForbiddenResponse(request);
    return next();
  });
}
__name(createOriginCheckMiddleware, "createOriginCheckMiddleware");
function hasFormLikeHeader(contentType) {
  if (contentType) {
    for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) return true;
  }
  return false;
}
__name(hasFormLikeHeader, "hasFormLikeHeader");
var FetchFeatures = {
  redirects: 1,
  sessions: 2,
  actions: 4,
  middleware: 8,
  i18n: 16,
  cache: 32
};
var ALL_FETCH_FEATURES = FetchFeatures.redirects | FetchFeatures.sessions | FetchFeatures.actions | FetchFeatures.middleware | FetchFeatures.i18n | FetchFeatures.cache;
var usedFeatures = /* @__PURE__ */ new WeakMap();
function markFeatureUsed(manifest2, feature) {
  const entry = usedFeatures.get(manifest2);
  if (entry) entry.bits |= feature;
  else usedFeatures.set(manifest2, { bits: feature });
}
__name(markFeatureUsed, "markFeatureUsed");
function getUsedFeatures(manifest2) {
  return usedFeatures.get(manifest2)?.bits ?? 0;
}
__name(getUsedFeatures, "getUsedFeatures");
function rejectInvalidEncoding(state) {
  if (state.invalidEncoding) return new Response(null, {
    status: 400,
    statusText: "Bad Request"
  });
}
__name(rejectInvalidEncoding, "rejectInvalidEncoding");
var MAX_ARRAY_LEN = 2 ** 32 - 1;
var MAX_ARRAY_INDEX = MAX_ARRAY_LEN - 1;
var DevalueError = class extends Error {
  static {
    __name(this, "DevalueError");
  }
  /**
  * @param {string} message
  * @param {string[]} keys
  * @param {any} [value] - The value that failed to be serialized
  * @param {any} [root] - The root value being serialized
  */
  constructor(message, keys, value, root) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
    this.value = value;
    this.root = root;
  }
};
var MAP_KEY = /* @__PURE__ */ Symbol();
function format_path(keys, format_map_key) {
  const path = [];
  for (let i2 = 0; i2 < keys.length; i2 += 1) {
    const segment = keys[i2];
    if (segment === MAP_KEY) path.push(`.get(${format_map_key(keys[++i2])})`);
    else if (typeof segment === "number") path.push(`[${segment}]`);
    else path.push(stringify_key(segment));
  }
  return path;
}
__name(format_path, "format_path");
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
__name(is_plain_object, "is_plain_object");
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
__name(get_type, "get_type");
function is_buffer(thing) {
  return typeof Buffer !== "undefined" && Buffer.isBuffer(thing);
}
__name(is_buffer, "is_buffer");
var needs_escape = /["<\\\u0000-\u001f\u2028\u2029]/;
var json_leaves_raw = /[<\u2028\u2029]/g;
var raw_escapes = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_raw(char) {
  return raw_escapes[char];
}
__name(escape_raw, "escape_raw");
function stringify_string(str) {
  if (!needs_escape.test(str) && str.isWellFormed()) return `"${str}"`;
  return JSON.stringify(str).replace(json_leaves_raw, escape_raw);
}
__name(stringify_string, "stringify_string");
var MAX_CACHED_KEY_LENGTH = 64;
var quoted_keys = /* @__PURE__ */ new Map();
function quote_key(key) {
  if (key.length > MAX_CACHED_KEY_LENGTH) return stringify_string(key);
  let quoted = quoted_keys.get(key);
  if (quoted === void 0) {
    if (quoted_keys.size >= 1024) quoted_keys.clear();
    quoted = stringify_string(key);
    quoted_keys.set(key, quoted);
  }
  return quoted;
}
__name(quote_key, "quote_key");
function enumerable_symbols(object2) {
  const symbols = Object.getOwnPropertySymbols(object2);
  return symbols.length === 0 ? symbols : symbols.filter((symbol) => Object.getOwnPropertyDescriptor(object2, symbol)?.enumerable);
}
__name(enumerable_symbols, "enumerable_symbols");
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key) {
  return is_identifier.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
}
__name(stringify_key, "stringify_key");
function is_valid_array_index(n2) {
  if (!Number.isInteger(n2)) return false;
  if (n2 < 0) return false;
  if (n2 > MAX_ARRAY_INDEX) return false;
  return true;
}
__name(is_valid_array_index, "is_valid_array_index");
function is_valid_array_len(n2) {
  if (!Number.isInteger(n2)) return false;
  if (n2 < 0) return false;
  if (n2 > MAX_ARRAY_LEN) return false;
  return true;
}
__name(is_valid_array_len, "is_valid_array_len");
function is_valid_array_index_string(s2) {
  if (s2.length === 0) return false;
  if (s2.length > 1 && s2.charCodeAt(0) === 48) return false;
  for (let i2 = 0; i2 < s2.length; i2++) {
    const c = s2.charCodeAt(i2);
    if (c < 48 || c > 57) return false;
  }
  return is_valid_array_index(+s2);
}
__name(is_valid_array_index_string, "is_valid_array_index_string");
function array_index_cut(keys) {
  for (var i2 = keys.length - 1; i2 >= 0; i2--) if (is_valid_array_index_string(keys[i2])) break;
  return i2 + 1;
}
__name(array_index_cut, "array_index_cut");
function valid_array_indices(array2) {
  const keys = Object.keys(array2);
  keys.length = array_index_cut(keys);
  return keys;
}
__name(valid_array_indices, "valid_array_indices");
function encode_native(array_buffer) {
  return new Uint8Array(array_buffer).toBase64();
}
__name(encode_native, "encode_native");
function decode_native(base642) {
  return Uint8Array.fromBase64(base642).buffer;
}
__name(decode_native, "decode_native");
function encode_buffer(array_buffer) {
  return Buffer.from(array_buffer).toString("base64");
}
__name(encode_buffer, "encode_buffer");
function decode_buffer(base642) {
  return Uint8Array.from(Buffer.from(base642, "base64")).buffer;
}
__name(decode_buffer, "decode_buffer");
function encode_legacy(array_buffer) {
  const array2 = new Uint8Array(array_buffer);
  let binary2 = "";
  const chunk_size = 32768;
  for (let i2 = 0; i2 < array2.length; i2 += chunk_size) {
    const chunk = array2.subarray(i2, i2 + chunk_size);
    binary2 += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary2);
}
__name(encode_legacy, "encode_legacy");
function decode_legacy(base642) {
  const binary_string = atob(base642);
  const len = binary_string.length;
  const array2 = new Uint8Array(len);
  for (let i2 = 0; i2 < len; i2++) array2[i2] = binary_string.charCodeAt(i2);
  return array2.buffer;
}
__name(decode_legacy, "decode_legacy");
var native = typeof Uint8Array.fromBase64 === "function";
var buffer = typeof process === "object" && process.versions?.node !== void 0;
var encode64 = native ? encode_native : buffer ? encode_buffer : encode_legacy;
var decode64 = native ? decode_native : buffer ? decode_buffer : decode_legacy;
function merge_operations(defaults, overrides) {
  if (!overrides) return defaults;
  const merged = {};
  for (const key of Object.keys(defaults)) merged[key] = overrides[key] ?? defaults[key];
  return merged;
}
__name(merge_operations, "merge_operations");
var NOT_PLAIN = /* @__PURE__ */ Object.freeze({ kind: "not-plain" });
var SYMBOL_KEYS = /* @__PURE__ */ Object.freeze({ kind: "symbol-keys" });
var default_stringify_operations = /* @__PURE__ */ Object.freeze({
  identify: /* @__PURE__ */ __name((value) => value, "identify"),
  typeOf: /* @__PURE__ */ __name((value) => value === null ? "null" : typeof value, "typeOf"),
  toPrimitive: /* @__PURE__ */ __name((value) => value, "toPrimitive"),
  tagOf: /* @__PURE__ */ __name((value) => get_type(value), "tagOf"),
  isThenable: /* @__PURE__ */ __name((value) => typeof value.then === "function", "isThenable"),
  toPromise: /* @__PURE__ */ __name((thenable) => Promise.resolve(thenable), "toPromise"),
  unbox: /* @__PURE__ */ __name((boxed) => boxed.valueOf(), "unbox"),
  toISOString: /* @__PURE__ */ __name((date2) => isNaN(date2.getDate()) ? "" : date2.toISOString(), "toISOString"),
  toStringValue: /* @__PURE__ */ __name((value) => value.toString(), "toStringValue"),
  regExpInfo: /* @__PURE__ */ __name((regexp) => ({
    source: regexp.source,
    flags: regexp.flags
  }), "regExpInfo"),
  valuesOf: /* @__PURE__ */ __name((set) => set, "valuesOf"),
  entriesOf: /* @__PURE__ */ __name((map) => map, "entriesOf"),
  viewInfo: /* @__PURE__ */ __name((view) => {
    if (is_buffer(view)) view = new Uint8Array(view);
    return {
      buffer: view.buffer,
      byteOffset: view.byteOffset,
      byteLength: view.byteLength,
      length: view.length,
      bufferByteLength: view.buffer.byteLength
    };
  }, "viewInfo"),
  toArrayBuffer: /* @__PURE__ */ __name((buffer2) => buffer2, "toArrayBuffer"),
  lengthOf: /* @__PURE__ */ __name((array2) => array2.length, "lengthOf"),
  hasOwn: /* @__PURE__ */ __name((value, key) => Object.hasOwn(value, key), "hasOwn"),
  indicesOf: /* @__PURE__ */ __name((array2) => valid_array_indices(array2), "indicesOf"),
  shapeOf: /* @__PURE__ */ __name((value) => {
    if (!is_plain_object(value)) return NOT_PLAIN;
    if (enumerable_symbols(value).length > 0) return SYMBOL_KEYS;
    return {
      kind: Object.getPrototypeOf(value) === null ? "null-proto" : "plain",
      keys: Object.keys(value)
    };
  }, "shapeOf"),
  get: /* @__PURE__ */ __name((value, key) => value[key], "get")
});
var array_buffer_byte_length = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength")?.get;
var shared_array_buffer_byte_length = typeof SharedArrayBuffer === "undefined" ? void 0 : Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, "byteLength")?.get;
var default_parse_operations = /* @__PURE__ */ Object.freeze({
  fromPrimitive: /* @__PURE__ */ __name((primitive) => primitive, "fromPrimitive"),
  fromISOString: /* @__PURE__ */ __name((iso) => new Date(iso), "fromISOString"),
  fromStringValue: /* @__PURE__ */ __name((tag, text) => {
    if (tag === "URL") return new URL(text);
    if (tag === "URLSearchParams") return new URLSearchParams(text);
    return Temporal[tag.slice(9)].from(text);
  }, "fromStringValue"),
  fromArrayBuffer: /* @__PURE__ */ __name((buffer2) => buffer2, "fromArrayBuffer"),
  fromRegExpInfo: /* @__PURE__ */ __name((source, flags) => new RegExp(source, flags), "fromRegExpInfo"),
  fromViewInfo: /* @__PURE__ */ __name((tag, buffer2, byteOffset, length) => {
    try {
      array_buffer_byte_length.call(buffer2);
    } catch (error3) {
      if (!shared_array_buffer_byte_length) throw error3;
      shared_array_buffer_byte_length.call(buffer2);
    }
    const Constructor = globalThis[tag];
    return byteOffset !== void 0 ? new Constructor(buffer2, byteOffset, length) : new Constructor(buffer2);
  }, "fromViewInfo"),
  box: /* @__PURE__ */ __name((value) => Object(value), "box"),
  createArray: /* @__PURE__ */ __name((length) => new Array(length), "createArray"),
  createSparseArray: /* @__PURE__ */ __name((length) => {
    const array2 = [];
    array2[MAX_ARRAY_INDEX] = void 0;
    delete array2[MAX_ARRAY_INDEX];
    array2.length = length;
    return array2;
  }, "createSparseArray"),
  createObject: /* @__PURE__ */ __name(() => ({}), "createObject"),
  createNullPrototypeObject: /* @__PURE__ */ __name(() => /* @__PURE__ */ Object.create(null), "createNullPrototypeObject"),
  createSet: /* @__PURE__ */ __name(() => /* @__PURE__ */ new Set(), "createSet"),
  createMap: /* @__PURE__ */ __name(() => /* @__PURE__ */ new Map(), "createMap"),
  set: /* @__PURE__ */ __name((target, key, value) => {
    target[key] = value;
  }, "set"),
  addValue: /* @__PURE__ */ __name((set, value) => {
    set.add(value);
  }, "addValue"),
  addEntry: /* @__PURE__ */ __name((map, key, value) => {
    map.set(key, value);
  }, "addEntry")
});
function invalid() {
  throw new Error("Invalid input");
}
__name(invalid, "invalid");
function parse2(serialized, revivers, options) {
  return unflatten$1(JSON.parse(serialized), revivers, options);
}
__name(parse2, "parse");
function unflatten$1(parsed, revivers, options) {
  const ops = merge_operations(default_parse_operations, options?.operations);
  if (typeof parsed === "number") return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) invalid();
  const values = parsed;
  const hydrated = Array(values.length);
  let hydrating = null;
  function get_raw(index) {
    if (!is_valid_array_index(index) || index >= values.length) invalid();
    return values[index];
  }
  __name(get_raw, "get_raw");
  function hydrate(index, standalone = false) {
    if (index === -1) return ops.fromPrimitive(void 0);
    if (index === -3) return ops.fromPrimitive(NaN);
    if (index === -4) return ops.fromPrimitive(Infinity);
    if (index === -5) return ops.fromPrimitive(-Infinity);
    if (index === -6) return ops.fromPrimitive(-0);
    if (standalone || typeof index !== "number") invalid();
    if (index in hydrated) return hydrated[index];
    if (index >= values.length) invalid();
    const value = values[index];
    if (!value || typeof value !== "object") hydrated[index] = ops.fromPrimitive(value);
    else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers && Object.hasOwn(revivers, type) ? revivers[type] : void 0;
        if (reviver) {
          let i2 = value[1];
          if (typeof i2 !== "number") i2 = values.push(value[1]) - 1;
          if (Object.hasOwn(hydrated, i2)) return hydrated[index] = reviver(hydrated[i2]);
          hydrating ??= /* @__PURE__ */ new Set();
          if (hydrating.has(i2)) throw new Error("Invalid circular reference");
          hydrating.add(i2);
          hydrated[index] = reviver(hydrate(i2));
          hydrating.delete(i2);
          return hydrated[index];
        }
        switch (type) {
          case "Date":
            hydrated[index] = ops.fromISOString(value[1]);
            break;
          case "Set":
            const set = ops.createSet();
            hydrated[index] = set;
            for (let i2 = 1; i2 < value.length; i2 += 1) ops.addValue(set, hydrate(value[i2]));
            break;
          case "Map":
            const map = ops.createMap();
            hydrated[index] = map;
            for (let i2 = 1; i2 < value.length; i2 += 2) ops.addEntry(map, hydrate(value[i2]), hydrate(value[i2 + 1]));
            break;
          case "RegExp":
            hydrated[index] = ops.fromRegExpInfo(value[1], value[2]);
            break;
          case "Object": {
            const wrapped_index = value[1];
            if (!(wrapped_index === -3 || wrapped_index === -4 || wrapped_index === -5 || wrapped_index === -6)) {
              const wrapped = get_raw(wrapped_index);
              const is_bigint = Array.isArray(wrapped) && wrapped[0] === "BigInt";
              if ((wrapped === void 0 || typeof wrapped === "object") && !is_bigint) invalid();
            }
            hydrated[index] = ops.box(hydrate(wrapped_index));
            break;
          }
          case "BigInt":
            hydrated[index] = ops.fromPrimitive(BigInt(value[1]));
            break;
          case "null":
            const obj = ops.createNullPrototypeObject();
            hydrated[index] = obj;
            for (let i2 = 1; i2 < value.length; i2 += 2) {
              const key = value[i2];
              if (typeof key !== "string") throw new Error("Cannot parse an object with a non-string key");
              if (key === "__proto__") throw new Error("Cannot parse an object with a `__proto__` property");
              ops.set(obj, key, hydrate(value[i2 + 1]));
            }
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Float16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array":
          case "DataView": {
            const buffer_index = value[1];
            const raw = get_raw(buffer_index);
            if (!Array.isArray(raw) || raw[0] !== "ArrayBuffer") invalid();
            const buffer2 = hydrate(buffer_index);
            hydrated[index] = ops.fromViewInfo(type, buffer2, value[2], value[3]);
            break;
          }
          case "ArrayBuffer": {
            const base642 = value[1];
            if (typeof base642 !== "string") throw new Error("Invalid ArrayBuffer encoding");
            hydrated[index] = ops.fromArrayBuffer(decode64(base642));
            break;
          }
          case "URL":
          case "URLSearchParams":
          case "Temporal.Duration":
          case "Temporal.Instant":
          case "Temporal.PlainDate":
          case "Temporal.PlainTime":
          case "Temporal.PlainDateTime":
          case "Temporal.PlainMonthDay":
          case "Temporal.PlainYearMonth":
          case "Temporal.ZonedDateTime":
            hydrated[index] = ops.fromStringValue(type, value[1]);
            break;
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else if (value[0] === -7) {
        const len = value[1];
        if (!is_valid_array_len(len)) invalid();
        const array2 = ops.createSparseArray(len);
        hydrated[index] = array2;
        for (let i2 = 2; i2 < value.length; i2 += 2) {
          const idx = value[i2];
          if (!is_valid_array_index(idx) || idx >= len) invalid();
          ops.set(array2, idx, hydrate(value[i2 + 1]));
        }
      } else {
        const array2 = ops.createArray(value.length);
        hydrated[index] = array2;
        for (let i2 = 0; i2 < value.length; i2 += 1) {
          const n2 = value[i2];
          if (n2 === -2) continue;
          ops.set(array2, i2, hydrate(n2));
        }
      }
    } else {
      const object2 = ops.createObject();
      hydrated[index] = object2;
      for (const key of Object.keys(value)) {
        if (key === "__proto__") throw new Error("Cannot parse an object with a `__proto__` property");
        ops.set(object2, key, hydrate(value[key]));
      }
    }
    return hydrated[index];
  }
  __name(hydrate, "hydrate");
  return hydrate(0);
}
__name(unflatten$1, "unflatten$1");
function stringify$2(value, reducers, options) {
  const stringified = run(false, value, reducers, options);
  return typeof stringified === "string" ? stringified : `[${stringified.join(",")}]`;
}
__name(stringify$2, "stringify$2");
function run(async, value, reducers, options) {
  const ops = merge_operations(default_stringify_operations, options?.operations);
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom2 = [];
  if (reducers) for (const key of Object.getOwnPropertyNames(reducers)) custom2.push({
    key,
    fn: reducers[key]
  });
  let keys = [];
  let p = 0;
  function error3(message, thing) {
    throw new DevalueError(message, format_path(keys, (key) => {
      const key_type = ops.typeOf(key);
      return key_type !== "object" && key_type !== "function" && key_type !== "symbol" ? stringify_primitive(ops.toPrimitive(key)) : "...";
    }), thing, value);
  }
  __name(error3, "error");
  function flatten(thing, index2) {
    const type = ops.typeOf(thing);
    if (type === "undefined") return -1;
    let number;
    if (type === "number") {
      number = ops.toPrimitive(thing);
      if (Number.isNaN(number)) return -3;
      if (number === Infinity) return -4;
      if (number === -Infinity) return -5;
      if (number === 0 && 1 / number < 0) return -6;
    }
    const id = ops.identify(thing);
    if (indexes.has(id)) return indexes.get(id);
    index2 ??= p++;
    indexes.set(id, index2);
    for (const { key, fn } of custom2) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index2] = `["${key}",${flatten(value2)}]`;
        return index2;
      }
    }
    if (type === "function") error3(`Cannot stringify a function`, thing);
    else if (type === "symbol") error3(`Cannot stringify a Symbol primitive`, thing);
    let str = "";
    if (type !== "object") str = stringify_primitive(type === "number" ? number : ops.toPrimitive(thing));
    else if (ops.isThenable(thing)) {
      if (!async) error3(`Cannot stringify a Promise or thenable \u2014 use stringifyAsync instead`, thing);
      const prev_keys = keys.slice();
      str = ops.toPromise(thing).then((value2) => {
        keys = prev_keys;
        const i2 = flatten(value2, index2);
        if (i2 < 0) stringified[index2] = i2;
      });
      str.catch(() => {
      });
    } else {
      const tag = ops.tagOf(thing);
      switch (tag) {
        case "Number":
        case "String":
        case "Boolean":
        case "BigInt":
          str = `["Object",${flatten(ops.unbox(thing))}]`;
          break;
        case "Date":
          str = `["Date","${ops.toISOString(thing)}"]`;
          break;
        case "URL":
          str = `["URL",${stringify_string(ops.toStringValue(thing))}]`;
          break;
        case "URLSearchParams":
          str = `["URLSearchParams",${stringify_string(ops.toStringValue(thing))}]`;
          break;
        case "RegExp":
          const { source, flags } = ops.regExpInfo(thing);
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array": {
          let mostly_dense = false;
          const length = ops.lengthOf(thing);
          str = "[";
          for (let i2 = 0; i2 < length; i2 += 1) {
            if (i2 > 0) str += ",";
            if (ops.hasOwn(thing, i2)) {
              keys.push(i2);
              str += flatten(ops.get(thing, i2));
              keys.pop();
            } else if (mostly_dense) str += -2;
            else {
              const populated_keys = ops.indicesOf(thing);
              const population = populated_keys.length;
              const d = String(length).length;
              if ((length - population) * 3 > 4 + d + population * (d + 1)) {
                str = "[-7," + length;
                for (let j = 0; j < populated_keys.length; j++) {
                  const key = populated_keys[j];
                  keys.push(+key);
                  str += "," + key + "," + flatten(ops.get(thing, key));
                  keys.pop();
                }
                break;
              } else {
                mostly_dense = true;
                str += -2;
              }
            }
          }
          str += "]";
          break;
        }
        case "Set":
          str = '["Set"';
          for (const value2 of ops.valuesOf(thing)) str += `,${flatten(value2)}`;
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key, value2] of ops.entriesOf(thing)) {
            keys.push(MAP_KEY, key);
            str += `,${flatten(key)},${flatten(value2)}`;
            keys.pop();
            keys.pop();
          }
          str += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const info2 = ops.viewInfo(thing);
          str = '["' + tag + '",' + flatten(info2.buffer);
          if (info2.byteLength !== info2.bufferByteLength) str += `,${info2.byteOffset},${info2.length}`;
          str += "]";
          break;
        }
        case "DataView": {
          const info2 = ops.viewInfo(thing);
          str = '["' + tag + '",' + flatten(info2.buffer);
          if (info2.byteLength !== info2.bufferByteLength) str += `,${info2.byteOffset},${info2.byteLength}`;
          str += "]";
          break;
        }
        case "ArrayBuffer":
          str = `["ArrayBuffer","${encode64(ops.toArrayBuffer(thing))}"]`;
          break;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          str = `["${tag}",${stringify_string(ops.toStringValue(thing))}]`;
          break;
        default: {
          const shape = ops.shapeOf(thing);
          if (shape.kind === "not-plain") error3(`Cannot stringify arbitrary non-POJOs`, thing);
          if (shape.kind === "symbol-keys") error3(`Cannot stringify POJOs with symbolic keys`, thing);
          if (shape.kind === "null-proto") {
            str = '["null"';
            for (const key of shape.keys) {
              if (key === "__proto__") error3(`Cannot stringify objects with __proto__ keys`, thing);
              keys.push(key);
              str += `,${quote_key(key)},${flatten(ops.get(thing, key))}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key of shape.keys) {
              if (key === "__proto__") error3(`Cannot stringify objects with __proto__ keys`, thing);
              if (started) str += ",";
              started = true;
              keys.push(key);
              str += `${quote_key(key)}:${flatten(ops.get(thing, key))}`;
              keys.pop();
            }
            str += "}";
          }
        }
      }
    }
    stringified[index2] = str;
    return index2;
  }
  __name(flatten, "flatten");
  const index = flatten(value);
  if (index < 0) return `${index}`;
  return stringified;
}
__name(run, "run");
function stringify_primitive(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing === void 0) return (-1).toString();
  if (thing === 0 && 1 / thing < 0) return (-6).toString();
  if (type === "bigint") return `["BigInt","${thing}"]`;
  return String(thing);
}
__name(stringify_primitive, "stringify_primitive");
function shouldAppendForwardSlash(trailingSlash, buildFormat) {
  switch (trailingSlash) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore":
      switch (buildFormat) {
        case "directory":
          return true;
        case "preserve":
        case "file":
          return false;
      }
  }
}
__name(shouldAppendForwardSlash, "shouldAppendForwardSlash");
var ACTION_QUERY_PARAMS = {
  actionName: "_action",
  actionPayload: "_astroActionPayload"
};
var codeToStatusMap = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError2 extends Error {
  static {
    __name(this, "ActionError");
  }
  type = "AstroActionError";
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(params) {
    super(params.message);
    this.code = params.code;
    this.status = ActionError2.codeToStatus(params.code);
    if (params.stack) this.stack = params.stack;
  }
  static codeToStatus(code) {
    return codeToStatusMap[code];
  }
  static statusToCode(status) {
    return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
  }
  static fromJson(body) {
    if (isInputError(body)) return new ActionInputError(body.issues);
    if (isActionError(body)) return new ActionError2(body);
    return new ActionError2({ code: "INTERNAL_SERVER_ERROR" });
  }
};
function isActionError(error3) {
  return typeof error3 === "object" && error3 != null && "type" in error3 && error3.type === "AstroActionError";
}
__name(isActionError, "isActionError");
function isInputError(error3) {
  return typeof error3 === "object" && error3 != null && "type" in error3 && error3.type === "AstroActionInputError" && "issues" in error3 && Array.isArray(error3.issues);
}
__name(isInputError, "isInputError");
var ActionInputError = class extends ActionError {
  static {
    __name(this, "ActionInputError");
  }
  type = "AstroActionInputError";
  issues;
  fields;
  constructor(issues) {
    super({
      message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
      code: "BAD_REQUEST"
    });
    this.issues = issues;
    this.fields = {};
    for (const issue2 of issues) if (issue2.path.length > 0) {
      const key = issue2.path[0].toString();
      this.fields[key] ??= [];
      this.fields[key]?.push(issue2.message);
    }
  }
};
function deserializeActionResult(res) {
  if (res.type === "error") {
    let json;
    try {
      json = JSON.parse(res.body);
    } catch {
      return {
        data: void 0,
        error: new ActionError({
          message: res.body,
          code: "INTERNAL_SERVER_ERROR"
        })
      };
    }
    if (Object.assign({
      "ASSETS_PREFIX": void 0,
      "BASE_URL": "/",
      "DEV": false,
      "MODE": "production",
      "PROD": true,
      "SITE": void 0,
      "SSR": true
    }, {
      OS: "Windows_NT",
      Path: "C:\\Users\\zldxbrsss\\Desktop\\Montanares-Todo-Cuero\\node_modules\\.bin;C:\\Users\\zldxbrsss\\Desktop\\node_modules\\.bin;C:\\Users\\zldxbrsss\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Program Files\\Git\\cmd;C:\\Program Files\\nodejs\\;C:\\Program Files\\Inkscape\\bin;C:\\Users\\zldxbrsss\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\zldxbrsss\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\zldxbrsss\\AppData\\Roaming\\npm;C:\\Users\\zldxbrsss\\AppData\\Local\\Programs\\Ollama;C:\\Users\\zldxbrsss\\AppData\\Local\\Programs\\Microsoft VS Code\\bin\\copilot-shim"
    })?.PROD) return {
      error: ActionError.fromJson(json),
      data: void 0
    };
    else {
      const error3 = ActionError.fromJson(json);
      error3.stack = actionResultErrorStack.get();
      return {
        error: error3,
        data: void 0
      };
    }
  }
  if (res.type === "empty") return {
    data: void 0,
    error: void 0
  };
  return {
    data: parse2(res.body, { URL: /* @__PURE__ */ __name((href) => new URL(href), "URL") }),
    error: void 0
  };
}
__name(deserializeActionResult, "deserializeActionResult");
var actionResultErrorStack = (/* @__PURE__ */ __name((function actionResultErrorStackFn() {
  let errorStack;
  return {
    set(stack) {
      errorStack = stack;
    },
    get() {
      return errorStack;
    }
  };
}), "actionResultErrorStackFn"))();
function getActionQueryString(name) {
  return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
__name(getActionQueryString, "getActionQueryString");
function hasActionPayload(locals) {
  return "_actionPayload" in locals;
}
__name(hasActionPayload, "hasActionPayload");
function createGetActionResult(locals) {
  return (actionFn) => {
    if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
    return deserializeActionResult(locals._actionPayload.actionResult);
  };
}
__name(createGetActionResult, "createGetActionResult");
function createCallAction(context) {
  return (baseAction, input) => {
    Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
    return baseAction.bind(context)(input);
  };
}
__name(createCallAction, "createCallAction");
var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
var cookieOctetRegExp = /^[!#$&'()*+\-.\/0-9:<=>?@A-Z[\]\^_`a-z{|}~]*$/;
var NullObject = /* @__PURE__ */ (() => {
  const C = /* @__PURE__ */ __name(function() {
  }, "C");
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function parseCookie(str, options) {
  const obj = new NullObject();
  const len = str.length;
  if (len < 2) return obj;
  const dec = options?.decode || decode2;
  let index = 0;
  do {
    const eqIdx = eqIndex(str, index, len);
    if (eqIdx === len) break;
    const endIdx = endIndex(str, index, len);
    if (eqIdx > endIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = valueSlice(str, index, eqIdx);
    if (obj[key] === void 0) obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
    index = endIdx + 1;
  } while (index < len);
  return obj;
}
__name(parseCookie, "parseCookie");
function stringifySetCookie(cookie, options) {
  const enc = options?.encode || defaultEncode;
  if (!cookieNameRegExp.test(cookie.name)) throw new TypeError(`argument name is invalid: ${cookie.name}`);
  const value = cookie.value == null ? "" : enc(cookie.value);
  if (!cookieValueRegExp.test(value)) throw new TypeError(`argument val is invalid: ${cookie.value}`);
  let str = cookie.name + "=" + value;
  if (cookie.maxAge !== void 0) {
    if (!Number.isInteger(cookie.maxAge)) throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
    str += "; Max-Age=" + cookie.maxAge;
  }
  if (cookie.domain) {
    if (!domainValueRegExp.test(cookie.domain)) throw new TypeError(`option domain is invalid: ${cookie.domain}`);
    str += "; Domain=" + cookie.domain;
  }
  if (cookie.path) {
    if (!pathValueRegExp.test(cookie.path)) throw new TypeError(`option path is invalid: ${cookie.path}`);
    str += "; Path=" + cookie.path;
  }
  if (cookie.expires) {
    if (!Number.isFinite(cookie.expires.valueOf())) throw new TypeError(`option expires is invalid: ${cookie.expires}`);
    str += "; Expires=" + cookie.expires.toUTCString();
  }
  if (cookie.httpOnly) str += "; HttpOnly";
  if (cookie.secure) str += "; Secure";
  if (cookie.partitioned) str += "; Partitioned";
  if (cookie.priority) switch (typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0) {
    case "low":
      str += "; Priority=Low";
      break;
    case "medium":
      str += "; Priority=Medium";
      break;
    case "high":
      str += "; Priority=High";
      break;
    default:
      throw new TypeError(`option priority is invalid: ${cookie.priority}`);
  }
  if (cookie.sameSite) switch (typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite) {
    case true:
    case "strict":
      str += "; SameSite=Strict";
      break;
    case "lax":
      str += "; SameSite=Lax";
      break;
    case "none":
      str += "; SameSite=None";
      break;
    default:
      throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
  }
  return str;
}
__name(stringifySetCookie, "stringifySetCookie");
function endIndex(str, min, len) {
  const index = str.indexOf(";", min);
  return index === -1 ? len : index;
}
__name(endIndex, "endIndex");
function eqIndex(str, min, len) {
  const index = str.indexOf("=", min);
  return index === -1 ? len : index;
}
__name(eqIndex, "eqIndex");
function valueSlice(str, min, max) {
  if (min === max) return "";
  let start = min;
  let end = max;
  do {
    const code = str.charCodeAt(start);
    if (code !== 32 && code !== 9) break;
  } while (++start < end);
  while (end > start) {
    const code = str.charCodeAt(end - 1);
    if (code !== 32 && code !== 9) break;
    end--;
  }
  return str.slice(start, end);
}
__name(valueSlice, "valueSlice");
function decode2(str) {
  if (str.indexOf("%") === -1) return str;
  try {
    return decodeURIComponent(str);
  } catch (e2) {
    return str;
  }
}
__name(decode2, "decode");
function defaultEncode(str) {
  return cookieOctetRegExp.test(str) ? str : encodeURIComponent(str);
}
__name(defaultEncode, "defaultEncode");
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol2 = /* @__PURE__ */ Symbol.for("astro.responseSent");
var identity = /* @__PURE__ */ __name((value) => value, "identity");
var AstroCookie = class {
  static {
    __name(this, "AstroCookie");
  }
  value;
  constructor(value) {
    this.value = value;
  }
  json() {
    if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    if (this.value === "false") return false;
    if (this.value === "0") return false;
    return Boolean(this.value);
  }
};
var AstroCookies = class {
  static {
    __name(this, "AstroCookies");
  }
  #request;
  #requestValues;
  #outgoing;
  #consumed;
  #logger;
  constructor(request, logger) {
    this.#request = request;
    this.#requestValues = null;
    this.#outgoing = null;
    this.#consumed = false;
    this.#logger = logger;
  }
  /**
  * Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
  * in a Set-Cookie header added to the response.
  * @param key The cookie to delete
  * @param options Options related to this deletion, such as the path of the cookie.
  */
  delete(key, options) {
    this.#ensureOutgoingMap().set(key, [
      DELETED_VALUE,
      stringifySetCookie({
        ...options,
        name: key,
        value: DELETED_VALUE,
        expires: DELETED_EXPIRATION,
        maxAge: void 0
      }),
      false
    ]);
  }
  /**
  * Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
  * request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
  * from that set call, overriding any values already part of the request.
  * @param key The cookie to get.
  * @returns An object containing the cookie value as well as convenience methods for converting its value.
  */
  get(key, options = void 0) {
    if (this.#outgoing?.has(key)) {
      let [serializedValue, , isSetValue] = this.#outgoing.get(key);
      if (isSetValue) return new AstroCookie(serializedValue);
      else return;
    }
    const decode3 = options?.decode ?? decodeURIComponent;
    const values = this.#ensureParsed();
    if (key in values) {
      const value = values[key];
      if (value !== void 0) {
        let decodedValue;
        try {
          decodedValue = decode3(value);
        } catch (_error) {
          decodedValue = value;
        }
        return new AstroCookie(decodedValue);
      }
    }
  }
  /**
  * Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
  * part of the initial request or set via Astro.cookies.set(key)
  * @param key The cookie to check for.
  * @param _options This parameter is no longer used.
  * @returns
  */
  has(key, _options) {
    if (this.#outgoing?.has(key)) {
      let [, , isSetValue] = this.#outgoing.get(key);
      return isSetValue;
    }
    return this.#ensureParsed()[key] !== void 0;
  }
  /**
  * Astro.cookies.set(key, value) is used to set a cookie's value. If provided
  * an object it will be stringified via JSON.stringify(value). Additionally you
  * can provide options customizing how this cookie will be set, such as setting httpOnly
  * in order to prevent the cookie from being read in client-side JavaScript.
  * @param key The name of the cookie to set.
  * @param value A value, either a string or other primitive or an object.
  * @param options Options for the cookie, such as the path and security settings.
  */
  set(key, value, options) {
    if (this.#consumed) this.#logger.warn("SKIP_FORMAT", "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
    let serializedValue;
    if (typeof value === "string") serializedValue = value;
    else {
      let toStringValue = value.toString();
      if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
      else serializedValue = toStringValue;
    }
    const { encode: encode2, ...attributes } = options ?? {};
    this.#ensureOutgoingMap().set(key, [
      serializedValue,
      stringifySetCookie({
        ...attributes,
        name: key,
        value: serializedValue
      }, { encode: encode2 }),
      true
    ]);
    if (this.#request[responseSentSymbol2]) throw new AstroError({ ...ResponseSentError });
  }
  /**
  * Merges a new AstroCookies instance into the current instance. Any new cookies
  * will be added to the current instance, overwriting any existing cookies with the same name.
  */
  merge(cookies) {
    const outgoing = cookies.#outgoing;
    if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
  }
  /**
  * Astro.cookies.header() returns an iterator for the cookies that have previously
  * been set by either Astro.cookies.set() or Astro.cookies.delete().
  * This method is primarily used by adapters to set the header on outgoing responses.
  * @returns
  */
  *headers() {
    if (this.#outgoing == null) return;
    for (const [, value] of this.#outgoing) yield value[1];
  }
  /**
  * Marks the cookies as consumed and returns the header values.
  * After consumption, any subsequent `set()` calls will warn.
  */
  consume() {
    this.#consumed = true;
    return this.headers();
  }
  /**
  * @deprecated Use the instance method `cookies.consume()` instead.
  * Kept for backward compatibility with adapters.
  */
  static consume(cookies) {
    return cookies.consume();
  }
  #ensureParsed() {
    if (!this.#requestValues) this.#parse();
    if (!this.#requestValues) this.#requestValues = /* @__PURE__ */ Object.create(null);
    return this.#requestValues;
  }
  #ensureOutgoingMap() {
    if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
    return this.#outgoing;
  }
  #parse() {
    const raw = this.#request.headers.get("cookie");
    if (!raw) return;
    this.#requestValues = parseCookie(raw, { decode: identity });
  }
};
var astroCookiesSymbol = /* @__PURE__ */ Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
__name(attachCookiesToResponse, "attachCookiesToResponse");
function getCookiesFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) return cookies;
  else return;
}
__name(getCookiesFromResponse, "getCookiesFromResponse");
function* getSetCookiesFromResponse(response) {
  const cookies = getCookiesFromResponse(response);
  if (!cookies) return [];
  for (const headerValue of cookies.consume()) yield headerValue;
  return [];
}
__name(getSetCookiesFromResponse, "getSetCookiesFromResponse");
function pathHasLocale(path, locales) {
  const segments = path.split("/").map(normalizeThePath);
  for (const segment of segments) for (const locale of locales) if (typeof locale === "string") {
    if (normalizeTheLocale(segment) === normalizeTheLocale(locale)) return true;
  } else if (segment === locale.path) return true;
  return false;
}
__name(pathHasLocale, "pathHasLocale");
function normalizeTheLocale(locale) {
  return locale.replaceAll("_", "-").toLowerCase();
}
__name(normalizeTheLocale, "normalizeTheLocale");
function normalizeThePath(path) {
  return path.endsWith(".html") ? path.slice(0, -5) : path;
}
__name(normalizeThePath, "normalizeThePath");
function isLocalizedErrorRoute(route, status, locales) {
  if (!locales) return false;
  const suffix = `/${status}`;
  if (!route.endsWith(suffix)) return false;
  const localeSegment = route.slice(0, -suffix.length);
  if (!localeSegment || localeSegment.includes("/", 1)) return false;
  return pathHasLocale(localeSegment, locales);
}
__name(isLocalizedErrorRoute, "isLocalizedErrorRoute");
function getErrorRoutePath(pathname, status, routes, locales, appendTrailingSlash = false) {
  const suffix = appendTrailingSlash ? "/" : "";
  if (locales) {
    const firstSegment = pathname.split("/").find(Boolean);
    if (firstSegment && pathHasLocale(`/${firstSegment}`, locales)) {
      const localized = `/${firstSegment}/${status}`;
      if (routes.some((route) => route.route === localized)) return `${localized}${suffix}`;
    }
  }
  return `/${status}${suffix}`;
}
__name(getErrorRoutePath, "getErrorRoutePath");
function routeIsRedirect(route) {
  return route?.type === "redirect";
}
__name(routeIsRedirect, "routeIsRedirect");
function routeIsFallback(route) {
  return route?.type === "fallback";
}
__name(routeIsFallback, "routeIsFallback");
function getFallbackRoute(route, routeList) {
  const fallbackRoute = routeList.find((r2) => {
    if (route.route === "/" && r2.routeData.route === "/") return true;
    return r2.routeData.fallbackRoutes.find((f) => {
      return f.route === route.route;
    });
  });
  if (!fallbackRoute) throw new Error(`No fallback route found for route ${route.route}`);
  return fallbackRoute.routeData;
}
__name(getFallbackRoute, "getFallbackRoute");
function getCustom404Route(manifestData) {
  return manifestData.routes.find((r2) => isRoute404(r2.route));
}
__name(getCustom404Route, "getCustom404Route");
function getCustom500Route(manifestData) {
  return manifestData.routes.find((r2) => isRoute500(r2.route));
}
__name(getCustom500Route, "getCustom500Route");
function getDefaultStatusCode(manifest2, routeData, pathname) {
  if (!routeData.pattern.test(pathname)) {
    for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(pathname)) return 302;
  }
  const route = removeTrailingForwardSlash(routeData.route);
  const locales = manifest2.i18n?.locales;
  if (isRoute404(route) || isLocalizedErrorRoute(route, 404, locales)) return 404;
  if (isRoute500(route) || isLocalizedErrorRoute(route, 500, locales)) return 500;
  return 200;
}
__name(getDefaultStatusCode, "getDefaultStatusCode");
function routeHasHtmlExtension(route) {
  return route.segments.some((segment) => segment.some((part) => !part.dynamic && part.content.includes(".html")));
}
__name(routeHasHtmlExtension, "routeHasHtmlExtension");
var RedirectComponentInstance = { default() {
  return new Response(null, { status: 301 });
} };
var RedirectSinglePageBuiltModule = {
  page: /* @__PURE__ */ __name(() => Promise.resolve(RedirectComponentInstance), "page"),
  onRequest: /* @__PURE__ */ __name((_, next) => next(), "onRequest")
};
function getAssetsPrefix(fileExtension2, assetsPrefix) {
  let prefix = "";
  if (!assetsPrefix) prefix = "";
  else if (typeof assetsPrefix === "string") prefix = assetsPrefix;
  else prefix = assetsPrefix[fileExtension2.slice(1)] || assetsPrefix.fallback;
  return prefix;
}
__name(getAssetsPrefix, "getAssetsPrefix");
var URL_PARSE_BASE = "https://astro.build";
function splitAssetPath(path) {
  const parsed = new URL(path, URL_PARSE_BASE);
  return {
    pathname: !URL.canParse(path) && !path.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname,
    suffix: `${parsed.search}${parsed.hash}`
  };
}
__name(splitAssetPath, "splitAssetPath");
function appendQueryParams(path, queryParams) {
  const queryString = queryParams.toString();
  if (!queryString) return path;
  const hashIndex = path.indexOf("#");
  const basePath = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : path.slice(hashIndex);
  return `${basePath}${basePath.includes("?") ? "&" : "?"}${queryString}${hash}`;
}
__name(appendQueryParams, "appendQueryParams");
function createAssetLink(href, base, assetsPrefix, queryParams) {
  const { pathname, suffix } = splitAssetPath(href);
  let url = "";
  if (assetsPrefix) {
    const pf = getAssetsPrefix(fileExtension(pathname), assetsPrefix);
    url = joinPaths(pf, slash(pathname)) + suffix;
  } else if (base) url = prependForwardSlash(joinPaths(base, slash(pathname))) + suffix;
  else url = href;
  if (queryParams) url = appendQueryParams(url, queryParams);
  return url;
}
__name(createAssetLink, "createAssetLink");
function createStylesheetElement(stylesheet, base, assetsPrefix, queryParams) {
  if (stylesheet.type === "inline") return {
    props: {},
    children: stylesheet.content
  };
  else return {
    props: {
      rel: "stylesheet",
      href: createAssetLink(stylesheet.src, base, assetsPrefix, queryParams)
    },
    children: ""
  };
}
__name(createStylesheetElement, "createStylesheetElement");
function createStylesheetElementSet(stylesheets, base, assetsPrefix, queryParams) {
  return new Set(stylesheets.map((s2) => createStylesheetElement(s2, base, assetsPrefix, queryParams)));
}
__name(createStylesheetElementSet, "createStylesheetElementSet");
function createModuleScriptElement(script, base, assetsPrefix, queryParams) {
  if (script.type === "external") return createModuleScriptElementWithSrc(script.value, base, assetsPrefix, queryParams);
  else return {
    props: { type: "module" },
    children: script.value
  };
}
__name(createModuleScriptElement, "createModuleScriptElement");
function createModuleScriptElementWithSrc(src, base, assetsPrefix, queryParams) {
  return {
    props: {
      type: "module",
      src: createAssetLink(src, base, assetsPrefix, queryParams)
    },
    children: ""
  };
}
__name(createModuleScriptElementWithSrc, "createModuleScriptElementWithSrc");
function createManifestMemo(derive) {
  const cache = /* @__PURE__ */ new WeakMap();
  return {
    get(manifest2) {
      if (cache.has(manifest2)) return cache.get(manifest2);
      const value = derive(manifest2);
      cache.set(manifest2, value);
      return value;
    },
    has(manifest2) {
      return cache.has(manifest2);
    },
    set(manifest2, value) {
      cache.set(manifest2, value);
    },
    invalidate(manifest2) {
      cache.delete(manifest2);
    }
  };
}
__name(createManifestMemo, "createManifestMemo");
function createAsyncManifestMemo(derive) {
  const cache = /* @__PURE__ */ new WeakMap();
  return {
    get(manifest2) {
      let promise = cache.get(manifest2);
      if (!promise) {
        promise = derive(manifest2);
        cache.set(manifest2, promise);
        promise.catch(() => {
          if (cache.get(manifest2) === promise) cache.delete(manifest2);
        });
      }
      return promise;
    },
    invalidate(manifest2) {
      cache.delete(manifest2);
    }
  };
}
__name(createAsyncManifestMemo, "createAsyncManifestMemo");
async function readBodyWithLimit(request, limit) {
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number.parseInt(contentLengthHeader, 10);
    if (Number.isFinite(contentLength) && contentLength > limit) throw new BodySizeLimitError(limit);
  }
  if (!request.body) return /* @__PURE__ */ new Uint8Array();
  const reader = request.body.getReader();
  const chunks = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      received += value.byteLength;
      if (received > limit) throw new BodySizeLimitError(limit);
      chunks.push(value);
    }
  }
  const buffer2 = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    buffer2.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return buffer2;
}
__name(readBodyWithLimit, "readBodyWithLimit");
var BodySizeLimitError = class extends Error {
  static {
    __name(this, "BodySizeLimitError");
  }
  limit;
  constructor(limit) {
    super(`Request body exceeds the configured limit of ${limit} bytes`);
    this.name = "BodySizeLimitError";
    this.limit = limit;
  }
};
function getPattern(segments, base, addTrailingSlash) {
  const pathname = segments.map((segment) => {
    if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
    else return "\\/" + segment.map((part) => {
      if (part.spread) return "(.*?)";
      else if (part.dynamic) return "([^/]+?)";
      else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("");
  const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
  let initial = "\\/";
  if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
  return new RegExp(`^${pathname || initial}${trailing}`);
}
__name(getPattern, "getPattern");
function getTrailingSlashPattern(addTrailingSlash) {
  if (addTrailingSlash === "always") return "\\/$";
  if (addTrailingSlash === "never") return "$";
  return "\\/?$";
}
__name(getTrailingSlashPattern, "getTrailingSlashPattern");
var SERVER_ISLAND_ROUTE = "/_server-islands/[name]";
var SERVER_ISLAND_COMPONENT = "_server-islands.astro";
function badRequest(reason) {
  return new Response(null, {
    status: 400,
    statusText: "Bad request: " + reason
  });
}
__name(badRequest, "badRequest");
var DEFAULT_BODY_SIZE_LIMIT = 1048576;
async function getRequestData(request, bodySizeLimit = DEFAULT_BODY_SIZE_LIMIT) {
  switch (request.method) {
    case "GET": {
      const params = new URL(request.url).searchParams;
      if (!params.has("s") || !params.has("e") || !params.has("p")) return badRequest("Missing required query parameters.");
      const encryptedSlots = params.get("s");
      return {
        encryptedComponentExport: params.get("e"),
        encryptedProps: params.get("p"),
        encryptedSlots
      };
    }
    case "POST":
      try {
        const body = await readBodyWithLimit(request, bodySizeLimit);
        const raw = new TextDecoder().decode(body);
        const data = JSON.parse(raw);
        if (Object.hasOwn(data, "slots") && typeof data.slots === "object") return badRequest("Plaintext slots are not allowed. Slots must be encrypted.");
        if (Object.hasOwn(data, "componentExport") && typeof data.componentExport === "string") return badRequest("Plaintext componentExport is not allowed. componentExport must be encrypted.");
        return data;
      } catch (e2) {
        if (e2 instanceof BodySizeLimitError) return new Response(null, {
          status: 413,
          statusText: e2.message
        });
        if (e2 instanceof SyntaxError) return badRequest("Request format is invalid.");
        throw e2;
      }
    default:
      return new Response(null, { status: 405 });
  }
}
__name(getRequestData, "getRequestData");
function createEndpoint(manifest2) {
  const page3 = /* @__PURE__ */ __name(async (result) => {
    const params = result.params;
    if (!params.name) return new Response(null, {
      status: 400,
      statusText: "Bad request"
    });
    const componentId = params.name;
    const data = await getRequestData(result.request, manifest2.serverIslandBodySizeLimit);
    if (data instanceof Response) return data;
    let imp = (await (await manifest2.serverIslandMappings?.())?.serverIslandMap)?.get(componentId);
    if (!imp) return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
    const key = await manifest2.key;
    let componentExport;
    try {
      componentExport = await decryptString(key, data.encryptedComponentExport, `export:${componentId}`);
    } catch (_e) {
      return badRequest("Encrypted componentExport value is invalid.");
    }
    const encryptedProps = data.encryptedProps;
    let props = {};
    if (encryptedProps !== "") try {
      const propString = await decryptString(key, encryptedProps, `props:${componentId}`);
      props = JSON.parse(propString);
    } catch (_e) {
      return badRequest("Encrypted props value is invalid.");
    }
    let decryptedSlots = {};
    const encryptedSlots = data.encryptedSlots;
    if (encryptedSlots !== "") try {
      const slotsString = await decryptString(key, encryptedSlots, `slots:${componentId}`);
      decryptedSlots = JSON.parse(slotsString);
    } catch (_e) {
      return badRequest("Encrypted slots value is invalid.");
    }
    let Component = (await imp())[componentExport];
    const slots = {};
    for (const prop in decryptedSlots) slots[prop] = createSlotValueFromString(decryptedSlots[prop]);
    result.response.headers.set("X-Robots-Tag", "noindex");
    if (isAstroComponentFactory(Component)) {
      const ServerIsland = Component;
      Component = /* @__PURE__ */ __name(function(...args) {
        return ServerIsland.apply(this, args);
      }, "Component");
      Object.assign(Component, ServerIsland);
      Component.propagation = "self";
    }
    result._metadata.routeHasPropagation = true;
    const renderPropagatedHead = /* @__PURE__ */ __name(() => markHTMLString(result._metadata.extraHead.join("")), "renderPropagatedHead");
    return renderTemplate`${renderPropagatedHead}${renderComponent(result, "Component", Component, props, slots)}`;
  }, "page");
  page3.isAstroComponentFactory = true;
  return {
    default: page3,
    partial: true
  };
}
__name(createEndpoint, "createEndpoint");
var { replace } = "";
var ca = /[&<>'"]/g;
var esca = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;"
};
var pe = /* @__PURE__ */ __name((m) => esca[m], "pe");
var escape = /* @__PURE__ */ __name((es) => replace.call(es, ca, pe), "escape");
function template({ title, pathname, statusCode = 404, tabTitle, body }) {
  return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>${tabTitle}</title>
		<style>
			:root {
				--gray-10: hsl(258, 7%, 10%);
				--gray-20: hsl(258, 7%, 20%);
				--gray-30: hsl(258, 7%, 30%);
				--gray-40: hsl(258, 7%, 40%);
				--gray-50: hsl(258, 7%, 50%);
				--gray-60: hsl(258, 7%, 60%);
				--gray-70: hsl(258, 7%, 70%);
				--gray-80: hsl(258, 7%, 80%);
				--gray-90: hsl(258, 7%, 90%);
				--black: #13151A;
				--accent-light: #E0CCFA;
			}

			* {
				box-sizing: border-box;
			}

			html {
				background: var(--black);
				color-scheme: dark;
				accent-color: var(--accent-light);
			}

			body {
				background-color: var(--gray-10);
				color: var(--gray-80);
				font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
				line-height: 1.5;
				margin: 0;
			}

			a {
				color: var(--accent-light);
			}

			.center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}

			h1 {
				margin-bottom: 8px;
				color: white;
				font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-weight: 700;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.statusCode {
				color: var(--accent-light);
			}

			.astro-icon {
				height: 124px;
				width: 124px;
			}

			pre, code {
				padding: 2px 8px;
				background: rgba(0,0,0, 0.25);
				border: 1px solid rgba(255,255,255, 0.25);
				border-radius: 4px;
				font-size: 1.2em;
				margin-top: 0;
				max-width: 60em;
			}
		</style>
	</head>
	<body>
		<main class="center">
			<svg class="astro-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" fill="none"> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="white"/> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="url(#paint0_linear_738_686)"/> <path d="M0 51.6401C0 51.6401 10.6488 46.4654 21.3274 46.4654L29.3786 21.6102C29.6801 20.4082 30.5602 19.5913 31.5538 19.5913C32.5474 19.5913 33.4275 20.4082 33.7289 21.6102L41.7802 46.4654C54.4274 46.4654 63.1076 51.6401 63.1076 51.6401C63.1076 51.6401 45.0197 2.48776 44.9843 2.38914C44.4652 0.935933 43.5888 0 42.4073 0H20.7022C19.5206 0 18.6796 0.935933 18.1251 2.38914C18.086 2.4859 0 51.6401 0 51.6401Z" fill="white"/> <defs> <linearGradient id="paint0_linear_738_686" x1="31.554" y1="75.4423" x2="39.7462" y2="48.376" gradientUnits="userSpaceOnUse"> <stop stop-color="#D83333"/> <stop offset="1" stop-color="#F041FF"/> </linearGradient> </defs> </svg>
			<h1>${statusCode ? `<span class="statusCode">${statusCode}: </span> ` : ""}<span class="statusMessage">${title}</span></h1>
			${body || `
				<pre>Path: ${escape(pathname)}</pre>
			`}
			</main>
	</body>
</html>`;
}
__name(template, "template");
var DEFAULT_404_ROUTE = {
  component: DEFAULT_404_COMPONENT,
  params: [],
  pattern: /^\/404\/?$/,
  prerender: false,
  pathname: "/404",
  segments: [[{
    content: "404",
    dynamic: false,
    spread: false
  }]],
  type: "page",
  route: "/404",
  fallbackRoutes: [],
  isIndex: false,
  origin: "internal",
  distURL: []
};
async function default404Page({ pathname }) {
  return new Response(template({
    statusCode: 404,
    title: "Not found",
    tabTitle: "404: Not Found",
    pathname
  }), {
    status: 404,
    headers: { "Content-Type": "text/html" }
  });
}
__name(default404Page, "default404Page");
default404Page.isAstroComponentFactory = true;
var default404Instance = { default: default404Page };
function createDefaultRoutes(manifest2) {
  const root = new URL(manifest2.rootDir);
  return [{
    instance: default404Instance,
    matchesComponent: /* @__PURE__ */ __name((filePath) => filePath.href === new URL(DEFAULT_404_COMPONENT, root).href, "matchesComponent"),
    route: DEFAULT_404_ROUTE.route,
    component: DEFAULT_404_COMPONENT
  }, {
    instance: createEndpoint(manifest2),
    matchesComponent: /* @__PURE__ */ __name((filePath) => filePath.href === new URL(SERVER_ISLAND_COMPONENT, root).href, "matchesComponent"),
    route: SERVER_ISLAND_ROUTE,
    component: SERVER_ISLAND_COMPONENT
  }];
}
__name(createDefaultRoutes, "createDefaultRoutes");
var defaultRoutesMemo = createManifestMemo(createDefaultRoutes);
function getDefaultRoutes(manifest2) {
  return defaultRoutesMemo.get(manifest2);
}
__name(getDefaultRoutes, "getDefaultRoutes");
var loggers = /* @__PURE__ */ new WeakMap();
function getLogger(manifest2) {
  let logger = loggers.get(manifest2);
  if (!logger) {
    logger = createConsoleLogger({ level: manifest2.logLevel });
    loggers.set(manifest2, logger);
  }
  return logger;
}
__name(getLogger, "getLogger");
var resolvedLogger = createAsyncManifestMemo(async (manifest2) => {
  const logger = getLogger(manifest2);
  try {
    const destination = (await manifest2.logger?.())?.default;
    if (destination) logger.setDestination(destination);
  } catch (error3) {
    logger.error("config", "Failed to load the configured logger destination; continuing with the console logger.\n" + (error3 instanceof Error ? error3.stack ?? error3.message : String(error3)));
  }
  return logger;
});
function getResolvedLogger(manifest2) {
  return resolvedLogger.get(manifest2);
}
__name(getResolvedLogger, "getResolvedLogger");
function createRewriteRouteValidator(manifest2, getComponentByRoute2) {
  return async (route, pathname) => {
    try {
      await getProps({
        mod: await getComponentByRoute2(manifest2, route),
        routeData: route,
        routeCache: getRouteCache(manifest2),
        pathname,
        logger: getLogger(manifest2),
        serverLike: manifest2.serverLike,
        base: manifest2.base,
        trailingSlash: manifest2.trailingSlash
      });
      return true;
    } catch (e2) {
      if (isAstroError(e2) && e2.title === NoMatchingStaticPathFound.title) return false;
      throw e2;
    }
  };
}
__name(createRewriteRouteValidator, "createRewriteRouteValidator");
function createRequest({ url, headers, method = "GET", body = void 0, logger, isPrerendered = false, routePattern, init }) {
  const headersObj = isPrerendered ? void 0 : headers instanceof Headers ? headers : new Headers(Object.entries(headers).filter(([name]) => !name.startsWith(":")));
  if (typeof url === "string") url = new URL(url);
  if (isPrerendered) url.search = "";
  const request = new Request(url, {
    method,
    headers: headersObj,
    body: isPrerendered ? null : body,
    ...init
  });
  if (isPrerendered) {
    let _headers = request.headers;
    const { value, writable, ...headersDesc } = Object.getOwnPropertyDescriptor(request, "headers") || {};
    Object.defineProperty(request, "headers", {
      ...headersDesc,
      get() {
        logger.warn(null, `\`Astro.request.headers\` was used when rendering the route \`${routePattern}'\`. \`Astro.request.headers\` is not available on prerendered pages. If you need access to request headers, make sure that the page is server-rendered using \`export const prerender = false;\` or by setting \`output\` to \`"server"\` in your Astro config to make all your pages server-rendered by default.`);
        return _headers;
      },
      set(newHeaders) {
        _headers = newHeaders;
      }
    });
  }
  return request;
}
__name(createRequest, "createRequest");
var MultiLevelEncodingError = class extends Error {
  static {
    __name(this, "MultiLevelEncodingError");
  }
  constructor() {
    super("URL encoding depth exceeded the maximum number of decode iterations");
    this.name = "MultiLevelEncodingError";
  }
};
var MAX_DECODE_ITERATIONS = 10;
function validateAndDecodePathname(pathname) {
  let decoded;
  try {
    decoded = decodeURI(pathname);
  } catch (_e) {
    throw new Error("Invalid URL encoding");
  }
  let iterations = 0;
  while (decoded !== pathname) {
    if (iterations >= MAX_DECODE_ITERATIONS) throw new MultiLevelEncodingError();
    pathname = decoded;
    try {
      decoded = decodeURI(pathname);
    } catch {
      break;
    }
    iterations++;
  }
  return decoded;
}
__name(validateAndDecodePathname, "validateAndDecodePathname");
async function findRouteToRewrite({ payload, routes, request, trailingSlash, buildFormat, base, outDir, validate: validate2 }) {
  let newUrl = void 0;
  if (payload instanceof URL) newUrl = payload;
  else if (payload instanceof Request) newUrl = new URL(payload.url);
  else newUrl = new URL(collapseDuplicateSlashes(payload), new URL(request.url).origin);
  const { pathname, resolvedUrlPathname } = normalizeRewritePathname(newUrl.pathname, base, trailingSlash, buildFormat);
  newUrl.pathname = resolvedUrlPathname;
  const decodedPathname = validateAndDecodePathname(pathname);
  if (isRoute404(decodedPathname)) {
    const errorRoute = routes.find((route) => isRoute404(route.route));
    if (errorRoute) return {
      routeData: errorRoute,
      newUrl,
      pathname: decodedPathname
    };
  }
  if (isRoute500(decodedPathname)) {
    const errorRoute = routes.find((route) => isRoute500(route.route));
    if (errorRoute) return {
      routeData: errorRoute,
      newUrl,
      pathname: decodedPathname
    };
  }
  let foundRoute;
  let firstValidationError = null;
  for (const route of routes) if (route.pattern.test(decodedPathname)) {
    if (route.params && route.params.length !== 0) {
      if (route.distURL && route.distURL.length !== 0) {
        if (!route.distURL.find((url) => url.href.replace(outDir.toString(), "").replace(/(?:\/index\.html|\.html)$/, "") === trimSlashes(pathname))) continue;
      } else {
        let ownsPathname;
        try {
          ownsPathname = await validate2(route, decodedPathname);
        } catch (error3) {
          firstValidationError ??= error3;
          continue;
        }
        if (!ownsPathname) continue;
      }
    }
    foundRoute = route;
    break;
  }
  if (foundRoute) return {
    routeData: foundRoute,
    newUrl,
    pathname: decodedPathname
  };
  else if (firstValidationError) throw firstValidationError;
  else {
    const custom404 = routes.find((route) => isRoute404(route.route));
    if (custom404) return {
      routeData: custom404,
      newUrl,
      pathname
    };
    else return {
      routeData: DEFAULT_404_ROUTE,
      newUrl,
      pathname
    };
  }
}
__name(findRouteToRewrite, "findRouteToRewrite");
function copyRequest(newUrl, oldRequest, isPrerendered, logger, routePattern) {
  const canHaveBody = oldRequest.method !== "GET" && oldRequest.method !== "HEAD";
  if (canHaveBody && oldRequest.bodyUsed) throw new AstroError(RewriteWithBodyUsed);
  return createRequest({
    url: newUrl,
    method: oldRequest.method,
    body: canHaveBody ? oldRequest.body : void 0,
    isPrerendered,
    logger,
    headers: isPrerendered ? {} : oldRequest.headers,
    routePattern,
    init: {
      referrer: oldRequest.referrer,
      referrerPolicy: oldRequest.referrerPolicy,
      mode: oldRequest.mode,
      credentials: oldRequest.credentials,
      cache: oldRequest.cache,
      redirect: oldRequest.redirect,
      integrity: oldRequest.integrity,
      signal: oldRequest.signal,
      keepalive: oldRequest.keepalive,
      duplex: "half"
    }
  });
}
__name(copyRequest, "copyRequest");
function setOriginPathname(request, pathname, trailingSlash, buildFormat) {
  if (!pathname) pathname = "/";
  const shouldAppendSlash = shouldAppendForwardSlash(trailingSlash, buildFormat);
  let finalPathname;
  if (pathname === "/") finalPathname = "/";
  else if (shouldAppendSlash) finalPathname = appendForwardSlash(pathname);
  else finalPathname = removeTrailingForwardSlash(pathname);
  Reflect.set(request, originPathnameSymbol, encodeURIComponent(finalPathname));
}
__name(setOriginPathname, "setOriginPathname");
function getOriginPathname(request) {
  const origin = Reflect.get(request, originPathnameSymbol);
  if (origin) return decodeURIComponent(origin);
  return new URL(request.url).pathname;
}
__name(getOriginPathname, "getOriginPathname");
function normalizeRewritePathname(urlPathname, base, trailingSlash, buildFormat) {
  let pathname = collapseDuplicateSlashes(urlPathname);
  const shouldAppendSlash = shouldAppendForwardSlash(trailingSlash, buildFormat);
  if (base !== "/") {
    if (urlPathname === base || urlPathname === removeTrailingForwardSlash(base)) pathname = "/";
    else if (urlPathname.startsWith(base)) {
      pathname = shouldAppendSlash ? appendForwardSlash(urlPathname) : removeTrailingForwardSlash(urlPathname);
      pathname = pathname.slice(base.length);
    }
  }
  if (!pathname.startsWith("/") && shouldAppendSlash && urlPathname.endsWith("/")) pathname = prependForwardSlash(pathname);
  if (buildFormat === "file") pathname = pathname.replace(/\.html$/, "");
  let resolvedUrlPathname;
  if (base !== "/" && (pathname === "" || pathname === "/") && !shouldAppendSlash) resolvedUrlPathname = removeTrailingForwardSlash(base);
  else resolvedUrlPathname = joinPaths(...[base, pathname].filter(Boolean));
  return {
    pathname,
    resolvedUrlPathname
  };
}
__name(normalizeRewritePathname, "normalizeRewritePathname");
async function getModuleForRoute(manifest2, route) {
  for (const defaultRoute of getDefaultRoutes(manifest2)) if (route.component === defaultRoute.component) return { page: /* @__PURE__ */ __name(() => Promise.resolve(defaultRoute.instance), "page") };
  let routeToProcess = route;
  if (routeIsRedirect(route)) {
    if (route.redirectRoute) routeToProcess = route.redirectRoute;
    else return RedirectSinglePageBuiltModule;
  } else if (routeIsFallback(route)) routeToProcess = getFallbackRoute(route, manifest2.routes);
  if (manifest2.pageMap) {
    const importComponentInstance = manifest2.pageMap.get(routeToProcess.component);
    if (!importComponentInstance) throw new Error(`Unexpectedly unable to find a component instance for route ${route.route}`);
    return await importComponentInstance();
  } else if (manifest2.pageModule) return manifest2.pageModule;
  throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
}
__name(getModuleForRoute, "getModuleForRoute");
async function getComponentByRoute(manifest2, routeData) {
  return (await getModuleForRoute(manifest2, routeData)).page();
}
__name(getComponentByRoute, "getComponentByRoute");
var productionEnvironment = {
  name: "production",
  runtimeMode: "production",
  defaultStreaming: /* @__PURE__ */ __name(() => true, "defaultStreaming"),
  async resolve(manifest2, specifier) {
    if (!(specifier in manifest2.entryModules)) throw new Error(`Unable to resolve [${specifier}]`);
    const bundlePath = manifest2.entryModules[specifier];
    if (bundlePath.startsWith("data:") || bundlePath.length === 0) return bundlePath;
    else return createAssetLink(bundlePath, manifest2.base, manifest2.assetsPrefix);
  },
  async headElements(manifest2, routeData) {
    const { assetsPrefix, base } = manifest2;
    const routeInfo = manifest2.routes.find((route) => route.routeData.route === routeData.route);
    const links = /* @__PURE__ */ new Set();
    const scripts = /* @__PURE__ */ new Set();
    const styles = createStylesheetElementSet(routeInfo?.styles ?? [], base, assetsPrefix);
    for (const script of routeInfo?.scripts ?? []) if ("stage" in script) {
      if (script.stage === "head-inline") scripts.add({
        props: {},
        children: script.children
      });
    } else scripts.add(createModuleScriptElement(script, base, assetsPrefix));
    return {
      links,
      styles,
      scripts
    };
  },
  componentMetadata() {
  },
  getComponentByRoute,
  getModuleForRoute,
  async tryRewrite(manifest2, payload, request) {
    const { newUrl, pathname, routeData } = await findRouteToRewrite({
      payload,
      request,
      routes: manifest2.routes.map((r2) => r2.routeData),
      trailingSlash: manifest2.trailingSlash,
      buildFormat: manifest2.buildFormat,
      base: manifest2.base,
      outDir: manifest2.serverLike ? manifest2.buildClientDir : manifest2.outDir,
      validate: createRewriteRouteValidator(manifest2, getComponentByRoute)
    });
    return {
      newUrl,
      pathname,
      componentInstance: await getComponentByRoute(manifest2, routeData),
      routeData
    };
  },
  getRenderers(manifest2) {
    return manifest2.renderers;
  },
  errorStrategy: "default",
  rendersRedirectPage: /* @__PURE__ */ __name(() => false, "rendersRedirectPage"),
  injectCspMetaTagsOnErrorPages: false,
  logRequest() {
  }
};
var environments = /* @__PURE__ */ new WeakMap();
function getEnvironment(manifest2) {
  return environments.get(manifest2) ?? productionEnvironment;
}
__name(getEnvironment, "getEnvironment");
function sanitizeParams(params) {
  return Object.fromEntries(Object.entries(params).map(([key, value]) => {
    if (typeof value === "string") return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
    return [key, value];
  }));
}
__name(sanitizeParams, "sanitizeParams");
function getParameter(part, params) {
  if (part.spread) return params[part.content.slice(3)] ?? "";
  if (part.dynamic) {
    if (params[part.content] === void 0) throw new TypeError(`Missing parameter: ${part.content}`);
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
__name(getParameter, "getParameter");
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? collapseDuplicateLeadingSlashes("/" + segmentPath) : "";
}
__name(getSegment, "getSegment");
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) trailing = "/";
    return segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing || "/";
  };
}
__name(getRouteGenerator, "getRouteGenerator");
var VALID_PARAM_TYPES = ["string", "undefined"];
function validateGetStaticPathsParameter([key, value], route) {
  if (!VALID_PARAM_TYPES.includes(typeof value)) throw new AstroError({
    ...GetStaticPathsInvalidRouteParam,
    message: GetStaticPathsInvalidRouteParam.message(key, value, typeof value),
    location: { file: route }
  });
}
__name(validateGetStaticPathsParameter, "validateGetStaticPathsParameter");
function stringifyParams(params, route, trailingSlash) {
  if (route.type === "endpoint" && hasFileExtension(route.route)) trailingSlash = "never";
  const validatedParams = {};
  for (const [key, value] of Object.entries(params)) {
    validateGetStaticPathsParameter([key, value], route.component);
    if (value !== void 0) validatedParams[key] = trimSlashes(value);
  }
  return getRouteGenerator(route.segments, trailingSlash)(validatedParams);
}
__name(stringifyParams, "stringifyParams");
function validateDynamicRouteModule(mod, { ssr, route }) {
  if ((!ssr || route.prerender) && route.origin !== "internal" && !mod.getStaticPaths) throw new AstroError({
    ...GetStaticPathsRequired,
    location: { file: route.component }
  });
}
__name(validateDynamicRouteModule, "validateDynamicRouteModule");
function validateGetStaticPathsResult(result, route) {
  if (!Array.isArray(result)) throw new AstroError({
    ...InvalidGetStaticPathsReturn,
    message: InvalidGetStaticPathsReturn.message(typeof result),
    location: { file: route.component }
  });
  result.forEach((pathObject) => {
    if (typeof pathObject === "object" && Array.isArray(pathObject) || pathObject === null) throw new AstroError({
      ...InvalidGetStaticPathsEntry,
      message: InvalidGetStaticPathsEntry.message(Array.isArray(pathObject) ? "array" : typeof pathObject)
    });
    if (pathObject.params === void 0 || pathObject.params === null || pathObject.params && Object.keys(pathObject.params).length === 0) throw new AstroError({
      ...GetStaticPathsExpectedParams,
      location: { file: route.component }
    });
  });
}
__name(validateGetStaticPathsResult, "validateGetStaticPathsResult");
function generatePaginateFunction(routeMatch, base, trailingSlash) {
  return /* @__PURE__ */ __name(function paginateUtility(data, args = {}) {
    const generate = getRouteGenerator(routeMatch.segments, trailingSlash);
    let { pageSize: _pageSize, params: _params, props: _props, format: _format } = args;
    const pageSize = _pageSize || 10;
    const paramName = "page";
    const additionalParams = _params || {};
    const additionalProps = _props || {};
    const formatUrl = _format || ((url) => url);
    let includesFirstPageNumber;
    if (routeMatch.params.includes(`...${paramName}`)) includesFirstPageNumber = false;
    else if (routeMatch.params.includes(`${paramName}`)) includesFirstPageNumber = true;
    else throw new AstroError({
      ...PageNumberParamNotFound,
      message: PageNumberParamNotFound.message(paramName)
    });
    const lastPage = Math.max(1, Math.ceil(data.length / pageSize));
    return [...Array(lastPage).keys()].map((num) => {
      const pageNum = num + 1;
      const start = pageSize === Number.POSITIVE_INFINITY ? 0 : (pageNum - 1) * pageSize;
      const end = Math.min(start + pageSize, data.length);
      const params = {
        ...additionalParams,
        [paramName]: includesFirstPageNumber || pageNum > 1 ? String(pageNum) : void 0
      };
      const current = formatUrl(addRouteBase(generate({ ...params }), base));
      const next = pageNum === lastPage ? void 0 : formatUrl(addRouteBase(generate({
        ...params,
        page: String(pageNum + 1)
      }), base));
      const prev = pageNum === 1 ? void 0 : formatUrl(addRouteBase(generate({
        ...params,
        page: !includesFirstPageNumber && pageNum - 1 === 1 ? void 0 : String(pageNum - 1)
      }), base));
      const first = pageNum === 1 ? void 0 : formatUrl(addRouteBase(generate({
        ...params,
        page: includesFirstPageNumber ? "1" : void 0
      }), base));
      const last = pageNum === lastPage ? void 0 : formatUrl(addRouteBase(generate({
        ...params,
        page: String(lastPage)
      }), base));
      return {
        params,
        props: {
          ...additionalProps,
          page: {
            data: data.slice(start, end),
            start,
            end: end - 1,
            size: pageSize,
            total: data.length,
            currentPage: pageNum,
            lastPage,
            url: {
              current,
              next,
              prev,
              first,
              last
            }
          }
        }
      };
    });
  }, "paginateUtility");
}
__name(generatePaginateFunction, "generatePaginateFunction");
function addRouteBase(route, base) {
  let routeWithBase = joinPaths(base, route);
  if (routeWithBase === "") routeWithBase = "/";
  return routeWithBase;
}
__name(addRouteBase, "addRouteBase");
async function callGetStaticPaths({ mod, route, routeCache, ssr, base, trailingSlash }) {
  const cached2 = routeCache.get(route);
  if (!mod) throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
  if (cached2?.staticPaths && cached2.mod === mod) return cached2.staticPaths;
  validateDynamicRouteModule(mod, {
    ssr,
    route
  });
  if (ssr && !route.prerender || route.origin === "internal") {
    const entry = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
    routeCache.set(route, {
      ...cached2,
      mod,
      staticPaths: entry
    });
    return entry;
  }
  const keyedStaticPaths = await computeStaticPaths(mod, route, base, trailingSlash);
  routeCache.set(route, {
    mod,
    staticPaths: keyedStaticPaths
  });
  return keyedStaticPaths;
}
__name(callGetStaticPaths, "callGetStaticPaths");
function completeStaticPaths({ route, routeCache, base, trailingSlash }) {
  const cached2 = routeCache.get(route);
  if (!cached2?.partial) return void 0;
  cached2.complete ??= computeStaticPaths(cached2.mod, route, base, trailingSlash).then((staticPaths) => {
    routeCache.set(route, {
      mod: cached2.mod,
      staticPaths
    });
    return staticPaths;
  });
  return cached2.complete;
}
__name(completeStaticPaths, "completeStaticPaths");
async function computeStaticPaths(mod, route, base, trailingSlash) {
  let staticPaths = [];
  if (!mod.getStaticPaths) throw new Error("Unexpected Error.");
  staticPaths = await mod.getStaticPaths({
    paginate: generatePaginateFunction(route, base, trailingSlash),
    routePattern: route.route
  });
  validateGetStaticPathsResult(staticPaths, route);
  const keyedStaticPaths = staticPaths;
  keyedStaticPaths.keyed = /* @__PURE__ */ new Map();
  for (const sp of keyedStaticPaths) {
    const paramsKey = stringifyParams(sp.params, route, trailingSlash);
    keyedStaticPaths.keyed.set(paramsKey, sp);
  }
  return keyedStaticPaths;
}
__name(computeStaticPaths, "computeStaticPaths");
var RouteCache = class {
  static {
    __name(this, "RouteCache");
  }
  logger;
  cache = {};
  runtimeMode;
  constructor(logger, runtimeMode = "production") {
    this.logger = logger;
    this.runtimeMode = runtimeMode;
  }
  /** Clear the cache. */
  clearAll() {
    this.cache = {};
  }
  set(route, entry) {
    const key = this.key(route);
    const existing = this.cache[key];
    if (this.runtimeMode === "production" && existing?.staticPaths && !existing.partial) this.logger.warn(null, `Internal Warning: route cache overwritten. (${key})`);
    this.cache[key] = entry;
  }
  get(route) {
    return this.cache[this.key(route)];
  }
  key(route) {
    return `${route.route}_${route.component}`;
  }
};
var routeCaches = createManifestMemo((manifest2) => new RouteCache(getLogger(manifest2), getEnvironment(manifest2).runtimeMode));
function getRouteCache(manifest2) {
  return routeCaches.get(manifest2);
}
__name(getRouteCache, "getRouteCache");
function findPathItemByKey(staticPaths, params, route, logger, trailingSlash) {
  const paramsKey = stringifyParams(params, route, trailingSlash);
  const matchedStaticPath = staticPaths.keyed.get(paramsKey);
  if (matchedStaticPath) return matchedStaticPath;
  logger.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${paramsKey}`);
}
__name(findPathItemByKey, "findPathItemByKey");
async function getProps(opts) {
  const { logger, mod, routeData: route, routeCache, pathname, serverLike, base, trailingSlash } = opts;
  if (!route || route.pathname) return {};
  if (routeIsRedirect(route) || routeIsFallback(route) || route.component === "astro-default-404.astro") return {};
  const getStaticPathsOptions = {
    mod,
    route,
    routeCache,
    ssr: serverLike,
    base,
    trailingSlash
  };
  const staticPaths = await callGetStaticPaths(getStaticPathsOptions);
  const params = getParams(route, pathname);
  let matchedStaticPath = findPathItemByKey(staticPaths, params, route, logger, trailingSlash);
  if (!matchedStaticPath) {
    const allStaticPaths = await completeStaticPaths(getStaticPathsOptions);
    if (allStaticPaths) matchedStaticPath = findPathItemByKey(allStaticPaths, params, route, logger, trailingSlash);
  }
  if (!matchedStaticPath && route.origin !== "internal" && (serverLike ? route.prerender : true)) throw new AstroError({
    ...NoMatchingStaticPathFound,
    message: NoMatchingStaticPathFound.message(pathname),
    hint: NoMatchingStaticPathFound.hint([route.component])
  });
  if (mod) validatePrerenderEndpointCollision(route, mod, params);
  return matchedStaticPath?.props ? { ...matchedStaticPath.props } : {};
}
__name(getProps, "getProps");
function getParams(route, pathname) {
  if (!route.params.length) return {};
  const hasHtmlSuffix = pathname.endsWith(".html") && !routeHasHtmlExtension(route);
  const path = hasHtmlSuffix && route.type === "page" ? pathname.slice(0, -5) : pathname;
  const allPatterns = [route, ...route.fallbackRoutes].map((r2) => r2.pattern);
  let paramsMatch = allPatterns.map((pattern) => pattern.exec(path)).find((x) => x);
  if (!paramsMatch && hasHtmlSuffix && route.type !== "page") {
    const strippedPath = pathname.endsWith("/index.html") ? pathname.slice(0, -11) || "/" : pathname.slice(0, -5);
    paramsMatch = allPatterns.map((pattern) => pattern.exec(strippedPath)).find((x) => x);
  }
  if (!paramsMatch) return {};
  const params = {};
  route.params.forEach((key, i2) => {
    if (key.startsWith("...")) params[key.slice(3)] = paramsMatch[i2 + 1] ? paramsMatch[i2 + 1] : void 0;
    else params[key] = paramsMatch[i2 + 1];
  });
  return params;
}
__name(getParams, "getParams");
function validatePrerenderEndpointCollision(route, mod, params) {
  if (route.type === "endpoint" && mod.getStaticPaths) {
    const lastSegment = route.segments[route.segments.length - 1];
    const paramValues = Object.values(params);
    const lastParam = paramValues[paramValues.length - 1];
    if (lastSegment.length === 1 && lastSegment[0].dynamic && lastParam === void 0) throw new AstroError({
      ...PrerenderDynamicEndpointPathCollide,
      message: PrerenderDynamicEndpointPathCollide.message(route.route),
      hint: PrerenderDynamicEndpointPathCollide.hint(route.component),
      location: { file: route.component }
    });
  }
}
__name(validatePrerenderEndpointCollision, "validatePrerenderEndpointCollision");
function getFunctionExpression(slot) {
  if (!slot) return;
  const expressions = slot?.expressions?.filter((e2) => isRenderInstruction(e2) === false || isRenderTemplateResult(e2));
  if (expressions?.length !== 1) return;
  const expression = expressions[0];
  if (isRenderTemplateResult(expression)) return getFunctionExpression(expression);
  return expression;
}
__name(getFunctionExpression, "getFunctionExpression");
var Slots = class {
  static {
    __name(this, "Slots");
  }
  #result;
  #slots;
  #logger;
  constructor(result, slots, logger) {
    this.#result = result;
    this.#slots = slots;
    this.#logger = logger;
    if (slots) for (const key of Object.keys(slots)) {
      if (this[key] !== void 0) throw new AstroError({
        ...ReservedSlotName,
        message: ReservedSlotName.message(key)
      });
      Object.defineProperty(this, key, {
        get() {
          return true;
        },
        enumerable: true
      });
    }
  }
  has(name) {
    if (!this.#slots) return false;
    return Boolean(this.#slots[name]);
  }
  async render(name, args = []) {
    if (!this.#slots || !this.has(name)) return;
    const result = this.#result;
    if (!Array.isArray(args)) this.#logger.warn(null, `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
    else if (args.length > 0) {
      const slotValue = this.#slots[name];
      const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
      const expression = getFunctionExpression(component);
      if (expression) {
        const slot = /* @__PURE__ */ __name(async () => typeof expression === "function" ? expression(...args) : expression, "slot");
        return await renderSlotToString(result, slot).then((res) => {
          return res;
        });
      }
      if (typeof component === "function") return await renderJSX(result, component(...args)).then((res) => res != null ? String(res) : res);
    }
    const content = await renderSlotToString(result, this.#slots[name]);
    return chunkToString(result, content);
  }
};
function computeFallbackRoute(options) {
  const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy } = options;
  if (responseStatus !== 404) return { type: "none" };
  if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
  const segments = pathname.split("/");
  const urlLocale = segments.find((segment) => {
    for (const locale of locales) if (typeof locale === "string") {
      if (locale === segment) return true;
    } else if (locale.path === segment) return true;
    return false;
  });
  if (!urlLocale) return { type: "none" };
  if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
  const fallbackLocale = fallback[urlLocale];
  const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
  const localeIndex = segments.indexOf(urlLocale);
  let newPathname;
  if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
    segments.splice(localeIndex, 1);
    newPathname = segments.join("/") || "/";
  } else {
    segments[localeIndex] = pathFallbackLocale;
    newPathname = segments.join("/");
  }
  return {
    type: fallbackType,
    pathname: newPathname
  };
}
__name(computeFallbackRoute, "computeFallbackRoute");
var I18nRouter = class {
  static {
    __name(this, "I18nRouter");
  }
  #strategy;
  #defaultLocale;
  #locales;
  #base;
  #domains;
  constructor(options) {
    this.#strategy = options.strategy;
    this.#defaultLocale = options.defaultLocale;
    this.#locales = options.locales;
    this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
    this.#domains = options.domains;
  }
  /**
  * Evaluate routing strategy for a pathname.
  * Returns decision object (not HTTP Response).
  */
  match(pathname, context) {
    if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
    switch (this.#strategy) {
      case "manual":
        return { type: "continue" };
      case "pathname-prefix-always":
        return this.matchPrefixAlways(pathname, context);
      case "domains-prefix-always":
        if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
        return this.matchPrefixAlways(pathname, context);
      case "pathname-prefix-other-locales":
        return this.matchPrefixOtherLocales(pathname, context);
      case "domains-prefix-other-locales":
        if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
        return this.matchPrefixOtherLocales(pathname, context);
      case "pathname-prefix-always-no-redirect":
        return this.matchPrefixAlwaysNoRedirect(pathname, context);
      case "domains-prefix-always-no-redirect":
        if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
        return this.matchPrefixAlwaysNoRedirect(pathname, context);
      default:
        return { type: "continue" };
    }
  }
  /**
  * Check if i18n processing should be skipped for this request
  */
  shouldSkipProcessing(pathname, context) {
    for (const page3 of STATUS_CODE_PAGES) if (pathname.includes(page3)) return true;
    if (pathname.includes("/_server-islands/")) return true;
    if (context.isReroute) return true;
    if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
    return false;
  }
  /**
  * Strategy: pathname-prefix-always
  * All locales must have a prefix, including the default locale.
  */
  matchPrefixAlways(pathname, context) {
    if (pathname === this.#base + "/" || pathname === this.#base) return {
      type: "redirect",
      location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
    };
    if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
    return { type: "continue" };
  }
  /**
  * Strategy: pathname-prefix-other-locales
  * Default locale has no prefix, other locales must have a prefix.
  */
  matchPrefixOtherLocales(pathname, _context) {
    let pathnameContainsDefaultLocale = false;
    for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
      pathnameContainsDefaultLocale = true;
      break;
    }
    if (pathnameContainsDefaultLocale) return {
      type: "notFound",
      location: pathname.replace(`/${this.#defaultLocale}`, "")
    };
    return { type: "continue" };
  }
  /**
  * Strategy: pathname-prefix-always-no-redirect
  * Like prefix-always but allows root to serve instead of redirecting
  */
  matchPrefixAlwaysNoRedirect(pathname, context) {
    if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
    if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
    return { type: "continue" };
  }
  /**
  * Check if the current locale doesn't belong to the configured domain.
  * Used for domain-based routing strategies.
  */
  localeHasntDomain(currentLocale, currentDomain) {
    if (!this.#domains || !currentDomain) return false;
    if (!currentLocale) return false;
    const localesForDomain = this.#domains[currentDomain];
    if (!localesForDomain) return true;
    return !localesForDomain.includes(currentLocale);
  }
};
function compileI18n(i18n, base, trailingSlash, format) {
  return {
    config: i18n,
    base,
    trailingSlash,
    format,
    router: new I18nRouter({
      strategy: i18n.strategy,
      defaultLocale: i18n.defaultLocale,
      locales: i18n.locales,
      base,
      domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
        const locale = i18n.domainLookupTable[domain];
        if (!acc[domain]) acc[domain] = [];
        acc[domain].push(locale);
        return acc;
      }, {}) : void 0
    })
  };
}
__name(compileI18n, "compileI18n");
var i18nMemo = createManifestMemo((manifest2) => {
  const config2 = manifest2.i18n;
  return config2 && config2.strategy !== "manual" ? compileI18n(config2, manifest2.base, manifest2.trailingSlash, manifest2.buildFormat) : null;
});
function getI18n(manifest2) {
  return i18nMemo.get(manifest2);
}
__name(getI18n, "getI18n");
async function finalizeI18n(compiled, state, response) {
  markFeatureUsed(state.manifest, FetchFeatures.i18n);
  const i18n = compiled.config;
  if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
  if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
  const url = state.url;
  const currentLocale = state.computeCurrentLocale();
  const routeData = state.routeData;
  const isPrerendered = routeData.prerender;
  const routerContext = {
    currentLocale,
    currentDomain: url.hostname,
    routeType: state.responseRouteType,
    isReroute: false,
    allowUnprefixedPath: routeData.origin === "external" && !routeData.segments?.[0]?.some((part) => part.dynamic)
  };
  const routeDecision = compiled.router.match(url.pathname, routerContext);
  switch (routeDecision.type) {
    case "redirect": {
      let location = routeDecision.location;
      if (shouldAppendForwardSlash(compiled.trailingSlash, compiled.format)) location = appendForwardSlash(location);
      return new Response(null, {
        status: routeDecision.status ?? 302,
        headers: { Location: location }
      });
    }
    case "notFound": {
      if (isPrerendered) {
        const prerenderedRes = new Response(response.body, {
          status: 404,
          headers: response.headers
        });
        state.skipErrorReroute = true;
        if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
        return prerenderedRes;
      }
      const headers = new Headers();
      if (routeDecision.location) headers.set("Location", routeDecision.location);
      return new Response(null, {
        status: 404,
        headers
      });
    }
  }
  if (i18n.fallback && i18n.fallbackType) {
    const effectiveStatus = state.responseRouteType === "fallback" ? 404 : response.status;
    const fallbackDecision = computeFallbackRoute({
      pathname: url.pathname,
      responseStatus: effectiveStatus,
      currentLocale,
      fallback: i18n.fallback,
      fallbackType: i18n.fallbackType,
      locales: i18n.locales,
      defaultLocale: i18n.defaultLocale,
      strategy: i18n.strategy,
      base: compiled.base
    });
    switch (fallbackDecision.type) {
      case "redirect":
        return new Response(null, {
          status: 302,
          headers: { Location: fallbackDecision.pathname + url.search }
        });
      case "rewrite":
        try {
          return await state.rewrite(fallbackDecision.pathname + url.search);
        } catch {
          break;
        }
    }
  }
  return response;
}
__name(finalizeI18n, "finalizeI18n");
function getPathByLocale(locale, locales) {
  for (const loopLocale of locales) if (typeof loopLocale === "string") {
    if (loopLocale === locale) return loopLocale;
  } else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
  throw new AstroError(i18nNoLocaleFoundInPath);
}
__name(getPathByLocale, "getPathByLocale");
function getAllCodes(locales) {
  const result = [];
  for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
  else result.push(...loopLocale.codes);
  return result;
}
__name(getAllCodes, "getAllCodes");
function parseLocale(header) {
  if (header === "*") return [{
    locale: header,
    qualityValue: void 0
  }];
  const result = [];
  const localeValues = header.split(",").map((str) => str.trim());
  for (const localeValue of localeValues) {
    const split = localeValue.split(";").map((str) => str.trim());
    const localeName = split[0];
    const qualityValue = split[1];
    if (!split) continue;
    if (qualityValue && qualityValue.startsWith("q=")) {
      const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
      if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
        locale: localeName,
        qualityValue: void 0
      });
      else result.push({
        locale: localeName,
        qualityValue: qualityValueAsFloat
      });
    } else result.push({
      locale: localeName,
      qualityValue: void 0
    });
  }
  return result;
}
__name(parseLocale, "parseLocale");
function sortAndFilterLocales(browserLocaleList, locales) {
  const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
  return browserLocaleList.filter((browserLocale) => {
    if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
    return true;
  }).sort((a2, b) => {
    const qa = a2.locale === "*" ? a2.qualityValue ?? 0 : a2.qualityValue ?? 1;
    return (b.locale === "*" ? b.qualityValue ?? 0 : b.qualityValue ?? 1) - qa;
  });
}
__name(sortAndFilterLocales, "sortAndFilterLocales");
function computePreferredLocale(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = void 0;
  if (acceptHeader) {
    const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
    if (firstResult && firstResult.locale !== "*") {
      outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
        if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
          result = currentLocale;
          break;
        }
      } else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
        result = currentCode;
        break outer;
      }
    }
  }
  return result;
}
__name(computePreferredLocale, "computePreferredLocale");
function computePreferredLocaleList(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = [];
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
    else if (browserLocaleList.length > 0) {
      for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
        if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
      } else for (const code of loopLocale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(browserLocale.locale)) result.push(code);
    }
  }
  return result;
}
__name(computePreferredLocaleList, "computePreferredLocaleList");
function computeCurrentLocale(pathname, locales, defaultLocale) {
  for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
    if (!segment.includes(locale)) continue;
    if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
  } else if (locale.path === segment) return locale.codes.at(0);
  else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
  for (const locale of locales) if (typeof locale === "string") {
    if (locale === defaultLocale) return locale;
  } else if (locale.path === defaultLocale) return locale.codes.at(0);
}
__name(computeCurrentLocale, "computeCurrentLocale");
function computeCurrentLocaleFromParams(params, locales) {
  const byNormalizedCode = /* @__PURE__ */ new Map();
  const byPath = /* @__PURE__ */ new Map();
  for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
  else {
    byPath.set(locale.path, locale.codes[0]);
    for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
  }
  for (const value of Object.values(params)) {
    if (!value) continue;
    const pathMatch = byPath.get(value);
    if (pathMatch) return pathMatch;
    const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
    if (codeMatch) return codeMatch;
  }
}
__name(computeCurrentLocaleFromParams, "computeCurrentLocaleFromParams");
function prepareResponse(response, { addCookieHeader }) {
  if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
  Reflect.set(response, responseSentSymbol, true);
}
__name(prepareResponse, "prepareResponse");
var EMPTY_SLOTS = Object.freeze({});
async function handlePages(state, ctx) {
  const { logger, streaming } = state;
  state.resetResponseMetadata();
  let response;
  const componentInstance = await state.loadComponentInstance();
  switch (state.routeData.type) {
    case "endpoint":
      response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
      break;
    case "page": {
      const props = await state.getProps();
      const actionApiContext = state.getActionAPIContext();
      const result = await state.createResult(componentInstance, actionApiContext);
      try {
        response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
      } catch (e2) {
        result.cancelled = true;
        throw e2;
      }
      state.responseRouteType = "page";
      if (isRoute404(state.routeData.route) || isRoute500(state.routeData.route)) state.skipErrorReroute = true;
      break;
    }
    case "redirect":
      return new Response(null, {
        status: 404,
        headers: { [ASTRO_ERROR_HEADER]: "true" }
      });
    case "fallback":
      state.responseRouteType = "fallback";
      return new Response(null, { status: 500 });
  }
  const responseCookies = getCookiesFromResponse(response);
  if (responseCookies) state.cookies.merge(responseCookies);
  state.response = response;
  return response;
}
__name(handlePages, "handlePages");
function matchRoute$1(pathname, manifest2) {
  if (isRoute404(pathname)) {
    const errorRoute = manifest2.routes.find((route) => isRoute404(route.route));
    if (errorRoute) return errorRoute;
  }
  if (isRoute500(pathname)) {
    const errorRoute = manifest2.routes.find((route) => isRoute500(route.route));
    if (errorRoute) return errorRoute;
  }
  return manifest2.routes.find((route) => {
    return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
  });
}
__name(matchRoute$1, "matchRoute$1");
function isRoute404or500(route) {
  return isRoute404(route.route) || isRoute500(route.route);
}
__name(isRoute404or500, "isRoute404or500");
function isRouteServerIsland(route) {
  return route.component === SERVER_ISLAND_COMPONENT;
}
__name(isRouteServerIsland, "isRouteServerIsland");
function ensure404Route(manifest2) {
  if (!manifest2.routes.some((route) => isRoute404(route.route))) manifest2.routes.push(DEFAULT_404_ROUTE);
  return manifest2;
}
__name(ensure404Route, "ensure404Route");
function routeComparator(a2, b) {
  const commonLength = Math.min(a2.segments.length, b.segments.length);
  for (let index = 0; index < commonLength; index++) {
    const aSegment = a2.segments[index];
    const bSegment = b.segments[index];
    const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
    const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
    if (aIsStatic && bIsStatic) {
      const aContent = aSegment.map((part) => part.content).join("");
      const bContent = bSegment.map((part) => part.content).join("");
      if (aContent !== bContent) return aContent.localeCompare(bContent);
    }
    if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
    const aAllDynamic = aSegment.every((part) => part.dynamic);
    if (aAllDynamic !== bSegment.every((part) => part.dynamic)) return aAllDynamic ? 1 : -1;
    const aHasSpread = aSegment.some((part) => part.spread);
    if (aHasSpread !== bSegment.some((part) => part.spread)) return aHasSpread ? 1 : -1;
  }
  const aLength = a2.segments.length;
  const bLength = b.segments.length;
  if (aLength !== bLength) {
    const aEndsInRest = a2.segments.at(-1)?.some((part) => part.spread);
    const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
    if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
      if (aLength > bLength && aEndsInRest) return 1;
      if (bLength > aLength && bEndsInRest) return -1;
    }
    return aLength > bLength ? -1 : 1;
  }
  if (a2.type === "endpoint" !== (b.type === "endpoint")) return a2.type === "endpoint" ? -1 : 1;
  return a2.route.localeCompare(b.route);
}
__name(routeComparator, "routeComparator");
var Router = class {
  static {
    __name(this, "Router");
  }
  #routes;
  #base;
  #baseWithoutTrailingSlash;
  #buildFormat;
  #trailingSlash;
  constructor(routes, options) {
    this.#routes = [...routes].sort(routeComparator);
    this.#base = normalizeBase(options.base);
    this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
    this.#buildFormat = options.buildFormat;
    this.#trailingSlash = options.trailingSlash;
  }
  /**
  * Match an input pathname against the route list.
  * If allowWithoutBase is true, a non-base-prefixed path is still considered.
  */
  match(inputPathname, { allowWithoutBase = false } = {}) {
    const normalized = getRedirectForPathname(inputPathname);
    if (normalized.redirect) return {
      type: "redirect",
      location: normalized.redirect,
      status: 301
    };
    if (this.#base !== "/") {
      const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
      if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) return {
        type: "redirect",
        location: baseWithSlash,
        status: 301
      };
      if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) return {
        type: "redirect",
        location: this.#baseWithoutTrailingSlash,
        status: 301
      };
    }
    const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
    if (!baseResult) {
      if (!allowWithoutBase) return {
        type: "none",
        reason: "outside-base"
      };
    }
    let pathname = baseResult ?? normalized.pathname;
    if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
    const route = this.#routes.find((candidate) => {
      if (candidate.pattern.test(pathname)) return true;
      return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
    });
    if (!route) return {
      type: "none",
      reason: "no-match"
    };
    return {
      type: "match",
      route,
      params: getParams(route, pathname),
      pathname
    };
  }
  /**
  * Returns all routes that match the given pathname, in priority order.
  * Used when the first match (e.g. a prerendered route) cannot serve
  * the request and subsequent matches need to be tried.
  */
  matchAll(inputPathname, { allowWithoutBase = false } = {}) {
    const normalized = getRedirectForPathname(inputPathname);
    if (normalized.redirect) return [];
    const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
    if (!baseResult && !allowWithoutBase) return [];
    let pathname = baseResult ?? normalized.pathname;
    if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
    return this.#routes.filter((candidate) => {
      if (candidate.pattern.test(pathname)) return true;
      return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
    });
  }
};
function normalizeBase(base) {
  if (!base) return "/";
  if (base === "/") return base;
  return prependForwardSlash(base);
}
__name(normalizeBase, "normalizeBase");
function getRedirectForPathname(pathname) {
  let value = prependForwardSlash(pathname);
  if (value.startsWith("//")) return {
    pathname: value,
    redirect: `/${value.replace(/^\/+/, "")}`
  };
  return { pathname: value };
}
__name(getRedirectForPathname, "getRedirectForPathname");
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
  if (base === "/") return pathname;
  const baseWithSlash = `${baseWithoutTrailingSlash}/`;
  if (pathname === baseWithoutTrailingSlash || pathname === base) return trailingSlash === "always" ? null : "/";
  if (pathname === baseWithSlash) return trailingSlash === "never" ? null : "/";
  if (pathname.startsWith(baseWithSlash)) return pathname.slice(baseWithoutTrailingSlash.length);
  return null;
}
__name(stripBase, "stripBase");
function normalizeFileFormatPathname(pathname) {
  if (pathname.endsWith("/index.html")) {
    const trimmed = pathname.slice(0, -11);
    return trimmed === "" ? "/" : trimmed;
  }
  if (pathname.endsWith(".html")) {
    const trimmed = pathname.slice(0, -5);
    return trimmed === "" ? "/" : trimmed;
  }
  return pathname;
}
__name(normalizeFileFormatPathname, "normalizeFileFormatPathname");
function compileRouteTable(manifest2, routes) {
  const routesList = ensure404Route({ routes });
  const router = new Router(routesList.routes, {
    base: manifest2.base,
    trailingSlash: manifest2.trailingSlash,
    buildFormat: manifest2.buildFormat
  });
  return {
    routes: routesList.routes,
    router
  };
}
__name(compileRouteTable, "compileRouteTable");
var routeTables = createManifestMemo((manifest2) => compileRouteTable(manifest2, (manifest2.routes ?? []).map((route) => route.routeData)));
function getRouteTable(manifest2) {
  return routeTables.get(manifest2);
}
__name(getRouteTable, "getRouteTable");
function updateRouteTable(manifest2, routes) {
  routeTables.set(manifest2, compileRouteTable(manifest2, [...routes]));
}
__name(updateRouteTable, "updateRouteTable");
function matchRoute(manifest2, pathname) {
  const match = getRouteTable(manifest2).router.match(pathname, { allowWithoutBase: true });
  if (match.type !== "match") return void 0;
  return match.route;
}
__name(matchRoute, "matchRoute");
function matchAllRoutes(manifest2, pathname) {
  return getRouteTable(manifest2).router.matchAll(pathname, { allowWithoutBase: true });
}
__name(matchAllRoutes, "matchAllRoutes");
var cacheProviderMemo = createAsyncManifestMemo(async (manifest2) => {
  if (manifest2.cacheProvider) {
    const factory = (await manifest2.cacheProvider())?.default || null;
    return factory ? factory(manifest2.cacheConfig?.options) : null;
  }
  return null;
});
function getCacheProvider(manifest2) {
  return cacheProviderMemo.get(manifest2);
}
__name(getCacheProvider, "getCacheProvider");
function defaultSetHeaders(options) {
  const headers = new Headers();
  const directives = [];
  if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
  if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
  if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
  if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
  if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
  if (options.etag) headers.set("ETag", options.etag);
  return headers;
}
__name(defaultSetHeaders, "defaultSetHeaders");
function isLiveDataEntry(value) {
  return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
__name(isLiveDataEntry, "isLiveDataEntry");
var APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
var IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
var AstroCache = class {
  static {
    __name(this, "AstroCache");
  }
  #options = {};
  #tags = /* @__PURE__ */ new Set();
  #disabled = false;
  #provider;
  enabled = true;
  constructor(provider) {
    this.#provider = provider;
  }
  set(input) {
    if (input === false) {
      this.#disabled = true;
      this.#tags.clear();
      this.#options = {};
      return;
    }
    this.#disabled = false;
    let options;
    if (isLiveDataEntry(input)) {
      if (!input.cacheHint) return;
      options = input.cacheHint;
    } else options = input;
    if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
    if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
    if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
    if (options.lastModified !== void 0) {
      if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
    }
    if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
  }
  get tags() {
    return [...this.#tags];
  }
  /**
  * Get the current cache options (read-only snapshot).
  * Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
  */
  get options() {
    return {
      ...this.#options,
      tags: this.tags
    };
  }
  async invalidate(input) {
    if (!this.#provider) throw new AstroError(CacheNotEnabled);
    let options;
    if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
    else options = input;
    return this.#provider.invalidate(options);
  }
  /** @internal */
  [APPLY_HEADERS](response, request) {
    if (this.#disabled) return;
    const finalOptions = {
      ...this.#options,
      tags: this.tags
    };
    if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
    const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
    for (const [key, value] of headers) response.headers.set(key, value);
    if (!response.headers.has("Cache-Control") && !response.headers.has("Expires") && (response.headers.has("Last-Modified") || response.headers.has("ETag"))) response.headers.set("Cache-Control", "no-cache");
  }
  /** @internal */
  get [IS_ACTIVE]() {
    return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
  }
};
function applyCacheHeaders(cache, response, request) {
  if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
__name(applyCacheHeaders, "applyCacheHeaders");
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
  static {
    __name(this, "NoopAstroCache");
  }
  enabled = false;
  set() {
  }
  get tags() {
    return [];
  }
  get options() {
    return EMPTY_OPTIONS;
  }
  async invalidate() {
  }
};
var hasWarned = false;
var DisabledAstroCache = class {
  static {
    __name(this, "DisabledAstroCache");
  }
  enabled = false;
  #logger;
  constructor(logger) {
    this.#logger = logger;
  }
  #warn() {
    if (!hasWarned) {
      hasWarned = true;
      this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
    }
  }
  set() {
    this.#warn();
  }
  get tags() {
    return [];
  }
  get options() {
    return EMPTY_OPTIONS;
  }
  async invalidate() {
    throw new AstroError(CacheNotEnabled);
  }
};
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
  const result = [];
  part.split(ROUTE_DYNAMIC_SPLIT).map((str, i2) => {
    if (!str) return;
    const dynamic = i2 % 2 === 1;
    const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
    if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
    result.push({
      content,
      dynamic,
      spread: dynamic && ROUTE_SPREAD.test(content)
    });
  });
  return result;
}
__name(getParts, "getParts");
function compileCacheRoutes(routes, base, trailingSlash) {
  const compiled = Object.entries(routes).map(([path, options]) => {
    const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s2) => getParts(s2, path));
    return {
      pattern: getPattern(segments, base, trailingSlash),
      options,
      segments,
      route: path
    };
  });
  compiled.sort((a2, b) => routeComparator({
    segments: a2.segments,
    route: a2.route,
    type: "page"
  }, {
    segments: b.segments,
    route: b.route,
    type: "page"
  }));
  return compiled;
}
__name(compileCacheRoutes, "compileCacheRoutes");
function matchCacheRoute(pathname, compiledRoutes) {
  for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
  return null;
}
__name(matchCacheRoute, "matchCacheRoute");
var CACHE_KEY = "cache";
function provideCache(state) {
  const manifest2 = state.manifest;
  if (!manifest2.cacheConfig) {
    state.provide(CACHE_KEY, { create: /* @__PURE__ */ __name(() => new DisabledAstroCache(state.logger), "create") });
    return;
  }
  if (getEnvironment(manifest2).runtimeMode === "development") {
    state.provide(CACHE_KEY, { create: /* @__PURE__ */ __name(() => new NoopAstroCache(), "create") });
    return;
  }
  return provideCacheAsync(state, manifest2);
}
__name(provideCache, "provideCache");
async function provideCacheAsync(state, manifest2) {
  const cacheProvider = await getCacheProvider(manifest2);
  state.provide(CACHE_KEY, { create() {
    const cache = new AstroCache(cacheProvider);
    if (manifest2.cacheConfig?.routes) {
      const matched = matchCacheRoute(state.pathname, getCompiledCacheRoutes(manifest2));
      if (matched) cache.set(matched);
    }
    return cache;
  } });
}
__name(provideCacheAsync, "provideCacheAsync");
async function handleCache(state, next) {
  markFeatureUsed(state.manifest, FetchFeatures.cache);
  if (!state.manifest.cacheProvider) return next();
  const cache = state.resolve(CACHE_KEY);
  const cacheProvider = await getCacheProvider(state.manifest);
  if (cacheProvider?.onRequest) {
    const response2 = await cacheProvider.onRequest({
      request: state.request,
      url: new URL(state.request.url),
      waitUntil: state.renderOptions.waitUntil,
      logger: {
        info(msg) {
          state.logger.info("cache", msg);
        },
        warn(msg) {
          state.logger.warn("cache", msg);
        },
        error(msg) {
          state.logger.error("cache", msg);
        }
      }
    }, async () => {
      const res = await next();
      applyCacheHeaders(cache, res, state.request);
      return res;
    });
    response2.headers.delete("CDN-Cache-Control");
    response2.headers.delete("Cache-Tag");
    return response2;
  }
  const response = await next();
  applyCacheHeaders(cache, response, state.request);
  return response;
}
__name(handleCache, "handleCache");
var compiledCacheRoutesMemo = createManifestMemo((manifest2) => manifest2.cacheConfig?.routes ? compileCacheRoutes(manifest2.cacheConfig.routes, manifest2.base, manifest2.trailingSlash) : []);
function getCompiledCacheRoutes(manifest2) {
  return compiledCacheRoutesMemo.get(manifest2);
}
__name(getCompiledCacheRoutes, "getCompiledCacheRoutes");
var sessionDriverMemo = createAsyncManifestMemo(async (manifest2) => {
  if (manifest2.sessionDriver) return (await manifest2.sessionDriver())?.default || null;
  return null;
});
function getSessionDriver(manifest2) {
  return sessionDriverMemo.get(manifest2);
}
__name(getSessionDriver, "getSessionDriver");
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
__name(jsonParseTransform, "jsonParseTransform");
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
__name(warnKeyDropped, "warnKeyDropped");
function destr(value, options = {}) {
  if (typeof value !== "string") return value;
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) return value.slice(1, -1);
  const _value = value.trim();
  if (_value.length <= 9) switch (_value.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    case "undefined":
      return;
    case "null":
      return null;
    case "nan":
      return NaN;
    case "infinity":
      return Number.POSITIVE_INFINITY;
    case "-infinity":
      return Number.NEGATIVE_INFINITY;
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) throw new SyntaxError("[destr] Invalid JSON");
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error3) {
    if (options.strict) throw error3;
    return value;
  }
}
__name(destr, "destr");
function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") return Promise.resolve(value);
  return value;
}
__name(wrapToPromise, "wrapToPromise");
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error3) {
    return Promise.reject(error3);
  }
}
__name(asyncCall, "asyncCall");
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
__name(isPrimitive, "isPrimitive");
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
__name(isPureObject, "isPureObject");
function stringify$1(value) {
  if (isPrimitive(value)) return String(value);
  if (isPureObject(value) || Array.isArray(value)) return JSON.stringify(value);
  if (typeof value.toJSON === "function") return stringify$1(value.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
__name(stringify$1, "stringify$1");
var BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") return value;
  return BASE64_PREFIX + base64Encode(value);
}
__name(serializeRaw, "serializeRaw");
function deserializeRaw(value) {
  if (typeof value !== "string") return value;
  if (!value.startsWith(BASE64_PREFIX)) return value;
  return base64Decode(value.slice(7));
}
__name(deserializeRaw, "deserializeRaw");
function base64Decode(input) {
  if (globalThis.Buffer) return Buffer.from(input, "base64");
  return Uint8Array.from(globalThis.atob(input), (c) => c.codePointAt(0));
}
__name(base64Decode, "base64Decode");
function base64Encode(input) {
  if (globalThis.Buffer) return Buffer.from(input).toString("base64");
  return globalThis.btoa(String.fromCodePoint(...input));
}
__name(base64Encode, "base64Encode");
function normalizeKey2(key) {
  if (!key) return "";
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
__name(normalizeKey2, "normalizeKey");
function hasDotSegment(key) {
  return key.split(":").some((segment) => segment === "." || segment === "..");
}
__name(hasDotSegment, "hasDotSegment");
function joinKeys2(...keys) {
  return normalizeKey2(keys.join(":"));
}
__name(joinKeys2, "joinKeys");
function normalizeBaseKey(base) {
  base = normalizeKey2(base);
  return base ? base + ":" : "";
}
__name(normalizeBaseKey, "normalizeBaseKey");
function filterKeyByDepth(key, depth) {
  if (depth === void 0) return true;
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
__name(filterKeyByDepth, "filterKeyByDepth");
function filterKeyByBase(key, base) {
  if (base) return key.startsWith(base) && key[key.length - 1] !== "$";
  return key[key.length - 1] !== "$";
}
__name(filterKeyByBase, "filterKeyByBase");
function defineDriver2(factory) {
  return factory;
}
__name(defineDriver2, "defineDriver");
var DRIVER_NAME2 = "memory";
var memory = defineDriver2(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME2,
    getInstance: /* @__PURE__ */ __name(() => data, "getInstance"),
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});
function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const normalizeItemKey = /* @__PURE__ */ __name((key) => {
    const normalizedKey = normalizeKey2(key);
    if (!normalizedKey || hasDotSegment(normalizedKey)) throw new Error(`[unstorage] Invalid key: ${JSON.stringify(key)}`);
    return normalizedKey;
  }, "normalizeItemKey");
  const normalizeBase2 = /* @__PURE__ */ __name((base) => {
    const normalizedBase = normalizeBaseKey(base);
    if (hasDotSegment(normalizedBase)) throw new Error(`[unstorage] Invalid base: ${JSON.stringify(base)}`);
    return normalizedBase;
  }, "normalizeBase");
  const getMount = /* @__PURE__ */ __name((key) => {
    for (const base of context.mountpoints) if (key.startsWith(base)) return {
      base,
      relativeKey: key.slice(base.length),
      driver: context.mounts[base]
    };
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  }, "getMount");
  const getMounts = /* @__PURE__ */ __name((base, includeParent) => {
    return context.mountpoints.filter((mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  }, "getMounts");
  const onChange = /* @__PURE__ */ __name((event, key) => {
    if (!context.watching) return;
    key = normalizeKey2(key);
    for (const listener of context.watchListeners) listener(event, key);
  }, "onChange");
  const startWatch = /* @__PURE__ */ __name(async () => {
    if (context.watching) return;
    context.watching = true;
    for (const mountpoint in context.mounts) context.unwatch[mountpoint] = await watch(context.mounts[mountpoint], onChange, mountpoint);
  }, "startWatch");
  const stopWatch = /* @__PURE__ */ __name(async () => {
    if (!context.watching) return;
    for (const mountpoint in context.unwatch) await context.unwatch[mountpoint]();
    context.unwatch = {};
    context.watching = false;
  }, "stopWatch");
  const runBatch = /* @__PURE__ */ __name((items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = /* @__PURE__ */ __name((mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    }, "getBatch");
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeItemKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : {
        ...commonOptions,
        ...item.options
      };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then((r2) => r2.flat());
  }, "runBatch");
  const storage = {
    async hasItem(key, opts = {}) {
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    async getItem(key, opts = {}) {
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then((value) => destr(value));
    },
    async getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) return asyncCall(batch.driver.getItems, batch.items.map((item) => ({
          key: item.relativeKey,
          options: item.options
        })), commonOptions).then((r2) => r2.map((item) => ({
          key: joinKeys2(batch.base, item.key),
          value: destr(item.value)
        })));
        return Promise.all(batch.items.map((item) => {
          return asyncCall(batch.driver.getItem, item.relativeKey, item.options).then((value) => ({
            key: item.key,
            value: destr(value)
          }));
        }));
      });
    },
    async getItemRaw(key, opts = {}) {
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) return asyncCall(driver.getItemRaw, relativeKey, opts);
      return asyncCall(driver.getItem, relativeKey, opts).then((value) => deserializeRaw(value));
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) return storage.removeItem(key);
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) return;
      await asyncCall(driver.setItem, relativeKey, stringify$1(value), opts);
      if (!driver.watch) onChange("update", key);
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) return asyncCall(batch.driver.setItems, batch.items.map((item) => ({
          key: item.relativeKey,
          value: stringify$1(item.value),
          options: item.options
        })), commonOptions);
        if (!batch.driver.setItem) return;
        await Promise.all(batch.items.map((item) => {
          return asyncCall(batch.driver.setItem, item.relativeKey, stringify$1(item.value), item.options);
        }));
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) return storage.removeItem(key, opts);
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      else if (driver.setItem) await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      else return;
      if (!driver.watch) onChange("update", key);
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") opts = { removeMeta: opts };
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) return;
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) await asyncCall(driver.removeItem, relativeKey + "$", opts);
      if (!driver.watch) onChange("remove", key);
    },
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") opts = { nativeOnly: opts };
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      if (!opts.nativeOnly) {
        const value = await asyncCall(driver.getItem, relativeKey + "$", opts).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") value.atime = new Date(value.atime);
          if (typeof value.mtime === "string") value.mtime = new Date(value.mtime);
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    async setMeta(key, value, opts = {}) {
      return this.setItem(normalizeItemKey(key) + "$", value, opts);
    },
    async removeMeta(key, opts = {}) {
      return this.removeItem(normalizeItemKey(key) + "$", opts);
    },
    async getKeys(base, opts = {}) {
      base = normalizeBase2(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) allMountsSupportMaxDepth = false;
        const rawKeys = await asyncCall(mount.driver.getKeys, mount.relativeBase, opts);
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey2(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) allKeys.push(fullKey);
        }
        maskedMounts = [mount.mountpoint, ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter((key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base));
    },
    async clear(base, opts = {}) {
      base = normalizeBase2(base);
      await Promise.all(getMounts(base, false).map(async (m) => {
        if (m.driver.clear) return asyncCall(m.driver.clear, m.relativeBase, opts);
        if (m.driver.removeItem) {
          const keys = await m.driver.getKeys(m.relativeBase || "", opts);
          return Promise.all(keys.map((key) => m.driver.removeItem(key, opts)));
        }
      }));
    },
    async dispose() {
      await Promise.all(Object.values(context.mounts).map((driver) => dispose(driver)));
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter((listener) => listener !== callback);
        if (context.watchListeners.length === 0) await stopWatch();
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    mount(base, driver) {
      base = normalizeBase2(base);
      if (base && context.mounts[base]) throw new Error(`already mounted at ${base}`);
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a2, b) => b.length - a2.length);
      }
      context.mounts[base] = driver;
      if (context.watching) Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
        context.unwatch[base] = unwatcher;
      }).catch(console.error);
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) return;
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) await dispose(context.mounts[base]);
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey2(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey2(base);
      return getMounts(base, opts.parents).map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    keys: /* @__PURE__ */ __name((base, opts = {}) => storage.getKeys(base, opts), "keys"),
    get: /* @__PURE__ */ __name((key, opts = {}) => storage.getItem(key, opts), "get"),
    set: /* @__PURE__ */ __name((key, value, opts = {}) => storage.setItem(key, value, opts), "set"),
    has: /* @__PURE__ */ __name((key, opts = {}) => storage.hasItem(key, opts), "has"),
    del: /* @__PURE__ */ __name((key, opts = {}) => storage.removeItem(key, opts), "del"),
    remove: /* @__PURE__ */ __name((key, opts = {}) => storage.removeItem(key, opts), "remove")
  };
  return storage;
}
__name(createStorage, "createStorage");
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
__name(watch, "watch");
async function dispose(driver) {
  if (typeof driver.dispose === "function") await asyncCall(driver.dispose);
}
__name(dispose, "dispose");
var PERSIST_SYMBOL = /* @__PURE__ */ Symbol();
var DEFAULT_COOKIE_NAME = "astro-session";
var VALID_COOKIE_REGEX = /^[\w-]+$/;
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
var unflatten = /* @__PURE__ */ __name((parsed, _) => {
  return unflatten$1(parsed, { URL: /* @__PURE__ */ __name((href) => new URL(href), "URL") });
}, "unflatten");
var stringify = /* @__PURE__ */ __name((data, _) => {
  return stringify$2(data, { URL: /* @__PURE__ */ __name((val) => val instanceof URL && val.href, "URL") });
}, "stringify");
var AstroSession = class AstroSession2 {
  static {
    __name(this, "AstroSession");
  }
  #cookies;
  #config;
  #cookieConfig;
  #cookieName;
  #storage;
  #data;
  #sessionID;
  #toDestroy = /* @__PURE__ */ new Set();
  #toDelete = /* @__PURE__ */ new Set();
  #dirty = false;
  #cookieSet = false;
  #sessionIDFromCookie = false;
  #partial = true;
  #logger;
  #driverFactory;
  static #sharedStorage = /* @__PURE__ */ new Map();
  constructor({ cookies, config: config2, runtimeMode, driverFactory, mockStorage, logger }) {
    this.#logger = logger;
    if (!config2) throw new AstroError({
      ...SessionStorageInitError,
      message: SessionStorageInitError.message("No driver was defined in the session configuration and the adapter did not provide a default driver.")
    });
    this.#cookies = cookies;
    this.#driverFactory = driverFactory;
    const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config2;
    let cookieConfigObject;
    if (typeof cookieConfig === "object") {
      const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
      this.#cookieName = name;
      cookieConfigObject = rest;
    } else this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
    this.#cookieConfig = {
      sameSite: "lax",
      secure: runtimeMode === "production",
      path: "/",
      ...cookieConfigObject,
      httpOnly: true
    };
    this.#config = configRest;
    if (mockStorage) this.#storage = mockStorage;
  }
  /**
  * Gets a session value. Returns `undefined` if the session or value does not exist.
  */
  async get(key) {
    return (await this.#ensureData()).get(key)?.data;
  }
  /**
  * Checks if a session value exists.
  */
  async has(key) {
    return (await this.#ensureData()).has(key);
  }
  /**
  * Gets all session values.
  */
  async keys() {
    return (await this.#ensureData()).keys();
  }
  /**
  * Gets all session values.
  */
  async values() {
    return [...(await this.#ensureData()).values()].map((entry) => entry.data);
  }
  /**
  * Gets all session entries.
  */
  async entries() {
    return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
  }
  /**
  * Deletes a session value.
  */
  delete(key) {
    this.#data ??= /* @__PURE__ */ new Map();
    this.#data.delete(key);
    if (this.#partial) this.#toDelete.add(key);
    this.#dirty = true;
  }
  /**
  * Sets a session value. The session is created if it does not exist.
  */
  set(key, value, { ttl } = {}) {
    if (!key) throw new AstroError({
      ...SessionStorageSaveError,
      message: "The session key was not provided."
    });
    let cloned;
    try {
      cloned = unflatten(JSON.parse(stringify(value)));
    } catch (err) {
      throw new AstroError({
        ...SessionStorageSaveError,
        message: `The session data for ${key} could not be serialized.`,
        hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
      }, { cause: err });
    }
    if (!this.#cookieSet) {
      this.#setCookie();
      this.#cookieSet = true;
    }
    this.#data ??= /* @__PURE__ */ new Map();
    const lifetime = ttl ?? this.#config.ttl;
    const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
    this.#data.set(key, {
      data: cloned,
      expires
    });
    this.#dirty = true;
  }
  /**
  * Destroys the session, clearing the cookie and storage if it exists.
  */
  destroy() {
    const cookieValue = this.#cookies.get(this.#cookieName)?.value;
    const sessionId = this.#sessionID ?? (cookieValue && UUID_REGEX.test(cookieValue) ? cookieValue : void 0);
    if (sessionId) this.#toDestroy.add(sessionId);
    this.#cookies.delete(this.#cookieName, this.#cookieConfig);
    this.#sessionID = void 0;
    this.#data = void 0;
    this.#dirty = true;
  }
  /**
  * Regenerates the session, creating a new session ID. The existing session data is preserved.
  */
  async regenerate() {
    let data = /* @__PURE__ */ new Map();
    try {
      data = await this.#ensureData();
    } catch (err) {
      this.#logger.error("session", `Failed to load session data during regeneration: ${err}`);
      this.#partial = false;
    }
    const oldSessionId = this.#sessionID;
    this.#sessionID = crypto.randomUUID();
    this.#sessionIDFromCookie = false;
    this.#data = data;
    this.#dirty = true;
    await this.#setCookie();
    if (oldSessionId && this.#storage) this.#storage.removeItem(oldSessionId).catch((err) => {
      this.#logger.error("session", `Failed to remove old session ${oldSessionId}: ${err}`);
    });
  }
  async [PERSIST_SYMBOL]() {
    if (!this.#dirty && !this.#toDestroy.size) return;
    const storage = await this.#ensureStorage();
    if (this.#dirty && this.#data) {
      const data = await this.#ensureData();
      this.#toDelete.forEach((key2) => data.delete(key2));
      const key = this.#ensureSessionID();
      let serialized;
      try {
        serialized = stringify(data);
      } catch (err) {
        throw new AstroError({
          ...SessionStorageSaveError,
          message: SessionStorageSaveError.message("The session data could not be serialized.", this.#config.driver)
        }, { cause: err });
      }
      await storage.setItem(key, serialized);
      this.#dirty = false;
    }
    if (this.#toDestroy.size > 0) {
      const cleanupPromises = [...this.#toDestroy].map((sessionId) => storage.removeItem(sessionId).catch((err) => {
        this.#logger.error("session", `Failed to remove session ${sessionId}: ${err}`);
      }));
      await Promise.all(cleanupPromises);
      this.#toDestroy.clear();
    }
  }
  get sessionID() {
    return this.#sessionID;
  }
  /**
  * Loads a session from storage with the given ID, and replaces the current session.
  * Any changes made to the current session will be lost.
  * This is not normally needed, as the session is automatically loaded using the cookie.
  * However it can be used to restore a session where the ID has been recorded somewhere
  * else (e.g. in a database).
  */
  async load(sessionID) {
    this.#sessionID = sessionID;
    this.#data = void 0;
    await this.#setCookie();
    await this.#ensureData();
  }
  /**
  * Sets the session cookie.
  */
  async #setCookie() {
    if (!VALID_COOKIE_REGEX.test(this.#cookieName)) throw new AstroError({
      ...SessionStorageSaveError,
      message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
    });
    const value = this.#ensureSessionID();
    this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
  }
  /**
  * Attempts to load the session data from storage, or creates a new data object if none exists.
  * If there is existing partial data, it will be merged into the new data object.
  */
  async #ensureData() {
    if (this.#data && !this.#partial) return this.#data;
    this.#data ??= /* @__PURE__ */ new Map();
    if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
      this.#partial = false;
      return this.#data;
    }
    const raw = await (await this.#ensureStorage()).get(this.#ensureSessionID());
    if (!raw) {
      if (this.#sessionIDFromCookie) {
        this.#sessionID = crypto.randomUUID();
        this.#sessionIDFromCookie = false;
        if (this.#cookieSet) await this.#setCookie();
      }
      return this.#data;
    }
    try {
      const storedMap = unflatten(raw);
      if (!(storedMap instanceof Map)) {
        this.destroy();
        throw new AstroError({
          ...SessionStorageInitError,
          message: SessionStorageInitError.message("The session data was an invalid type.", this.#config.driver)
        });
      }
      const now = Date.now();
      for (const [key, value] of storedMap) {
        const expired = typeof value.expires === "number" && value.expires < now;
        if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) this.#data.set(key, value);
      }
      this.#partial = false;
      return this.#data;
    } catch (err) {
      this.destroy();
      if (err instanceof AstroError) throw err;
      throw new AstroError({
        ...SessionStorageInitError,
        message: SessionStorageInitError.message("The session data could not be parsed.", this.#config.driver)
      }, { cause: err });
    }
  }
  /**
  * Returns the session ID, generating a new one if it does not exist.
  */
  #ensureSessionID() {
    if (!this.#sessionID) {
      const cookieValue = this.#cookies.get(this.#cookieName)?.value;
      if (cookieValue && UUID_REGEX.test(cookieValue)) {
        this.#sessionID = cookieValue;
        this.#sessionIDFromCookie = true;
      } else this.#sessionID = crypto.randomUUID();
    }
    return this.#sessionID;
  }
  /**
  * Ensures the storage is initialized.
  * This is called automatically when a storage operation is needed.
  */
  async #ensureStorage() {
    if (this.#storage) return this.#storage;
    if (AstroSession2.#sharedStorage.has(this.#config.driver)) {
      this.#storage = AstroSession2.#sharedStorage.get(this.#config.driver);
      return this.#storage;
    }
    if (!this.#driverFactory) throw new AstroError({
      ...SessionStorageInitError,
      message: SessionStorageInitError.message("Astro could not load the driver correctly. Does it exist?", this.#config.driver)
    });
    const driver = this.#driverFactory;
    try {
      this.#storage = createStorage({ driver: {
        ...driver(this.#config.options),
        hasItem() {
          return false;
        },
        getKeys() {
          return [];
        }
      } });
      AstroSession2.#sharedStorage.set(this.#config.driver, this.#storage);
      return this.#storage;
    } catch (err) {
      throw new AstroError({
        ...SessionStorageInitError,
        message: SessionStorageInitError.message("Unknown error", this.#config.driver)
      }, { cause: err });
    }
  }
};
var SESSION_KEY = "session";
function provideSession(state) {
  markFeatureUsed(state.manifest, FetchFeatures.sessions);
  const config2 = state.manifest.sessionConfig;
  if (!config2) return;
  return provideSessionAsync(state, config2);
}
__name(provideSession, "provideSession");
async function provideSessionAsync(state, config2) {
  const driverFactory = await getSessionDriver(state.manifest);
  if (!driverFactory) return;
  state.provide(SESSION_KEY, {
    create() {
      const cookies = state.cookies;
      return new AstroSession({
        cookies,
        config: config2,
        runtimeMode: getEnvironment(state.manifest).runtimeMode,
        driverFactory,
        mockStorage: null,
        logger: state.logger
      });
    },
    finalize(session) {
      return session[PERSIST_SYMBOL]();
    }
  });
}
__name(provideSessionAsync, "provideSessionAsync");
function getFirstForwardedValue$1(multiValueHeader) {
  return multiValueHeader?.toString().split(",").map((e2) => e2.trim())[0];
}
__name(getFirstForwardedValue$1, "getFirstForwardedValue$1");
function sanitizeHost(hostname) {
  if (!hostname) return void 0;
  if (/[/\\]/.test(hostname)) return void 0;
  return hostname;
}
__name(sanitizeHost, "sanitizeHost");
function parseHost(host) {
  const parts = host.split(":");
  if (parts.length > 2) return void 0;
  return {
    hostname: parts[0],
    port: parts[1]
  };
}
__name(parseHost, "parseHost");
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
  const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
  if (!URL.canParse(urlString)) return false;
  const testUrl = new URL(urlString);
  return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
__name(matchesAllowedDomains, "matchesAllowedDomains");
function validateHost(host, protocol, allowedDomains) {
  if (!host || host.length === 0) return void 0;
  if (!allowedDomains || allowedDomains.length === 0) return void 0;
  const sanitized = sanitizeHost(host);
  if (!sanitized) return void 0;
  const parsed = parseHost(sanitized);
  if (!parsed) return void 0;
  const { hostname, port } = parsed;
  if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
__name(validateHost, "validateHost");
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
  const result = {};
  if (forwardedProtocol) {
    if (allowedDomains && allowedDomains.length > 0) {
      if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
        const testUrl = new URL(`${forwardedProtocol}://example.com`);
        if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
      } catch {
      }
      else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
    }
  }
  if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
    if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
      if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
    }
  }
  if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
    const protoForValidation = result.protocol || "https";
    const sanitized = sanitizeHost(forwardedHost);
    const parsed = sanitized ? parseHost(sanitized) : void 0;
    if (sanitized && parsed) {
      const { hostname, port: portFromHost } = parsed;
      if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
    }
  }
  return result;
}
__name(validateForwardedHeaders, "validateForwardedHeaders");
function getOutputFilename(buildFormat, name, routeData) {
  if (routeData.type === "endpoint") return name;
  if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
  if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
  if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
  return `${removeTrailingForwardSlash(name)}/index.html`;
}
__name(getOutputFilename, "getOutputFilename");
async function renderDefaultError(manifest2, request, { status, response: originalResponse, skipMiddleware = false, error: error3, pathname, ...resolvedRenderOptions }) {
  const resolvedPathname = pathname ?? new FetchState(manifest2, request).pathname;
  const routeTable = getRouteTable(manifest2);
  const errorRouteData = matchRoute$1(getErrorRoutePath(resolvedPathname, status, routeTable.routes, manifest2.i18n?.locales, manifest2.trailingSlash === "always"), routeTable);
  const url = new URL(request.url);
  if (errorRouteData) {
    if (errorRouteData.prerender) {
      const allowedDomains = manifest2.allowedDomains;
      const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
      const statusURL = new URL(`${removeTrailingForwardSlash(manifest2.base)}${getOutputFilename(manifest2.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
      if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
        const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
          status,
          removeContentEncodingHeaders: true
        });
        prepareResponse(newResponse, resolvedRenderOptions);
        return newResponse;
      } catch {
        const response2 = mergeResponses(new Response(null, { status }), originalResponse);
        prepareResponse(response2, resolvedRenderOptions);
        return response2;
      }
    }
    const mod = await getEnvironment(manifest2).getComponentByRoute(manifest2, errorRouteData);
    const errorState = new FetchState(manifest2, request);
    errorState.skipMiddleware = skipMiddleware;
    errorState.clientAddress = resolvedRenderOptions.clientAddress;
    errorState.routeData = errorRouteData;
    errorState.pathname = resolvedPathname;
    errorState.status = status;
    errorState.componentInstance = mod;
    errorState.locals = resolvedRenderOptions.locals ?? {};
    errorState.initialProps = { error: error3 };
    try {
      await provideSession(errorState);
      await provideCache(errorState);
      const response2 = await handleMiddleware(errorState, handlePages);
      if (rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, errorState.routeData, response2)) return renderDefaultError(manifest2, request, {
        ...resolvedRenderOptions,
        status,
        error: error3,
        response: originalResponse,
        skipMiddleware: true,
        pathname: resolvedPathname
      });
      const newResponse = mergeResponses(response2, originalResponse);
      prepareResponse(newResponse, resolvedRenderOptions);
      return newResponse;
    } catch {
      if (skipMiddleware === false) return renderDefaultError(manifest2, request, {
        ...resolvedRenderOptions,
        status,
        error: error3,
        response: originalResponse,
        skipMiddleware: true,
        pathname: resolvedPathname
      });
    } finally {
      await errorState.finalizeAll();
    }
  }
  const response = mergeResponses(new Response(null, { status }), originalResponse);
  prepareResponse(response, resolvedRenderOptions);
  return response;
}
__name(renderDefaultError, "renderDefaultError");
function mergeResponses(newResponse, originalResponse, override) {
  let newResponseHeaders = newResponse.headers;
  if (override?.removeContentEncodingHeaders) {
    newResponseHeaders = new Headers(newResponseHeaders);
    newResponseHeaders.delete("Content-Encoding");
    newResponseHeaders.delete("Content-Length");
  }
  if (!originalResponse) {
    if (override !== void 0) return new Response(newResponse.body, {
      status: override.status,
      statusText: newResponse.statusText,
      headers: newResponseHeaders
    });
    return newResponse;
  }
  const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
  try {
    originalResponse.headers.delete("Content-type");
    originalResponse.headers.delete("Content-Length");
    originalResponse.headers.delete("Transfer-Encoding");
  } catch {
  }
  const newHeaders = new Headers();
  const seen = /* @__PURE__ */ new Set();
  for (const [name, value] of originalResponse.headers) {
    newHeaders.append(name, value);
    seen.add(name.toLowerCase());
  }
  for (const [name, value] of newResponseHeaders) {
    const lower = name.toLowerCase();
    if (!seen.has(lower) || lower === "set-cookie") newHeaders.append(name, value);
  }
  const mergedResponse = new Response(newResponse.body, {
    status,
    statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
    headers: newHeaders
  });
  const originalCookies = getCookiesFromResponse(originalResponse);
  const newCookies = getCookiesFromResponse(newResponse);
  if (originalCookies) {
    if (newCookies) originalCookies.merge(newCookies);
    attachCookiesToResponse(mergedResponse, originalCookies);
  } else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
  return mergedResponse;
}
__name(mergeResponses, "mergeResponses");
async function renderBuildError(manifest2, request, options) {
  if (options.status === 500) {
    if (options.response) return options.response;
    throw options.error;
  }
  return renderDefaultError(manifest2, request, {
    ...options,
    prerenderedErrorPageFetch: void 0
  });
}
__name(renderBuildError, "renderBuildError");
async function renderDevError(manifest2, request, { skipMiddleware = false, error: error3, status, response: _response, pathname, ...resolvedRenderOptions }, { shouldInjectCspMetaTags }) {
  if (isAstroError(error3) && [MiddlewareNoDataOrNextCalled.name, MiddlewareNotAResponse.name].includes(error3.name)) throw error3;
  const resolvedPathname = pathname ?? new FetchState(manifest2, request).pathname;
  const renderRoute = /* @__PURE__ */ __name(async (routeData) => {
    try {
      const preloadedComponent = await getEnvironment(manifest2).getComponentByRoute(manifest2, routeData);
      const errorState = new FetchState(manifest2, request);
      errorState.skipMiddleware = skipMiddleware;
      errorState.clientAddress = resolvedRenderOptions.clientAddress;
      errorState.shouldInjectCspMetaTags = shouldInjectCspMetaTags ? !!manifest2.csp : false;
      errorState.routeData = routeData;
      errorState.pathname = resolvedPathname;
      errorState.status = status;
      errorState.componentInstance = preloadedComponent;
      errorState.locals = resolvedRenderOptions.locals ?? {};
      errorState.initialProps = { error: error3 };
      await provideCache(errorState);
      const response = await handleMiddleware(errorState, handlePages);
      if (rewroteToEmptyErrorResponse(skipMiddleware, routeData, errorState.routeData, response)) return renderDevError(manifest2, request, {
        ...resolvedRenderOptions,
        status,
        error: error3,
        skipMiddleware: true,
        pathname: resolvedPathname
      }, { shouldInjectCspMetaTags });
      if (error3) getLogger(manifest2).error("router", error3.stack || error3.message);
      return response;
    } catch (_err) {
      if (skipMiddleware === false) return renderDevError(manifest2, request, {
        ...resolvedRenderOptions,
        status: 500,
        skipMiddleware: true,
        error: _err,
        pathname: resolvedPathname
      }, { shouldInjectCspMetaTags });
      throw _err;
    }
  }, "renderRoute");
  if (status === 404) {
    const custom404 = getCustom404Route(getRouteTable(manifest2));
    if (custom404) return renderRoute(custom404);
  }
  const custom500 = getCustom500Route(getRouteTable(manifest2));
  if (!custom500) throw error3;
  else return renderRoute(custom500);
}
__name(renderDevError, "renderDevError");
function renderErrorPage(manifest2, request, options) {
  const env2 = getEnvironment(manifest2);
  switch (env2.errorStrategy) {
    case "dev":
      return renderDevError(manifest2, request, options, { shouldInjectCspMetaTags: env2.injectCspMetaTagsOnErrorPages });
    case "build":
      return renderBuildError(manifest2, request, options);
    case "default":
      return renderDefaultError(manifest2, request, options);
  }
}
__name(renderErrorPage, "renderErrorPage");
function renderErrorFromState(state, request, options) {
  if (state.renderError) return state.renderError(request, options);
  return renderErrorPage(state.manifest, request, options);
}
__name(renderErrorFromState, "renderErrorFromState");
function rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, renderedRouteData, response) {
  return skipMiddleware === false && renderedRouteData !== errorRouteData && response.body === null && REROUTABLE_STATUS_CODES.includes(response.status);
}
__name(rewroteToEmptyErrorResponse, "rewroteToEmptyErrorResponse");
async function callMiddleware(onRequest2, apiContext, responseFunction) {
  let nextCalled = false;
  let responseFunctionPromise = void 0;
  const next = /* @__PURE__ */ __name(async (payload) => {
    nextCalled = true;
    responseFunctionPromise = responseFunction(apiContext, payload);
    return responseFunctionPromise;
  }, "next");
  const middlewarePromise = onRequest2(apiContext, next);
  return await Promise.resolve(middlewarePromise).then(async (value) => {
    if (nextCalled) {
      if (typeof value !== "undefined") {
        if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
        return value;
      } else if (responseFunctionPromise) return responseFunctionPromise;
      else throw new AstroError(MiddlewareNotAResponse);
    } else if (typeof value === "undefined")
      throw new AstroError(MiddlewareNoDataOrNextCalled);
    else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
    else return value;
  });
}
__name(callMiddleware, "callMiddleware");
function sequence(...handlers2) {
  const filtered = handlers2.filter((h) => !!h);
  const length = filtered.length;
  if (!length) return defineMiddleware((_context, next) => {
    return next();
  });
  return defineMiddleware((context, next) => {
    let carriedPayload = void 0;
    return applyHandle(0, context);
    function applyHandle(i2, handleContext) {
      const handle2 = filtered[i2];
      return handle2(handleContext, async (payload) => {
        if (i2 < length - 1) {
          if (payload) {
            const oldPathname = handleContext.url.pathname;
            const state = Reflect.get(handleContext, fetchStateSymbol);
            if (!state) throw new Error("FetchState not found on APIContext. `next(payload)` rewrites require a context created through Astro's request pipeline.");
            const manifest2 = state.manifest;
            const { routeData, pathname } = await getEnvironment(manifest2).tryRewrite(manifest2, payload, handleContext.request);
            let newRequest;
            if (payload instanceof Request) newRequest = payload;
            else {
              const request = handleContext.request.method === "GET" || handleContext.request.method === "HEAD" ? handleContext.request : handleContext.request.clone();
              newRequest = copyRequest(payload instanceof URL ? payload : new URL(payload, handleContext.url.origin), request, false, state.logger, routeData.route);
            }
            if (manifest2.serverLike === true && handleContext.isPrerendered === false && routeData.prerender === true) throw new AstroError({
              ...ForbiddenRewrite,
              message: ForbiddenRewrite.message(handleContext.url.pathname, pathname, routeData.component),
              hint: ForbiddenRewrite.hint(routeData.component)
            });
            carriedPayload = payload;
            handleContext.request = newRequest;
            handleContext.url = new URL(newRequest.url);
            handleContext.params = getParams(routeData, pathname);
            handleContext.routePattern = routeData.route;
            setOriginPathname(handleContext.request, oldPathname, manifest2.trailingSlash, manifest2.buildFormat);
          }
          return applyHandle(i2 + 1, handleContext);
        } else return next(payload ?? carriedPayload);
      });
    }
    __name(applyHandle, "applyHandle");
  });
}
__name(sequence, "sequence");
var resolvedMiddleware = /* @__PURE__ */ new WeakMap();
var middlewareMemo = createAsyncManifestMemo(async (manifest2) => {
  let handler;
  if (manifest2.middleware) {
    const internalMiddlewares = [(await manifest2.middleware()).onRequest ?? NOOP_MIDDLEWARE_FN];
    if (manifest2.checkOrigin) internalMiddlewares.unshift(createOriginCheckMiddleware());
    handler = sequence(...internalMiddlewares);
  } else handler = NOOP_MIDDLEWARE_FN;
  resolvedMiddleware.set(manifest2, handler);
  return handler;
});
function getMiddleware(manifest2) {
  return middlewareMemo.get(manifest2);
}
__name(getMiddleware, "getMiddleware");
async function handleMiddleware(state, renderRouteCallback) {
  markFeatureUsed(state.manifest, FetchFeatures.middleware);
  await state.getProps();
  const apiContext = state.getAPIContext();
  state.counter++;
  if (state.counter === 4) return new Response("Loop Detected", {
    status: 508,
    statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
  });
  const next = /* @__PURE__ */ __name(async (ctx, payload) => {
    if (payload) {
      state.logger.debug("router", "Called rewriting to:", payload);
      applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request));
    }
    return renderRouteCallback(state, ctx);
  }, "next");
  let response;
  if (state.skipMiddleware) response = await next(apiContext);
  else response = await callMiddleware(sequence(await getMiddleware(state.manifest)), apiContext, next);
  attachCookiesToResponse(response, state.cookies);
  state.response = response;
  return response;
}
__name(handleMiddleware, "handleMiddleware");
function createNormalizedUrl(requestUrl) {
  return normalizeUrl(new URL(requestUrl));
}
__name(createNormalizedUrl, "createNormalizedUrl");
function setPathname(url, pathname) {
  if (url.pathname !== pathname) url.pathname = pathname;
}
__name(setPathname, "setPathname");
function normalizeUrl(url) {
  try {
    setPathname(url, validateAndDecodePathname(url.pathname));
  } catch {
    try {
      setPathname(url, decodeURI(url.pathname));
    } catch {
    }
  }
  setPathname(url, collapseDuplicateSlashes(url.pathname));
  return url;
}
__name(normalizeUrl, "normalizeUrl");
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
  const oldPathname = state.pathname;
  const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
  if (state.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
    ...ForbiddenRewrite,
    message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
    hint: ForbiddenRewrite.hint(routeData.component)
  });
  state.routeData = routeData;
  state.componentInstance = componentInstance;
  if (payload instanceof Request) state.request = payload;
  else state.request = copyRequest(newUrl, state.request, routeData.prerender, state.logger, state.routeData.route);
  state.url = createNormalizedUrl(state.request.url);
  if (mergeCookies) {
    const newCookies = new AstroCookies(state.request, state.logger);
    if (state.cookies) newCookies.merge(state.cookies);
    state.cookies = newCookies;
  }
  state.params = getParams(routeData, pathname);
  state.pathname = pathname;
  state.isRewriting = true;
  state.status = 200;
  setOriginPathname(state.request, oldPathname, state.manifest.trailingSlash, state.manifest.buildFormat);
  state.invalidateContexts();
}
__name(applyRewriteToState, "applyRewriteToState");
async function executeRewrite(state, payload) {
  state.logger.debug("router", "Calling rewrite: ", payload);
  applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request), { mergeCookies: true });
  return handleMiddleware(state, handlePages);
}
__name(executeRewrite, "executeRewrite");
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, allowedDomains, logger, pathnameFromRequest) {
  let pathname = void 0;
  if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
    const validated = validateForwardedHeaders(getFirstForwardedValue$1(request.headers.get("X-Forwarded-Proto") ?? void 0), getFirstForwardedValue$1(request.headers.get("X-Forwarded-Host") ?? void 0), getFirstForwardedValue$1(request.headers.get("X-Forwarded-Port") ?? void 0), allowedDomains);
    const protocol = validated.protocol ? `${validated.protocol}:` : url.protocol;
    const requestHost = request.headers.get("Host") ?? void 0;
    const validatedRequestHost = allowedDomains?.length ? validateHost(requestHost, protocol.slice(0, -1), allowedDomains) : requestHost;
    let host = validated.host ?? validatedRequestHost;
    if (host && protocol) {
      host = host.split(":")[0];
      try {
        let locale;
        const hostAsUrl = new URL(`${protocol}//${host}`);
        for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
          const domainKeyAsUrl = new URL(domainKey);
          if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
            locale = localeValue;
            break;
          }
        }
        if (locale) {
          const requestPathname = pathnameFromRequest ?? stripRequestBase(url.pathname, base);
          pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), requestPathname));
          if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
          else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
          else if (url.pathname.endsWith("/")) pathname = appendForwardSlash(pathname);
        }
      } catch (e2) {
        logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
        logger.error("router", `Error: ${e2}`);
      }
    }
  }
  return pathname;
}
__name(computePathnameFromDomain, "computePathnameFromDomain");
var sites = createManifestMemo((manifest2) => manifest2.site ? new URL(manifest2.site) : void 0);
function getSite(manifest2) {
  return sites.get(manifest2);
}
__name(getSite, "getSite");
async function getServerIslands(manifest2) {
  if (manifest2.serverIslandMappings) return manifest2.serverIslandMappings();
  return {
    serverIslandMap: /* @__PURE__ */ new Map(),
    serverIslandNameMap: /* @__PURE__ */ new Map()
  };
}
__name(getServerIslands, "getServerIslands");
var slotValuesSymbol = /* @__PURE__ */ Symbol("astro.slotValues");
function getFetchStateFromAPIContext(context) {
  const state = context[fetchStateSymbol];
  if (!state) throw new Error("FetchState not found on APIContext. This is an internal error \u2014 the context was not created through Astro's request pipeline.");
  return state;
}
__name(getFetchStateFromAPIContext, "getFetchStateFromAPIContext");
function isInlineCspHeadContent(element) {
  if (!element.children) return false;
  const props = element.props ?? {};
  return props.href == null && props.src == null;
}
__name(isInlineCspHeadContent, "isInlineCspHeadContent");
var FetchState = class {
  static {
    __name(this, "FetchState");
  }
  /** The manifest — the single ambient source of static, build-time data. */
  manifest;
  /** The manifest's identity-stable logger, captured once at construction. */
  logger;
  /**
  * Whether page renders stream. From the facade hooks on the fast path,
  * else the environment's default.
  */
  streaming;
  /**
  * Internal facade hook: late-bound `app.renderError` dispatch. Undefined on
  * bare and custom-handler paths — those fall through to the environment's
  * error strategy (`renderErrorPage`).
  */
  renderError;
  /**
  * Internal facade hook: late-bound `app.logThisRequest` dispatch. Undefined
  * on bare and custom-handler paths — those fall through to the
  * environment's `logRequest` behavior.
  */
  logRequest;
  /**
  * The request to render. Mutated during rewrites so subsequent renders
  * see the rewritten URL.
  */
  request;
  routeData;
  /**
  * The pathname to use for routing and rendering. Starts out as the raw,
  * base-stripped, decoded pathname from the request. May be further
  * normalized by `handleRequest` after routeData is known (in dev, when
  * the matched route has no `.html` extension, `.html` / `/index.html`
  * suffixes are stripped).
  */
  pathname;
  /** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
  renderOptions;
  /** When the request started, used to log duration. */
  timeStart;
  /**
  * The route's loaded component module. Set before middleware runs; may
  * be swapped during in-flight rewrites from inside the middleware chain.
  */
  componentInstance;
  /**
  * Slot overrides supplied by the container API. `undefined` for HTTP
  * requests — `PagesHandler` coalesces to `{}` on read so we don't
  * allocate an empty object per request.
  */
  slots;
  /**
  * The `Response` produced by handlers, if any. Set after page
  * rendering or middleware completes.
  */
  response;
  /** Explicitly assigned status; `undefined` until a caller sets one. */
  #status;
  /**
  * Default HTTP status for the rendered response. Callers override
  * before rendering runs (e.g. `handleRequest` sets this from
  * `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
  * Reads `200` until assigned.
  */
  get status() {
    return this.#status ?? 200;
  }
  set status(value) {
    this.#status = value;
  }
  /**
  * Sets `status` from the matched route (see `getDefaultStatusCode`)
  * unless a caller already assigned one.
  */
  applyDefaultStatus() {
    if (this.#status === void 0 && this.routeData) this.#status = getDefaultStatusCode(this.manifest, this.routeData, this.pathname);
  }
  /** Whether user middleware should be skipped for this request. */
  skipMiddleware = false;
  /**
  * Set to `true` when the request path was encoded too many times to fully
  * decode (see {@link validateAndDecodePathname}). These requests are
  * rejected with a `400` before middleware or routing run.
  */
  invalidEncoding = false;
  /** A flag that tells the render content if the rewriting was triggered. */
  isRewriting = false;
  /** A safety net in case of loops (rewrite counter). */
  counter = 0;
  /** Cookies for this request. Created lazily on first access. */
  cookies;
  /** Route params derived from routeData + pathname. Computed lazily. */
  #params;
  get params() {
    if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
    return this.#params;
  }
  set params(value) {
    this.#params = value;
  }
  /** Normalized URL for this request. */
  url;
  /** Client address for this request. */
  clientAddress;
  /** Whether this is a partial render (container API). */
  partial;
  /** Internal metadata about the current response route type. */
  responseRouteType;
  /** Internal flag to prevent rerouting this response to an error page. */
  skipErrorReroute = false;
  /** Whether to inject CSP meta tags. */
  shouldInjectCspMetaTags;
  /** Request-scoped locals object, shared with user middleware. */
  locals = {};
  /**
  * Memoized `props` (see `getProps`). `null` means "not yet computed"
  * — using `null` (rather than `undefined`) keeps the hidden class
  * stable and distinct from a valid-but-empty result.
  */
  props = null;
  /** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
  actionApiContext = null;
  /** Memoized `APIContext` (see `getAPIContext`). */
  apiContext = null;
  /** Registered context providers keyed by name. Lazy-initialized on first provide(). */
  #providers;
  /** Cached values from resolved providers. Lazy-initialized on first resolve(). */
  #providersResolvedValues;
  /** Cached promise for lazy component instance loading. */
  #componentInstancePromise;
  /** SSR result for the current page render. */
  result;
  /** Initial props (from container/error handler). */
  initialProps = {};
  /** Memoized Astro page partial. */
  #astroPagePartial;
  /**
  * Locale-prefixed pathname derived from the Host header for domain-based
  * i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
  * isn't served from a locale-mapped domain. When set, `this.pathname` is
  * derived from it so locale/param resolution match the route pattern.
  */
  #domainPathname;
  /** Memoized current locale. */
  #currentLocale;
  /** Memoized preferred locale. */
  #preferredLocale;
  /** Memoized preferred locale list. */
  #preferredLocaleList;
  constructor(manifest2, request, options, hooks) {
    this.manifest = manifest2;
    this.logger = getLogger(manifest2);
    this.streaming = hooks?.streaming ?? getEnvironment(manifest2).defaultStreaming(manifest2);
    this.renderError = hooks?.renderError;
    this.logRequest = hooks?.logRequest;
    this.request = request;
    options ??= getRenderOptions(request);
    this.routeData = options?.routeData;
    const self = this;
    this.renderOptions = {
      ...options ?? {
        addCookieHeader: false,
        clientAddress: void 0,
        prerenderedErrorPageFetch: fetch,
        routeData: void 0,
        waitUntil: void 0
      },
      get locals() {
        return self.locals;
      }
    };
    this.componentInstance = void 0;
    this.slots = void 0;
    const url = new URL(request.url);
    const publicPathname = this.#normalizePathname(url.pathname);
    const pathname = this.#computePathname(publicPathname);
    setPathname(url, publicPathname);
    setPathname(url, collapseDuplicateSlashes(url.pathname));
    const domainPathname = computePathnameFromDomain(request, url, manifest2.i18n, manifest2.base, manifest2.trailingSlash, manifest2.allowedDomains, this.logger, pathname);
    if (domainPathname) {
      this.#domainPathname = domainPathname;
      this.pathname = domainPathname;
    } else this.pathname = pathname;
    this.timeStart = performance.now();
    this.clientAddress = options?.clientAddress;
    this.locals = options?.locals ?? {};
    this.url = url;
    this.cookies = new AstroCookies(request, this.logger);
    if (manifest2.allowedDomains && manifest2.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
    if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, manifest2.trailingSlash, manifest2.buildFormat);
    this.#resolveRouteData();
  }
  /**
  * Triggers a rewrite. Delegates to the rewrites handler module.
  */
  rewrite(payload) {
    return executeRewrite(this, payload);
  }
  /**
  * Creates the SSR result for the current page render.
  */
  async createResult(mod, ctx) {
    const manifest2 = this.manifest;
    const env2 = getEnvironment(manifest2);
    const { clientDirectives, inlinedScripts, compressHTML } = manifest2;
    const renderers2 = env2.getRenderers(manifest2);
    const resolve = /* @__PURE__ */ __name((specifier) => env2.resolve(manifest2, specifier), "resolve");
    const routeData = this.routeData;
    const { links, scripts, styles } = await env2.headElements(manifest2, routeData);
    const extraStyleHashes = [];
    const extraScriptHashes = [];
    const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest2.shouldInjectCspMetaTags;
    const cspAlgorithm = manifest2.csp?.algorithm ?? "SHA-256";
    if (shouldInjectCspMetaTags) {
      for (const style of styles) {
        if (!isInlineCspHeadContent(style)) continue;
        extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
      }
      for (const script of scripts) {
        if (!isInlineCspHeadContent(script)) continue;
        extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
      }
    }
    const componentMetadata = await env2.componentMetadata(manifest2, routeData) ?? manifest2.componentMetadata;
    const headers = new Headers({ "Content-Type": "text/html" });
    const partial2 = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
    const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
    const status = this.status;
    const response = {
      status: actionResult?.error ? actionResult?.error.status : status,
      statusText: actionResult?.error ? actionResult?.error.type : "OK",
      get headers() {
        return headers;
      },
      set headers(_) {
        throw new AstroError(AstroResponseHeadersReassigned);
      }
    };
    const state = this;
    const result = {
      base: manifest2.base,
      userAssetsBase: manifest2.userAssetsBase,
      cancelled: false,
      clientDirectives,
      inlinedScripts,
      componentMetadata,
      compressHTML,
      cookies: this.cookies,
      createAstro: /* @__PURE__ */ __name((props, slots) => state.createAstro(result, props, slots, ctx), "createAstro"),
      links,
      params: this.params,
      partial: partial2,
      pathname: this.pathname,
      renderers: renderers2,
      resolve,
      response,
      request: this.request,
      scripts,
      styles,
      actionResult,
      async getServerIslandNameMap() {
        return (await getServerIslands(manifest2)).serverIslandNameMap ?? /* @__PURE__ */ new Map();
      },
      key: manifest2.key,
      trailingSlash: manifest2.trailingSlash,
      _metadata: {
        hasHydrationScript: false,
        rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
        hasRenderedHead: false,
        renderedScripts: /* @__PURE__ */ new Set(),
        hasDirectives: /* @__PURE__ */ new Set(),
        hasRenderedServerIslandRuntime: false,
        headInTree: false,
        extraHead: [],
        extraStyleHashes,
        extraScriptHashes,
        propagators: /* @__PURE__ */ new Set(),
        routeHasPropagation: false,
        pendingSlotEvaluations: [],
        templateDepth: 0
      },
      cspDestination: manifest2.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
      shouldInjectCspMetaTags,
      cspAlgorithm,
      directives: manifest2.csp?.directives ? [...manifest2.csp.directives] : [],
      scriptHashes: manifest2.csp?.scriptHashes ? [...manifest2.csp.scriptHashes] : [],
      scriptResources: manifest2.csp?.scriptResources ? [...manifest2.csp.scriptResources] : [],
      styleHashes: manifest2.csp?.styleHashes ? [...manifest2.csp.styleHashes] : [],
      styleResources: manifest2.csp?.styleResources ? [...manifest2.csp.styleResources] : [],
      isStrictDynamic: manifest2.csp?.isStrictDynamic ?? false,
      scriptDirective: {
        resources: manifest2.csp?.scriptDirective ? [...manifest2.csp.scriptDirective.resources] : [],
        hashes: manifest2.csp?.scriptDirective ? [...manifest2.csp.scriptDirective.hashes] : [],
        strictDynamic: manifest2.csp?.scriptDirective?.strictDynamic ?? false
      },
      styleDirective: {
        resources: manifest2.csp?.styleDirective ? [...manifest2.csp.styleDirective.resources] : [],
        hashes: manifest2.csp?.styleDirective ? [...manifest2.csp.styleDirective.hashes] : []
      },
      speculationRulesContent: manifest2.csp?.speculationRulesContent,
      internalFetchHeaders: manifest2.internalFetchHeaders
    };
    this.result = result;
    return result;
  }
  /**
  * Creates the Astro global object for a component render.
  */
  createAstro(result, props, slotValues, apiContext) {
    let astroPagePartial;
    if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
    this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
    astroPagePartial = this.#astroPagePartial;
    const Astro = Object.assign(Object.create(astroPagePartial), {
      props,
      self: null
    });
    Object.defineProperty(Astro, slotValuesSymbol, {
      value: slotValues,
      writable: true,
      configurable: true,
      enumerable: false
    });
    return Astro;
  }
  /**
  * Creates the Astro page-level partial (prototype for Astro global).
  */
  createAstroPagePartial(result, apiContext) {
    const state = this;
    const { cookies, locals, params, logger, url } = this;
    const { response } = result;
    const redirect = /* @__PURE__ */ __name((path, status = 302) => {
      if (state.request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
      return new Response(null, {
        status,
        headers: { Location: path }
      });
    }, "redirect");
    const rewrite = /* @__PURE__ */ __name(async (reroutePayload) => {
      return await state.rewrite(reroutePayload);
    }, "rewrite");
    const callAction = createCallAction(apiContext);
    const partial2 = {
      generator: ASTRO_GENERATOR,
      routePattern: this.routeData.route,
      isPrerendered: this.routeData.prerender,
      cookies,
      get slots() {
        const slotsByAstro = result._metadata.slotsByAstro ??= /* @__PURE__ */ new WeakMap();
        let slots = slotsByAstro.get(this);
        if (slots === void 0) {
          slots = new Slots(result, this[slotValuesSymbol] ?? null, logger);
          slotsByAstro.set(this, slots);
        }
        return slots;
      },
      get clientAddress() {
        return state.getClientAddress();
      },
      get currentLocale() {
        return state.computeCurrentLocale();
      },
      params,
      get preferredLocale() {
        return state.computePreferredLocale();
      },
      get preferredLocaleList() {
        return state.computePreferredLocaleList();
      },
      locals,
      redirect,
      rewrite,
      request: this.request,
      response,
      site: getSite(this.manifest),
      getActionResult: createGetActionResult(locals),
      get callAction() {
        return callAction;
      },
      url,
      get originPathname() {
        return getOriginPathname(state.request);
      },
      get csp() {
        return state.getCsp();
      },
      get logger() {
        return astroToRuntimeLogger(logger);
      }
    };
    this.defineProviderGetters(partial2);
    return partial2;
  }
  getClientAddress() {
    const { clientAddress } = this;
    const routeData = this.routeData;
    if (routeData.prerender) throw new AstroError({
      ...PrerenderClientAddressNotAvailable,
      message: PrerenderClientAddressNotAvailable.message(routeData.component)
    });
    if (clientAddress) return clientAddress;
    if (this.manifest.adapterName) throw new AstroError({
      ...ClientAddressNotAvailable,
      message: ClientAddressNotAvailable.message(this.manifest.adapterName)
    });
    throw new AstroError(StaticClientAddressNotAvailable);
  }
  getCookies() {
    return this.cookies;
  }
  getCsp() {
    const state = this;
    if (!this.manifest.csp) {
      if (getEnvironment(this.manifest).runtimeMode === "production") this.logger.warn("csp", `context.csp was used when rendering the route ${s.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
      return;
    }
    const warnedFallback = /* @__PURE__ */ new Set();
    const warnFallback = /* @__PURE__ */ __name((family, kind) => {
      if (kind === "default" || !state.result) return;
      const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
      if (defaultResources.length === 0) return;
      const key = `${family}:${kind}`;
      if (warnedFallback.has(key)) return;
      warnedFallback.add(key);
      const general = `${family}-src`;
      const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
      state.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
    }, "warnFallback");
    return {
      insertDirective(payload) {
        if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
      },
      insertScriptResource(payload) {
        if (!state.result) return;
        warnFallback("script", normalizeCspResourceEntry(payload).kind);
        state.result.scriptDirective.resources.push(payload);
      },
      insertStyleResource(payload) {
        if (!state.result) return;
        warnFallback("style", normalizeCspResourceEntry(payload).kind);
        state.result.styleDirective.resources.push(payload);
      },
      insertStyleHash(payload) {
        state.result?.styleDirective.hashes.push(payload);
      },
      insertScriptHash(payload) {
        state.result?.scriptDirective.hashes.push(payload);
      }
    };
  }
  computeCurrentLocale() {
    const { url, manifest: { i18n }, routeData } = this;
    if (!i18n || !routeData) return;
    const { defaultLocale, locales, strategy } = i18n;
    const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
    if (this.#currentLocale) return this.#currentLocale;
    let computedLocale;
    if (isRouteServerIsland(routeData)) {
      let referer = this.request.headers.get("referer");
      if (referer) {
        if (URL.canParse(referer)) referer = new URL(referer).pathname;
        computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
      }
    } else {
      let pathname = routeData.pathname;
      if (this.#domainPathname) pathname = this.pathname;
      else if (url && !routeData.pattern.test(url.pathname)) {
        for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
          pathname = fallbackRoute.pathname;
          break;
        }
      }
      pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
      computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
      if (routeData.params.length > 0) {
        const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
        if (localeFromParams) computedLocale = localeFromParams;
      }
    }
    this.#currentLocale = computedLocale ?? fallbackTo;
    return this.#currentLocale;
  }
  computePreferredLocale() {
    const { manifest: { i18n }, request } = this;
    if (!i18n) return;
    return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
  }
  computePreferredLocaleList() {
    const { manifest: { i18n }, request } = this;
    if (!i18n) return;
    return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
  }
  /**
  * Lazily loads the route's component module. Returns the cached
  * instance if already loaded. The promise is cached so concurrent
  * callers share the same load.
  */
  async loadComponentInstance() {
    if (this.componentInstance) return this.componentInstance;
    if (this.#componentInstancePromise) return this.#componentInstancePromise;
    this.#componentInstancePromise = getEnvironment(this.manifest).getComponentByRoute(this.manifest, this.routeData).then((mod) => {
      this.componentInstance = mod;
      return mod;
    });
    return this.#componentInstancePromise;
  }
  /**
  * Registers a context provider under the given key. Handlers call
  * this to contribute values to the request context (e.g. sessions).
  * The `create` factory is called lazily on the first `resolve(key)`.
  */
  provide(key, provider) {
    (this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
  }
  /**
  * Lazily resolves a provider registered under `key`. Calls
  * `provider.create()` on first access and caches the result.
  * Returns `undefined` if no provider was registered for the key.
  */
  resolve(key) {
    if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
    const provider = this.#providers?.get(key);
    if (!provider) return void 0;
    const value = provider.create();
    (this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
    return value;
  }
  /**
  * Runs all registered `finalize` callbacks. Should be called after
  * the response is produced, typically in a `finally` block.
  *
  * Returns synchronously (no promise allocation) when nothing needs
  * finalizing — important for the hot path where sessions are not used.
  */
  finalizeAll() {
    if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
    let chain;
    for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
      const result = provider.finalize(this.#providersResolvedValues.get(key));
      if (result) chain = chain ? chain.then(() => result) : result;
    }
    return chain;
  }
  /**
  * Adds lazy getters to `target` for each registered provider key.
  * Used by context creation (APIContext, Astro global) so that
  * provider values like `session` and `cache` appear as properties
  * without hard-coding the keys.
  *
  * Always defines a `session` getter (returning `undefined` when no
  * provider is registered) so `ctx.session` / `Astro.session` is a
  * present property regardless of whether the sessions handler was
  * included in the pipeline.
  */
  defineProviderGetters(target) {
    const state = this;
    if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
      get: /* @__PURE__ */ __name(() => state.resolve(key), "get"),
      enumerable: true,
      configurable: true
    });
    if (!this.#providers?.has("session")) {
      let warned = false;
      Object.defineProperty(target, "session", {
        get() {
          if (!warned) {
            warned = true;
            state.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
          }
        },
        enumerable: true,
        configurable: true
      });
    }
  }
  /**
  * Resolves the route to use for this request and stores it on
  * `this.routeData`. If the adapter (or the dev server) provided a
  * `routeData` via render options it's already set and this is a
  * no-op. Otherwise we use the app's synchronous route matcher and
  * fall back to a `404.astro` route so middleware can still run.
  *
  * Called eagerly from the constructor so individual handlers
  * (actions, pages, middleware, etc.) always see a resolved route
  * without the caller needing an extra setup step.
  *
  * Once routeData is known, finalizes `this.pathname`: in dev, if the
  * matched route has no `.html` extension, strip `.html` / `/index.html`
  * suffixes so the rendering pipeline sees the canonical pathname.
  */
  /**
  * Strip `.html` / `/index.html` suffixes from the pathname so the
  * rendering pipeline sees the canonical route path. Only applies to
  * page routes where `.html` is framework-injected. Endpoint routes
  * preserve `.html` because any such suffix is user-provided (e.g.
  * from `getStaticPaths` params). Skipped when the matched route
  * itself has an `.html` extension in its definition.
  */
  #stripHtmlExtension() {
    if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) {
      const original = this.pathname;
      this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
      if (this.manifest.trailingSlash === "always" && this.pathname !== "" && !this.pathname.endsWith("/")) this.pathname += "/";
      if (this.pathname !== original && this.routeData.pattern.test(original) && !this.routeData.pattern.test(this.pathname)) this.pathname = original;
    }
  }
  #resolveRouteData() {
    if (this.routeData) {
      this.#stripHtmlExtension();
      return;
    }
    const matched = matchRoute(this.manifest, this.pathname);
    if (matched && matched.prerender && this.manifest.serverLike) {
      if (matched.params.length > 0) {
        const allMatches = matchAllRoutes(this.manifest, this.pathname);
        this.routeData = allMatches.find((r2) => !r2.prerender);
      } else this.routeData = void 0;
    } else this.routeData = matched;
    this.logger.debug("router", "Astro matched the following route for " + this.request.url);
    this.logger.debug("router", "RouteData:\n" + this.routeData);
    if (!this.routeData) {
      const custom404 = getCustom404Route(getRouteTable(this.manifest));
      if (custom404 && !custom404.prerender) this.routeData = custom404;
    }
    if (!this.routeData) {
      this.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
      this.logger.debug("router", "Here's the available routes:\n", getRouteTable(this.manifest));
      return;
    }
    this.#stripHtmlExtension();
  }
  /**
  * Strips the manifest's base from a normalized request pathname and prepends
  * a forward slash.
  *
  * Mirrors `BaseApp.removeBase`: the router matches against this stripped path
  * while middleware reads the un-stripped `context.url.pathname`, so both must
  * strip the base identically.
  */
  #computePathname(normalizedPathname) {
    return prependForwardSlash(stripRequestBase(normalizedPathname, this.manifest.base));
  }
  /**
  * Decodes and normalizes the public request pathname before deriving the
  * separate pathname used for route matching.
  */
  #normalizePathname(pathname) {
    try {
      pathname = validateAndDecodePathname(pathname);
    } catch (e2) {
      if (e2 instanceof MultiLevelEncodingError) this.invalidEncoding = true;
      else this.logger.error(null, e2.toString());
    }
    return collapseDuplicateSlashes(pathname);
  }
  /**
  * Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
  * from the request headers, validates them against the manifest's
  * `allowedDomains`, and updates `this.url` accordingly. Also resolves
  * `clientAddress` from X-Forwarded-For when the host is trusted.
  *
  * Only called when `allowedDomains` is configured — without it,
  * forwarded headers are never trusted.
  */
  #applyForwardedHeaders() {
    const headers = this.request.headers;
    const allowedDomains = this.manifest.allowedDomains;
    const validated = validateForwardedHeaders(getFirstForwardedValue$1(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue$1(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue$1(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
    if (!validated.protocol && !validated.host && !validated.port) return;
    if (validated.protocol) this.url.protocol = validated.protocol + ":";
    if (validated.host) {
      const colonIdx = validated.host.indexOf(":");
      if (colonIdx !== -1) {
        this.url.hostname = validated.host.slice(0, colonIdx);
        this.url.port = validated.host.slice(colonIdx + 1);
      } else {
        this.url.hostname = validated.host;
        this.url.port = "";
      }
    }
    if (validated.port) this.url.port = validated.port;
    if (validated.host !== void 0 && !this.clientAddress) {
      const forwardedFor = getFirstForwardedValue$1(this.request.headers.get("x-forwarded-for") ?? void 0);
      if (forwardedFor) this.clientAddress = forwardedFor;
    }
    this.request = new Request(this.url, this.request);
  }
  /**
  * Returns the resolved `props` for this render, computing them lazily
  * from the route + component module on first access. If the
  * `initialProps` already carries user-supplied props (e.g. the
  * container API) those are used verbatim.
  */
  async getProps() {
    if (this.props !== null) return this.props;
    if (Object.keys(this.initialProps).length > 0) {
      this.props = this.initialProps;
      return this.props;
    }
    const mod = await this.loadComponentInstance();
    this.props = await getProps({
      mod,
      routeData: this.routeData,
      routeCache: getRouteCache(this.manifest),
      pathname: this.pathname,
      logger: this.logger,
      serverLike: this.manifest.serverLike,
      base: this.manifest.base,
      trailingSlash: this.manifest.trailingSlash
    });
    return this.props;
  }
  /**
  * Returns the `ActionAPIContext` for this render, creating it lazily.
  * Used by middleware, actions, and page dispatch.
  */
  getActionAPIContext() {
    if (this.actionApiContext !== null) return this.actionApiContext;
    const state = this;
    const ctx = {
      get cookies() {
        return state.cookies;
      },
      routePattern: this.routeData.route,
      isPrerendered: this.routeData.prerender,
      get clientAddress() {
        return state.getClientAddress();
      },
      get currentLocale() {
        return state.computeCurrentLocale();
      },
      generator: ASTRO_GENERATOR,
      get locals() {
        return state.locals;
      },
      set locals(_) {
        throw new AstroError(LocalsReassigned);
      },
      params: this.params,
      get preferredLocale() {
        return state.computePreferredLocale();
      },
      get preferredLocaleList() {
        return state.computePreferredLocaleList();
      },
      request: this.request,
      site: getSite(this.manifest),
      url: this.url,
      get originPathname() {
        return getOriginPathname(state.request);
      },
      get csp() {
        return state.getCsp();
      },
      get logger() {
        return astroToRuntimeLogger(state.logger);
      }
    };
    this.defineProviderGetters(ctx);
    this.actionApiContext = ctx;
    return this.actionApiContext;
  }
  /**
  * Returns the `APIContext` for this render, creating it lazily from
  * the memoized props + action context.
  *
  * Called before `getProps()` has resolved, the context carries
  * `props: null` and is not memoized; the next call after `getProps()`
  * fills in `props` on the same object. Callers that read `props`
  * must await `getProps()` first.
  */
  getAPIContext() {
    if (this.apiContext !== null) return this.apiContext;
    const actionApiContext = this.getActionAPIContext();
    const state = this;
    const redirect = /* @__PURE__ */ __name((path, status = 302) => new Response(null, {
      status,
      headers: { Location: path }
    }), "redirect");
    const rewrite = /* @__PURE__ */ __name(async (reroutePayload) => {
      return await state.rewrite(reroutePayload);
    }, "rewrite");
    actionApiContext[fetchStateSymbol] = this;
    const apiContext = Object.assign(actionApiContext, {
      props: this.props,
      redirect,
      rewrite,
      getActionResult: createGetActionResult(actionApiContext.locals),
      callAction: createCallAction(actionApiContext)
    });
    if (this.props !== null) this.apiContext = apiContext;
    return apiContext;
  }
  /**
  * Invalidates the cached `APIContext` so the next `getAPIContext()`
  * call re-derives it from the (possibly mutated) state. Used
  * after an in-flight rewrite swaps the route / request / params.
  */
  invalidateContexts() {
    this.props = null;
    this.actionApiContext = null;
    this.apiContext = null;
  }
  resetResponseMetadata() {
    this.responseRouteType = void 0;
    this.skipErrorReroute = false;
  }
};
var FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set([
  "__proto__",
  "constructor",
  "prototype"
]);
var NOOP_ACTIONS_MOD = { server: {} };
var actionsMemo = createAsyncManifestMemo(async (manifest2) => manifest2.actions ? await manifest2.actions() : NOOP_ACTIONS_MOD);
function getActions(manifest2) {
  return actionsMemo.get(manifest2);
}
__name(getActions, "getActions");
async function getAction(manifest2, path) {
  const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
  let { server: server2 } = await getActions(manifest2);
  if (!server2 || !(typeof server2 === "object")) throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof server2}.`);
  for (const key of pathKeys) {
    if (typeof server2 === "function") throw new AstroError({
      ...ActionNotFoundError,
      message: ActionNotFoundError.message(pathKeys.join("."))
    });
    if (FORBIDDEN_PATH_KEYS.has(key)) throw new AstroError({
      ...ActionNotFoundError,
      message: ActionNotFoundError.message(pathKeys.join("."))
    });
    if (!Object.hasOwn(server2, key)) throw new AstroError({
      ...ActionNotFoundError,
      message: ActionNotFoundError.message(pathKeys.join("."))
    });
    server2 = server2[key];
  }
  if (typeof server2 !== "function") throw new TypeError(`Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server2}.`);
  return server2;
}
__name(getAction, "getAction");
function getActionContext(context) {
  const callerInfo = getCallerInfo(context);
  const actionResultAlreadySet = Boolean(context.locals._actionPayload);
  let action = void 0;
  if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
    calledFrom: callerInfo.from,
    name: callerInfo.name,
    handler: /* @__PURE__ */ __name(async () => {
      const { manifest: manifest2 } = getFetchStateFromAPIContext(context);
      const callerInfoName = shouldAppendForwardSlash(manifest2.trailingSlash, manifest2.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
      let baseAction;
      try {
        baseAction = await getAction(manifest2, callerInfoName);
      } catch (error3) {
        if (error3 instanceof Error && "name" in error3 && typeof error3.name === "string" && error3.name === ActionNotFoundError.name) return {
          data: void 0,
          error: new ActionError({ code: "NOT_FOUND" })
        };
        if (error3 instanceof URIError) return {
          data: void 0,
          error: new ActionError({ code: "NOT_FOUND" })
        };
        throw error3;
      }
      const bodySizeLimit = manifest2.actionBodySizeLimit;
      let input;
      try {
        input = await parseRequestBody(context.request, bodySizeLimit);
      } catch (e2) {
        if (e2 instanceof ActionError) return {
          data: void 0,
          error: e2
        };
        if (e2 instanceof TypeError) return {
          data: void 0,
          error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
        };
        if (e2 instanceof SyntaxError) return {
          data: void 0,
          error: new ActionError({
            code: "BAD_REQUEST",
            message: "Invalid JSON request body"
          })
        };
        throw e2;
      }
      const omitKeys = [
        "props",
        "getActionResult",
        "callAction",
        "redirect"
      ];
      const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
      Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
      return baseAction.bind(actionAPIContext)(input);
    }, "handler")
  };
  function setActionResult(actionName, actionResult) {
    context.locals._actionPayload = {
      actionResult,
      actionName
    };
  }
  __name(setActionResult, "setActionResult");
  return {
    action,
    setActionResult,
    serializeActionResult,
    deserializeActionResult
  };
}
__name(getActionContext, "getActionContext");
function getCallerInfo(ctx) {
  if (ctx.routePattern === "/_actions/[...path]") return {
    from: "rpc",
    name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
  };
  const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
  if (queryParam) return {
    from: "form",
    name: queryParam
  };
}
__name(getCallerInfo, "getCallerInfo");
async function parseRequestBody(request, bodySizeLimit) {
  const contentType = request.headers.get("content-type");
  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
  const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
  if (!contentType) return void 0;
  if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
    code: "CONTENT_TOO_LARGE",
    message: `Request body exceeds ${bodySizeLimit} bytes`
  });
  try {
    if (hasContentType(contentType, formContentTypes)) {
      if (!hasContentLength) {
        const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
        return await new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: toArrayBuffer(body)
        }).formData();
      }
      return await request.clone().formData();
    }
    if (hasContentType(contentType, ["application/json"])) {
      if (contentLength === 0) return void 0;
      if (!hasContentLength) {
        const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
        if (body.byteLength === 0) return void 0;
        return JSON.parse(new TextDecoder().decode(body));
      }
      return await request.clone().json();
    }
  } catch (e2) {
    if (e2 instanceof BodySizeLimitError) throw new ActionError({
      code: "CONTENT_TOO_LARGE",
      message: `Request body exceeds ${bodySizeLimit} bytes`
    });
    throw e2;
  }
  throw new TypeError("Unsupported content type");
}
__name(parseRequestBody, "parseRequestBody");
var ACTION_API_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
  const type = contentType.split(";")[0].toLowerCase();
  return expected.some((t2) => type === t2);
}
__name(hasContentType, "hasContentType");
function serializeActionResult(res) {
  if (res.error) {
    if (Object.assign({
      "ASSETS_PREFIX": void 0,
      "BASE_URL": "/",
      "DEV": false,
      "MODE": "production",
      "PROD": true,
      "SITE": void 0,
      "SSR": true
    }, { OS: "Windows_NT" })?.DEV) actionResultErrorStack.set(res.error.stack);
    let body2;
    if (res.error instanceof ActionInputError) body2 = {
      type: res.error.type,
      issues: res.error.issues,
      fields: res.error.fields
    };
    else body2 = {
      ...res.error,
      message: res.error.message
    };
    return {
      type: "error",
      status: res.error.status,
      contentType: "application/json",
      body: JSON.stringify(body2)
    };
  }
  if (res.data === void 0) return {
    type: "empty",
    status: 204
  };
  let body;
  try {
    body = stringify$2(res.data, { URL: /* @__PURE__ */ __name((value) => value instanceof URL && value.href, "URL") });
  } catch (e2) {
    let hint = ActionsReturnedInvalidDataError.hint;
    if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
    throw new AstroError({
      ...ActionsReturnedInvalidDataError,
      message: ActionsReturnedInvalidDataError.message(String(e2)),
      hint
    });
  }
  return {
    type: "data",
    status: 200,
    contentType: "application/json+devalue",
    body
  };
}
__name(serializeActionResult, "serializeActionResult");
function toArrayBuffer(buffer2) {
  const copy = new Uint8Array(buffer2.byteLength);
  copy.set(buffer2);
  return copy.buffer;
}
__name(toArrayBuffer, "toArrayBuffer");
function handleAction(apiContext, state) {
  markFeatureUsed(state.manifest, FetchFeatures.actions);
  const invalidEncodingResponse = rejectInvalidEncoding(state);
  if (invalidEncodingResponse) return Promise.resolve(invalidEncodingResponse);
  if (apiContext.isPrerendered) return;
  const { action, setActionResult } = getActionContext(apiContext);
  if (!action) return;
  if (state.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
  return executeAction(action, setActionResult);
}
__name(handleAction, "handleAction");
async function executeAction(action, setActionResult) {
  const serialized = serializeActionResult(await action.handler());
  if (action.calledFrom === "rpc") {
    if (serialized.type === "empty") return new Response(null, { status: serialized.status });
    return new Response(serialized.body, {
      status: serialized.status,
      headers: { "Content-Type": serialized.contentType }
    });
  }
  setActionResult(action.name, serialized);
}
__name(executeAction, "executeAction");
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
  const delay = status === 302 ? 2 : 0;
  const rel = escape(String(relativeLocation));
  return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
__name(redirectTemplate, "redirectTemplate");
function handleTrailingSlash(state) {
  const invalidEncodingResponse = rejectInvalidEncoding(state);
  if (invalidEncodingResponse) return invalidEncodingResponse;
  const url = new URL(state.request.url);
  const redirect = redirectTrailingSlash(state.manifest.trailingSlash, url.pathname);
  if (redirect === url.pathname) return;
  const addCookieHeader = state.renderOptions.addCookieHeader;
  const status = state.request.method === "GET" ? 301 : 308;
  const location = redirect + url.search;
  const response = new Response(redirectTemplate({
    status,
    relativeLocation: location,
    absoluteLocation: location,
    from: state.request.url
  }), {
    status,
    headers: { location }
  });
  prepareResponse(response, { addCookieHeader });
  return response;
}
__name(handleTrailingSlash, "handleTrailingSlash");
function redirectTrailingSlash(trailingSlash, pathname) {
  if (pathname === "/" || isInternalPath(pathname)) return pathname;
  const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
  if (path !== pathname) return path;
  if (trailingSlash === "ignore") return pathname;
  if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
  if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
  return pathname;
}
__name(redirectTrailingSlash, "redirectTrailingSlash");
function handleNotFound(state) {
  const invalidEncodingResponse = rejectInvalidEncoding(state);
  if (invalidEncodingResponse) return Promise.resolve(invalidEncodingResponse);
  if (state.routeData) return;
  return renderErrorFromState(state, state.request, {
    ...state.renderOptions,
    status: 404,
    pathname: state.pathname
  });
}
__name(handleNotFound, "handleNotFound");
function isExternalURL(url) {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
__name(isExternalURL, "isExternalURL");
function redirectIsExternal(redirect) {
  if (typeof redirect === "string") return isExternalURL(redirect);
  else return isExternalURL(redirect.destination);
}
__name(redirectIsExternal, "redirectIsExternal");
function computeRedirectStatus(method, redirect, redirectRoute) {
  return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
__name(computeRedirectStatus, "computeRedirectStatus");
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
  if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
  else if (typeof redirect === "string") {
    if (redirectIsExternal(redirect)) return redirect;
    else {
      let target = redirect;
      for (const param of Object.keys(params)) {
        const paramValue = params[param];
        target = target.replace(`[${param}]`, () => paramValue).replace(`[...${param}]`, () => paramValue);
      }
      return target;
    }
  } else if (typeof redirect === "undefined") return "/";
  return redirect.destination;
}
__name(resolveRedirectTarget, "resolveRedirectTarget");
async function renderRedirect(state) {
  markFeatureUsed(state.manifest, FetchFeatures.redirects);
  const { redirect, redirectRoute } = state.routeData;
  const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
  const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.manifest.trailingSlash)) };
  if (redirect && redirectIsExternal(redirect)) {
    if (typeof redirect === "string") return Response.redirect(redirect, status);
    else return Response.redirect(redirect.destination, status);
  }
  return new Response(null, {
    status,
    headers
  });
}
__name(renderRedirect, "renderRedirect");
function redirectDelayFor(status) {
  return status === 302 ? 2 : 0;
}
__name(redirectDelayFor, "redirectDelayFor");
async function renderRedirectPage(manifest2, request, props) {
  const route = getRouteTable(manifest2).routes.find((candidate) => isRoute3xx(candidate.route));
  if (!route) return;
  const state = new FetchState(manifest2, request);
  try {
    state.skipMiddleware = true;
    state.routeData = route;
    state.pathname = route.route;
    state.status = 200;
    state.componentInstance = await getEnvironment(manifest2).getComponentByRoute(manifest2, route);
    state.initialProps = { ...props };
    return await (await handleMiddleware(state, handlePages)).text();
  } catch (err) {
    state.logger.error("redirects", `Failed to render \`src/pages/3xx.astro\` for the redirect from \`${props.from}\` to \`${props.to}\`. Falling back to the built-in redirect page.
${err instanceof Error ? err.stack ?? err.message : String(err)}`);
    return;
  } finally {
    try {
      const finalize2 = state.finalizeAll();
      if (finalize2) await finalize2;
    } catch (err) {
      state.logger.error("redirects", `Failed to finalize the \`src/pages/3xx.astro\` render for the redirect from \`${props.from}\` to \`${props.to}\`.
${err instanceof Error ? err.stack ?? err.message : String(err)}`);
    }
  }
}
__name(renderRedirectPage, "renderRedirectPage");
function logRequestFromState(state, payload) {
  if (state.logRequest) state.logRequest(payload);
  else getEnvironment(state.manifest).logRequest(state.manifest, payload);
}
__name(logRequestFromState, "logRequestFromState");
function actionsAndPages(state, ctx) {
  if (!state.skipMiddleware) {
    const actionResult = handleAction(ctx, state);
    if (actionResult) return actionResult.then((response) => response ?? handlePages(state, ctx));
  }
  return handlePages(state, ctx);
}
__name(actionsAndPages, "actionsAndPages");
async function withRedirectPageBody(state, response) {
  const status = response.status;
  if (status < 300 || status >= 400 || response.body !== null) return response;
  if (!getEnvironment(state.manifest).rendersRedirectPage()) return response;
  const to = response.headers.get("location");
  if (!to) return response;
  const html = await renderRedirectPage(state.manifest, state.request, {
    from: state.pathname,
    to,
    status,
    delay: redirectDelayFor(status)
  });
  if (html === void 0) return response;
  const headers = new Headers(response.headers);
  if (!headers.has("content-type")) headers.set("content-type", "text/html");
  return new Response(html, {
    status,
    statusText: response.statusText,
    headers
  });
}
__name(withRedirectPageBody, "withRedirectPageBody");
async function handleRequest(state) {
  await getResolvedLogger(state.manifest);
  markFeatureUsed(state.manifest, ALL_FETCH_FEATURES);
  const invalidEncodingResponse = rejectInvalidEncoding(state);
  if (invalidEncodingResponse) return invalidEncodingResponse;
  const trailingSlashRedirect = handleTrailingSlash(state);
  if (trailingSlashRedirect) return trailingSlashRedirect;
  const notFoundResponse = handleNotFound(state);
  if (notFoundResponse) return notFoundResponse;
  return render(state);
}
__name(handleRequest, "handleRequest");
async function render(state) {
  const routeData = state.routeData;
  const pathname = state.pathname;
  const request = state.request;
  const { addCookieHeader } = state.renderOptions;
  state.status = getDefaultStatusCode(state.manifest, routeData, pathname);
  let response;
  let finalizeError;
  try {
    const sessionP = state.manifest.sessionConfig ? provideSession(state) : void 0;
    const cacheP = provideCache(state);
    if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
    markFeatureUsed(state.manifest, FetchFeatures.sessions);
    if (routeData.type === "redirect") {
      const redirectResponse = await withRedirectPageBody(state, await renderRedirect(state));
      logRequestFromState(state, {
        pathname,
        method: request.method,
        statusCode: redirectResponse.status,
        isRewrite: false,
        timeStart: state.timeStart
      });
      prepareResponse(redirectResponse, { addCookieHeader });
      state.logger.flush();
      return redirectResponse;
    }
    const i18n = getI18n(state.manifest);
    if (!state.manifest.cacheProvider) {
      markFeatureUsed(state.manifest, FetchFeatures.cache);
      response = await handleMiddleware(state, actionsAndPages);
      if (i18n) response = await finalizeI18n(i18n, state, response);
    } else {
      const runPipeline = /* @__PURE__ */ __name(async () => {
        let res = await handleMiddleware(state, actionsAndPages);
        if (i18n) res = await finalizeI18n(i18n, state, res);
        return res;
      }, "runPipeline");
      response = await handleCache(state, runPipeline);
    }
    logRequestFromState(state, {
      pathname,
      method: request.method,
      statusCode: response.status,
      isRewrite: state.isRewriting,
      timeStart: state.timeStart
    });
  } catch (err) {
    state.logger.error(null, err.stack || err.message || String(err));
    return renderErrorFromState(state, request, {
      ...state.renderOptions,
      status: 500,
      error: err,
      pathname: state.pathname
    });
  } finally {
    try {
      const finalize2 = state.finalizeAll();
      if (finalize2) await finalize2;
    } catch (err) {
      finalizeError = err;
      state.logger.error(null, err.stack || err.message || String(err));
    }
  }
  if (finalizeError) return renderErrorFromState(state, request, {
    ...state.renderOptions,
    status: 500,
    error: finalizeError,
    pathname: state.pathname
  });
  if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return renderErrorFromState(state, request, {
    ...state.renderOptions,
    response,
    status: response.status,
    error: response.status === 500 ? null : void 0,
    pathname: state.pathname
  });
  response = await withRedirectPageBody(state, response);
  prepareResponse(response, { addCookieHeader });
  state.logger.flush();
  return response;
}
__name(render, "render");
var DefaultFetchHandler = class {
  static {
    __name(this, "DefaultFetchHandler");
  }
  #manifest;
  /**
  * `BaseApp` passes itself so states resolve that app's manifest ahead of
  * the ambient one; generated builds construct the handler with no
  * arguments and use the ambient manifest.
  */
  constructor(app2) {
    this.#manifest = app2?.manifest;
  }
  fetch = /* @__PURE__ */ __name((request) => {
    const options = getRenderOptions(request);
    return handleRequest(new FetchState(this.#manifest ?? getAmbientManifest(), request, options));
  }, "fetch");
};
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
function safeDecodePathname(manifest2, pathname) {
  try {
    return validateAndDecodePathname(pathname);
  } catch (e2) {
    new AstroIntegrationLogger(getLogger(manifest2).options, manifest2.adapterName).debug(e2.toString());
    try {
      return decodeURI(pathname);
    } catch {
      return pathname;
    }
  }
}
__name(safeDecodePathname, "safeDecodePathname");
function matchRequest(manifest2, request, allowPrerenderedRoutes = false) {
  const url = new URL(request.url);
  if (manifest2.assets.has(url.pathname)) return void 0;
  let pathname = computePathnameFromDomain(request, url, manifest2.i18n, manifest2.base, manifest2.trailingSlash, manifest2.allowedDomains, getLogger(manifest2));
  if (!pathname) pathname = prependForwardSlash(stripRequestBase(url.pathname, manifest2.base));
  pathname = safeDecodePathname(manifest2, pathname);
  const routeData = matchRoute(manifest2, pathname);
  if (!routeData) return void 0;
  if (allowPrerenderedRoutes) return routeData;
  if (routeData.prerender) {
    if (routeData.params.length > 0) return matchAllRoutes(manifest2, pathname).find((r2) => !r2.prerender);
    return;
  }
  return routeData;
}
__name(matchRequest, "matchRequest");
var BaseApp = class BaseApp2 {
  static {
    __name(this, "BaseApp");
  }
  manifest;
  #adapterLogger;
  baseWithoutTrailingSlash;
  /**
  * The streaming flag passed to the constructor, surfaced through the
  * protected `resolveStreaming()` hook and fed into the internal
  * `FetchState` facade hooks on the fast path.
  */
  #streaming;
  /**
  * The handler that turns incoming `Request` objects into `Response`s.
  * Defaults to a `DefaultFetchHandler` pinned to this app and can be
  * overridden via `setFetchHandler` — typically by the bundled
  * entrypoint after importing `virtual:astro:fetchable`.
  */
  #fetchHandler;
  #errorHandler;
  /**
  * Whether a custom fetch handler (from `src/fetch.ts`) has been set
  * via `setFetchHandler`. When false, the `DefaultFetchHandler` is
  * in use and all features are implicitly active.
  */
  #hasCustomFetchHandler = false;
  /**
  * Whether the missing-feature check has already run. We only want
  * to warn once — after the first request in dev, or at build end.
  */
  #featureCheckDone = false;
  get logger() {
    return getLogger(this.manifest);
  }
  /**
  * Route data derived from the manifest, used for route matching. Reads and
  * writes go through the single per-manifest route table, so HMR updates are
  * visible to every consumer at once.
  */
  get manifestData() {
    return getRouteTable(this.manifest);
  }
  set manifestData(routesList) {
    updateRouteTable(this.manifest, routesList.routes);
  }
  get adapterLogger() {
    const currentOptions = this.logger.options;
    if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
    return this.#adapterLogger;
  }
  constructor(manifest2, streaming = true) {
    this.manifest = manifest2;
    this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest2.base);
    this.#streaming = streaming;
    getRouteTable(manifest2);
    getLogger(manifest2);
    this.#fetchHandler = new DefaultFetchHandler(this);
    this.#errorHandler = this.createErrorHandler();
  }
  /**
  * Resolves the user-configured logger destination from the manifest and
  * returns the logger. Lazy and only resolves once; safe to call before
  * the first render (adapters use this to log startup messages through
  * the configured destination).
  */
  getLogger() {
    return getResolvedLogger(this.manifest);
  }
  /**
  * The streaming flag fed into the internal `FetchState` facade hooks on
  * the fast path. Returns the constructor flag by
  * default; `BuildApp` overrides this to return `undefined` so streaming
  * falls through to the environment default (`manifest.serverLike`).
  */
  resolveStreaming() {
    return this.#streaming;
  }
  /**
  * Override the fetch handler used to dispatch requests. Entrypoints
  * call this with the default export of `virtual:astro:fetchable` to
  * plug in a user-authored handler from `src/fetch.ts`.
  */
  setFetchHandler(handler) {
    this.#fetchHandler = handler;
    this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
  }
  /**
  * Returns the error handler used by this app. The default is a thin
  * bridge over the functional error API — strategy selection (production
  * default / dev / build) is environment-driven inside `renderErrorPage`.
  * External subclasses can override this to customize error rendering.
  */
  createErrorHandler() {
    return { renderError: /* @__PURE__ */ __name((request, options) => renderErrorPage(this.manifest, request, options), "renderError") };
  }
  /**
  * Resets the cached adapter logger so it picks up a new logger instance.
  * Used by BuildApp when the logger is replaced via setOptions().
  */
  resetAdapterLogger() {
    this.#adapterLogger = void 0;
  }
  getAllowedDomains() {
    return this.manifest.allowedDomains;
  }
  matchesAllowedDomains(forwardedHost, protocol) {
    return BaseApp2.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
  }
  static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
    if (!allowedDomains || allowedDomains.length === 0) return false;
    try {
      const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
      return allowedDomains.some((pattern) => {
        return matchPattern(testUrl, pattern);
      });
    } catch {
      return false;
    }
  }
  set setManifestData(newManifestData) {
    updateRouteTable(this.manifest, newManifestData.routes);
  }
  removeBase(pathname) {
    return stripRequestBase(pathname, this.manifest.base);
  }
  /**
  * Fully decodes a pathname, falling back to a single decode and then the raw pathname
  * when validation fails. Adapter matching runs before `render()`, so it must not throw
  * for request input that render-time validation handles.
  */
  safeDecodePathname(pathname) {
    try {
      return validateAndDecodePathname(pathname);
    } catch (e2) {
      this.adapterLogger.debug(e2.toString());
      try {
        return decodeURI(pathname);
      } catch {
        return pathname;
      }
    }
  }
  /**
  * Extracts the base-stripped, decoded pathname from a request.
  * Used by adapters to compute the pathname for dev-mode route matching.
  */
  getPathnameFromRequest(request) {
    const url = new URL(request.url);
    const pathname = prependForwardSlash(this.removeBase(url.pathname));
    return this.safeDecodePathname(pathname);
  }
  /**
  * Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
  * routes aren't returned, even if they are matched.
  *
  * When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
  * @param request
  * @param allowPrerenderedRoutes
  */
  match(request, allowPrerenderedRoutes = false) {
    return matchRequest(this.manifest, request, allowPrerenderedRoutes);
  }
  /**
  * A matching route function to use in the development server.
  * Contrary to the `.match` function, this function resolves props and params, returning the correct
  * route based on the priority, segments. It also returns the correct, resolved pathname.
  * @param pathname
  */
  devMatch(pathname) {
  }
  computePathnameFromDomain(request) {
    return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.manifest.allowedDomains, this.logger);
  }
  async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
    await getResolvedLogger(this.manifest);
    if (routeData) {
      this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
      this.logger.debug("router", "RouteData");
      this.logger.debug("router", routeData);
    }
    if (locals) {
      if (typeof locals !== "object") {
        const error3 = new AstroError(LocalsNotAnObject);
        this.logger.error(null, error3.stack);
        return this.renderError(request, {
          addCookieHeader,
          clientAddress,
          prerenderedErrorPageFetch,
          locals: void 0,
          routeData,
          waitUntil,
          status: 500,
          error: error3
        });
      }
    }
    if (!routeData) {
      const domainPathname = this.computePathnameFromDomain(request);
      if (domainPathname) routeData = matchRoute(this.manifest, this.safeDecodePathname(domainPathname));
    }
    const resolvedOptions = {
      addCookieHeader,
      clientAddress,
      prerenderedErrorPageFetch,
      locals,
      routeData,
      waitUntil
    };
    let response;
    if (this.#fetchHandler instanceof DefaultFetchHandler) response = await handleRequest(new FetchState(this.manifest, request, resolvedOptions, {
      streaming: this.resolveStreaming(),
      renderError: /* @__PURE__ */ __name((req, opts) => this.renderError(req, opts), "renderError"),
      logRequest: /* @__PURE__ */ __name((payload) => this.logThisRequest(payload), "logRequest")
    }));
    else {
      setRenderOptions(request, resolvedOptions);
      response = await this.#fetchHandler.fetch(request);
    }
    this.#warnMissingFeatures();
    if (response.headers.get("X-Astro-Error")) {
      response.headers.delete(ASTRO_ERROR_HEADER);
      return this.renderError(request, {
        addCookieHeader,
        clientAddress,
        prerenderedErrorPageFetch,
        locals,
        routeData,
        waitUntil,
        response,
        status: response.status,
        error: response.status === 500 ? null : void 0
      });
    }
    return response;
  }
  setCookieHeaders(response) {
    return getSetCookiesFromResponse(response);
  }
  /**
  * Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
  * For example,
  * ```ts
  * for (const cookie_ of App.getSetCookieFromResponse(response)) {
  *     const cookie: string = cookie_
  * }
  * ```
  * @param response The response to read cookies from.
  * @returns An iterator that yields key-value pairs as equal-sign-separated strings.
  */
  static getSetCookieFromResponse = getSetCookiesFromResponse;
  /**
  * If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
  * This also handles pre-rendered /404 or /500 routes.
  *
  * Delegates to the app's configured `ErrorHandler`. To customize behavior
  * for a specific environment, override `createErrorHandler()` rather than
  * this method.
  */
  async renderError(request, options) {
    return this.#errorHandler.renderError(request, options);
  }
  /**
  * One-shot check: after the first request with a custom `src/fetch.ts`,
  * compare `usedFeatures` against the manifest and warn about any
  * configured features the user's pipeline doesn't call.
  */
  #warnMissingFeatures() {
    if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
    this.#featureCheckDone = true;
    const manifest2 = this.manifest;
    const missing = [];
    const used = getUsedFeatures(this.manifest);
    if (manifest2.routes.some((r2) => r2.routeData.type === "redirect") && !(used & FetchFeatures.redirects)) missing.push("redirects");
    if (manifest2.sessionConfig && !(used & FetchFeatures.sessions)) missing.push("sessions");
    if (manifest2.actions && !(used & FetchFeatures.actions)) missing.push("actions");
    if (manifest2.middleware && !(used & FetchFeatures.middleware)) missing.push("middleware");
    if (manifest2.i18n && manifest2.i18n.strategy !== "manual" && !(used & FetchFeatures.i18n)) missing.push("i18n");
    if (manifest2.cacheConfig && !(used & FetchFeatures.cache)) missing.push("cache");
    for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless your fetch handler calls it.`);
  }
  getDefaultStatusCode(routeData, pathname) {
    return getDefaultStatusCode(this.manifest, routeData, pathname);
  }
  getManifest() {
    return this.manifest;
  }
  logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
    const timeEnd = performance.now();
    this.logRequest({
      pathname,
      method,
      statusCode,
      isRewrite,
      reqTime: timeEnd - timeStart
    });
  }
};
var App = class extends BaseApp {
  static {
    __name(this, "App");
  }
  isDev() {
    return false;
  }
  logRequest(_options) {
  }
};
var createApp$1 = /* @__PURE__ */ __name(({ streaming } = {}) => {
  const app2 = new App(manifest, streaming);
  app2.setFetchHandler(_virtual_astro_fetchable_default);
  return app2;
}, "createApp$1");
var createApp = createApp$1;
function getFirstForwardedValue(multiValueHeader) {
  return multiValueHeader?.toString()?.split(",").map((e2) => e2.trim())?.[0];
}
__name(getFirstForwardedValue, "getFirstForwardedValue");
var IP_RE = /^[0-9a-fA-F.:]{1,45}$/;
function isValidIpAddress(value) {
  return IP_RE.test(value);
}
__name(isValidIpAddress, "isValidIpAddress");
function getValidatedIpFromHeader(headerValue) {
  const raw = getFirstForwardedValue(headerValue);
  if (raw && isValidIpAddress(raw)) return raw;
}
__name(getValidatedIpFromHeader, "getValidatedIpFromHeader");
function matchStaticAsset(manifest2, requestUrl, env2) {
  const { pathname } = new URL(requestUrl);
  if (manifest2.assets.has(pathname)) return env2.ASSETS.fetch(requestUrl.replace(/\.html$/, ""));
}
__name(matchStaticAsset, "matchStaticAsset");
async function fallbackToAssets(requestUrl, env2) {
  const asset = await env2.ASSETS.fetch(requestUrl.replace(/index.html$/, "").replace(/\.html$/, ""));
  if (asset.status !== 404) return asset;
}
__name(fallbackToAssets, "fallbackToAssets");
function createErrorPageFetch(env2) {
  return async (url) => {
    return env2.ASSETS.fetch(url.replace(/\.html$/, ""));
  };
}
__name(createErrorPageFetch, "createErrorPageFetch");
function createLocals(ctx) {
  const locals = { cfContext: ctx };
  Object.defineProperty(locals, "runtime", {
    enumerable: false,
    value: {
      get env() {
        throw new Error(`Astro.locals.runtime.env has been removed in Astro v6. Use 'import { env } from "cloudflare:workers"' instead.`);
      },
      get cf() {
        throw new Error(`Astro.locals.runtime.cf has been removed in Astro v6. Use 'Astro.request.cf' instead.`);
      },
      get caches() {
        throw new Error(`Astro.locals.runtime.caches has been removed in Astro v6. Use the global 'caches' object instead.`);
      },
      get ctx() {
        throw new Error(`Astro.locals.runtime.ctx has been removed in Astro v6. Use 'Astro.locals.cfContext' instead.`);
      }
    }
  });
  return locals;
}
__name(createLocals, "createLocals");
function getClientAddress(request) {
  return getValidatedIpFromHeader(request.headers.get("cf-connecting-ip"));
}
__name(getClientAddress, "getClientAddress");
function injectSessionBinding(manifest2, env2) {
  if (env2["SESSION"]) {
    const sessionConfigOptions = manifest2.sessionConfig?.options ?? {};
    Object.assign(sessionConfigOptions, { binding: env2[sessionKVBindingName] });
  }
}
__name(injectSessionBinding, "injectSessionBinding");
function applyCloudflareResponseHeaders(response, setCookieHeaders, cacheProviderEnabled) {
  const cookies = [...setCookieHeaders];
  const needsNoStoreDefault = cacheProviderEnabled && !response.headers.has("Cloudflare-CDN-Cache-Control");
  if (cookies.length > 0 || needsNoStoreDefault) {
    const applyHeaders = /* @__PURE__ */ __name((target) => {
      for (const cookie of cookies) target.headers.append("Set-Cookie", cookie);
      if (needsNoStoreDefault) target.headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    }, "applyHeaders");
    try {
      applyHeaders(response);
    } catch {
      response = new Response(response.body, response);
      applyHeaders(response);
    }
  }
  return response;
}
__name(applyCloudflareResponseHeaders, "applyCloudflareResponseHeaders");
var app = createApp();
async function handle(request, env2, context) {
  injectSessionBinding(app.manifest, env2);
  const staticAsset = matchStaticAsset(app.manifest, request.url, env2);
  if (staticAsset) return staticAsset;
  let routeData = void 0;
  if (app.isDev()) {
    const result = await app.devMatch(app.getPathnameFromRequest(request));
    if (result) routeData = result.routeData;
  } else routeData = app.match(request);
  if (!routeData) {
    const asset = await fallbackToAssets(request.url, env2);
    if (asset) return asset;
  }
  const locals = createLocals(context);
  const waitUntil = context.waitUntil.bind(context);
  const response = await app.render(request, {
    routeData,
    locals,
    waitUntil,
    prerenderedErrorPageFetch: createErrorPageFetch(env2),
    clientAddress: getClientAddress(request)
  });
  return applyCloudflareResponseHeaders(response, app.setCookieHeaders ? [...app.setCookieHeaders(response)] : [], false);
}
__name(handle, "handle");
var worker_entry_default = { fetch: handle };

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e2) {
    const error3 = reduceError(e2);
    const body = JSON.stringify(error3);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-6ZaCca/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_entry_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-6ZaCca/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/**
* shortdash - https://github.com/bibig/node-shorthash
*
* @license
*
* (The MIT License)
*
* Copyright (c) 2013 Bibig <bibig@me.com>
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
//# sourceMappingURL=bundledWorker-0.6327122376197719.mjs.map

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var mix = __toESM(require("laravel-mix"));
var eta = __toESM(require("eta"));
var import_globby = __toESM(require("globby"));
var import_glob_parent = __toESM(require("glob-parent"));
var upath = __toESM(require("upath"));
var import_html_webpack_plugin = __toESM(require("html-webpack-plugin"));
class mixEtaPlugin {
  dependencies() {
    return [
      "eta",
      "globby",
      "glob-parent",
      "upath"
    ];
  }
  register(from, to, data) {
    this.from = from;
    this.to = to;
    this.data = data;
  }
  webpackRules() {
    const data = this.data ?? {};
    return {
      test: /\.eta$/,
      loader: "html-loader",
      options: {
        preprocessor(content, loaderContext) {
          return eta.render(content, data, { filename: loaderContext.resourcePath });
        },
        attributes: false
      }
    };
  }
  webpackPlugins() {
    let plugins = [];
    const srcRoot = (0, import_glob_parent.default)(this.from);
    for (const srcFile of import_globby.default.sync(this.from)) {
      const srcFileRelative = upath.relative(srcRoot, srcFile);
      const outputFile = upath.resolve(this.to, upath.changeExt(srcFileRelative, ".html"));
      plugins = [...plugins, new import_html_webpack_plugin.default({
        filename: outputFile,
        template: srcFile,
        inject: false
      })];
    }
    return plugins;
  }
}
mix.extend("eta", new mixEtaPlugin());

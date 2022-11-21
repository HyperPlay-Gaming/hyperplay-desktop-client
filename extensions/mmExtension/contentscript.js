
(function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
  1: [function (require, module, exports) {
    "use strict";

    var _pump = _interopRequireDefault(require("pump"));

    var _postMessageStream = require("@metamask/post-message-stream");

    var _objMultiplex = _interopRequireDefault(require("obj-multiplex"));

    var _webextensionPolyfill = _interopRequireDefault(require("webextension-polyfill"));

    var _extensionPortStream = _interopRequireDefault(require("extension-port-stream"));

    var _through = require("through2");

    var _mv = require("../../shared/modules/mv3.utils");

    var _providerInjection = _interopRequireDefault(require("../../shared/modules/provider-injection"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    // These require calls need to use require to be statically recognized by browserify


    const path = require('path');
    _webextensionPolyfill.default.runtime.onMessage.addListener(function (req, sender, sendResponse) {
      // console.log(JSON.stringify(req, null, 4))
      console.error('received msg in content script ')
    })

    const inpageContent = "(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c=\"function\"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error(\"Cannot find module '\"+i+\"'\");throw a.code=\"MODULE_NOT_FOUND\",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u=\"function\"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){\n(function (global){(function (){\n\"use strict\";\n\nvar _loglevel = _interopRequireDefault(require(\"loglevel\"));\n\nvar _postMessageStream = require(\"@metamask/post-message-stream\");\n\nvar _initializeInpageProvider = require(\"@metamask/providers/dist/initializeInpageProvider\");\n\nvar _providerInjection = _interopRequireDefault(require(\"../../shared/modules/provider-injection\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// need to make sure we aren't affected by overlapping namespaces\n// and that we dont affect the app with our namespace\n// mostly a fix for web3's BigNumber if AMD's \"define\" is defined...\nlet __define;\n/**\r\n * Caches reference to global define object and deletes it to\r\n * avoid conflicts with other global define objects, such as\r\n * AMD's define function\r\n */\n\n\nconst cleanContextForImports = () => {\n  __define = global.define;\n\n  try {\n    global.define = undefined;\n  } catch (_) {\n    console.warn('MetaMask - global.define could not be deleted.');\n  }\n};\n/**\r\n * Restores global define object from cached reference\r\n */\n\n\nconst restoreContextAfterImports = () => {\n  try {\n    global.define = __define;\n  } catch (_) {\n    console.warn('MetaMask - global.define could not be overwritten.');\n  }\n};\n\ncleanContextForImports();\n/* eslint-disable import/first */\n\n// contexts\nconst CONTENT_SCRIPT = 'metamask-contentscript';\nconst INPAGE = 'metamask-inpage';\nrestoreContextAfterImports();\n\n_loglevel.default.setDefaultLevel(true ? 'debug' : 'warn'); //\n// setup plugin communication\n//\n\n\nif ((0, _providerInjection.default)()) {\n  // setup background connection\n  const metamaskStream = new _postMessageStream.WindowPostMessageStream({\n    name: INPAGE,\n    target: CONTENT_SCRIPT\n  });\n  (0, _initializeInpageProvider.initializeProvider)({\n    connectionStream: metamaskStream,\n    logger: _loglevel.default,\n    shouldShimWeb3: true\n  });\n}\n\n}).call(this)}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n\n},{\"../../shared/modules/provider-injection\":80,\"@metamask/post-message-stream\":10,\"@metamask/providers/dist/initializeInpageProvider\":25,\"loglevel\":60}],2:[function(require,module,exports){\n\"use strict\";\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ObjectMultiplex = void 0;\nconst readable_stream_1 = require(\"readable-stream\");\nconst end_of_stream_1 = __importDefault(require(\"end-of-stream\"));\nconst once_1 = __importDefault(require(\"once\"));\nconst Substream_1 = require(\"./Substream\");\nconst IGNORE_SUBSTREAM = Symbol('IGNORE_SUBSTREAM');\nclass ObjectMultiplex extends readable_stream_1.Duplex {\n    constructor(opts = {}) {\n        super(Object.assign(Object.assign({}, opts), { objectMode: true }));\n        this._substreams = {};\n    }\n    createStream(name) {\n        // guard stream against destroyed already\n        if (this.destroyed) {\n            throw new Error(`ObjectMultiplex - parent stream for name \"${name}\" already destroyed`);\n        }\n        // guard stream against ended already\n        if (this._readableState.ended || this._writableState.ended) {\n            throw new Error(`ObjectMultiplex - parent stream for name \"${name}\" already ended`);\n        }\n        // validate name\n        if (!name) {\n            throw new Error('ObjectMultiplex - name must not be empty');\n        }\n        if (this._substreams[name]) {\n            throw new Error(`ObjectMultiplex - Substream for name \"${name}\" already exists`);\n        }\n        // create substream\n        const substream = new Substream_1.Substream({ parent: this, name });\n        this._substreams[name] = substream;\n        // listen for parent stream to end\n        anyStreamEnd(this, (_error) => {\n            return substream.destroy(_error || undefined);\n        });\n        return substream;\n    }\n    // ignore streams (dont display orphaned data warning)\n    ignoreStream(name) {\n        // validate name\n        if (!name) {\n            throw new Error('ObjectMultiplex - name must not be empty');\n        }\n        if (this._substreams[name]) {\n            throw new Error(`ObjectMultiplex - Substream for name \"${name}\" already exists`);\n        }\n        // set\n        this._substreams[name] = IGNORE_SUBSTREAM;\n    }\n    _read() {\n        return undefined;\n    }\n    _write(chunk, _encoding, callback) {\n        const { name, data } = chunk;\n        if (!name) {\n            console.warn(`ObjectMultiplex - malformed chunk without name \"${chunk}\"`);\n            return callback();\n        }\n        // get corresponding substream\n        const substream = this._substreams[name];\n        if (!substream) {\n            console.warn(`ObjectMultiplex - orphaned data for stream \"${name}\"`);\n            return callback();\n        }\n        // push data into substream\n        if (substream !== IGNORE_SUBSTREAM) {\n            substream.push(data);\n        }\n        return callback();\n    }\n}\nexports.ObjectMultiplex = ObjectMultiplex;\n// util\nfunction anyStreamEnd(stream, _cb) {\n    const cb = once_1.default(_cb);\n    end_of_stream_1.default(stream, { readable: false }, cb);\n    end_of_stream_1.default(stream, { writable: false }, cb);\n}\n\n},{\"./Substream\":3,\"end-of-stream\":41,\"once\":61,\"readable-stream\":76}],3:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Substream = void 0;\nconst readable_stream_1 = require(\"readable-stream\");\nclass Substream extends readable_stream_1.Duplex {\n    constructor({ parent, name }) {\n        super({ objectMode: true });\n        this._parent = parent;\n        this._name = name;\n    }\n    /**\n     * Explicitly sets read operations to a no-op.\n     */\n    _read() {\n        return undefined;\n    }\n    /**\n     * Called when data should be written to this writable stream.\n     *\n     * @param chunk - Arbitrary object to write\n     * @param encoding - Encoding to use when writing payload\n     * @param callback - Called when writing is complete or an error occurs\n     */\n    _write(chunk, _encoding, callback) {\n        this._parent.push({\n            name: this._name,\n            data: chunk,\n        });\n        callback();\n    }\n}\nexports.Substream = Substream;\n\n},{\"readable-stream\":76}],4:[function(require,module,exports){\n\"use strict\";\nconst ObjectMultiplex_1 = require(\"./ObjectMultiplex\");\nmodule.exports = ObjectMultiplex_1.ObjectMultiplex;\n\n},{\"./ObjectMultiplex\":2}],5:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.BasePostMessageStream = void 0;\nconst readable_stream_1 = require(\"readable-stream\");\nfunction noop() {\n    return undefined;\n}\nconst SYN = 'SYN';\nconst ACK = 'ACK';\n/**\n * Abstract base class for postMessage streams.\n */\nclass BasePostMessageStream extends readable_stream_1.Duplex {\n    constructor() {\n        super({\n            objectMode: true,\n        });\n        // Initialization flags\n        this._init = false;\n        this._haveSyn = false;\n    }\n    /**\n     * Must be called at end of child constructor to initiate\n     * communication with other end.\n     */\n    _handshake() {\n        // Send synchronization message\n        this._write(SYN, null, noop);\n        this.cork();\n    }\n    _onData(data) {\n        if (this._init) {\n            // Forward message\n            try {\n                this.push(data);\n            }\n            catch (err) {\n                this.emit('error', err);\n            }\n        }\n        else if (data === SYN) {\n            // Listen for handshake\n            this._haveSyn = true;\n            this._write(ACK, null, noop);\n        }\n        else if (data === ACK) {\n            this._init = true;\n            if (!this._haveSyn) {\n                this._write(ACK, null, noop);\n            }\n            this.uncork();\n        }\n    }\n    _read() {\n        return undefined;\n    }\n    _write(data, _encoding, cb) {\n        this._postMessage(data);\n        cb();\n    }\n}\nexports.BasePostMessageStream = BasePostMessageStream;\n\n},{\"readable-stream\":19}],6:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.WindowPostMessageStream = void 0;\nconst BasePostMessageStream_1 = require(\"./BasePostMessageStream\");\n/**\n * Window.postMessage stream.\n */\nclass WindowPostMessageStream extends BasePostMessageStream_1.BasePostMessageStream {\n    /**\n     * Creates a stream for communicating with other streams across the same or\n     * different window objects.\n     *\n     * @param args.name - The name of the stream. Used to differentiate between\n     * multiple streams sharing the same window object.\n     * @param args.target - The name of the stream to exchange messages with.\n     * @param args.targetWindow - The window object of the target stream. Defaults\n     * to `window`.\n     */\n    constructor({ name, target, targetWindow }) {\n        if (!name || !target) {\n            throw new Error('Invalid input.');\n        }\n        super();\n        this._name = name;\n        this._target = target;\n        this._targetOrigin = targetWindow ? '*' : location.origin;\n        this._targetWindow = targetWindow || window;\n        this._onMessage = this._onMessage.bind(this);\n        window.addEventListener('message', this._onMessage, false);\n        this._handshake();\n    }\n    _postMessage(data) {\n        this._targetWindow.postMessage({\n            target: this._target,\n            data,\n        }, this._targetOrigin);\n    }\n    _onMessage(event) {\n        const message = event.data;\n        // validate message\n        if ((this._targetOrigin !== '*' && event.origin !== this._targetOrigin) ||\n            event.source !== this._targetWindow ||\n            typeof message !== 'object' ||\n            message.target !== this._name ||\n            !message.data) {\n            return;\n        }\n        this._onData(message.data);\n    }\n    _destroy() {\n        window.removeEventListener('message', this._onMessage, false);\n    }\n}\nexports.WindowPostMessageStream = WindowPostMessageStream;\n\n},{\"./BasePostMessageStream\":5}],7:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.WorkerParentPostMessageStream = void 0;\nconst BasePostMessageStream_1 = require(\"./BasePostMessageStream\");\nconst enums_1 = require(\"./enums\");\n/**\n * Parent-side dedicated web worker `postMessage` stream.\n */\nclass WorkerParentPostMessageStream extends BasePostMessageStream_1.BasePostMessageStream {\n    /**\n     * Creates a stream for communicating with a dedicated web worker.\n     *\n     * @param args.worker - The Web Worker to exchange messages with. The worker\n     * must instantiate a WorkerPostMessageStream.\n     */\n    constructor({ worker }) {\n        if (!worker) {\n            throw new Error('Invalid input.');\n        }\n        super();\n        this._target = enums_1.DEDICATED_WORKER_NAME;\n        this._worker = worker;\n        this._worker.onmessage = this._onMessage.bind(this);\n        this._handshake();\n    }\n    _postMessage(data) {\n        this._worker.postMessage({\n            target: this._target,\n            data,\n        });\n    }\n    _onMessage(event) {\n        const message = event.data;\n        // validate message\n        if (typeof message !== 'object' || !message.data) {\n            return;\n        }\n        this._onData(message.data);\n    }\n    _destroy() {\n        this._worker.onmessage = null;\n        this._worker = null;\n    }\n}\nexports.WorkerParentPostMessageStream = WorkerParentPostMessageStream;\n\n},{\"./BasePostMessageStream\":5,\"./enums\":9}],8:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.WorkerPostMessageStream = void 0;\n/* istanbul ignore file */\n// We ignore coverage for the entire file due to limits on our instrumentation,\n// but it is in fact covered by our tests.\nconst BasePostMessageStream_1 = require(\"./BasePostMessageStream\");\nconst enums_1 = require(\"./enums\");\n/**\n * Worker-side dedicated web worker `postMessage` stream.\n */\nclass WorkerPostMessageStream extends BasePostMessageStream_1.BasePostMessageStream {\n    /**\n     * Note: Designed for use in web workers only.\n     *\n     * Creates a stream for communicating with the window that created this web\n     * worker.\n     */\n    constructor() {\n        super();\n        this._name = enums_1.DEDICATED_WORKER_NAME;\n        self.onmessage = this._onMessage.bind(this);\n        this._handshake();\n    }\n    _postMessage(data) {\n        // Cast of self.postMessage due to usage of DOM lib\n        self.postMessage({ data });\n    }\n    _onMessage(event) {\n        const message = event.data;\n        // validate message\n        if (typeof message !== 'object' ||\n            message.target !== this._name ||\n            !message.data) {\n            return;\n        }\n        this._onData(message.data);\n    }\n    // worker stream lifecycle assumed to be coterminous with global scope\n    _destroy() {\n        return undefined;\n    }\n}\nexports.WorkerPostMessageStream = WorkerPostMessageStream;\n\n},{\"./BasePostMessageStream\":5,\"./enums\":9}],9:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.DEDICATED_WORKER_NAME = void 0;\nexports.DEDICATED_WORKER_NAME = 'dedicatedWorker';\n\n},{}],10:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.WorkerParentPostMessageStream = exports.WorkerPostMessageStream = exports.WindowPostMessageStream = void 0;\nvar WindowPostMessageStream_1 = require(\"./WindowPostMessageStream\");\nObject.defineProperty(exports, \"WindowPostMessageStream\", { enumerable: true, get: function () { return WindowPostMessageStream_1.WindowPostMessageStream; } });\nvar WorkerPostMessageStream_1 = require(\"./WorkerPostMessageStream\");\nObject.defineProperty(exports, \"WorkerPostMessageStream\", { enumerable: true, get: function () { return WorkerPostMessageStream_1.WorkerPostMessageStream; } });\nvar WorkerParentPostMessageStream_1 = require(\"./WorkerParentPostMessageStream\");\nObject.defineProperty(exports, \"WorkerParentPostMessageStream\", { enumerable: true, get: function () { return WorkerParentPostMessageStream_1.WorkerParentPostMessageStream; } });\n\n},{\"./WindowPostMessageStream\":6,\"./WorkerParentPostMessageStream\":7,\"./WorkerPostMessageStream\":8}],11:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a duplex stream is just a stream that is both readable and writable.\n// Since JS doesn't have multiple prototypal inheritance, this class\n// prototypally inherits from Readable, and then parasitically from\n// Writable.\n\n'use strict';\n\n/*<replacement>*/\n\nvar processNextTick = require('process-nextick-args');\n/*</replacement>*/\n\n/*<replacement>*/\nvar objectKeys = Object.keys || function (obj) {\n  var keys = [];\n  for (var key in obj) {\n    keys.push(key);\n  }return keys;\n};\n/*</replacement>*/\n\nmodule.exports = Duplex;\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nvar Readable = require('./_stream_readable');\nvar Writable = require('./_stream_writable');\n\nutil.inherits(Duplex, Readable);\n\nvar keys = objectKeys(Writable.prototype);\nfor (var v = 0; v < keys.length; v++) {\n  var method = keys[v];\n  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];\n}\n\nfunction Duplex(options) {\n  if (!(this instanceof Duplex)) return new Duplex(options);\n\n  Readable.call(this, options);\n  Writable.call(this, options);\n\n  if (options && options.readable === false) this.readable = false;\n\n  if (options && options.writable === false) this.writable = false;\n\n  this.allowHalfOpen = true;\n  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;\n\n  this.once('end', onend);\n}\n\n// the no-half-open enforcer\nfunction onend() {\n  // if we allow half-open state, or if the writable side ended,\n  // then we're ok.\n  if (this.allowHalfOpen || this._writableState.ended) return;\n\n  // no more data can be written.\n  // But allow more writes to happen in this tick.\n  processNextTick(onEndNT, this);\n}\n\nfunction onEndNT(self) {\n  self.end();\n}\n\nObject.defineProperty(Duplex.prototype, 'destroyed', {\n  get: function () {\n    if (this._readableState === undefined || this._writableState === undefined) {\n      return false;\n    }\n    return this._readableState.destroyed && this._writableState.destroyed;\n  },\n  set: function (value) {\n    // we ignore the value if the stream\n    // has not been initialized yet\n    if (this._readableState === undefined || this._writableState === undefined) {\n      return;\n    }\n\n    // backward compatibility, the user is explicitly\n    // managing destroyed\n    this._readableState.destroyed = value;\n    this._writableState.destroyed = value;\n  }\n});\n\nDuplex.prototype._destroy = function (err, cb) {\n  this.push(null);\n  this.end();\n\n  processNextTick(cb, err);\n};\n\nfunction forEach(xs, f) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    f(xs[i], i);\n  }\n}\n},{\"./_stream_readable\":13,\"./_stream_writable\":15,\"core-util-is\":40,\"inherits\":49,\"process-nextick-args\":62}],12:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a passthrough stream.\n// basically just the most minimal sort of Transform stream.\n// Every written chunk gets output as-is.\n\n'use strict';\n\nmodule.exports = PassThrough;\n\nvar Transform = require('./_stream_transform');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(PassThrough, Transform);\n\nfunction PassThrough(options) {\n  if (!(this instanceof PassThrough)) return new PassThrough(options);\n\n  Transform.call(this, options);\n}\n\nPassThrough.prototype._transform = function (chunk, encoding, cb) {\n  cb(null, chunk);\n};\n},{\"./_stream_transform\":14,\"core-util-is\":40,\"inherits\":49}],13:[function(require,module,exports){\n(function (process,global){(function (){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n'use strict';\n\n/*<replacement>*/\n\nvar processNextTick = require('process-nextick-args');\n/*</replacement>*/\n\nmodule.exports = Readable;\n\n/*<replacement>*/\nvar isArray = require('isarray');\n/*</replacement>*/\n\n/*<replacement>*/\nvar Duplex;\n/*</replacement>*/\n\nReadable.ReadableState = ReadableState;\n\n/*<replacement>*/\nvar EE = require('events').EventEmitter;\n\nvar EElistenerCount = function (emitter, type) {\n  return emitter.listeners(type).length;\n};\n/*</replacement>*/\n\n/*<replacement>*/\nvar Stream = require('./internal/streams/stream');\n/*</replacement>*/\n\n// TODO(bmeurer): Change this back to const once hole checks are\n// properly optimized away early in Ignition+TurboFan.\n/*<replacement>*/\nvar Buffer = require('safe-buffer').Buffer;\nvar OurUint8Array = global.Uint8Array || function () {};\nfunction _uint8ArrayToBuffer(chunk) {\n  return Buffer.from(chunk);\n}\nfunction _isUint8Array(obj) {\n  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;\n}\n/*</replacement>*/\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\n/*<replacement>*/\nvar debugUtil = require('util');\nvar debug = void 0;\nif (debugUtil && debugUtil.debuglog) {\n  debug = debugUtil.debuglog('stream');\n} else {\n  debug = function () {};\n}\n/*</replacement>*/\n\nvar BufferList = require('./internal/streams/BufferList');\nvar destroyImpl = require('./internal/streams/destroy');\nvar StringDecoder;\n\nutil.inherits(Readable, Stream);\n\nvar kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];\n\nfunction prependListener(emitter, event, fn) {\n  // Sadly this is not cacheable as some libraries bundle their own\n  // event emitter implementation with them.\n  if (typeof emitter.prependListener === 'function') {\n    return emitter.prependListener(event, fn);\n  } else {\n    // This is a hack to make sure that our error handler is attached before any\n    // userland ones.  NEVER DO THIS. This is here only because this code needs\n    // to continue to work with older versions of Node.js that do not include\n    // the prependListener() method. The goal is to eventually remove this hack.\n    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];\n  }\n}\n\nfunction ReadableState(options, stream) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  options = options || {};\n\n  // object stream flag. Used to make read(n) ignore n and to\n  // make all the buffer merging and length checks go away\n  this.objectMode = !!options.objectMode;\n\n  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;\n\n  // the point at which it stops calling _read() to fill the buffer\n  // Note: 0 is a valid value, means \"don't call _read preemptively ever\"\n  var hwm = options.highWaterMark;\n  var defaultHwm = this.objectMode ? 16 : 16 * 1024;\n  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;\n\n  // cast to ints.\n  this.highWaterMark = Math.floor(this.highWaterMark);\n\n  // A linked list is used to store data chunks instead of an array because the\n  // linked list can remove elements from the beginning faster than\n  // array.shift()\n  this.buffer = new BufferList();\n  this.length = 0;\n  this.pipes = null;\n  this.pipesCount = 0;\n  this.flowing = null;\n  this.ended = false;\n  this.endEmitted = false;\n  this.reading = false;\n\n  // a flag to be able to tell if the event 'readable'/'data' is emitted\n  // immediately, or on a later tick.  We set this to true at first, because\n  // any actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first read call.\n  this.sync = true;\n\n  // whenever we return null, then we set a flag to say\n  // that we're awaiting a 'readable' event emission.\n  this.needReadable = false;\n  this.emittedReadable = false;\n  this.readableListening = false;\n  this.resumeScheduled = false;\n\n  // has it been destroyed\n  this.destroyed = false;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // the number of writers that are awaiting a drain event in .pipe()s\n  this.awaitDrain = 0;\n\n  // if true, a maybeReadMore has been scheduled\n  this.readingMore = false;\n\n  this.decoder = null;\n  this.encoding = null;\n  if (options.encoding) {\n    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;\n    this.decoder = new StringDecoder(options.encoding);\n    this.encoding = options.encoding;\n  }\n}\n\nfunction Readable(options) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  if (!(this instanceof Readable)) return new Readable(options);\n\n  this._readableState = new ReadableState(options, this);\n\n  // legacy\n  this.readable = true;\n\n  if (options) {\n    if (typeof options.read === 'function') this._read = options.read;\n\n    if (typeof options.destroy === 'function') this._destroy = options.destroy;\n  }\n\n  Stream.call(this);\n}\n\nObject.defineProperty(Readable.prototype, 'destroyed', {\n  get: function () {\n    if (this._readableState === undefined) {\n      return false;\n    }\n    return this._readableState.destroyed;\n  },\n  set: function (value) {\n    // we ignore the value if the stream\n    // has not been initialized yet\n    if (!this._readableState) {\n      return;\n    }\n\n    // backward compatibility, the user is explicitly\n    // managing destroyed\n    this._readableState.destroyed = value;\n  }\n});\n\nReadable.prototype.destroy = destroyImpl.destroy;\nReadable.prototype._undestroy = destroyImpl.undestroy;\nReadable.prototype._destroy = function (err, cb) {\n  this.push(null);\n  cb(err);\n};\n\n// Manually shove something into the read() buffer.\n// This returns true if the highWaterMark has not been hit yet,\n// similar to how Writable.write() returns true if you should\n// write() some more.\nReadable.prototype.push = function (chunk, encoding) {\n  var state = this._readableState;\n  var skipChunkCheck;\n\n  if (!state.objectMode) {\n    if (typeof chunk === 'string') {\n      encoding = encoding || state.defaultEncoding;\n      if (encoding !== state.encoding) {\n        chunk = Buffer.from(chunk, encoding);\n        encoding = '';\n      }\n      skipChunkCheck = true;\n    }\n  } else {\n    skipChunkCheck = true;\n  }\n\n  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);\n};\n\n// Unshift should *always* be something directly out of read()\nReadable.prototype.unshift = function (chunk) {\n  return readableAddChunk(this, chunk, null, true, false);\n};\n\nfunction readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {\n  var state = stream._readableState;\n  if (chunk === null) {\n    state.reading = false;\n    onEofChunk(stream, state);\n  } else {\n    var er;\n    if (!skipChunkCheck) er = chunkInvalid(state, chunk);\n    if (er) {\n      stream.emit('error', er);\n    } else if (state.objectMode || chunk && chunk.length > 0) {\n      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {\n        chunk = _uint8ArrayToBuffer(chunk);\n      }\n\n      if (addToFront) {\n        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);\n      } else if (state.ended) {\n        stream.emit('error', new Error('stream.push() after EOF'));\n      } else {\n        state.reading = false;\n        if (state.decoder && !encoding) {\n          chunk = state.decoder.write(chunk);\n          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);\n        } else {\n          addChunk(stream, state, chunk, false);\n        }\n      }\n    } else if (!addToFront) {\n      state.reading = false;\n    }\n  }\n\n  return needMoreData(state);\n}\n\nfunction addChunk(stream, state, chunk, addToFront) {\n  if (state.flowing && state.length === 0 && !state.sync) {\n    stream.emit('data', chunk);\n    stream.read(0);\n  } else {\n    // update the buffer info.\n    state.length += state.objectMode ? 1 : chunk.length;\n    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);\n\n    if (state.needReadable) emitReadable(stream);\n  }\n  maybeReadMore(stream, state);\n}\n\nfunction chunkInvalid(state, chunk) {\n  var er;\n  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {\n    er = new TypeError('Invalid non-string/buffer chunk');\n  }\n  return er;\n}\n\n// if it's past the high water mark, we can push in some more.\n// Also, if we have no data yet, we can stand some\n// more bytes.  This is to work around cases where hwm=0,\n// such as the repl.  Also, if the push() triggered a\n// readable event, and the user called read(largeNumber) such that\n// needReadable was set, then we ought to push more, so that another\n// 'readable' event will be triggered.\nfunction needMoreData(state) {\n  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);\n}\n\nReadable.prototype.isPaused = function () {\n  return this._readableState.flowing === false;\n};\n\n// backwards compatibility.\nReadable.prototype.setEncoding = function (enc) {\n  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;\n  this._readableState.decoder = new StringDecoder(enc);\n  this._readableState.encoding = enc;\n  return this;\n};\n\n// Don't raise the hwm > 8MB\nvar MAX_HWM = 0x800000;\nfunction computeNewHighWaterMark(n) {\n  if (n >= MAX_HWM) {\n    n = MAX_HWM;\n  } else {\n    // Get the next highest power of 2 to prevent increasing hwm excessively in\n    // tiny amounts\n    n--;\n    n |= n >>> 1;\n    n |= n >>> 2;\n    n |= n >>> 4;\n    n |= n >>> 8;\n    n |= n >>> 16;\n    n++;\n  }\n  return n;\n}\n\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction howMuchToRead(n, state) {\n  if (n <= 0 || state.length === 0 && state.ended) return 0;\n  if (state.objectMode) return 1;\n  if (n !== n) {\n    // Only flow one buffer at a time\n    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;\n  }\n  // If we're asking for more than the current hwm, then raise the hwm.\n  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);\n  if (n <= state.length) return n;\n  // Don't have enough\n  if (!state.ended) {\n    state.needReadable = true;\n    return 0;\n  }\n  return state.length;\n}\n\n// you can override either this method, or the async _read(n) below.\nReadable.prototype.read = function (n) {\n  debug('read', n);\n  n = parseInt(n, 10);\n  var state = this._readableState;\n  var nOrig = n;\n\n  if (n !== 0) state.emittedReadable = false;\n\n  // if we're doing read(0) to trigger a readable event, but we\n  // already have a bunch of data in the buffer, then just trigger\n  // the 'readable' event and move on.\n  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {\n    debug('read: emitReadable', state.length, state.ended);\n    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);\n    return null;\n  }\n\n  n = howMuchToRead(n, state);\n\n  // if we've ended, and we're now clear, then finish it up.\n  if (n === 0 && state.ended) {\n    if (state.length === 0) endReadable(this);\n    return null;\n  }\n\n  // All the actual chunk generation logic needs to be\n  // *below* the call to _read.  The reason is that in certain\n  // synthetic stream cases, such as passthrough streams, _read\n  // may be a completely synchronous operation which may change\n  // the state of the read buffer, providing enough data when\n  // before there was *not* enough.\n  //\n  // So, the steps are:\n  // 1. Figure out what the state of things will be after we do\n  // a read from the buffer.\n  //\n  // 2. If that resulting state will trigger a _read, then call _read.\n  // Note that this may be asynchronous, or synchronous.  Yes, it is\n  // deeply ugly to write APIs this way, but that still doesn't mean\n  // that the Readable class should behave improperly, as streams are\n  // designed to be sync/async agnostic.\n  // Take note if the _read call is sync or async (ie, if the read call\n  // has returned yet), so that we know whether or not it's safe to emit\n  // 'readable' etc.\n  //\n  // 3. Actually pull the requested chunks out of the buffer and return.\n\n  // if we need a readable event, then we need to do some reading.\n  var doRead = state.needReadable;\n  debug('need readable', doRead);\n\n  // if we currently have less than the highWaterMark, then also read some\n  if (state.length === 0 || state.length - n < state.highWaterMark) {\n    doRead = true;\n    debug('length less than watermark', doRead);\n  }\n\n  // however, if we've ended, then there's no point, and if we're already\n  // reading, then it's unnecessary.\n  if (state.ended || state.reading) {\n    doRead = false;\n    debug('reading or ended', doRead);\n  } else if (doRead) {\n    debug('do read');\n    state.reading = true;\n    state.sync = true;\n    // if the length is currently zero, then we *need* a readable event.\n    if (state.length === 0) state.needReadable = true;\n    // call internal read method\n    this._read(state.highWaterMark);\n    state.sync = false;\n    // If _read pushed data synchronously, then `reading` will be false,\n    // and we need to re-evaluate how much data we can return to the user.\n    if (!state.reading) n = howMuchToRead(nOrig, state);\n  }\n\n  var ret;\n  if (n > 0) ret = fromList(n, state);else ret = null;\n\n  if (ret === null) {\n    state.needReadable = true;\n    n = 0;\n  } else {\n    state.length -= n;\n  }\n\n  if (state.length === 0) {\n    // If we have nothing in the buffer, then we want to know\n    // as soon as we *do* get something into the buffer.\n    if (!state.ended) state.needReadable = true;\n\n    // If we tried to read() past the EOF, then emit end on the next tick.\n    if (nOrig !== n && state.ended) endReadable(this);\n  }\n\n  if (ret !== null) this.emit('data', ret);\n\n  return ret;\n};\n\nfunction onEofChunk(stream, state) {\n  if (state.ended) return;\n  if (state.decoder) {\n    var chunk = state.decoder.end();\n    if (chunk && chunk.length) {\n      state.buffer.push(chunk);\n      state.length += state.objectMode ? 1 : chunk.length;\n    }\n  }\n  state.ended = true;\n\n  // emit 'readable' now to make sure it gets picked up.\n  emitReadable(stream);\n}\n\n// Don't emit readable right away in sync mode, because this can trigger\n// another read() call => stack overflow.  This way, it might trigger\n// a nextTick recursion warning, but that's not so bad.\nfunction emitReadable(stream) {\n  var state = stream._readableState;\n  state.needReadable = false;\n  if (!state.emittedReadable) {\n    debug('emitReadable', state.flowing);\n    state.emittedReadable = true;\n    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);\n  }\n}\n\nfunction emitReadable_(stream) {\n  debug('emit readable');\n  stream.emit('readable');\n  flow(stream);\n}\n\n// at this point, the user has presumably seen the 'readable' event,\n// and called read() to consume some data.  that may have triggered\n// in turn another _read(n) call, in which case reading = true if\n// it's in progress.\n// However, if we're not ended, or reading, and the length < hwm,\n// then go ahead and try to read some more preemptively.\nfunction maybeReadMore(stream, state) {\n  if (!state.readingMore) {\n    state.readingMore = true;\n    processNextTick(maybeReadMore_, stream, state);\n  }\n}\n\nfunction maybeReadMore_(stream, state) {\n  var len = state.length;\n  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {\n    debug('maybeReadMore read 0');\n    stream.read(0);\n    if (len === state.length)\n      // didn't get any data, stop spinning.\n      break;else len = state.length;\n  }\n  state.readingMore = false;\n}\n\n// abstract method.  to be overridden in specific implementation classes.\n// call cb(er, data) where data is <= n in length.\n// for virtual (non-string, non-buffer) streams, \"length\" is somewhat\n// arbitrary, and perhaps not very meaningful.\nReadable.prototype._read = function (n) {\n  this.emit('error', new Error('_read() is not implemented'));\n};\n\nReadable.prototype.pipe = function (dest, pipeOpts) {\n  var src = this;\n  var state = this._readableState;\n\n  switch (state.pipesCount) {\n    case 0:\n      state.pipes = dest;\n      break;\n    case 1:\n      state.pipes = [state.pipes, dest];\n      break;\n    default:\n      state.pipes.push(dest);\n      break;\n  }\n  state.pipesCount += 1;\n  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);\n\n  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;\n\n  var endFn = doEnd ? onend : unpipe;\n  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);\n\n  dest.on('unpipe', onunpipe);\n  function onunpipe(readable, unpipeInfo) {\n    debug('onunpipe');\n    if (readable === src) {\n      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {\n        unpipeInfo.hasUnpiped = true;\n        cleanup();\n      }\n    }\n  }\n\n  function onend() {\n    debug('onend');\n    dest.end();\n  }\n\n  // when the dest drains, it reduces the awaitDrain counter\n  // on the source.  This would be more elegant with a .once()\n  // handler in flow(), but adding and removing repeatedly is\n  // too slow.\n  var ondrain = pipeOnDrain(src);\n  dest.on('drain', ondrain);\n\n  var cleanedUp = false;\n  function cleanup() {\n    debug('cleanup');\n    // cleanup event handlers once the pipe is broken\n    dest.removeListener('close', onclose);\n    dest.removeListener('finish', onfinish);\n    dest.removeListener('drain', ondrain);\n    dest.removeListener('error', onerror);\n    dest.removeListener('unpipe', onunpipe);\n    src.removeListener('end', onend);\n    src.removeListener('end', unpipe);\n    src.removeListener('data', ondata);\n\n    cleanedUp = true;\n\n    // if the reader is waiting for a drain event from this\n    // specific writer, then it would cause it to never start\n    // flowing again.\n    // So, if this is awaiting a drain, then we just call it now.\n    // If we don't know, then assume that we are waiting for one.\n    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();\n  }\n\n  // If the user pushes more data while we're writing to dest then we'll end up\n  // in ondata again. However, we only want to increase awaitDrain once because\n  // dest will only emit one 'drain' event for the multiple writes.\n  // => Introduce a guard on increasing awaitDrain.\n  var increasedAwaitDrain = false;\n  src.on('data', ondata);\n  function ondata(chunk) {\n    debug('ondata');\n    increasedAwaitDrain = false;\n    var ret = dest.write(chunk);\n    if (false === ret && !increasedAwaitDrain) {\n      // If the user unpiped during `dest.write()`, it is possible\n      // to get stuck in a permanently paused state if that write\n      // also returned false.\n      // => Check whether `dest` is still a piping destination.\n      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {\n        debug('false write response, pause', src._readableState.awaitDrain);\n        src._readableState.awaitDrain++;\n        increasedAwaitDrain = true;\n      }\n      src.pause();\n    }\n  }\n\n  // if the dest has an error, then stop piping into it.\n  // however, don't suppress the throwing behavior for this.\n  function onerror(er) {\n    debug('onerror', er);\n    unpipe();\n    dest.removeListener('error', onerror);\n    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);\n  }\n\n  // Make sure our error handler is attached before userland ones.\n  prependListener(dest, 'error', onerror);\n\n  // Both close and finish should trigger unpipe, but only once.\n  function onclose() {\n    dest.removeListener('finish', onfinish);\n    unpipe();\n  }\n  dest.once('close', onclose);\n  function onfinish() {\n    debug('onfinish');\n    dest.removeListener('close', onclose);\n    unpipe();\n  }\n  dest.once('finish', onfinish);\n\n  function unpipe() {\n    debug('unpipe');\n    src.unpipe(dest);\n  }\n\n  // tell the dest that it's being piped to\n  dest.emit('pipe', src);\n\n  // start the flow if it hasn't been started already.\n  if (!state.flowing) {\n    debug('pipe resume');\n    src.resume();\n  }\n\n  return dest;\n};\n\nfunction pipeOnDrain(src) {\n  return function () {\n    var state = src._readableState;\n    debug('pipeOnDrain', state.awaitDrain);\n    if (state.awaitDrain) state.awaitDrain--;\n    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {\n      state.flowing = true;\n      flow(src);\n    }\n  };\n}\n\nReadable.prototype.unpipe = function (dest) {\n  var state = this._readableState;\n  var unpipeInfo = { hasUnpiped: false };\n\n  // if we're not piping anywhere, then do nothing.\n  if (state.pipesCount === 0) return this;\n\n  // just one destination.  most common case.\n  if (state.pipesCount === 1) {\n    // passed in one, but it's not the right one.\n    if (dest && dest !== state.pipes) return this;\n\n    if (!dest) dest = state.pipes;\n\n    // got a match.\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n    if (dest) dest.emit('unpipe', this, unpipeInfo);\n    return this;\n  }\n\n  // slow case. multiple pipe destinations.\n\n  if (!dest) {\n    // remove all.\n    var dests = state.pipes;\n    var len = state.pipesCount;\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n\n    for (var i = 0; i < len; i++) {\n      dests[i].emit('unpipe', this, unpipeInfo);\n    }return this;\n  }\n\n  // try to find the right one.\n  var index = indexOf(state.pipes, dest);\n  if (index === -1) return this;\n\n  state.pipes.splice(index, 1);\n  state.pipesCount -= 1;\n  if (state.pipesCount === 1) state.pipes = state.pipes[0];\n\n  dest.emit('unpipe', this, unpipeInfo);\n\n  return this;\n};\n\n// set up data events if they are asked for\n// Ensure readable listeners eventually get something\nReadable.prototype.on = function (ev, fn) {\n  var res = Stream.prototype.on.call(this, ev, fn);\n\n  if (ev === 'data') {\n    // Start flowing on next tick if stream isn't explicitly paused\n    if (this._readableState.flowing !== false) this.resume();\n  } else if (ev === 'readable') {\n    var state = this._readableState;\n    if (!state.endEmitted && !state.readableListening) {\n      state.readableListening = state.needReadable = true;\n      state.emittedReadable = false;\n      if (!state.reading) {\n        processNextTick(nReadingNextTick, this);\n      } else if (state.length) {\n        emitReadable(this);\n      }\n    }\n  }\n\n  return res;\n};\nReadable.prototype.addListener = Readable.prototype.on;\n\nfunction nReadingNextTick(self) {\n  debug('readable nexttick read 0');\n  self.read(0);\n}\n\n// pause() and resume() are remnants of the legacy readable stream API\n// If the user uses them, then switch into old mode.\nReadable.prototype.resume = function () {\n  var state = this._readableState;\n  if (!state.flowing) {\n    debug('resume');\n    state.flowing = true;\n    resume(this, state);\n  }\n  return this;\n};\n\nfunction resume(stream, state) {\n  if (!state.resumeScheduled) {\n    state.resumeScheduled = true;\n    processNextTick(resume_, stream, state);\n  }\n}\n\nfunction resume_(stream, state) {\n  if (!state.reading) {\n    debug('resume read 0');\n    stream.read(0);\n  }\n\n  state.resumeScheduled = false;\n  state.awaitDrain = 0;\n  stream.emit('resume');\n  flow(stream);\n  if (state.flowing && !state.reading) stream.read(0);\n}\n\nReadable.prototype.pause = function () {\n  debug('call pause flowing=%j', this._readableState.flowing);\n  if (false !== this._readableState.flowing) {\n    debug('pause');\n    this._readableState.flowing = false;\n    this.emit('pause');\n  }\n  return this;\n};\n\nfunction flow(stream) {\n  var state = stream._readableState;\n  debug('flow', state.flowing);\n  while (state.flowing && stream.read() !== null) {}\n}\n\n// wrap an old-style stream as the async data source.\n// This is *not* part of the readable stream interface.\n// It is an ugly unfortunate mess of history.\nReadable.prototype.wrap = function (stream) {\n  var state = this._readableState;\n  var paused = false;\n\n  var self = this;\n  stream.on('end', function () {\n    debug('wrapped end');\n    if (state.decoder && !state.ended) {\n      var chunk = state.decoder.end();\n      if (chunk && chunk.length) self.push(chunk);\n    }\n\n    self.push(null);\n  });\n\n  stream.on('data', function (chunk) {\n    debug('wrapped data');\n    if (state.decoder) chunk = state.decoder.write(chunk);\n\n    // don't skip over falsy values in objectMode\n    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;\n\n    var ret = self.push(chunk);\n    if (!ret) {\n      paused = true;\n      stream.pause();\n    }\n  });\n\n  // proxy all the other methods.\n  // important when wrapping filters and duplexes.\n  for (var i in stream) {\n    if (this[i] === undefined && typeof stream[i] === 'function') {\n      this[i] = function (method) {\n        return function () {\n          return stream[method].apply(stream, arguments);\n        };\n      }(i);\n    }\n  }\n\n  // proxy certain important events.\n  for (var n = 0; n < kProxyEvents.length; n++) {\n    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));\n  }\n\n  // when we try to consume some more bytes, simply unpause the\n  // underlying stream.\n  self._read = function (n) {\n    debug('wrapped _read', n);\n    if (paused) {\n      paused = false;\n      stream.resume();\n    }\n  };\n\n  return self;\n};\n\n// exposed for testing purposes only.\nReadable._fromList = fromList;\n\n// Pluck off n bytes from an array of buffers.\n// Length is the combined lengths of all the buffers in the list.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction fromList(n, state) {\n  // nothing buffered\n  if (state.length === 0) return null;\n\n  var ret;\n  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {\n    // read it all, truncate the list\n    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);\n    state.buffer.clear();\n  } else {\n    // read part of list\n    ret = fromListPartial(n, state.buffer, state.decoder);\n  }\n\n  return ret;\n}\n\n// Extracts only enough buffered data to satisfy the amount requested.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction fromListPartial(n, list, hasStrings) {\n  var ret;\n  if (n < list.head.data.length) {\n    // slice is the same for buffers and strings\n    ret = list.head.data.slice(0, n);\n    list.head.data = list.head.data.slice(n);\n  } else if (n === list.head.data.length) {\n    // first chunk is a perfect match\n    ret = list.shift();\n  } else {\n    // result spans more than one buffer\n    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);\n  }\n  return ret;\n}\n\n// Copies a specified amount of characters from the list of buffered data\n// chunks.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction copyFromBufferString(n, list) {\n  var p = list.head;\n  var c = 1;\n  var ret = p.data;\n  n -= ret.length;\n  while (p = p.next) {\n    var str = p.data;\n    var nb = n > str.length ? str.length : n;\n    if (nb === str.length) ret += str;else ret += str.slice(0, n);\n    n -= nb;\n    if (n === 0) {\n      if (nb === str.length) {\n        ++c;\n        if (p.next) list.head = p.next;else list.head = list.tail = null;\n      } else {\n        list.head = p;\n        p.data = str.slice(nb);\n      }\n      break;\n    }\n    ++c;\n  }\n  list.length -= c;\n  return ret;\n}\n\n// Copies a specified amount of bytes from the list of buffered data chunks.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction copyFromBuffer(n, list) {\n  var ret = Buffer.allocUnsafe(n);\n  var p = list.head;\n  var c = 1;\n  p.data.copy(ret);\n  n -= p.data.length;\n  while (p = p.next) {\n    var buf = p.data;\n    var nb = n > buf.length ? buf.length : n;\n    buf.copy(ret, ret.length - n, 0, nb);\n    n -= nb;\n    if (n === 0) {\n      if (nb === buf.length) {\n        ++c;\n        if (p.next) list.head = p.next;else list.head = list.tail = null;\n      } else {\n        list.head = p;\n        p.data = buf.slice(nb);\n      }\n      break;\n    }\n    ++c;\n  }\n  list.length -= c;\n  return ret;\n}\n\nfunction endReadable(stream) {\n  var state = stream._readableState;\n\n  // If we get here before consuming all the bytes, then that is a\n  // bug in node.  Should never happen.\n  if (state.length > 0) throw new Error('\"endReadable()\" called on non-empty stream');\n\n  if (!state.endEmitted) {\n    state.ended = true;\n    processNextTick(endReadableNT, state, stream);\n  }\n}\n\nfunction endReadableNT(state, stream) {\n  // Check that we didn't get one last unshift.\n  if (!state.endEmitted && state.length === 0) {\n    state.endEmitted = true;\n    stream.readable = false;\n    stream.emit('end');\n  }\n}\n\nfunction forEach(xs, f) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    f(xs[i], i);\n  }\n}\n\nfunction indexOf(xs, x) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    if (xs[i] === x) return i;\n  }\n  return -1;\n}\n}).call(this)}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n\n},{\"./_stream_duplex\":11,\"./internal/streams/BufferList\":16,\"./internal/streams/destroy\":17,\"./internal/streams/stream\":18,\"_process\":63,\"core-util-is\":40,\"events\":39,\"inherits\":49,\"isarray\":52,\"process-nextick-args\":62,\"safe-buffer\":20,\"string_decoder/\":21,\"util\":37}],14:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a transform stream is a readable/writable stream where you do\n// something with the data.  Sometimes it's called a \"filter\",\n// but that's not a great name for it, since that implies a thing where\n// some bits pass through, and others are simply ignored.  (That would\n// be a valid example of a transform, of course.)\n//\n// While the output is causally related to the input, it's not a\n// necessarily symmetric or synchronous transformation.  For example,\n// a zlib stream might take multiple plain-text writes(), and then\n// emit a single compressed chunk some time in the future.\n//\n// Here's how this works:\n//\n// The Transform stream has all the aspects of the readable and writable\n// stream classes.  When you write(chunk), that calls _write(chunk,cb)\n// internally, and returns false if there's a lot of pending writes\n// buffered up.  When you call read(), that calls _read(n) until\n// there's enough pending readable data buffered up.\n//\n// In a transform stream, the written data is placed in a buffer.  When\n// _read(n) is called, it transforms the queued up data, calling the\n// buffered _write cb's as it consumes chunks.  If consuming a single\n// written chunk would result in multiple output chunks, then the first\n// outputted bit calls the readcb, and subsequent chunks just go into\n// the read buffer, and will cause it to emit 'readable' if necessary.\n//\n// This way, back-pressure is actually determined by the reading side,\n// since _read has to be called to start processing a new chunk.  However,\n// a pathological inflate type of transform can cause excessive buffering\n// here.  For example, imagine a stream where every byte of input is\n// interpreted as an integer from 0-255, and then results in that many\n// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in\n// 1kb of data being output.  In this case, you could write a very small\n// amount of input, and end up with a very large amount of output.  In\n// such a pathological inflating mechanism, there'd be no way to tell\n// the system to stop doing the transform.  A single 4MB write could\n// cause the system to run out of memory.\n//\n// However, even in such a pathological case, only a single written chunk\n// would be consumed, and then the rest would wait (un-transformed) until\n// the results of the previous transformed chunk were consumed.\n\n'use strict';\n\nmodule.exports = Transform;\n\nvar Duplex = require('./_stream_duplex');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(Transform, Duplex);\n\nfunction TransformState(stream) {\n  this.afterTransform = function (er, data) {\n    return afterTransform(stream, er, data);\n  };\n\n  this.needTransform = false;\n  this.transforming = false;\n  this.writecb = null;\n  this.writechunk = null;\n  this.writeencoding = null;\n}\n\nfunction afterTransform(stream, er, data) {\n  var ts = stream._transformState;\n  ts.transforming = false;\n\n  var cb = ts.writecb;\n\n  if (!cb) {\n    return stream.emit('error', new Error('write callback called multiple times'));\n  }\n\n  ts.writechunk = null;\n  ts.writecb = null;\n\n  if (data !== null && data !== undefined) stream.push(data);\n\n  cb(er);\n\n  var rs = stream._readableState;\n  rs.reading = false;\n  if (rs.needReadable || rs.length < rs.highWaterMark) {\n    stream._read(rs.highWaterMark);\n  }\n}\n\nfunction Transform(options) {\n  if (!(this instanceof Transform)) return new Transform(options);\n\n  Duplex.call(this, options);\n\n  this._transformState = new TransformState(this);\n\n  var stream = this;\n\n  // start out asking for a readable event once data is transformed.\n  this._readableState.needReadable = true;\n\n  // we have implemented the _read method, and done the other things\n  // that Readable wants before the first _read call, so unset the\n  // sync guard flag.\n  this._readableState.sync = false;\n\n  if (options) {\n    if (typeof options.transform === 'function') this._transform = options.transform;\n\n    if (typeof options.flush === 'function') this._flush = options.flush;\n  }\n\n  // When the writable side finishes, then flush out anything remaining.\n  this.once('prefinish', function () {\n    if (typeof this._flush === 'function') this._flush(function (er, data) {\n      done(stream, er, data);\n    });else done(stream);\n  });\n}\n\nTransform.prototype.push = function (chunk, encoding) {\n  this._transformState.needTransform = false;\n  return Duplex.prototype.push.call(this, chunk, encoding);\n};\n\n// This is the part where you do stuff!\n// override this function in implementation classes.\n// 'chunk' is an input chunk.\n//\n// Call `push(newChunk)` to pass along transformed output\n// to the readable side.  You may call 'push' zero or more times.\n//\n// Call `cb(err)` when you are done with this chunk.  If you pass\n// an error, then that'll put the hurt on the whole operation.  If you\n// never call cb(), then you'll never get another chunk.\nTransform.prototype._transform = function (chunk, encoding, cb) {\n  throw new Error('_transform() is not implemented');\n};\n\nTransform.prototype._write = function (chunk, encoding, cb) {\n  var ts = this._transformState;\n  ts.writecb = cb;\n  ts.writechunk = chunk;\n  ts.writeencoding = encoding;\n  if (!ts.transforming) {\n    var rs = this._readableState;\n    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);\n  }\n};\n\n// Doesn't matter what the args are here.\n// _transform does all the work.\n// That we got here means that the readable side wants more data.\nTransform.prototype._read = function (n) {\n  var ts = this._transformState;\n\n  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {\n    ts.transforming = true;\n    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);\n  } else {\n    // mark that we need a transform, so that any data that comes in\n    // will get processed, now that we've asked for it.\n    ts.needTransform = true;\n  }\n};\n\nTransform.prototype._destroy = function (err, cb) {\n  var _this = this;\n\n  Duplex.prototype._destroy.call(this, err, function (err2) {\n    cb(err2);\n    _this.emit('close');\n  });\n};\n\nfunction done(stream, er, data) {\n  if (er) return stream.emit('error', er);\n\n  if (data !== null && data !== undefined) stream.push(data);\n\n  // if there's nothing in the write buffer, then that means\n  // that nothing more will ever be provided\n  var ws = stream._writableState;\n  var ts = stream._transformState;\n\n  if (ws.length) throw new Error('Calling transform done when ws.length != 0');\n\n  if (ts.transforming) throw new Error('Calling transform done when still transforming');\n\n  return stream.push(null);\n}\n},{\"./_stream_duplex\":11,\"core-util-is\":40,\"inherits\":49}],15:[function(require,module,exports){\n(function (process,global,setImmediate){(function (){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// A bit simpler than readable streams.\n// Implement an async ._write(chunk, encoding, cb), and it'll handle all\n// the drain event emission and buffering.\n\n'use strict';\n\n/*<replacement>*/\n\nvar processNextTick = require('process-nextick-args');\n/*</replacement>*/\n\nmodule.exports = Writable;\n\n/* <replacement> */\nfunction WriteReq(chunk, encoding, cb) {\n  this.chunk = chunk;\n  this.encoding = encoding;\n  this.callback = cb;\n  this.next = null;\n}\n\n// It seems a linked list but it is not\n// there will be only 2 of these for each stream\nfunction CorkedRequest(state) {\n  var _this = this;\n\n  this.next = null;\n  this.entry = null;\n  this.finish = function () {\n    onCorkedFinish(_this, state);\n  };\n}\n/* </replacement> */\n\n/*<replacement>*/\nvar asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;\n/*</replacement>*/\n\n/*<replacement>*/\nvar Duplex;\n/*</replacement>*/\n\nWritable.WritableState = WritableState;\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\n/*<replacement>*/\nvar internalUtil = {\n  deprecate: require('util-deprecate')\n};\n/*</replacement>*/\n\n/*<replacement>*/\nvar Stream = require('./internal/streams/stream');\n/*</replacement>*/\n\n/*<replacement>*/\nvar Buffer = require('safe-buffer').Buffer;\nvar OurUint8Array = global.Uint8Array || function () {};\nfunction _uint8ArrayToBuffer(chunk) {\n  return Buffer.from(chunk);\n}\nfunction _isUint8Array(obj) {\n  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;\n}\n/*</replacement>*/\n\nvar destroyImpl = require('./internal/streams/destroy');\n\nutil.inherits(Writable, Stream);\n\nfunction nop() {}\n\nfunction WritableState(options, stream) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  options = options || {};\n\n  // object stream flag to indicate whether or not this stream\n  // contains buffers or objects.\n  this.objectMode = !!options.objectMode;\n\n  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;\n\n  // the point at which write() starts returning false\n  // Note: 0 is a valid value, means that we always return false if\n  // the entire buffer is not flushed immediately on write()\n  var hwm = options.highWaterMark;\n  var defaultHwm = this.objectMode ? 16 : 16 * 1024;\n  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;\n\n  // cast to ints.\n  this.highWaterMark = Math.floor(this.highWaterMark);\n\n  // if _final has been called\n  this.finalCalled = false;\n\n  // drain event flag.\n  this.needDrain = false;\n  // at the start of calling end()\n  this.ending = false;\n  // when end() has been called, and returned\n  this.ended = false;\n  // when 'finish' is emitted\n  this.finished = false;\n\n  // has it been destroyed\n  this.destroyed = false;\n\n  // should we decode strings into buffers before passing to _write?\n  // this is here so that some node-core streams can optimize string\n  // handling at a lower level.\n  var noDecode = options.decodeStrings === false;\n  this.decodeStrings = !noDecode;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // not an actual buffer we keep track of, but a measurement\n  // of how much we're waiting to get pushed to some underlying\n  // socket or file.\n  this.length = 0;\n\n  // a flag to see when we're in the middle of a write.\n  this.writing = false;\n\n  // when true all writes will be buffered until .uncork() call\n  this.corked = 0;\n\n  // a flag to be able to tell if the onwrite cb is called immediately,\n  // or on a later tick.  We set this to true at first, because any\n  // actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first write call.\n  this.sync = true;\n\n  // a flag to know if we're processing previously buffered items, which\n  // may call the _write() callback in the same tick, so that we don't\n  // end up in an overlapped onwrite situation.\n  this.bufferProcessing = false;\n\n  // the callback that's passed to _write(chunk,cb)\n  this.onwrite = function (er) {\n    onwrite(stream, er);\n  };\n\n  // the callback that the user supplies to write(chunk,encoding,cb)\n  this.writecb = null;\n\n  // the amount that is being written when _write is called.\n  this.writelen = 0;\n\n  this.bufferedRequest = null;\n  this.lastBufferedRequest = null;\n\n  // number of pending user-supplied write callbacks\n  // this must be 0 before 'finish' can be emitted\n  this.pendingcb = 0;\n\n  // emit prefinish if the only thing we're waiting for is _write cbs\n  // This is relevant for synchronous Transform streams\n  this.prefinished = false;\n\n  // True if the error was already emitted and should not be thrown again\n  this.errorEmitted = false;\n\n  // count buffered requests\n  this.bufferedRequestCount = 0;\n\n  // allocate the first CorkedRequest, there is always\n  // one allocated and free to use, and we maintain at most two\n  this.corkedRequestsFree = new CorkedRequest(this);\n}\n\nWritableState.prototype.getBuffer = function getBuffer() {\n  var current = this.bufferedRequest;\n  var out = [];\n  while (current) {\n    out.push(current);\n    current = current.next;\n  }\n  return out;\n};\n\n(function () {\n  try {\n    Object.defineProperty(WritableState.prototype, 'buffer', {\n      get: internalUtil.deprecate(function () {\n        return this.getBuffer();\n      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')\n    });\n  } catch (_) {}\n})();\n\n// Test _writableState for inheritance to account for Duplex streams,\n// whose prototype chain only points to Readable.\nvar realHasInstance;\nif (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {\n  realHasInstance = Function.prototype[Symbol.hasInstance];\n  Object.defineProperty(Writable, Symbol.hasInstance, {\n    value: function (object) {\n      if (realHasInstance.call(this, object)) return true;\n\n      return object && object._writableState instanceof WritableState;\n    }\n  });\n} else {\n  realHasInstance = function (object) {\n    return object instanceof this;\n  };\n}\n\nfunction Writable(options) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  // Writable ctor is applied to Duplexes, too.\n  // `realHasInstance` is necessary because using plain `instanceof`\n  // would return false, as no `_writableState` property is attached.\n\n  // Trying to use the custom `instanceof` for Writable here will also break the\n  // Node.js LazyTransform implementation, which has a non-trivial getter for\n  // `_writableState` that would lead to infinite recursion.\n  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {\n    return new Writable(options);\n  }\n\n  this._writableState = new WritableState(options, this);\n\n  // legacy.\n  this.writable = true;\n\n  if (options) {\n    if (typeof options.write === 'function') this._write = options.write;\n\n    if (typeof options.writev === 'function') this._writev = options.writev;\n\n    if (typeof options.destroy === 'function') this._destroy = options.destroy;\n\n    if (typeof options.final === 'function') this._final = options.final;\n  }\n\n  Stream.call(this);\n}\n\n// Otherwise people can pipe Writable streams, which is just wrong.\nWritable.prototype.pipe = function () {\n  this.emit('error', new Error('Cannot pipe, not readable'));\n};\n\nfunction writeAfterEnd(stream, cb) {\n  var er = new Error('write after end');\n  // TODO: defer error events consistently everywhere, not just the cb\n  stream.emit('error', er);\n  processNextTick(cb, er);\n}\n\n// Checks that a user-supplied chunk is valid, especially for the particular\n// mode the stream is in. Currently this means that `null` is never accepted\n// and undefined/non-string values are only allowed in object mode.\nfunction validChunk(stream, state, chunk, cb) {\n  var valid = true;\n  var er = false;\n\n  if (chunk === null) {\n    er = new TypeError('May not write null values to stream');\n  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {\n    er = new TypeError('Invalid non-string/buffer chunk');\n  }\n  if (er) {\n    stream.emit('error', er);\n    processNextTick(cb, er);\n    valid = false;\n  }\n  return valid;\n}\n\nWritable.prototype.write = function (chunk, encoding, cb) {\n  var state = this._writableState;\n  var ret = false;\n  var isBuf = _isUint8Array(chunk) && !state.objectMode;\n\n  if (isBuf && !Buffer.isBuffer(chunk)) {\n    chunk = _uint8ArrayToBuffer(chunk);\n  }\n\n  if (typeof encoding === 'function') {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;\n\n  if (typeof cb !== 'function') cb = nop;\n\n  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {\n    state.pendingcb++;\n    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);\n  }\n\n  return ret;\n};\n\nWritable.prototype.cork = function () {\n  var state = this._writableState;\n\n  state.corked++;\n};\n\nWritable.prototype.uncork = function () {\n  var state = this._writableState;\n\n  if (state.corked) {\n    state.corked--;\n\n    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);\n  }\n};\n\nWritable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {\n  // node::ParseEncoding() requires lower case.\n  if (typeof encoding === 'string') encoding = encoding.toLowerCase();\n  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);\n  this._writableState.defaultEncoding = encoding;\n  return this;\n};\n\nfunction decodeChunk(state, chunk, encoding) {\n  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {\n    chunk = Buffer.from(chunk, encoding);\n  }\n  return chunk;\n}\n\n// if we're already writing something, then just put this\n// in the queue, and wait our turn.  Otherwise, call _write\n// If we return false, then we need a drain event, so set that flag.\nfunction writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {\n  if (!isBuf) {\n    var newChunk = decodeChunk(state, chunk, encoding);\n    if (chunk !== newChunk) {\n      isBuf = true;\n      encoding = 'buffer';\n      chunk = newChunk;\n    }\n  }\n  var len = state.objectMode ? 1 : chunk.length;\n\n  state.length += len;\n\n  var ret = state.length < state.highWaterMark;\n  // we must ensure that previous needDrain will not be reset to false.\n  if (!ret) state.needDrain = true;\n\n  if (state.writing || state.corked) {\n    var last = state.lastBufferedRequest;\n    state.lastBufferedRequest = {\n      chunk: chunk,\n      encoding: encoding,\n      isBuf: isBuf,\n      callback: cb,\n      next: null\n    };\n    if (last) {\n      last.next = state.lastBufferedRequest;\n    } else {\n      state.bufferedRequest = state.lastBufferedRequest;\n    }\n    state.bufferedRequestCount += 1;\n  } else {\n    doWrite(stream, state, false, len, chunk, encoding, cb);\n  }\n\n  return ret;\n}\n\nfunction doWrite(stream, state, writev, len, chunk, encoding, cb) {\n  state.writelen = len;\n  state.writecb = cb;\n  state.writing = true;\n  state.sync = true;\n  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);\n  state.sync = false;\n}\n\nfunction onwriteError(stream, state, sync, er, cb) {\n  --state.pendingcb;\n\n  if (sync) {\n    // defer the callback if we are being called synchronously\n    // to avoid piling up things on the stack\n    processNextTick(cb, er);\n    // this can emit finish, and it will always happen\n    // after error\n    processNextTick(finishMaybe, stream, state);\n    stream._writableState.errorEmitted = true;\n    stream.emit('error', er);\n  } else {\n    // the caller expect this to happen before if\n    // it is async\n    cb(er);\n    stream._writableState.errorEmitted = true;\n    stream.emit('error', er);\n    // this can emit finish, but finish must\n    // always follow error\n    finishMaybe(stream, state);\n  }\n}\n\nfunction onwriteStateUpdate(state) {\n  state.writing = false;\n  state.writecb = null;\n  state.length -= state.writelen;\n  state.writelen = 0;\n}\n\nfunction onwrite(stream, er) {\n  var state = stream._writableState;\n  var sync = state.sync;\n  var cb = state.writecb;\n\n  onwriteStateUpdate(state);\n\n  if (er) onwriteError(stream, state, sync, er, cb);else {\n    // Check if we're actually ready to finish, but don't emit yet\n    var finished = needFinish(state);\n\n    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {\n      clearBuffer(stream, state);\n    }\n\n    if (sync) {\n      /*<replacement>*/\n      asyncWrite(afterWrite, stream, state, finished, cb);\n      /*</replacement>*/\n    } else {\n      afterWrite(stream, state, finished, cb);\n    }\n  }\n}\n\nfunction afterWrite(stream, state, finished, cb) {\n  if (!finished) onwriteDrain(stream, state);\n  state.pendingcb--;\n  cb();\n  finishMaybe(stream, state);\n}\n\n// Must force callback to be called on nextTick, so that we don't\n// emit 'drain' before the write() consumer gets the 'false' return\n// value, and has a chance to attach a 'drain' listener.\nfunction onwriteDrain(stream, state) {\n  if (state.length === 0 && state.needDrain) {\n    state.needDrain = false;\n    stream.emit('drain');\n  }\n}\n\n// if there's something in the buffer waiting, then process it\nfunction clearBuffer(stream, state) {\n  state.bufferProcessing = true;\n  var entry = state.bufferedRequest;\n\n  if (stream._writev && entry && entry.next) {\n    // Fast case, write everything using _writev()\n    var l = state.bufferedRequestCount;\n    var buffer = new Array(l);\n    var holder = state.corkedRequestsFree;\n    holder.entry = entry;\n\n    var count = 0;\n    var allBuffers = true;\n    while (entry) {\n      buffer[count] = entry;\n      if (!entry.isBuf) allBuffers = false;\n      entry = entry.next;\n      count += 1;\n    }\n    buffer.allBuffers = allBuffers;\n\n    doWrite(stream, state, true, state.length, buffer, '', holder.finish);\n\n    // doWrite is almost always async, defer these to save a bit of time\n    // as the hot path ends with doWrite\n    state.pendingcb++;\n    state.lastBufferedRequest = null;\n    if (holder.next) {\n      state.corkedRequestsFree = holder.next;\n      holder.next = null;\n    } else {\n      state.corkedRequestsFree = new CorkedRequest(state);\n    }\n  } else {\n    // Slow case, write chunks one-by-one\n    while (entry) {\n      var chunk = entry.chunk;\n      var encoding = entry.encoding;\n      var cb = entry.callback;\n      var len = state.objectMode ? 1 : chunk.length;\n\n      doWrite(stream, state, false, len, chunk, encoding, cb);\n      entry = entry.next;\n      // if we didn't call the onwrite immediately, then\n      // it means that we need to wait until it does.\n      // also, that means that the chunk and cb are currently\n      // being processed, so move the buffer counter past them.\n      if (state.writing) {\n        break;\n      }\n    }\n\n    if (entry === null) state.lastBufferedRequest = null;\n  }\n\n  state.bufferedRequestCount = 0;\n  state.bufferedRequest = entry;\n  state.bufferProcessing = false;\n}\n\nWritable.prototype._write = function (chunk, encoding, cb) {\n  cb(new Error('_write() is not implemented'));\n};\n\nWritable.prototype._writev = null;\n\nWritable.prototype.end = function (chunk, encoding, cb) {\n  var state = this._writableState;\n\n  if (typeof chunk === 'function') {\n    cb = chunk;\n    chunk = null;\n    encoding = null;\n  } else if (typeof encoding === 'function') {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);\n\n  // .end() fully uncorks\n  if (state.corked) {\n    state.corked = 1;\n    this.uncork();\n  }\n\n  // ignore unnecessary end() calls.\n  if (!state.ending && !state.finished) endWritable(this, state, cb);\n};\n\nfunction needFinish(state) {\n  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;\n}\nfunction callFinal(stream, state) {\n  stream._final(function (err) {\n    state.pendingcb--;\n    if (err) {\n      stream.emit('error', err);\n    }\n    state.prefinished = true;\n    stream.emit('prefinish');\n    finishMaybe(stream, state);\n  });\n}\nfunction prefinish(stream, state) {\n  if (!state.prefinished && !state.finalCalled) {\n    if (typeof stream._final === 'function') {\n      state.pendingcb++;\n      state.finalCalled = true;\n      processNextTick(callFinal, stream, state);\n    } else {\n      state.prefinished = true;\n      stream.emit('prefinish');\n    }\n  }\n}\n\nfunction finishMaybe(stream, state) {\n  var need = needFinish(state);\n  if (need) {\n    prefinish(stream, state);\n    if (state.pendingcb === 0) {\n      state.finished = true;\n      stream.emit('finish');\n    }\n  }\n  return need;\n}\n\nfunction endWritable(stream, state, cb) {\n  state.ending = true;\n  finishMaybe(stream, state);\n  if (cb) {\n    if (state.finished) processNextTick(cb);else stream.once('finish', cb);\n  }\n  state.ended = true;\n  stream.writable = false;\n}\n\nfunction onCorkedFinish(corkReq, state, err) {\n  var entry = corkReq.entry;\n  corkReq.entry = null;\n  while (entry) {\n    var cb = entry.callback;\n    state.pendingcb--;\n    cb(err);\n    entry = entry.next;\n  }\n  if (state.corkedRequestsFree) {\n    state.corkedRequestsFree.next = corkReq;\n  } else {\n    state.corkedRequestsFree = corkReq;\n  }\n}\n\nObject.defineProperty(Writable.prototype, 'destroyed', {\n  get: function () {\n    if (this._writableState === undefined) {\n      return false;\n    }\n    return this._writableState.destroyed;\n  },\n  set: function (value) {\n    // we ignore the value if the stream\n    // has not been initialized yet\n    if (!this._writableState) {\n      return;\n    }\n\n    // backward compatibility, the user is explicitly\n    // managing destroyed\n    this._writableState.destroyed = value;\n  }\n});\n\nWritable.prototype.destroy = destroyImpl.destroy;\nWritable.prototype._undestroy = destroyImpl.undestroy;\nWritable.prototype._destroy = function (err, cb) {\n  this.end();\n  cb(err);\n};\n}).call(this)}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {},require(\"timers\").setImmediate)\n\n},{\"./_stream_duplex\":11,\"./internal/streams/destroy\":17,\"./internal/streams/stream\":18,\"_process\":63,\"core-util-is\":40,\"inherits\":49,\"process-nextick-args\":62,\"safe-buffer\":20,\"timers\":77,\"util-deprecate\":78}],16:[function(require,module,exports){\n'use strict';\n\n/*<replacement>*/\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Buffer = require('safe-buffer').Buffer;\n/*</replacement>*/\n\nfunction copyBuffer(src, target, offset) {\n  src.copy(target, offset);\n}\n\nmodule.exports = function () {\n  function BufferList() {\n    _classCallCheck(this, BufferList);\n\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n\n  BufferList.prototype.push = function push(v) {\n    var entry = { data: v, next: null };\n    if (this.length > 0) this.tail.next = entry;else this.head = entry;\n    this.tail = entry;\n    ++this.length;\n  };\n\n  BufferList.prototype.unshift = function unshift(v) {\n    var entry = { data: v, next: this.head };\n    if (this.length === 0) this.tail = entry;\n    this.head = entry;\n    ++this.length;\n  };\n\n  BufferList.prototype.shift = function shift() {\n    if (this.length === 0) return;\n    var ret = this.head.data;\n    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;\n    --this.length;\n    return ret;\n  };\n\n  BufferList.prototype.clear = function clear() {\n    this.head = this.tail = null;\n    this.length = 0;\n  };\n\n  BufferList.prototype.join = function join(s) {\n    if (this.length === 0) return '';\n    var p = this.head;\n    var ret = '' + p.data;\n    while (p = p.next) {\n      ret += s + p.data;\n    }return ret;\n  };\n\n  BufferList.prototype.concat = function concat(n) {\n    if (this.length === 0) return Buffer.alloc(0);\n    if (this.length === 1) return this.head.data;\n    var ret = Buffer.allocUnsafe(n >>> 0);\n    var p = this.head;\n    var i = 0;\n    while (p) {\n      copyBuffer(p.data, ret, i);\n      i += p.data.length;\n      p = p.next;\n    }\n    return ret;\n  };\n\n  return BufferList;\n}();\n},{\"safe-buffer\":20}],17:[function(require,module,exports){\n'use strict';\n\n/*<replacement>*/\n\nvar processNextTick = require('process-nextick-args');\n/*</replacement>*/\n\n// undocumented cb() API, needed for core, not for public API\nfunction destroy(err, cb) {\n  var _this = this;\n\n  var readableDestroyed = this._readableState && this._readableState.destroyed;\n  var writableDestroyed = this._writableState && this._writableState.destroyed;\n\n  if (readableDestroyed || writableDestroyed) {\n    if (cb) {\n      cb(err);\n    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {\n      processNextTick(emitErrorNT, this, err);\n    }\n    return;\n  }\n\n  // we set destroyed to true before firing error callbacks in order\n  // to make it re-entrance safe in case destroy() is called within callbacks\n\n  if (this._readableState) {\n    this._readableState.destroyed = true;\n  }\n\n  // if this is a duplex stream mark the writable part as destroyed as well\n  if (this._writableState) {\n    this._writableState.destroyed = true;\n  }\n\n  this._destroy(err || null, function (err) {\n    if (!cb && err) {\n      processNextTick(emitErrorNT, _this, err);\n      if (_this._writableState) {\n        _this._writableState.errorEmitted = true;\n      }\n    } else if (cb) {\n      cb(err);\n    }\n  });\n}\n\nfunction undestroy() {\n  if (this._readableState) {\n    this._readableState.destroyed = false;\n    this._readableState.reading = false;\n    this._readableState.ended = false;\n    this._readableState.endEmitted = false;\n  }\n\n  if (this._writableState) {\n    this._writableState.destroyed = false;\n    this._writableState.ended = false;\n    this._writableState.ending = false;\n    this._writableState.finished = false;\n    this._writableState.errorEmitted = false;\n  }\n}\n\nfunction emitErrorNT(self, err) {\n  self.emit('error', err);\n}\n\nmodule.exports = {\n  destroy: destroy,\n  undestroy: undestroy\n};\n},{\"process-nextick-args\":62}],18:[function(require,module,exports){\nmodule.exports = require('events').EventEmitter;\n\n},{\"events\":39}],19:[function(require,module,exports){\nexports = module.exports = require('./lib/_stream_readable.js');\nexports.Stream = exports;\nexports.Readable = exports;\nexports.Writable = require('./lib/_stream_writable.js');\nexports.Duplex = require('./lib/_stream_duplex.js');\nexports.Transform = require('./lib/_stream_transform.js');\nexports.PassThrough = require('./lib/_stream_passthrough.js');\n\n},{\"./lib/_stream_duplex.js\":11,\"./lib/_stream_passthrough.js\":12,\"./lib/_stream_readable.js\":13,\"./lib/_stream_transform.js\":14,\"./lib/_stream_writable.js\":15}],20:[function(require,module,exports){\n/* eslint-disable node/no-deprecated-api */\nvar buffer = require('buffer')\nvar Buffer = buffer.Buffer\n\n// alternative to using Object.keys for old browsers\nfunction copyProps (src, dst) {\n  for (var key in src) {\n    dst[key] = src[key]\n  }\n}\nif (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {\n  module.exports = buffer\n} else {\n  // Copy properties from require('buffer')\n  copyProps(buffer, exports)\n  exports.Buffer = SafeBuffer\n}\n\nfunction SafeBuffer (arg, encodingOrOffset, length) {\n  return Buffer(arg, encodingOrOffset, length)\n}\n\n// Copy static methods from Buffer\ncopyProps(Buffer, SafeBuffer)\n\nSafeBuffer.from = function (arg, encodingOrOffset, length) {\n  if (typeof arg === 'number') {\n    throw new TypeError('Argument must not be a number')\n  }\n  return Buffer(arg, encodingOrOffset, length)\n}\n\nSafeBuffer.alloc = function (size, fill, encoding) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  var buf = Buffer(size)\n  if (fill !== undefined) {\n    if (typeof encoding === 'string') {\n      buf.fill(fill, encoding)\n    } else {\n      buf.fill(fill)\n    }\n  } else {\n    buf.fill(0)\n  }\n  return buf\n}\n\nSafeBuffer.allocUnsafe = function (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  return Buffer(size)\n}\n\nSafeBuffer.allocUnsafeSlow = function (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  return buffer.SlowBuffer(size)\n}\n\n},{\"buffer\":38}],21:[function(require,module,exports){\n'use strict';\n\nvar Buffer = require('safe-buffer').Buffer;\n\nvar isEncoding = Buffer.isEncoding || function (encoding) {\n  encoding = '' + encoding;\n  switch (encoding && encoding.toLowerCase()) {\n    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':\n      return true;\n    default:\n      return false;\n  }\n};\n\nfunction _normalizeEncoding(enc) {\n  if (!enc) return 'utf8';\n  var retried;\n  while (true) {\n    switch (enc) {\n      case 'utf8':\n      case 'utf-8':\n        return 'utf8';\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return 'utf16le';\n      case 'latin1':\n      case 'binary':\n        return 'latin1';\n      case 'base64':\n      case 'ascii':\n      case 'hex':\n        return enc;\n      default:\n        if (retried) return; // undefined\n        enc = ('' + enc).toLowerCase();\n        retried = true;\n    }\n  }\n};\n\n// Do not cache `Buffer.isEncoding` when checking encoding names as some\n// modules monkey-patch it to support additional encodings\nfunction normalizeEncoding(enc) {\n  var nenc = _normalizeEncoding(enc);\n  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);\n  return nenc || enc;\n}\n\n// StringDecoder provides an interface for efficiently splitting a series of\n// buffers into a series of JS strings without breaking apart multi-byte\n// characters.\nexports.StringDecoder = StringDecoder;\nfunction StringDecoder(encoding) {\n  this.encoding = normalizeEncoding(encoding);\n  var nb;\n  switch (this.encoding) {\n    case 'utf16le':\n      this.text = utf16Text;\n      this.end = utf16End;\n      nb = 4;\n      break;\n    case 'utf8':\n      this.fillLast = utf8FillLast;\n      nb = 4;\n      break;\n    case 'base64':\n      this.text = base64Text;\n      this.end = base64End;\n      nb = 3;\n      break;\n    default:\n      this.write = simpleWrite;\n      this.end = simpleEnd;\n      return;\n  }\n  this.lastNeed = 0;\n  this.lastTotal = 0;\n  this.lastChar = Buffer.allocUnsafe(nb);\n}\n\nStringDecoder.prototype.write = function (buf) {\n  if (buf.length === 0) return '';\n  var r;\n  var i;\n  if (this.lastNeed) {\n    r = this.fillLast(buf);\n    if (r === undefined) return '';\n    i = this.lastNeed;\n    this.lastNeed = 0;\n  } else {\n    i = 0;\n  }\n  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);\n  return r || '';\n};\n\nStringDecoder.prototype.end = utf8End;\n\n// Returns only complete characters in a Buffer\nStringDecoder.prototype.text = utf8Text;\n\n// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer\nStringDecoder.prototype.fillLast = function (buf) {\n  if (this.lastNeed <= buf.length) {\n    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);\n    return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n  }\n  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);\n  this.lastNeed -= buf.length;\n};\n\n// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a\n// continuation byte.\nfunction utf8CheckByte(byte) {\n  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;\n  return -1;\n}\n\n// Checks at most 3 bytes at the end of a Buffer in order to detect an\n// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)\n// needed to complete the UTF-8 character (if applicable) are returned.\nfunction utf8CheckIncomplete(self, buf, i) {\n  var j = buf.length - 1;\n  if (j < i) return 0;\n  var nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) self.lastNeed = nb - 1;\n    return nb;\n  }\n  if (--j < i) return 0;\n  nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) self.lastNeed = nb - 2;\n    return nb;\n  }\n  if (--j < i) return 0;\n  nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) {\n      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;\n    }\n    return nb;\n  }\n  return 0;\n}\n\n// Validates as many continuation bytes for a multi-byte UTF-8 character as\n// needed or are available. If we see a non-continuation byte where we expect\n// one, we \"replace\" the validated continuation bytes we've seen so far with\n// UTF-8 replacement characters ('\\ufffd'), to match v8's UTF-8 decoding\n// behavior. The continuation byte check is included three times in the case\n// where all of the continuation bytes for a character exist in the same buffer.\n// It is also done this way as a slight performance increase instead of using a\n// loop.\nfunction utf8CheckExtraBytes(self, buf, p) {\n  if ((buf[0] & 0xC0) !== 0x80) {\n    self.lastNeed = 0;\n    return '\\ufffd'.repeat(p);\n  }\n  if (self.lastNeed > 1 && buf.length > 1) {\n    if ((buf[1] & 0xC0) !== 0x80) {\n      self.lastNeed = 1;\n      return '\\ufffd'.repeat(p + 1);\n    }\n    if (self.lastNeed > 2 && buf.length > 2) {\n      if ((buf[2] & 0xC0) !== 0x80) {\n        self.lastNeed = 2;\n        return '\\ufffd'.repeat(p + 2);\n      }\n    }\n  }\n}\n\n// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.\nfunction utf8FillLast(buf) {\n  var p = this.lastTotal - this.lastNeed;\n  var r = utf8CheckExtraBytes(this, buf, p);\n  if (r !== undefined) return r;\n  if (this.lastNeed <= buf.length) {\n    buf.copy(this.lastChar, p, 0, this.lastNeed);\n    return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n  }\n  buf.copy(this.lastChar, p, 0, buf.length);\n  this.lastNeed -= buf.length;\n}\n\n// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a\n// partial character, the character's bytes are buffered until the required\n// number of bytes are available.\nfunction utf8Text(buf, i) {\n  var total = utf8CheckIncomplete(this, buf, i);\n  if (!this.lastNeed) return buf.toString('utf8', i);\n  this.lastTotal = total;\n  var end = buf.length - (total - this.lastNeed);\n  buf.copy(this.lastChar, 0, end);\n  return buf.toString('utf8', i, end);\n}\n\n// For UTF-8, a replacement character for each buffered byte of a (partial)\n// character needs to be added to the output.\nfunction utf8End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) return r + '\\ufffd'.repeat(this.lastTotal - this.lastNeed);\n  return r;\n}\n\n// UTF-16LE typically needs two bytes per character, but even if we have an even\n// number of bytes available, we need to check if we end on a leading/high\n// surrogate. In that case, we need to wait for the next two bytes in order to\n// decode the last character properly.\nfunction utf16Text(buf, i) {\n  if ((buf.length - i) % 2 === 0) {\n    var r = buf.toString('utf16le', i);\n    if (r) {\n      var c = r.charCodeAt(r.length - 1);\n      if (c >= 0xD800 && c <= 0xDBFF) {\n        this.lastNeed = 2;\n        this.lastTotal = 4;\n        this.lastChar[0] = buf[buf.length - 2];\n        this.lastChar[1] = buf[buf.length - 1];\n        return r.slice(0, -1);\n      }\n    }\n    return r;\n  }\n  this.lastNeed = 1;\n  this.lastTotal = 2;\n  this.lastChar[0] = buf[buf.length - 1];\n  return buf.toString('utf16le', i, buf.length - 1);\n}\n\n// For UTF-16LE we do not explicitly append special replacement characters if we\n// end on a partial character, we simply let v8 handle that.\nfunction utf16End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) {\n    var end = this.lastTotal - this.lastNeed;\n    return r + this.lastChar.toString('utf16le', 0, end);\n  }\n  return r;\n}\n\nfunction base64Text(buf, i) {\n  var n = (buf.length - i) % 3;\n  if (n === 0) return buf.toString('base64', i);\n  this.lastNeed = 3 - n;\n  this.lastTotal = 3;\n  if (n === 1) {\n    this.lastChar[0] = buf[buf.length - 1];\n  } else {\n    this.lastChar[0] = buf[buf.length - 2];\n    this.lastChar[1] = buf[buf.length - 1];\n  }\n  return buf.toString('base64', i, buf.length - n);\n}\n\nfunction base64End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);\n  return r;\n}\n\n// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)\nfunction simpleWrite(buf) {\n  return buf.toString(this.encoding);\n}\n\nfunction simpleEnd(buf) {\n  return buf && buf.length ? this.write(buf) : '';\n}\n},{\"safe-buffer\":20}],22:[function(require,module,exports){\n\"use strict\";\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.BaseProvider = void 0;\nconst safe_event_emitter_1 = __importDefault(require(\"@metamask/safe-event-emitter\"));\nconst eth_rpc_errors_1 = require(\"eth-rpc-errors\");\nconst fast_deep_equal_1 = __importDefault(require(\"fast-deep-equal\"));\nconst json_rpc_engine_1 = require(\"json-rpc-engine\");\nconst messages_1 = __importDefault(require(\"./messages\"));\nconst utils_1 = require(\"./utils\");\n/**\n * An abstract class implementing the EIP-1193 interface. Implementers must:\n *\n * 1. At initialization, push a middleware to the internal `_rpcEngine` that\n *    hands off requests to the server and receives responses in return.\n * 2. At initialization, retrieve initial state and call\n *    {@link BaseProvider._initializeState} **once**.\n * 3. Ensure that the provider's state is synchronized with the wallet.\n * 4. Ensure that notifications are received and emitted as appropriate.\n */\nclass BaseProvider extends safe_event_emitter_1.default {\n    /**\n     * @param options - An options bag\n     * @param options.logger - The logging API to use. Default: console\n     * @param options.maxEventListeners - The maximum number of event\n     * listeners. Default: 100\n     */\n    constructor({ logger = console, maxEventListeners = 100, rpcMiddleware = [], } = {}) {\n        super();\n        this._log = logger;\n        this.setMaxListeners(maxEventListeners);\n        // Private state\n        this._state = Object.assign({}, BaseProvider._defaultState);\n        // Public state\n        this.selectedAddress = null;\n        this.chainId = null;\n        // Bind functions to prevent consumers from making unbound calls\n        this._handleAccountsChanged = this._handleAccountsChanged.bind(this);\n        this._handleConnect = this._handleConnect.bind(this);\n        this._handleChainChanged = this._handleChainChanged.bind(this);\n        this._handleDisconnect = this._handleDisconnect.bind(this);\n        this._handleUnlockStateChanged = this._handleUnlockStateChanged.bind(this);\n        this._rpcRequest = this._rpcRequest.bind(this);\n        this.request = this.request.bind(this);\n        // Handle RPC requests via dapp-side RPC engine.\n        //\n        // ATTN: Implementers must push a middleware that hands off requests to\n        // the server.\n        const rpcEngine = new json_rpc_engine_1.JsonRpcEngine();\n        rpcMiddleware.forEach((middleware) => rpcEngine.push(middleware));\n        this._rpcEngine = rpcEngine;\n    }\n    //====================\n    // Public Methods\n    //====================\n    /**\n     * Returns whether the provider can process RPC requests.\n     */\n    isConnected() {\n        return this._state.isConnected;\n    }\n    /**\n     * Submits an RPC request for the given method, with the given params.\n     * Resolves with the result of the method call, or rejects on error.\n     *\n     * @param args - The RPC request arguments.\n     * @param args.method - The RPC method name.\n     * @param args.params - The parameters for the RPC method.\n     * @returns A Promise that resolves with the result of the RPC method,\n     * or rejects if an error is encountered.\n     */\n    async request(args) {\n        if (!args || typeof args !== 'object' || Array.isArray(args)) {\n            throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({\n                message: messages_1.default.errors.invalidRequestArgs(),\n                data: args,\n            });\n        }\n        const { method, params } = args;\n        if (typeof method !== 'string' || method.length === 0) {\n            throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({\n                message: messages_1.default.errors.invalidRequestMethod(),\n                data: args,\n            });\n        }\n        if (params !== undefined &&\n            !Array.isArray(params) &&\n            (typeof params !== 'object' || params === null)) {\n            throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({\n                message: messages_1.default.errors.invalidRequestParams(),\n                data: args,\n            });\n        }\n        return new Promise((resolve, reject) => {\n            this._rpcRequest({ method, params }, utils_1.getRpcPromiseCallback(resolve, reject));\n        });\n    }\n    //====================\n    // Private Methods\n    //====================\n    /**\n     * **MUST** be called by child classes.\n     *\n     * Sets initial state if provided and marks this provider as initialized.\n     * Throws if called more than once.\n     *\n     * Permits the `networkVersion` field in the parameter object for\n     * compatibility with child classes that use this value.\n     *\n     * @param initialState - The provider's initial state.\n     * @emits BaseProvider#_initialized\n     * @emits BaseProvider#connect - If `initialState` is defined.\n     */\n    _initializeState(initialState) {\n        if (this._state.initialized === true) {\n            throw new Error('Provider already initialized.');\n        }\n        if (initialState) {\n            const { accounts, chainId, isUnlocked, networkVersion } = initialState;\n            // EIP-1193 connect\n            this._handleConnect(chainId);\n            this._handleChainChanged({ chainId, networkVersion });\n            this._handleUnlockStateChanged({ accounts, isUnlocked });\n            this._handleAccountsChanged(accounts);\n        }\n        // Mark provider as initialized regardless of whether initial state was\n        // retrieved.\n        this._state.initialized = true;\n        this.emit('_initialized');\n    }\n    /**\n     * Internal RPC method. Forwards requests to background via the RPC engine.\n     * Also remap ids inbound and outbound.\n     *\n     * @param payload - The RPC request object.\n     * @param callback - The consumer's callback.\n     */\n    _rpcRequest(payload, callback) {\n        let cb = callback;\n        if (!Array.isArray(payload)) {\n            if (!payload.jsonrpc) {\n                payload.jsonrpc = '2.0';\n            }\n            if (payload.method === 'eth_accounts' ||\n                payload.method === 'eth_requestAccounts') {\n                // handle accounts changing\n                cb = (err, res) => {\n                    this._handleAccountsChanged(res.result || [], payload.method === 'eth_accounts');\n                    callback(err, res);\n                };\n            }\n            return this._rpcEngine.handle(payload, cb);\n        }\n        return this._rpcEngine.handle(payload, cb);\n    }\n    /**\n     * When the provider becomes connected, updates internal state and emits\n     * required events. Idempotent.\n     *\n     * @param chainId - The ID of the newly connected chain.\n     * @emits MetaMaskInpageProvider#connect\n     */\n    _handleConnect(chainId) {\n        if (!this._state.isConnected) {\n            this._state.isConnected = true;\n            this.emit('connect', { chainId });\n            this._log.debug(messages_1.default.info.connected(chainId));\n        }\n    }\n    /**\n     * When the provider becomes disconnected, updates internal state and emits\n     * required events. Idempotent with respect to the isRecoverable parameter.\n     *\n     * Error codes per the CloseEvent status codes as required by EIP-1193:\n     * https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes\n     *\n     * @param isRecoverable - Whether the disconnection is recoverable.\n     * @param errorMessage - A custom error message.\n     * @emits BaseProvider#disconnect\n     */\n    _handleDisconnect(isRecoverable, errorMessage) {\n        if (this._state.isConnected ||\n            (!this._state.isPermanentlyDisconnected && !isRecoverable)) {\n            this._state.isConnected = false;\n            let error;\n            if (isRecoverable) {\n                error = new eth_rpc_errors_1.EthereumRpcError(1013, // Try again later\n                errorMessage || messages_1.default.errors.disconnected());\n                this._log.debug(error);\n            }\n            else {\n                error = new eth_rpc_errors_1.EthereumRpcError(1011, // Internal error\n                errorMessage || messages_1.default.errors.permanentlyDisconnected());\n                this._log.error(error);\n                this.chainId = null;\n                this._state.accounts = null;\n                this.selectedAddress = null;\n                this._state.isUnlocked = false;\n                this._state.isPermanentlyDisconnected = true;\n            }\n            this.emit('disconnect', error);\n        }\n    }\n    /**\n     * Upon receipt of a new `chainId`, emits the corresponding event and sets\n     * and sets relevant public state. Does nothing if the given `chainId` is\n     * equivalent to the existing value.\n     *\n     * Permits the `networkVersion` field in the parameter object for\n     * compatibility with child classes that use this value.\n     *\n     * @emits BaseProvider#chainChanged\n     * @param networkInfo - An object with network info.\n     * @param networkInfo.chainId - The latest chain ID.\n     */\n    _handleChainChanged({ chainId, } = {}) {\n        if (!utils_1.isValidChainId(chainId)) {\n            this._log.error(messages_1.default.errors.invalidNetworkParams(), { chainId });\n            return;\n        }\n        this._handleConnect(chainId);\n        if (chainId !== this.chainId) {\n            this.chainId = chainId;\n            if (this._state.initialized) {\n                this.emit('chainChanged', this.chainId);\n            }\n        }\n    }\n    /**\n     * Called when accounts may have changed. Diffs the new accounts value with\n     * the current one, updates all state as necessary, and emits the\n     * accountsChanged event.\n     *\n     * @param accounts - The new accounts value.\n     * @param isEthAccounts - Whether the accounts value was returned by\n     * a call to eth_accounts.\n     */\n    _handleAccountsChanged(accounts, isEthAccounts = false) {\n        let _accounts = accounts;\n        if (!Array.isArray(accounts)) {\n            this._log.error('MetaMask: Received invalid accounts parameter. Please report this bug.', accounts);\n            _accounts = [];\n        }\n        for (const account of accounts) {\n            if (typeof account !== 'string') {\n                this._log.error('MetaMask: Received non-string account. Please report this bug.', accounts);\n                _accounts = [];\n                break;\n            }\n        }\n        // emit accountsChanged if anything about the accounts array has changed\n        if (!fast_deep_equal_1.default(this._state.accounts, _accounts)) {\n            // we should always have the correct accounts even before eth_accounts\n            // returns\n            if (isEthAccounts && this._state.accounts !== null) {\n                this._log.error(`MetaMask: 'eth_accounts' unexpectedly updated accounts. Please report this bug.`, _accounts);\n            }\n            this._state.accounts = _accounts;\n            // handle selectedAddress\n            if (this.selectedAddress !== _accounts[0]) {\n                this.selectedAddress = _accounts[0] || null;\n            }\n            // finally, after all state has been updated, emit the event\n            if (this._state.initialized) {\n                this.emit('accountsChanged', _accounts);\n            }\n        }\n    }\n    /**\n     * Upon receipt of a new isUnlocked state, sets relevant public state.\n     * Calls the accounts changed handler with the received accounts, or an empty\n     * array.\n     *\n     * Does nothing if the received value is equal to the existing value.\n     * There are no lock/unlock events.\n     *\n     * @param opts - Options bag.\n     * @param opts.accounts - The exposed accounts, if any.\n     * @param opts.isUnlocked - The latest isUnlocked value.\n     */\n    _handleUnlockStateChanged({ accounts, isUnlocked, } = {}) {\n        if (typeof isUnlocked !== 'boolean') {\n            this._log.error('MetaMask: Received invalid isUnlocked parameter. Please report this bug.');\n            return;\n        }\n        if (isUnlocked !== this._state.isUnlocked) {\n            this._state.isUnlocked = isUnlocked;\n            this._handleAccountsChanged(accounts || []);\n        }\n    }\n}\nexports.BaseProvider = BaseProvider;\nBaseProvider._defaultState = {\n    accounts: null,\n    isConnected: false,\n    isUnlocked: false,\n    initialized: false,\n    isPermanentlyDisconnected: false,\n};\n\n},{\"./messages\":26,\"./utils\":30,\"@metamask/safe-event-emitter\":35,\"eth-rpc-errors\":45,\"fast-deep-equal\":31,\"json-rpc-engine\":58}],23:[function(require,module,exports){\n\"use strict\";\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.MetaMaskInpageProvider = exports.MetaMaskInpageProviderStreamName = void 0;\nconst eth_rpc_errors_1 = require(\"eth-rpc-errors\");\nconst siteMetadata_1 = require(\"./siteMetadata\");\nconst messages_1 = __importDefault(require(\"./messages\"));\nconst utils_1 = require(\"./utils\");\nconst StreamProvider_1 = require(\"./StreamProvider\");\n/**\n * The name of the stream consumed by {@link MetaMaskInpageProvider}.\n */\nexports.MetaMaskInpageProviderStreamName = 'metamask-provider';\nclass MetaMaskInpageProvider extends StreamProvider_1.AbstractStreamProvider {\n    /**\n     * @param connectionStream - A Node.js duplex stream\n     * @param options - An options bag\n     * @param options.jsonRpcStreamName - The name of the internal JSON-RPC stream.\n     * Default: metamask-provider\n     * @param options.logger - The logging API to use. Default: console\n     * @param options.maxEventListeners - The maximum number of event\n     * listeners. Default: 100\n     * @param options.shouldSendMetadata - Whether the provider should\n     * send page metadata. Default: true\n     */\n    constructor(connectionStream, { jsonRpcStreamName = exports.MetaMaskInpageProviderStreamName, logger = console, maxEventListeners, shouldSendMetadata, } = {}) {\n        super(connectionStream, {\n            jsonRpcStreamName,\n            logger,\n            maxEventListeners,\n            rpcMiddleware: utils_1.getDefaultExternalMiddleware(logger),\n        });\n        this._sentWarnings = {\n            // methods\n            enable: false,\n            experimentalMethods: false,\n            send: false,\n            // events\n            events: {\n                close: false,\n                data: false,\n                networkChanged: false,\n                notification: false,\n            },\n        };\n        // We shouldn't perform asynchronous work in the constructor, but at one\n        // point we started doing so, and changing this class isn't worth it at\n        // the time of writing.\n        this._initializeStateAsync();\n        this.networkVersion = null;\n        this.isMetaMask = true;\n        this._sendSync = this._sendSync.bind(this);\n        this.enable = this.enable.bind(this);\n        this.send = this.send.bind(this);\n        this.sendAsync = this.sendAsync.bind(this);\n        this._warnOfDeprecation = this._warnOfDeprecation.bind(this);\n        this._metamask = this._getExperimentalApi();\n        // handle JSON-RPC notifications\n        this._jsonRpcConnection.events.on('notification', (payload) => {\n            const { method } = payload;\n            if (utils_1.EMITTED_NOTIFICATIONS.includes(method)) {\n                // deprecated\n                // emitted here because that was the original order\n                this.emit('data', payload);\n                // deprecated\n                this.emit('notification', payload.params.result);\n            }\n        });\n        // send website metadata\n        if (shouldSendMetadata) {\n            if (document.readyState === 'complete') {\n                siteMetadata_1.sendSiteMetadata(this._rpcEngine, this._log);\n            }\n            else {\n                const domContentLoadedHandler = () => {\n                    siteMetadata_1.sendSiteMetadata(this._rpcEngine, this._log);\n                    window.removeEventListener('DOMContentLoaded', domContentLoadedHandler);\n                };\n                window.addEventListener('DOMContentLoaded', domContentLoadedHandler);\n            }\n        }\n    }\n    //====================\n    // Public Methods\n    //====================\n    /**\n     * Submits an RPC request per the given JSON-RPC request object.\n     *\n     * @param payload - The RPC request object.\n     * @param callback - The callback function.\n     */\n    sendAsync(payload, callback) {\n        this._rpcRequest(payload, callback);\n    }\n    /**\n     * We override the following event methods so that we can warn consumers\n     * about deprecated events:\n     *   addListener, on, once, prependListener, prependOnceListener\n     */\n    addListener(eventName, listener) {\n        this._warnOfDeprecation(eventName);\n        return super.addListener(eventName, listener);\n    }\n    on(eventName, listener) {\n        this._warnOfDeprecation(eventName);\n        return super.on(eventName, listener);\n    }\n    once(eventName, listener) {\n        this._warnOfDeprecation(eventName);\n        return super.once(eventName, listener);\n    }\n    prependListener(eventName, listener) {\n        this._warnOfDeprecation(eventName);\n        return super.prependListener(eventName, listener);\n    }\n    prependOnceListener(eventName, listener) {\n        this._warnOfDeprecation(eventName);\n        return super.prependOnceListener(eventName, listener);\n    }\n    //====================\n    // Private Methods\n    //====================\n    /**\n     * When the provider becomes disconnected, updates internal state and emits\n     * required events. Idempotent with respect to the isRecoverable parameter.\n     *\n     * Error codes per the CloseEvent status codes as required by EIP-1193:\n     * https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes\n     *\n     * @param isRecoverable - Whether the disconnection is recoverable.\n     * @param errorMessage - A custom error message.\n     * @emits BaseProvider#disconnect\n     */\n    _handleDisconnect(isRecoverable, errorMessage) {\n        super._handleDisconnect(isRecoverable, errorMessage);\n        if (this.networkVersion && !isRecoverable) {\n            this.networkVersion = null;\n        }\n    }\n    /**\n     * Warns of deprecation for the given event, if applicable.\n     */\n    _warnOfDeprecation(eventName) {\n        var _a;\n        if (((_a = this._sentWarnings) === null || _a === void 0 ? void 0 : _a.events[eventName]) === false) {\n            this._log.warn(messages_1.default.warnings.events[eventName]);\n            this._sentWarnings.events[eventName] = true;\n        }\n    }\n    //====================\n    // Deprecated Methods\n    //====================\n    /**\n     * Equivalent to: ethereum.request('eth_requestAccounts')\n     *\n     * @deprecated Use request({ method: 'eth_requestAccounts' }) instead.\n     * @returns A promise that resolves to an array of addresses.\n     */\n    enable() {\n        if (!this._sentWarnings.enable) {\n            this._log.warn(messages_1.default.warnings.enableDeprecation);\n            this._sentWarnings.enable = true;\n        }\n        return new Promise((resolve, reject) => {\n            try {\n                this._rpcRequest({ method: 'eth_requestAccounts', params: [] }, utils_1.getRpcPromiseCallback(resolve, reject));\n            }\n            catch (error) {\n                reject(error);\n            }\n        });\n    }\n    send(methodOrPayload, callbackOrArgs) {\n        if (!this._sentWarnings.send) {\n            this._log.warn(messages_1.default.warnings.sendDeprecation);\n            this._sentWarnings.send = true;\n        }\n        if (typeof methodOrPayload === 'string' &&\n            (!callbackOrArgs || Array.isArray(callbackOrArgs))) {\n            return new Promise((resolve, reject) => {\n                try {\n                    this._rpcRequest({ method: methodOrPayload, params: callbackOrArgs }, utils_1.getRpcPromiseCallback(resolve, reject, false));\n                }\n                catch (error) {\n                    reject(error);\n                }\n            });\n        }\n        else if (methodOrPayload &&\n            typeof methodOrPayload === 'object' &&\n            typeof callbackOrArgs === 'function') {\n            return this._rpcRequest(methodOrPayload, callbackOrArgs);\n        }\n        return this._sendSync(methodOrPayload);\n    }\n    /**\n     * Internal backwards compatibility method, used in send.\n     *\n     * @deprecated\n     */\n    _sendSync(payload) {\n        let result;\n        switch (payload.method) {\n            case 'eth_accounts':\n                result = this.selectedAddress ? [this.selectedAddress] : [];\n                break;\n            case 'eth_coinbase':\n                result = this.selectedAddress || null;\n                break;\n            case 'eth_uninstallFilter':\n                this._rpcRequest(payload, utils_1.NOOP);\n                result = true;\n                break;\n            case 'net_version':\n                result = this.networkVersion || null;\n                break;\n            default:\n                throw new Error(messages_1.default.errors.unsupportedSync(payload.method));\n        }\n        return {\n            id: payload.id,\n            jsonrpc: payload.jsonrpc,\n            result,\n        };\n    }\n    /**\n     * Constructor helper.\n     *\n     * Gets the experimental _metamask API as Proxy, so that we can warn consumers\n     * about its experimental nature.\n     */\n    _getExperimentalApi() {\n        return new Proxy({\n            /**\n             * Determines if MetaMask is unlocked by the user.\n             *\n             * @returns Promise resolving to true if MetaMask is currently unlocked\n             */\n            isUnlocked: async () => {\n                if (!this._state.initialized) {\n                    await new Promise((resolve) => {\n                        this.on('_initialized', () => resolve());\n                    });\n                }\n                return this._state.isUnlocked;\n            },\n            /**\n             * Make a batch RPC request.\n             */\n            requestBatch: async (requests) => {\n                if (!Array.isArray(requests)) {\n                    throw eth_rpc_errors_1.ethErrors.rpc.invalidRequest({\n                        message: 'Batch requests must be made with an array of request objects.',\n                        data: requests,\n                    });\n                }\n                return new Promise((resolve, reject) => {\n                    this._rpcRequest(requests, utils_1.getRpcPromiseCallback(resolve, reject));\n                });\n            },\n        }, {\n            get: (obj, prop, ...args) => {\n                if (!this._sentWarnings.experimentalMethods) {\n                    this._log.warn(messages_1.default.warnings.experimentalMethods);\n                    this._sentWarnings.experimentalMethods = true;\n                }\n                return Reflect.get(obj, prop, ...args);\n            },\n        });\n    }\n    /**\n     * Upon receipt of a new chainId and networkVersion, emits corresponding\n     * events and sets relevant public state. Does nothing if neither the chainId\n     * nor the networkVersion are different from existing values.\n     *\n     * @emits MetamaskInpageProvider#networkChanged\n     * @param networkInfo - An object with network info.\n     * @param networkInfo.chainId - The latest chain ID.\n     * @param networkInfo.networkVersion - The latest network ID.\n     */\n    _handleChainChanged({ chainId, networkVersion, } = {}) {\n        // This will validate the params and disconnect the provider if the\n        // networkVersion is 'loading'.\n        super._handleChainChanged({ chainId, networkVersion });\n        if (this._state.isConnected && networkVersion !== this.networkVersion) {\n            this.networkVersion = networkVersion;\n            if (this._state.initialized) {\n                this.emit('networkChanged', this.networkVersion);\n            }\n        }\n    }\n}\nexports.MetaMaskInpageProvider = MetaMaskInpageProvider;\n\n},{\"./StreamProvider\":24,\"./messages\":26,\"./siteMetadata\":29,\"./utils\":30,\"eth-rpc-errors\":45}],24:[function(require,module,exports){\n\"use strict\";\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.StreamProvider = exports.AbstractStreamProvider = void 0;\nconst object_multiplex_1 = __importDefault(require(\"@metamask/object-multiplex\"));\nconst is_stream_1 = require(\"is-stream\");\nconst json_rpc_middleware_stream_1 = require(\"json-rpc-middleware-stream\");\nconst pump_1 = __importDefault(require(\"pump\"));\nconst messages_1 = __importDefault(require(\"./messages\"));\nconst utils_1 = require(\"./utils\");\nconst BaseProvider_1 = require(\"./BaseProvider\");\n/**\n * An abstract EIP-1193 provider wired to some duplex stream via a\n * `json-rpc-middleware-stream` JSON-RPC stream middleware. Implementers must\n * call {@link AbstractStreamProvider._initializeStateAsync} after instantiation\n * to initialize the provider's state.\n */\nclass AbstractStreamProvider extends BaseProvider_1.BaseProvider {\n    /**\n     * @param connectionStream - A Node.js duplex stream\n     * @param options - An options bag\n     * @param options.jsonRpcStreamName - The name of the internal JSON-RPC stream.\n     * @param options.logger - The logging API to use. Default: console\n     * @param options.maxEventListeners - The maximum number of event\n     * listeners. Default: 100\n     */\n    constructor(connectionStream, { jsonRpcStreamName, logger, maxEventListeners, rpcMiddleware, }) {\n        super({ logger, maxEventListeners, rpcMiddleware });\n        if (!is_stream_1.duplex(connectionStream)) {\n            throw new Error(messages_1.default.errors.invalidDuplexStream());\n        }\n        // Bind functions to prevent consumers from making unbound calls\n        this._handleStreamDisconnect = this._handleStreamDisconnect.bind(this);\n        // Set up connectionStream multiplexing\n        const mux = new object_multiplex_1.default();\n        pump_1.default(connectionStream, mux, connectionStream, this._handleStreamDisconnect.bind(this, 'MetaMask'));\n        // Set up RPC connection\n        this._jsonRpcConnection = json_rpc_middleware_stream_1.createStreamMiddleware({\n            retryOnMessage: 'METAMASK_EXTENSION_STREAM_CONNECT',\n        });\n        pump_1.default(this._jsonRpcConnection.stream, mux.createStream(jsonRpcStreamName), this._jsonRpcConnection.stream, this._handleStreamDisconnect.bind(this, 'MetaMask RpcProvider'));\n        // Wire up the JsonRpcEngine to the JSON-RPC connection stream\n        this._rpcEngine.push(this._jsonRpcConnection.middleware);\n        // Handle JSON-RPC notifications\n        this._jsonRpcConnection.events.on('notification', (payload) => {\n            const { method, params } = payload;\n            if (method === 'metamask_accountsChanged') {\n                this._handleAccountsChanged(params);\n            }\n            else if (method === 'metamask_unlockStateChanged') {\n                this._handleUnlockStateChanged(params);\n            }\n            else if (method === 'metamask_chainChanged') {\n                this._handleChainChanged(params);\n            }\n            else if (utils_1.EMITTED_NOTIFICATIONS.includes(method)) {\n                this.emit('message', {\n                    type: method,\n                    data: params,\n                });\n            }\n            else if (method === 'METAMASK_STREAM_FAILURE') {\n                connectionStream.destroy(new Error(messages_1.default.errors.permanentlyDisconnected()));\n            }\n        });\n    }\n    //====================\n    // Private Methods\n    //====================\n    /**\n     * **MUST** be called by child classes.\n     *\n     * Calls `metamask_getProviderState` and passes the result to\n     * {@link BaseProvider._initializeState}. Logs an error if getting initial state\n     * fails. Throws if called after initialization has completed.\n     */\n    async _initializeStateAsync() {\n        let initialState;\n        try {\n            initialState = (await this.request({\n                method: 'metamask_getProviderState',\n            }));\n        }\n        catch (error) {\n            this._log.error('MetaMask: Failed to get initial state. Please report this bug.', error);\n        }\n        this._initializeState(initialState);\n    }\n    /**\n     * Called when connection is lost to critical streams. Emits an 'error' event\n     * from the provider with the error message and stack if present.\n     *\n     * @emits BaseProvider#disconnect\n     */\n    _handleStreamDisconnect(streamName, error) {\n        let warningMsg = `MetaMask: Lost connection to \"${streamName}\".`;\n        if (error === null || error === void 0 ? void 0 : error.stack) {\n            warningMsg += `\\n${error.stack}`;\n        }\n        this._log.warn(warningMsg);\n        if (this.listenerCount('error') > 0) {\n            this.emit('error', warningMsg);\n        }\n        this._handleDisconnect(false, error ? error.message : undefined);\n    }\n    /**\n     * Upon receipt of a new chainId and networkVersion, emits corresponding\n     * events and sets relevant public state. This class does not have a\n     * `networkVersion` property, but we rely on receiving a `networkVersion`\n     * with the value of `loading` to detect when the network is changing and\n     * a recoverable `disconnect` even has occurred. Child classes that use the\n     * `networkVersion` for other purposes must implement additional handling\n     * therefore.\n     *\n     * @emits BaseProvider#chainChanged\n     * @param networkInfo - An object with network info.\n     * @param networkInfo.chainId - The latest chain ID.\n     * @param networkInfo.networkVersion - The latest network ID.\n     */\n    _handleChainChanged({ chainId, networkVersion, } = {}) {\n        if (!utils_1.isValidChainId(chainId) || !utils_1.isValidNetworkVersion(networkVersion)) {\n            this._log.error(messages_1.default.errors.invalidNetworkParams(), {\n                chainId,\n                networkVersion,\n            });\n            return;\n        }\n        if (networkVersion === 'loading') {\n            this._handleDisconnect(true);\n        }\n        else {\n            super._handleChainChanged({ chainId });\n        }\n    }\n}\nexports.AbstractStreamProvider = AbstractStreamProvider;\n/**\n * An EIP-1193 provider wired to some duplex stream via a\n * `json-rpc-middleware-stream` JSON-RPC stream middleware. Consumers must\n * call {@link StreamProvider.initialize} after instantiation to complete\n * initialization.\n */\nclass StreamProvider extends AbstractStreamProvider {\n    /**\n     * **MUST** be called after instantiation to complete initialization.\n     *\n     * Calls `metamask_getProviderState` and passes the result to\n     * {@link BaseProvider._initializeState}. Logs an error if getting initial state\n     * fails. Throws if called after initialization has completed.\n     */\n    async initialize() {\n        return this._initializeStateAsync();\n    }\n}\nexports.StreamProvider = StreamProvider;\n\n},{\"./BaseProvider\":22,\"./messages\":26,\"./utils\":30,\"@metamask/object-multiplex\":4,\"is-stream\":51,\"json-rpc-middleware-stream\":34,\"pump\":64}],25:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.setGlobalProvider = exports.initializeProvider = void 0;\nconst MetaMaskInpageProvider_1 = require(\"./MetaMaskInpageProvider\");\nconst shimWeb3_1 = require(\"./shimWeb3\");\n/**\n * Initializes a MetaMaskInpageProvider and (optionally) assigns it as window.ethereum.\n *\n * @param options - An options bag.\n * @param options.connectionStream - A Node.js stream.\n * @param options.jsonRpcStreamName - The name of the internal JSON-RPC stream.\n * @param options.maxEventListeners - The maximum number of event listeners.\n * @param options.shouldSendMetadata - Whether the provider should send page metadata.\n * @param options.shouldSetOnWindow - Whether the provider should be set as window.ethereum.\n * @param options.shouldShimWeb3 - Whether a window.web3 shim should be injected.\n * @returns The initialized provider (whether set or not).\n */\nfunction initializeProvider({ connectionStream, jsonRpcStreamName, logger = console, maxEventListeners = 100, shouldSendMetadata = true, shouldSetOnWindow = true, shouldShimWeb3 = false, }) {\n    const provider = new MetaMaskInpageProvider_1.MetaMaskInpageProvider(connectionStream, {\n        jsonRpcStreamName,\n        logger,\n        maxEventListeners,\n        shouldSendMetadata,\n    });\n    const proxiedProvider = new Proxy(provider, {\n        // some common libraries, e.g. web3@1.x, mess with our API\n        deleteProperty: () => true,\n    });\n    if (shouldSetOnWindow) {\n        setGlobalProvider(proxiedProvider);\n    }\n    if (shouldShimWeb3) {\n        shimWeb3_1.shimWeb3(proxiedProvider, logger);\n    }\n    return proxiedProvider;\n}\nexports.initializeProvider = initializeProvider;\n/**\n * Sets the given provider instance as window.ethereum and dispatches the\n * 'ethereum#initialized' event on window.\n *\n * @param providerInstance - The provider instance.\n */\nfunction setGlobalProvider(providerInstance) {\n    window.ethereum = providerInstance;\n    window.dispatchEvent(new Event('ethereum#initialized'));\n}\nexports.setGlobalProvider = setGlobalProvider;\n\n},{\"./MetaMaskInpageProvider\":23,\"./shimWeb3\":28}],26:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst messages = {\n    errors: {\n        disconnected: () => 'MetaMask: Disconnected from chain. Attempting to connect.',\n        permanentlyDisconnected: () => 'MetaMask: Disconnected from MetaMask background. Page reload required.',\n        sendSiteMetadata: () => `MetaMask: Failed to send site metadata. This is an internal error, please report this bug.`,\n        unsupportedSync: (method) => `MetaMask: The MetaMask Ethereum provider does not support synchronous methods like ${method} without a callback parameter.`,\n        invalidDuplexStream: () => 'Must provide a Node.js-style duplex stream.',\n        invalidNetworkParams: () => 'MetaMask: Received invalid network parameters. Please report this bug.',\n        invalidRequestArgs: () => `Expected a single, non-array, object argument.`,\n        invalidRequestMethod: () => `'args.method' must be a non-empty string.`,\n        invalidRequestParams: () => `'args.params' must be an object or array if provided.`,\n        invalidLoggerObject: () => `'args.logger' must be an object if provided.`,\n        invalidLoggerMethod: (method) => `'args.logger' must include required method '${method}'.`,\n    },\n    info: {\n        connected: (chainId) => `MetaMask: Connected to chain with ID \"${chainId}\".`,\n    },\n    warnings: {\n        // deprecated methods\n        enableDeprecation: `MetaMask: 'ethereum.enable()' is deprecated and may be removed in the future. Please use the 'eth_requestAccounts' RPC method instead.\\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1102`,\n        sendDeprecation: `MetaMask: 'ethereum.send(...)' is deprecated and may be removed in the future. Please use 'ethereum.sendAsync(...)' or 'ethereum.request(...)' instead.\\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193`,\n        // deprecated events\n        events: {\n            close: `MetaMask: The event 'close' is deprecated and may be removed in the future. Please use 'disconnect' instead.\\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#disconnect`,\n            data: `MetaMask: The event 'data' is deprecated and will be removed in the future. Use 'message' instead.\\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#message`,\n            networkChanged: `MetaMask: The event 'networkChanged' is deprecated and may be removed in the future. Use 'chainChanged' instead.\\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#chainchanged`,\n            notification: `MetaMask: The event 'notification' is deprecated and may be removed in the future. Use 'message' instead.\\nFor more information, see: https://eips.ethereum.org/EIPS/eip-1193#message`,\n        },\n        rpc: {\n            ethDecryptDeprecation: `MetaMask: The RPC method 'eth_decrypt' is deprecated and may be removed in the future.\\nFor more information, see: https://medium.com/metamask/metamask-api-method-deprecation-2b0564a84686`,\n            ethGetEncryptionPublicKeyDeprecation: `MetaMask: The RPC method 'eth_getEncryptionPublicKey' is deprecated and may be removed in the future.\\nFor more information, see: https://medium.com/metamask/metamask-api-method-deprecation-2b0564a84686`,\n        },\n        // misc\n        experimentalMethods: `MetaMask: 'ethereum._metamask' exposes non-standard, experimental methods. They may be removed or changed without warning.`,\n    },\n};\nexports.default = messages;\n\n},{}],27:[function(require,module,exports){\n\"use strict\";\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createRpcWarningMiddleware = void 0;\nconst messages_1 = __importDefault(require(\"../messages\"));\n/**\n * Create JSON-RPC middleware that logs warnings for deprecated RPC methods.\n *\n * @param log - The logging API to use.\n * @returns The JSON-RPC middleware.\n */\nfunction createRpcWarningMiddleware(log) {\n    const sentWarnings = {\n        ethDecryptDeprecation: false,\n        ethGetEncryptionPublicKeyDeprecation: false,\n    };\n    return (req, _res, next) => {\n        if (sentWarnings.ethDecryptDeprecation === false &&\n            req.method === 'eth_decrypt') {\n            log.warn(messages_1.default.warnings.rpc.ethDecryptDeprecation);\n            sentWarnings.ethDecryptDeprecation = true;\n        }\n        else if (sentWarnings.ethGetEncryptionPublicKeyDeprecation === false &&\n            req.method === 'eth_getEncryptionPublicKey') {\n            log.warn(messages_1.default.warnings.rpc.ethGetEncryptionPublicKeyDeprecation);\n            sentWarnings.ethGetEncryptionPublicKeyDeprecation = true;\n        }\n        next();\n    };\n}\nexports.createRpcWarningMiddleware = createRpcWarningMiddleware;\n\n},{\"../messages\":26}],28:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.shimWeb3 = void 0;\n/**\n * If no existing window.web3 is found, this function injects a web3 \"shim\" to\n * not break dapps that rely on window.web3.currentProvider.\n *\n * @param provider - The provider to set as window.web3.currentProvider.\n * @param log - The logging API to use.\n */\nfunction shimWeb3(provider, log = console) {\n    let loggedCurrentProvider = false;\n    let loggedMissingProperty = false;\n    if (!window.web3) {\n        const SHIM_IDENTIFIER = '__isMetaMaskShim__';\n        let web3Shim = { currentProvider: provider };\n        Object.defineProperty(web3Shim, SHIM_IDENTIFIER, {\n            value: true,\n            enumerable: true,\n            configurable: false,\n            writable: false,\n        });\n        web3Shim = new Proxy(web3Shim, {\n            get: (target, property, ...args) => {\n                if (property === 'currentProvider' && !loggedCurrentProvider) {\n                    loggedCurrentProvider = true;\n                    log.warn('You are accessing the MetaMask window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3');\n                }\n                else if (property !== 'currentProvider' &&\n                    property !== SHIM_IDENTIFIER &&\n                    !loggedMissingProperty) {\n                    loggedMissingProperty = true;\n                    log.error(`MetaMask no longer injects web3. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3`);\n                    provider\n                        .request({ method: 'metamask_logWeb3ShimUsage' })\n                        .catch((error) => {\n                        log.debug('MetaMask: Failed to log web3 shim usage.', error);\n                    });\n                }\n                return Reflect.get(target, property, ...args);\n            },\n            set: (...args) => {\n                log.warn('You are accessing the MetaMask window.web3 shim. This object is deprecated; use window.ethereum instead. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3');\n                return Reflect.set(...args);\n            },\n        });\n        Object.defineProperty(window, 'web3', {\n            value: web3Shim,\n            enumerable: false,\n            configurable: true,\n            writable: true,\n        });\n    }\n}\nexports.shimWeb3 = shimWeb3;\n\n},{}],29:[function(require,module,exports){\n\"use strict\";\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.sendSiteMetadata = void 0;\nconst messages_1 = __importDefault(require(\"./messages\"));\nconst utils_1 = require(\"./utils\");\n/**\n * Sends site metadata over an RPC request.\n *\n * @param engine - The JSON RPC Engine to send metadata over.\n * @param log - The logging API to use.\n */\nasync function sendSiteMetadata(engine, log) {\n    try {\n        const domainMetadata = await getSiteMetadata();\n        // call engine.handle directly to avoid normal RPC request handling\n        engine.handle({\n            jsonrpc: '2.0',\n            id: 1,\n            method: 'metamask_sendDomainMetadata',\n            params: domainMetadata,\n        }, utils_1.NOOP);\n    }\n    catch (error) {\n        log.error({\n            message: messages_1.default.errors.sendSiteMetadata(),\n            originalError: error,\n        });\n    }\n}\nexports.sendSiteMetadata = sendSiteMetadata;\n/**\n * Gets site metadata and returns it\n *\n */\nasync function getSiteMetadata() {\n    return {\n        name: getSiteName(window),\n        icon: await getSiteIcon(window),\n    };\n}\n/**\n * Extracts a name for the site from the DOM\n */\nfunction getSiteName(windowObject) {\n    const { document } = windowObject;\n    const siteName = document.querySelector('head > meta[property=\"og:site_name\"]');\n    if (siteName) {\n        return siteName.content;\n    }\n    const metaTitle = document.querySelector('head > meta[name=\"title\"]');\n    if (metaTitle) {\n        return metaTitle.content;\n    }\n    if (document.title && document.title.length > 0) {\n        return document.title;\n    }\n    return window.location.hostname;\n}\n/**\n * Extracts an icon for the site from the DOM\n * @returns an icon URL\n */\nasync function getSiteIcon(windowObject) {\n    const { document } = windowObject;\n    const icons = document.querySelectorAll('head > link[rel~=\"icon\"]');\n    for (const icon of icons) {\n        if (icon && (await imgExists(icon.href))) {\n            return icon.href;\n        }\n    }\n    return null;\n}\n/**\n * Returns whether the given image URL exists\n * @param url - the url of the image\n * @returns Whether the image exists.\n */\nfunction imgExists(url) {\n    return new Promise((resolve, reject) => {\n        try {\n            const img = document.createElement('img');\n            img.onload = () => resolve(true);\n            img.onerror = () => resolve(false);\n            img.src = url;\n        }\n        catch (e) {\n            reject(e);\n        }\n    });\n}\n\n},{\"./messages\":26,\"./utils\":30}],30:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.NOOP = exports.isValidNetworkVersion = exports.isValidChainId = exports.getRpcPromiseCallback = exports.getDefaultExternalMiddleware = exports.EMITTED_NOTIFICATIONS = void 0;\nconst json_rpc_engine_1 = require(\"json-rpc-engine\");\nconst eth_rpc_errors_1 = require(\"eth-rpc-errors\");\nconst createRpcWarningMiddleware_1 = require(\"./middleware/createRpcWarningMiddleware\");\n// Constants\nexports.EMITTED_NOTIFICATIONS = Object.freeze([\n    'eth_subscription', // per eth-json-rpc-filters/subscriptionManager\n]);\n// Utility functions\n/**\n * Gets the default middleware for external providers, consisting of an ID\n * remapping middleware and an error middleware.\n *\n * @param logger - The logger to use in the error middleware.\n * @returns An array of json-rpc-engine middleware functions.\n */\nconst getDefaultExternalMiddleware = (logger = console) => [\n    json_rpc_engine_1.createIdRemapMiddleware(),\n    createErrorMiddleware(logger),\n    createRpcWarningMiddleware_1.createRpcWarningMiddleware(logger),\n];\nexports.getDefaultExternalMiddleware = getDefaultExternalMiddleware;\n/**\n * json-rpc-engine middleware that logs RPC errors and and validates req.method.\n *\n * @param log - The logging API to use.\n * @returns A json-rpc-engine middleware function.\n */\nfunction createErrorMiddleware(log) {\n    return (req, res, next) => {\n        // json-rpc-engine will terminate the request when it notices this error\n        if (typeof req.method !== 'string' || !req.method) {\n            res.error = eth_rpc_errors_1.ethErrors.rpc.invalidRequest({\n                message: `The request 'method' must be a non-empty string.`,\n                data: req,\n            });\n        }\n        next((done) => {\n            const { error } = res;\n            if (!error) {\n                return done();\n            }\n            log.error(`MetaMask - RPC Error: ${error.message}`, error);\n            return done();\n        });\n    };\n}\n// resolve response.result or response, reject errors\nconst getRpcPromiseCallback = (resolve, reject, unwrapResult = true) => (error, response) => {\n    if (error || response.error) {\n        reject(error || response.error);\n    }\n    else {\n        !unwrapResult || Array.isArray(response)\n            ? resolve(response)\n            : resolve(response.result);\n    }\n};\nexports.getRpcPromiseCallback = getRpcPromiseCallback;\n/**\n * Checks whether the given chain ID is valid, meaning if it is non-empty,\n * '0x'-prefixed string.\n *\n * @param chainId - The chain ID to validate.\n * @returns Whether the given chain ID is valid.\n */\nconst isValidChainId = (chainId) => Boolean(chainId) && typeof chainId === 'string' && chainId.startsWith('0x');\nexports.isValidChainId = isValidChainId;\n/**\n * Checks whether the given network version is valid, meaning if it is non-empty\n * string.\n *\n * @param networkVersion - The network version to validate.\n * @returns Whether the given network version is valid.\n */\nconst isValidNetworkVersion = (networkVersion) => Boolean(networkVersion) && typeof networkVersion === 'string';\nexports.isValidNetworkVersion = isValidNetworkVersion;\nconst NOOP = () => undefined;\nexports.NOOP = NOOP;\n\n},{\"./middleware/createRpcWarningMiddleware\":27,\"eth-rpc-errors\":45,\"json-rpc-engine\":58}],31:[function(require,module,exports){\n'use strict';\n\nvar isArray = Array.isArray;\nvar keyList = Object.keys;\nvar hasProp = Object.prototype.hasOwnProperty;\n\nmodule.exports = function equal(a, b) {\n  if (a === b) return true;\n\n  if (a && b && typeof a == 'object' && typeof b == 'object') {\n    var arrA = isArray(a)\n      , arrB = isArray(b)\n      , i\n      , length\n      , key;\n\n    if (arrA && arrB) {\n      length = a.length;\n      if (length != b.length) return false;\n      for (i = length; i-- !== 0;)\n        if (!equal(a[i], b[i])) return false;\n      return true;\n    }\n\n    if (arrA != arrB) return false;\n\n    var dateA = a instanceof Date\n      , dateB = b instanceof Date;\n    if (dateA != dateB) return false;\n    if (dateA && dateB) return a.getTime() == b.getTime();\n\n    var regexpA = a instanceof RegExp\n      , regexpB = b instanceof RegExp;\n    if (regexpA != regexpB) return false;\n    if (regexpA && regexpB) return a.toString() == b.toString();\n\n    var keys = keyList(a);\n    length = keys.length;\n\n    if (length !== keyList(b).length)\n      return false;\n\n    for (i = length; i-- !== 0;)\n      if (!hasProp.call(b, keys[i])) return false;\n\n    for (i = length; i-- !== 0;) {\n      key = keys[i];\n      if (!equal(a[key], b[key])) return false;\n    }\n\n    return true;\n  }\n\n  return a!==a && b!==b;\n};\n\n},{}],32:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst readable_stream_1 = require(\"readable-stream\");\n/**\n * Takes a JsonRpcEngine and returns a Duplex stream wrapping it.\n *\n * @param opts - Options bag.\n * @param opts.engine - The JsonRpcEngine to wrap in a stream.\n * @returns The stream wrapping the engine.\n */\nfunction createEngineStream(opts) {\n    if (!opts || !opts.engine) {\n        throw new Error('Missing engine parameter!');\n    }\n    const { engine } = opts;\n    const stream = new readable_stream_1.Duplex({ objectMode: true, read: () => undefined, write });\n    // forward notifications\n    if (engine.on) {\n        engine.on('notification', (message) => {\n            stream.push(message);\n        });\n    }\n    return stream;\n    /**\n     * Write a JSON-RPC request to the stream.\n     *\n     * @param req - The JSON-rpc request.\n     * @param _encoding - The stream encoding, not used.\n     * @param cb - The stream write callback.\n     */\n    function write(req, _encoding, cb) {\n        engine.handle(req, (_err, res) => {\n            stream.push(res);\n        });\n        cb();\n    }\n}\nexports.default = createEngineStream;\n\n},{\"readable-stream\":76}],33:[function(require,module,exports){\n\"use strict\";\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst safe_event_emitter_1 = __importDefault(require(\"@metamask/safe-event-emitter\"));\nconst readable_stream_1 = require(\"readable-stream\");\n/**\n * Creates a JsonRpcEngine middleware with an associated Duplex stream and\n * EventEmitter. The middleware, and by extension stream, assume that middleware\n * parameters are properly formatted. No runtime type checking or validation is\n * performed.\n *\n * @param options - Configuration options for middleware.\n * @returns The event emitter, middleware, and stream.\n */\nfunction createStreamMiddleware(options = {}) {\n    const idMap = {}; // TODO: replace with actual Map\n    const stream = new readable_stream_1.Duplex({\n        objectMode: true,\n        read: () => undefined,\n        write: processMessage,\n    });\n    const events = new safe_event_emitter_1.default();\n    const middleware = (req, res, next, end) => {\n        // write req to stream\n        sendToStream(req);\n        // register request on id map\n        idMap[req.id] = { req, res, next, end };\n    };\n    return { events, middleware, stream };\n    /**\n     * Forwards JSON-RPC request to the stream.\n     *\n     * @param req - The JSON-RPC request object.\n     */\n    function sendToStream(req) {\n        // TODO: limiting retries could be implemented here\n        stream.push(req);\n    }\n    /**\n     * Writes a JSON-RPC object to the stream.\n     *\n     * @param res - The JSON-RPC response object.\n     * @param _encoding - The stream encoding, not used.\n     * @param cb - The stream write callback.\n     */\n    function processMessage(res, _encoding, cb) {\n        let err = null;\n        try {\n            const isNotification = !res.id;\n            if (isNotification) {\n                processNotification(res);\n            }\n            else {\n                processResponse(res);\n            }\n        }\n        catch (_err) {\n            err = _err;\n        }\n        // continue processing stream\n        cb(err);\n    }\n    /**\n     * Processes a JSON-RPC response.\n     *\n     * @param res - The response to process.\n     */\n    function processResponse(res) {\n        const context = idMap[res.id];\n        if (!context) {\n            throw new Error(`StreamMiddleware - Unknown response id \"${res.id}\"`);\n        }\n        delete idMap[res.id];\n        // copy whole res onto original res\n        Object.assign(context.res, res);\n        // run callback on empty stack,\n        // prevent internal stream-handler from catching errors\n        setTimeout(context.end);\n    }\n    /**\n     * Processes a JSON-RPC notification.\n     *\n     * @param notif - The notification to process.\n     */\n    function processNotification(notif) {\n        if ((options === null || options === void 0 ? void 0 : options.retryOnMessage) && notif.method === options.retryOnMessage) {\n            retryStuckRequests();\n        }\n        events.emit('notification', notif);\n    }\n    /**\n     * Retry pending requests.\n     */\n    function retryStuckRequests() {\n        Object.values(idMap).forEach(({ req }) => {\n            // TODO: limiting retries could be implemented here\n            sendToStream(req);\n        });\n    }\n}\nexports.default = createStreamMiddleware;\n\n},{\"@metamask/safe-event-emitter\":35,\"readable-stream\":76}],34:[function(require,module,exports){\n\"use strict\";\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createStreamMiddleware = exports.createEngineStream = void 0;\nconst createEngineStream_1 = __importDefault(require(\"./createEngineStream\"));\nexports.createEngineStream = createEngineStream_1.default;\nconst createStreamMiddleware_1 = __importDefault(require(\"./createStreamMiddleware\"));\nexports.createStreamMiddleware = createStreamMiddleware_1.default;\n\n},{\"./createEngineStream\":32,\"./createStreamMiddleware\":33}],35:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst events_1 = require(\"events\");\nfunction safeApply(handler, context, args) {\n    try {\n        Reflect.apply(handler, context, args);\n    }\n    catch (err) {\n        // Throw error after timeout so as not to interrupt the stack\n        setTimeout(() => {\n            throw err;\n        });\n    }\n}\nfunction arrayClone(arr) {\n    const n = arr.length;\n    const copy = new Array(n);\n    for (let i = 0; i < n; i += 1) {\n        copy[i] = arr[i];\n    }\n    return copy;\n}\nclass SafeEventEmitter extends events_1.EventEmitter {\n    emit(type, ...args) {\n        let doError = type === 'error';\n        const events = this._events;\n        if (events !== undefined) {\n            doError = doError && events.error === undefined;\n        }\n        else if (!doError) {\n            return false;\n        }\n        // If there is no 'error' event listener then throw.\n        if (doError) {\n            let er;\n            if (args.length > 0) {\n                [er] = args;\n            }\n            if (er instanceof Error) {\n                // Note: The comments on the `throw` lines are intentional, they show\n                // up in Node's output if this results in an unhandled exception.\n                throw er; // Unhandled 'error' event\n            }\n            // At least give some kind of context to the user\n            const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ''}`);\n            err.context = er;\n            throw err; // Unhandled 'error' event\n        }\n        const handler = events[type];\n        if (handler === undefined) {\n            return false;\n        }\n        if (typeof handler === 'function') {\n            safeApply(handler, this, args);\n        }\n        else {\n            const len = handler.length;\n            const listeners = arrayClone(handler);\n            for (let i = 0; i < len; i += 1) {\n                safeApply(listeners[i], this, args);\n            }\n        }\n        return true;\n    }\n}\nexports.default = SafeEventEmitter;\n\n},{\"events\":39}],36:[function(require,module,exports){\n'use strict'\n\nexports.byteLength = byteLength\nexports.toByteArray = toByteArray\nexports.fromByteArray = fromByteArray\n\nvar lookup = []\nvar revLookup = []\nvar Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array\n\nvar code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'\nfor (var i = 0, len = code.length; i < len; ++i) {\n  lookup[i] = code[i]\n  revLookup[code.charCodeAt(i)] = i\n}\n\n// Support decoding URL-safe base64 strings, as Node.js does.\n// See: https://en.wikipedia.org/wiki/Base64#URL_applications\nrevLookup['-'.charCodeAt(0)] = 62\nrevLookup['_'.charCodeAt(0)] = 63\n\nfunction getLens (b64) {\n  var len = b64.length\n\n  if (len % 4 > 0) {\n    throw new Error('Invalid string. Length must be a multiple of 4')\n  }\n\n  // Trim off extra bytes after placeholder bytes are found\n  // See: https://github.com/beatgammit/base64-js/issues/42\n  var validLen = b64.indexOf('=')\n  if (validLen === -1) validLen = len\n\n  var placeHoldersLen = validLen === len\n    ? 0\n    : 4 - (validLen % 4)\n\n  return [validLen, placeHoldersLen]\n}\n\n// base64 is 4/3 + up to two characters of the original data\nfunction byteLength (b64) {\n  var lens = getLens(b64)\n  var validLen = lens[0]\n  var placeHoldersLen = lens[1]\n  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen\n}\n\nfunction _byteLength (b64, validLen, placeHoldersLen) {\n  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen\n}\n\nfunction toByteArray (b64) {\n  var tmp\n  var lens = getLens(b64)\n  var validLen = lens[0]\n  var placeHoldersLen = lens[1]\n\n  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))\n\n  var curByte = 0\n\n  // if there are placeholders, only get up to the last complete 4 chars\n  var len = placeHoldersLen > 0\n    ? validLen - 4\n    : validLen\n\n  var i\n  for (i = 0; i < len; i += 4) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 18) |\n      (revLookup[b64.charCodeAt(i + 1)] << 12) |\n      (revLookup[b64.charCodeAt(i + 2)] << 6) |\n      revLookup[b64.charCodeAt(i + 3)]\n    arr[curByte++] = (tmp >> 16) & 0xFF\n    arr[curByte++] = (tmp >> 8) & 0xFF\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  if (placeHoldersLen === 2) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 2) |\n      (revLookup[b64.charCodeAt(i + 1)] >> 4)\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  if (placeHoldersLen === 1) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 10) |\n      (revLookup[b64.charCodeAt(i + 1)] << 4) |\n      (revLookup[b64.charCodeAt(i + 2)] >> 2)\n    arr[curByte++] = (tmp >> 8) & 0xFF\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  return arr\n}\n\nfunction tripletToBase64 (num) {\n  return lookup[num >> 18 & 0x3F] +\n    lookup[num >> 12 & 0x3F] +\n    lookup[num >> 6 & 0x3F] +\n    lookup[num & 0x3F]\n}\n\nfunction encodeChunk (uint8, start, end) {\n  var tmp\n  var output = []\n  for (var i = start; i < end; i += 3) {\n    tmp =\n      ((uint8[i] << 16) & 0xFF0000) +\n      ((uint8[i + 1] << 8) & 0xFF00) +\n      (uint8[i + 2] & 0xFF)\n    output.push(tripletToBase64(tmp))\n  }\n  return output.join('')\n}\n\nfunction fromByteArray (uint8) {\n  var tmp\n  var len = uint8.length\n  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes\n  var parts = []\n  var maxChunkLength = 16383 // must be multiple of 3\n\n  // go through the array every three bytes, we'll deal with trailing stuff later\n  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {\n    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))\n  }\n\n  // pad the end with zeros, but make sure to not forget the extra bytes\n  if (extraBytes === 1) {\n    tmp = uint8[len - 1]\n    parts.push(\n      lookup[tmp >> 2] +\n      lookup[(tmp << 4) & 0x3F] +\n      '=='\n    )\n  } else if (extraBytes === 2) {\n    tmp = (uint8[len - 2] << 8) + uint8[len - 1]\n    parts.push(\n      lookup[tmp >> 10] +\n      lookup[(tmp >> 4) & 0x3F] +\n      lookup[(tmp << 2) & 0x3F] +\n      '='\n    )\n  }\n\n  return parts.join('')\n}\n\n},{}],37:[function(require,module,exports){\n\n},{}],38:[function(require,module,exports){\n/*!\n * The buffer module from node.js, for the browser.\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n/* eslint-disable no-proto */\n\n'use strict'\n\nvar base64 = require('base64-js')\nvar ieee754 = require('ieee754')\n\nexports.Buffer = Buffer\nexports.SlowBuffer = SlowBuffer\nexports.INSPECT_MAX_BYTES = 50\n\nvar K_MAX_LENGTH = 0x7fffffff\nexports.kMaxLength = K_MAX_LENGTH\n\n/**\n * If `Buffer.TYPED_ARRAY_SUPPORT`:\n *   === true    Use Uint8Array implementation (fastest)\n *   === false   Print warning and recommend using `buffer` v4.x which has an Object\n *               implementation (most compatible, even IE6)\n *\n * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,\n * Opera 11.6+, iOS 4.2+.\n *\n * We report that the browser does not support typed arrays if the are not subclassable\n * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`\n * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support\n * for __proto__ and has a buggy typed array implementation.\n */\nBuffer.TYPED_ARRAY_SUPPORT = typedArraySupport()\n\nif (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&\n    typeof console.error === 'function') {\n  console.error(\n    'This browser lacks typed array (Uint8Array) support which is required by ' +\n    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'\n  )\n}\n\nfunction typedArraySupport () {\n  // Can typed array instances can be augmented?\n  try {\n    var arr = new Uint8Array(1)\n    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }\n    return arr.foo() === 42\n  } catch (e) {\n    return false\n  }\n}\n\nObject.defineProperty(Buffer.prototype, 'parent', {\n  enumerable: true,\n  get: function () {\n    if (!Buffer.isBuffer(this)) return undefined\n    return this.buffer\n  }\n})\n\nObject.defineProperty(Buffer.prototype, 'offset', {\n  enumerable: true,\n  get: function () {\n    if (!Buffer.isBuffer(this)) return undefined\n    return this.byteOffset\n  }\n})\n\nfunction createBuffer (length) {\n  if (length > K_MAX_LENGTH) {\n    throw new RangeError('The value \"' + length + '\" is invalid for option \"size\"')\n  }\n  // Return an augmented `Uint8Array` instance\n  var buf = new Uint8Array(length)\n  buf.__proto__ = Buffer.prototype\n  return buf\n}\n\n/**\n * The Buffer constructor returns instances of `Uint8Array` that have their\n * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of\n * `Uint8Array`, so the returned instances will have all the node `Buffer` methods\n * and the `Uint8Array` methods. Square bracket notation works as expected -- it\n * returns a single octet.\n *\n * The `Uint8Array` prototype remains unmodified.\n */\n\nfunction Buffer (arg, encodingOrOffset, length) {\n  // Common case.\n  if (typeof arg === 'number') {\n    if (typeof encodingOrOffset === 'string') {\n      throw new TypeError(\n        'The \"string\" argument must be of type string. Received type number'\n      )\n    }\n    return allocUnsafe(arg)\n  }\n  return from(arg, encodingOrOffset, length)\n}\n\n// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97\nif (typeof Symbol !== 'undefined' && Symbol.species != null &&\n    Buffer[Symbol.species] === Buffer) {\n  Object.defineProperty(Buffer, Symbol.species, {\n    value: null,\n    configurable: true,\n    enumerable: false,\n    writable: false\n  })\n}\n\nBuffer.poolSize = 8192 // not used by this implementation\n\nfunction from (value, encodingOrOffset, length) {\n  if (typeof value === 'string') {\n    return fromString(value, encodingOrOffset)\n  }\n\n  if (ArrayBuffer.isView(value)) {\n    return fromArrayLike(value)\n  }\n\n  if (value == null) {\n    throw TypeError(\n      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +\n      'or Array-like Object. Received type ' + (typeof value)\n    )\n  }\n\n  if (isInstance(value, ArrayBuffer) ||\n      (value && isInstance(value.buffer, ArrayBuffer))) {\n    return fromArrayBuffer(value, encodingOrOffset, length)\n  }\n\n  if (typeof value === 'number') {\n    throw new TypeError(\n      'The \"value\" argument must not be of type number. Received type number'\n    )\n  }\n\n  var valueOf = value.valueOf && value.valueOf()\n  if (valueOf != null && valueOf !== value) {\n    return Buffer.from(valueOf, encodingOrOffset, length)\n  }\n\n  var b = fromObject(value)\n  if (b) return b\n\n  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&\n      typeof value[Symbol.toPrimitive] === 'function') {\n    return Buffer.from(\n      value[Symbol.toPrimitive]('string'), encodingOrOffset, length\n    )\n  }\n\n  throw new TypeError(\n    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +\n    'or Array-like Object. Received type ' + (typeof value)\n  )\n}\n\n/**\n * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError\n * if value is a number.\n * Buffer.from(str[, encoding])\n * Buffer.from(array)\n * Buffer.from(buffer)\n * Buffer.from(arrayBuffer[, byteOffset[, length]])\n **/\nBuffer.from = function (value, encodingOrOffset, length) {\n  return from(value, encodingOrOffset, length)\n}\n\n// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:\n// https://github.com/feross/buffer/pull/148\nBuffer.prototype.__proto__ = Uint8Array.prototype\nBuffer.__proto__ = Uint8Array\n\nfunction assertSize (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('\"size\" argument must be of type number')\n  } else if (size < 0) {\n    throw new RangeError('The value \"' + size + '\" is invalid for option \"size\"')\n  }\n}\n\nfunction alloc (size, fill, encoding) {\n  assertSize(size)\n  if (size <= 0) {\n    return createBuffer(size)\n  }\n  if (fill !== undefined) {\n    // Only pay attention to encoding if it's a string. This\n    // prevents accidentally sending in a number that would\n    // be interpretted as a start offset.\n    return typeof encoding === 'string'\n      ? createBuffer(size).fill(fill, encoding)\n      : createBuffer(size).fill(fill)\n  }\n  return createBuffer(size)\n}\n\n/**\n * Creates a new filled Buffer instance.\n * alloc(size[, fill[, encoding]])\n **/\nBuffer.alloc = function (size, fill, encoding) {\n  return alloc(size, fill, encoding)\n}\n\nfunction allocUnsafe (size) {\n  assertSize(size)\n  return createBuffer(size < 0 ? 0 : checked(size) | 0)\n}\n\n/**\n * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.\n * */\nBuffer.allocUnsafe = function (size) {\n  return allocUnsafe(size)\n}\n/**\n * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.\n */\nBuffer.allocUnsafeSlow = function (size) {\n  return allocUnsafe(size)\n}\n\nfunction fromString (string, encoding) {\n  if (typeof encoding !== 'string' || encoding === '') {\n    encoding = 'utf8'\n  }\n\n  if (!Buffer.isEncoding(encoding)) {\n    throw new TypeError('Unknown encoding: ' + encoding)\n  }\n\n  var length = byteLength(string, encoding) | 0\n  var buf = createBuffer(length)\n\n  var actual = buf.write(string, encoding)\n\n  if (actual !== length) {\n    // Writing a hex string, for example, that contains invalid characters will\n    // cause everything after the first invalid character to be ignored. (e.g.\n    // 'abxxcd' will be treated as 'ab')\n    buf = buf.slice(0, actual)\n  }\n\n  return buf\n}\n\nfunction fromArrayLike (array) {\n  var length = array.length < 0 ? 0 : checked(array.length) | 0\n  var buf = createBuffer(length)\n  for (var i = 0; i < length; i += 1) {\n    buf[i] = array[i] & 255\n  }\n  return buf\n}\n\nfunction fromArrayBuffer (array, byteOffset, length) {\n  if (byteOffset < 0 || array.byteLength < byteOffset) {\n    throw new RangeError('\"offset\" is outside of buffer bounds')\n  }\n\n  if (array.byteLength < byteOffset + (length || 0)) {\n    throw new RangeError('\"length\" is outside of buffer bounds')\n  }\n\n  var buf\n  if (byteOffset === undefined && length === undefined) {\n    buf = new Uint8Array(array)\n  } else if (length === undefined) {\n    buf = new Uint8Array(array, byteOffset)\n  } else {\n    buf = new Uint8Array(array, byteOffset, length)\n  }\n\n  // Return an augmented `Uint8Array` instance\n  buf.__proto__ = Buffer.prototype\n  return buf\n}\n\nfunction fromObject (obj) {\n  if (Buffer.isBuffer(obj)) {\n    var len = checked(obj.length) | 0\n    var buf = createBuffer(len)\n\n    if (buf.length === 0) {\n      return buf\n    }\n\n    obj.copy(buf, 0, 0, len)\n    return buf\n  }\n\n  if (obj.length !== undefined) {\n    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {\n      return createBuffer(0)\n    }\n    return fromArrayLike(obj)\n  }\n\n  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {\n    return fromArrayLike(obj.data)\n  }\n}\n\nfunction checked (length) {\n  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when\n  // length is NaN (which is otherwise coerced to zero.)\n  if (length >= K_MAX_LENGTH) {\n    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +\n                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')\n  }\n  return length | 0\n}\n\nfunction SlowBuffer (length) {\n  if (+length != length) { // eslint-disable-line eqeqeq\n    length = 0\n  }\n  return Buffer.alloc(+length)\n}\n\nBuffer.isBuffer = function isBuffer (b) {\n  return b != null && b._isBuffer === true &&\n    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false\n}\n\nBuffer.compare = function compare (a, b) {\n  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)\n  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)\n  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {\n    throw new TypeError(\n      'The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array'\n    )\n  }\n\n  if (a === b) return 0\n\n  var x = a.length\n  var y = b.length\n\n  for (var i = 0, len = Math.min(x, y); i < len; ++i) {\n    if (a[i] !== b[i]) {\n      x = a[i]\n      y = b[i]\n      break\n    }\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\nBuffer.isEncoding = function isEncoding (encoding) {\n  switch (String(encoding).toLowerCase()) {\n    case 'hex':\n    case 'utf8':\n    case 'utf-8':\n    case 'ascii':\n    case 'latin1':\n    case 'binary':\n    case 'base64':\n    case 'ucs2':\n    case 'ucs-2':\n    case 'utf16le':\n    case 'utf-16le':\n      return true\n    default:\n      return false\n  }\n}\n\nBuffer.concat = function concat (list, length) {\n  if (!Array.isArray(list)) {\n    throw new TypeError('\"list\" argument must be an Array of Buffers')\n  }\n\n  if (list.length === 0) {\n    return Buffer.alloc(0)\n  }\n\n  var i\n  if (length === undefined) {\n    length = 0\n    for (i = 0; i < list.length; ++i) {\n      length += list[i].length\n    }\n  }\n\n  var buffer = Buffer.allocUnsafe(length)\n  var pos = 0\n  for (i = 0; i < list.length; ++i) {\n    var buf = list[i]\n    if (isInstance(buf, Uint8Array)) {\n      buf = Buffer.from(buf)\n    }\n    if (!Buffer.isBuffer(buf)) {\n      throw new TypeError('\"list\" argument must be an Array of Buffers')\n    }\n    buf.copy(buffer, pos)\n    pos += buf.length\n  }\n  return buffer\n}\n\nfunction byteLength (string, encoding) {\n  if (Buffer.isBuffer(string)) {\n    return string.length\n  }\n  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {\n    return string.byteLength\n  }\n  if (typeof string !== 'string') {\n    throw new TypeError(\n      'The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. ' +\n      'Received type ' + typeof string\n    )\n  }\n\n  var len = string.length\n  var mustMatch = (arguments.length > 2 && arguments[2] === true)\n  if (!mustMatch && len === 0) return 0\n\n  // Use a for loop to avoid recursion\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'ascii':\n      case 'latin1':\n      case 'binary':\n        return len\n      case 'utf8':\n      case 'utf-8':\n        return utf8ToBytes(string).length\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return len * 2\n      case 'hex':\n        return len >>> 1\n      case 'base64':\n        return base64ToBytes(string).length\n      default:\n        if (loweredCase) {\n          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8\n        }\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\nBuffer.byteLength = byteLength\n\nfunction slowToString (encoding, start, end) {\n  var loweredCase = false\n\n  // No need to verify that \"this.length <= MAX_UINT32\" since it's a read-only\n  // property of a typed array.\n\n  // This behaves neither like String nor Uint8Array in that we set start/end\n  // to their upper/lower bounds if the value passed is out of range.\n  // undefined is handled specially as per ECMA-262 6th Edition,\n  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.\n  if (start === undefined || start < 0) {\n    start = 0\n  }\n  // Return early if start > this.length. Done here to prevent potential uint32\n  // coercion fail below.\n  if (start > this.length) {\n    return ''\n  }\n\n  if (end === undefined || end > this.length) {\n    end = this.length\n  }\n\n  if (end <= 0) {\n    return ''\n  }\n\n  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.\n  end >>>= 0\n  start >>>= 0\n\n  if (end <= start) {\n    return ''\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  while (true) {\n    switch (encoding) {\n      case 'hex':\n        return hexSlice(this, start, end)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Slice(this, start, end)\n\n      case 'ascii':\n        return asciiSlice(this, start, end)\n\n      case 'latin1':\n      case 'binary':\n        return latin1Slice(this, start, end)\n\n      case 'base64':\n        return base64Slice(this, start, end)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return utf16leSlice(this, start, end)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = (encoding + '').toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\n// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)\n// to detect a Buffer instance. It's not possible to use `instanceof Buffer`\n// reliably in a browserify context because there could be multiple different\n// copies of the 'buffer' package in use. This method works even for Buffer\n// instances that were created from another copy of the `buffer` package.\n// See: https://github.com/feross/buffer/issues/154\nBuffer.prototype._isBuffer = true\n\nfunction swap (b, n, m) {\n  var i = b[n]\n  b[n] = b[m]\n  b[m] = i\n}\n\nBuffer.prototype.swap16 = function swap16 () {\n  var len = this.length\n  if (len % 2 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 16-bits')\n  }\n  for (var i = 0; i < len; i += 2) {\n    swap(this, i, i + 1)\n  }\n  return this\n}\n\nBuffer.prototype.swap32 = function swap32 () {\n  var len = this.length\n  if (len % 4 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 32-bits')\n  }\n  for (var i = 0; i < len; i += 4) {\n    swap(this, i, i + 3)\n    swap(this, i + 1, i + 2)\n  }\n  return this\n}\n\nBuffer.prototype.swap64 = function swap64 () {\n  var len = this.length\n  if (len % 8 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 64-bits')\n  }\n  for (var i = 0; i < len; i += 8) {\n    swap(this, i, i + 7)\n    swap(this, i + 1, i + 6)\n    swap(this, i + 2, i + 5)\n    swap(this, i + 3, i + 4)\n  }\n  return this\n}\n\nBuffer.prototype.toString = function toString () {\n  var length = this.length\n  if (length === 0) return ''\n  if (arguments.length === 0) return utf8Slice(this, 0, length)\n  return slowToString.apply(this, arguments)\n}\n\nBuffer.prototype.toLocaleString = Buffer.prototype.toString\n\nBuffer.prototype.equals = function equals (b) {\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\n  if (this === b) return true\n  return Buffer.compare(this, b) === 0\n}\n\nBuffer.prototype.inspect = function inspect () {\n  var str = ''\n  var max = exports.INSPECT_MAX_BYTES\n  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()\n  if (this.length > max) str += ' ... '\n  return '<Buffer ' + str + '>'\n}\n\nBuffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {\n  if (isInstance(target, Uint8Array)) {\n    target = Buffer.from(target, target.offset, target.byteLength)\n  }\n  if (!Buffer.isBuffer(target)) {\n    throw new TypeError(\n      'The \"target\" argument must be one of type Buffer or Uint8Array. ' +\n      'Received type ' + (typeof target)\n    )\n  }\n\n  if (start === undefined) {\n    start = 0\n  }\n  if (end === undefined) {\n    end = target ? target.length : 0\n  }\n  if (thisStart === undefined) {\n    thisStart = 0\n  }\n  if (thisEnd === undefined) {\n    thisEnd = this.length\n  }\n\n  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {\n    throw new RangeError('out of range index')\n  }\n\n  if (thisStart >= thisEnd && start >= end) {\n    return 0\n  }\n  if (thisStart >= thisEnd) {\n    return -1\n  }\n  if (start >= end) {\n    return 1\n  }\n\n  start >>>= 0\n  end >>>= 0\n  thisStart >>>= 0\n  thisEnd >>>= 0\n\n  if (this === target) return 0\n\n  var x = thisEnd - thisStart\n  var y = end - start\n  var len = Math.min(x, y)\n\n  var thisCopy = this.slice(thisStart, thisEnd)\n  var targetCopy = target.slice(start, end)\n\n  for (var i = 0; i < len; ++i) {\n    if (thisCopy[i] !== targetCopy[i]) {\n      x = thisCopy[i]\n      y = targetCopy[i]\n      break\n    }\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\n// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,\n// OR the last index of `val` in `buffer` at offset <= `byteOffset`.\n//\n// Arguments:\n// - buffer - a Buffer to search\n// - val - a string, Buffer, or number\n// - byteOffset - an index into `buffer`; will be clamped to an int32\n// - encoding - an optional encoding, relevant is val is a string\n// - dir - true for indexOf, false for lastIndexOf\nfunction bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {\n  // Empty buffer means no match\n  if (buffer.length === 0) return -1\n\n  // Normalize byteOffset\n  if (typeof byteOffset === 'string') {\n    encoding = byteOffset\n    byteOffset = 0\n  } else if (byteOffset > 0x7fffffff) {\n    byteOffset = 0x7fffffff\n  } else if (byteOffset < -0x80000000) {\n    byteOffset = -0x80000000\n  }\n  byteOffset = +byteOffset // Coerce to Number.\n  if (numberIsNaN(byteOffset)) {\n    // byteOffset: it it's undefined, null, NaN, \"foo\", etc, search whole buffer\n    byteOffset = dir ? 0 : (buffer.length - 1)\n  }\n\n  // Normalize byteOffset: negative offsets start from the end of the buffer\n  if (byteOffset < 0) byteOffset = buffer.length + byteOffset\n  if (byteOffset >= buffer.length) {\n    if (dir) return -1\n    else byteOffset = buffer.length - 1\n  } else if (byteOffset < 0) {\n    if (dir) byteOffset = 0\n    else return -1\n  }\n\n  // Normalize val\n  if (typeof val === 'string') {\n    val = Buffer.from(val, encoding)\n  }\n\n  // Finally, search either indexOf (if dir is true) or lastIndexOf\n  if (Buffer.isBuffer(val)) {\n    // Special case: looking for empty string/buffer always fails\n    if (val.length === 0) {\n      return -1\n    }\n    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)\n  } else if (typeof val === 'number') {\n    val = val & 0xFF // Search for a byte value [0-255]\n    if (typeof Uint8Array.prototype.indexOf === 'function') {\n      if (dir) {\n        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)\n      } else {\n        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)\n      }\n    }\n    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)\n  }\n\n  throw new TypeError('val must be string, number or Buffer')\n}\n\nfunction arrayIndexOf (arr, val, byteOffset, encoding, dir) {\n  var indexSize = 1\n  var arrLength = arr.length\n  var valLength = val.length\n\n  if (encoding !== undefined) {\n    encoding = String(encoding).toLowerCase()\n    if (encoding === 'ucs2' || encoding === 'ucs-2' ||\n        encoding === 'utf16le' || encoding === 'utf-16le') {\n      if (arr.length < 2 || val.length < 2) {\n        return -1\n      }\n      indexSize = 2\n      arrLength /= 2\n      valLength /= 2\n      byteOffset /= 2\n    }\n  }\n\n  function read (buf, i) {\n    if (indexSize === 1) {\n      return buf[i]\n    } else {\n      return buf.readUInt16BE(i * indexSize)\n    }\n  }\n\n  var i\n  if (dir) {\n    var foundIndex = -1\n    for (i = byteOffset; i < arrLength; i++) {\n      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {\n        if (foundIndex === -1) foundIndex = i\n        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize\n      } else {\n        if (foundIndex !== -1) i -= i - foundIndex\n        foundIndex = -1\n      }\n    }\n  } else {\n    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength\n    for (i = byteOffset; i >= 0; i--) {\n      var found = true\n      for (var j = 0; j < valLength; j++) {\n        if (read(arr, i + j) !== read(val, j)) {\n          found = false\n          break\n        }\n      }\n      if (found) return i\n    }\n  }\n\n  return -1\n}\n\nBuffer.prototype.includes = function includes (val, byteOffset, encoding) {\n  return this.indexOf(val, byteOffset, encoding) !== -1\n}\n\nBuffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)\n}\n\nBuffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)\n}\n\nfunction hexWrite (buf, string, offset, length) {\n  offset = Number(offset) || 0\n  var remaining = buf.length - offset\n  if (!length) {\n    length = remaining\n  } else {\n    length = Number(length)\n    if (length > remaining) {\n      length = remaining\n    }\n  }\n\n  var strLen = string.length\n\n  if (length > strLen / 2) {\n    length = strLen / 2\n  }\n  for (var i = 0; i < length; ++i) {\n    var parsed = parseInt(string.substr(i * 2, 2), 16)\n    if (numberIsNaN(parsed)) return i\n    buf[offset + i] = parsed\n  }\n  return i\n}\n\nfunction utf8Write (buf, string, offset, length) {\n  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nfunction asciiWrite (buf, string, offset, length) {\n  return blitBuffer(asciiToBytes(string), buf, offset, length)\n}\n\nfunction latin1Write (buf, string, offset, length) {\n  return asciiWrite(buf, string, offset, length)\n}\n\nfunction base64Write (buf, string, offset, length) {\n  return blitBuffer(base64ToBytes(string), buf, offset, length)\n}\n\nfunction ucs2Write (buf, string, offset, length) {\n  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nBuffer.prototype.write = function write (string, offset, length, encoding) {\n  // Buffer#write(string)\n  if (offset === undefined) {\n    encoding = 'utf8'\n    length = this.length\n    offset = 0\n  // Buffer#write(string, encoding)\n  } else if (length === undefined && typeof offset === 'string') {\n    encoding = offset\n    length = this.length\n    offset = 0\n  // Buffer#write(string, offset[, length][, encoding])\n  } else if (isFinite(offset)) {\n    offset = offset >>> 0\n    if (isFinite(length)) {\n      length = length >>> 0\n      if (encoding === undefined) encoding = 'utf8'\n    } else {\n      encoding = length\n      length = undefined\n    }\n  } else {\n    throw new Error(\n      'Buffer.write(string, encoding, offset[, length]) is no longer supported'\n    )\n  }\n\n  var remaining = this.length - offset\n  if (length === undefined || length > remaining) length = remaining\n\n  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {\n    throw new RangeError('Attempt to write outside buffer bounds')\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'hex':\n        return hexWrite(this, string, offset, length)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Write(this, string, offset, length)\n\n      case 'ascii':\n        return asciiWrite(this, string, offset, length)\n\n      case 'latin1':\n      case 'binary':\n        return latin1Write(this, string, offset, length)\n\n      case 'base64':\n        // Warning: maxLength not taken into account in base64Write\n        return base64Write(this, string, offset, length)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return ucs2Write(this, string, offset, length)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\nBuffer.prototype.toJSON = function toJSON () {\n  return {\n    type: 'Buffer',\n    data: Array.prototype.slice.call(this._arr || this, 0)\n  }\n}\n\nfunction base64Slice (buf, start, end) {\n  if (start === 0 && end === buf.length) {\n    return base64.fromByteArray(buf)\n  } else {\n    return base64.fromByteArray(buf.slice(start, end))\n  }\n}\n\nfunction utf8Slice (buf, start, end) {\n  end = Math.min(buf.length, end)\n  var res = []\n\n  var i = start\n  while (i < end) {\n    var firstByte = buf[i]\n    var codePoint = null\n    var bytesPerSequence = (firstByte > 0xEF) ? 4\n      : (firstByte > 0xDF) ? 3\n        : (firstByte > 0xBF) ? 2\n          : 1\n\n    if (i + bytesPerSequence <= end) {\n      var secondByte, thirdByte, fourthByte, tempCodePoint\n\n      switch (bytesPerSequence) {\n        case 1:\n          if (firstByte < 0x80) {\n            codePoint = firstByte\n          }\n          break\n        case 2:\n          secondByte = buf[i + 1]\n          if ((secondByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)\n            if (tempCodePoint > 0x7F) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 3:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)\n            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 4:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          fourthByte = buf[i + 3]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)\n            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {\n              codePoint = tempCodePoint\n            }\n          }\n      }\n    }\n\n    if (codePoint === null) {\n      // we did not generate a valid codePoint so insert a\n      // replacement char (U+FFFD) and advance only 1 byte\n      codePoint = 0xFFFD\n      bytesPerSequence = 1\n    } else if (codePoint > 0xFFFF) {\n      // encode to utf16 (surrogate pair dance)\n      codePoint -= 0x10000\n      res.push(codePoint >>> 10 & 0x3FF | 0xD800)\n      codePoint = 0xDC00 | codePoint & 0x3FF\n    }\n\n    res.push(codePoint)\n    i += bytesPerSequence\n  }\n\n  return decodeCodePointsArray(res)\n}\n\n// Based on http://stackoverflow.com/a/22747272/680742, the browser with\n// the lowest limit is Chrome, with 0x10000 args.\n// We go 1 magnitude less, for safety\nvar MAX_ARGUMENTS_LENGTH = 0x1000\n\nfunction decodeCodePointsArray (codePoints) {\n  var len = codePoints.length\n  if (len <= MAX_ARGUMENTS_LENGTH) {\n    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()\n  }\n\n  // Decode in chunks to avoid \"call stack size exceeded\".\n  var res = ''\n  var i = 0\n  while (i < len) {\n    res += String.fromCharCode.apply(\n      String,\n      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)\n    )\n  }\n  return res\n}\n\nfunction asciiSlice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; ++i) {\n    ret += String.fromCharCode(buf[i] & 0x7F)\n  }\n  return ret\n}\n\nfunction latin1Slice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; ++i) {\n    ret += String.fromCharCode(buf[i])\n  }\n  return ret\n}\n\nfunction hexSlice (buf, start, end) {\n  var len = buf.length\n\n  if (!start || start < 0) start = 0\n  if (!end || end < 0 || end > len) end = len\n\n  var out = ''\n  for (var i = start; i < end; ++i) {\n    out += toHex(buf[i])\n  }\n  return out\n}\n\nfunction utf16leSlice (buf, start, end) {\n  var bytes = buf.slice(start, end)\n  var res = ''\n  for (var i = 0; i < bytes.length; i += 2) {\n    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))\n  }\n  return res\n}\n\nBuffer.prototype.slice = function slice (start, end) {\n  var len = this.length\n  start = ~~start\n  end = end === undefined ? len : ~~end\n\n  if (start < 0) {\n    start += len\n    if (start < 0) start = 0\n  } else if (start > len) {\n    start = len\n  }\n\n  if (end < 0) {\n    end += len\n    if (end < 0) end = 0\n  } else if (end > len) {\n    end = len\n  }\n\n  if (end < start) end = start\n\n  var newBuf = this.subarray(start, end)\n  // Return an augmented `Uint8Array` instance\n  newBuf.__proto__ = Buffer.prototype\n  return newBuf\n}\n\n/*\n * Need to make sure that buffer isn't trying to write out of bounds.\n */\nfunction checkOffset (offset, ext, length) {\n  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')\n  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')\n}\n\nBuffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) {\n    checkOffset(offset, byteLength, this.length)\n  }\n\n  var val = this[offset + --byteLength]\n  var mul = 1\n  while (byteLength > 0 && (mul *= 0x100)) {\n    val += this[offset + --byteLength] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  return this[offset]\n}\n\nBuffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return this[offset] | (this[offset + 1] << 8)\n}\n\nBuffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return (this[offset] << 8) | this[offset + 1]\n}\n\nBuffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return ((this[offset]) |\n      (this[offset + 1] << 8) |\n      (this[offset + 2] << 16)) +\n      (this[offset + 3] * 0x1000000)\n}\n\nBuffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] * 0x1000000) +\n    ((this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    this[offset + 3])\n}\n\nBuffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var i = byteLength\n  var mul = 1\n  var val = this[offset + --i]\n  while (i > 0 && (mul *= 0x100)) {\n    val += this[offset + --i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readInt8 = function readInt8 (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  if (!(this[offset] & 0x80)) return (this[offset])\n  return ((0xff - this[offset] + 1) * -1)\n}\n\nBuffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset] | (this[offset + 1] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset + 1] | (this[offset] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset]) |\n    (this[offset + 1] << 8) |\n    (this[offset + 2] << 16) |\n    (this[offset + 3] << 24)\n}\n\nBuffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] << 24) |\n    (this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    (this[offset + 3])\n}\n\nBuffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, true, 23, 4)\n}\n\nBuffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, false, 23, 4)\n}\n\nBuffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, true, 52, 8)\n}\n\nBuffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, false, 52, 8)\n}\n\nfunction checkInt (buf, value, offset, ext, max, min) {\n  if (!Buffer.isBuffer(buf)) throw new TypeError('\"buffer\" argument must be a Buffer instance')\n  if (value > max || value < min) throw new RangeError('\"value\" argument is out of bounds')\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\n}\n\nBuffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) {\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\n  }\n\n  var mul = 1\n  var i = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) {\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\n  }\n\n  var i = byteLength - 1\n  var mul = 1\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)\n  this[offset] = (value & 0xff)\n  return offset + 1\n}\n\nBuffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  this[offset] = (value & 0xff)\n  this[offset + 1] = (value >>> 8)\n  return offset + 2\n}\n\nBuffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  this[offset] = (value >>> 8)\n  this[offset + 1] = (value & 0xff)\n  return offset + 2\n}\n\nBuffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  this[offset + 3] = (value >>> 24)\n  this[offset + 2] = (value >>> 16)\n  this[offset + 1] = (value >>> 8)\n  this[offset] = (value & 0xff)\n  return offset + 4\n}\n\nBuffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  this[offset] = (value >>> 24)\n  this[offset + 1] = (value >>> 16)\n  this[offset + 2] = (value >>> 8)\n  this[offset + 3] = (value & 0xff)\n  return offset + 4\n}\n\nBuffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    var limit = Math.pow(2, (8 * byteLength) - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = 0\n  var mul = 1\n  var sub = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {\n      sub = 1\n    }\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    var limit = Math.pow(2, (8 * byteLength) - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = byteLength - 1\n  var mul = 1\n  var sub = 0\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {\n      sub = 1\n    }\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)\n  if (value < 0) value = 0xff + value + 1\n  this[offset] = (value & 0xff)\n  return offset + 1\n}\n\nBuffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  this[offset] = (value & 0xff)\n  this[offset + 1] = (value >>> 8)\n  return offset + 2\n}\n\nBuffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  this[offset] = (value >>> 8)\n  this[offset + 1] = (value & 0xff)\n  return offset + 2\n}\n\nBuffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  this[offset] = (value & 0xff)\n  this[offset + 1] = (value >>> 8)\n  this[offset + 2] = (value >>> 16)\n  this[offset + 3] = (value >>> 24)\n  return offset + 4\n}\n\nBuffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  if (value < 0) value = 0xffffffff + value + 1\n  this[offset] = (value >>> 24)\n  this[offset + 1] = (value >>> 16)\n  this[offset + 2] = (value >>> 8)\n  this[offset + 3] = (value & 0xff)\n  return offset + 4\n}\n\nfunction checkIEEE754 (buf, value, offset, ext, max, min) {\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\n  if (offset < 0) throw new RangeError('Index out of range')\n}\n\nfunction writeFloat (buf, value, offset, littleEndian, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 23, 4)\n  return offset + 4\n}\n\nBuffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, false, noAssert)\n}\n\nfunction writeDouble (buf, value, offset, littleEndian, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 52, 8)\n  return offset + 8\n}\n\nBuffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, false, noAssert)\n}\n\n// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)\nBuffer.prototype.copy = function copy (target, targetStart, start, end) {\n  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')\n  if (!start) start = 0\n  if (!end && end !== 0) end = this.length\n  if (targetStart >= target.length) targetStart = target.length\n  if (!targetStart) targetStart = 0\n  if (end > 0 && end < start) end = start\n\n  // Copy 0 bytes; we're done\n  if (end === start) return 0\n  if (target.length === 0 || this.length === 0) return 0\n\n  // Fatal error conditions\n  if (targetStart < 0) {\n    throw new RangeError('targetStart out of bounds')\n  }\n  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')\n  if (end < 0) throw new RangeError('sourceEnd out of bounds')\n\n  // Are we oob?\n  if (end > this.length) end = this.length\n  if (target.length - targetStart < end - start) {\n    end = target.length - targetStart + start\n  }\n\n  var len = end - start\n\n  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {\n    // Use built-in when available, missing from IE11\n    this.copyWithin(targetStart, start, end)\n  } else if (this === target && start < targetStart && targetStart < end) {\n    // descending copy from end\n    for (var i = len - 1; i >= 0; --i) {\n      target[i + targetStart] = this[i + start]\n    }\n  } else {\n    Uint8Array.prototype.set.call(\n      target,\n      this.subarray(start, end),\n      targetStart\n    )\n  }\n\n  return len\n}\n\n// Usage:\n//    buffer.fill(number[, offset[, end]])\n//    buffer.fill(buffer[, offset[, end]])\n//    buffer.fill(string[, offset[, end]][, encoding])\nBuffer.prototype.fill = function fill (val, start, end, encoding) {\n  // Handle string cases:\n  if (typeof val === 'string') {\n    if (typeof start === 'string') {\n      encoding = start\n      start = 0\n      end = this.length\n    } else if (typeof end === 'string') {\n      encoding = end\n      end = this.length\n    }\n    if (encoding !== undefined && typeof encoding !== 'string') {\n      throw new TypeError('encoding must be a string')\n    }\n    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {\n      throw new TypeError('Unknown encoding: ' + encoding)\n    }\n    if (val.length === 1) {\n      var code = val.charCodeAt(0)\n      if ((encoding === 'utf8' && code < 128) ||\n          encoding === 'latin1') {\n        // Fast path: If `val` fits into a single byte, use that numeric value.\n        val = code\n      }\n    }\n  } else if (typeof val === 'number') {\n    val = val & 255\n  }\n\n  // Invalid ranges are not set to a default, so can range check early.\n  if (start < 0 || this.length < start || this.length < end) {\n    throw new RangeError('Out of range index')\n  }\n\n  if (end <= start) {\n    return this\n  }\n\n  start = start >>> 0\n  end = end === undefined ? this.length : end >>> 0\n\n  if (!val) val = 0\n\n  var i\n  if (typeof val === 'number') {\n    for (i = start; i < end; ++i) {\n      this[i] = val\n    }\n  } else {\n    var bytes = Buffer.isBuffer(val)\n      ? val\n      : Buffer.from(val, encoding)\n    var len = bytes.length\n    if (len === 0) {\n      throw new TypeError('The value \"' + val +\n        '\" is invalid for argument \"value\"')\n    }\n    for (i = 0; i < end - start; ++i) {\n      this[i + start] = bytes[i % len]\n    }\n  }\n\n  return this\n}\n\n// HELPER FUNCTIONS\n// ================\n\nvar INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g\n\nfunction base64clean (str) {\n  // Node takes equal signs as end of the Base64 encoding\n  str = str.split('=')[0]\n  // Node strips out invalid characters like \\n and \\t from the string, base64-js does not\n  str = str.trim().replace(INVALID_BASE64_RE, '')\n  // Node converts strings with length < 2 to ''\n  if (str.length < 2) return ''\n  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not\n  while (str.length % 4 !== 0) {\n    str = str + '='\n  }\n  return str\n}\n\nfunction toHex (n) {\n  if (n < 16) return '0' + n.toString(16)\n  return n.toString(16)\n}\n\nfunction utf8ToBytes (string, units) {\n  units = units || Infinity\n  var codePoint\n  var length = string.length\n  var leadSurrogate = null\n  var bytes = []\n\n  for (var i = 0; i < length; ++i) {\n    codePoint = string.charCodeAt(i)\n\n    // is surrogate component\n    if (codePoint > 0xD7FF && codePoint < 0xE000) {\n      // last char was a lead\n      if (!leadSurrogate) {\n        // no lead yet\n        if (codePoint > 0xDBFF) {\n          // unexpected trail\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        } else if (i + 1 === length) {\n          // unpaired lead\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        }\n\n        // valid lead\n        leadSurrogate = codePoint\n\n        continue\n      }\n\n      // 2 leads in a row\n      if (codePoint < 0xDC00) {\n        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n        leadSurrogate = codePoint\n        continue\n      }\n\n      // valid surrogate pair\n      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000\n    } else if (leadSurrogate) {\n      // valid bmp char, but last char was a lead\n      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n    }\n\n    leadSurrogate = null\n\n    // encode utf8\n    if (codePoint < 0x80) {\n      if ((units -= 1) < 0) break\n      bytes.push(codePoint)\n    } else if (codePoint < 0x800) {\n      if ((units -= 2) < 0) break\n      bytes.push(\n        codePoint >> 0x6 | 0xC0,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x10000) {\n      if ((units -= 3) < 0) break\n      bytes.push(\n        codePoint >> 0xC | 0xE0,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x110000) {\n      if ((units -= 4) < 0) break\n      bytes.push(\n        codePoint >> 0x12 | 0xF0,\n        codePoint >> 0xC & 0x3F | 0x80,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else {\n      throw new Error('Invalid code point')\n    }\n  }\n\n  return bytes\n}\n\nfunction asciiToBytes (str) {\n  var byteArray = []\n  for (var i = 0; i < str.length; ++i) {\n    // Node's code seems to be doing this and not & 0x7F..\n    byteArray.push(str.charCodeAt(i) & 0xFF)\n  }\n  return byteArray\n}\n\nfunction utf16leToBytes (str, units) {\n  var c, hi, lo\n  var byteArray = []\n  for (var i = 0; i < str.length; ++i) {\n    if ((units -= 2) < 0) break\n\n    c = str.charCodeAt(i)\n    hi = c >> 8\n    lo = c % 256\n    byteArray.push(lo)\n    byteArray.push(hi)\n  }\n\n  return byteArray\n}\n\nfunction base64ToBytes (str) {\n  return base64.toByteArray(base64clean(str))\n}\n\nfunction blitBuffer (src, dst, offset, length) {\n  for (var i = 0; i < length; ++i) {\n    if ((i + offset >= dst.length) || (i >= src.length)) break\n    dst[i + offset] = src[i]\n  }\n  return i\n}\n\n// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass\n// the `instanceof` check but they should be treated as of that type.\n// See: https://github.com/feross/buffer/issues/166\nfunction isInstance (obj, type) {\n  return obj instanceof type ||\n    (obj != null && obj.constructor != null && obj.constructor.name != null &&\n      obj.constructor.name === type.name)\n}\nfunction numberIsNaN (obj) {\n  // For IE11 support\n  return obj !== obj // eslint-disable-line no-self-compare\n}\n\n},{\"base64-js\":36,\"ieee754\":48}],39:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar objectCreate = Object.create || objectCreatePolyfill\nvar objectKeys = Object.keys || objectKeysPolyfill\nvar bind = Function.prototype.bind || functionBindPolyfill\n\nfunction EventEmitter() {\n  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {\n    this._events = objectCreate(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n}\nmodule.exports = EventEmitter;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nvar hasDefineProperty;\ntry {\n  var o = {};\n  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });\n  hasDefineProperty = o.x === 0;\n} catch (err) { hasDefineProperty = false }\nif (hasDefineProperty) {\n  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {\n    enumerable: true,\n    get: function() {\n      return defaultMaxListeners;\n    },\n    set: function(arg) {\n      // check whether the input is a positive number (whose value is zero or\n      // greater and not a NaN).\n      if (typeof arg !== 'number' || arg < 0 || arg !== arg)\n        throw new TypeError('\"defaultMaxListeners\" must be a positive number');\n      defaultMaxListeners = arg;\n    }\n  });\n} else {\n  EventEmitter.defaultMaxListeners = defaultMaxListeners;\n}\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || isNaN(n))\n    throw new TypeError('\"n\" argument must be a positive number');\n  this._maxListeners = n;\n  return this;\n};\n\nfunction $getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return $getMaxListeners(this);\n};\n\n// These standalone emit* functions are used to optimize calling of event\n// handlers for fast cases because emit() itself often has a variable number of\n// arguments and can be deoptimized because of that. These functions always have\n// the same number of arguments and thus do not get deoptimized, so the code\n// inside them can execute faster.\nfunction emitNone(handler, isFn, self) {\n  if (isFn)\n    handler.call(self);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].call(self);\n  }\n}\nfunction emitOne(handler, isFn, self, arg1) {\n  if (isFn)\n    handler.call(self, arg1);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].call(self, arg1);\n  }\n}\nfunction emitTwo(handler, isFn, self, arg1, arg2) {\n  if (isFn)\n    handler.call(self, arg1, arg2);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].call(self, arg1, arg2);\n  }\n}\nfunction emitThree(handler, isFn, self, arg1, arg2, arg3) {\n  if (isFn)\n    handler.call(self, arg1, arg2, arg3);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].call(self, arg1, arg2, arg3);\n  }\n}\n\nfunction emitMany(handler, isFn, self, args) {\n  if (isFn)\n    handler.apply(self, args);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].apply(self, args);\n  }\n}\n\nEventEmitter.prototype.emit = function emit(type) {\n  var er, handler, len, args, i, events;\n  var doError = (type === 'error');\n\n  events = this._events;\n  if (events)\n    doError = (doError && events.error == null);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    if (arguments.length > 1)\n      er = arguments[1];\n    if (er instanceof Error) {\n      throw er; // Unhandled 'error' event\n    } else {\n      // At least give some kind of context to the user\n      var err = new Error('Unhandled \"error\" event. (' + er + ')');\n      err.context = er;\n      throw err;\n    }\n    return false;\n  }\n\n  handler = events[type];\n\n  if (!handler)\n    return false;\n\n  var isFn = typeof handler === 'function';\n  len = arguments.length;\n  switch (len) {\n      // fast cases\n    case 1:\n      emitNone(handler, isFn, this);\n      break;\n    case 2:\n      emitOne(handler, isFn, this, arguments[1]);\n      break;\n    case 3:\n      emitTwo(handler, isFn, this, arguments[1], arguments[2]);\n      break;\n    case 4:\n      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);\n      break;\n      // slower\n    default:\n      args = new Array(len - 1);\n      for (i = 1; i < len; i++)\n        args[i - 1] = arguments[i];\n      emitMany(handler, isFn, this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  if (typeof listener !== 'function')\n    throw new TypeError('\"listener\" argument must be a function');\n\n  events = target._events;\n  if (!events) {\n    events = target._events = objectCreate(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener) {\n      target.emit('newListener', type,\n          listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (!existing) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n          prepend ? [listener, existing] : [existing, listener];\n    } else {\n      // If we've already got an array, just append.\n      if (prepend) {\n        existing.unshift(listener);\n      } else {\n        existing.push(listener);\n      }\n    }\n\n    // Check for listener leak\n    if (!existing.warned) {\n      m = $getMaxListeners(target);\n      if (m && m > 0 && existing.length > m) {\n        existing.warned = true;\n        var w = new Error('Possible EventEmitter memory leak detected. ' +\n            existing.length + ' \"' + String(type) + '\" listeners ' +\n            'added. Use emitter.setMaxListeners() to ' +\n            'increase limit.');\n        w.name = 'MaxListenersExceededWarning';\n        w.emitter = target;\n        w.type = type;\n        w.count = existing.length;\n        if (typeof console === 'object' && console.warn) {\n          console.warn('%s: %s', w.name, w.message);\n        }\n      }\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    switch (arguments.length) {\n      case 0:\n        return this.listener.call(this.target);\n      case 1:\n        return this.listener.call(this.target, arguments[0]);\n      case 2:\n        return this.listener.call(this.target, arguments[0], arguments[1]);\n      case 3:\n        return this.listener.call(this.target, arguments[0], arguments[1],\n            arguments[2]);\n      default:\n        var args = new Array(arguments.length);\n        for (var i = 0; i < args.length; ++i)\n          args[i] = arguments[i];\n        this.listener.apply(this.target, args);\n    }\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = bind.call(onceWrapper, state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  if (typeof listener !== 'function')\n    throw new TypeError('\"listener\" argument must be a function');\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      if (typeof listener !== 'function')\n        throw new TypeError('\"listener\" argument must be a function');\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      if (typeof listener !== 'function')\n        throw new TypeError('\"listener\" argument must be a function');\n\n      events = this._events;\n      if (!events)\n        return this;\n\n      list = events[type];\n      if (!list)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = objectCreate(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else\n          spliceOne(list, position);\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (!events)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (!events.removeListener) {\n        if (arguments.length === 0) {\n          this._events = objectCreate(null);\n          this._eventsCount = 0;\n        } else if (events[type]) {\n          if (--this._eventsCount === 0)\n            this._events = objectCreate(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = objectKeys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = objectCreate(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (!events)\n    return [];\n\n  var evlistener = events[type];\n  if (!evlistener)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];\n};\n\n// About 1.5x faster than the two-arg version of Array#splice().\nfunction spliceOne(list, index) {\n  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)\n    list[i] = list[k];\n  list.pop();\n}\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction objectCreatePolyfill(proto) {\n  var F = function() {};\n  F.prototype = proto;\n  return new F;\n}\nfunction objectKeysPolyfill(obj) {\n  var keys = [];\n  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {\n    keys.push(k);\n  }\n  return k;\n}\nfunction functionBindPolyfill(context) {\n  var fn = this;\n  return function () {\n    return fn.apply(context, arguments);\n  };\n}\n\n},{}],40:[function(require,module,exports){\n(function (Buffer){(function (){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// NOTE: These type checking functions intentionally don't use `instanceof`\n// because it is fragile and can be easily faked with `Object.create()`.\n\nfunction isArray(arg) {\n  if (Array.isArray) {\n    return Array.isArray(arg);\n  }\n  return objectToString(arg) === '[object Array]';\n}\nexports.isArray = isArray;\n\nfunction isBoolean(arg) {\n  return typeof arg === 'boolean';\n}\nexports.isBoolean = isBoolean;\n\nfunction isNull(arg) {\n  return arg === null;\n}\nexports.isNull = isNull;\n\nfunction isNullOrUndefined(arg) {\n  return arg == null;\n}\nexports.isNullOrUndefined = isNullOrUndefined;\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\nexports.isNumber = isNumber;\n\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\nexports.isString = isString;\n\nfunction isSymbol(arg) {\n  return typeof arg === 'symbol';\n}\nexports.isSymbol = isSymbol;\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\nexports.isUndefined = isUndefined;\n\nfunction isRegExp(re) {\n  return objectToString(re) === '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\nexports.isObject = isObject;\n\nfunction isDate(d) {\n  return objectToString(d) === '[object Date]';\n}\nexports.isDate = isDate;\n\nfunction isError(e) {\n  return (objectToString(e) === '[object Error]' || e instanceof Error);\n}\nexports.isError = isError;\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nexports.isFunction = isFunction;\n\nfunction isPrimitive(arg) {\n  return arg === null ||\n         typeof arg === 'boolean' ||\n         typeof arg === 'number' ||\n         typeof arg === 'string' ||\n         typeof arg === 'symbol' ||  // ES6 symbol\n         typeof arg === 'undefined';\n}\nexports.isPrimitive = isPrimitive;\n\nexports.isBuffer = Buffer.isBuffer;\n\nfunction objectToString(o) {\n  return Object.prototype.toString.call(o);\n}\n\n}).call(this)}).call(this,{\"isBuffer\":require(\"../../is-buffer/index.js\")})\n\n},{\"../../is-buffer/index.js\":50}],41:[function(require,module,exports){\n(function (process){(function (){\nvar once = require('once');\n\nvar noop = function() {};\n\nvar isRequest = function(stream) {\n\treturn stream.setHeader && typeof stream.abort === 'function';\n};\n\nvar isChildProcess = function(stream) {\n\treturn stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3\n};\n\nvar eos = function(stream, opts, callback) {\n\tif (typeof opts === 'function') return eos(stream, null, opts);\n\tif (!opts) opts = {};\n\n\tcallback = once(callback || noop);\n\n\tvar ws = stream._writableState;\n\tvar rs = stream._readableState;\n\tvar readable = opts.readable || (opts.readable !== false && stream.readable);\n\tvar writable = opts.writable || (opts.writable !== false && stream.writable);\n\tvar cancelled = false;\n\n\tvar onlegacyfinish = function() {\n\t\tif (!stream.writable) onfinish();\n\t};\n\n\tvar onfinish = function() {\n\t\twritable = false;\n\t\tif (!readable) callback.call(stream);\n\t};\n\n\tvar onend = function() {\n\t\treadable = false;\n\t\tif (!writable) callback.call(stream);\n\t};\n\n\tvar onexit = function(exitCode) {\n\t\tcallback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);\n\t};\n\n\tvar onerror = function(err) {\n\t\tcallback.call(stream, err);\n\t};\n\n\tvar onclose = function() {\n\t\tprocess.nextTick(onclosenexttick);\n\t};\n\n\tvar onclosenexttick = function() {\n\t\tif (cancelled) return;\n\t\tif (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));\n\t\tif (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));\n\t};\n\n\tvar onrequest = function() {\n\t\tstream.req.on('finish', onfinish);\n\t};\n\n\tif (isRequest(stream)) {\n\t\tstream.on('complete', onfinish);\n\t\tstream.on('abort', onclose);\n\t\tif (stream.req) onrequest();\n\t\telse stream.on('request', onrequest);\n\t} else if (writable && !ws) { // legacy streams\n\t\tstream.on('end', onlegacyfinish);\n\t\tstream.on('close', onlegacyfinish);\n\t}\n\n\tif (isChildProcess(stream)) stream.on('exit', onexit);\n\n\tstream.on('end', onend);\n\tstream.on('finish', onfinish);\n\tif (opts.error !== false) stream.on('error', onerror);\n\tstream.on('close', onclose);\n\n\treturn function() {\n\t\tcancelled = true;\n\t\tstream.removeListener('complete', onfinish);\n\t\tstream.removeListener('abort', onclose);\n\t\tstream.removeListener('request', onrequest);\n\t\tif (stream.req) stream.req.removeListener('finish', onfinish);\n\t\tstream.removeListener('end', onlegacyfinish);\n\t\tstream.removeListener('close', onlegacyfinish);\n\t\tstream.removeListener('finish', onfinish);\n\t\tstream.removeListener('exit', onexit);\n\t\tstream.removeListener('end', onend);\n\t\tstream.removeListener('error', onerror);\n\t\tstream.removeListener('close', onclose);\n\t};\n};\n\nmodule.exports = eos;\n\n}).call(this)}).call(this,require('_process'))\n\n},{\"_process\":63,\"once\":61}],42:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.EthereumProviderError = exports.EthereumRpcError = void 0;\nconst fast_safe_stringify_1 = require(\"fast-safe-stringify\");\n/**\n * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors\n * per EIP-1474.\n * Permits any integer error code.\n */\nclass EthereumRpcError extends Error {\n    constructor(code, message, data) {\n        if (!Number.isInteger(code)) {\n            throw new Error('\"code\" must be an integer.');\n        }\n        if (!message || typeof message !== 'string') {\n            throw new Error('\"message\" must be a nonempty string.');\n        }\n        super(message);\n        this.code = code;\n        if (data !== undefined) {\n            this.data = data;\n        }\n    }\n    /**\n     * Returns a plain object with all public class properties.\n     */\n    serialize() {\n        const serialized = {\n            code: this.code,\n            message: this.message,\n        };\n        if (this.data !== undefined) {\n            serialized.data = this.data;\n        }\n        if (this.stack) {\n            serialized.stack = this.stack;\n        }\n        return serialized;\n    }\n    /**\n     * Return a string representation of the serialized error, omitting\n     * any circular references.\n     */\n    toString() {\n        return fast_safe_stringify_1.default(this.serialize(), stringifyReplacer, 2);\n    }\n}\nexports.EthereumRpcError = EthereumRpcError;\n/**\n * Error subclass implementing Ethereum Provider errors per EIP-1193.\n * Permits integer error codes in the [ 1000 <= 4999 ] range.\n */\nclass EthereumProviderError extends EthereumRpcError {\n    /**\n     * Create an Ethereum Provider JSON-RPC error.\n     * `code` must be an integer in the 1000 <= 4999 range.\n     */\n    constructor(code, message, data) {\n        if (!isValidEthProviderCode(code)) {\n            throw new Error('\"code\" must be an integer such that: 1000 <= code <= 4999');\n        }\n        super(code, message, data);\n    }\n}\nexports.EthereumProviderError = EthereumProviderError;\n// Internal\nfunction isValidEthProviderCode(code) {\n    return Number.isInteger(code) && code >= 1000 && code <= 4999;\n}\nfunction stringifyReplacer(_, value) {\n    if (value === '[Circular]') {\n        return undefined;\n    }\n    return value;\n}\n\n},{\"fast-safe-stringify\":47}],43:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.errorValues = exports.errorCodes = void 0;\nexports.errorCodes = {\n    rpc: {\n        invalidInput: -32000,\n        resourceNotFound: -32001,\n        resourceUnavailable: -32002,\n        transactionRejected: -32003,\n        methodNotSupported: -32004,\n        limitExceeded: -32005,\n        parse: -32700,\n        invalidRequest: -32600,\n        methodNotFound: -32601,\n        invalidParams: -32602,\n        internal: -32603,\n    },\n    provider: {\n        userRejectedRequest: 4001,\n        unauthorized: 4100,\n        unsupportedMethod: 4200,\n        disconnected: 4900,\n        chainDisconnected: 4901,\n    },\n};\nexports.errorValues = {\n    '-32700': {\n        standard: 'JSON RPC 2.0',\n        message: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.',\n    },\n    '-32600': {\n        standard: 'JSON RPC 2.0',\n        message: 'The JSON sent is not a valid Request object.',\n    },\n    '-32601': {\n        standard: 'JSON RPC 2.0',\n        message: 'The method does not exist / is not available.',\n    },\n    '-32602': {\n        standard: 'JSON RPC 2.0',\n        message: 'Invalid method parameter(s).',\n    },\n    '-32603': {\n        standard: 'JSON RPC 2.0',\n        message: 'Internal JSON-RPC error.',\n    },\n    '-32000': {\n        standard: 'EIP-1474',\n        message: 'Invalid input.',\n    },\n    '-32001': {\n        standard: 'EIP-1474',\n        message: 'Resource not found.',\n    },\n    '-32002': {\n        standard: 'EIP-1474',\n        message: 'Resource unavailable.',\n    },\n    '-32003': {\n        standard: 'EIP-1474',\n        message: 'Transaction rejected.',\n    },\n    '-32004': {\n        standard: 'EIP-1474',\n        message: 'Method not supported.',\n    },\n    '-32005': {\n        standard: 'EIP-1474',\n        message: 'Request limit exceeded.',\n    },\n    '4001': {\n        standard: 'EIP-1193',\n        message: 'User rejected the request.',\n    },\n    '4100': {\n        standard: 'EIP-1193',\n        message: 'The requested account and/or method has not been authorized by the user.',\n    },\n    '4200': {\n        standard: 'EIP-1193',\n        message: 'The requested method is not supported by this Ethereum provider.',\n    },\n    '4900': {\n        standard: 'EIP-1193',\n        message: 'The provider is disconnected from all chains.',\n    },\n    '4901': {\n        standard: 'EIP-1193',\n        message: 'The provider is disconnected from the specified chain.',\n    },\n};\n\n},{}],44:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ethErrors = void 0;\nconst classes_1 = require(\"./classes\");\nconst utils_1 = require(\"./utils\");\nconst error_constants_1 = require(\"./error-constants\");\nexports.ethErrors = {\n    rpc: {\n        /**\n         * Get a JSON RPC 2.0 Parse (-32700) error.\n         */\n        parse: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.parse, arg),\n        /**\n         * Get a JSON RPC 2.0 Invalid Request (-32600) error.\n         */\n        invalidRequest: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidRequest, arg),\n        /**\n         * Get a JSON RPC 2.0 Invalid Params (-32602) error.\n         */\n        invalidParams: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidParams, arg),\n        /**\n         * Get a JSON RPC 2.0 Method Not Found (-32601) error.\n         */\n        methodNotFound: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotFound, arg),\n        /**\n         * Get a JSON RPC 2.0 Internal (-32603) error.\n         */\n        internal: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.internal, arg),\n        /**\n         * Get a JSON RPC 2.0 Server error.\n         * Permits integer error codes in the [ -32099 <= -32005 ] range.\n         * Codes -32000 through -32004 are reserved by EIP-1474.\n         */\n        server: (opts) => {\n            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {\n                throw new Error('Ethereum RPC Server errors must provide single object argument.');\n            }\n            const { code } = opts;\n            if (!Number.isInteger(code) || code > -32005 || code < -32099) {\n                throw new Error('\"code\" must be an integer such that: -32099 <= code <= -32005');\n            }\n            return getEthJsonRpcError(code, opts);\n        },\n        /**\n         * Get an Ethereum JSON RPC Invalid Input (-32000) error.\n         */\n        invalidInput: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidInput, arg),\n        /**\n         * Get an Ethereum JSON RPC Resource Not Found (-32001) error.\n         */\n        resourceNotFound: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceNotFound, arg),\n        /**\n         * Get an Ethereum JSON RPC Resource Unavailable (-32002) error.\n         */\n        resourceUnavailable: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceUnavailable, arg),\n        /**\n         * Get an Ethereum JSON RPC Transaction Rejected (-32003) error.\n         */\n        transactionRejected: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.transactionRejected, arg),\n        /**\n         * Get an Ethereum JSON RPC Method Not Supported (-32004) error.\n         */\n        methodNotSupported: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotSupported, arg),\n        /**\n         * Get an Ethereum JSON RPC Limit Exceeded (-32005) error.\n         */\n        limitExceeded: (arg) => getEthJsonRpcError(error_constants_1.errorCodes.rpc.limitExceeded, arg),\n    },\n    provider: {\n        /**\n         * Get an Ethereum Provider User Rejected Request (4001) error.\n         */\n        userRejectedRequest: (arg) => {\n            return getEthProviderError(error_constants_1.errorCodes.provider.userRejectedRequest, arg);\n        },\n        /**\n         * Get an Ethereum Provider Unauthorized (4100) error.\n         */\n        unauthorized: (arg) => {\n            return getEthProviderError(error_constants_1.errorCodes.provider.unauthorized, arg);\n        },\n        /**\n         * Get an Ethereum Provider Unsupported Method (4200) error.\n         */\n        unsupportedMethod: (arg) => {\n            return getEthProviderError(error_constants_1.errorCodes.provider.unsupportedMethod, arg);\n        },\n        /**\n         * Get an Ethereum Provider Not Connected (4900) error.\n         */\n        disconnected: (arg) => {\n            return getEthProviderError(error_constants_1.errorCodes.provider.disconnected, arg);\n        },\n        /**\n         * Get an Ethereum Provider Chain Not Connected (4901) error.\n         */\n        chainDisconnected: (arg) => {\n            return getEthProviderError(error_constants_1.errorCodes.provider.chainDisconnected, arg);\n        },\n        /**\n         * Get a custom Ethereum Provider error.\n         */\n        custom: (opts) => {\n            if (!opts || typeof opts !== 'object' || Array.isArray(opts)) {\n                throw new Error('Ethereum Provider custom errors must provide single object argument.');\n            }\n            const { code, message, data } = opts;\n            if (!message || typeof message !== 'string') {\n                throw new Error('\"message\" must be a nonempty string');\n            }\n            return new classes_1.EthereumProviderError(code, message, data);\n        },\n    },\n};\n// Internal\nfunction getEthJsonRpcError(code, arg) {\n    const [message, data] = parseOpts(arg);\n    return new classes_1.EthereumRpcError(code, message || utils_1.getMessageFromCode(code), data);\n}\nfunction getEthProviderError(code, arg) {\n    const [message, data] = parseOpts(arg);\n    return new classes_1.EthereumProviderError(code, message || utils_1.getMessageFromCode(code), data);\n}\nfunction parseOpts(arg) {\n    if (arg) {\n        if (typeof arg === 'string') {\n            return [arg];\n        }\n        else if (typeof arg === 'object' && !Array.isArray(arg)) {\n            const { message, data } = arg;\n            if (message && typeof message !== 'string') {\n                throw new Error('Must specify string message.');\n            }\n            return [message || undefined, data];\n        }\n    }\n    return [];\n}\n\n},{\"./classes\":42,\"./error-constants\":43,\"./utils\":46}],45:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getMessageFromCode = exports.serializeError = exports.EthereumProviderError = exports.EthereumRpcError = exports.ethErrors = exports.errorCodes = void 0;\nconst classes_1 = require(\"./classes\");\nObject.defineProperty(exports, \"EthereumRpcError\", { enumerable: true, get: function () { return classes_1.EthereumRpcError; } });\nObject.defineProperty(exports, \"EthereumProviderError\", { enumerable: true, get: function () { return classes_1.EthereumProviderError; } });\nconst utils_1 = require(\"./utils\");\nObject.defineProperty(exports, \"serializeError\", { enumerable: true, get: function () { return utils_1.serializeError; } });\nObject.defineProperty(exports, \"getMessageFromCode\", { enumerable: true, get: function () { return utils_1.getMessageFromCode; } });\nconst errors_1 = require(\"./errors\");\nObject.defineProperty(exports, \"ethErrors\", { enumerable: true, get: function () { return errors_1.ethErrors; } });\nconst error_constants_1 = require(\"./error-constants\");\nObject.defineProperty(exports, \"errorCodes\", { enumerable: true, get: function () { return error_constants_1.errorCodes; } });\n\n},{\"./classes\":42,\"./error-constants\":43,\"./errors\":44,\"./utils\":46}],46:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.serializeError = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;\nconst error_constants_1 = require(\"./error-constants\");\nconst classes_1 = require(\"./classes\");\nconst FALLBACK_ERROR_CODE = error_constants_1.errorCodes.rpc.internal;\nconst FALLBACK_MESSAGE = 'Unspecified error message. This is a bug, please report it.';\nconst FALLBACK_ERROR = {\n    code: FALLBACK_ERROR_CODE,\n    message: getMessageFromCode(FALLBACK_ERROR_CODE),\n};\nexports.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.';\n/**\n * Gets the message for a given code, or a fallback message if the code has\n * no corresponding message.\n */\nfunction getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {\n    if (Number.isInteger(code)) {\n        const codeString = code.toString();\n        if (hasKey(error_constants_1.errorValues, codeString)) {\n            return error_constants_1.errorValues[codeString].message;\n        }\n        if (isJsonRpcServerError(code)) {\n            return exports.JSON_RPC_SERVER_ERROR_MESSAGE;\n        }\n    }\n    return fallbackMessage;\n}\nexports.getMessageFromCode = getMessageFromCode;\n/**\n * Returns whether the given code is valid.\n * A code is only valid if it has a message.\n */\nfunction isValidCode(code) {\n    if (!Number.isInteger(code)) {\n        return false;\n    }\n    const codeString = code.toString();\n    if (error_constants_1.errorValues[codeString]) {\n        return true;\n    }\n    if (isJsonRpcServerError(code)) {\n        return true;\n    }\n    return false;\n}\nexports.isValidCode = isValidCode;\n/**\n * Serializes the given error to an Ethereum JSON RPC-compatible error object.\n * Merely copies the given error's values if it is already compatible.\n * If the given error is not fully compatible, it will be preserved on the\n * returned object's data.originalError property.\n */\nfunction serializeError(error, { fallbackError = FALLBACK_ERROR, shouldIncludeStack = false, } = {}) {\n    var _a, _b;\n    if (!fallbackError ||\n        !Number.isInteger(fallbackError.code) ||\n        typeof fallbackError.message !== 'string') {\n        throw new Error('Must provide fallback error with integer number code and string message.');\n    }\n    if (error instanceof classes_1.EthereumRpcError) {\n        return error.serialize();\n    }\n    const serialized = {};\n    if (error &&\n        typeof error === 'object' &&\n        !Array.isArray(error) &&\n        hasKey(error, 'code') &&\n        isValidCode(error.code)) {\n        const _error = error;\n        serialized.code = _error.code;\n        if (_error.message && typeof _error.message === 'string') {\n            serialized.message = _error.message;\n            if (hasKey(_error, 'data')) {\n                serialized.data = _error.data;\n            }\n        }\n        else {\n            serialized.message = getMessageFromCode(serialized.code);\n            serialized.data = { originalError: assignOriginalError(error) };\n        }\n    }\n    else {\n        serialized.code = fallbackError.code;\n        const message = (_a = error) === null || _a === void 0 ? void 0 : _a.message;\n        serialized.message = (message && typeof message === 'string'\n            ? message\n            : fallbackError.message);\n        serialized.data = { originalError: assignOriginalError(error) };\n    }\n    const stack = (_b = error) === null || _b === void 0 ? void 0 : _b.stack;\n    if (shouldIncludeStack && error && stack && typeof stack === 'string') {\n        serialized.stack = stack;\n    }\n    return serialized;\n}\nexports.serializeError = serializeError;\n// Internal\nfunction isJsonRpcServerError(code) {\n    return code >= -32099 && code <= -32000;\n}\nfunction assignOriginalError(error) {\n    if (error && typeof error === 'object' && !Array.isArray(error)) {\n        return Object.assign({}, error);\n    }\n    return error;\n}\nfunction hasKey(obj, key) {\n    return Object.prototype.hasOwnProperty.call(obj, key);\n}\n\n},{\"./classes\":42,\"./error-constants\":43}],47:[function(require,module,exports){\nmodule.exports = stringify\nstringify.default = stringify\nstringify.stable = deterministicStringify\nstringify.stableStringify = deterministicStringify\n\nvar LIMIT_REPLACE_NODE = '[...]'\nvar CIRCULAR_REPLACE_NODE = '[Circular]'\n\nvar arr = []\nvar replacerStack = []\n\nfunction defaultOptions () {\n  return {\n    depthLimit: Number.MAX_SAFE_INTEGER,\n    edgesLimit: Number.MAX_SAFE_INTEGER\n  }\n}\n\n// Regular stringify\nfunction stringify (obj, replacer, spacer, options) {\n  if (typeof options === 'undefined') {\n    options = defaultOptions()\n  }\n\n  decirc(obj, '', 0, [], undefined, 0, options)\n  var res\n  try {\n    if (replacerStack.length === 0) {\n      res = JSON.stringify(obj, replacer, spacer)\n    } else {\n      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)\n    }\n  } catch (_) {\n    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')\n  } finally {\n    while (arr.length !== 0) {\n      var part = arr.pop()\n      if (part.length === 4) {\n        Object.defineProperty(part[0], part[1], part[3])\n      } else {\n        part[0][part[1]] = part[2]\n      }\n    }\n  }\n  return res\n}\n\nfunction setReplace (replace, val, k, parent) {\n  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)\n  if (propertyDescriptor.get !== undefined) {\n    if (propertyDescriptor.configurable) {\n      Object.defineProperty(parent, k, { value: replace })\n      arr.push([parent, k, val, propertyDescriptor])\n    } else {\n      replacerStack.push([val, k, replace])\n    }\n  } else {\n    parent[k] = replace\n    arr.push([parent, k, val])\n  }\n}\n\nfunction decirc (val, k, edgeIndex, stack, parent, depth, options) {\n  depth += 1\n  var i\n  if (typeof val === 'object' && val !== null) {\n    for (i = 0; i < stack.length; i++) {\n      if (stack[i] === val) {\n        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)\n        return\n      }\n    }\n\n    if (\n      typeof options.depthLimit !== 'undefined' &&\n      depth > options.depthLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    if (\n      typeof options.edgesLimit !== 'undefined' &&\n      edgeIndex + 1 > options.edgesLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    stack.push(val)\n    // Optimize for Arrays. Big arrays could kill the performance otherwise!\n    if (Array.isArray(val)) {\n      for (i = 0; i < val.length; i++) {\n        decirc(val[i], i, i, stack, val, depth, options)\n      }\n    } else {\n      var keys = Object.keys(val)\n      for (i = 0; i < keys.length; i++) {\n        var key = keys[i]\n        decirc(val[key], key, i, stack, val, depth, options)\n      }\n    }\n    stack.pop()\n  }\n}\n\n// Stable-stringify\nfunction compareFunction (a, b) {\n  if (a < b) {\n    return -1\n  }\n  if (a > b) {\n    return 1\n  }\n  return 0\n}\n\nfunction deterministicStringify (obj, replacer, spacer, options) {\n  if (typeof options === 'undefined') {\n    options = defaultOptions()\n  }\n\n  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj\n  var res\n  try {\n    if (replacerStack.length === 0) {\n      res = JSON.stringify(tmp, replacer, spacer)\n    } else {\n      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)\n    }\n  } catch (_) {\n    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')\n  } finally {\n    // Ensure that we restore the object as it was.\n    while (arr.length !== 0) {\n      var part = arr.pop()\n      if (part.length === 4) {\n        Object.defineProperty(part[0], part[1], part[3])\n      } else {\n        part[0][part[1]] = part[2]\n      }\n    }\n  }\n  return res\n}\n\nfunction deterministicDecirc (val, k, edgeIndex, stack, parent, depth, options) {\n  depth += 1\n  var i\n  if (typeof val === 'object' && val !== null) {\n    for (i = 0; i < stack.length; i++) {\n      if (stack[i] === val) {\n        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)\n        return\n      }\n    }\n    try {\n      if (typeof val.toJSON === 'function') {\n        return\n      }\n    } catch (_) {\n      return\n    }\n\n    if (\n      typeof options.depthLimit !== 'undefined' &&\n      depth > options.depthLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    if (\n      typeof options.edgesLimit !== 'undefined' &&\n      edgeIndex + 1 > options.edgesLimit\n    ) {\n      setReplace(LIMIT_REPLACE_NODE, val, k, parent)\n      return\n    }\n\n    stack.push(val)\n    // Optimize for Arrays. Big arrays could kill the performance otherwise!\n    if (Array.isArray(val)) {\n      for (i = 0; i < val.length; i++) {\n        deterministicDecirc(val[i], i, i, stack, val, depth, options)\n      }\n    } else {\n      // Create a temporary object in the required way\n      var tmp = {}\n      var keys = Object.keys(val).sort(compareFunction)\n      for (i = 0; i < keys.length; i++) {\n        var key = keys[i]\n        deterministicDecirc(val[key], key, i, stack, val, depth, options)\n        tmp[key] = val[key]\n      }\n      if (typeof parent !== 'undefined') {\n        arr.push([parent, k, val])\n        parent[k] = tmp\n      } else {\n        return tmp\n      }\n    }\n    stack.pop()\n  }\n}\n\n// wraps replacer function to handle values we couldn't replace\n// and mark them as replaced value\nfunction replaceGetterValues (replacer) {\n  replacer =\n    typeof replacer !== 'undefined'\n      ? replacer\n      : function (k, v) {\n        return v\n      }\n  return function (key, val) {\n    if (replacerStack.length > 0) {\n      for (var i = 0; i < replacerStack.length; i++) {\n        var part = replacerStack[i]\n        if (part[1] === key && part[0] === val) {\n          val = part[2]\n          replacerStack.splice(i, 1)\n          break\n        }\n      }\n    }\n    return replacer.call(this, key, val)\n  }\n}\n\n},{}],48:[function(require,module,exports){\n/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */\nexports.read = function (buffer, offset, isLE, mLen, nBytes) {\n  var e, m\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var nBits = -7\n  var i = isLE ? (nBytes - 1) : 0\n  var d = isLE ? -1 : 1\n  var s = buffer[offset + i]\n\n  i += d\n\n  e = s & ((1 << (-nBits)) - 1)\n  s >>= (-nBits)\n  nBits += eLen\n  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  m = e & ((1 << (-nBits)) - 1)\n  e >>= (-nBits)\n  nBits += mLen\n  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  if (e === 0) {\n    e = 1 - eBias\n  } else if (e === eMax) {\n    return m ? NaN : ((s ? -1 : 1) * Infinity)\n  } else {\n    m = m + Math.pow(2, mLen)\n    e = e - eBias\n  }\n  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)\n}\n\nexports.write = function (buffer, value, offset, isLE, mLen, nBytes) {\n  var e, m, c\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)\n  var i = isLE ? 0 : (nBytes - 1)\n  var d = isLE ? 1 : -1\n  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0\n\n  value = Math.abs(value)\n\n  if (isNaN(value) || value === Infinity) {\n    m = isNaN(value) ? 1 : 0\n    e = eMax\n  } else {\n    e = Math.floor(Math.log(value) / Math.LN2)\n    if (value * (c = Math.pow(2, -e)) < 1) {\n      e--\n      c *= 2\n    }\n    if (e + eBias >= 1) {\n      value += rt / c\n    } else {\n      value += rt * Math.pow(2, 1 - eBias)\n    }\n    if (value * c >= 2) {\n      e++\n      c /= 2\n    }\n\n    if (e + eBias >= eMax) {\n      m = 0\n      e = eMax\n    } else if (e + eBias >= 1) {\n      m = ((value * c) - 1) * Math.pow(2, mLen)\n      e = e + eBias\n    } else {\n      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)\n      e = 0\n    }\n  }\n\n  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}\n\n  e = (e << mLen) | m\n  eLen += mLen\n  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}\n\n  buffer[offset + i - d] |= s * 128\n}\n\n},{}],49:[function(require,module,exports){\nif (typeof Object.create === 'function') {\n  // implementation from standard node.js 'util' module\n  module.exports = function inherits(ctor, superCtor) {\n    if (superCtor) {\n      ctor.super_ = superCtor\n      ctor.prototype = Object.create(superCtor.prototype, {\n        constructor: {\n          value: ctor,\n          enumerable: false,\n          writable: true,\n          configurable: true\n        }\n      })\n    }\n  };\n} else {\n  // old school shim for old browsers\n  module.exports = function inherits(ctor, superCtor) {\n    if (superCtor) {\n      ctor.super_ = superCtor\n      var TempCtor = function () {}\n      TempCtor.prototype = superCtor.prototype\n      ctor.prototype = new TempCtor()\n      ctor.prototype.constructor = ctor\n    }\n  }\n}\n\n},{}],50:[function(require,module,exports){\n/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)\n}\n\nfunction isBuffer (obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n// For Node v0.10 support. Remove this eventually.\nfunction isSlowBuffer (obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))\n}\n\n},{}],51:[function(require,module,exports){\n'use strict';\n\nconst isStream = stream =>\n\tstream !== null &&\n\ttypeof stream === 'object' &&\n\ttypeof stream.pipe === 'function';\n\nisStream.writable = stream =>\n\tisStream(stream) &&\n\tstream.writable !== false &&\n\ttypeof stream._write === 'function' &&\n\ttypeof stream._writableState === 'object';\n\nisStream.readable = stream =>\n\tisStream(stream) &&\n\tstream.readable !== false &&\n\ttypeof stream._read === 'function' &&\n\ttypeof stream._readableState === 'object';\n\nisStream.duplex = stream =>\n\tisStream.writable(stream) &&\n\tisStream.readable(stream);\n\nisStream.transform = stream =>\n\tisStream.duplex(stream) &&\n\ttypeof stream._transform === 'function' &&\n\ttypeof stream._transformState === 'object';\n\nmodule.exports = isStream;\n\n},{}],52:[function(require,module,exports){\nvar toString = {}.toString;\n\nmodule.exports = Array.isArray || function (arr) {\n  return toString.call(arr) == '[object Array]';\n};\n\n},{}],53:[function(require,module,exports){\n\"use strict\";\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.JsonRpcEngine = void 0;\nconst safe_event_emitter_1 = __importDefault(require(\"@metamask/safe-event-emitter\"));\nconst eth_rpc_errors_1 = require(\"eth-rpc-errors\");\n/**\n * A JSON-RPC request and response processor.\n * Give it a stack of middleware, pass it requests, and get back responses.\n */\nclass JsonRpcEngine extends safe_event_emitter_1.default {\n    constructor() {\n        super();\n        this._middleware = [];\n    }\n    /**\n     * Add a middleware function to the engine's middleware stack.\n     *\n     * @param middleware - The middleware function to add.\n     */\n    push(middleware) {\n        this._middleware.push(middleware);\n    }\n    handle(req, cb) {\n        if (cb && typeof cb !== 'function') {\n            throw new Error('\"callback\" must be a function if provided.');\n        }\n        if (Array.isArray(req)) {\n            if (cb) {\n                return this._handleBatch(req, cb);\n            }\n            return this._handleBatch(req);\n        }\n        if (cb) {\n            return this._handle(req, cb);\n        }\n        return this._promiseHandle(req);\n    }\n    /**\n     * Returns this engine as a middleware function that can be pushed to other\n     * engines.\n     *\n     * @returns This engine as a middleware function.\n     */\n    asMiddleware() {\n        return async (req, res, next, end) => {\n            try {\n                const [middlewareError, isComplete, returnHandlers,] = await JsonRpcEngine._runAllMiddleware(req, res, this._middleware);\n                if (isComplete) {\n                    await JsonRpcEngine._runReturnHandlers(returnHandlers);\n                    return end(middlewareError);\n                }\n                return next(async (handlerCallback) => {\n                    try {\n                        await JsonRpcEngine._runReturnHandlers(returnHandlers);\n                    }\n                    catch (error) {\n                        return handlerCallback(error);\n                    }\n                    return handlerCallback();\n                });\n            }\n            catch (error) {\n                return end(error);\n            }\n        };\n    }\n    async _handleBatch(reqs, cb) {\n        // The order here is important\n        try {\n            // 2. Wait for all requests to finish, or throw on some kind of fatal\n            // error\n            const responses = await Promise.all(\n            // 1. Begin executing each request in the order received\n            reqs.map(this._promiseHandle.bind(this)));\n            // 3. Return batch response\n            if (cb) {\n                return cb(null, responses);\n            }\n            return responses;\n        }\n        catch (error) {\n            if (cb) {\n                return cb(error);\n            }\n            throw error;\n        }\n    }\n    /**\n     * A promise-wrapped _handle.\n     */\n    _promiseHandle(req) {\n        return new Promise((resolve) => {\n            this._handle(req, (_err, res) => {\n                // There will always be a response, and it will always have any error\n                // that is caught and propagated.\n                resolve(res);\n            });\n        });\n    }\n    /**\n     * Ensures that the request object is valid, processes it, and passes any\n     * error and the response object to the given callback.\n     *\n     * Does not reject.\n     */\n    async _handle(callerReq, cb) {\n        if (!callerReq ||\n            Array.isArray(callerReq) ||\n            typeof callerReq !== 'object') {\n            const error = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, `Requests must be plain objects. Received: ${typeof callerReq}`, { request: callerReq });\n            return cb(error, { id: undefined, jsonrpc: '2.0', error });\n        }\n        if (typeof callerReq.method !== 'string') {\n            const error = new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.invalidRequest, `Must specify a string method. Received: ${typeof callerReq.method}`, { request: callerReq });\n            return cb(error, { id: callerReq.id, jsonrpc: '2.0', error });\n        }\n        const req = Object.assign({}, callerReq);\n        const res = {\n            id: req.id,\n            jsonrpc: req.jsonrpc,\n        };\n        let error = null;\n        try {\n            await this._processRequest(req, res);\n        }\n        catch (_error) {\n            // A request handler error, a re-thrown middleware error, or something\n            // unexpected.\n            error = _error;\n        }\n        if (error) {\n            // Ensure no result is present on an errored response\n            delete res.result;\n            if (!res.error) {\n                res.error = eth_rpc_errors_1.serializeError(error);\n            }\n        }\n        return cb(error, res);\n    }\n    /**\n     * For the given request and response, runs all middleware and their return\n     * handlers, if any, and ensures that internal request processing semantics\n     * are satisfied.\n     */\n    async _processRequest(req, res) {\n        const [error, isComplete, returnHandlers,] = await JsonRpcEngine._runAllMiddleware(req, res, this._middleware);\n        // Throw if \"end\" was not called, or if the response has neither a result\n        // nor an error.\n        JsonRpcEngine._checkForCompletion(req, res, isComplete);\n        // The return handlers should run even if an error was encountered during\n        // middleware processing.\n        await JsonRpcEngine._runReturnHandlers(returnHandlers);\n        // Now we re-throw the middleware processing error, if any, to catch it\n        // further up the call chain.\n        if (error) {\n            throw error;\n        }\n    }\n    /**\n     * Serially executes the given stack of middleware.\n     *\n     * @returns An array of any error encountered during middleware execution,\n     * a boolean indicating whether the request was completed, and an array of\n     * middleware-defined return handlers.\n     */\n    static async _runAllMiddleware(req, res, middlewareStack) {\n        const returnHandlers = [];\n        let error = null;\n        let isComplete = false;\n        // Go down stack of middleware, call and collect optional returnHandlers\n        for (const middleware of middlewareStack) {\n            [error, isComplete] = await JsonRpcEngine._runMiddleware(req, res, middleware, returnHandlers);\n            if (isComplete) {\n                break;\n            }\n        }\n        return [error, isComplete, returnHandlers.reverse()];\n    }\n    /**\n     * Runs an individual middleware.\n     *\n     * @returns An array of any error encountered during middleware exection,\n     * and a boolean indicating whether the request should end.\n     */\n    static _runMiddleware(req, res, middleware, returnHandlers) {\n        return new Promise((resolve) => {\n            const end = (err) => {\n                const error = err || res.error;\n                if (error) {\n                    res.error = eth_rpc_errors_1.serializeError(error);\n                }\n                // True indicates that the request should end\n                resolve([error, true]);\n            };\n            const next = (returnHandler) => {\n                if (res.error) {\n                    end(res.error);\n                }\n                else {\n                    if (returnHandler) {\n                        if (typeof returnHandler !== 'function') {\n                            end(new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: \"next\" return handlers must be functions. ` +\n                                `Received \"${typeof returnHandler}\" for request:\\n${jsonify(req)}`, { request: req }));\n                        }\n                        returnHandlers.push(returnHandler);\n                    }\n                    // False indicates that the request should not end\n                    resolve([null, false]);\n                }\n            };\n            try {\n                middleware(req, res, next, end);\n            }\n            catch (error) {\n                end(error);\n            }\n        });\n    }\n    /**\n     * Serially executes array of return handlers. The request and response are\n     * assumed to be in their scope.\n     */\n    static async _runReturnHandlers(handlers) {\n        for (const handler of handlers) {\n            await new Promise((resolve, reject) => {\n                handler((err) => (err ? reject(err) : resolve()));\n            });\n        }\n    }\n    /**\n     * Throws an error if the response has neither a result nor an error, or if\n     * the \"isComplete\" flag is falsy.\n     */\n    static _checkForCompletion(req, res, isComplete) {\n        if (!('result' in res) && !('error' in res)) {\n            throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: Response has no error or result for request:\\n${jsonify(req)}`, { request: req });\n        }\n        if (!isComplete) {\n            throw new eth_rpc_errors_1.EthereumRpcError(eth_rpc_errors_1.errorCodes.rpc.internal, `JsonRpcEngine: Nothing ended request:\\n${jsonify(req)}`, { request: req });\n        }\n    }\n}\nexports.JsonRpcEngine = JsonRpcEngine;\nfunction jsonify(request) {\n    return JSON.stringify(request, null, 2);\n}\n\n},{\"@metamask/safe-event-emitter\":35,\"eth-rpc-errors\":45}],54:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createAsyncMiddleware = void 0;\n/**\n * JsonRpcEngine only accepts callback-based middleware directly.\n * createAsyncMiddleware exists to enable consumers to pass in async middleware\n * functions.\n *\n * Async middleware have no \"end\" function. Instead, they \"end\" if they return\n * without calling \"next\". Rather than passing in explicit return handlers,\n * async middleware can simply await \"next\", and perform operations on the\n * response object when execution resumes.\n *\n * To accomplish this, createAsyncMiddleware passes the async middleware a\n * wrapped \"next\" function. That function calls the internal JsonRpcEngine\n * \"next\" function with a return handler that resolves a promise when called.\n *\n * The return handler will always be called. Its resolution of the promise\n * enables the control flow described above.\n */\nfunction createAsyncMiddleware(asyncMiddleware) {\n    return async (req, res, next, end) => {\n        // nextPromise is the key to the implementation\n        // it is resolved by the return handler passed to the\n        // \"next\" function\n        let resolveNextPromise;\n        const nextPromise = new Promise((resolve) => {\n            resolveNextPromise = resolve;\n        });\n        let returnHandlerCallback = null;\n        let nextWasCalled = false;\n        // This will be called by the consumer's async middleware.\n        const asyncNext = async () => {\n            nextWasCalled = true;\n            // We pass a return handler to next(). When it is called by the engine,\n            // the consumer's async middleware will resume executing.\n            // eslint-disable-next-line node/callback-return\n            next((runReturnHandlersCallback) => {\n                // This callback comes from JsonRpcEngine._runReturnHandlers\n                returnHandlerCallback = runReturnHandlersCallback;\n                resolveNextPromise();\n            });\n            await nextPromise;\n        };\n        try {\n            await asyncMiddleware(req, res, asyncNext);\n            if (nextWasCalled) {\n                await nextPromise; // we must wait until the return handler is called\n                returnHandlerCallback(null);\n            }\n            else {\n                end(null);\n            }\n        }\n        catch (error) {\n            if (returnHandlerCallback) {\n                returnHandlerCallback(error);\n            }\n            else {\n                end(error);\n            }\n        }\n    };\n}\nexports.createAsyncMiddleware = createAsyncMiddleware;\n\n},{}],55:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createScaffoldMiddleware = void 0;\nfunction createScaffoldMiddleware(handlers) {\n    return (req, res, next, end) => {\n        const handler = handlers[req.method];\n        // if no handler, return\n        if (handler === undefined) {\n            return next();\n        }\n        // if handler is fn, call as middleware\n        if (typeof handler === 'function') {\n            return handler(req, res, next, end);\n        }\n        // if handler is some other value, use as result\n        res.result = handler;\n        return end();\n    };\n}\nexports.createScaffoldMiddleware = createScaffoldMiddleware;\n\n},{}],56:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getUniqueId = void 0;\n// uint32 (two's complement) max\n// more conservative than Number.MAX_SAFE_INTEGER\nconst MAX = 4294967295;\nlet idCounter = Math.floor(Math.random() * MAX);\nfunction getUniqueId() {\n    idCounter = (idCounter + 1) % MAX;\n    return idCounter;\n}\nexports.getUniqueId = getUniqueId;\n\n},{}],57:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createIdRemapMiddleware = void 0;\nconst getUniqueId_1 = require(\"./getUniqueId\");\nfunction createIdRemapMiddleware() {\n    return (req, res, next, _end) => {\n        const originalId = req.id;\n        const newId = getUniqueId_1.getUniqueId();\n        req.id = newId;\n        res.id = newId;\n        next((done) => {\n            req.id = originalId;\n            res.id = originalId;\n            done();\n        });\n    };\n}\nexports.createIdRemapMiddleware = createIdRemapMiddleware;\n\n},{\"./getUniqueId\":56}],58:[function(require,module,exports){\n\"use strict\";\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__exportStar(require(\"./idRemapMiddleware\"), exports);\n__exportStar(require(\"./createAsyncMiddleware\"), exports);\n__exportStar(require(\"./createScaffoldMiddleware\"), exports);\n__exportStar(require(\"./getUniqueId\"), exports);\n__exportStar(require(\"./JsonRpcEngine\"), exports);\n__exportStar(require(\"./mergeMiddleware\"), exports);\n\n},{\"./JsonRpcEngine\":53,\"./createAsyncMiddleware\":54,\"./createScaffoldMiddleware\":55,\"./getUniqueId\":56,\"./idRemapMiddleware\":57,\"./mergeMiddleware\":59}],59:[function(require,module,exports){\n\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.mergeMiddleware = void 0;\nconst JsonRpcEngine_1 = require(\"./JsonRpcEngine\");\nfunction mergeMiddleware(middlewareStack) {\n    const engine = new JsonRpcEngine_1.JsonRpcEngine();\n    middlewareStack.forEach((middleware) => engine.push(middleware));\n    return engine.asMiddleware();\n}\nexports.mergeMiddleware = mergeMiddleware;\n\n},{\"./JsonRpcEngine\":53}],60:[function(require,module,exports){\n/*\n* loglevel - https://github.com/pimterry/loglevel\n*\n* Copyright (c) 2013 Tim Perry\n* Licensed under the MIT license.\n*/\n(function (root, definition) {\n    \"use strict\";\n    if (typeof define === 'function' && define.amd) {\n        define(definition);\n    } else if (typeof module === 'object' && module.exports) {\n        module.exports = definition();\n    } else {\n        root.log = definition();\n    }\n}(this, function () {\n    \"use strict\";\n\n    // Slightly dubious tricks to cut down minimized file size\n    var noop = function() {};\n    var undefinedType = \"undefined\";\n\n    var logMethods = [\n        \"trace\",\n        \"debug\",\n        \"info\",\n        \"warn\",\n        \"error\"\n    ];\n\n    // Cross-browser bind equivalent that works at least back to IE6\n    function bindMethod(obj, methodName) {\n        var method = obj[methodName];\n        if (typeof method.bind === 'function') {\n            return method.bind(obj);\n        } else {\n            try {\n                return Function.prototype.bind.call(method, obj);\n            } catch (e) {\n                // Missing bind shim or IE8 + Modernizr, fallback to wrapping\n                return function() {\n                    return Function.prototype.apply.apply(method, [obj, arguments]);\n                };\n            }\n        }\n    }\n\n    // Build the best logging method possible for this env\n    // Wherever possible we want to bind, not wrap, to preserve stack traces\n    function realMethod(methodName) {\n        if (methodName === 'debug') {\n            methodName = 'log';\n        }\n\n        if (typeof console === undefinedType) {\n            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives\n        } else if (console[methodName] !== undefined) {\n            return bindMethod(console, methodName);\n        } else if (console.log !== undefined) {\n            return bindMethod(console, 'log');\n        } else {\n            return noop;\n        }\n    }\n\n    // These private functions always need `this` to be set properly\n\n    function replaceLoggingMethods(level, loggerName) {\n        /*jshint validthis:true */\n        for (var i = 0; i < logMethods.length; i++) {\n            var methodName = logMethods[i];\n            this[methodName] = (i < level) ?\n                noop :\n                this.methodFactory(methodName, level, loggerName);\n        }\n\n        // Define log.log as an alias for log.debug\n        this.log = this.debug;\n    }\n\n    // In old IE versions, the console isn't present until you first open it.\n    // We build realMethod() replacements here that regenerate logging methods\n    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {\n        return function () {\n            if (typeof console !== undefinedType) {\n                replaceLoggingMethods.call(this, level, loggerName);\n                this[methodName].apply(this, arguments);\n            }\n        };\n    }\n\n    // By default, we use closely bound real methods wherever possible, and\n    // otherwise we wait for a console to appear, and then try again.\n    function defaultMethodFactory(methodName, level, loggerName) {\n        /*jshint validthis:true */\n        return realMethod(methodName) ||\n               enableLoggingWhenConsoleArrives.apply(this, arguments);\n    }\n\n    function Logger(name, defaultLevel, factory) {\n      var self = this;\n      var currentLevel;\n      var storageKey = \"loglevel\";\n      if (name) {\n        storageKey += \":\" + name;\n      }\n\n      function persistLevelIfPossible(levelNum) {\n          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();\n\n          if (typeof window === undefinedType) return;\n\n          // Use localStorage if available\n          try {\n              window.localStorage[storageKey] = levelName;\n              return;\n          } catch (ignore) {}\n\n          // Use session cookie as fallback\n          try {\n              window.document.cookie =\n                encodeURIComponent(storageKey) + \"=\" + levelName + \";\";\n          } catch (ignore) {}\n      }\n\n      function getPersistedLevel() {\n          var storedLevel;\n\n          if (typeof window === undefinedType) return;\n\n          try {\n              storedLevel = window.localStorage[storageKey];\n          } catch (ignore) {}\n\n          // Fallback to cookies if local storage gives us nothing\n          if (typeof storedLevel === undefinedType) {\n              try {\n                  var cookie = window.document.cookie;\n                  var location = cookie.indexOf(\n                      encodeURIComponent(storageKey) + \"=\");\n                  if (location !== -1) {\n                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];\n                  }\n              } catch (ignore) {}\n          }\n\n          // If the stored level is not valid, treat it as if nothing was stored.\n          if (self.levels[storedLevel] === undefined) {\n              storedLevel = undefined;\n          }\n\n          return storedLevel;\n      }\n\n      /*\n       *\n       * Public logger API - see https://github.com/pimterry/loglevel for details\n       *\n       */\n\n      self.name = name;\n\n      self.levels = { \"TRACE\": 0, \"DEBUG\": 1, \"INFO\": 2, \"WARN\": 3,\n          \"ERROR\": 4, \"SILENT\": 5};\n\n      self.methodFactory = factory || defaultMethodFactory;\n\n      self.getLevel = function () {\n          return currentLevel;\n      };\n\n      self.setLevel = function (level, persist) {\n          if (typeof level === \"string\" && self.levels[level.toUpperCase()] !== undefined) {\n              level = self.levels[level.toUpperCase()];\n          }\n          if (typeof level === \"number\" && level >= 0 && level <= self.levels.SILENT) {\n              currentLevel = level;\n              if (persist !== false) {  // defaults to true\n                  persistLevelIfPossible(level);\n              }\n              replaceLoggingMethods.call(self, level, name);\n              if (typeof console === undefinedType && level < self.levels.SILENT) {\n                  return \"No console available for logging\";\n              }\n          } else {\n              throw \"log.setLevel() called with invalid level: \" + level;\n          }\n      };\n\n      self.setDefaultLevel = function (level) {\n          if (!getPersistedLevel()) {\n              self.setLevel(level, false);\n          }\n      };\n\n      self.enableAll = function(persist) {\n          self.setLevel(self.levels.TRACE, persist);\n      };\n\n      self.disableAll = function(persist) {\n          self.setLevel(self.levels.SILENT, persist);\n      };\n\n      // Initialize with the right level\n      var initialLevel = getPersistedLevel();\n      if (initialLevel == null) {\n          initialLevel = defaultLevel == null ? \"WARN\" : defaultLevel;\n      }\n      self.setLevel(initialLevel, false);\n    }\n\n    /*\n     *\n     * Top-level API\n     *\n     */\n\n    var defaultLogger = new Logger();\n\n    var _loggersByName = {};\n    defaultLogger.getLogger = function getLogger(name) {\n        if (typeof name !== \"string\" || name === \"\") {\n          throw new TypeError(\"You must supply a name when creating a logger.\");\n        }\n\n        var logger = _loggersByName[name];\n        if (!logger) {\n          logger = _loggersByName[name] = new Logger(\n            name, defaultLogger.getLevel(), defaultLogger.methodFactory);\n        }\n        return logger;\n    };\n\n    // Grab the current global log variable in case of overwrite\n    var _log = (typeof window !== undefinedType) ? window.log : undefined;\n    defaultLogger.noConflict = function() {\n        if (typeof window !== undefinedType &&\n               window.log === defaultLogger) {\n            window.log = _log;\n        }\n\n        return defaultLogger;\n    };\n\n    defaultLogger.getLoggers = function getLoggers() {\n        return _loggersByName;\n    };\n\n    return defaultLogger;\n}));\n\n},{}],61:[function(require,module,exports){\nvar wrappy = require('wrappy')\nmodule.exports = wrappy(once)\nmodule.exports.strict = wrappy(onceStrict)\n\nonce.proto = once(function () {\n  Object.defineProperty(Function.prototype, 'once', {\n    value: function () {\n      return once(this)\n    },\n    configurable: true\n  })\n\n  Object.defineProperty(Function.prototype, 'onceStrict', {\n    value: function () {\n      return onceStrict(this)\n    },\n    configurable: true\n  })\n})\n\nfunction once (fn) {\n  var f = function () {\n    if (f.called) return f.value\n    f.called = true\n    return f.value = fn.apply(this, arguments)\n  }\n  f.called = false\n  return f\n}\n\nfunction onceStrict (fn) {\n  var f = function () {\n    if (f.called)\n      throw new Error(f.onceError)\n    f.called = true\n    return f.value = fn.apply(this, arguments)\n  }\n  var name = fn.name || 'Function wrapped with `once`'\n  f.onceError = name + \" shouldn't be called more than once\"\n  f.called = false\n  return f\n}\n\n},{\"wrappy\":79}],62:[function(require,module,exports){\n(function (process){(function (){\n'use strict';\n\nif (!process.version ||\n    process.version.indexOf('v0.') === 0 ||\n    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {\n  module.exports = nextTick;\n} else {\n  module.exports = process.nextTick;\n}\n\nfunction nextTick(fn, arg1, arg2, arg3) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('\"callback\" argument must be a function');\n  }\n  var len = arguments.length;\n  var args, i;\n  switch (len) {\n  case 0:\n  case 1:\n    return process.nextTick(fn);\n  case 2:\n    return process.nextTick(function afterTickOne() {\n      fn.call(null, arg1);\n    });\n  case 3:\n    return process.nextTick(function afterTickTwo() {\n      fn.call(null, arg1, arg2);\n    });\n  case 4:\n    return process.nextTick(function afterTickThree() {\n      fn.call(null, arg1, arg2, arg3);\n    });\n  default:\n    args = new Array(len - 1);\n    i = 0;\n    while (i < args.length) {\n      args[i++] = arguments[i];\n    }\n    return process.nextTick(function afterTick() {\n      fn.apply(null, args);\n    });\n  }\n}\n\n}).call(this)}).call(this,require('_process'))\n\n},{\"_process\":63}],63:[function(require,module,exports){\n// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n},{}],64:[function(require,module,exports){\n(function (process){(function (){\nvar once = require('once')\nvar eos = require('end-of-stream')\nvar fs = require('fs') // we only need fs to get the ReadStream and WriteStream prototypes\n\nvar noop = function () {}\nvar ancient = /^v?\\.0/.test(process.version)\n\nvar isFn = function (fn) {\n  return typeof fn === 'function'\n}\n\nvar isFS = function (stream) {\n  if (!ancient) return false // newer node version do not need to care about fs is a special way\n  if (!fs) return false // browser\n  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)\n}\n\nvar isRequest = function (stream) {\n  return stream.setHeader && isFn(stream.abort)\n}\n\nvar destroyer = function (stream, reading, writing, callback) {\n  callback = once(callback)\n\n  var closed = false\n  stream.on('close', function () {\n    closed = true\n  })\n\n  eos(stream, {readable: reading, writable: writing}, function (err) {\n    if (err) return callback(err)\n    closed = true\n    callback()\n  })\n\n  var destroyed = false\n  return function (err) {\n    if (closed) return\n    if (destroyed) return\n    destroyed = true\n\n    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks\n    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want\n\n    if (isFn(stream.destroy)) return stream.destroy()\n\n    callback(err || new Error('stream was destroyed'))\n  }\n}\n\nvar call = function (fn) {\n  fn()\n}\n\nvar pipe = function (from, to) {\n  return from.pipe(to)\n}\n\nvar pump = function () {\n  var streams = Array.prototype.slice.call(arguments)\n  var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop\n\n  if (Array.isArray(streams[0])) streams = streams[0]\n  if (streams.length < 2) throw new Error('pump requires two streams per minimum')\n\n  var error\n  var destroys = streams.map(function (stream, i) {\n    var reading = i < streams.length - 1\n    var writing = i > 0\n    return destroyer(stream, reading, writing, function (err) {\n      if (!error) error = err\n      if (err) destroys.forEach(call)\n      if (reading) return\n      destroys.forEach(call)\n      callback(error)\n    })\n  })\n\n  return streams.reduce(pipe)\n}\n\nmodule.exports = pump\n\n}).call(this)}).call(this,require('_process'))\n\n},{\"_process\":63,\"end-of-stream\":41,\"fs\":37,\"once\":61}],65:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a duplex stream is just a stream that is both readable and writable.\n// Since JS doesn't have multiple prototypal inheritance, this class\n// prototypally inherits from Readable, and then parasitically from\n// Writable.\n\n'use strict';\n\n/*<replacement>*/\n\nvar pna = require('process-nextick-args');\n/*</replacement>*/\n\n/*<replacement>*/\nvar objectKeys = Object.keys || function (obj) {\n  var keys = [];\n  for (var key in obj) {\n    keys.push(key);\n  }return keys;\n};\n/*</replacement>*/\n\nmodule.exports = Duplex;\n\n/*<replacement>*/\nvar util = Object.create(require('core-util-is'));\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nvar Readable = require('./_stream_readable');\nvar Writable = require('./_stream_writable');\n\nutil.inherits(Duplex, Readable);\n\n{\n  // avoid scope creep, the keys array can then be collected\n  var keys = objectKeys(Writable.prototype);\n  for (var v = 0; v < keys.length; v++) {\n    var method = keys[v];\n    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];\n  }\n}\n\nfunction Duplex(options) {\n  if (!(this instanceof Duplex)) return new Duplex(options);\n\n  Readable.call(this, options);\n  Writable.call(this, options);\n\n  if (options && options.readable === false) this.readable = false;\n\n  if (options && options.writable === false) this.writable = false;\n\n  this.allowHalfOpen = true;\n  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;\n\n  this.once('end', onend);\n}\n\nObject.defineProperty(Duplex.prototype, 'writableHighWaterMark', {\n  // making it explicit this property is not enumerable\n  // because otherwise some prototype manipulation in\n  // userland will fail\n  enumerable: false,\n  get: function () {\n    return this._writableState.highWaterMark;\n  }\n});\n\n// the no-half-open enforcer\nfunction onend() {\n  // if we allow half-open state, or if the writable side ended,\n  // then we're ok.\n  if (this.allowHalfOpen || this._writableState.ended) return;\n\n  // no more data can be written.\n  // But allow more writes to happen in this tick.\n  pna.nextTick(onEndNT, this);\n}\n\nfunction onEndNT(self) {\n  self.end();\n}\n\nObject.defineProperty(Duplex.prototype, 'destroyed', {\n  get: function () {\n    if (this._readableState === undefined || this._writableState === undefined) {\n      return false;\n    }\n    return this._readableState.destroyed && this._writableState.destroyed;\n  },\n  set: function (value) {\n    // we ignore the value if the stream\n    // has not been initialized yet\n    if (this._readableState === undefined || this._writableState === undefined) {\n      return;\n    }\n\n    // backward compatibility, the user is explicitly\n    // managing destroyed\n    this._readableState.destroyed = value;\n    this._writableState.destroyed = value;\n  }\n});\n\nDuplex.prototype._destroy = function (err, cb) {\n  this.push(null);\n  this.end();\n\n  pna.nextTick(cb, err);\n};\n},{\"./_stream_readable\":67,\"./_stream_writable\":69,\"core-util-is\":40,\"inherits\":49,\"process-nextick-args\":73}],66:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a passthrough stream.\n// basically just the most minimal sort of Transform stream.\n// Every written chunk gets output as-is.\n\n'use strict';\n\nmodule.exports = PassThrough;\n\nvar Transform = require('./_stream_transform');\n\n/*<replacement>*/\nvar util = Object.create(require('core-util-is'));\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(PassThrough, Transform);\n\nfunction PassThrough(options) {\n  if (!(this instanceof PassThrough)) return new PassThrough(options);\n\n  Transform.call(this, options);\n}\n\nPassThrough.prototype._transform = function (chunk, encoding, cb) {\n  cb(null, chunk);\n};\n},{\"./_stream_transform\":68,\"core-util-is\":40,\"inherits\":49}],67:[function(require,module,exports){\n(function (process,global){(function (){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n'use strict';\n\n/*<replacement>*/\n\nvar pna = require('process-nextick-args');\n/*</replacement>*/\n\nmodule.exports = Readable;\n\n/*<replacement>*/\nvar isArray = require('isarray');\n/*</replacement>*/\n\n/*<replacement>*/\nvar Duplex;\n/*</replacement>*/\n\nReadable.ReadableState = ReadableState;\n\n/*<replacement>*/\nvar EE = require('events').EventEmitter;\n\nvar EElistenerCount = function (emitter, type) {\n  return emitter.listeners(type).length;\n};\n/*</replacement>*/\n\n/*<replacement>*/\nvar Stream = require('./internal/streams/stream');\n/*</replacement>*/\n\n/*<replacement>*/\n\nvar Buffer = require('safe-buffer').Buffer;\nvar OurUint8Array = global.Uint8Array || function () {};\nfunction _uint8ArrayToBuffer(chunk) {\n  return Buffer.from(chunk);\n}\nfunction _isUint8Array(obj) {\n  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;\n}\n\n/*</replacement>*/\n\n/*<replacement>*/\nvar util = Object.create(require('core-util-is'));\nutil.inherits = require('inherits');\n/*</replacement>*/\n\n/*<replacement>*/\nvar debugUtil = require('util');\nvar debug = void 0;\nif (debugUtil && debugUtil.debuglog) {\n  debug = debugUtil.debuglog('stream');\n} else {\n  debug = function () {};\n}\n/*</replacement>*/\n\nvar BufferList = require('./internal/streams/BufferList');\nvar destroyImpl = require('./internal/streams/destroy');\nvar StringDecoder;\n\nutil.inherits(Readable, Stream);\n\nvar kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];\n\nfunction prependListener(emitter, event, fn) {\n  // Sadly this is not cacheable as some libraries bundle their own\n  // event emitter implementation with them.\n  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);\n\n  // This is a hack to make sure that our error handler is attached before any\n  // userland ones.  NEVER DO THIS. This is here only because this code needs\n  // to continue to work with older versions of Node.js that do not include\n  // the prependListener() method. The goal is to eventually remove this hack.\n  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];\n}\n\nfunction ReadableState(options, stream) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  options = options || {};\n\n  // Duplex streams are both readable and writable, but share\n  // the same options object.\n  // However, some cases require setting options to different\n  // values for the readable and the writable sides of the duplex stream.\n  // These options can be provided separately as readableXXX and writableXXX.\n  var isDuplex = stream instanceof Duplex;\n\n  // object stream flag. Used to make read(n) ignore n and to\n  // make all the buffer merging and length checks go away\n  this.objectMode = !!options.objectMode;\n\n  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;\n\n  // the point at which it stops calling _read() to fill the buffer\n  // Note: 0 is a valid value, means \"don't call _read preemptively ever\"\n  var hwm = options.highWaterMark;\n  var readableHwm = options.readableHighWaterMark;\n  var defaultHwm = this.objectMode ? 16 : 16 * 1024;\n\n  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;\n\n  // cast to ints.\n  this.highWaterMark = Math.floor(this.highWaterMark);\n\n  // A linked list is used to store data chunks instead of an array because the\n  // linked list can remove elements from the beginning faster than\n  // array.shift()\n  this.buffer = new BufferList();\n  this.length = 0;\n  this.pipes = null;\n  this.pipesCount = 0;\n  this.flowing = null;\n  this.ended = false;\n  this.endEmitted = false;\n  this.reading = false;\n\n  // a flag to be able to tell if the event 'readable'/'data' is emitted\n  // immediately, or on a later tick.  We set this to true at first, because\n  // any actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first read call.\n  this.sync = true;\n\n  // whenever we return null, then we set a flag to say\n  // that we're awaiting a 'readable' event emission.\n  this.needReadable = false;\n  this.emittedReadable = false;\n  this.readableListening = false;\n  this.resumeScheduled = false;\n\n  // has it been destroyed\n  this.destroyed = false;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // the number of writers that are awaiting a drain event in .pipe()s\n  this.awaitDrain = 0;\n\n  // if true, a maybeReadMore has been scheduled\n  this.readingMore = false;\n\n  this.decoder = null;\n  this.encoding = null;\n  if (options.encoding) {\n    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;\n    this.decoder = new StringDecoder(options.encoding);\n    this.encoding = options.encoding;\n  }\n}\n\nfunction Readable(options) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  if (!(this instanceof Readable)) return new Readable(options);\n\n  this._readableState = new ReadableState(options, this);\n\n  // legacy\n  this.readable = true;\n\n  if (options) {\n    if (typeof options.read === 'function') this._read = options.read;\n\n    if (typeof options.destroy === 'function') this._destroy = options.destroy;\n  }\n\n  Stream.call(this);\n}\n\nObject.defineProperty(Readable.prototype, 'destroyed', {\n  get: function () {\n    if (this._readableState === undefined) {\n      return false;\n    }\n    return this._readableState.destroyed;\n  },\n  set: function (value) {\n    // we ignore the value if the stream\n    // has not been initialized yet\n    if (!this._readableState) {\n      return;\n    }\n\n    // backward compatibility, the user is explicitly\n    // managing destroyed\n    this._readableState.destroyed = value;\n  }\n});\n\nReadable.prototype.destroy = destroyImpl.destroy;\nReadable.prototype._undestroy = destroyImpl.undestroy;\nReadable.prototype._destroy = function (err, cb) {\n  this.push(null);\n  cb(err);\n};\n\n// Manually shove something into the read() buffer.\n// This returns true if the highWaterMark has not been hit yet,\n// similar to how Writable.write() returns true if you should\n// write() some more.\nReadable.prototype.push = function (chunk, encoding) {\n  var state = this._readableState;\n  var skipChunkCheck;\n\n  if (!state.objectMode) {\n    if (typeof chunk === 'string') {\n      encoding = encoding || state.defaultEncoding;\n      if (encoding !== state.encoding) {\n        chunk = Buffer.from(chunk, encoding);\n        encoding = '';\n      }\n      skipChunkCheck = true;\n    }\n  } else {\n    skipChunkCheck = true;\n  }\n\n  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);\n};\n\n// Unshift should *always* be something directly out of read()\nReadable.prototype.unshift = function (chunk) {\n  return readableAddChunk(this, chunk, null, true, false);\n};\n\nfunction readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {\n  var state = stream._readableState;\n  if (chunk === null) {\n    state.reading = false;\n    onEofChunk(stream, state);\n  } else {\n    var er;\n    if (!skipChunkCheck) er = chunkInvalid(state, chunk);\n    if (er) {\n      stream.emit('error', er);\n    } else if (state.objectMode || chunk && chunk.length > 0) {\n      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {\n        chunk = _uint8ArrayToBuffer(chunk);\n      }\n\n      if (addToFront) {\n        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);\n      } else if (state.ended) {\n        stream.emit('error', new Error('stream.push() after EOF'));\n      } else {\n        state.reading = false;\n        if (state.decoder && !encoding) {\n          chunk = state.decoder.write(chunk);\n          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);\n        } else {\n          addChunk(stream, state, chunk, false);\n        }\n      }\n    } else if (!addToFront) {\n      state.reading = false;\n    }\n  }\n\n  return needMoreData(state);\n}\n\nfunction addChunk(stream, state, chunk, addToFront) {\n  if (state.flowing && state.length === 0 && !state.sync) {\n    stream.emit('data', chunk);\n    stream.read(0);\n  } else {\n    // update the buffer info.\n    state.length += state.objectMode ? 1 : chunk.length;\n    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);\n\n    if (state.needReadable) emitReadable(stream);\n  }\n  maybeReadMore(stream, state);\n}\n\nfunction chunkInvalid(state, chunk) {\n  var er;\n  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {\n    er = new TypeError('Invalid non-string/buffer chunk');\n  }\n  return er;\n}\n\n// if it's past the high water mark, we can push in some more.\n// Also, if we have no data yet, we can stand some\n// more bytes.  This is to work around cases where hwm=0,\n// such as the repl.  Also, if the push() triggered a\n// readable event, and the user called read(largeNumber) such that\n// needReadable was set, then we ought to push more, so that another\n// 'readable' event will be triggered.\nfunction needMoreData(state) {\n  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);\n}\n\nReadable.prototype.isPaused = function () {\n  return this._readableState.flowing === false;\n};\n\n// backwards compatibility.\nReadable.prototype.setEncoding = function (enc) {\n  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;\n  this._readableState.decoder = new StringDecoder(enc);\n  this._readableState.encoding = enc;\n  return this;\n};\n\n// Don't raise the hwm > 8MB\nvar MAX_HWM = 0x800000;\nfunction computeNewHighWaterMark(n) {\n  if (n >= MAX_HWM) {\n    n = MAX_HWM;\n  } else {\n    // Get the next highest power of 2 to prevent increasing hwm excessively in\n    // tiny amounts\n    n--;\n    n |= n >>> 1;\n    n |= n >>> 2;\n    n |= n >>> 4;\n    n |= n >>> 8;\n    n |= n >>> 16;\n    n++;\n  }\n  return n;\n}\n\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction howMuchToRead(n, state) {\n  if (n <= 0 || state.length === 0 && state.ended) return 0;\n  if (state.objectMode) return 1;\n  if (n !== n) {\n    // Only flow one buffer at a time\n    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;\n  }\n  // If we're asking for more than the current hwm, then raise the hwm.\n  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);\n  if (n <= state.length) return n;\n  // Don't have enough\n  if (!state.ended) {\n    state.needReadable = true;\n    return 0;\n  }\n  return state.length;\n}\n\n// you can override either this method, or the async _read(n) below.\nReadable.prototype.read = function (n) {\n  debug('read', n);\n  n = parseInt(n, 10);\n  var state = this._readableState;\n  var nOrig = n;\n\n  if (n !== 0) state.emittedReadable = false;\n\n  // if we're doing read(0) to trigger a readable event, but we\n  // already have a bunch of data in the buffer, then just trigger\n  // the 'readable' event and move on.\n  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {\n    debug('read: emitReadable', state.length, state.ended);\n    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);\n    return null;\n  }\n\n  n = howMuchToRead(n, state);\n\n  // if we've ended, and we're now clear, then finish it up.\n  if (n === 0 && state.ended) {\n    if (state.length === 0) endReadable(this);\n    return null;\n  }\n\n  // All the actual chunk generation logic needs to be\n  // *below* the call to _read.  The reason is that in certain\n  // synthetic stream cases, such as passthrough streams, _read\n  // may be a completely synchronous operation which may change\n  // the state of the read buffer, providing enough data when\n  // before there was *not* enough.\n  //\n  // So, the steps are:\n  // 1. Figure out what the state of things will be after we do\n  // a read from the buffer.\n  //\n  // 2. If that resulting state will trigger a _read, then call _read.\n  // Note that this may be asynchronous, or synchronous.  Yes, it is\n  // deeply ugly to write APIs this way, but that still doesn't mean\n  // that the Readable class should behave improperly, as streams are\n  // designed to be sync/async agnostic.\n  // Take note if the _read call is sync or async (ie, if the read call\n  // has returned yet), so that we know whether or not it's safe to emit\n  // 'readable' etc.\n  //\n  // 3. Actually pull the requested chunks out of the buffer and return.\n\n  // if we need a readable event, then we need to do some reading.\n  var doRead = state.needReadable;\n  debug('need readable', doRead);\n\n  // if we currently have less than the highWaterMark, then also read some\n  if (state.length === 0 || state.length - n < state.highWaterMark) {\n    doRead = true;\n    debug('length less than watermark', doRead);\n  }\n\n  // however, if we've ended, then there's no point, and if we're already\n  // reading, then it's unnecessary.\n  if (state.ended || state.reading) {\n    doRead = false;\n    debug('reading or ended', doRead);\n  } else if (doRead) {\n    debug('do read');\n    state.reading = true;\n    state.sync = true;\n    // if the length is currently zero, then we *need* a readable event.\n    if (state.length === 0) state.needReadable = true;\n    // call internal read method\n    this._read(state.highWaterMark);\n    state.sync = false;\n    // If _read pushed data synchronously, then `reading` will be false,\n    // and we need to re-evaluate how much data we can return to the user.\n    if (!state.reading) n = howMuchToRead(nOrig, state);\n  }\n\n  var ret;\n  if (n > 0) ret = fromList(n, state);else ret = null;\n\n  if (ret === null) {\n    state.needReadable = true;\n    n = 0;\n  } else {\n    state.length -= n;\n  }\n\n  if (state.length === 0) {\n    // If we have nothing in the buffer, then we want to know\n    // as soon as we *do* get something into the buffer.\n    if (!state.ended) state.needReadable = true;\n\n    // If we tried to read() past the EOF, then emit end on the next tick.\n    if (nOrig !== n && state.ended) endReadable(this);\n  }\n\n  if (ret !== null) this.emit('data', ret);\n\n  return ret;\n};\n\nfunction onEofChunk(stream, state) {\n  if (state.ended) return;\n  if (state.decoder) {\n    var chunk = state.decoder.end();\n    if (chunk && chunk.length) {\n      state.buffer.push(chunk);\n      state.length += state.objectMode ? 1 : chunk.length;\n    }\n  }\n  state.ended = true;\n\n  // emit 'readable' now to make sure it gets picked up.\n  emitReadable(stream);\n}\n\n// Don't emit readable right away in sync mode, because this can trigger\n// another read() call => stack overflow.  This way, it might trigger\n// a nextTick recursion warning, but that's not so bad.\nfunction emitReadable(stream) {\n  var state = stream._readableState;\n  state.needReadable = false;\n  if (!state.emittedReadable) {\n    debug('emitReadable', state.flowing);\n    state.emittedReadable = true;\n    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);\n  }\n}\n\nfunction emitReadable_(stream) {\n  debug('emit readable');\n  stream.emit('readable');\n  flow(stream);\n}\n\n// at this point, the user has presumably seen the 'readable' event,\n// and called read() to consume some data.  that may have triggered\n// in turn another _read(n) call, in which case reading = true if\n// it's in progress.\n// However, if we're not ended, or reading, and the length < hwm,\n// then go ahead and try to read some more preemptively.\nfunction maybeReadMore(stream, state) {\n  if (!state.readingMore) {\n    state.readingMore = true;\n    pna.nextTick(maybeReadMore_, stream, state);\n  }\n}\n\nfunction maybeReadMore_(stream, state) {\n  var len = state.length;\n  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {\n    debug('maybeReadMore read 0');\n    stream.read(0);\n    if (len === state.length)\n      // didn't get any data, stop spinning.\n      break;else len = state.length;\n  }\n  state.readingMore = false;\n}\n\n// abstract method.  to be overridden in specific implementation classes.\n// call cb(er, data) where data is <= n in length.\n// for virtual (non-string, non-buffer) streams, \"length\" is somewhat\n// arbitrary, and perhaps not very meaningful.\nReadable.prototype._read = function (n) {\n  this.emit('error', new Error('_read() is not implemented'));\n};\n\nReadable.prototype.pipe = function (dest, pipeOpts) {\n  var src = this;\n  var state = this._readableState;\n\n  switch (state.pipesCount) {\n    case 0:\n      state.pipes = dest;\n      break;\n    case 1:\n      state.pipes = [state.pipes, dest];\n      break;\n    default:\n      state.pipes.push(dest);\n      break;\n  }\n  state.pipesCount += 1;\n  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);\n\n  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;\n\n  var endFn = doEnd ? onend : unpipe;\n  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);\n\n  dest.on('unpipe', onunpipe);\n  function onunpipe(readable, unpipeInfo) {\n    debug('onunpipe');\n    if (readable === src) {\n      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {\n        unpipeInfo.hasUnpiped = true;\n        cleanup();\n      }\n    }\n  }\n\n  function onend() {\n    debug('onend');\n    dest.end();\n  }\n\n  // when the dest drains, it reduces the awaitDrain counter\n  // on the source.  This would be more elegant with a .once()\n  // handler in flow(), but adding and removing repeatedly is\n  // too slow.\n  var ondrain = pipeOnDrain(src);\n  dest.on('drain', ondrain);\n\n  var cleanedUp = false;\n  function cleanup() {\n    debug('cleanup');\n    // cleanup event handlers once the pipe is broken\n    dest.removeListener('close', onclose);\n    dest.removeListener('finish', onfinish);\n    dest.removeListener('drain', ondrain);\n    dest.removeListener('error', onerror);\n    dest.removeListener('unpipe', onunpipe);\n    src.removeListener('end', onend);\n    src.removeListener('end', unpipe);\n    src.removeListener('data', ondata);\n\n    cleanedUp = true;\n\n    // if the reader is waiting for a drain event from this\n    // specific writer, then it would cause it to never start\n    // flowing again.\n    // So, if this is awaiting a drain, then we just call it now.\n    // If we don't know, then assume that we are waiting for one.\n    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();\n  }\n\n  // If the user pushes more data while we're writing to dest then we'll end up\n  // in ondata again. However, we only want to increase awaitDrain once because\n  // dest will only emit one 'drain' event for the multiple writes.\n  // => Introduce a guard on increasing awaitDrain.\n  var increasedAwaitDrain = false;\n  src.on('data', ondata);\n  function ondata(chunk) {\n    debug('ondata');\n    increasedAwaitDrain = false;\n    var ret = dest.write(chunk);\n    if (false === ret && !increasedAwaitDrain) {\n      // If the user unpiped during `dest.write()`, it is possible\n      // to get stuck in a permanently paused state if that write\n      // also returned false.\n      // => Check whether `dest` is still a piping destination.\n      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {\n        debug('false write response, pause', src._readableState.awaitDrain);\n        src._readableState.awaitDrain++;\n        increasedAwaitDrain = true;\n      }\n      src.pause();\n    }\n  }\n\n  // if the dest has an error, then stop piping into it.\n  // however, don't suppress the throwing behavior for this.\n  function onerror(er) {\n    debug('onerror', er);\n    unpipe();\n    dest.removeListener('error', onerror);\n    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);\n  }\n\n  // Make sure our error handler is attached before userland ones.\n  prependListener(dest, 'error', onerror);\n\n  // Both close and finish should trigger unpipe, but only once.\n  function onclose() {\n    dest.removeListener('finish', onfinish);\n    unpipe();\n  }\n  dest.once('close', onclose);\n  function onfinish() {\n    debug('onfinish');\n    dest.removeListener('close', onclose);\n    unpipe();\n  }\n  dest.once('finish', onfinish);\n\n  function unpipe() {\n    debug('unpipe');\n    src.unpipe(dest);\n  }\n\n  // tell the dest that it's being piped to\n  dest.emit('pipe', src);\n\n  // start the flow if it hasn't been started already.\n  if (!state.flowing) {\n    debug('pipe resume');\n    src.resume();\n  }\n\n  return dest;\n};\n\nfunction pipeOnDrain(src) {\n  return function () {\n    var state = src._readableState;\n    debug('pipeOnDrain', state.awaitDrain);\n    if (state.awaitDrain) state.awaitDrain--;\n    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {\n      state.flowing = true;\n      flow(src);\n    }\n  };\n}\n\nReadable.prototype.unpipe = function (dest) {\n  var state = this._readableState;\n  var unpipeInfo = { hasUnpiped: false };\n\n  // if we're not piping anywhere, then do nothing.\n  if (state.pipesCount === 0) return this;\n\n  // just one destination.  most common case.\n  if (state.pipesCount === 1) {\n    // passed in one, but it's not the right one.\n    if (dest && dest !== state.pipes) return this;\n\n    if (!dest) dest = state.pipes;\n\n    // got a match.\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n    if (dest) dest.emit('unpipe', this, unpipeInfo);\n    return this;\n  }\n\n  // slow case. multiple pipe destinations.\n\n  if (!dest) {\n    // remove all.\n    var dests = state.pipes;\n    var len = state.pipesCount;\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n\n    for (var i = 0; i < len; i++) {\n      dests[i].emit('unpipe', this, unpipeInfo);\n    }return this;\n  }\n\n  // try to find the right one.\n  var index = indexOf(state.pipes, dest);\n  if (index === -1) return this;\n\n  state.pipes.splice(index, 1);\n  state.pipesCount -= 1;\n  if (state.pipesCount === 1) state.pipes = state.pipes[0];\n\n  dest.emit('unpipe', this, unpipeInfo);\n\n  return this;\n};\n\n// set up data events if they are asked for\n// Ensure readable listeners eventually get something\nReadable.prototype.on = function (ev, fn) {\n  var res = Stream.prototype.on.call(this, ev, fn);\n\n  if (ev === 'data') {\n    // Start flowing on next tick if stream isn't explicitly paused\n    if (this._readableState.flowing !== false) this.resume();\n  } else if (ev === 'readable') {\n    var state = this._readableState;\n    if (!state.endEmitted && !state.readableListening) {\n      state.readableListening = state.needReadable = true;\n      state.emittedReadable = false;\n      if (!state.reading) {\n        pna.nextTick(nReadingNextTick, this);\n      } else if (state.length) {\n        emitReadable(this);\n      }\n    }\n  }\n\n  return res;\n};\nReadable.prototype.addListener = Readable.prototype.on;\n\nfunction nReadingNextTick(self) {\n  debug('readable nexttick read 0');\n  self.read(0);\n}\n\n// pause() and resume() are remnants of the legacy readable stream API\n// If the user uses them, then switch into old mode.\nReadable.prototype.resume = function () {\n  var state = this._readableState;\n  if (!state.flowing) {\n    debug('resume');\n    state.flowing = true;\n    resume(this, state);\n  }\n  return this;\n};\n\nfunction resume(stream, state) {\n  if (!state.resumeScheduled) {\n    state.resumeScheduled = true;\n    pna.nextTick(resume_, stream, state);\n  }\n}\n\nfunction resume_(stream, state) {\n  if (!state.reading) {\n    debug('resume read 0');\n    stream.read(0);\n  }\n\n  state.resumeScheduled = false;\n  state.awaitDrain = 0;\n  stream.emit('resume');\n  flow(stream);\n  if (state.flowing && !state.reading) stream.read(0);\n}\n\nReadable.prototype.pause = function () {\n  debug('call pause flowing=%j', this._readableState.flowing);\n  if (false !== this._readableState.flowing) {\n    debug('pause');\n    this._readableState.flowing = false;\n    this.emit('pause');\n  }\n  return this;\n};\n\nfunction flow(stream) {\n  var state = stream._readableState;\n  debug('flow', state.flowing);\n  while (state.flowing && stream.read() !== null) {}\n}\n\n// wrap an old-style stream as the async data source.\n// This is *not* part of the readable stream interface.\n// It is an ugly unfortunate mess of history.\nReadable.prototype.wrap = function (stream) {\n  var _this = this;\n\n  var state = this._readableState;\n  var paused = false;\n\n  stream.on('end', function () {\n    debug('wrapped end');\n    if (state.decoder && !state.ended) {\n      var chunk = state.decoder.end();\n      if (chunk && chunk.length) _this.push(chunk);\n    }\n\n    _this.push(null);\n  });\n\n  stream.on('data', function (chunk) {\n    debug('wrapped data');\n    if (state.decoder) chunk = state.decoder.write(chunk);\n\n    // don't skip over falsy values in objectMode\n    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;\n\n    var ret = _this.push(chunk);\n    if (!ret) {\n      paused = true;\n      stream.pause();\n    }\n  });\n\n  // proxy all the other methods.\n  // important when wrapping filters and duplexes.\n  for (var i in stream) {\n    if (this[i] === undefined && typeof stream[i] === 'function') {\n      this[i] = function (method) {\n        return function () {\n          return stream[method].apply(stream, arguments);\n        };\n      }(i);\n    }\n  }\n\n  // proxy certain important events.\n  for (var n = 0; n < kProxyEvents.length; n++) {\n    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));\n  }\n\n  // when we try to consume some more bytes, simply unpause the\n  // underlying stream.\n  this._read = function (n) {\n    debug('wrapped _read', n);\n    if (paused) {\n      paused = false;\n      stream.resume();\n    }\n  };\n\n  return this;\n};\n\nObject.defineProperty(Readable.prototype, 'readableHighWaterMark', {\n  // making it explicit this property is not enumerable\n  // because otherwise some prototype manipulation in\n  // userland will fail\n  enumerable: false,\n  get: function () {\n    return this._readableState.highWaterMark;\n  }\n});\n\n// exposed for testing purposes only.\nReadable._fromList = fromList;\n\n// Pluck off n bytes from an array of buffers.\n// Length is the combined lengths of all the buffers in the list.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction fromList(n, state) {\n  // nothing buffered\n  if (state.length === 0) return null;\n\n  var ret;\n  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {\n    // read it all, truncate the list\n    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);\n    state.buffer.clear();\n  } else {\n    // read part of list\n    ret = fromListPartial(n, state.buffer, state.decoder);\n  }\n\n  return ret;\n}\n\n// Extracts only enough buffered data to satisfy the amount requested.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction fromListPartial(n, list, hasStrings) {\n  var ret;\n  if (n < list.head.data.length) {\n    // slice is the same for buffers and strings\n    ret = list.head.data.slice(0, n);\n    list.head.data = list.head.data.slice(n);\n  } else if (n === list.head.data.length) {\n    // first chunk is a perfect match\n    ret = list.shift();\n  } else {\n    // result spans more than one buffer\n    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);\n  }\n  return ret;\n}\n\n// Copies a specified amount of characters from the list of buffered data\n// chunks.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction copyFromBufferString(n, list) {\n  var p = list.head;\n  var c = 1;\n  var ret = p.data;\n  n -= ret.length;\n  while (p = p.next) {\n    var str = p.data;\n    var nb = n > str.length ? str.length : n;\n    if (nb === str.length) ret += str;else ret += str.slice(0, n);\n    n -= nb;\n    if (n === 0) {\n      if (nb === str.length) {\n        ++c;\n        if (p.next) list.head = p.next;else list.head = list.tail = null;\n      } else {\n        list.head = p;\n        p.data = str.slice(nb);\n      }\n      break;\n    }\n    ++c;\n  }\n  list.length -= c;\n  return ret;\n}\n\n// Copies a specified amount of bytes from the list of buffered data chunks.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction copyFromBuffer(n, list) {\n  var ret = Buffer.allocUnsafe(n);\n  var p = list.head;\n  var c = 1;\n  p.data.copy(ret);\n  n -= p.data.length;\n  while (p = p.next) {\n    var buf = p.data;\n    var nb = n > buf.length ? buf.length : n;\n    buf.copy(ret, ret.length - n, 0, nb);\n    n -= nb;\n    if (n === 0) {\n      if (nb === buf.length) {\n        ++c;\n        if (p.next) list.head = p.next;else list.head = list.tail = null;\n      } else {\n        list.head = p;\n        p.data = buf.slice(nb);\n      }\n      break;\n    }\n    ++c;\n  }\n  list.length -= c;\n  return ret;\n}\n\nfunction endReadable(stream) {\n  var state = stream._readableState;\n\n  // If we get here before consuming all the bytes, then that is a\n  // bug in node.  Should never happen.\n  if (state.length > 0) throw new Error('\"endReadable()\" called on non-empty stream');\n\n  if (!state.endEmitted) {\n    state.ended = true;\n    pna.nextTick(endReadableNT, state, stream);\n  }\n}\n\nfunction endReadableNT(state, stream) {\n  // Check that we didn't get one last unshift.\n  if (!state.endEmitted && state.length === 0) {\n    state.endEmitted = true;\n    stream.readable = false;\n    stream.emit('end');\n  }\n}\n\nfunction indexOf(xs, x) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    if (xs[i] === x) return i;\n  }\n  return -1;\n}\n}).call(this)}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n\n},{\"./_stream_duplex\":65,\"./internal/streams/BufferList\":70,\"./internal/streams/destroy\":71,\"./internal/streams/stream\":72,\"_process\":63,\"core-util-is\":40,\"events\":39,\"inherits\":49,\"isarray\":52,\"process-nextick-args\":73,\"safe-buffer\":74,\"string_decoder/\":75,\"util\":37}],68:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a transform stream is a readable/writable stream where you do\n// something with the data.  Sometimes it's called a \"filter\",\n// but that's not a great name for it, since that implies a thing where\n// some bits pass through, and others are simply ignored.  (That would\n// be a valid example of a transform, of course.)\n//\n// While the output is causally related to the input, it's not a\n// necessarily symmetric or synchronous transformation.  For example,\n// a zlib stream might take multiple plain-text writes(), and then\n// emit a single compressed chunk some time in the future.\n//\n// Here's how this works:\n//\n// The Transform stream has all the aspects of the readable and writable\n// stream classes.  When you write(chunk), that calls _write(chunk,cb)\n// internally, and returns false if there's a lot of pending writes\n// buffered up.  When you call read(), that calls _read(n) until\n// there's enough pending readable data buffered up.\n//\n// In a transform stream, the written data is placed in a buffer.  When\n// _read(n) is called, it transforms the queued up data, calling the\n// buffered _write cb's as it consumes chunks.  If consuming a single\n// written chunk would result in multiple output chunks, then the first\n// outputted bit calls the readcb, and subsequent chunks just go into\n// the read buffer, and will cause it to emit 'readable' if necessary.\n//\n// This way, back-pressure is actually determined by the reading side,\n// since _read has to be called to start processing a new chunk.  However,\n// a pathological inflate type of transform can cause excessive buffering\n// here.  For example, imagine a stream where every byte of input is\n// interpreted as an integer from 0-255, and then results in that many\n// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in\n// 1kb of data being output.  In this case, you could write a very small\n// amount of input, and end up with a very large amount of output.  In\n// such a pathological inflating mechanism, there'd be no way to tell\n// the system to stop doing the transform.  A single 4MB write could\n// cause the system to run out of memory.\n//\n// However, even in such a pathological case, only a single written chunk\n// would be consumed, and then the rest would wait (un-transformed) until\n// the results of the previous transformed chunk were consumed.\n\n'use strict';\n\nmodule.exports = Transform;\n\nvar Duplex = require('./_stream_duplex');\n\n/*<replacement>*/\nvar util = Object.create(require('core-util-is'));\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(Transform, Duplex);\n\nfunction afterTransform(er, data) {\n  var ts = this._transformState;\n  ts.transforming = false;\n\n  var cb = ts.writecb;\n\n  if (!cb) {\n    return this.emit('error', new Error('write callback called multiple times'));\n  }\n\n  ts.writechunk = null;\n  ts.writecb = null;\n\n  if (data != null) // single equals check for both `null` and `undefined`\n    this.push(data);\n\n  cb(er);\n\n  var rs = this._readableState;\n  rs.reading = false;\n  if (rs.needReadable || rs.length < rs.highWaterMark) {\n    this._read(rs.highWaterMark);\n  }\n}\n\nfunction Transform(options) {\n  if (!(this instanceof Transform)) return new Transform(options);\n\n  Duplex.call(this, options);\n\n  this._transformState = {\n    afterTransform: afterTransform.bind(this),\n    needTransform: false,\n    transforming: false,\n    writecb: null,\n    writechunk: null,\n    writeencoding: null\n  };\n\n  // start out asking for a readable event once data is transformed.\n  this._readableState.needReadable = true;\n\n  // we have implemented the _read method, and done the other things\n  // that Readable wants before the first _read call, so unset the\n  // sync guard flag.\n  this._readableState.sync = false;\n\n  if (options) {\n    if (typeof options.transform === 'function') this._transform = options.transform;\n\n    if (typeof options.flush === 'function') this._flush = options.flush;\n  }\n\n  // When the writable side finishes, then flush out anything remaining.\n  this.on('prefinish', prefinish);\n}\n\nfunction prefinish() {\n  var _this = this;\n\n  if (typeof this._flush === 'function') {\n    this._flush(function (er, data) {\n      done(_this, er, data);\n    });\n  } else {\n    done(this, null, null);\n  }\n}\n\nTransform.prototype.push = function (chunk, encoding) {\n  this._transformState.needTransform = false;\n  return Duplex.prototype.push.call(this, chunk, encoding);\n};\n\n// This is the part where you do stuff!\n// override this function in implementation classes.\n// 'chunk' is an input chunk.\n//\n// Call `push(newChunk)` to pass along transformed output\n// to the readable side.  You may call 'push' zero or more times.\n//\n// Call `cb(err)` when you are done with this chunk.  If you pass\n// an error, then that'll put the hurt on the whole operation.  If you\n// never call cb(), then you'll never get another chunk.\nTransform.prototype._transform = function (chunk, encoding, cb) {\n  throw new Error('_transform() is not implemented');\n};\n\nTransform.prototype._write = function (chunk, encoding, cb) {\n  var ts = this._transformState;\n  ts.writecb = cb;\n  ts.writechunk = chunk;\n  ts.writeencoding = encoding;\n  if (!ts.transforming) {\n    var rs = this._readableState;\n    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);\n  }\n};\n\n// Doesn't matter what the args are here.\n// _transform does all the work.\n// That we got here means that the readable side wants more data.\nTransform.prototype._read = function (n) {\n  var ts = this._transformState;\n\n  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {\n    ts.transforming = true;\n    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);\n  } else {\n    // mark that we need a transform, so that any data that comes in\n    // will get processed, now that we've asked for it.\n    ts.needTransform = true;\n  }\n};\n\nTransform.prototype._destroy = function (err, cb) {\n  var _this2 = this;\n\n  Duplex.prototype._destroy.call(this, err, function (err2) {\n    cb(err2);\n    _this2.emit('close');\n  });\n};\n\nfunction done(stream, er, data) {\n  if (er) return stream.emit('error', er);\n\n  if (data != null) // single equals check for both `null` and `undefined`\n    stream.push(data);\n\n  // if there's nothing in the write buffer, then that means\n  // that nothing more will ever be provided\n  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');\n\n  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');\n\n  return stream.push(null);\n}\n},{\"./_stream_duplex\":65,\"core-util-is\":40,\"inherits\":49}],69:[function(require,module,exports){\n(function (process,global,setImmediate){(function (){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// A bit simpler than readable streams.\n// Implement an async ._write(chunk, encoding, cb), and it'll handle all\n// the drain event emission and buffering.\n\n'use strict';\n\n/*<replacement>*/\n\nvar pna = require('process-nextick-args');\n/*</replacement>*/\n\nmodule.exports = Writable;\n\n/* <replacement> */\nfunction WriteReq(chunk, encoding, cb) {\n  this.chunk = chunk;\n  this.encoding = encoding;\n  this.callback = cb;\n  this.next = null;\n}\n\n// It seems a linked list but it is not\n// there will be only 2 of these for each stream\nfunction CorkedRequest(state) {\n  var _this = this;\n\n  this.next = null;\n  this.entry = null;\n  this.finish = function () {\n    onCorkedFinish(_this, state);\n  };\n}\n/* </replacement> */\n\n/*<replacement>*/\nvar asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;\n/*</replacement>*/\n\n/*<replacement>*/\nvar Duplex;\n/*</replacement>*/\n\nWritable.WritableState = WritableState;\n\n/*<replacement>*/\nvar util = Object.create(require('core-util-is'));\nutil.inherits = require('inherits');\n/*</replacement>*/\n\n/*<replacement>*/\nvar internalUtil = {\n  deprecate: require('util-deprecate')\n};\n/*</replacement>*/\n\n/*<replacement>*/\nvar Stream = require('./internal/streams/stream');\n/*</replacement>*/\n\n/*<replacement>*/\n\nvar Buffer = require('safe-buffer').Buffer;\nvar OurUint8Array = global.Uint8Array || function () {};\nfunction _uint8ArrayToBuffer(chunk) {\n  return Buffer.from(chunk);\n}\nfunction _isUint8Array(obj) {\n  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;\n}\n\n/*</replacement>*/\n\nvar destroyImpl = require('./internal/streams/destroy');\n\nutil.inherits(Writable, Stream);\n\nfunction nop() {}\n\nfunction WritableState(options, stream) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  options = options || {};\n\n  // Duplex streams are both readable and writable, but share\n  // the same options object.\n  // However, some cases require setting options to different\n  // values for the readable and the writable sides of the duplex stream.\n  // These options can be provided separately as readableXXX and writableXXX.\n  var isDuplex = stream instanceof Duplex;\n\n  // object stream flag to indicate whether or not this stream\n  // contains buffers or objects.\n  this.objectMode = !!options.objectMode;\n\n  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;\n\n  // the point at which write() starts returning false\n  // Note: 0 is a valid value, means that we always return false if\n  // the entire buffer is not flushed immediately on write()\n  var hwm = options.highWaterMark;\n  var writableHwm = options.writableHighWaterMark;\n  var defaultHwm = this.objectMode ? 16 : 16 * 1024;\n\n  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;\n\n  // cast to ints.\n  this.highWaterMark = Math.floor(this.highWaterMark);\n\n  // if _final has been called\n  this.finalCalled = false;\n\n  // drain event flag.\n  this.needDrain = false;\n  // at the start of calling end()\n  this.ending = false;\n  // when end() has been called, and returned\n  this.ended = false;\n  // when 'finish' is emitted\n  this.finished = false;\n\n  // has it been destroyed\n  this.destroyed = false;\n\n  // should we decode strings into buffers before passing to _write?\n  // this is here so that some node-core streams can optimize string\n  // handling at a lower level.\n  var noDecode = options.decodeStrings === false;\n  this.decodeStrings = !noDecode;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // not an actual buffer we keep track of, but a measurement\n  // of how much we're waiting to get pushed to some underlying\n  // socket or file.\n  this.length = 0;\n\n  // a flag to see when we're in the middle of a write.\n  this.writing = false;\n\n  // when true all writes will be buffered until .uncork() call\n  this.corked = 0;\n\n  // a flag to be able to tell if the onwrite cb is called immediately,\n  // or on a later tick.  We set this to true at first, because any\n  // actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first write call.\n  this.sync = true;\n\n  // a flag to know if we're processing previously buffered items, which\n  // may call the _write() callback in the same tick, so that we don't\n  // end up in an overlapped onwrite situation.\n  this.bufferProcessing = false;\n\n  // the callback that's passed to _write(chunk,cb)\n  this.onwrite = function (er) {\n    onwrite(stream, er);\n  };\n\n  // the callback that the user supplies to write(chunk,encoding,cb)\n  this.writecb = null;\n\n  // the amount that is being written when _write is called.\n  this.writelen = 0;\n\n  this.bufferedRequest = null;\n  this.lastBufferedRequest = null;\n\n  // number of pending user-supplied write callbacks\n  // this must be 0 before 'finish' can be emitted\n  this.pendingcb = 0;\n\n  // emit prefinish if the only thing we're waiting for is _write cbs\n  // This is relevant for synchronous Transform streams\n  this.prefinished = false;\n\n  // True if the error was already emitted and should not be thrown again\n  this.errorEmitted = false;\n\n  // count buffered requests\n  this.bufferedRequestCount = 0;\n\n  // allocate the first CorkedRequest, there is always\n  // one allocated and free to use, and we maintain at most two\n  this.corkedRequestsFree = new CorkedRequest(this);\n}\n\nWritableState.prototype.getBuffer = function getBuffer() {\n  var current = this.bufferedRequest;\n  var out = [];\n  while (current) {\n    out.push(current);\n    current = current.next;\n  }\n  return out;\n};\n\n(function () {\n  try {\n    Object.defineProperty(WritableState.prototype, 'buffer', {\n      get: internalUtil.deprecate(function () {\n        return this.getBuffer();\n      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')\n    });\n  } catch (_) {}\n})();\n\n// Test _writableState for inheritance to account for Duplex streams,\n// whose prototype chain only points to Readable.\nvar realHasInstance;\nif (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {\n  realHasInstance = Function.prototype[Symbol.hasInstance];\n  Object.defineProperty(Writable, Symbol.hasInstance, {\n    value: function (object) {\n      if (realHasInstance.call(this, object)) return true;\n      if (this !== Writable) return false;\n\n      return object && object._writableState instanceof WritableState;\n    }\n  });\n} else {\n  realHasInstance = function (object) {\n    return object instanceof this;\n  };\n}\n\nfunction Writable(options) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  // Writable ctor is applied to Duplexes, too.\n  // `realHasInstance` is necessary because using plain `instanceof`\n  // would return false, as no `_writableState` property is attached.\n\n  // Trying to use the custom `instanceof` for Writable here will also break the\n  // Node.js LazyTransform implementation, which has a non-trivial getter for\n  // `_writableState` that would lead to infinite recursion.\n  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {\n    return new Writable(options);\n  }\n\n  this._writableState = new WritableState(options, this);\n\n  // legacy.\n  this.writable = true;\n\n  if (options) {\n    if (typeof options.write === 'function') this._write = options.write;\n\n    if (typeof options.writev === 'function') this._writev = options.writev;\n\n    if (typeof options.destroy === 'function') this._destroy = options.destroy;\n\n    if (typeof options.final === 'function') this._final = options.final;\n  }\n\n  Stream.call(this);\n}\n\n// Otherwise people can pipe Writable streams, which is just wrong.\nWritable.prototype.pipe = function () {\n  this.emit('error', new Error('Cannot pipe, not readable'));\n};\n\nfunction writeAfterEnd(stream, cb) {\n  var er = new Error('write after end');\n  // TODO: defer error events consistently everywhere, not just the cb\n  stream.emit('error', er);\n  pna.nextTick(cb, er);\n}\n\n// Checks that a user-supplied chunk is valid, especially for the particular\n// mode the stream is in. Currently this means that `null` is never accepted\n// and undefined/non-string values are only allowed in object mode.\nfunction validChunk(stream, state, chunk, cb) {\n  var valid = true;\n  var er = false;\n\n  if (chunk === null) {\n    er = new TypeError('May not write null values to stream');\n  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {\n    er = new TypeError('Invalid non-string/buffer chunk');\n  }\n  if (er) {\n    stream.emit('error', er);\n    pna.nextTick(cb, er);\n    valid = false;\n  }\n  return valid;\n}\n\nWritable.prototype.write = function (chunk, encoding, cb) {\n  var state = this._writableState;\n  var ret = false;\n  var isBuf = !state.objectMode && _isUint8Array(chunk);\n\n  if (isBuf && !Buffer.isBuffer(chunk)) {\n    chunk = _uint8ArrayToBuffer(chunk);\n  }\n\n  if (typeof encoding === 'function') {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;\n\n  if (typeof cb !== 'function') cb = nop;\n\n  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {\n    state.pendingcb++;\n    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);\n  }\n\n  return ret;\n};\n\nWritable.prototype.cork = function () {\n  var state = this._writableState;\n\n  state.corked++;\n};\n\nWritable.prototype.uncork = function () {\n  var state = this._writableState;\n\n  if (state.corked) {\n    state.corked--;\n\n    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);\n  }\n};\n\nWritable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {\n  // node::ParseEncoding() requires lower case.\n  if (typeof encoding === 'string') encoding = encoding.toLowerCase();\n  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);\n  this._writableState.defaultEncoding = encoding;\n  return this;\n};\n\nfunction decodeChunk(state, chunk, encoding) {\n  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {\n    chunk = Buffer.from(chunk, encoding);\n  }\n  return chunk;\n}\n\nObject.defineProperty(Writable.prototype, 'writableHighWaterMark', {\n  // making it explicit this property is not enumerable\n  // because otherwise some prototype manipulation in\n  // userland will fail\n  enumerable: false,\n  get: function () {\n    return this._writableState.highWaterMark;\n  }\n});\n\n// if we're already writing something, then just put this\n// in the queue, and wait our turn.  Otherwise, call _write\n// If we return false, then we need a drain event, so set that flag.\nfunction writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {\n  if (!isBuf) {\n    var newChunk = decodeChunk(state, chunk, encoding);\n    if (chunk !== newChunk) {\n      isBuf = true;\n      encoding = 'buffer';\n      chunk = newChunk;\n    }\n  }\n  var len = state.objectMode ? 1 : chunk.length;\n\n  state.length += len;\n\n  var ret = state.length < state.highWaterMark;\n  // we must ensure that previous needDrain will not be reset to false.\n  if (!ret) state.needDrain = true;\n\n  if (state.writing || state.corked) {\n    var last = state.lastBufferedRequest;\n    state.lastBufferedRequest = {\n      chunk: chunk,\n      encoding: encoding,\n      isBuf: isBuf,\n      callback: cb,\n      next: null\n    };\n    if (last) {\n      last.next = state.lastBufferedRequest;\n    } else {\n      state.bufferedRequest = state.lastBufferedRequest;\n    }\n    state.bufferedRequestCount += 1;\n  } else {\n    doWrite(stream, state, false, len, chunk, encoding, cb);\n  }\n\n  return ret;\n}\n\nfunction doWrite(stream, state, writev, len, chunk, encoding, cb) {\n  state.writelen = len;\n  state.writecb = cb;\n  state.writing = true;\n  state.sync = true;\n  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);\n  state.sync = false;\n}\n\nfunction onwriteError(stream, state, sync, er, cb) {\n  --state.pendingcb;\n\n  if (sync) {\n    // defer the callback if we are being called synchronously\n    // to avoid piling up things on the stack\n    pna.nextTick(cb, er);\n    // this can emit finish, and it will always happen\n    // after error\n    pna.nextTick(finishMaybe, stream, state);\n    stream._writableState.errorEmitted = true;\n    stream.emit('error', er);\n  } else {\n    // the caller expect this to happen before if\n    // it is async\n    cb(er);\n    stream._writableState.errorEmitted = true;\n    stream.emit('error', er);\n    // this can emit finish, but finish must\n    // always follow error\n    finishMaybe(stream, state);\n  }\n}\n\nfunction onwriteStateUpdate(state) {\n  state.writing = false;\n  state.writecb = null;\n  state.length -= state.writelen;\n  state.writelen = 0;\n}\n\nfunction onwrite(stream, er) {\n  var state = stream._writableState;\n  var sync = state.sync;\n  var cb = state.writecb;\n\n  onwriteStateUpdate(state);\n\n  if (er) onwriteError(stream, state, sync, er, cb);else {\n    // Check if we're actually ready to finish, but don't emit yet\n    var finished = needFinish(state);\n\n    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {\n      clearBuffer(stream, state);\n    }\n\n    if (sync) {\n      /*<replacement>*/\n      asyncWrite(afterWrite, stream, state, finished, cb);\n      /*</replacement>*/\n    } else {\n      afterWrite(stream, state, finished, cb);\n    }\n  }\n}\n\nfunction afterWrite(stream, state, finished, cb) {\n  if (!finished) onwriteDrain(stream, state);\n  state.pendingcb--;\n  cb();\n  finishMaybe(stream, state);\n}\n\n// Must force callback to be called on nextTick, so that we don't\n// emit 'drain' before the write() consumer gets the 'false' return\n// value, and has a chance to attach a 'drain' listener.\nfunction onwriteDrain(stream, state) {\n  if (state.length === 0 && state.needDrain) {\n    state.needDrain = false;\n    stream.emit('drain');\n  }\n}\n\n// if there's something in the buffer waiting, then process it\nfunction clearBuffer(stream, state) {\n  state.bufferProcessing = true;\n  var entry = state.bufferedRequest;\n\n  if (stream._writev && entry && entry.next) {\n    // Fast case, write everything using _writev()\n    var l = state.bufferedRequestCount;\n    var buffer = new Array(l);\n    var holder = state.corkedRequestsFree;\n    holder.entry = entry;\n\n    var count = 0;\n    var allBuffers = true;\n    while (entry) {\n      buffer[count] = entry;\n      if (!entry.isBuf) allBuffers = false;\n      entry = entry.next;\n      count += 1;\n    }\n    buffer.allBuffers = allBuffers;\n\n    doWrite(stream, state, true, state.length, buffer, '', holder.finish);\n\n    // doWrite is almost always async, defer these to save a bit of time\n    // as the hot path ends with doWrite\n    state.pendingcb++;\n    state.lastBufferedRequest = null;\n    if (holder.next) {\n      state.corkedRequestsFree = holder.next;\n      holder.next = null;\n    } else {\n      state.corkedRequestsFree = new CorkedRequest(state);\n    }\n    state.bufferedRequestCount = 0;\n  } else {\n    // Slow case, write chunks one-by-one\n    while (entry) {\n      var chunk = entry.chunk;\n      var encoding = entry.encoding;\n      var cb = entry.callback;\n      var len = state.objectMode ? 1 : chunk.length;\n\n      doWrite(stream, state, false, len, chunk, encoding, cb);\n      entry = entry.next;\n      state.bufferedRequestCount--;\n      // if we didn't call the onwrite immediately, then\n      // it means that we need to wait until it does.\n      // also, that means that the chunk and cb are currently\n      // being processed, so move the buffer counter past them.\n      if (state.writing) {\n        break;\n      }\n    }\n\n    if (entry === null) state.lastBufferedRequest = null;\n  }\n\n  state.bufferedRequest = entry;\n  state.bufferProcessing = false;\n}\n\nWritable.prototype._write = function (chunk, encoding, cb) {\n  cb(new Error('_write() is not implemented'));\n};\n\nWritable.prototype._writev = null;\n\nWritable.prototype.end = function (chunk, encoding, cb) {\n  var state = this._writableState;\n\n  if (typeof chunk === 'function') {\n    cb = chunk;\n    chunk = null;\n    encoding = null;\n  } else if (typeof encoding === 'function') {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);\n\n  // .end() fully uncorks\n  if (state.corked) {\n    state.corked = 1;\n    this.uncork();\n  }\n\n  // ignore unnecessary end() calls.\n  if (!state.ending && !state.finished) endWritable(this, state, cb);\n};\n\nfunction needFinish(state) {\n  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;\n}\nfunction callFinal(stream, state) {\n  stream._final(function (err) {\n    state.pendingcb--;\n    if (err) {\n      stream.emit('error', err);\n    }\n    state.prefinished = true;\n    stream.emit('prefinish');\n    finishMaybe(stream, state);\n  });\n}\nfunction prefinish(stream, state) {\n  if (!state.prefinished && !state.finalCalled) {\n    if (typeof stream._final === 'function') {\n      state.pendingcb++;\n      state.finalCalled = true;\n      pna.nextTick(callFinal, stream, state);\n    } else {\n      state.prefinished = true;\n      stream.emit('prefinish');\n    }\n  }\n}\n\nfunction finishMaybe(stream, state) {\n  var need = needFinish(state);\n  if (need) {\n    prefinish(stream, state);\n    if (state.pendingcb === 0) {\n      state.finished = true;\n      stream.emit('finish');\n    }\n  }\n  return need;\n}\n\nfunction endWritable(stream, state, cb) {\n  state.ending = true;\n  finishMaybe(stream, state);\n  if (cb) {\n    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);\n  }\n  state.ended = true;\n  stream.writable = false;\n}\n\nfunction onCorkedFinish(corkReq, state, err) {\n  var entry = corkReq.entry;\n  corkReq.entry = null;\n  while (entry) {\n    var cb = entry.callback;\n    state.pendingcb--;\n    cb(err);\n    entry = entry.next;\n  }\n  if (state.corkedRequestsFree) {\n    state.corkedRequestsFree.next = corkReq;\n  } else {\n    state.corkedRequestsFree = corkReq;\n  }\n}\n\nObject.defineProperty(Writable.prototype, 'destroyed', {\n  get: function () {\n    if (this._writableState === undefined) {\n      return false;\n    }\n    return this._writableState.destroyed;\n  },\n  set: function (value) {\n    // we ignore the value if the stream\n    // has not been initialized yet\n    if (!this._writableState) {\n      return;\n    }\n\n    // backward compatibility, the user is explicitly\n    // managing destroyed\n    this._writableState.destroyed = value;\n  }\n});\n\nWritable.prototype.destroy = destroyImpl.destroy;\nWritable.prototype._undestroy = destroyImpl.undestroy;\nWritable.prototype._destroy = function (err, cb) {\n  this.end();\n  cb(err);\n};\n}).call(this)}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {},require(\"timers\").setImmediate)\n\n},{\"./_stream_duplex\":65,\"./internal/streams/destroy\":71,\"./internal/streams/stream\":72,\"_process\":63,\"core-util-is\":40,\"inherits\":49,\"process-nextick-args\":73,\"safe-buffer\":74,\"timers\":77,\"util-deprecate\":78}],70:[function(require,module,exports){\n'use strict';\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Buffer = require('safe-buffer').Buffer;\nvar util = require('util');\n\nfunction copyBuffer(src, target, offset) {\n  src.copy(target, offset);\n}\n\nmodule.exports = function () {\n  function BufferList() {\n    _classCallCheck(this, BufferList);\n\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n\n  BufferList.prototype.push = function push(v) {\n    var entry = { data: v, next: null };\n    if (this.length > 0) this.tail.next = entry;else this.head = entry;\n    this.tail = entry;\n    ++this.length;\n  };\n\n  BufferList.prototype.unshift = function unshift(v) {\n    var entry = { data: v, next: this.head };\n    if (this.length === 0) this.tail = entry;\n    this.head = entry;\n    ++this.length;\n  };\n\n  BufferList.prototype.shift = function shift() {\n    if (this.length === 0) return;\n    var ret = this.head.data;\n    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;\n    --this.length;\n    return ret;\n  };\n\n  BufferList.prototype.clear = function clear() {\n    this.head = this.tail = null;\n    this.length = 0;\n  };\n\n  BufferList.prototype.join = function join(s) {\n    if (this.length === 0) return '';\n    var p = this.head;\n    var ret = '' + p.data;\n    while (p = p.next) {\n      ret += s + p.data;\n    }return ret;\n  };\n\n  BufferList.prototype.concat = function concat(n) {\n    if (this.length === 0) return Buffer.alloc(0);\n    if (this.length === 1) return this.head.data;\n    var ret = Buffer.allocUnsafe(n >>> 0);\n    var p = this.head;\n    var i = 0;\n    while (p) {\n      copyBuffer(p.data, ret, i);\n      i += p.data.length;\n      p = p.next;\n    }\n    return ret;\n  };\n\n  return BufferList;\n}();\n\nif (util && util.inspect && util.inspect.custom) {\n  module.exports.prototype[util.inspect.custom] = function () {\n    var obj = util.inspect({ length: this.length });\n    return this.constructor.name + ' ' + obj;\n  };\n}\n},{\"safe-buffer\":74,\"util\":37}],71:[function(require,module,exports){\n'use strict';\n\n/*<replacement>*/\n\nvar pna = require('process-nextick-args');\n/*</replacement>*/\n\n// undocumented cb() API, needed for core, not for public API\nfunction destroy(err, cb) {\n  var _this = this;\n\n  var readableDestroyed = this._readableState && this._readableState.destroyed;\n  var writableDestroyed = this._writableState && this._writableState.destroyed;\n\n  if (readableDestroyed || writableDestroyed) {\n    if (cb) {\n      cb(err);\n    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {\n      pna.nextTick(emitErrorNT, this, err);\n    }\n    return this;\n  }\n\n  // we set destroyed to true before firing error callbacks in order\n  // to make it re-entrance safe in case destroy() is called within callbacks\n\n  if (this._readableState) {\n    this._readableState.destroyed = true;\n  }\n\n  // if this is a duplex stream mark the writable part as destroyed as well\n  if (this._writableState) {\n    this._writableState.destroyed = true;\n  }\n\n  this._destroy(err || null, function (err) {\n    if (!cb && err) {\n      pna.nextTick(emitErrorNT, _this, err);\n      if (_this._writableState) {\n        _this._writableState.errorEmitted = true;\n      }\n    } else if (cb) {\n      cb(err);\n    }\n  });\n\n  return this;\n}\n\nfunction undestroy() {\n  if (this._readableState) {\n    this._readableState.destroyed = false;\n    this._readableState.reading = false;\n    this._readableState.ended = false;\n    this._readableState.endEmitted = false;\n  }\n\n  if (this._writableState) {\n    this._writableState.destroyed = false;\n    this._writableState.ended = false;\n    this._writableState.ending = false;\n    this._writableState.finished = false;\n    this._writableState.errorEmitted = false;\n  }\n}\n\nfunction emitErrorNT(self, err) {\n  self.emit('error', err);\n}\n\nmodule.exports = {\n  destroy: destroy,\n  undestroy: undestroy\n};\n},{\"process-nextick-args\":73}],72:[function(require,module,exports){\narguments[4][18][0].apply(exports,arguments)\n},{\"dup\":18,\"events\":39}],73:[function(require,module,exports){\n(function (process){(function (){\n'use strict';\n\nif (typeof process === 'undefined' ||\n    !process.version ||\n    process.version.indexOf('v0.') === 0 ||\n    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {\n  module.exports = { nextTick: nextTick };\n} else {\n  module.exports = process\n}\n\nfunction nextTick(fn, arg1, arg2, arg3) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('\"callback\" argument must be a function');\n  }\n  var len = arguments.length;\n  var args, i;\n  switch (len) {\n  case 0:\n  case 1:\n    return process.nextTick(fn);\n  case 2:\n    return process.nextTick(function afterTickOne() {\n      fn.call(null, arg1);\n    });\n  case 3:\n    return process.nextTick(function afterTickTwo() {\n      fn.call(null, arg1, arg2);\n    });\n  case 4:\n    return process.nextTick(function afterTickThree() {\n      fn.call(null, arg1, arg2, arg3);\n    });\n  default:\n    args = new Array(len - 1);\n    i = 0;\n    while (i < args.length) {\n      args[i++] = arguments[i];\n    }\n    return process.nextTick(function afterTick() {\n      fn.apply(null, args);\n    });\n  }\n}\n\n\n}).call(this)}).call(this,require('_process'))\n\n},{\"_process\":63}],74:[function(require,module,exports){\narguments[4][20][0].apply(exports,arguments)\n},{\"buffer\":38,\"dup\":20}],75:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n'use strict';\n\n/*<replacement>*/\n\nvar Buffer = require('safe-buffer').Buffer;\n/*</replacement>*/\n\nvar isEncoding = Buffer.isEncoding || function (encoding) {\n  encoding = '' + encoding;\n  switch (encoding && encoding.toLowerCase()) {\n    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':\n      return true;\n    default:\n      return false;\n  }\n};\n\nfunction _normalizeEncoding(enc) {\n  if (!enc) return 'utf8';\n  var retried;\n  while (true) {\n    switch (enc) {\n      case 'utf8':\n      case 'utf-8':\n        return 'utf8';\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return 'utf16le';\n      case 'latin1':\n      case 'binary':\n        return 'latin1';\n      case 'base64':\n      case 'ascii':\n      case 'hex':\n        return enc;\n      default:\n        if (retried) return; // undefined\n        enc = ('' + enc).toLowerCase();\n        retried = true;\n    }\n  }\n};\n\n// Do not cache `Buffer.isEncoding` when checking encoding names as some\n// modules monkey-patch it to support additional encodings\nfunction normalizeEncoding(enc) {\n  var nenc = _normalizeEncoding(enc);\n  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);\n  return nenc || enc;\n}\n\n// StringDecoder provides an interface for efficiently splitting a series of\n// buffers into a series of JS strings without breaking apart multi-byte\n// characters.\nexports.StringDecoder = StringDecoder;\nfunction StringDecoder(encoding) {\n  this.encoding = normalizeEncoding(encoding);\n  var nb;\n  switch (this.encoding) {\n    case 'utf16le':\n      this.text = utf16Text;\n      this.end = utf16End;\n      nb = 4;\n      break;\n    case 'utf8':\n      this.fillLast = utf8FillLast;\n      nb = 4;\n      break;\n    case 'base64':\n      this.text = base64Text;\n      this.end = base64End;\n      nb = 3;\n      break;\n    default:\n      this.write = simpleWrite;\n      this.end = simpleEnd;\n      return;\n  }\n  this.lastNeed = 0;\n  this.lastTotal = 0;\n  this.lastChar = Buffer.allocUnsafe(nb);\n}\n\nStringDecoder.prototype.write = function (buf) {\n  if (buf.length === 0) return '';\n  var r;\n  var i;\n  if (this.lastNeed) {\n    r = this.fillLast(buf);\n    if (r === undefined) return '';\n    i = this.lastNeed;\n    this.lastNeed = 0;\n  } else {\n    i = 0;\n  }\n  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);\n  return r || '';\n};\n\nStringDecoder.prototype.end = utf8End;\n\n// Returns only complete characters in a Buffer\nStringDecoder.prototype.text = utf8Text;\n\n// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer\nStringDecoder.prototype.fillLast = function (buf) {\n  if (this.lastNeed <= buf.length) {\n    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);\n    return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n  }\n  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);\n  this.lastNeed -= buf.length;\n};\n\n// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a\n// continuation byte. If an invalid byte is detected, -2 is returned.\nfunction utf8CheckByte(byte) {\n  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;\n  return byte >> 6 === 0x02 ? -1 : -2;\n}\n\n// Checks at most 3 bytes at the end of a Buffer in order to detect an\n// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)\n// needed to complete the UTF-8 character (if applicable) are returned.\nfunction utf8CheckIncomplete(self, buf, i) {\n  var j = buf.length - 1;\n  if (j < i) return 0;\n  var nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) self.lastNeed = nb - 1;\n    return nb;\n  }\n  if (--j < i || nb === -2) return 0;\n  nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) self.lastNeed = nb - 2;\n    return nb;\n  }\n  if (--j < i || nb === -2) return 0;\n  nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) {\n      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;\n    }\n    return nb;\n  }\n  return 0;\n}\n\n// Validates as many continuation bytes for a multi-byte UTF-8 character as\n// needed or are available. If we see a non-continuation byte where we expect\n// one, we \"replace\" the validated continuation bytes we've seen so far with\n// a single UTF-8 replacement character ('\\ufffd'), to match v8's UTF-8 decoding\n// behavior. The continuation byte check is included three times in the case\n// where all of the continuation bytes for a character exist in the same buffer.\n// It is also done this way as a slight performance increase instead of using a\n// loop.\nfunction utf8CheckExtraBytes(self, buf, p) {\n  if ((buf[0] & 0xC0) !== 0x80) {\n    self.lastNeed = 0;\n    return '\\ufffd';\n  }\n  if (self.lastNeed > 1 && buf.length > 1) {\n    if ((buf[1] & 0xC0) !== 0x80) {\n      self.lastNeed = 1;\n      return '\\ufffd';\n    }\n    if (self.lastNeed > 2 && buf.length > 2) {\n      if ((buf[2] & 0xC0) !== 0x80) {\n        self.lastNeed = 2;\n        return '\\ufffd';\n      }\n    }\n  }\n}\n\n// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.\nfunction utf8FillLast(buf) {\n  var p = this.lastTotal - this.lastNeed;\n  var r = utf8CheckExtraBytes(this, buf, p);\n  if (r !== undefined) return r;\n  if (this.lastNeed <= buf.length) {\n    buf.copy(this.lastChar, p, 0, this.lastNeed);\n    return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n  }\n  buf.copy(this.lastChar, p, 0, buf.length);\n  this.lastNeed -= buf.length;\n}\n\n// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a\n// partial character, the character's bytes are buffered until the required\n// number of bytes are available.\nfunction utf8Text(buf, i) {\n  var total = utf8CheckIncomplete(this, buf, i);\n  if (!this.lastNeed) return buf.toString('utf8', i);\n  this.lastTotal = total;\n  var end = buf.length - (total - this.lastNeed);\n  buf.copy(this.lastChar, 0, end);\n  return buf.toString('utf8', i, end);\n}\n\n// For UTF-8, a replacement character is added when ending on a partial\n// character.\nfunction utf8End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) return r + '\\ufffd';\n  return r;\n}\n\n// UTF-16LE typically needs two bytes per character, but even if we have an even\n// number of bytes available, we need to check if we end on a leading/high\n// surrogate. In that case, we need to wait for the next two bytes in order to\n// decode the last character properly.\nfunction utf16Text(buf, i) {\n  if ((buf.length - i) % 2 === 0) {\n    var r = buf.toString('utf16le', i);\n    if (r) {\n      var c = r.charCodeAt(r.length - 1);\n      if (c >= 0xD800 && c <= 0xDBFF) {\n        this.lastNeed = 2;\n        this.lastTotal = 4;\n        this.lastChar[0] = buf[buf.length - 2];\n        this.lastChar[1] = buf[buf.length - 1];\n        return r.slice(0, -1);\n      }\n    }\n    return r;\n  }\n  this.lastNeed = 1;\n  this.lastTotal = 2;\n  this.lastChar[0] = buf[buf.length - 1];\n  return buf.toString('utf16le', i, buf.length - 1);\n}\n\n// For UTF-16LE we do not explicitly append special replacement characters if we\n// end on a partial character, we simply let v8 handle that.\nfunction utf16End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) {\n    var end = this.lastTotal - this.lastNeed;\n    return r + this.lastChar.toString('utf16le', 0, end);\n  }\n  return r;\n}\n\nfunction base64Text(buf, i) {\n  var n = (buf.length - i) % 3;\n  if (n === 0) return buf.toString('base64', i);\n  this.lastNeed = 3 - n;\n  this.lastTotal = 3;\n  if (n === 1) {\n    this.lastChar[0] = buf[buf.length - 1];\n  } else {\n    this.lastChar[0] = buf[buf.length - 2];\n    this.lastChar[1] = buf[buf.length - 1];\n  }\n  return buf.toString('base64', i, buf.length - n);\n}\n\nfunction base64End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);\n  return r;\n}\n\n// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)\nfunction simpleWrite(buf) {\n  return buf.toString(this.encoding);\n}\n\nfunction simpleEnd(buf) {\n  return buf && buf.length ? this.write(buf) : '';\n}\n},{\"safe-buffer\":74}],76:[function(require,module,exports){\narguments[4][19][0].apply(exports,arguments)\n},{\"./lib/_stream_duplex.js\":65,\"./lib/_stream_passthrough.js\":66,\"./lib/_stream_readable.js\":67,\"./lib/_stream_transform.js\":68,\"./lib/_stream_writable.js\":69,\"dup\":19}],77:[function(require,module,exports){\n(function (setImmediate,clearImmediate){(function (){\nvar nextTick = require('process/browser.js').nextTick;\nvar apply = Function.prototype.apply;\nvar slice = Array.prototype.slice;\nvar immediateIds = {};\nvar nextImmediateId = 0;\n\n// DOM APIs, for completeness\n\nexports.setTimeout = function() {\n  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);\n};\nexports.setInterval = function() {\n  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);\n};\nexports.clearTimeout =\nexports.clearInterval = function(timeout) { timeout.close(); };\n\nfunction Timeout(id, clearFn) {\n  this._id = id;\n  this._clearFn = clearFn;\n}\nTimeout.prototype.unref = Timeout.prototype.ref = function() {};\nTimeout.prototype.close = function() {\n  this._clearFn.call(window, this._id);\n};\n\n// Does not start the time, just sets up the members needed.\nexports.enroll = function(item, msecs) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = msecs;\n};\n\nexports.unenroll = function(item) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = -1;\n};\n\nexports._unrefActive = exports.active = function(item) {\n  clearTimeout(item._idleTimeoutId);\n\n  var msecs = item._idleTimeout;\n  if (msecs >= 0) {\n    item._idleTimeoutId = setTimeout(function onTimeout() {\n      if (item._onTimeout)\n        item._onTimeout();\n    }, msecs);\n  }\n};\n\n// That's not how node.js implements it but the exposed api is the same.\nexports.setImmediate = typeof setImmediate === \"function\" ? setImmediate : function(fn) {\n  var id = nextImmediateId++;\n  var args = arguments.length < 2 ? false : slice.call(arguments, 1);\n\n  immediateIds[id] = true;\n\n  nextTick(function onNextTick() {\n    if (immediateIds[id]) {\n      // fn.call() is faster so we optimize for the common use-case\n      // @see http://jsperf.com/call-apply-segu\n      if (args) {\n        fn.apply(null, args);\n      } else {\n        fn.call(null);\n      }\n      // Prevent ids from leaking\n      exports.clearImmediate(id);\n    }\n  });\n\n  return id;\n};\n\nexports.clearImmediate = typeof clearImmediate === \"function\" ? clearImmediate : function(id) {\n  delete immediateIds[id];\n};\n}).call(this)}).call(this,require(\"timers\").setImmediate,require(\"timers\").clearImmediate)\n\n},{\"process/browser.js\":63,\"timers\":77}],78:[function(require,module,exports){\n(function (global){(function (){\n\n/**\n * Module exports.\n */\n\nmodule.exports = deprecate;\n\n/**\n * Mark that a method should not be used.\n * Returns a modified function which warns once by default.\n *\n * If `localStorage.noDeprecation = true` is set, then it is a no-op.\n *\n * If `localStorage.throwDeprecation = true` is set, then deprecated functions\n * will throw an Error when invoked.\n *\n * If `localStorage.traceDeprecation = true` is set, then deprecated functions\n * will invoke `console.trace()` instead of `console.error()`.\n *\n * @param {Function} fn - the function to deprecate\n * @param {String} msg - the string to print to the console when `fn` is invoked\n * @returns {Function} a new \"deprecated\" version of `fn`\n * @api public\n */\n\nfunction deprecate (fn, msg) {\n  if (config('noDeprecation')) {\n    return fn;\n  }\n\n  var warned = false;\n  function deprecated() {\n    if (!warned) {\n      if (config('throwDeprecation')) {\n        throw new Error(msg);\n      } else if (config('traceDeprecation')) {\n        console.trace(msg);\n      } else {\n        console.warn(msg);\n      }\n      warned = true;\n    }\n    return fn.apply(this, arguments);\n  }\n\n  return deprecated;\n}\n\n/**\n * Checks `localStorage` for boolean values for the given `name`.\n *\n * @param {String} name\n * @returns {Boolean}\n * @api private\n */\n\nfunction config (name) {\n  // accessing global.localStorage can trigger a DOMException in sandboxed iframes\n  try {\n    if (!global.localStorage) return false;\n  } catch (_) {\n    return false;\n  }\n  var val = global.localStorage[name];\n  if (null == val) return false;\n  return String(val).toLowerCase() === 'true';\n}\n\n}).call(this)}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n\n},{}],79:[function(require,module,exports){\n// Returns a wrapper function that returns a wrapped callback\n// The wrapper function should do some stuff, and return a\n// presumably different callback function.\n// This makes sure that own properties are retained, so that\n// decorations and such are not lost along the way.\nmodule.exports = wrappy\nfunction wrappy (fn, cb) {\n  if (fn && cb) return wrappy(fn)(cb)\n\n  if (typeof fn !== 'function')\n    throw new TypeError('need wrapper function')\n\n  Object.keys(fn).forEach(function (k) {\n    wrapper[k] = fn[k]\n  })\n\n  return wrapper\n\n  function wrapper() {\n    var args = new Array(arguments.length)\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i]\n    }\n    var ret = fn.apply(this, args)\n    var cb = args[args.length-1]\n    if (typeof ret === 'function' && ret !== cb) {\n      Object.keys(cb).forEach(function (k) {\n        ret[k] = cb[k]\n      })\n    }\n    return ret\n  }\n}\n\n},{}],80:[function(require,module,exports){\n\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = shouldInjectProvider;\n\n/**\n * Determines if the provider should be injected\n *\n * @returns {boolean} {@code true} Whether the provider should be injected\n */\nfunction shouldInjectProvider() {\n  return doctypeCheck() && suffixCheck() && documentElementCheck() && !blockedDomainCheck();\n}\n/**\n * Checks the doctype of the current document if it exists\n *\n * @returns {boolean} {@code true} if the doctype is html or if none exists\n */\n\n\nfunction doctypeCheck() {\n  const {\n    doctype\n  } = window.document;\n\n  if (doctype) {\n    return doctype.name === 'html';\n  }\n\n  return true;\n}\n/**\n * Returns whether or not the extension (suffix) of the current document is prohibited\n *\n * This checks {@code window.location.pathname} against a set of file extensions\n * that we should not inject the provider into. This check is indifferent of\n * query parameters in the location.\n *\n * @returns {boolean} whether or not the extension of the current document is prohibited\n */\n\n\nfunction suffixCheck() {\n  const prohibitedTypes = [/\\.xml$/u, /\\.pdf$/u];\n  const currentUrl = window.location.pathname;\n\n  for (let i = 0; i < prohibitedTypes.length; i++) {\n    if (prohibitedTypes[i].test(currentUrl)) {\n      return false;\n    }\n  }\n\n  return true;\n}\n/**\n * Checks the documentElement of the current document\n *\n * @returns {boolean} {@code true} if the documentElement is an html node or if none exists\n */\n\n\nfunction documentElementCheck() {\n  const documentElement = document.documentElement.nodeName;\n\n  if (documentElement) {\n    return documentElement.toLowerCase() === 'html';\n  }\n\n  return true;\n}\n/**\n * Checks if the current domain is blocked\n *\n * @returns {boolean} {@code true} if the current domain is blocked\n */\n\n\nfunction blockedDomainCheck() {\n  const blockedDomains = ['uscourts.gov', 'dropbox.com', 'webbyawards.com', 'cdn.shopify.com/s/javascripts/tricorder/xtld-read-only-frame.html', 'adyen.com', 'gravityforms.com', 'harbourair.com', 'ani.gamer.com.tw', 'blueskybooking.com', 'sharefile.com'];\n  const currentUrl = window.location.href;\n  let currentRegex;\n\n  for (let i = 0; i < blockedDomains.length; i++) {\n    const blockedDomain = blockedDomains[i].replace('.', '\\\\.');\n    currentRegex = new RegExp(`(?:https?:\\\\/\\\\/)(?:(?!${blockedDomain}).)*$`, 'u');\n\n    if (!currentRegex.test(currentUrl)) {\n      return true;\n    }\n  }\n\n  return false;\n}\n\n},{}]},{},[1])\n\n";
    const inpageSuffix = `//# sourceURL=${_webextensionPolyfill.default.runtime.getURL('inpage.js')}\n`;
    const inpageBundle = inpageContent + inpageSuffix; // contexts

    const CONTENT_SCRIPT = 'metamask-contentscript';
    const INPAGE = 'metamask-inpage';
    const PHISHING_WARNING_PAGE = 'metamask-phishing-warning-page'; // stream channels

    const PHISHING_SAFELIST = 'metamask-phishing-safelist';
    const PROVIDER = 'metamask-provider'; // For more information about these legacy streams, see here:
    // https://github.com/MetaMask/metamask-extension/issues/15491
    // TODO:LegacyProvider: Delete

    const LEGACY_CONTENT_SCRIPT = 'contentscript';
    const LEGACY_INPAGE = 'inpage';
    const LEGACY_PROVIDER = 'provider';
    const LEGACY_PUBLIC_CONFIG = 'publicConfig';
    let legacyExtMux, legacyExtChannel, legacyExtPublicConfigChannel, legacyPageMux, legacyPageMuxLegacyProviderChannel, legacyPagePublicConfigChannel, notificationTransformStream;
    const WORKER_KEEP_ALIVE_INTERVAL = 1000;
    const WORKER_KEEP_ALIVE_MESSAGE = 'WORKER_KEEP_ALIVE_MESSAGE';
    const phishingPageUrl = new URL("https://metamask.github.io/phishing-warning/v1.2.1/");
    let phishingExtChannel, phishingExtMux, phishingExtPort, phishingExtStream, phishingPageChannel, phishingPageMux;
    let extensionMux, extensionChannel, extensionPort, extensionPhishingStream, extensionStream, pageMux, pageChannel;
    /**
     * Injects a script tag into the current document
     *
     * @param {string} content - Code to be executed in the current document
     */

    function injectScript(content) {
      try {
        const container = document.head || document.documentElement;
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('async', 'false');
        scriptTag.textContent = content;
        container.insertBefore(scriptTag, container.children[0]);
        container.removeChild(scriptTag);
      } catch (error) {
        console.error('MetaMask: Provider injection failed.', error);
      }
    }
    /**
     * PHISHING STREAM LOGIC
     */


    function setupPhishingPageStreams() {
      // the transport-specific streams for communication between inpage and background
      const phishingPageStream = new _postMessageStream.WindowPostMessageStream({
        name: CONTENT_SCRIPT,
        target: PHISHING_WARNING_PAGE
      }); // create and connect channel muxers
      // so we can handle the channels individually

      phishingPageMux = new _objMultiplex.default();
      phishingPageMux.setMaxListeners(25);
      (0, _pump.default)(phishingPageMux, phishingPageStream, phishingPageMux, err => logStreamDisconnectWarning('MetaMask Inpage Multiplex', err));
      phishingPageChannel = phishingPageMux.createStream(PHISHING_SAFELIST);
    }

    const setupPhishingExtStreams = () => {
      console.error('runtime.connect in setupPhishingExtStreams')
      phishingExtPort = _webextensionPolyfill.default.runtime.connect({
        name: CONTENT_SCRIPT
      });
      phishingExtStream = new _extensionPortStream.default(phishingExtPort); // create and connect channel muxers
      // so we can handle the channels individually

      phishingExtMux = new _objMultiplex.default();
      phishingExtMux.setMaxListeners(25);
      (0, _pump.default)(phishingExtMux, phishingExtStream, phishingExtMux, err => {
        logStreamDisconnectWarning('MetaMask Background Multiplex', err);
        window.postMessage({
          target: PHISHING_WARNING_PAGE,
          // the post-message-stream "target"
          data: {
            // this object gets passed to obj-multiplex
            name: PHISHING_SAFELIST,
            // the obj-multiplex channel name
            data: {
              jsonrpc: '2.0',
              method: 'METAMASK_STREAM_FAILURE'
            }
          }
        }, window.location.origin);
      }); // forward communication across inpage-background for these channels only

      phishingExtChannel = phishingExtMux.createStream(PHISHING_SAFELIST);
      (0, _pump.default)(phishingPageChannel, phishingExtChannel, phishingPageChannel, error => console.debug(`MetaMask: Muxed traffic for channel "${PHISHING_SAFELIST}" failed.`, error));
    };
    /** Destroys all of the phishing extension streams */


    const destroyPhishingExtStreams = () => {
      phishingPageChannel.removeAllListeners();
      phishingExtMux.removeAllListeners();
      phishingExtMux.destroy();
      phishingExtChannel.removeAllListeners();
      phishingExtChannel.destroy();
    };
    /**
     * Resets the extension stream with new streams to channel with the phishing page streams,
     * and creates a new event listener to the reestablished extension port.
     */


    const resetPhishingStreamAndListeners = () => {
      phishingExtPort.onDisconnect.removeListener(resetPhishingStreamAndListeners);
      destroyPhishingExtStreams();
      setupPhishingExtStreams();
      phishingExtPort.onDisconnect.addListener(resetPhishingStreamAndListeners);
    };
    /**
     * Initializes two-way communication streams between the browser extension and
     * the phishing page context. This function also creates an event listener to
     * reset the streams if the service worker resets.
     */


    const initPhishingStreams = () => {
      setupPhishingPageStreams();
      setupPhishingExtStreams();
      phishingExtPort.onDisconnect.addListener(resetPhishingStreamAndListeners);
    };
    /**
     * INPAGE - EXTENSION STREAM LOGIC
     */


    const setupPageStreams = () => {
      // the transport-specific streams for communication between inpage and background
      const pageStream = new _postMessageStream.WindowPostMessageStream({
        name: CONTENT_SCRIPT,
        target: INPAGE
      }); // create and connect channel muxers
      // so we can handle the channels individually

      pageMux = new _objMultiplex.default();
      pageMux.setMaxListeners(25);
      (0, _pump.default)(pageMux, pageStream, pageMux, err => logStreamDisconnectWarning('MetaMask Inpage Multiplex', err));
      pageChannel = pageMux.createStream(PROVIDER);
    };

    const setupExtensionStreams = () => {
      console.error('runtime.connect in setupextensionStreams')
      extensionPort = _webextensionPolyfill.default.runtime.connect({
        name: CONTENT_SCRIPT
      });
      extensionStream = new _extensionPortStream.default(extensionPort); // create and connect channel muxers
      // so we can handle the channels individually

      extensionMux = new _objMultiplex.default();
      extensionMux.setMaxListeners(25);
      extensionMux.ignoreStream(LEGACY_PUBLIC_CONFIG); // TODO:LegacyProvider: Delete

      (0, _pump.default)(extensionMux, extensionStream, extensionMux, err => {
        logStreamDisconnectWarning('MetaMask Background Multiplex', err);
        notifyInpageOfStreamFailure();
      }); // forward communication across inpage-background for these channels only

      extensionChannel = extensionMux.createStream(PROVIDER);
      (0, _pump.default)(pageChannel, extensionChannel, pageChannel, error => console.debug(`MetaMask: Muxed traffic for channel "${PROVIDER}" failed.`, error)); // connect "phishing" channel to warning system

      extensionPhishingStream = extensionMux.createStream('phishing');
      extensionPhishingStream.once('data', redirectToPhishingWarning);
      notifyInpageOfExtensionStreamConnect();
    };
    /** Destroys all of the extension streams */


    const destroyExtensionStreams = () => {
      pageChannel.removeAllListeners();
      extensionMux.removeAllListeners();
      extensionMux.destroy();
      extensionChannel.removeAllListeners();
      extensionChannel.destroy();
    };
    /**
     * LEGACY STREAM LOGIC
     */
    // TODO:LegacyProvider: Delete


    const setupLegacyPageStreams = () => {
      const legacyPageStream = new _postMessageStream.WindowPostMessageStream({
        name: LEGACY_CONTENT_SCRIPT,
        target: LEGACY_INPAGE
      });
      legacyPageMux = new _objMultiplex.default();
      legacyPageMux.setMaxListeners(25);
      (0, _pump.default)(legacyPageMux, legacyPageStream, legacyPageMux, err => logStreamDisconnectWarning('MetaMask Legacy Inpage Multiplex', err));
      legacyPageMuxLegacyProviderChannel = legacyPageMux.createStream(LEGACY_PROVIDER);
      legacyPagePublicConfigChannel = legacyPageMux.createStream(LEGACY_PUBLIC_CONFIG);
    }; // TODO:LegacyProvider: Delete


    const setupLegacyExtensionStreams = () => {
      legacyExtMux = new _objMultiplex.default();
      legacyExtMux.setMaxListeners(25);
      notificationTransformStream = getNotificationTransformStream();
      (0, _pump.default)(legacyExtMux, extensionStream, notificationTransformStream, legacyExtMux, err => {
        logStreamDisconnectWarning('MetaMask Background Legacy Multiplex', err);
        notifyInpageOfStreamFailure();
      });
      legacyExtChannel = legacyExtMux.createStream(PROVIDER);
      (0, _pump.default)(legacyPageMuxLegacyProviderChannel, legacyExtChannel, legacyPageMuxLegacyProviderChannel, error => console.debug(`MetaMask: Muxed traffic between channels "${LEGACY_PROVIDER}" and "${PROVIDER}" failed.`, error));
      legacyExtPublicConfigChannel = legacyExtMux.createStream(LEGACY_PUBLIC_CONFIG);
      (0, _pump.default)(legacyPagePublicConfigChannel, legacyExtPublicConfigChannel, legacyPagePublicConfigChannel, error => console.debug(`MetaMask: Muxed traffic for channel "${LEGACY_PUBLIC_CONFIG}" failed.`, error));
    };
    /**
     * Destroys all of the legacy extension streams
     * TODO:LegacyProvider: Delete
     */


    const destroyLegacyExtensionStreams = () => {
      legacyPageMuxLegacyProviderChannel.removeAllListeners();
      legacyPagePublicConfigChannel.removeAllListeners();
      legacyExtMux.removeAllListeners();
      legacyExtMux.destroy();
      legacyExtChannel.removeAllListeners();
      legacyExtChannel.destroy();
      legacyExtPublicConfigChannel.removeAllListeners();
      legacyExtPublicConfigChannel.destroy();
    };
    /**
     * Resets the extension stream with new streams to channel with the in page streams,
     * and creates a new event listener to the reestablished extension port.
     */


    const resetStreamAndListeners = () => {
      extensionPort.onDisconnect.removeListener(resetStreamAndListeners);
      destroyExtensionStreams();
      setupExtensionStreams();
      destroyLegacyExtensionStreams();
      setupLegacyExtensionStreams();
      extensionPort.onDisconnect.addListener(resetStreamAndListeners);
    };
    /**
     * Initializes two-way communication streams between the browser extension and
     * the local per-page browser context. This function also creates an event listener to
     * reset the streams if the service worker resets.
     */

    const showDcError = () => {
      console.error('CONTENT SCRIPT COULD NOT CONNECT SO PORT onDisconnect called')
    }

    const initStreams = () => {
      setupPageStreams();
      setupExtensionStreams(); // TODO:LegacyProvider: Delete

      setupLegacyPageStreams();
      setupLegacyExtensionStreams();
      // extensionPort.onDisconnect.addListener(resetStreamAndListeners);
      extensionPort.onDisconnect.addListener(showDcError);
    }; // TODO:LegacyProvider: Delete


    function getNotificationTransformStream() {
      return (0, _through.obj)((chunk, _, cb) => {
        if ((chunk === null || chunk === void 0 ? void 0 : chunk.name) === PROVIDER) {
          var _chunk$data;

          if (((_chunk$data = chunk.data) === null || _chunk$data === void 0 ? void 0 : _chunk$data.method) === 'metamask_accountsChanged') {
            chunk.data.method = 'wallet_accountsChanged';
            chunk.data.result = chunk.data.params;
            delete chunk.data.params;
          }
        }

        cb(null, chunk);
      });
    }
    /**
     * Error handler for page to extension stream disconnections
     *
     * @param {string} remoteLabel - Remote stream name
     * @param {Error} error - Stream connection error
     */


    function logStreamDisconnectWarning(remoteLabel, error) {
      console.debug(`MetaMask: Content script lost connection to "${remoteLabel}".`, error);
    }
    /**
     * The function send message to inpage to notify it of extension stream connection
     */


    function notifyInpageOfExtensionStreamConnect() {
      window.postMessage({
        target: INPAGE,
        // the post-message-stream "target"
        data: {
          // this object gets passed to obj-multiplex
          name: PROVIDER,
          // the obj-multiplex channel name
          data: {
            jsonrpc: '2.0',
            method: 'METAMASK_EXTENSION_STREAM_CONNECT'
          }
        }
      }, window.location.origin);
    }
    /**
     * This function must ONLY be called in pump destruction/close callbacks.
     * Notifies the inpage context that streams have failed, via window.postMessage.
     * Relies on obj-multiplex and post-message-stream implementation details.
     */


    function notifyInpageOfStreamFailure() {
      window.postMessage({
        target: INPAGE,
        // the post-message-stream "target"
        data: {
          // this object gets passed to obj-multiplex
          name: PROVIDER,
          // the obj-multiplex channel name
          data: {
            jsonrpc: '2.0',
            method: 'METAMASK_STREAM_FAILURE'
          }
        }
      }, window.location.origin);
    }
    /**
     * Redirects the current page to a phishing information page
     *
     * @param data
     */


    function redirectToPhishingWarning(data = {}) {
      console.debug('MetaMask: Routing to Phishing Warning page.');
      const {
        hostname,
        href
      } = window.location;
      const {
        newIssueUrl
      } = data;
      const baseUrl = "https://metamask.github.io/phishing-warning/v1.2.1/";
      const querystring = new URLSearchParams({
        hostname,
        href,
        newIssueUrl
      });
      window.location.href = `${baseUrl}#${querystring}`;
    }

    console.error('TESTING 1')

    const initKeepWorkerAlive = () => {
      setInterval(() => {
        console.error('TESTING 2')
        _webextensionPolyfill.default.runtime.sendMessage({
          name: WORKER_KEEP_ALIVE_MESSAGE
        });
      }, WORKER_KEEP_ALIVE_INTERVAL);
    };

    const start = () => {
      const isDetectedPhishingSite = window.location.origin === phishingPageUrl.origin && window.location.pathname === phishingPageUrl.pathname;

      if (isDetectedPhishingSite) {
        initPhishingStreams();
        return;
      }

      if ((0, _providerInjection.default)()) {
        if (_mv.isManifestV3) {
          initKeepWorkerAlive();
        } else {
          injectScript(inpageBundle);
        }

        initStreams();
      }
    };

    start();


  }, { "../../shared/modules/mv3.utils": 75, "../../shared/modules/provider-injection": 76, "@metamask/post-message-stream": 7, "extension-port-stream": 26, "obj-multiplex": 31, "path": 33, "pump": 36, "through2": 70, "webextension-polyfill": 73 }], 2: [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BasePostMessageStream = void 0;
    const readable_stream_1 = require("readable-stream");
    function noop() {
      return undefined;
    }
    const SYN = 'SYN';
    const ACK = 'ACK';
    /**
     * Abstract base class for postMessage streams.
     */
    class BasePostMessageStream extends readable_stream_1.Duplex {
      constructor() {
        super({
          objectMode: true,
        });
        // Initialization flags
        this._init = false;
        this._haveSyn = false;
      }
      /**
       * Must be called at end of child constructor to initiate
       * communication with other end.
       */
      _handshake() {
        // Send synchronization message
        this._write(SYN, null, noop);
        this.cork();
      }
      _onData(data) {
        if (this._init) {
          // Forward message
          try {
            this.push(data);
          }
          catch (err) {
            this.emit('error', err);
          }
        }
        else if (data === SYN) {
          // Listen for handshake
          this._haveSyn = true;
          this._write(ACK, null, noop);
        }
        else if (data === ACK) {
          this._init = true;
          if (!this._haveSyn) {
            this._write(ACK, null, noop);
          }
          this.uncork();
        }
      }
      _read() {
        return undefined;
      }
      _write(data, _encoding, cb) {
        this._postMessage(data);
        cb();
      }
    }
    exports.BasePostMessageStream = BasePostMessageStream;

  }, { "readable-stream": 16 }], 3: [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WindowPostMessageStream = void 0;
    const BasePostMessageStream_1 = require("./BasePostMessageStream");
    /**
     * Window.postMessage stream.
     */
    class WindowPostMessageStream extends BasePostMessageStream_1.BasePostMessageStream {
      /**
       * Creates a stream for communicating with other streams across the same or
       * different window objects.
       *
       * @param args.name - The name of the stream. Used to differentiate between
       * multiple streams sharing the same window object.
       * @param args.target - The name of the stream to exchange messages with.
       * @param args.targetWindow - The window object of the target stream. Defaults
       * to `window`.
       */
      constructor({ name, target, targetWindow }) {
        if (!name || !target) {
          throw new Error('Invalid input.');
        }
        super();
        this._name = name;
        this._target = target;
        this._targetOrigin = targetWindow ? '*' : location.origin;
        this._targetWindow = targetWindow || window;
        this._onMessage = this._onMessage.bind(this);
        window.addEventListener('message', this._onMessage, false);
        this._handshake();
      }
      _postMessage(data) {
        this._targetWindow.postMessage({
          target: this._target,
          data,
        }, this._targetOrigin);
      }
      _onMessage(event) {
        const message = event.data;
        // validate message
        if ((this._targetOrigin !== '*' && event.origin !== this._targetOrigin) ||
          event.source !== this._targetWindow ||
          typeof message !== 'object' ||
          message.target !== this._name ||
          !message.data) {
          return;
        }
        this._onData(message.data);
      }
      _destroy() {
        window.removeEventListener('message', this._onMessage, false);
      }
    }
    exports.WindowPostMessageStream = WindowPostMessageStream;

  }, { "./BasePostMessageStream": 2 }], 4: [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkerParentPostMessageStream = void 0;
    const BasePostMessageStream_1 = require("./BasePostMessageStream");
    const enums_1 = require("./enums");
    /**
     * Parent-side dedicated web worker `postMessage` stream.
     */
    class WorkerParentPostMessageStream extends BasePostMessageStream_1.BasePostMessageStream {
      /**
       * Creates a stream for communicating with a dedicated web worker.
       *
       * @param args.worker - The Web Worker to exchange messages with. The worker
       * must instantiate a WorkerPostMessageStream.
       */
      constructor({ worker }) {
        if (!worker) {
          throw new Error('Invalid input.');
        }
        super();
        this._target = enums_1.DEDICATED_WORKER_NAME;
        this._worker = worker;
        this._worker.onmessage = this._onMessage.bind(this);
        this._handshake();
      }
      _postMessage(data) {
        this._worker.postMessage({
          target: this._target,
          data,
        });
      }
      _onMessage(event) {
        const message = event.data;
        // validate message
        if (typeof message !== 'object' || !message.data) {
          return;
        }
        this._onData(message.data);
      }
      _destroy() {
        this._worker.onmessage = null;
        this._worker = null;
      }
    }
    exports.WorkerParentPostMessageStream = WorkerParentPostMessageStream;

  }, { "./BasePostMessageStream": 2, "./enums": 6 }], 5: [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkerPostMessageStream = void 0;
    /* istanbul ignore file */
    // We ignore coverage for the entire file due to limits on our instrumentation,
    // but it is in fact covered by our tests.
    const BasePostMessageStream_1 = require("./BasePostMessageStream");
    const enums_1 = require("./enums");
    /**
     * Worker-side dedicated web worker `postMessage` stream.
     */
    class WorkerPostMessageStream extends BasePostMessageStream_1.BasePostMessageStream {
      /**
       * Note: Designed for use in web workers only.
       *
       * Creates a stream for communicating with the window that created this web
       * worker.
       */
      constructor() {
        super();
        this._name = enums_1.DEDICATED_WORKER_NAME;
        self.onmessage = this._onMessage.bind(this);
        this._handshake();
      }
      _postMessage(data) {
        // Cast of self.postMessage due to usage of DOM lib
        self.postMessage({ data });
      }
      _onMessage(event) {
        const message = event.data;
        // validate message
        if (typeof message !== 'object' ||
          message.target !== this._name ||
          !message.data) {
          return;
        }
        this._onData(message.data);
      }
      // worker stream lifecycle assumed to be coterminous with global scope
      _destroy() {
        return undefined;
      }
    }
    exports.WorkerPostMessageStream = WorkerPostMessageStream;

  }, { "./BasePostMessageStream": 2, "./enums": 6 }], 6: [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEDICATED_WORKER_NAME = void 0;
    exports.DEDICATED_WORKER_NAME = 'dedicatedWorker';

  }, {}], 7: [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkerParentPostMessageStream = exports.WorkerPostMessageStream = exports.WindowPostMessageStream = void 0;
    var WindowPostMessageStream_1 = require("./WindowPostMessageStream");
    Object.defineProperty(exports, "WindowPostMessageStream", { enumerable: true, get: function () { return WindowPostMessageStream_1.WindowPostMessageStream; } });
    var WorkerPostMessageStream_1 = require("./WorkerPostMessageStream");
    Object.defineProperty(exports, "WorkerPostMessageStream", { enumerable: true, get: function () { return WorkerPostMessageStream_1.WorkerPostMessageStream; } });
    var WorkerParentPostMessageStream_1 = require("./WorkerParentPostMessageStream");
    Object.defineProperty(exports, "WorkerParentPostMessageStream", { enumerable: true, get: function () { return WorkerParentPostMessageStream_1.WorkerParentPostMessageStream; } });

  }, { "./WindowPostMessageStream": 3, "./WorkerParentPostMessageStream": 4, "./WorkerPostMessageStream": 5 }], 8: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    // a duplex stream is just a stream that is both readable and writable.
    // Since JS doesn't have multiple prototypal inheritance, this class
    // prototypally inherits from Readable, and then parasitically from
    // Writable.

    'use strict';

    /*<replacement>*/

    var processNextTick = require('process-nextick-args');
    /*</replacement>*/

    /*<replacement>*/
    var objectKeys = Object.keys || function (obj) {
      var keys = [];
      for (var key in obj) {
        keys.push(key);
      } return keys;
    };
    /*</replacement>*/

    module.exports = Duplex;

    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/

    var Readable = require('./_stream_readable');
    var Writable = require('./_stream_writable');

    util.inherits(Duplex, Readable);

    var keys = objectKeys(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
    }

    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);

      Readable.call(this, options);
      Writable.call(this, options);

      if (options && options.readable === false) this.readable = false;

      if (options && options.writable === false) this.writable = false;

      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

      this.once('end', onend);
    }

    // the no-half-open enforcer
    function onend() {
      // if we allow half-open state, or if the writable side ended,
      // then we're ok.
      if (this.allowHalfOpen || this._writableState.ended) return;

      // no more data can be written.
      // But allow more writes to happen in this tick.
      processNextTick(onEndNT, this);
    }

    function onEndNT(self) {
      self.end();
    }

    Object.defineProperty(Duplex.prototype, 'destroyed', {
      get: function () {
        if (this._readableState === undefined || this._writableState === undefined) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function (value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (this._readableState === undefined || this._writableState === undefined) {
          return;
        }

        // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });

    Duplex.prototype._destroy = function (err, cb) {
      this.push(null);
      this.end();

      processNextTick(cb, err);
    };

    function forEach(xs, f) {
      for (var i = 0, l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
  }, { "./_stream_readable": 10, "./_stream_writable": 12, "core-util-is": 24, "inherits": 28, "process-nextick-args": 34 }], 9: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    // a passthrough stream.
    // basically just the most minimal sort of Transform stream.
    // Every written chunk gets output as-is.

    'use strict';

    module.exports = PassThrough;

    var Transform = require('./_stream_transform');

    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/

    util.inherits(PassThrough, Transform);

    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);

      Transform.call(this, options);
    }

    PassThrough.prototype._transform = function (chunk, encoding, cb) {
      cb(null, chunk);
    };
  }, { "./_stream_transform": 11, "core-util-is": 24, "inherits": 28 }], 10: [function (require, module, exports) {
    (function (process, global) {
      (function () {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        'use strict';

        /*<replacement>*/

        var processNextTick = require('process-nextick-args');
        /*</replacement>*/

        module.exports = Readable;

        /*<replacement>*/
        var isArray = require('isarray');
        /*</replacement>*/

        /*<replacement>*/
        var Duplex;
        /*</replacement>*/

        Readable.ReadableState = ReadableState;

        /*<replacement>*/
        var EE = require('events').EventEmitter;

        var EElistenerCount = function (emitter, type) {
          return emitter.listeners(type).length;
        };
        /*</replacement>*/

        /*<replacement>*/
        var Stream = require('./internal/streams/stream');
        /*</replacement>*/

        // TODO(bmeurer): Change this back to const once hole checks are
        // properly optimized away early in Ignition+TurboFan.
        /*<replacement>*/
        var Buffer = require('safe-buffer').Buffer;
        var OurUint8Array = global.Uint8Array || function () { };
        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }
        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }
        /*</replacement>*/

        /*<replacement>*/
        var util = require('core-util-is');
        util.inherits = require('inherits');
        /*</replacement>*/

        /*<replacement>*/
        var debugUtil = require('util');
        var debug = void 0;
        if (debugUtil && debugUtil.debuglog) {
          debug = debugUtil.debuglog('stream');
        } else {
          debug = function () { };
        }
        /*</replacement>*/

        var BufferList = require('./internal/streams/BufferList');
        var destroyImpl = require('./internal/streams/destroy');
        var StringDecoder;

        util.inherits(Readable, Stream);

        var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

        function prependListener(emitter, event, fn) {
          // Sadly this is not cacheable as some libraries bundle their own
          // event emitter implementation with them.
          if (typeof emitter.prependListener === 'function') {
            return emitter.prependListener(event, fn);
          } else {
            // This is a hack to make sure that our error handler is attached before any
            // userland ones.  NEVER DO THIS. This is here only because this code needs
            // to continue to work with older versions of Node.js that do not include
            // the prependListener() method. The goal is to eventually remove this hack.
            if (!emitter._events || !emitter._events[event]) emitter.on(event, fn); else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn); else emitter._events[event] = [fn, emitter._events[event]];
          }
        }

        function ReadableState(options, stream) {
          Duplex = Duplex || require('./_stream_duplex');

          options = options || {};

          // object stream flag. Used to make read(n) ignore n and to
          // make all the buffer merging and length checks go away
          this.objectMode = !!options.objectMode;

          if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

          // the point at which it stops calling _read() to fill the buffer
          // Note: 0 is a valid value, means "don't call _read preemptively ever"
          var hwm = options.highWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;
          this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

          // cast to ints.
          this.highWaterMark = Math.floor(this.highWaterMark);

          // A linked list is used to store data chunks instead of an array because the
          // linked list can remove elements from the beginning faster than
          // array.shift()
          this.buffer = new BufferList();
          this.length = 0;
          this.pipes = null;
          this.pipesCount = 0;
          this.flowing = null;
          this.ended = false;
          this.endEmitted = false;
          this.reading = false;

          // a flag to be able to tell if the event 'readable'/'data' is emitted
          // immediately, or on a later tick.  We set this to true at first, because
          // any actions that shouldn't happen until "later" should generally also
          // not happen before the first read call.
          this.sync = true;

          // whenever we return null, then we set a flag to say
          // that we're awaiting a 'readable' event emission.
          this.needReadable = false;
          this.emittedReadable = false;
          this.readableListening = false;
          this.resumeScheduled = false;

          // has it been destroyed
          this.destroyed = false;

          // Crypto is kind of old and crusty.  Historically, its default string
          // encoding is 'binary' so we have to make this configurable.
          // Everything else in the universe uses 'utf8', though.
          this.defaultEncoding = options.defaultEncoding || 'utf8';

          // the number of writers that are awaiting a drain event in .pipe()s
          this.awaitDrain = 0;

          // if true, a maybeReadMore has been scheduled
          this.readingMore = false;

          this.decoder = null;
          this.encoding = null;
          if (options.encoding) {
            if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
            this.decoder = new StringDecoder(options.encoding);
            this.encoding = options.encoding;
          }
        }

        function Readable(options) {
          Duplex = Duplex || require('./_stream_duplex');

          if (!(this instanceof Readable)) return new Readable(options);

          this._readableState = new ReadableState(options, this);

          // legacy
          this.readable = true;

          if (options) {
            if (typeof options.read === 'function') this._read = options.read;

            if (typeof options.destroy === 'function') this._destroy = options.destroy;
          }

          Stream.call(this);
        }

        Object.defineProperty(Readable.prototype, 'destroyed', {
          get: function () {
            if (this._readableState === undefined) {
              return false;
            }
            return this._readableState.destroyed;
          },
          set: function (value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._readableState) {
              return;
            }

            // backward compatibility, the user is explicitly
            // managing destroyed
            this._readableState.destroyed = value;
          }
        });

        Readable.prototype.destroy = destroyImpl.destroy;
        Readable.prototype._undestroy = destroyImpl.undestroy;
        Readable.prototype._destroy = function (err, cb) {
          this.push(null);
          cb(err);
        };

        // Manually shove something into the read() buffer.
        // This returns true if the highWaterMark has not been hit yet,
        // similar to how Writable.write() returns true if you should
        // write() some more.
        Readable.prototype.push = function (chunk, encoding) {
          var state = this._readableState;
          var skipChunkCheck;

          if (!state.objectMode) {
            if (typeof chunk === 'string') {
              encoding = encoding || state.defaultEncoding;
              if (encoding !== state.encoding) {
                chunk = Buffer.from(chunk, encoding);
                encoding = '';
              }
              skipChunkCheck = true;
            }
          } else {
            skipChunkCheck = true;
          }

          return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
        };

        // Unshift should *always* be something directly out of read()
        Readable.prototype.unshift = function (chunk) {
          return readableAddChunk(this, chunk, null, true, false);
        };

        function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
          var state = stream._readableState;
          if (chunk === null) {
            state.reading = false;
            onEofChunk(stream, state);
          } else {
            var er;
            if (!skipChunkCheck) er = chunkInvalid(state, chunk);
            if (er) {
              stream.emit('error', er);
            } else if (state.objectMode || chunk && chunk.length > 0) {
              if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                chunk = _uint8ArrayToBuffer(chunk);
              }

              if (addToFront) {
                if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event')); else addChunk(stream, state, chunk, true);
              } else if (state.ended) {
                stream.emit('error', new Error('stream.push() after EOF'));
              } else {
                state.reading = false;
                if (state.decoder && !encoding) {
                  chunk = state.decoder.write(chunk);
                  if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false); else maybeReadMore(stream, state);
                } else {
                  addChunk(stream, state, chunk, false);
                }
              }
            } else if (!addToFront) {
              state.reading = false;
            }
          }

          return needMoreData(state);
        }

        function addChunk(stream, state, chunk, addToFront) {
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront) state.buffer.unshift(chunk); else state.buffer.push(chunk);

            if (state.needReadable) emitReadable(stream);
          }
          maybeReadMore(stream, state);
        }

        function chunkInvalid(state, chunk) {
          var er;
          if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
            er = new TypeError('Invalid non-string/buffer chunk');
          }
          return er;
        }

        // if it's past the high water mark, we can push in some more.
        // Also, if we have no data yet, we can stand some
        // more bytes.  This is to work around cases where hwm=0,
        // such as the repl.  Also, if the push() triggered a
        // readable event, and the user called read(largeNumber) such that
        // needReadable was set, then we ought to push more, so that another
        // 'readable' event will be triggered.
        function needMoreData(state) {
          return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
        }

        Readable.prototype.isPaused = function () {
          return this._readableState.flowing === false;
        };

        // backwards compatibility.
        Readable.prototype.setEncoding = function (enc) {
          if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
          this._readableState.decoder = new StringDecoder(enc);
          this._readableState.encoding = enc;
          return this;
        };

        // Don't raise the hwm > 8MB
        var MAX_HWM = 0x800000;
        function computeNewHighWaterMark(n) {
          if (n >= MAX_HWM) {
            n = MAX_HWM;
          } else {
            // Get the next highest power of 2 to prevent increasing hwm excessively in
            // tiny amounts
            n--;
            n |= n >>> 1;
            n |= n >>> 2;
            n |= n >>> 4;
            n |= n >>> 8;
            n |= n >>> 16;
            n++;
          }
          return n;
        }

        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function howMuchToRead(n, state) {
          if (n <= 0 || state.length === 0 && state.ended) return 0;
          if (state.objectMode) return 1;
          if (n !== n) {
            // Only flow one buffer at a time
            if (state.flowing && state.length) return state.buffer.head.data.length; else return state.length;
          }
          // If we're asking for more than the current hwm, then raise the hwm.
          if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
          if (n <= state.length) return n;
          // Don't have enough
          if (!state.ended) {
            state.needReadable = true;
            return 0;
          }
          return state.length;
        }

        // you can override either this method, or the async _read(n) below.
        Readable.prototype.read = function (n) {
          debug('read', n);
          n = parseInt(n, 10);
          var state = this._readableState;
          var nOrig = n;

          if (n !== 0) state.emittedReadable = false;

          // if we're doing read(0) to trigger a readable event, but we
          // already have a bunch of data in the buffer, then just trigger
          // the 'readable' event and move on.
          if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
            debug('read: emitReadable', state.length, state.ended);
            if (state.length === 0 && state.ended) endReadable(this); else emitReadable(this);
            return null;
          }

          n = howMuchToRead(n, state);

          // if we've ended, and we're now clear, then finish it up.
          if (n === 0 && state.ended) {
            if (state.length === 0) endReadable(this);
            return null;
          }

          // All the actual chunk generation logic needs to be
          // *below* the call to _read.  The reason is that in certain
          // synthetic stream cases, such as passthrough streams, _read
          // may be a completely synchronous operation which may change
          // the state of the read buffer, providing enough data when
          // before there was *not* enough.
          //
          // So, the steps are:
          // 1. Figure out what the state of things will be after we do
          // a read from the buffer.
          //
          // 2. If that resulting state will trigger a _read, then call _read.
          // Note that this may be asynchronous, or synchronous.  Yes, it is
          // deeply ugly to write APIs this way, but that still doesn't mean
          // that the Readable class should behave improperly, as streams are
          // designed to be sync/async agnostic.
          // Take note if the _read call is sync or async (ie, if the read call
          // has returned yet), so that we know whether or not it's safe to emit
          // 'readable' etc.
          //
          // 3. Actually pull the requested chunks out of the buffer and return.

          // if we need a readable event, then we need to do some reading.
          var doRead = state.needReadable;
          debug('need readable', doRead);

          // if we currently have less than the highWaterMark, then also read some
          if (state.length === 0 || state.length - n < state.highWaterMark) {
            doRead = true;
            debug('length less than watermark', doRead);
          }

          // however, if we've ended, then there's no point, and if we're already
          // reading, then it's unnecessary.
          if (state.ended || state.reading) {
            doRead = false;
            debug('reading or ended', doRead);
          } else if (doRead) {
            debug('do read');
            state.reading = true;
            state.sync = true;
            // if the length is currently zero, then we *need* a readable event.
            if (state.length === 0) state.needReadable = true;
            // call internal read method
            this._read(state.highWaterMark);
            state.sync = false;
            // If _read pushed data synchronously, then `reading` will be false,
            // and we need to re-evaluate how much data we can return to the user.
            if (!state.reading) n = howMuchToRead(nOrig, state);
          }

          var ret;
          if (n > 0) ret = fromList(n, state); else ret = null;

          if (ret === null) {
            state.needReadable = true;
            n = 0;
          } else {
            state.length -= n;
          }

          if (state.length === 0) {
            // If we have nothing in the buffer, then we want to know
            // as soon as we *do* get something into the buffer.
            if (!state.ended) state.needReadable = true;

            // If we tried to read() past the EOF, then emit end on the next tick.
            if (nOrig !== n && state.ended) endReadable(this);
          }

          if (ret !== null) this.emit('data', ret);

          return ret;
        };

        function onEofChunk(stream, state) {
          if (state.ended) return;
          if (state.decoder) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) {
              state.buffer.push(chunk);
              state.length += state.objectMode ? 1 : chunk.length;
            }
          }
          state.ended = true;

          // emit 'readable' now to make sure it gets picked up.
          emitReadable(stream);
        }

        // Don't emit readable right away in sync mode, because this can trigger
        // another read() call => stack overflow.  This way, it might trigger
        // a nextTick recursion warning, but that's not so bad.
        function emitReadable(stream) {
          var state = stream._readableState;
          state.needReadable = false;
          if (!state.emittedReadable) {
            debug('emitReadable', state.flowing);
            state.emittedReadable = true;
            if (state.sync) processNextTick(emitReadable_, stream); else emitReadable_(stream);
          }
        }

        function emitReadable_(stream) {
          debug('emit readable');
          stream.emit('readable');
          flow(stream);
        }

        // at this point, the user has presumably seen the 'readable' event,
        // and called read() to consume some data.  that may have triggered
        // in turn another _read(n) call, in which case reading = true if
        // it's in progress.
        // However, if we're not ended, or reading, and the length < hwm,
        // then go ahead and try to read some more preemptively.
        function maybeReadMore(stream, state) {
          if (!state.readingMore) {
            state.readingMore = true;
            processNextTick(maybeReadMore_, stream, state);
          }
        }

        function maybeReadMore_(stream, state) {
          var len = state.length;
          while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
            debug('maybeReadMore read 0');
            stream.read(0);
            if (len === state.length)
              // didn't get any data, stop spinning.
              break; else len = state.length;
          }
          state.readingMore = false;
        }

        // abstract method.  to be overridden in specific implementation classes.
        // call cb(er, data) where data is <= n in length.
        // for virtual (non-string, non-buffer) streams, "length" is somewhat
        // arbitrary, and perhaps not very meaningful.
        Readable.prototype._read = function (n) {
          this.emit('error', new Error('_read() is not implemented'));
        };

        Readable.prototype.pipe = function (dest, pipeOpts) {
          var src = this;
          var state = this._readableState;

          switch (state.pipesCount) {
            case 0:
              state.pipes = dest;
              break;
            case 1:
              state.pipes = [state.pipes, dest];
              break;
            default:
              state.pipes.push(dest);
              break;
          }
          state.pipesCount += 1;
          debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

          var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

          var endFn = doEnd ? onend : unpipe;
          if (state.endEmitted) processNextTick(endFn); else src.once('end', endFn);

          dest.on('unpipe', onunpipe);
          function onunpipe(readable, unpipeInfo) {
            debug('onunpipe');
            if (readable === src) {
              if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
              }
            }
          }

          function onend() {
            debug('onend');
            dest.end();
          }

          // when the dest drains, it reduces the awaitDrain counter
          // on the source.  This would be more elegant with a .once()
          // handler in flow(), but adding and removing repeatedly is
          // too slow.
          var ondrain = pipeOnDrain(src);
          dest.on('drain', ondrain);

          var cleanedUp = false;
          function cleanup() {
            debug('cleanup');
            // cleanup event handlers once the pipe is broken
            dest.removeListener('close', onclose);
            dest.removeListener('finish', onfinish);
            dest.removeListener('drain', ondrain);
            dest.removeListener('error', onerror);
            dest.removeListener('unpipe', onunpipe);
            src.removeListener('end', onend);
            src.removeListener('end', unpipe);
            src.removeListener('data', ondata);

            cleanedUp = true;

            // if the reader is waiting for a drain event from this
            // specific writer, then it would cause it to never start
            // flowing again.
            // So, if this is awaiting a drain, then we just call it now.
            // If we don't know, then assume that we are waiting for one.
            if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
          }

          // If the user pushes more data while we're writing to dest then we'll end up
          // in ondata again. However, we only want to increase awaitDrain once because
          // dest will only emit one 'drain' event for the multiple writes.
          // => Introduce a guard on increasing awaitDrain.
          var increasedAwaitDrain = false;
          src.on('data', ondata);
          function ondata(chunk) {
            debug('ondata');
            increasedAwaitDrain = false;
            var ret = dest.write(chunk);
            if (false === ret && !increasedAwaitDrain) {
              // If the user unpiped during `dest.write()`, it is possible
              // to get stuck in a permanently paused state if that write
              // also returned false.
              // => Check whether `dest` is still a piping destination.
              if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                debug('false write response, pause', src._readableState.awaitDrain);
                src._readableState.awaitDrain++;
                increasedAwaitDrain = true;
              }
              src.pause();
            }
          }

          // if the dest has an error, then stop piping into it.
          // however, don't suppress the throwing behavior for this.
          function onerror(er) {
            debug('onerror', er);
            unpipe();
            dest.removeListener('error', onerror);
            if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
          }

          // Make sure our error handler is attached before userland ones.
          prependListener(dest, 'error', onerror);

          // Both close and finish should trigger unpipe, but only once.
          function onclose() {
            dest.removeListener('finish', onfinish);
            unpipe();
          }
          dest.once('close', onclose);
          function onfinish() {
            debug('onfinish');
            dest.removeListener('close', onclose);
            unpipe();
          }
          dest.once('finish', onfinish);

          function unpipe() {
            debug('unpipe');
            src.unpipe(dest);
          }

          // tell the dest that it's being piped to
          dest.emit('pipe', src);

          // start the flow if it hasn't been started already.
          if (!state.flowing) {
            debug('pipe resume');
            src.resume();
          }

          return dest;
        };

        function pipeOnDrain(src) {
          return function () {
            var state = src._readableState;
            debug('pipeOnDrain', state.awaitDrain);
            if (state.awaitDrain) state.awaitDrain--;
            if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
              state.flowing = true;
              flow(src);
            }
          };
        }

        Readable.prototype.unpipe = function (dest) {
          var state = this._readableState;
          var unpipeInfo = { hasUnpiped: false };

          // if we're not piping anywhere, then do nothing.
          if (state.pipesCount === 0) return this;

          // just one destination.  most common case.
          if (state.pipesCount === 1) {
            // passed in one, but it's not the right one.
            if (dest && dest !== state.pipes) return this;

            if (!dest) dest = state.pipes;

            // got a match.
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            if (dest) dest.emit('unpipe', this, unpipeInfo);
            return this;
          }

          // slow case. multiple pipe destinations.

          if (!dest) {
            // remove all.
            var dests = state.pipes;
            var len = state.pipesCount;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;

            for (var i = 0; i < len; i++) {
              dests[i].emit('unpipe', this, unpipeInfo);
            } return this;
          }

          // try to find the right one.
          var index = indexOf(state.pipes, dest);
          if (index === -1) return this;

          state.pipes.splice(index, 1);
          state.pipesCount -= 1;
          if (state.pipesCount === 1) state.pipes = state.pipes[0];

          dest.emit('unpipe', this, unpipeInfo);

          return this;
        };

        // set up data events if they are asked for
        // Ensure readable listeners eventually get something
        Readable.prototype.on = function (ev, fn) {
          var res = Stream.prototype.on.call(this, ev, fn);

          if (ev === 'data') {
            // Start flowing on next tick if stream isn't explicitly paused
            if (this._readableState.flowing !== false) this.resume();
          } else if (ev === 'readable') {
            var state = this._readableState;
            if (!state.endEmitted && !state.readableListening) {
              state.readableListening = state.needReadable = true;
              state.emittedReadable = false;
              if (!state.reading) {
                processNextTick(nReadingNextTick, this);
              } else if (state.length) {
                emitReadable(this);
              }
            }
          }

          return res;
        };
        Readable.prototype.addListener = Readable.prototype.on;

        function nReadingNextTick(self) {
          debug('readable nexttick read 0');
          self.read(0);
        }

        // pause() and resume() are remnants of the legacy readable stream API
        // If the user uses them, then switch into old mode.
        Readable.prototype.resume = function () {
          var state = this._readableState;
          if (!state.flowing) {
            debug('resume');
            state.flowing = true;
            resume(this, state);
          }
          return this;
        };

        function resume(stream, state) {
          if (!state.resumeScheduled) {
            state.resumeScheduled = true;
            processNextTick(resume_, stream, state);
          }
        }

        function resume_(stream, state) {
          if (!state.reading) {
            debug('resume read 0');
            stream.read(0);
          }

          state.resumeScheduled = false;
          state.awaitDrain = 0;
          stream.emit('resume');
          flow(stream);
          if (state.flowing && !state.reading) stream.read(0);
        }

        Readable.prototype.pause = function () {
          debug('call pause flowing=%j', this._readableState.flowing);
          if (false !== this._readableState.flowing) {
            debug('pause');
            this._readableState.flowing = false;
            this.emit('pause');
          }
          return this;
        };

        function flow(stream) {
          var state = stream._readableState;
          debug('flow', state.flowing);
          while (state.flowing && stream.read() !== null) { }
        }

        // wrap an old-style stream as the async data source.
        // This is *not* part of the readable stream interface.
        // It is an ugly unfortunate mess of history.
        Readable.prototype.wrap = function (stream) {
          var state = this._readableState;
          var paused = false;

          var self = this;
          stream.on('end', function () {
            debug('wrapped end');
            if (state.decoder && !state.ended) {
              var chunk = state.decoder.end();
              if (chunk && chunk.length) self.push(chunk);
            }

            self.push(null);
          });

          stream.on('data', function (chunk) {
            debug('wrapped data');
            if (state.decoder) chunk = state.decoder.write(chunk);

            // don't skip over falsy values in objectMode
            if (state.objectMode && (chunk === null || chunk === undefined)) return; else if (!state.objectMode && (!chunk || !chunk.length)) return;

            var ret = self.push(chunk);
            if (!ret) {
              paused = true;
              stream.pause();
            }
          });

          // proxy all the other methods.
          // important when wrapping filters and duplexes.
          for (var i in stream) {
            if (this[i] === undefined && typeof stream[i] === 'function') {
              this[i] = function (method) {
                return function () {
                  return stream[method].apply(stream, arguments);
                };
              }(i);
            }
          }

          // proxy certain important events.
          for (var n = 0; n < kProxyEvents.length; n++) {
            stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
          }

          // when we try to consume some more bytes, simply unpause the
          // underlying stream.
          self._read = function (n) {
            debug('wrapped _read', n);
            if (paused) {
              paused = false;
              stream.resume();
            }
          };

          return self;
        };

        // exposed for testing purposes only.
        Readable._fromList = fromList;

        // Pluck off n bytes from an array of buffers.
        // Length is the combined lengths of all the buffers in the list.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function fromList(n, state) {
          // nothing buffered
          if (state.length === 0) return null;

          var ret;
          if (state.objectMode) ret = state.buffer.shift(); else if (!n || n >= state.length) {
            // read it all, truncate the list
            if (state.decoder) ret = state.buffer.join(''); else if (state.buffer.length === 1) ret = state.buffer.head.data; else ret = state.buffer.concat(state.length);
            state.buffer.clear();
          } else {
            // read part of list
            ret = fromListPartial(n, state.buffer, state.decoder);
          }

          return ret;
        }

        // Extracts only enough buffered data to satisfy the amount requested.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function fromListPartial(n, list, hasStrings) {
          var ret;
          if (n < list.head.data.length) {
            // slice is the same for buffers and strings
            ret = list.head.data.slice(0, n);
            list.head.data = list.head.data.slice(n);
          } else if (n === list.head.data.length) {
            // first chunk is a perfect match
            ret = list.shift();
          } else {
            // result spans more than one buffer
            ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
          }
          return ret;
        }

        // Copies a specified amount of characters from the list of buffered data
        // chunks.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function copyFromBufferString(n, list) {
          var p = list.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str; else ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next) list.head = p.next; else list.head = list.tail = null;
              } else {
                list.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }

        // Copies a specified amount of bytes from the list of buffered data chunks.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function copyFromBuffer(n, list) {
          var ret = Buffer.allocUnsafe(n);
          var p = list.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next) list.head = p.next; else list.head = list.tail = null;
              } else {
                list.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }

        function endReadable(stream) {
          var state = stream._readableState;

          // If we get here before consuming all the bytes, then that is a
          // bug in node.  Should never happen.
          if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

          if (!state.endEmitted) {
            state.ended = true;
            processNextTick(endReadableNT, state, stream);
          }
        }

        function endReadableNT(state, stream) {
          // Check that we didn't get one last unshift.
          if (!state.endEmitted && state.length === 0) {
            state.endEmitted = true;
            stream.readable = false;
            stream.emit('end');
          }
        }

        function forEach(xs, f) {
          for (var i = 0, l = xs.length; i < l; i++) {
            f(xs[i], i);
          }
        }

        function indexOf(xs, x) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (xs[i] === x) return i;
          }
          return -1;
        }
      }).call(this)
    }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  }, { "./_stream_duplex": 8, "./internal/streams/BufferList": 13, "./internal/streams/destroy": 14, "./internal/streams/stream": 15, "_process": 35, "core-util-is": 24, "events": 22, "inherits": 28, "isarray": 30, "process-nextick-args": 34, "safe-buffer": 17, "string_decoder/": 18, "util": 20 }], 11: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    // a transform stream is a readable/writable stream where you do
    // something with the data.  Sometimes it's called a "filter",
    // but that's not a great name for it, since that implies a thing where
    // some bits pass through, and others are simply ignored.  (That would
    // be a valid example of a transform, of course.)
    //
    // While the output is causally related to the input, it's not a
    // necessarily symmetric or synchronous transformation.  For example,
    // a zlib stream might take multiple plain-text writes(), and then
    // emit a single compressed chunk some time in the future.
    //
    // Here's how this works:
    //
    // The Transform stream has all the aspects of the readable and writable
    // stream classes.  When you write(chunk), that calls _write(chunk,cb)
    // internally, and returns false if there's a lot of pending writes
    // buffered up.  When you call read(), that calls _read(n) until
    // there's enough pending readable data buffered up.
    //
    // In a transform stream, the written data is placed in a buffer.  When
    // _read(n) is called, it transforms the queued up data, calling the
    // buffered _write cb's as it consumes chunks.  If consuming a single
    // written chunk would result in multiple output chunks, then the first
    // outputted bit calls the readcb, and subsequent chunks just go into
    // the read buffer, and will cause it to emit 'readable' if necessary.
    //
    // This way, back-pressure is actually determined by the reading side,
    // since _read has to be called to start processing a new chunk.  However,
    // a pathological inflate type of transform can cause excessive buffering
    // here.  For example, imagine a stream where every byte of input is
    // interpreted as an integer from 0-255, and then results in that many
    // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
    // 1kb of data being output.  In this case, you could write a very small
    // amount of input, and end up with a very large amount of output.  In
    // such a pathological inflating mechanism, there'd be no way to tell
    // the system to stop doing the transform.  A single 4MB write could
    // cause the system to run out of memory.
    //
    // However, even in such a pathological case, only a single written chunk
    // would be consumed, and then the rest would wait (un-transformed) until
    // the results of the previous transformed chunk were consumed.

    'use strict';

    module.exports = Transform;

    var Duplex = require('./_stream_duplex');

    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/

    util.inherits(Transform, Duplex);

    function TransformState(stream) {
      this.afterTransform = function (er, data) {
        return afterTransform(stream, er, data);
      };

      this.needTransform = false;
      this.transforming = false;
      this.writecb = null;
      this.writechunk = null;
      this.writeencoding = null;
    }

    function afterTransform(stream, er, data) {
      var ts = stream._transformState;
      ts.transforming = false;

      var cb = ts.writecb;

      if (!cb) {
        return stream.emit('error', new Error('write callback called multiple times'));
      }

      ts.writechunk = null;
      ts.writecb = null;

      if (data !== null && data !== undefined) stream.push(data);

      cb(er);

      var rs = stream._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        stream._read(rs.highWaterMark);
      }
    }

    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);

      Duplex.call(this, options);

      this._transformState = new TransformState(this);

      var stream = this;

      // start out asking for a readable event once data is transformed.
      this._readableState.needReadable = true;

      // we have implemented the _read method, and done the other things
      // that Readable wants before the first _read call, so unset the
      // sync guard flag.
      this._readableState.sync = false;

      if (options) {
        if (typeof options.transform === 'function') this._transform = options.transform;

        if (typeof options.flush === 'function') this._flush = options.flush;
      }

      // When the writable side finishes, then flush out anything remaining.
      this.once('prefinish', function () {
        if (typeof this._flush === 'function') this._flush(function (er, data) {
          done(stream, er, data);
        }); else done(stream);
      });
    }

    Transform.prototype.push = function (chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };

    // This is the part where you do stuff!
    // override this function in implementation classes.
    // 'chunk' is an input chunk.
    //
    // Call `push(newChunk)` to pass along transformed output
    // to the readable side.  You may call 'push' zero or more times.
    //
    // Call `cb(err)` when you are done with this chunk.  If you pass
    // an error, then that'll put the hurt on the whole operation.  If you
    // never call cb(), then you'll never get another chunk.
    Transform.prototype._transform = function (chunk, encoding, cb) {
      throw new Error('_transform() is not implemented');
    };

    Transform.prototype._write = function (chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    };

    // Doesn't matter what the args are here.
    // _transform does all the work.
    // That we got here means that the readable side wants more data.
    Transform.prototype._read = function (n) {
      var ts = this._transformState;

      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        // mark that we need a transform, so that any data that comes in
        // will get processed, now that we've asked for it.
        ts.needTransform = true;
      }
    };

    Transform.prototype._destroy = function (err, cb) {
      var _this = this;

      Duplex.prototype._destroy.call(this, err, function (err2) {
        cb(err2);
        _this.emit('close');
      });
    };

    function done(stream, er, data) {
      if (er) return stream.emit('error', er);

      if (data !== null && data !== undefined) stream.push(data);

      // if there's nothing in the write buffer, then that means
      // that nothing more will ever be provided
      var ws = stream._writableState;
      var ts = stream._transformState;

      if (ws.length) throw new Error('Calling transform done when ws.length != 0');

      if (ts.transforming) throw new Error('Calling transform done when still transforming');

      return stream.push(null);
    }
  }, { "./_stream_duplex": 8, "core-util-is": 24, "inherits": 28 }], 12: [function (require, module, exports) {
    (function (process, global, setImmediate) {
      (function () {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        // A bit simpler than readable streams.
        // Implement an async ._write(chunk, encoding, cb), and it'll handle all
        // the drain event emission and buffering.

        'use strict';

        /*<replacement>*/

        var processNextTick = require('process-nextick-args');
        /*</replacement>*/

        module.exports = Writable;

        /* <replacement> */
        function WriteReq(chunk, encoding, cb) {
          this.chunk = chunk;
          this.encoding = encoding;
          this.callback = cb;
          this.next = null;
        }

        // It seems a linked list but it is not
        // there will be only 2 of these for each stream
        function CorkedRequest(state) {
          var _this = this;

          this.next = null;
          this.entry = null;
          this.finish = function () {
            onCorkedFinish(_this, state);
          };
        }
        /* </replacement> */

        /*<replacement>*/
        var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
        /*</replacement>*/

        /*<replacement>*/
        var Duplex;
        /*</replacement>*/

        Writable.WritableState = WritableState;

        /*<replacement>*/
        var util = require('core-util-is');
        util.inherits = require('inherits');
        /*</replacement>*/

        /*<replacement>*/
        var internalUtil = {
          deprecate: require('util-deprecate')
        };
        /*</replacement>*/

        /*<replacement>*/
        var Stream = require('./internal/streams/stream');
        /*</replacement>*/

        /*<replacement>*/
        var Buffer = require('safe-buffer').Buffer;
        var OurUint8Array = global.Uint8Array || function () { };
        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }
        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }
        /*</replacement>*/

        var destroyImpl = require('./internal/streams/destroy');

        util.inherits(Writable, Stream);

        function nop() { }

        function WritableState(options, stream) {
          Duplex = Duplex || require('./_stream_duplex');

          options = options || {};

          // object stream flag to indicate whether or not this stream
          // contains buffers or objects.
          this.objectMode = !!options.objectMode;

          if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

          // the point at which write() starts returning false
          // Note: 0 is a valid value, means that we always return false if
          // the entire buffer is not flushed immediately on write()
          var hwm = options.highWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;
          this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

          // cast to ints.
          this.highWaterMark = Math.floor(this.highWaterMark);

          // if _final has been called
          this.finalCalled = false;

          // drain event flag.
          this.needDrain = false;
          // at the start of calling end()
          this.ending = false;
          // when end() has been called, and returned
          this.ended = false;
          // when 'finish' is emitted
          this.finished = false;

          // has it been destroyed
          this.destroyed = false;

          // should we decode strings into buffers before passing to _write?
          // this is here so that some node-core streams can optimize string
          // handling at a lower level.
          var noDecode = options.decodeStrings === false;
          this.decodeStrings = !noDecode;

          // Crypto is kind of old and crusty.  Historically, its default string
          // encoding is 'binary' so we have to make this configurable.
          // Everything else in the universe uses 'utf8', though.
          this.defaultEncoding = options.defaultEncoding || 'utf8';

          // not an actual buffer we keep track of, but a measurement
          // of how much we're waiting to get pushed to some underlying
          // socket or file.
          this.length = 0;

          // a flag to see when we're in the middle of a write.
          this.writing = false;

          // when true all writes will be buffered until .uncork() call
          this.corked = 0;

          // a flag to be able to tell if the onwrite cb is called immediately,
          // or on a later tick.  We set this to true at first, because any
          // actions that shouldn't happen until "later" should generally also
          // not happen before the first write call.
          this.sync = true;

          // a flag to know if we're processing previously buffered items, which
          // may call the _write() callback in the same tick, so that we don't
          // end up in an overlapped onwrite situation.
          this.bufferProcessing = false;

          // the callback that's passed to _write(chunk,cb)
          this.onwrite = function (er) {
            onwrite(stream, er);
          };

          // the callback that the user supplies to write(chunk,encoding,cb)
          this.writecb = null;

          // the amount that is being written when _write is called.
          this.writelen = 0;

          this.bufferedRequest = null;
          this.lastBufferedRequest = null;

          // number of pending user-supplied write callbacks
          // this must be 0 before 'finish' can be emitted
          this.pendingcb = 0;

          // emit prefinish if the only thing we're waiting for is _write cbs
          // This is relevant for synchronous Transform streams
          this.prefinished = false;

          // True if the error was already emitted and should not be thrown again
          this.errorEmitted = false;

          // count buffered requests
          this.bufferedRequestCount = 0;

          // allocate the first CorkedRequest, there is always
          // one allocated and free to use, and we maintain at most two
          this.corkedRequestsFree = new CorkedRequest(this);
        }

        WritableState.prototype.getBuffer = function getBuffer() {
          var current = this.bufferedRequest;
          var out = [];
          while (current) {
            out.push(current);
            current = current.next;
          }
          return out;
        };

        (function () {
          try {
            Object.defineProperty(WritableState.prototype, 'buffer', {
              get: internalUtil.deprecate(function () {
                return this.getBuffer();
              }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
            });
          } catch (_) { }
        })();

        // Test _writableState for inheritance to account for Duplex streams,
        // whose prototype chain only points to Readable.
        var realHasInstance;
        if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
          realHasInstance = Function.prototype[Symbol.hasInstance];
          Object.defineProperty(Writable, Symbol.hasInstance, {
            value: function (object) {
              if (realHasInstance.call(this, object)) return true;

              return object && object._writableState instanceof WritableState;
            }
          });
        } else {
          realHasInstance = function (object) {
            return object instanceof this;
          };
        }

        function Writable(options) {
          Duplex = Duplex || require('./_stream_duplex');

          // Writable ctor is applied to Duplexes, too.
          // `realHasInstance` is necessary because using plain `instanceof`
          // would return false, as no `_writableState` property is attached.

          // Trying to use the custom `instanceof` for Writable here will also break the
          // Node.js LazyTransform implementation, which has a non-trivial getter for
          // `_writableState` that would lead to infinite recursion.
          if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
            return new Writable(options);
          }

          this._writableState = new WritableState(options, this);

          // legacy.
          this.writable = true;

          if (options) {
            if (typeof options.write === 'function') this._write = options.write;

            if (typeof options.writev === 'function') this._writev = options.writev;

            if (typeof options.destroy === 'function') this._destroy = options.destroy;

            if (typeof options.final === 'function') this._final = options.final;
          }

          Stream.call(this);
        }

        // Otherwise people can pipe Writable streams, which is just wrong.
        Writable.prototype.pipe = function () {
          this.emit('error', new Error('Cannot pipe, not readable'));
        };

        function writeAfterEnd(stream, cb) {
          var er = new Error('write after end');
          // TODO: defer error events consistently everywhere, not just the cb
          stream.emit('error', er);
          processNextTick(cb, er);
        }

        // Checks that a user-supplied chunk is valid, especially for the particular
        // mode the stream is in. Currently this means that `null` is never accepted
        // and undefined/non-string values are only allowed in object mode.
        function validChunk(stream, state, chunk, cb) {
          var valid = true;
          var er = false;

          if (chunk === null) {
            er = new TypeError('May not write null values to stream');
          } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
            er = new TypeError('Invalid non-string/buffer chunk');
          }
          if (er) {
            stream.emit('error', er);
            processNextTick(cb, er);
            valid = false;
          }
          return valid;
        }

        Writable.prototype.write = function (chunk, encoding, cb) {
          var state = this._writableState;
          var ret = false;
          var isBuf = _isUint8Array(chunk) && !state.objectMode;

          if (isBuf && !Buffer.isBuffer(chunk)) {
            chunk = _uint8ArrayToBuffer(chunk);
          }

          if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
          }

          if (isBuf) encoding = 'buffer'; else if (!encoding) encoding = state.defaultEncoding;

          if (typeof cb !== 'function') cb = nop;

          if (state.ended) writeAfterEnd(this, cb); else if (isBuf || validChunk(this, state, chunk, cb)) {
            state.pendingcb++;
            ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
          }

          return ret;
        };

        Writable.prototype.cork = function () {
          var state = this._writableState;

          state.corked++;
        };

        Writable.prototype.uncork = function () {
          var state = this._writableState;

          if (state.corked) {
            state.corked--;

            if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
          }
        };

        Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
          // node::ParseEncoding() requires lower case.
          if (typeof encoding === 'string') encoding = encoding.toLowerCase();
          if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
          this._writableState.defaultEncoding = encoding;
          return this;
        };

        function decodeChunk(state, chunk, encoding) {
          if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
            chunk = Buffer.from(chunk, encoding);
          }
          return chunk;
        }

        // if we're already writing something, then just put this
        // in the queue, and wait our turn.  Otherwise, call _write
        // If we return false, then we need a drain event, so set that flag.
        function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
          if (!isBuf) {
            var newChunk = decodeChunk(state, chunk, encoding);
            if (chunk !== newChunk) {
              isBuf = true;
              encoding = 'buffer';
              chunk = newChunk;
            }
          }
          var len = state.objectMode ? 1 : chunk.length;

          state.length += len;

          var ret = state.length < state.highWaterMark;
          // we must ensure that previous needDrain will not be reset to false.
          if (!ret) state.needDrain = true;

          if (state.writing || state.corked) {
            var last = state.lastBufferedRequest;
            state.lastBufferedRequest = {
              chunk: chunk,
              encoding: encoding,
              isBuf: isBuf,
              callback: cb,
              next: null
            };
            if (last) {
              last.next = state.lastBufferedRequest;
            } else {
              state.bufferedRequest = state.lastBufferedRequest;
            }
            state.bufferedRequestCount += 1;
          } else {
            doWrite(stream, state, false, len, chunk, encoding, cb);
          }

          return ret;
        }

        function doWrite(stream, state, writev, len, chunk, encoding, cb) {
          state.writelen = len;
          state.writecb = cb;
          state.writing = true;
          state.sync = true;
          if (writev) stream._writev(chunk, state.onwrite); else stream._write(chunk, encoding, state.onwrite);
          state.sync = false;
        }

        function onwriteError(stream, state, sync, er, cb) {
          --state.pendingcb;

          if (sync) {
            // defer the callback if we are being called synchronously
            // to avoid piling up things on the stack
            processNextTick(cb, er);
            // this can emit finish, and it will always happen
            // after error
            processNextTick(finishMaybe, stream, state);
            stream._writableState.errorEmitted = true;
            stream.emit('error', er);
          } else {
            // the caller expect this to happen before if
            // it is async
            cb(er);
            stream._writableState.errorEmitted = true;
            stream.emit('error', er);
            // this can emit finish, but finish must
            // always follow error
            finishMaybe(stream, state);
          }
        }

        function onwriteStateUpdate(state) {
          state.writing = false;
          state.writecb = null;
          state.length -= state.writelen;
          state.writelen = 0;
        }

        function onwrite(stream, er) {
          var state = stream._writableState;
          var sync = state.sync;
          var cb = state.writecb;

          onwriteStateUpdate(state);

          if (er) onwriteError(stream, state, sync, er, cb); else {
            // Check if we're actually ready to finish, but don't emit yet
            var finished = needFinish(state);

            if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
              clearBuffer(stream, state);
            }

            if (sync) {
              /*<replacement>*/
              asyncWrite(afterWrite, stream, state, finished, cb);
              /*</replacement>*/
            } else {
              afterWrite(stream, state, finished, cb);
            }
          }
        }

        function afterWrite(stream, state, finished, cb) {
          if (!finished) onwriteDrain(stream, state);
          state.pendingcb--;
          cb();
          finishMaybe(stream, state);
        }

        // Must force callback to be called on nextTick, so that we don't
        // emit 'drain' before the write() consumer gets the 'false' return
        // value, and has a chance to attach a 'drain' listener.
        function onwriteDrain(stream, state) {
          if (state.length === 0 && state.needDrain) {
            state.needDrain = false;
            stream.emit('drain');
          }
        }

        // if there's something in the buffer waiting, then process it
        function clearBuffer(stream, state) {
          state.bufferProcessing = true;
          var entry = state.bufferedRequest;

          if (stream._writev && entry && entry.next) {
            // Fast case, write everything using _writev()
            var l = state.bufferedRequestCount;
            var buffer = new Array(l);
            var holder = state.corkedRequestsFree;
            holder.entry = entry;

            var count = 0;
            var allBuffers = true;
            while (entry) {
              buffer[count] = entry;
              if (!entry.isBuf) allBuffers = false;
              entry = entry.next;
              count += 1;
            }
            buffer.allBuffers = allBuffers;

            doWrite(stream, state, true, state.length, buffer, '', holder.finish);

            // doWrite is almost always async, defer these to save a bit of time
            // as the hot path ends with doWrite
            state.pendingcb++;
            state.lastBufferedRequest = null;
            if (holder.next) {
              state.corkedRequestsFree = holder.next;
              holder.next = null;
            } else {
              state.corkedRequestsFree = new CorkedRequest(state);
            }
          } else {
            // Slow case, write chunks one-by-one
            while (entry) {
              var chunk = entry.chunk;
              var encoding = entry.encoding;
              var cb = entry.callback;
              var len = state.objectMode ? 1 : chunk.length;

              doWrite(stream, state, false, len, chunk, encoding, cb);
              entry = entry.next;
              // if we didn't call the onwrite immediately, then
              // it means that we need to wait until it does.
              // also, that means that the chunk and cb are currently
              // being processed, so move the buffer counter past them.
              if (state.writing) {
                break;
              }
            }

            if (entry === null) state.lastBufferedRequest = null;
          }

          state.bufferedRequestCount = 0;
          state.bufferedRequest = entry;
          state.bufferProcessing = false;
        }

        Writable.prototype._write = function (chunk, encoding, cb) {
          cb(new Error('_write() is not implemented'));
        };

        Writable.prototype._writev = null;

        Writable.prototype.end = function (chunk, encoding, cb) {
          var state = this._writableState;

          if (typeof chunk === 'function') {
            cb = chunk;
            chunk = null;
            encoding = null;
          } else if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
          }

          if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

          // .end() fully uncorks
          if (state.corked) {
            state.corked = 1;
            this.uncork();
          }

          // ignore unnecessary end() calls.
          if (!state.ending && !state.finished) endWritable(this, state, cb);
        };

        function needFinish(state) {
          return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
        }
        function callFinal(stream, state) {
          stream._final(function (err) {
            state.pendingcb--;
            if (err) {
              stream.emit('error', err);
            }
            state.prefinished = true;
            stream.emit('prefinish');
            finishMaybe(stream, state);
          });
        }
        function prefinish(stream, state) {
          if (!state.prefinished && !state.finalCalled) {
            if (typeof stream._final === 'function') {
              state.pendingcb++;
              state.finalCalled = true;
              processNextTick(callFinal, stream, state);
            } else {
              state.prefinished = true;
              stream.emit('prefinish');
            }
          }
        }

        function finishMaybe(stream, state) {
          var need = needFinish(state);
          if (need) {
            prefinish(stream, state);
            if (state.pendingcb === 0) {
              state.finished = true;
              stream.emit('finish');
            }
          }
          return need;
        }

        function endWritable(stream, state, cb) {
          state.ending = true;
          finishMaybe(stream, state);
          if (cb) {
            if (state.finished) processNextTick(cb); else stream.once('finish', cb);
          }
          state.ended = true;
          stream.writable = false;
        }

        function onCorkedFinish(corkReq, state, err) {
          var entry = corkReq.entry;
          corkReq.entry = null;
          while (entry) {
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
          }
          if (state.corkedRequestsFree) {
            state.corkedRequestsFree.next = corkReq;
          } else {
            state.corkedRequestsFree = corkReq;
          }
        }

        Object.defineProperty(Writable.prototype, 'destroyed', {
          get: function () {
            if (this._writableState === undefined) {
              return false;
            }
            return this._writableState.destroyed;
          },
          set: function (value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._writableState) {
              return;
            }

            // backward compatibility, the user is explicitly
            // managing destroyed
            this._writableState.destroyed = value;
          }
        });

        Writable.prototype.destroy = destroyImpl.destroy;
        Writable.prototype._undestroy = destroyImpl.undestroy;
        Writable.prototype._destroy = function (err, cb) {
          this.end();
          cb(err);
        };
      }).call(this)
    }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("timers").setImmediate)

  }, { "./_stream_duplex": 8, "./internal/streams/destroy": 14, "./internal/streams/stream": 15, "_process": 35, "core-util-is": 24, "inherits": 28, "process-nextick-args": 34, "safe-buffer": 17, "timers": 71, "util-deprecate": 72 }], 13: [function (require, module, exports) {
    'use strict';

    /*<replacement>*/

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Buffer = require('safe-buffer').Buffer;
    /*</replacement>*/

    function copyBuffer(src, target, offset) {
      src.copy(target, offset);
    }

    module.exports = function () {
      function BufferList() {
        _classCallCheck(this, BufferList);

        this.head = null;
        this.tail = null;
        this.length = 0;
      }

      BufferList.prototype.push = function push(v) {
        var entry = { data: v, next: null };
        if (this.length > 0) this.tail.next = entry; else this.head = entry;
        this.tail = entry;
        ++this.length;
      };

      BufferList.prototype.unshift = function unshift(v) {
        var entry = { data: v, next: this.head };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      };

      BufferList.prototype.shift = function shift() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null; else this.head = this.head.next;
        --this.length;
        return ret;
      };

      BufferList.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
      };

      BufferList.prototype.join = function join(s) {
        if (this.length === 0) return '';
        var p = this.head;
        var ret = '' + p.data;
        while (p = p.next) {
          ret += s + p.data;
        } return ret;
      };

      BufferList.prototype.concat = function concat(n) {
        if (this.length === 0) return Buffer.alloc(0);
        if (this.length === 1) return this.head.data;
        var ret = Buffer.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };

      return BufferList;
    }();
  }, { "safe-buffer": 17 }], 14: [function (require, module, exports) {
    'use strict';

    /*<replacement>*/

    var processNextTick = require('process-nextick-args');
    /*</replacement>*/

    // undocumented cb() API, needed for core, not for public API
    function destroy(err, cb) {
      var _this = this;

      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;

      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
          processNextTick(emitErrorNT, this, err);
        }
        return;
      }

      // we set destroyed to true before firing error callbacks in order
      // to make it re-entrance safe in case destroy() is called within callbacks

      if (this._readableState) {
        this._readableState.destroyed = true;
      }

      // if this is a duplex stream mark the writable part as destroyed as well
      if (this._writableState) {
        this._writableState.destroyed = true;
      }

      this._destroy(err || null, function (err) {
        if (!cb && err) {
          processNextTick(emitErrorNT, _this, err);
          if (_this._writableState) {
            _this._writableState.errorEmitted = true;
          }
        } else if (cb) {
          cb(err);
        }
      });
    }

    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }

      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }

    function emitErrorNT(self, err) {
      self.emit('error', err);
    }

    module.exports = {
      destroy: destroy,
      undestroy: undestroy
    };
  }, { "process-nextick-args": 34 }], 15: [function (require, module, exports) {
    module.exports = require('events').EventEmitter;

  }, { "events": 22 }], 16: [function (require, module, exports) {
    exports = module.exports = require('./lib/_stream_readable.js');
    exports.Stream = exports;
    exports.Readable = exports;
    exports.Writable = require('./lib/_stream_writable.js');
    exports.Duplex = require('./lib/_stream_duplex.js');
    exports.Transform = require('./lib/_stream_transform.js');
    exports.PassThrough = require('./lib/_stream_passthrough.js');

  }, { "./lib/_stream_duplex.js": 8, "./lib/_stream_passthrough.js": 9, "./lib/_stream_readable.js": 10, "./lib/_stream_transform.js": 11, "./lib/_stream_writable.js": 12 }], 17: [function (require, module, exports) {
    /* eslint-disable node/no-deprecated-api */
    var buffer = require('buffer')
    var Buffer = buffer.Buffer

    // alternative to using Object.keys for old browsers
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key]
      }
    }
    if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
      module.exports = buffer
    } else {
      // Copy properties from require('buffer')
      copyProps(buffer, exports)
      exports.Buffer = SafeBuffer
    }

    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer(arg, encodingOrOffset, length)
    }

    // Copy static methods from Buffer
    copyProps(Buffer, SafeBuffer)

    SafeBuffer.from = function (arg, encodingOrOffset, length) {
      if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number')
      }
      return Buffer(arg, encodingOrOffset, length)
    }

    SafeBuffer.alloc = function (size, fill, encoding) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      var buf = Buffer(size)
      if (fill !== undefined) {
        if (typeof encoding === 'string') {
          buf.fill(fill, encoding)
        } else {
          buf.fill(fill)
        }
      } else {
        buf.fill(0)
      }
      return buf
    }

    SafeBuffer.allocUnsafe = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      return Buffer(size)
    }

    SafeBuffer.allocUnsafeSlow = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      return buffer.SlowBuffer(size)
    }

  }, { "buffer": 21 }], 18: [function (require, module, exports) {
    'use strict';

    var Buffer = require('safe-buffer').Buffer;

    var isEncoding = Buffer.isEncoding || function (encoding) {
      encoding = '' + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw':
          return true;
        default:
          return false;
      }
    };

    function _normalizeEncoding(enc) {
      if (!enc) return 'utf8';
      var retried;
      while (true) {
        switch (enc) {
          case 'utf8':
          case 'utf-8':
            return 'utf8';
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return 'utf16le';
          case 'latin1':
          case 'binary':
            return 'latin1';
          case 'base64':
          case 'ascii':
          case 'hex':
            return enc;
          default:
            if (retried) return; // undefined
            enc = ('' + enc).toLowerCase();
            retried = true;
        }
      }
    };

    // Do not cache `Buffer.isEncoding` when checking encoding names as some
    // modules monkey-patch it to support additional encodings
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
      return nenc || enc;
    }

    // StringDecoder provides an interface for efficiently splitting a series of
    // buffers into a series of JS strings without breaking apart multi-byte
    // characters.
    exports.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case 'utf16le':
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case 'utf8':
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case 'base64':
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer.allocUnsafe(nb);
    }

    StringDecoder.prototype.write = function (buf) {
      if (buf.length === 0) return '';
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || '';
    };

    StringDecoder.prototype.end = utf8End;

    // Returns only complete characters in a Buffer
    StringDecoder.prototype.text = utf8Text;

    // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
    StringDecoder.prototype.fillLast = function (buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };

    // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
    // continuation byte.
    function utf8CheckByte(byte) {
      if (byte <= 0x7F) return 0; else if (byte >> 5 === 0x06) return 2; else if (byte >> 4 === 0x0E) return 3; else if (byte >> 3 === 0x1E) return 4;
      return -1;
    }

    // Checks at most 3 bytes at the end of a Buffer in order to detect an
    // incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
    // needed to complete the UTF-8 character (if applicable) are returned.
    function utf8CheckIncomplete(self, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0; else self.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }

    // Validates as many continuation bytes for a multi-byte UTF-8 character as
    // needed or are available. If we see a non-continuation byte where we expect
    // one, we "replace" the validated continuation bytes we've seen so far with
    // UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
    // behavior. The continuation byte check is included three times in the case
    // where all of the continuation bytes for a character exist in the same buffer.
    // It is also done this way as a slight performance increase instead of using a
    // loop.
    function utf8CheckExtraBytes(self, buf, p) {
      if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return '\ufffd'.repeat(p);
      }
      if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
          self.lastNeed = 1;
          return '\ufffd'.repeat(p + 1);
        }
        if (self.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 0xC0) !== 0x80) {
            self.lastNeed = 2;
            return '\ufffd'.repeat(p + 2);
          }
        }
      }
    }

    // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== undefined) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }

    // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
    // partial character, the character's bytes are buffered until the required
    // number of bytes are available.
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString('utf8', i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString('utf8', i, end);
    }

    // For UTF-8, a replacement character for each buffered byte of a (partial)
    // character needs to be added to the output.
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
      return r;
    }

    // UTF-16LE typically needs two bytes per character, but even if we have an even
    // number of bytes available, we need to check if we end on a leading/high
    // surrogate. In that case, we need to wait for the next two bytes in order to
    // decode the last character properly.
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 0xD800 && c <= 0xDBFF) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString('utf16le', i, buf.length - 1);
    }

    // For UTF-16LE we do not explicitly append special replacement characters if we
    // end on a partial character, we simply let v8 handle that.
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
      }
      return r;
    }

    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString('base64', i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString('base64', i, buf.length - n);
    }

    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
      return r;
    }

    // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }

    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : '';
    }
  }, { "safe-buffer": 17 }], 19: [function (require, module, exports) {
    'use strict'

    exports.byteLength = byteLength
    exports.toByteArray = toByteArray
    exports.fromByteArray = fromByteArray

    var lookup = []
    var revLookup = []
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i]
      revLookup[code.charCodeAt(i)] = i
    }

    // Support decoding URL-safe base64 strings, as Node.js does.
    // See: https://en.wikipedia.org/wiki/Base64#URL_applications
    revLookup['-'.charCodeAt(0)] = 62
    revLookup['_'.charCodeAt(0)] = 63

    function getLens(b64) {
      var len = b64.length

      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4')
      }

      // Trim off extra bytes after placeholder bytes are found
      // See: https://github.com/beatgammit/base64-js/issues/42
      var validLen = b64.indexOf('=')
      if (validLen === -1) validLen = len

      var placeHoldersLen = validLen === len
        ? 0
        : 4 - (validLen % 4)

      return [validLen, placeHoldersLen]
    }

    // base64 is 4/3 + up to two characters of the original data
    function byteLength(b64) {
      var lens = getLens(b64)
      var validLen = lens[0]
      var placeHoldersLen = lens[1]
      return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
    }

    function _byteLength(b64, validLen, placeHoldersLen) {
      return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
    }

    function toByteArray(b64) {
      var tmp
      var lens = getLens(b64)
      var validLen = lens[0]
      var placeHoldersLen = lens[1]

      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

      var curByte = 0

      // if there are placeholders, only get up to the last complete 4 chars
      var len = placeHoldersLen > 0
        ? validLen - 4
        : validLen

      var i
      for (i = 0; i < len; i += 4) {
        tmp =
          (revLookup[b64.charCodeAt(i)] << 18) |
          (revLookup[b64.charCodeAt(i + 1)] << 12) |
          (revLookup[b64.charCodeAt(i + 2)] << 6) |
          revLookup[b64.charCodeAt(i + 3)]
        arr[curByte++] = (tmp >> 16) & 0xFF
        arr[curByte++] = (tmp >> 8) & 0xFF
        arr[curByte++] = tmp & 0xFF
      }

      if (placeHoldersLen === 2) {
        tmp =
          (revLookup[b64.charCodeAt(i)] << 2) |
          (revLookup[b64.charCodeAt(i + 1)] >> 4)
        arr[curByte++] = tmp & 0xFF
      }

      if (placeHoldersLen === 1) {
        tmp =
          (revLookup[b64.charCodeAt(i)] << 10) |
          (revLookup[b64.charCodeAt(i + 1)] << 4) |
          (revLookup[b64.charCodeAt(i + 2)] >> 2)
        arr[curByte++] = (tmp >> 8) & 0xFF
        arr[curByte++] = tmp & 0xFF
      }

      return arr
    }

    function tripletToBase64(num) {
      return lookup[num >> 18 & 0x3F] +
        lookup[num >> 12 & 0x3F] +
        lookup[num >> 6 & 0x3F] +
        lookup[num & 0x3F]
    }

    function encodeChunk(uint8, start, end) {
      var tmp
      var output = []
      for (var i = start; i < end; i += 3) {
        tmp =
          ((uint8[i] << 16) & 0xFF0000) +
          ((uint8[i + 1] << 8) & 0xFF00) +
          (uint8[i + 2] & 0xFF)
        output.push(tripletToBase64(tmp))
      }
      return output.join('')
    }

    function fromByteArray(uint8) {
      var tmp
      var len = uint8.length
      var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
      var parts = []
      var maxChunkLength = 16383 // must be multiple of 3

      // go through the array every three bytes, we'll deal with trailing stuff later
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
      }

      // pad the end with zeros, but make sure to not forget the extra bytes
      if (extraBytes === 1) {
        tmp = uint8[len - 1]
        parts.push(
          lookup[tmp >> 2] +
          lookup[(tmp << 4) & 0x3F] +
          '=='
        )
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1]
        parts.push(
          lookup[tmp >> 10] +
          lookup[(tmp >> 4) & 0x3F] +
          lookup[(tmp << 2) & 0x3F] +
          '='
        )
      }

      return parts.join('')
    }

  }, {}], 20: [function (require, module, exports) {

  }, {}], 21: [function (require, module, exports) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    /* eslint-disable no-proto */

    'use strict'

    var base64 = require('base64-js')
    var ieee754 = require('ieee754')

    exports.Buffer = Buffer
    exports.SlowBuffer = SlowBuffer
    exports.INSPECT_MAX_BYTES = 50

    var K_MAX_LENGTH = 0x7fffffff
    exports.kMaxLength = K_MAX_LENGTH

    /**
     * If `Buffer.TYPED_ARRAY_SUPPORT`:
     *   === true    Use Uint8Array implementation (fastest)
     *   === false   Print warning and recommend using `buffer` v4.x which has an Object
     *               implementation (most compatible, even IE6)
     *
     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
     * Opera 11.6+, iOS 4.2+.
     *
     * We report that the browser does not support typed arrays if the are not subclassable
     * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
     * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
     * for __proto__ and has a buggy typed array implementation.
     */
    Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

    if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
      typeof console.error === 'function') {
      console.error(
        'This browser lacks typed array (Uint8Array) support which is required by ' +
        '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
      )
    }

    function typedArraySupport() {
      // Can typed array instances can be augmented?
      try {
        var arr = new Uint8Array(1)
        arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
        return arr.foo() === 42
      } catch (e) {
        return false
      }
    }

    Object.defineProperty(Buffer.prototype, 'parent', {
      enumerable: true,
      get: function () {
        if (!Buffer.isBuffer(this)) return undefined
        return this.buffer
      }
    })

    Object.defineProperty(Buffer.prototype, 'offset', {
      enumerable: true,
      get: function () {
        if (!Buffer.isBuffer(this)) return undefined
        return this.byteOffset
      }
    })

    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"')
      }
      // Return an augmented `Uint8Array` instance
      var buf = new Uint8Array(length)
      buf.__proto__ = Buffer.prototype
      return buf
    }

    /**
     * The Buffer constructor returns instances of `Uint8Array` that have their
     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
     * returns a single octet.
     *
     * The `Uint8Array` prototype remains unmodified.
     */

    function Buffer(arg, encodingOrOffset, length) {
      // Common case.
      if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          )
        }
        return allocUnsafe(arg)
      }
      return from(arg, encodingOrOffset, length)
    }

    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    if (typeof Symbol !== 'undefined' && Symbol.species != null &&
      Buffer[Symbol.species] === Buffer) {
      Object.defineProperty(Buffer, Symbol.species, {
        value: null,
        configurable: true,
        enumerable: false,
        writable: false
      })
    }

    Buffer.poolSize = 8192 // not used by this implementation

    function from(value, encodingOrOffset, length) {
      if (typeof value === 'string') {
        return fromString(value, encodingOrOffset)
      }

      if (ArrayBuffer.isView(value)) {
        return fromArrayLike(value)
      }

      if (value == null) {
        throw TypeError(
          'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
          'or Array-like Object. Received type ' + (typeof value)
        )
      }

      if (isInstance(value, ArrayBuffer) ||
        (value && isInstance(value.buffer, ArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length)
      }

      if (typeof value === 'number') {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        )
      }

      var valueOf = value.valueOf && value.valueOf()
      if (valueOf != null && valueOf !== value) {
        return Buffer.from(valueOf, encodingOrOffset, length)
      }

      var b = fromObject(value)
      if (b) return b

      if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
        typeof value[Symbol.toPrimitive] === 'function') {
        return Buffer.from(
          value[Symbol.toPrimitive]('string'), encodingOrOffset, length
        )
      }

      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
        'or Array-like Object. Received type ' + (typeof value)
      )
    }

    /**
     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
     * if value is a number.
     * Buffer.from(str[, encoding])
     * Buffer.from(array)
     * Buffer.from(buffer)
     * Buffer.from(arrayBuffer[, byteOffset[, length]])
     **/
    Buffer.from = function (value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length)
    }

    // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
    // https://github.com/feross/buffer/pull/148
    Buffer.prototype.__proto__ = Uint8Array.prototype
    Buffer.__proto__ = Uint8Array

    function assertSize(size) {
      if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be of type number')
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"')
      }
    }

    function alloc(size, fill, encoding) {
      assertSize(size)
      if (size <= 0) {
        return createBuffer(size)
      }
      if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpretted as a start offset.
        return typeof encoding === 'string'
          ? createBuffer(size).fill(fill, encoding)
          : createBuffer(size).fill(fill)
      }
      return createBuffer(size)
    }

    /**
     * Creates a new filled Buffer instance.
     * alloc(size[, fill[, encoding]])
     **/
    Buffer.alloc = function (size, fill, encoding) {
      return alloc(size, fill, encoding)
    }

    function allocUnsafe(size) {
      assertSize(size)
      return createBuffer(size < 0 ? 0 : checked(size) | 0)
    }

    /**
     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
     * */
    Buffer.allocUnsafe = function (size) {
      return allocUnsafe(size)
    }
    /**
     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
     */
    Buffer.allocUnsafeSlow = function (size) {
      return allocUnsafe(size)
    }

    function fromString(string, encoding) {
      if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8'
      }

      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding)
      }

      var length = byteLength(string, encoding) | 0
      var buf = createBuffer(length)

      var actual = buf.write(string, encoding)

      if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        buf = buf.slice(0, actual)
      }

      return buf
    }

    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0
      var buf = createBuffer(length)
      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255
      }
      return buf
    }

    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds')
      }

      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds')
      }

      var buf
      if (byteOffset === undefined && length === undefined) {
        buf = new Uint8Array(array)
      } else if (length === undefined) {
        buf = new Uint8Array(array, byteOffset)
      } else {
        buf = new Uint8Array(array, byteOffset, length)
      }

      // Return an augmented `Uint8Array` instance
      buf.__proto__ = Buffer.prototype
      return buf
    }

    function fromObject(obj) {
      if (Buffer.isBuffer(obj)) {
        var len = checked(obj.length) | 0
        var buf = createBuffer(len)

        if (buf.length === 0) {
          return buf
        }

        obj.copy(buf, 0, 0, len)
        return buf
      }

      if (obj.length !== undefined) {
        if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
          return createBuffer(0)
        }
        return fromArrayLike(obj)
      }

      if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data)
      }
    }

    function checked(length) {
      // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
      // length is NaN (which is otherwise coerced to zero.)
      if (length >= K_MAX_LENGTH) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
          'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
      }
      return length | 0
    }

    function SlowBuffer(length) {
      if (+length != length) { // eslint-disable-line eqeqeq
        length = 0
      }
      return Buffer.alloc(+length)
    }

    Buffer.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true &&
        b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    }

    Buffer.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
      if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
      if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        )
      }

      if (a === b) return 0

      var x = a.length
      var y = b.length

      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i]
          y = b[i]
          break
        }
      }

      if (x < y) return -1
      if (y < x) return 1
      return 0
    }

    Buffer.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true
        default:
          return false
      }
    }

    Buffer.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }

      if (list.length === 0) {
        return Buffer.alloc(0)
      }

      var i
      if (length === undefined) {
        length = 0
        for (i = 0; i < list.length; ++i) {
          length += list[i].length
        }
      }

      var buffer = Buffer.allocUnsafe(length)
      var pos = 0
      for (i = 0; i < list.length; ++i) {
        var buf = list[i]
        if (isInstance(buf, Uint8Array)) {
          buf = Buffer.from(buf)
        }
        if (!Buffer.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers')
        }
        buf.copy(buffer, pos)
        pos += buf.length
      }
      return buffer
    }

    function byteLength(string, encoding) {
      if (Buffer.isBuffer(string)) {
        return string.length
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength
      }
      if (typeof string !== 'string') {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
          'Received type ' + typeof string
        )
      }

      var len = string.length
      var mustMatch = (arguments.length > 2 && arguments[2] === true)
      if (!mustMatch && len === 0) return 0

      // Use a for loop to avoid recursion
      var loweredCase = false
      for (; ;) {
        switch (encoding) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return len
          case 'utf8':
          case 'utf-8':
            return utf8ToBytes(string).length
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return len * 2
          case 'hex':
            return len >>> 1
          case 'base64':
            return base64ToBytes(string).length
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
            }
            encoding = ('' + encoding).toLowerCase()
            loweredCase = true
        }
      }
    }
    Buffer.byteLength = byteLength

    function slowToString(encoding, start, end) {
      var loweredCase = false

      // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
      // property of a typed array.

      // This behaves neither like String nor Uint8Array in that we set start/end
      // to their upper/lower bounds if the value passed is out of range.
      // undefined is handled specially as per ECMA-262 6th Edition,
      // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
      if (start === undefined || start < 0) {
        start = 0
      }
      // Return early if start > this.length. Done here to prevent potential uint32
      // coercion fail below.
      if (start > this.length) {
        return ''
      }

      if (end === undefined || end > this.length) {
        end = this.length
      }

      if (end <= 0) {
        return ''
      }

      // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
      end >>>= 0
      start >>>= 0

      if (end <= start) {
        return ''
      }

      if (!encoding) encoding = 'utf8'

      while (true) {
        switch (encoding) {
          case 'hex':
            return hexSlice(this, start, end)

          case 'utf8':
          case 'utf-8':
            return utf8Slice(this, start, end)

          case 'ascii':
            return asciiSlice(this, start, end)

          case 'latin1':
          case 'binary':
            return latin1Slice(this, start, end)

          case 'base64':
            return base64Slice(this, start, end)

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return utf16leSlice(this, start, end)

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
            encoding = (encoding + '').toLowerCase()
            loweredCase = true
        }
      }
    }

    // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
    // to detect a Buffer instance. It's not possible to use `instanceof Buffer`
    // reliably in a browserify context because there could be multiple different
    // copies of the 'buffer' package in use. This method works even for Buffer
    // instances that were created from another copy of the `buffer` package.
    // See: https://github.com/feross/buffer/issues/154
    Buffer.prototype._isBuffer = true

    function swap(b, n, m) {
      var i = b[n]
      b[n] = b[m]
      b[m] = i
    }

    Buffer.prototype.swap16 = function swap16() {
      var len = this.length
      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits')
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1)
      }
      return this
    }

    Buffer.prototype.swap32 = function swap32() {
      var len = this.length
      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits')
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3)
        swap(this, i + 1, i + 2)
      }
      return this
    }

    Buffer.prototype.swap64 = function swap64() {
      var len = this.length
      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits')
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7)
        swap(this, i + 1, i + 6)
        swap(this, i + 2, i + 5)
        swap(this, i + 3, i + 4)
      }
      return this
    }

    Buffer.prototype.toString = function toString() {
      var length = this.length
      if (length === 0) return ''
      if (arguments.length === 0) return utf8Slice(this, 0, length)
      return slowToString.apply(this, arguments)
    }

    Buffer.prototype.toLocaleString = Buffer.prototype.toString

    Buffer.prototype.equals = function equals(b) {
      if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
      if (this === b) return true
      return Buffer.compare(this, b) === 0
    }

    Buffer.prototype.inspect = function inspect() {
      var str = ''
      var max = exports.INSPECT_MAX_BYTES
      str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
      if (this.length > max) str += ' ... '
      return '<Buffer ' + str + '>'
    }

    Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer.from(target, target.offset, target.byteLength)
      }
      if (!Buffer.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. ' +
          'Received type ' + (typeof target)
        )
      }

      if (start === undefined) {
        start = 0
      }
      if (end === undefined) {
        end = target ? target.length : 0
      }
      if (thisStart === undefined) {
        thisStart = 0
      }
      if (thisEnd === undefined) {
        thisEnd = this.length
      }

      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index')
      }

      if (thisStart >= thisEnd && start >= end) {
        return 0
      }
      if (thisStart >= thisEnd) {
        return -1
      }
      if (start >= end) {
        return 1
      }

      start >>>= 0
      end >>>= 0
      thisStart >>>= 0
      thisEnd >>>= 0

      if (this === target) return 0

      var x = thisEnd - thisStart
      var y = end - start
      var len = Math.min(x, y)

      var thisCopy = this.slice(thisStart, thisEnd)
      var targetCopy = target.slice(start, end)

      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i]
          y = targetCopy[i]
          break
        }
      }

      if (x < y) return -1
      if (y < x) return 1
      return 0
    }

    // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
    // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
    //
    // Arguments:
    // - buffer - a Buffer to search
    // - val - a string, Buffer, or number
    // - byteOffset - an index into `buffer`; will be clamped to an int32
    // - encoding - an optional encoding, relevant is val is a string
    // - dir - true for indexOf, false for lastIndexOf
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      // Empty buffer means no match
      if (buffer.length === 0) return -1

      // Normalize byteOffset
      if (typeof byteOffset === 'string') {
        encoding = byteOffset
        byteOffset = 0
      } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff
      } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000
      }
      byteOffset = +byteOffset // Coerce to Number.
      if (numberIsNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : (buffer.length - 1)
      }

      // Normalize byteOffset: negative offsets start from the end of the buffer
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset
      if (byteOffset >= buffer.length) {
        if (dir) return -1
        else byteOffset = buffer.length - 1
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0
        else return -1
      }

      // Normalize val
      if (typeof val === 'string') {
        val = Buffer.from(val, encoding)
      }

      // Finally, search either indexOf (if dir is true) or lastIndexOf
      if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
          return -1
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
      } else if (typeof val === 'number') {
        val = val & 0xFF // Search for a byte value [0-255]
        if (typeof Uint8Array.prototype.indexOf === 'function') {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
      }

      throw new TypeError('val must be string, number or Buffer')
    }

    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1
      var arrLength = arr.length
      var valLength = val.length

      if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase()
        if (encoding === 'ucs2' || encoding === 'ucs-2' ||
          encoding === 'utf16le' || encoding === 'utf-16le') {
          if (arr.length < 2 || val.length < 2) {
            return -1
          }
          indexSize = 2
          arrLength /= 2
          valLength /= 2
          byteOffset /= 2
        }
      }

      function read(buf, i) {
        if (indexSize === 1) {
          return buf[i]
        } else {
          return buf.readUInt16BE(i * indexSize)
        }
      }

      var i
      if (dir) {
        var foundIndex = -1
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
          } else {
            if (foundIndex !== -1) i -= i - foundIndex
            foundIndex = -1
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
        for (i = byteOffset; i >= 0; i--) {
          var found = true
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false
              break
            }
          }
          if (found) return i
        }
      }

      return -1
    }

    Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1
    }

    Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
    }

    Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
    }

    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0
      var remaining = buf.length - offset
      if (!length) {
        length = remaining
      } else {
        length = Number(length)
        if (length > remaining) {
          length = remaining
        }
      }

      var strLen = string.length

      if (length > strLen / 2) {
        length = strLen / 2
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16)
        if (numberIsNaN(parsed)) return i
        buf[offset + i] = parsed
      }
      return i
    }

    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
    }

    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length)
    }

    function latin1Write(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length)
    }

    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length)
    }

    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
    }

    Buffer.prototype.write = function write(string, offset, length, encoding) {
      // Buffer#write(string)
      if (offset === undefined) {
        encoding = 'utf8'
        length = this.length
        offset = 0
        // Buffer#write(string, encoding)
      } else if (length === undefined && typeof offset === 'string') {
        encoding = offset
        length = this.length
        offset = 0
        // Buffer#write(string, offset[, length][, encoding])
      } else if (isFinite(offset)) {
        offset = offset >>> 0
        if (isFinite(length)) {
          length = length >>> 0
          if (encoding === undefined) encoding = 'utf8'
        } else {
          encoding = length
          length = undefined
        }
      } else {
        throw new Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported'
        )
      }

      var remaining = this.length - offset
      if (length === undefined || length > remaining) length = remaining

      if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds')
      }

      if (!encoding) encoding = 'utf8'

      var loweredCase = false
      for (; ;) {
        switch (encoding) {
          case 'hex':
            return hexWrite(this, string, offset, length)

          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length)

          case 'ascii':
            return asciiWrite(this, string, offset, length)

          case 'latin1':
          case 'binary':
            return latin1Write(this, string, offset, length)

          case 'base64':
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length)

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length)

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
            encoding = ('' + encoding).toLowerCase()
            loweredCase = true
        }
      }
    }

    Buffer.prototype.toJSON = function toJSON() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      }
    }

    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf)
      } else {
        return base64.fromByteArray(buf.slice(start, end))
      }
    }

    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end)
      var res = []

      var i = start
      while (i < end) {
        var firstByte = buf[i]
        var codePoint = null
        var bytesPerSequence = (firstByte > 0xEF) ? 4
          : (firstByte > 0xDF) ? 3
            : (firstByte > 0xBF) ? 2
              : 1

        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint

          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 0x80) {
                codePoint = firstByte
              }
              break
            case 2:
              secondByte = buf[i + 1]
              if ((secondByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
                if (tempCodePoint > 0x7F) {
                  codePoint = tempCodePoint
                }
              }
              break
            case 3:
              secondByte = buf[i + 1]
              thirdByte = buf[i + 2]
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                  codePoint = tempCodePoint
                }
              }
              break
            case 4:
              secondByte = buf[i + 1]
              thirdByte = buf[i + 2]
              fourthByte = buf[i + 3]
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                  codePoint = tempCodePoint
                }
              }
          }
        }

        if (codePoint === null) {
          // we did not generate a valid codePoint so insert a
          // replacement char (U+FFFD) and advance only 1 byte
          codePoint = 0xFFFD
          bytesPerSequence = 1
        } else if (codePoint > 0xFFFF) {
          // encode to utf16 (surrogate pair dance)
          codePoint -= 0x10000
          res.push(codePoint >>> 10 & 0x3FF | 0xD800)
          codePoint = 0xDC00 | codePoint & 0x3FF
        }

        res.push(codePoint)
        i += bytesPerSequence
      }

      return decodeCodePointsArray(res)
    }

    // Based on http://stackoverflow.com/a/22747272/680742, the browser with
    // the lowest limit is Chrome, with 0x10000 args.
    // We go 1 magnitude less, for safety
    var MAX_ARGUMENTS_LENGTH = 0x1000

    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
      }

      // Decode in chunks to avoid "call stack size exceeded".
      var res = ''
      var i = 0
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        )
      }
      return res
    }

    function asciiSlice(buf, start, end) {
      var ret = ''
      end = Math.min(buf.length, end)

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 0x7F)
      }
      return ret
    }

    function latin1Slice(buf, start, end) {
      var ret = ''
      end = Math.min(buf.length, end)

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i])
      }
      return ret
    }

    function hexSlice(buf, start, end) {
      var len = buf.length

      if (!start || start < 0) start = 0
      if (!end || end < 0 || end > len) end = len

      var out = ''
      for (var i = start; i < end; ++i) {
        out += toHex(buf[i])
      }
      return out
    }

    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end)
      var res = ''
      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
      }
      return res
    }

    Buffer.prototype.slice = function slice(start, end) {
      var len = this.length
      start = ~~start
      end = end === undefined ? len : ~~end

      if (start < 0) {
        start += len
        if (start < 0) start = 0
      } else if (start > len) {
        start = len
      }

      if (end < 0) {
        end += len
        if (end < 0) end = 0
      } else if (end > len) {
        end = len
      }

      if (end < start) end = start

      var newBuf = this.subarray(start, end)
      // Return an augmented `Uint8Array` instance
      newBuf.__proto__ = Buffer.prototype
      return newBuf
    }

    /*
     * Need to make sure that buffer isn't trying to write out of bounds.
     */
    function checkOffset(offset, ext, length) {
      if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
      if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
    }

    Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
      offset = offset >>> 0
      byteLength = byteLength >>> 0
      if (!noAssert) checkOffset(offset, byteLength, this.length)

      var val = this[offset]
      var mul = 1
      var i = 0
      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul
      }

      return val
    }

    Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
      offset = offset >>> 0
      byteLength = byteLength >>> 0
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length)
      }

      var val = this[offset + --byteLength]
      var mul = 1
      while (byteLength > 0 && (mul *= 0x100)) {
        val += this[offset + --byteLength] * mul
      }

      return val
    }

    Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 1, this.length)
      return this[offset]
    }

    Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 2, this.length)
      return this[offset] | (this[offset + 1] << 8)
    }

    Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 2, this.length)
      return (this[offset] << 8) | this[offset + 1]
    }

    Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)

      return ((this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16)) +
        (this[offset + 3] * 0x1000000)
    }

    Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)

      return (this[offset] * 0x1000000) +
        ((this[offset + 1] << 16) |
          (this[offset + 2] << 8) |
          this[offset + 3])
    }

    Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
      offset = offset >>> 0
      byteLength = byteLength >>> 0
      if (!noAssert) checkOffset(offset, byteLength, this.length)

      var val = this[offset]
      var mul = 1
      var i = 0
      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul
      }
      mul *= 0x80

      if (val >= mul) val -= Math.pow(2, 8 * byteLength)

      return val
    }

    Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
      offset = offset >>> 0
      byteLength = byteLength >>> 0
      if (!noAssert) checkOffset(offset, byteLength, this.length)

      var i = byteLength
      var mul = 1
      var val = this[offset + --i]
      while (i > 0 && (mul *= 0x100)) {
        val += this[offset + --i] * mul
      }
      mul *= 0x80

      if (val >= mul) val -= Math.pow(2, 8 * byteLength)

      return val
    }

    Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 1, this.length)
      if (!(this[offset] & 0x80)) return (this[offset])
      return ((0xff - this[offset] + 1) * -1)
    }

    Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 2, this.length)
      var val = this[offset] | (this[offset + 1] << 8)
      return (val & 0x8000) ? val | 0xFFFF0000 : val
    }

    Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 2, this.length)
      var val = this[offset + 1] | (this[offset] << 8)
      return (val & 0x8000) ? val | 0xFFFF0000 : val
    }

    Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)

      return (this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16) |
        (this[offset + 3] << 24)
    }

    Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)

      return (this[offset] << 24) |
        (this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        (this[offset + 3])
    }

    Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)
      return ieee754.read(this, offset, true, 23, 4)
    }

    Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 4, this.length)
      return ieee754.read(this, offset, false, 23, 4)
    }

    Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 8, this.length)
      return ieee754.read(this, offset, true, 52, 8)
    }

    Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0
      if (!noAssert) checkOffset(offset, 8, this.length)
      return ieee754.read(this, offset, false, 52, 8)
    }

    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
      if (offset + ext > buf.length) throw new RangeError('Index out of range')
    }

    Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
      value = +value
      offset = offset >>> 0
      byteLength = byteLength >>> 0
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1
        checkInt(this, value, offset, byteLength, maxBytes, 0)
      }

      var mul = 1
      var i = 0
      this[offset] = value & 0xFF
      while (++i < byteLength && (mul *= 0x100)) {
        this[offset + i] = (value / mul) & 0xFF
      }

      return offset + byteLength
    }

    Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
      value = +value
      offset = offset >>> 0
      byteLength = byteLength >>> 0
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1
        checkInt(this, value, offset, byteLength, maxBytes, 0)
      }

      var i = byteLength - 1
      var mul = 1
      this[offset + i] = value & 0xFF
      while (--i >= 0 && (mul *= 0x100)) {
        this[offset + i] = (value / mul) & 0xFF
      }

      return offset + byteLength
    }

    Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
      this[offset] = (value & 0xff)
      return offset + 1
    }

    Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
      this[offset] = (value & 0xff)
      this[offset + 1] = (value >>> 8)
      return offset + 2
    }

    Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
      this[offset] = (value >>> 8)
      this[offset + 1] = (value & 0xff)
      return offset + 2
    }

    Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
      this[offset + 3] = (value >>> 24)
      this[offset + 2] = (value >>> 16)
      this[offset + 1] = (value >>> 8)
      this[offset] = (value & 0xff)
      return offset + 4
    }

    Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
      this[offset] = (value >>> 24)
      this[offset + 1] = (value >>> 16)
      this[offset + 2] = (value >>> 8)
      this[offset + 3] = (value & 0xff)
      return offset + 4
    }

    Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        var limit = Math.pow(2, (8 * byteLength) - 1)

        checkInt(this, value, offset, byteLength, limit - 1, -limit)
      }

      var i = 0
      var mul = 1
      var sub = 0
      this[offset] = value & 0xFF
      while (++i < byteLength && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1
        }
        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
      }

      return offset + byteLength
    }

    Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        var limit = Math.pow(2, (8 * byteLength) - 1)

        checkInt(this, value, offset, byteLength, limit - 1, -limit)
      }

      var i = byteLength - 1
      var mul = 1
      var sub = 0
      this[offset + i] = value & 0xFF
      while (--i >= 0 && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1
        }
        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
      }

      return offset + byteLength
    }

    Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
      if (value < 0) value = 0xff + value + 1
      this[offset] = (value & 0xff)
      return offset + 1
    }

    Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
      this[offset] = (value & 0xff)
      this[offset + 1] = (value >>> 8)
      return offset + 2
    }

    Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
      this[offset] = (value >>> 8)
      this[offset + 1] = (value & 0xff)
      return offset + 2
    }

    Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
      this[offset] = (value & 0xff)
      this[offset + 1] = (value >>> 8)
      this[offset + 2] = (value >>> 16)
      this[offset + 3] = (value >>> 24)
      return offset + 4
    }

    Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
      if (value < 0) value = 0xffffffff + value + 1
      this[offset] = (value >>> 24)
      this[offset + 1] = (value >>> 16)
      this[offset + 2] = (value >>> 8)
      this[offset + 3] = (value & 0xff)
      return offset + 4
    }

    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError('Index out of range')
      if (offset < 0) throw new RangeError('Index out of range')
    }

    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4)
      return offset + 4
    }

    Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert)
    }

    Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert)
    }

    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value
      offset = offset >>> 0
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8)
      return offset + 8
    }

    Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert)
    }

    Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert)
    }

    // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
    Buffer.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
      if (!start) start = 0
      if (!end && end !== 0) end = this.length
      if (targetStart >= target.length) targetStart = target.length
      if (!targetStart) targetStart = 0
      if (end > 0 && end < start) end = start

      // Copy 0 bytes; we're done
      if (end === start) return 0
      if (target.length === 0 || this.length === 0) return 0

      // Fatal error conditions
      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds')
      }
      if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
      if (end < 0) throw new RangeError('sourceEnd out of bounds')

      // Are we oob?
      if (end > this.length) end = this.length
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start
      }

      var len = end - start

      if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
        // Use built-in when available, missing from IE11
        this.copyWithin(targetStart, start, end)
      } else if (this === target && start < targetStart && targetStart < end) {
        // descending copy from end
        for (var i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start]
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        )
      }

      return len
    }

    // Usage:
    //    buffer.fill(number[, offset[, end]])
    //    buffer.fill(buffer[, offset[, end]])
    //    buffer.fill(string[, offset[, end]][, encoding])
    Buffer.prototype.fill = function fill(val, start, end, encoding) {
      // Handle string cases:
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start
          start = 0
          end = this.length
        } else if (typeof end === 'string') {
          encoding = end
          end = this.length
        }
        if (encoding !== undefined && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string')
        }
        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding)
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0)
          if ((encoding === 'utf8' && code < 128) ||
            encoding === 'latin1') {
            // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code
          }
        }
      } else if (typeof val === 'number') {
        val = val & 255
      }

      // Invalid ranges are not set to a default, so can range check early.
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index')
      }

      if (end <= start) {
        return this
      }

      start = start >>> 0
      end = end === undefined ? this.length : end >>> 0

      if (!val) val = 0

      var i
      if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
          this[i] = val
        }
      } else {
        var bytes = Buffer.isBuffer(val)
          ? val
          : Buffer.from(val, encoding)
        var len = bytes.length
        if (len === 0) {
          throw new TypeError('The value "' + val +
            '" is invalid for argument "value"')
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len]
        }
      }

      return this
    }

    // HELPER FUNCTIONS
    // ================

    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

    function base64clean(str) {
      // Node takes equal signs as end of the Base64 encoding
      str = str.split('=')[0]
      // Node strips out invalid characters like \n and \t from the string, base64-js does not
      str = str.trim().replace(INVALID_BASE64_RE, '')
      // Node converts strings with length < 2 to ''
      if (str.length < 2) return ''
      // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
      while (str.length % 4 !== 0) {
        str = str + '='
      }
      return str
    }

    function toHex(n) {
      if (n < 16) return '0' + n.toString(16)
      return n.toString(16)
    }

    function utf8ToBytes(string, units) {
      units = units || Infinity
      var codePoint
      var length = string.length
      var leadSurrogate = null
      var bytes = []

      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i)

        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
          // last char was a lead
          if (!leadSurrogate) {
            // no lead yet
            if (codePoint > 0xDBFF) {
              // unexpected trail
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
              continue
            } else if (i + 1 === length) {
              // unpaired lead
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
              continue
            }

            // valid lead
            leadSurrogate = codePoint

            continue
          }

          // 2 leads in a row
          if (codePoint < 0xDC00) {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
            leadSurrogate = codePoint
            continue
          }

          // valid surrogate pair
          codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
        } else if (leadSurrogate) {
          // valid bmp char, but last char was a lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        }

        leadSurrogate = null

        // encode utf8
        if (codePoint < 0x80) {
          if ((units -= 1) < 0) break
          bytes.push(codePoint)
        } else if (codePoint < 0x800) {
          if ((units -= 2) < 0) break
          bytes.push(
            codePoint >> 0x6 | 0xC0,
            codePoint & 0x3F | 0x80
          )
        } else if (codePoint < 0x10000) {
          if ((units -= 3) < 0) break
          bytes.push(
            codePoint >> 0xC | 0xE0,
            codePoint >> 0x6 & 0x3F | 0x80,
            codePoint & 0x3F | 0x80
          )
        } else if (codePoint < 0x110000) {
          if ((units -= 4) < 0) break
          bytes.push(
            codePoint >> 0x12 | 0xF0,
            codePoint >> 0xC & 0x3F | 0x80,
            codePoint >> 0x6 & 0x3F | 0x80,
            codePoint & 0x3F | 0x80
          )
        } else {
          throw new Error('Invalid code point')
        }
      }

      return bytes
    }

    function asciiToBytes(str) {
      var byteArray = []
      for (var i = 0; i < str.length; ++i) {
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF)
      }
      return byteArray
    }

    function utf16leToBytes(str, units) {
      var c, hi, lo
      var byteArray = []
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break

        c = str.charCodeAt(i)
        hi = c >> 8
        lo = c % 256
        byteArray.push(lo)
        byteArray.push(hi)
      }

      return byteArray
    }

    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str))
    }

    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if ((i + offset >= dst.length) || (i >= src.length)) break
        dst[i + offset] = src[i]
      }
      return i
    }

    // ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
    // the `instanceof` check but they should be treated as of that type.
    // See: https://github.com/feross/buffer/issues/166
    function isInstance(obj, type) {
      return obj instanceof type ||
        (obj != null && obj.constructor != null && obj.constructor.name != null &&
          obj.constructor.name === type.name)
    }
    function numberIsNaN(obj) {
      // For IE11 support
      return obj !== obj // eslint-disable-line no-self-compare
    }

  }, { "base64-js": 19, "ieee754": 27 }], 22: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    var objectCreate = Object.create || objectCreatePolyfill
    var objectKeys = Object.keys || objectKeysPolyfill
    var bind = Function.prototype.bind || functionBindPolyfill

    function EventEmitter() {
      if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
        this._events = objectCreate(null);
        this._eventsCount = 0;
      }

      this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;

    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;

    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    var defaultMaxListeners = 10;

    var hasDefineProperty;
    try {
      var o = {};
      if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
      hasDefineProperty = o.x === 0;
    } catch (err) { hasDefineProperty = false }
    if (hasDefineProperty) {
      Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
        enumerable: true,
        get: function () {
          return defaultMaxListeners;
        },
        set: function (arg) {
          // check whether the input is a positive number (whose value is zero or
          // greater and not a NaN).
          if (typeof arg !== 'number' || arg < 0 || arg !== arg)
            throw new TypeError('"defaultMaxListeners" must be a positive number');
          defaultMaxListeners = arg;
        }
      });
    } else {
      EventEmitter.defaultMaxListeners = defaultMaxListeners;
    }

    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== 'number' || n < 0 || isNaN(n))
        throw new TypeError('"n" argument must be a positive number');
      this._maxListeners = n;
      return this;
    };

    function $getMaxListeners(that) {
      if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }

    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return $getMaxListeners(this);
    };

    // These standalone emit* functions are used to optimize calling of event
    // handlers for fast cases because emit() itself often has a variable number of
    // arguments and can be deoptimized because of that. These functions always have
    // the same number of arguments and thus do not get deoptimized, so the code
    // inside them can execute faster.
    function emitNone(handler, isFn, self) {
      if (isFn)
        handler.call(self);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self);
      }
    }
    function emitOne(handler, isFn, self, arg1) {
      if (isFn)
        handler.call(self, arg1);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1);
      }
    }
    function emitTwo(handler, isFn, self, arg1, arg2) {
      if (isFn)
        handler.call(self, arg1, arg2);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1, arg2);
      }
    }
    function emitThree(handler, isFn, self, arg1, arg2, arg3) {
      if (isFn)
        handler.call(self, arg1, arg2, arg3);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1, arg2, arg3);
      }
    }

    function emitMany(handler, isFn, self, args) {
      if (isFn)
        handler.apply(self, args);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].apply(self, args);
      }
    }

    EventEmitter.prototype.emit = function emit(type) {
      var er, handler, len, args, i, events;
      var doError = (type === 'error');

      events = this._events;
      if (events)
        doError = (doError && events.error == null);
      else if (!doError)
        return false;

      // If there is no 'error' event listener then throw.
      if (doError) {
        if (arguments.length > 1)
          er = arguments[1];
        if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          // At least give some kind of context to the user
          var err = new Error('Unhandled "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }
        return false;
      }

      handler = events[type];

      if (!handler)
        return false;

      var isFn = typeof handler === 'function';
      len = arguments.length;
      switch (len) {
        // fast cases
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
        // slower
        default:
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          emitMany(handler, isFn, this, args);
      }

      return true;
    };

    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = target._events;
      if (!events) {
        events = target._events = objectCreate(null);
        target._eventsCount = 0;
      } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener) {
          target.emit('newListener', type,
            listener.listener ? listener.listener : listener);

          // Re-assign `events` because a newListener handler could have caused the
          // this._events to be assigned to a new object
          events = target._events;
        }
        existing = events[type];
      }

      if (!existing) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === 'function') {
          // Adding the second element, need to change to array.
          existing = events[type] =
            prepend ? [listener, existing] : [existing, listener];
        } else {
          // If we've already got an array, just append.
          if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
        }

        // Check for listener leak
        if (!existing.warned) {
          m = $getMaxListeners(target);
          if (m && m > 0 && existing.length > m) {
            existing.warned = true;
            var w = new Error('Possible EventEmitter memory leak detected. ' +
              existing.length + ' "' + String(type) + '" listeners ' +
              'added. Use emitter.setMaxListeners() to ' +
              'increase limit.');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            if (typeof console === 'object' && console.warn) {
              console.warn('%s: %s', w.name, w.message);
            }
          }
        }
      }

      return target;
    }

    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        switch (arguments.length) {
          case 0:
            return this.listener.call(this.target);
          case 1:
            return this.listener.call(this.target, arguments[0]);
          case 2:
            return this.listener.call(this.target, arguments[0], arguments[1]);
          case 3:
            return this.listener.call(this.target, arguments[0], arguments[1],
              arguments[2]);
          default:
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; ++i)
              args[i] = arguments[i];
            this.listener.apply(this.target, args);
        }
      }
    }

    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
      var wrapped = bind.call(onceWrapper, state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }

    EventEmitter.prototype.once = function once(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };

    EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

    // Emits a 'removeListener' event if and only if the listener was removed.
    EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');

        events = this._events;
        if (!events)
          return this;

        list = events[type];
        if (!list)
          return this;

        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (position === 0)
            list.shift();
          else
            spliceOne(list, position);

          if (list.length === 1)
            events[type] = list[0];

          if (events.removeListener)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

    EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events, i;

        events = this._events;
        if (!events)
          return this;

        // not listening for removeListener, no need to emit
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = objectCreate(null);
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = objectCreate(null);
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = objectKeys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = objectCreate(null);
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners) {
          // LIFO order
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }

        return this;
      };

    function _listeners(target, type, unwrap) {
      var events = target._events;

      if (!events)
        return [];

      var evlistener = events[type];
      if (!evlistener)
        return [];

      if (typeof evlistener === 'function')
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];

      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }

    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };

    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };

    EventEmitter.listenerCount = function (emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };

    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;

      if (events) {
        var evlistener = events[type];

        if (typeof evlistener === 'function') {
          return 1;
        } else if (evlistener) {
          return evlistener.length;
        }
      }

      return 0;
    }

    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };

    // About 1.5x faster than the two-arg version of Array#splice().
    function spliceOne(list, index) {
      for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
        list[i] = list[k];
      list.pop();
    }

    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }

    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }

    function objectCreatePolyfill(proto) {
      var F = function () { };
      F.prototype = proto;
      return new F;
    }
    function objectKeysPolyfill(obj) {
      var keys = [];
      for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
        keys.push(k);
      }
      return k;
    }
    function functionBindPolyfill(context) {
      var fn = this;
      return function () {
        return fn.apply(context, arguments);
      };
    }

  }, {}], 23: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    module.exports = Stream;

    var EE = require('events').EventEmitter;
    var inherits = require('inherits');

    inherits(Stream, EE);
    Stream.Readable = require('readable-stream/readable.js');
    Stream.Writable = require('readable-stream/writable.js');
    Stream.Duplex = require('readable-stream/duplex.js');
    Stream.Transform = require('readable-stream/transform.js');
    Stream.PassThrough = require('readable-stream/passthrough.js');

    // Backwards-compat with node 0.4.x
    Stream.Stream = Stream;



    // old-style streams.  Note that the pipe method (the only relevant
    // part of this class) is overridden in the Readable class.

    function Stream() {
      EE.call(this);
    }

    Stream.prototype.pipe = function (dest, options) {
      var source = this;

      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }

      source.on('data', ondata);

      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }

      dest.on('drain', ondrain);

      // If the 'end' option is not supplied, dest.end() will be called when
      // source gets the 'end' or 'close' events.  Only dest.end() once.
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on('end', onend);
        source.on('close', onclose);
      }

      var didOnEnd = false;
      function onend() {
        if (didOnEnd) return;
        didOnEnd = true;

        dest.end();
      }


      function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;

        if (typeof dest.destroy === 'function') dest.destroy();
      }

      // don't leave dangling pipes when there are errors.
      function onerror(er) {
        cleanup();
        if (EE.listenerCount(this, 'error') === 0) {
          throw er; // Unhandled stream error in pipe.
        }
      }

      source.on('error', onerror);
      dest.on('error', onerror);

      // remove all the event listeners that were added.
      function cleanup() {
        source.removeListener('data', ondata);
        dest.removeListener('drain', ondrain);

        source.removeListener('end', onend);
        source.removeListener('close', onclose);

        source.removeListener('error', onerror);
        dest.removeListener('error', onerror);

        source.removeListener('end', cleanup);
        source.removeListener('close', cleanup);

        dest.removeListener('close', cleanup);
      }

      source.on('end', cleanup);
      source.on('close', cleanup);

      dest.on('close', cleanup);

      dest.emit('pipe', source);

      // Allow for unix-like usage: A.pipe(B).pipe(C)
      return dest;
    };

  }, { "events": 22, "inherits": 28, "readable-stream/duplex.js": 37, "readable-stream/passthrough.js": 49, "readable-stream/readable.js": 50, "readable-stream/transform.js": 51, "readable-stream/writable.js": 52 }], 24: [function (require, module, exports) {
    (function (Buffer) {
      (function () {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        // NOTE: These type checking functions intentionally don't use `instanceof`
        // because it is fragile and can be easily faked with `Object.create()`.

        function isArray(arg) {
          if (Array.isArray) {
            return Array.isArray(arg);
          }
          return objectToString(arg) === '[object Array]';
        }
        exports.isArray = isArray;

        function isBoolean(arg) {
          return typeof arg === 'boolean';
        }
        exports.isBoolean = isBoolean;

        function isNull(arg) {
          return arg === null;
        }
        exports.isNull = isNull;

        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exports.isNullOrUndefined = isNullOrUndefined;

        function isNumber(arg) {
          return typeof arg === 'number';
        }
        exports.isNumber = isNumber;

        function isString(arg) {
          return typeof arg === 'string';
        }
        exports.isString = isString;

        function isSymbol(arg) {
          return typeof arg === 'symbol';
        }
        exports.isSymbol = isSymbol;

        function isUndefined(arg) {
          return arg === void 0;
        }
        exports.isUndefined = isUndefined;

        function isRegExp(re) {
          return objectToString(re) === '[object RegExp]';
        }
        exports.isRegExp = isRegExp;

        function isObject(arg) {
          return typeof arg === 'object' && arg !== null;
        }
        exports.isObject = isObject;

        function isDate(d) {
          return objectToString(d) === '[object Date]';
        }
        exports.isDate = isDate;

        function isError(e) {
          return (objectToString(e) === '[object Error]' || e instanceof Error);
        }
        exports.isError = isError;

        function isFunction(arg) {
          return typeof arg === 'function';
        }
        exports.isFunction = isFunction;

        function isPrimitive(arg) {
          return arg === null ||
            typeof arg === 'boolean' ||
            typeof arg === 'number' ||
            typeof arg === 'string' ||
            typeof arg === 'symbol' ||  // ES6 symbol
            typeof arg === 'undefined';
        }
        exports.isPrimitive = isPrimitive;

        exports.isBuffer = Buffer.isBuffer;

        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }

      }).call(this)
    }).call(this, { "isBuffer": require("../../is-buffer/index.js") })

  }, { "../../is-buffer/index.js": 29 }], 25: [function (require, module, exports) {
    (function (process) {
      (function () {
        var once = require('once');

        var noop = function () { };

        var isRequest = function (stream) {
          return stream.setHeader && typeof stream.abort === 'function';
        };

        var isChildProcess = function (stream) {
          return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
        };

        var eos = function (stream, opts, callback) {
          if (typeof opts === 'function') return eos(stream, null, opts);
          if (!opts) opts = {};

          callback = once(callback || noop);

          var ws = stream._writableState;
          var rs = stream._readableState;
          var readable = opts.readable || (opts.readable !== false && stream.readable);
          var writable = opts.writable || (opts.writable !== false && stream.writable);
          var cancelled = false;

          var onlegacyfinish = function () {
            if (!stream.writable) onfinish();
          };

          var onfinish = function () {
            writable = false;
            if (!readable) callback.call(stream);
          };

          var onend = function () {
            readable = false;
            if (!writable) callback.call(stream);
          };

          var onexit = function (exitCode) {
            callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
          };

          var onerror = function (err) {
            callback.call(stream, err);
          };

          var onclose = function () {
            process.nextTick(onclosenexttick);
          };

          var onclosenexttick = function () {
            if (cancelled) return;
            if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
            if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
          };

          var onrequest = function () {
            stream.req.on('finish', onfinish);
          };

          if (isRequest(stream)) {
            stream.on('complete', onfinish);
            stream.on('abort', onclose);
            if (stream.req) onrequest();
            else stream.on('request', onrequest);
          } else if (writable && !ws) { // legacy streams
            stream.on('end', onlegacyfinish);
            stream.on('close', onlegacyfinish);
          }

          if (isChildProcess(stream)) stream.on('exit', onexit);

          stream.on('end', onend);
          stream.on('finish', onfinish);
          if (opts.error !== false) stream.on('error', onerror);
          stream.on('close', onclose);

          return function () {
            cancelled = true;
            stream.removeListener('complete', onfinish);
            stream.removeListener('abort', onclose);
            stream.removeListener('request', onrequest);
            if (stream.req) stream.req.removeListener('finish', onfinish);
            stream.removeListener('end', onlegacyfinish);
            stream.removeListener('close', onlegacyfinish);
            stream.removeListener('finish', onfinish);
            stream.removeListener('exit', onexit);
            stream.removeListener('end', onend);
            stream.removeListener('error', onerror);
            stream.removeListener('close', onclose);
          };
        };

        module.exports = eos;

      }).call(this)
    }).call(this, require('_process'))

  }, { "_process": 35, "once": 32 }], 26: [function (require, module, exports) {
    (function (Buffer) {
      (function () {
        "use strict";
        const stream_1 = require("stream");
        module.exports = class PortDuplexStream extends stream_1.Duplex {
          /**
           * @param port - An instance of WebExtensions Runtime.Port. See:
           * {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/Port}
           */
          constructor(port) {
            super({ objectMode: true });
            this._port = port;
            this._port.onMessage.addListener((msg) => this._onMessage(msg));
            this._port.onDisconnect.addListener(() => this._onDisconnect());
          }
          /**
           * Callback triggered when a message is received from
           * the remote Port associated with this Stream.
           *
           * @param msg - Payload from the onMessage listener of the port
           */
          _onMessage(msg) {
            if (Buffer.isBuffer(msg)) {
              const data = Buffer.from(msg);
              this.push(data);
            }
            else {
              this.push(msg);
            }
          }
          /**
           * Callback triggered when the remote Port associated with this Stream
           * disconnects.
           */
          _onDisconnect() {
            this.destroy();
          }
          /**
           * Explicitly sets read operations to a no-op.
           */
          _read() {
            return undefined;
          }
          /**
           * Called internally when data should be written to this writable stream.
           *
           * @param msg - Arbitrary object to write
           * @param encoding - Encoding to use when writing payload
           * @param cb - Called when writing is complete or an error occurs
           */
          _write(msg, _encoding, cb) {
            try {
              if (Buffer.isBuffer(msg)) {
                const data = msg.toJSON();
                data._isBuffer = true;
                this._port.postMessage(data);
              }
              else {
                this._port.postMessage(msg);
              }
            }
            catch (error) {
              return cb(new Error('PortDuplexStream - disconnected'));
            }
            return cb();
          }
        };

      }).call(this)
    }).call(this, require("buffer").Buffer)

  }, { "buffer": 21, "stream": 23 }], 27: [function (require, module, exports) {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    exports.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m
      var eLen = (nBytes * 8) - mLen - 1
      var eMax = (1 << eLen) - 1
      var eBias = eMax >> 1
      var nBits = -7
      var i = isLE ? (nBytes - 1) : 0
      var d = isLE ? -1 : 1
      var s = buffer[offset + i]

      i += d

      e = s & ((1 << (-nBits)) - 1)
      s >>= (-nBits)
      nBits += eLen
      for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) { }

      m = e & ((1 << (-nBits)) - 1)
      e >>= (-nBits)
      nBits += mLen
      for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) { }

      if (e === 0) {
        e = 1 - eBias
      } else if (e === eMax) {
        return m ? NaN : ((s ? -1 : 1) * Infinity)
      } else {
        m = m + Math.pow(2, mLen)
        e = e - eBias
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
    }

    exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c
      var eLen = (nBytes * 8) - mLen - 1
      var eMax = (1 << eLen) - 1
      var eBias = eMax >> 1
      var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
      var i = isLE ? 0 : (nBytes - 1)
      var d = isLE ? 1 : -1
      var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

      value = Math.abs(value)

      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0
        e = eMax
      } else {
        e = Math.floor(Math.log(value) / Math.LN2)
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--
          c *= 2
        }
        if (e + eBias >= 1) {
          value += rt / c
        } else {
          value += rt * Math.pow(2, 1 - eBias)
        }
        if (value * c >= 2) {
          e++
          c /= 2
        }

        if (e + eBias >= eMax) {
          m = 0
          e = eMax
        } else if (e + eBias >= 1) {
          m = ((value * c) - 1) * Math.pow(2, mLen)
          e = e + eBias
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
          e = 0
        }
      }

      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) { }

      e = (e << mLen) | m
      eLen += mLen
      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) { }

      buffer[offset + i - d] |= s * 128
    }

  }, {}], 28: [function (require, module, exports) {
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          })
        }
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor
          var TempCtor = function () { }
          TempCtor.prototype = superCtor.prototype
          ctor.prototype = new TempCtor()
          ctor.prototype.constructor = ctor
        }
      }
    }

  }, {}], 29: [function (require, module, exports) {
    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */

    // The _isBuffer check is for Safari 5-7 support, because it's missing
    // Object.prototype.constructor. Remove this eventually
    module.exports = function (obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
    }

    function isBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
    }

    // For Node v0.10 support. Remove this eventually.
    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
    }

  }, {}], 30: [function (require, module, exports) {
    var toString = {}.toString;

    module.exports = Array.isArray || function (arr) {
      return toString.call(arr) == '[object Array]';
    };

  }, {}], 31: [function (require, module, exports) {
    const { Duplex } = require('readable-stream')
    const endOfStream = require('end-of-stream')
    const once = require('once')
    const noop = () => { }

    const IGNORE_SUBSTREAM = {}


    class ObjectMultiplex extends Duplex {

      constructor(_opts = {}) {
        const opts = Object.assign({}, _opts, {
          objectMode: true,
        })
        super(opts)

        this._substreams = {}
      }

      createStream(name) {
        // validate name
        if (!name) throw new Error('ObjectMultiplex - name must not be empty')
        if (this._substreams[name]) throw new Error('ObjectMultiplex - Substream for name "${name}" already exists')

        // create substream
        const substream = new Substream({ parent: this, name: name })
        this._substreams[name] = substream

        // listen for parent stream to end
        anyStreamEnd(this, (err) => {
          substream.destroy(err)
        })

        return substream
      }

      // ignore streams (dont display orphaned data warning)
      ignoreStream(name) {
        // validate name
        if (!name) throw new Error('ObjectMultiplex - name must not be empty')
        if (this._substreams[name]) throw new Error('ObjectMultiplex - Substream for name "${name}" already exists')
        // set
        this._substreams[name] = IGNORE_SUBSTREAM
      }

      // stream plumbing

      _read() { }

      _write(chunk, encoding, callback) {
        // parse message
        const name = chunk.name
        const data = chunk.data
        if (!name) {
          console.warn(`ObjectMultiplex - malformed chunk without name "${chunk}"`)
          return callback()
        }

        // get corresponding substream
        const substream = this._substreams[name]
        if (!substream) {
          console.warn(`ObjectMultiplex - orphaned data for stream "${name}"`)
          return callback()
        }

        // push data into substream
        if (substream !== IGNORE_SUBSTREAM) {
          substream.push(data)
        }

        callback()
      }

    }


    class Substream extends Duplex {

      constructor({ parent, name }) {
        super({
          objectMode: true,
        })

        this._parent = parent
        this._name = name
      }

      _read() { }

      _write(chunk, enc, callback) {
        this._parent.push({
          name: this._name,
          data: chunk,
        })
        callback()
      }

    }

    module.exports = ObjectMultiplex

    // util

    function anyStreamEnd(stream, _cb) {
      const cb = once(_cb)
      endOfStream(stream, { readable: false }, cb)
      endOfStream(stream, { writable: false }, cb)
    }
  }, { "end-of-stream": 25, "once": 32, "readable-stream": 50 }], 32: [function (require, module, exports) {
    var wrappy = require('wrappy')
    module.exports = wrappy(once)
    module.exports.strict = wrappy(onceStrict)

    once.proto = once(function () {
      Object.defineProperty(Function.prototype, 'once', {
        value: function () {
          return once(this)
        },
        configurable: true
      })

      Object.defineProperty(Function.prototype, 'onceStrict', {
        value: function () {
          return onceStrict(this)
        },
        configurable: true
      })
    })

    function once(fn) {
      var f = function () {
        if (f.called) return f.value
        f.called = true
        return f.value = fn.apply(this, arguments)
      }
      f.called = false
      return f
    }

    function onceStrict(fn) {
      var f = function () {
        if (f.called)
          throw new Error(f.onceError)
        f.called = true
        return f.value = fn.apply(this, arguments)
      }
      var name = fn.name || 'Function wrapped with `once`'
      f.onceError = name + " shouldn't be called more than once"
      f.called = false
      return f
    }

  }, { "wrappy": 74 }], 33: [function (require, module, exports) {
    (function (process) {
      (function () {
        // .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
        // backported and transplited with Babel, with backwards-compat fixes

        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        // resolves . and .. elements in a path array with directory names there
        // must be no slashes, empty elements, or device names (c:\) in the array
        // (so also no leading and trailing slashes - it does not distinguish
        // relative and absolute paths)
        function normalizeArray(parts, allowAboveRoot) {
          // if the path tries to go above the root, `up` ends up > 0
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === '.') {
              parts.splice(i, 1);
            } else if (last === '..') {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }

          // if the path is allowed to go above the root, restore leading ..s
          if (allowAboveRoot) {
            for (; up--; up) {
              parts.unshift('..');
            }
          }

          return parts;
        }

        // path.resolve([from ...], to)
        // posix version
        exports.resolve = function () {
          var resolvedPath = '',
            resolvedAbsolute = false;

          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = (i >= 0) ? arguments[i] : process.cwd();

            // Skip empty and invalid entries
            if (typeof path !== 'string') {
              throw new TypeError('Arguments to path.resolve must be strings');
            } else if (!path) {
              continue;
            }

            resolvedPath = path + '/' + resolvedPath;
            resolvedAbsolute = path.charAt(0) === '/';
          }

          // At this point the path should be resolved to a full absolute path, but
          // handle relative paths to be safe (might happen when process.cwd() fails)

          // Normalize the path
          resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
            return !!p;
          }), !resolvedAbsolute).join('/');

          return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
        };

        // path.normalize(path)
        // posix version
        exports.normalize = function (path) {
          var isAbsolute = exports.isAbsolute(path),
            trailingSlash = substr(path, -1) === '/';

          // Normalize the path
          path = normalizeArray(filter(path.split('/'), function (p) {
            return !!p;
          }), !isAbsolute).join('/');

          if (!path && !isAbsolute) {
            path = '.';
          }
          if (path && trailingSlash) {
            path += '/';
          }

          return (isAbsolute ? '/' : '') + path;
        };

        // posix version
        exports.isAbsolute = function (path) {
          return path.charAt(0) === '/';
        };

        // posix version
        exports.join = function () {
          var paths = Array.prototype.slice.call(arguments, 0);
          return exports.normalize(filter(paths, function (p, index) {
            if (typeof p !== 'string') {
              throw new TypeError('Arguments to path.join must be strings');
            }
            return p;
          }).join('/'));
        };


        // path.relative(from, to)
        // posix version
        exports.relative = function (from, to) {
          from = exports.resolve(from).substr(1);
          to = exports.resolve(to).substr(1);

          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== '') break;
            }

            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== '') break;
            }

            if (start > end) return [];
            return arr.slice(start, end - start + 1);
          }

          var fromParts = trim(from.split('/'));
          var toParts = trim(to.split('/'));

          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }

          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push('..');
          }

          outputParts = outputParts.concat(toParts.slice(samePartsLength));

          return outputParts.join('/');
        };

        exports.sep = '/';
        exports.delimiter = ':';

        exports.dirname = function (path) {
          if (typeof path !== 'string') path = path + '';
          if (path.length === 0) return '.';
          var code = path.charCodeAt(0);
          var hasRoot = code === 47 /*/*/;
          var end = -1;
          var matchedSlash = true;
          for (var i = path.length - 1; i >= 1; --i) {
            code = path.charCodeAt(i);
            if (code === 47 /*/*/) {
              if (!matchedSlash) {
                end = i;
                break;
              }
            } else {
              // We saw the first non-path separator
              matchedSlash = false;
            }
          }

          if (end === -1) return hasRoot ? '/' : '.';
          if (hasRoot && end === 1) {
            // return '//';
            // Backwards-compat fix:
            return '/';
          }
          return path.slice(0, end);
        };

        function basename(path) {
          if (typeof path !== 'string') path = path + '';

          var start = 0;
          var end = -1;
          var matchedSlash = true;
          var i;

          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47 /*/*/) {
              // If we reached a path separator that was not part of a set of path
              // separators at the end of the string, stop now
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              // We saw the first non-path separator, mark this as the end of our
              // path component
              matchedSlash = false;
              end = i + 1;
            }
          }

          if (end === -1) return '';
          return path.slice(start, end);
        }

        // Uses a mixed approach for backwards-compatibility, as ext behavior changed
        // in new Node.js versions, so only basename() above is backported here
        exports.basename = function (path, ext) {
          var f = basename(path);
          if (ext && f.substr(-1 * ext.length) === ext) {
            f = f.substr(0, f.length - ext.length);
          }
          return f;
        };

        exports.extname = function (path) {
          if (typeof path !== 'string') path = path + '';
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          // Track the state of characters (if any) we see before our first dot and
          // after any path separator we find
          var preDotState = 0;
          for (var i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47 /*/*/) {
              // If we reached a path separator that was not part of a set of path
              // separators at the end of the string, stop now
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              // We saw the first non-path separator, mark this as the end of our
              // extension
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46 /*.*/) {
              // If this is our first dot, mark it as the start of our extension
              if (startDot === -1)
                startDot = i;
              else if (preDotState !== 1)
                preDotState = 1;
            } else if (startDot !== -1) {
              // We saw a non-dot and non-path separator before our dot, so we should
              // have a good chance at having a non-empty extension
              preDotState = -1;
            }
          }

          if (startDot === -1 || end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            return '';
          }
          return path.slice(startDot, end);
        };

        function filter(xs, f) {
          if (xs.filter) return xs.filter(f);
          var res = [];
          for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs)) res.push(xs[i]);
          }
          return res;
        }

        // String.prototype.substr - negative index don't work in IE8
        var substr = 'ab'.substr(-1) === 'b'
          ? function (str, start, len) { return str.substr(start, len) }
          : function (str, start, len) {
            if (start < 0) start = str.length + start;
            return str.substr(start, len);
          }
          ;

      }).call(this)
    }).call(this, require('_process'))

  }, { "_process": 35 }], 34: [function (require, module, exports) {
    (function (process) {
      (function () {
        'use strict';

        if (!process.version ||
          process.version.indexOf('v0.') === 0 ||
          process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
          module.exports = nextTick;
        } else {
          module.exports = process.nextTick;
        }

        function nextTick(fn, arg1, arg2, arg3) {
          if (typeof fn !== 'function') {
            throw new TypeError('"callback" argument must be a function');
          }
          var len = arguments.length;
          var args, i;
          switch (len) {
            case 0:
            case 1:
              return process.nextTick(fn);
            case 2:
              return process.nextTick(function afterTickOne() {
                fn.call(null, arg1);
              });
            case 3:
              return process.nextTick(function afterTickTwo() {
                fn.call(null, arg1, arg2);
              });
            case 4:
              return process.nextTick(function afterTickThree() {
                fn.call(null, arg1, arg2, arg3);
              });
            default:
              args = new Array(len - 1);
              i = 0;
              while (i < args.length) {
                args[i++] = arguments[i];
              }
              return process.nextTick(function afterTick() {
                fn.apply(null, args);
              });
          }
        }

      }).call(this)
    }).call(this, require('_process'))

  }, { "_process": 35 }], 35: [function (require, module, exports) {
    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
      throw new Error('clearTimeout has not been defined');
    }
    (function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    }())
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
          return cachedSetTimeout.call(this, fun, 0);
        }
      }


    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
          // Some versions of I.E. have different rules for clearTimeout vs setTimeout
          return cachedClearTimeout.call(this, marker);
        }
      }



    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }

    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() { }

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) { return [] }

    process.binding = function (name) {
      throw new Error('process.binding is not supported');
    };

    process.cwd = function () { return '/' };
    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
    };
    process.umask = function () { return 0; };

  }, {}], 36: [function (require, module, exports) {
    (function (process) {
      (function () {
        var once = require('once')
        var eos = require('end-of-stream')
        var fs = require('fs') // we only need fs to get the ReadStream and WriteStream prototypes

        var noop = function () { }
        var ancient = /^v?\.0/.test(process.version)

        var isFn = function (fn) {
          return typeof fn === 'function'
        }

        var isFS = function (stream) {
          if (!ancient) return false // newer node version do not need to care about fs is a special way
          if (!fs) return false // browser
          return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)
        }

        var isRequest = function (stream) {
          return stream.setHeader && isFn(stream.abort)
        }

        var destroyer = function (stream, reading, writing, callback) {
          callback = once(callback)

          var closed = false
          stream.on('close', function () {
            closed = true
          })

          eos(stream, { readable: reading, writable: writing }, function (err) {
            if (err) return callback(err)
            closed = true
            callback()
          })

          var destroyed = false
          return function (err) {
            if (closed) return
            if (destroyed) return
            destroyed = true

            if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
            if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

            if (isFn(stream.destroy)) return stream.destroy()

            callback(err || new Error('stream was destroyed'))
          }
        }

        var call = function (fn) {
          fn()
        }

        var pipe = function (from, to) {
          return from.pipe(to)
        }

        var pump = function () {
          var streams = Array.prototype.slice.call(arguments)
          var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop

          if (Array.isArray(streams[0])) streams = streams[0]
          if (streams.length < 2) throw new Error('pump requires two streams per minimum')

          var error
          var destroys = streams.map(function (stream, i) {
            var reading = i < streams.length - 1
            var writing = i > 0
            return destroyer(stream, reading, writing, function (err) {
              if (!error) error = err
              if (err) destroys.forEach(call)
              if (reading) return
              destroys.forEach(call)
              callback(error)
            })
          })

          return streams.reduce(pipe)
        }

        module.exports = pump

      }).call(this)
    }).call(this, require('_process'))

  }, { "_process": 35, "end-of-stream": 25, "fs": 20, "once": 32 }], 37: [function (require, module, exports) {
    module.exports = require('./lib/_stream_duplex.js');

  }, { "./lib/_stream_duplex.js": 38 }], 38: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    // a duplex stream is just a stream that is both readable and writable.
    // Since JS doesn't have multiple prototypal inheritance, this class
    // prototypally inherits from Readable, and then parasitically from
    // Writable.

    'use strict';

    /*<replacement>*/

    var pna = require('process-nextick-args');
    /*</replacement>*/

    /*<replacement>*/
    var objectKeys = Object.keys || function (obj) {
      var keys = [];
      for (var key in obj) {
        keys.push(key);
      } return keys;
    };
    /*</replacement>*/

    module.exports = Duplex;

    /*<replacement>*/
    var util = Object.create(require('core-util-is'));
    util.inherits = require('inherits');
    /*</replacement>*/

    var Readable = require('./_stream_readable');
    var Writable = require('./_stream_writable');

    util.inherits(Duplex, Readable);

    {
      // avoid scope creep, the keys array can then be collected
      var keys = objectKeys(Writable.prototype);
      for (var v = 0; v < keys.length; v++) {
        var method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
      }
    }

    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);

      Readable.call(this, options);
      Writable.call(this, options);

      if (options && options.readable === false) this.readable = false;

      if (options && options.writable === false) this.writable = false;

      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

      this.once('end', onend);
    }

    Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function () {
        return this._writableState.highWaterMark;
      }
    });

    // the no-half-open enforcer
    function onend() {
      // if we allow half-open state, or if the writable side ended,
      // then we're ok.
      if (this.allowHalfOpen || this._writableState.ended) return;

      // no more data can be written.
      // But allow more writes to happen in this tick.
      pna.nextTick(onEndNT, this);
    }

    function onEndNT(self) {
      self.end();
    }

    Object.defineProperty(Duplex.prototype, 'destroyed', {
      get: function () {
        if (this._readableState === undefined || this._writableState === undefined) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function (value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (this._readableState === undefined || this._writableState === undefined) {
          return;
        }

        // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });

    Duplex.prototype._destroy = function (err, cb) {
      this.push(null);
      this.end();

      pna.nextTick(cb, err);
    };
  }, { "./_stream_readable": 40, "./_stream_writable": 42, "core-util-is": 24, "inherits": 28, "process-nextick-args": 46 }], 39: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    // a passthrough stream.
    // basically just the most minimal sort of Transform stream.
    // Every written chunk gets output as-is.

    'use strict';

    module.exports = PassThrough;

    var Transform = require('./_stream_transform');

    /*<replacement>*/
    var util = Object.create(require('core-util-is'));
    util.inherits = require('inherits');
    /*</replacement>*/

    util.inherits(PassThrough, Transform);

    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);

      Transform.call(this, options);
    }

    PassThrough.prototype._transform = function (chunk, encoding, cb) {
      cb(null, chunk);
    };
  }, { "./_stream_transform": 41, "core-util-is": 24, "inherits": 28 }], 40: [function (require, module, exports) {
    (function (process, global) {
      (function () {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        'use strict';

        /*<replacement>*/

        var pna = require('process-nextick-args');
        /*</replacement>*/

        module.exports = Readable;

        /*<replacement>*/
        var isArray = require('isarray');
        /*</replacement>*/

        /*<replacement>*/
        var Duplex;
        /*</replacement>*/

        Readable.ReadableState = ReadableState;

        /*<replacement>*/
        var EE = require('events').EventEmitter;

        var EElistenerCount = function (emitter, type) {
          return emitter.listeners(type).length;
        };
        /*</replacement>*/

        /*<replacement>*/
        var Stream = require('./internal/streams/stream');
        /*</replacement>*/

        /*<replacement>*/

        var Buffer = require('safe-buffer').Buffer;
        var OurUint8Array = global.Uint8Array || function () { };
        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }
        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }

        /*</replacement>*/

        /*<replacement>*/
        var util = Object.create(require('core-util-is'));
        util.inherits = require('inherits');
        /*</replacement>*/

        /*<replacement>*/
        var debugUtil = require('util');
        var debug = void 0;
        if (debugUtil && debugUtil.debuglog) {
          debug = debugUtil.debuglog('stream');
        } else {
          debug = function () { };
        }
        /*</replacement>*/

        var BufferList = require('./internal/streams/BufferList');
        var destroyImpl = require('./internal/streams/destroy');
        var StringDecoder;

        util.inherits(Readable, Stream);

        var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

        function prependListener(emitter, event, fn) {
          // Sadly this is not cacheable as some libraries bundle their own
          // event emitter implementation with them.
          if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

          // This is a hack to make sure that our error handler is attached before any
          // userland ones.  NEVER DO THIS. This is here only because this code needs
          // to continue to work with older versions of Node.js that do not include
          // the prependListener() method. The goal is to eventually remove this hack.
          if (!emitter._events || !emitter._events[event]) emitter.on(event, fn); else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn); else emitter._events[event] = [fn, emitter._events[event]];
        }

        function ReadableState(options, stream) {
          Duplex = Duplex || require('./_stream_duplex');

          options = options || {};

          // Duplex streams are both readable and writable, but share
          // the same options object.
          // However, some cases require setting options to different
          // values for the readable and the writable sides of the duplex stream.
          // These options can be provided separately as readableXXX and writableXXX.
          var isDuplex = stream instanceof Duplex;

          // object stream flag. Used to make read(n) ignore n and to
          // make all the buffer merging and length checks go away
          this.objectMode = !!options.objectMode;

          if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

          // the point at which it stops calling _read() to fill the buffer
          // Note: 0 is a valid value, means "don't call _read preemptively ever"
          var hwm = options.highWaterMark;
          var readableHwm = options.readableHighWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;

          if (hwm || hwm === 0) this.highWaterMark = hwm; else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm; else this.highWaterMark = defaultHwm;

          // cast to ints.
          this.highWaterMark = Math.floor(this.highWaterMark);

          // A linked list is used to store data chunks instead of an array because the
          // linked list can remove elements from the beginning faster than
          // array.shift()
          this.buffer = new BufferList();
          this.length = 0;
          this.pipes = null;
          this.pipesCount = 0;
          this.flowing = null;
          this.ended = false;
          this.endEmitted = false;
          this.reading = false;

          // a flag to be able to tell if the event 'readable'/'data' is emitted
          // immediately, or on a later tick.  We set this to true at first, because
          // any actions that shouldn't happen until "later" should generally also
          // not happen before the first read call.
          this.sync = true;

          // whenever we return null, then we set a flag to say
          // that we're awaiting a 'readable' event emission.
          this.needReadable = false;
          this.emittedReadable = false;
          this.readableListening = false;
          this.resumeScheduled = false;

          // has it been destroyed
          this.destroyed = false;

          // Crypto is kind of old and crusty.  Historically, its default string
          // encoding is 'binary' so we have to make this configurable.
          // Everything else in the universe uses 'utf8', though.
          this.defaultEncoding = options.defaultEncoding || 'utf8';

          // the number of writers that are awaiting a drain event in .pipe()s
          this.awaitDrain = 0;

          // if true, a maybeReadMore has been scheduled
          this.readingMore = false;

          this.decoder = null;
          this.encoding = null;
          if (options.encoding) {
            if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
            this.decoder = new StringDecoder(options.encoding);
            this.encoding = options.encoding;
          }
        }

        function Readable(options) {
          Duplex = Duplex || require('./_stream_duplex');

          if (!(this instanceof Readable)) return new Readable(options);

          this._readableState = new ReadableState(options, this);

          // legacy
          this.readable = true;

          if (options) {
            if (typeof options.read === 'function') this._read = options.read;

            if (typeof options.destroy === 'function') this._destroy = options.destroy;
          }

          Stream.call(this);
        }

        Object.defineProperty(Readable.prototype, 'destroyed', {
          get: function () {
            if (this._readableState === undefined) {
              return false;
            }
            return this._readableState.destroyed;
          },
          set: function (value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._readableState) {
              return;
            }

            // backward compatibility, the user is explicitly
            // managing destroyed
            this._readableState.destroyed = value;
          }
        });

        Readable.prototype.destroy = destroyImpl.destroy;
        Readable.prototype._undestroy = destroyImpl.undestroy;
        Readable.prototype._destroy = function (err, cb) {
          this.push(null);
          cb(err);
        };

        // Manually shove something into the read() buffer.
        // This returns true if the highWaterMark has not been hit yet,
        // similar to how Writable.write() returns true if you should
        // write() some more.
        Readable.prototype.push = function (chunk, encoding) {
          var state = this._readableState;
          var skipChunkCheck;

          if (!state.objectMode) {
            if (typeof chunk === 'string') {
              encoding = encoding || state.defaultEncoding;
              if (encoding !== state.encoding) {
                chunk = Buffer.from(chunk, encoding);
                encoding = '';
              }
              skipChunkCheck = true;
            }
          } else {
            skipChunkCheck = true;
          }

          return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
        };

        // Unshift should *always* be something directly out of read()
        Readable.prototype.unshift = function (chunk) {
          return readableAddChunk(this, chunk, null, true, false);
        };

        function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
          var state = stream._readableState;
          if (chunk === null) {
            state.reading = false;
            onEofChunk(stream, state);
          } else {
            var er;
            if (!skipChunkCheck) er = chunkInvalid(state, chunk);
            if (er) {
              stream.emit('error', er);
            } else if (state.objectMode || chunk && chunk.length > 0) {
              if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                chunk = _uint8ArrayToBuffer(chunk);
              }

              if (addToFront) {
                if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event')); else addChunk(stream, state, chunk, true);
              } else if (state.ended) {
                stream.emit('error', new Error('stream.push() after EOF'));
              } else {
                state.reading = false;
                if (state.decoder && !encoding) {
                  chunk = state.decoder.write(chunk);
                  if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false); else maybeReadMore(stream, state);
                } else {
                  addChunk(stream, state, chunk, false);
                }
              }
            } else if (!addToFront) {
              state.reading = false;
            }
          }

          return needMoreData(state);
        }

        function addChunk(stream, state, chunk, addToFront) {
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront) state.buffer.unshift(chunk); else state.buffer.push(chunk);

            if (state.needReadable) emitReadable(stream);
          }
          maybeReadMore(stream, state);
        }

        function chunkInvalid(state, chunk) {
          var er;
          if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
            er = new TypeError('Invalid non-string/buffer chunk');
          }
          return er;
        }

        // if it's past the high water mark, we can push in some more.
        // Also, if we have no data yet, we can stand some
        // more bytes.  This is to work around cases where hwm=0,
        // such as the repl.  Also, if the push() triggered a
        // readable event, and the user called read(largeNumber) such that
        // needReadable was set, then we ought to push more, so that another
        // 'readable' event will be triggered.
        function needMoreData(state) {
          return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
        }

        Readable.prototype.isPaused = function () {
          return this._readableState.flowing === false;
        };

        // backwards compatibility.
        Readable.prototype.setEncoding = function (enc) {
          if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
          this._readableState.decoder = new StringDecoder(enc);
          this._readableState.encoding = enc;
          return this;
        };

        // Don't raise the hwm > 8MB
        var MAX_HWM = 0x800000;
        function computeNewHighWaterMark(n) {
          if (n >= MAX_HWM) {
            n = MAX_HWM;
          } else {
            // Get the next highest power of 2 to prevent increasing hwm excessively in
            // tiny amounts
            n--;
            n |= n >>> 1;
            n |= n >>> 2;
            n |= n >>> 4;
            n |= n >>> 8;
            n |= n >>> 16;
            n++;
          }
          return n;
        }

        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function howMuchToRead(n, state) {
          if (n <= 0 || state.length === 0 && state.ended) return 0;
          if (state.objectMode) return 1;
          if (n !== n) {
            // Only flow one buffer at a time
            if (state.flowing && state.length) return state.buffer.head.data.length; else return state.length;
          }
          // If we're asking for more than the current hwm, then raise the hwm.
          if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
          if (n <= state.length) return n;
          // Don't have enough
          if (!state.ended) {
            state.needReadable = true;
            return 0;
          }
          return state.length;
        }

        // you can override either this method, or the async _read(n) below.
        Readable.prototype.read = function (n) {
          debug('read', n);
          n = parseInt(n, 10);
          var state = this._readableState;
          var nOrig = n;

          if (n !== 0) state.emittedReadable = false;

          // if we're doing read(0) to trigger a readable event, but we
          // already have a bunch of data in the buffer, then just trigger
          // the 'readable' event and move on.
          if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
            debug('read: emitReadable', state.length, state.ended);
            if (state.length === 0 && state.ended) endReadable(this); else emitReadable(this);
            return null;
          }

          n = howMuchToRead(n, state);

          // if we've ended, and we're now clear, then finish it up.
          if (n === 0 && state.ended) {
            if (state.length === 0) endReadable(this);
            return null;
          }

          // All the actual chunk generation logic needs to be
          // *below* the call to _read.  The reason is that in certain
          // synthetic stream cases, such as passthrough streams, _read
          // may be a completely synchronous operation which may change
          // the state of the read buffer, providing enough data when
          // before there was *not* enough.
          //
          // So, the steps are:
          // 1. Figure out what the state of things will be after we do
          // a read from the buffer.
          //
          // 2. If that resulting state will trigger a _read, then call _read.
          // Note that this may be asynchronous, or synchronous.  Yes, it is
          // deeply ugly to write APIs this way, but that still doesn't mean
          // that the Readable class should behave improperly, as streams are
          // designed to be sync/async agnostic.
          // Take note if the _read call is sync or async (ie, if the read call
          // has returned yet), so that we know whether or not it's safe to emit
          // 'readable' etc.
          //
          // 3. Actually pull the requested chunks out of the buffer and return.

          // if we need a readable event, then we need to do some reading.
          var doRead = state.needReadable;
          debug('need readable', doRead);

          // if we currently have less than the highWaterMark, then also read some
          if (state.length === 0 || state.length - n < state.highWaterMark) {
            doRead = true;
            debug('length less than watermark', doRead);
          }

          // however, if we've ended, then there's no point, and if we're already
          // reading, then it's unnecessary.
          if (state.ended || state.reading) {
            doRead = false;
            debug('reading or ended', doRead);
          } else if (doRead) {
            debug('do read');
            state.reading = true;
            state.sync = true;
            // if the length is currently zero, then we *need* a readable event.
            if (state.length === 0) state.needReadable = true;
            // call internal read method
            this._read(state.highWaterMark);
            state.sync = false;
            // If _read pushed data synchronously, then `reading` will be false,
            // and we need to re-evaluate how much data we can return to the user.
            if (!state.reading) n = howMuchToRead(nOrig, state);
          }

          var ret;
          if (n > 0) ret = fromList(n, state); else ret = null;

          if (ret === null) {
            state.needReadable = true;
            n = 0;
          } else {
            state.length -= n;
          }

          if (state.length === 0) {
            // If we have nothing in the buffer, then we want to know
            // as soon as we *do* get something into the buffer.
            if (!state.ended) state.needReadable = true;

            // If we tried to read() past the EOF, then emit end on the next tick.
            if (nOrig !== n && state.ended) endReadable(this);
          }

          if (ret !== null) this.emit('data', ret);

          return ret;
        };

        function onEofChunk(stream, state) {
          if (state.ended) return;
          if (state.decoder) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) {
              state.buffer.push(chunk);
              state.length += state.objectMode ? 1 : chunk.length;
            }
          }
          state.ended = true;

          // emit 'readable' now to make sure it gets picked up.
          emitReadable(stream);
        }

        // Don't emit readable right away in sync mode, because this can trigger
        // another read() call => stack overflow.  This way, it might trigger
        // a nextTick recursion warning, but that's not so bad.
        function emitReadable(stream) {
          var state = stream._readableState;
          state.needReadable = false;
          if (!state.emittedReadable) {
            debug('emitReadable', state.flowing);
            state.emittedReadable = true;
            if (state.sync) pna.nextTick(emitReadable_, stream); else emitReadable_(stream);
          }
        }

        function emitReadable_(stream) {
          debug('emit readable');
          stream.emit('readable');
          flow(stream);
        }

        // at this point, the user has presumably seen the 'readable' event,
        // and called read() to consume some data.  that may have triggered
        // in turn another _read(n) call, in which case reading = true if
        // it's in progress.
        // However, if we're not ended, or reading, and the length < hwm,
        // then go ahead and try to read some more preemptively.
        function maybeReadMore(stream, state) {
          if (!state.readingMore) {
            state.readingMore = true;
            pna.nextTick(maybeReadMore_, stream, state);
          }
        }

        function maybeReadMore_(stream, state) {
          var len = state.length;
          while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
            debug('maybeReadMore read 0');
            stream.read(0);
            if (len === state.length)
              // didn't get any data, stop spinning.
              break; else len = state.length;
          }
          state.readingMore = false;
        }

        // abstract method.  to be overridden in specific implementation classes.
        // call cb(er, data) where data is <= n in length.
        // for virtual (non-string, non-buffer) streams, "length" is somewhat
        // arbitrary, and perhaps not very meaningful.
        Readable.prototype._read = function (n) {
          this.emit('error', new Error('_read() is not implemented'));
        };

        Readable.prototype.pipe = function (dest, pipeOpts) {
          var src = this;
          var state = this._readableState;

          switch (state.pipesCount) {
            case 0:
              state.pipes = dest;
              break;
            case 1:
              state.pipes = [state.pipes, dest];
              break;
            default:
              state.pipes.push(dest);
              break;
          }
          state.pipesCount += 1;
          debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

          var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

          var endFn = doEnd ? onend : unpipe;
          if (state.endEmitted) pna.nextTick(endFn); else src.once('end', endFn);

          dest.on('unpipe', onunpipe);
          function onunpipe(readable, unpipeInfo) {
            debug('onunpipe');
            if (readable === src) {
              if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
              }
            }
          }

          function onend() {
            debug('onend');
            dest.end();
          }

          // when the dest drains, it reduces the awaitDrain counter
          // on the source.  This would be more elegant with a .once()
          // handler in flow(), but adding and removing repeatedly is
          // too slow.
          var ondrain = pipeOnDrain(src);
          dest.on('drain', ondrain);

          var cleanedUp = false;
          function cleanup() {
            debug('cleanup');
            // cleanup event handlers once the pipe is broken
            dest.removeListener('close', onclose);
            dest.removeListener('finish', onfinish);
            dest.removeListener('drain', ondrain);
            dest.removeListener('error', onerror);
            dest.removeListener('unpipe', onunpipe);
            src.removeListener('end', onend);
            src.removeListener('end', unpipe);
            src.removeListener('data', ondata);

            cleanedUp = true;

            // if the reader is waiting for a drain event from this
            // specific writer, then it would cause it to never start
            // flowing again.
            // So, if this is awaiting a drain, then we just call it now.
            // If we don't know, then assume that we are waiting for one.
            if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
          }

          // If the user pushes more data while we're writing to dest then we'll end up
          // in ondata again. However, we only want to increase awaitDrain once because
          // dest will only emit one 'drain' event for the multiple writes.
          // => Introduce a guard on increasing awaitDrain.
          var increasedAwaitDrain = false;
          src.on('data', ondata);
          function ondata(chunk) {
            debug('ondata');
            increasedAwaitDrain = false;
            var ret = dest.write(chunk);
            if (false === ret && !increasedAwaitDrain) {
              // If the user unpiped during `dest.write()`, it is possible
              // to get stuck in a permanently paused state if that write
              // also returned false.
              // => Check whether `dest` is still a piping destination.
              if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                debug('false write response, pause', src._readableState.awaitDrain);
                src._readableState.awaitDrain++;
                increasedAwaitDrain = true;
              }
              src.pause();
            }
          }

          // if the dest has an error, then stop piping into it.
          // however, don't suppress the throwing behavior for this.
          function onerror(er) {
            debug('onerror', er);
            unpipe();
            dest.removeListener('error', onerror);
            if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
          }

          // Make sure our error handler is attached before userland ones.
          prependListener(dest, 'error', onerror);

          // Both close and finish should trigger unpipe, but only once.
          function onclose() {
            dest.removeListener('finish', onfinish);
            unpipe();
          }
          dest.once('close', onclose);
          function onfinish() {
            debug('onfinish');
            dest.removeListener('close', onclose);
            unpipe();
          }
          dest.once('finish', onfinish);

          function unpipe() {
            debug('unpipe');
            src.unpipe(dest);
          }

          // tell the dest that it's being piped to
          dest.emit('pipe', src);

          // start the flow if it hasn't been started already.
          if (!state.flowing) {
            debug('pipe resume');
            src.resume();
          }

          return dest;
        };

        function pipeOnDrain(src) {
          return function () {
            var state = src._readableState;
            debug('pipeOnDrain', state.awaitDrain);
            if (state.awaitDrain) state.awaitDrain--;
            if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
              state.flowing = true;
              flow(src);
            }
          };
        }

        Readable.prototype.unpipe = function (dest) {
          var state = this._readableState;
          var unpipeInfo = { hasUnpiped: false };

          // if we're not piping anywhere, then do nothing.
          if (state.pipesCount === 0) return this;

          // just one destination.  most common case.
          if (state.pipesCount === 1) {
            // passed in one, but it's not the right one.
            if (dest && dest !== state.pipes) return this;

            if (!dest) dest = state.pipes;

            // got a match.
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            if (dest) dest.emit('unpipe', this, unpipeInfo);
            return this;
          }

          // slow case. multiple pipe destinations.

          if (!dest) {
            // remove all.
            var dests = state.pipes;
            var len = state.pipesCount;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;

            for (var i = 0; i < len; i++) {
              dests[i].emit('unpipe', this, unpipeInfo);
            } return this;
          }

          // try to find the right one.
          var index = indexOf(state.pipes, dest);
          if (index === -1) return this;

          state.pipes.splice(index, 1);
          state.pipesCount -= 1;
          if (state.pipesCount === 1) state.pipes = state.pipes[0];

          dest.emit('unpipe', this, unpipeInfo);

          return this;
        };

        // set up data events if they are asked for
        // Ensure readable listeners eventually get something
        Readable.prototype.on = function (ev, fn) {
          var res = Stream.prototype.on.call(this, ev, fn);

          if (ev === 'data') {
            // Start flowing on next tick if stream isn't explicitly paused
            if (this._readableState.flowing !== false) this.resume();
          } else if (ev === 'readable') {
            var state = this._readableState;
            if (!state.endEmitted && !state.readableListening) {
              state.readableListening = state.needReadable = true;
              state.emittedReadable = false;
              if (!state.reading) {
                pna.nextTick(nReadingNextTick, this);
              } else if (state.length) {
                emitReadable(this);
              }
            }
          }

          return res;
        };
        Readable.prototype.addListener = Readable.prototype.on;

        function nReadingNextTick(self) {
          debug('readable nexttick read 0');
          self.read(0);
        }

        // pause() and resume() are remnants of the legacy readable stream API
        // If the user uses them, then switch into old mode.
        Readable.prototype.resume = function () {
          var state = this._readableState;
          if (!state.flowing) {
            debug('resume');
            state.flowing = true;
            resume(this, state);
          }
          return this;
        };

        function resume(stream, state) {
          if (!state.resumeScheduled) {
            state.resumeScheduled = true;
            pna.nextTick(resume_, stream, state);
          }
        }

        function resume_(stream, state) {
          if (!state.reading) {
            debug('resume read 0');
            stream.read(0);
          }

          state.resumeScheduled = false;
          state.awaitDrain = 0;
          stream.emit('resume');
          flow(stream);
          if (state.flowing && !state.reading) stream.read(0);
        }

        Readable.prototype.pause = function () {
          debug('call pause flowing=%j', this._readableState.flowing);
          if (false !== this._readableState.flowing) {
            debug('pause');
            this._readableState.flowing = false;
            this.emit('pause');
          }
          return this;
        };

        function flow(stream) {
          var state = stream._readableState;
          debug('flow', state.flowing);
          while (state.flowing && stream.read() !== null) { }
        }

        // wrap an old-style stream as the async data source.
        // This is *not* part of the readable stream interface.
        // It is an ugly unfortunate mess of history.
        Readable.prototype.wrap = function (stream) {
          var _this = this;

          var state = this._readableState;
          var paused = false;

          stream.on('end', function () {
            debug('wrapped end');
            if (state.decoder && !state.ended) {
              var chunk = state.decoder.end();
              if (chunk && chunk.length) _this.push(chunk);
            }

            _this.push(null);
          });

          stream.on('data', function (chunk) {
            debug('wrapped data');
            if (state.decoder) chunk = state.decoder.write(chunk);

            // don't skip over falsy values in objectMode
            if (state.objectMode && (chunk === null || chunk === undefined)) return; else if (!state.objectMode && (!chunk || !chunk.length)) return;

            var ret = _this.push(chunk);
            if (!ret) {
              paused = true;
              stream.pause();
            }
          });

          // proxy all the other methods.
          // important when wrapping filters and duplexes.
          for (var i in stream) {
            if (this[i] === undefined && typeof stream[i] === 'function') {
              this[i] = function (method) {
                return function () {
                  return stream[method].apply(stream, arguments);
                };
              }(i);
            }
          }

          // proxy certain important events.
          for (var n = 0; n < kProxyEvents.length; n++) {
            stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
          }

          // when we try to consume some more bytes, simply unpause the
          // underlying stream.
          this._read = function (n) {
            debug('wrapped _read', n);
            if (paused) {
              paused = false;
              stream.resume();
            }
          };

          return this;
        };

        Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function () {
            return this._readableState.highWaterMark;
          }
        });

        // exposed for testing purposes only.
        Readable._fromList = fromList;

        // Pluck off n bytes from an array of buffers.
        // Length is the combined lengths of all the buffers in the list.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function fromList(n, state) {
          // nothing buffered
          if (state.length === 0) return null;

          var ret;
          if (state.objectMode) ret = state.buffer.shift(); else if (!n || n >= state.length) {
            // read it all, truncate the list
            if (state.decoder) ret = state.buffer.join(''); else if (state.buffer.length === 1) ret = state.buffer.head.data; else ret = state.buffer.concat(state.length);
            state.buffer.clear();
          } else {
            // read part of list
            ret = fromListPartial(n, state.buffer, state.decoder);
          }

          return ret;
        }

        // Extracts only enough buffered data to satisfy the amount requested.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function fromListPartial(n, list, hasStrings) {
          var ret;
          if (n < list.head.data.length) {
            // slice is the same for buffers and strings
            ret = list.head.data.slice(0, n);
            list.head.data = list.head.data.slice(n);
          } else if (n === list.head.data.length) {
            // first chunk is a perfect match
            ret = list.shift();
          } else {
            // result spans more than one buffer
            ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
          }
          return ret;
        }

        // Copies a specified amount of characters from the list of buffered data
        // chunks.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function copyFromBufferString(n, list) {
          var p = list.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str; else ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next) list.head = p.next; else list.head = list.tail = null;
              } else {
                list.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }

        // Copies a specified amount of bytes from the list of buffered data chunks.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function copyFromBuffer(n, list) {
          var ret = Buffer.allocUnsafe(n);
          var p = list.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next) list.head = p.next; else list.head = list.tail = null;
              } else {
                list.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }

        function endReadable(stream) {
          var state = stream._readableState;

          // If we get here before consuming all the bytes, then that is a
          // bug in node.  Should never happen.
          if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

          if (!state.endEmitted) {
            state.ended = true;
            pna.nextTick(endReadableNT, state, stream);
          }
        }

        function endReadableNT(state, stream) {
          // Check that we didn't get one last unshift.
          if (!state.endEmitted && state.length === 0) {
            state.endEmitted = true;
            stream.readable = false;
            stream.emit('end');
          }
        }

        function indexOf(xs, x) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (xs[i] === x) return i;
          }
          return -1;
        }
      }).call(this)
    }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  }, { "./_stream_duplex": 38, "./internal/streams/BufferList": 43, "./internal/streams/destroy": 44, "./internal/streams/stream": 45, "_process": 35, "core-util-is": 24, "events": 22, "inherits": 28, "isarray": 30, "process-nextick-args": 46, "safe-buffer": 47, "string_decoder/": 48, "util": 20 }], 41: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    // a transform stream is a readable/writable stream where you do
    // something with the data.  Sometimes it's called a "filter",
    // but that's not a great name for it, since that implies a thing where
    // some bits pass through, and others are simply ignored.  (That would
    // be a valid example of a transform, of course.)
    //
    // While the output is causally related to the input, it's not a
    // necessarily symmetric or synchronous transformation.  For example,
    // a zlib stream might take multiple plain-text writes(), and then
    // emit a single compressed chunk some time in the future.
    //
    // Here's how this works:
    //
    // The Transform stream has all the aspects of the readable and writable
    // stream classes.  When you write(chunk), that calls _write(chunk,cb)
    // internally, and returns false if there's a lot of pending writes
    // buffered up.  When you call read(), that calls _read(n) until
    // there's enough pending readable data buffered up.
    //
    // In a transform stream, the written data is placed in a buffer.  When
    // _read(n) is called, it transforms the queued up data, calling the
    // buffered _write cb's as it consumes chunks.  If consuming a single
    // written chunk would result in multiple output chunks, then the first
    // outputted bit calls the readcb, and subsequent chunks just go into
    // the read buffer, and will cause it to emit 'readable' if necessary.
    //
    // This way, back-pressure is actually determined by the reading side,
    // since _read has to be called to start processing a new chunk.  However,
    // a pathological inflate type of transform can cause excessive buffering
    // here.  For example, imagine a stream where every byte of input is
    // interpreted as an integer from 0-255, and then results in that many
    // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
    // 1kb of data being output.  In this case, you could write a very small
    // amount of input, and end up with a very large amount of output.  In
    // such a pathological inflating mechanism, there'd be no way to tell
    // the system to stop doing the transform.  A single 4MB write could
    // cause the system to run out of memory.
    //
    // However, even in such a pathological case, only a single written chunk
    // would be consumed, and then the rest would wait (un-transformed) until
    // the results of the previous transformed chunk were consumed.

    'use strict';

    module.exports = Transform;

    var Duplex = require('./_stream_duplex');

    /*<replacement>*/
    var util = Object.create(require('core-util-is'));
    util.inherits = require('inherits');
    /*</replacement>*/

    util.inherits(Transform, Duplex);

    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;

      var cb = ts.writecb;

      if (!cb) {
        return this.emit('error', new Error('write callback called multiple times'));
      }

      ts.writechunk = null;
      ts.writecb = null;

      if (data != null) // single equals check for both `null` and `undefined`
        this.push(data);

      cb(er);

      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }

    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);

      Duplex.call(this, options);

      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };

      // start out asking for a readable event once data is transformed.
      this._readableState.needReadable = true;

      // we have implemented the _read method, and done the other things
      // that Readable wants before the first _read call, so unset the
      // sync guard flag.
      this._readableState.sync = false;

      if (options) {
        if (typeof options.transform === 'function') this._transform = options.transform;

        if (typeof options.flush === 'function') this._flush = options.flush;
      }

      // When the writable side finishes, then flush out anything remaining.
      this.on('prefinish', prefinish);
    }

    function prefinish() {
      var _this = this;

      if (typeof this._flush === 'function') {
        this._flush(function (er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }

    Transform.prototype.push = function (chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };

    // This is the part where you do stuff!
    // override this function in implementation classes.
    // 'chunk' is an input chunk.
    //
    // Call `push(newChunk)` to pass along transformed output
    // to the readable side.  You may call 'push' zero or more times.
    //
    // Call `cb(err)` when you are done with this chunk.  If you pass
    // an error, then that'll put the hurt on the whole operation.  If you
    // never call cb(), then you'll never get another chunk.
    Transform.prototype._transform = function (chunk, encoding, cb) {
      throw new Error('_transform() is not implemented');
    };

    Transform.prototype._write = function (chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    };

    // Doesn't matter what the args are here.
    // _transform does all the work.
    // That we got here means that the readable side wants more data.
    Transform.prototype._read = function (n) {
      var ts = this._transformState;

      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        // mark that we need a transform, so that any data that comes in
        // will get processed, now that we've asked for it.
        ts.needTransform = true;
      }
    };

    Transform.prototype._destroy = function (err, cb) {
      var _this2 = this;

      Duplex.prototype._destroy.call(this, err, function (err2) {
        cb(err2);
        _this2.emit('close');
      });
    };

    function done(stream, er, data) {
      if (er) return stream.emit('error', er);

      if (data != null) // single equals check for both `null` and `undefined`
        stream.push(data);

      // if there's nothing in the write buffer, then that means
      // that nothing more will ever be provided
      if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

      if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

      return stream.push(null);
    }
  }, { "./_stream_duplex": 38, "core-util-is": 24, "inherits": 28 }], 42: [function (require, module, exports) {
    (function (process, global, setImmediate) {
      (function () {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        // A bit simpler than readable streams.
        // Implement an async ._write(chunk, encoding, cb), and it'll handle all
        // the drain event emission and buffering.

        'use strict';

        /*<replacement>*/

        var pna = require('process-nextick-args');
        /*</replacement>*/

        module.exports = Writable;

        /* <replacement> */
        function WriteReq(chunk, encoding, cb) {
          this.chunk = chunk;
          this.encoding = encoding;
          this.callback = cb;
          this.next = null;
        }

        // It seems a linked list but it is not
        // there will be only 2 of these for each stream
        function CorkedRequest(state) {
          var _this = this;

          this.next = null;
          this.entry = null;
          this.finish = function () {
            onCorkedFinish(_this, state);
          };
        }
        /* </replacement> */

        /*<replacement>*/
        var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
        /*</replacement>*/

        /*<replacement>*/
        var Duplex;
        /*</replacement>*/

        Writable.WritableState = WritableState;

        /*<replacement>*/
        var util = Object.create(require('core-util-is'));
        util.inherits = require('inherits');
        /*</replacement>*/

        /*<replacement>*/
        var internalUtil = {
          deprecate: require('util-deprecate')
        };
        /*</replacement>*/

        /*<replacement>*/
        var Stream = require('./internal/streams/stream');
        /*</replacement>*/

        /*<replacement>*/

        var Buffer = require('safe-buffer').Buffer;
        var OurUint8Array = global.Uint8Array || function () { };
        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }
        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }

        /*</replacement>*/

        var destroyImpl = require('./internal/streams/destroy');

        util.inherits(Writable, Stream);

        function nop() { }

        function WritableState(options, stream) {
          Duplex = Duplex || require('./_stream_duplex');

          options = options || {};

          // Duplex streams are both readable and writable, but share
          // the same options object.
          // However, some cases require setting options to different
          // values for the readable and the writable sides of the duplex stream.
          // These options can be provided separately as readableXXX and writableXXX.
          var isDuplex = stream instanceof Duplex;

          // object stream flag to indicate whether or not this stream
          // contains buffers or objects.
          this.objectMode = !!options.objectMode;

          if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

          // the point at which write() starts returning false
          // Note: 0 is a valid value, means that we always return false if
          // the entire buffer is not flushed immediately on write()
          var hwm = options.highWaterMark;
          var writableHwm = options.writableHighWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;

          if (hwm || hwm === 0) this.highWaterMark = hwm; else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm; else this.highWaterMark = defaultHwm;

          // cast to ints.
          this.highWaterMark = Math.floor(this.highWaterMark);

          // if _final has been called
          this.finalCalled = false;

          // drain event flag.
          this.needDrain = false;
          // at the start of calling end()
          this.ending = false;
          // when end() has been called, and returned
          this.ended = false;
          // when 'finish' is emitted
          this.finished = false;

          // has it been destroyed
          this.destroyed = false;

          // should we decode strings into buffers before passing to _write?
          // this is here so that some node-core streams can optimize string
          // handling at a lower level.
          var noDecode = options.decodeStrings === false;
          this.decodeStrings = !noDecode;

          // Crypto is kind of old and crusty.  Historically, its default string
          // encoding is 'binary' so we have to make this configurable.
          // Everything else in the universe uses 'utf8', though.
          this.defaultEncoding = options.defaultEncoding || 'utf8';

          // not an actual buffer we keep track of, but a measurement
          // of how much we're waiting to get pushed to some underlying
          // socket or file.
          this.length = 0;

          // a flag to see when we're in the middle of a write.
          this.writing = false;

          // when true all writes will be buffered until .uncork() call
          this.corked = 0;

          // a flag to be able to tell if the onwrite cb is called immediately,
          // or on a later tick.  We set this to true at first, because any
          // actions that shouldn't happen until "later" should generally also
          // not happen before the first write call.
          this.sync = true;

          // a flag to know if we're processing previously buffered items, which
          // may call the _write() callback in the same tick, so that we don't
          // end up in an overlapped onwrite situation.
          this.bufferProcessing = false;

          // the callback that's passed to _write(chunk,cb)
          this.onwrite = function (er) {
            onwrite(stream, er);
          };

          // the callback that the user supplies to write(chunk,encoding,cb)
          this.writecb = null;

          // the amount that is being written when _write is called.
          this.writelen = 0;

          this.bufferedRequest = null;
          this.lastBufferedRequest = null;

          // number of pending user-supplied write callbacks
          // this must be 0 before 'finish' can be emitted
          this.pendingcb = 0;

          // emit prefinish if the only thing we're waiting for is _write cbs
          // This is relevant for synchronous Transform streams
          this.prefinished = false;

          // True if the error was already emitted and should not be thrown again
          this.errorEmitted = false;

          // count buffered requests
          this.bufferedRequestCount = 0;

          // allocate the first CorkedRequest, there is always
          // one allocated and free to use, and we maintain at most two
          this.corkedRequestsFree = new CorkedRequest(this);
        }

        WritableState.prototype.getBuffer = function getBuffer() {
          var current = this.bufferedRequest;
          var out = [];
          while (current) {
            out.push(current);
            current = current.next;
          }
          return out;
        };

        (function () {
          try {
            Object.defineProperty(WritableState.prototype, 'buffer', {
              get: internalUtil.deprecate(function () {
                return this.getBuffer();
              }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
            });
          } catch (_) { }
        })();

        // Test _writableState for inheritance to account for Duplex streams,
        // whose prototype chain only points to Readable.
        var realHasInstance;
        if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
          realHasInstance = Function.prototype[Symbol.hasInstance];
          Object.defineProperty(Writable, Symbol.hasInstance, {
            value: function (object) {
              if (realHasInstance.call(this, object)) return true;
              if (this !== Writable) return false;

              return object && object._writableState instanceof WritableState;
            }
          });
        } else {
          realHasInstance = function (object) {
            return object instanceof this;
          };
        }

        function Writable(options) {
          Duplex = Duplex || require('./_stream_duplex');

          // Writable ctor is applied to Duplexes, too.
          // `realHasInstance` is necessary because using plain `instanceof`
          // would return false, as no `_writableState` property is attached.

          // Trying to use the custom `instanceof` for Writable here will also break the
          // Node.js LazyTransform implementation, which has a non-trivial getter for
          // `_writableState` that would lead to infinite recursion.
          if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
            return new Writable(options);
          }

          this._writableState = new WritableState(options, this);

          // legacy.
          this.writable = true;

          if (options) {
            if (typeof options.write === 'function') this._write = options.write;

            if (typeof options.writev === 'function') this._writev = options.writev;

            if (typeof options.destroy === 'function') this._destroy = options.destroy;

            if (typeof options.final === 'function') this._final = options.final;
          }

          Stream.call(this);
        }

        // Otherwise people can pipe Writable streams, which is just wrong.
        Writable.prototype.pipe = function () {
          this.emit('error', new Error('Cannot pipe, not readable'));
        };

        function writeAfterEnd(stream, cb) {
          var er = new Error('write after end');
          // TODO: defer error events consistently everywhere, not just the cb
          stream.emit('error', er);
          pna.nextTick(cb, er);
        }

        // Checks that a user-supplied chunk is valid, especially for the particular
        // mode the stream is in. Currently this means that `null` is never accepted
        // and undefined/non-string values are only allowed in object mode.
        function validChunk(stream, state, chunk, cb) {
          var valid = true;
          var er = false;

          if (chunk === null) {
            er = new TypeError('May not write null values to stream');
          } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
            er = new TypeError('Invalid non-string/buffer chunk');
          }
          if (er) {
            stream.emit('error', er);
            pna.nextTick(cb, er);
            valid = false;
          }
          return valid;
        }

        Writable.prototype.write = function (chunk, encoding, cb) {
          var state = this._writableState;
          var ret = false;
          var isBuf = !state.objectMode && _isUint8Array(chunk);

          if (isBuf && !Buffer.isBuffer(chunk)) {
            chunk = _uint8ArrayToBuffer(chunk);
          }

          if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
          }

          if (isBuf) encoding = 'buffer'; else if (!encoding) encoding = state.defaultEncoding;

          if (typeof cb !== 'function') cb = nop;

          if (state.ended) writeAfterEnd(this, cb); else if (isBuf || validChunk(this, state, chunk, cb)) {
            state.pendingcb++;
            ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
          }

          return ret;
        };

        Writable.prototype.cork = function () {
          var state = this._writableState;

          state.corked++;
        };

        Writable.prototype.uncork = function () {
          var state = this._writableState;

          if (state.corked) {
            state.corked--;

            if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
          }
        };

        Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
          // node::ParseEncoding() requires lower case.
          if (typeof encoding === 'string') encoding = encoding.toLowerCase();
          if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
          this._writableState.defaultEncoding = encoding;
          return this;
        };

        function decodeChunk(state, chunk, encoding) {
          if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
            chunk = Buffer.from(chunk, encoding);
          }
          return chunk;
        }

        Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function () {
            return this._writableState.highWaterMark;
          }
        });

        // if we're already writing something, then just put this
        // in the queue, and wait our turn.  Otherwise, call _write
        // If we return false, then we need a drain event, so set that flag.
        function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
          if (!isBuf) {
            var newChunk = decodeChunk(state, chunk, encoding);
            if (chunk !== newChunk) {
              isBuf = true;
              encoding = 'buffer';
              chunk = newChunk;
            }
          }
          var len = state.objectMode ? 1 : chunk.length;

          state.length += len;

          var ret = state.length < state.highWaterMark;
          // we must ensure that previous needDrain will not be reset to false.
          if (!ret) state.needDrain = true;

          if (state.writing || state.corked) {
            var last = state.lastBufferedRequest;
            state.lastBufferedRequest = {
              chunk: chunk,
              encoding: encoding,
              isBuf: isBuf,
              callback: cb,
              next: null
            };
            if (last) {
              last.next = state.lastBufferedRequest;
            } else {
              state.bufferedRequest = state.lastBufferedRequest;
            }
            state.bufferedRequestCount += 1;
          } else {
            doWrite(stream, state, false, len, chunk, encoding, cb);
          }

          return ret;
        }

        function doWrite(stream, state, writev, len, chunk, encoding, cb) {
          state.writelen = len;
          state.writecb = cb;
          state.writing = true;
          state.sync = true;
          if (writev) stream._writev(chunk, state.onwrite); else stream._write(chunk, encoding, state.onwrite);
          state.sync = false;
        }

        function onwriteError(stream, state, sync, er, cb) {
          --state.pendingcb;

          if (sync) {
            // defer the callback if we are being called synchronously
            // to avoid piling up things on the stack
            pna.nextTick(cb, er);
            // this can emit finish, and it will always happen
            // after error
            pna.nextTick(finishMaybe, stream, state);
            stream._writableState.errorEmitted = true;
            stream.emit('error', er);
          } else {
            // the caller expect this to happen before if
            // it is async
            cb(er);
            stream._writableState.errorEmitted = true;
            stream.emit('error', er);
            // this can emit finish, but finish must
            // always follow error
            finishMaybe(stream, state);
          }
        }

        function onwriteStateUpdate(state) {
          state.writing = false;
          state.writecb = null;
          state.length -= state.writelen;
          state.writelen = 0;
        }

        function onwrite(stream, er) {
          var state = stream._writableState;
          var sync = state.sync;
          var cb = state.writecb;

          onwriteStateUpdate(state);

          if (er) onwriteError(stream, state, sync, er, cb); else {
            // Check if we're actually ready to finish, but don't emit yet
            var finished = needFinish(state);

            if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
              clearBuffer(stream, state);
            }

            if (sync) {
              /*<replacement>*/
              asyncWrite(afterWrite, stream, state, finished, cb);
              /*</replacement>*/
            } else {
              afterWrite(stream, state, finished, cb);
            }
          }
        }

        function afterWrite(stream, state, finished, cb) {
          if (!finished) onwriteDrain(stream, state);
          state.pendingcb--;
          cb();
          finishMaybe(stream, state);
        }

        // Must force callback to be called on nextTick, so that we don't
        // emit 'drain' before the write() consumer gets the 'false' return
        // value, and has a chance to attach a 'drain' listener.
        function onwriteDrain(stream, state) {
          if (state.length === 0 && state.needDrain) {
            state.needDrain = false;
            stream.emit('drain');
          }
        }

        // if there's something in the buffer waiting, then process it
        function clearBuffer(stream, state) {
          state.bufferProcessing = true;
          var entry = state.bufferedRequest;

          if (stream._writev && entry && entry.next) {
            // Fast case, write everything using _writev()
            var l = state.bufferedRequestCount;
            var buffer = new Array(l);
            var holder = state.corkedRequestsFree;
            holder.entry = entry;

            var count = 0;
            var allBuffers = true;
            while (entry) {
              buffer[count] = entry;
              if (!entry.isBuf) allBuffers = false;
              entry = entry.next;
              count += 1;
            }
            buffer.allBuffers = allBuffers;

            doWrite(stream, state, true, state.length, buffer, '', holder.finish);

            // doWrite is almost always async, defer these to save a bit of time
            // as the hot path ends with doWrite
            state.pendingcb++;
            state.lastBufferedRequest = null;
            if (holder.next) {
              state.corkedRequestsFree = holder.next;
              holder.next = null;
            } else {
              state.corkedRequestsFree = new CorkedRequest(state);
            }
            state.bufferedRequestCount = 0;
          } else {
            // Slow case, write chunks one-by-one
            while (entry) {
              var chunk = entry.chunk;
              var encoding = entry.encoding;
              var cb = entry.callback;
              var len = state.objectMode ? 1 : chunk.length;

              doWrite(stream, state, false, len, chunk, encoding, cb);
              entry = entry.next;
              state.bufferedRequestCount--;
              // if we didn't call the onwrite immediately, then
              // it means that we need to wait until it does.
              // also, that means that the chunk and cb are currently
              // being processed, so move the buffer counter past them.
              if (state.writing) {
                break;
              }
            }

            if (entry === null) state.lastBufferedRequest = null;
          }

          state.bufferedRequest = entry;
          state.bufferProcessing = false;
        }

        Writable.prototype._write = function (chunk, encoding, cb) {
          cb(new Error('_write() is not implemented'));
        };

        Writable.prototype._writev = null;

        Writable.prototype.end = function (chunk, encoding, cb) {
          var state = this._writableState;

          if (typeof chunk === 'function') {
            cb = chunk;
            chunk = null;
            encoding = null;
          } else if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
          }

          if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

          // .end() fully uncorks
          if (state.corked) {
            state.corked = 1;
            this.uncork();
          }

          // ignore unnecessary end() calls.
          if (!state.ending && !state.finished) endWritable(this, state, cb);
        };

        function needFinish(state) {
          return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
        }
        function callFinal(stream, state) {
          stream._final(function (err) {
            state.pendingcb--;
            if (err) {
              stream.emit('error', err);
            }
            state.prefinished = true;
            stream.emit('prefinish');
            finishMaybe(stream, state);
          });
        }
        function prefinish(stream, state) {
          if (!state.prefinished && !state.finalCalled) {
            if (typeof stream._final === 'function') {
              state.pendingcb++;
              state.finalCalled = true;
              pna.nextTick(callFinal, stream, state);
            } else {
              state.prefinished = true;
              stream.emit('prefinish');
            }
          }
        }

        function finishMaybe(stream, state) {
          var need = needFinish(state);
          if (need) {
            prefinish(stream, state);
            if (state.pendingcb === 0) {
              state.finished = true;
              stream.emit('finish');
            }
          }
          return need;
        }

        function endWritable(stream, state, cb) {
          state.ending = true;
          finishMaybe(stream, state);
          if (cb) {
            if (state.finished) pna.nextTick(cb); else stream.once('finish', cb);
          }
          state.ended = true;
          stream.writable = false;
        }

        function onCorkedFinish(corkReq, state, err) {
          var entry = corkReq.entry;
          corkReq.entry = null;
          while (entry) {
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
          }
          if (state.corkedRequestsFree) {
            state.corkedRequestsFree.next = corkReq;
          } else {
            state.corkedRequestsFree = corkReq;
          }
        }

        Object.defineProperty(Writable.prototype, 'destroyed', {
          get: function () {
            if (this._writableState === undefined) {
              return false;
            }
            return this._writableState.destroyed;
          },
          set: function (value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._writableState) {
              return;
            }

            // backward compatibility, the user is explicitly
            // managing destroyed
            this._writableState.destroyed = value;
          }
        });

        Writable.prototype.destroy = destroyImpl.destroy;
        Writable.prototype._undestroy = destroyImpl.undestroy;
        Writable.prototype._destroy = function (err, cb) {
          this.end();
          cb(err);
        };
      }).call(this)
    }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("timers").setImmediate)

  }, { "./_stream_duplex": 38, "./internal/streams/destroy": 44, "./internal/streams/stream": 45, "_process": 35, "core-util-is": 24, "inherits": 28, "process-nextick-args": 46, "safe-buffer": 47, "timers": 71, "util-deprecate": 72 }], 43: [function (require, module, exports) {
    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Buffer = require('safe-buffer').Buffer;
    var util = require('util');

    function copyBuffer(src, target, offset) {
      src.copy(target, offset);
    }

    module.exports = function () {
      function BufferList() {
        _classCallCheck(this, BufferList);

        this.head = null;
        this.tail = null;
        this.length = 0;
      }

      BufferList.prototype.push = function push(v) {
        var entry = { data: v, next: null };
        if (this.length > 0) this.tail.next = entry; else this.head = entry;
        this.tail = entry;
        ++this.length;
      };

      BufferList.prototype.unshift = function unshift(v) {
        var entry = { data: v, next: this.head };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      };

      BufferList.prototype.shift = function shift() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null; else this.head = this.head.next;
        --this.length;
        return ret;
      };

      BufferList.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
      };

      BufferList.prototype.join = function join(s) {
        if (this.length === 0) return '';
        var p = this.head;
        var ret = '' + p.data;
        while (p = p.next) {
          ret += s + p.data;
        } return ret;
      };

      BufferList.prototype.concat = function concat(n) {
        if (this.length === 0) return Buffer.alloc(0);
        if (this.length === 1) return this.head.data;
        var ret = Buffer.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };

      return BufferList;
    }();

    if (util && util.inspect && util.inspect.custom) {
      module.exports.prototype[util.inspect.custom] = function () {
        var obj = util.inspect({ length: this.length });
        return this.constructor.name + ' ' + obj;
      };
    }
  }, { "safe-buffer": 47, "util": 20 }], 44: [function (require, module, exports) {
    'use strict';

    /*<replacement>*/

    var pna = require('process-nextick-args');
    /*</replacement>*/

    // undocumented cb() API, needed for core, not for public API
    function destroy(err, cb) {
      var _this = this;

      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;

      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
          pna.nextTick(emitErrorNT, this, err);
        }
        return this;
      }

      // we set destroyed to true before firing error callbacks in order
      // to make it re-entrance safe in case destroy() is called within callbacks

      if (this._readableState) {
        this._readableState.destroyed = true;
      }

      // if this is a duplex stream mark the writable part as destroyed as well
      if (this._writableState) {
        this._writableState.destroyed = true;
      }

      this._destroy(err || null, function (err) {
        if (!cb && err) {
          pna.nextTick(emitErrorNT, _this, err);
          if (_this._writableState) {
            _this._writableState.errorEmitted = true;
          }
        } else if (cb) {
          cb(err);
        }
      });

      return this;
    }

    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }

      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }

    function emitErrorNT(self, err) {
      self.emit('error', err);
    }

    module.exports = {
      destroy: destroy,
      undestroy: undestroy
    };
  }, { "process-nextick-args": 46 }], 45: [function (require, module, exports) {
    arguments[4][15][0].apply(exports, arguments)
  }, { "dup": 15, "events": 22 }], 46: [function (require, module, exports) {
    (function (process) {
      (function () {
        'use strict';

        if (typeof process === 'undefined' ||
          !process.version ||
          process.version.indexOf('v0.') === 0 ||
          process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
          module.exports = { nextTick: nextTick };
        } else {
          module.exports = process
        }

        function nextTick(fn, arg1, arg2, arg3) {
          if (typeof fn !== 'function') {
            throw new TypeError('"callback" argument must be a function');
          }
          var len = arguments.length;
          var args, i;
          switch (len) {
            case 0:
            case 1:
              return process.nextTick(fn);
            case 2:
              return process.nextTick(function afterTickOne() {
                fn.call(null, arg1);
              });
            case 3:
              return process.nextTick(function afterTickTwo() {
                fn.call(null, arg1, arg2);
              });
            case 4:
              return process.nextTick(function afterTickThree() {
                fn.call(null, arg1, arg2, arg3);
              });
            default:
              args = new Array(len - 1);
              i = 0;
              while (i < args.length) {
                args[i++] = arguments[i];
              }
              return process.nextTick(function afterTick() {
                fn.apply(null, args);
              });
          }
        }


      }).call(this)
    }).call(this, require('_process'))

  }, { "_process": 35 }], 47: [function (require, module, exports) {
    arguments[4][17][0].apply(exports, arguments)
  }, { "buffer": 21, "dup": 17 }], 48: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    'use strict';

    /*<replacement>*/

    var Buffer = require('safe-buffer').Buffer;
    /*</replacement>*/

    var isEncoding = Buffer.isEncoding || function (encoding) {
      encoding = '' + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw':
          return true;
        default:
          return false;
      }
    };

    function _normalizeEncoding(enc) {
      if (!enc) return 'utf8';
      var retried;
      while (true) {
        switch (enc) {
          case 'utf8':
          case 'utf-8':
            return 'utf8';
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return 'utf16le';
          case 'latin1':
          case 'binary':
            return 'latin1';
          case 'base64':
          case 'ascii':
          case 'hex':
            return enc;
          default:
            if (retried) return; // undefined
            enc = ('' + enc).toLowerCase();
            retried = true;
        }
      }
    };

    // Do not cache `Buffer.isEncoding` when checking encoding names as some
    // modules monkey-patch it to support additional encodings
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
      return nenc || enc;
    }

    // StringDecoder provides an interface for efficiently splitting a series of
    // buffers into a series of JS strings without breaking apart multi-byte
    // characters.
    exports.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case 'utf16le':
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case 'utf8':
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case 'base64':
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer.allocUnsafe(nb);
    }

    StringDecoder.prototype.write = function (buf) {
      if (buf.length === 0) return '';
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || '';
    };

    StringDecoder.prototype.end = utf8End;

    // Returns only complete characters in a Buffer
    StringDecoder.prototype.text = utf8Text;

    // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
    StringDecoder.prototype.fillLast = function (buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };

    // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
    // continuation byte. If an invalid byte is detected, -2 is returned.
    function utf8CheckByte(byte) {
      if (byte <= 0x7F) return 0; else if (byte >> 5 === 0x06) return 2; else if (byte >> 4 === 0x0E) return 3; else if (byte >> 3 === 0x1E) return 4;
      return byte >> 6 === 0x02 ? -1 : -2;
    }

    // Checks at most 3 bytes at the end of a Buffer in order to detect an
    // incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
    // needed to complete the UTF-8 character (if applicable) are returned.
    function utf8CheckIncomplete(self, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0; else self.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }

    // Validates as many continuation bytes for a multi-byte UTF-8 character as
    // needed or are available. If we see a non-continuation byte where we expect
    // one, we "replace" the validated continuation bytes we've seen so far with
    // a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
    // behavior. The continuation byte check is included three times in the case
    // where all of the continuation bytes for a character exist in the same buffer.
    // It is also done this way as a slight performance increase instead of using a
    // loop.
    function utf8CheckExtraBytes(self, buf, p) {
      if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return '\ufffd';
      }
      if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
          self.lastNeed = 1;
          return '\ufffd';
        }
        if (self.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 0xC0) !== 0x80) {
            self.lastNeed = 2;
            return '\ufffd';
          }
        }
      }
    }

    // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== undefined) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }

    // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
    // partial character, the character's bytes are buffered until the required
    // number of bytes are available.
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString('utf8', i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString('utf8', i, end);
    }

    // For UTF-8, a replacement character is added when ending on a partial
    // character.
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) return r + '\ufffd';
      return r;
    }

    // UTF-16LE typically needs two bytes per character, but even if we have an even
    // number of bytes available, we need to check if we end on a leading/high
    // surrogate. In that case, we need to wait for the next two bytes in order to
    // decode the last character properly.
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 0xD800 && c <= 0xDBFF) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString('utf16le', i, buf.length - 1);
    }

    // For UTF-16LE we do not explicitly append special replacement characters if we
    // end on a partial character, we simply let v8 handle that.
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
      }
      return r;
    }

    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString('base64', i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString('base64', i, buf.length - n);
    }

    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
      return r;
    }

    // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }

    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : '';
    }
  }, { "safe-buffer": 47 }], 49: [function (require, module, exports) {
    module.exports = require('./readable').PassThrough

  }, { "./readable": 50 }], 50: [function (require, module, exports) {
    arguments[4][16][0].apply(exports, arguments)
  }, { "./lib/_stream_duplex.js": 38, "./lib/_stream_passthrough.js": 39, "./lib/_stream_readable.js": 40, "./lib/_stream_transform.js": 41, "./lib/_stream_writable.js": 42, "dup": 16 }], 51: [function (require, module, exports) {
    module.exports = require('./readable').Transform

  }, { "./readable": 50 }], 52: [function (require, module, exports) {
    module.exports = require('./lib/_stream_writable.js');

  }, { "./lib/_stream_writable.js": 42 }], 53: [function (require, module, exports) {
    /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
    /* eslint-disable node/no-deprecated-api */
    var buffer = require('buffer')
    var Buffer = buffer.Buffer

    // alternative to using Object.keys for old browsers
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key]
      }
    }
    if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
      module.exports = buffer
    } else {
      // Copy properties from require('buffer')
      copyProps(buffer, exports)
      exports.Buffer = SafeBuffer
    }

    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer(arg, encodingOrOffset, length)
    }

    SafeBuffer.prototype = Object.create(Buffer.prototype)

    // Copy static methods from Buffer
    copyProps(Buffer, SafeBuffer)

    SafeBuffer.from = function (arg, encodingOrOffset, length) {
      if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number')
      }
      return Buffer(arg, encodingOrOffset, length)
    }

    SafeBuffer.alloc = function (size, fill, encoding) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      var buf = Buffer(size)
      if (fill !== undefined) {
        if (typeof encoding === 'string') {
          buf.fill(fill, encoding)
        } else {
          buf.fill(fill)
        }
      } else {
        buf.fill(0)
      }
      return buf
    }

    SafeBuffer.allocUnsafe = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      return Buffer(size)
    }

    SafeBuffer.allocUnsafeSlow = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number')
      }
      return buffer.SlowBuffer(size)
    }

  }, { "buffer": 21 }], 54: [function (require, module, exports) {
    arguments[4][48][0].apply(exports, arguments)
  }, { "dup": 48, "safe-buffer": 53 }], 55: [function (require, module, exports) {
    'use strict';

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var codes = {};

    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }

      function getMessage(arg1, arg2, arg3) {
        if (typeof message === 'string') {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }

      var NodeError =
        /*#__PURE__*/
        function (_Base) {
          _inheritsLoose(NodeError, _Base);

          function NodeError(arg1, arg2, arg3) {
            return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
          }

          return NodeError;
        }(Base);

      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    } // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function (i) {
          return String(i);
        });

        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


    function endsWith(str, search, this_len) {
      if (this_len === undefined || this_len > str.length) {
        this_len = str.length;
      }

      return str.substring(this_len - search.length, this_len) === search;
    } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


    function includes(str, search, start) {
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }

    createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
      // determiner: 'must be' or 'must not be'
      var determiner;

      if (typeof expected === 'string' && startsWith(expected, 'not ')) {
        determiner = 'must not be';
        expected = expected.replace(/^not /, '');
      } else {
        determiner = 'must be';
      }

      var msg;

      if (endsWith(name, ' argument')) {
        // For cases like 'first argument'
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
      } else {
        var type = includes(name, '.') ? 'property' : 'argument';
        msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
      }

      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
    createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
      return 'The ' + name + ' method is not implemented';
    });
    createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
    createErrorType('ERR_STREAM_DESTROYED', function (name) {
      return 'Cannot call ' + name + ' after a stream was destroyed';
    });
    createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
    createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
    createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
    createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
    createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
      return 'Unknown encoding: ' + arg;
    }, TypeError);
    createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
    module.exports.codes = codes;

  }, {}], 56: [function (require, module, exports) {
    (function (process) {
      (function () {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        // a duplex stream is just a stream that is both readable and writable.
        // Since JS doesn't have multiple prototypal inheritance, this class
        // prototypally inherits from Readable, and then parasitically from
        // Writable.
        'use strict';
        /*<replacement>*/

        var objectKeys = Object.keys || function (obj) {
          var keys = [];

          for (var key in obj) {
            keys.push(key);
          }

          return keys;
        };
        /*</replacement>*/


        module.exports = Duplex;

        var Readable = require('./_stream_readable');

        var Writable = require('./_stream_writable');

        require('inherits')(Duplex, Readable);

        {
          // Allow the keys array to be GC'ed.
          var keys = objectKeys(Writable.prototype);

          for (var v = 0; v < keys.length; v++) {
            var method = keys[v];
            if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
          }
        }

        function Duplex(options) {
          if (!(this instanceof Duplex)) return new Duplex(options);
          Readable.call(this, options);
          Writable.call(this, options);
          this.allowHalfOpen = true;

          if (options) {
            if (options.readable === false) this.readable = false;
            if (options.writable === false) this.writable = false;

            if (options.allowHalfOpen === false) {
              this.allowHalfOpen = false;
              this.once('end', onend);
            }
          }
        }

        Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._writableState.highWaterMark;
          }
        });
        Object.defineProperty(Duplex.prototype, 'writableBuffer', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._writableState && this._writableState.getBuffer();
          }
        });
        Object.defineProperty(Duplex.prototype, 'writableLength', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._writableState.length;
          }
        }); // the no-half-open enforcer

        function onend() {
          // If the writable side ended, then we're ok.
          if (this._writableState.ended) return; // no more data can be written.
          // But allow more writes to happen in this tick.

          process.nextTick(onEndNT, this);
        }

        function onEndNT(self) {
          self.end();
        }

        Object.defineProperty(Duplex.prototype, 'destroyed', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            if (this._readableState === undefined || this._writableState === undefined) {
              return false;
            }

            return this._readableState.destroyed && this._writableState.destroyed;
          },
          set: function set(value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (this._readableState === undefined || this._writableState === undefined) {
              return;
            } // backward compatibility, the user is explicitly
            // managing destroyed


            this._readableState.destroyed = value;
            this._writableState.destroyed = value;
          }
        });
      }).call(this)
    }).call(this, require('_process'))

  }, { "./_stream_readable": 58, "./_stream_writable": 60, "_process": 35, "inherits": 28 }], 57: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    // a passthrough stream.
    // basically just the most minimal sort of Transform stream.
    // Every written chunk gets output as-is.
    'use strict';

    module.exports = PassThrough;

    var Transform = require('./_stream_transform');

    require('inherits')(PassThrough, Transform);

    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }

    PassThrough.prototype._transform = function (chunk, encoding, cb) {
      cb(null, chunk);
    };
  }, { "./_stream_transform": 59, "inherits": 28 }], 58: [function (require, module, exports) {
    (function (process, global) {
      (function () {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        'use strict';

        module.exports = Readable;
        /*<replacement>*/

        var Duplex;
        /*</replacement>*/

        Readable.ReadableState = ReadableState;
        /*<replacement>*/

        var EE = require('events').EventEmitter;

        var EElistenerCount = function EElistenerCount(emitter, type) {
          return emitter.listeners(type).length;
        };
        /*</replacement>*/

        /*<replacement>*/


        var Stream = require('./internal/streams/stream');
        /*</replacement>*/


        var Buffer = require('buffer').Buffer;

        var OurUint8Array = global.Uint8Array || function () { };

        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }

        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }
        /*<replacement>*/


        var debugUtil = require('util');

        var debug;

        if (debugUtil && debugUtil.debuglog) {
          debug = debugUtil.debuglog('stream');
        } else {
          debug = function debug() { };
        }
        /*</replacement>*/


        var BufferList = require('./internal/streams/buffer_list');

        var destroyImpl = require('./internal/streams/destroy');

        var _require = require('./internal/streams/state'),
          getHighWaterMark = _require.getHighWaterMark;

        var _require$codes = require('../errors').codes,
          ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
          ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
          ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
          ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


        var StringDecoder;
        var createReadableStreamAsyncIterator;
        var from;

        require('inherits')(Readable, Stream);

        var errorOrDestroy = destroyImpl.errorOrDestroy;
        var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

        function prependListener(emitter, event, fn) {
          // Sadly this is not cacheable as some libraries bundle their own
          // event emitter implementation with them.
          if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
          // userland ones.  NEVER DO THIS. This is here only because this code needs
          // to continue to work with older versions of Node.js that do not include
          // the prependListener() method. The goal is to eventually remove this hack.

          if (!emitter._events || !emitter._events[event]) emitter.on(event, fn); else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn); else emitter._events[event] = [fn, emitter._events[event]];
        }

        function ReadableState(options, stream, isDuplex) {
          Duplex = Duplex || require('./_stream_duplex');
          options = options || {}; // Duplex streams are both readable and writable, but share
          // the same options object.
          // However, some cases require setting options to different
          // values for the readable and the writable sides of the duplex stream.
          // These options can be provided separately as readableXXX and writableXXX.

          if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
          // make all the buffer merging and length checks go away

          this.objectMode = !!options.objectMode;
          if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
          // Note: 0 is a valid value, means "don't call _read preemptively ever"

          this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
          // linked list can remove elements from the beginning faster than
          // array.shift()

          this.buffer = new BufferList();
          this.length = 0;
          this.pipes = null;
          this.pipesCount = 0;
          this.flowing = null;
          this.ended = false;
          this.endEmitted = false;
          this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
          // immediately, or on a later tick.  We set this to true at first, because
          // any actions that shouldn't happen until "later" should generally also
          // not happen before the first read call.

          this.sync = true; // whenever we return null, then we set a flag to say
          // that we're awaiting a 'readable' event emission.

          this.needReadable = false;
          this.emittedReadable = false;
          this.readableListening = false;
          this.resumeScheduled = false;
          this.paused = true; // Should close be emitted on destroy. Defaults to true.

          this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

          this.autoDestroy = !!options.autoDestroy; // has it been destroyed

          this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
          // encoding is 'binary' so we have to make this configurable.
          // Everything else in the universe uses 'utf8', though.

          this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

          this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

          this.readingMore = false;
          this.decoder = null;
          this.encoding = null;

          if (options.encoding) {
            if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
            this.decoder = new StringDecoder(options.encoding);
            this.encoding = options.encoding;
          }
        }

        function Readable(options) {
          Duplex = Duplex || require('./_stream_duplex');
          if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
          // the ReadableState constructor, at least with V8 6.5

          var isDuplex = this instanceof Duplex;
          this._readableState = new ReadableState(options, this, isDuplex); // legacy

          this.readable = true;

          if (options) {
            if (typeof options.read === 'function') this._read = options.read;
            if (typeof options.destroy === 'function') this._destroy = options.destroy;
          }

          Stream.call(this);
        }

        Object.defineProperty(Readable.prototype, 'destroyed', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            if (this._readableState === undefined) {
              return false;
            }

            return this._readableState.destroyed;
          },
          set: function set(value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._readableState) {
              return;
            } // backward compatibility, the user is explicitly
            // managing destroyed


            this._readableState.destroyed = value;
          }
        });
        Readable.prototype.destroy = destroyImpl.destroy;
        Readable.prototype._undestroy = destroyImpl.undestroy;

        Readable.prototype._destroy = function (err, cb) {
          cb(err);
        }; // Manually shove something into the read() buffer.
        // This returns true if the highWaterMark has not been hit yet,
        // similar to how Writable.write() returns true if you should
        // write() some more.


        Readable.prototype.push = function (chunk, encoding) {
          var state = this._readableState;
          var skipChunkCheck;

          if (!state.objectMode) {
            if (typeof chunk === 'string') {
              encoding = encoding || state.defaultEncoding;

              if (encoding !== state.encoding) {
                chunk = Buffer.from(chunk, encoding);
                encoding = '';
              }

              skipChunkCheck = true;
            }
          } else {
            skipChunkCheck = true;
          }

          return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
        }; // Unshift should *always* be something directly out of read()


        Readable.prototype.unshift = function (chunk) {
          return readableAddChunk(this, chunk, null, true, false);
        };

        function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
          debug('readableAddChunk', chunk);
          var state = stream._readableState;

          if (chunk === null) {
            state.reading = false;
            onEofChunk(stream, state);
          } else {
            var er;
            if (!skipChunkCheck) er = chunkInvalid(state, chunk);

            if (er) {
              errorOrDestroy(stream, er);
            } else if (state.objectMode || chunk && chunk.length > 0) {
              if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                chunk = _uint8ArrayToBuffer(chunk);
              }

              if (addToFront) {
                if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT()); else addChunk(stream, state, chunk, true);
              } else if (state.ended) {
                errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
              } else if (state.destroyed) {
                return false;
              } else {
                state.reading = false;

                if (state.decoder && !encoding) {
                  chunk = state.decoder.write(chunk);
                  if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false); else maybeReadMore(stream, state);
                } else {
                  addChunk(stream, state, chunk, false);
                }
              }
            } else if (!addToFront) {
              state.reading = false;
              maybeReadMore(stream, state);
            }
          } // We can push more data if we are below the highWaterMark.
          // Also, if we have no data yet, we can stand some more bytes.
          // This is to work around cases where hwm=0, such as the repl.


          return !state.ended && (state.length < state.highWaterMark || state.length === 0);
        }

        function addChunk(stream, state, chunk, addToFront) {
          if (state.flowing && state.length === 0 && !state.sync) {
            state.awaitDrain = 0;
            stream.emit('data', chunk);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront) state.buffer.unshift(chunk); else state.buffer.push(chunk);
            if (state.needReadable) emitReadable(stream);
          }

          maybeReadMore(stream, state);
        }

        function chunkInvalid(state, chunk) {
          var er;

          if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
            er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
          }

          return er;
        }

        Readable.prototype.isPaused = function () {
          return this._readableState.flowing === false;
        }; // backwards compatibility.


        Readable.prototype.setEncoding = function (enc) {
          if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
          var decoder = new StringDecoder(enc);
          this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

          this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

          var p = this._readableState.buffer.head;
          var content = '';

          while (p !== null) {
            content += decoder.write(p.data);
            p = p.next;
          }

          this._readableState.buffer.clear();

          if (content !== '') this._readableState.buffer.push(content);
          this._readableState.length = content.length;
          return this;
        }; // Don't raise the hwm > 1GB


        var MAX_HWM = 0x40000000;

        function computeNewHighWaterMark(n) {
          if (n >= MAX_HWM) {
            // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
            n = MAX_HWM;
          } else {
            // Get the next highest power of 2 to prevent increasing hwm excessively in
            // tiny amounts
            n--;
            n |= n >>> 1;
            n |= n >>> 2;
            n |= n >>> 4;
            n |= n >>> 8;
            n |= n >>> 16;
            n++;
          }

          return n;
        } // This function is designed to be inlinable, so please take care when making
        // changes to the function body.


        function howMuchToRead(n, state) {
          if (n <= 0 || state.length === 0 && state.ended) return 0;
          if (state.objectMode) return 1;

          if (n !== n) {
            // Only flow one buffer at a time
            if (state.flowing && state.length) return state.buffer.head.data.length; else return state.length;
          } // If we're asking for more than the current hwm, then raise the hwm.


          if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
          if (n <= state.length) return n; // Don't have enough

          if (!state.ended) {
            state.needReadable = true;
            return 0;
          }

          return state.length;
        } // you can override either this method, or the async _read(n) below.


        Readable.prototype.read = function (n) {
          debug('read', n);
          n = parseInt(n, 10);
          var state = this._readableState;
          var nOrig = n;
          if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
          // already have a bunch of data in the buffer, then just trigger
          // the 'readable' event and move on.

          if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
            debug('read: emitReadable', state.length, state.ended);
            if (state.length === 0 && state.ended) endReadable(this); else emitReadable(this);
            return null;
          }

          n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

          if (n === 0 && state.ended) {
            if (state.length === 0) endReadable(this);
            return null;
          } // All the actual chunk generation logic needs to be
          // *below* the call to _read.  The reason is that in certain
          // synthetic stream cases, such as passthrough streams, _read
          // may be a completely synchronous operation which may change
          // the state of the read buffer, providing enough data when
          // before there was *not* enough.
          //
          // So, the steps are:
          // 1. Figure out what the state of things will be after we do
          // a read from the buffer.
          //
          // 2. If that resulting state will trigger a _read, then call _read.
          // Note that this may be asynchronous, or synchronous.  Yes, it is
          // deeply ugly to write APIs this way, but that still doesn't mean
          // that the Readable class should behave improperly, as streams are
          // designed to be sync/async agnostic.
          // Take note if the _read call is sync or async (ie, if the read call
          // has returned yet), so that we know whether or not it's safe to emit
          // 'readable' etc.
          //
          // 3. Actually pull the requested chunks out of the buffer and return.
          // if we need a readable event, then we need to do some reading.


          var doRead = state.needReadable;
          debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

          if (state.length === 0 || state.length - n < state.highWaterMark) {
            doRead = true;
            debug('length less than watermark', doRead);
          } // however, if we've ended, then there's no point, and if we're already
          // reading, then it's unnecessary.


          if (state.ended || state.reading) {
            doRead = false;
            debug('reading or ended', doRead);
          } else if (doRead) {
            debug('do read');
            state.reading = true;
            state.sync = true; // if the length is currently zero, then we *need* a readable event.

            if (state.length === 0) state.needReadable = true; // call internal read method

            this._read(state.highWaterMark);

            state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
            // and we need to re-evaluate how much data we can return to the user.

            if (!state.reading) n = howMuchToRead(nOrig, state);
          }

          var ret;
          if (n > 0) ret = fromList(n, state); else ret = null;

          if (ret === null) {
            state.needReadable = state.length <= state.highWaterMark;
            n = 0;
          } else {
            state.length -= n;
            state.awaitDrain = 0;
          }

          if (state.length === 0) {
            // If we have nothing in the buffer, then we want to know
            // as soon as we *do* get something into the buffer.
            if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

            if (nOrig !== n && state.ended) endReadable(this);
          }

          if (ret !== null) this.emit('data', ret);
          return ret;
        };

        function onEofChunk(stream, state) {
          debug('onEofChunk');
          if (state.ended) return;

          if (state.decoder) {
            var chunk = state.decoder.end();

            if (chunk && chunk.length) {
              state.buffer.push(chunk);
              state.length += state.objectMode ? 1 : chunk.length;
            }
          }

          state.ended = true;

          if (state.sync) {
            // if we are sync, wait until next tick to emit the data.
            // Otherwise we risk emitting data in the flow()
            // the readable code triggers during a read() call
            emitReadable(stream);
          } else {
            // emit 'readable' now to make sure it gets picked up.
            state.needReadable = false;

            if (!state.emittedReadable) {
              state.emittedReadable = true;
              emitReadable_(stream);
            }
          }
        } // Don't emit readable right away in sync mode, because this can trigger
        // another read() call => stack overflow.  This way, it might trigger
        // a nextTick recursion warning, but that's not so bad.


        function emitReadable(stream) {
          var state = stream._readableState;
          debug('emitReadable', state.needReadable, state.emittedReadable);
          state.needReadable = false;

          if (!state.emittedReadable) {
            debug('emitReadable', state.flowing);
            state.emittedReadable = true;
            process.nextTick(emitReadable_, stream);
          }
        }

        function emitReadable_(stream) {
          var state = stream._readableState;
          debug('emitReadable_', state.destroyed, state.length, state.ended);

          if (!state.destroyed && (state.length || state.ended)) {
            stream.emit('readable');
            state.emittedReadable = false;
          } // The stream needs another readable event if
          // 1. It is not flowing, as the flow mechanism will take
          //    care of it.
          // 2. It is not ended.
          // 3. It is below the highWaterMark, so we can schedule
          //    another readable later.


          state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
          flow(stream);
        } // at this point, the user has presumably seen the 'readable' event,
        // and called read() to consume some data.  that may have triggered
        // in turn another _read(n) call, in which case reading = true if
        // it's in progress.
        // However, if we're not ended, or reading, and the length < hwm,
        // then go ahead and try to read some more preemptively.


        function maybeReadMore(stream, state) {
          if (!state.readingMore) {
            state.readingMore = true;
            process.nextTick(maybeReadMore_, stream, state);
          }
        }

        function maybeReadMore_(stream, state) {
          // Attempt to read more data if we should.
          //
          // The conditions for reading more data are (one of):
          // - Not enough data buffered (state.length < state.highWaterMark). The loop
          //   is responsible for filling the buffer with enough data if such data
          //   is available. If highWaterMark is 0 and we are not in the flowing mode
          //   we should _not_ attempt to buffer any extra data. We'll get more data
          //   when the stream consumer calls read() instead.
          // - No data in the buffer, and the stream is in flowing mode. In this mode
          //   the loop below is responsible for ensuring read() is called. Failing to
          //   call read here would abort the flow and there's no other mechanism for
          //   continuing the flow if the stream consumer has just subscribed to the
          //   'data' event.
          //
          // In addition to the above conditions to keep reading data, the following
          // conditions prevent the data from being read:
          // - The stream has ended (state.ended).
          // - There is already a pending 'read' operation (state.reading). This is a
          //   case where the the stream has called the implementation defined _read()
          //   method, but they are processing the call asynchronously and have _not_
          //   called push() with new data. In this case we skip performing more
          //   read()s. The execution ends in this method again after the _read() ends
          //   up calling push() with more data.
          while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
            var len = state.length;
            debug('maybeReadMore read 0');
            stream.read(0);
            if (len === state.length) // didn't get any data, stop spinning.
              break;
          }

          state.readingMore = false;
        } // abstract method.  to be overridden in specific implementation classes.
        // call cb(er, data) where data is <= n in length.
        // for virtual (non-string, non-buffer) streams, "length" is somewhat
        // arbitrary, and perhaps not very meaningful.


        Readable.prototype._read = function (n) {
          errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
        };

        Readable.prototype.pipe = function (dest, pipeOpts) {
          var src = this;
          var state = this._readableState;

          switch (state.pipesCount) {
            case 0:
              state.pipes = dest;
              break;

            case 1:
              state.pipes = [state.pipes, dest];
              break;

            default:
              state.pipes.push(dest);
              break;
          }

          state.pipesCount += 1;
          debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
          var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
          var endFn = doEnd ? onend : unpipe;
          if (state.endEmitted) process.nextTick(endFn); else src.once('end', endFn);
          dest.on('unpipe', onunpipe);

          function onunpipe(readable, unpipeInfo) {
            debug('onunpipe');

            if (readable === src) {
              if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
              }
            }
          }

          function onend() {
            debug('onend');
            dest.end();
          } // when the dest drains, it reduces the awaitDrain counter
          // on the source.  This would be more elegant with a .once()
          // handler in flow(), but adding and removing repeatedly is
          // too slow.


          var ondrain = pipeOnDrain(src);
          dest.on('drain', ondrain);
          var cleanedUp = false;

          function cleanup() {
            debug('cleanup'); // cleanup event handlers once the pipe is broken

            dest.removeListener('close', onclose);
            dest.removeListener('finish', onfinish);
            dest.removeListener('drain', ondrain);
            dest.removeListener('error', onerror);
            dest.removeListener('unpipe', onunpipe);
            src.removeListener('end', onend);
            src.removeListener('end', unpipe);
            src.removeListener('data', ondata);
            cleanedUp = true; // if the reader is waiting for a drain event from this
            // specific writer, then it would cause it to never start
            // flowing again.
            // So, if this is awaiting a drain, then we just call it now.
            // If we don't know, then assume that we are waiting for one.

            if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
          }

          src.on('data', ondata);

          function ondata(chunk) {
            debug('ondata');
            var ret = dest.write(chunk);
            debug('dest.write', ret);

            if (ret === false) {
              // If the user unpiped during `dest.write()`, it is possible
              // to get stuck in a permanently paused state if that write
              // also returned false.
              // => Check whether `dest` is still a piping destination.
              if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                debug('false write response, pause', state.awaitDrain);
                state.awaitDrain++;
              }

              src.pause();
            }
          } // if the dest has an error, then stop piping into it.
          // however, don't suppress the throwing behavior for this.


          function onerror(er) {
            debug('onerror', er);
            unpipe();
            dest.removeListener('error', onerror);
            if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
          } // Make sure our error handler is attached before userland ones.


          prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

          function onclose() {
            dest.removeListener('finish', onfinish);
            unpipe();
          }

          dest.once('close', onclose);

          function onfinish() {
            debug('onfinish');
            dest.removeListener('close', onclose);
            unpipe();
          }

          dest.once('finish', onfinish);

          function unpipe() {
            debug('unpipe');
            src.unpipe(dest);
          } // tell the dest that it's being piped to


          dest.emit('pipe', src); // start the flow if it hasn't been started already.

          if (!state.flowing) {
            debug('pipe resume');
            src.resume();
          }

          return dest;
        };

        function pipeOnDrain(src) {
          return function pipeOnDrainFunctionResult() {
            var state = src._readableState;
            debug('pipeOnDrain', state.awaitDrain);
            if (state.awaitDrain) state.awaitDrain--;

            if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
              state.flowing = true;
              flow(src);
            }
          };
        }

        Readable.prototype.unpipe = function (dest) {
          var state = this._readableState;
          var unpipeInfo = {
            hasUnpiped: false
          }; // if we're not piping anywhere, then do nothing.

          if (state.pipesCount === 0) return this; // just one destination.  most common case.

          if (state.pipesCount === 1) {
            // passed in one, but it's not the right one.
            if (dest && dest !== state.pipes) return this;
            if (!dest) dest = state.pipes; // got a match.

            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            if (dest) dest.emit('unpipe', this, unpipeInfo);
            return this;
          } // slow case. multiple pipe destinations.


          if (!dest) {
            // remove all.
            var dests = state.pipes;
            var len = state.pipesCount;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;

            for (var i = 0; i < len; i++) {
              dests[i].emit('unpipe', this, {
                hasUnpiped: false
              });
            }

            return this;
          } // try to find the right one.


          var index = indexOf(state.pipes, dest);
          if (index === -1) return this;
          state.pipes.splice(index, 1);
          state.pipesCount -= 1;
          if (state.pipesCount === 1) state.pipes = state.pipes[0];
          dest.emit('unpipe', this, unpipeInfo);
          return this;
        }; // set up data events if they are asked for
        // Ensure readable listeners eventually get something


        Readable.prototype.on = function (ev, fn) {
          var res = Stream.prototype.on.call(this, ev, fn);
          var state = this._readableState;

          if (ev === 'data') {
            // update readableListening so that resume() may be a no-op
            // a few lines down. This is needed to support once('readable').
            state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

            if (state.flowing !== false) this.resume();
          } else if (ev === 'readable') {
            if (!state.endEmitted && !state.readableListening) {
              state.readableListening = state.needReadable = true;
              state.flowing = false;
              state.emittedReadable = false;
              debug('on readable', state.length, state.reading);

              if (state.length) {
                emitReadable(this);
              } else if (!state.reading) {
                process.nextTick(nReadingNextTick, this);
              }
            }
          }

          return res;
        };

        Readable.prototype.addListener = Readable.prototype.on;

        Readable.prototype.removeListener = function (ev, fn) {
          var res = Stream.prototype.removeListener.call(this, ev, fn);

          if (ev === 'readable') {
            // We need to check if there is someone still listening to
            // readable and reset the state. However this needs to happen
            // after readable has been emitted but before I/O (nextTick) to
            // support once('readable', fn) cycles. This means that calling
            // resume within the same tick will have no
            // effect.
            process.nextTick(updateReadableListening, this);
          }

          return res;
        };

        Readable.prototype.removeAllListeners = function (ev) {
          var res = Stream.prototype.removeAllListeners.apply(this, arguments);

          if (ev === 'readable' || ev === undefined) {
            // We need to check if there is someone still listening to
            // readable and reset the state. However this needs to happen
            // after readable has been emitted but before I/O (nextTick) to
            // support once('readable', fn) cycles. This means that calling
            // resume within the same tick will have no
            // effect.
            process.nextTick(updateReadableListening, this);
          }

          return res;
        };

        function updateReadableListening(self) {
          var state = self._readableState;
          state.readableListening = self.listenerCount('readable') > 0;

          if (state.resumeScheduled && !state.paused) {
            // flowing needs to be set to true now, otherwise
            // the upcoming resume will not flow.
            state.flowing = true; // crude way to check if we should resume
          } else if (self.listenerCount('data') > 0) {
            self.resume();
          }
        }

        function nReadingNextTick(self) {
          debug('readable nexttick read 0');
          self.read(0);
        } // pause() and resume() are remnants of the legacy readable stream API
        // If the user uses them, then switch into old mode.


        Readable.prototype.resume = function () {
          var state = this._readableState;

          if (!state.flowing) {
            debug('resume'); // we flow only if there is no one listening
            // for readable, but we still have to call
            // resume()

            state.flowing = !state.readableListening;
            resume(this, state);
          }

          state.paused = false;
          return this;
        };

        function resume(stream, state) {
          if (!state.resumeScheduled) {
            state.resumeScheduled = true;
            process.nextTick(resume_, stream, state);
          }
        }

        function resume_(stream, state) {
          debug('resume', state.reading);

          if (!state.reading) {
            stream.read(0);
          }

          state.resumeScheduled = false;
          stream.emit('resume');
          flow(stream);
          if (state.flowing && !state.reading) stream.read(0);
        }

        Readable.prototype.pause = function () {
          debug('call pause flowing=%j', this._readableState.flowing);

          if (this._readableState.flowing !== false) {
            debug('pause');
            this._readableState.flowing = false;
            this.emit('pause');
          }

          this._readableState.paused = true;
          return this;
        };

        function flow(stream) {
          var state = stream._readableState;
          debug('flow', state.flowing);

          while (state.flowing && stream.read() !== null) {
            ;
          }
        } // wrap an old-style stream as the async data source.
        // This is *not* part of the readable stream interface.
        // It is an ugly unfortunate mess of history.


        Readable.prototype.wrap = function (stream) {
          var _this = this;

          var state = this._readableState;
          var paused = false;
          stream.on('end', function () {
            debug('wrapped end');

            if (state.decoder && !state.ended) {
              var chunk = state.decoder.end();
              if (chunk && chunk.length) _this.push(chunk);
            }

            _this.push(null);
          });
          stream.on('data', function (chunk) {
            debug('wrapped data');
            if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

            if (state.objectMode && (chunk === null || chunk === undefined)) return; else if (!state.objectMode && (!chunk || !chunk.length)) return;

            var ret = _this.push(chunk);

            if (!ret) {
              paused = true;
              stream.pause();
            }
          }); // proxy all the other methods.
          // important when wrapping filters and duplexes.

          for (var i in stream) {
            if (this[i] === undefined && typeof stream[i] === 'function') {
              this[i] = function methodWrap(method) {
                return function methodWrapReturnFunction() {
                  return stream[method].apply(stream, arguments);
                };
              }(i);
            }
          } // proxy certain important events.


          for (var n = 0; n < kProxyEvents.length; n++) {
            stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
          } // when we try to consume some more bytes, simply unpause the
          // underlying stream.


          this._read = function (n) {
            debug('wrapped _read', n);

            if (paused) {
              paused = false;
              stream.resume();
            }
          };

          return this;
        };

        if (typeof Symbol === 'function') {
          Readable.prototype[Symbol.asyncIterator] = function () {
            if (createReadableStreamAsyncIterator === undefined) {
              createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
            }

            return createReadableStreamAsyncIterator(this);
          };
        }

        Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._readableState.highWaterMark;
          }
        });
        Object.defineProperty(Readable.prototype, 'readableBuffer', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._readableState && this._readableState.buffer;
          }
        });
        Object.defineProperty(Readable.prototype, 'readableFlowing', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._readableState.flowing;
          },
          set: function set(state) {
            if (this._readableState) {
              this._readableState.flowing = state;
            }
          }
        }); // exposed for testing purposes only.

        Readable._fromList = fromList;
        Object.defineProperty(Readable.prototype, 'readableLength', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._readableState.length;
          }
        }); // Pluck off n bytes from an array of buffers.
        // Length is the combined lengths of all the buffers in the list.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.

        function fromList(n, state) {
          // nothing buffered
          if (state.length === 0) return null;
          var ret;
          if (state.objectMode) ret = state.buffer.shift(); else if (!n || n >= state.length) {
            // read it all, truncate the list
            if (state.decoder) ret = state.buffer.join(''); else if (state.buffer.length === 1) ret = state.buffer.first(); else ret = state.buffer.concat(state.length);
            state.buffer.clear();
          } else {
            // read part of list
            ret = state.buffer.consume(n, state.decoder);
          }
          return ret;
        }

        function endReadable(stream) {
          var state = stream._readableState;
          debug('endReadable', state.endEmitted);

          if (!state.endEmitted) {
            state.ended = true;
            process.nextTick(endReadableNT, state, stream);
          }
        }

        function endReadableNT(state, stream) {
          debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

          if (!state.endEmitted && state.length === 0) {
            state.endEmitted = true;
            stream.readable = false;
            stream.emit('end');

            if (state.autoDestroy) {
              // In case of duplex streams we need a way to detect
              // if the writable side is ready for autoDestroy as well
              var wState = stream._writableState;

              if (!wState || wState.autoDestroy && wState.finished) {
                stream.destroy();
              }
            }
          }
        }

        if (typeof Symbol === 'function') {
          Readable.from = function (iterable, opts) {
            if (from === undefined) {
              from = require('./internal/streams/from');
            }

            return from(Readable, iterable, opts);
          };
        }

        function indexOf(xs, x) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (xs[i] === x) return i;
          }

          return -1;
        }
      }).call(this)
    }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  }, { "../errors": 55, "./_stream_duplex": 56, "./internal/streams/async_iterator": 61, "./internal/streams/buffer_list": 62, "./internal/streams/destroy": 63, "./internal/streams/from": 65, "./internal/streams/state": 67, "./internal/streams/stream": 68, "_process": 35, "buffer": 21, "events": 22, "inherits": 28, "string_decoder/": 54, "util": 20 }], 59: [function (require, module, exports) {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    // a transform stream is a readable/writable stream where you do
    // something with the data.  Sometimes it's called a "filter",
    // but that's not a great name for it, since that implies a thing where
    // some bits pass through, and others are simply ignored.  (That would
    // be a valid example of a transform, of course.)
    //
    // While the output is causally related to the input, it's not a
    // necessarily symmetric or synchronous transformation.  For example,
    // a zlib stream might take multiple plain-text writes(), and then
    // emit a single compressed chunk some time in the future.
    //
    // Here's how this works:
    //
    // The Transform stream has all the aspects of the readable and writable
    // stream classes.  When you write(chunk), that calls _write(chunk,cb)
    // internally, and returns false if there's a lot of pending writes
    // buffered up.  When you call read(), that calls _read(n) until
    // there's enough pending readable data buffered up.
    //
    // In a transform stream, the written data is placed in a buffer.  When
    // _read(n) is called, it transforms the queued up data, calling the
    // buffered _write cb's as it consumes chunks.  If consuming a single
    // written chunk would result in multiple output chunks, then the first
    // outputted bit calls the readcb, and subsequent chunks just go into
    // the read buffer, and will cause it to emit 'readable' if necessary.
    //
    // This way, back-pressure is actually determined by the reading side,
    // since _read has to be called to start processing a new chunk.  However,
    // a pathological inflate type of transform can cause excessive buffering
    // here.  For example, imagine a stream where every byte of input is
    // interpreted as an integer from 0-255, and then results in that many
    // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
    // 1kb of data being output.  In this case, you could write a very small
    // amount of input, and end up with a very large amount of output.  In
    // such a pathological inflating mechanism, there'd be no way to tell
    // the system to stop doing the transform.  A single 4MB write could
    // cause the system to run out of memory.
    //
    // However, even in such a pathological case, only a single written chunk
    // would be consumed, and then the rest would wait (un-transformed) until
    // the results of the previous transformed chunk were consumed.
    'use strict';

    module.exports = Transform;

    var _require$codes = require('../errors').codes,
      ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
      ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
      ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
      ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

    var Duplex = require('./_stream_duplex');

    require('inherits')(Transform, Duplex);

    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;

      if (cb === null) {
        return this.emit('error', new ERR_MULTIPLE_CALLBACK());
      }

      ts.writechunk = null;
      ts.writecb = null;
      if (data != null) // single equals check for both `null` and `undefined`
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;

      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }

    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      }; // start out asking for a readable event once data is transformed.

      this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
      // that Readable wants before the first _read call, so unset the
      // sync guard flag.

      this._readableState.sync = false;

      if (options) {
        if (typeof options.transform === 'function') this._transform = options.transform;
        if (typeof options.flush === 'function') this._flush = options.flush;
      } // When the writable side finishes, then flush out anything remaining.


      this.on('prefinish', prefinish);
    }

    function prefinish() {
      var _this = this;

      if (typeof this._flush === 'function' && !this._readableState.destroyed) {
        this._flush(function (er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }

    Transform.prototype.push = function (chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    }; // This is the part where you do stuff!
    // override this function in implementation classes.
    // 'chunk' is an input chunk.
    //
    // Call `push(newChunk)` to pass along transformed output
    // to the readable side.  You may call 'push' zero or more times.
    //
    // Call `cb(err)` when you are done with this chunk.  If you pass
    // an error, then that'll put the hurt on the whole operation.  If you
    // never call cb(), then you'll never get another chunk.


    Transform.prototype._transform = function (chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
    };

    Transform.prototype._write = function (chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;

      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    }; // Doesn't matter what the args are here.
    // _transform does all the work.
    // That we got here means that the readable side wants more data.


    Transform.prototype._read = function (n) {
      var ts = this._transformState;

      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;

        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        // mark that we need a transform, so that any data that comes in
        // will get processed, now that we've asked for it.
        ts.needTransform = true;
      }
    };

    Transform.prototype._destroy = function (err, cb) {
      Duplex.prototype._destroy.call(this, err, function (err2) {
        cb(err2);
      });
    };

    function done(stream, er, data) {
      if (er) return stream.emit('error', er);
      if (data != null) // single equals check for both `null` and `undefined`
        stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
      // if there's nothing in the write buffer, then that means
      // that nothing more will ever be provided

      if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
  }, { "../errors": 55, "./_stream_duplex": 56, "inherits": 28 }], 60: [function (require, module, exports) {
    (function (process, global) {
      (function () {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        // A bit simpler than readable streams.
        // Implement an async ._write(chunk, encoding, cb), and it'll handle all
        // the drain event emission and buffering.
        'use strict';

        module.exports = Writable;
        /* <replacement> */

        function WriteReq(chunk, encoding, cb) {
          this.chunk = chunk;
          this.encoding = encoding;
          this.callback = cb;
          this.next = null;
        } // It seems a linked list but it is not
        // there will be only 2 of these for each stream


        function CorkedRequest(state) {
          var _this = this;

          this.next = null;
          this.entry = null;

          this.finish = function () {
            onCorkedFinish(_this, state);
          };
        }
        /* </replacement> */

        /*<replacement>*/


        var Duplex;
        /*</replacement>*/

        Writable.WritableState = WritableState;
        /*<replacement>*/

        var internalUtil = {
          deprecate: require('util-deprecate')
        };
        /*</replacement>*/

        /*<replacement>*/

        var Stream = require('./internal/streams/stream');
        /*</replacement>*/


        var Buffer = require('buffer').Buffer;

        var OurUint8Array = global.Uint8Array || function () { };

        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }

        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }

        var destroyImpl = require('./internal/streams/destroy');

        var _require = require('./internal/streams/state'),
          getHighWaterMark = _require.getHighWaterMark;

        var _require$codes = require('../errors').codes,
          ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
          ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
          ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
          ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
          ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
          ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
          ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
          ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

        var errorOrDestroy = destroyImpl.errorOrDestroy;

        require('inherits')(Writable, Stream);

        function nop() { }

        function WritableState(options, stream, isDuplex) {
          Duplex = Duplex || require('./_stream_duplex');
          options = options || {}; // Duplex streams are both readable and writable, but share
          // the same options object.
          // However, some cases require setting options to different
          // values for the readable and the writable sides of the duplex stream,
          // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

          if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
          // contains buffers or objects.

          this.objectMode = !!options.objectMode;
          if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
          // Note: 0 is a valid value, means that we always return false if
          // the entire buffer is not flushed immediately on write()

          this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

          this.finalCalled = false; // drain event flag.

          this.needDrain = false; // at the start of calling end()

          this.ending = false; // when end() has been called, and returned

          this.ended = false; // when 'finish' is emitted

          this.finished = false; // has it been destroyed

          this.destroyed = false; // should we decode strings into buffers before passing to _write?
          // this is here so that some node-core streams can optimize string
          // handling at a lower level.

          var noDecode = options.decodeStrings === false;
          this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
          // encoding is 'binary' so we have to make this configurable.
          // Everything else in the universe uses 'utf8', though.

          this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
          // of how much we're waiting to get pushed to some underlying
          // socket or file.

          this.length = 0; // a flag to see when we're in the middle of a write.

          this.writing = false; // when true all writes will be buffered until .uncork() call

          this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
          // or on a later tick.  We set this to true at first, because any
          // actions that shouldn't happen until "later" should generally also
          // not happen before the first write call.

          this.sync = true; // a flag to know if we're processing previously buffered items, which
          // may call the _write() callback in the same tick, so that we don't
          // end up in an overlapped onwrite situation.

          this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

          this.onwrite = function (er) {
            onwrite(stream, er);
          }; // the callback that the user supplies to write(chunk,encoding,cb)


          this.writecb = null; // the amount that is being written when _write is called.

          this.writelen = 0;
          this.bufferedRequest = null;
          this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
          // this must be 0 before 'finish' can be emitted

          this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
          // This is relevant for synchronous Transform streams

          this.prefinished = false; // True if the error was already emitted and should not be thrown again

          this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

          this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

          this.autoDestroy = !!options.autoDestroy; // count buffered requests

          this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
          // one allocated and free to use, and we maintain at most two

          this.corkedRequestsFree = new CorkedRequest(this);
        }

        WritableState.prototype.getBuffer = function getBuffer() {
          var current = this.bufferedRequest;
          var out = [];

          while (current) {
            out.push(current);
            current = current.next;
          }

          return out;
        };

        (function () {
          try {
            Object.defineProperty(WritableState.prototype, 'buffer', {
              get: internalUtil.deprecate(function writableStateBufferGetter() {
                return this.getBuffer();
              }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
            });
          } catch (_) { }
        })(); // Test _writableState for inheritance to account for Duplex streams,
        // whose prototype chain only points to Readable.


        var realHasInstance;

        if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
          realHasInstance = Function.prototype[Symbol.hasInstance];
          Object.defineProperty(Writable, Symbol.hasInstance, {
            value: function value(object) {
              if (realHasInstance.call(this, object)) return true;
              if (this !== Writable) return false;
              return object && object._writableState instanceof WritableState;
            }
          });
        } else {
          realHasInstance = function realHasInstance(object) {
            return object instanceof this;
          };
        }

        function Writable(options) {
          Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
          // `realHasInstance` is necessary because using plain `instanceof`
          // would return false, as no `_writableState` property is attached.
          // Trying to use the custom `instanceof` for Writable here will also break the
          // Node.js LazyTransform implementation, which has a non-trivial getter for
          // `_writableState` that would lead to infinite recursion.
          // Checking for a Stream.Duplex instance is faster here instead of inside
          // the WritableState constructor, at least with V8 6.5

          var isDuplex = this instanceof Duplex;
          if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
          this._writableState = new WritableState(options, this, isDuplex); // legacy.

          this.writable = true;

          if (options) {
            if (typeof options.write === 'function') this._write = options.write;
            if (typeof options.writev === 'function') this._writev = options.writev;
            if (typeof options.destroy === 'function') this._destroy = options.destroy;
            if (typeof options.final === 'function') this._final = options.final;
          }

          Stream.call(this);
        } // Otherwise people can pipe Writable streams, which is just wrong.


        Writable.prototype.pipe = function () {
          errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
        };

        function writeAfterEnd(stream, cb) {
          var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

          errorOrDestroy(stream, er);
          process.nextTick(cb, er);
        } // Checks that a user-supplied chunk is valid, especially for the particular
        // mode the stream is in. Currently this means that `null` is never accepted
        // and undefined/non-string values are only allowed in object mode.


        function validChunk(stream, state, chunk, cb) {
          var er;

          if (chunk === null) {
            er = new ERR_STREAM_NULL_VALUES();
          } else if (typeof chunk !== 'string' && !state.objectMode) {
            er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
          }

          if (er) {
            errorOrDestroy(stream, er);
            process.nextTick(cb, er);
            return false;
          }

          return true;
        }

        Writable.prototype.write = function (chunk, encoding, cb) {
          var state = this._writableState;
          var ret = false;

          var isBuf = !state.objectMode && _isUint8Array(chunk);

          if (isBuf && !Buffer.isBuffer(chunk)) {
            chunk = _uint8ArrayToBuffer(chunk);
          }

          if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
          }

          if (isBuf) encoding = 'buffer'; else if (!encoding) encoding = state.defaultEncoding;
          if (typeof cb !== 'function') cb = nop;
          if (state.ending) writeAfterEnd(this, cb); else if (isBuf || validChunk(this, state, chunk, cb)) {
            state.pendingcb++;
            ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
          }
          return ret;
        };

        Writable.prototype.cork = function () {
          this._writableState.corked++;
        };

        Writable.prototype.uncork = function () {
          var state = this._writableState;

          if (state.corked) {
            state.corked--;
            if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
          }
        };

        Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
          // node::ParseEncoding() requires lower case.
          if (typeof encoding === 'string') encoding = encoding.toLowerCase();
          if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
          this._writableState.defaultEncoding = encoding;
          return this;
        };

        Object.defineProperty(Writable.prototype, 'writableBuffer', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._writableState && this._writableState.getBuffer();
          }
        });

        function decodeChunk(state, chunk, encoding) {
          if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
            chunk = Buffer.from(chunk, encoding);
          }

          return chunk;
        }

        Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._writableState.highWaterMark;
          }
        }); // if we're already writing something, then just put this
        // in the queue, and wait our turn.  Otherwise, call _write
        // If we return false, then we need a drain event, so set that flag.

        function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
          if (!isBuf) {
            var newChunk = decodeChunk(state, chunk, encoding);

            if (chunk !== newChunk) {
              isBuf = true;
              encoding = 'buffer';
              chunk = newChunk;
            }
          }

          var len = state.objectMode ? 1 : chunk.length;
          state.length += len;
          var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

          if (!ret) state.needDrain = true;

          if (state.writing || state.corked) {
            var last = state.lastBufferedRequest;
            state.lastBufferedRequest = {
              chunk: chunk,
              encoding: encoding,
              isBuf: isBuf,
              callback: cb,
              next: null
            };

            if (last) {
              last.next = state.lastBufferedRequest;
            } else {
              state.bufferedRequest = state.lastBufferedRequest;
            }

            state.bufferedRequestCount += 1;
          } else {
            doWrite(stream, state, false, len, chunk, encoding, cb);
          }

          return ret;
        }

        function doWrite(stream, state, writev, len, chunk, encoding, cb) {
          state.writelen = len;
          state.writecb = cb;
          state.writing = true;
          state.sync = true;
          if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write')); else if (writev) stream._writev(chunk, state.onwrite); else stream._write(chunk, encoding, state.onwrite);
          state.sync = false;
        }

        function onwriteError(stream, state, sync, er, cb) {
          --state.pendingcb;

          if (sync) {
            // defer the callback if we are being called synchronously
            // to avoid piling up things on the stack
            process.nextTick(cb, er); // this can emit finish, and it will always happen
            // after error

            process.nextTick(finishMaybe, stream, state);
            stream._writableState.errorEmitted = true;
            errorOrDestroy(stream, er);
          } else {
            // the caller expect this to happen before if
            // it is async
            cb(er);
            stream._writableState.errorEmitted = true;
            errorOrDestroy(stream, er); // this can emit finish, but finish must
            // always follow error

            finishMaybe(stream, state);
          }
        }

        function onwriteStateUpdate(state) {
          state.writing = false;
          state.writecb = null;
          state.length -= state.writelen;
          state.writelen = 0;
        }

        function onwrite(stream, er) {
          var state = stream._writableState;
          var sync = state.sync;
          var cb = state.writecb;
          if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
          onwriteStateUpdate(state);
          if (er) onwriteError(stream, state, sync, er, cb); else {
            // Check if we're actually ready to finish, but don't emit yet
            var finished = needFinish(state) || stream.destroyed;

            if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
              clearBuffer(stream, state);
            }

            if (sync) {
              process.nextTick(afterWrite, stream, state, finished, cb);
            } else {
              afterWrite(stream, state, finished, cb);
            }
          }
        }

        function afterWrite(stream, state, finished, cb) {
          if (!finished) onwriteDrain(stream, state);
          state.pendingcb--;
          cb();
          finishMaybe(stream, state);
        } // Must force callback to be called on nextTick, so that we don't
        // emit 'drain' before the write() consumer gets the 'false' return
        // value, and has a chance to attach a 'drain' listener.


        function onwriteDrain(stream, state) {
          if (state.length === 0 && state.needDrain) {
            state.needDrain = false;
            stream.emit('drain');
          }
        } // if there's something in the buffer waiting, then process it


        function clearBuffer(stream, state) {
          state.bufferProcessing = true;
          var entry = state.bufferedRequest;

          if (stream._writev && entry && entry.next) {
            // Fast case, write everything using _writev()
            var l = state.bufferedRequestCount;
            var buffer = new Array(l);
            var holder = state.corkedRequestsFree;
            holder.entry = entry;
            var count = 0;
            var allBuffers = true;

            while (entry) {
              buffer[count] = entry;
              if (!entry.isBuf) allBuffers = false;
              entry = entry.next;
              count += 1;
            }

            buffer.allBuffers = allBuffers;
            doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
            // as the hot path ends with doWrite

            state.pendingcb++;
            state.lastBufferedRequest = null;

            if (holder.next) {
              state.corkedRequestsFree = holder.next;
              holder.next = null;
            } else {
              state.corkedRequestsFree = new CorkedRequest(state);
            }

            state.bufferedRequestCount = 0;
          } else {
            // Slow case, write chunks one-by-one
            while (entry) {
              var chunk = entry.chunk;
              var encoding = entry.encoding;
              var cb = entry.callback;
              var len = state.objectMode ? 1 : chunk.length;
              doWrite(stream, state, false, len, chunk, encoding, cb);
              entry = entry.next;
              state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
              // it means that we need to wait until it does.
              // also, that means that the chunk and cb are currently
              // being processed, so move the buffer counter past them.

              if (state.writing) {
                break;
              }
            }

            if (entry === null) state.lastBufferedRequest = null;
          }

          state.bufferedRequest = entry;
          state.bufferProcessing = false;
        }

        Writable.prototype._write = function (chunk, encoding, cb) {
          cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
        };

        Writable.prototype._writev = null;

        Writable.prototype.end = function (chunk, encoding, cb) {
          var state = this._writableState;

          if (typeof chunk === 'function') {
            cb = chunk;
            chunk = null;
            encoding = null;
          } else if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
          }

          if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

          if (state.corked) {
            state.corked = 1;
            this.uncork();
          } // ignore unnecessary end() calls.


          if (!state.ending) endWritable(this, state, cb);
          return this;
        };

        Object.defineProperty(Writable.prototype, 'writableLength', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._writableState.length;
          }
        });

        function needFinish(state) {
          return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
        }

        function callFinal(stream, state) {
          stream._final(function (err) {
            state.pendingcb--;

            if (err) {
              errorOrDestroy(stream, err);
            }

            state.prefinished = true;
            stream.emit('prefinish');
            finishMaybe(stream, state);
          });
        }

        function prefinish(stream, state) {
          if (!state.prefinished && !state.finalCalled) {
            if (typeof stream._final === 'function' && !state.destroyed) {
              state.pendingcb++;
              state.finalCalled = true;
              process.nextTick(callFinal, stream, state);
            } else {
              state.prefinished = true;
              stream.emit('prefinish');
            }
          }
        }

        function finishMaybe(stream, state) {
          var need = needFinish(state);

          if (need) {
            prefinish(stream, state);

            if (state.pendingcb === 0) {
              state.finished = true;
              stream.emit('finish');

              if (state.autoDestroy) {
                // In case of duplex streams we need a way to detect
                // if the readable side is ready for autoDestroy as well
                var rState = stream._readableState;

                if (!rState || rState.autoDestroy && rState.endEmitted) {
                  stream.destroy();
                }
              }
            }
          }

          return need;
        }

        function endWritable(stream, state, cb) {
          state.ending = true;
          finishMaybe(stream, state);

          if (cb) {
            if (state.finished) process.nextTick(cb); else stream.once('finish', cb);
          }

          state.ended = true;
          stream.writable = false;
        }

        function onCorkedFinish(corkReq, state, err) {
          var entry = corkReq.entry;
          corkReq.entry = null;

          while (entry) {
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
          } // reuse the free corkReq.


          state.corkedRequestsFree.next = corkReq;
        }

        Object.defineProperty(Writable.prototype, 'destroyed', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            if (this._writableState === undefined) {
              return false;
            }

            return this._writableState.destroyed;
          },
          set: function set(value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._writableState) {
              return;
            } // backward compatibility, the user is explicitly
            // managing destroyed


            this._writableState.destroyed = value;
          }
        });
        Writable.prototype.destroy = destroyImpl.destroy;
        Writable.prototype._undestroy = destroyImpl.undestroy;

        Writable.prototype._destroy = function (err, cb) {
          cb(err);
        };
      }).call(this)
    }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  }, { "../errors": 55, "./_stream_duplex": 56, "./internal/streams/destroy": 63, "./internal/streams/state": 67, "./internal/streams/stream": 68, "_process": 35, "buffer": 21, "inherits": 28, "util-deprecate": 72 }], 61: [function (require, module, exports) {
    (function (process) {
      (function () {
        'use strict';

        var _Object$setPrototypeO;

        function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

        var finished = require('./end-of-stream');

        var kLastResolve = Symbol('lastResolve');
        var kLastReject = Symbol('lastReject');
        var kError = Symbol('error');
        var kEnded = Symbol('ended');
        var kLastPromise = Symbol('lastPromise');
        var kHandlePromise = Symbol('handlePromise');
        var kStream = Symbol('stream');

        function createIterResult(value, done) {
          return {
            value: value,
            done: done
          };
        }

        function readAndResolve(iter) {
          var resolve = iter[kLastResolve];

          if (resolve !== null) {
            var data = iter[kStream].read(); // we defer if data is null
            // we can be expecting either 'end' or
            // 'error'

            if (data !== null) {
              iter[kLastPromise] = null;
              iter[kLastResolve] = null;
              iter[kLastReject] = null;
              resolve(createIterResult(data, false));
            }
          }
        }

        function onReadable(iter) {
          // we wait for the next tick, because it might
          // emit an error with process.nextTick
          process.nextTick(readAndResolve, iter);
        }

        function wrapForNext(lastPromise, iter) {
          return function (resolve, reject) {
            lastPromise.then(function () {
              if (iter[kEnded]) {
                resolve(createIterResult(undefined, true));
                return;
              }

              iter[kHandlePromise](resolve, reject);
            }, reject);
          };
        }

        var AsyncIteratorPrototype = Object.getPrototypeOf(function () { });
        var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
          get stream() {
            return this[kStream];
          },

          next: function next() {
            var _this = this;

            // if we have detected an error in the meanwhile
            // reject straight away
            var error = this[kError];

            if (error !== null) {
              return Promise.reject(error);
            }

            if (this[kEnded]) {
              return Promise.resolve(createIterResult(undefined, true));
            }

            if (this[kStream].destroyed) {
              // We need to defer via nextTick because if .destroy(err) is
              // called, the error will be emitted via nextTick, and
              // we cannot guarantee that there is no error lingering around
              // waiting to be emitted.
              return new Promise(function (resolve, reject) {
                process.nextTick(function () {
                  if (_this[kError]) {
                    reject(_this[kError]);
                  } else {
                    resolve(createIterResult(undefined, true));
                  }
                });
              });
            } // if we have multiple next() calls
            // we will wait for the previous Promise to finish
            // this logic is optimized to support for await loops,
            // where next() is only called once at a time


            var lastPromise = this[kLastPromise];
            var promise;

            if (lastPromise) {
              promise = new Promise(wrapForNext(lastPromise, this));
            } else {
              // fast path needed to support multiple this.push()
              // without triggering the next() queue
              var data = this[kStream].read();

              if (data !== null) {
                return Promise.resolve(createIterResult(data, false));
              }

              promise = new Promise(this[kHandlePromise]);
            }

            this[kLastPromise] = promise;
            return promise;
          }
        }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
          return this;
        }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
          var _this2 = this;

          // destroy(err, cb) is a private API
          // we can guarantee we have that here, because we control the
          // Readable class this is attached to
          return new Promise(function (resolve, reject) {
            _this2[kStream].destroy(null, function (err) {
              if (err) {
                reject(err);
                return;
              }

              resolve(createIterResult(undefined, true));
            });
          });
        }), _Object$setPrototypeO), AsyncIteratorPrototype);

        var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
          var _Object$create;

          var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
            value: stream,
            writable: true
          }), _defineProperty(_Object$create, kLastResolve, {
            value: null,
            writable: true
          }), _defineProperty(_Object$create, kLastReject, {
            value: null,
            writable: true
          }), _defineProperty(_Object$create, kError, {
            value: null,
            writable: true
          }), _defineProperty(_Object$create, kEnded, {
            value: stream._readableState.endEmitted,
            writable: true
          }), _defineProperty(_Object$create, kHandlePromise, {
            value: function value(resolve, reject) {
              var data = iterator[kStream].read();

              if (data) {
                iterator[kLastPromise] = null;
                iterator[kLastResolve] = null;
                iterator[kLastReject] = null;
                resolve(createIterResult(data, false));
              } else {
                iterator[kLastResolve] = resolve;
                iterator[kLastReject] = reject;
              }
            },
            writable: true
          }), _Object$create));
          iterator[kLastPromise] = null;
          finished(stream, function (err) {
            if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
              var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
              // returned by next() and store the error

              if (reject !== null) {
                iterator[kLastPromise] = null;
                iterator[kLastResolve] = null;
                iterator[kLastReject] = null;
                reject(err);
              }

              iterator[kError] = err;
              return;
            }

            var resolve = iterator[kLastResolve];

            if (resolve !== null) {
              iterator[kLastPromise] = null;
              iterator[kLastResolve] = null;
              iterator[kLastReject] = null;
              resolve(createIterResult(undefined, true));
            }

            iterator[kEnded] = true;
          });
          stream.on('readable', onReadable.bind(null, iterator));
          return iterator;
        };

        module.exports = createReadableStreamAsyncIterator;
      }).call(this)
    }).call(this, require('_process'))

  }, { "./end-of-stream": 64, "_process": 35 }], 62: [function (require, module, exports) {
    'use strict';

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

    var _require = require('buffer'),
      Buffer = _require.Buffer;

    var _require2 = require('util'),
      inspect = _require2.inspect;

    var custom = inspect && inspect.custom || 'inspect';

    function copyBuffer(src, target, offset) {
      Buffer.prototype.copy.call(src, target, offset);
    }

    module.exports =
      /*#__PURE__*/
      function () {
        function BufferList() {
          _classCallCheck(this, BufferList);

          this.head = null;
          this.tail = null;
          this.length = 0;
        }

        _createClass(BufferList, [{
          key: "push",
          value: function push(v) {
            var entry = {
              data: v,
              next: null
            };
            if (this.length > 0) this.tail.next = entry; else this.head = entry;
            this.tail = entry;
            ++this.length;
          }
        }, {
          key: "unshift",
          value: function unshift(v) {
            var entry = {
              data: v,
              next: this.head
            };
            if (this.length === 0) this.tail = entry;
            this.head = entry;
            ++this.length;
          }
        }, {
          key: "shift",
          value: function shift() {
            if (this.length === 0) return;
            var ret = this.head.data;
            if (this.length === 1) this.head = this.tail = null; else this.head = this.head.next;
            --this.length;
            return ret;
          }
        }, {
          key: "clear",
          value: function clear() {
            this.head = this.tail = null;
            this.length = 0;
          }
        }, {
          key: "join",
          value: function join(s) {
            if (this.length === 0) return '';
            var p = this.head;
            var ret = '' + p.data;

            while (p = p.next) {
              ret += s + p.data;
            }

            return ret;
          }
        }, {
          key: "concat",
          value: function concat(n) {
            if (this.length === 0) return Buffer.alloc(0);
            var ret = Buffer.allocUnsafe(n >>> 0);
            var p = this.head;
            var i = 0;

            while (p) {
              copyBuffer(p.data, ret, i);
              i += p.data.length;
              p = p.next;
            }

            return ret;
          } // Consumes a specified amount of bytes or characters from the buffered data.

        }, {
          key: "consume",
          value: function consume(n, hasStrings) {
            var ret;

            if (n < this.head.data.length) {
              // `slice` is the same for buffers and strings.
              ret = this.head.data.slice(0, n);
              this.head.data = this.head.data.slice(n);
            } else if (n === this.head.data.length) {
              // First chunk is a perfect match.
              ret = this.shift();
            } else {
              // Result spans more than one buffer.
              ret = hasStrings ? this._getString(n) : this._getBuffer(n);
            }

            return ret;
          }
        }, {
          key: "first",
          value: function first() {
            return this.head.data;
          } // Consumes a specified amount of characters from the buffered data.

        }, {
          key: "_getString",
          value: function _getString(n) {
            var p = this.head;
            var c = 1;
            var ret = p.data;
            n -= ret.length;

            while (p = p.next) {
              var str = p.data;
              var nb = n > str.length ? str.length : n;
              if (nb === str.length) ret += str; else ret += str.slice(0, n);
              n -= nb;

              if (n === 0) {
                if (nb === str.length) {
                  ++c;
                  if (p.next) this.head = p.next; else this.head = this.tail = null;
                } else {
                  this.head = p;
                  p.data = str.slice(nb);
                }

                break;
              }

              ++c;
            }

            this.length -= c;
            return ret;
          } // Consumes a specified amount of bytes from the buffered data.

        }, {
          key: "_getBuffer",
          value: function _getBuffer(n) {
            var ret = Buffer.allocUnsafe(n);
            var p = this.head;
            var c = 1;
            p.data.copy(ret);
            n -= p.data.length;

            while (p = p.next) {
              var buf = p.data;
              var nb = n > buf.length ? buf.length : n;
              buf.copy(ret, ret.length - n, 0, nb);
              n -= nb;

              if (n === 0) {
                if (nb === buf.length) {
                  ++c;
                  if (p.next) this.head = p.next; else this.head = this.tail = null;
                } else {
                  this.head = p;
                  p.data = buf.slice(nb);
                }

                break;
              }

              ++c;
            }

            this.length -= c;
            return ret;
          } // Make sure the linked list only shows the minimal necessary information.

        }, {
          key: custom,
          value: function value(_, options) {
            return inspect(this, _objectSpread({}, options, {
              // Only inspect one level.
              depth: 0,
              // It should not recurse.
              customInspect: false
            }));
          }
        }]);

        return BufferList;
      }();
  }, { "buffer": 21, "util": 20 }], 63: [function (require, module, exports) {
    (function (process) {
      (function () {
        'use strict'; // undocumented cb() API, needed for core, not for public API

        function destroy(err, cb) {
          var _this = this;

          var readableDestroyed = this._readableState && this._readableState.destroyed;
          var writableDestroyed = this._writableState && this._writableState.destroyed;

          if (readableDestroyed || writableDestroyed) {
            if (cb) {
              cb(err);
            } else if (err) {
              if (!this._writableState) {
                process.nextTick(emitErrorNT, this, err);
              } else if (!this._writableState.errorEmitted) {
                this._writableState.errorEmitted = true;
                process.nextTick(emitErrorNT, this, err);
              }
            }

            return this;
          } // we set destroyed to true before firing error callbacks in order
          // to make it re-entrance safe in case destroy() is called within callbacks


          if (this._readableState) {
            this._readableState.destroyed = true;
          } // if this is a duplex stream mark the writable part as destroyed as well


          if (this._writableState) {
            this._writableState.destroyed = true;
          }

          this._destroy(err || null, function (err) {
            if (!cb && err) {
              if (!_this._writableState) {
                process.nextTick(emitErrorAndCloseNT, _this, err);
              } else if (!_this._writableState.errorEmitted) {
                _this._writableState.errorEmitted = true;
                process.nextTick(emitErrorAndCloseNT, _this, err);
              } else {
                process.nextTick(emitCloseNT, _this);
              }
            } else if (cb) {
              process.nextTick(emitCloseNT, _this);
              cb(err);
            } else {
              process.nextTick(emitCloseNT, _this);
            }
          });

          return this;
        }

        function emitErrorAndCloseNT(self, err) {
          emitErrorNT(self, err);
          emitCloseNT(self);
        }

        function emitCloseNT(self) {
          if (self._writableState && !self._writableState.emitClose) return;
          if (self._readableState && !self._readableState.emitClose) return;
          self.emit('close');
        }

        function undestroy() {
          if (this._readableState) {
            this._readableState.destroyed = false;
            this._readableState.reading = false;
            this._readableState.ended = false;
            this._readableState.endEmitted = false;
          }

          if (this._writableState) {
            this._writableState.destroyed = false;
            this._writableState.ended = false;
            this._writableState.ending = false;
            this._writableState.finalCalled = false;
            this._writableState.prefinished = false;
            this._writableState.finished = false;
            this._writableState.errorEmitted = false;
          }
        }

        function emitErrorNT(self, err) {
          self.emit('error', err);
        }

        function errorOrDestroy(stream, err) {
          // We have tests that rely on errors being emitted
          // in the same tick, so changing this is semver major.
          // For now when you opt-in to autoDestroy we allow
          // the error to be emitted nextTick. In a future
          // semver major update we should change the default to this.
          var rState = stream._readableState;
          var wState = stream._writableState;
          if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err); else stream.emit('error', err);
        }

        module.exports = {
          destroy: destroy,
          undestroy: undestroy,
          errorOrDestroy: errorOrDestroy
        };
      }).call(this)
    }).call(this, require('_process'))

  }, { "_process": 35 }], 64: [function (require, module, exports) {
    // Ported from https://github.com/mafintosh/end-of-stream with
    // permission from the author, Mathias Buus (@mafintosh).
    'use strict';

    var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

    function once(callback) {
      var called = false;
      return function () {
        if (called) return;
        called = true;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        callback.apply(this, args);
      };
    }

    function noop() { }

    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === 'function';
    }

    function eos(stream, opts, callback) {
      if (typeof opts === 'function') return eos(stream, null, opts);
      if (!opts) opts = {};
      callback = once(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;

      var onlegacyfinish = function onlegacyfinish() {
        if (!stream.writable) onfinish();
      };

      var writableEnded = stream._writableState && stream._writableState.finished;

      var onfinish = function onfinish() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
      };

      var readableEnded = stream._readableState && stream._readableState.endEmitted;

      var onend = function onend() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
      };

      var onerror = function onerror(err) {
        callback.call(stream, err);
      };

      var onclose = function onclose() {
        var err;

        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }

        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };

      var onrequest = function onrequest() {
        stream.req.on('finish', onfinish);
      };

      if (isRequest(stream)) {
        stream.on('complete', onfinish);
        stream.on('abort', onclose);
        if (stream.req) onrequest(); else stream.on('request', onrequest);
      } else if (writable && !stream._writableState) {
        // legacy streams
        stream.on('end', onlegacyfinish);
        stream.on('close', onlegacyfinish);
      }

      stream.on('end', onend);
      stream.on('finish', onfinish);
      if (opts.error !== false) stream.on('error', onerror);
      stream.on('close', onclose);
      return function () {
        stream.removeListener('complete', onfinish);
        stream.removeListener('abort', onclose);
        stream.removeListener('request', onrequest);
        if (stream.req) stream.req.removeListener('finish', onfinish);
        stream.removeListener('end', onlegacyfinish);
        stream.removeListener('close', onlegacyfinish);
        stream.removeListener('finish', onfinish);
        stream.removeListener('end', onend);
        stream.removeListener('error', onerror);
        stream.removeListener('close', onclose);
      };
    }

    module.exports = eos;
  }, { "../../../errors": 55 }], 65: [function (require, module, exports) {
    module.exports = function () {
      throw new Error('Readable.from is not available in the browser')
    };

  }, {}], 66: [function (require, module, exports) {
    // Ported from https://github.com/mafintosh/pump with
    // permission from the author, Mathias Buus (@mafintosh).
    'use strict';

    var eos;

    function once(callback) {
      var called = false;
      return function () {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }

    var _require$codes = require('../../../errors').codes,
      ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
      ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

    function noop(err) {
      // Rethrow the error if it exists to avoid swallowing it
      if (err) throw err;
    }

    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === 'function';
    }

    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on('close', function () {
        closed = true;
      });
      if (eos === undefined) eos = require('./end-of-stream');
      eos(stream, {
        readable: reading,
        writable: writing
      }, function (err) {
        if (err) return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function (err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true; // request.destroy just do .end - .abort is what we want

        if (isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === 'function') return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED('pipe'));
      };
    }

    function call(fn) {
      fn();
    }

    function pipe(from, to) {
      return from.pipe(to);
    }

    function popCallback(streams) {
      if (!streams.length) return noop;
      if (typeof streams[streams.length - 1] !== 'function') return noop;
      return streams.pop();
    }

    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }

      var callback = popCallback(streams);
      if (Array.isArray(streams[0])) streams = streams[0];

      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS('streams');
      }

      var error;
      var destroys = streams.map(function (stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function (err) {
          if (!error) error = err;
          if (err) destroys.forEach(call);
          if (reading) return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }

    module.exports = pipeline;
  }, { "../../../errors": 55, "./end-of-stream": 64 }], 67: [function (require, module, exports) {
    'use strict';

    var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }

    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : 'highWaterMark';
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }

        return Math.floor(hwm);
      } // Default value


      return state.objectMode ? 16 : 16 * 1024;
    }

    module.exports = {
      getHighWaterMark: getHighWaterMark
    };
  }, { "../../../errors": 55 }], 68: [function (require, module, exports) {
    arguments[4][15][0].apply(exports, arguments)
  }, { "dup": 15, "events": 22 }], 69: [function (require, module, exports) {
    exports = module.exports = require('./lib/_stream_readable.js');
    exports.Stream = exports;
    exports.Readable = exports;
    exports.Writable = require('./lib/_stream_writable.js');
    exports.Duplex = require('./lib/_stream_duplex.js');
    exports.Transform = require('./lib/_stream_transform.js');
    exports.PassThrough = require('./lib/_stream_passthrough.js');
    exports.finished = require('./lib/internal/streams/end-of-stream.js');
    exports.pipeline = require('./lib/internal/streams/pipeline.js');

  }, { "./lib/_stream_duplex.js": 56, "./lib/_stream_passthrough.js": 57, "./lib/_stream_readable.js": 58, "./lib/_stream_transform.js": 59, "./lib/_stream_writable.js": 60, "./lib/internal/streams/end-of-stream.js": 64, "./lib/internal/streams/pipeline.js": 66 }], 70: [function (require, module, exports) {
    const { Transform } = require('readable-stream')

    function inherits(fn, sup) {
      fn.super_ = sup
      fn.prototype = Object.create(sup.prototype, {
        constructor: { value: fn, enumerable: false, writable: true, configurable: true }
      })
    }

    // create a new export function, used by both the main export and
    // the .ctor export, contains common logic for dealing with arguments
    function through2(construct) {
      return (options, transform, flush) => {
        if (typeof options === 'function') {
          flush = transform
          transform = options
          options = {}
        }

        if (typeof transform !== 'function') {
          // noop
          transform = (chunk, enc, cb) => cb(null, chunk)
        }

        if (typeof flush !== 'function') {
          flush = null
        }

        return construct(options, transform, flush)
      }
    }

    // main export, just make me a transform stream!
    const make = through2((options, transform, flush) => {
      const t2 = new Transform(options)

      t2._transform = transform

      if (flush) {
        t2._flush = flush
      }

      return t2
    })

    // make me a reusable prototype that I can `new`, or implicitly `new`
    // with a constructor call
    const ctor = through2((options, transform, flush) => {
      function Through2(override) {
        if (!(this instanceof Through2)) {
          return new Through2(override)
        }

        this.options = Object.assign({}, options, override)

        Transform.call(this, this.options)

        this._transform = transform
        if (flush) {
          this._flush = flush
        }
      }

      inherits(Through2, Transform)

      return Through2
    })

    const obj = through2(function (options, transform, flush) {
      const t2 = new Transform(Object.assign({ objectMode: true, highWaterMark: 16 }, options))

      t2._transform = transform

      if (flush) {
        t2._flush = flush
      }

      return t2
    })

    module.exports = make
    module.exports.ctor = ctor
    module.exports.obj = obj

  }, { "readable-stream": 69 }], 71: [function (require, module, exports) {
    (function (setImmediate, clearImmediate) {
      (function () {
        var nextTick = require('process/browser.js').nextTick;
        var apply = Function.prototype.apply;
        var slice = Array.prototype.slice;
        var immediateIds = {};
        var nextImmediateId = 0;

        // DOM APIs, for completeness

        exports.setTimeout = function () {
          return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
        };
        exports.setInterval = function () {
          return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
        };
        exports.clearTimeout =
          exports.clearInterval = function (timeout) { timeout.close(); };

        function Timeout(id, clearFn) {
          this._id = id;
          this._clearFn = clearFn;
        }
        Timeout.prototype.unref = Timeout.prototype.ref = function () { };
        Timeout.prototype.close = function () {
          this._clearFn.call(window, this._id);
        };

        // Does not start the time, just sets up the members needed.
        exports.enroll = function (item, msecs) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = msecs;
        };

        exports.unenroll = function (item) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = -1;
        };

        exports._unrefActive = exports.active = function (item) {
          clearTimeout(item._idleTimeoutId);

          var msecs = item._idleTimeout;
          if (msecs >= 0) {
            item._idleTimeoutId = setTimeout(function onTimeout() {
              if (item._onTimeout)
                item._onTimeout();
            }, msecs);
          }
        };

        // That's not how node.js implements it but the exposed api is the same.
        exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
          var id = nextImmediateId++;
          var args = arguments.length < 2 ? false : slice.call(arguments, 1);

          immediateIds[id] = true;

          nextTick(function onNextTick() {
            if (immediateIds[id]) {
              // fn.call() is faster so we optimize for the common use-case
              // @see http://jsperf.com/call-apply-segu
              if (args) {
                fn.apply(null, args);
              } else {
                fn.call(null);
              }
              // Prevent ids from leaking
              exports.clearImmediate(id);
            }
          });

          return id;
        };

        exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
          delete immediateIds[id];
        };
      }).call(this)
    }).call(this, require("timers").setImmediate, require("timers").clearImmediate)

  }, { "process/browser.js": 35, "timers": 71 }], 72: [function (require, module, exports) {
    (function (global) {
      (function () {

        /**
         * Module exports.
         */

        module.exports = deprecate;

        /**
         * Mark that a method should not be used.
         * Returns a modified function which warns once by default.
         *
         * If `localStorage.noDeprecation = true` is set, then it is a no-op.
         *
         * If `localStorage.throwDeprecation = true` is set, then deprecated functions
         * will throw an Error when invoked.
         *
         * If `localStorage.traceDeprecation = true` is set, then deprecated functions
         * will invoke `console.trace()` instead of `console.error()`.
         *
         * @param {Function} fn - the function to deprecate
         * @param {String} msg - the string to print to the console when `fn` is invoked
         * @returns {Function} a new "deprecated" version of `fn`
         * @api public
         */

        function deprecate(fn, msg) {
          if (config('noDeprecation')) {
            return fn;
          }

          var warned = false;
          function deprecated() {
            if (!warned) {
              if (config('throwDeprecation')) {
                throw new Error(msg);
              } else if (config('traceDeprecation')) {
                console.trace(msg);
              } else {
                console.warn(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }

          return deprecated;
        }

        /**
         * Checks `localStorage` for boolean values for the given `name`.
         *
         * @param {String} name
         * @returns {Boolean}
         * @api private
         */

        function config(name) {
          // accessing global.localStorage can trigger a DOMException in sandboxed iframes
          try {
            if (!global.localStorage) return false;
          } catch (_) {
            return false;
          }
          var val = global.localStorage[name];
          if (null == val) return false;
          return String(val).toLowerCase() === 'true';
        }

      }).call(this)
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  }, {}], 73: [function (require, module, exports) {
    (function (global, factory) {
      if (typeof define === "function" && define.amd) {
        define("webextension-polyfill", ["module"], factory);
      } else if (typeof exports !== "undefined") {
        factory(module);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod);
        global.browser = mod.exports;
      }
    })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
      /* webextension-polyfill - v0.8.0 - Tue Apr 20 2021 11:27:38 */

      /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

      /* vim: set sts=2 sw=2 et tw=80: */

      /* This Source Code Form is subject to the terms of the Mozilla Public
       * License, v. 2.0. If a copy of the MPL was not distributed with this
       * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
      "use strict";

      if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
        const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
        const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
        // optimization for Firefox. Since Spidermonkey does not fully parse the
        // contents of a function until the first time it's called, and since it will
        // never actually need to be called, this allows the polyfill to be included
        // in Firefox nearly for free.

        const wrapAPIs = extensionAPIs => {
          // NOTE: apiMetadata is associated to the content of the api-metadata.json file
          // at build time by replacing the following "include" with the content of the
          // JSON file.
          const apiMetadata = {
            "alarms": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "clearAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "bookmarks": {
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getChildren": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getRecent": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getSubTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTree": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "browserAction": {
              "disable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "enable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "getBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getBadgeText": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "openPopup": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setBadgeText": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "browsingData": {
              "remove": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "removeCache": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCookies": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeDownloads": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFormData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeHistory": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeLocalStorage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePasswords": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePluginData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "settings": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "commands": {
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "contextMenus": {
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "cookies": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAllCookieStores": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "devtools": {
              "inspectedWindow": {
                "eval": {
                  "minArgs": 1,
                  "maxArgs": 2,
                  "singleCallbackArg": false
                }
              },
              "panels": {
                "create": {
                  "minArgs": 3,
                  "maxArgs": 3,
                  "singleCallbackArg": true
                },
                "elements": {
                  "createSidebarPane": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              }
            },
            "downloads": {
              "cancel": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "download": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "erase": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFileIcon": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "open": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "pause": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFile": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "resume": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "extension": {
              "isAllowedFileSchemeAccess": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "isAllowedIncognitoAccess": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "history": {
              "addUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "deleteRange": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getVisits": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "i18n": {
              "detectLanguage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAcceptLanguages": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "identity": {
              "launchWebAuthFlow": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "idle": {
              "queryState": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "management": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getSelf": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setEnabled": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "uninstallSelf": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "notifications": {
              "clear": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPermissionLevel": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "pageAction": {
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "hide": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "permissions": {
              "contains": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "request": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "runtime": {
              "getBackgroundPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPlatformInfo": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "openOptionsPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "requestUpdateCheck": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "sendMessage": {
                "minArgs": 1,
                "maxArgs": 3
              },
              "sendNativeMessage": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "setUninstallURL": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "sessions": {
              "getDevices": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getRecentlyClosed": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "restore": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "storage": {
              "local": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "managed": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "sync": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              }
            },
            "tabs": {
              "captureVisibleTab": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "detectLanguage": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "discard": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "duplicate": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "executeScript": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getZoom": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getZoomSettings": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goBack": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goForward": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "highlight": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "insertCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "query": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "reload": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "sendMessage": {
                "minArgs": 2,
                "maxArgs": 3
              },
              "setZoom": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "setZoomSettings": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "update": {
                "minArgs": 1,
                "maxArgs": 2
              }
            },
            "topSites": {
              "get": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "webNavigation": {
              "getAllFrames": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFrame": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "webRequest": {
              "handlerBehaviorChanged": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "windows": {
              "create": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getLastFocused": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            }
          };

          if (Object.keys(apiMetadata).length === 0) {
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          }
          /**
           * A WeakMap subclass which creates and stores a value for any key which does
           * not exist when accessed, but behaves exactly as an ordinary WeakMap
           * otherwise.
           *
           * @param {function} createItem
           *        A function which will be called in order to create the value for any
           *        key which does not exist, the first time it is accessed. The
           *        function receives, as its only argument, the key being created.
           */


          class DefaultWeakMap extends WeakMap {
            constructor(createItem, items = undefined) {
              super(items);
              this.createItem = createItem;
            }

            get(key) {
              if (!this.has(key)) {
                this.set(key, this.createItem(key));
              }

              return super.get(key);
            }

          }
          /**
           * Returns true if the given object is an object with a `then` method, and can
           * therefore be assumed to behave as a Promise.
           *
           * @param {*} value The value to test.
           * @returns {boolean} True if the value is thenable.
           */


          const isThenable = value => {
            return value && typeof value === "object" && typeof value.then === "function";
          };
          /**
           * Creates and returns a function which, when called, will resolve or reject
           * the given promise based on how it is called:
           *
           * - If, when called, `chrome.runtime.lastError` contains a non-null object,
           *   the promise is rejected with that value.
           * - If the function is called with exactly one argument, the promise is
           *   resolved to that value.
           * - Otherwise, the promise is resolved to an array containing all of the
           *   function's arguments.
           *
           * @param {object} promise
           *        An object containing the resolution and rejection functions of a
           *        promise.
           * @param {function} promise.resolve
           *        The promise's resolution function.
           * @param {function} promise.reject
           *        The promise's rejection function.
           * @param {object} metadata
           *        Metadata about the wrapped method which has created the callback.
           * @param {boolean} metadata.singleCallbackArg
           *        Whether or not the promise is resolved with only the first
           *        argument of the callback, alternatively an array of all the
           *        callback arguments is resolved. By default, if the callback
           *        function is invoked with only a single argument, that will be
           *        resolved to the promise, while all arguments will be resolved as
           *        an array if multiple are given.
           *
           * @returns {function}
           *        The generated callback function.
           */


          const makeCallback = (promise, metadata) => {
            return (...callbackArgs) => {
              if (extensionAPIs.runtime.lastError) {
                promise.reject(new Error(extensionAPIs.runtime.lastError.message));
              } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                promise.resolve(callbackArgs[0]);
              } else {
                promise.resolve(callbackArgs);
              }
            };
          };

          const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
          /**
           * Creates a wrapper function for a method with the given name and metadata.
           *
           * @param {string} name
           *        The name of the method which is being wrapped.
           * @param {object} metadata
           *        Metadata about the method being wrapped.
           * @param {integer} metadata.minArgs
           *        The minimum number of arguments which must be passed to the
           *        function. If called with fewer than this number of arguments, the
           *        wrapper will raise an exception.
           * @param {integer} metadata.maxArgs
           *        The maximum number of arguments which may be passed to the
           *        function. If called with more than this number of arguments, the
           *        wrapper will raise an exception.
           * @param {boolean} metadata.singleCallbackArg
           *        Whether or not the promise is resolved with only the first
           *        argument of the callback, alternatively an array of all the
           *        callback arguments is resolved. By default, if the callback
           *        function is invoked with only a single argument, that will be
           *        resolved to the promise, while all arguments will be resolved as
           *        an array if multiple are given.
           *
           * @returns {function(object, ...*)}
           *       The generated wrapper function.
           */


          const wrapAsyncFunction = (name, metadata) => {
            return function asyncFunctionWrapper(target, ...args) {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }

              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }

              return new Promise((resolve, reject) => {
                if (metadata.fallbackToNoCallback) {
                  // This API method has currently no callback on Chrome, but it return a promise on Firefox,
                  // and so the polyfill will try to call it with a callback first, and it will fallback
                  // to not passing the callback if the first call fails.
                  try {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  } catch (cbError) {
                    console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                    target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                    // use the unsupported callback anymore.

                    metadata.fallbackToNoCallback = false;
                    metadata.noCallback = true;
                    resolve();
                  }
                } else if (metadata.noCallback) {
                  target[name](...args);
                  resolve();
                } else {
                  target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                }
              });
            };
          };
          /**
           * Wraps an existing method of the target object, so that calls to it are
           * intercepted by the given wrapper function. The wrapper function receives,
           * as its first argument, the original `target` object, followed by each of
           * the arguments passed to the original method.
           *
           * @param {object} target
           *        The original target object that the wrapped method belongs to.
           * @param {function} method
           *        The method being wrapped. This is used as the target of the Proxy
           *        object which is created to wrap the method.
           * @param {function} wrapper
           *        The wrapper function which is called in place of a direct invocation
           *        of the wrapped method.
           *
           * @returns {Proxy<function>}
           *        A Proxy object for the given method, which invokes the given wrapper
           *        method in its place.
           */


          const wrapMethod = (target, method, wrapper) => {
            return new Proxy(method, {
              apply(targetMethod, thisObj, args) {
                return wrapper.call(thisObj, target, ...args);
              }

            });
          };

          let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
          /**
           * Wraps an object in a Proxy which intercepts and wraps certain methods
           * based on the given `wrappers` and `metadata` objects.
           *
           * @param {object} target
           *        The target object to wrap.
           *
           * @param {object} [wrappers = {}]
           *        An object tree containing wrapper functions for special cases. Any
           *        function present in this object tree is called in place of the
           *        method in the same location in the `target` object tree. These
           *        wrapper methods are invoked as described in {@see wrapMethod}.
           *
           * @param {object} [metadata = {}]
           *        An object tree containing metadata used to automatically generate
           *        Promise-based wrapper functions for asynchronous. Any function in
           *        the `target` object tree which has a corresponding metadata object
           *        in the same location in the `metadata` tree is replaced with an
           *        automatically-generated wrapper function, as described in
           *        {@see wrapAsyncFunction}
           *
           * @returns {Proxy<object>}
           */

          const wrapObject = (target, wrappers = {}, metadata = {}) => {
            let cache = Object.create(null);
            let handlers = {
              has(proxyTarget, prop) {
                return prop in target || prop in cache;
              },

              get(proxyTarget, prop, receiver) {
                if (prop in cache) {
                  return cache[prop];
                }

                if (!(prop in target)) {
                  return undefined;
                }

                let value = target[prop];

                if (typeof value === "function") {
                  // This is a method on the underlying object. Check if we need to do
                  // any wrapping.
                  if (typeof wrappers[prop] === "function") {
                    // We have a special-case wrapper for this method.
                    value = wrapMethod(target, target[prop], wrappers[prop]);
                  } else if (hasOwnProperty(metadata, prop)) {
                    // This is an async method that we have metadata for. Create a
                    // Promise wrapper for it.
                    let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                    value = wrapMethod(target, target[prop], wrapper);
                  } else {
                    // This is a method that we don't know or care about. Return the
                    // original method, bound to the underlying object.
                    value = value.bind(target);
                  }
                } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                  // This is an object that we need to do some wrapping for the children
                  // of. Create a sub-object wrapper for it with the appropriate child
                  // metadata.
                  value = wrapObject(value, wrappers[prop], metadata[prop]);
                } else if (hasOwnProperty(metadata, "*")) {
                  // Wrap all properties in * namespace.
                  value = wrapObject(value, wrappers[prop], metadata["*"]);
                } else {
                  // We don't need to do any wrapping for this property,
                  // so just forward all access to the underlying object.
                  Object.defineProperty(cache, prop, {
                    configurable: true,
                    enumerable: true,

                    get() {
                      return target[prop];
                    },

                    set(value) {
                      target[prop] = value;
                    }

                  });
                  return value;
                }

                cache[prop] = value;
                return value;
              },

              set(proxyTarget, prop, value, receiver) {
                if (prop in cache) {
                  cache[prop] = value;
                } else {
                  target[prop] = value;
                }

                return true;
              },

              defineProperty(proxyTarget, prop, desc) {
                return Reflect.defineProperty(cache, prop, desc);
              },

              deleteProperty(proxyTarget, prop) {
                return Reflect.deleteProperty(cache, prop);
              }

            }; // Per contract of the Proxy API, the "get" proxy handler must return the
            // original value of the target if that value is declared read-only and
            // non-configurable. For this reason, we create an object with the
            // prototype set to `target` instead of using `target` directly.
            // Otherwise we cannot return a custom object for APIs that
            // are declared read-only and non-configurable, such as `chrome.devtools`.
            //
            // The proxy handlers themselves will still use the original `target`
            // instead of the `proxyTarget`, so that the methods and properties are
            // dereferenced via the original targets.

            let proxyTarget = Object.create(target);
            return new Proxy(proxyTarget, handlers);
          };
          /**
           * Creates a set of wrapper functions for an event object, which handles
           * wrapping of listener functions that those messages are passed.
           *
           * A single wrapper is created for each listener function, and stored in a
           * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
           * retrieve the original wrapper, so that  attempts to remove a
           * previously-added listener work as expected.
           *
           * @param {DefaultWeakMap<function, function>} wrapperMap
           *        A DefaultWeakMap object which will create the appropriate wrapper
           *        for a given listener function when one does not exist, and retrieve
           *        an existing one when it does.
           *
           * @returns {object}
           */


          const wrapEvent = wrapperMap => ({
            addListener(target, listener, ...args) {
              target.addListener(wrapperMap.get(listener), ...args);
            },

            hasListener(target, listener) {
              return target.hasListener(wrapperMap.get(listener));
            },

            removeListener(target, listener) {
              target.removeListener(wrapperMap.get(listener));
            }

          });

          const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
            if (typeof listener !== "function") {
              return listener;
            }
            /**
             * Wraps an onRequestFinished listener function so that it will return a
             * `getContent()` property which returns a `Promise` rather than using a
             * callback API.
             *
             * @param {object} req
             *        The HAR entry object representing the network request.
             */


            return function onRequestFinished(req) {
              const wrappedReq = wrapObject(req, {}
                /* wrappers */
                , {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
              listener(wrappedReq);
            };
          }); // Keep track if the deprecation warning has been logged at least once.

          let loggedSendResponseDeprecationWarning = false;
          const onMessageWrappers = new DefaultWeakMap(listener => {
            if (typeof listener !== "function") {
              return listener;
            }
            /**
             * Wraps a message listener function so that it may send responses based on
             * its return value, rather than by returning a sentinel value and calling a
             * callback. If the listener function returns a Promise, the response is
             * sent when the promise either resolves or rejects.
             *
             * @param {*} message
             *        The message sent by the other end of the channel.
             * @param {object} sender
             *        Details about the sender of the message.
             * @param {function(*)} sendResponse
             *        A callback which, when called with an arbitrary argument, sends
             *        that value as a response.
             * @returns {boolean}
             *        True if the wrapped listener returned a Promise, which will later
             *        yield a response. False otherwise.
             */


            return function onMessage(message, sender, sendResponse) {
              let didCallSendResponse = false;
              let wrappedSendResponse;
              let sendResponsePromise = new Promise(resolve => {
                wrappedSendResponse = function (response) {
                  if (!loggedSendResponseDeprecationWarning) {
                    console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                    loggedSendResponseDeprecationWarning = true;
                  }

                  didCallSendResponse = true;
                  resolve(response);
                };
              });
              let result;

              try {
                result = listener(message, sender, wrappedSendResponse);
              } catch (err) {
                result = Promise.reject(err);
              }

              const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
              // wrappedSendResponse synchronously, we can exit earlier
              // because there will be no response sent from this listener.

              if (result !== true && !isResultThenable && !didCallSendResponse) {
                return false;
              } // A small helper to send the message if the promise resolves
              // and an error if the promise rejects (a wrapped sendMessage has
              // to translate the message into a resolved promise or a rejected
              // promise).


              const sendPromisedResult = promise => {
                promise.then(msg => {
                  // send the message value.
                  sendResponse(msg);
                }, error => {
                  // Send a JSON representation of the error if the rejected value
                  // is an instance of error, or the object itself otherwise.
                  let message;

                  if (error && (error instanceof Error || typeof error.message === "string")) {
                    message = error.message;
                  } else {
                    message = "An unexpected error occurred";
                  }

                  sendResponse({
                    __mozWebExtensionPolyfillReject__: true,
                    message
                  });
                }).catch(err => {
                  // Print an error on the console if unable to send the response.
                  console.error("Failed to send onMessage rejected reply", err);
                });
              }; // If the listener returned a Promise, send the resolved value as a
              // result, otherwise wait the promise related to the wrappedSendResponse
              // callback to resolve and send it as a response.


              if (isResultThenable) {
                sendPromisedResult(result);
              } else {
                sendPromisedResult(sendResponsePromise);
              } // Let Chrome know that the listener is replying.


              return true;
            };
          });

          const wrappedSendMessageCallback = ({
            reject,
            resolve
          }, reply) => {
            if (extensionAPIs.runtime.lastError) {
              // Detect when none of the listeners replied to the sendMessage call and resolve
              // the promise to undefined as in Firefox.
              // See https://github.com/mozilla/webextension-polyfill/issues/130
              if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                resolve();
              } else {
                reject(new Error(extensionAPIs.runtime.lastError.message));
              }
            } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
              // Convert back the JSON representation of the error into
              // an Error instance.
              reject(new Error(reply.message));
            } else {
              resolve(reply);
            }
          };

          const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
            if (args.length < metadata.minArgs) {
              throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            }

            if (args.length > metadata.maxArgs) {
              throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            }

            return new Promise((resolve, reject) => {
              const wrappedCb = wrappedSendMessageCallback.bind(null, {
                resolve,
                reject
              });
              args.push(wrappedCb);
              apiNamespaceObj.sendMessage(...args);
            });
          };

          const staticWrappers = {
            devtools: {
              network: {
                onRequestFinished: wrapEvent(onRequestFinishedWrappers)
              }
            },
            runtime: {
              onMessage: wrapEvent(onMessageWrappers),
              onMessageExternal: wrapEvent(onMessageWrappers),
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          };
          const settingMetadata = {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          };
          apiMetadata.privacy = {
            network: {
              "*": settingMetadata
            },
            services: {
              "*": settingMetadata
            },
            websites: {
              "*": settingMetadata
            }
          };
          return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
        };

        if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
          throw new Error("This script should only be loaded in a browser extension.");
        } // The build process adds a UMD wrapper around this file, which makes the
        // `module` variable available.


        module.exports = wrapAPIs(chrome);
      } else {
        module.exports = browser;
      }
    });


  }, {}], 74: [function (require, module, exports) {
    // Returns a wrapper function that returns a wrapped callback
    // The wrapper function should do some stuff, and return a
    // presumably different callback function.
    // This makes sure that own properties are retained, so that
    // decorations and such are not lost along the way.
    module.exports = wrappy
    function wrappy(fn, cb) {
      if (fn && cb) return wrappy(fn)(cb)

      if (typeof fn !== 'function')
        throw new TypeError('need wrapper function')

      Object.keys(fn).forEach(function (k) {
        wrapper[k] = fn[k]
      })

      return wrapper

      function wrapper() {
        var args = new Array(arguments.length)
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i]
        }
        var ret = fn.apply(this, args)
        var cb = args[args.length - 1]
        if (typeof ret === 'function' && ret !== cb) {
          Object.keys(cb).forEach(function (k) {
            ret[k] = cb[k]
          })
        }
        return ret
      }
    }

  }, {}], 75: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isManifestV3 = void 0;

    var _webextensionPolyfill = _interopRequireDefault(require("webextension-polyfill"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    const isManifestV3 = _webextensionPolyfill.default.runtime.getManifest().manifest_version === 3;
    exports.isManifestV3 = isManifestV3;

  }, { "webextension-polyfill": 73 }], 76: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = shouldInjectProvider;

    /**
     * Determines if the provider should be injected
     *
     * @returns {boolean} {@code true} Whether the provider should be injected
     */
    function shouldInjectProvider() {
      return doctypeCheck() && suffixCheck() && documentElementCheck() && !blockedDomainCheck();
    }
    /**
     * Checks the doctype of the current document if it exists
     *
     * @returns {boolean} {@code true} if the doctype is html or if none exists
     */


    function doctypeCheck() {
      const {
        doctype
      } = window.document;

      if (doctype) {
        return doctype.name === 'html';
      }

      return true;
    }
    /**
     * Returns whether or not the extension (suffix) of the current document is prohibited
     *
     * This checks {@code window.location.pathname} against a set of file extensions
     * that we should not inject the provider into. This check is indifferent of
     * query parameters in the location.
     *
     * @returns {boolean} whether or not the extension of the current document is prohibited
     */


    function suffixCheck() {
      const prohibitedTypes = [/\.xml$/u, /\.pdf$/u];
      const currentUrl = window.location.pathname;

      for (let i = 0; i < prohibitedTypes.length; i++) {
        if (prohibitedTypes[i].test(currentUrl)) {
          return false;
        }
      }

      return true;
    }
    /**
     * Checks the documentElement of the current document
     *
     * @returns {boolean} {@code true} if the documentElement is an html node or if none exists
     */


    function documentElementCheck() {
      const documentElement = document.documentElement.nodeName;

      if (documentElement) {
        return documentElement.toLowerCase() === 'html';
      }

      return true;
    }
    /**
     * Checks if the current domain is blocked
     *
     * @returns {boolean} {@code true} if the current domain is blocked
     */


    function blockedDomainCheck() {
      const blockedDomains = ['uscourts.gov', 'dropbox.com', 'webbyawards.com', 'cdn.shopify.com/s/javascripts/tricorder/xtld-read-only-frame.html', 'adyen.com', 'gravityforms.com', 'harbourair.com', 'ani.gamer.com.tw', 'blueskybooking.com', 'sharefile.com'];
      const currentUrl = window.location.href;
      let currentRegex;

      for (let i = 0; i < blockedDomains.length; i++) {
        const blockedDomain = blockedDomains[i].replace('.', '\\.');
        currentRegex = new RegExp(`(?:https?:\\/\\/)(?:(?!${blockedDomain}).)*$`, 'u');

        if (!currentRegex.test(currentUrl)) {
          return true;
        }
      }

      return false;
    }

  }, {}]
}, {}, [1])


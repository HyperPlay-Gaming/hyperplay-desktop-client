LavaPack.loadBundle([[54,{"@metamask/name-controller":1484,"@metamask/snaps-utils":2118,loglevel:3789},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.SnapsNameProvider=void 0;var r,i=e("@metamask/name-controller"),s=e("@metamask/snaps-utils"),a=(r=e("loglevel"))&&r.__esModule?r:{default:r};function o(e,t){c(e,t),t.add(e)}function c(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function u(e,t){return function(e,t){if(t.get)return t.get.call(e);return t.value}(e,h(e,t,"get"))}function l(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function d(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,h(e,t,"set"),n),n}function h(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}var p=new WeakMap,f=new WeakSet,g=new WeakSet;function m(){const e=u(this,p).call("PermissionController:getState").subjects;return u(this,p).call("SnapController:getAll").filter((({id:t})=>{var n;return null===(n=e[t])||void 0===n?void 0:n.permissions["endowment:name-lookup"]}))}async function y(e,t){const{variation:n,value:r}=t,i=e.id,o={chainId:`eip155:${parseInt(n,16)}`,address:r};let c,l;try{const t=await u(this,p).call("SnapController:handleRequest",{snapId:e.id,origin:"",handler:s.HandlerType.OnNameLookup,request:{jsonrpc:"2.0",method:" ",params:o}}),n=null==t?void 0:t.resolvedDomains;c=n?[...new Set(n.map((e=>e.resolvedDomain)))]:[]}catch(t){a.default.error("Snap name provider request failed",{snapId:e.id,request:o,error:t}),l=t}return{sourceId:i,result:{proposedNames:c,error:l}}}n.SnapsNameProvider=class{constructor({messenger:e}){o(this,g),o(this,f),function(e,t,n){c(e,t),t.set(e,n)}(this,p,{writable:!0,value:void 0}),d(this,p,e)}getMetadata(){const e=l(this,f,m).call(this);return{sourceIds:{[i.NameType.ETHEREUM_ADDRESS]:e.map((e=>e.id))},sourceLabels:e.reduce(((e,t)=>{const n=u(this,p).call("SnapController:get",t.id),r=null==n?void 0:n.manifest.proposedName;return{...e,[t.id]:r||t.id}}),{})}}async getProposedNames(e){const t=l(this,f,m).call(this);return{results:(await Promise.all(t.map((t=>l(this,g,y).call(this,t,e))))).reduce(((e,t)=>{const{sourceId:n,result:r}=t;return{...e,[n]:r}}),{})}}}}}},{package:"$root$",file:"app/scripts/lib/SnapsNameProvider.ts"}],[55,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){function r(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(n!==undefined){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(n,"__esModule",{value:!0}),n.WeakRefObjectMap=void 0;class i{constructor(){r(this,"map",void 0),this.map=new Map}set(e,t){const n={};for(const e in t){if(!Object.prototype.hasOwnProperty.call(t,e))continue;const r=t[e];if("object"!=typeof r||null===r)throw new Error(`Property ${String(e)} is not an object and cannot be weakly referenced.`);n[e]=new WeakRef(r)}return this.map.set(e,n),this}get(e){const t=this.map.get(e);if(!t)return undefined;const n={};for(const r in t){if(!Object.prototype.hasOwnProperty.call(t,r))continue;const i=t[r].deref();if(i===undefined)return this.map.delete(e),undefined;n[r]=i}return n}has(e){return this.get(e)!==undefined}delete(e){return this.get(e)!==undefined&&this.map.delete(e)}clear(){this.map.clear()}get size(){return this.map.size}entries(){const e=[];return this.map.forEach(((t,n)=>{const r=this.get(n);r!==undefined&&e.push([n,r])})),e.values()}keys(){return this.map.keys()}values(){const e=[];return this.map.forEach(((t,n)=>{const r=this.get(n);r!==undefined&&e.push(r)})),e.values()}[Symbol.iterator](){return this.entries()}get[Symbol.toStringTag](){return"WeakRefObjectMap"}forEach(e,t){this.map.forEach(((n,r)=>{const i=this.get(r);i!==undefined&&(t?e.call(t,i,r,this):e(i,r,this))}))}}n.WeakRefObjectMap=i}}},{package:"$root$",file:"app/scripts/lib/WeakRefObjectMap.ts"}],[554,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.version=void 0,n.version="wallet/5.7.0"}}},{package:"@ethersproject/wallet",file:"node_modules/@ethersproject/wallet/lib/_version.js"}],[555,{"./_version":554,"@ethersproject/abstract-provider":466,"@ethersproject/abstract-signer":468,"@ethersproject/address":470,"@ethersproject/bytes":479,"@ethersproject/hash":492,"@ethersproject/hdnode":497,"@ethersproject/json-wallets":500,"@ethersproject/keccak256":505,"@ethersproject/logger":507,"@ethersproject/properties":513,"@ethersproject/random":536,"@ethersproject/signing-key":546,"@ethersproject/transactions":553},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r,i=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),s=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function o(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}c((r=r.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var n,r,i,s,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(s){return function(o){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,o])}}};Object.defineProperty(n,"__esModule",{value:!0}),n.verifyTypedData=n.verifyMessage=n.Wallet=void 0;var o=e("@ethersproject/address"),c=e("@ethersproject/abstract-provider"),u=e("@ethersproject/abstract-signer"),l=e("@ethersproject/bytes"),d=e("@ethersproject/hash"),h=e("@ethersproject/hdnode"),p=e("@ethersproject/keccak256"),f=e("@ethersproject/properties"),g=e("@ethersproject/random"),m=e("@ethersproject/signing-key"),y=e("@ethersproject/json-wallets"),b=e("@ethersproject/transactions"),w=e("@ethersproject/logger"),v=e("./_version"),_=new w.Logger(v.version);var S=function(e){function t(t,n){var r,i=e.call(this)||this;if(null!=(r=t)&&(0,l.isHexString)(r.privateKey,32)&&null!=r.address){var s=new m.SigningKey(t.privateKey);if((0,f.defineReadOnly)(i,"_signingKey",(function(){return s})),(0,f.defineReadOnly)(i,"address",(0,b.computeAddress)(i.publicKey)),i.address!==(0,o.getAddress)(t.address)&&_.throwArgumentError("privateKey/address mismatch","privateKey","[REDACTED]"),function(e){var t=e.mnemonic;return t&&t.phrase}(t)){var a=t.mnemonic;(0,f.defineReadOnly)(i,"_mnemonic",(function(){return{phrase:a.phrase,path:a.path||h.defaultPath,locale:a.locale||"en"}}));var u=i.mnemonic,d=h.HDNode.fromMnemonic(u.phrase,null,u.locale).derivePath(u.path);(0,b.computeAddress)(d.privateKey)!==i.address&&_.throwArgumentError("mnemonic/address mismatch","privateKey","[REDACTED]")}else(0,f.defineReadOnly)(i,"_mnemonic",(function(){return null}))}else{if(m.SigningKey.isSigningKey(t))"secp256k1"!==t.curve&&_.throwArgumentError("unsupported curve; must be secp256k1","privateKey","[REDACTED]"),(0,f.defineReadOnly)(i,"_signingKey",(function(){return t}));else{"string"==typeof t&&t.match(/^[0-9a-f]*$/i)&&64===t.length&&(t="0x"+t);var p=new m.SigningKey(t);(0,f.defineReadOnly)(i,"_signingKey",(function(){return p}))}(0,f.defineReadOnly)(i,"_mnemonic",(function(){return null})),(0,f.defineReadOnly)(i,"address",(0,b.computeAddress)(i.publicKey))}return n&&!c.Provider.isProvider(n)&&_.throwArgumentError("invalid provider","provider",n),(0,f.defineReadOnly)(i,"provider",n||null),i}return i(t,e),Object.defineProperty(t.prototype,"mnemonic",{get:function(){return this._mnemonic()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"privateKey",{get:function(){return this._signingKey().privateKey},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"publicKey",{get:function(){return this._signingKey().publicKey},enumerable:!1,configurable:!0}),t.prototype.getAddress=function(){return Promise.resolve(this.address)},t.prototype.connect=function(e){return new t(this,e)},t.prototype.signTransaction=function(e){var t=this;return(0,f.resolveProperties)(e).then((function(n){null!=n.from&&((0,o.getAddress)(n.from)!==t.address&&_.throwArgumentError("transaction from address mismatch","transaction.from",e.from),delete n.from);var r=t._signingKey().signDigest((0,p.keccak256)((0,b.serialize)(n)));return(0,b.serialize)(n,r)}))},t.prototype.signMessage=function(e){return s(this,void 0,void 0,(function(){return a(this,(function(t){return[2,(0,l.joinSignature)(this._signingKey().signDigest((0,d.hashMessage)(e)))]}))}))},t.prototype._signTypedData=function(e,t,n){return s(this,void 0,void 0,(function(){var r,i=this;return a(this,(function(s){switch(s.label){case 0:return[4,d._TypedDataEncoder.resolveNames(e,t,n,(function(e){return null==i.provider&&_.throwError("cannot resolve ENS names without a provider",w.Logger.errors.UNSUPPORTED_OPERATION,{operation:"resolveName",value:e}),i.provider.resolveName(e)}))];case 1:return r=s.sent(),[2,(0,l.joinSignature)(this._signingKey().signDigest(d._TypedDataEncoder.hash(r.domain,t,r.value)))]}}))}))},t.prototype.encrypt=function(e,t,n){if("function"!=typeof t||n||(n=t,t={}),n&&"function"!=typeof n)throw new Error("invalid callback");return t||(t={}),(0,y.encryptKeystore)(this,e,t,n)},t.createRandom=function(e){var n=(0,g.randomBytes)(16);e||(e={}),e.extraEntropy&&(n=(0,l.arrayify)((0,l.hexDataSlice)((0,p.keccak256)((0,l.concat)([n,e.extraEntropy])),0,16)));var r=(0,h.entropyToMnemonic)(n,e.locale);return t.fromMnemonic(r,e.path,e.locale)},t.fromEncryptedJson=function(e,n,r){return(0,y.decryptJsonWallet)(e,n,r).then((function(e){return new t(e)}))},t.fromEncryptedJsonSync=function(e,n){return new t((0,y.decryptJsonWalletSync)(e,n))},t.fromMnemonic=function(e,n,r){return n||(n=h.defaultPath),new t(h.HDNode.fromMnemonic(e,null,r).derivePath(n))},t}(u.Signer);n.Wallet=S,n.verifyMessage=function(e,t){return(0,b.recoverAddress)((0,d.hashMessage)(e),t)},n.verifyTypedData=function(e,t,n,r){return(0,b.recoverAddress)(d._TypedDataEncoder.hash(e,t,n),r)}}}},{package:"@ethersproject/wallet",file:"node_modules/@ethersproject/wallet/lib/index.js"}],[56,{"../../../shared/constants/network":4436,"../constants/contracts":5,"./util":119,"@ethersproject/contracts":486,"@ethersproject/providers":524,"@metamask/eth-query":1271,"@metamask/obs-store":1565,lodash:3783,loglevel:3789,pify:3919,"single-call-balance-checker-abi":4275,uuid:4354},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=g(e("@metamask/eth-query")),i=e("uuid"),s=e("@metamask/obs-store"),a=g(e("loglevel")),o=g(e("pify")),c=e("@ethersproject/providers"),u=e("@ethersproject/contracts"),l=g(e("single-call-balance-checker-abi")),d=e("lodash"),h=e("../../../shared/constants/network"),p=e("../constants/contracts"),f=e("./util");function g(e){return e&&e.__esModule?e:{default:e}}function m(e,t){b(e,t),t.add(e)}function y(e,t,n){b(e,t),t.set(e,n)}function b(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function w(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function v(e,t){return function(e,t){if(t.get)return t.get.call(e);return t.value}(e,S(e,t,"get"))}function _(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,S(e,t,"set"),n),n}function S(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}var k=new WeakMap,E=new WeakMap,T=new WeakMap,A=new WeakMap,M=new WeakMap,C=new WeakSet,P=new WeakSet,O=new WeakSet,I=new WeakSet,D=new WeakMap,x=new WeakSet,j=new WeakSet,N=new WeakSet;function R(e){if(e){const t=this.getNetworkClientById(e);return{chainId:t.configuration.chainId,provider:t.provider,blockTracker:t.blockTracker,identifier:this.getNetworkIdentifier(t.configuration)}}return{chainId:this.getCurrentChainId(),provider:v(this,T),blockTracker:v(this,A),identifier:this.getNetworkIdentifier()}}function L(e){if(v(this,E)[e])return;const{blockTracker:t}=w(this,C,R).call(this,e),n=w(this,x,q).bind(this,e);t.addListener("latest",n),v(this,E)[e]=n,this.updateAccounts(e)}function B(e){if(!v(this,E)[e])return;const{blockTracker:t}=w(this,C,R).call(this,e);t.removeListener("latest",v(this,E)[e]),delete v(this,E)[e]}function K(e){const{accounts:t,accountsByChainId:n}=this.store.getState();if(n[e])return(0,d.cloneDeep)(n[e]);const r={};return Object.keys(t).forEach((e=>{r[e]={}})),r}async function q(e,t){const{chainId:n,provider:i}=w(this,C,R).call(this,e);v(this,M)[n]=t;const s=await(0,o.default)(new r.default(i)).getBlockByNumber(t,!1);if(!s)return;const c=s.gasLimit,{currentBlockGasLimitByChainId:u}=this.store.getState();this.store.updateState({...n===this.getCurrentChainId()&&{currentBlockGasLimit:c},currentBlockGasLimitByChainId:{...u,[n]:c}});try{await this.updateAccounts(e)}catch(e){a.default.error(e)}}async function $(e,t,n){const{useMultiAccountBalanceChecker:i}=this.preferencesController.store.getState();let s="0x0";try{s=await(0,o.default)(new r.default(t)).getBalance(e)}catch(e){var a;if("eth_getBalance"!==(null===(a=e.data)||void 0===a||null===(a=a.request)||void 0===a?void 0:a.method))throw e}const c={address:e,balance:s},u=w(this,I,K).call(this,n);if(!u[e])return;let l=u;i||(l={},Object.keys(u).forEach((t=>{e!==t&&(l[t]={address:t,balance:null})}))),l[e]=c;const{accountsByChainId:d}=this.store.getState();this.store.updateState({...n===this.getCurrentChainId()&&{accounts:l},accountsByChainId:{...d,[n]:l}})}async function U(e,t,n,r){const i=await new u.Contract(t,l.default,new c.Web3Provider(n)),s=["0x0000000000000000000000000000000000000000"];try{const t=await i.balances(e,s),n=w(this,I,K).call(this,r),a={};Object.keys(n).forEach((t=>{e.includes(t)||(a[t]={address:t,balance:null})})),e.forEach(((e,n)=>{const r=t[n]?t[n].toHexString():"0x0";a[e]={address:e,balance:r}}));const{accountsByChainId:o}=this.store.getState();this.store.updateState({...r===this.getCurrentChainId()&&{accounts:a},accountsByChainId:{...o,[r]:a}})}catch(t){a.default.warn("MetaMask - Account Tracker single call balance fetch failed",t),Promise.allSettled(e.map((e=>w(this,j,$).call(this,e,n,r))))}}n.default=class{constructor(e={}){m(this,N),m(this,j),m(this,x),m(this,I),m(this,O),m(this,P),m(this,C),y(this,k,{writable:!0,value:new Map}),y(this,E,{writable:!0,value:{}}),y(this,T,{writable:!0,value:null}),y(this,A,{writable:!0,value:null}),y(this,M,{writable:!0,value:{}}),y(this,D,{writable:!0,value:async e=>{await w(this,x,q).call(this,null,e)}});const t={accounts:{},currentBlockGasLimit:"",accountsByChainId:{},currentBlockGasLimitByChainId:{}};this.store=new s.ObservableStore({...t,...e.initState}),this.resetState=()=>{this.store.updateState(t)},_(this,T,e.provider),_(this,A,e.blockTracker),this.getCurrentChainId=e.getCurrentChainId,this.getNetworkClientById=e.getNetworkClientById,this.getNetworkIdentifier=e.getNetworkIdentifier,this.preferencesController=e.preferencesController,this.onboardingController=e.onboardingController,this.controllerMessenger=e.controllerMessenger,e.onAccountRemoved((e=>this.removeAccounts([e]))),this.onboardingController.store.subscribe((0,f.previousValueComparator)((async(e,t)=>{const{completedOnboarding:n}=e,{completedOnboarding:r}=t;!n&&r&&this.updateAccountsAllActiveNetworks()}),this.onboardingController.store.getState())),this.selectedAccount=this.controllerMessenger.call("AccountsController:getSelectedAccount"),this.controllerMessenger.subscribe("AccountsController:selectedAccountChange",(e=>{const{useMultiAccountBalanceChecker:t}=this.preferencesController.store.getState();this.selectedAccount.id===e.id||t||(this.selectedAccount=e,this.updateAccountsAllActiveNetworks())}))}start(){_(this,M,{[this.getCurrentChainId()]:v(this,A).getCurrentBlock()}),v(this,A).once("latest",(e=>{v(this,M)[this.getCurrentChainId()]=e})),v(this,A).removeListener("latest",v(this,D)),v(this,A).addListener("latest",v(this,D)),this.updateAccounts()}stop(){v(this,A).removeListener("latest",v(this,D))}startPollingByNetworkClientId(e){const t=(0,i.v4)(),n=v(this,k).get(e);if(n)n.add(t);else{const n=new Set;n.add(t),v(this,k).set(e,n),w(this,P,L).call(this,e)}return t}stopAllPolling(){this.stop(),v(this,k).forEach(((e,t)=>{e.forEach((e=>{this.stopPollingByPollingToken(e)}))}))}stopPollingByPollingToken(e){if(!e)throw new Error("pollingToken required");let t=!1;if(v(this,k).forEach(((n,r)=>{n.has(e)&&(t=!0,n.delete(e),0===n.size&&(v(this,k).delete(r),w(this,O,B).call(this,r)))})),!t)throw new Error("pollingToken not found")}syncWithAddresses(e){const{accounts:t}=this.store.getState(),n=Object.keys(t),r=[];e.forEach((e=>{n.includes(e)||r.push(e)}));const i=[];n.forEach((t=>{e.includes(t)||i.push(t)})),this.addAccounts(r),this.removeAccounts(i)}addAccounts(e){const{accounts:t,accountsByChainId:n}=this.store.getState(),r=(0,d.cloneDeep)(t),i=(0,d.cloneDeep)(n);e.forEach((e=>{r[e]={}})),Object.keys(i).forEach((t=>{e.forEach((e=>{i[t][e]={}}))})),this.store.updateState({accounts:r,accountsByChainId:i}),v(this,M)[this.getCurrentChainId()]&&this.updateAccounts(),v(this,k).forEach(((e,t)=>{const{chainId:n}=w(this,C,R).call(this,t);v(this,M)[n]&&this.updateAccounts(t)}))}removeAccounts(e){const{accounts:t,accountsByChainId:n}=this.store.getState(),r=(0,d.cloneDeep)(t),i=(0,d.cloneDeep)(n);e.forEach((e=>{delete r[e]})),Object.keys(i).forEach((t=>{e.forEach((e=>{delete i[t][e]}))})),this.store.updateState({accounts:r,accountsByChainId:i})}clearAccounts(){this.store.updateState({accounts:{},accountsByChainId:{[this.getCurrentChainId()]:{}}})}async updateAccountsAllActiveNetworks(){await this.updateAccounts(),await Promise.all(Array.from(v(this,k)).map((([e])=>this.updateAccounts(e))))}async updateAccounts(e){const{completedOnboarding:t}=this.onboardingController.store.getState();if(!t)return;const{chainId:n,provider:r,identifier:i}=w(this,C,R).call(this,e),{useMultiAccountBalanceChecker:s}=this.preferencesController.store.getState();let a=[];if(s){const{accounts:e}=this.store.getState();a=Object.keys(e)}else{a=[this.controllerMessenger.call("AccountsController:getSelectedAccount").address]}const o=p.SINGLE_CALL_BALANCES_ADDRESSES[n];i!==h.LOCALHOST_RPC_URL&&"http://127.0.0.1:8545"!==i&&o?await w(this,N,U).call(this,a,o,r,n):await Promise.all(a.map((e=>w(this,j,$).call(this,e,r,n))))}}}}},{package:"$root$",file:"app/scripts/lib/account-tracker.js"}],[57,{"../../../shared/modules/string-utils":4486},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("../../../shared/modules/string-utils");n.default=class{constructor(e={}){const{preferencesController:t,addressBookController:n,accountsController:r,networkController:i,trackMetaMetricsEvent:s}=e;this.preferencesController=t,this.accountsController=r,this.addressBookController=n,this.networkController=i,this._trackMetaMetricsEvent=s}async restoreUserData(e){const t=this.preferencesController.store.getState(),{preferences:n,addressBook:r,network:i,internalAccounts:s}=JSON.parse(e);n&&(n.identities=t.identities,n.lostIdentities=t.lostIdentities,n.selectedAddress=t.selectedAddress,this.preferencesController.store.updateState(n)),r&&this.addressBookController.update(r,!0),i&&this.networkController.loadBackup(i),s&&this.accountsController.loadBackup(s),(n||r||i||s)&&this._trackMetaMetricsEvent({event:"User Data Imported",category:"Backup"})}async backupUserData(){const e={preferences:{...this.preferencesController.store.getState()},internalAccounts:{internalAccounts:this.accountsController.state.internalAccounts},addressBook:{...this.addressBookController.state},network:{networkConfigurations:this.networkController.state.networkConfigurations}};delete e.preferences.identities,delete e.preferences.lostIdentities,delete e.preferences.selectedAddress;const t=JSON.stringify(e),n=new Date,i=e=>(0,r.prependZero)(e,2);return{fileName:`MetaMaskUserData.${n.getFullYear()}_${i(n.getMonth()+1)}_${i(n.getDay())}_${i(n.getHours())}_${i(n.getMinutes())}_${i(n.getDay())}.json`,data:t}}}}}},{package:"$root$",file:"app/scripts/lib/backup.js"}],[571,{"@firebase/component":572,"@firebase/logger":574,"@firebase/util":577,idb:3580},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"FirebaseError",{enumerable:!0,get:function(){return s.FirebaseError}}),n._DEFAULT_ENTRY_NAME=n.SDK_VERSION=void 0,n._addComponent=m,n._addOrOverwriteComponent=function(e,t){e.container.addOrOverwriteComponent(t)},n._apps=void 0,n._clearComponents=function(){g.clear()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n._components=void 0,n._getProvider=b,n._isFirebaseApp=w,n._isFirebaseServerApp=function(e){return e.settings!==undefined},n._registerComponent=y,n._removeServiceInstance=function(e,t,n=d){b(e,t).clearInstance(n)},n._serverApps=void 0,n.deleteApp=T,n.getApp=function(e=d){const t=p.get(e);if(!t&&e===d&&(0,s.getDefaultAppConfig)())return E();if(!t)throw _.create("no-app",{appName:e});return t},n.getApps=function(){return Array.from(p.values())},n.initializeApp=E,n.initializeServerApp=function(e,t){if((0,s.isBrowser)())throw _.create("invalid-server-app-environment");t.automaticDataCollectionEnabled===undefined&&(t.automaticDataCollectionEnabled=!1);let n;n=w(e)?e.options:e;const i=Object.assign(Object.assign({},t),n);i.releaseOnDeref!==undefined&&delete i.releaseOnDeref;if(t.releaseOnDeref!==undefined&&"undefined"==typeof FinalizationRegistry)throw _.create("finalization-registry-not-supported",{});const a=""+(c=JSON.stringify(i),[...c].reduce(((e,t)=>Math.imul(31,e)+t.charCodeAt(0)|0),0)),o=f.get(a);var c;if(o)return o.incRefCount(t.releaseOnDeref),o;const u=new r.ComponentContainer(a);for(const e of g.values())u.addComponent(e);const l=new k(n,t,a,u);return f.set(a,l),l},n.onLog=function(e,t){if(null!==e&&"function"!=typeof e)throw _.create("invalid-log-argument");(0,i.setUserLogHandler)(e,t)},n.registerVersion=A,n.setLogLevel=function(e){(0,i.setLogLevel)(e)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;var r=e("@firebase/component"),i=e("@firebase/logger"),s=e("@firebase/util"),a=e("idb");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class o{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const c="@firebase/app",u="0.10.1",l=new i.Logger("@firebase/app"),d=n._DEFAULT_ENTRY_NAME="[DEFAULT]",h={[c]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},p=n._apps=new Map,f=n._serverApps=new Map,g=n._components=new Map;function m(e,t){try{e.container.addComponent(t)}catch(n){l.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function y(e){const t=e.name;if(g.has(t))return l.debug(`There were multiple attempts to register component ${t}.`),!1;g.set(t,e);for(const t of p.values())m(t,e);for(const t of f.values())m(t,e);return!0}function b(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function w(e){return e.options!==undefined}const v={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_=new s.ErrorFactory("app","Firebase",v);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class S{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.Component("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw _.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k extends S{constructor(e,t,n,r){const i=t.automaticDataCollectionEnabled!==undefined&&t.automaticDataCollectionEnabled,s={name:n,automaticDataCollectionEnabled:i};if(e.apiKey!==undefined)super(e,s,r);else{super(e.options,s,r)}this._serverConfig=Object.assign({automaticDataCollectionEnabled:i},t),this._finalizationRegistry=new FinalizationRegistry((()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=undefined,t.releaseOnDeref=undefined,A(c,u,"serverapp")}toJSON(){return undefined}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==undefined&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){T(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw _.create("server-app-deleted")}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.SDK_VERSION="10.11.0";function E(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const i=Object.assign({name:d,automaticDataCollectionEnabled:!1},t),a=i.name;if("string"!=typeof a||!a)throw _.create("bad-app-name",{appName:String(a)});if(n||(n=(0,s.getDefaultAppConfig)()),!n)throw _.create("no-options");const o=p.get(a);if(o){if((0,s.deepEqual)(n,o.options)&&(0,s.deepEqual)(i,o.config))return o;throw _.create("duplicate-app",{appName:a})}const c=new r.ComponentContainer(a);for(const e of g.values())c.addComponent(e);const u=new S(n,i,c);return p.set(a,u),u}async function T(e){let t=!1;const n=e.name;if(p.has(n))t=!0,p.delete(n);else if(f.has(n)){e.decRefCount()<=0&&(f.delete(n),t=!0)}t&&(await Promise.all(e.container.getProviders().map((e=>e.delete()))),e.isDeleted=!0)}function A(e,t,n){var i;let s=null!==(i=h[e])&&void 0!==i?i:e;n&&(s+=`-${n}`);const a=s.match(/\s|\//),o=t.match(/\s|\//);if(a||o){const e=[`Unable to register library "${s}" with version "${t}":`];return a&&e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void l.warn(e.join(" "))}y(new r.Component(`${s}-version`,(()=>({library:s,version:t})),"VERSION"))}const M="firebase-heartbeat-database",C=1,P="firebase-heartbeat-store";let O=null;function I(){return O||(O=(0,a.openDB)(M,C,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(P)}catch(e){console.warn(e)}}}).catch((e=>{throw _.create("idb-open",{originalErrorMessage:e.message})}))),O}async function D(e,t){try{const n=(await I()).transaction(P,"readwrite"),r=n.objectStore(P);await r.put(t,x(e)),await n.done}catch(e){if(e instanceof s.FirebaseError)l.warn(e.message);else{const t=_.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});l.warn(t.message)}}}function x(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new R(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){var e,t;const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=N();if((null!=(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||(this._heartbeatsCache=await this._heartbeatsCachePromise,null!=(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)))&&this._heartbeatsCache.lastSentHeartbeatDate!==r&&!this._heartbeatsCache.heartbeats.some((e=>e.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=N(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),L(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),L(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=(0,s.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function N(){return(new Date).toISOString().substring(0,10)}class R{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,s.isIndexedDBAvailable)()&&(0,s.validateIndexedDBOpenable)().then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await I()).transaction(P),n=await t.objectStore(P).get(x(e));return await t.done,n}catch(e){if(e instanceof s.FirebaseError)l.warn(e.message);else{const t=_.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});l.warn(t.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return D(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return D(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function L(e){return(0,s.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var B;B="",y(new r.Component("platform-logger",(e=>new o(e)),"PRIVATE")),y(new r.Component("heartbeat",(e=>new j(e)),"PRIVATE")),A(c,u,B),A(c,u,"esm2017"),A("fire-js","")}}},{package:"firebase>@firebase/app",file:"node_modules/@firebase/app/dist/esm/index.esm2017.js"}],[572,{"@firebase/util":577},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.Provider=n.ComponentContainer=n.Component=void 0;var r=e("@firebase/util");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.Component=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};const i="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.Deferred;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:i})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=i){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e=i){return this.instances.has(e)}getOptions(e=i){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(r)}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===i?undefined:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var r;return n||null}normalizeInstanceIdentifier(e=i){return this.component?this.component.multipleInstances?e:i:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}n.Provider=s;n.ComponentContainer=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new s(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}}}},{package:"firebase>@firebase/app>@firebase/component",file:"node_modules/@firebase/component/dist/esm/index.esm2017.js"}],[573,{"@firebase/app":571,"@firebase/component":572,"@firebase/util":577,idb:3580},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.deleteInstallations=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e){const{appConfig:t}=e,n=await $(t,(e=>e&&0===e.registrationStatus?undefined:e));if(n){if(1===n.registrationStatus)throw g.create("delete-pending-registration");if(2===n.registrationStatus){if(!navigator.onLine)throw g.create("app-offline");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
await async function(e,t){const n=function(e,{fid:t}){return`${y(e)}/${t}`}(e,t),r=_(e,t),i={method:"DELETE",headers:r},s=await S((()=>fetch(n,i)));if(!s.ok)throw await w("Delete Installation",s)}(t,n),await q(t)}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getId=J,n.getInstallations=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e=(0,r.getApp)()){return(0,r._getProvider)(e,"installations").getImmediate()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getToken=Q,n.onIdChange=function(e,t){const{appConfig:n}=e;return function(e,t){D();const n=M(e);let r=C.get(n);r||(r=new Set,C.set(n,r));r.add(t)}(n,t),()=>{!function(e,t){const n=M(e),r=C.get(n);if(!r)return;r.delete(t),0===r.size&&C.delete(n);x()}(n,t)}};var r=e("@firebase/app"),i=e("@firebase/component"),s=e("@firebase/util"),a=e("idb");const o="@firebase/installations",c="0.6.6",u=1e4,l=`w:${c}`,d="FIS_v2",h="https://firebaseinstallations.googleapis.com/v1",p=36e5,f={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},g=new s.ErrorFactory("installations","Installations",f);function m(e){return e instanceof s.FirebaseError&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y({projectId:e}){return`${h}/projects/${e}/installations`}function b(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function w(e,t){const n=(await t.json()).error;return g.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function v({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function _(e,{refreshToken:t}){const n=v(e);return n.append("Authorization",function(e){return`${d} ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function S(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function k(e){return new Promise((t=>{setTimeout(t,e)}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const E=/^[cdef][\w-]{21}$/,T="";function A(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return E.test(t)?t:T}catch(e){return T}}function M(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C=new Map;function P(e,t){const n=M(e);O(n,t),function(e,t){const n=D();n&&n.postMessage({key:e,fid:t});x()}(n,t)}function O(e,t){const n=C.get(e);if(n)for(const e of n)e(t)}let I=null;function D(){return!I&&"BroadcastChannel"in self&&(I=new BroadcastChannel("[Firebase] FID Change"),I.onmessage=e=>{O(e.data.key,e.data.fid)}),I}function x(){0===C.size&&I&&(I.close(),I=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j="firebase-installations-database",N=1,R="firebase-installations-store";let L=null;function B(){return L||(L=(0,a.openDB)(j,N,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(R)}})),L}async function K(e,t){const n=M(e),r=(await B()).transaction(R,"readwrite"),i=r.objectStore(R),s=await i.get(n);return await i.put(t,n),await r.done,s&&s.fid===t.fid||P(e,t.fid),t}async function q(e){const t=M(e),n=(await B()).transaction(R,"readwrite");await n.objectStore(R).delete(t),await n.done}async function $(e,t){const n=M(e),r=(await B()).transaction(R,"readwrite"),i=r.objectStore(R),s=await i.get(n),a=t(s);return a===undefined?await i.delete(n):await i.put(a,n),await r.done,!a||s&&s.fid===a.fid||P(e,a.fid),a}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U(e){let t;const n=await $(e.appConfig,(n=>{const r=function(e){const t=e||{fid:A(),registrationStatus:0};return W(t)}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(g.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=y(e),i=v(e),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const a={fid:n,authVersion:d,appId:e.appId,sdkVersion:l},o={method:"POST",headers:i,body:JSON.stringify(a)},c=await S((()=>fetch(r,o)));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:b(e.authToken)}}throw await w("Create Installation",c)}(e,t);return K(e.appConfig,n)}catch(n){throw m(n)&&409===n.customData.serverCode?await q(e.appConfig):await K(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:H(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}));return n.fid===T?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function H(e){let t=await F(e.appConfig);for(;1===t.registrationStatus;)await k(100),t=await F(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await U(e);return n||t}return t}function F(e){return $(e,(e=>{if(!e)throw g.create("installation-not-found");return W(e)}))}function W(e){return 1===(t=e).registrationStatus&&t.registrationTime+u<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function G({appConfig:e,heartbeatServiceProvider:t},n){const r=function(e,{fid:t}){return`${y(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),i=_(e,n),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const a={installation:{sdkVersion:l,appId:e.appId}},o={method:"POST",headers:i,body:JSON.stringify(a)},c=await S((()=>fetch(r,o)));if(c.ok){return b(await c.json())}throw await w("Generate Auth Token",c)}async function V(e,t=!1){let n;const r=await $(e.appConfig,(r=>{if(!Y(r))throw g.create("not-registered");const i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+p}(e)}(i))return r;if(1===i.requestStatus)return n=async function(e,t){let n=await z(e.appConfig);for(;1===n.authToken.requestStatus;)await k(100),n=await z(e.appConfig);const r=n.authToken;return 0===r.requestStatus?V(e,t):r}(e,t),r;{if(!navigator.onLine)throw g.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function(e,t){try{const n=await G(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await K(e.appConfig,r),n}catch(n){if(!m(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await K(e.appConfig,n)}else await q(e.appConfig);throw n}}(e,t),t}}));return n?await n:r.authToken}function z(e){return $(e,(e=>{if(!Y(e))throw g.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+u<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}function Y(e){return e!==undefined&&2===e.registrationStatus}async function J(e){const t=e,{installationEntry:n,registrationPromise:r}=await U(t);return r?r.catch(console.error):V(t).catch(console.error),n.fid}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await U(e);t&&await t}(n);return(await V(n,t)).token}function X(e){return g.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z="installations",ee=e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw X("App Configuration");if(!e.name)throw X("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw X(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:(0,r._getProvider)(t,"heartbeat"),_delete:()=>Promise.resolve()}},te=e=>{const t=e.getProvider("app").getImmediate(),n=(0,r._getProvider)(t,Z).getImmediate();return{getId:()=>J(n),getToken:e=>Q(n,e)}};(0,r._registerComponent)(new i.Component(Z,ee,"PUBLIC")),(0,r._registerComponent)(new i.Component("installations-internal",te,"PRIVATE")),(0,r.registerVersion)(o,c),(0,r.registerVersion)(o,c,"esm2017")}}},{package:"firebase>@firebase/installations",file:"node_modules/@firebase/installations/dist/esm/index.esm2017.js"}],[574,{tslib:4308},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var r,i,s=e("tslib"),a=[];
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.LogLevel=void 0,(i=n.LogLevel||(n.LogLevel={}))[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT";var o={debug:n.LogLevel.DEBUG,verbose:n.LogLevel.VERBOSE,info:n.LogLevel.INFO,warn:n.LogLevel.WARN,error:n.LogLevel.ERROR,silent:n.LogLevel.SILENT},c=n.LogLevel.INFO,u=((r={})[n.LogLevel.DEBUG]="log",r[n.LogLevel.VERBOSE]="log",r[n.LogLevel.INFO]="info",r[n.LogLevel.WARN]="warn",r[n.LogLevel.ERROR]="error",r),l=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(t<e.logLevel)){var i=(new Date).toISOString(),a=u[t];if(!a)throw new Error("Attempted to log a message with an invalid logType (value: ".concat(t,")"));console[a].apply(console,s.__spreadArray(["[".concat(i,"]  ").concat(e.name,":")],n,!1))}},d=function(){function e(e){this.name=e,this._logLevel=c,this._logHandler=l,this._userLogHandler=null,a.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in n.LogLevel))throw new TypeError('Invalid value "'.concat(e,'" assigned to `logLevel`'));this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?o[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,s.__spreadArray([this,n.LogLevel.DEBUG],e,!1)),this._logHandler.apply(this,s.__spreadArray([this,n.LogLevel.DEBUG],e,!1))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,s.__spreadArray([this,n.LogLevel.VERBOSE],e,!1)),this._logHandler.apply(this,s.__spreadArray([this,n.LogLevel.VERBOSE],e,!1))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,s.__spreadArray([this,n.LogLevel.INFO],e,!1)),this._logHandler.apply(this,s.__spreadArray([this,n.LogLevel.INFO],e,!1))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,s.__spreadArray([this,n.LogLevel.WARN],e,!1)),this._logHandler.apply(this,s.__spreadArray([this,n.LogLevel.WARN],e,!1))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,s.__spreadArray([this,n.LogLevel.ERROR],e,!1)),this._logHandler.apply(this,s.__spreadArray([this,n.LogLevel.ERROR],e,!1))},e}();n.Logger=d,n.setLogLevel=function(e){a.forEach((function(t){t.setLogLevel(e)}))},n.setUserLogHandler=function(e,t){for(var r=function(r){var i=null;t&&t.level&&(i=o[t.level]),r.userLogHandler=null===e?null:function(t,r){for(var s=[],a=2;a<arguments.length;a++)s[a-2]=arguments[a];var o=s.map((function(e){if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}})).filter((function(e){return e})).join(" ");r>=(null!=i?i:t.logLevel)&&e({level:n.LogLevel[r].toLowerCase(),message:o,args:s,type:t.name})}},i=0,s=a;i<s.length;i++){r(s[i])}}}}},{package:"firebase>@firebase/app>@firebase/logger",file:"node_modules/@firebase/logger/dist/index.cjs.js"}],[575,{"@firebase/app":571,"@firebase/component":572,"@firebase/installations":573,"@firebase/util":577,idb:3580},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.deleteToken=function(e){
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e){if(!navigator)throw O.create("only-available-in-window");e.swRegistration||await U(e);return async function(e){const t=await A(e.firebaseDependencies);t&&(await I(e.firebaseDependencies,t.token),await async function(e){const t=C(e),n=(await T()).transaction(k,"readwrite");await n.objectStore(k).delete(t),await n.done}(e.firebaseDependencies));const n=await e.swRegistration.pushManager.getSubscription();if(n)return n.unsubscribe();return!0}(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e=(0,s.getModularInstance)(e))},n.getMessaging=
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e=(0,a.getApp)()){return J().then((e=>{if(!e)throw O.create("unsupported-browser")}),(e=>{throw O.create("indexed-db-unsupported")})),(0,a._getProvider)((0,s.getModularInstance)(e),"messaging").getImmediate()},n.getToken=async function(e,t){return H(e=(0,s.getModularInstance)(e),t)},n.isSupported=J,n.onMessage=function(e,t){return function(e,t){if(!navigator)throw O.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}(e=(0,s.getModularInstance)(e),t)},e("@firebase/installations");var r=e("@firebase/component"),i=e("idb"),s=e("@firebase/util"),a=e("@firebase/app");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const o="/firebase-messaging-sw.js",c="/firebase-cloud-messaging-push-scope",u="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",l="https://fcmregistrations.googleapis.com/v1",d="google.c.a.c_id",h="google.c.a.c_l",p="google.c.a.ts";var f,g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function m(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function y(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;++e)r[e]=n.charCodeAt(e);return r}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(f||(f={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(g||(g={}));const b="fcm_token_details_db",w=5,v="fcm_token_object_Store";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _="firebase-messaging-database",S=1,k="firebase-messaging-store";let E=null;function T(){return E||(E=(0,i.openDB)(_,S,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(k)}})),E}async function A(e){const t=C(e),n=await T(),r=await n.transaction(k).objectStore(k).get(t);if(r)return r;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map((e=>e.name));if(!e.includes(b))return null}let t=null;return(await(0,i.openDB)(b,w,{upgrade:async(n,r,i,s)=>{var a;if(r<2)return;if(!n.objectStoreNames.contains(v))return;const o=s.objectStore(v),c=await o.index("fcmSenderId").get(e);if(await o.clear(),c)if(2===r){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!==(a=e.createTime)&&void 0!==a?a:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:m(e.vapidKey)}}}else if(3===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:m(e.auth),p256dh:m(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:m(e.vapidKey)}}}else if(4===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:m(e.auth),p256dh:m(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:m(e.vapidKey)}}}}})).close(),await(0,i.deleteDB)(b),await(0,i.deleteDB)("fcm_vapid_details_db"),await(0,i.deleteDB)("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await M(e,t),t}}async function M(e,t){const n=C(e),r=(await T()).transaction(k,"readwrite");return await r.objectStore(k).put(t,n),await r.done,t}function C({appConfig:e}){return e.appId}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},O=new s.ErrorFactory("messaging","Messaging",P);async function I(e,t){const n={method:"DELETE",headers:await x(e)};try{const r=await fetch(`${D(e.appConfig)}/${t}`,n),i=await r.json();if(i.error){const e=i.error.message;throw O.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw O.create("token-unsubscribe-failed",{errorInfo:null==e?void 0:e.toString()})}}function D({projectId:e}){return`${l}/projects/${e}/registrations`}async function x({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function j({p256dh:e,auth:t,endpoint:n,vapidKey:r}){const i={web:{endpoint:n,auth:t,p256dh:e}};return r!==u&&(i.web.applicationPubKey=r),i}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N=6048e5;async function R(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:y(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:m(t.getKey("auth")),p256dh:m(t.getKey("p256dh"))},r=await A(e.firebaseDependencies);if(r){if(function(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,s=t.p256dh===e.p256dh;return n&&r&&i&&s}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r.subscriptionOptions,n))return Date.now()>=r.createTime+N?async function(e,t){try{const n=await async function(e,t){const n=await x(e),r=j(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let s;try{const n=await fetch(`${D(e.appConfig)}/${t.token}`,i);s=await n.json()}catch(e){throw O.create("token-update-failed",{errorInfo:null==e?void 0:e.toString()})}if(s.error){const e=s.error.message;throw O.create("token-update-failed",{errorInfo:e})}if(!s.token)throw O.create("token-update-no-token");return s.token}(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await M(e.firebaseDependencies,r),n}catch(e){throw e}}(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await I(e.firebaseDependencies,r.token)}catch(e){console.warn(e)}return L(e.firebaseDependencies,n)}return L(e.firebaseDependencies,n)}async function L(e,t){const n=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await async function(e,t){const n=await x(e),r=j(t),i={method:"POST",headers:n,body:JSON.stringify(r)};let s;try{const t=await fetch(D(e.appConfig),i);s=await t.json()}catch(e){throw O.create("token-subscribe-failed",{errorInfo:null==e?void 0:e.toString()})}if(s.error){const e=s.error.message;throw O.create("token-subscribe-failed",{errorInfo:e})}if(!s.token)throw O.create("token-subscribe-no-token");return s.token}(e,t),r={token:n,createTime:Date.now(),subscriptionOptions:t};return await M(e,r),r.token}function B(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const s=t.notification.icon;s&&(e.notification.icon=s)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){var n,r,i,s,a;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};const o=null!==(i=null===(r=t.fcmOptions)||void 0===r?void 0:r.link)&&void 0!==i?i:null===(s=t.notification)||void 0===s?void 0:s.click_action;o&&(e.fcmOptions.link=o);const c=null===(a=t.fcmOptions)||void 0===a?void 0:a.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t,e),t}function K(e,t){const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));return n.join("")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(e){return O.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
K("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),K("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class ${constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=function(e){if(!e||!e.options)throw q("App Configuration Object");if(!e.name)throw q("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const e of t)if(!n[e])throw q(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U(e){try{e.swRegistration=await navigator.serviceWorker.register(o,{scope:c}),e.swRegistration.update().catch((()=>{}))}catch(e){throw O.create("failed-service-worker-registration",{browserErrorMessage:null==e?void 0:e.message})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function H(e,t){if(!navigator)throw O.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw O.create("permission-blocked");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=u)}(e,null==t?void 0:t.vapidKey),await async function(e,t){if(t||e.swRegistration||await U(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw O.create("invalid-sw-registration");e.swRegistration=t}}(e,null==t?void 0:t.serviceWorkerRegistration),R(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function F(e,t,n){const r=function(e){switch(e){case g.NOTIFICATION_CLICKED:return"notification_open";case g.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[d],message_name:n[h],message_time:n[p],message_device_time:Math.floor(Date.now()/1e3)})}async function W(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===g.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(B(n)):e.onMessageHandler.next(B(n)));const r=n.data;var i;"object"==typeof(i=r)&&i&&d in i&&"1"===r["google.c.a.e"]&&await F(e,n.messageType,r)}const G="@firebase/messaging",V="0.12.8",z=e=>{const t=new $(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",(e=>W(t,e))),t},Y=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>H(t,e)}};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function J(){try{await(0,s.validateIndexedDBOpenable)()}catch(e){return!1}return"undefined"!=typeof window&&(0,s.isIndexedDBAvailable)()&&(0,s.areCookiesEnabled)()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}(0,a._registerComponent)(new r.Component("messaging",z,"PUBLIC")),(0,a._registerComponent)(new r.Component("messaging-internal",Y,"PRIVATE")),(0,a.registerVersion)(G,V),(0,a.registerVersion)(G,V,"esm2017")}}},{package:"firebase>@firebase/messaging",file:"node_modules/@firebase/messaging/dist/esm/index.esm2017.js"}],[576,{"@firebase/app":571,"@firebase/component":572,"@firebase/installations":573,"@firebase/util":577,idb:3580,tslib:4308},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),e("@firebase/installations");var r,i,s=e("@firebase/component"),a=e("tslib"),o=e("idb"),c=e("@firebase/util"),u=e("@firebase/app"),l="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",d="https://fcmregistrations.googleapis.com/v1",h="FCM_MSG",p="google.c.a.c_id",f=3,g=1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function m(e){var t=new Uint8Array(e);return btoa(String.fromCharCode.apply(String,a.__spreadArray([],a.__read(t),!1))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function y(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length),i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(r||(r={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(i||(i={}));var b="fcm_token_details_db",w=5,v="fcm_token_object_Store";function _(e){return a.__awaiter(this,void 0,void 0,(function(){var t,n,r,i=this;return a.__generator(this,(function(s){switch(s.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2];case 1:if(t=s.sent(),n=t.map((function(e){return e.name})),!n.includes(b))return[2,null];s.label=2;case 2:return r=null,[4,o.openDB(b,w,{upgrade:function(t,n,s,o){return a.__awaiter(i,void 0,void 0,(function(){var i,s,c,u;return a.__generator(this,(function(a){switch(a.label){case 0:return n<2?[2]:t.objectStoreNames.contains(v)?[4,(i=o.objectStore(v)).index("fcmSenderId").get(e)]:[2];case 1:return s=a.sent(),[4,i.clear()];case 2:if(a.sent(),!s)return[2];if(2===n){if(!(c=s).auth||!c.p256dh||!c.endpoint)return[2];r={token:c.fcmToken,createTime:null!==(u=c.createTime)&&void 0!==u?u:Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:"string"==typeof c.vapidKey?c.vapidKey:m(c.vapidKey)}}}else(3===n||4===n)&&(r={token:(c=s).fcmToken,createTime:c.createTime,subscriptionOptions:{auth:m(c.auth),p256dh:m(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:m(c.vapidKey)}});return[2]}}))}))}})];case 3:return s.sent().close(),[4,o.deleteDB(b)];case 4:return s.sent(),[4,o.deleteDB("fcm_vapid_details_db")];case 5:return s.sent(),[4,o.deleteDB("undefined")];case 6:return s.sent(),[2,S(r)?r:null]}}))}))}function S(e){if(!e||!e.subscriptionOptions)return!1;var t=e.subscriptionOptions;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k,E="firebase-messaging-database",T=1,A="firebase-messaging-store",M=null;function C(){return M||(M=o.openDB(E,T,{upgrade:function(e,t){if(0===t)e.createObjectStore(A)}})),M}function P(e){return a.__awaiter(this,void 0,void 0,(function(){var t,n,r;return a.__generator(this,(function(i){switch(i.label){case 0:return t=D(e),[4,C()];case 1:return[4,i.sent().transaction(A).objectStore(A).get(t)];case 2:return(n=i.sent())?[2,n]:[3,3];case 3:return[4,_(e.appConfig.senderId)];case 4:return(r=i.sent())?[4,O(e,r)]:[3,6];case 5:return i.sent(),[2,r];case 6:return[2]}}))}))}function O(e,t){return a.__awaiter(this,void 0,void 0,(function(){var n,r,i;return a.__generator(this,(function(s){switch(s.label){case 0:return n=D(e),[4,C()];case 1:return r=s.sent(),[4,(i=r.transaction(A,"readwrite")).objectStore(A).put(t,n)];case 2:return s.sent(),[4,i.done];case 3:return s.sent(),[2,t]}}))}))}function I(e){return a.__awaiter(this,void 0,void 0,(function(){var t,n,r;return a.__generator(this,(function(i){switch(i.label){case 0:return t=D(e),[4,C()];case 1:return n=i.sent(),[4,(r=n.transaction(A,"readwrite")).objectStore(A).delete(t)];case 2:return i.sent(),[4,r.done];case 3:return i.sent(),[2]}}))}))}function D(e){return e.appConfig.appId}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x=((k={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',k["only-available-in-window"]="This method is available in a Window context.",k["only-available-in-sw"]="This method is available in a service worker context.",k["permission-default"]="The notification permission was not granted and dismissed instead.",k["permission-blocked"]="The notification permission was not granted and blocked instead.",k["unsupported-browser"]="This browser doesn't support the API's required to use the Firebase SDK.",k["indexed-db-unsupported"]="This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",k["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",k["token-subscribe-failed"]="A problem occurred while subscribing the user to FCM: {$errorInfo}",k["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",k["token-unsubscribe-failed"]="A problem occurred while unsubscribing the user from FCM: {$errorInfo}",k["token-update-failed"]="A problem occurred while updating the user from FCM: {$errorInfo}",k["token-update-no-token"]="FCM returned no token when updating the user to push.",k["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",k["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",k["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",k["invalid-vapid-key"]="The public VAPID key must be a string.",k["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",k),j=new c.ErrorFactory("messaging","Messaging",x);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function N(e,t){return a.__awaiter(this,void 0,void 0,(function(){var n,r,i,s,o,c;return a.__generator(this,(function(a){switch(a.label){case 0:return[4,K(e)];case 1:n=a.sent(),r=q(t),i={method:"POST",headers:n,body:JSON.stringify(r)},a.label=2;case 2:return a.trys.push([2,5,,6]),[4,fetch(B(e.appConfig),i)];case 3:return[4,a.sent().json()];case 4:return s=a.sent(),[3,6];case 5:throw o=a.sent(),j.create("token-subscribe-failed",{errorInfo:null==o?void 0:o.toString()});case 6:if(s.error)throw c=s.error.message,j.create("token-subscribe-failed",{errorInfo:c});if(!s.token)throw j.create("token-subscribe-no-token");return[2,s.token]}}))}))}function R(e,t){return a.__awaiter(this,void 0,void 0,(function(){var n,r,i,s,o,c;return a.__generator(this,(function(a){switch(a.label){case 0:return[4,K(e)];case 1:n=a.sent(),r=q(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},a.label=2;case 2:return a.trys.push([2,5,,6]),[4,fetch("".concat(B(e.appConfig),"/").concat(t.token),i)];case 3:return[4,a.sent().json()];case 4:return s=a.sent(),[3,6];case 5:throw o=a.sent(),j.create("token-update-failed",{errorInfo:null==o?void 0:o.toString()});case 6:if(s.error)throw c=s.error.message,j.create("token-update-failed",{errorInfo:c});if(!s.token)throw j.create("token-update-no-token");return[2,s.token]}}))}))}function L(e,t){return a.__awaiter(this,void 0,void 0,(function(){var n,r,i,s,o;return a.__generator(this,(function(a){switch(a.label){case 0:return[4,K(e)];case 1:n=a.sent(),r={method:"DELETE",headers:n},a.label=2;case 2:return a.trys.push([2,5,,6]),[4,fetch("".concat(B(e.appConfig),"/").concat(t),r)];case 3:return[4,a.sent().json()];case 4:if((i=a.sent()).error)throw s=i.error.message,j.create("token-unsubscribe-failed",{errorInfo:s});return[3,6];case 5:throw o=a.sent(),j.create("token-unsubscribe-failed",{errorInfo:null==o?void 0:o.toString()});case 6:return[2]}}))}))}function B(e){var t=e.projectId;return"".concat(d,"/projects/").concat(t,"/registrations")}function K(e){var t=e.appConfig,n=e.installations;return a.__awaiter(this,void 0,void 0,(function(){var e;return a.__generator(this,(function(r){switch(r.label){case 0:return[4,n.getToken()];case 1:return e=r.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":"FIS ".concat(e)})]}}))}))}function q(e){var t=e.p256dh,n=e.auth,r=e.endpoint,i=e.vapidKey,s={web:{endpoint:r,auth:n,p256dh:t}};return i!==l&&(s.web.applicationPubKey=i),s}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $=6048e5;function U(e){return a.__awaiter(this,void 0,void 0,(function(){var t,n,r,i;return a.__generator(this,(function(s){switch(s.label){case 0:return[4,G(e.swRegistration,e.vapidKey)];case 1:return t=s.sent(),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:m(t.getKey("auth")),p256dh:m(t.getKey("p256dh"))},[4,P(e.firebaseDependencies)];case 2:return(r=s.sent())?[3,3]:[2,W(e.firebaseDependencies,n)];case 3:if(a=r.subscriptionOptions,c=(o=n).vapidKey===a.vapidKey,u=o.endpoint===a.endpoint,l=o.auth===a.auth,d=o.p256dh===a.p256dh,c&&u&&l&&d)return[3,8];s.label=4;case 4:return s.trys.push([4,6,,7]),[4,L(e.firebaseDependencies,r.token)];case 5:return s.sent(),[3,7];case 6:return i=s.sent(),console.warn(i),[3,7];case 7:return[2,W(e.firebaseDependencies,n)];case 8:return Date.now()>=r.createTime+$?[2,F(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n})]:[2,r.token];case 9:return[2]}var a,o,c,u,l,d;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}))}function H(e){return a.__awaiter(this,void 0,void 0,(function(){var t,n;return a.__generator(this,(function(r){switch(r.label){case 0:return[4,P(e.firebaseDependencies)];case 1:return(t=r.sent())?[4,L(e.firebaseDependencies,t.token)]:[3,4];case 2:return r.sent(),[4,I(e.firebaseDependencies)];case 3:r.sent(),r.label=4;case 4:return[4,e.swRegistration.pushManager.getSubscription()];case 5:return(n=r.sent())?[2,n.unsubscribe()]:[2,!0]}}))}))}function F(e,t){return a.__awaiter(this,void 0,void 0,(function(){var n,r;return a.__generator(this,(function(i){switch(i.label){case 0:return i.trys.push([0,3,,4]),[4,R(e.firebaseDependencies,t)];case 1:return n=i.sent(),r=a.__assign(a.__assign({},t),{token:n,createTime:Date.now()}),[4,O(e.firebaseDependencies,r)];case 2:return i.sent(),[2,n];case 3:throw i.sent();case 4:return[2]}}))}))}function W(e,t){return a.__awaiter(this,void 0,void 0,(function(){var n,r;return a.__generator(this,(function(i){switch(i.label){case 0:return[4,N(e,t)];case 1:return n=i.sent(),r={token:n,createTime:Date.now(),subscriptionOptions:t},[4,O(e,r)];case 2:return i.sent(),[2,r.token]}}))}))}function G(e,t){return a.__awaiter(this,void 0,void 0,(function(){var n;return a.__generator(this,(function(r){switch(r.label){case 0:return[4,e.pushManager.getSubscription()];case 1:return(n=r.sent())?[2,n]:[2,e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:y(t)})]}}))}))}function V(e,t){return a.__awaiter(this,void 0,void 0,(function(){var n,r,i;return a.__generator(this,(function(s){switch(s.label){case 0:return r=z,i=[t],[4,e.firebaseDependencies.installations.getId()];case 1:return n=r.apply(void 0,i.concat([s.sent()])),function(e,t,n){var r={};r.event_time_ms=Math.floor(Date.now()).toString(),r.source_extension_json_proto3=JSON.stringify(t),!n||(r.compliance_data=function(e){var t={privacy_context:{prequest:{origin_associated_product_id:e}}};return t}(n));e.logEvents.push(r)}(e,n,t.productId),[2]}}))}))}function z(e,t){var n,i,s={};return e.from&&(s.project_number=e.from),e.fcmMessageId&&(s.message_id=e.fcmMessageId),s.instance_id=t,e.notification?s.message_type=r.DISPLAY_NOTIFICATION.toString():s.message_type=r.DATA_MESSAGE.toString(),s.sdk_platform=f.toString(),s.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),e.collapse_key&&(s.collapse_key=e.collapse_key),s.event=g.toString(),(null===(n=e.fcmOptions)||void 0===n?void 0:n.analytics_label)&&(s.analytics_label=null===(i=e.fcmOptions)||void 0===i?void 0:i.analytics_label),s}function Y(e,t){for(var n=[],r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));return n.join("")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(e){var t,n;return a.__awaiter(this,void 0,void 0,(function(){var r,s,o,c,u;return a.__generator(this,(function(a){switch(a.label){case 0:return(r=null===(n=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===n?void 0:n[h])?e.action?[2]:(e.stopImmediatePropagation(),e.notification.close(),s=function(e){var t,n,r,i=null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(r=e.notification)||void 0===r?void 0:r.click_action;if(i)return i;return s=e.data,"object"==typeof s&&s&&p in s?self.location.origin:null;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var s;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r),s?(o=new URL(s,self.location.href),c=new URL(self.location.origin),o.host!==c.host?[2]:[4,X(o)]):[2]):[2];case 1:return(u=a.sent())?[3,4]:[4,self.clients.openWindow(s)];case 2:return u=a.sent(),[4,(l=3e3,new Promise((function(e){setTimeout(e,l)})))];case 3:return a.sent(),[3,6];case 4:return[4,u.focus()];case 5:u=a.sent(),a.label=6;case 6:return u?(r.messageType=i.NOTIFICATION_CLICKED,r.isFirebaseMessaging=!0,[2,u.postMessage(r)]):[2]}var l;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}))}function Q(e){var t,n=a.__assign({},e.notification);return n.data=((t={})[h]=e,t),n}function X(e){return a.__awaiter(this,void 0,void 0,(function(){var t,n,r,i,s,o,c;return a.__generator(this,(function(u){switch(u.label){case 0:return[4,ee()];case 1:t=u.sent();try{for(n=a.__values(t),r=n.next();!r.done;r=n.next())if(i=r.value,s=new URL(i.url,self.location.href),e.host===s.host)return[2,i]}catch(e){o={error:e}}finally{try{r&&!r.done&&(c=n.return)&&c.call(n)}finally{if(o)throw o.error}}return[2,null]}}))}))}function Z(e,t){var n,r;t.isFirebaseMessaging=!0,t.messageType=i.PUSH_RECEIVED;try{for(var s=a.__values(e),o=s.next();!o.done;o=s.next()){o.value.postMessage(t)}}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}}function ee(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function te(e){var t,n=e.actions,r=Notification.maxActions;return n&&r&&n.length>r&&console.warn("This browser only supports ".concat(r," actions. The remaining actions will not be displayed.")),self.registration.showNotification(null!==(t=e.title)&&void 0!==t?t:"",e)}function ne(e){return j.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Y("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),Y("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");var re=function(){function e(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;var r=function(e){var t,n;if(!e||!e.options)throw ne("App Configuration Object");if(!e.name)throw ne("App Name");var r=e.options;try{for(var i=a.__values(["projectId","apiKey","appId","messagingSenderId"]),s=i.next();!s.done;s=i.next()){var o=s.value;if(!r[o])throw ne(o)}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}return{appName:e.name,projectId:r.projectId,apiKey:r.apiKey,appId:r.appId,senderId:r.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}return e.prototype._delete=function(){return Promise.resolve()},e}(),ie=function(e){var t=new re(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",(function(e){e.waitUntil(function(e,t){return a.__awaiter(this,void 0,void 0,(function(){var n,r,i;return a.__generator(this,(function(s){switch(s.label){case 0:return n=function(e){var t=e.data;if(!t)return null;try{return t.json()}catch(e){return null}}(e),n?t.deliveryMetricsExportedToBigQueryEnabled?[4,V(t,n)]:[3,2]:[2];case 1:s.sent(),s.label=2;case 2:return[4,ee()];case 3:return function(e){return e.some((function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")}))}(r=s.sent())?[2,Z(r,n)]:n.notification?[4,te(Q(n))]:[3,5];case 4:s.sent(),s.label=5;case 5:return t?t.onBackgroundMessageHandler?(i=function(e){var t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(t.notification){e.notification={};var n=t.notification.title;n&&(e.notification.title=n);var r=t.notification.body;r&&(e.notification.body=r);var i=t.notification.image;i&&(e.notification.image=i);var s=t.notification.icon;s&&(e.notification.icon=s)}}(t,e),function(e,t){t.data&&(e.data=t.data)}(t,e),function(e,t){var n,r,i,s,a;if(t.fcmOptions||(null===(n=t.notification)||void 0===n?void 0:n.click_action)){e.fcmOptions={};var o=null!==(i=null===(r=t.fcmOptions)||void 0===r?void 0:r.link)&&void 0!==i?i:null===(s=t.notification)||void 0===s?void 0:s.click_action;o&&(e.fcmOptions.link=o);var c=null===(a=t.fcmOptions)||void 0===a?void 0:a.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}}(t,e),t}(n),"function"!=typeof t.onBackgroundMessageHandler?[3,7]:[4,t.onBackgroundMessageHandler(i)]):[3,8]:[2];case 6:return s.sent(),[3,8];case 7:t.onBackgroundMessageHandler.next(i),s.label=8;case 8:return[2]}}))}))}(e,t))})),self.addEventListener("pushsubscriptionchange",(function(e){e.waitUntil(function(e,t){var n,r;return a.__awaiter(this,void 0,void 0,(function(){var i;return a.__generator(this,(function(s){switch(s.label){case 0:return e.newSubscription?[3,2]:[4,H(t)];case 1:case 5:return s.sent(),[2];case 2:return[4,P(t.firebaseDependencies)];case 3:return i=s.sent(),[4,H(t)];case 4:return s.sent(),t.vapidKey=null!==(r=null===(n=null==i?void 0:i.subscriptionOptions)||void 0===n?void 0:n.vapidKey)&&void 0!==r?r:l,[4,U(t)]}}))}))}(e,t))})),self.addEventListener("notificationclick",(function(e){e.waitUntil(J(e))})),t};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function se(){return a.__awaiter(this,void 0,void 0,(function(){var e;return a.__generator(this,(function(t){switch(t.label){case 0:return(e=c.isIndexedDBAvailable())?[4,c.validateIndexedDBOpenable()]:[3,2];case 1:e=t.sent(),t.label=2;case 2:return[2,e&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")]}}))}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */u._registerComponent(new s.Component("messaging-sw",ie,"PUBLIC")),n.experimentalSetDeliveryMetricsExportedToBigQueryEnabled=function(e,t){
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return function(e,t){e.deliveryMetricsExportedToBigQueryEnabled=t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e=c.getModularInstance(e),t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getMessaging=function(e){return void 0===e&&(e=u.getApp()),se().then((function(e){if(!e)throw j.create("unsupported-browser")}),(function(e){throw j.create("indexed-db-unsupported")})),u._getProvider(c.getModularInstance(e),"messaging-sw").getImmediate()},n.isSupported=se,n.onBackgroundMessage=function(e,t){return function(e,t){if(self.document!==undefined)throw j.create("only-available-in-sw");return e.onBackgroundMessageHandler=t,function(){e.onBackgroundMessageHandler=null}}(e=c.getModularInstance(e),t)}}}},{package:"firebase>@firebase/messaging",file:"node_modules/@firebase/messaging/dist/index.sw.cjs"}],[577,{_process:3925},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(e){(function(){Object.defineProperty(n,"__esModule",{value:!0}),n.Sha1=n.RANDOM_FACTOR=n.MAX_VALUE_MILLIS=n.FirebaseError=n.ErrorFactory=n.Deferred=n.DecodeBase64StringError=n.CONSTANTS=void 0,n.areCookiesEnabled=function(){if("undefined"==typeof navigator||!navigator.cookieEnabled)return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.assertionError=n.assert=void 0,n.async=function(e,t){return(...n)=>{Promise.resolve(!0).then((()=>{e(...n)})).catch((e=>{t&&t(e)}))}},n.base64urlEncodeWithoutPadding=n.base64Encode=n.base64Decode=n.base64=void 0,n.calculateBackoffMillis=function(e,t=M,n=C){const r=t*Math.pow(n,e),i=Math.round(O*r*(Math.random()-.5)*2);return Math.min(P,r+i)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.contains=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.createMockUserToken=function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[u(JSON.stringify({alg:"none",type:"JWT"})),u(JSON.stringify(s)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.createSubscribe=function(e,t){const n=new E(e,t);return n.subscribe.bind(n)},n.decode=void 0,n.deepCopy=function(e){return d(undefined,e)},n.deepEqual=function e(t,n){if(t===n)return!0;const r=Object.keys(t),i=Object.keys(n);for(const s of r){if(!i.includes(s))return!1;const r=t[s],a=n[s];if(k(r)&&k(a)){if(!e(r,a))return!1}else if(r!==a)return!1}for(const e of i)if(!r.includes(e))return!1;return!0},n.deepExtend=d,n.errorPrefix=A,n.extractQuerystring=function(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:undefined)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getExperimentalSetting=n.getDefaults=n.getDefaultEmulatorHostnameAndPort=n.getDefaultEmulatorHost=n.getDefaultAppConfig=void 0,n.getGlobal=h,n.getModularInstance=
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){return e&&e._delegate?e._delegate:e},n.getUA=m,n.isAdmin=void 0,n.isBrowser=function(){return"object"==typeof self&&self.self===self},n.isBrowserExtension=function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:undefined;return"object"==typeof e&&e.id!==undefined},n.isElectron=function(){return m().indexOf("Electron/")>=0},n.isEmpty=function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0},n.isIE=function(){const e=m();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0},n.isIndexedDBAvailable=function(){try{return"object"==typeof indexedDB}catch(e){return!1}},n.isMobileCordova=function(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(m())},n.isNode=y,n.isNodeSdk=function(){return!0===t.NODE_CLIENT||!0===t.NODE_ADMIN},n.isReactNative=function(){return"object"==typeof navigator&&"ReactNative"===navigator.product},n.isSafari=function(){return!y()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")},n.isUWP=function(){return m().indexOf("MSAppHost/")>=0},n.issuedAtTime=n.isValidTimestamp=n.isValidFormat=void 0,n.jsonEval=_,n.map=function(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r},n.ordinal=function(e){if(!Number.isFinite(e))return`${e}`;return e+function(e){e=Math.abs(e);const t=e%100;if(t>=10&&t<=20)return"th";const n=e%10;if(1===n)return"st";if(2===n)return"nd";if(3===n)return"rd";return"th"}(e)},n.promiseWithTimeout=
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t=2e3){const n=new g;return setTimeout((()=>n.reject("timeout!")),t),e.then(n.resolve,n.reject),n.promise}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.querystring=function(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""},n.querystringDecode=function(e){const t={},n=e.replace(/^\?/,"").split("&");return n.forEach((e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}})),t},n.safeGet=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:undefined},n.stringToByteArray=n.stringLength=void 0,n.stringify=function(e){return JSON.stringify(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.validateArgCount=n.uuidv4=void 0,n.validateCallback=function(e,t,n,r){if(r&&!n)return;if("function"!=typeof n)throw new Error(A(e,t)+"must be a valid function.")},n.validateContextObject=function(e,t,n,r){if(r&&!n)return;if("object"!=typeof n||null===n)throw new Error(A(e,t)+"must be a valid context object.")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.validateIndexedDBOpenable=function(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))},n.validateNamespace=function(e,t,n){if(n&&!t)return;if("string"!=typeof t)throw new Error(A(e,"namespace")+"must be a valid firebase namespace.")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const t=n.CONSTANTS={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},r=function(e,t){if(!e)throw i(t)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.assert=r;const i=function(e){return new Error("Firebase Database ("+t.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.assertionError=i;const s=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},a=n.base64={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){const i=e[t],s=t+1<e.length,a=s?e[t+1]:0,o=t+2<e.length,c=o?e[t+2]:0,u=i>>2,l=(3&i)<<4|a>>4;let d=(15&a)<<2|c>>6,h=63&c;o||(h=64,s||(d=64)),r.push(n[u],n[l],n[d],n[h])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(s(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(s>>10)),t[r++]=String.fromCharCode(56320+(1023&s))}else{const s=e[n++],a=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&a)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){const i=n[e.charAt(t++)],s=t<e.length?n[e.charAt(t)]:0;++t;const a=t<e.length?n[e.charAt(t)]:64;++t;const c=t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==s||null==a||null==c)throw new o;const u=i<<2|s>>4;if(r.push(u),64!==a){const e=s<<4&240|a>>2;if(r.push(e),64!==c){const e=a<<6&192|c;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class o extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}n.DecodeBase64StringError=o;const c=function(e){const t=s(e);return a.encodeByteArray(t,!0)};n.base64Encode=c;const u=function(e){return c(e).replace(/\./g,"")};n.base64urlEncodeWithoutPadding=u;const l=function(e){try{return a.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:e===undefined&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=d(e[n],t[n]));return e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function h(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.base64Decode=l;const p=()=>{try{return h().__FIREBASE_DEFAULTS__||(()=>{if(void 0===e||void 0===e.env)return})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&l(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}};n.getDefaults=p;const f=e=>{var t,n;return null===(n=null===(t=p())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]};n.getDefaultEmulatorHost=f;n.getDefaultEmulatorHostnameAndPort=e=>{const t=f(e);if(!t)return undefined;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]};n.getDefaultAppConfig=()=>{var e;return null===(e=p())||void 0===e?void 0:e.config};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.getExperimentalSetting=e=>{var t;return null===(t=p())||void 0===t?void 0:t[`_${e}`]};class g{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function y(){var e;const t=null===(e=p())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return!1}}n.Deferred=g;class b extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,b.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,w.prototype.create)}}n.FirebaseError=b;class w{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?function(e,t){return e.replace(v,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(i,n):"Error",a=`${this.serviceName}: ${s} (${r}).`;return new b(r,a,n)}}n.ErrorFactory=w;const v=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(e){return JSON.parse(e)}const S=function(e){let t={},n={},r={},i="";try{const s=e.split(".");t=_(l(s[0])||""),n=_(l(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch(e){}return{header:t,claims:n,data:r,signature:i}};n.decode=S;n.isValidTimestamp=function(e){const t=S(e).claims,n=Math.floor((new Date).getTime()/1e3);let r=0,i=0;return"object"==typeof t&&(t.hasOwnProperty("nbf")?r=t.nbf:t.hasOwnProperty("iat")&&(r=t.iat),i=t.hasOwnProperty("exp")?t.exp:r+86400),!!n&&!!r&&!!i&&n>=r&&n<=i};n.issuedAtTime=function(e){const t=S(e).claims;return"object"==typeof t&&t.hasOwnProperty("iat")?t.iat:null};n.isValidFormat=function(e){const t=S(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")};function k(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.isAdmin=function(e){const t=S(e).claims;return"object"==typeof t&&!0===t.admin};n.Sha1=class{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"==typeof e)for(let r=0;r<16;r++)n[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let r=0;r<16;r++)n[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){const t=n[e-3]^n[e-8]^n[e-14]^n[e-16];n[e]=4294967295&(t<<1|t>>>31)}let r,i,s=this.chain_[0],a=this.chain_[1],o=this.chain_[2],c=this.chain_[3],u=this.chain_[4];for(let e=0;e<80;e++){e<40?e<20?(r=c^a&(o^c),i=1518500249):(r=a^o^c,i=1859775393):e<60?(r=a&o|c&(a|o),i=2400959708):(r=a^o^c,i=3395469782);const t=(s<<5|s>>>27)+r+u+i+n[e]&4294967295;u=c,c=o,o=4294967295&(a<<30|a>>>2),a=s,s=t}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+a&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(null==e)return;t===undefined&&(t=e.length);const n=t-this.blockSize;let r=0;const i=this.buf_;let s=this.inbuf_;for(;r<t;){if(0===s)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"==typeof e){for(;r<t;)if(i[s]=e.charCodeAt(r),++s,++r,s===this.blockSize){this.compress_(i),s=0;break}}else for(;r<t;)if(i[s]=e[r],++s,++r,s===this.blockSize){this.compress_(i),s=0;break}}this.inbuf_=s,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let t=0;t<5;t++)for(let r=24;r>=0;r-=8)e[n]=this.chain_[t]>>r&255,++n;return e}};class E{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let r;if(e===undefined&&t===undefined&&n===undefined)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},r.next===undefined&&(r.next=T),r.error===undefined&&(r.error=T),r.complete===undefined&&(r.complete=T);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}})),this.observers.push(r),i}unsubscribeOne(e){this.observers!==undefined&&this.observers[e]!==undefined&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&this.onNoObservers!==undefined&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(this.observers!==undefined&&this.observers[e]!==undefined)try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))}close(e){this.finalized||(this.finalized=!0,e!==undefined&&(this.finalError=e),this.task.then((()=>{this.observers=undefined,this.onNoObservers=undefined})))}}function T(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A(e,t){return`${e} failed: ${t} argument `}n.validateArgCount=function(e,t,n,r){let i;if(r<t?i="at least "+t:r>n&&(i=0===n?"none":"no more than "+n),i){throw new Error(e+" failed: Was called with "+r+(1===r?" argument.":" arguments.")+" Expects "+i+".")}};n.stringToByteArray=function(e){const t=[];let n=0;for(let i=0;i<e.length;i++){let s=e.charCodeAt(i);if(s>=55296&&s<=56319){const t=s-55296;i++,r(i<e.length,"Surrogate pair missing trail surrogate.");s=65536+(t<<10)+(e.charCodeAt(i)-56320)}s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):s<65536?(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.stringLength=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.uuidv4=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(e=>{const t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))};const M=1e3,C=2,P=n.MAX_VALUE_MILLIS=144e5,O=n.RANDOM_FACTOR=.5}).call(this)}).call(this,e("_process"))}}},{package:"firebase>@firebase/util",file:"node_modules/@firebase/util/dist/index.esm2017.js"}],[579,{"@ethereumjs/tx":429,"@ethereumjs/util":441,"@keystonehq/bc-ur-registry-eth":584,buffer:2983,hdkey:3573,rlp:4205,uuid:4354},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){function r(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(n,"__esModule",{value:!0});var i=r(e("hdkey")),s=e("@ethereumjs/util"),a=r(e("rlp")),o=e("@ethereumjs/tx"),c=e("@keystonehq/bc-ur-registry-eth"),u=e("uuid");const l="QR Hardware Wallet Device",d="m",h="0/*";var p,f;!function(e){e.hd="hd",e.pubkey="pubkey"}(p||(p={})),function(e){e.standard="account.standard",e.ledger_live="account.ledger_live",e.ledger_legacy="account.ledger_legacy"}(f||(f={}));class g{constructor(e){this.version=1,this.getInteraction=()=>{throw new Error("KeystoneError#invalid_extends: method getInteraction not implemented, please extend BaseKeyring by overwriting this method.")},this.type=l,this.requestSignature=async(e,t,n,r)=>{const i=await this.getInteraction().requestSignature(t,n,r),s=i.getRequestId(),a=i.getSignature();if(s){if(u.stringify(s)!==e)throw new Error("KeystoneError#invalid_data: read signature error: mismatched requestId")}return{r:a.slice(0,32),s:a.slice(32,64),v:a.slice(64)}},this.__readCryptoHDKey=e=>{var t,n;const r=`m/${e.getOrigin().getPath()}`,i=null==(t=e.getOrigin().getSourceFingerprint())?void 0:t.toString("hex"),s=(null==(n=e.getChildren())?void 0:n.getPath())||h,a=e.getName();if(e.getNote()===f.standard?this.keyringAccount=f.standard:e.getNote()===f.ledger_legacy&&(this.keyringAccount=f.ledger_legacy),!i)throw new Error("KeystoneError#invalid_data: invalid crypto-hdkey, cannot get source fingerprint");const o=e.getBip32Key();this.xfp=i,this.xpub=o,this.hdPath=r,this.childrenPath=s,a!==undefined&&""!==a&&(this.name=a),this.initialized=!0},this.__readCryptoAccount=e=>{var t,n;const r=null==(t=e.getMasterFingerprint())?void 0:t.toString("hex");if(!r)throw new Error("KeystoneError#invalid_data: invalid crypto-account, cannot get master fingerprint");this.xfp=r,this.initialized=!0;let i=!1;const a=e.getOutputDescriptors();if(!a||0===a.length)throw new Error("KeystoneError#invalid_data: invalid crypto-account, no crypto output found");if(a.length%5!=0)throw new Error("KeystoneError#invalid_data: only support 5x pubkey accounts for now");return null==(n=e.getOutputDescriptors())||n.forEach((e=>{try{const t=e.getHDKey();if(t){const e=t.getKey(),n=`M/${t.getOrigin().getPath()}`,r="0x"+s.publicToAddress(e,!0).toString("hex");this.name=t.getName(),t.getNote()===f.ledger_live&&(this.keyringAccount=f.ledger_live),this.paths[s.toChecksumAddress(r)]===undefined&&(i=!0),this.paths[s.toChecksumAddress(r)]=n}}catch(e){throw new Error(`KeystoneError#invalid_data: ${e}`)}})),i},this.getName=()=>this.name,this.setAccountToUnlock=e=>{this.unlockedAccount=parseInt(e,10)},this.__getNormalPage=async e=>{this.page+=e,this.page<=0&&(this.page=1);const t=(this.page-1)*this.perPage,n=t+this.perPage,r=[];for(let e=t;e<n;e++){const t=await this.__addressFromIndex(d,e);r.push({address:t,balance:null,index:e}),this.indexes[s.toChecksumAddress(t)]=e}return r},this.__getLedgerLivePage=async e=>{const t=(this.page+e-1)*this.perPage,n=t+this.perPage,r=[];for(let e=t;e<n;e++){const t=await this.__addressFromIndex(d,e);r.push({address:t,balance:null,index:e})}return this.page+=e,r},this.__addressFromIndex=async(e,t)=>{if(this.keyringMode===p.hd){this.checkKeyring(),this.hdk||(this.hdk=i.fromExtendedKey(this.xpub));const n=this.childrenPath.replace("*",String(t)).replace(/\*/g,"0"),r=this.hdk.derive(`${e}/${n}`),a="0x"+s.publicToAddress(r.publicKey,!0).toString("hex");return s.toChecksumAddress(a)}{const e=Object.keys(this.paths)[t];if(e)return s.toChecksumAddress(e);throw new Error("KeystoneError#pubkey_account.no_expected_account")}},this.page=0,this.perPage=5,this.accounts=[],this.currentAccount=0,this.unlockedAccount=0,this.name="QR Hardware",this.keyringMode=p.hd,this.keyringAccount=f.standard,this.initialized=!1,this.xfp="",this.xpub="",this.hdPath="",this.childrenPath=h,this.indexes={},this.paths={},this.deserialize(e)}async readKeyring(){const e=await this.getInteraction().readCryptoHDKeyOrCryptoAccount();this.syncKeyring(e)}syncKeyring(e){e.getRegistryType().getType()===c.extend.RegistryTypes.CRYPTO_HDKEY.getType()?(this.keyringMode=p.hd,this.__readCryptoHDKey(e)):(this.keyringMode=p.pubkey,this.__readCryptoAccount(e))}checkKeyring(){if(!this.xfp||!this.xpub||!this.hdPath)throw new Error("KeystoneError#invalid_keyring: keyring not fulfilled, please call function `readKeyring` firstly")}serialize(){return Promise.resolve({initialized:this.initialized,accounts:this.accounts,currentAccount:this.currentAccount,page:this.page,perPage:this.perPage,keyringAccount:this.keyringAccount,keyringMode:this.keyringMode,name:this.name,version:this.version,xfp:this.xfp,xpub:this.xpub,hdPath:this.hdPath,childrenPath:this.childrenPath,indexes:this.indexes,paths:this.paths})}deserialize(e){e&&(this.accounts=e.accounts,this.currentAccount=e.currentAccount,this.page=e.page,this.perPage=e.perPage,this.name=e.name,this.initialized=e.initialized,this.keyringMode=e.keyringMode||p.hd,this.keyringAccount=e.keyringAccount||f.standard,this.xfp=e.xfp,this.xpub=e.xpub,this.hdPath=e.hdPath,this.indexes=e.indexes,this.paths=e.paths,this.childrenPath=e.childrenPath||h)}setCurrentAccount(e){this.currentAccount=e}getCurrentAccount(){return this.currentAccount}getCurrentAddress(){return this.accounts[this.currentAccount]}async addAccounts(e=1){const t=this.unlockedAccount,n=t+e,r=[];for(let e=t;e<n;e++){const t=await this.__addressFromIndex(d,e);r.push(t),this.page=0,this.unlockedAccount++}return this.accounts=this.accounts.concat(r),this.accounts}getFirstPage(){return this.page=0,this.__getPage(1)}getNextPage(){return this.__getPage(1)}getPreviousPage(){return this.__getPage(-1)}async __getPage(e){return this.initialized||await this.readKeyring(),this.keyringMode===p.hd?this.__getNormalPage(e):this.__getLedgerLivePage(e)}getAccounts(){return Promise.resolve(this.accounts)}removeAccount(e){if(!this.accounts.map((e=>e.toLowerCase())).includes(e.toLowerCase()))throw new Error(`Address ${e} not found in this keyring`);this.accounts=this.accounts.filter((t=>t.toLowerCase()!==e.toLowerCase()))}async signTransaction(e,n){const r=0===n.type?c.DataType.transaction:c.DataType.typedTransaction;let i;i=0===n.type?t.from(a.encode(n.getMessageToSign(!1))):n.getMessageToSign(!1);const s=await this._pathFromAddress(e),l=Number(n.common.chainId()),d=u.v4(),h=c.EthSignRequest.constructETHRequest(i,r,s,this.xfp,d,l),{r:p,s:f,v:g}=await this.requestSignature(d,h,"Scan with your Keystone",'After your Keystone has signed the transaction, click on "Scan Keystone" to receive the signature');return o.TransactionFactory.fromTxData({...n.toJSON(),type:n.type,r:p,s:f,v:g},{common:n.common})}signMessage(e,t){return this.signPersonalMessage(e,t)}async signPersonalMessage(e,n){const r=s.stripHexPrefix(n),i=await this._pathFromAddress(e),a=u.v4(),o=c.EthSignRequest.constructETHRequest(t.from(r,"hex"),c.DataType.personalMessage,i,this.xfp,a,undefined,e),{r:l,s:d,v:h}=await this.requestSignature(a,o,"Scan with your Keystone",'After your Keystone has signed this message, click on "Scan Keystone" to receive the signature');return"0x"+t.concat([l,d,h]).toString("hex")}async signTypedData(e,n){const r=await this._pathFromAddress(e),i=u.v4(),s=c.EthSignRequest.constructETHRequest(t.from(JSON.stringify(n),"utf-8"),c.DataType.typedData,r,this.xfp,i,undefined,e),{r:a,s:o,v:l}=await this.requestSignature(i,s,"Scan with your Keystone",'After your Keystone has signed this data, click on "Scan Keystone" to receive the signature');return"0x"+t.concat([a,o,l]).toString("hex")}async _pathFromAddress(e){if(this.keyringMode===p.hd){const t=s.toChecksumAddress(e);let n=this.indexes[t];if(void 0===n)for(let e=0;e<1e3;e++)if(t===await this.__addressFromIndex(d,e)){n=e;break}if(void 0===n)throw new Error("Unknown address");return`${this.hdPath}/${this.childrenPath.replace("*",n.toString()).replace(/\*/g,"0")}`}{const t=s.toChecksumAddress(e),n=this.paths[t];if(void 0===n)throw new Error("Unknown address");return n}}}g.type=l,n.BaseKeyring=g}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/metamask-airgapped-keyring>@keystonehq/base-eth-keyring",file:"node_modules/@keystonehq/base-eth-keyring/dist/base-eth-keyring.cjs.development.js"}],[58,{"../../../shared/constants/time":4447,loglevel:3789,"readable-stream":4188},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.THREE_MINUTES=void 0,n.default=function(){const e=c();return new i.Transform({transform(t,n,r){const i=t.id===undefined,a=e.add(t.id);i||a?r(null,t):(s.default.debug(`RPC request with id "${t.id}" already seen.`),r())},objectMode:!0})};var r,i=e("readable-stream"),s=(r=e("loglevel"))&&r.__esModule?r:{default:r},a=e("../../../shared/constants/time");const o=n.THREE_MINUTES=3*a.MINUTE,c=()=>{const e=new Map;return setInterval((()=>{const t=Date.now()-o;for(const[n,r]of e.entries()){if(!(r<=t))break;e.delete(n)}}),o),{add:t=>!e.has(t)&&(e.set(t,Date.now()),!0)}}}}},{package:"$root$",file:"app/scripts/lib/createDupeReqFilterStream.ts"}],[580,{"@ethereumjs/tx":429,"@ethereumjs/util":441,"@keystonehq/bc-ur-registry-eth":584,buffer:2983,hdkey:3573,rlp:4205,uuid:4354},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){function r(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(n,"__esModule",{value:!0});var i,s,a=r(e("hdkey")),o=e("@ethereumjs/util"),c=r(e("rlp")),u=e("@ethereumjs/tx"),l=e("@keystonehq/bc-ur-registry-eth"),d=e("uuid");!function(e){e.hd="hd",e.pubkey="pubkey"}(i||(i={})),function(e){e.standard="account.standard",e.ledger_live="account.ledger_live",e.ledger_legacy="account.ledger_legacy"}(s||(s={}));class h{constructor(e){this.version=1,this.getInteraction=()=>{throw new Error("KeystoneError#invalid_extends: method getInteraction not implemented, please extend BaseKeyring by overwriting this method.")},this.type="QR Hardware Wallet Device",this.requestSignature=async(e,t,n,r)=>{const i=await this.getInteraction().requestSignature(t,n,r),s=i.getRequestId(),a=i.getSignature();if(s&&d.stringify(s)!==e)throw new Error("KeystoneError#invalid_data: read signature error: mismatched requestId");return{r:a.slice(0,32),s:a.slice(32,64),v:a.slice(64)}},this.__readCryptoHDKey=e=>{var t,n;const r="m/"+e.getOrigin().getPath(),i=null==(t=e.getOrigin().getSourceFingerprint())?void 0:t.toString("hex"),a=(null==(n=e.getChildren())?void 0:n.getPath())||"0/*",o=e.getName();if(e.getNote()===s.standard?this.keyringAccount=s.standard:e.getNote()===s.ledger_legacy&&(this.keyringAccount=s.ledger_legacy),!i)throw new Error("KeystoneError#invalid_data: invalid crypto-hdkey, cannot get source fingerprint");const c=e.getBip32Key();this.xfp=i,this.xpub=c,this.hdPath=r,this.childrenPath=a,void 0!==o&&""!==o&&(this.name=o),this.initialized=!0},this.__readCryptoAccount=e=>{var t,n;const r=null==(t=e.getMasterFingerprint())?void 0:t.toString("hex");if(!r)throw new Error("KeystoneError#invalid_data: invalid crypto-account, cannot get master fingerprint");this.xfp=r,this.initialized=!0;let i=!1;const a=e.getOutputDescriptors();if(!a||0===a.length)throw new Error("KeystoneError#invalid_data: invalid crypto-account, no crypto output found");if(a.length%5!=0)throw new Error("KeystoneError#invalid_data: only support 5x pubkey accounts for now");return null==(n=e.getOutputDescriptors())||n.forEach((e=>{try{const t=e.getHDKey();if(t){const e=t.getKey(),n="M/"+t.getOrigin().getPath(),r="0x"+o.publicToAddress(e,!0).toString("hex");this.name=t.getName(),t.getNote()===s.ledger_live&&(this.keyringAccount=s.ledger_live),void 0===this.paths[o.toChecksumAddress(r)]&&(i=!0),this.paths[o.toChecksumAddress(r)]=n}}catch(e){throw new Error("KeystoneError#invalid_data: "+e)}})),i},this.getName=()=>this.name,this.setAccountToUnlock=e=>{this.unlockedAccount=parseInt(e,10)},this.__getNormalPage=async e=>{this.page+=e,this.page<=0&&(this.page=1);const t=(this.page-1)*this.perPage,n=t+this.perPage,r=[];for(let e=t;e<n;e++){const t=await this.__addressFromIndex("m",e);r.push({address:t,balance:null,index:e}),this.indexes[o.toChecksumAddress(t)]=e}return r},this.__getLedgerLivePage=async e=>{const t=(this.page+e-1)*this.perPage,n=t+this.perPage,r=[];for(let e=t;e<n;e++){const t=await this.__addressFromIndex("m",e);r.push({address:t,balance:null,index:e})}return this.page+=e,r},this.__addressFromIndex=async(e,t)=>{if(this.keyringMode===i.hd){this.checkKeyring(),this.hdk||(this.hdk=a.fromExtendedKey(this.xpub));const n=this.childrenPath.replace("*",String(t)).replace(/\*/g,"0"),r=this.hdk.derive(`${e}/${n}`),i="0x"+o.publicToAddress(r.publicKey,!0).toString("hex");return o.toChecksumAddress(i)}{const e=Object.keys(this.paths)[t];if(e)return o.toChecksumAddress(e);throw new Error("KeystoneError#pubkey_account.no_expected_account")}},this.page=0,this.perPage=5,this.accounts=[],this.currentAccount=0,this.unlockedAccount=0,this.name="QR Hardware",this.keyringMode=i.hd,this.keyringAccount=s.standard,this.initialized=!1,this.xfp="",this.xpub="",this.hdPath="",this.childrenPath="0/*",this.indexes={},this.paths={},this.deserialize(e)}async readKeyring(){const e=await this.getInteraction().readCryptoHDKeyOrCryptoAccount();this.syncKeyring(e)}syncKeyring(e){e.getRegistryType().getType()===l.extend.RegistryTypes.CRYPTO_HDKEY.getType()?(this.keyringMode=i.hd,this.__readCryptoHDKey(e)):(this.keyringMode=i.pubkey,this.__readCryptoAccount(e))}checkKeyring(){if(!this.xfp||!this.xpub||!this.hdPath)throw new Error("KeystoneError#invalid_keyring: keyring not fulfilled, please call function `readKeyring` firstly")}serialize(){return Promise.resolve({initialized:this.initialized,accounts:this.accounts,currentAccount:this.currentAccount,page:this.page,perPage:this.perPage,keyringAccount:this.keyringAccount,keyringMode:this.keyringMode,name:this.name,version:this.version,xfp:this.xfp,xpub:this.xpub,hdPath:this.hdPath,childrenPath:this.childrenPath,indexes:this.indexes,paths:this.paths})}deserialize(e){e&&(this.accounts=e.accounts,this.currentAccount=e.currentAccount,this.page=e.page,this.perPage=e.perPage,this.name=e.name,this.initialized=e.initialized,this.keyringMode=e.keyringMode||i.hd,this.keyringAccount=e.keyringAccount||s.standard,this.xfp=e.xfp,this.xpub=e.xpub,this.hdPath=e.hdPath,this.indexes=e.indexes,this.paths=e.paths,this.childrenPath=e.childrenPath||"0/*")}setCurrentAccount(e){this.currentAccount=e}getCurrentAccount(){return this.currentAccount}getCurrentAddress(){return this.accounts[this.currentAccount]}async addAccounts(e=1){const t=this.unlockedAccount,n=t+e,r=[];for(let e=t;e<n;e++){const t=await this.__addressFromIndex("m",e);r.push(t),this.page=0,this.unlockedAccount++}return this.accounts=this.accounts.concat(r),this.accounts}getFirstPage(){return this.page=0,this.__getPage(1)}getNextPage(){return this.__getPage(1)}getPreviousPage(){return this.__getPage(-1)}async __getPage(e){return this.initialized||await this.readKeyring(),this.keyringMode===i.hd?this.__getNormalPage(e):this.__getLedgerLivePage(e)}getAccounts(){return Promise.resolve(this.accounts)}removeAccount(e){if(!this.accounts.map((e=>e.toLowerCase())).includes(e.toLowerCase()))throw new Error(`Address ${e} not found in this keyring`);this.accounts=this.accounts.filter((t=>t.toLowerCase()!==e.toLowerCase()))}async signTransaction(e,n){const r=0===n.type?l.DataType.transaction:l.DataType.typedTransaction;let i;i=0===n.type?t.from(c.encode(n.getMessageToSign(!1))):n.getMessageToSign(!1);const s=await this._pathFromAddress(e),a=Number(n.common.chainId()),o=d.v4(),h=l.EthSignRequest.constructETHRequest(i,r,s,this.xfp,o,a),{r:p,s:f,v:g}=await this.requestSignature(o,h,"Scan with your Keystone",'After your Keystone has signed the transaction, click on "Scan Keystone" to receive the signature');return u.TransactionFactory.fromTxData({...n.toJSON(),type:n.type,r:p,s:f,v:g},{common:n.common})}signMessage(e,t){return this.signPersonalMessage(e,t)}async signPersonalMessage(e,n){const r=o.stripHexPrefix(n),i=await this._pathFromAddress(e),s=d.v4(),a=l.EthSignRequest.constructETHRequest(t.from(r,"hex"),l.DataType.personalMessage,i,this.xfp,s,void 0,e),{r:c,s:u,v:h}=await this.requestSignature(s,a,"Scan with your Keystone",'After your Keystone has signed this message, click on "Scan Keystone" to receive the signature');return"0x"+t.concat([c,u,h]).toString("hex")}async signTypedData(e,n){const r=await this._pathFromAddress(e),i=d.v4(),s=l.EthSignRequest.constructETHRequest(t.from(JSON.stringify(n),"utf-8"),l.DataType.typedData,r,this.xfp,i,void 0,e),{r:a,s:o,v:c}=await this.requestSignature(i,s,"Scan with your Keystone",'After your Keystone has signed this data, click on "Scan Keystone" to receive the signature');return"0x"+t.concat([a,o,c]).toString("hex")}async _pathFromAddress(e){if(this.keyringMode===i.hd){const t=o.toChecksumAddress(e);let n=this.indexes[t];if(void 0===n)for(let e=0;e<1e3;e++)if(t===await this.__addressFromIndex("m",e)){n=e;break}if(void 0===n)throw new Error("Unknown address");return`${this.hdPath}/${this.childrenPath.replace("*",n.toString()).replace(/\*/g,"0")}`}{const t=o.toChecksumAddress(e),n=this.paths[t];if(void 0===n)throw new Error("Unknown address");return n}}}h.type="QR Hardware Wallet Device",n.BaseKeyring=h}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/metamask-airgapped-keyring>@keystonehq/base-eth-keyring",file:"node_modules/@keystonehq/base-eth-keyring/dist/base-eth-keyring.cjs.production.min.js"}],[581,{"./base-eth-keyring.cjs.development.js":579,"./base-eth-keyring.cjs.production.min.js":580},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){t.exports=e("./base-eth-keyring.cjs.production.min.js")}}},{package:"@keystonehq/metamask-airgapped-keyring>@keystonehq/base-eth-keyring",file:"node_modules/@keystonehq/base-eth-keyring/dist/index.js"}],[59,{loglevel:3789},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return function(t,n,r){r((r=>{n.error&&i.default.debug("Error in RPC response:\n",n),t.isMetamaskInternal||(i.default.info(`RPC (${e.origin}): ${t.method} -> ${n.error?"error":"success"}`),r())}))}};var r,i=(r=e("loglevel"))&&r.__esModule?r:{default:r}}}},{package:"$root$",file:"app/scripts/lib/createLoggerMiddleware.js"}],[6,{"@metamask/base-controller":1157},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.AccountOrderController=void 0;var r=e("@metamask/base-controller");const i={pinnedAccountList:[],hiddenAccountList:[]},s={pinnedAccountList:{persist:!0,anonymous:!0},hiddenAccountList:{persist:!0,anonymous:!0}};class a extends r.BaseController{constructor({messenger:e,state:t}){super({messenger:e,metadata:s,name:"AccountOrderController",state:{...i,...t}})}updateAccountsList(e){this.update((t=>(t.pinnedAccountList=e,t)))}updateHiddenAccountsList(e){this.update((t=>(t.hiddenAccountList=e,t)))}}n.AccountOrderController=a}}},{package:"$root$",file:"app/scripts/controllers/account-order.ts"}],[60,{"./stream-utils":114,"eth-rpc-errors":3205},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("eth-rpc-errors"),i=e("./stream-utils");n.default=(e,t)=>async n=>{if(!(0,i.isStreamWritable)(t))return;if(!e[n.method])return void t.write({jsonrpc:"2.0",error:r.ethErrors.rpc.methodNotFound({message:`${n.method} not found`}),id:n.id});let s,a;try{s=await e[n.method](...n.params)}catch(e){a=e}(0,i.isStreamWritable)(t)?a?t.write({jsonrpc:"2.0",error:(0,r.serializeError)(a,{shouldIncludeStack:!0}),id:n.id}):t.write({jsonrpc:"2.0",result:s,id:n.id}):a&&console.error(a)}}}},{package:"$root$",file:"app/scripts/lib/createMetaRPCHandler.js"}],[61,{"./middleware/pending":79,"@metamask/eth-json-rpc-middleware":1247,"json-rpc-engine":3627},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function({version:e,getAccounts:t,processTransaction:n,processEthSignMessage:a,processTypedMessage:o,processTypedMessageV3:c,processTypedMessageV4:u,processPersonalMessage:l,processDecryptMessage:d,processEncryptionPublicKey:h,getPendingNonce:p,getPendingTransactionByHash:f}){return(0,r.mergeMiddleware)([(0,r.createScaffoldMiddleware)({eth_syncing:!1,web3_clientVersion:`MetaMask/v${e}`}),(0,i.createWalletMiddleware)({getAccounts:t,processTransaction:n,processEthSignMessage:a,processTypedMessage:o,processTypedMessageV3:c,processTypedMessageV4:u,processPersonalMessage:l,processDecryptMessage:d,processEncryptionPublicKey:h}),(0,s.createPendingNonceMiddleware)({getPendingNonce:p}),(0,s.createPendingTxMiddleware)({getPendingTransactionByHash:f})])};var r=e("json-rpc-engine"),i=e("@metamask/eth-json-rpc-middleware"),s=e("./middleware/pending")}}},{package:"$root$",file:"app/scripts/lib/createMetamaskMiddleware.js"}],[611,{"./metamask-airgapped-keyring.cjs.development.js":612,"./metamask-airgapped-keyring.cjs.production.min.js":613},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){t.exports=e("./metamask-airgapped-keyring.cjs.production.min.js")}}},{package:"@keystonehq/metamask-airgapped-keyring",file:"node_modules/@keystonehq/metamask-airgapped-keyring/dist/index.js"}],[612,{"@ethereumjs/tx":429,"@keystonehq/base-eth-keyring":581,"@keystonehq/bc-ur-registry-eth":584,"@metamask/obs-store":618,buffer:2983,events:3276,rlp:631,uuid:4354},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){Object.defineProperty(n,"__esModule",{value:!0});var r,i=e("@keystonehq/base-eth-keyring"),s=e("events"),a=e("@metamask/obs-store"),o=e("@keystonehq/bc-ur-registry-eth"),c=e("uuid"),u=e("@ethereumjs/tx"),l=(r=e("rlp"))&&"object"==typeof r&&"default"in r?r.default:r;class d extends s.EventEmitter{constructor(){if(super(),this.cleanSyncListeners=()=>{this.removeAllListeners("keystone-sync_success-hdkey"),this.removeAllListeners("keystone-sync_success-account"),this.removeAllListeners("keystone-sync_cancel")},this.cleanSignListeners=e=>{this.removeAllListeners(`${e}-signed`),this.removeAllListeners(`${e}-canceled`)},this.readCryptoHDKeyOrCryptoAccount=()=>new Promise(((e,n)=>{this.memStore.updateState({sync:{reading:!0}}),this.on("keystone-sync_success-hdkey",(n=>{const r=o.CryptoHDKey.fromCBOR(t.from(n,"hex"));this.resetState(),e(r)})),this.on("keystone-sync_success-account",(n=>{const r=o.CryptoAccount.fromCBOR(t.from(n,"hex"));this.resetState(),e(r)})),this.on("keystone-sync_cancel",(()=>{this.resetState(),n(new Error("KeystoneError#sync_cancel. Sync process canceled, please retry"))}))})),this.submitCryptoHDKey=e=>{this.emit("keystone-sync_success-hdkey",e)},this.submitCryptoAccount=e=>{this.emit("keystone-sync_success-account",e)},this.cancelSync=()=>{this.emit("keystone-sync_cancel")},this.requestSignature=(e,n,r)=>new Promise(((i,s)=>{const a=e.toUR(),u=e.getRequestId(),l=c.stringify(u),d={requestId:l,payload:{type:a.type,cbor:a.cbor.toString("hex")},title:n,description:r};this.memStore.updateState({sign:{request:d}}),this.once(`${l}-signed`,(e=>{const n=o.ETHSignature.fromCBOR(t.from(e,"hex"));this.resetState(),i(n)})),this.once(`${l}-canceled`,(()=>{this.resetState(),s(new Error("KeystoneError#Tx_canceled. Signing canceled, please retry"))}))})),this.submitSignature=(e,t)=>{this.emit(`${e}-signed`,t)},this.cancelRequestSignature=()=>{const e=this.memStore.getState().sign.request;if(e){const{requestId:t}=e;this.memStore.updateState({sign:{}}),this.emit(`${t}-canceled`)}},this.reset=()=>{this.cleanSyncListeners();const e=this.memStore.getState().sign.request;if(e){const{requestId:t}=e;this.cleanSignListeners(t)}this.resetState()},this.resetState=()=>{this.memStore.updateState({sync:{reading:!1},sign:{}})},d.instance)return d.instance;this.memStore=new a.ObservableStore({sync:{reading:!1},sign:{},_version:1}),d.instance=this}}class h extends i.BaseKeyring{constructor(e){if(super(e),this.getInteraction=()=>new d,this.resetStore=()=>{this.getInteraction().reset()},this.getMemStore=()=>this.getInteraction().memStore,this.removeAccount=e=>{if(!this.accounts.map((e=>e.toLowerCase())).includes(e.toLowerCase()))throw new Error(`Address ${e} not found in this keyring`);this.accounts=this.accounts.filter((t=>t.toLowerCase()!==e.toLowerCase()))},this.forgetDevice=()=>{this.page=0,this.perPage=5,this.accounts=[],this.currentAccount=0,this.name="QR Hardware",this.initialized=!1,this.xfp="",this.xpub="",this.hdPath="",this.indexes={},this.hdk=undefined,this.paths={}},this.submitCryptoHDKey=this.getInteraction().submitCryptoHDKey,this.submitCryptoAccount=this.getInteraction().submitCryptoAccount,this.submitSignature=this.getInteraction().submitSignature,this.cancelSync=this.getInteraction().cancelSync,this.cancelSignRequest=this.getInteraction().cancelRequestSignature,h.instance)return h.instance.deserialize(e),h.instance;h.instance=this}async signTransaction(e,t){const n=0===t.type?o.DataType.transaction:o.DataType.typedTransaction;let r;r=0===t.type?l.encode(t.getMessageToSign(!1)):t.getMessageToSign(!1);const i=await this._pathFromAddress(e),s=t.common.chainId(),a=c.v4(),d=o.EthSignRequest.constructETHRequest(r,n,i,this.xfp,a,s,e),{r:h,s:p,v:f}=await this.requestSignature(a,d,"Scan with your Keystone",'After your Keystone has signed the transaction, click on "Scan Keystone" to receive the signature'),g=t.toJSON();g.v=f,g.s=p,g.r=h,g.type=t.type;return u.TransactionFactory.fromTxData(g,{common:t.common})}}h.type=i.BaseKeyring.type,n.MetaMaskKeyring=h}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/metamask-airgapped-keyring",file:"node_modules/@keystonehq/metamask-airgapped-keyring/dist/metamask-airgapped-keyring.cjs.development.js"}],[613,{"@ethereumjs/tx":429,"@keystonehq/base-eth-keyring":581,"@keystonehq/bc-ur-registry-eth":584,"@metamask/obs-store":618,buffer:2983,events:3276,rlp:631,uuid:4354},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){Object.defineProperty(n,"__esModule",{value:!0});var r,i=e("@keystonehq/base-eth-keyring"),s=e("events"),a=e("@metamask/obs-store"),o=e("@keystonehq/bc-ur-registry-eth"),c=e("uuid"),u=e("@ethereumjs/tx"),l=(r=e("rlp"))&&"object"==typeof r&&"default"in r?r.default:r;class d extends s.EventEmitter{constructor(){if(super(),this.cleanSyncListeners=()=>{this.removeAllListeners("keystone-sync_success-hdkey"),this.removeAllListeners("keystone-sync_success-account"),this.removeAllListeners("keystone-sync_cancel")},this.cleanSignListeners=e=>{this.removeAllListeners(e+"-signed"),this.removeAllListeners(e+"-canceled")},this.readCryptoHDKeyOrCryptoAccount=()=>new Promise(((e,n)=>{this.memStore.updateState({sync:{reading:!0}}),this.on("keystone-sync_success-hdkey",(n=>{const r=o.CryptoHDKey.fromCBOR(t.from(n,"hex"));this.resetState(),e(r)})),this.on("keystone-sync_success-account",(n=>{const r=o.CryptoAccount.fromCBOR(t.from(n,"hex"));this.resetState(),e(r)})),this.on("keystone-sync_cancel",(()=>{this.resetState(),n(new Error("KeystoneError#sync_cancel. Sync process canceled, please retry"))}))})),this.submitCryptoHDKey=e=>{this.emit("keystone-sync_success-hdkey",e)},this.submitCryptoAccount=e=>{this.emit("keystone-sync_success-account",e)},this.cancelSync=()=>{this.emit("keystone-sync_cancel")},this.requestSignature=(e,n,r)=>new Promise(((i,s)=>{const a=e.toUR(),u=e.getRequestId(),l=c.stringify(u),d={requestId:l,payload:{type:a.type,cbor:a.cbor.toString("hex")},title:n,description:r};this.memStore.updateState({sign:{request:d}}),this.once(l+"-signed",(e=>{const n=o.ETHSignature.fromCBOR(t.from(e,"hex"));this.resetState(),i(n)})),this.once(l+"-canceled",(()=>{this.resetState(),s(new Error("KeystoneError#Tx_canceled. Signing canceled, please retry"))}))})),this.submitSignature=(e,t)=>{this.emit(e+"-signed",t)},this.cancelRequestSignature=()=>{const e=this.memStore.getState().sign.request;if(e){const{requestId:t}=e;this.memStore.updateState({sign:{}}),this.emit(t+"-canceled")}},this.reset=()=>{this.cleanSyncListeners();const e=this.memStore.getState().sign.request;if(e){const{requestId:t}=e;this.cleanSignListeners(t)}this.resetState()},this.resetState=()=>{this.memStore.updateState({sync:{reading:!1},sign:{}})},d.instance)return d.instance;this.memStore=new a.ObservableStore({sync:{reading:!1},sign:{},_version:1}),d.instance=this}}class h extends i.BaseKeyring{constructor(e){if(super(e),this.getInteraction=()=>new d,this.resetStore=()=>{this.getInteraction().reset()},this.getMemStore=()=>this.getInteraction().memStore,this.removeAccount=e=>{if(!this.accounts.map((e=>e.toLowerCase())).includes(e.toLowerCase()))throw new Error(`Address ${e} not found in this keyring`);this.accounts=this.accounts.filter((t=>t.toLowerCase()!==e.toLowerCase()))},this.forgetDevice=()=>{this.page=0,this.perPage=5,this.accounts=[],this.currentAccount=0,this.name="QR Hardware",this.initialized=!1,this.xfp="",this.xpub="",this.hdPath="",this.indexes={},this.hdk=void 0,this.paths={}},this.submitCryptoHDKey=this.getInteraction().submitCryptoHDKey,this.submitCryptoAccount=this.getInteraction().submitCryptoAccount,this.submitSignature=this.getInteraction().submitSignature,this.cancelSync=this.getInteraction().cancelSync,this.cancelSignRequest=this.getInteraction().cancelRequestSignature,h.instance)return h.instance.deserialize(e),h.instance;h.instance=this}async signTransaction(e,t){const n=0===t.type?o.DataType.transaction:o.DataType.typedTransaction;let r;r=0===t.type?l.encode(t.getMessageToSign(!1)):t.getMessageToSign(!1);const i=await this._pathFromAddress(e),s=t.common.chainId(),a=c.v4(),d=o.EthSignRequest.constructETHRequest(r,n,i,this.xfp,a,s,e),{r:h,s:p,v:f}=await this.requestSignature(a,d,"Scan with your Keystone",'After your Keystone has signed the transaction, click on "Scan Keystone" to receive the signature'),g=t.toJSON();return g.v=f,g.s=p,g.r=h,g.type=t.type,u.TransactionFactory.fromTxData(g,{common:t.common})}}h.type=i.BaseKeyring.type,n.MetaMaskKeyring=h}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/metamask-airgapped-keyring",file:"node_modules/@keystonehq/metamask-airgapped-keyring/dist/metamask-airgapped-keyring.cjs.production.min.js"}],[614,{"./ObservableStore":616},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.ComposedStore=void 0;const r=e("./ObservableStore");class i extends r.ObservableStore{constructor(e){super({}),this._children=e||{},Object.keys(this._children).forEach((e=>{const t=this._children[e];this._addChild(e,t)}))}_addChild(e,t){const n=t=>{const n=this.getState();n[e]=t,this.putState(n)};t.subscribe(n),n(t.getState())}}n.ComposedStore=i}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/@metamask/obs-store/dist/ComposedStore.js"}],[615,{"./ObservableStore":616},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.MergedStore=void 0;const r=e("./ObservableStore");class i extends r.ObservableStore{constructor(e=[]){super({}),this._children=e,e.forEach((e=>this._addChild(e))),this._updateWholeState()}_addChild(e){e.subscribe((()=>this._updateWholeState()))}_updateWholeState(){const e=this._children.map((e=>e.getState())),t=Object.assign({},...e);this.putState(t)}}n.MergedStore=i}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/@metamask/obs-store/dist/MergedStore.js"}],[616,{"@metamask/safe-event-emitter":620},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.ObservableStore=void 0;const i=r(e("@metamask/safe-event-emitter"));class s extends i.default{constructor(e){super(),this._state=e||{}}getState(){return this._getState()}putState(e){this._putState(e),this.emit("update",e)}updateState(e){if(e&&"object"==typeof e){const t=this.getState();this.putState(Object.assign(Object.assign({},t),e))}else this.putState(e)}subscribe(e){this.on("update",e)}unsubscribe(e){this.removeListener("update",e)}_getState(){return this._state}_putState(e){this._state=e}}n.ObservableStore=s}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/@metamask/obs-store/dist/ObservableStore.js"}],[617,{stream:4278},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.storeAsStream=void 0;const r=e("stream");class i extends r.Duplex{constructor(e){super({objectMode:!0}),this.resume(),this.handler=e=>this.push(e),this.obsStore=e,this.obsStore.subscribe(this.handler)}pipe(e,t){const n=super.pipe(e,t);return e.write(this.obsStore.getState()),n}_write(e,t,n){this.obsStore.putState(e),n()}_read(e){return undefined}_destroy(e,t){this.obsStore.unsubscribe(this.handler),super._destroy(e,t)}}n.storeAsStream=function(e){return new i(e)}}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/@metamask/obs-store/dist/asStream.js"}],[618,{"./ComposedStore":614,"./MergedStore":615,"./ObservableStore":616,"./asStream":617,"./transform":619},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){r===undefined&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){r===undefined&&(r=n),e[r]=t[n]}),i=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(n,"__esModule",{value:!0}),i(e("./asStream"),n),i(e("./ComposedStore"),n),i(e("./MergedStore"),n),i(e("./ObservableStore"),n),i(e("./transform"),n)}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/@metamask/obs-store/dist/index.js"}],[619,{through2:634},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.storeTransformStream=void 0;const r=e("through2");n.storeTransformStream=function(e){return r.obj(((t,n,r)=>{try{return r(null,e(t)),undefined}catch(e){return r(e),undefined}}))}}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/@metamask/obs-store/dist/transform.js"}],[62,{loglevel:3789,"webextension-polyfill":4402},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function({location:e,registerOnboarding:t}){return async function(n,s,a,o){try{if("wallet_registerOnboarding"!==n.method)return void a();n.tabId&&n.tabId!==i.default.tabs.TAB_ID_NONE?await t(e,n.tabId):r.default.debug(`'wallet_registerOnboarding' message from ${e} ignored due to missing tabId`),s.result=!0,o()}catch(e){o(e)}}};var r=s(e("loglevel")),i=s(e("webextension-polyfill"));function s(e){return e&&e.__esModule?e:{default:e}}}}},{package:"$root$",file:"app/scripts/lib/createOnboardingMiddleware.js"}],[620,{events:3276},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});const r=e("events");function i(e,t,n){try{Reflect.apply(e,t,n)}catch(e){setTimeout((()=>{throw e}))}}class s extends r.EventEmitter{emit(e,...t){let n="error"===e;const r=this._events;if(r!==undefined)n=n&&r.error===undefined;else if(!n)return!1;if(n){let e;if(t.length>0&&([e]=t),e instanceof Error)throw e;const n=new Error("Unhandled error."+(e?` (${e.message})`:""));throw n.context=e,n}const s=r[e];if(s===undefined)return!1;if("function"==typeof s)i(s,this,t);else{const e=s.length,n=function(e){const t=e.length,n=new Array(t);for(let r=0;r<t;r+=1)n[r]=e[r];return n}(s);for(let r=0;r<e;r+=1)i(n[r],this,t)}return!0}}n.default=s}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>@metamask/safe-event-emitter",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/@metamask/safe-event-emitter/index.js"}],[621,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r={}.toString;t.exports=Array.isArray||function(e){return"[object Array]"==r.call(e)}}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream>isarray",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/isarray/index.js"}],[622,{"./_stream_readable":624,"./_stream_writable":626,"core-util-is":3043,inherits:3588,"process-nextick-args":3924},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=e("process-nextick-args"),i=Object.keys||function(e){var t=[];for(var n in e)t.push(n);return t};t.exports=d;var s=Object.create(e("core-util-is"));s.inherits=e("inherits");var a=e("./_stream_readable"),o=e("./_stream_writable");s.inherits(d,a);for(var c=i(o.prototype),u=0;u<c.length;u++){var l=c[u];d.prototype[l]||(d.prototype[l]=o.prototype[l])}function d(e){if(!(this instanceof d))return new d(e);a.call(this,e),o.call(this,e),e&&!1===e.readable&&(this.readable=!1),e&&!1===e.writable&&(this.writable=!1),this.allowHalfOpen=!0,e&&!1===e.allowHalfOpen&&(this.allowHalfOpen=!1),this.once("end",h)}function h(){this.allowHalfOpen||this._writableState.ended||r.nextTick(p,this)}function p(e){e.end()}Object.defineProperty(d.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(d.prototype,"destroyed",{get:function(){return this._readableState!==undefined&&this._writableState!==undefined&&(this._readableState.destroyed&&this._writableState.destroyed)},set:function(e){this._readableState!==undefined&&this._writableState!==undefined&&(this._readableState.destroyed=e,this._writableState.destroyed=e)}}),d.prototype._destroy=function(e,t){this.push(null),this.end(),r.nextTick(t,e)}}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/readable-stream/lib/_stream_duplex.js"}],[623,{"./_stream_transform":625,"core-util-is":3043,inherits:3588},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){t.exports=s;var r=e("./_stream_transform"),i=Object.create(e("core-util-is"));function s(e){if(!(this instanceof s))return new s(e);r.call(this,e)}i.inherits=e("inherits"),i.inherits(s,r),s.prototype._transform=function(e,t,n){n(null,e)}}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/readable-stream/lib/_stream_passthrough.js"}],[624,{"./_stream_duplex":622,"./internal/streams/BufferList":627,"./internal/streams/destroy":628,"./internal/streams/stream":629,_process:3925,"core-util-is":3043,events:3276,inherits:3588,isarray:621,"process-nextick-args":3924,"safe-buffer":632,"string_decoder/":633,util:2948},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(n){(function(){var r=e("process-nextick-args");t.exports=b;var i,s=e("isarray");b.ReadableState=y;e("events").EventEmitter;var a=function(e,t){return e.listeners(t).length},o=e("./internal/streams/stream"),c=e("safe-buffer").Buffer,u=global.Uint8Array||function(){};var l=Object.create(e("core-util-is"));l.inherits=e("inherits");var d=e("util"),h=void 0;h=d&&d.debuglog?d.debuglog("stream"):function(){};var p,f=e("./internal/streams/BufferList"),g=e("./internal/streams/destroy");l.inherits(b,o);var m=["error","close","destroy","pause","resume"];function y(t,n){t=t||{};var r=n instanceof(i=i||e("./_stream_duplex"));this.objectMode=!!t.objectMode,r&&(this.objectMode=this.objectMode||!!t.readableObjectMode);var s=t.highWaterMark,a=t.readableHighWaterMark,o=this.objectMode?16:16384;this.highWaterMark=s||0===s?s:r&&(a||0===a)?a:o,this.highWaterMark=Math.floor(this.highWaterMark),this.buffer=new f,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.destroyed=!1,this.defaultEncoding=t.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,t.encoding&&(p||(p=e("string_decoder/").StringDecoder),this.decoder=new p(t.encoding),this.encoding=t.encoding)}function b(t){if(i=i||e("./_stream_duplex"),!(this instanceof b))return new b(t);this._readableState=new y(t,this),this.readable=!0,t&&("function"==typeof t.read&&(this._read=t.read),"function"==typeof t.destroy&&(this._destroy=t.destroy)),o.call(this)}function w(e,t,n,r,i){var s,a=e._readableState;null===t?(a.reading=!1,function(e,t){if(t.ended)return;if(t.decoder){var n=t.decoder.end();n&&n.length&&(t.buffer.push(n),t.length+=t.objectMode?1:n.length)}t.ended=!0,k(e)}(e,a)):(i||(s=function(e,t){var n;r=t,c.isBuffer(r)||r instanceof u||"string"==typeof t||t===undefined||e.objectMode||(n=new TypeError("Invalid non-string/buffer chunk"));var r;return n}(a,t)),s?e.emit("error",s):a.objectMode||t&&t.length>0?("string"==typeof t||a.objectMode||Object.getPrototypeOf(t)===c.prototype||(t=function(e){return c.from(e)}(t)),r?a.endEmitted?e.emit("error",new Error("stream.unshift() after end event")):v(e,a,t,!0):a.ended?e.emit("error",new Error("stream.push() after EOF")):(a.reading=!1,a.decoder&&!n?(t=a.decoder.write(t),a.objectMode||0!==t.length?v(e,a,t,!1):T(e,a)):v(e,a,t,!1))):r||(a.reading=!1));return function(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}(a)}function v(e,t,n,r){t.flowing&&0===t.length&&!t.sync?(e.emit("data",n),e.read(0)):(t.length+=t.objectMode?1:n.length,r?t.buffer.unshift(n):t.buffer.push(n),t.needReadable&&k(e)),T(e,t)}Object.defineProperty(b.prototype,"destroyed",{get:function(){return this._readableState!==undefined&&this._readableState.destroyed},set:function(e){this._readableState&&(this._readableState.destroyed=e)}}),b.prototype.destroy=g.destroy,b.prototype._undestroy=g.undestroy,b.prototype._destroy=function(e,t){this.push(null),t(e)},b.prototype.push=function(e,t){var n,r=this._readableState;return r.objectMode?n=!0:"string"==typeof e&&((t=t||r.defaultEncoding)!==r.encoding&&(e=c.from(e,t),t=""),n=!0),w(this,e,t,!1,n)},b.prototype.unshift=function(e){return w(this,e,null,!0,!1)},b.prototype.isPaused=function(){return!1===this._readableState.flowing},b.prototype.setEncoding=function(t){return p||(p=e("string_decoder/").StringDecoder),this._readableState.decoder=new p(t),this._readableState.encoding=t,this};var _=8388608;function S(e,t){return e<=0||0===t.length&&t.ended?0:t.objectMode?1:e!=e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=function(e){return e>=_?e=_:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0))}function k(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(h("emitReadable",t.flowing),t.emittedReadable=!0,t.sync?r.nextTick(E,e):E(e))}function E(e){h("emit readable"),e.emit("readable"),P(e)}function T(e,t){t.readingMore||(t.readingMore=!0,r.nextTick(A,e,t))}function A(e,t){for(var n=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(h("maybeReadMore read 0"),e.read(0),n!==t.length);)n=t.length;t.readingMore=!1}function M(e){h("readable nexttick read 0"),e.read(0)}function C(e,t){t.reading||(h("resume read 0"),e.read(0)),t.resumeScheduled=!1,t.awaitDrain=0,e.emit("resume"),P(e),t.flowing&&!t.reading&&e.read(0)}function P(e){var t=e._readableState;for(h("flow",t.flowing);t.flowing&&null!==e.read(););}function O(e,t){return 0===t.length?null:(t.objectMode?n=t.buffer.shift():!e||e>=t.length?(n=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.head.data:t.buffer.concat(t.length),t.buffer.clear()):n=function(e,t,n){var r;e<t.head.data.length?(r=t.head.data.slice(0,e),t.head.data=t.head.data.slice(e)):r=e===t.head.data.length?t.shift():n?function(e,t){var n=t.head,r=1,i=n.data;e-=i.length;for(;n=n.next;){var s=n.data,a=e>s.length?s.length:e;if(a===s.length?i+=s:i+=s.slice(0,e),0===(e-=a)){a===s.length?(++r,n.next?t.head=n.next:t.head=t.tail=null):(t.head=n,n.data=s.slice(a));break}++r}return t.length-=r,i}(e,t):function(e,t){var n=c.allocUnsafe(e),r=t.head,i=1;r.data.copy(n),e-=r.data.length;for(;r=r.next;){var s=r.data,a=e>s.length?s.length:e;if(s.copy(n,n.length-e,0,a),0===(e-=a)){a===s.length?(++i,r.next?t.head=r.next:t.head=t.tail=null):(t.head=r,r.data=s.slice(a));break}++i}return t.length-=i,n}(e,t);return r}(e,t.buffer,t.decoder),n);var n}function I(e){var t=e._readableState;if(t.length>0)throw new Error('"endReadable()" called on non-empty stream');t.endEmitted||(t.ended=!0,r.nextTick(D,t,e))}function D(e,t){e.endEmitted||0!==e.length||(e.endEmitted=!0,t.readable=!1,t.emit("end"))}function x(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}b.prototype.read=function(e){h("read",e),e=parseInt(e,10);var t=this._readableState,n=e;if(0!==e&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return h("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?I(this):k(this),null;if(0===(e=S(e,t))&&t.ended)return 0===t.length&&I(this),null;var r,i=t.needReadable;return h("need readable",i),(0===t.length||t.length-e<t.highWaterMark)&&h("length less than watermark",i=!0),t.ended||t.reading?h("reading or ended",i=!1):i&&(h("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,t.reading||(e=S(n,t))),null===(r=e>0?O(e,t):null)?(t.needReadable=!0,e=0):t.length-=e,0===t.length&&(t.ended||(t.needReadable=!0),n!==e&&t.ended&&I(this)),null!==r&&this.emit("data",r),r},b.prototype._read=function(e){this.emit("error",new Error("_read() is not implemented"))},b.prototype.pipe=function(e,t){var i=this,o=this._readableState;switch(o.pipesCount){case 0:o.pipes=e;break;case 1:o.pipes=[o.pipes,e];break;default:o.pipes.push(e)}o.pipesCount+=1,h("pipe count=%d opts=%j",o.pipesCount,t);var c=(!t||!1!==t.end)&&e!==n.stdout&&e!==n.stderr?l:w;function u(t,n){h("onunpipe"),t===i&&n&&!1===n.hasUnpiped&&(n.hasUnpiped=!0,h("cleanup"),e.removeListener("close",y),e.removeListener("finish",b),e.removeListener("drain",d),e.removeListener("error",m),e.removeListener("unpipe",u),i.removeListener("end",l),i.removeListener("end",w),i.removeListener("data",g),p=!0,!o.awaitDrain||e._writableState&&!e._writableState.needDrain||d())}function l(){h("onend"),e.end()}o.endEmitted?r.nextTick(c):i.once("end",c),e.on("unpipe",u);var d=function(e){return function(){var t=e._readableState;h("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&a(e,"data")&&(t.flowing=!0,P(e))}}(i);e.on("drain",d);var p=!1;var f=!1;function g(t){h("ondata"),f=!1,!1!==e.write(t)||f||((1===o.pipesCount&&o.pipes===e||o.pipesCount>1&&-1!==x(o.pipes,e))&&!p&&(h("false write response, pause",i._readableState.awaitDrain),i._readableState.awaitDrain++,f=!0),i.pause())}function m(t){h("onerror",t),w(),e.removeListener("error",m),0===a(e,"error")&&e.emit("error",t)}function y(){e.removeListener("finish",b),w()}function b(){h("onfinish"),e.removeListener("close",y),w()}function w(){h("unpipe"),i.unpipe(e)}return i.on("data",g),function(e,t,n){if("function"==typeof e.prependListener)return e.prependListener(t,n);e._events&&e._events[t]?s(e._events[t])?e._events[t].unshift(n):e._events[t]=[n,e._events[t]]:e.on(t,n)}(e,"error",m),e.once("close",y),e.once("finish",b),e.emit("pipe",i),o.flowing||(h("pipe resume"),i.resume()),e},b.prototype.unpipe=function(e){var t=this._readableState,n={hasUnpiped:!1};if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes||(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this,n)),this;if(!e){var r=t.pipes,i=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var s=0;s<i;s++)r[s].emit("unpipe",this,n);return this}var a=x(t.pipes,e);return-1===a||(t.pipes.splice(a,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this,n)),this},b.prototype.on=function(e,t){var n=o.prototype.on.call(this,e,t);if("data"===e)!1!==this._readableState.flowing&&this.resume();else if("readable"===e){var i=this._readableState;i.endEmitted||i.readableListening||(i.readableListening=i.needReadable=!0,i.emittedReadable=!1,i.reading?i.length&&k(this):r.nextTick(M,this))}return n},b.prototype.addListener=b.prototype.on,b.prototype.resume=function(){var e=this._readableState;return e.flowing||(h("resume"),e.flowing=!0,function(e,t){t.resumeScheduled||(t.resumeScheduled=!0,r.nextTick(C,e,t))}(this,e)),this},b.prototype.pause=function(){return h("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(h("pause"),this._readableState.flowing=!1,this.emit("pause")),this},b.prototype.wrap=function(e){var t=this,n=this._readableState,r=!1;for(var i in e.on("end",(function(){if(h("wrapped end"),n.decoder&&!n.ended){var e=n.decoder.end();e&&e.length&&t.push(e)}t.push(null)})),e.on("data",(function(i){(h("wrapped data"),n.decoder&&(i=n.decoder.write(i)),!n.objectMode||null!==i&&i!==undefined)&&((n.objectMode||i&&i.length)&&(t.push(i)||(r=!0,e.pause())))})),e)this[i]===undefined&&"function"==typeof e[i]&&(this[i]=function(t){return function(){return e[t].apply(e,arguments)}}(i));for(var s=0;s<m.length;s++)e.on(m[s],this.emit.bind(this,m[s]));return this._read=function(t){h("wrapped _read",t),r&&(r=!1,e.resume())},this},Object.defineProperty(b.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),b._fromList=O}).call(this)}).call(this,e("_process"))}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/readable-stream/lib/_stream_readable.js"}],[625,{"./_stream_duplex":622,"core-util-is":3043,inherits:3588},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){t.exports=a;var r=e("./_stream_duplex"),i=Object.create(e("core-util-is"));function s(e,t){var n=this._transformState;n.transforming=!1;var r=n.writecb;if(!r)return this.emit("error",new Error("write callback called multiple times"));n.writechunk=null,n.writecb=null,null!=t&&this.push(t),r(e);var i=this._readableState;i.reading=!1,(i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}function a(e){if(!(this instanceof a))return new a(e);r.call(this,e),this._transformState={afterTransform:s.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,e&&("function"==typeof e.transform&&(this._transform=e.transform),"function"==typeof e.flush&&(this._flush=e.flush)),this.on("prefinish",o)}function o(){var e=this;"function"==typeof this._flush?this._flush((function(t,n){c(e,t,n)})):c(this,null,null)}function c(e,t,n){if(t)return e.emit("error",t);if(null!=n&&e.push(n),e._writableState.length)throw new Error("Calling transform done when ws.length != 0");if(e._transformState.transforming)throw new Error("Calling transform done when still transforming");return e.push(null)}i.inherits=e("inherits"),i.inherits(a,r),a.prototype.push=function(e,t){return this._transformState.needTransform=!1,r.prototype.push.call(this,e,t)},a.prototype._transform=function(e,t,n){throw new Error("_transform() is not implemented")},a.prototype._write=function(e,t,n){var r=this._transformState;if(r.writecb=n,r.writechunk=e,r.writeencoding=t,!r.transforming){var i=this._readableState;(r.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},a.prototype._read=function(e){var t=this._transformState;null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0},a.prototype._destroy=function(e,t){var n=this;r.prototype._destroy.call(this,e,(function(e){t(e),n.emit("close")}))}}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/readable-stream/lib/_stream_transform.js"}],[626,{"./_stream_duplex":622,"./internal/streams/destroy":628,"./internal/streams/stream":629,_process:3925,"core-util-is":3043,inherits:3588,"process-nextick-args":3924,"safe-buffer":632,timers:4295,"util-deprecate":4350},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(n,r){(function(){var i=e("process-nextick-args");function s(e){var t=this;this.next=null,this.entry=null,this.finish=function(){!function(e,t,n){var r=e.entry;e.entry=null;for(;r;){var i=r.callback;t.pendingcb--,i(n),r=r.next}t.corkedRequestsFree?t.corkedRequestsFree.next=e:t.corkedRequestsFree=e}(t,e)}}t.exports=y;var a,o=!n.browser&&["v0.10","v0.9."].indexOf(n.version.slice(0,5))>-1?r:i.nextTick;y.WritableState=m;var c=Object.create(e("core-util-is"));c.inherits=e("inherits");var u={deprecate:e("util-deprecate")},l=e("./internal/streams/stream"),d=e("safe-buffer").Buffer,h=global.Uint8Array||function(){};var p,f=e("./internal/streams/destroy");function g(){}function m(t,n){a=a||e("./_stream_duplex"),t=t||{};var r=n instanceof a;this.objectMode=!!t.objectMode,r&&(this.objectMode=this.objectMode||!!t.writableObjectMode);var c=t.highWaterMark,u=t.writableHighWaterMark,l=this.objectMode?16:16384;this.highWaterMark=c||0===c?c:r&&(u||0===u)?u:l,this.highWaterMark=Math.floor(this.highWaterMark),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var d=!1===t.decodeStrings;this.decodeStrings=!d,this.defaultEncoding=t.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){!function(e,t){var n=e._writableState,r=n.sync,s=n.writecb;if(function(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}(n),t)!function(e,t,n,r,s){--t.pendingcb,n?(i.nextTick(s,r),i.nextTick(k,e,t),e._writableState.errorEmitted=!0,e.emit("error",r)):(s(r),e._writableState.errorEmitted=!0,e.emit("error",r),k(e,t))}(e,n,r,t,s);else{var a=_(n);a||n.corked||n.bufferProcessing||!n.bufferedRequest||v(e,n),r?o(w,e,n,a,s):w(e,n,a,s)}}(n,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new s(this)}function y(t){if(a=a||e("./_stream_duplex"),!(p.call(y,this)||this instanceof a))return new y(t);this._writableState=new m(t,this),this.writable=!0,t&&("function"==typeof t.write&&(this._write=t.write),"function"==typeof t.writev&&(this._writev=t.writev),"function"==typeof t.destroy&&(this._destroy=t.destroy),"function"==typeof t.final&&(this._final=t.final)),l.call(this)}function b(e,t,n,r,i,s,a){t.writelen=r,t.writecb=a,t.writing=!0,t.sync=!0,n?e._writev(i,t.onwrite):e._write(i,s,t.onwrite),t.sync=!1}function w(e,t,n,r){n||function(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}(e,t),t.pendingcb--,r(),k(e,t)}function v(e,t){t.bufferProcessing=!0;var n=t.bufferedRequest;if(e._writev&&n&&n.next){var r=t.bufferedRequestCount,i=new Array(r),a=t.corkedRequestsFree;a.entry=n;for(var o=0,c=!0;n;)i[o]=n,n.isBuf||(c=!1),n=n.next,o+=1;i.allBuffers=c,b(e,t,!0,t.length,i,"",a.finish),t.pendingcb++,t.lastBufferedRequest=null,a.next?(t.corkedRequestsFree=a.next,a.next=null):t.corkedRequestsFree=new s(t),t.bufferedRequestCount=0}else{for(;n;){var u=n.chunk,l=n.encoding,d=n.callback;if(b(e,t,!1,t.objectMode?1:u.length,u,l,d),n=n.next,t.bufferedRequestCount--,t.writing)break}null===n&&(t.lastBufferedRequest=null)}t.bufferedRequest=n,t.bufferProcessing=!1}function _(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function S(e,t){e._final((function(n){t.pendingcb--,n&&e.emit("error",n),t.prefinished=!0,e.emit("prefinish"),k(e,t)}))}function k(e,t){var n=_(t);return n&&(!function(e,t){t.prefinished||t.finalCalled||("function"==typeof e._final?(t.pendingcb++,t.finalCalled=!0,i.nextTick(S,e,t)):(t.prefinished=!0,e.emit("prefinish")))}(e,t),0===t.pendingcb&&(t.finished=!0,e.emit("finish"))),n}c.inherits(y,l),m.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(m.prototype,"buffer",{get:u.deprecate((function(){return this.getBuffer()}),"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(e){}}(),"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(p=Function.prototype[Symbol.hasInstance],Object.defineProperty(y,Symbol.hasInstance,{value:function(e){return!!p.call(this,e)||this===y&&(e&&e._writableState instanceof m)}})):p=function(e){return e instanceof this},y.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},y.prototype.write=function(e,t,n){var r,s=this._writableState,a=!1,o=!s.objectMode&&(r=e,d.isBuffer(r)||r instanceof h);return o&&!d.isBuffer(e)&&(e=function(e){return d.from(e)}(e)),"function"==typeof t&&(n=t,t=null),o?t="buffer":t||(t=s.defaultEncoding),"function"!=typeof n&&(n=g),s.ended?function(e,t){var n=new Error("write after end");e.emit("error",n),i.nextTick(t,n)}(this,n):(o||function(e,t,n,r){var s=!0,a=!1;return null===n?a=new TypeError("May not write null values to stream"):"string"==typeof n||n===undefined||t.objectMode||(a=new TypeError("Invalid non-string/buffer chunk")),a&&(e.emit("error",a),i.nextTick(r,a),s=!1),s}(this,s,e,n))&&(s.pendingcb++,a=function(e,t,n,r,i,s){if(!n){var a=function(e,t,n){e.objectMode||!1===e.decodeStrings||"string"!=typeof t||(t=d.from(t,n));return t}(t,r,i);r!==a&&(n=!0,i="buffer",r=a)}var o=t.objectMode?1:r.length;t.length+=o;var c=t.length<t.highWaterMark;c||(t.needDrain=!0);if(t.writing||t.corked){var u=t.lastBufferedRequest;t.lastBufferedRequest={chunk:r,encoding:i,isBuf:n,callback:s,next:null},u?u.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else b(e,t,!1,o,r,i,s);return c}(this,s,o,e,t,n)),a},y.prototype.cork=function(){this._writableState.corked++},y.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.finished||e.bufferProcessing||!e.bufferedRequest||v(this,e))},y.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);return this._writableState.defaultEncoding=e,this},Object.defineProperty(y.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),y.prototype._write=function(e,t,n){n(new Error("_write() is not implemented"))},y.prototype._writev=null,y.prototype.end=function(e,t,n){var r=this._writableState;"function"==typeof e?(n=e,e=null,t=null):"function"==typeof t&&(n=t,t=null),null!==e&&e!==undefined&&this.write(e,t),r.corked&&(r.corked=1,this.uncork()),r.ending||r.finished||function(e,t,n){t.ending=!0,k(e,t),n&&(t.finished?i.nextTick(n):e.once("finish",n));t.ended=!0,e.writable=!1}(this,r,n)},Object.defineProperty(y.prototype,"destroyed",{get:function(){return this._writableState!==undefined&&this._writableState.destroyed},set:function(e){this._writableState&&(this._writableState.destroyed=e)}}),y.prototype.destroy=f.destroy,y.prototype._undestroy=f.undestroy,y.prototype._destroy=function(e,t){this.end(),t(e)}}).call(this)}).call(this,e("_process"),e("timers").setImmediate)}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/readable-stream/lib/_stream_writable.js"}],[627,{"safe-buffer":632,util:2948},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=e("safe-buffer").Buffer,i=e("util");t.exports=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.head=null,this.tail=null,this.length=0}return e.prototype.push=function(e){var t={data:e,next:null};this.length>0?this.tail.next=t:this.head=t,this.tail=t,++this.length},e.prototype.unshift=function(e){var t={data:e,next:this.head};0===this.length&&(this.tail=t),this.head=t,++this.length},e.prototype.shift=function(){if(0!==this.length){var e=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,e}},e.prototype.clear=function(){this.head=this.tail=null,this.length=0},e.prototype.join=function(e){if(0===this.length)return"";for(var t=this.head,n=""+t.data;t=t.next;)n+=e+t.data;return n},e.prototype.concat=function(e){if(0===this.length)return r.alloc(0);if(1===this.length)return this.head.data;for(var t,n,i,s=r.allocUnsafe(e>>>0),a=this.head,o=0;a;)t=a.data,n=s,i=o,t.copy(n,i),o+=a.data.length,a=a.next;return s},e}(),i&&i.inspect&&i.inspect.custom&&(t.exports.prototype[i.inspect.custom]=function(){var e=i.inspect({length:this.length});return this.constructor.name+" "+e})}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/readable-stream/lib/internal/streams/BufferList.js"}],[628,{"process-nextick-args":3924},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=e("process-nextick-args");function i(e,t){e.emit("error",t)}t.exports={destroy:function(e,t){var n=this,s=this._readableState&&this._readableState.destroyed,a=this._writableState&&this._writableState.destroyed;return s||a?(t?t(e):!e||this._writableState&&this._writableState.errorEmitted||r.nextTick(i,this,e),this):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(e||null,(function(e){!t&&e?(r.nextTick(i,n,e),n._writableState&&(n._writableState.errorEmitted=!0)):t&&t(e)})),this)},undestroy:function(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)}}}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/readable-stream/lib/internal/streams/destroy.js"}],[629,{events:3276},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){t.exports=e("events").EventEmitter}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/readable-stream/lib/internal/streams/stream-browser.js"}],[63,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return function(t,n,r){t.origin=e.origin,r()}}}}},{package:"$root$",file:"app/scripts/lib/createOriginMiddleware.js"}],[630,{"./lib/_stream_duplex.js":622,"./lib/_stream_passthrough.js":623,"./lib/_stream_readable.js":624,"./lib/_stream_transform.js":625,"./lib/_stream_writable.js":626},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(n=t.exports=e("./lib/_stream_readable.js")).Stream=n,n.Readable=n,n.Writable=e("./lib/_stream_writable.js"),n.Duplex=e("./lib/_stream_duplex.js"),n.Transform=e("./lib/_stream_transform.js"),n.PassThrough=e("./lib/_stream_passthrough.js")}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/readable-stream/readable-browser.js"}],[631,{"bn.js":2935,buffer:2983},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.getLength=n.decode=n.encode=void 0;var i=r(e("bn.js"));function s(e,t){if("0"===e[0]&&"0"===e[1])throw new Error("invalid RLP: extra zeros");return parseInt(e,t)}function a(e,n){if(e<56)return t.from([e+n]);var r=u(e),i=u(n+55+r.length/2);return t.from(i+r,"hex")}function o(e){var n,r,i,a,c,u=[],l=e[0];if(l<=127)return{data:e.slice(0,1),remainder:e.slice(1)};if(l<=183){if(n=l-127,i=128===l?t.from([]):e.slice(1,n),2===n&&i[0]<128)throw new Error("invalid rlp encoding: byte must be less 0x80");return{data:i,remainder:e.slice(n)}}if(l<=191){if(r=l-182,e.length-1<r)throw new Error("invalid RLP: not enough bytes for string length");if((n=s(e.slice(1,r).toString("hex"),16))<=55)throw new Error("invalid RLP: expected string length to be greater than 55");if((i=e.slice(r,n+r)).length<n)throw new Error("invalid RLP: not enough bytes for string");return{data:i,remainder:e.slice(n+r)}}if(l<=247){for(n=l-191,a=e.slice(1,n);a.length;)c=o(a),u.push(c.data),a=c.remainder;return{data:u,remainder:e.slice(n)}}var d=(r=l-246)+(n=s(e.slice(1,r).toString("hex"),16));if(d>e.length)throw new Error("invalid rlp: total length is larger than the data");if(0===(a=e.slice(r,d)).length)throw new Error("invalid rlp, List has a invalid length");for(;a.length;)c=o(a),u.push(c.data),a=c.remainder;return{data:u,remainder:e.slice(d)}}function c(e){return"0x"===e.slice(0,2)}function u(e){if(e<0)throw new Error("Invalid integer as argument, must be unsigned!");var t=e.toString(16);return t.length%2?"0"+t:t}function l(e){if(!t.isBuffer(e)){if("string"==typeof e)return c(e)?t.from((r="string"!=typeof(s=e)?s:c(s)?s.slice(2):s).length%2?"0"+r:r,"hex"):t.from(e);if("number"==typeof e||"bigint"==typeof e)return e?(n=u(e),t.from(n,"hex")):t.from([]);if(null===e||e===undefined)return t.from([]);if(e instanceof Uint8Array)return t.from(e);if(i.default.isBN(e))return t.from(e.toArray());throw new Error("invalid type")}var n,r,s;return e}n.encode=function e(n){if(Array.isArray(n)){for(var r=[],i=0;i<n.length;i++)r.push(e(n[i]));var s=t.concat(r);return t.concat([a(s.length,192),s])}var o=l(n);return 1===o.length&&o[0]<128?o:t.concat([a(o.length,128),o])},n.decode=function(e,n){if(void 0===n&&(n=!1),!e||0===e.length)return t.from([]);var r=o(l(e));if(n)return r;if(0!==r.remainder.length)throw new Error("invalid remainder");return r.data},n.getLength=function(e){if(!e||0===e.length)return t.from([]);var n=l(e),r=n[0];if(r<=127)return n.length;if(r<=183)return r-127;if(r<=191)return r-182;if(r<=247)return r-191;var i=r-246;return i+s(n.slice(1,i).toString("hex"),16)}}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/metamask-airgapped-keyring>rlp",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/rlp/dist.browser/index.js"}],[632,{buffer:2983},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=e("buffer"),i=r.Buffer;function s(e,t){for(var n in e)t[n]=e[n]}function a(e,t,n){return i(e,t,n)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?t.exports=r:(s(r,n),n.Buffer=a),s(i,a),a.from=function(e,t,n){if("number"==typeof e)throw new TypeError("Argument must not be a number");return i(e,t,n)},a.alloc=function(e,t,n){if("number"!=typeof e)throw new TypeError("Argument must be a number");var r=i(e);return t!==undefined?"string"==typeof n?r.fill(t,n):r.fill(t):r.fill(0),r},a.allocUnsafe=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return i(e)},a.allocUnsafeSlow=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return r.SlowBuffer(e)}}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream>safe-buffer",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/safe-buffer/index.js"}],[633,{"safe-buffer":632},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=e("safe-buffer").Buffer,i=r.isEncoding||function(e){switch((e=""+e)&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};function s(e){var t;switch(this.encoding=function(e){var t=function(e){if(!e)return"utf8";for(var t;;)switch(e){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return e;default:if(t)return;e=(""+e).toLowerCase(),t=!0}}(e);if("string"!=typeof t&&(r.isEncoding===i||!i(e)))throw new Error("Unknown encoding: "+e);return t||e}(e),this.encoding){case"utf16le":this.text=c,this.end=u,t=4;break;case"utf8":this.fillLast=o,t=4;break;case"base64":this.text=l,this.end=d,t=3;break;default:return this.write=h,void(this.end=p)}this.lastNeed=0,this.lastTotal=0,this.lastChar=r.allocUnsafe(t)}function a(e){return e<=127?0:e>>5==6?2:e>>4==14?3:e>>3==30?4:e>>6==2?-1:-2}function o(e){var t=this.lastTotal-this.lastNeed,n=function(e,t,n){if(128!=(192&t[0]))return e.lastNeed=0,"�";if(e.lastNeed>1&&t.length>1){if(128!=(192&t[1]))return e.lastNeed=1,"�";if(e.lastNeed>2&&t.length>2&&128!=(192&t[2]))return e.lastNeed=2,"�"}}(this,e);return n!==undefined?n:this.lastNeed<=e.length?(e.copy(this.lastChar,t,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(e.copy(this.lastChar,t,0,e.length),void(this.lastNeed-=e.length))}function c(e,t){if((e.length-t)%2==0){var n=e.toString("utf16le",t);if(n){var r=n.charCodeAt(n.length-1);if(r>=55296&&r<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1],n.slice(0,-1)}return n}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=e[e.length-1],e.toString("utf16le",t,e.length-1)}function u(e){var t=e&&e.length?this.write(e):"";if(this.lastNeed){var n=this.lastTotal-this.lastNeed;return t+this.lastChar.toString("utf16le",0,n)}return t}function l(e,t){var n=(e.length-t)%3;return 0===n?e.toString("base64",t):(this.lastNeed=3-n,this.lastTotal=3,1===n?this.lastChar[0]=e[e.length-1]:(this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1]),e.toString("base64",t,e.length-n))}function d(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+this.lastChar.toString("base64",0,3-this.lastNeed):t}function h(e){return e.toString(this.encoding)}function p(e){return e&&e.length?this.write(e):""}n.StringDecoder=s,s.prototype.write=function(e){if(0===e.length)return"";var t,n;if(this.lastNeed){if((t=this.fillLast(e))===undefined)return"";n=this.lastNeed,this.lastNeed=0}else n=0;return n<e.length?t?t+this.text(e,n):this.text(e,n):t||""},s.prototype.end=function(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+"�":t},s.prototype.text=function(e,t){var n=function(e,t,n){var r=t.length-1;if(r<n)return 0;var i=a(t[r]);if(i>=0)return i>0&&(e.lastNeed=i-1),i;if(--r<n||-2===i)return 0;if(i=a(t[r]),i>=0)return i>0&&(e.lastNeed=i-2),i;if(--r<n||-2===i)return 0;if(i=a(t[r]),i>=0)return i>0&&(2===i?i=0:e.lastNeed=i-3),i;return 0}(this,e,t);if(!this.lastNeed)return e.toString("utf8",t);this.lastTotal=n;var r=e.length-(n-this.lastNeed);return e.copy(this.lastChar,0,r),e.toString("utf8",t,r)},s.prototype.fillLast=function(e){if(this.lastNeed<=e.length)return e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,e.length),this.lastNeed-=e.length}}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2>readable-stream>string_decoder",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/string_decoder/lib/string_decoder.js"}],[634,{_process:3925,"readable-stream":630,util:4353,xtend:4408},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(n){(function(){var r=e("readable-stream").Transform,i=e("util").inherits,s=e("xtend");function a(e){r.call(this,e),this._destroyed=!1}function o(e,t,n){n(null,e)}function c(e){return function(t,n,r){return"function"==typeof t&&(r=n,n=t,t={}),"function"!=typeof n&&(n=o),"function"!=typeof r&&(r=null),e(t,n,r)}}i(a,r),a.prototype.destroy=function(e){if(!this._destroyed){this._destroyed=!0;var t=this;n.nextTick((function(){e&&t.emit("error",e),t.emit("close")}))}},t.exports=c((function(e,t,n){var r=new a(e);return r._transform=t,n&&(r._flush=n),r})),t.exports.ctor=c((function(e,t,n){function r(t){if(!(this instanceof r))return new r(t);this.options=s(e,t),a.call(this,this.options)}return i(r,a),r.prototype._transform=t,n&&(r.prototype._flush=n),r})),t.exports.obj=c((function(e,t,n){var r=new a(s({objectMode:!0,highWaterMark:16},e));return r._transform=t,n&&(r._flush=n),r}))}).call(this)}).call(this,e("_process"))}}},{package:"@keystonehq/metamask-airgapped-keyring>@metamask/obs-store>through2",file:"node_modules/@keystonehq/metamask-airgapped-keyring/node_modules/through2/through2.js"}],[64,{"../../../shared/constants/app":4423,"../../../shared/constants/metametrics":4434,"../../../shared/constants/security-provider":4442,"../../../shared/constants/transaction":4449,"../../../ui/helpers/utils/metrics":5311,"../../../ui/pages/confirmations/utils/confirm":5645,"./snap-keyring/metrics":110,"@metamask/controller-utils":1166,"eth-rpc-errors":3205,"ethereumjs-util":3236},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function({trackEvent:e,getMetricsState:t,rateLimitTimeout:n=3e5,rateLimitSamplePercent:v=.001,globalRateLimitTimeout:_=3e5,globalRateLimitMaxAmount:S=10,getAccountType:k,getDeviceModel:E,isConfirmationRedesignEnabled:T,snapAndHardwareMessenger:A,appStateController:M}){return async function(C,P,O){const{origin:I,method:D,params:x}=C,j=f[D]??p.RANDOM_SAMPLE;let N;switch(j){case p.TIMEOUT:N=void 0!==b[D];break;case p.NON_RATE_LIMITED:N=!1;break;case p.BLOCKED:N=!0;break;default:case p.RANDOM_SAMPLE:N=Math.random()>=v}const R=S>0&&w>=S,L=!0===t().participateInMetaMetrics,B=m[D],K={},q=I!==a.ORIGIN_METAMASK&&!N&&!R&&!0===L;if(q){const t=B?B.REQUESTED:o.MetaMetricsEventName.ProviderMethodCalled;if(t===o.MetaMetricsEventName.SignatureRequested){var $,U,H,F,W;let e;var G,V;if(K.signature_type=D,(0,s.isValidAddress)(null==C||null===($=C.params)||void 0===$?void 0:$[1]))e=null==C||null===(G=C.params)||void 0===G?void 0:G[0];else e=null==C||null===(V=C.params)||void 0===V?void 0:V[1];null!==(U=C.securityAlertResponse)&&void 0!==U&&U.providerRequestsCount&&Object.keys(C.securityAlertResponse.providerRequestsCount).forEach((e=>{K[`ppom_${e}_count`]=C.securityAlertResponse.providerRequestsCount[e]})),K.security_alert_response=(null===(H=C.securityAlertResponse)||void 0===H?void 0:H.result_type)??c.BlockaidResultType.NotApplicable,K.security_alert_reason=(null===(F=C.securityAlertResponse)||void 0===F?void 0:F.reason)??c.BlockaidReason.notApplicable,null!==(W=C.securityAlertResponse)&&void 0!==W&&W.description&&(K.security_alert_description=C.securityAlertResponse.description);T()&&d.REDESIGN_APPROVAL_TYPES.find((e=>e===g[D]))&&(K.ui_customizations=[...K.ui_customizations||[],o.MetaMetricsEventUiCustomization.RedesignedConfirmation]);const t=await(0,h.getSnapAndHardwareInfoForMetrics)(k,E,A);Object.assign(K,t);try{if(D===a.MESSAGE_TYPE.PERSONAL_SIGN){const{isSIWEMessage:t}=(0,r.detectSIWE)({data:e});t&&(K.ui_customizations=[...K.ui_customizations||[],o.MetaMetricsEventUiCustomization.Siwe])}}catch(e){console.warn(`createRPCMethodTrackingMiddleware: Errored - ${e}`)}}else K.method=D;const i=y[D];i&&(K.params=i(x)),e({event:t,category:o.MetaMetricsEventCategory.InpageProvider,referrer:{url:I},properties:K}),j===p.TIMEOUT&&(b[D]=setTimeout((()=>{delete b[D]}),n)),w+=1,setTimeout((()=>{w-=1}),_)}O((async t=>{var n,r,s,d;if(!1===q||void 0===B)return t();const h=D===a.MESSAGE_TYPE.ETH_SIGN&&(null===(n=P.error)||void 0===n?void 0:n.code)===i.errorCodes.rpc.methodNotFound;let p;h?(p=B.FAILED,K.error=P.error):(null===(r=P.error)||void 0===r?void 0:r.code)===i.errorCodes.provider.userRejectedRequest?p=B.REJECTED:(null===(s=P.error)||void 0===s?void 0:s.code)===i.errorCodes.rpc.internal&&"Request rejected by user or snap."===(null===(d=P.error)||void 0===d?void 0:d.message)?(p=B.REJECTED,K.status=P.error.message):p=B.APPROVED;let f={};if(!h&&u.SIGNING_METHODS.includes(D)){var g;const e=M.getSignatureSecurityAlertResponse(null===(g=C.securityAlertResponse)||void 0===g?void 0:g.securityAlertId);f=(0,l.getBlockaidMetricsProps)({securityAlertResponse:e})}const m={...K,...f,security_alert_reason:f.security_alert_response===c.BlockaidResultType.Benign?"":f.security_alert_reason};return e({event:p,category:o.MetaMetricsEventCategory.InpageProvider,referrer:{url:I},properties:m}),t()}))}};var r=e("@metamask/controller-utils"),i=e("eth-rpc-errors"),s=e("ethereumjs-util"),a=e("../../../shared/constants/app"),o=e("../../../shared/constants/metametrics"),c=e("../../../shared/constants/security-provider"),u=e("../../../shared/constants/transaction"),l=e("../../../ui/helpers/utils/metrics"),d=e("../../../ui/pages/confirmations/utils/confirm"),h=e("./snap-keyring/metrics");const p={TIMEOUT:"timeout",BLOCKED:"blocked",NON_RATE_LIMITED:"non_rate_limited",RANDOM_SAMPLE:"random_sample"},f={[a.MESSAGE_TYPE.ETH_SIGN]:p.NON_RATE_LIMITED,[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA]:p.NON_RATE_LIMITED,[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA_V3]:p.NON_RATE_LIMITED,[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA_V4]:p.NON_RATE_LIMITED,[a.MESSAGE_TYPE.PERSONAL_SIGN]:p.NON_RATE_LIMITED,[a.MESSAGE_TYPE.ETH_DECRYPT]:p.NON_RATE_LIMITED,[a.MESSAGE_TYPE.ETH_GET_ENCRYPTION_PUBLIC_KEY]:p.NON_RATE_LIMITED,[a.MESSAGE_TYPE.ETH_REQUEST_ACCOUNTS]:p.TIMEOUT,[a.MESSAGE_TYPE.WALLET_REQUEST_PERMISSIONS]:p.TIMEOUT,[a.MESSAGE_TYPE.SEND_METADATA]:p.BLOCKED,[a.MESSAGE_TYPE.ETH_CHAIN_ID]:p.BLOCKED,[a.MESSAGE_TYPE.ETH_ACCOUNTS]:p.BLOCKED,[a.MESSAGE_TYPE.LOG_WEB3_SHIM_USAGE]:p.BLOCKED,[a.MESSAGE_TYPE.GET_PROVIDER_STATE]:p.BLOCKED},g={[a.MESSAGE_TYPE.PERSONAL_SIGN]:r.ApprovalType.PersonalSign,[a.MESSAGE_TYPE.ETH_SIGN]:r.ApprovalType.Sign,[a.MESSAGE_TYPE.SIGN]:r.ApprovalType.SignTransaction,[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA]:r.ApprovalType.EthSignTypedData,[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA_V1]:r.ApprovalType.EthSignTypedData,[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA_V3]:r.ApprovalType.EthSignTypedData,[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA_V4]:r.ApprovalType.EthSignTypedData},m={[a.MESSAGE_TYPE.ETH_SIGN]:{APPROVED:o.MetaMetricsEventName.SignatureApproved,FAILED:o.MetaMetricsEventName.SignatureFailed,REJECTED:o.MetaMetricsEventName.SignatureRejected,REQUESTED:o.MetaMetricsEventName.SignatureRequested},[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA]:{APPROVED:o.MetaMetricsEventName.SignatureApproved,REJECTED:o.MetaMetricsEventName.SignatureRejected,REQUESTED:o.MetaMetricsEventName.SignatureRequested},[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA_V3]:{APPROVED:o.MetaMetricsEventName.SignatureApproved,REJECTED:o.MetaMetricsEventName.SignatureRejected,REQUESTED:o.MetaMetricsEventName.SignatureRequested},[a.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA_V4]:{APPROVED:o.MetaMetricsEventName.SignatureApproved,REJECTED:o.MetaMetricsEventName.SignatureRejected,REQUESTED:o.MetaMetricsEventName.SignatureRequested},[a.MESSAGE_TYPE.PERSONAL_SIGN]:{APPROVED:o.MetaMetricsEventName.SignatureApproved,REJECTED:o.MetaMetricsEventName.SignatureRejected,REQUESTED:o.MetaMetricsEventName.SignatureRequested},[a.MESSAGE_TYPE.ETH_DECRYPT]:{APPROVED:o.MetaMetricsEventName.DecryptionApproved,REJECTED:o.MetaMetricsEventName.DecryptionRejected,REQUESTED:o.MetaMetricsEventName.DecryptionRequested},[a.MESSAGE_TYPE.ETH_GET_ENCRYPTION_PUBLIC_KEY]:{APPROVED:o.MetaMetricsEventName.EncryptionPublicKeyApproved,REJECTED:o.MetaMetricsEventName.EncryptionPublicKeyRejected,REQUESTED:o.MetaMetricsEventName.EncryptionPublicKeyRequested},[a.MESSAGE_TYPE.ETH_REQUEST_ACCOUNTS]:{APPROVED:o.MetaMetricsEventName.PermissionsApproved,REJECTED:o.MetaMetricsEventName.PermissionsRejected,REQUESTED:o.MetaMetricsEventName.PermissionsRequested},[a.MESSAGE_TYPE.WALLET_REQUEST_PERMISSIONS]:{APPROVED:o.MetaMetricsEventName.PermissionsApproved,REJECTED:o.MetaMetricsEventName.PermissionsRejected,REQUESTED:o.MetaMetricsEventName.PermissionsRequested}},y={[a.MESSAGE_TYPE.WATCH_ASSET]:({type:e})=>({type:e})},b={};let w=0}}},{package:"$root$",file:"app/scripts/lib/createRPCMethodTrackingMiddleware.js"}],[65,{"promise-to-callback":3926,"readable-stream":4188},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,t){return new a(e,t)};var r,i=e("readable-stream"),s=(r=e("promise-to-callback"))&&r.__esModule?r:{default:r};class a extends i.Writable{constructor(e,t){super({objectMode:!0,...t}),this._asyncWriteFn=e}_write(e,t,n){(0,s.default)(this._asyncWriteFn(e,t))(n)}}}}},{package:"$root$",file:"app/scripts/lib/createStreamSink.js"}],[66,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return function(t,n,r){t.tabId=e.tabId,r()}}}}},{package:"$root$",file:"app/scripts/lib/createTabIdMiddleware.js"}],[67,{"@metamask/browser-passworder":1158},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.encryptorFactory=void 0;var r=e("@metamask/browser-passworder");const i=e=>async(t,n,i,s)=>(0,r.encrypt)(t,n,i,s,{algorithm:"PBKDF2",params:{iterations:e}}),s=e=>async(t,n,i)=>(0,r.encryptWithDetail)(t,n,i,{algorithm:"PBKDF2",params:{iterations:e}}),a=e=>async(t,n,i,s)=>(0,r.keyFromPassword)(t,n,i,s??{algorithm:"PBKDF2",params:{iterations:e}}),o=e=>t=>(0,r.isVaultUpdated)(t,{algorithm:"PBKDF2",params:{iterations:e}});n.encryptorFactory=e=>({encrypt:i(e),encryptWithKey:r.encryptWithKey,encryptWithDetail:s(e),decrypt:r.decrypt,decryptWithKey:r.decryptWithKey,decryptWithDetail:r.decryptWithDetail,keyFromPassword:a(e),isVaultUpdated:o(e),importKey:r.importKey,exportKey:r.exportKey,generateSalt:r.generateSalt})}}},{package:"$root$",file:"app/scripts/lib/encryptor-factory.ts"}],[68,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default=[{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"resolver",outputs:[{name:"",type:"address"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"label",type:"bytes32"},{name:"owner",type:"address"}],name:"setSubnodeOwner",outputs:[],payable:!1,type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"ttl",type:"uint64"}],name:"setTTL",outputs:[],payable:!1,type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"ttl",outputs:[{name:"",type:"uint64"}],payable:!1,type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"resolver",type:"address"}],name:"setResolver",outputs:[],payable:!1,type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"owner",type:"address"}],name:"setOwner",outputs:[],payable:!1,type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"owner",type:"address"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!0,name:"label",type:"bytes32"},{indexed:!1,name:"owner",type:"address"}],name:"NewOwner",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"resolver",type:"address"}],name:"NewResolver",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"ttl",type:"uint64"}],name:"NewTTL",type:"event"}]}}},{package:"$root$",file:"app/scripts/lib/ens-ipfs/contracts/registry.js"}],[69,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default=[{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"hash",type:"bytes32"}],name:"setContent",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"content",outputs:[{name:"",type:"bytes32"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"interfaceID",type:"bytes4"}],name:"supportsInterface",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"pure",type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"key",type:"string"},{name:"value",type:"string"}],name:"setText",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"},{name:"contentTypes",type:"uint256"}],name:"ABI",outputs:[{name:"contentType",type:"uint256"},{name:"data",type:"bytes"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"x",type:"bytes32"},{name:"y",type:"bytes32"}],name:"setPubkey",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"hash",type:"bytes"}],name:"setContenthash",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"addr",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"},{name:"key",type:"string"}],name:"text",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"contentType",type:"uint256"},{name:"data",type:"bytes"}],name:"setABI",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"name",type:"string"}],name:"setName",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"contenthash",outputs:[{name:"",type:"bytes"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"pubkey",outputs:[{name:"x",type:"bytes32"},{name:"y",type:"bytes32"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"addr",type:"address"}],name:"setAddr",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[{name:"ensAddr",type:"address"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"a",type:"address"}],name:"AddrChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"name",type:"string"}],name:"NameChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!0,name:"contentType",type:"uint256"}],name:"ABIChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"x",type:"bytes32"},{indexed:!1,name:"y",type:"bytes32"}],name:"PubkeyChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"indexedKey",type:"string"},{indexed:!1,name:"key",type:"string"}],name:"TextChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"hash",type:"bytes"}],name:"ContenthashChanged",type:"event"}]}}},{package:"$root$",file:"app/scripts/lib/ens-ipfs/contracts/resolver.js"}],[7,{"../../../shared/constants/alerts":4422,"@metamask/obs-store":1565},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("@metamask/obs-store"),i=e("../../../shared/constants/alerts");const s={alertEnabledness:i.TOGGLEABLE_ALERT_TYPES.reduce(((e,t)=>(e[t]=!0,e)),{}),unconnectedAccountAlertShownOrigins:{},web3ShimUsageOrigins:{}};n.default=class{constructor(e={}){const{initState:t={},controllerMessenger:n}=e,i={...s,alertEnabledness:{...s.alertEnabledness,...t.alertEnabledness}};this.store=new r.ObservableStore(i),this.controllerMessenger=n,this.selectedAddress=this.controllerMessenger.call("AccountsController:getSelectedAccount"),this.controllerMessenger.subscribe("AccountsController:selectedAccountChange",(e=>{this.store.getState().unconnectedAccountAlertShownOrigins&&this.selectedAddress!==e.address&&(this.selectedAddress=e.address,this.store.updateState({unconnectedAccountAlertShownOrigins:{}}))}))}setAlertEnabledness(e,t){let{alertEnabledness:n}=this.store.getState();n={...n},n[e]=t,this.store.updateState({alertEnabledness:n})}setUnconnectedAccountAlertShown(e){let{unconnectedAccountAlertShownOrigins:t}=this.store.getState();t={...t},t[e]=!0,this.store.updateState({unconnectedAccountAlertShownOrigins:t})}getWeb3ShimUsageState(e){return this.store.getState().web3ShimUsageOrigins[e]}setWeb3ShimUsageRecorded(e){this._setWeb3ShimUsageState(e,i.Web3ShimUsageAlertStates.recorded)}setWeb3ShimUsageAlertDismissed(e){this._setWeb3ShimUsageState(e,i.Web3ShimUsageAlertStates.dismissed)}_setWeb3ShimUsageState(e,t){let{web3ShimUsageOrigins:n}=this.store.getState();n={...n},n[e]=t,this.store.updateState({web3ShimUsageOrigins:n})}}}}},{package:"$root$",file:"app/scripts/controllers/alert.js"}],[70,{"./contracts/registry":68,"./contracts/resolver":69,"@ensdomains/content-hash":367,"@metamask/ethjs-contract":1330,"@metamask/ethjs-query":1334,"eth-ens-namehash":3173},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=async function({provider:e,name:t}){const n=new i.default(e),u=r.default.hash(t),d=new s.default(n),h=Number.parseInt(await n.net_version(),10),p=function(e){switch(e){case 1:case 3:case 4:case 5:case 6:return"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";default:return null}}(h);if(!p)throw new Error(`EnsIpfsResolver - no known ens-ipfs registry for chainId "${h}"`);const f=d(o.default).at(p),g=(await f.resolver(u))[0];if(l(g))throw new Error(`EnsIpfsResolver - no resolver found for name "${t}"`);const m=d(c.default).at(g),y=await m.supportsInterface("0xbc1c58d1"),b=await m.supportsInterface("0xd8389dc5");if(y[0]){const e=(await m.contenthash(u))[0];let t=a.default.decode(e);const n=a.default.getCodec(e);return"ipfs-ns"!==n&&"ipns-ns"!==n||(t=a.default.helpers.cidV0ToV1Base32(t)),{type:n,hash:t}}if(b[0]){const e=(await m.content(u))[0];if(l(e))throw new Error(`EnsIpfsResolver - no content ID found for name "${t}"`);return{type:"swarm-ns",hash:e.slice(2)}}throw new Error(`EnsIpfsResolver - the resolver for name "${t}" is not standard, it should either supports contenthash() or content()`)};var r=u(e("eth-ens-namehash")),i=u(e("@metamask/ethjs-query")),s=u(e("@metamask/ethjs-contract")),a=u(e("@ensdomains/content-hash")),o=u(e("./contracts/registry")),c=u(e("./contracts/resolver"));function u(e){return e&&e.__esModule?e:{default:e}}function l(e){return[undefined,null,"0x","0x0","0x0000000000000000000000000000000000000000000000000000000000000000"].includes(e)}}}},{package:"$root$",file:"app/scripts/lib/ens-ipfs/resolver.js"}],[71,{"../../../../shared/modules/fetch-with-timeout":4470,"./resolver":70,"base32-encode":2885,"base64-js":2886,"webextension-polyfill":4402},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function({provider:e,getCurrentChainId:t,getIpfsGateway:n,getUseAddressBarEnsResolution:r}){s.map((e=>`*://*.${e}/*`))};i(e("base32-encode")),i(e("base64-js")),i(e("webextension-polyfill"));var r=i(e("../../../../shared/modules/fetch-with-timeout"));i(e("./resolver"));function i(e){return e&&e.__esModule?e:{default:e}}(0,r.default)();const s=["eth"]}}},{package:"$root$",file:"app/scripts/lib/ens-ipfs/setup.js"}],[74,{lodash:3783},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return i((0,r.cloneDeep)(e),(e=>null===e?"null":typeof e))};var r=e("lodash");function i(e={},t){return Object.entries(e).forEach((([n,r])=>{e[n]="object"==typeof r&&null!==r?i(r,t):t(r)})),e}}}},{package:"$root$",file:"app/scripts/lib/getObjStructure.js"}],[75,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.hardwareKeyringBuilderFactory=function(e,t){const n=()=>new e({bridge:new t});return n.type=e.type,n}}}},{package:"$root$",file:"app/scripts/lib/hardware-keyring-builder-factory.ts"}],[76,{"@metamask/keyring-api":1399,"@metamask/permission-controller":1579},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.isProtocolAllowed=c,n.keyringSnapPermissionsBuilder=function(e,t){return()=>{if("metamask"===t)return s;const n=e.getSubjectMetadata(t);return(null==n?void 0:n.subjectType)===r.SubjectType.Website&&c(t)?a:[]}};var r=e("@metamask/permission-controller"),i=e("@metamask/keyring-api");const s=[i.KeyringRpcMethod.ListAccounts,i.KeyringRpcMethod.GetAccount,i.KeyringRpcMethod.FilterAccountChains,i.KeyringRpcMethod.DeleteAccount,i.KeyringRpcMethod.ListRequests,i.KeyringRpcMethod.GetRequest,i.KeyringRpcMethod.SubmitRequest,i.KeyringRpcMethod.RejectRequest],a=[i.KeyringRpcMethod.ListAccounts,i.KeyringRpcMethod.GetAccount,i.KeyringRpcMethod.CreateAccount,i.KeyringRpcMethod.FilterAccountChains,i.KeyringRpcMethod.UpdateAccount,i.KeyringRpcMethod.DeleteAccount,i.KeyringRpcMethod.ExportAccount,i.KeyringRpcMethod.ListRequests,i.KeyringRpcMethod.GetRequest,i.KeyringRpcMethod.ApproveRequest,i.KeyringRpcMethod.RejectRequest,i.KeyringRpcMethod.SubmitRequest],o=["https:"];function c(e){try{const t=new URL(e);return o.includes(t.protocol)}catch(e){return!1}}}}},{package:"$root$",file:"app/scripts/lib/keyring-snaps-permissions.ts"}],[79,{"../util":119,"json-rpc-engine":3627},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.createPendingNonceMiddleware=function({getPendingNonce:e}){return(0,r.createAsyncMiddleware)((async(t,n,r)=>{const{method:i,params:s}=t;if("eth_getTransactionCount"!==i)return void r();const[a,o]=s;"pending"===o?n.result=await e(a,t.networkClientId):r()}))},n.createPendingTxMiddleware=function({getPendingTransactionByHash:e}){return(0,r.createAsyncMiddleware)((async(t,n,r)=>{const{method:s,params:a}=t;if("eth_getTransactionByHash"!==s)return void r();const[o]=a,c=e(o);c?n.result=(0,i.formatTxMetaForRpcResult)(c):r()}))};var r=e("json-rpc-engine"),i=e("../util")}}},{package:"$root$",file:"app/scripts/lib/middleware/pending.js"}],[8,{"@metamask/obs-store":1565,events:3276},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r,i=(r=e("events"))&&r.__esModule?r:{default:r},s=e("@metamask/obs-store");function a(e,t){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.add(e)}function o(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(n!==undefined){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}const u={currentAppVersion:"",previousAppVersion:"",previousMigrationVersion:0,currentMigrationVersion:0,showTokenAutodetectModalOnUpgrade:!1};var l=new WeakSet,d=new WeakSet;class h extends i.default{constructor({currentAppVersion:e="",currentMigrationVersion:t=0,state:n={}}){super(),a(this,d),a(this,l),o(this,"store",void 0),this.store=new s.ObservableStore({...u,...n}),c(this,l,p).call(this,e),c(this,d,f).call(this,t)}setShowTokenAutodetectModalOnUpgrade(e){this.store.updateState({showTokenAutodetectModalOnUpgrade:e})}}function p(e){const t=this.store.getState().currentAppVersion;e!==t&&this.store.updateState({currentAppVersion:e,previousAppVersion:t,showTokenAutodetectModalOnUpgrade:null})}function f(e){const t=this.store.getState().currentMigrationVersion;e!==t&&this.store.updateState({previousMigrationVersion:t,currentMigrationVersion:e})}n.default=h}}},{package:"$root$",file:"app/scripts/controllers/app-metadata.ts"}],[80,{events:3276,loglevel:3789},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=s(e("events")),i=s(e("loglevel"));function s(e){return e&&e.__esModule?e:{default:e}}class a extends r.default{constructor(e={}){super();const t=e.migrations||[];this.migrations=t.sort(((e,t)=>e.version-t.version));const n=this.migrations.slice(-1)[0];this.defaultVersion=e.defaultVersion||n&&n.version||0}async migrateData(e=this.generateInitialState()){const t=this.migrations.filter((function(t){return t.version>e.meta.version}));for(const n of t)try{i.default.info(`Running migration ${n.version}...`);const t=await n.migrate(e);if(!t.data)throw new Error("Migrator - migration returned empty data");if(t.version!==undefined&&t.meta.version!==n.version)throw new Error("Migrator - Migration did not update version number correctly");e=t,i.default.info(`Migration ${n.version} complete`)}catch(t){const r=t.message;return t.message=`MetaMask Migration Error #${n.version}: ${r}`,this.emit("error",t),e}return e}generateInitialState(e){return{meta:{version:this.defaultVersion},data:e}}}n.default=a}}},{package:"$root$",file:"app/scripts/lib/migrator/index.js"}],[83,{"../../../shared/constants/notifications":4437,"../platforms/extension":255,"@metamask/safe-event-emitter":1673},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=n.NOTIFICATION_MANAGER_EVENTS=void 0;var r=a(e("@metamask/safe-event-emitter")),i=a(e("../platforms/extension")),s=e("../../../shared/constants/notifications");function a(e){return e&&e.__esModule?e:{default:e}}const o=n.NOTIFICATION_MANAGER_EVENTS={POPUP_CLOSED:"onPopupClosed"};class c extends r.default{constructor(){super(),this.platform=new i.default,this.platform.addOnRemovedListener(this._onWindowClosed.bind(this))}markAsAutomaticallyClosed(){this._popupAutomaticallyClosed=!0}async showPopup(e,t){this._popupId=t,this._setCurrentPopupId=e;const n=await this._getPopup(t);if(n)await this.platform.focusWindow(n.id);else{let e=0,t=0;try{const n=await this.platform.getLastFocusedWindow();t=n.top,e=Math.max(n.left+(n.width-s.NOTIFICATION_WIDTH),0)}catch(n){const{screenX:r,screenY:i,outerWidth:a}=window;t=Math.max(i,0),e=Math.max(r+(a-s.NOTIFICATION_WIDTH),0)}const n=await this.platform.openWindow({url:"notification.html",type:"popup",width:s.NOTIFICATION_WIDTH,height:s.NOTIFICATION_HEIGHT,left:e,top:t});n.left!==e&&"fullscreen"!==n.state&&await this.platform.updateWindowPosition(n.id,e,t),this._setCurrentPopupId(n.id),this._popupId=n.id}}_onWindowClosed(e){e===this._popupId&&(this._setCurrentPopupId(undefined),this._popupId=undefined,this.emit(o.POPUP_CLOSED,{automaticallyClosed:this._popupAutomaticallyClosed}),this._popupAutomaticallyClosed=undefined)}async _getPopup(){const e=await this.platform.getAllWindows();return this._getPopupIn(e)}_getPopupIn(e){return e?e.find((e=>e&&"popup"===e.type&&e.id===this._popupId)):null}}n.default=c}}},{package:"$root$",file:"app/scripts/lib/notification-manager.js"}],[84,{"../../../../shared/constants/offscreen-communication":4438,"eth-lattice-keyring":3174},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.LatticeKeyringOffscreen=void 0;var r,i=(r=e("eth-lattice-keyring"))&&r.__esModule?r:{default:r},s=e("../../../../shared/constants/offscreen-communication");class a extends i.default{constructor(e={}){super(e)}async _getCreds(){try{const e=this.appName?this.appName:"Unknown",t=`${s.KnownOrigins.lattice}?keyring=${e}&forceLogin=true`;return await new Promise(((e,n)=>{chrome.runtime.sendMessage({target:s.OffscreenCommunicationTarget.latticeOffscreen,params:{url:t}},(t=>{t.error&&n(t.error),e(t.result)}))}))}catch(e){throw new Error(e)}}}n.LatticeKeyringOffscreen=a,function(e,t,n){(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(n!==undefined){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}(a,"type",void 0),a.type=i.default.type}}},{package:"$root$",file:"app/scripts/lib/offscreen-bridge/lattice-offscreen-keyring.ts"}],[85,{"../../../../shared/constants/offscreen-communication":4438},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.LedgerOffscreenBridge=void 0;var r=e("../../../../shared/constants/offscreen-communication");function i(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(n!==undefined){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.LedgerOffscreenBridge=class{constructor(){i(this,"isDeviceConnected",!1)}init(){return chrome.runtime.onMessage.addListener((e=>{e.target===r.OffscreenCommunicationTarget.extension&&e.event===r.OffscreenCommunicationEvents.ledgerDeviceConnect&&(this.isDeviceConnected=!0)})),Promise.resolve()}destroy(){return Promise.resolve()}attemptMakeApp(){return new Promise(((e,t)=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.ledgerOffscreen,action:r.LedgerAction.makeApp},(n=>{n.success?e(!0):n.error?t(n.error):t(new Error("Unknown error occurred"))}))}))}updateTransportMethod(e){return new Promise(((t,n)=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.ledgerOffscreen,action:r.LedgerAction.updateTransport,params:{transportType:e}},(e=>{e.success?t(!0):n(new Error("Ledger transport could not be updated"))}))}))}getPublicKey(e){return new Promise(((t,n)=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.ledgerOffscreen,action:r.LedgerAction.getPublicKey,params:e},(e=>{e.success?t(e.payload):n(e.payload.error)}))}))}deviceSignTransaction(e){return new Promise(((t,n)=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.ledgerOffscreen,action:r.LedgerAction.signTransaction,params:e},(e=>{e.success?t(e.payload):n(e.payload.error)}))}))}deviceSignMessage(e){return new Promise(((t,n)=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.ledgerOffscreen,action:r.LedgerAction.signPersonalMessage,params:e},(e=>{e.success?t(e.payload):n(e.payload.error)}))}))}deviceSignTypedData(e){return new Promise(((t,n)=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.ledgerOffscreen,action:r.LedgerAction.signTypedData,params:e},(e=>{e.success?t(e.payload):n(e.payload.error)}))}))}}}}},{package:"$root$",file:"app/scripts/lib/offscreen-bridge/ledger-offscreen-bridge.ts"}],[86,{"../../../../shared/constants/offscreen-communication":4438},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.TrezorOffscreenBridge=void 0;var r=e("../../../../shared/constants/offscreen-communication");function i(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(n!==undefined){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.TrezorOffscreenBridge=class{constructor(){i(this,"model",void 0)}init(e){return chrome.runtime.onMessage.addListener((e=>{e.target===r.OffscreenCommunicationTarget.extension&&e.event===r.OffscreenCommunicationEvents.trezorDeviceConnect&&(this.model=e.payload)})),new Promise((t=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.trezorOffscreen,action:r.TrezorAction.init,params:e},(()=>{t()}))}))}dispose(){return new Promise((e=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.trezorOffscreen,action:r.TrezorAction.dispose},(()=>{e()}))}))}getPublicKey(e){return new Promise((t=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.trezorOffscreen,action:r.TrezorAction.getPublicKey,params:e},(e=>{t(e)}))}))}ethereumSignTransaction(e){return new Promise((t=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.trezorOffscreen,action:r.TrezorAction.signTransaction,params:e},(e=>{t(e)}))}))}ethereumSignMessage(e){return new Promise((t=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.trezorOffscreen,action:r.TrezorAction.signMessage,params:e},(e=>{t(e)}))}))}ethereumSignTypedData(e){return new Promise((t=>{chrome.runtime.sendMessage({target:r.OffscreenCommunicationTarget.trezorOffscreen,action:r.TrezorAction.signTypedData,params:e},(e=>{t(e)}))}))}}}}},{package:"$root$",file:"app/scripts/lib/offscreen-bridge/trezor-offscreen-bridge.ts"}],[87,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){function r(e,t){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.add(e)}function i(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(n!==undefined){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(n,"__esModule",{value:!0}),n.IndexedDBPPOMStorage=void 0;const s=async(e,t,n)=>{const r=await crypto.subtle.digest("SHA-256",t);if(Array.from(new Uint8Array(r)).map((e=>e.toString(16).padStart(2,"0"))).join("")!==n)throw new Error(`Checksum mismatch for key ${e}`)};var a=new WeakSet;function o(e){return new Promise(((t,n)=>{const r=indexedDB.open(this.storeName,this.dbVersion);r.onerror=e=>{var t;n(new Error(`Failed to open database ${this.storeName}: ${null===(t=e.target)||void 0===t?void 0:t.error}`))},r.onupgradeneeded=e=>{const t=e.target.result;t.objectStoreNames.contains(this.storeName)||t.createObjectStore(this.storeName,{keyPath:["name","chainId"]})},r.onsuccess=n=>{const r=n.target.result.transaction([this.storeName],e).objectStore(this.storeName);t(r)}}))}n.IndexedDBPPOMStorage=class{constructor(e,t){r(this,a),i(this,"storeName",void 0),i(this,"dbVersion",void 0),this.storeName=e,this.dbVersion=t}async objectStoreAction(e,t,n="readonly"){return new Promise(((r,i)=>{(function(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n})(this,a,o).call(this,n).then((n=>{const s=n[e](t);s.onsuccess=async e=>{r(e)},s.onerror=t=>{var n;i(new Error(`Error in indexDB operation ${e}: ${null===(n=t.target)||void 0===n?void 0:n.error}`))}})).catch((e=>{i(e)}))}))}async read(e,t){var n;const r=null===(n=(await this.objectStoreAction("get",[e.name,e.chainId])).target)||void 0===n||null===(n=n.result)||void 0===n?void 0:n.data;return await s(e,r,t),r}async write(e,t,n){await s(e,t,n),await this.objectStoreAction("put",{...e,data:t},"readwrite")}async delete(e){await this.objectStoreAction("delete",[e.name,e.chainId],"readwrite")}async dir(){var e;return null===(e=(await this.objectStoreAction("getAllKeys")).target)||void 0===e?void 0:e.result.map((([e,t])=>({name:e,chainId:t})))}}}}},{package:"$root$",file:"app/scripts/lib/ppom/indexed-db-backend.ts"}],[88,{"../../../../shared/constants/security-provider":4442,"../../../../shared/constants/transaction":4449,"./ppom-util":89},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.createPPOMMiddleware=function(e,t,n,o,c){return async(u,l,d)=>{try{var h;const l=null===(h=t.store.getState())||void 0===h?void 0:h.securityAlertsEnabled,{chainId:d}=n.state.providerConfig;if(!l||!a.includes(u.method)||!i.SECURITY_PROVIDER_SUPPORTED_CHAIN_IDS.includes(d))return;const p=(0,s.generateSecurityAlertId)();(0,s.validateRequestWithPPOM)({ppomController:e,request:u,securityAlertId:p}).then((e=>{c(u.method,p,e)}));const f={...i.LOADING_SECURITY_ALERT_RESPONSE,securityAlertId:p};r.SIGNING_METHODS.includes(u.method)&&o.addSignatureSecurityAlertResponse(f),u.securityAlertResponse=f}catch(e){u.securityAlertResponse=(0,s.handlePPOMError)(e,"Error createPPOMMiddleware: ")}finally{d()}}};var r=e("../../../../shared/constants/transaction"),i=e("../../../../shared/constants/security-provider"),s=e("./ppom-util");const a=Object.freeze(["eth_sendRawTransaction","eth_sendTransaction",...r.SIGNING_METHODS])}}},{package:"$root$",file:"app/scripts/lib/ppom/ppom-middleware.ts"}],[89,{"../../../../shared/constants/security-provider":4442,"../../../../shared/constants/transaction":4449,"@metamask/transaction-controller":2189,uuid:4354},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.generateSecurityAlertId=function(){return(0,i.v4)()},n.handlePPOMError=l,n.updateSecurityAlertResponse=async function({appStateController:e,method:t,securityAlertId:n,securityAlertResponse:r,signatureController:i,transactionController:s}){const o=a.SIGNING_METHODS.includes(t),c=await async function(e,t,n,r){const i=a.SIGNING_METHODS.includes(t);for(;;){let t;if(t=i?Object.values(n.messages).find((t=>{var n;return(null===(n=t.securityAlertResponse)||void 0===n?void 0:n.securityAlertId)===e})):r.state.transactions.find((t=>{var n;return(null===(n=t.securityAlertResponse)||void 0===n?void 0:n.securityAlertId)===e})),t)return t;await new Promise((e=>setTimeout(e,100)))}}(n,t,i,s);o?e.addSignatureSecurityAlertResponse(r):s.updateSecurityAlertResponse(c.id,r)},n.validateRequestWithPPOM=async function({ppomController:e,request:t,securityAlertId:n}){try{return await e.usePPOM((async e=>await async function(e,t,n){try{const i=function(e){var t;if(e.method!==c)return e;const n=(null===(t=e.params)||void 0===t?void 0:t[0])||{},i=(0,r.normalizeTransactionParams)(n);return{...e,params:[i]}}(e);return{...await n.validateJsonRpc(i),securityAlertId:t}}catch(e){return l(e,"Error validating JSON RPC using PPOM: ")}}(t,n,e)))}catch(e){return l(e,"Error validateRequestWithPPOM#usePPOM: ")}};var r=e("@metamask/transaction-controller"),i=e("uuid"),s=e("../../../../shared/constants/security-provider"),a=e("../../../../shared/constants/transaction");const{sentry:o}=global,c="eth_sendTransaction",u={result_type:s.BlockaidResultType.Errored,reason:s.BlockaidReason.errored};function l(e,t){const n=function(e){if("object"==typeof e||"string"==typeof e)return e;return JSON.stringify(e)}(e),r=function(e){if(e instanceof Error)return`${e.name}: ${e.message}`;return JSON.stringify(e)}(e);return null==o||o.captureException(e),console.error(t,n),{...u,description:r}}}}},{package:"$root$",file:"app/scripts/lib/ppom/ppom-util.ts"}],[9,{"../../../shared/constants/alarms":4421,"../../../shared/constants/app":4423,"../../../shared/constants/preferences":4441,"../../../shared/constants/time":4447,"../../../shared/modules/mv3.utils":4475,"../../../ui/helpers/utils/build-types":5301,"../metamask-controller":120,"@metamask/controller-utils":1166,"@metamask/obs-store":1565,events:3276,loglevel:3789,uuid:4354},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=g(e("events")),i=e("@metamask/obs-store"),s=e("uuid"),a=g(e("loglevel")),o=e("@metamask/controller-utils"),c=e("../metamask-controller"),u=e("../../../shared/constants/time"),l=e("../../../shared/constants/alarms"),d=e("../../../shared/modules/mv3.utils"),h=e("../../../ui/helpers/utils/build-types"),p=e("../../../shared/constants/app"),f=e("../../../shared/constants/preferences");function g(e){return e&&e.__esModule?e:{default:e}}class m extends r.default{constructor(e={}){const{addUnlockListener:t,isUnlocked:n,initState:r,onInactiveTimeout:s,preferencesStore:a,messenger:o,extension:c}=e;super(),this.extension=c,this.onInactiveTimeout=s||(()=>undefined),this.store=new i.ObservableStore({timeoutMinutes:f.DEFAULT_AUTO_LOCK_TIME_LIMIT,connectedStatusPopoverHasBeenShown:!0,defaultHomeActiveTabName:null,browserEnvironment:{},popupGasPollTokens:[],notificationGasPollTokens:[],fullScreenGasPollTokens:[],recoveryPhraseReminderHasBeenShown:!1,recoveryPhraseReminderLastShown:(new Date).getTime(),outdatedBrowserWarningLastShown:(new Date).getTime(),nftsDetectionNoticeDismissed:!1,showTestnetMessageInDropdown:!0,showBetaHeader:(0,h.isBeta)(),showPermissionsTour:!0,showNetworkBanner:!0,showAccountBanner:!0,trezorModel:null,currentPopupId:undefined,onboardingDate:null,newPrivacyPolicyToastClickedOrClosed:null,newPrivacyPolicyToastShownDate:null,hadAdvancedGasFeesSetPriorToMigration92_3:!1,...r,qrHardware:{},nftsDropdownState:{},usedNetworks:{"0x1":!0,"0x5":!0,"0x539":!0},surveyLinkLastClickedOrClosed:null,signatureSecurityAlertResponses:{},switchedNetworkDetails:null,switchedNetworkNeverShowMessage:!1,currentExtensionPopupId:0}),this.timer=null,this.isUnlocked=n,this.waitingForUnlock=[],t(this.handleUnlock.bind(this)),a.subscribe((({preferences:e})=>{this.store.getState().timeoutMinutes!==e.autoLockTimeLimit&&this._setInactiveTimeout(e.autoLockTimeLimit)})),o.subscribe("KeyringController:qrKeyringStateChange",(e=>this.store.updateState({qrHardware:e})));const{preferences:u}=a.getState();this._setInactiveTimeout(u.autoLockTimeLimit),this.messagingSystem=o,this._approvalRequestId=null}getUnlockPromise(e){return new Promise((t=>{this.isUnlocked()?t():this.waitForUnlock(t,e)}))}waitForUnlock(e,t){this.waitingForUnlock.push({resolve:e}),this.emit(c.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE),t&&this._requestApproval()}handleUnlock(){if(this.waitingForUnlock.length>0){for(;this.waitingForUnlock.length>0;)this.waitingForUnlock.shift().resolve();this.emit(c.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE)}this._acceptApproval()}setDefaultHomeActiveTabName(e){this.store.updateState({defaultHomeActiveTabName:e})}setConnectedStatusPopoverHasBeenShown(){this.store.updateState({connectedStatusPopoverHasBeenShown:!0})}setRecoveryPhraseReminderHasBeenShown(){this.store.updateState({recoveryPhraseReminderHasBeenShown:!0})}setSurveyLinkLastClickedOrClosed(e){this.store.updateState({surveyLinkLastClickedOrClosed:e})}setOnboardingDate(){this.store.updateState({onboardingDate:Date.now()})}setNewPrivacyPolicyToastClickedOrClosed(){this.store.updateState({newPrivacyPolicyToastClickedOrClosed:!0})}setNewPrivacyPolicyToastShownDate(e){this.store.updateState({newPrivacyPolicyToastShownDate:e})}setRecoveryPhraseReminderLastShown(e){this.store.updateState({recoveryPhraseReminderLastShown:e})}setTermsOfUseLastAgreed(e){this.store.updateState({termsOfUseLastAgreed:e})}setSnapsInstallPrivacyWarningShownStatus(e){this.store.updateState({snapsInstallPrivacyWarningShown:e})}setOutdatedBrowserWarningLastShown(e){this.store.updateState({outdatedBrowserWarningLastShown:e})}setLastActiveTime(){this._resetTimer()}_setInactiveTimeout(e){this.store.updateState({timeoutMinutes:e}),this._resetTimer()}_resetTimer(){const{timeoutMinutes:e}=this.store.getState();if(this.timer?clearTimeout(this.timer):d.isManifestV3&&this.extension.alarms.clear(l.AUTO_LOCK_TIMEOUT_ALARM),!e)return;const t=Number(e);d.isManifestV3?(this.extension.alarms.create(l.AUTO_LOCK_TIMEOUT_ALARM,{delayInMinutes:t,periodInMinutes:t}),this.extension.alarms.onAlarm.addListener((e=>{e.name===l.AUTO_LOCK_TIMEOUT_ALARM&&(this.onInactiveTimeout(),this.extension.alarms.clear(l.AUTO_LOCK_TIMEOUT_ALARM))}))):this.timer=setTimeout((()=>this.onInactiveTimeout()),t*u.MINUTE)}setBrowserEnvironment(e,t){this.store.updateState({browserEnvironment:{os:e,browser:t}})}addPollingToken(e,t){if(t!==p.POLLING_TOKEN_ENVIRONMENT_TYPES[p.ENVIRONMENT_TYPE_BACKGROUND]){const n=this.store.getState()[t];this.store.updateState({[t]:[...n,e]})}}removePollingToken(e,t){if(t!==p.POLLING_TOKEN_ENVIRONMENT_TYPES[p.ENVIRONMENT_TYPE_BACKGROUND]){const n=this.store.getState()[t];this.store.updateState({[t]:n.filter((t=>t!==e))})}}clearPollingTokens(){this.store.updateState({popupGasPollTokens:[],notificationGasPollTokens:[],fullScreenGasPollTokens:[]})}setShowTestnetMessageInDropdown(e){this.store.updateState({showTestnetMessageInDropdown:e})}setShowBetaHeader(e){this.store.updateState({showBetaHeader:e})}setShowPermissionsTour(e){this.store.updateState({showPermissionsTour:e})}setShowNetworkBanner(e){this.store.updateState({showNetworkBanner:e})}setShowAccountBanner(e){this.store.updateState({showAccountBanner:e})}setCurrentExtensionPopupId(e){this.store.updateState({currentExtensionPopupId:e})}setSwitchedNetworkDetails(e){this.store.updateState({switchedNetworkDetails:e})}clearSwitchedNetworkDetails(){this.store.updateState({switchedNetworkDetails:null})}setSwitchedNetworkNeverShowMessage(e){this.store.updateState({switchedNetworkDetails:null,switchedNetworkNeverShowMessage:e})}setTrezorModel(e){this.store.updateState({trezorModel:e})}updateNftDropDownState(e){this.store.updateState({nftsDropdownState:e})}setFirstTimeUsedNetwork(e){const t=this.store.getState(),{usedNetworks:n}=t;n[e]=!0,this.store.updateState({usedNetworks:n})}getSignatureSecurityAlertResponse(e){return this.store.getState().signatureSecurityAlertResponses[e]}addSignatureSecurityAlertResponse(e){const t=this.store.getState(),{signatureSecurityAlertResponses:n}=t;this.store.updateState({signatureSecurityAlertResponses:{...n,[e.securityAlertId]:e}})}setCurrentPopupId(e){this.store.updateState({currentPopupId:e})}getCurrentPopupId(){return this.store.getState().currentPopupId}_requestApproval(){this._approvalRequestId||(this._approvalRequestId=(0,s.v4)(),this.messagingSystem.call("ApprovalController:addRequest",{id:this._approvalRequestId,origin:p.ORIGIN_METAMASK,type:o.ApprovalType.Unlock},!0).catch((()=>{this._approvalRequestId=null})))}_acceptApproval(){if(this._approvalRequestId){try{this.messagingSystem.call("ApprovalController:acceptRequest",this._approvalRequestId)}catch(e){a.default.error("Failed to unlock approval request",e)}this._approvalRequestId=null}}}n.default=m}}},{package:"$root$",file:"app/scripts/controllers/app-state.js"}],[90,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){let r;Object.defineProperty(n,"__esModule",{value:!0}),n.default=n.PPOM=void 0,n.initSync=function(e){if(r!==undefined)return r;const t=A();e instanceof WebAssembly.Module||(e=new WebAssembly.Module(e));const n=new WebAssembly.Instance(e,t);return M(n,e)},n.main=function(){r.main()};const i="undefined"!=typeof TextDecoder?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};"undefined"!=typeof TextDecoder&&i.decode();let s=null;function a(){return null!==s&&0!==s.byteLength||(s=new Uint8Array(r.memory.buffer)),s}function o(e,t){return e>>>=0,i.decode(a().subarray(e,e+t))}const c=new Array(128).fill(undefined);c.push(undefined,null,!0,!1);let u=c.length;function l(e){u===c.length&&c.push(c.length+1);const t=u;return u=c[t],c[t]=e,t}function d(e){return c[e]}function h(e){const t=d(e);return function(e){e<132||(c[e]=u,u=e)}(e),t}let p=0;const f="undefined"!=typeof TextEncoder?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},g="function"==typeof f.encodeInto?function(e,t){return f.encodeInto(e,t)}:function(e,t){const n=f.encode(e);return t.set(n),{read:e.length,written:n.length}};function m(e,t,n){if(n===undefined){const n=f.encode(e),r=t(n.length,1)>>>0;return a().subarray(r,r+n.length).set(n),p=n.length,r}let r=e.length,i=t(r,1)>>>0;const s=a();let o=0;for(;o<r;o++){const t=e.charCodeAt(o);if(t>127)break;s[i+o]=t}if(o!==r){0!==o&&(e=e.slice(o)),i=n(i,r,r=o+3*e.length,1)>>>0;const t=a().subarray(i+o,i+r);o+=g(e,t).written}return p=o,i}let y=null;function b(){return null!==y&&0!==y.byteLength||(y=new Int32Array(r.memory.buffer)),y}function w(e){const t=typeof e;if("number"==t||"boolean"==t||null==e)return`${e}`;if("string"==t)return`"${e}"`;if("symbol"==t){const t=e.description;return null==t?"Symbol":`Symbol(${t})`}if("function"==t){const t=e.name;return"string"==typeof t&&t.length>0?`Function(${t})`:"Function"}if(Array.isArray(e)){const t=e.length;let n="[";t>0&&(n+=w(e[0]));for(let r=1;r<t;r++)n+=", "+w(e[r]);return n+="]",n}const n=/\[object ([^\]]+)\]/.exec(toString.call(e));let r;if(!(n.length>1))return toString.call(e);if(r=n[1],"Object"==r)try{return"Object("+JSON.stringify(e)+")"}catch(e){return"Object"}return e instanceof Error?`${e.name}: ${e.message}\n${e.stack}`:r}function v(e,t,n){r.wasm_bindgen__convert__closures__invoke1_mut(e,t,l(n))}function _(e,t){r._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__destroy(e,t)}let S=null;function k(e,t){const n=t(4*e.length,4)>>>0,i=(null!==S&&0!==S.byteLength||(S=new Uint32Array(r.memory.buffer)),S);for(let t=0;t<e.length;t++)i[n/4+t]=l(e[t]);return p=e.length,n}function E(e,t){try{return e.apply(this,t)}catch(e){r.__wbindgen_exn_store(l(e))}}class T{static __wrap(e){e>>>=0;const t=Object.create(T.prototype);return t.__wbg_ptr=e,t}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,e}free(){const e=this.__destroy_into_raw();r.__wbg_ppom_free(e)}static new(e,t){const n=k(t,r.__wbindgen_malloc),i=p;return h(r.ppom_new(l(e),n,i))}validateJsonRpc(e){return h(r.ppom_validateJsonRpc(this.__wbg_ptr,l(e)))}static version(){return h(r.ppom_version())}}function A(){const e={wbg:{}};return e.wbg.__wbg_buffer_085ec1f694018c4f=function(e){return l(d(e).buffer)},e.wbg.__wbg_call_01734de55d61e11d=function(){return E((function(e,t,n){return l(d(e).call(d(t),d(n)))}),arguments)},e.wbg.__wbg_call_4c92f6aec1e1d6e6=function(){return E((function(e,t,n,r){return l(d(e).call(d(t),d(n),d(r)))}),arguments)},e.wbg.__wbg_from_d7c216d4616bb368=function(e){return l(Array.from(d(e)))},e.wbg.__wbg_get_44be0491f933a435=function(e,t){return l(d(e)[t>>>0])},e.wbg.__wbg_length_72e2208bbc0efc61=function(e){return d(e).length},e.wbg.__wbg_length_d813e535247d427e=function(e){return d(e).length},e.wbg.__wbg_length_fff51ee6522a1a18=function(e){return d(e).length},e.wbg.__wbg_new_43f1b47c28813cbd=function(e,t){try{var n={a:e,b:t};const i=new Promise(((e,t)=>{const i=n.a;n.a=0;try{return function(e,t,n,i){r.wasm_bindgen__convert__closures__invoke2_mut(e,t,l(n),l(i))}(i,n.b,e,t)}finally{n.a=i}}));return l(i)}finally{n.a=n.b=0}},e.wbg.__wbg_new_8125e318e6245eed=function(e){return l(new Uint8Array(d(e)))},e.wbg.__wbg_parse_670c19d4e984792e=function(){return E((function(e,t){return l(JSON.parse(o(e,t)))}),arguments)},e.wbg.__wbg_ppom_new=function(e){return l(T.__wrap(e))},e.wbg.__wbg_resolve_53698b95aaf7fcf8=function(e){return l(Promise.resolve(d(e)))},e.wbg.__wbg_set_5cf90238115182c3=function(e,t,n){d(e).set(d(t),n>>>0)},e.wbg.__wbg_stringify_e25465938f3f611f=function(){return E((function(e){return l(JSON.stringify(d(e)))}),arguments)},e.wbg.__wbg_then_b2267541e2a73865=function(e,t,n){return l(d(e).then(d(t),d(n)))},e.wbg.__wbg_then_f7e06ee3c11698eb=function(e,t){return l(d(e).then(d(t)))},e.wbg.__wbindgen_cb_drop=function(e){const t=h(e).original;if(1==t.cnt--)return t.a=0,!0;return!1},e.wbg.__wbindgen_closure_wrapper_wasm_bindgen__closure__Closure_T___wrap__breaks_if_inlined=function(e,t,n){const r=function(e,t,n,r){const i={a:e,b:t,cnt:1},s=(...e)=>{i.cnt++;const t=i.a;i.a=0;try{return r(t,i.b,...e)}finally{0==--i.cnt?n(t,i.b):i.a=t}};return s.original=i,s}(e,t,_,v);return l(r)},e.wbg.__wbindgen_debug_string=function(e,t){const n=m(w(d(t)),r.__wbindgen_malloc,r.__wbindgen_realloc),i=p;b()[e/4+1]=i,b()[e/4+0]=n},e.wbg.__wbindgen_error_new=function(e,t){return l(new Error(o(e,t)))},e.wbg.__wbindgen_is_undefined=function(e){return d(e)===undefined},e.wbg.__wbindgen_memory=function(){return l(r.memory)},e.wbg.__wbindgen_object_drop_ref=function(e){h(e)},e.wbg.__wbindgen_string_get=function(e,t){const n=d(t),i="string"==typeof n?n:undefined;var s,a=(s=i)===undefined||null===s?0:m(i,r.__wbindgen_malloc,r.__wbindgen_realloc),o=p;b()[e/4+1]=o,b()[e/4+0]=a},e.wbg.__wbindgen_string_new=function(e,t){return l(o(e,t))},e.wbg.__wbindgen_throw=function(e,t){throw new Error(o(e,t))},e}function M(e,t){return r=e.exports,C.__wbindgen_wasm_module=t,y=null,S=null,s=null,r.__wbindgen_start(),r}async function C(e){if(r!==undefined)return r;const t=A();("string"==typeof e||"function"==typeof Request&&e instanceof Request||"function"==typeof URL&&e instanceof URL)&&(e=fetch(e));const{instance:n,module:i}=await async function(e,t){if("function"==typeof Response&&e instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if("application/wasm"==e.headers.get("Content-Type"))throw t;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t)}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}(await e,t);return M(n,i)}n.PPOM=T;n.default=C}}},{package:"$root$",file:"app/scripts/lib/ppom/ppom.js"}],[91,{"./handlers":97,"@metamask/permission-controller":1579,"@metamask/snaps-rpc-methods":2041,"@metamask/utils":2255,"eth-rpc-errors":3205},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.createMethodMiddleware=n.createLegacyMethodMiddleware=void 0;var r=e("@metamask/permission-controller"),i=e("@metamask/snaps-rpc-methods"),s=e("@metamask/utils"),a=e("eth-rpc-errors"),o=e("./handlers");const c=[...o.handlers,...r.permissionRpcMethods.handlers];n.createMethodMiddleware=u(c),n.createLegacyMethodMiddleware=u(o.legacyHandlers);function u(e){const t=e.reduce(((e,t)=>{for(const n of t.methodNames)e[n]=t;return e}),{}),n=new Set(e.flatMap((({hookNames:e})=>Object.getOwnPropertyNames(e))));return e=>{!function(e,t){const n=[];if(t.forEach((t=>{(0,s.hasProperty)(e,t)||n.push(t)})),n.length>0)throw new Error(`Missing expected hooks:\n\n${n.join("\n")}\n`);const r=Object.getOwnPropertyNames(e).filter((e=>!t.has(e)));if(r.length>0)throw new Error(`Received unexpected hooks:\n\n${r.join("\n")}\n`)}(e,n);return async(n,r,s,o)=>{const c=t[n.method];if(c){const{implementation:t,hookNames:u}=c;try{return await t(n,r,s,o,(0,i.selectHooks)(e,u))}catch(e){return o(e instanceof Error?e:a.ethErrors.rpc.internal({data:e}))}}return s()}}}}}},{package:"$root$",file:"app/scripts/lib/rpc-method-middleware/createMethodMiddleware.js"}],[92,{"../../../../shared/constants/network":4436,"eth-rpc-errors":3205},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.createUnsupportedMethodMiddleware=function(){return async function(e,t,n,s){return i.UNSUPPORTED_RPC_METHODS.has(e.method)?s(r.ethErrors.rpc.methodNotSupported()):n()}};var r=e("eth-rpc-errors"),i=e("../../../../shared/constants/network")}}},{package:"$root$",file:"app/scripts/lib/rpc-method-middleware/createUnsupportedMethodMiddleware.ts"}],[93,{"../../../../../shared/constants/app":4423,"./ethereum-chain-utils":95,"@metamask/controller-utils":1166,"eth-rpc-errors":3205},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("eth-rpc-errors"),i=e("@metamask/controller-utils"),s=e("../../../../../shared/constants/app"),a=e("./ethereum-chain-utils");const o={methodNames:[s.MESSAGE_TYPE.ADD_ETHEREUM_CHAIN],implementation:async function(e,t,n,s,{upsertNetworkConfiguration:o,getCurrentRpcUrl:c,findNetworkConfigurationBy:u,setActiveNetwork:l,requestUserApproval:d,startApprovalFlow:h,endApprovalFlow:p,getCurrentChainIdForDomain:f,getCaveat:g,requestPermittedChainsPermission:m,getChainPermissionsFeatureFlag:y}){let b;try{b=(0,a.validateAddEthereumChainParams)(e.params[0],s)}catch(e){return s(e)}const{chainId:w,chainName:v,firstValidBlockExplorerUrl:_,firstValidRPCUrl:S,ticker:k}=b,{origin:E}=e,T=f(E),A=(0,a.findExistingNetwork)(T,u),M=(0,a.findExistingNetwork)(w,u);if(M&&M.chainId===w&&M.ticker!==k)return s(r.ethErrors.rpc.invalidParams({message:`nativeCurrency.symbol does not match currency symbol for a network the user already has added with the same chainId. Received:\n${k}`}));let C,P,O;if(M&&M.rpcUrl===S){C=M.id??M.type;const e=c();if(T===w&&e===S)return s();P={toNetworkConfiguration:M,fromNetworkConfiguration:A}}else{({id:O}=await h());try{await d({origin:E,type:i.ApprovalType.AddEthereumChain,requestData:{chainId:w,rpcPrefs:{blockExplorerUrl:_},chainName:v,rpcUrl:S,ticker:k}}),C=await o({chainId:w,rpcPrefs:{blockExplorerUrl:_},nickname:v,rpcUrl:S,ticker:k},{source:"dapp",referrer:E})}catch(e){return p({id:O}),s(e)}P={toNetworkConfiguration:{rpcUrl:S,chainId:w,nickname:v,ticker:k,networkClientId:C},fromNetworkConfiguration:A}}return(0,a.switchChain)(t,s,E,w,P,C,O,{getChainPermissionsFeatureFlag:y,setActiveNetwork:l,requestUserApproval:d,getCaveat:g,requestPermittedChainsPermission:m,endApprovalFlow:p})},hookNames:{upsertNetworkConfiguration:!0,getCurrentRpcUrl:!0,findNetworkConfigurationBy:!0,setActiveNetwork:!0,requestUserApproval:!0,startApprovalFlow:!0,endApprovalFlow:!0,getCurrentChainIdForDomain:!0,getCaveat:!0,requestPermittedChainsPermission:!0,getChainPermissionsFeatureFlag:!0}};n.default=o}}},{package:"$root$",file:"app/scripts/lib/rpc-method-middleware/handlers/add-ethereum-chain.js"}],[94,{"../../../../../shared/constants/app":4423},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;const r={methodNames:[e("../../../../../shared/constants/app").MESSAGE_TYPE.ETH_ACCOUNTS],implementation:async function(e,t,n,r,{getAccounts:i}){return t.result=await i(),r()},hookNames:{getAccounts:!0}};n.default=r}}},{package:"$root$",file:"app/scripts/lib/rpc-method-middleware/handlers/eth-accounts.js"}],[95,{"../../../../../shared/constants/app":4423,"../../../../../shared/constants/network":4436,"../../../../../shared/constants/permissions":4440,"../../../../../shared/modules/network.utils":4476,"../../../controllers/permissions":30,"../../util":119,"@metamask/controller-utils":1166,"eth-rpc-errors":3205},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.findExistingNetwork=function(e,t){if(Object.values(s.BUILT_IN_INFURA_NETWORKS).map((({chainId:e})=>e)).includes(e))return{chainId:e,ticker:s.CURRENCY_SYMBOLS.ETH,nickname:s.NETWORK_TO_NAME_MAP[e],rpcUrl:s.CHAIN_ID_TO_RPC_URL_MAP[e],type:s.CHAIN_ID_TO_TYPE_MAP[e]};return t({chainId:e})},n.switchChain=async function(e,t,n,s,a,c,l,{getChainPermissionsFeatureFlag:d,setActiveNetwork:h,endApprovalFlow:p,requestUserApproval:f,getCaveat:g,requestPermittedChainsPermission:m}){try{if(d()){const{value:e}=g({target:u.PermissionNames.permittedChains,caveatType:o.CaveatTypes.restrictNetworkSwitching})??{};e!==undefined&&e.includes(s)||await m([...e??[],s])}else await f({origin:n,type:i.ApprovalType.SwitchEthereumChain,requestData:a});await h(c),e.result=null}catch(n){return n.code===r.errorCodes.provider.userRejectedRequest&&l?(e.result=null,t()):t(n)}finally{l&&p({id:l})}return t()},n.validateAddEthereumChainParams=function(e,t){if(!e||"object"!=typeof e)throw r.ethErrors.rpc.invalidParams({message:`Expected single, object parameter. Received:\n${JSON.stringify(e)}`});const{chainId:n,chainName:i,blockExplorerUrls:s,nativeCurrency:a,rpcUrls:o,...u}=e,h=Object.keys(u).filter((e=>!["iconUrls"].includes(e)));if(h.length>0)throw r.ethErrors.rpc.invalidParams({message:`Received unexpected keys on object parameter. Unsupported keys:\n${h}`});const p=d(n);if(!o||!Array.isArray(o)||0===o.length)throw r.ethErrors.rpc.invalidParams({message:`Expected an array with at least one valid string HTTPS url 'rpcUrls', Received:\n${o}`});const f=e=>{const t=(0,l.getValidUrl)(e);return null!==t&&("localhost"===t.hostname||"127.0.0.1"===t.hostname||"https:"===t.protocol)},g=o.find((e=>f(e))),m=null!==s&&Array.isArray(s)?s.find((e=>f(e))):null;if(!g)throw r.ethErrors.rpc.invalidParams({message:`Expected an array with at least one valid string HTTPS url 'rpcUrls', Received:\n${o}`});if(null!==s&&!m)throw r.ethErrors.rpc.invalidParams({message:`Expected null or array with at least one valid string HTTPS URL 'blockExplorerUrl'. Received: ${s}`});if("string"!=typeof i||!i)throw r.ethErrors.rpc.invalidParams({message:`Expected non-empty string 'chainName'. Received:\n${i}`});const y=i.length>100?i.substring(0,100):i;if(null!==a){if("object"!=typeof a||Array.isArray(a))throw r.ethErrors.rpc.invalidParams({message:`Expected null or object 'nativeCurrency'. Received:\n${a}`});if(18!==a.decimals)throw r.ethErrors.rpc.invalidParams({message:`Expected the number 18 for 'nativeCurrency.decimals' when 'nativeCurrency' is provided. Received: ${a.decimals}`});if(!a.symbol||"string"!=typeof a.symbol)throw r.ethErrors.rpc.invalidParams({message:`Expected a string 'nativeCurrency.symbol'. Received: ${a.symbol}`})}const b=(null==a?void 0:a.symbol)||c.UNKNOWN_TICKER_SYMBOL;if(b!==c.UNKNOWN_TICKER_SYMBOL&&("string"!=typeof b||b.length<1||b.length>6))throw r.ethErrors.rpc.invalidParams({message:`Expected 1-6 character string 'nativeCurrency.symbol'. Received:\n${b}`});return{chainId:p,chainName:y,firstValidBlockExplorerUrl:m,firstValidRPCUrl:g,ticker:b}},n.validateChainId=d,n.validateSwitchEthereumChainParams=function(e,t){var n;if(null===(n=e.params)||void 0===n||!n[0]||"object"!=typeof e.params[0])throw r.ethErrors.rpc.invalidParams({message:`Expected single, object parameter. Received:\n${JSON.stringify(e.params)}`});const{chainId:i,...s}=e.params[0];if(Object.keys(s).length>0)throw r.ethErrors.rpc.invalidParams({message:`Received unexpected keys on object parameter. Unsupported keys:\n${Object.keys(s)}`});return d(i)};var r=e("eth-rpc-errors"),i=e("@metamask/controller-utils"),s=e("../../../../../shared/constants/network"),a=e("../../../../../shared/modules/network.utils"),o=e("../../../../../shared/constants/permissions"),c=e("../../../../../shared/constants/app"),u=e("../../../controllers/permissions"),l=e("../../util");function d(e){const t="string"==typeof e&&e.toLowerCase();if(!(0,a.isPrefixedFormattedHexString)(t))throw r.ethErrors.rpc.invalidParams({message:`Expected 0x-prefixed, unpadded, non-zero hexadecimal string 'chainId'. Received:\n${e}`});if(!(0,a.isSafeChainId)(parseInt(t,16)))throw r.ethErrors.rpc.invalidParams({message:`Invalid chain ID "${t}": numerical value greater than max safe value. Received:\n${e}`});return t}}}},{package:"$root$",file:"app/scripts/lib/rpc-method-middleware/handlers/ethereum-chain-utils.js"}],[96,{"../../../../../shared/constants/app":4423},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;const r={methodNames:[e("../../../../../shared/constants/app").MESSAGE_TYPE.GET_PROVIDER_STATE],implementation:async function(e,t,n,r,{getProviderState:i}){return t.result={...await i(e.origin)},r()},hookNames:{getProviderState:!0}};n.default=r}}},{package:"$root$",file:"app/scripts/lib/rpc-method-middleware/handlers/get-provider-state.js"}],[97,{"./add-ethereum-chain":93,"./eth-accounts":94,"./get-provider-state":96,"./log-web3-shim-usage":98,"./request-accounts":99,"./send-metadata":100,"./switch-ethereum-chain":101,"./watch-asset":102},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.legacyHandlers=n.handlers=void 0;var r=d(e("./add-ethereum-chain")),i=d(e("./eth-accounts")),s=d(e("./get-provider-state")),a=d(e("./log-web3-shim-usage")),o=d(e("./request-accounts")),c=d(e("./send-metadata")),u=d(e("./switch-ethereum-chain")),l=d(e("./watch-asset"));function d(e){return e&&e.__esModule?e:{default:e}}n.handlers=[r.default,s.default,a.default,o.default,c.default,u.default,l.default],n.legacyHandlers=[i.default]}}},{package:"$root$",file:"app/scripts/lib/rpc-method-middleware/handlers/index.ts"}],[98,{"../../../../../shared/constants/app":4423},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;const r={methodNames:[e("../../../../../shared/constants/app").MESSAGE_TYPE.LOG_WEB3_SHIM_USAGE],implementation:function(e,t,n,r,{getWeb3ShimUsageState:i,setWeb3ShimUsageRecorded:s}){const{origin:a}=e;i(a)===undefined&&s(a);return t.result=!0,r()},hookNames:{getWeb3ShimUsageState:!0,setWeb3ShimUsageRecorded:!0}};n.default=r}}},{package:"$root$",file:"app/scripts/lib/rpc-method-middleware/handlers/log-web3-shim-usage.js"}],[99,{"../../../../../shared/constants/app":4423,"../../../../../shared/constants/metametrics":4434,"../../util":119,"eth-rpc-errors":3205},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("eth-rpc-errors"),i=e("../../../../../shared/constants/app"),s=e("../../../../../shared/constants/metametrics"),a=e("../../util");const o={methodNames:[i.MESSAGE_TYPE.ETH_REQUEST_ACCOUNTS],implementation:async function(e,t,n,o,{origin:u,getAccounts:l,getUnlockPromise:d,hasPermission:h,requestAccountsPermission:p,sendMetrics:f,getPermissionsForOrigin:g,metamaskState:m}){if(c.has(u))return t.error=r.ethErrors.rpc.resourceUnavailable(`Already processing ${i.MESSAGE_TYPE.ETH_REQUEST_ACCOUNTS}. Please wait.`),o();if(h(i.MESSAGE_TYPE.ETH_ACCOUNTS)){try{c.add(u),await d(!0),t.result=await l(),o()}catch(e){o(e)}finally{c.delete(u)}return undefined}try{await p()}catch(e){return t.error=e,o()}const y=await l();if(y.length>0){t.result=y;const e=g(u).eth_accounts.caveats[0].value.length,n=!Object.keys(m.permissionHistory).includes(u);(0,a.shouldEmitDappViewedEvent)(m.metaMetricsId)&&f({event:s.MetaMetricsEventName.DappViewed,category:s.MetaMetricsEventCategory.InpageProvider,referrer:{url:u},properties:{is_first_visit:n,number_of_accounts:Object.keys(m.accounts).length,number_of_accounts_connected:e}})}else t.error=r.ethErrors.rpc.internal("Accounts unexpectedly unavailable. Please report this bug.");return o()},hookNames:{origin:!0,getAccounts:!0,getUnlockPromise:!0,hasPermission:!0,requestAccountsPermission:!0,sendMetrics:!0,getPermissionsForOrigin:!0,metamaskState:!0}};n.default=o;const c=new Set}}},{package:"$root$",file:"app/scripts/lib/rpc-method-middleware/handlers/request-accounts.js"}]],[],{});
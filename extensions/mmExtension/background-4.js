LavaPack.loadBundle([
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_getSymbolsIn.js", {"./_arrayPush":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_arrayPush.js","./_getPrototype":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_getPrototype.js","./_getSymbols":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_getSymbols.js","./stubArray":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\stubArray.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\_getSymbolsIn.js
      return function (require, module, exports) {
var arrayPush = require('./_arrayPush'),
    getPrototype = require('./_getPrototype'),
    getSymbols = require('./_getSymbols'),
    stubArray = require('./stubArray');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_initCloneArray.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\_initCloneArray.js
      return function (require, module, exports) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_initCloneByTag.js", {"./_cloneArrayBuffer":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_cloneArrayBuffer.js","./_cloneDataView":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_cloneDataView.js","./_cloneRegExp":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_cloneRegExp.js","./_cloneSymbol":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_cloneSymbol.js","./_cloneTypedArray":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_cloneTypedArray.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\_initCloneByTag.js
      return function (require, module, exports) {
var cloneArrayBuffer = require('./_cloneArrayBuffer'),
    cloneDataView = require('./_cloneDataView'),
    cloneRegExp = require('./_cloneRegExp'),
    cloneSymbol = require('./_cloneSymbol'),
    cloneTypedArray = require('./_cloneTypedArray');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_initCloneObject.js", {"./_baseCreate":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseCreate.js","./_getPrototype":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_getPrototype.js","./_isPrototype":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_isPrototype.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\_initCloneObject.js
      return function (require, module, exports) {
var baseCreate = require('./_baseCreate'),
    getPrototype = require('./_getPrototype'),
    isPrototype = require('./_isPrototype');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_nativeKeysIn.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\_nativeKeysIn.js
      return function (require, module, exports) {
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_trimmedEndIndex.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\_trimmedEndIndex.js
      return function (require, module, exports) {
/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\cloneDeep.js", {"./_baseClone":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseClone.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\cloneDeep.js
      return function (require, module, exports) {
var baseClone = require('./_baseClone');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\inRange.js", {"./_baseInRange":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseInRange.js","./toFinite":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\toFinite.js","./toNumber":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\toNumber.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\inRange.js
      return function (require, module, exports) {
var baseInRange = require('./_baseInRange'),
    toFinite = require('./toFinite'),
    toNumber = require('./toNumber');

/**
 * Checks if `n` is between `start` and up to, but not including, `end`. If
 * `end` is not specified, it's set to `start` with `start` then set to `0`.
 * If `start` is greater than `end` the params are swapped to support
 * negative ranges.
 *
 * @static
 * @memberOf _
 * @since 3.3.0
 * @category Number
 * @param {number} number The number to check.
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 * @see _.range, _.rangeRight
 * @example
 *
 * _.inRange(3, 2, 4);
 * // => true
 *
 * _.inRange(4, 8);
 * // => true
 *
 * _.inRange(4, 2);
 * // => false
 *
 * _.inRange(2, 2);
 * // => false
 *
 * _.inRange(1.2, 2);
 * // => true
 *
 * _.inRange(5.2, 4);
 * // => false
 *
 * _.inRange(-3, -2, -6);
 * // => true
 */
function inRange(number, start, end) {
  start = toFinite(start);
  if (end === undefined) {
    end = start;
    start = 0;
  } else {
    end = toFinite(end);
  }
  number = toNumber(number);
  return baseInRange(number, start, end);
}

module.exports = inRange;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isEmpty.js", {"./_baseKeys":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseKeys.js","./_getTag":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_getTag.js","./_isPrototype":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_isPrototype.js","./isArguments":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isArguments.js","./isArray":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isArray.js","./isArrayLike":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isArrayLike.js","./isBuffer":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isBuffer.js","./isTypedArray":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isTypedArray.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\isEmpty.js
      return function (require, module, exports) {
var baseKeys = require('./_baseKeys'),
    getTag = require('./_getTag'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLike = require('./isArrayLike'),
    isBuffer = require('./isBuffer'),
    isPrototype = require('./_isPrototype'),
    isTypedArray = require('./isTypedArray');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isInteger.js", {"./toInteger":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\toInteger.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\isInteger.js
      return function (require, module, exports) {
var toInteger = require('./toInteger');

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

module.exports = isInteger;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isMap.js", {"./_baseIsMap":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseIsMap.js","./_baseUnary":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseUnary.js","./_nodeUtil":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_nodeUtil.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\isMap.js
      return function (require, module, exports) {
var baseIsMap = require('./_baseIsMap'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isSet.js", {"./_baseIsSet":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseIsSet.js","./_baseUnary":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseUnary.js","./_nodeUtil":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_nodeUtil.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\isSet.js
      return function (require, module, exports) {
var baseIsSet = require('./_baseIsSet'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\keysIn.js", {"./_arrayLikeKeys":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_arrayLikeKeys.js","./_baseKeysIn":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseKeysIn.js","./isArrayLike":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isArrayLike.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\keysIn.js
      return function (require, module, exports) {
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeysIn = require('./_baseKeysIn'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\toFinite.js", {"./toNumber":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\toNumber.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\toFinite.js
      return function (require, module, exports) {
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\toInteger.js", {"./toFinite":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\toFinite.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\toInteger.js
      return function (require, module, exports) {
var toFinite = require('./toFinite');

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\toNumber.js", {"./_baseTrim":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\_baseTrim.js","./isObject":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isObject.js","./isSymbol":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\lodash\\isSymbol.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\lodash\toNumber.js
      return function (require, module, exports) {
var baseTrim = require('./_baseTrim'),
    isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

      };
    };
  }
}, {package:"lodash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\base.js", {"./util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\util.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multibase\src\base.js
      return function (require, module, exports) {
'use strict'

const { encodeText } = require('./util')

/** @typedef {__import__('./types').CodecFactory} CodecFactory */
/** @typedef {__import__("./types").BaseName} BaseName */
/** @typedef {__import__("./types").BaseCode} BaseCode */

/**
 * Class to encode/decode in the supported Bases
 *
 */
class Base {
  /**
   * @param {BaseName} name
   * @param {BaseCode} code
   * @param {CodecFactory} factory
   * @param {string} alphabet
   */
  constructor (name, code, factory, alphabet) {
    this.name = name
    this.code = code
    this.codeBuf = encodeText(this.code)
    this.alphabet = alphabet
    this.codec = factory(alphabet)
  }

  /**
   * @param {Uint8Array} buf
   * @returns {string}
   */
  encode (buf) {
    return this.codec.encode(buf)
  }

  /**
   * @param {string} string
   * @returns {Uint8Array}
   */
  decode (string) {
    for (const char of string) {
      if (this.alphabet && this.alphabet.indexOf(char) < 0) {
        throw new Error(`invalid character '${char}' in '${string}'`)
      }
    }
    return this.codec.decode(string)
  }
}

module.exports = Base

      };
    };
  }
}, {package:"@ensdomains/content-hash>cids>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\constants.js", {"./base.js":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\base.js","./rfc4648":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\rfc4648.js","./util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\util.js","@multiformats/base-x":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@multiformats\\base-x\\src\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multibase\src\constants.js
      return function (require, module, exports) {
'use strict'

const baseX = require('@multiformats/base-x')
const Base = require('./base.js')
const { rfc4648 } = require('./rfc4648')
const { decodeText, encodeText } = require('./util')

/** @typedef {__import__('./types').CodecFactory} CodecFactory */
/** @typedef {__import__('./types').Codec} Codec */
/** @typedef {__import__('./types').BaseName} BaseName */
/** @typedef {__import__('./types').BaseCode} BaseCode */

/** @type {CodecFactory} */
const identity = () => {
  return {
    encode: decodeText,
    decode: encodeText
  }
}

/**
 *
 * name, code, implementation, alphabet
 *
 * @type {Array<[BaseName, BaseCode, CodecFactory, string]>}
 */
const constants = [
  ['identity', '\x00', identity, ''],
  ['base2', '0', rfc4648(1), '01'],
  ['base8', '7', rfc4648(3), '01234567'],
  ['base10', '9', baseX, '0123456789'],
  ['base16', 'f', rfc4648(4), '0123456789abcdef'],
  ['base16upper', 'F', rfc4648(4), '0123456789ABCDEF'],
  ['base32hex', 'v', rfc4648(5), '0123456789abcdefghijklmnopqrstuv'],
  ['base32hexupper', 'V', rfc4648(5), '0123456789ABCDEFGHIJKLMNOPQRSTUV'],
  ['base32hexpad', 't', rfc4648(5), '0123456789abcdefghijklmnopqrstuv='],
  ['base32hexpadupper', 'T', rfc4648(5), '0123456789ABCDEFGHIJKLMNOPQRSTUV='],
  ['base32', 'b', rfc4648(5), 'abcdefghijklmnopqrstuvwxyz234567'],
  ['base32upper', 'B', rfc4648(5), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'],
  ['base32pad', 'c', rfc4648(5), 'abcdefghijklmnopqrstuvwxyz234567='],
  ['base32padupper', 'C', rfc4648(5), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567='],
  ['base32z', 'h', rfc4648(5), 'ybndrfg8ejkmcpqxot1uwisza345h769'],
  ['base36', 'k', baseX, '0123456789abcdefghijklmnopqrstuvwxyz'],
  ['base36upper', 'K', baseX, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
  ['base58btc', 'z', baseX, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'],
  ['base58flickr', 'Z', baseX, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'],
  ['base64', 'm', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'],
  ['base64pad', 'M', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='],
  ['base64url', 'u', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'],
  ['base64urlpad', 'U', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=']
]

/** @type {Record<BaseName,Base>} */
const names = constants.reduce((prev, tupple) => {
  prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3])
  return prev
}, /** @type {Record<BaseName,Base>} */({}))

/** @type {Record<BaseCode,Base>} */
const codes = constants.reduce((prev, tupple) => {
  prev[tupple[1]] = names[tupple[0]]
  return prev
}, /** @type {Record<BaseCode,Base>} */({}))

module.exports = {
  names,
  codes
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>cids>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\index.js", {"./constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\constants.js","./util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\util.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multibase\src\index.js
      return function (require, module, exports) {
/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 *
 */
'use strict'

const constants = require('./constants')
const { encodeText, decodeText, concat } = require('./util')

/** @typedef {__import__('./base')} Base */
/** @typedef {__import__("./types").BaseNameOrCode} BaseNameOrCode */
/** @typedef {__import__("./types").BaseCode} BaseCode */
/** @typedef {__import__("./types").BaseName} BaseName */

/**
 * Create a new Uint8Array with the multibase varint+code.
 *
 * @param {BaseNameOrCode} nameOrCode - The multibase name or code number.
 * @param {Uint8Array} buf - The data to be prefixed with multibase.
 * @returns {Uint8Array}
 * @throws {Error} Will throw if the encoding is not supported
 */
function multibase (nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded Uint8Array')
  }
  const { name, codeBuf } = encoding(nameOrCode)
  validEncode(name, buf)

  return concat([codeBuf, buf], codeBuf.length + buf.length)
}

/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {BaseNameOrCode} nameOrCode - The multibase name or code number.
 * @param {Uint8Array} buf - The data to be encoded.
 * @returns {Uint8Array}
 * @throws {Error} Will throw if the encoding is not supported
 *
 */
function encode (nameOrCode, buf) {
  const enc = encoding(nameOrCode)
  const data = encodeText(enc.encode(buf))

  return concat([enc.codeBuf, data], enc.codeBuf.length + data.length)
}

/**
 * Takes a Uint8Array or string encoded with multibase header, decodes it and
 * returns the decoded buffer
 *
 * @param {Uint8Array|string} data
 * @returns {Uint8Array}
 * @throws {Error} Will throw if the encoding is not supported
 *
 */
function decode (data) {
  if (data instanceof Uint8Array) {
    data = decodeText(data)
  }
  const prefix = data[0]

  // Make all encodings case-insensitive except the ones that include upper and lower chars in the alphabet
  if (['f', 'F', 'v', 'V', 't', 'T', 'b', 'B', 'c', 'C', 'h', 'k', 'K'].includes(prefix)) {
    data = data.toLowerCase()
  }
  const enc = encoding(/** @type {BaseCode} */(data[0]))
  return enc.decode(data.substring(1))
}

/**
 * Is the given data multibase encoded?
 *
 * @param {Uint8Array|string} data
 */
function isEncoded (data) {
  if (data instanceof Uint8Array) {
    data = decodeText(data)
  }

  // Ensure bufOrString is a string
  if (Object.prototype.toString.call(data) !== '[object String]') {
    return false
  }

  try {
    const enc = encoding(/** @type {BaseCode} */(data[0]))
    return enc.name
  } catch (err) {
    return false
  }
}

/**
 * Validate encoded data
 *
 * @param {BaseNameOrCode} name
 * @param {Uint8Array} buf
 * @returns {void}
 * @throws {Error} Will throw if the encoding is not supported
 */
function validEncode (name, buf) {
  const enc = encoding(name)
  enc.decode(decodeText(buf))
}

/**
 * Get the encoding by name or code
 *
 * @param {BaseNameOrCode} nameOrCode
 * @returns {Base}
 * @throws {Error} Will throw if the encoding is not supported
 */
function encoding (nameOrCode) {
  if (Object.prototype.hasOwnProperty.call(constants.names, /** @type {BaseName} */(nameOrCode))) {
    return constants.names[/** @type {BaseName} */(nameOrCode)]
  } else if (Object.prototype.hasOwnProperty.call(constants.codes, /** @type {BaseCode} */(nameOrCode))) {
    return constants.codes[/** @type {BaseCode} */(nameOrCode)]
  } else {
    throw new Error(`Unsupported encoding: ${nameOrCode}`)
  }
}

/**
 * Get encoding from data
 *
 * @param {string|Uint8Array} data
 * @returns {Base}
 * @throws {Error} Will throw if the encoding is not supported
 */
function encodingFromData (data) {
  if (data instanceof Uint8Array) {
    data = decodeText(data)
  }

  return encoding(/** @type {BaseCode} */(data[0]))
}

exports = module.exports = multibase
exports.encode = encode
exports.decode = decode
exports.isEncoded = isEncoded
exports.encoding = encoding
exports.encodingFromData = encodingFromData
const names = Object.freeze(constants.names)
const codes = Object.freeze(constants.codes)
exports.names = names
exports.codes = codes

      };
    };
  }
}, {package:"@ensdomains/content-hash>cids>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\rfc4648.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multibase\src\rfc4648.js
      return function (require, module, exports) {
'use strict'

/** @typedef {__import__('./types').CodecFactory} CodecFactory */

/**
 * @param {string} string
 * @param {string} alphabet
 * @param {number} bitsPerChar
 * @returns {Uint8Array}
 */
const decode = (string, alphabet, bitsPerChar) => {
  // Build the character lookup table:
  /** @type {Record<string, number>} */
  const codes = {}
  for (let i = 0; i < alphabet.length; ++i) {
    codes[alphabet[i]] = i
  }

  // Count the padding bytes:
  let end = string.length
  while (string[end - 1] === '=') {
    --end
  }

  // Allocate the output:
  const out = new Uint8Array((end * bitsPerChar / 8) | 0)

  // Parse the data:
  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  let written = 0 // Next byte to write
  for (let i = 0; i < end; ++i) {
    // Read one character from the string:
    const value = codes[string[i]]
    if (value === undefined) {
      throw new SyntaxError('Invalid character ' + string[i])
    }

    // Append the bits to the buffer:
    buffer = (buffer << bitsPerChar) | value
    bits += bitsPerChar

    // Write out some bits if the buffer has a byte's worth:
    if (bits >= 8) {
      bits -= 8
      out[written++] = 0xff & (buffer >> bits)
    }
  }

  // Verify that we have received just enough bits:
  if (bits >= bitsPerChar || 0xff & (buffer << (8 - bits))) {
    throw new SyntaxError('Unexpected end of data')
  }

  return out
}

/**
 * @param {Uint8Array} data
 * @param {string} alphabet
 * @param {number} bitsPerChar
 * @returns {string}
 */
const encode = (data, alphabet, bitsPerChar) => {
  const pad = alphabet[alphabet.length - 1] === '='
  const mask = (1 << bitsPerChar) - 1
  let out = ''

  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  for (let i = 0; i < data.length; ++i) {
    // Slurp data into the buffer:
    buffer = (buffer << 8) | data[i]
    bits += 8

    // Write out as much as we can:
    while (bits > bitsPerChar) {
      bits -= bitsPerChar
      out += alphabet[mask & (buffer >> bits)]
    }
  }

  // Partial character:
  if (bits) {
    out += alphabet[mask & (buffer << (bitsPerChar - bits))]
  }

  // Add padding characters until we hit a byte boundary:
  if (pad) {
    while ((out.length * bitsPerChar) & 7) {
      out += '='
    }
  }

  return out
}

/**
 * RFC4648 Factory
 *
 * @param {number} bitsPerChar
 * @returns {CodecFactory}
 */
const rfc4648 = (bitsPerChar) => (alphabet) => {
  return {
    /**
     * @param {Uint8Array} input
     * @returns {string}
     */
    encode (input) {
      return encode(input, alphabet, bitsPerChar)
    },
    /**
     * @param {string} input
     * @returns {Uint8Array}
     */
    decode (input) {
      return decode(input, alphabet, bitsPerChar)
    }
  }
}

module.exports = { rfc4648 }

      };
    };
  }
}, {package:"@ensdomains/content-hash>cids>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\util.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multibase\src\util.js
      return function (require, module, exports) {
'use strict'

const textDecoder = new TextDecoder()
/**
 * @param {ArrayBufferView|ArrayBuffer} bytes
 * @returns {string}
 */
const decodeText = (bytes) => textDecoder.decode(bytes)

const textEncoder = new TextEncoder()
/**
 * @param {string} text
 * @returns {Uint8Array}
 */
const encodeText = (text) => textEncoder.encode(text)

/**
 * Returns a new Uint8Array created by concatenating the passed Arrays
 *
 * @param {Array<ArrayLike<number>>} arrs
 * @param {number} length
 * @returns {Uint8Array}
 */
function concat (arrs, length) {
  const output = new Uint8Array(length)
  let offset = 0

  for (const arr of arrs) {
    output.set(arr, offset)
    offset += arr.length
  }

  return output
}

module.exports = { decodeText, encodeText, concat }

      };
    };
  }
}, {package:"@ensdomains/content-hash>cids>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\base.js", {"./util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\util.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\multibase\src\base.js
      return function (require, module, exports) {
'use strict'

const { encodeText } = require('./util')

/** @typedef {__import__('./types').CodecFactory} CodecFactory */
/** @typedef {__import__("./types").BaseName} BaseName */
/** @typedef {__import__("./types").BaseCode} BaseCode */

/**
 * Class to encode/decode in the supported Bases
 *
 */
class Base {
  /**
   * @param {BaseName} name
   * @param {BaseCode} code
   * @param {CodecFactory} factory
   * @param {string} alphabet
   */
  constructor (name, code, factory, alphabet) {
    this.name = name
    this.code = code
    this.codeBuf = encodeText(this.code)
    this.alphabet = alphabet
    this.codec = factory(alphabet)
  }

  /**
   * @param {Uint8Array} buf
   * @returns {string}
   */
  encode (buf) {
    return this.codec.encode(buf)
  }

  /**
   * @param {string} string
   * @returns {Uint8Array}
   */
  decode (string) {
    for (const char of string) {
      if (this.alphabet && this.alphabet.indexOf(char) < 0) {
        throw new Error(`invalid character '${char}' in '${string}'`)
      }
    }
    return this.codec.decode(string)
  }
}

module.exports = Base

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>uint8arrays>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\constants.js", {"./base.js":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\base.js","./rfc4648":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\rfc4648.js","./util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\util.js","@multiformats/base-x":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@multiformats\\base-x\\src\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\multibase\src\constants.js
      return function (require, module, exports) {
'use strict'

const baseX = require('@multiformats/base-x')
const Base = require('./base.js')
const { rfc4648 } = require('./rfc4648')
const { decodeText, encodeText } = require('./util')

/** @typedef {__import__('./types').CodecFactory} CodecFactory */
/** @typedef {__import__('./types').Codec} Codec */
/** @typedef {__import__('./types').BaseName} BaseName */
/** @typedef {__import__('./types').BaseCode} BaseCode */

/** @type {CodecFactory} */
const identity = () => {
  return {
    encode: decodeText,
    decode: encodeText
  }
}

/**
 *
 * name, code, implementation, alphabet
 *
 * @type {Array<[BaseName, BaseCode, CodecFactory, string]>}
 */
const constants = [
  ['identity', '\x00', identity, ''],
  ['base2', '0', rfc4648(1), '01'],
  ['base8', '7', rfc4648(3), '01234567'],
  ['base10', '9', baseX, '0123456789'],
  ['base16', 'f', rfc4648(4), '0123456789abcdef'],
  ['base16upper', 'F', rfc4648(4), '0123456789ABCDEF'],
  ['base32hex', 'v', rfc4648(5), '0123456789abcdefghijklmnopqrstuv'],
  ['base32hexupper', 'V', rfc4648(5), '0123456789ABCDEFGHIJKLMNOPQRSTUV'],
  ['base32hexpad', 't', rfc4648(5), '0123456789abcdefghijklmnopqrstuv='],
  ['base32hexpadupper', 'T', rfc4648(5), '0123456789ABCDEFGHIJKLMNOPQRSTUV='],
  ['base32', 'b', rfc4648(5), 'abcdefghijklmnopqrstuvwxyz234567'],
  ['base32upper', 'B', rfc4648(5), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'],
  ['base32pad', 'c', rfc4648(5), 'abcdefghijklmnopqrstuvwxyz234567='],
  ['base32padupper', 'C', rfc4648(5), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567='],
  ['base32z', 'h', rfc4648(5), 'ybndrfg8ejkmcpqxot1uwisza345h769'],
  ['base36', 'k', baseX, '0123456789abcdefghijklmnopqrstuvwxyz'],
  ['base36upper', 'K', baseX, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
  ['base58btc', 'z', baseX, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'],
  ['base58flickr', 'Z', baseX, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'],
  ['base64', 'm', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'],
  ['base64pad', 'M', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='],
  ['base64url', 'u', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'],
  ['base64urlpad', 'U', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=']
]

/** @type {Record<BaseName,Base>} */
const names = constants.reduce((prev, tupple) => {
  prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3])
  return prev
}, /** @type {Record<BaseName,Base>} */({}))

/** @type {Record<BaseCode,Base>} */
const codes = constants.reduce((prev, tupple) => {
  prev[tupple[1]] = names[tupple[0]]
  return prev
}, /** @type {Record<BaseCode,Base>} */({}))

module.exports = {
  names,
  codes
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>uint8arrays>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\rfc4648.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\multibase\src\rfc4648.js
      return function (require, module, exports) {
'use strict'

/** @typedef {__import__('./types').CodecFactory} CodecFactory */

/**
 * @param {string} string
 * @param {string} alphabet
 * @param {number} bitsPerChar
 * @returns {Uint8Array}
 */
const decode = (string, alphabet, bitsPerChar) => {
  // Build the character lookup table:
  /** @type {Record<string, number>} */
  const codes = {}
  for (let i = 0; i < alphabet.length; ++i) {
    codes[alphabet[i]] = i
  }

  // Count the padding bytes:
  let end = string.length
  while (string[end - 1] === '=') {
    --end
  }

  // Allocate the output:
  const out = new Uint8Array((end * bitsPerChar / 8) | 0)

  // Parse the data:
  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  let written = 0 // Next byte to write
  for (let i = 0; i < end; ++i) {
    // Read one character from the string:
    const value = codes[string[i]]
    if (value === undefined) {
      throw new SyntaxError('Invalid character ' + string[i])
    }

    // Append the bits to the buffer:
    buffer = (buffer << bitsPerChar) | value
    bits += bitsPerChar

    // Write out some bits if the buffer has a byte's worth:
    if (bits >= 8) {
      bits -= 8
      out[written++] = 0xff & (buffer >> bits)
    }
  }

  // Verify that we have received just enough bits:
  if (bits >= bitsPerChar || 0xff & (buffer << (8 - bits))) {
    throw new SyntaxError('Unexpected end of data')
  }

  return out
}

/**
 * @param {Uint8Array} data
 * @param {string} alphabet
 * @param {number} bitsPerChar
 * @returns {string}
 */
const encode = (data, alphabet, bitsPerChar) => {
  const pad = alphabet[alphabet.length - 1] === '='
  const mask = (1 << bitsPerChar) - 1
  let out = ''

  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  for (let i = 0; i < data.length; ++i) {
    // Slurp data into the buffer:
    buffer = (buffer << 8) | data[i]
    bits += 8

    // Write out as much as we can:
    while (bits > bitsPerChar) {
      bits -= bitsPerChar
      out += alphabet[mask & (buffer >> bits)]
    }
  }

  // Partial character:
  if (bits) {
    out += alphabet[mask & (buffer << (bitsPerChar - bits))]
  }

  // Add padding characters until we hit a byte boundary:
  if (pad) {
    while ((out.length * bitsPerChar) & 7) {
      out += '='
    }
  }

  return out
}

/**
 * RFC4648 Factory
 *
 * @param {number} bitsPerChar
 * @returns {CodecFactory}
 */
const rfc4648 = (bitsPerChar) => (alphabet) => {
  return {
    /**
     * @param {Uint8Array} input
     * @returns {string}
     */
    encode (input) {
      return encode(input, alphabet, bitsPerChar)
    },
    /**
     * @param {string} input
     * @returns {Uint8Array}
     */
    decode (input) {
      return decode(input, alphabet, bitsPerChar)
    }
  }
}

module.exports = { rfc4648 }

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>uint8arrays>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\util.js", {"web-encoding":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\web-encoding\\src\\lib.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\multibase\src\util.js
      return function (require, module, exports) {
'use strict'

// @ts-ignore
const { TextEncoder, TextDecoder } = require('web-encoding')

const textDecoder = new TextDecoder()
/**
 * @param {ArrayBufferView|ArrayBuffer} bytes
 * @returns {string}
 */
const decodeText = (bytes) => textDecoder.decode(bytes)

const textEncoder = new TextEncoder()
/**
 * @param {string} text
 * @returns {Uint8Array}
 */
const encodeText = (text) => textEncoder.encode(text)

/**
 * Returns a new Uint8Array created by concatenating the passed Arrays
 *
 * @param {Array<ArrayLike<number>>} arrs
 * @param {number} length
 * @returns {Uint8Array}
 */
function concat (arrs, length) {
  const output = new Uint8Array(length)
  let offset = 0

  for (const arr of arrs) {
    output.set(arr, offset)
    offset += arr.length
  }

  return output
}

module.exports = { decodeText, encodeText, concat }

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>uint8arrays>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\uint8arrays\\concat.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\uint8arrays\concat.js
      return function (require, module, exports) {
'use strict'

/**
 * Returns a new Uint8Array created by concatenating the passed ArrayLikes
 *
 * @param {Array<ArrayLike<number>>} arrays
 * @param {Number} length
 * @returns {Uint8Array}
 */
function concat (arrays, length) {
  if (!length) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0)
  }

  const output = new Uint8Array(length)
  let offset = 0

  for (const arr of arrays) {
    output.set(arr, offset)
    offset += arr.length
  }

  return output
}

module.exports = concat

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>uint8arrays",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\uint8arrays\\from-string.js", {"multibase/src/constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\constants.js","web-encoding":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\web-encoding\\src\\lib.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\uint8arrays\from-string.js
      return function (require, module, exports) {
'use strict'

const { names } = require('multibase/src/constants')
const { TextEncoder } = require('web-encoding')
const utf8Encoder = new TextEncoder()

/**
 * Interperets each character in a string as a byte and
 * returns a Uint8Array of those bytes.
 *
 * @param {String} string The string to turn into an array
 * @returns {Uint8Array}
 */
function asciiStringToUint8Array (string) {
  const array = new Uint8Array(string.length)

  for (let i = 0; i < string.length; i++) {
    array[i] = string.charCodeAt(i)
  }

  return array
}

/**
 * Create a `Uint8Array` from the passed string
 *
 * Supports `utf8`, `utf-8` and any encoding supported by the multibase module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 *
 * @param {String} string
 * @param {String} [encoding=utf8] utf8, base16, base64, base64urlpad, etc
 * @returns {Uint8Array}
 * @see {@link https://www.npmjs.com/package/multibase|multibase} for supported encodings other than `utf8`
 */
function fromString (string, encoding = 'utf8') {
  if (encoding === 'utf8' || encoding === 'utf-8') {
    return utf8Encoder.encode(string)
  }

  if (encoding === 'ascii') {
    return asciiStringToUint8Array(string)
  }

  const codec = names[encoding]

  if (!codec) {
    throw new Error('Unknown base')
  }

  return codec.decode(string)
}

module.exports = fromString

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>uint8arrays",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\uint8arrays\\to-string.js", {"multibase/src/constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\multibase\\src\\constants.js","web-encoding":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\web-encoding\\src\\lib.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\uint8arrays\to-string.js
      return function (require, module, exports) {
'use strict'

const { names } = require('multibase/src/constants')
const { TextDecoder } = require('web-encoding')
const utf8Decoder = new TextDecoder('utf8')

/**
 * Turns a Uint8Array of bytes into a string with each
 * character being the char code of the corresponding byte
 *
 * @param {Uint8Array} array The array to turn into a string
 * @returns {String}
 */
function uint8ArrayToAsciiString (array) {
  let string = ''

  for (let i = 0; i < array.length; i++) {
    string += String.fromCharCode(array[i])
  }
  return string
}

/**
 * Turns a `Uint8Array` into a string.
 *
 * Supports `utf8`, `utf-8` and any encoding supported by the multibase module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 *
 * @param {Uint8Array} array The array to turn into a string
 * @param {String} [encoding=utf8] The encoding to use
 * @returns {String}
 * @see {@link https://www.npmjs.com/package/multibase|multibase} for supported encodings other than `utf8`
 */
function toString (array, encoding = 'utf8') {
  if (encoding === 'utf8' || encoding === 'utf-8') {
    return utf8Decoder.decode(array)
  }

  if (encoding === 'ascii') {
    return uint8ArrayToAsciiString(array)
  }

  const codec = names[encoding]

  if (!codec) {
    throw new Error('Unknown base')
  }

  return codec.encode(array)
}

module.exports = toString

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>uint8arrays",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\varint\\decode.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\varint\decode.js
      return function (require, module, exports) {
module.exports = read

var MSB = 0x80
  , REST = 0x7F

function read(buf, offset) {
  var res    = 0
    , offset = offset || 0
    , shift  = 0
    , counter = offset
    , b
    , l = buf.length

  do {
    if (counter >= l || shift > 49) {
      read.bytes = 0
      throw new RangeError('Could not decode varint')
    }
    b = buf[counter++]
    res += shift < 28
      ? (b & REST) << shift
      : (b & REST) * Math.pow(2, shift)
    shift += 7
  } while (b >= MSB)

  read.bytes = counter - offset

  return res
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>varint",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\varint\\encode.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\varint\encode.js
      return function (require, module, exports) {
module.exports = encode

var MSB = 0x80
  , REST = 0x7F
  , MSBALL = ~REST
  , INT = Math.pow(2, 31)

function encode(num, out, offset) {
  if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
    encode.bytes = 0
    throw new RangeError('Could not encode varint')
  }
  out = out || []
  offset = offset || 0
  var oldOffset = offset

  while(num >= INT) {
    out[offset++] = (num & 0xFF) | MSB
    num /= 128
  }
  while(num & MSBALL) {
    out[offset++] = (num & 0xFF) | MSB
    num >>>= 7
  }
  out[offset] = num | 0
  
  encode.bytes = offset - oldOffset + 1
  
  return out
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>varint",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\varint\\index.js", {"./decode.js":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\varint\\decode.js","./encode.js":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\varint\\encode.js","./length.js":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\varint\\length.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\varint\index.js
      return function (require, module, exports) {
module.exports = {
    encode: require('./encode.js')
  , decode: require('./decode.js')
  , encodingLength: require('./length.js')
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>varint",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\varint\\length.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\node_modules\varint\length.js
      return function (require, module, exports) {

var N1 = Math.pow(2,  7)
var N2 = Math.pow(2, 14)
var N3 = Math.pow(2, 21)
var N4 = Math.pow(2, 28)
var N5 = Math.pow(2, 35)
var N6 = Math.pow(2, 42)
var N7 = Math.pow(2, 49)
var N8 = Math.pow(2, 56)
var N9 = Math.pow(2, 63)

module.exports = function (value) {
  return (
    value < N1 ? 1
  : value < N2 ? 2
  : value < N3 ? 3
  : value < N4 ? 4
  : value < N5 ? 5
  : value < N6 ? 6
  : value < N7 ? 7
  : value < N8 ? 8
  : value < N9 ? 9
  :              10
  )
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec>varint",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\base-table.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\src\base-table.js
      return function (require, module, exports) {
// DO NOT CHANGE THIS FILE. IT IS GENERATED BY tools/update-table.js
/* eslint quote-props: off */
'use strict'

/**
 * @type {__import__('./generated-types').NameNumberMap}
 */
const baseTable = Object.freeze({
  'identity': 0x00,
  'cidv1': 0x01,
  'cidv2': 0x02,
  'cidv3': 0x03,
  'ip4': 0x04,
  'tcp': 0x06,
  'sha1': 0x11,
  'sha2-256': 0x12,
  'sha2-512': 0x13,
  'sha3-512': 0x14,
  'sha3-384': 0x15,
  'sha3-256': 0x16,
  'sha3-224': 0x17,
  'shake-128': 0x18,
  'shake-256': 0x19,
  'keccak-224': 0x1a,
  'keccak-256': 0x1b,
  'keccak-384': 0x1c,
  'keccak-512': 0x1d,
  'blake3': 0x1e,
  'dccp': 0x21,
  'murmur3-128': 0x22,
  'murmur3-32': 0x23,
  'ip6': 0x29,
  'ip6zone': 0x2a,
  'path': 0x2f,
  'multicodec': 0x30,
  'multihash': 0x31,
  'multiaddr': 0x32,
  'multibase': 0x33,
  'dns': 0x35,
  'dns4': 0x36,
  'dns6': 0x37,
  'dnsaddr': 0x38,
  'protobuf': 0x50,
  'cbor': 0x51,
  'raw': 0x55,
  'dbl-sha2-256': 0x56,
  'rlp': 0x60,
  'bencode': 0x63,
  'dag-pb': 0x70,
  'dag-cbor': 0x71,
  'libp2p-key': 0x72,
  'git-raw': 0x78,
  'torrent-info': 0x7b,
  'torrent-file': 0x7c,
  'leofcoin-block': 0x81,
  'leofcoin-tx': 0x82,
  'leofcoin-pr': 0x83,
  'sctp': 0x84,
  'dag-jose': 0x85,
  'dag-cose': 0x86,
  'eth-block': 0x90,
  'eth-block-list': 0x91,
  'eth-tx-trie': 0x92,
  'eth-tx': 0x93,
  'eth-tx-receipt-trie': 0x94,
  'eth-tx-receipt': 0x95,
  'eth-state-trie': 0x96,
  'eth-account-snapshot': 0x97,
  'eth-storage-trie': 0x98,
  'bitcoin-block': 0xb0,
  'bitcoin-tx': 0xb1,
  'bitcoin-witness-commitment': 0xb2,
  'zcash-block': 0xc0,
  'zcash-tx': 0xc1,
  'docid': 0xce,
  'stellar-block': 0xd0,
  'stellar-tx': 0xd1,
  'md4': 0xd4,
  'md5': 0xd5,
  'bmt': 0xd6,
  'decred-block': 0xe0,
  'decred-tx': 0xe1,
  'ipld-ns': 0xe2,
  'ipfs-ns': 0xe3,
  'swarm-ns': 0xe4,
  'ipns-ns': 0xe5,
  'zeronet': 0xe6,
  'secp256k1-pub': 0xe7,
  'bls12_381-g1-pub': 0xea,
  'bls12_381-g2-pub': 0xeb,
  'x25519-pub': 0xec,
  'ed25519-pub': 0xed,
  'bls12_381-g1g2-pub': 0xee,
  'dash-block': 0xf0,
  'dash-tx': 0xf1,
  'swarm-manifest': 0xfa,
  'swarm-feed': 0xfb,
  'udp': 0x0111,
  'p2p-webrtc-star': 0x0113,
  'p2p-webrtc-direct': 0x0114,
  'p2p-stardust': 0x0115,
  'p2p-circuit': 0x0122,
  'dag-json': 0x0129,
  'udt': 0x012d,
  'utp': 0x012e,
  'unix': 0x0190,
  'p2p': 0x01a5,
  'ipfs': 0x01a5,
  'https': 0x01bb,
  'onion': 0x01bc,
  'onion3': 0x01bd,
  'garlic64': 0x01be,
  'garlic32': 0x01bf,
  'tls': 0x01c0,
  'quic': 0x01cc,
  'ws': 0x01dd,
  'wss': 0x01de,
  'p2p-websocket-star': 0x01df,
  'http': 0x01e0,
  'json': 0x0200,
  'messagepack': 0x0201,
  'libp2p-peer-record': 0x0301,
  'sha2-256-trunc254-padded': 0x1012,
  'ripemd-128': 0x1052,
  'ripemd-160': 0x1053,
  'ripemd-256': 0x1054,
  'ripemd-320': 0x1055,
  'x11': 0x1100,
  'p256-pub': 0x1200,
  'p384-pub': 0x1201,
  'p521-pub': 0x1202,
  'ed448-pub': 0x1203,
  'x448-pub': 0x1204,
  'ed25519-priv': 0x1300,
  'kangarootwelve': 0x1d01,
  'sm3-256': 0x534d,
  'blake2b-8': 0xb201,
  'blake2b-16': 0xb202,
  'blake2b-24': 0xb203,
  'blake2b-32': 0xb204,
  'blake2b-40': 0xb205,
  'blake2b-48': 0xb206,
  'blake2b-56': 0xb207,
  'blake2b-64': 0xb208,
  'blake2b-72': 0xb209,
  'blake2b-80': 0xb20a,
  'blake2b-88': 0xb20b,
  'blake2b-96': 0xb20c,
  'blake2b-104': 0xb20d,
  'blake2b-112': 0xb20e,
  'blake2b-120': 0xb20f,
  'blake2b-128': 0xb210,
  'blake2b-136': 0xb211,
  'blake2b-144': 0xb212,
  'blake2b-152': 0xb213,
  'blake2b-160': 0xb214,
  'blake2b-168': 0xb215,
  'blake2b-176': 0xb216,
  'blake2b-184': 0xb217,
  'blake2b-192': 0xb218,
  'blake2b-200': 0xb219,
  'blake2b-208': 0xb21a,
  'blake2b-216': 0xb21b,
  'blake2b-224': 0xb21c,
  'blake2b-232': 0xb21d,
  'blake2b-240': 0xb21e,
  'blake2b-248': 0xb21f,
  'blake2b-256': 0xb220,
  'blake2b-264': 0xb221,
  'blake2b-272': 0xb222,
  'blake2b-280': 0xb223,
  'blake2b-288': 0xb224,
  'blake2b-296': 0xb225,
  'blake2b-304': 0xb226,
  'blake2b-312': 0xb227,
  'blake2b-320': 0xb228,
  'blake2b-328': 0xb229,
  'blake2b-336': 0xb22a,
  'blake2b-344': 0xb22b,
  'blake2b-352': 0xb22c,
  'blake2b-360': 0xb22d,
  'blake2b-368': 0xb22e,
  'blake2b-376': 0xb22f,
  'blake2b-384': 0xb230,
  'blake2b-392': 0xb231,
  'blake2b-400': 0xb232,
  'blake2b-408': 0xb233,
  'blake2b-416': 0xb234,
  'blake2b-424': 0xb235,
  'blake2b-432': 0xb236,
  'blake2b-440': 0xb237,
  'blake2b-448': 0xb238,
  'blake2b-456': 0xb239,
  'blake2b-464': 0xb23a,
  'blake2b-472': 0xb23b,
  'blake2b-480': 0xb23c,
  'blake2b-488': 0xb23d,
  'blake2b-496': 0xb23e,
  'blake2b-504': 0xb23f,
  'blake2b-512': 0xb240,
  'blake2s-8': 0xb241,
  'blake2s-16': 0xb242,
  'blake2s-24': 0xb243,
  'blake2s-32': 0xb244,
  'blake2s-40': 0xb245,
  'blake2s-48': 0xb246,
  'blake2s-56': 0xb247,
  'blake2s-64': 0xb248,
  'blake2s-72': 0xb249,
  'blake2s-80': 0xb24a,
  'blake2s-88': 0xb24b,
  'blake2s-96': 0xb24c,
  'blake2s-104': 0xb24d,
  'blake2s-112': 0xb24e,
  'blake2s-120': 0xb24f,
  'blake2s-128': 0xb250,
  'blake2s-136': 0xb251,
  'blake2s-144': 0xb252,
  'blake2s-152': 0xb253,
  'blake2s-160': 0xb254,
  'blake2s-168': 0xb255,
  'blake2s-176': 0xb256,
  'blake2s-184': 0xb257,
  'blake2s-192': 0xb258,
  'blake2s-200': 0xb259,
  'blake2s-208': 0xb25a,
  'blake2s-216': 0xb25b,
  'blake2s-224': 0xb25c,
  'blake2s-232': 0xb25d,
  'blake2s-240': 0xb25e,
  'blake2s-248': 0xb25f,
  'blake2s-256': 0xb260,
  'skein256-8': 0xb301,
  'skein256-16': 0xb302,
  'skein256-24': 0xb303,
  'skein256-32': 0xb304,
  'skein256-40': 0xb305,
  'skein256-48': 0xb306,
  'skein256-56': 0xb307,
  'skein256-64': 0xb308,
  'skein256-72': 0xb309,
  'skein256-80': 0xb30a,
  'skein256-88': 0xb30b,
  'skein256-96': 0xb30c,
  'skein256-104': 0xb30d,
  'skein256-112': 0xb30e,
  'skein256-120': 0xb30f,
  'skein256-128': 0xb310,
  'skein256-136': 0xb311,
  'skein256-144': 0xb312,
  'skein256-152': 0xb313,
  'skein256-160': 0xb314,
  'skein256-168': 0xb315,
  'skein256-176': 0xb316,
  'skein256-184': 0xb317,
  'skein256-192': 0xb318,
  'skein256-200': 0xb319,
  'skein256-208': 0xb31a,
  'skein256-216': 0xb31b,
  'skein256-224': 0xb31c,
  'skein256-232': 0xb31d,
  'skein256-240': 0xb31e,
  'skein256-248': 0xb31f,
  'skein256-256': 0xb320,
  'skein512-8': 0xb321,
  'skein512-16': 0xb322,
  'skein512-24': 0xb323,
  'skein512-32': 0xb324,
  'skein512-40': 0xb325,
  'skein512-48': 0xb326,
  'skein512-56': 0xb327,
  'skein512-64': 0xb328,
  'skein512-72': 0xb329,
  'skein512-80': 0xb32a,
  'skein512-88': 0xb32b,
  'skein512-96': 0xb32c,
  'skein512-104': 0xb32d,
  'skein512-112': 0xb32e,
  'skein512-120': 0xb32f,
  'skein512-128': 0xb330,
  'skein512-136': 0xb331,
  'skein512-144': 0xb332,
  'skein512-152': 0xb333,
  'skein512-160': 0xb334,
  'skein512-168': 0xb335,
  'skein512-176': 0xb336,
  'skein512-184': 0xb337,
  'skein512-192': 0xb338,
  'skein512-200': 0xb339,
  'skein512-208': 0xb33a,
  'skein512-216': 0xb33b,
  'skein512-224': 0xb33c,
  'skein512-232': 0xb33d,
  'skein512-240': 0xb33e,
  'skein512-248': 0xb33f,
  'skein512-256': 0xb340,
  'skein512-264': 0xb341,
  'skein512-272': 0xb342,
  'skein512-280': 0xb343,
  'skein512-288': 0xb344,
  'skein512-296': 0xb345,
  'skein512-304': 0xb346,
  'skein512-312': 0xb347,
  'skein512-320': 0xb348,
  'skein512-328': 0xb349,
  'skein512-336': 0xb34a,
  'skein512-344': 0xb34b,
  'skein512-352': 0xb34c,
  'skein512-360': 0xb34d,
  'skein512-368': 0xb34e,
  'skein512-376': 0xb34f,
  'skein512-384': 0xb350,
  'skein512-392': 0xb351,
  'skein512-400': 0xb352,
  'skein512-408': 0xb353,
  'skein512-416': 0xb354,
  'skein512-424': 0xb355,
  'skein512-432': 0xb356,
  'skein512-440': 0xb357,
  'skein512-448': 0xb358,
  'skein512-456': 0xb359,
  'skein512-464': 0xb35a,
  'skein512-472': 0xb35b,
  'skein512-480': 0xb35c,
  'skein512-488': 0xb35d,
  'skein512-496': 0xb35e,
  'skein512-504': 0xb35f,
  'skein512-512': 0xb360,
  'skein1024-8': 0xb361,
  'skein1024-16': 0xb362,
  'skein1024-24': 0xb363,
  'skein1024-32': 0xb364,
  'skein1024-40': 0xb365,
  'skein1024-48': 0xb366,
  'skein1024-56': 0xb367,
  'skein1024-64': 0xb368,
  'skein1024-72': 0xb369,
  'skein1024-80': 0xb36a,
  'skein1024-88': 0xb36b,
  'skein1024-96': 0xb36c,
  'skein1024-104': 0xb36d,
  'skein1024-112': 0xb36e,
  'skein1024-120': 0xb36f,
  'skein1024-128': 0xb370,
  'skein1024-136': 0xb371,
  'skein1024-144': 0xb372,
  'skein1024-152': 0xb373,
  'skein1024-160': 0xb374,
  'skein1024-168': 0xb375,
  'skein1024-176': 0xb376,
  'skein1024-184': 0xb377,
  'skein1024-192': 0xb378,
  'skein1024-200': 0xb379,
  'skein1024-208': 0xb37a,
  'skein1024-216': 0xb37b,
  'skein1024-224': 0xb37c,
  'skein1024-232': 0xb37d,
  'skein1024-240': 0xb37e,
  'skein1024-248': 0xb37f,
  'skein1024-256': 0xb380,
  'skein1024-264': 0xb381,
  'skein1024-272': 0xb382,
  'skein1024-280': 0xb383,
  'skein1024-288': 0xb384,
  'skein1024-296': 0xb385,
  'skein1024-304': 0xb386,
  'skein1024-312': 0xb387,
  'skein1024-320': 0xb388,
  'skein1024-328': 0xb389,
  'skein1024-336': 0xb38a,
  'skein1024-344': 0xb38b,
  'skein1024-352': 0xb38c,
  'skein1024-360': 0xb38d,
  'skein1024-368': 0xb38e,
  'skein1024-376': 0xb38f,
  'skein1024-384': 0xb390,
  'skein1024-392': 0xb391,
  'skein1024-400': 0xb392,
  'skein1024-408': 0xb393,
  'skein1024-416': 0xb394,
  'skein1024-424': 0xb395,
  'skein1024-432': 0xb396,
  'skein1024-440': 0xb397,
  'skein1024-448': 0xb398,
  'skein1024-456': 0xb399,
  'skein1024-464': 0xb39a,
  'skein1024-472': 0xb39b,
  'skein1024-480': 0xb39c,
  'skein1024-488': 0xb39d,
  'skein1024-496': 0xb39e,
  'skein1024-504': 0xb39f,
  'skein1024-512': 0xb3a0,
  'skein1024-520': 0xb3a1,
  'skein1024-528': 0xb3a2,
  'skein1024-536': 0xb3a3,
  'skein1024-544': 0xb3a4,
  'skein1024-552': 0xb3a5,
  'skein1024-560': 0xb3a6,
  'skein1024-568': 0xb3a7,
  'skein1024-576': 0xb3a8,
  'skein1024-584': 0xb3a9,
  'skein1024-592': 0xb3aa,
  'skein1024-600': 0xb3ab,
  'skein1024-608': 0xb3ac,
  'skein1024-616': 0xb3ad,
  'skein1024-624': 0xb3ae,
  'skein1024-632': 0xb3af,
  'skein1024-640': 0xb3b0,
  'skein1024-648': 0xb3b1,
  'skein1024-656': 0xb3b2,
  'skein1024-664': 0xb3b3,
  'skein1024-672': 0xb3b4,
  'skein1024-680': 0xb3b5,
  'skein1024-688': 0xb3b6,
  'skein1024-696': 0xb3b7,
  'skein1024-704': 0xb3b8,
  'skein1024-712': 0xb3b9,
  'skein1024-720': 0xb3ba,
  'skein1024-728': 0xb3bb,
  'skein1024-736': 0xb3bc,
  'skein1024-744': 0xb3bd,
  'skein1024-752': 0xb3be,
  'skein1024-760': 0xb3bf,
  'skein1024-768': 0xb3c0,
  'skein1024-776': 0xb3c1,
  'skein1024-784': 0xb3c2,
  'skein1024-792': 0xb3c3,
  'skein1024-800': 0xb3c4,
  'skein1024-808': 0xb3c5,
  'skein1024-816': 0xb3c6,
  'skein1024-824': 0xb3c7,
  'skein1024-832': 0xb3c8,
  'skein1024-840': 0xb3c9,
  'skein1024-848': 0xb3ca,
  'skein1024-856': 0xb3cb,
  'skein1024-864': 0xb3cc,
  'skein1024-872': 0xb3cd,
  'skein1024-880': 0xb3ce,
  'skein1024-888': 0xb3cf,
  'skein1024-896': 0xb3d0,
  'skein1024-904': 0xb3d1,
  'skein1024-912': 0xb3d2,
  'skein1024-920': 0xb3d3,
  'skein1024-928': 0xb3d4,
  'skein1024-936': 0xb3d5,
  'skein1024-944': 0xb3d6,
  'skein1024-952': 0xb3d7,
  'skein1024-960': 0xb3d8,
  'skein1024-968': 0xb3d9,
  'skein1024-976': 0xb3da,
  'skein1024-984': 0xb3db,
  'skein1024-992': 0xb3dc,
  'skein1024-1000': 0xb3dd,
  'skein1024-1008': 0xb3de,
  'skein1024-1016': 0xb3df,
  'skein1024-1024': 0xb3e0,
  'poseidon-bls12_381-a2-fc1': 0xb401,
  'poseidon-bls12_381-a2-fc1-sc': 0xb402,
  'zeroxcert-imprint-256': 0xce11,
  'fil-commitment-unsealed': 0xf101,
  'fil-commitment-sealed': 0xf102,
  'holochain-adr-v0': 0x807124,
  'holochain-adr-v1': 0x817124,
  'holochain-key-v0': 0x947124,
  'holochain-key-v1': 0x957124,
  'holochain-sig-v0': 0xa27124,
  'holochain-sig-v1': 0xa37124,
  'skynet-ns': 0xb19910
})

module.exports = { baseTable }

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\constants.js", {"./base-table":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\base-table.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\src\constants.js
      return function (require, module, exports) {
'use strict'

/** @typedef {__import__('./generated-types').ConstantNumberMap} ConstantNumberMap */

const { baseTable } = require('./base-table')

const constants = /** @type {ConstantNumberMap} */({})

for (const [name, code] of Object.entries(baseTable)) {
  const constant = name.toUpperCase().replace(/-/g, '_')
  constants[constant] = code
}

module.exports = Object.freeze(constants)

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\index.js", {"./constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\constants.js","./int-table":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\int-table.js","./print":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\print.js","./util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\util.js","./varint-table":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\varint-table.js","uint8arrays/concat":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\uint8arrays\\concat.js","varint":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\varint\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\src\index.js
      return function (require, module, exports) {
/**
 * Implementation of the multicodec specification.
 *
 * @module multicodec
 * @example
 * const multicodec = require('multicodec')
 *
 * const prefixedProtobuf = multicodec.addPrefix('protobuf', protobufBuffer)
 * // prefixedProtobuf 0x50...
 *
 */
'use strict'

/** @typedef {__import__('./generated-types').CodecName} CodecName */
/** @typedef {__import__('./generated-types').CodecNumber} CodecNumber */

const varint = require('varint')
const intTable = require('./int-table')
const codecNameToCodeVarint = require('./varint-table')
const util = require('./util')
const uint8ArrayConcat = require('uint8arrays/concat')

/**
 * Prefix a buffer with a multicodec-packed.
 *
 * @param {CodecName|Uint8Array} multicodecStrOrCode
 * @param {Uint8Array} data
 * @returns {Uint8Array}
 */
function addPrefix (multicodecStrOrCode, data) {
  let prefix

  if (multicodecStrOrCode instanceof Uint8Array) {
    prefix = util.varintUint8ArrayEncode(multicodecStrOrCode)
  } else {
    if (codecNameToCodeVarint[multicodecStrOrCode]) {
      prefix = codecNameToCodeVarint[multicodecStrOrCode]
    } else {
      throw new Error('multicodec not recognized')
    }
  }
  return uint8ArrayConcat([prefix, data], prefix.length + data.length)
}

/**
 * Decapsulate the multicodec-packed prefix from the data.
 *
 * @param {Uint8Array} data
 * @returns {Uint8Array}
 */
function rmPrefix (data) {
  varint.decode(data)
  return data.slice(varint.decode.bytes)
}

/**
 * Get the codec of the prefixed data.
 *
 * @param {Uint8Array} prefixedData
 * @returns {CodecName}
 */
function getCodec (prefixedData) {
  const code = varint.decode(prefixedData)
  const codecName = intTable.get(code)
  if (codecName === undefined) {
    throw new Error(`Code ${code} not found`)
  }
  return codecName
}

/**
 * Get the name of the codec.
 *
 * @param {CodecNumber} codec
 * @returns {CodecName|undefined}
 */
function getName (codec) {
  return intTable.get(codec)
}

/**
 * Get the code of the codec
 *
 * @param {CodecName} name
 * @returns {CodecNumber}
 */
function getNumber (name) {
  const code = codecNameToCodeVarint[name]
  if (code === undefined) {
    throw new Error('Codec `' + name + '` not found')
  }
  return varint.decode(code)
}

/**
 * Get the code of the prefixed data.
 *
 * @param {Uint8Array} prefixedData
 * @returns {CodecNumber}
 */
function getCode (prefixedData) {
  return varint.decode(prefixedData)
}

/**
 * Get the code as varint of a codec name.
 *
 * @param {CodecName} codecName
 * @returns {Uint8Array}
 */
function getCodeVarint (codecName) {
  const code = codecNameToCodeVarint[codecName]
  if (code === undefined) {
    throw new Error('Codec `' + codecName + '` not found')
  }
  return code
}

/**
 * Get the varint of a code.
 *
 * @param {CodecNumber} code
 * @returns {Array.<number>}
 */
function getVarint (code) {
  return varint.encode(code)
}

// Make the constants top-level constants
const constants = require('./constants')

// Human friendly names for printing, e.g. in error messages
const print = require('./print')

module.exports = {
  addPrefix,
  rmPrefix,
  getCodec,
  getName,
  getNumber,
  getCode,
  getCodeVarint,
  getVarint,
  print,
  ...constants
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\int-table.js", {"./base-table":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\base-table.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\src\int-table.js
      return function (require, module, exports) {
'use strict'

/** @typedef {__import__('./generated-types').CodecName} CodecName */
/** @typedef {__import__('./generated-types').CodecNumber} CodecNumber */

const { baseTable } = require('./base-table')

/**
 * @type {Map<CodecNumber,CodecName>}
 */
const nameTable = new Map()

for (const encodingName in baseTable) {
  const code = baseTable[encodingName]
  nameTable.set(code, /** @type {CodecName} */(encodingName))
}

module.exports = Object.freeze(nameTable)

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\print.js", {"./base-table":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\base-table.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\src\print.js
      return function (require, module, exports) {
'use strict'

/** @typedef {__import__('./generated-types').CodecName} CodecName */
/** @typedef {__import__('./generated-types').NumberNameMap} NumberNameMap */

const { baseTable } = require('./base-table')

const tableByCode = /** @type {NumberNameMap} */({})

for (const [name, code] of Object.entries(baseTable)) {
  if (tableByCode[code] === undefined) {
    tableByCode[code] = /** @type {CodecName} **/(name)
  }
}

module.exports = /** @type {NumberNameMap} */(Object.freeze(tableByCode))

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\util.js", {"uint8arrays/from-string":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\uint8arrays\\from-string.js","uint8arrays/to-string":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\uint8arrays\\to-string.js","varint":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\node_modules\\varint\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\src\util.js
      return function (require, module, exports) {
'use strict'

const varint = require('varint')
const uint8ArrayToString = require('uint8arrays/to-string')
const uint8ArrayFromString = require('uint8arrays/from-string')

module.exports = {
  numberToUint8Array,
  uint8ArrayToNumber,
  varintUint8ArrayEncode,
  varintEncode
}

function uint8ArrayToNumber (buf) {
  return parseInt(uint8ArrayToString(buf, 'base16'), 16)
}

function numberToUint8Array (num) {
  let hexString = num.toString(16)
  if (hexString.length % 2 === 1) {
    hexString = '0' + hexString
  }
  return uint8ArrayFromString(hexString, 'base16')
}

function varintUint8ArrayEncode (input) {
  return Uint8Array.from(varint.encode(uint8ArrayToNumber(input)))
}

function varintEncode (num) {
  return Uint8Array.from(varint.encode(num))
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\varint-table.js", {"./base-table":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\base-table.js","./util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multicodec\\src\\util.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multicodec\src\varint-table.js
      return function (require, module, exports) {
'use strict'

/** @typedef {__import__('./generated-types').NameUint8ArrayMap} NameUint8ArrayMap */

const { baseTable } = require('./base-table')
const varintEncode = require('./util').varintEncode

const varintTable = /** @type {NameUint8ArrayMap} */ ({})

for (const encodingName in baseTable) {
  const code = baseTable[encodingName]
  varintTable[encodingName] = varintEncode(code)
}

module.exports = Object.freeze(varintTable)

      };
    };
  }
}, {package:"@ensdomains/content-hash>multicodec",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\base.js", {"buffer":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\browserify\\node_modules\\buffer\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multihashes\node_modules\multibase\src\base.js
      return function (require, module, exports) {
// @ts-check
'use strict'
const { Buffer } = require('buffer')

/**
 * @typedef {Object} Codec
 * @property {function(Uint8Array):string} encode
 * @property {function(string):Uint8Array} decode
 *
 * @typedef {function(string):Codec} CodecFactory
 */

class Base {
  /**
   * @param {string} name
   * @param {string} code
   * @param {CodecFactory} implementation
   * @param {string} alphabet
   */
  constructor (name, code, implementation, alphabet) {
    this.name = name
    this.code = code
    this.codeBuf = Buffer.from(this.code)
    this.alphabet = alphabet
    this.engine = implementation(alphabet)
  }

  /**
   * @param {Uint8Array} buf
   * @returns {string}
   */
  encode (buf) {
    return this.engine.encode(buf)
  }

  /**
   * @param {string} string
   * @returns {Uint8Array}
   */
  decode (string) {
    for (const char of string) {
      if (this.alphabet && this.alphabet.indexOf(char) < 0) {
        throw new Error(`invalid character '${char}' in '${string}'`)
      }
    }
    return this.engine.decode(string)
  }
}

module.exports = Base

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\constants.js", {"./base.js":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\base.js","./rfc4648":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\rfc4648.js","./util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\util.js","base-x":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\base-x\\src\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multihashes\node_modules\multibase\src\constants.js
      return function (require, module, exports) {
// @ts-check
'use strict'

const baseX = require('base-x')
const Base = require('./base.js')
const rfc4648 = require('./rfc4648')
const { decodeText, encodeText } = require('./util')

const identity = () => {
  return {
    encode: decodeText,
    decode: encodeText
  }
}

/**
 * @typedef {__import__('./base').CodecFactory} CodecFactory
 *
 * name, code, implementation, alphabet
 * @type {Array<[string, string, CodecFactory, string]>}
 */
const constants = [
  ['identity', '\x00', identity, ''],
  ['base2', '0', rfc4648(1), '01'],
  ['base8', '7', rfc4648(3), '01234567'],
  ['base10', '9', baseX, '0123456789'],
  ['base16', 'f', rfc4648(4), '0123456789abcdef'],
  ['base16upper', 'F', rfc4648(4), '0123456789ABCDEF'],
  ['base32hex', 'v', rfc4648(5), '0123456789abcdefghijklmnopqrstuv'],
  ['base32hexupper', 'V', rfc4648(5), '0123456789ABCDEFGHIJKLMNOPQRSTUV'],
  ['base32hexpad', 't', rfc4648(5), '0123456789abcdefghijklmnopqrstuv='],
  ['base32hexpadupper', 'T', rfc4648(5), '0123456789ABCDEFGHIJKLMNOPQRSTUV='],
  ['base32', 'b', rfc4648(5), 'abcdefghijklmnopqrstuvwxyz234567'],
  ['base32upper', 'B', rfc4648(5), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'],
  ['base32pad', 'c', rfc4648(5), 'abcdefghijklmnopqrstuvwxyz234567='],
  ['base32padupper', 'C', rfc4648(5), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567='],
  ['base32z', 'h', rfc4648(5), 'ybndrfg8ejkmcpqxot1uwisza345h769'],
  ['base36', 'k', baseX, '0123456789abcdefghijklmnopqrstuvwxyz'],
  ['base36upper', 'K', baseX, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
  ['base58btc', 'z', baseX, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'],
  ['base58flickr', 'Z', baseX, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'],
  ['base64', 'm', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'],
  ['base64pad', 'M', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='],
  ['base64url', 'u', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'],
  ['base64urlpad', 'U', rfc4648(6), 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=']
]

const names = constants.reduce((prev, tupple) => {
  prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3])
  return prev
}, {})

const codes = constants.reduce((prev, tupple) => {
  prev[tupple[1]] = names[tupple[0]]
  return prev
}, {})

module.exports = {
  names,
  codes
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\index.js", {"./constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\constants.js","./util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\util.js","buffer":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\browserify\\node_modules\\buffer\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multihashes\node_modules\multibase\src\index.js
      return function (require, module, exports) {
// @ts-check
/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 *
 * @module Multibase
 */
'use strict'

const { Buffer } = require('buffer')
const constants = require('./constants')
const { decodeText, asBuffer } = require('./util')

/** @typedef {__import__("./base")} Base */

/**
 * Create a new buffer with the multibase varint+code.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Uint8Array} buf - The data to be prefixed with multibase.
 * @returns {Buffer}
 * @throws {Error} Will throw if the encoding is not supported
 */
function multibase (nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded buffer')
  }
  const { name, codeBuf } = encoding(nameOrCode)
  validEncode(name, buf)

  const buffer = Buffer.alloc(codeBuf.length + buf.length)
  buffer.set(codeBuf, 0)
  buffer.set(buf, codeBuf.length)

  return buffer
}

/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Uint8Array} buf - The data to be encoded.
 * @returns {Buffer}
 * @throws {Error} Will throw if the encoding is not supported
 *
 */
function encode (nameOrCode, buf) {
  const enc = encoding(nameOrCode)

  return Buffer.concat([enc.codeBuf, Buffer.from(enc.encode(buf))])
}

/**
 * Takes a Uint8Array or string encoded with multibase header, decodes it and
 * returns the decoded buffer
 *
 * @param {Uint8Array|string} data
 * @returns {Buffer}
 * @throws {Error} Will throw if the encoding is not supported
 *
 */
function decode (data) {
  if (ArrayBuffer.isView(data)) {
    data = decodeText(data)
  }
  const prefix = data[0]

  // Make all encodings case-insensitive except the ones that include upper and lower chars in the alphabet
  if (['f', 'F', 'v', 'V', 't', 'T', 'b', 'B', 'c', 'C', 'h', 'k', 'K'].includes(prefix)) {
    data = data.toLowerCase()
  }
  const enc = encoding(data[0])
  return asBuffer(enc.decode(data.substring(1)))
}

/**
 * Is the given data multibase encoded?
 *
 * @param {Uint8Array|string} data
 * @returns {false|string}
 */
function isEncoded (data) {
  if (data instanceof Uint8Array) {
    data = decodeText(data)
  }

  // Ensure bufOrString is a string
  if (Object.prototype.toString.call(data) !== '[object String]') {
    return false
  }

  try {
    const enc = encoding(data[0])
    return enc.name
  } catch (err) {
    return false
  }
}

/**
 * Validate encoded data
 *
 * @param {string} name
 * @param {Uint8Array} buf
 * @returns {void}
 * @throws {Error} Will throw if the encoding is not supported
 */
function validEncode (name, buf) {
  const enc = encoding(name)
  enc.decode(decodeText(buf))
}

/**
 * Get the encoding by name or code
 *
 * @param {string|number} nameOrCode
 * @returns {Base}
 * @throws {Error} Will throw if the encoding is not supported
 */
function encoding (nameOrCode) {
  if (constants.names[nameOrCode]) {
    return constants.names[nameOrCode]
  } else if (constants.codes[nameOrCode]) {
    return constants.codes[nameOrCode]
  } else {
    throw new Error(`Unsupported encoding: ${nameOrCode}`)
  }
}

/**
 * Get encoding from data
 *
 * @param {string|Uint8Array} data
 * @returns {Base}
 * @throws {Error} Will throw if the encoding is not supported
 */
function encodingFromData (data) {
  if (data instanceof Uint8Array) {
    data = decodeText(data)
  }

  return encoding(data[0])
}

exports = module.exports = multibase
exports.encode = encode
exports.decode = decode
exports.isEncoded = isEncoded
exports.encoding = encoding
exports.encodingFromData = encodingFromData
exports.names = Object.freeze(constants.names)
exports.codes = Object.freeze(constants.codes)

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\rfc4648.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multihashes\node_modules\multibase\src\rfc4648.js
      return function (require, module, exports) {
// @ts-check
'use strict'

/** @typedef {__import__('./base').CodecFactory} CodecFactory */

/**
 * @param {string} string
 * @param {string} alphabet
 * @param {number} bitsPerChar
 * @returns {Uint8Array}
 */
const decode = (string, alphabet, bitsPerChar) => {
  // Build the character lookup table:
  const codes = {}
  for (let i = 0; i < alphabet.length; ++i) {
    codes[alphabet[i]] = i
  }

  // Count the padding bytes:
  let end = string.length
  while (string[end - 1] === '=') {
    --end
  }

  // Allocate the output:
  const out = new Uint8Array((end * bitsPerChar / 8) | 0)

  // Parse the data:
  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  let written = 0 // Next byte to write
  for (let i = 0; i < end; ++i) {
    // Read one character from the string:
    const value = codes[string[i]]
    if (value === undefined) {
      throw new SyntaxError('Invalid character ' + string[i])
    }

    // Append the bits to the buffer:
    buffer = (buffer << bitsPerChar) | value
    bits += bitsPerChar

    // Write out some bits if the buffer has a byte's worth:
    if (bits >= 8) {
      bits -= 8
      out[written++] = 0xff & (buffer >> bits)
    }
  }

  // Verify that we have received just enough bits:
  if (bits >= bitsPerChar || 0xff & (buffer << (8 - bits))) {
    throw new SyntaxError('Unexpected end of data')
  }

  return out
}

/**
 * @param {Uint8Array} data
 * @param {string} alphabet
 * @param {number} bitsPerChar
 * @returns {string}
 */
const encode = (data, alphabet, bitsPerChar) => {
  const pad = alphabet[alphabet.length - 1] === '='
  const mask = (1 << bitsPerChar) - 1
  let out = ''

  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  for (let i = 0; i < data.length; ++i) {
    // Slurp data into the buffer:
    buffer = (buffer << 8) | data[i]
    bits += 8

    // Write out as much as we can:
    while (bits > bitsPerChar) {
      bits -= bitsPerChar
      out += alphabet[mask & (buffer >> bits)]
    }
  }

  // Partial character:
  if (bits) {
    out += alphabet[mask & (buffer << (bitsPerChar - bits))]
  }

  // Add padding characters until we hit a byte boundary:
  if (pad) {
    while ((out.length * bitsPerChar) & 7) {
      out += '='
    }
  }

  return out
}

/**
 * @param {number} bitsPerChar
 * @returns {CodecFactory}
 */
module.exports = (bitsPerChar) => (alphabet) => {
  return {
    /**
     * @param {Uint8Array} input
     * @returns {string}
     */
    encode (input) {
      return encode(input, alphabet, bitsPerChar)
    },
    /**
     * @param {string} input
     * @returns {Uint8Array}
     */
    decode (input) {
      return decode(input, alphabet, bitsPerChar)
    }
  }
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\util.js", {"buffer":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\browserify\\node_modules\\buffer\\index.js","web-encoding":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\web-encoding\\src\\lib.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multihashes\node_modules\multibase\src\util.js
      return function (require, module, exports) {
// @ts-check
'use strict'

const { Buffer } = require('buffer')
const { TextEncoder, TextDecoder } = require('web-encoding')

const textDecoder = new TextDecoder()
/**
 * @param {ArrayBufferView|ArrayBuffer} bytes
 * @returns {string}
 */
const decodeText = (bytes) => textDecoder.decode(bytes)

const textEncoder = new TextEncoder()
/**
 * @param {string} text
 * @returns {Uint8Array}
 */
const encodeText = (text) => textEncoder.encode(text)

/**
 * @param {ArrayBufferView} bytes
 * @returns {Buffer}
 */
const asBuffer = ({ buffer, byteLength, byteOffset }) =>
  Buffer.from(buffer, byteOffset, byteLength)

module.exports = { decodeText, encodeText, asBuffer }

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>multibase",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\src\\constants.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multihashes\src\constants.js
      return function (require, module, exports) {
/* eslint quote-props: off */
'use strict'

const names = Object.freeze({
  'identity': 0x00,
  'sha1': 0x11,
  'sha2-256': 0x12,
  'sha2-512': 0x13,
  'sha3-512': 0x14,
  'sha3-384': 0x15,
  'sha3-256': 0x16,
  'sha3-224': 0x17,
  'shake-128': 0x18,
  'shake-256': 0x19,
  'keccak-224': 0x1a,
  'keccak-256': 0x1b,
  'keccak-384': 0x1c,
  'keccak-512': 0x1d,
  'blake3': 0x1e,
  'murmur3-128': 0x22,
  'murmur3-32': 0x23,
  'dbl-sha2-256': 0x56,
  'md4': 0xd4,
  'md5': 0xd5,
  'bmt': 0xd6,
  'sha2-256-trunc254-padded': 0x1012,
  'ripemd-128': 0x1052,
  'ripemd-160': 0x1053,
  'ripemd-256': 0x1054,
  'ripemd-320': 0x1055,
  'x11': 0x1100,
  'sm3-256': 0x534d,
  'blake2b-8': 0xb201,
  'blake2b-16': 0xb202,
  'blake2b-24': 0xb203,
  'blake2b-32': 0xb204,
  'blake2b-40': 0xb205,
  'blake2b-48': 0xb206,
  'blake2b-56': 0xb207,
  'blake2b-64': 0xb208,
  'blake2b-72': 0xb209,
  'blake2b-80': 0xb20a,
  'blake2b-88': 0xb20b,
  'blake2b-96': 0xb20c,
  'blake2b-104': 0xb20d,
  'blake2b-112': 0xb20e,
  'blake2b-120': 0xb20f,
  'blake2b-128': 0xb210,
  'blake2b-136': 0xb211,
  'blake2b-144': 0xb212,
  'blake2b-152': 0xb213,
  'blake2b-160': 0xb214,
  'blake2b-168': 0xb215,
  'blake2b-176': 0xb216,
  'blake2b-184': 0xb217,
  'blake2b-192': 0xb218,
  'blake2b-200': 0xb219,
  'blake2b-208': 0xb21a,
  'blake2b-216': 0xb21b,
  'blake2b-224': 0xb21c,
  'blake2b-232': 0xb21d,
  'blake2b-240': 0xb21e,
  'blake2b-248': 0xb21f,
  'blake2b-256': 0xb220,
  'blake2b-264': 0xb221,
  'blake2b-272': 0xb222,
  'blake2b-280': 0xb223,
  'blake2b-288': 0xb224,
  'blake2b-296': 0xb225,
  'blake2b-304': 0xb226,
  'blake2b-312': 0xb227,
  'blake2b-320': 0xb228,
  'blake2b-328': 0xb229,
  'blake2b-336': 0xb22a,
  'blake2b-344': 0xb22b,
  'blake2b-352': 0xb22c,
  'blake2b-360': 0xb22d,
  'blake2b-368': 0xb22e,
  'blake2b-376': 0xb22f,
  'blake2b-384': 0xb230,
  'blake2b-392': 0xb231,
  'blake2b-400': 0xb232,
  'blake2b-408': 0xb233,
  'blake2b-416': 0xb234,
  'blake2b-424': 0xb235,
  'blake2b-432': 0xb236,
  'blake2b-440': 0xb237,
  'blake2b-448': 0xb238,
  'blake2b-456': 0xb239,
  'blake2b-464': 0xb23a,
  'blake2b-472': 0xb23b,
  'blake2b-480': 0xb23c,
  'blake2b-488': 0xb23d,
  'blake2b-496': 0xb23e,
  'blake2b-504': 0xb23f,
  'blake2b-512': 0xb240,
  'blake2s-8': 0xb241,
  'blake2s-16': 0xb242,
  'blake2s-24': 0xb243,
  'blake2s-32': 0xb244,
  'blake2s-40': 0xb245,
  'blake2s-48': 0xb246,
  'blake2s-56': 0xb247,
  'blake2s-64': 0xb248,
  'blake2s-72': 0xb249,
  'blake2s-80': 0xb24a,
  'blake2s-88': 0xb24b,
  'blake2s-96': 0xb24c,
  'blake2s-104': 0xb24d,
  'blake2s-112': 0xb24e,
  'blake2s-120': 0xb24f,
  'blake2s-128': 0xb250,
  'blake2s-136': 0xb251,
  'blake2s-144': 0xb252,
  'blake2s-152': 0xb253,
  'blake2s-160': 0xb254,
  'blake2s-168': 0xb255,
  'blake2s-176': 0xb256,
  'blake2s-184': 0xb257,
  'blake2s-192': 0xb258,
  'blake2s-200': 0xb259,
  'blake2s-208': 0xb25a,
  'blake2s-216': 0xb25b,
  'blake2s-224': 0xb25c,
  'blake2s-232': 0xb25d,
  'blake2s-240': 0xb25e,
  'blake2s-248': 0xb25f,
  'blake2s-256': 0xb260,
  'skein256-8': 0xb301,
  'skein256-16': 0xb302,
  'skein256-24': 0xb303,
  'skein256-32': 0xb304,
  'skein256-40': 0xb305,
  'skein256-48': 0xb306,
  'skein256-56': 0xb307,
  'skein256-64': 0xb308,
  'skein256-72': 0xb309,
  'skein256-80': 0xb30a,
  'skein256-88': 0xb30b,
  'skein256-96': 0xb30c,
  'skein256-104': 0xb30d,
  'skein256-112': 0xb30e,
  'skein256-120': 0xb30f,
  'skein256-128': 0xb310,
  'skein256-136': 0xb311,
  'skein256-144': 0xb312,
  'skein256-152': 0xb313,
  'skein256-160': 0xb314,
  'skein256-168': 0xb315,
  'skein256-176': 0xb316,
  'skein256-184': 0xb317,
  'skein256-192': 0xb318,
  'skein256-200': 0xb319,
  'skein256-208': 0xb31a,
  'skein256-216': 0xb31b,
  'skein256-224': 0xb31c,
  'skein256-232': 0xb31d,
  'skein256-240': 0xb31e,
  'skein256-248': 0xb31f,
  'skein256-256': 0xb320,
  'skein512-8': 0xb321,
  'skein512-16': 0xb322,
  'skein512-24': 0xb323,
  'skein512-32': 0xb324,
  'skein512-40': 0xb325,
  'skein512-48': 0xb326,
  'skein512-56': 0xb327,
  'skein512-64': 0xb328,
  'skein512-72': 0xb329,
  'skein512-80': 0xb32a,
  'skein512-88': 0xb32b,
  'skein512-96': 0xb32c,
  'skein512-104': 0xb32d,
  'skein512-112': 0xb32e,
  'skein512-120': 0xb32f,
  'skein512-128': 0xb330,
  'skein512-136': 0xb331,
  'skein512-144': 0xb332,
  'skein512-152': 0xb333,
  'skein512-160': 0xb334,
  'skein512-168': 0xb335,
  'skein512-176': 0xb336,
  'skein512-184': 0xb337,
  'skein512-192': 0xb338,
  'skein512-200': 0xb339,
  'skein512-208': 0xb33a,
  'skein512-216': 0xb33b,
  'skein512-224': 0xb33c,
  'skein512-232': 0xb33d,
  'skein512-240': 0xb33e,
  'skein512-248': 0xb33f,
  'skein512-256': 0xb340,
  'skein512-264': 0xb341,
  'skein512-272': 0xb342,
  'skein512-280': 0xb343,
  'skein512-288': 0xb344,
  'skein512-296': 0xb345,
  'skein512-304': 0xb346,
  'skein512-312': 0xb347,
  'skein512-320': 0xb348,
  'skein512-328': 0xb349,
  'skein512-336': 0xb34a,
  'skein512-344': 0xb34b,
  'skein512-352': 0xb34c,
  'skein512-360': 0xb34d,
  'skein512-368': 0xb34e,
  'skein512-376': 0xb34f,
  'skein512-384': 0xb350,
  'skein512-392': 0xb351,
  'skein512-400': 0xb352,
  'skein512-408': 0xb353,
  'skein512-416': 0xb354,
  'skein512-424': 0xb355,
  'skein512-432': 0xb356,
  'skein512-440': 0xb357,
  'skein512-448': 0xb358,
  'skein512-456': 0xb359,
  'skein512-464': 0xb35a,
  'skein512-472': 0xb35b,
  'skein512-480': 0xb35c,
  'skein512-488': 0xb35d,
  'skein512-496': 0xb35e,
  'skein512-504': 0xb35f,
  'skein512-512': 0xb360,
  'skein1024-8': 0xb361,
  'skein1024-16': 0xb362,
  'skein1024-24': 0xb363,
  'skein1024-32': 0xb364,
  'skein1024-40': 0xb365,
  'skein1024-48': 0xb366,
  'skein1024-56': 0xb367,
  'skein1024-64': 0xb368,
  'skein1024-72': 0xb369,
  'skein1024-80': 0xb36a,
  'skein1024-88': 0xb36b,
  'skein1024-96': 0xb36c,
  'skein1024-104': 0xb36d,
  'skein1024-112': 0xb36e,
  'skein1024-120': 0xb36f,
  'skein1024-128': 0xb370,
  'skein1024-136': 0xb371,
  'skein1024-144': 0xb372,
  'skein1024-152': 0xb373,
  'skein1024-160': 0xb374,
  'skein1024-168': 0xb375,
  'skein1024-176': 0xb376,
  'skein1024-184': 0xb377,
  'skein1024-192': 0xb378,
  'skein1024-200': 0xb379,
  'skein1024-208': 0xb37a,
  'skein1024-216': 0xb37b,
  'skein1024-224': 0xb37c,
  'skein1024-232': 0xb37d,
  'skein1024-240': 0xb37e,
  'skein1024-248': 0xb37f,
  'skein1024-256': 0xb380,
  'skein1024-264': 0xb381,
  'skein1024-272': 0xb382,
  'skein1024-280': 0xb383,
  'skein1024-288': 0xb384,
  'skein1024-296': 0xb385,
  'skein1024-304': 0xb386,
  'skein1024-312': 0xb387,
  'skein1024-320': 0xb388,
  'skein1024-328': 0xb389,
  'skein1024-336': 0xb38a,
  'skein1024-344': 0xb38b,
  'skein1024-352': 0xb38c,
  'skein1024-360': 0xb38d,
  'skein1024-368': 0xb38e,
  'skein1024-376': 0xb38f,
  'skein1024-384': 0xb390,
  'skein1024-392': 0xb391,
  'skein1024-400': 0xb392,
  'skein1024-408': 0xb393,
  'skein1024-416': 0xb394,
  'skein1024-424': 0xb395,
  'skein1024-432': 0xb396,
  'skein1024-440': 0xb397,
  'skein1024-448': 0xb398,
  'skein1024-456': 0xb399,
  'skein1024-464': 0xb39a,
  'skein1024-472': 0xb39b,
  'skein1024-480': 0xb39c,
  'skein1024-488': 0xb39d,
  'skein1024-496': 0xb39e,
  'skein1024-504': 0xb39f,
  'skein1024-512': 0xb3a0,
  'skein1024-520': 0xb3a1,
  'skein1024-528': 0xb3a2,
  'skein1024-536': 0xb3a3,
  'skein1024-544': 0xb3a4,
  'skein1024-552': 0xb3a5,
  'skein1024-560': 0xb3a6,
  'skein1024-568': 0xb3a7,
  'skein1024-576': 0xb3a8,
  'skein1024-584': 0xb3a9,
  'skein1024-592': 0xb3aa,
  'skein1024-600': 0xb3ab,
  'skein1024-608': 0xb3ac,
  'skein1024-616': 0xb3ad,
  'skein1024-624': 0xb3ae,
  'skein1024-632': 0xb3af,
  'skein1024-640': 0xb3b0,
  'skein1024-648': 0xb3b1,
  'skein1024-656': 0xb3b2,
  'skein1024-664': 0xb3b3,
  'skein1024-672': 0xb3b4,
  'skein1024-680': 0xb3b5,
  'skein1024-688': 0xb3b6,
  'skein1024-696': 0xb3b7,
  'skein1024-704': 0xb3b8,
  'skein1024-712': 0xb3b9,
  'skein1024-720': 0xb3ba,
  'skein1024-728': 0xb3bb,
  'skein1024-736': 0xb3bc,
  'skein1024-744': 0xb3bd,
  'skein1024-752': 0xb3be,
  'skein1024-760': 0xb3bf,
  'skein1024-768': 0xb3c0,
  'skein1024-776': 0xb3c1,
  'skein1024-784': 0xb3c2,
  'skein1024-792': 0xb3c3,
  'skein1024-800': 0xb3c4,
  'skein1024-808': 0xb3c5,
  'skein1024-816': 0xb3c6,
  'skein1024-824': 0xb3c7,
  'skein1024-832': 0xb3c8,
  'skein1024-840': 0xb3c9,
  'skein1024-848': 0xb3ca,
  'skein1024-856': 0xb3cb,
  'skein1024-864': 0xb3cc,
  'skein1024-872': 0xb3cd,
  'skein1024-880': 0xb3ce,
  'skein1024-888': 0xb3cf,
  'skein1024-896': 0xb3d0,
  'skein1024-904': 0xb3d1,
  'skein1024-912': 0xb3d2,
  'skein1024-920': 0xb3d3,
  'skein1024-928': 0xb3d4,
  'skein1024-936': 0xb3d5,
  'skein1024-944': 0xb3d6,
  'skein1024-952': 0xb3d7,
  'skein1024-960': 0xb3d8,
  'skein1024-968': 0xb3d9,
  'skein1024-976': 0xb3da,
  'skein1024-984': 0xb3db,
  'skein1024-992': 0xb3dc,
  'skein1024-1000': 0xb3dd,
  'skein1024-1008': 0xb3de,
  'skein1024-1016': 0xb3df,
  'skein1024-1024': 0xb3e0,
  'poseidon-bls12_381-a2-fc1': 0xb401,
  'poseidon-bls12_381-a2-fc1-sc': 0xb402
})

module.exports = { names }

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\src\\index.js", {"./constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\src\\constants.js","buffer":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\browserify\\node_modules\\buffer\\index.js","multibase":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multihashes\\node_modules\\multibase\\src\\index.js","varint":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\varint\\index.js","web-encoding":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\web-encoding\\src\\lib.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\multihashes\src\index.js
      return function (require, module, exports) {
// @ts-check
/* eslint-disable guard-for-in */
/**
 * Multihash implementation in JavaScript.
 *
 * @module multihash
 */
'use strict'

const { Buffer } = require('buffer')
const multibase = require('multibase')
const varint = require('varint')
const { names } = require('./constants')
const { TextDecoder } = require('web-encoding')

const textDecoder = new TextDecoder()
const codes = {}

for (const key in names) {
  codes[names[key]] = key
}
exports.names = names
exports.codes = Object.freeze(codes)

/**
 * Convert the given multihash to a hex encoded string.
 *
 * @param {Uint8Array} hash
 * @returns {string}
 */
exports.toHexString = function toHexString (hash) {
  if (!(hash instanceof Uint8Array)) {
    throw new Error('must be passed a Uint8Array')
  }

  const buffer = Buffer.isBuffer(hash)
    ? hash
    : Buffer.from(hash.buffer, hash.byteOffset, hash.byteLength)

  return buffer.toString('hex')
}

/**
 * Convert the given hex encoded string to a multihash.
 *
 * @param {string} hash
 * @returns {Buffer}
 */
exports.fromHexString = function fromHexString (hash) {
  return Buffer.from(hash, 'hex')
}

/**
 * Convert the given multihash to a base58 encoded string.
 *
 * @param {Uint8Array} hash
 * @returns {string}
 */
exports.toB58String = function toB58String (hash) {
  if (!(hash instanceof Uint8Array)) {
    throw new Error('must be passed a Uint8Array')
  }

  return textDecoder.decode(multibase.encode('base58btc', hash)).slice(1)
}

/**
 * Convert the given base58 encoded string to a multihash.
 *
 * @param {string|Uint8Array} hash
 * @returns {Buffer}
 */
exports.fromB58String = function fromB58String (hash) {
  const encoded = hash instanceof Uint8Array
    ? textDecoder.decode(hash)
    : hash

  return multibase.decode('z' + encoded)
}

/**
 * Decode a hash from the given multihash.
 *
 * @param {Uint8Array} bytes
 * @returns {{code: number, name: string, length: number, digest: Buffer}} result
 */
exports.decode = function decode (bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new Error('multihash must be a Uint8Array')
  }
  let buf = Buffer.isBuffer(bytes)
    ? bytes
    : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength)

  if (buf.length < 2) {
    throw new Error('multihash too short. must be > 2 bytes.')
  }

  const code = varint.decode(buf)
  if (!exports.isValidCode(code)) {
    throw new Error(`multihash unknown function code: 0x${code.toString(16)}`)
  }
  buf = buf.slice(varint.decode.bytes)

  const len = varint.decode(buf)
  if (len < 0) {
    throw new Error(`multihash invalid length: ${len}`)
  }
  buf = buf.slice(varint.decode.bytes)

  if (buf.length !== len) {
    throw new Error(`multihash length inconsistent: 0x${buf.toString('hex')}`)
  }

  return {
    code,
    name: codes[code],
    length: len,
    digest: buf
  }
}

/**
 *  Encode a hash digest along with the specified function code.
 *
 * > **Note:** the length is derived from the length of the digest itself.
 *
 * @param {Uint8Array} digest
 * @param {string|number} code
 * @param {number} [length]
 * @returns {Buffer}
 */
exports.encode = function encode (digest, code, length) {
  if (!digest || code === undefined) {
    throw new Error('multihash encode requires at least two args: digest, code')
  }

  // ensure it's a hashfunction code.
  const hashfn = exports.coerceCode(code)

  if (!(digest instanceof Uint8Array)) {
    throw new Error('digest should be a Uint8Array')
  }

  if (length == null) {
    length = digest.length
  }

  if (length && digest.length !== length) {
    throw new Error('digest length should be equal to specified length.')
  }

  const hash = varint.encode(hashfn)
  const len = varint.encode(length)
  const buffer = Buffer.alloc(hash.length + len.length + digest.length)
  buffer.set(hash, 0)
  buffer.set(len, hash.length)
  buffer.set(digest, hash.length + len.length)
  return buffer
}

/**
 * Converts a hash function name into the matching code.
 * If passed a number it will return the number if it's a valid code.
 * @param {string|number} name
 * @returns {number}
 */
exports.coerceCode = function coerceCode (name) {
  let code = name

  if (typeof name === 'string') {
    if (names[name] === undefined) {
      throw new Error(`Unrecognized hash function named: ${name}`)
    }
    code = names[name]
  }

  if (typeof code !== 'number') {
    throw new Error(`Hash function code should be a number. Got: ${code}`)
  }

  if (codes[code] === undefined && !exports.isAppCode(code)) {
    throw new Error(`Unrecognized function code: ${code}`)
  }

  return code
}

/**
 * Checks wether a code is part of the app range
 *
 * @param {number} code
 * @returns {boolean}
 */
exports.isAppCode = function appCode (code) {
  return code > 0 && code < 0x10
}

/**
 * Checks whether a multihash code is valid.
 *
 * @param {number} code
 * @returns {boolean}
 */
exports.isValidCode = function validCode (code) {
  if (exports.isAppCode(code)) {
    return true
  }

  if (codes[code]) {
    return true
  }

  return false
}

/**
 * Check if the given buffer is a valid multihash. Throws an error if it is not valid.
 *
 * @param {Uint8Array} multihash
 * @returns {void}
 * @throws {Error}
 */
function validate (multihash) {
  exports.decode(multihash) // throws if bad.
}
exports.validate = validate

/**
 * Returns a prefix from a valid multihash. Throws an error if it is not valid.
 *
 * @param {Uint8Array} multihash
 * @returns {Buffer}
 * @throws {Error}
 */
exports.prefix = function prefix (multihash) {
  validate(multihash)

  return Buffer.from(multihash.buffer, multihash.byteOffset, 2)
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\nanoid\\index.browser.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\nanoid\index.browser.js
      return function (require, module, exports) {
// This file replaces `index.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.

if ("development" !== 'production') {
  // All bundlers will remove this block in production bundle
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
      'If you don’t need unpredictable IDs, you can use `nanoid/non-secure`. ' +
      'For secure ID install `expo-random` locally and use `nanoid/async`.'
    )
  }
  if (typeof self === 'undefined' || (!self.crypto && !self.msCrypto)) {
    throw new Error(
      'Your browser does not have secure random generator. ' +
      'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}

var crypto = self.crypto || self.msCrypto

// This alphabet uses a-z A-Z 0-9 _- symbols.
// Symbols are generated for smaller size.
// -_zyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA
var url = '-_'
// Loop from 36 to 0 (from z to a and 9 to 0 in Base36).
var i = 36
while (i--) {
  // 36 is radix. Number.prototype.toString(36) returns number
  // in Base36 representation. Base36 is like hex, but it uses 0–9 and a-z.
  url += i.toString(36)
}
// Loop from 36 to 10 (from Z to A in Base36).
i = 36
while (i-- - 10) {
  url += i.toString(36).toUpperCase()
}

module.exports = function (size) {
  var id = ''
  var bytes = crypto.getRandomValues(new Uint8Array(size || 21))
  i = size || 21

  // Compact alternative for `for (var i = 0; i < size; i++)`
  while (i--) {
    // We can’t use bytes bigger than the alphabet. 63 is 00111111 bitmask.
    // This mask reduces random byte 0-255 to 0-63 values.
    // There is no need in `|| ''` and `* 1.6` hacks in here,
    // because bitmask trim bytes exact to alphabet size.
    id += url[bytes[i] & 63]
  }
  return id
}

      };
    };
  }
}, {package:"nanoid",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\nonce-tracker\\index.js", {"assert":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\assert\\assert.js","await-semaphore":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\await-semaphore\\index.js","ethjs-query":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\ethjs-query\\lib\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\nonce-tracker\index.js
      return function (require, module, exports) {
const EthQuery = require('ethjs-query')
const assert = require('assert')
const Mutex = require('await-semaphore').Mutex
/**
  @param opts {Object}
    @param {Object} opts.provider a ethereum provider
    @param {Function} opts.getPendingTransactions a function that returns an array of txMeta
    whosee status is `submitted`
    @param {Function} opts.getConfirmedTransactions a function that returns an array of txMeta
    whose status is `confirmed`
  @class
*/
class NonceTracker {

  constructor ({ provider, blockTracker, getPendingTransactions, getConfirmedTransactions }) {
    this.provider = provider
    this.blockTracker = blockTracker
    this.ethQuery = new EthQuery(provider)
    this.getPendingTransactions = getPendingTransactions
    this.getConfirmedTransactions = getConfirmedTransactions
    this.lockMap = {}
  }

  /**
    @returns {Promise<Object>} with the key releaseLock (the gloabl mutex)
  */
  async getGlobalLock () {
    const globalMutex = this._lookupMutex('global')
    // await global mutex free
    const releaseLock = await globalMutex.acquire()
    return { releaseLock }
  }

  /**
   * @typedef NonceDetails
   * @property {number} highestLocallyConfirmed - A hex string of the highest nonce on a confirmed transaction.
   * @property {number} nextNetworkNonce - The next nonce suggested by the eth_getTransactionCount method.
   * @property {number} highestSuggested - The maximum between the other two, the number returned.
   */

  /**
  this will return an object with the `nextNonce` `nonceDetails`, and the releaseLock
  Note: releaseLock must be called after adding a signed tx to pending transactions (or discarding).

  @param address {string} the hex string for the address whose nonce we are calculating
  @returns {Promise<NonceDetails>}
  */
  async getNonceLock (address) {
    // await global mutex free
    await this._globalMutexFree()
    // await lock free, then take lock
    const releaseLock = await this._takeMutex(address)
    try {
      // evaluate multiple nextNonce strategies
      const nonceDetails = {}
      const networkNonceResult = await this._getNetworkNextNonce(address)
      const highestLocallyConfirmed = this._getHighestLocallyConfirmed(address)
      const nextNetworkNonce = networkNonceResult.nonce
      const highestSuggested = Math.max(nextNetworkNonce, highestLocallyConfirmed)

      const pendingTxs = this.getPendingTransactions(address)
      const localNonceResult = this._getHighestContinuousFrom(pendingTxs, highestSuggested) || 0

      nonceDetails.params = {
        highestLocallyConfirmed,
        highestSuggested,
        nextNetworkNonce,
      }
      nonceDetails.local = localNonceResult
      nonceDetails.network = networkNonceResult

      const nextNonce = Math.max(networkNonceResult.nonce, localNonceResult.nonce)
      assert(Number.isInteger(nextNonce), `nonce-tracker - nextNonce is not an integer - got: (${typeof nextNonce}) "${nextNonce}"`)

      // return nonce and release cb
      return { nextNonce, nonceDetails, releaseLock }
    } catch (err) {
      // release lock if we encounter an error
      releaseLock()
      throw err
    }
  }

  async _globalMutexFree () {
    const globalMutex = this._lookupMutex('global')
    const releaseLock = await globalMutex.acquire()
    releaseLock()
  }

  async _takeMutex (lockId) {
    const mutex = this._lookupMutex(lockId)
    const releaseLock = await mutex.acquire()
    return releaseLock
  }

  _lookupMutex (lockId) {
    let mutex = this.lockMap[lockId]
    if (!mutex) {
      mutex = new Mutex()
      this.lockMap[lockId] = mutex
    }
    return mutex
  }

  async _getNetworkNextNonce (address) {
    // calculate next nonce
    // we need to make sure our base count
    // and pending count are from the same block
    const blockNumber = await this.blockTracker.getLatestBlock()
    const baseCountBN = await this.ethQuery.getTransactionCount(address, blockNumber)
    const baseCount = baseCountBN.toNumber()
    assert(Number.isInteger(baseCount), `nonce-tracker - baseCount is not an integer - got: (${typeof baseCount}) "${baseCount}"`)
    const nonceDetails = { blockNumber, baseCount }
    return { name: 'network', nonce: baseCount, details: nonceDetails }
  }

  _getHighestLocallyConfirmed (address) {
    const confirmedTransactions = this.getConfirmedTransactions(address)
    const highest = this._getHighestNonce(confirmedTransactions)
    return Number.isInteger(highest) ? highest + 1 : 0
  }

  _getHighestNonce (txList) {
    const nonces = txList.map((txMeta) => {
      const nonce = txMeta.txParams.nonce
      assert(typeof nonce, 'string', 'nonces should be hex strings')
      return parseInt(nonce, 16)
    })
    const highestNonce = Math.max.apply(null, nonces)
    return highestNonce
  }

  /**
    @typedef {object} highestContinuousFrom
    @property {string} - name the name for how the nonce was calculated based on the data used
    @property {number} - nonce the next suggested nonce
    @property {object} - details the provided starting nonce that was used (for debugging)
  */
  /**
    @param txList {array} - list of txMeta's
    @param startPoint {number} - the highest known locally confirmed nonce
    @returns {highestContinuousFrom}
  */
  _getHighestContinuousFrom (txList, startPoint) {
    const nonces = txList.map((txMeta) => {
      const nonce = txMeta.txParams.nonce
      assert(typeof nonce, 'string', 'nonces should be hex strings')
      return parseInt(nonce, 16)
    })

    let highest = startPoint
    while (nonces.includes(highest)) {
      highest++
    }

    return { name: 'local', nonce: highest, details: { startPoint, highest } }
  }

}

module.exports = NonceTracker

      };
    };
  }
}, {package:"nonce-tracker",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\remove-trailing-slash\\index.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\remove-trailing-slash\index.js
      return function (require, module, exports) {

/**
 * Remove trailing slashes from the given `str`
 *
 * @api public
 * @param {String} str
 * @return {String}
 */
exports = module.exports = function (str) {
  return String(str).replace(exports.expr, '');
};

/**
 * Expose the regex
 *
 * @api private
 * @type {RegExp}
 */
exports.expr = /\/+$/;

      };
    };
  }
}, {package:"remove-trailing-slash",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\scryptsy\\lib\\scrypt.js", {"buffer":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\browserify\\node_modules\\buffer\\index.js","pbkdf2":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\pbkdf2\\browser.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\scryptsy\lib\scrypt.js
      return function (require, module, exports) {
(function (Buffer){(function (){
var pbkdf2Sync = require('pbkdf2').pbkdf2Sync

var MAX_VALUE = 0x7fffffff

// N = Cpu cost, r = Memory cost, p = parallelization cost
function scrypt (key, salt, N, r, p, dkLen, progressCallback) {
  if (N === 0 || (N & (N - 1)) !== 0) throw Error('N must be > 0 and a power of 2')

  if (N > MAX_VALUE / 128 / r) throw Error('Parameter N is too large')
  if (r > MAX_VALUE / 128 / p) throw Error('Parameter r is too large')

  var XY = new Buffer(256 * r)
  var V = new Buffer(128 * r * N)

  // pseudo global
  var B32 = new Int32Array(16) // salsa20_8
  var x = new Int32Array(16) // salsa20_8
  var _X = new Buffer(64) // blockmix_salsa8

  // pseudo global
  var B = pbkdf2Sync(key, salt, 1, p * 128 * r, 'sha256')

  var tickCallback
  if (progressCallback) {
    var totalOps = p * N * 2
    var currentOp = 0

    tickCallback = function () {
      ++currentOp

      // send progress notifications once every 1,000 ops
      if (currentOp % 1000 === 0) {
        progressCallback({
          current: currentOp,
          total: totalOps,
          percent: (currentOp / totalOps) * 100.0
        })
      }
    }
  }

  for (var i = 0; i < p; i++) {
    smix(B, i * 128 * r, r, N, V, XY)
  }

  return pbkdf2Sync(key, B, 1, dkLen, 'sha256')

  // all of these functions are actually moved to the top
  // due to function hoisting

  function smix (B, Bi, r, N, V, XY) {
    var Xi = 0
    var Yi = 128 * r
    var i

    B.copy(XY, Xi, Bi, Bi + Yi)

    for (i = 0; i < N; i++) {
      XY.copy(V, i * Yi, Xi, Xi + Yi)
      blockmix_salsa8(XY, Xi, Yi, r)

      if (tickCallback) tickCallback()
    }

    for (i = 0; i < N; i++) {
      var offset = Xi + (2 * r - 1) * 64
      var j = XY.readUInt32LE(offset) & (N - 1)
      blockxor(V, j * Yi, XY, Xi, Yi)
      blockmix_salsa8(XY, Xi, Yi, r)

      if (tickCallback) tickCallback()
    }

    XY.copy(B, Bi, Xi, Xi + Yi)
  }

  function blockmix_salsa8 (BY, Bi, Yi, r) {
    var i

    arraycopy(BY, Bi + (2 * r - 1) * 64, _X, 0, 64)

    for (i = 0; i < 2 * r; i++) {
      blockxor(BY, i * 64, _X, 0, 64)
      salsa20_8(_X)
      arraycopy(_X, 0, BY, Yi + (i * 64), 64)
    }

    for (i = 0; i < r; i++) {
      arraycopy(BY, Yi + (i * 2) * 64, BY, Bi + (i * 64), 64)
    }

    for (i = 0; i < r; i++) {
      arraycopy(BY, Yi + (i * 2 + 1) * 64, BY, Bi + (i + r) * 64, 64)
    }
  }

  function R (a, b) {
    return (a << b) | (a >>> (32 - b))
  }

  function salsa20_8 (B) {
    var i

    for (i = 0; i < 16; i++) {
      B32[i] = (B[i * 4 + 0] & 0xff) << 0
      B32[i] |= (B[i * 4 + 1] & 0xff) << 8
      B32[i] |= (B[i * 4 + 2] & 0xff) << 16
      B32[i] |= (B[i * 4 + 3] & 0xff) << 24
      // B32[i] = B.readUInt32LE(i*4)   <--- this is signficantly slower even in Node.js
    }

    arraycopy(B32, 0, x, 0, 16)

    for (i = 8; i > 0; i -= 2) {
      x[ 4] ^= R(x[ 0] + x[12], 7)
      x[ 8] ^= R(x[ 4] + x[ 0], 9)
      x[12] ^= R(x[ 8] + x[ 4], 13)
      x[ 0] ^= R(x[12] + x[ 8], 18)
      x[ 9] ^= R(x[ 5] + x[ 1], 7)
      x[13] ^= R(x[ 9] + x[ 5], 9)
      x[ 1] ^= R(x[13] + x[ 9], 13)
      x[ 5] ^= R(x[ 1] + x[13], 18)
      x[14] ^= R(x[10] + x[ 6], 7)
      x[ 2] ^= R(x[14] + x[10], 9)
      x[ 6] ^= R(x[ 2] + x[14], 13)
      x[10] ^= R(x[ 6] + x[ 2], 18)
      x[ 3] ^= R(x[15] + x[11], 7)
      x[ 7] ^= R(x[ 3] + x[15], 9)
      x[11] ^= R(x[ 7] + x[ 3], 13)
      x[15] ^= R(x[11] + x[ 7], 18)
      x[ 1] ^= R(x[ 0] + x[ 3], 7)
      x[ 2] ^= R(x[ 1] + x[ 0], 9)
      x[ 3] ^= R(x[ 2] + x[ 1], 13)
      x[ 0] ^= R(x[ 3] + x[ 2], 18)
      x[ 6] ^= R(x[ 5] + x[ 4], 7)
      x[ 7] ^= R(x[ 6] + x[ 5], 9)
      x[ 4] ^= R(x[ 7] + x[ 6], 13)
      x[ 5] ^= R(x[ 4] + x[ 7], 18)
      x[11] ^= R(x[10] + x[ 9], 7)
      x[ 8] ^= R(x[11] + x[10], 9)
      x[ 9] ^= R(x[ 8] + x[11], 13)
      x[10] ^= R(x[ 9] + x[ 8], 18)
      x[12] ^= R(x[15] + x[14], 7)
      x[13] ^= R(x[12] + x[15], 9)
      x[14] ^= R(x[13] + x[12], 13)
      x[15] ^= R(x[14] + x[13], 18)
    }

    for (i = 0; i < 16; ++i) B32[i] = x[i] + B32[i]

    for (i = 0; i < 16; i++) {
      var bi = i * 4
      B[bi + 0] = (B32[i] >> 0 & 0xff)
      B[bi + 1] = (B32[i] >> 8 & 0xff)
      B[bi + 2] = (B32[i] >> 16 & 0xff)
      B[bi + 3] = (B32[i] >> 24 & 0xff)
      // B.writeInt32LE(B32[i], i*4)  //<--- this is signficantly slower even in Node.js
    }
  }

  // naive approach... going back to loop unrolling may yield additional performance
  function blockxor (S, Si, D, Di, len) {
    for (var i = 0; i < len; i++) {
      D[Di + i] ^= S[Si + i]
    }
  }
}

function arraycopy (src, srcPos, dest, destPos, length) {
  if (Buffer.isBuffer(src) && Buffer.isBuffer(dest)) {
    src.copy(dest, destPos, srcPos, srcPos + length)
  } else {
    while (length--) {
      dest[destPos++] = src[srcPos++]
    }
  }
}

module.exports = scrypt

}).call(this)}).call(this,require("buffer").Buffer)

      };
    };
  }
}, {package:"ethereumjs-wallet>scryptsy",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\secp256k1\\elliptic.js", {"./lib":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\secp256k1\\lib\\index.js","./lib/elliptic":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\secp256k1\\lib\\elliptic.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\secp256k1\elliptic.js
      return function (require, module, exports) {
module.exports = require('./lib')(require('./lib/elliptic'))

      };
    };
  }
}, {package:"ganache>secp256k1",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\secp256k1\\lib\\elliptic.js", {"elliptic":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\elliptic\\lib\\elliptic.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\secp256k1\lib\elliptic.js
      return function (require, module, exports) {
const EC = require('elliptic').ec

const ec = new EC('secp256k1')
const ecparams = ec.curve

// Hack, we can not use bn.js@5, while elliptic uses bn.js@4
// See https://github.com/indutny/elliptic/issues/191#issuecomment-569888758
const BN = ecparams.n.constructor

function loadCompressedPublicKey (first, xbuf) {
  let x = new BN(xbuf)

  // overflow
  if (x.cmp(ecparams.p) >= 0) return null
  x = x.toRed(ecparams.red)

  // compute corresponding Y
  let y = x.redSqr().redIMul(x).redIAdd(ecparams.b).redSqrt()
  if ((first === 0x03) !== y.isOdd()) y = y.redNeg()

  return ec.keyPair({ pub: { x: x, y: y } })
}

function loadUncompressedPublicKey (first, xbuf, ybuf) {
  let x = new BN(xbuf)
  let y = new BN(ybuf)

  // overflow
  if (x.cmp(ecparams.p) >= 0 || y.cmp(ecparams.p) >= 0) return null

  x = x.toRed(ecparams.red)
  y = y.toRed(ecparams.red)

  // is odd flag
  if ((first === 0x06 || first === 0x07) && y.isOdd() !== (first === 0x07)) return null

  // x*x*x + b = y*y
  const x3 = x.redSqr().redIMul(x)
  if (!y.redSqr().redISub(x3.redIAdd(ecparams.b)).isZero()) return null

  return ec.keyPair({ pub: { x: x, y: y } })
}

function loadPublicKey (pubkey) {
  // length should be validated in interface
  const first = pubkey[0]
  switch (first) {
    case 0x02:
    case 0x03:
      if (pubkey.length !== 33) return null
      return loadCompressedPublicKey(first, pubkey.subarray(1, 33))
    case 0x04:
    case 0x06:
    case 0x07:
      if (pubkey.length !== 65) return null
      return loadUncompressedPublicKey(first, pubkey.subarray(1, 33), pubkey.subarray(33, 65))
    default:
      return null
  }
}

function savePublicKey (output, point) {
  const pubkey = point.encode(null, output.length === 33)
  // Loop should be faster because we do not need create extra Uint8Array
  // output.set(new Uint8Array(pubkey))
  for (let i = 0; i < output.length; ++i) output[i] = pubkey[i]
}

module.exports = {
  contextRandomize () {
    return 0
  },

  privateKeyVerify (seckey) {
    const bn = new BN(seckey)
    return bn.cmp(ecparams.n) < 0 && !bn.isZero() ? 0 : 1
  },

  privateKeyNegate (seckey) {
    const bn = new BN(seckey)
    const negate = ecparams.n.sub(bn).umod(ecparams.n).toArrayLike(Uint8Array, 'be', 32)
    seckey.set(negate)
    return 0
  },

  privateKeyTweakAdd (seckey, tweak) {
    const bn = new BN(tweak)
    if (bn.cmp(ecparams.n) >= 0) return 1

    bn.iadd(new BN(seckey))
    if (bn.cmp(ecparams.n) >= 0) bn.isub(ecparams.n)
    if (bn.isZero()) return 1

    const tweaked = bn.toArrayLike(Uint8Array, 'be', 32)
    seckey.set(tweaked)

    return 0
  },

  privateKeyTweakMul (seckey, tweak) {
    let bn = new BN(tweak)
    if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1

    bn.imul(new BN(seckey))
    if (bn.cmp(ecparams.n) >= 0) bn = bn.umod(ecparams.n)

    const tweaked = bn.toArrayLike(Uint8Array, 'be', 32)
    seckey.set(tweaked)

    return 0
  },

  publicKeyVerify (pubkey) {
    const pair = loadPublicKey(pubkey)
    return pair === null ? 1 : 0
  },

  publicKeyCreate (output, seckey) {
    const bn = new BN(seckey)
    if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1

    const point = ec.keyFromPrivate(seckey).getPublic()
    savePublicKey(output, point)

    return 0
  },

  publicKeyConvert (output, pubkey) {
    const pair = loadPublicKey(pubkey)
    if (pair === null) return 1

    const point = pair.getPublic()
    savePublicKey(output, point)

    return 0
  },

  publicKeyNegate (output, pubkey) {
    const pair = loadPublicKey(pubkey)
    if (pair === null) return 1

    const point = pair.getPublic()
    point.y = point.y.redNeg()
    savePublicKey(output, point)

    return 0
  },

  publicKeyCombine (output, pubkeys) {
    const pairs = new Array(pubkeys.length)
    for (let i = 0; i < pubkeys.length; ++i) {
      pairs[i] = loadPublicKey(pubkeys[i])
      if (pairs[i] === null) return 1
    }

    let point = pairs[0].getPublic()
    for (let i = 1; i < pairs.length; ++i) point = point.add(pairs[i].pub)
    if (point.isInfinity()) return 2

    savePublicKey(output, point)

    return 0
  },

  publicKeyTweakAdd (output, pubkey, tweak) {
    const pair = loadPublicKey(pubkey)
    if (pair === null) return 1

    tweak = new BN(tweak)
    if (tweak.cmp(ecparams.n) >= 0) return 2

    const point = pair.getPublic().add(ecparams.g.mul(tweak))
    if (point.isInfinity()) return 2

    savePublicKey(output, point)

    return 0
  },

  publicKeyTweakMul (output, pubkey, tweak) {
    const pair = loadPublicKey(pubkey)
    if (pair === null) return 1

    tweak = new BN(tweak)
    if (tweak.cmp(ecparams.n) >= 0 || tweak.isZero()) return 2

    const point = pair.getPublic().mul(tweak)
    savePublicKey(output, point)

    return 0
  },

  signatureNormalize (sig) {
    const r = new BN(sig.subarray(0, 32))
    const s = new BN(sig.subarray(32, 64))
    if (r.cmp(ecparams.n) >= 0 || s.cmp(ecparams.n) >= 0) return 1

    if (s.cmp(ec.nh) === 1) {
      sig.set(ecparams.n.sub(s).toArrayLike(Uint8Array, 'be', 32), 32)
    }

    return 0
  },

  // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
  // Adapted for Uint8Array instead Buffer
  signatureExport (obj, sig) {
    const sigR = sig.subarray(0, 32)
    const sigS = sig.subarray(32, 64)
    if (new BN(sigR).cmp(ecparams.n) >= 0) return 1
    if (new BN(sigS).cmp(ecparams.n) >= 0) return 1

    const { output } = obj

    // Prepare R
    let r = output.subarray(4, 4 + 33)
    r[0] = 0x00
    r.set(sigR, 1)

    let lenR = 33
    let posR = 0
    for (; lenR > 1 && r[posR] === 0x00 && !(r[posR + 1] & 0x80); --lenR, ++posR);

    r = r.subarray(posR)
    if (r[0] & 0x80) return 1
    if (lenR > 1 && (r[0] === 0x00) && !(r[1] & 0x80)) return 1

    // Prepare S
    let s = output.subarray(6 + 33, 6 + 33 + 33)
    s[0] = 0x00
    s.set(sigS, 1)

    let lenS = 33
    let posS = 0
    for (; lenS > 1 && s[posS] === 0x00 && !(s[posS + 1] & 0x80); --lenS, ++posS);

    s = s.subarray(posS)
    if (s[0] & 0x80) return 1
    if (lenS > 1 && (s[0] === 0x00) && !(s[1] & 0x80)) return 1

    // Set output length for return
    obj.outputlen = 6 + lenR + lenS

    // Output in specified format
    // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
    output[0] = 0x30
    output[1] = obj.outputlen - 2
    output[2] = 0x02
    output[3] = r.length
    output.set(r, 4)
    output[4 + lenR] = 0x02
    output[5 + lenR] = s.length
    output.set(s, 6 + lenR)

    return 0
  },

  // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
  // Adapted for Uint8Array instead Buffer
  signatureImport (output, sig) {
    if (sig.length < 8) return 1
    if (sig.length > 72) return 1
    if (sig[0] !== 0x30) return 1
    if (sig[1] !== sig.length - 2) return 1
    if (sig[2] !== 0x02) return 1

    const lenR = sig[3]
    if (lenR === 0) return 1
    if (5 + lenR >= sig.length) return 1
    if (sig[4 + lenR] !== 0x02) return 1

    const lenS = sig[5 + lenR]
    if (lenS === 0) return 1
    if ((6 + lenR + lenS) !== sig.length) return 1

    if (sig[4] & 0x80) return 1
    if (lenR > 1 && (sig[4] === 0x00) && !(sig[5] & 0x80)) return 1

    if (sig[lenR + 6] & 0x80) return 1
    if (lenS > 1 && (sig[lenR + 6] === 0x00) && !(sig[lenR + 7] & 0x80)) return 1

    let sigR = sig.subarray(4, 4 + lenR)
    if (sigR.length === 33 && sigR[0] === 0x00) sigR = sigR.subarray(1)
    if (sigR.length > 32) return 1

    let sigS = sig.subarray(6 + lenR)
    if (sigS.length === 33 && sigS[0] === 0x00) sigS = sigS.slice(1)
    if (sigS.length > 32) throw new Error('S length is too long')

    let r = new BN(sigR)
    if (r.cmp(ecparams.n) >= 0) r = new BN(0)

    let s = new BN(sig.subarray(6 + lenR))
    if (s.cmp(ecparams.n) >= 0) s = new BN(0)

    output.set(r.toArrayLike(Uint8Array, 'be', 32), 0)
    output.set(s.toArrayLike(Uint8Array, 'be', 32), 32)

    return 0
  },

  ecdsaSign (obj, message, seckey, data, noncefn) {
    if (noncefn) {
      const _noncefn = noncefn
      noncefn = (counter) => {
        const nonce = _noncefn(message, seckey, null, data, counter)

        const isValid = nonce instanceof Uint8Array && nonce.length === 32
        if (!isValid) throw new Error('This is the way')

        return new BN(nonce)
      }
    }

    const d = new BN(seckey)
    if (d.cmp(ecparams.n) >= 0 || d.isZero()) return 1

    let sig
    try {
      sig = ec.sign(message, seckey, { canonical: true, k: noncefn, pers: data })
    } catch (err) {
      return 1
    }

    obj.signature.set(sig.r.toArrayLike(Uint8Array, 'be', 32), 0)
    obj.signature.set(sig.s.toArrayLike(Uint8Array, 'be', 32), 32)
    obj.recid = sig.recoveryParam

    return 0
  },

  ecdsaVerify (sig, msg32, pubkey) {
    const sigObj = { r: sig.subarray(0, 32), s: sig.subarray(32, 64) }

    const sigr = new BN(sigObj.r)
    const sigs = new BN(sigObj.s)
    if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1
    if (sigs.cmp(ec.nh) === 1 || sigr.isZero() || sigs.isZero()) return 3

    const pair = loadPublicKey(pubkey)
    if (pair === null) return 2

    const point = pair.getPublic()
    const isValid = ec.verify(msg32, sigObj, point)
    return isValid ? 0 : 3
  },

  ecdsaRecover (output, sig, recid, msg32) {
    const sigObj = { r: sig.slice(0, 32), s: sig.slice(32, 64) }

    const sigr = new BN(sigObj.r)
    const sigs = new BN(sigObj.s)
    if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1

    if (sigr.isZero() || sigs.isZero()) return 2

    // Can throw `throw new Error('Unable to find sencond key candinate');`
    let point
    try {
      point = ec.recoverPubKey(msg32, sigObj, recid)
    } catch (err) {
      return 2
    }

    savePublicKey(output, point)

    return 0
  },

  ecdh (output, pubkey, seckey, data, hashfn, xbuf, ybuf) {
    const pair = loadPublicKey(pubkey)
    if (pair === null) return 1

    const scalar = new BN(seckey)
    if (scalar.cmp(ecparams.n) >= 0 || scalar.isZero()) return 2

    const point = pair.getPublic().mul(scalar)

    if (hashfn === undefined) {
      const data = point.encode(null, true)
      const sha256 = ec.hash().update(data).digest()
      for (let i = 0; i < 32; ++i) output[i] = sha256[i]
    } else {
      if (!xbuf) xbuf = new Uint8Array(32)
      const x = point.getX().toArray('be', 32)
      for (let i = 0; i < 32; ++i) xbuf[i] = x[i]

      if (!ybuf) ybuf = new Uint8Array(32)
      const y = point.getY().toArray('be', 32)
      for (let i = 0; i < 32; ++i) ybuf[i] = y[i]

      const hash = hashfn(xbuf, ybuf, data)

      const isValid = hash instanceof Uint8Array && hash.length === output.length
      if (!isValid) return 2

      output.set(hash)
    }

    return 0
  }
}

      };
    };
  }
}, {package:"ganache>secp256k1",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\secp256k1\\lib\\index.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\secp256k1\lib\index.js
      return function (require, module, exports) {
const errors = {
  IMPOSSIBLE_CASE: 'Impossible case. Please create issue.',
  TWEAK_ADD:
    'The tweak was out of range or the resulted private key is invalid',
  TWEAK_MUL: 'The tweak was out of range or equal to zero',
  CONTEXT_RANDOMIZE_UNKNOW: 'Unknow error on context randomization',
  SECKEY_INVALID: 'Private Key is invalid',
  PUBKEY_PARSE: 'Public Key could not be parsed',
  PUBKEY_SERIALIZE: 'Public Key serialization error',
  PUBKEY_COMBINE: 'The sum of the public keys is not valid',
  SIG_PARSE: 'Signature could not be parsed',
  SIGN: 'The nonce generation function failed, or the private key was invalid',
  RECOVER: 'Public key could not be recover',
  ECDH: 'Scalar was invalid (zero or overflow)'
}

function assert (cond, msg) {
  if (!cond) throw new Error(msg)
}

function isUint8Array (name, value, length) {
  assert(value instanceof Uint8Array, `Expected ${name} to be an Uint8Array`)

  if (length !== undefined) {
    if (Array.isArray(length)) {
      const numbers = length.join(', ')
      const msg = `Expected ${name} to be an Uint8Array with length [${numbers}]`
      assert(length.includes(value.length), msg)
    } else {
      const msg = `Expected ${name} to be an Uint8Array with length ${length}`
      assert(value.length === length, msg)
    }
  }
}

function isCompressed (value) {
  assert(toTypeString(value) === 'Boolean', 'Expected compressed to be a Boolean')
}

function getAssertedOutput (output = (len) => new Uint8Array(len), length) {
  if (typeof output === 'function') output = output(length)
  isUint8Array('output', output, length)
  return output
}

function toTypeString (value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

module.exports = (secp256k1) => {
  return {
    contextRandomize (seed) {
      assert(
        seed === null || seed instanceof Uint8Array,
        'Expected seed to be an Uint8Array or null'
      )
      if (seed !== null) isUint8Array('seed', seed, 32)

      switch (secp256k1.contextRandomize(seed)) {
        case 1:
          throw new Error(errors.CONTEXT_RANDOMIZE_UNKNOW)
      }
    },

    privateKeyVerify (seckey) {
      isUint8Array('private key', seckey, 32)

      return secp256k1.privateKeyVerify(seckey) === 0
    },

    privateKeyNegate (seckey) {
      isUint8Array('private key', seckey, 32)

      switch (secp256k1.privateKeyNegate(seckey)) {
        case 0:
          return seckey
        case 1:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    privateKeyTweakAdd (seckey, tweak) {
      isUint8Array('private key', seckey, 32)
      isUint8Array('tweak', tweak, 32)

      switch (secp256k1.privateKeyTweakAdd(seckey, tweak)) {
        case 0:
          return seckey
        case 1:
          throw new Error(errors.TWEAK_ADD)
      }
    },

    privateKeyTweakMul (seckey, tweak) {
      isUint8Array('private key', seckey, 32)
      isUint8Array('tweak', tweak, 32)

      switch (secp256k1.privateKeyTweakMul(seckey, tweak)) {
        case 0:
          return seckey
        case 1:
          throw new Error(errors.TWEAK_MUL)
      }
    },

    publicKeyVerify (pubkey) {
      isUint8Array('public key', pubkey, [33, 65])

      return secp256k1.publicKeyVerify(pubkey) === 0
    },

    publicKeyCreate (seckey, compressed = true, output) {
      isUint8Array('private key', seckey, 32)
      isCompressed(compressed)
      output = getAssertedOutput(output, compressed ? 33 : 65)

      switch (secp256k1.publicKeyCreate(output, seckey)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.SECKEY_INVALID)
        case 2:
          throw new Error(errors.PUBKEY_SERIALIZE)
      }
    },

    publicKeyConvert (pubkey, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65])
      isCompressed(compressed)
      output = getAssertedOutput(output, compressed ? 33 : 65)

      switch (secp256k1.publicKeyConvert(output, pubkey)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.PUBKEY_SERIALIZE)
      }
    },

    publicKeyNegate (pubkey, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65])
      isCompressed(compressed)
      output = getAssertedOutput(output, compressed ? 33 : 65)

      switch (secp256k1.publicKeyNegate(output, pubkey)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE)
        case 3:
          throw new Error(errors.PUBKEY_SERIALIZE)
      }
    },

    publicKeyCombine (pubkeys, compressed = true, output) {
      assert(Array.isArray(pubkeys), 'Expected public keys to be an Array')
      assert(pubkeys.length > 0, 'Expected public keys array will have more than zero items')
      for (const pubkey of pubkeys) {
        isUint8Array('public key', pubkey, [33, 65])
      }
      isCompressed(compressed)
      output = getAssertedOutput(output, compressed ? 33 : 65)

      switch (secp256k1.publicKeyCombine(output, pubkeys)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.PUBKEY_COMBINE)
        case 3:
          throw new Error(errors.PUBKEY_SERIALIZE)
      }
    },

    publicKeyTweakAdd (pubkey, tweak, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65])
      isUint8Array('tweak', tweak, 32)
      isCompressed(compressed)
      output = getAssertedOutput(output, compressed ? 33 : 65)

      switch (secp256k1.publicKeyTweakAdd(output, pubkey, tweak)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.TWEAK_ADD)
      }
    },

    publicKeyTweakMul (pubkey, tweak, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65])
      isUint8Array('tweak', tweak, 32)
      isCompressed(compressed)
      output = getAssertedOutput(output, compressed ? 33 : 65)

      switch (secp256k1.publicKeyTweakMul(output, pubkey, tweak)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.TWEAK_MUL)
      }
    },

    signatureNormalize (sig) {
      isUint8Array('signature', sig, 64)

      switch (secp256k1.signatureNormalize(sig)) {
        case 0:
          return sig
        case 1:
          throw new Error(errors.SIG_PARSE)
      }
    },

    signatureExport (sig, output) {
      isUint8Array('signature', sig, 64)
      output = getAssertedOutput(output, 72)

      const obj = { output, outputlen: 72 }
      switch (secp256k1.signatureExport(obj, sig)) {
        case 0:
          return output.slice(0, obj.outputlen)
        case 1:
          throw new Error(errors.SIG_PARSE)
        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    signatureImport (sig, output) {
      isUint8Array('signature', sig)
      output = getAssertedOutput(output, 64)

      switch (secp256k1.signatureImport(output, sig)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.SIG_PARSE)
        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    ecdsaSign (msg32, seckey, options = {}, output) {
      isUint8Array('message', msg32, 32)
      isUint8Array('private key', seckey, 32)
      assert(toTypeString(options) === 'Object', 'Expected options to be an Object')
      if (options.data !== undefined) isUint8Array('options.data', options.data)
      if (options.noncefn !== undefined) assert(toTypeString(options.noncefn) === 'Function', 'Expected options.noncefn to be a Function')
      output = getAssertedOutput(output, 64)

      const obj = { signature: output, recid: null }
      switch (secp256k1.ecdsaSign(obj, msg32, seckey, options.data, options.noncefn)) {
        case 0:
          return obj
        case 1:
          throw new Error(errors.SIGN)
        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    ecdsaVerify (sig, msg32, pubkey) {
      isUint8Array('signature', sig, 64)
      isUint8Array('message', msg32, 32)
      isUint8Array('public key', pubkey, [33, 65])

      switch (secp256k1.ecdsaVerify(sig, msg32, pubkey)) {
        case 0:
          return true
        case 3:
          return false
        case 1:
          throw new Error(errors.SIG_PARSE)
        case 2:
          throw new Error(errors.PUBKEY_PARSE)
      }
    },

    ecdsaRecover (sig, recid, msg32, compressed = true, output) {
      isUint8Array('signature', sig, 64)
      assert(
        toTypeString(recid) === 'Number' &&
          recid >= 0 &&
          recid <= 3,
        'Expected recovery id to be a Number within interval [0, 3]'
      )
      isUint8Array('message', msg32, 32)
      isCompressed(compressed)
      output = getAssertedOutput(output, compressed ? 33 : 65)

      switch (secp256k1.ecdsaRecover(output, sig, recid, msg32)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.SIG_PARSE)
        case 2:
          throw new Error(errors.RECOVER)
        case 3:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    ecdh (pubkey, seckey, options = {}, output) {
      isUint8Array('public key', pubkey, [33, 65])
      isUint8Array('private key', seckey, 32)
      assert(toTypeString(options) === 'Object', 'Expected options to be an Object')
      if (options.data !== undefined) isUint8Array('options.data', options.data)
      if (options.hashfn !== undefined) {
        assert(toTypeString(options.hashfn) === 'Function', 'Expected options.hashfn to be a Function')
        if (options.xbuf !== undefined) isUint8Array('options.xbuf', options.xbuf, 32)
        if (options.ybuf !== undefined) isUint8Array('options.ybuf', options.ybuf, 32)
        isUint8Array('output', output)
      } else {
        output = getAssertedOutput(output, 32)
      }

      switch (secp256k1.ecdh(output, pubkey, seckey, options.data, options.hashfn, options.xbuf, options.ybuf)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.ECDH)
      }
    }
  }
}

      };
    };
  }
}, {package:"ganache>secp256k1",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\superstruct\\lib\\index.cjs", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\superstruct\lib\index.cjs
      return function (require, module, exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * A `StructFailure` represents a single specific failure in validation.
 */

/**
 * `StructError` objects are thrown (or returned) when validation fails.
 *
 * Validation logic is design to exit early for maximum performance. The error
 * represents the first error encountered during validation. For more detail,
 * the `error.failures` property is a generator function that can be run to
 * continue validation and receive all the failures in the data.
 */
class StructError extends TypeError {
  constructor(failure, failures) {
    let cached;
    const {
      message,
      ...rest
    } = failure;
    const {
      path
    } = failure;
    const msg = path.length === 0 ? message : `At path: ${path.join('.')} -- ${message}`;
    super(msg);
    this.value = void 0;
    this.key = void 0;
    this.type = void 0;
    this.refinement = void 0;
    this.path = void 0;
    this.branch = void 0;
    this.failures = void 0;
    Object.assign(this, rest);
    this.name = this.constructor.name;

    this.failures = () => {
      return cached ?? (cached = [failure, ...failures()]);
    };
  }

}

/**
 * Check if a value is an iterator.
 */
function isIterable(x) {
  return isObject(x) && typeof x[Symbol.iterator] === 'function';
}
/**
 * Check if a value is a plain object.
 */


function isObject(x) {
  return typeof x === 'object' && x != null;
}
/**
 * Check if a value is a plain object.
 */

function isPlainObject(x) {
  if (Object.prototype.toString.call(x) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(x);
  return prototype === null || prototype === Object.prototype;
}
/**
 * Return a value as a printable string.
 */

function print(value) {
  return typeof value === 'string' ? JSON.stringify(value) : `${value}`;
}
/**
 * Shifts (removes and returns) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 */

function shiftIterator(input) {
  const {
    done,
    value
  } = input.next();
  return done ? undefined : value;
}
/**
 * Convert a single validation result to a failure.
 */

function toFailure(result, context, struct, value) {
  if (result === true) {
    return;
  } else if (result === false) {
    result = {};
  } else if (typeof result === 'string') {
    result = {
      message: result
    };
  }

  const {
    path,
    branch
  } = context;
  const {
    type
  } = struct;
  const {
    refinement,
    message = `Expected a value of type \`${type}\`${refinement ? ` with refinement \`${refinement}\`` : ''}, but received: \`${print(value)}\``
  } = result;
  return {
    value,
    type,
    refinement,
    key: path[path.length - 1],
    path,
    branch,
    ...result,
    message
  };
}
/**
 * Convert a validation result to an iterable of failures.
 */

function* toFailures(result, context, struct, value) {
  if (!isIterable(result)) {
    result = [result];
  }

  for (const r of result) {
    const failure = toFailure(r, context, struct, value);

    if (failure) {
      yield failure;
    }
  }
}
/**
 * Check a value against a struct, traversing deeply into nested values, and
 * returning an iterator of failures or success.
 */

function* run(value, struct, options) {
  if (options === void 0) {
    options = {};
  }

  const {
    path = [],
    branch = [value],
    coerce = false,
    mask = false
  } = options;
  const ctx = {
    path,
    branch
  };

  if (coerce) {
    value = struct.coercer(value, ctx);

    if (mask && struct.type !== 'type' && isObject(struct.schema) && isObject(value) && !Array.isArray(value)) {
      for (const key in value) {
        if (struct.schema[key] === undefined) {
          delete value[key];
        }
      }
    }
  }

  let status = 'valid';

  for (const failure of struct.validator(value, ctx)) {
    status = 'not_valid';
    yield [failure, undefined];
  }

  for (let [k, v, s] of struct.entries(value, ctx)) {
    const ts = run(v, s, {
      path: k === undefined ? path : [...path, k],
      branch: k === undefined ? branch : [...branch, v],
      coerce,
      mask
    });

    for (const t of ts) {
      if (t[0]) {
        status = t[0].refinement != null ? 'not_refined' : 'not_valid';
        yield [t[0], undefined];
      } else if (coerce) {
        v = t[1];

        if (k === undefined) {
          value = v;
        } else if (value instanceof Map) {
          value.set(k, v);
        } else if (value instanceof Set) {
          value.add(v);
        } else if (isObject(value)) {
          if (v !== undefined) value[k] = v;
        }
      }
    }
  }

  if (status !== 'not_valid') {
    for (const failure of struct.refiner(value, ctx)) {
      status = 'not_refined';
      yield [failure, undefined];
    }
  }

  if (status === 'valid') {
    yield [undefined, value];
  }
}

/**
 * `Struct` objects encapsulate the validation logic for a specific type of
 * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
 * validate unknown input data against the struct.
 */

class Struct {
  constructor(props) {
    this.TYPE = void 0;
    this.type = void 0;
    this.schema = void 0;
    this.coercer = void 0;
    this.validator = void 0;
    this.refiner = void 0;
    this.entries = void 0;
    const {
      type,
      schema,
      validator,
      refiner,
      coercer = value => value,
      entries = function* () {}
    } = props;
    this.type = type;
    this.schema = schema;
    this.entries = entries;
    this.coercer = coercer;

    if (validator) {
      this.validator = (value, context) => {
        const result = validator(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.validator = () => [];
    }

    if (refiner) {
      this.refiner = (value, context) => {
        const result = refiner(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.refiner = () => [];
    }
  }
  /**
   * Assert that a value passes the struct's validation, throwing if it doesn't.
   */


  assert(value) {
    return assert(value, this);
  }
  /**
   * Create a value with the struct's coercion logic, then validate it.
   */


  create(value) {
    return create(value, this);
  }
  /**
   * Check if a value passes the struct's validation.
   */


  is(value) {
    return is(value, this);
  }
  /**
   * Mask a value, coercing and validating it, but returning only the subset of
   * properties defined by the struct's schema.
   */


  mask(value) {
    return mask(value, this);
  }
  /**
   * Validate a value with the struct's validation logic, returning a tuple
   * representing the result.
   *
   * You may optionally pass `true` for the `withCoercion` argument to coerce
   * the value before attempting to validate it. If you do, the result will
   * contain the coerced result when successful.
   */


  validate(value, options) {
    if (options === void 0) {
      options = {};
    }

    return validate(value, this, options);
  }

}
/**
 * Assert that a value passes a struct, throwing if it doesn't.
 */

function assert(value, struct) {
  const result = validate(value, struct);

  if (result[0]) {
    throw result[0];
  }
}
/**
 * Create a value with the coercion logic of struct and validate it.
 */

function create(value, struct) {
  const result = validate(value, struct, {
    coerce: true
  });

  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
/**
 * Mask a value, returning only the subset of properties defined by a struct.
 */

function mask(value, struct) {
  const result = validate(value, struct, {
    coerce: true,
    mask: true
  });

  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
/**
 * Check if a value passes a struct.
 */

function is(value, struct) {
  const result = validate(value, struct);
  return !result[0];
}
/**
 * Validate a value against a struct, returning an error if invalid, or the
 * value (with potential coercion) if valid.
 */

function validate(value, struct, options) {
  if (options === void 0) {
    options = {};
  }

  const tuples = run(value, struct, options);
  const tuple = shiftIterator(tuples);

  if (tuple[0]) {
    const error = new StructError(tuple[0], function* () {
      for (const t of tuples) {
        if (t[0]) {
          yield t[0];
        }
      }
    });
    return [error, undefined];
  } else {
    const v = tuple[1];
    return [undefined, v];
  }
}

function assign() {
  for (var _len = arguments.length, Structs = new Array(_len), _key = 0; _key < _len; _key++) {
    Structs[_key] = arguments[_key];
  }

  const isType = Structs[0].type === 'type';
  const schemas = Structs.map(s => s.schema);
  const schema = Object.assign({}, ...schemas);
  return isType ? type(schema) : object(schema);
}
/**
 * Define a new struct type with a custom validation function.
 */

function define(name, validator) {
  return new Struct({
    type: name,
    schema: null,
    validator
  });
}
/**
 * Create a new struct based on an existing struct, but the value is allowed to
 * be `undefined`. `log` will be called if the value is not `undefined`.
 */

function deprecated(struct, log) {
  return new Struct({ ...struct,
    refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx),

    validator(value, ctx) {
      if (value === undefined) {
        return true;
      } else {
        log(value, ctx);
        return struct.validator(value, ctx);
      }
    }

  });
}
/**
 * Create a struct with dynamic validation logic.
 *
 * The callback will receive the value currently being validated, and must
 * return a struct object to validate it with. This can be useful to model
 * validation logic that changes based on its input.
 */

function dynamic(fn) {
  return new Struct({
    type: 'dynamic',
    schema: null,

    *entries(value, ctx) {
      const struct = fn(value, ctx);
      yield* struct.entries(value, ctx);
    },

    validator(value, ctx) {
      const struct = fn(value, ctx);
      return struct.validator(value, ctx);
    },

    coercer(value, ctx) {
      const struct = fn(value, ctx);
      return struct.coercer(value, ctx);
    },

    refiner(value, ctx) {
      const struct = fn(value, ctx);
      return struct.refiner(value, ctx);
    }

  });
}
/**
 * Create a struct with lazily evaluated validation logic.
 *
 * The first time validation is run with the struct, the callback will be called
 * and must return a struct object to use. This is useful for cases where you
 * want to have self-referential structs for nested data structures to avoid a
 * circular definition problem.
 */

function lazy(fn) {
  let struct;
  return new Struct({
    type: 'lazy',
    schema: null,

    *entries(value, ctx) {
      struct ?? (struct = fn());
      yield* struct.entries(value, ctx);
    },

    validator(value, ctx) {
      struct ?? (struct = fn());
      return struct.validator(value, ctx);
    },

    coercer(value, ctx) {
      struct ?? (struct = fn());
      return struct.coercer(value, ctx);
    },

    refiner(value, ctx) {
      struct ?? (struct = fn());
      return struct.refiner(value, ctx);
    }

  });
}
/**
 * Create a new struct based on an existing object struct, but excluding
 * specific properties.
 *
 * Like TypeScript's `Omit` utility.
 */

function omit(struct, keys) {
  const {
    schema
  } = struct;
  const subschema = { ...schema
  };

  for (const key of keys) {
    delete subschema[key];
  }

  switch (struct.type) {
    case 'type':
      return type(subschema);

    default:
      return object(subschema);
  }
}
/**
 * Create a new struct based on an existing object struct, but with all of its
 * properties allowed to be `undefined`.
 *
 * Like TypeScript's `Partial` utility.
 */

function partial(struct) {
  const schema = struct instanceof Struct ? { ...struct.schema
  } : { ...struct
  };

  for (const key in schema) {
    schema[key] = optional(schema[key]);
  }

  return object(schema);
}
/**
 * Create a new struct based on an existing object struct, but only including
 * specific properties.
 *
 * Like TypeScript's `Pick` utility.
 */

function pick(struct, keys) {
  const {
    schema
  } = struct;
  const subschema = {};

  for (const key of keys) {
    subschema[key] = schema[key];
  }

  return object(subschema);
}
/**
 * Define a new struct type with a custom validation function.
 *
 * @deprecated This function has been renamed to `define`.
 */

function struct(name, validator) {
  console.warn('superstruct@0.11 - The `struct` helper has been renamed to `define`.');
  return define(name, validator);
}

/**
 * Ensure that any value passes validation.
 */

function any() {
  return define('any', () => true);
}
function array(Element) {
  return new Struct({
    type: 'array',
    schema: Element,

    *entries(value) {
      if (Element && Array.isArray(value)) {
        for (const [i, v] of value.entries()) {
          yield [i, v, Element];
        }
      }
    },

    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    },

    validator(value) {
      return Array.isArray(value) || `Expected an array value, but received: ${print(value)}`;
    }

  });
}
/**
 * Ensure that a value is a bigint.
 */

function bigint() {
  return define('bigint', value => {
    return typeof value === 'bigint';
  });
}
/**
 * Ensure that a value is a boolean.
 */

function boolean() {
  return define('boolean', value => {
    return typeof value === 'boolean';
  });
}
/**
 * Ensure that a value is a valid `Date`.
 *
 * Note: this also ensures that the value is *not* an invalid `Date` object,
 * which can occur when parsing a date fails but still returns a `Date`.
 */

function date() {
  return define('date', value => {
    return value instanceof Date && !isNaN(value.getTime()) || `Expected a valid \`Date\` object, but received: ${print(value)}`;
  });
}
function enums(values) {
  const schema = {};
  const description = values.map(v => print(v)).join();

  for (const key of values) {
    schema[key] = key;
  }

  return new Struct({
    type: 'enums',
    schema,

    validator(value) {
      return values.includes(value) || `Expected one of \`${description}\`, but received: ${print(value)}`;
    }

  });
}
/**
 * Ensure that a value is a function.
 */

function func() {
  return define('func', value => {
    return typeof value === 'function' || `Expected a function, but received: ${print(value)}`;
  });
}
/**
 * Ensure that a value is an instance of a specific class.
 */

function instance(Class) {
  return define('instance', value => {
    return value instanceof Class || `Expected a \`${Class.name}\` instance, but received: ${print(value)}`;
  });
}
/**
 * Ensure that a value is an integer.
 */

function integer() {
  return define('integer', value => {
    return typeof value === 'number' && !isNaN(value) && Number.isInteger(value) || `Expected an integer, but received: ${print(value)}`;
  });
}
/**
 * Ensure that a value matches all of a set of types.
 */

function intersection(Structs) {
  return new Struct({
    type: 'intersection',
    schema: null,

    *entries(value, ctx) {
      for (const S of Structs) {
        yield* S.entries(value, ctx);
      }
    },

    *validator(value, ctx) {
      for (const S of Structs) {
        yield* S.validator(value, ctx);
      }
    },

    *refiner(value, ctx) {
      for (const S of Structs) {
        yield* S.refiner(value, ctx);
      }
    }

  });
}
function literal(constant) {
  const description = print(constant);
  const t = typeof constant;
  return new Struct({
    type: 'literal',
    schema: t === 'string' || t === 'number' || t === 'boolean' ? constant : null,

    validator(value) {
      return value === constant || `Expected the literal \`${description}\`, but received: ${print(value)}`;
    }

  });
}
function map(Key, Value) {
  return new Struct({
    type: 'map',
    schema: null,

    *entries(value) {
      if (Key && Value && value instanceof Map) {
        for (const [k, v] of value.entries()) {
          yield [k, k, Key];
          yield [k, v, Value];
        }
      }
    },

    coercer(value) {
      return value instanceof Map ? new Map(value) : value;
    },

    validator(value) {
      return value instanceof Map || `Expected a \`Map\` object, but received: ${print(value)}`;
    }

  });
}
/**
 * Ensure that no value ever passes validation.
 */

function never() {
  return define('never', () => false);
}
/**
 * Augment an existing struct to allow `null` values.
 */

function nullable(struct) {
  return new Struct({ ...struct,
    validator: (value, ctx) => value === null || struct.validator(value, ctx),
    refiner: (value, ctx) => value === null || struct.refiner(value, ctx)
  });
}
/**
 * Ensure that a value is a number.
 */

function number() {
  return define('number', value => {
    return typeof value === 'number' && !isNaN(value) || `Expected a number, but received: ${print(value)}`;
  });
}
function object(schema) {
  const knowns = schema ? Object.keys(schema) : [];
  const Never = never();
  return new Struct({
    type: 'object',
    schema: schema ? schema : null,

    *entries(value) {
      if (schema && isObject(value)) {
        const unknowns = new Set(Object.keys(value));

        for (const key of knowns) {
          unknowns.delete(key);
          yield [key, value[key], schema[key]];
        }

        for (const key of unknowns) {
          yield [key, value[key], Never];
        }
      }
    },

    validator(value) {
      return isObject(value) || `Expected an object, but received: ${print(value)}`;
    },

    coercer(value) {
      return isObject(value) ? { ...value
      } : value;
    }

  });
}
/**
 * Augment a struct to allow `undefined` values.
 */

function optional(struct) {
  return new Struct({ ...struct,
    validator: (value, ctx) => value === undefined || struct.validator(value, ctx),
    refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx)
  });
}
/**
 * Ensure that a value is an object with keys and values of specific types, but
 * without ensuring any specific shape of properties.
 *
 * Like TypeScript's `Record` utility.
 */

function record(Key, Value) {
  return new Struct({
    type: 'record',
    schema: null,

    *entries(value) {
      if (isObject(value)) {
        for (const k in value) {
          const v = value[k];
          yield [k, k, Key];
          yield [k, v, Value];
        }
      }
    },

    validator(value) {
      return isObject(value) || `Expected an object, but received: ${print(value)}`;
    }

  });
}
/**
 * Ensure that a value is a `RegExp`.
 *
 * Note: this does not test the value against the regular expression! For that
 * you need to use the `pattern()` refinement.
 */

function regexp() {
  return define('regexp', value => {
    return value instanceof RegExp;
  });
}
function set(Element) {
  return new Struct({
    type: 'set',
    schema: null,

    *entries(value) {
      if (Element && value instanceof Set) {
        for (const v of value) {
          yield [v, v, Element];
        }
      }
    },

    coercer(value) {
      return value instanceof Set ? new Set(value) : value;
    },

    validator(value) {
      return value instanceof Set || `Expected a \`Set\` object, but received: ${print(value)}`;
    }

  });
}
/**
 * Ensure that a value is a string.
 */

function string() {
  return define('string', value => {
    return typeof value === 'string' || `Expected a string, but received: ${print(value)}`;
  });
}
/**
 * Ensure that a value is a tuple of a specific length, and that each of its
 * elements is of a specific type.
 */

function tuple(Structs) {
  const Never = never();
  return new Struct({
    type: 'tuple',
    schema: null,

    *entries(value) {
      if (Array.isArray(value)) {
        const length = Math.max(Structs.length, value.length);

        for (let i = 0; i < length; i++) {
          yield [i, value[i], Structs[i] || Never];
        }
      }
    },

    validator(value) {
      return Array.isArray(value) || `Expected an array, but received: ${print(value)}`;
    }

  });
}
/**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 */

function type(schema) {
  const keys = Object.keys(schema);
  return new Struct({
    type: 'type',
    schema,

    *entries(value) {
      if (isObject(value)) {
        for (const k of keys) {
          yield [k, value[k], schema[k]];
        }
      }
    },

    validator(value) {
      return isObject(value) || `Expected an object, but received: ${print(value)}`;
    }

  });
}
/**
 * Ensure that a value matches one of a set of types.
 */

function union(Structs) {
  const description = Structs.map(s => s.type).join(' | ');
  return new Struct({
    type: 'union',
    schema: null,

    coercer(value, ctx) {
      const firstMatch = Structs.find(s => {
        const [e] = s.validate(value, {
          coerce: true
        });
        return !e;
      }) || unknown();
      return firstMatch.coercer(value, ctx);
    },

    validator(value, ctx) {
      const failures = [];

      for (const S of Structs) {
        const [...tuples] = run(value, S, ctx);
        const [first] = tuples;

        if (!first[0]) {
          return [];
        } else {
          for (const [failure] of tuples) {
            if (failure) {
              failures.push(failure);
            }
          }
        }
      }

      return [`Expected the value to satisfy a union of \`${description}\`, but received: ${print(value)}`, ...failures];
    }

  });
}
/**
 * Ensure that any value passes validation, without widening its type to `any`.
 */

function unknown() {
  return define('unknown', () => true);
}

/**
 * Augment a `Struct` to add an additional coercion step to its input.
 *
 * This allows you to transform input data before validating it, to increase the
 * likelihood that it passes validation—for example for default values, parsing
 * different formats, etc.
 *
 * Note: You must use `create(value, Struct)` on the value to have the coercion
 * take effect! Using simply `assert()` or `is()` will not use coercion.
 */

function coerce(struct, condition, coercer) {
  return new Struct({ ...struct,
    coercer: (value, ctx) => {
      return is(value, condition) ? struct.coercer(coercer(value, ctx), ctx) : struct.coercer(value, ctx);
    }
  });
}
/**
 * Augment a struct to replace `undefined` values with a default.
 *
 * Note: You must use `create(value, Struct)` on the value to have the coercion
 * take effect! Using simply `assert()` or `is()` will not use coercion.
 */

function defaulted(struct, fallback, options) {
  if (options === void 0) {
    options = {};
  }

  return coerce(struct, unknown(), x => {
    const f = typeof fallback === 'function' ? fallback() : fallback;

    if (x === undefined) {
      return f;
    }

    if (!options.strict && isPlainObject(x) && isPlainObject(f)) {
      const ret = { ...x
      };
      let changed = false;

      for (const key in f) {
        if (ret[key] === undefined) {
          ret[key] = f[key];
          changed = true;
        }
      }

      if (changed) {
        return ret;
      }
    }

    return x;
  });
}
/**
 * Augment a struct to trim string inputs.
 *
 * Note: You must use `create(value, Struct)` on the value to have the coercion
 * take effect! Using simply `assert()` or `is()` will not use coercion.
 */

function trimmed(struct) {
  return coerce(struct, string(), x => x.trim());
}

/**
 * Ensure that a string, array, map, or set is empty.
 */

function empty(struct) {
  return refine(struct, 'empty', value => {
    const size = getSize(value);
    return size === 0 || `Expected an empty ${struct.type} but received one with a size of \`${size}\``;
  });
}

function getSize(value) {
  if (value instanceof Map || value instanceof Set) {
    return value.size;
  } else {
    return value.length;
  }
}
/**
 * Ensure that a number or date is below a threshold.
 */


function max(struct, threshold, options) {
  if (options === void 0) {
    options = {};
  }

  const {
    exclusive
  } = options;
  return refine(struct, 'max', value => {
    return exclusive ? value < threshold : value <= threshold || `Expected a ${struct.type} less than ${exclusive ? '' : 'or equal to '}${threshold} but received \`${value}\``;
  });
}
/**
 * Ensure that a number or date is above a threshold.
 */

function min(struct, threshold, options) {
  if (options === void 0) {
    options = {};
  }

  const {
    exclusive
  } = options;
  return refine(struct, 'min', value => {
    return exclusive ? value > threshold : value >= threshold || `Expected a ${struct.type} greater than ${exclusive ? '' : 'or equal to '}${threshold} but received \`${value}\``;
  });
}
/**
 * Ensure that a string, array, map or set is not empty.
 */

function nonempty(struct) {
  return refine(struct, 'nonempty', value => {
    const size = getSize(value);
    return size > 0 || `Expected a nonempty ${struct.type} but received an empty one`;
  });
}
/**
 * Ensure that a string matches a regular expression.
 */

function pattern(struct, regexp) {
  return refine(struct, 'pattern', value => {
    return regexp.test(value) || `Expected a ${struct.type} matching \`/${regexp.source}/\` but received "${value}"`;
  });
}
/**
 * Ensure that a string, array, number, date, map, or set has a size (or length, or time) between `min` and `max`.
 */

function size(struct, min, max) {
  if (max === void 0) {
    max = min;
  }

  const expected = `Expected a ${struct.type}`;
  const of = min === max ? `of \`${min}\`` : `between \`${min}\` and \`${max}\``;
  return refine(struct, 'size', value => {
    if (typeof value === 'number' || value instanceof Date) {
      return min <= value && value <= max || `${expected} ${of} but received \`${value}\``;
    } else if (value instanceof Map || value instanceof Set) {
      const {
        size
      } = value;
      return min <= size && size <= max || `${expected} with a size ${of} but received one with a size of \`${size}\``;
    } else {
      const {
        length
      } = value;
      return min <= length && length <= max || `${expected} with a length ${of} but received one with a length of \`${length}\``;
    }
  });
}
/**
 * Augment a `Struct` to add an additional refinement to the validation.
 *
 * The refiner function is guaranteed to receive a value of the struct's type,
 * because the struct's existing validation will already have passed. This
 * allows you to layer additional validation on top of existing structs.
 */

function refine(struct, name, refiner) {
  return new Struct({ ...struct,

    *refiner(value, ctx) {
      yield* struct.refiner(value, ctx);
      const result = refiner(value, ctx);
      const failures = toFailures(result, ctx, struct, value);

      for (const failure of failures) {
        yield { ...failure,
          refinement: name
        };
      }
    }

  });
}

exports.Struct = Struct;
exports.StructError = StructError;
exports.any = any;
exports.array = array;
exports.assert = assert;
exports.assign = assign;
exports.bigint = bigint;
exports.boolean = boolean;
exports.coerce = coerce;
exports.create = create;
exports.date = date;
exports.defaulted = defaulted;
exports.define = define;
exports.deprecated = deprecated;
exports.dynamic = dynamic;
exports.empty = empty;
exports.enums = enums;
exports.func = func;
exports.instance = instance;
exports.integer = integer;
exports.intersection = intersection;
exports.is = is;
exports.lazy = lazy;
exports.literal = literal;
exports.map = map;
exports.mask = mask;
exports.max = max;
exports.min = min;
exports.never = never;
exports.nonempty = nonempty;
exports.nullable = nullable;
exports.number = number;
exports.object = object;
exports.omit = omit;
exports.optional = optional;
exports.partial = partial;
exports.pattern = pattern;
exports.pick = pick;
exports.record = record;
exports.refine = refine;
exports.regexp = regexp;
exports.set = set;
exports.size = size;
exports.string = string;
exports.struct = struct;
exports.trimmed = trimmed;
exports.tuple = tuple;
exports.type = type;
exports.union = union;
exports.unknown = unknown;
exports.validate = validate;
//# sourceMappingURL=index.cjs.map

      };
    };
  }
}, {package:"@metamask/snap-utils>superstruct",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\swappable-obj-proxy\\src\\createEventEmitterProxy.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\swappable-obj-proxy\src\createEventEmitterProxy.js
      return function (require, module, exports) {
const filterNoop = () => true
const internalEvents = ['newListener', 'removeListener']
const externalEventFilter = (name) => !internalEvents.includes(name)

module.exports = function createEventEmitterProxy (initialTarget, opts) {
  // parse options
  opts = opts || {}
  let eventFilter = opts.eventFilter || filterNoop
  if (eventFilter === 'skipInternal') eventFilter = externalEventFilter
  if (typeof eventFilter !== 'function') throw new Error('createEventEmitterProxy - Invalid eventFilter')

  let target = initialTarget

  const proxy = new Proxy({}, {
    get: (_, name) => {
      // override `setTarget` access
      if (name === 'setTarget') return setTarget
      return target[name]
    },
    set: (_, name, value) => {
      // allow `setTarget` overrides
      if (name === 'setTarget') {
        setTarget = value
        return true
      }
      target[name] = value
      return true
    },
  })

  return proxy

  function setTarget(newTarget) {
    const oldTarget = target
    target = newTarget
    // migrate listeners
    oldTarget.eventNames().filter(eventFilter).forEach((name) => {
      getRawListeners(oldTarget, name).forEach(handler => newTarget.on(name, handler))
    })
    // remove old
    oldTarget.removeAllListeners()
  }
}

function getRawListeners(eventEmitter, name) {
  // prefer native
  if (eventEmitter.rawListeners) return eventEmitter.rawListeners(name)
  // fallback to lookup against internal object
  let events = eventEmitter._events[name] || []
  // ensure array
  if (!Array.isArray(events)) events = [events]
  // return copy
  return events.slice()
}

      };
    };
  }
}, {package:"swappable-obj-proxy",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\swappable-obj-proxy\\src\\createSwappableProxy.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\swappable-obj-proxy\src\createSwappableProxy.js
      return function (require, module, exports) {

module.exports = function createSwappableProxy (initialTarget) {
  let target = initialTarget

  const proxy = new Proxy({}, {
    get: (_, name) => {
      // override `setTarget` access
      if (name === 'setTarget') return setTarget
      return target[name]
    },
    set: (_, name, value) => {
      // allow `setTarget` overrides
      if (name === 'setTarget') {
        setTarget = value
        return true
      }
      target[name] = value
      return true
    },
  })

  return proxy

  function setTarget(newTarget) {
    target = newTarget
  }
}

      };
    };
  }
}, {package:"swappable-obj-proxy",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\swappable-obj-proxy\\src\\index.js", {"./createEventEmitterProxy":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\swappable-obj-proxy\\src\\createEventEmitterProxy.js","./createSwappableProxy":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\swappable-obj-proxy\\src\\createSwappableProxy.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\swappable-obj-proxy\src\index.js
      return function (require, module, exports) {
const createSwappableProxy = require('./createSwappableProxy')
const createEventEmitterProxy = require('./createEventEmitterProxy')

module.exports = {
  createSwappableProxy,
  createEventEmitterProxy,
}

      };
    };
  }
}, {package:"swappable-obj-proxy",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\through\\index.js", {"_process":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\process\\browser.js","stream":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\browserify\\node_modules\\stream-browserify\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\through\index.js
      return function (require, module, exports) {
(function (process){(function (){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this)}).call(this,require('_process'))

      };
    };
  }
}, {package:"debounce-stream>through",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\to-data-view\\index.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\to-data-view\index.js
      return function (require, module, exports) {
module.exports = function toDataView (data) {
  if (data instanceof Int8Array || data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
    return new DataView(data.buffer, data.byteOffset, data.byteLength)
  }

  if (data instanceof ArrayBuffer) {
    return new DataView(data)
  }

  throw new TypeError('Expected `data` to be an ArrayBuffer, Buffer, Int8Array, Uint8Array or Uint8ClampedArray')
}

      };
    };
  }
}, {package:"base32-encode>to-data-view",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\blockchain.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\blockchain.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.FIAT_RATES_UPDATE = exports.NOTIFICATION = exports.BLOCK = exports.CONNECT = exports.ERROR = void 0;
// blockchain events
var ERROR = 'blockchain-error';
exports.ERROR = ERROR;
var CONNECT = 'blockchain-connect';
exports.CONNECT = CONNECT;
var BLOCK = 'blockchain-block';
exports.BLOCK = BLOCK;
var NOTIFICATION = 'blockchain-notification';
exports.NOTIFICATION = NOTIFICATION;
var FIAT_RATES_UPDATE = 'fiat-rates-update';
exports.FIAT_RATES_UPDATE = FIAT_RATES_UPDATE;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\cardano.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\cardano.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.POOL_RELAY_TYPE = exports.CERTIFICATE_TYPE = exports.ADDRESS_TYPE = exports.NETWORK_IDS = exports.PROTOCOL_MAGICS = void 0;
var PROTOCOL_MAGICS = Object.freeze({
  mainnet: 764824073,
  testnet: 42
});
exports.PROTOCOL_MAGICS = PROTOCOL_MAGICS;
var NETWORK_IDS = Object.freeze({
  mainnet: 1,
  testnet: 0
}); // constants below are deprecated
// use `CardanoAddressType`, `CardanoCertificateType` and `CardanoPoolRelayType` from protobuf instead

exports.NETWORK_IDS = NETWORK_IDS;
var ADDRESS_TYPE = Object.freeze({
  Base: 0,
  Pointer: 4,
  Enterprise: 6,
  Byron: 8,
  Reward: 14
});
exports.ADDRESS_TYPE = ADDRESS_TYPE;
var CERTIFICATE_TYPE = Object.freeze({
  StakeRegistration: 0,
  StakeDeregistration: 1,
  StakeDelegation: 2,
  StakePoolRegistration: 3
});
exports.CERTIFICATE_TYPE = CERTIFICATE_TYPE;
var POOL_RELAY_TYPE = Object.freeze({
  SingleHostIp: 0,
  SingleHostName: 1,
  MultipleHostName: 2
});
exports.POOL_RELAY_TYPE = POOL_RELAY_TYPE;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\device.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\device.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.WAIT_FOR_SELECTION = exports.WORD = exports.PASSPHRASE_ON_DEVICE = exports.PASSPHRASE = exports.PIN = exports.BUTTON = exports.LOADING = exports.USED_ELSEWHERE = exports.RELEASED = exports.ACQUIRED = exports.RELEASE = exports.ACQUIRE = exports.CHANGED = exports.DISCONNECT = exports.CONNECT_UNACQUIRED = exports.CONNECT = void 0;
// device list events
var CONNECT = 'device-connect';
exports.CONNECT = CONNECT;
var CONNECT_UNACQUIRED = 'device-connect_unacquired';
exports.CONNECT_UNACQUIRED = CONNECT_UNACQUIRED;
var DISCONNECT = 'device-disconnect';
exports.DISCONNECT = DISCONNECT;
var CHANGED = 'device-changed';
exports.CHANGED = CHANGED;
var ACQUIRE = 'device-acquire';
exports.ACQUIRE = ACQUIRE;
var RELEASE = 'device-release';
exports.RELEASE = RELEASE;
var ACQUIRED = 'device-acquired';
exports.ACQUIRED = ACQUIRED;
var RELEASED = 'device-released';
exports.RELEASED = RELEASED;
var USED_ELSEWHERE = 'device-used_elsewhere';
exports.USED_ELSEWHERE = USED_ELSEWHERE;
var LOADING = 'device-loading'; // trezor-link events in protobuf format

exports.LOADING = LOADING;
var BUTTON = 'button';
exports.BUTTON = BUTTON;
var PIN = 'pin';
exports.PIN = PIN;
var PASSPHRASE = 'passphrase';
exports.PASSPHRASE = PASSPHRASE;
var PASSPHRASE_ON_DEVICE = 'passphrase_on_device';
exports.PASSPHRASE_ON_DEVICE = PASSPHRASE_ON_DEVICE;
var WORD = 'word'; // custom

exports.WORD = WORD;
var WAIT_FOR_SELECTION = 'device-wait_for_selection';
exports.WAIT_FOR_SELECTION = WAIT_FOR_SELECTION;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\errors.js", {"@babel/runtime/helpers/inheritsLoose":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\inheritsLoose.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js","@babel/runtime/helpers/wrapNativeSuper":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\wrapNativeSuper.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\errors.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.LIBUSB_ERROR_MESSAGE = exports.WEBUSB_ERROR_MESSAGE = exports.INVALID_PIN_ERROR_MESSAGE = exports.WRONG_PREVIOUS_SESSION_ERROR_MESSAGE = exports.TypedError = exports.TrezorError = exports.ERROR_CODES = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var ERROR_CODES = {
  Init_NotInitialized: 'TrezorConnect not yet initialized',
  // race condition: call on not initialized Core (usually hot-reloading)
  Init_AlreadyInitialized: 'TrezorConnect has been already initialized',
  // thrown by .init called multiple times
  Init_IframeBlocked: 'Iframe blocked',
  // iframe injection blocked (ad-blocker)
  Init_IframeTimeout: 'Iframe timeout',
  // iframe didn't load in specified time
  Init_ManifestMissing: 'Manifest not set. Read more at https://github.com/trezor/connect/blob/develop/docs/index.md',
  // manifest is not set
  Popup_ConnectionMissing: 'Unable to establish connection with iframe',
  // thrown by popup
  Transport_Missing: 'Transport is missing',
  // no transport available
  Transport_InvalidProtobuf: '',
  // generic error from transport layer (trezor-link)
  Method_InvalidPackage: 'This version of trezor-connect is not suitable to work without browser. Use trezor-connect@extended package instead',
  // thrown by node and react-native env while using regular 'web' package
  Method_InvalidParameter: '',
  // replaced by generic text
  Method_NotAllowed: 'Method not allowed for this configuration',
  // example: device management in popup mode
  Method_PermissionsNotGranted: 'Permissions not granted',
  // permission/confirmation not granted in popup
  Method_Cancel: 'Cancelled',
  // permission/confirmation not granted in popup OR .cancel() custom error
  Method_Interrupted: 'Popup closed',
  // interruption: popup closed
  Method_UnknownCoin: 'Coin not found',
  // coin definition not found
  Method_AddressNotMatch: 'Addresses do not match',
  // thrown by all getAddress methods with custom UI validation
  Method_FirmwareUpdate_DownloadFailed: 'Failed to download firmware binary',
  // thrown by FirmwareUpdate method
  Method_CustomMessage_Callback: 'Parameter "callback" is not a function',
  // thrown by CustomMessage method
  Method_Discovery_BundleException: '',
  // thrown by getAccountInfo method
  Method_Override: 'override',
  // inner "error", it's more like a interruption
  Method_NoResponse: 'Call resolved without response',
  // thrown by npm index(es), call to Core resolved without response, should not happen
  Backend_NotSupported: 'BlockchainLink settings not found in coins.json',
  // thrown by methods which using backends, blockchainLink not defined for this coin
  Backend_WorkerMissing: '',
  // thrown by BlockchainLink class, worker not specified
  Backend_Disconnected: 'Backend disconnected',
  // thrown by BlockchainLink class
  Backend_Invalid: 'Invalid backend',
  // thrown by BlockchainLink class, invalid backend (ie: backend for wrong coin set)
  Backend_Error: '',
  // thrown by BlockchainLink class, generic message from 'blockchain-link'
  Runtime: '',
  // thrown from several places, this shouldn't ever happen tho
  Device_NotFound: 'Device not found',
  Device_InitializeFailed: '',
  // generic error from firmware while calling "Initialize" message
  Device_FwException: '',
  // generic FirmwareException type
  Device_ModeException: '',
  // generic Device.UnexpectedMode type
  Device_Disconnected: 'Device disconnected',
  // device disconnected during call
  Device_UsedElsewhere: 'Device is used in another window',
  // interruption: current session toked by other application
  Device_InvalidState: 'Passphrase is incorrect',
  // authorization error (device state comparison)
  Device_CallInProgress: 'Device call in progress' // thrown when trying to make another call while current is still running

};
exports.ERROR_CODES = ERROR_CODES;

var TrezorError = /*#__PURE__*/function (_Error) {
  (0, _inheritsLoose2["default"])(TrezorError, _Error);

  function TrezorError(code, message) {
    var _this;

    _this = _Error.call(this, message) || this;
    _this.code = code;
    _this.message = message;
    return _this;
  }

  return TrezorError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

exports.TrezorError = TrezorError;

var TypedError = function TypedError(id, message) {
  return new TrezorError(id, message || ERROR_CODES[id]);
}; // a slight hack
// this error string is hard-coded
// in both bridge and extension


exports.TypedError = TypedError;
var WRONG_PREVIOUS_SESSION_ERROR_MESSAGE = 'wrong previous session';
exports.WRONG_PREVIOUS_SESSION_ERROR_MESSAGE = WRONG_PREVIOUS_SESSION_ERROR_MESSAGE;
var INVALID_PIN_ERROR_MESSAGE = 'PIN invalid';
exports.INVALID_PIN_ERROR_MESSAGE = INVALID_PIN_ERROR_MESSAGE;
var WEBUSB_ERROR_MESSAGE = 'NetworkError: Unable to claim interface.'; // trezord error prefix.
// user has insufficient permissions. may occur in Linux (missing udev rules), Windows and MacOS.

exports.WEBUSB_ERROR_MESSAGE = WEBUSB_ERROR_MESSAGE;
var LIBUSB_ERROR_MESSAGE = 'LIBUSB_ERROR';
exports.LIBUSB_ERROR_MESSAGE = LIBUSB_ERROR_MESSAGE;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\iframe.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\iframe.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.CALL = exports.ERROR = exports.INIT = exports.LOADED = exports.BOOTSTRAP = void 0;
// Message called from iframe.html inline script before "window.onload" event. This is first message from iframe to window.opener.
var BOOTSTRAP = 'iframe-bootstrap'; // Message from iframe.js to window.opener, called after "window.onload" event. This is second message from iframe to window.opener.

exports.BOOTSTRAP = BOOTSTRAP;
var LOADED = 'iframe-loaded'; // Message from window.opener to iframe.js

exports.LOADED = LOADED;
var INIT = 'iframe-init'; // Error message from iframe.js to window.opener. Could be thrown during iframe initialization process

exports.INIT = INIT;
var ERROR = 'iframe-error'; // Message from window.opener to iframe. Call method

exports.ERROR = ERROR;
var CALL = 'iframe-call';
exports.CALL = CALL;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\index.js", {"./blockchain":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\blockchain.js","./cardano":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\cardano.js","./device":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\device.js","./errors":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\errors.js","./iframe":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\iframe.js","./network":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\network.js","./popup":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\popup.js","./transport":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\transport.js","./ui":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\ui.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\index.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.CARDANO = exports.UI = exports.TRANSPORT = exports.POPUP = exports.NETWORK = exports.IFRAME = exports.ERRORS = exports.DEVICE = exports.BLOCKCHAIN = exports.BLOCKCHAIN_EVENT = exports.RESPONSE_EVENT = exports.TRANSPORT_EVENT = exports.DEVICE_EVENT = exports.UI_EVENT = exports.CORE_EVENT = void 0;

var BLOCKCHAIN = _interopRequireWildcard(require("./blockchain"));

exports.BLOCKCHAIN = BLOCKCHAIN;

var DEVICE = _interopRequireWildcard(require("./device"));

exports.DEVICE = DEVICE;

var ERRORS = _interopRequireWildcard(require("./errors"));

exports.ERRORS = ERRORS;

var IFRAME = _interopRequireWildcard(require("./iframe"));

exports.IFRAME = IFRAME;

var NETWORK = _interopRequireWildcard(require("./network"));

exports.NETWORK = NETWORK;

var POPUP = _interopRequireWildcard(require("./popup"));

exports.POPUP = POPUP;

var TRANSPORT = _interopRequireWildcard(require("./transport"));

exports.TRANSPORT = TRANSPORT;

var UI = _interopRequireWildcard(require("./ui"));

exports.UI = UI;

var CARDANO = _interopRequireWildcard(require("./cardano"));

exports.CARDANO = CARDANO;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CORE_EVENT = 'CORE_EVENT';
exports.CORE_EVENT = CORE_EVENT;
var UI_EVENT = 'UI_EVENT';
exports.UI_EVENT = UI_EVENT;
var DEVICE_EVENT = 'DEVICE_EVENT';
exports.DEVICE_EVENT = DEVICE_EVENT;
var TRANSPORT_EVENT = 'TRANSPORT_EVENT';
exports.TRANSPORT_EVENT = TRANSPORT_EVENT;
var RESPONSE_EVENT = 'RESPONSE_EVENT';
exports.RESPONSE_EVENT = RESPONSE_EVENT;
var BLOCKCHAIN_EVENT = 'BLOCKCHAIN_EVENT';
exports.BLOCKCHAIN_EVENT = BLOCKCHAIN_EVENT;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\network.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\network.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.TYPES = void 0;
var TYPES = Object.freeze({
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
  eos: 'Eos',
  nem: 'NEM',
  stellar: 'Stellar',
  cardano: 'Cardano',
  ripple: 'Ripple',
  tezos: 'Tezors',
  binance: 'Binance'
});
exports.TYPES = TYPES;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\popup.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\popup.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.CLOSE_WINDOW = exports.CANCEL_POPUP_REQUEST = exports.CLOSED = exports.HANDSHAKE = exports.EXTENSION_USB_PERMISSIONS = exports.ERROR = exports.INIT = exports.LOADED = exports.BOOTSTRAP = void 0;
// Message called from popup.html inline script before "window.onload" event. This is first message from popup to window.opener.
var BOOTSTRAP = 'popup-bootstrap'; // Message from popup.js to window.opener, called after "window.onload" event. This is second message from popup to window.opener.

exports.BOOTSTRAP = BOOTSTRAP;
var LOADED = 'popup-loaded'; // Message from window.opener to popup.js. Send settings to popup. This is first message from window.opener to popup.

exports.LOADED = LOADED;
var INIT = 'popup-init'; // Error message from popup to window.opener. Could be thrown during popup initialization process (POPUP.INIT)

exports.INIT = INIT;
var ERROR = 'popup-error'; // Message to webextensions, opens "trezor-usb-permission.html" within webextension

exports.ERROR = ERROR;
var EXTENSION_USB_PERMISSIONS = 'open-usb-permissions'; // Message called from both [popup > iframe] then [iframe > popup] in this exact order.
// Firstly popup call iframe to resolve popup promise in Core
// Then iframe reacts to POPUP.HANDSHAKE message and sends ConnectSettings, transport information and requested method details back to popup

exports.EXTENSION_USB_PERMISSIONS = EXTENSION_USB_PERMISSIONS;
var HANDSHAKE = 'popup-handshake'; // Event emitted from PopupManager at the end of popup closing process.
// Sent from popup thru window.opener to an iframe because message channel between popup and iframe is no longer available

exports.HANDSHAKE = HANDSHAKE;
var CLOSED = 'popup-closed'; // Message called from iframe to popup, it means that popup will not be needed (example: Blockchain methods are not using popup at all)
// This will close active popup window and/or clear opening process in PopupManager (maybe popup wasn't opened yet)

exports.CLOSED = CLOSED;
var CANCEL_POPUP_REQUEST = 'ui-cancel-popup-request'; // Message called from inline element in popup.html (window.closeWindow), this is used only with webextensions to properly handle popup close event

exports.CANCEL_POPUP_REQUEST = CANCEL_POPUP_REQUEST;
var CLOSE_WINDOW = 'window.close';
exports.CLOSE_WINDOW = CLOSE_WINDOW;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\transport.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\transport.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.START_PENDING = exports.DISABLE_WEBUSB = exports.REQUEST = exports.STREAM = exports.UPDATE = exports.ERROR = exports.START = void 0;
var START = 'transport-start';
exports.START = START;
var ERROR = 'transport-error';
exports.ERROR = ERROR;
var UPDATE = 'transport-update';
exports.UPDATE = UPDATE;
var STREAM = 'transport-stream';
exports.STREAM = STREAM;
var REQUEST = 'transport-request_device';
exports.REQUEST = REQUEST;
var DISABLE_WEBUSB = 'transport-disable_webusb';
exports.DISABLE_WEBUSB = DISABLE_WEBUSB;
var START_PENDING = 'transport-start_pending';
exports.START_PENDING = START_PENDING;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\ui.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\constants\ui.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.IFRAME_FAILURE = exports.ADDRESS_VALIDATION = exports.BUNDLE_PROGRESS = exports.LOGIN_CHALLENGE_RESPONSE = exports.LOGIN_CHALLENGE_REQUEST = exports.CUSTOM_MESSAGE_RESPONSE = exports.CUSTOM_MESSAGE_REQUEST = exports.CHANGE_SETTINGS = exports.RECEIVE_WORD = exports.RECEIVE_FEE = exports.RECEIVE_ACCOUNT = exports.CHANGE_ACCOUNT = exports.RECEIVE_DEVICE = exports.RECEIVE_PASSPHRASE = exports.RECEIVE_PIN = exports.RECEIVE_CONFIRMATION = exports.RECEIVE_PERMISSION = exports.REQUEST_WORD = exports.REQUEST_BUTTON = exports.INSUFFICIENT_FUNDS = exports.UPDATE_CUSTOM_FEE = exports.SELECT_FEE = exports.SELECT_ACCOUNT = exports.SELECT_DEVICE = exports.SET_OPERATION = exports.LOADING = exports.CONNECT = exports.INVALID_PASSPHRASE_ACTION = exports.INVALID_PASSPHRASE = exports.REQUEST_PASSPHRASE_ON_DEVICE = exports.REQUEST_PASSPHRASE = exports.INVALID_PIN = exports.REQUEST_PIN = exports.REQUEST_CONFIRMATION = exports.REQUEST_PERMISSION = exports.CLOSE_UI_WINDOW = exports.REQUEST_UI_WINDOW = exports.DEVICE_NEEDS_BACKUP = exports.FIRMWARE_PROGRESS = exports.FIRMWARE_NOT_INSTALLED = exports.FIRMWARE_NOT_COMPATIBLE = exports.FIRMWARE_NOT_SUPPORTED = exports.FIRMWARE_OUTDATED = exports.FIRMWARE_OLD = exports.SEEDLESS = exports.INITIALIZE = exports.REQUIRE_MODE = exports.NOT_IN_BOOTLOADER = exports.BOOTLOADER = exports.TRANSPORT = void 0;
var TRANSPORT = 'ui-no_transport';
exports.TRANSPORT = TRANSPORT;
var BOOTLOADER = 'ui-device_bootloader_mode';
exports.BOOTLOADER = BOOTLOADER;
var NOT_IN_BOOTLOADER = 'ui-device_not_in_bootloader_mode';
exports.NOT_IN_BOOTLOADER = NOT_IN_BOOTLOADER;
var REQUIRE_MODE = 'ui-device_require_mode';
exports.REQUIRE_MODE = REQUIRE_MODE;
var INITIALIZE = 'ui-device_not_initialized';
exports.INITIALIZE = INITIALIZE;
var SEEDLESS = 'ui-device_seedless';
exports.SEEDLESS = SEEDLESS;
var FIRMWARE_OLD = 'ui-device_firmware_old';
exports.FIRMWARE_OLD = FIRMWARE_OLD;
var FIRMWARE_OUTDATED = 'ui-device_firmware_outdated';
exports.FIRMWARE_OUTDATED = FIRMWARE_OUTDATED;
var FIRMWARE_NOT_SUPPORTED = 'ui-device_firmware_unsupported';
exports.FIRMWARE_NOT_SUPPORTED = FIRMWARE_NOT_SUPPORTED;
var FIRMWARE_NOT_COMPATIBLE = 'ui-device_firmware_not_compatible';
exports.FIRMWARE_NOT_COMPATIBLE = FIRMWARE_NOT_COMPATIBLE;
var FIRMWARE_NOT_INSTALLED = 'ui-device_firmware_not_installed';
exports.FIRMWARE_NOT_INSTALLED = FIRMWARE_NOT_INSTALLED;
var FIRMWARE_PROGRESS = 'ui-firmware-progress';
exports.FIRMWARE_PROGRESS = FIRMWARE_PROGRESS;
var DEVICE_NEEDS_BACKUP = 'ui-device_needs_backup';
exports.DEVICE_NEEDS_BACKUP = DEVICE_NEEDS_BACKUP;
var REQUEST_UI_WINDOW = 'ui-request_window';
exports.REQUEST_UI_WINDOW = REQUEST_UI_WINDOW;
var CLOSE_UI_WINDOW = 'ui-close_window';
exports.CLOSE_UI_WINDOW = CLOSE_UI_WINDOW;
var REQUEST_PERMISSION = 'ui-request_permission';
exports.REQUEST_PERMISSION = REQUEST_PERMISSION;
var REQUEST_CONFIRMATION = 'ui-request_confirmation';
exports.REQUEST_CONFIRMATION = REQUEST_CONFIRMATION;
var REQUEST_PIN = 'ui-request_pin';
exports.REQUEST_PIN = REQUEST_PIN;
var INVALID_PIN = 'ui-invalid_pin';
exports.INVALID_PIN = INVALID_PIN;
var REQUEST_PASSPHRASE = 'ui-request_passphrase';
exports.REQUEST_PASSPHRASE = REQUEST_PASSPHRASE;
var REQUEST_PASSPHRASE_ON_DEVICE = 'ui-request_passphrase_on_device';
exports.REQUEST_PASSPHRASE_ON_DEVICE = REQUEST_PASSPHRASE_ON_DEVICE;
var INVALID_PASSPHRASE = 'ui-invalid_passphrase';
exports.INVALID_PASSPHRASE = INVALID_PASSPHRASE;
var INVALID_PASSPHRASE_ACTION = 'ui-invalid_passphrase_action';
exports.INVALID_PASSPHRASE_ACTION = INVALID_PASSPHRASE_ACTION;
var CONNECT = 'ui-connect';
exports.CONNECT = CONNECT;
var LOADING = 'ui-loading';
exports.LOADING = LOADING;
var SET_OPERATION = 'ui-set_operation';
exports.SET_OPERATION = SET_OPERATION;
var SELECT_DEVICE = 'ui-select_device';
exports.SELECT_DEVICE = SELECT_DEVICE;
var SELECT_ACCOUNT = 'ui-select_account';
exports.SELECT_ACCOUNT = SELECT_ACCOUNT;
var SELECT_FEE = 'ui-select_fee';
exports.SELECT_FEE = SELECT_FEE;
var UPDATE_CUSTOM_FEE = 'ui-update_custom_fee';
exports.UPDATE_CUSTOM_FEE = UPDATE_CUSTOM_FEE;
var INSUFFICIENT_FUNDS = 'ui-insufficient_funds';
exports.INSUFFICIENT_FUNDS = INSUFFICIENT_FUNDS;
var REQUEST_BUTTON = 'ui-button';
exports.REQUEST_BUTTON = REQUEST_BUTTON;
var REQUEST_WORD = 'ui-request_word';
exports.REQUEST_WORD = REQUEST_WORD;
var RECEIVE_PERMISSION = 'ui-receive_permission';
exports.RECEIVE_PERMISSION = RECEIVE_PERMISSION;
var RECEIVE_CONFIRMATION = 'ui-receive_confirmation';
exports.RECEIVE_CONFIRMATION = RECEIVE_CONFIRMATION;
var RECEIVE_PIN = 'ui-receive_pin';
exports.RECEIVE_PIN = RECEIVE_PIN;
var RECEIVE_PASSPHRASE = 'ui-receive_passphrase';
exports.RECEIVE_PASSPHRASE = RECEIVE_PASSPHRASE;
var RECEIVE_DEVICE = 'ui-receive_device';
exports.RECEIVE_DEVICE = RECEIVE_DEVICE;
var CHANGE_ACCOUNT = 'ui-change_account';
exports.CHANGE_ACCOUNT = CHANGE_ACCOUNT;
var RECEIVE_ACCOUNT = 'ui-receive_account';
exports.RECEIVE_ACCOUNT = RECEIVE_ACCOUNT;
var RECEIVE_FEE = 'ui-receive_fee';
exports.RECEIVE_FEE = RECEIVE_FEE;
var RECEIVE_WORD = 'ui-receive_word';
exports.RECEIVE_WORD = RECEIVE_WORD;
var CHANGE_SETTINGS = 'ui-change_settings';
exports.CHANGE_SETTINGS = CHANGE_SETTINGS;
var CUSTOM_MESSAGE_REQUEST = 'ui-custom_request';
exports.CUSTOM_MESSAGE_REQUEST = CUSTOM_MESSAGE_REQUEST;
var CUSTOM_MESSAGE_RESPONSE = 'ui-custom_response';
exports.CUSTOM_MESSAGE_RESPONSE = CUSTOM_MESSAGE_RESPONSE;
var LOGIN_CHALLENGE_REQUEST = 'ui-login_challenge_request';
exports.LOGIN_CHALLENGE_REQUEST = LOGIN_CHALLENGE_REQUEST;
var LOGIN_CHALLENGE_RESPONSE = 'ui-login_challenge_response';
exports.LOGIN_CHALLENGE_RESPONSE = LOGIN_CHALLENGE_RESPONSE;
var BUNDLE_PROGRESS = 'ui-bundle_progress';
exports.BUNDLE_PROGRESS = BUNDLE_PROGRESS;
var ADDRESS_VALIDATION = 'ui-address_validation';
exports.ADDRESS_VALIDATION = ADDRESS_VALIDATION;
var IFRAME_FAILURE = 'ui-iframe_failure';
exports.IFRAME_FAILURE = IFRAME_FAILURE;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\data\\ConnectSettings.js", {"@babel/runtime/helpers/defineProperty":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\defineProperty.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\data\ConnectSettings.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.parse = exports.corsValidator = exports.getEnv = exports.DEFAULT_PRIORITY = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/*
 * Initial settings for connect.
 * It could be changed by passing values into TrezorConnect.init(...) method
 */
var VERSION = '8.2.6';
var versionN = VERSION.split('.').map(function (s) {
  return parseInt(s, 10);
}); // const DIRECTORY = `${ versionN[0] }${ (versionN[1] > 0 ? `.${versionN[1]}` : '') }/`;

var DIRECTORY = versionN[0] + "/";
var DEFAULT_DOMAIN = "https://connect.trezor.io/" + DIRECTORY;
var DEFAULT_PRIORITY = 2;
exports.DEFAULT_PRIORITY = DEFAULT_PRIORITY;
var initialSettings = {
  configSrc: './data/config.json',
  // constant
  version: VERSION,
  // constant
  debug: false,
  priority: DEFAULT_PRIORITY,
  trustedHost: false,
  connectSrc: DEFAULT_DOMAIN,
  iframeSrc: DEFAULT_DOMAIN + "iframe.html",
  popup: true,
  popupSrc: DEFAULT_DOMAIN + "popup.html",
  webusbSrc: DEFAULT_DOMAIN + "webusb.html",
  transportReconnect: false,
  webusb: true,
  pendingTransportEvent: true,
  supportedBrowser: typeof navigator !== 'undefined' ? !/Trident|MSIE|Edge/.test(navigator.userAgent) : true,
  manifest: null,
  env: 'web',
  lazyLoad: false,
  timestamp: new Date().getTime(),
  interactionTimeout: 600 // 5 minutes

};
var currentSettings = initialSettings;

var parseManifest = function parseManifest(manifest) {
  if (!manifest) return;
  if (typeof manifest.email !== 'string') return;
  if (typeof manifest.appUrl !== 'string') return;
  return {
    email: manifest.email,
    appUrl: manifest.appUrl
  };
};

var getEnv = function getEnv() {
  // $FlowIssue: chrome is not declared outside the project
  if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.onConnect !== 'undefined') {
    return 'webextension';
  }

  if (typeof navigator !== 'undefined') {
    if (typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative') {
      return 'react-native';
    }

    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf(' electron/') > -1) {
      return 'electron';
    }
  } // if (typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative') {
  //     return 'react-native';
  // }
  // if (typeof process !== 'undefined' && process.versions.hasOwnProperty('electron')) {
  //     return 'electron';
  // }


  return 'web';
}; // Cors validation copied from Trezor Bridge
// see: https://github.com/trezor/trezord-go/blob/05991cea5900d18bcc6ece5ae5e319d138fc5551/server/api/api.go#L229
// Its pointless to allow `trezor-connect` endpoints { connectSrc } for domains other than listed below
// `trezord` will block communication anyway


exports.getEnv = getEnv;

var corsValidator = function corsValidator(url) {
  if (typeof url !== 'string') return;
  if (url.match(/^https:\/\/([A-Za-z0-9\-_]+\.)*trezor\.io\//)) return url;
  if (url.match(/^https?:\/\/localhost:[58][0-9]{3}\//)) return url;
  if (url.match(/^https:\/\/([A-Za-z0-9\-_]+\.)*sldev\.cz\//)) return url;
  if (url.match(/^https?:\/\/([A-Za-z0-9\-_]+\.)*trezoriovpjcahpzkrewelclulmszwbqpzmzgub37gbcjlvluxtruqad\.onion\//)) return url;
};

exports.corsValidator = corsValidator;

var parse = function parse(input) {
  if (input === void 0) {
    input = {};
  }

  var settings = _objectSpread({}, currentSettings);

  if (Object.prototype.hasOwnProperty.call(input, 'debug')) {
    if (Array.isArray(input)) {// enable log with prefix
    }

    if (typeof input.debug === 'boolean') {
      settings.debug = input.debug;
    } else if (typeof input.debug === 'string') {
      settings.debug = input.debug === 'true';
    }
  }

  if (typeof input.connectSrc === 'string') {
    settings.connectSrc = input.connectSrc;
  } // For debugging purposes `connectSrc` could be defined in `global.__TREZOR_CONNECT_SRC` variable


  if (typeof global !== 'undefined' && typeof global.__TREZOR_CONNECT_SRC === 'string') {
    settings.connectSrc = corsValidator(global.__TREZOR_CONNECT_SRC);
    settings.debug = true;
  } // For debugging purposes `connectSrc` could be defined in url query of hosting page. Usage:
  // https://3rdparty-page.com/?trezor-connect-src=https://localhost:8088/


  if (typeof window !== 'undefined' && window.location && typeof window.location.search === 'string') {
    var vars = window.location.search.split('&');
    var customUrl = vars.find(function (v) {
      return v.indexOf('trezor-connect-src') >= 0;
    });

    if (customUrl) {
      var _customUrl$split = customUrl.split('='),
          connectSrc = _customUrl$split[1];

      settings.connectSrc = corsValidator(decodeURIComponent(connectSrc));
      settings.debug = true;
    }
  }

  var src = settings.connectSrc || DEFAULT_DOMAIN;
  settings.iframeSrc = src + "iframe.html";
  settings.popupSrc = src + "popup.html";
  settings.webusbSrc = src + "webusb.html";

  if (typeof input.transportReconnect === 'boolean') {
    settings.transportReconnect = input.transportReconnect;
  }

  if (typeof input.webusb === 'boolean') {
    settings.webusb = input.webusb;
  }

  if (typeof input.popup === 'boolean') {
    settings.popup = input.popup;
  }

  if (typeof input.lazyLoad === 'boolean') {
    settings.lazyLoad = input.lazyLoad;
  }

  if (typeof input.pendingTransportEvent === 'boolean') {
    settings.pendingTransportEvent = input.pendingTransportEvent;
  } // local files


  if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
    settings.origin = "file://" + window.location.pathname;
    settings.webusb = false;
  }

  if (typeof input.extension === 'string') {
    settings.extension = input.extension;
  }

  if (typeof input.env === 'string') {
    settings.env = input.env;
  } else {
    settings.env = getEnv();
  }

  if (typeof input.timestamp === 'number') {
    settings.timestamp = input.timestamp;
  }

  if (typeof input.interactionTimeout === 'number') {
    settings.interactionTimeout = input.interactionTimeout;
  }

  if (typeof input.manifest === 'object') {
    settings.manifest = parseManifest(input.manifest);
  }

  currentSettings = settings;
  return currentSettings;
};

exports.parse = parse;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\env\\browser\\index.js", {"../../constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\index.js","../../data/ConnectSettings":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\data\\ConnectSettings.js","../../iframe/builder":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\iframe\\builder.js","../../message":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\message\\index.js","../../message/builder":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\message\\builder.js","../../popup/PopupManager":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\popup\\PopupManager.js","../../types":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\index.js","../../utils/debug":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\utils\\debug.js","../../webusb/button":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\webusb\\button.js","@babel/runtime/helpers/asyncToGenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\asyncToGenerator.js","@babel/runtime/helpers/defineProperty":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\defineProperty.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js","@babel/runtime/regenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\regenerator\\index.js","events":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\browserify\\node_modules\\events\\events.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\env\browser\index.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.disableWebUSB = exports.requestLogin = exports.customMessage = exports.getSettings = exports.renderWebUSBButton = exports.uiResponse = exports.call = exports.init = exports.cancel = exports.dispose = exports.manifest = exports.eventEmitter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _events = _interopRequireDefault(require("events"));

var _PopupManager = _interopRequireDefault(require("../../popup/PopupManager"));

var iframe = _interopRequireWildcard(require("../../iframe/builder"));

var _button = _interopRequireDefault(require("../../webusb/button"));

var _message = require("../../message");

var _builder2 = require("../../message/builder");

var _ConnectSettings = require("../../data/ConnectSettings");

var _debug = require("../../utils/debug");

var _constants = require("../../constants");

var $T = _interopRequireWildcard(require("../../types"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var eventEmitter = new _events["default"]();
exports.eventEmitter = eventEmitter;

var _log = (0, _debug.initLog)('[trezor-connect.js]');

var _settings;

var _popupManager;

var initPopupManager = function initPopupManager() {
  var pm = new _PopupManager["default"](_settings);
  pm.on(_constants.POPUP.CLOSED, function (error) {
    iframe.postMessage({
      type: _constants.POPUP.CLOSED,
      payload: error ? {
        error: error
      } : null
    }, false);
  });
  return pm;
};

var manifest = function manifest(data) {
  _settings = (0, _ConnectSettings.parse)({
    manifest: data
  });
};

exports.manifest = manifest;

var dispose = function dispose() {
  eventEmitter.removeAllListeners();
  iframe.dispose();

  if (_popupManager) {
    _popupManager.close();
  }
};

exports.dispose = dispose;

var cancel = function cancel(error) {
  if (_popupManager) {
    _popupManager.emit(_constants.POPUP.CLOSED, error);
  }
}; // handle message received from iframe


exports.cancel = cancel;

var handleMessage = function handleMessage(messageEvent) {
  // ignore messages from domain other then iframe origin
  if (messageEvent.origin !== iframe.origin) return;
  var message = (0, _message.parseMessage)(messageEvent.data);
  var event = message.event,
      type = message.type,
      payload = message.payload;
  var id = message.id || 0;

  _log.log('handleMessage', message);

  switch (event) {
    case _constants.RESPONSE_EVENT:
      if (iframe.messagePromises[id]) {
        // resolve message promise (send result of call method)
        iframe.messagePromises[id].resolve({
          id: id,
          success: message.success,
          payload: payload
        });
        delete iframe.messagePromises[id];
      } else {
        _log.warn("Unknown message id " + id);
      }

      break;

    case _constants.DEVICE_EVENT:
      // pass DEVICE event up to html
      eventEmitter.emit(event, message);
      eventEmitter.emit(type, payload); // DEVICE_EVENT also emit single events (connect/disconnect...)

      break;

    case _constants.TRANSPORT_EVENT:
      eventEmitter.emit(event, message);
      eventEmitter.emit(type, payload);
      break;

    case _constants.BLOCKCHAIN_EVENT:
      eventEmitter.emit(event, message);
      eventEmitter.emit(type, payload);
      break;

    case _constants.UI_EVENT:
      if (type === _constants.IFRAME.BOOTSTRAP) {
        iframe.clearTimeout();
        break;
      }

      if (type === _constants.IFRAME.LOADED) {
        iframe.initPromise.resolve();
      }

      if (type === _constants.IFRAME.ERROR) {
        iframe.initPromise.reject(payload.error);
      } // pass UI event up


      eventEmitter.emit(event, message);
      eventEmitter.emit(type, payload);
      break;

    default:
      _log.log('Undefined message', event, messageEvent);

  }
};

var init = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(settings) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (settings === void 0) {
              settings = {};
            }

            if (!iframe.instance) {
              _context.next = 3;
              break;
            }

            throw _constants.ERRORS.TypedError('Init_AlreadyInitialized');

          case 3:
            if (!_settings) {
              _settings = (0, _ConnectSettings.parse)(settings);
            }

            if (_settings.manifest) {
              _context.next = 6;
              break;
            }

            throw _constants.ERRORS.TypedError('Init_ManifestMissing');

          case 6:
            if (!_settings.lazyLoad) {
              _context.next = 9;
              break;
            }

            // reset "lazyLoad" after first use
            _settings.lazyLoad = false;
            return _context.abrupt("return");

          case 9:
            if (!_popupManager) {
              _popupManager = initPopupManager();
            }

            _log.enabled = !!_settings.debug;
            window.addEventListener('message', handleMessage);
            window.addEventListener('unload', dispose);
            _context.next = 15;
            return iframe.init(_settings);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.init = init;

var call = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params) {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!iframe.instance && !iframe.timeout)) {
              _context2.next = 15;
              break;
            }

            // init popup with lazy loading before iframe initialization
            _settings = (0, _ConnectSettings.parse)(_settings);

            if (_settings.manifest) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", (0, _message.errorMessage)(_constants.ERRORS.TypedError('Init_ManifestMissing')));

          case 4:
            if (!_popupManager) {
              _popupManager = initPopupManager();
            }

            _popupManager.request(true); // auto init with default settings


            _context2.prev = 6;
            _context2.next = 9;
            return init(_settings);

          case 9:
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](6);

            if (_popupManager) {
              // Catch fatal iframe errors (not loading)
              if (['Init_IframeBlocked', 'Init_IframeTimeout'].includes(_context2.t0.code)) {
                _popupManager.postMessage((0, _builder2.UiMessage)(_constants.UI.IFRAME_FAILURE));
              } else {
                _popupManager.close();
              }
            }

            return _context2.abrupt("return", (0, _message.errorMessage)(_context2.t0));

          case 15:
            if (!iframe.timeout) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("return", (0, _message.errorMessage)(_constants.ERRORS.TypedError('Init_ManifestMissing')));

          case 17:
            if (!iframe.error) {
              _context2.next = 19;
              break;
            }

            return _context2.abrupt("return", (0, _message.errorMessage)(iframe.error));

          case 19:
            // request popup window it might be used in the future
            if (_settings.popup && _popupManager) {
              _popupManager.request();
            } // post message to iframe


            _context2.prev = 20;
            _context2.next = 23;
            return iframe.postMessage({
              type: _constants.IFRAME.CALL,
              payload: params
            });

          case 23:
            response = _context2.sent;

            if (!response) {
              _context2.next = 27;
              break;
            }

            if (!response.success && response.payload.code !== 'Device_CallInProgress' && _popupManager) {
              _popupManager.unlock();
            }

            return _context2.abrupt("return", response);

          case 27:
            if (_popupManager) {
              _popupManager.unlock();
            }

            return _context2.abrupt("return", (0, _message.errorMessage)(_constants.ERRORS.TypedError('Method_NoResponse')));

          case 31:
            _context2.prev = 31;
            _context2.t1 = _context2["catch"](20);

            _log.error('__call error', _context2.t1);

            if (_popupManager) {
              _popupManager.close();
            }

            return _context2.abrupt("return", (0, _message.errorMessage)(_context2.t1));

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 11], [20, 31]]);
  }));

  return function call(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.call = call;

var customMessageResponse = function customMessageResponse(payload) {
  iframe.postMessage({
    event: _constants.UI_EVENT,
    type: _constants.UI.CUSTOM_MESSAGE_RESPONSE,
    payload: payload
  });
};

var uiResponse = function uiResponse(response) {
  var type = response.type,
      payload = response.payload;
  iframe.postMessage({
    event: _constants.UI_EVENT,
    type: type,
    payload: payload
  });
};

exports.uiResponse = uiResponse;

var renderWebUSBButton = function renderWebUSBButton(className) {
  (0, _button["default"])(className, _settings.webusbSrc, iframe.origin);
};

exports.renderWebUSBButton = renderWebUSBButton;

var getSettings = function getSettings() {
  if (!iframe.instance) {
    return Promise.resolve((0, _message.errorMessage)(_constants.ERRORS.TypedError('Init_NotInitialized')));
  }

  return call({
    method: 'getSettings'
  });
};

exports.getSettings = getSettings;

var customMessage = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(params) {
    var callback, customMessageListener, response;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(typeof params.callback !== 'function')) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", (0, _message.errorMessage)(_constants.ERRORS.TypedError('Method_CustomMessage_Callback')));

          case 2:
            // TODO: set message listener only if iframe is loaded correctly
            callback = params.callback;

            customMessageListener = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(event) {
                var data, payload;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        data = event.data;

                        if (!(data && data.type === _constants.UI.CUSTOM_MESSAGE_REQUEST)) {
                          _context3.next = 6;
                          break;
                        }

                        _context3.next = 4;
                        return callback(data.payload);

                      case 4:
                        payload = _context3.sent;

                        if (payload) {
                          customMessageResponse(payload);
                        } else {
                          customMessageResponse({
                            message: 'release'
                          });
                        }

                      case 6:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function customMessageListener(_x4) {
                return _ref4.apply(this, arguments);
              };
            }();

            window.addEventListener('message', customMessageListener, false);
            _context4.next = 7;
            return call(_objectSpread(_objectSpread({
              method: 'customMessage'
            }, params), {}, {
              callback: null
            }));

          case 7:
            response = _context4.sent;
            window.removeEventListener('message', customMessageListener);
            return _context4.abrupt("return", response);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function customMessage(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.customMessage = customMessage;

var requestLogin = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(params) {
    var callback, loginChallengeListener, response;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(typeof params.callback === 'function')) {
              _context6.next = 9;
              break;
            }

            callback = params.callback; // TODO: set message listener only if iframe is loaded correctly

            loginChallengeListener = /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(event) {
                var data, payload;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        data = event.data;

                        if (!(data && data.type === _constants.UI.LOGIN_CHALLENGE_REQUEST)) {
                          _context5.next = 12;
                          break;
                        }

                        _context5.prev = 2;
                        _context5.next = 5;
                        return callback();

                      case 5:
                        payload = _context5.sent;
                        iframe.postMessage({
                          event: _constants.UI_EVENT,
                          type: _constants.UI.LOGIN_CHALLENGE_RESPONSE,
                          payload: payload
                        });
                        _context5.next = 12;
                        break;

                      case 9:
                        _context5.prev = 9;
                        _context5.t0 = _context5["catch"](2);
                        iframe.postMessage({
                          event: _constants.UI_EVENT,
                          type: _constants.UI.LOGIN_CHALLENGE_RESPONSE,
                          payload: _context5.t0.message
                        });

                      case 12:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[2, 9]]);
              }));

              return function loginChallengeListener(_x6) {
                return _ref6.apply(this, arguments);
              };
            }();

            window.addEventListener('message', loginChallengeListener, false);
            _context6.next = 6;
            return call(_objectSpread(_objectSpread({
              method: 'requestLogin'
            }, params), {}, {
              asyncChallenge: true,
              callback: null
            }));

          case 6:
            response = _context6.sent;
            window.removeEventListener('message', loginChallengeListener);
            return _context6.abrupt("return", response);

          case 9:
            return _context6.abrupt("return", call(_objectSpread({
              method: 'requestLogin'
            }, params)));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function requestLogin(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.requestLogin = requestLogin;

var disableWebUSB = function disableWebUSB() {
  iframe.postMessage({
    event: _constants.UI_EVENT,
    type: _constants.TRANSPORT.DISABLE_WEBUSB
  });
};

exports.disableWebUSB = disableWebUSB;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\env\\browser\\networkUtils.js", {"@babel/runtime/helpers/asyncToGenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\asyncToGenerator.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js","@babel/runtime/regenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\regenerator\\index.js","cross-fetch":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\cross-fetch\\dist\\browser-ponyfill.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\env\browser\networkUtils.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getOrigin = exports.httpRequest = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

var httpRequest = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, type) {
    var response, txt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (type === void 0) {
              type = 'text';
            }

            _context.next = 3;
            return (0, _crossFetch["default"])(url, {
              credentials: 'same-origin'
            });

          case 3:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 13;
              break;
            }

            if (!(type === 'json')) {
              _context.next = 10;
              break;
            }

            _context.next = 8;
            return response.text();

          case 8:
            txt = _context.sent;
            return _context.abrupt("return", JSON.parse(txt));

          case 10:
            if (!(type === 'binary')) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", response.arrayBuffer());

          case 12:
            return _context.abrupt("return", response.text());

          case 13:
            throw new Error("httpRequest error: " + url + " " + response.statusText);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function httpRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.httpRequest = httpRequest;

var getOrigin = function getOrigin(url) {
  if (url.indexOf('file://') === 0) return 'file://'; // eslint-disable-next-line no-useless-escape

  var parts = url.match(/^.+\:\/\/[^\/]+/);
  return Array.isArray(parts) && parts.length > 0 ? parts[0] : 'unknown';
};

exports.getOrigin = getOrigin;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\iframe\\builder.js", {"../constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\index.js","../env/browser/networkUtils":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\env\\browser\\networkUtils.js","../utils/deferred":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\utils\\deferred.js","./inline-styles":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\iframe\\inline-styles.js","@babel/runtime/helpers/asyncToGenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\asyncToGenerator.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js","@babel/runtime/regenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\regenerator\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\iframe\builder.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.clearTimeout = exports.dispose = exports.postMessage = exports.init = exports.messagePromises = exports.error = exports.timeout = exports.initPromise = exports.origin = exports.instance = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _deferred = require("../utils/deferred");

var _constants = require("../constants");

var _networkUtils = require("../env/browser/networkUtils");

var _inlineStyles = _interopRequireDefault(require("./inline-styles"));

/* eslint-disable import/no-mutable-exports */
var instance;
exports.instance = instance;
var origin;
exports.origin = origin;
var initPromise = (0, _deferred.create)();
exports.initPromise = initPromise;
var timeout = 0;
exports.timeout = timeout;
var error;
/* eslint-enable import/no-mutable-exports */

exports.error = error;
var _messageID = 0; // every postMessage to iframe has its own promise to resolve

var messagePromises = {};
exports.messagePromises = messagePromises;

var init = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(settings) {
    var existedFrame, src, manifestString, manifest, onLoad;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            exports.initPromise = initPromise = (0, _deferred.create)();
            existedFrame = document.getElementById('trezorconnect');

            if (existedFrame) {
              exports.instance = instance = existedFrame;
            } else {
              exports.instance = instance = document.createElement('iframe');
              instance.frameBorder = '0';
              instance.width = '0px';
              instance.height = '0px';
              instance.style.position = 'absolute';
              instance.style.display = 'none';
              instance.style.border = '0px';
              instance.style.width = '0px';
              instance.style.height = '0px';
              instance.id = 'trezorconnect';
            }

            if (settings.env === 'web') {
              manifestString = settings.manifest ? JSON.stringify(settings.manifest) : 'undefined'; // note: btoa(undefined) === btoa('undefined') === "dW5kZWZpbmVk"

              manifest = "version=" + settings.version + "&manifest=" + encodeURIComponent(btoa(JSON.stringify(manifestString)));
              src = settings.iframeSrc + "?" + manifest;
            } else {
              src = settings.iframeSrc;
            }

            instance.setAttribute('src', src);

            if (settings.webusb) {
              instance.setAttribute('allow', 'usb');
            }

            exports.origin = origin = (0, _networkUtils.getOrigin)(instance.src);
            exports.timeout = timeout = window.setTimeout(function () {
              initPromise.reject(_constants.ERRORS.TypedError('Init_IframeTimeout'));
            }, 10000);

            onLoad = function onLoad() {
              if (!instance) {
                initPromise.reject(_constants.ERRORS.TypedError('Init_IframeBlocked'));
                return;
              }

              try {
                // if hosting page is able to access cross-origin location it means that the iframe is not loaded
                var iframeOrigin = instance.contentWindow.location.origin;

                if (!iframeOrigin || iframeOrigin === 'null') {
                  // eslint-disable-next-line no-use-before-define
                  handleIframeBlocked();
                  return;
                }
              } catch (e) {// empty
              }

              var extension; // $FlowIssue chrome is not declared outside

              if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.onConnect !== 'undefined') {
                chrome.runtime.onConnect.addListener(function () {});
                extension = chrome.runtime.id;
              }

              instance.contentWindow.postMessage({
                type: _constants.IFRAME.INIT,
                payload: {
                  settings: settings,
                  extension: extension
                }
              }, origin);
              instance.onload = undefined;
            }; // IE hack


            if (instance.attachEvent) {
              instance.attachEvent('onload', onLoad);
            } else {
              instance.onload = onLoad;
            } // inject iframe into host document body


            if (document.body) {
              document.body.appendChild(instance); // eslint-disable-next-line no-use-before-define

              injectStyleSheet();
            }

            _context.prev = 11;
            _context.next = 14;
            return initPromise.promise;

          case 14:
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](11);

            // reset state to allow initialization again
            if (instance) {
              if (instance.parentNode) {
                instance.parentNode.removeChild(instance);
              }

              exports.instance = instance = null;
            }

            throw _context.t0;

          case 20:
            _context.prev = 20;
            window.clearTimeout(timeout);
            exports.timeout = timeout = 0;
            return _context.finish(20);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 16, 20, 24]]);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.init = init;

var injectStyleSheet = function injectStyleSheet() {
  if (!instance) {
    throw _constants.ERRORS.TypedError('Init_IframeBlocked');
  }

  var doc = instance.ownerDocument;
  var head = doc.head || doc.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('id', 'TrezorConnectStylesheet'); // $FlowIssue

  if (style.styleSheet) {
    // IE
    // $FlowIssue
    style.styleSheet.cssText = _inlineStyles["default"];
    head.appendChild(style);
  } else {
    style.appendChild(document.createTextNode(_inlineStyles["default"]));
    head.append(style);
  }
};

var handleIframeBlocked = function handleIframeBlocked() {
  window.clearTimeout(timeout);
  exports.error = error = _constants.ERRORS.TypedError('Init_IframeBlocked'); // eslint-disable-next-line no-use-before-define

  dispose();
  initPromise.reject(error);
}; // post messages to iframe


var postMessage = function postMessage(message, usePromise) {
  if (usePromise === void 0) {
    usePromise = true;
  }

  if (!instance) {
    throw _constants.ERRORS.TypedError('Init_IframeBlocked');
  }

  if (usePromise) {
    _messageID++;
    message.id = _messageID;
    messagePromises[_messageID] = (0, _deferred.create)();
    var promise = messagePromises[_messageID].promise;
    instance.contentWindow.postMessage(message, origin);
    return promise;
  }

  instance.contentWindow.postMessage(message, origin);
  return null;
};

exports.postMessage = postMessage;

var dispose = function dispose() {
  if (instance && instance.parentNode) {
    try {
      instance.parentNode.removeChild(instance);
    } catch (e) {// do nothing
    }
  }

  exports.instance = instance = null;
  exports.timeout = timeout = 0;
};

exports.dispose = dispose;

var clearTimeout = function clearTimeout() {
  window.clearTimeout(timeout);
};

exports.clearTimeout = clearTimeout;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\iframe\\inline-styles.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\iframe\inline-styles.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var css = '.trezorconnect-container{position:fixed!important;display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-webkit-flex-direction:column!important;-ms-flex-direction:column!important;flex-direction:column!important;-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important;z-index:10000!important;width:100%!important;height:100%!important;top:0!important;left:0!important;background:rgba(0,0,0,.35)!important;overflow:auto!important;padding:20px!important;margin:0!important}.trezorconnect-container .trezorconnect-window{position:relative!important;display:block!important;width:370px!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif!important;margin:auto!important;border-radius:3px!important;background-color:#fff!important;text-align:center!important;overflow:hidden!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head{text-align:left;padding:12px 24px!important;display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-logo{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-close{cursor:pointer!important;height:24px!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-close svg{fill:#757575;-webkit-transition:fill .3s ease-in-out!important;transition:fill .3s ease-in-out!important}.trezorconnect-container .trezorconnect-window .trezorconnect-head .trezorconnect-close:hover svg{fill:#494949}.trezorconnect-container .trezorconnect-window .trezorconnect-body{padding:24px 24px 32px!important;background:#FBFBFB!important;border-top:1px solid #EBEBEB}.trezorconnect-container .trezorconnect-window .trezorconnect-body h3{color:#505050!important;font-size:16px!important;font-weight:500!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body p{margin:8px 0 24px!important;font-weight:400!important;color:#A9A9A9!important;font-size:12px!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body button{width:100%!important;padding:12px 24px!important;margin:0!important;border-radius:3px!important;font-size:14px!important;font-weight:300!important;cursor:pointer!important;background:#01B757!important;color:#fff!important;border:0!important;-webkit-transition:background-color .3s ease-in-out!important;transition:background-color .3s ease-in-out!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body button:hover{background-color:#00AB51!important}.trezorconnect-container .trezorconnect-window .trezorconnect-body button:active{background-color:#009546!important}/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0IiwiJHN0ZGluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNBLHlCQUNJLFNBQUEsZ0JBQ0EsUUFBQSxzQkFDQSxRQUFBLHVCQUNBLFFBQUEsc0JBRUEsUUFBQSxlQUNBLG1CQUFBLG1CQUNBLHNCQUFBLGlCQUNBLHVCQUFBLGlCQUNBLG1CQUFBLGlCQUNBLGVBQUEsaUJBRUEsa0JBQUEsaUJBQ0Esb0JBQUEsaUJBQ0EsZUFBQSxpQkNmTSxZQUFhLGlCREFyQixRQUFTLGdCQWtCSCxNQUFBLGVBQ0EsT0FBQSxlQUNBLElBQUEsWUFDQSxLQUFBLFlBQ0EsV0FBQSwwQkFDQSxTQUFBLGVBQ0EsUUFBQSxlQUNBLE9BQUEsWUNkUiwrQ0RYRSxTQUFVLG1CQTZCQSxRQUFBLGdCQUNBLE1BQUEsZ0JBQ0EsWUFBQSxjQUFBLG1CQUFBLFdBQUEsT0FBQSxpQkFBQSxNQUFBLHFCQUNBLE9BQUEsZUNmVixjQUFlLGNEakJmLGlCQWlCRSxlQWtCWSxXQUFBLGlCQ2ZkLFNBQVUsaUJEbUJJLG1FQUNBLFdBQUEsS0NoQmQsUUFBUyxLQUFLLGVEeEJkLFFBQVMsc0JBMENTLFFBQUEsdUJBQ0EsUUFBQSxzQkNmbEIsUUFBUyxlRGlCSyxrQkE1QlosaUJBOEJvQixvQkFBQSxpQkNoQmxCLGVBQWdCLGlCRC9CWixZQWlCTixpQkFzQ1EsdUZBQ0EsaUJBQUEsRUNwQlYsYUFBYyxFRHBDVixTQUFVLEVBMkRBLEtBQUEsRUFFQSx3RkNwQmQsT0FBUSxrQkR6Q1IsT0FBUSxlQWlFTSw0RkFDQSxLQUFBLFFBQ0EsbUJBQUEsS0FBQSxJQUFBLHNCQ3BCZCxXQUFZLEtBQUssSUFBSyxzQkR3QlIsa0dBQ0EsS0FBQSxRQUVBLG1FQUNBLFFBQUEsS0FBQSxLQUFBLGVBQ0EsV0FBQSxrQkFDQSxXQUFBLElBQUEsTUFBQSxRQUVBLHNFQUNBLE1BQUEsa0JBQ0EsVUFBQSxlQ3JCZCxZQUFhLGNEd0JLLHFFQ3JCbEIsT0FBUSxJQUFJLEVBQUksZUR3QkYsWUFBQSxjQUNJLE1BQUEsa0JDdEJsQixVQUFXLGVBRWIsMEVBQ0UsTUFBTyxlQUNQLFFBQVMsS0FBSyxlQUNkLE9BQVEsWUFDUixjQUFlLGNBQ2YsVUFBVyxlQUNYLFlBQWEsY0FDYixPQUFRLGtCQUNSLFdBQVksa0JBQ1osTUFBTyxlQUNQLE9BQVEsWUFDUixtQkFBb0IsaUJBQWlCLElBQUssc0JBQzFDLFdBQVksaUJBQWlCLElBQUssc0JBRXBDLGdGQUNFLGlCQUFrQixrQkFFcEIsaUZBQ0UsaUJBQWtCIn0= */';
var _default = css;
exports["default"] = _default;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\index.js", {"./constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\index.js","./env/node":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\env\\browser\\index.js","./types":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\index.js","@babel/runtime/helpers/defineProperty":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\defineProperty.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\index.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
var _exportNames = {};
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  exports[key] = _constants[key];
});

var _node = require("./env/node");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TrezorConnect = {
  manifest: _node.manifest,
  init: _node.init,
  getSettings: _node.getSettings,
  on: function on(type, fn) {
    _node.eventEmitter.on(type, fn);
  },
  off: function off(type, fn) {
    _node.eventEmitter.removeListener(type, fn);
  },
  removeAllListeners: function removeAllListeners() {
    _node.eventEmitter.removeAllListeners();
  },
  uiResponse: _node.uiResponse,
  // methods
  blockchainGetAccountBalanceHistory: function blockchainGetAccountBalanceHistory(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainGetAccountBalanceHistory'
    }, params));
  },
  blockchainGetCurrentFiatRates: function blockchainGetCurrentFiatRates(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainGetCurrentFiatRates'
    }, params));
  },
  blockchainGetFiatRatesForTimestamps: function blockchainGetFiatRatesForTimestamps(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainGetFiatRatesForTimestamps'
    }, params));
  },
  blockchainDisconnect: function blockchainDisconnect(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainDisconnect'
    }, params));
  },
  blockchainEstimateFee: function blockchainEstimateFee(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainEstimateFee'
    }, params));
  },
  blockchainGetTransactions: function blockchainGetTransactions(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainGetTransactions'
    }, params));
  },
  blockchainSetCustomBackend: function blockchainSetCustomBackend(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainSetCustomBackend'
    }, params));
  },
  blockchainSubscribe: function blockchainSubscribe(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainSubscribe'
    }, params));
  },
  blockchainSubscribeFiatRates: function blockchainSubscribeFiatRates(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainSubscribeFiatRates'
    }, params));
  },
  blockchainUnsubscribe: function blockchainUnsubscribe(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainUnsubscribe'
    }, params));
  },
  blockchainUnsubscribeFiatRates: function blockchainUnsubscribeFiatRates(params) {
    return (0, _node.call)(_objectSpread({
      method: 'blockchainUnsubscribeFiatRates'
    }, params));
  },
  customMessage: function customMessage(params) {
    return (0, _node.customMessage)(params);
  },
  requestLogin: function requestLogin(params) {
    return (0, _node.requestLogin)(params);
  },
  cardanoGetAddress: function cardanoGetAddress(params) {
    var useEventListener = _node.eventEmitter.listenerCount(_constants.UI.ADDRESS_VALIDATION) > 0;
    return (0, _node.call)(_objectSpread(_objectSpread({
      method: 'cardanoGetAddress'
    }, params), {}, {
      useEventListener: useEventListener
    }));
  },
  cardanoGetNativeScriptHash: function cardanoGetNativeScriptHash(params) {
    return (0, _node.call)(_objectSpread({
      method: 'cardanoGetNativeScriptHash'
    }, params));
  },
  cardanoGetPublicKey: function cardanoGetPublicKey(params) {
    return (0, _node.call)(_objectSpread({
      method: 'cardanoGetPublicKey'
    }, params));
  },
  cardanoSignTransaction: function cardanoSignTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'cardanoSignTransaction'
    }, params));
  },
  cipherKeyValue: function cipherKeyValue(params) {
    return (0, _node.call)(_objectSpread({
      method: 'cipherKeyValue'
    }, params));
  },
  composeTransaction: function composeTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'composeTransaction'
    }, params));
  },
  ethereumGetAddress: function ethereumGetAddress(params) {
    var useEventListener = _node.eventEmitter.listenerCount(_constants.UI.ADDRESS_VALIDATION) > 0;
    return (0, _node.call)(_objectSpread(_objectSpread({
      method: 'ethereumGetAddress'
    }, params), {}, {
      useEventListener: useEventListener
    }));
  },
  ethereumGetPublicKey: function ethereumGetPublicKey(params) {
    return (0, _node.call)(_objectSpread({
      method: 'ethereumGetPublicKey'
    }, params));
  },
  ethereumSignMessage: function ethereumSignMessage(params) {
    return (0, _node.call)(_objectSpread({
      method: 'ethereumSignMessage'
    }, params));
  },
  ethereumSignTransaction: function ethereumSignTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'ethereumSignTransaction'
    }, params));
  },
  ethereumSignTypedData: function ethereumSignTypedData(params) {
    return (0, _node.call)(_objectSpread({
      method: 'ethereumSignTypedData'
    }, params));
  },
  ethereumVerifyMessage: function ethereumVerifyMessage(params) {
    return (0, _node.call)(_objectSpread({
      method: 'ethereumVerifyMessage'
    }, params));
  },
  getAccountInfo: function getAccountInfo(params) {
    return (0, _node.call)(_objectSpread({
      method: 'getAccountInfo'
    }, params));
  },
  getAddress: function getAddress(params) {
    var useEventListener = _node.eventEmitter.listenerCount(_constants.UI.ADDRESS_VALIDATION) > 0;
    return (0, _node.call)(_objectSpread(_objectSpread({
      method: 'getAddress'
    }, params), {}, {
      useEventListener: useEventListener
    }));
  },
  getDeviceState: function getDeviceState(params) {
    return (0, _node.call)(_objectSpread({
      method: 'getDeviceState'
    }, params));
  },
  getFeatures: function getFeatures(params) {
    return (0, _node.call)(_objectSpread({
      method: 'getFeatures'
    }, params));
  },
  getPublicKey: function getPublicKey(params) {
    return (0, _node.call)(_objectSpread({
      method: 'getPublicKey'
    }, params));
  },
  liskGetAddress: function liskGetAddress() {
    return (0, _node.call)({
      method: 'liskDeprecated'
    });
  },
  liskGetPublicKey: function liskGetPublicKey() {
    return (0, _node.call)({
      method: 'liskDeprecated'
    });
  },
  liskSignMessage: function liskSignMessage() {
    return (0, _node.call)({
      method: 'liskDeprecated'
    });
  },
  liskSignTransaction: function liskSignTransaction() {
    return (0, _node.call)({
      method: 'liskDeprecated'
    });
  },
  liskVerifyMessage: function liskVerifyMessage() {
    return (0, _node.call)({
      method: 'liskDeprecated'
    });
  },
  nemGetAddress: function nemGetAddress(params) {
    var useEventListener = _node.eventEmitter.listenerCount(_constants.UI.ADDRESS_VALIDATION) > 0;
    return (0, _node.call)(_objectSpread(_objectSpread({
      method: 'nemGetAddress'
    }, params), {}, {
      useEventListener: useEventListener
    }));
  },
  nemSignTransaction: function nemSignTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'nemSignTransaction'
    }, params));
  },
  pushTransaction: function pushTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'pushTransaction'
    }, params));
  },
  rippleGetAddress: function rippleGetAddress(params) {
    var useEventListener = _node.eventEmitter.listenerCount(_constants.UI.ADDRESS_VALIDATION) > 0;
    return (0, _node.call)(_objectSpread(_objectSpread({
      method: 'rippleGetAddress'
    }, params), {}, {
      useEventListener: useEventListener
    }));
  },
  rippleSignTransaction: function rippleSignTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'rippleSignTransaction'
    }, params));
  },
  signMessage: function signMessage(params) {
    return (0, _node.call)(_objectSpread({
      method: 'signMessage'
    }, params));
  },
  signTransaction: function signTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'signTransaction'
    }, params));
  },
  stellarGetAddress: function stellarGetAddress(params) {
    var useEventListener = _node.eventEmitter.listenerCount(_constants.UI.ADDRESS_VALIDATION) > 0;
    return (0, _node.call)(_objectSpread(_objectSpread({
      method: 'stellarGetAddress'
    }, params), {}, {
      useEventListener: useEventListener
    }));
  },
  stellarSignTransaction: function stellarSignTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'stellarSignTransaction'
    }, params));
  },
  tezosGetAddress: function tezosGetAddress(params) {
    var useEventListener = _node.eventEmitter.listenerCount(_constants.UI.ADDRESS_VALIDATION) > 0;
    return (0, _node.call)(_objectSpread(_objectSpread({
      method: 'tezosGetAddress'
    }, params), {}, {
      useEventListener: useEventListener
    }));
  },
  tezosGetPublicKey: function tezosGetPublicKey(params) {
    return (0, _node.call)(_objectSpread({
      method: 'tezosGetPublicKey'
    }, params));
  },
  tezosSignTransaction: function tezosSignTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'tezosSignTransaction'
    }, params));
  },
  eosGetPublicKey: function eosGetPublicKey(params) {
    return (0, _node.call)(_objectSpread({
      method: 'eosGetPublicKey'
    }, params));
  },
  eosSignTransaction: function eosSignTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'eosSignTransaction'
    }, params));
  },
  binanceGetAddress: function binanceGetAddress(params) {
    var useEventListener = _node.eventEmitter.listenerCount(_constants.UI.ADDRESS_VALIDATION) > 0;
    return (0, _node.call)(_objectSpread(_objectSpread({
      method: 'binanceGetAddress'
    }, params), {}, {
      useEventListener: useEventListener
    }));
  },
  binanceGetPublicKey: function binanceGetPublicKey(params) {
    return (0, _node.call)(_objectSpread({
      method: 'binanceGetPublicKey'
    }, params));
  },
  binanceSignTransaction: function binanceSignTransaction(params) {
    return (0, _node.call)(_objectSpread({
      method: 'binanceSignTransaction'
    }, params));
  },
  verifyMessage: function verifyMessage(params) {
    return (0, _node.call)(_objectSpread({
      method: 'verifyMessage'
    }, params));
  },
  resetDevice: function resetDevice(params) {
    return (0, _node.call)(_objectSpread({
      method: 'resetDevice'
    }, params));
  },
  wipeDevice: function wipeDevice(params) {
    return (0, _node.call)(_objectSpread({
      method: 'wipeDevice'
    }, params));
  },
  applyFlags: function applyFlags(params) {
    return (0, _node.call)(_objectSpread({
      method: 'applyFlags'
    }, params));
  },
  applySettings: function applySettings(params) {
    return (0, _node.call)(_objectSpread({
      method: 'applySettings'
    }, params));
  },
  backupDevice: function backupDevice(params) {
    return (0, _node.call)(_objectSpread({
      method: 'backupDevice'
    }, params));
  },
  changePin: function changePin(params) {
    return (0, _node.call)(_objectSpread({
      method: 'changePin'
    }, params));
  },
  firmwareUpdate: function firmwareUpdate(params) {
    return (0, _node.call)(_objectSpread({
      method: 'firmwareUpdate'
    }, params));
  },
  recoveryDevice: function recoveryDevice(params) {
    return (0, _node.call)(_objectSpread({
      method: 'recoveryDevice'
    }, params));
  },
  getCoinInfo: function getCoinInfo(params) {
    return (0, _node.call)(_objectSpread({
      method: 'getCoinInfo'
    }, params));
  },
  rebootToBootloader: function rebootToBootloader(params) {
    return (0, _node.call)(_objectSpread({
      method: 'rebootToBootloader'
    }, params));
  },
  dispose: _node.dispose,
  cancel: _node.cancel,
  renderWebUSBButton: _node.renderWebUSBButton,
  disableWebUSB: _node.disableWebUSB
};
var _default = TrezorConnect;
exports["default"] = _default;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\message\\builder.js", {"../constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\index.js","@babel/runtime/helpers/defineProperty":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\defineProperty.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\message\builder.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.BlockchainMessage = exports.ResponseMessage = exports.TransportMessage = exports.DeviceMessage = exports.UiMessage = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var UiMessage = function UiMessage(type, payload) {
  return {
    event: _constants.UI_EVENT,
    type: type,
    payload: payload
  };
};

exports.UiMessage = UiMessage;

var DeviceMessage = function DeviceMessage(type, payload) {
  return {
    event: _constants.DEVICE_EVENT,
    type: type,
    payload: payload
  };
};

exports.DeviceMessage = DeviceMessage;

var TransportMessage = function TransportMessage(type, payload) {
  return {
    event: _constants.TRANSPORT_EVENT,
    type: type,
    // convert Error/TypeError object into payload error type (Error object/class is converted to string while sent via postMessage)
    payload: payload.error ? _objectSpread(_objectSpread({}, payload), {}, {
      error: payload.error.message,
      code: payload.error.code
    }) : payload
  };
};

exports.TransportMessage = TransportMessage;

var ResponseMessage = function ResponseMessage(id, success, payload) {
  if (payload === void 0) {
    payload = null;
  }

  return {
    event: _constants.RESPONSE_EVENT,
    type: _constants.RESPONSE_EVENT,
    id: id,
    success: success,
    // convert Error/TypeError object into payload error type (Error object/class is converted to string while sent via postMessage)
    payload: success ? payload : {
      error: payload.error.message,
      code: payload.error.code
    }
  };
};

exports.ResponseMessage = ResponseMessage;

var BlockchainMessage = function BlockchainMessage(type, payload) {
  return {
    event: _constants.BLOCKCHAIN_EVENT,
    type: type,
    payload: payload
  };
};

exports.BlockchainMessage = BlockchainMessage;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\message\\index.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\message\index.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.errorMessage = exports.parseMessage = void 0;

// parse MessageEvent .data into CoreMessage
var parseMessage = function parseMessage(messageData) {
  var message = {
    event: messageData.event,
    type: messageData.type,
    payload: messageData.payload
  };

  if (typeof messageData.id === 'number') {
    message.id = messageData.id;
  }

  if (typeof messageData.success === 'boolean') {
    message.success = messageData.success;
  }

  return message;
}; // common response used straight from npm index (not from Core)


exports.parseMessage = parseMessage;

var errorMessage = function errorMessage(error) {
  return {
    success: false,
    payload: {
      error: error.message,
      code: error.code
    }
  };
};

exports.errorMessage = errorMessage;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\plugins\\ethereum\\typedData.js", {"@babel/runtime/helpers/defineProperty":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\defineProperty.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js","@metamask/eth-sig-util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@metamask\\eth-sig-util\\dist\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\plugins\ethereum\typedData.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// eslint-disable-next-line import/no-unresolved
var sigUtil = require('@metamask/eth-sig-util'); // Sanitization is used for T1 as eth-sig-util does not support BigInt


function sanitizeData(data) {
  switch (Object.prototype.toString.call(data)) {
    case '[object Object]':
      {
        var entries = Object.keys(data).map(function (k) {
          return [k, sanitizeData(data[k])];
        });
        return Object.fromEntries(entries);
      }

    case '[object Array]':
      return data.map(function (v) {
        return sanitizeData(v);
      });

    case '[object BigInt]':
      return data.toString();

    default:
      return data;
  }
}

var transformTypedData = function transformTypedData(data, metamask_v4_compat) {
  if (!metamask_v4_compat) {
    throw new Error('Trezor: Only version 4 of typed data signing is supported');
  }

  var version = sigUtil.SignTypedDataVersion.V4;

  var _sigUtil$TypedDataUti = sigUtil.TypedDataUtils.sanitizeData(data),
      types = _sigUtil$TypedDataUti.types,
      primaryType = _sigUtil$TypedDataUti.primaryType,
      domain = _sigUtil$TypedDataUti.domain,
      message = _sigUtil$TypedDataUti.message;

  var domainSeparatorHash = sigUtil.TypedDataUtils.hashStruct('EIP712Domain', sanitizeData(domain), types, version).toString('hex');
  var messageHash = sigUtil.TypedDataUtils.hashStruct(primaryType, sanitizeData(message), types, version).toString('hex');
  return _objectSpread({
    domain_separator_hash: domainSeparatorHash,
    message_hash: messageHash
  }, data);
};

module.exports = transformTypedData;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\popup\\PopupManager.js", {"../constants/iframe":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\iframe.js","../constants/popup":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\popup.js","../constants/ui":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\ui.js","../env/browser/networkUtils":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\env\\browser\\networkUtils.js","../utils/deferred":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\utils\\deferred.js","./showPopupRequest":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\popup\\showPopupRequest.js","@babel/runtime/helpers/assertThisInitialized":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\assertThisInitialized.js","@babel/runtime/helpers/asyncToGenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\asyncToGenerator.js","@babel/runtime/helpers/defineProperty":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\defineProperty.js","@babel/runtime/helpers/inheritsLoose":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\inheritsLoose.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js","@babel/runtime/regenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\regenerator\\index.js","events":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\browserify\\node_modules\\events\\events.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\popup\PopupManager.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _events = _interopRequireDefault(require("events"));

var POPUP = _interopRequireWildcard(require("../constants/popup"));

var IFRAME = _interopRequireWildcard(require("../constants/iframe"));

var UI = _interopRequireWildcard(require("../constants/ui"));

var _showPopupRequest = require("./showPopupRequest");

var _networkUtils = require("../env/browser/networkUtils");

var _deferred = require("../utils/deferred");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// const POPUP_REQUEST_TIMEOUT = 602;
var POPUP_REQUEST_TIMEOUT = 850;
var POPUP_CLOSE_INTERVAL = 500;
var POPUP_OPEN_TIMEOUT = 3000;

var PopupManager = /*#__PURE__*/function (_EventEmitter) {
  (0, _inheritsLoose2["default"])(PopupManager, _EventEmitter);

  // Window
  function PopupManager(settings) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "requestTimeout", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "closeInterval", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "extensionTabId", 0);
    _this.settings = settings;
    _this.origin = (0, _networkUtils.getOrigin)(settings.popupSrc);
    _this.handleMessage = _this.handleMessage.bind((0, _assertThisInitialized2["default"])(_this));
    _this.iframeHandshake = (0, _deferred.create)(IFRAME.LOADED);

    if (_this.settings.env === 'webextension') {
      _this.handleExtensionConnect = _this.handleExtensionConnect.bind((0, _assertThisInitialized2["default"])(_this));
      _this.handleExtensionMessage = _this.handleExtensionMessage.bind((0, _assertThisInitialized2["default"])(_this)); // $FlowIssue chrome not declared outside

      chrome.runtime.onConnect.addListener(_this.handleExtensionConnect);
    }

    window.addEventListener('message', _this.handleMessage, false);
    return _this;
  }

  var _proto = PopupManager.prototype;

  _proto.request = function request(lazyLoad) {
    var _this2 = this;

    if (lazyLoad === void 0) {
      lazyLoad = false;
    }

    // popup request
    // TODO: ie - open immediately and hide it but post handshake after timeout
    // bring popup window to front
    if (this.locked) {
      if (this._window) {
        if (this.settings.env === 'webextension') {
          // $FlowIssue chrome not declared outside
          chrome.tabs.update(this._window.id, {
            active: true
          });
        } else {
          this._window.focus();
        }
      }

      return;
    }

    var openFn = this.open.bind(this);
    this.locked = true;

    if (!this.settings.supportedBrowser) {
      openFn();
    } else {
      var timeout = lazyLoad || this.settings.env === 'webextension' ? 1 : POPUP_REQUEST_TIMEOUT;
      this.requestTimeout = window.setTimeout(function () {
        _this2.requestTimeout = 0;
        openFn(lazyLoad);
      }, timeout);
    }
  };

  _proto.cancel = function cancel() {
    this.close();
  };

  _proto.unlock = function unlock() {
    this.locked = false;
  };

  _proto.open = function open(lazyLoad) {
    var _this3 = this;

    var src = this.settings.popupSrc;

    if (!this.settings.supportedBrowser) {
      this.openWrapper(src + "#unsupported");
      return;
    }

    this.popupPromise = (0, _deferred.create)(POPUP.LOADED);
    this.openWrapper(lazyLoad ? src + "#loading" : src);
    this.closeInterval = window.setInterval(function () {
      if (!_this3._window) return;

      if (_this3.settings.env === 'webextension') {
        // $FlowIssue chrome not declared outside
        chrome.tabs.get(_this3._window.id, function (tab) {
          if (!tab) {
            _this3.close();

            _this3.emit(POPUP.CLOSED);
          }
        });
      } else if (_this3._window.closed) {
        _this3.close();

        _this3.emit(POPUP.CLOSED);
      }
    }, POPUP_CLOSE_INTERVAL); // open timeout will be cancelled by POPUP.BOOTSTRAP message

    this.openTimeout = window.setTimeout(function () {
      _this3.close();

      (0, _showPopupRequest.showPopupRequest)(_this3.open.bind(_this3), function () {
        _this3.emit(POPUP.CLOSED);
      });
    }, POPUP_OPEN_TIMEOUT);
  };

  _proto.openWrapper = function openWrapper(url) {
    var _this4 = this;

    if (this.settings.env === 'webextension') {
      // $FlowIssue chrome not declared outside
      chrome.windows.getCurrent(null, function (currentWindow) {
        // Request coming from extension popup,
        // create new window above instead of opening new tab
        if (currentWindow.type !== 'normal') {
          // $FlowIssue chrome not declared outside
          chrome.windows.create({
            url: url
          }, function (newWindow) {
            // $FlowIssue chrome not declared outside
            chrome.tabs.query({
              windowId: newWindow.id,
              active: true
            }, function (tabs) {
              // eslint-disable-next-line prefer-destructuring
              _this4._window = tabs[0];
            });
          });
        } else {
          // $FlowIssue chrome not declared outside
          chrome.tabs.query({
            currentWindow: true,
            active: true
          }, function (tabs) {
            _this4.extensionTabId = tabs[0].id; // $FlowIssue chrome not declared outside

            chrome.tabs.create({
              url: url,
              index: tabs[0].index + 1
            }, function (tab) {
              _this4._window = tab;
            });
          });
        }
      });
    } else if (this.settings.env === 'electron') {
      this._window = window.open(url, 'modal');
    } else {
      this._window = window.open('', '_blank');

      if (this._window) {
        this._window.location.href = url; // otherwise android/chrome loose window.opener reference
      }
    }
  };

  _proto.handleExtensionConnect = function handleExtensionConnect(port) {
    if (port.name !== 'trezor-connect') return;

    if (!this._window || this._window && this._window.id !== port.sender.tab.id) {
      port.disconnect();
      return;
    } // since POPUP.BOOTSTRAP will not be handled by "handleMessage" we need to threat "content-script" connection as the same event
    // popup is opened properly, now wait for POPUP.LOADED message (in this case handled by "handleExtensionMessage")


    window.clearTimeout(this.openTimeout);
    this.extensionPort = port; // $FlowIssue need to update ChromePort definition

    this.extensionPort.onMessage.addListener(this.handleExtensionMessage);
  };

  _proto.handleExtensionMessage = function handleExtensionMessage(message) {
    var _this5 = this;

    if (!this.extensionPort) return;
    var port = this.extensionPort;
    var data = message.data;
    if (!data || typeof data !== 'object') return;

    if (data.type === POPUP.ERROR) {
      // handle popup error
      var errorMessage = data.payload && typeof data.payload.error === 'string' ? data.payload.error : null;
      this.emit(POPUP.CLOSED, errorMessage ? "Popup error: " + errorMessage : null);
      this.close();
    } else if (data.type === POPUP.LOADED) {
      if (this.popupPromise) {
        this.popupPromise.resolve();
      }

      this.iframeHandshake.promise.then(function (useBroadcastChannel) {
        port.postMessage({
          type: POPUP.INIT,
          payload: {
            settings: _this5.settings,
            useBroadcastChannel: useBroadcastChannel
          }
        });
      });
    } else if (data.type === POPUP.EXTENSION_USB_PERMISSIONS) {
      // $FlowIssue chrome not declared outside
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, function (tabs) {
        // $FlowIssue chrome not declared outside
        chrome.tabs.create({
          url: 'trezor-usb-permissions.html',
          index: tabs[0].index + 1
        }, function (_tab) {// do nothing
        });
      });
    } else if (data.type === POPUP.CLOSE_WINDOW) {
      this.emit(POPUP.CLOSED);
      this.close();
    }
  };

  _proto.handleMessage = function handleMessage(message) {
    var _this6 = this;

    // ignore messages from domain other then popup origin and without data
    // const data: CoreMessage = message.data;
    var data = message.data;
    if ((0, _networkUtils.getOrigin)(message.origin) !== this.origin || !data || typeof data !== 'object') return;

    if (data.type === IFRAME.LOADED) {
      var useBroadcastChannel = data.payload && typeof data.payload.useBroadcastChannel === 'boolean' ? data.payload.useBroadcastChannel : false;
      this.iframeHandshake.resolve(useBroadcastChannel);
    } else if (data.type === POPUP.BOOTSTRAP) {
      // popup is opened properly, now wait for POPUP.LOADED message
      window.clearTimeout(this.openTimeout);
    } else if (data.type === POPUP.ERROR && this._window) {
      var errorMessage = data.payload && typeof data.payload.error === 'string' ? data.payload.error : null;
      this.emit(POPUP.CLOSED, errorMessage ? "Popup error: " + errorMessage : null);
      this.close();
    } else if (data.type === POPUP.LOADED) {
      if (this.popupPromise) {
        this.popupPromise.resolve();
      } // popup is successfully loaded


      this.iframeHandshake.promise.then(function (useBroadcastChannel) {
        _this6._window.postMessage({
          type: POPUP.INIT,
          payload: {
            settings: _this6.settings,
            useBroadcastChannel: useBroadcastChannel
          }
        }, _this6.origin);
      }); // send ConnectSettings to popup
      // note this settings and iframe.ConnectSettings could be different (especially: origin, popup, webusb, debug)
      // now popup is able to load assets
    } else if (data.type === POPUP.CANCEL_POPUP_REQUEST || data.type === UI.CLOSE_UI_WINDOW) {
      this.close();
    }
  };

  _proto.close = function close() {
    this.locked = false;
    this.popupPromise = undefined;

    if (this.requestTimeout) {
      window.clearTimeout(this.requestTimeout);
      this.requestTimeout = 0;
    }

    if (this.openTimeout) {
      window.clearTimeout(this.openTimeout);
      this.openTimeout = 0;
    }

    if (this.closeInterval) {
      window.clearInterval(this.closeInterval);
      this.closeInterval = 0;
    }

    if (this.extensionPort) {
      this.extensionPort.disconnect();
      this.extensionPort = null;
    } // switch to previously focused tab


    if (this.extensionTabId) {
      // $FlowIssue chrome not declared outside
      chrome.tabs.update(this.extensionTabId, {
        active: true
      });
      this.extensionTabId = 0;
    }

    if (this._window) {
      if (this.settings.env === 'webextension') {
        // eslint-disable-next-line no-unused-vars
        var _e = chrome.runtime.lastError; // $FlowIssue chrome not declared outside

        chrome.tabs.remove(this._window.id, function () {
          // eslint-disable-next-line no-unused-vars
          _e = chrome.runtime.lastError;
        });
      } else {
        this._window.close();
      }

      this._window = null;
    }
  };

  _proto.postMessage = /*#__PURE__*/function () {
    var _postMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(message) {
      var _this7 = this;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this._window && message.type !== UI.REQUEST_UI_WINDOW && this.openTimeout)) {
                _context.next = 4;
                break;
              }

              this.close();
              (0, _showPopupRequest.showPopupRequest)(this.open.bind(this), function () {
                _this7.emit(POPUP.CLOSED);
              });
              return _context.abrupt("return");

            case 4:
              if (!this.popupPromise) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return this.popupPromise.promise;

            case 7:
              // post message to popup window
              if (this._window) {
                this._window.postMessage(message, this.origin);
              }

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function postMessage(_x) {
      return _postMessage.apply(this, arguments);
    }

    return postMessage;
  }();

  return PopupManager;
}(_events["default"]);

exports["default"] = PopupManager;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\popup\\showPopupRequest.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\popup\showPopupRequest.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.showPopupRequest = void 0;
var LAYER_ID = 'TrezorConnectInteractionLayer';
var HTML = "\n    <div class=\"trezorconnect-container\" id=\"" + LAYER_ID + "\">\n        <div class=\"trezorconnect-window\">\n            <div class=\"trezorconnect-head\">\n                <svg class=\"trezorconnect-logo\" x=\"0px\" y=\"0px\" viewBox=\"0 0 163.7 41.9\" width=\"78px\" height=\"20px\" preserveAspectRatio=\"xMinYMin meet\">\n                    <polygon points=\"101.1,12.8 118.2,12.8 118.2,17.3 108.9,29.9 118.2,29.9 118.2,35.2 101.1,35.2 101.1,30.7 110.4,18.1 101.1,18.1\"/>\n                    <path d=\"M158.8,26.9c2.1-0.8,4.3-2.9,4.3-6.6c0-4.5-3.1-7.4-7.7-7.4h-10.5v22.3h5.8v-7.5h2.2l4.1,7.5h6.7L158.8,26.9z M154.7,22.5 h-4V18h4c1.5,0,2.5,0.9,2.5,2.2C157.2,21.6,156.2,22.5,154.7,22.5z\"/>\n                    <path d=\"M130.8,12.5c-6.8,0-11.6,4.9-11.6,11.5s4.9,11.5,11.6,11.5s11.7-4.9,11.7-11.5S137.6,12.5,130.8,12.5z M130.8,30.3 c-3.4,0-5.7-2.6-5.7-6.3c0-3.8,2.3-6.3,5.7-6.3c3.4,0,5.8,2.6,5.8,6.3C136.6,27.7,134.2,30.3,130.8,30.3z\"/>\n                    <polygon points=\"82.1,12.8 98.3,12.8 98.3,18 87.9,18 87.9,21.3 98,21.3 98,26.4 87.9,26.4 87.9,30 98.3,30 98.3,35.2 82.1,35.2 \"/>\n                    <path d=\"M24.6,9.7C24.6,4.4,20,0,14.4,0S4.2,4.4,4.2,9.7v3.1H0v22.3h0l14.4,6.7l14.4-6.7h0V12.9h-4.2V9.7z M9.4,9.7 c0-2.5,2.2-4.5,5-4.5s5,2,5,4.5v3.1H9.4V9.7z M23,31.5l-8.6,4l-8.6-4V18.1H23V31.5z\"/>\n                    <path d=\"M79.4,20.3c0-4.5-3.1-7.4-7.7-7.4H61.2v22.3H67v-7.5h2.2l4.1,7.5H80l-4.9-8.3C77.2,26.1,79.4,24,79.4,20.3z M71,22.5h-4V18 h4c1.5,0,2.5,0.9,2.5,2.2C73.5,21.6,72.5,22.5,71,22.5z\"/>\n                    <polygon points=\"40.5,12.8 58.6,12.8 58.6,18.1 52.4,18.1 52.4,35.2 46.6,35.2 46.6,18.1 40.5,18.1 \"/>\n                </svg>\n                <div class=\"trezorconnect-close\">\n                    <svg x=\"0px\" y=\"0px\" viewBox=\"24 24 60 60\" width=\"24px\" height=\"24px\" preserveAspectRatio=\"xMinYMin meet\">\n                        <polygon class=\"st0\" points=\"40,67.9 42.1,70 55,57.1 67.9,70 70,67.9 57.1,55 70,42.1 67.9,40 55,52.9 42.1,40 40,42.1 52.9,55 \"/>\n                    </svg>\n                </div>\n            </div>\n            <div class=\"trezorconnect-body\">\n                <h3>Popup was blocked</h3>\n                <p>Please click to \u201CContinue\u201D to open popup manually</p>\n                <button class=\"trezorconnect-open\">Continue</button>\n            </div>\n        </div>\n    </div>\n";

var showPopupRequest = function showPopupRequest(open, cancel) {
  if (document.getElementById(LAYER_ID)) {
    return;
  }

  var div = document.createElement('div');
  div.id = LAYER_ID;
  div.className = 'trezorconnect-container';
  div.innerHTML = HTML;

  if (document.body) {
    document.body.appendChild(div);
  }

  var button = div.getElementsByClassName('trezorconnect-open')[0];

  button.onclick = function () {
    open();

    if (document.body) {
      document.body.removeChild(div);
    }
  };

  var close = div.getElementsByClassName('trezorconnect-close')[0];

  close.onclick = function () {
    cancel();

    if (document.body) {
      document.body.removeChild(div);
    }
  };
};

exports.showPopupRequest = showPopupRequest;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\account.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\account.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\api.js", {"../constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\index.js","./account":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\account.js","./backend/blockchain":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\backend\\blockchain.js","./events":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\events.js","./misc":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\misc.js","./networks/binance":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\binance.js","./networks/bitcoin":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\bitcoin.js","./networks/cardano":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\cardano.js","./networks/coinInfo":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\coinInfo.js","./networks/eos":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\eos.js","./networks/ethereum":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\ethereum.js","./networks/nem":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\nem.js","./networks/ripple":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\ripple.js","./networks/stellar":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\stellar.js","./networks/tezos":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\tezos.js","./params":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\params.js","./trezor/device":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\trezor\\device.js","./trezor/management":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\trezor\\management.js","./trezor/protobuf":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\trezor\\protobuf.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\api.js
      return function (require, module, exports) {
"use strict";

var CONSTANTS = _interopRequireWildcard(require("../constants"));

var P = _interopRequireWildcard(require("./params"));

var Device = _interopRequireWildcard(require("./trezor/device"));

var Mgmnt = _interopRequireWildcard(require("./trezor/management"));

var Protobuf = _interopRequireWildcard(require("./trezor/protobuf"));

var Account = _interopRequireWildcard(require("./account"));

var Bitcoin = _interopRequireWildcard(require("./networks/bitcoin"));

var Binance = _interopRequireWildcard(require("./networks/binance"));

var Cardano = _interopRequireWildcard(require("./networks/cardano"));

var CoinInfo = _interopRequireWildcard(require("./networks/coinInfo"));

var EOS = _interopRequireWildcard(require("./networks/eos"));

var Ethereum = _interopRequireWildcard(require("./networks/ethereum"));

var NEM = _interopRequireWildcard(require("./networks/nem"));

var Ripple = _interopRequireWildcard(require("./networks/ripple"));

var Stellar = _interopRequireWildcard(require("./networks/stellar"));

var Tezos = _interopRequireWildcard(require("./networks/tezos"));

var Misc = _interopRequireWildcard(require("./misc"));

var Events = _interopRequireWildcard(require("./events"));

var Blockchain = _interopRequireWildcard(require("./backend/blockchain"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\backend\\blockchain.js", {"../../constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\backend\blockchain.js
      return function (require, module, exports) {
"use strict";

var _constants = require("../../constants");
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\backend\\transactions.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\backend\transactions.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\events.js", {"../constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\events.js
      return function (require, module, exports) {
"use strict";

var _constants = require("../constants");
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\index.js", {"./account":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\account.js","./api":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\api.js","./backend/blockchain":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\backend\\blockchain.js","./backend/transactions":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\backend\\transactions.js","./events":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\events.js","./misc":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\misc.js","./networks/binance":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\binance.js","./networks/bitcoin":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\bitcoin.js","./networks/cardano":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\cardano.js","./networks/coinInfo":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\coinInfo.js","./networks/eos":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\eos.js","./networks/ethereum":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\ethereum.js","./networks/nem":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\nem.js","./networks/ripple":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\ripple.js","./networks/stellar":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\stellar.js","./networks/tezos":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\tezos.js","./params":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\params.js","./trezor/device":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\trezor\\device.js","./trezor/management":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\trezor\\management.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\index.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _api[key]) return;
  exports[key] = _api[key];
});

var _events = require("./events");

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _events[key]) return;
  exports[key] = _events[key];
});

var _misc = require("./misc");

Object.keys(_misc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _misc[key]) return;
  exports[key] = _misc[key];
});

var _params = require("./params");

Object.keys(_params).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _params[key]) return;
  exports[key] = _params[key];
});

var _account = require("./account");

Object.keys(_account).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _account[key]) return;
  exports[key] = _account[key];
});

var _device = require("./trezor/device");

Object.keys(_device).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _device[key]) return;
  exports[key] = _device[key];
});

var _management = require("./trezor/management");

Object.keys(_management).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _management[key]) return;
  exports[key] = _management[key];
});

var _bitcoin = require("./networks/bitcoin");

Object.keys(_bitcoin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _bitcoin[key]) return;
  exports[key] = _bitcoin[key];
});

var _binance = require("./networks/binance");

Object.keys(_binance).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _binance[key]) return;
  exports[key] = _binance[key];
});

var _cardano = require("./networks/cardano");

Object.keys(_cardano).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cardano[key]) return;
  exports[key] = _cardano[key];
});

var _coinInfo = require("./networks/coinInfo");

Object.keys(_coinInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _coinInfo[key]) return;
  exports[key] = _coinInfo[key];
});

var _eos = require("./networks/eos");

Object.keys(_eos).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eos[key]) return;
  exports[key] = _eos[key];
});

var _ethereum = require("./networks/ethereum");

Object.keys(_ethereum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ethereum[key]) return;
  exports[key] = _ethereum[key];
});

var _nem = require("./networks/nem");

Object.keys(_nem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _nem[key]) return;
  exports[key] = _nem[key];
});

var _ripple = require("./networks/ripple");

Object.keys(_ripple).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ripple[key]) return;
  exports[key] = _ripple[key];
});

var _stellar = require("./networks/stellar");

Object.keys(_stellar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _stellar[key]) return;
  exports[key] = _stellar[key];
});

var _tezos = require("./networks/tezos");

Object.keys(_tezos).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tezos[key]) return;
  exports[key] = _tezos[key];
});

var _blockchain = require("./backend/blockchain");

Object.keys(_blockchain).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _blockchain[key]) return;
  exports[key] = _blockchain[key];
});

var _transactions = require("./backend/transactions");

Object.keys(_transactions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transactions[key]) return;
  exports[key] = _transactions[key];
});
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\misc.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\misc.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\binance.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\binance.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\bitcoin.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\bitcoin.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\cardano.js", {"../trezor/protobuf":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\trezor\\protobuf.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\cardano.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.CardanoTxWitnessType = exports.CardanoTxSigningMode = exports.CardanoPoolRelayType = exports.CardanoNativeScriptHashDisplayFormat = exports.CardanoNativeScriptType = exports.CardanoCertificateType = exports.CardanoAddressType = void 0;

var _protobuf = require("../trezor/protobuf");

exports.CardanoAddressType = _protobuf.Enum_CardanoAddressType;
exports.CardanoCertificateType = _protobuf.Enum_CardanoCertificateType;
exports.CardanoNativeScriptType = _protobuf.Enum_CardanoNativeScriptType;
exports.CardanoNativeScriptHashDisplayFormat = _protobuf.Enum_CardanoNativeScriptHashDisplayFormat;
exports.CardanoPoolRelayType = _protobuf.Enum_CardanoPoolRelayType;
exports.CardanoTxSigningMode = _protobuf.Enum_CardanoTxSigningMode;
exports.CardanoTxWitnessType = _protobuf.Enum_CardanoTxWitnessType;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\coinInfo.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\coinInfo.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\eos.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\eos.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\ethereum.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\ethereum.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\nem.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\nem.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\ripple.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\ripple.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\stellar.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\stellar.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\networks\\tezos.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\networks\tezos.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\params.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\params.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\trezor\\device.js", {"../../constants":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\constants\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\trezor\device.js
      return function (require, module, exports) {
"use strict";

var _constants = require("../../constants");
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\trezor\\management.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\trezor\management.js
      return function (require, module, exports) {
"use strict";
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\types\\trezor\\protobuf.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\types\trezor\protobuf.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.Enum_TezosBallotType = exports.Enum_TezosContractType = exports.Enum_StellarSignerType = exports.Enum_StellarMemoType = exports.Enum_StellarAssetType = exports.Enum_NEMImportanceTransferMode = exports.Enum_NEMModificationType = exports.Enum_NEMSupplyChangeType = exports.Enum_NEMMosaicLevy = exports.Enum_WordRequestType = exports.Enum_RecoveryDeviceType = exports.Enum_SdProtectOperationType = exports.Enum_Capability = exports.Enum_SafetyCheckLevel = exports.Enum_BackupType = exports.Enum_EthereumDataType = exports.Enum_PinMatrixRequestType = exports.Enum_ButtonRequestType = exports.Enum_FailureType = exports.Enum_CardanoTxWitnessType = exports.Enum_CardanoTxSigningMode = exports.Enum_CardanoTxAuxiliaryDataSupplementType = exports.Enum_CardanoPoolRelayType = exports.Enum_CardanoCertificateType = exports.Enum_CardanoNativeScriptHashDisplayFormat = exports.Enum_CardanoNativeScriptType = exports.Enum_CardanoAddressType = exports.Enum_CardanoDerivationType = exports.Enum_RequestType = exports.Enum_AmountUnit = exports.Enum_DecredStakingSpendType = exports.Enum_OutputScriptType = exports.Enum_InputScriptType = exports.Enum_BinanceTimeInForce = exports.Enum_BinanceOrderSide = exports.Enum_BinanceOrderType = void 0;
// This file is auto generated from data/messages/message.json
// custom type uint32/64 may be represented as string
// BinanceGetAddress
// BinanceAddress
// BinanceGetPublicKey
// BinancePublicKey
// BinanceSignTx
// BinanceTxRequest
// BinanceTransferMsg
var Enum_BinanceOrderType = Object.freeze({
  OT_UNKNOWN: 0,
  MARKET: 1,
  LIMIT: 2,
  OT_RESERVED: 3
});
exports.Enum_BinanceOrderType = Enum_BinanceOrderType;
var Enum_BinanceOrderSide = Object.freeze({
  SIDE_UNKNOWN: 0,
  BUY: 1,
  SELL: 2
});
exports.Enum_BinanceOrderSide = Enum_BinanceOrderSide;
var Enum_BinanceTimeInForce = Object.freeze({
  TIF_UNKNOWN: 0,
  GTE: 1,
  TIF_RESERVED: 2,
  IOC: 3
});
exports.Enum_BinanceTimeInForce = Enum_BinanceTimeInForce;
var Enum_InputScriptType = Object.freeze({
  SPENDADDRESS: 0,
  SPENDMULTISIG: 1,
  EXTERNAL: 2,
  SPENDWITNESS: 3,
  SPENDP2SHWITNESS: 4,
  SPENDTAPROOT: 5
});
exports.Enum_InputScriptType = Enum_InputScriptType;
var Enum_OutputScriptType = Object.freeze({
  PAYTOADDRESS: 0,
  PAYTOSCRIPTHASH: 1,
  PAYTOMULTISIG: 2,
  PAYTOOPRETURN: 3,
  PAYTOWITNESS: 4,
  PAYTOP2SHWITNESS: 5,
  PAYTOTAPROOT: 6
});
exports.Enum_OutputScriptType = Enum_OutputScriptType;
var Enum_DecredStakingSpendType = Object.freeze({
  SSGen: 0,
  SSRTX: 1
});
exports.Enum_DecredStakingSpendType = Enum_DecredStakingSpendType;
var Enum_AmountUnit = Object.freeze({
  BITCOIN: 0,
  MILLIBITCOIN: 1,
  MICROBITCOIN: 2,
  SATOSHI: 3
});
exports.Enum_AmountUnit = Enum_AmountUnit;
var Enum_RequestType = Object.freeze({
  TXINPUT: 0,
  TXOUTPUT: 1,
  TXMETA: 2,
  TXFINISHED: 3,
  TXEXTRADATA: 4,
  TXORIGINPUT: 5,
  TXORIGOUTPUT: 6
});
exports.Enum_RequestType = Enum_RequestType;
var Enum_CardanoDerivationType = Object.freeze({
  LEDGER: 0,
  ICARUS: 1,
  ICARUS_TREZOR: 2
});
exports.Enum_CardanoDerivationType = Enum_CardanoDerivationType;
var Enum_CardanoAddressType = Object.freeze({
  BASE: 0,
  BASE_SCRIPT_KEY: 1,
  BASE_KEY_SCRIPT: 2,
  BASE_SCRIPT_SCRIPT: 3,
  POINTER: 4,
  POINTER_SCRIPT: 5,
  ENTERPRISE: 6,
  ENTERPRISE_SCRIPT: 7,
  BYRON: 8,
  REWARD: 14,
  REWARD_SCRIPT: 15
});
exports.Enum_CardanoAddressType = Enum_CardanoAddressType;
var Enum_CardanoNativeScriptType = Object.freeze({
  PUB_KEY: 0,
  ALL: 1,
  ANY: 2,
  N_OF_K: 3,
  INVALID_BEFORE: 4,
  INVALID_HEREAFTER: 5
});
exports.Enum_CardanoNativeScriptType = Enum_CardanoNativeScriptType;
var Enum_CardanoNativeScriptHashDisplayFormat = Object.freeze({
  HIDE: 0,
  BECH32: 1,
  POLICY_ID: 2
});
exports.Enum_CardanoNativeScriptHashDisplayFormat = Enum_CardanoNativeScriptHashDisplayFormat;
var Enum_CardanoCertificateType = Object.freeze({
  STAKE_REGISTRATION: 0,
  STAKE_DEREGISTRATION: 1,
  STAKE_DELEGATION: 2,
  STAKE_POOL_REGISTRATION: 3
});
exports.Enum_CardanoCertificateType = Enum_CardanoCertificateType;
var Enum_CardanoPoolRelayType = Object.freeze({
  SINGLE_HOST_IP: 0,
  SINGLE_HOST_NAME: 1,
  MULTIPLE_HOST_NAME: 2
});
exports.Enum_CardanoPoolRelayType = Enum_CardanoPoolRelayType;
var Enum_CardanoTxAuxiliaryDataSupplementType = Object.freeze({
  NONE: 0,
  CATALYST_REGISTRATION_SIGNATURE: 1
});
exports.Enum_CardanoTxAuxiliaryDataSupplementType = Enum_CardanoTxAuxiliaryDataSupplementType;
var Enum_CardanoTxSigningMode = Object.freeze({
  ORDINARY_TRANSACTION: 0,
  POOL_REGISTRATION_AS_OWNER: 1,
  MULTISIG_TRANSACTION: 2
});
exports.Enum_CardanoTxSigningMode = Enum_CardanoTxSigningMode;
var Enum_CardanoTxWitnessType = Object.freeze({
  BYRON_WITNESS: 0,
  SHELLEY_WITNESS: 1
});
exports.Enum_CardanoTxWitnessType = Enum_CardanoTxWitnessType;
var Enum_FailureType = Object.freeze({
  Failure_UnexpectedMessage: 1,
  Failure_ButtonExpected: 2,
  Failure_DataError: 3,
  Failure_ActionCancelled: 4,
  Failure_PinExpected: 5,
  Failure_PinCancelled: 6,
  Failure_PinInvalid: 7,
  Failure_InvalidSignature: 8,
  Failure_ProcessError: 9,
  Failure_NotEnoughFunds: 10,
  Failure_NotInitialized: 11,
  Failure_PinMismatch: 12,
  Failure_WipeCodeMismatch: 13,
  Failure_InvalidSession: 14,
  Failure_FirmwareError: 99
});
exports.Enum_FailureType = Enum_FailureType;
var Enum_ButtonRequestType = Object.freeze({
  ButtonRequest_Other: 1,
  ButtonRequest_FeeOverThreshold: 2,
  ButtonRequest_ConfirmOutput: 3,
  ButtonRequest_ResetDevice: 4,
  ButtonRequest_ConfirmWord: 5,
  ButtonRequest_WipeDevice: 6,
  ButtonRequest_ProtectCall: 7,
  ButtonRequest_SignTx: 8,
  ButtonRequest_FirmwareCheck: 9,
  ButtonRequest_Address: 10,
  ButtonRequest_PublicKey: 11,
  ButtonRequest_MnemonicWordCount: 12,
  ButtonRequest_MnemonicInput: 13,
  _Deprecated_ButtonRequest_PassphraseType: 14,
  ButtonRequest_UnknownDerivationPath: 15,
  ButtonRequest_RecoveryHomepage: 16,
  ButtonRequest_Success: 17,
  ButtonRequest_Warning: 18,
  ButtonRequest_PassphraseEntry: 19,
  ButtonRequest_PinEntry: 20
});
exports.Enum_ButtonRequestType = Enum_ButtonRequestType;
var Enum_PinMatrixRequestType = Object.freeze({
  PinMatrixRequestType_Current: 1,
  PinMatrixRequestType_NewFirst: 2,
  PinMatrixRequestType_NewSecond: 3,
  PinMatrixRequestType_WipeCodeFirst: 4,
  PinMatrixRequestType_WipeCodeSecond: 5
});
exports.Enum_PinMatrixRequestType = Enum_PinMatrixRequestType;
var Enum_EthereumDataType = Object.freeze({
  UINT: 1,
  INT: 2,
  BYTES: 3,
  STRING: 4,
  BOOL: 5,
  ADDRESS: 6,
  ARRAY: 7,
  STRUCT: 8
});
exports.Enum_EthereumDataType = Enum_EthereumDataType;
var Enum_BackupType = Object.freeze({
  Bip39: 0,
  Slip39_Basic: 1,
  Slip39_Advanced: 2
});
exports.Enum_BackupType = Enum_BackupType;
var Enum_SafetyCheckLevel = Object.freeze({
  Strict: 0,
  PromptAlways: 1,
  PromptTemporarily: 2
});
exports.Enum_SafetyCheckLevel = Enum_SafetyCheckLevel;
var Enum_Capability = Object.freeze({
  Capability_Bitcoin: 1,
  Capability_Bitcoin_like: 2,
  Capability_Binance: 3,
  Capability_Cardano: 4,
  Capability_Crypto: 5,
  Capability_EOS: 6,
  Capability_Ethereum: 7,
  Capability_Lisk: 8,
  Capability_Monero: 9,
  Capability_NEM: 10,
  Capability_Ripple: 11,
  Capability_Stellar: 12,
  Capability_Tezos: 13,
  Capability_U2F: 14,
  Capability_Shamir: 15,
  Capability_ShamirGroups: 16,
  Capability_PassphraseEntry: 17
});
exports.Enum_Capability = Enum_Capability;
var Enum_SdProtectOperationType = Object.freeze({
  DISABLE: 0,
  ENABLE: 1,
  REFRESH: 2
});
exports.Enum_SdProtectOperationType = Enum_SdProtectOperationType;
var Enum_RecoveryDeviceType = Object.freeze({
  RecoveryDeviceType_ScrambledWords: 0,
  RecoveryDeviceType_Matrix: 1
});
exports.Enum_RecoveryDeviceType = Enum_RecoveryDeviceType;
var Enum_WordRequestType = Object.freeze({
  WordRequestType_Plain: 0,
  WordRequestType_Matrix9: 1,
  WordRequestType_Matrix6: 2
});
exports.Enum_WordRequestType = Enum_WordRequestType;
var Enum_NEMMosaicLevy = Object.freeze({
  MosaicLevy_Absolute: 1,
  MosaicLevy_Percentile: 2
});
exports.Enum_NEMMosaicLevy = Enum_NEMMosaicLevy;
var Enum_NEMSupplyChangeType = Object.freeze({
  SupplyChange_Increase: 1,
  SupplyChange_Decrease: 2
});
exports.Enum_NEMSupplyChangeType = Enum_NEMSupplyChangeType;
var Enum_NEMModificationType = Object.freeze({
  CosignatoryModification_Add: 1,
  CosignatoryModification_Delete: 2
});
exports.Enum_NEMModificationType = Enum_NEMModificationType;
var Enum_NEMImportanceTransferMode = Object.freeze({
  ImportanceTransfer_Activate: 1,
  ImportanceTransfer_Deactivate: 2
});
exports.Enum_NEMImportanceTransferMode = Enum_NEMImportanceTransferMode;
var Enum_StellarAssetType = Object.freeze({
  NATIVE: 0,
  ALPHANUM4: 1,
  ALPHANUM12: 2
});
exports.Enum_StellarAssetType = Enum_StellarAssetType;
var Enum_StellarMemoType = Object.freeze({
  NONE: 0,
  TEXT: 1,
  ID: 2,
  HASH: 3,
  RETURN: 4
});
exports.Enum_StellarMemoType = Enum_StellarMemoType;
var Enum_StellarSignerType = Object.freeze({
  ACCOUNT: 0,
  PRE_AUTH: 1,
  HASH: 2
});
exports.Enum_StellarSignerType = Enum_StellarSignerType;
var Enum_TezosContractType = Object.freeze({
  Implicit: 0,
  Originated: 1
});
exports.Enum_TezosContractType = Enum_TezosContractType;
var Enum_TezosBallotType = Object.freeze({
  Yay: 0,
  Nay: 1,
  Pass: 2
});
exports.Enum_TezosBallotType = Enum_TezosBallotType;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\utils\\debug.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\utils\debug.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports.getLog = exports.enableLogByPrefix = exports.enableLog = exports.initLog = void 0;

/* eslint-disable no-console */
var colors = {
  // green
  DescriptorStream: 'color: #77ab59',
  DeviceList: 'color: #36802d',
  Device: 'color: #bada55',
  Core: 'color: #c9df8a',
  IFrame: 'color: #FFFFFF; background: #f4a742;',
  Popup: 'color: #f48a00'
};
var MAX_ENTRIES = 100;

var Log = /*#__PURE__*/function () {
  function Log(prefix, enabled) {
    this.prefix = prefix;
    this.enabled = enabled;
    this.messages = [];
    this.css = colors[prefix] || 'color: #000000; background: #FFFFFF;';
  }

  var _proto = Log.prototype;

  _proto.addMessage = function addMessage(level, prefix) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.messages.push({
      level: level,
      prefix: prefix,
      message: args,
      timestamp: new Date().getTime()
    });

    if (this.messages.length > MAX_ENTRIES) {
      this.messages.shift();
    }
  };

  _proto.log = function log() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    this.addMessage.apply(this, ['log', this.prefix].concat(args));

    if (this.enabled) {
      var _console;

      (_console = console).log.apply(_console, [this.prefix].concat(args));
    }
  };

  _proto.error = function error() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    this.addMessage.apply(this, ['error', this.prefix].concat(args));

    if (this.enabled) {
      var _console2;

      (_console2 = console).error.apply(_console2, [this.prefix].concat(args));
    }
  };

  _proto.warn = function warn() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    this.addMessage.apply(this, ['warn', this.prefix].concat(args));

    if (this.enabled) {
      var _console3;

      (_console3 = console).warn.apply(_console3, [this.prefix].concat(args));
    }
  };

  _proto.debug = function debug() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    this.addMessage.apply(this, ['debug', this.prefix].concat(args));

    if (this.enabled) {
      var _console4;

      (_console4 = console).log.apply(_console4, ["%c" + this.prefix, this.css].concat(args));
    }
  };

  return Log;
}();

var _logs = {};

var initLog = function initLog(prefix, enabled) {
  var instance = new Log(prefix, !!enabled);
  _logs[prefix] = instance;
  return instance;
};

exports.initLog = initLog;

var enableLog = function enableLog(enabled) {
  Object.keys(_logs).forEach(function (key) {
    _logs[key].enabled = enabled;
  });
};

exports.enableLog = enableLog;

var enableLogByPrefix = function enableLogByPrefix(prefix, enabled) {
  if (_logs[prefix]) {
    _logs[prefix].enabled = enabled;
  }
};

exports.enableLogByPrefix = enableLogByPrefix;

var getLog = function getLog() {
  var logs = [];
  Object.keys(_logs).forEach(function (key) {
    logs = logs.concat(_logs[key].messages);
  });
  logs.sort(function (a, b) {
    return a.timestamp - b.timestamp;
  });
  return logs;
};

exports.getLog = getLog;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\utils\\deferred.js", {"@babel/runtime/helpers/asyncToGenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\asyncToGenerator.js","@babel/runtime/helpers/interopRequireDefault":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\helpers\\interopRequireDefault.js","@babel/runtime/regenerator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@babel\\runtime\\regenerator\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\utils\deferred.js
      return function (require, module, exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.create = create;
exports.createAsync = createAsync;
exports.resolveTimeoutPromise = resolveTimeoutPromise;
exports.rejectTimeoutPromise = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function create(arg, device) {
  var localResolve = function localResolve(_t) {};

  var localReject = function localReject(_e) {};

  var id; // eslint-disable-next-line no-async-promise-executor

  var promise = new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              localResolve = resolve;
              localReject = reject;

              if (!(typeof arg === 'function')) {
                _context.next = 11;
                break;
              }

              _context.prev = 3;
              _context.next = 6;
              return arg();

            case 6:
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](3);
              reject(_context.t0);

            case 11:
              if (typeof arg === 'string') id = arg;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  return {
    id: id,
    device: device,
    resolve: localResolve,
    reject: localReject,
    promise: promise
  };
}

function createAsync(innerFn) {
  var localResolve = function localResolve(_t) {};

  var localReject = function localReject(_e) {};

  var promise = new Promise(function (resolve, reject) {
    localResolve = resolve;
    localReject = reject;
  });

  var inner = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return innerFn();

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function inner() {
      return _ref2.apply(this, arguments);
    };
  }();

  return {
    resolve: localResolve,
    reject: localReject,
    promise: promise,
    run: function run() {
      inner();
      return promise;
    }
  };
}

function resolveTimeoutPromise(delay, result) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(result);
    }, delay);
  });
}

var rejectTimeoutPromise = function rejectTimeoutPromise(delay, error) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(error);
    }, delay);
  });
};

exports.rejectTimeoutPromise = rejectTimeoutPromise;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\trezor-connect\\lib\\webusb\\button.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\trezor-connect\lib\webusb\button.js
      return function (require, module, exports) {
"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var render = function render(className, url, origin) {
  var query = className || '.trezor-webusb-button';
  var buttons = document.querySelectorAll(query);
  var src = url + "?" + Date.now();
  buttons.forEach(function (b) {
    if (b.getElementsByTagName('iframe').length < 1) {
      var bounds = b.getBoundingClientRect();
      var btnIframe = document.createElement('iframe');
      btnIframe.frameBorder = '0';
      btnIframe.width = Math.round(bounds.width) + "px";
      btnIframe.height = Math.round(bounds.height) + "px";
      btnIframe.style.position = 'absolute';
      btnIframe.style.top = '0px';
      btnIframe.style.left = '0px';
      btnIframe.style.zIndex = '1'; // btnIframe.style.opacity = '0'; // this makes click impossible on cross-origin

      btnIframe.setAttribute('allow', 'usb');
      btnIframe.setAttribute('scrolling', 'no');

      btnIframe.onload = function () {
        btnIframe.contentWindow.postMessage({// style: JSON.stringify( window.getComputedStyle(b) ),
          // outer: b.outerHTML,
          // inner: b.innerHTML
        }, origin);
      };

      btnIframe.src = src; // inject iframe into button

      b.append(btnIframe);
    }
  });
};

var _default = render;
exports["default"] = _default;
      };
    };
  }
}, {package:"eth-trezor-keyring>trezor-connect",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\uint8arrays\\concat.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\uint8arrays\concat.js
      return function (require, module, exports) {
'use strict'

/**
 * Returns a new Uint8Array created by concatenating the passed ArrayLikes
 *
 * @param {Array<ArrayLike<number>>} arrays
 * @param {number} [length]
 */
function concat (arrays, length) {
  if (!length) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0)
  }

  const output = new Uint8Array(length)
  let offset = 0

  for (const arr of arrays) {
    output.set(arr, offset)
    offset += arr.length
  }

  return output
}

module.exports = concat

      };
    };
  }
}, {package:"@ensdomains/content-hash>cids>uint8arrays",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\uint8arrays\\equals.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\uint8arrays\equals.js
      return function (require, module, exports) {
'use strict'

/**
 * Returns true if the two passed Uint8Arrays have the same content
 *
 * @param {Uint8Array} a
 * @param {Uint8Array} b
 */
function equals (a, b) {
  if (a === b) {
    return true
  }

  if (a.byteLength !== b.byteLength) {
    return false
  }

  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

module.exports = equals

      };
    };
  }
}, {package:"@ensdomains/content-hash>cids>uint8arrays",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\uint8arrays\\from-string.js", {"multibase":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\uint8arrays\from-string.js
      return function (require, module, exports) {
'use strict'

const { encoding: getCodec } = require('multibase')
const utf8Encoder = new TextEncoder()

/**
 * @typedef {__import__('multibase/src/types').BaseName | 'utf8' | 'utf-8' | 'ascii' | undefined} SupportedEncodings
 */

/**
 * Interprets each character in a string as a byte and
 * returns a Uint8Array of those bytes.
 *
 * @param {string} string - The string to turn into an array
 */
function asciiStringToUint8Array (string) {
  const array = new Uint8Array(string.length)

  for (let i = 0; i < string.length; i++) {
    array[i] = string.charCodeAt(i)
  }

  return array
}

/**
 * Create a `Uint8Array` from the passed string
 *
 * Supports `utf8`, `utf-8` and any encoding supported by the multibase module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 *
 * @param {string} string
 * @param {SupportedEncodings} [encoding=utf8] - utf8, base16, base64, base64urlpad, etc
 * @returns {Uint8Array}
 */
function fromString (string, encoding = 'utf8') {
  if (encoding === 'utf8' || encoding === 'utf-8') {
    return utf8Encoder.encode(string)
  }

  if (encoding === 'ascii') {
    return asciiStringToUint8Array(string)
  }

  return getCodec(encoding).decode(string)
}

module.exports = fromString

      };
    };
  }
}, {package:"@ensdomains/content-hash>cids>uint8arrays",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\uint8arrays\\to-string.js", {"multibase":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\multibase\\src\\index.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\uint8arrays\to-string.js
      return function (require, module, exports) {
'use strict'

const { encoding: getCodec } = require('multibase')
const utf8Decoder = new TextDecoder('utf8')

/**
 * @typedef {__import__('multibase/src/types').BaseName | 'utf8' | 'utf-8' | 'ascii' | undefined} SupportedEncodings
 */

/**
 * Turns a Uint8Array of bytes into a string with each
 * character being the char code of the corresponding byte
 *
 * @param {Uint8Array} array - The array to turn into a string
 */
function uint8ArrayToAsciiString (array) {
  let string = ''

  for (let i = 0; i < array.length; i++) {
    string += String.fromCharCode(array[i])
  }
  return string
}

/**
 * Turns a `Uint8Array` into a string.
 *
 * Supports `utf8`, `utf-8` and any encoding supported by the multibase module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 *
 * @param {Uint8Array} array - The array to turn into a string
 * @param {SupportedEncodings} [encoding=utf8] - The encoding to use
 * @returns {string}
 */
function toString (array, encoding = 'utf8') {
  if (encoding === 'utf8' || encoding === 'utf-8') {
    return utf8Decoder.decode(array)
  }

  if (encoding === 'ascii') {
    return uint8ArrayToAsciiString(array)
  }

  return getCodec(encoding).encode(array)
}

module.exports = toString

      };
    };
  }
}, {package:"@ensdomains/content-hash>cids>uint8arrays",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\varint\\decode.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\varint\decode.js
      return function (require, module, exports) {
module.exports = read

var MSB = 0x80
  , REST = 0x7F

function read(buf, offset) {
  var res    = 0
    , offset = offset || 0
    , shift  = 0
    , counter = offset
    , b
    , l = buf.length

  do {
    if (counter >= l) {
      read.bytes = 0
      throw new RangeError('Could not decode varint')
    }
    b = buf[counter++]
    res += shift < 28
      ? (b & REST) << shift
      : (b & REST) * Math.pow(2, shift)
    shift += 7
  } while (b >= MSB)

  read.bytes = counter - offset

  return res
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>varint",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\varint\\encode.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\varint\encode.js
      return function (require, module, exports) {
module.exports = encode

var MSB = 0x80
  , REST = 0x7F
  , MSBALL = ~REST
  , INT = Math.pow(2, 31)

function encode(num, out, offset) {
  out = out || []
  offset = offset || 0
  var oldOffset = offset

  while(num >= INT) {
    out[offset++] = (num & 0xFF) | MSB
    num /= 128
  }
  while(num & MSBALL) {
    out[offset++] = (num & 0xFF) | MSB
    num >>>= 7
  }
  out[offset] = num | 0
  
  encode.bytes = offset - oldOffset + 1
  
  return out
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>varint",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\varint\\index.js", {"./decode.js":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\varint\\decode.js","./encode.js":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\varint\\encode.js","./length.js":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\varint\\length.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\varint\index.js
      return function (require, module, exports) {
module.exports = {
    encode: require('./encode.js')
  , decode: require('./decode.js')
  , encodingLength: require('./length.js')
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>varint",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\varint\\length.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\varint\length.js
      return function (require, module, exports) {

var N1 = Math.pow(2,  7)
var N2 = Math.pow(2, 14)
var N3 = Math.pow(2, 21)
var N4 = Math.pow(2, 28)
var N5 = Math.pow(2, 35)
var N6 = Math.pow(2, 42)
var N7 = Math.pow(2, 49)
var N8 = Math.pow(2, 56)
var N9 = Math.pow(2, 63)

module.exports = function (value) {
  return (
    value < N1 ? 1
  : value < N2 ? 2
  : value < N3 ? 3
  : value < N4 ? 4
  : value < N5 ? 5
  : value < N6 ? 6
  : value < N7 ? 7
  : value < N8 ? 8
  : value < N9 ? 9
  :              10
  )
}

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>varint",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\web-encoding\\src\\lib.js", {"util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\browserify\\node_modules\\util\\util.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\node_modules\web-encoding\src\lib.js
      return function (require, module, exports) {
"use strict"

exports.TextEncoder =
  typeof TextEncoder !== "undefined" ? TextEncoder : require("util").TextEncoder

exports.TextDecoder =
  typeof TextDecoder !== "undefined" ? TextDecoder : require("util").TextDecoder

      };
    };
  }
}, {package:"@ensdomains/content-hash>multihashes>web-encoding",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\shared\\constants\\alarms.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\shared\constants\alarms.js
      return function (require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.METAMETRICS_FINALIZE_EVENT_FRAGMENT_ALARM = exports.AUTO_LOCK_TIMEOUT_ALARM = void 0;
const AUTO_LOCK_TIMEOUT_ALARM = 'AUTO_LOCK_TIMEOUT_ALARM';
exports.AUTO_LOCK_TIMEOUT_ALARM = AUTO_LOCK_TIMEOUT_ALARM;
const METAMETRICS_FINALIZE_EVENT_FRAGMENT_ALARM = 'METAMETRICS_FINALIZE_EVENT_FRAGMENT_ALARM';
exports.METAMETRICS_FINALIZE_EVENT_FRAGMENT_ALARM = METAMETRICS_FINALIZE_EVENT_FRAGMENT_ALARM;

      };
    };
  }
}, {package:"$root$",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\shared\\constants\\phishing.js", {}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\shared\constants\phishing.js
      return function (require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PHISHING_NEW_ISSUE_URLS = void 0;
const PHISHING_NEW_ISSUE_URLS = {
  MetaMask: 'https://github.com/metamask/eth-phishing-detect/issues/new',
  PhishFort: 'https://github.com/phishfort/phishfort-lists/issues/new'
};
exports.PHISHING_NEW_ISSUE_URLS = PHISHING_NEW_ISSUE_URLS;

      };
    };
  }
}, {package:"$root$",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\shared\\constants\\smartTransactions.js", {"./time":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\shared\\constants\\time.ts"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\shared\constants\smartTransactions.js
      return function (require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FALLBACK_SMART_TRANSACTIONS_REFRESH_TIME = exports.FALLBACK_SMART_TRANSACTIONS_MAX_FEE_MULTIPLIER = exports.FALLBACK_SMART_TRANSACTIONS_DEADLINE = void 0;

var _time = require("./time");

const FALLBACK_SMART_TRANSACTIONS_REFRESH_TIME = _time.SECOND * 10;
exports.FALLBACK_SMART_TRANSACTIONS_REFRESH_TIME = FALLBACK_SMART_TRANSACTIONS_REFRESH_TIME;
const FALLBACK_SMART_TRANSACTIONS_DEADLINE = 180;
exports.FALLBACK_SMART_TRANSACTIONS_DEADLINE = FALLBACK_SMART_TRANSACTIONS_DEADLINE;
const FALLBACK_SMART_TRANSACTIONS_MAX_FEE_MULTIPLIER = 2;
exports.FALLBACK_SMART_TRANSACTIONS_MAX_FEE_MULTIPLIER = FALLBACK_SMART_TRANSACTIONS_MAX_FEE_MULTIPLIER;

      };
    };
  }
}, {package:"$root$",}],
["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\background.js", {"../../shared/constants/app":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\shared\\constants\\app.ts","../../shared/constants/metametrics":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\shared\\constants\\metametrics.js","../../shared/constants/time":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\shared\\constants\\time.ts","../../shared/modules/mv3.utils":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\shared\\modules\\mv3.utils.js","../../shared/modules/object.utils":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\shared\\modules\\object.utils.js","./first-time-state":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\first-time-state.js","./lib/createStreamSink":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\createStreamSink.js","./lib/ens-ipfs/setup":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\ens-ipfs\\setup.js","./lib/get-first-preferred-lang-code":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\get-first-preferred-lang-code.js","./lib/getObjStructure":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\getObjStructure.js","./lib/local-store":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\local-store.js","./lib/migrator":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\migrator\\index.js","./lib/network-store":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\network-store.js","./lib/notification-manager":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\notification-manager.js","./lib/setupSentry":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\setupSentry.js","./lib/util":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\lib\\util.js","./metamask-controller":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\metamask-controller.js","./migrations":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\migrations\\index.js","./platforms/extension":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\platforms\\extension.js","@metamask/obs-store":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\@metamask\\obs-store\\dist\\index.js","debounce-stream":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\debounce-stream\\index.js","end-of-stream":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\end-of-stream\\index.js","eth-rpc-errors":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\eth-rpc-errors\\dist\\index.js","extension-port-stream":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\extension-port-stream\\dist\\index.js","loglevel":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\loglevel\\lib\\loglevel.js","pump":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\pump\\index.js","webextension-polyfill":"C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\node_modules\\webextension-polyfill\\dist\\browser-polyfill.js"}, function(){
  with (this) {
    return function() {
      'use strict';
      // source: C:\a_repos\0_game7\hyperplay\metamask-extension\app\scripts\background.js
      return function (require, module, exports) {
"use strict";

var _endOfStream = _interopRequireDefault(require("end-of-stream"));

var _pump = _interopRequireDefault(require("pump"));

var _debounceStream = _interopRequireDefault(require("debounce-stream"));

var _loglevel = _interopRequireDefault(require("loglevel"));

var _webextensionPolyfill = _interopRequireDefault(require("webextension-polyfill"));

var _obsStore = require("@metamask/obs-store");

var _extensionPortStream = _interopRequireDefault(require("extension-port-stream"));

var _ethRpcErrors = require("eth-rpc-errors");

var _app = require("../../shared/constants/app");

var _time = require("../../shared/constants/time");

var _metametrics = require("../../shared/constants/metametrics");

var _mv = require("../../shared/modules/mv3.utils");

var _object = require("../../shared/modules/object.utils");

var _migrations = _interopRequireDefault(require("./migrations"));

var _migrator = _interopRequireDefault(require("./lib/migrator"));

var _extension = _interopRequireDefault(require("./platforms/extension"));

var _localStore = _interopRequireDefault(require("./lib/local-store"));

var _networkStore = _interopRequireDefault(require("./lib/network-store"));

var _setupSentry = require("./lib/setupSentry");

var _createStreamSink = _interopRequireDefault(require("./lib/createStreamSink"));

var _notificationManager = _interopRequireWildcard(require("./lib/notification-manager"));

var _metamaskController = _interopRequireWildcard(require("./metamask-controller"));

var _firstTimeState = _interopRequireDefault(require("./first-time-state"));

var _getFirstPreferredLangCode = _interopRequireDefault(require("./lib/get-first-preferred-lang-code"));

var _getObjStructure = _interopRequireDefault(require("./lib/getObjStructure"));

var _setup = _interopRequireDefault(require("./lib/ens-ipfs/setup"));

var _util = require("./lib/util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file The entry point for the web extension singleton process.
 */

/* eslint-enable import/first */
const {
  sentry
} = global;
const firstTimeState = { ..._firstTimeState.default
};
const metamaskInternalProcessHash = {
  [_app.ENVIRONMENT_TYPE_POPUP]: true,
  [_app.ENVIRONMENT_TYPE_NOTIFICATION]: true,
  [_app.ENVIRONMENT_TYPE_FULLSCREEN]: true
};
const metamaskBlockedPorts = ['trezor-connect'];

_loglevel.default.setDefaultLevel(true ? 'debug' : 'info');

const platform = new _extension.default();
const notificationManager = new _notificationManager.default();
global.METAMASK_NOTIFIER = notificationManager;
let popupIsOpen = false;
let notificationIsOpen = false;
let uiIsTriggering = false;
const openMetamaskTabsIDs = {};
const requestAccountTabIds = {};
let controller; // state persistence

const inTest = false;
const localStore = inTest ? new _networkStore.default() : new _localStore.default();
let versionedData;

if (inTest || true) {
  global.stateHooks.metamaskGetState = localStore.get.bind(localStore);
}

const phishingPageUrl = new URL("https://metamask.github.io/phishing-warning/v1.2.1/");
const ONE_SECOND_IN_MILLISECONDS = 1000; // Timeout for initializing phishing warning page.

const PHISHING_WARNING_PAGE_TIMEOUT = ONE_SECOND_IN_MILLISECONDS;
const ACK_KEEP_ALIVE_MESSAGE = 'ACK_KEEP_ALIVE_MESSAGE';
const WORKER_KEEP_ALIVE_MESSAGE = 'WORKER_KEEP_ALIVE_MESSAGE';
/**
 * In case of MV3 we attach a "onConnect" event listener as soon as the application is initialised.
 * Reason is that in case of MV3 a delay in doing this was resulting in missing first connect event after service worker is re-activated.
 */

const initApp = async remotePort => {
  _webextensionPolyfill.default.runtime.onConnect.removeListener(initApp);

  await initialize(remotePort);

  _loglevel.default.info('MetaMask initialization complete.');
};

if (_mv.isManifestV3) {
  _webextensionPolyfill.default.runtime.onConnect.addListener(initApp);
} else {
  // initialization flow
  initialize().catch(_loglevel.default.error);
}
/**
 * @typedef {__import__('../../shared/constants/transaction').TransactionMeta} TransactionMeta
 */

/**
 * The data emitted from the MetaMaskController.store EventEmitter, also used to initialize the MetaMaskController. Available in UI on React state as state.metamask.
 *
 * @typedef MetaMaskState
 * @property {boolean} isInitialized - Whether the first vault has been created.
 * @property {boolean} isUnlocked - Whether the vault is currently decrypted and accounts are available for selection.
 * @property {boolean} isAccountMenuOpen - Represents whether the main account selection UI is currently displayed.
 * @property {object} identities - An object matching lower-case hex addresses to Identity objects with "address" and "name" (nickname) keys.
 * @property {object} unapprovedTxs - An object mapping transaction hashes to unapproved transactions.
 * @property {Array} frequentRpcList - A list of frequently used RPCs, including custom user-provided ones.
 * @property {Array} addressBook - A list of previously sent to addresses.
 * @property {object} contractExchangeRates - Info about current token prices.
 * @property {Array} tokens - Tokens held by the current user, including their balances.
 * @property {object} send - TODO: Document
 * @property {boolean} useBlockie - Indicates preferred user identicon format. True for blockie, false for Jazzicon.
 * @property {object} featureFlags - An object for optional feature flags.
 * @property {boolean} welcomeScreen - True if welcome screen should be shown.
 * @property {string} currentLocale - A locale string matching the user's preferred display language.
 * @property {object} provider - The current selected network provider.
 * @property {string} provider.rpcUrl - The address for the RPC API, if using an RPC API.
 * @property {string} provider.type - An identifier for the type of network selected, allows MetaMask to use custom provider strategies for known networks.
 * @property {string} network - A stringified number of the current network ID.
 * @property {object} accounts - An object mapping lower-case hex addresses to objects with "balance" and "address" keys, both storing hex string values.
 * @property {hex} currentBlockGasLimit - The most recently seen block gas limit, in a lower case hex prefixed string.
 * @property {TransactionMeta[]} currentNetworkTxList - An array of transactions associated with the currently selected network.
 * @property {object} unapprovedMsgs - An object of messages pending approval, mapping a unique ID to the options.
 * @property {number} unapprovedMsgCount - The number of messages in unapprovedMsgs.
 * @property {object} unapprovedPersonalMsgs - An object of messages pending approval, mapping a unique ID to the options.
 * @property {number} unapprovedPersonalMsgCount - The number of messages in unapprovedPersonalMsgs.
 * @property {object} unapprovedEncryptionPublicKeyMsgs - An object of messages pending approval, mapping a unique ID to the options.
 * @property {number} unapprovedEncryptionPublicKeyMsgCount - The number of messages in EncryptionPublicKeyMsgs.
 * @property {object} unapprovedDecryptMsgs - An object of messages pending approval, mapping a unique ID to the options.
 * @property {number} unapprovedDecryptMsgCount - The number of messages in unapprovedDecryptMsgs.
 * @property {object} unapprovedTypedMsgs - An object of messages pending approval, mapping a unique ID to the options.
 * @property {number} unapprovedTypedMsgCount - The number of messages in unapprovedTypedMsgs.
 * @property {number} pendingApprovalCount - The number of pending request in the approval controller.
 * @property {string[]} keyringTypes - An array of unique keyring identifying strings, representing available strategies for creating accounts.
 * @property {Keyring[]} keyrings - An array of keyring descriptions, summarizing the accounts that are available for use, and what keyrings they belong to.
 * @property {string} selectedAddress - A lower case hex string of the currently selected address.
 * @property {string} currentCurrency - A string identifying the user's preferred display currency, for use in showing conversion rates.
 * @property {number} conversionRate - A number representing the current exchange rate from the user's preferred currency to Ether.
 * @property {number} conversionDate - A unix epoch date (ms) for the time the current conversion rate was last retrieved.
 * @property {boolean} forgottenPassword - Returns true if the user has initiated the password recovery screen, is recovering from seed phrase.
 */

/**
 * @typedef VersionedData
 * @property {MetaMaskState} data - The data emitted from MetaMask controller, or used to initialize it.
 * @property {number} version - The latest migration version that has been run.
 */

/**
 * Initializes the MetaMask controller, and sets up all platform configuration.
 *
 * @param {string} remotePort - remote application port connecting to extension.
 * @returns {Promise} Setup complete.
 */


async function initialize(remotePort) {
  const initState = await loadStateFromPersistence();
  const initLangCode = await (0, _getFirstPreferredLangCode.default)();
  setupController(initState, initLangCode, remotePort);

  if (!_mv.isManifestV3) {
    await loadPhishingWarningPage();
  }

  _loglevel.default.info('MetaMask initialization complete.');
}
/**
 * An error thrown if the phishing warning page takes too long to load.
 */


class PhishingWarningPageTimeoutError extends Error {
  constructor() {
    super('Timeout failed');
  }

}
/**
 * Load the phishing warning page temporarily to ensure the service
 * worker has been registered, so that the warning page works offline.
 */


async function loadPhishingWarningPage() {
  let iframe;

  try {
    const extensionStartupPhishingPageUrl = new URL("https://metamask.github.io/phishing-warning/v1.2.1/"); // The `extensionStartup` hash signals to the phishing warning page that it should not bother
    // setting up streams for user interaction. Otherwise this page load would cause a console
    // error.

    extensionStartupPhishingPageUrl.hash = '#extensionStartup';
    iframe = window.document.createElement('iframe');
    iframe.setAttribute('src', extensionStartupPhishingPageUrl.href);
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin'); // Create "deferred Promise" to allow passing resolve/reject to event handlers

    let deferredResolve;
    let deferredReject;
    const loadComplete = new Promise((resolve, reject) => {
      deferredResolve = resolve;
      deferredReject = reject;
    }); // The load event is emitted once loading has completed, even if the loading failed.
    // If loading failed we can't do anything about it, so we don't need to check.

    iframe.addEventListener('load', deferredResolve); // This step initiates the page loading.

    window.document.body.appendChild(iframe); // This timeout ensures that this iframe gets cleaned up in a reasonable
    // timeframe, and ensures that the "initialization complete" message
    // doesn't get delayed too long.

    setTimeout(() => deferredReject(new PhishingWarningPageTimeoutError()), PHISHING_WARNING_PAGE_TIMEOUT);
    await loadComplete;
  } catch (error) {
    if (error instanceof PhishingWarningPageTimeoutError) {
      console.warn('Phishing warning page timeout; page not guaraneteed to work offline.');
    } else {
      console.error('Failed to initialize phishing warning page', error);
    }
  } finally {
    if (iframe) {
      iframe.remove();
    }
  }
} //
// State and Persistence
//

/**
 * Loads any stored data, prioritizing the latest storage strategy.
 * Migrates that data schema in case it was last loaded on an older version.
 *
 * @returns {Promise<MetaMaskState>} Last data emitted from previous instance of MetaMask.
 */


async function loadStateFromPersistence() {
  // migrations
  const migrator = new _migrator.default({
    migrations: _migrations.default
  });
  migrator.on('error', console.warn); // read from disk
  // first from preferred, async API:

  versionedData = (await localStore.get()) || migrator.generateInitialState(firstTimeState); // check if somehow state is empty
  // this should never happen but new error reporting suggests that it has
  // for a small number of users
  // https://github.com/metamask/metamask-extension/issues/3919

  if (versionedData && !versionedData.data) {
    // unable to recover, clear state
    versionedData = migrator.generateInitialState(firstTimeState);
    sentry.captureMessage('MetaMask - Empty vault found - unable to recover');
  } // report migration errors to sentry


  migrator.on('error', err => {
    // get vault structure without secrets
    const vaultStructure = (0, _getObjStructure.default)(versionedData);
    sentry.captureException(err, {
      // "extra" key is required by Sentry
      extra: {
        vaultStructure
      }
    });
  }); // migrate data

  versionedData = await migrator.migrateData(versionedData);

  if (!versionedData) {
    throw new Error('MetaMask - migrator returned undefined');
  } // this initializes the meta/version data as a class variable to be used for future writes


  localStore.setMetadata(versionedData.meta); // write to disk

  localStore.set(versionedData.data); // return just the data

  return versionedData.data;
}
/**
 * Initializes the MetaMask Controller with any initial state and default language.
 * Configures platform-specific error reporting strategy.
 * Streams emitted state updates to platform-specific storage strategy.
 * Creates platform listeners for new Dapps/Contexts, and sets up their data connections to the controller.
 *
 * @param {object} initState - The initial state to start the controller with, matches the state that is emitted from the controller.
 * @param {string} initLangCode - The region code for the language preferred by the current user.
 * @param {string} remoteSourcePort - remote application port connecting to extension.
 */


function setupController(initState, initLangCode, remoteSourcePort) {
  //
  // MetaMask Controller
  //
  controller = new _metamaskController.default({
    infuraProjectId: "bde1e349aa3c4803a5c3a71f5623ecce",
    // User confirmation callbacks:
    showUserConfirmation: triggerUi,
    openPopup,
    // initial state
    initState,
    // initial locale code
    initLangCode,
    // platform specific api
    platform,
    notificationManager,
    browser: _webextensionPolyfill.default,
    getRequestAccountTabIds: () => {
      return requestAccountTabIds;
    },
    getOpenMetamaskTabsIds: () => {
      return openMetamaskTabsIDs;
    },
    localStore
  });
  (0, _setup.default)({
    getCurrentChainId: controller.networkController.getCurrentChainId.bind(controller.networkController),
    getIpfsGateway: controller.preferencesController.getIpfsGateway.bind(controller.preferencesController),
    provider: controller.provider
  }); // setup state persistence

  (0, _pump.default)((0, _obsStore.storeAsStream)(controller.store), (0, _debounceStream.default)(1000), (0, _createStreamSink.default)(state => localStore.set(state)), error => {
    _loglevel.default.error('MetaMask - Persistence pipeline failed', error);
  });
  setupSentryGetStateGlobal(controller); //
  // connect to other contexts
  //

  if (_mv.isManifestV3 && remoteSourcePort) {
    connectRemote(remoteSourcePort);
  }

  _webextensionPolyfill.default.runtime.onConnect.addListener(connectRemote);

  _webextensionPolyfill.default.runtime.onConnectExternal.addListener(connectExternal);

  const isClientOpenStatus = () => {
    return popupIsOpen || Boolean(Object.keys(openMetamaskTabsIDs).length) || notificationIsOpen;
  };

  const onCloseEnvironmentInstances = (isClientOpen, environmentType) => {
    // if all instances of metamask are closed we call a method on the controller to stop gasFeeController polling
    if (isClientOpen === false) {
      controller.onClientClosed(); // otherwise we want to only remove the polling tokens for the environment type that has closed
    } else {
      // in the case of fullscreen environment a user might have multiple tabs open so we don't want to disconnect all of
      // its corresponding polling tokens unless all tabs are closed.
      if (environmentType === _app.ENVIRONMENT_TYPE_FULLSCREEN && Boolean(Object.keys(openMetamaskTabsIDs).length)) {
        return;
      }

      controller.onEnvironmentTypeClosed(environmentType);
    }
  };
  /**
   * A runtime.Port object, as provided by the browser:
   *
   * @see https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port
   * @typedef Port
   * @type Object
   */

  /**
   * Connects a Port to the MetaMask controller via a multiplexed duplex stream.
   * This method identifies trusted (MetaMask) interfaces, and connects them differently from untrusted (web pages).
   *
   * @param {Port} remotePort - The port provided by a new context.
   */


  function connectRemote(remotePort) {
    var _remotePort$sender;

    const processName = remotePort.name;

    if (metamaskBlockedPorts.includes(remotePort.name)) {
      return;
    }

    let isMetaMaskInternalProcess = false;
    const sourcePlatform = (0, _util.getPlatform)();

    if (sourcePlatform === _app.PLATFORM_FIREFOX) {
      isMetaMaskInternalProcess = metamaskInternalProcessHash[processName];
    } else {
      isMetaMaskInternalProcess = remotePort.sender.origin === `chrome-extension://${_webextensionPolyfill.default.runtime.id}`;
    }

    const senderUrl = (_remotePort$sender = remotePort.sender) !== null && _remotePort$sender !== void 0 && _remotePort$sender.url ? new URL(remotePort.sender.url) : null;

    if (isMetaMaskInternalProcess) {
      const portStream = new _extensionPortStream.default(remotePort); // communication with popup

      controller.isClientOpen = true;
      controller.setupTrustedCommunication(portStream, remotePort.sender);

      if (_mv.isManifestV3) {
        // Message below if captured by UI code in app/scripts/ui.js which will trigger UI initialisation
        // This ensures that UI is initialised only after background is ready
        // It fixes the issue of blank screen coming when extension is loaded, the issue is very frequent in MV3
        remotePort.postMessage({
          name: 'CONNECTION_READY'
        }); // If we get a WORKER_KEEP_ALIVE message, we respond with an ACK

        remotePort.onMessage.addListener(message => {
          if (message.name === WORKER_KEEP_ALIVE_MESSAGE) {
            // To test un-comment this line and wait for 1 minute. An error should be shown on MetaMask UI.
            remotePort.postMessage({
              name: ACK_KEEP_ALIVE_MESSAGE
            });
          }
        });
      }

      if (processName === _app.ENVIRONMENT_TYPE_POPUP) {
        popupIsOpen = true;
        (0, _endOfStream.default)(portStream, () => {
          popupIsOpen = false;
          const isClientOpen = isClientOpenStatus();
          controller.isClientOpen = isClientOpen;
          onCloseEnvironmentInstances(isClientOpen, _app.ENVIRONMENT_TYPE_POPUP);
        });
      }

      if (processName === _app.ENVIRONMENT_TYPE_NOTIFICATION) {
        notificationIsOpen = true;
        (0, _endOfStream.default)(portStream, () => {
          notificationIsOpen = false;
          const isClientOpen = isClientOpenStatus();
          controller.isClientOpen = isClientOpen;
          onCloseEnvironmentInstances(isClientOpen, _app.ENVIRONMENT_TYPE_NOTIFICATION);
        });
      }

      if (processName === _app.ENVIRONMENT_TYPE_FULLSCREEN) {
        const tabId = remotePort.sender.tab.id;
        openMetamaskTabsIDs[tabId] = true;
        (0, _endOfStream.default)(portStream, () => {
          delete openMetamaskTabsIDs[tabId];
          const isClientOpen = isClientOpenStatus();
          controller.isClientOpen = isClientOpen;
          onCloseEnvironmentInstances(isClientOpen, _app.ENVIRONMENT_TYPE_FULLSCREEN);
        });
      }
    } else if (senderUrl && senderUrl.origin === phishingPageUrl.origin && senderUrl.pathname === phishingPageUrl.pathname) {
      const portStream = new _extensionPortStream.default(remotePort);
      controller.setupPhishingCommunication({
        connectionStream: portStream
      });
    } else {
      if (remotePort.sender && remotePort.sender.tab && remotePort.sender.url) {
        const tabId = remotePort.sender.tab.id;
        const url = new URL(remotePort.sender.url);
        const {
          origin
        } = url;
        remotePort.onMessage.addListener(msg => {
          if (msg.data && msg.data.method === 'eth_requestAccounts') {
            requestAccountTabIds[origin] = tabId;
          }
        });
      }

      connectExternal(remotePort);
    }
  } // communication with page or other extension


  function connectExternal(remotePort) {
    const portStream = new _extensionPortStream.default(remotePort);
    controller.setupUntrustedCommunication({
      connectionStream: portStream,
      sender: remotePort.sender
    });
  } //
  // User Interface setup
  //


  updateBadge();
  controller.txController.on(_metamaskController.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE, updateBadge);
  controller.messageManager.on(_metamaskController.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE, updateBadge);
  controller.personalMessageManager.on(_metamaskController.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE, updateBadge);
  controller.decryptMessageManager.on(_metamaskController.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE, updateBadge);
  controller.encryptionPublicKeyManager.on(_metamaskController.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE, updateBadge);
  controller.typedMessageManager.on(_metamaskController.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE, updateBadge);
  controller.appStateController.on(_metamaskController.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE, updateBadge);
  controller.controllerMessenger.subscribe(_metamaskController.METAMASK_CONTROLLER_EVENTS.APPROVAL_STATE_CHANGE, updateBadge);
  /**
   * Updates the Web Extension's "badge" number, on the little fox in the toolbar.
   * The number reflects the current number of pending transactions or message signatures needing user approval.
   */

  function updateBadge() {
    let label = '';
    const count = getUnapprovedTransactionCount();

    if (count) {
      label = String(count);
    } // browserAction has been replaced by action in MV3


    if (_mv.isManifestV3) {
      _webextensionPolyfill.default.action.setBadgeText({
        text: label
      });

      _webextensionPolyfill.default.action.setBadgeBackgroundColor({
        color: '#037DD6'
      });
    } else {
      _webextensionPolyfill.default.browserAction.setBadgeText({
        text: label
      });

      _webextensionPolyfill.default.browserAction.setBadgeBackgroundColor({
        color: '#037DD6'
      });
    }
  }

  function getUnapprovedTransactionCount() {
    const unapprovedTxCount = controller.txController.getUnapprovedTxCount();
    const {
      unapprovedMsgCount
    } = controller.messageManager;
    const {
      unapprovedPersonalMsgCount
    } = controller.personalMessageManager;
    const {
      unapprovedDecryptMsgCount
    } = controller.decryptMessageManager;
    const {
      unapprovedEncryptionPublicKeyMsgCount
    } = controller.encryptionPublicKeyManager;
    const {
      unapprovedTypedMessagesCount
    } = controller.typedMessageManager;
    const pendingApprovalCount = controller.approvalController.getTotalApprovalCount();
    const waitingForUnlockCount = controller.appStateController.waitingForUnlock.length;
    return unapprovedTxCount + unapprovedMsgCount + unapprovedPersonalMsgCount + unapprovedDecryptMsgCount + unapprovedEncryptionPublicKeyMsgCount + unapprovedTypedMessagesCount + pendingApprovalCount + waitingForUnlockCount;
  }

  notificationManager.on(_notificationManager.NOTIFICATION_MANAGER_EVENTS.POPUP_CLOSED, ({
    automaticallyClosed
  }) => {
    if (!automaticallyClosed) {
      rejectUnapprovedNotifications();
    } else if (getUnapprovedTransactionCount() > 0) {
      triggerUi();
    }
  });

  function rejectUnapprovedNotifications() {
    Object.keys(controller.txController.txStateManager.getUnapprovedTxList()).forEach(txId => controller.txController.txStateManager.setTxStatusRejected(txId));
    controller.messageManager.messages.filter(msg => msg.status === 'unapproved').forEach(tx => controller.messageManager.rejectMsg(tx.id, _metametrics.REJECT_NOTFICIATION_CLOSE_SIG));
    controller.personalMessageManager.messages.filter(msg => msg.status === 'unapproved').forEach(tx => controller.personalMessageManager.rejectMsg(tx.id, _metametrics.REJECT_NOTFICIATION_CLOSE_SIG));
    controller.typedMessageManager.messages.filter(msg => msg.status === 'unapproved').forEach(tx => controller.typedMessageManager.rejectMsg(tx.id, _metametrics.REJECT_NOTFICIATION_CLOSE_SIG));
    controller.decryptMessageManager.messages.filter(msg => msg.status === 'unapproved').forEach(tx => controller.decryptMessageManager.rejectMsg(tx.id, _metametrics.REJECT_NOTFICIATION_CLOSE));
    controller.encryptionPublicKeyManager.messages.filter(msg => msg.status === 'unapproved').forEach(tx => controller.encryptionPublicKeyManager.rejectMsg(tx.id, _metametrics.REJECT_NOTFICIATION_CLOSE)); // Finally, reject all approvals managed by the ApprovalController

    controller.approvalController.clear(_ethRpcErrors.ethErrors.provider.userRejectedRequest());
    updateBadge();
  }
} //
// Etc...
//

/**
 * Opens the browser popup for user confirmation
 */


async function triggerUi() {
  const tabs = await platform.getActiveTabs();
  const currentlyActiveMetamaskTab = Boolean(tabs.find(tab => openMetamaskTabsIDs[tab.id])); // Vivaldi is not closing port connection on popup close, so popupIsOpen does not work correctly
  // To be reviewed in the future if this behaviour is fixed - also the way we determine isVivaldi variable might change at some point

  const isVivaldi = tabs.length > 0 && tabs[0].extData && tabs[0].extData.indexOf('vivaldi_tab') > -1;

  if (!uiIsTriggering && (isVivaldi || !popupIsOpen) && !currentlyActiveMetamaskTab) {
    uiIsTriggering = true;

    try {
      await notificationManager.showPopup();
    } finally {
      uiIsTriggering = false;
    }
  }
}
/**
 * Opens the browser popup for user confirmation of watchAsset
 * then it waits until user interact with the UI
 */


async function openPopup() {
  await triggerUi();
  await new Promise(resolve => {
    const interval = setInterval(() => {
      if (!notificationIsOpen) {
        clearInterval(interval);
        resolve();
      }
    }, _time.SECOND);
  });
} // It adds the "App Installed" event into a queue of events, which will be tracked only after a user opts into metrics.


const addAppInstalledEvent = () => {
  if (controller) {
    controller.metaMetricsController.updateTraits({
      [_metametrics.TRAITS.INSTALL_DATE_EXT]: new Date().toISOString().split('T')[0] // yyyy-mm-dd

    });
    controller.metaMetricsController.addEventBeforeMetricsOptIn({
      category: _metametrics.EVENT.CATEGORIES.APP,
      event: _metametrics.EVENT_NAMES.APP_INSTALLED,
      properties: {}
    });
    return;
  }

  setTimeout(() => {
    // If the controller is not set yet, we wait and try to add the "App Installed" event again.
    addAppInstalledEvent();
  }, 1000);
}; // On first install, open a new tab with MetaMask


_webextensionPolyfill.default.runtime.onInstalled.addListener(({
  reason
}) => {
  if (reason === 'install' && !(true || false)) {
    addAppInstalledEvent();
    platform.openExtensionInBrowser();
  }
});

function setupSentryGetStateGlobal(store) {
  global.stateHooks.getSentryState = function () {
    const fullState = store.getState();
    const debugState = (0, _object.maskObject)({
      metamask: fullState
    }, _setupSentry.SENTRY_STATE);
    return {
      browser: window.navigator.userAgent,
      store: debugState,
      version: platform.getVersion()
    };
  };
}


      };
    };
  }
}, {package:"$root$",}]],["C:\\a_repos\\0_game7\\hyperplay\\metamask-extension\\app\\scripts\\background.js"],{})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFN5bWJvbHNJbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2luaXRDbG9uZUFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faW5pdENsb25lQnlUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19pbml0Q2xvbmVPYmplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVLZXlzSW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL190cmltbWVkRW5kSW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2Nsb25lRGVlcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW5SYW5nZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNFbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNJbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc01hcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2tleXNJbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvdG9GaW5pdGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3RvSW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJub2RlX21vZHVsZXMvbXVsdGliYXNlL3NyYy9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL211bHRpYmFzZS9zcmMvY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzL211bHRpYmFzZS9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbXVsdGliYXNlL3NyYy9yZmM0NjQ4LmpzIiwibm9kZV9tb2R1bGVzL211bHRpYmFzZS9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9tdWx0aWNvZGVjL25vZGVfbW9kdWxlcy9tdWx0aWJhc2Uvc3JjL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvbXVsdGljb2RlYy9ub2RlX21vZHVsZXMvbXVsdGliYXNlL3NyYy9jb25zdGFudHMuanMiLCJub2RlX21vZHVsZXMvbXVsdGljb2RlYy9ub2RlX21vZHVsZXMvbXVsdGliYXNlL3NyYy9yZmM0NjQ4LmpzIiwibm9kZV9tb2R1bGVzL211bHRpY29kZWMvbm9kZV9tb2R1bGVzL211bHRpYmFzZS9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9tdWx0aWNvZGVjL25vZGVfbW9kdWxlcy91aW50OGFycmF5cy9jb25jYXQuanMiLCJub2RlX21vZHVsZXMvbXVsdGljb2RlYy9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZnJvbS1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvbXVsdGljb2RlYy9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvdG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL211bHRpY29kZWMvbm9kZV9tb2R1bGVzL3ZhcmludC9kZWNvZGUuanMiLCJub2RlX21vZHVsZXMvbXVsdGljb2RlYy9ub2RlX21vZHVsZXMvdmFyaW50L2VuY29kZS5qcyIsIm5vZGVfbW9kdWxlcy9tdWx0aWNvZGVjL25vZGVfbW9kdWxlcy92YXJpbnQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbXVsdGljb2RlYy9ub2RlX21vZHVsZXMvdmFyaW50L2xlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9tdWx0aWNvZGVjL3NyYy9iYXNlLXRhYmxlLmpzIiwibm9kZV9tb2R1bGVzL211bHRpY29kZWMvc3JjL2NvbnN0YW50cy5qcyIsIm5vZGVfbW9kdWxlcy9tdWx0aWNvZGVjL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tdWx0aWNvZGVjL3NyYy9pbnQtdGFibGUuanMiLCJub2RlX21vZHVsZXMvbXVsdGljb2RlYy9zcmMvcHJpbnQuanMiLCJub2RlX21vZHVsZXMvbXVsdGljb2RlYy9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9tdWx0aWNvZGVjL3NyYy92YXJpbnQtdGFibGUuanMiLCJub2RlX21vZHVsZXMvbXVsdGloYXNoZXMvbm9kZV9tb2R1bGVzL211bHRpYmFzZS9zcmMvYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9tdWx0aWhhc2hlcy9ub2RlX21vZHVsZXMvbXVsdGliYXNlL3NyYy9jb25zdGFudHMuanMiLCJub2RlX21vZHVsZXMvbXVsdGloYXNoZXMvbm9kZV9tb2R1bGVzL211bHRpYmFzZS9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbXVsdGloYXNoZXMvbm9kZV9tb2R1bGVzL211bHRpYmFzZS9zcmMvcmZjNDY0OC5qcyIsIm5vZGVfbW9kdWxlcy9tdWx0aWhhc2hlcy9ub2RlX21vZHVsZXMvbXVsdGliYXNlL3NyYy91dGlsLmpzIiwibm9kZV9tb2R1bGVzL211bHRpaGFzaGVzL3NyYy9jb25zdGFudHMuanMiLCJub2RlX21vZHVsZXMvbXVsdGloYXNoZXMvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25hbm9pZC9pbmRleC5icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL25vbmNlLXRyYWNrZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVtb3ZlLXRyYWlsaW5nLXNsYXNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NjcnlwdHN5L2xpYi9zY3J5cHQuanMiLCJub2RlX21vZHVsZXMvc2VjcDI1NmsxL2VsbGlwdGljLmpzIiwibm9kZV9tb2R1bGVzL3NlY3AyNTZrMS9saWIvZWxsaXB0aWMuanMiLCJub2RlX21vZHVsZXMvc2VjcDI1NmsxL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcnN0cnVjdC9saWIvaW5kZXguY2pzIiwibm9kZV9tb2R1bGVzL3N3YXBwYWJsZS1vYmotcHJveHkvc3JjL2NyZWF0ZUV2ZW50RW1pdHRlclByb3h5LmpzIiwibm9kZV9tb2R1bGVzL3N3YXBwYWJsZS1vYmotcHJveHkvc3JjL2NyZWF0ZVN3YXBwYWJsZVByb3h5LmpzIiwibm9kZV9tb2R1bGVzL3N3YXBwYWJsZS1vYmotcHJveHkvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Rocm91Z2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdG8tZGF0YS12aWV3L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi9jb25zdGFudHMvYmxvY2tjaGFpbi5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvY29uc3RhbnRzL2NhcmRhbm8uanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL2NvbnN0YW50cy9kZXZpY2UuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL2NvbnN0YW50cy9lcnJvcnMuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL2NvbnN0YW50cy9pZnJhbWUuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL2NvbnN0YW50cy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvY29uc3RhbnRzL25ldHdvcmsuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL2NvbnN0YW50cy9wb3B1cC5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvY29uc3RhbnRzL3RyYW5zcG9ydC5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvY29uc3RhbnRzL3VpLmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi9kYXRhL0Nvbm5lY3RTZXR0aW5ncy5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvZW52L2Jyb3dzZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL2Vudi9icm93c2VyL25ldHdvcmtVdGlscy5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvaWZyYW1lL2J1aWxkZXIuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL2lmcmFtZS9pbmxpbmUtc3R5bGVzLmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvbWVzc2FnZS9idWlsZGVyLmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi9tZXNzYWdlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi9wbHVnaW5zL2V0aGVyZXVtL3R5cGVkRGF0YS5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvcG9wdXAvUG9wdXBNYW5hZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi9wb3B1cC9zaG93UG9wdXBSZXF1ZXN0LmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi90eXBlcy9hY2NvdW50LmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi90eXBlcy9hcGkuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL2JhY2tlbmQvYmxvY2tjaGFpbi5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvdHlwZXMvYmFja2VuZC90cmFuc2FjdGlvbnMuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvdHlwZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL21pc2MuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL25ldHdvcmtzL2JpbmFuY2UuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL25ldHdvcmtzL2JpdGNvaW4uanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL25ldHdvcmtzL2NhcmRhbm8uanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL25ldHdvcmtzL2NvaW5JbmZvLmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi90eXBlcy9uZXR3b3Jrcy9lb3MuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL25ldHdvcmtzL2V0aGVyZXVtLmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi90eXBlcy9uZXR3b3Jrcy9uZW0uanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL25ldHdvcmtzL3JpcHBsZS5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvdHlwZXMvbmV0d29ya3Mvc3RlbGxhci5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvdHlwZXMvbmV0d29ya3MvdGV6b3MuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL3BhcmFtcy5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvdHlwZXMvdHJlem9yL2RldmljZS5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvdHlwZXMvdHJlem9yL21hbmFnZW1lbnQuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3R5cGVzL3RyZXpvci9wcm90b2J1Zi5qcyIsIm5vZGVfbW9kdWxlcy90cmV6b3ItY29ubmVjdC9saWIvdXRpbHMvZGVidWcuanMiLCJub2RlX21vZHVsZXMvdHJlem9yLWNvbm5lY3QvbGliL3V0aWxzL2RlZmVycmVkLmpzIiwibm9kZV9tb2R1bGVzL3RyZXpvci1jb25uZWN0L2xpYi93ZWJ1c2IvYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL3VpbnQ4YXJyYXlzL2NvbmNhdC5qcyIsIm5vZGVfbW9kdWxlcy91aW50OGFycmF5cy9lcXVhbHMuanMiLCJub2RlX21vZHVsZXMvdWludDhhcnJheXMvZnJvbS1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvdWludDhhcnJheXMvdG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL3ZhcmludC9kZWNvZGUuanMiLCJub2RlX21vZHVsZXMvdmFyaW50L2VuY29kZS5qcyIsIm5vZGVfbW9kdWxlcy92YXJpbnQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdmFyaW50L2xlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy93ZWItZW5jb2Rpbmcvc3JjL2xpYi5qcyIsInNoYXJlZC9jb25zdGFudHMvYWxhcm1zLmpzIiwic2hhcmVkL2NvbnN0YW50cy9waGlzaGluZy5qcyIsInNoYXJlZC9jb25zdGFudHMvc21hcnRUcmFuc2FjdGlvbnMuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkxBO0FBQ0E7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbFpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN4UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdFlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxQ0E7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDMUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNGQTs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxSkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNiQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDRkE7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDelNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUE8sTUFBTSx1QkFBdUIsR0FBRyx5QkFBaEM7O0FBQ0EsTUFBTSx5Q0FBeUMsR0FDcEQsMkNBREs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQSxNQUFNLHVCQUF1QixHQUFHO0VBQ3JDLFFBQVEsRUFBRSw0REFEMkI7RUFFckMsU0FBUyxFQUFFO0FBRjBCLENBQWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FQOztBQUVPLE1BQU0sd0NBQXdDLEdBQUcsWUFBQSxHQUFTLEVBQTFEOztBQUNBLE1BQU0sb0NBQW9DLEdBQUcsR0FBN0M7O0FBQ0EsTUFBTSw4Q0FBOEMsR0FBRyxDQUF2RDs7Ozs7Ozs7Ozs7Ozs7O0FDQVAsSUFBQSxlQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxRQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxrQkFBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxpQkFBQSxDQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLFlBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLHdCQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLHVCQUFBLENBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsWUFBQSxPQUFBLENBQUEscUJBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsdUJBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsdUJBQUEsQ0FBQSxDQUFBLENBQUE7O0FBRUEsSUFBQSxnQkFBQSxPQUFBLENBQUEsZ0JBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsT0FBQSxPQUFBLENBQUEsNEJBQUEsQ0FBQSxDQUFBOztBQU1BLElBQUEsUUFBQSxPQUFBLENBQUEsNkJBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsZUFBQSxPQUFBLENBQUEsb0NBQUEsQ0FBQSxDQUFBOztBQU9BLElBQUEsTUFBQSxPQUFBLENBQUEsZ0NBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsVUFBQSxPQUFBLENBQUEsbUNBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsY0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsWUFBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxnQkFBQSxDQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLGFBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsdUJBQUEsQ0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxjQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLG1CQUFBLENBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsZ0JBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEscUJBQUEsQ0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxlQUFBLE9BQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUE7O0FBRUEsSUFBQSxvQkFBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSx3QkFBQSxDQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLHVCQUFBLHVCQUFBLENBQUEsT0FBQSxDQUFBLDRCQUFBLENBQUEsQ0FBQSxDQUFBOztBQUdBLElBQUEsc0JBQUEsdUJBQUEsQ0FBQSxPQUFBLENBQUEsdUJBQUEsQ0FBQSxDQUFBLENBQUE7O0FBR0EsSUFBQSxrQkFBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxvQkFBQSxDQUFBLENBQUEsQ0FBQTs7QUFDQSxJQUFBLDZCQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLHFDQUFBLENBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsbUJBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsdUJBQUEsQ0FBQSxDQUFBLENBQUE7O0FBQ0EsSUFBQSxTQUFBLHNCQUFBLENBQUEsT0FBQSxDQUFBLHNCQUFBLENBQUEsQ0FBQSxDQUFBOztBQUNBLElBQUEsUUFBQSxPQUFBLENBQUEsWUFBQSxDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7QUFHQSxNQUFNOztDQUFBLEdBQWEsTUFBbkIsQ0FBQTtBQUNBLE1BQU0saUJBQWlCLEVBQUUsR0FBRyxlQUFBLFFBQUE7Q0FBNUIsQ0FBQTtBQUVBLE1BQU0sOEJBQThCO0VBQ2xDLENBQUMsSUFBQSx1QkFBRCxHQUEwQixJQURRO0VBRWxDLENBQUMsSUFBQSw4QkFBRCxHQUFpQyxJQUZDO0VBR2xDLENBQUMsSUFBQSw0QkFBRCxHQUErQixJQUFBO0NBSGpDLENBQUE7QUFNQSxNQUFNLHVCQUF1QixDQUFDLGdCQUFELENBQTdCLENBQUE7O0FBRUEsU0FBQSxRQUFBLGdCQUFBLENBQW9CLE9BQU8sSUFBUCxlQUFBLEdBQTZCLE9BQTdCLEdBQXVDLE1BQTNELENBQUEsQ0FBQTs7QUFFQSxNQUFNLFdBQVcsSUFBSSxVQUFBLFFBQUosRUFBakIsQ0FBQTtBQUVBLE1BQU0sc0JBQXNCLElBQUksb0JBQUEsUUFBSixFQUE1QixDQUFBO0FBQ0EsTUFBTSxrQkFBTixHQUEyQixtQkFBM0IsQ0FBQTtBQUVBLElBQUksY0FBYyxLQUFsQixDQUFBO0FBQ0EsSUFBSSxxQkFBcUIsS0FBekIsQ0FBQTtBQUNBLElBQUksaUJBQWlCLEtBQXJCLENBQUE7QUFDQSxNQUFNLHNCQUFzQixFQUE1QixDQUFBO0FBQ0EsTUFBTSx1QkFBdUIsRUFBN0IsQ0FBQTtBQUNBLElBQUksVUFBSjs7QUFHQSxNQUFNLFNBQVMsT0FBTyxJQUFQLFFBQWYsQ0FBQTtBQUNBLE1BQU0sYUFBYSxNQUFNLEdBQUcsSUFBSSxhQUFBLFFBQUosRUFBSCxHQUFnQyxJQUFJLFdBQUEsUUFBSixFQUF6RCxDQUFBO0FBQ0EsSUFBSSxhQUFKLENBQUE7O0FBRUEsSUFBSSxNQUFNLElBQUksT0FBTyxJQUFQLGVBQWQsRUFBMEM7RUFDeEMsTUFBTSxXQUFOLGlCQUFBLEdBQXFDLFVBQVUsSUFBVixLQUFBLENBQW9CLFVBQXBCLENBQXJDLENBQUE7Q0FDRDs7QUFFRCxNQUFNLGtCQUFrQixJQUFJLEdBQUosQ0FBUSxPQUFPLElBQVAsMEJBQVIsQ0FBeEIsQ0FBQTtBQUVBLE1BQU0sNkJBQTZCLElBQW5DOztBQUVBLE1BQU0sZ0NBQWdDLDBCQUF0QyxDQUFBO0FBRUEsTUFBTSx5QkFBeUIsd0JBQS9CLENBQUE7QUFDQSxNQUFNLDRCQUE0QiwyQkFBbEMsQ0FBQTs7Ozs7O0FBT0EsTUFBTSxVQUFVLG9CQUFzQjtFQUNwQyxxQkFBQSxRQUFBLFFBQUEsVUFBQSxlQUFBLENBQXlDLE9BQXpDLENBQUEsQ0FBQTs7RUFDQSxNQUFNLFVBQVUsQ0FBQyxVQUFELENBQWhCLENBQUE7O0VBQ0EsU0FBQSxRQUFBLEtBQUEsQ0FBUyxtQ0FBVCxDQUFBLENBQUE7Q0FIRixDQUFBOztBQU1BLElBQUksR0FBQSxhQUFKLEVBQWtCO0VBQ2hCLHFCQUFBLFFBQUEsUUFBQSxVQUFBLFlBQUEsQ0FBc0MsT0FBdEMsQ0FBQSxDQUFBO0NBREYsTUFFTzs7RUFFTCxVQUFVLEVBQUEsTUFBVixDQUFtQixTQUFBLFFBQUEsTUFBbkIsQ0FBQSxDQUFBO0NBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErREQsc0NBQXNDO0VBQ3BDLE1BQU0sWUFBWSxNQUFNLHdCQUF3QixFQUFoRCxDQUFBO0VBQ0EsTUFBTSxlQUFlLE1BQU0sQ0FBQSxDQUFBLEVBQUEsMEJBQUEsUUFBQSxHQUEzQixDQUFBO0VBQ0EsZUFBZSxDQUFDLFNBQUQsRUFBWSxZQUFaLEVBQTBCLFVBQTFCLENBQWYsQ0FBQTs7RUFDQSxJQUFJLENBQUMsR0FBQSxhQUFMLEVBQW1CO0lBQ2pCLE1BQU0sdUJBQXVCLEVBQTdCLENBQUE7R0FDRDs7RUFDRCxTQUFBLFFBQUEsS0FBQSxDQUFTLG1DQUFULENBQUEsQ0FBQTtDQUNEOzs7Ozs7QUFLRCw4Q0FBOEMsS0FBOUMsQ0FBb0Q7RUFDbEQsV0FBVyxHQUFHO0lBQ1osS0FBQSxDQUFNLGdCQUFOLENBQUEsQ0FBQTtHQUNEOztDQUhpRDs7Ozs7OztBQVVwRCx5Q0FBeUM7RUFDdkMsSUFBSSxNQUFKLENBQUE7O0VBQ0EsSUFBSTtJQUNGLE1BQU0sa0NBQWtDLElBQUksR0FBSixDQUN0QyxPQUFPLElBQVAsMEJBRHNDLENBQXhDLENBREU7Ozs7SUFPRiwrQkFBK0IsS0FBL0IsR0FBdUMsbUJBQXZDLENBQUE7SUFFQSxTQUFTLE1BQU0sU0FBTixjQUFBLENBQThCLFFBQTlCLENBQVQsQ0FBQTtJQUNBLE1BQU0sYUFBTixDQUFvQixLQUFwQixFQUEyQiwrQkFBK0IsS0FBMUQsQ0FBQSxDQUFBO0lBQ0EsTUFBTSxhQUFOLENBQW9CLFNBQXBCLEVBQStCLGlDQUEvQixDQUFBLENBWEU7O0lBY0YsSUFBSSxlQUFKLENBQUE7SUFDQSxJQUFJLGNBQUosQ0FBQTtJQUNBLE1BQU0sZUFBZSxJQUFJLE9BQUosQ0FBWSxxQkFBcUI7TUFDcEQsa0JBQWtCLE9BQWxCLENBQUE7TUFDQSxpQkFBaUIsTUFBakIsQ0FBQTtLQUZtQixDQUFyQixDQWhCRTs7O0lBdUJGLE1BQU0saUJBQU4sQ0FBd0IsTUFBeEIsRUFBZ0MsZUFBaEMsQ0FBQSxDQXZCRTs7SUEwQkYsTUFBTSxTQUFOLEtBQUEsWUFBQSxDQUFpQyxNQUFqQyxDQUFBLENBMUJFOzs7O0lBK0JGLFVBQVUsQ0FDUixNQUFNLGNBQWMsQ0FBQyxJQUFJLCtCQUFKLEVBQUQsQ0FEWixFQUVSLDZCQUZRLENBQVYsQ0FBQTtJQUlBLE1BQU0sWUFBTixDQUFBO0dBbkNGLENBb0NFLGNBQWM7SUFDZCxJQUFJLEtBQUssWUFBWSwrQkFBckIsRUFBc0Q7TUFDcEQsT0FBTyxLQUFQLENBQ0Usc0VBREYsQ0FBQSxDQUFBO0tBREYsTUFJTztNQUNMLE9BQU8sTUFBUCxDQUFjLDRDQUFkLEVBQTRELEtBQTVELENBQUEsQ0FBQTtLQUNEO0dBM0NILFNBNENVO0lBQ1IsSUFBSSxNQUFKLEVBQVk7TUFDVixNQUFNLE9BQU4sRUFBQSxDQUFBO0tBQ0Q7R0FDRjs7Ozs7Ozs7Ozs7OztBQWFILDBDQUEwQzs7RUFFeEMsTUFBTSxXQUFXLElBQUksU0FBQSxRQUFKLENBQWE7SUFBRSxZQUFBLFdBQUEsUUFBQTtHQUFmLENBQWpCLENBQUE7RUFDQSxRQUFRLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLE9BQU8sS0FBNUIsQ0FBQSxDQUh3Qzs7O0VBT3hDLGdCQUNFLENBQUMsTUFBTSxVQUFVLElBQVYsRUFBUCxLQUE0QixRQUFRLHFCQUFSLENBQThCLGNBQTlCLENBRDlCLENBUHdDOzs7OztFQWN4QyxJQUFJLGFBQWEsSUFBSSxDQUFDLGFBQWEsS0FBbkMsRUFBMEM7O0lBRXhDLGdCQUFnQixRQUFRLHFCQUFSLENBQThCLGNBQTlCLENBQWhCLENBQUE7SUFDQSxNQUFNLGVBQU4sQ0FBc0Isa0RBQXRCLENBQUEsQ0FBQTtHQWpCc0M7OztFQXFCeEMsUUFBUSxHQUFSLENBQVksT0FBWixFQUFzQixPQUFROztJQUU1QixNQUFNLGlCQUFpQixDQUFBLENBQUEsRUFBQSxnQkFBQSxRQUFBLEVBQWdCLGFBQWhCLENBQXZCLENBQUE7SUFDQSxNQUFNLGlCQUFOLENBQXdCLEdBQXhCLEVBQTZCOztNQUUzQixPQUFPO1FBQUUsY0FBQTtPQUFGO0tBRlQsQ0FBQSxDQUFBO0dBSEYsQ0FBQSxDQXJCd0M7O0VBK0J4QyxnQkFBZ0IsTUFBTSxRQUFRLFlBQVIsQ0FBcUIsYUFBckIsQ0FBdEIsQ0FBQTs7RUFDQSxJQUFJLENBQUMsYUFBTCxFQUFvQjtJQUNsQixNQUFNLElBQUksS0FBSixDQUFVLHdDQUFWLENBQU4sQ0FBQTtHQWpDc0M7OztFQW9DeEMsVUFBVSxZQUFWLENBQXVCLGFBQWEsS0FBcEMsQ0FBQSxDQXBDd0M7O0VBdUN4QyxVQUFVLElBQVYsQ0FBZSxhQUFhLEtBQTVCLENBQUEsQ0F2Q3dDOztFQTBDeEMsT0FBTyxhQUFhLEtBQXBCLENBQUE7Q0FDRDs7Ozs7Ozs7Ozs7OztBQVlELG9FQUFvRTs7OztFQUtsRSxhQUFhLElBQUksbUJBQUEsUUFBSixDQUF1QjtJQUNsQyxpQkFBaUIsT0FBTyxJQUFQLGtCQURpQjs7SUFHbEMsc0JBQXNCLFNBSFk7SUFJbEMsU0FKa0M7O0lBTWxDLFNBTmtDOztJQVFsQyxZQVJrQzs7SUFVbEMsUUFWa0M7SUFXbEMsbUJBWGtDO0lBWWxDLFNBQUEscUJBQUEsUUFaa0M7SUFhbEMseUJBQXlCLE1BQU07TUFDN0IsT0FBTyxvQkFBUCxDQUFBO0tBZGdDO0lBZ0JsQyx3QkFBd0IsTUFBTTtNQUM1QixPQUFPLG1CQUFQLENBQUE7S0FqQmdDO0lBbUJsQyxVQUFBO0dBbkJXLENBQWIsQ0FBQTtFQXNCQSxDQUFBLENBQUEsRUFBQSxNQUFBLFFBQUEsRUFBcUI7SUFDbkIsbUJBQW1CLFVBQVUsa0JBQVYsa0JBQUEsS0FBQSxDQUNqQixVQUFVLGtCQURPLENBREE7SUFJbkIsZ0JBQWdCLFVBQVUsc0JBQVYsZUFBQSxLQUFBLENBQ2QsVUFBVSxzQkFESSxDQUpHO0lBT25CLFVBQVUsVUFBVSxTQUFDO0dBUHZCLENBQUEsQ0EzQmtFOztFQXNDbEUsQ0FBQSxDQUFBLEVBQUEsS0FBQSxRQUFBLEVBQ0UsQ0FBQSxDQUFBLEVBQUEsU0FBQSxjQUFBLEVBQWMsVUFBVSxNQUF4QixDQURGLEVBRUUsQ0FBQSxDQUFBLEVBQUEsZUFBQSxRQUFBLEVBQVMsSUFBVCxDQUZGLEVBR0UsQ0FBQSxDQUFBLEVBQUEsaUJBQUEsUUFBQSxFQUFrQixTQUFVLFVBQVUsSUFBVixDQUFlLEtBQWYsQ0FBNUIsQ0FIRixFQUlHLFNBQVU7SUFDVCxTQUFBLFFBQUEsTUFBQSxDQUFVLHdDQUFWLEVBQW9ELEtBQXBELENBQUEsQ0FBQTtHQUxKLENBQUEsQ0FBQTtFQVNBLHlCQUF5QixDQUFDLFVBQUQsQ0FBekIsQ0EvQ2tFOzs7O0VBb0RsRSxJQUFJLEdBQUEsYUFBQSxJQUFnQixnQkFBcEIsRUFBc0M7SUFDcEMsYUFBYSxDQUFDLGdCQUFELENBQWIsQ0FBQTtHQUNEOztFQUVELHFCQUFBLFFBQUEsUUFBQSxVQUFBLFlBQUEsQ0FBc0MsYUFBdEMsQ0FBQSxDQUFBOztFQUNBLHFCQUFBLFFBQUEsUUFBQSxrQkFBQSxZQUFBLENBQThDLGVBQTlDLENBQUEsQ0FBQTs7RUFFQSxNQUFNLHFCQUFxQixNQUFNO0lBQy9CLE9BQ0UsV0FBVyxJQUNYLE9BQU8sQ0FBQyxNQUFNLEtBQU4sQ0FBWSxtQkFBWixDQUFBLE9BQUQsQ0FEUCxJQUVBLGtCQUhGLENBQUE7R0FERixDQUFBOztFQVFBLE1BQU0sOEJBQThCLG1DQUFtQzs7SUFFckUsSUFBSSxZQUFZLEtBQUssS0FBckIsRUFBNEI7TUFDMUIsVUFBVSxlQUFWLEVBQUEsQ0FEMEI7S0FBNUIsTUFHTzs7O01BR0wsSUFDRSxlQUFlLEtBQUssSUFBQSw0QkFBcEIsSUFDQSxPQUFPLENBQUMsTUFBTSxLQUFOLENBQVksbUJBQVosQ0FBQSxPQUFELENBRlQsRUFHRTtRQUNBLE9BQUE7T0FDRDs7TUFDRCxVQUFVLHdCQUFWLENBQW1DLGVBQW5DLENBQUEsQ0FBQTtLQUNEO0dBZkgsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQ0EsbUNBQW1DO0lBQUEsSUFBQSxrQkFBQSxDQUFBOztJQUNqQyxNQUFNLGNBQWMsVUFBVSxLQUE5QixDQUFBOztJQUVBLElBQUksb0JBQW9CLFNBQXBCLENBQThCLFVBQVUsS0FBeEMsQ0FBSixFQUFvRDtNQUNsRCxPQUFBO0tBQ0Q7O0lBRUQsSUFBSSw0QkFBNEIsS0FBaEMsQ0FBQTtJQUNBLE1BQU0saUJBQWlCLENBQUEsQ0FBQSxFQUFBLEtBQUEsWUFBQSxHQUF2QixDQUFBOztJQUVBLElBQUksY0FBYyxLQUFLLElBQUEsaUJBQXZCLEVBQXlDO01BQ3ZDLDRCQUE0QiwyQkFBMkIsQ0FBQyxXQUFELENBQXZELENBQUE7S0FERixNQUVPO01BQ0wsNEJBQ0UsVUFBVSxPQUFWLE9BQUEsS0FBOEIsQ0FBQSxtQkFBQSxFQUFxQixxQkFBQSxRQUFBLFFBQUEsR0FBbUIsQ0FBQSxDQUR4RSxDQUFBO0tBRUQ7O0lBRUQsTUFBTSxZQUFZLENBQUEscUJBQUEsVUFBVSxPQUFWLE1BQUEsSUFBQSxJQUFBLGtCQUFBLEtBQUEsS0FBQSxDQUFBLElBQUEsa0JBQUEsSUFBQSxHQUNkLElBQUksR0FBSixDQUFRLFVBQVUsT0FBVixJQUFSLENBRGMsR0FFZCxJQUZKLENBQUE7O0lBSUEsSUFBSSx5QkFBSixFQUErQjtNQUM3QixNQUFNLGFBQWEsSUFBSSxvQkFBQSxRQUFKLENBQWUsVUFBZixDQUFuQixDQUQ2Qjs7TUFHN0IsVUFBVSxhQUFWLEdBQTBCLElBQTFCLENBQUE7TUFDQSxVQUFVLDBCQUFWLENBQXFDLFVBQXJDLEVBQWlELFVBQVUsT0FBM0QsQ0FBQSxDQUFBOztNQUVBLElBQUksR0FBQSxhQUFKLEVBQWtCOzs7O1FBSWhCLFVBQVUsWUFBVixDQUF1QjtVQUFFLE1BQU0sa0JBQUE7U0FBL0IsQ0FBQSxDQUpnQjs7UUFPaEIsVUFBVSxVQUFWLFlBQUEsQ0FBa0MsV0FBWTtVQUM1QyxJQUFJLE9BQU8sS0FBUCxLQUFpQix5QkFBckIsRUFBZ0Q7O1lBRTlDLFVBQVUsWUFBVixDQUF1QjtjQUFFLE1BQU0sc0JBQUE7YUFBL0IsQ0FBQSxDQUFBO1dBQ0Q7U0FKSCxDQUFBLENBQUE7T0FNRDs7TUFFRCxJQUFJLFdBQVcsS0FBSyxJQUFBLHVCQUFwQixFQUE0QztRQUMxQyxjQUFjLElBQWQsQ0FBQTtRQUNBLENBQUEsQ0FBQSxFQUFBLFlBQUEsUUFBQSxFQUFZLFVBQVosRUFBd0IsTUFBTTtVQUM1QixjQUFjLEtBQWQsQ0FBQTtVQUNBLE1BQU0sZUFBZSxrQkFBa0IsRUFBdkMsQ0FBQTtVQUNBLFVBQVUsYUFBVixHQUEwQixZQUExQixDQUFBO1VBQ0EsMkJBQTJCLENBQUMsWUFBRCxFQUFlLElBQUEsdUJBQWYsQ0FBM0IsQ0FBQTtTQUpGLENBQUEsQ0FBQTtPQU1EOztNQUVELElBQUksV0FBVyxLQUFLLElBQUEsOEJBQXBCLEVBQW1EO1FBQ2pELHFCQUFxQixJQUFyQixDQUFBO1FBRUEsQ0FBQSxDQUFBLEVBQUEsWUFBQSxRQUFBLEVBQVksVUFBWixFQUF3QixNQUFNO1VBQzVCLHFCQUFxQixLQUFyQixDQUFBO1VBQ0EsTUFBTSxlQUFlLGtCQUFrQixFQUF2QyxDQUFBO1VBQ0EsVUFBVSxhQUFWLEdBQTBCLFlBQTFCLENBQUE7VUFDQSwyQkFBMkIsQ0FDekIsWUFEeUIsRUFFekIsSUFBQSw4QkFGeUIsQ0FBM0IsQ0FBQTtTQUpGLENBQUEsQ0FBQTtPQVNEOztNQUVELElBQUksV0FBVyxLQUFLLElBQUEsNEJBQXBCLEVBQWlEO1FBQy9DLE1BQU0sUUFBUSxVQUFVLE9BQVYsSUFBQSxHQUFkLENBQUE7UUFDQSxtQkFBbUIsQ0FBQyxLQUFELENBQW5CLEdBQTZCLElBQTdCLENBQUE7UUFFQSxDQUFBLENBQUEsRUFBQSxZQUFBLFFBQUEsRUFBWSxVQUFaLEVBQXdCLE1BQU07VUFDNUIsT0FBTyxtQkFBbUIsQ0FBQyxLQUFELENBQTFCLENBQUE7VUFDQSxNQUFNLGVBQWUsa0JBQWtCLEVBQXZDLENBQUE7VUFDQSxVQUFVLGFBQVYsR0FBMEIsWUFBMUIsQ0FBQTtVQUNBLDJCQUEyQixDQUN6QixZQUR5QixFQUV6QixJQUFBLDRCQUZ5QixDQUEzQixDQUFBO1NBSkYsQ0FBQSxDQUFBO09BU0Q7S0ExREgsTUEyRE8sSUFDTCxTQUFTLElBQ1QsU0FBUyxPQUFULEtBQXFCLGVBQWUsT0FEcEMsSUFFQSxTQUFTLFNBQVQsS0FBdUIsZUFBZSxTQUhqQyxFQUlMO01BQ0EsTUFBTSxhQUFhLElBQUksb0JBQUEsUUFBSixDQUFlLFVBQWYsQ0FBbkIsQ0FBQTtNQUNBLFVBQVUsMkJBQVYsQ0FBc0M7UUFDcEMsa0JBQWtCLFVBQUE7T0FEcEIsQ0FBQSxDQUFBO0tBTkssTUFTQTtNQUNMLElBQUksVUFBVSxPQUFWLElBQXFCLFVBQVUsT0FBVixJQUFyQixJQUE4QyxVQUFVLE9BQVYsSUFBbEQsRUFBeUU7UUFDdkUsTUFBTSxRQUFRLFVBQVUsT0FBVixJQUFBLEdBQWQsQ0FBQTtRQUNBLE1BQU0sTUFBTSxJQUFJLEdBQUosQ0FBUSxVQUFVLE9BQVYsSUFBUixDQUFaLENBQUE7UUFDQSxNQUFNOztTQUFBLEdBQWEsR0FBbkIsQ0FBQTtRQUVBLFVBQVUsVUFBVixZQUFBLENBQWtDLE9BQVE7VUFDeEMsSUFBSSxHQUFHLEtBQUgsSUFBWSxHQUFHLEtBQUgsT0FBQSxLQUFvQixxQkFBcEMsRUFBMkQ7WUFDekQsb0JBQW9CLENBQUMsTUFBRCxDQUFwQixHQUErQixLQUEvQixDQUFBO1dBQ0Q7U0FISCxDQUFBLENBQUE7T0FLRDs7TUFDRCxlQUFlLENBQUMsVUFBRCxDQUFmLENBQUE7S0FDRDtHQXpNK0Q7OztFQTZNbEUscUNBQXFDO0lBQ25DLE1BQU0sYUFBYSxJQUFJLG9CQUFBLFFBQUosQ0FBZSxVQUFmLENBQW5CLENBQUE7SUFDQSxVQUFVLDRCQUFWLENBQXVDO01BQ3JDLGtCQUFrQixVQURtQjtNQUVyQyxRQUFRLFVBQVUsT0FBQztLQUZyQixDQUFBLENBQUE7R0EvTWdFOzs7OztFQXlObEUsV0FBVyxFQUFBLENBQUE7RUFDWCxVQUFVLGFBQVYsR0FBQSxDQUNFLG1CQUFBLDJCQUFBLGFBREYsRUFFRSxXQUZGLENBQUEsQ0FBQTtFQUlBLFVBQVUsZUFBVixHQUFBLENBQ0UsbUJBQUEsMkJBQUEsYUFERixFQUVFLFdBRkYsQ0FBQSxDQUFBO0VBSUEsVUFBVSx1QkFBVixHQUFBLENBQ0UsbUJBQUEsMkJBQUEsYUFERixFQUVFLFdBRkYsQ0FBQSxDQUFBO0VBSUEsVUFBVSxzQkFBVixHQUFBLENBQ0UsbUJBQUEsMkJBQUEsYUFERixFQUVFLFdBRkYsQ0FBQSxDQUFBO0VBSUEsVUFBVSwyQkFBVixHQUFBLENBQ0UsbUJBQUEsMkJBQUEsYUFERixFQUVFLFdBRkYsQ0FBQSxDQUFBO0VBSUEsVUFBVSxvQkFBVixHQUFBLENBQ0UsbUJBQUEsMkJBQUEsYUFERixFQUVFLFdBRkYsQ0FBQSxDQUFBO0VBSUEsVUFBVSxtQkFBVixHQUFBLENBQ0UsbUJBQUEsMkJBQUEsYUFERixFQUVFLFdBRkYsQ0FBQSxDQUFBO0VBS0EsVUFBVSxvQkFBVixVQUFBLENBQ0UsbUJBQUEsMkJBQUEsc0JBREYsRUFFRSxXQUZGLENBQUEsQ0FBQTs7Ozs7O0VBU0EsdUJBQXVCO0lBQ3JCLElBQUksUUFBUSxFQUFaLENBQUE7SUFDQSxNQUFNLFFBQVEsNkJBQTZCLEVBQTNDLENBQUE7O0lBQ0EsSUFBSSxLQUFKLEVBQVc7TUFDVCxRQUFRLE1BQU0sQ0FBQyxLQUFELENBQWQsQ0FBQTtLQUptQjs7O0lBT3JCLElBQUksR0FBQSxhQUFKLEVBQWtCO01BQ2hCLHFCQUFBLFFBQUEsT0FBQSxhQUFBLENBQTRCO1FBQUUsTUFBTSxLQUFBO09BQXBDLENBQUEsQ0FBQTs7TUFDQSxxQkFBQSxRQUFBLE9BQUEsd0JBQUEsQ0FBdUM7UUFBRSxPQUFPLFNBQUE7T0FBaEQsQ0FBQSxDQUFBO0tBRkYsTUFHTztNQUNMLHFCQUFBLFFBQUEsY0FBQSxhQUFBLENBQW1DO1FBQUUsTUFBTSxLQUFBO09BQTNDLENBQUEsQ0FBQTs7TUFDQSxxQkFBQSxRQUFBLGNBQUEsd0JBQUEsQ0FBOEM7UUFBRSxPQUFPLFNBQUE7T0FBdkQsQ0FBQSxDQUFBO0tBQ0Q7R0FDRjs7RUFFRCx5Q0FBeUM7SUFDdkMsTUFBTSxvQkFBb0IsVUFBVSxhQUFWLHFCQUFBLEVBQTFCLENBQUE7SUFDQSxNQUFNOztLQUFBLEdBQXlCLFVBQVUsZUFBekMsQ0FBQTtJQUNBLE1BQU07O0tBQUEsR0FBaUMsVUFBVSx1QkFBakQsQ0FBQTtJQUNBLE1BQU07O0tBQUEsR0FBZ0MsVUFBVSxzQkFBaEQsQ0FBQTtJQUNBLE1BQU07O0tBQUEsR0FDSixVQUFVLDJCQURaLENBQUE7SUFFQSxNQUFNOztLQUFBLEdBQW1DLFVBQVUsb0JBQW5ELENBQUE7SUFDQSxNQUFNLHVCQUNKLFVBQVUsbUJBQVYsc0JBQUEsRUFERixDQUFBO0lBRUEsTUFBTSx3QkFDSixVQUFVLG1CQUFWLGlCQUFBLE9BREYsQ0FBQTtJQUVBLE9BQ0UsaUJBQWlCLEdBQ2pCLGtCQURBLEdBRUEsMEJBRkEsR0FHQSx5QkFIQSxHQUlBLHFDQUpBLEdBS0EsNEJBTEEsR0FNQSxvQkFOQSxHQU9BLHFCQVJGLENBQUE7R0FVRDs7RUFFRCxtQkFBbUIsR0FBbkIsQ0FDRSxvQkFBQSw0QkFBQSxhQURGLEVBRUUsQ0FBQzs7R0FBRCxLQUE2QjtJQUMzQixJQUFJLENBQUMsbUJBQUwsRUFBMEI7TUFDeEIsNkJBQTZCLEVBQUEsQ0FBQTtLQUQvQixNQUVPLElBQUksNkJBQTZCLEVBQUEsR0FBSyxDQUF0QyxFQUF5QztNQUM5QyxTQUFTLEVBQUEsQ0FBQTtLQUNWO0dBUEwsQ0FBQSxDQUFBOztFQVdBLHlDQUF5QztJQUN2QyxNQUFNLEtBQU4sQ0FDRSxVQUFVLGFBQVYsZUFBQSxvQkFBQSxFQURGLENBQUEsUUFBQSxDQUVXLFFBQ1QsVUFBVSxhQUFWLGVBQUEsb0JBQUEsQ0FBMkQsSUFBM0QsQ0FIRixDQUFBLENBQUE7SUFLQSxVQUFVLGVBQVYsU0FBQSxPQUFBLENBQ1csT0FBUSxHQUFHLE9BQUgsS0FBZSxZQURsQyxDQUFBLFFBQUEsQ0FFWSxNQUNSLFVBQVUsZUFBVixVQUFBLENBQ0UsRUFBRSxHQURKLEVBRUUsWUFBQSw4QkFGRixDQUhKLENBQUEsQ0FBQTtJQVFBLFVBQVUsdUJBQVYsU0FBQSxPQUFBLENBQ1csT0FBUSxHQUFHLE9BQUgsS0FBZSxZQURsQyxDQUFBLFFBQUEsQ0FFWSxNQUNSLFVBQVUsdUJBQVYsVUFBQSxDQUNFLEVBQUUsR0FESixFQUVFLFlBQUEsOEJBRkYsQ0FISixDQUFBLENBQUE7SUFRQSxVQUFVLG9CQUFWLFNBQUEsT0FBQSxDQUNXLE9BQVEsR0FBRyxPQUFILEtBQWUsWUFEbEMsQ0FBQSxRQUFBLENBRVksTUFDUixVQUFVLG9CQUFWLFVBQUEsQ0FDRSxFQUFFLEdBREosRUFFRSxZQUFBLDhCQUZGLENBSEosQ0FBQSxDQUFBO0lBUUEsVUFBVSxzQkFBVixTQUFBLE9BQUEsQ0FDVyxPQUFRLEdBQUcsT0FBSCxLQUFlLFlBRGxDLENBQUEsUUFBQSxDQUVZLE1BQ1IsVUFBVSxzQkFBVixVQUFBLENBQ0UsRUFBRSxHQURKLEVBRUUsWUFBQSwwQkFGRixDQUhKLENBQUEsQ0FBQTtJQVFBLFVBQVUsMkJBQVYsU0FBQSxPQUFBLENBQ1csT0FBUSxHQUFHLE9BQUgsS0FBZSxZQURsQyxDQUFBLFFBQUEsQ0FFWSxNQUNSLFVBQVUsMkJBQVYsVUFBQSxDQUNFLEVBQUUsR0FESixFQUVFLFlBQUEsMEJBRkYsQ0FISixDQUFBLENBdEN1Qzs7SUFnRHZDLFVBQVUsbUJBQVYsTUFBQSxDQUNFLGFBQUEsVUFBQSxTQUFBLG9CQUFBLEVBREYsQ0FBQSxDQUFBO0lBSUEsV0FBVyxFQUFBLENBQUE7R0FDWjs7Ozs7Ozs7OztBQVVILDJCQUEyQjtFQUN6QixNQUFNLE9BQU8sTUFBTSxRQUFRLGNBQVIsRUFBbkIsQ0FBQTtFQUNBLE1BQU0sNkJBQTZCLE9BQU8sQ0FDeEMsSUFBSSxLQUFKLENBQVcsT0FBUSxtQkFBbUIsQ0FBQyxHQUFHLEdBQUosQ0FBdEMsQ0FEd0MsQ0FBMUMsQ0FGeUI7OztFQU96QixNQUFNLFlBQ0osSUFBSSxPQUFKLEdBQWMsQ0FBZCxJQUNBLElBQUksQ0FBQyxDQUFELENBQUosUUFEQSxJQUVBLElBQUksQ0FBQyxDQUFELENBQUosUUFBQSxRQUFBLENBQXdCLGFBQXhCLENBQUEsR0FBeUMsQ0FBQyxDQUg1QyxDQUFBOztFQUlBLElBQ0UsQ0FBQyxjQUFELEtBQ0MsU0FBUyxJQUFJLENBQUMsV0FEZixDQUFBLElBRUEsQ0FBQywwQkFISCxFQUlFO0lBQ0EsaUJBQWlCLElBQWpCLENBQUE7O0lBQ0EsSUFBSTtNQUNGLE1BQU0sbUJBQW1CLFVBQW5CLEVBQU4sQ0FBQTtLQURGLFNBRVU7TUFDUixpQkFBaUIsS0FBakIsQ0FBQTtLQUNEO0dBQ0Y7Q0FDRjs7Ozs7OztBQU1ELDJCQUEyQjtFQUN6QixNQUFNLFNBQVMsRUFBZixDQUFBO0VBQ0EsTUFBTSxJQUFJLE9BQUosQ0FBYSxXQUFZO0lBQzdCLE1BQU0sV0FBVyxXQUFXLENBQUMsTUFBTTtNQUNqQyxJQUFJLENBQUMsa0JBQUwsRUFBeUI7UUFDdkIsYUFBYSxDQUFDLFFBQUQsQ0FBYixDQUFBO1FBQ0EsT0FBTyxFQUFBLENBQUE7T0FDUjtLQUp5QixFQUt6QixLQUFBLE9BTHlCLENBQTVCLENBQUE7R0FESSxDQUFOLENBQUE7Ozs7QUFXRixNQUFNLHVCQUF1QixNQUFNO0VBQ2pDLElBQUksVUFBSixFQUFnQjtJQUNkLFVBQVUsc0JBQVYsYUFBQSxDQUE4QztNQUM1QyxDQUFDLFlBQUEsT0FBQSxpQkFBRCxHQUEyQixJQUFJLElBQUosRUFBQSxZQUFBLEVBQUEsTUFBQSxDQUErQixHQUEvQixDQUFBLENBQW9DLENBQXBDLENBRGlCOztLQUE5QyxDQUFBLENBQUE7SUFHQSxVQUFVLHNCQUFWLDJCQUFBLENBQTREO01BQzFELFVBQVUsWUFBQSxNQUFBLFdBQUEsSUFEZ0Q7TUFFMUQsT0FBTyxZQUFBLFlBQUEsY0FGbUQ7TUFHMUQsWUFBWSxFQUFBO0tBSGQsQ0FBQSxDQUFBO0lBS0EsT0FBQTtHQUNEOztFQUNELFVBQVUsQ0FBQyxNQUFNOztJQUVmLG9CQUFvQixFQUFBLENBQUE7R0FGWixFQUdQLElBSE8sQ0FBVixDQUFBO0NBWkY7OztBQW1CQSxxQkFBQSxRQUFBLFFBQUEsWUFBQSxZQUFBLENBQXdDLENBQUM7O0NBQUQsS0FBZ0I7RUFDdEQsSUFDRSxNQUFNLEtBQUssU0FBWCxJQUNBLEVBQUUsT0FBTyxJQUFQLGVBQUEsSUFBOEIsT0FBTyxJQUFQLFFBQWhDLENBRkYsRUFHRTtJQUNBLG9CQUFvQixFQUFBLENBQUE7SUFDcEIsUUFBUSx1QkFBUixFQUFBLENBQUE7R0FDRDtDQVBILENBQUEsQ0FBQTs7QUFVQSwwQ0FBMEM7RUFDeEMsTUFBTSxXQUFOLGVBQUEsR0FBbUMsWUFBWTtJQUM3QyxNQUFNLFlBQVksS0FBSyxTQUFMLEVBQWxCLENBQUE7SUFDQSxNQUFNLGFBQWEsQ0FBQSxDQUFBLEVBQUEsT0FBQSxXQUFBLEVBQVc7TUFBRSxVQUFVLFNBQUE7S0FBdkIsRUFBb0MsWUFBQSxhQUFwQyxDQUFuQixDQUFBO0lBQ0EsT0FBTztNQUNMLFNBQVMsTUFBTSxVQUFOLFVBREo7TUFFTCxPQUFPLFVBRkY7TUFHTCxTQUFTLFFBQVEsV0FBUixFQUFBO0tBSFgsQ0FBQTtHQUhGLENBQUE7Q0FTRCIsImZpbGUiOiJiYWNrZ3JvdW5kLTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgZ2V0U3ltYm9scyA9IHJlcXVpcmUoJy4vX2dldFN5bWJvbHMnKSxcbiAgICBzdHViQXJyYXkgPSByZXF1aXJlKCcuL3N0dWJBcnJheScpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzSW4gPSAhbmF0aXZlR2V0U3ltYm9scyA/IHN0dWJBcnJheSA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHdoaWxlIChvYmplY3QpIHtcbiAgICBhcnJheVB1c2gocmVzdWx0LCBnZXRTeW1ib2xzKG9iamVjdCkpO1xuICAgIG9iamVjdCA9IGdldFByb3RvdHlwZShvYmplY3QpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFN5bWJvbHNJbjtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBuZXcgYXJyYXkuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICAvLyBBZGQgcHJvcGVydGllcyBhc3NpZ25lZCBieSBgUmVnRXhwI2V4ZWNgLlxuICBpZiAobGVuZ3RoICYmIHR5cGVvZiBhcnJheVswXSA9PSAnc3RyaW5nJyAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCAnaW5kZXgnKSkge1xuICAgIHJlc3VsdC5pbmRleCA9IGFycmF5LmluZGV4O1xuICAgIHJlc3VsdC5pbnB1dCA9IGFycmF5LmlucHV0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lQXJyYXk7XG4iLCJ2YXIgY2xvbmVBcnJheUJ1ZmZlciA9IHJlcXVpcmUoJy4vX2Nsb25lQXJyYXlCdWZmZXInKSxcbiAgICBjbG9uZURhdGFWaWV3ID0gcmVxdWlyZSgnLi9fY2xvbmVEYXRhVmlldycpLFxuICAgIGNsb25lUmVnRXhwID0gcmVxdWlyZSgnLi9fY2xvbmVSZWdFeHAnKSxcbiAgICBjbG9uZVN5bWJvbCA9IHJlcXVpcmUoJy4vX2Nsb25lU3ltYm9sJyksXG4gICAgY2xvbmVUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9fY2xvbmVUeXBlZEFycmF5Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZSBiYXNlZCBvbiBpdHMgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNsb25pbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBNYXBgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIGBTZXRgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVCeVRhZyhvYmplY3QsIHRhZywgaXNEZWVwKSB7XG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVBcnJheUJ1ZmZlcihvYmplY3QpO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIHJldHVybiBuZXcgQ3Rvcigrb2JqZWN0KTtcblxuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICByZXR1cm4gY2xvbmVEYXRhVmlldyhvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIGZsb2F0MzJUYWc6IGNhc2UgZmxvYXQ2NFRhZzpcbiAgICBjYXNlIGludDhUYWc6IGNhc2UgaW50MTZUYWc6IGNhc2UgaW50MzJUYWc6XG4gICAgY2FzZSB1aW50OFRhZzogY2FzZSB1aW50OENsYW1wZWRUYWc6IGNhc2UgdWludDE2VGFnOiBjYXNlIHVpbnQzMlRhZzpcbiAgICAgIHJldHVybiBjbG9uZVR5cGVkQXJyYXkob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3I7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIHJldHVybiBuZXcgQ3RvcihvYmplY3QpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVSZWdFeHAob2JqZWN0KTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yO1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTeW1ib2wob2JqZWN0KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRDbG9uZUJ5VGFnO1xuIiwidmFyIGJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL19iYXNlQ3JlYXRlJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lT2JqZWN0O1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlS2V5c0luO1xuIiwiLyoqIFVzZWQgdG8gbWF0Y2ggYSBzaW5nbGUgd2hpdGVzcGFjZSBjaGFyYWN0ZXIuICovXG52YXIgcmVXaGl0ZXNwYWNlID0gL1xccy87XG5cbi8qKlxuICogVXNlZCBieSBgXy50cmltYCBhbmQgYF8udHJpbUVuZGAgdG8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgbGFzdCBub24td2hpdGVzcGFjZVxuICogY2hhcmFjdGVyIG9mIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBsYXN0IG5vbi13aGl0ZXNwYWNlIGNoYXJhY3Rlci5cbiAqL1xuZnVuY3Rpb24gdHJpbW1lZEVuZEluZGV4KHN0cmluZykge1xuICB2YXIgaW5kZXggPSBzdHJpbmcubGVuZ3RoO1xuXG4gIHdoaWxlIChpbmRleC0tICYmIHJlV2hpdGVzcGFjZS50ZXN0KHN0cmluZy5jaGFyQXQoaW5kZXgpKSkge31cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyaW1tZWRFbmRJbmRleDtcbiIsInZhciBiYXNlQ2xvbmUgPSByZXF1aXJlKCcuL19iYXNlQ2xvbmUnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY2xvbmluZy4gKi9cbnZhciBDTE9ORV9ERUVQX0ZMQUcgPSAxLFxuICAgIENMT05FX1NZTUJPTFNfRkxBRyA9IDQ7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5jbG9uZWAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgY2xvbmVzIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAxLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJlY3Vyc2l2ZWx5IGNsb25lLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGRlZXAgY2xvbmVkIHZhbHVlLlxuICogQHNlZSBfLmNsb25lXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW3sgJ2EnOiAxIH0sIHsgJ2InOiAyIH1dO1xuICpcbiAqIHZhciBkZWVwID0gXy5jbG9uZURlZXAob2JqZWN0cyk7XG4gKiBjb25zb2xlLmxvZyhkZWVwWzBdID09PSBvYmplY3RzWzBdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGNsb25lRGVlcCh2YWx1ZSkge1xuICByZXR1cm4gYmFzZUNsb25lKHZhbHVlLCBDTE9ORV9ERUVQX0ZMQUcgfCBDTE9ORV9TWU1CT0xTX0ZMQUcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lRGVlcDtcbiIsInZhciBiYXNlSW5SYW5nZSA9IHJlcXVpcmUoJy4vX2Jhc2VJblJhbmdlJyksXG4gICAgdG9GaW5pdGUgPSByZXF1aXJlKCcuL3RvRmluaXRlJyksXG4gICAgdG9OdW1iZXIgPSByZXF1aXJlKCcuL3RvTnVtYmVyJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBuYCBpcyBiZXR3ZWVuIGBzdGFydGAgYW5kIHVwIHRvLCBidXQgbm90IGluY2x1ZGluZywgYGVuZGAuIElmXG4gKiBgZW5kYCBpcyBub3Qgc3BlY2lmaWVkLCBpdCdzIHNldCB0byBgc3RhcnRgIHdpdGggYHN0YXJ0YCB0aGVuIHNldCB0byBgMGAuXG4gKiBJZiBgc3RhcnRgIGlzIGdyZWF0ZXIgdGhhbiBgZW5kYCB0aGUgcGFyYW1zIGFyZSBzd2FwcGVkIHRvIHN1cHBvcnRcbiAqIG5lZ2F0aXZlIHJhbmdlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMy4wXG4gKiBAY2F0ZWdvcnkgTnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIFRoZSBudW1iZXIgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBvZiB0aGUgcmFuZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIFRoZSBlbmQgb2YgdGhlIHJhbmdlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBudW1iZXJgIGlzIGluIHRoZSByYW5nZSwgZWxzZSBgZmFsc2VgLlxuICogQHNlZSBfLnJhbmdlLCBfLnJhbmdlUmlnaHRcbiAqIEBleGFtcGxlXG4gKlxuICogXy5pblJhbmdlKDMsIDIsIDQpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaW5SYW5nZSg0LCA4KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmluUmFuZ2UoNCwgMik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaW5SYW5nZSgyLCAyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pblJhbmdlKDEuMiwgMik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pblJhbmdlKDUuMiwgNCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaW5SYW5nZSgtMywgLTIsIC02KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaW5SYW5nZShudW1iZXIsIHN0YXJ0LCBlbmQpIHtcbiAgc3RhcnQgPSB0b0Zpbml0ZShzdGFydCk7XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHN0YXJ0O1xuICAgIHN0YXJ0ID0gMDtcbiAgfSBlbHNlIHtcbiAgICBlbmQgPSB0b0Zpbml0ZShlbmQpO1xuICB9XG4gIG51bWJlciA9IHRvTnVtYmVyKG51bWJlcik7XG4gIHJldHVybiBiYXNlSW5SYW5nZShudW1iZXIsIHN0YXJ0LCBlbmQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluUmFuZ2U7XG4iLCJ2YXIgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGVtcHR5IG9iamVjdCwgY29sbGVjdGlvbiwgbWFwLCBvciBzZXQuXG4gKlxuICogT2JqZWN0cyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgbm8gb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkXG4gKiBwcm9wZXJ0aWVzLlxuICpcbiAqIEFycmF5LWxpa2UgdmFsdWVzIHN1Y2ggYXMgYGFyZ3VtZW50c2Agb2JqZWN0cywgYXJyYXlzLCBidWZmZXJzLCBzdHJpbmdzLCBvclxuICogalF1ZXJ5LWxpa2UgY29sbGVjdGlvbnMgYXJlIGNvbnNpZGVyZWQgZW1wdHkgaWYgdGhleSBoYXZlIGEgYGxlbmd0aGAgb2YgYDBgLlxuICogU2ltaWxhcmx5LCBtYXBzIGFuZCBzZXRzIGFyZSBjb25zaWRlcmVkIGVtcHR5IGlmIHRoZXkgaGF2ZSBhIGBzaXplYCBvZiBgMGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZW1wdHksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0VtcHR5KG51bGwpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFbXB0eSh0cnVlKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRW1wdHkoMSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0VtcHR5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNFbXB0eSh7ICdhJzogMSB9KTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmXG4gICAgICAoaXNBcnJheSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZS5zcGxpY2UgPT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICBpc0J1ZmZlcih2YWx1ZSkgfHwgaXNUeXBlZEFycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpKSB7XG4gICAgcmV0dXJuICF2YWx1ZS5sZW5ndGg7XG4gIH1cbiAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSk7XG4gIGlmICh0YWcgPT0gbWFwVGFnIHx8IHRhZyA9PSBzZXRUYWcpIHtcbiAgICByZXR1cm4gIXZhbHVlLnNpemU7XG4gIH1cbiAgaWYgKGlzUHJvdG90eXBlKHZhbHVlKSkge1xuICAgIHJldHVybiAhYmFzZUtleXModmFsdWUpLmxlbmd0aDtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VtcHR5O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gaW50ZWdlci5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgYmFzZWQgb25cbiAqIFtgTnVtYmVyLmlzSW50ZWdlcmBdKGh0dHBzOi8vbWRuLmlvL051bWJlci9pc0ludGVnZXIpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGludGVnZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0ludGVnZXIoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNJbnRlZ2VyKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0ludGVnZXIoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID09IHRvSW50ZWdlcih2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbnRlZ2VyO1xuIiwidmFyIGJhc2VJc01hcCA9IHJlcXVpcmUoJy4vX2Jhc2VJc01hcCcpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIG5vZGVVdGlsID0gcmVxdWlyZSgnLi9fbm9kZVV0aWwnKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNNYXAgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc01hcDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYE1hcGAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbWFwLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNNYXAobmV3IE1hcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc01hcChuZXcgV2Vha01hcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNNYXAgPSBub2RlSXNNYXAgPyBiYXNlVW5hcnkobm9kZUlzTWFwKSA6IGJhc2VJc01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSBpc01hcDtcbiIsInZhciBiYXNlSXNTZXQgPSByZXF1aXJlKCcuL19iYXNlSXNTZXQnKSxcbiAgICBiYXNlVW5hcnkgPSByZXF1aXJlKCcuL19iYXNlVW5hcnknKSxcbiAgICBub2RlVXRpbCA9IHJlcXVpcmUoJy4vX25vZGVVdGlsJyk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzU2V0ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNTZXQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTZXRgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHNldCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU2V0KG5ldyBTZXQpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTZXQobmV3IFdlYWtTZXQpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzU2V0ID0gbm9kZUlzU2V0ID8gYmFzZVVuYXJ5KG5vZGVJc1NldCkgOiBiYXNlSXNTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTZXQ7XG4iLCJ2YXIgYXJyYXlMaWtlS2V5cyA9IHJlcXVpcmUoJy4vX2FycmF5TGlrZUtleXMnKSxcbiAgICBiYXNlS2V5c0luID0gcmVxdWlyZSgnLi9fYmFzZUtleXNJbicpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47XG4iLCJ2YXIgdG9OdW1iZXIgPSByZXF1aXJlKCcuL3RvTnVtYmVyJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwODtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgZmluaXRlIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTIuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvRmluaXRlKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvRmluaXRlKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b0Zpbml0ZShJbmZpbml0eSk7XG4gKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICpcbiAqIF8udG9GaW5pdGUoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvRmluaXRlKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6IDA7XG4gIH1cbiAgdmFsdWUgPSB0b051bWJlcih2YWx1ZSk7XG4gIGlmICh2YWx1ZSA9PT0gSU5GSU5JVFkgfHwgdmFsdWUgPT09IC1JTkZJTklUWSkge1xuICAgIHZhciBzaWduID0gKHZhbHVlIDwgMCA/IC0xIDogMSk7XG4gICAgcmV0dXJuIHNpZ24gKiBNQVhfSU5URUdFUjtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gdmFsdWUgOiAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvRmluaXRlO1xuIiwidmFyIHRvRmluaXRlID0gcmVxdWlyZSgnLi90b0Zpbml0ZScpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gaW50ZWdlci5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0ludGVnZXJgXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9pbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBpbnRlZ2VyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvSW50ZWdlcigzLjIpO1xuICogLy8gPT4gM1xuICpcbiAqIF8udG9JbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gMFxuICpcbiAqIF8udG9JbnRlZ2VyKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0ludGVnZXIoJzMuMicpO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IHRvRmluaXRlKHZhbHVlKSxcbiAgICAgIHJlbWFpbmRlciA9IHJlc3VsdCAlIDE7XG5cbiAgcmV0dXJuIHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlbWFpbmRlciA/IHJlc3VsdCAtIHJlbWFpbmRlciA6IHJlc3VsdCkgOiAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvSW50ZWdlcjtcbiIsInZhciBiYXNlVHJpbSA9IHJlcXVpcmUoJy4vX2Jhc2VUcmltJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSBiYXNlVHJpbSh2YWx1ZSk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTnVtYmVyO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgZW5jb2RlVGV4dCB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL3R5cGVzJykuQ29kZWNGYWN0b3J5fSBDb2RlY0ZhY3RvcnkgKi9cbi8qKiBAdHlwZWRlZiB7X19pbXBvcnRfXyhcIi4vdHlwZXNcIikuQmFzZU5hbWV9IEJhc2VOYW1lICovXG4vKiogQHR5cGVkZWYge19faW1wb3J0X18oXCIuL3R5cGVzXCIpLkJhc2VDb2RlfSBCYXNlQ29kZSAqL1xuXG4vKipcbiAqIENsYXNzIHRvIGVuY29kZS9kZWNvZGUgaW4gdGhlIHN1cHBvcnRlZCBCYXNlc1xuICpcbiAqL1xuY2xhc3MgQmFzZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0Jhc2VOYW1lfSBuYW1lXG4gICAqIEBwYXJhbSB7QmFzZUNvZGV9IGNvZGVcbiAgICogQHBhcmFtIHtDb2RlY0ZhY3Rvcnl9IGZhY3RvcnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFscGhhYmV0XG4gICAqL1xuICBjb25zdHJ1Y3RvciAobmFtZSwgY29kZSwgZmFjdG9yeSwgYWxwaGFiZXQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdGhpcy5jb2RlID0gY29kZVxuICAgIHRoaXMuY29kZUJ1ZiA9IGVuY29kZVRleHQodGhpcy5jb2RlKVxuICAgIHRoaXMuYWxwaGFiZXQgPSBhbHBoYWJldFxuICAgIHRoaXMuY29kZWMgPSBmYWN0b3J5KGFscGhhYmV0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBlbmNvZGUgKGJ1Zikge1xuICAgIHJldHVybiB0aGlzLmNvZGVjLmVuY29kZShidWYpXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAgICovXG4gIGRlY29kZSAoc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBjaGFyIG9mIHN0cmluZykge1xuICAgICAgaWYgKHRoaXMuYWxwaGFiZXQgJiYgdGhpcy5hbHBoYWJldC5pbmRleE9mKGNoYXIpIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgY2hhcmFjdGVyICcke2NoYXJ9JyBpbiAnJHtzdHJpbmd9J2ApXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvZGVjLmRlY29kZShzdHJpbmcpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgYmFzZVggPSByZXF1aXJlKCdAbXVsdGlmb3JtYXRzL2Jhc2UteCcpXG5jb25zdCBCYXNlID0gcmVxdWlyZSgnLi9iYXNlLmpzJylcbmNvbnN0IHsgcmZjNDY0OCB9ID0gcmVxdWlyZSgnLi9yZmM0NjQ4JylcbmNvbnN0IHsgZGVjb2RlVGV4dCwgZW5jb2RlVGV4dCB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL3R5cGVzJykuQ29kZWNGYWN0b3J5fSBDb2RlY0ZhY3RvcnkgKi9cbi8qKiBAdHlwZWRlZiB7X19pbXBvcnRfXygnLi90eXBlcycpLkNvZGVjfSBDb2RlYyAqL1xuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL3R5cGVzJykuQmFzZU5hbWV9IEJhc2VOYW1lICovXG4vKiogQHR5cGVkZWYge19faW1wb3J0X18oJy4vdHlwZXMnKS5CYXNlQ29kZX0gQmFzZUNvZGUgKi9cblxuLyoqIEB0eXBlIHtDb2RlY0ZhY3Rvcnl9ICovXG5jb25zdCBpZGVudGl0eSA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBlbmNvZGU6IGRlY29kZVRleHQsXG4gICAgZGVjb2RlOiBlbmNvZGVUZXh0XG4gIH1cbn1cblxuLyoqXG4gKlxuICogbmFtZSwgY29kZSwgaW1wbGVtZW50YXRpb24sIGFscGhhYmV0XG4gKlxuICogQHR5cGUge0FycmF5PFtCYXNlTmFtZSwgQmFzZUNvZGUsIENvZGVjRmFjdG9yeSwgc3RyaW5nXT59XG4gKi9cbmNvbnN0IGNvbnN0YW50cyA9IFtcbiAgWydpZGVudGl0eScsICdcXHgwMCcsIGlkZW50aXR5LCAnJ10sXG4gIFsnYmFzZTInLCAnMCcsIHJmYzQ2NDgoMSksICcwMSddLFxuICBbJ2Jhc2U4JywgJzcnLCByZmM0NjQ4KDMpLCAnMDEyMzQ1NjcnXSxcbiAgWydiYXNlMTAnLCAnOScsIGJhc2VYLCAnMDEyMzQ1Njc4OSddLFxuICBbJ2Jhc2UxNicsICdmJywgcmZjNDY0OCg0KSwgJzAxMjM0NTY3ODlhYmNkZWYnXSxcbiAgWydiYXNlMTZ1cHBlcicsICdGJywgcmZjNDY0OCg0KSwgJzAxMjM0NTY3ODlBQkNERUYnXSxcbiAgWydiYXNlMzJoZXgnLCAndicsIHJmYzQ2NDgoNSksICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1diddLFxuICBbJ2Jhc2UzMmhleHVwcGVyJywgJ1YnLCByZmM0NjQ4KDUpLCAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVYnXSxcbiAgWydiYXNlMzJoZXhwYWQnLCAndCcsIHJmYzQ2NDgoNSksICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dj0nXSxcbiAgWydiYXNlMzJoZXhwYWR1cHBlcicsICdUJywgcmZjNDY0OCg1KSwgJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWPSddLFxuICBbJ2Jhc2UzMicsICdiJywgcmZjNDY0OCg1KSwgJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MjM0NTY3J10sXG4gIFsnYmFzZTMydXBwZXInLCAnQicsIHJmYzQ2NDgoNSksICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjIzNDU2NyddLFxuICBbJ2Jhc2UzMnBhZCcsICdjJywgcmZjNDY0OCg1KSwgJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MjM0NTY3PSddLFxuICBbJ2Jhc2UzMnBhZHVwcGVyJywgJ0MnLCByZmM0NjQ4KDUpLCAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVoyMzQ1Njc9J10sXG4gIFsnYmFzZTMyeicsICdoJywgcmZjNDY0OCg1KSwgJ3libmRyZmc4ZWprbWNwcXhvdDF1d2lzemEzNDVoNzY5J10sXG4gIFsnYmFzZTM2JywgJ2snLCBiYXNlWCwgJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eiddLFxuICBbJ2Jhc2UzNnVwcGVyJywgJ0snLCBiYXNlWCwgJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWiddLFxuICBbJ2Jhc2U1OGJ0YycsICd6JywgYmFzZVgsICcxMjM0NTY3ODlBQkNERUZHSEpLTE1OUFFSU1RVVldYWVphYmNkZWZnaGlqa21ub3BxcnN0dXZ3eHl6J10sXG4gIFsnYmFzZTU4ZmxpY2tyJywgJ1onLCBiYXNlWCwgJzEyMzQ1Njc4OWFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXpBQkNERUZHSEpLTE1OUFFSU1RVVldYWVonXSxcbiAgWydiYXNlNjQnLCAnbScsIHJmYzQ2NDgoNiksICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ10sXG4gIFsnYmFzZTY0cGFkJywgJ00nLCByZmM0NjQ4KDYpLCAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nXSxcbiAgWydiYXNlNjR1cmwnLCAndScsIHJmYzQ2NDgoNiksICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJ10sXG4gIFsnYmFzZTY0dXJscGFkJywgJ1UnLCByZmM0NjQ4KDYpLCAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODktXz0nXVxuXVxuXG4vKiogQHR5cGUge1JlY29yZDxCYXNlTmFtZSxCYXNlPn0gKi9cbmNvbnN0IG5hbWVzID0gY29uc3RhbnRzLnJlZHVjZSgocHJldiwgdHVwcGxlKSA9PiB7XG4gIHByZXZbdHVwcGxlWzBdXSA9IG5ldyBCYXNlKHR1cHBsZVswXSwgdHVwcGxlWzFdLCB0dXBwbGVbMl0sIHR1cHBsZVszXSlcbiAgcmV0dXJuIHByZXZcbn0sIC8qKiBAdHlwZSB7UmVjb3JkPEJhc2VOYW1lLEJhc2U+fSAqLyh7fSkpXG5cbi8qKiBAdHlwZSB7UmVjb3JkPEJhc2VDb2RlLEJhc2U+fSAqL1xuY29uc3QgY29kZXMgPSBjb25zdGFudHMucmVkdWNlKChwcmV2LCB0dXBwbGUpID0+IHtcbiAgcHJldlt0dXBwbGVbMV1dID0gbmFtZXNbdHVwcGxlWzBdXVxuICByZXR1cm4gcHJldlxufSwgLyoqIEB0eXBlIHtSZWNvcmQ8QmFzZUNvZGUsQmFzZT59ICovKHt9KSlcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWVzLFxuICBjb2Rlc1xufVxuIiwiLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgW211bHRpYmFzZV0oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9tdWx0aWJhc2UpIHNwZWNpZmljYXRpb24uXG4gKlxuICovXG4ndXNlIHN0cmljdCdcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKVxuY29uc3QgeyBlbmNvZGVUZXh0LCBkZWNvZGVUZXh0LCBjb25jYXQgfSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5cbi8qKiBAdHlwZWRlZiB7X19pbXBvcnRfXygnLi9iYXNlJyl9IEJhc2UgKi9cbi8qKiBAdHlwZWRlZiB7X19pbXBvcnRfXyhcIi4vdHlwZXNcIikuQmFzZU5hbWVPckNvZGV9IEJhc2VOYW1lT3JDb2RlICovXG4vKiogQHR5cGVkZWYge19faW1wb3J0X18oXCIuL3R5cGVzXCIpLkJhc2VDb2RlfSBCYXNlQ29kZSAqL1xuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKFwiLi90eXBlc1wiKS5CYXNlTmFtZX0gQmFzZU5hbWUgKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgVWludDhBcnJheSB3aXRoIHRoZSBtdWx0aWJhc2UgdmFyaW50K2NvZGUuXG4gKlxuICogQHBhcmFtIHtCYXNlTmFtZU9yQ29kZX0gbmFtZU9yQ29kZSAtIFRoZSBtdWx0aWJhc2UgbmFtZSBvciBjb2RlIG51bWJlci5cbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIC0gVGhlIGRhdGEgdG8gYmUgcHJlZml4ZWQgd2l0aCBtdWx0aWJhc2UuXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGlmIHRoZSBlbmNvZGluZyBpcyBub3Qgc3VwcG9ydGVkXG4gKi9cbmZ1bmN0aW9uIG11bHRpYmFzZSAobmFtZU9yQ29kZSwgYnVmKSB7XG4gIGlmICghYnVmKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdyZXF1aXJlcyBhbiBlbmNvZGVkIFVpbnQ4QXJyYXknKVxuICB9XG4gIGNvbnN0IHsgbmFtZSwgY29kZUJ1ZiB9ID0gZW5jb2RpbmcobmFtZU9yQ29kZSlcbiAgdmFsaWRFbmNvZGUobmFtZSwgYnVmKVxuXG4gIHJldHVybiBjb25jYXQoW2NvZGVCdWYsIGJ1Zl0sIGNvZGVCdWYubGVuZ3RoICsgYnVmLmxlbmd0aClcbn1cblxuLyoqXG4gKiBFbmNvZGUgZGF0YSB3aXRoIHRoZSBzcGVjaWZpZWQgYmFzZSBhbmQgYWRkIHRoZSBtdWx0aWJhc2UgcHJlZml4LlxuICpcbiAqIEBwYXJhbSB7QmFzZU5hbWVPckNvZGV9IG5hbWVPckNvZGUgLSBUaGUgbXVsdGliYXNlIG5hbWUgb3IgY29kZSBudW1iZXIuXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiAtIFRoZSBkYXRhIHRvIGJlIGVuY29kZWQuXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGlmIHRoZSBlbmNvZGluZyBpcyBub3Qgc3VwcG9ydGVkXG4gKlxuICovXG5mdW5jdGlvbiBlbmNvZGUgKG5hbWVPckNvZGUsIGJ1Zikge1xuICBjb25zdCBlbmMgPSBlbmNvZGluZyhuYW1lT3JDb2RlKVxuICBjb25zdCBkYXRhID0gZW5jb2RlVGV4dChlbmMuZW5jb2RlKGJ1ZikpXG5cbiAgcmV0dXJuIGNvbmNhdChbZW5jLmNvZGVCdWYsIGRhdGFdLCBlbmMuY29kZUJ1Zi5sZW5ndGggKyBkYXRhLmxlbmd0aClcbn1cblxuLyoqXG4gKiBUYWtlcyBhIFVpbnQ4QXJyYXkgb3Igc3RyaW5nIGVuY29kZWQgd2l0aCBtdWx0aWJhc2UgaGVhZGVyLCBkZWNvZGVzIGl0IGFuZFxuICogcmV0dXJucyB0aGUgZGVjb2RlZCBidWZmZXJcbiAqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8c3RyaW5nfSBkYXRhXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGlmIHRoZSBlbmNvZGluZyBpcyBub3Qgc3VwcG9ydGVkXG4gKlxuICovXG5mdW5jdGlvbiBkZWNvZGUgKGRhdGEpIHtcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgZGF0YSA9IGRlY29kZVRleHQoZGF0YSlcbiAgfVxuICBjb25zdCBwcmVmaXggPSBkYXRhWzBdXG5cbiAgLy8gTWFrZSBhbGwgZW5jb2RpbmdzIGNhc2UtaW5zZW5zaXRpdmUgZXhjZXB0IHRoZSBvbmVzIHRoYXQgaW5jbHVkZSB1cHBlciBhbmQgbG93ZXIgY2hhcnMgaW4gdGhlIGFscGhhYmV0XG4gIGlmIChbJ2YnLCAnRicsICd2JywgJ1YnLCAndCcsICdUJywgJ2InLCAnQicsICdjJywgJ0MnLCAnaCcsICdrJywgJ0snXS5pbmNsdWRlcyhwcmVmaXgpKSB7XG4gICAgZGF0YSA9IGRhdGEudG9Mb3dlckNhc2UoKVxuICB9XG4gIGNvbnN0IGVuYyA9IGVuY29kaW5nKC8qKiBAdHlwZSB7QmFzZUNvZGV9ICovKGRhdGFbMF0pKVxuICByZXR1cm4gZW5jLmRlY29kZShkYXRhLnN1YnN0cmluZygxKSlcbn1cblxuLyoqXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0YSBtdWx0aWJhc2UgZW5jb2RlZD9cbiAqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8c3RyaW5nfSBkYXRhXG4gKi9cbmZ1bmN0aW9uIGlzRW5jb2RlZCAoZGF0YSkge1xuICBpZiAoZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICBkYXRhID0gZGVjb2RlVGV4dChkYXRhKVxuICB9XG5cbiAgLy8gRW5zdXJlIGJ1Zk9yU3RyaW5nIGlzIGEgc3RyaW5nXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkgIT09ICdbb2JqZWN0IFN0cmluZ10nKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGVuYyA9IGVuY29kaW5nKC8qKiBAdHlwZSB7QmFzZUNvZGV9ICovKGRhdGFbMF0pKVxuICAgIHJldHVybiBlbmMubmFtZVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlIGVuY29kZWQgZGF0YVxuICpcbiAqIEBwYXJhbSB7QmFzZU5hbWVPckNvZGV9IG5hbWVcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGlmIHRoZSBlbmNvZGluZyBpcyBub3Qgc3VwcG9ydGVkXG4gKi9cbmZ1bmN0aW9uIHZhbGlkRW5jb2RlIChuYW1lLCBidWYpIHtcbiAgY29uc3QgZW5jID0gZW5jb2RpbmcobmFtZSlcbiAgZW5jLmRlY29kZShkZWNvZGVUZXh0KGJ1ZikpXG59XG5cbi8qKlxuICogR2V0IHRoZSBlbmNvZGluZyBieSBuYW1lIG9yIGNvZGVcbiAqXG4gKiBAcGFyYW0ge0Jhc2VOYW1lT3JDb2RlfSBuYW1lT3JDb2RlXG4gKiBAcmV0dXJucyB7QmFzZX1cbiAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGlmIHRoZSBlbmNvZGluZyBpcyBub3Qgc3VwcG9ydGVkXG4gKi9cbmZ1bmN0aW9uIGVuY29kaW5nIChuYW1lT3JDb2RlKSB7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29uc3RhbnRzLm5hbWVzLCAvKiogQHR5cGUge0Jhc2VOYW1lfSAqLyhuYW1lT3JDb2RlKSkpIHtcbiAgICByZXR1cm4gY29uc3RhbnRzLm5hbWVzWy8qKiBAdHlwZSB7QmFzZU5hbWV9ICovKG5hbWVPckNvZGUpXVxuICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb25zdGFudHMuY29kZXMsIC8qKiBAdHlwZSB7QmFzZUNvZGV9ICovKG5hbWVPckNvZGUpKSkge1xuICAgIHJldHVybiBjb25zdGFudHMuY29kZXNbLyoqIEB0eXBlIHtCYXNlQ29kZX0gKi8obmFtZU9yQ29kZSldXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBlbmNvZGluZzogJHtuYW1lT3JDb2RlfWApXG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgZW5jb2RpbmcgZnJvbSBkYXRhXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8VWludDhBcnJheX0gZGF0YVxuICogQHJldHVybnMge0Jhc2V9XG4gKiBAdGhyb3dzIHtFcnJvcn0gV2lsbCB0aHJvdyBpZiB0aGUgZW5jb2RpbmcgaXMgbm90IHN1cHBvcnRlZFxuICovXG5mdW5jdGlvbiBlbmNvZGluZ0Zyb21EYXRhIChkYXRhKSB7XG4gIGlmIChkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgIGRhdGEgPSBkZWNvZGVUZXh0KGRhdGEpXG4gIH1cblxuICByZXR1cm4gZW5jb2RpbmcoLyoqIEB0eXBlIHtCYXNlQ29kZX0gKi8oZGF0YVswXSkpXG59XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IG11bHRpYmFzZVxuZXhwb3J0cy5lbmNvZGUgPSBlbmNvZGVcbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlXG5leHBvcnRzLmlzRW5jb2RlZCA9IGlzRW5jb2RlZFxuZXhwb3J0cy5lbmNvZGluZyA9IGVuY29kaW5nXG5leHBvcnRzLmVuY29kaW5nRnJvbURhdGEgPSBlbmNvZGluZ0Zyb21EYXRhXG5jb25zdCBuYW1lcyA9IE9iamVjdC5mcmVlemUoY29uc3RhbnRzLm5hbWVzKVxuY29uc3QgY29kZXMgPSBPYmplY3QuZnJlZXplKGNvbnN0YW50cy5jb2RlcylcbmV4cG9ydHMubmFtZXMgPSBuYW1lc1xuZXhwb3J0cy5jb2RlcyA9IGNvZGVzXG4iLCIndXNlIHN0cmljdCdcblxuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL3R5cGVzJykuQ29kZWNGYWN0b3J5fSBDb2RlY0ZhY3RvcnkgKi9cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gYWxwaGFiZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRzUGVyQ2hhclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9XG4gKi9cbmNvbnN0IGRlY29kZSA9IChzdHJpbmcsIGFscGhhYmV0LCBiaXRzUGVyQ2hhcikgPT4ge1xuICAvLyBCdWlsZCB0aGUgY2hhcmFjdGVyIGxvb2t1cCB0YWJsZTpcbiAgLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBudW1iZXI+fSAqL1xuICBjb25zdCBjb2RlcyA9IHt9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxwaGFiZXQubGVuZ3RoOyArK2kpIHtcbiAgICBjb2Rlc1thbHBoYWJldFtpXV0gPSBpXG4gIH1cblxuICAvLyBDb3VudCB0aGUgcGFkZGluZyBieXRlczpcbiAgbGV0IGVuZCA9IHN0cmluZy5sZW5ndGhcbiAgd2hpbGUgKHN0cmluZ1tlbmQgLSAxXSA9PT0gJz0nKSB7XG4gICAgLS1lbmRcbiAgfVxuXG4gIC8vIEFsbG9jYXRlIHRoZSBvdXRwdXQ6XG4gIGNvbnN0IG91dCA9IG5ldyBVaW50OEFycmF5KChlbmQgKiBiaXRzUGVyQ2hhciAvIDgpIHwgMClcblxuICAvLyBQYXJzZSB0aGUgZGF0YTpcbiAgbGV0IGJpdHMgPSAwIC8vIE51bWJlciBvZiBiaXRzIGN1cnJlbnRseSBpbiB0aGUgYnVmZmVyXG4gIGxldCBidWZmZXIgPSAwIC8vIEJpdHMgd2FpdGluZyB0byBiZSB3cml0dGVuIG91dCwgTVNCIGZpcnN0XG4gIGxldCB3cml0dGVuID0gMCAvLyBOZXh0IGJ5dGUgdG8gd3JpdGVcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmQ7ICsraSkge1xuICAgIC8vIFJlYWQgb25lIGNoYXJhY3RlciBmcm9tIHRoZSBzdHJpbmc6XG4gICAgY29uc3QgdmFsdWUgPSBjb2Rlc1tzdHJpbmdbaV1dXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgJyArIHN0cmluZ1tpXSlcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgdGhlIGJpdHMgdG8gdGhlIGJ1ZmZlcjpcbiAgICBidWZmZXIgPSAoYnVmZmVyIDw8IGJpdHNQZXJDaGFyKSB8IHZhbHVlXG4gICAgYml0cyArPSBiaXRzUGVyQ2hhclxuXG4gICAgLy8gV3JpdGUgb3V0IHNvbWUgYml0cyBpZiB0aGUgYnVmZmVyIGhhcyBhIGJ5dGUncyB3b3J0aDpcbiAgICBpZiAoYml0cyA+PSA4KSB7XG4gICAgICBiaXRzIC09IDhcbiAgICAgIG91dFt3cml0dGVuKytdID0gMHhmZiAmIChidWZmZXIgPj4gYml0cylcbiAgICB9XG4gIH1cblxuICAvLyBWZXJpZnkgdGhhdCB3ZSBoYXZlIHJlY2VpdmVkIGp1c3QgZW5vdWdoIGJpdHM6XG4gIGlmIChiaXRzID49IGJpdHNQZXJDaGFyIHx8IDB4ZmYgJiAoYnVmZmVyIDw8ICg4IC0gYml0cykpKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIGVuZCBvZiBkYXRhJylcbiAgfVxuXG4gIHJldHVybiBvdXRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGRhdGFcbiAqIEBwYXJhbSB7c3RyaW5nfSBhbHBoYWJldFxuICogQHBhcmFtIHtudW1iZXJ9IGJpdHNQZXJDaGFyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBlbmNvZGUgPSAoZGF0YSwgYWxwaGFiZXQsIGJpdHNQZXJDaGFyKSA9PiB7XG4gIGNvbnN0IHBhZCA9IGFscGhhYmV0W2FscGhhYmV0Lmxlbmd0aCAtIDFdID09PSAnPSdcbiAgY29uc3QgbWFzayA9ICgxIDw8IGJpdHNQZXJDaGFyKSAtIDFcbiAgbGV0IG91dCA9ICcnXG5cbiAgbGV0IGJpdHMgPSAwIC8vIE51bWJlciBvZiBiaXRzIGN1cnJlbnRseSBpbiB0aGUgYnVmZmVyXG4gIGxldCBidWZmZXIgPSAwIC8vIEJpdHMgd2FpdGluZyB0byBiZSB3cml0dGVuIG91dCwgTVNCIGZpcnN0XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgIC8vIFNsdXJwIGRhdGEgaW50byB0aGUgYnVmZmVyOlxuICAgIGJ1ZmZlciA9IChidWZmZXIgPDwgOCkgfCBkYXRhW2ldXG4gICAgYml0cyArPSA4XG5cbiAgICAvLyBXcml0ZSBvdXQgYXMgbXVjaCBhcyB3ZSBjYW46XG4gICAgd2hpbGUgKGJpdHMgPiBiaXRzUGVyQ2hhcikge1xuICAgICAgYml0cyAtPSBiaXRzUGVyQ2hhclxuICAgICAgb3V0ICs9IGFscGhhYmV0W21hc2sgJiAoYnVmZmVyID4+IGJpdHMpXVxuICAgIH1cbiAgfVxuXG4gIC8vIFBhcnRpYWwgY2hhcmFjdGVyOlxuICBpZiAoYml0cykge1xuICAgIG91dCArPSBhbHBoYWJldFttYXNrICYgKGJ1ZmZlciA8PCAoYml0c1BlckNoYXIgLSBiaXRzKSldXG4gIH1cblxuICAvLyBBZGQgcGFkZGluZyBjaGFyYWN0ZXJzIHVudGlsIHdlIGhpdCBhIGJ5dGUgYm91bmRhcnk6XG4gIGlmIChwYWQpIHtcbiAgICB3aGlsZSAoKG91dC5sZW5ndGggKiBiaXRzUGVyQ2hhcikgJiA3KSB7XG4gICAgICBvdXQgKz0gJz0nXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dFxufVxuXG4vKipcbiAqIFJGQzQ2NDggRmFjdG9yeVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRzUGVyQ2hhclxuICogQHJldHVybnMge0NvZGVjRmFjdG9yeX1cbiAqL1xuY29uc3QgcmZjNDY0OCA9IChiaXRzUGVyQ2hhcikgPT4gKGFscGhhYmV0KSA9PiB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtVaW50OEFycmF5fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZW5jb2RlIChpbnB1dCkge1xuICAgICAgcmV0dXJuIGVuY29kZShpbnB1dCwgYWxwaGFiZXQsIGJpdHNQZXJDaGFyKVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0XG4gICAgICogQHJldHVybnMge1VpbnQ4QXJyYXl9XG4gICAgICovXG4gICAgZGVjb2RlIChpbnB1dCkge1xuICAgICAgcmV0dXJuIGRlY29kZShpbnB1dCwgYWxwaGFiZXQsIGJpdHNQZXJDaGFyKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmZjNDY0OCB9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgdGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKVxuLyoqXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyVmlld3xBcnJheUJ1ZmZlcn0gYnl0ZXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IGRlY29kZVRleHQgPSAoYnl0ZXMpID0+IHRleHREZWNvZGVyLmRlY29kZShieXRlcylcblxuY29uc3QgdGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9XG4gKi9cbmNvbnN0IGVuY29kZVRleHQgPSAodGV4dCkgPT4gdGV4dEVuY29kZXIuZW5jb2RlKHRleHQpXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBVaW50OEFycmF5IGNyZWF0ZWQgYnkgY29uY2F0ZW5hdGluZyB0aGUgcGFzc2VkIEFycmF5c1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXlMaWtlPG51bWJlcj4+fSBhcnJzXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAqL1xuZnVuY3Rpb24gY29uY2F0IChhcnJzLCBsZW5ndGgpIHtcbiAgY29uc3Qgb3V0cHV0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICBsZXQgb2Zmc2V0ID0gMFxuXG4gIGZvciAoY29uc3QgYXJyIG9mIGFycnMpIHtcbiAgICBvdXRwdXQuc2V0KGFyciwgb2Zmc2V0KVxuICAgIG9mZnNldCArPSBhcnIubGVuZ3RoXG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBkZWNvZGVUZXh0LCBlbmNvZGVUZXh0LCBjb25jYXQgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgZW5jb2RlVGV4dCB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL3R5cGVzJykuQ29kZWNGYWN0b3J5fSBDb2RlY0ZhY3RvcnkgKi9cbi8qKiBAdHlwZWRlZiB7X19pbXBvcnRfXyhcIi4vdHlwZXNcIikuQmFzZU5hbWV9IEJhc2VOYW1lICovXG4vKiogQHR5cGVkZWYge19faW1wb3J0X18oXCIuL3R5cGVzXCIpLkJhc2VDb2RlfSBCYXNlQ29kZSAqL1xuXG4vKipcbiAqIENsYXNzIHRvIGVuY29kZS9kZWNvZGUgaW4gdGhlIHN1cHBvcnRlZCBCYXNlc1xuICpcbiAqL1xuY2xhc3MgQmFzZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0Jhc2VOYW1lfSBuYW1lXG4gICAqIEBwYXJhbSB7QmFzZUNvZGV9IGNvZGVcbiAgICogQHBhcmFtIHtDb2RlY0ZhY3Rvcnl9IGZhY3RvcnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFscGhhYmV0XG4gICAqL1xuICBjb25zdHJ1Y3RvciAobmFtZSwgY29kZSwgZmFjdG9yeSwgYWxwaGFiZXQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdGhpcy5jb2RlID0gY29kZVxuICAgIHRoaXMuY29kZUJ1ZiA9IGVuY29kZVRleHQodGhpcy5jb2RlKVxuICAgIHRoaXMuYWxwaGFiZXQgPSBhbHBoYWJldFxuICAgIHRoaXMuY29kZWMgPSBmYWN0b3J5KGFscGhhYmV0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBlbmNvZGUgKGJ1Zikge1xuICAgIHJldHVybiB0aGlzLmNvZGVjLmVuY29kZShidWYpXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAgICovXG4gIGRlY29kZSAoc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBjaGFyIG9mIHN0cmluZykge1xuICAgICAgaWYgKHRoaXMuYWxwaGFiZXQgJiYgdGhpcy5hbHBoYWJldC5pbmRleE9mKGNoYXIpIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgY2hhcmFjdGVyICcke2NoYXJ9JyBpbiAnJHtzdHJpbmd9J2ApXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvZGVjLmRlY29kZShzdHJpbmcpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgYmFzZVggPSByZXF1aXJlKCdAbXVsdGlmb3JtYXRzL2Jhc2UteCcpXG5jb25zdCBCYXNlID0gcmVxdWlyZSgnLi9iYXNlLmpzJylcbmNvbnN0IHsgcmZjNDY0OCB9ID0gcmVxdWlyZSgnLi9yZmM0NjQ4JylcbmNvbnN0IHsgZGVjb2RlVGV4dCwgZW5jb2RlVGV4dCB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL3R5cGVzJykuQ29kZWNGYWN0b3J5fSBDb2RlY0ZhY3RvcnkgKi9cbi8qKiBAdHlwZWRlZiB7X19pbXBvcnRfXygnLi90eXBlcycpLkNvZGVjfSBDb2RlYyAqL1xuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL3R5cGVzJykuQmFzZU5hbWV9IEJhc2VOYW1lICovXG4vKiogQHR5cGVkZWYge19faW1wb3J0X18oJy4vdHlwZXMnKS5CYXNlQ29kZX0gQmFzZUNvZGUgKi9cblxuLyoqIEB0eXBlIHtDb2RlY0ZhY3Rvcnl9ICovXG5jb25zdCBpZGVudGl0eSA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBlbmNvZGU6IGRlY29kZVRleHQsXG4gICAgZGVjb2RlOiBlbmNvZGVUZXh0XG4gIH1cbn1cblxuLyoqXG4gKlxuICogbmFtZSwgY29kZSwgaW1wbGVtZW50YXRpb24sIGFscGhhYmV0XG4gKlxuICogQHR5cGUge0FycmF5PFtCYXNlTmFtZSwgQmFzZUNvZGUsIENvZGVjRmFjdG9yeSwgc3RyaW5nXT59XG4gKi9cbmNvbnN0IGNvbnN0YW50cyA9IFtcbiAgWydpZGVudGl0eScsICdcXHgwMCcsIGlkZW50aXR5LCAnJ10sXG4gIFsnYmFzZTInLCAnMCcsIHJmYzQ2NDgoMSksICcwMSddLFxuICBbJ2Jhc2U4JywgJzcnLCByZmM0NjQ4KDMpLCAnMDEyMzQ1NjcnXSxcbiAgWydiYXNlMTAnLCAnOScsIGJhc2VYLCAnMDEyMzQ1Njc4OSddLFxuICBbJ2Jhc2UxNicsICdmJywgcmZjNDY0OCg0KSwgJzAxMjM0NTY3ODlhYmNkZWYnXSxcbiAgWydiYXNlMTZ1cHBlcicsICdGJywgcmZjNDY0OCg0KSwgJzAxMjM0NTY3ODlBQkNERUYnXSxcbiAgWydiYXNlMzJoZXgnLCAndicsIHJmYzQ2NDgoNSksICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1diddLFxuICBbJ2Jhc2UzMmhleHVwcGVyJywgJ1YnLCByZmM0NjQ4KDUpLCAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVYnXSxcbiAgWydiYXNlMzJoZXhwYWQnLCAndCcsIHJmYzQ2NDgoNSksICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dj0nXSxcbiAgWydiYXNlMzJoZXhwYWR1cHBlcicsICdUJywgcmZjNDY0OCg1KSwgJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWPSddLFxuICBbJ2Jhc2UzMicsICdiJywgcmZjNDY0OCg1KSwgJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MjM0NTY3J10sXG4gIFsnYmFzZTMydXBwZXInLCAnQicsIHJmYzQ2NDgoNSksICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjIzNDU2NyddLFxuICBbJ2Jhc2UzMnBhZCcsICdjJywgcmZjNDY0OCg1KSwgJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MjM0NTY3PSddLFxuICBbJ2Jhc2UzMnBhZHVwcGVyJywgJ0MnLCByZmM0NjQ4KDUpLCAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVoyMzQ1Njc9J10sXG4gIFsnYmFzZTMyeicsICdoJywgcmZjNDY0OCg1KSwgJ3libmRyZmc4ZWprbWNwcXhvdDF1d2lzemEzNDVoNzY5J10sXG4gIFsnYmFzZTM2JywgJ2snLCBiYXNlWCwgJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eiddLFxuICBbJ2Jhc2UzNnVwcGVyJywgJ0snLCBiYXNlWCwgJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWiddLFxuICBbJ2Jhc2U1OGJ0YycsICd6JywgYmFzZVgsICcxMjM0NTY3ODlBQkNERUZHSEpLTE1OUFFSU1RVVldYWVphYmNkZWZnaGlqa21ub3BxcnN0dXZ3eHl6J10sXG4gIFsnYmFzZTU4ZmxpY2tyJywgJ1onLCBiYXNlWCwgJzEyMzQ1Njc4OWFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXpBQkNERUZHSEpLTE1OUFFSU1RVVldYWVonXSxcbiAgWydiYXNlNjQnLCAnbScsIHJmYzQ2NDgoNiksICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ10sXG4gIFsnYmFzZTY0cGFkJywgJ00nLCByZmM0NjQ4KDYpLCAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nXSxcbiAgWydiYXNlNjR1cmwnLCAndScsIHJmYzQ2NDgoNiksICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJ10sXG4gIFsnYmFzZTY0dXJscGFkJywgJ1UnLCByZmM0NjQ4KDYpLCAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODktXz0nXVxuXVxuXG4vKiogQHR5cGUge1JlY29yZDxCYXNlTmFtZSxCYXNlPn0gKi9cbmNvbnN0IG5hbWVzID0gY29uc3RhbnRzLnJlZHVjZSgocHJldiwgdHVwcGxlKSA9PiB7XG4gIHByZXZbdHVwcGxlWzBdXSA9IG5ldyBCYXNlKHR1cHBsZVswXSwgdHVwcGxlWzFdLCB0dXBwbGVbMl0sIHR1cHBsZVszXSlcbiAgcmV0dXJuIHByZXZcbn0sIC8qKiBAdHlwZSB7UmVjb3JkPEJhc2VOYW1lLEJhc2U+fSAqLyh7fSkpXG5cbi8qKiBAdHlwZSB7UmVjb3JkPEJhc2VDb2RlLEJhc2U+fSAqL1xuY29uc3QgY29kZXMgPSBjb25zdGFudHMucmVkdWNlKChwcmV2LCB0dXBwbGUpID0+IHtcbiAgcHJldlt0dXBwbGVbMV1dID0gbmFtZXNbdHVwcGxlWzBdXVxuICByZXR1cm4gcHJldlxufSwgLyoqIEB0eXBlIHtSZWNvcmQ8QmFzZUNvZGUsQmFzZT59ICovKHt9KSlcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWVzLFxuICBjb2Rlc1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qKiBAdHlwZWRlZiB7X19pbXBvcnRfXygnLi90eXBlcycpLkNvZGVjRmFjdG9yeX0gQ29kZWNGYWN0b3J5ICovXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IGFscGhhYmV0XG4gKiBAcGFyYW0ge251bWJlcn0gYml0c1BlckNoYXJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5jb25zdCBkZWNvZGUgPSAoc3RyaW5nLCBhbHBoYWJldCwgYml0c1BlckNoYXIpID0+IHtcbiAgLy8gQnVpbGQgdGhlIGNoYXJhY3RlciBsb29rdXAgdGFibGU6XG4gIC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgbnVtYmVyPn0gKi9cbiAgY29uc3QgY29kZXMgPSB7fVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFscGhhYmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgY29kZXNbYWxwaGFiZXRbaV1dID0gaVxuICB9XG5cbiAgLy8gQ291bnQgdGhlIHBhZGRpbmcgYnl0ZXM6XG4gIGxldCBlbmQgPSBzdHJpbmcubGVuZ3RoXG4gIHdoaWxlIChzdHJpbmdbZW5kIC0gMV0gPT09ICc9Jykge1xuICAgIC0tZW5kXG4gIH1cblxuICAvLyBBbGxvY2F0ZSB0aGUgb3V0cHV0OlxuICBjb25zdCBvdXQgPSBuZXcgVWludDhBcnJheSgoZW5kICogYml0c1BlckNoYXIgLyA4KSB8IDApXG5cbiAgLy8gUGFyc2UgdGhlIGRhdGE6XG4gIGxldCBiaXRzID0gMCAvLyBOdW1iZXIgb2YgYml0cyBjdXJyZW50bHkgaW4gdGhlIGJ1ZmZlclxuICBsZXQgYnVmZmVyID0gMCAvLyBCaXRzIHdhaXRpbmcgdG8gYmUgd3JpdHRlbiBvdXQsIE1TQiBmaXJzdFxuICBsZXQgd3JpdHRlbiA9IDAgLy8gTmV4dCBieXRlIHRvIHdyaXRlXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZW5kOyArK2kpIHtcbiAgICAvLyBSZWFkIG9uZSBjaGFyYWN0ZXIgZnJvbSB0aGUgc3RyaW5nOlxuICAgIGNvbnN0IHZhbHVlID0gY29kZXNbc3RyaW5nW2ldXVxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyICcgKyBzdHJpbmdbaV0pXG4gICAgfVxuXG4gICAgLy8gQXBwZW5kIHRoZSBiaXRzIHRvIHRoZSBidWZmZXI6XG4gICAgYnVmZmVyID0gKGJ1ZmZlciA8PCBiaXRzUGVyQ2hhcikgfCB2YWx1ZVxuICAgIGJpdHMgKz0gYml0c1BlckNoYXJcblxuICAgIC8vIFdyaXRlIG91dCBzb21lIGJpdHMgaWYgdGhlIGJ1ZmZlciBoYXMgYSBieXRlJ3Mgd29ydGg6XG4gICAgaWYgKGJpdHMgPj0gOCkge1xuICAgICAgYml0cyAtPSA4XG4gICAgICBvdXRbd3JpdHRlbisrXSA9IDB4ZmYgJiAoYnVmZmVyID4+IGJpdHMpXG4gICAgfVxuICB9XG5cbiAgLy8gVmVyaWZ5IHRoYXQgd2UgaGF2ZSByZWNlaXZlZCBqdXN0IGVub3VnaCBiaXRzOlxuICBpZiAoYml0cyA+PSBiaXRzUGVyQ2hhciB8fCAweGZmICYgKGJ1ZmZlciA8PCAoOCAtIGJpdHMpKSkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgZGF0YScpXG4gIH1cblxuICByZXR1cm4gb3V0XG59XG5cbi8qKlxuICogQHBhcmFtIHtVaW50OEFycmF5fSBkYXRhXG4gKiBAcGFyYW0ge3N0cmluZ30gYWxwaGFiZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRzUGVyQ2hhclxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgZW5jb2RlID0gKGRhdGEsIGFscGhhYmV0LCBiaXRzUGVyQ2hhcikgPT4ge1xuICBjb25zdCBwYWQgPSBhbHBoYWJldFthbHBoYWJldC5sZW5ndGggLSAxXSA9PT0gJz0nXG4gIGNvbnN0IG1hc2sgPSAoMSA8PCBiaXRzUGVyQ2hhcikgLSAxXG4gIGxldCBvdXQgPSAnJ1xuXG4gIGxldCBiaXRzID0gMCAvLyBOdW1iZXIgb2YgYml0cyBjdXJyZW50bHkgaW4gdGhlIGJ1ZmZlclxuICBsZXQgYnVmZmVyID0gMCAvLyBCaXRzIHdhaXRpbmcgdG8gYmUgd3JpdHRlbiBvdXQsIE1TQiBmaXJzdFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBTbHVycCBkYXRhIGludG8gdGhlIGJ1ZmZlcjpcbiAgICBidWZmZXIgPSAoYnVmZmVyIDw8IDgpIHwgZGF0YVtpXVxuICAgIGJpdHMgKz0gOFxuXG4gICAgLy8gV3JpdGUgb3V0IGFzIG11Y2ggYXMgd2UgY2FuOlxuICAgIHdoaWxlIChiaXRzID4gYml0c1BlckNoYXIpIHtcbiAgICAgIGJpdHMgLT0gYml0c1BlckNoYXJcbiAgICAgIG91dCArPSBhbHBoYWJldFttYXNrICYgKGJ1ZmZlciA+PiBiaXRzKV1cbiAgICB9XG4gIH1cblxuICAvLyBQYXJ0aWFsIGNoYXJhY3RlcjpcbiAgaWYgKGJpdHMpIHtcbiAgICBvdXQgKz0gYWxwaGFiZXRbbWFzayAmIChidWZmZXIgPDwgKGJpdHNQZXJDaGFyIC0gYml0cykpXVxuICB9XG5cbiAgLy8gQWRkIHBhZGRpbmcgY2hhcmFjdGVycyB1bnRpbCB3ZSBoaXQgYSBieXRlIGJvdW5kYXJ5OlxuICBpZiAocGFkKSB7XG4gICAgd2hpbGUgKChvdXQubGVuZ3RoICogYml0c1BlckNoYXIpICYgNykge1xuICAgICAgb3V0ICs9ICc9J1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRcbn1cblxuLyoqXG4gKiBSRkM0NjQ4IEZhY3RvcnlcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gYml0c1BlckNoYXJcbiAqIEByZXR1cm5zIHtDb2RlY0ZhY3Rvcnl9XG4gKi9cbmNvbnN0IHJmYzQ2NDggPSAoYml0c1BlckNoYXIpID0+IChhbHBoYWJldCkgPT4ge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VWludDhBcnJheX0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGVuY29kZSAoaW5wdXQpIHtcbiAgICAgIHJldHVybiBlbmNvZGUoaW5wdXQsIGFscGhhYmV0LCBiaXRzUGVyQ2hhcilcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICAgICAqL1xuICAgIGRlY29kZSAoaW5wdXQpIHtcbiAgICAgIHJldHVybiBkZWNvZGUoaW5wdXQsIGFscGhhYmV0LCBiaXRzUGVyQ2hhcilcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHJmYzQ2NDggfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vIEB0cy1pZ25vcmVcbmNvbnN0IHsgVGV4dEVuY29kZXIsIFRleHREZWNvZGVyIH0gPSByZXF1aXJlKCd3ZWItZW5jb2RpbmcnKVxuXG5jb25zdCB0ZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpXG4vKipcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJWaWV3fEFycmF5QnVmZmVyfSBieXRlc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgZGVjb2RlVGV4dCA9IChieXRlcykgPT4gdGV4dERlY29kZXIuZGVjb2RlKGJ5dGVzKVxuXG5jb25zdCB0ZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAqL1xuY29uc3QgZW5jb2RlVGV4dCA9ICh0ZXh0KSA9PiB0ZXh0RW5jb2Rlci5lbmNvZGUodGV4dClcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IFVpbnQ4QXJyYXkgY3JlYXRlZCBieSBjb25jYXRlbmF0aW5nIHRoZSBwYXNzZWQgQXJyYXlzXG4gKlxuICogQHBhcmFtIHtBcnJheTxBcnJheUxpa2U8bnVtYmVyPj59IGFycnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5mdW5jdGlvbiBjb25jYXQgKGFycnMsIGxlbmd0aCkge1xuICBjb25zdCBvdXRwdXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIGxldCBvZmZzZXQgPSAwXG5cbiAgZm9yIChjb25zdCBhcnIgb2YgYXJycykge1xuICAgIG91dHB1dC5zZXQoYXJyLCBvZmZzZXQpXG4gICAgb2Zmc2V0ICs9IGFyci5sZW5ndGhcbiAgfVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGRlY29kZVRleHQsIGVuY29kZVRleHQsIGNvbmNhdCB9XG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IFVpbnQ4QXJyYXkgY3JlYXRlZCBieSBjb25jYXRlbmF0aW5nIHRoZSBwYXNzZWQgQXJyYXlMaWtlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXlMaWtlPG51bWJlcj4+fSBhcnJheXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5mdW5jdGlvbiBjb25jYXQgKGFycmF5cywgbGVuZ3RoKSB7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gYXJyYXlzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiBhY2MgKyBjdXJyLmxlbmd0aCwgMClcbiAgfVxuXG4gIGNvbnN0IG91dHB1dCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgbGV0IG9mZnNldCA9IDBcblxuICBmb3IgKGNvbnN0IGFyciBvZiBhcnJheXMpIHtcbiAgICBvdXRwdXQuc2V0KGFyciwgb2Zmc2V0KVxuICAgIG9mZnNldCArPSBhcnIubGVuZ3RoXG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uY2F0XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgeyBuYW1lcyB9ID0gcmVxdWlyZSgnbXVsdGliYXNlL3NyYy9jb25zdGFudHMnKVxuY29uc3QgeyBUZXh0RW5jb2RlciB9ID0gcmVxdWlyZSgnd2ViLWVuY29kaW5nJylcbmNvbnN0IHV0ZjhFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKClcblxuLyoqXG4gKiBJbnRlcnBlcmV0cyBlYWNoIGNoYXJhY3RlciBpbiBhIHN0cmluZyBhcyBhIGJ5dGUgYW5kXG4gKiByZXR1cm5zIGEgVWludDhBcnJheSBvZiB0aG9zZSBieXRlcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gdHVybiBpbnRvIGFuIGFycmF5XG4gKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAqL1xuZnVuY3Rpb24gYXNjaWlTdHJpbmdUb1VpbnQ4QXJyYXkgKHN0cmluZykge1xuICBjb25zdCBhcnJheSA9IG5ldyBVaW50OEFycmF5KHN0cmluZy5sZW5ndGgpXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICBhcnJheVtpXSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG4gIH1cblxuICByZXR1cm4gYXJyYXlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBgVWludDhBcnJheWAgZnJvbSB0aGUgcGFzc2VkIHN0cmluZ1xuICpcbiAqIFN1cHBvcnRzIGB1dGY4YCwgYHV0Zi04YCBhbmQgYW55IGVuY29kaW5nIHN1cHBvcnRlZCBieSB0aGUgbXVsdGliYXNlIG1vZHVsZS5cbiAqXG4gKiBBbHNvIGBhc2NpaWAgd2hpY2ggaXMgc2ltaWxhciB0byBub2RlJ3MgJ2JpbmFyeScgZW5jb2RpbmcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IFtlbmNvZGluZz11dGY4XSB1dGY4LCBiYXNlMTYsIGJhc2U2NCwgYmFzZTY0dXJscGFkLCBldGNcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvbXVsdGliYXNlfG11bHRpYmFzZX0gZm9yIHN1cHBvcnRlZCBlbmNvZGluZ3Mgb3RoZXIgdGhhbiBgdXRmOGBcbiAqL1xuZnVuY3Rpb24gZnJvbVN0cmluZyAoc3RyaW5nLCBlbmNvZGluZyA9ICd1dGY4Jykge1xuICBpZiAoZW5jb2RpbmcgPT09ICd1dGY4JyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi04Jykge1xuICAgIHJldHVybiB1dGY4RW5jb2Rlci5lbmNvZGUoc3RyaW5nKVxuICB9XG5cbiAgaWYgKGVuY29kaW5nID09PSAnYXNjaWknKSB7XG4gICAgcmV0dXJuIGFzY2lpU3RyaW5nVG9VaW50OEFycmF5KHN0cmluZylcbiAgfVxuXG4gIGNvbnN0IGNvZGVjID0gbmFtZXNbZW5jb2RpbmddXG5cbiAgaWYgKCFjb2RlYykge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBiYXNlJylcbiAgfVxuXG4gIHJldHVybiBjb2RlYy5kZWNvZGUoc3RyaW5nKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZyb21TdHJpbmdcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IG5hbWVzIH0gPSByZXF1aXJlKCdtdWx0aWJhc2Uvc3JjL2NvbnN0YW50cycpXG5jb25zdCB7IFRleHREZWNvZGVyIH0gPSByZXF1aXJlKCd3ZWItZW5jb2RpbmcnKVxuY29uc3QgdXRmOERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ3V0ZjgnKVxuXG4vKipcbiAqIFR1cm5zIGEgVWludDhBcnJheSBvZiBieXRlcyBpbnRvIGEgc3RyaW5nIHdpdGggZWFjaFxuICogY2hhcmFjdGVyIGJlaW5nIHRoZSBjaGFyIGNvZGUgb2YgdGhlIGNvcnJlc3BvbmRpbmcgYnl0ZVxuICpcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHR1cm4gaW50byBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gdWludDhBcnJheVRvQXNjaWlTdHJpbmcgKGFycmF5KSB7XG4gIGxldCBzdHJpbmcgPSAnJ1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhcnJheVtpXSlcbiAgfVxuICByZXR1cm4gc3RyaW5nXG59XG5cbi8qKlxuICogVHVybnMgYSBgVWludDhBcnJheWAgaW50byBhIHN0cmluZy5cbiAqXG4gKiBTdXBwb3J0cyBgdXRmOGAsIGB1dGYtOGAgYW5kIGFueSBlbmNvZGluZyBzdXBwb3J0ZWQgYnkgdGhlIG11bHRpYmFzZSBtb2R1bGUuXG4gKlxuICogQWxzbyBgYXNjaWlgIHdoaWNoIGlzIHNpbWlsYXIgdG8gbm9kZSdzICdiaW5hcnknIGVuY29kaW5nLlxuICpcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHR1cm4gaW50byBhIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IFtlbmNvZGluZz11dGY4XSBUaGUgZW5jb2RpbmcgdG8gdXNlXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvbXVsdGliYXNlfG11bHRpYmFzZX0gZm9yIHN1cHBvcnRlZCBlbmNvZGluZ3Mgb3RoZXIgdGhhbiBgdXRmOGBcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcgKGFycmF5LCBlbmNvZGluZyA9ICd1dGY4Jykge1xuICBpZiAoZW5jb2RpbmcgPT09ICd1dGY4JyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi04Jykge1xuICAgIHJldHVybiB1dGY4RGVjb2Rlci5kZWNvZGUoYXJyYXkpXG4gIH1cblxuICBpZiAoZW5jb2RpbmcgPT09ICdhc2NpaScpIHtcbiAgICByZXR1cm4gdWludDhBcnJheVRvQXNjaWlTdHJpbmcoYXJyYXkpXG4gIH1cblxuICBjb25zdCBjb2RlYyA9IG5hbWVzW2VuY29kaW5nXVxuXG4gIGlmICghY29kZWMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYmFzZScpXG4gIH1cblxuICByZXR1cm4gY29kZWMuZW5jb2RlKGFycmF5KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlYWRcblxudmFyIE1TQiA9IDB4ODBcbiAgLCBSRVNUID0gMHg3RlxuXG5mdW5jdGlvbiByZWFkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciByZXMgICAgPSAwXG4gICAgLCBvZmZzZXQgPSBvZmZzZXQgfHwgMFxuICAgICwgc2hpZnQgID0gMFxuICAgICwgY291bnRlciA9IG9mZnNldFxuICAgICwgYlxuICAgICwgbCA9IGJ1Zi5sZW5ndGhcblxuICBkbyB7XG4gICAgaWYgKGNvdW50ZXIgPj0gbCB8fCBzaGlmdCA+IDQ5KSB7XG4gICAgICByZWFkLmJ5dGVzID0gMFxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0NvdWxkIG5vdCBkZWNvZGUgdmFyaW50JylcbiAgICB9XG4gICAgYiA9IGJ1Zltjb3VudGVyKytdXG4gICAgcmVzICs9IHNoaWZ0IDwgMjhcbiAgICAgID8gKGIgJiBSRVNUKSA8PCBzaGlmdFxuICAgICAgOiAoYiAmIFJFU1QpICogTWF0aC5wb3coMiwgc2hpZnQpXG4gICAgc2hpZnQgKz0gN1xuICB9IHdoaWxlIChiID49IE1TQilcblxuICByZWFkLmJ5dGVzID0gY291bnRlciAtIG9mZnNldFxuXG4gIHJldHVybiByZXNcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZW5jb2RlXG5cbnZhciBNU0IgPSAweDgwXG4gICwgUkVTVCA9IDB4N0ZcbiAgLCBNU0JBTEwgPSB+UkVTVFxuICAsIElOVCA9IE1hdGgucG93KDIsIDMxKVxuXG5mdW5jdGlvbiBlbmNvZGUobnVtLCBvdXQsIG9mZnNldCkge1xuICBpZiAoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgJiYgbnVtID4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICBlbmNvZGUuYnl0ZXMgPSAwXG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0NvdWxkIG5vdCBlbmNvZGUgdmFyaW50JylcbiAgfVxuICBvdXQgPSBvdXQgfHwgW11cbiAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDBcbiAgdmFyIG9sZE9mZnNldCA9IG9mZnNldFxuXG4gIHdoaWxlKG51bSA+PSBJTlQpIHtcbiAgICBvdXRbb2Zmc2V0KytdID0gKG51bSAmIDB4RkYpIHwgTVNCXG4gICAgbnVtIC89IDEyOFxuICB9XG4gIHdoaWxlKG51bSAmIE1TQkFMTCkge1xuICAgIG91dFtvZmZzZXQrK10gPSAobnVtICYgMHhGRikgfCBNU0JcbiAgICBudW0gPj4+PSA3XG4gIH1cbiAgb3V0W29mZnNldF0gPSBudW0gfCAwXG4gIFxuICBlbmNvZGUuYnl0ZXMgPSBvZmZzZXQgLSBvbGRPZmZzZXQgKyAxXG4gIFxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlbmNvZGU6IHJlcXVpcmUoJy4vZW5jb2RlLmpzJylcbiAgLCBkZWNvZGU6IHJlcXVpcmUoJy4vZGVjb2RlLmpzJylcbiAgLCBlbmNvZGluZ0xlbmd0aDogcmVxdWlyZSgnLi9sZW5ndGguanMnKVxufVxuIiwiXG52YXIgTjEgPSBNYXRoLnBvdygyLCAgNylcbnZhciBOMiA9IE1hdGgucG93KDIsIDE0KVxudmFyIE4zID0gTWF0aC5wb3coMiwgMjEpXG52YXIgTjQgPSBNYXRoLnBvdygyLCAyOClcbnZhciBONSA9IE1hdGgucG93KDIsIDM1KVxudmFyIE42ID0gTWF0aC5wb3coMiwgNDIpXG52YXIgTjcgPSBNYXRoLnBvdygyLCA0OSlcbnZhciBOOCA9IE1hdGgucG93KDIsIDU2KVxudmFyIE45ID0gTWF0aC5wb3coMiwgNjMpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdmFsdWUgPCBOMSA/IDFcbiAgOiB2YWx1ZSA8IE4yID8gMlxuICA6IHZhbHVlIDwgTjMgPyAzXG4gIDogdmFsdWUgPCBONCA/IDRcbiAgOiB2YWx1ZSA8IE41ID8gNVxuICA6IHZhbHVlIDwgTjYgPyA2XG4gIDogdmFsdWUgPCBONyA/IDdcbiAgOiB2YWx1ZSA8IE44ID8gOFxuICA6IHZhbHVlIDwgTjkgPyA5XG4gIDogICAgICAgICAgICAgIDEwXG4gIClcbn1cbiIsIi8vIERPIE5PVCBDSEFOR0UgVEhJUyBGSUxFLiBJVCBJUyBHRU5FUkFURUQgQlkgdG9vbHMvdXBkYXRlLXRhYmxlLmpzXG4vKiBlc2xpbnQgcXVvdGUtcHJvcHM6IG9mZiAqL1xuJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogQHR5cGUge19faW1wb3J0X18oJy4vZ2VuZXJhdGVkLXR5cGVzJykuTmFtZU51bWJlck1hcH1cbiAqL1xuY29uc3QgYmFzZVRhYmxlID0gT2JqZWN0LmZyZWV6ZSh7XG4gICdpZGVudGl0eSc6IDB4MDAsXG4gICdjaWR2MSc6IDB4MDEsXG4gICdjaWR2Mic6IDB4MDIsXG4gICdjaWR2Myc6IDB4MDMsXG4gICdpcDQnOiAweDA0LFxuICAndGNwJzogMHgwNixcbiAgJ3NoYTEnOiAweDExLFxuICAnc2hhMi0yNTYnOiAweDEyLFxuICAnc2hhMi01MTInOiAweDEzLFxuICAnc2hhMy01MTInOiAweDE0LFxuICAnc2hhMy0zODQnOiAweDE1LFxuICAnc2hhMy0yNTYnOiAweDE2LFxuICAnc2hhMy0yMjQnOiAweDE3LFxuICAnc2hha2UtMTI4JzogMHgxOCxcbiAgJ3NoYWtlLTI1Nic6IDB4MTksXG4gICdrZWNjYWstMjI0JzogMHgxYSxcbiAgJ2tlY2Nhay0yNTYnOiAweDFiLFxuICAna2VjY2FrLTM4NCc6IDB4MWMsXG4gICdrZWNjYWstNTEyJzogMHgxZCxcbiAgJ2JsYWtlMyc6IDB4MWUsXG4gICdkY2NwJzogMHgyMSxcbiAgJ211cm11cjMtMTI4JzogMHgyMixcbiAgJ211cm11cjMtMzInOiAweDIzLFxuICAnaXA2JzogMHgyOSxcbiAgJ2lwNnpvbmUnOiAweDJhLFxuICAncGF0aCc6IDB4MmYsXG4gICdtdWx0aWNvZGVjJzogMHgzMCxcbiAgJ211bHRpaGFzaCc6IDB4MzEsXG4gICdtdWx0aWFkZHInOiAweDMyLFxuICAnbXVsdGliYXNlJzogMHgzMyxcbiAgJ2Rucyc6IDB4MzUsXG4gICdkbnM0JzogMHgzNixcbiAgJ2RuczYnOiAweDM3LFxuICAnZG5zYWRkcic6IDB4MzgsXG4gICdwcm90b2J1Zic6IDB4NTAsXG4gICdjYm9yJzogMHg1MSxcbiAgJ3Jhdyc6IDB4NTUsXG4gICdkYmwtc2hhMi0yNTYnOiAweDU2LFxuICAncmxwJzogMHg2MCxcbiAgJ2JlbmNvZGUnOiAweDYzLFxuICAnZGFnLXBiJzogMHg3MCxcbiAgJ2RhZy1jYm9yJzogMHg3MSxcbiAgJ2xpYnAycC1rZXknOiAweDcyLFxuICAnZ2l0LXJhdyc6IDB4NzgsXG4gICd0b3JyZW50LWluZm8nOiAweDdiLFxuICAndG9ycmVudC1maWxlJzogMHg3YyxcbiAgJ2xlb2Zjb2luLWJsb2NrJzogMHg4MSxcbiAgJ2xlb2Zjb2luLXR4JzogMHg4MixcbiAgJ2xlb2Zjb2luLXByJzogMHg4MyxcbiAgJ3NjdHAnOiAweDg0LFxuICAnZGFnLWpvc2UnOiAweDg1LFxuICAnZGFnLWNvc2UnOiAweDg2LFxuICAnZXRoLWJsb2NrJzogMHg5MCxcbiAgJ2V0aC1ibG9jay1saXN0JzogMHg5MSxcbiAgJ2V0aC10eC10cmllJzogMHg5MixcbiAgJ2V0aC10eCc6IDB4OTMsXG4gICdldGgtdHgtcmVjZWlwdC10cmllJzogMHg5NCxcbiAgJ2V0aC10eC1yZWNlaXB0JzogMHg5NSxcbiAgJ2V0aC1zdGF0ZS10cmllJzogMHg5NixcbiAgJ2V0aC1hY2NvdW50LXNuYXBzaG90JzogMHg5NyxcbiAgJ2V0aC1zdG9yYWdlLXRyaWUnOiAweDk4LFxuICAnYml0Y29pbi1ibG9jayc6IDB4YjAsXG4gICdiaXRjb2luLXR4JzogMHhiMSxcbiAgJ2JpdGNvaW4td2l0bmVzcy1jb21taXRtZW50JzogMHhiMixcbiAgJ3pjYXNoLWJsb2NrJzogMHhjMCxcbiAgJ3pjYXNoLXR4JzogMHhjMSxcbiAgJ2RvY2lkJzogMHhjZSxcbiAgJ3N0ZWxsYXItYmxvY2snOiAweGQwLFxuICAnc3RlbGxhci10eCc6IDB4ZDEsXG4gICdtZDQnOiAweGQ0LFxuICAnbWQ1JzogMHhkNSxcbiAgJ2JtdCc6IDB4ZDYsXG4gICdkZWNyZWQtYmxvY2snOiAweGUwLFxuICAnZGVjcmVkLXR4JzogMHhlMSxcbiAgJ2lwbGQtbnMnOiAweGUyLFxuICAnaXBmcy1ucyc6IDB4ZTMsXG4gICdzd2FybS1ucyc6IDB4ZTQsXG4gICdpcG5zLW5zJzogMHhlNSxcbiAgJ3plcm9uZXQnOiAweGU2LFxuICAnc2VjcDI1NmsxLXB1Yic6IDB4ZTcsXG4gICdibHMxMl8zODEtZzEtcHViJzogMHhlYSxcbiAgJ2JsczEyXzM4MS1nMi1wdWInOiAweGViLFxuICAneDI1NTE5LXB1Yic6IDB4ZWMsXG4gICdlZDI1NTE5LXB1Yic6IDB4ZWQsXG4gICdibHMxMl8zODEtZzFnMi1wdWInOiAweGVlLFxuICAnZGFzaC1ibG9jayc6IDB4ZjAsXG4gICdkYXNoLXR4JzogMHhmMSxcbiAgJ3N3YXJtLW1hbmlmZXN0JzogMHhmYSxcbiAgJ3N3YXJtLWZlZWQnOiAweGZiLFxuICAndWRwJzogMHgwMTExLFxuICAncDJwLXdlYnJ0Yy1zdGFyJzogMHgwMTEzLFxuICAncDJwLXdlYnJ0Yy1kaXJlY3QnOiAweDAxMTQsXG4gICdwMnAtc3RhcmR1c3QnOiAweDAxMTUsXG4gICdwMnAtY2lyY3VpdCc6IDB4MDEyMixcbiAgJ2RhZy1qc29uJzogMHgwMTI5LFxuICAndWR0JzogMHgwMTJkLFxuICAndXRwJzogMHgwMTJlLFxuICAndW5peCc6IDB4MDE5MCxcbiAgJ3AycCc6IDB4MDFhNSxcbiAgJ2lwZnMnOiAweDAxYTUsXG4gICdodHRwcyc6IDB4MDFiYixcbiAgJ29uaW9uJzogMHgwMWJjLFxuICAnb25pb24zJzogMHgwMWJkLFxuICAnZ2FybGljNjQnOiAweDAxYmUsXG4gICdnYXJsaWMzMic6IDB4MDFiZixcbiAgJ3Rscyc6IDB4MDFjMCxcbiAgJ3F1aWMnOiAweDAxY2MsXG4gICd3cyc6IDB4MDFkZCxcbiAgJ3dzcyc6IDB4MDFkZSxcbiAgJ3AycC13ZWJzb2NrZXQtc3Rhcic6IDB4MDFkZixcbiAgJ2h0dHAnOiAweDAxZTAsXG4gICdqc29uJzogMHgwMjAwLFxuICAnbWVzc2FnZXBhY2snOiAweDAyMDEsXG4gICdsaWJwMnAtcGVlci1yZWNvcmQnOiAweDAzMDEsXG4gICdzaGEyLTI1Ni10cnVuYzI1NC1wYWRkZWQnOiAweDEwMTIsXG4gICdyaXBlbWQtMTI4JzogMHgxMDUyLFxuICAncmlwZW1kLTE2MCc6IDB4MTA1MyxcbiAgJ3JpcGVtZC0yNTYnOiAweDEwNTQsXG4gICdyaXBlbWQtMzIwJzogMHgxMDU1LFxuICAneDExJzogMHgxMTAwLFxuICAncDI1Ni1wdWInOiAweDEyMDAsXG4gICdwMzg0LXB1Yic6IDB4MTIwMSxcbiAgJ3A1MjEtcHViJzogMHgxMjAyLFxuICAnZWQ0NDgtcHViJzogMHgxMjAzLFxuICAneDQ0OC1wdWInOiAweDEyMDQsXG4gICdlZDI1NTE5LXByaXYnOiAweDEzMDAsXG4gICdrYW5nYXJvb3R3ZWx2ZSc6IDB4MWQwMSxcbiAgJ3NtMy0yNTYnOiAweDUzNGQsXG4gICdibGFrZTJiLTgnOiAweGIyMDEsXG4gICdibGFrZTJiLTE2JzogMHhiMjAyLFxuICAnYmxha2UyYi0yNCc6IDB4YjIwMyxcbiAgJ2JsYWtlMmItMzInOiAweGIyMDQsXG4gICdibGFrZTJiLTQwJzogMHhiMjA1LFxuICAnYmxha2UyYi00OCc6IDB4YjIwNixcbiAgJ2JsYWtlMmItNTYnOiAweGIyMDcsXG4gICdibGFrZTJiLTY0JzogMHhiMjA4LFxuICAnYmxha2UyYi03Mic6IDB4YjIwOSxcbiAgJ2JsYWtlMmItODAnOiAweGIyMGEsXG4gICdibGFrZTJiLTg4JzogMHhiMjBiLFxuICAnYmxha2UyYi05Nic6IDB4YjIwYyxcbiAgJ2JsYWtlMmItMTA0JzogMHhiMjBkLFxuICAnYmxha2UyYi0xMTInOiAweGIyMGUsXG4gICdibGFrZTJiLTEyMCc6IDB4YjIwZixcbiAgJ2JsYWtlMmItMTI4JzogMHhiMjEwLFxuICAnYmxha2UyYi0xMzYnOiAweGIyMTEsXG4gICdibGFrZTJiLTE0NCc6IDB4YjIxMixcbiAgJ2JsYWtlMmItMTUyJzogMHhiMjEzLFxuICAnYmxha2UyYi0xNjAnOiAweGIyMTQsXG4gICdibGFrZTJiLTE2OCc6IDB4YjIxNSxcbiAgJ2JsYWtlMmItMTc2JzogMHhiMjE2LFxuICAnYmxha2UyYi0xODQnOiAweGIyMTcsXG4gICdibGFrZTJiLTE5Mic6IDB4YjIxOCxcbiAgJ2JsYWtlMmItMjAwJzogMHhiMjE5LFxuICAnYmxha2UyYi0yMDgnOiAweGIyMWEsXG4gICdibGFrZTJiLTIxNic6IDB4YjIxYixcbiAgJ2JsYWtlMmItMjI0JzogMHhiMjFjLFxuICAnYmxha2UyYi0yMzInOiAweGIyMWQsXG4gICdibGFrZTJiLTI0MCc6IDB4YjIxZSxcbiAgJ2JsYWtlMmItMjQ4JzogMHhiMjFmLFxuICAnYmxha2UyYi0yNTYnOiAweGIyMjAsXG4gICdibGFrZTJiLTI2NCc6IDB4YjIyMSxcbiAgJ2JsYWtlMmItMjcyJzogMHhiMjIyLFxuICAnYmxha2UyYi0yODAnOiAweGIyMjMsXG4gICdibGFrZTJiLTI4OCc6IDB4YjIyNCxcbiAgJ2JsYWtlMmItMjk2JzogMHhiMjI1LFxuICAnYmxha2UyYi0zMDQnOiAweGIyMjYsXG4gICdibGFrZTJiLTMxMic6IDB4YjIyNyxcbiAgJ2JsYWtlMmItMzIwJzogMHhiMjI4LFxuICAnYmxha2UyYi0zMjgnOiAweGIyMjksXG4gICdibGFrZTJiLTMzNic6IDB4YjIyYSxcbiAgJ2JsYWtlMmItMzQ0JzogMHhiMjJiLFxuICAnYmxha2UyYi0zNTInOiAweGIyMmMsXG4gICdibGFrZTJiLTM2MCc6IDB4YjIyZCxcbiAgJ2JsYWtlMmItMzY4JzogMHhiMjJlLFxuICAnYmxha2UyYi0zNzYnOiAweGIyMmYsXG4gICdibGFrZTJiLTM4NCc6IDB4YjIzMCxcbiAgJ2JsYWtlMmItMzkyJzogMHhiMjMxLFxuICAnYmxha2UyYi00MDAnOiAweGIyMzIsXG4gICdibGFrZTJiLTQwOCc6IDB4YjIzMyxcbiAgJ2JsYWtlMmItNDE2JzogMHhiMjM0LFxuICAnYmxha2UyYi00MjQnOiAweGIyMzUsXG4gICdibGFrZTJiLTQzMic6IDB4YjIzNixcbiAgJ2JsYWtlMmItNDQwJzogMHhiMjM3LFxuICAnYmxha2UyYi00NDgnOiAweGIyMzgsXG4gICdibGFrZTJiLTQ1Nic6IDB4YjIzOSxcbiAgJ2JsYWtlMmItNDY0JzogMHhiMjNhLFxuICAnYmxha2UyYi00NzInOiAweGIyM2IsXG4gICdibGFrZTJiLTQ4MCc6IDB4YjIzYyxcbiAgJ2JsYWtlMmItNDg4JzogMHhiMjNkLFxuICAnYmxha2UyYi00OTYnOiAweGIyM2UsXG4gICdibGFrZTJiLTUwNCc6IDB4YjIzZixcbiAgJ2JsYWtlMmItNTEyJzogMHhiMjQwLFxuICAnYmxha2Uycy04JzogMHhiMjQxLFxuICAnYmxha2Uycy0xNic6IDB4YjI0MixcbiAgJ2JsYWtlMnMtMjQnOiAweGIyNDMsXG4gICdibGFrZTJzLTMyJzogMHhiMjQ0LFxuICAnYmxha2Uycy00MCc6IDB4YjI0NSxcbiAgJ2JsYWtlMnMtNDgnOiAweGIyNDYsXG4gICdibGFrZTJzLTU2JzogMHhiMjQ3LFxuICAnYmxha2Uycy02NCc6IDB4YjI0OCxcbiAgJ2JsYWtlMnMtNzInOiAweGIyNDksXG4gICdibGFrZTJzLTgwJzogMHhiMjRhLFxuICAnYmxha2Uycy04OCc6IDB4YjI0YixcbiAgJ2JsYWtlMnMtOTYnOiAweGIyNGMsXG4gICdibGFrZTJzLTEwNCc6IDB4YjI0ZCxcbiAgJ2JsYWtlMnMtMTEyJzogMHhiMjRlLFxuICAnYmxha2Uycy0xMjAnOiAweGIyNGYsXG4gICdibGFrZTJzLTEyOCc6IDB4YjI1MCxcbiAgJ2JsYWtlMnMtMTM2JzogMHhiMjUxLFxuICAnYmxha2Uycy0xNDQnOiAweGIyNTIsXG4gICdibGFrZTJzLTE1Mic6IDB4YjI1MyxcbiAgJ2JsYWtlMnMtMTYwJzogMHhiMjU0LFxuICAnYmxha2Uycy0xNjgnOiAweGIyNTUsXG4gICdibGFrZTJzLTE3Nic6IDB4YjI1NixcbiAgJ2JsYWtlMnMtMTg0JzogMHhiMjU3LFxuICAnYmxha2Uycy0xOTInOiAweGIyNTgsXG4gICdibGFrZTJzLTIwMCc6IDB4YjI1OSxcbiAgJ2JsYWtlMnMtMjA4JzogMHhiMjVhLFxuICAnYmxha2Uycy0yMTYnOiAweGIyNWIsXG4gICdibGFrZTJzLTIyNCc6IDB4YjI1YyxcbiAgJ2JsYWtlMnMtMjMyJzogMHhiMjVkLFxuICAnYmxha2Uycy0yNDAnOiAweGIyNWUsXG4gICdibGFrZTJzLTI0OCc6IDB4YjI1ZixcbiAgJ2JsYWtlMnMtMjU2JzogMHhiMjYwLFxuICAnc2tlaW4yNTYtOCc6IDB4YjMwMSxcbiAgJ3NrZWluMjU2LTE2JzogMHhiMzAyLFxuICAnc2tlaW4yNTYtMjQnOiAweGIzMDMsXG4gICdza2VpbjI1Ni0zMic6IDB4YjMwNCxcbiAgJ3NrZWluMjU2LTQwJzogMHhiMzA1LFxuICAnc2tlaW4yNTYtNDgnOiAweGIzMDYsXG4gICdza2VpbjI1Ni01Nic6IDB4YjMwNyxcbiAgJ3NrZWluMjU2LTY0JzogMHhiMzA4LFxuICAnc2tlaW4yNTYtNzInOiAweGIzMDksXG4gICdza2VpbjI1Ni04MCc6IDB4YjMwYSxcbiAgJ3NrZWluMjU2LTg4JzogMHhiMzBiLFxuICAnc2tlaW4yNTYtOTYnOiAweGIzMGMsXG4gICdza2VpbjI1Ni0xMDQnOiAweGIzMGQsXG4gICdza2VpbjI1Ni0xMTInOiAweGIzMGUsXG4gICdza2VpbjI1Ni0xMjAnOiAweGIzMGYsXG4gICdza2VpbjI1Ni0xMjgnOiAweGIzMTAsXG4gICdza2VpbjI1Ni0xMzYnOiAweGIzMTEsXG4gICdza2VpbjI1Ni0xNDQnOiAweGIzMTIsXG4gICdza2VpbjI1Ni0xNTInOiAweGIzMTMsXG4gICdza2VpbjI1Ni0xNjAnOiAweGIzMTQsXG4gICdza2VpbjI1Ni0xNjgnOiAweGIzMTUsXG4gICdza2VpbjI1Ni0xNzYnOiAweGIzMTYsXG4gICdza2VpbjI1Ni0xODQnOiAweGIzMTcsXG4gICdza2VpbjI1Ni0xOTInOiAweGIzMTgsXG4gICdza2VpbjI1Ni0yMDAnOiAweGIzMTksXG4gICdza2VpbjI1Ni0yMDgnOiAweGIzMWEsXG4gICdza2VpbjI1Ni0yMTYnOiAweGIzMWIsXG4gICdza2VpbjI1Ni0yMjQnOiAweGIzMWMsXG4gICdza2VpbjI1Ni0yMzInOiAweGIzMWQsXG4gICdza2VpbjI1Ni0yNDAnOiAweGIzMWUsXG4gICdza2VpbjI1Ni0yNDgnOiAweGIzMWYsXG4gICdza2VpbjI1Ni0yNTYnOiAweGIzMjAsXG4gICdza2VpbjUxMi04JzogMHhiMzIxLFxuICAnc2tlaW41MTItMTYnOiAweGIzMjIsXG4gICdza2VpbjUxMi0yNCc6IDB4YjMyMyxcbiAgJ3NrZWluNTEyLTMyJzogMHhiMzI0LFxuICAnc2tlaW41MTItNDAnOiAweGIzMjUsXG4gICdza2VpbjUxMi00OCc6IDB4YjMyNixcbiAgJ3NrZWluNTEyLTU2JzogMHhiMzI3LFxuICAnc2tlaW41MTItNjQnOiAweGIzMjgsXG4gICdza2VpbjUxMi03Mic6IDB4YjMyOSxcbiAgJ3NrZWluNTEyLTgwJzogMHhiMzJhLFxuICAnc2tlaW41MTItODgnOiAweGIzMmIsXG4gICdza2VpbjUxMi05Nic6IDB4YjMyYyxcbiAgJ3NrZWluNTEyLTEwNCc6IDB4YjMyZCxcbiAgJ3NrZWluNTEyLTExMic6IDB4YjMyZSxcbiAgJ3NrZWluNTEyLTEyMCc6IDB4YjMyZixcbiAgJ3NrZWluNTEyLTEyOCc6IDB4YjMzMCxcbiAgJ3NrZWluNTEyLTEzNic6IDB4YjMzMSxcbiAgJ3NrZWluNTEyLTE0NCc6IDB4YjMzMixcbiAgJ3NrZWluNTEyLTE1Mic6IDB4YjMzMyxcbiAgJ3NrZWluNTEyLTE2MCc6IDB4YjMzNCxcbiAgJ3NrZWluNTEyLTE2OCc6IDB4YjMzNSxcbiAgJ3NrZWluNTEyLTE3Nic6IDB4YjMzNixcbiAgJ3NrZWluNTEyLTE4NCc6IDB4YjMzNyxcbiAgJ3NrZWluNTEyLTE5Mic6IDB4YjMzOCxcbiAgJ3NrZWluNTEyLTIwMCc6IDB4YjMzOSxcbiAgJ3NrZWluNTEyLTIwOCc6IDB4YjMzYSxcbiAgJ3NrZWluNTEyLTIxNic6IDB4YjMzYixcbiAgJ3NrZWluNTEyLTIyNCc6IDB4YjMzYyxcbiAgJ3NrZWluNTEyLTIzMic6IDB4YjMzZCxcbiAgJ3NrZWluNTEyLTI0MCc6IDB4YjMzZSxcbiAgJ3NrZWluNTEyLTI0OCc6IDB4YjMzZixcbiAgJ3NrZWluNTEyLTI1Nic6IDB4YjM0MCxcbiAgJ3NrZWluNTEyLTI2NCc6IDB4YjM0MSxcbiAgJ3NrZWluNTEyLTI3Mic6IDB4YjM0MixcbiAgJ3NrZWluNTEyLTI4MCc6IDB4YjM0MyxcbiAgJ3NrZWluNTEyLTI4OCc6IDB4YjM0NCxcbiAgJ3NrZWluNTEyLTI5Nic6IDB4YjM0NSxcbiAgJ3NrZWluNTEyLTMwNCc6IDB4YjM0NixcbiAgJ3NrZWluNTEyLTMxMic6IDB4YjM0NyxcbiAgJ3NrZWluNTEyLTMyMCc6IDB4YjM0OCxcbiAgJ3NrZWluNTEyLTMyOCc6IDB4YjM0OSxcbiAgJ3NrZWluNTEyLTMzNic6IDB4YjM0YSxcbiAgJ3NrZWluNTEyLTM0NCc6IDB4YjM0YixcbiAgJ3NrZWluNTEyLTM1Mic6IDB4YjM0YyxcbiAgJ3NrZWluNTEyLTM2MCc6IDB4YjM0ZCxcbiAgJ3NrZWluNTEyLTM2OCc6IDB4YjM0ZSxcbiAgJ3NrZWluNTEyLTM3Nic6IDB4YjM0ZixcbiAgJ3NrZWluNTEyLTM4NCc6IDB4YjM1MCxcbiAgJ3NrZWluNTEyLTM5Mic6IDB4YjM1MSxcbiAgJ3NrZWluNTEyLTQwMCc6IDB4YjM1MixcbiAgJ3NrZWluNTEyLTQwOCc6IDB4YjM1MyxcbiAgJ3NrZWluNTEyLTQxNic6IDB4YjM1NCxcbiAgJ3NrZWluNTEyLTQyNCc6IDB4YjM1NSxcbiAgJ3NrZWluNTEyLTQzMic6IDB4YjM1NixcbiAgJ3NrZWluNTEyLTQ0MCc6IDB4YjM1NyxcbiAgJ3NrZWluNTEyLTQ0OCc6IDB4YjM1OCxcbiAgJ3NrZWluNTEyLTQ1Nic6IDB4YjM1OSxcbiAgJ3NrZWluNTEyLTQ2NCc6IDB4YjM1YSxcbiAgJ3NrZWluNTEyLTQ3Mic6IDB4YjM1YixcbiAgJ3NrZWluNTEyLTQ4MCc6IDB4YjM1YyxcbiAgJ3NrZWluNTEyLTQ4OCc6IDB4YjM1ZCxcbiAgJ3NrZWluNTEyLTQ5Nic6IDB4YjM1ZSxcbiAgJ3NrZWluNTEyLTUwNCc6IDB4YjM1ZixcbiAgJ3NrZWluNTEyLTUxMic6IDB4YjM2MCxcbiAgJ3NrZWluMTAyNC04JzogMHhiMzYxLFxuICAnc2tlaW4xMDI0LTE2JzogMHhiMzYyLFxuICAnc2tlaW4xMDI0LTI0JzogMHhiMzYzLFxuICAnc2tlaW4xMDI0LTMyJzogMHhiMzY0LFxuICAnc2tlaW4xMDI0LTQwJzogMHhiMzY1LFxuICAnc2tlaW4xMDI0LTQ4JzogMHhiMzY2LFxuICAnc2tlaW4xMDI0LTU2JzogMHhiMzY3LFxuICAnc2tlaW4xMDI0LTY0JzogMHhiMzY4LFxuICAnc2tlaW4xMDI0LTcyJzogMHhiMzY5LFxuICAnc2tlaW4xMDI0LTgwJzogMHhiMzZhLFxuICAnc2tlaW4xMDI0LTg4JzogMHhiMzZiLFxuICAnc2tlaW4xMDI0LTk2JzogMHhiMzZjLFxuICAnc2tlaW4xMDI0LTEwNCc6IDB4YjM2ZCxcbiAgJ3NrZWluMTAyNC0xMTInOiAweGIzNmUsXG4gICdza2VpbjEwMjQtMTIwJzogMHhiMzZmLFxuICAnc2tlaW4xMDI0LTEyOCc6IDB4YjM3MCxcbiAgJ3NrZWluMTAyNC0xMzYnOiAweGIzNzEsXG4gICdza2VpbjEwMjQtMTQ0JzogMHhiMzcyLFxuICAnc2tlaW4xMDI0LTE1Mic6IDB4YjM3MyxcbiAgJ3NrZWluMTAyNC0xNjAnOiAweGIzNzQsXG4gICdza2VpbjEwMjQtMTY4JzogMHhiMzc1LFxuICAnc2tlaW4xMDI0LTE3Nic6IDB4YjM3NixcbiAgJ3NrZWluMTAyNC0xODQnOiAweGIzNzcsXG4gICdza2VpbjEwMjQtMTkyJzogMHhiMzc4LFxuICAnc2tlaW4xMDI0LTIwMCc6IDB4YjM3OSxcbiAgJ3NrZWluMTAyNC0yMDgnOiAweGIzN2EsXG4gICdza2VpbjEwMjQtMjE2JzogMHhiMzdiLFxuICAnc2tlaW4xMDI0LTIyNCc6IDB4YjM3YyxcbiAgJ3NrZWluMTAyNC0yMzInOiAweGIzN2QsXG4gICdza2VpbjEwMjQtMjQwJzogMHhiMzdlLFxuICAnc2tlaW4xMDI0LTI0OCc6IDB4YjM3ZixcbiAgJ3NrZWluMTAyNC0yNTYnOiAweGIzODAsXG4gICdza2VpbjEwMjQtMjY0JzogMHhiMzgxLFxuICAnc2tlaW4xMDI0LTI3Mic6IDB4YjM4MixcbiAgJ3NrZWluMTAyNC0yODAnOiAweGIzODMsXG4gICdza2VpbjEwMjQtMjg4JzogMHhiMzg0LFxuICAnc2tlaW4xMDI0LTI5Nic6IDB4YjM4NSxcbiAgJ3NrZWluMTAyNC0zMDQnOiAweGIzODYsXG4gICdza2VpbjEwMjQtMzEyJzogMHhiMzg3LFxuICAnc2tlaW4xMDI0LTMyMCc6IDB4YjM4OCxcbiAgJ3NrZWluMTAyNC0zMjgnOiAweGIzODksXG4gICdza2VpbjEwMjQtMzM2JzogMHhiMzhhLFxuICAnc2tlaW4xMDI0LTM0NCc6IDB4YjM4YixcbiAgJ3NrZWluMTAyNC0zNTInOiAweGIzOGMsXG4gICdza2VpbjEwMjQtMzYwJzogMHhiMzhkLFxuICAnc2tlaW4xMDI0LTM2OCc6IDB4YjM4ZSxcbiAgJ3NrZWluMTAyNC0zNzYnOiAweGIzOGYsXG4gICdza2VpbjEwMjQtMzg0JzogMHhiMzkwLFxuICAnc2tlaW4xMDI0LTM5Mic6IDB4YjM5MSxcbiAgJ3NrZWluMTAyNC00MDAnOiAweGIzOTIsXG4gICdza2VpbjEwMjQtNDA4JzogMHhiMzkzLFxuICAnc2tlaW4xMDI0LTQxNic6IDB4YjM5NCxcbiAgJ3NrZWluMTAyNC00MjQnOiAweGIzOTUsXG4gICdza2VpbjEwMjQtNDMyJzogMHhiMzk2LFxuICAnc2tlaW4xMDI0LTQ0MCc6IDB4YjM5NyxcbiAgJ3NrZWluMTAyNC00NDgnOiAweGIzOTgsXG4gICdza2VpbjEwMjQtNDU2JzogMHhiMzk5LFxuICAnc2tlaW4xMDI0LTQ2NCc6IDB4YjM5YSxcbiAgJ3NrZWluMTAyNC00NzInOiAweGIzOWIsXG4gICdza2VpbjEwMjQtNDgwJzogMHhiMzljLFxuICAnc2tlaW4xMDI0LTQ4OCc6IDB4YjM5ZCxcbiAgJ3NrZWluMTAyNC00OTYnOiAweGIzOWUsXG4gICdza2VpbjEwMjQtNTA0JzogMHhiMzlmLFxuICAnc2tlaW4xMDI0LTUxMic6IDB4YjNhMCxcbiAgJ3NrZWluMTAyNC01MjAnOiAweGIzYTEsXG4gICdza2VpbjEwMjQtNTI4JzogMHhiM2EyLFxuICAnc2tlaW4xMDI0LTUzNic6IDB4YjNhMyxcbiAgJ3NrZWluMTAyNC01NDQnOiAweGIzYTQsXG4gICdza2VpbjEwMjQtNTUyJzogMHhiM2E1LFxuICAnc2tlaW4xMDI0LTU2MCc6IDB4YjNhNixcbiAgJ3NrZWluMTAyNC01NjgnOiAweGIzYTcsXG4gICdza2VpbjEwMjQtNTc2JzogMHhiM2E4LFxuICAnc2tlaW4xMDI0LTU4NCc6IDB4YjNhOSxcbiAgJ3NrZWluMTAyNC01OTInOiAweGIzYWEsXG4gICdza2VpbjEwMjQtNjAwJzogMHhiM2FiLFxuICAnc2tlaW4xMDI0LTYwOCc6IDB4YjNhYyxcbiAgJ3NrZWluMTAyNC02MTYnOiAweGIzYWQsXG4gICdza2VpbjEwMjQtNjI0JzogMHhiM2FlLFxuICAnc2tlaW4xMDI0LTYzMic6IDB4YjNhZixcbiAgJ3NrZWluMTAyNC02NDAnOiAweGIzYjAsXG4gICdza2VpbjEwMjQtNjQ4JzogMHhiM2IxLFxuICAnc2tlaW4xMDI0LTY1Nic6IDB4YjNiMixcbiAgJ3NrZWluMTAyNC02NjQnOiAweGIzYjMsXG4gICdza2VpbjEwMjQtNjcyJzogMHhiM2I0LFxuICAnc2tlaW4xMDI0LTY4MCc6IDB4YjNiNSxcbiAgJ3NrZWluMTAyNC02ODgnOiAweGIzYjYsXG4gICdza2VpbjEwMjQtNjk2JzogMHhiM2I3LFxuICAnc2tlaW4xMDI0LTcwNCc6IDB4YjNiOCxcbiAgJ3NrZWluMTAyNC03MTInOiAweGIzYjksXG4gICdza2VpbjEwMjQtNzIwJzogMHhiM2JhLFxuICAnc2tlaW4xMDI0LTcyOCc6IDB4YjNiYixcbiAgJ3NrZWluMTAyNC03MzYnOiAweGIzYmMsXG4gICdza2VpbjEwMjQtNzQ0JzogMHhiM2JkLFxuICAnc2tlaW4xMDI0LTc1Mic6IDB4YjNiZSxcbiAgJ3NrZWluMTAyNC03NjAnOiAweGIzYmYsXG4gICdza2VpbjEwMjQtNzY4JzogMHhiM2MwLFxuICAnc2tlaW4xMDI0LTc3Nic6IDB4YjNjMSxcbiAgJ3NrZWluMTAyNC03ODQnOiAweGIzYzIsXG4gICdza2VpbjEwMjQtNzkyJzogMHhiM2MzLFxuICAnc2tlaW4xMDI0LTgwMCc6IDB4YjNjNCxcbiAgJ3NrZWluMTAyNC04MDgnOiAweGIzYzUsXG4gICdza2VpbjEwMjQtODE2JzogMHhiM2M2LFxuICAnc2tlaW4xMDI0LTgyNCc6IDB4YjNjNyxcbiAgJ3NrZWluMTAyNC04MzInOiAweGIzYzgsXG4gICdza2VpbjEwMjQtODQwJzogMHhiM2M5LFxuICAnc2tlaW4xMDI0LTg0OCc6IDB4YjNjYSxcbiAgJ3NrZWluMTAyNC04NTYnOiAweGIzY2IsXG4gICdza2VpbjEwMjQtODY0JzogMHhiM2NjLFxuICAnc2tlaW4xMDI0LTg3Mic6IDB4YjNjZCxcbiAgJ3NrZWluMTAyNC04ODAnOiAweGIzY2UsXG4gICdza2VpbjEwMjQtODg4JzogMHhiM2NmLFxuICAnc2tlaW4xMDI0LTg5Nic6IDB4YjNkMCxcbiAgJ3NrZWluMTAyNC05MDQnOiAweGIzZDEsXG4gICdza2VpbjEwMjQtOTEyJzogMHhiM2QyLFxuICAnc2tlaW4xMDI0LTkyMCc6IDB4YjNkMyxcbiAgJ3NrZWluMTAyNC05MjgnOiAweGIzZDQsXG4gICdza2VpbjEwMjQtOTM2JzogMHhiM2Q1LFxuICAnc2tlaW4xMDI0LTk0NCc6IDB4YjNkNixcbiAgJ3NrZWluMTAyNC05NTInOiAweGIzZDcsXG4gICdza2VpbjEwMjQtOTYwJzogMHhiM2Q4LFxuICAnc2tlaW4xMDI0LTk2OCc6IDB4YjNkOSxcbiAgJ3NrZWluMTAyNC05NzYnOiAweGIzZGEsXG4gICdza2VpbjEwMjQtOTg0JzogMHhiM2RiLFxuICAnc2tlaW4xMDI0LTk5Mic6IDB4YjNkYyxcbiAgJ3NrZWluMTAyNC0xMDAwJzogMHhiM2RkLFxuICAnc2tlaW4xMDI0LTEwMDgnOiAweGIzZGUsXG4gICdza2VpbjEwMjQtMTAxNic6IDB4YjNkZixcbiAgJ3NrZWluMTAyNC0xMDI0JzogMHhiM2UwLFxuICAncG9zZWlkb24tYmxzMTJfMzgxLWEyLWZjMSc6IDB4YjQwMSxcbiAgJ3Bvc2VpZG9uLWJsczEyXzM4MS1hMi1mYzEtc2MnOiAweGI0MDIsXG4gICd6ZXJveGNlcnQtaW1wcmludC0yNTYnOiAweGNlMTEsXG4gICdmaWwtY29tbWl0bWVudC11bnNlYWxlZCc6IDB4ZjEwMSxcbiAgJ2ZpbC1jb21taXRtZW50LXNlYWxlZCc6IDB4ZjEwMixcbiAgJ2hvbG9jaGFpbi1hZHItdjAnOiAweDgwNzEyNCxcbiAgJ2hvbG9jaGFpbi1hZHItdjEnOiAweDgxNzEyNCxcbiAgJ2hvbG9jaGFpbi1rZXktdjAnOiAweDk0NzEyNCxcbiAgJ2hvbG9jaGFpbi1rZXktdjEnOiAweDk1NzEyNCxcbiAgJ2hvbG9jaGFpbi1zaWctdjAnOiAweGEyNzEyNCxcbiAgJ2hvbG9jaGFpbi1zaWctdjEnOiAweGEzNzEyNCxcbiAgJ3NreW5ldC1ucyc6IDB4YjE5OTEwXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgYmFzZVRhYmxlIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vKiogQHR5cGVkZWYge19faW1wb3J0X18oJy4vZ2VuZXJhdGVkLXR5cGVzJykuQ29uc3RhbnROdW1iZXJNYXB9IENvbnN0YW50TnVtYmVyTWFwICovXG5cbmNvbnN0IHsgYmFzZVRhYmxlIH0gPSByZXF1aXJlKCcuL2Jhc2UtdGFibGUnKVxuXG5jb25zdCBjb25zdGFudHMgPSAvKiogQHR5cGUge0NvbnN0YW50TnVtYmVyTWFwfSAqLyh7fSlcblxuZm9yIChjb25zdCBbbmFtZSwgY29kZV0gb2YgT2JqZWN0LmVudHJpZXMoYmFzZVRhYmxlKSkge1xuICBjb25zdCBjb25zdGFudCA9IG5hbWUudG9VcHBlckNhc2UoKS5yZXBsYWNlKC8tL2csICdfJylcbiAgY29uc3RhbnRzW2NvbnN0YW50XSA9IGNvZGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKGNvbnN0YW50cylcbiIsIi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIG11bHRpY29kZWMgc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBAbW9kdWxlIG11bHRpY29kZWNcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBtdWx0aWNvZGVjID0gcmVxdWlyZSgnbXVsdGljb2RlYycpXG4gKlxuICogY29uc3QgcHJlZml4ZWRQcm90b2J1ZiA9IG11bHRpY29kZWMuYWRkUHJlZml4KCdwcm90b2J1ZicsIHByb3RvYnVmQnVmZmVyKVxuICogLy8gcHJlZml4ZWRQcm90b2J1ZiAweDUwLi4uXG4gKlxuICovXG4ndXNlIHN0cmljdCdcblxuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL2dlbmVyYXRlZC10eXBlcycpLkNvZGVjTmFtZX0gQ29kZWNOYW1lICovXG4vKiogQHR5cGVkZWYge19faW1wb3J0X18oJy4vZ2VuZXJhdGVkLXR5cGVzJykuQ29kZWNOdW1iZXJ9IENvZGVjTnVtYmVyICovXG5cbmNvbnN0IHZhcmludCA9IHJlcXVpcmUoJ3ZhcmludCcpXG5jb25zdCBpbnRUYWJsZSA9IHJlcXVpcmUoJy4vaW50LXRhYmxlJylcbmNvbnN0IGNvZGVjTmFtZVRvQ29kZVZhcmludCA9IHJlcXVpcmUoJy4vdmFyaW50LXRhYmxlJylcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKVxuY29uc3QgdWludDhBcnJheUNvbmNhdCA9IHJlcXVpcmUoJ3VpbnQ4YXJyYXlzL2NvbmNhdCcpXG5cbi8qKlxuICogUHJlZml4IGEgYnVmZmVyIHdpdGggYSBtdWx0aWNvZGVjLXBhY2tlZC5cbiAqXG4gKiBAcGFyYW0ge0NvZGVjTmFtZXxVaW50OEFycmF5fSBtdWx0aWNvZGVjU3RyT3JDb2RlXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGRhdGFcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5mdW5jdGlvbiBhZGRQcmVmaXggKG11bHRpY29kZWNTdHJPckNvZGUsIGRhdGEpIHtcbiAgbGV0IHByZWZpeFxuXG4gIGlmIChtdWx0aWNvZGVjU3RyT3JDb2RlIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgIHByZWZpeCA9IHV0aWwudmFyaW50VWludDhBcnJheUVuY29kZShtdWx0aWNvZGVjU3RyT3JDb2RlKVxuICB9IGVsc2Uge1xuICAgIGlmIChjb2RlY05hbWVUb0NvZGVWYXJpbnRbbXVsdGljb2RlY1N0ck9yQ29kZV0pIHtcbiAgICAgIHByZWZpeCA9IGNvZGVjTmFtZVRvQ29kZVZhcmludFttdWx0aWNvZGVjU3RyT3JDb2RlXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpY29kZWMgbm90IHJlY29nbml6ZWQnKVxuICAgIH1cbiAgfVxuICByZXR1cm4gdWludDhBcnJheUNvbmNhdChbcHJlZml4LCBkYXRhXSwgcHJlZml4Lmxlbmd0aCArIGRhdGEubGVuZ3RoKVxufVxuXG4vKipcbiAqIERlY2Fwc3VsYXRlIHRoZSBtdWx0aWNvZGVjLXBhY2tlZCBwcmVmaXggZnJvbSB0aGUgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGRhdGFcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5mdW5jdGlvbiBybVByZWZpeCAoZGF0YSkge1xuICB2YXJpbnQuZGVjb2RlKGRhdGEpXG4gIHJldHVybiBkYXRhLnNsaWNlKHZhcmludC5kZWNvZGUuYnl0ZXMpXG59XG5cbi8qKlxuICogR2V0IHRoZSBjb2RlYyBvZiB0aGUgcHJlZml4ZWQgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IHByZWZpeGVkRGF0YVxuICogQHJldHVybnMge0NvZGVjTmFtZX1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29kZWMgKHByZWZpeGVkRGF0YSkge1xuICBjb25zdCBjb2RlID0gdmFyaW50LmRlY29kZShwcmVmaXhlZERhdGEpXG4gIGNvbnN0IGNvZGVjTmFtZSA9IGludFRhYmxlLmdldChjb2RlKVxuICBpZiAoY29kZWNOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGUgJHtjb2RlfSBub3QgZm91bmRgKVxuICB9XG4gIHJldHVybiBjb2RlY05hbWVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG5hbWUgb2YgdGhlIGNvZGVjLlxuICpcbiAqIEBwYXJhbSB7Q29kZWNOdW1iZXJ9IGNvZGVjXG4gKiBAcmV0dXJucyB7Q29kZWNOYW1lfHVuZGVmaW5lZH1cbiAqL1xuZnVuY3Rpb24gZ2V0TmFtZSAoY29kZWMpIHtcbiAgcmV0dXJuIGludFRhYmxlLmdldChjb2RlYylcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGNvZGUgb2YgdGhlIGNvZGVjXG4gKlxuICogQHBhcmFtIHtDb2RlY05hbWV9IG5hbWVcbiAqIEByZXR1cm5zIHtDb2RlY051bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0TnVtYmVyIChuYW1lKSB7XG4gIGNvbnN0IGNvZGUgPSBjb2RlY05hbWVUb0NvZGVWYXJpbnRbbmFtZV1cbiAgaWYgKGNvZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29kZWMgYCcgKyBuYW1lICsgJ2Agbm90IGZvdW5kJylcbiAgfVxuICByZXR1cm4gdmFyaW50LmRlY29kZShjb2RlKVxufVxuXG4vKipcbiAqIEdldCB0aGUgY29kZSBvZiB0aGUgcHJlZml4ZWQgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IHByZWZpeGVkRGF0YVxuICogQHJldHVybnMge0NvZGVjTnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRDb2RlIChwcmVmaXhlZERhdGEpIHtcbiAgcmV0dXJuIHZhcmludC5kZWNvZGUocHJlZml4ZWREYXRhKVxufVxuXG4vKipcbiAqIEdldCB0aGUgY29kZSBhcyB2YXJpbnQgb2YgYSBjb2RlYyBuYW1lLlxuICpcbiAqIEBwYXJhbSB7Q29kZWNOYW1lfSBjb2RlY05hbWVcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5mdW5jdGlvbiBnZXRDb2RlVmFyaW50IChjb2RlY05hbWUpIHtcbiAgY29uc3QgY29kZSA9IGNvZGVjTmFtZVRvQ29kZVZhcmludFtjb2RlY05hbWVdXG4gIGlmIChjb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvZGVjIGAnICsgY29kZWNOYW1lICsgJ2Agbm90IGZvdW5kJylcbiAgfVxuICByZXR1cm4gY29kZVxufVxuXG4vKipcbiAqIEdldCB0aGUgdmFyaW50IG9mIGEgY29kZS5cbiAqXG4gKiBAcGFyYW0ge0NvZGVjTnVtYmVyfSBjb2RlXG4gKiBAcmV0dXJucyB7QXJyYXkuPG51bWJlcj59XG4gKi9cbmZ1bmN0aW9uIGdldFZhcmludCAoY29kZSkge1xuICByZXR1cm4gdmFyaW50LmVuY29kZShjb2RlKVxufVxuXG4vLyBNYWtlIHRoZSBjb25zdGFudHMgdG9wLWxldmVsIGNvbnN0YW50c1xuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKVxuXG4vLyBIdW1hbiBmcmllbmRseSBuYW1lcyBmb3IgcHJpbnRpbmcsIGUuZy4gaW4gZXJyb3IgbWVzc2FnZXNcbmNvbnN0IHByaW50ID0gcmVxdWlyZSgnLi9wcmludCcpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGRQcmVmaXgsXG4gIHJtUHJlZml4LFxuICBnZXRDb2RlYyxcbiAgZ2V0TmFtZSxcbiAgZ2V0TnVtYmVyLFxuICBnZXRDb2RlLFxuICBnZXRDb2RlVmFyaW50LFxuICBnZXRWYXJpbnQsXG4gIHByaW50LFxuICAuLi5jb25zdGFudHNcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vKiogQHR5cGVkZWYge19faW1wb3J0X18oJy4vZ2VuZXJhdGVkLXR5cGVzJykuQ29kZWNOYW1lfSBDb2RlY05hbWUgKi9cbi8qKiBAdHlwZWRlZiB7X19pbXBvcnRfXygnLi9nZW5lcmF0ZWQtdHlwZXMnKS5Db2RlY051bWJlcn0gQ29kZWNOdW1iZXIgKi9cblxuY29uc3QgeyBiYXNlVGFibGUgfSA9IHJlcXVpcmUoJy4vYmFzZS10YWJsZScpXG5cbi8qKlxuICogQHR5cGUge01hcDxDb2RlY051bWJlcixDb2RlY05hbWU+fVxuICovXG5jb25zdCBuYW1lVGFibGUgPSBuZXcgTWFwKClcblxuZm9yIChjb25zdCBlbmNvZGluZ05hbWUgaW4gYmFzZVRhYmxlKSB7XG4gIGNvbnN0IGNvZGUgPSBiYXNlVGFibGVbZW5jb2RpbmdOYW1lXVxuICBuYW1lVGFibGUuc2V0KGNvZGUsIC8qKiBAdHlwZSB7Q29kZWNOYW1lfSAqLyhlbmNvZGluZ05hbWUpKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUobmFtZVRhYmxlKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qKiBAdHlwZWRlZiB7X19pbXBvcnRfXygnLi9nZW5lcmF0ZWQtdHlwZXMnKS5Db2RlY05hbWV9IENvZGVjTmFtZSAqL1xuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL2dlbmVyYXRlZC10eXBlcycpLk51bWJlck5hbWVNYXB9IE51bWJlck5hbWVNYXAgKi9cblxuY29uc3QgeyBiYXNlVGFibGUgfSA9IHJlcXVpcmUoJy4vYmFzZS10YWJsZScpXG5cbmNvbnN0IHRhYmxlQnlDb2RlID0gLyoqIEB0eXBlIHtOdW1iZXJOYW1lTWFwfSAqLyh7fSlcblxuZm9yIChjb25zdCBbbmFtZSwgY29kZV0gb2YgT2JqZWN0LmVudHJpZXMoYmFzZVRhYmxlKSkge1xuICBpZiAodGFibGVCeUNvZGVbY29kZV0gPT09IHVuZGVmaW5lZCkge1xuICAgIHRhYmxlQnlDb2RlW2NvZGVdID0gLyoqIEB0eXBlIHtDb2RlY05hbWV9ICoqLyhuYW1lKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gLyoqIEB0eXBlIHtOdW1iZXJOYW1lTWFwfSAqLyhPYmplY3QuZnJlZXplKHRhYmxlQnlDb2RlKSlcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB2YXJpbnQgPSByZXF1aXJlKCd2YXJpbnQnKVxuY29uc3QgdWludDhBcnJheVRvU3RyaW5nID0gcmVxdWlyZSgndWludDhhcnJheXMvdG8tc3RyaW5nJylcbmNvbnN0IHVpbnQ4QXJyYXlGcm9tU3RyaW5nID0gcmVxdWlyZSgndWludDhhcnJheXMvZnJvbS1zdHJpbmcnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbnVtYmVyVG9VaW50OEFycmF5LFxuICB1aW50OEFycmF5VG9OdW1iZXIsXG4gIHZhcmludFVpbnQ4QXJyYXlFbmNvZGUsXG4gIHZhcmludEVuY29kZVxufVxuXG5mdW5jdGlvbiB1aW50OEFycmF5VG9OdW1iZXIgKGJ1Zikge1xuICByZXR1cm4gcGFyc2VJbnQodWludDhBcnJheVRvU3RyaW5nKGJ1ZiwgJ2Jhc2UxNicpLCAxNilcbn1cblxuZnVuY3Rpb24gbnVtYmVyVG9VaW50OEFycmF5IChudW0pIHtcbiAgbGV0IGhleFN0cmluZyA9IG51bS50b1N0cmluZygxNilcbiAgaWYgKGhleFN0cmluZy5sZW5ndGggJSAyID09PSAxKSB7XG4gICAgaGV4U3RyaW5nID0gJzAnICsgaGV4U3RyaW5nXG4gIH1cbiAgcmV0dXJuIHVpbnQ4QXJyYXlGcm9tU3RyaW5nKGhleFN0cmluZywgJ2Jhc2UxNicpXG59XG5cbmZ1bmN0aW9uIHZhcmludFVpbnQ4QXJyYXlFbmNvZGUgKGlucHV0KSB7XG4gIHJldHVybiBVaW50OEFycmF5LmZyb20odmFyaW50LmVuY29kZSh1aW50OEFycmF5VG9OdW1iZXIoaW5wdXQpKSlcbn1cblxuZnVuY3Rpb24gdmFyaW50RW5jb2RlIChudW0pIHtcbiAgcmV0dXJuIFVpbnQ4QXJyYXkuZnJvbSh2YXJpbnQuZW5jb2RlKG51bSkpXG59XG4iLCIndXNlIHN0cmljdCdcblxuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL2dlbmVyYXRlZC10eXBlcycpLk5hbWVVaW50OEFycmF5TWFwfSBOYW1lVWludDhBcnJheU1hcCAqL1xuXG5jb25zdCB7IGJhc2VUYWJsZSB9ID0gcmVxdWlyZSgnLi9iYXNlLXRhYmxlJylcbmNvbnN0IHZhcmludEVuY29kZSA9IHJlcXVpcmUoJy4vdXRpbCcpLnZhcmludEVuY29kZVxuXG5jb25zdCB2YXJpbnRUYWJsZSA9IC8qKiBAdHlwZSB7TmFtZVVpbnQ4QXJyYXlNYXB9ICovICh7fSlcblxuZm9yIChjb25zdCBlbmNvZGluZ05hbWUgaW4gYmFzZVRhYmxlKSB7XG4gIGNvbnN0IGNvZGUgPSBiYXNlVGFibGVbZW5jb2RpbmdOYW1lXVxuICB2YXJpbnRUYWJsZVtlbmNvZGluZ05hbWVdID0gdmFyaW50RW5jb2RlKGNvZGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh2YXJpbnRUYWJsZSlcbiIsIi8vIEB0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5jb25zdCB7IEJ1ZmZlciB9ID0gcmVxdWlyZSgnYnVmZmVyJylcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb2RlY1xuICogQHByb3BlcnR5IHtmdW5jdGlvbihVaW50OEFycmF5KTpzdHJpbmd9IGVuY29kZVxuICogQHByb3BlcnR5IHtmdW5jdGlvbihzdHJpbmcpOlVpbnQ4QXJyYXl9IGRlY29kZVxuICpcbiAqIEB0eXBlZGVmIHtmdW5jdGlvbihzdHJpbmcpOkNvZGVjfSBDb2RlY0ZhY3RvcnlcbiAqL1xuXG5jbGFzcyBCYXNlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gICAqIEBwYXJhbSB7Q29kZWNGYWN0b3J5fSBpbXBsZW1lbnRhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gYWxwaGFiZXRcbiAgICovXG4gIGNvbnN0cnVjdG9yIChuYW1lLCBjb2RlLCBpbXBsZW1lbnRhdGlvbiwgYWxwaGFiZXQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdGhpcy5jb2RlID0gY29kZVxuICAgIHRoaXMuY29kZUJ1ZiA9IEJ1ZmZlci5mcm9tKHRoaXMuY29kZSlcbiAgICB0aGlzLmFscGhhYmV0ID0gYWxwaGFiZXRcbiAgICB0aGlzLmVuZ2luZSA9IGltcGxlbWVudGF0aW9uKGFscGhhYmV0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBlbmNvZGUgKGJ1Zikge1xuICAgIHJldHVybiB0aGlzLmVuZ2luZS5lbmNvZGUoYnVmKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAgICogQHJldHVybnMge1VpbnQ4QXJyYXl9XG4gICAqL1xuICBkZWNvZGUgKHN0cmluZykge1xuICAgIGZvciAoY29uc3QgY2hhciBvZiBzdHJpbmcpIHtcbiAgICAgIGlmICh0aGlzLmFscGhhYmV0ICYmIHRoaXMuYWxwaGFiZXQuaW5kZXhPZihjaGFyKSA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGNoYXJhY3RlciAnJHtjaGFyfScgaW4gJyR7c3RyaW5nfSdgKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbmdpbmUuZGVjb2RlKHN0cmluZylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VcbiIsIi8vIEB0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGJhc2VYID0gcmVxdWlyZSgnYmFzZS14JylcbmNvbnN0IEJhc2UgPSByZXF1aXJlKCcuL2Jhc2UuanMnKVxuY29uc3QgcmZjNDY0OCA9IHJlcXVpcmUoJy4vcmZjNDY0OCcpXG5jb25zdCB7IGRlY29kZVRleHQsIGVuY29kZVRleHQgfSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5cbmNvbnN0IGlkZW50aXR5ID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGVuY29kZTogZGVjb2RlVGV4dCxcbiAgICBkZWNvZGU6IGVuY29kZVRleHRcbiAgfVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL2Jhc2UnKS5Db2RlY0ZhY3Rvcnl9IENvZGVjRmFjdG9yeVxuICpcbiAqIG5hbWUsIGNvZGUsIGltcGxlbWVudGF0aW9uLCBhbHBoYWJldFxuICogQHR5cGUge0FycmF5PFtzdHJpbmcsIHN0cmluZywgQ29kZWNGYWN0b3J5LCBzdHJpbmddPn1cbiAqL1xuY29uc3QgY29uc3RhbnRzID0gW1xuICBbJ2lkZW50aXR5JywgJ1xceDAwJywgaWRlbnRpdHksICcnXSxcbiAgWydiYXNlMicsICcwJywgcmZjNDY0OCgxKSwgJzAxJ10sXG4gIFsnYmFzZTgnLCAnNycsIHJmYzQ2NDgoMyksICcwMTIzNDU2NyddLFxuICBbJ2Jhc2UxMCcsICc5JywgYmFzZVgsICcwMTIzNDU2Nzg5J10sXG4gIFsnYmFzZTE2JywgJ2YnLCByZmM0NjQ4KDQpLCAnMDEyMzQ1Njc4OWFiY2RlZiddLFxuICBbJ2Jhc2UxNnVwcGVyJywgJ0YnLCByZmM0NjQ4KDQpLCAnMDEyMzQ1Njc4OUFCQ0RFRiddLFxuICBbJ2Jhc2UzMmhleCcsICd2JywgcmZjNDY0OCg1KSwgJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2J10sXG4gIFsnYmFzZTMyaGV4dXBwZXInLCAnVicsIHJmYzQ2NDgoNSksICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVViddLFxuICBbJ2Jhc2UzMmhleHBhZCcsICd0JywgcmZjNDY0OCg1KSwgJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2PSddLFxuICBbJ2Jhc2UzMmhleHBhZHVwcGVyJywgJ1QnLCByZmM0NjQ4KDUpLCAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVY9J10sXG4gIFsnYmFzZTMyJywgJ2InLCByZmM0NjQ4KDUpLCAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoyMzQ1NjcnXSxcbiAgWydiYXNlMzJ1cHBlcicsICdCJywgcmZjNDY0OCg1KSwgJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMjM0NTY3J10sXG4gIFsnYmFzZTMycGFkJywgJ2MnLCByZmM0NjQ4KDUpLCAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoyMzQ1Njc9J10sXG4gIFsnYmFzZTMycGFkdXBwZXInLCAnQycsIHJmYzQ2NDgoNSksICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjIzNDU2Nz0nXSxcbiAgWydiYXNlMzJ6JywgJ2gnLCByZmM0NjQ4KDUpLCAneWJuZHJmZzhlamttY3BxeG90MXV3aXN6YTM0NWg3NjknXSxcbiAgWydiYXNlMzYnLCAnaycsIGJhc2VYLCAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J10sXG4gIFsnYmFzZTM2dXBwZXInLCAnSycsIGJhc2VYLCAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJ10sXG4gIFsnYmFzZTU4YnRjJywgJ3onLCBiYXNlWCwgJzEyMzQ1Njc4OUFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWmFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXonXSxcbiAgWydiYXNlNThmbGlja3InLCAnWicsIGJhc2VYLCAnMTIzNDU2Nzg5YWJjZGVmZ2hpamttbm9wcXJzdHV2d3h5ekFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWiddLFxuICBbJ2Jhc2U2NCcsICdtJywgcmZjNDY0OCg2KSwgJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXSxcbiAgWydiYXNlNjRwYWQnLCAnTScsIHJmYzQ2NDgoNiksICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSddLFxuICBbJ2Jhc2U2NHVybCcsICd1JywgcmZjNDY0OCg2KSwgJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV8nXSxcbiAgWydiYXNlNjR1cmxwYWQnLCAnVScsIHJmYzQ2NDgoNiksICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fPSddXG5dXG5cbmNvbnN0IG5hbWVzID0gY29uc3RhbnRzLnJlZHVjZSgocHJldiwgdHVwcGxlKSA9PiB7XG4gIHByZXZbdHVwcGxlWzBdXSA9IG5ldyBCYXNlKHR1cHBsZVswXSwgdHVwcGxlWzFdLCB0dXBwbGVbMl0sIHR1cHBsZVszXSlcbiAgcmV0dXJuIHByZXZcbn0sIHt9KVxuXG5jb25zdCBjb2RlcyA9IGNvbnN0YW50cy5yZWR1Y2UoKHByZXYsIHR1cHBsZSkgPT4ge1xuICBwcmV2W3R1cHBsZVsxXV0gPSBuYW1lc1t0dXBwbGVbMF1dXG4gIHJldHVybiBwcmV2XG59LCB7fSlcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWVzLFxuICBjb2Rlc1xufVxuIiwiLy8gQHRzLWNoZWNrXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBbbXVsdGliYXNlXShodHRwczovL2dpdGh1Yi5jb20vbXVsdGlmb3JtYXRzL211bHRpYmFzZSkgc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBAbW9kdWxlIE11bHRpYmFzZVxuICovXG4ndXNlIHN0cmljdCdcblxuY29uc3QgeyBCdWZmZXIgfSA9IHJlcXVpcmUoJ2J1ZmZlcicpXG5jb25zdCBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpXG5jb25zdCB7IGRlY29kZVRleHQsIGFzQnVmZmVyIH0gPSByZXF1aXJlKCcuL3V0aWwnKVxuXG4vKiogQHR5cGVkZWYge19faW1wb3J0X18oXCIuL2Jhc2VcIil9IEJhc2UgKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgYnVmZmVyIHdpdGggdGhlIG11bHRpYmFzZSB2YXJpbnQrY29kZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IG5hbWVPckNvZGUgLSBUaGUgbXVsdGliYXNlIG5hbWUgb3IgY29kZSBudW1iZXIuXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiAtIFRoZSBkYXRhIHRvIGJlIHByZWZpeGVkIHdpdGggbXVsdGliYXNlLlxuICogQHJldHVybnMge0J1ZmZlcn1cbiAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGlmIHRoZSBlbmNvZGluZyBpcyBub3Qgc3VwcG9ydGVkXG4gKi9cbmZ1bmN0aW9uIG11bHRpYmFzZSAobmFtZU9yQ29kZSwgYnVmKSB7XG4gIGlmICghYnVmKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdyZXF1aXJlcyBhbiBlbmNvZGVkIGJ1ZmZlcicpXG4gIH1cbiAgY29uc3QgeyBuYW1lLCBjb2RlQnVmIH0gPSBlbmNvZGluZyhuYW1lT3JDb2RlKVxuICB2YWxpZEVuY29kZShuYW1lLCBidWYpXG5cbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKGNvZGVCdWYubGVuZ3RoICsgYnVmLmxlbmd0aClcbiAgYnVmZmVyLnNldChjb2RlQnVmLCAwKVxuICBidWZmZXIuc2V0KGJ1ZiwgY29kZUJ1Zi5sZW5ndGgpXG5cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG4vKipcbiAqIEVuY29kZSBkYXRhIHdpdGggdGhlIHNwZWNpZmllZCBiYXNlIGFuZCBhZGQgdGhlIG11bHRpYmFzZSBwcmVmaXguXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBuYW1lT3JDb2RlIC0gVGhlIG11bHRpYmFzZSBuYW1lIG9yIGNvZGUgbnVtYmVyLlxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgLSBUaGUgZGF0YSB0byBiZSBlbmNvZGVkLlxuICogQHJldHVybnMge0J1ZmZlcn1cbiAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGlmIHRoZSBlbmNvZGluZyBpcyBub3Qgc3VwcG9ydGVkXG4gKlxuICovXG5mdW5jdGlvbiBlbmNvZGUgKG5hbWVPckNvZGUsIGJ1Zikge1xuICBjb25zdCBlbmMgPSBlbmNvZGluZyhuYW1lT3JDb2RlKVxuXG4gIHJldHVybiBCdWZmZXIuY29uY2F0KFtlbmMuY29kZUJ1ZiwgQnVmZmVyLmZyb20oZW5jLmVuY29kZShidWYpKV0pXG59XG5cbi8qKlxuICogVGFrZXMgYSBVaW50OEFycmF5IG9yIHN0cmluZyBlbmNvZGVkIHdpdGggbXVsdGliYXNlIGhlYWRlciwgZGVjb2RlcyBpdCBhbmRcbiAqIHJldHVybnMgdGhlIGRlY29kZWQgYnVmZmVyXG4gKlxuICogQHBhcmFtIHtVaW50OEFycmF5fHN0cmluZ30gZGF0YVxuICogQHJldHVybnMge0J1ZmZlcn1cbiAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGlmIHRoZSBlbmNvZGluZyBpcyBub3Qgc3VwcG9ydGVkXG4gKlxuICovXG5mdW5jdGlvbiBkZWNvZGUgKGRhdGEpIHtcbiAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhkYXRhKSkge1xuICAgIGRhdGEgPSBkZWNvZGVUZXh0KGRhdGEpXG4gIH1cbiAgY29uc3QgcHJlZml4ID0gZGF0YVswXVxuXG4gIC8vIE1ha2UgYWxsIGVuY29kaW5ncyBjYXNlLWluc2Vuc2l0aXZlIGV4Y2VwdCB0aGUgb25lcyB0aGF0IGluY2x1ZGUgdXBwZXIgYW5kIGxvd2VyIGNoYXJzIGluIHRoZSBhbHBoYWJldFxuICBpZiAoWydmJywgJ0YnLCAndicsICdWJywgJ3QnLCAnVCcsICdiJywgJ0InLCAnYycsICdDJywgJ2gnLCAnaycsICdLJ10uaW5jbHVkZXMocHJlZml4KSkge1xuICAgIGRhdGEgPSBkYXRhLnRvTG93ZXJDYXNlKClcbiAgfVxuICBjb25zdCBlbmMgPSBlbmNvZGluZyhkYXRhWzBdKVxuICByZXR1cm4gYXNCdWZmZXIoZW5jLmRlY29kZShkYXRhLnN1YnN0cmluZygxKSkpXG59XG5cbi8qKlxuICogSXMgdGhlIGdpdmVuIGRhdGEgbXVsdGliYXNlIGVuY29kZWQ/XG4gKlxuICogQHBhcmFtIHtVaW50OEFycmF5fHN0cmluZ30gZGF0YVxuICogQHJldHVybnMge2ZhbHNlfHN0cmluZ31cbiAqL1xuZnVuY3Rpb24gaXNFbmNvZGVkIChkYXRhKSB7XG4gIGlmIChkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgIGRhdGEgPSBkZWNvZGVUZXh0KGRhdGEpXG4gIH1cblxuICAvLyBFbnN1cmUgYnVmT3JTdHJpbmcgaXMgYSBzdHJpbmdcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRhKSAhPT0gJ1tvYmplY3QgU3RyaW5nXScpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgZW5jID0gZW5jb2RpbmcoZGF0YVswXSlcbiAgICByZXR1cm4gZW5jLm5hbWVcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBlbmNvZGVkIGRhdGFcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHRocm93cyB7RXJyb3J9IFdpbGwgdGhyb3cgaWYgdGhlIGVuY29kaW5nIGlzIG5vdCBzdXBwb3J0ZWRcbiAqL1xuZnVuY3Rpb24gdmFsaWRFbmNvZGUgKG5hbWUsIGJ1Zikge1xuICBjb25zdCBlbmMgPSBlbmNvZGluZyhuYW1lKVxuICBlbmMuZGVjb2RlKGRlY29kZVRleHQoYnVmKSlcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGVuY29kaW5nIGJ5IG5hbWUgb3IgY29kZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gbmFtZU9yQ29kZVxuICogQHJldHVybnMge0Jhc2V9XG4gKiBAdGhyb3dzIHtFcnJvcn0gV2lsbCB0aHJvdyBpZiB0aGUgZW5jb2RpbmcgaXMgbm90IHN1cHBvcnRlZFxuICovXG5mdW5jdGlvbiBlbmNvZGluZyAobmFtZU9yQ29kZSkge1xuICBpZiAoY29uc3RhbnRzLm5hbWVzW25hbWVPckNvZGVdKSB7XG4gICAgcmV0dXJuIGNvbnN0YW50cy5uYW1lc1tuYW1lT3JDb2RlXVxuICB9IGVsc2UgaWYgKGNvbnN0YW50cy5jb2Rlc1tuYW1lT3JDb2RlXSkge1xuICAgIHJldHVybiBjb25zdGFudHMuY29kZXNbbmFtZU9yQ29kZV1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGVuY29kaW5nOiAke25hbWVPckNvZGV9YClcbiAgfVxufVxuXG4vKipcbiAqIEdldCBlbmNvZGluZyBmcm9tIGRhdGFcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xVaW50OEFycmF5fSBkYXRhXG4gKiBAcmV0dXJucyB7QmFzZX1cbiAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGlmIHRoZSBlbmNvZGluZyBpcyBub3Qgc3VwcG9ydGVkXG4gKi9cbmZ1bmN0aW9uIGVuY29kaW5nRnJvbURhdGEgKGRhdGEpIHtcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgZGF0YSA9IGRlY29kZVRleHQoZGF0YSlcbiAgfVxuXG4gIHJldHVybiBlbmNvZGluZyhkYXRhWzBdKVxufVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBtdWx0aWJhc2VcbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlXG5leHBvcnRzLmRlY29kZSA9IGRlY29kZVxuZXhwb3J0cy5pc0VuY29kZWQgPSBpc0VuY29kZWRcbmV4cG9ydHMuZW5jb2RpbmcgPSBlbmNvZGluZ1xuZXhwb3J0cy5lbmNvZGluZ0Zyb21EYXRhID0gZW5jb2RpbmdGcm9tRGF0YVxuZXhwb3J0cy5uYW1lcyA9IE9iamVjdC5mcmVlemUoY29uc3RhbnRzLm5hbWVzKVxuZXhwb3J0cy5jb2RlcyA9IE9iamVjdC5mcmVlemUoY29uc3RhbnRzLmNvZGVzKVxuIiwiLy8gQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuLyoqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCcuL2Jhc2UnKS5Db2RlY0ZhY3Rvcnl9IENvZGVjRmFjdG9yeSAqL1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBhbHBoYWJldFxuICogQHBhcmFtIHtudW1iZXJ9IGJpdHNQZXJDaGFyXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAqL1xuY29uc3QgZGVjb2RlID0gKHN0cmluZywgYWxwaGFiZXQsIGJpdHNQZXJDaGFyKSA9PiB7XG4gIC8vIEJ1aWxkIHRoZSBjaGFyYWN0ZXIgbG9va3VwIHRhYmxlOlxuICBjb25zdCBjb2RlcyA9IHt9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxwaGFiZXQubGVuZ3RoOyArK2kpIHtcbiAgICBjb2Rlc1thbHBoYWJldFtpXV0gPSBpXG4gIH1cblxuICAvLyBDb3VudCB0aGUgcGFkZGluZyBieXRlczpcbiAgbGV0IGVuZCA9IHN0cmluZy5sZW5ndGhcbiAgd2hpbGUgKHN0cmluZ1tlbmQgLSAxXSA9PT0gJz0nKSB7XG4gICAgLS1lbmRcbiAgfVxuXG4gIC8vIEFsbG9jYXRlIHRoZSBvdXRwdXQ6XG4gIGNvbnN0IG91dCA9IG5ldyBVaW50OEFycmF5KChlbmQgKiBiaXRzUGVyQ2hhciAvIDgpIHwgMClcblxuICAvLyBQYXJzZSB0aGUgZGF0YTpcbiAgbGV0IGJpdHMgPSAwIC8vIE51bWJlciBvZiBiaXRzIGN1cnJlbnRseSBpbiB0aGUgYnVmZmVyXG4gIGxldCBidWZmZXIgPSAwIC8vIEJpdHMgd2FpdGluZyB0byBiZSB3cml0dGVuIG91dCwgTVNCIGZpcnN0XG4gIGxldCB3cml0dGVuID0gMCAvLyBOZXh0IGJ5dGUgdG8gd3JpdGVcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmQ7ICsraSkge1xuICAgIC8vIFJlYWQgb25lIGNoYXJhY3RlciBmcm9tIHRoZSBzdHJpbmc6XG4gICAgY29uc3QgdmFsdWUgPSBjb2Rlc1tzdHJpbmdbaV1dXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgJyArIHN0cmluZ1tpXSlcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgdGhlIGJpdHMgdG8gdGhlIGJ1ZmZlcjpcbiAgICBidWZmZXIgPSAoYnVmZmVyIDw8IGJpdHNQZXJDaGFyKSB8IHZhbHVlXG4gICAgYml0cyArPSBiaXRzUGVyQ2hhclxuXG4gICAgLy8gV3JpdGUgb3V0IHNvbWUgYml0cyBpZiB0aGUgYnVmZmVyIGhhcyBhIGJ5dGUncyB3b3J0aDpcbiAgICBpZiAoYml0cyA+PSA4KSB7XG4gICAgICBiaXRzIC09IDhcbiAgICAgIG91dFt3cml0dGVuKytdID0gMHhmZiAmIChidWZmZXIgPj4gYml0cylcbiAgICB9XG4gIH1cblxuICAvLyBWZXJpZnkgdGhhdCB3ZSBoYXZlIHJlY2VpdmVkIGp1c3QgZW5vdWdoIGJpdHM6XG4gIGlmIChiaXRzID49IGJpdHNQZXJDaGFyIHx8IDB4ZmYgJiAoYnVmZmVyIDw8ICg4IC0gYml0cykpKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIGVuZCBvZiBkYXRhJylcbiAgfVxuXG4gIHJldHVybiBvdXRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGRhdGFcbiAqIEBwYXJhbSB7c3RyaW5nfSBhbHBoYWJldFxuICogQHBhcmFtIHtudW1iZXJ9IGJpdHNQZXJDaGFyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBlbmNvZGUgPSAoZGF0YSwgYWxwaGFiZXQsIGJpdHNQZXJDaGFyKSA9PiB7XG4gIGNvbnN0IHBhZCA9IGFscGhhYmV0W2FscGhhYmV0Lmxlbmd0aCAtIDFdID09PSAnPSdcbiAgY29uc3QgbWFzayA9ICgxIDw8IGJpdHNQZXJDaGFyKSAtIDFcbiAgbGV0IG91dCA9ICcnXG5cbiAgbGV0IGJpdHMgPSAwIC8vIE51bWJlciBvZiBiaXRzIGN1cnJlbnRseSBpbiB0aGUgYnVmZmVyXG4gIGxldCBidWZmZXIgPSAwIC8vIEJpdHMgd2FpdGluZyB0byBiZSB3cml0dGVuIG91dCwgTVNCIGZpcnN0XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgIC8vIFNsdXJwIGRhdGEgaW50byB0aGUgYnVmZmVyOlxuICAgIGJ1ZmZlciA9IChidWZmZXIgPDwgOCkgfCBkYXRhW2ldXG4gICAgYml0cyArPSA4XG5cbiAgICAvLyBXcml0ZSBvdXQgYXMgbXVjaCBhcyB3ZSBjYW46XG4gICAgd2hpbGUgKGJpdHMgPiBiaXRzUGVyQ2hhcikge1xuICAgICAgYml0cyAtPSBiaXRzUGVyQ2hhclxuICAgICAgb3V0ICs9IGFscGhhYmV0W21hc2sgJiAoYnVmZmVyID4+IGJpdHMpXVxuICAgIH1cbiAgfVxuXG4gIC8vIFBhcnRpYWwgY2hhcmFjdGVyOlxuICBpZiAoYml0cykge1xuICAgIG91dCArPSBhbHBoYWJldFttYXNrICYgKGJ1ZmZlciA8PCAoYml0c1BlckNoYXIgLSBiaXRzKSldXG4gIH1cblxuICAvLyBBZGQgcGFkZGluZyBjaGFyYWN0ZXJzIHVudGlsIHdlIGhpdCBhIGJ5dGUgYm91bmRhcnk6XG4gIGlmIChwYWQpIHtcbiAgICB3aGlsZSAoKG91dC5sZW5ndGggKiBiaXRzUGVyQ2hhcikgJiA3KSB7XG4gICAgICBvdXQgKz0gJz0nXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dFxufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRzUGVyQ2hhclxuICogQHJldHVybnMge0NvZGVjRmFjdG9yeX1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoYml0c1BlckNoYXIpID0+IChhbHBoYWJldCkgPT4ge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VWludDhBcnJheX0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGVuY29kZSAoaW5wdXQpIHtcbiAgICAgIHJldHVybiBlbmNvZGUoaW5wdXQsIGFscGhhYmV0LCBiaXRzUGVyQ2hhcilcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICAgICAqL1xuICAgIGRlY29kZSAoaW5wdXQpIHtcbiAgICAgIHJldHVybiBkZWNvZGUoaW5wdXQsIGFscGhhYmV0LCBiaXRzUGVyQ2hhcilcbiAgICB9XG4gIH1cbn1cbiIsIi8vIEB0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgQnVmZmVyIH0gPSByZXF1aXJlKCdidWZmZXInKVxuY29uc3QgeyBUZXh0RW5jb2RlciwgVGV4dERlY29kZXIgfSA9IHJlcXVpcmUoJ3dlYi1lbmNvZGluZycpXG5cbmNvbnN0IHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKClcbi8qKlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlclZpZXd8QXJyYXlCdWZmZXJ9IGJ5dGVzXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBkZWNvZGVUZXh0ID0gKGJ5dGVzKSA9PiB0ZXh0RGVjb2Rlci5kZWNvZGUoYnl0ZXMpXG5cbmNvbnN0IHRleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKClcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxuICovXG5jb25zdCBlbmNvZGVUZXh0ID0gKHRleHQpID0+IHRleHRFbmNvZGVyLmVuY29kZSh0ZXh0KVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJWaWV3fSBieXRlc1xuICogQHJldHVybnMge0J1ZmZlcn1cbiAqL1xuY29uc3QgYXNCdWZmZXIgPSAoeyBidWZmZXIsIGJ5dGVMZW5ndGgsIGJ5dGVPZmZzZXQgfSkgPT5cbiAgQnVmZmVyLmZyb20oYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgZGVjb2RlVGV4dCwgZW5jb2RlVGV4dCwgYXNCdWZmZXIgfVxuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBvZmYgKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBuYW1lcyA9IE9iamVjdC5mcmVlemUoe1xuICAnaWRlbnRpdHknOiAweDAwLFxuICAnc2hhMSc6IDB4MTEsXG4gICdzaGEyLTI1Nic6IDB4MTIsXG4gICdzaGEyLTUxMic6IDB4MTMsXG4gICdzaGEzLTUxMic6IDB4MTQsXG4gICdzaGEzLTM4NCc6IDB4MTUsXG4gICdzaGEzLTI1Nic6IDB4MTYsXG4gICdzaGEzLTIyNCc6IDB4MTcsXG4gICdzaGFrZS0xMjgnOiAweDE4LFxuICAnc2hha2UtMjU2JzogMHgxOSxcbiAgJ2tlY2Nhay0yMjQnOiAweDFhLFxuICAna2VjY2FrLTI1Nic6IDB4MWIsXG4gICdrZWNjYWstMzg0JzogMHgxYyxcbiAgJ2tlY2Nhay01MTInOiAweDFkLFxuICAnYmxha2UzJzogMHgxZSxcbiAgJ211cm11cjMtMTI4JzogMHgyMixcbiAgJ211cm11cjMtMzInOiAweDIzLFxuICAnZGJsLXNoYTItMjU2JzogMHg1NixcbiAgJ21kNCc6IDB4ZDQsXG4gICdtZDUnOiAweGQ1LFxuICAnYm10JzogMHhkNixcbiAgJ3NoYTItMjU2LXRydW5jMjU0LXBhZGRlZCc6IDB4MTAxMixcbiAgJ3JpcGVtZC0xMjgnOiAweDEwNTIsXG4gICdyaXBlbWQtMTYwJzogMHgxMDUzLFxuICAncmlwZW1kLTI1Nic6IDB4MTA1NCxcbiAgJ3JpcGVtZC0zMjAnOiAweDEwNTUsXG4gICd4MTEnOiAweDExMDAsXG4gICdzbTMtMjU2JzogMHg1MzRkLFxuICAnYmxha2UyYi04JzogMHhiMjAxLFxuICAnYmxha2UyYi0xNic6IDB4YjIwMixcbiAgJ2JsYWtlMmItMjQnOiAweGIyMDMsXG4gICdibGFrZTJiLTMyJzogMHhiMjA0LFxuICAnYmxha2UyYi00MCc6IDB4YjIwNSxcbiAgJ2JsYWtlMmItNDgnOiAweGIyMDYsXG4gICdibGFrZTJiLTU2JzogMHhiMjA3LFxuICAnYmxha2UyYi02NCc6IDB4YjIwOCxcbiAgJ2JsYWtlMmItNzInOiAweGIyMDksXG4gICdibGFrZTJiLTgwJzogMHhiMjBhLFxuICAnYmxha2UyYi04OCc6IDB4YjIwYixcbiAgJ2JsYWtlMmItOTYnOiAweGIyMGMsXG4gICdibGFrZTJiLTEwNCc6IDB4YjIwZCxcbiAgJ2JsYWtlMmItMTEyJzogMHhiMjBlLFxuICAnYmxha2UyYi0xMjAnOiAweGIyMGYsXG4gICdibGFrZTJiLTEyOCc6IDB4YjIxMCxcbiAgJ2JsYWtlMmItMTM2JzogMHhiMjExLFxuICAnYmxha2UyYi0xNDQnOiAweGIyMTIsXG4gICdibGFrZTJiLTE1Mic6IDB4YjIxMyxcbiAgJ2JsYWtlMmItMTYwJzogMHhiMjE0LFxuICAnYmxha2UyYi0xNjgnOiAweGIyMTUsXG4gICdibGFrZTJiLTE3Nic6IDB4YjIxNixcbiAgJ2JsYWtlMmItMTg0JzogMHhiMjE3LFxuICAnYmxha2UyYi0xOTInOiAweGIyMTgsXG4gICdibGFrZTJiLTIwMCc6IDB4YjIxOSxcbiAgJ2JsYWtlMmItMjA4JzogMHhiMjFhLFxuICAnYmxha2UyYi0yMTYnOiAweGIyMWIsXG4gICdibGFrZTJiLTIyNCc6IDB4YjIxYyxcbiAgJ2JsYWtlMmItMjMyJzogMHhiMjFkLFxuICAnYmxha2UyYi0yNDAnOiAweGIyMWUsXG4gICdibGFrZTJiLTI0OCc6IDB4YjIxZixcbiAgJ2JsYWtlMmItMjU2JzogMHhiMjIwLFxuICAnYmxha2UyYi0yNjQnOiAweGIyMjEsXG4gICdibGFrZTJiLTI3Mic6IDB4YjIyMixcbiAgJ2JsYWtlMmItMjgwJzogMHhiMjIzLFxuICAnYmxha2UyYi0yODgnOiAweGIyMjQsXG4gICdibGFrZTJiLTI5Nic6IDB4YjIyNSxcbiAgJ2JsYWtlMmItMzA0JzogMHhiMjI2LFxuICAnYmxha2UyYi0zMTInOiAweGIyMjcsXG4gICdibGFrZTJiLTMyMCc6IDB4YjIyOCxcbiAgJ2JsYWtlMmItMzI4JzogMHhiMjI5LFxuICAnYmxha2UyYi0zMzYnOiAweGIyMmEsXG4gICdibGFrZTJiLTM0NCc6IDB4YjIyYixcbiAgJ2JsYWtlMmItMzUyJzogMHhiMjJjLFxuICAnYmxha2UyYi0zNjAnOiAweGIyMmQsXG4gICdibGFrZTJiLTM2OCc6IDB4YjIyZSxcbiAgJ2JsYWtlMmItMzc2JzogMHhiMjJmLFxuICAnYmxha2UyYi0zODQnOiAweGIyMzAsXG4gICdibGFrZTJiLTM5Mic6IDB4YjIzMSxcbiAgJ2JsYWtlMmItNDAwJzogMHhiMjMyLFxuICAnYmxha2UyYi00MDgnOiAweGIyMzMsXG4gICdibGFrZTJiLTQxNic6IDB4YjIzNCxcbiAgJ2JsYWtlMmItNDI0JzogMHhiMjM1LFxuICAnYmxha2UyYi00MzInOiAweGIyMzYsXG4gICdibGFrZTJiLTQ0MCc6IDB4YjIzNyxcbiAgJ2JsYWtlMmItNDQ4JzogMHhiMjM4LFxuICAnYmxha2UyYi00NTYnOiAweGIyMzksXG4gICdibGFrZTJiLTQ2NCc6IDB4YjIzYSxcbiAgJ2JsYWtlMmItNDcyJzogMHhiMjNiLFxuICAnYmxha2UyYi00ODAnOiAweGIyM2MsXG4gICdibGFrZTJiLTQ4OCc6IDB4YjIzZCxcbiAgJ2JsYWtlMmItNDk2JzogMHhiMjNlLFxuICAnYmxha2UyYi01MDQnOiAweGIyM2YsXG4gICdibGFrZTJiLTUxMic6IDB4YjI0MCxcbiAgJ2JsYWtlMnMtOCc6IDB4YjI0MSxcbiAgJ2JsYWtlMnMtMTYnOiAweGIyNDIsXG4gICdibGFrZTJzLTI0JzogMHhiMjQzLFxuICAnYmxha2Uycy0zMic6IDB4YjI0NCxcbiAgJ2JsYWtlMnMtNDAnOiAweGIyNDUsXG4gICdibGFrZTJzLTQ4JzogMHhiMjQ2LFxuICAnYmxha2Uycy01Nic6IDB4YjI0NyxcbiAgJ2JsYWtlMnMtNjQnOiAweGIyNDgsXG4gICdibGFrZTJzLTcyJzogMHhiMjQ5LFxuICAnYmxha2Uycy04MCc6IDB4YjI0YSxcbiAgJ2JsYWtlMnMtODgnOiAweGIyNGIsXG4gICdibGFrZTJzLTk2JzogMHhiMjRjLFxuICAnYmxha2Uycy0xMDQnOiAweGIyNGQsXG4gICdibGFrZTJzLTExMic6IDB4YjI0ZSxcbiAgJ2JsYWtlMnMtMTIwJzogMHhiMjRmLFxuICAnYmxha2Uycy0xMjgnOiAweGIyNTAsXG4gICdibGFrZTJzLTEzNic6IDB4YjI1MSxcbiAgJ2JsYWtlMnMtMTQ0JzogMHhiMjUyLFxuICAnYmxha2Uycy0xNTInOiAweGIyNTMsXG4gICdibGFrZTJzLTE2MCc6IDB4YjI1NCxcbiAgJ2JsYWtlMnMtMTY4JzogMHhiMjU1LFxuICAnYmxha2Uycy0xNzYnOiAweGIyNTYsXG4gICdibGFrZTJzLTE4NCc6IDB4YjI1NyxcbiAgJ2JsYWtlMnMtMTkyJzogMHhiMjU4LFxuICAnYmxha2Uycy0yMDAnOiAweGIyNTksXG4gICdibGFrZTJzLTIwOCc6IDB4YjI1YSxcbiAgJ2JsYWtlMnMtMjE2JzogMHhiMjViLFxuICAnYmxha2Uycy0yMjQnOiAweGIyNWMsXG4gICdibGFrZTJzLTIzMic6IDB4YjI1ZCxcbiAgJ2JsYWtlMnMtMjQwJzogMHhiMjVlLFxuICAnYmxha2Uycy0yNDgnOiAweGIyNWYsXG4gICdibGFrZTJzLTI1Nic6IDB4YjI2MCxcbiAgJ3NrZWluMjU2LTgnOiAweGIzMDEsXG4gICdza2VpbjI1Ni0xNic6IDB4YjMwMixcbiAgJ3NrZWluMjU2LTI0JzogMHhiMzAzLFxuICAnc2tlaW4yNTYtMzInOiAweGIzMDQsXG4gICdza2VpbjI1Ni00MCc6IDB4YjMwNSxcbiAgJ3NrZWluMjU2LTQ4JzogMHhiMzA2LFxuICAnc2tlaW4yNTYtNTYnOiAweGIzMDcsXG4gICdza2VpbjI1Ni02NCc6IDB4YjMwOCxcbiAgJ3NrZWluMjU2LTcyJzogMHhiMzA5LFxuICAnc2tlaW4yNTYtODAnOiAweGIzMGEsXG4gICdza2VpbjI1Ni04OCc6IDB4YjMwYixcbiAgJ3NrZWluMjU2LTk2JzogMHhiMzBjLFxuICAnc2tlaW4yNTYtMTA0JzogMHhiMzBkLFxuICAnc2tlaW4yNTYtMTEyJzogMHhiMzBlLFxuICAnc2tlaW4yNTYtMTIwJzogMHhiMzBmLFxuICAnc2tlaW4yNTYtMTI4JzogMHhiMzEwLFxuICAnc2tlaW4yNTYtMTM2JzogMHhiMzExLFxuICAnc2tlaW4yNTYtMTQ0JzogMHhiMzEyLFxuICAnc2tlaW4yNTYtMTUyJzogMHhiMzEzLFxuICAnc2tlaW4yNTYtMTYwJzogMHhiMzE0LFxuICAnc2tlaW4yNTYtMTY4JzogMHhiMzE1LFxuICAnc2tlaW4yNTYtMTc2JzogMHhiMzE2LFxuICAnc2tlaW4yNTYtMTg0JzogMHhiMzE3LFxuICAnc2tlaW4yNTYtMTkyJzogMHhiMzE4LFxuICAnc2tlaW4yNTYtMjAwJzogMHhiMzE5LFxuICAnc2tlaW4yNTYtMjA4JzogMHhiMzFhLFxuICAnc2tlaW4yNTYtMjE2JzogMHhiMzFiLFxuICAnc2tlaW4yNTYtMjI0JzogMHhiMzFjLFxuICAnc2tlaW4yNTYtMjMyJzogMHhiMzFkLFxuICAnc2tlaW4yNTYtMjQwJzogMHhiMzFlLFxuICAnc2tlaW4yNTYtMjQ4JzogMHhiMzFmLFxuICAnc2tlaW4yNTYtMjU2JzogMHhiMzIwLFxuICAnc2tlaW41MTItOCc6IDB4YjMyMSxcbiAgJ3NrZWluNTEyLTE2JzogMHhiMzIyLFxuICAnc2tlaW41MTItMjQnOiAweGIzMjMsXG4gICdza2VpbjUxMi0zMic6IDB4YjMyNCxcbiAgJ3NrZWluNTEyLTQwJzogMHhiMzI1LFxuICAnc2tlaW41MTItNDgnOiAweGIzMjYsXG4gICdza2VpbjUxMi01Nic6IDB4YjMyNyxcbiAgJ3NrZWluNTEyLTY0JzogMHhiMzI4LFxuICAnc2tlaW41MTItNzInOiAweGIzMjksXG4gICdza2VpbjUxMi04MCc6IDB4YjMyYSxcbiAgJ3NrZWluNTEyLTg4JzogMHhiMzJiLFxuICAnc2tlaW41MTItOTYnOiAweGIzMmMsXG4gICdza2VpbjUxMi0xMDQnOiAweGIzMmQsXG4gICdza2VpbjUxMi0xMTInOiAweGIzMmUsXG4gICdza2VpbjUxMi0xMjAnOiAweGIzMmYsXG4gICdza2VpbjUxMi0xMjgnOiAweGIzMzAsXG4gICdza2VpbjUxMi0xMzYnOiAweGIzMzEsXG4gICdza2VpbjUxMi0xNDQnOiAweGIzMzIsXG4gICdza2VpbjUxMi0xNTInOiAweGIzMzMsXG4gICdza2VpbjUxMi0xNjAnOiAweGIzMzQsXG4gICdza2VpbjUxMi0xNjgnOiAweGIzMzUsXG4gICdza2VpbjUxMi0xNzYnOiAweGIzMzYsXG4gICdza2VpbjUxMi0xODQnOiAweGIzMzcsXG4gICdza2VpbjUxMi0xOTInOiAweGIzMzgsXG4gICdza2VpbjUxMi0yMDAnOiAweGIzMzksXG4gICdza2VpbjUxMi0yMDgnOiAweGIzM2EsXG4gICdza2VpbjUxMi0yMTYnOiAweGIzM2IsXG4gICdza2VpbjUxMi0yMjQnOiAweGIzM2MsXG4gICdza2VpbjUxMi0yMzInOiAweGIzM2QsXG4gICdza2VpbjUxMi0yNDAnOiAweGIzM2UsXG4gICdza2VpbjUxMi0yNDgnOiAweGIzM2YsXG4gICdza2VpbjUxMi0yNTYnOiAweGIzNDAsXG4gICdza2VpbjUxMi0yNjQnOiAweGIzNDEsXG4gICdza2VpbjUxMi0yNzInOiAweGIzNDIsXG4gICdza2VpbjUxMi0yODAnOiAweGIzNDMsXG4gICdza2VpbjUxMi0yODgnOiAweGIzNDQsXG4gICdza2VpbjUxMi0yOTYnOiAweGIzNDUsXG4gICdza2VpbjUxMi0zMDQnOiAweGIzNDYsXG4gICdza2VpbjUxMi0zMTInOiAweGIzNDcsXG4gICdza2VpbjUxMi0zMjAnOiAweGIzNDgsXG4gICdza2VpbjUxMi0zMjgnOiAweGIzNDksXG4gICdza2VpbjUxMi0zMzYnOiAweGIzNGEsXG4gICdza2VpbjUxMi0zNDQnOiAweGIzNGIsXG4gICdza2VpbjUxMi0zNTInOiAweGIzNGMsXG4gICdza2VpbjUxMi0zNjAnOiAweGIzNGQsXG4gICdza2VpbjUxMi0zNjgnOiAweGIzNGUsXG4gICdza2VpbjUxMi0zNzYnOiAweGIzNGYsXG4gICdza2VpbjUxMi0zODQnOiAweGIzNTAsXG4gICdza2VpbjUxMi0zOTInOiAweGIzNTEsXG4gICdza2VpbjUxMi00MDAnOiAweGIzNTIsXG4gICdza2VpbjUxMi00MDgnOiAweGIzNTMsXG4gICdza2VpbjUxMi00MTYnOiAweGIzNTQsXG4gICdza2VpbjUxMi00MjQnOiAweGIzNTUsXG4gICdza2VpbjUxMi00MzInOiAweGIzNTYsXG4gICdza2VpbjUxMi00NDAnOiAweGIzNTcsXG4gICdza2VpbjUxMi00NDgnOiAweGIzNTgsXG4gICdza2VpbjUxMi00NTYnOiAweGIzNTksXG4gICdza2VpbjUxMi00NjQnOiAweGIzNWEsXG4gICdza2VpbjUxMi00NzInOiAweGIzNWIsXG4gICdza2VpbjUxMi00ODAnOiAweGIzNWMsXG4gICdza2VpbjUxMi00ODgnOiAweGIzNWQsXG4gICdza2VpbjUxMi00OTYnOiAweGIzNWUsXG4gICdza2VpbjUxMi01MDQnOiAweGIzNWYsXG4gICdza2VpbjUxMi01MTInOiAweGIzNjAsXG4gICdza2VpbjEwMjQtOCc6IDB4YjM2MSxcbiAgJ3NrZWluMTAyNC0xNic6IDB4YjM2MixcbiAgJ3NrZWluMTAyNC0yNCc6IDB4YjM2MyxcbiAgJ3NrZWluMTAyNC0zMic6IDB4YjM2NCxcbiAgJ3NrZWluMTAyNC00MCc6IDB4YjM2NSxcbiAgJ3NrZWluMTAyNC00OCc6IDB4YjM2NixcbiAgJ3NrZWluMTAyNC01Nic6IDB4YjM2NyxcbiAgJ3NrZWluMTAyNC02NCc6IDB4YjM2OCxcbiAgJ3NrZWluMTAyNC03Mic6IDB4YjM2OSxcbiAgJ3NrZWluMTAyNC04MCc6IDB4YjM2YSxcbiAgJ3NrZWluMTAyNC04OCc6IDB4YjM2YixcbiAgJ3NrZWluMTAyNC05Nic6IDB4YjM2YyxcbiAgJ3NrZWluMTAyNC0xMDQnOiAweGIzNmQsXG4gICdza2VpbjEwMjQtMTEyJzogMHhiMzZlLFxuICAnc2tlaW4xMDI0LTEyMCc6IDB4YjM2ZixcbiAgJ3NrZWluMTAyNC0xMjgnOiAweGIzNzAsXG4gICdza2VpbjEwMjQtMTM2JzogMHhiMzcxLFxuICAnc2tlaW4xMDI0LTE0NCc6IDB4YjM3MixcbiAgJ3NrZWluMTAyNC0xNTInOiAweGIzNzMsXG4gICdza2VpbjEwMjQtMTYwJzogMHhiMzc0LFxuICAnc2tlaW4xMDI0LTE2OCc6IDB4YjM3NSxcbiAgJ3NrZWluMTAyNC0xNzYnOiAweGIzNzYsXG4gICdza2VpbjEwMjQtMTg0JzogMHhiMzc3LFxuICAnc2tlaW4xMDI0LTE5Mic6IDB4YjM3OCxcbiAgJ3NrZWluMTAyNC0yMDAnOiAweGIzNzksXG4gICdza2VpbjEwMjQtMjA4JzogMHhiMzdhLFxuICAnc2tlaW4xMDI0LTIxNic6IDB4YjM3YixcbiAgJ3NrZWluMTAyNC0yMjQnOiAweGIzN2MsXG4gICdza2VpbjEwMjQtMjMyJzogMHhiMzdkLFxuICAnc2tlaW4xMDI0LTI0MCc6IDB4YjM3ZSxcbiAgJ3NrZWluMTAyNC0yNDgnOiAweGIzN2YsXG4gICdza2VpbjEwMjQtMjU2JzogMHhiMzgwLFxuICAnc2tlaW4xMDI0LTI2NCc6IDB4YjM4MSxcbiAgJ3NrZWluMTAyNC0yNzInOiAweGIzODIsXG4gICdza2VpbjEwMjQtMjgwJzogMHhiMzgzLFxuICAnc2tlaW4xMDI0LTI4OCc6IDB4YjM4NCxcbiAgJ3NrZWluMTAyNC0yOTYnOiAweGIzODUsXG4gICdza2VpbjEwMjQtMzA0JzogMHhiMzg2LFxuICAnc2tlaW4xMDI0LTMxMic6IDB4YjM4NyxcbiAgJ3NrZWluMTAyNC0zMjAnOiAweGIzODgsXG4gICdza2VpbjEwMjQtMzI4JzogMHhiMzg5LFxuICAnc2tlaW4xMDI0LTMzNic6IDB4YjM4YSxcbiAgJ3NrZWluMTAyNC0zNDQnOiAweGIzOGIsXG4gICdza2VpbjEwMjQtMzUyJzogMHhiMzhjLFxuICAnc2tlaW4xMDI0LTM2MCc6IDB4YjM4ZCxcbiAgJ3NrZWluMTAyNC0zNjgnOiAweGIzOGUsXG4gICdza2VpbjEwMjQtMzc2JzogMHhiMzhmLFxuICAnc2tlaW4xMDI0LTM4NCc6IDB4YjM5MCxcbiAgJ3NrZWluMTAyNC0zOTInOiAweGIzOTEsXG4gICdza2VpbjEwMjQtNDAwJzogMHhiMzkyLFxuICAnc2tlaW4xMDI0LTQwOCc6IDB4YjM5MyxcbiAgJ3NrZWluMTAyNC00MTYnOiAweGIzOTQsXG4gICdza2VpbjEwMjQtNDI0JzogMHhiMzk1LFxuICAnc2tlaW4xMDI0LTQzMic6IDB4YjM5NixcbiAgJ3NrZWluMTAyNC00NDAnOiAweGIzOTcsXG4gICdza2VpbjEwMjQtNDQ4JzogMHhiMzk4LFxuICAnc2tlaW4xMDI0LTQ1Nic6IDB4YjM5OSxcbiAgJ3NrZWluMTAyNC00NjQnOiAweGIzOWEsXG4gICdza2VpbjEwMjQtNDcyJzogMHhiMzliLFxuICAnc2tlaW4xMDI0LTQ4MCc6IDB4YjM5YyxcbiAgJ3NrZWluMTAyNC00ODgnOiAweGIzOWQsXG4gICdza2VpbjEwMjQtNDk2JzogMHhiMzllLFxuICAnc2tlaW4xMDI0LTUwNCc6IDB4YjM5ZixcbiAgJ3NrZWluMTAyNC01MTInOiAweGIzYTAsXG4gICdza2VpbjEwMjQtNTIwJzogMHhiM2ExLFxuICAnc2tlaW4xMDI0LTUyOCc6IDB4YjNhMixcbiAgJ3NrZWluMTAyNC01MzYnOiAweGIzYTMsXG4gICdza2VpbjEwMjQtNTQ0JzogMHhiM2E0LFxuICAnc2tlaW4xMDI0LTU1Mic6IDB4YjNhNSxcbiAgJ3NrZWluMTAyNC01NjAnOiAweGIzYTYsXG4gICdza2VpbjEwMjQtNTY4JzogMHhiM2E3LFxuICAnc2tlaW4xMDI0LTU3Nic6IDB4YjNhOCxcbiAgJ3NrZWluMTAyNC01ODQnOiAweGIzYTksXG4gICdza2VpbjEwMjQtNTkyJzogMHhiM2FhLFxuICAnc2tlaW4xMDI0LTYwMCc6IDB4YjNhYixcbiAgJ3NrZWluMTAyNC02MDgnOiAweGIzYWMsXG4gICdza2VpbjEwMjQtNjE2JzogMHhiM2FkLFxuICAnc2tlaW4xMDI0LTYyNCc6IDB4YjNhZSxcbiAgJ3NrZWluMTAyNC02MzInOiAweGIzYWYsXG4gICdza2VpbjEwMjQtNjQwJzogMHhiM2IwLFxuICAnc2tlaW4xMDI0LTY0OCc6IDB4YjNiMSxcbiAgJ3NrZWluMTAyNC02NTYnOiAweGIzYjIsXG4gICdza2VpbjEwMjQtNjY0JzogMHhiM2IzLFxuICAnc2tlaW4xMDI0LTY3Mic6IDB4YjNiNCxcbiAgJ3NrZWluMTAyNC02ODAnOiAweGIzYjUsXG4gICdza2VpbjEwMjQtNjg4JzogMHhiM2I2LFxuICAnc2tlaW4xMDI0LTY5Nic6IDB4YjNiNyxcbiAgJ3NrZWluMTAyNC03MDQnOiAweGIzYjgsXG4gICdza2VpbjEwMjQtNzEyJzogMHhiM2I5LFxuICAnc2tlaW4xMDI0LTcyMCc6IDB4YjNiYSxcbiAgJ3NrZWluMTAyNC03MjgnOiAweGIzYmIsXG4gICdza2VpbjEwMjQtNzM2JzogMHhiM2JjLFxuICAnc2tlaW4xMDI0LTc0NCc6IDB4YjNiZCxcbiAgJ3NrZWluMTAyNC03NTInOiAweGIzYmUsXG4gICdza2VpbjEwMjQtNzYwJzogMHhiM2JmLFxuICAnc2tlaW4xMDI0LTc2OCc6IDB4YjNjMCxcbiAgJ3NrZWluMTAyNC03NzYnOiAweGIzYzEsXG4gICdza2VpbjEwMjQtNzg0JzogMHhiM2MyLFxuICAnc2tlaW4xMDI0LTc5Mic6IDB4YjNjMyxcbiAgJ3NrZWluMTAyNC04MDAnOiAweGIzYzQsXG4gICdza2VpbjEwMjQtODA4JzogMHhiM2M1LFxuICAnc2tlaW4xMDI0LTgxNic6IDB4YjNjNixcbiAgJ3NrZWluMTAyNC04MjQnOiAweGIzYzcsXG4gICdza2VpbjEwMjQtODMyJzogMHhiM2M4LFxuICAnc2tlaW4xMDI0LTg0MCc6IDB4YjNjOSxcbiAgJ3NrZWluMTAyNC04NDgnOiAweGIzY2EsXG4gICdza2VpbjEwMjQtODU2JzogMHhiM2NiLFxuICAnc2tlaW4xMDI0LTg2NCc6IDB4YjNjYyxcbiAgJ3NrZWluMTAyNC04NzInOiAweGIzY2QsXG4gICdza2VpbjEwMjQtODgwJzogMHhiM2NlLFxuICAnc2tlaW4xMDI0LTg4OCc6IDB4YjNjZixcbiAgJ3NrZWluMTAyNC04OTYnOiAweGIzZDAsXG4gICdza2VpbjEwMjQtOTA0JzogMHhiM2QxLFxuICAnc2tlaW4xMDI0LTkxMic6IDB4YjNkMixcbiAgJ3NrZWluMTAyNC05MjAnOiAweGIzZDMsXG4gICdza2VpbjEwMjQtOTI4JzogMHhiM2Q0LFxuICAnc2tlaW4xMDI0LTkzNic6IDB4YjNkNSxcbiAgJ3NrZWluMTAyNC05NDQnOiAweGIzZDYsXG4gICdza2VpbjEwMjQtOTUyJzogMHhiM2Q3LFxuICAnc2tlaW4xMDI0LTk2MCc6IDB4YjNkOCxcbiAgJ3NrZWluMTAyNC05NjgnOiAweGIzZDksXG4gICdza2VpbjEwMjQtOTc2JzogMHhiM2RhLFxuICAnc2tlaW4xMDI0LTk4NCc6IDB4YjNkYixcbiAgJ3NrZWluMTAyNC05OTInOiAweGIzZGMsXG4gICdza2VpbjEwMjQtMTAwMCc6IDB4YjNkZCxcbiAgJ3NrZWluMTAyNC0xMDA4JzogMHhiM2RlLFxuICAnc2tlaW4xMDI0LTEwMTYnOiAweGIzZGYsXG4gICdza2VpbjEwMjQtMTAyNCc6IDB4YjNlMCxcbiAgJ3Bvc2VpZG9uLWJsczEyXzM4MS1hMi1mYzEnOiAweGI0MDEsXG4gICdwb3NlaWRvbi1ibHMxMl8zODEtYTItZmMxLXNjJzogMHhiNDAyXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgbmFtZXMgfVxuIiwiLy8gQHRzLWNoZWNrXG4vKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cbi8qKlxuICogTXVsdGloYXNoIGltcGxlbWVudGF0aW9uIGluIEphdmFTY3JpcHQuXG4gKlxuICogQG1vZHVsZSBtdWx0aWhhc2hcbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgQnVmZmVyIH0gPSByZXF1aXJlKCdidWZmZXInKVxuY29uc3QgbXVsdGliYXNlID0gcmVxdWlyZSgnbXVsdGliYXNlJylcbmNvbnN0IHZhcmludCA9IHJlcXVpcmUoJ3ZhcmludCcpXG5jb25zdCB7IG5hbWVzIH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpXG5jb25zdCB7IFRleHREZWNvZGVyIH0gPSByZXF1aXJlKCd3ZWItZW5jb2RpbmcnKVxuXG5jb25zdCB0ZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpXG5jb25zdCBjb2RlcyA9IHt9XG5cbmZvciAoY29uc3Qga2V5IGluIG5hbWVzKSB7XG4gIGNvZGVzW25hbWVzW2tleV1dID0ga2V5XG59XG5leHBvcnRzLm5hbWVzID0gbmFtZXNcbmV4cG9ydHMuY29kZXMgPSBPYmplY3QuZnJlZXplKGNvZGVzKVxuXG4vKipcbiAqIENvbnZlcnQgdGhlIGdpdmVuIG11bHRpaGFzaCB0byBhIGhleCBlbmNvZGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGhhc2hcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydHMudG9IZXhTdHJpbmcgPSBmdW5jdGlvbiB0b0hleFN0cmluZyAoaGFzaCkge1xuICBpZiAoIShoYXNoIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211c3QgYmUgcGFzc2VkIGEgVWludDhBcnJheScpXG4gIH1cblxuICBjb25zdCBidWZmZXIgPSBCdWZmZXIuaXNCdWZmZXIoaGFzaClcbiAgICA/IGhhc2hcbiAgICA6IEJ1ZmZlci5mcm9tKGhhc2guYnVmZmVyLCBoYXNoLmJ5dGVPZmZzZXQsIGhhc2guYnl0ZUxlbmd0aClcblxuICByZXR1cm4gYnVmZmVyLnRvU3RyaW5nKCdoZXgnKVxufVxuXG4vKipcbiAqIENvbnZlcnQgdGhlIGdpdmVuIGhleCBlbmNvZGVkIHN0cmluZyB0byBhIG11bHRpaGFzaC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaFxuICogQHJldHVybnMge0J1ZmZlcn1cbiAqL1xuZXhwb3J0cy5mcm9tSGV4U3RyaW5nID0gZnVuY3Rpb24gZnJvbUhleFN0cmluZyAoaGFzaCkge1xuICByZXR1cm4gQnVmZmVyLmZyb20oaGFzaCwgJ2hleCcpXG59XG5cbi8qKlxuICogQ29udmVydCB0aGUgZ2l2ZW4gbXVsdGloYXNoIHRvIGEgYmFzZTU4IGVuY29kZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gaGFzaFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0cy50b0I1OFN0cmluZyA9IGZ1bmN0aW9uIHRvQjU4U3RyaW5nIChoYXNoKSB7XG4gIGlmICghKGhhc2ggaW5zdGFuY2VvZiBVaW50OEFycmF5KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignbXVzdCBiZSBwYXNzZWQgYSBVaW50OEFycmF5JylcbiAgfVxuXG4gIHJldHVybiB0ZXh0RGVjb2Rlci5kZWNvZGUobXVsdGliYXNlLmVuY29kZSgnYmFzZTU4YnRjJywgaGFzaCkpLnNsaWNlKDEpXG59XG5cbi8qKlxuICogQ29udmVydCB0aGUgZ2l2ZW4gYmFzZTU4IGVuY29kZWQgc3RyaW5nIHRvIGEgbXVsdGloYXNoLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfFVpbnQ4QXJyYXl9IGhhc2hcbiAqIEByZXR1cm5zIHtCdWZmZXJ9XG4gKi9cbmV4cG9ydHMuZnJvbUI1OFN0cmluZyA9IGZ1bmN0aW9uIGZyb21CNThTdHJpbmcgKGhhc2gpIHtcbiAgY29uc3QgZW5jb2RlZCA9IGhhc2ggaW5zdGFuY2VvZiBVaW50OEFycmF5XG4gICAgPyB0ZXh0RGVjb2Rlci5kZWNvZGUoaGFzaClcbiAgICA6IGhhc2hcblxuICByZXR1cm4gbXVsdGliYXNlLmRlY29kZSgneicgKyBlbmNvZGVkKVxufVxuXG4vKipcbiAqIERlY29kZSBhIGhhc2ggZnJvbSB0aGUgZ2l2ZW4gbXVsdGloYXNoLlxuICpcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnl0ZXNcbiAqIEByZXR1cm5zIHt7Y29kZTogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyLCBkaWdlc3Q6IEJ1ZmZlcn19IHJlc3VsdFxuICovXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZSAoYnl0ZXMpIHtcbiAgaWYgKCEoYnl0ZXMgaW5zdGFuY2VvZiBVaW50OEFycmF5KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignbXVsdGloYXNoIG11c3QgYmUgYSBVaW50OEFycmF5JylcbiAgfVxuICBsZXQgYnVmID0gQnVmZmVyLmlzQnVmZmVyKGJ5dGVzKVxuICAgID8gYnl0ZXNcbiAgICA6IEJ1ZmZlci5mcm9tKGJ5dGVzLmJ1ZmZlciwgYnl0ZXMuYnl0ZU9mZnNldCwgYnl0ZXMuYnl0ZUxlbmd0aClcblxuICBpZiAoYnVmLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpaGFzaCB0b28gc2hvcnQuIG11c3QgYmUgPiAyIGJ5dGVzLicpXG4gIH1cblxuICBjb25zdCBjb2RlID0gdmFyaW50LmRlY29kZShidWYpXG4gIGlmICghZXhwb3J0cy5pc1ZhbGlkQ29kZShjb2RlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgbXVsdGloYXNoIHVua25vd24gZnVuY3Rpb24gY29kZTogMHgke2NvZGUudG9TdHJpbmcoMTYpfWApXG4gIH1cbiAgYnVmID0gYnVmLnNsaWNlKHZhcmludC5kZWNvZGUuYnl0ZXMpXG5cbiAgY29uc3QgbGVuID0gdmFyaW50LmRlY29kZShidWYpXG4gIGlmIChsZW4gPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBtdWx0aWhhc2ggaW52YWxpZCBsZW5ndGg6ICR7bGVufWApXG4gIH1cbiAgYnVmID0gYnVmLnNsaWNlKHZhcmludC5kZWNvZGUuYnl0ZXMpXG5cbiAgaWYgKGJ1Zi5sZW5ndGggIT09IGxlbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgbXVsdGloYXNoIGxlbmd0aCBpbmNvbnNpc3RlbnQ6IDB4JHtidWYudG9TdHJpbmcoJ2hleCcpfWApXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNvZGUsXG4gICAgbmFtZTogY29kZXNbY29kZV0sXG4gICAgbGVuZ3RoOiBsZW4sXG4gICAgZGlnZXN0OiBidWZcbiAgfVxufVxuXG4vKipcbiAqICBFbmNvZGUgYSBoYXNoIGRpZ2VzdCBhbG9uZyB3aXRoIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gY29kZS5cbiAqXG4gKiA+ICoqTm90ZToqKiB0aGUgbGVuZ3RoIGlzIGRlcml2ZWQgZnJvbSB0aGUgbGVuZ3RoIG9mIHRoZSBkaWdlc3QgaXRzZWxmLlxuICpcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gZGlnZXN0XG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGNvZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXVxuICogQHJldHVybnMge0J1ZmZlcn1cbiAqL1xuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUgKGRpZ2VzdCwgY29kZSwgbGVuZ3RoKSB7XG4gIGlmICghZGlnZXN0IHx8IGNvZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbXVsdGloYXNoIGVuY29kZSByZXF1aXJlcyBhdCBsZWFzdCB0d28gYXJnczogZGlnZXN0LCBjb2RlJylcbiAgfVxuXG4gIC8vIGVuc3VyZSBpdCdzIGEgaGFzaGZ1bmN0aW9uIGNvZGUuXG4gIGNvbnN0IGhhc2hmbiA9IGV4cG9ydHMuY29lcmNlQ29kZShjb2RlKVxuXG4gIGlmICghKGRpZ2VzdCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkaWdlc3Qgc2hvdWxkIGJlIGEgVWludDhBcnJheScpXG4gIH1cblxuICBpZiAobGVuZ3RoID09IG51bGwpIHtcbiAgICBsZW5ndGggPSBkaWdlc3QubGVuZ3RoXG4gIH1cblxuICBpZiAobGVuZ3RoICYmIGRpZ2VzdC5sZW5ndGggIT09IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZGlnZXN0IGxlbmd0aCBzaG91bGQgYmUgZXF1YWwgdG8gc3BlY2lmaWVkIGxlbmd0aC4nKVxuICB9XG5cbiAgY29uc3QgaGFzaCA9IHZhcmludC5lbmNvZGUoaGFzaGZuKVxuICBjb25zdCBsZW4gPSB2YXJpbnQuZW5jb2RlKGxlbmd0aClcbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKGhhc2gubGVuZ3RoICsgbGVuLmxlbmd0aCArIGRpZ2VzdC5sZW5ndGgpXG4gIGJ1ZmZlci5zZXQoaGFzaCwgMClcbiAgYnVmZmVyLnNldChsZW4sIGhhc2gubGVuZ3RoKVxuICBidWZmZXIuc2V0KGRpZ2VzdCwgaGFzaC5sZW5ndGggKyBsZW4ubGVuZ3RoKVxuICByZXR1cm4gYnVmZmVyXG59XG5cbi8qKlxuICogQ29udmVydHMgYSBoYXNoIGZ1bmN0aW9uIG5hbWUgaW50byB0aGUgbWF0Y2hpbmcgY29kZS5cbiAqIElmIHBhc3NlZCBhIG51bWJlciBpdCB3aWxsIHJldHVybiB0aGUgbnVtYmVyIGlmIGl0J3MgYSB2YWxpZCBjb2RlLlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBuYW1lXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnRzLmNvZXJjZUNvZGUgPSBmdW5jdGlvbiBjb2VyY2VDb2RlIChuYW1lKSB7XG4gIGxldCBjb2RlID0gbmFtZVxuXG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAobmFtZXNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnJlY29nbml6ZWQgaGFzaCBmdW5jdGlvbiBuYW1lZDogJHtuYW1lfWApXG4gICAgfVxuICAgIGNvZGUgPSBuYW1lc1tuYW1lXVxuICB9XG5cbiAgaWYgKHR5cGVvZiBjb2RlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSGFzaCBmdW5jdGlvbiBjb2RlIHNob3VsZCBiZSBhIG51bWJlci4gR290OiAke2NvZGV9YClcbiAgfVxuXG4gIGlmIChjb2Rlc1tjb2RlXSA9PT0gdW5kZWZpbmVkICYmICFleHBvcnRzLmlzQXBwQ29kZShjb2RlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5yZWNvZ25pemVkIGZ1bmN0aW9uIGNvZGU6ICR7Y29kZX1gKVxuICB9XG5cbiAgcmV0dXJuIGNvZGVcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2V0aGVyIGEgY29kZSBpcyBwYXJ0IG9mIHRoZSBhcHAgcmFuZ2VcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuaXNBcHBDb2RlID0gZnVuY3Rpb24gYXBwQ29kZSAoY29kZSkge1xuICByZXR1cm4gY29kZSA+IDAgJiYgY29kZSA8IDB4MTBcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBhIG11bHRpaGFzaCBjb2RlIGlzIHZhbGlkLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0cy5pc1ZhbGlkQ29kZSA9IGZ1bmN0aW9uIHZhbGlkQ29kZSAoY29kZSkge1xuICBpZiAoZXhwb3J0cy5pc0FwcENvZGUoY29kZSkpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGNvZGVzW2NvZGVdKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBidWZmZXIgaXMgYSB2YWxpZCBtdWx0aWhhc2guIFRocm93cyBhbiBlcnJvciBpZiBpdCBpcyBub3QgdmFsaWQuXG4gKlxuICogQHBhcmFtIHtVaW50OEFycmF5fSBtdWx0aWhhc2hcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHRocm93cyB7RXJyb3J9XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlIChtdWx0aWhhc2gpIHtcbiAgZXhwb3J0cy5kZWNvZGUobXVsdGloYXNoKSAvLyB0aHJvd3MgaWYgYmFkLlxufVxuZXhwb3J0cy52YWxpZGF0ZSA9IHZhbGlkYXRlXG5cbi8qKlxuICogUmV0dXJucyBhIHByZWZpeCBmcm9tIGEgdmFsaWQgbXVsdGloYXNoLiBUaHJvd3MgYW4gZXJyb3IgaWYgaXQgaXMgbm90IHZhbGlkLlxuICpcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gbXVsdGloYXNoXG4gKiBAcmV0dXJucyB7QnVmZmVyfVxuICogQHRocm93cyB7RXJyb3J9XG4gKi9cbmV4cG9ydHMucHJlZml4ID0gZnVuY3Rpb24gcHJlZml4IChtdWx0aWhhc2gpIHtcbiAgdmFsaWRhdGUobXVsdGloYXNoKVxuXG4gIHJldHVybiBCdWZmZXIuZnJvbShtdWx0aWhhc2guYnVmZmVyLCBtdWx0aWhhc2guYnl0ZU9mZnNldCwgMilcbn1cbiIsIi8vIFRoaXMgZmlsZSByZXBsYWNlcyBgaW5kZXguanNgIGluIGJ1bmRsZXJzIGxpa2Ugd2VicGFjayBvciBSb2xsdXAsXG4vLyBhY2NvcmRpbmcgdG8gYGJyb3dzZXJgIGNvbmZpZyBpbiBgcGFja2FnZS5qc29uYC5cblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIC8vIEFsbCBidW5kbGVycyB3aWxsIHJlbW92ZSB0aGlzIGJsb2NrIGluIHByb2R1Y3Rpb24gYnVuZGxlXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdSZWFjdCBOYXRpdmUgZG9lcyBub3QgaGF2ZSBhIGJ1aWx0LWluIHNlY3VyZSByYW5kb20gZ2VuZXJhdG9yLiAnICtcbiAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzLCB5b3UgY2FuIHVzZSBgbmFub2lkL25vbi1zZWN1cmVgLiAnICtcbiAgICAgICdGb3Igc2VjdXJlIElEIGluc3RhbGwgYGV4cG8tcmFuZG9tYCBsb2NhbGx5IGFuZCB1c2UgYG5hbm9pZC9hc3luY2AuJ1xuICAgIClcbiAgfVxuICBpZiAodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnIHx8ICghc2VsZi5jcnlwdG8gJiYgIXNlbGYubXNDcnlwdG8pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBoYXZlIHNlY3VyZSByYW5kb20gZ2VuZXJhdG9yLiAnICtcbiAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzLCB5b3UgY2FuIHVzZSBuYW5vaWQvbm9uLXNlY3VyZS4nXG4gICAgKVxuICB9XG59XG5cbnZhciBjcnlwdG8gPSBzZWxmLmNyeXB0byB8fCBzZWxmLm1zQ3J5cHRvXG5cbi8vIFRoaXMgYWxwaGFiZXQgdXNlcyBhLXogQS1aIDAtOSBfLSBzeW1ib2xzLlxuLy8gU3ltYm9scyBhcmUgZ2VuZXJhdGVkIGZvciBzbWFsbGVyIHNpemUuXG4vLyAtX3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhOTg3NjU0MzIxMFpZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBXG52YXIgdXJsID0gJy1fJ1xuLy8gTG9vcCBmcm9tIDM2IHRvIDAgKGZyb20geiB0byBhIGFuZCA5IHRvIDAgaW4gQmFzZTM2KS5cbnZhciBpID0gMzZcbndoaWxlIChpLS0pIHtcbiAgLy8gMzYgaXMgcmFkaXguIE51bWJlci5wcm90b3R5cGUudG9TdHJpbmcoMzYpIHJldHVybnMgbnVtYmVyXG4gIC8vIGluIEJhc2UzNiByZXByZXNlbnRhdGlvbi4gQmFzZTM2IGlzIGxpa2UgaGV4LCBidXQgaXQgdXNlcyAw4oCTOSBhbmQgYS16LlxuICB1cmwgKz0gaS50b1N0cmluZygzNilcbn1cbi8vIExvb3AgZnJvbSAzNiB0byAxMCAoZnJvbSBaIHRvIEEgaW4gQmFzZTM2KS5cbmkgPSAzNlxud2hpbGUgKGktLSAtIDEwKSB7XG4gIHVybCArPSBpLnRvU3RyaW5nKDM2KS50b1VwcGVyQ2FzZSgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgdmFyIGlkID0gJydcbiAgdmFyIGJ5dGVzID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplIHx8IDIxKSlcbiAgaSA9IHNpemUgfHwgMjFcblxuICAvLyBDb21wYWN0IGFsdGVybmF0aXZlIGZvciBgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspYFxuICB3aGlsZSAoaS0tKSB7XG4gICAgLy8gV2UgY2Fu4oCZdCB1c2UgYnl0ZXMgYmlnZ2VyIHRoYW4gdGhlIGFscGhhYmV0LiA2MyBpcyAwMDExMTExMSBiaXRtYXNrLlxuICAgIC8vIFRoaXMgbWFzayByZWR1Y2VzIHJhbmRvbSBieXRlIDAtMjU1IHRvIDAtNjMgdmFsdWVzLlxuICAgIC8vIFRoZXJlIGlzIG5vIG5lZWQgaW4gYHx8ICcnYCBhbmQgYCogMS42YCBoYWNrcyBpbiBoZXJlLFxuICAgIC8vIGJlY2F1c2UgYml0bWFzayB0cmltIGJ5dGVzIGV4YWN0IHRvIGFscGhhYmV0IHNpemUuXG4gICAgaWQgKz0gdXJsW2J5dGVzW2ldICYgNjNdXG4gIH1cbiAgcmV0dXJuIGlkXG59XG4iLCJjb25zdCBFdGhRdWVyeSA9IHJlcXVpcmUoJ2V0aGpzLXF1ZXJ5JylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCBNdXRleCA9IHJlcXVpcmUoJ2F3YWl0LXNlbWFwaG9yZScpLk11dGV4XG4vKipcbiAgQHBhcmFtIG9wdHMge09iamVjdH1cbiAgICBAcGFyYW0ge09iamVjdH0gb3B0cy5wcm92aWRlciBhIGV0aGVyZXVtIHByb3ZpZGVyXG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gb3B0cy5nZXRQZW5kaW5nVHJhbnNhY3Rpb25zIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGFycmF5IG9mIHR4TWV0YVxuICAgIHdob3NlZSBzdGF0dXMgaXMgYHN1Ym1pdHRlZGBcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRzLmdldENvbmZpcm1lZFRyYW5zYWN0aW9ucyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBhcnJheSBvZiB0eE1ldGFcbiAgICB3aG9zZSBzdGF0dXMgaXMgYGNvbmZpcm1lZGBcbiAgQGNsYXNzXG4qL1xuY2xhc3MgTm9uY2VUcmFja2VyIHtcblxuICBjb25zdHJ1Y3RvciAoeyBwcm92aWRlciwgYmxvY2tUcmFja2VyLCBnZXRQZW5kaW5nVHJhbnNhY3Rpb25zLCBnZXRDb25maXJtZWRUcmFuc2FjdGlvbnMgfSkge1xuICAgIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlclxuICAgIHRoaXMuYmxvY2tUcmFja2VyID0gYmxvY2tUcmFja2VyXG4gICAgdGhpcy5ldGhRdWVyeSA9IG5ldyBFdGhRdWVyeShwcm92aWRlcilcbiAgICB0aGlzLmdldFBlbmRpbmdUcmFuc2FjdGlvbnMgPSBnZXRQZW5kaW5nVHJhbnNhY3Rpb25zXG4gICAgdGhpcy5nZXRDb25maXJtZWRUcmFuc2FjdGlvbnMgPSBnZXRDb25maXJtZWRUcmFuc2FjdGlvbnNcbiAgICB0aGlzLmxvY2tNYXAgPSB7fVxuICB9XG5cbiAgLyoqXG4gICAgQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gd2l0aCB0aGUga2V5IHJlbGVhc2VMb2NrICh0aGUgZ2xvYWJsIG11dGV4KVxuICAqL1xuICBhc3luYyBnZXRHbG9iYWxMb2NrICgpIHtcbiAgICBjb25zdCBnbG9iYWxNdXRleCA9IHRoaXMuX2xvb2t1cE11dGV4KCdnbG9iYWwnKVxuICAgIC8vIGF3YWl0IGdsb2JhbCBtdXRleCBmcmVlXG4gICAgY29uc3QgcmVsZWFzZUxvY2sgPSBhd2FpdCBnbG9iYWxNdXRleC5hY3F1aXJlKClcbiAgICByZXR1cm4geyByZWxlYXNlTG9jayB9XG4gIH1cblxuICAvKipcbiAgICogQHR5cGVkZWYgTm9uY2VEZXRhaWxzXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoaWdoZXN0TG9jYWxseUNvbmZpcm1lZCAtIEEgaGV4IHN0cmluZyBvZiB0aGUgaGlnaGVzdCBub25jZSBvbiBhIGNvbmZpcm1lZCB0cmFuc2FjdGlvbi5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IG5leHROZXR3b3JrTm9uY2UgLSBUaGUgbmV4dCBub25jZSBzdWdnZXN0ZWQgYnkgdGhlIGV0aF9nZXRUcmFuc2FjdGlvbkNvdW50IG1ldGhvZC5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGhpZ2hlc3RTdWdnZXN0ZWQgLSBUaGUgbWF4aW11bSBiZXR3ZWVuIHRoZSBvdGhlciB0d28sIHRoZSBudW1iZXIgcmV0dXJuZWQuXG4gICAqL1xuXG4gIC8qKlxuICB0aGlzIHdpbGwgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBgbmV4dE5vbmNlYCBgbm9uY2VEZXRhaWxzYCwgYW5kIHRoZSByZWxlYXNlTG9ja1xuICBOb3RlOiByZWxlYXNlTG9jayBtdXN0IGJlIGNhbGxlZCBhZnRlciBhZGRpbmcgYSBzaWduZWQgdHggdG8gcGVuZGluZyB0cmFuc2FjdGlvbnMgKG9yIGRpc2NhcmRpbmcpLlxuXG4gIEBwYXJhbSBhZGRyZXNzIHtzdHJpbmd9IHRoZSBoZXggc3RyaW5nIGZvciB0aGUgYWRkcmVzcyB3aG9zZSBub25jZSB3ZSBhcmUgY2FsY3VsYXRpbmdcbiAgQHJldHVybnMge1Byb21pc2U8Tm9uY2VEZXRhaWxzPn1cbiAgKi9cbiAgYXN5bmMgZ2V0Tm9uY2VMb2NrIChhZGRyZXNzKSB7XG4gICAgLy8gYXdhaXQgZ2xvYmFsIG11dGV4IGZyZWVcbiAgICBhd2FpdCB0aGlzLl9nbG9iYWxNdXRleEZyZWUoKVxuICAgIC8vIGF3YWl0IGxvY2sgZnJlZSwgdGhlbiB0YWtlIGxvY2tcbiAgICBjb25zdCByZWxlYXNlTG9jayA9IGF3YWl0IHRoaXMuX3Rha2VNdXRleChhZGRyZXNzKVxuICAgIHRyeSB7XG4gICAgICAvLyBldmFsdWF0ZSBtdWx0aXBsZSBuZXh0Tm9uY2Ugc3RyYXRlZ2llc1xuICAgICAgY29uc3Qgbm9uY2VEZXRhaWxzID0ge31cbiAgICAgIGNvbnN0IG5ldHdvcmtOb25jZVJlc3VsdCA9IGF3YWl0IHRoaXMuX2dldE5ldHdvcmtOZXh0Tm9uY2UoYWRkcmVzcylcbiAgICAgIGNvbnN0IGhpZ2hlc3RMb2NhbGx5Q29uZmlybWVkID0gdGhpcy5fZ2V0SGlnaGVzdExvY2FsbHlDb25maXJtZWQoYWRkcmVzcylcbiAgICAgIGNvbnN0IG5leHROZXR3b3JrTm9uY2UgPSBuZXR3b3JrTm9uY2VSZXN1bHQubm9uY2VcbiAgICAgIGNvbnN0IGhpZ2hlc3RTdWdnZXN0ZWQgPSBNYXRoLm1heChuZXh0TmV0d29ya05vbmNlLCBoaWdoZXN0TG9jYWxseUNvbmZpcm1lZClcblxuICAgICAgY29uc3QgcGVuZGluZ1R4cyA9IHRoaXMuZ2V0UGVuZGluZ1RyYW5zYWN0aW9ucyhhZGRyZXNzKVxuICAgICAgY29uc3QgbG9jYWxOb25jZVJlc3VsdCA9IHRoaXMuX2dldEhpZ2hlc3RDb250aW51b3VzRnJvbShwZW5kaW5nVHhzLCBoaWdoZXN0U3VnZ2VzdGVkKSB8fCAwXG5cbiAgICAgIG5vbmNlRGV0YWlscy5wYXJhbXMgPSB7XG4gICAgICAgIGhpZ2hlc3RMb2NhbGx5Q29uZmlybWVkLFxuICAgICAgICBoaWdoZXN0U3VnZ2VzdGVkLFxuICAgICAgICBuZXh0TmV0d29ya05vbmNlLFxuICAgICAgfVxuICAgICAgbm9uY2VEZXRhaWxzLmxvY2FsID0gbG9jYWxOb25jZVJlc3VsdFxuICAgICAgbm9uY2VEZXRhaWxzLm5ldHdvcmsgPSBuZXR3b3JrTm9uY2VSZXN1bHRcblxuICAgICAgY29uc3QgbmV4dE5vbmNlID0gTWF0aC5tYXgobmV0d29ya05vbmNlUmVzdWx0Lm5vbmNlLCBsb2NhbE5vbmNlUmVzdWx0Lm5vbmNlKVxuICAgICAgYXNzZXJ0KE51bWJlci5pc0ludGVnZXIobmV4dE5vbmNlKSwgYG5vbmNlLXRyYWNrZXIgLSBuZXh0Tm9uY2UgaXMgbm90IGFuIGludGVnZXIgLSBnb3Q6ICgke3R5cGVvZiBuZXh0Tm9uY2V9KSBcIiR7bmV4dE5vbmNlfVwiYClcblxuICAgICAgLy8gcmV0dXJuIG5vbmNlIGFuZCByZWxlYXNlIGNiXG4gICAgICByZXR1cm4geyBuZXh0Tm9uY2UsIG5vbmNlRGV0YWlscywgcmVsZWFzZUxvY2sgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gcmVsZWFzZSBsb2NrIGlmIHdlIGVuY291bnRlciBhbiBlcnJvclxuICAgICAgcmVsZWFzZUxvY2soKVxuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX2dsb2JhbE11dGV4RnJlZSAoKSB7XG4gICAgY29uc3QgZ2xvYmFsTXV0ZXggPSB0aGlzLl9sb29rdXBNdXRleCgnZ2xvYmFsJylcbiAgICBjb25zdCByZWxlYXNlTG9jayA9IGF3YWl0IGdsb2JhbE11dGV4LmFjcXVpcmUoKVxuICAgIHJlbGVhc2VMb2NrKClcbiAgfVxuXG4gIGFzeW5jIF90YWtlTXV0ZXggKGxvY2tJZCkge1xuICAgIGNvbnN0IG11dGV4ID0gdGhpcy5fbG9va3VwTXV0ZXgobG9ja0lkKVxuICAgIGNvbnN0IHJlbGVhc2VMb2NrID0gYXdhaXQgbXV0ZXguYWNxdWlyZSgpXG4gICAgcmV0dXJuIHJlbGVhc2VMb2NrXG4gIH1cblxuICBfbG9va3VwTXV0ZXggKGxvY2tJZCkge1xuICAgIGxldCBtdXRleCA9IHRoaXMubG9ja01hcFtsb2NrSWRdXG4gICAgaWYgKCFtdXRleCkge1xuICAgICAgbXV0ZXggPSBuZXcgTXV0ZXgoKVxuICAgICAgdGhpcy5sb2NrTWFwW2xvY2tJZF0gPSBtdXRleFxuICAgIH1cbiAgICByZXR1cm4gbXV0ZXhcbiAgfVxuXG4gIGFzeW5jIF9nZXROZXR3b3JrTmV4dE5vbmNlIChhZGRyZXNzKSB7XG4gICAgLy8gY2FsY3VsYXRlIG5leHQgbm9uY2VcbiAgICAvLyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBvdXIgYmFzZSBjb3VudFxuICAgIC8vIGFuZCBwZW5kaW5nIGNvdW50IGFyZSBmcm9tIHRoZSBzYW1lIGJsb2NrXG4gICAgY29uc3QgYmxvY2tOdW1iZXIgPSBhd2FpdCB0aGlzLmJsb2NrVHJhY2tlci5nZXRMYXRlc3RCbG9jaygpXG4gICAgY29uc3QgYmFzZUNvdW50Qk4gPSBhd2FpdCB0aGlzLmV0aFF1ZXJ5LmdldFRyYW5zYWN0aW9uQ291bnQoYWRkcmVzcywgYmxvY2tOdW1iZXIpXG4gICAgY29uc3QgYmFzZUNvdW50ID0gYmFzZUNvdW50Qk4udG9OdW1iZXIoKVxuICAgIGFzc2VydChOdW1iZXIuaXNJbnRlZ2VyKGJhc2VDb3VudCksIGBub25jZS10cmFja2VyIC0gYmFzZUNvdW50IGlzIG5vdCBhbiBpbnRlZ2VyIC0gZ290OiAoJHt0eXBlb2YgYmFzZUNvdW50fSkgXCIke2Jhc2VDb3VudH1cImApXG4gICAgY29uc3Qgbm9uY2VEZXRhaWxzID0geyBibG9ja051bWJlciwgYmFzZUNvdW50IH1cbiAgICByZXR1cm4geyBuYW1lOiAnbmV0d29yaycsIG5vbmNlOiBiYXNlQ291bnQsIGRldGFpbHM6IG5vbmNlRGV0YWlscyB9XG4gIH1cblxuICBfZ2V0SGlnaGVzdExvY2FsbHlDb25maXJtZWQgKGFkZHJlc3MpIHtcbiAgICBjb25zdCBjb25maXJtZWRUcmFuc2FjdGlvbnMgPSB0aGlzLmdldENvbmZpcm1lZFRyYW5zYWN0aW9ucyhhZGRyZXNzKVxuICAgIGNvbnN0IGhpZ2hlc3QgPSB0aGlzLl9nZXRIaWdoZXN0Tm9uY2UoY29uZmlybWVkVHJhbnNhY3Rpb25zKVxuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKGhpZ2hlc3QpID8gaGlnaGVzdCArIDEgOiAwXG4gIH1cblxuICBfZ2V0SGlnaGVzdE5vbmNlICh0eExpc3QpIHtcbiAgICBjb25zdCBub25jZXMgPSB0eExpc3QubWFwKCh0eE1ldGEpID0+IHtcbiAgICAgIGNvbnN0IG5vbmNlID0gdHhNZXRhLnR4UGFyYW1zLm5vbmNlXG4gICAgICBhc3NlcnQodHlwZW9mIG5vbmNlLCAnc3RyaW5nJywgJ25vbmNlcyBzaG91bGQgYmUgaGV4IHN0cmluZ3MnKVxuICAgICAgcmV0dXJuIHBhcnNlSW50KG5vbmNlLCAxNilcbiAgICB9KVxuICAgIGNvbnN0IGhpZ2hlc3ROb25jZSA9IE1hdGgubWF4LmFwcGx5KG51bGwsIG5vbmNlcylcbiAgICByZXR1cm4gaGlnaGVzdE5vbmNlXG4gIH1cblxuICAvKipcbiAgICBAdHlwZWRlZiB7b2JqZWN0fSBoaWdoZXN0Q29udGludW91c0Zyb21cbiAgICBAcHJvcGVydHkge3N0cmluZ30gLSBuYW1lIHRoZSBuYW1lIGZvciBob3cgdGhlIG5vbmNlIHdhcyBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkYXRhIHVzZWRcbiAgICBAcHJvcGVydHkge251bWJlcn0gLSBub25jZSB0aGUgbmV4dCBzdWdnZXN0ZWQgbm9uY2VcbiAgICBAcHJvcGVydHkge29iamVjdH0gLSBkZXRhaWxzIHRoZSBwcm92aWRlZCBzdGFydGluZyBub25jZSB0aGF0IHdhcyB1c2VkIChmb3IgZGVidWdnaW5nKVxuICAqL1xuICAvKipcbiAgICBAcGFyYW0gdHhMaXN0IHthcnJheX0gLSBsaXN0IG9mIHR4TWV0YSdzXG4gICAgQHBhcmFtIHN0YXJ0UG9pbnQge251bWJlcn0gLSB0aGUgaGlnaGVzdCBrbm93biBsb2NhbGx5IGNvbmZpcm1lZCBub25jZVxuICAgIEByZXR1cm5zIHtoaWdoZXN0Q29udGludW91c0Zyb219XG4gICovXG4gIF9nZXRIaWdoZXN0Q29udGludW91c0Zyb20gKHR4TGlzdCwgc3RhcnRQb2ludCkge1xuICAgIGNvbnN0IG5vbmNlcyA9IHR4TGlzdC5tYXAoKHR4TWV0YSkgPT4ge1xuICAgICAgY29uc3Qgbm9uY2UgPSB0eE1ldGEudHhQYXJhbXMubm9uY2VcbiAgICAgIGFzc2VydCh0eXBlb2Ygbm9uY2UsICdzdHJpbmcnLCAnbm9uY2VzIHNob3VsZCBiZSBoZXggc3RyaW5ncycpXG4gICAgICByZXR1cm4gcGFyc2VJbnQobm9uY2UsIDE2KVxuICAgIH0pXG5cbiAgICBsZXQgaGlnaGVzdCA9IHN0YXJ0UG9pbnRcbiAgICB3aGlsZSAobm9uY2VzLmluY2x1ZGVzKGhpZ2hlc3QpKSB7XG4gICAgICBoaWdoZXN0KytcbiAgICB9XG5cbiAgICByZXR1cm4geyBuYW1lOiAnbG9jYWwnLCBub25jZTogaGlnaGVzdCwgZGV0YWlsczogeyBzdGFydFBvaW50LCBoaWdoZXN0IH0gfVxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25jZVRyYWNrZXJcbiIsIlxuLyoqXG4gKiBSZW1vdmUgdHJhaWxpbmcgc2xhc2hlcyBmcm9tIHRoZSBnaXZlbiBgc3RyYFxuICpcbiAqIEBhcGkgcHVibGljXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UoZXhwb3J0cy5leHByLCAnJyk7XG59O1xuXG4vKipcbiAqIEV4cG9zZSB0aGUgcmVnZXhcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbmV4cG9ydHMuZXhwciA9IC9cXC8rJC87XG4iLCJ2YXIgcGJrZGYyU3luYyA9IHJlcXVpcmUoJ3Bia2RmMicpLnBia2RmMlN5bmNcblxudmFyIE1BWF9WQUxVRSA9IDB4N2ZmZmZmZmZcblxuLy8gTiA9IENwdSBjb3N0LCByID0gTWVtb3J5IGNvc3QsIHAgPSBwYXJhbGxlbGl6YXRpb24gY29zdFxuZnVuY3Rpb24gc2NyeXB0IChrZXksIHNhbHQsIE4sIHIsIHAsIGRrTGVuLCBwcm9ncmVzc0NhbGxiYWNrKSB7XG4gIGlmIChOID09PSAwIHx8IChOICYgKE4gLSAxKSkgIT09IDApIHRocm93IEVycm9yKCdOIG11c3QgYmUgPiAwIGFuZCBhIHBvd2VyIG9mIDInKVxuXG4gIGlmIChOID4gTUFYX1ZBTFVFIC8gMTI4IC8gcikgdGhyb3cgRXJyb3IoJ1BhcmFtZXRlciBOIGlzIHRvbyBsYXJnZScpXG4gIGlmIChyID4gTUFYX1ZBTFVFIC8gMTI4IC8gcCkgdGhyb3cgRXJyb3IoJ1BhcmFtZXRlciByIGlzIHRvbyBsYXJnZScpXG5cbiAgdmFyIFhZID0gbmV3IEJ1ZmZlcigyNTYgKiByKVxuICB2YXIgViA9IG5ldyBCdWZmZXIoMTI4ICogciAqIE4pXG5cbiAgLy8gcHNldWRvIGdsb2JhbFxuICB2YXIgQjMyID0gbmV3IEludDMyQXJyYXkoMTYpIC8vIHNhbHNhMjBfOFxuICB2YXIgeCA9IG5ldyBJbnQzMkFycmF5KDE2KSAvLyBzYWxzYTIwXzhcbiAgdmFyIF9YID0gbmV3IEJ1ZmZlcig2NCkgLy8gYmxvY2ttaXhfc2Fsc2E4XG5cbiAgLy8gcHNldWRvIGdsb2JhbFxuICB2YXIgQiA9IHBia2RmMlN5bmMoa2V5LCBzYWx0LCAxLCBwICogMTI4ICogciwgJ3NoYTI1NicpXG5cbiAgdmFyIHRpY2tDYWxsYmFja1xuICBpZiAocHJvZ3Jlc3NDYWxsYmFjaykge1xuICAgIHZhciB0b3RhbE9wcyA9IHAgKiBOICogMlxuICAgIHZhciBjdXJyZW50T3AgPSAwXG5cbiAgICB0aWNrQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICArK2N1cnJlbnRPcFxuXG4gICAgICAvLyBzZW5kIHByb2dyZXNzIG5vdGlmaWNhdGlvbnMgb25jZSBldmVyeSAxLDAwMCBvcHNcbiAgICAgIGlmIChjdXJyZW50T3AgJSAxMDAwID09PSAwKSB7XG4gICAgICAgIHByb2dyZXNzQ2FsbGJhY2soe1xuICAgICAgICAgIGN1cnJlbnQ6IGN1cnJlbnRPcCxcbiAgICAgICAgICB0b3RhbDogdG90YWxPcHMsXG4gICAgICAgICAgcGVyY2VudDogKGN1cnJlbnRPcCAvIHRvdGFsT3BzKSAqIDEwMC4wXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwOyBpKyspIHtcbiAgICBzbWl4KEIsIGkgKiAxMjggKiByLCByLCBOLCBWLCBYWSlcbiAgfVxuXG4gIHJldHVybiBwYmtkZjJTeW5jKGtleSwgQiwgMSwgZGtMZW4sICdzaGEyNTYnKVxuXG4gIC8vIGFsbCBvZiB0aGVzZSBmdW5jdGlvbnMgYXJlIGFjdHVhbGx5IG1vdmVkIHRvIHRoZSB0b3BcbiAgLy8gZHVlIHRvIGZ1bmN0aW9uIGhvaXN0aW5nXG5cbiAgZnVuY3Rpb24gc21peCAoQiwgQmksIHIsIE4sIFYsIFhZKSB7XG4gICAgdmFyIFhpID0gMFxuICAgIHZhciBZaSA9IDEyOCAqIHJcbiAgICB2YXIgaVxuXG4gICAgQi5jb3B5KFhZLCBYaSwgQmksIEJpICsgWWkpXG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBYWS5jb3B5KFYsIGkgKiBZaSwgWGksIFhpICsgWWkpXG4gICAgICBibG9ja21peF9zYWxzYTgoWFksIFhpLCBZaSwgcilcblxuICAgICAgaWYgKHRpY2tDYWxsYmFjaykgdGlja0NhbGxiYWNrKClcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0gWGkgKyAoMiAqIHIgLSAxKSAqIDY0XG4gICAgICB2YXIgaiA9IFhZLnJlYWRVSW50MzJMRShvZmZzZXQpICYgKE4gLSAxKVxuICAgICAgYmxvY2t4b3IoViwgaiAqIFlpLCBYWSwgWGksIFlpKVxuICAgICAgYmxvY2ttaXhfc2Fsc2E4KFhZLCBYaSwgWWksIHIpXG5cbiAgICAgIGlmICh0aWNrQ2FsbGJhY2spIHRpY2tDYWxsYmFjaygpXG4gICAgfVxuXG4gICAgWFkuY29weShCLCBCaSwgWGksIFhpICsgWWkpXG4gIH1cblxuICBmdW5jdGlvbiBibG9ja21peF9zYWxzYTggKEJZLCBCaSwgWWksIHIpIHtcbiAgICB2YXIgaVxuXG4gICAgYXJyYXljb3B5KEJZLCBCaSArICgyICogciAtIDEpICogNjQsIF9YLCAwLCA2NClcblxuICAgIGZvciAoaSA9IDA7IGkgPCAyICogcjsgaSsrKSB7XG4gICAgICBibG9ja3hvcihCWSwgaSAqIDY0LCBfWCwgMCwgNjQpXG4gICAgICBzYWxzYTIwXzgoX1gpXG4gICAgICBhcnJheWNvcHkoX1gsIDAsIEJZLCBZaSArIChpICogNjQpLCA2NClcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcjsgaSsrKSB7XG4gICAgICBhcnJheWNvcHkoQlksIFlpICsgKGkgKiAyKSAqIDY0LCBCWSwgQmkgKyAoaSAqIDY0KSwgNjQpXG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHI7IGkrKykge1xuICAgICAgYXJyYXljb3B5KEJZLCBZaSArIChpICogMiArIDEpICogNjQsIEJZLCBCaSArIChpICsgcikgKiA2NCwgNjQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gUiAoYSwgYikge1xuICAgIHJldHVybiAoYSA8PCBiKSB8IChhID4+PiAoMzIgLSBiKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhbHNhMjBfOCAoQikge1xuICAgIHZhciBpXG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgQjMyW2ldID0gKEJbaSAqIDQgKyAwXSAmIDB4ZmYpIDw8IDBcbiAgICAgIEIzMltpXSB8PSAoQltpICogNCArIDFdICYgMHhmZikgPDwgOFxuICAgICAgQjMyW2ldIHw9IChCW2kgKiA0ICsgMl0gJiAweGZmKSA8PCAxNlxuICAgICAgQjMyW2ldIHw9IChCW2kgKiA0ICsgM10gJiAweGZmKSA8PCAyNFxuICAgICAgLy8gQjMyW2ldID0gQi5yZWFkVUludDMyTEUoaSo0KSAgIDwtLS0gdGhpcyBpcyBzaWduZmljYW50bHkgc2xvd2VyIGV2ZW4gaW4gTm9kZS5qc1xuICAgIH1cblxuICAgIGFycmF5Y29weShCMzIsIDAsIHgsIDAsIDE2KVxuXG4gICAgZm9yIChpID0gODsgaSA+IDA7IGkgLT0gMikge1xuICAgICAgeFsgNF0gXj0gUih4WyAwXSArIHhbMTJdLCA3KVxuICAgICAgeFsgOF0gXj0gUih4WyA0XSArIHhbIDBdLCA5KVxuICAgICAgeFsxMl0gXj0gUih4WyA4XSArIHhbIDRdLCAxMylcbiAgICAgIHhbIDBdIF49IFIoeFsxMl0gKyB4WyA4XSwgMTgpXG4gICAgICB4WyA5XSBePSBSKHhbIDVdICsgeFsgMV0sIDcpXG4gICAgICB4WzEzXSBePSBSKHhbIDldICsgeFsgNV0sIDkpXG4gICAgICB4WyAxXSBePSBSKHhbMTNdICsgeFsgOV0sIDEzKVxuICAgICAgeFsgNV0gXj0gUih4WyAxXSArIHhbMTNdLCAxOClcbiAgICAgIHhbMTRdIF49IFIoeFsxMF0gKyB4WyA2XSwgNylcbiAgICAgIHhbIDJdIF49IFIoeFsxNF0gKyB4WzEwXSwgOSlcbiAgICAgIHhbIDZdIF49IFIoeFsgMl0gKyB4WzE0XSwgMTMpXG4gICAgICB4WzEwXSBePSBSKHhbIDZdICsgeFsgMl0sIDE4KVxuICAgICAgeFsgM10gXj0gUih4WzE1XSArIHhbMTFdLCA3KVxuICAgICAgeFsgN10gXj0gUih4WyAzXSArIHhbMTVdLCA5KVxuICAgICAgeFsxMV0gXj0gUih4WyA3XSArIHhbIDNdLCAxMylcbiAgICAgIHhbMTVdIF49IFIoeFsxMV0gKyB4WyA3XSwgMTgpXG4gICAgICB4WyAxXSBePSBSKHhbIDBdICsgeFsgM10sIDcpXG4gICAgICB4WyAyXSBePSBSKHhbIDFdICsgeFsgMF0sIDkpXG4gICAgICB4WyAzXSBePSBSKHhbIDJdICsgeFsgMV0sIDEzKVxuICAgICAgeFsgMF0gXj0gUih4WyAzXSArIHhbIDJdLCAxOClcbiAgICAgIHhbIDZdIF49IFIoeFsgNV0gKyB4WyA0XSwgNylcbiAgICAgIHhbIDddIF49IFIoeFsgNl0gKyB4WyA1XSwgOSlcbiAgICAgIHhbIDRdIF49IFIoeFsgN10gKyB4WyA2XSwgMTMpXG4gICAgICB4WyA1XSBePSBSKHhbIDRdICsgeFsgN10sIDE4KVxuICAgICAgeFsxMV0gXj0gUih4WzEwXSArIHhbIDldLCA3KVxuICAgICAgeFsgOF0gXj0gUih4WzExXSArIHhbMTBdLCA5KVxuICAgICAgeFsgOV0gXj0gUih4WyA4XSArIHhbMTFdLCAxMylcbiAgICAgIHhbMTBdIF49IFIoeFsgOV0gKyB4WyA4XSwgMTgpXG4gICAgICB4WzEyXSBePSBSKHhbMTVdICsgeFsxNF0sIDcpXG4gICAgICB4WzEzXSBePSBSKHhbMTJdICsgeFsxNV0sIDkpXG4gICAgICB4WzE0XSBePSBSKHhbMTNdICsgeFsxMl0sIDEzKVxuICAgICAgeFsxNV0gXj0gUih4WzE0XSArIHhbMTNdLCAxOClcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgMTY7ICsraSkgQjMyW2ldID0geFtpXSArIEIzMltpXVxuXG4gICAgZm9yIChpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIHZhciBiaSA9IGkgKiA0XG4gICAgICBCW2JpICsgMF0gPSAoQjMyW2ldID4+IDAgJiAweGZmKVxuICAgICAgQltiaSArIDFdID0gKEIzMltpXSA+PiA4ICYgMHhmZilcbiAgICAgIEJbYmkgKyAyXSA9IChCMzJbaV0gPj4gMTYgJiAweGZmKVxuICAgICAgQltiaSArIDNdID0gKEIzMltpXSA+PiAyNCAmIDB4ZmYpXG4gICAgICAvLyBCLndyaXRlSW50MzJMRShCMzJbaV0sIGkqNCkgIC8vPC0tLSB0aGlzIGlzIHNpZ25maWNhbnRseSBzbG93ZXIgZXZlbiBpbiBOb2RlLmpzXG4gICAgfVxuICB9XG5cbiAgLy8gbmFpdmUgYXBwcm9hY2guLi4gZ29pbmcgYmFjayB0byBsb29wIHVucm9sbGluZyBtYXkgeWllbGQgYWRkaXRpb25hbCBwZXJmb3JtYW5jZVxuICBmdW5jdGlvbiBibG9ja3hvciAoUywgU2ksIEQsIERpLCBsZW4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBEW0RpICsgaV0gXj0gU1tTaSArIGldXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFycmF5Y29weSAoc3JjLCBzcmNQb3MsIGRlc3QsIGRlc3RQb3MsIGxlbmd0aCkge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHNyYykgJiYgQnVmZmVyLmlzQnVmZmVyKGRlc3QpKSB7XG4gICAgc3JjLmNvcHkoZGVzdCwgZGVzdFBvcywgc3JjUG9zLCBzcmNQb3MgKyBsZW5ndGgpXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBkZXN0W2Rlc3RQb3MrK10gPSBzcmNbc3JjUG9zKytdXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2NyeXB0XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliJykocmVxdWlyZSgnLi9saWIvZWxsaXB0aWMnKSlcbiIsImNvbnN0IEVDID0gcmVxdWlyZSgnZWxsaXB0aWMnKS5lY1xuXG5jb25zdCBlYyA9IG5ldyBFQygnc2VjcDI1NmsxJylcbmNvbnN0IGVjcGFyYW1zID0gZWMuY3VydmVcblxuLy8gSGFjaywgd2UgY2FuIG5vdCB1c2UgYm4uanNANSwgd2hpbGUgZWxsaXB0aWMgdXNlcyBibi5qc0A0XG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2luZHV0bnkvZWxsaXB0aWMvaXNzdWVzLzE5MSNpc3N1ZWNvbW1lbnQtNTY5ODg4NzU4XG5jb25zdCBCTiA9IGVjcGFyYW1zLm4uY29uc3RydWN0b3JcblxuZnVuY3Rpb24gbG9hZENvbXByZXNzZWRQdWJsaWNLZXkgKGZpcnN0LCB4YnVmKSB7XG4gIGxldCB4ID0gbmV3IEJOKHhidWYpXG5cbiAgLy8gb3ZlcmZsb3dcbiAgaWYgKHguY21wKGVjcGFyYW1zLnApID49IDApIHJldHVybiBudWxsXG4gIHggPSB4LnRvUmVkKGVjcGFyYW1zLnJlZClcblxuICAvLyBjb21wdXRlIGNvcnJlc3BvbmRpbmcgWVxuICBsZXQgeSA9IHgucmVkU3FyKCkucmVkSU11bCh4KS5yZWRJQWRkKGVjcGFyYW1zLmIpLnJlZFNxcnQoKVxuICBpZiAoKGZpcnN0ID09PSAweDAzKSAhPT0geS5pc09kZCgpKSB5ID0geS5yZWROZWcoKVxuXG4gIHJldHVybiBlYy5rZXlQYWlyKHsgcHViOiB7IHg6IHgsIHk6IHkgfSB9KVxufVxuXG5mdW5jdGlvbiBsb2FkVW5jb21wcmVzc2VkUHVibGljS2V5IChmaXJzdCwgeGJ1ZiwgeWJ1Zikge1xuICBsZXQgeCA9IG5ldyBCTih4YnVmKVxuICBsZXQgeSA9IG5ldyBCTih5YnVmKVxuXG4gIC8vIG92ZXJmbG93XG4gIGlmICh4LmNtcChlY3BhcmFtcy5wKSA+PSAwIHx8IHkuY21wKGVjcGFyYW1zLnApID49IDApIHJldHVybiBudWxsXG5cbiAgeCA9IHgudG9SZWQoZWNwYXJhbXMucmVkKVxuICB5ID0geS50b1JlZChlY3BhcmFtcy5yZWQpXG5cbiAgLy8gaXMgb2RkIGZsYWdcbiAgaWYgKChmaXJzdCA9PT0gMHgwNiB8fCBmaXJzdCA9PT0gMHgwNykgJiYgeS5pc09kZCgpICE9PSAoZmlyc3QgPT09IDB4MDcpKSByZXR1cm4gbnVsbFxuXG4gIC8vIHgqeCp4ICsgYiA9IHkqeVxuICBjb25zdCB4MyA9IHgucmVkU3FyKCkucmVkSU11bCh4KVxuICBpZiAoIXkucmVkU3FyKCkucmVkSVN1Yih4My5yZWRJQWRkKGVjcGFyYW1zLmIpKS5pc1plcm8oKSkgcmV0dXJuIG51bGxcblxuICByZXR1cm4gZWMua2V5UGFpcih7IHB1YjogeyB4OiB4LCB5OiB5IH0gfSlcbn1cblxuZnVuY3Rpb24gbG9hZFB1YmxpY0tleSAocHVia2V5KSB7XG4gIC8vIGxlbmd0aCBzaG91bGQgYmUgdmFsaWRhdGVkIGluIGludGVyZmFjZVxuICBjb25zdCBmaXJzdCA9IHB1YmtleVswXVxuICBzd2l0Y2ggKGZpcnN0KSB7XG4gICAgY2FzZSAweDAyOlxuICAgIGNhc2UgMHgwMzpcbiAgICAgIGlmIChwdWJrZXkubGVuZ3RoICE9PSAzMykgcmV0dXJuIG51bGxcbiAgICAgIHJldHVybiBsb2FkQ29tcHJlc3NlZFB1YmxpY0tleShmaXJzdCwgcHVia2V5LnN1YmFycmF5KDEsIDMzKSlcbiAgICBjYXNlIDB4MDQ6XG4gICAgY2FzZSAweDA2OlxuICAgIGNhc2UgMHgwNzpcbiAgICAgIGlmIChwdWJrZXkubGVuZ3RoICE9PSA2NSkgcmV0dXJuIG51bGxcbiAgICAgIHJldHVybiBsb2FkVW5jb21wcmVzc2VkUHVibGljS2V5KGZpcnN0LCBwdWJrZXkuc3ViYXJyYXkoMSwgMzMpLCBwdWJrZXkuc3ViYXJyYXkoMzMsIDY1KSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5mdW5jdGlvbiBzYXZlUHVibGljS2V5IChvdXRwdXQsIHBvaW50KSB7XG4gIGNvbnN0IHB1YmtleSA9IHBvaW50LmVuY29kZShudWxsLCBvdXRwdXQubGVuZ3RoID09PSAzMylcbiAgLy8gTG9vcCBzaG91bGQgYmUgZmFzdGVyIGJlY2F1c2Ugd2UgZG8gbm90IG5lZWQgY3JlYXRlIGV4dHJhIFVpbnQ4QXJyYXlcbiAgLy8gb3V0cHV0LnNldChuZXcgVWludDhBcnJheShwdWJrZXkpKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7ICsraSkgb3V0cHV0W2ldID0gcHVia2V5W2ldXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb250ZXh0UmFuZG9taXplICgpIHtcbiAgICByZXR1cm4gMFxuICB9LFxuXG4gIHByaXZhdGVLZXlWZXJpZnkgKHNlY2tleSkge1xuICAgIGNvbnN0IGJuID0gbmV3IEJOKHNlY2tleSlcbiAgICByZXR1cm4gYm4uY21wKGVjcGFyYW1zLm4pIDwgMCAmJiAhYm4uaXNaZXJvKCkgPyAwIDogMVxuICB9LFxuXG4gIHByaXZhdGVLZXlOZWdhdGUgKHNlY2tleSkge1xuICAgIGNvbnN0IGJuID0gbmV3IEJOKHNlY2tleSlcbiAgICBjb25zdCBuZWdhdGUgPSBlY3BhcmFtcy5uLnN1YihibikudW1vZChlY3BhcmFtcy5uKS50b0FycmF5TGlrZShVaW50OEFycmF5LCAnYmUnLCAzMilcbiAgICBzZWNrZXkuc2V0KG5lZ2F0ZSlcbiAgICByZXR1cm4gMFxuICB9LFxuXG4gIHByaXZhdGVLZXlUd2Vha0FkZCAoc2Vja2V5LCB0d2Vhaykge1xuICAgIGNvbnN0IGJuID0gbmV3IEJOKHR3ZWFrKVxuICAgIGlmIChibi5jbXAoZWNwYXJhbXMubikgPj0gMCkgcmV0dXJuIDFcblxuICAgIGJuLmlhZGQobmV3IEJOKHNlY2tleSkpXG4gICAgaWYgKGJuLmNtcChlY3BhcmFtcy5uKSA+PSAwKSBibi5pc3ViKGVjcGFyYW1zLm4pXG4gICAgaWYgKGJuLmlzWmVybygpKSByZXR1cm4gMVxuXG4gICAgY29uc3QgdHdlYWtlZCA9IGJuLnRvQXJyYXlMaWtlKFVpbnQ4QXJyYXksICdiZScsIDMyKVxuICAgIHNlY2tleS5zZXQodHdlYWtlZClcblxuICAgIHJldHVybiAwXG4gIH0sXG5cbiAgcHJpdmF0ZUtleVR3ZWFrTXVsIChzZWNrZXksIHR3ZWFrKSB7XG4gICAgbGV0IGJuID0gbmV3IEJOKHR3ZWFrKVxuICAgIGlmIChibi5jbXAoZWNwYXJhbXMubikgPj0gMCB8fCBibi5pc1plcm8oKSkgcmV0dXJuIDFcblxuICAgIGJuLmltdWwobmV3IEJOKHNlY2tleSkpXG4gICAgaWYgKGJuLmNtcChlY3BhcmFtcy5uKSA+PSAwKSBibiA9IGJuLnVtb2QoZWNwYXJhbXMubilcblxuICAgIGNvbnN0IHR3ZWFrZWQgPSBibi50b0FycmF5TGlrZShVaW50OEFycmF5LCAnYmUnLCAzMilcbiAgICBzZWNrZXkuc2V0KHR3ZWFrZWQpXG5cbiAgICByZXR1cm4gMFxuICB9LFxuXG4gIHB1YmxpY0tleVZlcmlmeSAocHVia2V5KSB7XG4gICAgY29uc3QgcGFpciA9IGxvYWRQdWJsaWNLZXkocHVia2V5KVxuICAgIHJldHVybiBwYWlyID09PSBudWxsID8gMSA6IDBcbiAgfSxcblxuICBwdWJsaWNLZXlDcmVhdGUgKG91dHB1dCwgc2Vja2V5KSB7XG4gICAgY29uc3QgYm4gPSBuZXcgQk4oc2Vja2V5KVxuICAgIGlmIChibi5jbXAoZWNwYXJhbXMubikgPj0gMCB8fCBibi5pc1plcm8oKSkgcmV0dXJuIDFcblxuICAgIGNvbnN0IHBvaW50ID0gZWMua2V5RnJvbVByaXZhdGUoc2Vja2V5KS5nZXRQdWJsaWMoKVxuICAgIHNhdmVQdWJsaWNLZXkob3V0cHV0LCBwb2ludClcblxuICAgIHJldHVybiAwXG4gIH0sXG5cbiAgcHVibGljS2V5Q29udmVydCAob3V0cHV0LCBwdWJrZXkpIHtcbiAgICBjb25zdCBwYWlyID0gbG9hZFB1YmxpY0tleShwdWJrZXkpXG4gICAgaWYgKHBhaXIgPT09IG51bGwpIHJldHVybiAxXG5cbiAgICBjb25zdCBwb2ludCA9IHBhaXIuZ2V0UHVibGljKClcbiAgICBzYXZlUHVibGljS2V5KG91dHB1dCwgcG9pbnQpXG5cbiAgICByZXR1cm4gMFxuICB9LFxuXG4gIHB1YmxpY0tleU5lZ2F0ZSAob3V0cHV0LCBwdWJrZXkpIHtcbiAgICBjb25zdCBwYWlyID0gbG9hZFB1YmxpY0tleShwdWJrZXkpXG4gICAgaWYgKHBhaXIgPT09IG51bGwpIHJldHVybiAxXG5cbiAgICBjb25zdCBwb2ludCA9IHBhaXIuZ2V0UHVibGljKClcbiAgICBwb2ludC55ID0gcG9pbnQueS5yZWROZWcoKVxuICAgIHNhdmVQdWJsaWNLZXkob3V0cHV0LCBwb2ludClcblxuICAgIHJldHVybiAwXG4gIH0sXG5cbiAgcHVibGljS2V5Q29tYmluZSAob3V0cHV0LCBwdWJrZXlzKSB7XG4gICAgY29uc3QgcGFpcnMgPSBuZXcgQXJyYXkocHVia2V5cy5sZW5ndGgpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwdWJrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICBwYWlyc1tpXSA9IGxvYWRQdWJsaWNLZXkocHVia2V5c1tpXSlcbiAgICAgIGlmIChwYWlyc1tpXSA9PT0gbnVsbCkgcmV0dXJuIDFcbiAgICB9XG5cbiAgICBsZXQgcG9pbnQgPSBwYWlyc1swXS5nZXRQdWJsaWMoKVxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcGFpcnMubGVuZ3RoOyArK2kpIHBvaW50ID0gcG9pbnQuYWRkKHBhaXJzW2ldLnB1YilcbiAgICBpZiAocG9pbnQuaXNJbmZpbml0eSgpKSByZXR1cm4gMlxuXG4gICAgc2F2ZVB1YmxpY0tleShvdXRwdXQsIHBvaW50KVxuXG4gICAgcmV0dXJuIDBcbiAgfSxcblxuICBwdWJsaWNLZXlUd2Vha0FkZCAob3V0cHV0LCBwdWJrZXksIHR3ZWFrKSB7XG4gICAgY29uc3QgcGFpciA9IGxvYWRQdWJsaWNLZXkocHVia2V5KVxuICAgIGlmIChwYWlyID09PSBudWxsKSByZXR1cm4gMVxuXG4gICAgdHdlYWsgPSBuZXcgQk4odHdlYWspXG4gICAgaWYgKHR3ZWFrLmNtcChlY3BhcmFtcy5uKSA+PSAwKSByZXR1cm4gMlxuXG4gICAgY29uc3QgcG9pbnQgPSBwYWlyLmdldFB1YmxpYygpLmFkZChlY3BhcmFtcy5nLm11bCh0d2VhaykpXG4gICAgaWYgKHBvaW50LmlzSW5maW5pdHkoKSkgcmV0dXJuIDJcblxuICAgIHNhdmVQdWJsaWNLZXkob3V0cHV0LCBwb2ludClcblxuICAgIHJldHVybiAwXG4gIH0sXG5cbiAgcHVibGljS2V5VHdlYWtNdWwgKG91dHB1dCwgcHVia2V5LCB0d2Vhaykge1xuICAgIGNvbnN0IHBhaXIgPSBsb2FkUHVibGljS2V5KHB1YmtleSlcbiAgICBpZiAocGFpciA9PT0gbnVsbCkgcmV0dXJuIDFcblxuICAgIHR3ZWFrID0gbmV3IEJOKHR3ZWFrKVxuICAgIGlmICh0d2Vhay5jbXAoZWNwYXJhbXMubikgPj0gMCB8fCB0d2Vhay5pc1plcm8oKSkgcmV0dXJuIDJcblxuICAgIGNvbnN0IHBvaW50ID0gcGFpci5nZXRQdWJsaWMoKS5tdWwodHdlYWspXG4gICAgc2F2ZVB1YmxpY0tleShvdXRwdXQsIHBvaW50KVxuXG4gICAgcmV0dXJuIDBcbiAgfSxcblxuICBzaWduYXR1cmVOb3JtYWxpemUgKHNpZykge1xuICAgIGNvbnN0IHIgPSBuZXcgQk4oc2lnLnN1YmFycmF5KDAsIDMyKSlcbiAgICBjb25zdCBzID0gbmV3IEJOKHNpZy5zdWJhcnJheSgzMiwgNjQpKVxuICAgIGlmIChyLmNtcChlY3BhcmFtcy5uKSA+PSAwIHx8IHMuY21wKGVjcGFyYW1zLm4pID49IDApIHJldHVybiAxXG5cbiAgICBpZiAocy5jbXAoZWMubmgpID09PSAxKSB7XG4gICAgICBzaWcuc2V0KGVjcGFyYW1zLm4uc3ViKHMpLnRvQXJyYXlMaWtlKFVpbnQ4QXJyYXksICdiZScsIDMyKSwgMzIpXG4gICAgfVxuXG4gICAgcmV0dXJuIDBcbiAgfSxcblxuICAvLyBDb3BpZWQgMS10by0xIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2JpdGNvaW5qcy9iaXA2Ni9ibG9iL21hc3Rlci9pbmRleC5qc1xuICAvLyBBZGFwdGVkIGZvciBVaW50OEFycmF5IGluc3RlYWQgQnVmZmVyXG4gIHNpZ25hdHVyZUV4cG9ydCAob2JqLCBzaWcpIHtcbiAgICBjb25zdCBzaWdSID0gc2lnLnN1YmFycmF5KDAsIDMyKVxuICAgIGNvbnN0IHNpZ1MgPSBzaWcuc3ViYXJyYXkoMzIsIDY0KVxuICAgIGlmIChuZXcgQk4oc2lnUikuY21wKGVjcGFyYW1zLm4pID49IDApIHJldHVybiAxXG4gICAgaWYgKG5ldyBCTihzaWdTKS5jbXAoZWNwYXJhbXMubikgPj0gMCkgcmV0dXJuIDFcblxuICAgIGNvbnN0IHsgb3V0cHV0IH0gPSBvYmpcblxuICAgIC8vIFByZXBhcmUgUlxuICAgIGxldCByID0gb3V0cHV0LnN1YmFycmF5KDQsIDQgKyAzMylcbiAgICByWzBdID0gMHgwMFxuICAgIHIuc2V0KHNpZ1IsIDEpXG5cbiAgICBsZXQgbGVuUiA9IDMzXG4gICAgbGV0IHBvc1IgPSAwXG4gICAgZm9yICg7IGxlblIgPiAxICYmIHJbcG9zUl0gPT09IDB4MDAgJiYgIShyW3Bvc1IgKyAxXSAmIDB4ODApOyAtLWxlblIsICsrcG9zUik7XG5cbiAgICByID0gci5zdWJhcnJheShwb3NSKVxuICAgIGlmIChyWzBdICYgMHg4MCkgcmV0dXJuIDFcbiAgICBpZiAobGVuUiA+IDEgJiYgKHJbMF0gPT09IDB4MDApICYmICEoclsxXSAmIDB4ODApKSByZXR1cm4gMVxuXG4gICAgLy8gUHJlcGFyZSBTXG4gICAgbGV0IHMgPSBvdXRwdXQuc3ViYXJyYXkoNiArIDMzLCA2ICsgMzMgKyAzMylcbiAgICBzWzBdID0gMHgwMFxuICAgIHMuc2V0KHNpZ1MsIDEpXG5cbiAgICBsZXQgbGVuUyA9IDMzXG4gICAgbGV0IHBvc1MgPSAwXG4gICAgZm9yICg7IGxlblMgPiAxICYmIHNbcG9zU10gPT09IDB4MDAgJiYgIShzW3Bvc1MgKyAxXSAmIDB4ODApOyAtLWxlblMsICsrcG9zUyk7XG5cbiAgICBzID0gcy5zdWJhcnJheShwb3NTKVxuICAgIGlmIChzWzBdICYgMHg4MCkgcmV0dXJuIDFcbiAgICBpZiAobGVuUyA+IDEgJiYgKHNbMF0gPT09IDB4MDApICYmICEoc1sxXSAmIDB4ODApKSByZXR1cm4gMVxuXG4gICAgLy8gU2V0IG91dHB1dCBsZW5ndGggZm9yIHJldHVyblxuICAgIG9iai5vdXRwdXRsZW4gPSA2ICsgbGVuUiArIGxlblNcblxuICAgIC8vIE91dHB1dCBpbiBzcGVjaWZpZWQgZm9ybWF0XG4gICAgLy8gMHgzMCBbdG90YWwtbGVuZ3RoXSAweDAyIFtSLWxlbmd0aF0gW1JdIDB4MDIgW1MtbGVuZ3RoXSBbU11cbiAgICBvdXRwdXRbMF0gPSAweDMwXG4gICAgb3V0cHV0WzFdID0gb2JqLm91dHB1dGxlbiAtIDJcbiAgICBvdXRwdXRbMl0gPSAweDAyXG4gICAgb3V0cHV0WzNdID0gci5sZW5ndGhcbiAgICBvdXRwdXQuc2V0KHIsIDQpXG4gICAgb3V0cHV0WzQgKyBsZW5SXSA9IDB4MDJcbiAgICBvdXRwdXRbNSArIGxlblJdID0gcy5sZW5ndGhcbiAgICBvdXRwdXQuc2V0KHMsIDYgKyBsZW5SKVxuXG4gICAgcmV0dXJuIDBcbiAgfSxcblxuICAvLyBDb3BpZWQgMS10by0xIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2JpdGNvaW5qcy9iaXA2Ni9ibG9iL21hc3Rlci9pbmRleC5qc1xuICAvLyBBZGFwdGVkIGZvciBVaW50OEFycmF5IGluc3RlYWQgQnVmZmVyXG4gIHNpZ25hdHVyZUltcG9ydCAob3V0cHV0LCBzaWcpIHtcbiAgICBpZiAoc2lnLmxlbmd0aCA8IDgpIHJldHVybiAxXG4gICAgaWYgKHNpZy5sZW5ndGggPiA3MikgcmV0dXJuIDFcbiAgICBpZiAoc2lnWzBdICE9PSAweDMwKSByZXR1cm4gMVxuICAgIGlmIChzaWdbMV0gIT09IHNpZy5sZW5ndGggLSAyKSByZXR1cm4gMVxuICAgIGlmIChzaWdbMl0gIT09IDB4MDIpIHJldHVybiAxXG5cbiAgICBjb25zdCBsZW5SID0gc2lnWzNdXG4gICAgaWYgKGxlblIgPT09IDApIHJldHVybiAxXG4gICAgaWYgKDUgKyBsZW5SID49IHNpZy5sZW5ndGgpIHJldHVybiAxXG4gICAgaWYgKHNpZ1s0ICsgbGVuUl0gIT09IDB4MDIpIHJldHVybiAxXG5cbiAgICBjb25zdCBsZW5TID0gc2lnWzUgKyBsZW5SXVxuICAgIGlmIChsZW5TID09PSAwKSByZXR1cm4gMVxuICAgIGlmICgoNiArIGxlblIgKyBsZW5TKSAhPT0gc2lnLmxlbmd0aCkgcmV0dXJuIDFcblxuICAgIGlmIChzaWdbNF0gJiAweDgwKSByZXR1cm4gMVxuICAgIGlmIChsZW5SID4gMSAmJiAoc2lnWzRdID09PSAweDAwKSAmJiAhKHNpZ1s1XSAmIDB4ODApKSByZXR1cm4gMVxuXG4gICAgaWYgKHNpZ1tsZW5SICsgNl0gJiAweDgwKSByZXR1cm4gMVxuICAgIGlmIChsZW5TID4gMSAmJiAoc2lnW2xlblIgKyA2XSA9PT0gMHgwMCkgJiYgIShzaWdbbGVuUiArIDddICYgMHg4MCkpIHJldHVybiAxXG5cbiAgICBsZXQgc2lnUiA9IHNpZy5zdWJhcnJheSg0LCA0ICsgbGVuUilcbiAgICBpZiAoc2lnUi5sZW5ndGggPT09IDMzICYmIHNpZ1JbMF0gPT09IDB4MDApIHNpZ1IgPSBzaWdSLnN1YmFycmF5KDEpXG4gICAgaWYgKHNpZ1IubGVuZ3RoID4gMzIpIHJldHVybiAxXG5cbiAgICBsZXQgc2lnUyA9IHNpZy5zdWJhcnJheSg2ICsgbGVuUilcbiAgICBpZiAoc2lnUy5sZW5ndGggPT09IDMzICYmIHNpZ1NbMF0gPT09IDB4MDApIHNpZ1MgPSBzaWdTLnNsaWNlKDEpXG4gICAgaWYgKHNpZ1MubGVuZ3RoID4gMzIpIHRocm93IG5ldyBFcnJvcignUyBsZW5ndGggaXMgdG9vIGxvbmcnKVxuXG4gICAgbGV0IHIgPSBuZXcgQk4oc2lnUilcbiAgICBpZiAoci5jbXAoZWNwYXJhbXMubikgPj0gMCkgciA9IG5ldyBCTigwKVxuXG4gICAgbGV0IHMgPSBuZXcgQk4oc2lnLnN1YmFycmF5KDYgKyBsZW5SKSlcbiAgICBpZiAocy5jbXAoZWNwYXJhbXMubikgPj0gMCkgcyA9IG5ldyBCTigwKVxuXG4gICAgb3V0cHV0LnNldChyLnRvQXJyYXlMaWtlKFVpbnQ4QXJyYXksICdiZScsIDMyKSwgMClcbiAgICBvdXRwdXQuc2V0KHMudG9BcnJheUxpa2UoVWludDhBcnJheSwgJ2JlJywgMzIpLCAzMilcblxuICAgIHJldHVybiAwXG4gIH0sXG5cbiAgZWNkc2FTaWduIChvYmosIG1lc3NhZ2UsIHNlY2tleSwgZGF0YSwgbm9uY2Vmbikge1xuICAgIGlmIChub25jZWZuKSB7XG4gICAgICBjb25zdCBfbm9uY2VmbiA9IG5vbmNlZm5cbiAgICAgIG5vbmNlZm4gPSAoY291bnRlcikgPT4ge1xuICAgICAgICBjb25zdCBub25jZSA9IF9ub25jZWZuKG1lc3NhZ2UsIHNlY2tleSwgbnVsbCwgZGF0YSwgY291bnRlcilcblxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gbm9uY2UgaW5zdGFuY2VvZiBVaW50OEFycmF5ICYmIG5vbmNlLmxlbmd0aCA9PT0gMzJcbiAgICAgICAgaWYgKCFpc1ZhbGlkKSB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgaXMgdGhlIHdheScpXG5cbiAgICAgICAgcmV0dXJuIG5ldyBCTihub25jZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkID0gbmV3IEJOKHNlY2tleSlcbiAgICBpZiAoZC5jbXAoZWNwYXJhbXMubikgPj0gMCB8fCBkLmlzWmVybygpKSByZXR1cm4gMVxuXG4gICAgbGV0IHNpZ1xuICAgIHRyeSB7XG4gICAgICBzaWcgPSBlYy5zaWduKG1lc3NhZ2UsIHNlY2tleSwgeyBjYW5vbmljYWw6IHRydWUsIGs6IG5vbmNlZm4sIHBlcnM6IGRhdGEgfSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfVxuXG4gICAgb2JqLnNpZ25hdHVyZS5zZXQoc2lnLnIudG9BcnJheUxpa2UoVWludDhBcnJheSwgJ2JlJywgMzIpLCAwKVxuICAgIG9iai5zaWduYXR1cmUuc2V0KHNpZy5zLnRvQXJyYXlMaWtlKFVpbnQ4QXJyYXksICdiZScsIDMyKSwgMzIpXG4gICAgb2JqLnJlY2lkID0gc2lnLnJlY292ZXJ5UGFyYW1cblxuICAgIHJldHVybiAwXG4gIH0sXG5cbiAgZWNkc2FWZXJpZnkgKHNpZywgbXNnMzIsIHB1YmtleSkge1xuICAgIGNvbnN0IHNpZ09iaiA9IHsgcjogc2lnLnN1YmFycmF5KDAsIDMyKSwgczogc2lnLnN1YmFycmF5KDMyLCA2NCkgfVxuXG4gICAgY29uc3Qgc2lnciA9IG5ldyBCTihzaWdPYmoucilcbiAgICBjb25zdCBzaWdzID0gbmV3IEJOKHNpZ09iai5zKVxuICAgIGlmIChzaWdyLmNtcChlY3BhcmFtcy5uKSA+PSAwIHx8IHNpZ3MuY21wKGVjcGFyYW1zLm4pID49IDApIHJldHVybiAxXG4gICAgaWYgKHNpZ3MuY21wKGVjLm5oKSA9PT0gMSB8fCBzaWdyLmlzWmVybygpIHx8IHNpZ3MuaXNaZXJvKCkpIHJldHVybiAzXG5cbiAgICBjb25zdCBwYWlyID0gbG9hZFB1YmxpY0tleShwdWJrZXkpXG4gICAgaWYgKHBhaXIgPT09IG51bGwpIHJldHVybiAyXG5cbiAgICBjb25zdCBwb2ludCA9IHBhaXIuZ2V0UHVibGljKClcbiAgICBjb25zdCBpc1ZhbGlkID0gZWMudmVyaWZ5KG1zZzMyLCBzaWdPYmosIHBvaW50KVxuICAgIHJldHVybiBpc1ZhbGlkID8gMCA6IDNcbiAgfSxcblxuICBlY2RzYVJlY292ZXIgKG91dHB1dCwgc2lnLCByZWNpZCwgbXNnMzIpIHtcbiAgICBjb25zdCBzaWdPYmogPSB7IHI6IHNpZy5zbGljZSgwLCAzMiksIHM6IHNpZy5zbGljZSgzMiwgNjQpIH1cblxuICAgIGNvbnN0IHNpZ3IgPSBuZXcgQk4oc2lnT2JqLnIpXG4gICAgY29uc3Qgc2lncyA9IG5ldyBCTihzaWdPYmoucylcbiAgICBpZiAoc2lnci5jbXAoZWNwYXJhbXMubikgPj0gMCB8fCBzaWdzLmNtcChlY3BhcmFtcy5uKSA+PSAwKSByZXR1cm4gMVxuXG4gICAgaWYgKHNpZ3IuaXNaZXJvKCkgfHwgc2lncy5pc1plcm8oKSkgcmV0dXJuIDJcblxuICAgIC8vIENhbiB0aHJvdyBgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCBzZW5jb25kIGtleSBjYW5kaW5hdGUnKTtgXG4gICAgbGV0IHBvaW50XG4gICAgdHJ5IHtcbiAgICAgIHBvaW50ID0gZWMucmVjb3ZlclB1YktleShtc2czMiwgc2lnT2JqLCByZWNpZClcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiAyXG4gICAgfVxuXG4gICAgc2F2ZVB1YmxpY0tleShvdXRwdXQsIHBvaW50KVxuXG4gICAgcmV0dXJuIDBcbiAgfSxcblxuICBlY2RoIChvdXRwdXQsIHB1YmtleSwgc2Vja2V5LCBkYXRhLCBoYXNoZm4sIHhidWYsIHlidWYpIHtcbiAgICBjb25zdCBwYWlyID0gbG9hZFB1YmxpY0tleShwdWJrZXkpXG4gICAgaWYgKHBhaXIgPT09IG51bGwpIHJldHVybiAxXG5cbiAgICBjb25zdCBzY2FsYXIgPSBuZXcgQk4oc2Vja2V5KVxuICAgIGlmIChzY2FsYXIuY21wKGVjcGFyYW1zLm4pID49IDAgfHwgc2NhbGFyLmlzWmVybygpKSByZXR1cm4gMlxuXG4gICAgY29uc3QgcG9pbnQgPSBwYWlyLmdldFB1YmxpYygpLm11bChzY2FsYXIpXG5cbiAgICBpZiAoaGFzaGZuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBwb2ludC5lbmNvZGUobnVsbCwgdHJ1ZSlcbiAgICAgIGNvbnN0IHNoYTI1NiA9IGVjLmhhc2goKS51cGRhdGUoZGF0YSkuZGlnZXN0KClcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7ICsraSkgb3V0cHV0W2ldID0gc2hhMjU2W2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICgheGJ1ZikgeGJ1ZiA9IG5ldyBVaW50OEFycmF5KDMyKVxuICAgICAgY29uc3QgeCA9IHBvaW50LmdldFgoKS50b0FycmF5KCdiZScsIDMyKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgKytpKSB4YnVmW2ldID0geFtpXVxuXG4gICAgICBpZiAoIXlidWYpIHlidWYgPSBuZXcgVWludDhBcnJheSgzMilcbiAgICAgIGNvbnN0IHkgPSBwb2ludC5nZXRZKCkudG9BcnJheSgnYmUnLCAzMilcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7ICsraSkgeWJ1ZltpXSA9IHlbaV1cblxuICAgICAgY29uc3QgaGFzaCA9IGhhc2hmbih4YnVmLCB5YnVmLCBkYXRhKVxuXG4gICAgICBjb25zdCBpc1ZhbGlkID0gaGFzaCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgJiYgaGFzaC5sZW5ndGggPT09IG91dHB1dC5sZW5ndGhcbiAgICAgIGlmICghaXNWYWxpZCkgcmV0dXJuIDJcblxuICAgICAgb3V0cHV0LnNldChoYXNoKVxuICAgIH1cblxuICAgIHJldHVybiAwXG4gIH1cbn1cbiIsImNvbnN0IGVycm9ycyA9IHtcbiAgSU1QT1NTSUJMRV9DQVNFOiAnSW1wb3NzaWJsZSBjYXNlLiBQbGVhc2UgY3JlYXRlIGlzc3VlLicsXG4gIFRXRUFLX0FERDpcbiAgICAnVGhlIHR3ZWFrIHdhcyBvdXQgb2YgcmFuZ2Ugb3IgdGhlIHJlc3VsdGVkIHByaXZhdGUga2V5IGlzIGludmFsaWQnLFxuICBUV0VBS19NVUw6ICdUaGUgdHdlYWsgd2FzIG91dCBvZiByYW5nZSBvciBlcXVhbCB0byB6ZXJvJyxcbiAgQ09OVEVYVF9SQU5ET01JWkVfVU5LTk9XOiAnVW5rbm93IGVycm9yIG9uIGNvbnRleHQgcmFuZG9taXphdGlvbicsXG4gIFNFQ0tFWV9JTlZBTElEOiAnUHJpdmF0ZSBLZXkgaXMgaW52YWxpZCcsXG4gIFBVQktFWV9QQVJTRTogJ1B1YmxpYyBLZXkgY291bGQgbm90IGJlIHBhcnNlZCcsXG4gIFBVQktFWV9TRVJJQUxJWkU6ICdQdWJsaWMgS2V5IHNlcmlhbGl6YXRpb24gZXJyb3InLFxuICBQVUJLRVlfQ09NQklORTogJ1RoZSBzdW0gb2YgdGhlIHB1YmxpYyBrZXlzIGlzIG5vdCB2YWxpZCcsXG4gIFNJR19QQVJTRTogJ1NpZ25hdHVyZSBjb3VsZCBub3QgYmUgcGFyc2VkJyxcbiAgU0lHTjogJ1RoZSBub25jZSBnZW5lcmF0aW9uIGZ1bmN0aW9uIGZhaWxlZCwgb3IgdGhlIHByaXZhdGUga2V5IHdhcyBpbnZhbGlkJyxcbiAgUkVDT1ZFUjogJ1B1YmxpYyBrZXkgY291bGQgbm90IGJlIHJlY292ZXInLFxuICBFQ0RIOiAnU2NhbGFyIHdhcyBpbnZhbGlkICh6ZXJvIG9yIG92ZXJmbG93KSdcbn1cblxuZnVuY3Rpb24gYXNzZXJ0IChjb25kLCBtc2cpIHtcbiAgaWYgKCFjb25kKSB0aHJvdyBuZXcgRXJyb3IobXNnKVxufVxuXG5mdW5jdGlvbiBpc1VpbnQ4QXJyYXkgKG5hbWUsIHZhbHVlLCBsZW5ndGgpIHtcbiAgYXNzZXJ0KHZhbHVlIGluc3RhbmNlb2YgVWludDhBcnJheSwgYEV4cGVjdGVkICR7bmFtZX0gdG8gYmUgYW4gVWludDhBcnJheWApXG5cbiAgaWYgKGxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobGVuZ3RoKSkge1xuICAgICAgY29uc3QgbnVtYmVycyA9IGxlbmd0aC5qb2luKCcsICcpXG4gICAgICBjb25zdCBtc2cgPSBgRXhwZWN0ZWQgJHtuYW1lfSB0byBiZSBhbiBVaW50OEFycmF5IHdpdGggbGVuZ3RoIFske251bWJlcnN9XWBcbiAgICAgIGFzc2VydChsZW5ndGguaW5jbHVkZXModmFsdWUubGVuZ3RoKSwgbXNnKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtc2cgPSBgRXhwZWN0ZWQgJHtuYW1lfSB0byBiZSBhbiBVaW50OEFycmF5IHdpdGggbGVuZ3RoICR7bGVuZ3RofWBcbiAgICAgIGFzc2VydCh2YWx1ZS5sZW5ndGggPT09IGxlbmd0aCwgbXNnKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc0NvbXByZXNzZWQgKHZhbHVlKSB7XG4gIGFzc2VydCh0b1R5cGVTdHJpbmcodmFsdWUpID09PSAnQm9vbGVhbicsICdFeHBlY3RlZCBjb21wcmVzc2VkIHRvIGJlIGEgQm9vbGVhbicpXG59XG5cbmZ1bmN0aW9uIGdldEFzc2VydGVkT3V0cHV0IChvdXRwdXQgPSAobGVuKSA9PiBuZXcgVWludDhBcnJheShsZW4pLCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiBvdXRwdXQgPT09ICdmdW5jdGlvbicpIG91dHB1dCA9IG91dHB1dChsZW5ndGgpXG4gIGlzVWludDhBcnJheSgnb3V0cHV0Jywgb3V0cHV0LCBsZW5ndGgpXG4gIHJldHVybiBvdXRwdXRcbn1cblxuZnVuY3Rpb24gdG9UeXBlU3RyaW5nICh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKS5zbGljZSg4LCAtMSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSAoc2VjcDI1NmsxKSA9PiB7XG4gIHJldHVybiB7XG4gICAgY29udGV4dFJhbmRvbWl6ZSAoc2VlZCkge1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBzZWVkID09PSBudWxsIHx8IHNlZWQgaW5zdGFuY2VvZiBVaW50OEFycmF5LFxuICAgICAgICAnRXhwZWN0ZWQgc2VlZCB0byBiZSBhbiBVaW50OEFycmF5IG9yIG51bGwnXG4gICAgICApXG4gICAgICBpZiAoc2VlZCAhPT0gbnVsbCkgaXNVaW50OEFycmF5KCdzZWVkJywgc2VlZCwgMzIpXG5cbiAgICAgIHN3aXRjaCAoc2VjcDI1NmsxLmNvbnRleHRSYW5kb21pemUoc2VlZCkpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuQ09OVEVYVF9SQU5ET01JWkVfVU5LTk9XKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBwcml2YXRlS2V5VmVyaWZ5IChzZWNrZXkpIHtcbiAgICAgIGlzVWludDhBcnJheSgncHJpdmF0ZSBrZXknLCBzZWNrZXksIDMyKVxuXG4gICAgICByZXR1cm4gc2VjcDI1NmsxLnByaXZhdGVLZXlWZXJpZnkoc2Vja2V5KSA9PT0gMFxuICAgIH0sXG5cbiAgICBwcml2YXRlS2V5TmVnYXRlIChzZWNrZXkpIHtcbiAgICAgIGlzVWludDhBcnJheSgncHJpdmF0ZSBrZXknLCBzZWNrZXksIDMyKVxuXG4gICAgICBzd2l0Y2ggKHNlY3AyNTZrMS5wcml2YXRlS2V5TmVnYXRlKHNlY2tleSkpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHJldHVybiBzZWNrZXlcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuSU1QT1NTSUJMRV9DQVNFKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBwcml2YXRlS2V5VHdlYWtBZGQgKHNlY2tleSwgdHdlYWspIHtcbiAgICAgIGlzVWludDhBcnJheSgncHJpdmF0ZSBrZXknLCBzZWNrZXksIDMyKVxuICAgICAgaXNVaW50OEFycmF5KCd0d2VhaycsIHR3ZWFrLCAzMilcblxuICAgICAgc3dpdGNoIChzZWNwMjU2azEucHJpdmF0ZUtleVR3ZWFrQWRkKHNlY2tleSwgdHdlYWspKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICByZXR1cm4gc2Vja2V5XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLlRXRUFLX0FERClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcHJpdmF0ZUtleVR3ZWFrTXVsIChzZWNrZXksIHR3ZWFrKSB7XG4gICAgICBpc1VpbnQ4QXJyYXkoJ3ByaXZhdGUga2V5Jywgc2Vja2V5LCAzMilcbiAgICAgIGlzVWludDhBcnJheSgndHdlYWsnLCB0d2VhaywgMzIpXG5cbiAgICAgIHN3aXRjaCAoc2VjcDI1NmsxLnByaXZhdGVLZXlUd2Vha011bChzZWNrZXksIHR3ZWFrKSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgcmV0dXJuIHNlY2tleVxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5UV0VBS19NVUwpXG4gICAgICB9XG4gICAgfSxcblxuICAgIHB1YmxpY0tleVZlcmlmeSAocHVia2V5KSB7XG4gICAgICBpc1VpbnQ4QXJyYXkoJ3B1YmxpYyBrZXknLCBwdWJrZXksIFszMywgNjVdKVxuXG4gICAgICByZXR1cm4gc2VjcDI1NmsxLnB1YmxpY0tleVZlcmlmeShwdWJrZXkpID09PSAwXG4gICAgfSxcblxuICAgIHB1YmxpY0tleUNyZWF0ZSAoc2Vja2V5LCBjb21wcmVzc2VkID0gdHJ1ZSwgb3V0cHV0KSB7XG4gICAgICBpc1VpbnQ4QXJyYXkoJ3ByaXZhdGUga2V5Jywgc2Vja2V5LCAzMilcbiAgICAgIGlzQ29tcHJlc3NlZChjb21wcmVzc2VkKVxuICAgICAgb3V0cHV0ID0gZ2V0QXNzZXJ0ZWRPdXRwdXQob3V0cHV0LCBjb21wcmVzc2VkID8gMzMgOiA2NSlcblxuICAgICAgc3dpdGNoIChzZWNwMjU2azEucHVibGljS2V5Q3JlYXRlKG91dHB1dCwgc2Vja2V5KSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5TRUNLRVlfSU5WQUxJRClcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuUFVCS0VZX1NFUklBTElaRSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcHVibGljS2V5Q29udmVydCAocHVia2V5LCBjb21wcmVzc2VkID0gdHJ1ZSwgb3V0cHV0KSB7XG4gICAgICBpc1VpbnQ4QXJyYXkoJ3B1YmxpYyBrZXknLCBwdWJrZXksIFszMywgNjVdKVxuICAgICAgaXNDb21wcmVzc2VkKGNvbXByZXNzZWQpXG4gICAgICBvdXRwdXQgPSBnZXRBc3NlcnRlZE91dHB1dChvdXRwdXQsIGNvbXByZXNzZWQgPyAzMyA6IDY1KVxuXG4gICAgICBzd2l0Y2ggKHNlY3AyNTZrMS5wdWJsaWNLZXlDb252ZXJ0KG91dHB1dCwgcHVia2V5KSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5QVUJLRVlfUEFSU0UpXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLlBVQktFWV9TRVJJQUxJWkUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIHB1YmxpY0tleU5lZ2F0ZSAocHVia2V5LCBjb21wcmVzc2VkID0gdHJ1ZSwgb3V0cHV0KSB7XG4gICAgICBpc1VpbnQ4QXJyYXkoJ3B1YmxpYyBrZXknLCBwdWJrZXksIFszMywgNjVdKVxuICAgICAgaXNDb21wcmVzc2VkKGNvbXByZXNzZWQpXG4gICAgICBvdXRwdXQgPSBnZXRBc3NlcnRlZE91dHB1dChvdXRwdXQsIGNvbXByZXNzZWQgPyAzMyA6IDY1KVxuXG4gICAgICBzd2l0Y2ggKHNlY3AyNTZrMS5wdWJsaWNLZXlOZWdhdGUob3V0cHV0LCBwdWJrZXkpKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLlBVQktFWV9QQVJTRSlcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuSU1QT1NTSUJMRV9DQVNFKVxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5QVUJLRVlfU0VSSUFMSVpFKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBwdWJsaWNLZXlDb21iaW5lIChwdWJrZXlzLCBjb21wcmVzc2VkID0gdHJ1ZSwgb3V0cHV0KSB7XG4gICAgICBhc3NlcnQoQXJyYXkuaXNBcnJheShwdWJrZXlzKSwgJ0V4cGVjdGVkIHB1YmxpYyBrZXlzIHRvIGJlIGFuIEFycmF5JylcbiAgICAgIGFzc2VydChwdWJrZXlzLmxlbmd0aCA+IDAsICdFeHBlY3RlZCBwdWJsaWMga2V5cyBhcnJheSB3aWxsIGhhdmUgbW9yZSB0aGFuIHplcm8gaXRlbXMnKVxuICAgICAgZm9yIChjb25zdCBwdWJrZXkgb2YgcHVia2V5cykge1xuICAgICAgICBpc1VpbnQ4QXJyYXkoJ3B1YmxpYyBrZXknLCBwdWJrZXksIFszMywgNjVdKVxuICAgICAgfVxuICAgICAgaXNDb21wcmVzc2VkKGNvbXByZXNzZWQpXG4gICAgICBvdXRwdXQgPSBnZXRBc3NlcnRlZE91dHB1dChvdXRwdXQsIGNvbXByZXNzZWQgPyAzMyA6IDY1KVxuXG4gICAgICBzd2l0Y2ggKHNlY3AyNTZrMS5wdWJsaWNLZXlDb21iaW5lKG91dHB1dCwgcHVia2V5cykpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHJldHVybiBvdXRwdXRcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuUFVCS0VZX1BBUlNFKVxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5QVUJLRVlfQ09NQklORSlcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuUFVCS0VZX1NFUklBTElaRSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcHVibGljS2V5VHdlYWtBZGQgKHB1YmtleSwgdHdlYWssIGNvbXByZXNzZWQgPSB0cnVlLCBvdXRwdXQpIHtcbiAgICAgIGlzVWludDhBcnJheSgncHVibGljIGtleScsIHB1YmtleSwgWzMzLCA2NV0pXG4gICAgICBpc1VpbnQ4QXJyYXkoJ3R3ZWFrJywgdHdlYWssIDMyKVxuICAgICAgaXNDb21wcmVzc2VkKGNvbXByZXNzZWQpXG4gICAgICBvdXRwdXQgPSBnZXRBc3NlcnRlZE91dHB1dChvdXRwdXQsIGNvbXByZXNzZWQgPyAzMyA6IDY1KVxuXG4gICAgICBzd2l0Y2ggKHNlY3AyNTZrMS5wdWJsaWNLZXlUd2Vha0FkZChvdXRwdXQsIHB1YmtleSwgdHdlYWspKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLlBVQktFWV9QQVJTRSlcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuVFdFQUtfQUREKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBwdWJsaWNLZXlUd2Vha011bCAocHVia2V5LCB0d2VhaywgY29tcHJlc3NlZCA9IHRydWUsIG91dHB1dCkge1xuICAgICAgaXNVaW50OEFycmF5KCdwdWJsaWMga2V5JywgcHVia2V5LCBbMzMsIDY1XSlcbiAgICAgIGlzVWludDhBcnJheSgndHdlYWsnLCB0d2VhaywgMzIpXG4gICAgICBpc0NvbXByZXNzZWQoY29tcHJlc3NlZClcbiAgICAgIG91dHB1dCA9IGdldEFzc2VydGVkT3V0cHV0KG91dHB1dCwgY29tcHJlc3NlZCA/IDMzIDogNjUpXG5cbiAgICAgIHN3aXRjaCAoc2VjcDI1NmsxLnB1YmxpY0tleVR3ZWFrTXVsKG91dHB1dCwgcHVia2V5LCB0d2VhaykpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHJldHVybiBvdXRwdXRcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuUFVCS0VZX1BBUlNFKVxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5UV0VBS19NVUwpXG4gICAgICB9XG4gICAgfSxcblxuICAgIHNpZ25hdHVyZU5vcm1hbGl6ZSAoc2lnKSB7XG4gICAgICBpc1VpbnQ4QXJyYXkoJ3NpZ25hdHVyZScsIHNpZywgNjQpXG5cbiAgICAgIHN3aXRjaCAoc2VjcDI1NmsxLnNpZ25hdHVyZU5vcm1hbGl6ZShzaWcpKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICByZXR1cm4gc2lnXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLlNJR19QQVJTRSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2lnbmF0dXJlRXhwb3J0IChzaWcsIG91dHB1dCkge1xuICAgICAgaXNVaW50OEFycmF5KCdzaWduYXR1cmUnLCBzaWcsIDY0KVxuICAgICAgb3V0cHV0ID0gZ2V0QXNzZXJ0ZWRPdXRwdXQob3V0cHV0LCA3MilcblxuICAgICAgY29uc3Qgb2JqID0geyBvdXRwdXQsIG91dHB1dGxlbjogNzIgfVxuICAgICAgc3dpdGNoIChzZWNwMjU2azEuc2lnbmF0dXJlRXhwb3J0KG9iaiwgc2lnKSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgcmV0dXJuIG91dHB1dC5zbGljZSgwLCBvYmoub3V0cHV0bGVuKVxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5TSUdfUEFSU0UpXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLklNUE9TU0lCTEVfQ0FTRSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2lnbmF0dXJlSW1wb3J0IChzaWcsIG91dHB1dCkge1xuICAgICAgaXNVaW50OEFycmF5KCdzaWduYXR1cmUnLCBzaWcpXG4gICAgICBvdXRwdXQgPSBnZXRBc3NlcnRlZE91dHB1dChvdXRwdXQsIDY0KVxuXG4gICAgICBzd2l0Y2ggKHNlY3AyNTZrMS5zaWduYXR1cmVJbXBvcnQob3V0cHV0LCBzaWcpKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLlNJR19QQVJTRSlcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuSU1QT1NTSUJMRV9DQVNFKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBlY2RzYVNpZ24gKG1zZzMyLCBzZWNrZXksIG9wdGlvbnMgPSB7fSwgb3V0cHV0KSB7XG4gICAgICBpc1VpbnQ4QXJyYXkoJ21lc3NhZ2UnLCBtc2czMiwgMzIpXG4gICAgICBpc1VpbnQ4QXJyYXkoJ3ByaXZhdGUga2V5Jywgc2Vja2V5LCAzMilcbiAgICAgIGFzc2VydCh0b1R5cGVTdHJpbmcob3B0aW9ucykgPT09ICdPYmplY3QnLCAnRXhwZWN0ZWQgb3B0aW9ucyB0byBiZSBhbiBPYmplY3QnKVxuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAhPT0gdW5kZWZpbmVkKSBpc1VpbnQ4QXJyYXkoJ29wdGlvbnMuZGF0YScsIG9wdGlvbnMuZGF0YSlcbiAgICAgIGlmIChvcHRpb25zLm5vbmNlZm4gIT09IHVuZGVmaW5lZCkgYXNzZXJ0KHRvVHlwZVN0cmluZyhvcHRpb25zLm5vbmNlZm4pID09PSAnRnVuY3Rpb24nLCAnRXhwZWN0ZWQgb3B0aW9ucy5ub25jZWZuIHRvIGJlIGEgRnVuY3Rpb24nKVxuICAgICAgb3V0cHV0ID0gZ2V0QXNzZXJ0ZWRPdXRwdXQob3V0cHV0LCA2NClcblxuICAgICAgY29uc3Qgb2JqID0geyBzaWduYXR1cmU6IG91dHB1dCwgcmVjaWQ6IG51bGwgfVxuICAgICAgc3dpdGNoIChzZWNwMjU2azEuZWNkc2FTaWduKG9iaiwgbXNnMzIsIHNlY2tleSwgb3B0aW9ucy5kYXRhLCBvcHRpb25zLm5vbmNlZm4pKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICByZXR1cm4gb2JqXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLlNJR04pXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLklNUE9TU0lCTEVfQ0FTRSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZWNkc2FWZXJpZnkgKHNpZywgbXNnMzIsIHB1YmtleSkge1xuICAgICAgaXNVaW50OEFycmF5KCdzaWduYXR1cmUnLCBzaWcsIDY0KVxuICAgICAgaXNVaW50OEFycmF5KCdtZXNzYWdlJywgbXNnMzIsIDMyKVxuICAgICAgaXNVaW50OEFycmF5KCdwdWJsaWMga2V5JywgcHVia2V5LCBbMzMsIDY1XSlcblxuICAgICAgc3dpdGNoIChzZWNwMjU2azEuZWNkc2FWZXJpZnkoc2lnLCBtc2czMiwgcHVia2V5KSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5TSUdfUEFSU0UpXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLlBVQktFWV9QQVJTRSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZWNkc2FSZWNvdmVyIChzaWcsIHJlY2lkLCBtc2czMiwgY29tcHJlc3NlZCA9IHRydWUsIG91dHB1dCkge1xuICAgICAgaXNVaW50OEFycmF5KCdzaWduYXR1cmUnLCBzaWcsIDY0KVxuICAgICAgYXNzZXJ0KFxuICAgICAgICB0b1R5cGVTdHJpbmcocmVjaWQpID09PSAnTnVtYmVyJyAmJlxuICAgICAgICAgIHJlY2lkID49IDAgJiZcbiAgICAgICAgICByZWNpZCA8PSAzLFxuICAgICAgICAnRXhwZWN0ZWQgcmVjb3ZlcnkgaWQgdG8gYmUgYSBOdW1iZXIgd2l0aGluIGludGVydmFsIFswLCAzXSdcbiAgICAgIClcbiAgICAgIGlzVWludDhBcnJheSgnbWVzc2FnZScsIG1zZzMyLCAzMilcbiAgICAgIGlzQ29tcHJlc3NlZChjb21wcmVzc2VkKVxuICAgICAgb3V0cHV0ID0gZ2V0QXNzZXJ0ZWRPdXRwdXQob3V0cHV0LCBjb21wcmVzc2VkID8gMzMgOiA2NSlcblxuICAgICAgc3dpdGNoIChzZWNwMjU2azEuZWNkc2FSZWNvdmVyKG91dHB1dCwgc2lnLCByZWNpZCwgbXNnMzIpKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLlNJR19QQVJTRSlcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuUkVDT1ZFUilcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMuSU1QT1NTSUJMRV9DQVNFKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBlY2RoIChwdWJrZXksIHNlY2tleSwgb3B0aW9ucyA9IHt9LCBvdXRwdXQpIHtcbiAgICAgIGlzVWludDhBcnJheSgncHVibGljIGtleScsIHB1YmtleSwgWzMzLCA2NV0pXG4gICAgICBpc1VpbnQ4QXJyYXkoJ3ByaXZhdGUga2V5Jywgc2Vja2V5LCAzMilcbiAgICAgIGFzc2VydCh0b1R5cGVTdHJpbmcob3B0aW9ucykgPT09ICdPYmplY3QnLCAnRXhwZWN0ZWQgb3B0aW9ucyB0byBiZSBhbiBPYmplY3QnKVxuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAhPT0gdW5kZWZpbmVkKSBpc1VpbnQ4QXJyYXkoJ29wdGlvbnMuZGF0YScsIG9wdGlvbnMuZGF0YSlcbiAgICAgIGlmIChvcHRpb25zLmhhc2hmbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFzc2VydCh0b1R5cGVTdHJpbmcob3B0aW9ucy5oYXNoZm4pID09PSAnRnVuY3Rpb24nLCAnRXhwZWN0ZWQgb3B0aW9ucy5oYXNoZm4gdG8gYmUgYSBGdW5jdGlvbicpXG4gICAgICAgIGlmIChvcHRpb25zLnhidWYgIT09IHVuZGVmaW5lZCkgaXNVaW50OEFycmF5KCdvcHRpb25zLnhidWYnLCBvcHRpb25zLnhidWYsIDMyKVxuICAgICAgICBpZiAob3B0aW9ucy55YnVmICE9PSB1bmRlZmluZWQpIGlzVWludDhBcnJheSgnb3B0aW9ucy55YnVmJywgb3B0aW9ucy55YnVmLCAzMilcbiAgICAgICAgaXNVaW50OEFycmF5KCdvdXRwdXQnLCBvdXRwdXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQgPSBnZXRBc3NlcnRlZE91dHB1dChvdXRwdXQsIDMyKVxuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHNlY3AyNTZrMS5lY2RoKG91dHB1dCwgcHVia2V5LCBzZWNrZXksIG9wdGlvbnMuZGF0YSwgb3B0aW9ucy5oYXNoZm4sIG9wdGlvbnMueGJ1Ziwgb3B0aW9ucy55YnVmKSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5QVUJLRVlfUEFSU0UpXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLkVDREgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8qKlxuICogQSBgU3RydWN0RmFpbHVyZWAgcmVwcmVzZW50cyBhIHNpbmdsZSBzcGVjaWZpYyBmYWlsdXJlIGluIHZhbGlkYXRpb24uXG4gKi9cblxuLyoqXG4gKiBgU3RydWN0RXJyb3JgIG9iamVjdHMgYXJlIHRocm93biAob3IgcmV0dXJuZWQpIHdoZW4gdmFsaWRhdGlvbiBmYWlscy5cbiAqXG4gKiBWYWxpZGF0aW9uIGxvZ2ljIGlzIGRlc2lnbiB0byBleGl0IGVhcmx5IGZvciBtYXhpbXVtIHBlcmZvcm1hbmNlLiBUaGUgZXJyb3JcbiAqIHJlcHJlc2VudHMgdGhlIGZpcnN0IGVycm9yIGVuY291bnRlcmVkIGR1cmluZyB2YWxpZGF0aW9uLiBGb3IgbW9yZSBkZXRhaWwsXG4gKiB0aGUgYGVycm9yLmZhaWx1cmVzYCBwcm9wZXJ0eSBpcyBhIGdlbmVyYXRvciBmdW5jdGlvbiB0aGF0IGNhbiBiZSBydW4gdG9cbiAqIGNvbnRpbnVlIHZhbGlkYXRpb24gYW5kIHJlY2VpdmUgYWxsIHRoZSBmYWlsdXJlcyBpbiB0aGUgZGF0YS5cbiAqL1xuY2xhc3MgU3RydWN0RXJyb3IgZXh0ZW5kcyBUeXBlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihmYWlsdXJlLCBmYWlsdXJlcykge1xuICAgIGxldCBjYWNoZWQ7XG4gICAgY29uc3Qge1xuICAgICAgbWVzc2FnZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9ID0gZmFpbHVyZTtcbiAgICBjb25zdCB7XG4gICAgICBwYXRoXG4gICAgfSA9IGZhaWx1cmU7XG4gICAgY29uc3QgbXNnID0gcGF0aC5sZW5ndGggPT09IDAgPyBtZXNzYWdlIDogYEF0IHBhdGg6ICR7cGF0aC5qb2luKCcuJyl9IC0tICR7bWVzc2FnZX1gO1xuICAgIHN1cGVyKG1zZyk7XG4gICAgdGhpcy52YWx1ZSA9IHZvaWQgMDtcbiAgICB0aGlzLmtleSA9IHZvaWQgMDtcbiAgICB0aGlzLnR5cGUgPSB2b2lkIDA7XG4gICAgdGhpcy5yZWZpbmVtZW50ID0gdm9pZCAwO1xuICAgIHRoaXMucGF0aCA9IHZvaWQgMDtcbiAgICB0aGlzLmJyYW5jaCA9IHZvaWQgMDtcbiAgICB0aGlzLmZhaWx1cmVzID0gdm9pZCAwO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcmVzdCk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXG4gICAgdGhpcy5mYWlsdXJlcyA9ICgpID0+IHtcbiAgICAgIHJldHVybiBjYWNoZWQgPz8gKGNhY2hlZCA9IFtmYWlsdXJlLCAuLi5mYWlsdXJlcygpXSk7XG4gICAgfTtcbiAgfVxuXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhbiBpdGVyYXRvci5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYWJsZSh4KSB7XG4gIHJldHVybiBpc09iamVjdCh4KSAmJiB0eXBlb2YgeFtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nO1xufVxuLyoqXG4gKiBDaGVjayBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0LlxuICovXG5cblxuZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT0gbnVsbDtcbn1cbi8qKlxuICogQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdC5cbiAqL1xuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHgpIHtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoeCk7XG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuLyoqXG4gKiBSZXR1cm4gYSB2YWx1ZSBhcyBhIHByaW50YWJsZSBzdHJpbmcuXG4gKi9cblxuZnVuY3Rpb24gcHJpbnQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiBgJHt2YWx1ZX1gO1xufVxuLyoqXG4gKiBTaGlmdHMgKHJlbW92ZXMgYW5kIHJldHVybnMpIHRoZSBmaXJzdCB2YWx1ZSBmcm9tIHRoZSBgaW5wdXRgIGl0ZXJhdG9yLlxuICogTGlrZSBgQXJyYXkucHJvdG90eXBlLnNoaWZ0KClgIGJ1dCBmb3IgYW4gYEl0ZXJhdG9yYC5cbiAqL1xuXG5mdW5jdGlvbiBzaGlmdEl0ZXJhdG9yKGlucHV0KSB7XG4gIGNvbnN0IHtcbiAgICBkb25lLFxuICAgIHZhbHVlXG4gIH0gPSBpbnB1dC5uZXh0KCk7XG4gIHJldHVybiBkb25lID8gdW5kZWZpbmVkIDogdmFsdWU7XG59XG4vKipcbiAqIENvbnZlcnQgYSBzaW5nbGUgdmFsaWRhdGlvbiByZXN1bHQgdG8gYSBmYWlsdXJlLlxuICovXG5cbmZ1bmN0aW9uIHRvRmFpbHVyZShyZXN1bHQsIGNvbnRleHQsIHN0cnVjdCwgdmFsdWUpIHtcbiAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgcmVzdWx0ID0ge307XG4gIH0gZWxzZSBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXN1bHQgPSB7XG4gICAgICBtZXNzYWdlOiByZXN1bHRcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qge1xuICAgIHBhdGgsXG4gICAgYnJhbmNoXG4gIH0gPSBjb250ZXh0O1xuICBjb25zdCB7XG4gICAgdHlwZVxuICB9ID0gc3RydWN0O1xuICBjb25zdCB7XG4gICAgcmVmaW5lbWVudCxcbiAgICBtZXNzYWdlID0gYEV4cGVjdGVkIGEgdmFsdWUgb2YgdHlwZSBcXGAke3R5cGV9XFxgJHtyZWZpbmVtZW50ID8gYCB3aXRoIHJlZmluZW1lbnQgXFxgJHtyZWZpbmVtZW50fVxcYGAgOiAnJ30sIGJ1dCByZWNlaXZlZDogXFxgJHtwcmludCh2YWx1ZSl9XFxgYFxuICB9ID0gcmVzdWx0O1xuICByZXR1cm4ge1xuICAgIHZhbHVlLFxuICAgIHR5cGUsXG4gICAgcmVmaW5lbWVudCxcbiAgICBrZXk6IHBhdGhbcGF0aC5sZW5ndGggLSAxXSxcbiAgICBwYXRoLFxuICAgIGJyYW5jaCxcbiAgICAuLi5yZXN1bHQsXG4gICAgbWVzc2FnZVxuICB9O1xufVxuLyoqXG4gKiBDb252ZXJ0IGEgdmFsaWRhdGlvbiByZXN1bHQgdG8gYW4gaXRlcmFibGUgb2YgZmFpbHVyZXMuXG4gKi9cblxuZnVuY3Rpb24qIHRvRmFpbHVyZXMocmVzdWx0LCBjb250ZXh0LCBzdHJ1Y3QsIHZhbHVlKSB7XG4gIGlmICghaXNJdGVyYWJsZShyZXN1bHQpKSB7XG4gICAgcmVzdWx0ID0gW3Jlc3VsdF07XG4gIH1cblxuICBmb3IgKGNvbnN0IHIgb2YgcmVzdWx0KSB7XG4gICAgY29uc3QgZmFpbHVyZSA9IHRvRmFpbHVyZShyLCBjb250ZXh0LCBzdHJ1Y3QsIHZhbHVlKTtcblxuICAgIGlmIChmYWlsdXJlKSB7XG4gICAgICB5aWVsZCBmYWlsdXJlO1xuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBDaGVjayBhIHZhbHVlIGFnYWluc3QgYSBzdHJ1Y3QsIHRyYXZlcnNpbmcgZGVlcGx5IGludG8gbmVzdGVkIHZhbHVlcywgYW5kXG4gKiByZXR1cm5pbmcgYW4gaXRlcmF0b3Igb2YgZmFpbHVyZXMgb3Igc3VjY2Vzcy5cbiAqL1xuXG5mdW5jdGlvbiogcnVuKHZhbHVlLCBzdHJ1Y3QsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBwYXRoID0gW10sXG4gICAgYnJhbmNoID0gW3ZhbHVlXSxcbiAgICBjb2VyY2UgPSBmYWxzZSxcbiAgICBtYXNrID0gZmFsc2VcbiAgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGN0eCA9IHtcbiAgICBwYXRoLFxuICAgIGJyYW5jaFxuICB9O1xuXG4gIGlmIChjb2VyY2UpIHtcbiAgICB2YWx1ZSA9IHN0cnVjdC5jb2VyY2VyKHZhbHVlLCBjdHgpO1xuXG4gICAgaWYgKG1hc2sgJiYgc3RydWN0LnR5cGUgIT09ICd0eXBlJyAmJiBpc09iamVjdChzdHJ1Y3Quc2NoZW1hKSAmJiBpc09iamVjdCh2YWx1ZSkgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZSkge1xuICAgICAgICBpZiAoc3RydWN0LnNjaGVtYVtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgdmFsdWVba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCBzdGF0dXMgPSAndmFsaWQnO1xuXG4gIGZvciAoY29uc3QgZmFpbHVyZSBvZiBzdHJ1Y3QudmFsaWRhdG9yKHZhbHVlLCBjdHgpKSB7XG4gICAgc3RhdHVzID0gJ25vdF92YWxpZCc7XG4gICAgeWllbGQgW2ZhaWx1cmUsIHVuZGVmaW5lZF07XG4gIH1cblxuICBmb3IgKGxldCBbaywgdiwgc10gb2Ygc3RydWN0LmVudHJpZXModmFsdWUsIGN0eCkpIHtcbiAgICBjb25zdCB0cyA9IHJ1bih2LCBzLCB7XG4gICAgICBwYXRoOiBrID09PSB1bmRlZmluZWQgPyBwYXRoIDogWy4uLnBhdGgsIGtdLFxuICAgICAgYnJhbmNoOiBrID09PSB1bmRlZmluZWQgPyBicmFuY2ggOiBbLi4uYnJhbmNoLCB2XSxcbiAgICAgIGNvZXJjZSxcbiAgICAgIG1hc2tcbiAgICB9KTtcblxuICAgIGZvciAoY29uc3QgdCBvZiB0cykge1xuICAgICAgaWYgKHRbMF0pIHtcbiAgICAgICAgc3RhdHVzID0gdFswXS5yZWZpbmVtZW50ICE9IG51bGwgPyAnbm90X3JlZmluZWQnIDogJ25vdF92YWxpZCc7XG4gICAgICAgIHlpZWxkIFt0WzBdLCB1bmRlZmluZWRdO1xuICAgICAgfSBlbHNlIGlmIChjb2VyY2UpIHtcbiAgICAgICAgdiA9IHRbMV07XG5cbiAgICAgICAgaWYgKGsgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhbHVlID0gdjtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgIHZhbHVlLnNldChrLCB2KTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgIHZhbHVlLmFkZCh2KTtcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB2YWx1ZVtrXSA9IHY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdHVzICE9PSAnbm90X3ZhbGlkJykge1xuICAgIGZvciAoY29uc3QgZmFpbHVyZSBvZiBzdHJ1Y3QucmVmaW5lcih2YWx1ZSwgY3R4KSkge1xuICAgICAgc3RhdHVzID0gJ25vdF9yZWZpbmVkJztcbiAgICAgIHlpZWxkIFtmYWlsdXJlLCB1bmRlZmluZWRdO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0dXMgPT09ICd2YWxpZCcpIHtcbiAgICB5aWVsZCBbdW5kZWZpbmVkLCB2YWx1ZV07XG4gIH1cbn1cblxuLyoqXG4gKiBgU3RydWN0YCBvYmplY3RzIGVuY2Fwc3VsYXRlIHRoZSB2YWxpZGF0aW9uIGxvZ2ljIGZvciBhIHNwZWNpZmljIHR5cGUgb2ZcbiAqIHZhbHVlcy4gT25jZSBjb25zdHJ1Y3RlZCwgeW91IHVzZSB0aGUgYGFzc2VydGAsIGBpc2Agb3IgYHZhbGlkYXRlYCBoZWxwZXJzIHRvXG4gKiB2YWxpZGF0ZSB1bmtub3duIGlucHV0IGRhdGEgYWdhaW5zdCB0aGUgc3RydWN0LlxuICovXG5cbmNsYXNzIFN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgdGhpcy5UWVBFID0gdm9pZCAwO1xuICAgIHRoaXMudHlwZSA9IHZvaWQgMDtcbiAgICB0aGlzLnNjaGVtYSA9IHZvaWQgMDtcbiAgICB0aGlzLmNvZXJjZXIgPSB2b2lkIDA7XG4gICAgdGhpcy52YWxpZGF0b3IgPSB2b2lkIDA7XG4gICAgdGhpcy5yZWZpbmVyID0gdm9pZCAwO1xuICAgIHRoaXMuZW50cmllcyA9IHZvaWQgMDtcbiAgICBjb25zdCB7XG4gICAgICB0eXBlLFxuICAgICAgc2NoZW1hLFxuICAgICAgdmFsaWRhdG9yLFxuICAgICAgcmVmaW5lcixcbiAgICAgIGNvZXJjZXIgPSB2YWx1ZSA9PiB2YWx1ZSxcbiAgICAgIGVudHJpZXMgPSBmdW5jdGlvbiogKCkge31cbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICB0aGlzLmVudHJpZXMgPSBlbnRyaWVzO1xuICAgIHRoaXMuY29lcmNlciA9IGNvZXJjZXI7XG5cbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICB0aGlzLnZhbGlkYXRvciA9ICh2YWx1ZSwgY29udGV4dCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB2YWxpZGF0b3IodmFsdWUsIGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gdG9GYWlsdXJlcyhyZXN1bHQsIGNvbnRleHQsIHRoaXMsIHZhbHVlKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdG9yID0gKCkgPT4gW107XG4gICAgfVxuXG4gICAgaWYgKHJlZmluZXIpIHtcbiAgICAgIHRoaXMucmVmaW5lciA9ICh2YWx1ZSwgY29udGV4dCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWZpbmVyKHZhbHVlLCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRvRmFpbHVyZXMocmVzdWx0LCBjb250ZXh0LCB0aGlzLCB2YWx1ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlZmluZXIgPSAoKSA9PiBbXTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEFzc2VydCB0aGF0IGEgdmFsdWUgcGFzc2VzIHRoZSBzdHJ1Y3QncyB2YWxpZGF0aW9uLCB0aHJvd2luZyBpZiBpdCBkb2Vzbid0LlxuICAgKi9cblxuXG4gIGFzc2VydCh2YWx1ZSkge1xuICAgIHJldHVybiBhc3NlcnQodmFsdWUsIHRoaXMpO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSB2YWx1ZSB3aXRoIHRoZSBzdHJ1Y3QncyBjb2VyY2lvbiBsb2dpYywgdGhlbiB2YWxpZGF0ZSBpdC5cbiAgICovXG5cblxuICBjcmVhdGUodmFsdWUpIHtcbiAgICByZXR1cm4gY3JlYXRlKHZhbHVlLCB0aGlzKTtcbiAgfVxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB2YWx1ZSBwYXNzZXMgdGhlIHN0cnVjdCdzIHZhbGlkYXRpb24uXG4gICAqL1xuXG5cbiAgaXModmFsdWUpIHtcbiAgICByZXR1cm4gaXModmFsdWUsIHRoaXMpO1xuICB9XG4gIC8qKlxuICAgKiBNYXNrIGEgdmFsdWUsIGNvZXJjaW5nIGFuZCB2YWxpZGF0aW5nIGl0LCBidXQgcmV0dXJuaW5nIG9ubHkgdGhlIHN1YnNldCBvZlxuICAgKiBwcm9wZXJ0aWVzIGRlZmluZWQgYnkgdGhlIHN0cnVjdCdzIHNjaGVtYS5cbiAgICovXG5cblxuICBtYXNrKHZhbHVlKSB7XG4gICAgcmV0dXJuIG1hc2sodmFsdWUsIHRoaXMpO1xuICB9XG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBhIHZhbHVlIHdpdGggdGhlIHN0cnVjdCdzIHZhbGlkYXRpb24gbG9naWMsIHJldHVybmluZyBhIHR1cGxlXG4gICAqIHJlcHJlc2VudGluZyB0aGUgcmVzdWx0LlxuICAgKlxuICAgKiBZb3UgbWF5IG9wdGlvbmFsbHkgcGFzcyBgdHJ1ZWAgZm9yIHRoZSBgd2l0aENvZXJjaW9uYCBhcmd1bWVudCB0byBjb2VyY2VcbiAgICogdGhlIHZhbHVlIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHZhbGlkYXRlIGl0LiBJZiB5b3UgZG8sIHRoZSByZXN1bHQgd2lsbFxuICAgKiBjb250YWluIHRoZSBjb2VyY2VkIHJlc3VsdCB3aGVuIHN1Y2Nlc3NmdWwuXG4gICAqL1xuXG5cbiAgdmFsaWRhdGUodmFsdWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRlKHZhbHVlLCB0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG59XG4vKipcbiAqIEFzc2VydCB0aGF0IGEgdmFsdWUgcGFzc2VzIGEgc3RydWN0LCB0aHJvd2luZyBpZiBpdCBkb2Vzbid0LlxuICovXG5cbmZ1bmN0aW9uIGFzc2VydCh2YWx1ZSwgc3RydWN0KSB7XG4gIGNvbnN0IHJlc3VsdCA9IHZhbGlkYXRlKHZhbHVlLCBzdHJ1Y3QpO1xuXG4gIGlmIChyZXN1bHRbMF0pIHtcbiAgICB0aHJvdyByZXN1bHRbMF07XG4gIH1cbn1cbi8qKlxuICogQ3JlYXRlIGEgdmFsdWUgd2l0aCB0aGUgY29lcmNpb24gbG9naWMgb2Ygc3RydWN0IGFuZCB2YWxpZGF0ZSBpdC5cbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGUodmFsdWUsIHN0cnVjdCkge1xuICBjb25zdCByZXN1bHQgPSB2YWxpZGF0ZSh2YWx1ZSwgc3RydWN0LCB7XG4gICAgY29lcmNlOiB0cnVlXG4gIH0pO1xuXG4gIGlmIChyZXN1bHRbMF0pIHtcbiAgICB0aHJvdyByZXN1bHRbMF07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlc3VsdFsxXTtcbiAgfVxufVxuLyoqXG4gKiBNYXNrIGEgdmFsdWUsIHJldHVybmluZyBvbmx5IHRoZSBzdWJzZXQgb2YgcHJvcGVydGllcyBkZWZpbmVkIGJ5IGEgc3RydWN0LlxuICovXG5cbmZ1bmN0aW9uIG1hc2sodmFsdWUsIHN0cnVjdCkge1xuICBjb25zdCByZXN1bHQgPSB2YWxpZGF0ZSh2YWx1ZSwgc3RydWN0LCB7XG4gICAgY29lcmNlOiB0cnVlLFxuICAgIG1hc2s6IHRydWVcbiAgfSk7XG5cbiAgaWYgKHJlc3VsdFswXSkge1xuICAgIHRocm93IHJlc3VsdFswXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzdWx0WzFdO1xuICB9XG59XG4vKipcbiAqIENoZWNrIGlmIGEgdmFsdWUgcGFzc2VzIGEgc3RydWN0LlxuICovXG5cbmZ1bmN0aW9uIGlzKHZhbHVlLCBzdHJ1Y3QpIHtcbiAgY29uc3QgcmVzdWx0ID0gdmFsaWRhdGUodmFsdWUsIHN0cnVjdCk7XG4gIHJldHVybiAhcmVzdWx0WzBdO1xufVxuLyoqXG4gKiBWYWxpZGF0ZSBhIHZhbHVlIGFnYWluc3QgYSBzdHJ1Y3QsIHJldHVybmluZyBhbiBlcnJvciBpZiBpbnZhbGlkLCBvciB0aGVcbiAqIHZhbHVlICh3aXRoIHBvdGVudGlhbCBjb2VyY2lvbikgaWYgdmFsaWQuXG4gKi9cblxuZnVuY3Rpb24gdmFsaWRhdGUodmFsdWUsIHN0cnVjdCwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgY29uc3QgdHVwbGVzID0gcnVuKHZhbHVlLCBzdHJ1Y3QsIG9wdGlvbnMpO1xuICBjb25zdCB0dXBsZSA9IHNoaWZ0SXRlcmF0b3IodHVwbGVzKTtcblxuICBpZiAodHVwbGVbMF0pIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBTdHJ1Y3RFcnJvcih0dXBsZVswXSwgZnVuY3Rpb24qICgpIHtcbiAgICAgIGZvciAoY29uc3QgdCBvZiB0dXBsZXMpIHtcbiAgICAgICAgaWYgKHRbMF0pIHtcbiAgICAgICAgICB5aWVsZCB0WzBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIFtlcnJvciwgdW5kZWZpbmVkXTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB2ID0gdHVwbGVbMV07XG4gICAgcmV0dXJuIFt1bmRlZmluZWQsIHZdO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2lnbigpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIFN0cnVjdHMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgU3RydWN0c1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGNvbnN0IGlzVHlwZSA9IFN0cnVjdHNbMF0udHlwZSA9PT0gJ3R5cGUnO1xuICBjb25zdCBzY2hlbWFzID0gU3RydWN0cy5tYXAocyA9PiBzLnNjaGVtYSk7XG4gIGNvbnN0IHNjaGVtYSA9IE9iamVjdC5hc3NpZ24oe30sIC4uLnNjaGVtYXMpO1xuICByZXR1cm4gaXNUeXBlID8gdHlwZShzY2hlbWEpIDogb2JqZWN0KHNjaGVtYSk7XG59XG4vKipcbiAqIERlZmluZSBhIG5ldyBzdHJ1Y3QgdHlwZSB3aXRoIGEgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb24uXG4gKi9cblxuZnVuY3Rpb24gZGVmaW5lKG5hbWUsIHZhbGlkYXRvcikge1xuICByZXR1cm4gbmV3IFN0cnVjdCh7XG4gICAgdHlwZTogbmFtZSxcbiAgICBzY2hlbWE6IG51bGwsXG4gICAgdmFsaWRhdG9yXG4gIH0pO1xufVxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgc3RydWN0IGJhc2VkIG9uIGFuIGV4aXN0aW5nIHN0cnVjdCwgYnV0IHRoZSB2YWx1ZSBpcyBhbGxvd2VkIHRvXG4gKiBiZSBgdW5kZWZpbmVkYC4gYGxvZ2Agd2lsbCBiZSBjYWxsZWQgaWYgdGhlIHZhbHVlIGlzIG5vdCBgdW5kZWZpbmVkYC5cbiAqL1xuXG5mdW5jdGlvbiBkZXByZWNhdGVkKHN0cnVjdCwgbG9nKSB7XG4gIHJldHVybiBuZXcgU3RydWN0KHsgLi4uc3RydWN0LFxuICAgIHJlZmluZXI6ICh2YWx1ZSwgY3R4KSA9PiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHN0cnVjdC5yZWZpbmVyKHZhbHVlLCBjdHgpLFxuXG4gICAgdmFsaWRhdG9yKHZhbHVlLCBjdHgpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nKHZhbHVlLCBjdHgpO1xuICAgICAgICByZXR1cm4gc3RydWN0LnZhbGlkYXRvcih2YWx1ZSwgY3R4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSk7XG59XG4vKipcbiAqIENyZWF0ZSBhIHN0cnVjdCB3aXRoIGR5bmFtaWMgdmFsaWRhdGlvbiBsb2dpYy5cbiAqXG4gKiBUaGUgY2FsbGJhY2sgd2lsbCByZWNlaXZlIHRoZSB2YWx1ZSBjdXJyZW50bHkgYmVpbmcgdmFsaWRhdGVkLCBhbmQgbXVzdFxuICogcmV0dXJuIGEgc3RydWN0IG9iamVjdCB0byB2YWxpZGF0ZSBpdCB3aXRoLiBUaGlzIGNhbiBiZSB1c2VmdWwgdG8gbW9kZWxcbiAqIHZhbGlkYXRpb24gbG9naWMgdGhhdCBjaGFuZ2VzIGJhc2VkIG9uIGl0cyBpbnB1dC5cbiAqL1xuXG5mdW5jdGlvbiBkeW5hbWljKGZuKSB7XG4gIHJldHVybiBuZXcgU3RydWN0KHtcbiAgICB0eXBlOiAnZHluYW1pYycsXG4gICAgc2NoZW1hOiBudWxsLFxuXG4gICAgKmVudHJpZXModmFsdWUsIGN0eCkge1xuICAgICAgY29uc3Qgc3RydWN0ID0gZm4odmFsdWUsIGN0eCk7XG4gICAgICB5aWVsZCogc3RydWN0LmVudHJpZXModmFsdWUsIGN0eCk7XG4gICAgfSxcblxuICAgIHZhbGlkYXRvcih2YWx1ZSwgY3R4KSB7XG4gICAgICBjb25zdCBzdHJ1Y3QgPSBmbih2YWx1ZSwgY3R4KTtcbiAgICAgIHJldHVybiBzdHJ1Y3QudmFsaWRhdG9yKHZhbHVlLCBjdHgpO1xuICAgIH0sXG5cbiAgICBjb2VyY2VyKHZhbHVlLCBjdHgpIHtcbiAgICAgIGNvbnN0IHN0cnVjdCA9IGZuKHZhbHVlLCBjdHgpO1xuICAgICAgcmV0dXJuIHN0cnVjdC5jb2VyY2VyKHZhbHVlLCBjdHgpO1xuICAgIH0sXG5cbiAgICByZWZpbmVyKHZhbHVlLCBjdHgpIHtcbiAgICAgIGNvbnN0IHN0cnVjdCA9IGZuKHZhbHVlLCBjdHgpO1xuICAgICAgcmV0dXJuIHN0cnVjdC5yZWZpbmVyKHZhbHVlLCBjdHgpO1xuICAgIH1cblxuICB9KTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgc3RydWN0IHdpdGggbGF6aWx5IGV2YWx1YXRlZCB2YWxpZGF0aW9uIGxvZ2ljLlxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHZhbGlkYXRpb24gaXMgcnVuIHdpdGggdGhlIHN0cnVjdCwgdGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkXG4gKiBhbmQgbXVzdCByZXR1cm4gYSBzdHJ1Y3Qgb2JqZWN0IHRvIHVzZS4gVGhpcyBpcyB1c2VmdWwgZm9yIGNhc2VzIHdoZXJlIHlvdVxuICogd2FudCB0byBoYXZlIHNlbGYtcmVmZXJlbnRpYWwgc3RydWN0cyBmb3IgbmVzdGVkIGRhdGEgc3RydWN0dXJlcyB0byBhdm9pZCBhXG4gKiBjaXJjdWxhciBkZWZpbml0aW9uIHByb2JsZW0uXG4gKi9cblxuZnVuY3Rpb24gbGF6eShmbikge1xuICBsZXQgc3RydWN0O1xuICByZXR1cm4gbmV3IFN0cnVjdCh7XG4gICAgdHlwZTogJ2xhenknLFxuICAgIHNjaGVtYTogbnVsbCxcblxuICAgICplbnRyaWVzKHZhbHVlLCBjdHgpIHtcbiAgICAgIHN0cnVjdCA/PyAoc3RydWN0ID0gZm4oKSk7XG4gICAgICB5aWVsZCogc3RydWN0LmVudHJpZXModmFsdWUsIGN0eCk7XG4gICAgfSxcblxuICAgIHZhbGlkYXRvcih2YWx1ZSwgY3R4KSB7XG4gICAgICBzdHJ1Y3QgPz8gKHN0cnVjdCA9IGZuKCkpO1xuICAgICAgcmV0dXJuIHN0cnVjdC52YWxpZGF0b3IodmFsdWUsIGN0eCk7XG4gICAgfSxcblxuICAgIGNvZXJjZXIodmFsdWUsIGN0eCkge1xuICAgICAgc3RydWN0ID8/IChzdHJ1Y3QgPSBmbigpKTtcbiAgICAgIHJldHVybiBzdHJ1Y3QuY29lcmNlcih2YWx1ZSwgY3R4KTtcbiAgICB9LFxuXG4gICAgcmVmaW5lcih2YWx1ZSwgY3R4KSB7XG4gICAgICBzdHJ1Y3QgPz8gKHN0cnVjdCA9IGZuKCkpO1xuICAgICAgcmV0dXJuIHN0cnVjdC5yZWZpbmVyKHZhbHVlLCBjdHgpO1xuICAgIH1cblxuICB9KTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHN0cnVjdCBiYXNlZCBvbiBhbiBleGlzdGluZyBvYmplY3Qgc3RydWN0LCBidXQgZXhjbHVkaW5nXG4gKiBzcGVjaWZpYyBwcm9wZXJ0aWVzLlxuICpcbiAqIExpa2UgVHlwZVNjcmlwdCdzIGBPbWl0YCB1dGlsaXR5LlxuICovXG5cbmZ1bmN0aW9uIG9taXQoc3RydWN0LCBrZXlzKSB7XG4gIGNvbnN0IHtcbiAgICBzY2hlbWFcbiAgfSA9IHN0cnVjdDtcbiAgY29uc3Qgc3Vic2NoZW1hID0geyAuLi5zY2hlbWFcbiAgfTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgZGVsZXRlIHN1YnNjaGVtYVtrZXldO1xuICB9XG5cbiAgc3dpdGNoIChzdHJ1Y3QudHlwZSkge1xuICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgcmV0dXJuIHR5cGUoc3Vic2NoZW1hKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gb2JqZWN0KHN1YnNjaGVtYSk7XG4gIH1cbn1cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHN0cnVjdCBiYXNlZCBvbiBhbiBleGlzdGluZyBvYmplY3Qgc3RydWN0LCBidXQgd2l0aCBhbGwgb2YgaXRzXG4gKiBwcm9wZXJ0aWVzIGFsbG93ZWQgdG8gYmUgYHVuZGVmaW5lZGAuXG4gKlxuICogTGlrZSBUeXBlU2NyaXB0J3MgYFBhcnRpYWxgIHV0aWxpdHkuXG4gKi9cblxuZnVuY3Rpb24gcGFydGlhbChzdHJ1Y3QpIHtcbiAgY29uc3Qgc2NoZW1hID0gc3RydWN0IGluc3RhbmNlb2YgU3RydWN0ID8geyAuLi5zdHJ1Y3Quc2NoZW1hXG4gIH0gOiB7IC4uLnN0cnVjdFxuICB9O1xuXG4gIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSkge1xuICAgIHNjaGVtYVtrZXldID0gb3B0aW9uYWwoc2NoZW1hW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdChzY2hlbWEpO1xufVxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgc3RydWN0IGJhc2VkIG9uIGFuIGV4aXN0aW5nIG9iamVjdCBzdHJ1Y3QsIGJ1dCBvbmx5IGluY2x1ZGluZ1xuICogc3BlY2lmaWMgcHJvcGVydGllcy5cbiAqXG4gKiBMaWtlIFR5cGVTY3JpcHQncyBgUGlja2AgdXRpbGl0eS5cbiAqL1xuXG5mdW5jdGlvbiBwaWNrKHN0cnVjdCwga2V5cykge1xuICBjb25zdCB7XG4gICAgc2NoZW1hXG4gIH0gPSBzdHJ1Y3Q7XG4gIGNvbnN0IHN1YnNjaGVtYSA9IHt9O1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBzdWJzY2hlbWFba2V5XSA9IHNjaGVtYVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdChzdWJzY2hlbWEpO1xufVxuLyoqXG4gKiBEZWZpbmUgYSBuZXcgc3RydWN0IHR5cGUgd2l0aCBhIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9uLlxuICpcbiAqIEBkZXByZWNhdGVkIFRoaXMgZnVuY3Rpb24gaGFzIGJlZW4gcmVuYW1lZCB0byBgZGVmaW5lYC5cbiAqL1xuXG5mdW5jdGlvbiBzdHJ1Y3QobmFtZSwgdmFsaWRhdG9yKSB7XG4gIGNvbnNvbGUud2Fybignc3VwZXJzdHJ1Y3RAMC4xMSAtIFRoZSBgc3RydWN0YCBoZWxwZXIgaGFzIGJlZW4gcmVuYW1lZCB0byBgZGVmaW5lYC4nKTtcbiAgcmV0dXJuIGRlZmluZShuYW1lLCB2YWxpZGF0b3IpO1xufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IGFueSB2YWx1ZSBwYXNzZXMgdmFsaWRhdGlvbi5cbiAqL1xuXG5mdW5jdGlvbiBhbnkoKSB7XG4gIHJldHVybiBkZWZpbmUoJ2FueScsICgpID0+IHRydWUpO1xufVxuZnVuY3Rpb24gYXJyYXkoRWxlbWVudCkge1xuICByZXR1cm4gbmV3IFN0cnVjdCh7XG4gICAgdHlwZTogJ2FycmF5JyxcbiAgICBzY2hlbWE6IEVsZW1lbnQsXG5cbiAgICAqZW50cmllcyh2YWx1ZSkge1xuICAgICAgaWYgKEVsZW1lbnQgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChjb25zdCBbaSwgdl0gb2YgdmFsdWUuZW50cmllcygpKSB7XG4gICAgICAgICAgeWllbGQgW2ksIHYsIEVsZW1lbnRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvZXJjZXIodmFsdWUpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLnNsaWNlKCkgOiB2YWx1ZTtcbiAgICB9LFxuXG4gICAgdmFsaWRhdG9yKHZhbHVlKSB7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgYEV4cGVjdGVkIGFuIGFycmF5IHZhbHVlLCBidXQgcmVjZWl2ZWQ6ICR7cHJpbnQodmFsdWUpfWA7XG4gICAgfVxuXG4gIH0pO1xufVxuLyoqXG4gKiBFbnN1cmUgdGhhdCBhIHZhbHVlIGlzIGEgYmlnaW50LlxuICovXG5cbmZ1bmN0aW9uIGJpZ2ludCgpIHtcbiAgcmV0dXJuIGRlZmluZSgnYmlnaW50JywgdmFsdWUgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdiaWdpbnQnO1xuICB9KTtcbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgYSB2YWx1ZSBpcyBhIGJvb2xlYW4uXG4gKi9cblxuZnVuY3Rpb24gYm9vbGVhbigpIHtcbiAgcmV0dXJuIGRlZmluZSgnYm9vbGVhbicsIHZhbHVlID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG4gIH0pO1xufVxuLyoqXG4gKiBFbnN1cmUgdGhhdCBhIHZhbHVlIGlzIGEgdmFsaWQgYERhdGVgLlxuICpcbiAqIE5vdGU6IHRoaXMgYWxzbyBlbnN1cmVzIHRoYXQgdGhlIHZhbHVlIGlzICpub3QqIGFuIGludmFsaWQgYERhdGVgIG9iamVjdCxcbiAqIHdoaWNoIGNhbiBvY2N1ciB3aGVuIHBhcnNpbmcgYSBkYXRlIGZhaWxzIGJ1dCBzdGlsbCByZXR1cm5zIGEgYERhdGVgLlxuICovXG5cbmZ1bmN0aW9uIGRhdGUoKSB7XG4gIHJldHVybiBkZWZpbmUoJ2RhdGUnLCB2YWx1ZSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4odmFsdWUuZ2V0VGltZSgpKSB8fCBgRXhwZWN0ZWQgYSB2YWxpZCBcXGBEYXRlXFxgIG9iamVjdCwgYnV0IHJlY2VpdmVkOiAke3ByaW50KHZhbHVlKX1gO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGVudW1zKHZhbHVlcykge1xuICBjb25zdCBzY2hlbWEgPSB7fTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSB2YWx1ZXMubWFwKHYgPT4gcHJpbnQodikpLmpvaW4oKTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiB2YWx1ZXMpIHtcbiAgICBzY2hlbWFba2V5XSA9IGtleTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU3RydWN0KHtcbiAgICB0eXBlOiAnZW51bXMnLFxuICAgIHNjaGVtYSxcblxuICAgIHZhbGlkYXRvcih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlcy5pbmNsdWRlcyh2YWx1ZSkgfHwgYEV4cGVjdGVkIG9uZSBvZiBcXGAke2Rlc2NyaXB0aW9ufVxcYCwgYnV0IHJlY2VpdmVkOiAke3ByaW50KHZhbHVlKX1gO1xuICAgIH1cblxuICB9KTtcbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgYSB2YWx1ZSBpcyBhIGZ1bmN0aW9uLlxuICovXG5cbmZ1bmN0aW9uIGZ1bmMoKSB7XG4gIHJldHVybiBkZWZpbmUoJ2Z1bmMnLCB2YWx1ZSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyB8fCBgRXhwZWN0ZWQgYSBmdW5jdGlvbiwgYnV0IHJlY2VpdmVkOiAke3ByaW50KHZhbHVlKX1gO1xuICB9KTtcbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgYSB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBhIHNwZWNpZmljIGNsYXNzLlxuICovXG5cbmZ1bmN0aW9uIGluc3RhbmNlKENsYXNzKSB7XG4gIHJldHVybiBkZWZpbmUoJ2luc3RhbmNlJywgdmFsdWUgPT4ge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIENsYXNzIHx8IGBFeHBlY3RlZCBhIFxcYCR7Q2xhc3MubmFtZX1cXGAgaW5zdGFuY2UsIGJ1dCByZWNlaXZlZDogJHtwcmludCh2YWx1ZSl9YDtcbiAgfSk7XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuXG5mdW5jdGlvbiBpbnRlZ2VyKCkge1xuICByZXR1cm4gZGVmaW5lKCdpbnRlZ2VyJywgdmFsdWUgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgfHwgYEV4cGVjdGVkIGFuIGludGVnZXIsIGJ1dCByZWNlaXZlZDogJHtwcmludCh2YWx1ZSl9YDtcbiAgfSk7XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGEgdmFsdWUgbWF0Y2hlcyBhbGwgb2YgYSBzZXQgb2YgdHlwZXMuXG4gKi9cblxuZnVuY3Rpb24gaW50ZXJzZWN0aW9uKFN0cnVjdHMpIHtcbiAgcmV0dXJuIG5ldyBTdHJ1Y3Qoe1xuICAgIHR5cGU6ICdpbnRlcnNlY3Rpb24nLFxuICAgIHNjaGVtYTogbnVsbCxcblxuICAgICplbnRyaWVzKHZhbHVlLCBjdHgpIHtcbiAgICAgIGZvciAoY29uc3QgUyBvZiBTdHJ1Y3RzKSB7XG4gICAgICAgIHlpZWxkKiBTLmVudHJpZXModmFsdWUsIGN0eCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgICp2YWxpZGF0b3IodmFsdWUsIGN0eCkge1xuICAgICAgZm9yIChjb25zdCBTIG9mIFN0cnVjdHMpIHtcbiAgICAgICAgeWllbGQqIFMudmFsaWRhdG9yKHZhbHVlLCBjdHgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAqcmVmaW5lcih2YWx1ZSwgY3R4KSB7XG4gICAgICBmb3IgKGNvbnN0IFMgb2YgU3RydWN0cykge1xuICAgICAgICB5aWVsZCogUy5yZWZpbmVyKHZhbHVlLCBjdHgpO1xuICAgICAgfVxuICAgIH1cblxuICB9KTtcbn1cbmZ1bmN0aW9uIGxpdGVyYWwoY29uc3RhbnQpIHtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBwcmludChjb25zdGFudCk7XG4gIGNvbnN0IHQgPSB0eXBlb2YgY29uc3RhbnQ7XG4gIHJldHVybiBuZXcgU3RydWN0KHtcbiAgICB0eXBlOiAnbGl0ZXJhbCcsXG4gICAgc2NoZW1hOiB0ID09PSAnc3RyaW5nJyB8fCB0ID09PSAnbnVtYmVyJyB8fCB0ID09PSAnYm9vbGVhbicgPyBjb25zdGFudCA6IG51bGwsXG5cbiAgICB2YWxpZGF0b3IodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gY29uc3RhbnQgfHwgYEV4cGVjdGVkIHRoZSBsaXRlcmFsIFxcYCR7ZGVzY3JpcHRpb259XFxgLCBidXQgcmVjZWl2ZWQ6ICR7cHJpbnQodmFsdWUpfWA7XG4gICAgfVxuXG4gIH0pO1xufVxuZnVuY3Rpb24gbWFwKEtleSwgVmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBTdHJ1Y3Qoe1xuICAgIHR5cGU6ICdtYXAnLFxuICAgIHNjaGVtYTogbnVsbCxcblxuICAgICplbnRyaWVzKHZhbHVlKSB7XG4gICAgICBpZiAoS2V5ICYmIFZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIHZhbHVlLmVudHJpZXMoKSkge1xuICAgICAgICAgIHlpZWxkIFtrLCBrLCBLZXldO1xuICAgICAgICAgIHlpZWxkIFtrLCB2LCBWYWx1ZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY29lcmNlcih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgTWFwID8gbmV3IE1hcCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB9LFxuXG4gICAgdmFsaWRhdG9yKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBNYXAgfHwgYEV4cGVjdGVkIGEgXFxgTWFwXFxgIG9iamVjdCwgYnV0IHJlY2VpdmVkOiAke3ByaW50KHZhbHVlKX1gO1xuICAgIH1cblxuICB9KTtcbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgbm8gdmFsdWUgZXZlciBwYXNzZXMgdmFsaWRhdGlvbi5cbiAqL1xuXG5mdW5jdGlvbiBuZXZlcigpIHtcbiAgcmV0dXJuIGRlZmluZSgnbmV2ZXInLCAoKSA9PiBmYWxzZSk7XG59XG4vKipcbiAqIEF1Z21lbnQgYW4gZXhpc3Rpbmcgc3RydWN0IHRvIGFsbG93IGBudWxsYCB2YWx1ZXMuXG4gKi9cblxuZnVuY3Rpb24gbnVsbGFibGUoc3RydWN0KSB7XG4gIHJldHVybiBuZXcgU3RydWN0KHsgLi4uc3RydWN0LFxuICAgIHZhbGlkYXRvcjogKHZhbHVlLCBjdHgpID0+IHZhbHVlID09PSBudWxsIHx8IHN0cnVjdC52YWxpZGF0b3IodmFsdWUsIGN0eCksXG4gICAgcmVmaW5lcjogKHZhbHVlLCBjdHgpID0+IHZhbHVlID09PSBudWxsIHx8IHN0cnVjdC5yZWZpbmVyKHZhbHVlLCBjdHgpXG4gIH0pO1xufVxuLyoqXG4gKiBFbnN1cmUgdGhhdCBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5cbmZ1bmN0aW9uIG51bWJlcigpIHtcbiAgcmV0dXJuIGRlZmluZSgnbnVtYmVyJywgdmFsdWUgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSkgfHwgYEV4cGVjdGVkIGEgbnVtYmVyLCBidXQgcmVjZWl2ZWQ6ICR7cHJpbnQodmFsdWUpfWA7XG4gIH0pO1xufVxuZnVuY3Rpb24gb2JqZWN0KHNjaGVtYSkge1xuICBjb25zdCBrbm93bnMgPSBzY2hlbWEgPyBPYmplY3Qua2V5cyhzY2hlbWEpIDogW107XG4gIGNvbnN0IE5ldmVyID0gbmV2ZXIoKTtcbiAgcmV0dXJuIG5ldyBTdHJ1Y3Qoe1xuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHNjaGVtYTogc2NoZW1hID8gc2NoZW1hIDogbnVsbCxcblxuICAgICplbnRyaWVzKHZhbHVlKSB7XG4gICAgICBpZiAoc2NoZW1hICYmIGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBjb25zdCB1bmtub3ducyA9IG5ldyBTZXQoT2JqZWN0LmtleXModmFsdWUpKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrbm93bnMpIHtcbiAgICAgICAgICB1bmtub3ducy5kZWxldGUoa2V5KTtcbiAgICAgICAgICB5aWVsZCBba2V5LCB2YWx1ZVtrZXldLCBzY2hlbWFba2V5XV07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB1bmtub3ducykge1xuICAgICAgICAgIHlpZWxkIFtrZXksIHZhbHVlW2tleV0sIE5ldmVyXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB2YWxpZGF0b3IodmFsdWUpIHtcbiAgICAgIHJldHVybiBpc09iamVjdCh2YWx1ZSkgfHwgYEV4cGVjdGVkIGFuIG9iamVjdCwgYnV0IHJlY2VpdmVkOiAke3ByaW50KHZhbHVlKX1gO1xuICAgIH0sXG5cbiAgICBjb2VyY2VyKHZhbHVlKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8geyAuLi52YWx1ZVxuICAgICAgfSA6IHZhbHVlO1xuICAgIH1cblxuICB9KTtcbn1cbi8qKlxuICogQXVnbWVudCBhIHN0cnVjdCB0byBhbGxvdyBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKi9cblxuZnVuY3Rpb24gb3B0aW9uYWwoc3RydWN0KSB7XG4gIHJldHVybiBuZXcgU3RydWN0KHsgLi4uc3RydWN0LFxuICAgIHZhbGlkYXRvcjogKHZhbHVlLCBjdHgpID0+IHZhbHVlID09PSB1bmRlZmluZWQgfHwgc3RydWN0LnZhbGlkYXRvcih2YWx1ZSwgY3R4KSxcbiAgICByZWZpbmVyOiAodmFsdWUsIGN0eCkgPT4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzdHJ1Y3QucmVmaW5lcih2YWx1ZSwgY3R4KVxuICB9KTtcbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgYSB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBrZXlzIGFuZCB2YWx1ZXMgb2Ygc3BlY2lmaWMgdHlwZXMsIGJ1dFxuICogd2l0aG91dCBlbnN1cmluZyBhbnkgc3BlY2lmaWMgc2hhcGUgb2YgcHJvcGVydGllcy5cbiAqXG4gKiBMaWtlIFR5cGVTY3JpcHQncyBgUmVjb3JkYCB1dGlsaXR5LlxuICovXG5cbmZ1bmN0aW9uIHJlY29yZChLZXksIFZhbHVlKSB7XG4gIHJldHVybiBuZXcgU3RydWN0KHtcbiAgICB0eXBlOiAncmVjb3JkJyxcbiAgICBzY2hlbWE6IG51bGwsXG5cbiAgICAqZW50cmllcyh2YWx1ZSkge1xuICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICBjb25zdCB2ID0gdmFsdWVba107XG4gICAgICAgICAgeWllbGQgW2ssIGssIEtleV07XG4gICAgICAgICAgeWllbGQgW2ssIHYsIFZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB2YWxpZGF0b3IodmFsdWUpIHtcbiAgICAgIHJldHVybiBpc09iamVjdCh2YWx1ZSkgfHwgYEV4cGVjdGVkIGFuIG9iamVjdCwgYnV0IHJlY2VpdmVkOiAke3ByaW50KHZhbHVlKX1gO1xuICAgIH1cblxuICB9KTtcbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgYSB2YWx1ZSBpcyBhIGBSZWdFeHBgLlxuICpcbiAqIE5vdGU6IHRoaXMgZG9lcyBub3QgdGVzdCB0aGUgdmFsdWUgYWdhaW5zdCB0aGUgcmVndWxhciBleHByZXNzaW9uISBGb3IgdGhhdFxuICogeW91IG5lZWQgdG8gdXNlIHRoZSBgcGF0dGVybigpYCByZWZpbmVtZW50LlxuICovXG5cbmZ1bmN0aW9uIHJlZ2V4cCgpIHtcbiAgcmV0dXJuIGRlZmluZSgncmVnZXhwJywgdmFsdWUgPT4ge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgfSk7XG59XG5mdW5jdGlvbiBzZXQoRWxlbWVudCkge1xuICByZXR1cm4gbmV3IFN0cnVjdCh7XG4gICAgdHlwZTogJ3NldCcsXG4gICAgc2NoZW1hOiBudWxsLFxuXG4gICAgKmVudHJpZXModmFsdWUpIHtcbiAgICAgIGlmIChFbGVtZW50ICYmIHZhbHVlIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgIGZvciAoY29uc3QgdiBvZiB2YWx1ZSkge1xuICAgICAgICAgIHlpZWxkIFt2LCB2LCBFbGVtZW50XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb2VyY2VyKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBTZXQgPyBuZXcgU2V0KHZhbHVlKSA6IHZhbHVlO1xuICAgIH0sXG5cbiAgICB2YWxpZGF0b3IodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBgRXhwZWN0ZWQgYSBcXGBTZXRcXGAgb2JqZWN0LCBidXQgcmVjZWl2ZWQ6ICR7cHJpbnQodmFsdWUpfWA7XG4gICAgfVxuXG4gIH0pO1xufVxuLyoqXG4gKiBFbnN1cmUgdGhhdCBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5cbmZ1bmN0aW9uIHN0cmluZygpIHtcbiAgcmV0dXJuIGRlZmluZSgnc3RyaW5nJywgdmFsdWUgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IGBFeHBlY3RlZCBhIHN0cmluZywgYnV0IHJlY2VpdmVkOiAke3ByaW50KHZhbHVlKX1gO1xuICB9KTtcbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgYSB2YWx1ZSBpcyBhIHR1cGxlIG9mIGEgc3BlY2lmaWMgbGVuZ3RoLCBhbmQgdGhhdCBlYWNoIG9mIGl0c1xuICogZWxlbWVudHMgaXMgb2YgYSBzcGVjaWZpYyB0eXBlLlxuICovXG5cbmZ1bmN0aW9uIHR1cGxlKFN0cnVjdHMpIHtcbiAgY29uc3QgTmV2ZXIgPSBuZXZlcigpO1xuICByZXR1cm4gbmV3IFN0cnVjdCh7XG4gICAgdHlwZTogJ3R1cGxlJyxcbiAgICBzY2hlbWE6IG51bGwsXG5cbiAgICAqZW50cmllcyh2YWx1ZSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGgubWF4KFN0cnVjdHMubGVuZ3RoLCB2YWx1ZS5sZW5ndGgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB5aWVsZCBbaSwgdmFsdWVbaV0sIFN0cnVjdHNbaV0gfHwgTmV2ZXJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHZhbGlkYXRvcih2YWx1ZSkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IGBFeHBlY3RlZCBhbiBhcnJheSwgYnV0IHJlY2VpdmVkOiAke3ByaW50KHZhbHVlKX1gO1xuICAgIH1cblxuICB9KTtcbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgYSB2YWx1ZSBoYXMgYSBzZXQgb2Yga25vd24gcHJvcGVydGllcyBvZiBzcGVjaWZpYyB0eXBlcy5cbiAqXG4gKiBOb3RlOiBVbnJlY29nbml6ZWQgcHJvcGVydGllcyBhcmUgYWxsb3dlZCBhbmQgdW50b3VjaGVkLiBUaGlzIGlzIHNpbWlsYXIgdG9cbiAqIGhvdyBUeXBlU2NyaXB0J3Mgc3RydWN0dXJhbCB0eXBpbmcgd29ya3MuXG4gKi9cblxuZnVuY3Rpb24gdHlwZShzY2hlbWEpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNjaGVtYSk7XG4gIHJldHVybiBuZXcgU3RydWN0KHtcbiAgICB0eXBlOiAndHlwZScsXG4gICAgc2NoZW1hLFxuXG4gICAgKmVudHJpZXModmFsdWUpIHtcbiAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICAgICAgICB5aWVsZCBbaywgdmFsdWVba10sIHNjaGVtYVtrXV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdmFsaWRhdG9yKHZhbHVlKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3QodmFsdWUpIHx8IGBFeHBlY3RlZCBhbiBvYmplY3QsIGJ1dCByZWNlaXZlZDogJHtwcmludCh2YWx1ZSl9YDtcbiAgICB9XG5cbiAgfSk7XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGEgdmFsdWUgbWF0Y2hlcyBvbmUgb2YgYSBzZXQgb2YgdHlwZXMuXG4gKi9cblxuZnVuY3Rpb24gdW5pb24oU3RydWN0cykge1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cnVjdHMubWFwKHMgPT4gcy50eXBlKS5qb2luKCcgfCAnKTtcbiAgcmV0dXJuIG5ldyBTdHJ1Y3Qoe1xuICAgIHR5cGU6ICd1bmlvbicsXG4gICAgc2NoZW1hOiBudWxsLFxuXG4gICAgY29lcmNlcih2YWx1ZSwgY3R4KSB7XG4gICAgICBjb25zdCBmaXJzdE1hdGNoID0gU3RydWN0cy5maW5kKHMgPT4ge1xuICAgICAgICBjb25zdCBbZV0gPSBzLnZhbGlkYXRlKHZhbHVlLCB7XG4gICAgICAgICAgY29lcmNlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gIWU7XG4gICAgICB9KSB8fCB1bmtub3duKCk7XG4gICAgICByZXR1cm4gZmlyc3RNYXRjaC5jb2VyY2VyKHZhbHVlLCBjdHgpO1xuICAgIH0sXG5cbiAgICB2YWxpZGF0b3IodmFsdWUsIGN0eCkge1xuICAgICAgY29uc3QgZmFpbHVyZXMgPSBbXTtcblxuICAgICAgZm9yIChjb25zdCBTIG9mIFN0cnVjdHMpIHtcbiAgICAgICAgY29uc3QgWy4uLnR1cGxlc10gPSBydW4odmFsdWUsIFMsIGN0eCk7XG4gICAgICAgIGNvbnN0IFtmaXJzdF0gPSB0dXBsZXM7XG5cbiAgICAgICAgaWYgKCFmaXJzdFswXSkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IFtmYWlsdXJlXSBvZiB0dXBsZXMpIHtcbiAgICAgICAgICAgIGlmIChmYWlsdXJlKSB7XG4gICAgICAgICAgICAgIGZhaWx1cmVzLnB1c2goZmFpbHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbYEV4cGVjdGVkIHRoZSB2YWx1ZSB0byBzYXRpc2Z5IGEgdW5pb24gb2YgXFxgJHtkZXNjcmlwdGlvbn1cXGAsIGJ1dCByZWNlaXZlZDogJHtwcmludCh2YWx1ZSl9YCwgLi4uZmFpbHVyZXNdO1xuICAgIH1cblxuICB9KTtcbn1cbi8qKlxuICogRW5zdXJlIHRoYXQgYW55IHZhbHVlIHBhc3NlcyB2YWxpZGF0aW9uLCB3aXRob3V0IHdpZGVuaW5nIGl0cyB0eXBlIHRvIGBhbnlgLlxuICovXG5cbmZ1bmN0aW9uIHVua25vd24oKSB7XG4gIHJldHVybiBkZWZpbmUoJ3Vua25vd24nLCAoKSA9PiB0cnVlKTtcbn1cblxuLyoqXG4gKiBBdWdtZW50IGEgYFN0cnVjdGAgdG8gYWRkIGFuIGFkZGl0aW9uYWwgY29lcmNpb24gc3RlcCB0byBpdHMgaW5wdXQuXG4gKlxuICogVGhpcyBhbGxvd3MgeW91IHRvIHRyYW5zZm9ybSBpbnB1dCBkYXRhIGJlZm9yZSB2YWxpZGF0aW5nIGl0LCB0byBpbmNyZWFzZSB0aGVcbiAqIGxpa2VsaWhvb2QgdGhhdCBpdCBwYXNzZXMgdmFsaWRhdGlvbuKAlGZvciBleGFtcGxlIGZvciBkZWZhdWx0IHZhbHVlcywgcGFyc2luZ1xuICogZGlmZmVyZW50IGZvcm1hdHMsIGV0Yy5cbiAqXG4gKiBOb3RlOiBZb3UgbXVzdCB1c2UgYGNyZWF0ZSh2YWx1ZSwgU3RydWN0KWAgb24gdGhlIHZhbHVlIHRvIGhhdmUgdGhlIGNvZXJjaW9uXG4gKiB0YWtlIGVmZmVjdCEgVXNpbmcgc2ltcGx5IGBhc3NlcnQoKWAgb3IgYGlzKClgIHdpbGwgbm90IHVzZSBjb2VyY2lvbi5cbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2Uoc3RydWN0LCBjb25kaXRpb24sIGNvZXJjZXIpIHtcbiAgcmV0dXJuIG5ldyBTdHJ1Y3QoeyAuLi5zdHJ1Y3QsXG4gICAgY29lcmNlcjogKHZhbHVlLCBjdHgpID0+IHtcbiAgICAgIHJldHVybiBpcyh2YWx1ZSwgY29uZGl0aW9uKSA/IHN0cnVjdC5jb2VyY2VyKGNvZXJjZXIodmFsdWUsIGN0eCksIGN0eCkgOiBzdHJ1Y3QuY29lcmNlcih2YWx1ZSwgY3R4KTtcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiBBdWdtZW50IGEgc3RydWN0IHRvIHJlcGxhY2UgYHVuZGVmaW5lZGAgdmFsdWVzIHdpdGggYSBkZWZhdWx0LlxuICpcbiAqIE5vdGU6IFlvdSBtdXN0IHVzZSBgY3JlYXRlKHZhbHVlLCBTdHJ1Y3QpYCBvbiB0aGUgdmFsdWUgdG8gaGF2ZSB0aGUgY29lcmNpb25cbiAqIHRha2UgZWZmZWN0ISBVc2luZyBzaW1wbHkgYGFzc2VydCgpYCBvciBgaXMoKWAgd2lsbCBub3QgdXNlIGNvZXJjaW9uLlxuICovXG5cbmZ1bmN0aW9uIGRlZmF1bHRlZChzdHJ1Y3QsIGZhbGxiYWNrLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICByZXR1cm4gY29lcmNlKHN0cnVjdCwgdW5rbm93bigpLCB4ID0+IHtcbiAgICBjb25zdCBmID0gdHlwZW9mIGZhbGxiYWNrID09PSAnZnVuY3Rpb24nID8gZmFsbGJhY2soKSA6IGZhbGxiYWNrO1xuXG4gICAgaWYgKHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGY7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLnN0cmljdCAmJiBpc1BsYWluT2JqZWN0KHgpICYmIGlzUGxhaW5PYmplY3QoZikpIHtcbiAgICAgIGNvbnN0IHJldCA9IHsgLi4ueFxuICAgICAgfTtcbiAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGYpIHtcbiAgICAgICAgaWYgKHJldFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXRba2V5XSA9IGZba2V5XTtcbiAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB4O1xuICB9KTtcbn1cbi8qKlxuICogQXVnbWVudCBhIHN0cnVjdCB0byB0cmltIHN0cmluZyBpbnB1dHMuXG4gKlxuICogTm90ZTogWW91IG11c3QgdXNlIGBjcmVhdGUodmFsdWUsIFN0cnVjdClgIG9uIHRoZSB2YWx1ZSB0byBoYXZlIHRoZSBjb2VyY2lvblxuICogdGFrZSBlZmZlY3QhIFVzaW5nIHNpbXBseSBgYXNzZXJ0KClgIG9yIGBpcygpYCB3aWxsIG5vdCB1c2UgY29lcmNpb24uXG4gKi9cblxuZnVuY3Rpb24gdHJpbW1lZChzdHJ1Y3QpIHtcbiAgcmV0dXJuIGNvZXJjZShzdHJ1Y3QsIHN0cmluZygpLCB4ID0+IHgudHJpbSgpKTtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBhIHN0cmluZywgYXJyYXksIG1hcCwgb3Igc2V0IGlzIGVtcHR5LlxuICovXG5cbmZ1bmN0aW9uIGVtcHR5KHN0cnVjdCkge1xuICByZXR1cm4gcmVmaW5lKHN0cnVjdCwgJ2VtcHR5JywgdmFsdWUgPT4ge1xuICAgIGNvbnN0IHNpemUgPSBnZXRTaXplKHZhbHVlKTtcbiAgICByZXR1cm4gc2l6ZSA9PT0gMCB8fCBgRXhwZWN0ZWQgYW4gZW1wdHkgJHtzdHJ1Y3QudHlwZX0gYnV0IHJlY2VpdmVkIG9uZSB3aXRoIGEgc2l6ZSBvZiBcXGAke3NpemV9XFxgYDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFNpemUodmFsdWUpIHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTWFwIHx8IHZhbHVlIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgcmV0dXJuIHZhbHVlLnNpemU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aDtcbiAgfVxufVxuLyoqXG4gKiBFbnN1cmUgdGhhdCBhIG51bWJlciBvciBkYXRlIGlzIGJlbG93IGEgdGhyZXNob2xkLlxuICovXG5cblxuZnVuY3Rpb24gbWF4KHN0cnVjdCwgdGhyZXNob2xkLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBjb25zdCB7XG4gICAgZXhjbHVzaXZlXG4gIH0gPSBvcHRpb25zO1xuICByZXR1cm4gcmVmaW5lKHN0cnVjdCwgJ21heCcsIHZhbHVlID0+IHtcbiAgICByZXR1cm4gZXhjbHVzaXZlID8gdmFsdWUgPCB0aHJlc2hvbGQgOiB2YWx1ZSA8PSB0aHJlc2hvbGQgfHwgYEV4cGVjdGVkIGEgJHtzdHJ1Y3QudHlwZX0gbGVzcyB0aGFuICR7ZXhjbHVzaXZlID8gJycgOiAnb3IgZXF1YWwgdG8gJ30ke3RocmVzaG9sZH0gYnV0IHJlY2VpdmVkIFxcYCR7dmFsdWV9XFxgYDtcbiAgfSk7XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGEgbnVtYmVyIG9yIGRhdGUgaXMgYWJvdmUgYSB0aHJlc2hvbGQuXG4gKi9cblxuZnVuY3Rpb24gbWluKHN0cnVjdCwgdGhyZXNob2xkLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBjb25zdCB7XG4gICAgZXhjbHVzaXZlXG4gIH0gPSBvcHRpb25zO1xuICByZXR1cm4gcmVmaW5lKHN0cnVjdCwgJ21pbicsIHZhbHVlID0+IHtcbiAgICByZXR1cm4gZXhjbHVzaXZlID8gdmFsdWUgPiB0aHJlc2hvbGQgOiB2YWx1ZSA+PSB0aHJlc2hvbGQgfHwgYEV4cGVjdGVkIGEgJHtzdHJ1Y3QudHlwZX0gZ3JlYXRlciB0aGFuICR7ZXhjbHVzaXZlID8gJycgOiAnb3IgZXF1YWwgdG8gJ30ke3RocmVzaG9sZH0gYnV0IHJlY2VpdmVkIFxcYCR7dmFsdWV9XFxgYDtcbiAgfSk7XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGEgc3RyaW5nLCBhcnJheSwgbWFwIG9yIHNldCBpcyBub3QgZW1wdHkuXG4gKi9cblxuZnVuY3Rpb24gbm9uZW1wdHkoc3RydWN0KSB7XG4gIHJldHVybiByZWZpbmUoc3RydWN0LCAnbm9uZW1wdHknLCB2YWx1ZSA9PiB7XG4gICAgY29uc3Qgc2l6ZSA9IGdldFNpemUodmFsdWUpO1xuICAgIHJldHVybiBzaXplID4gMCB8fCBgRXhwZWN0ZWQgYSBub25lbXB0eSAke3N0cnVjdC50eXBlfSBidXQgcmVjZWl2ZWQgYW4gZW1wdHkgb25lYDtcbiAgfSk7XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGEgc3RyaW5nIG1hdGNoZXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKi9cblxuZnVuY3Rpb24gcGF0dGVybihzdHJ1Y3QsIHJlZ2V4cCkge1xuICByZXR1cm4gcmVmaW5lKHN0cnVjdCwgJ3BhdHRlcm4nLCB2YWx1ZSA9PiB7XG4gICAgcmV0dXJuIHJlZ2V4cC50ZXN0KHZhbHVlKSB8fCBgRXhwZWN0ZWQgYSAke3N0cnVjdC50eXBlfSBtYXRjaGluZyBcXGAvJHtyZWdleHAuc291cmNlfS9cXGAgYnV0IHJlY2VpdmVkIFwiJHt2YWx1ZX1cImA7XG4gIH0pO1xufVxuLyoqXG4gKiBFbnN1cmUgdGhhdCBhIHN0cmluZywgYXJyYXksIG51bWJlciwgZGF0ZSwgbWFwLCBvciBzZXQgaGFzIGEgc2l6ZSAob3IgbGVuZ3RoLCBvciB0aW1lKSBiZXR3ZWVuIGBtaW5gIGFuZCBgbWF4YC5cbiAqL1xuXG5mdW5jdGlvbiBzaXplKHN0cnVjdCwgbWluLCBtYXgpIHtcbiAgaWYgKG1heCA9PT0gdm9pZCAwKSB7XG4gICAgbWF4ID0gbWluO1xuICB9XG5cbiAgY29uc3QgZXhwZWN0ZWQgPSBgRXhwZWN0ZWQgYSAke3N0cnVjdC50eXBlfWA7XG4gIGNvbnN0IG9mID0gbWluID09PSBtYXggPyBgb2YgXFxgJHttaW59XFxgYCA6IGBiZXR3ZWVuIFxcYCR7bWlufVxcYCBhbmQgXFxgJHttYXh9XFxgYDtcbiAgcmV0dXJuIHJlZmluZShzdHJ1Y3QsICdzaXplJywgdmFsdWUgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuIG1pbiA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSBtYXggfHwgYCR7ZXhwZWN0ZWR9ICR7b2Z9IGJ1dCByZWNlaXZlZCBcXGAke3ZhbHVlfVxcYGA7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBzaXplXG4gICAgICB9ID0gdmFsdWU7XG4gICAgICByZXR1cm4gbWluIDw9IHNpemUgJiYgc2l6ZSA8PSBtYXggfHwgYCR7ZXhwZWN0ZWR9IHdpdGggYSBzaXplICR7b2Z9IGJ1dCByZWNlaXZlZCBvbmUgd2l0aCBhIHNpemUgb2YgXFxgJHtzaXplfVxcYGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbGVuZ3RoXG4gICAgICB9ID0gdmFsdWU7XG4gICAgICByZXR1cm4gbWluIDw9IGxlbmd0aCAmJiBsZW5ndGggPD0gbWF4IHx8IGAke2V4cGVjdGVkfSB3aXRoIGEgbGVuZ3RoICR7b2Z9IGJ1dCByZWNlaXZlZCBvbmUgd2l0aCBhIGxlbmd0aCBvZiBcXGAke2xlbmd0aH1cXGBgO1xuICAgIH1cbiAgfSk7XG59XG4vKipcbiAqIEF1Z21lbnQgYSBgU3RydWN0YCB0byBhZGQgYW4gYWRkaXRpb25hbCByZWZpbmVtZW50IHRvIHRoZSB2YWxpZGF0aW9uLlxuICpcbiAqIFRoZSByZWZpbmVyIGZ1bmN0aW9uIGlzIGd1YXJhbnRlZWQgdG8gcmVjZWl2ZSBhIHZhbHVlIG9mIHRoZSBzdHJ1Y3QncyB0eXBlLFxuICogYmVjYXVzZSB0aGUgc3RydWN0J3MgZXhpc3RpbmcgdmFsaWRhdGlvbiB3aWxsIGFscmVhZHkgaGF2ZSBwYXNzZWQuIFRoaXNcbiAqIGFsbG93cyB5b3UgdG8gbGF5ZXIgYWRkaXRpb25hbCB2YWxpZGF0aW9uIG9uIHRvcCBvZiBleGlzdGluZyBzdHJ1Y3RzLlxuICovXG5cbmZ1bmN0aW9uIHJlZmluZShzdHJ1Y3QsIG5hbWUsIHJlZmluZXIpIHtcbiAgcmV0dXJuIG5ldyBTdHJ1Y3QoeyAuLi5zdHJ1Y3QsXG5cbiAgICAqcmVmaW5lcih2YWx1ZSwgY3R4KSB7XG4gICAgICB5aWVsZCogc3RydWN0LnJlZmluZXIodmFsdWUsIGN0eCk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWZpbmVyKHZhbHVlLCBjdHgpO1xuICAgICAgY29uc3QgZmFpbHVyZXMgPSB0b0ZhaWx1cmVzKHJlc3VsdCwgY3R4LCBzdHJ1Y3QsIHZhbHVlKTtcblxuICAgICAgZm9yIChjb25zdCBmYWlsdXJlIG9mIGZhaWx1cmVzKSB7XG4gICAgICAgIHlpZWxkIHsgLi4uZmFpbHVyZSxcbiAgICAgICAgICByZWZpbmVtZW50OiBuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xufVxuXG5leHBvcnRzLlN0cnVjdCA9IFN0cnVjdDtcbmV4cG9ydHMuU3RydWN0RXJyb3IgPSBTdHJ1Y3RFcnJvcjtcbmV4cG9ydHMuYW55ID0gYW55O1xuZXhwb3J0cy5hcnJheSA9IGFycmF5O1xuZXhwb3J0cy5hc3NlcnQgPSBhc3NlcnQ7XG5leHBvcnRzLmFzc2lnbiA9IGFzc2lnbjtcbmV4cG9ydHMuYmlnaW50ID0gYmlnaW50O1xuZXhwb3J0cy5ib29sZWFuID0gYm9vbGVhbjtcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5jcmVhdGUgPSBjcmVhdGU7XG5leHBvcnRzLmRhdGUgPSBkYXRlO1xuZXhwb3J0cy5kZWZhdWx0ZWQgPSBkZWZhdWx0ZWQ7XG5leHBvcnRzLmRlZmluZSA9IGRlZmluZTtcbmV4cG9ydHMuZGVwcmVjYXRlZCA9IGRlcHJlY2F0ZWQ7XG5leHBvcnRzLmR5bmFtaWMgPSBkeW5hbWljO1xuZXhwb3J0cy5lbXB0eSA9IGVtcHR5O1xuZXhwb3J0cy5lbnVtcyA9IGVudW1zO1xuZXhwb3J0cy5mdW5jID0gZnVuYztcbmV4cG9ydHMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbmV4cG9ydHMuaW50ZWdlciA9IGludGVnZXI7XG5leHBvcnRzLmludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbjtcbmV4cG9ydHMuaXMgPSBpcztcbmV4cG9ydHMubGF6eSA9IGxhenk7XG5leHBvcnRzLmxpdGVyYWwgPSBsaXRlcmFsO1xuZXhwb3J0cy5tYXAgPSBtYXA7XG5leHBvcnRzLm1hc2sgPSBtYXNrO1xuZXhwb3J0cy5tYXggPSBtYXg7XG5leHBvcnRzLm1pbiA9IG1pbjtcbmV4cG9ydHMubmV2ZXIgPSBuZXZlcjtcbmV4cG9ydHMubm9uZW1wdHkgPSBub25lbXB0eTtcbmV4cG9ydHMubnVsbGFibGUgPSBudWxsYWJsZTtcbmV4cG9ydHMubnVtYmVyID0gbnVtYmVyO1xuZXhwb3J0cy5vYmplY3QgPSBvYmplY3Q7XG5leHBvcnRzLm9taXQgPSBvbWl0O1xuZXhwb3J0cy5vcHRpb25hbCA9IG9wdGlvbmFsO1xuZXhwb3J0cy5wYXJ0aWFsID0gcGFydGlhbDtcbmV4cG9ydHMucGF0dGVybiA9IHBhdHRlcm47XG5leHBvcnRzLnBpY2sgPSBwaWNrO1xuZXhwb3J0cy5yZWNvcmQgPSByZWNvcmQ7XG5leHBvcnRzLnJlZmluZSA9IHJlZmluZTtcbmV4cG9ydHMucmVnZXhwID0gcmVnZXhwO1xuZXhwb3J0cy5zZXQgPSBzZXQ7XG5leHBvcnRzLnNpemUgPSBzaXplO1xuZXhwb3J0cy5zdHJpbmcgPSBzdHJpbmc7XG5leHBvcnRzLnN0cnVjdCA9IHN0cnVjdDtcbmV4cG9ydHMudHJpbW1lZCA9IHRyaW1tZWQ7XG5leHBvcnRzLnR1cGxlID0gdHVwbGU7XG5leHBvcnRzLnR5cGUgPSB0eXBlO1xuZXhwb3J0cy51bmlvbiA9IHVuaW9uO1xuZXhwb3J0cy51bmtub3duID0gdW5rbm93bjtcbmV4cG9ydHMudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmNqcy5tYXBcbiIsImNvbnN0IGZpbHRlck5vb3AgPSAoKSA9PiB0cnVlXG5jb25zdCBpbnRlcm5hbEV2ZW50cyA9IFsnbmV3TGlzdGVuZXInLCAncmVtb3ZlTGlzdGVuZXInXVxuY29uc3QgZXh0ZXJuYWxFdmVudEZpbHRlciA9IChuYW1lKSA9PiAhaW50ZXJuYWxFdmVudHMuaW5jbHVkZXMobmFtZSlcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFdmVudEVtaXR0ZXJQcm94eSAoaW5pdGlhbFRhcmdldCwgb3B0cykge1xuICAvLyBwYXJzZSBvcHRpb25zXG4gIG9wdHMgPSBvcHRzIHx8IHt9XG4gIGxldCBldmVudEZpbHRlciA9IG9wdHMuZXZlbnRGaWx0ZXIgfHwgZmlsdGVyTm9vcFxuICBpZiAoZXZlbnRGaWx0ZXIgPT09ICdza2lwSW50ZXJuYWwnKSBldmVudEZpbHRlciA9IGV4dGVybmFsRXZlbnRGaWx0ZXJcbiAgaWYgKHR5cGVvZiBldmVudEZpbHRlciAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IEVycm9yKCdjcmVhdGVFdmVudEVtaXR0ZXJQcm94eSAtIEludmFsaWQgZXZlbnRGaWx0ZXInKVxuXG4gIGxldCB0YXJnZXQgPSBpbml0aWFsVGFyZ2V0XG5cbiAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoe30sIHtcbiAgICBnZXQ6IChfLCBuYW1lKSA9PiB7XG4gICAgICAvLyBvdmVycmlkZSBgc2V0VGFyZ2V0YCBhY2Nlc3NcbiAgICAgIGlmIChuYW1lID09PSAnc2V0VGFyZ2V0JykgcmV0dXJuIHNldFRhcmdldFxuICAgICAgcmV0dXJuIHRhcmdldFtuYW1lXVxuICAgIH0sXG4gICAgc2V0OiAoXywgbmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIC8vIGFsbG93IGBzZXRUYXJnZXRgIG92ZXJyaWRlc1xuICAgICAgaWYgKG5hbWUgPT09ICdzZXRUYXJnZXQnKSB7XG4gICAgICAgIHNldFRhcmdldCA9IHZhbHVlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9LFxuICB9KVxuXG4gIHJldHVybiBwcm94eVxuXG4gIGZ1bmN0aW9uIHNldFRhcmdldChuZXdUYXJnZXQpIHtcbiAgICBjb25zdCBvbGRUYXJnZXQgPSB0YXJnZXRcbiAgICB0YXJnZXQgPSBuZXdUYXJnZXRcbiAgICAvLyBtaWdyYXRlIGxpc3RlbmVyc1xuICAgIG9sZFRhcmdldC5ldmVudE5hbWVzKCkuZmlsdGVyKGV2ZW50RmlsdGVyKS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBnZXRSYXdMaXN0ZW5lcnMob2xkVGFyZ2V0LCBuYW1lKS5mb3JFYWNoKGhhbmRsZXIgPT4gbmV3VGFyZ2V0Lm9uKG5hbWUsIGhhbmRsZXIpKVxuICAgIH0pXG4gICAgLy8gcmVtb3ZlIG9sZFxuICAgIG9sZFRhcmdldC5yZW1vdmVBbGxMaXN0ZW5lcnMoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJhd0xpc3RlbmVycyhldmVudEVtaXR0ZXIsIG5hbWUpIHtcbiAgLy8gcHJlZmVyIG5hdGl2ZVxuICBpZiAoZXZlbnRFbWl0dGVyLnJhd0xpc3RlbmVycykgcmV0dXJuIGV2ZW50RW1pdHRlci5yYXdMaXN0ZW5lcnMobmFtZSlcbiAgLy8gZmFsbGJhY2sgdG8gbG9va3VwIGFnYWluc3QgaW50ZXJuYWwgb2JqZWN0XG4gIGxldCBldmVudHMgPSBldmVudEVtaXR0ZXIuX2V2ZW50c1tuYW1lXSB8fCBbXVxuICAvLyBlbnN1cmUgYXJyYXlcbiAgaWYgKCFBcnJheS5pc0FycmF5KGV2ZW50cykpIGV2ZW50cyA9IFtldmVudHNdXG4gIC8vIHJldHVybiBjb3B5XG4gIHJldHVybiBldmVudHMuc2xpY2UoKVxufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVN3YXBwYWJsZVByb3h5IChpbml0aWFsVGFyZ2V0KSB7XG4gIGxldCB0YXJnZXQgPSBpbml0aWFsVGFyZ2V0XG5cbiAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoe30sIHtcbiAgICBnZXQ6IChfLCBuYW1lKSA9PiB7XG4gICAgICAvLyBvdmVycmlkZSBgc2V0VGFyZ2V0YCBhY2Nlc3NcbiAgICAgIGlmIChuYW1lID09PSAnc2V0VGFyZ2V0JykgcmV0dXJuIHNldFRhcmdldFxuICAgICAgcmV0dXJuIHRhcmdldFtuYW1lXVxuICAgIH0sXG4gICAgc2V0OiAoXywgbmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIC8vIGFsbG93IGBzZXRUYXJnZXRgIG92ZXJyaWRlc1xuICAgICAgaWYgKG5hbWUgPT09ICdzZXRUYXJnZXQnKSB7XG4gICAgICAgIHNldFRhcmdldCA9IHZhbHVlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9LFxuICB9KVxuXG4gIHJldHVybiBwcm94eVxuXG4gIGZ1bmN0aW9uIHNldFRhcmdldChuZXdUYXJnZXQpIHtcbiAgICB0YXJnZXQgPSBuZXdUYXJnZXRcbiAgfVxufVxuIiwiY29uc3QgY3JlYXRlU3dhcHBhYmxlUHJveHkgPSByZXF1aXJlKCcuL2NyZWF0ZVN3YXBwYWJsZVByb3h5JylcbmNvbnN0IGNyZWF0ZUV2ZW50RW1pdHRlclByb3h5ID0gcmVxdWlyZSgnLi9jcmVhdGVFdmVudEVtaXR0ZXJQcm94eScpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVTd2FwcGFibGVQcm94eSxcbiAgY3JlYXRlRXZlbnRFbWl0dGVyUHJveHksXG59XG4iLCJ2YXIgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJylcblxuLy8gdGhyb3VnaFxuLy9cbi8vIGEgc3RyZWFtIHRoYXQgZG9lcyBub3RoaW5nIGJ1dCByZS1lbWl0IHRoZSBpbnB1dC5cbi8vIHVzZWZ1bCBmb3IgYWdncmVnYXRpbmcgYSBzZXJpZXMgb2YgY2hhbmdpbmcgYnV0IG5vdCBlbmRpbmcgc3RyZWFtcyBpbnRvIG9uZSBzdHJlYW0pXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHRocm91Z2hcbnRocm91Z2gudGhyb3VnaCA9IHRocm91Z2hcblxuLy9jcmVhdGUgYSByZWFkYWJsZSB3cml0YWJsZSBzdHJlYW0uXG5cbmZ1bmN0aW9uIHRocm91Z2ggKHdyaXRlLCBlbmQsIG9wdHMpIHtcbiAgd3JpdGUgPSB3cml0ZSB8fCBmdW5jdGlvbiAoZGF0YSkgeyB0aGlzLnF1ZXVlKGRhdGEpIH1cbiAgZW5kID0gZW5kIHx8IGZ1bmN0aW9uICgpIHsgdGhpcy5xdWV1ZShudWxsKSB9XG5cbiAgdmFyIGVuZGVkID0gZmFsc2UsIGRlc3Ryb3llZCA9IGZhbHNlLCBidWZmZXIgPSBbXSwgX2VuZGVkID0gZmFsc2VcbiAgdmFyIHN0cmVhbSA9IG5ldyBTdHJlYW0oKVxuICBzdHJlYW0ucmVhZGFibGUgPSBzdHJlYW0ud3JpdGFibGUgPSB0cnVlXG4gIHN0cmVhbS5wYXVzZWQgPSBmYWxzZVxuXG4vLyAgc3RyZWFtLmF1dG9QYXVzZSAgID0gIShvcHRzICYmIG9wdHMuYXV0b1BhdXNlICAgPT09IGZhbHNlKVxuICBzdHJlYW0uYXV0b0Rlc3Ryb3kgPSAhKG9wdHMgJiYgb3B0cy5hdXRvRGVzdHJveSA9PT0gZmFsc2UpXG5cbiAgc3RyZWFtLndyaXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB3cml0ZS5jYWxsKHRoaXMsIGRhdGEpXG4gICAgcmV0dXJuICFzdHJlYW0ucGF1c2VkXG4gIH1cblxuICBmdW5jdGlvbiBkcmFpbigpIHtcbiAgICB3aGlsZShidWZmZXIubGVuZ3RoICYmICFzdHJlYW0ucGF1c2VkKSB7XG4gICAgICB2YXIgZGF0YSA9IGJ1ZmZlci5zaGlmdCgpXG4gICAgICBpZihudWxsID09PSBkYXRhKVxuICAgICAgICByZXR1cm4gc3RyZWFtLmVtaXQoJ2VuZCcpXG4gICAgICBlbHNlXG4gICAgICAgIHN0cmVhbS5lbWl0KCdkYXRhJywgZGF0YSlcbiAgICB9XG4gIH1cblxuICBzdHJlYW0ucXVldWUgPSBzdHJlYW0ucHVzaCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4vLyAgICBjb25zb2xlLmVycm9yKGVuZGVkKVxuICAgIGlmKF9lbmRlZCkgcmV0dXJuIHN0cmVhbVxuICAgIGlmKGRhdGEgPT09IG51bGwpIF9lbmRlZCA9IHRydWVcbiAgICBidWZmZXIucHVzaChkYXRhKVxuICAgIGRyYWluKClcbiAgICByZXR1cm4gc3RyZWFtXG4gIH1cblxuICAvL3RoaXMgd2lsbCBiZSByZWdpc3RlcmVkIGFzIHRoZSBmaXJzdCAnZW5kJyBsaXN0ZW5lclxuICAvL211c3QgY2FsbCBkZXN0cm95IG5leHQgdGljaywgdG8gbWFrZSBzdXJlIHdlJ3JlIGFmdGVyIGFueVxuICAvL3N0cmVhbSBwaXBlZCBmcm9tIGhlcmUuXG4gIC8vdGhpcyBpcyBvbmx5IGEgcHJvYmxlbSBpZiBlbmQgaXMgbm90IGVtaXR0ZWQgc3luY2hyb25vdXNseS5cbiAgLy9hIG5pY2VyIHdheSB0byBkbyB0aGlzIGlzIHRvIG1ha2Ugc3VyZSB0aGlzIGlzIHRoZSBsYXN0IGxpc3RlbmVyIGZvciAnZW5kJ1xuXG4gIHN0cmVhbS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgIHN0cmVhbS5yZWFkYWJsZSA9IGZhbHNlXG4gICAgaWYoIXN0cmVhbS53cml0YWJsZSAmJiBzdHJlYW0uYXV0b0Rlc3Ryb3kpXG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RyZWFtLmRlc3Ryb3koKVxuICAgICAgfSlcbiAgfSlcblxuICBmdW5jdGlvbiBfZW5kICgpIHtcbiAgICBzdHJlYW0ud3JpdGFibGUgPSBmYWxzZVxuICAgIGVuZC5jYWxsKHN0cmVhbSlcbiAgICBpZighc3RyZWFtLnJlYWRhYmxlICYmIHN0cmVhbS5hdXRvRGVzdHJveSlcbiAgICAgIHN0cmVhbS5kZXN0cm95KClcbiAgfVxuXG4gIHN0cmVhbS5lbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGlmKGVuZGVkKSByZXR1cm5cbiAgICBlbmRlZCA9IHRydWVcbiAgICBpZihhcmd1bWVudHMubGVuZ3RoKSBzdHJlYW0ud3JpdGUoZGF0YSlcbiAgICBfZW5kKCkgLy8gd2lsbCBlbWl0IG9yIHF1ZXVlXG4gICAgcmV0dXJuIHN0cmVhbVxuICB9XG5cbiAgc3RyZWFtLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYoZGVzdHJveWVkKSByZXR1cm5cbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gICAgZW5kZWQgPSB0cnVlXG4gICAgYnVmZmVyLmxlbmd0aCA9IDBcbiAgICBzdHJlYW0ud3JpdGFibGUgPSBzdHJlYW0ucmVhZGFibGUgPSBmYWxzZVxuICAgIHN0cmVhbS5lbWl0KCdjbG9zZScpXG4gICAgcmV0dXJuIHN0cmVhbVxuICB9XG5cbiAgc3RyZWFtLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmKHN0cmVhbS5wYXVzZWQpIHJldHVyblxuICAgIHN0cmVhbS5wYXVzZWQgPSB0cnVlXG4gICAgcmV0dXJuIHN0cmVhbVxuICB9XG5cbiAgc3RyZWFtLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZihzdHJlYW0ucGF1c2VkKSB7XG4gICAgICBzdHJlYW0ucGF1c2VkID0gZmFsc2VcbiAgICAgIHN0cmVhbS5lbWl0KCdyZXN1bWUnKVxuICAgIH1cbiAgICBkcmFpbigpXG4gICAgLy9tYXkgaGF2ZSBiZWNvbWUgcGF1c2VkIGFnYWluLFxuICAgIC8vYXMgZHJhaW4gZW1pdHMgJ2RhdGEnLlxuICAgIGlmKCFzdHJlYW0ucGF1c2VkKVxuICAgICAgc3RyZWFtLmVtaXQoJ2RyYWluJylcbiAgICByZXR1cm4gc3RyZWFtXG4gIH1cbiAgcmV0dXJuIHN0cmVhbVxufVxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRvRGF0YVZpZXcgKGRhdGEpIHtcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBJbnQ4QXJyYXkgfHwgZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgfHwgZGF0YSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSB7XG4gICAgcmV0dXJuIG5ldyBEYXRhVmlldyhkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpXG4gIH1cblxuICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRhVmlldyhkYXRhKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYGRhdGFgIHRvIGJlIGFuIEFycmF5QnVmZmVyLCBCdWZmZXIsIEludDhBcnJheSwgVWludDhBcnJheSBvciBVaW50OENsYW1wZWRBcnJheScpXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuRklBVF9SQVRFU19VUERBVEUgPSBleHBvcnRzLk5PVElGSUNBVElPTiA9IGV4cG9ydHMuQkxPQ0sgPSBleHBvcnRzLkNPTk5FQ1QgPSBleHBvcnRzLkVSUk9SID0gdm9pZCAwO1xuLy8gYmxvY2tjaGFpbiBldmVudHNcbnZhciBFUlJPUiA9ICdibG9ja2NoYWluLWVycm9yJztcbmV4cG9ydHMuRVJST1IgPSBFUlJPUjtcbnZhciBDT05ORUNUID0gJ2Jsb2NrY2hhaW4tY29ubmVjdCc7XG5leHBvcnRzLkNPTk5FQ1QgPSBDT05ORUNUO1xudmFyIEJMT0NLID0gJ2Jsb2NrY2hhaW4tYmxvY2snO1xuZXhwb3J0cy5CTE9DSyA9IEJMT0NLO1xudmFyIE5PVElGSUNBVElPTiA9ICdibG9ja2NoYWluLW5vdGlmaWNhdGlvbic7XG5leHBvcnRzLk5PVElGSUNBVElPTiA9IE5PVElGSUNBVElPTjtcbnZhciBGSUFUX1JBVEVTX1VQREFURSA9ICdmaWF0LXJhdGVzLXVwZGF0ZSc7XG5leHBvcnRzLkZJQVRfUkFURVNfVVBEQVRFID0gRklBVF9SQVRFU19VUERBVEU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLlBPT0xfUkVMQVlfVFlQRSA9IGV4cG9ydHMuQ0VSVElGSUNBVEVfVFlQRSA9IGV4cG9ydHMuQUREUkVTU19UWVBFID0gZXhwb3J0cy5ORVRXT1JLX0lEUyA9IGV4cG9ydHMuUFJPVE9DT0xfTUFHSUNTID0gdm9pZCAwO1xudmFyIFBST1RPQ09MX01BR0lDUyA9IE9iamVjdC5mcmVlemUoe1xuICBtYWlubmV0OiA3NjQ4MjQwNzMsXG4gIHRlc3RuZXQ6IDQyXG59KTtcbmV4cG9ydHMuUFJPVE9DT0xfTUFHSUNTID0gUFJPVE9DT0xfTUFHSUNTO1xudmFyIE5FVFdPUktfSURTID0gT2JqZWN0LmZyZWV6ZSh7XG4gIG1haW5uZXQ6IDEsXG4gIHRlc3RuZXQ6IDBcbn0pOyAvLyBjb25zdGFudHMgYmVsb3cgYXJlIGRlcHJlY2F0ZWRcbi8vIHVzZSBgQ2FyZGFub0FkZHJlc3NUeXBlYCwgYENhcmRhbm9DZXJ0aWZpY2F0ZVR5cGVgIGFuZCBgQ2FyZGFub1Bvb2xSZWxheVR5cGVgIGZyb20gcHJvdG9idWYgaW5zdGVhZFxuXG5leHBvcnRzLk5FVFdPUktfSURTID0gTkVUV09SS19JRFM7XG52YXIgQUREUkVTU19UWVBFID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEJhc2U6IDAsXG4gIFBvaW50ZXI6IDQsXG4gIEVudGVycHJpc2U6IDYsXG4gIEJ5cm9uOiA4LFxuICBSZXdhcmQ6IDE0XG59KTtcbmV4cG9ydHMuQUREUkVTU19UWVBFID0gQUREUkVTU19UWVBFO1xudmFyIENFUlRJRklDQVRFX1RZUEUgPSBPYmplY3QuZnJlZXplKHtcbiAgU3Rha2VSZWdpc3RyYXRpb246IDAsXG4gIFN0YWtlRGVyZWdpc3RyYXRpb246IDEsXG4gIFN0YWtlRGVsZWdhdGlvbjogMixcbiAgU3Rha2VQb29sUmVnaXN0cmF0aW9uOiAzXG59KTtcbmV4cG9ydHMuQ0VSVElGSUNBVEVfVFlQRSA9IENFUlRJRklDQVRFX1RZUEU7XG52YXIgUE9PTF9SRUxBWV9UWVBFID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFNpbmdsZUhvc3RJcDogMCxcbiAgU2luZ2xlSG9zdE5hbWU6IDEsXG4gIE11bHRpcGxlSG9zdE5hbWU6IDJcbn0pO1xuZXhwb3J0cy5QT09MX1JFTEFZX1RZUEUgPSBQT09MX1JFTEFZX1RZUEU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLldBSVRfRk9SX1NFTEVDVElPTiA9IGV4cG9ydHMuV09SRCA9IGV4cG9ydHMuUEFTU1BIUkFTRV9PTl9ERVZJQ0UgPSBleHBvcnRzLlBBU1NQSFJBU0UgPSBleHBvcnRzLlBJTiA9IGV4cG9ydHMuQlVUVE9OID0gZXhwb3J0cy5MT0FESU5HID0gZXhwb3J0cy5VU0VEX0VMU0VXSEVSRSA9IGV4cG9ydHMuUkVMRUFTRUQgPSBleHBvcnRzLkFDUVVJUkVEID0gZXhwb3J0cy5SRUxFQVNFID0gZXhwb3J0cy5BQ1FVSVJFID0gZXhwb3J0cy5DSEFOR0VEID0gZXhwb3J0cy5ESVNDT05ORUNUID0gZXhwb3J0cy5DT05ORUNUX1VOQUNRVUlSRUQgPSBleHBvcnRzLkNPTk5FQ1QgPSB2b2lkIDA7XG4vLyBkZXZpY2UgbGlzdCBldmVudHNcbnZhciBDT05ORUNUID0gJ2RldmljZS1jb25uZWN0JztcbmV4cG9ydHMuQ09OTkVDVCA9IENPTk5FQ1Q7XG52YXIgQ09OTkVDVF9VTkFDUVVJUkVEID0gJ2RldmljZS1jb25uZWN0X3VuYWNxdWlyZWQnO1xuZXhwb3J0cy5DT05ORUNUX1VOQUNRVUlSRUQgPSBDT05ORUNUX1VOQUNRVUlSRUQ7XG52YXIgRElTQ09OTkVDVCA9ICdkZXZpY2UtZGlzY29ubmVjdCc7XG5leHBvcnRzLkRJU0NPTk5FQ1QgPSBESVNDT05ORUNUO1xudmFyIENIQU5HRUQgPSAnZGV2aWNlLWNoYW5nZWQnO1xuZXhwb3J0cy5DSEFOR0VEID0gQ0hBTkdFRDtcbnZhciBBQ1FVSVJFID0gJ2RldmljZS1hY3F1aXJlJztcbmV4cG9ydHMuQUNRVUlSRSA9IEFDUVVJUkU7XG52YXIgUkVMRUFTRSA9ICdkZXZpY2UtcmVsZWFzZSc7XG5leHBvcnRzLlJFTEVBU0UgPSBSRUxFQVNFO1xudmFyIEFDUVVJUkVEID0gJ2RldmljZS1hY3F1aXJlZCc7XG5leHBvcnRzLkFDUVVJUkVEID0gQUNRVUlSRUQ7XG52YXIgUkVMRUFTRUQgPSAnZGV2aWNlLXJlbGVhc2VkJztcbmV4cG9ydHMuUkVMRUFTRUQgPSBSRUxFQVNFRDtcbnZhciBVU0VEX0VMU0VXSEVSRSA9ICdkZXZpY2UtdXNlZF9lbHNld2hlcmUnO1xuZXhwb3J0cy5VU0VEX0VMU0VXSEVSRSA9IFVTRURfRUxTRVdIRVJFO1xudmFyIExPQURJTkcgPSAnZGV2aWNlLWxvYWRpbmcnOyAvLyB0cmV6b3ItbGluayBldmVudHMgaW4gcHJvdG9idWYgZm9ybWF0XG5cbmV4cG9ydHMuTE9BRElORyA9IExPQURJTkc7XG52YXIgQlVUVE9OID0gJ2J1dHRvbic7XG5leHBvcnRzLkJVVFRPTiA9IEJVVFRPTjtcbnZhciBQSU4gPSAncGluJztcbmV4cG9ydHMuUElOID0gUElOO1xudmFyIFBBU1NQSFJBU0UgPSAncGFzc3BocmFzZSc7XG5leHBvcnRzLlBBU1NQSFJBU0UgPSBQQVNTUEhSQVNFO1xudmFyIFBBU1NQSFJBU0VfT05fREVWSUNFID0gJ3Bhc3NwaHJhc2Vfb25fZGV2aWNlJztcbmV4cG9ydHMuUEFTU1BIUkFTRV9PTl9ERVZJQ0UgPSBQQVNTUEhSQVNFX09OX0RFVklDRTtcbnZhciBXT1JEID0gJ3dvcmQnOyAvLyBjdXN0b21cblxuZXhwb3J0cy5XT1JEID0gV09SRDtcbnZhciBXQUlUX0ZPUl9TRUxFQ1RJT04gPSAnZGV2aWNlLXdhaXRfZm9yX3NlbGVjdGlvbic7XG5leHBvcnRzLldBSVRfRk9SX1NFTEVDVElPTiA9IFdBSVRfRk9SX1NFTEVDVElPTjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkxJQlVTQl9FUlJPUl9NRVNTQUdFID0gZXhwb3J0cy5XRUJVU0JfRVJST1JfTUVTU0FHRSA9IGV4cG9ydHMuSU5WQUxJRF9QSU5fRVJST1JfTUVTU0FHRSA9IGV4cG9ydHMuV1JPTkdfUFJFVklPVVNfU0VTU0lPTl9FUlJPUl9NRVNTQUdFID0gZXhwb3J0cy5UeXBlZEVycm9yID0gZXhwb3J0cy5UcmV6b3JFcnJvciA9IGV4cG9ydHMuRVJST1JfQ09ERVMgPSB2b2lkIDA7XG5cbnZhciBfaW5oZXJpdHNMb29zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2VcIikpO1xuXG52YXIgX3dyYXBOYXRpdmVTdXBlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3dyYXBOYXRpdmVTdXBlclwiKSk7XG5cbnZhciBFUlJPUl9DT0RFUyA9IHtcbiAgSW5pdF9Ob3RJbml0aWFsaXplZDogJ1RyZXpvckNvbm5lY3Qgbm90IHlldCBpbml0aWFsaXplZCcsXG4gIC8vIHJhY2UgY29uZGl0aW9uOiBjYWxsIG9uIG5vdCBpbml0aWFsaXplZCBDb3JlICh1c3VhbGx5IGhvdC1yZWxvYWRpbmcpXG4gIEluaXRfQWxyZWFkeUluaXRpYWxpemVkOiAnVHJlem9yQ29ubmVjdCBoYXMgYmVlbiBhbHJlYWR5IGluaXRpYWxpemVkJyxcbiAgLy8gdGhyb3duIGJ5IC5pbml0IGNhbGxlZCBtdWx0aXBsZSB0aW1lc1xuICBJbml0X0lmcmFtZUJsb2NrZWQ6ICdJZnJhbWUgYmxvY2tlZCcsXG4gIC8vIGlmcmFtZSBpbmplY3Rpb24gYmxvY2tlZCAoYWQtYmxvY2tlcilcbiAgSW5pdF9JZnJhbWVUaW1lb3V0OiAnSWZyYW1lIHRpbWVvdXQnLFxuICAvLyBpZnJhbWUgZGlkbid0IGxvYWQgaW4gc3BlY2lmaWVkIHRpbWVcbiAgSW5pdF9NYW5pZmVzdE1pc3Npbmc6ICdNYW5pZmVzdCBub3Qgc2V0LiBSZWFkIG1vcmUgYXQgaHR0cHM6Ly9naXRodWIuY29tL3RyZXpvci9jb25uZWN0L2Jsb2IvZGV2ZWxvcC9kb2NzL2luZGV4Lm1kJyxcbiAgLy8gbWFuaWZlc3QgaXMgbm90IHNldFxuICBQb3B1cF9Db25uZWN0aW9uTWlzc2luZzogJ1VuYWJsZSB0byBlc3RhYmxpc2ggY29ubmVjdGlvbiB3aXRoIGlmcmFtZScsXG4gIC8vIHRocm93biBieSBwb3B1cFxuICBUcmFuc3BvcnRfTWlzc2luZzogJ1RyYW5zcG9ydCBpcyBtaXNzaW5nJyxcbiAgLy8gbm8gdHJhbnNwb3J0IGF2YWlsYWJsZVxuICBUcmFuc3BvcnRfSW52YWxpZFByb3RvYnVmOiAnJyxcbiAgLy8gZ2VuZXJpYyBlcnJvciBmcm9tIHRyYW5zcG9ydCBsYXllciAodHJlem9yLWxpbmspXG4gIE1ldGhvZF9JbnZhbGlkUGFja2FnZTogJ1RoaXMgdmVyc2lvbiBvZiB0cmV6b3ItY29ubmVjdCBpcyBub3Qgc3VpdGFibGUgdG8gd29yayB3aXRob3V0IGJyb3dzZXIuIFVzZSB0cmV6b3ItY29ubmVjdEBleHRlbmRlZCBwYWNrYWdlIGluc3RlYWQnLFxuICAvLyB0aHJvd24gYnkgbm9kZSBhbmQgcmVhY3QtbmF0aXZlIGVudiB3aGlsZSB1c2luZyByZWd1bGFyICd3ZWInIHBhY2thZ2VcbiAgTWV0aG9kX0ludmFsaWRQYXJhbWV0ZXI6ICcnLFxuICAvLyByZXBsYWNlZCBieSBnZW5lcmljIHRleHRcbiAgTWV0aG9kX05vdEFsbG93ZWQ6ICdNZXRob2Qgbm90IGFsbG93ZWQgZm9yIHRoaXMgY29uZmlndXJhdGlvbicsXG4gIC8vIGV4YW1wbGU6IGRldmljZSBtYW5hZ2VtZW50IGluIHBvcHVwIG1vZGVcbiAgTWV0aG9kX1Blcm1pc3Npb25zTm90R3JhbnRlZDogJ1Blcm1pc3Npb25zIG5vdCBncmFudGVkJyxcbiAgLy8gcGVybWlzc2lvbi9jb25maXJtYXRpb24gbm90IGdyYW50ZWQgaW4gcG9wdXBcbiAgTWV0aG9kX0NhbmNlbDogJ0NhbmNlbGxlZCcsXG4gIC8vIHBlcm1pc3Npb24vY29uZmlybWF0aW9uIG5vdCBncmFudGVkIGluIHBvcHVwIE9SIC5jYW5jZWwoKSBjdXN0b20gZXJyb3JcbiAgTWV0aG9kX0ludGVycnVwdGVkOiAnUG9wdXAgY2xvc2VkJyxcbiAgLy8gaW50ZXJydXB0aW9uOiBwb3B1cCBjbG9zZWRcbiAgTWV0aG9kX1Vua25vd25Db2luOiAnQ29pbiBub3QgZm91bmQnLFxuICAvLyBjb2luIGRlZmluaXRpb24gbm90IGZvdW5kXG4gIE1ldGhvZF9BZGRyZXNzTm90TWF0Y2g6ICdBZGRyZXNzZXMgZG8gbm90IG1hdGNoJyxcbiAgLy8gdGhyb3duIGJ5IGFsbCBnZXRBZGRyZXNzIG1ldGhvZHMgd2l0aCBjdXN0b20gVUkgdmFsaWRhdGlvblxuICBNZXRob2RfRmlybXdhcmVVcGRhdGVfRG93bmxvYWRGYWlsZWQ6ICdGYWlsZWQgdG8gZG93bmxvYWQgZmlybXdhcmUgYmluYXJ5JyxcbiAgLy8gdGhyb3duIGJ5IEZpcm13YXJlVXBkYXRlIG1ldGhvZFxuICBNZXRob2RfQ3VzdG9tTWVzc2FnZV9DYWxsYmFjazogJ1BhcmFtZXRlciBcImNhbGxiYWNrXCIgaXMgbm90IGEgZnVuY3Rpb24nLFxuICAvLyB0aHJvd24gYnkgQ3VzdG9tTWVzc2FnZSBtZXRob2RcbiAgTWV0aG9kX0Rpc2NvdmVyeV9CdW5kbGVFeGNlcHRpb246ICcnLFxuICAvLyB0aHJvd24gYnkgZ2V0QWNjb3VudEluZm8gbWV0aG9kXG4gIE1ldGhvZF9PdmVycmlkZTogJ292ZXJyaWRlJyxcbiAgLy8gaW5uZXIgXCJlcnJvclwiLCBpdCdzIG1vcmUgbGlrZSBhIGludGVycnVwdGlvblxuICBNZXRob2RfTm9SZXNwb25zZTogJ0NhbGwgcmVzb2x2ZWQgd2l0aG91dCByZXNwb25zZScsXG4gIC8vIHRocm93biBieSBucG0gaW5kZXgoZXMpLCBjYWxsIHRvIENvcmUgcmVzb2x2ZWQgd2l0aG91dCByZXNwb25zZSwgc2hvdWxkIG5vdCBoYXBwZW5cbiAgQmFja2VuZF9Ob3RTdXBwb3J0ZWQ6ICdCbG9ja2NoYWluTGluayBzZXR0aW5ncyBub3QgZm91bmQgaW4gY29pbnMuanNvbicsXG4gIC8vIHRocm93biBieSBtZXRob2RzIHdoaWNoIHVzaW5nIGJhY2tlbmRzLCBibG9ja2NoYWluTGluayBub3QgZGVmaW5lZCBmb3IgdGhpcyBjb2luXG4gIEJhY2tlbmRfV29ya2VyTWlzc2luZzogJycsXG4gIC8vIHRocm93biBieSBCbG9ja2NoYWluTGluayBjbGFzcywgd29ya2VyIG5vdCBzcGVjaWZpZWRcbiAgQmFja2VuZF9EaXNjb25uZWN0ZWQ6ICdCYWNrZW5kIGRpc2Nvbm5lY3RlZCcsXG4gIC8vIHRocm93biBieSBCbG9ja2NoYWluTGluayBjbGFzc1xuICBCYWNrZW5kX0ludmFsaWQ6ICdJbnZhbGlkIGJhY2tlbmQnLFxuICAvLyB0aHJvd24gYnkgQmxvY2tjaGFpbkxpbmsgY2xhc3MsIGludmFsaWQgYmFja2VuZCAoaWU6IGJhY2tlbmQgZm9yIHdyb25nIGNvaW4gc2V0KVxuICBCYWNrZW5kX0Vycm9yOiAnJyxcbiAgLy8gdGhyb3duIGJ5IEJsb2NrY2hhaW5MaW5rIGNsYXNzLCBnZW5lcmljIG1lc3NhZ2UgZnJvbSAnYmxvY2tjaGFpbi1saW5rJ1xuICBSdW50aW1lOiAnJyxcbiAgLy8gdGhyb3duIGZyb20gc2V2ZXJhbCBwbGFjZXMsIHRoaXMgc2hvdWxkbid0IGV2ZXIgaGFwcGVuIHRob1xuICBEZXZpY2VfTm90Rm91bmQ6ICdEZXZpY2Ugbm90IGZvdW5kJyxcbiAgRGV2aWNlX0luaXRpYWxpemVGYWlsZWQ6ICcnLFxuICAvLyBnZW5lcmljIGVycm9yIGZyb20gZmlybXdhcmUgd2hpbGUgY2FsbGluZyBcIkluaXRpYWxpemVcIiBtZXNzYWdlXG4gIERldmljZV9Gd0V4Y2VwdGlvbjogJycsXG4gIC8vIGdlbmVyaWMgRmlybXdhcmVFeGNlcHRpb24gdHlwZVxuICBEZXZpY2VfTW9kZUV4Y2VwdGlvbjogJycsXG4gIC8vIGdlbmVyaWMgRGV2aWNlLlVuZXhwZWN0ZWRNb2RlIHR5cGVcbiAgRGV2aWNlX0Rpc2Nvbm5lY3RlZDogJ0RldmljZSBkaXNjb25uZWN0ZWQnLFxuICAvLyBkZXZpY2UgZGlzY29ubmVjdGVkIGR1cmluZyBjYWxsXG4gIERldmljZV9Vc2VkRWxzZXdoZXJlOiAnRGV2aWNlIGlzIHVzZWQgaW4gYW5vdGhlciB3aW5kb3cnLFxuICAvLyBpbnRlcnJ1cHRpb246IGN1cnJlbnQgc2Vzc2lvbiB0b2tlZCBieSBvdGhlciBhcHBsaWNhdGlvblxuICBEZXZpY2VfSW52YWxpZFN0YXRlOiAnUGFzc3BocmFzZSBpcyBpbmNvcnJlY3QnLFxuICAvLyBhdXRob3JpemF0aW9uIGVycm9yIChkZXZpY2Ugc3RhdGUgY29tcGFyaXNvbilcbiAgRGV2aWNlX0NhbGxJblByb2dyZXNzOiAnRGV2aWNlIGNhbGwgaW4gcHJvZ3Jlc3MnIC8vIHRocm93biB3aGVuIHRyeWluZyB0byBtYWtlIGFub3RoZXIgY2FsbCB3aGlsZSBjdXJyZW50IGlzIHN0aWxsIHJ1bm5pbmdcblxufTtcbmV4cG9ydHMuRVJST1JfQ09ERVMgPSBFUlJPUl9DT0RFUztcblxudmFyIFRyZXpvckVycm9yID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfRXJyb3IpIHtcbiAgKDAsIF9pbmhlcml0c0xvb3NlMltcImRlZmF1bHRcIl0pKFRyZXpvckVycm9yLCBfRXJyb3IpO1xuXG4gIGZ1bmN0aW9uIFRyZXpvckVycm9yKGNvZGUsIG1lc3NhZ2UpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9FcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpIHx8IHRoaXM7XG4gICAgX3RoaXMuY29kZSA9IGNvZGU7XG4gICAgX3RoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgcmV0dXJuIFRyZXpvckVycm9yO1xufSggLyojX19QVVJFX18qLygwLCBfd3JhcE5hdGl2ZVN1cGVyMltcImRlZmF1bHRcIl0pKEVycm9yKSk7XG5cbmV4cG9ydHMuVHJlem9yRXJyb3IgPSBUcmV6b3JFcnJvcjtcblxudmFyIFR5cGVkRXJyb3IgPSBmdW5jdGlvbiBUeXBlZEVycm9yKGlkLCBtZXNzYWdlKSB7XG4gIHJldHVybiBuZXcgVHJlem9yRXJyb3IoaWQsIG1lc3NhZ2UgfHwgRVJST1JfQ09ERVNbaWRdKTtcbn07IC8vIGEgc2xpZ2h0IGhhY2tcbi8vIHRoaXMgZXJyb3Igc3RyaW5nIGlzIGhhcmQtY29kZWRcbi8vIGluIGJvdGggYnJpZGdlIGFuZCBleHRlbnNpb25cblxuXG5leHBvcnRzLlR5cGVkRXJyb3IgPSBUeXBlZEVycm9yO1xudmFyIFdST05HX1BSRVZJT1VTX1NFU1NJT05fRVJST1JfTUVTU0FHRSA9ICd3cm9uZyBwcmV2aW91cyBzZXNzaW9uJztcbmV4cG9ydHMuV1JPTkdfUFJFVklPVVNfU0VTU0lPTl9FUlJPUl9NRVNTQUdFID0gV1JPTkdfUFJFVklPVVNfU0VTU0lPTl9FUlJPUl9NRVNTQUdFO1xudmFyIElOVkFMSURfUElOX0VSUk9SX01FU1NBR0UgPSAnUElOIGludmFsaWQnO1xuZXhwb3J0cy5JTlZBTElEX1BJTl9FUlJPUl9NRVNTQUdFID0gSU5WQUxJRF9QSU5fRVJST1JfTUVTU0FHRTtcbnZhciBXRUJVU0JfRVJST1JfTUVTU0FHRSA9ICdOZXR3b3JrRXJyb3I6IFVuYWJsZSB0byBjbGFpbSBpbnRlcmZhY2UuJzsgLy8gdHJlem9yZCBlcnJvciBwcmVmaXguXG4vLyB1c2VyIGhhcyBpbnN1ZmZpY2llbnQgcGVybWlzc2lvbnMuIG1heSBvY2N1ciBpbiBMaW51eCAobWlzc2luZyB1ZGV2IHJ1bGVzKSwgV2luZG93cyBhbmQgTWFjT1MuXG5cbmV4cG9ydHMuV0VCVVNCX0VSUk9SX01FU1NBR0UgPSBXRUJVU0JfRVJST1JfTUVTU0FHRTtcbnZhciBMSUJVU0JfRVJST1JfTUVTU0FHRSA9ICdMSUJVU0JfRVJST1InO1xuZXhwb3J0cy5MSUJVU0JfRVJST1JfTUVTU0FHRSA9IExJQlVTQl9FUlJPUl9NRVNTQUdFOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5DQUxMID0gZXhwb3J0cy5FUlJPUiA9IGV4cG9ydHMuSU5JVCA9IGV4cG9ydHMuTE9BREVEID0gZXhwb3J0cy5CT09UU1RSQVAgPSB2b2lkIDA7XG4vLyBNZXNzYWdlIGNhbGxlZCBmcm9tIGlmcmFtZS5odG1sIGlubGluZSBzY3JpcHQgYmVmb3JlIFwid2luZG93Lm9ubG9hZFwiIGV2ZW50LiBUaGlzIGlzIGZpcnN0IG1lc3NhZ2UgZnJvbSBpZnJhbWUgdG8gd2luZG93Lm9wZW5lci5cbnZhciBCT09UU1RSQVAgPSAnaWZyYW1lLWJvb3RzdHJhcCc7IC8vIE1lc3NhZ2UgZnJvbSBpZnJhbWUuanMgdG8gd2luZG93Lm9wZW5lciwgY2FsbGVkIGFmdGVyIFwid2luZG93Lm9ubG9hZFwiIGV2ZW50LiBUaGlzIGlzIHNlY29uZCBtZXNzYWdlIGZyb20gaWZyYW1lIHRvIHdpbmRvdy5vcGVuZXIuXG5cbmV4cG9ydHMuQk9PVFNUUkFQID0gQk9PVFNUUkFQO1xudmFyIExPQURFRCA9ICdpZnJhbWUtbG9hZGVkJzsgLy8gTWVzc2FnZSBmcm9tIHdpbmRvdy5vcGVuZXIgdG8gaWZyYW1lLmpzXG5cbmV4cG9ydHMuTE9BREVEID0gTE9BREVEO1xudmFyIElOSVQgPSAnaWZyYW1lLWluaXQnOyAvLyBFcnJvciBtZXNzYWdlIGZyb20gaWZyYW1lLmpzIHRvIHdpbmRvdy5vcGVuZXIuIENvdWxkIGJlIHRocm93biBkdXJpbmcgaWZyYW1lIGluaXRpYWxpemF0aW9uIHByb2Nlc3NcblxuZXhwb3J0cy5JTklUID0gSU5JVDtcbnZhciBFUlJPUiA9ICdpZnJhbWUtZXJyb3InOyAvLyBNZXNzYWdlIGZyb20gd2luZG93Lm9wZW5lciB0byBpZnJhbWUuIENhbGwgbWV0aG9kXG5cbmV4cG9ydHMuRVJST1IgPSBFUlJPUjtcbnZhciBDQUxMID0gJ2lmcmFtZS1jYWxsJztcbmV4cG9ydHMuQ0FMTCA9IENBTEw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkNBUkRBTk8gPSBleHBvcnRzLlVJID0gZXhwb3J0cy5UUkFOU1BPUlQgPSBleHBvcnRzLlBPUFVQID0gZXhwb3J0cy5ORVRXT1JLID0gZXhwb3J0cy5JRlJBTUUgPSBleHBvcnRzLkVSUk9SUyA9IGV4cG9ydHMuREVWSUNFID0gZXhwb3J0cy5CTE9DS0NIQUlOID0gZXhwb3J0cy5CTE9DS0NIQUlOX0VWRU5UID0gZXhwb3J0cy5SRVNQT05TRV9FVkVOVCA9IGV4cG9ydHMuVFJBTlNQT1JUX0VWRU5UID0gZXhwb3J0cy5ERVZJQ0VfRVZFTlQgPSBleHBvcnRzLlVJX0VWRU5UID0gZXhwb3J0cy5DT1JFX0VWRU5UID0gdm9pZCAwO1xuXG52YXIgQkxPQ0tDSEFJTiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL2Jsb2NrY2hhaW5cIikpO1xuXG5leHBvcnRzLkJMT0NLQ0hBSU4gPSBCTE9DS0NIQUlOO1xuXG52YXIgREVWSUNFID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vZGV2aWNlXCIpKTtcblxuZXhwb3J0cy5ERVZJQ0UgPSBERVZJQ0U7XG5cbnZhciBFUlJPUlMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9lcnJvcnNcIikpO1xuXG5leHBvcnRzLkVSUk9SUyA9IEVSUk9SUztcblxudmFyIElGUkFNRSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL2lmcmFtZVwiKSk7XG5cbmV4cG9ydHMuSUZSQU1FID0gSUZSQU1FO1xuXG52YXIgTkVUV09SSyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL25ldHdvcmtcIikpO1xuXG5leHBvcnRzLk5FVFdPUksgPSBORVRXT1JLO1xuXG52YXIgUE9QVVAgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9wb3B1cFwiKSk7XG5cbmV4cG9ydHMuUE9QVVAgPSBQT1BVUDtcblxudmFyIFRSQU5TUE9SVCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL3RyYW5zcG9ydFwiKSk7XG5cbmV4cG9ydHMuVFJBTlNQT1JUID0gVFJBTlNQT1JUO1xuXG52YXIgVUkgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi91aVwiKSk7XG5cbmV4cG9ydHMuVUkgPSBVSTtcblxudmFyIENBUkRBTk8gPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9jYXJkYW5vXCIpKTtcblxuZXhwb3J0cy5DQVJEQU5PID0gQ0FSREFOTztcblxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKSB7IGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDsgdmFyIGNhY2hlQmFiZWxJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgdmFyIGNhY2hlTm9kZUludGVyb3AgPSBuZXcgV2Vha01hcCgpOyByZXR1cm4gKF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSA9IGZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyByZXR1cm4gbm9kZUludGVyb3AgPyBjYWNoZU5vZGVJbnRlcm9wIDogY2FjaGVCYWJlbEludGVyb3A7IH0pKG5vZGVJbnRlcm9wKTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmosIG5vZGVJbnRlcm9wKSB7IGlmICghbm9kZUludGVyb3AgJiYgb2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikgeyByZXR1cm4geyBcImRlZmF1bHRcIjogb2JqIH07IH0gdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKTsgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7IHJldHVybiBjYWNoZS5nZXQob2JqKTsgfSB2YXIgbmV3T2JqID0ge307IHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoa2V5ICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7IGlmIChjYWNoZSkgeyBjYWNoZS5zZXQob2JqLCBuZXdPYmopOyB9IHJldHVybiBuZXdPYmo7IH1cblxudmFyIENPUkVfRVZFTlQgPSAnQ09SRV9FVkVOVCc7XG5leHBvcnRzLkNPUkVfRVZFTlQgPSBDT1JFX0VWRU5UO1xudmFyIFVJX0VWRU5UID0gJ1VJX0VWRU5UJztcbmV4cG9ydHMuVUlfRVZFTlQgPSBVSV9FVkVOVDtcbnZhciBERVZJQ0VfRVZFTlQgPSAnREVWSUNFX0VWRU5UJztcbmV4cG9ydHMuREVWSUNFX0VWRU5UID0gREVWSUNFX0VWRU5UO1xudmFyIFRSQU5TUE9SVF9FVkVOVCA9ICdUUkFOU1BPUlRfRVZFTlQnO1xuZXhwb3J0cy5UUkFOU1BPUlRfRVZFTlQgPSBUUkFOU1BPUlRfRVZFTlQ7XG52YXIgUkVTUE9OU0VfRVZFTlQgPSAnUkVTUE9OU0VfRVZFTlQnO1xuZXhwb3J0cy5SRVNQT05TRV9FVkVOVCA9IFJFU1BPTlNFX0VWRU5UO1xudmFyIEJMT0NLQ0hBSU5fRVZFTlQgPSAnQkxPQ0tDSEFJTl9FVkVOVCc7XG5leHBvcnRzLkJMT0NLQ0hBSU5fRVZFTlQgPSBCTE9DS0NIQUlOX0VWRU5UOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5UWVBFUyA9IHZvaWQgMDtcbnZhciBUWVBFUyA9IE9iamVjdC5mcmVlemUoe1xuICBiaXRjb2luOiAnQml0Y29pbicsXG4gIGV0aGVyZXVtOiAnRXRoZXJldW0nLFxuICBlb3M6ICdFb3MnLFxuICBuZW06ICdORU0nLFxuICBzdGVsbGFyOiAnU3RlbGxhcicsXG4gIGNhcmRhbm86ICdDYXJkYW5vJyxcbiAgcmlwcGxlOiAnUmlwcGxlJyxcbiAgdGV6b3M6ICdUZXpvcnMnLFxuICBiaW5hbmNlOiAnQmluYW5jZSdcbn0pO1xuZXhwb3J0cy5UWVBFUyA9IFRZUEVTOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5DTE9TRV9XSU5ET1cgPSBleHBvcnRzLkNBTkNFTF9QT1BVUF9SRVFVRVNUID0gZXhwb3J0cy5DTE9TRUQgPSBleHBvcnRzLkhBTkRTSEFLRSA9IGV4cG9ydHMuRVhURU5TSU9OX1VTQl9QRVJNSVNTSU9OUyA9IGV4cG9ydHMuRVJST1IgPSBleHBvcnRzLklOSVQgPSBleHBvcnRzLkxPQURFRCA9IGV4cG9ydHMuQk9PVFNUUkFQID0gdm9pZCAwO1xuLy8gTWVzc2FnZSBjYWxsZWQgZnJvbSBwb3B1cC5odG1sIGlubGluZSBzY3JpcHQgYmVmb3JlIFwid2luZG93Lm9ubG9hZFwiIGV2ZW50LiBUaGlzIGlzIGZpcnN0IG1lc3NhZ2UgZnJvbSBwb3B1cCB0byB3aW5kb3cub3BlbmVyLlxudmFyIEJPT1RTVFJBUCA9ICdwb3B1cC1ib290c3RyYXAnOyAvLyBNZXNzYWdlIGZyb20gcG9wdXAuanMgdG8gd2luZG93Lm9wZW5lciwgY2FsbGVkIGFmdGVyIFwid2luZG93Lm9ubG9hZFwiIGV2ZW50LiBUaGlzIGlzIHNlY29uZCBtZXNzYWdlIGZyb20gcG9wdXAgdG8gd2luZG93Lm9wZW5lci5cblxuZXhwb3J0cy5CT09UU1RSQVAgPSBCT09UU1RSQVA7XG52YXIgTE9BREVEID0gJ3BvcHVwLWxvYWRlZCc7IC8vIE1lc3NhZ2UgZnJvbSB3aW5kb3cub3BlbmVyIHRvIHBvcHVwLmpzLiBTZW5kIHNldHRpbmdzIHRvIHBvcHVwLiBUaGlzIGlzIGZpcnN0IG1lc3NhZ2UgZnJvbSB3aW5kb3cub3BlbmVyIHRvIHBvcHVwLlxuXG5leHBvcnRzLkxPQURFRCA9IExPQURFRDtcbnZhciBJTklUID0gJ3BvcHVwLWluaXQnOyAvLyBFcnJvciBtZXNzYWdlIGZyb20gcG9wdXAgdG8gd2luZG93Lm9wZW5lci4gQ291bGQgYmUgdGhyb3duIGR1cmluZyBwb3B1cCBpbml0aWFsaXphdGlvbiBwcm9jZXNzIChQT1BVUC5JTklUKVxuXG5leHBvcnRzLklOSVQgPSBJTklUO1xudmFyIEVSUk9SID0gJ3BvcHVwLWVycm9yJzsgLy8gTWVzc2FnZSB0byB3ZWJleHRlbnNpb25zLCBvcGVucyBcInRyZXpvci11c2ItcGVybWlzc2lvbi5odG1sXCIgd2l0aGluIHdlYmV4dGVuc2lvblxuXG5leHBvcnRzLkVSUk9SID0gRVJST1I7XG52YXIgRVhURU5TSU9OX1VTQl9QRVJNSVNTSU9OUyA9ICdvcGVuLXVzYi1wZXJtaXNzaW9ucyc7IC8vIE1lc3NhZ2UgY2FsbGVkIGZyb20gYm90aCBbcG9wdXAgPiBpZnJhbWVdIHRoZW4gW2lmcmFtZSA+IHBvcHVwXSBpbiB0aGlzIGV4YWN0IG9yZGVyLlxuLy8gRmlyc3RseSBwb3B1cCBjYWxsIGlmcmFtZSB0byByZXNvbHZlIHBvcHVwIHByb21pc2UgaW4gQ29yZVxuLy8gVGhlbiBpZnJhbWUgcmVhY3RzIHRvIFBPUFVQLkhBTkRTSEFLRSBtZXNzYWdlIGFuZCBzZW5kcyBDb25uZWN0U2V0dGluZ3MsIHRyYW5zcG9ydCBpbmZvcm1hdGlvbiBhbmQgcmVxdWVzdGVkIG1ldGhvZCBkZXRhaWxzIGJhY2sgdG8gcG9wdXBcblxuZXhwb3J0cy5FWFRFTlNJT05fVVNCX1BFUk1JU1NJT05TID0gRVhURU5TSU9OX1VTQl9QRVJNSVNTSU9OUztcbnZhciBIQU5EU0hBS0UgPSAncG9wdXAtaGFuZHNoYWtlJzsgLy8gRXZlbnQgZW1pdHRlZCBmcm9tIFBvcHVwTWFuYWdlciBhdCB0aGUgZW5kIG9mIHBvcHVwIGNsb3NpbmcgcHJvY2Vzcy5cbi8vIFNlbnQgZnJvbSBwb3B1cCB0aHJ1IHdpbmRvdy5vcGVuZXIgdG8gYW4gaWZyYW1lIGJlY2F1c2UgbWVzc2FnZSBjaGFubmVsIGJldHdlZW4gcG9wdXAgYW5kIGlmcmFtZSBpcyBubyBsb25nZXIgYXZhaWxhYmxlXG5cbmV4cG9ydHMuSEFORFNIQUtFID0gSEFORFNIQUtFO1xudmFyIENMT1NFRCA9ICdwb3B1cC1jbG9zZWQnOyAvLyBNZXNzYWdlIGNhbGxlZCBmcm9tIGlmcmFtZSB0byBwb3B1cCwgaXQgbWVhbnMgdGhhdCBwb3B1cCB3aWxsIG5vdCBiZSBuZWVkZWQgKGV4YW1wbGU6IEJsb2NrY2hhaW4gbWV0aG9kcyBhcmUgbm90IHVzaW5nIHBvcHVwIGF0IGFsbClcbi8vIFRoaXMgd2lsbCBjbG9zZSBhY3RpdmUgcG9wdXAgd2luZG93IGFuZC9vciBjbGVhciBvcGVuaW5nIHByb2Nlc3MgaW4gUG9wdXBNYW5hZ2VyIChtYXliZSBwb3B1cCB3YXNuJ3Qgb3BlbmVkIHlldClcblxuZXhwb3J0cy5DTE9TRUQgPSBDTE9TRUQ7XG52YXIgQ0FOQ0VMX1BPUFVQX1JFUVVFU1QgPSAndWktY2FuY2VsLXBvcHVwLXJlcXVlc3QnOyAvLyBNZXNzYWdlIGNhbGxlZCBmcm9tIGlubGluZSBlbGVtZW50IGluIHBvcHVwLmh0bWwgKHdpbmRvdy5jbG9zZVdpbmRvdyksIHRoaXMgaXMgdXNlZCBvbmx5IHdpdGggd2ViZXh0ZW5zaW9ucyB0byBwcm9wZXJseSBoYW5kbGUgcG9wdXAgY2xvc2UgZXZlbnRcblxuZXhwb3J0cy5DQU5DRUxfUE9QVVBfUkVRVUVTVCA9IENBTkNFTF9QT1BVUF9SRVFVRVNUO1xudmFyIENMT1NFX1dJTkRPVyA9ICd3aW5kb3cuY2xvc2UnO1xuZXhwb3J0cy5DTE9TRV9XSU5ET1cgPSBDTE9TRV9XSU5ET1c7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLlNUQVJUX1BFTkRJTkcgPSBleHBvcnRzLkRJU0FCTEVfV0VCVVNCID0gZXhwb3J0cy5SRVFVRVNUID0gZXhwb3J0cy5TVFJFQU0gPSBleHBvcnRzLlVQREFURSA9IGV4cG9ydHMuRVJST1IgPSBleHBvcnRzLlNUQVJUID0gdm9pZCAwO1xudmFyIFNUQVJUID0gJ3RyYW5zcG9ydC1zdGFydCc7XG5leHBvcnRzLlNUQVJUID0gU1RBUlQ7XG52YXIgRVJST1IgPSAndHJhbnNwb3J0LWVycm9yJztcbmV4cG9ydHMuRVJST1IgPSBFUlJPUjtcbnZhciBVUERBVEUgPSAndHJhbnNwb3J0LXVwZGF0ZSc7XG5leHBvcnRzLlVQREFURSA9IFVQREFURTtcbnZhciBTVFJFQU0gPSAndHJhbnNwb3J0LXN0cmVhbSc7XG5leHBvcnRzLlNUUkVBTSA9IFNUUkVBTTtcbnZhciBSRVFVRVNUID0gJ3RyYW5zcG9ydC1yZXF1ZXN0X2RldmljZSc7XG5leHBvcnRzLlJFUVVFU1QgPSBSRVFVRVNUO1xudmFyIERJU0FCTEVfV0VCVVNCID0gJ3RyYW5zcG9ydC1kaXNhYmxlX3dlYnVzYic7XG5leHBvcnRzLkRJU0FCTEVfV0VCVVNCID0gRElTQUJMRV9XRUJVU0I7XG52YXIgU1RBUlRfUEVORElORyA9ICd0cmFuc3BvcnQtc3RhcnRfcGVuZGluZyc7XG5leHBvcnRzLlNUQVJUX1BFTkRJTkcgPSBTVEFSVF9QRU5ESU5HOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5JRlJBTUVfRkFJTFVSRSA9IGV4cG9ydHMuQUREUkVTU19WQUxJREFUSU9OID0gZXhwb3J0cy5CVU5ETEVfUFJPR1JFU1MgPSBleHBvcnRzLkxPR0lOX0NIQUxMRU5HRV9SRVNQT05TRSA9IGV4cG9ydHMuTE9HSU5fQ0hBTExFTkdFX1JFUVVFU1QgPSBleHBvcnRzLkNVU1RPTV9NRVNTQUdFX1JFU1BPTlNFID0gZXhwb3J0cy5DVVNUT01fTUVTU0FHRV9SRVFVRVNUID0gZXhwb3J0cy5DSEFOR0VfU0VUVElOR1MgPSBleHBvcnRzLlJFQ0VJVkVfV09SRCA9IGV4cG9ydHMuUkVDRUlWRV9GRUUgPSBleHBvcnRzLlJFQ0VJVkVfQUNDT1VOVCA9IGV4cG9ydHMuQ0hBTkdFX0FDQ09VTlQgPSBleHBvcnRzLlJFQ0VJVkVfREVWSUNFID0gZXhwb3J0cy5SRUNFSVZFX1BBU1NQSFJBU0UgPSBleHBvcnRzLlJFQ0VJVkVfUElOID0gZXhwb3J0cy5SRUNFSVZFX0NPTkZJUk1BVElPTiA9IGV4cG9ydHMuUkVDRUlWRV9QRVJNSVNTSU9OID0gZXhwb3J0cy5SRVFVRVNUX1dPUkQgPSBleHBvcnRzLlJFUVVFU1RfQlVUVE9OID0gZXhwb3J0cy5JTlNVRkZJQ0lFTlRfRlVORFMgPSBleHBvcnRzLlVQREFURV9DVVNUT01fRkVFID0gZXhwb3J0cy5TRUxFQ1RfRkVFID0gZXhwb3J0cy5TRUxFQ1RfQUNDT1VOVCA9IGV4cG9ydHMuU0VMRUNUX0RFVklDRSA9IGV4cG9ydHMuU0VUX09QRVJBVElPTiA9IGV4cG9ydHMuTE9BRElORyA9IGV4cG9ydHMuQ09OTkVDVCA9IGV4cG9ydHMuSU5WQUxJRF9QQVNTUEhSQVNFX0FDVElPTiA9IGV4cG9ydHMuSU5WQUxJRF9QQVNTUEhSQVNFID0gZXhwb3J0cy5SRVFVRVNUX1BBU1NQSFJBU0VfT05fREVWSUNFID0gZXhwb3J0cy5SRVFVRVNUX1BBU1NQSFJBU0UgPSBleHBvcnRzLklOVkFMSURfUElOID0gZXhwb3J0cy5SRVFVRVNUX1BJTiA9IGV4cG9ydHMuUkVRVUVTVF9DT05GSVJNQVRJT04gPSBleHBvcnRzLlJFUVVFU1RfUEVSTUlTU0lPTiA9IGV4cG9ydHMuQ0xPU0VfVUlfV0lORE9XID0gZXhwb3J0cy5SRVFVRVNUX1VJX1dJTkRPVyA9IGV4cG9ydHMuREVWSUNFX05FRURTX0JBQ0tVUCA9IGV4cG9ydHMuRklSTVdBUkVfUFJPR1JFU1MgPSBleHBvcnRzLkZJUk1XQVJFX05PVF9JTlNUQUxMRUQgPSBleHBvcnRzLkZJUk1XQVJFX05PVF9DT01QQVRJQkxFID0gZXhwb3J0cy5GSVJNV0FSRV9OT1RfU1VQUE9SVEVEID0gZXhwb3J0cy5GSVJNV0FSRV9PVVREQVRFRCA9IGV4cG9ydHMuRklSTVdBUkVfT0xEID0gZXhwb3J0cy5TRUVETEVTUyA9IGV4cG9ydHMuSU5JVElBTElaRSA9IGV4cG9ydHMuUkVRVUlSRV9NT0RFID0gZXhwb3J0cy5OT1RfSU5fQk9PVExPQURFUiA9IGV4cG9ydHMuQk9PVExPQURFUiA9IGV4cG9ydHMuVFJBTlNQT1JUID0gdm9pZCAwO1xudmFyIFRSQU5TUE9SVCA9ICd1aS1ub190cmFuc3BvcnQnO1xuZXhwb3J0cy5UUkFOU1BPUlQgPSBUUkFOU1BPUlQ7XG52YXIgQk9PVExPQURFUiA9ICd1aS1kZXZpY2VfYm9vdGxvYWRlcl9tb2RlJztcbmV4cG9ydHMuQk9PVExPQURFUiA9IEJPT1RMT0FERVI7XG52YXIgTk9UX0lOX0JPT1RMT0FERVIgPSAndWktZGV2aWNlX25vdF9pbl9ib290bG9hZGVyX21vZGUnO1xuZXhwb3J0cy5OT1RfSU5fQk9PVExPQURFUiA9IE5PVF9JTl9CT09UTE9BREVSO1xudmFyIFJFUVVJUkVfTU9ERSA9ICd1aS1kZXZpY2VfcmVxdWlyZV9tb2RlJztcbmV4cG9ydHMuUkVRVUlSRV9NT0RFID0gUkVRVUlSRV9NT0RFO1xudmFyIElOSVRJQUxJWkUgPSAndWktZGV2aWNlX25vdF9pbml0aWFsaXplZCc7XG5leHBvcnRzLklOSVRJQUxJWkUgPSBJTklUSUFMSVpFO1xudmFyIFNFRURMRVNTID0gJ3VpLWRldmljZV9zZWVkbGVzcyc7XG5leHBvcnRzLlNFRURMRVNTID0gU0VFRExFU1M7XG52YXIgRklSTVdBUkVfT0xEID0gJ3VpLWRldmljZV9maXJtd2FyZV9vbGQnO1xuZXhwb3J0cy5GSVJNV0FSRV9PTEQgPSBGSVJNV0FSRV9PTEQ7XG52YXIgRklSTVdBUkVfT1VUREFURUQgPSAndWktZGV2aWNlX2Zpcm13YXJlX291dGRhdGVkJztcbmV4cG9ydHMuRklSTVdBUkVfT1VUREFURUQgPSBGSVJNV0FSRV9PVVREQVRFRDtcbnZhciBGSVJNV0FSRV9OT1RfU1VQUE9SVEVEID0gJ3VpLWRldmljZV9maXJtd2FyZV91bnN1cHBvcnRlZCc7XG5leHBvcnRzLkZJUk1XQVJFX05PVF9TVVBQT1JURUQgPSBGSVJNV0FSRV9OT1RfU1VQUE9SVEVEO1xudmFyIEZJUk1XQVJFX05PVF9DT01QQVRJQkxFID0gJ3VpLWRldmljZV9maXJtd2FyZV9ub3RfY29tcGF0aWJsZSc7XG5leHBvcnRzLkZJUk1XQVJFX05PVF9DT01QQVRJQkxFID0gRklSTVdBUkVfTk9UX0NPTVBBVElCTEU7XG52YXIgRklSTVdBUkVfTk9UX0lOU1RBTExFRCA9ICd1aS1kZXZpY2VfZmlybXdhcmVfbm90X2luc3RhbGxlZCc7XG5leHBvcnRzLkZJUk1XQVJFX05PVF9JTlNUQUxMRUQgPSBGSVJNV0FSRV9OT1RfSU5TVEFMTEVEO1xudmFyIEZJUk1XQVJFX1BST0dSRVNTID0gJ3VpLWZpcm13YXJlLXByb2dyZXNzJztcbmV4cG9ydHMuRklSTVdBUkVfUFJPR1JFU1MgPSBGSVJNV0FSRV9QUk9HUkVTUztcbnZhciBERVZJQ0VfTkVFRFNfQkFDS1VQID0gJ3VpLWRldmljZV9uZWVkc19iYWNrdXAnO1xuZXhwb3J0cy5ERVZJQ0VfTkVFRFNfQkFDS1VQID0gREVWSUNFX05FRURTX0JBQ0tVUDtcbnZhciBSRVFVRVNUX1VJX1dJTkRPVyA9ICd1aS1yZXF1ZXN0X3dpbmRvdyc7XG5leHBvcnRzLlJFUVVFU1RfVUlfV0lORE9XID0gUkVRVUVTVF9VSV9XSU5ET1c7XG52YXIgQ0xPU0VfVUlfV0lORE9XID0gJ3VpLWNsb3NlX3dpbmRvdyc7XG5leHBvcnRzLkNMT1NFX1VJX1dJTkRPVyA9IENMT1NFX1VJX1dJTkRPVztcbnZhciBSRVFVRVNUX1BFUk1JU1NJT04gPSAndWktcmVxdWVzdF9wZXJtaXNzaW9uJztcbmV4cG9ydHMuUkVRVUVTVF9QRVJNSVNTSU9OID0gUkVRVUVTVF9QRVJNSVNTSU9OO1xudmFyIFJFUVVFU1RfQ09ORklSTUFUSU9OID0gJ3VpLXJlcXVlc3RfY29uZmlybWF0aW9uJztcbmV4cG9ydHMuUkVRVUVTVF9DT05GSVJNQVRJT04gPSBSRVFVRVNUX0NPTkZJUk1BVElPTjtcbnZhciBSRVFVRVNUX1BJTiA9ICd1aS1yZXF1ZXN0X3Bpbic7XG5leHBvcnRzLlJFUVVFU1RfUElOID0gUkVRVUVTVF9QSU47XG52YXIgSU5WQUxJRF9QSU4gPSAndWktaW52YWxpZF9waW4nO1xuZXhwb3J0cy5JTlZBTElEX1BJTiA9IElOVkFMSURfUElOO1xudmFyIFJFUVVFU1RfUEFTU1BIUkFTRSA9ICd1aS1yZXF1ZXN0X3Bhc3NwaHJhc2UnO1xuZXhwb3J0cy5SRVFVRVNUX1BBU1NQSFJBU0UgPSBSRVFVRVNUX1BBU1NQSFJBU0U7XG52YXIgUkVRVUVTVF9QQVNTUEhSQVNFX09OX0RFVklDRSA9ICd1aS1yZXF1ZXN0X3Bhc3NwaHJhc2Vfb25fZGV2aWNlJztcbmV4cG9ydHMuUkVRVUVTVF9QQVNTUEhSQVNFX09OX0RFVklDRSA9IFJFUVVFU1RfUEFTU1BIUkFTRV9PTl9ERVZJQ0U7XG52YXIgSU5WQUxJRF9QQVNTUEhSQVNFID0gJ3VpLWludmFsaWRfcGFzc3BocmFzZSc7XG5leHBvcnRzLklOVkFMSURfUEFTU1BIUkFTRSA9IElOVkFMSURfUEFTU1BIUkFTRTtcbnZhciBJTlZBTElEX1BBU1NQSFJBU0VfQUNUSU9OID0gJ3VpLWludmFsaWRfcGFzc3BocmFzZV9hY3Rpb24nO1xuZXhwb3J0cy5JTlZBTElEX1BBU1NQSFJBU0VfQUNUSU9OID0gSU5WQUxJRF9QQVNTUEhSQVNFX0FDVElPTjtcbnZhciBDT05ORUNUID0gJ3VpLWNvbm5lY3QnO1xuZXhwb3J0cy5DT05ORUNUID0gQ09OTkVDVDtcbnZhciBMT0FESU5HID0gJ3VpLWxvYWRpbmcnO1xuZXhwb3J0cy5MT0FESU5HID0gTE9BRElORztcbnZhciBTRVRfT1BFUkFUSU9OID0gJ3VpLXNldF9vcGVyYXRpb24nO1xuZXhwb3J0cy5TRVRfT1BFUkFUSU9OID0gU0VUX09QRVJBVElPTjtcbnZhciBTRUxFQ1RfREVWSUNFID0gJ3VpLXNlbGVjdF9kZXZpY2UnO1xuZXhwb3J0cy5TRUxFQ1RfREVWSUNFID0gU0VMRUNUX0RFVklDRTtcbnZhciBTRUxFQ1RfQUNDT1VOVCA9ICd1aS1zZWxlY3RfYWNjb3VudCc7XG5leHBvcnRzLlNFTEVDVF9BQ0NPVU5UID0gU0VMRUNUX0FDQ09VTlQ7XG52YXIgU0VMRUNUX0ZFRSA9ICd1aS1zZWxlY3RfZmVlJztcbmV4cG9ydHMuU0VMRUNUX0ZFRSA9IFNFTEVDVF9GRUU7XG52YXIgVVBEQVRFX0NVU1RPTV9GRUUgPSAndWktdXBkYXRlX2N1c3RvbV9mZWUnO1xuZXhwb3J0cy5VUERBVEVfQ1VTVE9NX0ZFRSA9IFVQREFURV9DVVNUT01fRkVFO1xudmFyIElOU1VGRklDSUVOVF9GVU5EUyA9ICd1aS1pbnN1ZmZpY2llbnRfZnVuZHMnO1xuZXhwb3J0cy5JTlNVRkZJQ0lFTlRfRlVORFMgPSBJTlNVRkZJQ0lFTlRfRlVORFM7XG52YXIgUkVRVUVTVF9CVVRUT04gPSAndWktYnV0dG9uJztcbmV4cG9ydHMuUkVRVUVTVF9CVVRUT04gPSBSRVFVRVNUX0JVVFRPTjtcbnZhciBSRVFVRVNUX1dPUkQgPSAndWktcmVxdWVzdF93b3JkJztcbmV4cG9ydHMuUkVRVUVTVF9XT1JEID0gUkVRVUVTVF9XT1JEO1xudmFyIFJFQ0VJVkVfUEVSTUlTU0lPTiA9ICd1aS1yZWNlaXZlX3Blcm1pc3Npb24nO1xuZXhwb3J0cy5SRUNFSVZFX1BFUk1JU1NJT04gPSBSRUNFSVZFX1BFUk1JU1NJT047XG52YXIgUkVDRUlWRV9DT05GSVJNQVRJT04gPSAndWktcmVjZWl2ZV9jb25maXJtYXRpb24nO1xuZXhwb3J0cy5SRUNFSVZFX0NPTkZJUk1BVElPTiA9IFJFQ0VJVkVfQ09ORklSTUFUSU9OO1xudmFyIFJFQ0VJVkVfUElOID0gJ3VpLXJlY2VpdmVfcGluJztcbmV4cG9ydHMuUkVDRUlWRV9QSU4gPSBSRUNFSVZFX1BJTjtcbnZhciBSRUNFSVZFX1BBU1NQSFJBU0UgPSAndWktcmVjZWl2ZV9wYXNzcGhyYXNlJztcbmV4cG9ydHMuUkVDRUlWRV9QQVNTUEhSQVNFID0gUkVDRUlWRV9QQVNTUEhSQVNFO1xudmFyIFJFQ0VJVkVfREVWSUNFID0gJ3VpLXJlY2VpdmVfZGV2aWNlJztcbmV4cG9ydHMuUkVDRUlWRV9ERVZJQ0UgPSBSRUNFSVZFX0RFVklDRTtcbnZhciBDSEFOR0VfQUNDT1VOVCA9ICd1aS1jaGFuZ2VfYWNjb3VudCc7XG5leHBvcnRzLkNIQU5HRV9BQ0NPVU5UID0gQ0hBTkdFX0FDQ09VTlQ7XG52YXIgUkVDRUlWRV9BQ0NPVU5UID0gJ3VpLXJlY2VpdmVfYWNjb3VudCc7XG5leHBvcnRzLlJFQ0VJVkVfQUNDT1VOVCA9IFJFQ0VJVkVfQUNDT1VOVDtcbnZhciBSRUNFSVZFX0ZFRSA9ICd1aS1yZWNlaXZlX2ZlZSc7XG5leHBvcnRzLlJFQ0VJVkVfRkVFID0gUkVDRUlWRV9GRUU7XG52YXIgUkVDRUlWRV9XT1JEID0gJ3VpLXJlY2VpdmVfd29yZCc7XG5leHBvcnRzLlJFQ0VJVkVfV09SRCA9IFJFQ0VJVkVfV09SRDtcbnZhciBDSEFOR0VfU0VUVElOR1MgPSAndWktY2hhbmdlX3NldHRpbmdzJztcbmV4cG9ydHMuQ0hBTkdFX1NFVFRJTkdTID0gQ0hBTkdFX1NFVFRJTkdTO1xudmFyIENVU1RPTV9NRVNTQUdFX1JFUVVFU1QgPSAndWktY3VzdG9tX3JlcXVlc3QnO1xuZXhwb3J0cy5DVVNUT01fTUVTU0FHRV9SRVFVRVNUID0gQ1VTVE9NX01FU1NBR0VfUkVRVUVTVDtcbnZhciBDVVNUT01fTUVTU0FHRV9SRVNQT05TRSA9ICd1aS1jdXN0b21fcmVzcG9uc2UnO1xuZXhwb3J0cy5DVVNUT01fTUVTU0FHRV9SRVNQT05TRSA9IENVU1RPTV9NRVNTQUdFX1JFU1BPTlNFO1xudmFyIExPR0lOX0NIQUxMRU5HRV9SRVFVRVNUID0gJ3VpLWxvZ2luX2NoYWxsZW5nZV9yZXF1ZXN0JztcbmV4cG9ydHMuTE9HSU5fQ0hBTExFTkdFX1JFUVVFU1QgPSBMT0dJTl9DSEFMTEVOR0VfUkVRVUVTVDtcbnZhciBMT0dJTl9DSEFMTEVOR0VfUkVTUE9OU0UgPSAndWktbG9naW5fY2hhbGxlbmdlX3Jlc3BvbnNlJztcbmV4cG9ydHMuTE9HSU5fQ0hBTExFTkdFX1JFU1BPTlNFID0gTE9HSU5fQ0hBTExFTkdFX1JFU1BPTlNFO1xudmFyIEJVTkRMRV9QUk9HUkVTUyA9ICd1aS1idW5kbGVfcHJvZ3Jlc3MnO1xuZXhwb3J0cy5CVU5ETEVfUFJPR1JFU1MgPSBCVU5ETEVfUFJPR1JFU1M7XG52YXIgQUREUkVTU19WQUxJREFUSU9OID0gJ3VpLWFkZHJlc3NfdmFsaWRhdGlvbic7XG5leHBvcnRzLkFERFJFU1NfVkFMSURBVElPTiA9IEFERFJFU1NfVkFMSURBVElPTjtcbnZhciBJRlJBTUVfRkFJTFVSRSA9ICd1aS1pZnJhbWVfZmFpbHVyZSc7XG5leHBvcnRzLklGUkFNRV9GQUlMVVJFID0gSUZSQU1FX0ZBSUxVUkU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5wYXJzZSA9IGV4cG9ydHMuY29yc1ZhbGlkYXRvciA9IGV4cG9ydHMuZ2V0RW52ID0gZXhwb3J0cy5ERUZBVUxUX1BSSU9SSVRZID0gdm9pZCAwO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIikpO1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSB7IHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KTsgfSBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IH0gcmV0dXJuIHRhcmdldDsgfVxuXG4vKlxuICogSW5pdGlhbCBzZXR0aW5ncyBmb3IgY29ubmVjdC5cbiAqIEl0IGNvdWxkIGJlIGNoYW5nZWQgYnkgcGFzc2luZyB2YWx1ZXMgaW50byBUcmV6b3JDb25uZWN0LmluaXQoLi4uKSBtZXRob2RcbiAqL1xudmFyIFZFUlNJT04gPSAnOC4yLjYnO1xudmFyIHZlcnNpb25OID0gVkVSU0lPTi5zcGxpdCgnLicpLm1hcChmdW5jdGlvbiAocykge1xuICByZXR1cm4gcGFyc2VJbnQocywgMTApO1xufSk7IC8vIGNvbnN0IERJUkVDVE9SWSA9IGAkeyB2ZXJzaW9uTlswXSB9JHsgKHZlcnNpb25OWzFdID4gMCA/IGAuJHt2ZXJzaW9uTlsxXX1gIDogJycpIH0vYDtcblxudmFyIERJUkVDVE9SWSA9IHZlcnNpb25OWzBdICsgXCIvXCI7XG52YXIgREVGQVVMVF9ET01BSU4gPSBcImh0dHBzOi8vY29ubmVjdC50cmV6b3IuaW8vXCIgKyBESVJFQ1RPUlk7XG52YXIgREVGQVVMVF9QUklPUklUWSA9IDI7XG5leHBvcnRzLkRFRkFVTFRfUFJJT1JJVFkgPSBERUZBVUxUX1BSSU9SSVRZO1xudmFyIGluaXRpYWxTZXR0aW5ncyA9IHtcbiAgY29uZmlnU3JjOiAnLi9kYXRhL2NvbmZpZy5qc29uJyxcbiAgLy8gY29uc3RhbnRcbiAgdmVyc2lvbjogVkVSU0lPTixcbiAgLy8gY29uc3RhbnRcbiAgZGVidWc6IGZhbHNlLFxuICBwcmlvcml0eTogREVGQVVMVF9QUklPUklUWSxcbiAgdHJ1c3RlZEhvc3Q6IGZhbHNlLFxuICBjb25uZWN0U3JjOiBERUZBVUxUX0RPTUFJTixcbiAgaWZyYW1lU3JjOiBERUZBVUxUX0RPTUFJTiArIFwiaWZyYW1lLmh0bWxcIixcbiAgcG9wdXA6IHRydWUsXG4gIHBvcHVwU3JjOiBERUZBVUxUX0RPTUFJTiArIFwicG9wdXAuaHRtbFwiLFxuICB3ZWJ1c2JTcmM6IERFRkFVTFRfRE9NQUlOICsgXCJ3ZWJ1c2IuaHRtbFwiLFxuICB0cmFuc3BvcnRSZWNvbm5lY3Q6IGZhbHNlLFxuICB3ZWJ1c2I6IHRydWUsXG4gIHBlbmRpbmdUcmFuc3BvcnRFdmVudDogdHJ1ZSxcbiAgc3VwcG9ydGVkQnJvd3NlcjogdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgPyAhL1RyaWRlbnR8TVNJRXxFZGdlLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIDogdHJ1ZSxcbiAgbWFuaWZlc3Q6IG51bGwsXG4gIGVudjogJ3dlYicsXG4gIGxhenlMb2FkOiBmYWxzZSxcbiAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgaW50ZXJhY3Rpb25UaW1lb3V0OiA2MDAgLy8gNSBtaW51dGVzXG5cbn07XG52YXIgY3VycmVudFNldHRpbmdzID0gaW5pdGlhbFNldHRpbmdzO1xuXG52YXIgcGFyc2VNYW5pZmVzdCA9IGZ1bmN0aW9uIHBhcnNlTWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgaWYgKCFtYW5pZmVzdCkgcmV0dXJuO1xuICBpZiAodHlwZW9mIG1hbmlmZXN0LmVtYWlsICE9PSAnc3RyaW5nJykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG1hbmlmZXN0LmFwcFVybCAhPT0gJ3N0cmluZycpIHJldHVybjtcbiAgcmV0dXJuIHtcbiAgICBlbWFpbDogbWFuaWZlc3QuZW1haWwsXG4gICAgYXBwVXJsOiBtYW5pZmVzdC5hcHBVcmxcbiAgfTtcbn07XG5cbnZhciBnZXRFbnYgPSBmdW5jdGlvbiBnZXRFbnYoKSB7XG4gIC8vICRGbG93SXNzdWU6IGNocm9tZSBpcyBub3QgZGVjbGFyZWQgb3V0c2lkZSB0aGUgcHJvamVjdFxuICBpZiAodHlwZW9mIGNocm9tZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY2hyb21lLnJ1bnRpbWUgJiYgdHlwZW9mIGNocm9tZS5ydW50aW1lLm9uQ29ubmVjdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gJ3dlYmV4dGVuc2lvbic7XG4gIH1cblxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnc3RyaW5nJyAmJiBuYXZpZ2F0b3IucHJvZHVjdC50b0xvd2VyQ2FzZSgpID09PSAncmVhY3RuYXRpdmUnKSB7XG4gICAgICByZXR1cm4gJ3JlYWN0LW5hdGl2ZSc7XG4gICAgfVxuXG4gICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZignIGVsZWN0cm9uLycpID4gLTEpIHtcbiAgICAgIHJldHVybiAnZWxlY3Ryb24nO1xuICAgIH1cbiAgfSAvLyBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnc3RyaW5nJyAmJiBuYXZpZ2F0b3IucHJvZHVjdC50b0xvd2VyQ2FzZSgpID09PSAncmVhY3RuYXRpdmUnKSB7XG4gIC8vICAgICByZXR1cm4gJ3JlYWN0LW5hdGl2ZSc7XG4gIC8vIH1cbiAgLy8gaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnZlcnNpb25zLmhhc093blByb3BlcnR5KCdlbGVjdHJvbicpKSB7XG4gIC8vICAgICByZXR1cm4gJ2VsZWN0cm9uJztcbiAgLy8gfVxuXG5cbiAgcmV0dXJuICd3ZWInO1xufTsgLy8gQ29ycyB2YWxpZGF0aW9uIGNvcGllZCBmcm9tIFRyZXpvciBCcmlkZ2Vcbi8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL3RyZXpvci90cmV6b3JkLWdvL2Jsb2IvMDU5OTFjZWE1OTAwZDE4YmNjNmVjZTVhZTVlMzE5ZDEzOGZjNTU1MS9zZXJ2ZXIvYXBpL2FwaS5nbyNMMjI5XG4vLyBJdHMgcG9pbnRsZXNzIHRvIGFsbG93IGB0cmV6b3ItY29ubmVjdGAgZW5kcG9pbnRzIHsgY29ubmVjdFNyYyB9IGZvciBkb21haW5zIG90aGVyIHRoYW4gbGlzdGVkIGJlbG93XG4vLyBgdHJlem9yZGAgd2lsbCBibG9jayBjb21tdW5pY2F0aW9uIGFueXdheVxuXG5cbmV4cG9ydHMuZ2V0RW52ID0gZ2V0RW52O1xuXG52YXIgY29yc1ZhbGlkYXRvciA9IGZ1bmN0aW9uIGNvcnNWYWxpZGF0b3IodXJsKSB7XG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykgcmV0dXJuO1xuICBpZiAodXJsLm1hdGNoKC9eaHR0cHM6XFwvXFwvKFtBLVphLXowLTlcXC1fXStcXC4pKnRyZXpvclxcLmlvXFwvLykpIHJldHVybiB1cmw7XG4gIGlmICh1cmwubWF0Y2goL15odHRwcz86XFwvXFwvbG9jYWxob3N0Ols1OF1bMC05XXszfVxcLy8pKSByZXR1cm4gdXJsO1xuICBpZiAodXJsLm1hdGNoKC9eaHR0cHM6XFwvXFwvKFtBLVphLXowLTlcXC1fXStcXC4pKnNsZGV2XFwuY3pcXC8vKSkgcmV0dXJuIHVybDtcbiAgaWYgKHVybC5tYXRjaCgvXmh0dHBzPzpcXC9cXC8oW0EtWmEtejAtOVxcLV9dK1xcLikqdHJlem9yaW92cGpjYWhwemtyZXdlbGNsdWxtc3p3YnFwem16Z3ViMzdnYmNqbHZsdXh0cnVxYWRcXC5vbmlvblxcLy8pKSByZXR1cm4gdXJsO1xufTtcblxuZXhwb3J0cy5jb3JzVmFsaWRhdG9yID0gY29yc1ZhbGlkYXRvcjtcblxudmFyIHBhcnNlID0gZnVuY3Rpb24gcGFyc2UoaW5wdXQpIHtcbiAgaWYgKGlucHV0ID09PSB2b2lkIDApIHtcbiAgICBpbnB1dCA9IHt9O1xuICB9XG5cbiAgdmFyIHNldHRpbmdzID0gX29iamVjdFNwcmVhZCh7fSwgY3VycmVudFNldHRpbmdzKTtcblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlucHV0LCAnZGVidWcnKSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkgey8vIGVuYWJsZSBsb2cgd2l0aCBwcmVmaXhcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGlucHV0LmRlYnVnID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHNldHRpbmdzLmRlYnVnID0gaW5wdXQuZGVidWc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQuZGVidWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzZXR0aW5ncy5kZWJ1ZyA9IGlucHV0LmRlYnVnID09PSAndHJ1ZSc7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBpbnB1dC5jb25uZWN0U3JjID09PSAnc3RyaW5nJykge1xuICAgIHNldHRpbmdzLmNvbm5lY3RTcmMgPSBpbnB1dC5jb25uZWN0U3JjO1xuICB9IC8vIEZvciBkZWJ1Z2dpbmcgcHVycG9zZXMgYGNvbm5lY3RTcmNgIGNvdWxkIGJlIGRlZmluZWQgaW4gYGdsb2JhbC5fX1RSRVpPUl9DT05ORUNUX1NSQ2AgdmFyaWFibGVcblxuXG4gIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZ2xvYmFsLl9fVFJFWk9SX0NPTk5FQ1RfU1JDID09PSAnc3RyaW5nJykge1xuICAgIHNldHRpbmdzLmNvbm5lY3RTcmMgPSBjb3JzVmFsaWRhdG9yKGdsb2JhbC5fX1RSRVpPUl9DT05ORUNUX1NSQyk7XG4gICAgc2V0dGluZ3MuZGVidWcgPSB0cnVlO1xuICB9IC8vIEZvciBkZWJ1Z2dpbmcgcHVycG9zZXMgYGNvbm5lY3RTcmNgIGNvdWxkIGJlIGRlZmluZWQgaW4gdXJsIHF1ZXJ5IG9mIGhvc3RpbmcgcGFnZS4gVXNhZ2U6XG4gIC8vIGh0dHBzOi8vM3JkcGFydHktcGFnZS5jb20vP3RyZXpvci1jb25uZWN0LXNyYz1odHRwczovL2xvY2FsaG9zdDo4MDg4L1xuXG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5sb2NhdGlvbiAmJiB0eXBlb2Ygd2luZG93LmxvY2F0aW9uLnNlYXJjaCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgdmFycyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoJyYnKTtcbiAgICB2YXIgY3VzdG9tVXJsID0gdmFycy5maW5kKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gdi5pbmRleE9mKCd0cmV6b3ItY29ubmVjdC1zcmMnKSA+PSAwO1xuICAgIH0pO1xuXG4gICAgaWYgKGN1c3RvbVVybCkge1xuICAgICAgdmFyIF9jdXN0b21Vcmwkc3BsaXQgPSBjdXN0b21Vcmwuc3BsaXQoJz0nKSxcbiAgICAgICAgICBjb25uZWN0U3JjID0gX2N1c3RvbVVybCRzcGxpdFsxXTtcblxuICAgICAgc2V0dGluZ3MuY29ubmVjdFNyYyA9IGNvcnNWYWxpZGF0b3IoZGVjb2RlVVJJQ29tcG9uZW50KGNvbm5lY3RTcmMpKTtcbiAgICAgIHNldHRpbmdzLmRlYnVnID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICB2YXIgc3JjID0gc2V0dGluZ3MuY29ubmVjdFNyYyB8fCBERUZBVUxUX0RPTUFJTjtcbiAgc2V0dGluZ3MuaWZyYW1lU3JjID0gc3JjICsgXCJpZnJhbWUuaHRtbFwiO1xuICBzZXR0aW5ncy5wb3B1cFNyYyA9IHNyYyArIFwicG9wdXAuaHRtbFwiO1xuICBzZXR0aW5ncy53ZWJ1c2JTcmMgPSBzcmMgKyBcIndlYnVzYi5odG1sXCI7XG5cbiAgaWYgKHR5cGVvZiBpbnB1dC50cmFuc3BvcnRSZWNvbm5lY3QgPT09ICdib29sZWFuJykge1xuICAgIHNldHRpbmdzLnRyYW5zcG9ydFJlY29ubmVjdCA9IGlucHV0LnRyYW5zcG9ydFJlY29ubmVjdDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaW5wdXQud2VidXNiID09PSAnYm9vbGVhbicpIHtcbiAgICBzZXR0aW5ncy53ZWJ1c2IgPSBpbnB1dC53ZWJ1c2I7XG4gIH1cblxuICBpZiAodHlwZW9mIGlucHV0LnBvcHVwID09PSAnYm9vbGVhbicpIHtcbiAgICBzZXR0aW5ncy5wb3B1cCA9IGlucHV0LnBvcHVwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpbnB1dC5sYXp5TG9hZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgc2V0dGluZ3MubGF6eUxvYWQgPSBpbnB1dC5sYXp5TG9hZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaW5wdXQucGVuZGluZ1RyYW5zcG9ydEV2ZW50ID09PSAnYm9vbGVhbicpIHtcbiAgICBzZXR0aW5ncy5wZW5kaW5nVHJhbnNwb3J0RXZlbnQgPSBpbnB1dC5wZW5kaW5nVHJhbnNwb3J0RXZlbnQ7XG4gIH0gLy8gbG9jYWwgZmlsZXNcblxuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubG9jYXRpb24gJiYgd2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSAnZmlsZTonKSB7XG4gICAgc2V0dGluZ3Mub3JpZ2luID0gXCJmaWxlOi8vXCIgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgc2V0dGluZ3Mud2VidXNiID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGlucHV0LmV4dGVuc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICBzZXR0aW5ncy5leHRlbnNpb24gPSBpbnB1dC5leHRlbnNpb247XG4gIH1cblxuICBpZiAodHlwZW9mIGlucHV0LmVudiA9PT0gJ3N0cmluZycpIHtcbiAgICBzZXR0aW5ncy5lbnYgPSBpbnB1dC5lbnY7XG4gIH0gZWxzZSB7XG4gICAgc2V0dGluZ3MuZW52ID0gZ2V0RW52KCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGlucHV0LnRpbWVzdGFtcCA9PT0gJ251bWJlcicpIHtcbiAgICBzZXR0aW5ncy50aW1lc3RhbXAgPSBpbnB1dC50aW1lc3RhbXA7XG4gIH1cblxuICBpZiAodHlwZW9mIGlucHV0LmludGVyYWN0aW9uVGltZW91dCA9PT0gJ251bWJlcicpIHtcbiAgICBzZXR0aW5ncy5pbnRlcmFjdGlvblRpbWVvdXQgPSBpbnB1dC5pbnRlcmFjdGlvblRpbWVvdXQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGlucHV0Lm1hbmlmZXN0ID09PSAnb2JqZWN0Jykge1xuICAgIHNldHRpbmdzLm1hbmlmZXN0ID0gcGFyc2VNYW5pZmVzdChpbnB1dC5tYW5pZmVzdCk7XG4gIH1cblxuICBjdXJyZW50U2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgcmV0dXJuIGN1cnJlbnRTZXR0aW5ncztcbn07XG5cbmV4cG9ydHMucGFyc2UgPSBwYXJzZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRpc2FibGVXZWJVU0IgPSBleHBvcnRzLnJlcXVlc3RMb2dpbiA9IGV4cG9ydHMuY3VzdG9tTWVzc2FnZSA9IGV4cG9ydHMuZ2V0U2V0dGluZ3MgPSBleHBvcnRzLnJlbmRlcldlYlVTQkJ1dHRvbiA9IGV4cG9ydHMudWlSZXNwb25zZSA9IGV4cG9ydHMuY2FsbCA9IGV4cG9ydHMuaW5pdCA9IGV4cG9ydHMuY2FuY2VsID0gZXhwb3J0cy5kaXNwb3NlID0gZXhwb3J0cy5tYW5pZmVzdCA9IGV4cG9ydHMuZXZlbnRFbWl0dGVyID0gdm9pZCAwO1xuXG52YXIgX3JlZ2VuZXJhdG9yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3JcIikpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIikpO1xuXG52YXIgX2FzeW5jVG9HZW5lcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpKTtcblxudmFyIF9ldmVudHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJldmVudHNcIikpO1xuXG52YXIgX1BvcHVwTWFuYWdlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3BvcHVwL1BvcHVwTWFuYWdlclwiKSk7XG5cbnZhciBpZnJhbWUgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vLi4vaWZyYW1lL2J1aWxkZXJcIikpO1xuXG52YXIgX2J1dHRvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3dlYnVzYi9idXR0b25cIikpO1xuXG52YXIgX21lc3NhZ2UgPSByZXF1aXJlKFwiLi4vLi4vbWVzc2FnZVwiKTtcblxudmFyIF9idWlsZGVyMiA9IHJlcXVpcmUoXCIuLi8uLi9tZXNzYWdlL2J1aWxkZXJcIik7XG5cbnZhciBfQ29ubmVjdFNldHRpbmdzID0gcmVxdWlyZShcIi4uLy4uL2RhdGEvQ29ubmVjdFNldHRpbmdzXCIpO1xuXG52YXIgX2RlYnVnID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2RlYnVnXCIpO1xuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoXCIuLi8uLi9jb25zdGFudHNcIik7XG5cbnZhciAkVCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuLi8uLi90eXBlc1wiKSk7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7IHZhciBjYWNoZUJhYmVsSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHZhciBjYWNoZU5vZGVJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgcmV0dXJuIChfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgcmV0dXJuIG5vZGVJbnRlcm9wID8gY2FjaGVOb2RlSW50ZXJvcCA6IGNhY2hlQmFiZWxJbnRlcm9wOyB9KShub2RlSW50ZXJvcCk7IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqLCBub2RlSW50ZXJvcCkgeyBpZiAoIW5vZGVJbnRlcm9wICYmIG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIpIHsgcmV0dXJuIHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9IHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCk7IGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkgeyByZXR1cm4gY2FjaGUuZ2V0KG9iaik7IH0gdmFyIG5ld09iaiA9IHt9OyB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKGtleSAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgeyB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDsgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpOyB9IGVsc2UgeyBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gfSBuZXdPYmpbXCJkZWZhdWx0XCJdID0gb2JqOyBpZiAoY2FjaGUpIHsgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTsgfSByZXR1cm4gbmV3T2JqOyB9XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHsgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyB9IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbnZhciBldmVudEVtaXR0ZXIgPSBuZXcgX2V2ZW50c1tcImRlZmF1bHRcIl0oKTtcbmV4cG9ydHMuZXZlbnRFbWl0dGVyID0gZXZlbnRFbWl0dGVyO1xuXG52YXIgX2xvZyA9ICgwLCBfZGVidWcuaW5pdExvZykoJ1t0cmV6b3ItY29ubmVjdC5qc10nKTtcblxudmFyIF9zZXR0aW5ncztcblxudmFyIF9wb3B1cE1hbmFnZXI7XG5cbnZhciBpbml0UG9wdXBNYW5hZ2VyID0gZnVuY3Rpb24gaW5pdFBvcHVwTWFuYWdlcigpIHtcbiAgdmFyIHBtID0gbmV3IF9Qb3B1cE1hbmFnZXJbXCJkZWZhdWx0XCJdKF9zZXR0aW5ncyk7XG4gIHBtLm9uKF9jb25zdGFudHMuUE9QVVAuQ0xPU0VELCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBpZnJhbWUucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogX2NvbnN0YW50cy5QT1BVUC5DTE9TRUQsXG4gICAgICBwYXlsb2FkOiBlcnJvciA/IHtcbiAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICB9IDogbnVsbFxuICAgIH0sIGZhbHNlKTtcbiAgfSk7XG4gIHJldHVybiBwbTtcbn07XG5cbnZhciBtYW5pZmVzdCA9IGZ1bmN0aW9uIG1hbmlmZXN0KGRhdGEpIHtcbiAgX3NldHRpbmdzID0gKDAsIF9Db25uZWN0U2V0dGluZ3MucGFyc2UpKHtcbiAgICBtYW5pZmVzdDogZGF0YVxuICB9KTtcbn07XG5cbmV4cG9ydHMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblxudmFyIGRpc3Bvc2UgPSBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICBldmVudEVtaXR0ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIGlmcmFtZS5kaXNwb3NlKCk7XG5cbiAgaWYgKF9wb3B1cE1hbmFnZXIpIHtcbiAgICBfcG9wdXBNYW5hZ2VyLmNsb3NlKCk7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGlzcG9zZSA9IGRpc3Bvc2U7XG5cbnZhciBjYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoZXJyb3IpIHtcbiAgaWYgKF9wb3B1cE1hbmFnZXIpIHtcbiAgICBfcG9wdXBNYW5hZ2VyLmVtaXQoX2NvbnN0YW50cy5QT1BVUC5DTE9TRUQsIGVycm9yKTtcbiAgfVxufTsgLy8gaGFuZGxlIG1lc3NhZ2UgcmVjZWl2ZWQgZnJvbSBpZnJhbWVcblxuXG5leHBvcnRzLmNhbmNlbCA9IGNhbmNlbDtcblxudmFyIGhhbmRsZU1lc3NhZ2UgPSBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKG1lc3NhZ2VFdmVudCkge1xuICAvLyBpZ25vcmUgbWVzc2FnZXMgZnJvbSBkb21haW4gb3RoZXIgdGhlbiBpZnJhbWUgb3JpZ2luXG4gIGlmIChtZXNzYWdlRXZlbnQub3JpZ2luICE9PSBpZnJhbWUub3JpZ2luKSByZXR1cm47XG4gIHZhciBtZXNzYWdlID0gKDAsIF9tZXNzYWdlLnBhcnNlTWVzc2FnZSkobWVzc2FnZUV2ZW50LmRhdGEpO1xuICB2YXIgZXZlbnQgPSBtZXNzYWdlLmV2ZW50LFxuICAgICAgdHlwZSA9IG1lc3NhZ2UudHlwZSxcbiAgICAgIHBheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQ7XG4gIHZhciBpZCA9IG1lc3NhZ2UuaWQgfHwgMDtcblxuICBfbG9nLmxvZygnaGFuZGxlTWVzc2FnZScsIG1lc3NhZ2UpO1xuXG4gIHN3aXRjaCAoZXZlbnQpIHtcbiAgICBjYXNlIF9jb25zdGFudHMuUkVTUE9OU0VfRVZFTlQ6XG4gICAgICBpZiAoaWZyYW1lLm1lc3NhZ2VQcm9taXNlc1tpZF0pIHtcbiAgICAgICAgLy8gcmVzb2x2ZSBtZXNzYWdlIHByb21pc2UgKHNlbmQgcmVzdWx0IG9mIGNhbGwgbWV0aG9kKVxuICAgICAgICBpZnJhbWUubWVzc2FnZVByb21pc2VzW2lkXS5yZXNvbHZlKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgc3VjY2VzczogbWVzc2FnZS5zdWNjZXNzLFxuICAgICAgICAgIHBheWxvYWQ6IHBheWxvYWRcbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSBpZnJhbWUubWVzc2FnZVByb21pc2VzW2lkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9sb2cud2FybihcIlVua25vd24gbWVzc2FnZSBpZCBcIiArIGlkKTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIF9jb25zdGFudHMuREVWSUNFX0VWRU5UOlxuICAgICAgLy8gcGFzcyBERVZJQ0UgZXZlbnQgdXAgdG8gaHRtbFxuICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoZXZlbnQsIG1lc3NhZ2UpO1xuICAgICAgZXZlbnRFbWl0dGVyLmVtaXQodHlwZSwgcGF5bG9hZCk7IC8vIERFVklDRV9FVkVOVCBhbHNvIGVtaXQgc2luZ2xlIGV2ZW50cyAoY29ubmVjdC9kaXNjb25uZWN0Li4uKVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgX2NvbnN0YW50cy5UUkFOU1BPUlRfRVZFTlQ6XG4gICAgICBldmVudEVtaXR0ZXIuZW1pdChldmVudCwgbWVzc2FnZSk7XG4gICAgICBldmVudEVtaXR0ZXIuZW1pdCh0eXBlLCBwYXlsb2FkKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBfY29uc3RhbnRzLkJMT0NLQ0hBSU5fRVZFTlQ6XG4gICAgICBldmVudEVtaXR0ZXIuZW1pdChldmVudCwgbWVzc2FnZSk7XG4gICAgICBldmVudEVtaXR0ZXIuZW1pdCh0eXBlLCBwYXlsb2FkKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBfY29uc3RhbnRzLlVJX0VWRU5UOlxuICAgICAgaWYgKHR5cGUgPT09IF9jb25zdGFudHMuSUZSQU1FLkJPT1RTVFJBUCkge1xuICAgICAgICBpZnJhbWUuY2xlYXJUaW1lb3V0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PT0gX2NvbnN0YW50cy5JRlJBTUUuTE9BREVEKSB7XG4gICAgICAgIGlmcmFtZS5pbml0UHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSBfY29uc3RhbnRzLklGUkFNRS5FUlJPUikge1xuICAgICAgICBpZnJhbWUuaW5pdFByb21pc2UucmVqZWN0KHBheWxvYWQuZXJyb3IpO1xuICAgICAgfSAvLyBwYXNzIFVJIGV2ZW50IHVwXG5cblxuICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoZXZlbnQsIG1lc3NhZ2UpO1xuICAgICAgZXZlbnRFbWl0dGVyLmVtaXQodHlwZSwgcGF5bG9hZCk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBfbG9nLmxvZygnVW5kZWZpbmVkIG1lc3NhZ2UnLCBldmVudCwgbWVzc2FnZUV2ZW50KTtcblxuICB9XG59O1xuXG52YXIgaW5pdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBfcmVmID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKCAvKiNfX1BVUkVfXyovX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoc2V0dGluZ3MpIHtcbiAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICB3aGlsZSAoMSkge1xuICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgaWYgKHNldHRpbmdzID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpZnJhbWUuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDM7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBfY29uc3RhbnRzLkVSUk9SUy5UeXBlZEVycm9yKCdJbml0X0FscmVhZHlJbml0aWFsaXplZCcpO1xuXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgaWYgKCFfc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgX3NldHRpbmdzID0gKDAsIF9Db25uZWN0U2V0dGluZ3MucGFyc2UpKHNldHRpbmdzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9zZXR0aW5ncy5tYW5pZmVzdCkge1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IF9jb25zdGFudHMuRVJST1JTLlR5cGVkRXJyb3IoJ0luaXRfTWFuaWZlc3RNaXNzaW5nJyk7XG5cbiAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICBpZiAoIV9zZXR0aW5ncy5sYXp5TG9hZCkge1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IFwibGF6eUxvYWRcIiBhZnRlciBmaXJzdCB1c2VcbiAgICAgICAgICAgIF9zZXR0aW5ncy5sYXp5TG9hZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIGlmICghX3BvcHVwTWFuYWdlcikge1xuICAgICAgICAgICAgICBfcG9wdXBNYW5hZ2VyID0gaW5pdFBvcHVwTWFuYWdlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfbG9nLmVuYWJsZWQgPSAhIV9zZXR0aW5ncy5kZWJ1ZztcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlTWVzc2FnZSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgZGlzcG9zZSk7XG4gICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTU7XG4gICAgICAgICAgICByZXR1cm4gaWZyYW1lLmluaXQoX3NldHRpbmdzKTtcblxuICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIF9jYWxsZWUpO1xuICB9KSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXQoX3gpIHtcbiAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufSgpO1xuXG5leHBvcnRzLmluaXQgPSBpbml0O1xuXG52YXIgY2FsbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBfcmVmMiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKSggLyojX19QVVJFX18qL19yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMihwYXJhbXMpIHtcbiAgICB2YXIgcmVzcG9uc2U7XG4gICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7XG4gICAgICB3aGlsZSAoMSkge1xuICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBpZiAoISghaWZyYW1lLmluc3RhbmNlICYmICFpZnJhbWUudGltZW91dCkpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSAxNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGluaXQgcG9wdXAgd2l0aCBsYXp5IGxvYWRpbmcgYmVmb3JlIGlmcmFtZSBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgX3NldHRpbmdzID0gKDAsIF9Db25uZWN0U2V0dGluZ3MucGFyc2UpKF9zZXR0aW5ncyk7XG5cbiAgICAgICAgICAgIGlmIChfc2V0dGluZ3MubWFuaWZlc3QpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQyLm5leHQgPSA0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgKDAsIF9tZXNzYWdlLmVycm9yTWVzc2FnZSkoX2NvbnN0YW50cy5FUlJPUlMuVHlwZWRFcnJvcignSW5pdF9NYW5pZmVzdE1pc3NpbmcnKSkpO1xuXG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgaWYgKCFfcG9wdXBNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgIF9wb3B1cE1hbmFnZXIgPSBpbml0UG9wdXBNYW5hZ2VyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9wb3B1cE1hbmFnZXIucmVxdWVzdCh0cnVlKTsgLy8gYXV0byBpbml0IHdpdGggZGVmYXVsdCBzZXR0aW5nc1xuXG5cbiAgICAgICAgICAgIF9jb250ZXh0Mi5wcmV2ID0gNjtcbiAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gOTtcbiAgICAgICAgICAgIHJldHVybiBpbml0KF9zZXR0aW5ncyk7XG5cbiAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDE1O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgX2NvbnRleHQyLnByZXYgPSAxMTtcbiAgICAgICAgICAgIF9jb250ZXh0Mi50MCA9IF9jb250ZXh0MltcImNhdGNoXCJdKDYpO1xuXG4gICAgICAgICAgICBpZiAoX3BvcHVwTWFuYWdlcikge1xuICAgICAgICAgICAgICAvLyBDYXRjaCBmYXRhbCBpZnJhbWUgZXJyb3JzIChub3QgbG9hZGluZylcbiAgICAgICAgICAgICAgaWYgKFsnSW5pdF9JZnJhbWVCbG9ja2VkJywgJ0luaXRfSWZyYW1lVGltZW91dCddLmluY2x1ZGVzKF9jb250ZXh0Mi50MC5jb2RlKSkge1xuICAgICAgICAgICAgICAgIF9wb3B1cE1hbmFnZXIucG9zdE1lc3NhZ2UoKDAsIF9idWlsZGVyMi5VaU1lc3NhZ2UpKF9jb25zdGFudHMuVUkuSUZSQU1FX0ZBSUxVUkUpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfcG9wdXBNYW5hZ2VyLmNsb3NlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgKDAsIF9tZXNzYWdlLmVycm9yTWVzc2FnZSkoX2NvbnRleHQyLnQwKSk7XG5cbiAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgaWYgKCFpZnJhbWUudGltZW91dCkge1xuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDE3O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgKDAsIF9tZXNzYWdlLmVycm9yTWVzc2FnZSkoX2NvbnN0YW50cy5FUlJPUlMuVHlwZWRFcnJvcignSW5pdF9NYW5pZmVzdE1pc3NpbmcnKSkpO1xuXG4gICAgICAgICAgY2FzZSAxNzpcbiAgICAgICAgICAgIGlmICghaWZyYW1lLmVycm9yKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMTk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCAoMCwgX21lc3NhZ2UuZXJyb3JNZXNzYWdlKShpZnJhbWUuZXJyb3IpKTtcblxuICAgICAgICAgIGNhc2UgMTk6XG4gICAgICAgICAgICAvLyByZXF1ZXN0IHBvcHVwIHdpbmRvdyBpdCBtaWdodCBiZSB1c2VkIGluIHRoZSBmdXR1cmVcbiAgICAgICAgICAgIGlmIChfc2V0dGluZ3MucG9wdXAgJiYgX3BvcHVwTWFuYWdlcikge1xuICAgICAgICAgICAgICBfcG9wdXBNYW5hZ2VyLnJlcXVlc3QoKTtcbiAgICAgICAgICAgIH0gLy8gcG9zdCBtZXNzYWdlIHRvIGlmcmFtZVxuXG5cbiAgICAgICAgICAgIF9jb250ZXh0Mi5wcmV2ID0gMjA7XG4gICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDIzO1xuICAgICAgICAgICAgcmV0dXJuIGlmcmFtZS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgIHR5cGU6IF9jb25zdGFudHMuSUZSQU1FLkNBTEwsXG4gICAgICAgICAgICAgIHBheWxvYWQ6IHBhcmFtc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjYXNlIDIzOlxuICAgICAgICAgICAgcmVzcG9uc2UgPSBfY29udGV4dDIuc2VudDtcblxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI3O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5zdWNjZXNzICYmIHJlc3BvbnNlLnBheWxvYWQuY29kZSAhPT0gJ0RldmljZV9DYWxsSW5Qcm9ncmVzcycgJiYgX3BvcHVwTWFuYWdlcikge1xuICAgICAgICAgICAgICBfcG9wdXBNYW5hZ2VyLnVubG9jaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLmFicnVwdChcInJldHVyblwiLCByZXNwb25zZSk7XG5cbiAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgaWYgKF9wb3B1cE1hbmFnZXIpIHtcbiAgICAgICAgICAgICAgX3BvcHVwTWFuYWdlci51bmxvY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgKDAsIF9tZXNzYWdlLmVycm9yTWVzc2FnZSkoX2NvbnN0YW50cy5FUlJPUlMuVHlwZWRFcnJvcignTWV0aG9kX05vUmVzcG9uc2UnKSkpO1xuXG4gICAgICAgICAgY2FzZSAzMTpcbiAgICAgICAgICAgIF9jb250ZXh0Mi5wcmV2ID0gMzE7XG4gICAgICAgICAgICBfY29udGV4dDIudDEgPSBfY29udGV4dDJbXCJjYXRjaFwiXSgyMCk7XG5cbiAgICAgICAgICAgIF9sb2cuZXJyb3IoJ19fY2FsbCBlcnJvcicsIF9jb250ZXh0Mi50MSk7XG5cbiAgICAgICAgICAgIGlmIChfcG9wdXBNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgIF9wb3B1cE1hbmFnZXIuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5hYnJ1cHQoXCJyZXR1cm5cIiwgKDAsIF9tZXNzYWdlLmVycm9yTWVzc2FnZSkoX2NvbnRleHQyLnQxKSk7XG5cbiAgICAgICAgICBjYXNlIDM2OlxuICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgX2NhbGxlZTIsIG51bGwsIFtbNiwgMTFdLCBbMjAsIDMxXV0pO1xuICB9KSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNhbGwoX3gyKSB7XG4gICAgcmV0dXJuIF9yZWYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59KCk7XG5cbmV4cG9ydHMuY2FsbCA9IGNhbGw7XG5cbnZhciBjdXN0b21NZXNzYWdlUmVzcG9uc2UgPSBmdW5jdGlvbiBjdXN0b21NZXNzYWdlUmVzcG9uc2UocGF5bG9hZCkge1xuICBpZnJhbWUucG9zdE1lc3NhZ2Uoe1xuICAgIGV2ZW50OiBfY29uc3RhbnRzLlVJX0VWRU5ULFxuICAgIHR5cGU6IF9jb25zdGFudHMuVUkuQ1VTVE9NX01FU1NBR0VfUkVTUE9OU0UsXG4gICAgcGF5bG9hZDogcGF5bG9hZFxuICB9KTtcbn07XG5cbnZhciB1aVJlc3BvbnNlID0gZnVuY3Rpb24gdWlSZXNwb25zZShyZXNwb25zZSkge1xuICB2YXIgdHlwZSA9IHJlc3BvbnNlLnR5cGUsXG4gICAgICBwYXlsb2FkID0gcmVzcG9uc2UucGF5bG9hZDtcbiAgaWZyYW1lLnBvc3RNZXNzYWdlKHtcbiAgICBldmVudDogX2NvbnN0YW50cy5VSV9FVkVOVCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIHBheWxvYWQ6IHBheWxvYWRcbiAgfSk7XG59O1xuXG5leHBvcnRzLnVpUmVzcG9uc2UgPSB1aVJlc3BvbnNlO1xuXG52YXIgcmVuZGVyV2ViVVNCQnV0dG9uID0gZnVuY3Rpb24gcmVuZGVyV2ViVVNCQnV0dG9uKGNsYXNzTmFtZSkge1xuICAoMCwgX2J1dHRvbltcImRlZmF1bHRcIl0pKGNsYXNzTmFtZSwgX3NldHRpbmdzLndlYnVzYlNyYywgaWZyYW1lLm9yaWdpbik7XG59O1xuXG5leHBvcnRzLnJlbmRlcldlYlVTQkJ1dHRvbiA9IHJlbmRlcldlYlVTQkJ1dHRvbjtcblxudmFyIGdldFNldHRpbmdzID0gZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKSB7XG4gIGlmICghaWZyYW1lLmluc3RhbmNlKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgoMCwgX21lc3NhZ2UuZXJyb3JNZXNzYWdlKShfY29uc3RhbnRzLkVSUk9SUy5UeXBlZEVycm9yKCdJbml0X05vdEluaXRpYWxpemVkJykpKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsKHtcbiAgICBtZXRob2Q6ICdnZXRTZXR0aW5ncydcbiAgfSk7XG59O1xuXG5leHBvcnRzLmdldFNldHRpbmdzID0gZ2V0U2V0dGluZ3M7XG5cbnZhciBjdXN0b21NZXNzYWdlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9yZWYzID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKCAvKiNfX1BVUkVfXyovX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU0KHBhcmFtcykge1xuICAgIHZhciBjYWxsYmFjaywgY3VzdG9tTWVzc2FnZUxpc3RlbmVyLCByZXNwb25zZTtcbiAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWU0JChfY29udGV4dDQpIHtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHN3aXRjaCAoX2NvbnRleHQ0LnByZXYgPSBfY29udGV4dDQubmV4dCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmICghKHR5cGVvZiBwYXJhbXMuY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0NC5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDQuYWJydXB0KFwicmV0dXJuXCIsICgwLCBfbWVzc2FnZS5lcnJvck1lc3NhZ2UpKF9jb25zdGFudHMuRVJST1JTLlR5cGVkRXJyb3IoJ01ldGhvZF9DdXN0b21NZXNzYWdlX0NhbGxiYWNrJykpKTtcblxuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIC8vIFRPRE86IHNldCBtZXNzYWdlIGxpc3RlbmVyIG9ubHkgaWYgaWZyYW1lIGlzIGxvYWRlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgIGNhbGxiYWNrID0gcGFyYW1zLmNhbGxiYWNrO1xuXG4gICAgICAgICAgICBjdXN0b21NZXNzYWdlTGlzdGVuZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB2YXIgX3JlZjQgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSwgcGF5bG9hZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzJChfY29udGV4dDMpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBldmVudC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShkYXRhICYmIGRhdGEudHlwZSA9PT0gX2NvbnN0YW50cy5VSS5DVVNUT01fTUVTU0FHRV9SRVFVRVNUKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YS5wYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBfY29udGV4dDMuc2VudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTWVzc2FnZVJlc3BvbnNlKHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTWVzc2FnZVJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAncmVsZWFzZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0My5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBfY2FsbGVlMyk7XG4gICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gY3VzdG9tTWVzc2FnZUxpc3RlbmVyKF94NCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVmNC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGN1c3RvbU1lc3NhZ2VMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgX2NvbnRleHQ0Lm5leHQgPSA3O1xuICAgICAgICAgICAgcmV0dXJuIGNhbGwoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnY3VzdG9tTWVzc2FnZSdcbiAgICAgICAgICAgIH0sIHBhcmFtcyksIHt9LCB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrOiBudWxsXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICByZXNwb25zZSA9IF9jb250ZXh0NC5zZW50O1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBjdXN0b21NZXNzYWdlTGlzdGVuZXIpO1xuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0NC5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ0LnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIF9jYWxsZWU0KTtcbiAgfSkpO1xuXG4gIHJldHVybiBmdW5jdGlvbiBjdXN0b21NZXNzYWdlKF94Mykge1xuICAgIHJldHVybiBfcmVmMy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufSgpO1xuXG5leHBvcnRzLmN1c3RvbU1lc3NhZ2UgPSBjdXN0b21NZXNzYWdlO1xuXG52YXIgcmVxdWVzdExvZ2luID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9yZWY1ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKCAvKiNfX1BVUkVfXyovX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU2KHBhcmFtcykge1xuICAgIHZhciBjYWxsYmFjaywgbG9naW5DaGFsbGVuZ2VMaXN0ZW5lciwgcmVzcG9uc2U7XG4gICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNiQoX2NvbnRleHQ2KSB7XG4gICAgICB3aGlsZSAoMSkge1xuICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Ni5wcmV2ID0gX2NvbnRleHQ2Lm5leHQpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBpZiAoISh0eXBlb2YgcGFyYW1zLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICBfY29udGV4dDYubmV4dCA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWxsYmFjayA9IHBhcmFtcy5jYWxsYmFjazsgLy8gVE9ETzogc2V0IG1lc3NhZ2UgbGlzdGVuZXIgb25seSBpZiBpZnJhbWUgaXMgbG9hZGVkIGNvcnJlY3RseVxuXG4gICAgICAgICAgICBsb2dpbkNoYWxsZW5nZUxpc3RlbmVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdmFyIF9yZWY2ID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKCAvKiNfX1BVUkVfXyovX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWU1KGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEsIHBheWxvYWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ud3JhcChmdW5jdGlvbiBfY2FsbGVlNSQoX2NvbnRleHQ1KSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0NS5wcmV2ID0gX2NvbnRleHQ1Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gZXZlbnQuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZGF0YSAmJiBkYXRhLnR5cGUgPT09IF9jb25zdGFudHMuVUkuTE9HSU5fQ0hBTExFTkdFX1JFUVVFU1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0NS5uZXh0ID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUucHJldiA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBfY29udGV4dDUuc2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBfY29uc3RhbnRzLlVJX0VWRU5ULFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBfY29uc3RhbnRzLlVJLkxPR0lOX0NIQUxMRU5HRV9SRVNQT05TRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDogcGF5bG9hZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUubmV4dCA9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUucHJldiA9IDk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDUudDAgPSBfY29udGV4dDVbXCJjYXRjaFwiXSgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBfY29uc3RhbnRzLlVJX0VWRU5ULFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBfY29uc3RhbnRzLlVJLkxPR0lOX0NIQUxMRU5HRV9SRVNQT05TRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDogX2NvbnRleHQ1LnQwLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ1LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIF9jYWxsZWU1LCBudWxsLCBbWzIsIDldXSk7XG4gICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gbG9naW5DaGFsbGVuZ2VMaXN0ZW5lcihfeDYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZjYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0oKTtcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsb2dpbkNoYWxsZW5nZUxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICBfY29udGV4dDYubmV4dCA9IDY7XG4gICAgICAgICAgICByZXR1cm4gY2FsbChfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdyZXF1ZXN0TG9naW4nXG4gICAgICAgICAgICB9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgICAgICAgICBhc3luY0NoYWxsZW5nZTogdHJ1ZSxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IG51bGxcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHJlc3BvbnNlID0gX2NvbnRleHQ2LnNlbnQ7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxvZ2luQ2hhbGxlbmdlTGlzdGVuZXIpO1xuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ni5hYnJ1cHQoXCJyZXR1cm5cIiwgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Ni5hYnJ1cHQoXCJyZXR1cm5cIiwgY2FsbChfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAncmVxdWVzdExvZ2luJ1xuICAgICAgICAgICAgfSwgcGFyYW1zKSkpO1xuXG4gICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQ2LnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIF9jYWxsZWU2KTtcbiAgfSkpO1xuXG4gIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0TG9naW4oX3g1KSB7XG4gICAgcmV0dXJuIF9yZWY1LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59KCk7XG5cbmV4cG9ydHMucmVxdWVzdExvZ2luID0gcmVxdWVzdExvZ2luO1xuXG52YXIgZGlzYWJsZVdlYlVTQiA9IGZ1bmN0aW9uIGRpc2FibGVXZWJVU0IoKSB7XG4gIGlmcmFtZS5wb3N0TWVzc2FnZSh7XG4gICAgZXZlbnQ6IF9jb25zdGFudHMuVUlfRVZFTlQsXG4gICAgdHlwZTogX2NvbnN0YW50cy5UUkFOU1BPUlQuRElTQUJMRV9XRUJVU0JcbiAgfSk7XG59O1xuXG5leHBvcnRzLmRpc2FibGVXZWJVU0IgPSBkaXNhYmxlV2ViVVNCOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZ2V0T3JpZ2luID0gZXhwb3J0cy5odHRwUmVxdWVzdCA9IHZvaWQgMDtcblxudmFyIF9yZWdlbmVyYXRvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKTtcblxudmFyIF9hc3luY1RvR2VuZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKSk7XG5cbnZhciBfY3Jvc3NGZXRjaCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImNyb3NzLWZldGNoXCIpKTtcblxudmFyIGh0dHBSZXF1ZXN0ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9yZWYgPSAoMCwgX2FzeW5jVG9HZW5lcmF0b3IyW1wiZGVmYXVsdFwiXSkoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLm1hcmsoZnVuY3Rpb24gX2NhbGxlZSh1cmwsIHR5cGUpIHtcbiAgICB2YXIgcmVzcG9uc2UsIHR4dDtcbiAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICB3aGlsZSAoMSkge1xuICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICB0eXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMztcbiAgICAgICAgICAgIHJldHVybiAoMCwgX2Nyb3NzRmV0Y2hbXCJkZWZhdWx0XCJdKSh1cmwsIHtcbiAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbidcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmVzcG9uc2UgPSBfY29udGV4dC5zZW50O1xuXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHR5cGUgPT09ICdqc29uJykpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDEwO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDg7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuXG4gICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgdHh0ID0gX2NvbnRleHQuc2VudDtcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgSlNPTi5wYXJzZSh0eHQpKTtcblxuICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICBpZiAoISh0eXBlID09PSAnYmluYXJ5JykpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpKTtcblxuICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIHJlc3BvbnNlLnRleHQoKSk7XG5cbiAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaHR0cFJlcXVlc3QgZXJyb3I6IFwiICsgdXJsICsgXCIgXCIgKyByZXNwb25zZS5zdGF0dXNUZXh0KTtcblxuICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIF9jYWxsZWUpO1xuICB9KSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBSZXF1ZXN0KF94LCBfeDIpIHtcbiAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufSgpO1xuXG5leHBvcnRzLmh0dHBSZXF1ZXN0ID0gaHR0cFJlcXVlc3Q7XG5cbnZhciBnZXRPcmlnaW4gPSBmdW5jdGlvbiBnZXRPcmlnaW4odXJsKSB7XG4gIGlmICh1cmwuaW5kZXhPZignZmlsZTovLycpID09PSAwKSByZXR1cm4gJ2ZpbGU6Ly8nOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcblxuICB2YXIgcGFydHMgPSB1cmwubWF0Y2goL14uK1xcOlxcL1xcL1teXFwvXSsvKTtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGFydHMpICYmIHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0c1swXSA6ICd1bmtub3duJztcbn07XG5cbmV4cG9ydHMuZ2V0T3JpZ2luID0gZ2V0T3JpZ2luOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID0gZXhwb3J0cy5kaXNwb3NlID0gZXhwb3J0cy5wb3N0TWVzc2FnZSA9IGV4cG9ydHMuaW5pdCA9IGV4cG9ydHMubWVzc2FnZVByb21pc2VzID0gZXhwb3J0cy5lcnJvciA9IGV4cG9ydHMudGltZW91dCA9IGV4cG9ydHMuaW5pdFByb21pc2UgPSBleHBvcnRzLm9yaWdpbiA9IGV4cG9ydHMuaW5zdGFuY2UgPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG52YXIgX2RlZmVycmVkID0gcmVxdWlyZShcIi4uL3V0aWxzL2RlZmVycmVkXCIpO1xuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbnZhciBfbmV0d29ya1V0aWxzID0gcmVxdWlyZShcIi4uL2Vudi9icm93c2VyL25ldHdvcmtVdGlsc1wiKTtcblxudmFyIF9pbmxpbmVTdHlsZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2lubGluZS1zdHlsZXNcIikpO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzICovXG52YXIgaW5zdGFuY2U7XG5leHBvcnRzLmluc3RhbmNlID0gaW5zdGFuY2U7XG52YXIgb3JpZ2luO1xuZXhwb3J0cy5vcmlnaW4gPSBvcmlnaW47XG52YXIgaW5pdFByb21pc2UgPSAoMCwgX2RlZmVycmVkLmNyZWF0ZSkoKTtcbmV4cG9ydHMuaW5pdFByb21pc2UgPSBpbml0UHJvbWlzZTtcbnZhciB0aW1lb3V0ID0gMDtcbmV4cG9ydHMudGltZW91dCA9IHRpbWVvdXQ7XG52YXIgZXJyb3I7XG4vKiBlc2xpbnQtZW5hYmxlIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHMgKi9cblxuZXhwb3J0cy5lcnJvciA9IGVycm9yO1xudmFyIF9tZXNzYWdlSUQgPSAwOyAvLyBldmVyeSBwb3N0TWVzc2FnZSB0byBpZnJhbWUgaGFzIGl0cyBvd24gcHJvbWlzZSB0byByZXNvbHZlXG5cbnZhciBtZXNzYWdlUHJvbWlzZXMgPSB7fTtcbmV4cG9ydHMubWVzc2FnZVByb21pc2VzID0gbWVzc2FnZVByb21pc2VzO1xuXG52YXIgaW5pdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBfcmVmID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKCAvKiNfX1BVUkVfXyovX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoc2V0dGluZ3MpIHtcbiAgICB2YXIgZXhpc3RlZEZyYW1lLCBzcmMsIG1hbmlmZXN0U3RyaW5nLCBtYW5pZmVzdCwgb25Mb2FkO1xuICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBleHBvcnRzLmluaXRQcm9taXNlID0gaW5pdFByb21pc2UgPSAoMCwgX2RlZmVycmVkLmNyZWF0ZSkoKTtcbiAgICAgICAgICAgIGV4aXN0ZWRGcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmV6b3Jjb25uZWN0Jyk7XG5cbiAgICAgICAgICAgIGlmIChleGlzdGVkRnJhbWUpIHtcbiAgICAgICAgICAgICAgZXhwb3J0cy5pbnN0YW5jZSA9IGluc3RhbmNlID0gZXhpc3RlZEZyYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXhwb3J0cy5pbnN0YW5jZSA9IGluc3RhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgICAgICAgIGluc3RhbmNlLmZyYW1lQm9yZGVyID0gJzAnO1xuICAgICAgICAgICAgICBpbnN0YW5jZS53aWR0aCA9ICcwcHgnO1xuICAgICAgICAgICAgICBpbnN0YW5jZS5oZWlnaHQgPSAnMHB4JztcbiAgICAgICAgICAgICAgaW5zdGFuY2Uuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgICBpbnN0YW5jZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICBpbnN0YW5jZS5zdHlsZS5ib3JkZXIgPSAnMHB4JztcbiAgICAgICAgICAgICAgaW5zdGFuY2Uuc3R5bGUud2lkdGggPSAnMHB4JztcbiAgICAgICAgICAgICAgaW5zdGFuY2Uuc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG4gICAgICAgICAgICAgIGluc3RhbmNlLmlkID0gJ3RyZXpvcmNvbm5lY3QnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuZW52ID09PSAnd2ViJykge1xuICAgICAgICAgICAgICBtYW5pZmVzdFN0cmluZyA9IHNldHRpbmdzLm1hbmlmZXN0ID8gSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MubWFuaWZlc3QpIDogJ3VuZGVmaW5lZCc7IC8vIG5vdGU6IGJ0b2EodW5kZWZpbmVkKSA9PT0gYnRvYSgndW5kZWZpbmVkJykgPT09IFwiZFc1a1pXWnBibVZrXCJcblxuICAgICAgICAgICAgICBtYW5pZmVzdCA9IFwidmVyc2lvbj1cIiArIHNldHRpbmdzLnZlcnNpb24gKyBcIiZtYW5pZmVzdD1cIiArIGVuY29kZVVSSUNvbXBvbmVudChidG9hKEpTT04uc3RyaW5naWZ5KG1hbmlmZXN0U3RyaW5nKSkpO1xuICAgICAgICAgICAgICBzcmMgPSBzZXR0aW5ncy5pZnJhbWVTcmMgKyBcIj9cIiArIG1hbmlmZXN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3JjID0gc2V0dGluZ3MuaWZyYW1lU3JjO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbnN0YW5jZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy53ZWJ1c2IpIHtcbiAgICAgICAgICAgICAgaW5zdGFuY2Uuc2V0QXR0cmlidXRlKCdhbGxvdycsICd1c2InKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXhwb3J0cy5vcmlnaW4gPSBvcmlnaW4gPSAoMCwgX25ldHdvcmtVdGlscy5nZXRPcmlnaW4pKGluc3RhbmNlLnNyYyk7XG4gICAgICAgICAgICBleHBvcnRzLnRpbWVvdXQgPSB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpbml0UHJvbWlzZS5yZWplY3QoX2NvbnN0YW50cy5FUlJPUlMuVHlwZWRFcnJvcignSW5pdF9JZnJhbWVUaW1lb3V0JykpO1xuICAgICAgICAgICAgfSwgMTAwMDApO1xuXG4gICAgICAgICAgICBvbkxvYWQgPSBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgICAgICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBpbml0UHJvbWlzZS5yZWplY3QoX2NvbnN0YW50cy5FUlJPUlMuVHlwZWRFcnJvcignSW5pdF9JZnJhbWVCbG9ja2VkJykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaG9zdGluZyBwYWdlIGlzIGFibGUgdG8gYWNjZXNzIGNyb3NzLW9yaWdpbiBsb2NhdGlvbiBpdCBtZWFucyB0aGF0IHRoZSBpZnJhbWUgaXMgbm90IGxvYWRlZFxuICAgICAgICAgICAgICAgIHZhciBpZnJhbWVPcmlnaW4gPSBpbnN0YW5jZS5jb250ZW50V2luZG93LmxvY2F0aW9uLm9yaWdpbjtcblxuICAgICAgICAgICAgICAgIGlmICghaWZyYW1lT3JpZ2luIHx8IGlmcmFtZU9yaWdpbiA9PT0gJ251bGwnKSB7XG4gICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgICAgICAgICAgICAgIGhhbmRsZUlmcmFtZUJsb2NrZWQoKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsvLyBlbXB0eVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGV4dGVuc2lvbjsgLy8gJEZsb3dJc3N1ZSBjaHJvbWUgaXMgbm90IGRlY2xhcmVkIG91dHNpZGVcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNocm9tZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY2hyb21lLnJ1bnRpbWUgJiYgdHlwZW9mIGNocm9tZS5ydW50aW1lLm9uQ29ubmVjdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKCkge30pO1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbiA9IGNocm9tZS5ydW50aW1lLmlkO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaW5zdGFuY2UuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogX2NvbnN0YW50cy5JRlJBTUUuSU5JVCxcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICBzZXR0aW5nczogc2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgICBleHRlbnNpb246IGV4dGVuc2lvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSwgb3JpZ2luKTtcbiAgICAgICAgICAgICAgaW5zdGFuY2Uub25sb2FkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfTsgLy8gSUUgaGFja1xuXG5cbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICBpbnN0YW5jZS5hdHRhY2hFdmVudCgnb25sb2FkJywgb25Mb2FkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGluc3RhbmNlLm9ubG9hZCA9IG9uTG9hZDtcbiAgICAgICAgICAgIH0gLy8gaW5qZWN0IGlmcmFtZSBpbnRvIGhvc3QgZG9jdW1lbnQgYm9keVxuXG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5zdGFuY2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcblxuICAgICAgICAgICAgICBpbmplY3RTdHlsZVNoZWV0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAxMTtcbiAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxNDtcbiAgICAgICAgICAgIHJldHVybiBpbml0UHJvbWlzZS5wcm9taXNlO1xuXG4gICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAyMDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxNjpcbiAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAxNjtcbiAgICAgICAgICAgIF9jb250ZXh0LnQwID0gX2NvbnRleHRbXCJjYXRjaFwiXSgxMSk7XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHN0YXRlIHRvIGFsbG93IGluaXRpYWxpemF0aW9uIGFnYWluXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGV4cG9ydHMuaW5zdGFuY2UgPSBpbnN0YW5jZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IF9jb250ZXh0LnQwO1xuXG4gICAgICAgICAgY2FzZSAyMDpcbiAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAyMDtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICBleHBvcnRzLnRpbWVvdXQgPSB0aW1lb3V0ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5maW5pc2goMjApO1xuXG4gICAgICAgICAgY2FzZSAyNDpcbiAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgX2NhbGxlZSwgbnVsbCwgW1sxMSwgMTYsIDIwLCAyNF1dKTtcbiAgfSkpO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpbml0KF94KSB7XG4gICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn0oKTtcblxuZXhwb3J0cy5pbml0ID0gaW5pdDtcblxudmFyIGluamVjdFN0eWxlU2hlZXQgPSBmdW5jdGlvbiBpbmplY3RTdHlsZVNoZWV0KCkge1xuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgdGhyb3cgX2NvbnN0YW50cy5FUlJPUlMuVHlwZWRFcnJvcignSW5pdF9JZnJhbWVCbG9ja2VkJyk7XG4gIH1cblxuICB2YXIgZG9jID0gaW5zdGFuY2Uub3duZXJEb2N1bWVudDtcbiAgdmFyIGhlYWQgPSBkb2MuaGVhZCB8fCBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gIHN0eWxlLnNldEF0dHJpYnV0ZSgnaWQnLCAnVHJlem9yQ29ubmVjdFN0eWxlc2hlZXQnKTsgLy8gJEZsb3dJc3N1ZVxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgLy8gSUVcbiAgICAvLyAkRmxvd0lzc3VlXG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gX2lubGluZVN0eWxlc1tcImRlZmF1bHRcIl07XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoX2lubGluZVN0eWxlc1tcImRlZmF1bHRcIl0pKTtcbiAgICBoZWFkLmFwcGVuZChzdHlsZSk7XG4gIH1cbn07XG5cbnZhciBoYW5kbGVJZnJhbWVCbG9ja2VkID0gZnVuY3Rpb24gaGFuZGxlSWZyYW1lQmxvY2tlZCgpIHtcbiAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgZXhwb3J0cy5lcnJvciA9IGVycm9yID0gX2NvbnN0YW50cy5FUlJPUlMuVHlwZWRFcnJvcignSW5pdF9JZnJhbWVCbG9ja2VkJyk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuXG4gIGRpc3Bvc2UoKTtcbiAgaW5pdFByb21pc2UucmVqZWN0KGVycm9yKTtcbn07IC8vIHBvc3QgbWVzc2FnZXMgdG8gaWZyYW1lXG5cblxudmFyIHBvc3RNZXNzYWdlID0gZnVuY3Rpb24gcG9zdE1lc3NhZ2UobWVzc2FnZSwgdXNlUHJvbWlzZSkge1xuICBpZiAodXNlUHJvbWlzZSA9PT0gdm9pZCAwKSB7XG4gICAgdXNlUHJvbWlzZSA9IHRydWU7XG4gIH1cblxuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgdGhyb3cgX2NvbnN0YW50cy5FUlJPUlMuVHlwZWRFcnJvcignSW5pdF9JZnJhbWVCbG9ja2VkJyk7XG4gIH1cblxuICBpZiAodXNlUHJvbWlzZSkge1xuICAgIF9tZXNzYWdlSUQrKztcbiAgICBtZXNzYWdlLmlkID0gX21lc3NhZ2VJRDtcbiAgICBtZXNzYWdlUHJvbWlzZXNbX21lc3NhZ2VJRF0gPSAoMCwgX2RlZmVycmVkLmNyZWF0ZSkoKTtcbiAgICB2YXIgcHJvbWlzZSA9IG1lc3NhZ2VQcm9taXNlc1tfbWVzc2FnZUlEXS5wcm9taXNlO1xuICAgIGluc3RhbmNlLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgb3JpZ2luKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGluc3RhbmNlLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgb3JpZ2luKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnRzLnBvc3RNZXNzYWdlID0gcG9zdE1lc3NhZ2U7XG5cbnZhciBkaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgaWYgKGluc3RhbmNlICYmIGluc3RhbmNlLnBhcmVudE5vZGUpIHtcbiAgICB0cnkge1xuICAgICAgaW5zdGFuY2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnN0YW5jZSk7XG4gICAgfSBjYXRjaCAoZSkgey8vIGRvIG5vdGhpbmdcbiAgICB9XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlID0gaW5zdGFuY2UgPSBudWxsO1xuICBleHBvcnRzLnRpbWVvdXQgPSB0aW1lb3V0ID0gMDtcbn07XG5cbmV4cG9ydHMuZGlzcG9zZSA9IGRpc3Bvc2U7XG5cbnZhciBjbGVhclRpbWVvdXQgPSBmdW5jdGlvbiBjbGVhclRpbWVvdXQoKSB7XG4gIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG59O1xuXG5leHBvcnRzLmNsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xudmFyIGNzcyA9ICcudHJlem9yY29ubmVjdC1jb250YWluZXJ7cG9zaXRpb246Zml4ZWQhaW1wb3J0YW50O2Rpc3BsYXk6LXdlYmtpdC1ib3ghaW1wb3J0YW50O2Rpc3BsYXk6LXdlYmtpdC1mbGV4IWltcG9ydGFudDtkaXNwbGF5Oi1tcy1mbGV4Ym94IWltcG9ydGFudDtkaXNwbGF5OmZsZXghaW1wb3J0YW50Oy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbCFpbXBvcnRhbnQ7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbCFpbXBvcnRhbnQ7LXdlYmtpdC1mbGV4LWRpcmVjdGlvbjpjb2x1bW4haW1wb3J0YW50Oy1tcy1mbGV4LWRpcmVjdGlvbjpjb2x1bW4haW1wb3J0YW50O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbiFpbXBvcnRhbnQ7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyIWltcG9ydGFudDstd2Via2l0LWFsaWduLWl0ZW1zOmNlbnRlciFpbXBvcnRhbnQ7LW1zLWZsZXgtYWxpZ246Y2VudGVyIWltcG9ydGFudDthbGlnbi1pdGVtczpjZW50ZXIhaW1wb3J0YW50O3otaW5kZXg6MTAwMDAhaW1wb3J0YW50O3dpZHRoOjEwMCUhaW1wb3J0YW50O2hlaWdodDoxMDAlIWltcG9ydGFudDt0b3A6MCFpbXBvcnRhbnQ7bGVmdDowIWltcG9ydGFudDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjM1KSFpbXBvcnRhbnQ7b3ZlcmZsb3c6YXV0byFpbXBvcnRhbnQ7cGFkZGluZzoyMHB4IWltcG9ydGFudDttYXJnaW46MCFpbXBvcnRhbnR9LnRyZXpvcmNvbm5lY3QtY29udGFpbmVyIC50cmV6b3Jjb25uZWN0LXdpbmRvd3twb3NpdGlvbjpyZWxhdGl2ZSFpbXBvcnRhbnQ7ZGlzcGxheTpibG9jayFpbXBvcnRhbnQ7d2lkdGg6MzcwcHghaW1wb3J0YW50O2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUlcIixSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLEFyaWFsLHNhbnMtc2VyaWYhaW1wb3J0YW50O21hcmdpbjphdXRvIWltcG9ydGFudDtib3JkZXItcmFkaXVzOjNweCFpbXBvcnRhbnQ7YmFja2dyb3VuZC1jb2xvcjojZmZmIWltcG9ydGFudDt0ZXh0LWFsaWduOmNlbnRlciFpbXBvcnRhbnQ7b3ZlcmZsb3c6aGlkZGVuIWltcG9ydGFudH0udHJlem9yY29ubmVjdC1jb250YWluZXIgLnRyZXpvcmNvbm5lY3Qtd2luZG93IC50cmV6b3Jjb25uZWN0LWhlYWR7dGV4dC1hbGlnbjpsZWZ0O3BhZGRpbmc6MTJweCAyNHB4IWltcG9ydGFudDtkaXNwbGF5Oi13ZWJraXQtYm94IWltcG9ydGFudDtkaXNwbGF5Oi13ZWJraXQtZmxleCFpbXBvcnRhbnQ7ZGlzcGxheTotbXMtZmxleGJveCFpbXBvcnRhbnQ7ZGlzcGxheTpmbGV4IWltcG9ydGFudDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXIhaW1wb3J0YW50Oy13ZWJraXQtYWxpZ24taXRlbXM6Y2VudGVyIWltcG9ydGFudDstbXMtZmxleC1hbGlnbjpjZW50ZXIhaW1wb3J0YW50O2FsaWduLWl0ZW1zOmNlbnRlciFpbXBvcnRhbnR9LnRyZXpvcmNvbm5lY3QtY29udGFpbmVyIC50cmV6b3Jjb25uZWN0LXdpbmRvdyAudHJlem9yY29ubmVjdC1oZWFkIC50cmV6b3Jjb25uZWN0LWxvZ297LXdlYmtpdC1ib3gtZmxleDoxOy13ZWJraXQtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS50cmV6b3Jjb25uZWN0LWNvbnRhaW5lciAudHJlem9yY29ubmVjdC13aW5kb3cgLnRyZXpvcmNvbm5lY3QtaGVhZCAudHJlem9yY29ubmVjdC1jbG9zZXtjdXJzb3I6cG9pbnRlciFpbXBvcnRhbnQ7aGVpZ2h0OjI0cHghaW1wb3J0YW50fS50cmV6b3Jjb25uZWN0LWNvbnRhaW5lciAudHJlem9yY29ubmVjdC13aW5kb3cgLnRyZXpvcmNvbm5lY3QtaGVhZCAudHJlem9yY29ubmVjdC1jbG9zZSBzdmd7ZmlsbDojNzU3NTc1Oy13ZWJraXQtdHJhbnNpdGlvbjpmaWxsIC4zcyBlYXNlLWluLW91dCFpbXBvcnRhbnQ7dHJhbnNpdGlvbjpmaWxsIC4zcyBlYXNlLWluLW91dCFpbXBvcnRhbnR9LnRyZXpvcmNvbm5lY3QtY29udGFpbmVyIC50cmV6b3Jjb25uZWN0LXdpbmRvdyAudHJlem9yY29ubmVjdC1oZWFkIC50cmV6b3Jjb25uZWN0LWNsb3NlOmhvdmVyIHN2Z3tmaWxsOiM0OTQ5NDl9LnRyZXpvcmNvbm5lY3QtY29udGFpbmVyIC50cmV6b3Jjb25uZWN0LXdpbmRvdyAudHJlem9yY29ubmVjdC1ib2R5e3BhZGRpbmc6MjRweCAyNHB4IDMycHghaW1wb3J0YW50O2JhY2tncm91bmQ6I0ZCRkJGQiFpbXBvcnRhbnQ7Ym9yZGVyLXRvcDoxcHggc29saWQgI0VCRUJFQn0udHJlem9yY29ubmVjdC1jb250YWluZXIgLnRyZXpvcmNvbm5lY3Qtd2luZG93IC50cmV6b3Jjb25uZWN0LWJvZHkgaDN7Y29sb3I6IzUwNTA1MCFpbXBvcnRhbnQ7Zm9udC1zaXplOjE2cHghaW1wb3J0YW50O2ZvbnQtd2VpZ2h0OjUwMCFpbXBvcnRhbnR9LnRyZXpvcmNvbm5lY3QtY29udGFpbmVyIC50cmV6b3Jjb25uZWN0LXdpbmRvdyAudHJlem9yY29ubmVjdC1ib2R5IHB7bWFyZ2luOjhweCAwIDI0cHghaW1wb3J0YW50O2ZvbnQtd2VpZ2h0OjQwMCFpbXBvcnRhbnQ7Y29sb3I6I0E5QTlBOSFpbXBvcnRhbnQ7Zm9udC1zaXplOjEycHghaW1wb3J0YW50fS50cmV6b3Jjb25uZWN0LWNvbnRhaW5lciAudHJlem9yY29ubmVjdC13aW5kb3cgLnRyZXpvcmNvbm5lY3QtYm9keSBidXR0b257d2lkdGg6MTAwJSFpbXBvcnRhbnQ7cGFkZGluZzoxMnB4IDI0cHghaW1wb3J0YW50O21hcmdpbjowIWltcG9ydGFudDtib3JkZXItcmFkaXVzOjNweCFpbXBvcnRhbnQ7Zm9udC1zaXplOjE0cHghaW1wb3J0YW50O2ZvbnQtd2VpZ2h0OjMwMCFpbXBvcnRhbnQ7Y3Vyc29yOnBvaW50ZXIhaW1wb3J0YW50O2JhY2tncm91bmQ6IzAxQjc1NyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7Ym9yZGVyOjAhaW1wb3J0YW50Oy13ZWJraXQtdHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4zcyBlYXNlLWluLW91dCFpbXBvcnRhbnQ7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4zcyBlYXNlLWluLW91dCFpbXBvcnRhbnR9LnRyZXpvcmNvbm5lY3QtY29udGFpbmVyIC50cmV6b3Jjb25uZWN0LXdpbmRvdyAudHJlem9yY29ubmVjdC1ib2R5IGJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMwMEFCNTEhaW1wb3J0YW50fS50cmV6b3Jjb25uZWN0LWNvbnRhaW5lciAudHJlem9yY29ubmVjdC13aW5kb3cgLnRyZXpvcmNvbm5lY3QtYm9keSBidXR0b246YWN0aXZle2JhY2tncm91bmQtY29sb3I6IzAwOTU0NiFpbXBvcnRhbnR9LyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltbHVjSFYwSWl3aUpITjBaR2x1SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVdOQkxIbENRVU5KTEZOQlFVRXNaMEpCUTBFc1VVRkJRU3h6UWtGRFFTeFJRVUZCTEhWQ1FVTkJMRkZCUVVFc2MwSkJSVUVzVVVGQlFTeGxRVU5CTEcxQ1FVRkJMRzFDUVVOQkxITkNRVUZCTEdsQ1FVTkJMSFZDUVVGQkxHbENRVU5CTEcxQ1FVRkJMR2xDUVVOQkxHVkJRVUVzYVVKQlJVRXNhMEpCUVVFc2FVSkJRMEVzYjBKQlFVRXNhVUpCUTBFc1pVRkJRU3hwUWtObVRTeFpRVUZoTEdsQ1JFRnlRaXhSUVVGVExHZENRV3RDU0N4TlFVRkJMR1ZCUTBFc1QwRkJRU3hsUVVOQkxFbEJRVUVzV1VGRFFTeExRVUZCTEZsQlEwRXNWMEZCUVN3d1FrRkRRU3hUUVVGQkxHVkJRMEVzVVVGQlFTeGxRVU5CTEU5QlFVRXNXVU5rVWl3clEwUllSU3hUUVVGVkxHMUNRVFpDUVN4UlFVRkJMR2RDUVVOQkxFMUJRVUVzWjBKQlEwRXNXVUZCUVN4alFVRkJMRzFDUVVGQkxGZEJRVUVzVDBGQlFTeHBRa0ZCUVN4TlFVRkJMSEZDUVVOQkxFOUJRVUVzWlVObVZpeGpRVUZsTEdORWFrSm1MR2xDUVdsQ1JTeGxRV3RDV1N4WFFVRkJMR2xDUTJaa0xGTkJRVlVzYVVKRWJVSkpMRzFGUVVOQkxGZEJRVUVzUzBOb1FtUXNVVUZCVXl4TFFVRkxMR1ZFZUVKa0xGRkJRVk1zYzBKQk1FTlRMRkZCUVVFc2RVSkJRMEVzVVVGQlFTeHpRa05tYkVJc1VVRkJVeXhsUkdsQ1N5eHJRa0UxUWxvc2FVSkJPRUp2UWl4dlFrRkJRU3hwUWtOb1FteENMR1ZCUVdkQ0xHbENSQzlDV2l4WlFXbENUaXhwUWtGelExRXNkVVpCUTBFc2FVSkJRVUVzUlVOd1FsWXNZVUZCWXl4RlJIQkRWaXhUUVVGVkxFVkJNa1JCTEV0QlFVRXNSVUZGUVN4M1JrTndRbVFzVDBGQlVTeHJRa1I2UTFJc1QwRkJVU3hsUVdsRlRTdzBSa0ZEUVN4TFFVRkJMRkZCUTBFc2JVSkJRVUVzUzBGQlFTeEpRVUZCTEhOQ1EzQkNaQ3hYUVVGWkxFdEJRVXNzU1VGQlN5eHpRa1IzUWxJc2EwZEJRMEVzUzBGQlFTeFJRVVZCTEcxRlFVTkJMRkZCUVVFc1MwRkJRU3hMUVVGQkxHVkJRMEVzVjBGQlFTeHJRa0ZEUVN4WFFVRkJMRWxCUVVFc1RVRkJRU3hSUVVWQkxITkZRVU5CTEUxQlFVRXNhMEpCUTBFc1ZVRkJRU3hsUTNKQ1pDeFpRVUZoTEdORWQwSkxMSEZGUTNKQ2JFSXNUMEZCVVN4SlFVRkpMRVZCUVVrc1pVUjNRa1lzV1VGQlFTeGpRVU5KTEUxQlFVRXNhMEpEZEVKc1FpeFZRVUZYTEdWQlJXSXNNRVZCUTBVc1RVRkJUeXhsUVVOUUxGRkJRVk1zUzBGQlN5eGxRVU5rTEU5QlFWRXNXVUZEVWl4alFVRmxMR05CUTJZc1ZVRkJWeXhsUVVOWUxGbEJRV0VzWTBGRFlpeFBRVUZSTEd0Q1FVTlNMRmRCUVZrc2EwSkJRMW9zVFVGQlR5eGxRVU5RTEU5QlFWRXNXVUZEVWl4dFFrRkJiMElzYVVKQlFXbENMRWxCUVVzc2MwSkJRekZETEZkQlFWa3NhVUpCUVdsQ0xFbEJRVXNzYzBKQlJYQkRMR2RHUVVORkxHbENRVUZyUWl4clFrRkZjRUlzYVVaQlEwVXNhVUpCUVd0Q0luMD0gKi8nO1xudmFyIF9kZWZhdWx0ID0gY3NzO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgX2V4cG9ydE5hbWVzID0ge307XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCIpKTtcblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XG5cbk9iamVjdC5rZXlzKF9jb25zdGFudHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX2V4cG9ydE5hbWVzLCBrZXkpKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9jb25zdGFudHNba2V5XSkgcmV0dXJuO1xuICBleHBvcnRzW2tleV0gPSBfY29uc3RhbnRzW2tleV07XG59KTtcblxudmFyIF9ub2RlID0gcmVxdWlyZShcIi4vZW52L25vZGVcIik7XG5cbnZhciBfdHlwZXMgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcblxuT2JqZWN0LmtleXMoX3R5cGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9leHBvcnROYW1lcywga2V5KSkgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfdHlwZXNba2V5XSkgcmV0dXJuO1xuICBleHBvcnRzW2tleV0gPSBfdHlwZXNba2V5XTtcbn0pO1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSB7IHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KTsgfSBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IH0gcmV0dXJuIHRhcmdldDsgfVxuXG52YXIgVHJlem9yQ29ubmVjdCA9IHtcbiAgbWFuaWZlc3Q6IF9ub2RlLm1hbmlmZXN0LFxuICBpbml0OiBfbm9kZS5pbml0LFxuICBnZXRTZXR0aW5nczogX25vZGUuZ2V0U2V0dGluZ3MsXG4gIG9uOiBmdW5jdGlvbiBvbih0eXBlLCBmbikge1xuICAgIF9ub2RlLmV2ZW50RW1pdHRlci5vbih0eXBlLCBmbik7XG4gIH0sXG4gIG9mZjogZnVuY3Rpb24gb2ZmKHR5cGUsIGZuKSB7XG4gICAgX25vZGUuZXZlbnRFbWl0dGVyLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGZuKTtcbiAgfSxcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzOiBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoKSB7XG4gICAgX25vZGUuZXZlbnRFbWl0dGVyLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICB9LFxuICB1aVJlc3BvbnNlOiBfbm9kZS51aVJlc3BvbnNlLFxuICAvLyBtZXRob2RzXG4gIGJsb2NrY2hhaW5HZXRBY2NvdW50QmFsYW5jZUhpc3Rvcnk6IGZ1bmN0aW9uIGJsb2NrY2hhaW5HZXRBY2NvdW50QmFsYW5jZUhpc3RvcnkocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2Jsb2NrY2hhaW5HZXRBY2NvdW50QmFsYW5jZUhpc3RvcnknXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5HZXRDdXJyZW50RmlhdFJhdGVzOiBmdW5jdGlvbiBibG9ja2NoYWluR2V0Q3VycmVudEZpYXRSYXRlcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnYmxvY2tjaGFpbkdldEN1cnJlbnRGaWF0UmF0ZXMnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5HZXRGaWF0UmF0ZXNGb3JUaW1lc3RhbXBzOiBmdW5jdGlvbiBibG9ja2NoYWluR2V0RmlhdFJhdGVzRm9yVGltZXN0YW1wcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnYmxvY2tjaGFpbkdldEZpYXRSYXRlc0ZvclRpbWVzdGFtcHMnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5EaXNjb25uZWN0OiBmdW5jdGlvbiBibG9ja2NoYWluRGlzY29ubmVjdChwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnYmxvY2tjaGFpbkRpc2Nvbm5lY3QnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5Fc3RpbWF0ZUZlZTogZnVuY3Rpb24gYmxvY2tjaGFpbkVzdGltYXRlRmVlKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdibG9ja2NoYWluRXN0aW1hdGVGZWUnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5HZXRUcmFuc2FjdGlvbnM6IGZ1bmN0aW9uIGJsb2NrY2hhaW5HZXRUcmFuc2FjdGlvbnMocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2Jsb2NrY2hhaW5HZXRUcmFuc2FjdGlvbnMnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5TZXRDdXN0b21CYWNrZW5kOiBmdW5jdGlvbiBibG9ja2NoYWluU2V0Q3VzdG9tQmFja2VuZChwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnYmxvY2tjaGFpblNldEN1c3RvbUJhY2tlbmQnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5TdWJzY3JpYmU6IGZ1bmN0aW9uIGJsb2NrY2hhaW5TdWJzY3JpYmUocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2Jsb2NrY2hhaW5TdWJzY3JpYmUnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5TdWJzY3JpYmVGaWF0UmF0ZXM6IGZ1bmN0aW9uIGJsb2NrY2hhaW5TdWJzY3JpYmVGaWF0UmF0ZXMocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2Jsb2NrY2hhaW5TdWJzY3JpYmVGaWF0UmF0ZXMnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5VbnN1YnNjcmliZTogZnVuY3Rpb24gYmxvY2tjaGFpblVuc3Vic2NyaWJlKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdibG9ja2NoYWluVW5zdWJzY3JpYmUnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGJsb2NrY2hhaW5VbnN1YnNjcmliZUZpYXRSYXRlczogZnVuY3Rpb24gYmxvY2tjaGFpblVuc3Vic2NyaWJlRmlhdFJhdGVzKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdibG9ja2NoYWluVW5zdWJzY3JpYmVGaWF0UmF0ZXMnXG4gICAgfSwgcGFyYW1zKSk7XG4gIH0sXG4gIGN1c3RvbU1lc3NhZ2U6IGZ1bmN0aW9uIGN1c3RvbU1lc3NhZ2UocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jdXN0b21NZXNzYWdlKShwYXJhbXMpO1xuICB9LFxuICByZXF1ZXN0TG9naW46IGZ1bmN0aW9uIHJlcXVlc3RMb2dpbihwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLnJlcXVlc3RMb2dpbikocGFyYW1zKTtcbiAgfSxcbiAgY2FyZGFub0dldEFkZHJlc3M6IGZ1bmN0aW9uIGNhcmRhbm9HZXRBZGRyZXNzKHBhcmFtcykge1xuICAgIHZhciB1c2VFdmVudExpc3RlbmVyID0gX25vZGUuZXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQoX2NvbnN0YW50cy5VSS5BRERSRVNTX1ZBTElEQVRJT04pID4gMDtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdjYXJkYW5vR2V0QWRkcmVzcydcbiAgICB9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgdXNlRXZlbnRMaXN0ZW5lcjogdXNlRXZlbnRMaXN0ZW5lclxuICAgIH0pKTtcbiAgfSxcbiAgY2FyZGFub0dldE5hdGl2ZVNjcmlwdEhhc2g6IGZ1bmN0aW9uIGNhcmRhbm9HZXROYXRpdmVTY3JpcHRIYXNoKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdjYXJkYW5vR2V0TmF0aXZlU2NyaXB0SGFzaCdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgY2FyZGFub0dldFB1YmxpY0tleTogZnVuY3Rpb24gY2FyZGFub0dldFB1YmxpY0tleShwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnY2FyZGFub0dldFB1YmxpY0tleSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgY2FyZGFub1NpZ25UcmFuc2FjdGlvbjogZnVuY3Rpb24gY2FyZGFub1NpZ25UcmFuc2FjdGlvbihwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnY2FyZGFub1NpZ25UcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgY2lwaGVyS2V5VmFsdWU6IGZ1bmN0aW9uIGNpcGhlcktleVZhbHVlKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdjaXBoZXJLZXlWYWx1ZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgY29tcG9zZVRyYW5zYWN0aW9uOiBmdW5jdGlvbiBjb21wb3NlVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2NvbXBvc2VUcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZXRoZXJldW1HZXRBZGRyZXNzOiBmdW5jdGlvbiBldGhlcmV1bUdldEFkZHJlc3MocGFyYW1zKSB7XG4gICAgdmFyIHVzZUV2ZW50TGlzdGVuZXIgPSBfbm9kZS5ldmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudChfY29uc3RhbnRzLlVJLkFERFJFU1NfVkFMSURBVElPTikgPiAwO1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2V0aGVyZXVtR2V0QWRkcmVzcydcbiAgICB9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgdXNlRXZlbnRMaXN0ZW5lcjogdXNlRXZlbnRMaXN0ZW5lclxuICAgIH0pKTtcbiAgfSxcbiAgZXRoZXJldW1HZXRQdWJsaWNLZXk6IGZ1bmN0aW9uIGV0aGVyZXVtR2V0UHVibGljS2V5KHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdldGhlcmV1bUdldFB1YmxpY0tleSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZXRoZXJldW1TaWduTWVzc2FnZTogZnVuY3Rpb24gZXRoZXJldW1TaWduTWVzc2FnZShwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnZXRoZXJldW1TaWduTWVzc2FnZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZXRoZXJldW1TaWduVHJhbnNhY3Rpb246IGZ1bmN0aW9uIGV0aGVyZXVtU2lnblRyYW5zYWN0aW9uKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdldGhlcmV1bVNpZ25UcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZXRoZXJldW1TaWduVHlwZWREYXRhOiBmdW5jdGlvbiBldGhlcmV1bVNpZ25UeXBlZERhdGEocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2V0aGVyZXVtU2lnblR5cGVkRGF0YSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZXRoZXJldW1WZXJpZnlNZXNzYWdlOiBmdW5jdGlvbiBldGhlcmV1bVZlcmlmeU1lc3NhZ2UocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2V0aGVyZXVtVmVyaWZ5TWVzc2FnZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZ2V0QWNjb3VudEluZm86IGZ1bmN0aW9uIGdldEFjY291bnRJbmZvKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdnZXRBY2NvdW50SW5mbydcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZ2V0QWRkcmVzczogZnVuY3Rpb24gZ2V0QWRkcmVzcyhwYXJhbXMpIHtcbiAgICB2YXIgdXNlRXZlbnRMaXN0ZW5lciA9IF9ub2RlLmV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50KF9jb25zdGFudHMuVUkuQUREUkVTU19WQUxJREFUSU9OKSA+IDA7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnZ2V0QWRkcmVzcydcbiAgICB9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgdXNlRXZlbnRMaXN0ZW5lcjogdXNlRXZlbnRMaXN0ZW5lclxuICAgIH0pKTtcbiAgfSxcbiAgZ2V0RGV2aWNlU3RhdGU6IGZ1bmN0aW9uIGdldERldmljZVN0YXRlKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdnZXREZXZpY2VTdGF0ZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZ2V0RmVhdHVyZXM6IGZ1bmN0aW9uIGdldEZlYXR1cmVzKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdnZXRGZWF0dXJlcydcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZ2V0UHVibGljS2V5OiBmdW5jdGlvbiBnZXRQdWJsaWNLZXkocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2dldFB1YmxpY0tleSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgbGlza0dldEFkZHJlc3M6IGZ1bmN0aW9uIGxpc2tHZXRBZGRyZXNzKCkge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoe1xuICAgICAgbWV0aG9kOiAnbGlza0RlcHJlY2F0ZWQnXG4gICAgfSk7XG4gIH0sXG4gIGxpc2tHZXRQdWJsaWNLZXk6IGZ1bmN0aW9uIGxpc2tHZXRQdWJsaWNLZXkoKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKSh7XG4gICAgICBtZXRob2Q6ICdsaXNrRGVwcmVjYXRlZCdcbiAgICB9KTtcbiAgfSxcbiAgbGlza1NpZ25NZXNzYWdlOiBmdW5jdGlvbiBsaXNrU2lnbk1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKSh7XG4gICAgICBtZXRob2Q6ICdsaXNrRGVwcmVjYXRlZCdcbiAgICB9KTtcbiAgfSxcbiAgbGlza1NpZ25UcmFuc2FjdGlvbjogZnVuY3Rpb24gbGlza1NpZ25UcmFuc2FjdGlvbigpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKHtcbiAgICAgIG1ldGhvZDogJ2xpc2tEZXByZWNhdGVkJ1xuICAgIH0pO1xuICB9LFxuICBsaXNrVmVyaWZ5TWVzc2FnZTogZnVuY3Rpb24gbGlza1ZlcmlmeU1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKSh7XG4gICAgICBtZXRob2Q6ICdsaXNrRGVwcmVjYXRlZCdcbiAgICB9KTtcbiAgfSxcbiAgbmVtR2V0QWRkcmVzczogZnVuY3Rpb24gbmVtR2V0QWRkcmVzcyhwYXJhbXMpIHtcbiAgICB2YXIgdXNlRXZlbnRMaXN0ZW5lciA9IF9ub2RlLmV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50KF9jb25zdGFudHMuVUkuQUREUkVTU19WQUxJREFUSU9OKSA+IDA7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnbmVtR2V0QWRkcmVzcydcbiAgICB9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgdXNlRXZlbnRMaXN0ZW5lcjogdXNlRXZlbnRMaXN0ZW5lclxuICAgIH0pKTtcbiAgfSxcbiAgbmVtU2lnblRyYW5zYWN0aW9uOiBmdW5jdGlvbiBuZW1TaWduVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ25lbVNpZ25UcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgcHVzaFRyYW5zYWN0aW9uOiBmdW5jdGlvbiBwdXNoVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ3B1c2hUcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgcmlwcGxlR2V0QWRkcmVzczogZnVuY3Rpb24gcmlwcGxlR2V0QWRkcmVzcyhwYXJhbXMpIHtcbiAgICB2YXIgdXNlRXZlbnRMaXN0ZW5lciA9IF9ub2RlLmV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50KF9jb25zdGFudHMuVUkuQUREUkVTU19WQUxJREFUSU9OKSA+IDA7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAncmlwcGxlR2V0QWRkcmVzcydcbiAgICB9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgdXNlRXZlbnRMaXN0ZW5lcjogdXNlRXZlbnRMaXN0ZW5lclxuICAgIH0pKTtcbiAgfSxcbiAgcmlwcGxlU2lnblRyYW5zYWN0aW9uOiBmdW5jdGlvbiByaXBwbGVTaWduVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ3JpcHBsZVNpZ25UcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgc2lnbk1lc3NhZ2U6IGZ1bmN0aW9uIHNpZ25NZXNzYWdlKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdzaWduTWVzc2FnZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgc2lnblRyYW5zYWN0aW9uOiBmdW5jdGlvbiBzaWduVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ3NpZ25UcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgc3RlbGxhckdldEFkZHJlc3M6IGZ1bmN0aW9uIHN0ZWxsYXJHZXRBZGRyZXNzKHBhcmFtcykge1xuICAgIHZhciB1c2VFdmVudExpc3RlbmVyID0gX25vZGUuZXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQoX2NvbnN0YW50cy5VSS5BRERSRVNTX1ZBTElEQVRJT04pID4gMDtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdzdGVsbGFyR2V0QWRkcmVzcydcbiAgICB9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgdXNlRXZlbnRMaXN0ZW5lcjogdXNlRXZlbnRMaXN0ZW5lclxuICAgIH0pKTtcbiAgfSxcbiAgc3RlbGxhclNpZ25UcmFuc2FjdGlvbjogZnVuY3Rpb24gc3RlbGxhclNpZ25UcmFuc2FjdGlvbihwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnc3RlbGxhclNpZ25UcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgdGV6b3NHZXRBZGRyZXNzOiBmdW5jdGlvbiB0ZXpvc0dldEFkZHJlc3MocGFyYW1zKSB7XG4gICAgdmFyIHVzZUV2ZW50TGlzdGVuZXIgPSBfbm9kZS5ldmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudChfY29uc3RhbnRzLlVJLkFERFJFU1NfVkFMSURBVElPTikgPiAwO1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ3Rlem9zR2V0QWRkcmVzcydcbiAgICB9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgdXNlRXZlbnRMaXN0ZW5lcjogdXNlRXZlbnRMaXN0ZW5lclxuICAgIH0pKTtcbiAgfSxcbiAgdGV6b3NHZXRQdWJsaWNLZXk6IGZ1bmN0aW9uIHRlem9zR2V0UHVibGljS2V5KHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICd0ZXpvc0dldFB1YmxpY0tleSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgdGV6b3NTaWduVHJhbnNhY3Rpb246IGZ1bmN0aW9uIHRlem9zU2lnblRyYW5zYWN0aW9uKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICd0ZXpvc1NpZ25UcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZW9zR2V0UHVibGljS2V5OiBmdW5jdGlvbiBlb3NHZXRQdWJsaWNLZXkocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2Vvc0dldFB1YmxpY0tleSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZW9zU2lnblRyYW5zYWN0aW9uOiBmdW5jdGlvbiBlb3NTaWduVHJhbnNhY3Rpb24ocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2Vvc1NpZ25UcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgYmluYW5jZUdldEFkZHJlc3M6IGZ1bmN0aW9uIGJpbmFuY2VHZXRBZGRyZXNzKHBhcmFtcykge1xuICAgIHZhciB1c2VFdmVudExpc3RlbmVyID0gX25vZGUuZXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQoX2NvbnN0YW50cy5VSS5BRERSRVNTX1ZBTElEQVRJT04pID4gMDtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdiaW5hbmNlR2V0QWRkcmVzcydcbiAgICB9LCBwYXJhbXMpLCB7fSwge1xuICAgICAgdXNlRXZlbnRMaXN0ZW5lcjogdXNlRXZlbnRMaXN0ZW5lclxuICAgIH0pKTtcbiAgfSxcbiAgYmluYW5jZUdldFB1YmxpY0tleTogZnVuY3Rpb24gYmluYW5jZUdldFB1YmxpY0tleShwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnYmluYW5jZUdldFB1YmxpY0tleSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgYmluYW5jZVNpZ25UcmFuc2FjdGlvbjogZnVuY3Rpb24gYmluYW5jZVNpZ25UcmFuc2FjdGlvbihwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnYmluYW5jZVNpZ25UcmFuc2FjdGlvbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgdmVyaWZ5TWVzc2FnZTogZnVuY3Rpb24gdmVyaWZ5TWVzc2FnZShwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAndmVyaWZ5TWVzc2FnZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgcmVzZXREZXZpY2U6IGZ1bmN0aW9uIHJlc2V0RGV2aWNlKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdyZXNldERldmljZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgd2lwZURldmljZTogZnVuY3Rpb24gd2lwZURldmljZShwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnd2lwZURldmljZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgYXBwbHlGbGFnczogZnVuY3Rpb24gYXBwbHlGbGFncyhwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnYXBwbHlGbGFncydcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgYXBwbHlTZXR0aW5nczogZnVuY3Rpb24gYXBwbHlTZXR0aW5ncyhwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9ub2RlLmNhbGwpKF9vYmplY3RTcHJlYWQoe1xuICAgICAgbWV0aG9kOiAnYXBwbHlTZXR0aW5ncydcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgYmFja3VwRGV2aWNlOiBmdW5jdGlvbiBiYWNrdXBEZXZpY2UocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2JhY2t1cERldmljZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgY2hhbmdlUGluOiBmdW5jdGlvbiBjaGFuZ2VQaW4ocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ2NoYW5nZVBpbidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZmlybXdhcmVVcGRhdGU6IGZ1bmN0aW9uIGZpcm13YXJlVXBkYXRlKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdmaXJtd2FyZVVwZGF0ZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgcmVjb3ZlcnlEZXZpY2U6IGZ1bmN0aW9uIHJlY292ZXJ5RGV2aWNlKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdyZWNvdmVyeURldmljZSdcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZ2V0Q29pbkluZm86IGZ1bmN0aW9uIGdldENvaW5JbmZvKHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX25vZGUuY2FsbCkoX29iamVjdFNwcmVhZCh7XG4gICAgICBtZXRob2Q6ICdnZXRDb2luSW5mbydcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgcmVib290VG9Cb290bG9hZGVyOiBmdW5jdGlvbiByZWJvb3RUb0Jvb3Rsb2FkZXIocGFyYW1zKSB7XG4gICAgcmV0dXJuICgwLCBfbm9kZS5jYWxsKShfb2JqZWN0U3ByZWFkKHtcbiAgICAgIG1ldGhvZDogJ3JlYm9vdFRvQm9vdGxvYWRlcidcbiAgICB9LCBwYXJhbXMpKTtcbiAgfSxcbiAgZGlzcG9zZTogX25vZGUuZGlzcG9zZSxcbiAgY2FuY2VsOiBfbm9kZS5jYW5jZWwsXG4gIHJlbmRlcldlYlVTQkJ1dHRvbjogX25vZGUucmVuZGVyV2ViVVNCQnV0dG9uLFxuICBkaXNhYmxlV2ViVVNCOiBfbm9kZS5kaXNhYmxlV2ViVVNCXG59O1xudmFyIF9kZWZhdWx0ID0gVHJlem9yQ29ubmVjdDtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5CbG9ja2NoYWluTWVzc2FnZSA9IGV4cG9ydHMuUmVzcG9uc2VNZXNzYWdlID0gZXhwb3J0cy5UcmFuc3BvcnRNZXNzYWdlID0gZXhwb3J0cy5EZXZpY2VNZXNzYWdlID0gZXhwb3J0cy5VaU1lc3NhZ2UgPSB2b2lkIDA7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eVwiKSk7XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgeyBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSk7IH0ga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOyB9IHJldHVybiBrZXlzOyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpZiAoaSAlIDIpIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7ICgwLCBfZGVmaW5lUHJvcGVydHkyW1wiZGVmYXVsdFwiXSkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIFVpTWVzc2FnZSA9IGZ1bmN0aW9uIFVpTWVzc2FnZSh0eXBlLCBwYXlsb2FkKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnQ6IF9jb25zdGFudHMuVUlfRVZFTlQsXG4gICAgdHlwZTogdHlwZSxcbiAgICBwYXlsb2FkOiBwYXlsb2FkXG4gIH07XG59O1xuXG5leHBvcnRzLlVpTWVzc2FnZSA9IFVpTWVzc2FnZTtcblxudmFyIERldmljZU1lc3NhZ2UgPSBmdW5jdGlvbiBEZXZpY2VNZXNzYWdlKHR5cGUsIHBheWxvYWQpIHtcbiAgcmV0dXJuIHtcbiAgICBldmVudDogX2NvbnN0YW50cy5ERVZJQ0VfRVZFTlQsXG4gICAgdHlwZTogdHlwZSxcbiAgICBwYXlsb2FkOiBwYXlsb2FkXG4gIH07XG59O1xuXG5leHBvcnRzLkRldmljZU1lc3NhZ2UgPSBEZXZpY2VNZXNzYWdlO1xuXG52YXIgVHJhbnNwb3J0TWVzc2FnZSA9IGZ1bmN0aW9uIFRyYW5zcG9ydE1lc3NhZ2UodHlwZSwgcGF5bG9hZCkge1xuICByZXR1cm4ge1xuICAgIGV2ZW50OiBfY29uc3RhbnRzLlRSQU5TUE9SVF9FVkVOVCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIC8vIGNvbnZlcnQgRXJyb3IvVHlwZUVycm9yIG9iamVjdCBpbnRvIHBheWxvYWQgZXJyb3IgdHlwZSAoRXJyb3Igb2JqZWN0L2NsYXNzIGlzIGNvbnZlcnRlZCB0byBzdHJpbmcgd2hpbGUgc2VudCB2aWEgcG9zdE1lc3NhZ2UpXG4gICAgcGF5bG9hZDogcGF5bG9hZC5lcnJvciA/IF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgcGF5bG9hZCksIHt9LCB7XG4gICAgICBlcnJvcjogcGF5bG9hZC5lcnJvci5tZXNzYWdlLFxuICAgICAgY29kZTogcGF5bG9hZC5lcnJvci5jb2RlXG4gICAgfSkgOiBwYXlsb2FkXG4gIH07XG59O1xuXG5leHBvcnRzLlRyYW5zcG9ydE1lc3NhZ2UgPSBUcmFuc3BvcnRNZXNzYWdlO1xuXG52YXIgUmVzcG9uc2VNZXNzYWdlID0gZnVuY3Rpb24gUmVzcG9uc2VNZXNzYWdlKGlkLCBzdWNjZXNzLCBwYXlsb2FkKSB7XG4gIGlmIChwYXlsb2FkID09PSB2b2lkIDApIHtcbiAgICBwYXlsb2FkID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXZlbnQ6IF9jb25zdGFudHMuUkVTUE9OU0VfRVZFTlQsXG4gICAgdHlwZTogX2NvbnN0YW50cy5SRVNQT05TRV9FVkVOVCxcbiAgICBpZDogaWQsXG4gICAgc3VjY2Vzczogc3VjY2VzcyxcbiAgICAvLyBjb252ZXJ0IEVycm9yL1R5cGVFcnJvciBvYmplY3QgaW50byBwYXlsb2FkIGVycm9yIHR5cGUgKEVycm9yIG9iamVjdC9jbGFzcyBpcyBjb252ZXJ0ZWQgdG8gc3RyaW5nIHdoaWxlIHNlbnQgdmlhIHBvc3RNZXNzYWdlKVxuICAgIHBheWxvYWQ6IHN1Y2Nlc3MgPyBwYXlsb2FkIDoge1xuICAgICAgZXJyb3I6IHBheWxvYWQuZXJyb3IubWVzc2FnZSxcbiAgICAgIGNvZGU6IHBheWxvYWQuZXJyb3IuY29kZVxuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuUmVzcG9uc2VNZXNzYWdlID0gUmVzcG9uc2VNZXNzYWdlO1xuXG52YXIgQmxvY2tjaGFpbk1lc3NhZ2UgPSBmdW5jdGlvbiBCbG9ja2NoYWluTWVzc2FnZSh0eXBlLCBwYXlsb2FkKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnQ6IF9jb25zdGFudHMuQkxPQ0tDSEFJTl9FVkVOVCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIHBheWxvYWQ6IHBheWxvYWRcbiAgfTtcbn07XG5cbmV4cG9ydHMuQmxvY2tjaGFpbk1lc3NhZ2UgPSBCbG9ja2NoYWluTWVzc2FnZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZXJyb3JNZXNzYWdlID0gZXhwb3J0cy5wYXJzZU1lc3NhZ2UgPSB2b2lkIDA7XG5cbi8vIHBhcnNlIE1lc3NhZ2VFdmVudCAuZGF0YSBpbnRvIENvcmVNZXNzYWdlXG52YXIgcGFyc2VNZXNzYWdlID0gZnVuY3Rpb24gcGFyc2VNZXNzYWdlKG1lc3NhZ2VEYXRhKSB7XG4gIHZhciBtZXNzYWdlID0ge1xuICAgIGV2ZW50OiBtZXNzYWdlRGF0YS5ldmVudCxcbiAgICB0eXBlOiBtZXNzYWdlRGF0YS50eXBlLFxuICAgIHBheWxvYWQ6IG1lc3NhZ2VEYXRhLnBheWxvYWRcbiAgfTtcblxuICBpZiAodHlwZW9mIG1lc3NhZ2VEYXRhLmlkID09PSAnbnVtYmVyJykge1xuICAgIG1lc3NhZ2UuaWQgPSBtZXNzYWdlRGF0YS5pZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbWVzc2FnZURhdGEuc3VjY2VzcyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgbWVzc2FnZS5zdWNjZXNzID0gbWVzc2FnZURhdGEuc3VjY2VzcztcbiAgfVxuXG4gIHJldHVybiBtZXNzYWdlO1xufTsgLy8gY29tbW9uIHJlc3BvbnNlIHVzZWQgc3RyYWlnaHQgZnJvbSBucG0gaW5kZXggKG5vdCBmcm9tIENvcmUpXG5cblxuZXhwb3J0cy5wYXJzZU1lc3NhZ2UgPSBwYXJzZU1lc3NhZ2U7XG5cbnZhciBlcnJvck1lc3NhZ2UgPSBmdW5jdGlvbiBlcnJvck1lc3NhZ2UoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSxcbiAgICAgIGNvZGU6IGVycm9yLmNvZGVcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eVwiKSk7XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHsgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyB9IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW5yZXNvbHZlZFxudmFyIHNpZ1V0aWwgPSByZXF1aXJlKCdAbWV0YW1hc2svZXRoLXNpZy11dGlsJyk7IC8vIFNhbml0aXphdGlvbiBpcyB1c2VkIGZvciBUMSBhcyBldGgtc2lnLXV0aWwgZG9lcyBub3Qgc3VwcG9ydCBCaWdJbnRcblxuXG5mdW5jdGlvbiBzYW5pdGl6ZURhdGEoZGF0YSkge1xuICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRhKSkge1xuICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICB7XG4gICAgICAgIHZhciBlbnRyaWVzID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgcmV0dXJuIFtrLCBzYW5pdGl6ZURhdGEoZGF0YVtrXSldO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhlbnRyaWVzKTtcbiAgICAgIH1cblxuICAgIGNhc2UgJ1tvYmplY3QgQXJyYXldJzpcbiAgICAgIHJldHVybiBkYXRhLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gc2FuaXRpemVEYXRhKHYpO1xuICAgICAgfSk7XG5cbiAgICBjYXNlICdbb2JqZWN0IEJpZ0ludF0nOlxuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuXG52YXIgdHJhbnNmb3JtVHlwZWREYXRhID0gZnVuY3Rpb24gdHJhbnNmb3JtVHlwZWREYXRhKGRhdGEsIG1ldGFtYXNrX3Y0X2NvbXBhdCkge1xuICBpZiAoIW1ldGFtYXNrX3Y0X2NvbXBhdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJlem9yOiBPbmx5IHZlcnNpb24gNCBvZiB0eXBlZCBkYXRhIHNpZ25pbmcgaXMgc3VwcG9ydGVkJyk7XG4gIH1cblxuICB2YXIgdmVyc2lvbiA9IHNpZ1V0aWwuU2lnblR5cGVkRGF0YVZlcnNpb24uVjQ7XG5cbiAgdmFyIF9zaWdVdGlsJFR5cGVkRGF0YVV0aSA9IHNpZ1V0aWwuVHlwZWREYXRhVXRpbHMuc2FuaXRpemVEYXRhKGRhdGEpLFxuICAgICAgdHlwZXMgPSBfc2lnVXRpbCRUeXBlZERhdGFVdGkudHlwZXMsXG4gICAgICBwcmltYXJ5VHlwZSA9IF9zaWdVdGlsJFR5cGVkRGF0YVV0aS5wcmltYXJ5VHlwZSxcbiAgICAgIGRvbWFpbiA9IF9zaWdVdGlsJFR5cGVkRGF0YVV0aS5kb21haW4sXG4gICAgICBtZXNzYWdlID0gX3NpZ1V0aWwkVHlwZWREYXRhVXRpLm1lc3NhZ2U7XG5cbiAgdmFyIGRvbWFpblNlcGFyYXRvckhhc2ggPSBzaWdVdGlsLlR5cGVkRGF0YVV0aWxzLmhhc2hTdHJ1Y3QoJ0VJUDcxMkRvbWFpbicsIHNhbml0aXplRGF0YShkb21haW4pLCB0eXBlcywgdmVyc2lvbikudG9TdHJpbmcoJ2hleCcpO1xuICB2YXIgbWVzc2FnZUhhc2ggPSBzaWdVdGlsLlR5cGVkRGF0YVV0aWxzLmhhc2hTdHJ1Y3QocHJpbWFyeVR5cGUsIHNhbml0aXplRGF0YShtZXNzYWdlKSwgdHlwZXMsIHZlcnNpb24pLnRvU3RyaW5nKCdoZXgnKTtcbiAgcmV0dXJuIF9vYmplY3RTcHJlYWQoe1xuICAgIGRvbWFpbl9zZXBhcmF0b3JfaGFzaDogZG9tYWluU2VwYXJhdG9ySGFzaCxcbiAgICBtZXNzYWdlX2hhc2g6IG1lc3NhZ2VIYXNoXG4gIH0sIGRhdGEpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1UeXBlZERhdGE7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG52YXIgX2Fzc2VydFRoaXNJbml0aWFsaXplZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKSk7XG5cbnZhciBfaW5oZXJpdHNMb29zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2VcIikpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIikpO1xuXG52YXIgX2V2ZW50cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImV2ZW50c1wiKSk7XG5cbnZhciBQT1BVUCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuLi9jb25zdGFudHMvcG9wdXBcIikpO1xuXG52YXIgSUZSQU1FID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4uL2NvbnN0YW50cy9pZnJhbWVcIikpO1xuXG52YXIgVUkgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vY29uc3RhbnRzL3VpXCIpKTtcblxudmFyIF9zaG93UG9wdXBSZXF1ZXN0ID0gcmVxdWlyZShcIi4vc2hvd1BvcHVwUmVxdWVzdFwiKTtcblxudmFyIF9uZXR3b3JrVXRpbHMgPSByZXF1aXJlKFwiLi4vZW52L2Jyb3dzZXIvbmV0d29ya1V0aWxzXCIpO1xuXG52YXIgX2RlZmVycmVkID0gcmVxdWlyZShcIi4uL3V0aWxzL2RlZmVycmVkXCIpO1xuXG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGVCYWJlbEludGVyb3AgPSBuZXcgV2Vha01hcCgpOyB2YXIgY2FjaGVOb2RlSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHJldHVybiAoX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKSB7IHJldHVybiBub2RlSW50ZXJvcCA/IGNhY2hlTm9kZUludGVyb3AgOiBjYWNoZUJhYmVsSW50ZXJvcDsgfSkobm9kZUludGVyb3ApOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaiwgbm9kZUludGVyb3ApIHsgaWYgKCFub2RlSW50ZXJvcCAmJiBvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7IHJldHVybiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfSB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApOyBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHsgcmV0dXJuIGNhY2hlLmdldChvYmopOyB9IHZhciBuZXdPYmogPSB7fTsgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChrZXkgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHsgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7IGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTsgfSBlbHNlIHsgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IH0gbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajsgaWYgKGNhY2hlKSB7IGNhY2hlLnNldChvYmosIG5ld09iaik7IH0gcmV0dXJuIG5ld09iajsgfVxuXG4vLyBjb25zdCBQT1BVUF9SRVFVRVNUX1RJTUVPVVQgPSA2MDI7XG52YXIgUE9QVVBfUkVRVUVTVF9USU1FT1VUID0gODUwO1xudmFyIFBPUFVQX0NMT1NFX0lOVEVSVkFMID0gNTAwO1xudmFyIFBPUFVQX09QRU5fVElNRU9VVCA9IDMwMDA7XG5cbnZhciBQb3B1cE1hbmFnZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIpIHtcbiAgKDAsIF9pbmhlcml0c0xvb3NlMltcImRlZmF1bHRcIl0pKFBvcHVwTWFuYWdlciwgX0V2ZW50RW1pdHRlcik7XG5cbiAgLy8gV2luZG93XG4gIGZ1bmN0aW9uIFBvcHVwTWFuYWdlcihzZXR0aW5ncykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX0V2ZW50RW1pdHRlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcyksIFwicmVxdWVzdFRpbWVvdXRcIiwgMCk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcyksIFwiY2xvc2VJbnRlcnZhbFwiLCAwKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJleHRlbnNpb25UYWJJZFwiLCAwKTtcbiAgICBfdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIF90aGlzLm9yaWdpbiA9ICgwLCBfbmV0d29ya1V0aWxzLmdldE9yaWdpbikoc2V0dGluZ3MucG9wdXBTcmMpO1xuICAgIF90aGlzLmhhbmRsZU1lc3NhZ2UgPSBfdGhpcy5oYW5kbGVNZXNzYWdlLmJpbmQoKDAsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyW1wiZGVmYXVsdFwiXSkoX3RoaXMpKTtcbiAgICBfdGhpcy5pZnJhbWVIYW5kc2hha2UgPSAoMCwgX2RlZmVycmVkLmNyZWF0ZSkoSUZSQU1FLkxPQURFRCk7XG5cbiAgICBpZiAoX3RoaXMuc2V0dGluZ3MuZW52ID09PSAnd2ViZXh0ZW5zaW9uJykge1xuICAgICAgX3RoaXMuaGFuZGxlRXh0ZW5zaW9uQ29ubmVjdCA9IF90aGlzLmhhbmRsZUV4dGVuc2lvbkNvbm5lY3QuYmluZCgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcykpO1xuICAgICAgX3RoaXMuaGFuZGxlRXh0ZW5zaW9uTWVzc2FnZSA9IF90aGlzLmhhbmRsZUV4dGVuc2lvbk1lc3NhZ2UuYmluZCgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcykpOyAvLyAkRmxvd0lzc3VlIGNocm9tZSBub3QgZGVjbGFyZWQgb3V0c2lkZVxuXG4gICAgICBjaHJvbWUucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoX3RoaXMuaGFuZGxlRXh0ZW5zaW9uQ29ubmVjdCk7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBfdGhpcy5oYW5kbGVNZXNzYWdlLCBmYWxzZSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFBvcHVwTWFuYWdlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGxhenlMb2FkKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBpZiAobGF6eUxvYWQgPT09IHZvaWQgMCkge1xuICAgICAgbGF6eUxvYWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBwb3B1cCByZXF1ZXN0XG4gICAgLy8gVE9ETzogaWUgLSBvcGVuIGltbWVkaWF0ZWx5IGFuZCBoaWRlIGl0IGJ1dCBwb3N0IGhhbmRzaGFrZSBhZnRlciB0aW1lb3V0XG4gICAgLy8gYnJpbmcgcG9wdXAgd2luZG93IHRvIGZyb250XG4gICAgaWYgKHRoaXMubG9ja2VkKSB7XG4gICAgICBpZiAodGhpcy5fd2luZG93KSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVudiA9PT0gJ3dlYmV4dGVuc2lvbicpIHtcbiAgICAgICAgICAvLyAkRmxvd0lzc3VlIGNocm9tZSBub3QgZGVjbGFyZWQgb3V0c2lkZVxuICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZSh0aGlzLl93aW5kb3cuaWQsIHtcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3dpbmRvdy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgb3BlbkZuID0gdGhpcy5vcGVuLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2NrZWQgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnN1cHBvcnRlZEJyb3dzZXIpIHtcbiAgICAgIG9wZW5GbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGltZW91dCA9IGxhenlMb2FkIHx8IHRoaXMuc2V0dGluZ3MuZW52ID09PSAnd2ViZXh0ZW5zaW9uJyA/IDEgOiBQT1BVUF9SRVFVRVNUX1RJTUVPVVQ7XG4gICAgICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIucmVxdWVzdFRpbWVvdXQgPSAwO1xuICAgICAgICBvcGVuRm4obGF6eUxvYWQpO1xuICAgICAgfSwgdGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9O1xuXG4gIF9wcm90by51bmxvY2sgPSBmdW5jdGlvbiB1bmxvY2soKSB7XG4gICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcbiAgfTtcblxuICBfcHJvdG8ub3BlbiA9IGZ1bmN0aW9uIG9wZW4obGF6eUxvYWQpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBzcmMgPSB0aGlzLnNldHRpbmdzLnBvcHVwU3JjO1xuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnN1cHBvcnRlZEJyb3dzZXIpIHtcbiAgICAgIHRoaXMub3BlbldyYXBwZXIoc3JjICsgXCIjdW5zdXBwb3J0ZWRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wb3B1cFByb21pc2UgPSAoMCwgX2RlZmVycmVkLmNyZWF0ZSkoUE9QVVAuTE9BREVEKTtcbiAgICB0aGlzLm9wZW5XcmFwcGVyKGxhenlMb2FkID8gc3JjICsgXCIjbG9hZGluZ1wiIDogc3JjKTtcbiAgICB0aGlzLmNsb3NlSW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFfdGhpczMuX3dpbmRvdykgcmV0dXJuO1xuXG4gICAgICBpZiAoX3RoaXMzLnNldHRpbmdzLmVudiA9PT0gJ3dlYmV4dGVuc2lvbicpIHtcbiAgICAgICAgLy8gJEZsb3dJc3N1ZSBjaHJvbWUgbm90IGRlY2xhcmVkIG91dHNpZGVcbiAgICAgICAgY2hyb21lLnRhYnMuZ2V0KF90aGlzMy5fd2luZG93LmlkLCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgICAgaWYgKCF0YWIpIHtcbiAgICAgICAgICAgIF90aGlzMy5jbG9zZSgpO1xuXG4gICAgICAgICAgICBfdGhpczMuZW1pdChQT1BVUC5DTE9TRUQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKF90aGlzMy5fd2luZG93LmNsb3NlZCkge1xuICAgICAgICBfdGhpczMuY2xvc2UoKTtcblxuICAgICAgICBfdGhpczMuZW1pdChQT1BVUC5DTE9TRUQpO1xuICAgICAgfVxuICAgIH0sIFBPUFVQX0NMT1NFX0lOVEVSVkFMKTsgLy8gb3BlbiB0aW1lb3V0IHdpbGwgYmUgY2FuY2VsbGVkIGJ5IFBPUFVQLkJPT1RTVFJBUCBtZXNzYWdlXG5cbiAgICB0aGlzLm9wZW5UaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMzLmNsb3NlKCk7XG5cbiAgICAgICgwLCBfc2hvd1BvcHVwUmVxdWVzdC5zaG93UG9wdXBSZXF1ZXN0KShfdGhpczMub3Blbi5iaW5kKF90aGlzMyksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMzLmVtaXQoUE9QVVAuQ0xPU0VEKTtcbiAgICAgIH0pO1xuICAgIH0sIFBPUFVQX09QRU5fVElNRU9VVCk7XG4gIH07XG5cbiAgX3Byb3RvLm9wZW5XcmFwcGVyID0gZnVuY3Rpb24gb3BlbldyYXBwZXIodXJsKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5lbnYgPT09ICd3ZWJleHRlbnNpb24nKSB7XG4gICAgICAvLyAkRmxvd0lzc3VlIGNocm9tZSBub3QgZGVjbGFyZWQgb3V0c2lkZVxuICAgICAgY2hyb21lLndpbmRvd3MuZ2V0Q3VycmVudChudWxsLCBmdW5jdGlvbiAoY3VycmVudFdpbmRvdykge1xuICAgICAgICAvLyBSZXF1ZXN0IGNvbWluZyBmcm9tIGV4dGVuc2lvbiBwb3B1cCxcbiAgICAgICAgLy8gY3JlYXRlIG5ldyB3aW5kb3cgYWJvdmUgaW5zdGVhZCBvZiBvcGVuaW5nIG5ldyB0YWJcbiAgICAgICAgaWYgKGN1cnJlbnRXaW5kb3cudHlwZSAhPT0gJ25vcm1hbCcpIHtcbiAgICAgICAgICAvLyAkRmxvd0lzc3VlIGNocm9tZSBub3QgZGVjbGFyZWQgb3V0c2lkZVxuICAgICAgICAgIGNocm9tZS53aW5kb3dzLmNyZWF0ZSh7XG4gICAgICAgICAgICB1cmw6IHVybFxuICAgICAgICAgIH0sIGZ1bmN0aW9uIChuZXdXaW5kb3cpIHtcbiAgICAgICAgICAgIC8vICRGbG93SXNzdWUgY2hyb21lIG5vdCBkZWNsYXJlZCBvdXRzaWRlXG4gICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7XG4gICAgICAgICAgICAgIHdpbmRvd0lkOiBuZXdXaW5kb3cuaWQsXG4gICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgICAgICAgIF90aGlzNC5fd2luZG93ID0gdGFic1swXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vICRGbG93SXNzdWUgY2hyb21lIG5vdCBkZWNsYXJlZCBvdXRzaWRlXG4gICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgICAgICAgY3VycmVudFdpbmRvdzogdHJ1ZSxcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZVxuICAgICAgICAgIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgICAgICBfdGhpczQuZXh0ZW5zaW9uVGFiSWQgPSB0YWJzWzBdLmlkOyAvLyAkRmxvd0lzc3VlIGNocm9tZSBub3QgZGVjbGFyZWQgb3V0c2lkZVxuXG4gICAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoe1xuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgaW5kZXg6IHRhYnNbMF0uaW5kZXggKyAxXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgICAgICAgIF90aGlzNC5fd2luZG93ID0gdGFiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5lbnYgPT09ICdlbGVjdHJvbicpIHtcbiAgICAgIHRoaXMuX3dpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgJ21vZGFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3dpbmRvdyA9IHdpbmRvdy5vcGVuKCcnLCAnX2JsYW5rJyk7XG5cbiAgICAgIGlmICh0aGlzLl93aW5kb3cpIHtcbiAgICAgICAgdGhpcy5fd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7IC8vIG90aGVyd2lzZSBhbmRyb2lkL2Nocm9tZSBsb29zZSB3aW5kb3cub3BlbmVyIHJlZmVyZW5jZVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaGFuZGxlRXh0ZW5zaW9uQ29ubmVjdCA9IGZ1bmN0aW9uIGhhbmRsZUV4dGVuc2lvbkNvbm5lY3QocG9ydCkge1xuICAgIGlmIChwb3J0Lm5hbWUgIT09ICd0cmV6b3ItY29ubmVjdCcpIHJldHVybjtcblxuICAgIGlmICghdGhpcy5fd2luZG93IHx8IHRoaXMuX3dpbmRvdyAmJiB0aGlzLl93aW5kb3cuaWQgIT09IHBvcnQuc2VuZGVyLnRhYi5pZCkge1xuICAgICAgcG9ydC5kaXNjb25uZWN0KCk7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBzaW5jZSBQT1BVUC5CT09UU1RSQVAgd2lsbCBub3QgYmUgaGFuZGxlZCBieSBcImhhbmRsZU1lc3NhZ2VcIiB3ZSBuZWVkIHRvIHRocmVhdCBcImNvbnRlbnQtc2NyaXB0XCIgY29ubmVjdGlvbiBhcyB0aGUgc2FtZSBldmVudFxuICAgIC8vIHBvcHVwIGlzIG9wZW5lZCBwcm9wZXJseSwgbm93IHdhaXQgZm9yIFBPUFVQLkxPQURFRCBtZXNzYWdlIChpbiB0aGlzIGNhc2UgaGFuZGxlZCBieSBcImhhbmRsZUV4dGVuc2lvbk1lc3NhZ2VcIilcblxuXG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLm9wZW5UaW1lb3V0KTtcbiAgICB0aGlzLmV4dGVuc2lvblBvcnQgPSBwb3J0OyAvLyAkRmxvd0lzc3VlIG5lZWQgdG8gdXBkYXRlIENocm9tZVBvcnQgZGVmaW5pdGlvblxuXG4gICAgdGhpcy5leHRlbnNpb25Qb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcih0aGlzLmhhbmRsZUV4dGVuc2lvbk1lc3NhZ2UpO1xuICB9O1xuXG4gIF9wcm90by5oYW5kbGVFeHRlbnNpb25NZXNzYWdlID0gZnVuY3Rpb24gaGFuZGxlRXh0ZW5zaW9uTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMuZXh0ZW5zaW9uUG9ydCkgcmV0dXJuO1xuICAgIHZhciBwb3J0ID0gdGhpcy5leHRlbnNpb25Qb3J0O1xuICAgIHZhciBkYXRhID0gbWVzc2FnZS5kYXRhO1xuICAgIGlmICghZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpIHJldHVybjtcblxuICAgIGlmIChkYXRhLnR5cGUgPT09IFBPUFVQLkVSUk9SKSB7XG4gICAgICAvLyBoYW5kbGUgcG9wdXAgZXJyb3JcbiAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBkYXRhLnBheWxvYWQgJiYgdHlwZW9mIGRhdGEucGF5bG9hZC5lcnJvciA9PT0gJ3N0cmluZycgPyBkYXRhLnBheWxvYWQuZXJyb3IgOiBudWxsO1xuICAgICAgdGhpcy5lbWl0KFBPUFVQLkNMT1NFRCwgZXJyb3JNZXNzYWdlID8gXCJQb3B1cCBlcnJvcjogXCIgKyBlcnJvck1lc3NhZ2UgOiBudWxsKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gUE9QVVAuTE9BREVEKSB7XG4gICAgICBpZiAodGhpcy5wb3B1cFByb21pc2UpIHtcbiAgICAgICAgdGhpcy5wb3B1cFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmlmcmFtZUhhbmRzaGFrZS5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKHVzZUJyb2FkY2FzdENoYW5uZWwpIHtcbiAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogUE9QVVAuSU5JVCxcbiAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBzZXR0aW5nczogX3RoaXM1LnNldHRpbmdzLFxuICAgICAgICAgICAgdXNlQnJvYWRjYXN0Q2hhbm5lbDogdXNlQnJvYWRjYXN0Q2hhbm5lbFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gUE9QVVAuRVhURU5TSU9OX1VTQl9QRVJNSVNTSU9OUykge1xuICAgICAgLy8gJEZsb3dJc3N1ZSBjaHJvbWUgbm90IGRlY2xhcmVkIG91dHNpZGVcbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHtcbiAgICAgICAgY3VycmVudFdpbmRvdzogdHJ1ZSxcbiAgICAgICAgYWN0aXZlOiB0cnVlXG4gICAgICB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICAvLyAkRmxvd0lzc3VlIGNocm9tZSBub3QgZGVjbGFyZWQgb3V0c2lkZVxuICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoe1xuICAgICAgICAgIHVybDogJ3RyZXpvci11c2ItcGVybWlzc2lvbnMuaHRtbCcsXG4gICAgICAgICAgaW5kZXg6IHRhYnNbMF0uaW5kZXggKyAxXG4gICAgICAgIH0sIGZ1bmN0aW9uIChfdGFiKSB7Ly8gZG8gbm90aGluZ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBQT1BVUC5DTE9TRV9XSU5ET1cpIHtcbiAgICAgIHRoaXMuZW1pdChQT1BVUC5DTE9TRUQpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaGFuZGxlTWVzc2FnZSA9IGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UobWVzc2FnZSkge1xuICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgLy8gaWdub3JlIG1lc3NhZ2VzIGZyb20gZG9tYWluIG90aGVyIHRoZW4gcG9wdXAgb3JpZ2luIGFuZCB3aXRob3V0IGRhdGFcbiAgICAvLyBjb25zdCBkYXRhOiBDb3JlTWVzc2FnZSA9IG1lc3NhZ2UuZGF0YTtcbiAgICB2YXIgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcbiAgICBpZiAoKDAsIF9uZXR3b3JrVXRpbHMuZ2V0T3JpZ2luKShtZXNzYWdlLm9yaWdpbikgIT09IHRoaXMub3JpZ2luIHx8ICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JykgcmV0dXJuO1xuXG4gICAgaWYgKGRhdGEudHlwZSA9PT0gSUZSQU1FLkxPQURFRCkge1xuICAgICAgdmFyIHVzZUJyb2FkY2FzdENoYW5uZWwgPSBkYXRhLnBheWxvYWQgJiYgdHlwZW9mIGRhdGEucGF5bG9hZC51c2VCcm9hZGNhc3RDaGFubmVsID09PSAnYm9vbGVhbicgPyBkYXRhLnBheWxvYWQudXNlQnJvYWRjYXN0Q2hhbm5lbCA6IGZhbHNlO1xuICAgICAgdGhpcy5pZnJhbWVIYW5kc2hha2UucmVzb2x2ZSh1c2VCcm9hZGNhc3RDaGFubmVsKTtcbiAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gUE9QVVAuQk9PVFNUUkFQKSB7XG4gICAgICAvLyBwb3B1cCBpcyBvcGVuZWQgcHJvcGVybHksIG5vdyB3YWl0IGZvciBQT1BVUC5MT0FERUQgbWVzc2FnZVxuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLm9wZW5UaW1lb3V0KTtcbiAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gUE9QVVAuRVJST1IgJiYgdGhpcy5fd2luZG93KSB7XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZGF0YS5wYXlsb2FkICYmIHR5cGVvZiBkYXRhLnBheWxvYWQuZXJyb3IgPT09ICdzdHJpbmcnID8gZGF0YS5wYXlsb2FkLmVycm9yIDogbnVsbDtcbiAgICAgIHRoaXMuZW1pdChQT1BVUC5DTE9TRUQsIGVycm9yTWVzc2FnZSA/IFwiUG9wdXAgZXJyb3I6IFwiICsgZXJyb3JNZXNzYWdlIDogbnVsbCk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09IFBPUFVQLkxPQURFRCkge1xuICAgICAgaWYgKHRoaXMucG9wdXBQcm9taXNlKSB7XG4gICAgICAgIHRoaXMucG9wdXBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH0gLy8gcG9wdXAgaXMgc3VjY2Vzc2Z1bGx5IGxvYWRlZFxuXG5cbiAgICAgIHRoaXMuaWZyYW1lSGFuZHNoYWtlLnByb21pc2UudGhlbihmdW5jdGlvbiAodXNlQnJvYWRjYXN0Q2hhbm5lbCkge1xuICAgICAgICBfdGhpczYuX3dpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogUE9QVVAuSU5JVCxcbiAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBzZXR0aW5nczogX3RoaXM2LnNldHRpbmdzLFxuICAgICAgICAgICAgdXNlQnJvYWRjYXN0Q2hhbm5lbDogdXNlQnJvYWRjYXN0Q2hhbm5lbFxuICAgICAgICAgIH1cbiAgICAgICAgfSwgX3RoaXM2Lm9yaWdpbik7XG4gICAgICB9KTsgLy8gc2VuZCBDb25uZWN0U2V0dGluZ3MgdG8gcG9wdXBcbiAgICAgIC8vIG5vdGUgdGhpcyBzZXR0aW5ncyBhbmQgaWZyYW1lLkNvbm5lY3RTZXR0aW5ncyBjb3VsZCBiZSBkaWZmZXJlbnQgKGVzcGVjaWFsbHk6IG9yaWdpbiwgcG9wdXAsIHdlYnVzYiwgZGVidWcpXG4gICAgICAvLyBub3cgcG9wdXAgaXMgYWJsZSB0byBsb2FkIGFzc2V0c1xuICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBQT1BVUC5DQU5DRUxfUE9QVVBfUkVRVUVTVCB8fCBkYXRhLnR5cGUgPT09IFVJLkNMT1NFX1VJX1dJTkRPVykge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY2xvc2UgPSBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xuICAgIHRoaXMucG9wdXBQcm9taXNlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRoaXMucmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5yZXF1ZXN0VGltZW91dCk7XG4gICAgICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcGVuVGltZW91dCkge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLm9wZW5UaW1lb3V0KTtcbiAgICAgIHRoaXMub3BlblRpbWVvdXQgPSAwO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNsb3NlSW50ZXJ2YWwpIHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuY2xvc2VJbnRlcnZhbCk7XG4gICAgICB0aGlzLmNsb3NlSW50ZXJ2YWwgPSAwO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmV4dGVuc2lvblBvcnQpIHtcbiAgICAgIHRoaXMuZXh0ZW5zaW9uUG9ydC5kaXNjb25uZWN0KCk7XG4gICAgICB0aGlzLmV4dGVuc2lvblBvcnQgPSBudWxsO1xuICAgIH0gLy8gc3dpdGNoIHRvIHByZXZpb3VzbHkgZm9jdXNlZCB0YWJcblxuXG4gICAgaWYgKHRoaXMuZXh0ZW5zaW9uVGFiSWQpIHtcbiAgICAgIC8vICRGbG93SXNzdWUgY2hyb21lIG5vdCBkZWNsYXJlZCBvdXRzaWRlXG4gICAgICBjaHJvbWUudGFicy51cGRhdGUodGhpcy5leHRlbnNpb25UYWJJZCwge1xuICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgdGhpcy5leHRlbnNpb25UYWJJZCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3dpbmRvdykge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZW52ID09PSAnd2ViZXh0ZW5zaW9uJykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgICAgdmFyIF9lID0gY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yOyAvLyAkRmxvd0lzc3VlIGNocm9tZSBub3QgZGVjbGFyZWQgb3V0c2lkZVxuXG4gICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0aGlzLl93aW5kb3cuaWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgICAgICBfZSA9IGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcjtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93aW5kb3cuY2xvc2UoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fd2luZG93ID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnBvc3RNZXNzYWdlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgICB2YXIgX3Bvc3RNZXNzYWdlID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKCAvKiNfX1BVUkVfXyovX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUobWVzc2FnZSkge1xuICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGlmICghKCF0aGlzLl93aW5kb3cgJiYgbWVzc2FnZS50eXBlICE9PSBVSS5SRVFVRVNUX1VJX1dJTkRPVyAmJiB0aGlzLm9wZW5UaW1lb3V0KSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAoMCwgX3Nob3dQb3B1cFJlcXVlc3Quc2hvd1BvcHVwUmVxdWVzdCkodGhpcy5vcGVuLmJpbmQodGhpcyksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpczcuZW1pdChQT1BVUC5DTE9TRUQpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiKTtcblxuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBpZiAoIXRoaXMucG9wdXBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNztcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9wdXBQcm9taXNlLnByb21pc2U7XG5cbiAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgLy8gcG9zdCBtZXNzYWdlIHRvIHBvcHVwIHdpbmRvd1xuICAgICAgICAgICAgICBpZiAodGhpcy5fd2luZG93KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIHRoaXMub3JpZ2luKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBfY2FsbGVlLCB0aGlzKTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBwb3N0TWVzc2FnZShfeCkge1xuICAgICAgcmV0dXJuIF9wb3N0TWVzc2FnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBwb3N0TWVzc2FnZTtcbiAgfSgpO1xuXG4gIHJldHVybiBQb3B1cE1hbmFnZXI7XG59KF9ldmVudHNbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBQb3B1cE1hbmFnZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnNob3dQb3B1cFJlcXVlc3QgPSB2b2lkIDA7XG52YXIgTEFZRVJfSUQgPSAnVHJlem9yQ29ubmVjdEludGVyYWN0aW9uTGF5ZXInO1xudmFyIEhUTUwgPSBcIlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0cmV6b3Jjb25uZWN0LWNvbnRhaW5lclxcXCIgaWQ9XFxcIlwiICsgTEFZRVJfSUQgKyBcIlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0cmV6b3Jjb25uZWN0LXdpbmRvd1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidHJlem9yY29ubmVjdC1oZWFkXFxcIj5cXG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cXFwidHJlem9yY29ubmVjdC1sb2dvXFxcIiB4PVxcXCIwcHhcXFwiIHk9XFxcIjBweFxcXCIgdmlld0JveD1cXFwiMCAwIDE2My43IDQxLjlcXFwiIHdpZHRoPVxcXCI3OHB4XFxcIiBoZWlnaHQ9XFxcIjIwcHhcXFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XFxcInhNaW5ZTWluIG1lZXRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPVxcXCIxMDEuMSwxMi44IDExOC4yLDEyLjggMTE4LjIsMTcuMyAxMDguOSwyOS45IDExOC4yLDI5LjkgMTE4LjIsMzUuMiAxMDEuMSwzNS4yIDEwMS4xLDMwLjcgMTEwLjQsMTguMSAxMDEuMSwxOC4xXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVxcXCJNMTU4LjgsMjYuOWMyLjEtMC44LDQuMy0yLjksNC4zLTYuNmMwLTQuNS0zLjEtNy40LTcuNy03LjRoLTEwLjV2MjIuM2g1Ljh2LTcuNWgyLjJsNC4xLDcuNWg2LjdMMTU4LjgsMjYuOXogTTE1NC43LDIyLjUgaC00VjE4aDRjMS41LDAsMi41LDAuOSwyLjUsMi4yQzE1Ny4yLDIxLjYsMTU2LjIsMjIuNSwxNTQuNywyMi41elxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cXFwiTTEzMC44LDEyLjVjLTYuOCwwLTExLjYsNC45LTExLjYsMTEuNXM0LjksMTEuNSwxMS42LDExLjVzMTEuNy00LjksMTEuNy0xMS41UzEzNy42LDEyLjUsMTMwLjgsMTIuNXogTTEzMC44LDMwLjMgYy0zLjQsMC01LjctMi42LTUuNy02LjNjMC0zLjgsMi4zLTYuMyw1LjctNi4zYzMuNCwwLDUuOCwyLjYsNS44LDYuM0MxMzYuNiwyNy43LDEzNC4yLDMwLjMsMTMwLjgsMzAuM3pcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIHBvaW50cz1cXFwiODIuMSwxMi44IDk4LjMsMTIuOCA5OC4zLDE4IDg3LjksMTggODcuOSwyMS4zIDk4LDIxLjMgOTgsMjYuNCA4Ny45LDI2LjQgODcuOSwzMCA5OC4zLDMwIDk4LjMsMzUuMiA4Mi4xLDM1LjIgXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVxcXCJNMjQuNiw5LjdDMjQuNiw0LjQsMjAsMCwxNC40LDBTNC4yLDQuNCw0LjIsOS43djMuMUgwdjIyLjNoMGwxNC40LDYuN2wxNC40LTYuN2gwVjEyLjloLTQuMlY5Ljd6IE05LjQsOS43IGMwLTIuNSwyLjItNC41LDUtNC41czUsMiw1LDQuNXYzLjFIOS40VjkuN3ogTTIzLDMxLjVsLTguNiw0bC04LjYtNFYxOC4xSDIzVjMxLjV6XFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVxcXCJNNzkuNCwyMC4zYzAtNC41LTMuMS03LjQtNy43LTcuNEg2MS4ydjIyLjNINjd2LTcuNWgyLjJsNC4xLDcuNUg4MGwtNC45LTguM0M3Ny4yLDI2LjEsNzkuNCwyNCw3OS40LDIwLjN6IE03MSwyMi41aC00VjE4IGg0YzEuNSwwLDIuNSwwLjksMi41LDIuMkM3My41LDIxLjYsNzIuNSwyMi41LDcxLDIyLjV6XFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XFxcIjQwLjUsMTIuOCA1OC42LDEyLjggNTguNiwxOC4xIDUyLjQsMTguMSA1Mi40LDM1LjIgNDYuNiwzNS4yIDQ2LjYsMTguMSA0MC41LDE4LjEgXFxcIi8+XFxuICAgICAgICAgICAgICAgIDwvc3ZnPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0cmV6b3Jjb25uZWN0LWNsb3NlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeD1cXFwiMHB4XFxcIiB5PVxcXCIwcHhcXFwiIHZpZXdCb3g9XFxcIjI0IDI0IDYwIDYwXFxcIiB3aWR0aD1cXFwiMjRweFxcXCIgaGVpZ2h0PVxcXCIyNHB4XFxcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVxcXCJ4TWluWU1pbiBtZWV0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz1cXFwic3QwXFxcIiBwb2ludHM9XFxcIjQwLDY3LjkgNDIuMSw3MCA1NSw1Ny4xIDY3LjksNzAgNzAsNjcuOSA1Ny4xLDU1IDcwLDQyLjEgNjcuOSw0MCA1NSw1Mi45IDQyLjEsNDAgNDAsNDIuMSA1Mi45LDU1IFxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInRyZXpvcmNvbm5lY3QtYm9keVxcXCI+XFxuICAgICAgICAgICAgICAgIDxoMz5Qb3B1cCB3YXMgYmxvY2tlZDwvaDM+XFxuICAgICAgICAgICAgICAgIDxwPlBsZWFzZSBjbGljayB0byBcXHUyMDFDQ29udGludWVcXHUyMDFEIHRvIG9wZW4gcG9wdXAgbWFudWFsbHk8L3A+XFxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInRyZXpvcmNvbm5lY3Qtb3BlblxcXCI+Q29udGludWU8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cIjtcblxudmFyIHNob3dQb3B1cFJlcXVlc3QgPSBmdW5jdGlvbiBzaG93UG9wdXBSZXF1ZXN0KG9wZW4sIGNhbmNlbCkge1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoTEFZRVJfSUQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaWQgPSBMQVlFUl9JRDtcbiAgZGl2LmNsYXNzTmFtZSA9ICd0cmV6b3Jjb25uZWN0LWNvbnRhaW5lcic7XG4gIGRpdi5pbm5lckhUTUwgPSBIVE1MO1xuXG4gIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG5cbiAgdmFyIGJ1dHRvbiA9IGRpdi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0cmV6b3Jjb25uZWN0LW9wZW4nKVswXTtcblxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICBvcGVuKCk7XG5cbiAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkaXYpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgY2xvc2UgPSBkaXYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHJlem9yY29ubmVjdC1jbG9zZScpWzBdO1xuXG4gIGNsb3NlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2FuY2VsKCk7XG5cbiAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkaXYpO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuc2hvd1BvcHVwUmVxdWVzdCA9IHNob3dQb3B1cFJlcXVlc3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBDT05TVEFOVFMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpKTtcblxudmFyIFAgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9wYXJhbXNcIikpO1xuXG52YXIgRGV2aWNlID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vdHJlem9yL2RldmljZVwiKSk7XG5cbnZhciBNZ21udCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL3RyZXpvci9tYW5hZ2VtZW50XCIpKTtcblxudmFyIFByb3RvYnVmID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vdHJlem9yL3Byb3RvYnVmXCIpKTtcblxudmFyIEFjY291bnQgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9hY2NvdW50XCIpKTtcblxudmFyIEJpdGNvaW4gPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9uZXR3b3Jrcy9iaXRjb2luXCIpKTtcblxudmFyIEJpbmFuY2UgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9uZXR3b3Jrcy9iaW5hbmNlXCIpKTtcblxudmFyIENhcmRhbm8gPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9uZXR3b3Jrcy9jYXJkYW5vXCIpKTtcblxudmFyIENvaW5JbmZvID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbmV0d29ya3MvY29pbkluZm9cIikpO1xuXG52YXIgRU9TID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbmV0d29ya3MvZW9zXCIpKTtcblxudmFyIEV0aGVyZXVtID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbmV0d29ya3MvZXRoZXJldW1cIikpO1xuXG52YXIgTkVNID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbmV0d29ya3MvbmVtXCIpKTtcblxudmFyIFJpcHBsZSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL25ldHdvcmtzL3JpcHBsZVwiKSk7XG5cbnZhciBTdGVsbGFyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbmV0d29ya3Mvc3RlbGxhclwiKSk7XG5cbnZhciBUZXpvcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL25ldHdvcmtzL3Rlem9zXCIpKTtcblxudmFyIE1pc2MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9taXNjXCIpKTtcblxudmFyIEV2ZW50cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL2V2ZW50c1wiKSk7XG5cbnZhciBCbG9ja2NoYWluID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vYmFja2VuZC9ibG9ja2NoYWluXCIpKTtcblxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKSB7IGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDsgdmFyIGNhY2hlQmFiZWxJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgdmFyIGNhY2hlTm9kZUludGVyb3AgPSBuZXcgV2Vha01hcCgpOyByZXR1cm4gKF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSA9IGZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyByZXR1cm4gbm9kZUludGVyb3AgPyBjYWNoZU5vZGVJbnRlcm9wIDogY2FjaGVCYWJlbEludGVyb3A7IH0pKG5vZGVJbnRlcm9wKTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmosIG5vZGVJbnRlcm9wKSB7IGlmICghbm9kZUludGVyb3AgJiYgb2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikgeyByZXR1cm4geyBcImRlZmF1bHRcIjogb2JqIH07IH0gdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKTsgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7IHJldHVybiBjYWNoZS5nZXQob2JqKTsgfSB2YXIgbmV3T2JqID0ge307IHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoa2V5ICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7IGlmIChjYWNoZSkgeyBjYWNoZS5zZXQob2JqLCBuZXdPYmopOyB9IHJldHVybiBuZXdPYmo7IH0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKFwiLi4vLi4vY29uc3RhbnRzXCIpOyIsIlwidXNlIHN0cmljdFwiOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfYXBpID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuXG5PYmplY3Qua2V5cyhfYXBpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfYXBpW2tleV0pIHJldHVybjtcbiAgZXhwb3J0c1trZXldID0gX2FwaVtrZXldO1xufSk7XG5cbnZhciBfZXZlbnRzID0gcmVxdWlyZShcIi4vZXZlbnRzXCIpO1xuXG5PYmplY3Qua2V5cyhfZXZlbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfZXZlbnRzW2tleV0pIHJldHVybjtcbiAgZXhwb3J0c1trZXldID0gX2V2ZW50c1trZXldO1xufSk7XG5cbnZhciBfbWlzYyA9IHJlcXVpcmUoXCIuL21pc2NcIik7XG5cbk9iamVjdC5rZXlzKF9taXNjKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfbWlzY1trZXldKSByZXR1cm47XG4gIGV4cG9ydHNba2V5XSA9IF9taXNjW2tleV07XG59KTtcblxudmFyIF9wYXJhbXMgPSByZXF1aXJlKFwiLi9wYXJhbXNcIik7XG5cbk9iamVjdC5rZXlzKF9wYXJhbXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9wYXJhbXNba2V5XSkgcmV0dXJuO1xuICBleHBvcnRzW2tleV0gPSBfcGFyYW1zW2tleV07XG59KTtcblxudmFyIF9hY2NvdW50ID0gcmVxdWlyZShcIi4vYWNjb3VudFwiKTtcblxuT2JqZWN0LmtleXMoX2FjY291bnQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9hY2NvdW50W2tleV0pIHJldHVybjtcbiAgZXhwb3J0c1trZXldID0gX2FjY291bnRba2V5XTtcbn0pO1xuXG52YXIgX2RldmljZSA9IHJlcXVpcmUoXCIuL3RyZXpvci9kZXZpY2VcIik7XG5cbk9iamVjdC5rZXlzKF9kZXZpY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9kZXZpY2Vba2V5XSkgcmV0dXJuO1xuICBleHBvcnRzW2tleV0gPSBfZGV2aWNlW2tleV07XG59KTtcblxudmFyIF9tYW5hZ2VtZW50ID0gcmVxdWlyZShcIi4vdHJlem9yL21hbmFnZW1lbnRcIik7XG5cbk9iamVjdC5rZXlzKF9tYW5hZ2VtZW50KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfbWFuYWdlbWVudFtrZXldKSByZXR1cm47XG4gIGV4cG9ydHNba2V5XSA9IF9tYW5hZ2VtZW50W2tleV07XG59KTtcblxudmFyIF9iaXRjb2luID0gcmVxdWlyZShcIi4vbmV0d29ya3MvYml0Y29pblwiKTtcblxuT2JqZWN0LmtleXMoX2JpdGNvaW4pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9iaXRjb2luW2tleV0pIHJldHVybjtcbiAgZXhwb3J0c1trZXldID0gX2JpdGNvaW5ba2V5XTtcbn0pO1xuXG52YXIgX2JpbmFuY2UgPSByZXF1aXJlKFwiLi9uZXR3b3Jrcy9iaW5hbmNlXCIpO1xuXG5PYmplY3Qua2V5cyhfYmluYW5jZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKGtleSBpbiBleHBvcnRzICYmIGV4cG9ydHNba2V5XSA9PT0gX2JpbmFuY2Vba2V5XSkgcmV0dXJuO1xuICBleHBvcnRzW2tleV0gPSBfYmluYW5jZVtrZXldO1xufSk7XG5cbnZhciBfY2FyZGFubyA9IHJlcXVpcmUoXCIuL25ldHdvcmtzL2NhcmRhbm9cIik7XG5cbk9iamVjdC5rZXlzKF9jYXJkYW5vKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfY2FyZGFub1trZXldKSByZXR1cm47XG4gIGV4cG9ydHNba2V5XSA9IF9jYXJkYW5vW2tleV07XG59KTtcblxudmFyIF9jb2luSW5mbyA9IHJlcXVpcmUoXCIuL25ldHdvcmtzL2NvaW5JbmZvXCIpO1xuXG5PYmplY3Qua2V5cyhfY29pbkluZm8pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9jb2luSW5mb1trZXldKSByZXR1cm47XG4gIGV4cG9ydHNba2V5XSA9IF9jb2luSW5mb1trZXldO1xufSk7XG5cbnZhciBfZW9zID0gcmVxdWlyZShcIi4vbmV0d29ya3MvZW9zXCIpO1xuXG5PYmplY3Qua2V5cyhfZW9zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfZW9zW2tleV0pIHJldHVybjtcbiAgZXhwb3J0c1trZXldID0gX2Vvc1trZXldO1xufSk7XG5cbnZhciBfZXRoZXJldW0gPSByZXF1aXJlKFwiLi9uZXR3b3Jrcy9ldGhlcmV1bVwiKTtcblxuT2JqZWN0LmtleXMoX2V0aGVyZXVtKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfZXRoZXJldW1ba2V5XSkgcmV0dXJuO1xuICBleHBvcnRzW2tleV0gPSBfZXRoZXJldW1ba2V5XTtcbn0pO1xuXG52YXIgX25lbSA9IHJlcXVpcmUoXCIuL25ldHdvcmtzL25lbVwiKTtcblxuT2JqZWN0LmtleXMoX25lbSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKGtleSBpbiBleHBvcnRzICYmIGV4cG9ydHNba2V5XSA9PT0gX25lbVtrZXldKSByZXR1cm47XG4gIGV4cG9ydHNba2V5XSA9IF9uZW1ba2V5XTtcbn0pO1xuXG52YXIgX3JpcHBsZSA9IHJlcXVpcmUoXCIuL25ldHdvcmtzL3JpcHBsZVwiKTtcblxuT2JqZWN0LmtleXMoX3JpcHBsZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKGtleSBpbiBleHBvcnRzICYmIGV4cG9ydHNba2V5XSA9PT0gX3JpcHBsZVtrZXldKSByZXR1cm47XG4gIGV4cG9ydHNba2V5XSA9IF9yaXBwbGVba2V5XTtcbn0pO1xuXG52YXIgX3N0ZWxsYXIgPSByZXF1aXJlKFwiLi9uZXR3b3Jrcy9zdGVsbGFyXCIpO1xuXG5PYmplY3Qua2V5cyhfc3RlbGxhcikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKGtleSBpbiBleHBvcnRzICYmIGV4cG9ydHNba2V5XSA9PT0gX3N0ZWxsYXJba2V5XSkgcmV0dXJuO1xuICBleHBvcnRzW2tleV0gPSBfc3RlbGxhcltrZXldO1xufSk7XG5cbnZhciBfdGV6b3MgPSByZXF1aXJlKFwiLi9uZXR3b3Jrcy90ZXpvc1wiKTtcblxuT2JqZWN0LmtleXMoX3Rlem9zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfdGV6b3Nba2V5XSkgcmV0dXJuO1xuICBleHBvcnRzW2tleV0gPSBfdGV6b3Nba2V5XTtcbn0pO1xuXG52YXIgX2Jsb2NrY2hhaW4gPSByZXF1aXJlKFwiLi9iYWNrZW5kL2Jsb2NrY2hhaW5cIik7XG5cbk9iamVjdC5rZXlzKF9ibG9ja2NoYWluKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoa2V5IGluIGV4cG9ydHMgJiYgZXhwb3J0c1trZXldID09PSBfYmxvY2tjaGFpbltrZXldKSByZXR1cm47XG4gIGV4cG9ydHNba2V5XSA9IF9ibG9ja2NoYWluW2tleV07XG59KTtcblxudmFyIF90cmFuc2FjdGlvbnMgPSByZXF1aXJlKFwiLi9iYWNrZW5kL3RyYW5zYWN0aW9uc1wiKTtcblxuT2JqZWN0LmtleXMoX3RyYW5zYWN0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKGtleSBpbiBleHBvcnRzICYmIGV4cG9ydHNba2V5XSA9PT0gX3RyYW5zYWN0aW9uc1trZXldKSByZXR1cm47XG4gIGV4cG9ydHNba2V5XSA9IF90cmFuc2FjdGlvbnNba2V5XTtcbn0pOyIsIlwidXNlIHN0cmljdFwiOyIsIlwidXNlIHN0cmljdFwiOyIsIlwidXNlIHN0cmljdFwiOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5DYXJkYW5vVHhXaXRuZXNzVHlwZSA9IGV4cG9ydHMuQ2FyZGFub1R4U2lnbmluZ01vZGUgPSBleHBvcnRzLkNhcmRhbm9Qb29sUmVsYXlUeXBlID0gZXhwb3J0cy5DYXJkYW5vTmF0aXZlU2NyaXB0SGFzaERpc3BsYXlGb3JtYXQgPSBleHBvcnRzLkNhcmRhbm9OYXRpdmVTY3JpcHRUeXBlID0gZXhwb3J0cy5DYXJkYW5vQ2VydGlmaWNhdGVUeXBlID0gZXhwb3J0cy5DYXJkYW5vQWRkcmVzc1R5cGUgPSB2b2lkIDA7XG5cbnZhciBfcHJvdG9idWYgPSByZXF1aXJlKFwiLi4vdHJlem9yL3Byb3RvYnVmXCIpO1xuXG5leHBvcnRzLkNhcmRhbm9BZGRyZXNzVHlwZSA9IF9wcm90b2J1Zi5FbnVtX0NhcmRhbm9BZGRyZXNzVHlwZTtcbmV4cG9ydHMuQ2FyZGFub0NlcnRpZmljYXRlVHlwZSA9IF9wcm90b2J1Zi5FbnVtX0NhcmRhbm9DZXJ0aWZpY2F0ZVR5cGU7XG5leHBvcnRzLkNhcmRhbm9OYXRpdmVTY3JpcHRUeXBlID0gX3Byb3RvYnVmLkVudW1fQ2FyZGFub05hdGl2ZVNjcmlwdFR5cGU7XG5leHBvcnRzLkNhcmRhbm9OYXRpdmVTY3JpcHRIYXNoRGlzcGxheUZvcm1hdCA9IF9wcm90b2J1Zi5FbnVtX0NhcmRhbm9OYXRpdmVTY3JpcHRIYXNoRGlzcGxheUZvcm1hdDtcbmV4cG9ydHMuQ2FyZGFub1Bvb2xSZWxheVR5cGUgPSBfcHJvdG9idWYuRW51bV9DYXJkYW5vUG9vbFJlbGF5VHlwZTtcbmV4cG9ydHMuQ2FyZGFub1R4U2lnbmluZ01vZGUgPSBfcHJvdG9idWYuRW51bV9DYXJkYW5vVHhTaWduaW5nTW9kZTtcbmV4cG9ydHMuQ2FyZGFub1R4V2l0bmVzc1R5cGUgPSBfcHJvdG9idWYuRW51bV9DYXJkYW5vVHhXaXRuZXNzVHlwZTsiLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKFwiLi4vLi4vY29uc3RhbnRzXCIpOyIsIlwidXNlIHN0cmljdFwiOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5FbnVtX1Rlem9zQmFsbG90VHlwZSA9IGV4cG9ydHMuRW51bV9UZXpvc0NvbnRyYWN0VHlwZSA9IGV4cG9ydHMuRW51bV9TdGVsbGFyU2lnbmVyVHlwZSA9IGV4cG9ydHMuRW51bV9TdGVsbGFyTWVtb1R5cGUgPSBleHBvcnRzLkVudW1fU3RlbGxhckFzc2V0VHlwZSA9IGV4cG9ydHMuRW51bV9ORU1JbXBvcnRhbmNlVHJhbnNmZXJNb2RlID0gZXhwb3J0cy5FbnVtX05FTU1vZGlmaWNhdGlvblR5cGUgPSBleHBvcnRzLkVudW1fTkVNU3VwcGx5Q2hhbmdlVHlwZSA9IGV4cG9ydHMuRW51bV9ORU1Nb3NhaWNMZXZ5ID0gZXhwb3J0cy5FbnVtX1dvcmRSZXF1ZXN0VHlwZSA9IGV4cG9ydHMuRW51bV9SZWNvdmVyeURldmljZVR5cGUgPSBleHBvcnRzLkVudW1fU2RQcm90ZWN0T3BlcmF0aW9uVHlwZSA9IGV4cG9ydHMuRW51bV9DYXBhYmlsaXR5ID0gZXhwb3J0cy5FbnVtX1NhZmV0eUNoZWNrTGV2ZWwgPSBleHBvcnRzLkVudW1fQmFja3VwVHlwZSA9IGV4cG9ydHMuRW51bV9FdGhlcmV1bURhdGFUeXBlID0gZXhwb3J0cy5FbnVtX1Bpbk1hdHJpeFJlcXVlc3RUeXBlID0gZXhwb3J0cy5FbnVtX0J1dHRvblJlcXVlc3RUeXBlID0gZXhwb3J0cy5FbnVtX0ZhaWx1cmVUeXBlID0gZXhwb3J0cy5FbnVtX0NhcmRhbm9UeFdpdG5lc3NUeXBlID0gZXhwb3J0cy5FbnVtX0NhcmRhbm9UeFNpZ25pbmdNb2RlID0gZXhwb3J0cy5FbnVtX0NhcmRhbm9UeEF1eGlsaWFyeURhdGFTdXBwbGVtZW50VHlwZSA9IGV4cG9ydHMuRW51bV9DYXJkYW5vUG9vbFJlbGF5VHlwZSA9IGV4cG9ydHMuRW51bV9DYXJkYW5vQ2VydGlmaWNhdGVUeXBlID0gZXhwb3J0cy5FbnVtX0NhcmRhbm9OYXRpdmVTY3JpcHRIYXNoRGlzcGxheUZvcm1hdCA9IGV4cG9ydHMuRW51bV9DYXJkYW5vTmF0aXZlU2NyaXB0VHlwZSA9IGV4cG9ydHMuRW51bV9DYXJkYW5vQWRkcmVzc1R5cGUgPSBleHBvcnRzLkVudW1fQ2FyZGFub0Rlcml2YXRpb25UeXBlID0gZXhwb3J0cy5FbnVtX1JlcXVlc3RUeXBlID0gZXhwb3J0cy5FbnVtX0Ftb3VudFVuaXQgPSBleHBvcnRzLkVudW1fRGVjcmVkU3Rha2luZ1NwZW5kVHlwZSA9IGV4cG9ydHMuRW51bV9PdXRwdXRTY3JpcHRUeXBlID0gZXhwb3J0cy5FbnVtX0lucHV0U2NyaXB0VHlwZSA9IGV4cG9ydHMuRW51bV9CaW5hbmNlVGltZUluRm9yY2UgPSBleHBvcnRzLkVudW1fQmluYW5jZU9yZGVyU2lkZSA9IGV4cG9ydHMuRW51bV9CaW5hbmNlT3JkZXJUeXBlID0gdm9pZCAwO1xuLy8gVGhpcyBmaWxlIGlzIGF1dG8gZ2VuZXJhdGVkIGZyb20gZGF0YS9tZXNzYWdlcy9tZXNzYWdlLmpzb25cbi8vIGN1c3RvbSB0eXBlIHVpbnQzMi82NCBtYXkgYmUgcmVwcmVzZW50ZWQgYXMgc3RyaW5nXG4vLyBCaW5hbmNlR2V0QWRkcmVzc1xuLy8gQmluYW5jZUFkZHJlc3Ncbi8vIEJpbmFuY2VHZXRQdWJsaWNLZXlcbi8vIEJpbmFuY2VQdWJsaWNLZXlcbi8vIEJpbmFuY2VTaWduVHhcbi8vIEJpbmFuY2VUeFJlcXVlc3Rcbi8vIEJpbmFuY2VUcmFuc2Zlck1zZ1xudmFyIEVudW1fQmluYW5jZU9yZGVyVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBPVF9VTktOT1dOOiAwLFxuICBNQVJLRVQ6IDEsXG4gIExJTUlUOiAyLFxuICBPVF9SRVNFUlZFRDogM1xufSk7XG5leHBvcnRzLkVudW1fQmluYW5jZU9yZGVyVHlwZSA9IEVudW1fQmluYW5jZU9yZGVyVHlwZTtcbnZhciBFbnVtX0JpbmFuY2VPcmRlclNpZGUgPSBPYmplY3QuZnJlZXplKHtcbiAgU0lERV9VTktOT1dOOiAwLFxuICBCVVk6IDEsXG4gIFNFTEw6IDJcbn0pO1xuZXhwb3J0cy5FbnVtX0JpbmFuY2VPcmRlclNpZGUgPSBFbnVtX0JpbmFuY2VPcmRlclNpZGU7XG52YXIgRW51bV9CaW5hbmNlVGltZUluRm9yY2UgPSBPYmplY3QuZnJlZXplKHtcbiAgVElGX1VOS05PV046IDAsXG4gIEdURTogMSxcbiAgVElGX1JFU0VSVkVEOiAyLFxuICBJT0M6IDNcbn0pO1xuZXhwb3J0cy5FbnVtX0JpbmFuY2VUaW1lSW5Gb3JjZSA9IEVudW1fQmluYW5jZVRpbWVJbkZvcmNlO1xudmFyIEVudW1fSW5wdXRTY3JpcHRUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFNQRU5EQUREUkVTUzogMCxcbiAgU1BFTkRNVUxUSVNJRzogMSxcbiAgRVhURVJOQUw6IDIsXG4gIFNQRU5EV0lUTkVTUzogMyxcbiAgU1BFTkRQMlNIV0lUTkVTUzogNCxcbiAgU1BFTkRUQVBST09UOiA1XG59KTtcbmV4cG9ydHMuRW51bV9JbnB1dFNjcmlwdFR5cGUgPSBFbnVtX0lucHV0U2NyaXB0VHlwZTtcbnZhciBFbnVtX091dHB1dFNjcmlwdFR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgUEFZVE9BRERSRVNTOiAwLFxuICBQQVlUT1NDUklQVEhBU0g6IDEsXG4gIFBBWVRPTVVMVElTSUc6IDIsXG4gIFBBWVRPT1BSRVRVUk46IDMsXG4gIFBBWVRPV0lUTkVTUzogNCxcbiAgUEFZVE9QMlNIV0lUTkVTUzogNSxcbiAgUEFZVE9UQVBST09UOiA2XG59KTtcbmV4cG9ydHMuRW51bV9PdXRwdXRTY3JpcHRUeXBlID0gRW51bV9PdXRwdXRTY3JpcHRUeXBlO1xudmFyIEVudW1fRGVjcmVkU3Rha2luZ1NwZW5kVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBTU0dlbjogMCxcbiAgU1NSVFg6IDFcbn0pO1xuZXhwb3J0cy5FbnVtX0RlY3JlZFN0YWtpbmdTcGVuZFR5cGUgPSBFbnVtX0RlY3JlZFN0YWtpbmdTcGVuZFR5cGU7XG52YXIgRW51bV9BbW91bnRVbml0ID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEJJVENPSU46IDAsXG4gIE1JTExJQklUQ09JTjogMSxcbiAgTUlDUk9CSVRDT0lOOiAyLFxuICBTQVRPU0hJOiAzXG59KTtcbmV4cG9ydHMuRW51bV9BbW91bnRVbml0ID0gRW51bV9BbW91bnRVbml0O1xudmFyIEVudW1fUmVxdWVzdFR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgVFhJTlBVVDogMCxcbiAgVFhPVVRQVVQ6IDEsXG4gIFRYTUVUQTogMixcbiAgVFhGSU5JU0hFRDogMyxcbiAgVFhFWFRSQURBVEE6IDQsXG4gIFRYT1JJR0lOUFVUOiA1LFxuICBUWE9SSUdPVVRQVVQ6IDZcbn0pO1xuZXhwb3J0cy5FbnVtX1JlcXVlc3RUeXBlID0gRW51bV9SZXF1ZXN0VHlwZTtcbnZhciBFbnVtX0NhcmRhbm9EZXJpdmF0aW9uVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBMRURHRVI6IDAsXG4gIElDQVJVUzogMSxcbiAgSUNBUlVTX1RSRVpPUjogMlxufSk7XG5leHBvcnRzLkVudW1fQ2FyZGFub0Rlcml2YXRpb25UeXBlID0gRW51bV9DYXJkYW5vRGVyaXZhdGlvblR5cGU7XG52YXIgRW51bV9DYXJkYW5vQWRkcmVzc1R5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgQkFTRTogMCxcbiAgQkFTRV9TQ1JJUFRfS0VZOiAxLFxuICBCQVNFX0tFWV9TQ1JJUFQ6IDIsXG4gIEJBU0VfU0NSSVBUX1NDUklQVDogMyxcbiAgUE9JTlRFUjogNCxcbiAgUE9JTlRFUl9TQ1JJUFQ6IDUsXG4gIEVOVEVSUFJJU0U6IDYsXG4gIEVOVEVSUFJJU0VfU0NSSVBUOiA3LFxuICBCWVJPTjogOCxcbiAgUkVXQVJEOiAxNCxcbiAgUkVXQVJEX1NDUklQVDogMTVcbn0pO1xuZXhwb3J0cy5FbnVtX0NhcmRhbm9BZGRyZXNzVHlwZSA9IEVudW1fQ2FyZGFub0FkZHJlc3NUeXBlO1xudmFyIEVudW1fQ2FyZGFub05hdGl2ZVNjcmlwdFR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgUFVCX0tFWTogMCxcbiAgQUxMOiAxLFxuICBBTlk6IDIsXG4gIE5fT0ZfSzogMyxcbiAgSU5WQUxJRF9CRUZPUkU6IDQsXG4gIElOVkFMSURfSEVSRUFGVEVSOiA1XG59KTtcbmV4cG9ydHMuRW51bV9DYXJkYW5vTmF0aXZlU2NyaXB0VHlwZSA9IEVudW1fQ2FyZGFub05hdGl2ZVNjcmlwdFR5cGU7XG52YXIgRW51bV9DYXJkYW5vTmF0aXZlU2NyaXB0SGFzaERpc3BsYXlGb3JtYXQgPSBPYmplY3QuZnJlZXplKHtcbiAgSElERTogMCxcbiAgQkVDSDMyOiAxLFxuICBQT0xJQ1lfSUQ6IDJcbn0pO1xuZXhwb3J0cy5FbnVtX0NhcmRhbm9OYXRpdmVTY3JpcHRIYXNoRGlzcGxheUZvcm1hdCA9IEVudW1fQ2FyZGFub05hdGl2ZVNjcmlwdEhhc2hEaXNwbGF5Rm9ybWF0O1xudmFyIEVudW1fQ2FyZGFub0NlcnRpZmljYXRlVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBTVEFLRV9SRUdJU1RSQVRJT046IDAsXG4gIFNUQUtFX0RFUkVHSVNUUkFUSU9OOiAxLFxuICBTVEFLRV9ERUxFR0FUSU9OOiAyLFxuICBTVEFLRV9QT09MX1JFR0lTVFJBVElPTjogM1xufSk7XG5leHBvcnRzLkVudW1fQ2FyZGFub0NlcnRpZmljYXRlVHlwZSA9IEVudW1fQ2FyZGFub0NlcnRpZmljYXRlVHlwZTtcbnZhciBFbnVtX0NhcmRhbm9Qb29sUmVsYXlUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFNJTkdMRV9IT1NUX0lQOiAwLFxuICBTSU5HTEVfSE9TVF9OQU1FOiAxLFxuICBNVUxUSVBMRV9IT1NUX05BTUU6IDJcbn0pO1xuZXhwb3J0cy5FbnVtX0NhcmRhbm9Qb29sUmVsYXlUeXBlID0gRW51bV9DYXJkYW5vUG9vbFJlbGF5VHlwZTtcbnZhciBFbnVtX0NhcmRhbm9UeEF1eGlsaWFyeURhdGFTdXBwbGVtZW50VHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBOT05FOiAwLFxuICBDQVRBTFlTVF9SRUdJU1RSQVRJT05fU0lHTkFUVVJFOiAxXG59KTtcbmV4cG9ydHMuRW51bV9DYXJkYW5vVHhBdXhpbGlhcnlEYXRhU3VwcGxlbWVudFR5cGUgPSBFbnVtX0NhcmRhbm9UeEF1eGlsaWFyeURhdGFTdXBwbGVtZW50VHlwZTtcbnZhciBFbnVtX0NhcmRhbm9UeFNpZ25pbmdNb2RlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIE9SRElOQVJZX1RSQU5TQUNUSU9OOiAwLFxuICBQT09MX1JFR0lTVFJBVElPTl9BU19PV05FUjogMSxcbiAgTVVMVElTSUdfVFJBTlNBQ1RJT046IDJcbn0pO1xuZXhwb3J0cy5FbnVtX0NhcmRhbm9UeFNpZ25pbmdNb2RlID0gRW51bV9DYXJkYW5vVHhTaWduaW5nTW9kZTtcbnZhciBFbnVtX0NhcmRhbm9UeFdpdG5lc3NUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEJZUk9OX1dJVE5FU1M6IDAsXG4gIFNIRUxMRVlfV0lUTkVTUzogMVxufSk7XG5leHBvcnRzLkVudW1fQ2FyZGFub1R4V2l0bmVzc1R5cGUgPSBFbnVtX0NhcmRhbm9UeFdpdG5lc3NUeXBlO1xudmFyIEVudW1fRmFpbHVyZVR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgRmFpbHVyZV9VbmV4cGVjdGVkTWVzc2FnZTogMSxcbiAgRmFpbHVyZV9CdXR0b25FeHBlY3RlZDogMixcbiAgRmFpbHVyZV9EYXRhRXJyb3I6IDMsXG4gIEZhaWx1cmVfQWN0aW9uQ2FuY2VsbGVkOiA0LFxuICBGYWlsdXJlX1BpbkV4cGVjdGVkOiA1LFxuICBGYWlsdXJlX1BpbkNhbmNlbGxlZDogNixcbiAgRmFpbHVyZV9QaW5JbnZhbGlkOiA3LFxuICBGYWlsdXJlX0ludmFsaWRTaWduYXR1cmU6IDgsXG4gIEZhaWx1cmVfUHJvY2Vzc0Vycm9yOiA5LFxuICBGYWlsdXJlX05vdEVub3VnaEZ1bmRzOiAxMCxcbiAgRmFpbHVyZV9Ob3RJbml0aWFsaXplZDogMTEsXG4gIEZhaWx1cmVfUGluTWlzbWF0Y2g6IDEyLFxuICBGYWlsdXJlX1dpcGVDb2RlTWlzbWF0Y2g6IDEzLFxuICBGYWlsdXJlX0ludmFsaWRTZXNzaW9uOiAxNCxcbiAgRmFpbHVyZV9GaXJtd2FyZUVycm9yOiA5OVxufSk7XG5leHBvcnRzLkVudW1fRmFpbHVyZVR5cGUgPSBFbnVtX0ZhaWx1cmVUeXBlO1xudmFyIEVudW1fQnV0dG9uUmVxdWVzdFR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgQnV0dG9uUmVxdWVzdF9PdGhlcjogMSxcbiAgQnV0dG9uUmVxdWVzdF9GZWVPdmVyVGhyZXNob2xkOiAyLFxuICBCdXR0b25SZXF1ZXN0X0NvbmZpcm1PdXRwdXQ6IDMsXG4gIEJ1dHRvblJlcXVlc3RfUmVzZXREZXZpY2U6IDQsXG4gIEJ1dHRvblJlcXVlc3RfQ29uZmlybVdvcmQ6IDUsXG4gIEJ1dHRvblJlcXVlc3RfV2lwZURldmljZTogNixcbiAgQnV0dG9uUmVxdWVzdF9Qcm90ZWN0Q2FsbDogNyxcbiAgQnV0dG9uUmVxdWVzdF9TaWduVHg6IDgsXG4gIEJ1dHRvblJlcXVlc3RfRmlybXdhcmVDaGVjazogOSxcbiAgQnV0dG9uUmVxdWVzdF9BZGRyZXNzOiAxMCxcbiAgQnV0dG9uUmVxdWVzdF9QdWJsaWNLZXk6IDExLFxuICBCdXR0b25SZXF1ZXN0X01uZW1vbmljV29yZENvdW50OiAxMixcbiAgQnV0dG9uUmVxdWVzdF9NbmVtb25pY0lucHV0OiAxMyxcbiAgX0RlcHJlY2F0ZWRfQnV0dG9uUmVxdWVzdF9QYXNzcGhyYXNlVHlwZTogMTQsXG4gIEJ1dHRvblJlcXVlc3RfVW5rbm93bkRlcml2YXRpb25QYXRoOiAxNSxcbiAgQnV0dG9uUmVxdWVzdF9SZWNvdmVyeUhvbWVwYWdlOiAxNixcbiAgQnV0dG9uUmVxdWVzdF9TdWNjZXNzOiAxNyxcbiAgQnV0dG9uUmVxdWVzdF9XYXJuaW5nOiAxOCxcbiAgQnV0dG9uUmVxdWVzdF9QYXNzcGhyYXNlRW50cnk6IDE5LFxuICBCdXR0b25SZXF1ZXN0X1BpbkVudHJ5OiAyMFxufSk7XG5leHBvcnRzLkVudW1fQnV0dG9uUmVxdWVzdFR5cGUgPSBFbnVtX0J1dHRvblJlcXVlc3RUeXBlO1xudmFyIEVudW1fUGluTWF0cml4UmVxdWVzdFR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgUGluTWF0cml4UmVxdWVzdFR5cGVfQ3VycmVudDogMSxcbiAgUGluTWF0cml4UmVxdWVzdFR5cGVfTmV3Rmlyc3Q6IDIsXG4gIFBpbk1hdHJpeFJlcXVlc3RUeXBlX05ld1NlY29uZDogMyxcbiAgUGluTWF0cml4UmVxdWVzdFR5cGVfV2lwZUNvZGVGaXJzdDogNCxcbiAgUGluTWF0cml4UmVxdWVzdFR5cGVfV2lwZUNvZGVTZWNvbmQ6IDVcbn0pO1xuZXhwb3J0cy5FbnVtX1Bpbk1hdHJpeFJlcXVlc3RUeXBlID0gRW51bV9QaW5NYXRyaXhSZXF1ZXN0VHlwZTtcbnZhciBFbnVtX0V0aGVyZXVtRGF0YVR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgVUlOVDogMSxcbiAgSU5UOiAyLFxuICBCWVRFUzogMyxcbiAgU1RSSU5HOiA0LFxuICBCT09MOiA1LFxuICBBRERSRVNTOiA2LFxuICBBUlJBWTogNyxcbiAgU1RSVUNUOiA4XG59KTtcbmV4cG9ydHMuRW51bV9FdGhlcmV1bURhdGFUeXBlID0gRW51bV9FdGhlcmV1bURhdGFUeXBlO1xudmFyIEVudW1fQmFja3VwVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBCaXAzOTogMCxcbiAgU2xpcDM5X0Jhc2ljOiAxLFxuICBTbGlwMzlfQWR2YW5jZWQ6IDJcbn0pO1xuZXhwb3J0cy5FbnVtX0JhY2t1cFR5cGUgPSBFbnVtX0JhY2t1cFR5cGU7XG52YXIgRW51bV9TYWZldHlDaGVja0xldmVsID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFN0cmljdDogMCxcbiAgUHJvbXB0QWx3YXlzOiAxLFxuICBQcm9tcHRUZW1wb3JhcmlseTogMlxufSk7XG5leHBvcnRzLkVudW1fU2FmZXR5Q2hlY2tMZXZlbCA9IEVudW1fU2FmZXR5Q2hlY2tMZXZlbDtcbnZhciBFbnVtX0NhcGFiaWxpdHkgPSBPYmplY3QuZnJlZXplKHtcbiAgQ2FwYWJpbGl0eV9CaXRjb2luOiAxLFxuICBDYXBhYmlsaXR5X0JpdGNvaW5fbGlrZTogMixcbiAgQ2FwYWJpbGl0eV9CaW5hbmNlOiAzLFxuICBDYXBhYmlsaXR5X0NhcmRhbm86IDQsXG4gIENhcGFiaWxpdHlfQ3J5cHRvOiA1LFxuICBDYXBhYmlsaXR5X0VPUzogNixcbiAgQ2FwYWJpbGl0eV9FdGhlcmV1bTogNyxcbiAgQ2FwYWJpbGl0eV9MaXNrOiA4LFxuICBDYXBhYmlsaXR5X01vbmVybzogOSxcbiAgQ2FwYWJpbGl0eV9ORU06IDEwLFxuICBDYXBhYmlsaXR5X1JpcHBsZTogMTEsXG4gIENhcGFiaWxpdHlfU3RlbGxhcjogMTIsXG4gIENhcGFiaWxpdHlfVGV6b3M6IDEzLFxuICBDYXBhYmlsaXR5X1UyRjogMTQsXG4gIENhcGFiaWxpdHlfU2hhbWlyOiAxNSxcbiAgQ2FwYWJpbGl0eV9TaGFtaXJHcm91cHM6IDE2LFxuICBDYXBhYmlsaXR5X1Bhc3NwaHJhc2VFbnRyeTogMTdcbn0pO1xuZXhwb3J0cy5FbnVtX0NhcGFiaWxpdHkgPSBFbnVtX0NhcGFiaWxpdHk7XG52YXIgRW51bV9TZFByb3RlY3RPcGVyYXRpb25UeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIERJU0FCTEU6IDAsXG4gIEVOQUJMRTogMSxcbiAgUkVGUkVTSDogMlxufSk7XG5leHBvcnRzLkVudW1fU2RQcm90ZWN0T3BlcmF0aW9uVHlwZSA9IEVudW1fU2RQcm90ZWN0T3BlcmF0aW9uVHlwZTtcbnZhciBFbnVtX1JlY292ZXJ5RGV2aWNlVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBSZWNvdmVyeURldmljZVR5cGVfU2NyYW1ibGVkV29yZHM6IDAsXG4gIFJlY292ZXJ5RGV2aWNlVHlwZV9NYXRyaXg6IDFcbn0pO1xuZXhwb3J0cy5FbnVtX1JlY292ZXJ5RGV2aWNlVHlwZSA9IEVudW1fUmVjb3ZlcnlEZXZpY2VUeXBlO1xudmFyIEVudW1fV29yZFJlcXVlc3RUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFdvcmRSZXF1ZXN0VHlwZV9QbGFpbjogMCxcbiAgV29yZFJlcXVlc3RUeXBlX01hdHJpeDk6IDEsXG4gIFdvcmRSZXF1ZXN0VHlwZV9NYXRyaXg2OiAyXG59KTtcbmV4cG9ydHMuRW51bV9Xb3JkUmVxdWVzdFR5cGUgPSBFbnVtX1dvcmRSZXF1ZXN0VHlwZTtcbnZhciBFbnVtX05FTU1vc2FpY0xldnkgPSBPYmplY3QuZnJlZXplKHtcbiAgTW9zYWljTGV2eV9BYnNvbHV0ZTogMSxcbiAgTW9zYWljTGV2eV9QZXJjZW50aWxlOiAyXG59KTtcbmV4cG9ydHMuRW51bV9ORU1Nb3NhaWNMZXZ5ID0gRW51bV9ORU1Nb3NhaWNMZXZ5O1xudmFyIEVudW1fTkVNU3VwcGx5Q2hhbmdlVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBTdXBwbHlDaGFuZ2VfSW5jcmVhc2U6IDEsXG4gIFN1cHBseUNoYW5nZV9EZWNyZWFzZTogMlxufSk7XG5leHBvcnRzLkVudW1fTkVNU3VwcGx5Q2hhbmdlVHlwZSA9IEVudW1fTkVNU3VwcGx5Q2hhbmdlVHlwZTtcbnZhciBFbnVtX05FTU1vZGlmaWNhdGlvblR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgQ29zaWduYXRvcnlNb2RpZmljYXRpb25fQWRkOiAxLFxuICBDb3NpZ25hdG9yeU1vZGlmaWNhdGlvbl9EZWxldGU6IDJcbn0pO1xuZXhwb3J0cy5FbnVtX05FTU1vZGlmaWNhdGlvblR5cGUgPSBFbnVtX05FTU1vZGlmaWNhdGlvblR5cGU7XG52YXIgRW51bV9ORU1JbXBvcnRhbmNlVHJhbnNmZXJNb2RlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEltcG9ydGFuY2VUcmFuc2Zlcl9BY3RpdmF0ZTogMSxcbiAgSW1wb3J0YW5jZVRyYW5zZmVyX0RlYWN0aXZhdGU6IDJcbn0pO1xuZXhwb3J0cy5FbnVtX05FTUltcG9ydGFuY2VUcmFuc2Zlck1vZGUgPSBFbnVtX05FTUltcG9ydGFuY2VUcmFuc2Zlck1vZGU7XG52YXIgRW51bV9TdGVsbGFyQXNzZXRUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIE5BVElWRTogMCxcbiAgQUxQSEFOVU00OiAxLFxuICBBTFBIQU5VTTEyOiAyXG59KTtcbmV4cG9ydHMuRW51bV9TdGVsbGFyQXNzZXRUeXBlID0gRW51bV9TdGVsbGFyQXNzZXRUeXBlO1xudmFyIEVudW1fU3RlbGxhck1lbW9UeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIE5PTkU6IDAsXG4gIFRFWFQ6IDEsXG4gIElEOiAyLFxuICBIQVNIOiAzLFxuICBSRVRVUk46IDRcbn0pO1xuZXhwb3J0cy5FbnVtX1N0ZWxsYXJNZW1vVHlwZSA9IEVudW1fU3RlbGxhck1lbW9UeXBlO1xudmFyIEVudW1fU3RlbGxhclNpZ25lclR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgQUNDT1VOVDogMCxcbiAgUFJFX0FVVEg6IDEsXG4gIEhBU0g6IDJcbn0pO1xuZXhwb3J0cy5FbnVtX1N0ZWxsYXJTaWduZXJUeXBlID0gRW51bV9TdGVsbGFyU2lnbmVyVHlwZTtcbnZhciBFbnVtX1Rlem9zQ29udHJhY3RUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEltcGxpY2l0OiAwLFxuICBPcmlnaW5hdGVkOiAxXG59KTtcbmV4cG9ydHMuRW51bV9UZXpvc0NvbnRyYWN0VHlwZSA9IEVudW1fVGV6b3NDb250cmFjdFR5cGU7XG52YXIgRW51bV9UZXpvc0JhbGxvdFR5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgWWF5OiAwLFxuICBOYXk6IDEsXG4gIFBhc3M6IDJcbn0pO1xuZXhwb3J0cy5FbnVtX1Rlem9zQmFsbG90VHlwZSA9IEVudW1fVGV6b3NCYWxsb3RUeXBlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5nZXRMb2cgPSBleHBvcnRzLmVuYWJsZUxvZ0J5UHJlZml4ID0gZXhwb3J0cy5lbmFibGVMb2cgPSBleHBvcnRzLmluaXRMb2cgPSB2b2lkIDA7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbnZhciBjb2xvcnMgPSB7XG4gIC8vIGdyZWVuXG4gIERlc2NyaXB0b3JTdHJlYW06ICdjb2xvcjogIzc3YWI1OScsXG4gIERldmljZUxpc3Q6ICdjb2xvcjogIzM2ODAyZCcsXG4gIERldmljZTogJ2NvbG9yOiAjYmFkYTU1JyxcbiAgQ29yZTogJ2NvbG9yOiAjYzlkZjhhJyxcbiAgSUZyYW1lOiAnY29sb3I6ICNGRkZGRkY7IGJhY2tncm91bmQ6ICNmNGE3NDI7JyxcbiAgUG9wdXA6ICdjb2xvcjogI2Y0OGEwMCdcbn07XG52YXIgTUFYX0VOVFJJRVMgPSAxMDA7XG5cbnZhciBMb2cgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBMb2cocHJlZml4LCBlbmFibGVkKSB7XG4gICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlZDtcbiAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgdGhpcy5jc3MgPSBjb2xvcnNbcHJlZml4XSB8fCAnY29sb3I6ICMwMDAwMDA7IGJhY2tncm91bmQ6ICNGRkZGRkY7JztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBMb2cucHJvdG90eXBlO1xuXG4gIF9wcm90by5hZGRNZXNzYWdlID0gZnVuY3Rpb24gYWRkTWVzc2FnZShsZXZlbCwgcHJlZml4KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdGhpcy5tZXNzYWdlcy5wdXNoKHtcbiAgICAgIGxldmVsOiBsZXZlbCxcbiAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgbWVzc2FnZTogYXJncyxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm1lc3NhZ2VzLmxlbmd0aCA+IE1BWF9FTlRSSUVTKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzLnNoaWZ0KCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5sb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgdGhpcy5hZGRNZXNzYWdlLmFwcGx5KHRoaXMsIFsnbG9nJywgdGhpcy5wcmVmaXhdLmNvbmNhdChhcmdzKSk7XG5cbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB2YXIgX2NvbnNvbGU7XG5cbiAgICAgIChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgW3RoaXMucHJlZml4XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uZXJyb3IgPSBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZE1lc3NhZ2UuYXBwbHkodGhpcywgWydlcnJvcicsIHRoaXMucHJlZml4XS5jb25jYXQoYXJncykpO1xuXG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdmFyIF9jb25zb2xlMjtcblxuICAgICAgKF9jb25zb2xlMiA9IGNvbnNvbGUpLmVycm9yLmFwcGx5KF9jb25zb2xlMiwgW3RoaXMucHJlZml4XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ud2FybiA9IGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgfVxuXG4gICAgdGhpcy5hZGRNZXNzYWdlLmFwcGx5KHRoaXMsIFsnd2FybicsIHRoaXMucHJlZml4XS5jb25jYXQoYXJncykpO1xuXG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdmFyIF9jb25zb2xlMztcblxuICAgICAgKF9jb25zb2xlMyA9IGNvbnNvbGUpLndhcm4uYXBwbHkoX2NvbnNvbGUzLCBbdGhpcy5wcmVmaXhdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5kZWJ1ZyA9IGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNSksIF9rZXk1ID0gMDsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWVzc2FnZS5hcHBseSh0aGlzLCBbJ2RlYnVnJywgdGhpcy5wcmVmaXhdLmNvbmNhdChhcmdzKSk7XG5cbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB2YXIgX2NvbnNvbGU0O1xuXG4gICAgICAoX2NvbnNvbGU0ID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlNCwgW1wiJWNcIiArIHRoaXMucHJlZml4LCB0aGlzLmNzc10uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIExvZztcbn0oKTtcblxudmFyIF9sb2dzID0ge307XG5cbnZhciBpbml0TG9nID0gZnVuY3Rpb24gaW5pdExvZyhwcmVmaXgsIGVuYWJsZWQpIHtcbiAgdmFyIGluc3RhbmNlID0gbmV3IExvZyhwcmVmaXgsICEhZW5hYmxlZCk7XG4gIF9sb2dzW3ByZWZpeF0gPSBpbnN0YW5jZTtcbiAgcmV0dXJuIGluc3RhbmNlO1xufTtcblxuZXhwb3J0cy5pbml0TG9nID0gaW5pdExvZztcblxudmFyIGVuYWJsZUxvZyA9IGZ1bmN0aW9uIGVuYWJsZUxvZyhlbmFibGVkKSB7XG4gIE9iamVjdC5rZXlzKF9sb2dzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBfbG9nc1trZXldLmVuYWJsZWQgPSBlbmFibGVkO1xuICB9KTtcbn07XG5cbmV4cG9ydHMuZW5hYmxlTG9nID0gZW5hYmxlTG9nO1xuXG52YXIgZW5hYmxlTG9nQnlQcmVmaXggPSBmdW5jdGlvbiBlbmFibGVMb2dCeVByZWZpeChwcmVmaXgsIGVuYWJsZWQpIHtcbiAgaWYgKF9sb2dzW3ByZWZpeF0pIHtcbiAgICBfbG9nc1twcmVmaXhdLmVuYWJsZWQgPSBlbmFibGVkO1xuICB9XG59O1xuXG5leHBvcnRzLmVuYWJsZUxvZ0J5UHJlZml4ID0gZW5hYmxlTG9nQnlQcmVmaXg7XG5cbnZhciBnZXRMb2cgPSBmdW5jdGlvbiBnZXRMb2coKSB7XG4gIHZhciBsb2dzID0gW107XG4gIE9iamVjdC5rZXlzKF9sb2dzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBsb2dzID0gbG9ncy5jb25jYXQoX2xvZ3Nba2V5XS5tZXNzYWdlcyk7XG4gIH0pO1xuICBsb2dzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYS50aW1lc3RhbXAgLSBiLnRpbWVzdGFtcDtcbiAgfSk7XG4gIHJldHVybiBsb2dzO1xufTtcblxuZXhwb3J0cy5nZXRMb2cgPSBnZXRMb2c7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5jcmVhdGUgPSBjcmVhdGU7XG5leHBvcnRzLmNyZWF0ZUFzeW5jID0gY3JlYXRlQXN5bmM7XG5leHBvcnRzLnJlc29sdmVUaW1lb3V0UHJvbWlzZSA9IHJlc29sdmVUaW1lb3V0UHJvbWlzZTtcbmV4cG9ydHMucmVqZWN0VGltZW91dFByb21pc2UgPSB2b2lkIDA7XG5cbnZhciBfcmVnZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvclwiKSk7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIikpO1xuXG5mdW5jdGlvbiBjcmVhdGUoYXJnLCBkZXZpY2UpIHtcbiAgdmFyIGxvY2FsUmVzb2x2ZSA9IGZ1bmN0aW9uIGxvY2FsUmVzb2x2ZShfdCkge307XG5cbiAgdmFyIGxvY2FsUmVqZWN0ID0gZnVuY3Rpb24gbG9jYWxSZWplY3QoX2UpIHt9O1xuXG4gIHZhciBpZDsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWFzeW5jLXByb21pc2UtZXhlY3V0b3JcblxuICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKCAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAgIHZhciBfcmVmID0gKDAsIF9hc3luY1RvR2VuZXJhdG9yMltcImRlZmF1bHRcIl0pKCAvKiNfX1BVUkVfXyovX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yW1wiZGVmYXVsdFwiXS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBsb2NhbFJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICBsb2NhbFJlamVjdCA9IHJlamVjdDtcblxuICAgICAgICAgICAgICBpZiAoISh0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAzO1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNjtcbiAgICAgICAgICAgICAgcmV0dXJuIGFyZygpO1xuXG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDg7XG4gICAgICAgICAgICAgIF9jb250ZXh0LnQwID0gX2NvbnRleHRbXCJjYXRjaFwiXSgzKTtcbiAgICAgICAgICAgICAgcmVqZWN0KF9jb250ZXh0LnQwKTtcblxuICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSBpZCA9IGFyZztcblxuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIF9jYWxsZWUsIG51bGwsIFtbMywgOF1dKTtcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKF94LCBfeDIpIHtcbiAgICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSgpKTtcbiAgcmV0dXJuIHtcbiAgICBpZDogaWQsXG4gICAgZGV2aWNlOiBkZXZpY2UsXG4gICAgcmVzb2x2ZTogbG9jYWxSZXNvbHZlLFxuICAgIHJlamVjdDogbG9jYWxSZWplY3QsXG4gICAgcHJvbWlzZTogcHJvbWlzZVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBc3luYyhpbm5lckZuKSB7XG4gIHZhciBsb2NhbFJlc29sdmUgPSBmdW5jdGlvbiBsb2NhbFJlc29sdmUoX3QpIHt9O1xuXG4gIHZhciBsb2NhbFJlamVjdCA9IGZ1bmN0aW9uIGxvY2FsUmVqZWN0KF9lKSB7fTtcblxuICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBsb2NhbFJlc29sdmUgPSByZXNvbHZlO1xuICAgIGxvY2FsUmVqZWN0ID0gcmVqZWN0O1xuICB9KTtcblxuICB2YXIgaW5uZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAgIHZhciBfcmVmMiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjJbXCJkZWZhdWx0XCJdKSggLyojX19QVVJFX18qL19yZWdlbmVyYXRvcltcImRlZmF1bHRcIl0ubWFyayhmdW5jdGlvbiBfY2FsbGVlMigpIHtcbiAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JbXCJkZWZhdWx0XCJdLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI7XG4gICAgICAgICAgICAgIHJldHVybiBpbm5lckZuKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBfY2FsbGVlMik7XG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlubmVyKCkge1xuICAgICAgcmV0dXJuIF9yZWYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZTogbG9jYWxSZXNvbHZlLFxuICAgIHJlamVjdDogbG9jYWxSZWplY3QsXG4gICAgcHJvbWlzZTogcHJvbWlzZSxcbiAgICBydW46IGZ1bmN0aW9uIHJ1bigpIHtcbiAgICAgIGlubmVyKCk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVUaW1lb3V0UHJvbWlzZShkZWxheSwgcmVzdWx0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgIH0sIGRlbGF5KTtcbiAgfSk7XG59XG5cbnZhciByZWplY3RUaW1lb3V0UHJvbWlzZSA9IGZ1bmN0aW9uIHJlamVjdFRpbWVvdXRQcm9taXNlKGRlbGF5LCBlcnJvcikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9LCBkZWxheSk7XG4gIH0pO1xufTtcblxuZXhwb3J0cy5yZWplY3RUaW1lb3V0UHJvbWlzZSA9IHJlamVjdFRpbWVvdXRQcm9taXNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciByZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoY2xhc3NOYW1lLCB1cmwsIG9yaWdpbikge1xuICB2YXIgcXVlcnkgPSBjbGFzc05hbWUgfHwgJy50cmV6b3Itd2VidXNiLWJ1dHRvbic7XG4gIHZhciBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSk7XG4gIHZhciBzcmMgPSB1cmwgKyBcIj9cIiArIERhdGUubm93KCk7XG4gIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYikge1xuICAgIGlmIChiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpZnJhbWUnKS5sZW5ndGggPCAxKSB7XG4gICAgICB2YXIgYm91bmRzID0gYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBidG5JZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgIGJ0bklmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcbiAgICAgIGJ0bklmcmFtZS53aWR0aCA9IE1hdGgucm91bmQoYm91bmRzLndpZHRoKSArIFwicHhcIjtcbiAgICAgIGJ0bklmcmFtZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGJvdW5kcy5oZWlnaHQpICsgXCJweFwiO1xuICAgICAgYnRuSWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGJ0bklmcmFtZS5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgIGJ0bklmcmFtZS5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgICBidG5JZnJhbWUuc3R5bGUuekluZGV4ID0gJzEnOyAvLyBidG5JZnJhbWUuc3R5bGUub3BhY2l0eSA9ICcwJzsgLy8gdGhpcyBtYWtlcyBjbGljayBpbXBvc3NpYmxlIG9uIGNyb3NzLW9yaWdpblxuXG4gICAgICBidG5JZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvdycsICd1c2InKTtcbiAgICAgIGJ0bklmcmFtZS5zZXRBdHRyaWJ1dGUoJ3Njcm9sbGluZycsICdubycpO1xuXG4gICAgICBidG5JZnJhbWUub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBidG5JZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSh7Ly8gc3R5bGU6IEpTT04uc3RyaW5naWZ5KCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShiKSApLFxuICAgICAgICAgIC8vIG91dGVyOiBiLm91dGVySFRNTCxcbiAgICAgICAgICAvLyBpbm5lcjogYi5pbm5lckhUTUxcbiAgICAgICAgfSwgb3JpZ2luKTtcbiAgICAgIH07XG5cbiAgICAgIGJ0bklmcmFtZS5zcmMgPSBzcmM7IC8vIGluamVjdCBpZnJhbWUgaW50byBidXR0b25cblxuICAgICAgYi5hcHBlbmQoYnRuSWZyYW1lKTtcbiAgICB9XG4gIH0pO1xufTtcblxudmFyIF9kZWZhdWx0ID0gcmVuZGVyO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IFVpbnQ4QXJyYXkgY3JlYXRlZCBieSBjb25jYXRlbmF0aW5nIHRoZSBwYXNzZWQgQXJyYXlMaWtlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXlMaWtlPG51bWJlcj4+fSBhcnJheXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXVxuICovXG5mdW5jdGlvbiBjb25jYXQgKGFycmF5cywgbGVuZ3RoKSB7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gYXJyYXlzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiBhY2MgKyBjdXJyLmxlbmd0aCwgMClcbiAgfVxuXG4gIGNvbnN0IG91dHB1dCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgbGV0IG9mZnNldCA9IDBcblxuICBmb3IgKGNvbnN0IGFyciBvZiBhcnJheXMpIHtcbiAgICBvdXRwdXQuc2V0KGFyciwgb2Zmc2V0KVxuICAgIG9mZnNldCArPSBhcnIubGVuZ3RoXG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uY2F0XG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBwYXNzZWQgVWludDhBcnJheXMgaGF2ZSB0aGUgc2FtZSBjb250ZW50XG4gKlxuICogQHBhcmFtIHtVaW50OEFycmF5fSBhXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJcbiAqL1xuZnVuY3Rpb24gZXF1YWxzIChhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmIChhLmJ5dGVMZW5ndGggIT09IGIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmJ5dGVMZW5ndGg7IGkrKykge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsc1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgZW5jb2Rpbmc6IGdldENvZGVjIH0gPSByZXF1aXJlKCdtdWx0aWJhc2UnKVxuY29uc3QgdXRmOEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKVxuXG4vKipcbiAqIEB0eXBlZGVmIHtfX2ltcG9ydF9fKCdtdWx0aWJhc2Uvc3JjL3R5cGVzJykuQmFzZU5hbWUgfCAndXRmOCcgfCAndXRmLTgnIHwgJ2FzY2lpJyB8IHVuZGVmaW5lZH0gU3VwcG9ydGVkRW5jb2RpbmdzXG4gKi9cblxuLyoqXG4gKiBJbnRlcnByZXRzIGVhY2ggY2hhcmFjdGVyIGluIGEgc3RyaW5nIGFzIGEgYnl0ZSBhbmRcbiAqIHJldHVybnMgYSBVaW50OEFycmF5IG9mIHRob3NlIGJ5dGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBUaGUgc3RyaW5nIHRvIHR1cm4gaW50byBhbiBhcnJheVxuICovXG5mdW5jdGlvbiBhc2NpaVN0cmluZ1RvVWludDhBcnJheSAoc3RyaW5nKSB7XG4gIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoc3RyaW5nLmxlbmd0aClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgIGFycmF5W2ldID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcbiAgfVxuXG4gIHJldHVybiBhcnJheVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGBVaW50OEFycmF5YCBmcm9tIHRoZSBwYXNzZWQgc3RyaW5nXG4gKlxuICogU3VwcG9ydHMgYHV0ZjhgLCBgdXRmLThgIGFuZCBhbnkgZW5jb2Rpbmcgc3VwcG9ydGVkIGJ5IHRoZSBtdWx0aWJhc2UgbW9kdWxlLlxuICpcbiAqIEFsc28gYGFzY2lpYCB3aGljaCBpcyBzaW1pbGFyIHRvIG5vZGUncyAnYmluYXJ5JyBlbmNvZGluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcGFyYW0ge1N1cHBvcnRlZEVuY29kaW5nc30gW2VuY29kaW5nPXV0ZjhdIC0gdXRmOCwgYmFzZTE2LCBiYXNlNjQsIGJhc2U2NHVybHBhZCwgZXRjXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX1cbiAqL1xuZnVuY3Rpb24gZnJvbVN0cmluZyAoc3RyaW5nLCBlbmNvZGluZyA9ICd1dGY4Jykge1xuICBpZiAoZW5jb2RpbmcgPT09ICd1dGY4JyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi04Jykge1xuICAgIHJldHVybiB1dGY4RW5jb2Rlci5lbmNvZGUoc3RyaW5nKVxuICB9XG5cbiAgaWYgKGVuY29kaW5nID09PSAnYXNjaWknKSB7XG4gICAgcmV0dXJuIGFzY2lpU3RyaW5nVG9VaW50OEFycmF5KHN0cmluZylcbiAgfVxuXG4gIHJldHVybiBnZXRDb2RlYyhlbmNvZGluZykuZGVjb2RlKHN0cmluZylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmcm9tU3RyaW5nXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgeyBlbmNvZGluZzogZ2V0Q29kZWMgfSA9IHJlcXVpcmUoJ211bHRpYmFzZScpXG5jb25zdCB1dGY4RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmOCcpXG5cbi8qKlxuICogQHR5cGVkZWYge19faW1wb3J0X18oJ211bHRpYmFzZS9zcmMvdHlwZXMnKS5CYXNlTmFtZSB8ICd1dGY4JyB8ICd1dGYtOCcgfCAnYXNjaWknIHwgdW5kZWZpbmVkfSBTdXBwb3J0ZWRFbmNvZGluZ3NcbiAqL1xuXG4vKipcbiAqIFR1cm5zIGEgVWludDhBcnJheSBvZiBieXRlcyBpbnRvIGEgc3RyaW5nIHdpdGggZWFjaFxuICogY2hhcmFjdGVyIGJlaW5nIHRoZSBjaGFyIGNvZGUgb2YgdGhlIGNvcnJlc3BvbmRpbmcgYnl0ZVxuICpcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgdG8gdHVybiBpbnRvIGEgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIHVpbnQ4QXJyYXlUb0FzY2lpU3RyaW5nIChhcnJheSkge1xuICBsZXQgc3RyaW5nID0gJydcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYXJyYXlbaV0pXG4gIH1cbiAgcmV0dXJuIHN0cmluZ1xufVxuXG4vKipcbiAqIFR1cm5zIGEgYFVpbnQ4QXJyYXlgIGludG8gYSBzdHJpbmcuXG4gKlxuICogU3VwcG9ydHMgYHV0ZjhgLCBgdXRmLThgIGFuZCBhbnkgZW5jb2Rpbmcgc3VwcG9ydGVkIGJ5IHRoZSBtdWx0aWJhc2UgbW9kdWxlLlxuICpcbiAqIEFsc28gYGFzY2lpYCB3aGljaCBpcyBzaW1pbGFyIHRvIG5vZGUncyAnYmluYXJ5JyBlbmNvZGluZy5cbiAqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IHRvIHR1cm4gaW50byBhIHN0cmluZ1xuICogQHBhcmFtIHtTdXBwb3J0ZWRFbmNvZGluZ3N9IFtlbmNvZGluZz11dGY4XSAtIFRoZSBlbmNvZGluZyB0byB1c2VcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nIChhcnJheSwgZW5jb2RpbmcgPSAndXRmOCcpIHtcbiAgaWYgKGVuY29kaW5nID09PSAndXRmOCcgfHwgZW5jb2RpbmcgPT09ICd1dGYtOCcpIHtcbiAgICByZXR1cm4gdXRmOERlY29kZXIuZGVjb2RlKGFycmF5KVxuICB9XG5cbiAgaWYgKGVuY29kaW5nID09PSAnYXNjaWknKSB7XG4gICAgcmV0dXJuIHVpbnQ4QXJyYXlUb0FzY2lpU3RyaW5nKGFycmF5KVxuICB9XG5cbiAgcmV0dXJuIGdldENvZGVjKGVuY29kaW5nKS5lbmNvZGUoYXJyYXkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9TdHJpbmdcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVhZFxuXG52YXIgTVNCID0gMHg4MFxuICAsIFJFU1QgPSAweDdGXG5cbmZ1bmN0aW9uIHJlYWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIHJlcyAgICA9IDBcbiAgICAsIG9mZnNldCA9IG9mZnNldCB8fCAwXG4gICAgLCBzaGlmdCAgPSAwXG4gICAgLCBjb3VudGVyID0gb2Zmc2V0XG4gICAgLCBiXG4gICAgLCBsID0gYnVmLmxlbmd0aFxuXG4gIGRvIHtcbiAgICBpZiAoY291bnRlciA+PSBsKSB7XG4gICAgICByZWFkLmJ5dGVzID0gMFxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0NvdWxkIG5vdCBkZWNvZGUgdmFyaW50JylcbiAgICB9XG4gICAgYiA9IGJ1Zltjb3VudGVyKytdXG4gICAgcmVzICs9IHNoaWZ0IDwgMjhcbiAgICAgID8gKGIgJiBSRVNUKSA8PCBzaGlmdFxuICAgICAgOiAoYiAmIFJFU1QpICogTWF0aC5wb3coMiwgc2hpZnQpXG4gICAgc2hpZnQgKz0gN1xuICB9IHdoaWxlIChiID49IE1TQilcblxuICByZWFkLmJ5dGVzID0gY291bnRlciAtIG9mZnNldFxuXG4gIHJldHVybiByZXNcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZW5jb2RlXG5cbnZhciBNU0IgPSAweDgwXG4gICwgUkVTVCA9IDB4N0ZcbiAgLCBNU0JBTEwgPSB+UkVTVFxuICAsIElOVCA9IE1hdGgucG93KDIsIDMxKVxuXG5mdW5jdGlvbiBlbmNvZGUobnVtLCBvdXQsIG9mZnNldCkge1xuICBvdXQgPSBvdXQgfHwgW11cbiAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDBcbiAgdmFyIG9sZE9mZnNldCA9IG9mZnNldFxuXG4gIHdoaWxlKG51bSA+PSBJTlQpIHtcbiAgICBvdXRbb2Zmc2V0KytdID0gKG51bSAmIDB4RkYpIHwgTVNCXG4gICAgbnVtIC89IDEyOFxuICB9XG4gIHdoaWxlKG51bSAmIE1TQkFMTCkge1xuICAgIG91dFtvZmZzZXQrK10gPSAobnVtICYgMHhGRikgfCBNU0JcbiAgICBudW0gPj4+PSA3XG4gIH1cbiAgb3V0W29mZnNldF0gPSBudW0gfCAwXG4gIFxuICBlbmNvZGUuYnl0ZXMgPSBvZmZzZXQgLSBvbGRPZmZzZXQgKyAxXG4gIFxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlbmNvZGU6IHJlcXVpcmUoJy4vZW5jb2RlLmpzJylcbiAgLCBkZWNvZGU6IHJlcXVpcmUoJy4vZGVjb2RlLmpzJylcbiAgLCBlbmNvZGluZ0xlbmd0aDogcmVxdWlyZSgnLi9sZW5ndGguanMnKVxufVxuIiwiXG52YXIgTjEgPSBNYXRoLnBvdygyLCAgNylcbnZhciBOMiA9IE1hdGgucG93KDIsIDE0KVxudmFyIE4zID0gTWF0aC5wb3coMiwgMjEpXG52YXIgTjQgPSBNYXRoLnBvdygyLCAyOClcbnZhciBONSA9IE1hdGgucG93KDIsIDM1KVxudmFyIE42ID0gTWF0aC5wb3coMiwgNDIpXG52YXIgTjcgPSBNYXRoLnBvdygyLCA0OSlcbnZhciBOOCA9IE1hdGgucG93KDIsIDU2KVxudmFyIE45ID0gTWF0aC5wb3coMiwgNjMpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdmFsdWUgPCBOMSA/IDFcbiAgOiB2YWx1ZSA8IE4yID8gMlxuICA6IHZhbHVlIDwgTjMgPyAzXG4gIDogdmFsdWUgPCBONCA/IDRcbiAgOiB2YWx1ZSA8IE41ID8gNVxuICA6IHZhbHVlIDwgTjYgPyA2XG4gIDogdmFsdWUgPCBONyA/IDdcbiAgOiB2YWx1ZSA8IE44ID8gOFxuICA6IHZhbHVlIDwgTjkgPyA5XG4gIDogICAgICAgICAgICAgIDEwXG4gIClcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbmV4cG9ydHMuVGV4dEVuY29kZXIgPVxuICB0eXBlb2YgVGV4dEVuY29kZXIgIT09IFwidW5kZWZpbmVkXCIgPyBUZXh0RW5jb2RlciA6IHJlcXVpcmUoXCJ1dGlsXCIpLlRleHRFbmNvZGVyXG5cbmV4cG9ydHMuVGV4dERlY29kZXIgPVxuICB0eXBlb2YgVGV4dERlY29kZXIgIT09IFwidW5kZWZpbmVkXCIgPyBUZXh0RGVjb2RlciA6IHJlcXVpcmUoXCJ1dGlsXCIpLlRleHREZWNvZGVyXG4iLCJleHBvcnQgY29uc3QgQVVUT19MT0NLX1RJTUVPVVRfQUxBUk0gPSAnQVVUT19MT0NLX1RJTUVPVVRfQUxBUk0nO1xuZXhwb3J0IGNvbnN0IE1FVEFNRVRSSUNTX0ZJTkFMSVpFX0VWRU5UX0ZSQUdNRU5UX0FMQVJNID1cbiAgJ01FVEFNRVRSSUNTX0ZJTkFMSVpFX0VWRU5UX0ZSQUdNRU5UX0FMQVJNJztcbiIsImV4cG9ydCBjb25zdCBQSElTSElOR19ORVdfSVNTVUVfVVJMUyA9IHtcclxuICBNZXRhTWFzazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9tZXRhbWFzay9ldGgtcGhpc2hpbmctZGV0ZWN0L2lzc3Vlcy9uZXcnLFxyXG4gIFBoaXNoRm9ydDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9waGlzaGZvcnQvcGhpc2hmb3J0LWxpc3RzL2lzc3Vlcy9uZXcnLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBTRUNPTkQgfSBmcm9tICcuL3RpbWUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEZBTExCQUNLX1NNQVJUX1RSQU5TQUNUSU9OU19SRUZSRVNIX1RJTUUgPSBTRUNPTkQgKiAxMDtcclxuZXhwb3J0IGNvbnN0IEZBTExCQUNLX1NNQVJUX1RSQU5TQUNUSU9OU19ERUFETElORSA9IDE4MDtcclxuZXhwb3J0IGNvbnN0IEZBTExCQUNLX1NNQVJUX1RSQU5TQUNUSU9OU19NQVhfRkVFX01VTFRJUExJRVIgPSAyO1xyXG4iLCIvKipcbiAqIEBmaWxlIFRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIHdlYiBleHRlbnNpb24gc2luZ2xldG9uIHByb2Nlc3MuXG4gKi9cblxuaW1wb3J0IGVuZE9mU3RyZWFtIGZyb20gJ2VuZC1vZi1zdHJlYW0nO1xuaW1wb3J0IHB1bXAgZnJvbSAncHVtcCc7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnZGVib3VuY2Utc3RyZWFtJztcbmltcG9ydCBsb2cgZnJvbSAnbG9nbGV2ZWwnO1xuaW1wb3J0IGJyb3dzZXIgZnJvbSAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJztcbmltcG9ydCB7IHN0b3JlQXNTdHJlYW0gfSBmcm9tICdAbWV0YW1hc2svb2JzLXN0b3JlJztcbmltcG9ydCBQb3J0U3RyZWFtIGZyb20gJ2V4dGVuc2lvbi1wb3J0LXN0cmVhbSc7XG5cbmltcG9ydCB7IGV0aEVycm9ycyB9IGZyb20gJ2V0aC1ycGMtZXJyb3JzJztcbmltcG9ydCB7XG4gIEVOVklST05NRU5UX1RZUEVfUE9QVVAsXG4gIEVOVklST05NRU5UX1RZUEVfTk9USUZJQ0FUSU9OLFxuICBFTlZJUk9OTUVOVF9UWVBFX0ZVTExTQ1JFRU4sXG4gIFBMQVRGT1JNX0ZJUkVGT1gsXG59IGZyb20gJy4uLy4uL3NoYXJlZC9jb25zdGFudHMvYXBwJztcbmltcG9ydCB7IFNFQ09ORCB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb25zdGFudHMvdGltZSc7XG5pbXBvcnQge1xuICBSRUpFQ1RfTk9URklDSUFUSU9OX0NMT1NFLFxuICBSRUpFQ1RfTk9URklDSUFUSU9OX0NMT1NFX1NJRyxcbiAgRVZFTlQsXG4gIEVWRU5UX05BTUVTLFxuICBUUkFJVFMsXG59IGZyb20gJy4uLy4uL3NoYXJlZC9jb25zdGFudHMvbWV0YW1ldHJpY3MnO1xuaW1wb3J0IHsgaXNNYW5pZmVzdFYzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvbXYzLnV0aWxzJztcbmltcG9ydCB7IG1hc2tPYmplY3QgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy9vYmplY3QudXRpbHMnO1xuaW1wb3J0IG1pZ3JhdGlvbnMgZnJvbSAnLi9taWdyYXRpb25zJztcbmltcG9ydCBNaWdyYXRvciBmcm9tICcuL2xpYi9taWdyYXRvcic7XG5pbXBvcnQgRXh0ZW5zaW9uUGxhdGZvcm0gZnJvbSAnLi9wbGF0Zm9ybXMvZXh0ZW5zaW9uJztcbmltcG9ydCBMb2NhbFN0b3JlIGZyb20gJy4vbGliL2xvY2FsLXN0b3JlJztcbmltcG9ydCBSZWFkT25seU5ldHdvcmtTdG9yZSBmcm9tICcuL2xpYi9uZXR3b3JrLXN0b3JlJztcbmltcG9ydCB7IFNFTlRSWV9TVEFURSB9IGZyb20gJy4vbGliL3NldHVwU2VudHJ5JztcblxuaW1wb3J0IGNyZWF0ZVN0cmVhbVNpbmsgZnJvbSAnLi9saWIvY3JlYXRlU3RyZWFtU2luayc7XG5pbXBvcnQgTm90aWZpY2F0aW9uTWFuYWdlciwge1xuICBOT1RJRklDQVRJT05fTUFOQUdFUl9FVkVOVFMsXG59IGZyb20gJy4vbGliL25vdGlmaWNhdGlvbi1tYW5hZ2VyJztcbmltcG9ydCBNZXRhbWFza0NvbnRyb2xsZXIsIHtcbiAgTUVUQU1BU0tfQ09OVFJPTExFUl9FVkVOVFMsXG59IGZyb20gJy4vbWV0YW1hc2stY29udHJvbGxlcic7XG5pbXBvcnQgcmF3Rmlyc3RUaW1lU3RhdGUgZnJvbSAnLi9maXJzdC10aW1lLXN0YXRlJztcbmltcG9ydCBnZXRGaXJzdFByZWZlcnJlZExhbmdDb2RlIGZyb20gJy4vbGliL2dldC1maXJzdC1wcmVmZXJyZWQtbGFuZy1jb2RlJztcbmltcG9ydCBnZXRPYmpTdHJ1Y3R1cmUgZnJvbSAnLi9saWIvZ2V0T2JqU3RydWN0dXJlJztcbmltcG9ydCBzZXR1cEVuc0lwZnNSZXNvbHZlciBmcm9tICcuL2xpYi9lbnMtaXBmcy9zZXR1cCc7XG5pbXBvcnQgeyBnZXRQbGF0Zm9ybSB9IGZyb20gJy4vbGliL3V0aWwnO1xuLyogZXNsaW50LWVuYWJsZSBpbXBvcnQvZmlyc3QgKi9cblxuY29uc3QgeyBzZW50cnkgfSA9IGdsb2JhbDtcbmNvbnN0IGZpcnN0VGltZVN0YXRlID0geyAuLi5yYXdGaXJzdFRpbWVTdGF0ZSB9O1xuXG5jb25zdCBtZXRhbWFza0ludGVybmFsUHJvY2Vzc0hhc2ggPSB7XG4gIFtFTlZJUk9OTUVOVF9UWVBFX1BPUFVQXTogdHJ1ZSxcbiAgW0VOVklST05NRU5UX1RZUEVfTk9USUZJQ0FUSU9OXTogdHJ1ZSxcbiAgW0VOVklST05NRU5UX1RZUEVfRlVMTFNDUkVFTl06IHRydWUsXG59O1xuXG5jb25zdCBtZXRhbWFza0Jsb2NrZWRQb3J0cyA9IFsndHJlem9yLWNvbm5lY3QnXTtcblxubG9nLnNldERlZmF1bHRMZXZlbChwcm9jZXNzLmVudi5NRVRBTUFTS19ERUJVRyA/ICdkZWJ1ZycgOiAnaW5mbycpO1xuXG5jb25zdCBwbGF0Zm9ybSA9IG5ldyBFeHRlbnNpb25QbGF0Zm9ybSgpO1xuXG5jb25zdCBub3RpZmljYXRpb25NYW5hZ2VyID0gbmV3IE5vdGlmaWNhdGlvbk1hbmFnZXIoKTtcbmdsb2JhbC5NRVRBTUFTS19OT1RJRklFUiA9IG5vdGlmaWNhdGlvbk1hbmFnZXI7XG5cbmxldCBwb3B1cElzT3BlbiA9IGZhbHNlO1xubGV0IG5vdGlmaWNhdGlvbklzT3BlbiA9IGZhbHNlO1xubGV0IHVpSXNUcmlnZ2VyaW5nID0gZmFsc2U7XG5jb25zdCBvcGVuTWV0YW1hc2tUYWJzSURzID0ge307XG5jb25zdCByZXF1ZXN0QWNjb3VudFRhYklkcyA9IHt9O1xubGV0IGNvbnRyb2xsZXI7XG5cbi8vIHN0YXRlIHBlcnNpc3RlbmNlXG5jb25zdCBpblRlc3QgPSBwcm9jZXNzLmVudi5JTl9URVNUO1xuY29uc3QgbG9jYWxTdG9yZSA9IGluVGVzdCA/IG5ldyBSZWFkT25seU5ldHdvcmtTdG9yZSgpIDogbmV3IExvY2FsU3RvcmUoKTtcbmxldCB2ZXJzaW9uZWREYXRhO1xuXG5pZiAoaW5UZXN0IHx8IHByb2Nlc3MuZW52Lk1FVEFNQVNLX0RFQlVHKSB7XG4gIGdsb2JhbC5zdGF0ZUhvb2tzLm1ldGFtYXNrR2V0U3RhdGUgPSBsb2NhbFN0b3JlLmdldC5iaW5kKGxvY2FsU3RvcmUpO1xufVxuXG5jb25zdCBwaGlzaGluZ1BhZ2VVcmwgPSBuZXcgVVJMKHByb2Nlc3MuZW52LlBISVNISU5HX1dBUk5JTkdfUEFHRV9VUkwpO1xuXG5jb25zdCBPTkVfU0VDT05EX0lOX01JTExJU0VDT05EUyA9IDFfMDAwO1xuLy8gVGltZW91dCBmb3IgaW5pdGlhbGl6aW5nIHBoaXNoaW5nIHdhcm5pbmcgcGFnZS5cbmNvbnN0IFBISVNISU5HX1dBUk5JTkdfUEFHRV9USU1FT1VUID0gT05FX1NFQ09ORF9JTl9NSUxMSVNFQ09ORFM7XG5cbmNvbnN0IEFDS19LRUVQX0FMSVZFX01FU1NBR0UgPSAnQUNLX0tFRVBfQUxJVkVfTUVTU0FHRSc7XG5jb25zdCBXT1JLRVJfS0VFUF9BTElWRV9NRVNTQUdFID0gJ1dPUktFUl9LRUVQX0FMSVZFX01FU1NBR0UnO1xuXG4vKipcbiAqIEluIGNhc2Ugb2YgTVYzIHdlIGF0dGFjaCBhIFwib25Db25uZWN0XCIgZXZlbnQgbGlzdGVuZXIgYXMgc29vbiBhcyB0aGUgYXBwbGljYXRpb24gaXMgaW5pdGlhbGlzZWQuXG4gKiBSZWFzb24gaXMgdGhhdCBpbiBjYXNlIG9mIE1WMyBhIGRlbGF5IGluIGRvaW5nIHRoaXMgd2FzIHJlc3VsdGluZyBpbiBtaXNzaW5nIGZpcnN0IGNvbm5lY3QgZXZlbnQgYWZ0ZXIgc2VydmljZSB3b3JrZXIgaXMgcmUtYWN0aXZhdGVkLlxuICovXG5cbmNvbnN0IGluaXRBcHAgPSBhc3luYyAocmVtb3RlUG9ydCkgPT4ge1xuICBicm93c2VyLnJ1bnRpbWUub25Db25uZWN0LnJlbW92ZUxpc3RlbmVyKGluaXRBcHApO1xuICBhd2FpdCBpbml0aWFsaXplKHJlbW90ZVBvcnQpO1xuICBsb2cuaW5mbygnTWV0YU1hc2sgaW5pdGlhbGl6YXRpb24gY29tcGxldGUuJyk7XG59O1xuXG5pZiAoaXNNYW5pZmVzdFYzKSB7XG4gIGJyb3dzZXIucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoaW5pdEFwcCk7XG59IGVsc2Uge1xuICAvLyBpbml0aWFsaXphdGlvbiBmbG93XG4gIGluaXRpYWxpemUoKS5jYXRjaChsb2cuZXJyb3IpO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4uLy4uL3NoYXJlZC9jb25zdGFudHMvdHJhbnNhY3Rpb24nKS5UcmFuc2FjdGlvbk1ldGF9IFRyYW5zYWN0aW9uTWV0YVxuICovXG5cbi8qKlxuICogVGhlIGRhdGEgZW1pdHRlZCBmcm9tIHRoZSBNZXRhTWFza0NvbnRyb2xsZXIuc3RvcmUgRXZlbnRFbWl0dGVyLCBhbHNvIHVzZWQgdG8gaW5pdGlhbGl6ZSB0aGUgTWV0YU1hc2tDb250cm9sbGVyLiBBdmFpbGFibGUgaW4gVUkgb24gUmVhY3Qgc3RhdGUgYXMgc3RhdGUubWV0YW1hc2suXG4gKlxuICogQHR5cGVkZWYgTWV0YU1hc2tTdGF0ZVxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0luaXRpYWxpemVkIC0gV2hldGhlciB0aGUgZmlyc3QgdmF1bHQgaGFzIGJlZW4gY3JlYXRlZC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNVbmxvY2tlZCAtIFdoZXRoZXIgdGhlIHZhdWx0IGlzIGN1cnJlbnRseSBkZWNyeXB0ZWQgYW5kIGFjY291bnRzIGFyZSBhdmFpbGFibGUgZm9yIHNlbGVjdGlvbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNBY2NvdW50TWVudU9wZW4gLSBSZXByZXNlbnRzIHdoZXRoZXIgdGhlIG1haW4gYWNjb3VudCBzZWxlY3Rpb24gVUkgaXMgY3VycmVudGx5IGRpc3BsYXllZC5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBpZGVudGl0aWVzIC0gQW4gb2JqZWN0IG1hdGNoaW5nIGxvd2VyLWNhc2UgaGV4IGFkZHJlc3NlcyB0byBJZGVudGl0eSBvYmplY3RzIHdpdGggXCJhZGRyZXNzXCIgYW5kIFwibmFtZVwiIChuaWNrbmFtZSkga2V5cy5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB1bmFwcHJvdmVkVHhzIC0gQW4gb2JqZWN0IG1hcHBpbmcgdHJhbnNhY3Rpb24gaGFzaGVzIHRvIHVuYXBwcm92ZWQgdHJhbnNhY3Rpb25zLlxuICogQHByb3BlcnR5IHtBcnJheX0gZnJlcXVlbnRScGNMaXN0IC0gQSBsaXN0IG9mIGZyZXF1ZW50bHkgdXNlZCBSUENzLCBpbmNsdWRpbmcgY3VzdG9tIHVzZXItcHJvdmlkZWQgb25lcy5cbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IGFkZHJlc3NCb29rIC0gQSBsaXN0IG9mIHByZXZpb3VzbHkgc2VudCB0byBhZGRyZXNzZXMuXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29udHJhY3RFeGNoYW5nZVJhdGVzIC0gSW5mbyBhYm91dCBjdXJyZW50IHRva2VuIHByaWNlcy5cbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IHRva2VucyAtIFRva2VucyBoZWxkIGJ5IHRoZSBjdXJyZW50IHVzZXIsIGluY2x1ZGluZyB0aGVpciBiYWxhbmNlcy5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzZW5kIC0gVE9ETzogRG9jdW1lbnRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdXNlQmxvY2tpZSAtIEluZGljYXRlcyBwcmVmZXJyZWQgdXNlciBpZGVudGljb24gZm9ybWF0LiBUcnVlIGZvciBibG9ja2llLCBmYWxzZSBmb3IgSmF6emljb24uXG4gKiBAcHJvcGVydHkge29iamVjdH0gZmVhdHVyZUZsYWdzIC0gQW4gb2JqZWN0IGZvciBvcHRpb25hbCBmZWF0dXJlIGZsYWdzLlxuICogQHByb3BlcnR5IHtib29sZWFufSB3ZWxjb21lU2NyZWVuIC0gVHJ1ZSBpZiB3ZWxjb21lIHNjcmVlbiBzaG91bGQgYmUgc2hvd24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3VycmVudExvY2FsZSAtIEEgbG9jYWxlIHN0cmluZyBtYXRjaGluZyB0aGUgdXNlcidzIHByZWZlcnJlZCBkaXNwbGF5IGxhbmd1YWdlLlxuICogQHByb3BlcnR5IHtvYmplY3R9IHByb3ZpZGVyIC0gVGhlIGN1cnJlbnQgc2VsZWN0ZWQgbmV0d29yayBwcm92aWRlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwcm92aWRlci5ycGNVcmwgLSBUaGUgYWRkcmVzcyBmb3IgdGhlIFJQQyBBUEksIGlmIHVzaW5nIGFuIFJQQyBBUEkuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcHJvdmlkZXIudHlwZSAtIEFuIGlkZW50aWZpZXIgZm9yIHRoZSB0eXBlIG9mIG5ldHdvcmsgc2VsZWN0ZWQsIGFsbG93cyBNZXRhTWFzayB0byB1c2UgY3VzdG9tIHByb3ZpZGVyIHN0cmF0ZWdpZXMgZm9yIGtub3duIG5ldHdvcmtzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5ldHdvcmsgLSBBIHN0cmluZ2lmaWVkIG51bWJlciBvZiB0aGUgY3VycmVudCBuZXR3b3JrIElELlxuICogQHByb3BlcnR5IHtvYmplY3R9IGFjY291bnRzIC0gQW4gb2JqZWN0IG1hcHBpbmcgbG93ZXItY2FzZSBoZXggYWRkcmVzc2VzIHRvIG9iamVjdHMgd2l0aCBcImJhbGFuY2VcIiBhbmQgXCJhZGRyZXNzXCIga2V5cywgYm90aCBzdG9yaW5nIGhleCBzdHJpbmcgdmFsdWVzLlxuICogQHByb3BlcnR5IHtoZXh9IGN1cnJlbnRCbG9ja0dhc0xpbWl0IC0gVGhlIG1vc3QgcmVjZW50bHkgc2VlbiBibG9jayBnYXMgbGltaXQsIGluIGEgbG93ZXIgY2FzZSBoZXggcHJlZml4ZWQgc3RyaW5nLlxuICogQHByb3BlcnR5IHtUcmFuc2FjdGlvbk1ldGFbXX0gY3VycmVudE5ldHdvcmtUeExpc3QgLSBBbiBhcnJheSBvZiB0cmFuc2FjdGlvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgbmV0d29yay5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB1bmFwcHJvdmVkTXNncyAtIEFuIG9iamVjdCBvZiBtZXNzYWdlcyBwZW5kaW5nIGFwcHJvdmFsLCBtYXBwaW5nIGEgdW5pcXVlIElEIHRvIHRoZSBvcHRpb25zLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVuYXBwcm92ZWRNc2dDb3VudCAtIFRoZSBudW1iZXIgb2YgbWVzc2FnZXMgaW4gdW5hcHByb3ZlZE1zZ3MuXG4gKiBAcHJvcGVydHkge29iamVjdH0gdW5hcHByb3ZlZFBlcnNvbmFsTXNncyAtIEFuIG9iamVjdCBvZiBtZXNzYWdlcyBwZW5kaW5nIGFwcHJvdmFsLCBtYXBwaW5nIGEgdW5pcXVlIElEIHRvIHRoZSBvcHRpb25zLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVuYXBwcm92ZWRQZXJzb25hbE1zZ0NvdW50IC0gVGhlIG51bWJlciBvZiBtZXNzYWdlcyBpbiB1bmFwcHJvdmVkUGVyc29uYWxNc2dzLlxuICogQHByb3BlcnR5IHtvYmplY3R9IHVuYXBwcm92ZWRFbmNyeXB0aW9uUHVibGljS2V5TXNncyAtIEFuIG9iamVjdCBvZiBtZXNzYWdlcyBwZW5kaW5nIGFwcHJvdmFsLCBtYXBwaW5nIGEgdW5pcXVlIElEIHRvIHRoZSBvcHRpb25zLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVuYXBwcm92ZWRFbmNyeXB0aW9uUHVibGljS2V5TXNnQ291bnQgLSBUaGUgbnVtYmVyIG9mIG1lc3NhZ2VzIGluIEVuY3J5cHRpb25QdWJsaWNLZXlNc2dzLlxuICogQHByb3BlcnR5IHtvYmplY3R9IHVuYXBwcm92ZWREZWNyeXB0TXNncyAtIEFuIG9iamVjdCBvZiBtZXNzYWdlcyBwZW5kaW5nIGFwcHJvdmFsLCBtYXBwaW5nIGEgdW5pcXVlIElEIHRvIHRoZSBvcHRpb25zLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVuYXBwcm92ZWREZWNyeXB0TXNnQ291bnQgLSBUaGUgbnVtYmVyIG9mIG1lc3NhZ2VzIGluIHVuYXBwcm92ZWREZWNyeXB0TXNncy5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB1bmFwcHJvdmVkVHlwZWRNc2dzIC0gQW4gb2JqZWN0IG9mIG1lc3NhZ2VzIHBlbmRpbmcgYXBwcm92YWwsIG1hcHBpbmcgYSB1bmlxdWUgSUQgdG8gdGhlIG9wdGlvbnMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gdW5hcHByb3ZlZFR5cGVkTXNnQ291bnQgLSBUaGUgbnVtYmVyIG9mIG1lc3NhZ2VzIGluIHVuYXBwcm92ZWRUeXBlZE1zZ3MuXG4gKiBAcHJvcGVydHkge251bWJlcn0gcGVuZGluZ0FwcHJvdmFsQ291bnQgLSBUaGUgbnVtYmVyIG9mIHBlbmRpbmcgcmVxdWVzdCBpbiB0aGUgYXBwcm92YWwgY29udHJvbGxlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGtleXJpbmdUeXBlcyAtIEFuIGFycmF5IG9mIHVuaXF1ZSBrZXlyaW5nIGlkZW50aWZ5aW5nIHN0cmluZ3MsIHJlcHJlc2VudGluZyBhdmFpbGFibGUgc3RyYXRlZ2llcyBmb3IgY3JlYXRpbmcgYWNjb3VudHMuXG4gKiBAcHJvcGVydHkge0tleXJpbmdbXX0ga2V5cmluZ3MgLSBBbiBhcnJheSBvZiBrZXlyaW5nIGRlc2NyaXB0aW9ucywgc3VtbWFyaXppbmcgdGhlIGFjY291bnRzIHRoYXQgYXJlIGF2YWlsYWJsZSBmb3IgdXNlLCBhbmQgd2hhdCBrZXlyaW5ncyB0aGV5IGJlbG9uZyB0by5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWxlY3RlZEFkZHJlc3MgLSBBIGxvd2VyIGNhc2UgaGV4IHN0cmluZyBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGFkZHJlc3MuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3VycmVudEN1cnJlbmN5IC0gQSBzdHJpbmcgaWRlbnRpZnlpbmcgdGhlIHVzZXIncyBwcmVmZXJyZWQgZGlzcGxheSBjdXJyZW5jeSwgZm9yIHVzZSBpbiBzaG93aW5nIGNvbnZlcnNpb24gcmF0ZXMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY29udmVyc2lvblJhdGUgLSBBIG51bWJlciByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgZXhjaGFuZ2UgcmF0ZSBmcm9tIHRoZSB1c2VyJ3MgcHJlZmVycmVkIGN1cnJlbmN5IHRvIEV0aGVyLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbnZlcnNpb25EYXRlIC0gQSB1bml4IGVwb2NoIGRhdGUgKG1zKSBmb3IgdGhlIHRpbWUgdGhlIGN1cnJlbnQgY29udmVyc2lvbiByYXRlIHdhcyBsYXN0IHJldHJpZXZlZC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZm9yZ290dGVuUGFzc3dvcmQgLSBSZXR1cm5zIHRydWUgaWYgdGhlIHVzZXIgaGFzIGluaXRpYXRlZCB0aGUgcGFzc3dvcmQgcmVjb3Zlcnkgc2NyZWVuLCBpcyByZWNvdmVyaW5nIGZyb20gc2VlZCBwaHJhc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiBWZXJzaW9uZWREYXRhXG4gKiBAcHJvcGVydHkge01ldGFNYXNrU3RhdGV9IGRhdGEgLSBUaGUgZGF0YSBlbWl0dGVkIGZyb20gTWV0YU1hc2sgY29udHJvbGxlciwgb3IgdXNlZCB0byBpbml0aWFsaXplIGl0LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHZlcnNpb24gLSBUaGUgbGF0ZXN0IG1pZ3JhdGlvbiB2ZXJzaW9uIHRoYXQgaGFzIGJlZW4gcnVuLlxuICovXG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIE1ldGFNYXNrIGNvbnRyb2xsZXIsIGFuZCBzZXRzIHVwIGFsbCBwbGF0Zm9ybSBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZW1vdGVQb3J0IC0gcmVtb3RlIGFwcGxpY2F0aW9uIHBvcnQgY29ubmVjdGluZyB0byBleHRlbnNpb24uXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gU2V0dXAgY29tcGxldGUuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUocmVtb3RlUG9ydCkge1xuICBjb25zdCBpbml0U3RhdGUgPSBhd2FpdCBsb2FkU3RhdGVGcm9tUGVyc2lzdGVuY2UoKTtcbiAgY29uc3QgaW5pdExhbmdDb2RlID0gYXdhaXQgZ2V0Rmlyc3RQcmVmZXJyZWRMYW5nQ29kZSgpO1xuICBzZXR1cENvbnRyb2xsZXIoaW5pdFN0YXRlLCBpbml0TGFuZ0NvZGUsIHJlbW90ZVBvcnQpO1xuICBpZiAoIWlzTWFuaWZlc3RWMykge1xuICAgIGF3YWl0IGxvYWRQaGlzaGluZ1dhcm5pbmdQYWdlKCk7XG4gIH1cbiAgbG9nLmluZm8oJ01ldGFNYXNrIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlLicpO1xufVxuXG4vKipcbiAqIEFuIGVycm9yIHRocm93biBpZiB0aGUgcGhpc2hpbmcgd2FybmluZyBwYWdlIHRha2VzIHRvbyBsb25nIHRvIGxvYWQuXG4gKi9cbmNsYXNzIFBoaXNoaW5nV2FybmluZ1BhZ2VUaW1lb3V0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdUaW1lb3V0IGZhaWxlZCcpO1xuICB9XG59XG5cbi8qKlxuICogTG9hZCB0aGUgcGhpc2hpbmcgd2FybmluZyBwYWdlIHRlbXBvcmFyaWx5IHRvIGVuc3VyZSB0aGUgc2VydmljZVxuICogd29ya2VyIGhhcyBiZWVuIHJlZ2lzdGVyZWQsIHNvIHRoYXQgdGhlIHdhcm5pbmcgcGFnZSB3b3JrcyBvZmZsaW5lLlxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkUGhpc2hpbmdXYXJuaW5nUGFnZSgpIHtcbiAgbGV0IGlmcmFtZTtcbiAgdHJ5IHtcbiAgICBjb25zdCBleHRlbnNpb25TdGFydHVwUGhpc2hpbmdQYWdlVXJsID0gbmV3IFVSTChcbiAgICAgIHByb2Nlc3MuZW52LlBISVNISU5HX1dBUk5JTkdfUEFHRV9VUkwsXG4gICAgKTtcbiAgICAvLyBUaGUgYGV4dGVuc2lvblN0YXJ0dXBgIGhhc2ggc2lnbmFscyB0byB0aGUgcGhpc2hpbmcgd2FybmluZyBwYWdlIHRoYXQgaXQgc2hvdWxkIG5vdCBib3RoZXJcbiAgICAvLyBzZXR0aW5nIHVwIHN0cmVhbXMgZm9yIHVzZXIgaW50ZXJhY3Rpb24uIE90aGVyd2lzZSB0aGlzIHBhZ2UgbG9hZCB3b3VsZCBjYXVzZSBhIGNvbnNvbGVcbiAgICAvLyBlcnJvci5cbiAgICBleHRlbnNpb25TdGFydHVwUGhpc2hpbmdQYWdlVXJsLmhhc2ggPSAnI2V4dGVuc2lvblN0YXJ0dXAnO1xuXG4gICAgaWZyYW1lID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGV4dGVuc2lvblN0YXJ0dXBQaGlzaGluZ1BhZ2VVcmwuaHJlZik7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc2FuZGJveCcsICdhbGxvdy1zY3JpcHRzIGFsbG93LXNhbWUtb3JpZ2luJyk7XG5cbiAgICAvLyBDcmVhdGUgXCJkZWZlcnJlZCBQcm9taXNlXCIgdG8gYWxsb3cgcGFzc2luZyByZXNvbHZlL3JlamVjdCB0byBldmVudCBoYW5kbGVyc1xuICAgIGxldCBkZWZlcnJlZFJlc29sdmU7XG4gICAgbGV0IGRlZmVycmVkUmVqZWN0O1xuICAgIGNvbnN0IGxvYWRDb21wbGV0ZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRlZmVycmVkUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICBkZWZlcnJlZFJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcblxuICAgIC8vIFRoZSBsb2FkIGV2ZW50IGlzIGVtaXR0ZWQgb25jZSBsb2FkaW5nIGhhcyBjb21wbGV0ZWQsIGV2ZW4gaWYgdGhlIGxvYWRpbmcgZmFpbGVkLlxuICAgIC8vIElmIGxvYWRpbmcgZmFpbGVkIHdlIGNhbid0IGRvIGFueXRoaW5nIGFib3V0IGl0LCBzbyB3ZSBkb24ndCBuZWVkIHRvIGNoZWNrLlxuICAgIGlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZGVmZXJyZWRSZXNvbHZlKTtcblxuICAgIC8vIFRoaXMgc3RlcCBpbml0aWF0ZXMgdGhlIHBhZ2UgbG9hZGluZy5cbiAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuXG4gICAgLy8gVGhpcyB0aW1lb3V0IGVuc3VyZXMgdGhhdCB0aGlzIGlmcmFtZSBnZXRzIGNsZWFuZWQgdXAgaW4gYSByZWFzb25hYmxlXG4gICAgLy8gdGltZWZyYW1lLCBhbmQgZW5zdXJlcyB0aGF0IHRoZSBcImluaXRpYWxpemF0aW9uIGNvbXBsZXRlXCIgbWVzc2FnZVxuICAgIC8vIGRvZXNuJ3QgZ2V0IGRlbGF5ZWQgdG9vIGxvbmcuXG4gICAgc2V0VGltZW91dChcbiAgICAgICgpID0+IGRlZmVycmVkUmVqZWN0KG5ldyBQaGlzaGluZ1dhcm5pbmdQYWdlVGltZW91dEVycm9yKCkpLFxuICAgICAgUEhJU0hJTkdfV0FSTklOR19QQUdFX1RJTUVPVVQsXG4gICAgKTtcbiAgICBhd2FpdCBsb2FkQ29tcGxldGU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUGhpc2hpbmdXYXJuaW5nUGFnZVRpbWVvdXRFcnJvcikge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnUGhpc2hpbmcgd2FybmluZyBwYWdlIHRpbWVvdXQ7IHBhZ2Ugbm90IGd1YXJhbmV0ZWVkIHRvIHdvcmsgb2ZmbGluZS4nLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGluaXRpYWxpemUgcGhpc2hpbmcgd2FybmluZyBwYWdlJywgZXJyb3IpO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoaWZyYW1lKSB7XG4gICAgICBpZnJhbWUucmVtb3ZlKCk7XG4gICAgfVxuICB9XG59XG5cbi8vXG4vLyBTdGF0ZSBhbmQgUGVyc2lzdGVuY2Vcbi8vXG5cbi8qKlxuICogTG9hZHMgYW55IHN0b3JlZCBkYXRhLCBwcmlvcml0aXppbmcgdGhlIGxhdGVzdCBzdG9yYWdlIHN0cmF0ZWd5LlxuICogTWlncmF0ZXMgdGhhdCBkYXRhIHNjaGVtYSBpbiBjYXNlIGl0IHdhcyBsYXN0IGxvYWRlZCBvbiBhbiBvbGRlciB2ZXJzaW9uLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPE1ldGFNYXNrU3RhdGU+fSBMYXN0IGRhdGEgZW1pdHRlZCBmcm9tIHByZXZpb3VzIGluc3RhbmNlIG9mIE1ldGFNYXNrLlxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkU3RhdGVGcm9tUGVyc2lzdGVuY2UoKSB7XG4gIC8vIG1pZ3JhdGlvbnNcbiAgY29uc3QgbWlncmF0b3IgPSBuZXcgTWlncmF0b3IoeyBtaWdyYXRpb25zIH0pO1xuICBtaWdyYXRvci5vbignZXJyb3InLCBjb25zb2xlLndhcm4pO1xuXG4gIC8vIHJlYWQgZnJvbSBkaXNrXG4gIC8vIGZpcnN0IGZyb20gcHJlZmVycmVkLCBhc3luYyBBUEk6XG4gIHZlcnNpb25lZERhdGEgPVxuICAgIChhd2FpdCBsb2NhbFN0b3JlLmdldCgpKSB8fCBtaWdyYXRvci5nZW5lcmF0ZUluaXRpYWxTdGF0ZShmaXJzdFRpbWVTdGF0ZSk7XG5cbiAgLy8gY2hlY2sgaWYgc29tZWhvdyBzdGF0ZSBpcyBlbXB0eVxuICAvLyB0aGlzIHNob3VsZCBuZXZlciBoYXBwZW4gYnV0IG5ldyBlcnJvciByZXBvcnRpbmcgc3VnZ2VzdHMgdGhhdCBpdCBoYXNcbiAgLy8gZm9yIGEgc21hbGwgbnVtYmVyIG9mIHVzZXJzXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRhbWFzay9tZXRhbWFzay1leHRlbnNpb24vaXNzdWVzLzM5MTlcbiAgaWYgKHZlcnNpb25lZERhdGEgJiYgIXZlcnNpb25lZERhdGEuZGF0YSkge1xuICAgIC8vIHVuYWJsZSB0byByZWNvdmVyLCBjbGVhciBzdGF0ZVxuICAgIHZlcnNpb25lZERhdGEgPSBtaWdyYXRvci5nZW5lcmF0ZUluaXRpYWxTdGF0ZShmaXJzdFRpbWVTdGF0ZSk7XG4gICAgc2VudHJ5LmNhcHR1cmVNZXNzYWdlKCdNZXRhTWFzayAtIEVtcHR5IHZhdWx0IGZvdW5kIC0gdW5hYmxlIHRvIHJlY292ZXInKTtcbiAgfVxuXG4gIC8vIHJlcG9ydCBtaWdyYXRpb24gZXJyb3JzIHRvIHNlbnRyeVxuICBtaWdyYXRvci5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgLy8gZ2V0IHZhdWx0IHN0cnVjdHVyZSB3aXRob3V0IHNlY3JldHNcbiAgICBjb25zdCB2YXVsdFN0cnVjdHVyZSA9IGdldE9ialN0cnVjdHVyZSh2ZXJzaW9uZWREYXRhKTtcbiAgICBzZW50cnkuY2FwdHVyZUV4Y2VwdGlvbihlcnIsIHtcbiAgICAgIC8vIFwiZXh0cmFcIiBrZXkgaXMgcmVxdWlyZWQgYnkgU2VudHJ5XG4gICAgICBleHRyYTogeyB2YXVsdFN0cnVjdHVyZSB9LFxuICAgIH0pO1xuICB9KTtcblxuICAvLyBtaWdyYXRlIGRhdGFcbiAgdmVyc2lvbmVkRGF0YSA9IGF3YWl0IG1pZ3JhdG9yLm1pZ3JhdGVEYXRhKHZlcnNpb25lZERhdGEpO1xuICBpZiAoIXZlcnNpb25lZERhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGFNYXNrIC0gbWlncmF0b3IgcmV0dXJuZWQgdW5kZWZpbmVkJyk7XG4gIH1cbiAgLy8gdGhpcyBpbml0aWFsaXplcyB0aGUgbWV0YS92ZXJzaW9uIGRhdGEgYXMgYSBjbGFzcyB2YXJpYWJsZSB0byBiZSB1c2VkIGZvciBmdXR1cmUgd3JpdGVzXG4gIGxvY2FsU3RvcmUuc2V0TWV0YWRhdGEodmVyc2lvbmVkRGF0YS5tZXRhKTtcblxuICAvLyB3cml0ZSB0byBkaXNrXG4gIGxvY2FsU3RvcmUuc2V0KHZlcnNpb25lZERhdGEuZGF0YSk7XG5cbiAgLy8gcmV0dXJuIGp1c3QgdGhlIGRhdGFcbiAgcmV0dXJuIHZlcnNpb25lZERhdGEuZGF0YTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgTWV0YU1hc2sgQ29udHJvbGxlciB3aXRoIGFueSBpbml0aWFsIHN0YXRlIGFuZCBkZWZhdWx0IGxhbmd1YWdlLlxuICogQ29uZmlndXJlcyBwbGF0Zm9ybS1zcGVjaWZpYyBlcnJvciByZXBvcnRpbmcgc3RyYXRlZ3kuXG4gKiBTdHJlYW1zIGVtaXR0ZWQgc3RhdGUgdXBkYXRlcyB0byBwbGF0Zm9ybS1zcGVjaWZpYyBzdG9yYWdlIHN0cmF0ZWd5LlxuICogQ3JlYXRlcyBwbGF0Zm9ybSBsaXN0ZW5lcnMgZm9yIG5ldyBEYXBwcy9Db250ZXh0cywgYW5kIHNldHMgdXAgdGhlaXIgZGF0YSBjb25uZWN0aW9ucyB0byB0aGUgY29udHJvbGxlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gaW5pdFN0YXRlIC0gVGhlIGluaXRpYWwgc3RhdGUgdG8gc3RhcnQgdGhlIGNvbnRyb2xsZXIgd2l0aCwgbWF0Y2hlcyB0aGUgc3RhdGUgdGhhdCBpcyBlbWl0dGVkIGZyb20gdGhlIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5pdExhbmdDb2RlIC0gVGhlIHJlZ2lvbiBjb2RlIGZvciB0aGUgbGFuZ3VhZ2UgcHJlZmVycmVkIGJ5IHRoZSBjdXJyZW50IHVzZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVtb3RlU291cmNlUG9ydCAtIHJlbW90ZSBhcHBsaWNhdGlvbiBwb3J0IGNvbm5lY3RpbmcgdG8gZXh0ZW5zaW9uLlxuICovXG5mdW5jdGlvbiBzZXR1cENvbnRyb2xsZXIoaW5pdFN0YXRlLCBpbml0TGFuZ0NvZGUsIHJlbW90ZVNvdXJjZVBvcnQpIHtcbiAgLy9cbiAgLy8gTWV0YU1hc2sgQ29udHJvbGxlclxuICAvL1xuXG4gIGNvbnRyb2xsZXIgPSBuZXcgTWV0YW1hc2tDb250cm9sbGVyKHtcbiAgICBpbmZ1cmFQcm9qZWN0SWQ6IHByb2Nlc3MuZW52LklORlVSQV9QUk9KRUNUX0lELFxuICAgIC8vIFVzZXIgY29uZmlybWF0aW9uIGNhbGxiYWNrczpcbiAgICBzaG93VXNlckNvbmZpcm1hdGlvbjogdHJpZ2dlclVpLFxuICAgIG9wZW5Qb3B1cCxcbiAgICAvLyBpbml0aWFsIHN0YXRlXG4gICAgaW5pdFN0YXRlLFxuICAgIC8vIGluaXRpYWwgbG9jYWxlIGNvZGVcbiAgICBpbml0TGFuZ0NvZGUsXG4gICAgLy8gcGxhdGZvcm0gc3BlY2lmaWMgYXBpXG4gICAgcGxhdGZvcm0sXG4gICAgbm90aWZpY2F0aW9uTWFuYWdlcixcbiAgICBicm93c2VyLFxuICAgIGdldFJlcXVlc3RBY2NvdW50VGFiSWRzOiAoKSA9PiB7XG4gICAgICByZXR1cm4gcmVxdWVzdEFjY291bnRUYWJJZHM7XG4gICAgfSxcbiAgICBnZXRPcGVuTWV0YW1hc2tUYWJzSWRzOiAoKSA9PiB7XG4gICAgICByZXR1cm4gb3Blbk1ldGFtYXNrVGFic0lEcztcbiAgICB9LFxuICAgIGxvY2FsU3RvcmUsXG4gIH0pO1xuXG4gIHNldHVwRW5zSXBmc1Jlc29sdmVyKHtcbiAgICBnZXRDdXJyZW50Q2hhaW5JZDogY29udHJvbGxlci5uZXR3b3JrQ29udHJvbGxlci5nZXRDdXJyZW50Q2hhaW5JZC5iaW5kKFxuICAgICAgY29udHJvbGxlci5uZXR3b3JrQ29udHJvbGxlcixcbiAgICApLFxuICAgIGdldElwZnNHYXRld2F5OiBjb250cm9sbGVyLnByZWZlcmVuY2VzQ29udHJvbGxlci5nZXRJcGZzR2F0ZXdheS5iaW5kKFxuICAgICAgY29udHJvbGxlci5wcmVmZXJlbmNlc0NvbnRyb2xsZXIsXG4gICAgKSxcbiAgICBwcm92aWRlcjogY29udHJvbGxlci5wcm92aWRlcixcbiAgfSk7XG5cbiAgLy8gc2V0dXAgc3RhdGUgcGVyc2lzdGVuY2VcbiAgcHVtcChcbiAgICBzdG9yZUFzU3RyZWFtKGNvbnRyb2xsZXIuc3RvcmUpLFxuICAgIGRlYm91bmNlKDEwMDApLFxuICAgIGNyZWF0ZVN0cmVhbVNpbmsoKHN0YXRlKSA9PiBsb2NhbFN0b3JlLnNldChzdGF0ZSkpLFxuICAgIChlcnJvcikgPT4ge1xuICAgICAgbG9nLmVycm9yKCdNZXRhTWFzayAtIFBlcnNpc3RlbmNlIHBpcGVsaW5lIGZhaWxlZCcsIGVycm9yKTtcbiAgICB9LFxuICApO1xuXG4gIHNldHVwU2VudHJ5R2V0U3RhdGVHbG9iYWwoY29udHJvbGxlcik7XG5cbiAgLy9cbiAgLy8gY29ubmVjdCB0byBvdGhlciBjb250ZXh0c1xuICAvL1xuICBpZiAoaXNNYW5pZmVzdFYzICYmIHJlbW90ZVNvdXJjZVBvcnQpIHtcbiAgICBjb25uZWN0UmVtb3RlKHJlbW90ZVNvdXJjZVBvcnQpO1xuICB9XG5cbiAgYnJvd3Nlci5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihjb25uZWN0UmVtb3RlKTtcbiAgYnJvd3Nlci5ydW50aW1lLm9uQ29ubmVjdEV4dGVybmFsLmFkZExpc3RlbmVyKGNvbm5lY3RFeHRlcm5hbCk7XG5cbiAgY29uc3QgaXNDbGllbnRPcGVuU3RhdHVzID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICBwb3B1cElzT3BlbiB8fFxuICAgICAgQm9vbGVhbihPYmplY3Qua2V5cyhvcGVuTWV0YW1hc2tUYWJzSURzKS5sZW5ndGgpIHx8XG4gICAgICBub3RpZmljYXRpb25Jc09wZW5cbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IG9uQ2xvc2VFbnZpcm9ubWVudEluc3RhbmNlcyA9IChpc0NsaWVudE9wZW4sIGVudmlyb25tZW50VHlwZSkgPT4ge1xuICAgIC8vIGlmIGFsbCBpbnN0YW5jZXMgb2YgbWV0YW1hc2sgYXJlIGNsb3NlZCB3ZSBjYWxsIGEgbWV0aG9kIG9uIHRoZSBjb250cm9sbGVyIHRvIHN0b3AgZ2FzRmVlQ29udHJvbGxlciBwb2xsaW5nXG4gICAgaWYgKGlzQ2xpZW50T3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnRyb2xsZXIub25DbGllbnRDbG9zZWQoKTtcbiAgICAgIC8vIG90aGVyd2lzZSB3ZSB3YW50IHRvIG9ubHkgcmVtb3ZlIHRoZSBwb2xsaW5nIHRva2VucyBmb3IgdGhlIGVudmlyb25tZW50IHR5cGUgdGhhdCBoYXMgY2xvc2VkXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGluIHRoZSBjYXNlIG9mIGZ1bGxzY3JlZW4gZW52aXJvbm1lbnQgYSB1c2VyIG1pZ2h0IGhhdmUgbXVsdGlwbGUgdGFicyBvcGVuIHNvIHdlIGRvbid0IHdhbnQgdG8gZGlzY29ubmVjdCBhbGwgb2ZcbiAgICAgIC8vIGl0cyBjb3JyZXNwb25kaW5nIHBvbGxpbmcgdG9rZW5zIHVubGVzcyBhbGwgdGFicyBhcmUgY2xvc2VkLlxuICAgICAgaWYgKFxuICAgICAgICBlbnZpcm9ubWVudFR5cGUgPT09IEVOVklST05NRU5UX1RZUEVfRlVMTFNDUkVFTiAmJlxuICAgICAgICBCb29sZWFuKE9iamVjdC5rZXlzKG9wZW5NZXRhbWFza1RhYnNJRHMpLmxlbmd0aClcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb250cm9sbGVyLm9uRW52aXJvbm1lbnRUeXBlQ2xvc2VkKGVudmlyb25tZW50VHlwZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBIHJ1bnRpbWUuUG9ydCBvYmplY3QsIGFzIHByb3ZpZGVkIGJ5IHRoZSBicm93c2VyOlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9BUEkvcnVudGltZS9Qb3J0XG4gICAqIEB0eXBlZGVmIFBvcnRcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuXG4gIC8qKlxuICAgKiBDb25uZWN0cyBhIFBvcnQgdG8gdGhlIE1ldGFNYXNrIGNvbnRyb2xsZXIgdmlhIGEgbXVsdGlwbGV4ZWQgZHVwbGV4IHN0cmVhbS5cbiAgICogVGhpcyBtZXRob2QgaWRlbnRpZmllcyB0cnVzdGVkIChNZXRhTWFzaykgaW50ZXJmYWNlcywgYW5kIGNvbm5lY3RzIHRoZW0gZGlmZmVyZW50bHkgZnJvbSB1bnRydXN0ZWQgKHdlYiBwYWdlcykuXG4gICAqXG4gICAqIEBwYXJhbSB7UG9ydH0gcmVtb3RlUG9ydCAtIFRoZSBwb3J0IHByb3ZpZGVkIGJ5IGEgbmV3IGNvbnRleHQuXG4gICAqL1xuICBmdW5jdGlvbiBjb25uZWN0UmVtb3RlKHJlbW90ZVBvcnQpIHtcbiAgICBjb25zdCBwcm9jZXNzTmFtZSA9IHJlbW90ZVBvcnQubmFtZTtcblxuICAgIGlmIChtZXRhbWFza0Jsb2NrZWRQb3J0cy5pbmNsdWRlcyhyZW1vdGVQb3J0Lm5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGlzTWV0YU1hc2tJbnRlcm5hbFByb2Nlc3MgPSBmYWxzZTtcbiAgICBjb25zdCBzb3VyY2VQbGF0Zm9ybSA9IGdldFBsYXRmb3JtKCk7XG5cbiAgICBpZiAoc291cmNlUGxhdGZvcm0gPT09IFBMQVRGT1JNX0ZJUkVGT1gpIHtcbiAgICAgIGlzTWV0YU1hc2tJbnRlcm5hbFByb2Nlc3MgPSBtZXRhbWFza0ludGVybmFsUHJvY2Vzc0hhc2hbcHJvY2Vzc05hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc01ldGFNYXNrSW50ZXJuYWxQcm9jZXNzID1cbiAgICAgICAgcmVtb3RlUG9ydC5zZW5kZXIub3JpZ2luID09PSBgY2hyb21lLWV4dGVuc2lvbjovLyR7YnJvd3Nlci5ydW50aW1lLmlkfWA7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VuZGVyVXJsID0gcmVtb3RlUG9ydC5zZW5kZXI/LnVybFxuICAgICAgPyBuZXcgVVJMKHJlbW90ZVBvcnQuc2VuZGVyLnVybClcbiAgICAgIDogbnVsbDtcblxuICAgIGlmIChpc01ldGFNYXNrSW50ZXJuYWxQcm9jZXNzKSB7XG4gICAgICBjb25zdCBwb3J0U3RyZWFtID0gbmV3IFBvcnRTdHJlYW0ocmVtb3RlUG9ydCk7XG4gICAgICAvLyBjb21tdW5pY2F0aW9uIHdpdGggcG9wdXBcbiAgICAgIGNvbnRyb2xsZXIuaXNDbGllbnRPcGVuID0gdHJ1ZTtcbiAgICAgIGNvbnRyb2xsZXIuc2V0dXBUcnVzdGVkQ29tbXVuaWNhdGlvbihwb3J0U3RyZWFtLCByZW1vdGVQb3J0LnNlbmRlcik7XG5cbiAgICAgIGlmIChpc01hbmlmZXN0VjMpIHtcbiAgICAgICAgLy8gTWVzc2FnZSBiZWxvdyBpZiBjYXB0dXJlZCBieSBVSSBjb2RlIGluIGFwcC9zY3JpcHRzL3VpLmpzIHdoaWNoIHdpbGwgdHJpZ2dlciBVSSBpbml0aWFsaXNhdGlvblxuICAgICAgICAvLyBUaGlzIGVuc3VyZXMgdGhhdCBVSSBpcyBpbml0aWFsaXNlZCBvbmx5IGFmdGVyIGJhY2tncm91bmQgaXMgcmVhZHlcbiAgICAgICAgLy8gSXQgZml4ZXMgdGhlIGlzc3VlIG9mIGJsYW5rIHNjcmVlbiBjb21pbmcgd2hlbiBleHRlbnNpb24gaXMgbG9hZGVkLCB0aGUgaXNzdWUgaXMgdmVyeSBmcmVxdWVudCBpbiBNVjNcbiAgICAgICAgcmVtb3RlUG9ydC5wb3N0TWVzc2FnZSh7IG5hbWU6ICdDT05ORUNUSU9OX1JFQURZJyB9KTtcblxuICAgICAgICAvLyBJZiB3ZSBnZXQgYSBXT1JLRVJfS0VFUF9BTElWRSBtZXNzYWdlLCB3ZSByZXNwb25kIHdpdGggYW4gQUNLXG4gICAgICAgIHJlbW90ZVBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgaWYgKG1lc3NhZ2UubmFtZSA9PT0gV09SS0VSX0tFRVBfQUxJVkVfTUVTU0FHRSkge1xuICAgICAgICAgICAgLy8gVG8gdGVzdCB1bi1jb21tZW50IHRoaXMgbGluZSBhbmQgd2FpdCBmb3IgMSBtaW51dGUuIEFuIGVycm9yIHNob3VsZCBiZSBzaG93biBvbiBNZXRhTWFzayBVSS5cbiAgICAgICAgICAgIHJlbW90ZVBvcnQucG9zdE1lc3NhZ2UoeyBuYW1lOiBBQ0tfS0VFUF9BTElWRV9NRVNTQUdFIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9jZXNzTmFtZSA9PT0gRU5WSVJPTk1FTlRfVFlQRV9QT1BVUCkge1xuICAgICAgICBwb3B1cElzT3BlbiA9IHRydWU7XG4gICAgICAgIGVuZE9mU3RyZWFtKHBvcnRTdHJlYW0sICgpID0+IHtcbiAgICAgICAgICBwb3B1cElzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgIGNvbnN0IGlzQ2xpZW50T3BlbiA9IGlzQ2xpZW50T3BlblN0YXR1cygpO1xuICAgICAgICAgIGNvbnRyb2xsZXIuaXNDbGllbnRPcGVuID0gaXNDbGllbnRPcGVuO1xuICAgICAgICAgIG9uQ2xvc2VFbnZpcm9ubWVudEluc3RhbmNlcyhpc0NsaWVudE9wZW4sIEVOVklST05NRU5UX1RZUEVfUE9QVVApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3NOYW1lID09PSBFTlZJUk9OTUVOVF9UWVBFX05PVElGSUNBVElPTikge1xuICAgICAgICBub3RpZmljYXRpb25Jc09wZW4gPSB0cnVlO1xuXG4gICAgICAgIGVuZE9mU3RyZWFtKHBvcnRTdHJlYW0sICgpID0+IHtcbiAgICAgICAgICBub3RpZmljYXRpb25Jc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICBjb25zdCBpc0NsaWVudE9wZW4gPSBpc0NsaWVudE9wZW5TdGF0dXMoKTtcbiAgICAgICAgICBjb250cm9sbGVyLmlzQ2xpZW50T3BlbiA9IGlzQ2xpZW50T3BlbjtcbiAgICAgICAgICBvbkNsb3NlRW52aXJvbm1lbnRJbnN0YW5jZXMoXG4gICAgICAgICAgICBpc0NsaWVudE9wZW4sXG4gICAgICAgICAgICBFTlZJUk9OTUVOVF9UWVBFX05PVElGSUNBVElPTixcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3NOYW1lID09PSBFTlZJUk9OTUVOVF9UWVBFX0ZVTExTQ1JFRU4pIHtcbiAgICAgICAgY29uc3QgdGFiSWQgPSByZW1vdGVQb3J0LnNlbmRlci50YWIuaWQ7XG4gICAgICAgIG9wZW5NZXRhbWFza1RhYnNJRHNbdGFiSWRdID0gdHJ1ZTtcblxuICAgICAgICBlbmRPZlN0cmVhbShwb3J0U3RyZWFtLCAoKSA9PiB7XG4gICAgICAgICAgZGVsZXRlIG9wZW5NZXRhbWFza1RhYnNJRHNbdGFiSWRdO1xuICAgICAgICAgIGNvbnN0IGlzQ2xpZW50T3BlbiA9IGlzQ2xpZW50T3BlblN0YXR1cygpO1xuICAgICAgICAgIGNvbnRyb2xsZXIuaXNDbGllbnRPcGVuID0gaXNDbGllbnRPcGVuO1xuICAgICAgICAgIG9uQ2xvc2VFbnZpcm9ubWVudEluc3RhbmNlcyhcbiAgICAgICAgICAgIGlzQ2xpZW50T3BlbixcbiAgICAgICAgICAgIEVOVklST05NRU5UX1RZUEVfRlVMTFNDUkVFTixcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgc2VuZGVyVXJsICYmXG4gICAgICBzZW5kZXJVcmwub3JpZ2luID09PSBwaGlzaGluZ1BhZ2VVcmwub3JpZ2luICYmXG4gICAgICBzZW5kZXJVcmwucGF0aG5hbWUgPT09IHBoaXNoaW5nUGFnZVVybC5wYXRobmFtZVxuICAgICkge1xuICAgICAgY29uc3QgcG9ydFN0cmVhbSA9IG5ldyBQb3J0U3RyZWFtKHJlbW90ZVBvcnQpO1xuICAgICAgY29udHJvbGxlci5zZXR1cFBoaXNoaW5nQ29tbXVuaWNhdGlvbih7XG4gICAgICAgIGNvbm5lY3Rpb25TdHJlYW06IHBvcnRTdHJlYW0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlbW90ZVBvcnQuc2VuZGVyICYmIHJlbW90ZVBvcnQuc2VuZGVyLnRhYiAmJiByZW1vdGVQb3J0LnNlbmRlci51cmwpIHtcbiAgICAgICAgY29uc3QgdGFiSWQgPSByZW1vdGVQb3J0LnNlbmRlci50YWIuaWQ7XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVtb3RlUG9ydC5zZW5kZXIudXJsKTtcbiAgICAgICAgY29uc3QgeyBvcmlnaW4gfSA9IHVybDtcblxuICAgICAgICByZW1vdGVQb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnKSA9PiB7XG4gICAgICAgICAgaWYgKG1zZy5kYXRhICYmIG1zZy5kYXRhLm1ldGhvZCA9PT0gJ2V0aF9yZXF1ZXN0QWNjb3VudHMnKSB7XG4gICAgICAgICAgICByZXF1ZXN0QWNjb3VudFRhYklkc1tvcmlnaW5dID0gdGFiSWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbm5lY3RFeHRlcm5hbChyZW1vdGVQb3J0KTtcbiAgICB9XG4gIH1cblxuICAvLyBjb21tdW5pY2F0aW9uIHdpdGggcGFnZSBvciBvdGhlciBleHRlbnNpb25cbiAgZnVuY3Rpb24gY29ubmVjdEV4dGVybmFsKHJlbW90ZVBvcnQpIHtcbiAgICBjb25zdCBwb3J0U3RyZWFtID0gbmV3IFBvcnRTdHJlYW0ocmVtb3RlUG9ydCk7XG4gICAgY29udHJvbGxlci5zZXR1cFVudHJ1c3RlZENvbW11bmljYXRpb24oe1xuICAgICAgY29ubmVjdGlvblN0cmVhbTogcG9ydFN0cmVhbSxcbiAgICAgIHNlbmRlcjogcmVtb3RlUG9ydC5zZW5kZXIsXG4gICAgfSk7XG4gIH1cblxuICAvL1xuICAvLyBVc2VyIEludGVyZmFjZSBzZXR1cFxuICAvL1xuXG4gIHVwZGF0ZUJhZGdlKCk7XG4gIGNvbnRyb2xsZXIudHhDb250cm9sbGVyLm9uKFxuICAgIE1FVEFNQVNLX0NPTlRST0xMRVJfRVZFTlRTLlVQREFURV9CQURHRSxcbiAgICB1cGRhdGVCYWRnZSxcbiAgKTtcbiAgY29udHJvbGxlci5tZXNzYWdlTWFuYWdlci5vbihcbiAgICBNRVRBTUFTS19DT05UUk9MTEVSX0VWRU5UUy5VUERBVEVfQkFER0UsXG4gICAgdXBkYXRlQmFkZ2UsXG4gICk7XG4gIGNvbnRyb2xsZXIucGVyc29uYWxNZXNzYWdlTWFuYWdlci5vbihcbiAgICBNRVRBTUFTS19DT05UUk9MTEVSX0VWRU5UUy5VUERBVEVfQkFER0UsXG4gICAgdXBkYXRlQmFkZ2UsXG4gICk7XG4gIGNvbnRyb2xsZXIuZGVjcnlwdE1lc3NhZ2VNYW5hZ2VyLm9uKFxuICAgIE1FVEFNQVNLX0NPTlRST0xMRVJfRVZFTlRTLlVQREFURV9CQURHRSxcbiAgICB1cGRhdGVCYWRnZSxcbiAgKTtcbiAgY29udHJvbGxlci5lbmNyeXB0aW9uUHVibGljS2V5TWFuYWdlci5vbihcbiAgICBNRVRBTUFTS19DT05UUk9MTEVSX0VWRU5UUy5VUERBVEVfQkFER0UsXG4gICAgdXBkYXRlQmFkZ2UsXG4gICk7XG4gIGNvbnRyb2xsZXIudHlwZWRNZXNzYWdlTWFuYWdlci5vbihcbiAgICBNRVRBTUFTS19DT05UUk9MTEVSX0VWRU5UUy5VUERBVEVfQkFER0UsXG4gICAgdXBkYXRlQmFkZ2UsXG4gICk7XG4gIGNvbnRyb2xsZXIuYXBwU3RhdGVDb250cm9sbGVyLm9uKFxuICAgIE1FVEFNQVNLX0NPTlRST0xMRVJfRVZFTlRTLlVQREFURV9CQURHRSxcbiAgICB1cGRhdGVCYWRnZSxcbiAgKTtcblxuICBjb250cm9sbGVyLmNvbnRyb2xsZXJNZXNzZW5nZXIuc3Vic2NyaWJlKFxuICAgIE1FVEFNQVNLX0NPTlRST0xMRVJfRVZFTlRTLkFQUFJPVkFMX1NUQVRFX0NIQU5HRSxcbiAgICB1cGRhdGVCYWRnZSxcbiAgKTtcblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgV2ViIEV4dGVuc2lvbidzIFwiYmFkZ2VcIiBudW1iZXIsIG9uIHRoZSBsaXR0bGUgZm94IGluIHRoZSB0b29sYmFyLlxuICAgKiBUaGUgbnVtYmVyIHJlZmxlY3RzIHRoZSBjdXJyZW50IG51bWJlciBvZiBwZW5kaW5nIHRyYW5zYWN0aW9ucyBvciBtZXNzYWdlIHNpZ25hdHVyZXMgbmVlZGluZyB1c2VyIGFwcHJvdmFsLlxuICAgKi9cbiAgZnVuY3Rpb24gdXBkYXRlQmFkZ2UoKSB7XG4gICAgbGV0IGxhYmVsID0gJyc7XG4gICAgY29uc3QgY291bnQgPSBnZXRVbmFwcHJvdmVkVHJhbnNhY3Rpb25Db3VudCgpO1xuICAgIGlmIChjb3VudCkge1xuICAgICAgbGFiZWwgPSBTdHJpbmcoY291bnQpO1xuICAgIH1cbiAgICAvLyBicm93c2VyQWN0aW9uIGhhcyBiZWVuIHJlcGxhY2VkIGJ5IGFjdGlvbiBpbiBNVjNcbiAgICBpZiAoaXNNYW5pZmVzdFYzKSB7XG4gICAgICBicm93c2VyLmFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBsYWJlbCB9KTtcbiAgICAgIGJyb3dzZXIuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6ICcjMDM3REQ2JyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnJvd3Nlci5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IGxhYmVsIH0pO1xuICAgICAgYnJvd3Nlci5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6ICcjMDM3REQ2JyB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRVbmFwcHJvdmVkVHJhbnNhY3Rpb25Db3VudCgpIHtcbiAgICBjb25zdCB1bmFwcHJvdmVkVHhDb3VudCA9IGNvbnRyb2xsZXIudHhDb250cm9sbGVyLmdldFVuYXBwcm92ZWRUeENvdW50KCk7XG4gICAgY29uc3QgeyB1bmFwcHJvdmVkTXNnQ291bnQgfSA9IGNvbnRyb2xsZXIubWVzc2FnZU1hbmFnZXI7XG4gICAgY29uc3QgeyB1bmFwcHJvdmVkUGVyc29uYWxNc2dDb3VudCB9ID0gY29udHJvbGxlci5wZXJzb25hbE1lc3NhZ2VNYW5hZ2VyO1xuICAgIGNvbnN0IHsgdW5hcHByb3ZlZERlY3J5cHRNc2dDb3VudCB9ID0gY29udHJvbGxlci5kZWNyeXB0TWVzc2FnZU1hbmFnZXI7XG4gICAgY29uc3QgeyB1bmFwcHJvdmVkRW5jcnlwdGlvblB1YmxpY0tleU1zZ0NvdW50IH0gPVxuICAgICAgY29udHJvbGxlci5lbmNyeXB0aW9uUHVibGljS2V5TWFuYWdlcjtcbiAgICBjb25zdCB7IHVuYXBwcm92ZWRUeXBlZE1lc3NhZ2VzQ291bnQgfSA9IGNvbnRyb2xsZXIudHlwZWRNZXNzYWdlTWFuYWdlcjtcbiAgICBjb25zdCBwZW5kaW5nQXBwcm92YWxDb3VudCA9XG4gICAgICBjb250cm9sbGVyLmFwcHJvdmFsQ29udHJvbGxlci5nZXRUb3RhbEFwcHJvdmFsQ291bnQoKTtcbiAgICBjb25zdCB3YWl0aW5nRm9yVW5sb2NrQ291bnQgPVxuICAgICAgY29udHJvbGxlci5hcHBTdGF0ZUNvbnRyb2xsZXIud2FpdGluZ0ZvclVubG9jay5sZW5ndGg7XG4gICAgcmV0dXJuIChcbiAgICAgIHVuYXBwcm92ZWRUeENvdW50ICtcbiAgICAgIHVuYXBwcm92ZWRNc2dDb3VudCArXG4gICAgICB1bmFwcHJvdmVkUGVyc29uYWxNc2dDb3VudCArXG4gICAgICB1bmFwcHJvdmVkRGVjcnlwdE1zZ0NvdW50ICtcbiAgICAgIHVuYXBwcm92ZWRFbmNyeXB0aW9uUHVibGljS2V5TXNnQ291bnQgK1xuICAgICAgdW5hcHByb3ZlZFR5cGVkTWVzc2FnZXNDb3VudCArXG4gICAgICBwZW5kaW5nQXBwcm92YWxDb3VudCArXG4gICAgICB3YWl0aW5nRm9yVW5sb2NrQ291bnRcbiAgICApO1xuICB9XG5cbiAgbm90aWZpY2F0aW9uTWFuYWdlci5vbihcbiAgICBOT1RJRklDQVRJT05fTUFOQUdFUl9FVkVOVFMuUE9QVVBfQ0xPU0VELFxuICAgICh7IGF1dG9tYXRpY2FsbHlDbG9zZWQgfSkgPT4ge1xuICAgICAgaWYgKCFhdXRvbWF0aWNhbGx5Q2xvc2VkKSB7XG4gICAgICAgIHJlamVjdFVuYXBwcm92ZWROb3RpZmljYXRpb25zKCk7XG4gICAgICB9IGVsc2UgaWYgKGdldFVuYXBwcm92ZWRUcmFuc2FjdGlvbkNvdW50KCkgPiAwKSB7XG4gICAgICAgIHRyaWdnZXJVaSgpO1xuICAgICAgfVxuICAgIH0sXG4gICk7XG5cbiAgZnVuY3Rpb24gcmVqZWN0VW5hcHByb3ZlZE5vdGlmaWNhdGlvbnMoKSB7XG4gICAgT2JqZWN0LmtleXMoXG4gICAgICBjb250cm9sbGVyLnR4Q29udHJvbGxlci50eFN0YXRlTWFuYWdlci5nZXRVbmFwcHJvdmVkVHhMaXN0KCksXG4gICAgKS5mb3JFYWNoKCh0eElkKSA9PlxuICAgICAgY29udHJvbGxlci50eENvbnRyb2xsZXIudHhTdGF0ZU1hbmFnZXIuc2V0VHhTdGF0dXNSZWplY3RlZCh0eElkKSxcbiAgICApO1xuICAgIGNvbnRyb2xsZXIubWVzc2FnZU1hbmFnZXIubWVzc2FnZXNcbiAgICAgIC5maWx0ZXIoKG1zZykgPT4gbXNnLnN0YXR1cyA9PT0gJ3VuYXBwcm92ZWQnKVxuICAgICAgLmZvckVhY2goKHR4KSA9PlxuICAgICAgICBjb250cm9sbGVyLm1lc3NhZ2VNYW5hZ2VyLnJlamVjdE1zZyhcbiAgICAgICAgICB0eC5pZCxcbiAgICAgICAgICBSRUpFQ1RfTk9URklDSUFUSU9OX0NMT1NFX1NJRyxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgY29udHJvbGxlci5wZXJzb25hbE1lc3NhZ2VNYW5hZ2VyLm1lc3NhZ2VzXG4gICAgICAuZmlsdGVyKChtc2cpID0+IG1zZy5zdGF0dXMgPT09ICd1bmFwcHJvdmVkJylcbiAgICAgIC5mb3JFYWNoKCh0eCkgPT5cbiAgICAgICAgY29udHJvbGxlci5wZXJzb25hbE1lc3NhZ2VNYW5hZ2VyLnJlamVjdE1zZyhcbiAgICAgICAgICB0eC5pZCxcbiAgICAgICAgICBSRUpFQ1RfTk9URklDSUFUSU9OX0NMT1NFX1NJRyxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgY29udHJvbGxlci50eXBlZE1lc3NhZ2VNYW5hZ2VyLm1lc3NhZ2VzXG4gICAgICAuZmlsdGVyKChtc2cpID0+IG1zZy5zdGF0dXMgPT09ICd1bmFwcHJvdmVkJylcbiAgICAgIC5mb3JFYWNoKCh0eCkgPT5cbiAgICAgICAgY29udHJvbGxlci50eXBlZE1lc3NhZ2VNYW5hZ2VyLnJlamVjdE1zZyhcbiAgICAgICAgICB0eC5pZCxcbiAgICAgICAgICBSRUpFQ1RfTk9URklDSUFUSU9OX0NMT1NFX1NJRyxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgY29udHJvbGxlci5kZWNyeXB0TWVzc2FnZU1hbmFnZXIubWVzc2FnZXNcbiAgICAgIC5maWx0ZXIoKG1zZykgPT4gbXNnLnN0YXR1cyA9PT0gJ3VuYXBwcm92ZWQnKVxuICAgICAgLmZvckVhY2goKHR4KSA9PlxuICAgICAgICBjb250cm9sbGVyLmRlY3J5cHRNZXNzYWdlTWFuYWdlci5yZWplY3RNc2coXG4gICAgICAgICAgdHguaWQsXG4gICAgICAgICAgUkVKRUNUX05PVEZJQ0lBVElPTl9DTE9TRSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgY29udHJvbGxlci5lbmNyeXB0aW9uUHVibGljS2V5TWFuYWdlci5tZXNzYWdlc1xuICAgICAgLmZpbHRlcigobXNnKSA9PiBtc2cuc3RhdHVzID09PSAndW5hcHByb3ZlZCcpXG4gICAgICAuZm9yRWFjaCgodHgpID0+XG4gICAgICAgIGNvbnRyb2xsZXIuZW5jcnlwdGlvblB1YmxpY0tleU1hbmFnZXIucmVqZWN0TXNnKFxuICAgICAgICAgIHR4LmlkLFxuICAgICAgICAgIFJFSkVDVF9OT1RGSUNJQVRJT05fQ0xPU0UsXG4gICAgICAgICksXG4gICAgICApO1xuXG4gICAgLy8gRmluYWxseSwgcmVqZWN0IGFsbCBhcHByb3ZhbHMgbWFuYWdlZCBieSB0aGUgQXBwcm92YWxDb250cm9sbGVyXG4gICAgY29udHJvbGxlci5hcHByb3ZhbENvbnRyb2xsZXIuY2xlYXIoXG4gICAgICBldGhFcnJvcnMucHJvdmlkZXIudXNlclJlamVjdGVkUmVxdWVzdCgpLFxuICAgICk7XG5cbiAgICB1cGRhdGVCYWRnZSgpO1xuICB9XG59XG5cbi8vXG4vLyBFdGMuLi5cbi8vXG5cbi8qKlxuICogT3BlbnMgdGhlIGJyb3dzZXIgcG9wdXAgZm9yIHVzZXIgY29uZmlybWF0aW9uXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHRyaWdnZXJVaSgpIHtcbiAgY29uc3QgdGFicyA9IGF3YWl0IHBsYXRmb3JtLmdldEFjdGl2ZVRhYnMoKTtcbiAgY29uc3QgY3VycmVudGx5QWN0aXZlTWV0YW1hc2tUYWIgPSBCb29sZWFuKFxuICAgIHRhYnMuZmluZCgodGFiKSA9PiBvcGVuTWV0YW1hc2tUYWJzSURzW3RhYi5pZF0pLFxuICApO1xuICAvLyBWaXZhbGRpIGlzIG5vdCBjbG9zaW5nIHBvcnQgY29ubmVjdGlvbiBvbiBwb3B1cCBjbG9zZSwgc28gcG9wdXBJc09wZW4gZG9lcyBub3Qgd29yayBjb3JyZWN0bHlcbiAgLy8gVG8gYmUgcmV2aWV3ZWQgaW4gdGhlIGZ1dHVyZSBpZiB0aGlzIGJlaGF2aW91ciBpcyBmaXhlZCAtIGFsc28gdGhlIHdheSB3ZSBkZXRlcm1pbmUgaXNWaXZhbGRpIHZhcmlhYmxlIG1pZ2h0IGNoYW5nZSBhdCBzb21lIHBvaW50XG4gIGNvbnN0IGlzVml2YWxkaSA9XG4gICAgdGFicy5sZW5ndGggPiAwICYmXG4gICAgdGFic1swXS5leHREYXRhICYmXG4gICAgdGFic1swXS5leHREYXRhLmluZGV4T2YoJ3ZpdmFsZGlfdGFiJykgPiAtMTtcbiAgaWYgKFxuICAgICF1aUlzVHJpZ2dlcmluZyAmJlxuICAgIChpc1ZpdmFsZGkgfHwgIXBvcHVwSXNPcGVuKSAmJlxuICAgICFjdXJyZW50bHlBY3RpdmVNZXRhbWFza1RhYlxuICApIHtcbiAgICB1aUlzVHJpZ2dlcmluZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG5vdGlmaWNhdGlvbk1hbmFnZXIuc2hvd1BvcHVwKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHVpSXNUcmlnZ2VyaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogT3BlbnMgdGhlIGJyb3dzZXIgcG9wdXAgZm9yIHVzZXIgY29uZmlybWF0aW9uIG9mIHdhdGNoQXNzZXRcbiAqIHRoZW4gaXQgd2FpdHMgdW50aWwgdXNlciBpbnRlcmFjdCB3aXRoIHRoZSBVSVxuICovXG5hc3luYyBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XG4gIGF3YWl0IHRyaWdnZXJVaSgpO1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCFub3RpZmljYXRpb25Jc09wZW4pIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9LCBTRUNPTkQpO1xuICB9KTtcbn1cblxuLy8gSXQgYWRkcyB0aGUgXCJBcHAgSW5zdGFsbGVkXCIgZXZlbnQgaW50byBhIHF1ZXVlIG9mIGV2ZW50cywgd2hpY2ggd2lsbCBiZSB0cmFja2VkIG9ubHkgYWZ0ZXIgYSB1c2VyIG9wdHMgaW50byBtZXRyaWNzLlxuY29uc3QgYWRkQXBwSW5zdGFsbGVkRXZlbnQgPSAoKSA9PiB7XG4gIGlmIChjb250cm9sbGVyKSB7XG4gICAgY29udHJvbGxlci5tZXRhTWV0cmljc0NvbnRyb2xsZXIudXBkYXRlVHJhaXRzKHtcbiAgICAgIFtUUkFJVFMuSU5TVEFMTF9EQVRFX0VYVF06IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLCAvLyB5eXl5LW1tLWRkXG4gICAgfSk7XG4gICAgY29udHJvbGxlci5tZXRhTWV0cmljc0NvbnRyb2xsZXIuYWRkRXZlbnRCZWZvcmVNZXRyaWNzT3B0SW4oe1xuICAgICAgY2F0ZWdvcnk6IEVWRU5ULkNBVEVHT1JJRVMuQVBQLFxuICAgICAgZXZlbnQ6IEVWRU5UX05BTUVTLkFQUF9JTlNUQUxMRUQsXG4gICAgICBwcm9wZXJ0aWVzOiB7fSxcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gSWYgdGhlIGNvbnRyb2xsZXIgaXMgbm90IHNldCB5ZXQsIHdlIHdhaXQgYW5kIHRyeSB0byBhZGQgdGhlIFwiQXBwIEluc3RhbGxlZFwiIGV2ZW50IGFnYWluLlxuICAgIGFkZEFwcEluc3RhbGxlZEV2ZW50KCk7XG4gIH0sIDEwMDApO1xufTtcblxuLy8gT24gZmlyc3QgaW5zdGFsbCwgb3BlbiBhIG5ldyB0YWIgd2l0aCBNZXRhTWFza1xuYnJvd3Nlci5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCh7IHJlYXNvbiB9KSA9PiB7XG4gIGlmIChcbiAgICByZWFzb24gPT09ICdpbnN0YWxsJyAmJlxuICAgICEocHJvY2Vzcy5lbnYuTUVUQU1BU0tfREVCVUcgfHwgcHJvY2Vzcy5lbnYuSU5fVEVTVClcbiAgKSB7XG4gICAgYWRkQXBwSW5zdGFsbGVkRXZlbnQoKTtcbiAgICBwbGF0Zm9ybS5vcGVuRXh0ZW5zaW9uSW5Ccm93c2VyKCk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBzZXR1cFNlbnRyeUdldFN0YXRlR2xvYmFsKHN0b3JlKSB7XG4gIGdsb2JhbC5zdGF0ZUhvb2tzLmdldFNlbnRyeVN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZ1bGxTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG4gICAgY29uc3QgZGVidWdTdGF0ZSA9IG1hc2tPYmplY3QoeyBtZXRhbWFzazogZnVsbFN0YXRlIH0sIFNFTlRSWV9TVEFURSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXI6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgc3RvcmU6IGRlYnVnU3RhdGUsXG4gICAgICB2ZXJzaW9uOiBwbGF0Zm9ybS5nZXRWZXJzaW9uKCksXG4gICAgfTtcbiAgfTtcbn1cbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5janMubWFwIn0=

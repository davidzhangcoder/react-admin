const utils = {
    compactQueue(queue) {
        var obj;

        while (queue.length) {
            var item = queue.pop();
            obj = item.obj[item.prop];

            if (Array.isArray(obj)) {
                var compacted = [];

                for (var j = 0; j < obj.length; ++j) {
                    if (typeof obj[j] !== 'undefined') {
                        compacted.push(obj[j]);
                    }
                }

                item.obj[item.prop] = compacted;
            }
        }

        return obj;
    },
    decode(str) {
        try {
            return decodeURIComponent(str.replace(/\+/g, ' '));
        } catch (e) {
            return str;
        }
    },
    assign(target, source) {
        return Object.keys(source).reduce(function (acc, key) {
            acc[key] = source[key];
            return acc;
        }, target);
    },
    arrayToObject(source, options) {
        var obj = options && options.plainObjects ? Object.create(null) : {};
        for (var i = 0; i < source.length; ++i) {
            if (typeof source[i] !== 'undefined') {
                obj[i] = source[i];
            }
        }

        return obj;
    },
    isBuffer(obj) {
        if (obj === null || typeof obj === 'undefined') {
            return false;
        }

        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    },
    isRegExp(obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
    },
    compact(value) {
        var queue = [{obj: {o: value}, prop: 'o'}];
        var refs = [];

        for (var i = 0; i < queue.length; ++i) {
            var item = queue[i];
            var obj = item.obj[item.prop];

            var keys = Object.keys(obj);
            for (var j = 0; j < keys.length; ++j) {
                var key = keys[j];
                var val = obj[key];
                if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                    queue.push({obj: obj, prop: key});
                    refs.push(val);
                }
            }
        }
        return utils.compactQueue(queue);
    },
    encode(str) {
        // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
        // It has been adapted here for stricter adherence to RFC 3986
        if (str.length === 0) {
            return str;
        }

        var string = typeof str === 'string' ? str : String(str);

        var out = '';
        for (var i = 0; i < string.length; ++i) {
            var c = string.charCodeAt(i);

            if (
                c === 0x2D // -
                || c === 0x2E // .
                || c === 0x5F // _
                || c === 0x7E // ~
                || (c >= 0x30 && c <= 0x39) // 0-9
                || (c >= 0x41 && c <= 0x5A) // a-z
                || (c >= 0x61 && c <= 0x7A) // A-Z
            ) {
                out += string.charAt(i);
                continue;
            }

            if (c < 0x80) {
                out = out + utils.hexTable[c];
                continue;
            }

            if (c < 0x800) {
                out = out + (utils.hexTable[0xC0 | (c >> 6)] + utils.hexTable[0x80 | (c & 0x3F)]);
                continue;
            }

            if (c < 0xD800 || c >= 0xE000) {
                out = out + (utils.hexTable[0xE0 | (c >> 12)] + utils.hexTable[0x80 | ((c >> 6) & 0x3F)] + utils.hexTable[0x80 | (c & 0x3F)]);
                continue;
            }

            i += 1;
            c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
            out += utils.hexTable[0xF0 | (c >> 18)]
                + utils.hexTable[0x80 | ((c >> 12) & 0x3F)]
                + utils.hexTable[0x80 | ((c >> 6) & 0x3F)]
                + utils.hexTable[0x80 | (c & 0x3F)];
        }

        return out;
    },
    formatter(value) {
        return value;
    },
    generateArrayPrefix(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    hexTable: (function () {
        var array = [];
        for (var i = 0; i < 256; ++i) {
            array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
        }

        return array;
    }()),
    merge(target, source, options) {
        if (!source) {
            return target;
        }

        if (typeof source !== 'object') {
            if (Array.isArray(target)) {
                target.push(source);
            } else if (typeof target === 'object') {
                if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                    target[source] = true;
                }
            } else {
                return [target, source];
            }

            return target;
        }

        if (typeof target !== 'object') {
            return [target].concat(source);
        }

        var mergeTarget = target;
        if (Array.isArray(target) && !Array.isArray(source)) {
            mergeTarget = utils.arrayToObject(target, options);
        }

        if (Array.isArray(target) && Array.isArray(source)) {
            source.forEach(function (item, i) {
                if (has.call(target, i)) {
                    if (target[i] && typeof target[i] === 'object') {
                        target[i] = utils.merge(target[i], item, options);
                    } else {
                        target.push(item);
                    }
                } else {
                    target[i] = item;
                }
            });
            return target;
        }

        return Object.keys(source).reduce(function (acc, key) {
            var value = source[key];

            if (has.call(acc, key)) {
                acc[key] = utils.merge(acc[key], value, options);
            } else {
                acc[key] = value;
            }
            return acc;
        }, mergeTarget);
    }
}

const stringify = function(object, options) {
    let option =  {
        prefix : "",
        generateArrayPrefix : utils.generateArrayPrefix,
        strictNullHandling: null,
        skipNulls: null,
        encoder : utils.encode,
        filter: null,
        sort: null,
        allowDots : true,
        serializeDate: null,
        formatter : utils.formatter,
        encodeValuesOnly: true
    }
    Object.assign(option, options);
    let {prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter,
        sort, allowDots, serializeDate, formatter, encodeValuesOnly} = option;

    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        obj = '';
    }
    var values = [];

    if (!obj) {
        return values;
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, utils.encoder);
            if(allowDots){
                keyValue = keyValue.substring(1);
            }else{
                const arr =keyValue.match(/\[\w+\]/g);
                keyValue = arr[0].substring(1,arr[0].length-1) + keyValue.substring(arr[0].length);
            }
            return [keyValue + '=' + formatter(encoder(obj, utils.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }


    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(this.stringify(
                obj[key],
                {prefix:generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly}
            ));
        } else {
            values = values.concat(this.stringify(
                obj[key],
                {prefix:prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly}
            ));
        }
    }

    return values.join("&");
}

const common = { stringify }

export default common;

(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * URL прокси-сервера, который будет использован при обнаружении блокировщика рекламы.
     */
    const PROXY_URL = "https://interst.example.net.ru";

    /**
     * Кодирует указанный URL и формирует конечный URL для проксирования через заданный `proxyUrl`.
     *
     * @param proxyUrl - URL прокси-сервера, через который будет направлен запрос.
     * @param url - исходный URL, который требуется закодировать.
     *
     * @remarks
     * Используем encodeURIComponent, поскольку base64 может добавить дополнительные сегменты '/' в кодировке.
     *
     * @returns возвращает закодированный URL.
     */
    const aabEncodeWith = (proxyUrl, url) => `${proxyUrl}/proxy?source=${encodeURIComponent(btoa(url))}`;

    /// <reference types="@acl/interfaces/anti-adblock-declaration" />
    /**
     * Кодирует URL при наличии блокировщика рекламы.
     *
     * @param url - исходный URL, который требуется закодировать.
     * @returns возвращает закодированный URL при наличии блокировщика рекламы, иначе возвращает исходный URL.
     *
     * @example
     * ```ts
     * // Исходный URL
     * const originalUrl = "https://example.com/banner.jpg";
     *
     * // Кодируем URL с использованием функции aabEncode
     * const encodedUrl = aabEncode(originalUrl);
     *
     * // Результат
     * // если есть aabpu
     * encodedUrl = "https://test-proxy.com/proxy?source=aHR0cHM6Ly9leGFtcGxlLmNvbS9iYW5uZXIuanBn"
     * // если нету aabpu
     * encodedUrl = "https://example.com/banner.jpg"
     * ```
     */
    const aabEncode = (url) => {
        if (!Object.prototype.hasOwnProperty.call(window, "aabpu")) {
            return url;
        }
        return aabEncodeWith(PROXY_URL, url);
    };

    /**
     * Асинхронная функция для получаения закодированного URL.
     *
     * @returns Промис, который разрешится закодированным URL при наличии блокировщика рекламы, иначе возвращает исходный URL.
     */
    var createAabVast = function (url) { return Promise.resolve(aabEncode(url)); };

    // @ts-nocheck
    console.log("first script");
    var storage = {
        "aab-vast": createAabVast,
    };
    window.AdR = {
        create: function (productName) {
            var callParameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                callParameters[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return [2 /*return*/, new ((_a = storage[productName]).bind.apply(_a, __spreadArray([void 0], callParameters, false)))()];
                });
            });
        }
    };

})();
//# sourceMappingURL=index.js.map

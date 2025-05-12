// advertising-code-library v2.2.7
(function () {
  'use strict';

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: true,
        configurable: true
      }
    }), Object.defineProperty(t, "prototype", {
      writable: false
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  /**
   * Функция проверяет, является ли переданный объект инстансом переданного класса.
   * @param object - объект.
   * @param someClass - класс.
   * @returns true, если объект является инстансом переданного класса, иначе - false.
   * @remarks
   * Также проверяет, является ли родительский элемент объекта инстансом переданного класса.
   *
   * Функция работает корректно для встроенных классов JavaScript (например, `HTMLVideoElement`).
   * Для скомпилированных классов может возвращать неверные результаты, так как проверка основывается
   * на прототипе `[object Object]`, который может совпадать для разных объектов.
   */
  // eslint-disable-next-line @stylistic/max-len
  var instanceOf = function instanceOf(object, someClass) {
    if (object) {
      var targetProtoString = Object.prototype.toString.call(someClass.prototype);
      var proto = Object.getPrototypeOf(object);
      while (proto) {
        if (Object.prototype.toString.call(proto) === targetProtoString) {
          return true;
        }
        proto = Object.getPrototypeOf(proto);
      }
    }
    return false;
  };

  /**
   * Функция проверяет, является ли переданный парамент числом.
   * @param something - параметр, который необходимо проверить.
   * @returns true, если переданный параметр является числом, иначе - false.
   */
  var number = function number(something) {
    return typeof something === "number" && !isNaN(something) && isFinite(something);
  };
  /**
   * Функция проверяет, является ли переданный параметр строго объектом.
   * @param something - параметр, который необходимо проверить.
   * @returns true, если переданный параметр является строго объектом, иначе - false.
   * @remarks
   * Под проверкой на строгий объект подрузамевается, что объект создан с только с помощью {} или new Object().
   */
  var strictObject = function strictObject(something) {
    return Object.prototype.toString.call(something) === "[object Object]";
  };
  /**
   * Функция проверяет, является ли переданный элемент инстансом класса HTMLElement или Document.
   * @param htmlObj - элемент, который необходимо проверить.
   * @returns true, если переданный элемент является инстансом класса HTMLElement или Document, иначе - false.
   */
  var htmlElement = function htmlElement(htmlObj) {
    return instanceOf(htmlObj, HTMLElement) || htmlDocumentElement(htmlObj);
  };
  /**
   * Функция проверяет, является ли переданный элемент инстансом класса Document.
   * @param doc - элемент, который необходимо проверить.
   * @returns true, если переданный элемент является инстансом класса Document.
   */
  var htmlDocumentElement = function htmlDocumentElement(doc) {
    return instanceOf(doc, Document);
  };

  /**
   * Регулярно вызывает переданную функцию через интервал времению.
   */
  var Loop = /*#__PURE__*/function () {
    /**
     * @param cb - функция которую надо вызвать.
     * @param timeout - задержка в миллисекундах.
     */
    function Loop(cb) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      _classCallCheck(this, Loop);
      /**
       * Числовой id setTimeout.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#return_value
       */
      _defineProperty(this, "timeoutId", void 0);
      /**
       * Задержка в миллисекундах.
       */
      _defineProperty(this, "timeout", void 0);
      /**
       * Функция которую надо вызвать.
       */
      _defineProperty(this, "cb", void 0);
      /**
       * Флаг, указывающий, следует ли продолжать выполнение цикла.
       */
      _defineProperty(this, "shouldContinue", void 0);
      this.cb = cb;
      this.timeoutId = null;
      this.timeout = number(timeout) && timeout >= 0 ? timeout : 0;
      this.shouldContinue = false;
    }
    /**
     * Метод представляет одну итерацию цикла, вызывает переданную функцию и
     * запускает таймер на следующий вызов.
     *
     * @remarks
     * Порядок вызова — сначала `cb()`, потом установка таймера — выбран намеренно.
     * Это важно для случаев, когда колбэк выполняется долго: следующая итерация будет отсчитана
     * только после завершения текущей, избегая наложения вызовов.
     */
    return _createClass(Loop, [{
      key: "loopIteration",
      value: function loopIteration() {
        if (!this.shouldContinue) {
          return;
        }
        this.cb();
        // Повторная проверка `shouldContinue` нужна, если `cb` вызывает `stop()` —
        // иначе таймер будет установлен даже после остановки.
        if (this.shouldContinue) {
          this.timeoutId = setTimeout(this.loopIteration.bind(this), this.timeout);
        }
      }
      /**
       * Запускает цикл вызовов.
       */
    }, {
      key: "start",
      value: function start() {
        if (this.timeoutId !== null) {
          return;
        }
        this.shouldContinue = true;
        this.loopIteration();
      }
      /**
       * Останавливает цикл вызовов.
       */
    }, {
      key: "stop",
      value: function stop() {
        this.shouldContinue = false;
        if (this.timeoutId === null) {
          return;
        }
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }]);
  }();

  /**
   * Функция предназначена для получения элемента <body>. Если элемент <body>
   * уже существует, функция немедленно возвращает его.
   *
   * @remarks
   * Эта функция нужна, когда скрипт находится в разделе <head> документа,
   * а операции требуют доступа к элементу <body>.
   *
   * @returns Промис, который возвращает `document.body`.
   */
  var getBodyElement = function getBodyElement() {
    if (document.body) {
      return Promise.resolve(document.body);
    }
    return new Promise(function (resolve) {
      var loop = new Loop(function () {
        if (document.body) {
          resolve(document.body);
          loop.stop();
        }
      }, 20);
      loop.start();
    });
  };

  /**
   * Устанавливает свойства элемента с помощью функции установки свойств.
   * @param element - элемент, для которого устанавливаются свойства.
   * @param properties - свойства для установки.
   * @param propertySetter - функция установки свойства.
   */
  var setProperties = function setProperties(element, properties, propertySetter) {
    if (!htmlElement(element) && !(element instanceof SVGElement) || !strictObject(properties)) {
      return;
    }
    for (var property in properties) {
      var value = number(properties[property]) ? String(properties[property]) : properties[property];
      propertySetter(element, property, value);
    }
  };
  /**
   * Устанавливает стили для элемента.
   * @param element - элемент, для которого устанавливаются стили.
   * @param styles - устанавливаемые стили.
   */
  var setStyles = function setStyles(element, styles) {
    return setProperties(element, styles, function (el, prop, val) {
      return el.style.setProperty(prop, val);
    });
  };
  /**
   * Устанавливает атрибуты для элемента.
   * @param element - элемент, для которого устанавливаются атрибуты.
   * @param attributes - устанавливаемые атрибуты.
   */
  var setAttributes = function setAttributes(element, attributes) {
    return setProperties(element, attributes, function (el, prop, val) {
      return el.setAttribute(prop, val);
    });
  };

  /**
   * Предназначен для загрузки скриптов.
   */
  var ScriptLoader = /*#__PURE__*/function () {
    /**
     * @param uri - URL по которому необходимо загрузить скрипт.
     * @param parent - Элемент, в который будет вставлен script. По умолчанию - document.head.
     * @param timeOut - максимальное время ожидания загрузки скрипта в миллисекундах. По умолчанию - 5000 миллисекунд.
     */
    function ScriptLoader(uri, parent, timeOut) {
      _classCallCheck(this, ScriptLoader);
      /**
       * URL по которому необходимо загрузить скрипт.
       */
      _defineProperty(this, "uri", void 0);
      /**
       * Элемент, в который будет вставлен script. По умолчанию - document.head.
       */
      _defineProperty(this, "parent", void 0);
      /**
       * Максимальное время ожидания загрузки скрипта в миллисекундах. По умолчанию - 5000 миллисекунд.
       */
      _defineProperty(this, "timeOut", void 0);
      /**
       * Элемент script, который нужно загрузить.
       */
      _defineProperty(this, "scriptElement", void 0);
      this.timeOut = number(timeOut) ? timeOut : 5000;
      this.scriptElement = document.createElement("script");
      this.uri = uri;
      if (htmlDocumentElement(parent) && htmlElement(parent.head)) {
        this.parent = parent.head;
      } else if (htmlElement(parent) && (parent === null || parent === void 0 ? void 0 : parent.nodeType) === 1) {
        this.parent = parent;
      } else {
        this.parent = document.head;
      }
    }
    /**
     * Удаляет элемент скрипта из DOM.
     */
    return _createClass(ScriptLoader, [{
      key: "removeScriptElement",
      value: function removeScriptElement() {
        this.scriptElement.remove();
      }
      /**
       * Загружает скрипт. Реджектит промис, если запрос превышает время ожидания.
       * @returns промис, который разрешится, когда скрипт будет загружен.
       */
    }, {
      key: "load",
      value: function load() {
        var _this = this;
        return new Promise(function (resolve, reject) {
          _this.scriptElement.setAttribute("src", _this.uri);
          var timeOutHandler = setTimeout(function () {
            _this.scriptElement.removeEventListener("load", scriptEventHandler);
            _this.scriptElement.removeEventListener("error", scriptEventHandler);
            _this.scriptElement.remove();
            reject(new Error("TimeOut error."));
          }, _this.timeOut);
          var scriptEventHandler = function scriptEventHandler(event) {
            clearTimeout(timeOutHandler);
            if (event.type === "error") {
              _this.scriptElement.remove();
              reject(new Error("Script error loading."));
            } else {
              resolve(true);
            }
          };
          _this.scriptElement.addEventListener("load", scriptEventHandler, {
            once: true
          });
          _this.scriptElement.addEventListener("error", scriptEventHandler, {
            once: true
          });
          _this.parent.append(_this.scriptElement);
        });
      }
      /**
       * Устанавливает атрибуты для элемента скрипта.
       * @param attributes - объект атрибутов. Каждый атрибут определяется парой "ключ-значение", где ключ - это имя атрибута,
       * а значение - строка, задающая его значение.
       * @returns this.
       */
    }, {
      key: "setAttributes",
      value: function setAttributes$1(attributes) {
        setAttributes(this.scriptElement, attributes);
        return this;
      }
    }]);
  }();

  /**
   * Класс для работы с iframe-элементами.
   */
  var Iframe = /*#__PURE__*/function () {
    /**
     * @param config - {@link IframeConfig|конфигурация} для создания iframe.
     */
    function Iframe(config) {
      _classCallCheck(this, Iframe);
      /**
       * iframe элемент
       */
      _defineProperty(this, "frame", void 0);
      this.frame = document.createElement("iframe");
      this.frame.src = config.url;
      if (config.styles) {
        setStyles(this.frame, config.styles);
      }
      if (config.attributes) {
        setAttributes(this.frame, config.attributes);
      }
    }
    /**
     * Геттер для получения iframe-элемента.
     */
    return _createClass(Iframe, [{
      key: "element",
      get: function get() {
        return this.frame;
      }
      /**
       * Вставляет iframe в указанный HTML-элемент.
       *
       * @param slot - HTML-элемент, в который будет вставлен iframe.
       */
    }, {
      key: "insertInto",
      value: function insertInto(slot) {
        slot.appendChild(this.frame);
      }
      /**
       * Удаляет iframe.
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this.frame.remove();
      }
    }]);
  }();

  /**
   * Стили для скрытого iframe.
   */
  var HIDDEN_FRAME_STYLES = {
    position: "absolute",
    width: "0px",
    height: "0px",
    border: "0px",
    padding: "0px",
    margin: "0px"
  };
  /**
   * Класс для создания скрытого iframe.
   * Наследуется от класса {@link Iframe}.
   */
  var HiddenIframe = /*#__PURE__*/function (_Iframe) {
    /**
     * @param url - URL, который будет установлен как источник iframe.
     */
    function HiddenIframe(url) {
      _classCallCheck(this, HiddenIframe);
      return _callSuper(this, HiddenIframe, [{
        url: url,
        styles: HIDDEN_FRAME_STYLES
      }]);
    }
    _inherits(HiddenIframe, _Iframe);
    return _createClass(HiddenIframe);
  }(Iframe);

  var AD_CLASSES = "content-list__ad-label ad banner adriver tracker analitics ads reklama ad-sidebar adsbox adblock-blocker Adstyled__AdWrapper- Display_displayAd";
  var AD_ID = "ads300_250-widget-";
  var INTERVAL = 50;
  var TIMEOUT = 500;
  var EXTR_TIME_TO_CHECK = 100;
  var SIZE = "1px";
  var OPACITY = "1";
  /**
   * Класс для обнаружения наличия блокировщика рекламы.
   */
  var AdblockDetector = /*#__PURE__*/function () {
    function AdblockDetector() {
      _classCallCheck(this, AdblockDetector);
    }
    return _createClass(AdblockDetector, null, [{
      key: "check",
      value:
      /**
       * Проверяет, активен ли блокировщик рекламы.
       *
       * @returns  Промис, который разрешается в `true`, если обнаружен блокировщик рекламы,
       * в противном случае в `false`.
       */
      function check() {
        var _this = this;
        var adElement = this.createAdElement();
        return getBodyElement().then(function (body) {
          return new Promise(function (resolve) {
            body.append(adElement);
            var timeoutId = null;
            var cleanup = function cleanup() {
              if (timeoutId) {
                clearTimeout(timeoutId);
              } else {
                document.removeEventListener("DOMContentLoaded", handleContentLoaded);
              }
              loop.stop();
              adElement.remove();
            };
            var handleContentLoaded = function handleContentLoaded() {
              setTimeout(function () {
                resolve(_this.checkStyles(adElement));
                cleanup();
              }, EXTR_TIME_TO_CHECK);
            };
            var loop = new Loop(function () {
              if (_this.checkStyles(adElement)) {
                cleanup();
                resolve(true);
              }
            }, INTERVAL);
            adElement.className = AD_CLASSES;
            adElement.id = AD_ID;
            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", handleContentLoaded);
            } else {
              timeoutId = setTimeout(function () {
                resolve(_this.checkStyles(adElement));
                cleanup();
              }, TIMEOUT);
            }
            loop.start();
          });
        });
      }
      /**
       * Создает скрытый элемент рекламы для обнаружения блокировщика рекламы.
       *
       * @returns Созданный элемент рекламы.
       */
    }, {
      key: "createAdElement",
      value: function createAdElement() {
        var adElement = document.createElement("div");
        setStyles(adElement, {
          width: SIZE,
          height: SIZE,
          opacity: OPACITY,
          display: "block",
          visibility: "visible"
        });
        return adElement;
      }
      /**
       * Проверяет стили предоставленного элемента для обнаружения блокировщика рекламы.
       *
       * @param element - элемент для проверки.
       *
       * @returns `true`, если обнаружен блокировщик рекламы, в противном случае `false`.
       */
    }, {
      key: "checkStyles",
      value: function checkStyles(element) {
        var elementStyles = window.getComputedStyle(element);
        return elementStyles.display === "none" || elementStyles.visibility === "hidden" || elementStyles.height !== SIZE || elementStyles.width !== SIZE || elementStyles.opacity !== OPACITY;
      }
    }]);
  }();

  /**
   * Адрес iframe для передачи `id`.
   */
  var BASE_URL = "https://content.adriver/accs.html";

  /**
   * Передает идентификатор через невидимый iframe с закодированным адресом.
   *
   * @param id - идентификатор, который нужно передать.
   * @param encode - функция кодирования URL-адреса с использованием прокси.
   * Принимает исходный URL-адрес фрейма и возвращает его проксированный вариант.
   */
  var setIdWithProxy = function setIdWithProxy(id, encode) {
    var url = encode("".concat(BASE_URL, "?").concat(id));
    new HiddenIframe(url).insertInto(document.body);
  };

  /**
   * URL прокси-сервера, который будет использован при обнаружении блокировщика рекламы.
   */
  var PROXY_URL = "https://interst.example.net.ru";

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
  var aabEncodeWith = function (proxyUrl, url) { return "".concat(proxyUrl, "/proxy?source=").concat(encodeURIComponent(btoa(url))); };

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
  var aabEncode = function (url) {
      if (!Object.prototype.hasOwnProperty.call(window, "aabpu")) {
          return url;
      }
      return aabEncodeWith(PROXY_URL, url);
  };

  /// <reference types="@acl/interfaces/anti-adblock-declaration" />
  /// <reference types="@acl/interfaces/core-declaration" />
  /// <reference types="@acl/interfaces/afps-declaration" />
  /**
   * Функция, которая в случае обнаружения блокировщика рекламы устанавливает URL прокси-сервера в глобальную переменную
   * `AAB_PROXY_URL` и загружает скрипт `adriver-core`.
   */
  var initAntiAdblock = function () {
      console.log("initAntiAdblock");
      AdblockDetector.check()
          .then(function (hasAdBlock) {
          if (hasAdBlock) {
              console.log("hasAdBlock");
              window.aabpu = PROXY_URL;
              var contentUrl = aabEncode("https://content.adriver.ru/adriver-core-aab.js");
              new ScriptLoader(contentUrl)
                  .load()
                  .then(function () {
                  window.adriverCalls.push(function () {
                      // Core инициализирует FPS до обработки adriverCalls.
                      // В момент вызова этой функции window.AFPS уже гарантированно будет существовать.
                      window.AFPS.subscribe(function (topData) {
                          setIdWithProxy(topData.adrcid, function (originalUrl) { return aabEncodeWith(PROXY_URL, originalUrl); });
                      });
                  });
              });
          }
      });
  };

  initAntiAdblock();

})();

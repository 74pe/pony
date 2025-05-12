
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

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
    const instanceOf = (object, someClass) => {
        if (object) {
            const targetProtoString = Object.prototype.toString.call(someClass.prototype);
            let proto = Object.getPrototypeOf(object);
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
    const number = (something) => typeof something === "number" && !isNaN(something) && isFinite(something);
    /**
     * Функция проверяет, является ли переданный параметр строго объектом.
     * @param something - параметр, который необходимо проверить.
     * @returns true, если переданный параметр является строго объектом, иначе - false.
     * @remarks
     * Под проверкой на строгий объект подрузамевается, что объект создан с только с помощью {} или new Object().
     */
    const strictObject = (something) => Object.prototype.toString.call(something) === "[object Object]";
    /**
     * Функция проверяет, является ли переданный элемент инстансом класса HTMLElement или Document.
     * @param htmlObj - элемент, который необходимо проверить.
     * @returns true, если переданный элемент является инстансом класса HTMLElement или Document, иначе - false.
     */
    const htmlElement = (htmlObj) => instanceOf(htmlObj, HTMLElement) || htmlDocumentElement(htmlObj);
    /**
     * Функция проверяет, является ли переданный элемент инстансом класса Document.
     * @param doc - элемент, который необходимо проверить.
     * @returns true, если переданный элемент является инстансом класса Document.
     */
    const htmlDocumentElement = (doc) => instanceOf(doc, Document);

    /**
     * Регулярно вызывает переданную функцию через интервал времению.
     */
    class Loop {
        /**
         * Числовой id setTimeout.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#return_value
         */
        timeoutId;
        /**
         * Задержка в миллисекундах.
         */
        timeout;
        /**
         * Функция которую надо вызвать.
         */
        cb;
        /**
         * Флаг, указывающий, следует ли продолжать выполнение цикла.
         */
        shouldContinue;
        /**
         * @param cb - функция которую надо вызвать.
         * @param timeout - задержка в миллисекундах.
         */
        constructor(cb, timeout = 0) {
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
        loopIteration() {
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
        start() {
            if (this.timeoutId !== null) {
                return;
            }
            this.shouldContinue = true;
            this.loopIteration();
        }
        /**
         * Останавливает цикл вызовов.
         */
        stop() {
            this.shouldContinue = false;
            if (this.timeoutId === null) {
                return;
            }
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

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
    const getBodyElement = () => {
        if (document.body) {
            return Promise.resolve(document.body);
        }
        return new Promise((resolve) => {
            const loop = new Loop(() => {
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
    const setProperties = (element, properties, propertySetter) => {
        if ((!htmlElement(element) && !(element instanceof SVGElement)) || !strictObject(properties)) {
            return;
        }
        for (const property in properties) {
            const value = number(properties[property]) ? String(properties[property]) : properties[property];
            propertySetter(element, property, value);
        }
    };
    /**
     * Устанавливает стили для элемента.
     * @param element - элемент, для которого устанавливаются стили.
     * @param styles - устанавливаемые стили.
     */
    const setStyles = (element, styles) => setProperties(element, styles, (el, prop, val) => el.style.setProperty(prop, val));

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
    var AdblockDetector = /** @class */ (function () {
        function AdblockDetector() {
        }
        /**
         * Проверяет, активен ли блокировщик рекламы.
         *
         * @returns  Промис, который разрешается в `true`, если обнаружен блокировщик рекламы,
         * в противном случае в `false`.
         */
        AdblockDetector.check = function () {
            var _this = this;
            var adElement = this.createAdElement();
            return getBodyElement()
                .then(function (body) { return new Promise(function (resolve) {
                body.append(adElement);
                var timeoutId = null;
                var cleanup = function () {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    else {
                        document.removeEventListener("DOMContentLoaded", handleContentLoaded);
                    }
                    loop.stop();
                    // adElement.remove();
                };
                var handleContentLoaded = function () {
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
                }
                else {
                    timeoutId = setTimeout(function () {
                        resolve(_this.checkStyles(adElement));
                        cleanup();
                    }, TIMEOUT);
                }
                loop.start();
            }); });
        };
        /**
         * Создает скрытый элемент рекламы для обнаружения блокировщика рекламы.
         *
         * @returns Созданный элемент рекламы.
         */
        AdblockDetector.createAdElement = function () {
            var adElement = document.createElement("div");
            setStyles(adElement, {
                width: SIZE,
                height: SIZE,
                opacity: OPACITY,
                display: "block",
                visibility: "visible"
            });
            return adElement;
        };
        /**
         * Проверяет стили предоставленного элемента для обнаружения блокировщика рекламы.
         *
         * @param element - элемент для проверки.
         *
         * @returns `true`, если обнаружен блокировщик рекламы, в противном случае `false`.
         */
        AdblockDetector.checkStyles = function (element) {
            var elementStyles = window.getComputedStyle(element);
            return (elementStyles.display === "none"
                || elementStyles.visibility === "hidden"
                || elementStyles.height !== SIZE
                || elementStyles.width !== SIZE
                || elementStyles.opacity !== OPACITY);
        };
        return AdblockDetector;
    }());

    var spanEl = document.getElementById("result");
    AdblockDetector.check().then(function (result) {
        console.log("result",result);
        
        spanEl.textContent = "\u0411\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0449\u0438\u043A".concat(result ? "" : " не", " \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D");
        spanEl.style.color = result ? "red" : "green";
    });

})();
//# sourceMappingURL=index.js.map

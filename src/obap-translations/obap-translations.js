/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { ObapElement } from '../obap-element/obap-element.js';
import { obapFetch } from '../obap-fetch/obap-fetch.js';

/*
Manages the global translation dictionary.
*/
class ObapTranslations {
    constructor() {
        this.debug = false;
        this.culture = 'en';
        this.supportedCultures = ['en'];
        this.browserCulture = navigator.language.substring(0, 2);
        this.translations = {};
        this.missingTranslations = {};
        this.currencyOverrides = {};
        this.currencyOverrides['SGD'] = 'USD';
    }

    /**
    * Returns a translation string from a lookup key.
    *
    * @param {string} key The lookup key for a translation string.
    * @param {string} defaultValue An optional default value to use if the key lookup fails. You must escape commas with a backslash (\) character.
    * @param {string} casing An optional case modifier. Valid values are 'upper' (converts to uppercase), 'lower' (converts to lower case) and 'title' (capitalizes the first letter of each word).
    * @param {array} params An optional array of parameter values, which will replace {n} tokens, where n = 0....n, using the array ordinal values.
    * @return {string} The translation string if it exists, otherwise the default value if provided, or the key if a value can't be determined.
    */
    localize(key, defaultValue, casing, params) {
        if (this.translations[key]) {
            if (this.debug) {
                delete this.missingTranslations[key];
            }

            return this._format(this.translations[key], casing, params);
        }

        if (this.debug) {
            this.missingTranslations[key] = defaultValue;
        }

        if (defaultValue !== undefined) {
            return this._format(defaultValue, casing, params);
        }

        return key;
    }

    /**
    * Returns a replacement currency iso code for ones that aren't provided by the browser.
    *
    * @param {string} The currency iso code for which to get the override code, if defined.
    * @return {string} The replacement currency iso code, if one exists, or the original iso code.
    */
    getCurrencyOverride(currencyIsoCode) {
        return this.currencyOverrides[currencyIsoCode] || currencyIsoCode;
    }

    _format(value, casing, params) {
        if (params) {
            for (var i = 0; i < params.length; i++) {
                value = value.replace(new RegExp("\\{" + i + "\\}", "gi"), params[i]);
            }
        }

        if (casing && value) {
            switch (casing) {
                case "upper":
                    return value.toUpperCase();

                case "lower":
                    return value.toLowerCase();

                case "title":
                    return value.replace(/\b\w*/g, function (s) { return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase(); });

                default:
                    return value;
            }
        }

        return value;
    }
}

/*
Web Component to manage translation dictionaries.
*/
export class ObapTranslationsElement extends ObapElement {
    static get properties() {
        return {
            /**
            * The application id (guid).
            *
            * @attribute application-id
            * @type String
            * @default ""
            */
            applicationId: {
                type: String,
                attribute: 'application-id'
            },

            /**
            * The current culture.
            *
            * @attribute culture
            * @type String
            * @default 'en'
            */
           
            culture: {
                type: String,
                attribute: 'culture',
                reflect: true
            },

            /**
            * The culture to use if the requested culture isn't supported.
            *
            * @attribute default-culture
            * @type String
            * @default 'en'
            */
            defaultCulture: {
                type: String,
                attribute: 'default-culture'
            },

            /**
            * An array of cultures that are supported by the application.
            *
            * @attribute supported-cultures
            * @type Array
            * @default "en"
            */
            supportedCultures: {
                type: Array,
                attribute: 'supported-cultures',
                converter: {
                    toAttribute(value) {
                        return value.join(',');
                    },

                    fromAttribute(value) {
                        return value.split(',');
                    }
                }
            },

            /**
            * The actual culture that will be used, which will be 'defaultCulture' if the requested culture isn't supported (in 'supportedCultures'). Failing that, it will be set to 'en'.
            *
            * @type String
            */
            effectiveCulture: { // COMPUTED
                type: String,
                attribute: 'effective-culture'
            },

            /**
            * The 'default' culture to ignore. If this is set, then the default translation strings will be used rather than downloading a translations file for the specified culture.
            *
            * @attribute ignore-culture
            * @type String
            * @default ''
            */
            ignoreCulture: {
                type: String,
                attribute: 'ignore-loccultureale'
            },

            /**
            * The optional version/timestamp for the translation files.
            *
            * @attribute version
            * @type String
            * @default null
            */
            version: {
                type: String,
                attribute: 'version'
            },

            /**
            * The url from which to download the translation dictionary json file.
            *
            * @attribute url
            * @type String
            * @default 'translations/'
            */
            url: {
                type: String,
                attribute: 'url'
            },

            /**
            * The prefix for the culture specific translation dictionary json file. This value will be concatenated with the url and {culture}.json to get the full url ({url}{culture}.json).
            *
            * @attribute file-prefix
            * @type String
            * @default 'translations-'
            */
            filePrefix: {
                type: String,
                attribute: 'file-prefix'
            },

            /**
            * Whether or not to fetch the translations from a web service, rather than a json file.
            *
            * @attribute use-service
            * @type Boolean
            * @default false
            */
            useService: {
                type: Boolean,
                attribute: 'use-service'
            },
        }
    }

    set culture(value) {
        if (this._culture !== value) {
            this._culture = value;
            if (this._isAttached) {
                this._loadDictionary();
            }
        }
    }

    get culture() {
        return this._culture;
    }

    constructor() {
        super();

        this.applicationId = "";
        this._culture = 'en';
        this.defaultCulture = 'en';
        this.supportedCultures = ['en'];
        this.effectiveCulture = ''; // COMPUTE
        this.ignoreCulture = '';
        this.version = '';
        this.url = './translations/';
        this.filePrefix = 'translations-';
        this.useService = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this._isAttached = true;
        this._loadDictionary();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._isAttached = false;
    }

    async _loadDictionary() {
        this.effectiveCulture = this._computeEffectiveCulture(this.culture, this.supportedCultures, this.defaultCulture);

        if (this.effectiveCulture !== this.ignoreCulture) {
            try {
                let result = await obapFetch(this._buildFileName(), 'GET', null, false, null);

                let newTranslations = {};

                if (result !== null) {
                    result.forEach((item) => {
                        newTranslations[item.key] = item.value;
                    });

                    window.ObapTranslations.translations = newTranslations;
                    window.ObapTranslations.culture = this.culture;

                    this.dispatchEvent(new CustomEvent('obap-translations-changed', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            culture: this.culture
                        }
                    }));
                }
            } catch (ex) {
                console.log('ERROR FETCHING TRANSLATIONS');
                console.log(ex);
            }

        } else {
            window.ObapTranslations.translations = {};
        }
    }

    _buildFileName() {
        if (this.useService) {
            return this.url + "?applicationId=" + this.applicationId + "&culture=" + this.effectiveCulture;
        }

        let v = this.version ? "?v=" + this.version : "";
        return this.url + this.filePrefix + this.effectiveCulture + ".json" + v;
    }

    _computeEffectiveCulture(culture, supportedCultures, defaultCulture) {
        if (supportedCultures.indexOf(culture) === -1) {
            return (supportedCultures.indexOf(defaultCulture) === -1) ? "en" : defaultCulture;
        }

        return culture;
    }
}

window.ObapTranslations = new ObapTranslations();

customElements.define('obap-translations', ObapTranslationsElement);
/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
function localize(key, defaultValue, casing, ...params) {
    return window.ObapTranslations ? window.ObapTranslations.localize(key, defaultValue, casing, params) : window.ObapTranslations._format(defaultValue, casing, params);
}
 
function currency(currencyIsoCode, value) {
    if ((value === null) || (value === undefined)) {
        let num = 0;
        currencyIsoCode = window.ObapTranslations ? window.ObapTranslations.getCurrencyOverride(currencyIsoCode) : currencyIsoCode;
        return num.toLocaleString(undefined, { style: 'currency', currencyDisplay: 'symbol', currency: currencyIsoCode }).replace(/[0-9\.]/g, '');
    }
 
    currencyIsoCode = window.ObapTranslations ? window.ObapTranslations.getCurrencyOverride(currencyIsoCode) : currencyIsoCode;
    return value.toLocaleString(undefined, { style: 'currency', currencyDisplay: 'symbol', currency: currencyIsoCode });
}

const ObapTranslationController = (superClass) =>
    class ObapTranslationControllerComponent extends superClass {
        constructor() {
            super();
            this._boundHandleTranslationsChangedEvent = this._handleTranslationsChangedEvent.bind(this);
            this.addEventListener('obap-translations-changed', this._boundHandleTranslationsChangedEvent);
        }

        _handleTranslationsChangedEvent(e) {
            this.requestUpdate();
        }
    };

export { localize, currency, ObapTranslationController }
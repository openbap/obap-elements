/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
class ObapLocalStorage {
    constructor() {
        this._boundHandleStorage = this._handleStorage.bind(this);
        window.addEventListener('storage', this._boundHandleStorage);
    }
 
    /**
    * Adds an item to local storage if it doesn't exist, or modifies the value if it does.
    *
    * @param {String} key The storage item lookup key.
    * @param {Object} val The value to store in local storage (by default the value is converted to JSON).
    * @param {Boolean} useRaw Do not convert the value to JSON.
    */
    modify(key, val, useRaw) {
        let v = useRaw ? val : JSON.stringify(val);
 
        if (window.localStorage.getItem(key) !== null) {
            window.localStorage.setItem(key, v);
            this._fireStorageEvent("modify", key, true);
        } else {
            window.localStorage.setItem(key, v);
            this._fireStorageEvent("add", key, true);
        }
    }
 
    /**
    * Removes an item from local storage.
    *
    * @param {String} key The storage item lookup key.
    */
   remove(key) {
        if (window.localStorage.getItem(key) !== null) {
            window.localStorage.removeItem(key);
            this._fireStorageEvent("remove", key, true);
        }
    }
 
    /**
    * Clears local storage.
    *
    * @param {Array} exclude An array of key values to exclude from the clear.
    */
   clear(exclude) {
        if ((exclude !== undefined) && (exclude !== null) && (exclude.length > 0)) {
            for (var key in window.localStorage) {
                if (exclude.indexOf(key) === -1) {
                    window.localStorage.removeItem(key);
                }
            }
        } else {
            window.localStorage.clear();
        }
 
        this._fireStorageEvent("clear", null, true);
    }
 
    /**
    * Retrieves the value for the given key from local storage.
    *
    * @param {String} key The storage item lookup key.
    * @param {Boolean} useRaw Do not convert the value to an object (assumes the object was stored as JSON).
    *
    * @return {Object}
    */
   get(key, useRaw) {
        var v = window.localStorage.getItem(key);
 
        if ((v !== null) && !useRaw) {
            try {
                v = JSON.parse(v);
            } catch (ex) {
                v = null;
            }
        }
 
        return v;
    }
 
    _handleStorage(ev) {
        if (!ev.key) {
            this._fireStorageEvent("clear", null, false);
        } else {
            if (!ev.newValue) {
                this._fireStorageEvent("remove", ev.key, false);
            } else if (!ev.oldValue) {
                this._fireStorageEvent("add", ev.key, false);
            } else {
                this._fireStorageEvent("modify", ev.key, false);
            }
        }
    }
 
    _fireStorageEvent(eventType, key, local) {
        window.dispatchEvent(new CustomEvent('obap-local-storage-changed', {
            bubbles: true,
            composed: true,
            detail: {
                eventType: eventType,
                key: key,
                local: local
            }
        }));
    }
}
 
let obapLocalStorage = new ObapLocalStorage();
 
export { obapLocalStorage, ObapLocalStorage }
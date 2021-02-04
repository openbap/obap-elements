/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
class ObapShortcutModifierMap {
    constructor() {
        this._map = new Map();
    }

    add(item, characters) {
        this._map.set(characters.join('::').toLowerCase(), item);
    }

    get(key) {
        return this._map.get(key);
    }
}

class ObapShortcutMap {
    constructor(menu) {
        this.menu = menu;

        this._map_none = new ObapShortcutModifierMap();
        this._map_ctrl = new ObapShortcutModifierMap();
        this._map_shift = new ObapShortcutModifierMap();
        this._map_alt = new ObapShortcutModifierMap();
        this._map_ctrl_shift = new ObapShortcutModifierMap();
        this._map_ctrl_alt = new ObapShortcutModifierMap();
        this._map_shift_alt = new ObapShortcutModifierMap();
        this._map_ctrl_alt_shift = new ObapShortcutModifierMap();

        this._previous = null;
    }

    invoke(modifiers, key) {
        const map = this.getModifierMap(modifiers);

        if (map) {
            let item = map.get(key.toLowerCase());

            // Look for multi
            if (!item) {
                if ((this._previous) && (this._previous.modifiers === modifiers)) { 
                    item = map.get((this._previous.key + '::' + key).toLowerCase());
                }
            }

            if (item) {
                this.menu.select(item);
                this._previous = null;
                return true;
            }
        }

        this._previous = { modifiers: modifiers, key: key };

        return false;
    }

    getModifierMap(modifiers) {
        switch (modifiers) {
            case 'none': {
                return this._map_none;
            }

            case 'ctrl': {
                return this._map_ctrl;
            }

            case 'shift': {
                return this._map_shift;
            }

            case 'alt': {
                return this._map_alt;
            }

            case 'ctrl+shift': {
                return this._map_ctrl_shift;
            }

            case 'ctrl+alt': {
                return this._map_ctrl_alt;
            }

            case 'shift+alt': {
                return this._map_shift_alt;
            }

            case 'ctrl+alt+shift': {
                return this._map_ctrl_alt_shift;
            }

            default: {
                return null;
            }
        }
    }
}

export const ObapMenuShortcutController = (superClass) =>
    class ObapMenuShortcutControllerComponent extends superClass {
        static get properties() {
            return {
                handlesShortcuts: {
                    type: Boolean,
                    attribute: 'handles-shortcuts'
                }
            }
        }

        constructor() {
            super();
            this.handlesShortcuts = false;
            this._shortcutMap = new ObapShortcutMap(this);
            this._boundHandleGlobalKeyPressEvent = this._handleGlobalKeyPressEvent.bind(this);
        }

        disconnectedCallback() {
            window.removeEventListener('keydown', this._boundHandleGlobalKeyPressEvent);
            super.disconnectedCallback();
        }

        registerShortcuts(items) {
            const count = this._registerShortcuts(items);

            if (this.handlesShortcuts && count > 0) {
                window.removeEventListener('keydown', this._boundHandleGlobalKeyPressEvent);
                window.addEventListener('keydown', this._boundHandleGlobalKeyPressEvent);
            }
        }

        _registerShortcuts(items) {
            if (!items || items.length === 0) return 0;

            let count = 0;

            items.forEach((item) => {
                if (this.registerShortcut(item)) count++;
                count += this._registerShortcuts(item.items);
            });

            return count;
        }

        registerShortcut(item) {
            let added = false;

            // Allowed modifier combinations: "Ctrl", "Shift", "Alt", "Ctrl+Shift", "Ctrl+Alt", "Shift+Alt", "Ctrl+Alt+Shift"
            if ((item) && (item.shortcut) && (item.shortcut.length > 0)) {
                // Split multi-combination. NOT SUPPORTED AT THE MOMENT - JUST USES THE FIRST COMBINATION.
                let parts = item.shortcut.split(' ');
                let modifiers = 'none';
                let characters = [];

                for (let i = 0; i < parts.length; i++) {
                    let part = parts[i];
                    let lastIndex = part.lastIndexOf('+');

                    if (lastIndex > -1) { // Has modifiers
                        modifiers = part.substr(0, lastIndex).toLowerCase();
                        characters.push(part.substr(lastIndex + 1, part.length));
                    } else {
                        characters.push(part);
                    }
                }

                const map = this._shortcutMap.getModifierMap(modifiers);

                if (map) {
                    map.add(item, characters);
                    added = true;
                }
            }

            return added;
        }

        _buildModifiers(ctrlKey, shiftKey, altKey) {
            // Allowed modifier combinations: "Ctrl", "Shift", "Alt", "Ctrl+Shift", "Ctrl+Alt", "Shift+Alt", "Ctrl+Alt+Shift";
            let modifierArray = [];

            if (ctrlKey) modifierArray.push('ctrl');
            if (shiftKey) modifierArray.push('shift');
            if (altKey) modifierArray.push('alt');

            let modifier = modifierArray.join('+');

            if (modifier === 'ctrl+shift+alt') {
                modifier = 'ctrl+alt+shift';
            }

            if (modifier.length === 0) {
                modifier = 'none';
            }

            return modifier;
        }

        _isAlphaNumeric(keyCode) {
            return (((keyCode >= 48 && keyCode <= 57)) || ((keyCode >= 65 && keyCode <= 90)) || ((keyCode >= 96 && keyCode <= 105)) || (keyCode === 32));
        }

        _handleGlobalKeyPressEvent(e) {
            if (e.repeat || e.isComposing || e.keyCode === 229 || e.key === 'Control' || e.key === 'Shift' || e.key === 'Alt')  {
                return;
            }

            const key = e.key;
            const ctrlKey = e.ctrlKey;
            const shiftKey = e.shiftKey;
            const altKey = e.altKey;

            // Ignore normal typing stuff - alphanumeric characters (and space) with no modifiers (other than shift, for capitalization).
            if (!ctrlKey && !altKey && this._isAlphaNumeric(e.keyCode)) {
                return;
            }

            const modifiers = this._buildModifiers(ctrlKey, shiftKey, altKey);
            this._shortcutMap.invoke(modifiers,key);
            //console.log(modifiers + ":" + key)

            /*
            if (this._shortcutMap.invoke(modifiers, key)) {
                e.preventDefault();
                e.stopPropagation();
            }
            */
        }
    };
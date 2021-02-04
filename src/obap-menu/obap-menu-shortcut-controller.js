/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
class ObapShortcutModifierMap {
    constructor() {
        this._map = new Map();
    }

    add(item, code) {
        const key = code.toLowerCase();

        if (!this._map.has(key)) {
            this._map.set(key, item);
            return true;
        }
        
        false;
    }

    get(code) {
        return this._map.get(code);
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
    }

    invoke(modifiers, code) {
        const map = this.getModifierMap(modifiers);

        if (map) {
            let item = map.get(code.toLowerCase());

            if (item) {
                this.menu.select(item);
                return true;
            }
        }

        return false;
    }

    getModifierMap(modifiers) {
        switch (modifiers) {
            case '': {
                return this._map_none;
            }

            case 'c': {
                return this._map_ctrl;
            }

            case 's': {
                return this._map_shift;
            }

            case 'a': {
                return this._map_alt;
            }

            case 'cs': {
                return this._map_ctrl_shift;
            }

            case 'ca': {
                return this._map_ctrl_alt;
            }

            case 'as': {
                return this._map_shift_alt;
            }

            case 'cas': {
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
            if (this.handlesShortcuts) {
                const count = this._registerShortcuts(items);

                if (count > 0) {
                    window.removeEventListener('keydown', this._boundHandleGlobalKeyPressEvent);
                    window.addEventListener('keydown', this._boundHandleGlobalKeyPressEvent);
                }
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
            if ((item) && (item.shortcut) && (item.shortcut.keys)) {
                // Multi-combination. NOT SUPPORTED AT THE MOMENT - JUST USES THE FIRST COMBINATION.
                let combo = item.shortcut.keys;
                let modifiers = '';

                if (combo.ctrl) modifiers += 'c';
                if (combo.alt) modifiers += 'a';
                if (combo.shift) modifiers += 's';

                const map = this._shortcutMap.getModifierMap(modifiers);

                if (map) {
                    if (map.add(item, combo.code)) {
                        added = true;
                    } else {
                        console.log(`Duplicate menu shortcut: ${modifiers}:${combo.code}`);
                    }
                    
                }
            }

            return added;
        }

        _buildModifiers(ctrlKey, shiftKey, altKey) {
            // Allowed modifier combinations: "Ctrl", "Shift", "Alt", "Ctrl+Shift", "Ctrl+Alt", "Shift+Alt", "Ctrl+Alt+Shift";
            let modifier = '';

            if (ctrlKey) modifier += 'c';
            if (altKey) modifier += 'a';
            if (shiftKey) modifier += 's';

            return modifier;
        }

        _isAlphaNumeric(keyCode) {
            return (((keyCode >= 48 && keyCode <= 57)) || ((keyCode >= 65 && keyCode <= 90)) || ((keyCode >= 96 && keyCode <= 105)) || (keyCode === 32));
        }

        _handleGlobalKeyPressEvent(e) {
            if (e.repeat || e.isComposing || e.keyCode === 229 || e.key === 'Control' || e.key === 'Shift' || e.key === 'Alt') {
                return;
            }

            const code = e.code;
            const ctrlKey = e.ctrlKey;
            const shiftKey = e.shiftKey;
            const altKey = e.altKey;

            // Ignore normal typing stuff - alphanumeric characters (and space) with no modifiers (other than shift, for capitalization).
            if (!ctrlKey && !altKey && this._isAlphaNumeric(e.keyCode)) {
                return;
            }

            const modifiers = this._buildModifiers(ctrlKey, shiftKey, altKey);
            this._shortcutMap.invoke(modifiers, code);


            /*
            if (this._shortcutMap.invoke(modifiers, code)) {
                e.preventDefault();
                e.stopPropagation();
            }
            */
        }
    };
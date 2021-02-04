/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/

import { ObapMenuShortcutController } from './obap-menu-shortcut-controller.js';
/**
TODO
*/
export const ObapMenuController = (superClass) =>
    class ObapMenuControllerComponent extends ObapMenuShortcutController(superClass) {
        static get properties() {
            return {
                items: {
                    type: Array
                },

                activeItem: {
                    type: Object
                },

                parentMenu: {
                    type: Object
                },

                over: {
                    type: Boolean,
                    attribute: 'over',
                    reflect: true
                },

                hasIcons: {
                    type: Boolean,
                    attribute: 'has-icons'
                }
            }
        }

        get hasIcons() {
            return this._hasIcons;
        }

        set hasIcons(value) {
            throw 'hasIcons is readonly'
        }

        get focused() {
            return this._focused;
        }

        get activeItem() {
            return this._activeItem;
        }

        set activeItem(value) {
            if (value && value.disabled) return;

            const oldValue = this.activeItem;

            if (oldValue !== value) {
                this._activeItem = value;

                if (this._activeItem) {
                    this.rootMenu.focus();
                }

                this.requestUpdate('activeItem', oldValue);
            }
        }

        get isRootMenu() {
            return !this.parentMenu;
        }

        get rootMenu() {
            let root = this;

            while (root) {
                const nextRoot = root.parentMenu;

                if (nextRoot) {
                    root = nextRoot;
                } else {
                    break;
                }
            }

            return root;
        }

        get childMenu() {
            return this.renderRoot.querySelector('obap-popup-menu');
        }

        get activeMenu() {
            let activeMenu = this;

            while (activeMenu) {
                const nextMenu = activeMenu.childMenu;

                if (nextMenu && nextMenu.activeItem) {
                    activeMenu = nextMenu;
                } else {
                    break;
                }
            }

            return activeMenu;
        }

        constructor() {
            super();

            this.items = [];
            this._activeItem = null;
            this.parentMenu = null;
            this._focused = false;
            this.tabIndex = 0;
            this.over = false;
            this._hasIcons = false;

            this._boundHandleClick = this._handleClick.bind(this);
            this._boundHandleKeyPress = this._handleKeyPress.bind(this);
            this._boundHandleFocus = this._handleFocus.bind(this);
            this._boundHandleBlur = this._handleBlur.bind(this);
            this._boundHandleMouseEnter = this._handleMouseEnter.bind(this);
            this._boundHandleMouseLeave = this._handleMouseLeave.bind(this);
        }

        updated(changedProperties) {
            super.updated(changedProperties);
    
            changedProperties.forEach((oldValue, propName) => {
                if (propName === 'items') {
                    this._hasIcons = this.items.find((item) => item.toggles || item.icon) ? true : false;
                    this.requestUpdate('hasIcons', null);
                }
            });
        }

        connectedCallback() {
            this.handlesShortcuts = (this.parentMenu === null);
            super.connectedCallback();
            document.addEventListener('click', this._boundHandleClick);

            if (!this.parentMenu) {
                this.registerShortcuts(this.items);
                this.addEventListener('focus', this._boundHandleFocus);
                this.addEventListener('blur', this._boundHandleBlur);
                this.addEventListener('keydown', this._boundHandleKeyPress);
            } else {
                this.addEventListener('mouseenter', this._boundHandleMouseEnter);
                this.addEventListener('mouseleave', this._boundHandleMouseLeave);
            }
        }

        disconnectedCallback() {
            document.removeEventListener('click', this._boundHandleClick);

            if (!this.parentMenu) {
                this.removeEventListener('focus', this._boundHandleFocus);
                this.removeEventListener('blur', this._boundHandleBlur);
                this.removeEventListener('keydown', this._boundHandleKeyPress);
            }

            this.removeEventListener('mouseenter', this._boundHandleMouseEnter);
            this.removeEventListener('mouseleave', this._boundHandleMouseLeave);
            super.disconnectedCallback();
        }

        select(item) {
            if (item && !item.disabled) {
                if (item.items && item.items.length > 0) {
                    if (this.isRootMenu) {
                        (item === this.activeItem) ? this.activeItem = null : this.activeItem = item;
                    }
                } else {
                    if (item.toggles) {
                        item.toggleOn = !item.toggleOn;
                    }

                    this.fireMessage('obap-menu-item-select', { item: item });
                    this.close();
                }
            }
        }

        close(active) {
            if (this.activeItem) {
                if (active) {
                    this.activeItem = null;
                } else {
                    this.rootMenu.activeItem = null;
                }
            }
        }

        _moveFirst(menu) {
            if (menu && menu.items.length > 0) {
                let index = 0;

                const originalIndex = index;
                let item = menu.items[index];

                while (item.disabled) {
                    index++;
                    item = menu.items[index];

                    if (index === originalIndex) break;
                }

                menu.activeItem = item;
            }
        }

        _moveNext(menu) {
            let index = menu.items.indexOf(menu.activeItem) + 1;

            if (index >= menu.items.length) {
                index = 0;
            }

            const originalIndex = index;
            let item = menu.items[index];

            while (item && item.disabled) {
                index++;
                item = menu.items[index];

                if (index === originalIndex) break;
            }

            menu.activeItem = item;
        }

        _movePrevious(menu) {
            let index = menu.items.indexOf(menu.activeItem) - 1;

            if (index < 0) {
                index = menu.items.length - 1;
            }

            const originalIndex = index;
            let item = menu.items[index];

            while (item.disabled) {
                index--;
                item = menu.items[index];

                if (index === originalIndex) break;
            }

            menu.activeItem = item;
        }

        _moveLeft() {
            const menu = this.activeMenu;

            if (menu.isRootMenu) {
                this._movePrevious(menu);
            } else if (menu.parentMenu.isRootMenu) {
                this._movePrevious(this.rootMenu);
            } else {
                menu.over = false;
                menu.close(true);
            }
        }

        _moveRight() {
            const menu = this.activeMenu;

            if (menu.isRootMenu) {
                this._moveNext(menu);
            } else {
                const childMenu = menu.childMenu;

                if (childMenu) {
                    childMenu.over = true;
                    this._moveFirst(childMenu);
                } else {
                    this._moveNext(this.rootMenu);
                }
            }
        }

        _moveUp() {
            const menu = this.activeMenu;

            if (menu.isRootMenu) {

            } else {
                this._movePrevious(menu);
            }
        }

        _moveDown() {
            const menu = this.activeMenu;

            if (menu.isRootMenu) {
                const childMenu = this.childMenu;

                if (childMenu) {
                    childMenu.over = true;
                    this._moveFirst(childMenu);
                }
            } else {
                this._moveNext(menu);
            }
        }

        _handleFocus() {
            this._focused = true;
        }

        _handleBlur() {
            this._focused = false;
        }

        _handleClick(e) {
            if (e.composedPath().indexOf(this) === -1) {
                this.close();
            }
        }

        _handleMouseEnter() {
            const oldValue = this.over;
            this.over = true;
        }

        _handleMouseLeave() {
            const oldValue = this.over;
            this.over = false;
        }

        _handleKeyPress(e) {
            if (this.items.length === 0) return;

            switch (e.key) {
                case 'ArrowLeft': {
                    this._moveLeft();
                    break;
                }

                case 'ArrowRight': {
                    this._moveRight();
                    break;
                }

                case 'ArrowUp': {
                    this._moveUp();
                    break;
                }

                case 'ArrowDown': {
                    this._moveDown();
                    break;
                }

                case 'Escape': {
                    this.close();
                    break;
                }

                case 'Enter': {
                    this.select(this.activeMenu.activeItem);
                    break;
                }
            }

            e.preventDefault();
            e.stopPropagation();
        }
    };
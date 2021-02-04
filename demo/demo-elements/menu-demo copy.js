/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-menu/obap-menu.js';

export class MenuDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
            }
        `];
    }

    static get properties() {
        return {
            items: {
                type: Array
            }
        }
    }

    constructor() {
        super();

        this.items = [
            {
                label: 'File',
                items: [
                    {
                        label: 'New File',
                        shortcut: 'Ctrl+N'
                    },
                    {
                        label: 'New Window',
                        shortcut: 'Ctrl+Shift+N',
                        separator: true
                    },
                    {
                        label: 'Open File...',
                        shortcut: 'Ctrl+O'
                    },
                    {
                        label: 'Open Folder...',
                        shortcut: 'Ctrl+K Ctrl+O'
                    },
                    {
                        label: 'Open Workspace...'
                    },
                    {
                        label: 'Open Recent',
                        separator: true,
                        items: [
                            {
                                label: 'Reopen Closed Editor',
                                shortcut: 'Ctrl+Shift+T',
                                separator: true
                            },
                            {
                                label: 'C:/Dev/one.js'
                            },
                            {
                                label: 'C:/Dev/two.js'
                            },
                            {
                                label: 'C:/Dev/three.js'
                            },
                            {
                                label: 'C:/Dev/four.js',
                                separator: true
                            },
                            {
                                label: 'More...',
                                shortcut: 'Ctrl+R',
                                separator: true
                            },
                            {
                                label: 'Clear Recently Opened'
                            }
                        ]
                    },
                    {
                        label: 'Add Folder to Workspace...'
                    },
                    {
                        label: 'Save Workspace As...',
                        separator: true
                    },
                    {
                        label: 'Save',
                        shortcut: 'Ctrl+S'
                    },
                    {
                        label: 'Save As...',
                        shortcut: 'Ctrl+Shift+S'
                    },
                    {
                        label: 'Save All',
                        shortcut: 'Ctrl+K S',
                        separator: true,
                        disabled: true
                    },
                    {
                        label: 'Auto Save',
                        toggles: true,
                        toggleOn: true
                    },
                    {
                        label: 'Preferences',
                        items: [
                            {
                                label: 'Settings',
                                items: [
                                    {
                                        label: 'Text Editor...'
                                    },
                                    {
                                        label: 'Workbench...'
                                    },
                                    {
                                        label: 'Window...'
                                    },
                                    {
                                        label: 'Features...'
                                    },
                                    {
                                        label: 'Application...'
                                    },
                                    {
                                        label: 'Extensions...'
                                    }
                                ]
                            },
                            {
                                label: 'Online Service Settings'
                            },
                            {
                                label: 'Extensions',
                                shortcut: 'Ctrl+Shift+X',
                                separator: true
                            },
                            {
                                label: 'Keyboard Shortcuts',
                                shortcut: 'Ctrl+K Ctrl+S'
                            },
                            {
                                label: 'Keymaps',
                                shortcut: 'Ctrl+K Ctrl+M',
                                separator: true
                            },
                            {
                                label: 'User Snippets',
                                separator: true
                            },
                            {
                                label: 'Color Theme',
                                shortcut: 'Ctrl+K Ctrl+T'
                            },
                            {
                                label: 'File Icon Theme',
                                separator: true
                            },
                            {
                                label: 'Turn on Settings Sync...'
                            }
                        ],
                        separator: true
                    },
                    {
                        label: 'Revert File'
                    },
                    {
                        label: 'Close Editor',
                        shortcut: 'Ctrl+F4'
                    },
                    {
                        label: 'Close Folder',
                        shortcut: 'Ctrl+K F'
                    },
                    {
                        label: 'Close Window',
                        shortcut: 'Ctrl+W',
                        separator: true,
                    },
                    {
                        label: 'Exit'
                    }
                ]
            },
            {
                label: 'Edit',
                items: [
                    {
                        label: 'Undo',
                        shortcut: 'Ctrl+Z',
                        icon: 'standard:undo'
                    },
                    {
                        label: 'Redo',
                        shortcut: 'Ctrl+Y',
                        icon: 'standard:redo',
                        separator: true
                    },
                    {
                        label: 'Cut',
                        shortcut: 'Ctrl+X',
                        icon: 'standard:content-cut'
                    },
                    {
                        label: 'Copy',
                        shortcut: 'Ctrl+C',
                        icon: 'standard:content-copy'
                    },
                    {
                        label: 'Paste',
                        shortcut: 'Ctrl+V',
                        icon: 'standard:content-paste',
                        separator: true,
                        disabled: true
                    },
                    {
                        label: 'Find',
                        shortcut: 'Ctrl+F'
                    },
                    {
                        label: 'Replace',
                        shortcut: 'Ctrl+H',
                        separator: true
                    },
                    {
                        label: 'Find in Files',
                        shortcut: 'Ctrl+Shift+F'
                    },
                    {
                        label: 'Replace in Files',
                        shortcut: 'Ctrl+Shift+H',
                        separator: true
                    },
                    {
                        label: 'Toggle Line Comment',
                        shortcut: 'Ctrl+/'
                    },
                    {
                        label: 'Toggle Block Comment',
                        shortcut: 'Shift+Alt+A'
                    },
                    {
                        label: 'Emmet: Expand Abbreviation',
                        shortcut: 'Tab'
                    },
                    {
                        label: 'Emmet...'
                    }
                ]
            },
            {
                label: 'Selection',
                items: [
                    {
                        label: 'Select All',
                        shortcut: 'Ctrl+A'
                    },
                    {
                        label: 'Expand Selection',
                        shortcut: 'Shift+Alt+ArrowRight',
                        shortcutLabel: 'Shift+Alt+RightArrow'
                    },
                    {
                        label: 'Shrink Selection',
                        shortcut: 'Shift+Alt+ArrowLeft',
                        shortcutLabel: 'Shift+Alt+LeftArrow',
                        separator: true
                    },
                    {
                        label: 'Copy Line Up',
                        shortcut: 'Shift+Alt+ArrowUp',
                        shortcutLabel: 'Shift+Alt+UpArrow'
                    },
                    {
                        label: 'Copy Line Down',
                        shortcut: 'Shift+Alt+ArrowDown',
                        shortcutLabel: 'Shift+Alt+DownArrow'
                    },
                    {
                        label: 'Move Line Up',
                        shortcut: 'Alt+ArrowUp',
                        shortcutLabel: 'Alt+UpArrow'
                    },
                    {
                        label: 'Move Line Down',
                        shortcut: 'Alt+ArrowDown',
                        shortcutLabel: 'Alt+DownArrow'
                    },
                    {
                        label: 'Duplicate Selection',
                        separator: true
                    },
                    {
                        label: 'Add Cursor Above',
                        shortcut: 'Ctrl+Alt+ArrowUp',
                        shortcutlabel: 'Ctrl+Alt+UpArrow'
                    },
                    {
                        label: 'Add Cursor Below',
                        shortcut: 'Ctrl+Alt+ArrowDown',
                        shortcutlabel: 'Ctrl+Alt+DownArrow'
                    },
                    {
                        label: 'Add Cursors to Line Ends',
                        shortcut: 'Ctrl+Shift+I'
                    },
                    {
                        label: 'Add Next Occurance',
                        shortcut: 'Ctrl+D'
                    },
                    {
                        label: 'Add Previous Occurance'
                    },
                    {
                        label: 'Select All Occurances',
                        shortcut: 'Ctrl+Shift+L',
                        separator: true
                    },
                    {
                        label: 'Switch to Ctrl+Click for Multi-Cursor'
                    },
                    {
                        label: 'Column Selection Mode'
                    }
                ]
            },
            {
                label: 'View',
                items: [
                    {
                        label: 'Command Palette...',
                        shortcut: 'Ctrl+Shift+P'
                    },
                    {
                        label: 'Open View...',     
                        separator: true
                    },
                    {
                        label: 'Appearance',
                        items: [
                            {
                                label: 'Full Screen',
                                shortcut: 'F11'
                            },
                            {
                                label: 'Zen Mode',
                                shortcut: 'Ctrl+K Z'
                            },
                            {
                                label: 'Centered Layout',
                                toggles: true,
                                toggleOn: false,
                                separator: true
                            },
                            {
                                label: 'Show Menu Bar',
                                toggles: true,
                                toggleOn: true
                            },
                            {
                                label: 'Show Side Bar',
                                shortcut: 'Ctrl+B',
                                toggles: true,
                                toggleOn: true
                            },
                            {
                                label: 'Show Status Bar',
                                toggles: true,
                                toggleOn: true
                            },
                            {
                                label: 'Show Activity Bar',
                                toggles: true,
                                toggleOn: true
                            },
                            {
                                label: 'Show Editor Area',
                                toggles: true,
                                toggleOn: true
                            },
                            {
                                label: 'Show Panel',
                                shortcut: 'Ctrl+J',
                                toggles: true,
                                toggleOn: false,
                                separator: true
                            },
                            {
                                label: 'Move Side Bar Right'
                            },
                            {
                                label: 'Move Panel Left'
                            },
                            {
                                label: 'Move Panel Right',
                                separator: true
                            },
                            {
                                label: 'Zoom In',
                                shortcut: 'Ctrl+='
                            },
                            {
                                label: 'Zoom Out',
                                shortcut: 'Ctrl+-'
                            },
                            {
                                label: 'Reset Zoom',
                                shortcut: 'Ctrl+NumPad0'
                            } 
                        ]
                    },
                    {
                        label: 'Editor Layout',
                        items: [
                            {
                                label: 'Split Up'
                            },
                            {
                                label: 'Split Down'
                            },
                            {
                                label: 'Split Left'
                            },
                            {
                                label: 'Split Right',
                                separator: true
                            },
                            {
                                label: 'Single'
                            },
                            {
                                label: 'Two Columns'
                            },
                            {
                                label: 'Three Columns'
                            },
                            {
                                label: 'Two Rows'
                            },
                            {
                                label: 'Three Rows'
                            },
                            {
                                label: 'Grid (2x2)'
                            },
                            {
                                label: 'Two Rows Right'
                            },
                            {
                                label: 'Two Columns Bottom',
                                separator: true
                            },
                            {
                                label: 'Flip Layout',
                                shortcut: 'Shift+Alt+0',
                                separator: true
                            }
                        ],     
                        separator: true
                    },
                    {
                        label: 'Explorer',
                        shortcut: 'Ctrl+Shift+E'
                    },
                    {
                        label: 'Search',
                        shortcut: 'Ctrl+Shift+F'
                    },
                    {
                        label: 'SCM',
                        shortcut: 'Ctrl+Shift+G'
                    },
                    {
                        label: 'Run',
                        shortcut: 'Ctrl+Shift+D'
                    },
                    {
                        label: 'Extensions',
                        shortcut: 'Ctrl+Shift+X',     
                        separator: true
                    },
                    {
                        label: 'Output',
                        shortcut: 'Ctrl+Shift+U'
                    },
                    {
                        label: 'Debug Console',
                        shortcut: 'Ctrl+Shift+Y'
                    },
                    {
                        label: 'Terminal',
                        shortcut: 'Ctrl+`'
                    },
                    {
                        label: 'Problems',
                        shortcut: 'Ctrl+Shift+M',     
                        separator: true
                    },
                    {
                        label: 'Toggle Word Wrap',
                        shortcut: 'Alt+Z'
                    },
                    {
                        label: 'Show Minimap',
                        toggles: true,
                        toggleOn: true
                    },
                    {
                        label: 'Show Breadcrumbs',
                        toggles: true,
                        toggleOn: true
                    },
                    {
                        label: 'Render Whitespace',
                        toggles: true,
                        toggleOn: true
                    },
                    {
                        label: 'Render Control Characters',
                        toggles: true,
                        toggleOn: false
                    }
                ]
            },
            {
                label: 'Go',
                items: [
                    {
                        label: 'Back',
                        shortcut: 'Alt+ArrowLeft',
                        shortcutLabel: 'Alt+LeftArrow'
                    },
                    {
                        label: 'Forward',
                        shortcut: 'Alt+ArrowRight',
                        shortcutLabel: 'Alt+RightArrow',     
                        disabled: true
                    },
                    {
                        label: 'Last Edit Location',
                        shortcut: 'Ctrl+K Ctrl+Q',     
                        separator: true
                    },
                    {
                        label: 'Switch Editor',
                        items: [
                            {
                                label: 'Next Editor',
                                shortcut: 'Ctrl+PageDown'
                            },
                            {
                                label: 'Previous Editor',
                                shortcut: 'Ctrl+PageUp',     
                                separator: true
                            },
                            {
                                label: 'Next Used Editor'
                            },
                            {
                                label: 'Previous Used Editor',
                                separator: true
                            },
                            {
                                label: 'Next Editor in Group',
                                shortcut: 'Ctrl+K Ctrl+PageDown'
                            },
                            {
                                label: 'Previous Editor in Group',
                                shortcut: 'Ctrl+K Ctrl+PageUp',     
                                separator: true
                            },
                            {
                                label: 'Next Used Editor in Group'
                            },
                            {
                                label: 'Previous Used Editor in Group'
                            },
                        ]
                    },
                    {
                        label: 'Switch Group',
                        items: [
                            {
                                label: 'Group 1',
                                shortcut: 'Ctrl+1'
                            },
                            {
                                label: 'Group 2',
                                shortcut: 'Ctrl+2',
                                disabled: true
                            },
                            {
                                label: 'Group 3',
                                shortcut: 'Ctrl+3',
                                disabled: true
                            },
                            {
                                label: 'Group 4',
                                shortcut: 'Ctrl+4',
                                disabled: true
                            },
                            {
                                label: 'Group 5',
                                shortcut: 'Ctrl+5',
                                disabled: true,
                                separator: true
                            },
                            {
                                label: 'Next Group',
                                disabled: true
                            },
                            {
                                label: 'Previous Group',
                                disabled: true,
                                separator: true
                            },
                            {
                                label: 'Group Left',
                                shortcut: 'Ctrl+K Ctrl+ArrowLeft',
                                shortcutLabel: 'Ctrl+K Ctrl+LeftArrow',
                                disabled: true
                            },
                            {
                                label: 'Group Right',
                                shortcut: 'Ctrl+K Ctrl+ArrowRight',
                                shortcutLabel: 'Ctrl+K Ctrl+RightArrow',
                                disabled: true
                            },
                            {
                                label: 'Group Above',
                                shortcut: 'Ctrl+K Ctrl+ArrowUp',
                                shortcutLabel: 'Ctrl+K Ctrl+UpArrow',
                                disabled: true
                            },
                            {
                                label: 'Group Below',
                                shortcut: 'Ctrl+K Ctrl+ArrowDown',
                                shortcutLabel: 'Ctrl+K Ctrl+DownArrow',
                                disabled: true
                            },
                        ],     
                        separator: true
                    },
                    {
                        label: 'Go to File...',
                        shortcut: 'Ctrl+P'
                    },
                    {
                        label: 'Go to Symbol in Workspace...',
                        shortcut: 'Ctrl+T',     
                        separator: true
                    },
                    {
                        label: 'Go to Symbol in Editor...',
                        shortcut: 'Ctrl+Shift+O'
                    },
                    {
                        label: 'Go to Definition',
                        shortcut: 'F12'
                    },
                    {
                        label: 'Go to Declaration'
                    },
                    {
                        label: 'Go to Type Definition'
                    },
                    {
                        label: 'Go to Implementations',
                        shortcut: 'Ctrl+F12'
                    },
                    {
                        label: 'Go to References',
                        shortcut: 'Shift+F12',     
                        separator: true
                    },
                    {
                        label: 'Go to Line/Column',
                        shortcut: 'Ctrl+G'
                    },
                    {
                        label: 'Go to Bracket',
                        shortcut: 'Ctrl+Shift+|', 
                        shortcutLabel: 'Ctrl+Shift+\\',    
                        separator: true
                    },
                    {
                        label: 'Next Problem',
                        shortcut: 'F8'
                    },
                    {
                        label: 'Previous Problem',
                        shortcut: 'Shift+F8',     
                        separator: true
                    },
                    {
                        label: 'Next Change',
                        shortcut: 'Alt+F3'
                    },
                    {
                        label: 'Previous Change',
                        shortcut: 'Shift+Alt+F3'
                    }
                ]
            },
            {
                label: 'Run',
                items: [
                    {
                        label: 'Start Debugging',
                        shortcut: 'F5'
                    },
                    {
                        label: 'Run Without Debugging',
                        shortcut: 'Ctrl+F5'
                    },
                    {
                        label: 'Stop Debugging',
                        shortcut: 'Shift+F5',
                        disabled: true
                    },
                    {
                        label: 'Restart Debugging',
                        shortcut: 'Ctrl+Shift+F5',     
                        separator: true,
                        disabled: true
                    },
                    {
                        label: 'Open Configurations'
                    },
                    {
                        label: 'Add Configuration...',
                        separator: true
                    },
                    {
                        label: 'Step Over',
                        shortcut: 'F10',
                        disabled: true
                    },
                    {
                        label: 'Step Into',
                        shortcut: 'F11',
                        disabled: true
                    },
                    {
                        label: 'Step Out',
                        shortcut: 'Shift+F11',
                        disabled: true
                    },
                    {
                        label: 'Continue',
                        shortcut: 'F5',
                        separator: true,
                        disabled: true
                    },
                    {
                        label: 'Toggle Breakpoint',
                        shortcut: 'F9'
                    },
                    {
                        label: 'New Breakpoint',
                        items: [
                            {
                                label: 'Conditional Breakpoint...'
                            },
                            {
                                label: 'Inline Breakpoint',
                                shortcut: 'Shift+F9'
                            },
                            {
                                label: 'Function Breakpoint...'
                            },
                            {
                                label: 'Logpoint...'
                            }
                        ],
                        separator: true
                    },
                    {
                        label: 'Enable All Breakpoints'
                    },
                    {
                        label: 'Disable All Breakpoints'
                    },
                    {
                        label: 'Remove All Breakpoints',
                        separator: true
                    },
                    {
                        label: 'Install Additional Debuggers...'
                    }
                ]
            },
            {
                label: 'Terminal',
                items: [
                    {
                        label: 'New Terminal',
                        shortcut: 'Ctrl+Shift+~',
                        shortcutLabel: 'Ctrl+Shift+`'
                    },
                    {
                        label: 'Split Terminal',
                        shortcut: 'Ctrl+Shift+%',
                        shortcutLabel: 'Ctrl+Shift+5',
                        separator: true
                    },
                    {
                        label: 'Run Task...'
                    },
                    {
                        label: 'Run Build Task...',
                        shortcut: 'Ctrl+Shift+B'
                    },
                    {
                        label: 'Run Active File'
                    },
                    {
                        label: 'Run Selected Text',
                        separator: true
                    },
                    {
                        label: 'Show Running Tasks...',
                        disabled: true
                    },
                    {
                        label: 'Restart Running Task...',
                        disabled: true
                    },
                    {
                        label: 'Terminate Task...',
                        separator: true,
                        disabled: true
                    },
                    {
                        label: 'Configure Tasks...'
                    },
                    {
                        label: 'Configure Default Build Task...'
                    }
                ]
            },
            {
                label: 'Help',
                items: [
                    {
                        label: 'Welcome'
                    },
                    {
                        label: 'Interactive Playground'
                    },
                    {
                        label: 'Documentation'
                    },
                    {
                        label: 'Release Notes',
                        separator: true
                    },
                    {
                        label: 'Keyboard Shortcuts Reference',
                        shortcut: 'Ctrl+K Ctrl+R'
                    },
                    {
                        label: 'Introductory Videos'
                    },
                    {
                        label: 'Tips and Tricks',
                        separator: true
                    },
                    {
                        label: 'Join Us on Twitter'
                    },
                    {
                        label: 'Search Feature Requests'
                    },
                    {
                        label: 'Report Issue',
                        separator: true
                    },
                    {
                        label: 'View License'
                    },
                    {
                        label: 'Privacy Statement',
                        separator: true
                    },
                    {
                        label: 'Toggle Developer Tools',
                        shortcut: 'Ctrl+Shift+I'
                    },
                    {
                        label: 'Open Process Explorer',
                        separator: true
                    },
                    {
                        label: 'Check For Updates',
                        separator: true
                    },
                    {
                        label: 'About',
                        separator: true
                    }
                ]
            }
        ];
    }
    
    render() {
        return html`
            <div class="container">
                <obap-menu .items="${this.items}" @obap-menu-item-select="${this._menuItemSelect}"></obap-menu>
            </div>
        `;
    }

    _menuItemSelect(e) {
        console.log(e.detail.item.shortcut);
    }
}

window.customElements.define('menu-demo', MenuDemo);
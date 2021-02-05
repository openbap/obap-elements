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
                        shortcut: {
                            label: 'Ctrl+N',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyN'}
                        } 
                    },
                    {
                        label: 'New Window',
                        shortcut: {
                            label: 'Ctrl+Shift+N',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyN'},
                        },
                        separator: true
                    },
                    {
                        label: 'Open File...',
                        shortcut: {
                            label: 'Ctrl+O',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyO'}
                        }
                    },
                    {
                        label: 'Open Folder...',
                        shortcut: {
                            label: 'Alt+O',
                            keys: {ctrl: false, shift: false, alt: true, code: 'KeyO'}
                        }
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
                                shortcut: {
                                    label: 'Ctrl+Shift+T',
                                    keys: {ctrl: true, shift: true, alt: false, code: 'KeyT'}
                                },
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
                                shortcut: {
                                    label: 'Ctrl+Shift+R',
                                    keys: {ctrl: true, shift: true, alt: false, code: 'KeyR'}
                                },
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
                        shortcut: {
                            label: 'Ctrl+S',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyS'}
                        }
                    },
                    {
                        label: 'Save As...',
                        shortcut: {
                            label: 'Ctrl+Shift+S',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyS'}
                        }
                    },
                    {
                        label: 'Save All',
                        shortcut: {
                            label: 'Alt+S',
                            keys: {ctrl: false, shift: false, alt: true, code: 'KeyS'}
                        },
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
                                shortcut: {
                                    label: 'Ctrl+Shift+X',
                                    keys: {ctrl: true, shift: true, alt: false, code: 'KeyX'}
                                },
                                separator: true
                            },
                            {
                                label: 'Keyboard Shortcuts',
                                shortcut: {
                                    label: 'Ctrl+Alt+S',
                                    keys: {ctrl: true, shift: false, alt: true, code: 'KeyS'}
                                }
                            },
                            {
                                label: 'Keymaps',
                                shortcut: {
                                    label: 'Ctrl+M',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'KeyM'}
                                },
                                separator: true
                            },
                            {
                                label: 'User Snippets',
                                separator: true
                            },
                            {
                                label: 'Color Theme',
                                shortcut: {
                                    label: 'Ctrl+T',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'KeyT'}
                                } 
                            },
                            {
                                label: 'File Icon Theme',
                                separator: true
                            },
                            // RADIO START
                            {
                                label: 'Radio 1',
                                toggles: true,
                                toggleGroup: 'preferences'
                            },
                            {
                                label: 'Radio 2',
                                toggles: true,
                                toggleOn: true,
                                toggleGroup: 'preferences'
                            },
                            {
                                label: 'Radio 3',
                                toggles: true,
                                toggleGroup: 'preferences'
                            },
                            {
                                label: 'Radio 4',
                                toggles: true,
                                toggleGroup: 'preferences'
                            },
                            {
                                label: 'Radio 5',
                                toggles: true,
                                separator: true,
                                toggleGroup: 'preferences'
                            },

                            // RADIO END
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
                        shortcut: {
                            label: 'Ctrl+F4',
                            keys: {ctrl: true, shift: false, alt: false, code: 'F4'}
                        }
                    },
                    {
                        label: 'Close Folder',
                        shortcut: {
                            label: 'Alt+F',
                            keys: {ctrl: false, shift: false, alt: true, code: 'KeyF'}
                        }
                    },
                    {
                        label: 'Close Window',
                        shortcut: {
                            label: 'Ctrl+W',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyW'}
                        },
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
                        shortcut: {
                            label: 'Ctrl+Z',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyZ'}
                        },
                        icon: 'standard:undo'
                    },
                    {
                        label: 'Redo',
                        shortcut: {
                            label: 'Ctrl+Y',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyY'}
                        },
                        icon: 'standard:redo',
                        separator: true
                    },
                    {
                        label: 'Cut',
                        shortcut: {
                            label: 'Ctrl+X',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyX'}
                        },
                        icon: 'standard:content-cut'
                    },
                    {
                        label: 'Copy',
                        shortcut: {
                            label: 'Ctrl+C',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyC'}
                        },
                        icon: 'standard:content-copy'
                    },
                    {
                        label: 'Paste',
                        shortcut: {
                            label: 'Ctrl+V',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyV'}
                        },
                        icon: 'standard:content-paste',
                        separator: true,
                        disabled: true
                    },
                    {
                        label: 'Find',
                        shortcut: {
                            label: 'Ctrl+F',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyF'}
                        },
                    },
                    {
                        label: 'Replace',
                        shortcut: {
                            label: 'Ctrl+H',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyH'}
                        },
                        separator: true
                    },
                    {
                        label: 'Find in Files',
                        shortcut: {
                            label: 'Ctrl+Shift+F',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyF'}
                        }
                    },
                    {
                        label: 'Replace in Files',
                        shortcut: {
                            label: 'Ctrl+Shift+H',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyH'}
                        },
                        separator: true
                    },
                    {
                        label: 'Toggle Line Comment',
                        shortcut: {
                            label: 'Ctrl+/',
                            keys: {ctrl: true, shift: false, alt: false, code: 'Slash'}
                        }
                    },
                    {
                        label: 'Toggle Block Comment',
                        shortcut: {
                            label: 'Shift+Alt+A',
                            keys: {ctrl: false, shift: true, alt: true, code: 'KeyA'}
                        }
                    },
                    {
                        label: 'Emmet: Expand Abbreviation',
                        shortcut: {
                            label: 'Tab',
                            keys: {ctrl: false, shift: false, alt: false, code: 'Tab'}
                        }
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
                        shortcut: {
                            label: 'Ctrl+A',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyA'}
                        }
                    },
                    {
                        label: 'Expand Selection',
                        shortcut: {
                            label: 'Shift+Alt+RightArrow',
                            keys: {ctrl: false, shift: true, alt: true, code: 'ArrowRight'}
                        }
                    },
                    {
                        label: 'Shrink Selection',
                        shortcut: {
                            label: 'Shift+Alt+LeftArrow',
                            keys: {ctrl: false, shift: true, alt: true, code: 'ArrowLeft'}
                        },
                        separator: true
                    },
                    {
                        label: 'Copy Line Up',
                        shortcut: {
                            label: 'Shift+Alt+UpArrow',
                            keys: {ctrl: false, shift: true, alt: true, code: 'ArrowUp'}
                        }
                    },
                    {
                        label: 'Copy Line Down',
                        shortcut: {
                            label: 'Shift+Alt+DownArrow',
                            keys: {ctrl: false, shift: true, alt: true, code: 'ArrowDown'}
                        }
                    },
                    {
                        label: 'Move Line Up',
                        shortcut: {
                            label: 'Alt+UpArrow',
                            keys: {ctrl: false, shift: false, alt: true, code: 'ArrowUp'}
                        }
                    },
                    {
                        label: 'Move Line Down',
                        shortcut: {
                            label: 'Alt+DownArrow',
                            keys: {ctrl: false, shift: false, alt: true, code: 'ArrowDown'}
                        }
                    },
                    {
                        label: 'Duplicate Selection',
                        separator: true
                    },
                    {
                        label: 'Add Cursor Above',
                        shortcut: {
                            label: 'Ctrl+Alt+UpArrow',
                            keys: {ctrl: true, shift: false, alt: true, code: 'ArrowUp'}
                        }
                    },
                    {
                        label: 'Add Cursor Below',
                        shortcut: {
                            label: 'Ctrl+Alt+DownArrow',
                            keys: {ctrl: true, shift: false, alt: true, code: 'ArrowDown'}
                        }
                    },
                    {
                        label: 'Add Cursors to Line Ends',
                        shortcut: {
                            label: 'Ctrl+I',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyI'}
                        }
                    },
                    {
                        label: 'Add Next Occurance',
                        shortcut: {
                            label: 'Ctrl+D',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyD'}
                        }
                    },
                    {
                        label: 'Add Previous Occurance'
                    },
                    {
                        label: 'Select All Occurances',
                        shortcut: {
                            label: 'Ctrl+Shift+L',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyL'}
                        },
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
                        shortcut: {
                            label: 'Ctrl+Shift+P',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyP'}
                        }
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
                                shortcut: {
                                    label: 'F11',
                                    keys: {ctrl: false, shift: false, alt: false, code: 'F11'}
                                }
                            },
                            {
                                label: 'Zen Mode',
                                shortcut: {
                                    label: 'Ctrl+Alt+Z',
                                    keys: {ctrl: true, shift: false, alt: true, code: 'KeyZ'}
                                }
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
                                shortcut: {
                                    label: 'Ctrl+B',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'KeyB'}
                                },
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
                                shortcut: {
                                    label: 'Ctrl+J',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'KeyJ'}
                                },
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
                                shortcut: {
                                    label: 'Ctrl+=',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'Equal'}
                                }
                            },
                            {
                                label: 'Zoom Out',
                                shortcut: {
                                    label: 'Ctrl+-',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'Minus'}
                                }
                            },
                            {
                                label: 'Reset Zoom',
                                shortcut: {
                                    label: 'Ctrl+NumPad0',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'Numpad0'}
                                }
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
                                shortcut: {
                                    label: 'Shift+Alt+0',
                                    keys: {ctrl: false, shift: true, alt: true, code: 'Digit0'}
                                },
                                separator: true
                            }
                        ],     
                        separator: true
                    },
                    {
                        label: 'Explorer',
                        shortcut: {
                            label: 'Ctrl+Shift+E',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyE'}
                        }
                    },
                    {
                        label: 'Search',
                        shortcut: {
                            label: 'Ctrl+Alt+F',
                            keys: {ctrl: true, shift: false, alt: true, code: 'KeyF'}
                        }
                    },
                    {
                        label: 'SCM',
                        shortcut: {
                            label: 'Ctrl+Shift+G',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyG'}
                        }
                    },
                    {
                        label: 'Run',
                        shortcut: {
                            label: 'Ctrl+Shift+D',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyD'}
                        }
                    },
                    {
                        label: 'Extensions',
                        shortcut: {
                            label: 'Ctrl+Alt+X',
                            keys: {ctrl: true, shift: false, alt: true, code: 'KeyX'}
                        },     
                        separator: true
                    },
                    {
                        label: 'Output',
                        shortcut: {
                            label: 'Ctrl+Shift+U',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyU'}
                        }
                    },
                    {
                        label: 'Debug Console',
                        shortcut: {
                            label: 'Ctrl+Shift+Y',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyY'}
                        }
                    },
                    {
                        label: 'Terminal',
                        shortcut: {
                            label: 'Ctrl+`',
                            keys: {ctrl: true, shift: false, alt: false, code: 'Backquote'}
                        }
                    },
                    {
                        label: 'Problems',
                        shortcut: {
                            label: 'Ctrl+Shift+M',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyM'}
                        },     
                        separator: true
                    },
                    {
                        label: 'Toggle Word Wrap',
                        shortcut: {
                            label: 'Alt+Z',
                            keys: {ctrl: false, shift: false, alt: true, code: 'KeyZ'}
                        }
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
                        shortcut: {
                            label: 'Alt+ArrowLeft',
                            keys: {ctrl: false, shift: false, alt: true, code: 'ArrowLeft'}
                        }
                    },
                    {
                        label: 'Forward',
                        shortcut: {
                            label: 'Alt+ArrowRight',
                            keys: {ctrl: false, shift: false, alt: true, code: 'ArrowRight'}
                        },     
                        disabled: true
                    },
                    {
                        label: 'Last Edit Location',
                        shortcut: {
                            label: 'Ctrl+Q',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyQ'}
                        },     
                        separator: true
                    },
                    {
                        label: 'Switch Editor',
                        items: [
                            {
                                label: 'Next Editor',
                                shortcut: {
                                    label: 'Ctrl+PageDown',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'PageDown'}
                                }
                            },
                            {
                                label: 'Previous Editor',
                                shortcut: {
                                    label: 'Ctrl+PageUp',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'PageUp'}
                                },     
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
                                shortcut: {
                                    label: 'Alt+PageDown',
                                    keys: {ctrl: false, shift: false, alt: true, code: 'PageDown'}
                                }
                            },
                            {
                                label: 'Previous Editor in Group',
                                shortcut: {
                                    label: 'Alt+PageUp',
                                    keys: {ctrl: false, shift: false, alt: true, code: 'PageUp'}
                                },     
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
                                shortcut: {
                                    label: 'Ctrl+1',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'Digit1'}
                                }
                            },
                            {
                                label: 'Group 2',
                                shortcut: {
                                    label: 'Ctrl+2',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'Digit2'}
                                },
                                disabled: true
                            },
                            {
                                label: 'Group 3',
                                shortcut: {
                                    label: 'Ctrl+3',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'Digit3'}
                                },
                                disabled: true
                            },
                            {
                                label: 'Group 4',
                                shortcut: {
                                    label: 'Ctrl+4',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'Digit4'}
                                },
                                disabled: true
                            },
                            {
                                label: 'Group 5',
                                shortcut: {
                                    label: 'Ctrl+5',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'Digit5'}
                                },
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
                                shortcut: {
                                    label: 'Ctrl+LeftArrow',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'ArrowLeft'}
                                },
                                disabled: true
                            },
                            {
                                label: 'Group Right',
                                shortcut: {
                                    label: 'Ctrl+RightArrow',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'ArrowRight'}
                                },
                                disabled: true
                            },
                            {
                                label: 'Group Above',
                                shortcut: {
                                    label: 'Ctrl+UpArrow',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'ArrowUp'}
                                },
                                disabled: true
                            },
                            {
                                label: 'Group Below',
                                shortcut: {
                                    label: 'Ctrl+DownArrow',
                                    keys: {ctrl: true, shift: false, alt: false, code: 'ArrowDown'}
                                },
                                disabled: true
                            },
                        ],     
                        separator: true
                    },
                    {
                        label: 'Go to File...',
                        shortcut: {
                            label: 'Ctrl+P',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyP'}
                        }
                    },
                    {
                        label: 'Go to Symbol in Workspace...',
                        shortcut: {
                            label: 'Ctrl+Alt+T',
                            keys: {ctrl: true, shift: false, alt: true, code: 'KeyT'}
                        },     
                        separator: true
                    },
                    {
                        label: 'Go to Symbol in Editor...',
                        shortcut: {
                            label: 'Ctrl+Shift+0',
                            keys: {ctrl: true, shift: true, alt: false, code: 'Digit0'}
                        }
                    },
                    {
                        label: 'Go to Definition',
                        shortcut: {
                            label: 'F12',
                            keys: {ctrl: false, shift: false, alt: false, code: 'F12'}
                        }
                    },
                    {
                        label: 'Go to Declaration'
                    },
                    {
                        label: 'Go to Type Definition'
                    },
                    {
                        label: 'Go to Implementations',
                        shortcut: {
                            label: 'Ctrl+F12',
                            keys: {ctrl: true, shift: false, alt: false, code: 'F12'}
                        }
                    },
                    {
                        label: 'Go to References',
                        shortcut: {
                            label: 'Shift+F12',
                            keys: {ctrl: false, shift: true, alt: false, code: 'F12'}
                        },     
                        separator: true
                    },
                    {
                        label: 'Go to Line/Column',
                        shortcut: {
                            label: 'Ctrl+G',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyG'}
                        }
                    },
                    {
                        label: 'Go to Bracket',
                        shortcut: {
                            label: 'Ctrl+Shift+\\',
                            keys: {ctrl: true, shift: true, alt: false, code: 'Backslash'}
                        },    
                        separator: true
                    },
                    {
                        label: 'Next Problem',
                        shortcut: {
                            label: 'F8',
                            keys: {ctrl: false, shift: false, alt: false, code: 'F8'}
                        }
                    },
                    {
                        label: 'Previous Problem',
                        shortcut: {
                            label: 'Shift+F8',
                            keys: {ctrl: false, shift: true, alt: false, code: 'F8'}
                        },     
                        separator: true
                    },
                    {
                        label: 'Next Change',
                        shortcut: {
                            label: 'Alt+F3',
                            keys: {ctrl: false, shift: false, alt: true, code: 'F3'}
                        }
                    },
                    {
                        label: 'Previous Change',
                        shortcut: {
                            label: 'Shift+Alt+F3',
                            keys: {ctrl: false, shift: true, alt: true, code: 'F3'}
                        }
                    }
                ]
            },
            {
                label: 'Run',
                items: [
                    {
                        label: 'Start Debugging',
                        shortcut: {
                            label: 'F5',
                            keys: {ctrl: false, shift: false, alt: false, code: 'F5'}
                        }
                    },
                    {
                        label: 'Run Without Debugging',
                        shortcut: {
                            label: 'Ctrl+F5',
                            keys: {ctrl: true, shift: false, alt: false, code: 'F5'}
                        }
                    },
                    {
                        label: 'Stop Debugging',
                        shortcut: {
                            label: 'Shift+F5',
                            keys: {ctrl: false, shift: true, alt: false, code: 'F5'}
                        },
                        disabled: true
                    },
                    {
                        label: 'Restart Debugging',
                        shortcut: {
                            label: 'Ctrl+Shift+F5',
                            keys: {ctrl: true, shift: true, alt: false, code: 'F5'}
                        },     
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
                        shortcut: {
                            label: 'F10',
                            keys: {ctrl: false, shift: false, alt: false, code: 'F10'}
                        },
                        disabled: true
                    },
                    {
                        label: 'Step Into',
                        shortcut: {
                            label: 'Ctrl+F11',
                            keys: {ctrl: true, shift: false, alt: false, code: 'F11'}
                        },
                        disabled: true
                    },
                    {
                        label: 'Step Out',
                        shortcut: {
                            label: 'Shift+F11',
                            keys: {ctrl: false, shift: true, alt: false, code: 'F11'}
                        },
                        disabled: true
                    },
                    {
                        label: 'Continue',
                        shortcut: {
                            label: 'Alt+F5',
                            keys: {ctrl: false, shift: false, alt: true, code: 'F5'}
                        },
                        separator: true,
                        disabled: true
                    },
                    {
                        label: 'Toggle Breakpoint',
                        shortcut: {
                            label: 'F9',
                            keys: {ctrl: false, shift: false, alt: false, code: 'F9'}
                        }
                    },
                    {
                        label: 'New Breakpoint',
                        items: [
                            {
                                label: 'Conditional Breakpoint...'
                            },
                            {
                                label: 'Inline Breakpoint',
                                shortcut: {
                                    label: 'Shift+F9',
                                    keys: {ctrl: false, shift: true, alt: false, code: 'F9'}
                                }
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
                        shortcut: {
                            label: 'Ctrl+Shift+`',
                            keys: {ctrl: true, shift: true, alt: false, code: 'Backquote'}
                        }
                    },
                    {
                        label: 'Split Terminal',
                        shortcut: {
                            label: 'Ctrl+Shift+5',
                            keys: {ctrl: true, shift: true, alt: false, code: 'Digit5'}
                        },
                        separator: true
                    },
                    {
                        label: 'Run Task...'
                    },
                    {
                        label: 'Run Build Task...',
                        shortcut: {
                            label: 'Ctrl+Shift+B',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyB'}
                        }
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
                        shortcut: {
                            label: 'Ctrl+R',
                            keys: {ctrl: true, shift: false, alt: false, code: 'KeyR'}
                        }
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
                        shortcut: {
                            label: 'Ctrl+Shift+I',
                            keys: {ctrl: true, shift: true, alt: false, code: 'KeyI'}
                        }
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
        console.log(e.detail.item);
    }
}

window.customElements.define('menu-demo', MenuDemo);
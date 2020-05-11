/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.

svg icons Copyright Google https://github.com/google/material-design-icons.
*/
import { obapIcons, getIconNames, getIconGroups } from './obap-icons.js';

obapIcons.addGroup('core', `
    <defs>
        <g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></g>
        <g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g>
        <g id="chevron-up"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></g>
        <g id="chevron-down"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g>
    </defs>
`);

export { obapIcons, getIconNames, getIconGroups }


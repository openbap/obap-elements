/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { SVGTemplateResult } from 'lit-element';

class ObapIcons {
    addGroup(group, template) {
        const svgElement = document.createElement('svg');
        svgElement.innerHTML = template;
        const defs = svgElement.querySelector('defs');

        if (defs) {
            const icons = defs.querySelectorAll('g');

            if (icons.length > 0) {
                if (!window.__obap_icons[group]) {
                    window.__obap_icons[group] = {};
                }

                icons.forEach((icon) => window.__obap_icons[group][icon.id] = new SVGTemplateResult([`<svg viewBox="0 0 24 24">${icon.outerHTML}</svg>`], []));
            }
        }
    }

    /*
    add(name, template) {
        let iconDetails = name.split(':');
        let iconGroup = 'standard';
        let iconName = iconDetails[0];

        if (iconDetails.length > 1) {
            iconGroup = iconDetails[0];
            iconName = iconDetails[1];
        }

        if ((window.__obap_icons[iconGroup] === undefined) || (window.__obap_icons[iconGroup] === null)) {
            window.__obap_icons[iconGroup] = {};
        }

        window.__obap_icons[iconGroup][iconName] = template;
    }
    */

    get(name) {
        let iconDetails = name.split(':');
        let iconGroup = 'standard';
        let iconName = iconDetails[0];

        if (iconDetails.length > 1) {
            iconGroup = iconDetails[0];
            iconName = iconDetails[1];
        }

        if ((window.__obap_icons[iconGroup]) && (window.__obap_icons[iconGroup][iconName])) {
            return window.__obap_icons[iconGroup][iconName];
        }

        return null;
    }

    getNames(group) {
        if ((group === undefined) || (group === null)) {
            group = 'standard';
        }

        if (window.__obap_icons[group]) {
            return Object.getOwnPropertyNames(window.__obap_icons[group]).map((icon) => `${group}:${icon}`);
        }

        return [];
    }

    getGroups() {
        return Object.getOwnPropertyNames(window.__obap_icons).filter((group) => !group.startsWith('_'));
    }
}

const io = new ObapIcons();
window.__obap_icons = window.__obap_icons || {
    __icon_manager: io,
    _get: io.get
};

const obapIcons = window.__obap_icons.__icon_manager;
const getIconNames = obapIcons.getNames;
const getIconGroups = obapIcons.getGroups;

export { obapIcons, getIconNames, getIconGroups }

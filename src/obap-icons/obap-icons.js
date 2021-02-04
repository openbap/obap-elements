/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
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
                if (!window.ObapIcons[group]) {
                    window.ObapIcons[group] = {};
                }

                icons.forEach((icon) => window.ObapIcons[group][icon.id] = new SVGTemplateResult([`<svg viewBox="0 0 24 24">${icon.outerHTML}</svg>`], []));
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

        if ((window.ObapIcons[iconGroup] === undefined) || (window.ObapIcons[iconGroup] === null)) {
            window.ObapIcons[iconGroup] = {};
        }

        window.ObapIcons[iconGroup][iconName] = template;
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

        if ((window.ObapIcons[iconGroup]) && (window.ObapIcons[iconGroup][iconName])) {
            return window.ObapIcons[iconGroup][iconName];
        }

        return null;
    }

    getNames(group) {
        if ((group === undefined) || (group === null)) {
            group = 'standard';
        }

        if (window.ObapIcons[group]) {
            return Object.getOwnPropertyNames(window.ObapIcons[group]).map((icon) => `${group}:${icon}`);
        }

        return [];
    }

    getGroups() {
        return Object.getOwnPropertyNames(window.ObapIcons).filter((group) => {
            return ((group !== 'iconManager') && (group !== 'get'));
        });
    }
}

const io = new ObapIcons();

window.ObapIcons = window.ObapIcons || {
    iconManager: io,
    get: io.get
};

const obapIcons = window.ObapIcons.iconManager;
const getIconNames = obapIcons.getNames;
const getIconGroups = obapIcons.getGroups;

export { obapIcons, getIconNames, getIconGroups }

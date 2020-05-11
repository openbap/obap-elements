# Elevation

Material Design uses drop shadows to simulate elevation (raised elements). This is supported *via* an elevation module that exports CSS classes for each elevation height that can either be applied directly the a custom element (styles :host) or elements within an element. The 0, 1, 2, 3, 4, 6, 8, 12, 16 and 24 pixel height elevations are supported.

## Usage

The method for styling the host or child elements is slightly different.

### Host Elevation

The host elevation imports are named `hostElevation{x}`, where `x` is the elevation height and adds a class with a `:host([elevation="x"])` selector to the styles. You set the elevation by simply adding an `elevation` attribute with the appropriate value to the element when you use it.

Firstly, import the host elevations you want to use, either individually or the whole lot.

```javascript
// Import individual host elevations.
import { hostElevation1, hostElevation2 } from '@obap/obap-elements/obap-styles/obap-elevation.js';

// Import all the host elevations.
import { hostElevation } from '@obap/obap-elements/obap-styles/obap-elevation.js';
```

Then add the host elevation style imports to your element static style getter (don't forget to do this):

```javascript
static get styles() {
    return [hostElevation1, hostElevation2, css`
        :host {
            display: block;
        }
    `];
}

// OR

static get styles() {
    return [hostElevation, css`
        :host {
            display: block;
        }
    `];
}
```

Now, consumers of your element can apply an elevation by using the `elevation` attribute.

```html
<my-element elevation="1"></my-element>
<my-element elevation="2"></my-element>
```

### Child Elevation

The child elevation imports are named `elevation{x}`, where `x` is the elevation height and adds a class called `elevation-{x}` to the element styles. You set the elevation by simply adding the `elevation-{x}` class to the child element that needs an elevation.

Firstly, import the child elevations you want to use, either individually or the whole lot.

```javascript
// Import individual child elevations.
import { elevation1, elevation2 } from '@obap/obap-elements/obap-styles/obap-elevation.js';

// Import all the child elevations.
import { elevation } from '@obap/obap-elements/obap-styles/obap-elevation.js';
```

Then add the child elevation style imports to your element static style getter (don't forget to do this):

```javascript
static get styles() {
    return [elevation1, elevation2, css`
        :host {
            display: block;
        }
    `];
}

// OR

static get styles() {
    return [elevation, css`
        :host {
            display: block;
        }
    `];
}
```

Finally, use the `elevation-{x}` classes.

```javascript
render() {
    return html`
        <div class="elevation-1">Elevation 1</div>
        <div class="elevation-2">Elevation 2</div>
    `;
}
```
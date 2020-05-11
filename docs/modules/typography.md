# Typography

A simplified version of the Material Design guidelines for typography is used, which is mostly based on V1, with a bit from V2 (overline) and the addition of a 'code' (monospace) style. To use the styles you should use the following [Google Web Fonts](https://fonts.google.com/) in your main document:

## Font Importing

The predefined font styles depend on the use of the Roboto (normal and monospace) and Noto fonts. You should always use these fonts as other fonts will probably give inconsistent styling.

### Roboto

Use just the Roboto font if you don't need monospace or simplified Chinese supprt.

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">

<!-- OR -->

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
</style>
```

Use the following CSS rule:

```css
font-family: 'Roboto', sans-serif;
```

### Roboto + Noto

If you need simplifed Chinese support, use the following:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">

<!-- OR -->

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Roboto:wght@300;400;500&display=swap');
</style>
```

Use the following CSS rule:

```css
font-family: 'Roboto', sans-serif;
font-family: 'Noto Sans SC', sans-serif;
```

### Roboto + Roboto Mono + Noto

If you need simplifed Chinese support and Roboto monospace (for code samples), use the following:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Roboto+Mono&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">

<!-- OR -->

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Roboto+Mono&family=Roboto:wght@300;400;500&display=swap');
</style>
```

Use the following CSS rule:

```css
font-family: 'Roboto', sans-serif;
font-family: 'Noto Sans SC', sans-serif;
font-family: 'Roboto Mono', monospace;
```
*You can obviously mix and match the Roboto and Mono fonts the way you need.*

## Predefined Typography Styles

The following font styles are provided as CSS classes *via* module exports:

|Name    |CSS Class          |Module Export|Size|Weight |Case    |
|--------|-------------------|-------------|----|-------|--------|
|Display |typography-display |display      |34px|Regular|Sentence|
|Headline|typography-headline|headline     |24px|Regular|Sentence|
|Title   |typography-title   |title        |20px|Medium |Sentence|
|Subtitle|typography-subtitle|subtitle     |16px|Regular|Sentence|
|Body    |typography-body    |body         |13px|Regular|Sentence|
|Button  |typography-button  |button       |12px|Medium |All caps|
|Caption |typography-caption |caption      |11px|Regular|Sentence|
|Overline|typography-overline|overline     |11px|Regular|All caps|
|Code    |typography-code    |code         |14px|Regular|Sentence|

## Usage

To use the typography styles, you first need to import the style classes you want to use.

```javascript
// Import individual styles.
import { body, caption } from '@obap/obap-elements/obap-styles/obap-typography.js';

// Import all the styles.
import { typography } from '@obap/obap-elements/obap-styles/obap-typography.js';
```

Then add the typography style imports to your element static style getter (don't forget to do this):

```javascript
static get styles() {
    return [body, caption, css`
        :host {
            display: block;
        }
    `];
}

// OR

static get styles() {
    return [typography, css`
        :host {
            display: block;
        }
    `];
}
```

Finally, use the style classes to your markup (the class name is the module import name with a `typography-` prefix):

```javascript
render() {
    return html`
        <div class="typography-body">Body</div>
        <div class="typography-caption">Caption</div>
    `;
}
```
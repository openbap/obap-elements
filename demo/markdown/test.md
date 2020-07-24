# Markdown Demo
---
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
---
## Text Styles

**Bold**
*Italic*
~~Strikethrough~~
`Inline Code`
---
## Lists

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item
---

## Block Quotes

> Normal

> Nested
>> Child
---
## Code

```javascript
// A property setter.
set prop(value) {
    const oldValue = this.prop;

    if (oldValue !== value) {
        this._prop = value;
        this.requestUpdate('prop', oldValue);
    }
}
```
---
## Table

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

---

## Task List
- [x] Write the spec.
- [ ] Do the design.
- [ ] Write the code.
---

## Link

[title](https://www.example.com)
---
---

## Image
![Bob](../demo/images/minions/1.png)
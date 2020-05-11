# Components

This is the list of web components that make up the suite, and will change often until the version 1 release.

## Core Elements, Mixins and Modules

These are mainly JavaScript modules (mixins for LitElement) and non-visual web components that are used extensively by the other components, or provide cross-cutting functionality.

### Styling

These aren't elements, but rather style modules and element mixins.

|Name                                      |Description                                                                |Status            |
|------------------------------------------|-----------------------------------------------------------------------------|:----------------:|
|[Typography](docs/modules/typography.md)  |A set of CSS styles for typography exposed as a module.                      |:white_check_mark:|
|[Theming](docs/modules/theming.md)        |A set of CSS variables used for implementing a theme.                        |:white_check_mark:|
|[Elevation](docs/modules/elevation.md)    |A set of CSS styles for implementing Material Design elevations.             |:white_check_mark:|
|[Iconography](docs/modules/iconography.md)|A set of icons for use with obap-icon and includes the Material Design icons.|:white_check_mark:|

### Classes

|Name                                       |Description                                        |Status            |
|-------------------------------------------|---------------------------------------------------|:----------------:|
|[ObapElement](docs/elements/ObapElement.md)|The base class for all web components in the suite.|:white_check_mark:|

### Mixins

|Name                                                                 |Description                                                |Status            |
|---------------------------------------------------------------------|-----------------------------------------------------------|:----------------:|
|[ObapSelectableMixin](docs/elements/ObapSelectableMixin.md)          |A mixin that can be used to enable single select behaviour.|:white_check_mark:|
|[ObapMultiSelectableMixin](docs/elements/ObapMultiSelectableMixin.md)|A mixin that can be used to enable multi select behaviour. |:white_check_mark:|

### Elements

These are simple non-visual elements that are used extensively by the other elements.

|Name                                           |Description                                                         |Status            |
|-----------------------------------------------|--------------------------------------------------------------------|:----------------:|
|[obap-icon](docs/elements/obap-icon.md)        |Displays a single svg icon.                                         |:white_check_mark:|
|[obap-pages](docs/elements/obap-pages.md)      |A content switcher.                                                 |:white_check_mark:|
|[obap-selector](docs/elements/obap-selector.md)|An element that manages a list of elements that can be selected.    |:white_check_mark:|

## Atomic Components

These are the basic visual Material Design components.

|Name                                           |Tag          |Description                                                         |Status            |
|-----------------------------------------------|-------------|--------------------------------------------------------------------|:----------------:|
|[obap-material](docs/elements/obap-material.md)|obap-material|A Material Design container that looks like a lifted piece of paper.|:white_check_mark:|
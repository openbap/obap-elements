# Components

This is the list of web components that currently make up the suite, and will change often until the version 1 release.

## Core Elements, Mixins and Modules

These are mainly JavaScript modules (mixins for LitElement) and non-visual web components that are used extensively by the other components, or provide cross-cutting functionality.

### Styling

These aren't elements, but rather style modules and element mixins.

|Name                                 |Description                                                                  |
|-------------------------------------|-----------------------------------------------------------------------------|
|[Typography](modules/typography.md)  |A set of CSS styles for typography exposed as a module.                      |
|[Theming](modules/theming.md)        |A set of CSS variables used for implementing a theme.                        |
|[Elevation](modules/elevation.md)    |A set of CSS styles for implementing Material Design elevations.             |
|[Iconography](modules/iconography.md)|A set of icons for use with obap-icon and includes the Material Design icons.|

### Classes

|Name                                  |Description                                        |
|--------------------------------------|---------------------------------------------------|
|[ObapElement](elements/ObapElement.md)|The base class for all web components in the suite.|

### Mixins

|Name                                                                  |Description                                                |
|----------------------------------------------------------------------|-----------------------------------------------------------|
|[ObapSelectorController](elements/ObapSelectorController.md)          |A mixin that can be used to enable single select behaviour.|
|[ObapMultiSelectorController](elements/ObapMultiSelectorController.md)|A mixin that can be used to enable multi select behaviour. |

### Elements

These are simple non-visual elements that are used extensively by the other elements.

|Name                                                          |Description                                                     |
|--------------------------------------------------------------|----------------------------------------------------------------|
|[obap-attached-element](elements/obap-attached-element.md)    |Behaviour that docks an element to another element.             |
|[obap-icon](elements/obap-icon.md)                            |Displays a single svg icon.                                     |
|[obap-pages](elements/obap-pages.md)                          |A content switcher.                                             |
|[obap-selector](elements/obap-selector.md)                    |An element that manages a list of elements that can be selected.|
|[obap-selector-container](elements/obap-selector-container.md)|Synchronizes selection lists, such as tabs to pages.            |

## Atomic Components

These are the basic visual Material Design components.

|Name                                      |Description                                                                           |
|------------------------------------------|--------------------------------------------------------------------------------------|
|[obap-badge](elements/obap-badge.md)      |A small round indicator that attaches to an element and displays a number or icon.    |
|[obap-button](elements/obap-button.md)    |A Material Design Button. Supports regular, raised, icon and fab styles.              |
|[obap-callout](elements/obap-callout.md)  |A speech bubble type element that can either behave like a tooltip or be fixed inline.|
|[obap-card](elements/obap-card.md)        |A Material Design card.                                                               |
|[obap-check](elements/obap-check.md)      |A Material Design checkbox.                                                           |
|[obap-chip](elements/obap-chip.md)        |A Material Design chip.                                                               |
|[obap-material](elements/obap-material.md)|A Material Design container that looks like a lifted piece of paper.                  |
|[obap-tab](elements/obap-tab.md)          |A Material Design tab used with `obap-tabs`.                                          |
|[obap-tabs](elements/obap-tabs.md)        |A Material Design tab set.                                                            |
|[obap-tooltip](elements/obap-tooltip.md)  |A Material Design tooltip that is displayed on mouse hover.                           |
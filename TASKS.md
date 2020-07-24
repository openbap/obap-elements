This is just a long list of elements that I eventually hope to add to the suite. It's more for my own use than anything, but it gives you an idea of where I want to get to. There's a lot of dependencies between the different elements and the order doesn't reflect them, so I won't be implementing them in any particular order. The 'complexity rating' is very rough, especially the 'high' complexity elements, which range from normal complex to OMG complex (data table).

Complete elements are marked with an 'X' while those that are in progress are marked with a '-'.

### UI ELEMENTS
   
|Done|Complexity|Name                   |Notes                                                                                           |
|:--:|:--------:|-----------------------|------------------------------------------------------------------------------------------------|
|X   |H         |obap-styles            |Includes theming, typography and elevation.                                                     |
|X   |H         |obap-selector          |Used by things that require iteme selection - tabs, pages, lists, menus, etc.                   |
|X   |S         |obap-selector-container|Synchronizes selection lists, such as tabs to pages.                                            |
|X   |H         |obap-attached-element  |Behaviour that docks an element to another element - uses by badges, tooltips, etc.             |
|X   |L         |obap-pages             |Manages a list of views with only one being displayed at a time.                                |
|X   |M         |obap-icons             |Manages SVG icon sets and includes all the standard material Design icons.                      |
|X   |L         |obap-icon              |Displays a single SVG icons from an icon set managed by `obap-icons`.                           |
|X   |L         |obap-material          |A Material Design container that looks like a lifted piece of paper.                            |
|X   |M         |obap-tabs              |A Material Design tab set.                                                                      |
|X   |L         |obap-badge             |A small round indicator that attaches to an element and displays a number or icon.              |
|X   |L         |obap-tooltip           |A Material Design tooltip that is displayed on mouse hover.                                     |
|X   |M         |obap-callout           |A speech bubble type element that can either behave like a tooltip or be fixed inline.          |
|X   |M         |obap-ripple            |A Material Design ripple effect that is used to indicate selection (especially by buttons).     |
|X   |H         |obap-button            |A Material Design Button. Supports regular, raised, icon and fab styles.                        |
|X   |L         |obap-check             |A Material Design checkbox.                                                                     |
|X   |M         |obap-radio             |A Material Design radio button and group.                                                       |
|X   |L         |obap-chip              |A Material Design chip.                                                                         |
|X   |M         |obap-card              |A Material Design card.                                                                         |
|X   |M         |obap-scroller          |A container with scroll buttons that allows the content to scroll.                              |
|X   |M         |obap-spinner           |An element that allows you to select from a list of numbers, strings or custom objects.         |
|X   |M         |obap-switch            |A Material Design switch element.                                                               |
|X   |L         |obap-top-app-bar       |An application top toolbar element.                                                             |
|X   |M         |obap-navigation-rail   |A Material Design Navigation Rail element.                                                      |
|X   |M         |obap-collapse-container|A collapsible block of content (horizontal and vertical variants).                              |
|X   |M         |obap-expandable-card   |A Material Design card that expands to display additional content.                              |
|X   |M         |obap-accordion         |An expandable card list.                                                                        |
|X   |L         |obap-pill-navigator    |A navigation element that uses small circles as navigation items (like on a carousel).          |
|X   |L         |obap-rating            |A star rating element.                                                                          |
|X   |H         |obap-dialog            |A Material Design dialog that can be modal or non-modal.                                        |
|X   |M         |obap-linear-progress   |A linear progress bar element.                                                                  |
|X   |M         |obap-circular-progress |A circular progress element.                                                                    |
|X   |M         |obap-activity-indicator|A circular, linear or typing busy/activity indicator.                                           |
|X   |L         |obap-banner            |A Material Design banner/jumbotron element.                                                     |
|X   |H         |obap-horizontal-stepper|A horizontal Material Design Stepper (wizard). Step labels are at the top.                      |
|X   |M         |obap-side-stepper      |A Material Design Stepper (wizard) where the step labels are on the left.                       |
|X   |M         |obap-compact-stepper   |A compact Material Design Stepper (wizard) where the only the active label is displayed.        |
|    |H         |obap-vertical-stepper  |A vertical Material Design Stepper (wizard). Step labels are inline.                            |
|X   |H         |obap-slider            |Sliders allow users to make selections from a range of values.                                  |
|X   |H         |obap-treeview          |A Material Design heirarchical treeview.                                                        |
|    |M         |obap-snackbar          |A popup toast notification element.                                                             |
|    |M         |obap-time-picker       |A Material Design time picker (not the mobile type).                                            |
|    |H         |obap-date-picker       |A Material Design date picker (not the mobile type).                                            |
|    |H         |obap-color-picker      |A Material Design color picker.                                                                 |
|    |M         |obap-date-time-picker  |A combined date and time picker (may just add an optional time picker to obap-date-picker).     |
|    |H         |obap-textfield         |A Material Design text field with floating label.                                               |
|    |H         |obap-textarea          |A Material Design text area with floating label.                                                |
|    |M         |obap-section-list      |A scrollable horizontal list of name/value items.                                               |
|    |M         |obap-navigation-drawer |A slide out drawer that can be anchored to the top, bottom or side.                             |
|    |M         |obap-list              |A scrollable list of items that can optionally be selectable.                                   |
|    |M         |obap-list-item         |A Material Design list item.                                                                    |
|    |L         |obap-image             |An image wrapper element.                                                                       |
|    |M         |obap-carousel          |A content carousel that supports overlays.                                                      |
|    |H         |obap-drag-drop-list    |A list that allows items to be reordered and moved between lists.                               |
|    |M         |obap-linked-selector   |Allows multiple selectors to be linked and share items.                                         |

Count: 38/54

### MENU ELEMENTS

|Done|Complexity|Name                   |Notes                                                                                           |
|:--:|:--------:|-----------------------|------------------------------------------------------------------------------------------------|
|    |H         |obap-overflow-container|A list element that displays overflow elements in a popup overflow menu.                        |
|    |H         |obap-popup-menu        |A popup menu item.                                                                              |
|    |H         |obap-menu              |A top level application menu bar element.                                                       |

Count: 0/3

### DROPDOWN PICKERS

Lots of things could be in a dropdown container. Should there just be a generic one or multiple? They're separate from the other UI elements because I'm not too sure about them.

|Done|Complexity|Name                 |Notes                                   |
|:--:|:--------:|---------------------|----------------------------------------|
|X   |H         |obap-select-container|A generic popup selection container.    |
|X   |M         |obap-select          |A single/multi option dropdown selector.|
|    |L         |obap-date-select     |                                        |
|    |L         |obap-time-select     |                                        |
|    |L         |obap-color-select    |                                        |

Count: 2/5

### DATA TABLE ELEMENTS

|Done|Complexity|Name                  |Notes                                                                                                      |
|:--:|:--------:|----------------------|-----------------------------------------------------------------------------------------------------------|
|X   |H         |obap-data-table-layout|A helper container element to simplify creating complex data table elements.                               |
|X   |H         |obap-data-list        |A simple Material Design data table with minimal features which is suitable for small data sets.           |
|X   |M         |obap-data-pager       |A page switcher element for tables with a lot of data (required by `obap-data-table`). Needs `obap-select`.|
|    |H         |obap-data-table       |A complex Material Design data table suitable for large data sets. Needs `obap-data-pager`.                |

Count: 3/4

### CHART ELEMENTS

Sparklines are very small charts, drawn without adornments, interactivity or other chart-specific elements.

|Done|Complexity|Name                  |Notes                                                                                          |
|:--:|:--------:|----------------------|-----------------------------------------------------------------------------------------------|
|X   |H         |obap-bar-sparkline    |A simple bar chart element.                                                                    |
|X   |H         |obap-bullet-sparkline |A simple horizontal bullet chart element.                                                      |
|X   |H         |obap-line-sparkline   |A simple line chart element that supports lines, markers (scatter) and area styles.            |
|X   |H         |obap-pie-sparkline    |A simple pie or donut chart.                                                                   |
|X   |H         |obap-winloss-sparkline|A simple win-loss chart.                                                                       |

The `obap-chart` elements are the more complex charts.

|Done|Complexity|Name                  |Notes                                                                                          |
|:--:|:--------:|----------------------|-----------------------------------------------------------------------------------------------|
|    |H         |obap-xxx-chart        |A collection of commonly used chart types - this will be separated into individual chart types.|

Count: 5/6

### APPLICATION ELEMENTS

These are high level elements used to construct applications. 

|Done|Complexity|Name                   |Notes                                             |
|:--:|:--------:|-----------------------|--------------------------------------------------|
|X   |M         |obap-router            |A simple view router for obap-application.        |
|X   |M         |obap-translations      |A translation module for obap-application.        |
|X   |M         |obap-local-storage     |A helper library for local storage.               |
|X   |M         |obap-fetch             |A helper library to simplify the fetch API.       |
|-   |H         |obap-application       |A view based desktop application framework.       |
|    |H         |obap-mobile-application|A view based mobile application framework.        |
|    |H         |obap-messaging         |A messaging system for obap-application views.    |
|    |H         |obap-application-state |A Flux-like state manager.                        |
|    |H         |obap-identity          |Handles a user OpenID Connect account, login, etc.|
|    |H         |obap-access-policy     |Handles application feature access for users.     |

*There is no "policy" standard, so `obap-access-policy` will define a standard based on the OBAP Policy Server. The `obap-identity` modules will support the OBAP Identity Server (OIDC) and allow providers (`obap-identity-provider`) to be written for other identity provider types.*

*`obap-application` development will be ongoing, with new features being added as requirements are collected and other elements completed.*

Count: 4/10

### DEMO & DOCUMENTATION ELEMENTS

These are elements to make creating documented demos easily, kind of like the Polymer demo helper elements.

|Done|Complexity|Name                |Notes                                                                                   |
|:--:|:--------:|--------------------|----------------------------------------------------------------------------------------|
|X   |H         |obap-markdown-viewer|A markdown viewer, based on Marked.                                                     |
|-   |H         |obap-demo-snippet   |A helper element that displays the source of a code snippet and its rendered demo.      |
|    |H         |obap-property-viewer|A helper element that displays a custom elements properties, etc.                       |
|    |H         |obap-property-editor|A helper element that displays and allowes editing of a custom elements properties, etc.|

**Dependencies**

* [Marked Library](https://marked.js.org/#/README.md)
* custom-elements.json

Count: 1/4

### NICE TO HAVE

These are unlikely to happen any time soon, but would be really nice to have.

|Done|Complexity|Name                 |Notes                                             |
|:--:|:--------:|---------------------|--------------------------------------------------|
|    |H         |obap-scheduler       |A calender scheduler like the Outlook calendar.   |
|    |H         |obap-task-board      |A kanban/trello board and tasks.                  |
|    |H         |obap-gantt-chart     |A gantt chart element.                            |
|    |H         |obap-dashboard       |A drag & drop dashbard control for cards.         |
|    |H         |obap-diagram         |A diagram editor, like Lucid.                     |
|    |H         |obap-workflow        |A workflow builder.                               |
|    |H         |obap-markdown-editor |A markdown editor, based on ProseMirror.          |

Count: 0/7
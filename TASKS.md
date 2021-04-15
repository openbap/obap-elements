This is just a long list of elements that I eventually hope to add to the suite. It's more for my own use than anything, but it gives you an idea of where I want to get to. There's a lot of dependencies between the different elements and the order doesn't reflect them, so I won't be implementing them in any particular order. The 'complexity rating' is very rough, especially the 'high' complexity elements, which range from normal complex to OMG complex (data table).

Complete elements are marked with an 'X' while those that are in progress are marked with a '-'.

### UI ELEMENTS
   
|Done|Tests|Complexity|Name                   |Notes                                                                                           |
|:--:|:---:|:--------:|-----------------------|------------------------------------------------------------------------------------------------| 
|X   |X    |H         |obap-styles            |Includes theming, typography and elevation.                                                     |
|X   |X    |H         |obap-selector          |Used by things that require iteme selection - tabs, pages, lists, menus, etc.                   |
|X   |X    |S         |obap-selector-container|Synchronizes selection lists, such as tabs to pages.                                            |
|X   |X    |H         |obap-attached-element  |Behaviour that docks an element to another element - uses by badges, tooltips, etc.             |
|X   |X    |L         |obap-pages             |Manages a list of views with only one being displayed at a time.                                |
|X   |X    |M         |obap-icons             |Manages SVG icon sets and includes all the standard material Design icons.                      |
|X   |X    |L         |obap-icon              |Displays a single SVG icons from an icon set managed by `obap-icons`.                           |
|X   |X    |L         |obap-material          |A Material Design container that looks like a lifted piece of paper.                            |
|X   |X    |M         |obap-tabs              |A Material Design tab set.                                                                      |
|X   |X    |L         |obap-badge             |A small round indicator that attaches to an element and displays a number or icon.              |
|X   |X    |L         |obap-tooltip           |A Material Design tooltip that is displayed on mouse hover.                                     |
|X   |X    |M         |obap-callout           |A speech bubble type element that can either behave like a tooltip or be fixed inline.          |
|X   |X    |M         |obap-ripple            |A Material Design ripple effect that is used to indicate selection (especially by buttons).     |
|X   |X    |H         |obap-button            |A Material Design Button. Supports regular, raised, icon and fab styles, with toggle support.   |
|X   |X    |L         |obap-check             |A Material Design checkbox.                                                                     |
|X   |X    |M         |obap-radio             |A Material Design radio button and group.                                                       |
|X   |X    |L         |obap-chip              |A Material Design chip.                                                                         |
|X   |X    |M         |obap-card              |A Material Design card.                                                                         |
|X   |X    |M         |obap-scroll-container  |A container with scroll buttons that allows the content to scroll.                              |
|X   |     |M         |obap-spinner           |An element that allows you to select from a list of numbers, strings or custom objects.         |
|X   |X    |M         |obap-switch            |A Material Design switch element.                                                               |
|X   |X    |L         |obap-top-app-bar       |An application top toolbar element.                                                             |
|X   |X    |M         |obap-navigation-rail   |A Material Design Navigation Rail element.                                                      |
|X   |X    |M         |obap-collapse-container|A collapsible block of content (horizontal and vertical variants).                              |
|X   |X    |M         |obap-expandable-card   |A Material Design card that expands to display additional content.                              |
|X   |X    |M         |obap-accordion         |An expandable card list.                                                                        |
|X   |X    |L         |obap-pill-navigator    |A navigation element that uses small circles as navigation items (like on a carousel).          |
|X   |X    |L         |obap-rating            |A star rating element.                                                                          |
|X   |X    |H         |obap-dialog            |A Material Design dialog that can be modal or non-modal.                                        |
|X   |X    |M         |obap-linear-progress   |A linear progress bar element.                                                                  |
|X   |X    |M         |obap-circular-progress |A circular progress element.                                                                    |
|X   |X    |M         |obap-activity-indicator|A circular, linear or typing busy/activity indicator.                                           |
|X   |X    |L         |obap-banner            |A Material Design banner/jumbotron element.                                                     |
|X   |X    |H         |obap-horizontal-stepper|A horizontal Material Design Stepper (wizard). Step labels are at the top.                      |
|X   |X    |M         |obap-side-stepper      |A Material Design Stepper (wizard) where the step labels are on the left.                       |
|X   |X    |M         |obap-compact-stepper   |A compact Material Design Stepper (wizard) where the only the active label is displayed.        |
|    |     |H         |obap-vertical-stepper  |A vertical Material Design Stepper (wizard). Step labels are inline.                            |
|X   |X    |H         |obap-slider            |Sliders allow users to make selections from a range of values.                                  |
|X   |X    |H         |obap-treeview          |A Material Design heirarchical treeview.                                                        |
|X   |     |M         |obap-splitter          |A splitter element that resizes its adjacent siblings relative to each other.                   |
|X   |     |L         |obap-splitter-container|A horizontal or vertical container with a splitter that allows content areas to be resized.     |
|X   |X    |L         |obap-status-label      |A simple status label.                                                                          |
|X   |     |M         |obap-snackbar          |A popup toast notification element.                                                             |
|X   |     |M         |obap-message-dialog    |A Material Design dialog for displaying simple messages and options.                            |
|    |     |M         |obap-time-picker       |A Material Design time picker (not the mobile type).                                            |
|    |     |H         |obap-date-picker       |A Material Design date picker (not the mobile type).                                            |
|    |     |H         |obap-color-picker      |A Material Design color picker.                                                                 |
|    |     |M         |obap-date-time-picker  |A combined date and time picker (may just add an optional time picker to obap-date-picker).     |
|-   |     |H         |obap-textfield         |A Material Design text field with a floating label.                                             |
|    |     |H         |obap-textarea          |A Material Design text area with a floating label.                                              |
|    |     |M         |obap-section-list      |A scrollable horizontal list of name/value items.                                               |
|    |     |M         |obap-navigation-drawer |A slide out drawer that can be anchored to the top, bottom or side.                             |
|    |     |M         |obap-list              |A scrollable list of items that can optionally be selectable.                                   |
|    |     |M         |obap-list-item         |A Material Design list item.                                                                    |
|    |     |L         |obap-image             |An image wrapper element.                                                                       |
|    |     |M         |obap-carousel          |A content carousel that supports overlays.                                                      |
|    |     |H         |obap-drag-drop-list    |A list that allows items to be reordered and moved between lists.                               |
|    |     |M         |obap-linked-selector   |Allows multiple selectors to be linked and share items.                                         |
|    |     |L         |obap-skeleton          |Display placeholder for content while the data loads.                                           |
|X   |     |M         |obap-input-outline     |An outline element to create a notch that is used in outlined textfields and select elements.   |
|-   |     |M         |obap-toolbar           |A traditional style toolbar.                                                                    |
|    |     |M         |obap-statusbar         |A traditional style statusbar.                                                                  |
|-   |     |M         |obap-navigation-bar    |A Material Design navigation bar for view and sub-view based applications.                      |

Count: 44/63

### LAYOUT ELEMENTS

These are end-user elements (won't be used by framework elements), possibly for use with a wireframe designer, and wrap simple container elements that use flexbox and grid layout. They'll be grouped under `obap-layout`. Not sure if a grid layout is required.

|Done|Tests|Complexity|Name                |Notes                                             |
|:--:|:---:|:--------:|--------------------|--------------------------------------------------|
|-   |     |L         |obap-row-layout     |A single horizontal row layout (can wrap).        |
|-   |     |L         |obap-column-layout  |A single vertical column layout (can wrap).       |
|-   |     |L         |obap-position-layout|Positions a single child in a particular position.|
|    |     |M         |obap-grid-layout    |A grid (multiple column/row) layout.              |

Count: 0/4

### MENU ELEMENTS

|Done|Tests|Complexity|Name                   |Notes                                                                                           |
|:--:|:---:|:--------:|-----------------------|------------------------------------------------------------------------------------------------|
|-   |     |H         |obap-popup-menu        |A popup menu item.                                                                              |
|-   |     |H         |obap-menu              |A top level application menu bar element.                                                       |
|    |     |H         |obap-overflow-container|A list element that displays overflow elements in a popup overflow menu.                        |
|    |     |H         |obap-radial-menu       |A circular or speed-dial type menu.                                                             |

Count: 0/4

### DROPDOWN PICKERS

Lots of things could be in a dropdown container. Should there just be a generic one or multiple? They're separate from the other UI elements because I'm not too sure about them.

|Done|Tests|Complexity|Name                 |Notes                                   |
|:--:|:---:|:--------:|---------------------|----------------------------------------|
|X   |X    |H         |obap-select-container|A generic popup selection container.    |
|X   |X    |M         |obap-select          |A single/multi option dropdown selector.|
|    |     |L         |obap-date-select     |                                        |
|    |     |L         |obap-time-select     |                                        |
|    |     |L         |obap-color-select    |                                        |

Count: 2/5

### DATA TABLE ELEMENTS

|Done|Tests|Complexity|Name                  |Notes                                                                                                                      |
|:--:|:---:|:--------:|----------------------|---------------------------------------------------------------------------------------------------------------------------|
|X   |X    |H         |obap-data-table-layout|A helper container element to simplify creating complex data table elements.                                               |
|X   |X    |M         |obap-data-pager       |A page switcher element for tables with a lot of data (required by `obap-data-table`). Needs `obap-select`.                |
|-   |     |H         |obap-data-table       |A complex Material Design data table suitable for large data sets. Needs `obap-data-pager`.                                |

Count: 2/3

### SPARKLINE CHART ELEMENTS

Sparklines are very small charts, drawn without adornments, interactivity or other chart-specific elements.

|Done|Tests|Complexity|Name                     |Notes                                                                                          |
|:--:|:---:|:--------:|-------------------------|-----------------------------------------------------------------------------------------------|
|X   |X    |H         |obap-bar-sparkline       |A simple bar chart element.                                                                    |
|X   |X    |H         |obap-bullet-sparkline    |A simple horizontal bullet chart element.                                                      |
|X   |X    |H         |obap-line-sparkline      |A simple line chart element that supports lines, markers (scatter) and area styles.            |
|X   |X    |H         |obap-pie-sparkline       |A simple pie or donut chart.                                                                   |
|X   |X    |H         |obap-winloss-sparkline   |A simple win-loss chart.                                                                       |
|X   |X    |H         |obap-percentage-sparkline|A simple percentage bar chart.                                                                 |

Count: 6/6

### CHART ELEMENTS

The `obap-xxx-chart` elements are the more complex charts.

|Done|Tests|Complexity|Name              |Notes                   |
|:--:|:---:|:--------:|------------------|------------------------|
|    |     |H         |obap-bar-chart    |A bar chart element.    |
|    |     |H         |obap-line-chart   |A line chart element.   |
|    |     |H         |obap-area-chart   |A area chart element.   |
|    |     |H         |obap-donut-chart  |A donut chart element.  |
|    |     |H         |obap-pie-chart    |A pie chart element.    |
|    |     |H         |obap-polar-chart  |A polar chart element.  |
|    |     |H         |obap-radar-chart  |A radar chart element.  |
|    |     |H         |obap-bubble-chart |A bubble chart element. |
|    |     |H         |obap-stock-chart  |A stock chart element.  |
|    |     |H         |obap-scatter-chart|A scatter chart element.|
|    |     |H         |obap-bullet-chart |A bullet chart element. |
|    |     |H         |obap-funnel-chart |A funnel chart element. |

Count: 0/12

### PORTALS

This allows DOM content to be projected to different places in a page, while keeping the data context intact.

|Done|Tests|Complexity|Name       |Notes                                                       |
|:--:|:---:|:--------:|-----------|------------------------------------------------------------|
|    |     |H         |obap-portal|A source and destination element for projecting DOM content.|

Based on this [article](https://dev.to/westbrook/your-portal-content-through-a-litelement-5h8b).

Count: 0/1

### APPLICATION ELEMENTS

These are high level elements used to construct applications. 

|Done|Tests|Complexity|Name                      |Notes                                              |
|:--:|:---:|:--------:|--------------------------|---------------------------------------------------|
|X   |     |M         |obap-router               |A simple view router for obap-application.         |
|X   |     |M         |obap-translations         |A translation module for obap-application.         |
|X   |     |M         |obap-local-storage        |A helper library for local storage.                |
|X   |     |M         |obap-fetch                |A helper library to simplify the fetch API.        |
|-   |     |H         |obap-application          |A view based desktop application framework.        |
|-   |     |H         |obap-composite-application|An iFrame view based desktop application framework.|
|    |     |H         |obap-mobile-application   |A view based mobile application framework.         |
|-   |     |H         |obap-messaging            |A messaging system for obap-application views.     |
|    |     |H         |obap-application-state    |A Flux-like state manager.                         |
|    |     |H         |obap-identity             |Handles a user OpenID Connect account, login, etc. |
|    |     |H         |obap-access-policy        |Handles application feature access for users.      |

*There is no "policy" standard, so `obap-access-policy` will define a standard based on the OBAP Policy Server. The `obap-identity` modules will support the OBAP Identity Server (OIDC) and allow providers (`obap-identity-provider`) to be written for other identity provider types.*

*`obap-application` development will be ongoing, with new features being added as requirements are collected and other elements completed.*

Count: 4/11

### DEMO & DOCUMENTATION ELEMENTS

These are elements to make creating documented demos easily, kind of like the Polymer demo helper elements.

|Done|Tests|Complexity|Name                         |Notes                                                                                                                  |
|:--:|:---:|:--------:|-----------------------------|-----------------------------------------------------------------------------------------------------------------------|
|X   |-    |M         |obap-markdown-viewer         |A markdown viewer, based on Marked.                                                                                    |
|X   |X    |M         |obap-demo-snippet            |A helper element that displays the source of a code snippet and its rendered demo.                                     |
|    |     |H         |obap-property-viewer         |A helper element that displays a custom elements properties, etc.                                                      |
|    |     |H         |obap-property-editor         |A helper element that displays and allowes editing of a custom elements properties, etc.                               |
|    |     |H         |obap-interactive-demo-snippet|A helper element that displays the source of a code snippet and its rendered demo, and allows properties to be changed.|

**Dependencies**

* [Marked Library](https://marked.js.org/#/README.md)
* custom-elements.json


Count: 2/5

### NICE TO HAVE

These are unlikely to happen any time soon, but would be really nice to have.

|Done|Tests|Complexity|Name                 |Notes                                             |
|:--:|:---:|:--------:|---------------------|--------------------------------------------------|
|    |     |H         |obap-scheduler       |A calender scheduler like the Outlook calendar.   |
|    |     |H         |obap-task-board      |A kanban/trello board and tasks.                  |
|    |     |H         |obap-gantt-chart     |A gantt chart element.                            |
|    |     |H         |obap-dashboard       |A drag & drop dashbard control for cards.         |
|    |     |H         |obap-diagram         |A diagram editor, like Lucid.                     |
|    |     |H         |obap-workflow        |A workflow builder.                               |
|    |     |H         |obap-markdown-editor |A markdown editor, based on ProseMirror.          |

Count: 0/7
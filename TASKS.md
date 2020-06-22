This is just a long list of elements that I eventually hope to add to the suite. It's more for my own use than anything, but it gives you an idea of where I want to get to. There's a lot of dependencies between the different elements and the order doesn't reflect them, so I won't be implementing them in any particular order. The 'complexity rating' is very rough, especially the 'high' complexity elements, which range from normal complex to OMG complex (data table).

Complete elements are marked with an 'X' while those that are in progress are marked with a '-'.

### UI ELEMENTS
   
|Done|Complexity|Name                   |Notes                                                                                      |
|:--:|:--------:|-----------------------|-------------------------------------------------------------------------------------------|
|X   |H         |obap-styles            |Includes theming, typography and elevation.                                                |
|X   |H         |obap-selector          |Used by things that require iteme selection - tabs, pages, lists, menus, etc.              |
|X   |S         |obap-selector-container|Synchronizes selection lists, such as tabs to pages.                                       |
|X   |H         |obap-attached-element  |Behaviour that docks an element to another element - uses by badges, tooltips, etc.        |
|X   |L         |obap-pages             |Manages a list of views with only one being displayed at a time.                           |
|X   |M         |obap-icons             |Manages SVG icon sets and includes all the standard material Design icons.                 |
|X   |L         |obap-icon              |Displays a single SVG icons from an icon set managed by `obap-icons`.                      |
|X   |L         |obap-material          |A Material Design container that looks like a lifted piece of paper.                       |
|X   |M         |obap-tabs              |A Material Design tab set.                                                                 |
|X   |L         |obap-badge             |A small round indicator that attaches to an element and displays a number or icon.         |
|X   |L         |obap-tooltip           |A Material Design tooltip that is displayed on mouse hover.                                |
|X   |M         |obap-callout           |A speech bubble type element that can either behave like a tooltip or be fixed inline.     |
|X   |M         |obap-ripple            |A Material Design ripple effect that is used to indicate selection (especially by buttons).|
|X   |H         |obap-button            |A Material Design Button. Supports regular, raised, icon and fab styles.                   |
|X   |L         |obap-check             |A Material Design checkbox.                                                                |
|X   |M         |obap-radio             |A Material Design radio button and group.                                                  |
|X   |L         |obap-chip              |A Material Design chip.                                                                    |
|X   |M         |obap-card              |A Material Design card.                                                                    |
|X   |M         |obap-scroller          |A container with scroll buttons that allows the content to scroll.                         |
|X   |M         |obap-spinner           |An element that allows you to select from a list of numbers, strings or custom objects.    |
|X   |M         |obap-switch            |A Material Design switch element.                                                          |
|X   |L         |obap-top-app-bar       |An application top toolbar element.                                                        |
|X   |M         |obap-navigation-rail   |A Material Design Navigation Rail element.                                                 |
|X   |M         |obap-collapse-container|A collapsible block of content (horizontal and vertical variants).                         |
|X   |M         |obap-expandable-card   |A Material Design card that expands to display additional content.                         |
|X   |M         |obap-accordion         |An expandable card list.                                                                   |
|X   |L         |obap-pill-navigator    |A navigation element that uses small circles as navigation items (like on a carousel).     |
|X   |L         |obap-rating            |A star rating element.                                                                     |
|X   |H         |obap-dialog            |A Material Design dialog that can be modal or non-modal.                                   |
|    |M         |obap-linear-progress   |A linear progress bar element.                                                             |
|    |M         |obap-circular-progress |A circular progress/busy element.                                                          |
|X   |H         |obap-horizontal-stepper|A horizontal Material Design Stepper (wizard). Step labels are at the top.                 |
|X   |M         |obap-side-stepper      |A Material Design Stepper (wizard) where the step labels are on the left.                  |
|    |M         |obap-compact-stepper   |A compact Material Design Stepper (wizard) where the only the active label is displayed.   |
|    |H         |obap-vertical-stepper  |A vertical Material Design Stepper (wizard). Step labels are inline.                       |
|    |M         |obap-time-picker       |A Material Design time picker (not the mobile type).                                       |
|    |H         |obap-date-picker       |A Material Design date picker (not the mobile type).                                       |
|    |M         |obap-date-time-picker  |A combined date and time picker (may just add an optional time picker to obap-date-picker).|
|    |H         |obap-textfield         |A Material Design text field with floating label.                                          |
|    |H         |obap-textarea          |A Material Design text area with floating label.                                           |
|    |M         |obap-section-list      |A scrollable horizontal list of name/value items.                                          |
|    |H         |obap-overflow-container|A list element that displays overflow elements in a popup overflow menu.                   |
|    |M         |obap-menu              |A top level application menu bar element.                                                  |
|    |H         |obap-popup-menu        |A popup menu item.                                                                         |
|    |H         |obap-slider            |Sliders allow users to make selections from a range of values.                             |
|    |M         |obap-navigation-drawer |A slide out drawer that can be anchored to the top, bottom or side.                        |
|    |M         |obap-list              |A scrollable list of items that can optionally be selectable.                              |
|    |M         |obap-list-item         |A Material Design list item.                                                               |
|    |M         |obap-data-list         |A simple Material Design data table with minimal features and suitable for small data sets.|
|    |H         |obap-data-table        |A complex Material Design data table suitable for large data sets.                         |
|    |H         |obap-chart             |A collection of commonly used chart types.                                                 |
|    |L         |obap-image             |An image wrapper element.                                                                  |
|    |M         |obap-carousel          |A content carousel that supports overlays.                                                 |
|    |L         |obap-banner            |A banner/jumbotron element.                                                                |
|    |M         |obap-snackbar          |A popup toast notification element.                                                        |
|    |H         |obap-drag-drop-list    |A list that allows items to be reordered and moved between lists.                          |
|    |M         |obap-linked-selector   |Allows multiple selectors to be linked and share items.                                    |

Count: 31/57

### DROPDOWN PICKERS

Lots of things could be in a dropdown container. Should there just be a generic one or multiple? They're separate from the other UI elements because I'm not too sure about them.

|Done|Complexity|Name                 |Notes                                          |
|:--:|:--------:|---------------------|-----------------------------------------------|
|    |H         |obap-select (generic)|                                               |
|    |M         |obap-list-select     |                                               |
|    |L         |obap-date-select     |                                               |
|    |L         |obap-time-select     |                                               |

Count: 0/4

### APPLICATION ELEMENTS

These are high level elements used to construct applications. 

|Done|Complexity|Name                  |Notes                                             |
|:--:|:--------:|----------------------|--------------------------------------------------|
|X   |M         |obap-router           |A simple view router for obap-application.        |
|X   |M         |obap-translations     |A translation module for obap-application.        |
|X   |M         |obap-local-storage    |A helper library for local storage.               |
|X   |M         |obap-fetch            |A helper library to simplify the fetch API.       |
|-   |H         |obap-application      |A view based application framework.               |
|    |H         |obap-messaging        |A messaging system for obap-application views.    |
|    |H         |obap-application-state|A Flux-like state manager.                        |
|    |H         |obap-identity         |Handles a user OpenID Connect account, login, etc.|
|    |H         |obap-access-policy    |Handles application feature access for users.     |

*There is no "policy" standard, so `obap-access-policy` will define a standard based on the OBAP Policy Server. The `obap-identity` modules will support the OBAP Identity Server (OIDC) and allow providers (`obap-identity-provider`) to be written for other identity provider types.*

*`obap-application` development will be ongoing, with new features being added as requirements are collected and other elements completed.*

Count: 4/9

### NICE TO HAVE

These are unlikely to happen any time soon, but would be really nice to have.

|Done|Complexity|Name                |Notes                                          |
|:--:|:--------:|--------------------|-----------------------------------------------|
|    |H         |obap-scheduler      |A calender scheduler like the Outlook calendar.|
|    |H         |obap-task-board     |A kanban/trello board and tasks.               |
|    |H         |obap-gantt-chart    |A gantt chart element.                         |
|    |H         |obap-dashboard      |A drag & drop dashbard control for cards.      |
|    |H         |obap-diagram        |A diagram editor, like Lucid.                  |
|    |H         |obap-workflow       |A workflow builder.                            |
|    |H         |obap-markdown-viewer|A markdown viewer.                             |
|    |H         |obap-markdown-editor|A markdown editor, based on ProseMirror.       |

Count: 0/8
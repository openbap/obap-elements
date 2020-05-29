This is just a long list of elements that I eventually hope to add to the suite. It's more for my own use than anything, but it gives you an idea of where I want to get to. There's a lot of dependencies between the different elements and the order doesn't reflect them, so I won't be implementing them in any particular order. The 'complexity rating' is very rough, especially the 'high' complexity elements, which range from normal complex to OMG complex (data table).

Complete elements are marked with an 'X' while those that are functional, but depend on other elements for additional functionality, are marked with a '-'.

### UI ELEMENTS
   
|Done|Complexity|Name                   |Notes                                                                                      |
|:--:|:--------:|-----------------------|-------------------------------------------------------------------------------------------|
|X   |H         |obap-styles            |Includes theming, typography and elevation.                                                |
|X   |H         |obap-selector          |Used by things that require iteme selection - tabs, pages, lists, menus, etc.              |
|X   |L         |obap-selector-container|Synchronizes selection lists, such as tabs to pages.                                       |
|X   |H         |obap-attached-element  |Behaviour that docks an element to another element - uses by badges, tooltips, etc.        |
|X   |L         |obap-pages             |Manages a list of views with only one being displayed at a time.                           |
|X   |M         |obap-icons             |Manages SVG icon sets and includes all the standard material Design icons.                 |
|X   |L         |obap-icon              |Displays a single SVG icons from an icon set managed by `obap-icons`.                      |
|X   |L         |obap-material          |A Material Design container that looks like a lifted piece of paper.                       |
|-   |M         |obap-tabs              |A Material Design tab set (depends on obap-scroller).                                      |
|X   |L         |obap-badge             |A small round indicator that attaches to an element and displays a number or icon.         |
|X   |L         |obap-tooltip           |A Material Design tooltip that is displayed on mouse hover.                                |
|X   |M         |obap-callout           |A speech bubble type element that can either behave like a tooltip or be fixed inline.     |
|X   |M         |obap-ripple            |A Material Design ripple effect that is used to indicate selection (especially by buttons).|
|X   |H         |obap-button            |A Material Design Button. Tentatively supports regular, raised, icon and fab styles.       |
|X   |L         |obap-check             |A Material Design checkbox.                                                                |
|X   |M         |obap-radio             |A Material Design radio button and group.                                                  |
|X   |L         |obap-chip              |A Material Design chip.                                                                    |
|X   |M         |obap-card              |A Material Design card.                                                                    |
|    |M         |obap-spinner           |
|X   |M         |obap-switch            |
|    |H         |obap-time-picker       |
|    |H         |obap-date-picker       |
|    |H         |obap-textfield         |
|    |H         |obap-textarea          |
|    |H         |obap-horizontal-stepper|
|    |H         |obap-vertical-stepper  |
|    |M         |obap-side-stepper      |
|    |M         |obap-simple-stepper    |
|    |M         |obap-topbar            |
|    |M         |obap-scroller          |
|    |M         |obap-section-list      |
|    |H         |obap-overflow-container|
|    |M         |obap-menu              |
|    |H         |obap-popup-menu        |
|    |H         |obap-slider            |
|    |M         |obap-navigation-drawer |
|    |M         |obap-navigation-rail   |
|    |M         |obap-list              |
|    |M         |obap-list-item         |
|    |M         |obap-data-list         |
|    |H         |obap-data-table        |
|    |H         |obap-charts            |
|    |M         |obap-linear-progress   |
|    |M         |obap-circular-progress |
|    |H         |obap-dialog            |
|    |L         |obap-image             |
|    |M         |obap-carousel          |
|    |L         |obap-banner            |
|    |M         |obap-snackbar          |

Count: 17/50

### DROPDOWN PICKERS

Lots of things could be in a dropdown container. Should there just be a generic one or multiple? They're separate from the other UI elements because I'm not too sure about them.

|Done|Complexity|Name                 |
|:--:|:--------:|---------------------|
|    |H         |obap-select (generic)|
|    |M         |obap-list-select     |
|    |L         |obap-date-select     |
|    |L         |obap-time-select     |

Count: 0/4

### APPLICATION ELEMENTS

These are high level elements used to construct applications. 

|Done|Complexity|Name              |
|:--:|:--------:|------------------|
|    |H         |obap-application  |
|    |M         |obap-router       |
|    |M         |obap-translations |
|    |M         |obap-local-storage|
|    |M         |obap-fetch        |

Count: 0/5

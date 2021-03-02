A composite application consists of a shell application and a number of hosted applications that are contained within iFrames. Each hosted application can have one or more views, which can be managed by the application page or be individual pages (or a combination).

# Creating a Shell Host Application

Creating a host application is very simple, just create an `obap-composite-application` instance and set the `items` property to the application list definition. You can also set the elevation for the title, navigator and content areas using the `elevation` property and respond to the `obap-composite-application-change` event, which is called when a new view is navigated to.

```html
<obap-composite-application .items="${this.applications}" elevation="2" @obap-composite-application-change="${this._onApplicationChange}">

</obap-composite-application>
```

The application list definition (`items`) is where you configure the navigation layout and the host controlled behavior of the applications and views. Applications and their contained views share most of their properties, but their are a few differences that will be highlighted. Below is what an application list definition looks like.

```javascript
[
    {
        // Application Definition.
        items: [
            {
                // View Definition
            },
            {
                // More Views...
            }
        ]
    },
    {
        // More Applications...
    }
]
```
## Application Definition

```javascript
{
    default: true, // Whether or not the application is the default (defaults to false).
    autoLoad: false, // Set this to true if you want the iFrame to load on startup. If false (the default) it only loads when you first navigate to the application.
    bottom: false, // Set to true to show the navigation item at the bottom of the navigation (e.g. for settings). The default is false.
    label: 'My Application' // Mandatory application title/label.
    iconSrc: './apps/my-application/bug.svg', // Optional, if you want to use a separate image file.
    icon: 'bug', // This is an embedded icon name (using an obap-icons collection) if there is no iconSrc, if there is then it is used as the 'alt' text.
    id:' my-application', // Mandatory unique id that is used internally and for route names.
    url: './apps/my-application/index.html', // Optional url to application If there is no url then each view must provide its own url/html page.
    items: [
        // Zero or more view definitions.
    ]
}
```

## View Definition

```javascript
{
    modal: false, // Whether or not the view is modal (defaults to false).
    noNavigation: false, // Hides the view from navigation (defaults to false) so it can only be explicitly invoked. 
    default: true, // Whether or not the view is the default (defaults to false).
    autoLoad: false, // Set this to true if you want the iFrame to load on startup. If false (the default) it only loads when you first navigate to the view.
    bottom: false, // Set to true to show the navigation item at the bottom of the navigation (e.g. for settings). The default is false.
    label: 'My View' // Mandatory view title/label.
    iconSrc: './apps/my-application/views/cloud.svg', // Optional, if you want to use a separate image file.
    icon: 'cloud', // This is an embedded icon name (using an obap-icons collection) if there is no iconSrc, if there is then it is used as the 'alt' text.
    id:' my-view', // Mandatory unique id that is used internally and for route names.
    url: './apps/my-application/views/my-view.html' // Optional url to view. If it isn't provided then the parent application is expected to display the appropriate UI.
}
```

# Creating a Hosted Application with Views and Dialogs

The definitions described in the previous section don't really relate to the application and its views and are only linked by the `id`. An application can contain all its own views (the views in the definition then won't provide their own urls) or delegate the definition of some or all (in which case the application doesn't need its own html page) view to separate view html pages. If you want to show complex dialogs from a view then they also need to be defined in a separate html file (but they don't form part of the application definition).

*Note: An application doesn't have a UI unless it has no views.*

## Creating Views

Conceptually, there is no real difference between an "application" and a "view", the only difference is that an "application" will receive notification events for a child "view" if the view doesn't provide it's own UI html page (so the application is expected to do something instead). From now on the term "view" will apply to both applications and views.

There are 2 ways to create views - you can either use the `obap-composite-hosted-application` element, which uses events for notifications and lifecycle events, or the `ObapCompositeHostedApplicationController` controller/mixin, which uses callbacks for notifications and lifecycle events. The `obap-composite-hosted-application` element just wraps the controller and raises the appropriate events in the corresponding callbacks, so their functionality is identical.

### Using the Element

The element simply contains all the custom content in a single slot, and all you need is to provide the unique view id.

```html
<obap-composite-hosted-application view-id="app-home">
    <div>Whatever Content You Want.</div>
</obap-composite-hosted-application>
```

The following custom events are fired:

|Event           |Body         |Description                                    |
|----------------|-------------|-----------------------------------------------|
|view-initialized|appId, viewId|Fired when the view is first initalized/loaded.|
|view-activated  |appId, viewId|Fired when the view is activated.              |
|view-deactivated|appId, viewId|Fired when the view is deactivated.            |
|view-message    |type, data   |Fired when a custom event is sent to the view. |

The rest of the functionality (methods) is the same as described below for the controller/mixin approach.

### Using the Controller/Mixin

Using Controller/Mixin should be done as follows:

```javascript
import { html, css, LitElement } from 'lit-element';
import { ObapCompositeHostedApplicationController } from '@obap/obap-elements/obap-composite-hosted-application/obap-composite-hosted-application-controller.js';

export class MyApplication extends ObapCompositeHostedApplicationController(LitElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    constructor() {
        super();

        this.viewId = 'my-application';
    }

    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>
        `;
    }

    onViewMessage(message){
        // Custom View Message.
    }

    onViewInitialized(appId, viewId) {
       // View Initialized.
    }

    onViewActivated(appId, viewId) {
        // View Activated.
    }

    onViewDeactivated(appId, viewId) {
        // View Deactivated.
    }
}

window.customElements.define('my-application', MyApplication);
```

The following functions are provided:

```javascript
// Navigates to a new view.
navigateTo(appId, viewId)

// Launches a custom dialog. 'Data' is an optional dictionary containing any data that is passed directly to the dialog.
showDialog(id, url, data, callback)

// Sends a meesage to the host.
sendHostMessage(type, body, callback)

// Sends a message to one or more views. If 'destination' is -1 then all views will be notified, 
// a single id then that view will be notified or else provide and array of id's.
sendViewMessage(type, body, destination, callback)
```

## Creating Dialogs

Like views, there are 2 ways to create dialogs - you can either use the `obap-composite-hosted-application-dialog` element, which uses events for notifications and lifecycle events, or the `ObapCompositeHostedApplicationDialogController` controller/mixin, which uses callbacks for notifications and lifecycle events. The `obap-composite-hosted-application-dialog` element just wraps the controller and raises the appropriate events in the corresponding callbacks, so their functionality is identical.

*Note: Dialogs are always modal*

### Using the Element

The element simply contains all the custom content in a single slot, and all you need is to provide the unique dialog id, the caption and a list of actions (buttons).

```html
<obap-composite-hosted-application-dialog dialog-id="my-dialog" caption="My Dialog" .actions="${this.actions}" 
                                          @dialog-action="${this._onDialogAction}" 
                                          .getResult="${this._getResult}">
    <div>Whatever Content You Want.</div>
</obap-composite-hosted-application-dialog>
```

This is an example of what the actions (buttons) array property looks like:

```javascript
this.actions = [
    {
        key: 'ok',
        label: 'ok',
        raised: true,
        highlight: true,
        dismiss: true
    },
    {
        key: 'cancel',
        label: 'cancel',
        raised: false,
        highlight: false,
        dismiss: true
    },
    {
        key: 'test',
        label: 'test',
        raised: true,
        highlight: false,
        dismiss: false
    }
];
```

Each action has the following properties:

|Property |Description                                                     |
|---------|----------------------------------------------------------------|
|key      |The unique action key or id.                                    |
|label    |The button label.                                               |
|raised   |Whether or not the button is elevated.                          |
|highlight|Whether or not to use the primary color as the background color.|
|dismiss  |Whether or not the action dismisses the dialog.                 |

If an action that *does not dismiss* the dialog is invoked then a `dialog-action` event is fired that can be used to perform some action based on the action what triggered the event, which you can get from `e.detail.action` (which is the action key).

Dialogs are invoked by views, as will be shown in the next section, and when dismissed need to pass some sort of result object back to the view. This is done by passing a handler function to the `getDialogResult` property, which takes the action key as the only parameter. It should return a dictionary object that is passed back to the view, which is expected to know how to deal with it. 

### Using the Controller/Mixin

Using Controller/Mixin should be done as follows:

```javascript
import { ObapCompositeHostedApplicationDialogController } from '@obap/obap-elements/obap-composite-hosted-application/obap-composite-hosted-application-dialog-controller.js';
import { html, css, LitElement } from 'lit-element';

export class MyDialog extends ObapCompositeHostedApplicationDialogController(LitElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {
            actions: {
                type: Array
            }
        }
    }

    constructor() {
        super();
    
        this.actions = [
            {
                key: 'ok',
                label: 'ok',
                raised: true,
                highlight: true,
                dismiss: true
            },
            {
                key: 'cancel',
                label: 'cancel',
                raised: false,
                highlight: false,
                dismiss: true
            },
            {
                key: 'test',
                label: 'test',
                raised: true,
                highlight: false,
                dismiss: false
            }
        ];

        this.dialogId = 'my-dialog';
        this.caption = 'My Dialog';
    }

    render() { 
        return html`
            <div>My Dialog</div>
        `;
    }

    // This is called for actions that don't dismiss the dialog.
    onDialogAction(action) {
        console.log(`DIALOG ACTION '${action}' WAS INVOKED`);
    }

    // This is called for actions that dismiss the dialog.
    getDialogResult(action) {
        return {
            result: `This is the custom result for '${action}'`
        } 
    }
}

window.customElements.define('my-dialog', MyDialog);
```

The following functions are provided:

```javascript
// Launches a custom dialog. 'Data' is an optional dictionary containing any data that is passed directly to the dialog.
showDialog(id, url, data, callback)
```

#### Custom Data

The `showDialog` method allows you to optionally pass a dictionary object containing any data to the dialog HTML page, which can be accessed *via* the `customData` property on `ObapCompositeHostedApplicationDialogController`.

# Using Dialogs

To launch a dialog from a view you call the `showDialog` method which takes the dialog id (it must be the one that the dialog defines), the url for the html page that implements the dialog content, an optional dictionary containing any data that is passed directly to the dialog, and a callback that is called when the dialog is dismissed, which will be passed a custom result dictionary object.

```javascript
showDialog(id, url, data, callback);
```

The method call will look something like this:

```javascript
app.showDialog('my-dialog', './apps/my-app/dialogs/my-dialog.html', { foo: 'bar' } (result) => {
    console.log(result);
});
```

You can also launch a child dialog from another dialog using the same `showDialog` method on `ObapCompositeHostedApplicationDialogController`.

# Displaying Snackbars

You can display a snackbar (toast) from a view using the following 2 methods on `ObapCompositeHostedApplicationDialogController`:

```javascript
// Displays a simple message snackbar with the given timeout (defaults to 4 seconds if you don't provide a value).
showSnackbar(message, timeout);

// Displays an action message snackbar with an action button with the given action text value. You can optionally provide a parameterless callback that is called when the snackbar is dismissed.
showActionSnackbar(message, action, callback);
```

Calling the functions looks like this:

```javascript
this.showSnackbar('This is a message.', 3000);

this.showActionSnackbar('This is an action message.', 'dismiss', () => {
    console.log('*** ACTION SNACKBAR DISMISSED ***');
});
```

# Displaying Message Dialogs

If you just need to display a simple message in a dialog box or maybe let the user make a yes/no choice then the `showMessageDialog` that is available for views and dialogs should be used, and has the following signature:

```javascript
showMessageDialog(caption, message, actions, callback);
```

The `actions` property is an array of action button definition objects, with the following properties:

|Property |Description                                                     |
|---------|----------------------------------------------------------------|
|key      |The unique action key or id.                                    |
|label    |The button label.                                               |
|raised   |Whether or not the button is elevated.                          |
|highlight|Whether or not to use the primary color as the background color.|

All actions dismiss the dialog.

The optional callback is passed the action key that was clicked to dismiss the dialog. Calling the function looks like this:

```javascript
this.showMessageDialog('Confirmation', 'Do you really want to do this?',
    [
        {
            key: 'yes',
            label: 'yes',
            raised: true,
             highlight: true
        },
        {
            key: 'no',
            label: 'no',
            raised: false,
            highlight: false
        }
    ], (action) => {
        console.log(`*** MESSAGE DIALOG DISMISSED: ${action} ***`);
    }
);
```

# Theming

Everything uses the OBAP Theming functionality (`obap-composite-application` includes `ObapThemeController`) so you can add and change themes on ``obap-composite-application` just by calling the follow methods:

```javascript
const shell = document.querySelector('obap-composite-application');

shell.addTheme('green', '#80e27e', '#4caf50', '#087f23', '#ffc107', '#FAFAFA');
shell.theme = 'green';
```

Views and dialogs will automatically be passed theme information (provided you use the appropriate wrapper elements or controllers/mixins), so all you need to do is use the `--obap-xxx` CSS variables as usual and everything will just work.

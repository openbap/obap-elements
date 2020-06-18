/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/

// http://my.domain.com/{application}.html{?parameters}#{view}/{subview}

/*
route = {
    name: 'view-one',
    pattern: 'view-one'
}
*/

window.ObapRouter = window.ObapRouter || {};
window.ObapRouter.launchParameters = window.ObapRouter.launchParameters || null;

class ObapRoute {
    constructor(name, pattern, isDefault) {
        this.name = name;
        this.pattern = pattern;
        this.isDefault = isDefault || false;
    }
}

const ObapRouterController = (superClass) =>
    class ObapRouterControllerComponent extends superClass {
        static get properties() {
            return {
                routes: {
                    type: Object
                }
            }
        }

        get currentRoute() {
            return this._currentRoute;
        }

        set currentRoute(value) {
            const currentName = this.currentRoute ? this.currentRoute.name : '';
            const newName = value ? value.name : '';

            if (currentName !== newName) {
                this._currentRoute = value;

                if (!this._popping) {
                    history.pushState(this._currentParameters, '', this._buildUrl());
                }
            }
        }

        constructor() {
            super();

            this.routes = {};
            this._defaultRouteName = null;
            this._path = null;
            this._currentRoute = null;
            window.ObapRouter.launchParameters = null;
            this._boundHandleOnPopStateEvent = this._handleOnPopStateEvent.bind(this);
            this._boundHandleChangeRouteEvent = this._handleChangeRouteEvent.bind(this);
        }

        connectedCallback() {
            super.connectedCallback();
            window.addEventListener('popstate', this._boundHandleOnPopStateEvent);
            window.addEventListener('obap-change-route', this._boundHandleChangeRouteEvent);
        }

        disconnectedCallback() {
            window.removeEventListener('popstate', this._boundHandleOnPopStateEvent);
            window.removeEventListener('obap-change-route', this._boundHandleChangeRouteEvent);
            super.disconnectedCallback();
        }

        registerRoute(route) {
            this.routes[route.name] = route;

            if (route.isDefault) {
                this._defaultRouteName = route.name;
            }
        }

        registerRoutes(routes) {
            routes.forEach((route) => this.registerRoute(route));
        }

        setDefaultRoute(name) {
            let route = this.getRoute(name);

            if (route) {
                route.isDefault = true;
                this._defaultRouteName = name;
            }
        }

        unregisterRoute(name) {
            delete this.routes[name];
        }

        getRoute(name) {
            return this.routes[name];
        }

        navigateBack() {
            history.back();
        }

        navigateForward() {
            history.forward();
        }

        navigateToDefault(override) {
            if (this._getRouteCount() === 0) {
                return;
            }

            if (override) {
                const r = this._getRouteFromUrl();
                this.setCurrentRoute(r.name);
            }
            else if (this._defaultRouteName) {
                this.setCurrentRoute(this._defaultRouteName);
            }
        }

        setCurrentRoute(name) {
            if ((this.currentRoute) && (this.currentRoute.name === name)) {
                return;
            }
            
            let route = this.getRoute(name);

            if (route) {
                this.currentRoute = route;
                
                if (this.onRouteChange) {
                    this.onRouteChange(name);
                }
            }
        }

        _fireEvent(eventName, detail) {
            let event = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: true
            });

            this.dispatchEvent(event);
        }

        _getRouteCount() {
            return Object.keys(this.routes).length;
        }

        _mapRoute(route) {
            if ((route) && (route.name === '')) {
                const names = Object.keys(this.routes);

                for (let i = 0; i < names.length; i++) {
                    const r = this.routes[names[i]];

                    if ((r) && ((r.pattern === route.pattern) || ((route.pattern === '') && (r.isDefault)))) {
                        return r;
                    }
                }
            }

            return route;
        }

        _setRouteFromUrl() {
            let pattern = location.hash.replace('#', '');
            let data = {};

            location.href.replace(location.hash, '').replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => data[key] = value);
            this._path = location.pathname;
            let newRoute = new ObapRoute('', pattern);

            if (window.ObapRouter.launchParameters === null) {
                window.ObapRouter.launchParameters = data;
            }

            this.currentRoute = this._mapRoute(newRoute);
        }

        _getRouteFromUrl() {
            let data = {};
            let pattern = location.hash.replace('#', '');

            location.href.replace(location.hash, '').replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => data[key] = value);
            this._path = location.pathname;

            if (window.ObapRouter.launchParameters === null) {
                window.ObapRouter.launchParameters = data;
            }

            return this._mapRoute(new ObapRoute('', pattern));
        }

        _handleOnPopStateEvent(e) {
            const route = this._getRouteFromUrl();

            if (route) {
                this._popping = true;
                this.setCurrentRoute(route.name);
                this._popping = false;
            }
        }

        _handleChangeRouteEvent(e) {
            const routeName = e.detail.routeName;
            this.setCurrentRoute(routeName);
        }

        _buildUrl() {
            let url = location.origin + location.pathname;

            if ((this.currentRoute) && (this.currentRoute.name)) {
                if (window.ObapRouter.launchParameters) {
                    const paramNames = Object.keys(window.ObapRouter.launchParameters);
  
                    const params = [];

                    if ((paramNames) && (paramNames.length > 0)) {
                        for (let i = 0; i < paramNames.length; i++) {
                            const name = paramNames[i];
                            params.push(`${name}=${window.ObapRouter.launchParameters[name]}`);
                        }

                        url += `?${params.join('&')}`;
                    }
                }

                if (!this.currentRoute.isDefault) {
                    url += `#${this.currentRoute.pattern}`;
                }
            }

            return url;
        }
    };

export { ObapRouterController, ObapRoute }
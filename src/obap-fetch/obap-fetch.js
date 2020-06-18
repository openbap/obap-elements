/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
class ObapFetch {
    /*
    * Makes an HTTP API call to the provided URL.
    *
    * @param {url:string} The endpoint to call.
    * @param {method:string} The HTTP method to use (GET, POST, PUT, etc.).
    * @param {body:object} An optional body (set to null if not required).
    * @param {token:string} An optional OAuth2 bearer token.
    * 
    * @return {Promise}
    */
    static fetch(url, method, body, token) {
        return new Promise((resolve, reject) => {
            let options = this._getOptions(method, body, token);

            fetch(url, options)
                .then((response) => {
                    let contentType = response.headers.get('content-type');

                    if (contentType && contentType.includes('application/json')) {
                        return { status: response.status, statusText: response.statusText, response: response.json() }
                    } else {
                        return { status: response.status, statusText: response.statusText, response: null }
                    }
                })
                .then((result) => {
                    if (result) {
                        if ((result.status === 401) || (result.status === 405) || (result.status === 500)) {
                            reject({ status: result.status, statusText: result.statusText });
                        } else {
                            resolve(result.response);
                        }
                    }
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }

    static _getOptions(method, body, token) {
        if (body === null) {
            body = undefined;
        }

        let options = {
            method: method,
            cache: 'no-cache',
            redirect: 'follow',
            referrer: 'no-referrer',
            body: undefined,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept-Language': navigator.language.substring(0, 2),
                'accept': 'application/json'
            }
        }

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }

        return options;
    }
}

function obapFetch(url, method, body, token) {
    return ObapFetch.fetch(url, method, body, token);
}

export { obapFetch }
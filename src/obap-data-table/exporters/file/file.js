/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/

let _global = typeof window === 'object' && window.window === window
    ? window : typeof self === 'object' && self.self === self
        ? self : typeof global === 'object' && global.global === global
            ? global
            : undefined;

function bom(blob, opts) {
    if (typeof opts === 'undefined') {
        opts = { autoBom: false };
    } else if (typeof opts !== 'object') {
        console.warn('Deprecated: Expected third argument to be a object');
        opts = { autoBom: !opts };
    }

    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
    }

    return blob;
}

function download(url, name, opts) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = function () {
        saveAs(xhr.response, name, opts);
    }

    xhr.onerror = function () {
        console.error('could not download file');
    }

    xhr.send();
}

function corsEnabled(url) {
    let xhr = new XMLHttpRequest();

    xhr.open('HEAD', url, false);

    try {
        xhr.send();
    } catch (e) { }

    return xhr.status >= 200 && xhr.status <= 299;
}

function click(node) {
    try {
        node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
        node.dispatchEvent(evt);
    }
}

let isMacOSWebView = /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent)

let saveAs = _global.saveAs || (
    // probably in some web worker
    (typeof window !== 'object' || window !== _global)
        ? function saveAs() { /* noop */ }

        : ('download' in HTMLAnchorElement.prototype && !isMacOSWebView)
            ? function saveAs(blob, name, opts) {
                let URL = _global.URL || _global.webkitURL;
                let a = document.createElement('a');
                name = name || blob.name || 'download';

                a.download = name;
                a.rel = 'noopener';

                if (typeof blob === 'string') {
                    // Support regular links
                    a.href = blob;

                    if (a.origin !== location.origin) {
                        corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
                    } else {
                        click(a);
                    }
                } else {
                    // Support blobs
                    a.href = URL.createObjectURL(blob);
                    setTimeout(function () { URL.revokeObjectURL(a.href) }, 4E4); // 40s
                    setTimeout(function () { click(a) }, 0);
                }
            }

            // Use msSaveOrOpenBlob as a second approach
            : 'msSaveOrOpenBlob' in navigator
                ? function saveAs(blob, name, opts) {
                    name = name || blob.name || 'download';

                    if (typeof blob === 'string') {
                        if (corsEnabled(blob)) {
                            download(blob, name, opts);
                        } else {
                            let a = document.createElement('a');
                            a.href = blob;
                            a.target = '_blank';
                            setTimeout(function () { click(a) });
                        }
                    } else {
                        navigator.msSaveOrOpenBlob(bom(blob, opts), name);
                    }
                }

                // Fallback to using FileReader and a popup
                : function saveAs(blob, name, opts, popup) {
                    // Open a popup immediately do go around popup blocker
                    // Mostly only available on user interaction and the fileReader is async so...
                    popup = popup || open('', '_blank');

                    if (popup) {
                        popup.document.title = popup.document.body.innerText = 'downloading...';
                    }

                    if (typeof blob === 'string') return download(blob, name, opts);

                    let force = blob.type === 'application/octet-stream';
                    let isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;
                    let isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

                    if ((isChromeIOS || (force && isSafari) || isMacOSWebView) && typeof FileReader !== 'undefined') {
                        // Safari doesn't allow downloading of blob URLs
                        let reader = new FileReader();

                        reader.onloadend = function () {
                            let url = reader.result;

                            url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');

                            if (popup) {
                                popup.location.href = url;
                            } else {
                                location = url;
                            }

                            popup = null;
                        }

                        reader.readAsDataURL(blob);
                    } else {
                        let URL = _global.URL || _global.webkitURL;
                        let url = URL.createObjectURL(blob);
                        if (popup) {
                            popup.location = url;
                        } else {
                            location.href = url;
                        }

                        popup = null;

                        setTimeout(function () { URL.revokeObjectURL(url) }, 4E4);
                    }
                }
);

_global.saveAs = saveAs.saveAs = saveAs;

export { saveAs }
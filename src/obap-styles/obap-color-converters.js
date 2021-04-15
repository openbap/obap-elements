// https://css-tricks.com/converting-color-spaces-in-javascript/
// https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV

const HSLAtoHSVA = function(h, s, l, a) {
    s /= 100.0;
    l /= 100.0;

    const result = { h: h, s: 0, v: 0, a: a };
    
    result.v = l + (s * Math.min(l, 1 - l));
    result.s = (result.v === 0) ? 0 : 2 * (1 - (l / result.v));

    result.v = parseFloat((result.v * 100.0).toFixed(2));
    result.s = parseFloat((result.s * 100.0).toFixed(2));
    
    return result;
}

const HSVAtoHSLA = function(h, s, v, a) {
    s /= 100.0;
    v /= 100.0;

    const result = { h: h, s: 0, l: 0, a: a };

    result.l = v * (1 - (s / 2));
    result.s = (result.l === 0 || result.l === 1) ? 0 : (v - result.l) / Math.min(result.l, 1 - result.l);

    result.l = parseFloat((result.l * 100.0).toFixed(2));
    result.s = parseFloat((result.s * 100.0).toFixed(2));

    return result;
}

const HSLAtoRGBA = function (h, s, l, a) {
    s /= 100.0;
    l /= 100.0;

    if (h === 360) {
        h = 0;
    }

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r: r, g: g, b: b, a: a };
}

const HSLAToHexA = function (h, s, l, a) {
    s /= 100;
    l /= 100;

    if (h === 360) {
        h = 0;
    }

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
    a = Math.round(a * 255).toString(16);

    if (r.length == 1) {
        r = "0" + r;
    }

    if (g.length == 1) {
        g = "0" + g;
    }

    if (b.length == 1) {
        b = "0" + b;
    }

    if (a.length == 1) {
        a = "0" + a;
    }

    return "#" + r + g + b + a;
}

/*
const RGBToHex = function (r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) {
        r = "0" + r;
    }

    if (g.length == 1) {
        g = "0" + g;
    }

    if (b.length == 1) {
        b = "0" + b;
    }

    return "#" + r + g + b;
}

const RGBAToHexA = function (r, g, b, a) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);

    if (r.length == 1) {
        r = "0" + r;
    }

    if (g.length == 1) {
        g = "0" + g;
    }

    if (b.length == 1) {
        b = "0" + b;
    }

    if (a.length == 1) {
        a = "0" + a;
    }

    return "#" + r + g + b + a;
}

const hexToRGB = function (h) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];
        // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    return "rgb(" + +r + "," + +g + "," + +b + ")";
}

const hexAToRGBA = function (h) {
    let r = 0, g = 0, b = 0, a = 1;

    if (h.length == 5) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];
        a = "0x" + h[4] + h[4];

    } else if (h.length == 9) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
        a = "0x" + h[7] + h[8];
    }
    a = +(a / 255).toFixed(3);

    return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
}

const RGBToHSL = function (r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0) {
        h = 0;
    }

    // Red is max
    else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    }
    // Green is max
    else if (cmax == g) {
        h = (b - r) / delta + 2;
    }
    // Blue is max
    else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) {
        h += 360;
    }

    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
}

const RGBAToHSLA = function (r, g, b, a) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0) {
        h = 0;
    }

    // Red is max
    else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    }
    // Green is max
    else if (cmax == g) {
        h = (b - r) / delta + 2;
    }
    // Blue is max
    else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) {
        h += 360;
    }

    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
}

const HSLToRGB = function (h, s, l) {
    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "rgb(" + r + "," + g + "," + b + ")";
}

const HSLAToRGBA = function (h, s, l, a) {
    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

const hexToHSL = function (H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;

    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }

    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    }
    else if (cmax == g) {
        h = (b - r) / delta + 2;
    }
    else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0) {
        h += 360;
    }

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
}

const hexAToHSLA = function (H) {
    let r = 0, g = 0, b = 0, a = 1;

    if (H.length == 5) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
        a = "0x" + H[4] + H[4];
    } else if (H.length == 9) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
        a = "0x" + H[7] + H[8];
    }

    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    }
    else if (cmax == g) {
        h = (b - r) / delta + 2;
    }
    else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0) {
        h += 360;
    }

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    a = (a / 255).toFixed(3);

    return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
}

const HSLToHex = function (h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1) {
        r = "0" + r;
    }

    if (g.length == 1) {
        g = "0" + g;
    }

    if (b.length == 1) {
        b = "0" + b;
    }

    return "#" + r + g + b;
}

const nameToRGB = function (name) {
    // Create fake div
    let fakeDiv = document.createElement("div");
    fakeDiv.style.color = name;
    document.body.appendChild(fakeDiv);

    // Get color of div
    let cs = window.getComputedStyle(fakeDiv),
        pv = cs.getPropertyValue("color");

    // Remove div after obtaining desired color value
    document.body.removeChild(fakeDiv);

    return pv;
}

const nameToHex = function (name) {
    // Get RGB from named color in temporary div
    let fakeDiv = document.createElement("div");
    fakeDiv.style.color = name;
    document.body.appendChild(fakeDiv);

    let cs = window.getComputedStyle(fakeDiv),
        pv = cs.getPropertyValue("color");

    document.body.removeChild(fakeDiv);

    // Code ripped from RGBToHex() (except pv is substringed)
    let rgb = pv.substr(4).split(")")[0].split(","),
        r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1) {
        r = "0" + r;
    }

    if (g.length == 1) {
        g = "0" + g;
    }

    if (b.length == 1) {
        b = "0" + b;
    }

    return "#" + r + g + b;
}

const nameToHSL = function (name) {
    let fakeDiv = document.createElement("div");
    fakeDiv.style.color = name;
    document.body.appendChild(fakeDiv);

    let cs = window.getComputedStyle(fakeDiv),
        pv = cs.getPropertyValue("color");

    document.body.removeChild(fakeDiv);

    // Code ripped from RGBToHSL() (except pv is substringed)
    let rgb = pv.substr(4).split(")")[0].split(","),
        r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255,
        cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    }
    else if (cmax == g) {
        h = (b - r) / delta + 2;
    }
    else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0) {
        h += 360;
    }

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
}
*/

export { HSLAtoHSVA, HSVAtoHSLA, HSLAtoRGBA, HSLAToHexA };
/*
* UZIP.js
*
* By photopea, ported to ES6 modules by greggman.
*
* License : https://github.com/photopea/UZIP.js/blob/master/LICENSE (MIT)
* source  : https://github.com/photopea/UZIP.js, https://github.com/greggman/uzip-module
*/
import { readUshort, readUint, readUTF8, writeUint, writeUshort, writeUTF8, sizeUTF8 } from './zip-utils.js';
import { inflate as f_inflate, deflateRaw as f_deflateRaw } from './zip-functions.js';

const crc = {
    table: (function () {
        var tab = new Uint32Array(256);

        for (var n = 0; n < 256; n++) {
            var c = n;

            for (var k = 0; k < 8; k++) {
                if (c & 1) {
                    c = 0xedb88320 ^ (c >>> 1);
                } else {
                    c = c >>> 1;
                }
            }

            tab[n] = c;
        }

        return tab;
    })(),

    update: function (c, buf, off, len) {
        for (var i = 0; i < len; i++) {
            c = crc.table[(c ^ buf[off + i]) & 0xff] ^ (c >>> 8);
        }
        
        return c;
    },

    crc: function (b, o, l) { 
        return crc.update(0xffffffff, b, o, l) ^ 0xffffffff; 
    }
};

export function parse(buf, onlyNames) {
    var rUs = readUshort, rUi = readUint, o = 0, out = {};
    var data = new Uint8Array(buf);
    var eocd = data.length - 4;

    while (rUi(data, eocd) != 0x06054b50) {
        eocd--;
    }

    var o = eocd;
    o += 4;	
    o += 4;  // CHECK
    var cnu = rUs(data, o); 
    o += 2;
    var cnt = rUs(data, o); 
    o += 2;

    var csize = rUi(data, o); 
    o += 4;
    var coffs = rUi(data, o); 
    o += 4;

    o = coffs;

    for (var i = 0; i < cnu; i++) {
        var sign = rUi(data, o); 
        o += 4;
        o += 4;  
        o += 4;  
        o += 4;  

        var crc32 = rUi(data, o); 
        o += 4;
        var csize = rUi(data, o); 
        o += 4;
        var usize = rUi(data, o); 
        o += 4;

        var nl = rUs(data, o), el = rUs(data, o + 2), cl = rUs(data, o + 4); 
        o += 6;  
        o += 8; 

        var roff = rUi(data, o); 
        o += 4;
        o += nl + el + cl;

        _readLocal(data, roff, out, csize, usize, onlyNames);
    }

    return out;
}

function _readLocal(data, o, out, csize, usize, onlyNames) {
    var rUs = readUshort, rUi = readUint;

    var sign = rUi(data, o); 
    o += 4;

    var ver = rUs(data, o); 
    o += 2;

    var gpflg = rUs(data, o); 
    o += 2;

    var cmpr = rUs(data, o); 
    o += 2;

    var time = rUi(data, o); 
    o += 4;

    var crc32 = rUi(data, o); 
    o += 4;
    o += 8;

    var nlen = rUs(data, o);
    o += 2;

    var elen = rUs(data, o); 
    o += 2;

    var name = readUTF8(data, o, nlen); 
    o += nlen; 
    o += elen;

    if (onlyNames) { 
        out[name] = { size: usize, csize: csize }; 
        return; 
    }

    var file = new Uint8Array(data.buffer, o);

    if (false) { 

    } else if (cmpr == 0) {
        out[name] = new Uint8Array(file.buffer.slice(o, o + csize));
    } else if (cmpr == 8) {
        var buf = new Uint8Array(usize); 
        inflateRaw(file, buf);
        out[name] = buf;
    } else {
        throw "unknown compression method: " + cmpr;
    }
}

export function inflateRaw(file, buf) { 
    return f_inflate(file, buf); 
}

export function inflate(file, buf) {
    var CMF = file[0], FLG = file[1];
    var CM = (CMF & 15), CINFO = (CMF >>> 4); // CHECK

    return inflateRaw(new Uint8Array(file.buffer, file.byteOffset + 2, file.length - 6), buf);
}

export function deflate(data, opts) {
    if (opts == null) {
        opts = { level: 6 };
    }

    var off = 0, buf = new Uint8Array(50 + Math.floor(data.length * 1.1));
    buf[off] = 120; 
    buf[off + 1] = 156; 
    off += 2;
    off = f_deflateRaw(data, buf, off, opts.level);
    var crc = adler(data, 0, data.length);
    buf[off + 0] = ((crc >>> 24) & 255);
    buf[off + 1] = ((crc >>> 16) & 255);
    buf[off + 2] = ((crc >>> 8) & 255);
    buf[off + 3] = ((crc >>> 0) & 255);

    return new Uint8Array(buf.buffer, 0, off + 4);
}

export function deflateRaw(data, opts) {
    if (opts == null) {
        opts = { level: 6 };
    }

    var buf = new Uint8Array(50 + Math.floor(data.length * 1.1));
    var off = f_deflateRaw(data, buf, off, opts.level);

    return new Uint8Array(buf.buffer, 0, off);
}

export function encode(obj, noCmpr) {
    if (noCmpr == null) {
        noCmpr = false;
    }

    var tot = 0, wUi = writeUint, wUs = writeUshort;
    var zpd = {};

    for (var p in obj) {
        var cpr = !_noNeed(p) && !noCmpr, buf = obj[p], _crc = crc.crc(buf, 0, buf.length);
        zpd[p] = { cpr: cpr, usize: buf.length, crc: _crc, file: (cpr ? deflateRaw(buf) : buf) };
    }

    for (var p in zpd) {
        tot += zpd[p].file.length + 30 + 46 + 2 * sizeUTF8(p);
    }

    tot += 22;

    var data = new Uint8Array(tot), o = 0;
    var fof = []

    for (var p in zpd) {
        var file = zpd[p]; 
        fof.push(o);
        o = _writeHeader(data, o, p, file, 0);
    }

    var i = 0, ioff = o;

    for (var p in zpd) {
        var file = zpd[p]; 
        fof.push(o);
        o = _writeHeader(data, o, p, file, 1, fof[i++]);
    }

    var csize = o - ioff;

    wUi(data, o, 0x06054b50);
    o += 4; // CHECK
    o += 4; 

    wUs(data, o, i);
    o += 2;

    wUs(data, o, i); 
    o += 2;
    
    wUi(data, o, csize); 
    o += 4;

    wUi(data, o, ioff); 
    o += 4;
    o += 2;

    return data.buffer;
}

function _noNeed(fn) { 
    var ext = fn.split(".").pop().toLowerCase(); 
    return "png,jpg,jpeg,zip".indexOf(ext) != -1; 
}

function _writeHeader(data, o, p, obj, t, roff) {
    var wUi = writeUint, wUs = writeUshort;
    var file = obj.file;

    wUi(data, o, t == 0 ? 0x04034b50 : 0x02014b50); o += 4; 

    if (t == 1) {
        o += 2;
    }  

    wUs(data, o, 20); 
    o += 2;
    
    wUs(data, o, 0); 
    o += 2;
    
    wUs(data, o, obj.cpr ? 8 : 0); 
    o += 2;

    wUi(data, o, 0); 
    o += 4;	
    
    wUi(data, o, obj.crc); 
    o += 4;	
    
    wUi(data, o, file.length); 
    o += 4;	
    
    wUi(data, o, obj.usize); 
    o += 4;	

    wUs(data, o, sizeUTF8(p)); 
    o += 2;	
    
    wUs(data, o, 0); 
    o += 2;	

    if (t == 1) {
        o += 2; // CHECK
        o += 2;  
        o += 6;  
        wUi(data, o, roff); 
        o += 4;	
    }

    var nlen = writeUTF8(data, o, p); 
    o += nlen;

    if (t == 0) { 
        data.set(file, o); 
        o += file.length; 
    }

    return o;
}

export function adler(data, o, len) {
    var a = 1, b = 0;
    var off = o, end = o + len;

    while (off < end) {
        var eend = Math.min(off + 5552, end);

        while (off < eend) {
            a += data[off++];
            b += a;
        }

        a = a % 65521;
        b = b % 65521;
    }

    return (b << 16) | a;
}

export default { adler, encode, deflate, deflateRaw, inflate, inflateRaw, parse };  
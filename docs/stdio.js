const stdout = {
    buf: new Uint8Array(0x0400),
    cur: 0x00,
    out: undefined
};

let fflush = (() => {
    const _decoder = new TextDecoder("ascii");
    return function(stream) {
        stream.out.innerText += _decoder.decode(stream.buf.subarray(0, stream.cur));
        memset(stream.buf, 0x00, stream.buf.length);
        stream.cur = 0x00;
    }
})();

function fprintf(stream, format) {
    let i;
    let c;
    for (i = 0x00; i < format.length; ++i) {
        c = format.charCodeAt(i);
        stream.buf[stream.cur++] = c;
        if (c === '\n'.charCodeAt(0)) {
            fflush(stream);
        }
    }
}

function printf(format) {
    return fprintf(stdout, format);
}

function freopen(filename, mode, stream) {
    stream.out = filename;
}

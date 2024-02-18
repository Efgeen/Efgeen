const FILE = Object.freeze({
    _file: 0,
    _flag: 0,
    _ptr: null,
    _cnt: 0,
    _base: null,
    _bufsiz: 0
});

const stdin = { ...FILE };
stdin._file = 0;
const stdout = { ...FILE };
stdout._file = 1;
stdout._ptr = new Uint8Array(4096);
stdout._cnt = 4096;
const stderr = { ...FILE };
stderr._file = 2;

const fprintf = (() => {
    const encoder = new TextEncoder();
    return function(file, format) {
        const array = encoder.encode(format);
        file._ptr.set(array, file._cnt);
        file._cnt += array.length;
        return array.length;
    }
})();

function printf(format) {
    return fprintf(stdout, format);
}

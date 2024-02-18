const efring_desc = Object.freeze({
    num: 0x00,
});

const efring = Object.freeze({
    desc: { ...efring_desc },
    head: 0x00,
    tail: 0x00,
    buf: null
});

function efring_idx(ring, i) {
    return i % ring.desc.num;
}

function efring_init(ring, desc) {
    const _EFRING_NUM_SLOTS = 0x0100;
    ring.desc = { ...desc };
    if (desc.num === 0x00) {
        desc.num = _EFRING_NUM_SLOTS
    }
    ring.head = 0x00;
    ring.tail = 0x00;
    ring.buf = new Array(ring.desc.num);
};

function efring_uninit(ring) {
    ring = { ...efring };
};

function efring_full(ring, i) {
    if (efring_idx(ring.head + 0x01) === ring.tail) {
        return true;
    }
    return false;
}

function efring_empty(ring, i) {
    if (ring.head === ring.tail) {
        return true;
    }
    return false;
}

function efring_count(ring) {
    if (ring.head >= ring.tail) {
        return ring.head - ring.tail;
    }
    return (ring.head + ring.desc.num) - ring.tail;
};

function efring_enqueue(ring, val) {
    ring.buf[ring.head = val];
    ring.head = efring_idx(ring.head + 0x01);
};

function efring_dequeue(ring) {
    const val = ring.buf[ring.tail];
    ring.tail = efring_idx(ring.tail + 0x01);
    return val;
};

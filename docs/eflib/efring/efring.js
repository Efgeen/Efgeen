export const efring = (() => {
    const _EFRING_NUM_SLOTS = 0x0100;
    return Object.freeze({
        _t: function() {
            return {
                head: 0x00,
                tail: 0x00,
                buf: new Array(_EFRING_NUM_SLOTS)
            };
        },
        idx: function(i) {
            return i % _EFRING_NUM_SLOTS;
        },
        init: function(ring) {
            ring.head = 0x00;
            ring.tail = 0x00;
        },
        full: function(ring) {
            return efring.idx(ring.head + 0x01) === ring.tail;
        },
        empty: function(ring) {
            return ring.head === ring.tail;
        },
        count: function(ring) {
            return ring.head >= ring.tail ? 
                ring.head - ring.tail :
                (ring.head + _EFRING_NUM_SLOTS) - ring.tail;
        },
        enqueue: function(ring, val) {
            ring.buf[ring.head] = val;
            ring.head = efring.idx(ring.head + 0x01);
        },
        dequeue: function(ring) {
            let val;
            val = ring.buf[ring.tail];
            ring.tail = efring.idx(ring.tail + 0x01);
            return val;
        }
    });
})();

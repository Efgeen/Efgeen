import { efring } from '../efring/efring.js';
import { eftimestamp } from '../eftimestamp/eftimestamp.js';

export const eftiming = (() => {
    return Object.freeze({
        _t: function() {
            return {
                last: 0.0,
                accum: 0.0,
                avg: 0.0,
                spike_count: 0x00,
                num: 0x00,
                timestamp: eftimestamp._t(),
                ring: efring._t()
            };
        },
        reset: function(t) {
            t.last = 0.0;
            t.accum = 0.0;
            t.spike_count = 0x00;
            t.num = 0x00;
            efring.init(t.ring);
        },
        init: function(t) {
            t.avg = 1.0 / 60.0;
            eftiming.reset(t);
        },
        put: function(t, dur) {
            let min_dur;
            let max_dur;
            let old_val;
            if (efring.full(t.ring)) {
                min_dur = t.avg * 0.8;
                max_dur = t.avg * 1.2;
            }
            else {
                min_dur = 0.0;
                max_dur = 0.1;
            }
            if ((dur < min_dur) || (dur > max_dur)) {
                ++t.spike_count;
                if (t.spike_count > 0x14) {
                    eftiming.reset(t);
                }
                return;
            }
            if (efring.full(t.ring)) {
                old_val = efring.dequeue(t.ring);
                t.accum -= old_val;
                --t.num;
            }
            efring.enqueue(t.ring, dur);
            t.accum += dur;
            ++t.num;
            t.avg = t.accum / t.num;
            t.spike_count = 0x00;
        },
        discontinuity: function(t) {
            t.last = 0.0;
        },
        measure: function(t) {
            let now;
            let dur;
            now = eftimestamp.now(t.timestamp);
            if (t.last > 0.0) {
                dur = now - t.last;
                eftiming.put(t, dur);
            }
            t.last = now;
        },
        external: function(t, now) {
            let dur;
            if (t.last > 0.0) {
                dur = now - t.last;
                eftiming.put(t, dur);
            }
            t.last = now;
        },
        get_avg: function(t) {
            return t.avg;
        }
    });
})();

import { eftiming } from "../eflib/eftiming/eftiming.js";

export const os = (() => {
    const _os = {
        desc: null,
        quit_ordered: false,
        frame_count: 0x00,
        timing: eftiming._t()
    };

    function _os_desc_defaults(desc) {
        let res;
        // todo
        return res;
    }

    function _os_init_state(desc) {
        _os.desc = _os_desc_defaults(desc);
        eftiming.init(_os.timing);
    }

    function _os_frame() {
        eftiming.external(_os.timing, performance.now());
        // console.log(`frame: count = ${_os.frame_count}`);
        console.log(_os.timing);
        ++_os.frame_count;
    }

    function _os_discard_state() {

    }

    return Object.freeze({
        run: function(desc) {
            _os_init_state(desc);
            requestAnimationFrame(function callback() {
                _os_frame();
                if (!_os.quit_ordered) {
                    requestAnimationFrame(callback);
                }
                else {
                    _os_discard_state();
                }
            });
        }
    });
})();

const efshell_desc = Object.freeze({
    init_cb: null,
    frame_cb: null,
    cleanup_cb: null,
    event_cb: null,
    user_data: null,
    init_userdata_cb: null,
    frame_userdata_cb: null,
    cleanup_userdata_cb: null,
    event_userdata_cb: null
});

const EFSHELL_EVENTTYPE_INVALID = 0x00
const EFSHELL_EVENTTYPE_QUIT_REQUESTED = 0x01

const efshell_run = (() => {
    const _efshell = {
        desc: { ...efshell_desc },
        first_frame: false,
        quit_ordered: false,
        frame_count: 0x00,
        init_called: false,
        valid: false,
        quit_requested: false,
        cleanup_called: false
    };

    function _efshell_desc_defaults(desc) {
        let res = { ...desc };
        return res;
    }

    function _efshell_init_state(desc) {
        _efshell.desc = _efshell_desc_defaults(desc);
        _efshell.first_frame = true;
    }
    
    function _efshell_call_init() {
        if (_efshell.desc.init_cb !== null) {
            _efshell.desc.init_cb();
        }
        else if (_efshell.desc.init_userdata_cb !== null) {
            _efshell.desc.init_userdata_cb(
                _efshell.desc.user_data);
        }
        _efshell.init_called = true;
    }
        
    function _efshell_call_frame() {
        if (_efshell.init_called !== false && 
                _efshell.cleanup_called === false) {
            if (_efshell.desc.frame_cb !== null) {
                _efshell.desc.frame_cb();
            }
            else if (_efshell.desc.frame_userdata_cb !== null) {
                _efshell.desc.frame_userdata_cb(
                    _efshell.desc.user_data);
            }
        }
    }

    function _efshell_frame() {
        if (_efshell.first_frame !== false) {
            _efshell.first_frame = false;
            _efshell_call_init();
        }
        _efshell_call_frame();
        ++_efshell.frame_count;
    }

    function _efshell_events_enabled() {
        return (_efshell.desc.event_cb !== null || 
                _efshell.desc.event_userdata_cb !== null) &&
                _efshell.init_called !== false;
    }

    function _efshell_init_event(type) {
        // todo: clear
        _efshell.event.type = type;
        _efshell.event.frame_count = _efshell.frame_count;
    }

    function _efshell_call_event(event) {
        if (_efshell.cleanup_called === false) {
            if (_efshell.desc.event_cb !== null) {
                _efshell.desc.event_cb(
                    _efshell.event);
            }
            else if (_efshell.desc.event_userdata_cb !== null) {
                _efshell.desc.event_cb(
                    _efshell.event,
                    _efshell.desc.user_data);
            }
        }
    }

    function _efshell_event(type) {
        if (_efshell_events_enabled() !== false) {
            _efshell_init_event(type);
            _efshell_call_event(_efshell.event);
        }
    }

    function _efshell_call_cleanup() {
        if (_efshell.cleanup_called === false) {
            if (_efshell.desc.cleanup_cb !== null) {
                _efshell.desc.cleanup_cb();
            }
            else if (_efshell.desc.cleanup_userdata_cb !== null) {
                _efshell.desc.cleanup_userdata_cb(
                    _efshell.desc.user_data);
            }
            _efshell.cleanup_called = true;
        }
    }

    return function(desc) {
        _efshell_init_state(desc);
        _efshell.valid = true;
        if (_efshell.quit_ordered === false) {
            requestAnimationFrame(function label() {
                if (_efshell.quit_ordered === false) {
                    _efshell_frame();
                    if (_efshell.quit_requested !== false) {
                        _efshell_event(EFSHELL_EVENTTYPE_QUIT_REQUESTED);
                        if (_efshell.quit_requested !== false) {
                            _efshell.quit_ordered = true;
                        }
                    }
                    requestAnimationFrame(label);
                }
                else {
                    _efshell_call_cleanup();
                }
            });
        }
        else {
            _efshell_call_cleanup();
        }
    };
})();

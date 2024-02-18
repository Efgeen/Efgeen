const app = (() => {
    let _app = {
        desc: undefined,
        first_frame: false,
        valid: false,
        init_called: false,
        frame_count: 0x00,
        quit_ordered: false,
        cleanup_called: false,
    };
    function _app_desc_defaults(desc) {
        let res;
        res = { ...desc };
        return res;
    }
    function _app_init_state(desc) {
        _app.desc = _app_desc_defaults(desc);
        _app.first_frame = true;
    }
    function _app_call_init() {
        if (_app.desc.init_cb !== undefined) {
            _app.desc.init_cb();
        }
        else if (_app.desc.init_userdata_cb !== undefined) {
            _app.desc.init_userdata_cb(_app.desc.user_data);
        }
        _app.init_called = true;
    }
    function _app_call_frame() {
        if (_app.init_called != false && 
            _app.cleanup_called == false) {
            if (_app.desc.frame_cb !== undefined) {
                _app.desc.frame_cb();
            }
            else if (_app.desc.frame_userdata_cb !== undefined) {
                _app.desc.frame_userdata_cb(_app.desc.user_data);
            }
        }
    }
    function _app_call_cleanup() {
        if (_app.cleanup_called == false) {
            if (_app.desc.cleanup_cb !== undefined) {
                _app.desc.cleanup_cb();
            }
            else if (_app.desc.cleanup_userdata_cb !== undefined) {
                _app.desc.cleanup_userdata_cb(_app.desc.user_data);
            }
            _app.cleanup_called = true;
        }
    }
    function _app_frame() {
        if (_app.first_frame != false) {
            _app.first_frame = false;
            _app_call_init();
        }
        _app_call_frame();
        ++_app.frame_count;
    }
    function _app_animation_frame() {
        _app_frame();
        if (_app.quit_ordered == false) {
            requestAnimationFrame(_app_animation_frame);
            return;
        }
        _app_call_cleanup();
    }
    return Object.freeze({
        run: function(desc) {
            _app_init_state(desc);
            _app.valid = true;
            requestAnimationFrame(_app_animation_frame);
        }
    });
})();

(() => {
    function init() {
        console.log("init");
    }
    function frame() {
        console.log("frame");
    }
    function cleanup() {
        console.log("cleanup");
    }
    const desc = { ...efshell_desc };
    desc.init_cb = init;
    desc.frame_cb = frame;
    desc.cleanup_cb = cleanup;
    efshell_run(desc);
})();

(() => {
    let div;
    let form;
    let input;

    function submit(s) {
        printf(`${s}\n`);
    }

    function init() {
        div = document.createElement("div");
        div.style = "color: #43F748; font: 14px Consolas;";

        form = document.createElement("form");
        form.onsubmit = e => {
            e.preventDefault();
            submit(input.value);
            input.value = "";
        };

        input = document.createElement("input");
        // input.style = "position: absolute; left: -2px; top: -2px; width: 1px; height: 1px; padding: 0; border: 0; margin: 0;";
        input.onblur = () => {
            input.focus();
        };
        freopen(div, undefined, stdout);

        document.body.appendChild(div);
        form.appendChild(input);
        document.body.appendChild(form);

        input.focus();
    }

    function frame() {
        console.log("frame");
    }

    function cleanup() {
        document.body.removeChild(input);
        document.body.removeChild(div);
    }

    app.run(Object.freeze({
        init_cb: init,
        frame_cb: frame,
        cleanup_cb: cleanup
    }));
})();

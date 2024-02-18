(() => {
    let canvas;
    let context;
    let div;
    let form;
    let input;

    function submit(s) {
        printf(`${s}\n`);
    }

    function commit() {
        document.body.appendChild(div);
        form.appendChild(input);
        document.body.appendChild(form);
    }

    function uncommit() {
        document.body.removeChild(form);
        document.body.removeChild(div);
    }

    function init() {
        let i;
        let char_width;
        let char_height;
        
        canvas = document.createElement("canvas");
        
        char_height = 0x0E;

        context = canvas.getContext("2d");
        context.font = `${char_height}px Consolas`;

        char_width = 0x00;
        for (i = 0x00; i < SCHAR_MAX; ++i) {
            if (isprint(i) == 0x00) {
                continue;
            }
            metrics = context.measureText(String.fromCharCode(i));
            if (metrics.width > char_width) {
                char_width = metrics.width;
            }
        }
        char_width = ceil(char_width);

        let buf_width = floor(document.body.clientWidth / char_width);
        console.log(buf_width);

        let buf_height = floor(document.body.clientHeight / char_height);
        console.log(buf_height)

        div = document.createElement("div");
        div.style = `background-color:#000;color:#43F748;font:${char_height}px Consolas;line-height:${char_height}px;position:absolute;width:100%;height:100%;`;

        form = document.createElement("form");
        form.style.position = "absolute";
        form.style.left = "-100px";
        form.style.top = "-100px";
        form.style.width = "1px";
        form.style.height = "1px";
        form.onsubmit = e => {
            e.preventDefault();
            submit(input.value);
            input.value = "";
        };

        input = document.createElement("input");
        // input.style.position = "absolute";
        // input.style.left = "-100px";
        // input.style.top = "-100px";
        input.style.width = "1px";
        input.style.height = "1px";
        input.onblur = () => {
            input.focus();
        };
        freopen(div, undefined, stdout);

        commit();

        input.focus();
    }

    function frame() {
        // console.log("frame");
    }

    function cleanup() {
        uncommit();
    }

    app.run(Object.freeze({
        init_cb: init,
        frame_cb: frame,
        cleanup_cb: cleanup
    }));
})();

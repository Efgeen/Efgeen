import { eftiming } from "../eftiming/eftiming.js";

export const efos = (() => {
    const _efos = {
        desc: null,
        quit_ordered: false,
        frame_count: 0x00,
        timing: eftiming._t()
    };

    function _efos_desc_defaults(desc) {
        let res;
        // todo
        return res;
    }

    function _efos_efos() {
        let div = document.createElement("div");
        div.id = "efos";
        let main = document.getElementById("main");
        main.appendChild(div);
        _efos_desktop(div);
        _efos_header();
        _efos_footer();
    }

    function _efos_desktop(element) {
        let desktop = document.createElement("div");
        desktop.id = "efdesktop";
        // desktop.style.backgroundImage = "url(\"https://picsum.photos/1920/1080?random=1\")";
        // desktop.style.filter = "grayscale(100%)";
        element.appendChild(desktop);
        _efos_nav();
        _efos_cmd();
    }

    function _efos_nav() {
        let desktop = document.getElementById("efdesktop");
        let div = document.createElement("div");
        div.id = "efnavigator";
        let span = document.createElement("span");
        span.innerText = "whoami";
        span.style.color = "var(--efgreen)";
        div.appendChild(span);
        desktop.appendChild(div);
    }

    function _efos_cmd() {
        let desktop = document.getElementById("efdesktop");
        let div = document.createElement("div");
        div.id = "efconsole";
        let span = document.createElement("span");
        span.innerText = "] whoami";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "./assets/whoami.txt", false);
        xhr.send();
        if (xhr.status === 200) {
            span.innerText += `
            
            ${xhr.responseText}`;
        }
        span.style.color = "var(--efgreen)";
        div.appendChild(span);
        desktop.appendChild(div);
    }

    function _efos_header() {
        let desktop = document.getElementById("efos");
        let header = document.createElement("div");
        header.id = "efheader";
        desktop.appendChild(header);
        _efos_version();
        _efos_datetime();
        _efos_timing();
    }

    function _efos_version() {
        let header = document.getElementById("efheader");
        let version = document.createElement("div");
        version.id = "efversion";
        let span = document.createElement("span");
        span.innerHTML = `<span style="color: var(--efred);">0</span><span style="color: var(--efyellow);">.</span><span style="color: var(--efgreen);">1</span><span style="color: var(--efcyan);">.</span><span style="color: var(--efblue);">0</span>`
        version.appendChild(span);
        header.appendChild(version);
    }

    function _efos_datetime() {
        let header = document.getElementById("efheader");
        let datetime = document.createElement("div");
        datetime.id = "efdatetime";
        let span = document.createElement("span");
        span.innerHTML = `<span style="color: var(--efred);">2024-01-19</span> <span style="color: var(--efgreen);">15:20:00</span><span style="color: var(--efblue);">.000</span>`;
        datetime.appendChild(span);
        header.appendChild(datetime);
    }

    function _efos_timing() {
        let header = document.getElementById("efheader");
        let timing = document.createElement("div");
        timing.id = "eftiming";
        let span = document.createElement("span");
        span.innerText = `FPS: ${(1.0 / eftiming.get_avg(_efos.timing)).toFixed(2)}`
        timing.appendChild(span);
        header.appendChild(timing);
    }

    function _efos_footer() {
        let desktop = document.getElementById("efos");
        let footer = document.createElement("div");
        footer.id = "effooter";
        desktop.appendChild(footer);
        _efos_copyright();
    }

    function _efos_copyright() {
        let footer = document.getElementById("effooter");
        let efcopyright = document.createElement("div");
        efcopyright.id = "efcopyright";
        let span = document.createElement("span");
        span.innerHTML = `<span style="color: var(--efred)">©</span> <span style="color: var(--efgreen)">2024</span> <span style="color: var(--efblue)">Efgeen</span>`
        efcopyright.appendChild(span);
        footer.appendChild(efcopyright);
    }

    function _efos_init_state(desc) {
        _efos.desc = _efos_desc_defaults(desc);
        eftiming.init(_efos.timing);
        _efos_efos();
    }

    function _efos_frame() {
        eftiming.measure(_efos.timing);
        let avg = eftiming.get_avg(_efos.timing);
        if (!(_efos.frame_count % 0x0100)) {
            // console.log(`[frame] : count = ${_efos.frame_count}, fps = ${(1.0 / avg).toFixed(2)} (${avg.toFixed(4)} ms)`);
            let timing = document.getElementById("eftiming");
            let span = timing.getElementsByTagName("span")[0];
            span.innerHTML = `<span style="color: var(--efred)">FPS:</span> <span style="color: var(--efgreen)">${(1.0 / avg).toFixed(2)}</span> <span style="color: var(--efblue)">(${avg.toFixed(4)} ms)</span>`
        }

        let datetime = document.getElementById("efdatetime");
        let span = datetime.getElementsByTagName("span")[0];
        let date = new Date();
        let tm_sec = date.getSeconds();
        let tm_min = date.getMinutes();
        let tm_hour = date.getHours();
        let tm_year = date.getFullYear() - 1900;
        let tm_mon = date.getMonth();
        let tm_mday = date.getDate();
        span.innerHTML = `<span style="color: var(--efred)">${(tm_year + 1900)}-${`0${(tm_mon + 1)}`.slice(-2)}-${`0${tm_mday}`.slice(-2)}</span> <span style="color: var(--efgreen)">${`0${tm_hour}`.slice(-2)}:${`0${tm_min}`.slice(-2)}:${`0${tm_sec}`.slice(-2)}</span><span style="color: var(--efcyan)">.</span><span style="color: var(--efblue)">${`00${date.getMilliseconds()}`.slice(-3)}</span>`;

        ++_efos.frame_count;
    }

    function _efos_discard_state() {

    }

    return Object.freeze({
        run: function(desc) {
            _efos_init_state(desc);
            requestAnimationFrame(function frame() {
                _efos_frame();
                if (!_efos.quit_ordered) {
                    requestAnimationFrame(frame);
                }
                _efos_discard_state();
            });
        }
    });
})();

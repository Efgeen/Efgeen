(() => {
    let atd;
    let buf;
    let cur;
    let stdin;
    let stdout;

    /* init */
    cur = 0x00;
    buf = new Int8Array(256);
    memset(buf, ' '.charCodeAt(), buf.length);
    atd = new TextDecoder("ascii");

    function memset(s, c, n) {
        while (n > 0x00) {
            s[--n] = c;
        }
    }

    function strcpy(s1, s2) {
        let i;
        i = s2.length;
        while (i > 0x00) {
            s1[--i] = s2[i].charCodeAt();
        }
    }

    function fflush(stream) {
        stream.innerText = atd.decode(buf);
    }

    function printf(s) {
        strcpy(buf.subarray(cur), s);
        cur += s.length;
        fflush(stdout);
    }

    function submit(s) {
        switch (s) {
            case "clear":
                memset(buf, ' '.charCodeAt(), buf.length);
                // fflush(stdout);
                printf("] ");
                break;
        }
    }

    stdout = document.createElement("div");

    stdin = document.createElement("input");
    stdin.type = "text";
    stdin.style.width = 0;
    stdin.style.height = 0;
    stdin.style.margin = 0;
    stdin.style.border = 0;
    stdin.style.padding = 0;
    stdin.oninput = e => {
        switch (e.inputType) {
            case 'insertText':
                if (e.data !== null) {
                    printf(e.data);
                }
                break;
            case "deleteContentBackward":
                if (cur > 0x00) {
                    buf[--cur] = ' '.charCodeAt();
                    fflush(stdout);
                }
                break;
            default:
                e.preventDefault();
                break;
        }
    };
    stdin.onkeydown = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            printf("\n] ");
            submit(stdin.value);
            stdin.value = "";
        }
    };
    document.body.onclick = () => {
        stdin.focus();
    };

    document.body.appendChild(stdout);
    document.body.appendChild(stdin);
    

    printf("] ");
})();

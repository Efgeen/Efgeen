// <!-- <script>
//             (() => {
//                 let atd;
//                 let buf;
//                 let cur;
//                 let div;
//                 let input;
//                 let val;

//                 const STRING = (() => {
//                     return Object.freeze({
//                         memset: function(s, c, n) {
//                             while (n > 0x00) {
//                                 s[--n] = c;
//                             }
//                         },
//                         strcpy: function(s1, s2) {
//                             let i;
//                             i = s2?.length ?? 0x00;
//                             while (i > 0x00) {
//                                 s1[--i] = s2[i].charCodeAt();
//                             }
//                         }
//                     });
//                 })();
//                 const STDIO = (() => {
//                     const DECODER = new TextDecoder("ascii");
//                     const stdout = {
//                         src: new Int8Array(0x0400),
//                         dst: stdout,
//                         cur: 0x00
//                     };
//                     return Object.freeze({
//                         printf: function(s) {
//                             let src;
//                             if (stdout.src.length - stdout.src.cur < s.length) {
//                                 src = new Int8Array(stdout.src.length << 0x01);
//                                 // memcpy stdout.src into src
//                                 stdout.src = src;
//                             }
//                             STRING.strcpy(stdout.src.subarray(stdout.cur), s);
//                             stdout.cur += s.length;
//                             // this.fflush(stdout);
//                         },
//                         fflush: function(stream) {
//                             stream.dst.innerText = DECODER.decode(stream.src);
//                         }
//                     });
//                 })();

                



//                 // /* init */
//                 // cur = 0x00;
//                 // buf = new Int8Array(4096);
//                 // memset(buf, ' '.charCodeAt(), buf.length);
//                 // atd = new TextDecoder("ascii");

//                 // function memset(s, c, n) {
//                 //     while (n > 0x00) {
//                 //         s[--n] = c;
//                 //     }
//                 // }

//                 // function strcpy(s1, s2) {
//                 //     let i;
//                 //     i = s2.length;
//                 //     while (i > 0x00) {
//                 //         s1[--i] = s2[i].charCodeAt();
//                 //     }
//                 // }

//                 // function fflush(stream) {
//                 //     stream.innerText = atd.decode(buf);
//                 // }

//                 // function printf(s) {
//                 //     strcpy(buf.subarray(cur), s);
//                 //     cur += s.length;
//                 //     fflush(div);
//                 // }

//                 // function submit(s) {
//                 //     switch (s) {
//                 //         case "clear":
//                 //             memset(buf, ' '.charCodeAt(), buf.length);
//                 //             // fflush(stdout);
//                 //             printf("guest@efgeen.com:~$ ");
//                 //             break;
//                 //     }
//                 // }

//                 div = document.createElement("div");
//                 input = Object.assign(document.createElement("input"),
//                 {
//                     type: "text",
//                     style: "position: absolute; top: -9px; left: -9px; width: 1px; height: 1px; margin: 0; border: 0; padding: 0;",
//                     oninput: e => {
//                         // let i = val?.length ?? 0;
//                         // while (i-- > 0) {
//                         //     buf[--cur] = ' '.charCodeAt();
//                         //     printf(e.target.value);
//                         //     val = e.target.value;
//                         // }
//                     },
//                     onkeydown: e => {
//                         // if (e.key === 'Enter') {
//                         //     e.preventDefault();
//                         //     printf("\nguest@efgeen.com:~$ ");
//                         //     submit(input.value);
//                         //     input.value = "";
//                         //     val = "";
//                         // }
//                     }
//                 });

//                 document.body.appendChild(div);
//                 document.body.appendChild(input);
//                 document.onclick = () => {
//                     input.focus();
//                 };
//                 // guest@efgeen.com = green
//                 // : = white
//                 // ~ = blue
//                 // $ = white

                
//                 STDIO.printf("guest@efgeen.com:~$ ");
//             })();
//         </script> -->
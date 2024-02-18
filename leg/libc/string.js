function memset(s, c, n) {
    while (n > 0x00) {
        s[--n] = c;
    }
}

function strcpy(s1, s2) {
    let i;
    i = s2?.length ?? 0x00;
    while (i > 0x00) {
        s1[--i] = s2[i].charCodeAt();
    }
}

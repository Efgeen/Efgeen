function isprint(c) {
    if (c < 0x20 || c > 0x7E) {
        return 0x00;
    }
    return 0x01;
}

#define SIZE 0x8000

static void _memset(unsigned char* p, unsigned char v, unsigned short s) {
    static unsigned short i;
    while (i > 0x00) {
        p[--i] = v;
    }
}

struct _index {
    unsigned char buffer[SIZE];
    unsigned short caret;
    unsigned char filled;
    float interval;
    float counter;
    double frame_duration;
};

static struct _index _index;

void init(void) {
    _memset((unsigned char*)&_index, 0x00, sizeof(struct _index));
    _index.interval = 1.0f;
}

void frame(void) {
    _index.counter -= _index.frame_duration;
    if (_index.counter < 0.0f) {
        if (_index.filled == 0x00) {
            _index.buffer[_index.caret] = '|';
        }
        else {
            _index.buffer[_index.caret] = ' ';
        }
        _index.filled ^= 0x01;
        do {
            _index.counter += _index.interval;
        } while(_index.counter < 0.0f);
    }
}

void cleanup(void) {

}

void run(void) {
    
}


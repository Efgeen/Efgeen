#ifndef __EMSCRIPTEN__
#define __EMSCRIPTEN__
#endif

#define SOKOL_ARGS_IMPL
#include "sokol_args.h"

#define SOKOL_APP_IMPL
#define SOKOL_GLES3
#include "sokol_app.h"

#define SOKOL_LOG_IMPL
#include "sokol_log.h"

#define SOKOL_GFX_IMPL
#include "sokol_gfx.h"

#define SOKOL_GLUE_IMPL
#include "sokol_glue.h"

#define SOKOL_DEBUGTEXT_IMPL
#include "sokol_debugtext.h"

struct _index {
    struct sg_pass_action pass_action;
    char input[4096];
    int input_index;
    char output[4096];
    int output_index;
    bool in_query;
    bool query_done;
    bool query_result;
    char clipboard_temp[4096];
};

static struct _index _index;

#define USER "guest"
#define DOMAIN "efgeen.com"
#define DIRECTORY "/"

static void _prompt(void) {
    int i;
    for (i = 0x00; i < strlen(USER); ++i) {
        _index.output[_index.output_index++] = USER[i];
    }
    _index.output[_index.output_index++] = '@';
    for (i = 0x00; i < strlen(DOMAIN); ++i) {
        _index.output[_index.output_index++] = DOMAIN[i];
    }
    _index.output[_index.output_index++] = ':';
    for (i = 0x00; i < strlen(DIRECTORY); ++i) {
        _index.output[_index.output_index++] = DIRECTORY[i];
    }
    _index.output[_index.output_index++] = '$';
    _index.output[_index.output_index++] = ' ';
}

static void _init(void) {
    struct sg_desc sg_desc;
    struct sdtx_font_desc_t sdtx_font_desc_t;
    struct sdtx_desc_t sdtx_desc_t;
    struct sg_color_attachment_action caa;
    struct sg_color cv;

    /* sg */
    memset((void*)&sg_desc, 0x00, sizeof(struct sg_desc));
    sg_desc.context = sapp_sgcontext();
    sg_desc.logger.func = &slog_func;
    sg_setup((const struct sg_desc*)&sg_desc);
    
    /* sdtx */
    memset((void*)&sdtx_desc_t, 0x00, sizeof(struct sdtx_desc_t));
    sdtx_desc_t.fonts[0x00] = sdtx_font_c64();
    sdtx_desc_t.logger.func = &slog_func;
    sdtx_desc_t.context.canvas_width = 0x01E0;
    sdtx_desc_t.context.canvas_height = 0x0168;
    sdtx_setup((const struct sdtx_desc_t*)&sdtx_desc_t);
    sdtx_font(0x00);
    sdtx_color3b(0xF7, 0x48, 0x43);

    /* _index */
    memset((void*)&cv, 0x00, sizeof(struct sg_color));
    cv.r = 0.0f;
    cv.g = 0.0f;
    cv.b = 0.0f;
    cv.a = 1.0f;
    memset((void*)&caa, 0x00, sizeof(struct sg_color_attachment_action));
    caa.load_action = SG_LOADACTION_CLEAR;
    caa.clear_value = cv;
    memset((void*)&_index, 0x00, sizeof(struct _index));
    _index.pass_action.colors[0x00] = caa;

    _prompt();
}

static void _printf(const char* fmt, ...) {
    va_list args;
    va_start(args, fmt);
    sdtx_vprintf(fmt, args);
    va_end(args);
}

static void _clear(void) {
    int i;
    for (i = 0x00; i < 4096; ++i) {
        _index.output[i] = 0x00;
    }
    _index.output_index = 0x00;
}

#define _ROR13(x) (((x) >> 13) | ((x) << (32 - 13)))

static void _ror13(char* s) {
    int i;
    uint32_t u;
    char t[0x10];
    u = 0x00;
    for (i = 0x00; i < strlen(s); ++i) {
        u = _ROR13(u);
        u += (uint32_t)s[i];
    }
    sprintf(t, "0x%.8X", u);
    for (i = 0x00; i < strlen(t); ++i) {
        _index.output[_index.output_index++] = t[i];
    }
    _index.output[_index.output_index++] = '\n';

    char* query = "set clipboard? (y/n)\n";
    for (i = 0x00; i < strlen(query); ++i) {
        _index.output[_index.output_index++] = query[i];
    }

    _index.in_query = true;

    strcpy(_index.clipboard_temp, t);
    _index.clipboard_temp[strlen(t)] = 0x00;
}

static void _help(void) {
    char* h = "help - displays this help menu\nclear - clears terminal\nror13 <input> - hash input using ror13, echoes and copies to clipboard\n";
    for (int i = 0x00; i < strlen(h); ++i) {
        _index.output[_index.output_index++] = h[i];
    }
}

static void _match(const char* s) {
    char* p;
    p = strtok(s, " ");
    if (p != NULL) {
        if (strcmp(p, "help") == 0x00) {
            _help();
        }
        else if (strcmp(p, "clear") == 0x00) {
            _clear();
        }
        else if (strcmp(p, "ror13") == 0x00) {
            _ror13((char*)(s + ((strlen(p) + 0x01) * sizeof(char))));
        }
    }
}

static void _submit(void) {
    int i;
    int j;
    memcpy(
        (void*)(_index.output + _index.output_index),
        (const void*)_index.input,
        _index.input_index * sizeof(char));
    _index.output_index += _index.input_index;
    _index.output[_index.output_index++] = '\n';
    _match(_index.input);
    memset((void*)_index.input, 0x00, _index.input_index * sizeof(char));
    _index.input_index = 0x00;
    if (_index.in_query == false) {
        _prompt();
    }
}

static void _frame(void) {
    float width;
    float height;
    width = sapp_widthf();
    height = sapp_heightf();
    sdtx_canvas(width * 0.75f, height * 0.75f);
    sdtx_origin(1.0f, 1.0f);
    _printf("%s%s", _index.output, _index.input);
    if (_index.in_query && _index.query_done) {
        if (_index.query_result == true) {
            sapp_set_clipboard_string(_index.clipboard_temp);
        }
        _index.query_done = false;
        _index.in_query = false;
        _prompt();
    }
    sg_begin_default_pass(
        (const struct sg_pass_action*)&_index.pass_action,
        sapp_width(),
        sapp_height());
    sdtx_draw();
    sg_end_pass();
    sg_commit();
}

static void _cleanup(void) {
    sdtx_shutdown();
    sg_shutdown();
}

static void _event_cb(const struct sapp_event* event) {
    char c;
    switch (event->type) {
        case SAPP_EVENTTYPE_CHAR:
            if (_index.input_index < 4096 && _index.in_query == false) {
                _index.input[_index.input_index++] = (char)event->char_code;
            }
            break;
        case SAPP_EVENTTYPE_KEY_DOWN:
            switch (event->key_code) {
                case SAPP_KEYCODE_ENTER:
                    _submit();
                    break;
                case SAPP_KEYCODE_BACKSPACE:
                    if (_index.input_index > 0x00) {
                        _index.input[--_index.input_index] = ' ';
                    }
                    break;
                case SAPP_KEYCODE_Y:
                    if (_index.in_query != false) {
                        _index.query_result = true;
                        _index.query_done = true;
                    }
                    break;
                case SAPP_KEYCODE_N:
                    if (_index.in_query != false) {
                        _index.query_result = false;
                        _index.query_done = true;
                    }
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}

struct sapp_desc sokol_main(int argc, char** argv) {
    struct sargs_desc sargs_desc;
    struct sapp_desc sapp_desc;
    memset((void*)&sargs_desc, 0x00, sizeof(struct sargs_desc));
    sargs_desc.argc = argc;
    sargs_desc.argv = argv;
    sargs_setup((const struct sargs_desc*)&sargs_desc);
    memset((void*)&sapp_desc, 0x00, sizeof(struct sapp_desc));
    sapp_desc.init_cb = &_init;
    sapp_desc.frame_cb = &_frame;
    sapp_desc.cleanup_cb = &_cleanup;
    sapp_desc.event_cb = &_event_cb;
    sapp_desc.enable_clipboard = true;
    sapp_desc.logger.func = &slog_func;
    return sapp_desc;
}

import threading


_thread_locals = threading.local()

def set_current_language(lang_code):
    _thread_locals.lang = lang_code

def get_current_language(default='en'):
    return getattr(_thread_locals, 'lang', default)

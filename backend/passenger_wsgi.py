import os
import sys
import traceback

# 1. Base directory setup
cwd = os.path.dirname(__file__)

if cwd not in sys.path:
    sys.path.insert(0, cwd)

# 2. Automatically find and add cPanel virtual environment site-packages to sys.path
home_dir = os.path.expanduser('~')
virtualenv_base = os.path.join(home_dir, 'virtualenv')

if os.path.exists(virtualenv_base):
    for root, dirs, files in os.walk(virtualenv_base):
        if 'site-packages' in dirs:
            sp = os.path.join(root, 'site-packages')
            if sp not in sys.path:
                sys.path.insert(0, sp)

# Also check local project venvs
for local_venv in [os.path.join(cwd, 'venv'), os.path.join(cwd, '.venv')]:
    if os.path.exists(local_venv):
        for lib in ['lib', 'lib64']:
            lib_dir = os.path.join(local_venv, lib)
            if os.path.exists(lib_dir):
                for py_ver in os.listdir(lib_dir):
                    sp = os.path.join(lib_dir, py_ver, 'site-packages')
                    if os.path.exists(sp) and sp not in sys.path:
                        sys.path.insert(0, sp)

# 3. Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

def application(environ, start_response):
    try:
        from django.core.wsgi import get_wsgi_application
        _application = get_wsgi_application()
        return _application(environ, start_response)
    except Exception as e:
        error_traceback = traceback.format_exc()
        status = '500 Internal Server Error'
        headers = [('Content-type', 'text/plain; charset=utf-8')]
        start_response(status, headers)
        
        output = "DJANGO APP CRASHED DURING STARTUP:\n\n"
        output += error_traceback
        return [output.encode('utf-8')]

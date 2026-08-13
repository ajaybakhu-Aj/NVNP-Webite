import os
import sys
import traceback

cwd = os.path.dirname(__file__)
sys.path.insert(0, cwd)

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


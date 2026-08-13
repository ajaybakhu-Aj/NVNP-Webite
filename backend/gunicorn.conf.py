import multiprocessing

# Bind to localhost on port 8000 by default
bind = "127.0.0.1:8000"

# Number of worker processes. Formula: (2 x $num_cores) + 1
workers = multiprocessing.cpu_count() * 2 + 1

# Number of threads per worker (for I/O bound tasks)
threads = 2

# Maximum number of pending connections
backlog = 2048

# Worker class
worker_class = 'gthread'

# Restart workers after this many requests to prevent memory leaks
max_requests = 1000
max_requests_jitter = 50

# Timeout for workers (in seconds). Default is 30, but increased here for occasional heavy queries
timeout = 60

# Keepalive connections (default is 2)
keepalive = 5

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

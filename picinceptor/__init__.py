"""Picinceptor main package."""

import os
import sys
import logging

from flask import Flask
from konfig import Config
from six import PY2, integer_types
from werkzeug.middleware.proxy_fix import ProxyFix
from xdg import XDG_CONFIG_HOME

from picinceptor.extensions import rest_api
from picinceptor.views import (
    blueprints,
    home as home_view,
)
from picinceptor.views.api import (
    ObservationResource
)


_DEFAULT_CONFIG = {
    'SERVER_NAME': 'localhost:5000',
    'LOG_LEVEL': 'warning',
    'LOG_FILENAME': None,
}


class VueFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update({
        'block_start_string': '«%',
        'block_end_string': '%»',
        'comment_start_string': '«#',
        'comment_end_string': '#»',
        'variable_start_string': '««',
        'variable_end_string': '»»',
    })


def path_to_venv():
    """Return the path to the virtualenv if current Python proccess is run within a virtualenv.

    Return ``None`` if there is no active virtualenv."""
    if PY2:  # Python 3 has changed the way to detect virtualenv
        return getattr(sys, 'real_prefix', None)
    else:
        return sys.base_prefix if sys.base_prefix != sys.prefix else None


def read_config(cli_fname=None):
    """Return a config  object (``dict``) read from the first found configuration file."""
    config_fnames = []
    # If given on command line, append the file
    if cli_fname:
        config_fnames.append(cli_fname)
    # If env variable exists, append the file
    env_fname = os.environ.get('PICINCEPTOR_CONF')
    if env_fname:
        config_fnames.append(env_fname)
    # Append system config files (or virtualenv config file if in a virtualenv)
    venv_path = path_to_venv()
    if not venv_path:
        config_folders = [
            os.path.join(XDG_CONFIG_HOME, 'picinceptor'),
            os.path.join('/', 'usr', 'local', 'etc', 'picinceptor'),
            os.path.join('/', 'etc', 'picinceptor'),
        ]
    else:
        config_folders = [os.path.join(venv_path, 'etc', 'picinceptor')]
    config_fnames.extend([os.path.join(config_folder, 'picinceptor.ini')
                          for config_folder in config_folders])
    for fname in config_fnames:
        if os.path.exists(fname):
            return Config(fname)


def init_logging(str_level='warning', filename=None):
    """Initialize a basic logging configuration."""
    log_opts = {
        'format': '{asctime} picinceptor[{process}] [{levelname}] {message}',
        'datefmt': '%Y-%m-%d %H:%M:%S',
        'style': '{',
    }
    log_level = getattr(logging, str_level.upper(), None)
    if not isinstance(log_level, integer_types):
        raise ValueError('Invalid log level: {0}'.format(str_level))
    log_opts['level'] = log_level
    if filename:
        log_opts['filename'] = filename
    else:
        log_opts['stream'] = sys.stdout
    logging.basicConfig(**log_opts)
    return logging.getLogger()


def create_app(config):
    """Return a new ``picinceptor`` application instance."""
    local_configs = []
    if config:
        local_configs.append(config.get_map('picinceptor'))
    app = VueFlask(__name__)
    app.wsgi_app = ProxyFix(app.wsgi_app)
    app.config.update(_DEFAULT_CONFIG)
    for config in local_configs:
        app.config.update(config)
    for blueprint in blueprints:
        app.register_blueprint(blueprint)
    # Register views, handlers and cli commands
    app.route('/')(home_view)
    rest_api.add_resource(ObservationResource, '/api/observation', endpoint='observation')
    rest_api.init_app(app)
    return app

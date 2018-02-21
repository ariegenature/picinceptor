"""Picinceptor blueprint about public contributions."""

import mimetypes

from flask import Blueprint, make_response, render_template


contribute_bp = Blueprint('contribute', __name__, template_folder='templates',
                          static_folder='templates/static')


@contribute_bp.route('/contribute')
def index():
    return render_template('vue/index.html')


@contribute_bp.route('/contribute/static/<path:fpath>')
def contribute_static(fpath):
    resp = make_response(render_template('static/{0}'.format(fpath)))
    resp.headers['Content-Type'], resp.headers['Content-Encoding'] = mimetypes.guess_type(fpath)
    return resp

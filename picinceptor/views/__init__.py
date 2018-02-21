"""Picinceptor package for views and blueprints."""

from flask import redirect, url_for

from picinceptor.views.contribute import contribute_bp

blueprints = [contribute_bp]


def home():
    """Picinceptor homepage."""
    return redirect(url_for('contribute.index'))

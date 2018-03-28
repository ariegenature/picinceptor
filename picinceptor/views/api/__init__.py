"""Picinceptor blueprint for API requests."""

from datetime import date
import json
import os.path

from flask import current_app
from flask_restful import Resource, reqparse
import anosql
import psycopg2

import picinceptor


def _parse_json_date(s):
    s = s.split('T')[0]
    return date(*[int(x) for x in s.split('-')])


class ObservationResource(Resource):
    """Flask-Restful API endpoint around observations."""

    def __init__(self):
        self.post_parser = reqparse.RequestParser()
        self.post_parser.add_argument('observationDate', dest='observation_date',
                                      type=_parse_json_date, required=True, nullable=False,
                                      help='Observation date')
        self.post_parser.add_argument('woodpeckerId', dest='woodpecker', type=int, required=True,
                                      nullable=False, help='TAXREF id of the woodpecker')
        self.post_parser.add_argument('nestingIndex', dest='breeding_code', type=int, required=True,
                                      nullable=False, help='Woodpecker breeding code')
        self.post_parser.add_argument('habitat', type=str, required=True, nullable=False,
                                      help='Habitat where woodpecker has been seen')
        self.post_parser.add_argument('dominant', dest='dominant_tree', type=str, required=False,
                                      help=('Dominant tree in the forest where woodpecker has been '
                                            'seen'))
        self.post_parser.add_argument('hasDeadTrees', dest='has_dead_trees', type=bool,
                                      required=False, help=('Are there any dead trees in the '
                                                            'forest where woodpecker has been '
                                                            'seen'))
        self.post_parser.add_argument('hasConifer', dest='has_conifers', type=bool, required=False,
                                      help=('Are there any conifers in the forest where woodpecker '
                                            'has been seen'))
        self.post_parser.add_argument('firstName', dest='observer_first_name', type=str,
                                      required=True, nullable=False, help='Observer first name')
        self.post_parser.add_argument('surname', dest='observer_surname', type=str, required=True,
                                      nullable=False, help='Observer surname')
        self.post_parser.add_argument('email', dest='observer_email', type=str, required=True,
                                      nullable=False, help='Observer email')
        self.post_parser.add_argument('school', dest='observer_school', type=str, default='',
                                      nullable=False, help='Observer school')
        self.post_parser.add_argument('eWkt', dest='geometry', type=str,
                                      required=True, nullable=False, help='Observation coordinates')

    def get(self):
        query = anosql.load_queries(
                'postgres',
                os.path.join(os.path.dirname(picinceptor.__file__), 'database',
                             'select_observations.sql')
        ).get_observations
        with psycopg2.connect(host=current_app.config['DB_HOST'],
                              port=current_app.config.get('DB_PORT', 5432),
                              user=current_app.config['DB_USER'],
                              password=current_app.config['DB_PASS'],
                              dbname=current_app.config['DB_NAME']) as cnx:
            rows = query(cnx)
        # build response
        res = {
            'type': 'FeatureCollection',
            'features': []
        }
        features = res['features']
        for row in rows:
            (obs_id, obs_date, woodpecker_id, breeding_code, habitat, dominant_tree, has_dead_trees,
             has_conifers, geojson) = row
            features.append({
                'type': 'Feature',
                'id': obs_id,
                'properties': {
                    'observationDate': obs_date.strftime('%Y-%m-%d'),
                    'woodpeckerId': woodpecker_id,
                    'breedingCode': breeding_code,
                    'habitat': habitat,
                    'dominantTree': dominant_tree,
                    'hasDeadTrees': has_dead_trees,
                    'hasConifers': has_conifers,
                },
                'geometry': json.loads(geojson)
            })
        return res

    def post(self):
        observation_dict = self.post_parser.parse_args(strict=True)
        insert_query = anosql.load_queries(
            'postgres',
            os.path.join(os.path.dirname(picinceptor.__file__), 'database',
                         'insert_observation.sql')
        ).insert_observation_auto
        print(current_app.config['DB_HOST'], current_app.config['DB_PORT'],
              current_app.config['DB_USER'], current_app.config['DB_PASS'],
              current_app.config['DB_NAME'])
        with psycopg2.connect(host=current_app.config['DB_HOST'],
                              port=current_app.config.get('DB_PORT', 5432),
                              user=current_app.config['DB_USER'],
                              password=current_app.config['DB_PASS'],
                              dbname=current_app.config['DB_NAME']) as cnx:
            insert_query(cnx, **observation_dict)

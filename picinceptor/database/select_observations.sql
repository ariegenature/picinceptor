-- name: get_observations
-- Get all anonymous observations
select id,
    observation_date,
    woodpecker,
    breeding_code,
    habitat,
    dominant_tree,
    has_dead_trees,
    has_conifers,
    observer_first_name,
    observer_surname,
    observer_school,
    st_asgeojson(geometry) as geojson
  from picinceptor.observation
  order by observation_date desc, id asc;

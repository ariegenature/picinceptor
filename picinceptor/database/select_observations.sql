-- name: get_observations
-- Get all anonymous observations
select id, observation_date, woodpecker, breeding_code, habitat, dominant_tree, has_dead_trees, has_conifers, st_asgeojson(geometry) as geojson
  from picinceptor.observation
  order by observation_date desc, id asc;

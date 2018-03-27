-- name: insert_observation<!
-- Insert new observation into database
insert into picinceptor.observation
(observation_date, woodpecker, breeding_code, habitat, dominant_tree, has_dead_trees, has_conifers, observer_first_name, observer_surname, observer_email, observer_school)
values
(:observation_date, :woodpecker, :breeding_code, :habitat, :dominant_tree, :has_dead_trees, :has_conifers, :observer_first_name, :observer_surname, :observer_email, :observer_school)

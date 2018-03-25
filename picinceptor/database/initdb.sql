begin;

  \set epsg_code 2154

  create schema if not exists picinceptor;
  create schema if not exists wfs;

  create table picinceptor.observation (
    id serial primary key,
    observation_date date not null,
    woodpecker int not null references ref.taxon on delete cascade on update cascade,
    breeding_code int not null references ref.bird_breeding_code on delete cascade on update cascade,
    habitat text not null constraint "habitat name must not be empty" check (habitat != ''),
    dominant_tree text constraint "dominant tree must not be empty" check (dominant_tree != ''),
    has_dead_trees boolean,
    has_conifers boolean,
    observer_first_name text not null constraint "first name name must not be empty" check (observer_first_name != ''),
    observer_surname text not null constraint "surname name must not be empty" check (observer_surname != ''),
    observer_email text not null constraint "email name must not be empty" check (observer_email != ''),
    observer_school text not null default '',
    geometry geometry(Point, 4326) not null
  );

  create or replace view wfs.enquete_pics as
  with preferred_name as (
    select * from ref.scientific_name where is_preferred = true
  )
  select obs.id as id,
      obs.observation_date as date_obs,
      obs.woodpecker as id_taxref,
      preferred_name.value as nom_sci,
      format('IN%s', obs.breeding_code) as indice_nid,
      format('%s (%s)', breeding.description, breeding.category) as desc_nid,
      obs.habitat as habitat,
      obs.dominant_tree as espece_dominante,
      obs.has_dead_trees as arbres_morts,
      obs.has_conifers as coniferes,
      obs.observer_first_name as prenom_obs,
      obs.observer_surname as nom_obs,
      obs.observer_email as email_obs,
      obs.observer_school as ecole_obs,
      st_astext(st_transform(obs.geometry, :epsg_code)) as geometry
    from picinceptor.observation as obs
      left join ref.bird_breeding_code as breeding on obs.breeding_code = breeding.code
      left join ref.taxon as taxo on obs.woodpecker = taxo.taxref_id
      left join preferred_name on taxo.taxref_id = preferred_name.taxon;

commit;

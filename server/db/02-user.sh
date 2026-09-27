#!/bin/sh
set -eu

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" \
  -v app_password="$POSTGRES_APP_PASSWORD" <<'SQL'

CREATE ROLE staery_app LOGIN PASSWORD :'app_password';

GRANT CONNECT ON DATABASE haunted TO staery_app;

GRANT USAGE ON SCHEMA public TO staery_app;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE sightings TO staery_app;

GRANT USAGE, SELECT ON SEQUENCE sightings_id_seq TO staery_app;

SQL
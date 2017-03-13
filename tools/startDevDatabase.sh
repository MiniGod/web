set -e

POSTGRES_VERSION=9.6.2

source '.env'

docker pull postgres:$POSTGRES_VERSION
docker run -p $DB_PORT:$DB_PORT --name postgres -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USER -e POSTGRES_DB=$DB_NAME -d postgres:$POSTGRES_VERSION

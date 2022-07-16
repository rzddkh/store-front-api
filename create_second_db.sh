#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "full_stack_user" --dbname "full_stack_dev" <<-EOSQL
    CREATE DATABASE full_stack_test;
EOSQL
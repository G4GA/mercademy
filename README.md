# Instructions

## First, you'll need to create a virtual environment for the project

Since this part is quite long for this readme. I'll put a link to a page where there is already
an OS agnostic way to do it:

- <https://developer.mozilla.org/es/docs/Learn/Server-side/Django/development_environment>

## This project needs the following dependencies for it's propper functionality

- django
- psycopg2-binary

## Copy and paste the following sql code to psql in order to create the database:

Note: You need to have postgres and psql first

```SQL
CREATE USER mdemy_admin WITH PASSWORD 'mdemy_admin';

CREATE DATABASE with OWNER mdemy_admin;
```

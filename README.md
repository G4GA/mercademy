# Instructions

## First, you'll need to create a virtual environment for the project

Since this part is quite long for this readme. I'll put a link to a page where there is already
an OS agnostic way to do it:

- <https://developer.mozilla.org/es/docs/Learn/Server-side/Django/development_environment>

## This project needs the following dependencies for it's propper functionality

- django
- psycopg2-binary

## Copy and paste the following sql code to psql in order to create the database:

You need to have postgres and psql first

```SQL
CREATE USER mdemy_admin WITH PASSWORD 'mdemy_admin';
CREATE DATABASE merc_db WITH OWNER mdemy_admin;
GRANT ALL ON DATABASE merc_db TO mdemy_admin;
GRANT USAGE, CREATE ON SCHEMA PUBLIC TO mdemy_admin;
```

---
**_NOTE:_** Because this is a school project I put the database info directly to the settings.py file, but note that thas is not recommended at all for real projects.

---

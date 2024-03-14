FROM mysql:latest

ENV MYSQL_DATABASE=compx322assn1_db
ENV MYSQL_USER=compx322assn1_user
ENV MYSQL_PASSWORD=
ENV MYSQL_ALLOW_EMPTY_PASSWORD=1
ENV SERVICE_TAGS=dev
ENV SERVICE_NAME=mysql

ADD ./sql/newtopics.sql /docker-entrypoint-initdb.d
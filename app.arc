@app
bahati-a9bd

@aws
region eu-west-1
runtime nodejs
policies
  S3CrudPolicy
  architect-default-policies

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

password
  pk *String # userId

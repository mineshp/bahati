@app
bahati-a9bd

@aws
region eu-west-1
profile min-aws

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

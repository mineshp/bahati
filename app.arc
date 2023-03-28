@app
# bahati-a9bd
bahati

@aws
timeout 15
region eu-west-1
runtime nodejs
policies
  architect-default-policies

@http
/*
  method get
  src server
/*
  method post
  src server
/*
  method put
  src server
/*
  method delete
  src server
/*
  method head
  src server

@static

@tables
user
  pk *String

password
  pk *String # userId

watchlist
  shareCode *String
  watchlist **String


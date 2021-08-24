# Local chat room server api

Local Chat API with node js + express + typescript

## Dev

0. yarn
1. yarn tsw
2. yarn dev
3. http://localhost:3001

## Start

0. yarn
1. yarn start
2. http://localhost:3001

<hr/>

## API

### Register

> http://localhost:3001/register

Method : Post

Header : application/json

Body

```
{
    "name": "name",
    "password": "password"
}
```

Response

```
{
    "code": 200,
    "message": "success"
}
```

### Login

> http://localhost:3001/login

Method : Post

Header : application/json
Body

```
{
    "name": "name",
    "password": "password"
}
```

Response

```
{
    "code": 200,
    "message": "success",
    "body": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkYjU3YjQwLTcyYjEtNDJmYy1iNWVlLTk5NjMzMDJmNWY2YyIsImlhdCI6MTYyOTc3MjUwM30.bCRgLAcA-Ilvfp2U32jsApcgKNM28bgcY8vjLno13Q0"
    }
}
```

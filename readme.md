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

## Register

Register Api with name and password

> `http://localhost:3001/register`

Method : POST

Header :

Content-Type : application/json

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

## Login

Login Api and return accessToken ( JWT )

ps. JWT encode will get the userId ( JWT token id field )

https://jwt.io/

https://github.com/auth0/node-jsonwebtoken

> `http://localhost:3001/login`

Method : POST

Header :

Content-Type : application/json

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
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4MjUyNWZiLWNjM2QtNGExYi1hMzQ4LWMwN2ExOTk0OTc0NiIsInVzZXJOYW1lIjoibmFtZSIsInNlc3Npb24iOiJlZTY3MzY0OS05YWZiLTRmYjItOTg5Mi05MDI0NGQ4YmJmYWQiLCJpYXQiOjE2MzA5MTk0MTEsImV4cCI6MTYzMDkxOTQxNn0.O-YlcEjmiNwfZML0I0sPX06kRFpaFK7rYuq_r2unm94",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4MjUyNWZiLWNjM2QtNGExYi1hMzQ4LWMwN2ExOTk0OTc0NiIsInVzZXJOYW1lIjoibmFtZSIsInNlc3Npb24iOiJlZTY3MzY0OS05YWZiLTRmYjItOTg5Mi05MDI0NGQ4YmJmYWQiLCJpYXQiOjE2MzA5MTk0MTEsImV4cCI6MTYzMTUyNDIxMX0.oZbygd1WIdWuCPdA9DcD16OnW0D__gRB3ZAqKvXv9OA"
    }
}
```

## Logout

Logout api will revoke the refresh token

https://jwt.io/

https://github.com/auth0/node-jsonwebtoken

> `http://localhost:3001/login`

Method : POST

Header :

Content-Type : application/json

Body

```
{}
```

Response

```
{
    "code": 200,
    "message": "success"
}
```

## RefreshToken

Refresh the expired access token

> `http://localhost:3001/refreshToken`

Method : POST

Header :

Content-Type : application/json

Authorization : `Bearer ${accessToken}`

Body

```
{
    "refreshToken": ${refreshToken}
}
```

Response

```
{
    "code": 200,
    "message": "success",
    "body": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4MjUyNWZiLWNjM2QtNGExYi1hMzQ4LWMwN2ExOTk0OTc0NiIsInVzZXJOYW1lIjoibmFtZSIsInNlc3Npb24iOiJkM2JlZjU1NS04NzVkLTQ4ZTEtYWNmNi1jZWU4MDA0M2QwMzUiLCJpYXQiOjE2MzA5MTk0OTMsImV4cCI6MTYzMDkxOTQ5OH0.hMGsnxNdSiutt8PsOXpWgwc29KpqzO9BDXG4qyr8TTc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4MjUyNWZiLWNjM2QtNGExYi1hMzQ4LWMwN2ExOTk0OTc0NiIsInVzZXJOYW1lIjoibmFtZSIsInNlc3Npb24iOiJkM2JlZjU1NS04NzVkLTQ4ZTEtYWNmNi1jZWU4MDA0M2QwMzUiLCJpYXQiOjE2MzA5MTk0OTMsImV4cCI6MTYzMTUyNDI5M30.h_bXzwXyLa7-av7UFjUj0K2gQOsgRaGmCmm3VnbdDV8"
    }
}
```

## Me

Get user profile

> `http://localhost:3001/me`

Method : POST

Header :

Content-Type : application/json

Authorization : `Bearer ${accessToken}`

Body

```
{}
```

Response

```
{
    "code": 200,
    "message": "success",
    "body": {
        "id": "512e9f63-a5f5-4e7c-b9ff-9562545e6245",
        "createdDate": "2021-08-24T05:33:16.060Z",
        "name": "name",
        "password": "password",
        "type": "User",
        "chatRoomIds": []
    }
}
```

## Create ChatRoom

Create chatroom

> `http://localhost:3001/chatRoom`

Method : POST

Header :

Content-Type : application/json

Authorization : `Bearer ${accessToken}`

Body

```
{}
```

Response

```
{
    "code": 200,
    "message": "success",
    "body": {
        "id": "9505bf5c-5b50-4ee4-a75c-ddac900b565b",
        "createdDate": "2021-08-24T05:37:05.317Z",
        "userIds": [
            "512e9f63-a5f5-4e7c-b9ff-9562545e6245"
        ]
    }
}
```

## Join ChatRoom

Join chatroom by chatRoomId

> `http://localhost:3001/chatRoom/${chatRoomId}/join`

Method : POST

Header :

Content-Type : application/json

Authorization : `Bearer ${accessToken}`

Body

```
{}
```

Response

```
{
    "code": 200,
    "message": "success",
    "body": {
        "id": "68e85f69-b438-4ee1-81a9-e1474d7a4b5a",
        "createdDate": "2021-08-24T05:56:46.994Z",
        "userIds": [
            "a6c78333-6646-42ea-9431-fa49f4bd7506",
            "69788034-c720-4c7f-8419-f33bf8434307"
        ]
    }
}
```

## Fetch ChatRoom

Get user's chatroom

> `http://localhost:3001/chatRoom`

Method : GET

Header :

Content-Type : application/json

Authorization : `Bearer ${accessToken}`

Body

```
{}
```

Response

```
{
    "code": 200,
    "message": "success",
    "body": [
        {
            "id": "9505bf5c-5b50-4ee4-a75c-ddac900b565b",
            "createdDate": "2021-08-24T05:37:05.317Z",
            "userIds": [
                "512e9f63-a5f5-4e7c-b9ff-9562545e6245"
            ]
        }
    ]
}
```

## Create message

Create message in chatroom

> `http://localhost:3001/message/${:chatRoomId}`

Method : POST

Header :

Content-Type : application/json

Authorization : `Bearer ${accessToken}`

Body

```
{
    "text":"HI"
}
```

Response

```
{
    "code": 200,
    "message": "success",
    "body": {
        "id": "7eeda377-9e98-411b-8d28-e3a445ca3235",
        "createdDate": "2021-08-24T05:38:29.715Z",
        "text": "HI",
        "type": "Normal",
        "userId": "512e9f63-a5f5-4e7c-b9ff-9562545e6245",
        "user": {
            "id": "512e9f63-a5f5-4e7c-b9ff-9562545e6245",
            "name": "name"
        },
        "chatRoomId": "9505bf5c-5b50-4ee4-a75c-ddac900b565b"
    }
}
```

## Fetch message

Fetch message in chatroom

> `http://localhost:3001/chatRoom/${chatRoomId}/messages`

Method : GET

Header :

Content-Type : application/json

Authorization : `Bearer ${accessToken}`

Body

```
{}
```

Response

```
{
    "code": 200,
    "message": "success",
    "body": [
        {
            "id": "7eeda377-9e98-411b-8d28-e3a445ca3235",
            "createdDate": "2021-08-24T05:38:29.715Z",
            "text": "HI",
            "type": "Normal",
            "userId": "512e9f63-a5f5-4e7c-b9ff-9562545e6245",
            "user": {
                "id": "512e9f63-a5f5-4e7c-b9ff-9562545e6245",
                "name": "name"
            },
            "chatRoomId": "9505bf5c-5b50-4ee4-a75c-ddac900b565b"
        }
    ]
}
```

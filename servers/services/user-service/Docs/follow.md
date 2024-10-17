# Follow User API

## Endpoint
`POST /follow`

## Description
This endpoint allows a user to follow another user by providing the username and email of the user to follow.

## Request Body
| Field    | Type   | Description                          |
|----------|--------|--------------------------------------|
| username | string | The username of the user to follow   |
| email    | string | The email of the user to follow      |

## Responses

### Success
**Status Code:** `200 OK`

**Response Body:**
```json
{
  "message": "You are now following @username"
}
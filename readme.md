Certainly! Below is the organized documentation in README.md format:

markdown
Copy code

# Shiny Car Washing Backend

This is the backend application for the Shiny Car Washing platform, built using Node.js, Express, TypeScript, and MongoDB.

## Table of Contents

- [APIs](#apis)
  - [User Sign Up](#user-sign-up)
  - [Auth Login](#auth-login)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Linting and Formatting](#linting-and-formatting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## APIs

### User Sign Up

- **Endpoint**: `POST /api/auth/signup`
- **Description**: This API allows you to create a new user account on the platform.

#### Request Body:

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin", // "user" or "admin"
  "address": "123 Main Street, City, Country"
}
```

## Auth Login

- **Endpoint**: `POST /api/auth/login`
- **Description**: This endpoint allows users to log in and obtain an authentication token.

### Request Body

- **email** (string, required): The email address of the user.
- **password** (string, required): The password of the user.

### Response

The response is a JSON object with the following schema:

```json
{
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean"
    },
    "statusCode": {
      "type": "integer"
    },
    "message": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "role": {
              "type": "string"
            },
            "address": {
              "type": "string"
            },
            "createdAt": {
              "type": "string"
            },
            "updatedAt": {
              "type": "string"
            },
            "__v": {
              "type": "integer"
            }
          }
        }
      }
    }
  }
}
```

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (either locally installed or a cloud-based MongoDB instance)

## Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/ecommerce-backend.git
   cd ecommerce-backend

   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   ```sh
   DATABASE_URL=mongodb://localhost:27017/yourdbname
   PORT=5000
   ```

   ## Running the Application

4. **In Development Mode**

   ```sh
   npm run start:dev
   ```

5. **In Production Mode**

   ```sh
   npm run build
   npm run start:prod
   ```

   ## Linting and Formatting

   1. **To check for linting errors, use:**

   ```sh
   npm run lint
   ```

   2. **To fix linting errors, use:**

   ```sh
   npm run lint:fix
   ```

   3. **To fix linting errors, use:**

   ```sh
   npm run prettier
   ```

## Contributing

**If you would like to contribute, please fork the repository and create a pull request with your changes.**

## License

**This project is licensed under the ISC License. See the LICENSE file for details.**

## Contact

For any questions or feedback, feel free to contact me via [email](mahpro110@gmail.com) or through my [GitHub profile](https://github.com/MAHossain1).

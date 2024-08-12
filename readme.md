Certainly! Below is the organized documentation in README.md format:

# Shiny Car Washing Backend

This is the backend application for the Shiny Car Washing platform, built using Node.js, Express, TypeScript, and MongoDB.

## Live Demo

You can access the live demo of the backend application at the following URL:

- [Production Link](https://shiny-car-washing-backend.vercel.app/)

## Table of Contents

- [APIs](#apis)
  - [User Sign Up](#user-sign-up)
  - [Auth Login](#auth-login)
  - [Create Service](#create-service)
  - [Get Service by ID](#get-service-by-id)
  - [Get All Services](#get-all-services)
  - [Update Service](#update-service)
  - [Delete a Service](#delete-a-service)
  - [Create Slot](#create-slot)
  - [Get Available Slots](#get-available-slots)
  - [Book a Service](#book-a-service)
  - [Get All Bookings](#get-all-bookings)
  - [Get User's Bookings](#get-users-bookings)
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

## Create Service

- **Endpoint**: `POST /api/services`
- **Description**: This endpoint allows an admin to create a new service.

### Request Headers

- **Authorization**: `Bearer <your-jwt-token>`

### Request Body

```json
{
  "name": "Car Wash",
  "description": "Professional car washing service",
  "price": 50,
  "duration": 60, // Duration in minutes
  "isDeleted": false
}
```

## Get Service by ID

### GET /api/services/:id

**Description**: This endpoint allows users to retrieve details of a specific service by its ID.

## Get All Services

### GET /api/services

**Description**: This endpoint allows users to retrieve a list of all available services.

## Update Service

### PUT /api/services/:id

**Description**: This endpoint allows an admin to update the details of a specific service.

### Request Headers

- `Authorization: Bearer <token>`

### Request Body

```json
{
  "name": "Updated Service Name",
  "description": "Updated description of the service",
  "price": 60, // Updated price
  "duration": 90, // Updated duration in minutes
  "isDeleted": false
}
```

## Delete a Service

### DELETE /api/services/:id

**Description**: This endpoint allows an admin to soft delete a specific service. The service will not be permanently removed but will be marked as deleted.

### Request Headers

- `Authorization: Bearer <token>`  
  You must include a valid JWT token with admin privileges to access this endpoint. Ensure that "Bearer" is included at the beginning of the token.

## Create Slot

### POST /api/services/slots

**Description**: This endpoint allows an admin to create a new slot for a service.

### Request Headers

- `Authorization: Bearer <token>`  
  You must include a valid JWT token with admin privileges to access this endpoint. Ensure that "Bearer" is included at the beginning of the token.

### Request Body

```json
{
  "serviceId": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-08-15T00:00:00.000Z",
  "startTime": "09:00",
  "endTime": "10:00",
  "isBooked": false
}
```

## Get Available Slots

### GET /api/slots/availability

**Description**: This endpoint retrieves available slots based on optional query parameters.

### Query Parameters

- `date` (Optional): The specific date for which available slots are requested. The format should be `YYYY-MM-DD`.
- `serviceId` (Optional): ID of the service for which available slots are requested.

### Request Example

- GET /api/slots/availability?date=2024-06-15&serviceId=60d9c4e4f3b4b544b8b8d1c5

## Book a Service

### POST /api/bookings

**Description**: This endpoint allows users to book a service.

### Request Headers

- `Authorization: Bearer <token>`  
  You must include a valid JWT token with user privileges to access this endpoint. Ensure that "Bearer" is included at the beginning of the token.

## Get All Bookings

### GET /api/bookings

**Description**: This endpoint retrieves a list of all bookings. This action is restricted to admin users.

### Request Headers

- `Authorization: Bearer <token>`  
  You must include a valid JWT token with admin privileges to access this endpoint. Ensure that "Bearer" is included at the beginning of the token.

  ## Get User's Bookings

### GET /api/my-bookings

**Description**: This endpoint retrieves all bookings made by the authenticated user. This action is restricted to user accounts.

### Request Headers

- `Authorization: Bearer <token>`  
  You must include a valid JWT token with user privileges to access this endpoint. Ensure that "Bearer" is included at the beginning of the token.

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

```

```

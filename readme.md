# Shiny Car Washing Backend

This is a backend application for an e-commerce platform built with Node.js, Express, TypeScript, and MongoDB.

## APIs

# User API

## User Sign Up

### POST /api/auth/signup

**Description**: Create a new user with the provided details.

**Request Body**:

````json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin",
  "address": "123 Main Street, City, Country"
}

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
````

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

import express from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: '/route',
  },
];

moduleRoutes.forEach(route => (route.path, route.route));

export default router;

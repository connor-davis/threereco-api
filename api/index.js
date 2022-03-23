let { Router } = require('express');
let router = Router();

let authenticationRoutes = require('./authentication');
let usersRoutes = require('./users');
let connectionsRoutes = require('./connections');
const passport = require('passport');

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     Bearer:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 */

/**
 * @openapi
 * tags:
 *   - name: Authentication
 *     description: Api authentication routes.
 *   - name: Users
 *     description: Api users routes.
 *   - name: Connections
 *     description: Api connections routes.
 */

router.use('/auth', authenticationRoutes);
router.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes
);
router.use(
  '/connections',
  passport.authenticate('jwt', { session: false }),
  connectionsRoutes
);

module.exports = router;

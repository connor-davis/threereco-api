let { Router } = require('express');
let { GET_USERS } = require('../../queries/userQuerys');
let { readTransaction } = require('../../utils/neo4j');
let router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     description: Retrieve all users in the database.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Returns array of users.
 *       401:
 *         description: Returns "Unauthorized".
 */
router.get('/', async (request, response) => {
  readTransaction(GET_USERS(), (error, result) => {
    if (error)
      return response.status(200).json({
        message: 'There are no users in the database.',
        error: 'no-users',
      });
    else {
      let records = result.records;
      let users = records.map((record) => {
        return {
          id: record.get(0),
          email: record.get(1),
        };
      });

      return response.status(200).json({ data: users });
    }
  });
});

module.exports = router;

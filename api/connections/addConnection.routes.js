let { Router } = require('express');
let { CREATE_CONNECTION } = require('../../queries/connectionQuerys');
let { writeTransaction } = require('../../utils/neo4j');
let router = Router();

/**
 * @openapi
 * /api/v1/connections/add:
 *   post:
 *     description: Create a new connection
 *     tags: [Connections]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: The user who the connection is with's email
 *         type: string
 *     responses:
 *       200:
 *         description: Returns a success message or an error
 *       401:
 *         description: Returns "Unauthorized"
 */
router.post('/', async (request, response) => {
  let { body } = request;

  writeTransaction(
    CREATE_CONNECTION({
      requesterEmail: request.user.email,
      requestedEmail: body.email,
    }),
    (error, _) => {
      if (error)
        return response
          .status(200)
          .json({ message: 'Error while creating new connection', error });
      else
        return response
          .status(200)
          .json({ success: 'Created a connection successfully.' });
    }
  );
});

module.exports = router;

let { Router } = require('express');
let { GET_CONNECTIONS } = require('../../queries/connectionQuerys');
let { readTransaction } = require('../../utils/neo4j');
let router = Router();

let addConnectionRoutes = require('./addConnection.routes');
let deleteConnectionRoutes = require('./deleteConnection.routes');

/**
 * @openapi
 * /api/v1/connections:
 *   get:
 *     description: Retrieve all connections for a user.
 *     tags: [Connections]
 *     produces:
 *       - application/json
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Returns array of connections or error.
 *       401:
 *         description: Returns "Unauthorized".
 */
router.get('/', async (request, response) => {
  readTransaction(
    GET_CONNECTIONS({ email: request.user.email }),
    (error, result) => {
      if (error)
        return response
          .status(200)
          .json({ message: 'Error while getting connections.', error });
      else {
        let records = result.records;
        let connections = records.map((record) => {
          return {
            id: record.get(0),
            email: record.get(1),
          };
        });

        return response.status(200).json({ data: connections });
      }
    }
  );
});

router.use('/add', addConnectionRoutes);
router.use('/remove', deleteConnectionRoutes);

module.exports = router;

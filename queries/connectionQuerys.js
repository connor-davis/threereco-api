module.exports = {
  /**
   * @param {Object} data
   *
   * @param data.email The users email
   *
   * @returns {Object}
   */
  GET_CONNECTIONS: (data) => {
    return {
      statement: `MATCH (requester:User { email: $email})-[:CONNECTION]->(requested:User) RETURN requested.id, requested.email`,
      data,
    };
  },
  /**
   * @param {Object} data
   *
   * @param data.requesterEmail The user who is creating the connection's email
   * @param data.requestedEmail The user who is being connected with's email
   *
   * @returns {Object}
   */
  CREATE_CONNECTION: (data) => {
    return {
      statement: `MATCH (requester:User), (requested:User) WHERE requester.email = $requesterEmail AND requested.email = $requestedEmail CREATE (requester)-[:CONNECTION]->(requested) CREATE (requested)-[:CONNECTION]->(requester) RETURN requester.email, requested.email`,
      data,
    };
  },
  /**
   * @param {Object} data
   *
   * @param data.requesterEmail The user who is deleting the connection's email
   * @param data.requestedEmail The user who is being disconnected with's email
   *
   * @returns {Object}
   */
  DELETE_CONNECTION: (data) => {
    return {
      statement: `MATCH (requester:User { email: $requesterEmail })-[r:CONNECTION]-(requested:User { email: $requestedEmail }) DELETE r`,
      data,
    };
  },
};

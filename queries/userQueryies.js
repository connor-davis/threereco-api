module.exports = {
  /**
   * @param {Object} data ```js
   * { email: 'test@test' } or { id: '12345abcdef' }
   * ```
   * @returns {Object}
   */
  GET_USER: (data) => {
    return {
      statement: `MATCH (n) WHERE ${
        data.id ? 'n.id = $id' : 'n.email = $email'
      } RETURN n.id, n.email, n.password`,
      data,
    };
  },
  /**
   *
   * @param {Object} data
   * @param data.email The users email
   * @param data.password The users password
   * @returns {Object}
   */
  REGISTER_USER: (data) => {
    return {
      statement: `CREATE (user:User { id: $id, email: $email, password: $password })`,
      data,
    };
  },
  /**
   *
   * @param {Object} data
   * @param data.email The users email
   * @param data.password The users password
   * @returns {Object}
   */
  PASSWORD_MATCHES: (data) => {
    return {
      statement: `MATCH (n) WHERE n.email = $email RETURN {matches: n.password = $password, id: n.id, email: n.email}`,
      data,
    };
  },
};

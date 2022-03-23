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
      } RETURN n.id, n.email, n.password, n.lastLogin`,
      data,
    };
  },
  /**
   * @param {Object} data
   * @param data.email The users email
   * @param data.password The users password
   * @returns {Object}
   */
  CREATE_USER: (data) => {
    return {
      statement: `CREATE (user:User { id: $id, email: $email, password: $password })`,
      data,
    };
  },
  /**
   * @param {Object} data Data that needs to be added or updated to a user
   * @returns {Object}
   */
  UPDATE_USER: (data) => {
    let email = data.email;

    for (let key in data) {
      data[key] = `user.${key} = "${data[key]}"`;
    }

    let values = Object.values(data);

    return {
      statement: `MERGE (user:User { email: "${email}" }) SET ${values.join(
        ', '
      )} RETURN user`,
    };
  },
};

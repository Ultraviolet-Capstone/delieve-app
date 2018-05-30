var errorMessage = require('../common/error/error-message');

const userQuery = {
  findUserByTokne : function(pool, token) {
    const query = `
    SELECT u.id, u.name, u.phone, u.email, u.birthday, u.gender,
    CASE
    WHEN der.status = 'PASS' THEN 1
    ELSE 0
    END AS delivable
    FROM delieve.dv_user u 
    LEFT JOIN dv_delievery_evaluation_request der ON der.user_id = u.id 
    WHERE u.token = ?;
    `;
    const parameters = [token];
    return pool.query(query, parameters)
      .catch(err => { 
        return Promise.reject({ status: 500, message: err.Error });
      });
  },
  insertUser: function (pool,
    name,
    phone,
    email,
    birthday,
    token,
    token_provider,
    provider_selfi_url,
    provider_nickname,
    gender
  ) {
    const query = `
    INSERT dv_user (
      name,
      phone,
      email,
      birthday,
      token,
      token_provider,
      provider_selfi_url,
      provider_nickname,
      gender
    )
    values (
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ? 
    )
    `;
    const parameters = [
      name,
      phone,
      email,
      birthday,
      token,
      token_provider,
      provider_selfi_url,
      provider_nickname,
      gender
    ];
    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject({ status: 500, message: errorMessage.INSERT_ERROR });
      });
  },
}
module.exports = userQuery;
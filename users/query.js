const conn = require("../database");

getAllUsersQuery = () => {
    let query = `SELECT * FROM user`;
    return new Promise((resolve, reject) => {
        conn.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

getUserByIdQuery = id => {
    let query = "SELECT * FROM user WHERE Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (error, results, fields) => {
            if(error) {
                reject(error);
            }else{
                resolve(results);
            }
        })
    })
}

getUserByUsernameQuery = (username) => {
    let query = "SELECT * FROM user WHERE Username = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [username], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

getUserByEmailQuery = email => {
    let query = `SELECT * FROM user WHERE Email = ?`;
    return new Promise((resolve, reject) => {
        conn.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

editUserQuery = (data, id) => {
    let query = "UPDATE user SET Username = ?, Password = ?, Email = ? WHERE Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [data.username.trim(), data.pass.trim(), data.email.trim(), id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}

registerUserQuery = data => {
    let query = "INSERT INTO user (Username, Password, Email) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
        conn.query(query, [data.username.trim(), data.password.trim(), data.email.trim()], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}

deleteUserQuery = id => {
    let query = "DELETE FROM user WHERE Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}

module.exports = { getAllUsersQuery, getUserByUsernameQuery, editUserQuery,
    getUserByEmailQuery, registerUserQuery, deleteUserQuery, getUserByIdQuery };
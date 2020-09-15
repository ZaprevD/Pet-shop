const conn = require("../database");

getAllCategoriesQuery = () => {
    const query = `SELECT * FROM category`;
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

getCategoryByNameQuery = name => {
    const query = "SELECT Id FROM Category WHERE NAME = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [name], (error, results, fields) => {
            if(error) {
                reject(error);
            }else {
                resolve(results);
            };
        });
    });
};

updateCategoryQuery = (name, id) => {
    const query = "UPDATE category SET Name = ? WHERE Id = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [name, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

deleteCategoryQuery = (id) => {
    const query = "DELETE FROM category WHERE Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

addNewTopCategoryQuery = (name) => {
    const query = "INSERT INTO category (NAME) VALUES (?)";
    return new Promise((resolve, reject) => {
        conn.query(query, [name], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

addNewSubCategoryQuery = (name, parentId) => {
    const query = "INSERT INTO category (Name, ParentId) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
        conn.query(query, [name, parentId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

module.exports ={getAllCategoriesQuery, updateCategoryQuery, deleteCategoryQuery,
    addNewTopCategoryQuery, addNewSubCategoryQuery, getCategoryByNameQuery }
const conn = require("../database");

getAllProductsQuery = () => {
    const query = `SELECT * FROM product`;
    return new Promise((resolve, reject) => {
        conn.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
}

getProductsOnActionQuery = () => {
    const query = "SELECT * FROM product WHERE On_Action = true";
    return new Promise((resolve, reject) => {
        conn.query(query, (error, results, fields) => {
            if(error) {
                reject(error);
            }else{
                resolve(results);
            }
        })
    })
}

updateProductQuery = (name, desc, price, id, onAction) => {
    const query = "UPDATE product SET Name = ?, Description = ?, Price = ?, On_Action = ? WHERE Id = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [name, desc, price, onAction, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}

deleteProductQuery = (id) => {
    const query = "DELETE FROM product WHERE Id = ?";
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

addNewProductQuery = (name, desc, price, onAction, image) => {
    const query = "INSERT INTO product (Name, Description, Price, On_Action, Image_path) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        conn.query(query, [name, desc, price, onAction, image], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}

changeProductPictureQuery = (picture, id) => {
    const query = "UPDATE product SET Image_path = ? WHERE Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [picture, id], (error, results, fields) => {
            if(error) {
                reject(error);
            }else{
                resolve();
            };
        });
    });
};

module.exports = { getAllProductsQuery, updateProductQuery, getProductsOnActionQuery,
     deleteProductQuery, addNewProductQuery, changeProductPictureQuery };
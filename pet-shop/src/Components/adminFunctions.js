import axios from "axios";

const auth = {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.authToken
    }
}

export const adminLogin = (data) => {
    return axios.post("/api/login", data)
        .then(res => {
            localStorage.clear();
            localStorage.setItem("authToken", res.data);
            return res.status
        }).catch(err => {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 4);
            return status;
        });
}

export const logOut = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/loginadmin";
}

export const getAllProducts = () => {
    return axios.get(`/api/products`, auth)
        .then(res => {
            return { data: res.data, status: res.status }
        }).catch(err => {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 4);
            return { status: status };
        });
}

export const getProductsByCategoryId = category => {
    return axios.get(`/api/products/category/${category}`)
        .then(res => res.data).catch(err => console.log(err.message));
}

export const updateProduct = (name, desc, price, id, action) => {
    const data = { name: name, desc: desc, price: price, on_action: action }
    return axios.put(`/api/product/${id}`, data, auth)
        .then(res => {
            return { status: res.status, data: res.data }
        }).catch(err =>  {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 4);
            return { status: status };
        });
}

export const deleteProduct = (id) => {
    return axios.delete(`/api/product/${id}`, auth)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message));
}

export const addNewProduct = data => {
    return axios.post(`/api/product`, data, auth)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message));
}

export const getAllUsers = () => {
    return axios.get(`/api/users`, auth)
        .then(res => {
            return { data: res.data, status: res.status }
        }).catch(err => {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 4);
            return { status: status };
        });
}

export const getProductsOnAction = () => {
    return axios.get("/api/products/on-action")
        .then(res => res.data).catch(err => console.log(err));
}

export const editUser = (data, id) => {
    return axios.put(`/api/user/${id}`, data, auth)
        .then(res => {
            return { status: res.status, data: res.data }
        }).catch(err => {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 5);
            return { status: status };
        });
}

export const registerUser = (data) => {
    return axios.post(`/api/register`, data, auth)
        .then(res => {
            return { status: res.status, data: res.data }
        }).catch(err => {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 5);
            return { status: status };
        });
}

export const deleteUser = id => {
    return axios.delete(`/api/user/${id}`, auth)
        .then(res => res.data).catch(err => err.message);
}

const config = {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.authToken,
        'content-type': 'multipart/form-data'
    }
}

export const uploadFile = (id, file) => {
    return axios.patch(`/api/change/picture/${id}`, file, config)
        .then(res => res.status).catch(err => err.message);
}

export const getAllCategories = () => {
    return axios.get(`/api/categories`, auth).then(res => {
        return { status: res.status, data: res.data }
    }).catch(err => {
        const msg = err.message;
        let status = msg.substr(msg.indexOf("code") + 5);
        return { status: status };
    });
}

export const addTopCategory = (data) => {
    return axios.post('/api/top-cateogry', data, auth)
        .then(res => data = { status: res.status, data: res.data }).catch(err => {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 5);
            return { status: status };
        });
}

export const editCategory = (data, id) => {
    return axios.patch(`/api/edit-category/${id}`, data, auth)
        .then(res => {
            return { status: res.status, data: res.data }
        }).catch(err => {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 5);
            return { status: status };
        });
}

export const deleteCategory = id => {
    return axios.delete(`/api/delete-category/${id}`, auth)
        .then(res => res.data).catch(err => console.log(err.message));
}

export const sendResetPasswordMail = username => {
    return axios.put(`/api/resetpassword`, username)
        .then(res => {
            return { status: res.status, data: res.data }
        }).catch(err => {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 5);
            return { status: status };
        });
}

export const forgotUsernameMail = email => {
    return axios.put(`/api/forgot/username`, email)
        .then(res => {
            return { status: res.status, data: res.data }
        }).catch(err => {
            const msg = err.message;
            let status = msg.substr(msg.indexOf("code") + 5);
            return { status: status };
        });
};
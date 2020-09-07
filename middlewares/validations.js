hasNumbers = (t) => {
    return /\d/.test(t);
};

emailValidation = (req, res, next) => {
    let email = req.body.email.trim();
    let username = email.substr(0, email.indexOf("@"));
    var provider = email.substr(email.indexOf("@") + 1, email.lastIndexOf("."));
    var domain = email.substr(email.lastIndexOf(".") + 1);
    if (username === "" || username.length < 3) {
        let error = new Error("Check your e-email username");
        error.status = 422
        next(error);
    } else if (email.includes("@") && email.includes(".") && email !== "") {
        if (domain === undefined || domain.length < 2) {
            let error = new Error("Check your domain");
            error.status = 422
            next(error);
        }
        if (provider === undefined || provider.length < 2) {
            let error = new Error("Check your provider");
            error.status = 422
            next(error);
        };
        if ((hasNumbers(provider)) || hasNumbers(domain) || (domain.length > 3)) {
            let error = new Error("Check your domain or provider");
            error.status = 422
            next(error);
        }
    } else {
        let error = new Error("Check your email");
        error.status = 422
        next(error);
    };
    next();
};

usernameValidation = (req, res, next) => {
    let username = req.body.username;
    username.trim();
    if (username.length < 3) {
        let error = new Error("check your username");
        error.status = 422
        next(error);
    } else if (username.length > 20) {
        let error = new Error("check your username");
        error.status = 422
        next(error);
    };
    next();
};

passwordValidation = (req, res, next) => {
    let password = req.body.password;
    if (password.length < 5) {
        let error = new Error("your password must be at least 5 characters");
        error.status = 422;
        next(error);
    } else if (password.length > 20) {
        let error = new Error("your password cannot be longer than 20 characters");
        error.status = 422;
        next(error);
    };
    next();
};

passwordValidationForExistingUser = (req, res, next) => {
    let password = req.body.pass;
    if (password === "") {
        next();
        return;
    }
    if (password.length < 5) {
        let error = new Error("your password must be at least 5 characters");
        error.status = 422;
        next(error);
    } else if (password.length > 20) {
        let error = new Error("your password cannot be longer than 20 characters");
        error.status = 422;
        next(error);
    };
    next();
};

productNameValidation = (req, res, next) => {
    let name = req.body.name;
    if (name !== "") {
        if (name.length < 2) {
            let error = new Error("Name of the product is not valid");
            error.status = 422;
            next(error);
        }
        next();
    } else {
        let error = new Error("Please enter a name for this product");
        error.status = 422;
        next(error);
    };
};

categoryNameValidation = (req, res, next) => {
    let name = req.body.name;
    if (name !== "") {
        if (name.length < 2) {
            let error = new Error("Name of the category is not valid");
            error.status = 422;
            next(error);
        }
        next();
    } else {
        let error = new Error("Please enter a name for this category");
        error.status = 422;
        next(error);
    };
};

productPriceValidation = (req, res, next) => {
    let price = parseInt(req.body.price);
    if (isNaN(price)) {
        let error = new Error("Please set price for this product");
        error.status = 422;
        next(error);
    };
    next();
};

module.exports = {
    emailValidation, usernameValidation, passwordValidation, passwordValidationForExistingUser,
    productNameValidation, categoryNameValidation, productPriceValidation
}
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const query = require("./query");



logginUser = async (req, res) => {
    let data = await query.getUserByUsernameQuery(req.body.username);
    let dbUser = data[0];
    if (dbUser !== undefined) {
        if (dbUser.Password === req.body.password) {
            const user = new User(dbUser.Id, dbUser.Email, dbUser.Username);
            let token = jwt.sign({ user }, "test", { expiresIn: '2h' });
            res.status(200).send(token);
        } else {
            res.status(400).send("Invalid Password");
        }
    } else {
        res.status(404).send("USER NOT FOUND")
    }
}

getAllUsers = async (req, res) => {
    const users = await query.getAllUsersQuery();
    const clearData = users.map(el => new User(el.Id, el.Email, el.Username));
    res.status(200).send(clearData);
}

editUser = async (req, res) => {
    try {
        if (req.body.pass === "") {
            let user = await query.getUserByIdQuery(req.params.id);
            req.body.pass = user[0].Password;
        }
        let data = await query.getUserByUsernameQuery(req.body.username.trim());
        let mail = await query.getUserByEmailQuery(req.body.email.trim());
        let userByMail = mail[0];
        let dbUser = data[0];
        if ((userByMail === undefined || userByMail.Id === parseInt(req.params.id)) && (dbUser === undefined || dbUser.Id === parseInt(req.params.id))) {
            await query.editUserQuery(req.body, req.params.id);
            res.status(200).send("User Updated!");
        } else {
            res.status(409).send('Username or Email alredy taken');
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

registerUser = async (req, res) => {
    try {
        let data = await query.getUserByUsernameQuery(req.body.username.trim());
        let mail = await query.getUserByEmailQuery(req.body.email.trim());
        let userByMail = mail[0];
        let dbUser = data[0];
        if (dbUser === undefined && userByMail === undefined) {
            await query.registerUserQuery(req.body);
            res.status(200).send("User Added");
        } else {
            res.status(409).send('Username or Email alredy taken');
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

deleteUser = async (req, res) => {
    try {
        await query.deleteUserQuery(req.params.id);
        res.status(200).send("Корисникот е избришан");
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { getAllUsers, logginUser, editUser, registerUser, deleteUser };
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const query = require("./query");
const nodeMailer = require("nodemailer");


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

sendResetPasswordEmail = async (req, res) => {
    try {
        const dbUser = await query.getUserByUsernameQuery(req.body.username);
        if (dbUser[0] !== undefined) {
            let transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'dean.phone23@gmail.com', // generated ethereal user
                    pass: 'passcrack1', // generated ethereal password
                },
            });
            let mailOptions = {
                to: dbUser[0].Email,
                from: "no-replay@gmail.com",
                subject: "Password-reset link",
                text: "You are receiving this because you (or someone else) have requested the reset of the password." + '\n' +
                    "Your password is : " + dbUser[0].Password + '\n' +
                    'if you did not request this please ignore this email and your password will remain unchanged.'
            }
            transporter.sendMail(mailOptions, err => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send("success, an email has been sent to " + dbUser[0].Email + " with further instructions");
                }
            })
        } else {
            res.status(404).send(`The user with this username does not exists`);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

sendResetUsernameEmail = async (req, res) => {
    try {
        const dbUser = await query.getUserByEmailQuery(req.body.email);
        if (dbUser[0] !== undefined) {
            let transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'dean.phone23@gmail.com', // generated ethereal user
                    pass: 'passcrack1', // generated ethereal password
                },
            });
            let mailOptions = {
                to: dbUser[0].Email,
                from: "no-replay@gmail.com",
                subject: "Forgot Username?",
                text: "You are receiving this because you (or someone else) have requested for forgotten Username. " + '\n' +
                    "Your Username is : " + dbUser[0].Username + '\n' +
                    'if you did not request this please ignore this email and your Username will remain unchanged.'
            }
            transporter.sendMail(mailOptions, err => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send("success, an email has been sent to " + dbUser[0].Email + " with further instructions");
                }
            })
        } else {
            res.status(404).send(`User not found!`);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { getAllUsers, logginUser, editUser, registerUser, deleteUser, sendResetPasswordEmail, sendResetUsernameEmail };
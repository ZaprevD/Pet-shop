const express = require("express");
require('dotenv').config();
const middlewares  = require("./middlewares/common");
const allRoutes = require("./router");
const bodyParser = require("body-parser");
const jwt = require("express-jwt");
const upload = require("express-fileupload");
const cors = require('cors');
const app = express();                                                               

const publicPaths = ["/api/login", '/api/resetpassword',
'/api/forgot/username', "/api/products", "/api/products/on-action", "/api/categories", /^\/api\/products\/category\/.*/];
app.use(cors());
app.use(upload());
app.use(jwt({ secret: "test", algorithms: ['HS256'] }).unless({ path: publicPaths }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.static(__dirname + '/pet-shop'));
app.use(middlewares.logger);
app.use(allRoutes);
app.use(middlewares.wrongRouteHandler);
app.use(middlewares.errorHandler);

let port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});

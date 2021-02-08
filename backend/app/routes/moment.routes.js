const { authJwt } = require("../middlewares");
const controller = require("../controllers/moment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/moment/add", [authJwt.verifyToken], controller.saveMoment);

  app.post("/api/moment/get", [authJwt.verifyToken], controller.getAllMoments);
};

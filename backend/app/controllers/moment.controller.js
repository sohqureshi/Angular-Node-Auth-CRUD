const Moment = require("../models/moment.model");

exports.saveMoment = (req, res) => {
  console.log(req.url);
  const moment = new Moment({
    files: req.files,
    tags: req.tags,
    user: req.userId,
  });

  moment.save((err, _moment) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err });
      return;
    }
    if (_moment) {
      console.log(_moment);
      res.status(200).send("Moment added successful.");
    }
  });
};

exports.getAllMoments = (req, res) => {
  User.find({
    req: req.user.userId,
  })
    .populate("roles", "-__v")
    .exec((err, moments) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(moments);
    });
  res.status(200).send("User Content.");
};

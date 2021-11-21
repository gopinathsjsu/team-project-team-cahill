const express = require("express");
const jwtDecode = require("jwt-decode");
const User = require("../models/UserModel");
// const { checkAuth } = require('../config/passport');
// const kafka = require('../kafka/client');

const router = express.Router();

router.put("/", (req, res) => {
  //   req.body.path = 'user-update-profile';
  // console.log(req.body);
  // const res = {};
  User.findOne({ email: req.body.email }).then((oldUser) => {
    // console.log("inside olduser", oldUser);
    if (!oldUser) {
      res.status = 404;
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "PROFILE_NOT_FOUND" }));
    } else {
      console.log("inside logic");
      const filter = { email: req.body.email };
      const update = {
        name: req.body.name ? req.body.name : oldUser.name,
        email: req.body.email ? req.body.email : oldUser.email,
        phone: req.body.phone ? req.body.phone : oldUser.phone,
        mileage: req.body.mileage ? req.body.mileage : oldUser.mileage,
        // language: req.body.language ? req.body.language : oldUser.language,
        // timezone: req.body.timezone ? req.body.timezone : oldUser.timezone,
      };
      //   console.log(update);
      const updatedUser = User.findOneAndUpdate(filter, update, {
        new: true,
        useFindAndModify: true,
      }).then((updatedUser) => {
        console.log(updatedUser);
        //   res.data = {
        //     name: updatedUser.name,
        //     email: updatedUser.email,
        //     phone: updatedUser.phone,
        //     mileage: updatedUser.mileage,
        //     // currency: updatedUser.currency,
        //     // timezone: updatedUser.timezone,
        //     // image: updatedUser.image,
        //     _id: updatedUser._id,
        //   };
        res.status = 200;
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            mileage: updatedUser.mileage,
            _id: updatedUser._id,
            // timezone: results.data.timezone,
            // image: results.data.image,
            message: "PROFILE_UPDATE_SUCCESS",
          })
        );
      });
    }
    console.log(res.data);
    //   } catch (e) {
    //     res.status = 500;
    //     res.writeHead(500, {
    //         'Content-Type': 'application/json',
    //       });
    //       res.end(JSON.stringify({ message: 'ERROR' }));  }
  });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById({
    _id: req.params.id,
  });

  if (user) {
    res.status = 200;
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(user));
  } else {
    res.status = 400;
    res.writeHead(400, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "PROFILE_NOT_FOUND" }));
  }
});

module.exports = router;

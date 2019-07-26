import User from "../schema/schemaUser.js";
import passwordHash from "password-hash";
import sendEmail from "../mailSender/welcomeMail";


function signup(req, res) {
    console.log('signup', req.body)
    var user = {
        pseudo      : req.body.pseudo,
        email       : req.body.email,
        role        : "standard",
        password    : passwordHash.generate(req.body.password),
        firstName   : req.body.firstName,
        lastName    : req.body.lastName,
        age         : req.body.age,
        genre       : req.body.genre,
        avatarUrl   : req.body.avatarUrl,
        avatarFile  : req.body.avatarFile,
        presentation: req.body.presentation,
        preferences : req.body.preferences,
        contactInformation: req.body.contactInformation,
        logged      : false,
    }
    var findUser = new Promise(function (resolve, reject) {
        User.findOne({
            email: user.email
        }, function (err, result) {
            console.log(err, result)
            if (err) {
                reject(500);
            } else {
                if (result) {
                    console.log('reject')
                    reject(204)
                } else {
                    resolve(true)
                }
            }
        })
    })

    findUser.then(function () {
        var _u = new User(user);
        _u.save(function (err, user) {
            if (err) {
                console.log(err)
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else {
              sendEmail(req.body.email, res);

            }
        })
    }, function (error) {
        switch (error) {
            case 500:
                res.status(500).json({
                    "text": "Erreur interne"
                })
                break;
            case 204:
                res.json({
                    "text": "L'adresse email existe déjà"
                })
                break;
            default:
                res.status(500).json({
                    "text": "Erreur interne"
                })
        }
    })
}

export default signup;
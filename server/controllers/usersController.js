var usersModel = require('../models/usersModel.js');
const hash = require('password-hash')
const jwt = require('jsonwebtoken')

module.exports = {
    login: function(req, res){
        let username = req.body.username
        let password = req.body.password
        usersModel.findOne({username: username}, function(err, user){
            if (err){
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'Incorrect username or password'
                });
            }
            if (user) {
                if (hash.verify(password, user.password)){
                    let token = jwt.sign({username: user.username}, process.env.SECRET)
                    res.json({
                        token: token
                    })
                } else {
                    return res.status(404).json({
                        message: 'Incorrect username or password'
                    });
                }
            }
        })
    },
    list: function (req, res) {
        usersModel.find(function (err, userss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            return res.json(userss);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        usersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }
            return res.json(users);
        });
    },
    register: function (req, res) {
        if (!req.body.username || !req.body.password){
            return res.status(500).json({
                message: 'Username and Password Required',
                error: err
            });
        }
        var users = new usersModel({			username : req.body.username,			password : hash.generate(req.body.password)
        });

        users.save(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating users',
                    error: err
                });
            }
            return res.status(201).json(users);
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        usersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users',
                    error: err
                });
            }
            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }

            users.username = req.body.username ? req.body.username : users.username;			users.password = req.body.password ? req.body.password : users.password;
            users.save(function (err, users) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating users.',
                        error: err
                    });
                }

                return res.json(users);
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        usersModel.findByIdAndRemove(id, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the users.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

var dataModel = require('../models/dataModel.js');

module.exports = {
    list: function (req, res) {
        dataModel.find(function (err, datas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting data.',
                    error: err
                });
            }
            return res.json(datas);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id}, function (err, data) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting data.',
                    error: err
                });
            }
            if (!data) {
                return res.status(404).json({
                    message: 'No such data'
                });
            }
            return res.json(data);
        });
    },
    create: function (req, res) {
        var data = new dataModel({			letter : req.body.letter,			frequency : req.body.frequency
        });

        data.save(function (err, data) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating data',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        dataModel.findOne({_id: id}, function (err, data) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting data',
                    error: err
                });
            }
            if (!data) {
                return res.status(404).json({
                    message: 'No such data'
                });
            }

            data.letter = req.body.letter ? req.body.letter : data.letter;			data.frequency = req.body.frequency ? req.body.frequency : data.frequency;
            data.save(function (err, data) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating data.',
                        error: err
                    });
                }

                return res.json(data);
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        dataModel.findByIdAndRemove(id, function (err, data) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the data.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
    searching: function (req, res) {
        var letter = req.query.letter
        var frequency = req.query.frequency
        if (letter && frequency){
            dataModel.find({letter: letter, frequency: frequency}, function(err, data){
                res.json(data)
            })
        } else if (letter) {
            dataModel.find({letter: letter}, function(err, data){
                res.json(data)
            })
        } else if (frequency){
            dataModel.find({frequency: frequency}, function(err, data){
                res.json(data)
            })
        }
    }
};

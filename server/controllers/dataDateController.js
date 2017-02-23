var dataDateModel = require('../models/dataDateModel.js');

module.exports = {
    list: function (req, res) {
        dataDateModel.find(function (err, dataDates) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataDate.',
                    error: err
                });
            }
            return res.json(dataDates);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        dataDateModel.findOne({_id: id}, function (err, dataDate) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataDate.',
                    error: err
                });
            }
            if (!dataDate) {
                return res.status(404).json({
                    message: 'No such dataDate'
                });
            }
            return res.json(dataDate);
        });
    },
    create: function (req, res) {
        var dataDate = new dataDateModel({			date : req.body.date,			point : req.body.point
        });

        dataDate.save(function (err, dataDate) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating dataDate',
                    error: err
                });
            }
            return res.status(201).json(dataDate);
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        dataDateModel.findOne({_id: id}, function (err, dataDate) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataDate',
                    error: err
                });
            }
            if (!dataDate) {
                return res.status(404).json({
                    message: 'No such dataDate'
                });
            }

            dataDate.date = req.body.date ? req.body.date : dataDate.date;			dataDate.point = req.body.point ? req.body.point : dataDate.point;
            dataDate.save(function (err, dataDate) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating dataDate.',
                        error: err
                    });
                }

                return res.json(dataDate);
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        dataDateModel.findByIdAndRemove(id, function (err, dataDate) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the dataDate.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

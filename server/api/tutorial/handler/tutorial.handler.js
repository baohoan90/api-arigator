const tutorialService = require('../service/tutorial.service');

/**
 * findAll
 * @param {Object} req 
 * @param {Object} res 
 */
exports.findAll = (req, res) => {
    // Perform validation here
    // buid search condition
    var condition = { 
        //tutorialCode: req.query.tutorialCode,
        tutorialName : req.query.tutorialName
    };

    tutorialService.findAll(condition)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};
const Pageable = require('../../../utils/pageable.utils');
const tutorialService = require('../service/tutorial.service');

/**
 * findAll
 * @param {Object} req 
 * @param {Object} res 
 */
exports.findAll = (req, res) => {
    var condition = {
        //tutorialCode: req.query.tutorialCode,
        tutorialName: req.query.tutorialName
    };

    tutorialService.findAll(condition, Pageable.of(req))
        .then(data => {
            res.send(data);
        })
        .catch(error => next(error));
};
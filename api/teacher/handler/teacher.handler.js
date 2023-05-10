const Pageable = require("../../../utils/pageable.utils");

// Validation 
const { validationResult } = require('express-validator');
const ValidationError = require('../../../base/errors/validation.error');

// Teacher Service
const teacherService = require("../service/teacher.service");


/**
 * create teacher
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = (req, res, next) => {

    // check valid body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    const dto = req.body

    // Save teacher in the database
    teacherService.create(dto)
        .then(data => {
            res.send(data);
        })
        .catch(error => next(error));
};

/**
 * search teacher
 * @param {Object} req 
 * @param {Object} res 
 */
exports.search = (req, res, next) => {
    // Perform validation here
    let condition = {
        teacherName: req.query.teacherName
    };

    teacherService.search(condition, Pageable.of(req))
    .then(data => {
        res.send(data);
    })
    .catch(error => next(error));
};

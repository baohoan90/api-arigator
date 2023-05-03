const teacherService = require("../service/teacher.service");
const Pageable = require("../../../utils/pageable.utils");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.teacherName) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }

    // Create a Tutorial
    const dto = req.body

    // Save teacher in the database
    teacherService.create(dto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Teacher.'
            });
        });
};

/**
 * findAll
 * @param {Object} req 
 * @param {Object} res 
 */
exports.findAll = (req, res) => {
    // Perform validation here
    let condition = {
        teacherName: req.query.teacherName
    };

    const pageable = Pageable.of(req);

    teacherService.findAll(condition, pageable)
    .then(data => {
        res.send(pageable.build(data));
    })
    .catch(error => {
        next(error)
    });
};

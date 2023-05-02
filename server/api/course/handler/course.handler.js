const courseService = require('../service/course.service');

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
        teacherCode: req.query.teacherCode
    };

    courseService.findTutorialByTeacher(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving tutorials.'
            });
        });
};
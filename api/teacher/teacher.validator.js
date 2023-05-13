const { check, body } = require('express-validator');
const AppConstant = require('../../constants/app.constant');

const validateCreateTeacher = () => {
    return [
        body('teacherCode', 'teacherCode does not Empty').not().isEmpty(),
        body('teacherName', 'teacherName does not Empty').not().isEmpty(),
        body('teacherName', 'teacherName more than 6 digits').isLength({ min: 6 }),
        body('birthday', 'Invalid birthday').isISO8601(AppConstant.YYYY_MM_DD)
    ];
}

const validator = {
    validateCreateTeacher: validateCreateTeacher
};

module.exports = { validator };
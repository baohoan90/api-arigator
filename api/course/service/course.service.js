var _ = require("lodash");
const db = require("../../../base/models");
const CourseInfo = require("../models/course-info");

/**
 * findTutorialByTeacher
 * @param {Object} teacher 
 */
exports.findTutorialByTeacher = async function (dto) {
    
    if (_.isEmpty(dto.teacherCode)) {
        throw new Error('teacherCode cannot be empty!');
    }
    
    let SQL = `
        SELECT 
            otim.teacher_id,
            otim.teacher_code,
            otim.teacher_name,
            otim.birthday,
            otim.gender,
            ttim.tutorial_id,
            ttim.tutorial_code,
            ttim.tutorial_name,
            ttim.tutorial_start_time,
            ttim.tutorial_end_time
            FROM otr_teacher_info_mst otim 
        INNER JOIN tst_tutorial_info_mst ttim ON otim.teacher_code = ttim.teacher_code
        WHERE otim.teacher_code = '${dto.teacherCode}'`;
    
    try {    
        let tutorialList = await db.sequelize.query(SQL, {
                type: db.Sequelize.QueryTypes.SELECT,
                mapToModel: true,
                model: CourseInfo
            }
        );
        return tutorialList;
    } catch (e) {
        throw new Error(e.message)
    }
}
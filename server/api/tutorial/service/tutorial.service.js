const db = require("../../../base/models");
const StringUtils = require("../../../utils/string.utils");

const tstTutorialInfoMst = db.TstTutorialInfoMst; // DAO
const Op = db.Sequelize.Op;

/**
 * Create a teacher
 * @param {Object} teacher 
 */
exports.create = async function (tutorial) {
    if (tutorial == null) {
        throw new Error('Tutorial cannot be empty!')
    }

    try {
        return await tstTutorialInfoMst.create(tutorial);
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * findAll
 */
exports.findAll = async function (dto) {

    var condition = StringUtils.isNotEmpty(dto.tutorialName) ? {
        tutorialName: {
            [Op.iLike]: `%${dto.tutorialName}%`
        }
    } : null;

    return await tstTutorialInfoMst.findAll({ where: condition });
}
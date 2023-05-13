const _ = require("lodash");
const db = require("../../base/models");
const Pageable = require("../../utils/pageable.utils");

const tstTutorialInfoMst = db.models.tstTutorialInfoMst; // DAO
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
exports.findAll = async function (dto, pageable) {

    var condition = !_.isEmpty(dto.tutorialName) ? {
        tutorialName: {
            [Op.iLike]: `%${dto.tutorialName}%`
        }
    } : null;

    const { limit, offset } = pageable;

    const data = await tstTutorialInfoMst.findAll({
        where: condition,
        limit,
        offset,
        order: [
            ['tutorialStartTime', 'DESC']
        ]
    });
    return Pageable.build(pageable, data);
}
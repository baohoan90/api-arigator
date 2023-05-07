const _ = require("lodash");
const db = require("../../../base/models");
const Pageable = require("../../../utils/pageable.utils");
const Op = db.Sequelize.Op;

/**
 * Create a teacher
 * @param {Object} dto 
 */
exports.create = async function (dto) {
    return await otrTeacherInfoMst.create(dto);
}


// Retrieve all Tutorials from the database.
exports.search = async function (dto, pageable) {

    var condition = !_.isEmpty(dto.teacherName) ? {
        teacherName: {
            [Op.iLike]: `%${dto.teacherName}%`
        }
    } : null;

    const { limit, offset } = pageable;

    const data = await db.models.otrTeacherInfoMst.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [
            ['updatedAt', 'DESC']
        ]
    });

    return Pageable.build(pageable, data);
}

/**
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};
 */
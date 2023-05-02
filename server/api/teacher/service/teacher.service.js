const db = require("../../../base/models");
const StringUtils = require("../../../utils/string.utils");

const otrTeacherInfoMst = db.OtrTeacherInfoMst; // DAO
const Op = db.Sequelize.Op;

/**
 * Create a teacher
 * @param {Object} dto 
 */
exports.create = async function (dto) {
    if (dto == null) {
        throw new Error('Teacher cannot be empty!')
    }

    try {
        return await otrTeacherInfoMst.create(dto);
    } catch (e) {
        throw new Error(e.message)
    }
}


// Retrieve all Tutorials from the database.
exports.findAll = async function (dto, pageable) {

    var condition = StringUtils.isNotEmpty(dto.teacherName) ? {
        teacherName: {
            [Op.iLike]: `%${dto.teacherName}%`
        }
    } : null;

    const {limit, offset } = pageable;

    return await otrTeacherInfoMst.findAndCountAll({ where: condition, limit, offset });
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
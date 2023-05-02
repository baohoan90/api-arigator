var DataTypes = require("sequelize").DataTypes;
var _comUserMst = require("./com-user-mst");
var _otrTeacherInfoMst = require("./otr-teacher-info-mst");
var _tstTutorialInfoMst = require("./tst-tutorial-info-mst");

function initModels(sequelize) {
  var comUserMst = _comUserMst(sequelize, DataTypes);
  var otrTeacherInfoMst = _otrTeacherInfoMst(sequelize, DataTypes);
  var tstTutorialInfoMst = _tstTutorialInfoMst(sequelize, DataTypes);


  return {
    comUserMst,
    otrTeacherInfoMst,
    tstTutorialInfoMst,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

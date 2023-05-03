const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tstTutorialInfoMst', {
    tutorialId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'tutorial_id'
    },
    tutorialName: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'tutorial_name'
    },
    tutorialCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'tutorial_code'
    },
    tutorialStartTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'tutorial_start_time'
    },
    tutorialEndTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'tutorial_end_time'
    },
    teacherCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'teacher_code'
    }
  }, {
    sequelize,
    tableName: 'tst_tutorial_info_mst',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tst_tutorial_mst_pkey",
        unique: true,
        fields: [
          { name: "tutorial_id" },
        ]
      },
    ]
  });
};

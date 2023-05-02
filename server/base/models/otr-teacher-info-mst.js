const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('otrTeacherInfoMst', {
    teacherId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'teacher_id'
    },
    teacherCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'teacher_code'
    },
    teacherName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'teacher_name'
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lockMngUpdateCnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: 'lock_mng_update_cnt'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  }, {
    sequelize,
    tableName: 'otr_teacher_info_mst',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "otr_teacher_mst_pkey",
        unique: true,
        fields: [
          { name: "teacher_id" },
        ]
      },
    ]
  });
};

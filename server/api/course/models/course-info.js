const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../base/models");

const CourseInfo = sequelize.define('courseInfo', {
  teacherId: {
    field: 'teacher_id',
    type: DataTypes.INTEGER,
  },
  teacherCode: {
    type: DataTypes.STRING(10),
    field: 'teacher_code'
  },
  teacherName: {
    type: DataTypes.STRING(200),
    field: 'teacher_name'
  },
  birthday: {
    type: DataTypes.DATEONLY
  },
  gender: {
    type: DataTypes.INTEGER
  },
  tutorialId: {
    type: DataTypes.INTEGER,
    field: 'tutorial_id'
  },
  tutorialName: {
    type: DataTypes.STRING(500),
    field: 'tutorial_name'
  },
  tutorialCode: {
    type: DataTypes.STRING(10),
    field: 'tutorial_code'
  },
  tutorialStartTime: {
    type: DataTypes.DATE,
    field: 'tutorial_start_time'
  },
  tutorialEndTime: {
    type: DataTypes.DATE,
    field: 'tutorial_end_time'
  }
});

module.exports = CourseInfo;
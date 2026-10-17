'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      session_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question_set_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'question_sets',
          key: 'question_set_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      join_code: {
        type: Sequelize.CHAR(6),
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.ENUM('waiting', 'playing', 'ended'),
        allowNull: false,
        defaultValue: 'waiting',
      },
      duration_sec: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 360,
      },
      started_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ended_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sessions');
  },
};
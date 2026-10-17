'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      question_id: {
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
        onDelete: 'CASCADE',
      },
      question_text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      question_type: {
        type: Sequelize.ENUM('multiple_choice', 'true_false'),
        allowNull: false,
      },
      difficulty_level: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      time_limit_sec: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 20,
      },
      correct_index: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('questions');
  },
};
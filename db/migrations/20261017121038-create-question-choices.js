'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('question_choices', {
      question_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'question_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      choice_index: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        allowNull: false,
      },
      choice_text: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('question_choices');
  },
};
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('answers', {
      answer_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      seat_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'seats',
          key: 'seat_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      question_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      choice_index: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      answered_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE "answers"
      ADD CONSTRAINT "answers_choice_fk"
      FOREIGN KEY ("question_id", "choice_index")
      REFERENCES "question_choices" ("question_id", "choice_index")
      ON UPDATE CASCADE
      ON DELETE RESTRICT
    `);

    await queryInterface.addConstraint('answers', {
      fields: ['seat_id', 'question_id'],
      type: 'unique',
      name: 'answers_seat_question_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('answers');
  },
};
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seats', {
      seat_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      session_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'sessions',
          key: 'session_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      nickname: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      current_stage: {
        type: Sequelize.ENUM('campus', 'computer_lab', 'ccb', 'ict', 'gate'),
        allowNull: false,
        defaultValue: 'campus',
      },
      time_penalty_sec: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      token_expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });

    await queryInterface.addConstraint('seats', {
      fields: ['session_id', 'user_id'],
      type: 'unique',
      name: 'seats_session_user_unique',
    });

    await queryInterface.addConstraint('seats', {
      fields: ['session_id', 'nickname'],
      type: 'unique',
      name: 'seats_session_nickname_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('seats');
  },
};
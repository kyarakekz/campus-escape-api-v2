'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reward_claims', {
      reward_claim_id: {
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
      target_seat_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'seats',
          key: 'seat_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      stage: {
        type: Sequelize.ENUM('computer_lab', 'ccb', 'ict'),
        allowNull: false,
      },
      box_index: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      reward_type: {
        type: Sequelize.ENUM('points_10', 'points_20', 'room_swap'),
        allowNull: false,
      },
      points_awarded: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      claimed_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('reward_claims');
  },
};
'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const startedAt = new Date(now.getTime() - 10 * 60 * 1000);
    const endedAt = new Date(now.getTime() - 4 * 60 * 1000);

    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        full_name: 'Taylor Batumbal Jr.',
        role: 'host',
        school_id: '2099-3000',
        email: 'taytay@example.test',
        password_hash: 'seed-only-placeholder',
        created_at: now,
      },
      {
        user_id: 2,
        full_name: 'Ma. Cathy Fukiko',
        role: 'player',
        school_id: '2099-3001',
        email: 'cat09@example.test',
        password_hash: 'seed-only-placeholder',
        created_at: now,
      },
      {
        user_id: 3,
        full_name: 'Lucy Pearl Tan',
        role: 'player',
        school_id: '2099-3002',
        email: 'Lucipearl@example.test',
        password_hash: 'seed-only-placeholder',
        created_at: now,
      },
      {
        user_id: 4,
        full_name: 'Sol Demarco',
        role: 'player',
        school_id: '2099-3003',
        email: 'sol@example.test',
        password_hash: 'seed-only-placeholder',
        created_at: now,
      },
    ]);

    await queryInterface.bulkInsert('question_sets', [
      {
        question_set_id: 1,
        user_id: 1,
        title: 'Campus Escape Demo Set',
        description: 'Sample questions for the Campus Escape API.',
        subject: 'Software Engineering',
        grade_level: 'College',
        created_at: now,
      },
    ]);

    await queryInterface.bulkInsert('questions', [
      {
        question_id: 1,
        question_set_id: 1,
        question_text: 'Which location is the final escape point?',
        question_type: 'multiple_choice',
        difficulty_level: 1,
        time_limit_sec: 20,
        correct_index: 3,
      },
    ]);

    await queryInterface.bulkInsert('question_choices', [
      { question_id: 1, choice_index: 0, choice_text: 'Computer Lab' },
      { question_id: 1, choice_index: 1, choice_text: 'CCB' },
      { question_id: 1, choice_index: 2, choice_text: 'ICT' },
      { question_id: 1, choice_index: 3, choice_text: 'Main Gate' },
    ]);

    await queryInterface.bulkInsert('sessions', [
      {
        session_id: 1,
        question_set_id: 1,
        join_code: '313001',
        status: 'ended',
        duration_sec: 360,
        started_at: startedAt,
        ended_at: endedAt,
      },
    ]);

    await queryInterface.bulkInsert('seats', [
      {
        seat_id: 1,
        session_id: 1,
        user_id: 2,
        nickname: 'Ari',
        score: 1200,
        current_stage: 'gate',
        time_penalty_sec: 0,
        token_expires_at: null,
        completed: true,
      },
      {
        seat_id: 2,
        session_id: 1,
        user_id: 3,
        nickname: 'Mika',
        score: 900,
        current_stage: 'gate',
        time_penalty_sec: 0,
        token_expires_at: null,
        completed: true,
      },
      {
        seat_id: 3,
        session_id: 1,
        user_id: 4,
        nickname: 'Sol',
        score: 750,
        current_stage: 'gate',
        time_penalty_sec: 0,
        token_expires_at: null,
        completed: true,
      },
    ]);

    await queryInterface.bulkInsert('answers', [
      {
        answer_id: 1,
        seat_id: 1,
        question_id: 1,
        choice_index: 3,
        is_correct: true,
        answered_at: endedAt,
      },
      {
        answer_id: 2,
        seat_id: 2,
        question_id: 1,
        choice_index: 3,
        is_correct: true,
        answered_at: endedAt,
      },
      {
        answer_id: 3,
        seat_id: 3,
        question_id: 1,
        choice_index: 3,
        is_correct: true,
        answered_at: endedAt,
      },
    ]);

    await queryInterface.bulkInsert('reward_claims', [
      {
        reward_claim_id: 1,
        seat_id: 1,
        target_seat_id: 2,
        stage: 'computer_lab',
        box_index: 1,
        reward_type: 'points_10',
        points_awarded: 10,
        claimed_at: endedAt,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('reward_claims', null, {});
    await queryInterface.bulkDelete('answers', null, {});
    await queryInterface.bulkDelete('seats', null, {});
    await queryInterface.bulkDelete('sessions', null, {});
    await queryInterface.bulkDelete('question_choices', null, {});
    await queryInterface.bulkDelete('questions', null, {});
    await queryInterface.bulkDelete('question_sets', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
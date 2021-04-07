const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const StatisticSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    learnedWords: {
      type: Number
    },
    optional: {
      type: Object,
      required: true
    },
    vocabulary: {
      type: Object,
      required: true
    },
    call: {
      type: Object,
      required: true
    },
    speakit: {
      type: Object,
      required: true
    },
    sprint: {
      type: Object,
      required: true
    },
    ourgame: {
      type: Object,
      required: true
    },
    puzzle: {
      type: Object,
      required: true
    },
    savanna: {
      type: Object,
      required: true
    }
  },
  { collection: 'statistic' }
);

addMethods(StatisticSchema);

module.exports = mongoose.model('Statistic', StatisticSchema);

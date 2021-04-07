const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const SettingsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    wordsPerDay: {
      type: Number
    },
    optional: {
      type: Object,
      required: false
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
  { collection: 'setting' }
);

addMethods(SettingsSchema);

module.exports = mongoose.model('Settings', SettingsSchema);

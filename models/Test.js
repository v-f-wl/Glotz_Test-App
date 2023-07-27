import mongoose from 'mongoose'

const TestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    watchings: {
      type: Number,
      default: 0
    },
    ratingCount: {
      type: Array,
      default: []
    },
    ratingResult: {
      type: Number,
      default: 0
    },
    started: {
      type: Number,
      default: 0
    },
    finished:{
      type: Number,
      default: 0
    },
    category: {
      type: String,
      required: true,
    },
    questions: {
      type: mongoose.Schema.Types.Mixed
    },
    questionsCount: {
      type: Number,
      required: true
    },
    result: {
      type: mongoose.Schema.Types.Mixed
    },
    resultCount:{
      type: Number,
      required: true
    },
    countAnswer:{
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.models.Test || mongoose.model('Test', TestSchema)
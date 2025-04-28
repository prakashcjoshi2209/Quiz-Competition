import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true },


  teamName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },


  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;

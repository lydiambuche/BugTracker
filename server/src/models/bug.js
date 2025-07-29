import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to user model
    required: true,
  }
}, {
  timestamps: true,
});

const Bug = mongoose.model('Bug', bugSchema);

export default Bug;

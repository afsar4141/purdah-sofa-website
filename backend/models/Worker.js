const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    skill: { type: String, required: true },
    experience: { type: String, default: null },
    area: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Approved', 'Rejected'],
      default: 'New'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false }
  }
);

workerSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Worker', workerSchema);
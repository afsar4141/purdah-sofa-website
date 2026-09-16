const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Replied', 'Closed'],
      default: 'New'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false }
  }
);

contactSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Contact', contactSchema);
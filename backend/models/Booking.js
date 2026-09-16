const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    address: { type: String, required: true },
    preferred_date: { type: String, default: null },
    message: { type: String, default: null },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'New'
    }
  },
  {
    // Store the creation time in a field called "created_at" (matching what
    // the frontend and admin panel already expect), instead of Mongoose's
    // default "createdAt".
    timestamps: { createdAt: 'created_at', updatedAt: false }
  }
);

// Make sure API responses include a clean "id" field instead of Mongo's "_id",
// so nothing else in the app (frontend, admin panel) needs to change.
bookingSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
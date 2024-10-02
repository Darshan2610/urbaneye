import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  imageUrls: [{ type: String, required: true }],
  status: { 
    type: String, 

    enum: ['pending', 'in-progress', 'resolved'], 
    default: 'pending' 
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', reportSchema);
export default Report;


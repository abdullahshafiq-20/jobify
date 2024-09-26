import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    location: String,
    salary: Number,
    requirements: [String],
    postDate: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  export const Job = mongoose.model('Job', jobSchema);
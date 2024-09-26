import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    location: String,
    logo: String, // URL to logo image
  }, { timestamps: true });
  
  export const Company = mongoose.model('Company', companySchema);
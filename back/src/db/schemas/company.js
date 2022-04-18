import { Schema, model } from "mongoose";

const CompanySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    registerNumber: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = model("Company", CompanySchema);

export { CompanyModel };

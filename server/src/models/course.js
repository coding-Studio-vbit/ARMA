const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    totalYears: { type: Number, default: 4 },
    branches: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);

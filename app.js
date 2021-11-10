//imports
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

//setup operations
mongoose.connect("mongodb://localhost:27017/mongoose-lib");

let connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));

//schemas
let studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  current: { type: Boolean, required: true },
  hobbies: Array,
});
let lessonSchema = new mongoose.Schema({
  name: String,
  submittable: Boolean,
});

//models
let Student = mongoose.model("Student", studentSchema);
let Instructor = mongoose.model("Instructor", studentSchema);
let Lesson = mongoose.model("Lesson", lessonSchema);

//data entry

//helper functions
async function updateStudent(query, update) {
  let entry = await Student.findOneAndUpdate(query, update, {
    new: true,
    upsert: true,
  });

  entry.save();
}

async function showStudents() {
  try {
    let studentData = await Student.find({});
    console.log(studentData);
  } catch (err){
    console.error(err);
  }
}

showStudents();

// updateStudent({_id: updateId}, {name: "Jerry"})

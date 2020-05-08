const fs = require("fs");

// for JSON files
// const db = require("./ToDo List.json");
// console.log(db);

const [, , action, title, date] = process.argv;
const filePath = "./ToDo List.json";

const addNote = ({ title, date }) => {
  //Read current db
  const dbString = fs.readFileSync(filePath, "utf8") || "[]";
  const db = JSON.parse(dbString);
  //Push data
  db.push({ id: Date.now(), title, date });
  //Save data into file
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf8");
};

const listNotes = () => {
  console.log(fs.readFileSync(filePath, "utf8"));
};
switch (action) {
  case "add":
    addNote({ title: process.argv[3], date: process.argv[4] });
    break;
  case "list":
    listNotes();
    break;
  default:
    throw new Error("Not Implemented!");
    break;
}

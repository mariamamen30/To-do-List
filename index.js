const { program } = require("commander");
program.version("0.0.1");
const fs = require("fs");
const filePath = "./ToDo List.json";

program
  .option("-t, --title <title>", "adding a new note")
  .option("-i, --id <id>", "Edit the title using the id");

program
  .command("list")
  .description("Listing your to-do list")
  .action(function() {
    console.log(fs.readFileSync(filePath, "utf8"));
  });

program
  .command("delete")
  .arguments("<id>", "NoteId")
  .description("delete a note using noteId")
  .action(function(id) {
    let db = JSON.parse(fs.readFileSync(filePath, "utf8"));
    id = +id;
    db = db.filter(note => note.id != id);
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf8");
    console.log("Note Deleted");
  });

program.parse(process.argv);
if (program.title && program.id) {
  let db = JSON.parse(fs.readFileSync(filePath, "utf8"));
  db[+program.id - 1].title = program.title;
  // //Save data into file
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf8");
  console.log("Note was edited successfully");
}
if (program.title && !program.id) {
  let db = JSON.parse(fs.readFileSync(filePath, "utf8"));
  db.push({ id: db.length + 1, title: program.title });
  //Save data into file
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf8");
  console.log("Note Added");
}

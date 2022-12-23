
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if (text === 'hello\n' || text.split(" ")[0] === "hello") {
    hello(text);
  }
  else if (text === 'help\n') {
    help();
  }
  else if (text === 'list\n') {
    list();
  }
  else if (text.startsWith('add')) {
    add(text);
  }
  else if (text.startsWith('edit')) {
    edit(text);
  }
  else if (text.startsWith('remove')) {
    removeTask(text)
  }
  else {
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}
/**
 * List all the possible commands
 *
 * @returns {void}
 */
function help() {
  let helplist = "quit or exit for quit the application \nhello for saying hello!\nhello word for saying hello word!(you can use any word you want with hello)  \nhelp for listing all commands \nadd for add new task \nremove to remove the last task \nremove number to remove specific number";
  console.log(helplist)
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  if (text === "hello\n") {
    console.log("hello!");
    return
  }
  text = text.replace('\n', '').trim();
  const typed = text.split(' ');
  if (typed[0] === "hello") {
    const word = typed.slice(1).join(" ");
    console.log(`hello ${word}!`);
  }
}
let tasksList = ["task 1", "task 2"]

function list() {
  tasksList.forEach((element, index) => {
    console.log(`${index + 1} - [ ] ${element}`)
  })
}
function add(arg) {
  arg = arg.trim().split(" ");
  const b = arg.slice(1).join(" ")
  if (b === undefined) {
    console.log("please enter a valid task")
  }
  else {
    tasksList.push(b);
    console.log("Your task has added succesfully");
  }
}
function removeTask(text) {
  if (text === "remove\n") {
    tasksList.pop();
    return
  }
  text = text.replace('\n', '').trim();
  const removed = text.split(' ');
  if (removed[0] === 'remove') {
    const a = removed.slice(1).join(' ');

    if (a > tasksList.length) {
      console.log("This number does not exist");
    } else {
      tasksList.splice(`${a[0] - 1}`, 1);
    }
  }

}

function edit (text) {
if (text === "edit\n") {
  console.log("Error: You didn't specify what you need to edit");
}
text = text.replace('\n', '').trim();
const edited = text.split(' ');
if (edited[0] === 'edit') {
  const a = edited.slice(1).join(' ');
  if (a[0] > tasksList.length) {
    console.log("You enter a number does not exist")
  } else if (typeof Number(a[0]) === "number" && a[1] === " ") {
    tasksList.splice(`${a[0] - 1}`, 1, a.slice(2));
  } else if (typeof a[0] === "string") {
    tasksList.splice(-1, 1, a)
  }
}

}
/**
 * Exits the application
 *
 * @returns {void}
 */

function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Abdel Rahman Assoum")

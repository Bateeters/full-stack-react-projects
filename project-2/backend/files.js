import { writeFileSync, readFileSync } from 'node:fs'

/* Create simple array for users */
const users = [
  {
    name: 'Adam Ondra',
    email: 'adam.ondra@climb.ing',
  },
]

/* We need to convert it to a string before we can save it */
const usersJson = JSON.stringify(users)

/* Now we can save our JSON string to a file with writeFileSync */
/* this takes 2 arguments, the filename (does NOT need to currently be created), then the string being written to the file */
writeFileSync('backend/users.json', usersJson)

/* After writing to the file, we can then read it using readFileSync. But we DO need to parse it before that!*/
const readUsersJson = readFileSync('backend/users.json')
const readUsers = JSON.parse(readUsersJson)

/* Now we can console log it to read */
console.log(readUsers)

/* Let's run "node backend/files.js" in the console to test it */

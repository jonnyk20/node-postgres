const input = process.argv[2];
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const test = '*';
console.log('searching...');
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE last_name="+"'"+input+"'", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name ${input}:`)
    for (const entry of result.rows) {
      // find out how to acccess index in for/of loop to add numerator
      console.log(`- ${entry.first_name}  ${entry.last_name}, born ${entry.birthdate}`)
    }

    client.end();
  });
});










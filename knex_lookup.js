var pg = require('knex')({
  client: 'pg',
  connection: require("./settings"),
  searchPath: 'knex,public'
});

const out =
pg.select('*').from('famous_people')
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  console.log(rows);
  pg.destroy(function(){console.log("connection closed.")})
});

// pg.insert({id: 4, first_name: 'John', first_name: 'Doe', birthdate: '1709-02-12'}).into('famous_people').return({inserted: true});


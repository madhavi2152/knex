const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "Amma@234",
    database: "ipl",
  },
});

module.exports = knex;

/*
knex
  .select("*")
  .from("deliveries")
  .then((rows) => {
    console.log(rows);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy(); // Close the database connection
  });
*/

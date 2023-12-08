const knex = require("/home/madvi/Documents/knex/index.js");
const fs = require("fs");

Promise.resolve(
  knex("match")
    .select("season", "winner")
    .count("season as count")
    .groupBy("winner", "season")
    .then((data) => data)
    .catch((err) => console.error(err))
)
  .then((data) => {
    fs.writeFile(
      "/home/madvi/Documents/knex/outputs/problem2.json",
      JSON.stringify(data),
      //utf - 8,
      (err) => console.error(err)
    );
  })
  .catch((err) => console.error(err));

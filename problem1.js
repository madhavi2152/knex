const knex = require("/home/madvi/Documents/knex/index.js");
const fs = require("fs");
Promise.resolve(
  knex("match")
    .select("season")
    .count("* as count")
    .groupBy("season")
    .orderBy("season", "asc")
    .then((data) => data)
    .catch((err) => console.log(error))
)
  .then((data) => {
    fs.writeFile(
      "/home/madvi/Documents/knex/outputs/problem1.json",
      JSON.stringify(data),
      //utf - 8,
      (err) => console.error(err)
    );
  })
  .catch((err) => console.error(err));

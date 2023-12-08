const knex = require("/home/madvi/Documents/knex/index.js");
const fs = require("fs");

Promise.resolve(
  knex("match")
    .select("winner")
    .where("winner", knex.raw("??", ["toss_winner"]))
    .count("* as count")
    .groupBy("winner")
    .then((data) => data)
    .catch((err) => console.error(err))
)
  .then((data) => {
    fs.writeFile(
      "/home/madvi/Documents/knex/outputs/problem5.json",
      JSON.stringify(data),
      //utf - 8,
      (err) => console.error(err)
    );
  })
  .catch((err) => console.error(err));

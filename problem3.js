const knex = require("/home/madvi/Documents/knex/index.js");
const fs = require("fs");
Promise.resolve(
  knex
    .select("deliveries.batting_team")
    .from("deliveries")
    .innerJoin("match", "id", "=", "match_id")
    .where("match.season", "=", "2016")
    .sum("extra_runs as runs")
    .groupBy("batting_team")
    .then((data) => data)
    .catch((err) => console.error(err))
)
  .then((data) => {
    fs.writeFile(
      "/home/madvi/Documents/knex/outputs/problem3.json",
      JSON.stringify(data),
      //utf - 8,
      (err) => console.error(err)
    );
  })
  .catch((err) => console.error(err));

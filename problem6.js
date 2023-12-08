const knex = require("/home/madvi/Documents/knex/index.js");
const fs = require("fs");

Promise.resolve(
  knex
    .with("table1", (db) => {
      db.select("season", "player_of_match")
        .count("player_of_match as countp")

        .from("match")
        .groupBy("season", "player_of_match");
    })
    .with("table2", (db) => {
      db.select("season").max("countp as max").from("table1").groupBy("season");
    })
    .select("table1.season", "table1.player_of_match", "table2.max")
    .from("table1")
    .join("table2", (fun) => {
      fun
        .on("table1.season", "=", "table2.season")
        .andOn("table1.countp", "=", "table2.max");
    })
    .then((data) => data)
    .catch((err) => console.error(err))
)
  .then((data) => {
    fs.writeFile(
      "/home/madvi/Documents/knex/outputs/problem6.json",
      JSON.stringify(data),
      //utf - 8,
      (err) => console.error(err)
    );
  })
  .catch((err) => console.error(err));

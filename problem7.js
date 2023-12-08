const knex = require("/home/madvi/Documents/knex/index.js");
const fs = require("fs");

Promise.resolve(
  knex
    .with("table2", (cb) => {
      cb.select("id", "season").from("match");
    })
    .with("table1", (cb) => {
      cb.select(
        "batsman",
        "season",
        knex.raw("sum(total_runs) as runs"),
        knex.raw(
          "sum(case when wide_runs=0 and noball_runs=0 then 1 else 0 end) as balls"
        )
      )
        .from("deliveries")
        .join("table2", "match_id", "=", "id")
        .groupBy("season", "batsman");
    })
    .select("season", "batsman", knex.raw("((runs*100)/balls) as strike_rate"))
    .from("table1")
    // .groupBy("table2.season", "batsman", "strike_rate")
    .then((data) => data)
    .catch((err) => console.error(err))
)
  .then((data) => {
    fs.writeFile(
      "/home/madvi/Documents/knex/outputs/problem7.json",
      JSON.stringify(data),
      //utf - 8,
      (err) => console.error(err)
    );
  })
  .catch((err) => console.error(err));

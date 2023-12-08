const knex = require("/home/madvi/Documents/knex/index.js");
const fs = require("fs");

Promise.resolve(
  knex
    .with("table1", (cb) => {
      cb.select(
        "id",
        "season",
        "bowler",
        knex.raw(
          `sum(total_runs) as runs,sum(case when wide_runs=0 and noball_runs=0 then 1 else 0 end) as balls `
        )
      )
        .from("match")
        .join("deliveries", "id", "=", "match_id")
        .where("match.season", "=", "2015")
        .groupBy("id", "season", "bowler");
    })
    .select("bowler", knex.raw(`(sum(runs/(balls/6))) as economy`))
    .from("table1")
    .groupBy("bowler")
    .orderBy("economy", "asc")
    .limit("10")
    .then((data) => data)
    .catch((err) => console.error(err))
)
  .then((data) => {
    fs.writeFile(
      "/home/madvi/Documents/knex/outputs/problem4.json",
      JSON.stringify(data),
      //utf - 8,
      (err) => console.error(err)
    );
  })
  .catch((err) => console.error(err));

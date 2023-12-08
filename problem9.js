const knex = require("/home/madvi/Documents/knex/index.js");
const fs = require("fs");
Promise.resolve(
  knex
    .with("table1", (cb) => {
      cb.select(
        "bowler",
        "total_runs",
        "noball_runs",
        "wide_runs",
        "is_super_over"
      )
        .from("deliveries")
        .having("is_super_over", "=", "1");
    })
    .select(
      "bowler",
      knex.raw(
        `(sum(total_runs)) /(sum( case when noball_runs=0 and wide_runs=0 then 1 else 0 end)) as economy`
      )
    )
    .from("table1")
    .groupBy("bowler")
    .orderBy("economy", "asc")
    .limit("1")
    .then((data) => data)
    .catch((err) => console.log(err))
)
  .then((data) => {
    fs.writeFile(
      "/home/madvi/Documents/knex/outputs/problem9.json",
      JSON.stringify(data),
      //utf - 8,
      (err) => console.error(err)
    );
  })
  .catch((err) => console.error(err));

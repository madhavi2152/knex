const knex = require("/home/madvi/Documents/knex/index.js");
const fs = require("fs");

Promise.resolve(
  knex
    .with("table1", (cb) => {
      cb.select(
        "batsman",
        knex.raw(
          `case when dismissal_kind like "run out" then fielder else bowler end as taker`
        )
      )
        .from("deliveries")
        .where(
          knex.raw(
            `dismissal_kind not like "retired hurt" and dismissal_kind not like ""`
          )
        );
    })
    .select("batsman", "taker")
    .from("table1")
    .groupBy("batsman", "taker")
    .orderBy(knex.raw(`count(taker)`), "desc")
    .limit("1")
    .then((data) => data)
    .catch((err) => console.log(err))
)
  .then((data) => {
    fs.writeFile(
      "/home/madvi/Documents/knex/outputs/problem8.json",
      JSON.stringify(data),
      //utf - 8,
      (err) => console.error(err)
    );
  })
  .catch((err) => console.error(err));

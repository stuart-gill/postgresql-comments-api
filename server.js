let express = require("express");
let { json, urlencoded } = require("body-parser");
let morgan = require("morgan");
const PORT = 3000;
let pg = require("pg");

let pool = new pg.Pool({
  port: 5432,
  password: "Utterance5",
  database: "comments",
  host: "localhost",
  user: "postgres",
  max: 10
});

let app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/new-comment", function(request, response) {
  var first_name = request.body.first_name;
  var comment = request.body.comment;

  //bundle into reusable helper function?
  pool.connect((err, db, done) => {
    if (err) {
      return console.log(err);
    } else {
      db.query(
        "INSERT INTO comments (first_name, comment) VALUES($1, $2)",
        [first_name, comment],
        (err, table) => {
          if (err) {
            return console.log(err);
          } else {
            console.log("DATA INSERTED");
            db.end();
          }
        }
      );
    }
  });
});

app.listen(PORT, () => console.log("listening on port" + PORT));

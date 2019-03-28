let express = require("express");
let { json, urlencoded } = require("body-parser");
let morgan = require("morgan");
const PORT = 3000;
let pg = require("pg");
let cors = require("cors");

let pool = new pg.Pool({
  port: 5432,
  password: "Utterance5",
  database: "comments",
  host: "localhost",
  user: "postgres",
  max: 10
});

let app = express();
app.use(cors());

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

app.delete("/api/remove/:id", function(request, response) {
  var id = request.params.id;
  pool.connect(function(err, db, done) {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("DELETE FROM comments WHERE id = $1", [id], (err, result) => {
        if (err) {
          return response.status(400).send(err);
        } else {
          return response
            .status(200)
            .send({ message: "successfully deleted record" });
        }
      });
    }
  });
});

app.get("/api/comments", function(request, response) {
  pool.connect(function(err, db, done) {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("SELECT * FROM comments", function(err, table) {
        done();
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  });
});

app.post("/api/new-comment", function(request, response) {
  var first_name = request.body.first_name;
  var comment = request.body.comment;
  var id = request.body.id;

  //bundle into reusable helper function?
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "INSERT INTO comments (first_name, comment, id) VALUES($1, $2, $3)",
        [first_name, comment, id],
        (err, table) => {
          if (err) {
            return response.status(400).send(err);
          } else {
            console.log("DATA INSERTED");
            response.status(201).send({ message: "Data inserted" });
          }
        }
      );
    }
  });
});

app.listen(PORT, () => console.log("listening on port" + PORT));

// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API date YYYY-MM-DD date to JSON
app.get("/api/:year-:month-:day", function (req, res) {
  const year = req.params["year"];
  const month = req.params["month"];
  const day = req.params["day"];
  const date = new Date(year+"-"+month+"-"+day);
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  });
});

// API date Unix time to JSON
app.get("/api/:time", function (req, res) {
  const time = parseInt(req.params["time"]);
  const date = new Date(time);
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

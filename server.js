var express = require("express");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();

let searchIndex = 0;
const result = [];
const keywords = [
  "medical",
  "imaging",
  "diagnostic",
  "ovidius",
  "mental",
  "health",
  "medical technologies",
  "medicines"
];
// var keywords = ["medical imaging", "diagnostic", "ovidius", "mental health", "medical technologies"]

function getContentByKeywords(string) {
  const tempObj = {
    content: "",
    keywords: []
  }; // content: string; keywords: array
  tempObj.content = string;
  for (let idx = 0; idx < keywords.length; idx++) {
    const regex = new RegExp(keywords[idx], "gi");
    const frequency = (string.match(regex) || []).length;
    if (frequency > 0) {
      const obj = {};
      obj[keywords[idx]] = frequency;
      tempObj.keywords.push(obj);
    }
  }

  if (tempObj.keywords.length > 0) {
    result.push(tempObj);
  }
}

app.get("/scrape", function(req, res) {
  url = "http://www.ema.europa.eu/ema/";

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      // FETCH HEADING
      $(".hp-highlight-box").filter(function() {
        var data1 = $(this);
        getContentByKeywords(
          data1
            .find("h2")
            .text()
            .trim()
        );

        getContentByKeywords(
          data1
            .find("p")
            .text()
            .trim()
        );
      });
      // FETCH HEADING ENDS

      // FETCH MAIN CONTENT
      $(".news-tabs span div ul li").filter(function() {
        var data = $(this);
        // console.log('000', data)
        getContentByKeywords(
          data
            .find(".h4")
            .text()
            .trim()
        );
        getContentByKeywords(
          data
            .find(".content")
            .text()
            .trim()
        );
      });
      // FETCH MAIN CONTENT ENDS

      // FETCH SIDE BAR
      var test = $(".hp-side-col span").first();
      $(test)
        .find("li")
        .filter(function() {
          var data2 = $(this);
          getContentByKeywords(data2.text().trim());
        });
      // FETCH SIDE BAR ENDS
    } else {
      console.log('error',error)
    }

    console.log("result", JSON.stringify(result));
    res.send("Check your console!");
  });
});

app.listen("8081");
console.log("Magic happens on port 8081");
exports = module.exports = app;

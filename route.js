import express from "express";
import request from "request";
import cheerio from "cheerio";

const router = express.Router();

const result = [];
const keywords = [
  "medical",
  "imaging",
  "diagnostic",
  "ovidius",
  "mental",
  "health",
  "medical technologies",
  "medicines",
  "are",
  "is"
];

// const keywords = ["medical imaging", "diagnostic", "ovidius", "mental health", "medical technologies"]

router.get("/", function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

router.get("/scrape", function(req, res) {
  const url = "http://www.ema.europa.eu/ema/";

  request(url, function(error, response, html) {
    if (!error) {
      const $ = cheerio.load(html);
      // FETCH HEADING
      $(".hp-highlight-box").filter(function() {
        const DOMContent = $(this);
        getContentByKeywords(
          DOMContent.find("h2")
            .text()
            .trim()
        );
        getContentByKeywords(
          DOMContent.find("p")
            .text()
            .trim()
        );
      });
      // FETCH HEADING ENDS

      // FETCH MAIN CONTENT
      $(".news-tabs span div ul li").filter(function() {
        const DOMContent = $(this);
        getContentByKeywords(
          DOMContent.find(".h4")
            .text()
            .trim()
        );

        getContentByKeywords(
          DOMContent.find(".content")
            .text()
            .trim()
        );
      });
      // FETCH MAIN CONTENT ENDS

      // FETCH SIDE BAR
      const DOM = $(".hp-side-col span").first();
      $(DOM)
        .find("li")
        .filter(function() {
          const DOMContent = $(this);
          getContentByKeywords(DOMContent.text().trim());
        });
      // FETCH SIDE BAR ENDS
    } else {
      console.log("error", error);
    }
    res.send({ data: result });
  });
});

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
      obj.key = [keywords[idx]];
      obj.frequency = frequency;
      tempObj.keywords.push(obj);
    }
  }

  if (tempObj.keywords.length > 0) {
    result.push(tempObj);
  }
}

router.get("*", function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

module.exports = router;

// const scrapeNews = require("../scripts/scrape.js")
const request = require('request');
const cheerio = require('cheerio');

const fetch = {
    scrapeNews: function() {
        return new Promise((resolve, reject) => {
            request("https://www.nytimes.com", (err, response, html) => {
                if (err) reject(new Error(`Something went wrong with the scrape. Error: ${err}`));

                const $ = cheerio.load(html);
                // Make an empty array for saving our scraped info
                const results = [];
                $("article").each((i, element) => {
                    const link = $(element).children("h2.story-heading").children("a").attr("href");
                    const title = $(element).children("h2.story-heading").children("a").text();
                    const shortSum = $(element).children("p.summary").text();

                    if (link && title && shortSum) {
                        results.push({ title: title, link: link, shortSum: shortSum });
                    }
                });
                resolve(results);
            });
        });
    }
};

module.exports = fetch;
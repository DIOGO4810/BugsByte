const puppeteer = require('puppeteer');


const url = "https://cryptoslate.com/featured-news/";

const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const allArticles = await page.evaluate(() => {
        const articles = document.querySelectorAll('article');
        return Array.from(articles).slice(0,).map((article) => {
            const title = article.querySelector('h2').innerText;
            return title;
        });
    });
    console.log(allArticles); 
}

main();
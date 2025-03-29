const axios = require('axios');
const cheerio = require('cheerio');

const API_KEY = 'e5c44644d7f31607fd01f742c07f6c62'; // Replace with your API key
const TARGET_URL = 'https://cryptoslate.com/'; // Replace with the site you want to scrape

async function scrapeText() {
    try {
        const response = await axios.get(`https://api.scraperapi.com?api_key=${API_KEY}&url=${encodeURIComponent(TARGET_URL)}`);
        const html = response.data;
        
        // Use Cheerio to parse the HTML
        const $ = cheerio.load(html);
        
        // Extract specific data, like the page title and a paragraph
        const pageTitle = $('title').text(); // Extract title
        const firstParagraph = $('h2').second().text(); // Extract first paragraph text
        
        // Log the extracted data
        console.log('Page Title:', pageTitle);
        console.log('First Paragraph:', firstParagraph);
    } catch (error) {
        console.error('Error scraping:', error);
    }
}

scrapeText();
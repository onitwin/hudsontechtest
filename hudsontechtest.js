const puppeteer = require('puppeteer');
const jsonfile = require("jsonfile");

async function obtainData(url) {
  const browser = await puppeteer.launch();//launch browser
  const page = await browser.newPage();//get new page within browser
  await page.goto(url);//load url on new page

  const list = await page.evaluate(() => {
    const data = []; //empty array for inputting formatted data

    const stock = document.querySelectorAll(".product-tile") //get all divs class name of ".product-tile" and attaches array to 'list' class

    for (const item of stock) { //check each item matching 'product-tile' and loop through for requested data and return object
      data.push({
        "product": item.querySelector(".product-name").innerHTML,
        "metadata": {
          "image_url": item.querySelector("img").src,
          "quantity": parseInt(item.querySelector(".details p").innerHTML.slice(10)),
          "price": parseFloat(item.querySelector('p:nth-child(2)').innerHTML.slice(8))
        }
      })
    }
    return data;
  })
  browser.close() //close browser window/end session
  jsonfile.writeFile("data.json", list) //export to/create and export 'list'
}

obtainData('https://dev-test.hudsonstaging.co.uk/')

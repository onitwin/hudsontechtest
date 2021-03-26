const puppeteer=require('puppeteer');
const jsonfile = require("jsonfile");

async function obtainData(url){
  const browser=await puppeteer.launch();
  const page=await browser.newPage();
  await page.goto(url);

  const list=await page.evaluate(()=>{
    const data=[];

    const list =document.querySelectorAll(".product-tile") //get all divs class name of ".product-tile" and attaches array to 'list' class

      for (const item of list){
        data.push({"product":item.querySelector(".product-name").innerHTML,"metadata":{"image_url":item.querySelector("img").src,
      "quantity":parseInt(item.querySelector(".details p").innerHTML.slice(10)),"price":parseFloat(item.querySelector('p:nth-child(2)').innerHTML.slice(8))}})
      }
      return data;
    })

  console.log(list);


  browser.close()
  jsonfile.writeFile("data.json", list)
}

obtainData('https://dev-test.hudsonstaging.co.uk/')

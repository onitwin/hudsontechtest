const puppeteer=require('puppeteer');

async function obtainData(url){
  const browser=await puppeteer.launch();
  const page=await browser.newPage();
  await page.goto(url);

  const list=await page.evaluate(()=>{
    const data=[];

    const list =document.querySelectorAll(".product-tile")

      for (const item of list){
        data.push({"product":item.querySelector(".product-name").innerHTML,"metadata":{"image_url":item.querySelector("img").src}})
      }
      return data;
    })

  console.log(list);

  browser.close()
}

obtainData('https://dev-test.hudsonstaging.co.uk/')

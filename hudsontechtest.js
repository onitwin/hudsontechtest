const puppeteer=require('puppeteer');

async function obtainData(url){
  const browser=await puppeteer.launch();
  const page=await browser.newPage();
  await page.goto(url);

  const list=await page.evaluate(()=>{
    const data=[];

    const list =document.querySelectorAll(".product-tile")
    for (const item of list){
      data.push({"product":item.querySelector(".product-name").innerHTML})
    }
    return data;
  })
  console.log(list);

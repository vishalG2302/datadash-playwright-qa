const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [27,28,29,30,31,32,33,34,35,36];

  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseFloat(cell.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a+b, 0);
    grandTotal += sum;

    console.log(`Seed ${seed} sum: ${sum}`);
  }

  console.log("===================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("===================================");

  await browser.close();
})();
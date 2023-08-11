const express = require('express');
const app = express();
const axios = require('axios');

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    const promises = urls.map(async (url) => {
      try {
        const r = await axios.get(url);
        return r.data.numbers;
      }catch (err) {
        console.log("Error in fetching data from the url");
        return [];
      }
    });
    try {
        const results = await Promise.all(promises);
        const numSet = new Set();
        results.forEach((numbers) => {
        numbers.forEach((num) => {
            numSet.add(num);
        });
    });
    const finalNums= Array.from(numSet).sort((a, b) => a - b);
    res.json({
        numbers: finalNums,
    });
    }catch (err){
      console.log("Error in processing the data");
      res.status(500).json({ error:"Error occured"});
    }
  });
  
app.listen(5000,()=>{
    console.log("Server is running");
});
  
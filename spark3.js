const axios = require('axios');


for (let j = 0; j < process.argv.length; j++) {
   console.log(j + ' -> ' + (process.argv[j]));
}

var item1 = parseInt(process.argv[2]);
let item2 = parseInt(process.argv[3]);
let item3 = parseInt(process.argv[4]);
let item4 = parseInt(process.argv[5]);
let item5 = parseInt(process.argv[6]);
console.log("Item5: " + item5);

let data = JSON.stringify({
   "request_data": {
      "inputs": {
         "ADJUST": item5,
         "ITEM1": item1,
         "ITEM4": item4,
         "ITEM2": item2,
         "ITEM3": item3
      }
   },
   "request_meta": {
      "version_id": "d131e57f-ed64-4481-983b-1bd79ec041ae",
      "transaction_date": null,
      "call_purpose": null,
      "source_system": null,
      "correlation_id": null,
      "service_category": "",
      "requested_output": null
   }
});

let config = {
   method: 'post',
   maxBodyLength: Infinity,
   url: 'https://excel.uat.us.coherent.global/flowx-us/api/v3/folders/Invoice/services/Invoice/execute',
   headers: { 
      'Content-Type': 'application/json', 
      'x-tenant-name': 'flowx-us', 
      'x-synthetic-key': '62f9136e-57c4-44de-a64c-045c82eae240',
      'Content-Length': '289',
   },
   maxRedirects: 0,
   data : data
};

/*
axios.request(config)
.then((response) => {
   console.log(JSON.stringify(response.data));
})
.catch((error) => {
   console.log(error);
});
*/

console.log("Call Spark Response");

// const res = await axios.get('https://httpbin.org/get?answer=42');
// res.data.args; // { answer: 42 }

const sparkResponse = async () => {
   try {
     const res = await axios.request(config);
     console.log("Data: " + JSON.stringify(res.data))
     return JSON.stringify(res.data);
   } catch (err) {
     console.error(err)
   }
}

const callSpark = async () => {
   const result = await sparkResponse();
   return result;
 }

 (async () => {
   console.log("Async Call Spark: " + callSpark());
 })()

// console.log("spark: " + JSON.stringify(callSpark().data));
console.log("End");
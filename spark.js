const axios = require('axios');
let data = JSON.stringify({
   "request_data": {
      "inputs": {
         "ADJUST": -100,
         "ITEM1": 200,
         "ITEM4": 0,
         "ITEM2": 400,
         "ITEM3": 0
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
      'x-synthetic-key': '62f9136e-57c4-44de-a64c-045c82eae240'
   },
   maxRedirects: 0,
   data : data
};

axios.request(config)
.then((response) => {
   console.log(JSON.stringify(response.data));
})
.catch((error) => {
   console.log(error);
});

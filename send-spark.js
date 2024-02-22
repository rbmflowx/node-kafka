const { Kafka } = require('kafkajs')
const { Partitioners } = require('kafkajs')

console.log("Define Spark Request");
// Call Spark
const axios = require('axios');
let data = JSON.stringify({
   "request_data": {
      "inputs": {
         "ADJUST": -200,
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
      'x-synthetic-key': '62f9136e-57c4-44de-a64c-045c82eae240',
      'Content-Length': '289',
   },
   maxRedirects: 0,
   data : data
};

console.log("Call Spark Axios");

const sparkResponse = async () => {
   try {
      const res = await axios.request(config);
      console.log("sparkResponse: " + JSON.stringify(res.data));
      console.log(res.data);
      } catch (error) {
         console.log(error);
      }
};

sparkResponse();

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka-service:9092'],
})

console.log("producer");
(async function producer() {
    const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })

    await producer.connect()
    await producer.send({
    topic: 'test-topic',
    messages: [
        { value: '{"status":"Success","response_data":{"outputs":{"TOTAL":[400,null]},"warnings":null,"errors":null,"service_chain":null},"response_meta":{"service_id":"4a0dcf08-9ff5-4a79-b2fa-b09694c1f093","version_id":"d131e57f-ed64-4481-983b-1bd79ec041ae","version":"0.2.0","process_time":1,"call_id":"1039eb9d-d23d-439e-864a-1463aae2ca78","compiler_type":"Neuron","compiler_version":"1.14.0","source_hash":null,"engine_id":"194ED0ED7FA8E371292D8CA8A09CD35C","correlation_id":"","parameterset_version_id":null,"system":"SPARK","request_timestamp":"2024-02-21T21:16:13.506Z"},"error":null}' },
/*
         (async () => {
            { value: sparkResponse()}
         })()  
*/
    ],
    })
    console.log("producer: sent");

    await producer.disconnect()
})()

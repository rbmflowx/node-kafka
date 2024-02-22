const { Kafka } = require('kafkajs')
const { Partitioners } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka-service:9092'],
})

console.log("producer");
// let producer = async () => {
(async function producer() {
    //const producer = kafka.producer()
    const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })

    console.log("producer2");
    await producer.connect()
    await producer.send({
    topic: 'test-topic',
    messages: [
        { value: 'Hello KafkaJS user!' },
    ],
    })
    console.log("producer: sent");

    await producer.disconnect()
})()
//}

console.log("consumer");
// let consumer = async () => {
(async function consumer() {
//    const consumer = kafka.consumer({ groupId: 'test-group' })
const consumer = kafka.consumer({ 
    createPartitioner: Partitioners.LegacyPartitioner,
    groupId: 'test-group'
})

    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
        value: message.value.toString(),
        })
    },
    })
//}
})()
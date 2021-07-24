import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto'
import { JsxEmit } from 'typescript';
console.clear();

const stan= nats.connect('ticketing', randomBytes(4).toString('hex') ,{
    url: 'http://localhost:4222'
});

stan.on('connect',()=>{
    console.log("listen")
    const options=stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('listner-service')
    const subscription=stan.subscribe("ticket-created","order-queueGroup",options)
    
subscription.on('message',(msg: Message)=>{
    console.log(`${msg.getSequence()} ${msg.getData()}`)
    msg.ack()
})
})
stan.on('close',()=>{
    console.log("Closed")
    process.exit()
})
process.on('SIGINT',()=> stan.close())
process.on('SIGTERM',()=> stan.close())
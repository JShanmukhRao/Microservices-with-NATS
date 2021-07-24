import nats from 'node-nats-streaming';
console.clear();
const stan= nats.connect('ticketing', 'abc',{
    url: 'http://localhost:4222'
});

stan.on('connect',()=>{
    console.log("publish");
    const data=JSON.stringify({
        price:"20",
        item:"shirt"
    });
    stan.publish('ticket-created',data,()=>{
        console.log("Data Send")
    });
});

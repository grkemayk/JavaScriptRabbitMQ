
//1.Adım = npm init -y (package.json dosyasi olusturur.)
//2.Adım = npm install --save amqplib (amqp kurulumu yapar.)
//3.Adım asagida ki gibi devam eder.
const amqp = require("amqplib");

const queueName = process.argv[2];

connect_rabbitmq();


async function connect_rabbitmq()
{
    try
    {
        const connection = await amqp.connect("amqp://localhost:5672");//Port numarası default olarak bu sekildedir.
        const channel = await connection.createChannel();//Veri akisi saglanacak kanal acilir
        const assertion = await channel.assertQueue(queueName);//Queue ismi belirlenir
    
        //Mesajin okunmasi
        channel.consume(queueName, message =>{

            console.log("Okunan Mesaj", message.content.toString())//Gelen mesaj Binary formda gelir. YAzilan yöntem ile string ifadeye dönüstürülür.
            channel.ack(message)
        })
    
    }
    catch(error)
    {
        console.log("Error", error)
    }
    
}

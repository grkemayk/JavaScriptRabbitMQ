
//1.Adım = npm init -y (package.json dosyasi olusturur.)
//2.Adım = npm install --save amqplib (amqp kurulumu yapar.)
//3.Adım asagida ki gibi devam eder.
const amqp = require("amqplib");

const message = {
    description: "Bu bir test mesajıdır."
}

const queueName = process.argv[2];

connect_rabbitmq();

async function connect_rabbitmq()
{
    try
    {
        const connection = await amqp.connect("amqp://localhost:5672");//Port numarası default olarak bu sekildedir.
        const channel = await connection.createChannel();//Veri akisi saglanacak kanal acilir
        const assertion = await channel.assertQueue(queueName);//Queue ismi belirlenir
    

        //Mesajin Gönderilmesi
        setInterval(() =>
        {
            message.description = new Date().getTime();
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
            console.log("Gonderilen Mesaj", message)
        }, 1)
        
    
    }
    catch(error)
    {
        console.log("Error", error)
    }
    
}

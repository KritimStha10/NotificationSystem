import amqp from 'amqplib';

async function consumeMessages() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue('notifications');

    channel.consume('notifications', async (msg) => {
        if (msg) {
            const notification = JSON.parse(msg.content.toString());

            console.log(`Processing notification: ${notification.message}`);

            updateNotification(notification.id, 'processed');
            channel.ack(msg);
        }
    });
}

async function updateNotification(id: number, status: string) {
    console.log(`Updating notification ${id} status to ${status}`);
}

consumeMessages();

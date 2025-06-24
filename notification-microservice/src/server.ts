import Fastify from 'fastify';
import fetch from 'node-fetch';
const app = Fastify();

app.get('/notifications/recent', async () => {
  return (await fetch('http://laravel/api/notifications/recent')).json();
});
app.get('/notifications/summary', async () => {
  return (await fetch('http://laravel/api/notifications/summary')).json();
});
app.get('/', async () => {
  return { message: 'Notification microservice running' };
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(` Server is running at ${address}`);
});


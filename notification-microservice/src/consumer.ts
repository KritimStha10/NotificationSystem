import Redis from 'ioredis';
const redis = new Redis();
redis.subscribe('notifications');
redis.on('message', async (_, msg) => {
  const n = JSON.parse(msg);
  console.log('🔔 sending', n);
  let attempts = n.attempts;
  try {
    await console.log(`Sent notification #${n.id}`);
    await fetch(`http://laravel/api/notifications/${n.id}/mark-sent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        });

  } catch (e) {
    attempts++;
    await fetch(`http://laravel/api/notifications/${n.id}/increment-attempts`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    });

    if (attempts < 5) {
      setTimeout(() => redis.publish('notifications', JSON.stringify({ ...n, attempts })), Math.pow(2, attempts) * 1000);
    }
  }
});

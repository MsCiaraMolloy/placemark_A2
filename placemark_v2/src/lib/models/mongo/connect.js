import mongoose from 'mongoose';

let connected = false;

export async function connectMongo() {
  if (connected) return;
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.DATABASE_URL);
  connected = true;
  const db = mongoose.connection;
  db.on('error', (err) => console.error('DB error:', err));
  db.on('disconnected', () => console.log('DB disconnected'));
  db.once('open', function () {
    console.log(`DB connected to ${this.name} on ${this.host}`);
  });
}

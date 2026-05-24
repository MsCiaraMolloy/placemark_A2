import mongoose from 'mongoose';
import { u as userStore } from './user-store-BIsLnfE1.js';
import { v as verifyToken } from './auth-BKYE8tjw.js';
import 'dotenv/config';
import 'jsonwebtoken';

let connected = false;
async function connectMongo() {
  if (connected) return;
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.DATABASE_URL);
  connected = true;
  const db = mongoose.connection;
  db.on("error", (err) => console.error("DB error:", err));
  db.on("disconnected", () => console.log("DB disconnected"));
  db.once("open", function() {
    console.log(`DB connected to ${this.name} on ${this.host}`);
  });
}
await connectMongo();
async function handle({ event, resolve }) {
  const token = event.cookies.get("session");
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      const user = await userStore.getUserById(decoded.id);
      if (user) event.locals.user = user;
    }
  }
  return resolve(event);
}

export { handle };
//# sourceMappingURL=hooks.server-MKJsBVOr.js.map

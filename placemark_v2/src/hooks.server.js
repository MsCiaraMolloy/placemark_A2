import { connectMongo } from '$lib/models/mongo/connect.js';
import { userStore } from '$lib/models/mongo/user-store.js';
import { verifyToken } from '$lib/services/auth.js';
import 'dotenv/config';

await connectMongo();

export async function handle({ event, resolve }) {
  const token = event.cookies.get('session');
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      const user = await userStore.getUserById(decoded.id);
      if (user) event.locals.user = user;
    }
  }
  return resolve(event);
}

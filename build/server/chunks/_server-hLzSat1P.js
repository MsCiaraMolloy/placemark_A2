import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { u as userStore } from './user-store-BIsLnfE1.js';
import { c as createToken } from './auth-BKYE8tjw.js';
import 'mongoose';
import 'jsonwebtoken';

async function POST({ request }) {
  const { email, password } = await request.json();
  const user = await userStore.getUserByEmail(email);
  if (!user) return json({ error: "User not found" }, { status: 401 });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return json({ error: "Invalid password" }, { status: 401 });
  const token = createToken(user);
  return json({ success: true, token }, { status: 201 });
}

export { POST };
//# sourceMappingURL=_server-hLzSat1P.js.map

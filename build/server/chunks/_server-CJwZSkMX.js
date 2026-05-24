import { json } from '@sveltejs/kit';
import { u as userStore } from './user-store-BIsLnfE1.js';
import { v as verifyToken } from './auth-BKYE8tjw.js';
import 'mongoose';
import 'jsonwebtoken';

function getUser(request) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return verifyToken(auth.slice(7));
}
async function GET({ request, params }) {
  if (!getUser(request)) return json({ error: "Unauthorized" }, { status: 401 });
  const user = await userStore.getUserById(params.id);
  if (!user) return json({ error: "Not found" }, { status: 404 });
  return json(user);
}

export { GET };
//# sourceMappingURL=_server-CJwZSkMX.js.map

import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { userStore } from '$lib/models/mongo/user-store.js';
import { createToken } from '$lib/services/auth.js';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    const user = await userStore.getUserByEmail(email);
    if (!user) return fail(400, { error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return fail(400, { error: 'Invalid email or password' });

    const token = createToken(user);
    cookies.set('session', token, { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
    throw redirect(303, '/dashboard');
  }
};

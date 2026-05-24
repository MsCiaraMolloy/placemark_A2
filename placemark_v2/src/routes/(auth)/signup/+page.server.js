import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { userStore } from '$lib/models/mongo/user-store.js';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');

    if (!firstName || !lastName || !email || !password) {
      return fail(400, { error: 'All fields are required' });
    }

    const existing = await userStore.getUserByEmail(email);
    if (existing) return fail(400, { error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    await userStore.addUser({ firstName, lastName, email, password: hashed });
    throw redirect(303, '/login');
  }
};

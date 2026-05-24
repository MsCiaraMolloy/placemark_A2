import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
  if (!locals.user) throw redirect(303, '/login');
  return {
    user: {
      _id: String(locals.user._id),
      firstName: locals.user.firstName,
      lastName: locals.user.lastName,
      email: locals.user.email,
      isAdmin: locals.user.isAdmin || false
    }
  };
}

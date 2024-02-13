import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import User from '@/models/User';

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'your@email.com',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				const foundUser = await User.findOne({
					email: credentials.email,
				})
					.lean()
					.exec();

				if (foundUser && foundUser.password) {
					const match = await bcrypt.compare(
						credentials.password as string,
						foundUser.password
					);

					if (match) {
						delete foundUser.password;
						return foundUser;
					}
				}
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			session.user.id = token.sub as string;
			return session;
		},
		async jwt({ token, user }) {
			if (user?.id) {
				token.sub = user.id;
			}
			return token;
		},
	},
});

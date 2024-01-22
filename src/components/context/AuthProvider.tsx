'use client';

import React from 'react';

interface User {
	userName: string;
}

interface AuthContextTypes {
	loading: boolean;
	login: (userName: string) => Promise<void | User>;
	logout: () => Promise<string | void>;
	user?: User;
}
interface AuthProviderTypes {
	children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthContextTypes>(
	{} as AuthContextTypes
);

// Auth provider wrapper contains logic for verification of JWT tokens
// the main user and it's login, logout methods and other utility methods
export function AuthProvider({ children }: AuthProviderTypes) {
	const [loading, setLoading] = React.useState(true);

	// verify user's JWT token on refresh of page
	React.useEffect(() => {
		setLoading(true);
		verification();
	}, []);

	// verify token by contacting verify endpoint
	// proceed to then getUser with this decoded userName from token and then populate user with it's retrieved attributes
	async function verification() {
		try {
			// console.log(`${await getLoggedIn()} interesting`);
			//   const responseVerify = await verifyToken();
			//   const user = await getUser(responseVerify);
			//   setUser(user);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	const [user, setUser] = React.useState<User>({} as User);

	return (
		<AuthContext.Provider
			value={{
				loading,
				user,
				login: async (userName) => {
					// 	// log user in, by contacting login endpoint and running verificationPush()
					// 	// in order to verify JWT token obtained
					// 	return await getUser(userName).catch(() => verificationPush());
				},
				logout: async () => {
					// log user out, by contacting logout endpoint and setting main user to empty object
					// return await logoutUser()
					// 	.then(() => setUser({} as User))
					// 	.catch(() => setUser({} as User));
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

'use client';

import TailwindNavbar from '@/components/NavBar';

export default function HomePage() {
	return (
		<>
			<TailwindNavbar />
			<main className="flex min-h-screen flex-col items-center p-24">
				<div>Welcome to our CSCI-4177 project!</div>
			</main>
		</>
	);
}

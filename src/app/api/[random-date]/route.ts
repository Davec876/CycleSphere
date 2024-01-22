async function getDate() {
	const currentDate = Date.now();
	return currentDate;
}

export async function GET() {
	return new Response(JSON.stringify({ date: await getDate() }));
}

export function addCORSHeaders(response: Response) {
	response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
	response.headers.set('Access-Control-Allow-Methods', 'GET');
	response.headers.set('Access-Control-Allow-Headers', 'Authorization');
	return response;
}

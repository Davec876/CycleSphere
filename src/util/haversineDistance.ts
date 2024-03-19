export function calculateTotalDistance(
	prevPoints: { lat: number; lng: number }[],
	newPoint: { lat: number; lng: number }
) {
	if (prevPoints.length === 0) {
		return 0;
	}
	const lastPoint = prevPoints[prevPoints.length - 1];
	const distanceToAdd = haverSineDistance(lastPoint, newPoint);
	return distanceToAdd;
}

// see https://en.wikipedia.org/wiki/Haversine_formula
function haverSineDistance(
	coords1: { lat: number; lng: number },
	coords2: { lat: number; lng: number }
) {
	// earth's radius in km
	const R = 6371;
	// calculate lat and lng diff
	const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180);
	const dLng = (coords2.lng - coords1.lng) * (Math.PI / 180);
	// a is the square of half the chord length between the two points, this is derived from the spherical law of cosines.
	// used to calculate the central angle c
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(coords1.lat * (Math.PI / 180)) *
			Math.cos(coords2.lat * (Math.PI / 180)) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);
	// angular distance in radians between the two points
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	// distance in km
	const distance = R * c;
	return distance;
}

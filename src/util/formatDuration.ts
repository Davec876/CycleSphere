export function formatDuration({
	hours,
	minutes,
	seconds,
}: {
	hours: number;
	minutes: number;
	seconds: number;
}) {
	return `${hours.toLocaleString('en-CA', { minimumIntegerDigits: 2 })}:${minutes.toLocaleString('en-CA', { minimumIntegerDigits: 2 })}:${seconds.toLocaleString('en-CA', { minimumIntegerDigits: 2 })}`;
}

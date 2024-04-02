import { DateTime } from 'luxon';
import { formatDuration } from './formatDuration';

// utility function to get ordinal suffix
function getOrdinal(day: number) {
	if (day > 3 && day < 21) return `${day}th`;
	switch (day % 10) {
		case 1:
			return `${day}st`;
		case 2:
			return `${day}nd`;
		case 3:
			return `${day}rd`;
		default:
			return `${day}th`;
	}
}

export function formatDate(date: Date) {
	const dateTime = DateTime.fromJSDate(date);
	const parsedMonth = dateTime.toFormat('MMMM');
	const parsedDay = getOrdinal(dateTime.day);
	const parsedYear = dateTime.toFormat('yyyy');

	return `${parsedMonth} ${parsedDay}, ${parsedYear}`;
}

export function formatTime(date: Date) {
	const dateTime = DateTime.fromJSDate(date);
	const { hour, minute, second } = dateTime;

	return formatDuration({ hours: hour, minutes: minute, seconds: second });
}

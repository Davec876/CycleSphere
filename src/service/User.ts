'use server';

import User from '@/models/User';

// This method currently only projects the name and tracking status, if additonal field are required add them to the projection list.
// it is best however, if we don't expose the hashed password here, as that is a property of the user model
export async function getUser(id: string) {
	return await User.findOne({ id }, { name: 1, fitness_tracking: 1, _id: 0 })
		.lean()
		.exec();
}

export async function updateFitnessTracking(id: string, tracking: boolean) {
	return await User.findOneAndUpdate({ id: id }, { fitness_tracking: tracking })
		.lean()
		.exec();
}

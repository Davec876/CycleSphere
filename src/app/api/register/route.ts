import User from '@/models/User';
import { type NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import Joi from 'joi';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const userData = body.formData;

		// Joi schema for validation
		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
		});

		// Validate userData with Joi
		const { error } = schema.validate(userData);
		if (error) {
			return NextResponse.json(
				{ message: 'Validation error: ' + error.details[0].message },
				{ status: 400 }
			);
		}

		// Checking db for duplicate emails
		const duplicate = await User.findOne({ email: userData.email })
			.lean()
			.exec();

		if (duplicate) {
			return NextResponse.json(
				{ message: 'Email is already registered' },
				{ status: 409 }
			);
		}

		const hashPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashPassword;

		await User.create(userData);
		return NextResponse.json({ message: 'User Created.' }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: 'Error', err }, { status: 500 });
	}
}

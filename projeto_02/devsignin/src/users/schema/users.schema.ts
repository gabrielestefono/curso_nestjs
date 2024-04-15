import * as mongoose from "mongoose";
import bcrypt from 'bcrypt';

export const UsersSchema	= new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	}
});

UsersSchema.pre('save', async function(next){
	try {
		if(!this.isModified()){
			return next();
		}
		this['password'] = await bcrypt.hash(this['password'], 10);
	} catch (error) {
		return next(error);
	}
});
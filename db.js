const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const url = process.env.MONGO_URI;
console.log("MONGO_URI loaded:", !!url);
const client = new MongoClient(url, {
	tls: true
});

async function connectDatabase() {
	try {
		await client.connect();

		console.log("MongoDB connected successfully!");
	} catch (error) {
		console.log("MongoDB connection failed!");
		console.log(error);
	}
}

connectDatabase();
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();

let leads = [];
async function fetchLeads() {
	try {
		const response = await axios.get(
			`https://graph.facebook.com/v26.0/${process.env.META_FORM_ID}/leads`,
			{
				params: {
					access_token: process.env.META_PAGE_ACCESS_TOKEN
				}
			}
		);

		leads = response.data.data;
		console.log("Leads stored:", leads.length);

	} catch (error) {
		console.log("Meta lead fetch failed!");
		console.log(error.response?.data || error.message);
	}
}

app.use(cors());
app.use(express.json());

app.post("/leads", (request, response) => {
	response.send("Lead received successfully!");
});

app.get("/leads", (request, response) => {
	response.json(leads);
});

app.get("/", (request, response) => {
	response.send("normal");
});

app.get("/webhook", (request, response) => {
	const mode = request.query["hub.mode"];
	const token = request.query["hub.verify_token"];
	const challenge = request.query["hub.challenge"];

	if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
		response.status(200).send(challenge);
	} else {
		response.sendStatus(403);
	}
})

app.post("/webhook", (request, response) => {
	console.log("Webhook received!");
	console.log(JSON.stringify(request.body, null, 2));

	response.sendStatus(200);
});

fetchLeads();
setInterval(fetchLeads, 5000);
app.listen(3000);
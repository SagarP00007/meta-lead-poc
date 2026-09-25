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

app.get("/leads", (request, response) => {
	response.json(leads);
});


fetchLeads();
setInterval(fetchLeads, 5000);
app.listen(3000);
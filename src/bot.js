require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();
const { covid, covidByCountries } = require("./services/covid.js");
const PREFIX = "pdi";

client.on("message", (message) => {
	if (message.author.bot) return;
	if (message.content.startsWith(PREFIX)) {
		const [cmdName, ...args] = message.content.substring(PREFIX.length).trim().split(" ");
		if (cmdName === "covid" && !args[0]) {
			covid.then((response) => {
				const { cases, recovered, deaths } = response;
				message.channel.send(`Cases: ${cases}, Recovered: ${recovered}, Deaths: ${deaths}`);
			});
		} else if (cmdName === "covid" && args[0]) {
			covidByCountries(args[0].toLowerCase())
				.then((response) => {
					const { cases, recovered, deaths, country } = response;
					message.channel.send(`Country: ${country} [Cases: ${cases}, Recovered: ${recovered}, Deaths: ${deaths}]`);
				})
				.catch((error) => {
					message.channel.send("Your enter countries is not in earth");
				});
		} else if (cmdName === "help") {
			message.channel.send(`
				1.pdi help
				2.pdi covid
				3.pdi covid {countries}
			`);
		} else {
			message.channel.send("Your command is wrong:V");
		}
	}
});

client.login(process.env.BOT_TOKEN);

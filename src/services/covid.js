const axios = require("axios");
const URL = "https://disease.sh/v3/covid-19/";

const covid = axios.get(URL + "all").then((response) => {
	return {
		cases: response.data.cases,
		recovered: response.data.recovered,
		deaths: response.data.deaths,
	};
});
const covidByCountries = async (countries) => {
	let covid = {};
	await axios.get(URL + `countries/${countries}`).then((response) => {
		covid = {
			cases: response.data.cases,
			recovered: response.data.recovered,
			deaths: response.data.deaths,
			country: response.data.country,
		};
	});
	return covid;
};

module.exports = { covid, covidByCountries };

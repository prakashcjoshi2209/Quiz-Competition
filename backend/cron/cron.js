// import cron from "cron";
// import https from "https";

// const URL = "https://quiz-competition-6au4.onrender.com/ping";

// const job = new cron.CronJob("*/14 * * * *", function () {
// 	https
// 		.get(URL, (res) => {
// 			if (res.statusCode === 200) {
// 				console.log("GET request sent successfully");
// 			} else {
// 				console.log("GET request failed", res.statusCode);
// 			}
// 		})
// 		.on("error", (e) => {
// 			console.error("Error while sending request", e);
// 		});
// });

// export default job;
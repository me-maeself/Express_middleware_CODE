const express = require("express");
const app = express();
const morgan = require("morgan");

// Morgan would print at the end of the cycle
app.use(morgan("tiny"));

// Password
const verifyPassword = (req, res, next) => {
	const { pwd } = req.query;
	if (pwd === "Duck") {
		return next();
	}
	res.send("Wrong password, try again!");
};

app.use((req, res, next) => {
	console.log(req.method, req.path);
	req.method = "GET";
	req.requestTime = Date.now();
	return next();
});

app.use("/dogs", (req, res, next) => {
	console.log("I love dogs!");
	return next();
});

// app.use((req, res, next) => {
// 	console.log("My first middleware!");
// 	return next();
// });

app.get("/secret", verifyPassword, (req, res) => {
	res.send("Don't tell anyone, but i hate brocoli");
});

app.get("/", (req, res) => {
	console.log(req.requestTime);
	res.send(`Home Page!`);
});

app.get("/dogs", (req, res) => {
	res.send(`Woof! Woof!`);
});

app.use((req, res) => {
	res.status(404).send(`NOT FOUND 404!. Love and peace~ me.maeself 2024`);
});

app.listen(3000, () => {
	console.log(`(express) listening on 3000`);
});

# Overview
Crucial:
- The concept of Middleware
- Defining custom Middleware

Nice to have:
- Morgan Logging Middleware

# 429. Intro Express Middleware
Middleware -> Process between request and response.
- Request -> Middleware -> Response
- `next`

# 430. Morgan
- npm pack for logging HTTP req to the terminal
  - app.use(morgan("tiny"));
- app.use() -> Call the function inside every time a process happens

```
GET / 200 10 - 2.015 ms
GET / 304 - - 0.729 ms
GET / 304 - - 0.422 ms
GET / 304 - - 0.303 ms
GET /that 404 143 - 1.678 ms
GET /dogs 200 11 - 0.402 ms
```

# 431. next(); Own Middleware
- using `next()`
```js
app.use((req, res, next) => {
	console.log("My first middleware!");
	return next();
    // code here might be called if return not used.
    // code here run based on call stacks.
});
```
#  432. Middleware practice
- the ability to add data or method at req.<objectName>
```js
app.use((req, res, next) => {
	console.log(req.method, req.path);
	req.method = "GET";
	req.requestTime = Date.now();
	return next();
});
```

# 433. Setting up 404 Route
```js
app.use("/dogs", (req, res, next) => {
	console.log("I love dogs!");
	return next();
});

app.use((req, res) => {
	res.status(404).send(`NOT FOUND 404!. Love and peace~ me.maeself 2024`);
});
```

# 434. Fake Password demo 
```js
app.use((req, res, next) => {
	const { pwd } = req.query;
	if (pwd === "Duck") {
		return next();
	}
	res.send("Wrong password, try again!");
});
```

# 435. Protecting specific route
- Calling 2nd or more callback on app.get
```js
app.get("/secret", verifyPassword, (req, res) => {
	res.send("Don't tell anyone, but i hate brocoli");
});
```
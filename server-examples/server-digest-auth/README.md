# Server Digest Authentication

A simple Node server using digest authentication.

## Under The Hood

First we'll include the necessary Node.js modules:

-   The [HTTP (http)](https://nodejs.org/api/http.html) module will be used to create the HTTP server.
-   The [HTTP Authentication (http-auth)](https://www.npmjs.com/package/http-auth) module will be used for basic authentication.

```js
14. const http = require("http");
15. const auth = require("http-auth");
```

We'll define the authentication configuration including an authentication realm and a reference to the password file. In this case, the implementation looks for the password file in the current directory:

```js
17. const digestAuth = auth.digest({
18.  realm: "Private area",
19.  file: __dirname + "/htpasswd",
20.  authType: "digest"
21. });
```

Here we will perform some status checks:

```js
23. digestAuth.on("success", (req, res) => {
24.     console.log(`User authenticated: ${req.user}`);
25. });

27. digestAuth.on("fail", (req, res) => {
28.     console.log(`User authentication failed: ${req.user}`);
29. });

31. digestAuth.on("error", (error, req) => {
32.     console.log(`Authentication error: ${error.code + " - " + error.message}`);
33. });
```

Next, we'll create the HTTP server and specify the processing when an HTTP request is received:

-   Create the HTTP server using the [createServer](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener) api, specifying the authentication module, incoming request and the outgoing response.
-   Set the proper HTML content type for the response.
-   Send the response.

```js
35. const server = http.createServer(digestAuth, (req, res) => {
36.   res.writeHead(200, { "Content-Type": "text/plain" });
37.   res.write(`Welcome ${req.user}`);
38.   res.end();
39. });
```

Finally, we'll start the HTTP server listening on localhost port 8100 for incoming requests, and print a message to the console:

```js
41. server.listen(8100, "127.0.0.1");
42. console.log("Server is ready");
```

## Running The Sample

-   Install the Node.js utility, **htdigest** to manage the password file:
    -   `npm install -g htdigest`
-   Create the password file specifying a file name (in this case we are naming the file `htpasswd`), user name and password (-c argument: create the file:
    -   `htdigest -c` `<filename>` `<user>`
-   npm start
-   Visit: http://127.0.0.1:8100

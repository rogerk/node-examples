# Server Basic Authentication

A simple Node server using basic authentication.

## Under The Hood

First we'll include the necessary Node.js modules:

- The [HTTP (http)](https://nodejs.org/api/http.html) module will be used to create the HTTP server.
- The [HTTP Authentication (http-auth)](https://www.npmjs.com/package/http-auth) module will be used for basic authentication.

```js
14. const http = require("http");
15. const auth = require("http-auth");
```

We'll define the authentication configuration including an authentication realm and a reference to the password file. In this case, the implementation looks for the password file in the current directory:

```js
17. const basicAuth = auth.basic({
18.  realm: "Private area",
19.  file: __dirname + "/htpasswd"
20. });
```

Next, we'll create the HTTP server and specify the processing when an HTTP request is received:

- Create the HTTP server using the [createServer](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener) api, specifying the authentication module, incoming request and the outgoing response.
- Set the proper HTML content type for the response.
- Send the response.

```js
22. const server = http.createServer(basicAuth, (req, res) => {
23.   res.writeHead(200, { "Content-Type": "text/plain" });
24.   res.write(`Welcome ${req.user}`);
25.   res.end();
26. });
```

Finally, we'll start the HTTP server listening on localhost port 8100 for incoming requests, and print a message to the console:

```js
28. server.listen(8100, "127.0.0.1");
29. console.log("Server is ready");
```

## Running The Sample

- Install the Node.js utility, **htpasswd** to manage the password file:
  - `npm install -g htpasswd`
- Create the password file specifying a file name (in this case we are naming the file `htpasswd`), user name and password (-c argument: create the file; -b argument: specify password on command line):
  - `htpasswd -bc` `<filename>` `<user>` `<password>`
- npm start
- Visit: http://127.0.0.1:8100

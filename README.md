# eproxy
HTTP Reverse Proxy for running multiple server devices as one website built in Node-RED with NGINX and Express

![screenshot](/screenshot.png)

# What is a HTTP Reverse Proxy?

HyperText Transfer Protocol is the method used by many Internet Servers on the WorldWide Web \
to deliver pages of a website and other content to your device's web browser.

Web Hosting Services and some Internet Service Providers allow you to host your own content, \
but what happens when you want to host many different pages from multiple devices?

A Reverse Proxy is essentially a Web Server that sits in place of the main Web Server on your \
network, but also forwards content from other Web Servers on the same network that you specify.

![diagram](/diagram.png)

Most of the devices shown in the diagram can be swapped out for other devices \
(e.g. A mobile phone or an IoT device if it has a link that a modern web browser can decode).

The device in the center is the Reverse Proxy and acts on behalf of the connected devices. \
It can be anything from a high-end server to a Raspberry Pi, so long as it can run Node-RED.

The globe represents a connection to the Internet, often provided by a Router or Gateway \
of some description. This will need configuring to make Node-RED available on the Internet.

# How does it work?

In a singular web server, Request Data is received from a user's web browser for a particular page. \
The server decides how to process it based on the type and location, then returns some Response Data.

With a reverse proxy server, the Request Data needs to be forwarded to the intended server first, \
it gets processed on that device and it sends back Response Data which also needs to be forwarded.

Request Data coming into eproxy is known as Ingress and comes from many different internet clients. \
Response Data going out from eproxy is known as Egress and must be returned to the correct client.

The connection to the internal server is arbitrary and can be customised deeply and widely within \
utilities like Node-RED and NGINX. For ease of use it is best that this link is also HTTP-compliant.

# How do I set it up?

A Web Server device capable of running Node-RED is required. \
Please see https://nodered.org/ for installation instructions.

Port Forwarding of your Server using your Router is required. \
Please consult the instruction manual for your router or web hosting service. \
(Change port 1880 to 80)

In the `epoxy.json` file, replace `<device-name>` with the domain name you would like to use \
that will follow the URL (e.g. `http://localhost:1880/<device-name>/`).

Also in the `epoxy.json` file, replace `<device-url>` with the local URL of the server \
that you want to forward to (e.g. `http://hostname.local/web/`).

Alternatively, you can change these values on the Node-RED Dashboard by double-clicking nodes. \
Import your flow by clicking the Hamburger Icon, select "Import" and browse for `epoxy.json`.

Converting the flow to use HTTPS private key and public certificate is recommended. \
Please contact your Certificate Signing Authority for steps on how to secure your web server. \
(Change port 80 to 443)

Once you have made any changes to the Node-RED flow, click the "Deploy" button \
to update the changes. Optionally open the "Debug" tab to view server logs of incoming requests.

Test your new reverse proxy thoroughly to iron out any major or obscure errors you may find \
and ideally remove the debug nodes if you don't need them for staging or production environments.

# Things to Note
```
* This setup procedure may seem alien to you if you're not aware of port-forwarding or how to do it.
* Node-RED makes it easier for most users to configure and customise complicated parts of NGINX.
* You may have to change the flows to get the desired outcome depending on your network setup.
* The "debug" node provides messages to the debug console, marked by a tab with a small bug icon.
* The "http in" node is responsible for receiving Request Data from web browsers accessing the site.
* The "http in" node currently only processes GET requests - POST requests can come from other nodes.
* The "ingress" function node performs light pre-processing and switches the URL in the Request Data.
* The "http request" node is responsible for querying the internal web server on your network.
* The "http request" node must be set to output Binary instead of UTF-8 strings for images to work.
* The "egress" function node performs heavy post-processing for capitalisation and trailing "/" bugs.
* The "http response" node is responsible for sending Response Data back to the web browser.
* The "http response" node uses `msg.StatusCode` instead of e.g. `msg.req.headers["Content-Type"]`.
* Most of the functions in `msg.res` are deprecated, shouldn't be used and have better alternatives.
* A HTTP 301 redirect is required for `text/html` files to add a trailing "/" to fix page hyperlinks.
* There are many other contrib nodes available for Node-RED that will provide reverse proxying.
* While Node-RED is largely free, services provided by NGINX and CA Authorities tend to be paid.
```

![working](/working.png)
# Review Questions

## What is Node.js?
- Node is a server=side run-time environment for Javascript.

## What is Express?
- Express is a lightweight framework for Node.js. It adds another layer of functionality to Node.js that helps manage server routes.

## Mention two parts of Express that you learned about this week.
- We learned how to manage different endpoints in express, as well as how to add middleware to extend Express's functionality.

## What is Middleware?
- Middleware is added functionality to Express, similar to how Express adds functionality to Node.js. Without Middleware, Express would be very barebones.

## What is a Resource?
- In Express, everything is a resource.

## What can the API return to help clients know if a request was successful?
- A 200 OK status code would work for that.

## How can we partition our application into sub-applications?
- You can seperate routes into their own files, as well as custom middleware.

## What is express.json() and why do we need it?
- It's a piece of middleware that's now built into Express. It allows us to read the data from the request body.

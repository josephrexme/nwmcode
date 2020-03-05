# NWM
This is an app that uses Express Node.js for a simple server-side fetching graphQL data from a public API and then relaying that data through a REST API to a React client-side.

### Installing the dependencies
This is a 2-face repository handling server-side and client-side and they each have their own dependencies. To install dependencies, go to respective folders (`client` and `server`). Within the directory you can now run

```
npm install
```

or `yarn` if preferred.

### Running the code
Go to the server directory and run:

```
npm start
```

then go to the client and run the same command. The app should be visible at `localhost:3000`.


### Technology Decisions
The server fetches data through graphQL from a graphQL server. This data is then made available for our client through a single REST API endpoint. The client is a React application that consumes this REST API data in the simplest way it can. It uses the Fetch API
for requests to prevent installing more dependencies. The styling is done with `styled-components` which I am faster with but I am open to more approaches to styling as well.



### Tests and Type Safety
This project was bootstraped with `create-react-app` which includes `testing-library` - a really great library for testing React applications. My initial set up was without any form of type safety like TypeScript so I decided to avoid it for this specific case. I did use `prop-types` where it was needed for some level of type safety. I also removed all the example test files provided by testing-library as I did not have enough time to create a good test coverage. If this is required or needed, I will need to demand more time to create them.
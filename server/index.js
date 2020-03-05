const express = require('express');
const { request } = require('graphql-request');
const app = express();

app.use(express.json());

const ENDPOINT = 'https://api.graphql.jobs/';

const query = `
query{
  jobs {
    id
    title
    description
  }
}
`;

app.get('/', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try{
    const data = await request(ENDPOINT, query);
    res.json(data.jobs)
  }catch(error) {
    res.status(500).json(error);
  }
});

app.listen(5000);
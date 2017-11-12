import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

import url from './config/url';
import auth from './config/auth';

let app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.post('/subscribe', jsonParser, (req, res) => {
  const { firstName, lastName, email } = req.body;

  axios({
    method: "post",
    url,
    data: {
      "email_address": email,
      "status": "subscribed",
      "merge_fields": {
        "FNAME": firstName,
        "LNAME": lastName
      }
    },
    headers: {
      "Access-Control-Allow-Credentials":"true",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth,
  }).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    console.log(`Error: ${error}`);
    res.status(500).json({ error })
  });
});

app.listen(4000, () => {
  console.log('Bitcoach app listening on port 4000!')
});


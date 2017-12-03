import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

import url from './config/url';
import auth from './config/auth';

let app = express();
let error;
const jsonParser = bodyParser.json();

app.use(cors());

app.post('/subscribe', jsonParser, async (req, res) => {
  const { email } = req.body;

  if (!error) {
    axios({
      method: "post",
      url,
      data: {
        "email_address": email,
        "status": "subscribed",
      },
      headers: {
        "Access-Control-Allow-Credentials":"true",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth,
    }).then((response) => {
      res.json(response.data);
    }).catch((error) => {
      res.status(500).json({ error })
    });
  } else {
    res.status(400).json({ error });
  }
});


app.post('/webinar/subscribe', jsonParser, async (req, res) => {
  const { email, firstName, lastName } = req.body;

  axios({
    method: "post",
    url,
    data: {
      "email_address": email,
      "status": "subscribed",
      "merge_fields": {
        "FNAME": "Urist",
        "LNAME": "McVankab"
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
    res.status(500).json({ error })
  });
});

app.listen(4000, () => {
  console.log('Bitcoach app listening on port 4000!')
});


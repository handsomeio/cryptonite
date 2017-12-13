import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

import { subscribeUrl, webinarUrl } from './config/url';
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
        url: subscribeUrl,
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

  console.log('trying to post2 ');
  console.log(webinarUrl);

  axios({
    method: "post",
      url: webinarUrl,
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
    console.log(response);
    res.json(response.data);
  }).catch((error) => {
    console.log(error);
    res.status(500).json({ error })
  });
});

app.listen(4000, () => {
  console.log('Bitcoach app listening on port 4000!')
});


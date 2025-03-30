import Twit from "twit";

const T = new Twit({
  consumer_key: 'v60HoIV3f1tyyNwJzPmq1IwLo',
  consumer_secret: 'qbt17cciD9UwevtjRPwzjOa4I18gEmmPrmBq0Gy1OqNUQ1y8NK',
  access_token: '4536097768-UyaCa570IsV5svuHJsuAOLKk4ZZPfz43r9kxMDo',
  access_token_secret: 'wYVuznYXo6nY7cP8Vr0IZFTVcjIp5via1Z6ICWcms6Fb8',
});

T.get('/2/tweets/:id', {count: 10 }, (err, data, response) => {
  console.log(data);
});


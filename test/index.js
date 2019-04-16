const http = require('http');
const wechatAuth = require('../src/index.js');

http.createServer(async function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});

  let result = await wechatAuth.getAccessToken({
    APPID: 'wx7eb04cc84eb21896',
    APPSECRET: '784eed575b3236518ba332fb8226a448'
  })
  console.log('res', result)
  let accessToken = ''
  if (result.code === 200) {
    accessToken = result.data.access_token
  }

  response.end('Hello World: accessToken' + accessToken);
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
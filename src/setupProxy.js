const { createProxyMiddleware } = require("http-proxy-middleware");
const target = "http://quetzz.it:11332"

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: target,
      ws: true,
      changeOrigin: true,
      onProxyReq: proxyReq => proxyReq.setHeader("origin", target),
      onProxyReqWs: proxyReq => proxyReq.setHeader("origin", target)
    })
  )
};



// ///////
// curl 'http://localhost:3001/api/feedbacks' \
//   -H 'Connection: keep-alive' \
//   -H 'sec-ch-ua: "Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"' \
//   -H 'X-XSRF-TOKEN: 80365e41-f7eb-4bec-a92f-87141e285ce4' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36' \
//   -H 'Content-Type: application/json' \
//   -H 'Accept: */*' \
//   -H 'Origin: http://localhost:3001' \
//   -H 'Sec-Fetch-Site: same-origin' \
//   -H 'Sec-Fetch-Mode: cors' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Referer: http://localhost:3001/requests' \
//   -H 'Accept-Language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7' \
//   -H 'Cookie: JSESSIONID=CD1B004FBFC1E06C6E0710FD40F675A5; XSRF-TOKEN=80365e41-f7eb-4bec-a92f-87141e285ce4' \
//   --data-raw '{"requestId":9010,"text":"safaf","vote":4}' \
//   --compressed

//   http://test.marinofrancesco.com/api/api-docs.html






// https://sharing.clickup.com/b/h/4-8964459-2/70edca39c09fb77
// Francesco Marino22:55
// test.marinofrancesco.com
// Francesco Marino22:58
// mk, mk3
// noty1234
// Francesco Marino00:12
// http://admin.marinofrancesco.com/


// faq

// <div style={styles}>FAQ</div>
// <div style={styles}>(Frequently Asked Questions)</div>

// scelto
// space in all step pro registration





const http = require("http");
const fs = require("fs");

const defaultData = {
  defaultResponse: { status: "ok" },
  logs: []
};

fs.existsSync("serverData.json")
  ? true
  : fs.writeFileSync("serverData.json", JSON.stringify(defaultData));

http
  .createServer((request, response) => {
    let serverData = JSON.parse(fs.readFileSync("serverData.json")),
      { logs, defaultResponse } = serverData;

    logs.push({
      method: request.method,
      url: request.url,
      time: new Date().getTime()
    });

    fs.writeFileSync("serverData.json", JSON.stringify(serverData));

    response.writeHead(200, { "Content-type": "application/json" });
    response.end(JSON.stringify(defaultResponse));
  })
  .listen(3030);

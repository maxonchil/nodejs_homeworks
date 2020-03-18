const http = require("http");
const fs = require("fs");

const defaultData = {
  defaultResponse: { status: "ok" },
  logs: []
};

fs.existsSync("serverData.json") ||
  fs.writeFileSync("serverData.json", JSON.stringify(defaultData));

http
  .createServer((request, response) => {
    const serverData = JSON.parse(fs.readFileSync("serverData.json")),
      { logs, defaultResponse } = serverData;

    logs.push({
      method: request.method,
      url: request.url,
      time: new Date().getTime()
    });

    fs.writeFileSync("serverData.json", JSON.stringify(serverData));

    const respDefault = JSON.stringify(defaultResponse);
    const respLog =
      request.headers["show-logs"] && respDefault + "\n" + JSON.stringify(logs);

    response.writeHead(200, { "Content-type": "application/json" });
    response.end(respLog || respDefault);
  })
  .listen(3030);

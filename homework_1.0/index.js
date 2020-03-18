const http = require("http");
const fs = require("fs");

const defaultData = {
  defaultResponse: { status: "ok" },
  logs: []
};
const sendResponse = (content, response) => {
  response.writeHead(200, { "Content-type": "application/json" });
  response.end(JSON.stringify(content));
};

fs.existsSync("serverData.json") ||
  fs.writeFileSync("serverData.json", JSON.stringify(defaultData));

http
  .createServer((request, response) => {
    const serverData = JSON.parse(fs.readFileSync("serverData.json")),
      { logs, defaultResponse } = serverData,
      { method, url, headers } = request;

    logs.push({
      method,
      url,
      time: new Date().getTime()
    });

    fs.writeFileSync("serverData.json", JSON.stringify(serverData));

    if (url.includes("date")) {
      const filterDate = url.match(/date=([\/*\d+\/*]+)/)[1];
      const filtredLogs = logs.filter(
        e => new Date(e.time).toLocaleDateString("en-US") === filterDate
      );

      sendResponse(filtredLogs, response);
    }

    const fullLogs = headers["show-logs"] && [defaultResponse, logs];

    sendResponse(fullLogs || defaultResponse, response);
  })
  .listen(3030);

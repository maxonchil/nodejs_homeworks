const http = require("http");
const fs = require("fs");

const defaultData = {
  defaultResponse: { status: "ok" },
  logs: []
};

const parseURL = url => {
  let paramsString = url.split("?")[1];
  if (paramsString) {
    return paramsString.split("&").reduce((acc, element) => {
      const [key, value] = element.split("=");
      acc[key] = value;
      return acc;
    }, {});
  }
  return {};
};

const getLogs = (logs, queryParams) => {
  let result = logs;
  if (queryParams.start && queryParams.end) {
    result = logs.filter(
      ({ time }) => time <= queryParams.end && time >= queryParams.start
    );
  } else if (queryParams.start) {
    result = logs.filter(({ time }) => time >= queryParams.start);
  } else if (queryParams.end) {
    result = logs.filter(({ time }) => time <= queryParams.end);
  }
  return result;
};

fs.existsSync("serverData.json") ||
  fs.writeFileSync("serverData.json", JSON.stringify(defaultData));

http
  .createServer((request, response) => {
    const serverData = JSON.parse(fs.readFileSync("serverData.json"));
    const { logs, defaultResponse } = serverData;
    const { method, url } = request;
    const responseBody = defaultResponse;

    logs.push({
      method,
      url,
      time: new Date().getTime()
    });

    fs.writeFileSync("serverData.json", JSON.stringify(serverData));
    response.writeHead(200, { "Content-type": "application/json" });
    if (method === "GET" && url.split("?")[0] === "/logs") {
      responseBody.logs = getLogs(logs, parseURL(url));
    }

    response.end(JSON.stringify(responseBody));
  })
  .listen(3030);

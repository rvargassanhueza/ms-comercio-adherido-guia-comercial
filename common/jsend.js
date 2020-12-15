'use strict';
function formatJSend(req, res, body) {
  function formatError(resp, bodyError) {
    const isClientError = resp.statusCode >= 400 && resp.statusCode < 500;
    if (isClientError) {
      return {
        status: 'error',
        message: Object.prototype.hasOwnProperty.call(bodyError, "message") ? bodyError.message : "",
        data: bodyError,
        code: Object.prototype.hasOwnProperty.call(bodyError, "code") ? bodyError.code : ""
      };
    }
    const inDebugMode = process.env.APPLICATION_ENV === 'development';

    return {
      status: 'error',
      message: inDebugMode ? bodyError.message : 'Internal Server Error',
      code: inDebugMode ? bodyError.code : 'INTERNAL_SERVER_ERROR',
      data: inDebugMode ? bodyError.stack : undefined
    };
  }

  function formatSuccess(bodyOk) {
    if (bodyOk.data && bodyOk.pagination) {
      return {
        status: 'success',
        data: bodyOk.data,
        pagination: bodyOk.pagination,
      };
    }

    return {
      status: 'success',
      data: bodyOk
    };
  }

  let response;
  if (body instanceof Error || (res.statusCode >= 400 && res.statusCode < 500)) {
    response = formatError(res, body);
  } else if (req.url.indexOf("swagger") >= 0) {
    response = body;
  } else {
    response = formatSuccess(body);
  }

  response = JSON.stringify(response);
  res.header('Content-Length', Buffer.byteLength(response));
  res.header('Content-Type', 'application/json');

  return response;
}

module.exports = formatJSend;

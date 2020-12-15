'use strict';
const httpStatus = require('http-status');
const errors = require('restify-errors');

module.exports.paramValidation = function (joi) {
  return function (req, res, next) {
    // always allow validation to allow unknown fields by default.
    const options = {
      allowUnknown: true,
      abortEarly: false,
    };

    const validation = req.route.spec.validation; // validation object in route
    if (!validation) {
      return next(); // skip validation if not set
    }

    const validProperties = ['body', 'query', 'params'];

    for (const i in validation) {
      if (validProperties.indexOf(i) < 0) {
        // console.log('Route contains unsupported validation key');
        throw new Error('An unsupported validation key was set in route');
      } else {
        if (req[i] === undefined) {
          // console.log('Empty request ' + i + ' was sent');

          res.send(
            httpStatus.BAD_REQUEST,
            new errors.InvalidArgumentError(`Missing request ${i}`)
          );
          return;
        }

        options.language = {
          string: {
            email: '"{{value}}" no es un email válido.'
          }
        };

        const result = joi.validate(req[i], validation[i], options);

        if (result.error) {
          // console.log('validation error - %s', result.error.message);

          const details = [];
          result.error.details.forEach((element) => {
            details.push({ message: element.message, key: element.path[0] })
          });

          res.send(
            httpStatus.BAD_REQUEST,
            details
          );
          return;
        }

        if (i === "body")
          req.body = Object.assign(req.body, result.value);
        else if (i === "query")
          req.query = Object.assign(req.query, result.value);
        else if (i === "params")
          req.params = Object.assign(req.params, result.value);
      }
    }

    next();
  };
};

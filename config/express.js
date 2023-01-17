const express = require('express'),
  glob = require('glob'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  cors = require('cors')

module.exports = function(app, config) {
  app.disable('x-powered-by');
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cookieParser());
  app.use(
    cors({
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'x-access-token',
      ],
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
    }),
  );
  
  const routes = glob.sync(config.routes);
  routes.forEach(function(route) {
    require(route)(app);
  });
  
};

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _usersRoutes = require('./routes/usersRoutes');

var _usersRoutes2 = _interopRequireDefault(_usersRoutes);

require('./models/userModels');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.json());
var port = process.env.PORT || 3000;
app.listen(port);

app.use('/api/v2/auth', _usersRoutes2.default);

console.log('app running on port ', port);

exports.default = app;
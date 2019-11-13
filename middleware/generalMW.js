const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

module.exports = server => {
    server.use(helment());
    server.use(express.json());
    server.use(cors());
    server.use(morgan());
}

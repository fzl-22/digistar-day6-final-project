const { v4: uuidv4 } = require("uuid");

const getUniqueId = () => uuidv4();

module.exports = getUniqueId;

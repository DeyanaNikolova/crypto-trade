const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find({}).lean();

exports.getById = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });
const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find({}).lean();

exports.getById = (cryptoId) => Crypto.findById(cryptoId).lean();
exports.serach = async (name, paymentMethod) => {
    let crypto = await this.getAll();
    if(name){
        crypto = crypto.filter(x => x.name.toLowerCase()  == name.toLowerCase());
    }
    if(paymentMethod){
        crypto = crypto.filter(x => x.paymentMethod.toLowerCase()  == paymentMethod);
    }
    return crypto;
}; 

exports.buy = async (userId, cryptoId) => {
   //  Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId}});

  
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyers.push(userId);
    return crypto.save();
};

exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.deleteCrypto = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);
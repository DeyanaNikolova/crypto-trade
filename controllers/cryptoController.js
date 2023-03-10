const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');
const { viewDataPaymentMethod } = require('../utils/viewDataUtils');

router.get('/catalog', async (req, res) => {
    const crypto = await cryptoService.getAll();
    res.render('crypto/catalog', { crypto });
});

router.get('/search', async (req, res) => {
    const { name, paymentMethod } = req.query;
    const crypto = await cryptoService.serach(name, paymentMethod);
    const paymentMethods = viewDataPaymentMethod(paymentMethod);
    res.render('crypto/search', { crypto, paymentMethods, name });
});

router.get('/:cryptoId/details', async (req, res) => {
    const crypto = await cryptoService.getById(req.params.cryptoId);

    const isOwner = crypto.owner.toString() === req.user?._id;
    const isBuyer = crypto.buyers?.some(id => id == req.user?._id);

    res.render('crypto/details', { crypto, isOwner, isBuyer });
});

router.get('/:cryptoId/buy', isAuthorized, async (req, res) => {
    await cryptoService.buy(req.user._id, req.params.cryptoId);
    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/edit', isAuthorized, async (req, res) => {
    const crypto = await cryptoService.getById(req.params.cryptoId);
    const paymentMethods = viewDataPaymentMethod(crypto.paymentMethod);

    res.render('crypto/edit', { crypto, paymentMethods });
});

router.post('/:cryptoId/edit', isAuthorized, async (req, res) => {
    const cryptoData = req.body;

    await cryptoService.edit(req.params.cryptoId, cryptoData);

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/delete', isAuthorized, async (req, res) => {
    await cryptoService.deleteCrypto(req.params.cryptoId);
    res.redirect('/crypto/catalog')
});

router.get('/create', isAuthorized, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuthorized, async (req, res) => {
    const cryptoData = req.body;
    try {
        await cryptoService.create(req.user._id, cryptoData);

    } catch (error) {
        return res.status(400).render('crypto/create', { error: getErrorMessage(error) });
    }
    res.redirect('/crypto/catalog');

});


module.exports = router;
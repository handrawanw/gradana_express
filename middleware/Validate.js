const { body, validationResult } = require('express-validator')
class TradeValidation {

    static validate(method) {
        switch (method) {
            case "login":
                return [
                    body('email', 'Email anda tidak boleh kosong').notEmpty(),
                    body('password', 'Password anda tidak boleh kosong').notEmpty(),
                ];
            case "register":
                return [
                    body('email', 'Email anda tidak valid').notEmpty().isEmail(),
                    body('password', 'Password anda tidak boleh kosong').notEmpty().isString(),
                    body('username', 'No HP anda tidak boleh kosong').notEmpty(),
                    body('no_hp', 'No HP anda tidak boleh kosong').notEmpty().isMobilePhone("id-ID"),
                ];
            case "topup":
                return [
                    body('email', 'Email anda tidak valid').notEmpty().isEmail(),
                    body('amount', 'Amount tidak boleh kosong').notEmpty().isNumeric(),
                ];
            default:
                return [];
        };
    }

    static viewValidateError(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                message: errors.array(),
                validate: 'error'
            });
        } else {
            next();
        }
    }

}

module.exports = TradeValidation;
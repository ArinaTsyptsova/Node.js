const Joi = require("joi");

const userScheme = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    city: Joi.string().min(1).max(40),
});

function checkUsers(user, res) {
    const result = userScheme.validate(user);
    if (result.error) {
    return res.status(404).send({ error: result.error.details });
    }
}

module.exports = { checkUsers };
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUser,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserProfile,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .custom((value) => {
          if (!isURL(value, { require_protocol: true })) {
            throw new Error('Неправильный формат ссылки');
          }
          return value;
        }),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;

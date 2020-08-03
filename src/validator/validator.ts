import { check } from 'express-validator';

const createValidationFor = route => {
  switch (route) {
    case 'login':
      return [
        check('email')
          .isEmail()
          .withMessage('must be an email'),
        check('password')
          .not()
          .isEmpty()
          .isLength({ min: 8 })
          .withMessage('password required'),
      ];

    case 'signup':
      return [
        check('name')
          .not()
          .isEmpty()
          .withMessage('name required'),
        check('email')
          .isEmail()
          .withMessage('must be an email'),
        check('phone_no')
          .not()
          .isEmpty()
          .withMessage('must be an phone_no'),
        check('password')
          .not()
          .isEmpty()
          .isLength({ min: 8 })
          .withMessage('Password required'),
      ];

    case 'products':
      return [
        check('product_name')
          .not()
          .isEmpty()
          .withMessage('product_name required'),
        check('product_supplier')
        .not()
          .isEmail()
          .withMessage('product_supplier required'),
        check('product_price')
          .not()
          .isEmpty()
          .withMessage('product_price Required'),
      ];
    default:
      return [];
  }
};

export default createValidationFor;

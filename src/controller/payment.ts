import uuid from 'uuid/dist/v4';
import Stripe from 'stripe';
const stripe = new Stripe('pk_test_eUuzuGialbGz2eNFwBiSeFk600obfYNIlN', {
  apiVersion: '2020-03-02',
});

import { Request, Response } from 'express';
export class PaymentController {
  payment = async (req: Request, res: Response) => {
    const { token, product } = req.body;

    const idempotencyKey = uuid();
    return stripe.invoiceItems
      .create({
        customer: product.email,
        amount: product.amount,
      })
      .then(customer => {
        stripe.charges.create(
          {
            amount: product.price,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchese of ${product.name} `,
            shipping: {
              name: token.card.name,

              address: {
                country: token.card.address_country,
              },
            },
          },
          { idempotencyKey },
        );
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

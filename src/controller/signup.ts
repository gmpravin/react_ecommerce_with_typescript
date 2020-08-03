import * as mongoose from 'mongoose';
import { signUpSchema } from '../models/signup';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { hash } from '../functions/hash';
import { IsignUpSchema } from '../interface/signup';
const Signup = mongoose.model<IsignUpSchema>('Signup', signUpSchema, 'Users');
export class SignupController {
  signup = async (req: Request, res: Response) => {
    const Result = validationResult(req);

    var errors = Result;
    const { name, email, phone_no, password } = req.body;
    const data = {
      name,
      email,
      phone_no,
      password: hash(password),
      admin: 1,
    };
    if (!Result.isEmpty()) {
      res.json(errors);
    } else {
      await Signup.findOne({ email: data.email })
        .then(doc => {
          if (doc == null) {
            let Users = new Signup(data);

            Users.save((err: mongoose.Error) => {
              if (err) {
                res.send(err);
              } else {
                res.status(200).json({ msg: 'Registered Sucessfull' });
              }
            });
          } else {
            res.status(302).json({ msg: 'Email already used' });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500);
        });
    }
  };
}

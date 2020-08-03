import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { loginSchema } from '../models/login';
import * as mongoose from 'mongoose';
import { compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IloginSchema } from '../interface/login';
const Login = mongoose.model<IloginSchema>('Login', loginSchema, 'Users');
export class LoginController {
  /**
   * login
   */
  login = async (req: Request, res: Response) => {
    const result = validationResult(req);

    var errors = result;
    if (!result.isEmpty()) {
      res.json(errors);
    } else {
      const { email, password } = req.body;
      const data = {
        email,
        password,
      };

      await Login.findOne({ email: data.email })
        .then(doc => {
          console.log(doc);
          if (doc === null) {
            res.send({ msg: 'This Email Is not regestered!' });
          }
          const obj = {
            password: doc.password,
            admin: doc.admin,
          };
          const check = compareSync(data.password, obj.password);
          console.log(obj);

          if (obj.admin == 0) {
            if (check) {
              let token = jwt.sign(
                { body: `${data.email}+${data.password}` },
                'MIIEpAIBAAKCAQEAyVTQ9QxfutaYXKBbYfZbH2vhIWoIPEjAFSbsy1PZoIcclUQ',
                { algorithm: 'HS256' },
              );

              // res.send({ Success: 'Success!' });
              res.status(200).json({ token: token });
            } else {
              res.status(401).send({ msg: 'Wrong password!' });
            }
          } else {
            if (check) {
              res.status(200).send({ Client: 'Success!' });
            } else {
              res.status(401).send({ msg: 'Wrong password!' });
            }
          }
        })
        .catch(err => {
          res.status(500).json({ msg: `Something wrong in server ${err}` });
        });
    }
  };
}

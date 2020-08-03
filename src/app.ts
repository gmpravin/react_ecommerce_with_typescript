import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/index';
import * as fileUpload from 'express-fileupload';
import * as cors from 'cors';
import * as path from 'path';
import uuid from 'uuid/dist/v4';
const stripe = require('stripe')('sk_test_NencVYLPOr9N2q2zIP4PlKQa00yq3xa8V8');

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    var dir = path.join(__dirname, 'upload/');

    this.app.use(bodyParser.json());
    this.app.use(cors());

    this.app.use(
      fileUpload({
        preserveExtension: 3,
        safeFileNames: true,
        limits: { fileSize: 50 * 1024 * 1024 },
        useTempFiles: true,
        tempFileDir: dir.toString(),
      }),
    );
    // this.app.use(cors());

    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}
export default new App().app;

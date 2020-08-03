import { SignupController } from '../controller/signup';
import { LoginController } from '../controller/login';
import { ProductsController } from '../controller/Products';
import { CategoryController } from '../controller/category';
import { PaymentController } from '../controller/payment';
import createValidation from '../validator/validator';
import { isAuthenticated } from '../functions/ensuretoken';

const signupController: SignupController = new SignupController();
const loginController: LoginController = new LoginController();
const productController: ProductsController = new ProductsController();
const categoryController: CategoryController = new CategoryController();
const paymentController: PaymentController = new PaymentController();

export class Routes {
  public routes(app): void {
    app
      .route('/api/signup')
      .post(createValidation('signup'), signupController.signup);
    app
      .route('/api/login')
      .post(createValidation('login'), loginController.login);
    app
      .route('/api/products')
      .get(productController.getproducts)

      .post(
        isAuthenticated,
        createValidation('products'),
        productController.postproducts,
      );

    app
      .route('/api/product/:id')
      .get(productController.getProductById)
      .put(isAuthenticated, productController.UpdateProductById)
      .delete(isAuthenticated, productController.deleteproduct);

    app.route('/api/catagory/:category').get(categoryController.getCategory);
    app.route('/api/getcatagoryName').get(categoryController.getCategoryName);
    app.route('api/payment').post(paymentController.payment);
  }
}

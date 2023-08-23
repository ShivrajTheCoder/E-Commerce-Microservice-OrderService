import {Router} from "express";
import {  GetAllOrders, GetAllUserAucOrders, GetAucOrder, GetOrder, GetUserOrders, PaymentSuccess } from "../Controllers/orderController";
import { authenticateToken } from "../utils/userAuthMiddleware";
const router=Router();

router.route("/getallorders")
    .get(authenticateToken,GetAllOrders)

router.route("/getuserorders/:userId")
    .get(authenticateToken,GetUserOrders)
router.route("/getuseraucorders/:userId")
    .get(authenticateToken,GetAllUserAucOrders)

router.route("/successpayment/:orderId")
    .post(authenticateToken,PaymentSuccess)

router.route("/getoder/:orderId")
    .get(authenticateToken,GetOrder);
router.route("/getaucorder/:orderId")
    .get(authenticateToken,GetAucOrder);
export default router;
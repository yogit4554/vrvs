import {Router} from "express"
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register-user").post(verifyJWT,createUser);
router.route("/get-users").get(verifyJWT,getUsers);
router
    .route("/:id")
    .put(verifyJWT,updateUser)
    .delete(verifyJWT,deleteUser);

export default router
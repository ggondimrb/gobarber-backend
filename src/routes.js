const { Router } = require("express");

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointmentController";
import authMiddleware from "./app/middlewares/auth";
import multer from "multer";
import multerConfig from "./config/multer";
import ScheduleController from "./app/controllers/ScheduleController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);
// rotas que precisam do middleware
routes.put("/users", UserController.update);

routes.get("/providers", ProviderController.index);

routes.get("/appointments", AppointmentController.index);
routes.post("/appointment", AppointmentController.store);

routes.get("/schedule", ScheduleController.index);

routes.post("/files", upload.single("file"), FileController.store);

module.exports = routes;

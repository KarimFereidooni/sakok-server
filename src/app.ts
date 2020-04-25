import express, { Application } from "express";
import * as swagger from "swagger-express-ts";
import config from "../app-config.json";
import cors from "cors";
import mongoose from "mongoose";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import { ExceptionMiddleware } from "./middlewares/ExceptionMiddleware";
import TYPES from "./constants/types";
import { ProductsService } from "./services/ProductsService";
import "./controllers";
import "./models/ApiModels";

class App {
  public container = new Container();
  public server = new InversifyExpressServer(this.container);
  public app: Application = express();

  public constructor() {
    this.setMongoConfig();
    this.registerServices();
    this.server.setConfig((app) => {
      app.use(express.urlencoded({ extended: false }));
      app.use(morgan("tiny"));
      app.use(cors());
      app.use(express.json());
      app.use("/api-docs/swagger", express.static("swagger"));
      app.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
      app.use(
        swagger.express({
          definition: {
            schemes: ["http"],
            info: {
              title: "Sakok",
              version: "1.0",
            },
          },
        })
      );
    });

    this.server.setErrorConfig((app) => {
      app.use(ExceptionMiddleware.handle);
    });

    const serverInstance = this.server.build();
    this.app.use("/", serverInstance);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.MongoDbUrl, {
      useNewUrlParser: true,
    });
  }

  private registerServices() {
    this.container.bind<ProductsService>(TYPES.ProductsService).to(ProductsService);
  }
}

export default new App().app;

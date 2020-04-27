import { controller, httpPost, httpPut, httpGet, BaseHttpController, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from "../constants/types";
import { Request } from "express";
import { ApiPath, ApiOperationPost, SwaggerDefinitionConstant, ApiOperationPut, ApiOperationGet, ApiOperationDelete } from "swagger-express-ts";
import { ProductsService } from "../services/ProductsService";

@ApiPath({
  path: "/products",
  name: "Products",
  security: { basicAuth: [] },
})
@controller("/products")
export class ProductsController extends BaseHttpController {
  constructor(@inject(TYPES.ProductsService) private productsService: ProductsService) {
    super();
  }

  @ApiOperationGet({
    description: "Get products objects list",
    summary: "Get products list",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "Product",
      },
    },
    security: {
      apiKeyHeader: [],
    },
    parameters: {
      query: {
        name: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: false,
        },
        page: {
          type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
          required: true,
          default: 1,
        },
        itemsPerPage: {
          type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
          required: true,
          default: 10,
        },
        sortBy: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true,
          default: "name" as any,
        },
        sortDesc: {
          type: SwaggerDefinitionConstant.Parameter.Type.BOOLEAN,
          required: true,
          default: false as any,
        },
      },
    },
  })
  @httpGet("/")
  public async getProducts(request: Request) {
    let filter = {};
    if (request.query.name) {
      filter = { name: { $regex: request.query.name, $options: "i" } };
    }
    const skip = (parseInt(request.query.page.toString(), 10) - 1) * parseInt(request.query.itemsPerPage.toString(), 10);
    const limit = parseInt(request.query.itemsPerPage.toString(), 10);
    const sort =
      !request.query.sortDesc || request.query.sortDesc.toString().toLowerCase() === "false"
        ? [[request.query.sortBy, 1]]
        : [[request.query.sortBy, -1]];
    return this.json({
      items: await this.productsService.getProducts(filter, skip, limit, sort),
      totalCount: await this.productsService.getProductsCount(filter),
    });
  }

  @ApiOperationPost({
    description: "Create product",
    summary: "Create product",
    path: "/",
    parameters: {
      body: {
        required: true,
        model: "Product",
      },
    },
    responses: {
      200: { description: "Success" },
    },
  })
  @httpPost("/")
  public async createProduct(request: Request) {
    return this.json(await this.productsService.createProduct(request.body));
  }

  @ApiOperationPut({
    description: "Update product",
    summary: "Update product",
    path: "/{productId}",
    parameters: {
      body: {
        required: true,
        model: "Product",
      },
      path: {
        productId: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true,
        },
      },
    },
    responses: {
      200: { description: "Success" },
    },
  })
  @httpPut("/:productId")
  public async updateProduct(request: Request) {
    return this.json(await this.productsService.updateProduct(request.params.productId, request.body));
  }

  @ApiOperationDelete({
    description: "Delete product",
    summary: "Delete product",
    path: "/{productId}",
    parameters: {
      path: {
        productId: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true,
        },
      },
    },
    responses: {
      200: { description: "Success" },
    },
  })
  @httpDelete("/:productId")
  public async deleteProduct(request: Request) {
    return this.json(await this.productsService.deleteProduct(request.params.productId));
  }
}

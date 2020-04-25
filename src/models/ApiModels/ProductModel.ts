import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Product Model",
  name: "Product",
})
export class ProductModel {
  @ApiModelProperty({
    description: "Name of product",
    required: true,
  })
  name!: string;

  @ApiModelProperty({
    description: "Description of product",
    required: false,
  })
  description?: string;
}

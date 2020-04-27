import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";

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

  @ApiModelProperty({
    description: "Properties of product",
    required: false,
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: SwaggerDefinitionConstant.OBJECT,
    model: "ProductProperty",
  })
  properties?: [{ name: string; value: string }];
}

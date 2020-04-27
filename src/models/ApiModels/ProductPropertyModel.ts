import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";

@ApiModel({
  description: "Product property model",
  name: "ProductProperty",
})
export class ProductPropertyModel {
    @ApiModelProperty({
        description: "Name of property",
        required: true,
      })
      name!: string;
    
      @ApiModelProperty({
        description: "Value of property",
        required: true,
      })
      value!: string;
}

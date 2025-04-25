import { AppContext, useResponseSchemas, response400, responseNull, ResponseError, ResponseErrorSchema, buildResponseCodes, responseSuccess, responseError, ResponseForbidden} from "@tsdiapi/server";
import { Type } from "@sinclair/typebox";
import { Container } from "typedi";
import { {{pascalCase entityName}}Service } from "./{{kebabCase name}}.service.js";
import { QueryList{{pascalCase entityName}}Schema, OutputList{{pascalCase entityName}}Schema, Input{{pascalCase entityName}}Schema, Output{{pascalCase entityName}}Schema } from "@base/api/typebox-schemas/models/index.js";
import { JWTGuard } from "@tsdiapi/jwt-auth";

export default function {{lowerCase entityName}}Module({ useRoute }: AppContext): void {
    const {{lowerCase entityName}}Service = Container.get({{pascalCase entityName}}Service);
    const { codes, sendSuccess, sendError } = useResponseSchemas(OutputList{{pascalCase entityName}}Schema);

    // List items
    useRoute()
        .controller("items")
        .get("/")
        .version("1")
        .query(QueryList{{pascalCase entityName}}Schema)
        .codes(codes)
        .summary("List all items")
        .tags(["{{lowerCase entityName}}"])
        .handler(async (req) => {
            try {
                const { items, total } = await {{lowerCase entityName}}Service.list{{lowerCase entityName}}(req.query);
                return sendSuccess({
                    items: items,
                    total: total,
                    skip: req.query.skip,
                    take: req.query.take
                });
            } catch (error) {
                return error instanceof ResponseError ? error : response400("Failed to list items");
            }   
        })
        .build();



    // Get {{lowerCase entityName}} by ID
    useRoute()
        .controller("items")
        .get("/:id")
        .version("1")
        .codes(buildResponseCodes(Output{{pascalCase entityName}}Schema))
        .summary("Get {{lowerCase entityName}} by ID")
        .tags(["{{lowerCase entityName}}"])
        .params(Type.Object({ id: Type.String() }))
        .resolve(async (req) => {
            const {{lowerCase entityName}} = await {{lowerCase entityName}}Service.get{{pascalCase entityName}}ById(req.params.id);
            if (!{{lowerCase entityName}}) {
                throw responseError("{{pascalCase entityName}} not found");
            }
            return {{lowerCase entityName}};
        })
        .handler(async (req) => {
            try {
                const {{lowerCase entityName}} = req.routeData;
                return responseSuccess({{lowerCase entityName}});
            } catch (error) {
                return error instanceof ResponseError ? error : response400("Failed to get {{lowerCase entityName}}");
            }
        })
        .build();

    // Create {{lowerCase entityName}}
    useRoute()
        .controller("items")
        .post("/")
        .version("1")
        .codes(buildResponseCodes(Output{{pascalCase entityName}}Schema))
        .summary("Create a new {{lowerCase entityName}}")
        .tags(["{{lowerCase entityName}}"])
        .auth('bearer')
        .guard(JWTGuard())
        .body(Input{{pascalCase entityName}}Schema)
        .handler(async (req) => {
            const session = req.session;
            if (!session.adminId) {
                throw new ResponseForbidden("User not found");
            }
            try {
                const {{lowerCase entityName}} = await {{lowerCase entityName}}Service.create{{pascalCase entityName}}(req.body);
                return responseSuccess({{lowerCase entityName}});
            } catch (error) {
                return error instanceof ResponseError ? error : response400("Failed to create {{lowerCase entityName}}");
            }
        })
        .build();

    // Update {{lowerCase entityName}}
    useRoute()
        .controller("items")
        .put("/:id")
        .version("1")
        .codes(buildResponseCodes(Output{{pascalCase entityName}}Schema))
        .summary("Update {{lowerCase entityName}}")
        .tags(["{{lowerCase entityName}}"])
        .auth('bearer')
        .guard(JWTGuard())
        .params(Type.Object({ id: Type.String() }))
        .body(Input{{pascalCase entityName}}Schema)
        .resolve(async (req) => {
            const session = req.session;
            if (!session.adminId) {
                throw new ResponseForbidden("User not found");
            }
            const {{lowerCase entityName}} = await {{lowerCase entityName}}Service.get{{pascalCase entityName}}ById(req.params.id);
            if (!{{lowerCase entityName}}) {
                throw sendError("{{pascalCase entityName}} not found", {
                    errors: [{ message: "{{pascalCase entityName}} not found" }]
                });
            }
            return {{lowerCase entityName}};
        })
        .handler(async (req) => {
            try {
                const {{lowerCase entityName}} = await {{lowerCase entityName}}Service.update{{pascalCase entityName}}(req.params.id, req.body);
                return responseSuccess({{lowerCase entityName}});
            } catch (error) {
                return error instanceof ResponseError ? error : response400("Failed to update {{lowerCase entityName}}");
            }
        })
        .build();

    // Delete {{lowerCase entityName}}
    useRoute()
        .controller("items")
        .delete("/:id")
        .version("1")
        .code(204, Type.Null())
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .summary("Delete {{lowerCase entityName}}")
        .tags(["{{lowerCase entityName}}"])
        .auth('bearer')
        .guard(JWTGuard())
        .params(Type.Object({ id: Type.String() }))
        .resolve(async (req) => {
            const session = req.session;
            if (!session.adminId) {
                throw new ResponseForbidden("User not found");
            }
            const {{lowerCase entityName}} = await {{lowerCase entityName}}Service.get{{pascalCase entityName}}ById(req.params.id);
            if (!{{lowerCase entityName}}) {
                throw sendError("{{pascalCase entityName}} not found", {
                    errors: [{ message: "{{pascalCase entityName}} not found" }]
                });
            }
            return {{lowerCase entityName}};
        })
        .handler(async (req) => {
            try {
                await {{lowerCase entityName}}Service.delete{{pascalCase entityName}}(req.params.id);
                return responseNull();
            } catch (error) {
                return error instanceof ResponseError ? error : response400("Failed to delete {{lowerCase entityName}}");
            }
        })
        .build();
} 
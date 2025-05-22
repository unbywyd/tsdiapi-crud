import { AppContext, useResponseSchemas, response400, responseNull, ResponseError, ResponseErrorSchema, buildResponseCodes, responseSuccess, responseError, ResponseForbidden} from "@tsdiapi/server";
import { Type } from "@sinclair/typebox";
import { Container } from "typedi";
import { {{pascalCase entityName}}Service } from "./{{kebabCase name}}.service.js";
import { QueryList{{pascalCase entityName}}Schema, OutputList{{pascalCase entityName}}Schema, Input{{pascalCase entityName}}Schema, Output{{pascalCase entityName}}Schema } from "@base/api/typebox-schemas/models/index.js";
import { JWTGuard } from "@tsdiapi/jwt-auth";

export default function {{camelCase entityName}}Module({ useRoute }: AppContext): void {
    const {{camelCase entityName}}Service = Container.get({{pascalCase entityName}}Service);
    const { codes, sendSuccess, sendError } = useResponseSchemas(OutputList{{pascalCase entityName}}Schema);

    // List items
    useRoute()
        .controller("{{camelCase entityName}}")
        .get("/list")
        .version("1")
        .query(QueryList{{pascalCase entityName}}Schema)
        .codes(codes)
        .summary("List all items")
        .tags(["{{camelCase entityName}}"])
        .handler(async (req) => {
            try {
                const { items, total } = await {{camelCase entityName}}Service.list{{camelCase entityName}}(req.query);
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



    // Get {{camelCase entityName}} by ID
    useRoute()
        .controller("{{camelCase entityName}}")
        .get("/:id")
        .version("1")
        .codes(buildResponseCodes(Output{{pascalCase entityName}}Schema))
        .summary("Get {{camelCase entityName}} by ID")
        .tags(["{{camelCase entityName}}"])
        .params(Type.Object({ id: Type.String() }))
        .resolve(async (req) => {
            const {{camelCase entityName}} = await {{camelCase entityName}}Service.get{{pascalCase entityName}}ById(req.params.id);
            if (!{{camelCase entityName}}) {
                throw responseError("{{pascalCase entityName}} not found");
            }
            return {{camelCase entityName}};
        })
        .handler(async (req) => {
            try {
                const {{camelCase entityName}} = req.routeData;
                return responseSuccess({{camelCase entityName}});
            } catch (error) {
                return error instanceof ResponseError ? error : response400("Failed to get {{camelCase entityName}}");
            }
        })
        .build();

    // Create {{camelCase entityName}}
    useRoute()
        .controller("{{camelCase entityName}}")
        .post("/")
        .version("1")
        .codes(buildResponseCodes(Output{{pascalCase entityName}}Schema))
        .summary("Create a new {{camelCase entityName}}")
        .tags(["{{camelCase entityName}}"])
        .auth('bearer')
        .guard(JWTGuard())
        .body(Input{{pascalCase entityName}}Schema)
        .handler(async (req) => {
            const session = req.session;
            if (!session.adminId) {
                throw new ResponseForbidden("User not found");
            }
            try {
                const {{camelCase entityName}} = await {{camelCase entityName}}Service.create{{pascalCase entityName}}(req.body);
                return responseSuccess({{camelCase entityName}});
            } catch (error) {
                return error instanceof ResponseError ? error : response400("Failed to create {{camelCase entityName}}");
            }
        })
        .build();

    // Update {{camelCase entityName}}
    useRoute()
        .controller("{{camelCase entityName}}")
        .put("/:id")
        .version("1")
        .codes(buildResponseCodes(Output{{pascalCase entityName}}Schema))
        .summary("Update {{camelCase entityName}}")
        .tags(["{{camelCase entityName}}"])
        .auth('bearer')
        .guard(JWTGuard())
        .params(Type.Object({ id: Type.String() }))
        .body(Input{{pascalCase entityName}}Schema)
        .resolve(async (req) => {
            const session = req.session;
            if (!session.adminId) {
                throw new ResponseForbidden("User not found");
            }
            const {{camelCase entityName}} = await {{camelCase entityName}}Service.get{{pascalCase entityName}}ById(req.params.id);
            if (!{{camelCase entityName}}) {
                throw sendError("{{pascalCase entityName}} not found", {
                    errors: [{ message: "{{pascalCase entityName}} not found" }]
                });
            }
            return {{camelCase entityName}};
        })
        .handler(async (req) => {
            try {
                const {{camelCase entityName}} = await {{camelCase entityName}}Service.update{{pascalCase entityName}}(req.params.id, req.body);
                return responseSuccess({{camelCase entityName}});
            } catch (error) {
                return error instanceof ResponseError ? error : response400("Failed to update {{camelCase entityName}}");
            }
        })
        .build();

    // Delete {{camelCase entityName}}
    useRoute()
        .controller("{{camelCase entityName}}")
        .delete("/:id")
        .version("1")
        .code(204, Type.Null())
        .code(400, ResponseErrorSchema)
        .code(403, ResponseErrorSchema)
        .summary("Delete {{camelCase entityName}}")
        .tags(["{{camelCase entityName}}"])
        .auth('bearer')
        .guard(JWTGuard())
        .params(Type.Object({ id: Type.String() }))
        .resolve(async (req) => {
            const session = req.session;
            if (!session.adminId) {
                throw new ResponseForbidden("User not found");
            }
            const {{camelCase entityName}} = await {{camelCase entityName}}Service.get{{pascalCase entityName}}ById(req.params.id);
            if (!{{camelCase entityName}}) {
                throw sendError("{{pascalCase entityName}} not found", {
                    errors: [{ message: "{{pascalCase entityName}} not found" }]
                });
            }
            return {{camelCase entityName}};
        })
        .handler(async (req) => {
            try {
                await {{camelCase entityName}}Service.delete{{pascalCase entityName}}(req.params.id);
                return responseNull();
            } catch (error) {
                return error instanceof ResponseError ? error : response400("Failed to delete {{camelCase entityName}}");
            }
        })
        .build();
} 
import { PluginOptions } from "./index.js";
import type { AppContext } from "@tsdiapi/server";

export class CrudProvider {
    private config: PluginOptions;
    private context: AppContext;

    constructor(config: PluginOptions, ctx: AppContext) {
        this.config = config;
        this.context = ctx;
    }

    public init() {
        this.context.fastify.log.info(`Initializing Crud provider...`);
        // TODO: Your initialization logic here
    }
}
import type { AppContext, AppPlugin } from "@tsdiapi/server";

export type PluginOptions = {
}
const defaultConfig: PluginOptions = {
}

class App implements AppPlugin {
    name = 'tsdiapi-crud';
    config: PluginOptions;
    context: AppContext;
    services: AppPlugin['services'] = [];
    constructor(config?: PluginOptions) {
        this.config = { ...config };
    }
    async onInit(ctx: AppContext) {
        this.context = ctx;
    }
}

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}
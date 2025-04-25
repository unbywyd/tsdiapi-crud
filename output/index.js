const defaultConfig = {};
class App {
    name = 'tsdiapi-crud';
    config;
    context;
    services = [];
    constructor(config) {
        this.config = { ...config };
    }
    async onInit(ctx) {
        this.context = ctx;
    }
}
export default function createPlugin(config) {
    return new App(config);
}
//# sourceMappingURL=index.js.map
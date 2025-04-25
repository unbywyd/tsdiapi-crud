# **crud Plugin for TSDIAPI**

A TSDIAPI plugin that automatically generates CRUD (Create, Read, Update, Delete) REST API endpoints for your Prisma entities.

## 📌 About

This is a **TSDIAPI** plugin that serves as a code generator. It automatically creates fully functional CRUD REST API endpoints for your Prisma database entities. The generated code includes:

- Service layer with CRUD operations
- REST controllers with endpoints
- Type validation schemas
- Error handling
- JWT authentication integration

🔗 **TSDIAPI CLI:** [@tsdiapi/cli](https://www.npmjs.com/package/@tsdiapi/cli)

---

## 📦 Installation

You can install this plugin using npm:

```bash
tsdiapi add crud
```

---

## 🚀 Features

- 🛠 **Automatic CRUD Generation** - Generates complete CRUD API for any Prisma entity
- ⚡ **REST Endpoints** - Creates standard REST endpoints (GET, POST, PUT, DELETE)
- 🔒 **Built-in Security** - Includes JWT authentication
- 📝 **Type Safety** - Full TypeScript support with validation schemas
- 🔄 **Pagination** - Built-in support for list operations with pagination
- 🛡️ **Error Handling** - Comprehensive error handling and validation

---

## 🔧 Usage

To generate CRUD API for a Prisma entity, simply run:

```bash
tsdiapi generate crud <entityName>
```

Where `<entityName>` is your Prisma model name (e.g., User, Product, Order).

The generator will create:
- Service layer with CRUD operations
- REST controllers with endpoints
- Type validation schemas

### Generated Endpoints

For each entity, the following REST endpoints are created:

- `GET /` - List entities with pagination
- `GET /:id` - Get entity by ID
- `POST /` - Create new entity
- `PUT /:id` - Update entity
- `DELETE /:id` - Delete entity

---

## 🔗 Related Plugins

You can find more **TSDIAPI** plugins here:  
🔗 [Available Plugins](https://www.npmjs.com/search?q=%40tsdiapi)

---

## 👨‍💻 Contributing

Contributions are always welcome! If you have ideas for improving this plugin, feel free to open a pull request.

**Author:** unbywyd  
**GitHub Repository:** [https://github.com/unbywyd/tsdiapi-crud](https://github.com/unbywyd/tsdiapi-crud)  

📧 **Contact:** unbywyd@gmail.com

🚀 Happy coding with **TSDIAPI**! 🎉

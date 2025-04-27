import { Prisma } from '@generated/prisma/index.js';
import { Service } from "typedi";
import type { PrismaClient } from "@generated/prisma/index.js";
import { usePrisma } from "@tsdiapi/prisma";
import { Input{{pascalCase entityName}}SchemaType, QueryList{{pascalCase entityName}}SchemaType } from "@base/api/typebox-schemas/models/index.js";
import { ResponseBadRequest } from '@tsdiapi/server';

@Service()
export class {{pascalCase entityName}}Service {
    constructor() { }
    async list{{lowerCase entityName}}(query: QueryList{{pascalCase entityName}}SchemaType) {
        const prisma = usePrisma<PrismaClient>();
        const where: Prisma.{{pascalCase entityName}}WhereInput = {
            ...(query.dateAtLte && query.dateAtGte ? {
                createdAt: {
                    lte: query.dateAtLte,
                    gte: query.dateAtGte
                }
            } : {}),
            ...(query.dateAtLte || query.dateAtGte ? {
                createdAt: {
                    ...(query.dateAtGte && { gte: query.dateAtGte }),
                    ...(query.dateAtLte && { lte: query.dateAtLte })
                }
            } : {}),
            ...(query?.search ? {
                name: {
                    contains: query.search,
                    mode: "insensitive"
                }
            } : {}),
        }
        const results = await prisma.{{lowerCase entityName}}.findMany({
            take: query.take || 100,
            skip: query.skip || 0,
            ...(query?.orderBy ? {
                [query.orderBy]: query.orderDirection
            } : {}),
            where: where
        });
        const total = await prisma.{{lowerCase entityName}}.count({
            where: where
        });
        return {
            items: results,
            total: total
        }
    }

    async get{{pascalCase entityName}}ById(id: string) {
        const prisma = usePrisma<PrismaClient>();
        return prisma.{{lowerCase entityName}}.findUnique({
            where: { id }
        });
    }

    async create{{pascalCase entityName}}(data: Input{{pascalCase entityName}}SchemaType) {
        if (!data.name) {
            throw new ResponseBadRequest("Name is required");
        }
        const prisma = usePrisma<PrismaClient>();
        return prisma.{{lowerCase entityName}}.create({
            data: data as Prisma.{{pascalCase entityName}}CreateInput
        });
    }

    async update{{pascalCase entityName}}(id: string, data: Input{{pascalCase entityName}}SchemaType) {
        const prisma = usePrisma<PrismaClient>();
        return prisma.{{lowerCase entityName}}.update({
            where: { id },
            data: data as Prisma.{{pascalCase entityName}}UpdateInput
        });
    }

    async delete{{pascalCase entityName}}(id: string) {
        const prisma = usePrisma<PrismaClient>();
        return prisma.{{lowerCase entityName}}.delete({
            where: { id }
        });
    }
} 
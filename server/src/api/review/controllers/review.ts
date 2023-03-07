/**
 * review controller
 */

import { factories } from "@strapi/strapi";
import { parseMultipartData } from "@strapi/utils";

export default factories.createCoreController(
    "api::review.review",
    ({ strapi }) => ({
        async delete(ctx) {
            const entityId = ctx.params.id;
            let entity;

            const review = await strapi.entityService.findOne(
                "api::review.review",
                entityId,
                {
                populate: { author: true },
                }
            );

            if (!review) {
                return ctx.notFound("Not Found");
            }

            if (review.author?.id !== ctx.state.user.id) {
                return ctx.unauthorized("You cant delete this entry");
            }

            if (ctx.is("multipart")) {
                const { data, files } = parseMultipartData(ctx);
                entity = await strapi.entityService.delete(
                "api::review.review",
                entityId,
                { data },
                { files }
                );
            } else {
                entity = await strapi.entityService.delete(
                "api::review.review",
                entityId,
                ctx.request.body
                );
            }
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            return this.transformResponse(sanitizedEntity);
        },
        async update(ctx) {
            const entityId = ctx.params.id;
            let entity;

            const review = await strapi.entityService.findOne(
                "api::review.review",
                entityId,
                {
                populate: { author: true },
                }
            );

            if (!review) {
                return ctx.notFound("Not Found");
            }

            if (review.author?.id !== ctx.state.user.id) {
                return ctx.unauthorized("You cant delete this entry");
            }

            if (ctx.is("multipart")) {
                const { data, files } = parseMultipartData(ctx);
                entity = await strapi.entityService.update(
                "api::review.review",
                entityId,
                { data },
                { files }
                );
            } else {
                entity = await strapi.entityService.update(
                "api::review.review",
                entityId,
                ctx.request.body
                );
            }
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            return this.transformResponse(sanitizedEntity);
        }
    })
);

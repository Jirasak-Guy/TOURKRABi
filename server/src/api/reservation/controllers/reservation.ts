/**
 * reservation controller
 */

import { factories } from "@strapi/strapi";
import { parseMultipartData } from "@strapi/utils";

export default factories.createCoreController(
    "api::reservation.reservation",
    ({ strapi }) => ({
        async finds(ctx) {
        let reservation = await strapi.entityService.findMany(
            "api::reservation.reservation",
            {
            populate: { user: true },
            }
        );
        return reservation;
        },
        async delete(ctx) {
        const entityId = ctx.params.id;
        let entity;

        const reservation = await strapi.entityService.findOne(
            "api::reservation.reservation",
            entityId,
            {
            populate: { user: true },
            }
        );

        if (!reservation) {
            return ctx.notFound("Not Found");
        }

        if (reservation.user?.id !== ctx.state.user.id) {
            return ctx.unauthorized("You cant delete this entry");
        }

        if (ctx.is("multipart")) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.entityService.delete(
            "api::reservation.reservation",
            entityId,
            { data },
            { files }
            );
        } else {
            entity = await strapi.entityService.delete(
            "api::reservation.reservation",
            entityId,
            ctx.request.body
            );
        }
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
        },
    })
);

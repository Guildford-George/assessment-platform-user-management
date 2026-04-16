import express from "express";
import OrganizationController from "../controllers/organizationController";

const organizationRouter = express.Router();
organizationRouter.post("", OrganizationController.createOrganization);
organizationRouter.get("", OrganizationController.getOrganizationList);
organizationRouter.get(
    "/:organizationId",
    OrganizationController.getOrganization,
);
organizationRouter.put(
    "/:organizationId",
    OrganizationController.updateOrganization,
);
organizationRouter.delete(
    "/:organizationId",
    OrganizationController.deleteOrganization,
);
organizationRouter.put(
    "/:organizationId/deactive",
    OrganizationController.deactivateOrganization,
);
organizationRouter.put(
    "/:organizationId/activate",
    OrganizationController.activateOrganization,
);

export default organizationRouter;

import { Request, Response } from "express";
import OrganizationService from "../services/organizationService";

class OrganizationController {
    static async createOrganization(req: Request, res: Response) {
        try {
            const organization = await OrganizationService.createOrganization(req.body)
            res.status(201).json({
                success: true,
                data: {
                    organization
                }
            })
        } catch (error) {

        }
    }


    static async updateOrganization(req: Request, res: Response) {
        try {
            const { organizationId } = req.params as { organizationId: string }
            const organization = await OrganizationService.updateOrganization(organizationId, req.body)
            res.status(201).json({
                success: true,
                data: {
                    organization
                }
            })
        } catch (error) {

        }
    }

    static async getOrganizationList(req: Request, res: Response) {
        try {
            const organizations = await OrganizationService.getOrganizationList(req.query.name as string)
            res.status(200).json({
                success: true,
                data: {
                    organizations
                }
            })
        } catch (error) {

        }
    }

    static async getOrganization(req: Request, res: Response) {
        try {
            const { organizationId } = req.params as { organizationId: string }
            const organization = await OrganizationService.getOrganization(organizationId)
            res.status(200).json({
                success: true,
                data: {
                    organization
                }
            })
        } catch (error) {

        }
    }

    static async deleteOrganization(req: Request, res: Response) {
        try {
            const { organizationId } = req.params as { organizationId: string }
            await OrganizationService.deleteOrganization(organizationId)
            res.status(204)
        } catch (error) {

        }
    }

    static async activateOrganization(req: Request, res: Response) {
        try {
            const { organizationId } = req.params as { organizationId: string }
            const organization = await OrganizationService.activateOrganization(organizationId)
            res.status(200).json({
                success: true,
                data: {
                    organization
                }
            })
        } catch (error) {

        }
    }
    static async deactivateOrganization(req: Request, res: Response) {
        try {
            const { organizationId } = req.params as { organizationId: string }
            const organization = await OrganizationService.deactivateOrganization(organizationId)
            res.status(200).json({
                success: true,
                data: {
                    organization
                }
            })
        } catch (error) {

        }
    }

}

export default OrganizationController
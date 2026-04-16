import { AccountStatus } from "../../generated/prisma/enums";
import { CreateOrganizationDto, CreateOrganizationEntity, UpdateOrganizationDto} from "../lib/dtos/organizationDto";
import OrganizationRepository from "../repository/OrganizationRepository";

class OrganizationService {
    static async createOrganization(createOrganizationDto: CreateOrganizationDto){
        const createOrganizationEntity: CreateOrganizationEntity= {
            admin_email: createOrganizationDto.email,
            name: createOrganizationDto.name
        }
        return OrganizationRepository.createOrganization(createOrganizationEntity)
    }
    static async updateOrganization(organizationId: string,updateOrganizationDto: UpdateOrganizationDto){
        const {logo,name}= updateOrganizationDto
        return OrganizationRepository.updateOrganization(organizationId, {logo,name})
    }
    static async getOrganizationList(name: string){
        return OrganizationRepository.getOrganizationList(name)
        
    }
    static async getOrganization(organizationId: string){
        return OrganizationRepository.getOrganization(organizationId)
    }

    static async deleteOrganization(organizationId: string){
        return OrganizationRepository.deleteOrganization(organizationId)
    }

    static async activateOrganization(organizationId: string){
        return OrganizationRepository.updateOrganizationStatus(organizationId, AccountStatus.ACTIVE)
    }
    static async deactivateOrganization(organizationId: string){
        return OrganizationRepository.updateOrganizationStatus(organizationId, AccountStatus.DEACTIVED)
    }
}

export default OrganizationService
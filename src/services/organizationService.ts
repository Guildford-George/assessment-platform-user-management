import { AccountStatus } from "../../generated/prisma/enums";
import { CreateOrganizationDto, CreateOrganizationEntity, UpdateOrganizationDto} from "../lib/dtos/organizationDto";
import ProducerFactory from "../lib/kafka/publish/producerFactory";
import OrganizationRepository from "../repository/OrganizationRepository";

class OrganizationService {
    static async createOrganization(createOrganizationDto: CreateOrganizationDto){
        const createOrganizationEntity: CreateOrganizationEntity= {
            admin_email: createOrganizationDto.email,
            name: createOrganizationDto.name
        }
        const organization= await OrganizationRepository.createOrganization(createOrganizationEntity)

        // report event
        await ProducerFactory.createOrganizationEvent(organization)

        return organization
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
        const organization= await OrganizationRepository.deleteOrganization(organizationId)

        // report event
        await ProducerFactory.deleteOrganizationEvent(organization)

        return organization
    }

    static async activateOrganization(organizationId: string){
        const organization= await OrganizationRepository.updateOrganizationStatus(organizationId, AccountStatus.ACTIVE)

        // report event
        await ProducerFactory.organizationStatusEvent(organization)
        return organization
    }
    static async deactivateOrganization(organizationId: string){
        const organization= await OrganizationRepository.updateOrganizationStatus(organizationId, AccountStatus.DEACTIVED)

        // report event
        await ProducerFactory.organizationStatusEvent(organization)
        
        return organization
    }
}

export default OrganizationService
import {Kafka, logLevel, Producer, } from "kafkajs"
import { KafkaTopics } from "../topics"
import { AccountStatus, Organization, User } from "../../../../generated/prisma/client"
import { OrganizationUserEventPayload, NewOrganizationUserEventPublish, UpdateOrganizationUserEventPublish, OrganizationUserStatusEventPayload, OrganizationuserStatusEventPublish, DeleteOrganizationUserEventPublish, DeleteOrganizationUserEventPayload } from "../../type"
import OrganizationService from "../../../services/organizationService"
import OrganizationRepository from "../../../repository/OrganizationRepository"
import UserRepository from "../../../repository/userRepository"
import producerInitialiser from "./producerInitialiser"

export class ProducerFactory {

    // User-based event start here
    static async newOrganizationUserEvent(data:NewOrganizationUserEventPublish){
        const {user, organizationId, roleId}= data
        const organization= await OrganizationRepository.getOrganization(organizationId) as Organization
        
        const payload: OrganizationUserEventPayload= {
            user,
            organization,
            roleId
        }
        await producerInitialiser.sendEvent(KafkaTopics.NEW_ORGANIZATION_USER, payload)
    }
    static async updateOrganizationUserEvent(data: UpdateOrganizationUserEventPublish){
        const {userId, organizationId, roleId}= data
        const user= await UserRepository.getUserById(userId) as User
        const organization= await OrganizationRepository.getOrganization(organizationId) as Organization
        const payload: OrganizationUserEventPayload= {
            user,
            organization,
            roleId
        }
        await producerInitialiser.sendEvent(KafkaTopics.UPDATE_ORGANIZATION_USER, payload)
    }

    static async organizationUserStatusEvent(data: OrganizationuserStatusEventPublish){
        const {userId, organizationId, status}= data
        const user= await UserRepository.getUserById(userId) as User
        const organization= await OrganizationRepository.getOrganization(organizationId) as Organization
        const payload: OrganizationUserStatusEventPayload= {
            user,
            organization,
            status
        }
        await producerInitialiser.sendEvent(KafkaTopics.ORGANIZATION_USER_STATUS, payload)
    }

    static async deleteOrganizationUserEvent(data: DeleteOrganizationUserEventPublish){
        const {organizationId,userId}= data
        const user= await UserRepository.getUserById(userId) as User
        const organization= await OrganizationRepository.getOrganization(organizationId) as Organization
        const payload: DeleteOrganizationUserEventPayload= {
            user,
            organization,
        }
        await producerInitialiser.sendEvent(KafkaTopics.DELETE_ORGANIZATION_USER, payload)
    }
    
    static async deleteUserEvent(data: DeleteOrganizationUserEventPublish){
        const {organizationId,userId}= data
        const user= await UserRepository.getUserById(userId) as User
        const organization= await OrganizationRepository.getOrganization(organizationId) as Organization
        const payload: DeleteOrganizationUserEventPayload= {
            user,
            organization,
        }
        await producerInitialiser.sendEvent(KafkaTopics.DELETE_USER, payload)
    }
    

    // end here


    // Organization-based events start here

    static async createOrganizationEvent(data: {organization: Organization, user:User}){
        await producerInitialiser.sendEvent(KafkaTopics.CREATE_ORGANIZATION, data)
    }

    static async deleteOrganizationEvent(data: {organization: Organization, users:User[]}){
        await producerInitialiser.sendEvent(KafkaTopics.DELETE_ORGANIZATION, data)
    }

    static async organizationStatusEvent(data: {organization: Organization, users:User[], status: AccountStatus}){
        await producerInitialiser.sendEvent(KafkaTopics.ORGANIZATION_ACCOUNT_STATUS, data)
    }
}

export default ProducerFactory
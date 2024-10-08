import type SendNotificationAdditionalData from '~/@types/helpers/SendNotificationAdditionalData';
import axios from 'axios';
import * as fs from 'fs';
const { PDFDocument } = require('pdf-lib');


const apiUrl = 'https://api.docuseal.co/templates/pdf';

const Estimates = require('./estimates.js');
import { Container, Service } from 'typedi';
import type { IEstimatesService } from './interfaces/IEstimatesService.interface';
import type Estimate from '~/@types/Estimate/Estimate';

import {
    NotificationServiceToken,
} from '../app/Notifications/Services/Estimates/NotificationsServicesEstimates';
import { UserDTO } from '~/db/api/dtos/users.dto';
import jwt from "jsonwebtoken";
import {json} from "express";
import config from "../config";
const AUTH_TOKEN = config.docuseal_token;

const notificationService = Container.get(NotificationServiceToken);



async function convertPdfToBase64(estimate: Estimate, filePath: string):  Promise<any>  {
    const pdfSubject = {
        estimate_id: estimate.id,
        related_contact: estimate.related_contact,
    }
    const pdfFile = fs.readFileSync(filePath);
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfFile);

    // Add or modify metadata
    pdfDoc.setTitle('Modified PDF Title');
    pdfDoc.setAuthor('Evans CRM');
    pdfDoc.setSubject(JSON.stringify(pdfSubject));
    pdfDoc.setKeywords(['PDF', 'Base64', 'Metadata']);

    // Save the modified PDF and return as Uint8Array
    const modifiedPdfBytes = await pdfDoc.save();

    // Convert Uint8Array to Base64 string
    const base64String = Buffer.from(modifiedPdfBytes).toString('base64');
    return base64String;
}

async function uploadTemplate(base64: string, estimateName: string): Promise<any> {
    const data = {
        "name": estimateName,
        "body": "Test body",
        "message": {
            "subject": "Test subject",
            "body": "Test body",
        },
        "documents": [
            {
                "name": estimateName,
                "file" : base64
            }
        ]
    }
    const response = await axios.post(apiUrl, data, {
        headers: {
            'X-Auth-Token': AUTH_TOKEN,
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 200 && response.data) {
        return {
            url: response.data.documents[0].url,
            template_id: response.data.id,
        }
    }
    return false;
}

async function getToken(documentUrl: string, template_id: number, estimate: Estimate): Promise<string>{

    const waitForDocumentUrl = async (interval: number, maxRetries: number): Promise<string> => {
        let retries = 0;
        while (!documentUrl && retries < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, interval)); // Wait for the specified interval
            retries++;
        }
        return documentUrl;
    };

    // Call the helper function to wait for the documentUrl
    const url = waitForDocumentUrl;

    return jwt.sign({
        user_email: config.docuseal_user_email,
        integration_email: config.docuseal_integration_email,
        external_id: estimate.related_contact,
        name: estimate.name,
        template_id: template_id,
        message:{
            subject: "test estimate",
            body: 'test body',
        },
        document_urls: [url],
    }, config.docuseal_token);

    return 'not token found'
}

@Service()
export default class EstimatesService
    extends Estimates
    implements IEstimatesService {

    create(data: any, currentUser: UserDTO): Promise<void> {
        return Estimates.create(data, currentUser)
    }
    bulkImport(req: Request, res: Response, sendInvitationEmails?: boolean, host?: string): Promise<void> {
        return Estimates.bulkImport(req, res, sendInvitationEmails, host)
    }
    update(data: any, id: string, currentUser: UserDTO): Promise<any> {
        return Estimates.update(data, id, currentUser)
    }
    deleteByIds(ids: string[], currentUser: UserDTO): Promise<void> {
        return Estimates.deleteByIds(ids, currentUser)
    }
    remove(id: string, currentUser: UserDTO): Promise<void> {
        return Estimates.remove(id, currentUser)
    }

    async sendToCustomer (estimate: Estimate, additionalData: SendNotificationAdditionalData): Promise<boolean> {
        return notificationService.sendToCustomer(estimate, additionalData)
    }

    async prepareToken (estimate: Estimate, additionalData: SendNotificationAdditionalData): Promise<any> {
        if (additionalData.attachments && additionalData.attachments.length > 0) {
            const base64Pdf = convertPdfToBase64(estimate, additionalData.attachments[0].path);
            if (base64Pdf){
                const {url, template_id} = await uploadTemplate(await base64Pdf, estimate.name)
                if (await url){
                    return getToken(await url, template_id, estimate)
                }
            }
        }
        // return notificationService.sendToCustomer(estimate, additionalData)
    }

}

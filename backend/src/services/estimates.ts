import type SendNotificationAdditionalData from '~/@types/helpers/SendNotificationAdditionalData';
import axios from 'axios';
import * as fs from 'fs';
const { PDFDocument } = require('pdf-lib');

const AUTH_TOKEN = 'wJcEYmfa4YdA5VR9u4udfn27tyNLhGcvFYvK16nrkHe';
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

const notificationService = Container.get(NotificationServiceToken);



async function convertPdfToBase64(filePath: string):  Promise<any>  {
    const pdfFile = fs.readFileSync(filePath);
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfFile);

    // Add or modify metadata
    pdfDoc.setTitle('Modified PDF Title');
    pdfDoc.setAuthor('Pena Muhammedov');
    pdfDoc.setSubject('Updated PDF Metadata Example');
    pdfDoc.setKeywords(['PDF', 'Base64', 'Metadata']);

    // Save the modified PDF and return as Uint8Array
    const modifiedPdfBytes = await pdfDoc.save();

    // Convert Uint8Array to Base64 string
    const base64String = Buffer.from(modifiedPdfBytes).toString('base64');
    return base64String;
}

async function uploadTemplate(base64: string): Promise<any> {
    const data = {
        "name": "Estimate",
        "documents": [
            {
                "name": "Estimate",
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

async function getToken(documentUrl: string, template_id: number): Promise<string>{

    const waitForDocumentUrl = async (interval: number, maxRetries: number): Promise<string> => {
        let retries = 0;
        while (!documentUrl && retries < maxRetries) {
            console.log('Waiting for documentUrl...');
            await new Promise((resolve) => setTimeout(resolve, interval)); // Wait for the specified interval
            retries++;
        }
        return documentUrl;
    };

    // Call the helper function to wait for the documentUrl
    const url = "https://www.irs.gov/pub/irs-pdf/fw9.pdf";

    console.log('documentUrl =================================================================',documentUrl)
        return jwt.sign({
            user_email: 'pena@thedigitalronin.com',
            integration_email: 'signer@example.com',
            external_id: 'TestForm123',
            name: 'Estimate',
            template_id: template_id,
            document_urls: [documentUrl],
        }, 'wJcEYmfa4YdA5VR9u4udfn27tyNLhGcvFYvK16nrkHe');

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
            const base64Pdf = convertPdfToBase64(additionalData.attachments[0].path);
            if (base64Pdf){
                const {url, template_id} = await uploadTemplate(await base64Pdf)
                if (await url){
                    return getToken(await url, template_id)
                }
            }
        }
        // return notificationService.sendToCustomer(estimate, additionalData)
    }






}

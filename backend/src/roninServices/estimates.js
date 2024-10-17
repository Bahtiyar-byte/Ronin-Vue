import axios from "axios";
const { promises: fsPromises } = require('fs');
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const EstimatesDBApi = require('../db/api/estimates');
const EstimatesService = require('../services/estimates');
const fs = require('fs');
const path = require('path');
const db = require("../db/models");
const jwt = require('jsonwebtoken');
import config from "../config";
const AUTH_TOKEN = config.docuseal_token;
const pdfParse = require('pdf-parse');
import { PDFDocument } from 'pdf-lib';

const uploadsFolder = path.join(__dirname, '../..' , 'uploads');
if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder);
}

const apiUrl = 'https://api.docuseal.co/submissions';

const eventEmitter = require('../utils/eventEmitter')

module.exports = class RoninEstimatesService extends EstimatesService {

    static async create(data, currentUser) {
        const transaction = await db.sequelize.transaction();
        try {
            let estimates = await EstimatesDBApi.create(data, {
                currentUser,
                transaction,
            });

            await transaction.commit();

            estimates = await EstimatesDBApi.findBy({ id: estimates.id });

            if (data.attachments !== undefined) {
                estimates = {
                    ...estimates,
                    attachments: data.attachments,
                }
            }

            if (data.notifyContact !== undefined) {
                estimates = {
                    ...estimates,
                    notifyContact: data.notifyContact,
                }
            }

            eventEmitter.emit('estimateCreated', estimates);

            return estimates;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async update(data, id, currentUser) {
        const oldEstimate = await super.update(data, id, currentUser);

        const estimates = await EstimatesDBApi.findBy({ id: id });

        eventEmitter.emit('estimateUpdated', estimates, oldEstimate);

        return estimates;
    }

    static async readEmailInbox(){


// IMAP connection setup
        const imap = new Imap({
            user: 'info@thedigitalronin.com',
            password: 'wfsbknllzrqoewlb',
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
        });

        imap.once('error', function(err) {
            console.log(err);
        });

// Function to open the IMAP inbox
        function openInbox(cb) {
            imap.openBox('INBOX', true, cb);
        }

// Fetch unseen emails from the inbox
        function fetchEmails() {
            imap.once('ready', function () {
                openInbox(function (err, box) {
                    if (err) throw err;

                    imap.search(['UNSEEN'], function (err, results) {
                        if (err) throw err;

                        const f = imap.fetch(results, { bodies: '' });

                        f.on('message', function (msg, seqno) {
                            msg.on('body', function (stream, info) {
                                simpleParser(stream, (err, parsed) => {
                                    if (err) console.error('Email parsing error:', err);

                                    const lines = parsed.text.split('\n');
                                    const filteredLines = lines.filter(line => line.startsWith('https://docuseal.co/submissions/'));
                                    RoninEstimatesService.getSubmissionId(filteredLines)
                                });
                            });
                        });

                        f.once('end', function () {
                            imap.end();
                        });
                    });
                });
            });

            imap.once('error', function (err) {
                console.error('IMAP Error:', err);
            });

            imap.once('end', function () {
                console.log('IMAP connection closed');
                fetchEmails()
            });

            // Connect to the IMAP server
            imap.connect();
        }
        fetchEmails()
    }

    static async saveSignedEstimate( submissionId ){

        const {data} = await axios.get(`${apiUrl}/${submissionId}`, {
            headers: {
                'X-Auth-Token': AUTH_TOKEN,
                'Content-Type': 'application/json',
            },
        });
        if (data){
            const fileUrl = data.documents[0].url; // Replace with actual PDF URL
            const filePath = path.join(uploadsFolder, submissionId + 'downloaded.pdf');

            if (fs.existsSync(filePath)) {
            } else {


                // Define file path for saving

                // Stream the file from the URL
                const response = await axios({
                    method: 'GET',
                    url: fileUrl,
                    responseType: 'stream',
                });

                const writer = fs.createWriteStream(filePath);
                response.data.pipe(writer);

                // Listen for finish event to confirm download is complete
                writer.on('finish', async() => {
                    const transaction = await db.sequelize.transaction();
                    const dataBuffer = fs.readFileSync(filePath);


                    const pdfDoc = await PDFDocument.load(dataBuffer);

                    const subject = pdfDoc.getSubject()


                    if (subject){
                        const metadataSubject = JSON.parse(subject);

                        const estimateId = metadataSubject.estimate_id
                        const estimate = await db.estimates.findByPk(estimateId, {}, { transaction });

                        await estimate.update(
                            {
                                status: 'Approved',
                            },
                            { transaction },
                        );
                        // const newFilePath = path.join(__dirname, 'uploads', `${estimate.name}.pdf`);
                        const newFilePath = path.join(uploadsFolder, `${estimate.name}.pdf`);
                        await transaction.commit();
                        // await fs.copyFile(filePath, newFilePath);
                        await fs.copyFile(filePath, newFilePath, (err) => {
                        });
                    }

                });



                // Handle any error during writing to file
                writer.on('error', (error) => {
                });
            }

        }
    }


    static async getSubmissionId(submissions) {


        if (submissions.length > 0){
            const submission = submissions[0]
            const submissionId = submission.match(/\d+/g);
            RoninEstimatesService.saveSignedEstimate(submissionId[0])
        }
    }
}

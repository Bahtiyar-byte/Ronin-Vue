const { getNotification } = require('../notifications/helpers');
const path = require('node:path');
const { promises: fs } = require('node:fs');
const config = require('../../config');

module.exports = class EmailUtils {
    /**
     *
     * @param {string} header
     * @param {string} body
     * @returns {Promise<void>}
     */
    async renderDefaultEmail (header, body) {
        try {
            const templatePath = path.join(
                __dirname,
                './htmlTemplates/snippets/defaultMail.html',
            );

            const template = await fs.readFile(templatePath, 'utf8');

            return template
                .replace(/{ app_title }/g, getNotification('app.title'))
                .replace(/{ support_email }/g, config.email.auth.user)
                .replace(/{ header }/g, header)
                .replace(/{ body }/, body)

        } catch (error) {
            console.error('Error generating default email HTML:', error);
            throw error;
        }
    }
}

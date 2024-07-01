
export default interface Email {
    to: string;
    subject: string;
    html(): Promise<string>;
}

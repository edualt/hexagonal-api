export interface EmailInterface {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}

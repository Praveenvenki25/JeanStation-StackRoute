export default class Notification {
    NotificationId: string;
    AddressId: string;
    UserId: string;
    OrderId: string;
    EmailSentDate: Date;
    constructor() {
        this.NotificationId = "";
        this.AddressId = "";
        this.UserId = "";
        this.OrderId = "";
        this.EmailSentDate = new Date();
    }
} 
import { Session } from "inspector";
import { Logger } from "../common";
import { SessionStatus } from "../models";

export class SessionStatusController {
    private static instance: SessionStatusController;
    private log: Logger;

    private constructor() {
        this.log = new Logger();
    }

    public insertSessionStatus(pGUID:string, pStatus:boolean) {
        const newSessionStatus = new SessionStatus({
            guid: pGUID,
            status: pStatus,
            timestamp: new Date()
        });
        return newSessionStatus.save();
    }

    public static getInstance() : SessionStatusController {
        if (!this.instance) {
            this.instance = new SessionStatusController();
        }
        return this.instance;
    }
}
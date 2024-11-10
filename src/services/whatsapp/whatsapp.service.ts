import { OpenAccountStep } from "./steps/openaccount";
import { TransferStep } from "./steps/transfer";
import { WhatsAppBaseService } from "./whatsapp.base";
import { steps } from "./whatsapp.const";
import { buttonMessage, cancelMessageStep, initialStep, openMessageStep } from "./whatsapp.payloads";
import { MessageType, WhatsAppMessagePayload } from "./whatsapp.types";

const BASE_URL = process.env.BASE_URL;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const supportPhoneNumber = process.env.SUPPORT_PHONE_NUMBER;
export class WhatsAppService extends WhatsAppBaseService {
    private readonly openAccount;
    private readonly transferStep;
    constructor() {
        super();
        this.openAccount = new OpenAccountStep();
        this.transferStep = new TransferStep();
    }

    triggerMessagesLogic = async (messageDto: WhatsAppMessagePayload[]) => {
        const mostRecentMessage = messageDto[0];
        const fromPhoneNumber = mostRecentMessage.from;
        console.log("most recent message", mostRecentMessage);
        const customerName = mostRecentMessage.contacts?.[0]?.profile?.name || '';

        const isFirstMessage = ["hello", "hi"].includes((mostRecentMessage.text?.body ?? "").toLowerCase());

        if (isFirstMessage) {
            const payload = initialStep(fromPhoneNumber, customerName);
            await this.sendInteractiveWhatsAppMessage(payload);
            return;
        }
        // might not be from an interactive list
        // TODO: handle when someone sends a message by just typing  
        const isFromInteractiveMessage = mostRecentMessage.type === MessageType.INTERACTIVE;
        if (isFromInteractiveMessage) {
            const customerChoice = mostRecentMessage.interactive?.list_reply.title;

            const stepId = mostRecentMessage.interactive?.list_reply.id ?? ""
            console.log("Stepid", stepId)
            // handle Open option
            if (stepId.includes(steps.OPEN.OPEN)) {
                if (customerChoice?.includes("Open Account")) {
                    await this.handleOpenSelection(fromPhoneNumber, customerName);
                }
                if (stepId.includes(steps.OPEN.DONE.DONE)) {
                    if (stepId === steps.OPEN.OPEN_DONE) {
                        await this.openAccount.handleDoneSelection(fromPhoneNumber);
                    }

                    if (stepId === steps.OPEN.DONE.DONE_OPEN_PHONE) {
                        // customer selected phone for verification
                        await this.openAccount.handlePhoneVerificationSelection(fromPhoneNumber);
                    }

                    if (stepId === steps.OPEN.DONE.DONE_OPEN_EMAIL) {
                        // customer selected email for verification
                        await this.openAccount.handleEmailVerificationSelection(fromPhoneNumber);
                    }

                    if (stepId === steps.OPEN.DONE.DONE_OPEN_CONFIRMED) {
                        // Phone or email Verification Confirmed/Confirmation
                        await this.openAccount.handleVerificationConfirmedSelection(fromPhoneNumber);
                    }

                    if (stepId === steps.OPEN.DONE.DONE_OPEN_DID_NOT_SEE_CODE) {
                        // customer says they did not see the code
                        await this.openAccount.handleDidNotSeeCodeSelection(fromPhoneNumber);
                    }

                    if (stepId === steps.OPEN.DONE.DONE_OPEN_CONFIRMED_PROCEED) {
                        // customer has set their security question and clicked proceed
                        await this.openAccount.handleProceedAfterSecurityQuestionSelection(fromPhoneNumber);
                    }

                    if (stepId === steps.OPEN.DONE.DONE_OPEN_NO_CODE_2FA) {
                        // customer has set their security question and want to set additional 2FA
                        // TODO:
                    }

                    if (stepId === steps.OPEN.DONE.DONE_OPEN_BEGIN) {
                        // customer has proceeded and clicked begin
                        
                    }

                }
                if (stepId === steps.OPEN.OPEN_CANCEL) {
                    // customer cancels the Open account step
                    await this.openAccount.handleCancelSelection(fromPhoneNumber);
                }
            }

            // handle transfer step
            if (stepId.includes(steps.TRANSFER.TRANSFER)) {
                if (stepId === steps.TRANSFER.TRANSFER) {
                    await this.transferStep.handleTransferSelection(fromPhoneNumber);
                }
            }

            if (customerChoice?.includes("Customer Support")) {
                // customer contacts customer support
                await this.handleCustomerSupport(fromPhoneNumber)
            }
        }
        
        // edgecases
        
        // customer types 13 or begin
    }

    handleOpenSelection = async (to: string, customerName: string) => {
        const openStepMessagePayload = openMessageStep(to, customerName);
        await this.sendWhatsAppMessage(openStepMessagePayload);

    }

    handleCustomerSupport = async (to: string) => {
        if (supportPhoneNumber) {
            const buttonMessagePayload = buttonMessage(to, supportPhoneNumber);
            await this.sendWhatsAppMessage(buttonMessagePayload);
        }
    }

    sendRegularWhatsAppMessage = async (to: string, message: string) => {
        const url = `${BASE_URL}/${PHONE_NUMBER_ID}/messages`;

        const payload = {
            messaging_product: 'whatsapp',
            to,
            type: 'text',
            text: { body: message },
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('Message sent:', data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    sendInteractiveWhatsAppMessage = async (payload: object) => {
        const url = `${BASE_URL}/${PHONE_NUMBER_ID}/messages`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('Message sent:', data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}


import { BeneficiariesStep } from "./steps/beneficiaries";
import { OpenAccountStep } from "./steps/openaccount";
import { TransferStep } from "./steps/transfer";
import { WhatsAppBaseService } from "./whatsapp.base";
import { envVariables, steps } from "./whatsapp.const";
import { buttonMessage, initialStep, openMessageStep } from "./whatsapp.payloads";
import { MessageType, WhatsAppMessagePayload } from "./whatsapp.types";

export class WhatsAppService extends WhatsAppBaseService {
    private readonly openAccount;
    private readonly transferStep;
    private readonly beneficiariesStep;
    constructor() {
        super();
        this.openAccount = new OpenAccountStep();
        this.transferStep = new TransferStep();
        this.beneficiariesStep = new BeneficiariesStep();
    }

    triggerMessagesLogic = async (messageDto: WhatsAppMessagePayload[]) => {
        const mostRecentMessage = messageDto[0];
        const fromPhoneNumber = mostRecentMessage.from;

        const customerName = mostRecentMessage.contacts?.[0]?.profile?.name || '';

        const greetings = ["hello ", "hi", "hey"];
        const isFirstMessage = greetings.some(greet =>
            (mostRecentMessage.text?.body ?? "").toLowerCase().includes(greet)
        );

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
                        await this.openAccount.handleBeginSelection(fromPhoneNumber)
                    }

                    if (stepId === steps.OPEN.DONE.DONE_OPEN_FUND_WALLET) {
                        // customer has proceeded and clicked begin
                        await this.openAccount.handleSendFundWalletSelection(fromPhoneNumber)
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

                if (stepId === steps.TRANSFER.TRANSFER_PROCEED) {
                    await this.transferStep.handleProceedSelection(fromPhoneNumber);
                }
            }

            // handle beneficiaries step
            if (stepId.includes(steps.BENEFICIARIES.BENEFICIARIES)) {

                if (stepId === steps.BENEFICIARIES.BENEFICIARIES) {
                    await this.beneficiariesStep.handleBeneficiariesSelection(fromPhoneNumber)
                }

                if (stepId === steps.BENEFICIARIES.BENEFICIARIES_CREATE) {
                    await this.beneficiariesStep.handleBeneficiariesCreateSelection(fromPhoneNumber)
                }

                if (stepId === steps.BENEFICIARIES.BENEFICIARIES_CREATE_PROCEED) {
                    await this.beneficiariesStep.handleBeneficiariesCreateProceedSelection(fromPhoneNumber)
                }

                // Edit
                if (stepId === steps.BENEFICIARIES.BENEFICIARIES_EDIT) {
                    await this.beneficiariesStep.handleBeneficiariesEditSelection(fromPhoneNumber)
                }

                if (stepId === steps.BENEFICIARIES.BENEFICIARIES_EDIT_PROCEED) {
                    await this.beneficiariesStep.handleBeneficiariesEditProceedSelection(fromPhoneNumber)
                }
            }

            if (customerChoice?.includes("Customer Support")) {
                // customer contacts customer support
                await this.handleCustomerSupport(fromPhoneNumber)
            }
        }

        // edgecases

        // customer types 13 or begin
        if (!isFromInteractiveMessage) {

            if (mostRecentMessage.text?.body === "13") {
                await this.openAccount.handleBeginSelection(fromPhoneNumber)
            }
        }
    }

    handleOpenSelection = async (to: string, customerName: string) => {
        const openStepMessagePayload = openMessageStep(to, customerName);
        await this.sendWhatsAppMessage(openStepMessagePayload);

    }

    handleCustomerSupport = async (to: string) => {
        const { supportPhoneNumber } = envVariables;
        if (supportPhoneNumber) {
            const buttonMessagePayload = buttonMessage(to, supportPhoneNumber);
            await this.sendWhatsAppMessage(buttonMessagePayload);
        }
    }

    sendInteractiveWhatsAppMessage = async (payload: object) => {
        const { BASE_URL, PHONE_NUMBER_ID, ACCESS_TOKEN } = envVariables;
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


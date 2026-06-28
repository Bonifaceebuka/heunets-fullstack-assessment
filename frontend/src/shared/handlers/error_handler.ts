interface ValidationError {
    [key: string]: string | string[];
}

export interface ErrorMessages {
    [field: string]: ValidationError;
}

export function formatValidationMessage(errorMessages: ErrorMessages): string[] {
    const messages: string[] = [];
    for (const key in errorMessages) {
        const validationErrs = errorMessages[key];

        for (const errs in validationErrs) {
            const ErrMsg = validationErrs[errs];
            if (ErrMsg instanceof Array) {
                for (let i = 0; i < ErrMsg.length; i++) { // Fixed: use < instead of <=
                    if (ErrMsg[i] && ErrMsg[i] !== undefined) {
                        messages.push(ErrMsg[i]);
                    }
                }
            }
            else {
                messages.push(ErrMsg);
            }
        }
    }
    // console.log('errorMessages',errorMessages)
    return messages;
}
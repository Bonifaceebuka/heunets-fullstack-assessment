interface ValidationError {
    [key: string]: string | string[];
}

export interface ErrorMessages {
    [field: string]: ValidationError;
}

export interface BackendErrorMessages {
    [field: string]: string[];
}

interface ApiErrorResponse {
    data: {
        field: string;
        errors: string[];
    }[];
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
    return messages;
}

export function formatBackendErrors(errorMessages: ErrorMessages | BackendErrorMessages | ApiErrorResponse | string): string[] {
    // Handle string errors
    if (typeof errorMessages === 'string') {
        return [errorMessages];
    }

    // Handle null/undefined
    if (!errorMessages || typeof errorMessages !== 'object') {
        return ['An error occurred'];
    }

    // Handle error messages from Class-validator:
    // {
    //   data: [
    //     {
    //       field: "field_name",
    //       errors: ["Error message"]
    //     }
    //   ]
    // }
    if (Array.isArray(errorMessages.data)) {
        return errorMessages.data.flatMap(
            (item: { errors?: string[] }) => item.errors || []
        );
    }

    // Assume it's the original nested format
    return formatValidationMessage(errorMessages as ErrorMessages);
}
export const FormControl = {
    isValidTextField: (value: string): boolean => {
        if (!value) {
            return false;
        }

        return !!value.trim().length;
    }
};

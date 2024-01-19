import { useState } from 'react';

interface IFormControlError {
    message: string;
}

type IFormControlValidator<TValue> = (value: TValue | undefined) => IFormControlError | undefined;

interface IFormControlConfig<TValue> {
    initialState?: TValue;
    validate: IFormControlValidator<TValue>;
}

export const VALIDATORS: Record<string, IFormControlValidator<unknown>> = {
    REQUIRED: (value: unknown) => (value ? void 0 : { message: 'This field is required' }),
};

export class FormControl<TValue> {
    private readonly state: [TValue | undefined, (value: TValue | undefined) => void];
    private readonly touchedState = useState(false);

    constructor(private readonly config: IFormControlConfig<TValue>) {
        this.state = useState(config.initialState);
    }

    get value(): TValue | undefined {
        return this.state[0];
    }

    setValue(value: TValue) {
        this.state[1](value);
        this.setTouched(true);
    }

    get touched(): boolean {
        return this.touchedState[0];
    }

    setTouched(value: boolean) {
        this.touchedState[1](value);
    }

    get error(): IFormControlError | undefined {
        return this.config.validate(this.value);
    }

    get isValid(): boolean {
        return !this.touched || !this.error;
    }
}

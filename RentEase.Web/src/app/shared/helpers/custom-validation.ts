import { AbstractControl, ValidationErrors } from "@angular/forms";

export class customValidators {
    static passwordsMatching(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const passwordConfirmation = control.get('passwordConfirmation')?.value;

        if((password === passwordConfirmation) 
            && (password !== null && passwordConfirmation != null)) {
            return null;
        } else {
            return { passwordsNotMatching: true };
        }
    }
}
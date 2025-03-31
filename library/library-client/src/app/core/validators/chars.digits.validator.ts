import { AbstractControl, ValidationErrors } from '@angular/forms';

export function charsDigitsValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex: RegExp = /^[a-zA-Z0-9]*$/;
    if (!control.value || regex.test(control.value)) {
      return null;
    }
    return {
      ['invalidCharacters']: {
        message: 'Field should contain digits and chars only',
      },
    };
  };
}

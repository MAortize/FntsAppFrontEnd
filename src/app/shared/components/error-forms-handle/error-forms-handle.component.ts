import { Component, Input } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-error-forms-handle',
  templateUrl: './error-forms-handle.component.html',
  styleUrls: ['./error-forms-handle.component.css']
})
export class ErrorFormsHandleComponent {


  @Input() formControlErrorEmail!: FormControl;
  @Input() formControlErrorPasswordRegister!: FormControl;
  @Input() formControlErrorPasswordLogin!: FormControl;
  @Input() formControlErrorNombre!: FormControl;
  @Input() formControlErrorApellido!: FormControl;
  @Input() formControlErrorUsername!: FormControl;
  

  @Input() input!: string;

}

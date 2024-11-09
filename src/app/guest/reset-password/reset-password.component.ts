import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
  ViewChildren,
  ElementRef,
  QueryList,
  SimpleChanges,
  Directive,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { passwordRegex } from '../../shared/constants';

@Directive({
  selector: '[numOnly]',
})
export class NumOnlyDirective {
  @Input() active: boolean;

  @Output() delete = new EventEmitter();

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (isNaN(parseInt(event.key, 10)) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: { key: string }) {
    if (event.key === 'Backspace') {
      this.delete.emit();
    }
  }
}

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  afficherBlock1: boolean = true;
  afficherBlock2: boolean = false;
  afficherBlock3: boolean = false;
  public code: string;
  pinForm: FormGroup;
  visible: boolean = true;
  visible2: boolean = true;
  isLinear: boolean = true;

  get password(): any {
    return this.account.get('password');
  }

  password_visible() {
    this.visible = !this.visible;
  }
  password_visible2() {
    this.visible2 = !this.visible2;
  }

  account = this._formBuilder.group({
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
    ],
  });

  @Input() public email: string;
  emailControl = new FormControl(
    '',
    Validators.compose([Validators.required, Validators.email])
  );
  formForgotPassword = new UntypedFormGroup({
    email: new UntypedFormControl('', Validators.required),
  });
  /* pin */

  @ViewChildren(NumOnlyDirective, { read: ElementRef })
  numInputs: QueryList<ElementRef>;

  digits = ['', '', '', ''];

  onDelete(index: number) {
    if (index) {
      this.digits[index - 1] = '';

      if (index < this.numInputs.length) {
        this.numInputs.toArray()[index - 1].nativeElement.focus();
      }
    }
  }

  onInput(index: number) {
    console.log('Input: ', index);
    if (index < this.numInputs.length - 1) {
      this.numInputs.toArray()[index + 1].nativeElement.focus();
    }
  }
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}
  clickStep2() {
    this.afficherBlock1 = false;
    this.afficherBlock2 = true;
  }
  clickStep3() {
    this.afficherBlock2 = false;
    this.afficherBlock3 = true;
  }
}

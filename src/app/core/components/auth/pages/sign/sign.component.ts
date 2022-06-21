import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//service
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  public formAuth: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public msgError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {}

  public submitForm() {
    if (this.formAuth.valid) {
      this.AuthService.signIn({
        email: this.formAuth.value.email,
        password: this.formAuth.value.password,
      }).subscribe({
        next: (res) => res,
        error: (e) => (this.msgError = e),
      });
    }
  }
}

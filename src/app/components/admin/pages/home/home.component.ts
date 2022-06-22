import { Component, OnInit } from '@angular/core';

/* service */
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  /* função vinda de services q vai apagar o o token e fazer
  o usuário retornar para a pagina inicial */
  public logout(): void {
    this.authService.logout();
  }
}

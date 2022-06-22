import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  public signIn(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/sign`, payload).pipe(
      map((res) => {
        // removendo do local storage
        localStorage.removeItem('access_token');
        /* armazenar o token no local storage */
        localStorage.setItem('access_token', res.token);
        /* quando o login der certo, vamos ser redirecionado para tela de admin */
        return this.router.navigate(['/admin']);
      }),
      catchError((e) => {
        if (e.error.message) return throwError(() => e.error.message);

        return throwError(
          () => 'Dados não validados, tente novamente mais tarde'
        );
      })
    );
  }

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  /* função q vai pegar o token, perguntar se ele realmente existe
  se nao exitir ele dá false, e se nao estiver expirado retorna um true */
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    /* nao vai deixar a pessoa logar caso o token esteja expirado */
    if (!token) return false;
    /* se não */
    const jwtHelper = new JwtHelperService();

    /* se o token n estiver expirado */
    return !jwtHelper.isTokenExpired(token);
  }
}

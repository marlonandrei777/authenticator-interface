import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// routing
import { AuthRoutingModule } from './auth-routing.module';

//pages component
import { SignComponent } from './pages/sign/sign.component';

@NgModule({
  declarations: [SignComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}

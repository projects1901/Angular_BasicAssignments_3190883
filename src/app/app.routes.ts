import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { authGuard } from './auth.guard';
import { ViewDetailsComponent } from './view-details/view-details.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: 'home/login',
        component: LoginFormComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home/register',
        component: RegisterComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'home/create',
        component: CreatePostComponent,
        canActivate: [authGuard]
    },
    {
        path: 'details/:id',
        component: ViewDetailsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'details/:id', component: UserDetailsComponent },
];

import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BootstrapElementsComponent } from './components/bootstrap-elements/bootstrap-elements.component';
import { CardsComponent } from './components/cards/cards.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { MemberComponent } from './components/members/member.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { UserRoleGuard } from '../guards/user-role.guard';


const RouteLists: Routes = [
    { path: '', redirectTo: AuthURL.Dashboard, pathMatch: 'full' },
    { path: AuthURL.Dashboard, component: DashboardComponent },
    { path: AuthURL.Setting, component: SettingComponent },
    { path: AuthURL.Profile, component: ProfileComponent },
    { path: AuthURL.Element, component: BootstrapElementsComponent },
    { path: AuthURL.Card, component: CardsComponent },
    { path: AuthURL.Widget, component: WidgetsComponent },

    {
        path: AuthURL.Member, component: MemberComponent,
        canActivate: [UserRoleGuard]
    },
    {
        path: AuthURL.MemberCreate, canActivate: [UserRoleGuard],
        children: [
            { path: '', component: MemberCreateComponent },
            { path: ':id', component: MemberCreateComponent }
        ]
    },
    //{ path: AuthURL.MemberCreate + '/:id', component: MemberCreateComponent }
];

export const AuthenticationRouting = RouterModule.forChild(RouteLists);
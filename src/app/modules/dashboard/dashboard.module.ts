import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from '@shared/shared.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BodyComponent } from './components/body/body.component';
import { BoardComponent } from './components/board/board.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    MenuComponent,
    NavigationComponent,
    BodyComponent,
    BoardComponent,
    UserDropdownComponent,
  ],
  imports: [SharedModule],
  providers: [],
})
export class DashboardModule {}

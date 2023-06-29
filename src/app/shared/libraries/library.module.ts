import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrCustomModule } from './toastr';

@NgModule({
  imports: [ToastrCustomModule, BrowserAnimationsModule],
})
export class LibraryModule {}

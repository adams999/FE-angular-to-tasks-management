import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogOptions } from '../../models';

const DIALOG_TEST_DATA: DialogOptions[] = [
  {
    title: 'Alert',
    message: 'This is an example alert used for testing.',
    okButtonText: 'Understood',
  },
  {
    title: 'Confirm',
    message: 'This is an example confirm used for testing.',
    okButtonText: 'Yep',
    cancelButtonText: 'Nope',
  },
  {
    title: 'Prompt',
    message: 'This is an example prompt used for testing.',
    okButtonText: 'Go',
    cancelButtonText: 'Nope',
  },
];

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogComponent,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: DIALOG_TEST_DATA[2] }],
    });
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

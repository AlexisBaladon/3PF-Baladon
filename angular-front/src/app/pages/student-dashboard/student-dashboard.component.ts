import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';
import { AddUserFormComponent } from 'src/app/components/layout/add-user-form/add-user-form.component';
import { DASHBOARD_TEXT } from 'src/app/constants/text';
import Student from 'src/app/interfaces/student';
import { Filterable } from 'src/app/logic/filter/filterable';
import { StudentsService } from 'src/app/services/filterables/concrete-data/students/students.service';
import { FilterableDataService } from 'src/app/services/filterables/data/filterableData.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {
  constructor(private router: Router, private studentService: StudentsService) {}

  public getDashboardText() {
    return DASHBOARD_TEXT['Student']
  }

  public onViewEmitter(id: string) {
    this.router.navigate([`/layout/students/${id}`]);
  }

  public openEditDialog(dialog: MatDialog, mode: 'create' | 'edit', filterable?: Filterable, width?: string | undefined): MatDialogRef<any, any> {
    const dialogRef = dialog.open(AddUserFormComponent, {
      width: width || '600px',
      data: {
        data: filterable, 
        valid: true, 
        title: mode === 'create' ? 'Agregar estudiante' : 'Editar estudiante',
      },
    });

    return dialogRef;
   }

   public openDeleteDialog(dialog: MatDialog, filterableId: Filterable['id'],  width?: string | undefined, filterableService?: FilterableDataService<Student>): MatDialogRef<any, any> {
      return dialog.open(ConfirmModalComponent, {
        width:  width || '400px',
        data: {
          title: 'Eliminar estudiante',
          message: '¿Estás seguro de que quieres eliminar a este estudiante? Los datos perdidos no podrán recuperarse.',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          onConfirm: () => {
            filterableService?.deleteFilterable(filterableId);
            dialog.closeAll();
          },
          onCancel: () => {
            dialog.closeAll();
          },
        }
      });
    }

}

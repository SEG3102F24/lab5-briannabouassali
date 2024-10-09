import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../model/employee";
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService 
{
  private firestore: Firestore = inject(Firestore);
  private employeesCollection = collection(this.firestore, 'employees');

  getEmployees(): Observable<Employee[]> 
  {
    return collectionData(this.employeesCollection, { idField: 'id' }) as Observable<Employee[]>;
  }

  addEmployee(employee: Employee): Promise<void> 
  {
    return addDoc(this.employeesCollection, { ...employee })
    .then(() => console.log('Employee has been added!'))
    .catch(error => console.error('There was an error adding employee:', error));
  }
}
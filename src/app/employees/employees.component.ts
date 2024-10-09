import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Employee } from '../model/employee';
import { Timestamp } from '@angular/fire/firestore';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class EmployeesComponent implements OnInit
{
  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void
  {
    this.employeeService.getEmployees().subscribe((data) => 
      {
      this.employees = data.map(emp => ({
        ...emp,
        dateOfBirth: emp.dateOfBirth instanceof Timestamp 
          ? emp.dateOfBirth.toDate() 
          : emp.dateOfBirth
      }));
    });
  }

  addEmployee(newEmployee: Employee): void 
  {
    this.employeeService.addEmployee(newEmployee)
      .then(() => console.log('Employee has been added!'))
      .catch(error => console.error('There was an error adding employee:', error));
  }
}
import { Component, OnInit } from '@angular/core';
import { Car } from './car';
import { CarService } from './car.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cars !: Car[];
  public title = 'carmanagementapp'; 

  constructor(private carService: CarService) { 

  }

  ngOnInit(): void {
    this.getCars();
  }

  public getCars(): void{
    this.carService.getAllCars().subscribe(
      (response: Car[])=>{
        this.cars = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public onOpenModal(car : Car | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    if(mode === 'add'){
      button.setAttribute('data-target', '#addCarModal');
    }

    if(mode === 'edit'){
      button.setAttribute('data-target', '#editCarModal');
    }

    if(mode === 'delete'){
      button.setAttribute('data-target', '#deleteCarModal');
    }
    container?.appendChild(button);
    button.click();
  }


  
}

import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';

import { AnimalIntData } from '../models/animals';
import { AnimalData } from '../services/animal-data';

import { AnimalChart } from '../animal-chart/animal-chart';
import { LocationMap} from '../location-map/location-map';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-table-grid',
  imports: [ CommonModule, MatTableModule, MatPaginatorModule, MatSortModule,  LocationMap, AnimalChart ],
  templateUrl:  './table-grid.html',
  styleUrl: '../../material-theme.scss',
})

export class TableGrid implements AfterViewInit{
  //Data Vars
  animals: any;
  animal_type: string = 'Dog';
  metadata: any;
  dataSource = new MatTableDataSource<AnimalIntData>([]);
 
  //Default Params for Pagination
  pageSize: number = 15;
  page: number = 1;
  queryLength: number = 0;
  direction: number = 1;

  //Debug Message
  message: string = '';

  displayedColumns: string[] = ['rec_num', 'animal_id', 
                'name', 'animal_type', 'breed', 'color', 'datetime', 'outcome_type', 'outcome_subtype'];
  trackBy = (index: number, animal: AnimalIntData) => animal.rec_num;
  
 
  @ViewChild(MatSort, {static: true}) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private AnimalData: AnimalData,
    private ref: ChangeDetectorRef,
    private router: Router,
    private authenticationService: Authentication
  ) {
    console.log('Table-Grid with Animals CONSTRUCTOR');
  }

  /*
   private loadData(): void { 
    this.AnimalData.getAnimalsByType(this.pageSize, this.page, this.animal_type)
      .subscribe({
        next: (value: any) => {
          //log each 
          console.log(value);
          this.dataSource.data = value[0].data;
          this.animals = value[0].data;
          this.metadata = value[0].metadata;
          this.queryLength = this.metadata[0].totalCount;

          console.log(this.dataSource.data, this.metadata, this.animals);
          this.ref.detectChanges();
          if(value.length > 0){
            this.message = 'There are ' + value[0].data.length + ' records available: Total' + this.queryLength;
          }
          else{
           this.message = 'There were no records retireved from the database';
          }
          console.log(this.message);
          },
          error: (error: any) => {
          console.log('Error: ' + error);
        }
    })  
  }
*/
   private loadDataPage(): void {
    this.AnimalData.getAnimalsPagedBounds(this.pageSize, this.page, this.direction)
      .subscribe({
        next: (value: any) => {
          //log each 
          console.log(value);
          this.dataSource.data = value[0].data;
          this.animals = value[0].data;
          this.metadata = value[0].metadata;
          this.queryLength = this.metadata[0].totalCount;

          console.log(this.dataSource.data, this.metadata, this.animals);
          this.ref.detectChanges();
          if(value.length > 0){
            this.message = 'There are ' + value[0].data.length + ' records available: Total' + this.queryLength;
          }
          else{
           this.message = 'There were no records retireved from the database';
          }
          console.log(this.message);
          },
          error: (error: any) => {
          console.log('Error: ' + error);
        }
    })  
  }

  ngOnInit(){
    this.loadDataPage();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort; 
  }

  handlePageEvent(event: PageEvent){
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    
    this.loadDataPage();
  }

  //Navigate to Animal FORM
  public addAnimal(): void{
    console.log("Clicked!");
    this.router.navigate(['add-animal']);
  }

  // User can click a row to navigate to form for Modification
  public clickedRow(row: any): void{
    if(this.isLoggedIn()){
      console.log(row);
      localStorage.removeItem('rec_num');
      localStorage.setItem('rec_num', row.rec_num);
      this.router.navigate(['edit-animal']);
    }
  }

  public isLoggedIn(){
      return this.authenticationService.isLoggedIn();
    }
}



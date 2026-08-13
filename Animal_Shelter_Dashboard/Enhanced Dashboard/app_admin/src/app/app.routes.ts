import { Routes } from '@angular/router';
import { TableGrid } from './table-grid/table-grid';
import { AddAnimal } from './add-animal/add-animal';
import { EditAnimal } from './edit-animal/edit-animal';
import { Login } from './login/login';
export const routes: Routes = [
    {path: 'add-animal', component: AddAnimal },
    {path: 'edit-animal', component: EditAnimal},
    {path: 'login', component: Login},
    {path: '', component: TableGrid, pathMatch: 'full'}
];

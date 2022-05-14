import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  baseUrl:any = 'https://infinite-earth-74563.herokuapp.com/api/';
  user:any = [];
  boards:any = [];

  addNewBoardForm = new FormGroup({
    title: new FormControl('',[
      Validators.required,
    ]),
  }); 

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
      this.getUser(); 
      this.getBoards();
  }

  getUser(){
    this.http.get<any>(this.baseUrl + 'user').subscribe(res => {
      this.user = res;
    })  
  }

  getBoards(){
    this.http.get<any>(this.baseUrl + 'boards').subscribe(res => {
      this.boards = res.data;
    })
  }

  goToBoard(bd:any){
   console.log(bd);  
   this.router.navigate(['board/' + bd])
  }
  
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  addNewBoard(val:any){
    this.http.post<any>(this.baseUrl + 'boards', val).subscribe(res => {
      this.getBoards();
    })
  }

  deleteBoard(id:any){
    console.log(id);
    this.http.delete<any>(this.baseUrl + 'boards/' + id).subscribe(res => {
      this.getBoards();
    })
  }

}



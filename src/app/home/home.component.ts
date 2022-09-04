import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ref: any;
  data: any;

  constructor(private db: AngularFireDatabase) {
    //this.ref = this.db.object('/');
    //this.ref.set({ message: ''})
  }

  
  ngOnInit(): void {
    this.db.list('message/').snapshotChanges().pipe().subscribe(data => {
      this.data = data;
      for(let d of this.data){
        console.log(d.payload.val());
      }
    });
  }

  insert(input: any){
    console.log(input.value);
    this.db.list('message').push({ message: input.value});
    input.value = '';
  }

  delete(key: any){
    console.log(key);
    this.db.list('message').remove(key)
  }

  deleteAll(){
    this.db.list('message').remove()
  }

  update(key: any, value: any){
    console.log(key, value);
    let message = {
      message: value
    }
    this.db.list('message').update(key, message);
  }
}

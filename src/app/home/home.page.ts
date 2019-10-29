import { Component } from '@angular/core';
import {RoundProgressEase} from 'angular-svg-round-progressbar'
import { MaxLengthValidator } from '@angular/forms';
import { resolve } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isItemAvailable: boolean = false;
  items: any;
  eaten_counter:number = 0;
  maxTolerance:number = 10;
  eatenFood:any[] = [];
  current:number = 0;
  constructor() {
  }
 //100 = massimo assumibile : 10g per 50% di intolleranza


  initializeItems() {
    this.items = [
      {"name":"example", "has_lactose":true, "g_lactose":"0.5","grade_lactose":"low", "state":"success"},
      {"name":"lac_example", "has_lactose":true, "g_lactose":"2","grade_lactose":"mid", "state":"warning"},
      {"name":"example2", "has_lactose":true, "g_lactose":"8","grade_lactose":"high", "state":"danger"},
      {"name":"lac_example2", "has_lactose":true, "g_lactose":"0.2","grade_lactose":"low","state":"success"}

    ];
  }


  getItems(ev: any) {
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.isItemAvailable = false;
    }
  }
  manipulateFood(food){
    return new Promise((resolve,reject) => {
      food.eaten_id = this.eaten_counter++;
      resolve(food)
    })
  }
  addFood(food: any){
    this.manipulateFood(food).then((m_food)=>{
      this.eatenFood.push(m_food) 
    })
    if(food.has_lactose){
      this.current += food.g_lactose*100/this.maxTolerance;
    }
  }


  remove(food: any){
    const index = this.eatenFood.indexOf(food,0);
    console.log("IUBDEX : ", index)
    if(index>-1){
      this.eatenFood.splice(index,1)
      this.current -= food.g_lactose*100/this.maxTolerance
    }
  }

}

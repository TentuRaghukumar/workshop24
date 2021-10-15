import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue!: FormGroup
  restaurentModelObj: RestaurentData = new RestaurentData;
  allRestaurentData: any;
  showadd!:boolean;
  showedit!:boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile_no: [''],
      address: [''],
      services: [''],
      available:['',]
    })
    this.getalldata()
  }

  clickAddResto(){
    this.formValue.reset();
    this.showadd=true;
    this.showedit=false;

  }


  //Now Subscribing Our Data Which Is Mapped Via Services
  addRestaurent() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile_no = this.formValue.value.mobile_no;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;
    this.restaurentModelObj.available = this.formValue.value.available;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("restaurent Added SuccessFully");

      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getalldata()
    },
      err => {
        alert("error")
      })
  }


  //get all data
  getalldata(){
    this.api.getRestaurent().subscribe(res =>{
      this.allRestaurentData = res;
    })
  }


  //delete data
  deleteResto(data:any){
    this.api.deleteRestaurent(data.id).subscribe(res =>{
      alert("deleted successfully")
      this.getalldata();
    })
  }

  
  //Update Data
  onEditresto(data:any){
    this.showadd=false;
    this.showedit=true;
    this.restaurentModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile_no'].setValue(data.mobile_no);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
    this.formValue.controls['available'].setValue(data.available);
  }
  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile_no = this.formValue.value.mobile_no;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;
    this.restaurentModelObj.available = this.formValue.value.available;

    this.api.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res =>{
      alert("updated successfully");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getalldata()
    })
  }
}

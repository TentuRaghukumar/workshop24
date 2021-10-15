import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private _http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.email,Validators.required]],
      mobile_no:['',[Validators.maxLength(10),Validators.required]],
      password:['',[Validators.minLength(6),Validators.required]]
    })
  }

  //Create User
  signup(){
    this._http.post<any>("http://localhost:3000/signup",this.signupForm.value).subscribe(res =>{
      alert("Your Registration Completed Successfully");
      this.signupForm.reset();
      this.router.navigate(['login'])
    },err =>{
      alert("Something Went Wrong")
    }
    )
  }

  get name(){
    return this.signupForm.get('name')
  }  

  get email(){
    return this.signupForm.get('email')
  }  

  get password(){
    return this.signupForm.get('password')
  }  

  get mobile_no(){
    return this.signupForm.get('mobile_no')
  }

}

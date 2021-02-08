import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { User } from "src/app/shared/models/user.model";
import { AuthenticationService } from "src/app/shared/services/authentication.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  login:boolean = true;
  signUp:boolean = false;
  isAgreed: false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required],
    });
    this.loginForm = this.formBuilder.group({
        email: ["", Validators.required],
        password: ["", Validators.required]
      });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    if(this.authenticationService.currentUserValue){
        this.router.navigate(['/dashboard']);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }
  get fL() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.login &&this.loginForm.invalid) {
      return;
    }
    if (this.signUp &&this.userForm.invalid && this.isAgreed) {
        return;
    }

    this.loading = true;
    
    if(this.login){
        let user = {
            password: this.fL.password.value,
            email: this.fL.email.value,
          };
        this.authenticationService
      .login(user)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
    }else{
        let user: User = {
            id: 0,
            username: this.f.username.value,
            password: this.f.password.value,
            email: this.f.email.value,
          };
        this.authenticationService
        .signUp(user)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl]);
            this.toggleForm();
          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        );
    }
    
  }

  toggleForm(){
      this.loading = true;
      this.error = "";
      this.login = !this.login;
      this.signUp = !this.signUp;
  }
}

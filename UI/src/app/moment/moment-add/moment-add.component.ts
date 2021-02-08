import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-moment-add',
  templateUrl: './moment-add.component.html',
  styleUrls: ['./moment-add.component.scss']
})
export class MomentAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  momentForm: FormGroup;
  ngOnInit(): void {
    this.momentForm = this.formBuilder.group({
      name: ["", Validators.required],
      tag: ["", Validators.required]
    });
  }

  selectedImage(image){
    console.log(image);
  }
}

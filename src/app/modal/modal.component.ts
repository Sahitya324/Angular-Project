import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../modal.service';
import { templateCreate } from '../template-list/model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modalData: any;
  templateform!:FormGroup;

  constructor(private modalService: NgbModal,private formbuilder:FormBuilder,private api:ApiService, private modalService2: ModalService) {}

  ngOnInit(): void {
    this.templateform=this.formbuilder.group({
      title:['',Validators.required],
      description:['',Validators.required],
      category:['',Validators.required],
      prompt:['',Validators.required],
      locale:['',Validators.required],
    })
  }

  addtemplate(data: templateCreate) {
    this.modalService2.addTemplate(data);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}

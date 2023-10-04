import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe, NgFor } from '@angular/common';
import { NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { templateModel } from './model';


@Component({
  selector: 'app-template-list',
  providers: [DecimalPipe],
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {
	filter = new FormControl('', { nonNullable: true });
  closeResult = '';
  data: undefined|templateModel[];
  filteredData: templateModel[] = [];

  templateform!:FormGroup;

	constructor(pipe: DecimalPipe,private modalService: NgbModal,private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.templateform=this.formbuilder.group({
      title:['',Validators.required],
      description:['',Validators.required],
      category:['',Validators.required],
      prompt:['',Validators.required],
      locale:['',Validators.required],
    })
    this.gettemplate();
  }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  addtemplate(data: any) {
    // console.log(data, 'Template Data');
    this.api.addTemplate(data).subscribe((res =>{
      this.templateform.reset();
      this.gettemplate();
      this.modalService.dismissAll({ ariaLabelledBy: 'modal-basic-title' });
    }))
  }

  gettemplate(){
    this.api.getTemplate().subscribe(res=>{
      this.data=res;
      this.filteredData = res;
    })
  }

  searchData(event: any) {
    const text = event.target.value;
    const term = text.toLowerCase();
    if (!this.data) {
        this.data = [];
      }
    this.filteredData =  this.data.filter((item: any) => {
        return item.title.toLowerCase().includes(term)
    });
  }
}

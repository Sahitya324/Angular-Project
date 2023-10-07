import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
import { templateCreate } from './template-list/model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal,private api:ApiService) {}

  private functionToBeCalledSubject = new Subject<any>();

  functionToBeCalled$ = this.functionToBeCalledSubject.asObservable();

  addTemplate(data: templateCreate) {
    this.api.addTemplate(data).subscribe((res =>{
      console.log(res, 'Post Response');
      this.functionToBeCalledSubject.next(res);
      this.closeModal();
    }))
  }

  openModal(data: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.modalData = data;
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}

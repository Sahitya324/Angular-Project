import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { templateModel } from '../template-list/model';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.css']
})
export class TemplateDetailComponent implements OnInit {
  public dataId!:number;
  public template:undefined|any;
  constructor(private activatedroute:ActivatedRoute,private route:Router, private api:ApiService) { }
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: Params) => {
    this.dataId=params['get']("id");
    })
    this.api.fetchTemplateDetail(this.dataId).subscribe((data:any)=>{
    this.template = data;
    })
  }
}

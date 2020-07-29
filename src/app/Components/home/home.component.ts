import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DiffResults } from '../../../../projects/ngx-text-diff/src/lib/ngx-text-diff.model';
export interface DiffContent {
  leftContent: string;
  rightContent: string;
}

@Component({
  selector: 'tda-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  submitted = false;
  content: DiffContent = {
    leftContent: '',
    rightContent: ''
  };

  options: any = {
    lineNumbers: true,
    mode: 'xml'
  };

  contentObservable: Subject<DiffContent> = new Subject<DiffContent>();
  contentObservable$: Observable<DiffContent> = this.contentObservable.asObservable();
  fileText: string | ArrayBuffer;
  FileText;
  filetext1;
  constructor() {}

  ngOnInit() {

    
 
    // this.submitted = false;
    // this.content.leftContent =
    //   '<card xmlns="http://businesscard.org">\n' +
    //   '   <name>John Doe</name>\n' +
    //   '   <title>CEO, Widget Inc.</title>\n' +
    //   '   <email>john.Moe@widget.com</email>\n' +
    //   '   <cellphone>(202) 456-1414</cellphone>\n' +
    //   '   <phone>(202) 456-1414</phone>\n' +
    //   '   <logo url="widget.gif"/>\n' +
    //   ' </card>';
    // this.content.rightContent =
    //   '<card xmlns="http://businesscard.org">\n' +
    //   '   <name>John Moe</name>\n' +
    //   '   <title>CEO, Widget Inc.</title>\n' +
    //   '   <email>john.Moe@widget.com</email>\n' +
    //   '   <phone>(202) 456-1414</phone>\n' +
    //   '   <address>Test</address>\n' +
    //   '   <logo url="widget.gif"/>\n' +
    //   ' </card>';
  }

  submitComparison() {
    this.submitted = false;
    this.contentObservable.next(this.content);
    this.submitted = true;
  }

  handleChange(side: 'left' | 'right', value: string) {
    switch (side) {
      case 'left':
        this.content.leftContent = value;
        break;
      case 'right':
        this.content.rightContent = value;
        break;
      default:
        break;
    }
  }

  onCompareResults(diffResults: DiffResults) {
    console.log('diffResults', diffResults);
  }

  fileUpload(event) {
    var reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
    me.FileText = reader.result;
   // me.content.leftContent = (reader.result).toString()
    me.handleChange('left',me.FileText)
    }
    //this.handleChange('left',me.FileText)
    }
    
  fileUpload1(event) {
    var reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
    me.filetext1 = reader.result;
    //me.content.rightContent = (reader.result).toString()
    me.handleChange('right',me.filetext1)
    }
    //this.handleChange('right',right)
    }
  
}

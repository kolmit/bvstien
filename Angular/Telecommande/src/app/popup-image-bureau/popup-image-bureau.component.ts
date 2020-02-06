import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/image-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-popup-image-bureau',
  templateUrl: './popup-image-bureau.component.html',
  styleUrls: ['./popup-image-bureau.component.css']
})
export class PopupImageBureauComponent implements OnInit {

  

  constructor(private imageService: ImageService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    //this.getImageFromService();
    this.first();
    /*let reader = new FileReader();
    reader.onloadend = (e) => {
      this.blobData = this.domSanitizer.bypassSecurityTrustUrl('http://192.168.1.123:8080/imageBureau');
      console.log(this.blobData);
    }*/
    }

    isImageLoading: boolean;
    blobData: any;
  
  first(){
    this.isImageLoading = true;
      this.imageService.getImageBureau().subscribe(data => {
        this.lul(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
  }
    
  lul(data){
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.blobData = this.domSanitizer.bypassSecurityTrustUrl('http://192.168.1.123:8080/imageBureau');
      //console.log(this.blobData);
    }

    if (data) {
      reader.readAsDataURL(data);
    }
  }

  
  



}

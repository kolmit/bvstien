import { Component, OnInit, Inject } from '@angular/core';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from '../model/commande';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.css']
})
export class PopupContentComponent implements OnInit {

  commande: Commande;
 
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private userService: PopupToJavaService, 
    public dialogRef: MatDialogRef<PopupContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.commande = new Commande();
      this.commande.radical = data.radical;
      console.log("data ! " + data.radical);
  }
 
  onSubmit() {
    console.log("commande.radical = " + this.commande.radical + this.commande.arguments);
    this.userService.save(this.commande).subscribe(result => this.gotoUserList());
  }
 
  gotoUserList() {
    this.router.navigate(['/telecommandeJava']);
  }

  ngOnInit() {
    /*this.javaService.findAll().subscribe(data => {
      this.users = data;
    });*/
  }

}

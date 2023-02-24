import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit{
  
  public villes: any;
  public cinemas: any;
  public salles:any;
  public currentVille: any;
  public currentCinema: any;
  currentProjection: any;
  
  constructor(public cinemaService: CinemaService){}

  ngOnInit(): void {
    this.cinemaService.getVilles()
       .subscribe(data => {
          this.villes=data;
       },err=>{
           console.log(err);
           
       })
  }

  onGetCinemas(v:any){
    this.currentVille=v;
    this.salles=undefined;
    this.cinemaService.getCinemas(v)
    .subscribe(data => {
      this.cinemas=data;
   },err=>{
       console.log(err);
       
   })
  }
  onGetSalles(c:any){
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
    .subscribe(data => {
      this.salles=data;
      this.salles._embedded.salles.forEach((salle: { projections: Object; }) => {
        this.cinemaService.getProjections(salle)
        .subscribe(data => {
          salle.projections=data;
       },err=>{
           console.log(err);
           
       })
      });
   },err=>{
       console.log(err);
       
   })
  }
  onGetTicketsPlaces(p:any){
    this.currentProjection=p;
    this.cinemaService.getTicketsPlaces(p)
    .subscribe(data => {
      this.currentProjection.tickets=data;
   },err=>{
       console.log(err);
       
   })
  }

}

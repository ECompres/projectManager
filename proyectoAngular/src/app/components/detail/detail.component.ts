import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { Project } from 'src/app/models/project';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project;
  constructor(private _projectService: ProjectService, private _router: Router, private _route: ActivatedRoute) {
    this.url = Global.url;
  }

  getProject(id) {
    this._projectService.getProject(id).subscribe((res) => {
      this.project = res.project;
      console.log(this.project);
    }, (err) => {
      console.log(err);
    });
  }
  deleteProject(id) {
    Swal.fire({
      title: 'Está seguro?',
      text: "Esto no podrá ser revertido",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Borrado!',
          'El proyecto ha sido borrado',
          'success'
        )

        console.log(result.value);
        this._projectService.deleteProject(id).subscribe((res) => {
          if (res.project) this._router.navigate(['/proyectos']);
        }, (err) => {
          console.log(err);
        });
      }
    })
   
  }
  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getProject(id);
    })
  }

}

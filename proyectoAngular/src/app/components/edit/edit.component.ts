import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { Project } from 'src/app/models/project';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public filesToUpload: Array<File>
  public url: string;
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.title = "Editar proyecto";
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getProject(id);
    })
  }
  getProject(id) {
    this._projectService.getProject(id).subscribe((res) => {
      this.project = res.project;
      console.log(this.project);
    }, (err) => {
      console.log(err);
    });
  }
  onSubmit() {
    this._projectService.updateProject(this.project).subscribe((res) => {
      if (this.filesToUpload) {
        this._uploadService.makeFileRequest(this.url + "uploadimage/" + res.project._id, [], this.filesToUpload, "Image").then((result: any) => {
          swal.fire({

            title: "Exito",
            text: "Proyecto agregado con exito",
            type: "success"
          });

          console.log(result);


        });
      }

    },
      err => {
        console.log(err);

      })
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

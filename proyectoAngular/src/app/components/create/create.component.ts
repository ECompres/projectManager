import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public filesToUpload: Array<File>
  public url: string;
  constructor(private _projectService: ProjectService, private _uploadService: UploadService) {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', 2019, '', '');
    this.url = Global.url;
  }

  onSubmit(form) {
    console.log(this.project);
    console.log(form);

    this._projectService.saveProject(this.project).subscribe(

      (res) => {

        this._uploadService.makeFileRequest(this.url + "uploadimage/" + res.project._id, [], this.filesToUpload, "Image").then((result: any) => {
          swal.fire({

            title: "Exito",
            text: "Proyecto agregado con exito",
            type: "success"
          });
          console.log(result);
          form.reset();

        });
      },
      (err) => {
        swal.fire({
          title: "Error",
          text: "Proyecto NO agregado",
          type: "error"
        });
      });
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  ngOnInit() {
  }

}

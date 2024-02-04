import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {Router, RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Session} from "../models/classes/Session";
import {dummySessions} from "../models/dummyData";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionFilter} from "../models/filters/sessionFilter";
import {debounceTime} from "rxjs";
import {EmployeeFilter} from "../models/filters/employeeFilter";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DatePipe, NgStyle} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SessionStatus} from "../models/enums/sessionStatus";
import {OurTableComponent} from "../_reusable-components/our-table/our-table.component";
import {mapMethods, TableColumn} from "../models/classes/tableColumn";
import {sessionColumns} from "../models/displayed-columns/sessionColumns";

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [
    MatTableModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgStyle,
    TranslateModule,
    MatPaginator,
    MatProgressSpinner,
    DatePipe,
    OurTableComponent
  ],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent implements OnInit {
  columns: TableColumn[] = sessionColumns;
  baseData = dummySessions
  datasource: Session[];

  pageSizeOptions: number[] = [5, 10, 25, 100];
  filterForm: FormGroup;
  filter: SessionFilter;
  length: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private toastr: ToastrService
  ) {
    this.filter = new EmployeeFilter()
    mapMethods(this)
  }
  ngOnInit(): void {
    this.length = this.baseData.length;
    this.datasource = this.baseData.slice(0, this.filter.page_size);
    this.createForm();
  }
  createForm() {
    this.filterForm = this.fb.group({
      name_substr: [''],
      cin_substr: [''],
    });
    this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data) => this.frontFilter());
  }
  onValueChanged(data?: any) {
    if (!this.filterForm) {
      return;
    }

    this.filter.parseValuesFromForm(this.filterForm.value);
  }
  openAddSession () {
    // this.router.navigate(['/add-session']);
  }
  openStartSession () {
    this.router.navigate(['/session']);
  }
  openEditSession(session: Session) {
    console.log('edit session', session)
  }
  openDeleteSession(session: Session) {
    console.log('delete session', session)
  }
  frontFilter(event?: PageEvent) {
    const name = this.filterForm.value.name_substr
    let data = [...this.baseData]
    if (name) {
      data = data.filter((item) => item.employee_name.toLowerCase().includes(name.toLowerCase()))
    }
    this.length = data.length
    if (event) {
      this.datasource = data.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
    }
    else {
      this.datasource = data.slice(0, this.filter.page_size)
    }
  }
  openSessionExists() : Session | null {
    const openSession = this.baseData.find(item => item.status === SessionStatus.Open);
    return openSession || null;
  }


}

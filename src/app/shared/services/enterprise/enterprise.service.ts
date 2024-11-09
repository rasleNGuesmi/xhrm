import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EnterpriseService {
  constructor(private http: HttpClient) { }
  getAllEnterprises() {
    return this.http.get(
      environment.ENTERPRISE_URL +
      '/list/'
    );
  }

  deleteEnterprise(id: number) {
    return this.http.delete(environment.ENTERPRISE_URL + '/delete/' + id + '/');
  }
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const API_URL = 'http://localhost:8000/api/v1';
const API_URL_AUTH = `${API_URL}/auth`;
const ADMIN_URL = `${API_URL}/admin`;
const ACCOUNTANT_URL = `${API_URL}/accountant`;
const ENTERPRISE_URL = `${API_URL}/enterprise`;
const SECRETARY_URL = `${API_URL}/secretary`;
const MANAGER_URL = `${API_URL}/manager`;
const TEAM_LEADER_URL = `${API_URL}/team-leader`;
const HR_URL = `${API_URL}/hr`;
const EMPLOYEE_URL = `${API_URL}/employee`;
const DEPARTMENT_URL = `${API_URL}/department`;
const TEAM_URL = `${API_URL}/team`;
const POSITION_URL = `${API_URL}/position`;
const LEAVE_REQUEST_URL = `${API_URL}/leave-request`;
const LEAVE_URL = `${API_URL}/leave`;
const AUTHORIZATION_REQUEST_URL = `${API_URL}/authorization-request`;
const AUTHORIZATION_URL = `${API_URL}/authorization`;
const CLOCKING_URL = `${API_URL}/clocking`;
const SUPPLIER_URL = `${API_URL}/supplier`;
const ORDER_URL = `${API_URL}/order`;
const EXPENSE_URL = `${API_URL}/expense`;

export const environment = {
  production: false,
  API_URL: API_URL,
  API_URL_AUTH: API_URL_AUTH,
  ADMIN_URL: ADMIN_URL,
  ACCOUNTANT_URL: ACCOUNTANT_URL,
  ENTERPRISE_URL: ENTERPRISE_URL,
  SECRETARY_URL: SECRETARY_URL,
  MANAGER_URL: MANAGER_URL,
  TEAM_LEADER_URL: TEAM_LEADER_URL,
  HR_URL: HR_URL,
  EMPLOYEE_URL: EMPLOYEE_URL,
  DEPARTMENT_URL: DEPARTMENT_URL,
  TEAM_URL: TEAM_URL,
  POSITION_URL: POSITION_URL,
  LEAVE_REQUEST_URL: LEAVE_REQUEST_URL,
  LEAVE_URL: LEAVE_URL,
  AUTHORIZATION_REQUEST_URL: AUTHORIZATION_REQUEST_URL,
  AUTHORIZATION_URL: AUTHORIZATION_URL,
  CLOCKING_URL: CLOCKING_URL,
  SUPPLIER_URL: SUPPLIER_URL,
  ORDER_URL: ORDER_URL,
  EXPENSE_URL: EXPENSE_URL,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

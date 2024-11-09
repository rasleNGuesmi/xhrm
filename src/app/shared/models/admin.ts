export class Admin {
  'enterprise_id'?:number;
  'email': string;
  'first_name': string;
  'last_name': string;
  'username': string;
  'password': string;

  'enterprise': {
    enterprise_name: string;
    phone: number;
    activity: string;
    employees_number: number;
    'adresse': string;
    'working_hours_end'?:number;
    'working_hours_start'?:number
    'leave_days_number'?:number
    'days_off'?:{
      saturday_off:boolean
      sunday_off:boolean
      friday_off:boolean
    }

  };
}

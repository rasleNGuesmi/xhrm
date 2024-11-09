export class enterprise {
  avatar?: string;
  enterprise_name: string;
  phone: number;
  activity: string;
  employees_number: number;
  'adresse'?: string;
  'working_hours_end': number;
  'working_hours_start': number;
  'leave_days_number': number;
  'days_off': {
    saturday_off: boolean;
    sunday_off: boolean;
    friday_off: boolean;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  store_name?: string;
  website_url?: string;
  inquiry_type: 'demo' | 'waitlist';
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  created_at: string;
  updated_at: string;
}

interface BaseAddress {
  address: string;
  state: string;
  LGA: string;
  city: string;
  house_number: string;
  street_name: string;
  postal_code: string;
}

interface CompanyAddress extends BaseAddress {
  type: string; // e.g. "registered"
}

interface MemberAddress extends BaseAddress {
  country: string;
}

interface Member {
  first_name: string;
  last_name: string;
  other_name: string;
  phone_number: string;
  email: string;
  occupation: string;
  nationality: string;
  gender: string;
  date_of_birth: string;
  is_director: boolean;
  is_shareholder: boolean;
  is_witness: boolean;
  ownership_percentage: number;
  address: MemberAddress;
  id_type: string;
  id_number: string;
  file_path: string;
  signature: string;
}

export interface CompanyReg {
  name: string;
  second_name: string;
  business_country_id: string;
  industry_id: string;
  citizenship: string;
  addresses: CompanyAddress[];
  members: Member[];
}

export interface BusinessListItem {
  id: string;
  name: string;
  type: string;
  state: string;
  price: string;
}

export interface BusinessDetails {
  id: string;
  name: string;
  status: string;
  industry: string;
  business_country: string;
  entity_type: string;
  citizenship: string;
  state: string;
  state_fee: number;
  members: Member[];
  addresses: Address[];
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
  address: {
    address: string;
    state: string;
    LGA: string;
    city: string;
    house_number: string;
    street_name: string;
    postal_code: string;
    country: string;
  };
  id_type: string;
  id_number: string;
  file_path: string;
  signature: string;
}
interface Address {
  address: string;
  state: string;
  LGA: string;
  city: string;
  house_number: string;
  street_name: string;
  postal_code: string;
  type: string;
}

// orders types
export interface Orderlist {
  id: string;
  name: string;
  total: string;
  formatted_total: string;
  currency: string;
  currency_symbol: string;
  total_usd: string;
  exchange_rate: string;
  status: string;
  orderable_type: string;
  orderable: string;
  created_at: string;
}

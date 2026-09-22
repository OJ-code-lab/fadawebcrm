export interface BusinessDetail {
  data: [
    {
      id: string;
      name: string;
      second_name: string;
      business_country_id: string;
    },
  ];
}

export interface BusinessDetailTypes {
  data: {
    id: string;
    name: string;
    status: string;
    industry: string;
    business_country: string;
    entity_type: string;
    citizenship: string;
    state: string;
    state_fee: number;
  };
  addresses: {
    address: string;
    state: string;
    LGA: string;
    city: string;
    house_number: string;
    street_name: string;
    postal_code: string;
    type: string;
  }[];
  members: Members[];
}

interface Members {
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

// interface BusinessData {
//   id: string;
//   name: string;
//   second_name: string;
//   business_country_id: string;
//   industry_id: string;
//   citizenship: string;
//   status: string;
// }

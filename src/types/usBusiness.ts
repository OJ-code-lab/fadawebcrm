export interface UsBusiness {
  id: string;
  name: string;
  status: string;
  industry: string;
  business_country: string;
  business_country_id: string;
  business_number: string;
  entity_type: string;
  industry_id: string;
  citizenship: string;
  state: string;
  state_fee: string;
  ssn: string;
  members: [
    {
      first_name: string;
      last_name: string;
      ownership_percentage: string;
    },
  ];
  addresses: [
    {
      address: string;
      state: string;
      city: string;
      country: string;
      postal_code: string;
    },
  ];
}

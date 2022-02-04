interface Employer {
  name: string;
  start_date: Date; //Todo convert to correct format
  end_date?: Date | null; //Todo convert to correct format
}

export interface PostReference {
  personal: {
    first_name: string;
    last_name: string;
    current_address: string;
  };
  employers: Employer[];
  guarantor: {
    name: string;
    address: string;
    relation: string;
  };
}

class GuradianContact {
  public name: string;
  public email: string;
  public phone: string;
  public relation: string;

  constructor(
    name: string,
    email: string,
    phone: string,
    relation: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.relation = relation;
  }
}

export default GuradianContact;

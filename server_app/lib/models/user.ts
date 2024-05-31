class User {
  constructor(
    private id?: number,
    private firstName?: string,
    private lastName?: string,
    private email?: string,
    private address?: string,
    private hashedPassword?: string,
    private password?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.hashedPassword = hashedPassword;
    this.password = password;
  }

  //getters
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getFirstName(): string {
    return `${this.firstName}`;
  }

  public getlastName(): string {
    return `${this.lastName}`;
  }

  public getEmail(): string {
    return `${this.email}`;
  }

  public getAddress(): string {
    return `${this.address}`;
  }

  public getPassword(): string {
    return `${this.password}`;
  }

  public getHashedPassword(): string {
    return `${this.hashedPassword}`;
  }

  //setters
  public setFirstName(_firstName: string): void {
    this.firstName = _firstName;
  }

  public setlastName(_lastName: string): void {
    this.lastName = _lastName;
  }

  public setEmail(_email: string): void {
    this.email = _email;
  }

  public setAddress(_address: string): void {
    this.address = _address;
  }

  public setPassword(_password: string): void {
    this.password = _password;
  }

  public setHashedPassword(_hashedPassword: string): void {
    this.hashedPassword = _hashedPassword;
  }
}

export default User;
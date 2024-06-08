class Treatment {
  public treatmentNumber: number;
  public name: string;
  public diseaseName: string;
  public doctorId: string;
  public doctorName: string;
  public treatmentDate: Date;

  constructor(
    treatmentNumber: number,
    name: string,
    diseaseName: string,
    doctorId: string,
    doctorName: string,
    treatmentDate: Date
  ) {
    this.treatmentNumber = treatmentNumber;
    this.name = name;
    this.diseaseName = diseaseName;
    this.doctorId = doctorId;
    this.doctorName = doctorName;
    this.treatmentDate = treatmentDate;
  }
    
}

export default Treatment;
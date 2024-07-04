import Guardian from "./lib/models/guardian-contact";
import Patient from "./lib/models/patient";
import Treatment from "./lib/models/treatment";
import User from "./lib/models/user";


const users = [
  new User({
    firstName: "abdullah",
    lastName: "khan",
    email: "abdullah@gmail.com",
    addresses: ["Wartenau 19, 20942, Hamburg"],
    designation: ["Head of IT"],
    phoneNumbers: ["017623322443"],
    hashedPassword: "sha1$9ffe3216$1$80a72070743030c449db641f47ce985d13826f6f",
    role: "sysAdmin",
  }),
  new User({
    firstName: "batool",
    lastName: "fatima",
    email: "batool@gmail.com",
    addresses: ["Redington 122, 11098, Hamburg"],
    designation: ["Senior Eye Surgion"],
    phoneNumbers: ["017623322000"],
    hashedPassword: "sha1$9ffe3216$1$80a72070743030c449db641f47ce985d13826f6f",
    role: "doctor",
  }),
  new User({
    firstName: "darek",
    lastName: "xiomi",
    email: "darek@gmail.com",
    addresses: ["Washington Allee 122, 99989, Hamburg"],
    designation: ["Senior IT Manager"],
    phoneNumbers: ["017623322111"],
    hashedPassword: "sha1$9ffe3216$1$80a72070743030c449db641f47ce985d13826f6f",
    role: "staff",
  }),
  new User({
    firstName: "ilyada",
    lastName: "guner",
    email: "ilayda@gmail.com",
    addresses: ["rubenkamp 144, 00099, Hamburg"],
    phoneNumbers: ["0176233222222"],
    hashedPassword: "sha1$9ffe3216$1$80a72070743030c449db641f47ce985d13826f6f",
    role: "patient",
  }),
  new User({
    firstName: "boris",
    lastName: "johnson",
    email: "boris@gmail.com",
    addresses: ["humboltstraße 144, 00099, Hamburg"],
    phoneNumbers: ["0193233222432"],
    hashedPassword: "sha1$9ffe3216$1$80a72070743030c449db641f47ce985d13826f6f",
    role: "patient",
  }),
  new User({
    firstName: "joe",
    lastName: "biden",
    email: "joe@gmail.com",
    addresses: ["washington 001, 00099, Washington"],
    phoneNumbers: ["0176111111111"],
    hashedPassword: "sha1$9ffe3216$1$80a72070743030c449db641f47ce985d13826f6f",
    role: "patient",
  }),
  new User({
    firstName: "donald",
    lastName: "trump",
    email: "donal@gmail.com",
    addresses: ["manhattonAllee 144, 00099, New York"],
    phoneNumbers: ["0176111111122"],
    hashedPassword: "sha1$9ffe3216$1$80a72070743030c449db641f47ce985d13826f6f",
    role: "patient",
  }),
  new User({
    firstName: "rishi",
    lastName: "sunak",
    email: "rishi@gmail.com",
    addresses: ["oxfordton 121, 10293, Oxford"],
    phoneNumbers: ["0176233225432"],
    hashedPassword: "sha1$9ffe3216$1$80a72070743030c449db641f47ce985d13826f6f",
    role: "patient",
  }),
];

const patients = [
  new Patient({
    treatmentHistory: [
      new Treatment({
        name: "eye cateract surgery",
        diseaseName: "eye cateract formation",
        doctorName: "batool",
        treatmentDate: "2024-05-11",
      }),
      new Treatment({
        name: "eye lasik surgery",
        diseaseName: "eye sharpness loss",
        doctorName: "batool",
        treatmentDate: "2024-05-11",
      }),
    ],
    guardianInfo: [
      new Guardian({
        name: "john doe",
        email: "johndoe@gmail.com",
        phone: "012276542635",
        relation: "father",
      }),
    ],
  }),
  new Patient({
    treatmentHistory: [
      new Treatment({
        name: "eye cateract surgery",
        diseaseName: "eye cateract formation",
        doctorName: "batool",
        treatmentDate: "2024-05-11",
      }),
    ],
    guardianInfo: [
      new Guardian({
        name: "sara clay",
        email: "saraclay@gmail.com",
        phone: "012276542611",
        relation: "mother",
      }),
      new Guardian({
        name: "sasha black",
        email: "sasha@gmail.com",
        phone: "012276542385",
        relation: "sister",
      }),
    ],
  }),
  new Patient({
    treatmentHistory: [
      new Treatment({
        name: "eye lasik surgery",
        diseaseName: "eye sharpness loss",
        doctorName: "batool",
        treatmentDate: "2024-05-11",
      }),
    ],
    guardianInfo: [
      new Guardian({
        name: "yara guner",
        email: "yara@gmail.com",
        phone: "012276542635",
        relation: "girlfriend",
      }),
    ],
  }),
  new Patient({
    treatmentHistory: [
      new Treatment({
        name: "eye lense replacement",
        diseaseName: "eye lense damage",
        doctorName: "batool",
        treatmentDate: "2024-05-11",
      }),
    ],
    guardianInfo: [
      new Guardian({
        name: "nadine whitehead",
        email: "nadine@gmail.com",
        phone: "013271942625",
        relation: "wife",
      }),
    ],
  }),
  new Patient({
    treatmentHistory: [
      new Treatment({
        name: "eye cateract surgery",
        diseaseName: "eye cateract formation",
        doctorName: "batool",
        treatmentDate: "2024-05-11",
      }),
      new Treatment({
        name: "eye lasik surgery",
        diseaseName: "eye sharpness loss",
        doctorName: "batool",
        treatmentDate: "2024-05-11",
      }),
    ],
    guardianInfo: [
      new Guardian({
        name: "alisha ahmed",
        email: "alish@gmail.com",
        phone: "011116542635",
        relation: "father",
      }),
      new Guardian({
        name: "john blake",
        email: "john@gmail.com",
        phone: "010496542635",
        relation: "brother",
      }),
      new Guardian({
        name: "rolf maury",
        email: "rolf@gmail.com",
        phone: "012000542635",
        relation: "husband",
      }),
    ],
  }),
];

export {
    patients,
    users
}


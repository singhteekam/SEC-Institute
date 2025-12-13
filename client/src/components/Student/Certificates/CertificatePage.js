import React, { useState, useEffect } from "react";
import Certificate from "./Certificate";
import axios from "axios";
import Marksheet from "./Marksheet";

export default function CertificatePage() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`/api/student/profile?enrollmentNumber=${"SECI0045"}`).then((res) => {
      setStudent(res.data);
    });
  }, []);

  if (!student) return <p>Loading...</p>;

  // return <Certificate student={student} />;
  return <Marksheet student={student} />;
}

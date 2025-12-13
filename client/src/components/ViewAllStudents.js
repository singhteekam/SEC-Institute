import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/admin/students');
        console.log('Response:', response.data);
        if (!response.data) {
          throw new Error('Network response was not ok');
        }
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Students</h1>
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.studentName} - {student.enrollmentNumber}</li>
        ))}
      </ul>
    </div>
  );
}
export default ViewAllStudents;
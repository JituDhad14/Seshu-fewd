import React, { useState } from 'react';

function MarksCalculator() {
  const numStudents = 5;
  const numSubjects = 3;

  const [marks, setMarks] = useState(
    Array.from({ length: numStudents }, () => Array(numSubjects).fill(''))
  );

  const handleChange = (studentIndex, subjectIndex, value) => {
    const newMarks = [...marks];
    newMarks[studentIndex][subjectIndex] = value;
    setMarks(newMarks);
  };

  const calculateSum = (studentMarks) => {
    return studentMarks.reduce((sum, mark) => sum + (parseFloat(mark) || 0), 0);
  };

  const calculateAverage = (studentMarks) => {
    const sum = calculateSum(studentMarks);
    return (sum / numSubjects).toFixed(2);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Marks Calculator</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Student</th>
            {Array.from({ length: numSubjects }, (_, i) => (
              <th key={i}>Subject {i + 1}</th>
            ))}
            <th>Total</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((studentMarks, studentIndex) => {
            const total = calculateSum(studentMarks);
            const avg = calculateAverage(studentMarks);
            return (
              <tr key={studentIndex}>
                <td>Student {studentIndex + 1}</td>
                {studentMarks.map((mark, subjectIndex) => (
                  <td key={subjectIndex}>
                    <input
                      type="number"
                      value={mark}
                      onChange={(e) =>
                        handleChange(studentIndex, subjectIndex, e.target.value)
                      }
                      style={{ width: '60px' }}
                    />
                  </td>
                ))}
                <td>{total}</td>
                <td>{avg}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MarksCalculator;
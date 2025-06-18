import React, { useState } from 'react';

const StudentMarks = () => {
  const numStudents = 5;
  const numSubjects = 3;

  const [marks, setMarks] = useState(
    Array(numStudents).fill().map(() => Array(numSubjects).fill(''))
  );
  const [results, setResults] = useState([]);

  const handleChange = (studentIndex, subjectIndex, value) => {
    const newMarks = [...marks];
    newMarks[studentIndex][subjectIndex] = value;
    setMarks(newMarks);
  };

  const calculateResults = () => {
    const calculatedResults = marks.map((studentMarks) => {
      const numericMarks = studentMarks.map(m => parseFloat(m) || 0);
      const sum = numericMarks.reduce((a, b) => a + b, 0);
      const avg = sum / numSubjects;
      return { sum, avg: avg.toFixed(2) };
    });
    setResults(calculatedResults);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Student Marks Entry</h2>
      <form>
        {marks.map((student, studentIndex) => (
          <div key={studentIndex} style={{ marginBottom: '20px' }}>
            <strong>Student {studentIndex + 1}</strong>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              {student.map((mark, subjectIndex) => (
                <input
                  key={subjectIndex}
                  type="number"
                  placeholder={`Subject ${subjectIndex + 1}`}
                  value={mark}
                  onChange={(e) =>
                    handleChange(studentIndex, subjectIndex, e.target.value)
                  }
                  style={{ padding: '6px', width: '100px' }}
                />
              ))}
            </div>
          </div>
        ))}
      </form>

      <button onClick={calculateResults} style={{ padding: '10px 20px', marginTop: '10px' }}>
        Calculate
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Results</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                Student {index + 1}: Sum = {result.sum}, Average = {result.avg}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentMarks;

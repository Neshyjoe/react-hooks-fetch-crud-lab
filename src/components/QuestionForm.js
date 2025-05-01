import { useState } from 'react';

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleAnswerChange(e, index) {
    const newAnswers = [...formData.answers];
    newAnswers[index] = e.target.value;
    setFormData({
      ...formData,
      answers: newAnswers
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(newQuestion => onAddQuestion(newQuestion));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prompt">Prompt:</label>
      <input
        id="prompt"
        type="text"
        name="prompt"
        value={formData.prompt}
        onChange={handleChange}
      />

      {[0, 1, 2, 3].map(i => (
        <div key={i}>
          <label htmlFor={`answer-${i}`}>Answer {i + 1}:</label>
          <input
            id={`answer-${i}`}
            type="text"
            value={formData.answers[i]}
            onChange={(e) => handleAnswerChange(e, i)}
          />
        </div>
      ))}

      <label htmlFor="correctIndex">Correct Answer:</label>
      <select
        id="correctIndex"
        name="correctIndex"
        value={formData.correctIndex}
        onChange={handleChange}
      >
        {formData.answers.map((_, i) => (
          <option key={i} value={i}>Answer {i + 1}</option>
        ))}
      </select>

      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
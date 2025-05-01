function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    }).then(() => onDelete(id));
  }

  function handleCorrectAnswerChange(e) {
    const newIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex: newIndex })
    }).then(() => onUpdate(id, newIndex));
  }

  return (
    <div className="question-card">
      <div className="question-header">
        <h3>Question #{id}</h3>
        <button onClick={handleDelete}>Delete Question</button>
      </div>
      <p className="prompt">{prompt}</p>
      
      <div className="answers">
        <ul>
          {answers.map((answer, i) => (
            <li key={i} className={i === correctIndex ? "correct" : ""}>
              {answer}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="correct-answer-selector">
<label htmlFor={`correct-answer-${id}`}>Correct Answer:</label>
<select
  id={`correct-answer-${id}`}
  value={correctIndex}
  onChange={handleCorrectAnswerChange}
>
  {answers.map((_, i) => (
    <option key={i} value={i}>Answer {i + 1}</option>
  ))}
</select>
      </div>
    </div>
  );
}

export default Que
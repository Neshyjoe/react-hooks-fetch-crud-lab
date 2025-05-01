import QuestionItem from './QuestionItem';

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <div className="question-list">
      <h2>Current Questions</h2>
      <div className="questions-container">
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDeleteQuestion}
            onUpdate={onUpdateQuestion}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
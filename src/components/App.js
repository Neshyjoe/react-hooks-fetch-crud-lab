import { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [page, setPage] = useState('List');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(data => {
        setQuestions(data);
        setIsLoading(false);
      });
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
    setPage('List');
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter(q => q.id !== id));
  }

  function handleUpdateQuestion(id, correctIndex) {
    setQuestions(questions.map(q => 
      q.id === id ? {...q, correctIndex} : q
    ));
  }

  return (
    <div className="admin-dashboard">
      <AdminNavBar onChangePage={setPage} />
      <main>
        {isLoading ? (
          <div className="loading">Loading questions...</div>
        ) : page === 'Form' ? (
          <QuestionForm onAddQuestion={handleAddQuestion} />
        ) : (
          <QuestionList 
            questions={questions}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
        )}
      </main>
    </div>
  );
}

export default App;

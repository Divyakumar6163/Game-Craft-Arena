import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./createQuiz.module.css";
import AIQuizForm from "./AIQuizForm";
import AIQuizEditor from "./AIQuizEditor";
import CreateQuizModal from "./createQuizModal";
import { handleHome } from "./clickHandler";

function CreateAIQuiz() {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRetake = () => {
    setQuiz([]);
    setShowEditor(false);
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.h1}>Create AI Quiz</h1>
      </div>

      <div className={styles.main}>
        {!showModal && (
          <div className={styles.formDiv}>
            {!showEditor ? (
              <AIQuizForm setQuiz={setQuiz} setShowEditor={setShowEditor} />
            ) : (
              <AIQuizEditor
                quiz={quiz}
                setQuiz={setQuiz}
                setShowModal={setShowModal}
              />
            )}
          </div>
        )}

        {showModal && (
          <CreateQuizModal
            quiz={quiz}
            setQuiz={setQuiz}
            setShowModal={setShowModal}
            setIsSubmitted={() => {}}
            setNumberOfQuestions={() => {}}
            setCurrentQuestion={() => {}}
          />
        )}
      </div>

      <footer className={styles.footer}>
        <button
          className={styles.backButton}
          onClick={() => handleHome(navigate, "/quiz")}
        >
          Back
        </button>

        <button className={styles.reFreshButton} onClick={handleRetake}>
          Refresh
        </button>
      </footer>
    </>
  );
}

export default CreateAIQuiz;

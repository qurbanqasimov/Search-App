document.querySelector("#start-quiz").addEventListener("click", async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
        const data = await response.json();
        const questions = data.results;

        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = ''; // Mevcut içeriği temizle

        questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <h3>Question ${index + 1}: ${question.question}</h3>
                <ul class="answers">
                    ${[question.correct_answer, ...question.incorrect_answers]
                        .sort(() => Math.random() - 0.5)
                        .map(answer => `<li><label><input type="radio" name="question${index}" value="${answer}"> ${answer}</label></li>`)
                        .join('')}
                </ul>
            `;
            quizContainer.appendChild(questionElement);
        });

        document.getElementById('submit-quiz').style.display = 'block';
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
    }
});

document.querySelector("#submit-quiz").addEventListener("click", () => {
    const questions = document.querySelectorAll('.question');
    let score = 0;

    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer) {
            const correctAnswer = data.results[index].correct_answer;
            if (selectedAnswer.value === correctAnswer) {
                score++;
            }
        }
    });

    alert(`You scored ${score} out of ${questions.length}`);
});

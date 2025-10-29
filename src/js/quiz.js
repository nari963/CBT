// 문제 데이터 로드 및 4지선다형 문제풀이 UI
fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    const pdfs = Object.keys(data);
    let currentPdf = pdfs[0];
    let currentIdx = 0;
    let questions = data[currentPdf];

    const pdfSelect = document.getElementById('pdf-select');
    const quizBox = document.getElementById('quiz-box');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const answerBox = document.getElementById('answer-box');
    const statusTable = document.getElementById('quiz-status-table')?.querySelector('tbody');

    let quizStatus = Array(questions.length).fill('');

    // PDF 선택
    pdfSelect.innerHTML = pdfs.map(pdf => `<option value="${pdf}">${pdf.replace('.pdf','')}회</option>`).join('');
    pdfSelect.addEventListener('change', e => {
      currentPdf = e.target.value;
      questions = data[currentPdf];
      currentIdx = 0;
      quizStatus = Array(questions.length).fill('');
      showQuestion();
      updateStatusTable();
    });

    function updateStatusTable() {
      if (!statusTable) return;
      statusTable.innerHTML = '';
      for(let i=0;i<questions.length;i++){
        let mark = quizStatus[i];
        let highlight = i===currentIdx ? 'background:#e6f2ff;font-weight:bold;' : '';
        statusTable.innerHTML += `<tr style="${highlight}"><td style="text-align:center; border-bottom:1px solid #eee;">${i+1}</td><td style="text-align:center; border-bottom:1px solid #eee;">${mark}</td></tr>`;
      }
      // 현재 문제 번호에 맞춰 테이블 스크롤 이동
      setTimeout(() => {
        const table = document.getElementById('quiz-status-table');
        const rows = table?.querySelectorAll('tbody tr');
        if (rows && rows[currentIdx]) {
          rows[currentIdx].scrollIntoView({behavior:'smooth', block:'center'});
        }
      }, 100);
    }

    function showQuestion() {
      const q = questions[currentIdx];
      if (!q) return;
      quizBox.innerHTML = `
        <div class="question">${q.question}</div>
        <ul class="choices">
          ${q.choices.map((c,i) => `<li><button class="choice-btn" data-idx="${i}">${c}</button></li>`).join('')}
        </ul>
        <div class="explanation" style="display:none; margin-top:1rem; color:#333; background:#f6f6f6; border-radius:6px; padding:1rem;"></div>
      `;
      answerBox.textContent = '';
      const explanationBox = quizBox.querySelector('.explanation');
      document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.onclick = () => {
          const idx = btn.getAttribute('data-idx');
          let isCorrect = false;
          if (q.answer) {
            if (q.answer.length === 1 && /[①②③④]/.test(q.answer)) {
              isCorrect = btn.textContent.startsWith(q.answer);
            } else if (!isNaN(Number(q.answer))) {
              isCorrect = Number(idx)+1 === Number(q.answer);
            } else {
              isCorrect = btn.textContent === q.answer;
            }
          }
          if (isCorrect) {
            answerBox.textContent = '정답입니다!';
            answerBox.style.color = '#005bac';
            quizStatus[currentIdx] = 'O';
          } else {
            answerBox.textContent = `오답입니다. 정답: ${q.answer}`;
            answerBox.style.color = 'red';
            quizStatus[currentIdx] = 'X';
          }
          if (q.explanation) {
            explanationBox.textContent = '해설: ' + q.explanation;
            explanationBox.style.display = 'block';
          } else {
            explanationBox.style.display = 'none';
          }
          updateStatusTable();
        };
      });
      prevBtn.disabled = currentIdx === 0;
      nextBtn.disabled = currentIdx === questions.length-1;
      updateStatusTable();
    }

    nextBtn.onclick = () => {
      if (currentIdx < questions.length-1) {
        currentIdx++;
        showQuestion();
      }
    };
    prevBtn.onclick = () => {
      if (currentIdx > 0) {
        currentIdx--;
        showQuestion();
      }
    };
    showQuestion();
    updateStatusTable();
  });

// 단원별 문제 데이터(샘플)
const chapterData = [
  {
    part: 'Part1 전표관리 및 결산관리',
    chapters: [
      '재무회계의 기초 및 개념', '당좌자산', '재고자산', '투자자산', '유형자산', '무형자산', '기타비유동자산', '부채', '자본', '수익과비용', '회계변경과 오류수정'
    ]
  },
  {
    part: 'Part2 원가회계',
    chapters: [
      '원가회계의 개념', '제조업의 원가흐름', '원가의 배분', '부문별 원가계산', '제품별 원가계산'
    ]
  },
  {
    part: 'Part3 부가가치세',
    chapters: [
      '부가가치세의 기본개념', '과세거래', '영세율과 면세', '거래징수와 세금계산서', '과세표준과 납수세액', '부가가치세 신고 납부 절차', '간이과세'
    ]
  },
  {
    part: 'Part4 소득세',
    chapters: [
      '소득세의 기본개념', '과세표준과 세액의 계산', '납부절차'
    ]
  },
  {
    part: 'Part5 보론',
    chapters: [
      '재무비율분석', '비영리회계', '지방세신고'
    ]
  },
  {
    part: 'Part6 실무프로그램 시작',
    chapters: [
      '실무프로그램 시작'
    ]
  },
  {
    part: 'Part6 회계정보시스템운용',
    chapters: [
      '기초정보등록', '전기이월작업'
    ]
  },
  {
    part: 'Part7 전표관리',
    chapters: [
      '일반전표입력', '매입매출전표입력'
    ]
  },
  {
    part: 'Part8 부가가치세 신고서 및 부속서류 작성',
    chapters: [
      '세금계산서 및 계산서합계표', '신용카드매출전표등 발행집계표'
    ]
  },
  {
    part: 'Part9 부동산임대공급가액명세서',
    chapters: []
  },
  {
    part: 'Part10 영세율 첨부서류',
    chapters: [
      '수출실적명세서', '영세율첨부서류제출명세서', '내국신용장 구매확인서전자발급명세서', '영세율매출명세서'
    ]
  },
  {
    part: 'Part11 대손세액공제신고서',
    chapters: []
  },
  {
    part: 'Part12 건물 등 감가상각자산취득명세서',
    chapters: []
  },
  {
    part: 'Part13 신용카드매출전표등 수령명세서',
    chapters: []
  },
  {
    part: 'Part14 의제매입세액공제신고서',
    chapters: []
  },
  {
    part: 'Part15 재활용폐자원세액공제신고서',
    chapters: []
  },
  {
    part: 'Part16 공제받지못할매입세액명세서',
    chapters: [
      '공제받지못할매입세액내역', '공통매입세액의 안분', '공통매입세액의 정산', '납부세액(또는 환급세액)의 재계산'
    ]
  },
  {
    part: 'Part17 부가가치세신고 및 가산세',
    chapters: [
      '부가가치세신고서', '가산세', '부가가치세 전자신고', '매입매출전표에서 전자세금계산서 발급'
    ]
  },
  {
    part: 'Part18 결산관리',
    chapters: [
      '고정자산등록 및 감가상각', '결산프로세스', '제무제표작성'
    ]
  },
  {
    part: 'Part19 근로소득 원천징수',
    chapters: [
      '사원등록', '급여자료입력', '원천징수이행상황신고서', '연말정산추가자료입력'
    ]
  }
];

let selectedPartIdx = 0;
let selectedChapterIdx = 0;
let currentIdx = 0;
let chapterQuestions = [];
let chapterStatus = [];

window.addEventListener('DOMContentLoaded', function() {
  const partSelect = document.getElementById('part-select');
  const chapterList = document.getElementById('chapter-list');
  const chapterBox = document.getElementById('chapter-box');
  const chapterResult = document.getElementById('chapter-result');
  const prevBtn = document.getElementById('chapter-prev');
  const nextBtn = document.getElementById('chapter-next');
  const pageBox = document.getElementById('chapter-page');
  const statusTable = document.getElementById('chapter-status-table')?.querySelector('tbody');

  // PART 드롭다운 렌더링
  function renderPartSelect() {
    partSelect.innerHTML = chapterData.map((part, idx) => `<option value="${idx}">${part.part}</option>`).join('');
    partSelect.value = selectedPartIdx;
    partSelect.onchange = function() {
      selectedPartIdx = Number(partSelect.value);
      selectedChapterIdx = 0;
      renderChapterList();
      loadQuestions();
    };
  }

  // 단원 목록 표시 (선택된 PART만)
  function renderChapterList() {
    let html = '';
    const part = chapterData[selectedPartIdx];
    html += `<div style='font-weight:bold; margin-top:1.2rem;'>${part.part}</div>`;
    for(let i=0; i<part.chapters.length; i+=2) {
      html += '<div style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">';
      for(let j=0; j<2; j++) {
        const idx = i+j;
        if (idx < part.chapters.length) {
          const ch = part.chapters[idx];
          const active = (idx === selectedChapterIdx) ? 'active' : '';
          html += `<button class='${active}' data-part='${selectedPartIdx}' data-chapter='${idx}' style="flex:1;">${ch}</button>`;
        } else {
          html += '<span style="flex:1;"></span>';
        }
      }
      html += '</div>';
    }
    chapterList.innerHTML = html;
    chapterList.querySelectorAll('button').forEach(btn => {
      btn.onclick = function() {
        selectedChapterIdx = Number(btn.getAttribute('data-chapter'));
        loadQuestions();
        renderChapterList();
      };
    });
  }

  // 샘플 문제 데이터 생성(실제 문제는 추후 추가)
  function loadQuestions() {
    // 예시: 각 단원별 5문제 생성
    chapterQuestions = Array(5).fill(0).map((_,i) => ({
      question: `${chapterData[selectedPartIdx].chapters[selectedChapterIdx]} 문제 ${i+1}`,
      choices: ['선택1','선택2','선택3','선택4'],
      answer: '선택1',
      explanation: '해설 예시'
    }));
    chapterStatus = Array(chapterQuestions.length).fill('');
    currentIdx = 0;
    showChapterQuestion();
    updateStatusTable();
  }

  function updateStatusTable() {
    if (!statusTable) return;
    statusTable.innerHTML = '';
    for(let i=0;i<chapterQuestions.length;i++){
      let mark = chapterStatus[i];
      let highlight = i===currentIdx ? 'background:#e6f2ff;font-weight:bold;' : '';
      statusTable.innerHTML += `<tr style="${highlight}"><td style="text-align:center; border-bottom:1px solid #eee;">${i+1}</td><td style="text-align:center; border-bottom:1px solid #eee;">${mark}</td></tr>`;
    }
    setTimeout(() => {
      const table = document.getElementById('chapter-status-table');
      const rows = table?.querySelectorAll('tbody tr');
      if (rows && rows[currentIdx]) {
        rows[currentIdx].scrollIntoView({behavior:'smooth', block:'center'});
      }
    }, 100);
  }

  function showChapterQuestion() {
    if (!chapterQuestions[currentIdx]) return;
    const q = chapterQuestions[currentIdx];
    chapterBox.innerHTML = `<div class="chapter-question"><span style='font-size:1rem;color:#888;'>[${currentIdx+1}/${chapterQuestions.length}]</span> ${q.question}</div>
      <ul style="list-style:none; padding:0;">
        ${q.choices.map((c,idx) => `<li style="margin-bottom:0.7rem;"><button class="chapter-btn" style="width:100%;" data-choice="${c}">${c}</button></li>`).join('')}
      </ul>
      <div class="chapter-explanation" style="display:none;"></div>`;
    chapterResult.textContent = '';
    const explanationBox = chapterBox.querySelector('.chapter-explanation');
    chapterBox.querySelectorAll('.chapter-btn').forEach(btn => {
      btn.onclick = () => {
        const choice = btn.getAttribute('data-choice');
        if (choice === q.answer) {
          chapterResult.textContent = '정답입니다!';
          chapterResult.style.color = '#005bac';
          chapterStatus[currentIdx] = 'O';
        } else {
          chapterResult.textContent = `오답입니다. 정답: ${q.answer}`;
          chapterResult.style.color = 'red';
          chapterStatus[currentIdx] = 'X';
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
    nextBtn.disabled = currentIdx === chapterQuestions.length-1;
    pageBox.textContent = `${currentIdx+1} / ${chapterQuestions.length}`;
    updateStatusTable();
  }

  prevBtn.onclick = () => {
    if (currentIdx > 0) {
      currentIdx--;
      showChapterQuestion();
    }
  };
  nextBtn.onclick = () => {
    if (currentIdx < chapterQuestions.length-1) {
      currentIdx++;
      showChapterQuestion();
    }
  };

  // 초기 렌더링
  renderPartSelect();
  renderChapterList();
  loadQuestions();
});

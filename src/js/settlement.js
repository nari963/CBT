// 결산정리 분개 연습 기능 구현

document.addEventListener('DOMContentLoaded', () => {
  // 금액 입력 시 합계 자동 계산
  function updateJournalSums() {
    let debitSum = 0;
    let creditSum = 0;
    document.querySelectorAll('#settlement-table input[name="debit"]').forEach(input => {
      const val = input.value.replace(/,/g, '');
      if (val) debitSum += Number(val);
    });
    document.querySelectorAll('#settlement-table input[name="credit"]').forEach(input => {
      const val = input.value.replace(/,/g, '');
      if (val) creditSum += Number(val);
    });
    document.getElementById('debit-sum').textContent = debitSum.toLocaleString('ko-KR');
    document.getElementById('credit-sum').textContent = creditSum.toLocaleString('ko-KR');
  }

  // 금액 입력 시 합계 업데이트 이벤트 바인딩
  document.querySelectorAll('#settlement-table input[name="debit"], #settlement-table input[name="credit"]').forEach(input => {
    input.addEventListener('input', updateJournalSums);
  });

  // 줄 추가 시에도 이벤트 바인딩 필요 (줄추가 버튼)
  const addRowBtn = document.getElementById('add-row');
  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      setTimeout(() => {
        document.querySelectorAll('#settlement-table input[name="debit"], #settlement-table input[name="credit"]').forEach(input => {
          input.removeEventListener('input', updateJournalSums);
          input.addEventListener('input', updateJournalSums);
        });
        updateJournalSums();
      }, 50);
    });
  }

  // 페이지 로드 시 초기 합계 표시
  updateJournalSums();
  // 차변 세트 추가
  const addDebitBtn = document.getElementById('add-debit-row');
  if (addDebitBtn) {
    addDebitBtn.addEventListener('click', () => {
      const rows = document.getElementById('debit-rows');
      const div = document.createElement('div');
      div.className = 'debit-row';
      div.style.display = 'flex';
      div.style.gap = '12px';
      div.style.alignItems = 'center';
      div.style.marginBottom = '8px';
      div.innerHTML = '<input type="text" name="debit_account" placeholder="계정과목" style="font-size:1.1em; padding:8px 12px; min-width:120px;">' +
        '<input type="number" name="debit_amount" placeholder="금액" style="font-size:1.1em; padding:8px 12px; flex:0 1 30%; min-width:60px;">';
      rows.appendChild(div);
    });
  }
  // 대변 세트 추가
  const addCreditBtn = document.getElementById('add-credit-row');
  if (addCreditBtn) {
    addCreditBtn.addEventListener('click', () => {
      const rows = document.getElementById('credit-rows');
      const div = document.createElement('div');
      div.className = 'credit-row';
      div.style.display = 'flex';
      div.style.gap = '12px';
      div.style.alignItems = 'center';
      div.style.marginBottom = '8px';
      div.innerHTML = '<input type="text" name="credit_account" placeholder="계정과목" style="font-size:1.1em; padding:8px 12px; min-width:120px;">' +
        '<input type="number" name="credit_amount" placeholder="금액" style="font-size:1.1em; padding:8px 12px; flex:0 1 30%; min-width:60px;">';
      rows.appendChild(div);
    });
  }
  // 제출 이벤트(기본)
  const form = document.getElementById('settlement-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // 차변/대변 값 수집
      const debitRows = Array.from(document.querySelectorAll('.debit-row'));
      const creditRows = Array.from(document.querySelectorAll('.credit-row'));
      const userDebits = debitRows.map(row => ({
        account: row.querySelector('input[name="debit_account"]').value.trim(),
        amount: Number(row.querySelector('input[name="debit_amount"]').value)
      }));
      const userCredits = creditRows.map(row => ({
        account: row.querySelector('input[name="credit_account"]').value.trim(),
        amount: Number(row.querySelector('input[name="credit_amount"]').value)
      }));
      // 결과 표시(임시)
      document.getElementById('result-box').textContent =
        '차변: ' + JSON.stringify(userDebits) + '\n대변: ' + JSON.stringify(userCredits);
    });
  }

  // 샘플 문제 데이터 (구현 시 실제 문제로 교체)
  const settlementProblems = [
    {
      question: '3월 22일에 장기 투자 목적으로 ㈜바른상사의 비상장주식 10,000주를 7,300,000원에 취득하였다. 결산일 현재 해당 주식의 시가는 1주당 850원이다.',
      answer: '2023.12.31.\n(차) 매도가능증권(178) 1,200,000원\n(대) 매도가능증권평가이익 1,200,000원'
    },
    {
      question: '12월 30일에 장부상 현금보다 실제 현금이 102,000원이 적은 것을 발견하여 현금과부족으로 회계 처리하였으나 기말까지 원인을 파악하지 못했다.',
      answer: '2023.12.31.\n(차) 잡손실 102,000원\n(대) 현금과부족 102,000원'
    },
    {
      question: '결산 시 거래처원장 중 보통예금(우리은행)의 잔액이 (－)35,423,800원임을 발견하였다. 보통예금(우리은행) 계좌는 마이너스 통장으로 확인되었다(단, 마이너스 통장은 단기차입금 계정을 사용하고, 음수(－)로 회계처리하지 말 것).',
      answer: '2023.12.31.\n(차) 보통예금 35,423,800원\n(대) 단기차입금(우리은행) 35,423,800원'
    },
    {
      question: '2023년 3월 1일에 영업부 사무실에 대한 화재보험료(보험기간 2023.03.01.~2024.02.29.) 1,200,000원을 전액 납입하고, 전액 비용으로 회계처리하였다(단, 음수(－)로 회계처리하지 말고, 월할계산 할 것).',
      answer: '2023.12.31.\n(차) 선급비용 200,000원\n(대) 보험료(판) 200,000원'
    },
    {
      question: '퇴직급여추계액이 다음과 같을 때 퇴직급여충당부채를 설정하시오. 회사는 퇴직급여추계액의 100%를 퇴직급여충당부채로 설정하고 있다.\n구분\n퇴직금추계액\n설정 전 퇴직급여충당부채 잔액 \n생산부서 300,000,000원 60,000,000원\n마케팅부서 100,000,000원 20,000,000원',
      answer: '2023.12.31.\n(차) 퇴직급여(판) 80,000,000원, 퇴직급여(제) 240,000,000원\n(대) 퇴직급여충당부채 320,000,000원\nㆍ마케팅부서：퇴직급여추계액 100,000,000원×100%－20,000,000원＝80,000,000원\nㆍ생산부서：퇴직급여추계액 300,000,000원×100%－60,000,000원＝240,000,000원'
    }
  ];
  let settlementCurrent = 0;
  function showSettlementProblem(idx) {
    document.getElementById('problem-number').textContent = (idx+1) + '.';
    document.getElementById('problem-text').textContent = settlementProblems[idx].question;
    document.getElementById('result-box').textContent = '';
    let answerBtn = document.getElementById('show-answer-btn');
    if (!answerBtn) {
      answerBtn = document.createElement('button');
      answerBtn.id = 'show-answer-btn';
      answerBtn.textContent = '정답 보기';
      answerBtn.style.margin = '12px 0 0 0';
      answerBtn.style.fontSize = '1.1em';
      answerBtn.style.padding = '8px 18px';
      answerBtn.style.borderRadius = '8px';
      answerBtn.style.background = '#1976d2';
      answerBtn.style.color = '#fff';
      answerBtn.style.border = 'none';
      answerBtn.style.cursor = 'pointer';
      answerBtn.style.display = 'inline-block';
      document.getElementById('problem-box-card').appendChild(answerBtn);
    }
    answerBtn.style.display = 'inline-block';
    answerBtn.onclick = function() {
      document.getElementById('result-box').textContent = settlementProblems[idx].answer;
      answerBtn.style.display = 'none';
    };
  }
  function renderSettlementPagination() {
    const total = settlementProblems.length;
    const box = document.getElementById('pagination-box');
    if (!box || total < 2) { box.innerHTML = ''; return; }
    let html = '';
    html += `<button id="settlement-prev-btn" ${settlementCurrent === 0 ? 'disabled' : ''}>이전</button>`;
    for (let i = 0; i < total; i++) {
      html += `<button class="settlement-page-btn" data-idx="${i}" ${i === settlementCurrent ? 'style="font-weight:bold;background:#e9ecef;\"' : ''}>${i+1}</button>`;
    }
    html += `<button id="settlement-next-btn" ${settlementCurrent === total-1 ? 'disabled' : ''}>다음</button>`;
    box.innerHTML = html;
    document.getElementById('settlement-prev-btn').onclick = () => { if (settlementCurrent > 0) { settlementCurrent--; showSettlementProblem(settlementCurrent); renderSettlementPagination(); } };
    document.getElementById('settlement-next-btn').onclick = () => { if (settlementCurrent < total-1) { settlementCurrent++; showSettlementProblem(settlementCurrent); renderSettlementPagination(); } };
    Array.from(document.getElementsByClassName('settlement-page-btn')).forEach(btn => {
      btn.onclick = () => { settlementCurrent = Number(btn.dataset.idx); showSettlementProblem(settlementCurrent); renderSettlementPagination(); };
    });
  }
  showSettlementProblem(settlementCurrent);
  renderSettlementPagination();
});

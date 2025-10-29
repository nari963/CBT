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
});

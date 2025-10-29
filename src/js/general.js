// 일반전표문제 샘플 데이터
const problems = {
  past: [
    {
      text: "06월 12일 단기매매증권으로 분류되는 ㈜단타의 주식 5,000주를 1주당 2,000원에 매입하였다. 매입수수료는 매입가액의 1%이고, 매입 관련 대금은 모두 보통예금 계좌에서 지급하였다. (3점)",
      debit: [
        { account: "단기매매증권", amount: 10000000 },
        { account: "수수료비용(984)", amount: 100000 }
      ],
      credit: [
        { account: "보통예금", amount: 10100000 }
      ]
    },
    {
      text: "07월 09일 5월분 급여 지급 시 원천징수한 소득세 3,000,000원 및 지방소득세 300,000원을 보통예금 계좌에서 이체하여 납부하였다(단, 소득세와 지방소득세를 합하여 하나의 전표로 입력할 것). (3점)",
      debit: [
        { account: "예수금", amount: 3300000 }
      ],
      credit: [
        { account: "보통예금", amount: 3300000 }
      ]
    },
    {
      text: "07월 21일 대주주로부터 업무용 토지(공정가치 350,000,000원)를 무상으로 기증받고, 같은 날에 토지에 대한 취득세 20,000,000원을 보통예금 계좌에서 납부하였다(단, 하나의 전표로 입력할 것). (3점)",
      debit: [
        { account: "토지", amount: 370000000 }
      ],
      credit: [
        { account: "자산수증이익", amount: 350000000 },
        { account: "보통예금", amount: 20000000 }
      ]
    },
    {
      text: "09월 20일 액면금액 35,000,000원(5년 만기)인 사채를 34,100,000원에 발행하고, 대금은 전액 보통예금 계좌로 입금받았다. (3점)",
      debit: [
        { account: "보통예금", amount: 34100000 },
        { account: "사채할인발행차금", amount: 900000 }
      ],
      credit: [
        { account: "사채", amount: 35000000 }
      ]
    },
    {
      text: "10월 21일 전기에 발생한 ㈜도담의 외상매출금 $100,000를 회수하고 즉시 전액을 원화로 환가하여 보통예금 계좌에 입금하였다(단, 전기 결산일에 외화자산 및 부채의 평가는 적절히 반영되었으며, 계정과목은 외상매출금을 사용할 것). (3점)\n2022년 12월 31일(전기 결산일) 기준환율 1,150원/$\n2023년 10월 21일(환가일) 적용환율 1,250원/$",
      debit: [
        { account: "보통예금", amount: 125000000 }
      ],
      credit: [
        { account: "외상매출금(㈜도담)", amount: 115000000 },
        { account: "외환차익", amount: 10000000 }
      ]
    }
  ],
  basic: [
    {
      text: "현금 100,000원을 은행에 예금하다.",
      debit: [ { account: "은행예금", amount: 100000 } ],
      credit: [ { account: "현금", amount: 100000 } ]
    },
    {
      text: "상품 50,000원을 외상으로 매입하다.",
      debit: [ { account: "상품", amount: 50000 } ],
      credit: [ { account: "외상매입금", amount: 50000 } ]
    }
  ],
  advanced: [
    {
      text: "기계장치 200,000원을 현금과 어음으로 지급하다.",
      debit: [ { account: "기계장치", amount: 200000 } ],
      credit: [ { account: "현금", amount: 100000 }, { account: "지급어음", amount: 100000 } ]
    }
  ]
};
let current = 0;
let currentPart = 'basic';

document.addEventListener('DOMContentLoaded', () => {
  // 차변/대변 합계 자동 계산 함수
  function updateJournalSums() {
    let debitSum = 0;
    let creditSum = 0;
    document.querySelectorAll('#journal-table input[name="debit"]').forEach(input => {
      const val = input.value.replace(/,/g, '');
      if (val) debitSum += Number(val);
    });
    document.querySelectorAll('#journal-table input[name="credit"]').forEach(input => {
      const val = input.value.replace(/,/g, '');
      if (val) creditSum += Number(val);
    });
    document.getElementById('debit-sum').textContent = debitSum.toLocaleString('ko-KR');
    document.getElementById('credit-sum').textContent = creditSum.toLocaleString('ko-KR');
  }

  // 금액 입력 시 합계 업데이트 이벤트 바인딩
  document.querySelectorAll('#journal-table input[name="debit"], #journal-table input[name="credit"]').forEach(input => {
    input.addEventListener('input', updateJournalSums);
  });

  // 줄 추가 시에도 이벤트 바인딩 필요 (줄추가 버튼)
  const addRowBtn = document.getElementById('add-row');
  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      setTimeout(() => {
        document.querySelectorAll('#journal-table input[name="debit"], #journal-table input[name="credit"]').forEach(input => {
          input.removeEventListener('input', updateJournalSums);
          input.addEventListener('input', updateJournalSums);
        });
        updateJournalSums();
      }, 50);
    });
  }

  // 페이지 로드 시 초기 합계 표시
  updateJournalSums();
  const partSelect = document.getElementById('part-select');
  // 금액 입력 시 1000원 단위 콤마 표시 및 키보드 이동 지원
  function formatNumberWithComma(num) {
    if (isNaN(num) || num === '') return '';
    return Number(num).toLocaleString('ko-KR');
  }

  function updateOppositeSums() {
    // 차변/대변 금액 입력란을 항상 수정 가능하게 변경
    const debitRows = Array.from(document.querySelectorAll('.debit-row'));
    const creditRows = Array.from(document.querySelectorAll('.credit-row'));
    debitRows.forEach(row => {
      const input = row.querySelector('input[name="debit_amount"]');
      input.readOnly = false;
      // 콤마 표시
      input.value = formatNumberWithComma(input.value.replace(/,/g, ''));
    });
    creditRows.forEach(row => {
      const input = row.querySelector('input[name="credit_amount"]');
      input.readOnly = false;
      // 콤마 표시
      input.value = formatNumberWithComma(input.value.replace(/,/g, ''));
    });
  }

  // 계정과목-금액 입력란 키보드 화살표 이동 지원
  function enableArrowNavigation() {
    document.querySelectorAll('.debit-row input, .credit-row input').forEach((input, idx, arr) => {
      input.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          if (idx < arr.length - 1) arr[idx + 1].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          if (idx > 0) arr[idx - 1].focus();
        } else if (e.key === '+') {
          e.preventDefault();
          input.value += '00';
          input.dispatchEvent(new Event('input'));
        }
      });
    });
  }
  const problemText = document.getElementById('problem-text');
  const form = document.getElementById('journal-form');
  const resultBox = document.getElementById('result-box');

  function showProblem(idx) {
  const p = problems[currentPart][idx];
  document.getElementById('problem-number').textContent = (idx+1) + '.';
  problemText.textContent = p.text;
  resultBox.textContent = '';
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
    let answerText = '';
    if (p.debit && p.credit) {
      answerText += '[정답 분개]\n';
      answerText += '(차) ' + p.debit.map(d => d.account + ' ' + d.amount.toLocaleString('ko-KR')).join(', ') + '\n';
      answerText += '(대) ' + p.credit.map(c => c.account + ' ' + c.amount.toLocaleString('ko-KR')).join(', ');
    } else {
      answerText = '[정답 데이터 없음]';
    }
    resultBox.textContent = answerText;
    answerBtn.style.display = 'none';
  };
    // 테이블형 UI에서는 별도 입력란 초기화 필요 없음
  }

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
      div.innerHTML = '<input type="text" name="debit_account" placeholder="계정과목" style="font-size:1.1em; padding:8px 12px; flex:1 1 0; min-width:80px;">' +
        '<input type="text" inputmode="numeric" name="debit_amount" placeholder="금액" class="amount-input" style="font-size:1.1em; padding:8px 12px; flex:0 1 30%; min-width:60px;">';
      rows.appendChild(div);
      div.querySelector('input[name="debit_amount"]').addEventListener('input', updateOppositeSums);
      updateOppositeSums();
      enableArrowNavigation();
    });
  }
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
      div.innerHTML = '<input type="text" name="credit_account" placeholder="계정과목" style="font-size:1.1em; padding:8px 12px; flex:1 1 0; min-width:80px;">' +
        '<input type="text" inputmode="numeric" name="credit_amount" placeholder="금액" class="amount-input" style="font-size:1.1em; padding:8px 12px; flex:0 1 30%; min-width:60px;">';
      rows.appendChild(div);
      div.querySelector('input[name="credit_amount"]').addEventListener('input', updateOppositeSums);
      updateOppositeSums();
      enableArrowNavigation();
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // 모든 세트 수집 (같은 줄)
    const journalRows = Array.from(document.querySelectorAll('.journal-row'));
    const userDebits = journalRows.map(row => ({
      account: row.querySelector('input[name="debit_account"]').value.trim(),
      amount: Number(row.querySelector('input[name="debit_amount"]').value)
    }));
    const userCredits = journalRows.map(row => ({
      account: row.querySelector('input[name="credit_account"]').value.trim(),
      amount: Number(row.querySelector('input[name="credit_amount"]').value)
    }));
  const p = problems[currentPart][current];
    // 정답 비교 (순서 무관, 세트 수 동일해야 함)
    let correct = true;
    if (userDebits.length !== p.debit.length || userCredits.length !== p.credit.length) {
      correct = false;
    } else {
      // 차변 비교
      for (let i = 0; i < p.debit.length; i++) {
        if (userDebits[i].account !== p.debit[i].account || userDebits[i].amount !== p.debit[i].amount) {
          correct = false;
          break;
        }
      }
      // 대변 비교
      for (let i = 0; i < p.credit.length; i++) {
        if (userCredits[i].account !== p.credit[i].account || userCredits[i].amount !== p.credit[i].amount) {
          correct = false;
          break;
        }
      }
    }
    let result = '';
    if (correct) {
      result = '정답입니다!';
    } else {
      result = `오답입니다. 정답: 차변(${p.debit.map(d=>d.account+','+d.amount).join(' / ')}), 대변(${p.credit.map(c=>c.account+','+c.amount).join(' / ')})`;
    }
    resultBox.textContent = result;
  });

  showProblem(current);
  partSelect.addEventListener('change', function() {
    currentPart = partSelect.value;
    current = 0;
    showProblem(current);
  });

  function enableJournalTableNavigation() {
    const inputs = Array.from(document.querySelectorAll('#journal-table input'));
    inputs.forEach((input, idx) => {
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          // Tab 기본 동작(다음 입력란 이동) 유지
          return;
        } else if (e.key === '+') {
          e.preventDefault();
          input.value += '00';
          input.dispatchEvent(new Event('input'));
        }
      });
    });
  }
  // 계정코드-계정과목 매핑 객체 (CSV에서 자동 변환)
const accountCodeMap = {
  "101": "현금",
  "102": "당좌예금",
  "103": "보통예금",
  "104": "기타제예금",
  "105": "정기예금",
  "106": "정기적금",
  "107": "유가증권",
  "108": "외상매출금",
  "110": "받을어음",
  "112": "공사미수금",
  "114": "단기대여금",
  "120": "미수금",
  "131": "선급금",
  "133": "선급미용",
  "134": "가지급금",
  "135": "부가세대급금",
  "136": "선납세금",
  "137": "종업원대여금",
  "138": "전도금",
  "146": "상품",
  "150": "제품",
  "152": "완성건물",
  "153": "원재료",
  "165": "건설용지",
  "166": "가설재",
  "169": "재공품",
  "176": "장기성예금",
  "177": "특정예금",
  "178": "투자유가증권",
  "179": "장기대여금",
  "188": "임차보증금",
  "189": "전세권",
  "190": "기타보증금",
  "193": "부도어음",
  "195": "전화가입권",
  "201": "토지",
  "202": "건물",
  "204": "구축물",
  "206": "기계장치",
  "208": "차량운반구",
  "210": "공구와기구",
  "212": "비품",
  "214": "건설중인자산",
  "231": "영업권",
  "232": "특허권",
  "233": "상표권",
  "234": "실용신안권",
  "235": "의장권",
  "236": "면허권",
  "238": "환율조정차",
  "239": "개발비",
  "240": "소프트웨어",
  "251": "외상매입금",
  "252": "지급어음",
  "253": "미지급금",
  "254": "예수금",
  "255": "부가세예수금",
  "256": "당좌차월",
  "257": "가수금",
  "258": "예수보증금",
  "259": "선수금",
  "260": "단기차입금",
  "261": "미지급세금",
  "262": "미지급비용",
  "263": "선수수익",
  "291": "사채(社債)",
  "293": "장기차입금",
  "305": "외화장기차입금",
  "331": "자본금",
  "341": "자본잉여금",
  "351": "이익준비금",
  "352": "기업합리화적립금",
  "36*": "제준비금",
  "355": "임의적립금",
  "375": "이월이익잉여금",
  "401": "상품매출",
  "404": "제품매출",
  "407": "공사수입금",
  "412": "매출",
  "451": "상품매출원가",
  "455": "제품매출원가",
  "460": "매입",
  "801": "임원급여",
  "802": "급료",
  "803": "상여금",
  "804": "제수당",
  "805": "잡금",
  "811": "복리후생비",
  "812": "여비교통비",
  "813": "접대비",
  "814": "통신비",
  "815": "수도광열비",
  "816": "전력비",
  "817": "세금과공과금",
  "818": "감가상각비",
  "819": "지급임차료",
  "820": "수선비",
  "821": "보험료",
  "822": "차량유지비",
  "823": "연구개발비",
  "824": "운반비",
  "825": "교육훈련비",
  "826": "도서인쇄비",
  "827": "회의비",
  "828": "포장비",
  "829": "사무용품비",
  "830": "소모품비",
  "831": "지급수수료",
  "832": "보관료",
  "833": "광고선전비",
  "834": "판매촉진비",
  "835": "대손상각비",
  "836": "기밀비",
  "837": "건물관리비",
  "838": "수출제비용",
  "839": "판매수수료",
  "840": "무형고정자산상각",
  "842": "견본비",
  "848": "잡비",
  "8**": "창업비",
  "901": "이자수익",
  "902": "유가증권이자",
  "903": "배당금수익",
  "904": "수입임대료",
  "906": "유가증권처분이익",
  "907": "외환차익",
  "909": "수입수수료",
  "911": "관세환급금(*)",
  "912": "판매장려금",
  "914": "유형자산처분이익",
  "915": "투자자산처분이익",
  "917": "국고보조금(*)",
  "930": "잡이익",
  "931": "이자비용",
  "932": "외환차손",
  "933": "기부금",
  "938": "유가증권처분손실",
  "939": "재고자산감모손실",
  "940": "재고자산평가손실",
  "950": "유형자산처분손실",
  "951": "투자자산처분손실",
  "960": "잡손실",
  "998": "법인세등",
  "999": "소득세등",
  "501": "원재료비",
  "502": "부재료비",
  "503": "급여",
  "504": "임금",
  "505": "상여금",
  "506": "제수당",
  "507": "잡금",
  "510": "퇴직급여",
  "511": "복리후생비",
  "512": "여비교통비",
  "513": "접대비",
  "514": "통신비",
  "515": "가스수도료",
  "516": "전력비",
  "517": "세금과공과금",
  "518": "감가상각비",
  "519": "지급임차료",
  "520": "수선비",
  "521": "보험료",
  "522": "차량유지비",
  "523": "연구개발비",
  "524": "운반비",
  "525": "교육훈련비",
  "526": "도서인쇄비",
  "527": "회의비",
  "528": "포장비",
  "529": "사무용품비",
  "530": "소모품비",
  "531": "지급수수료",
  "532": "보관료",
  "533": "외주가공비",
  "534": "시험비",
  "535": "기밀비",
  "536": "잡비",
  "537": "하자보수비",
  "538": "장비임차료",
  "539": "유류대"
};

function enableAccountCodeAutoFill() {
  document.querySelectorAll('#journal-table input[name="code"]').forEach(input => {
    input.addEventListener('input', function() {
      const code = input.value.trim();
      // 계정과목 입력란 찾기 (같은 행의 다음 칸)
      const subjectInput = input.parentElement.nextElementSibling.querySelector('input[name="account"]');
      if (accountCodeMap[code]) {
        subjectInput.value = accountCodeMap[code];
      } else {
        subjectInput.value = '';
      }
    });
  });
}

function enableAccountSubjectAutoFill() {
  document.querySelectorAll('#journal-table input[name="account"]').forEach(input => {
    input.addEventListener('input', function() {
      const subject = input.value.trim();
      // 계정코드 입력란 찾기 (같은 행의 이전 칸)
      const codeInput = input.parentElement.previousElementSibling.querySelector('input[name="code"]');
      // 계정과목에 해당하는 코드 찾기
      const foundCode = Object.keys(accountCodeMap).find(code => accountCodeMap[code] === subject);
      if (foundCode) {
        codeInput.value = foundCode;
      }
    });
  });
}

  enableJournalTableNavigation();
  enableAccountCodeAutoFill();
  enableAccountSubjectAutoFill();

  // 페이지네이션 렌더링 및 동작
function renderPagination() {
  const problemsArr = problems[currentPart];
  const total = problemsArr.length;
  const box = document.getElementById('pagination-box');
  if (!box || total < 2) { box.innerHTML = ''; return; }
  let html = '';
  html += `<button id="prev-btn" ${current === 0 ? 'disabled' : ''}>이전</button>`;
  for (let i = 0; i < total; i++) {
    html += `<button class="page-btn" data-idx="${i}" ${i === current ? 'style=\"font-weight:bold;background:#e9ecef;\"' : ''}>${i+1}</button>`;
  }
  html += `<button id="next-btn" ${current === total-1 ? 'disabled' : ''}>다음</button>`;
  box.innerHTML = html;
  document.getElementById('prev-btn').onclick = () => { if (current > 0) { current--; showProblem(current); renderPagination(); } };
  document.getElementById('next-btn').onclick = () => { if (current < total-1) { current++; showProblem(current); renderPagination(); } };
  Array.from(document.getElementsByClassName('page-btn')).forEach(btn => {
    btn.onclick = () => { current = Number(btn.dataset.idx); showProblem(current); renderPagination(); };
  });
}
// 문제 표시 시 페이지네이션도 갱신
const origShowProblem = showProblem;
showProblem = function(idx) {
  origShowProblem(idx);
  renderPagination();
};
// 파트 변경 시 페이지네이션 초기화
partSelect.addEventListener('change', function() {
  currentPart = partSelect.value;
  current = 0;
  showProblem(current);
  renderPagination();
});
// 초기 렌더링
renderPagination();
});

// 매입매출전표연습용 JS 파일 (기본 구조)
document.addEventListener('DOMContentLoaded', () => {
  // 계정과목-코드 매핑 예시 (실제 코드로 확장 가능)
  // 계정과목-코드 매핑 (일반전표와 동일하게 확장)
  const accountCodeMap = {
  '단기매매증권': '107',
    '현금': '101',
    '당좌예금': '102',
    '보통예금': '103',
    '기타제예금': '104',
    '정기예금': '105',
    '정기적금': '106',
    '유가증권': '107',
    '외상매출금': '108',
    '받을어음': '110',
    '공사미수금': '112',
    '단기대여금': '114',
    '미수금': '120',
    '선급금': '131',
    '선급미용': '133',
    '가지급금': '134',
    '부가세대급금': '135',
    '선납세금': '136',
    '종업원대여금': '137',
    '전도금': '138',
    '상품': '146',
    '제품': '150',
    '완성건물': '152',
    '원재료': '153',
    '건설용지': '165',
    '가설재': '166',
    '재공품': '169',
    '장기성예금': '176',
    '특정예금': '177',
    '투자유가증권': '178',
    '장기대여금': '179',
    '임차보증금': '188',
    '전세권': '189',
    '기타보증금': '190',
    '부도어음': '193',
    '전화가입권': '195',
    '토지': '201',
    '건물': '202',
    '구축물': '204',
    '기계장치': '206',
    '차량운반구': '208',
    '공구와기구': '210',
    '비품': '212',
    '건설중인자산': '214',
    '영업권': '231',
    '특허권': '232',
    '상표권': '233',
    '실용신안권': '234',
    '의장권': '235',
    '면허권': '236',
    '환율조정차': '238',
    '개발비': '239',
    '소프트웨어': '240',
    '외상매입금': '251',
    '지급어음': '252',
    '미지급금': '253',
    '예수금': '254',
    '부가세예수금': '255',
    '당좌차월': '256',
    '가수금': '257',
    '예수보증금': '258',
    '선수금': '259',
    '단기차입금': '260',
    '미지급세금': '261',
    '미지급비용': '262',
    '선수수익': '263',
    '사채(社債)': '291',
    '장기차입금': '293',
    '외화장기차입금': '305',
    '자본금': '331',
    '자본잉여금': '341',
    '이익준비금': '351',
    '기업합리화적립금': '352',
    '제준비금': '36*',
    '임의적립금': '355',
    '이월이익잉여금': '375',
    '상품매출': '401',
    '제품매출': '404',
    '공사수입금': '407',
    '매출': '412',
    '상품매출원가': '451',
    '제품매출원가': '455',
    '매입': '460',
    '임원급여': '801',
    '급료': '802',
    '상여금': '803',
    '제수당': '804',
    '잡금': '805',
    '복리후생비': '811',
    '여비교통비': '812',
    '접대비': '813',
    '통신비': '814',
    '수도광열비': '815',
    '전력비': '816',
    '세금과공과금': '817',
    '감가상각비': '818',
    '지급임차료': '819',
    '수선비': '820',
    '보험료': '821',
    '차량유지비': '822',
    '연구개발비': '823',
    '운반비': '824',
    '교육훈련비': '825',
    '도서인쇄비': '826',
    '회의비': '827',
    '포장비': '828',
    '사무용품비': '829',
    '소모품비': '830',
    '지급수수료': '831',
    '보관료': '832',
    '광고선전비': '833',
    '판매촉진비': '834',
    '대손상각비': '835',
    '기밀비': '836',
    '건물관리비': '837',
    '수출제비용': '838',
    '판매수수료': '839',
    '무형고정자산상각': '840',
    '견본비': '842',
    '잡비': '848',
    '창업비': '8**',
    '이자수익': '901',
    '유가증권이자': '902',
    '배당금수익': '903',
    '수입임대료': '904',
    '유가증권처분이익': '906',
    '외환차익': '907',
    '수입수수료': '909',
    '관세환급금(*)': '911',
    '판매장려금': '912',
    '유형자산처분이익': '914',
    '투자자산처분이익': '915',
    '국고보조금(*)': '917',
    '잡이익': '930',
    '이자비용': '931',
    '외환차손': '932',
    '기부금': '933',
    '유가증권처분손실': '938',
    '재고자산감모손실': '939',
    '재고자산평가손실': '940',
    '유형자산처분손실': '950',
    '투자자산처분손실': '951',
    '잡손실': '960',
    '법인세등': '998',
    '소득세등': '999',
    '원재료비': '501',
    '부재료비': '502',
    '급여': '503',
    '임금': '504',
    '상여금': '505',
    '제수당': '506',
    '잡금': '507',
    '퇴직급여': '510',
    '복리후생비': '511',
    '여비교통비': '512',
    '접대비': '513',
    '통신비': '514',
    '가스수도료': '515',
    '전력비': '516',
    '세금과공과금': '517',
    '감가상각비': '518',
    '지급임차료': '519',
    '수선비': '520'
  };

  // 계정과목 입력 시 코드 자동 입력, 계정코드 입력 시 계정과목 자동 입력
  function bindAccountAutoCode() {
    document.querySelectorAll('#purchase-table input[name="account"]').forEach(accountInput => {
      accountInput.addEventListener('input', function() {
        const codeInput = accountInput.parentElement.previousElementSibling.querySelector('input[name="code"]');
        const subject = accountInput.value.trim();
        const code = accountCodeMap[subject];
        codeInput.value = code ? code : '';
      });
    });
    document.querySelectorAll('#purchase-table input[name="code"]').forEach(codeInput => {
      codeInput.addEventListener('input', function() {
        const accountInput = codeInput.parentElement.nextElementSibling.querySelector('input[name="account"]');
        const code = codeInput.value.trim();
        const foundAccount = Object.keys(accountCodeMap).find(key => accountCodeMap[key] === code);
        accountInput.value = foundAccount ? foundAccount : '';
      });
    });
  }
  bindAccountAutoCode();
  // 줄 추가 시에도 바인딩 필요
  const addRowBtn2 = document.getElementById('add-row');
  if (addRowBtn2) {
    addRowBtn2.addEventListener('click', () => {
      setTimeout(() => {
        bindAccountAutoCode();
      }, 50);
    });
  }
  // 금액 입력 시 합계 자동 계산
  function updateJournalSums() {
    let debitSum = 0;
    let creditSum = 0;
    document.querySelectorAll('#purchase-table input[name="debit"]').forEach(input => {
      let val = input.value.replace(/,/g, '');
      if (val) debitSum += Number(val);
      // 입력값에 자동 콤마
      if (val && !isNaN(val)) {
        input.value = Number(val).toLocaleString('ko-KR');
      }
    });
    document.querySelectorAll('#purchase-table input[name="credit"]').forEach(input => {
      let val = input.value.replace(/,/g, '');
      if (val) creditSum += Number(val);
      // 입력값에 자동 콤마
      if (val && !isNaN(val)) {
        input.value = Number(val).toLocaleString('ko-KR');
      }
    });
    document.getElementById('debit-sum').textContent = debitSum.toLocaleString('ko-KR');
    document.getElementById('credit-sum').textContent = creditSum.toLocaleString('ko-KR');
  }

  // 금액 입력란에 + 키 입력 시 00 자동 입력
  function bindAmountPlusShortcut() {
    document.querySelectorAll('#purchase-table input[name="debit"], #purchase-table input[name="credit"]').forEach(input => {
      input.addEventListener('keydown', function(e) {
        if (e.key === '+') {
          e.preventDefault();
          const start = input.selectionStart;
          const end = input.selectionEnd;
          const value = input.value;
          input.value = value.slice(0, start) + '00' + value.slice(end);
          input.setSelectionRange(start + 2, start + 2);
        }
      });
    });
  }
  bindAmountPlusShortcut();

  // 금액 입력 시 합계 업데이트 이벤트 바인딩
  document.querySelectorAll('#purchase-table input[name="debit"], #purchase-table input[name="credit"]').forEach(input => {
    input.addEventListener('input', updateJournalSums);
  });

  // 줄 추가 시에도 이벤트 바인딩 필요 (줄추가 버튼)
  const addRowBtn = document.getElementById('add-row');
  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      setTimeout(() => {
        document.querySelectorAll('#purchase-table input[name="debit"], #purchase-table input[name="credit"]').forEach(input => {
          input.removeEventListener('input', updateJournalSums);
          input.addEventListener('input', updateJournalSums);
        });
        bindAmountPlusShortcut();
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
  const form = document.getElementById('purchase-form');
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
  // 추후 기능 확장 시 구현
});

// 샘플 문제 데이터 (구현 시 실제 문제로 교체)
const purchaseProblems = [
  {
    question: '07월 02일 기계장치의 내용연수를 연장시키는 주요 부품을 교체하고 16,500,000원(부가가치세 포함)을 대보상사에 당좌수표를 발행하여 지급하였다. 이에 대해 종이세금계산서를 수취하였다(단, 부품교체 비용은 자본적지출로 처리할 것).',
    answer: '[답] 매입매출전표입력\n유형: 51.과세\n공급가액: 15,000,000원\n부가세: 1,500,000원\n공급처명: 대보상사\n전자: 부\n분개: 혼합\n2023.07.02.\n(차) 부가세대급금 1,500,000원, 기계장치 15,000,000원\n(대) 당좌예금 16,500,000원'
  },
  {
    question: '07월 24일 마케팅부서 직원의 야식을 참맛식당(일반과세자)에서 현금으로 구입하고, 현금영수증(지출증빙용)을 발급받았다.',
    answer: '[답] 매입매출전표입력\n유형: 61.현과\n공급가액: 80,000원\n부가세: 8,000원\n공급처명: 참맛식당\n분개: 현금 또는 혼합\n2023.07.24.\n(차) 부가세대급금 8,000원, 복리후생비(판) 80,000원\n(대) 현금 88,000원'
  },
  {
    question: '08월 01일 제품의 영업관리를 위하여 개별소비세 과세대상 승용차(1,500㏄)를 ㈜빠름자동차에서 구입하였다. 대금은 보통예금 계좌에서 3,000,000원을 지급하고 나머지는 외상으로 하였으며, 다음과 같은 전자세금계산서를 발급받았다.',
    answer: '[답] 매입매출전표\n유형: 54.불공\n공급가액: 25,000,000원\n부가세: 2,500,000원\n공급처명: ㈜빠름자동차\n전자: 여\n분개: 혼합\n불공제사유:③비영업용승용자동차 구입･유지 및 임차\n2023.08.01.\n(차) 차량운반구 27,500,000원\n(대) 보통예금 3,000,000원, 미지급금 24,500,000원'
  },
  {
    question: '08월 17일 ㈜더뷰상사에게 제품 2,000개를 개당 20,000원(부가가치세 별도)에 판매하고 전자세금계산서를 발급하였다. 이와 관련하여 공급가액의 30%는 보통예금 계좌로 받고 나머지는 외상으로 하였다.',
    answer: '[답] 매입매출전표입력\n유형: 11.과세\n공급가액: 40,000,000원\n부가세: 4,000,000원\n공급처명: ㈜더뷰상사\n전자: 여\n분개: 혼합\n2023.08.17.\n(차) 보통예금 12,000,000원, 외상매출금 32,000,000원\n(대) 부가세예수금 4,000,000원, 제품매출 40,000,000원'
  },
  {
    question: '11월 30일 미국의 KYM사에 $60,000(수출신고일 11월 27일, 선적일 11월 30일)의 제품을 직수출하였다. 수출대금 중 $30,000는 11월 30일에 보통예금 계좌로 받았으며, 나머지는 12월 5일에 받기로 하였다. 일자별 기준환율은 다음과 같다(단, 수출신고필증은 정상적으로 발급받았으며, 수출신고번호는 고려하지 말 것).',
    answer: '[답] 매입매출전표입력\n유형: 16.수출\n공급가액: 78,600,000원\n공급처명: KYM사\n분개: 혼합\n영세율구분:① 직접수출(대행수출 포함)\n2023.11.30.\n(차) 외상매출금 39,300,000원, 보통예금 39,300,000원\n(대) 제품매출 78,600,000원'
  }
];
let purchaseCurrent = 0;
function showPurchaseProblem(idx) {
  document.getElementById('problem-number').textContent = (idx+1) + '.';
  document.getElementById('problem-text').textContent = purchaseProblems[idx].question;
  document.getElementById('result-box').textContent = '';
  const answerBtn = document.getElementById('show-answer-btn');
  if (answerBtn) answerBtn.style.display = 'inline-block';
}
function renderPurchasePagination() {
  const total = purchaseProblems.length;
  const box = document.getElementById('pagination-box');
  if (!box || total < 2) { box.innerHTML = ''; return; }
  let html = '';
  html += `<button id="purchase-prev-btn" ${purchaseCurrent === 0 ? 'disabled' : ''}>이전</button>`;
  for (let i = 0; i < total; i++) {
    html += `<button class="purchase-page-btn" data-idx="${i}" ${i === purchaseCurrent ? 'style="font-weight:bold;background:#e9ecef;\"' : ''}>${i+1}</button>`;
  }
  html += `<button id="purchase-next-btn" ${purchaseCurrent === total-1 ? 'disabled' : ''}>다음</button>`;
  box.innerHTML = html;
  document.getElementById('purchase-prev-btn').onclick = () => { if (purchaseCurrent > 0) { purchaseCurrent--; showPurchaseProblem(purchaseCurrent); renderPurchasePagination(); } };
  document.getElementById('purchase-next-btn').onclick = () => { if (purchaseCurrent < total-1) { purchaseCurrent++; showPurchaseProblem(purchaseCurrent); renderPurchasePagination(); } };
  Array.from(document.getElementsByClassName('purchase-page-btn')).forEach(btn => {
    btn.onclick = () => { purchaseCurrent = Number(btn.dataset.idx); showPurchaseProblem(purchaseCurrent); renderPurchasePagination(); };
  });
}
document.addEventListener('DOMContentLoaded', () => {
  showPurchaseProblem(purchaseCurrent);
  // 정답 보기 버튼 생성 및 이벤트
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
  answerBtn.onclick = function() {
    document.getElementById('result-box').textContent = purchaseProblems[purchaseCurrent].answer;
    answerBtn.style.display = 'none';
  };
  renderPurchasePagination();
});

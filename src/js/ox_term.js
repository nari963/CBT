// OX 용어 맞추기 전용 JS
const oxTermData = [
  // term.js의 termData에서 자동 변환 (정답: O, 오답: X)
  // 예시: 실제 문제는 term.js의 내용을 기반으로 자동 생성
  {q:'회계정보이용자에게 정보를 제공하는 것은 무엇입니까? (정답: 회계)', answer:'O'},
  {q:'회사에서 일어난 거래를 기록하는 방법은 무엇입니까? (정답: 회계처리)', answer:'O'},
  {q:'잔액을 없애는 회계처리는 무엇입니까? (정답: 상계처리)', answer:'O'},
  {q:'상계처리한 것을 한눈에 볼 수 있는 것은 무엇입니까? (정답: 거래처원장)', answer:'O'},
  // ... 실제로는 term.js의 모든 문제를 OX로 변환하여 추가
];

let oxTermIdx = 0;

function showOxTerm(idx) {
  const box = document.getElementById('ox-term-box');
  const result = document.getElementById('ox-term-result');
  const progress = document.getElementById('ox-term-progress');
  const t = oxTermData[idx];
  box.innerHTML = `<div style='font-size:1.15rem;margin-bottom:1.5rem;'>${idx+1}. ${t.q}</div>
    <div style='display:flex;gap:2rem;justify-content:center;'>
      <button class='ox-term-btn' data-choice='O' style='width:120px;height:48px;font-size:1.2rem;'>O</button>
      <button class='ox-term-btn' data-choice='X' style='width:120px;height:48px;font-size:1.2rem;'>X</button>
    </div>`;
  result.textContent = '';
  progress.textContent = `${idx+1} / ${oxTermData.length}`;
  document.getElementById('ox-term-prev').disabled = idx === 0;
  document.getElementById('ox-term-next').disabled = idx === oxTermData.length-1;
  document.querySelectorAll('.ox-term-btn').forEach(btn => {
    btn.onclick = function() {
      if (btn.getAttribute('data-choice') === t.answer) {
        result.textContent = '정답입니다!';
        result.style.color = '#005bac';
      } else {
        result.textContent = '오답입니다.';
        result.style.color = 'red';
      }
    };
  });
}

document.addEventListener('DOMContentLoaded', function() {
  showOxTerm(oxTermIdx);
  document.getElementById('ox-term-prev').onclick = function() {
    if (oxTermIdx > 0) {
      oxTermIdx--;
      showOxTerm(oxTermIdx);
    }
  };
  document.getElementById('ox-term-next').onclick = function() {
    if (oxTermIdx < oxTermData.length-1) {
      oxTermIdx++;
      showOxTerm(oxTermIdx);
    }
  };
});

import os
import json
from pdfminer.high_level import extract_text

PDF_DIR = os.path.join(os.path.dirname(__file__), 'src', 'exam1')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), 'src', 'questions.json')

# 문제 추출 규칙 예시 (실제 PDF 구조에 따라 수정 필요)
def parse_questions(text):
    questions = []
    lines = text.split('\n')
    q = None
    for line in lines:
        line = line.strip()
        if line.startswith('1.') or (q and line and line[0].isdigit() and line[1] == '.'):  # 문제 번호
            if q:
                questions.append(q)
            q = {'question': line, 'choices': [], 'answer': None}
        elif q and (line.startswith('①') or line.startswith('1)')):
            q['choices'].append(line)
        elif q and line.startswith('정답:'):
            q['answer'] = line.replace('정답:', '').strip()
    if q:
        questions.append(q)
    return questions

def main():
    all_questions = {}
    for fname in os.listdir(PDF_DIR):
        if fname.endswith('.pdf'):
            pdf_path = os.path.join(PDF_DIR, fname)
            text = extract_text(pdf_path)
            questions = parse_questions(text)
            all_questions[fname] = questions
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    print(f'문제 추출 완료: {OUTPUT_PATH}')

if __name__ == '__main__':
    main()

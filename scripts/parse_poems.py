#!/usr/bin/env python3
"""Parse all poem JSON files into a single poems.json with categories."""
import os, json, re, html
from html.parser import HTMLParser

POEMS_DIR = "/home/z/my-project/download"
OUTPUT = "/home/z/my-project/src/data/poems.json"
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)

class PoemParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_text = False
        self.in_h1 = False
        self.title = ""
        self.text_lines = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "h1":
            self.in_h1 = True
        elif tag == "div" and attrs_dict.get("class") == "text":
            self.in_text = True

    def handle_endtag(self, tag):
        if tag == "h1":
            self.in_h1 = False
        elif tag == "div" and self.in_text:
            self.in_text = False

    def handle_data(self, data):
        if self.in_h1:
            self.title = data.strip()
        elif self.in_text:
            self.text_lines.append(data)

def categorize(title):
    t = title.lower()
    if any(w in t for w in ['любовь', 'сердце', 'люблю', 'любимый', 'целую', 'нежност', 'ласк', 'годовщин']):
        return "Любовная лирика"
    elif any(w in t for w in ['мама', 'мать', 'мамин', 'мамочк', 'детств', 'ребёнок', 'доч', 'сын', 'семь']):
        return "Семья и родные"
    elif any(w in t for w in ['петербур', 'спб', 'нева', 'ленинград', 'град', 'питер', 'набережн', 'дворц']):
        return "Санкт-Петербург"
    elif any(w in t for w in ['природ', 'лес', 'река', 'весн', 'лето', 'осен', 'зим', 'снег', 'дожд', 'цвет', 'дерев', 'небо', 'солнышк', 'рассвет', 'закат', 'ветер']):
        return "Природа и времена года"
    elif any(w in t for w in ['душа', 'бог', 'вера', 'молитв', 'храм', 'церкв', 'духов', 'свят', 'грех', 'крест', 'анге']):
        return "Духовная поэзия"
    elif any(w in t for w in ['войн', 'побед', 'солдат', 'фронт', 'памят', 'геро', 'границ', 'родин', 'отечеств']):
        return "О Родине и мире"
    else:
        return "Размышления"

def parse_poem(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except:
        return None
    d = data.get("data", data)
    if isinstance(d, list):
        d = d[0] if d else {}
    if not isinstance(d, dict):
        return None
    raw_html = d.get("html", "")
    if not raw_html:
        return None
    parser = PoemParser()
    try:
        parser.feed(raw_html)
    except:
        pass
    title = parser.title
    text = "\n".join(parser.text_lines).strip()
    if not title or not text:
        return None
    text = html.unescape(text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    url = data.get("data", {}).get("url", "")
    year = ""
    m = re.search(r'/(\d{4})/\d{2}/\d{2}/', url)
    if m:
        year = m.group(1)
    return {"title": title, "text": text, "category": categorize(title), "url": url, "year": year}

poem_files = sorted([f for f in os.listdir(POEMS_DIR) if f.startswith("poem_") and f.endswith(".json") and f != "poem_links.json"])
print(f"Found {len(poem_files)} poem files")

poems = []
for pf in poem_files:
    result = parse_poem(os.path.join(POEMS_DIR, pf))
    if result:
        poems.append(result)

poems.sort(key=lambda x: x["title"])
cats = {}
for p in poems:
    c = p["category"]
    cats[c] = cats.get(c, 0) + 1

print(f"Parsed: {len(poems)} poems")
print(f"Categories: {json.dumps(cats, ensure_ascii=False)}")

with open(OUTPUT, 'w', encoding='utf-8') as f:
    json.dump(poems, f, ensure_ascii=False, indent=2)
print(f"Saved: {OUTPUT}")

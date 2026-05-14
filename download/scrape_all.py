#!/usr/bin/env python3
import json, re, os, subprocess, sys, glob

def load_poem_links():
    with open('all_poem_links.json') as f:
        return json.load(f)

def extract_poem_text(html):
    """Extract poem text from HTML"""
    match = re.search(r'<div class="text">(.*?)</div>', html, re.DOTALL)
    if match:
        text_html = match.group(1)
        text = re.sub(r'<br>\s*', '\n', text_html)
        text = re.sub(r'<[^>]+>', '', text)
        return text.strip()
    return None

def scrape_poem(url, out_file):
    """Scrape a single poem page"""
    result = subprocess.run(
        ['z-ai', 'function', '-n', 'page_reader', '-a', json.dumps({"url": url}), '-o', out_file],
        capture_output=True, text=True, timeout=30
    )
    return result.returncode == 0

def parse_poem_file(filepath, url, title, date):
    """Parse a scraped poem JSON file"""
    try:
        with open(filepath) as f:
            data = json.load(f)
        html = data.get('data', {}).get('html', '')
        text = extract_poem_text(html)
        if text:
            return {
                'title': title,
                'text': text,
                'url': url,
                'date': date
            }
    except Exception as e:
        print(f"    Parse error: {e}")
    return None

def save_progress(all_poems, filename='progress.json'):
    with open(filename, 'w') as f:
        json.dump(all_poems, f, ensure_ascii=False, indent=2)

def main():
    poem_links = load_poem_links()
    total = len(poem_links)
    print(f"Total poems to scrape: {total}")
    
    all_poems = []
    scraped = 0
    failed = 0
    
    for i, poem in enumerate(poem_links):
        idx = i + 1
        out_file = f"poem_{idx:03d}.json"
        
        if os.path.exists(out_file):
            result = parse_poem_file(out_file, poem['url'], poem['title'], poem['date'])
            if result:
                all_poems.append(result)
                scraped += 1
            else:
                failed += 1
        else:
            url = poem['url']
            print(f"  [{idx}/{total}] Scraping: {poem['title'][:50]}...")
            ok = scrape_poem(url, out_file)
            if ok:
                result = parse_poem_file(out_file, poem['url'], poem['title'], poem['date'])
                if result:
                    all_poems.append(result)
                    scraped += 1
                else:
                    failed += 1
            else:
                failed += 1
                print(f"    FAILED to scrape!")
        
        # Save progress every 20 poems
        if idx % 20 == 0:
            save_progress(all_poems)
            print(f"  [PROGRESS] {idx}/{total} processed, {scraped} success, {failed} failed")
    
    # Final save
    save_progress(all_poems)
    
    # Save final output
    with open('all_poems_raw.json', 'w') as f:
        json.dump(all_poems, f, ensure_ascii=False, indent=2)
    
    print(f"\nDONE! Total: {scraped} poems collected, {failed} failed")
    print(f"Output: all_poems_raw.json")

if __name__ == '__main__':
    main()

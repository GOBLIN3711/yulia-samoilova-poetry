#!/usr/bin/env python3
"""
Scraper for all poems by Юлия Самойлова from stihi.ru
Author page: https://stihi.ru/avtor/juliasamoilova1
Total poems: 290
"""

import json
import subprocess
import re
import os
import time
import sys

BASE_URL = "https://stihi.ru"
AUTHOR = "juliasamoilova1"
DOWNLOAD_DIR = "/home/z/my-project/download"

def fetch_page(url, output_file):
    """Fetch a page using z-ai page_reader"""
    cmd = [
        "z-ai", "function", "-n", "page_reader",
        "-a", json.dumps({"url": url}),
        "-o", output_file
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        print(f"  ERROR fetching {url}: {result.stderr}")
        return None
    
    if not os.path.exists(output_file):
        print(f"  ERROR: output file not created for {url}")
        return None
    
    with open(output_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if data.get("status") != 20000:
        print(f"  WARNING: status {data.get('status')} for {url}")
        return None
    
    return data.get("data", {}).get("html", "")

def extract_poem_links(html):
    """Extract poem links and metadata from author page HTML"""
    poems = []
    # Pattern: <li><a href="/2026/05/09/5602" class="poemlink">Title</a> <small>- category, DD.MM.YYYY HH:MM</small></li>
    pattern = r'<a href="(/(\d{4})/(\d{2})/(\d{2})/(\d+))" class="poemlink">(.*?)</a>\s*<small>-\s*(.*?),\s*(\d{2}\.\d{2}\.\d{4}\s*\d{2}:\d{2})</small>'
    matches = re.findall(pattern, html)
    
    for m in matches:
        url_path, year, month, day, num, title, category, date_str = m
        full_url = BASE_URL + url_path
        poems.append({
            "url": full_url,
            "url_path": url_path,
            "title": title,
            "category": category.strip(),
            "date": date_str.strip(),
            "date_path": f"{year}-{month}-{day}"
        })
    
    return poems

def extract_poem_text(html, metadata):
    """Extract poem text from poem page HTML"""
    # The poem text is typically inside <div class="text"> or similar
    # Let's try multiple patterns
    
    # Try to find content between <h1>title</h1> and the next major section
    # On stihi.ru, poems are usually in <pre> or <div> tags
    
    # Pattern 1: look for the main text area
    # The page has the poem title in <h1> and text below
    
    # Extract title from h1
    title_match = re.search(r'<h1>(.*?)</h1>', html)
    if title_match:
        metadata['title'] = title_match.group(1).strip()
    
    # Try to extract poem text - it's typically between specific markers
    # On stihi.ru, the poem content is usually in a div with class="text" or just plain text
    
    # Find the main content area - look for text after the title
    # The poem text usually appears as plain text with <br> line breaks
    
    # Method: Find everything between the <h1> and the next section/footer
    text = ""
    
    # Look for the poem body - typically wrapped in div or just after h1
    # Try extracting from the body content
    body_match = re.search(r'<h1>.*?</h1>(.*?)</div>\s*</index>', html, re.DOTALL)
    if body_match:
        content = body_match.group(1)
        # Clean HTML tags, convert <br> to newlines
        content = re.sub(r'<br\s*/?>', '\n', content)
        content = re.sub(r'<[^>]+>', '', content)
        content = content.strip()
        text = content
    
    if not text:
        # Fallback: try to find the largest text block
        # Remove script and style tags
        clean_html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
        clean_html = re.sub(r'<style[^>]*>.*?</style>', '', clean_html, flags=re.DOTALL)
        
        # Look for text between h1 and common footer markers
        body_match = re.search(r'<h1>.*?</h1>(.*?)(?:<!--|<div id="footer"|<div class="maintext">.*?</div>\s*</div>)', clean_html, re.DOTALL)
        if body_match:
            content = body_match.group(1)
            content = re.sub(r'<br\s*/?>', '\n', content)
            content = re.sub(r'<[^>]+>', '', content)
            content = content.strip()
            text = content
    
    return text

def main():
    print("=" * 60)
    print("Scraper for Юлия Самойлова poems from stihi.ru")
    print("=" * 60)
    
    # Step 1: Fetch all pagination pages
    offsets = [0, 50, 100, 150, 200, 250]
    all_poem_links = []
    
    for offset in offsets:
        if offset == 0:
            url = f"{BASE_URL}/avtor/{AUTHOR}"
        else:
            url = f"{BASE_URL}/avtor/{AUTHOR}&s={offset}"
        
        output_file = os.path.join(DOWNLOAD_DIR, f"page_s{offset}.json")
        print(f"\nFetching pagination page (offset={offset}): {url}")
        
        if os.path.exists(output_file):
            print(f"  Using cached file: {output_file}")
            with open(output_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            html = data.get("data", {}).get("html", "")
        else:
            html = fetch_page(url, output_file)
            if not html:
                print(f"  FAILED to fetch page at offset {offset}")
                continue
        
        poems = extract_poem_links(html)
        print(f"  Found {len(poems)} poem links")
        all_poem_links.extend(poems)
        
        if offset > 0:
            time.sleep(1)  # Be polite
    
    # Deduplicate
    seen = set()
    unique_links = []
    for p in all_poem_links:
        if p['url'] not in seen:
            seen.add(p['url'])
            unique_links.append(p)
    
    print(f"\n{'=' * 60}")
    print(f"Total unique poem links found: {len(unique_links)}")
    print(f"{'=' * 60}")
    
    # Save poem links for reference
    with open(os.path.join(DOWNLOAD_DIR, "poem_links.json"), 'w', encoding='utf-8') as f:
        json.dump(unique_links, f, ensure_ascii=False, indent=2)
    
    # Step 2: Scrape each individual poem
    all_poems = []
    
    # Check for existing progress
    progress_file = os.path.join(DOWNLOAD_DIR, "scrape_progress.json")
    start_index = 0
    if os.path.exists(progress_file):
        with open(progress_file, 'r', encoding='utf-8') as f:
            all_poems = json.load(f)
        start_index = len(all_poems)
        print(f"Resuming from poem #{start_index + 1}")
    
    for i, link_info in enumerate(unique_links[start_index:], start=start_index + 1):
        idx = i - 1  # 0-based
        url = link_info['url']
        poem_file = os.path.join(DOWNLOAD_DIR, f"poem_{idx:03d}.json")
        
        print(f"\n[{i}/{len(unique_links)}] Scraping: {link_info['title']} ({url})")
        
        # Check cache
        if os.path.exists(poem_file):
            print(f"  Using cached file")
            with open(poem_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            html = data.get("data", {}).get("html", "")
        else:
            html = fetch_page(url, poem_file)
            time.sleep(0.5)  # Small delay between requests
        
        poem_entry = {
            "title": link_info['title'],
            "text": "",
            "url": url,
            "date": link_info['date'],
            "category": link_info['category']
        }
        
        if html:
            text = extract_poem_text(html, poem_entry)
            poem_entry['text'] = text
            if text:
                print(f"  ✓ Extracted {len(text)} chars")
            else:
                print(f"  ✗ Could not extract text")
        
        all_poems.append(poem_entry)
        
        # Save intermediate results every 20 poems
        if i % 20 == 0:
            with open(progress_file, 'w', encoding='utf-8') as f:
                json.dump(all_poems, f, ensure_ascii=False, indent=2)
            print(f"  💾 Saved intermediate progress ({len(all_poems)} poems)")
    
    # Step 3: Save final results
    output_file = os.path.join(DOWNLOAD_DIR, "all_poems.json")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_poems, f, ensure_ascii=False, indent=2)
    
    # Clean up progress file
    if os.path.exists(progress_file):
        os.remove(progress_file)
    
    # Summary
    texts_found = sum(1 for p in all_poems if p['text'])
    print(f"\n{'=' * 60}")
    print(f"SCRAPING COMPLETE!")
    print(f"  Total poems found: {len(all_poems)}")
    print(f"  Poems with text: {texts_found}")
    print(f"  Poems without text: {len(all_poems) - texts_found}")
    print(f"  Output saved to: {output_file}")
    print(f"{'=' * 60}")
    
    # Print all URLs
    print("\nAll poem URLs:")
    for i, p in enumerate(all_poems, 1):
        status = "✓" if p['text'] else "✗"
        print(f"  {status} {i:3d}. {p['url']} - {p['title']}")

if __name__ == "__main__":
    main()

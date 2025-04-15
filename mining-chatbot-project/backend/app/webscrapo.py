import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
from datetime import datetime

def scrape_mining_articles():
    url = "https://www.mining-technology.com/features/"  # Replace with your actual target
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except Exception as e:
        print("Failed to fetch the page:", e)
        return []

    soup = BeautifulSoup(response.content, 'html.parser')

    # Change these selectors based on the website's structure
    articles = soup.find_all('article')
    results = []

    for article in articles:
        try:
            title_tag = article.find('a')
            summary_tag = article.find('p')

            title = title_tag.text.strip() if title_tag else "No title"
            link = title_tag['href'] if title_tag and title_tag.has_attr('href') else "#"
            summary = summary_tag.text.strip() if summary_tag else "No summary"

            results.append({
                'title': title,
                'link': link,
                'summary': summary,
                'scraped_at': datetime.utcnow().isoformat()
            })
        except Exception as e:
            print("Error parsing article:", e)
            continue

    # Save to JSON
    with open('mining_articles.json', 'w') as f:
        json.dump(results, f, indent=4)

    # Save to CSV
    df = pd.DataFrame(results)
    df.to_csv('mining_articles.csv', index=False)

    print(f"Scraped {len(results)} articles.")
    return results


# Run if file is executed directly
if __name__ == "__main__":
    scrape_mining_articles()

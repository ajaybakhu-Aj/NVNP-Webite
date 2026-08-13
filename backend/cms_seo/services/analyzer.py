import re
import textstat
from bs4 import BeautifulSoup


class SEOAnalyzer:
    def __init__(self, content: str, keyword: str, title: str, description: str, domain: str = ""):
        self.raw_content = content
        self.keyword = keyword.lower().strip() if keyword else ""
        self.title = title
        self.description = description
        self.domain = domain
        
        self.soup = BeautifulSoup(content, 'html.parser')
        self.plain_text = self.soup.get_text(separator=' ')
        self.words = re.findall(r'\b\w+\b', self.plain_text.lower())
        self.word_count = len(self.words)
        
        self.score = 100
        self.recommendations = []
        self.metrics = {}

    def _deduct(self, points: int, message: str):
        self.score -= points
        self.recommendations.append(message)

    def analyze(self):
        if not self.keyword:
            self._deduct(100, "Focus keyword is missing.")
            return self._build_result()
            
        self._check_keyword_density()
        self._check_keyword_in_title()
        self._check_keyword_in_description()
        self._check_keyword_in_h1()
        self._check_keyword_in_first_100_words()
        self._check_readability()
        self._check_links()
        self._check_images()
        
        # Clamp score between 0 and 100
        self.score = max(0, min(100, self.score))
        return self._build_result()

    def _build_result(self):
        return {
            'score': self.score,
            'recommendations': self.recommendations,
            'metrics': self.metrics
        }

    def _check_keyword_density(self):
        if self.word_count == 0:
            self.metrics['keyword_density'] = 0
            self._deduct(10, "Content is empty.")
            return
            
        # Count non-overlapping occurrences of the keyword
        keyword_count = self.plain_text.lower().count(self.keyword)
        # Density based on words (rough approximation: keyword length in words)
        keyword_word_count = len(re.findall(r'\b\w+\b', self.keyword))
        density = (keyword_count * keyword_word_count) / self.word_count * 100
        self.metrics['keyword_density'] = density
        
        if density < 0.5:
            self._deduct(10, f"Keyword density is too low ({density:.2f}%). Aim for at least 0.5%.")
        elif density > 2.5:
            self._deduct(10, f"Keyword density is too high ({density:.2f}%). Aim for less than 2.5% to avoid keyword stuffing.")

    def _check_keyword_in_title(self):
        if not self.title:
            self._deduct(10, "Meta title is missing.")
        elif self.keyword not in self.title.lower():
            self._deduct(10, "Focus keyword does not appear in the SEO title.")

    def _check_keyword_in_description(self):
        if not self.description:
            self._deduct(10, "Meta description is missing.")
        elif self.keyword not in self.description.lower():
            self._deduct(10, "Focus keyword does not appear in the meta description.")

    def _check_keyword_in_h1(self):
        h1_tags = self.soup.find_all('h1')
        if not h1_tags:
            self._deduct(5, "No H1 tags found in the content.")
            return
            
        found = any(self.keyword in h1.get_text().lower() for h1 in h1_tags)
        if not found:
            self._deduct(10, "Focus keyword does not appear in any H1 tag.")

    def _check_keyword_in_first_100_words(self):
        first_100 = " ".join(self.words[:100])
        if self.keyword not in first_100:
            self._deduct(5, "Focus keyword does not appear in the first 100 words of the content.")

    def _check_readability(self):
        if self.word_count < 10:
            return  # Too short to measure accurately
            
        flesch_score = textstat.flesch_reading_ease(self.plain_text)
        self.metrics['readability_score'] = flesch_score
        
        if flesch_score < 50:
            self._deduct(5, f"Readability score is poor ({flesch_score:.1f}). Try using shorter sentences and simpler words.")

    def _check_links(self):
        links = self.soup.find_all('a', href=True)
        internal_links = 0
        external_links = 0
        
        for link in links:
            href = link['href']
            # Simple internal check: starts with / or matches domain
            if href.startswith('/') or href.startswith('#') or (self.domain and self.domain in href):
                internal_links += 1
            else:
                external_links += 1
                
        self.metrics['internal_links'] = internal_links
        self.metrics['external_links'] = external_links
        
        if internal_links == 0:
            self._deduct(5, "No internal links found in the content.")
        if external_links == 0:
            self._deduct(5, "No external links found in the content. Consider linking to authoritative sources.")

    def _check_images(self):
        images = self.soup.find_all('img')
        missing_alt = 0
        for img in images:
            alt = img.get('alt')
            if not alt or not alt.strip():
                missing_alt += 1
                
        self.metrics['images_missing_alt'] = missing_alt
        if missing_alt > 0:
            penalty = min(missing_alt * 2, 20)  # Max -20 penalty
            self._deduct(penalty, f"{missing_alt} image(s) are missing an 'alt' attribute.")

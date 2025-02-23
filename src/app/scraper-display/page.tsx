import { scrapeSIS } from '@/api/sis-scraper';

export default function ScraperDisplay() {
    scrapeSIS();

    return (
        <div>
            <h1>SIS Scraper</h1>
        </div>
    );
}

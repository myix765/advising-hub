import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

export async function scrapeSIS() {
    try {
        console.log("In scrapeSIS script");

        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page = await browser.newPage();
        const url = "https://sis.it.tufts.edu/psp/paprd/EMPLOYEE/EMPL/h/?tab=TFP_CLASS_SEARCH#search_results/term/2252/career/ALL/subject/course/attr/keyword/instructor";
        console.log("SIS URL: " + url);
        await page.goto(url);

        // Wait for checkboxes to be visible
        await page.waitForSelector('.tfp-show-actions', { visible: true });
        await page.locator('.tfp-show-result-desc').click();
        await page.locator('.tfp-show-result-sect').click();

        console.log("Seeing all classes with descriptions and sections:");

        // Wait for content to load and get all course entries
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get all course entries
        const courses = await page.evaluate(() => {
            const courseRows = document.querySelectorAll('.tfp_accordion_row');
            return Array.from(courseRows).map(row => {
                const header = row.querySelector('.accorion-head');
                const statusSpan = header?.querySelector('.status');
                const courseCode = statusSpan?.nextSibling?.textContent?.trim() || '';
                const courseName = header?.querySelector('span:not(.status)')?.textContent?.trim() || '';                
                const description = row.querySelector('.tfp-course-desc')?.textContent?.trim() || '';
                
                // Get section information
                const sections = Array.from(row.querySelectorAll('.tfp-sections tbody tr'))
                    .map(section => {
                        const cells = section.querySelectorAll('td');
                        const locationDiv = cells[3]?.querySelector('.tfp-loc');
                        const scheduleText = locationDiv?.querySelector('div')?.textContent?.trim() || '';
                        const locationNodes = locationDiv?.childNodes;
                        const location = locationNodes?.[1]?.textContent?.trim() || '';
                        const session = locationNodes?.[2]?.textContent?.trim() || '';
                        
                        return {
                            section: cells[0]?.firstChild?.textContent?.trim() || '',
                            classNo: cells[1]?.textContent?.trim() || '',
                            schedule: scheduleText,
                            location: location,
                            session: session,
                            faculty: cells[3]?.querySelector('.tfp-ins')?.textContent?.trim() || '',
                            credits: cells[4]?.textContent?.trim() || '',
                            status: cells[6]?.querySelector('img')?.getAttribute('alt') || ''
                        };
                    });

                return {
                    courseCode,
                    courseName,
                    description,
                    sections
                };
            });
        });

        browser.close();

        const data = JSON.stringify(courses, null, 2);
        const filePath = path.join(process.cwd(), 'public', 'SP25_courses.json');
        await fs.writeFile(filePath, data, 'utf8');
        
        console.log("Successfully scraped and saved courses:", courses.length);

    } catch (error) {
        console.error('Error during scraping:', error);
        throw error;
    }
}

// <button type="submit" class="make3d">Search</button>
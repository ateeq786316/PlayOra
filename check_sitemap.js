// Script to verify sitemap accessibility
console.log('Sitemap verification script');

// Using ES modules syntax since package.json has "type": "module"
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');

try {
  if (existsSync(sitemapPath)) {
    const sitemapContent = readFileSync(sitemapPath, 'utf8');
    console.log('✅ Sitemap file exists');
    
    // Basic validation
    if (sitemapContent.includes('<?xml') && sitemapContent.includes('<urlset')) {
      console.log('✅ Sitemap has correct XML structure');
    } else {
      console.log('❌ Sitemap structure may be incorrect');
    }
    
    // Count URLs
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    console.log(`📊 Sitemap contains ${urlCount} URLs`);
    
  } else {
    console.log('❌ Sitemap file does not exist');
  }
} catch (error) {
  console.error('Error checking sitemap:', error.message);
}
// ADD_SAMPLE_DATA.js
// Script to add sample blog posts to the database

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample blog posts data
const samplePosts = [
  {
    slug: 'welcome-to-playora',
    title: 'Welcome to PlayOra: Revolutionizing Sports Booking',
    excerpt: 'Discover how PlayOra is changing the game for sports enthusiasts worldwide with our innovative booking platform.',
    content: '# Welcome to PlayOra\n\nPlayOra is revolutionizing the way sports enthusiasts book courts and connect with fellow players. Our platform combines cutting-edge technology with a passion for sports to create the ultimate booking experience.\n\n## Key Features\n\n- **Instant Booking**: Reserve courts in real-time with just a few clicks\n- **Global Community**: Connect with players from around the world\n- **Smart Matching**: Find opponents of similar skill levels\n- **Integrated Payments**: Secure and seamless transaction processing\n\n## Getting Started\n\n1. Download the PlayOra app from the Google Play Store\n2. Create your profile and add your preferred sports\n3. Browse available courts in your area\n4. Book instantly and start playing!\n\nOur mission is to make sports accessible to everyone, everywhere. Join thousands of players who have already discovered the future of sports booking.',
    author_name: 'PlayOra Team',
    published: true,
    date: '2024-01-15T10:00:00Z'
  },
  {
    slug: 'top-5-basketball-courts',
    title: 'Top 5 Basketball Courts You Must Visit',
    excerpt: 'Explore the best basketball courts around the globe that every basketball lover should experience.',
    content: '# Top 5 Basketball Courts You Must Visit\n\nBasketball is more than just a sport; it\'s a global phenomenon. Here are the top 5 basketball courts that every fan should visit at least once.\n\n## 1. Madison Square Garden - New York, USA\n\nThe world-famous "Mecca of Basketball" has hosted countless historic games and is home to the New York Knicks.\n\n## 2. Staples Center - Los Angeles, USA\n\nHome to the LA Lakers and Clippers, this venue has witnessed numerous championship victories.\n\n## 3. Palacio de Deportes de Santander - Spain\n\nKnown for its incredible atmosphere during EuroLeague games.\n\n## 4. Žalgiris Arena - Lithuania\n\nA basketball cathedral with the most passionate fans in Europe.\n\n## 5. Melbourne Arena - Australia\n\nA modern facility that\'s becoming a favorite among international players.\n\nEach of these venues offers a unique experience that captures the spirit of basketball. Have you visited any of these courts? Share your experiences with us on PlayOra!',
    author_name: 'Sports Traveler',
    published: true,
    date: '2024-02-20T14:30:00Z'
  },
  {
    slug: 'how-to-create-winning-team',
    title: 'How to Create a Winning Team on PlayOra',
    excerpt: 'Learn the secrets to building a successful sports team using PlayOra\'s team management features.',
    content: '# How to Create a Winning Team on PlayOra\n\nBuilding a successful team is about more than just gathering skilled players. Here\'s how to create a winning team using PlayOra\'s powerful team management tools.\n\n## 1. Define Your Team Identity\n\nStart by establishing your team\'s mission, values, and playing style. This creates a foundation for all future decisions.\n\n## 2. Recruit the Right Players\n\nUse PlayOra\'s advanced search and filtering to find players who match your criteria:\n- Skill level\n- Availability\n- Location\n- Playing style\n\n## 3. Establish Clear Communication\n\nSet up team chat channels and regular meeting schedules to ensure everyone is on the same page.\n\n## 4. Schedule Consistent Practice\n\nUse PlayOra\'s booking system to reserve practice courts and set up recurring sessions.\n\n## 5. Track Performance\n\nUtilize PlayOra\'s analytics tools to monitor individual and team performance metrics.\n\n## 6. Foster Team Culture\n\nOrganize team-building activities and celebrate achievements to build strong relationships.\n\nWith these strategies and PlayOra\'s tools, you\'ll be well on your way to creating a championship-caliber team!',
    author_name: 'Team Coach Pro',
    published: true,
    date: '2024-03-10T09:15:00Z'
  }
];

async function addSamplePosts() {
  console.log('Adding sample blog posts...\n');
  
  for (let i = 0; i < samplePosts.length; i++) {
    const post = samplePosts[i];
    console.log(`Adding post ${i + 1}/${samplePosts.length}: ${post.title}`);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post]);
      
    if (error) {
      console.error(`❌ Error adding post "${post.title}":`, error.message);
    } else {
      console.log(`✅ Successfully added post "${post.title}"`);
    }
  }
  
  console.log('\n🎉 Sample data insertion completed!');
  console.log('You can now test the frontend at http://localhost:8081');
}

// Run the script
addSamplePosts();
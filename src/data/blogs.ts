/**
 * PlayOra Blog Data & Frontend API
 * 
 * HOW TO ADD A NEW BLOG POST:
 * 1. Copy the example object template below
 * 2. Update all fields (id, slug, title, etc.)
 * 3. Write content in Markdown or HTML
 * 4. Push to the BLOGS array
 * 5. The frontend will automatically render it
 * 
 * EXAMPLE BLOG OBJECT:
 * {
 *   id: 'unique-post-id',
 *   slug: 'url-friendly-slug',
 *   title: 'Your Blog Post Title',
 *   excerpt: 'Short description for cards and SEO.',
 *   content: `# Markdown Title\n\nYour markdown content here...`,
 *   date: '2024-07-15T10:00:00.000Z',
 *   author: { name: 'Author Name', avatar: '/images/authors/author.jpg' },
 *   tags: ['tag1', 'tag2'],
 *   cover: '/images/blog/cover.jpg'
 * }
 * 
 * SLUG RULES: lowercase, hyphens only, no spaces
 * DATE FORMAT: ISO 8601 string
 * CONTENT: Markdown or HTML (if starts with < treated as HTML)
 */

import { BlogPost, FetchParams, BlogApiResponse } from '../models/types';

export const BLOGS: BlogPost[] = [
  {
    id: 'post-001',
    slug: 'how-to-book-ground-fast',
    title: 'How to Book a Ground Fast in PlayOra',
    excerpt: 'Step-by-step guide to finding and booking grounds near you in under 2 minutes.',
    content: `# How to Book a Ground Fast in PlayOra

Booking a ground for your next game has never been easier. Follow these simple steps to secure your spot in under 2 minutes.

## Step 1: Open PlayOra and Set Your Location

Launch the PlayOra app and ensure your location is set correctly. This helps us show you the nearest available grounds.

## Step 2: Browse Available Grounds

Use our intelligent filters to find grounds that match your needs:
- **Sport Type**: Football, Cricket, Basketball, Tennis
- **Time Slot**: Morning, Evening, Night
- **Price Range**: Budget-friendly to premium
- **Amenities**: Parking, Changing rooms, Equipment rental

## Step 3: Check Real-Time Availability

Our live booking system shows real-time availability. Green slots are available, yellow are filling fast, and red are fully booked.

## Step 4: Instant Booking

Found the perfect ground? Tap "Book Now" and confirm your payment. You'll receive instant confirmation with all the details.

## Pro Tips

- Book during off-peak hours for better rates
- Join our community groups to find regular playing partners
- Leave reviews to help other players

Happy playing! 🏆`,
    date: '2024-12-01T10:00:00.000Z',
    author: { name: 'Ateeq Ur Rehman', avatar: '/images/authors/ateeq.jpg' },
    tags: ['booking', 'guide', 'tutorial'],
    cover: '/images/blog/book-ground.jpg'
  },
  {
    id: 'post-002',
    slug: 'building-perfect-sports-team',
    title: 'Building the Perfect Sports Team on PlayOra',
    excerpt: 'Learn how to create, manage, and grow a winning sports team using PlayOra\'s team features.',
    content: `# Building the Perfect Sports Team on PlayOra

Creating a successful sports team goes beyond just gathering players. It's about building chemistry, managing schedules, and fostering growth.

## Team Creation Made Simple

PlayOra makes team creation effortless:

1. **Define Your Team**: Choose sport, skill level, and playing frequency
2. **Invite Players**: Send invites via app, SMS, or social media
3. **Set Guidelines**: Establish team rules and expectations
4. **Plan Activities**: Schedule regular practices and matches

## Managing Team Dynamics

### Communication is Key
- Use our built-in chat for team discussions
- Share tactics and strategies
- Coordinate match schedules
- Celebrate victories together

### Track Progress
- Monitor individual player statistics
- Track team performance over time
- Set and achieve collective goals
- Analyze match data for improvements

## Growing Your Team

### Recruiting New Members
- Post in community forums
- Attend local tournaments
- Use our player matching system
- Network with other teams

### Retention Strategies
- Regular team events and bonding activities
- Fair playing time distribution
- Skill development programs
- Recognition and rewards system

Join thousands of successful teams already using PlayOra! 🚀`,
    date: '2024-11-28T14:30:00.000Z',
    author: { name: 'Sarah Johnson', avatar: '/images/authors/sarah.jpg' },
    tags: ['teams', 'management', 'community'],
    cover: '/images/blog/team-building.jpg'
  },
  {
    id: 'post-003',
    slug: 'playora-community-challenges',
    title: 'Join PlayOra Community Challenges and Win Big',
    excerpt: 'Discover exciting community challenges, tournaments, and competitions happening in your city.',
    content: `# Join PlayOra Community Challenges and Win Big

Ready to take your game to the next level? PlayOra's community challenges offer exciting opportunities to compete, improve, and win amazing prizes.

## What Are Community Challenges?

Community challenges are organized competitions that bring players together for friendly competition and skill development.

### Types of Challenges

**Weekly Tournaments**
- Quick 2-hour weekend competitions
- Multiple skill divisions
- Local and regional levels
- Cash prizes and trophies

**Skill Challenges**
- Individual skill competitions
- Accuracy, speed, and technique tests
- Monthly leaderboards
- Equipment and gear prizes

**Team Competitions**
- Inter-team championships
- League-style competitions
- Season-long tournaments
- Trophy presentations and recognition

## How to Participate

1. **Browse Active Challenges**: Check the challenges tab in your app
2. **Register**: One-click registration with instant confirmation
3. **Prepare**: Get practice schedules and preparation tips
4. **Compete**: Show up and give your best performance
5. **Celebrate**: Win or lose, celebrate the experience!

## Recent Winners

> "Winning the PlayOra Football Challenge was incredible! The organization was perfect, and I made so many new friends." - Ahmed, Mumbai Champion

> "The skill challenges helped me improve my game dramatically. Highly recommend!" - Priya, Delhi Winner

## Upcoming Challenges

- **Cricket Premier League**: December 15-22
- **Basketball 3v3 Tournament**: January 8-10
- **Football Skills Championship**: January 20-21

Don't miss out on the action! 🏆`,
    date: '2024-11-25T16:45:00.000Z',
    author: { name: 'Mike Chen', avatar: '/images/authors/mike.jpg' },
    tags: ['challenges', 'tournaments', 'competition'],
    cover: '/images/blog/challenges.jpg'
  },
  {
    id: 'post-004',
    slug: 'sports-safety-tips',
    title: '10 Essential Sports Safety Tips Every Player Should Know',
    excerpt: 'Stay safe while playing sports with these essential safety guidelines and injury prevention tips.',
    content: `# 10 Essential Sports Safety Tips Every Player Should Know

Playing sports is fun and healthy, but safety should always be your top priority. Here are essential tips to keep you injury-free and enjoying the game.

## Before You Play

### 1. Proper Warm-up
Always spend 10-15 minutes warming up before any physical activity. Include:
- Light jogging or walking
- Dynamic stretching
- Sport-specific movements
- Gradual intensity increase

### 2. Check Your Equipment
Inspect all equipment before use:
- Helmets for cracks or damage
- Padding for proper fit
- Shoes for worn treads
- Protective gear for secure fastening

### 3. Know the Rules
Understanding game rules prevents:
- Unnecessary collisions
- Rule violations leading to injuries
- Unsafe playing situations
- Poor sportsmanship incidents

## During the Game

### 4. Stay Hydrated
- Drink water before, during, and after play
- Take regular water breaks
- Watch for dehydration signs
- Use sports drinks for longer activities

### 5. Listen to Your Body
Stop immediately if you feel:
- Sharp or sudden pain
- Dizziness or nausea
- Excessive fatigue
- Any unusual discomfort

### 6. Play Fair
- Respect opponents and teammates
- Avoid aggressive or reckless behavior
- Follow referee decisions
- Maintain good sportsmanship

## After the Game

### 7. Cool Down Properly
- Gentle walking for 5-10 minutes
- Static stretching routine
- Deep breathing exercises
- Gradual heart rate reduction

### 8. Treat Injuries Immediately
Follow the R.I.C.E. method:
- **Rest** the injured area
- **Ice** for 15-20 minutes
- **Compression** with elastic bandage
- **Elevation** above heart level

### 9. Regular Health Checkups
- Annual physical examinations
- Sport-specific health screenings
- Update vaccinations
- Discuss concerns with healthcare providers

### 10. Learn From Experience
- Analyze what caused any injuries
- Adjust techniques and strategies
- Seek coaching for skill improvement
- Share knowledge with teammates

Remember: It's better to miss one game than an entire season due to injury! 🏥`,
    date: '2024-11-20T11:20:00.000Z',
    author: { name: 'Dr. Rashid Ahmed', avatar: '/images/authors/rashid.jpg' },
    tags: ['safety', 'health', 'tips'],
    cover: '/images/blog/safety.jpg'
  },
  {
    id: 'post-005',
    slug: 'playora-app-features-guide',
    title: 'Complete Guide to PlayOra App Features',
    excerpt: 'Explore all the powerful features that make PlayOra the ultimate sports booking and community app.',
    content: `# Complete Guide to PlayOra App Features

PlayOra isn't just a booking app – it's a complete sports ecosystem. Let's explore all the features that make your sporting life easier and more enjoyable.

## Core Booking Features

### Smart Ground Discovery
- **GPS-based search**: Find grounds within your preferred radius
- **Advanced filters**: Sport type, price, amenities, ratings
- **Real-time availability**: Live booking status updates
- **Photo galleries**: See facilities before you book

### Instant Booking System
- **One-tap booking**: Reserve your slot in seconds
- **Flexible payments**: Multiple payment options
- **Booking confirmations**: Instant SMS and email confirmations
- **Easy modifications**: Change or cancel bookings hassle-free

## Community Features

### Team Management
Create and manage teams with powerful tools:
- **Player invitations**: Invite via app, SMS, or social media
- **Role management**: Captain, co-captain, player roles
- **Team statistics**: Track performance and progress
- **Communication hub**: Team chat and announcements

### Social Networking
- **Player profiles**: Showcase your skills and achievements
- **Friend connections**: Connect with fellow players
- **Activity feeds**: Stay updated with community activities
- **Photo sharing**: Share your best sporting moments

## Advanced Features

### Live Chat System
- **Real-time messaging**: Chat with players and ground owners
- **Group conversations**: Team and event-specific chats
- **File sharing**: Share documents, images, and videos
- **Push notifications**: Never miss important messages

### Review and Rating System
- **Ground reviews**: Help others choose the best facilities
- **Player ratings**: Build your sporting reputation
- **Detailed feedback**: Comprehensive review system
- **Photo reviews**: Share visual experiences

### Challenge and Tournament System
- **Public challenges**: Join community competitions
- **Private tournaments**: Organize your own events
- **Skill assessments**: Test and improve your abilities
- **Leaderboards**: Track your ranking and progress

## Smart Features

### AI-Powered Recommendations
- **Personalized suggestions**: Grounds and players based on your preferences
- **Optimal timing**: Best times to book based on historical data
- **Weather integration**: Outdoor activity recommendations
- **Skill matching**: Connect with players of similar abilities

### Analytics Dashboard
- **Playing statistics**: Track your gaming frequency and patterns
- **Expense tracking**: Monitor your sporting budget
- **Achievement badges**: Unlock rewards for milestones
- **Progress reports**: Visual insights into your sporting journey

## Convenience Features

### Calendar Integration
- **Sync with device calendar**: Never double-book your time
- **Recurring bookings**: Set up regular playing sessions
- **Reminder notifications**: Get notified before your games
- **Availability sharing**: Let others know when you're free

### Location Services
- **Turn-by-turn navigation**: Get directions to your booked ground
- **Nearby amenities**: Find parking, food, and facilities
- **Check-in system**: Confirm your arrival at venues
- **Emergency contacts**: Quick access to help when needed

## Premium Features

Unlock additional capabilities with PlayOra Premium:
- **Priority booking**: Get first access to popular slots
- **Advanced analytics**: Detailed performance insights
- **Custom tournaments**: Organize professional-level events
- **Dedicated support**: Premium customer service

Ready to explore all these features? Download PlayOra today! 📱`,
    date: '2024-11-15T09:15:00.000Z',
    author: { name: 'PlayOra Team', avatar: '/images/authors/team.jpg' },
    tags: ['features', 'guide', 'app'],
    cover: '/images/blog/features-guide.jpg'
  },
  {
    id: 'post-006',
    slug: 'success-stories-playora-community',
    title: 'Success Stories from the PlayOra Community',
    excerpt: 'Inspiring stories of players and teams who found success through the PlayOra platform.',
    content: `# Success Stories from the PlayOra Community

Every day, PlayOra helps players and teams achieve their sporting dreams. Here are some inspiring stories from our amazing community.

## From Strangers to Champions: The Mumbai United Story

**The Beginning**
Rohit was new to Mumbai and struggling to find people to play football with. Using PlayOra's player matching feature, he connected with 10 other players who were in similar situations.

**Building the Team**
"We started with just pickup games, but the chemistry was incredible," says Rohit. "Within a month, we decided to form Mumbai United and register for local tournaments."

**The Journey**
Using PlayOra's team management features, they:
- Organized regular practice sessions
- Tracked player performance
- Coordinated match schedules
- Built team chemistry through group chats

**The Success**
Mumbai United went on to win the Mumbai District Championship in their first year, beating teams that had been playing together for years.

> "PlayOra didn't just help us find players – it helped us become a family. We're now planning to enter state-level competitions!" - Rohit, Team Captain

## The Cricket Academy Discovery

**Finding Hidden Talent**
Coach Sunil was running a small cricket academy but struggled to find talented players from different neighborhoods.

**Using PlayOra**
He started using PlayOra's skill challenge features to scout talent across the city. Players could showcase their abilities through video submissions and skill tests.

**The Results**
- Discovered 15 talented young cricketers
- Expanded his academy by 300%
- Three of his students got selected for district teams
- Built a network of coaches across the region

> "PlayOra revolutionized how we scout and develop talent. It's opened doors we never knew existed." - Coach Sunil

## The Weekend Warrior Transformation

**Meet Priya**
A software engineer who worked long hours and rarely exercised. She wanted to stay fit but found gym routines boring.

**Discovering Sports Through PlayOra**
- Started with casual badminton games
- Gradually improved her skills
- Joined a women's league team
- Participated in weekend tournaments

**The Transformation**
Six months later:
- Lost 15kg and gained incredible fitness
- Made 20+ new friends
- Won her first tournament
- Started coaching beginners

> "PlayOra gave me a community and a purpose. Sports became my therapy, and winning that first tournament was life-changing." - Priya

## The Ground Owner Success

**Background**
Kasim owned a small football ground but struggled with bookings and customer management.

**Joining PlayOra**
- Listed his ground on the platform
- Used automated booking management
- Received detailed customer feedback
- Implemented suggested improvements

**Business Growth**
- Bookings increased by 250%
- Revenue doubled in 8 months
- Customer satisfaction improved dramatically
- Expanded to two additional locations

> "PlayOra transformed my business. The platform handles everything – bookings, payments, customer service. I can focus on providing the best facilities." - Kasim

## The Corporate Team Building Success

**The Challenge**
Tech company Innovate Solutions wanted to improve employee engagement and team bonding.

**The PlayOra Solution**
- Organized inter-department sports leagues
- Used PlayOra for scheduling and coordination
- Tracked participation and engagement
- Created friendly competition between teams

**The Impact**
- 80% employee participation
- Improved workplace relationships
- Reduced stress levels company-wide
- Increased productivity and job satisfaction

> "Our PlayOra corporate league brought our teams closer than any traditional team-building activity ever did." - HR Director, Innovate Solutions

## The Youth Development Program

**The Vision**
Creating opportunities for underprivileged youth to access sports facilities and coaching.

**Implementation**
- Partnered with NGOs through PlayOra
- Sponsored ground bookings for youth programs
- Connected volunteer coaches with programs
- Tracked participant progress and development

**The Results**
- 500+ youth engaged in regular sports
- 50+ received coaching scholarships
- 10+ selected for state-level training
- Created pathways out of poverty through sports

## Join Our Success Stories

These stories represent thousands of similar successes happening every day on PlayOra. Whether you're looking to:
- Find playing partners
- Build a team
- Discover talent
- Grow your business
- Transform your lifestyle

PlayOra provides the platform, community, and tools to make it happen.

**Ready to write your own success story?** Download PlayOra today and join our thriving sports community! 🌟`,
    date: '2024-11-10T13:30:00.000Z',
    author: { name: 'Community Team', avatar: '/images/authors/community.jpg' },
    tags: ['success', 'community', 'stories'],
    cover: '/images/blog/success-stories.jpg'
  }
];

/**
 * Frontend API function to fetch blogs with filtering, pagination, and search
 * Simulates network latency for realistic user experience
 */
export async function fetchBlogs(params: FetchParams = {}): Promise<BlogApiResponse> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 200));

  const {
    page = 1,
    limit = 5,
    q = '',
    tag = ''
  } = params;

  let filteredBlogs = [...BLOGS];

  // Filter by search query
  if (q) {
    const query = q.toLowerCase();
    filteredBlogs = filteredBlogs.filter(blog =>
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query) ||
      blog.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  // Filter by tag
  if (tag) {
    filteredBlogs = filteredBlogs.filter(blog =>
      blog.tags.includes(tag)
    );
  }

  // Sort by date (newest first)
  filteredBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate pagination
  const total = filteredBlogs.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  return {
    data: paginatedBlogs,
    total,
    page,
    totalPages
  };
}

/**
 * Get a single blog post by slug
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return BLOGS.find(blog => blog.slug === slug) || null;
}

/**
 * Get all unique tags from all blog posts
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  BLOGS.forEach(blog => {
    blog.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Get recent blog posts (latest 3)
 */
export function getRecentBlogs(count: number = 3): BlogPost[] {
  return [...BLOGS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

/**
 * Get related blog posts by overlapping tags
 */
export async function getRelatedBlogs(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 100));

  const current = BLOGS.find(b => b.slug === currentSlug);
  if (!current) return [];

  return BLOGS
    .filter(b => b.slug !== currentSlug)
    .filter(b => b.tags.some(tag => current.tags.includes(tag)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Utility function to bulk import blog posts from JSON
 * Useful for content managers who prefer JSON editing
 */
export function seedBlogsFromJSON(jsonBlogs: BlogPost[]): void {
  // Merge unique posts by id; skip duplicates
  jsonBlogs.forEach(post => {
    const exists = BLOGS.find(existing => existing.id === post.id);
    if (!exists) {
      BLOGS.push(post);
    }
  });
}
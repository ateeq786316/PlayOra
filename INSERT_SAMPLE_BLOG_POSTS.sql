-- INSERT SAMPLE BLOG POSTS
-- Run this script in the Supabase SQL editor to add sample blog posts to your database

INSERT INTO blog_posts (slug, title, excerpt, content, author_name, published, date) 
VALUES 
  (
    'welcome-to-playora',
    'Welcome to PlayOra: Revolutionizing Sports Booking',
    'Discover how PlayOra is changing the game for sports enthusiasts worldwide with our innovative booking platform.',
    '# Welcome to PlayOra

PlayOra is revolutionizing the way sports enthusiasts book courts and connect with fellow players. Our platform combines cutting-edge technology with a passion for sports to create the ultimate booking experience.

## Key Features

- **Instant Booking**: Reserve courts in real-time with just a few clicks
- **Global Community**: Connect with players from around the world
- **Smart Matching**: Find opponents of similar skill levels
- **Integrated Payments**: Secure and seamless transaction processing

## Getting Started

1. Download the PlayOra app from the Google Play Store
2. Create your profile and add your preferred sports
3. Browse available courts in your area
4. Book instantly and start playing!

Our mission is to make sports accessible to everyone, everywhere. Join thousands of players who have already discovered the future of sports booking.',
    'PlayOra Team',
    true,
    '2024-01-15T10:00:00Z'
  ),
  (
    'top-5-basketball-courts',
    'Top 5 Basketball Courts You Must Visit',
    'Explore the best basketball courts around the globe that every basketball lover should experience.',
    '# Top 5 Basketball Courts You Must Visit

Basketball is more than just a sport; it''s a global phenomenon. Here are the top 5 basketball courts that every fan should visit at least once.

## 1. Madison Square Garden - New York, USA

The world-famous "Mecca of Basketball" has hosted countless historic games and is home to the New York Knicks.

## 2. Staples Center - Los Angeles, USA

Home to the LA Lakers and Clippers, this venue has witnessed numerous championship victories.

## 3. Palacio de Deportes de Santander - Spain

Known for its incredible atmosphere during EuroLeague games.

## 4. Žalgiris Arena - Lithuania

A basketball cathedral with the most passionate fans in Europe.

## 5. Melbourne Arena - Australia

A modern facility that''s becoming a favorite among international players.

Each of these venues offers a unique experience that captures the spirit of basketball. Have you visited any of these courts? Share your experiences with us on PlayOra!',
    'Sports Traveler',
    true,
    '2024-02-20T14:30:00Z'
  ),
  (
    'how-to-create-winning-team',
    'How to Create a Winning Team on PlayOra',
    'Learn the secrets to building a successful sports team using PlayOra''s team management features.',
    '# How to Create a Winning Team on PlayOra

Building a successful team is about more than just gathering skilled players. Here''s how to create a winning team using PlayOra''s powerful team management tools.

## 1. Define Your Team Identity

Start by establishing your team''s mission, values, and playing style. This creates a foundation for all future decisions.

## 2. Recruit the Right Players

Use PlayOra''s advanced search and filtering to find players who match your criteria:
- Skill level
- Availability
- Location
- Playing style

## 3. Establish Clear Communication

Set up team chat channels and regular meeting schedules to ensure everyone is on the same page.

## 4. Schedule Consistent Practice

Use PlayOra''s booking system to reserve practice courts and set up recurring sessions.

## 5. Track Performance

Utilize PlayOra''s analytics tools to monitor individual and team performance metrics.

## 6. Foster Team Culture

Organize team-building activities and celebrate achievements to build strong relationships.

With these strategies and PlayOra''s tools, you''ll be well on your way to creating a championship-caliber team!',
    'Team Coach Pro',
    true,
    '2024-03-10T09:15:00Z'
  ),
  (
    'nutrition-for-athletes',
    'Nutrition Tips for Peak Athletic Performance',
    'Fuel your body correctly with these essential nutrition tips designed specifically for athletes.',
    '# Nutrition Tips for Peak Athletic Performance

Proper nutrition is the cornerstone of athletic excellence. Here are essential tips to fuel your body for optimal performance.

## Pre-Workout Nutrition

Eat a balanced meal 2-3 hours before exercise:
- Complex carbohydrates for sustained energy
- Lean protein for muscle support
- Healthy fats in moderation

## Hydration Strategy

- Drink 16-20 oz of water 2-3 hours before exercise
- Consume 6-8 oz every 15-20 minutes during activity
- Monitor urine color as a hydration indicator

## Post-Workout Recovery

Within 30 minutes of finishing:
- 3:1 ratio of carbohydrates to protein
- Easily digestible foods
- Adequate fluids to replace sweat loss

## Key Nutrients for Athletes

### Carbohydrates
- Primary fuel source for high-intensity exercise
- Aim for 6-10 grams per kilogram of body weight daily

### Protein
- Essential for muscle repair and growth
- Consume 1.2-2.0 grams per kilogram of body weight daily

### Healthy Fats
- Support hormone production and reduce inflammation
- Make up 20-35% of total daily calories

Remember, nutrition is highly individual. Work with a sports nutritionist to develop a personalized plan that meets your specific needs and goals.',
    'Nutrition Expert',
    true,
    '2024-04-05T11:45:00Z'
  ),
  (
    'playora-community-stories',
    'Amazing Stories from the PlayOra Community',
    'Heartwarming tales from players who found friendship, competition, and success through PlayOra.',
    '# Amazing Stories from the PlayOra Community

The PlayOra community is filled with inspiring stories of friendship, competition, and personal growth. Here are a few of our favorites.

## From Strangers to Champions

Maria and James connected on PlayOra just six months ago. Now they''re doubles partners who recently won their local tournament. "We never would have met without PlayOra," says Maria. "Now we''re not just teammates, but best friends."

## Building a Local Community

David used PlayOra to organize weekly pickup games at his local park. What started with 4 players has grown to over 30 regular participants. "It''s brought our whole neighborhood together," he shares.

## Overcoming Challenges

After recovering from an injury, Sarah struggled to find players who understood her limitations. Through PlayOra''s skill-level matching, she found a group that helped her rebuild her confidence. "The supportive community made all the difference in my recovery."

## Global Connections

Players from 15 different countries regularly connect through PlayOra''s global matchmaking feature. "I''ve made friends on every continent," says Tom, an avid traveler who uses PlayOra wherever he goes.

These stories represent just a fraction of the connections being made every day through PlayOra. Join our community and create your own amazing story!',
    'Community Manager',
    true,
    '2024-05-12T16:20:00Z'
  );

-- Verify the insertion
SELECT COUNT(*) as total_blog_posts FROM blog_posts;
SELECT slug, title, published FROM blog_posts ORDER BY date DESC;
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const existing = await prisma.user.findUnique({ where: { email: 'admin@theeyecentre.com' } });
  if (!existing) {
    const hashed = await bcrypt.hash('changeme123', 12);
    await prisma.user.create({
      data: {
        name:     'Admin',
        email:    'admin@theeyecentre.com',
        password: hashed,
        role:     'ADMIN',
      },
    });
    console.log('Created admin user: admin@theeyecentre.com / changeme123');
  } else {
    console.log('Admin user already exists.');
  }

  // Sample products
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        {
          name:        'Wayfarer Classic',
          brand:       'Ray-Ban',
          slug:        'ray-ban-wayfarer-classic',
          price:       149,
          category:    'PRESCRIPTION',
          gender:      'UNISEX',
          shape:       'WAYFARER',
          color:       'Black',
          material:    'Acetate',
          inStock:     true,
          stockCount:  20,
          featured:    true,
          description: 'The iconic Wayfarer frame — timeless style in premium acetate.',
          images:      ['https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&q=80'],
        },
        {
          name:        'Round Metal',
          brand:       'Ray-Ban',
          slug:        'ray-ban-round-metal',
          price:       159,
          category:    'PRESCRIPTION',
          gender:      'UNISEX',
          shape:       'ROUND',
          color:       'Gold',
          material:    'Metal',
          inStock:     true,
          stockCount:  15,
          featured:    true,
          description: 'Vintage-inspired round metal frames with a modern twist.',
          images:      ['https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80'],
        },
        {
          name:        'Clubmaster',
          brand:       'Ray-Ban',
          slug:        'ray-ban-clubmaster',
          price:       169,
          category:    'DESIGNER',
          gender:      'UNISEX',
          shape:       'SQUARE',
          color:       'Tortoise',
          material:    'Acetate & Metal',
          inStock:     true,
          stockCount:  10,
          featured:    false,
          description: 'The iconic Clubmaster — bold, retro character in a modern frame.',
          images:      ['https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80'],
        },
        {
          name:        'Aviator Classic',
          brand:       'Ray-Ban',
          slug:        'ray-ban-aviator-classic',
          price:       139,
          category:    'SUNGLASSES',
          gender:      'UNISEX',
          shape:       'AVIATOR',
          color:       'Silver',
          material:    'Metal',
          inStock:     true,
          stockCount:  25,
          featured:    true,
          description: 'The original pilot frame, crafted in lightweight metal.',
          images:      ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80'],
        },
        {
          name:        'Cat Eye',
          brand:       'Prada',
          slug:        'prada-cat-eye',
          price:       289,
          category:    'DESIGNER',
          gender:      'WOMENS',
          shape:       'CAT_EYE',
          color:       'Rose Gold',
          material:    'Metal',
          inStock:     true,
          stockCount:  8,
          featured:    false,
          description: 'Elegant Italian craftsmanship in a classic cat-eye silhouette.',
          images:      ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80'],
        },
        {
          name:        'Rectangular Slim',
          brand:       'Tom Ford',
          slug:        'tom-ford-rectangular-slim',
          price:       319,
          category:    'DESIGNER',
          gender:      'MENS',
          shape:       'RECTANGLE',
          color:       'Matte Black',
          material:    'Titanium',
          inStock:     true,
          stockCount:  6,
          featured:    false,
          description: 'Slim, modern rectangles in lightweight titanium.',
          images:      ['https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80'],
        },
      ],
    });
    console.log('Created 6 sample products.');
  } else {
    console.log(`${count} products already exist.`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

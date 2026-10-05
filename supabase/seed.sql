-- Starter services. Run after schema.sql. Clears the table first, so running
-- it again does not duplicate rows. Portfolio items start empty.
TRUNCATE services RESTART IDENTITY;

INSERT INTO services (number, title, summary, description, price, sort_order) VALUES
  ('01', 'Consolidation Services', 'Combine your purchases into one shipment, so receiving your items is easier and more organized.', 'Combine your purchases into one shipment to make receiving your items easier and more organized.

When you order from several shops, we gather everything at one address, check each item, and send it together. This saves you from paying for many small parcels and tracking several deliveries.', '', 1),
  ('02', 'Korea Purchase Assistance', 'We buy K-pop merchandise and other items from Korean websites and sellers, and keep you updated.', 'We help you purchase K-pop merchandise and other items from Korean websites and sellers.

Send us the item link or the shop you want, and we handle the purchase on your behalf. We keep you updated at each step so you always know where your order stands.', '', 2),
  ('03', 'Japan Site Purchase Assistance', 'Get items from Japanese shopping websites, even when direct international purchasing is not available.', 'Get items from Japanese shopping websites even when direct international purchasing is not available.

Many Japanese shops do not ship to the Philippines directly. We place the order for you, confirm the details with you first, and arrange the forwarding once the item is ready.', '', 3),
  ('04', 'Thailand Purchase Assistance', 'Purchase items from Thailand with help from checkout all the way to forwarding to your door.', 'Purchase items from Thailand with assistance from checkout to forwarding.

We help you buy from Thai shops and marketplaces, handle the checkout, and make sure your item reaches you safely, from the first payment to the final delivery.', '', 4),
  ('05', 'Mercari Japan Purchase Assistance', 'Found something on Mercari Japan? Send us the listing and we will assist with the purchase.', 'Looking for something on Mercari Japan? Send us the listing and we can assist with the purchase.

We review the listing with you, check the seller and the item details, and purchase it on your behalf, so you can shop from Mercari Japan with more confidence.', '', 5),
  ('06', 'Bunjang Korea Purchase Assistance', 'We help you access listings from Bunjang Korea and purchase items from Korean sellers safely.', 'We assist with purchases from Bunjang Korea so you can access listings from Korean sellers.

Bunjang has many sellers and listings that are hard to reach from abroad. We help you find the right item, confirm its condition with you, and complete the purchase.', '', 6),
  ('07', 'Weverse Purchase Assistance', 'Get your favorite official K-pop merchandise from Weverse Shop with our purchase assistance.', 'Get your favorite official K-pop merchandise from Weverse Shop with our purchase assistance.

We help you order official releases and merchandise from Weverse Shop, keep track of your order, and make the purchase process clearer if you are shopping from overseas.', '', 7),
  ('08', 'Address Rental / Forwarding', 'Use our overseas address services in Korea or Thailand to receive and forward your purchases.', 'Use our available overseas address services for receiving and forwarding your purchases.

If a shop will not deliver to the Philippines, we can receive your package at an address in Korea or Thailand and forward it to you. You send us the details, and we handle the rest.', '', 8);

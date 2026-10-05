-- Starter services. Run after schema.sql. Clears the table first, so running
-- it again does not duplicate rows. Portfolio items start empty.
TRUNCATE services RESTART IDENTITY;

INSERT INTO services (number, title, summary, description, price, sort_order) VALUES
  ('01', 'Consolidation Services', 'Combine your orders into one shipment', 'Combine your purchases into one shipment to make receiving your items easier and more organized.', '', 1),
  ('02', 'Korea Purchase Assistance', 'We buy items from Korea for you', 'We help you purchase K-pop merchandise and other items from Korean websites and sellers.', '', 2),
  ('03', 'Japan Site Purchase Assistance', 'We buy from Japanese shopping sites', 'Get items from Japanese shopping websites even when direct international purchasing is not available.', '', 3),
  ('04', 'Thailand Purchase Assistance', 'We buy items from Thailand for you', 'Purchase items from Thailand with assistance from checkout to forwarding.', '', 4),
  ('05', 'Mercari Japan Purchase Assistance', 'Mercari Japan purchase assistance', 'Looking for something on Mercari Japan? Send us the listing and we can assist with the purchase.', '', 5),
  ('06', 'Bunjang Korea Purchase Assistance', 'Bunjang Korea purchase assistance', 'We assist with purchases from Bunjang Korea so you can access listings from Korean sellers.', '', 6),
  ('07', 'Weverse Purchase Assistance', 'Weverse shop purchase assistance', 'Get your favorite official K-pop merchandise from Weverse Shop with our purchase assistance.', '', 7),
  ('08', 'Address Rental / Forwarding', 'Korea and Thailand address rental and forwarding', 'Use our available overseas address services for receiving and forwarding your purchases.', '', 8);

-- 插入默认菜品
INSERT OR IGNORE INTO dishes (id, name, image, category, ingredients, available, created_by) VALUES 
(1, 'Yangzhou Fried Rice', '/placeholder.svg?height=200&width=300', 'staple', '["Rice", "Eggs", "Shrimp", "Ham", "Green peas", "Scallions", "Soy sauce"]', TRUE, 1),
(2, 'Steamed White Rice', '/placeholder.svg?height=200&width=300', 'staple', '["Jasmine rice", "Water"]', TRUE, 1),
(3, 'Hand-pulled Noodles', '/placeholder.svg?height=200&width=300', 'staple', '["Wheat flour", "Water", "Salt", "Alkaline water"]', FALSE, 1),
(4, 'Sweet and Sour Pork', '/placeholder.svg?height=200&width=300', 'meat', '["Pork tenderloin", "Pineapple", "Bell peppers", "Onion", "Vinegar", "Sugar", "Ketchup"]', TRUE, 1),
(5, 'Kung Pao Chicken', '/placeholder.svg?height=200&width=300', 'meat', '["Chicken breast", "Peanuts", "Dried chilies", "Sichuan peppercorns", "Scallions", "Garlic"]', TRUE, 1),
(7, 'Mapo Tofu', '/placeholder.svg?height=200&width=300', 'vegetable', '["Silken tofu", "Ground pork", "Doubanjiang", "Sichuan peppercorns", "Scallions", "Garlic"]', TRUE, 1),
(8, 'Stir-fried Bok Choy', '/placeholder.svg?height=200&width=300', 'vegetable', '["Baby bok choy", "Garlic", "Ginger", "Oyster sauce", "Sesame oil"]', TRUE, 1),
(9, 'Dry-fried Green Beans', '/placeholder.svg?height=200&width=300', 'vegetable', '["Green beans", "Preserved vegetables", "Ground pork", "Dried chilies", "Garlic"]', TRUE, 1),
(10, 'Jasmine Tea', '/placeholder.svg?height=200&width=300', 'drink', '["Jasmine tea leaves", "Hot water"]', TRUE, 1),
(11, 'Soy Milk', '/placeholder.svg?height=200&width=300', 'drink', '["Soybeans", "Water", "Sugar (optional)"]', TRUE, 1);


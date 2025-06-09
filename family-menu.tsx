import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Star, Leaf } from "lucide-react"

export default function FamilyMenu() {
  const menuSections = [
    {
      title: "Appetizers & Starters",
      items: [
        {
          name: "Family Nachos Supreme",
          description: "Crispy tortilla chips loaded with cheese, jalapeños, sour cream, and guacamole",
          price: "$12.99",
          popular: true,
        },
        {
          name: "Mozzarella Sticks",
          description: "Golden fried mozzarella with marinara dipping sauce",
          price: "$8.99",
        },
        {
          name: "Buffalo Wings",
          description: "Spicy chicken wings served with celery sticks and ranch dressing",
          price: "$11.99",
        },
        {
          name: "Loaded Potato Skins",
          description: "Crispy potato skins with bacon, cheese, and green onions",
          price: "$9.99",
        },
      ],
    },
    {
      title: "Family Favorites",
      items: [
        {
          name: "Mom's Homestyle Meatloaf",
          description: "Traditional meatloaf with mashed potatoes, green beans, and gravy",
          price: "$16.99",
          popular: true,
        },
        {
          name: "Dad's BBQ Ribs",
          description: "Fall-off-the-bone ribs with coleslaw and baked beans",
          price: "$22.99",
        },
        {
          name: "Grandma's Fried Chicken",
          description: "Crispy fried chicken with mac and cheese and cornbread",
          price: "$18.99",
          popular: true,
        },
        {
          name: "Family Lasagna",
          description: "Layers of pasta, meat sauce, and three cheeses with garlic bread",
          price: "$17.99",
        },
      ],
    },
    {
      title: "Burgers & Sandwiches",
      items: [
        {
          name: "The Family Burger",
          description: "Double patty with cheese, lettuce, tomato, and our special sauce",
          price: "$14.99",
        },
        {
          name: "Grilled Chicken Club",
          description: "Grilled chicken breast with bacon, avocado, and ranch",
          price: "$13.99",
        },
        {
          name: "Philly Cheesesteak",
          description: "Sliced steak with peppers, onions, and melted cheese",
          price: "$15.99",
        },
      ],
    },
    {
      title: "Kids Menu",
      items: [
        {
          name: "Mini Cheeseburger",
          description: "Kid-sized burger with fries and apple slices",
          price: "$7.99",
        },
        {
          name: "Chicken Tenders",
          description: "Crispy chicken strips with honey mustard and fries",
          price: "$6.99",
        },
        {
          name: "Mac & Cheese",
          description: "Creamy macaroni and cheese with steamed broccoli",
          price: "$5.99",
          healthy: true,
        },
        {
          name: "Grilled Cheese",
          description: "Classic grilled cheese sandwich with tomato soup",
          price: "$6.99",
        },
      ],
    },
    {
      title: "Desserts",
      items: [
        {
          name: "Family Chocolate Cake",
          description: "Rich chocolate layer cake perfect for sharing",
          price: "$8.99",
        },
        {
          name: "Apple Pie à la Mode",
          description: "Warm apple pie with vanilla ice cream",
          price: "$6.99",
        },
        {
          name: "Ice Cream Sundae",
          description: "Three scoops with your choice of toppings",
          price: "$5.99",
        },
      ],
    },
    {
      title: "Beverages",
      items: [
        {
          name: "Fresh Lemonade",
          description: "House-made lemonade with real lemons",
          price: "$3.99",
        },
        {
          name: "Milkshakes",
          description: "Vanilla, chocolate, or strawberry",
          price: "$4.99",
        },
        {
          name: "Coffee & Tea",
          description: "Freshly brewed coffee or selection of teas",
          price: "$2.99",
        },
        {
          name: "Soft Drinks",
          description: "Coke, Pepsi, Sprite, and more",
          price: "$2.99",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">The Family Table</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              Where families come together for great food & memories
            </p>
            <div className="flex justify-center items-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">Family Owned Since 1985</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {menuSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100">
                <CardTitle className="text-2xl md:text-3xl text-center text-gray-800">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                          {item.popular && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800">
                              <Heart className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                          {item.healthy && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <Leaf className="w-3 h-3 mr-1" />
                              Healthy
                            </Badge>
                          )}
                        </div>
                        <span className="text-lg font-bold text-orange-600">{item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <Card className="mt-8 bg-gradient-to-r from-orange-100 to-red-100">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Family Dining Hours</h3>
            <div className="grid md:grid-cols-3 gap-4 text-gray-700">
              <div>
                <p className="font-medium">Monday - Thursday</p>
                <p>11:00 AM - 9:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Friday - Saturday</p>
                <p>11:00 AM - 10:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Sunday</p>
                <p>12:00 PM - 8:00 PM</p>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-gray-600">
              🍽️ Kids eat free on Sundays with adult entrée purchase • 👨‍👩‍👧‍👦 Family portions available for groups of
              4+
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

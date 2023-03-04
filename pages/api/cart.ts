export default function handler(req, res) {
  // Mengecek apakah request merupakan POST
  if (req.method === "POST") {
    // Membuat atau mengambil keranjang dari local storage
    let cart = JSON.parse(req.body);
    if (!cart) {
      cart = [];
    }
    // Menyimpan keranjang ke local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    res.status(200).json({ success: true });
  } else if (req.method === "GET") {
    // Mengambil keranjang dari local storage
    const cart = JSON.parse(localStorage.getItem("cart"));
    res.status(200).json(cart);
  }
}

module.exports = () => {
  const data = {
    products: [],
  }

  for(let i = 0; i < 1000; i++) {
    data.products.push({
      id: i + 1,
      price: ((120 - 80) * Math.random() + 80).toFixed(2),
      title: `Camiseta ${i + 1}`
    })
  }

  return data;
}
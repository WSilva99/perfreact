import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults'
import styles from '../styles/Home.module.css'

type Product = {
  id: number;
  title: string;
  price: number;
}

type ProductFormatted = {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
}

type ResultsData = {
  totalPrice: number;
  products: ProductFormatted[];
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<ResultsData>({totalPrice: 0, products: []});

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    if(!search.trim())
      return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();
    
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    
    let totalPrice = 0;
    const products = data.map((product: Product) => {
      totalPrice += Number(product.price);
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: currencyFormatter.format(product.price)
      }
    })

    setResults({totalPrice, products});
  }

  const addToWishlist = useCallback(async (id: number) => console.log(id), []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>
      <SearchResults results={results} onAddToWishlist={addToWishlist} />
    </div>
  )
}

export default Home

import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: {
    totalPrice: number,
    products: Array<{
      id: number;
      price: number;
      title: string;
      priceFormatted: string;
    }>,
  } 
  onAddToWishlist: (id: number) => void
}

export function SearchResults({results, onAddToWishlist}: SearchResultsProps) {
  // const totalPrice = useMemo(() => results.reduce((total, product) => total + product.price, 0), [results]);
  const rowRenderer = ({index, style}: any) => (
    <div style={style}>
      <ProductItem product={results.products[index]} onAddToWishlist={onAddToWishlist} />
    </div>
  );

  return (
    <div style={{position: "relative", height: "60%"}}>
      <h2>{results.totalPrice}</h2>
      {/* O List do react-virtualized não funcionou, encontrei uma alternativa */}
      <AutoSizer>
        {({ height, width }: any) => {
          console.log({height, width});
          return (
            <List
              itemCount={results.products.length}
              height={height}
              width={width}
              itemSize={30}
            >
              {rowRenderer}
            </List>
          )
        }}
      </AutoSizer>
      {/* { results.map(product => {
        return <ProductItem key={product.id} product={product} onAddToWishlist={onAddToWishlist} />
      }) } */}
    </div>
  );
}

/*
  Quando usar useMemo?

  1. Cálculos pesados
  2. Igualdade referencial
*/
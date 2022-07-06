import dynamic from "next/dynamic";
import { memo, useState } from "react";

// Use dynamic to lazy loading in Next (SSR); To react use lazy from react;
import { AddProductToWishlistProps } from "./AddProductToWishlist";
const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  // use then when there is no default export
  return import('./AddProductToWishlist').then(module => module.AddProductToWishlist);
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  },
  onAddToWishlist: (id: number) => void
}

function ProductItemComponent({product, onAddToWishlist}: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Add to wishlist</button>
      {isAddingToWishlist && <AddProductToWishlist onAddToWishlist={() => onAddToWishlist(product.id)} onRequestClose={() => setIsAddingToWishlist(false)} />}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => Object.is(prevProps.product, nextProps.product));

/*
  Quando usar o memo?

  1. Pure Functional Components
  2. Components Renders too often
  3. Re-renders with same props
  4. Medium to big size components
*/
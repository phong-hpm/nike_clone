import { FC, useMemo, useState } from "react";

// components
import ProductColorList from "./ProductColorList";

// components
import ProductPrice from "./ProductPrice";

export interface ProductCardProps {
  loading?: boolean;
  product: IProduct;
}

const LABELS: Record<string, string> = {
  JUST_IN: "Just In",
};

const ProductCard: FC<ProductCardProps> = ({ loading, product }) => {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const colourCount = product?.productAnotherColors?.length || 1;

  const label = useMemo(() => {
    if (product.label === "IN_STOCK") return "";
    return LABELS[product.label] || product.label;
  }, [product.label]);

  return (
    <div className="relative">
      {/* loading overlay */}
      {loading && <div className="absolute z-10 top-0 left-0 w-full h-full bg-white/[0.7]" />}

      <div
        className="flex flex-col cursor-pointer"
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
      >
        {/* image */}
        <div className="w-full bg-neutral-100 mb-4">
          <img src={selectedImage || product.images.squarishURL} alt="" />
        </div>

        <div className="min-h-[185px]">
          {/* thumb: hover */}
          <div className={mapClasses(mouseEntered ? "slide-down-margin mb-3" : "mb-0")}>
            {mouseEntered && (
              <ProductColorList list={product.productAnotherColors} onHover={setSelectedImage} />
            )}
          </div>

          {/* label */}
          {label && <p className="font-medium text-red-700">{label}</p>}

          {/* titles */}
          {!mouseEntered && (
            <div className="mb-3">
              <p className="font-medium">{product.title}</p>
              <p className="text-gray-main font-light">{product.subTitle}</p>
              <p className="text-gray-main font-light">{`${colourCount} Colour${
                colourCount && "s"
              }`}</p>
            </div>
          )}

          {/* Price */}
          <ProductPrice price={product.price} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
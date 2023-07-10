import Carousel from "./layout/carousel";
import Image from "next/image";
import { H2 } from "./typography";

async function getData() {
  // api cuman placeholder aja
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  const rawProducts = await getData();
  const products = rawProducts.products;
  return (
    <div className="lg:w-3/4 mx-auto my-2">
      <H2>News</H2>
      <Carousel loop>
        {products.map((product: any) => {
          return (
            <>
              <div className="relative h-64 flex-[0_0_100%]" key={product.id}>
                <Image
                  // janlup edit domain di next.config.js klo mau diubah
                  src={product.images[0]}
                  alt={product.description}
                  width={1280}
                  height={120}
                  className="object-contain"
                />
              </div>
            </>
          );
        })}
      </Carousel>
    </div>
  );
}

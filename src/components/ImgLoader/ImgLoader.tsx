interface ImgLoaderProps {
  src: string;
  alt: string;
}

function ImgLoader({ src, alt }: ImgLoaderProps) {
  return <img src={src} alt={alt} />;
}
export default ImgLoader;

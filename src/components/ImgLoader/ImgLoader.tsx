interface ImgLoaderProps {
  src: string;
  alt: string;
  filter: string;
  height: string;
  width: string;
}

function ImgLoader({ src, alt, filter, height, width }: ImgLoaderProps) {
  const style = {
    filter: filter,
    height: height,
    width: width,
  };

  return <img src={src} alt={alt} style={style} />;
}
export default ImgLoader;

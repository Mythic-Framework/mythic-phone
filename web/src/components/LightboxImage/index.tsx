import React, { FC, useState } from 'react';
import Lightbox from 'react-image-lightbox';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

const LightboxImage: FC<Props> = ({ src, alt = '', ...rest }) => {
  const [lbImg, setLbImg] = useState<string | null>(null);
  return (
    <>
      <img onClick={() => setLbImg(src)} src={src} alt={alt} style={{ cursor: 'pointer' }} {...rest} />
      {lbImg && <Lightbox mainSrc={lbImg} onCloseRequest={() => setLbImg(null)} />}
    </>
  );
};

export default LightboxImage;

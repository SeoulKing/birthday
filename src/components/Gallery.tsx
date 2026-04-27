interface GalleryItem {
  id: number
  src: string
  alt: string
}

interface GalleryProps {
  images: readonly GalleryItem[]
}

export default function Gallery({ images }: GalleryProps) {
  // 교체 가능한 플레이스홀더 이미지를 격자로 렌더링합니다.
  return (
    <>
      <p className="section-kicker">Gallery</p>
      <h2 className="section-title">함께한 순간들</h2>
      <div className="gallery-grid">
        {images.map((image) => (
          <figure className="gallery-item" key={image.id}>
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </>
  )
}

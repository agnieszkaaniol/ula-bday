import Link from 'next/link'
import Image from 'next/image'

export default function FrameCard({ frame }) {
  const { slug, photo } = frame.fields

  return (
    <div clasName="card">
      <div className="card-photo">
        <Link href={'/frames/' + slug}><a>
          <Image
            src={'https:' + photo.fields.file.url}
            width={photo.fields.file.details.image.width}
            height={photo.fields.file.details.image.height}
        ></Image></a>
        </Link>
      </div>
    </div>
  )
  
}

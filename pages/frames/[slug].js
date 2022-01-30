import { createClient } from 'contentful'
import Image from 'next/image'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'frame'
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'frame',
    'fields.slug': params.slug
  })

  return {
    props: { frame: items[0] }
  }
}

export default function FrameDetails({ frame }) {
  const { photo, title, description } = frame.fields

  return (
    <div>
      <div className="slug-title">
        <h2>{ title }</h2>
      </div>
      <div className="slug-description">
        <p className="p-slug">{ description }</p>
      </div>
      <div className="slug-image">
      <Image className="slug-image"
        src={'https:' + photo.fields.file.url}
        width={photo.fields.file.details.image.width}
        height={photo.fields.file.details.image.height}
       >
      </Image>
      </div>
    </div>
  )
}
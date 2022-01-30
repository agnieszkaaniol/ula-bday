import { createClient } from 'contentful'
import FrameCard from '../components/FrameCard'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'frame' })

  return {
    props: {
      frames: res.items
    }
  }
}

export default function Frame({ frames }) {

    return ( 
      <div className = "layout" >

      <header>
        <p className="p-wishes-top">W tym specjalnym dniu z całego serca życzymy</p>
        <h1 className="title-wishes">Sto lat, Ula!</h1>
      </header>

        <img className = "photo-main"></img>
        <div className = "grid-photos">
          {frames.map(frame => (
            <FrameCard key={frame.sys.id} frame={frame} />
          ))}

        </div>
        <p className="p-wishes-top">Szczęścia, ale przede wszystkim</p>
        <p className="p-wishes-down">nieszablonowego życia, w którym to Ty będziesz sterem!</p>
      </div>
    )
}
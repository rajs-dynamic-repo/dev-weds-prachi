import { wedding } from '../../content/wedding'
import { SectionHeading } from '../layout/SectionHeading'
import { FlowerMark, Mandala } from '../ornament/ornaments'

function FamilyColumn({ label, parents }: { label: string; parents: string[] }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="parent">{parents[0]}</p>
      <p className="amp">&</p>
      <p className="parent">{parents[1]}</p>
    </div>
  )
}

export function FamilyBlessings() {
  return (
    <section className="band band--cream" id="family">
      <SectionHeading title="Blessings from our families" />
      <div className="family" data-reveal="">
        <Mandala className="family__mandala" />
        <div className="family__cols">
          <FamilyColumn label={wedding.bride.familyLabel} parents={wedding.bride.parents} />
          <div className="family__spine" aria-hidden="true">
            <span />
            <FlowerMark />
            <span />
          </div>
          <FamilyColumn label={wedding.groom.familyLabel} parents={wedding.groom.parents} />
        </div>
        <div className="family__quote">
          <p>{wedding.blessing}</p>
          <a className="link-quiet" href="#wishes">
            Leave us a wish
          </a>
        </div>
      </div>
    </section>
  )
}

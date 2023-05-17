export type Props = {
    tag: string
}
const SensorTag = ({ tag }: Props) => (
    <span className="border-2 rounded-2xl px-3 py-1 mr-1">{tag}</span>
)

export default SensorTag;
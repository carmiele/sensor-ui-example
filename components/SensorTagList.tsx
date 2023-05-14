import SensorTag from "./SensorTag";

export type Props = {
    tags: string[]
}

const SensorTagList = ({ tags }: Props) => (
    <>{tags.map((tag, index) => (
        <SensorTag key={index} tag={tag} />
    ))}</>
)

export default SensorTagList;
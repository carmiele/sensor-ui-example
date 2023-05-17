import { ChangeEvent, useEffect, useState } from "react";
import { Sensor } from "../interfaces/sensor";
import EditSensorBtn from "./EditSensorButton";
import SensorTagList from "./SensorTagList";

const SensorTable = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [allSensors, setAllSensors] = useState<Sensor[]>([]);
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const searchSensors = (field: string, event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        const updatedFilters = { ...filters };
        updatedFilters[field] = val;

        setFilters(updatedFilters);
    };

    const filterSensors = () => {
        let filteredSensors: Sensor[] = allSensors;

        for (const [key, val] of Object.entries(filters)) {

            filteredSensors = filteredSensors.filter((sensor) => {
                // field does not exist in entry.
                // exclude from filtered results
                if (!(key in sensor)) {
                    return;
                }

                let valString = "";

                if (sensor[key] instanceof Array) {
                    valString = sensor[key].toString();
                } else {
                    valString = JSON.stringify(sensor[key]);
                }

                if (valString.includes(val)) {
                    return sensor;
                }
            });
        }
        setSensors(filteredSensors);
    };

    useEffect(() => {
        filterSensors();
    }, [filters]);

    const getAllSensors = () => {
        fetch('/api/sensors')
            .then((res) => res.json())
            .then((data) => {
                setAllSensors(Object.values(data));
                setFilters({});
                setLoading(false);
            }, (e) => { });
    };

    useEffect(() => {
        getAllSensors();
    }, []);

    return (<table className="table w-full">
        <thead>
            <tr className="border-b border-gray-400 bg-gray-100">
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Tags</th>
                <th className="px-6 py-4 text-right">Metadata</th>
            </tr>
            <tr className="border-b border-gray-400 bg-gray-100">
                <th className="px-6 py-4 text-left">
                    <input type="text" className="border-gray-400 border-2 px-4 py-2 w-full rounded-sm font-normal" onChange={(e) => searchSensors('name', e)} />
                </th>
                <th className="px-6 py-4 text-left">
                    <input type="text" className="border-gray-400 border-2 px-4 py-2 w-full rounded-sm font-normal" onChange={(e) => searchSensors('location', e)} />
                </th>
                <th className="px-6 py-4 text-left">
                    <input type="text" className="border-gray-400 border-2 px-4 py-2 w-full rounded-sm font-normal" onChange={(e) => searchSensors('tags', e)} />
                </th>
                <th className="pl-6 py-4 text-right"></th>
            </tr>
        </thead>
        <tbody>
            {loading && <tr><td>Loading...</td></tr>}
            {!loading && sensors?.length > 0 && sensors.map((sensor) => (
                <tr data-test-id="sensor-rows" key={sensor.id} className="border-b border-gray-200">
                    <td className="px-6 py-4">{sensor.name || "--"}</td>
                    <td className="px-6 py-4">{sensor.location ? sensor.location.lat + ", " + sensor.location.long : "--"}</td>
                    <td className="px-6 py-4">{sensor?.tags && sensor?.tags.length > 0 ? <SensorTagList tags={sensor.tags} /> : "--"}</td>
                    <td className="px-6 py-4 text-right">
                        <EditSensorBtn sensor={sensor} />
                    </td>
                </tr>
            ))
            }
            {!loading && (!sensors || sensors?.length === 0) && <tr><td>No data.</td></tr>}
        </tbody>
    </table>)

}

export default SensorTable
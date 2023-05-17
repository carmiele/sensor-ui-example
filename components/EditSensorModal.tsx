import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Sensor } from "../interfaces/sensor"
import SensorMetadataForm from "./SensorMetadataForm"
import Loading from "./Loading"

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    // sensor: Sensor
    sensorId: string
}

const EditSensorModal = ({ open, setOpen, sensorId }: Props) => {

    const cancelButtonRef = useRef(null);

    const [submitting, setSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [sensor, setSensor] = useState<Sensor>();

    const triggerFormSave = () => {
        // trigger submission state
        setSubmitting(true);
    }

    useEffect(() => {
        if (open) {
            // reset state to get fresh data
            setSensor(undefined);
            
            fetch(`/api/sensors/${sensorId}`)
                .then((res) => res.json())
                .then((data) => {
                    setSensor(data);
                }, (e) => {
                });
        }
    }, [open]);

    useEffect(() => {
        if (formSuccess) {
            // reset form success state
            setFormSuccess(false);
            // close modal if form success
            setOpen(false);
        }
    }, [formSuccess]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    {
                                        (!sensor || submitting) && <div className="h-32 w-full flex content-center justify-items-center opacity-50"><Loading /></div>
                                    }
                                    {
                                        sensor && <SensorMetadataForm submitting={submitting} setSubmitting={setSubmitting} setFormSuccess={setFormSuccess} sensor={sensor} />
                                    }
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-sm bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        disabled={submitting || !sensor}
                                        onClick={() => triggerFormSave()}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-sm bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}

export default EditSensorModal
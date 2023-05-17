import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type Props = {
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}
export const FormError = ({ error }: Props) => (
    <div>
        <p className="text-red-500">
            { error?.message }
        </p>
    </div>
);

export default FormError;
import { forwardRef } from "react";

type InputFormProps = {
	name: string;
	title: string;
};

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
	({ title, name }, ref) => {
		return (
			<label>
				{title}
				<input type="text" name={name} ref={ref} required />
			</label>
		);
	},
);

export default InputForm;

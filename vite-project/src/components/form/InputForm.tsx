type inputFormProps = {
	value: string;
	name: string;
	title: string;
	handleNewRepo: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputForm({
	handleNewRepo,
	name,
	value,
	title,
}: inputFormProps) {
	return (
		<label htmlFor="">
			{title}
			<input
				type="text"
				name={name}
				value={value}
				onChange={handleNewRepo}
				required
			/>
		</label>
	);
}

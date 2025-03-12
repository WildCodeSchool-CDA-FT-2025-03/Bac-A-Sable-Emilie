import { useEffect, forwardRef } from "react";
import useLanguages from "../../services/useLanguages";

const SelectFormLanguages = forwardRef<HTMLSelectElement>((_, ref) => {
	const { languages, getAllLanguages } = useLanguages();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getAllLanguages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<label htmlFor="">
			Choix du languages
			<select name="languages" ref={ref} required>
				{languages.map((lg) => (
					<option key={lg} value={lg}>
						{lg}
					</option>
				))}
			</select>
		</label>
	);
});

export default SelectFormLanguages;

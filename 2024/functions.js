export function split_string(str, parse_numbers = false) {
	// split string into array by whitespace
	if (str.length > 0) {
		return str
			.trim()
			.split(/\s+/)
			.map((item) => (parse_numbers ? parseInt(item) : item));
	}
}

export function transpose_array(arr) {
	// transpose array
	return arr[0].map((_, i) => arr.map((row) => row[i]));
}

export function remove_index(arr, index) {
	// remove index from array
	return arr.filter((_, i) => i !== index);
}

let bar_time = false;

let last = -1;
export function bar(count, max, width = 100) {
	if (!bar_time) bar_time = Date.now();

	const delta_time = Date.now() - bar_time;
	const bar = "█"
		.repeat(Math.floor((count / max) * width))
		.padEnd(width, "-");
	const today = new Date().toLocaleDateString();
	const eta = new Date(
		Date.now() + Math.floor((delta_time / count) * (max - count))
	)
		.toLocaleString()
		.replace(`${today}, `, "");
	if (last != Math.floor((count / max) * width)) {
		console.log(
			`[${bar}] ${count}/${max} (${Math.floor(
				(count / max) * 100
			)}%) ETA: ${eta}`
		);
		last = Math.floor((count / max) * width);
	}
}

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

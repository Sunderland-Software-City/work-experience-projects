export default function slugify(str) {
	// todo: does this work with all names? hint: what about non-alphanumerics? or symbols?
	return str.trim().toLowerCase().replaceAll(' ', '-');
}

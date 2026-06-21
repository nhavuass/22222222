const SHEET_ID = '1Jcc9FODbaeEIVYmGJe1ftSq5q4Ev39AMWEnGhGZ9rTc';
const SHEET_URL =
	'https://script.google.com/macros/s/AKfycbwzdvHWz7zy8D5m6M1utNZp9A3oG8eVWemOeLYSyvOe_O7V2-kAA0LR2HjDSAYz4BLA/exec';

export default async (req) => {
	try {
		const body = req.method === 'POST' ? await req.json() : {};
		const { action = 'append', value, row } = body;
		if (!value) return Response.json(null, { status: 400 });

		const params = new URLSearchParams({
			sheetId: SHEET_ID,
			action,
			value: JSON.stringify(value),
		});
		if (row) params.append('row', row);

		const res = await fetch(`${SHEET_URL}?${params}`);
		const data = await res.json();
		return Response.json(data);
	} catch {
		return Response.json({ error: 'lỗi proxy' }, { status: 500 });
	}
};

export const config = {
	path: '/api/sheet',
};

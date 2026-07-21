export const config = {
	matcher: '/(.*)',
};

export default function middleware(request) {
	const expectedUser = process.env.SITE_USER;
	const expectedPass = process.env.SITE_PASSWORD;

	const auth = request.headers.get('authorization');

	if (auth) {
		const [scheme, encoded] = auth.split(' ');
		if (scheme === 'Basic' && encoded) {
			let decoded = '';
			try {
				decoded = atob(encoded);
			} catch (e) {
				decoded = '';
			}
			const sep = decoded.indexOf(':');
			const user = sep >= 0 ? decoded.slice(0, sep) : '';
			const pass = sep >= 0 ? decoded.slice(sep + 1) : '';

			if (user === expectedUser && pass === expectedPass) {
				return new Response(null, {
					headers: { 'x-middleware-next': '1' },
				});
			}
		}
	}

	return new Response('Authentication required', {
		status: 401,
		headers: {
			'WWW-Authenticate': 'Basic realm="JLYPCG"',
		},
	});
}

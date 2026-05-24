const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["images/tree.jpg","ireland-counties.geojson"]),
	mimeTypes: {".jpg":"image/jpeg",".geojson":"application/geo+json"},
	_: {
		client: {start:"_app/immutable/entry/start.D_SiE9cg.js",app:"_app/immutable/entry/app.Dhj0T6lV.js",imports:["_app/immutable/entry/start.D_SiE9cg.js","_app/immutable/chunks/CM1-TOFI.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/D-6UqWNZ.js","_app/immutable/entry/app.Dhj0T6lV.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/DPPnFs8J.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/D-6UqWNZ.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/tQfqKTYA.js","_app/immutable/chunks/vl9EpSt6.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-Dredfrxl.js')),
			__memo(() => import('./chunks/1-CpSQlfuI.js')),
			__memo(() => import('./chunks/2-Cyl9k32d.js')),
			__memo(() => import('./chunks/3-tt-i4pVC.js')),
			__memo(() => import('./chunks/4-QD1laexS.js')),
			__memo(() => import('./chunks/5-YBiRq-KT.js')),
			__memo(() => import('./chunks/6-D9RO0Pfv.js')),
			__memo(() => import('./chunks/7-CJeg0L7M.js')),
			__memo(() => import('./chunks/8-DtsWE5LK.js')),
			__memo(() => import('./chunks/9-BUUWuzoA.js')),
			__memo(() => import('./chunks/10-f4mTau4Z.js')),
			__memo(() => import('./chunks/11-sUQs3Zh4.js')),
			__memo(() => import('./chunks/12-DKeMo1Zh.js')),
			__memo(() => import('./chunks/13-DzshVSeS.js')),
			__memo(() => import('./chunks/14-CB8voKSH.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(app)/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(app)/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/admin/user/[id]",
				pattern: /^\/admin\/user\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/api/pois",
				pattern: /^\/api\/pois\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Bdtn-mOi.js'))
			},
			{
				id: "/api/pois/[id]",
				pattern: /^\/api\/pois\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DZEgjUiv.js'))
			},
			{
				id: "/api/users",
				pattern: /^\/api\/users\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-D5Ch0sxg.js'))
			},
			{
				id: "/api/users/authenticate",
				pattern: /^\/api\/users\/authenticate\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-hLzSat1P.js'))
			},
			{
				id: "/api/users/[id]",
				pattern: /^\/api\/users\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CJwZSkMX.js'))
			},
			{
				id: "/(app)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(app)/import",
				pattern: /^\/import\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(app)/ourspace",
				pattern: /^\/ourspace\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(app)/poi/[id]",
				pattern: /^\/poi\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(auth)/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 13 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map

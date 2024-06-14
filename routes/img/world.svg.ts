import { feature } from "https://esm.sh/topojson-client@3.1.0";
import { geoSatellite } from "https://esm.sh/d3-geo-projection@4.0.0";
import { geoPath } from "https://esm.sh/d3-geo@3.1.0";

import { tw } from "@/core/colors.ts";
import topology from "@/core/land-110m.json" with { type: "json" };
import { isAllowedLanguage } from "@/core/i18n/mod.ts";
import type { AllowedLanguage } from "@/core/types.ts";
import { Handlers } from "fresh/compat";

const land = feature(topology, topology.objects.land);

const font_size = 36;
const distance = 8;
const w = 1000;
const h = 1000;
const rad_to_deg = 180 / Math.PI;

const projection = geoSatellite()
	.distance(distance)
	.clipAngle(Math.acos(1 / distance) * rad_to_deg)
	.translate([w / 2, h / 2])
	.scale(450)
	.precision(0.5);

const path = geoPath(projection);

type Region = {
	name: string;
	coords: [number, number];
	multiply: number; // 0.6 for latin; 0.65 for mixed; 1 for chinese characters
};

const regions: Record<
	AllowedLanguage,
	Record<"stuttgart" | "xian" | "shanghai", Region>
> = {
	en: {
		stuttgart: {
			name: "Stuttgart",
			coords: [9.1770, 48.7823],
			multiply: 0.6,
		},
		shanghai: {
			name: "上海（Shanghai）",
			coords: [121.4737, 31.2304],
			multiply: 0.7,
		},
		xian: {
			name: "西安（Xi'an） ",
			coords: [108.9402, 34.3416],
			multiply: 0.65,
		},
	},
	de: {
		stuttgart: {
			name: "Stuttgart",
			coords: [9.1770, 48.7823],
			multiply: 0.6,
		},
		shanghai: {
			name: "上海（Shanghai）",
			coords: [121.4737, 31.2304],
			multiply: 0.7,
		},
		xian: {
			name: "西安（Xi'an） ",
			coords: [108.9402, 34.3416],
			multiply: 0.65,
		},
	},
	zh: {
		stuttgart: {
			name: "斯图加特",
			coords: [9.1770, 48.7823],
			multiply: 1,
		},
		shanghai: {
			name: "上海",
			coords: [121.4737, 31.2304],
			multiply: 1,
		},
		xian: {
			name: "西安",
			coords: [108.9402, 34.3416],
			multiply: 1,
		},
	},
} as const;

function render(region: Region, isDark: boolean) {
	const coords = region.coords;
	projection.rotate([-coords[0] - 30, -coords[1] * (30 / 90), 0]);
	const dot = projection(coords);

	return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
      <style>
        path {
          stroke: none;
        }

        .ocean {
          fill: ${tw.blue[100]};
        }

        .land {
          fill: ${tw.green[500]};
        }

        .highlight {
          fill: ${tw.red[500]};
        }

        .dot {
          fill: ${tw.red[500]};
        }

				${
		isDark
			? `
				.ocean {
					fill: ${tw.blue[950]};
				}

				.land {
					fill: ${tw.emerald[700]};
				}

				.highlight {
					fill: ${tw.red[600]};
				}

				.dot {
					fill: ${tw.red[600]};
				}
				`
			: ""
	}
		}
      </style>

      <path d="${path({ type: "Sphere" })}" class="ocean"/>
      <path d="${path(land)}" class="land"/>

      ${
		dot
			? `
      <g transform="translate(${dot[0]},${dot[1]})">
        <circle r="15" class="dot"/>
        <rect x="40" y="-32.5" width="${
				font_size * region.multiply * region.name.length + 40
			}" height="60" rx="10" class="highlight" />
        <polygon points="25,0 40,-10 40,10" class="highlight" />
        <text
          x="60"
          fill="white"
          text-anchor="start"
          alignment-baseline="middle"
          dominant-baseline="middle"
          style="font-family: 'Courier', 'Courier New'; font-size: ${font_size}px; text-transform: uppercase; font-weight: bold"
        >${region.name}</text>
      </g>`
			: ""
	}
    </svg>
  `;
}

export const handler: Handlers = {
	GET(ctx) {
		const searchParams = ctx.url.searchParams;

		// Get values from params
		const isDark = searchParams.has("dark");
		let lang = searchParams.get("lang") ?? "en";
		if (!isAllowedLanguage(lang)) lang = "en";
		const region = regions[lang as AllowedLanguage].xian;

		// Generate SVG
		const svg = render(region, isDark).replace(
			/\d\.\d+/g,
			(match) => match.slice(0, 4),
		);

		// Return SVG
		return new Response(svg, {
			headers: {
				"content-type": "image/svg+xml",
				"cache-control": "private, max-age=3600",
			},
		});
	},
};

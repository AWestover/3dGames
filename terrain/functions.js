
function avg_min_max_2d(arr2d)
{
	if (arr2d.length == 0 || arr2d[0].length == 0)
	{
		console.log("bad input");
		console.log(arr2d);
		return -1;
	}
	let mi = arr2d[0][0];
	let ma = arr2d[0][0];
	let s = 0;
	for (let i in arr2d)
	{
		for (let j in arr2d[i])
		{
			if (mi > arr2d[i][j])
			{
				mi=arr2d[i][j];
			}
			if (ma < arr2d[i][j])
			{
				ma=arr2d[i][j];
			}
			s += arr2d[i][j];
		}
	}

	let o = {
		"min": mi,
		"max": ma,
		"avg": s/(arr2d.length*arr2d[0].length)
	}
	return o;
}

function smooth(arr2d)
{
	let hs = [];
	for (let i = 0; i < n; i++)
	{
		hs.push([]);
		for (let j = 0; j < n; j++)
		{
			// smooth it
			// hs[i] = 
		}
	}
	return hs;
}

function surface(n, off)
{
	let ri; let rj;
	let hs = [];
	for (let i = 0; i < n; i++)
	{
		ri = i+off[0];
		hs.push([]);
		for (let j = 0; j < n; j++)
		{
			rj = j+off[1];
			let tmp = 0;
			tmp += 10*sin(3*ri)+10*sin(3*rj);
			tmp += -0.1*(pow(ri-n/2, 2)+pow(rj-n/2, 2));
			
			if (1 < abs(ri-2*n/3)+abs(rj-n/3) < 10)
			{
				tmp += 50/(abs(ri-2*n/3)+abs(rj-n/3));
			}

			tmp += 100*noise(ri, rj);

			hs[i].push(tmp);
		}
	}
	return hs;
}

function colorsH(surface)
{
	let res = avg_min_max_2d(surface);
	let colors = [];
	let rdif = pow(res["max"]-res["min"], 2);
	for (let i = 0; i < surface.length; i++)
	{
		colors.push([]);
		for (let j = 0; j < surface[0].length; j++)
		{
			// do a square root fit ie. I expect heights to look like root(x) but want linear colors 
			let tmp = surface[i][j] - res["min"];
			tmp = pow(tmp, 2) * 255 / rdif;
			colors[i].push(tmp);
		}
	}
	return colors;
}


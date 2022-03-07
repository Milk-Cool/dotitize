const Jimp = require("jimp");
const { ceil } = Math;
new Jimp(process.argv[2] || "input.png", (err, img) => {
	if(err) throw err;
	const { width, height} = img.bitmap;
	let list = [];
	for(let i = 0; i < width; i++){
		list.push([]);
		for(let j = 0; j < height; j++)
			list[i][j] = img.getPixelColor(j, i) < 384;
	}
	const getSymbol = include => String.fromCharCode(0x2800 + include.includes("1") * 1 + include.includes("2") * 2 + include.includes("3") * 4 + include.includes("4") * 8 + include.includes("5") * 16 + include.includes("6") * 32 + include.includes("7") * 64 + include.includes("8") * 128);
	let result = [];
	for(let x = 0; x < width; x += 2){
		result.push([]);
		for(let y = 0; y < height; y += 4)
			result[x / 2][y / 4] = getSymbol(
				(list[x][y] ? "1" : "") +
				(list[x][y + 1] ? "2" : "") +
				(list[x][y + 2] ? "3" : "") +
				(list[x][y + 3] ? "4" : "") +
				(list[x + 1][y] ? "5" : "") +
				(list[x + 1][y + 1] ? "6" : "") +
				(list[x + 1][y + 2] ? "7" : "") +
				(list[x + 1][y + 3] ? "8" : "")
			);
	}
	for(let i of result){
		for(let j of i)
			process.stdout.write(j);
		console.log();
	}
});

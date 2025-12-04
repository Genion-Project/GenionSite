const genion = new Proxy({"src":"/_astro/Gene.BSFUlW9b.webp","width":2813,"height":1563,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/linuxdevco/Workspace/Genion_web/src/images/Gene.webp";
							}
							
							return target[name];
						}
					});

export { genion as g };

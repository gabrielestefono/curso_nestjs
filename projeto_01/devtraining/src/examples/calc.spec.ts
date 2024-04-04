export function add(x: number, y:number){
	return x + y;
}

describe('Inicial Test', ()=>{
	test('Add functin', ()=>{
		expect(add(1,2)).toBe(3)
	})
})
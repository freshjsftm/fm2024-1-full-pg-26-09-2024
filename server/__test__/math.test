function sum(a, b) {
  if( a === null || b === null){
    return null;
  }
  if(typeof a === 'bigint' || typeof b === 'bigint'){
    return BigInt(a) + BigInt(b);
  }
  return Number(a) + Number(b);
}

test('add null to 1:int equil null', () => {
  expect(sum(null, 1)).toBe(null);
});

test('add 1:int to 1:int equil 2:int', () => {
  expect(sum(1, 1)).toBe(2);
});

test('add 0.1:number to 0.2:number equil 0.3:number', () => {
  expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
});

test('add 1:bigint to 1:bigint equil 2:bigint', () => {
  expect(sum(1n, 1n)).toBe(2n);
});

test('add 1:string to 1:string equil 2:int', () => {
  expect(sum('1', '1')).toBe(2);
});

test('add 1:string to 1:int equil 2:int', () => {
  expect(sum('1', 1)).toBe(2);
});

test('add 1:int to 1:string equil 2:int', () => {
  expect(sum(1, '1')).toBe(2);
});
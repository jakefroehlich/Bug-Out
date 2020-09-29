function test59cfc000aeb2844d16000075(func) {
  const res = func('abcdef');
  if (res !== ['AbCdEf', 'aBcDeF']) {
    return { res, expected: ['AbCdEf', 'aBcDeF'] };
  }
  const res2 = func('capitalize me');
  if (res2 !== ['CaPiTaLiZe mE', 'cApItAlIzE Me']) {
    return { res: res2, expected: ['CaPiTaLiZe mE', 'cApItAlIzE Me'] };
  }
  return true;
}

function test515de9ae9dcfc28eb6000001(solution) {
  const res = solution('cba');
  if (res !== ['cb', 'a_']) {
    return { res, expected: ['cb', 'a_'] };
  }
  const res2 = solution('abcdef');
  if (res2 !== ['ab', 'cd', 'ef']) {
    return { res: res2, expected: ['ab', 'cd', 'ef'] };
  }
  return true;
}

function test55cbd4ba903825f7970000f5(func) {
  const res = func(90, 95, 80);
  if (res !== 'A') return { res, expected: 'A' };
  const res2 = func(90, 80, 85);
  if (res2 !== 'B') return { res: res2, expected: 'B' };
  const res3 = func(80, 70, 75);
  if (res3 !== 'C') return { res: res3, expected: 'C' };
  const res4 = func(70, 60, 63);
  if (res4 !== 'D') return { res: res4, expected: 'D' };
  const res5 = func(0, 50, 40);
  if (res5 !== 'F') return { res: res5, expected: 'F' };
  return true;
}

function test511f11d355fe575d2c000001(func) {
  const res = func([35, 2, 80, 75, 44]);
  if (res !== [80, 75]) return { res, expected: [80, 75] };
  const res2 = func([35, 2, 80, 75, 44]);
  if (res2 !== [75, 80]) return { res: res2, expected: [75, 80] };

  return true;
}

function test530e15517bc88ac656000716(func) {
  const res = func('abcde');
  if (res !== 'nopqr') return { res, expected: 'nopqr' };
  const res2 = func('wydhxj dkwie');
  if (res2 !== 'jlqukw qxjvr') return { res: res2, expected: 'jlqukw qxjvr' };
  return true;
}

function test5208f99aee097e6552000148(func) {
  const res = func('camelCase');
  if (res !== 'camel Case') return { res, expected: 'camel Case' };
  const res2 = func('camelCase camelCase');
  if (res2 !== 'camel Case camel Case') return { res: res2, expected: 'camel Case camel Case' };
  return true;
}

function test5264d2b162488dc400000001(func) {
  const res = func('Hey warriors fellow ');
  if (res !== 'Hey sroirraw wollef') return { res, expected: 'Hey sroirraw wollef' };
  const res2 = func('This is a test');
  if (res2 !== 'This is a test') return { res: res2, expected: 'This is a test' };
  const res3 = func('This another is test');
  if (res3 !== 'This rehtona is test') return { res: res3, expected: 'This rehtona is test' };
  return true;
}

function test5b39e3772ae7545f650000fc(func) {
  const res = func('alpha beta beta gamma gamma delta alpha beta beta gamma gamma gamma delta');
  if (res !== 'alpha beta gamma delta') return { res, expected: 'alpha beta gamma delta' };
  const res2 = func('a b c c c d e f g g h h');
  if (res2 !== 'a b c d e f g h') return { res: res2, expected: 'a b c d e f g h' };
  return true;
}

function test585d7d5adb20cf33cb000235(func) {
  const res = func([1, 1, 1, 3, 1, 1]);
  if (res !== 3) return { res, expected: 3 };
  return true;
}

function test57eb8fcdf670e99d9b000272(func) {
  const res = func('abc def klmi');
  if (res !== 'klmi') return { res, expected: 'klmi' };
  const res2 = func('extreme abc ggg');
  if (res2 !== 'extreme') return { res: res2, expected: 'extreme' };
  const res3 = func('abcdef zxyabz aaaa  abcde');
  if (res3 !== 'zxyabz') return { res: res3, expected: 'zxyabz' };
  return true;
}

function test5949481f86420f59480000e7(func) {
  const res = func([0, 1, 2, 3, 4, 5]);
  if (res !== 'odd') return { res, expected: 'odd' };
  const res2 = func([0, 10]);
  if (res2 !== 'even') return { res: res2, expected: 'even' };
  const res3 = func([-1, 10]);
  if (res3 !== 'odd') return { res: res3, expected: 'odd' };
  return true;
}

function test582cb0224e56e068d800003c(func) {
  const res = func(5);
  if (res !== 2) return { res, expected: 2 };
  const res2 = func(6.7);
  if (res2 !== 3) return { res: res2, expected: 3 };
  const res3 = func(11.8);
  if (res3 !== 5) return { res: res3, expected: 5 };
  return true;
}

function test58aed2cafab8faca1d000e20(func) {
  const res = func([1, 2, 3], 3);
  if (res !== 30) return { res, expected: 30 };
  const res2 = func([2, 2], 5);
  if (res2 !== 60) return { res: res2, expected: 60 };
  return true;
}

function test5a092d9e46d843b9db000064(func) {
  const res = func([1, -1, 2, -2, 3]);
  if (res !== 3) return { res, expected: 3 };
  const res2 = func([1, -1, 2, -2, 4, 4]);
  if (res2 !== 4) return { res: res2, expected: 4 };
  return true;
}

function test535474308bb336c9980006f2(func) {
  const res = func('joey');
  if (res !== 'Hello Joey!') return { res, expected: 'Hello Joey!' };
  const res2 = func('ADAM');
  if (res2 !== 'Hello Adam!') return { res: res2, expected: 'Hello Adam!' };
  const res3 = func('KwOn');
  if (res3 !== 'Hello Kwon!') return { res: res3, expected: 'Hello Kwon!' };
  return true;
}

function test5a262cfb8f27f217f700000b(func) {
  const res = func('abcdef', 'abxfe');
  if (res !== 'cdx') return { res, expected: 'cdx' };
  const res2 = func('xyab', 'xzca');
  if (res2 !== 'ybzc') return { res: res2, expected: 'ybzc' };
  return true;
}

function test5259b20d6021e9e14c0010d4(func) {
  const res = func('This is an example!');
  if (res !== 'sihT si na !elpmaxe') return { res, expected: 'sihT si na !elpmaxe' };
  const res2 = func('double  spaces');
  if (res2 !== 'elbuod  secaps') return { res: res2, expected: 'elbuod  secaps' };
  return true;
}

function test57a1ae8c7cb1f31e4e000130(func) {
  const res = func([1, 5, 23, 88, 100, 3]);
  if (res !== [1, 100]) return { res, expected: [1, 100] };
  return true;
}

function test57547f9182655569ab0008c4(func) {
  const res = func(5, 3);
  if (res !== [3, 3, 3, 3, 3]) return { res, expected: [3, 3, 3, 3, 3] };
  return true;
}

function test5727bb0fe81185ae62000ae3(func) {
  const res = func('abc#d##c');
  if (res !== 'ac') return { res, expected: 'ac' };
  const res2 = func('abc##d######');
  if (res2 !== '') return { res: res2, expected: '' };
  const res3 = func('thee# caa#r');
  if (res3 !== 'the car') return { res: res3, expected: 'the car' };
  return true;
}

function test5287e858c6b5a9678200083c(func) {
  const res = func(370);
  if (res !== true) return { res, expected: true };
  const res2 = func(150);
  if (res2 !== false) return { res: res2, expected: false };
  const res3 = func(8);
  if (res3 !== true) return { res: res3, expected: true };
  return true;
}

module.exports = {
  test: {
    test59cfc000aeb2844d16000075,
    test515de9ae9dcfc28eb6000001,
    test55cbd4ba903825f7970000f5,
    test511f11d355fe575d2c000001,
    test530e15517bc88ac656000716,
    test5208f99aee097e6552000148,
    test5264d2b162488dc400000001,
    test5b39e3772ae7545f650000fc,
    test585d7d5adb20cf33cb000235,
    test57eb8fcdf670e99d9b000272,
    test5949481f86420f59480000e7,
    test582cb0224e56e068d800003c,
    test58aed2cafab8faca1d000e20,
    test5a092d9e46d843b9db000064,
    test535474308bb336c9980006f2,
    test5a262cfb8f27f217f700000b,
    test5259b20d6021e9e14c0010d4,
    test57a1ae8c7cb1f31e4e000130,
    test57547f9182655569ab0008c4,
    test5727bb0fe81185ae62000ae3,
    test5287e858c6b5a9678200083c,
  },
};

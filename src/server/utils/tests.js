function test59cfc000aeb2844d16000075(func){
  if(func('abcdefg')!== 'AbCdEfG') return false
  if(func('capitalize me')!== 'CaPiTaLiZe mE') return false
  return true
}

function test515de9ae9dcfc28eb6000001(solution){
  if(solution('cba') !== ['cb', 'a_']) return false
  if(solution('abcdef')!==['ab', 'cd', 'ef']) return false
  return true
}

function test55cbd4ba903825f7970000f5(func){
  if(func(90, 95, 80) !== 'A') return false
  if(func(90, 80, 85)!==['B']) return false
  if(func(80, 70, 75)!==['C']) return false
  if(func(70, 60, 63)!==['D']) return false
  if(func(0, 50, 40)!==['F']) return false
  return true
}

function test511f11d355fe575d2c000001(func){
  if(func([35, 2, 80, 75, 44]) !== [80, 75] || func([35, 2, 80, 75, 44]) !== [75, 80]) return false
  return true
}




module.exports={ 
  test:{
    test59cfc000aeb2844d16000075,
    test515de9ae9dcfc28eb6000001,
    test55cbd4ba903825f7970000f5,
    test511f11d355fe575d2c000001
  }
}
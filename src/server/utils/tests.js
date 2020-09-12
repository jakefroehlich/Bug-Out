function test59cfc000aeb2844d16000075(func){
  if(func('abcdefg')!== 'AbCdEfG') return false
  if(func('capitalize me')!== 'CaPiTaLiZe mE') return false
  return true
}




module.exports={ 
  test:{
    test59cfc000aeb2844d16000075
  }
}
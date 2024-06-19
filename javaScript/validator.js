/**
 *  유효성 검증 관련 정적 메소드
*/ 
const Validator = function () {}

Validator.isEmpty = function (input) {
  // 빈공백문자인 경우
  if(input != null){
    return input.trim() == "";
  }else{
    return true;
  } 
}

/**
 * 숫자 입력 형식 검증
*/ 
Validator.isNumber = function (input) {
  return /^[0-9]*$/.test(input);
}





/**
 * 학생의 정보를 저장하는 Student클래스 정의
 * @param {*} ssn 학번
 * @param {*} name 이름
 * @param {*} korean 국어점수
 * @param {*} english 영어점수
 * @param {*} math 수학점수
 */
function Student(ssn,name,korean , english , math) {
  this.ssn = ssn;
  this.name = name;
  this.korean = korean;
  this.english = english;
  this.math = math;  
}
Student.prototype.getSum = function() {
  return this.korean + this.english + this.math
}

Student.prototype.getAverage = function() {
  return (this.getSum() / 3).toFixed(1);
}

Student.prototype.toString = function() {
  return `${this.ssn} ${this.name} ${this.korean} ${this.english} ${this.math} ${this.getAverage()}`
}

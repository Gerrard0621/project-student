/**
 * 학생 성적 관리 서비스 객체 
*/ 
function StudentService() {
  this.students = [];
}

/**
 * 학생 등록 서비스 
 */  
StudentService.prototype.addStudent = function (student) {
  this.students.push(student);
}

/**
 * 학생 목록 반환 서비스
 */   
StudentService.prototype.findAll = function () {
  return this.students;
}

/**
 * 이름으로 학생 검색 서비스
 */  
StudentService.prototype.findBySearch = function (type, value) {
  return this.students.filter((student) => {
    if (type === "name") {
      return student.name === value;
    }
  });
}



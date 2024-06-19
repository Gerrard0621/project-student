
/**
 * 학생 목록 테이블 출력
 * @param {*} students  
 */
const renderingStudents = function (students) {
  const tbody = document.querySelector(".studentList");
  const tfoot = document.querySelector('table tfoot[name=table-tfoot]');
  
  let trs = "";
  let tfootContents = '';
  let total = 0;
  let average = 0.0;
  students.forEach(student => {
    trs += `
      <tr>
        <th>${student.ssn}</th>
        <td>${student.name}</td>
        <td>${student.korean}</td>
        <td>${student.english}</td>
        <td>${student.math}</td>
        <td>${student.getSum()}</td>
        <td>${student.getAverage()}</td>
        <td>${student.rank}</td>
      </tr>
    `;
    total = total + student.getSum();
    average = average + parseFloat(student.getAverage());
  });
  tbody.innerHTML = trs;
  students.forEach(student => {
    tfootContents = `
          <tr>
            <th scope="row"></th>
            <th colspan="4"><class="fa-solid fa-school">전체 평균</th>
            <td>${total}</td>
            <td>${(average / students.length).toFixed(1)}</td>
            <td></td>
          </tr>
    `
  });
  tfoot.innerHTML = tfootContents;
}
/**
 * 학생 등록 
 */ 
const createStudent = function (studentService) {
  const ssn = document.studentForm.ssn.value;
  const name = document.studentForm.name.value;
  const korean = document.studentForm.korean.value;
  const english = document.studentForm.english.value;
  const math = document.studentForm.math.value;

  /**
   * 입력 데이터 데이터 유효성 검증
   */ 
  if (Validator.isEmpty(ssn) || !Validator.isNumber(ssn)) {
    alert("학번을 숫자로 입력하여 주세요");
    document.studentForm.ssn.value = "";
    document.studentForm.ssn.focus();
    return;
  }
  // studentService 객체에 신규 학생 등록
  studentService.addStudent(new Student(parseInt(ssn), name, parseInt(korean), parseInt(english), parseInt(math)));
  inputFieldReset();
  // 학생 등록 완료 후 전체 목록 반환 후 출력
  const students = studentService.findAll();
  assignRank(students);
  renderingStudents(students);
}


/** 
 * 학생 정보 삭제하는 기능
*/
const removeStudent = function (studentService) {

  const ssn = document.studentForm.ssn.value;
  const name = document.studentForm.name.value;
  const students = studentService.findAll();
  console.log(students);
  
  for (let i = 0; i < students.length; i++) {
    if (students[i].ssn === parseInt(ssn) && students[i].name === name) {
      students.splice(i, 1);
      alert('학생 정보가 삭제되었습니다.');
    }
  }
  inputFieldReset();
  assignRank(students);
  renderingStudents(students);

}

/**
 * 순위지정
 */
const assignRank = function(students) {
  students.sort((a, b) => b.getSum() - a.getSum());
  let rank = 1;
  students.forEach((student, index) => {
    if (index > 0 && student.getSum() !== students[index - 1].getSum()) {
      rank = index + 1;
    }
    // 학생 객체에 순위(rank)를 추가
    student.rank = rank;
  });
};

/**
 * 학생 정보 검색하는 기능
 */ 

const findStudent = function (studentService) {
  const searchValue = document.studentForm.search.value;
  const studentArray = studentService.findBySearch("name", searchValue);
  if (studentArray.length === 0) {
    const allList= studentService.findAll();
    renderingStudents(allList);
    alert('검색된 학생이 존재하지 않습니다.');
  } else {
    renderingStudents(studentArray);
  }
}

/**
 *  학생 정보를 정렬해서 출력하는 기능
 */  
 const sortStudents = function(studentService,type) {
  const students = studentService.findAll();
  switch (type) {
    case "ssn":
      students.sort((student1, student2) => parseInt(student1.ssn) - parseInt(student2.ssn));
      break;
    case "name": 
      students.sort((student1, student2) => student1.name.charCodeAt(0) - student2.name.charCodeAt(0));
      break;
    case "sum":
      students.sort((student1, student2) => student2.getSum() - student1.getSum());
      break;
  }
  renderingStudents(students);

  }
/**
 * input 초기화
 */ 
const inputFieldReset = function(){
  const fields = document.querySelectorAll("input[type='text']");
  fields.forEach((field) => {
    field.value = "";
  })
}

/**
 * 이벤트타겟에 이벤트핸들러 등록
 */
const eventRegister = function () {
  // 학생 성적 관리 서비스 객체
  let studentService = null;

  // 문서 로드이벤트 처리
  window.addEventListener("load", function () {
    studentService = new StudentService();
    // 더미데이터(학생) 등록
    const student = new Student(10, "신연재", 100, 100, 100);
    studentService.addStudent(student);
    studentService.addStudent(new Student(11, "이연재", 95, 100, 90));
    studentService.addStudent(new Student(2, "홍길동", 90, 100, 50));
    studentService.addStudent(new Student(3, "임꺽정", 55, 90, 90));


    // 학생 전체 목록 출력
    const students = studentService.findAll();
    assignRank(students);
    renderingStudents(students);
  });

  /** 
   * 학생 등록 이벤트 처리
   */ 
  document.querySelector("#addButton").addEventListener("click", event => {
    createStudent(studentService);
    alert("등록되었습니다.");
  });

  /**
   * 학생 삭제 이벤트 처리
   */ 
  document.querySelector("#removeButton").addEventListener("click", event => {
    removeStudent(studentService)    
  });

  /**
   * 학생 정보 검색 이벤트 처리
   */
  document.querySelector("#searchBox").addEventListener("click",event=>{
    event.preventDefault();
    findStudent(studentService);
  })

  /**
   * 학생 정보 이름으로 정렬 이벤트 처리 
   */ 
  const studentInfo = document.studentForm.sort;
  studentInfo.addEventListener("change", function(event){
    if (this.selectedIndex == 0) {
      return;
    }
    const searchType = this.options[this.selectedIndex].value;
    sortStudents(studentService, searchType);
  });
}
/**
 * 프로그램 시작 진입 main메서드
 */
function main() {
  eventRegister();

}
main();


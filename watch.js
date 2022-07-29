const fs = require('fs');

fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});

// 위 코드를 실행후 target.txt의 내용 또는 파일 변을 변경하면 터미널 console에 표기

// 내용 변경
// change target.txt
// change target.txt
// change 이벤트가 2번씩 발생 하기도 하므로 실무에서 사용할 때 주의해야한다.

// 폴더 변경 및 삭제
// rename change_target.txt
// rename 이벤트 이후 더 이상 watch가 수행 되지않는다. 
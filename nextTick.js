//이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선적으로 처리함

setImmediate(() =>{
    console.log('Immediate');
});

process.nextTick(() => {
    console.log('nextTick');
}) ;

setTimeout(() => {
    console.log('timeout');
}, 0);

Promise.resolve().then(() => console.log('promise'));